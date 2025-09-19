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
    <DefaultLayout 
      title={meta?.title}
      desc={meta?.description}
      thumbnail={meta?.og?.image}
      meta={meta}
    >
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
      Giang Nội Tiết - Người đồng hành cùng mẹ bầu tiểu đường thai kỳ
      </h1>
      <section className="py-8 bg-white">
        <div className="container mx-auto ">
          <FoviaAboutUsComponent />
        </div>
      </section>
      <section className="">
        <div className="container mx-auto ">
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
    title: "Giang Nội Tiết - Người đồng hành cùng mẹ bầu tiểu đường thai kỳ", // Tối ưu tiêu đề: Rõ ràng, chứa từ khóa, nhấn mạnh vai trò
    description:
      "Giang Nội Tiết là kênh chuyên cung cấp kiến thức chính thống, dễ hiểu về tiểu đường thai kỳ. Giúp mẹ bầu bớt hoang mang, biết cách theo dõi và kiểm soát đường huyết hằng ngày để có thai kỳ khỏe mạnh.", // Mô tả: Cụ thể, hấp dẫn, chứa từ khóa chính, độ dài phù hợp
    keywords:
      "Giang Nội Tiết, tiểu đường thai kỳ, mẹ bầu, kiểm soát đường huyết, tư vấn thai kỳ, điều dưỡng nội tiết, sức khỏe thai kỳ, đồng hành mẹ bầu", // Thêm từ khóa đa dạng, liên quan đến nội dung "Về chúng tôi"
    robots: "index, follow",
    author: "Giang Nội Tiết",
    canonical: "https://giangnoitiet.vn/gioi-thieu", // Đảm bảo URL canonical chính xác
    og: {
      title: "Giang Nội Tiết - Người đồng hành cùng mẹ bầu tiểu đường thai kỳ",
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
      title: "Giang Nội Tiết - Người đồng hành cùng mẹ bầu tiểu đường thai kỳ",
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