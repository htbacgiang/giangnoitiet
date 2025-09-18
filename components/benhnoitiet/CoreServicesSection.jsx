export default function CoreServicesSection() {
  const services = [
    {
      title: "Giáo dục nội tiết khoa học, dễ hiểu",
      description: "Hiểu rõ về nội tiết qua các bài viết, video đơn giản nhưng chuyên sâu, giúp bạn nắm bắt kiến thức một cách dễ dàng và thực tế.",
      icon: (
        <svg
          className="w-12 h-12 text-teal-500 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Giáo dục nội tiết"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.747 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    },
    {
      title: "Cải thiện nội tiết tự nhiên",
      description: "Hướng dẫn các phương pháp tự nhiên như chế độ ăn uống, lối sống và vận động để cân bằng nội tiết một cách bền vững, hạn chế dùng thuốc.",
      icon: (
        <svg
          className="w-12 h-12 text-teal-500 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Cải thiện nội tiết tự nhiên"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
      ),
    },
    {
      title: "Đồng hành qua mọi giai đoạn",
      description: "Hỗ trợ phụ nữ từ tuổi trẻ, sau sinh đến tiền mãn kinh, giúp bạn trải qua các giai đoạn thay đổi nội tiết một cách nhẹ nhàng và tự tin.",
      icon: (
        <svg
          className="w-12 h-12 text-teal-500 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Đồng hành cùng phụ nữ"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
          Giá trị chúng tôi mang đến
        </h2>

        {/* Services Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
            >
              {service.icon}
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}