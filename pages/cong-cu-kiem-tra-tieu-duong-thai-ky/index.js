import Head from 'next/head';
import GestationalDiabetesCalculator from '../../components/benhnoitiet/GestationalDiabetesCalculator';
import DefaultLayout from '../../components/layout/DefaultLayout';
import { pageMetas } from '../../utils/metaUtils';

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
    <DefaultLayout 
      title={meta?.title}
      desc={meta?.description}
      thumbnail={meta?.og?.image}
      meta={meta}
    >
      <Head>
        {/* JSON-LD cho công cụ webapp */}
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
    return {
      props: { 
        meta: pageMetas.gestationalDiabetesTool 
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    
    return {
      props: { 
        meta: pageMetas.gestationalDiabetesTool 
      },
    };
  }
}