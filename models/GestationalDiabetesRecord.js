import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const gestationalDiabetesRecordSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    mealType: {
      type: String,
      enum: ["breakfast", "lunch", "dinner", "snack"],
      required: true,
    },
    fastingGlucose: {
      type: Number,
      min: 0,
      max: 30, // mmol/L max reasonable value
    },
    oneHourGlucose: {
      type: Number,
      min: 0,
      max: 30,
    },
    twoHourGlucose: {
      type: Number,
      min: 0,
      max: 30,
    },
    unit: {
      type: String,
      enum: ["mmol/L", "mg/dL"],
      default: "mmol/L",
      required: true,
    },
    notes: {
      type: String,
      maxlength: 500,
    },
    riskLevel: {
      type: String,
      enum: ["normal", "high"],
      default: "normal",
    },
    // Metadata
    symptoms: [
      {
        type: String,
        enum: [
          "frequent_urination",
          "excessive_thirst", 
          "fatigue",
          "blurred_vision",
          "nausea",
          "headache",
          "dizziness",
          "none"
        ],
      }
    ],
    bloodPressure: {
      systolic: { type: Number, min: 60, max: 250 },
      diastolic: { type: Number, min: 40, max: 150 },
    },
    weight: {
      type: Number,
      min: 30,
      max: 200,
    },
    gestationalWeek: {
      type: Number,
      min: 1,
      max: 42,
    },
    // Phân tích tự động
    analysisResult: {
      warnings: [String],
      advice: [String],
      riskFactors: [String],
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
gestationalDiabetesRecordSchema.index({ user: 1, date: -1 });
gestationalDiabetesRecordSchema.index({ user: 1, mealType: 1, date: -1 });
gestationalDiabetesRecordSchema.index({ user: 1, riskLevel: 1, date: -1 });

// Pre-save middleware to calculate risk level and analysis
gestationalDiabetesRecordSchema.pre('save', function(next) {
  // Convert to mmol/L for consistent analysis
  const toMmolL = (value, unit) => {
    if (!value) return null;
    return unit === 'mg/dL' ? (value / 18).toFixed(1) : value;
  };

  const fasting = toMmolL(this.fastingGlucose, this.unit);
  const oneHour = toMmolL(this.oneHourGlucose, this.unit);
  const twoHour = toMmolL(this.twoHourGlucose, this.unit);

  // Analyze risk level
  let riskLevel = 'normal';
  let warnings = [];
  let advice = [];
  let riskFactors = [];

  // Check thresholds (Vietnamese Ministry of Health standards)
  if (fasting && fasting >= 5.1) {
    riskLevel = 'high';
    warnings.push('Đường huyết lúc đói vượt ngưỡng bình thường');
    riskFactors.push('fasting_glucose_high');
  }
  if (oneHour && oneHour >= 10.0) {
    riskLevel = 'high';
    warnings.push('Đường huyết sau ăn 1 giờ vượt ngưỡng bình thường');
    riskFactors.push('one_hour_glucose_high');
  }
  if (twoHour && twoHour >= 8.5) {
    riskLevel = 'high';
    warnings.push('Đường huyết sau ăn 2 giờ vượt ngưỡng bình thường');
    riskFactors.push('two_hour_glucose_high');
  }

  // Generate advice based on risk level
  if (riskLevel === 'high') {
    advice = [
      '🏥 Cần gặp bác sĩ ngay để được tư vấn và điều trị',
      '🥗 Điều chỉnh chế độ ăn uống theo hướng dẫn của bác sĩ',
      '🚶‍♀️ Tăng cường vận động nhẹ phù hợp với thai kỳ',
      '📊 Theo dõi đường huyết thường xuyên theo lịch',
      '💊 Tuân thủ phác đồ điều trị nếu được kê đơn'
    ];
  } else {
    advice = [
      '✅ Chỉ số hiện tại trong giới hạn bình thường',
      '🥗 Duy trì chế độ ăn uống cân bằng',
      '🚶‍♀️ Vận động nhẹ nhàng 30 phút mỗi ngày',
      '📊 Tiếp tục theo dõi định kỳ',
      '😊 Giữ tinh thần thoải mái, tránh stress'
    ];
  }

  // Additional risk factors based on symptoms and vitals
  if (this.symptoms && this.symptoms.length > 0 && !this.symptoms.includes('none')) {
    riskFactors.push('symptoms_present');
    advice.push('💡 Có triệu chứng bất thường, cần theo dõi sát hơn');
  }

  if (this.bloodPressure && (this.bloodPressure.systolic > 140 || this.bloodPressure.diastolic > 90)) {
    riskFactors.push('high_blood_pressure');
    warnings.push('Huyết áp cao, cần kiểm soát');
  }

  // Update the document
  this.riskLevel = riskLevel;
  this.analysisResult = {
    warnings,
    advice,
    riskFactors
  };

  next();
});

// Static methods for statistics
gestationalDiabetesRecordSchema.statics.getUserStatistics = async function(userId, days = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const pipeline = [
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId),
        date: { $gte: startDate }
      }
    },
    {
      $group: {
        _id: null,
        totalRecords: { $sum: 1 },
        highRiskCount: {
          $sum: { $cond: [{ $eq: ['$riskLevel', 'high'] }, 1, 0] }
        },
        avgFasting: {
          $avg: {
            $cond: [
              { $ne: ['$fastingGlucose', null] },
              {
                $cond: [
                  { $eq: ['$unit', 'mg/dL'] },
                  { $divide: ['$fastingGlucose', 18] },
                  '$fastingGlucose'
                ]
              },
              null
            ]
          }
        },
        avgOneHour: {
          $avg: {
            $cond: [
              { $ne: ['$oneHourGlucose', null] },
              {
                $cond: [
                  { $eq: ['$unit', 'mg/dL'] },
                  { $divide: ['$oneHourGlucose', 18] },
                  '$oneHourGlucose'
                ]
              },
              null
            ]
          }
        },
        avgTwoHour: {
          $avg: {
            $cond: [
              { $ne: ['$twoHourGlucose', null] },
              {
                $cond: [
                  { $eq: ['$unit', 'mg/dL'] },
                  { $divide: ['$twoHourGlucose', 18] },
                  '$twoHourGlucose'
                ]
              },
              null
            ]
          }
        }
      }
    }
  ];

  const result = await this.aggregate(pipeline);
  return result[0] || {
    totalRecords: 0,
    highRiskCount: 0,
    avgFasting: 0,
    avgOneHour: 0,
    avgTwoHour: 0
  };
};

gestationalDiabetesRecordSchema.statics.getTrendAnalysis = async function(userId) {
  const last7Days = await this.getUserStatistics(userId, 7);
  const last30Days = await this.getUserStatistics(userId, 30);
  
  let trend = 'stable';
  if (last7Days.avgFasting && last30Days.avgFasting) {
    if (last7Days.avgFasting > last30Days.avgFasting * 1.1) {
      trend = 'increasing';
    } else if (last7Days.avgFasting < last30Days.avgFasting * 0.9) {
      trend = 'decreasing';
    }
  }

  return {
    last7Days,
    last30Days,
    trend,
    riskLevel: last7Days.highRiskCount > 3 ? 'high' : 'normal'
  };
};

const GestationalDiabetesRecord = mongoose.models.GestationalDiabetesRecord || 
  mongoose.model("GestationalDiabetesRecord", gestationalDiabetesRecordSchema);

export default GestationalDiabetesRecord;
