import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../utils/db'; // Đường dẫn đến file db của bạn
import Post from '../../../models/Post.ts'; // Sửa đường dẫn đến model Post TypeScript

// Danh sách các trang tĩnh
const staticPages = [
  // Trang chủ - ưu tiên cao nhất
  { url: '/', changefreq: 'daily', priority: '1.0' },
  
  // Các trang chính của website
  { url: '/gioi-thieu', changefreq: 'monthly', priority: '0.8' },
  { url: '/lien-he', changefreq: 'monthly', priority: '0.7' },
  { url: '/bai-viet', changefreq: 'daily', priority: '0.9' },
  
  // Trang đăng ký/đăng nhập
  { url: '/dang-ky', changefreq: 'monthly', priority: '0.6' },
  { url: '/dang-nhap', changefreq: 'monthly', priority: '0.6' },
  
  // Trang tư vấn và công cụ
  { url: '/tu-van', changefreq: 'weekly', priority: '0.8' },
  { url: '/cong-cu-kiem-tra-tieu-duong-thai-ky', changefreq: 'monthly', priority: '0.7' },
  { url: '/huong-dan-su-dung-cong-cu', changefreq: 'monthly', priority: '0.6' },
  
  // Các trang chính sách
  { url: '/chinh-sach-bao-mat', changefreq: 'yearly', priority: '0.3' },
  { url: '/bao-mat', changefreq: 'yearly', priority: '0.3' },
  
  // Trang auth
  { url: '/auth/quen-mat-khau', changefreq: 'monthly', priority: '0.4' },
  { url: '/auth/dat-lai-mat-khau', changefreq: 'monthly', priority: '0.4' },
];

// Hàm tạo nội dung sitemap
const generateSitemap = (posts) => {
  const baseUrl = 'https://giangnoitiet.vn'; // Thay bằng domain thật của bạn

  // Tạo XML cho các trang tĩnh
  const staticPagesXml = staticPages
    .map((page) => `
      <url>
        <loc>${baseUrl}${page.url}</loc>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
      </url>
    `)
    .join('');

  // Tạo XML cho các bài viết động
  const postUrls = posts
    .map((post) => `
      <url>
        <loc>${baseUrl}/bai-viet/${encodeURIComponent(post.slug)}</loc>
        <lastmod>${new Date(post.updatedAt || post.createdAt).toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>
    `)
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPagesXml}
  ${postUrls}
</urlset>`;
};

// Hàm lấy dữ liệu bài viết
const getPostsForSitemap = async () => {
  try {
    await db.connectDb();
    // Chỉ lấy các bài viết đã published (không phải draft)
    const posts = await Post.find({ isDraft: false }, 'slug updatedAt createdAt').lean();
    await db.disconnectDb();
    return posts || []; // Đảm bảo luôn trả về array
  } catch (error) {
    console.error('Lỗi khi lấy bài viết:', error);
    // Trả về array rỗng thay vì throw error để sitemap vẫn hoạt động
    return [];
  }
};

// Handler chính
const handler = async (req, res) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const posts = await getPostsForSitemap();
    const sitemap = generateSitemap(posts);

    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache 1 giờ
    res.write(sitemap);
    res.end();
  } catch (error) {
    console.error('Lỗi khi tạo sitemap:', error);
    res.status(500).end('Lỗi máy chủ khi tạo sitemap');
  }
};

export default handler;