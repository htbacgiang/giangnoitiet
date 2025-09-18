import Head from "next/head";
import DefaultLayout from "../components/layout/DefaultLayout";
import AboutSection from "../components/benhnoitiet/AboutSection";
import ValuesSection from "../components/benhnoitiet/TelehealthSection";
import HeroSectionBlog from "../components/ecobacgiang/HeroSectionBlog";
import PostCard from "../components/common/PostCard";
import Banner from "../components/benhnoitiet/Banner";
import { readPostsFromDb, formatPosts } from "../lib/utils";
import TestimonialComponent from "../components/benhnoitiet/TestimonialComponent";
import FAQComponent from "../components/benhnoitiet/FAQComponent";
import ServicesComponent from "../components/benhnoitiet/ServicesComponent";
import NewsletterSignup from "../components/ecobacgiang/NewsletterSignup";

export default function Home({ posts = [], meta = {} }) {
  // JSON-LD Schema.org cho Giang Nội Tiết
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization", // Hoặc "Physician" nếu đây là trang cá nhân của bác sĩ Giang
    "name": "Giang Nội Tiết",
    "url": "https://giangnoitiet.vn",
    "logo": "https://giangnoitiet.vn/logo-giang-noi-tiet-2.png", // Đảm bảo URL logo này là đúng
    "image": "https://giangnoitiet.vn/images/anh-bia-giang-noi-tiet.jpg", // Sử dụng ảnh banner chính của trang
    "description": "Giang Nội Tiết – Chuyên gia tư vấn tiểu đường thai kỳ MIỄN PHÍ cho phụ nữ mang thai. Hướng dẫn kiểm soát đường huyết, chế độ ăn uống và chăm sóc sức khỏe.",
    "sameAs": [
      "https://www.facebook.com/giangnoitiet",
      // Thêm các đường dẫn mạng xã hội khác nếu có (LinkedIn, Zalo OA...)
    ],
    // Thêm thông tin liên hệ và địa chỉ (nếu là phòng khám/tổ chức cụ thể)
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+84948907686",
      "contactType": "customer service",
      "areaServed": "VN",
      "availableLanguage": ["Vietnamese"],
      "serviceType": "Tư vấn tiểu đường thai kỳ miễn phí"
    },
    // Nếu có địa chỉ vật lý (ví dụ: phòng khám)
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Đồng Xung, Đồng Tân", // Thay bằng địa chỉ cụ thể
      "addressLocality": "Ứng Hòa",
      "addressRegion": "Hà Nội",
      "postalCode": "Mã bưu chính (nếu có)",
      "addressCountry": "VN"
    },
    "hasMap": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4504.736611381864!2d105.83786291145768!3d20.70699069867129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135cb7bf100f7d1%3A0x97cceeb460f2b6ec!2zR2lhbmcgTuG7mWkgVGnhur90IC0gQ2jEg20gU8OzYyBT4bupYyBLaG_hursgUGjhu6UgTuG7rw!5e1!3m2!1svi!2s!4v1748745832002!5m2!1svi!2s",
  };


  return (
    <DefaultLayout meta={meta}>
      <Head>
        <title>{meta?.title || "Giang Nội Tiết - Tư vấn Tiểu đường Thai kỳ Miễn phí cho Mẹ Bầu"}</title>
        <meta name="description" content={meta?.description || "Lo lắng về tiểu đường thai kỳ? Nhận ngay thực đơn 7 ngày MIỄN PHÍ. Chuyên gia Giang Nội Tiết giúp mẹ bầu nhận biết dấu hiệu, kiểm soát chỉ số và ăn uống hiệu quả. Liên hệ ngay!."} />
        <meta name="keywords" content={meta?.keywords || "tiểu đường thai kỳ, tư vấn tiểu đường thai kỳ miễn phí, dấu hiệu tiểu đường thai kỳ, xét nghiệm tiểu đường thai kỳ, ăn uống tiểu đường thai kỳ, sữa cho bà bầu bị tiểu đường thai kỳ, chỉ số tiểu đường thai kỳ, Giang Nội Tiết"} />
        <meta name="robots" content={meta?.robots || "index, follow"} />
        <meta name="author" content="Giang Nội Tiết" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#059669" />
        <meta name="msapplication-TileColor" content="#059669" />
        <link rel="canonical" href={meta?.canonical || "https://giangnoitiet.vn"} />
        
        {/* Additional SEO meta tags */}
        <meta name="geo.region" content="VN" />
        <meta name="geo.placename" content="Hà Nội" />
        <meta name="language" content="vi" />
        <meta name="revisit-after" content="7 days" />

        {/* Open Graph */}
        <meta property="og:title" content={meta?.og?.title || "Giang Nội Tiết - Tư vấn Tiểu đường Thai kỳ Miễn phí cho Mẹ Bầu"} />
        <meta property="og:description" content={meta?.og?.description || "Tư vấn tiểu đường thai kỳ MIỄN PHÍ bởi chuyên gia Giang Nội Tiết. Hướng dẫn kiểm soát đường huyết, chế độ ăn uống cho mẹ bầu. Tư vấn trực tuyến 24/7."} />
        <meta property="og:type" content={meta?.og?.type || "website"} />
        <meta property="og:url" content={meta?.og?.url || "https://giangnoitiet.vn"} />
        <meta property="og:image" content={meta?.og?.image || "https://giangnoitiet.vn/images/anh-bia-giang-noi-tiet.jpg"} />
        <meta property="og:image:width" content={meta?.og?.imageWidth || "1200"} />
        <meta property="og:image:height" content={meta?.og?.imageHeight || "630"} />
        <meta property="og:image:alt" content="Giang Nội Tiết - Chuyên gia tư vấn tiểu đường thai kỳ miễn phí cho mẹ bầu" />
        <meta property="og:image:type" content="image/jpeg" />

        {/* Twitter */}
        <meta name="twitter:card" content={meta?.twitter?.card || "summary_large_image"} />
        <meta name="twitter:title" content={meta?.twitter?.title || "Giang Nội Tiết - Tư vấn Tiểu đường Thai kỳ Miễn phí cho Mẹ Bầu"} />
        <meta name="twitter:description" content={meta?.twitter?.description || "Tư vấn tiểu đường thai kỳ MIỄN PHÍ bởi chuyên gia Giang Nội Tiết. Hướng dẫn kiểm soát đường huyết, chế độ ăn uống cho mẹ bầu. Tư vấn trực tuyến 24/7."} />
        <meta name="twitter:image" content={meta?.twitter?.image || "https://giangnoitiet.vn/images/anh-bia-giang-noi-tiet.jpg"} />
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

      </Head>
      <h1 className="visually-hidden">
      Giang Nội Tiết - Chuyên gia đồng hành cùng mẹ bầu vượt qua Tiểu đường Thai kỳ
      </h1>
      <Banner />
      <AboutSection />
      <FAQComponent />
      <ServicesComponent />
      <ValuesSection />
      <TestimonialComponent />
      <HeroSectionBlog />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3  pb-6">
          {posts.slice(0, 3).map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
      <NewsletterSignup />
    </DefaultLayout>
  );
}

export async function getServerSideProps() {
  try {
    // Lấy bài viết và format
    const raw = await readPostsFromDb(); // Fetch all posts
    const posts = formatPosts(raw) || [];

  const meta = {
    title: "Giang Nội Tiết: Tư vấn Tiểu đường Thai kỳ Miễn Phí",
    // Tiêu đề tối ưu: nhấn mạnh MIỄN PHÍ và chuyên môn
    description:
      "Mẹ bầu lo lắng về tiểu đường thai kỳ? Nhận ngay thực đơn 7 ngày MIỄN PHÍ. Chuyên gia Giang Nội Tiết giúp mẹ bầu nhận biết dấu hiệu, kiểm soát chỉ số và ăn uống hiệu quả. Liên hệ ngay!.", // Mô tả: nhấn mạnh MIỄN PHÍ, tư vấn 24/7
    keywords:
      "tiểu đường thai kỳ, tư vấn tiểu đường thai kỳ miễn phí, dấu hiệu tiểu đường thai kỳ, xét nghiệm tiểu đường thai kỳ, ăn uống tiểu đường thai kỳ, sữa cho bà bầu bị tiểu đường thai kỳ, chỉ số tiểu đường thai kỳ, Giang Nội Tiết", // Tập trung vào từ khóa miễn phí và chuyên môn
    robots: "index, follow",
    author: "Giang Nội Tiết",
    canonical: "https://giangnoitiet.vn", // Đảm bảo URL này là chuẩn và không có `/` thừa ở cuối nếu không cần
    og: {
      title: "Giang Nội Tiết - Tư vấn Tiểu đường Thai kỳ Miễn phí cho Mẹ Bầu",
      description:
        "Tư vấn tiểu đường thai kỳ MIỄN PHÍ bởi chuyên gia Giang Nội Tiết. Hướng dẫn kiểm soát đường huyết, chế độ ăn uống cho mẹ bầu. Tư vấn trực tuyến 24/7.",
      type: "website",
      image: "https://giangnoitiet.vn/images/anh-bia-giang-noi-tiet.jpg", // URL ảnh banner chính thức, chất lượng cao
      imageWidth: "1200", // Kích thước chuẩn cho ảnh OG
      imageHeight: "630",
      url: "https://giangnoitiet.vn",
    },
    twitter: {
      card: "summary_large_image",
      title: "Giang Nội Tiết - Tư vấn Tiểu đường Thai kỳ Miễn phí cho Mẹ Bầu",
      description:
        "Tư vấn tiểu đường thai kỳ MIỄN PHÍ bởi chuyên gia Giang Nội Tiết. Hướng dẫn kiểm soát đường huyết, chế độ ăn uống cho mẹ bầu. Tư vấn trực tuyến 24/7.",
      image: "https://giangnoitiet.vn/images/anh-bia-giang-noi-tiet.jpg", // Giống ảnh OG
    },
  };

    return {
      props: { posts, meta },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    
    // Fallback meta object
    const fallbackMeta = {
      title: "Giang Nội Tiết: Tư vấn Tiểu đường Thai kỳ Miễn Phí",
      description: "Lo lắng về tiểu đường thai kỳ? Nhận ngay thực đơn 7 ngày MIỄN PHÍ. Chuyên gia Giang Nội Tiết giúp mẹ bầu nhận biết dấu hiệu, kiểm soát chỉ số và ăn uống hiệu quả. Liên hệ ngay!.",
      keywords: "tiểu đường thai kỳ, tư vấn tiểu đường thai kỳ miễn phí, dấu hiệu tiểu đường thai kỳ, xét nghiệm tiểu đường thai kỳ, ăn uống tiểu đường thai kỳ, sữa cho bà bầu bị tiểu đường thai kỳ, chỉ số tiểu đường thai kỳ, Giang Nội Tiết",
      robots: "index, follow",
      author: "Giang Nội Tiết",
      canonical: "https://giangnoitiet.vn",
      og: {
        title: "Giang Nội Tiết - Tư vấn Tiểu đường Thai kỳ Miễn phí cho Mẹ Bầu",
        description: "Tư vấn tiểu đường thai kỳ MIỄN PHÍ bởi chuyên gia Giang Nội Tiết. Hướng dẫn kiểm soát đường huyết, chế độ ăn uống cho mẹ bầu. Tư vấn trực tuyến 24/7.",
        type: "website",
        image: "https://giangnoitiet.vn/images/anh-bia-giang-noi-tiet.jpg",
        imageWidth: "1200",
        imageHeight: "630",
        url: "https://giangnoitiet.vn",
      },
      twitter: {
        card: "summary_large_image",
        title: "Giang Nội Tiết - Tư vấn Tiểu đường Thai kỳ Miễn phí cho Mẹ Bầu",
        description: "Tư vấn tiểu đường thai kỳ MIỄN PHÍ bởi chuyên gia Giang Nội Tiết. Hướng dẫn kiểm soát đường huyết, chế độ ăn uống cho mẹ bầu. Tư vấn trực tuyến 24/7.",
        image: "https://giangnoitiet.vn/images/anh-bia-giang-noi-tiet.jpg",
      },
    };

    return {
      props: { posts: [], meta: fallbackMeta },
    };
  }
}