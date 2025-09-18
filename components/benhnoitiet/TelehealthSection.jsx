import React from 'react';
import PropTypes from 'prop-types';
import { BookOpen, Heart, Users, Stethoscope, Baby } from 'lucide-react';

export default function ValuesSection({ title, features, imageSrc }) {
  
  return (
    <section className="py-10 bg-gradient-to-br from-slate-50 via-white to-teal-50/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-teal-100/20 to-emerald-100/20 rounded-full blur-3xl -translate-x-24 -translate-y-24"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-100/20 to-teal-100/20 rounded-full blur-3xl translate-x-32 translate-y-32"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-full ring-1 ring-teal-200/50 shadow-sm">
              <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
              <span className="text-teal-700 font-medium  ">Giá Trị Cốt Lõi</span>
              <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse delay-500"></div>
            </div>
          </div>
          <p className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-700 via-emerald-600 to-teal-600">
              {title}
            </span>
          </p>
          <div className="w-12 h-0.5 bg-gradient-to-r from-teal-600 to-emerald-600 mx-auto mb-3 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image Section */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden bg-white/60 backdrop-blur-sm ring-1 ring-white/40 shadow-lg group">
              <img
                src={imageSrc}
                alt="Hormone health illustration"
                className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10"></div>
              
              {/* Decorative elements */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-teal-300/60 to-emerald-300/60 rounded-full blur-sm animate-pulse"></div>
              <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-gradient-to-br from-emerald-300/50 to-teal-300/50 rounded-full blur-sm animate-pulse delay-1000"></div>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-6 order-1 lg:order-2">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group bg-white/80 backdrop-blur-sm rounded-xl p-4 ring-1 ring-white/40 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 p-2.5 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-lg group-hover:from-teal-100 group-hover:to-emerald-100 transition-colors duration-300">
                      {React.cloneElement(feature.icon, {
                        className: "w-5 h-5 text-teal-600 group-hover:text-teal-700 transition-colors duration-300"
                      })}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-slate-800 mb-1.5 group-hover:text-teal-700 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-base text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

ValuesSection.propTypes = {
  title: PropTypes.string,
  features: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      icon: PropTypes.element,
    })
  ),
  imageSrc: PropTypes.string,
};

ValuesSection.defaultProps = {
  title: 'Tư vấn & đồng hành cùng mẹ bầu tiểu đường thai kỳ',
  features: [
    {
      title: 'Tư vấn chuyên sâu tiểu đường thai kỳ',
      description:
        'Hướng dẫn chi tiết về chế độ ăn uống, theo dõi đường huyết và quản lý tiểu đường thai kỳ an toàn cho cả mẹ và bé với kinh nghiệm 12+ năm.',
      icon: <Stethoscope strokeWidth={2} />,
    },
    {
      title: 'Đồng hành từ mang thai đến sau sinh',
      description:
        'Hỗ trợ liên tục từ khi phát hiện tiểu đường thai kỳ, trong suốt thai kỳ và chăm sóc sau sinh để đảm bảo sức khỏe tối ưu cho mẹ và con.',
      icon: <Baby strokeWidth={2} />,
    },
    {
      title: 'Cộng đồng hỗ trợ 24/7',
      description:
        'Kết nối với cộng đồng hàng ngàn mẹ bầu cùng hoàn cảnh, chia sẻ kinh nghiệm và nhận được sự hỗ trợ từ đội ngũ chuyên gia y tế.',
      icon: <Users strokeWidth={2} />,
    },
  ],
  imageSrc: '/images/gia-tri.webp',
};