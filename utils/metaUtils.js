// utils/metaUtils.js

// Function to create dynamic site navigation with recent posts
export function createSiteNavigation(posts = []) {
  const baseNavigation = [
    {
      "@type": "SiteNavigationElement",
      "position": 1,
      "name": "Giới thiệu",
      "description": "Người đồng hành cùng mẹ bầu tiểu đường thai kỳ",
      "url": "https://giangnoitiet.vn/gioi-thieu"
    },
    {
      "@type": "SiteNavigationElement",
      "position": 2, 
      "name": "Công cụ kiểm tra",
      "description": "Công cụ kiểm tra tiểu đường thai kỳ miễn phí",
      "url": "https://giangnoitiet.vn/cong-cu-kiem-tra-tieu-duong-thai-ky"
    },
    {
      "@type": "SiteNavigationElement",
      "position": 3,
      "name": "Liên hệ",
      "description": "Thông tin liên hệ và hỗ trợ 24/7",
      "url": "https://giangnoitiet.vn/lien-he"
    }
  ];

  // Thêm 2 bài viết gần nhất nếu có
  if (posts && posts.length >= 2) {
    baseNavigation.push(
      {
        "@type": "SiteNavigationElement",
        "position": 4,
        "name": posts[0]?.title?.substring(0, 50) || 'Bài viết mới nhất',
        "description": posts[0]?.meta?.substring(0, 60) || 'Bài viết mới nhất về tiểu đường thai kỳ',
        "url": `https://giangnoitiet.vn/bai-viet/${posts[0]?.slug || ''}`
      },
      {
        "@type": "SiteNavigationElement",
        "position": 5,
        "name": posts[1]?.title?.substring(0, 50) || 'Bài viết thứ 2',
        "description": posts[1]?.meta?.substring(0, 60) || 'Bài viết gần đây về tiểu đường thai kỳ',
        "url": `https://giangnoitiet.vn/bai-viet/${posts[1]?.slug || ''}`
      }
    );
  }

  return baseNavigation;
}

export function createPageMeta({
  title,
  description,
  keywords,
  canonicalPath,
  ogImage = "https://giangnoitiet.vn/images/anh-bia-giang-noi-tiet.jpg",
  ogType = "website"
}) {
  const fullTitle = title ? `${title} | Giang Nội Tiết` : "Giang Nội Tiết";
  const fullCanonical = `https://giangnoitiet.vn${canonicalPath}`;
  
  return {
    title: fullTitle,
    description: description || "Giang Nội Tiết - Chuyên gia tư vấn tiểu đường thai kỳ miễn phí cho mẹ bầu",
    keywords: keywords || "tiểu đường thai kỳ, tư vấn tiểu đường thai kỳ miễn phí, Giang Nội Tiết",
    robots: "index, follow",
    author: "Giang Nội Tiết",
    canonical: fullCanonical,
    og: {
      title: fullTitle,
      description: description || "Tư vấn tiểu đường thai kỳ MIỄN PHÍ bởi chuyên gia Giang Nội Tiết",
      type: ogType,
      image: ogImage,
      imageWidth: "1200",
      imageHeight: "630",
      url: fullCanonical,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: description || "Tư vấn tiểu đường thai kỳ MIỄN PHÍ bởi chuyên gia Giang Nội Tiết",
      image: ogImage,
    },
  };
}

// Predefined meta for common pages
export const pageMetas = {
  home: createPageMeta({
    title: "Tư vấn Tiểu đường Thai kỳ Miễn Phí",
    description: "Mẹ bầu lo lắng về tiểu đường thai kỳ? Nhận ngay thực đơn 7 ngày MIỄN PHÍ. Chuyên gia Giang Nội Tiết giúp mẹ bầu nhận biết dấu hiệu, kiểm soát chỉ số và ăn uống hiệu quả. Liên hệ ngay!",
    keywords: "tiểu đường thai kỳ, tư vấn tiểu đường thai kỳ miễn phí, dấu hiệu tiểu đường thai kỳ, xét nghiệm tiểu đường thai kỳ, ăn uống tiểu đường thai kỳ, sữa cho bà bầu bị tiểu đường thai kỳ, chỉ số tiểu đường thai kỳ, Giang Nội Tiết",
    canonicalPath: "",
  }),
  
  about: createPageMeta({
    title: "Đồng hành cùng mẹ bầu tiểu đường thai kỳ",
    description: "Giang Nội Tiết là kênh chuyên cung cấp kiến thức chính thống, dễ hiểu về tiểu đường thai kỳ. Giúp mẹ bầu bớt hoang mang, biết cách theo dõi và kiểm soát đường huyết hằng ngày để có thai kỳ khỏe mạnh.",
    keywords: "Giang Nội Tiết, tiểu đường thai kỳ, mẹ bầu, kiểm soát đường huyết, tư vấn thai kỳ, điều dưỡng nội tiết, sức khỏe thai kỳ, đồng hành mẹ bầu",
    canonicalPath: "/gioi-thieu",
  }),
  
  login: createPageMeta({
    title: "Đăng nhập",
    description: "Đăng nhập vào tài khoản Giang Nội Tiết để nhận tư vấn cá nhân hóa về tiểu đường thai kỳ",
    keywords: "đăng nhập, tài khoản Giang Nội Tiết, tư vấn tiểu đường thai kỳ",
    canonicalPath: "/dang-nhap",
  }),
  
  register: createPageMeta({
    title: "Đăng ký",
    description: "Tạo tài khoản miễn phí để nhận tư vấn chuyên môn về tiểu đường thai kỳ từ Giang Nội Tiết",
    keywords: "đăng ký, tài khoản miễn phí, tư vấn tiểu đường thai kỳ, Giang Nội Tiết",
    canonicalPath: "/dang-ky",
  }),
  
  forgotPassword: createPageMeta({
    title: "Quên mật khẩu",
    description: "Khôi phục mật khẩu tài khoản Giang Nội Tiết để tiếp tục nhận tư vấn về tiểu đường thai kỳ",
    keywords: "quên mật khẩu, khôi phục tài khoản, Giang Nội Tiết",
    canonicalPath: "/auth/quen-mat-khau",
  }),
  
  resetPassword: createPageMeta({
    title: "Đặt lại mật khẩu",
    description: "Đặt lại mật khẩu mới cho tài khoản Giang Nội Tiết",
    keywords: "đặt lại mật khẩu, mật khẩu mới, Giang Nội Tiết",
    canonicalPath: "/auth/dat-lai-mat-khau",
  }),
  
  settings: createPageMeta({
    title: "Cài đặt tài khoản",
    description: "Quản lý thông tin tài khoản và tùy chỉnh cài đặt nhận thông báo từ Giang Nội Tiết",
    keywords: "cài đặt tài khoản, quản lý thông tin, Giang Nội Tiết",
    canonicalPath: "/cai-dat",
  }),
  
  unsubscribe: createPageMeta({
    title: "Hủy đăng ký nhận email",
    description: "Hủy đăng ký nhận email thông báo từ Giang Nội Tiết",
    keywords: "hủy đăng ký email, ngừng nhận thông báo, Giang Nội Tiết",
    canonicalPath: "/unsubscribe",
  }),
  
  gestationalDiabetesTool: createPageMeta({
    title: "Công Cụ Kiểm Tra Tiểu Đường Thai Kỳ Tại Nhà | Miễn Phí & Chính Xác",
    description: "Công cụ kiểm tra và theo dõi tiểu đường thai kỳ miễn phí của Giang Nội Tiết. Nhập chỉ số đường huyết để chuyển đổi, theo dõi hàng ngày và nhận lời khuyên hữu ích.",
    keywords: "tiểu đường thai kỳ, công cụ kiểm tra, theo dõi đường huyết, tính chỉ số tiểu đường thai kỳ, chuyển đổi mmol/L sang mg/dL, giangnoitiet, Giang Nội Tiết, calculator tiểu đường thai kỳ, công cụ tính toán",
    canonicalPath: "/cong-cu-kiem-tra-tieu-duong-thai-ky",
    ogType: "website",
  }),
  
  toolGuide: createPageMeta({
    title: "Hướng Dẫn Chi Tiết Sử Dụng Công Cụ Kiểm Tra Tiểu Đường Thai Kỳ",
    description: "Hướng dẫn từng bước cách sử dụng công cụ kiểm tra đường huyết của Giang Nội Tiết. Tìm hiểu cách nhập dữ liệu, đọc kết quả chính xác và theo dõi sức khỏe thai kỳ hiệu quả.",
    keywords: "hướng dẫn sử dụng công cụ tiểu đường thai kỳ, cách kiểm tra đường huyết, theo dõi tiểu đường thai kỳ, tutorial, how to use, giangnoitiet, Giang Nội Tiết, hướng dẫn từng bước",
    canonicalPath: "/huong-dan-su-dung-cong-cu",
    ogType: "article",
  }),
  
  privacy: createPageMeta({
    title: "Bảo mật dữ liệu - Giang Nội Tiết",
    description: "Cam kết bảo mật dữ liệu người dùng với mã hóa SSL, tuân thủ GDPR và backup tự động. Dữ liệu sức khỏe tiểu đường thai kỳ được bảo vệ tuyệt đối.",
    keywords: "bảo mật dữ liệu, SSL, GDPR, backup, Giang Nội Tiết, tiểu đường thai kỳ, privacy policy, chính sách bảo mật, an toàn thông tin",
    canonicalPath: "/bao-mat",
    ogType: "website",
  }),
  
  consultation: createPageMeta({
    title: "Tư vấn chuyên gia tiểu đường thai kỳ - Giang Nội Tiết",
    description: "Tư vấn trực tiếp với bác sĩ nội tiết chuyên khoa về tiểu đường thai kỳ. Đồng hành cùng phụ nữ có thai trước, trong và sau khi sinh. Hỗ trợ 24/7 với đội ngũ chuyên gia giàu kinh nghiệm.",
    keywords: "tư vấn tiểu đường thai kỳ, bác sĩ nội tiết, chuyên gia, Giang Nội Tiết, phụ nữ có thai, trước sinh, sau sinh, tư vấn online, tư vấn chuyên gia",
    canonicalPath: "/tu-van",
    ogType: "website",
  }),
  
  contact: createPageMeta({
    title: "Liên hệ Giang Nội Tiết - Tư vấn tiểu đường thai kỳ miễn phí",
    description: "Liên hệ với chuyên gia Giang Nội Tiết để được tư vấn miễn phí về tiểu đường thai kỳ. Hotline: +84 948 907 686. Hỗ trợ 24/7 qua Zalo, email và các kênh trực tuyến.",
    keywords: "liên hệ Giang Nội Tiết, hotline tư vấn tiểu đường thai kỳ, tư vấn miễn phí, contact, Zalo, email, địa chỉ, hỗ trợ 24/7",
    canonicalPath: "/lien-he",
    ogType: "website",
  }),
};
