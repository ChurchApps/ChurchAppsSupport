---
title: "LessonsApp"
description: "Thiết lập trình soạn bài học LessonsApp (Next.js) cục bộ với Node.js 22+, trỏ tới LessonsApi cục bộ, và tìm hiểu build cùng triển khai S3/CloudFront."
---

# LessonsApp

<div class="article-intro">

LessonsApp là ứng dụng quản lý nội dung bài học cho [Lessons.church](https://lessons.church). Ứng dụng cung cấp giao diện để tạo, sắp xếp và xuất bản chương trình bài học của hội thánh, được xây dựng bằng Next.js và React.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Cài đặt **Node.js 22+** và **Git** -- xem [Yêu cầu tiên quyết](../setup/prerequisites.md)
- Cấu hình đích API của bạn (LessonsApi cục bộ) -- xem [Biến môi trường](../setup/environment-variables.md)

</div>

:::warning
LessonsApp yêu cầu Node.js 22 trở lên. Các phiên bản cũ hơn không được hỗ trợ.
:::

## Thiết lập

### 1. Sao chép kho mã nguồn

```bash
git clone https://github.com/ChurchApps/LessonsApp.git
```

### 2. Cài đặt các gói phụ thuộc

```bash
cd LessonsApp
npm install
```

### 3. Cấu hình biến môi trường

Sao chép tệp mẫu môi trường sang `.env` và cấu hình các endpoint API:

```bash
cp dotenv.sample.txt .env
```

Cập nhật các URL endpoint API để trỏ đến phiên bản LessonsApi cục bộ của bạn (`http://localhost:8090`). API Lessons staging đã ngừng hoạt động, vì vậy hãy thay thế mọi URL `api.staging.lessons.church` còn sót lại trong tệp mẫu.

### 4. Khởi động máy chủ phát triển

```bash
npm run dev
```

Máy chủ phát triển Next.js sẽ khởi chạy tại [http://localhost:3501](http://localhost:3501).

## Lệnh chính

| Lệnh | Mô tả |
|---------|-------------|
| `npm run dev` | Khởi động máy chủ phát triển Next.js trên cổng 3501 |
| `npm run build` | Build production qua Next.js |

## Ngăn xếp công nghệ

- **Next.js 16** với TypeScript
- **React 19** cho các thành phần giao diện
- Các gói **`@churchapps/apphelper*`** cho các thành phần dùng chung

:::info
LessonsApp giao tiếp với backend **LessonsApi**, một API riêng biệt so với ChurchApps Api chính. Hãy đảm bảo môi trường của bạn được cấu hình với đúng endpoint Lessons API.
:::

## Triển khai

Các bản build production được triển khai lên **S3 + CloudFront**:

1. `npm run build` tạo bản build Next.js đã tối ưu
2. Đầu ra build được đồng bộ lên một bucket S3
3. Kích hoạt invalidation CloudFront để phục vụ phiên bản mới

:::tip
Để xem hướng dẫn triển khai chi tiết, hãy xem hướng dẫn [Triển khai ứng dụng web](../deployment/web-apps.md).
:::
