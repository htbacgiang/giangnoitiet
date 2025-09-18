import { useRouter } from "next/router";
import AdminLayout from "../../../components/layout/AdminLayout";
import Heading from "../../../components/backend/Heading";
import UserManagementTable from "../../../components/admin/UserManagementTable";
import UserStats from "../../../components/admin/UserStats";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function UserManagementPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      router.push("/dang-nhap");
      return;
    }

    if (session.user?.role !== "admin") {
      router.push("/");
      return;
    }

    setIsLoading(false);
  }, [session, status, router]);

  // Loading state
  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl font-semibold">Đang tải trang quản lý người dùng...</div>
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
  if (session.user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl font-semibold text-red-600">Bạn không có quyền truy cập trang này</div>
      </div>
    );
  }

  return (
    <AdminLayout title="Quản lý Người dùng - Giang Nội Tiết">
      <Heading title="Quản lý Người dùng" />
      <div className="p-8 bg-gray-50 min-h-screen overflow-x-hidden max-w-full">
        <div className="space-y-6">
          <UserStats />
          <UserManagementTable />
        </div>
      </div>
    </AdminLayout>
  );
}
