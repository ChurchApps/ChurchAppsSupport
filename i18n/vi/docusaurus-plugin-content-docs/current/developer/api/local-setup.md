---
title: "Thiết lập API cục bộ"
---

# Thiết lập API cục bộ

<div class="article-intro">

Hướng dẫn này sẽ giúp bạn thiết lập API ChurchApps để phát triển cục bộ. Bạn sẽ sao chép kho mã nguồn, cấu hình kết nối cơ sở dữ liệu, khởi tạo lược đồ và chạy máy chủ phát triển với tính năng tự động tải lại.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Cài đặt **Node.js 24+**, **Git** và **MySQL 8.0+** -- xem [Điều kiện tiên quyết](../setup/prerequisites)
- Tạo một người dùng MySQL có quyền tạo cơ sở dữ liệu
- Xem tài liệu [Biến môi trường](../setup/environment-variables) về cấu hình API

</div>

## Các bước thiết lập

### 1. Sao chép kho mã nguồn

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. Cài đặt các phụ thuộc

Dự án sử dụng Yarn (một cơ chế bảo vệ sẽ chặn `npm install`):

```bash
cd Api
yarn install
```

### 3. Cấu hình biến môi trường

```bash
cp .env.sample .env
```

Mở `.env` và cấu hình chuỗi kết nối MySQL. Mỗi mô-đun cần có kết nối cơ sở dữ liệu riêng theo định dạng sau:

```
mysql://root:password@localhost:3306/dbname
```

Bạn sẽ cần chuỗi kết nối cho cả sáu cơ sở dữ liệu của mô-đun (membership, attendance, content, giving, messaging, doing).

### 4. Khởi tạo cơ sở dữ liệu

```bash
npm run initdb
```

Lệnh này sẽ tự động tạo cả sáu cơ sở dữ liệu cùng với các bảng của chúng.

:::tip
Bạn có thể khởi tạo cơ sở dữ liệu cho một mô-đun riêng lẻ bằng lệnh `npm run initdb -- --module=membership` (hoặc `attendance`, `content`, `giving`, `messaging`, `doing`).
:::

### 5. Khởi động máy chủ phát triển

```bash
npm run dev
```

API sẽ khởi động với tính năng tự động tải lại tại [http://localhost:8084](http://localhost:8084).

## Các lệnh chính

| Lệnh | Mô tả |
|------|-------|
| `npm run dev` | Khởi động máy chủ phát triển với tính năng tự động tải lại (tsx watch) |
| `npm run build` | Dọn dẹp, biên dịch TypeScript và sao chép tài nguyên |
| `npm run test` | Chạy kiểm thử với Jest (bao gồm báo cáo độ phủ) |
| `npm run test:watch` | Chạy kiểm thử ở chế độ theo dõi |
| `npm run lint` | Chạy ESLint với tự động sửa lỗi (ESLint là công cụ định dạng duy nhất) |

## Triển khai

Môi trường staging đã được gỡ bỏ. API được triển khai lên môi trường demo mỗi khi có push lên `main`, và lên môi trường production thông qua quy trình thủ công **Deploy Prod**, quy trình này cũng áp dụng các bản di chuyển cơ sở dữ liệu đang chờ xử lý. Xem [Triển khai API](../deployment/apis) để biết chi tiết.

## Phát triển thư viện cục bộ

Nếu bạn cần phát triển một thư viện dùng chung (`@churchapps/helpers` hoặc `@churchapps/apihelper`) cùng với API, hãy build thư viện đó trong không gian làm việc [Packages](https://github.com/ChurchApps/Packages) và thêm một Yarn portal tạm thời vào API:

```bash
# Trong không gian làm việc Packages
yarn build

# Trong thư mục API
yarn link ../Packages/helpers
# ... kiểm thử ...
yarn unlink ../Packages/helpers && yarn install
```

Cách này cho phép bạn kiểm thử các thay đổi của thư viện với API mà không cần publish lên npm. Xem [Thư viện dùng chung](../shared-libraries/#local-development-against-a-consuming-app) để biết chi tiết -- và tuyệt đối không commit phần resolution portal mà lệnh link ghi vào `package.json`.

## Bài viết liên quan

- **[Cơ sở dữ liệu](./database)** -- Tìm hiểu kiến trúc mỗi mô-đun một cơ sở dữ liệu
- **[Cấu trúc mô-đun](./module-structure)** -- Cách tổ chức controller, repository và model
- **[Thư viện dùng chung](../shared-libraries/)** -- Làm việc với `@churchapps/helpers` và `@churchapps/apihelper`
