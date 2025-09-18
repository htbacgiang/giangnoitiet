# CSS System - Đơn giản và Gọn gàng

Hệ thống CSS được thiết kế đơn giản, gọn gàng và đẹp mắt cho website Giang Nội Tiết.

## 📁 Cấu trúc Files

- **`about-animations.css`** - Animations và effects cho trang giới thiệu
- **`simple-layout.css`** - Layout cơ bản và utilities
- **`components.css`** - Styles cho các components cụ thể

## 🎨 Bảng màu chính

```css
/* Màu chính */
--primary: #10b981     /* Emerald 500 */
--primary-dark: #059669 /* Emerald 600 */
--primary-darker: #047857 /* Emerald 700 */

/* Màu phụ */
--gray-50: #f9fafb
--gray-100: #f3f4f6
--gray-600: #6b7280
--gray-800: #1f2937
```

## 🧩 Components

### Hero Section
```html
<div class="hero">
  <img class="hero-bg" src="image.jpg" alt="Background">
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <h1 class="hero-title">Tiêu đề</h1>
    <p class="hero-subtitle">Mô tả</p>
    <div class="hero-cta">
      <a href="#" class="btn btn-primary">Call to Action</a>
    </div>
  </div>
</div>
```

### Feature Cards
```html
<div class="feature-card">
  <div class="feature-icon">🌟</div>
  <h3 class="feature-title">Tiêu đề Feature</h3>
  <p class="feature-description">Mô tả chi tiết...</p>
</div>
```

### Buttons
```html
<!-- Button chính -->
<button class="btn btn-primary">Primary Button</button>

<!-- Button phụ -->
<button class="btn btn-secondary">Secondary Button</button>
```

### Cards
```html
<div class="card">
  <h3>Tiêu đề Card</h3>
  <p>Nội dung card...</p>
</div>

<!-- Card lớn -->
<div class="card card-lg">
  <h3>Card lớn</h3>
  <p>Nội dung...</p>
</div>
```

## 📱 Responsive Classes

### Grid System
```html
<!-- Grid 2 cột -->
<div class="grid grid-2">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- Grid 3 cột -->
<div class="grid grid-3">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Layout Utilities
```html
<!-- Container -->
<div class="container">Nội dung</div>

<!-- Section spacing -->
<section class="section">Nội dung section</section>
<section class="section-sm">Section nhỏ</section>

<!-- Flex utilities -->
<div class="flex-center">Center content</div>
<div class="flex-between">Space between</div>
```

## ✨ Animations

### Basic Animations
```html
<!-- Fade in -->
<div class="animate-fade-in">Nội dung fade in</div>

<!-- Slide từ phải -->
<div class="animate-slide-in-from-right">Slide từ phải</div>

<!-- Slide từ trái -->
<div class="animate-slide-in-from-left">Slide từ trái</div>

<!-- Float effect -->
<div class="animate-float">Floating element</div>

<!-- Glow effect -->
<div class="animate-glow">Glowing element</div>
```

### Hover Effects
```html
<!-- Card hover -->
<div class="card card-hover">Card với hover effect</div>
```

## 📏 Spacing Utilities

### Margin
```html
<div class="mt-4">Margin top 1rem</div>
<div class="mb-6">Margin bottom 1.5rem</div>
<div class="mt-8">Margin top 2rem</div>
```

### Padding
```html
<div class="p-4">Padding 1rem</div>
<div class="p-6">Padding 1.5rem</div>
<div class="p-8">Padding 2rem</div>
```

## 🎯 Typography

### Headings
```html
<h1>Heading 1 - 2.5rem</h1>
<h2>Heading 2 - 2rem</h2>
<h3>Heading 3 - 1.5rem</h3>
```

### Text Utilities
```html
<p class="text-primary">Text màu primary</p>
<p class="text-muted">Text màu muted</p>
<p class="text-lg">Text lớn</p>
<p class="font-semibold">Text đậm</p>
```

## 🚨 Alert Boxes

```html
<!-- Success -->
<div class="alert alert-success">
  <p>Thông báo thành công!</p>
</div>

<!-- Warning -->
<div class="alert alert-warning">
  <p>Cảnh báo!</p>
</div>

<!-- Error -->
<div class="alert alert-error">
  <p>Lỗi xảy ra!</p>
</div>

<!-- Info -->
<div class="alert alert-info">
  <p>Thông tin hữu ích</p>
</div>
```

## 📊 Stats Section

```html
<div class="stats-grid">
  <div class="stat-item">
    <span class="stat-number">100+</span>
    <span class="stat-label">Khách hàng</span>
  </div>
  <div class="stat-item">
    <span class="stat-number">5</span>
    <span class="stat-label">Năm kinh nghiệm</span>
  </div>
</div>
```

## 🎨 Best Practices

1. **Sử dụng container**: Luôn wrap content trong `.container` để có max-width nhất quán
2. **Mobile-first**: CSS được thiết kế mobile-first, desktop sẽ override
3. **Semantic HTML**: Sử dụng HTML semantic kết hợp với CSS classes
4. **Performance**: Tất cả animations có thể tắt với `prefers-reduced-motion`
5. **Accessibility**: Focus states và screen reader support được tích hợp

## 📱 Responsive Breakpoints

- **Mobile**: < 480px
- **Tablet**: 481px - 768px  
- **Desktop**: > 768px

## 🎭 Dark Mode

CSS hỗ trợ dark mode tự động dựa trên system preference:

```css
@media (prefers-color-scheme: dark) {
  /* Dark mode styles */
}
```

## 🚀 Performance

- Sử dụng `will-change` cho elements có animation
- CSS được tối ưu cho performance
- Animations nhẹ và mượt mà
- Tự động disable animations cho users có `prefers-reduced-motion`
