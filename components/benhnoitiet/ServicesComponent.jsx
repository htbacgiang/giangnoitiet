"use client";

import React, { useState } from "react";
import { Stethoscope, Utensils, Dumbbell, Heart, Monitor, BookOpen, Thermometer, Baby } from "lucide-react";

const ServicesComponent = () => {
  const services = [
    {
      name: "Tư vấn cá nhân hóa",
      icon: <Stethoscope className="h-8 w-8" />,
      description: "Tư vấn trực tiếp với bác sĩ nội tiết và chuyên gia dinh dưỡng"
    },
    {
      name: "Kế hoạch dinh dưỡng",
      icon: <Utensils className="h-8 w-8" />,
      description: "Thực đơn cá nhân hóa kiểm soát đường huyết hiệu quả"
    },
    {
      name: "Tư vấn vận động",
      icon: <Dumbbell className="h-8 w-8" />,
      description: "Hướng dẫn yoga bầu và bài tập an toàn"
    },
    {
      name: "Chăm sóc tinh thần",
      icon: <Heart className="h-8 w-8" />,
      description: "Hỗ trợ tâm lý và quản lý stress"
    },
    {
      name: "Theo dõi từ xa",
      icon: <Monitor className="h-8 w-8" />,
      description: "Giám sát đường huyết qua ứng dụng"
    },
    {
      name: "Giáo dục sức khỏe",
      icon: <BookOpen className="h-8 w-8" />,
      description: "Khóa học về tiểu đường thai kỳ"
    },
    {
      name: "Bệnh nội tiết",
      icon: <Thermometer className="h-8 w-8" />,
      description: "Tư vấn suy giáp, cường giáp, PCOS"
    },
    {
      name: "Chăm sóc sau sinh",
      icon: <Baby className="h-8 w-8" />,
      description: "Kiểm soát đường huyết sau sinh"
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="py-16 bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
         
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-700 via-emerald-600 to-teal-600">
              Dịch Vụ Hỗ Trợ Tiểu Đường Thai Kỳ
            </span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-teal-600 to-emerald-600 mx-auto mb-4 rounded-full"></div>
          <p className="text-lg text-slate-600/90 max-w-3xl mx-auto">
            Chăm sóc toàn diện cho mẹ và bé với đội ngũ chuyên gia giàu kinh nghiệm
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative p-6 rounded-2xl text-center transition-all duration-300 cursor-pointer hover:-translate-y-1 ${
                hoveredIndex === index
                  ? "bg-gradient-to-br from-teal-600 via-emerald-600 to-teal-600 text-white shadow-xl shadow-teal-500/25"
                  : "bg-white/60 backdrop-blur-sm text-gray-800 shadow-lg hover:shadow-xl ring-1 ring-white/40 border border-teal-100/50"
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Icon */}
              <div className={`mb-4 p-3 rounded-xl mx-auto w-fit transition-all duration-300 ${
                hoveredIndex === index
                  ? "bg-white/20 backdrop-blur-sm"
                  : "bg-gradient-to-br from-teal-50 to-emerald-50"
              }`}>
                {React.cloneElement(service.icon, {
                  className: `mx-auto transition-colors duration-300 ${
                    hoveredIndex === index 
                      ? "text-white" 
                      : "text-teal-600"
                  }`,
                })}
              </div>

              {/* Content */}
              <h3 className={`font-semibold mb-2 text-sm md:text-base transition-colors duration-300 ${
                hoveredIndex === index ? "text-white" : "text-slate-700"
              }`}>
                {service.name}
              </h3>
              
              <p className={`text-xs md:text-sm transition-colors duration-300 ${
                hoveredIndex === index 
                  ? "text-white/90" 
                  : "text-slate-600/90"
              }`}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesComponent;