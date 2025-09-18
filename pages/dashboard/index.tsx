import { useRouter } from "next/router";
import AdminLayout from "../../components/layout/AdminLayout";
import Heading from "../../components/backend/Heading";
import DashboardStats from "../../components/admin/DashboardStats";
import UserManagementTable from "../../components/admin/UserManagementTable";
import BloodGlucoseManagementTable from "../../components/admin/BloodGlucoseManagementTable";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('stats');

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      router.push("/dang-nhap");
      return;
    }

    if ((session.user as any)?.role !== "admin") {
      router.push("/");
      return;
    }

    setIsLoading(false);
  }, [session, status, router]);

  // Loading state
  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl font-semibold">Đang tải Dashboard...</div>
      </div>
    );
  }

  // Not authenticated
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl font-semibold">Vui lòng đăng nhập...</div>
      </div>
    );
  }

  // Not admin
  if ((session.user as any)?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl font-semibold text-red-600">Bạn không có quyền truy cập trang này</div>
      </div>
    );
  }

  return (
    <AdminLayout title="Dashboard - Giang Nội Tiết">
      <Heading title="Dashboard - Quản lý Giang Nội Tiết" />
      <div className="p-8 bg-gray-50 min-h-screen overflow-x-hidden max-w-full">
        {/* Tab Navigation */}
        <div className="mb-6">
          <nav className="flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('stats')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'stats'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Thống kê tổng quan
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'users'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Quản lý người dùng
            </button>
            <button
              onClick={() => setActiveTab('glucose')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'glucose'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Quản lý đường huyết
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'stats' && <DashboardStats />}
          {activeTab === 'users' && <UserManagementTable />}
          {activeTab === 'glucose' && <BloodGlucoseManagementTable />}
        </div>
      </div>
    </AdminLayout>
  );
}