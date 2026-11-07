---
title: "Ứng dụng web"
description: "Tổng quan ba ứng dụng web ChurchApps (B1 Admin, B1.church, Lessons.church), ngăn xếp React và MUI dùng chung, gói apphelper và công cụ build."
---

# Ứng dụng web

<div class="article-intro">

ChurchApps bao gồm ba ứng dụng web, mỗi ứng dụng phục vụ một đối tượng và mục đích khác nhau. Chúng dùng chung nền tảng công nghệ gồm React 19, TypeScript và Material-UI 7, nhưng khác nhau về công cụ build và nơi triển khai.

</div>

## Tổng quan các ứng dụng

| Ứng dụng | Mục đích | Framework | Cổng phát triển |
|-----|---------|-----------|----------|
| [**B1Admin**](./b1-admin.md) | Bảng điều khiển quản trị nhà thờ | React 19 + Vite + MUI 7 | 5173 |
| [**B1App**](./b1-app.md) | Ứng dụng công khai dành cho thành viên nhà thờ | Next.js 16 + React 19 + MUI 7 | 3301 |
| [**LessonsApp**](./lessons-app.md) | Quản lý nội dung bài học | Next.js 16 + React 19 | 3501 |

## Ngăn xếp công nghệ dùng chung

Cả ba ứng dụng web đều được xây dựng với:

- **TypeScript** -- An toàn kiểu dữ liệu xuyên suốt từ đầu đến cuối
- **React 19** -- Thư viện component giao diện người dùng
- **Material-UI 7** -- Hệ thống thiết kế và bộ công cụ component
- **React Query 5** -- Quản lý trạng thái dữ liệu từ máy chủ

## Thành phần dùng chung

Các ứng dụng chia sẻ component giao diện và tiện ích thông qua họ gói `@churchapps/apphelper*`:

| Gói | Mục đích |
|---------|---------|
| `@churchapps/apphelper` | Các component React dùng chung cốt lõi |
| `@churchapps/apphelper-login` | Các component giao diện xác thực |
| `@churchapps/apphelper-donations` | Biểu mẫu quyên góp và dâng hiến |
| `@churchapps/apphelper-forms` | Các component trình tạo biểu mẫu |
| `@churchapps/apphelper-markdown` | Hiển thị Markdown |
| `@churchapps/apphelper-website` | Các component website/CMS |

:::tip
Để biết chi tiết về cách phát triển các gói dùng chung này trên máy cục bộ, xem tài liệu [AppHelper](../shared-libraries/app-helper.md).
:::

## Script postinstall

Mỗi ứng dụng web có một script `postinstall` sao chép các tệp ngôn ngữ và tệp CSS từ `@churchapps/apphelper` vào dự án. Script này tự động chạy sau khi bạn chạy `npm install`.

:::info
Nếu các component hiển thị không có kiểu dáng sau khi cài đặt các phụ thuộc, script `postinstall` có thể đã không chạy đúng. Bạn có thể chạy thủ công bằng lệnh `npm run postinstall`.
:::

## Công cụ build

Các ứng dụng sử dụng hai công cụ build khác nhau:

- **B1Admin** sử dụng **Vite** -- một bộ đóng gói hiện đại, nhanh, phù hợp với các ứng dụng một trang (single-page)
- **B1App** và **LessonsApp** sử dụng **Next.js** -- cung cấp render phía máy chủ, định tuyến dựa trên tệp và các bản build production được tối ưu hóa
