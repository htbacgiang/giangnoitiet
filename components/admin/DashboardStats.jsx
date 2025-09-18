import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const DashboardStats = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalRecords: 0,
    highRiskRecords: 0,
    todayRecords: 0,
    weeklyRecords: 0,
    monthlyRecords: 0,
    averageGlucose: 0,
    riskDistribution: {
      normal: 0,
      high: 0
    },
    mealTypeDistribution: {
      breakfast: 0,
      lunch: 0,
      dinner: 0,
      snack: 0
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/dashboard-stats');
      const data = await response.json();

      if (data.success) {
        setStats(data.data);
      } else {
        toast.error('Có lỗi xảy ra khi tải thống kê');
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      toast.error('Có lỗi xảy ra khi tải thống kê');
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, color, subtitle }) => (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">
            {loading ? '...' : value}
          </p>
          {subtitle && (
            <p className="text-xs text-gray-500">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );

  const ProgressBar = ({ label, value, total, color }) => (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="text-gray-900">{value}/{total}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${color}`}
          style={{ width: `${total > 0 ? (value / total) * 100 : 0}%` }}
        ></div>
      </div>
    </div>
  );

  const getMealTypeLabel = (mealType) => {
    const mealTypes = {
      breakfast: 'Sáng',
      lunch: 'Trưa',
      dinner: 'Tối',
      snack: 'Ăn vặt'
    };
    return mealTypes[mealType] || mealType;
  };

  return (
    <div className="space-y-6">
      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Tổng người dùng"
          value={stats.totalUsers}
          icon={
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
          color="bg-blue-100"
          subtitle="Người dùng đã đăng ký"
        />
        
        <StatCard
          title="Người dùng hoạt động"
          value={stats.activeUsers}
          icon={
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          color="bg-green-100"
          subtitle="Đã xác thực email"
        />
        
        <StatCard
          title="Tổng bản ghi"
          value={stats.totalRecords}
          icon={
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          }
          color="bg-purple-100"
          subtitle="Dữ liệu đường huyết"
        />
        
        <StatCard
          title="Bản ghi rủi ro cao"
          value={stats.highRiskRecords}
          icon={
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          }
          color="bg-red-100"
          subtitle="Cần theo dõi"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Hôm nay"
          value={stats.todayRecords}
          icon={
            <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          color="bg-yellow-100"
          subtitle="Bản ghi hôm nay"
        />
        
        <StatCard
          title="Tuần này"
          value={stats.weeklyRecords}
          icon={
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
          color="bg-indigo-100"
          subtitle="Bản ghi tuần này"
        />
        
        <StatCard
          title="Tháng này"
          value={stats.monthlyRecords}
          icon={
            <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          }
          color="bg-pink-100"
          subtitle="Bản ghi tháng này"
        />
      </div>

      {/* Charts and Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Level Distribution */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Phân bố Mức độ Rủi ro</h3>
          <div className="space-y-4">
            <ProgressBar
              label="Bình thường"
              value={stats.riskDistribution.normal}
              total={stats.riskDistribution.normal + stats.riskDistribution.high}
              color="bg-green-500"
            />
            <ProgressBar
              label="Rủi ro cao"
              value={stats.riskDistribution.high}
              total={stats.riskDistribution.normal + stats.riskDistribution.high}
              color="bg-red-500"
            />
          </div>
          <div className="mt-4 text-sm text-gray-500">
            Tổng: {stats.riskDistribution.normal + stats.riskDistribution.high} bản ghi
          </div>
        </div>

        {/* Meal Type Distribution */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Phân bố theo Bữa ăn</h3>
          <div className="space-y-4">
            {Object.entries(stats.mealTypeDistribution).map(([mealType, count]) => (
              <ProgressBar
                key={mealType}
                label={getMealTypeLabel(mealType)}
                value={count}
                total={Object.values(stats.mealTypeDistribution).reduce((a, b) => a + b, 0)}
                color={
                  mealType === 'breakfast' ? 'bg-orange-500' :
                  mealType === 'lunch' ? 'bg-blue-500' :
                  mealType === 'dinner' ? 'bg-purple-500' :
                  'bg-gray-500'
                }
              />
            ))}
          </div>
          <div className="mt-4 text-sm text-gray-500">
            Tổng: {Object.values(stats.mealTypeDistribution).reduce((a, b) => a + b, 0)} bản ghi
          </div>
        </div>
      </div>

      {/* Average Glucose Level */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Chỉ số Đường huyết Trung bình</h3>
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {loading ? '...' : `${stats.averageGlucose.toFixed(1)} mmol/L`}
            </div>
            <p className="text-gray-500">
              Chỉ số trung bình của tất cả bản ghi
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
