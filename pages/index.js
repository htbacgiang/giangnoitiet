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


  return (
    <DefaultLayout 
      title={meta?.title}
      desc={meta?.description}
      thumbnail={meta?.og?.image}
      meta={meta}
    >
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