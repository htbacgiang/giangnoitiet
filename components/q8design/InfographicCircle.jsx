/**
 * Customer Experience Journey Infographic Component (JSX + Tailwind)
 * HÀNH TRÌNH TRẢI NGHIỆM KHÁCH HÀNG
 */
export default function InfographicCircle() {
  const timelineSteps = [
    {
      step: "01",
      color: "#F59E0B", // Yellow/Orange
      title: "TIẾP CẬN & TÌM HIỂU",
      description: "Thu hút & cung cấp thông tin trên đa nền tảng",
      position: "bottom"
    },
    {
      step: "02", 
      color: "#10B981", // Green
      title: "KÝ HỢP ĐỒNG THIẾT KẾ",
      description: "Đảm bảo cả công ty và KH đều hiểu rõ trách nhiệm, quyền lợi trước khi triển khai thi công",
      position: "top"
    },
    {
      step: "03",
      color: "#06B6D4", // Cyan/Light Blue
      title: "TRIỂN KHAI THI CÔNG", 
      description: "Hoàn thiện công trình đúng tiến độ để kịp bàn giao cho KH",
      position: "bottom"
    },
    {
      step: "04",
      color: "#8B5CF6", // Purple
      title: "GIÁM SÁT, CẬP NHẬT TIẾN ĐỘ",
      description: "Giám sát chặt chẽ & cập nhật tiến độ thi công thường xuyên cho khách hàng",
      position: "top"
    },
    {
      step: "05",
      color: "#EC4899", // Pink/Magenta
      title: "NGHIỆM THU, BÀN GIAO",
      description: "Phối hợp với khách hàng kiểm tra, nghiệm thu tất cả các hạng mục theo hợp đồng",
      position: "bottom"
    },
    {
      step: "06",
      color: "#EF4444", // Red/Coral
      title: "KÝ HỢP ĐỒNG THIẾT KẾ",
      description: "Cho phép khách hàng thấy rõ hình dung thực tế, duyệt phương án cuối cùng trước khi thi công",
      position: "top"
    },
    {
      step: "07",
      color: "#F97316", // Orange
      title: "THIẾT KẾ Ý TƯỞNG SƠ BỘ",
      description: "Giúp KH hình dung sơ bộ về không gian và ý tưởng thiết kế",
      position: "bottom"
    },
    {
      step: "08",
      color: "#059669", // Emerald
      title: "TƯ VẤN BAN ĐẦU & KHẢO SÁT HIỆN TRẠNG",
      description: "Tìm hiểu nhu cầu mong muốn của khách hàng",
      position: "top"
    }
  ];

  return (
    <div className="w-full bg-white h-screen">
      {/* Main Section - Combined Hero & Timeline */}
      <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 px-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Hero Content */}
          <div className="text-center mb-16">
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 mb-6">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                <span className="text-sm font-medium text-gray-700">Quy trình chuyên nghiệp</span>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
              HÀNH TRÌNH TRẢI NGHIỆM
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                KHÁCH HÀNG
              </span>
            </h2>
    
          </div>

          {/* Timeline Container - Hidden on mobile */}
          <div className="relative hidden lg:block py-20">
            {/* Main Horizontal Timeline */}
            <div className="flex items-center justify-center relative">
              {/* Hexagons and Connecting Lines */}
              {timelineSteps.map((step, index) => (
                <div key={step.step} className="flex items-center">
                  {/* Hexagon */}
                  <div className="relative">
                    <div 
                      className="w-24 h-24 flex items-center justify-center relative"
                      style={{ filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15))' }}
                    >
                      {/* Hexagon Shape - Perfectly balanced */}
                      <svg 
                        width="96" 
                        height="96" 
                        viewBox="0 0 96 96" 
                        className="absolute inset-0"
                      >
                        {/* Outer hexagon with border */}
                        <polygon
                          points="48,4 88,28 88,68 48,92 8,68 8,28"
                          fill={step.color}
                          stroke={step.color}
                          strokeWidth="3"
                        />
                        {/* Inner hexagon for depth effect */}
                        <polygon
                          points="48,8 84,30 84,66 48,88 12,66 12,30"
                          fill={step.color}
                          fillOpacity="0.9"
                        />
                        {/* Highlight effect */}
                        <polygon
                          points="48,12 80,32 80,64 48,84 16,64 16,32"
                          fill={step.color}
                          fillOpacity="0.7"
                        />
                      </svg>
                      
                      {/* Step Number Text */}
                      <span className="relative z-10 text-white font-bold text-2xl tracking-wide">
                        {step.step}
                      </span>
                    </div>

                    {/* Text Block - Improved positioning and spacing */}
                    <div 
                      className={`absolute w-64 ${
                        step.position === 'top' ? 'bottom-full mb-6' : 'top-full mt-6'
                      }`}
                      style={{ 
                        left: '50%', 
                        transform: 'translateX(-50%)',
                        zIndex: 20
                      }}
                    >
                      <h3 className="font-bold text-sm uppercase text-gray-800 mb-2 tracking-wide text-center leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-xs text-center">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Connecting Line (except for last item) */}
                  {index < timelineSteps.length - 1 && (
                    <div 
                      className="w-12 h-1.5 mx-1 rounded-full relative z-10"
                      style={{ backgroundColor: timelineSteps[index + 1].color }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Responsive Layout - Grid 2x4 with improved spacing */}
          <div className="lg:hidden mt-16 mb-8">
            <div className="grid grid-cols-2 gap-3">
              {timelineSteps.map((step) => (
                <div key={step.step} className="bg-white/90 backdrop-blur-sm p-5 rounded-lg border border-white/20 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-lg shadow-md"
                      style={{ backgroundColor: step.color }}
                    >
                      <span className="text-white font-bold text-lg">
                        {step.step}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm uppercase text-gray-800 mb-2 leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}