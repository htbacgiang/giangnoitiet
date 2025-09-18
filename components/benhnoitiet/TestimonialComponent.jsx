"use client";

import React, { useState, useMemo, useEffect } from "react";

const TestimonialComponent = () => {
  const testimonials = [
    {
      name: "Phạm Hoa",
      role: "Bà bầu, 30 tuần",
      feedback:
        "Chị Giang đã giúp tôi hiểu rõ về tiểu đường thai kỳ và cách kiểm soát đường huyết an toàn cho cả mẹ và bé. Tư vấn rất tận tình, dễ hiểu, tôi cảm thấy yên tâm hơn nhiều trong thai kỳ!",
      image: "/images/chi-hoa.jpg",
    },
    {
      name: "Trần Ngọc Linh",
      role: "Bà bầu, 28 tuần",
      feedback:
        "Nhờ sự hướng dẫn chi tiết của bác sĩ Giang, tôi đã điều chỉnh chế độ ăn uống và tập luyện phù hợp để kiểm soát tiểu đường thai kỳ. Chị ấy rất chu đáo và luôn sẵn sàng giải đáp thắc mắc!",
      image: "/images/ngoc-linh.webp",
    },
    {
      name: "Lê Hoàng Anh",
      role: "",
      feedback:
        "Tư vấn của bác sĩ Giang Nội Tiết thực sự hữu ích! Tôi được hướng dẫn cách theo dõi đường huyết và nhận được nhiều lời khuyên thiết thực để giữ sức khỏe cho cả tôi và em bé.",
      image: "/images/person-3-min.webp",
    },
    {
      name: "Phạm Minh Thư",
      role: "Bà bầu, 26 tuần",
      feedback:
        "Chị Giang không chỉ giỏi chuyên môn mà còn rất gần gũi. Nhờ chị, tôi đã biết cách quản lý tiểu đường thai kỳ mà không lo lắng quá nhiều. Cảm ơn chị rất nhiều!",
      image: "/images/minh-thu.webp",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 2 >= testimonials.length ? 0 : prevIndex + 2
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 2 < 0 ? Math.max(0, testimonials.length - 2) : prevIndex - 2
    );
  };

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex + 2 >= testimonials.length ? 0 : prevIndex + 2
      );
    }, 10000); // Chuyển slide mỗi 5 giây

    return () => clearInterval(timer);
  }, [isPaused, testimonials.length]);

  const currentTestimonials = useMemo(() => {
    const first = testimonials[currentIndex] || null;
    const second = testimonials[currentIndex + 1] || null;
    return [first, second].filter(Boolean);
  }, [currentIndex, testimonials]);

  if (testimonials.length === 0) {
    return <div className="text-center text-gray-600">Không có đánh giá nào.</div>;
  }

  return (
    <div className="testimonial-section relative bg-gradient-to-br from-white via-emerald-50/40 to-green-50/40 py-16 px-4 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-32 h-32 bg-emerald-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-green-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-emerald-300/20 rounded-full blur-2xl"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">
            Khách Hàng Nói Gì Về Giang Nội Tiết
          </h2>
       
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-green-600 mx-auto rounded-full"></div>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={handlePrev}
            aria-label="Phản hồi trước"
            className="nav-button group bg-white/80 backdrop-blur-sm hover:bg-white text-gray-600 hover:text-emerald-600 rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20"
          >
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            aria-label="Phản hồi tiếp theo"
            className="nav-button group bg-white/80 backdrop-blur-sm hover:bg-white text-gray-600 hover:text-emerald-600 rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20"
          >
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Testimonials Container */}
        <div
          className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto space-y-6 lg:space-y-0 lg:space-x-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {currentTestimonials.map((testimonial, index) => (
            <div
              key={`${currentIndex}-${index}`}
              className="testimonial-card group relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl w-full lg:w-1/2 transition-all duration-500 ease-out border border-white/20 animate-slideIn"
            >
              {/* Quote decoration */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
              </div>
              
              {/* Star rating */}
              <div className="flex space-x-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              
              {/* Feedback text */}
              <blockquote className="text-gray-700 text-lg leading-relaxed mb-8 font-medium italic relative">
              &quot;{testimonial.feedback}&quot;
              </blockquote>
              
              {/* Customer info */}
              <div className="flex items-center">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4 ring-4 ring-white shadow-lg">
                    <img
                      src={testimonial.image}
                      alt={`Ảnh của ${testimonial.name}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                      onError={(e) => (e.target.src = "/fallback-image.jpg")}
                    />
                  </div>
                 
                </div>
                <div>
                  <p className="text-gray-900 font-bold text-lg">{testimonial.name}</p>
                  {testimonial.role && (
                    <p className="text-emerald-600 text-sm font-medium">{testimonial.role}</p>
                  )}
                
                </div>
              </div>
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center mt-12 space-x-2">
          {Array.from({ length: Math.ceil(testimonials.length / 2) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * 2)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                Math.floor(currentIndex / 2) === index
                  ? 'bg-emerald-600 scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Chuyển đến trang ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .testimonial-section {
          min-height: 600px;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(2rem) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        .testimonial-card {
          backdrop-filter: blur(10px);
        }
        
        .testimonial-card:hover {
          transform: translateY(-8px);
        }
        
        .nav-button:hover {
          transform: translateY(-2px);
        }
        
        .nav-button:active {
          transform: translateY(0);
        }
        
        /* Custom scrollbar for mobile */
        @media (max-width: 768px) {
          .testimonial-section {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
        
        /* Glassmorphism effects */
        .testimonial-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .nav-button {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        /* Enhanced animations */
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }
        
        .testimonial-card:nth-child(odd) {
          animation-delay: 0.1s;
        }
        
        .testimonial-card:nth-child(even) {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
};

export default TestimonialComponent;