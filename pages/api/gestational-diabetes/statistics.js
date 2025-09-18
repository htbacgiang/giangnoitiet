import db from "../../../utils/db";
import GestationalDiabetesRecord from "../../../models/GestationalDiabetesRecord";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
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
      message: "Bạn cần đăng nhập để xem thống kê" 
    });
  }

  const userId = token.sub;

  try {
    const { period = '30' } = req.query;
    const days = parseInt(period);

    // Get basic statistics
    const statistics = await GestationalDiabetesRecord.getUserStatistics(userId, days);
    
    // Get trend analysis
    const trendAnalysis = await GestationalDiabetesRecord.getTrendAnalysis(userId);
    
    // Get recent records for detailed analysis
    const recentRecords = await GestationalDiabetesRecord.find({ user: userId })
      .sort({ date: -1 })
      .limit(10)
      .lean();

    // Calculate additional insights
    const insights = await calculateInsights(userId, days);

    res.status(200).json({
      success: true,
      data: {
        statistics,
        trendAnalysis,
        recentRecords,
        insights,
        period: days
      }
    });

  } catch (error) {
    console.error("Statistics API Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Lỗi khi tính toán thống kê",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

async function calculateInsights(userId, days) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  // Get records within period
  const records = await GestationalDiabetesRecord.find({
    user: userId,
    date: { $gte: startDate }
  }).sort({ date: -1 });

  if (records.length === 0) {
    return {
      totalRecords: 0,
      riskAssessment: 'insufficient_data',
      recommendations: ['Bắt đầu ghi lại chỉ số đường huyết để có thể phân tích']
    };
  }

  // Risk pattern analysis
  const highRiskRecords = records.filter(r => r.riskLevel === 'high');
  const riskPercentage = (highRiskRecords.length / records.length) * 100;

  // Meal type analysis
  const mealTypeStats = records.reduce((acc, record) => {
    acc[record.mealType] = (acc[record.mealType] || 0) + 1;
    return acc;
  }, {});

  // Time-based patterns
  const last7Days = records.filter(r => {
    const recordDate = new Date(r.date);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return recordDate >= sevenDaysAgo;
  });

  const highRiskLast7Days = last7Days.filter(r => r.riskLevel === 'high').length;

  // Risk assessment
  let riskAssessment = 'low';
  if (riskPercentage > 50) {
    riskAssessment = 'high';
  } else if (riskPercentage > 25) {
    riskAssessment = 'moderate';
  }

  // Generate recommendations
  const recommendations = generateRecommendations({
    riskAssessment,
    highRiskLast7Days,
    totalRecords: records.length,
    mealTypeStats,
    recentRecords: records.slice(0, 5)
  });

  // Weekly pattern analysis
  const weeklyPattern = analyzeWeeklyPattern(records);

  return {
    totalRecords: records.length,
    riskAssessment,
    riskPercentage: Math.round(riskPercentage),
    highRiskLast7Days,
    mealTypeStats,
    recommendations,
    weeklyPattern,
    lastUpdate: new Date().toISOString()
  };
}

function generateRecommendations({ riskAssessment, highRiskLast7Days, totalRecords, mealTypeStats, recentRecords }) {
  const recommendations = [];

  // Risk-based recommendations
  if (riskAssessment === 'high') {
    recommendations.push('🚨 Cần gặp bác sĩ ngay để được tư vấn chuyên sâu');
    recommendations.push('📊 Tăng tần suất đo đường huyết (ít nhất 2 lần/ngày)');
    recommendations.push('🥗 Xem xét lại chế độ ăn uống hiện tại');
  } else if (riskAssessment === 'moderate') {
    recommendations.push('⚠️ Chú ý theo dõi chặt chẽ hơn');
    recommendations.push('🥗 Điều chỉnh chế độ ăn uống');
    recommendations.push('🚶‍♀️ Tăng cường vận động nhẹ');
  } else {
    recommendations.push('✅ Duy trì lối sống hiện tại');
    recommendations.push('📊 Tiếp tục theo dõi đều đặn');
  }

  // Frequency-based recommendations
  if (totalRecords < 7) {
    recommendations.push('📝 Nên đo và ghi lại thường xuyên hơn để có phân tích chính xác');
  }

  // Meal type recommendations
  const mealTypes = Object.keys(mealTypeStats);
  if (mealTypes.length < 3) {
    recommendations.push('🍽️ Nên đo đường huyết ở nhiều thời điểm khác nhau trong ngày');
  }

  // Recent trend recommendations
  const recentHighRisk = recentRecords.filter(r => r.riskLevel === 'high').length;
  if (recentHighRisk >= 3) {
    recommendations.push('📞 Liên hệ với bác sĩ về các chỉ số cao gần đây');
  }

  return recommendations;
}

function analyzeWeeklyPattern(records) {
  const dayOfWeekStats = {};
  const dayNames = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

  records.forEach(record => {
    const dayOfWeek = new Date(record.date).getDay();
    const dayName = dayNames[dayOfWeek];
    
    if (!dayOfWeekStats[dayName]) {
      dayOfWeekStats[dayName] = { total: 0, highRisk: 0 };
    }
    
    dayOfWeekStats[dayName].total++;
    if (record.riskLevel === 'high') {
      dayOfWeekStats[dayName].highRisk++;
    }
  });

  // Find patterns
  const patterns = [];
  Object.entries(dayOfWeekStats).forEach(([day, stats]) => {
    const riskRate = stats.total > 0 ? (stats.highRisk / stats.total) * 100 : 0;
    if (riskRate > 50 && stats.total >= 2) {
      patterns.push(`${day}: Tỷ lệ cao (${Math.round(riskRate)}%)`);
    }
  });

  return {
    dayOfWeekStats,
    patterns: patterns.length > 0 ? patterns : ['Chưa phát hiện pattern đặc biệt']
  };
}
