import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { toast } from 'react-hot-toast';

const BloodGlucoseManagementTable = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [filters, setFilters] = useState({
    mealType: '',
    riskLevel: '',
    startDate: '',
    endDate: ''
  });

  const fetchRecords = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage,
        limit: 10,
        ...(searchTerm && { search: searchTerm }),
        ...(filters.mealType && { mealType: filters.mealType }),
        ...(filters.riskLevel && { riskLevel: filters.riskLevel }),
        ...(filters.startDate && { startDate: filters.startDate }),
        ...(filters.endDate && { endDate: filters.endDate })
      });

      const response = await fetch(`/api/admin/blood-glucose-records?${params}`);
      const data = await response.json();

      if (data.success) {
        setRecords(data.data.records);
        setTotalPages(data.data.pagination.pages);
        setTotalItems(data.data.pagination.total);
      } else {
        toast.error('Có lỗi xảy ra khi tải dữ liệu đường huyết');
      }
    } catch (error) {
      console.error('Error fetching blood glucose records:', error);
      toast.error('Có lỗi xảy ra khi tải dữ liệu đường huyết');
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, filters]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMealTypeLabel = (mealType) => {
    const mealTypes = {
      breakfast: 'Sáng',
      lunch: 'Trưa',
      dinner: 'Tối',
      snack: 'Ăn vặt'
    };
    return mealTypes[mealType] || mealType;
  };

  const getRiskLevelBadge = (riskLevel) => {
    const riskConfig = {
      normal: { color: 'bg-green-100 text-green-800', text: 'Bình thường' },
      high: { color: 'bg-red-100 text-red-800', text: 'Cao' }
    };
    
    const config = riskConfig[riskLevel] || riskConfig.normal;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        {config.text}
      </span>
    );
  };

  const getGlucoseValue = (record) => {
    if (record.fastingGlucose) return `${record.fastingGlucose} ${record.unit}`;
    if (record.oneHourGlucose) return `${record.oneHourGlucose} ${record.unit}`;
    if (record.twoHourGlucose) return `${record.twoHourGlucose} ${record.unit}`;
    return 'N/A';
  };

  const getGlucoseType = (record) => {
    if (record.fastingGlucose) return 'Đói';
    if (record.oneHourGlucose) return '1h sau ăn';
    if (record.twoHourGlucose) return '2h sau ăn';
    return 'N/A';
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const clearFilters = () => {
    setFilters({
      mealType: '',
      riskLevel: '',
      startDate: '',
      endDate: ''
    });
    setSearchTerm('');
    setCurrentPage(1);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Quản lý Chỉ số Đường huyết</h3>
        <p className="text-sm text-gray-500">Theo dõi và quản lý dữ liệu đường huyết của tất cả người dùng</p>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loại bữa ăn
            </label>
            <select
              value={filters.mealType}
              onChange={(e) => handleFilterChange('mealType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tất cả</option>
              <option value="breakfast">Sáng</option>
              <option value="lunch">Trưa</option>
              <option value="dinner">Tối</option>
              <option value="snack">Ăn vặt</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mức độ rủi ro
            </label>
            <select
              value={filters.riskLevel}
              onChange={(e) => handleFilterChange('riskLevel', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tất cả</option>
              <option value="normal">Bình thường</option>
              <option value="high">Cao</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Từ ngày
            </label>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => handleFilterChange('startDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Đến ngày
            </label>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => handleFilterChange('endDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Tìm kiếm theo tên người dùng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md"
            >
              Xóa bộ lọc
            </button>
            <button
              onClick={() => {
                // TODO: Implement export functionality
                toast.info('Tính năng xuất dữ liệu đang được phát triển');
              }}
              className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700"
            >
              Xuất Excel
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Người dùng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày & Bữa ăn
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Chỉ số đường huyết
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mức độ rủi ro
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tuần thai
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ghi chú
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    <span className="ml-2">Đang tải...</span>
                  </div>
                </td>
              </tr>
            ) : records.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  Không có dữ liệu đường huyết
                </td>
              </tr>
            ) : (
              records.map((record) => (
                <tr key={record._id} className="hover:bg-gray-50">
                  {/* Người dùng */}
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 relative">
                        <Image
                          className="rounded-full"
                          src={record.user?.image || '/default-avatar.png'}
                          alt={record.user?.name}
                          fill
                        />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {record.user?.name || 'N/A'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {record.user?.email || 'N/A'}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  {/* Ngày & Bữa ăn */}
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {formatDate(record.date)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {getMealTypeLabel(record.mealType)}
                    </div>
                  </td>
                  
                  {/* Chỉ số đường huyết */}
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {getGlucoseValue(record)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {getGlucoseType(record)}
                    </div>
                  </td>
                  
                  {/* Mức độ rủi ro */}
                  <td className="px-6 py-4">
                    {getRiskLevelBadge(record.riskLevel)}
                  </td>
                  
                  {/* Tuần thai */}
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {record.gestationalWeek ? `Tuần ${record.gestationalWeek}` : 'N/A'}
                  </td>
                  
                  {/* Ghi chú */}
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs">
                      {record.notes ? (
                        <div className="truncate" title={record.notes}>
                          {record.notes}
                        </div>
                      ) : (
                        <span className="text-gray-500">Không có</span>
                      )}
                    </div>
                  </td>
                  
                  {/* Hành động */}
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => {
                          // TODO: Implement view record details
                          toast.info('Tính năng đang được phát triển');
                        }}
                      >
                        Xem
                      </button>
                      <button
                        className="text-green-600 hover:text-green-900"
                        onClick={() => {
                          // TODO: Implement edit record
                          toast.info('Tính năng đang được phát triển');
                        }}
                      >
                        Sửa
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => {
                          // TODO: Implement delete record
                          toast.info('Tính năng đang được phát triển');
                        }}
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Trước
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Sau
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Hiển thị <span className="font-medium">{(currentPage - 1) * 10 + 1}</span> đến{' '}
                <span className="font-medium">
                  {Math.min(currentPage * 10, totalItems)}
                </span>{' '}
                trong tổng số <span className="font-medium">{totalItems}</span> kết quả
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  Trước
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === page
                          ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  Sau
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BloodGlucoseManagementTable;
