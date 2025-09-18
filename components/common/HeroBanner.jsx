"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import VoiceTestPopup from "./VoiceTestPopup";

const HeroBanner = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  const students = [
    { id: 1, avatar: "/images/hoc-vien-01.jpg", name: "Bích Thủy" },
    { id: 2, avatar: "/images/hoc-vien-02.jpg", name: "Sarah" },
    { id: 3, avatar: "/images/hoc-vien-03.jpg", name: "Mike" },
  ];

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="relative min-h-screen hero-bg-gradient full-screen-bg overflow-hidden py-16">
      {/* Background Decorative Elements */}
      <div className="h-[80px]"></div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-gradient-to-br from-purple-400/25 to-pink-400/25 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-blue-400/25 to-cyan-400/25 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-indigo-300/20 to-purple-300/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6 sm:space-y-8 lg:space-y-10 text-center lg:text-left">
          {/* Badge */}
          <div className="flex justify-center lg:justify-start">
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 px-3 sm:px-4 py-2 rounded-full">
              <span className="text-blue-800 font-semibold text-sm md:text-base tracking-wide uppercase whitespace-nowrap">
               Đào tạo MC - Thuyết trình chuyên nghiệp
              </span>
            </div>
          </div>

          {/* Main Heading */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-3xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Trung tâm đào tạo{" "}
              <br />

              <span className="text-gradient-green-blue">
                MC - {" "}
              </span>
              <span className="text-gradient-blue-purple">
                BT Academy
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Nơi ươm mầm tài năng, đào tạo những MC và diễn giả chuyên nghiệp với kỹ năng giao tiếp xuất sắc.
            </p>
          </div>

       

          {/* Student Testimonials */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="flex -space-x-3">
              {students.map((student) => (
                <div key={student.id} className="relative">
                  <Image
                    src={student.avatar}
                    alt={student.name}
                    width={48}
                    height={48}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-3 border-white object-cover shadow-lg"
                  />
                </div>
              ))}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-3 border-white flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-base sm:text-sm">+</span>
              </div>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-gray-900 font-semibold text-base sm:text-base">Tham gia cùng 500+ Học viên</p>
              <p className="text-gray-600 text-base sm:text-base">Nâng cao kỹ năng giao tiếp mỗi tuần 📈</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-row gap-2 sm:gap-4 pt-2 sm:pt-4">
            <button 
              onClick={handleOpenPopup}
              className="group relative btn-gradient-blue-purple text-white px-3 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex-1"
            >
              <span className="relative z-10">🎤 Test giọng MC ngay</span>
              <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <Link href="/khoa-hoc" className="flex-1">
              <button className="w-full border-2 border-gray-300 hover:border-blue-500 bg-white/80 backdrop-blur-sm text-gray-700 hover:text-blue-600 px-3 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
               Tìm hiểu khóa học
              </button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-6 pt-4 sm:pt-6 border-t border-white/20">
            <div className="flex items-center space-x-2 text-base sm:text-sm text-gray-600">
              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-base">✓</span>
              </div>
              <span>Chứng chỉ được công nhận</span>
            </div>
            <div className="flex items-center space-x-2 text-base sm:text-sm text-gray-600">
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-base">✓</span>
              </div>
              <span>Hỗ trợ việc làm sau khóa học</span>
            </div>
            <div className="flex items-center space-x-2 text-base sm:text-sm text-gray-600">
              <div className="w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-base">✓</span>
              </div>
              <span>Học phí linh hoạt</span>
            </div>
          </div>
        </div>

        {/* Right Content - Images Grid */}
        <div className="relative flex flex-row gap-2 sm:gap-3 lg:gap-4 h-auto lg:h-[500px] mt-8 lg:mt-0">
          {/* Left Section - Main Image */}
          <div className="w-1/2 relative z-20">
            <div className="gradient-purple rounded-2xl sm:rounded-3xl h-[300px] sm:h-[280px] lg:h-full flex items-center justify-center">
              <Image
                src="/images/mc-bich-thuy.jpg"
                alt="Happy student"
                width={350}
                height={450}
                className="w-auto h-full max-w-full rounded-xl sm:rounded-2xl object-cover"
              />
            </div>
          </div>

          {/* Right Column - Two Stacked Images */}
          <div className="w-1/2 flex flex-col gap-2 sm:gap-3">
            {/* Top Right Image - Cyan */}
            <div className="gradient-cyan rounded-2xl sm:rounded-3xl flex-1 flex items-center justify-center h-[95px] sm:h-[135px] lg:h-auto">
              <Image
                src="/images/bt-academy.jpg"
                alt="Student"
                width={250}
                height={220}
                className="w-full h-full rounded-xl sm:rounded-2xl object-cover"
              />
            </div>

            {/* Bottom Right Image - Orange */}
            <div className="gradient-orange rounded-2xl sm:rounded-3xl flex-1 flex items-center justify-center h-[95px] sm:h-[135px] lg:h-auto">
              <Image
                src="/images/gallery/hoc-vien-bt-06.jpg"
                alt="Student"
                width={250}
                height={220}
                className="w-full h-full rounded-xl sm:rounded-2xl object-cover"
              />
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-1/4 -left-8 z-30">
            <div className="bg-white rounded-full p-2 shadow-lg animate-bounce">
              <div className="w-5 h-5 bg-blue-600 rounded-full"></div>
            </div>
          </div>

          <div className="absolute bottom-1/3 -right-4 z-30">
            <div className="bg-white rounded-full p-3 shadow-lg animate-pulse">
              <div className="w-6 h-6 bg-purple-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Shapes */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-400 rounded-full opacity-60 animate-ping"></div>
      <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-purple-400 rounded-full opacity-60 animate-ping delay-75"></div>
      <div className="absolute top-2/3 right-1/4 w-5 h-5 bg-pink-400 rounded-full opacity-60 animate-ping delay-150"></div>
      
      {/* Voice Test Popup */}
      <VoiceTestPopup 
        isOpen={isPopupOpen} 
        onClose={handleClosePopup}
      />
    </div>
  );
};

export default HeroBanner;
