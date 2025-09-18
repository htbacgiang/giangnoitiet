import React from 'react';

const PregnancyJourney = () => {
  const stages = [
    {
      id: 1,
      name: 'Trước khi mang bầu',
      image: '/images/truoc-sinh.jpg', // Thay bằng đường dẫn ảnh thực tế
      description: 'Chuẩn bị cơ thể với chế độ ăn lành mạnh, bổ sung vitamin, xét nghiệm cần thiết. Tìm hiểu về rối loạn nội tiết như PCOS, suy giáp, hội chứng tiền kinh nguyệt ảnh hưởng đến thụ thai.',
      alt: 'Chuẩn bị trước khi mang bầu',
    },
    {
      id: 2,
      name: 'Mang bầu',
      image: '/images/trong.webp',
      description: 'Kiểm soát cân nặng, tiểu đường thai kỳ, chế độ dinh dưỡng cân bằng. Các bài tập phù hợp cho từng tam cá nguyệt và công cụ tính BMI, chỉ số đường huyết, lịch khám.',
      alt: 'Giai đoạn mang bầu',
    },
    {
      id: 3,
      name: 'Sau sinh',
      image: '/images/sau-sinh.webp',
      description: 'Hồi phục nội tiết, chăm sóc khi cho con bú, dinh dưỡng cho mẹ, tập luyện nhẹ nhàng, hỗ trợ tâm lý. Checklist mốc thời gian: 6 tuần, 3 tháng, 6 tháng.',
      alt: 'Chăm sóc sau sinh',
    },
  ];

  return (
    <section className="bg-gray-50 py-12 px-4" aria-labelledby="journey-heading">
      <div className="container mx-auto text-center">
      
        <h2
          id="journey-heading"
          className="text-4xl font-bold text-gray-800 mb-2"
        >
          Hành Trình Làm Mẹ
        </h2>
  
        <p className="text-gray-600 mb-8 max-w-4xl mx-auto">
          Hỗ trợ bạn qua từng giai đoạn: từ chuẩn bị mang thai, thai kỳ khỏe mạnh, đến hồi phục sau sinh.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stages.map((stage) => (
            <div
              key={stage.id}
              className="bg-white p-4 rounded-lg shadow-md text-center"
            >
              <img
                src={stage.image}
                alt={stage.alt}
                className="w-full h-48 object-cover mb-4 rounded"
                loading="lazy"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {stage.name}
              </h3>
              <p className="text-gray-600">{stage.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PregnancyJourney;