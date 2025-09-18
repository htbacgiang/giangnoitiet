import React, { useState } from 'react';
import RegistrationPopup from '../common/RegistrationPopup';

const FreelancerComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConsultationClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="container mx-auto relative mt-20 mb-10">

        
        <div className="relative rounded-3xl shadow-2xl overflow-hidden">
          <div
            className="relative w-full min-h-[400px] bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: "url('/images/banner-noi-tiet.jpg')" }}
          >
            {/* Enhanced gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 via-emerald-900/70 to-teal-900/80"></div>
            
            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 text-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <p className="text-2xl md:text-3xl font-bold text-white leading-tight">
                    <span className="block text-emerald-300">HỖ TRỢ TIỂU ĐƯỜNG THAI KỲ</span>
                    <span className="block text-2xl md:text-3xl text-white/90">
                      TẠI GIANG NỘI TIẾT
                    </span>
                  </p>
                  <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-green-400 mx-auto rounded-full"></div>
                </div>
                
                <p className="text-bases md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
                  Bạn đang mang thai và lo lắng về tiểu đường thai kỳ? Đội ngũ chuyên gia của chúng tôi sẽ hỗ trợ bạn kiểm soát sức khỏe một cách an toàn và hiệu quả!
                </p>
                
                <div className="pt-4">
                  <button
                    onClick={handleConsultationClick}
                    className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-5 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border-2 border-white/20"
                    aria-label="Đăng ký tư vấn miễn phí về tiểu đường thai kỳ"
                  >
                    <span className="flex items-center space-x-2">
                      <span>Đăng ký tư vấn miễn phí</span>
                      <span className="text-xl">💬</span>
                    </span>
                  </button>
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

      <RegistrationPopup 
        isOpen={isModalOpen} 
        onClose={closeModal}
        title="Đăng ký tư vấn tiểu đường thai kỳ"
        subtitle="Nhận tư vấn MIỄN PHÍ từ chuyên gia nội tiết"
        description="Hãy để lại thông tin liên hệ, chuyên gia của chúng tôi sẽ tư vấn miễn phí về tiểu đường thai kỳ và cách kiểm soát đường huyết an toàn."
      />
    </>
  );
};

export default FreelancerComponent;