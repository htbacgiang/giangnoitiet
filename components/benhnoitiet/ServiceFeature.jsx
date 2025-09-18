import React, { useState, useEffect, useMemo } from 'react';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({ width: undefined });
  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth });
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowSize;
};

const ServiceFeature = () => {
  const services = [
    {
      name: 'Tư vấn cá nhân hóa về tiểu đường thai kỳ',
      image: '/images/1.jpg',
      description: 'Cung cấp các buổi tư vấn trực tiếp hoặc trực tuyến với bác sĩ nội tiết hoặc chuyên gia dinh dưỡng để đánh giá tình trạng sức khỏe, giải thích kết quả xét nghiệm (như đường huyết, HbA1c), và đưa ra kế hoạch quản lý tiểu đường thai kỳ.',
      benefits: 'Giúp bà bầu hiểu rõ tình trạng của mình, kiểm soát đường huyết, và giảm nguy cơ biến chứng cho cả mẹ và bé.',
    },
    {
      name: 'Lập kế hoạch dinh dưỡng cá nhân hóa',
      image: 'https://via.placeholder.com/300x200?text=Nutrition+Planning',
      description: 'Cung cấp thực đơn mẫu hoặc kế hoạch dinh dưỡng được thiết kế riêng bởi chuyên gia dinh dưỡng, tập trung vào kiểm soát đường huyết cho phụ nữ mang thai bị tiểu đường thai kỳ.',
      benefits: 'Đảm bảo chế độ ăn uống lành mạnh, cân bằng dinh dưỡng, hỗ trợ sức khỏe mẹ và thai nhi, đồng thời kiểm soát cân nặng và đường huyết.',
    },
    {
      name: 'Tư vấn tập luyện và vận động',
      image: 'https://via.placeholder.com/300x200?text=Exercise+Guidance',
      description: 'Hướng dẫn các bài tập thể dục an toàn cho bà bầu bị tiểu đường thai kỳ, như yoga bầu, đi bộ, hoặc các bài tập tăng cường sức khỏe tim mạch và kiểm soát đường huyết.',
      benefits: 'Giúp cải thiện độ nhạy insulin, giảm stress, và hỗ trợ sức khỏe tổng thể trong thai kỳ.',
    },
    {
      name: 'Hỗ trợ quản lý stress và sức khỏe tinh thần',
      image: 'https://via.placeholder.com/300x200?text=Mental+Health+Support',
      description: 'Cung cấp tư vấn tâm lý hoặc các buổi thiền, yoga tinh thần để giảm căng thẳng, lo âu liên quan đến tiểu đường thai kỳ và thai kỳ nói chung.',
      benefits: 'Stress có thể ảnh hưởng đến đường huyết, vì vậy hỗ trợ tinh thần là yếu tố quan trọng giúp bà bầu duy trì sức khỏe toàn diện.',
    },
    {
      name: 'Theo dõi và quản lý đường huyết từ xa',
      image: 'https://via.placeholder.com/300x200?text=Remote+Monitoring',
      description: 'Hỗ trợ bệnh nhân theo dõi chỉ số đường huyết thông qua ứng dụng hoặc công cụ tích hợp trên website, kết hợp với tư vấn định kỳ từ bác sĩ hoặc chuyên gia.',
      benefits: 'Giúp người bệnh ghi lại và phân tích dữ liệu đường huyết, nhận cảnh báo khi chỉ số bất thường, và điều chỉnh lối sống kịp thời.',
    },
    {
      name: 'Giáo dục và cung cấp thông tin chuyên sâu',
      image: 'https://via.placeholder.com/300x200?text=Education+Programs',
      description: 'Cung cấp các khóa học ngắn hoặc nội dung giáo dục về tiểu đường thai kỳ, các bệnh nội tiết khác (như suy giáp, cường giáp), và cách phòng ngừa biến chứng.',
      benefits: 'Giúp bệnh nhân hiểu rõ bệnh lý, biết cách tự chăm sóc, và cảm thấy tự tin hơn trong việc quản lý sức khỏe.',
    },
    {
      name: 'Tư vấn về các bệnh nội tiết khác',
      image: 'https://via.placeholder.com/300x200?text=Endocrine+Consulting',
      description: 'Ngoài tiểu đường thai kỳ, cung cấp tư vấn về các vấn đề nội tiết phổ biến khác như suy giáp, cường giáp, hội chứng buồng trứng đa nang (PCOS), hoặc rối loạn tuyến thượng thận.',
      benefits: 'Mở rộng đối tượng khách hàng, không chỉ giới hạn ở phụ nữ mang thai mà còn phụ nữ nói chung hoặc người có nguy cơ mắc bệnh nội tiết.',
    },
    {
      name: 'Tư vấn chăm sóc sau sinh cho mẹ bị tiểu đường thai kỳ',
      image: 'https://via.placeholder.com/300x200?text=Postpartum+Care',
      description: 'Hướng dẫn mẹ sau sinh cách kiểm soát đường huyết, giảm nguy cơ tiến triển thành tiểu đường tuýp 2, và chăm sóc sức khỏe tổng thể.',
      benefits: 'Hỗ trợ mẹ duy trì sức khỏe lâu dài sau thai kỳ, đặc biệt khi tiểu đường thai kỳ làm tăng nguy cơ tiểu đường tuýp 2.',
    },
  ];

  const { width } = useWindowSize();
  const itemsPerPage = width < 640 ? 1 : 3;
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalPages = Math.ceil(services.length / itemsPerPage);

  const handlePrev = () => {
    if (services.length <= itemsPerPage) return;
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? services.length - itemsPerPage : prevIndex - 1));
  };

  const handleNext = () => {
    if (services.length <= itemsPerPage) return;
    setCurrentIndex((prevIndex) => (prevIndex >= services.length - itemsPerPage ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (document.activeElement === document.querySelector('.carousel-container')) {
        if (e.key === 'ArrowLeft') handlePrev();
        if (e.key === 'ArrowRight') handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const visibleServices = useMemo(
    () => services.slice(currentIndex, currentIndex + itemsPerPage),
    [currentIndex, itemsPerPage, services]
  );

  if (!services.length) {
    return <div className="text-center text-gray-600">No services available.</div>;
  }

  return (
    <div className="bg-gray-50 py-12 px-4 carousel-container" role="region" aria-label="Service carousel" tabIndex={0}>
      <div className="container mx-auto text-center">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2">
          Các <span className="text-blue-500">dịch vụ nổi bật</span> hỗ trợ sức khỏe bà mẹ mang thai.
        </h1>
        <div aria-live="polite" className="sr-only">
          {`Showing services ${currentIndex + 1} to ${Math.min(currentIndex + itemsPerPage, services.length)} of ${services.length}`}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {visibleServices.map((service, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md text-center">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-48 object-cover mb-4 rounded"
                loading="lazy"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.name}</h3>
              <p className="text-gray-600">{service.description}</p>
              <p className="text-gray-500 italic mt-2">{service.benefits}</p>
            </div>
          ))}
        </div>
        {services.length > itemsPerPage && (
          <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={handlePrev}
              className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50"
              aria-label="Previous service"
              disabled={services.length <= itemsPerPage}
            >
              ←
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50"
              aria-label="Next service"
              disabled={services.length <= itemsPerPage}
            >
              →
            </button>
          </div>
        )}
    
      </div>
    </div>
  );
};

export default ServiceFeature;