import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import db from "../../../utils/db";
import GestationalDiabetesRecord from "../../../models/GestationalDiabetesRecord";
import User from "../../../models/User";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  // Check if user is authenticated and is admin
  if (!session) {
    return res.status(401).json({ 
      success: false, 
      message: "Bạn cần đăng nhập để truy cập tính năng này" 
    });
  }

  if (session.user.role !== "admin") {
    return res.status(403).json({ 
      success: false, 
      message: "Bạn không có quyền truy cập tính năng này" 
    });
  }

  await db.connectDb();

  if (req.method === "GET") {
    try {
      const { 
        page = 1, 
        limit = 10, 
        search = '',
        mealType = '',
        riskLevel = '',
        startDate = '',
        endDate = '',
        userId = ''
      } = req.query;

      const skip = (parseInt(page) - 1) * parseInt(limit);
      
      // Build query
      const query = {};
      
      if (mealType) {
        query.mealType = mealType;
      }
      
      if (riskLevel) {
        query.riskLevel = riskLevel;
      }
      
      if (startDate || endDate) {
        query.date = {};
        if (startDate) query.date.$gte = new Date(startDate);
        if (endDate) query.date.$lte = new Date(endDate);
      }
      
      if (userId) {
        query.user = userId;
      }

      // Get records with user information
      let records = await GestationalDiabetesRecord.find(query)
        .populate('user', 'name email phone image')
        .sort({ date: -1, createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .lean();

      // Filter by search term if provided
      if (search) {
        records = records.filter(record => 
          record.user && (
            record.user.name.toLowerCase().includes(search.toLowerCase()) ||
            record.user.email.toLowerCase().includes(search.toLowerCase()) ||
            record.user.phone?.includes(search)
          )
        );
      }

      const total = await GestationalDiabetesRecord.countDocuments(query);

      // Get additional stats
      const totalRecords = await GestationalDiabetesRecord.countDocuments();
      const highRiskRecords = await GestationalDiabetesRecord.countDocuments({ riskLevel: 'high' });
      const normalRiskRecords = await GestationalDiabetesRecord.countDocuments({ riskLevel: 'normal' });
      
      // Get today's records
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const todayRecords = await GestationalDiabetesRecord.countDocuments({
        date: { $gte: today, $lt: tomorrow }
      });

      // Get this week's records
      const weekStart = new Date(today);
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 7);
      const weeklyRecords = await GestationalDiabetesRecord.countDocuments({
        date: { $gte: weekStart, $lt: weekEnd }
      });

      // Get this month's records
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 1);
      const monthlyRecords = await GestationalDiabetesRecord.countDocuments({
        date: { $gte: monthStart, $lt: monthEnd }
      });

      // Calculate average glucose level
      const allRecords = await GestationalDiabetesRecord.find({}).lean();
      let totalGlucose = 0;
      let glucoseCount = 0;
      
      allRecords.forEach(record => {
        if (record.fastingGlucose) {
          totalGlucose += record.fastingGlucose;
          glucoseCount++;
        }
        if (record.oneHourGlucose) {
          totalGlucose += record.oneHourGlucose;
          glucoseCount++;
        }
        if (record.twoHourGlucose) {
          totalGlucose += record.twoHourGlucose;
          glucoseCount++;
        }
      });

      const averageGlucose = glucoseCount > 0 ? totalGlucose / glucoseCount : 0;

      // Get meal type distribution
      const mealTypeDistribution = {
        breakfast: await GestationalDiabetesRecord.countDocuments({ mealType: 'breakfast' }),
        lunch: await GestationalDiabetesRecord.countDocuments({ mealType: 'lunch' }),
        dinner: await GestationalDiabetesRecord.countDocuments({ mealType: 'dinner' }),
        snack: await GestationalDiabetesRecord.countDocuments({ mealType: 'snack' })
      };

      res.status(200).json({
        success: true,
        data: {
          records,
          pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            pages: Math.ceil(total / parseInt(limit))
          },
          stats: {
            totalRecords,
            highRiskRecords,
            normalRiskRecords,
            todayRecords,
            weeklyRecords,
            monthlyRecords,
            averageGlucose,
            riskDistribution: {
              normal: normalRiskRecords,
              high: highRiskRecords
            },
            mealTypeDistribution
          }
        }
      });

    } catch (error) {
      console.error("Error fetching blood glucose records:", error);
      res.status(500).json({ 
        success: false, 
        message: "Lỗi server nội bộ",
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  } else if (req.method === "PUT") {
    try {
      const { recordId, updates } = req.body;

      if (!recordId) {
        return res.status(400).json({
          success: false,
          message: "ID bản ghi là bắt buộc"
        });
      }

      // Check if record exists
      const record = await GestationalDiabetesRecord.findById(recordId);
      if (!record) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy bản ghi"
        });
      }

      // Update record
      const updatedRecord = await GestationalDiabetesRecord.findByIdAndUpdate(
        recordId,
        updates,
        { new: true, runValidators: true }
      ).populate('user', 'name email phone image');

      res.status(200).json({
        success: true,
        message: "Cập nhật bản ghi thành công",
        data: updatedRecord
      });

    } catch (error) {
      console.error("Error updating blood glucose record:", error);
      res.status(500).json({ 
        success: false, 
        message: "Lỗi server nội bộ",
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  } else if (req.method === "DELETE") {
    try {
      const { recordId } = req.body;

      if (!recordId) {
        return res.status(400).json({
          success: false,
          message: "ID bản ghi là bắt buộc"
        });
      }

      // Check if record exists
      const record = await GestationalDiabetesRecord.findById(recordId);
      if (!record) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy bản ghi"
        });
      }

      // Delete record
      await GestationalDiabetesRecord.findByIdAndDelete(recordId);

      res.status(200).json({
        success: true,
        message: "Xóa bản ghi thành công"
      });

    } catch (error) {
      console.error("Error deleting blood glucose record:", error);
      res.status(500).json({ 
        success: false, 
        message: "Lỗi server nội bộ",
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    res.status(405).json({ 
      success: false, 
      message: `Method ${req.method} not allowed` 
    });
  }
}
