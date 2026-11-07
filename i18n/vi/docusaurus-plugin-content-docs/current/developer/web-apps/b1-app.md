---
title: "B1App"
description: "Thiết lập ứng dụng web thành viên B1App cục bộ với Next.js 22+, cấu hình endpoint API trong .env và chạy máy chủ phát triển ở cổng 3301."
---

# B1App

<div class="article-intro">

B1App là ứng dụng dành cho thành viên hội thánh, được xây dựng bằng Next.js và hướng đến người dùng bên ngoài. Ứng dụng cung cấp trải nghiệm cho thành viên, bao gồm hồ sơ cá nhân, danh bạ nhóm, phát trực tiếp và trang quyên góp.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Cài đặt **Node.js 22+** và **Git** -- xem [Điều kiện tiên quyết](../setup/prerequisites.md)
- Cấu hình đích API (bản demo hoặc cục bộ) -- xem [Biến môi trường](../setup/environment-variables.md)

</div>

:::warning
B1App yêu cầu Node.js 22 trở lên. Các phiên bản cũ hơn không được hỗ trợ.
:::

## Thiết lập

### 1. Sao chép kho mã nguồn

```bash
git clone https://github.com/ChurchApps/B1App.git
```

### 2. Cài đặt các gói phụ thuộc

```bash
cd B1App
npm install
```

### 3. Cấu hình biến môi trường

```bash
cp dotenv.sample.txt .env
```

Mở `.env` và cấu hình các URL endpoint `NEXT_PUBLIC_*_API`. Các URL này có thể trỏ đến API demo dùng chung (`https://api.demo.churchapps.org`) hoặc đến phiên bản API cục bộ của bạn. Tệp mẫu vẫn có thể liệt kê các URL staging đã ngừng hoạt động; hãy thay thế chúng.

### 4. Khởi động máy chủ phát triển

```bash
npm run dev
```

Máy chủ phát triển Next.js sẽ chạy tại [http://localhost:3301](http://localhost:3301).

## Lệnh chính

| Lệnh | Mô tả |
|---------|-------------|
| `npm run dev` | Khởi động máy chủ phát triển Next.js trên cổng 3301 |
| `npm run build` | Build production qua Next.js |
| `npm run test` | Chạy kiểm thử đầu cuối với Playwright |
| `npm run lint` | Chạy lint của Next.js |

## Biến môi trường chính

| Biến | Mô tả |
|----------|-------------|
| `NEXT_PUBLIC_*_API` | Các URL endpoint API cho từng module |

:::info
Script `postinstall` sao chép các tệp locale và CSS từ `@churchapps/apphelper`. Nếu các thành phần hiển thị không có kiểu sau khi cài đặt, hãy chạy `npm run postinstall` thủ công.
:::

## Ngăn xếp công nghệ

- **Next.js 16** với TypeScript
- **React 19** cho các thành phần giao diện
- **Material-UI 7** cho hệ thống thiết kế
- **React Query 5** cho trạng thái phía máy chủ
- **`@churchapps/apphelper*`** các gói dùng chung cho thành phần

## Triển khai

Các bản build production được triển khai lên **S3 + CloudFront**:

1. `npm run build` tạo bản build Next.js đã tối ưu
2. Đầu ra của bản build được đồng bộ lên một bucket S3
3. Việc vô hiệu hóa CloudFront được kích hoạt để phục vụ phiên bản mới

:::tip
Để xem hướng dẫn triển khai chi tiết, hãy xem hướng dẫn [Triển khai ứng dụng web](../deployment/web-apps.md).
:::
