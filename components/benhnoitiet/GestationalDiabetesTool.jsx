'use client';

import { useState } from 'react';

const GestationalDiabetesTool = () => {
  const [formData, setFormData] = useState({
    fasting: '',
    oneHour: '',
    twoHour: '',
    unit: 'mmol/L'
  });
  
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  // Tiêu chuẩn Bộ Y tế Việt Nam
  const thresholds = {
    'mmol/L': {
      fasting: 5.1,
      oneHour: 10.0,
      twoHour: 8.5
    },
    'mg/dL': {
      fasting: 92,
      oneHour: 180,
      twoHour: 153
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const convertValue = (value, fromUnit, toUnit) => {
    if (!value || isNaN(value)) return null;
    
    if (fromUnit === toUnit) return parseFloat(value);
    
    if (fromUnit === 'mmol/L' && toUnit === 'mg/dL') {
      return parseFloat(value) * 18.0182;
    } else if (fromUnit === 'mg/dL' && toUnit === 'mmol/L') {
      return parseFloat(value) / 18.0182;
    }
    
    return parseFloat(value);
  };

  const analyzeBloodSugar = (fasting, oneHour, twoHour, unit) => {
    const currentThresholds = thresholds[unit];
    let riskLevel = 'low';
    let warnings = [];
    let advice = [];

    // Kiểm tra từng chỉ số
    if (fasting && fasting >= currentThresholds.fasting) {
      warnings.push(`Đường huyết lúc đói cao: ${fasting} ${unit} (≥ ${currentThresholds.fasting} ${unit})`);
      riskLevel = 'high';
    }

    if (oneHour && oneHour >= currentThresholds.oneHour) {
      warnings.push(`Đường huyết sau 1h cao: ${oneHour} ${unit} (≥ ${currentThresholds.oneHour} ${unit})`);
      riskLevel = 'high';
    }

    if (twoHour && twoHour >= currentThresholds.twoHour) {
      warnings.push(`Đường huyết sau 2h cao: ${twoHour} ${unit} (≥ ${currentThresholds.twoHour} ${unit})`);
      riskLevel = 'high';
    }

    // Đánh giá mức độ nguy hiểm
    if (riskLevel === 'high') {
      advice.push('⚠️ Cần tham khảo ý kiến bác sĩ ngay lập tức');
      advice.push('📋 Thực hiện chế độ ăn kiêng nghiêm ngặt');
      advice.push('🏃‍♀️ Tăng cường vận động nhẹ nhàng');
      advice.push('📊 Theo dõi đường huyết thường xuyên');
    } else if (fasting && oneHour && twoHour) {
      // Kiểm tra mức độ trung bình
      const avgRisk = [fasting, oneHour, twoHour].some(val => 
        val >= currentThresholds.fasting * 0.9 || 
        val >= currentThresholds.oneHour * 0.9 || 
        val >= currentThresholds.twoHour * 0.9
      );
      
      if (avgRisk) {
        riskLevel = 'moderate';
        advice.push('💡 Cần chú ý chế độ ăn uống');
        advice.push('🏃‍♀️ Tăng cường vận động');
        advice.push('📊 Theo dõi định kỳ');
      } else {
        advice.push('✅ Chỉ số đường huyết trong giới hạn bình thường');
        advice.push('🥗 Duy trì chế độ ăn lành mạnh');
        advice.push('🏃‍♀️ Tiếp tục vận động đều đặn');
      }
    }

    return {
      riskLevel,
      warnings,
      advice,
      thresholds: currentThresholds
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { fasting, oneHour, twoHour, unit } = formData;
    
    if (!fasting && !oneHour && !twoHour) {
      alert('Vui lòng nhập ít nhất một chỉ số đường huyết');
      return;
    }

    const analysis = analyzeBloodSugar(
      parseFloat(fasting) || null,
      parseFloat(oneHour) || null,
      parseFloat(twoHour) || null,
      unit
    );

    setResult({
      ...formData,
      analysis
    });
    setShowResult(true);
  };

  const handleReset = () => {
    setFormData({
      fasting: '',
      oneHour: '',
      twoHour: '',
      unit: 'mmol/L'
    });
    setResult(null);
    setShowResult(false);
  };

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-green-600 bg-green-50 border-green-200';
    }
  };

  const getRiskIcon = (riskLevel) => {
    switch (riskLevel) {
      case 'high': return '🚨';
      case 'moderate': return '⚠️';
      default: return '✅';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent mb-3">
            🔬 Công cụ kiểm tra tiểu đường thai kỳ
          </h1>
          <p className="text-blue-600 text-lg mb-2">
            Kiểm tra nhanh dựa trên tiêu chuẩn Bộ Y tế Việt Nam
          </p>
          <p className="text-gray-500 text-sm">
            Không cần đăng nhập - Kết quả tức thì
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-100">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-blue-900">Nhập chỉ số đường huyết</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Unit Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Đơn vị đo
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="unit"
                      value="mmol/L"
                      checked={formData.unit === 'mmol/L'}
                      onChange={(e) => handleInputChange('unit', e.target.value)}
                      className="mr-2 text-blue-600"
                    />
                    <span className="text-sm">mmol/L</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="unit"
                      value="mg/dL"
                      checked={formData.unit === 'mg/dL'}
                      onChange={(e) => handleInputChange('unit', e.target.value)}
                      className="mr-2 text-blue-600"
                    />
                    <span className="text-sm">mg/dL</span>
                  </label>
                </div>
              </div>

              {/* Glucose Inputs */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Đường huyết lúc đói
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.fasting}
                    onChange={(e) => handleInputChange('fasting', e.target.value)}
                    placeholder={`Nhập chỉ số (${formData.unit})`}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Đường huyết sau 1 giờ
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.oneHour}
                    onChange={(e) => handleInputChange('oneHour', e.target.value)}
                    placeholder={`Nhập chỉ số (${formData.unit})`}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Đường huyết sau 2 giờ
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.twoHour}
                    onChange={(e) => handleInputChange('twoHour', e.target.value)}
                    placeholder={`Nhập chỉ số (${formData.unit})`}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                >
                  🔍 Kiểm tra ngay
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
                >
                  🔄 Làm lại
                </button>
              </div>
            </form>
          </div>

          {/* Reference Chart */}
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-100">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-green-900">Tiêu chuẩn đánh giá</h2>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">📋 Tiêu chuẩn Bộ Y tế Việt Nam</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Đường huyết lúc đói:</span>
                    <span className="font-semibold">&lt; {thresholds[formData.unit].fasting} {formData.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sau 1 giờ:</span>
                    <span className="font-semibold">&lt; {thresholds[formData.unit].oneHour} {formData.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sau 2 giờ:</span>
                    <span className="font-semibold">&lt; {thresholds[formData.unit].twoHour} {formData.unit}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Lưu ý quan trọng</h3>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Kết quả chỉ mang tính tham khảo</li>
                  <li>• Cần tham khảo ý kiến bác sĩ chuyên khoa</li>
                  <li>• Xét nghiệm chính thức tại cơ sở y tế</li>
                  <li>• Theo dõi định kỳ trong thai kỳ</li>
                </ul>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-800 mb-2">💡 Mẹo sử dụng</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Nhập ít nhất 1 chỉ số để kiểm tra</li>
                  <li>• Có thể chuyển đổi đơn vị mmol/L ↔ mg/dL</li>
                  <li>• Kết quả hiển thị ngay lập tức</li>
                  <li>• Lời khuyên dựa trên tiêu chuẩn y tế</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {showResult && result && (
          <div className="mt-8 bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-100">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-purple-900">Kết quả phân tích</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Input Summary */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">📊 Chỉ số đã nhập</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Đường huyết lúc đói:</span>
                    <span className="font-semibold">{result.fasting || 'N/A'} {result.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sau 1 giờ:</span>
                    <span className="font-semibold">{result.oneHour || 'N/A'} {result.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sau 2 giờ:</span>
                    <span className="font-semibold">{result.twoHour || 'N/A'} {result.unit}</span>
                  </div>
                </div>
              </div>

              {/* Risk Assessment */}
              <div className={`p-4 rounded-lg border ${getRiskColor(result.analysis.riskLevel)}`}>
                <h3 className="font-semibold mb-3">
                  {getRiskIcon(result.analysis.riskLevel)} Đánh giá mức độ
                </h3>
                <div className="text-sm">
                  {result.analysis.riskLevel === 'high' && (
                    <p className="font-semibold">🚨 Nguy cơ cao - Cần tham khảo bác sĩ ngay</p>
                  )}
                  {result.analysis.riskLevel === 'moderate' && (
                    <p className="font-semibold">⚠️ Nguy cơ trung bình - Cần chú ý</p>
                  )}
                  {result.analysis.riskLevel === 'low' && (
                    <p className="font-semibold">✅ Trong giới hạn bình thường</p>
                  )}
                </div>
              </div>
            </div>

            {/* Warnings */}
            {result.analysis.warnings.length > 0 && (
              <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                <h3 className="font-semibold text-red-800 mb-3">🚨 Cảnh báo</h3>
                <ul className="space-y-2">
                  {result.analysis.warnings.map((warning, index) => (
                    <li key={index} className="text-sm text-red-700 flex items-start">
                      <span className="mr-2">•</span>
                      <span>{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Advice */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-3">💡 Lời khuyên</h3>
              <ul className="space-y-2">
                {result.analysis.advice.map((advice, index) => (
                  <li key={index} className="text-sm text-blue-700 flex items-start">
                    <span className="mr-2">•</span>
                    <span>{advice}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Disclaimer */}
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-800 text-center">
                ⚠️ <strong>Lưu ý:</strong> Kết quả này chỉ mang tính tham khảo. 
                Vui lòng tham khảo ý kiến bác sĩ chuyên khoa để được chẩn đoán chính xác và điều trị phù hợp.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GestationalDiabetesTool;
