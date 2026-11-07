---
title: "Tổng quan dự án"
---

# Tổng quan dự án

<div class="article-intro">

ChurchApps gồm khoảng 20 kho mã nguồn độc lập, mỗi kho được xuất bản dưới [tổ chức GitHub ChurchApps](https://github.com/ChurchApps). Trang này cung cấp danh mục đầy đủ của tất cả dự án được sắp xếp theo loại, cùng với các framework, cổng và mối quan hệ của chúng.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Cài đặt [các yêu cầu tiên quyết](./prerequisites) cho loại dự án bạn muốn làm việc

</div>

## API phía máy chủ

Tất cả API được xây dựng bằng Node.js, Express và TypeScript, và được triển khai lên AWS Lambda thông qua Serverless Framework.

| Dự án | Mục đích | Cổng phát triển | Cơ sở dữ liệu |
|---------|---------|----------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | Khối nguyên khối (monolith) mô-đun cốt lõi, bao gồm thành viên, điểm danh, nội dung, quyên góp, nhắn tin và công việc | 8084 | Cơ sở dữ liệu MySQL riêng cho mỗi mô-đun (tổng cộng 6) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Backend của Lessons.church | -- | Một cơ sở dữ liệu MySQL `lessons` |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | Công cụ truy vấn AI, được hỗ trợ bởi OpenAI | -- | -- |

:::info
Dự án **Api** cốt lõi là một khối nguyên khối mô-đun. Mỗi mô-đun (thành viên, điểm danh, nội dung, quyên góp, nhắn tin, công việc) có cơ sở dữ liệu riêng và có thể truy cập qua một đường dẫn con như `/membership` hoặc `/giving`. Trên môi trường production, các mô-đun này được cung cấp dưới dạng các hàm Lambda riêng biệt phía sau API Gateway.
:::

## Ứng dụng web

| Dự án | Framework | Cổng phát triển | Mục đích |
|---------|-----------|----------|---------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | Bảng điều khiển quản trị nhà thờ |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Ứng dụng thành viên nhà thờ dành cho công chúng |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Giao diện người dùng của Lessons.church |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Tiện ích nhập/xuất dữ liệu |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Tĩnh | -- | Các trang web giới thiệu nhà thờ dạng tĩnh |

## Ứng dụng di động

Tất cả ứng dụng di động đều sử dụng React Native với Expo.

| Dự án | Mục đích | Phiên bản chính |
|---------|---------|--------------|
| **[B1Mobile](https://github.com/ChurchApps/B1Mobile)** | Ứng dụng thành viên nhà thờ cho iOS và Android | Expo 54, React Native 0.81 |
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Ứng dụng kiosk điểm danh | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Màn hình hiển thị bài học trên Android TV | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Phát nội dung (bao gồm trên hệ điều hành TV) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Điều khiển từ xa trên thiết bị di động cho FreeShow | Expo |

## Máy tính để bàn

| Dự án | Ngăn xếp | Mục đích |
|---------|-------|---------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Phần mềm trình chiếu và thờ phượng |

## Thư viện dùng chung

Mã dùng chung được xuất bản lên npm dưới phạm vi `@churchapps` và được các dự án trên sử dụng như các phụ thuộc npm thông thường. Tất cả gói dùng chung nằm trong một kho duy nhất -- [Packages](https://github.com/ChurchApps/Packages) -- được quản lý dưới dạng Yarn workspace và phát hành bằng changesets.

| Gói | Mục đích | Được sử dụng bởi |
|---------|---------|----------|
| `@churchapps/helpers` | Các tiện ích cơ bản và giao diện TypeScript dùng chung (DateHelper, ApiHelper, CurrencyHelper, v.v.) | Tất cả dự án |
| `@churchapps/apihelper` | Tiện ích máy chủ Express (xác thực, controller cơ sở, truy cập cơ sở dữ liệu, tích hợp AWS) | Tất cả API |
| `@churchapps/apphelper` | Thư viện component React với các mô-đun con cho đăng nhập, quyên góp, biểu mẫu, markdown và xây dựng trang web | Tất cả ứng dụng web |
| `@churchapps/content-providers` | Lớp trừu tượng cho nhà cung cấp nội dung bên thứ ba (Lessons.church, Planning Center, Dropbox, và các nhà cung cấp khác) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Bộ công cụ tích hợp B1.church: webhook, REST client, OAuth | Nhà phát triển tích hợp bên ngoài |
| `@churchapps/texting` | Lớp trừu tượng cho nhà cung cấp SMS | Api |

Xem [Thư viện dùng chung](../shared-libraries/) để biết cách thiết lập workspace và quy trình phát hành.

## Mối quan hệ giữa các dự án

```
Ứng dụng giao diện        Thư viện dùng chung        API phía máy chủ
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
B1Mobile     ──────┤                                   AskApi
FreeShow     ──────┘       @churchapps/apihelper ◄────┘
```

Tất cả ứng dụng giao diện phụ thuộc vào `@churchapps/helpers`. Ứng dụng web còn phụ thuộc thêm vào các gói `@churchapps/apphelper`. Tất cả API phía máy chủ phụ thuộc vào cả `@churchapps/helpers` và `@churchapps/apihelper`.

## Bước tiếp theo

- **[Biến môi trường](./environment-variables)** -- Cấu hình các tệp `.env` để kết nối với API
- **[Thiết lập API cục bộ](../api/local-setup)** -- Thiết lập API phía máy chủ trên máy cục bộ
