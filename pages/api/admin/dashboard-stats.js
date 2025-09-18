import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import db from "../../../utils/db";
import User from "../../../models/User";
import GestationalDiabetesRecord from "../../../models/GestationalDiabetesRecord";

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
      // Get user statistics
      const totalUsers = await User.countDocuments();
      const activeUsers = await User.countDocuments({ emailVerified: true });
      const adminUsers = await User.countDocuments({ role: 'admin' });
      const regularUsers = await User.countDocuments({ role: 'user' });

      // Get blood glucose record statistics
      const totalRecords = await GestationalDiabetesRecord.countDocuments();
      const highRiskRecords = await GestationalDiabetesRecord.countDocuments({ riskLevel: 'high' });
      const normalRiskRecords = await GestationalDiabetesRecord.countDocuments({ riskLevel: 'normal' });

      // Get time-based statistics
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const todayRecords = await GestationalDiabetesRecord.countDocuments({
        date: { $gte: today, $lt: tomorrow }
      });

      // This week's records
      const weekStart = new Date(today);
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 7);
      
      const weeklyRecords = await GestationalDiabetesRecord.countDocuments({
        date: { $gte: weekStart, $lt: weekEnd }
      });

      // This month's records
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

      // Get risk level distribution
      const riskDistribution = {
        normal: normalRiskRecords,
        high: highRiskRecords
      };

      // Get meal type distribution
      const mealTypeDistribution = {
        breakfast: await GestationalDiabetesRecord.countDocuments({ mealType: 'breakfast' }),
        lunch: await GestationalDiabetesRecord.countDocuments({ mealType: 'lunch' }),
        dinner: await GestationalDiabetesRecord.countDocuments({ mealType: 'dinner' }),
        snack: await GestationalDiabetesRecord.countDocuments({ mealType: 'snack' })
      };

      // Get recent activity (last 7 days)
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const recentUsers = await User.countDocuments({
        createdAt: { $gte: sevenDaysAgo }
      });

      const recentRecords = await GestationalDiabetesRecord.countDocuments({
        createdAt: { $gte: sevenDaysAgo }
      });

      // Get users with most records
      const topUsers = await GestationalDiabetesRecord.aggregate([
        {
          $group: {
            _id: '$user',
            recordCount: { $sum: 1 }
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: '_id',
            foreignField: '_id',
            as: 'userInfo'
          }
        },
        {
          $unwind: '$userInfo'
        },
        {
          $project: {
            userId: '$_id',
            name: '$userInfo.name',
            email: '$userInfo.email',
            recordCount: 1
          }
        },
        {
          $sort: { recordCount: -1 }
        },
        {
          $limit: 5
        }
      ]);

      // Get glucose level trends (last 30 days)
      const thirtyDaysAgo = new Date(today);
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const trendRecords = await GestationalDiabetesRecord.find({
        date: { $gte: thirtyDaysAgo }
      }).sort({ date: 1 }).lean();

      // Calculate daily averages for trend
      const dailyAverages = {};
      trendRecords.forEach(record => {
        const dateKey = record.date.toISOString().split('T')[0];
        if (!dailyAverages[dateKey]) {
          dailyAverages[dateKey] = { total: 0, count: 0 };
        }
        
        if (record.fastingGlucose) {
          dailyAverages[dateKey].total += record.fastingGlucose;
          dailyAverages[dateKey].count++;
        }
        if (record.oneHourGlucose) {
          dailyAverages[dateKey].total += record.oneHourGlucose;
          dailyAverages[dateKey].count++;
        }
        if (record.twoHourGlucose) {
          dailyAverages[dateKey].total += record.twoHourGlucose;
          dailyAverages[dateKey].count++;
        }
      });

      const glucoseTrend = Object.entries(dailyAverages).map(([date, data]) => ({
        date,
        average: data.count > 0 ? data.total / data.count : 0
      }));

      res.status(200).json({
        success: true,
        data: {
          // User statistics
          totalUsers,
          activeUsers,
          adminUsers,
          regularUsers,
          recentUsers,
          
          // Blood glucose statistics
          totalRecords,
          highRiskRecords,
          normalRiskRecords,
          todayRecords,
          weeklyRecords,
          monthlyRecords,
          recentRecords,
          averageGlucose,
          
          // Distributions
          riskDistribution,
          mealTypeDistribution,
          
          // Additional insights
          topUsers,
          glucoseTrend
        }
      });

    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      res.status(500).json({ 
        success: false, 
        message: "Lỗi server nội bộ",
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ 
      success: false, 
      message: `Method ${req.method} not allowed` 
    });
  }
}
