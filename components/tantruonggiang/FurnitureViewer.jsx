"use client";
import React, { useState, useCallback } from "react";

const FurnitureViewer = () => {
  // Link video 360 cho toàn bộ tour
  const videoUrl = "https://www.jegaai.com/720/S5DDIGDJCI"; // Link thực tế, hỗ trợ chuyển đổi giữa các phòng

  // Trạng thái để theo dõi tab đang được chọn
  const [selectedTab, setSelectedTab] = useState("LIVING ROOM");
  // Trạng thái để xử lý lỗi video
  const [videoError, setVideoError] = useState(false);

  // Hàm xử lý khi nhấn vào tab
  const handleTabClick = useCallback((tab) => {
    setSelectedTab(tab);
    // Không thay đổi URL vì tất cả phòng được truy cập từ cùng một tour
  }, []);

  // Danh sách các tab và biểu tượng tương ứng, dựa trên JegaAI scene labels
  const tabs = [
    {
      name: "LIVING ROOM",
      vietnameseName: "PHÒNG KHÁCH",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      name: "DINING ROOM",
      vietnameseName: "PHÒNG ĂN",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 7h18M3 12h18m-7 5h7"
          />
        </svg>
      ),
    },
    {
      name: "KITCHEN",
      vietnameseName: "NHÀ BẾP",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 10h16M4 14h16M4 18h16"
          />
        </svg>
      ),
    },
    {
      name: "MASTER BEDROOM",
      vietnameseName: "PHÒNG NGỦ CHÍNH",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2z"
          />
        </svg>
      ),
    },
    {
      name: "SECOND BEDROOM",
      vietnameseName: "PHÒNG NGỦ PHỤ",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2z"
          />
        </svg>
      ),
    },
   
    {
      name: "CLOAKROOM",
      vietnameseName: "TỦ QUẦN ÁO",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div 
      className="min-h-screen text-white"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
      }}
    >
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 50%)'
        }}
      ></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 lg:p-8">
        {/* Header Section */}
        <div className="w-full max-w-6xl mb-4 lg:mb-4">
          <div className="text-center mb-3">
            <h2 
              className="text-2xl md:text-3xl  font-bold mb-2 leading-tight"
              style={{
                background: 'linear-gradient(90deg, #fbbf24 0%, #f97316 50%, #f43f5e 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              THIẾT KẾ 3D HIỆN ĐẠI -  CÔNG NGHỆ VR THỰC TẾ ẢO
            </h2>
            <div 
              className="w-24 h-1 mx-auto "
              style={{
                background: 'linear-gradient(90deg, #fbbf24 0%, #f43f5e 100%)'
              }}
            ></div>
          
          </div>
          <p className="text-slate-400 text-base md:text-lg lg:text-xl max-w-5xl mx-auto text-center leading-relaxed">
            Mang đến trải nghiệm thực tế 360° cho căn hộ tương lai của quý vị một
            cách chân thực và trực quan nhất.
          </p>
        </div>

        {/* Main Content */}
        <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Video Section */}
          <div className="w-full lg:w-2/3">
            <div className="backdrop-blur-sm rounded-2xl border overflow-hidden shadow-2xl"
              style={{
                backgroundColor: 'rgba(30, 41, 59, 0.5)',
                borderColor: 'rgba(51, 65, 85, 0.5)'
              }}
            >
              <div 
                className="p-4 border-b"
                style={{
                  background: 'linear-gradient(90deg, rgba(30, 41, 59, 0.8) 0%, rgba(51, 65, 85, 0.8) 100%)',
                  borderBottomColor: 'rgba(71, 85, 105, 0.5)'
                }}
              >
                <p className="text-slate-300 text-base text-center font-medium">
                  Đang xem: <span className="text-amber-400 font-semibold">{tabs.find(tab => tab.name === selectedTab)?.vietnameseName}</span>
                </p>
                <p className="text-slate-400 text-base text-center">
                  Sử dụng thanh điều hướng trong video để khám phá không gian 360°
                </p>
              </div>
              
              {videoError ? (
                <div 
                  className="w-full h-96 md:h-[500px] lg:h-[550px] flex items-center justify-center"
                  style={{
                    backgroundColor: 'rgba(15, 23, 42, 0.5)'
                  }}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-red-400 text-lg font-medium">
                      Không thể tải video. Vui lòng thử lại sau.
                    </p>
                  </div>
                </div>
              ) : (
                <iframe
                  src={videoUrl}
                  className="w-full h-96 md:h-[500px] lg:h-[550px]"
                  frameBorder="0"
                  allowFullScreen
                  title="Thiết kế 360 - Nội Thất Green La Home"
                  onError={() => setVideoError(true)}
                ></iframe>
              )}
            </div>
          </div>

          {/* Room Selection Menu */}
          <div className="w-full lg:w-1/3">
            <div 
              className="backdrop-blur-sm rounded-2xl border p-6 shadow-2xl"
              style={{
                backgroundColor: 'rgba(30, 41, 59, 0.3)',
                borderColor: 'rgba(51, 65, 85, 0.5)'
              }}
            >
              <h3 className="text-xl font-semibold text-center mb-6 text-slate-200">
                Chọn Không Gian
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                {tabs.map((tab, index) => (
                  <button
                    key={tab.name}
                    onClick={() => handleTabClick(tab.name)}
                    className={`group relative overflow-hidden rounded-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 border ${
                      selectedTab === tab.name 
                        ? "shadow-lg" 
                        : "border-slate-600/50 hover:bg-slate-600/60"
                    }`}
                    style={{
                      background: selectedTab === tab.name 
                        ? 'linear-gradient(90deg, #f59e0b 0%, #f97316 100%)'
                        : 'rgba(51, 65, 85, 0.5)',
                      boxShadow: selectedTab === tab.name 
                        ? '0 10px 15px -3px rgba(249, 115, 22, 0.25)'
                        : 'none'
                    }}
                    aria-label={`Chọn ${tab.vietnameseName} để xem trong tour 360`}
                  >
                    {/* Background gradient overlay for active state */}
                    {selectedTab === tab.name && (
                      <div 
                        className="absolute inset-0 animate-pulse"
                        style={{
                          background: 'linear-gradient(90deg, rgba(251, 191, 36, 0.2) 0%, rgba(249, 115, 22, 0.2) 100%)'
                        }}
                      ></div>
                    )}
                    
                    <div className="relative flex items-center gap-4 p-4">
                      <div className={`flex-shrink-0 transition-transform duration-300 ${
                        selectedTab === tab.name ? "text-white scale-110" : "text-slate-300 group-hover:text-amber-400"
                      }`}>
                        {tab.icon}
                      </div>
                      
                      <div className="flex-1 text-left">
                        <span className={`block text-sm font-semibold transition-colors duration-300 ${
                          selectedTab === tab.name ? "text-white" : "text-slate-200 group-hover:text-white"
                        }`}>
                          {tab.vietnameseName}
                        </span>
                        <span className={`block text-xs mt-1 transition-colors duration-300 ${
                          selectedTab === tab.name ? "text-amber-100" : "text-slate-400 group-hover:text-slate-300"
                        }`}>
                          {tab.name}
                        </span>
                      </div>
                      
                      {/* Active indicator */}
                      {selectedTab === tab.name && (
                        <div className="flex-shrink-0 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom decorative element */}
        <div className="mt-12 text-center">
          <div 
            className="w-16 h-1 mx-auto"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, #f59e0b 50%, transparent 100%)'
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default FurnitureViewer;