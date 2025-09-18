"use client";

import React from "react";
import Link from "next/link";
import { Calculator, Stethoscope, TrendingUp, Shield } from "lucide-react";

const ToolsSection = () => {
  const tools = [
    {
      name: "Công cụ kiểm tra nhanh",
      description: "Kiểm tra tiểu đường thai kỳ miễn phí, không cần đăng nhập",
      icon: <Calculator className="h-8 w-8" />,
      link: "/cong-cu-kiem-tra-tieu-duong-thai-ky",
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      textColor: "text-blue-700",
      features: ["Không cần đăng nhập", "Kết quả tức thì", "Dựa trên tiêu chuẩn Bộ Y tế"]
    },
    {
      name: "Hệ thống theo dõi",
      description: "Theo dõi và phân tích dữ liệu đường huyết dài hạn",
      icon: <TrendingUp className="h-8 w-8" />,
      link: "/theo-doi-tieu-duong-thai-ky",
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100",
      textColor: "text-green-700",
      features: ["Lưu trữ dữ liệu", "Thống kê chi tiết", "Lời khuyên cá nhân hóa"]
    },
    {
      name: "Tư vấn chuyên gia",
      description: "Kết nối trực tiếp với bác sĩ nội tiết chuyên khoa",
      icon: <Stethoscope className="h-8 w-8" />,
      link: "/tu-van",
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100",
      textColor: "text-purple-700",
      features: ["Tư vấn 1-1", "Chuyên gia giàu kinh nghiệm", "Hỗ trợ 24/7"]
    },
    {
      name: "Bảo mật dữ liệu",
      description: "Dữ liệu được mã hóa và bảo vệ an toàn tuyệt đối",
      icon: <Shield className="h-8 w-8" />,
      link: "/bao-mat",
      color: "from-orange-500 to-orange-600",
      bgColor: "from-orange-50 to-orange-100",
      textColor: "text-orange-700",
      features: ["Mã hóa SSL", "Tuân thủ GDPR", "Backup tự động"]
    }
  ];

  return (
    <div className="py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full ring-1 ring-blue-200/50 shadow-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-blue-700 font-medium">Công Cụ Hỗ Trợ</span>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-500"></div>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-600">
              Công Cụ & Dịch Vụ Y Tế
            </span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-4 rounded-full"></div>
          <p className="text-lg text-slate-600/90 max-w-3xl mx-auto">
            Các công cụ và dịch vụ chuyên nghiệp hỗ trợ chăm sóc sức khỏe tiểu đường thai kỳ
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tools.map((tool, index) => (
            <Link key={index} href={tool.link}>
              <div className="group relative p-6 rounded-2xl transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-2xl bg-white/60 backdrop-blur-sm shadow-lg ring-1 ring-white/40 border border-blue-100/50">
                {/* Icon */}
                <div className={`mb-4 p-4 rounded-xl w-fit transition-all duration-300 bg-gradient-to-br ${tool.bgColor}`}>
                  <div className={`transition-colors duration-300 ${tool.textColor}`}>
                    {React.cloneElement(tool.icon, {
                      className: "h-8 w-8"
                    })}
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-bold mb-3 text-lg text-slate-700 group-hover:text-blue-700 transition-colors duration-300">
                  {tool.name}
                </h3>
                
                <p className="text-slate-600/90 mb-4 text-sm leading-relaxed">
                  {tool.description}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  {tool.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-xs text-slate-500">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Arrow */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-200/50">
            <h3 className="text-2xl font-bold text-slate-700 mb-4">
              🚀 Bắt đầu hành trình chăm sóc sức khỏe
            </h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Sử dụng công cụ kiểm tra miễn phí ngay bây giờ hoặc đăng ký tài khoản để trải nghiệm đầy đủ các tính năng theo dõi và phân tích.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/cong-cu-kiem-tra-tieu-duong-thai-ky">
                <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:scale-[1.02]">
                  🔬 Kiểm tra miễn phí
                </button>
              </Link>
              <Link href="/dang-ky">
                <button className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-8 py-3 rounded-lg hover:from-gray-200 hover:to-gray-300 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-[1.02]">
                  📝 Đăng ký tài khoản
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsSection;
