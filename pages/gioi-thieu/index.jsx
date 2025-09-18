import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { useState, useEffect } from "react";
import FoviaAboutUsComponent from "../../components/benhnoitiet/FoviaAboutUsComponent";
import FreelancerComponent from "../../components/benhnoitiet/FreelancerComponent";
import NewsletterSignup from "../../components/ecobacgiang/NewsletterSignup";
import FAQComponent from "../../components/benhnoitiet/FAQComponent";


export default function AboutUs({ meta }) {
  const [runAnimation, setRunAnimation] = useState(false);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    // Trigger animations on mount
    setRunAnimation(true);
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    // Observe elements with animation IDs
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
  // JSON-LD Schema.org cho trang "Về Chúng Tôi" (MedicalOrganization hoặc Person)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization", // Hoặc "Person" nếu Giang Nội Tiết là một cá nhân bác sĩ
    "name": "Giang Nội Tiết",
    "url": "https://giangnoitiet.vn/gioi-thieu",
    "logo": "https://giangnoitiet.vn/logo-giang-noi-tiet-2.png", // Đảm bảo URL logo này là đúng
    "image": "https://giangnoitiet.vn/images/anh-bia-giang-noi-tiet.jpg", // Sử dụng ảnh banner chính của trang
    "description": "Giang Nội Tiết là kênh chuyên cung cấp kiến thức chính thống, dễ hiểu về tiểu đường thai kỳ. Giúp mẹ bầu bớt hoang mang, biết cách theo dõi và kiểm soát đường huyết hằng ngày để có thai kỳ khỏe mạnh.",
    "medicalSpecialty": "Endocrinology",
    "areaServed": "Vietnam",
    "serviceType": "Gestational Diabetes Education and Support",
    "sameAs": [
      "https://www.facebook.com/giangnoitiet",
      // Thêm các liên kết mạng xã hội khác nếu có
    ],
    "founder": {
      "@type": "Person",
      "name": "Nguyễn Thị Hương Giang",
      "jobTitle": "Điều dưỡng chuyên khoa Nội tiết sinh sản",
      "worksFor": {
        "@type": "Organization",
        "name": "Bệnh viện Nội Tiết Trung Ương"
      }
    },
    "mission": "Giúp các mẹ bầu bớt hoang mang, biết cách theo dõi và kiểm soát đường huyết hằng ngày, để có một thai kỳ khỏe mạnh và an toàn cho cả mẹ và bé.",

  };
  return (
    <DefaultLayout>
      <Head>
        {/* JSON-LD Schema.org cho trang Về Chúng Tôi */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>


      {/* Main Section */}
      <div className="h-[80px] bg-white"></div>
      <h1 className="visually-hidden">
      Về Giang Nội Tiết - Người đồng hành cùng mẹ bầu tiểu đường thai kỳ
      </h1>
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <FoviaAboutUsComponent />
          {/* Journey Section */}
          <div className="mt-16" data-animate id="journey-section">
            <div className="text-center mb-12">
              <h2 className={`text-3xl sm:text-3xl  font-bold text-gray-900 mb-4 transition-all duration-700 ${isVisible['journey-section'] ? 'animate-fade-in' : 'opacity-0'}`}>
                Hành Trình Trở Thành <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Chuyên Gia Nội Tiết</span>
              </h2>
              <div className={`w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full transition-all duration-700 delay-300 ${isVisible['journey-section'] ? 'animate-fade-in' : 'opacity-0'}`}></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Column: Text Content */}
              <div className="space-y-4">
                <div className={`bg-white/90 backdrop-blur-sm rounded-xl p-5 lg:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/30 card-hover ${isVisible['journey-section'] ? 'animate-slide-in-from-left' : 'opacity-0'}`} style={{animationDelay: '0.2s'}}>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-md">
                        <span className="text-white font-bold text-sm">1</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Khởi Đầu Từ Điều Dưỡng</h3>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        Xuất phát điểm của tôi không phải là một bác sĩ, mà là một điều dưỡng chuyên sâu về nội tiết sinh sản.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className={`bg-white/90 backdrop-blur-sm rounded-xl p-5 lg:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/30 card-hover ${isVisible['journey-section'] ? 'animate-slide-in-from-left' : 'opacity-0'}`} style={{animationDelay: '0.4s'}}>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-md">
                        <span className="text-white font-bold text-sm">2</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Thực Tế Tại Bệnh Viện</h3>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        Quá trình làm việc tại Bệnh viện Nội Tiết Trung Ương, tiếp xúc với hàng nghìn bệnh nhân nữ đã giúp tôi nhận ra sự thật quan trọng.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className={`bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 rounded-xl p-5 lg:p-6 border-2 border-red-200 shadow-lg hover:shadow-xl transition-all duration-300 card-hover ${isVisible['journey-section'] ? 'animate-slide-in-from-left' : 'opacity-0'}`} style={{animationDelay: '0.6s'}}>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                        <span className="text-white font-bold text-lg">⚠️</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-red-800 mb-2 flex items-center">
                        <span className="mr-2">🚨</span>
                        Nhận Thức Quan Trọng
                      </h3>
                      <p className="text-red-700 leading-relaxed font-semibold text-sm">
                        <span className="text-red-800 font-bold text-base">Phụ nữ hiện đại đang phải đối mặt với rất nhiều vấn đề về nội tiết nhưng chưa thực sự hiểu và quan tâm đúng mức.</span>
                      </p>
                      <div className="mt-3 p-2 bg-red-100 rounded-lg border border-red-200">
                        <p className="text-red-600 text-xs font-medium">
                          ⚡ Đây là vấn đề cấp thiết cần được giải quyết ngay!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Image */}
              <div className="relative order-1 lg:order-2">
                <div className={`relative h-64 sm:h-80 lg:h-96 w-full rounded-2xl overflow-hidden shadow-xl ${isVisible['journey-section'] ? 'animate-slide-in-from-right' : 'opacity-0'}`} style={{animationDelay: '0.3s'}}>
                  <Image
                    src="/images/giang-noi-tiet-1.webp"
                    alt="Điều dưỡng tư vấn tiểu đường thai kỳ"
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-700 hover:scale-105 filter brightness-110 contrast-105"
                  />
                  {/* Soft gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-emerald-500/15"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-transparent to-teal-400/20"></div>
                </div>
              </div>
            </div>
          </div>
          {/* Call to Action Section */}
          <div className="mt-16" data-animate id="cta-section">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Column: Image */}
              <div className="relative order-2 lg:order-1">
                <div className={`relative h-64 sm:h-80 lg:h-96 w-full rounded-2xl overflow-hidden shadow-xl ${isVisible['cta-section'] ? 'animate-slide-in-from-left' : 'opacity-0'}`} style={{animationDelay: '0.2s'}}>
                  <Image
                    src="/images/giang-noi-tiet-2.webp"
                    alt="Sức khỏe mẹ bầu và tiểu đường thai kỳ"
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-700 hover:scale-105 filter brightness-110 contrast-105"
                  />
                  {/* Soft gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-emerald-500/15"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-transparent to-teal-400/20"></div>
                </div>
              </div>

              {/* Right Column: CTA Content */}
              <div className="space-y-5 order-1 lg:order-2">
                <div>
                  <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 ${isVisible['cta-section'] ? 'animate-slide-in-from-right' : 'opacity-0'}`} style={{animationDelay: '0.1s'}}>
                    Bắt đầu hành trình <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">chăm sóc nội tiết</span> ngay hôm nay!
                  </h2>
                  <div className="space-y-3 text-gray-600 text-sm lg:text-base leading-relaxed">
                    <p className={`${isVisible['cta-section'] ? 'animate-slide-in-from-right' : 'opacity-0'}`} style={{animationDelay: '0.3s'}}>
                      Nếu bạn đang gặp phải rối loạn kinh nguyệt, mất ngủ, khô hạn, suy giảm ham muốn, mệt mỏi, tăng cân không kiểm soát…
                    </p>
                    <div className={`bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-400 p-3 lg:p-4 rounded-r-lg card-hover ${isVisible['cta-section'] ? 'animate-slide-in-from-right' : 'opacity-0'}`} style={{animationDelay: '0.5s'}}>
                      <p className="text-red-700 font-semibold text-sm">
                        🚨 ĐỪNG CHỦ QUAN!
                      </p>
                    </div>
                    <div className={`bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-400 p-3 lg:p-4 rounded-r-lg card-hover ${isVisible['cta-section'] ? 'animate-slide-in-from-right' : 'opacity-0'}`} style={{animationDelay: '0.7s'}}>
                      <p className="text-gray-700 text-sm">
                        🌸 <span className="font-semibold text-emerald-700">Nội tiết là nền tảng của sức khỏe và sắc đẹp.</span> Nếu bạn không chăm sóc ngay từ bây giờ, cơ thể bạn sẽ xuống dốc nhanh chóng mà bạn không nhận ra.
                      </p>
                    </div>
                    <p className={`text-gray-700 font-medium text-sm ${isVisible['cta-section'] ? 'animate-slide-in-from-right' : 'opacity-0'}`} style={{animationDelay: '0.9s'}}>
                      Hãy cùng tôi tìm hiểu và chăm sóc nội tiết đúng cách, để luôn khỏe mạnh, trẻ trung và tràn đầy sức sống trong mọi giai đoạn cuộc đời!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <FreelancerComponent />
          <FAQComponent />
          <NewsletterSignup />
        </div>
      </section>
    </DefaultLayout>
  );
}

export async function getServerSideProps() {
  const meta = {
    title: "Về Giang Nội Tiết - Người đồng hành cùng mẹ bầu tiểu đường thai kỳ", // Tối ưu tiêu đề: Rõ ràng, chứa từ khóa, nhấn mạnh vai trò
    description:
      "Giang Nội Tiết là kênh chuyên cung cấp kiến thức chính thống, dễ hiểu về tiểu đường thai kỳ. Giúp mẹ bầu bớt hoang mang, biết cách theo dõi và kiểm soát đường huyết hằng ngày để có thai kỳ khỏe mạnh.", // Mô tả: Cụ thể, hấp dẫn, chứa từ khóa chính, độ dài phù hợp
    keywords:
      "Giang Nội Tiết, tiểu đường thai kỳ, mẹ bầu, kiểm soát đường huyết, tư vấn thai kỳ, điều dưỡng nội tiết, sức khỏe thai kỳ, đồng hành mẹ bầu", // Thêm từ khóa đa dạng, liên quan đến nội dung "Về chúng tôi"
    robots: "index, follow",
    author: "Giang Nội Tiết",
    canonical: "https://giangnoitiet.vn/gioi-thieu", // Đảm bảo URL canonical chính xác
    og: {
      title: "Về Giang Nội Tiết - Người đồng hành cùng mẹ bầu tiểu đường thai kỳ",
      description:
        "Giang Nội Tiết là kênh chuyên cung cấp kiến thức chính thống, dễ hiểu về tiểu đường thai kỳ. Giúp mẹ bầu bớt hoang mang, biết cách theo dõi và kiểm soát đường huyết hằng ngày để có thai kỳ khỏe mạnh.",
      type: "website", // Hoặc "profile" nếu trang này giới thiệu về một cá nhân
      image: "https://giangnoitiet.vn/images/anh-bia-giang-noi-tiet.jpg", // Ảnh đại diện cho trang "Về Chúng Tôi" (khác với homepage)
      imageWidth: "1200",
      imageHeight: "630",
      url: "https://giangnoitiet.vn/gioi-thieu",
    },
    twitter: {
      card: "summary_large_image",
      title: "Về Giang Nội Tiết - Người đồng hành cùng mẹ bầu tiểu đường thai kỳ",
      description:
        "Giang Nội Tiết là kênh chuyên cung cấp kiến thức chính thống, dễ hiểu về tiểu đường thai kỳ. Giúp mẹ bầu bớt hoang mang, biết cách theo dõi và kiểm soát đường huyết hằng ngày để có thai kỳ khỏe mạnh.",
      image: "https://giangnoitiet.vn/images/anh-bia-giang-noi-tiet.jpg",
    },
  };

  return {
    props: {
      meta,
    },
  };
}