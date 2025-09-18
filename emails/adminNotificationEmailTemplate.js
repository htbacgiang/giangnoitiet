export const adminNotificationEmailTemplate = (registrationData) => {
  const { name, age, phone, email, purpose, courseSlug, registeredAt, ipAddress, userAgent } = registrationData;
  
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="vi">
 <head>
  <meta charset="UTF-8">
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta content="telephone=no" name="format-detection">
  <title>Thông báo đăng ký tư vấn tiểu đường thai kỳ mới - Ekip Giang Nội Tiết</title>
  <style type="text/css">
    body {
      width:100%;
      height:100%;
      padding:0;
      margin:0;
      font-family: Arial, sans-serif;
      background-color: #f8fafc;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      padding: 30px 20px;
      text-align: center;
    }
    .content {
      padding: 30px 20px;
    }
    .info-row {
      display: flex;
      margin-bottom: 15px;
      padding: 10px 0;
      border-bottom: 1px solid #e5e7eb;
    }
    .info-label {
      font-weight: bold;
      color: #374151;
      width: 120px;
      flex-shrink: 0;
    }
    .info-value {
      color: #6b7280;
      flex: 1;
    }
    .highlight {
      background-color: #fef3c7;
      padding: 15px;
      border-radius: 6px;
      border-left: 4px solid #f59e0b;
      margin: 20px 0;
    }
    .footer {
      background-color: #f9fafb;
      padding: 20px;
      text-align: center;
      color: #6b7280;
      font-size: 12px;
    }
    .btn {
      display: inline-block;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 6px;
      font-weight: bold;
      margin: 20px 0;
    }
  </style>
 </head>
 <body>
  <div class="container">
    <div class="header">
      <h2 style="margin:0;font-size:24px;">🚨 Đăng ký tư vấn tiểu đường thai kỳ mới!</h2>
      <p style="margin:10px 0 0 0;opacity:0.9;">Có bệnh nhân mới vừa đăng ký tư vấn với Ekip Giang Nội Tiết</p>
    </div>
    
    <div class="content">
      <div class="highlight">
        <strong>⏰ Thời gian đăng ký:</strong> ${new Date(registeredAt).toLocaleString('vi-VN')}
      </div>
      
      <h3 style="color:#374151;margin-bottom:20px;">📋 Thông tin bệnh nhân:</h3>
      
      <div class="info-row">
        <div class="info-label">👤 Họ tên:</div>
        <div class="info-value"><strong>${name}</strong></div>
      </div>
      
      <div class="info-row">
        <div class="info-label">🎂 Tuổi:</div>
        <div class="info-value">${age} tuổi</div>
      </div>
      
      <div class="info-row">
        <div class="info-label">📞 Điện thoại:</div>
        <div class="info-value"><a href="tel:${phone}" style="color:#2563eb;text-decoration:none;font-weight:bold;">${phone}</a></div>
      </div>
      
      ${email ? `<div class="info-row">
        <div class="info-label">📧 Email:</div>
        <div class="info-value"><a href="mailto:${email}" style="color:#2563eb;text-decoration:none;">${email}</a></div>
      </div>` : ''}
      
      <div class="info-row">
        <div class="info-label">🎯 Mục đích tư vấn:</div>
        <div class="info-value">${purpose}</div>
      </div>
      
      ${courseSlug ? `<div class="info-row">
        <div class="info-label">📚 Nguồn đăng ký:</div>
        <div class="info-value">
          <a href="https://btacademy.vn/khoa-hoc/${courseSlug}" style="color:#10b981;text-decoration:none;" target="_blank">
            Xem chi tiết khóa học →
          </a>
        </div>
      </div>` : ''}
      
      <h3 style="color:#374151;margin:30px 0 15px 0;">🌐 Thông tin kỹ thuật:</h3>
      
      <div class="info-row">
        <div class="info-label">🌍 IP Address:</div>
        <div class="info-value">${ipAddress || 'Không xác định'}</div>
      </div>
      
      <div class="info-row">
        <div class="info-label">💻 User Agent:</div>
        <div class="info-value" style="font-size:11px;word-break:break-all;">${userAgent || 'Không xác định'}</div>
      </div>
      
      
      <div class="highlight" style="background-color:#dcfce7;border-left-color:#22c55e;">
        <strong>💡 Hành động tiếp theo:</strong>
        <ul style="margin:10px 0 0 0;padding-left:20px;">
          <li>Liên hệ với bệnh nhân trong vòng 24h</li>
          <li>Tư vấn chi tiết về tiểu đường thai kỳ</li>
          <li>Hướng dẫn chế độ ăn uống và sinh hoạt</li>
          <li>Lên lịch tái khám và theo dõi</li>
          <li>Mời tham gia nhóm Zalo để hỗ trợ</li>
        </ul>
      </div>
    </div>
    
    <div class="footer">
      <p style="margin:0;">
        Email tự động từ hệ thống tư vấn Ekip Giang Nội Tiết<br>
        Thời gian gửi: ${new Date().toLocaleString('vi-VN')}
      </p>
    </div>
  </div>
 </body>
</html>`;
};
