import { useState } from 'react';
import VoiceTestPopup from '../common/VoiceTestPopup';

const OrganicProcess = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <section className=" py-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-300 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        {/* Phần tiêu đề */}
        <div className="text-center mb-16">
         
          <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-3 uppercase">
            <span className="text-gray-800">
              Quy Trình Test Giọng Miễn Phí Tại BT ACADEMY
            </span>
          </h2>
         
        </div>

        {/* Phần quy trình */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
          {/* Bước 1 */}
          <div className="group relative flex">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-white/20 relative overflow-hidden w-full flex flex-col">
              {/* Card glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="relative mb-8">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <svg className="w-12 h-12 text-blue-600 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
                    </svg>
                  </div>
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                    01
                </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center leading-tight">
                  Gọi hotline/Zalo hoặc điền form đăng ký
                </h3>
                <p className="text-gray-600 text-center leading-relaxed text-sm flex-grow">
                  Chuyên viên tư vấn sẽ liên lạc với bạn ngay lập tức để hỗ trợ đăng ký test giọng.
                </p>
              </div>
            </div>
          </div>

          {/* Bước 2 */}
          <div className="group relative flex">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-white/20 relative overflow-hidden w-full flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="relative mb-8">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <svg className="w-12 h-12 text-indigo-600 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
                    </svg>
                  </div>
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                    02
                </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center leading-tight">
                  Nhận bài test từ BT ACADEMY
                </h3>
                <p className="text-gray-600 text-center leading-relaxed text-sm flex-grow">
                  Bài test giọng ĐỘC QUYỀN để chúng tôi phân tích giọng nói của bạn một cách chuyên nghiệp.
                </p>
              </div>
            </div>
          </div>

          {/* Bước 3 */}
          <div className="group relative flex">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-white/20 relative overflow-hidden w-full flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="relative mb-8">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <svg className="w-12 h-12 text-purple-600 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"/>
                    </svg>
                  </div>
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                    03
                </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center leading-tight">
                  Ghi âm và gửi lại cho BT ACADEMY
                </h3>
                <p className="text-gray-600 text-center leading-relaxed text-sm flex-grow">
                  Chọn nơi yên tĩnh để ghi âm hoặc quay video và gửi lại cho tư vấn viên để đánh giá.
                </p>
              </div>
            </div>
          </div>

          {/* Bước 4 */}
          <div className="group relative flex">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-white/20 relative overflow-hidden w-full flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="relative mb-8">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <svg className="w-12 h-12 text-emerald-600 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/>
                    </svg>
                  </div>
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                    04
                </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center leading-tight">
                  Đánh giá và tư vấn từ BT ACADEMY
                </h3>
                <p className="text-gray-600 text-center leading-relaxed text-sm flex-grow">
                  Giáo viên, Chuyên gia sẽ Phân tích, Đánh giá và Đưa ra lộ trình phát triển giọng nói cho riêng bạn.
                </p>
              </div>
            </div>
          </div>
        </div>

  

        {/* Call to Action */}
        <div className="text-center mt-10">
          <div className="relative inline-block">
            <button 
              onClick={() => setIsPopupOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center space-x-3">
                <span>Đăng ký test giọng ngay</span>
                <svg className="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </span>
            </button>
          </div>
           
        </div>

        {/* Voice Test Popup */}
        <VoiceTestPopup 
          isOpen={isPopupOpen} 
          onClose={() => setIsPopupOpen(false)} 
        />
      </div>
    </section>
  );
};

export default OrganicProcess;
