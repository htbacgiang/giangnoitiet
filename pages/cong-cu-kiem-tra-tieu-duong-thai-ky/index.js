import Head from 'next/head';
import GestationalDiabetesCalculator from '../../components/benhnoitiet/GestationalDiabetesCalculator';
import DefaultLayout from '../../components/layout/DefaultLayout';

export default function CongCuKiemTraTieuDuongThaiKy({ meta = {} }) {
  // JSON-LD Schema.org cho trang công cụ kiểm tra tiểu đường thai kỳ
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": meta?.title || "Công Cụ Kiểm Tra Tiểu Đường Thai Kỳ",
    "description": meta?.description || "Công cụ kiểm tra và theo dõi tiểu đường thai kỳ miễn phí của Giang Nội Tiết",
    "url": meta?.canonical || "https://giangnoitiet.vn/cong-cu-kiem-tra-tieu-duong-thai-ky",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "VND"
    },
    "provider": {
      "@type": "MedicalOrganization",
      "name": "Giang Nội Tiết",
      "url": "https://giangnoitiet.vn"
    },
    "featureList": [
      "Chuyển đổi đơn vị đường huyết",
      "Theo dõi chỉ số hàng ngày",
      "Tư vấn miễn phí",
      "Lời khuyên từ chuyên gia"
    ]
  };

  return (
    <DefaultLayout meta={meta}>
      <Head>
        <title>{meta?.title || "Công Cụ Kiểm Tra Tiểu Đường Thai Kỳ Tại Nhà | Miễn Phí & Chính Xác"}</title>
        <meta name="description" content={meta?.description || "Công cụ kiểm tra và theo dõi tiểu đường thai kỳ miễn phí của Giang Nội Tiết. Nhập chỉ số đường huyết để chuyển đổi, theo dõi hàng ngày và nhận lời khuyên hữu ích."} />
        <meta name="keywords" content={meta?.keywords || "tiểu đường thai kỳ, công cụ kiểm tra, theo dõi đường huyết, tính chỉ số tiểu đường thai kỳ, chuyển đổi mmol/L sang mg/dL, giangnoitiet, Giang Nội Tiết"} />
        <meta name="robots" content={meta?.robots || "index, follow"} />
        <meta name="author" content="Giang Nội Tiết" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#059669" />
        <meta name="msapplication-TileColor" content="#059669" />
        <link rel="canonical" href={meta?.canonical || "https://giangnoitiet.vn/cong-cu-kiem-tra-tieu-duong-thai-ky"} />
        
        {/* Additional SEO meta tags */}
        <meta name="geo.region" content="VN" />
        <meta name="geo.placename" content="Hà Nội" />
        <meta name="language" content="vi" />
        <meta name="revisit-after" content="7 days" />

        {/* Open Graph */}
        <meta property="og:title" content={meta?.og?.title || "Công Cụ Kiểm Tra Tiểu Đường Thai Kỳ Miễn Phí"} />
        <meta property="og:description" content={meta?.og?.description || "Công cụ theo dõi và kiểm soát đường huyết cho phụ nữ mang thai. Nhận kết quả nhanh chóng, chính xác và lời khuyên từ chuyên gia."} />
        <meta property="og:type" content={meta?.og?.type || "website"} />
        <meta property="og:url" content={meta?.og?.url || "https://giangnoitiet.vn/cong-cu-kiem-tra-tieu-duong-thai-ky"} />
        <meta property="og:image" content={meta?.og?.image || "https://giangnoitiet.vn/images/anh-bia-giang-noi-tiet.jpg"} />
        <meta property="og:image:width" content={meta?.og?.imageWidth || "1200"} />
        <meta property="og:image:height" content={meta?.og?.imageHeight || "630"} />
        <meta property="og:image:alt" content="Công Cụ Kiểm Tra Tiểu Đường Thai Kỳ - Giang Nội Tiết" />
        <meta property="og:image:type" content="image/jpeg" />

        {/* Twitter */}
        <meta name="twitter:card" content={meta?.twitter?.card || "summary_large_image"} />
        <meta name="twitter:title" content={meta?.twitter?.title || "Công Cụ Kiểm Tra Tiểu Đường Thai Kỳ Miễn Phí"} />
        <meta name="twitter:description" content={meta?.twitter?.description || "Công cụ theo dõi và kiểm soát đường huyết cho phụ nữ mang thai. Nhận kết quả nhanh chóng, chính xác và lời khuyên từ chuyên gia."} />
        <meta name="twitter:image" content={meta?.twitter?.image || "https://giangnoitiet.vn/images/anh-bia-giang-noi-tiet.jpg"} />
        
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <div className="h-[80px]"></div>
      <h1 className="visually-hidden">
        Công Cụ Kiểm Tra & Theo Dõi Tiểu Đường Thai Kỳ Tại Nhà
      </h1>
      <GestationalDiabetesCalculator />
    </DefaultLayout>
  );
}

export async function getServerSideProps() {
  try {
    const meta = {
      title: "Công Cụ Kiểm Tra Tiểu Đường Thai Kỳ Tại Nhà | Miễn Phí & Chính Xác",
      description: "Công cụ kiểm tra và theo dõi tiểu đường thai kỳ miễn phí của Giang Nội Tiết. Nhập chỉ số đường huyết để chuyển đổi, theo dõi hàng ngày và nhận lời khuyên hữu ích.",
      keywords: "tiểu đường thai kỳ, công cụ kiểm tra, theo dõi đường huyết, tính chỉ số tiểu đường thai kỳ, chuyển đổi mmol/L sang mg/dL, giangnoitiet, Giang Nội Tiết",
      robots: "index, follow",
      author: "Giang Nội Tiết",
      canonical: "https://giangnoitiet.vn/cong-cu-kiem-tra-tieu-duong-thai-ky",
      og: {
        title: "Công Cụ Kiểm Tra Tiểu Đường Thai Kỳ Miễn Phí",
        description: "Công cụ theo dõi và kiểm soát đường huyết cho phụ nữ mang thai. Nhận kết quả nhanh chóng, chính xác và lời khuyên từ chuyên gia.",
        type: "website",
        image: "https://giangnoitiet.vn/images/anh-bia-giang-noi-tiet.jpg",
        imageWidth: "1200",
        imageHeight: "630",
        url: "https://giangnoitiet.vn/cong-cu-kiem-tra-tieu-duong-thai-ky",
      },
      twitter: {
        card: "summary_large_image",
        title: "Công Cụ Kiểm Tra Tiểu Đường Thai Kỳ Miễn Phí",
        description: "Công cụ theo dõi và kiểm soát đường huyết cho phụ nữ mang thai. Nhận kết quả nhanh chóng, chính xác và lời khuyên từ chuyên gia.",
        image: "https://giangnoitiet.vn/images/anh-bia-giang-noi-tiet.jpg",
      },
    };

    return {
      props: { meta },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    
    // Fallback meta object
    const fallbackMeta = {
      title: "Công Cụ Kiểm Tra Tiểu Đường Thai Kỳ Tại Nhà | Miễn Phí & Chính Xác",
      description: "Công cụ kiểm tra và theo dõi tiểu đường thai kỳ miễn phí của Giang Nội Tiết. Nhập chỉ số đường huyết để chuyển đổi, theo dõi hàng ngày và nhận lời khuyên hữu ích.",
      keywords: "tiểu đường thai kỳ, công cụ kiểm tra, theo dõi đường huyết, tính chỉ số tiểu đường thai kỳ, chuyển đổi mmol/L sang mg/dL, giangnoitiet, Giang Nội Tiết",
      robots: "index, follow",
      author: "Giang Nội Tiết",
      canonical: "https://giangnoitiet.vn/cong-cu-kiem-tra-tieu-duong-thai-ky",
      og: {
        title: "Công Cụ Kiểm Tra Tiểu Đường Thai Kỳ Miễn Phí",
        description: "Công cụ theo dõi và kiểm soát đường huyết cho phụ nữ mang thai. Nhận kết quả nhanh chóng, chính xác và lời khuyên từ chuyên gia.",
        type: "website",
        image: "https://giangnoitiet.vn/images/anh-bia-giang-noi-tiet.jpg",
        imageWidth: "1200",
        imageHeight: "630",
        url: "https://giangnoitiet.vn/cong-cu-kiem-tra-tieu-duong-thai-ky",
      },
      twitter: {
        card: "summary_large_image",
        title: "Công Cụ Kiểm Tra Tiểu Đường Thai Kỳ Miễn Phí",
        description: "Công cụ theo dõi và kiểm soát đường huyết cho phụ nữ mang thai. Nhận kết quả nhanh chóng, chính xác và lời khuyên từ chuyên gia.",
        image: "https://giangnoitiet.vn/images/anh-bia-giang-noi-tiet.jpg",
      },
    };

    return {
      props: { meta: fallbackMeta },
    };
  }
}