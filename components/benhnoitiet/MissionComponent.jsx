"use client";

import React from "react";

const MissionComponent = () => {
  return (
    <div className="relative mt-20">
      {/* Background decorative elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-green-200/30 rounded-full blur-2xl"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-200/30 rounded-full blur-3xl"></div>
      
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Image Section */}
          <div className="w-full md:w-1/2 relative order-2 md:order-1">
            <div className="aspect-square md:aspect-auto md:h-full relative overflow-hidden">
              <img
                src="/benhnoitiet/1.jpg"
                alt="Điều dưỡng hỗ trợ sức khỏe mẹ bầu"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-green-400/20 to-transparent"></div>
            </div>
          </div>

          {/* Text Section */}
          <div className="w-full md:w-1/2 p-8 lg:p-12 order-1 md:order-2">
            <div className="space-y-6">
              <div className="text-center md:text-left">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
                  Sứ Mệnh Của <span className="text-emerald-600">Giang Nội Tiết</span>
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto md:mx-0 rounded-full mb-4"></div>
              </div>
              
              <p className="text-gray-600 leading-relaxed text-lg">
                Sứ mệnh của tôi là giúp hàng triệu phụ nữ Việt Nam, đặc biệt là mẹ bầu, hiểu rõ cơ thể mình, chủ động kiểm soát sức khỏe nội tiết và quản lý tiểu đường thai kỳ, để đảm bảo sức khỏe cho cả mẹ và bé trong các giai đoạn quan trọng như:
              </p>
              
              <div className="space-y-4">
                {[
                  {
                    phase: "Thai kỳ",
                    description: "Hỗ trợ quản lý tiểu đường thai kỳ, đảm bảo sức khỏe mẹ và bé.",
                    color: "from-emerald-400 to-emerald-500"
                  },
                  {
                    phase: "Sau sinh (28 - 35 tuổi)",
                    description: "Cân bằng nội tiết, tránh suy giảm sớm.",
                    color: "from-green-400 to-green-500"
                  },
                  {
                    phase: "Tiền mãn kinh (35 - 45 tuổi)",
                    description: "Hạn chế khô hạn, mất ngủ, rối loạn kinh nguyệt.",
                    color: "from-teal-400 to-teal-500"
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex items-start space-x-3">
                      <div className={`flex-shrink-0 w-8 h-8 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mt-0.5`}>
                        <span className="text-white text-sm font-bold">✓</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">{item.phase}</h4>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionComponent;