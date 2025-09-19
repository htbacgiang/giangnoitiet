import React from 'react';

const FreelancerComponent = () => {
  return (
    <>
      <div className="container mx-auto relative">
        <div className="relative overflow-hidden">
          <div
            className="relative w-full min-h-[400px] flex items-center justify-center"
          >
            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 py-8 text-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight flex items-center justify-center">
                    <span className="mr-2 text-3xl animate-pulse">✨</span>
                    <span className="block text-emerald-600">Vậy còn chần chừ gì nữa?</span>
                  </h3>
                  <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-green-400 mx-auto rounded-full"></div>
                </div>
                
                <p className="text-base md:text-xl text-gray-700 leading-relaxed max-w-6xl mx-auto font-medium">
                  Nếu bạn là mẹ bầu đang mắc tiểu đường thai kỳ, hay đơn giản chỉ mới mang thai. Hãy liên hệ với tôi ngay hôm nay để:
                </p>
                
                <div className="space-y-4 max-w-3xl mx-auto items-center justify-center">
                  <div className="flex items-center justify-center bg-emerald-50 rounded-xl py-3 px-6 border border-emerald-200">
                    <span className="text-emerald-600 font-bold mr-3 text-xl hidden md:block">👉</span>
                    <span className="text-gray-800 font-bold text-lg">Nhận ngay Thực đơn 7 ngày miễn phí</span>
                  </div>
                  <div className="flex items-center justify-center bg-emerald-50 rounded-xl py-3 px-6 border border-emerald-200">
                    <span className="text-emerald-600 font-bold mr-3 text-xl hidden md:block">👉</span>
                    <span className="text-gray-800 font-bold text-lg">Tham gia cộng đồng mẹ bầu TĐTK trên Zalo</span>
                  </div>
                </div>
                
                <div className="pt-4">
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
                      
                      <span className="text-lg font-bold tracking-wide uppercase">Tư vấn ngay</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Floating decorative elements */}
            <div className="absolute top-10 left-10 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-20 h-20 bg-emerald-400/20 rounded-full blur-xl animate-pulse delay-300"></div>
            <div className="absolute top-1/2 right-20 w-12 h-12 bg-green-400/20 rounded-full blur-xl animate-pulse delay-700"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FreelancerComponent;