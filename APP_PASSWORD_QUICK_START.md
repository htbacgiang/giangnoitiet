# 🚀 Quick Start - Gmail App Password

## Cấu hình trong 3 bước (5 phút)

### Bước 1: Tạo App Password
1. Vào [Google Account Security](https://myaccount.google.com/security)
2. Bật **2-Step Verification** (nếu chưa có)
3. Tạo **App Password**:
   - Select app: **Mail**
   - Select device: **Other (Custom name)**
   - Name: **BT Academy Email**
   - Copy **16-character password**

### Bước 2: Cấu hình dự án
Tạo file `.env.local`:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
ADMIN_EMAIL=admin@btacademy.com
```

### Bước 3: Test
```bash
# Test App Password
npm run email-test-app your-email@example.com

# Test hệ thống email đầy đủ
npm run email-test your-email@example.com
```

## ✅ Hoàn thành!

Nếu test thành công, bạn có thể sử dụng:
- ✅ Email lịch học hàng ngày
- ✅ Email xác nhận đăng ký
- ✅ Email reset mật khẩu
- ✅ Email thông báo admin

## 🔧 Troubleshooting

**Lỗi "Invalid credentials"**
- Kiểm tra App Password (16 ký tự, không có dấu cách)
- Đảm bảo 2-Step Verification đã bật

**Lỗi "Access denied"**
- Tạo lại App Password
- Kiểm tra tài khoản Gmail không bị khóa

## 📖 Tài liệu chi tiết
- [APP_PASSWORD_SETUP.md](./APP_PASSWORD_SETUP.md) - Hướng dẫn chi tiết
- [GOOGLE_SMTP_SETUP.md](./GOOGLE_SMTP_SETUP.md) - Tổng quan

