import db from "../../../utils/db";
import GestationalDiabetesRecord from "../../../models/GestationalDiabetesRecord";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ 
      success: false, 
      message: `Method ${req.method} not allowed` 
    });
  }

  // Connect to database
  await db.connectDb();

  // Check authentication
  const token = await getToken({ req });
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: "Bạn cần đăng nhập để di chuyển dữ liệu" 
    });
  }

  const userId = token.sub;

  try {
    const { localStorageData } = req.body;

    if (!localStorageData || !Array.isArray(localStorageData)) {
      return res.status(400).json({
        success: false,
        message: "Dữ liệu không hợp lệ"
      });
    }

    const migratedRecords = [];
    const errors = [];

    for (const localRecord of localStorageData) {
      try {
        // Transform localStorage format to database format
        const record = {
          user: userId,
          date: new Date(localRecord.date),
          mealType: localRecord.mealType || 'breakfast',
          unit: localRecord.unit || 'mmol/L',
          notes: localRecord.notes || '',
        };

        // Map glucose values
        if (localRecord.fasting) {
          record.fastingGlucose = parseFloat(localRecord.fasting);
        }
        if (localRecord.oneHour) {
          record.oneHourGlucose = parseFloat(localRecord.oneHour);
        }
        if (localRecord.twoHour) {
          record.twoHourGlucose = parseFloat(localRecord.twoHour);
        }

        // Check if record already exists
        const existingRecord = await GestationalDiabetesRecord.findOne({
          user: userId,
          date: record.date,
          mealType: record.mealType
        });

        if (existingRecord) {
          // Update existing record
          Object.assign(existingRecord, record);
          await existingRecord.save();
          migratedRecords.push({ action: 'updated', record: existingRecord });
        } else {
          // Create new record
          const newRecord = new GestationalDiabetesRecord(record);
          await newRecord.save();
          migratedRecords.push({ action: 'created', record: newRecord });
        }

      } catch (recordError) {
        console.error('Error migrating record:', recordError);
        errors.push({
          record: localRecord,
          error: recordError.message
        });
      }
    }

    const response = {
      success: true,
      message: `Đã di chuyển ${migratedRecords.length} bản ghi thành công`,
      data: {
        migrated: migratedRecords.length,
        errors: errors.length,
        details: {
          created: migratedRecords.filter(r => r.action === 'created').length,
          updated: migratedRecords.filter(r => r.action === 'updated').length,
        }
      }
    };

    if (errors.length > 0) {
      response.data.errors_details = errors;
      response.message += `. Có ${errors.length} lỗi.`;
    }

    res.status(200).json(response);

  } catch (error) {
    console.error("Migration API Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Lỗi khi di chuyển dữ liệu",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
