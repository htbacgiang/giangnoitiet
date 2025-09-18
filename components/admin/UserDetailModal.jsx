import React from 'react';

const UserDetailModal = ({ user, isOpen, onClose }) => {
  if (!isOpen || !user) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'Chưa cung cấp';
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRoleBadge = (role) => {
    const roleConfig = {
      admin: { color: 'bg-red-100 text-red-800', text: 'Quản trị viên' },
      user: { color: 'bg-blue-100 text-blue-800', text: 'Người dùng' },
      doctor: { color: 'bg-green-100 text-green-800', text: 'Bác sĩ' }
    };
    
    const config = roleConfig[role] || roleConfig.user;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        {config.text}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
        <div className="mt-3">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Thông tin chi tiết người dùng</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* User Info */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-md font-medium text-gray-900 mb-4">Thông tin cơ bản</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tên</label>
                  <p className="mt-1 text-sm text-gray-900">{user.name || 'Chưa cung cấp'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Giới tính</label>
                  <p className="mt-1 text-sm text-gray-900">{user.gender || 'Chưa cung cấp'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ngày sinh</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {user.dateOfBirth ? formatDate(user.dateOfBirth) : 'Chưa cung cấp'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Vai trò</label>
                  <div className="mt-1">
                    {getRoleBadge(user.role)}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-md font-medium text-gray-900 mb-4">Thông tin liên hệ</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-sm text-gray-900">{user.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                  <p className="mt-1 text-sm text-gray-900">{user.phone || 'Chưa cung cấp'}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Trạng thái xác thực email</label>
                  <div className="mt-1">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      user.emailVerified 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.emailVerified ? 'Đã xác thực' : 'Chưa xác thực'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Info */}
            {user.address && user.address.length > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-md font-medium text-gray-900 mb-4">Địa chỉ</h4>
                <div className="space-y-3">
                  {user.address.map((addr, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">
                          {addr.type === 'home' ? 'Nhà riêng' : 'Văn phòng'}
                          {addr.isDefault && <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Mặc định</span>}
                        </span>
                      </div>
                      <p className="text-sm text-gray-900 mt-1">
                        {addr.fullName} - {addr.phoneNumber}
                      </p>
                      <p className="text-sm text-gray-600">
                        {addr.address1}, {addr.wardName}, {addr.districtName}, {addr.cityName}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* System Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-md font-medium text-gray-900 mb-4">Thông tin hệ thống</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ngày tạo tài khoản</label>
                  <p className="mt-1 text-sm text-gray-900">{formatDate(user.createdAt)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Cập nhật lần cuối</label>
                  <p className="mt-1 text-sm text-gray-900">{formatDate(user.updatedAt)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;
