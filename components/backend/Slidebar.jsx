"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import styles from "./Sidebar.module.css";

import {
  LayoutGrid,
  Notebook,
  Settings,
  Users2,
  LogOut,
  ShoppingCart,
  FolderPlus,
  SquarePen,
  TicketPercent,
  ShoppingBasket,
  Mail,
  Calendar,
  CalendarDays,
} from "lucide-react";

import { useRouter } from "next/router";

export default function Sidebar() {
  const router = useRouter();
  const pathname = router.pathname;
  const { data: session, status } = useSession();

  const sildebarLinks = [
    {
      title: "Bài viết",
      icon: Notebook,
      href: "/dashboard/bai-viet",
    },
    {
      title: "Thêm bài viết",
      icon: SquarePen,
      href: "/dashboard/them-bai-viet",
    },
    {
      title: "Quản lý user",
      icon: Users2,
      href: "/dashboard/quan-ly-nguoi-dung",
    },
    {
      title: "Email đăng ký",
      icon: Mail,
      href: "/dashboard/danh-sach-email",
    },

    {
      title: "Cài đặt",
      icon: Settings,
      href: "/cai-dat",
    },
  ];



  // Hàm xử lý đăng xuất
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  // Nếu đang tải trạng thái phiên, hiển thị loading
  if (status === "loading") {
    return <div className={styles.loadingContainer}>Đang tải...</div>;
  }

  return (
    <div className={styles.sidebar}>
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="flex-shrink-0 p-6">
          <Link href="/" className="inline-block">
            <div className="flex items-center space-x-3">
              {/* Logo hình ảnh với nền gradient xanh lá */}
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
                <Image
                  src="/logo-giang-noi-tiet-2.png"
                  alt="Giang Nội Tiết Logo"
                  width={48}
                  height={48}
                  className="object-contain brightness-0 invert"
                />
              </div>

              {/* Chữ Giang Nội Tiết */}
              <div className="flex flex-col">
                <span className="text-xl font-bold uppercase text-gray-800 leading-tight hover:text-teal-600 transition-colors duration-300">Giang Nội Tiết</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 overflow-y-auto">
          <div className={styles.navContainer}>
            <Link
              href="/dashboard"
              className={`${styles.navLink} ${pathname === "/dashboard" ? styles.active : ""
                }`}
            >
              <LayoutGrid />
              <span>DashBoard</span>
            </Link>

            {sildebarLinks.map((item, i) => {
              const Icon = item.icon;
              return (
                <Link
                  href={item.href}
                  key={i}
                  className={`${styles.navLink} ${item.href === pathname ? styles.active : ""
                    }`}
                >
                  <Icon />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Logout Section */}
        {session && (
          <div className="flex-shrink-0">
            <div className={styles.logoutContainer}>
              <button
                onClick={handleSignOut}
                className={styles.logoutButton}
              >
                <LogOut />
                <span>Đăng xuất</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}