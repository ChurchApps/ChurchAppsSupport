---
title: "B1 Admin"
description: "Thiết lập B1 Admin cục bộ: clone bảng điều khiển React/Vite, cấu hình endpoint API trong .env và khởi động máy chủ phát triển để quản lý nhà thờ."
---

# B1 Admin

<div class="article-intro">

B1Admin là bảng điều khiển quản trị nhà thờ, một ứng dụng đơn trang (single-page application) React được xây dựng bằng Vite và Material-UI. Nhân viên nhà thờ sử dụng ứng dụng này để quản lý người, nhóm, điểm danh, quyên góp, nội dung và nhiều thứ khác.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Cài đặt **Node.js 22+** và **Git** -- xem [Yêu cầu tiên quyết](../setup/prerequisites.md)
- Cấu hình mục tiêu API (demo hoặc cục bộ) -- xem [Biến môi trường](../setup/environment-variables.md)

</div>

## Thiết lập

### 1. Sao chép kho lưu trữ

```bash
git clone https://github.com/ChurchApps/B1Admin.git
```

### 2. Cài đặt các phụ thuộc

```bash
cd B1Admin
npm install
```

### 3. Cấu hình biến môi trường

```bash
cp dotenv.sample.txt .env
```

Mở `.env` và cấu hình các điểm cuối API. Bạn có thể trỏ chúng đến API demo dùng chung (`https://api.demo.churchapps.org`) hoặc phiên bản API cục bộ của bạn. Tệp mẫu có thể vẫn liệt kê các URL staging đã ngừng sử dụng; hãy thay thế chúng.

### 4. Khởi động máy chủ phát triển

```bash
npm start
```

Lệnh này khởi chạy máy chủ phát triển Vite. Ứng dụng sẽ khả dụng trong trình duyệt của bạn với tính năng hot module replacement được bật.

## Biến môi trường chính

| Biến | Mô tả |
|----------|-------------|
| `REACT_APP_STAGE` | Tên môi trường (ví dụ: `demo` như trong tệp mẫu, `prod`, hoặc `selfhost`) |
| `PORT` | Cổng máy chủ phát triển (mặc định: `3101`) |
| `REACT_APP_*_API` | Các URL điểm cuối API cho từng mô-đun |

:::info
Script `postinstall` sao chép các tệp ngôn ngữ và CSS từ `@churchapps/apphelper`. Nếu các thành phần hiển thị không có định dạng, hãy chạy `npm run postinstall` thủ công.
:::

## Lệnh chính

| Lệnh | Mô tả |
|---------|-------------|
| `npm start` | Khởi động máy chủ phát triển Vite |
| `npm run build` | Build production qua Vite |
| `npm run test` | Chạy kiểm thử end-to-end với Playwright |
| `npm run lint` | Chạy ESLint và tự động sửa lỗi |

## Công nghệ sử dụng

- **React 19** với TypeScript
- **Vite** cho công cụ build và máy chủ phát triển
- **Material-UI 7** cho các thành phần giao diện
- **React Query 5** cho trạng thái phía máy chủ
- **`@churchapps/apphelper*`** các gói dùng chung cho thành phần

## Triển khai

Các bản build production được triển khai lên **S3 + CloudFront**:

1. `npm run build` tạo ra các tài nguyên tĩnh
2. Các tài nguyên được đồng bộ lên bucket S3
3. Việc invalidation CloudFront được kích hoạt để phân phối phiên bản mới

:::tip
Để xem hướng dẫn triển khai chi tiết, hãy xem hướng dẫn [Triển khai ứng dụng web](../deployment/web-apps.md).
:::
