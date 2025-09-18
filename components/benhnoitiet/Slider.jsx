import { useState, useEffect } from 'react';
import { Clock, Users, ThumbsUp } from 'lucide-react';

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: '/benhnoitiet/1.jpg',
      title: 'Chăm sóc Nội Tiết Chuyên Sâu',
      subtitle: 'Hỗ trợ Phụ nữ Mang Thai',
      content: 'Tư vấn và điều trị tiểu đường thai kỳ với đội ngũ chuyên gia hàng đầu.',
      animation: 'animate-slide-up',
    },
    {
      image: '/benhnoitiet/2.jpg',
      title: 'Giải pháp Y tế Hiện đại',
      subtitle: 'Công nghệ Tiên tiến',
      content: 'Ứng dụng công nghệ y tế để quản lý bệnh nội tiết hiệu quả.',
      animation: 'animate-slide-right',
    },
    {
      image: '/benhnoitiet/3.jpg',
      title: 'Sức khỏe Mẹ và Bé',
      subtitle: 'Chăm sóc Tận Tâm',
      content: 'Đồng hành cùng mẹ bầu trong việc kiểm soát tiểu đường thai kỳ.',
      animation: 'animate-slide-left',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen flex flex-col">
      <style jsx global>{`
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slide-right {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slide-left {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 1s ease-out forwards;
        }
        .animate-slide-right {
          animation: slide-right 1s ease-out forwards;
        }
        .animate-slide-left {
          animation: slide-left 1s ease-out forwards;
        }
        /* Responsive footer styles */
        .footer-container {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          align-items: center;
          padding: 1.5rem;
          width: 100%;
        }
        @media (max-width: 768px) {
          .footer-container {
            padding: 1rem;
            gap: 1rem;
          }
          .footer-item {
            transform: scale(0.85);
          }
          .footer-item svg {
            width: 2rem;
            height: 2rem;
          }
          .footer-item .text-4xl {
            font-size: 1.5rem;
          }
          .footer-item .text-gray-600 {
            font-size: 0.75rem;
          }
        }
        @media (max-width: 480px) {
          .footer-container {
            padding: 0.75rem;
            gap: 0.5rem;
          }
          .footer-item {
            transform: scale(0.7);
          }
          .footer-item svg {
            width: 1.5rem;
            height: 1.5rem;
          }
          .footer-item .text-4xl {
            font-size: 1.25rem;
          }
          .footer-item .text-gray-600 {
            font-size: 0.65rem;
          }
        }
      `}</style>
      {/* Slider Image Section */}
      <div className="flex-1 w-full relative">
        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${slides[currentSlide].image})` }}>
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white">
            <div className="text-center">
              <h1 className={`md:text-6xl text-4xl font-bold ${slides[currentSlide].animation}`}>
                {slides[currentSlide].title}
              </h1>
              <h2 className={`md:text-3xl text-2xl mt-2 ${slides[currentSlide].animation}`}>
                {slides[currentSlide].subtitle}
              </h2>
              <p className={`mt-4 ${slides[currentSlide].animation}`}>
                {slides[currentSlide].content}
              </p>
            </div>
          </div>
        </div>
        <button 
          onClick={prevSlide} 
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={nextSlide} 
          aria-label="Next slide"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              role="tab"
              aria-label={`Go to slide ${index + 1}`}
              className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-blue-500' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
      {/* Footer Section with Lucide Icons */}
      <div className="relative">
        <div className="absolute bottom-0 w-full bg-white rounded-t-3xl shadow-md">
          <div className="footer-container max-w-7xl mx-auto">
            <div className="footer-item text-center">
              <div className="flex items-center">
                <Clock className="text-orange-500 mr-2" />
                <div className="text-left">
                  <p className="text-4xl font-bold text-blue-700">12</p>
                  <p className="text-gray-600">Năm kinh nghiệm</p>
                </div>
              </div>
            </div>
            <div className="footer-item text-center">
              <div className="flex items-center">
                <Users className="text-orange-500 mr-2" />
                <div className="text-left flex-col justify-center">
                  <p className="text-4xl font-bold text-blue-700">350 +</p>
                  <p className="text-gray-600">Khách hàng</p>
                </div>
              </div>
            </div>
            <div className="footer-item text-center">
              <div className="flex items-center">
                <ThumbsUp className="text-orange-500 mr-2" />
                <div className="text-left flex-col justify-center">
                  <p className="text-4xl font-bold text-blue-700">98%</p>
                  <p className="text-gray-600">Khách hàng hài lòng</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}