/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: 'https://giangnoitiet.vn',
  generateRobotsTxt: false, // Tắt vì chúng ta đã có robots.txt tùy chỉnh
  sitemapSize: 7000,
  exclude: ['/admin/*', '/dashboard/*', '/api/*', '/auth/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/dashboard/', '/api/'],
      },
    ],
    additionalSitemaps: [
      'https://giangnoitiet.vn/sitemap.xml',
      'https://giangnoitiet.vn/api/sitemap.xml'
    ],
  },
  // Sử dụng transform thay vì additionalPaths để tránh vấn đề import
  transform: async (config, path) => {
    // Cấu hình priority dựa trên đường dẫn
    let priority = 0.7;
    let changefreq = 'weekly';
    
    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path.includes('/bai-viet')) {
      priority = 0.9;
      changefreq = 'daily';
    } else if (path.includes('/tu-van') || path.includes('/gioi-thieu')) {
      priority = 0.8;
      changefreq = 'monthly';
    } else if (path.includes('/dang-ky') || path.includes('/dang-nhap')) {
      priority = 0.6;
      changefreq = 'monthly';
    }
    
    return {
      loc: path,
      changefreq: changefreq,
      priority: priority,
      lastmod: new Date().toISOString(),
    };
  },
};