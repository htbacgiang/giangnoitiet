'use client'; // Đánh dấu đây là Client Component trong Next.js

import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useGestationalDiabetes } from '../../hooks/useGestationalDiabetes';

export default function GestationalDiabetesCalculator() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const {
    records: dailyRecords,
    statistics,
    loading: apiLoading,
    error: apiError,
    isAuthenticated,
    createRecord,
    deleteRecord,
    fetchRecords,
    fetchStatistics,
    clearError
  } = useGestationalDiabetes();

  // Single test states
  const [fasting, setFasting] = useState('');
  const [oneHour, setOneHour] = useState('');
  const [twoHour, setTwoHour] = useState('');
  const [result, setResult] = useState(null);
  const [unit, setUnit] = useState('mmol/L');
  const [convertValue, setConvertValue] = useState('');
  const [convertUnit, setConvertUnit] = useState('mmol/L');
  const [convertedResult, setConvertedResult] = useState('');
  const [toast, setToast] = useState({ message: '', type: '', visible: false });

  // Daily tracking states
  const [activeTab, setActiveTab] = useState('single-test');
  const [dailyDate, setDailyDate] = useState(new Date().toISOString().split('T')[0]);
  const [dailyFasting, setDailyFasting] = useState('');
  const [dailyOneHour, setDailyOneHour] = useState('');
  const [dailyTwoHour, setDailyTwoHour] = useState('');
  const [dailyNotes, setDailyNotes] = useState('');
  const [mealType, setMealType] = useState('breakfast');

  // Calendar states
  const [currentCalendarMonth, setCurrentCalendarMonth] = useState(new Date());
  const [statisticsView, setStatisticsView] = useState('overview'); // 'overview' or 'calendar'
  
  // Tooltip states
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    content: null
  });

  // Dynamic callback URL based on current page
  const getCallbackUrl = () => {
    const currentPath = router.asPath;
    return encodeURIComponent(currentPath);
  };

  // Conversion factors
  const toMgDL = (mmol) => Math.round(mmol * 18);
  const toMmolL = (mgdl) => (mgdl / 18).toFixed(1);

  // Show API errors as toast
  useEffect(() => {
    if (apiError) {
      showToast(apiError, 'error');
      clearError();
    }
  }, [apiError, clearError]);

  // Global error handler for unhandled promise rejections
  useEffect(() => {
    const handleUnhandledRejection = (event) => {
      if (event.reason?.message?.includes('Đã có bản ghi cho bữa ăn này trong ngày')) {
        event.preventDefault(); // Prevent the error from crashing the app
        showToast(event.reason.message, 'error');
        console.warn('Handled unhandled rejection:', event.reason);
      }
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    
    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  // Handle toast display
  const showToast = (message, type = 'error') => {
    setToast({ message, type, visible: true });
  };

  // Analysis functions
  const analyzeBloodSugar = (fasting, oneHour, twoHour, unit) => {
    const fastingMmol = unit === 'mg/dL' ? parseFloat(toMmolL(fasting)) : parseFloat(fasting);
    const oneHourMmol = unit === 'mg/dL' ? parseFloat(toMmolL(oneHour)) : parseFloat(oneHour);
    const twoHourMmol = unit === 'mg/dL' ? parseFloat(toMmolL(twoHour)) : parseFloat(twoHour);

    let riskLevel = 'normal';
    let warnings = [];
    let advice = [];

    // Check thresholds
    if (fastingMmol && fastingMmol >= 5.1) {
      riskLevel = 'high';
      warnings.push('Đường huyết lúc đói vượt ngưỡng bình thường');
    }
    if (oneHourMmol && oneHourMmol >= 10.0) {
      riskLevel = 'high';
      warnings.push('Đường huyết sau ăn 1 giờ vượt ngưỡng bình thường');
    }
    if (twoHourMmol && twoHourMmol >= 8.5) {
      riskLevel = 'high';
      warnings.push('Đường huyết sau ăn 2 giờ vượt ngưỡng bình thường');
    }

    // Provide advice based on levels
    if (riskLevel === 'high') {
      advice = [
        '🏥 Cần gặp bác sĩ ngay để được tư vấn và điều trị',
        '🥗 Điều chỉnh chế độ ăn uống theo hướng dẫn của bác sĩ',
        '🚶‍♀️ Tập thể dục nhẹ nhàng theo chỉ dẫn bác sĩ',
        '📊 Theo dõi đường huyết thường xuyên theo lịch',
        '💊 Tuân thủ phác đồ điều trị nếu được kê đơn'
      ];
    } else {
      advice = [
        '✅ Chỉ số hiện tại trong giới hạn bình thường',
        '🥗 Duy trì chế độ ăn uống cân bằng',
        '🚶‍♀️ Tiếp tục tập thể dục đều đặn',
        '📊 Tiếp tục theo dõi định kỳ',
        '😊 Giữ tinh thần thoải mái, tránh stress'
      ];
    }

    return { riskLevel, warnings, advice };
  };

  // Get statistics from API data
  const getStatisticsData = () => {
    if (!statistics) return null;

    const { trendAnalysis, insights } = statistics;
    
    return {
      totalRecords: insights?.totalRecords || 0,
      avgFasting7: trendAnalysis?.last7Days?.avgFasting?.toFixed(1) || '0',
      avgFasting30: trendAnalysis?.last30Days?.avgFasting?.toFixed(1) || '0',
      highReadings7: insights?.highRiskLast7Days || 0,
      trend: trendAnalysis?.trend || 'stable',
      riskAssessment: insights?.riskAssessment || 'low',
      recommendations: insights?.recommendations || []
    };
  };

  // Tooltip helper functions
  const formatMealType = (type) => {
    const mealTypes = {
      'breakfast': 'Sáng',
      'lunch': 'Trưa', 
      'dinner': 'Tối',
      'snack': 'Phụ'
    };
    return mealTypes[type] || 'Khác';
  };

  const getMealIcon = (type) => {
    const icons = {
      'breakfast': '🌅',
      'lunch': '☀️',
      'dinner': '🌙',
      'snack': '🍎'
    };
    return icons[type] || '🍽️';
  };

  const handleMouseEnter = (event, day) => {
    // Hiển thị tooltip cho tất cả ngày, kể cả không có records
    
    const rect = event.currentTarget.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Tính toán vị trí tooltip
    let x = rect.left + rect.width / 2;
    let y = rect.top - 10;
    
    // Điều chỉnh vị trí nếu tooltip sẽ ra ngoài viewport
    const tooltipWidth = viewportWidth < 480 ? 280 : viewportWidth < 768 ? 320 : 350; // Responsive width
    const tooltipHeight = 300; // Ước tính chiều cao tooltip lớn hơn
    
    // Điều chỉnh x nếu tooltip ra ngoài bên phải
    if (x + tooltipWidth / 2 > viewportWidth) {
      x = viewportWidth - tooltipWidth / 2 - 20;
    }
    
    // Điều chỉnh x nếu tooltip ra ngoài bên trái
    if (x - tooltipWidth / 2 < 0) {
      x = tooltipWidth / 2 + 20;
    }
    
    // Điều chỉnh y nếu tooltip ra ngoài phía trên
    if (y - tooltipHeight < 0) {
      y = rect.bottom + 10; // Hiển thị dưới cell thay vì trên
    }
    
    setTooltip({
      visible: true,
      x: x,
      y: y,
      content: day
    });
  };

  const handleMouseLeave = () => {
    setTooltip({
      visible: false,
      x: 0,
      y: 0,
      content: null
    });
  };

  // Helper functions for tooltip content
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString('vi-VN', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
    } catch {
      return '';
    }
  };

  const getDayStatistics = (records) => {
    if (!records || records.length === 0) return null;
    
    let totalTests = 0;
    let highRiskTests = 0;
    let hasNotes = false;
    
    records.forEach(record => {
      if (record.fastingGlucose) totalTests++;
      if (record.oneHourGlucose) totalTests++;
      if (record.twoHourGlucose) totalTests++;
      
      if (record.riskLevel === 'high') highRiskTests++;
      if (record.notes && record.notes.trim()) hasNotes = true;
    });
    
    return {
      totalRecords: records.length,
      totalTests,
      highRiskTests,
      normalTests: totalTests - highRiskTests,
      hasNotes,
      riskPercentage: totalTests > 0 ? Math.round((highRiskTests / totalTests) * 100) : 0
    };
  };

  // Calendar helper functions
  const getCalendarData = () => {
    if (!dailyRecords) return [];
    
    const year = currentCalendarMonth.getFullYear();
    const month = currentCalendarMonth.getMonth();
    
    // Get first day of month and last day
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Get records for this month
    const monthRecords = dailyRecords.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate.getFullYear() === year && recordDate.getMonth() === month;
    });
    
    // Create calendar days
    const days = [];
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay()); // Start from Sunday
    
    for (let i = 0; i < 42; i++) { // 6 weeks * 7 days
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      const dayRecords = monthRecords.filter(record => {
        const recordDate = new Date(record.date);
        return recordDate.toDateString() === currentDate.toDateString();
      });
      
      days.push({
        date: currentDate,
        isCurrentMonth: currentDate.getMonth() === month,
        isToday: currentDate.toDateString() === new Date().toDateString(),
        records: dayRecords,
        hasHighRisk: dayRecords.some(record => record.riskLevel === 'high')
      });
    }
    
    return days;
  };

  const navigateCalendar = (direction) => {
    const newDate = new Date(currentCalendarMonth);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentCalendarMonth(newDate);
  };

  // Auto-dismiss toast after 3 seconds
  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        setToast({ ...toast, visible: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Handle daily record submission
  const handleDailySubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      showToast('Vui lòng đăng nhập để lưu dữ liệu!');
      return;
    }

    if (!dailyFasting && !dailyOneHour && !dailyTwoHour) {
      showToast('Vui lòng nhập ít nhất một giá trị đường huyết!');
      return;
    }

    const fastingValue = parseFloat(dailyFasting);
    const oneHourValue = parseFloat(dailyOneHour);
    const twoHourValue = parseFloat(dailyTwoHour);

    if (
      (dailyFasting && (isNaN(fastingValue) || fastingValue < 0)) ||
      (dailyOneHour && (isNaN(oneHourValue) || oneHourValue < 0)) ||
      (dailyTwoHour && (isNaN(twoHourValue) || twoHourValue < 0))
    ) {
      showToast('Vui lòng nhập giá trị hợp lệ (số không âm)!');
      return;
    }

    const recordData = {
      date: dailyDate,
      mealType: mealType,
      fastingGlucose: dailyFasting ? fastingValue : null,
      oneHourGlucose: dailyOneHour ? oneHourValue : null,
      twoHourGlucose: dailyTwoHour ? twoHourValue : null,
      unit: unit,
      notes: dailyNotes,
    };

    try {
      const result = await createRecord(recordData);
      
      // If result is null, it means there was a duplicate record error
      if (result === null) {
        // Error message will be shown via apiError useEffect
        return;
      }
      
      showToast('Đã lưu dữ liệu thành công!', 'success');
      
      // Reset form
      setDailyFasting('');
      setDailyOneHour('');
      setDailyTwoHour('');
      setDailyNotes('');
    } catch (error) {
      // Show error message as toast - don't re-throw to avoid unhandled error
      const errorMessage = error?.message || 'Có lỗi xảy ra khi lưu dữ liệu!';
      showToast(errorMessage, 'error');
      console.error('Error creating record:', error);
      // Clear any error state to prevent re-throwing
      if (clearError) clearError();
    }
  };

  // Delete a daily record
  const deleteDailyRecord = async (id) => {
    if (!isAuthenticated) {
      showToast('Vui lòng đăng nhập để xóa dữ liệu!');
      return;
    }

    try {
      await deleteRecord(id);
      showToast('Đã xóa dữ liệu!', 'success');
    } catch (error) {
      // Show error message as toast - don't re-throw to avoid unhandled error
      const errorMessage = error?.message || 'Có lỗi xảy ra khi xóa dữ liệu!';
      showToast(errorMessage, 'error');
      console.error('Error deleting record:', error);
      // Clear any error state to prevent re-throwing
      if (clearError) clearError();
    }
  };

  // Reset daily form
  const handleDailyReset = () => {
    setDailyFasting('');
    setDailyOneHour('');
    setDailyTwoHour('');
    setDailyNotes('');
  };

  // Handle conversion
  const handleConversion = (value, unit) => {
    if (!value) {
      setConvertedResult('');
      return;
    }
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue < 0) {
      setConvertedResult('');
      showToast('Vui lòng nhập giá trị hợp lệ (số không âm)!');
      return;
    }
    const result = unit === 'mmol/L' ? toMgDL(numValue) : toMmolL(numValue);
    setConvertedResult(`${result} ${unit === 'mmol/L' ? 'mg/dL' : 'mmol/L'}`);
  };

  // Reset conversion form
  const handleConvertReset = () => {
    setConvertValue('');
    setConvertedResult('');
  };

  const checkGestationalDiabetes = () => {
    if (!fasting && !oneHour && !twoHour) {
      showToast('Vui lòng nhập ít nhất một giá trị đường huyết!');
      return;
    }

    const fastingValue = parseFloat(fasting);
    const oneHourValue = parseFloat(oneHour);
    const twoHourValue = parseFloat(twoHour);

    if (
      (fasting && (isNaN(fastingValue) || fastingValue < 0)) ||
      (oneHour && (isNaN(oneHourValue) || oneHourValue < 0)) ||
      (twoHour && (isNaN(twoHourValue) || twoHourValue < 0))
    ) {
      showToast('Vui lòng nhập giá trị hợp lệ (số không âm)!');
      return;
    }

    // Convert to mmol/L if input is in mg/dL
    const fastingMmol = unit === 'mg/dL' ? toMmolL(fastingValue) : fastingValue;
    const oneHourMmol = unit === 'mg/dL' ? toMmolL(oneHourValue) : oneHourValue;
    const twoHourMmol = unit === 'mg/dL' ? toMmolL(twoHourValue) : twoHourValue;

    let hasGestationalDiabetes = false;
    if (fastingMmol >= 5.1 || oneHourMmol >= 10.0 || twoHourMmol >= 8.5) {
      hasGestationalDiabetes = true;
    }

    setResult({
      hasGestationalDiabetes,
      unit,
      fasting: fastingValue || 0,
      oneHour: oneHourValue || 0,
      twoHour: twoHourValue || 0,
      targets: [
        { label: 'Lúc đói', value: unit === 'mmol/L' ? '≤ 5.1 mmol/L' : '≤ 92 mg/dL' },
        { label: 'Sau ăn 1 giờ', value: unit === 'mmol/L' ? '≤ 10.0 mmol/L' : '≤ 180 mg/dL' },
        { label: 'Sau ăn 2 giờ', value: unit === 'mmol/L' ? '≤ 8.5 mmol/L' : '≤ 153 mg/dL' },
      ],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkGestationalDiabetes();
  };

  const handleReset = () => {
    setFasting('');
    setOneHour('');
    setTwoHour('');
    setResult(null);
  };

  // Authentication check
  if (status === 'loading') {
    return (
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-12 min-h-screen ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-blue-600">Đang tải...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Mobile Responsive */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0">
          <div>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent mb-2">
              Theo dõi tiểu đường thai kỳ
            </p>
            <h2 className="text-gray-600 text-sm sm:text-base">Công cụ kiểm tra và theo dõi đường huyết thai kỳ</h2>
          </div>
          {isAuthenticated && session?.user && (
            <div className="text-left sm:text-right">
              <div className="flex items-center space-x-2 justify-start sm:justify-end">
                <span className="text-sm text-gray-600">Xin chào,</span>
                <p className="font-semibold text-blue-700">{session.user.name}</p>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition-all duration-200 border border-red-200 hover:border-red-300"
                >
                  <div className="flex items-center space-x-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Đăng xuất</span>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Tabs - Mobile Horizontal */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-sm p-2 rounded-xl shadow-lg border border-blue-100">
            <div className="flex flex-row space-x-2 overflow-x-auto">
              <button
                onClick={() => setActiveTab('single-test')}
                className={`flex-shrink-0 px-3 sm:px-6 py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base whitespace-nowrap ${
                  activeTab === 'single-test'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                    : 'text-blue-700 hover:bg-blue-50'
                }`}
              >
                🔬 <span className="hidden sm:inline">Kiểm tra đơn lẻ</span><span className="sm:hidden">Kiểm tra</span>
              </button>
              
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => setActiveTab('daily-tracking')}
                    className={`flex-shrink-0 px-3 sm:px-6 py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base whitespace-nowrap ${
                      activeTab === 'daily-tracking'
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                        : 'text-blue-700 hover:bg-blue-50'
                    }`}
                  >
                    📊 <span className="hidden sm:inline">Theo dõi hàng ngày</span><span className="sm:hidden">Theo dõi hàng ngày</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('statistics')}
                    className={`flex-shrink-0 px-3 sm:px-6 py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base whitespace-nowrap ${
                      activeTab === 'statistics'
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                        : 'text-blue-700 hover:bg-blue-50'
                    }`}
                  >
                    📈 <span className="hidden sm:inline">Thống kê</span><span className="sm:hidden">Thống kê</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => showToast('Vui lòng đăng nhập để sử dụng tính năng theo dõi và thống kê!', 'error')}
                  className="flex-shrink-0 px-3 sm:px-6 py-3 rounded-lg font-semibold text-gray-400 cursor-not-allowed text-xs sm:text-base whitespace-nowrap"
                  disabled
                >
                  📊 <span className="hidden sm:inline">Theo dõi & Thống kê (Cần đăng nhập)</span><span className="sm:hidden">Cần đăng nhập</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'single-test' && (
          <div className="space-y-6">
            {/* Login encouragement for non-authenticated users */}
            {!isAuthenticated && (
              <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-green-800 font-medium">
                        🌟 Sử dụng miễn phí - không cần đăng nhập!
                      </p>
                      <p className="text-green-600 text-sm">
                        Bạn có thể kiểm tra đường huyết ngay bây giờ. Đăng nhập để lưu trữ và theo dõi lâu dài.
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/dang-nhap?callbackUrl=${getCallbackUrl()}`}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    Đăng nhập để lưu trữ
                  </Link>
                </div>
              </div>
            )}

            {/* Unit Converter - Mobile 2 Lines */}
            <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-blue-100">
              {/* Title */}
              <div className="flex items-center mb-3">
                <div className="w-7 h-7 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800">Chuyển đổi đơn vị</h3>
              </div>
              
              {/* Converter Layout */}
              <div className="flex items-center justify-between space-x-2">
                {/* Input Section */}
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={convertValue}
                    onChange={(e) => {
                      setConvertValue(e.target.value);
                      handleConversion(e.target.value, convertUnit);
                    }}
                    className="w-20 sm:w-20 px-2 sm:px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="0"
                    step="0.1"
                    min="0"
                  />
                  
                  <select
                    value={convertUnit}
                    onChange={(e) => {
                      setConvertUnit(e.target.value);
                      handleConversion(convertValue, e.target.value);
                    }}
                    className="px-2 sm:px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
                  >
                    <option value="mmol/L">mmol/L</option>
                    <option value="mg/dL">mg/dL</option>
                  </select>
                </div>

                {/* Equals sign */}
                <div className="text-gray-400">
                  <span>=</span>
                </div>

                {/* Result Section */}
                <div className="flex items-center space-x-2">
                  {convertedResult ? (
                    <div className="px-2 sm:px-3 py-2 bg-green-50 border border-green-200 rounded-lg text-sm text-center min-w-[60px] sm:min-w-[80px]">
                      <span className="font-semibold text-green-800">{convertedResult}</span>
                    </div>
                  ) : (
                    <div className="px-2 sm:px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 text-center min-w-[60px] sm:min-w-[80px]">
                      --
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleConvertReset}
                    className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    title="Xóa"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content Grid - Mobile Responsive */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Reference Chart */}
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Giá trị tham chiếu</h3>
                    <p className="text-sm text-gray-600">Ngưỡng chẩn đoán tiểu đường thai kỳ</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-800 mb-2">🌅 Đường huyết lúc đói</h3>
                    <p className="text-blue-700">≥ 5.1 mmol/L (92 mg/dL)</p>
                  </div>
                  <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200">
                    <h3 className="font-semibold text-yellow-800 mb-2">⏰ Sau 1 giờ uống glucose</h3>
                    <p className="text-yellow-700">≥ 10.0 mmol/L (180 mg/dL)</p>
                  </div>
                  <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-lg border border-red-200">
                    <h3 className="font-semibold text-red-800 mb-2">⏰ Sau 2 giờ uống glucose</h3>
                    <p className="text-red-700">≥ 8.5 mmol/L (153 mg/dL)</p>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-xs text-amber-800 text-center">
                    ⚠️ Chỉ cần 1 trong 3 giá trị vượt ngưỡng là được chẩn đoán tiểu đường thai kỳ
                  </p>
                </div>
              </div>

              {/* Input Form */}
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-100">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 002 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Nhập giá trị đường huyết</h3>
                    <p className="text-sm text-gray-600">Nhập kết quả xét nghiệm của bạn</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4" aria-labelledby="calculator-title">
                  {/* Unit Selection */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Đơn vị đo</label>
                    <select
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="mmol/L">mmol/L</option>
                      <option value="mg/dL">mg/dL</option>
                    </select>
                  </div>

                  {/* Input Fields - Mobile Responsive */}
                  <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="fasting" className="block text-sm font-medium text-gray-700 mb-2">
                        Lúc đói ({unit})
                      </label>
                      <input
                        id="fasting"
                        type="number"
                        value={fasting}
                        onChange={(e) => setFasting(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                        placeholder={unit === 'mmol/L' ? '5.1' : '92'}
                        step="0.1"
                        min="0"
                      />
                    </div>

                    <div>
                      <label htmlFor="oneHour" className="block text-sm font-medium text-gray-700 mb-2">
                         Sau 1h ({unit})
                      </label>
                      <input
                        id="oneHour"
                        type="number"
                        value={oneHour}
                        onChange={(e) => setOneHour(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                        placeholder={unit === 'mmol/L' ? '10.0' : '180'}
                        step="0.1"
                        min="0"
                      />
                    </div>

                    <div className="sm:col-span-2 lg:col-span-1">
                      <label htmlFor="twoHour" className="block text-sm font-medium text-gray-700 mb-2">
                        Sau 2h ({unit})
                      </label>
                      <input
                        id="twoHour"
                        type="number"
                        value={twoHour}
                        onChange={(e) => setTwoHour(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                        placeholder={unit === 'mmol/L' ? '8.5' : '153'}
                        step="0.1"
                        min="0"
                      />
                    </div>
                  </div>

                  {/* Action Buttons - Compact Layout */}
                  <div className="flex flex-row space-x-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-[1.02] text-sm sm:text-base"
                    >
                      <div className="flex items-center justify-center">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="hidden sm:inline">Kiểm tra ngay</span>
                        <span className="sm:hidden">Kiểm tra</span>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="flex-1 bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700 px-4 py-3 rounded-lg hover:from-gray-400 hover:to-gray-500 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-[1.02] text-sm sm:text-base"
                    >
                      <div className="flex items-center justify-center">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span className="hidden sm:inline">Xóa tất cả</span>
                        <span className="sm:hidden">Xóa</span>
                      </div>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Result */}
            {result && (
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-100">
                <div className={`p-6 rounded-xl border-2 shadow-lg ${
                  result.hasGestationalDiabetes 
                    ? 'bg-gradient-to-r from-red-50 to-pink-50 border-red-200' 
                    : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
                }`}>
                  <div className="flex items-center mb-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                      result.hasGestationalDiabetes 
                        ? 'bg-gradient-to-r from-red-500 to-red-600' 
                        : 'bg-gradient-to-r from-green-500 to-green-600'
                    }`}>
                      {result.hasGestationalDiabetes ? (
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.348 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">Kết quả kiểm tra</h3>
                      <p className="text-sm text-gray-600">Dựa trên các giá trị bạn đã nhập</p>
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-lg mb-4 ${
                    result.hasGestationalDiabetes 
                      ? 'bg-red-100 border border-red-200' 
                      : 'bg-green-100 border border-green-200'
                  }`}>
                    <p className={`font-bold text-center ${
                      result.hasGestationalDiabetes ? 'text-red-800' : 'text-green-800'
                    }`}>
                      {result.hasGestationalDiabetes 
                        ? '⚠️ Có dấu hiệu tiểu đường thai kỳ' 
                        : '✅ Không có dấu hiệu tiểu đường thai kỳ'
                      }
                    </p>
                  </div>

                  <div className="bg-white/70 p-4 rounded-lg mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Giá trị đã nhập:</h4>
                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <div className="text-center">
                        <div className="text-gray-600">Lúc đói</div>
                        <div className="font-bold text-blue-700">{result.fasting || 'N/A'} {result.unit}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-gray-600">Sau 1h</div>
                        <div className="font-bold text-blue-700">{result.oneHour || 'N/A'} {result.unit}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-gray-600">Sau 2h</div>
                        <div className="font-bold text-blue-700">{result.twoHour || 'N/A'} {result.unit}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/70 p-4 rounded-lg">
                    <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Mục tiêu kiểm soát:
                    </h4>
                    <div className="space-y-2">
                      {result.targets.map((target, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span className="text-gray-700">{target.label}:</span>
                          <span className="font-bold text-blue-700">{target.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs text-blue-800 text-center">
                      ⚠️ Kết quả chỉ mang tính tham khảo. Vui lòng tham khảo ý kiến bác sĩ để được chẩn đoán chính xác.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Daily Tracking Tab */}
        {activeTab === 'daily-tracking' && isAuthenticated && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Daily Input Form */}
            <div className="lg:col-span-2">
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-100">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10m6-10v10M6 7h12l-1 12H7L6 7z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">Theo dõi hàng ngày</h2>
                    <p className="text-sm text-gray-600">Ghi lại kết quả đường huyết hàng ngày</p>
                  </div>
                </div>

                <form onSubmit={handleDailySubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ngày kiểm tra</label>
                      <input
                        type="date"
                        value={dailyDate}
                        onChange={(e) => setDailyDate(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        max={new Date().toISOString().split('T')[0]}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Loại bữa ăn</label>
                      <select
                        value={mealType}
                        onChange={(e) => setMealType(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="breakfast">Bữa sáng</option>
                        <option value="lunch">Bữa trưa</option>
                        <option value="dinner">Bữa tối</option>
                        <option value="snack">Bữa phụ</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Đói ({unit})
                      </label>
                      <input
                        type="number"
                        value={dailyFasting}
                        onChange={(e) => setDailyFasting(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                        placeholder={unit === 'mmol/L' ? '5.1' : '92'}
                        step="0.1"
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                       Sau 1h ({unit})
                      </label>
                      <input
                        type="number"
                        value={dailyOneHour}
                        onChange={(e) => setDailyOneHour(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                        placeholder={unit === 'mmol/L' ? '10.0' : '180'}
                        step="0.1"
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                       Sau 2h ({unit})
                      </label>
                      <input
                        type="number"
                        value={dailyTwoHour}
                        onChange={(e) => setDailyTwoHour(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                        placeholder={unit === 'mmol/L' ? '8.5' : '153'}
                        step="0.1"
                        min="0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ghi chú (tùy chọn)</label>
                    <textarea
                      value={dailyNotes}
                      onChange={(e) => setDailyNotes(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="3"
                      placeholder="Ví dụ: Ăn nhiều đường, căng thẳng, tập thể dục..."
                    />
                  </div>

                  <div className="flex flex-row space-x-3">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-[1.02] text-base"
                      disabled={apiLoading}
                    >
                      {apiLoading ? 'Đang lưu...' : 'Lưu dữ liệu'}
                    </button>
                    <button
                      type="button"
                      onClick={handleDailyReset}
                      className="flex-1 bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700 px-6 py-3 rounded-lg hover:from-gray-400 hover:to-gray-500 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-[1.02] text-base"
                    >
                      Xóa form
                    </button>
                  </div>
                </form>
              </div>

              {/* Recent Records */}
              <div className="mt-6 bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Dữ liệu gần đây</h3>
                
                {apiLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    <p className="text-gray-600">Đang tải dữ liệu...</p>
                  </div>
                ) : dailyRecords && dailyRecords.length > 0 ? (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {dailyRecords.slice(0, 10).map((record) => {
                      const analysis = analyzeBloodSugar(
                        record.fastingGlucose,
                        record.oneHourGlucose,
                        record.twoHourGlucose,
                        record.unit
                      );

                      return (
                        <div key={record._id} className={`p-3 rounded-lg border ${
                          analysis.riskLevel === 'high' 
                            ? 'bg-red-50 border-red-200' 
                            : 'bg-green-50 border-green-200'
                        }`}>
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">
                                  {new Date(record.date).toLocaleDateString('vi-VN')} - {
                                    record.mealType === 'breakfast' ? 'Sáng' :
                                    record.mealType === 'lunch' ? 'Trưa' :
                                    record.mealType === 'dinner' ? 'Tối' : 'Phụ'
                                  }
                                </span>
                                <button
                                  onClick={() => deleteDailyRecord(record._id)}
                                  className="group flex items-center px-2 py-1 text-xs font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg border border-red-200 hover:border-red-300 transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md"
                                  title="Xóa bản ghi này"
                                >
                                  <svg className="w-3 h-3 mr-1 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                  Xóa
                                </button>
                              </div>
                              <div className="text-xs text-gray-600">
                                {record.fastingGlucose && `Đói: ${record.fastingGlucose} ${record.unit}`}
                                {record.oneHourGlucose && ` | 1h: ${record.oneHourGlucose} ${record.unit}`}
                                {record.twoHourGlucose && ` | 2h: ${record.twoHourGlucose} ${record.unit}`}
                              </div>
                              {record.notes && (
                                <div className="text-xs text-gray-500 mt-1">
                                  📝 {record.notes}
                                </div>
                              )}
                            </div>
                            <div className={`text-xs mt-1 ml-2 font-semibold ${
                              analysis.riskLevel === 'high' ? 'text-red-700' : 'text-green-700'
                            }`}>
                              {analysis.riskLevel === 'high' ? '⚠️ Cao' : '✅ OK'}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>Chưa có dữ liệu nào được ghi lại.</p>
                    <p className="text-sm mt-1">Hãy thêm kết quả đường huyết đầu tiên của bạn!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Analysis */}
            <div className="space-y-6">
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Phân tích nhanh</h3>
                
                {dailyRecords && dailyRecords.length > 0 ? (
                  <div className="space-y-4">
                    {(() => {
                      const latestRecord = dailyRecords[0];
                      const analysis = analyzeBloodSugar(
                        latestRecord.fastingGlucose,
                        latestRecord.oneHourGlucose,
                        latestRecord.twoHourGlucose,
                        latestRecord.unit
                      );

                      return (
                        <div>
                          <div className={`p-3 rounded-lg mb-3 ${
                            analysis.riskLevel === 'high' 
                              ? 'bg-red-100 border border-red-200' 
                              : 'bg-green-100 border border-green-200'
                          }`}>
                            <p className={`font-bold text-center ${
                              analysis.riskLevel === 'high' ? 'text-red-800' : 'text-green-800'
                            }`}>
                              {analysis.riskLevel === 'high' 
                                ? '⚠️ Cần chú ý' 
                                : '✅ Ổn định'
                              }
                            </p>
                          </div>

                          {analysis.warnings.length > 0 && (
                            <div className="mb-3">
                              <h4 className="font-semibold text-red-700 text-sm mb-2">Cảnh báo:</h4>
                              <ul className="text-xs text-red-600 space-y-1">
                                {analysis.warnings.map((warning, index) => (
                                  <li key={index}>• {warning}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div>
                            <h4 className="font-semibold text-blue-700 text-sm mb-2">Khuyến nghị:</h4>
                            <ul className="text-xs text-blue-600 space-y-1">
                              {analysis.advice.slice(0, 3).map((item, index) => (
                                <li key={index}>• {item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Chưa có dữ liệu để phân tích</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Statistics Tab */}
        {activeTab === 'statistics' && isAuthenticated && (
          <div className="space-y-6">
            {(() => {
              const stats = getStatisticsData();
              
              if (!stats) {
                return (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Đang tải thống kê...</p>
                  </div>
                );
              }

              if (stats.totalRecords === 0) {
                return (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Chưa có dữ liệu thống kê</h3>
                    <p className="text-gray-500 mb-4">Hãy bắt đầu ghi lại kết quả đường huyết để xem thống kê chi tiết</p>
                    <button
                      onClick={() => setActiveTab('daily-tracking')}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Bắt đầu theo dõi
                    </button>
                  </div>
                );
              }

              return (
                <>
                  {/* View Switcher */}
                  <div className="bg-white/80 backdrop-blur-sm p-2 rounded-xl shadow-lg border border-blue-100 mb-6">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setStatisticsView('overview')}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                          statisticsView === 'overview'
                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                            : 'text-blue-700 hover:bg-blue-50'
                        }`}
                      >
                        📊 Tổng quan
                      </button>
                      <button
                        onClick={() => setStatisticsView('calendar')}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                          statisticsView === 'calendar'
                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                            : 'text-blue-700 hover:bg-blue-50'
                        }`}
                      >
                        📅 Lịch theo tháng
                      </button>
                    </div>
                  </div>

                  {statisticsView === 'overview' && (
                    <>
                      {/* Statistics Overview */}
                      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                    {/* Trend Analysis */}
                    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-100">
                      <div className="flex items-center">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${
                          stats.trend === 'increasing' ? 'bg-gradient-to-r from-red-500 to-red-600' :
                          stats.trend === 'decreasing' ? 'bg-gradient-to-r from-green-500 to-green-600' :
                          'bg-gradient-to-r from-yellow-500 to-yellow-600'
                        }`}>
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Xu hướng</p>
                          <p className={`text-lg font-bold ${
                            stats.trend === 'increasing' ? 'text-red-700' :
                            stats.trend === 'decreasing' ? 'text-green-700' :
                            'text-yellow-700'
                          }`}>
                            {stats.trend === 'increasing' ? 'Tăng' :
                             stats.trend === 'decreasing' ? 'Giảm' : 'Ổn định'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* High Risk Count */}
                    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-100">
                      <div className="flex items-center">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${
                          stats.highReadings7 > 3 ? 'bg-gradient-to-r from-red-500 to-red-600' :
                          stats.highReadings7 > 0 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                          'bg-gradient-to-r from-green-500 to-green-600'
                        }`}>
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.348 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Chỉ số cao (7 ngày)</p>
                          <p className={`text-2xl font-bold ${
                            stats.highReadings7 > 3 ? 'text-red-700' :
                            stats.highReadings7 > 0 ? 'text-yellow-700' :
                            'text-green-700'
                          }`}>
                            {stats.highReadings7}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Average 7 days */}
                    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-100">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-4">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">TB đói (7 ngày)</p>
                          <p className="text-2xl font-bold text-blue-700">{stats.avgFasting7}</p>
                          <p className="text-xs text-gray-500">{unit}</p>
                        </div>
                      </div>
                    </div>

                    {/* Total Records */}
                    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-100">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Tổng bản ghi</p>
                          <p className="text-2xl font-bold text-purple-700">{stats.totalRecords}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Analysis */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {/* Trend Analysis */}
                    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-100">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">Phân tích xu hướng</h3>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-600">TB đường huyết đói (7 ngày):</span>
                          <span className="font-bold text-blue-700">{stats.avgFasting7} {unit}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-600">TB đường huyết đói (30 ngày):</span>
                          <span className="font-bold text-blue-700">{stats.avgFasting30} {unit}</span>
                        </div>

                        <div className={`p-4 rounded-lg border ${
                          stats.trend === 'increasing' ? 'bg-red-50 border-red-200' :
                          stats.trend === 'decreasing' ? 'bg-green-50 border-green-200' :
                          'bg-yellow-50 border-yellow-200'
                        }`}>
                          <h4 className={`font-semibold mb-2 ${
                            stats.trend === 'increasing' ? 'text-red-800' :
                            stats.trend === 'decreasing' ? 'text-green-800' :
                            'text-yellow-800'
                          }`}>
                            Đánh giá xu hướng:
                          </h4>
                          <p className={`text-sm ${
                            stats.trend === 'increasing' ? 'text-red-700' :
                            stats.trend === 'decreasing' ? 'text-green-700' :
                            'text-yellow-700'
                          }`}>
                            {stats.trend === 'increasing' 
                              ? '📈 Đường huyết có xu hướng tăng. Cần chú ý điều chỉnh chế độ ăn uống và tập thể dục.'
                              : stats.trend === 'decreasing'
                              ? '📉 Đường huyết có xu hướng giảm. Tình trạng đang được cải thiện tốt.'
                              : '📊 Đường huyết ổn định. Tiếp tục duy trì chế độ hiện tại.'
                            }
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Risk Assessment */}
                    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-100">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">Đánh giá rủi ro</h3>

                      <div className="space-y-4">
                        <div className={`p-4 rounded-lg border ${
                          stats.riskAssessment === 'high' ? 'bg-red-50 border-red-200' : 
                          stats.riskAssessment === 'moderate' ? 'bg-yellow-50 border-yellow-200' :
                          'bg-green-50 border-green-200'
                        }`}>
                          <h4 className={`font-semibold mb-2 ${
                            stats.riskAssessment === 'high' ? 'text-red-800' : 
                            stats.riskAssessment === 'moderate' ? 'text-yellow-800' :
                            'text-green-800'
                          }`}>
                            Đánh giá tình trạng:
                          </h4>
                          <p className={`text-sm ${
                            stats.riskAssessment === 'high' ? 'text-red-700' : 
                            stats.riskAssessment === 'moderate' ? 'text-yellow-700' :
                            'text-green-700'
                          }`}>
                            {stats.riskAssessment === 'high' 
                              ? '⚠️ Rủi ro cao - Cần gặp bác sĩ để được tư vấn và điều chỉnh phác đồ điều trị.'
                              : stats.riskAssessment === 'moderate'
                              ? '⚡ Rủi ro trung bình - Cần chú ý theo dõi và điều chỉnh lối sống.'
                              : '✅ Rủi ro thấp - Tình trạng kiểm soát tốt, tiếp tục duy trì.'
                            }
                          </p>
                        </div>

                        {stats.recommendations && stats.recommendations.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-blue-800 mb-2">Khuyến nghị:</h4>
                            <ul className="text-sm text-blue-700 space-y-1">
                              {stats.recommendations.map((rec, index) => (
                                <li key={index}>• {rec}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Recent Records Table */}
                  <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Lịch sử gần đây</h3>
                    
                    {dailyRecords && dailyRecords.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-2 px-2">Ngày</th>
                              <th className="text-left py-2 px-2">Bữa</th>
                              <th className="text-left py-2 px-2">Đói</th>
                              <th className="text-left py-2 px-2">Sau 1h</th>
                              <th className="text-left py-2 px-2">Sau 2h</th>
                              <th className="text-left py-2 px-2">Trạng thái</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dailyRecords.slice(0, 15).map((record) => (
                              <tr key={record._id} className="border-b border-gray-100">
                                <td className="py-3 px-2">{new Date(record.date).toLocaleDateString('vi-VN')}</td>
                                <td className="py-3 px-2">
                                  {record.mealType === 'breakfast' ? 'Sáng' :
                                   record.mealType === 'lunch' ? 'Trưa' :
                                   record.mealType === 'dinner' ? 'Tối' : 'Phụ'}
                                </td>
                                <td className="py-3 px-2">{record.fastingGlucose || '-'}</td>
                                <td className="py-3 px-2">{record.oneHourGlucose || '-'}</td>
                                <td className="py-3 px-2">{record.twoHourGlucose || '-'}</td>
                                <td className="py-3 px-2">
                                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                    record.riskLevel === 'high' 
                                      ? 'bg-red-100 text-red-800' 
                                      : 'bg-green-100 text-green-800'
                                  }`}>
                                    {record.riskLevel === 'high' ? 'Cao' : 'OK'}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-4">Chưa có dữ liệu</p>
                    )}
                  </div>
                    </>
                  )}

                  {statisticsView === 'calendar' && (
                    <>
                      {/* Calendar View */}
                      <div className="calendar-container bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-100">
                        {/* Calendar Header */}
                        <div className="calendar-header flex items-center justify-between mb-6">
                          <h2 className="text-xl font-bold text-gray-800">
                            Lịch theo dõi - {currentCalendarMonth.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}
                          </h2>
                          <div className="calendar-nav-buttons flex items-center space-x-2">
                            <button
                              onClick={() => navigateCalendar(-1)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                              </svg>
                            </button>
                            <button
                              onClick={() => setCurrentCalendarMonth(new Date())}
                              className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              Hôm nay
                            </button>
                            <button
                              onClick={() => navigateCalendar(1)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* Calendar Grid */}
                        <div className="calendar-grid grid grid-cols-7 gap-1 mb-4">
                          {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(day => (
                            <div key={day} className="calendar-day-header p-2 text-center text-sm font-semibold text-gray-600 bg-gray-50 rounded">
                              {day}
                            </div>
                          ))}
                        </div>

                        <div className="calendar-grid grid grid-cols-7 gap-1">
                          {getCalendarData().map((day, index) => (
                            <div
                              key={index}
                              className={`calendar-day-cell min-h-[80px] p-1 border rounded-lg cursor-pointer transition-all duration-200 ${
                                !day.isCurrentMonth 
                                  ? 'bg-gray-50 text-gray-400' 
                                  : day.isToday
                                  ? 'bg-blue-50 border-blue-200'
                                  : 'bg-white hover:bg-gray-50 hover:shadow-md'
                              } ${day.hasHighRisk ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                              onMouseEnter={(e) => handleMouseEnter(e, day)}
                              onMouseLeave={handleMouseLeave}
                            >
                              <div className="calendar-day-number text-sm font-medium mb-1">
                                {day.date.getDate()}
                              </div>
                              
                              {day.records.length > 0 && (
                                <div className="space-y-1">
                                  {day.records.slice(0, 2).map((record, recordIndex) => (
                                    <div
                                      key={recordIndex}
                                      className={`calendar-record-item text-xs p-1 rounded ${
                                        record.riskLevel === 'high'
                                          ? 'bg-red-100 text-red-800'
                                          : 'bg-green-100 text-green-800'
                                      }`}
                                      title={`${record.mealType === 'breakfast' ? 'Sáng' : record.mealType === 'lunch' ? 'Trưa' : record.mealType === 'dinner' ? 'Tối' : 'Phụ'}: ${record.fastingGlucose || record.oneHourGlucose || record.twoHourGlucose} ${record.unit}`}
                                    >
                                      {record.mealType === 'breakfast' ? '🌅' : record.mealType === 'lunch' ? '☀️' : record.mealType === 'dinner' ? '🌙' : '🍎'}
                                      {record.riskLevel === 'high' ? '⚠️' : '✅'}
                                    </div>
                                  ))}
                                  {day.records.length > 2 && (
                                    <div className="calendar-record-overflow text-xs text-gray-500">
                                      +{day.records.length - 2} khác
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Calendar Legend */}
                        <div className="calendar-legend mt-6 p-4 bg-gray-50 rounded-lg">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">Chú thích:</h4>
                          <div className="calendar-legend-grid grid grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                            <div className="calendar-legend-item flex items-center">
                              <div className="calendar-legend-color w-4 h-4 bg-green-100 rounded mr-2"></div>
                              <span>Bình thường</span>
                            </div>
                            <div className="calendar-legend-item flex items-center">
                              <div className="calendar-legend-color w-4 h-4 bg-red-100 rounded mr-2"></div>
                              <span>Nguy cơ cao</span>
                            </div>
                            <div className="calendar-legend-item flex items-center">
                              <div className="calendar-legend-color w-4 h-4 bg-blue-50 border border-blue-200 rounded mr-2"></div>
                              <span>Hôm nay</span>
                            </div>
                            <div className="calendar-legend-item flex items-center space-x-1">
                              <span>🌅 Sáng</span>
                              <span>☀️ Trưa</span>
                              <span>🌙 Tối</span>
                              <span>🍎 Phụ</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </>
              );
            })()}
          </div>
        )}

        {/* Calendar Tooltip */}
        {tooltip.visible && tooltip.content && (
          <div
            className="calendar-tooltip visible"
            style={{
              left: `${tooltip.x}px`,
              top: `${tooltip.y}px`
            }}
          >
            <div className="calendar-tooltip-header">
              {tooltip.content.date.toLocaleDateString('vi-VN', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long' 
              })}
              {tooltip.content.records.length > 0 && (
                <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem' }}>
                  {tooltip.content.records.length} bữa ăn được ghi nhận
                </div>
              )}
            </div>
            
            {tooltip.content.records.length > 0 ? (
              <div>
                {/* Chi tiết từng record */}
                <div className="calendar-tooltip-records-container">
                  {tooltip.content.records.map((record, index) => (
                  <div key={index} className="calendar-tooltip-record">
                    <div className="calendar-tooltip-meal">
                      <span>{getMealIcon(record.mealType)}</span>
                      <span>{formatMealType(record.mealType)}</span>
                      {formatTimestamp(record.createdAt) && (
                        <span className="calendar-tooltip-timestamp">
                          {formatTimestamp(record.createdAt)}
                        </span>
                      )}
                    </div>
                    <div className="calendar-tooltip-value">
                      {record.fastingGlucose && (
                        <div className={`${record.riskLevel === 'high' ? 'calendar-tooltip-risk-high' : 'calendar-tooltip-risk-normal'}`}>
                          Lúc đói: {record.fastingGlucose} {record.unit}
                        </div>
                      )}
                      {record.oneHourGlucose && (
                        <div className={`${record.riskLevel === 'high' ? 'calendar-tooltip-risk-high' : 'calendar-tooltip-risk-normal'}`}>
                          Sau 1h: {record.oneHourGlucose} {record.unit}
                        </div>
                      )}
                      {record.twoHourGlucose && (
                        <div className={`${record.riskLevel === 'high' ? 'calendar-tooltip-risk-high' : 'calendar-tooltip-risk-normal'}`}>
                          Sau 2h: {record.twoHourGlucose} {record.unit}
                        </div>
                      )}
                    </div>
                    
                    {/* Hiển thị notes nếu có */}
                    {record.notes && record.notes.trim() && (
                      <div className="calendar-tooltip-notes">
                        <div className="calendar-tooltip-notes-title">📝 Ghi chú:</div>
                        <div className="calendar-tooltip-notes-content">{record.notes}</div>
                      </div>
                    )}
                    </div>
                  ))}
                </div>
                
                {/* Thống kê tổng quan của ngày */}
                {(() => {
                  const dayStats = getDayStatistics(tooltip.content.records);
                  if (!dayStats) return null;
                  
                  return (
                    <div className="calendar-tooltip-summary">
                      <div className="calendar-tooltip-summary-title">📊 Tổng quan ngày</div>
                      <div className="calendar-tooltip-summary-item">
                        <span>Số lần đo:</span>
                        <span>{dayStats.totalTests} lần</span>
                      </div>
                      <div className="calendar-tooltip-summary-item">
                        <span>Số bữa ăn:</span>
                        <span>{dayStats.totalRecords} bữa</span>
                      </div>
                      {dayStats.totalTests > 0 && (
                        <>
                          <div className="calendar-tooltip-summary-item">
                            <span>Kết quả bình thường:</span>
                            <span className="calendar-tooltip-risk-normal">{dayStats.normalTests} lần</span>
                          </div>
                          <div className="calendar-tooltip-summary-item">
                            <span>Nguy cơ cao:</span>
                            <span className="calendar-tooltip-risk-high">{dayStats.highRiskTests} lần</span>
                          </div>
                          
                          {/* Risk indicator */}
                          <div className={`calendar-tooltip-risk-indicator ${
                            dayStats.riskPercentage > 50 ? 'calendar-tooltip-risk-high-bg' : 'calendar-tooltip-risk-normal-bg'
                          }`}>
                            {dayStats.riskPercentage > 50 ? '⚠️' : '✅'}
                            {dayStats.riskPercentage > 50 ? 'Cần chú ý' : 'Ổn định'}
                            ({dayStats.riskPercentage}% nguy cơ cao)
                          </div>
                        </>
                      )}
                    </div>
                  );
                })()}
              </div>
            ) : (
              <div className="calendar-tooltip-empty">
                Không có dữ liệu test
              </div>
            )}
          </div>
        )}

        {/* Toast Notification */}
        {toast.visible && (
          <div
            className={`fixed top-6 right-6 p-4 z-[9999] rounded-xl shadow-xl text-white max-w-sm transform transition-all duration-300 ${
              toast.type === 'success' 
                ? 'bg-gradient-to-r from-green-500 to-green-600 border border-green-400' 
                : 'bg-gradient-to-r from-red-500 to-red-600 border border-red-400'
            }`}
            role="alert"
            aria-live="assertive"
          >
            <div className="flex items-center">
              <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  {toast.type === 'success' ? (
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  ) : (
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  )}
                </svg>
              </div>
              <p className="font-medium">{toast.message}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}