"use client";

import React from "react";

const FoviaAboutUsComponent = () => {
  return (
    <section className="relative py-8 px-4 ">

      
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/90 overflow-hidden">
          <div className="max-w-6xl mx-auto">
            {/* Content Section */}
            <div className="w-full px-6 lg:px-8">
              <div className="space-y-5">
                {/* Header */}
                <div className="text-center">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      Giang Nội Tiết
                    </span>
                    <span className="text-gray-800"> Là Ai?</span>
                  </h2>
                  
                  <div className="w-16 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto mb-3"></div>
                  
                  <h3 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-1">
                    Nguyễn Thị Hương Giang
                  </h3>
                </div>
                
                {/* Description */}
                <div className="space-y-4">
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed text-base">
                      Tôi là Giang, với hơn <strong className="text-emerald-600">12 năm kinh nghiệm</strong> công tác tại <strong className="text-gray-800">Khoa Nội tiết Sinh sản – Bệnh viện Nội tiết Trung ương</strong>. Trong suốt thời gian đó, tôi đã đồng hành cùng hàng ngàn mẹ bầu mắc tiểu đường thai kỳ, thấu hiểu những nỗi lo mà mẹ bầu thường gặp:
                    </p>
                    
                    <div className="bg-red-50 border-l-4 border-red-400 rounded-r-lg p-4 my-4">
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2">•</span>
                          <span>Không biết ăn gì để không làm tăng đường huyết.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2">•</span>
                          <span>Không biết cách đọc các chỉ số xét nghiệm hay chỉ số đo hàng ngày.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2">•</span>
                          <span>Lo lắng kiêng khem quá khiến con nhẹ cân.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2">•</span>
                          <span>Ăn thiếu tinh bột dễ gây ketone niệu, tăng nguy cơ mất tim thai.</span>
                        </li>
                      </ul>
                    </div>

                    <p className="text-gray-700 leading-relaxed">
                      Từ thực tế ấy, tôi đã quyết định xây dựng kênh <strong className="text-emerald-600">Giang Nội Tiết</strong> – và đây là website chính thức. Tại đây, tôi chia sẻ kiến thức y khoa dễ hiểu nhất về tiểu đường thai kỳ, cùng những kinh nghiệm thực tế để mẹ bầu nào cũng có thể tự tin áp dụng.
                    </p>

                    {/* Image Section */}
                    <div className="w-full relative my-8">
                      <div className="relative h-64 md:h-96 overflow-hidden rounded-2xl">
                        <img
                          src="/images/giang-noi-tiet.jpg"
                          alt="Điều dưỡng Nguyễn Thị Hương Giang"
                          className="w-full h-full object-cover transition-all duration-700 hover:scale-105 filter brightness-110 contrast-105"
                        />
                        
                        {/* Soft gradient overlays */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-emerald-500/15"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-transparent to-teal-400/20"></div>
                        
                        {/* Soft blur effect on edges */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-white/30 blur-sm opacity-50"></div>
                        
                        {/* Badge */}
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md rounded-xl px-3 py-1.5 shadow-lg border border-white/20">
                          <span className="text-emerald-600 font-semibold text-xs">Chuyên gia Nội tiết</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed">
                      Không chỉ vậy, tôi còn thiết kế <strong className="text-teal-600">Thực đơn 7 ngày cho mẹ bầu tiểu đường thai kỳ</strong> như một món quà giúp mẹ không còn loay hoay mỗi ngày &quot;hôm nay ăn gì&quot;. Đồng thời, tôi xây dựng cộng đồng hàng ngàn mẹ bầu TĐTK – nơi mọi người chia sẻ kinh nghiệm, động viên nhau và được đội ngũ bác sĩ nội tiết giải đáp thắc mắc chuẩn y khoa. Khi chúng tôi bận chưa kịp phản hồi, chính những mẹ bầu giàu kinh nghiệm sẽ giúp bạn, để bạn không bao giờ cảm thấy lạc lõng hay bị phán xét.
                    </p>

                    <p className="text-gray-700 leading-relaxed">
                      Không dừng lại ở đó, chúng tôi còn tạo dựng cộng đồng dành riêng cho mẹ sau sinh. Tại đây, đội ngũ bác sĩ nhi khoa sẽ đồng hành cùng bạn trong hành trình chăm sóc và nuôi dạy con. Tất cả câu hỏi của bạn đều được giải đáp nhanh chóng, dễ hiểu, dễ áp dụng – và hoàn toàn miễn phí.
                    </p>
                    
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 my-6">
                      <h3 className="text-xl font-bold text-amber-800 mb-4 flex items-center">
                        <span className="mr-2">✨</span>
                        Vậy còn chần chừ gì nữa?
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Nếu bạn là mẹ bầu đang mắc tiểu đường thai kỳ, hay đơn giản chỉ mới mang thai. Hãy liên hệ với tôi ngay hôm nay để:
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <span className="text-emerald-600 font-bold mr-2">👉</span>
                          <span className="text-gray-700 font-semibold">Nhận ngay Thực đơn 7 ngày miễn phí</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-emerald-600 font-bold mr-2">👉</span>
                          <span className="text-gray-700 font-semibold">Tham gia cộng đồng mẹ bầu TĐTK trên Zalo</span>
                        </div>
                      </div>
                      
                      {/* Contact Button */}
                      <div className="flex justify-center mt-8">
                        <a 
                          href="https://m.me/giangnoitiet"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-bold text-white bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-2xl shadow-2xl transition-all duration-300 ease-out hover:scale-105 hover:shadow-blue-500/50 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-300/50 no-underline"
                        >
                          {/* Background gradient animation */}
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                          
                          {/* Shimmer effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                          
                          {/* Button content */}
                          <div className="relative flex items-center space-x-3">
                            <div className="relative">
                              {/* Messenger icon */}
                              <svg className="w-6 h-6 transition-transform duration-300 group-hover:rotate-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0C5.373 0 0 4.975 0 11.111c0 3.497 1.745 6.616 4.472 8.652V24l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.111C24 4.975 18.627 0 12 0zm1.193 14.963l-3.056-3.259-5.963 3.259L10.732 8.1l3.13 3.259L19.732 8.1l-6.539 6.863z"/>
                              </svg>
                              {/* Online indicator */}
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full animate-pulse"></div>
                            </div>
                            
                            <span className="text-lg font-bold tracking-wide">Liên hệ ngay</span>
                          </div>
                          
                        </a>
                      
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Call to action */}
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100">
                  <p className="text-gray-700 text-center text-sm font-medium">
                    <span className="text-emerald-600 font-semibold">Đồng hành cùng mẹ bầu</span> trên hành trình kiểm soát tiểu đường thai kỳ an toàn và hiệu quả
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoviaAboutUsComponent;