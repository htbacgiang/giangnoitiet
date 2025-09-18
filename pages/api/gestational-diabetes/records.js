import db from "../../../utils/db";
import GestationalDiabetesRecord from "../../../models/GestationalDiabetesRecord";
import User from "../../../models/User";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const { method } = req;

  // Connect to database
  await db.connectDb();

  // Check authentication
  const token = await getToken({ req });
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: "Bạn cần đăng nhập để sử dụng tính năng này" 
    });
  }

  const userId = token.sub;

  try {
    switch (method) {
      case "GET":
        await handleGet(req, res, userId);
        break;
      case "POST":
        await handlePost(req, res, userId);
        break;
      case "PUT":
        await handlePut(req, res, userId);
        break;
      case "DELETE":
        await handleDelete(req, res, userId);
        break;
      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        res.status(405).json({ 
          success: false, 
          message: `Method ${method} not allowed` 
        });
        break;
    }
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Lỗi server nội bộ",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

// GET: Lấy danh sách records
async function handleGet(req, res, userId) {
  const { 
    page = 1, 
    limit = 20, 
    startDate, 
    endDate, 
    mealType,
    riskLevel 
  } = req.query;

  const skip = (parseInt(page) - 1) * parseInt(limit);
  
  // Build query
  const query = { user: userId };
  
  if (startDate || endDate) {
    query.date = {};
    if (startDate) query.date.$gte = new Date(startDate);
    if (endDate) query.date.$lte = new Date(endDate);
  }
  
  if (mealType) query.mealType = mealType;
  if (riskLevel) query.riskLevel = riskLevel;

  const records = await GestationalDiabetesRecord.find(query)
    .sort({ date: -1, createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit))
    .lean();

  const total = await GestationalDiabetesRecord.countDocuments(query);

  res.status(200).json({
    success: true,
    data: {
      records,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    }
  });
}

// POST: Tạo record mới
async function handlePost(req, res, userId) {
  const {
    date,
    mealType,
    fastingGlucose,
    oneHourGlucose,
    twoHourGlucose,
    unit,
    notes,
    symptoms,
    bloodPressure,
    weight,
    gestationalWeek
  } = req.body;

  // Validation
  if (!date || !mealType) {
    return res.status(400).json({
      success: false,
      message: "Ngày và loại bữa ăn là bắt buộc"
    });
  }

  if (!fastingGlucose && !oneHourGlucose && !twoHourGlucose) {
    return res.status(400).json({
      success: false,
      message: "Cần ít nhất một giá trị đường huyết"
    });
  }

  // Check if record already exists for this date and meal
  const existingRecord = await GestationalDiabetesRecord.findOne({
    user: userId,
    date: new Date(date),
    mealType
  });

  if (existingRecord) {
    return res.status(409).json({
      success: false,
      message: "Đã có bản ghi cho bữa ăn này trong ngày. Vui lòng cập nhật thay vì tạo mới."
    });
  }

  const record = new GestationalDiabetesRecord({
    user: userId,
    date: new Date(date),
    mealType,
    fastingGlucose,
    oneHourGlucose,
    twoHourGlucose,
    unit: unit || 'mmol/L',
    notes,
    symptoms,
    bloodPressure,
    weight,
    gestationalWeek
  });

  await record.save();

  res.status(201).json({
    success: true,
    message: "Đã lưu dữ liệu thành công",
    data: record
  });
}

// PUT: Cập nhật record
async function handlePut(req, res, userId) {
  const { id } = req.query;
  
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID bản ghi là bắt buộc"
    });
  }

  const record = await GestationalDiabetesRecord.findOne({
    _id: id,
    user: userId
  });

  if (!record) {
    return res.status(404).json({
      success: false,
      message: "Không tìm thấy bản ghi"
    });
  }

  const allowedUpdates = [
    'fastingGlucose',
    'oneHourGlucose', 
    'twoHourGlucose',
    'unit',
    'notes',
    'symptoms',
    'bloodPressure',
    'weight',
    'gestationalWeek'
  ];

  allowedUpdates.forEach(field => {
    if (req.body[field] !== undefined) {
      record[field] = req.body[field];
    }
  });

  await record.save();

  res.status(200).json({
    success: true,
    message: "Đã cập nhật dữ liệu thành công",
    data: record
  });
}

// DELETE: Xóa record
async function handleDelete(req, res, userId) {
  const { id } = req.query;
  
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID bản ghi là bắt buộc"
    });
  }

  const record = await GestationalDiabetesRecord.findOneAndDelete({
    _id: id,
    user: userId
  });

  if (!record) {
    return res.status(404).json({
      success: false,
      message: "Không tìm thấy bản ghi"
    });
  }

  res.status(200).json({
    success: true,
    message: "Đã xóa dữ liệu thành công"
  });
}
