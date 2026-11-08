---
title: "Tài liệu dành cho nhà phát triển"
description: "Tìm hiểu các tài liệu dành cho nhà phát triển ChurchApps: thiết lập môi trường cục bộ, hướng dẫn API và ứng dụng web, thư viện dùng chung, bản dựng di động và triển khai cho các dự án mã nguồn mở."
---

# Tài liệu dành cho nhà phát triển

<div class="article-intro">

ChurchApps là tập hợp khoảng 20 dự án mã nguồn mở, cùng nhau cung cấp một nền tảng quản lý nhà thờ hoàn chỉnh. Các dự án bao gồm API phía máy chủ, ứng dụng web, ứng dụng di động, ứng dụng máy tính để bàn và các thư viện dùng chung -- tất cả đều được viết bằng TypeScript. Mục này cung cấp mọi thông tin bạn cần để thiết lập môi trường phát triển cục bộ và bắt đầu đóng góp.

</div>

## Tổng quan về kiến trúc

Các dự án là **kho mã độc lập** (không phải monorepo). Mã dùng chung được xuất bản lên npm dưới phạm vi `@churchapps/*` và được sử dụng như các phụ thuộc thông thường. Điều này có nghĩa là bạn có thể làm việc trên một dự án duy nhất mà không cần sao chép toàn bộ hệ sinh thái.

Các đặc điểm chính:

- **Ngôn ngữ:** TypeScript xuyên suốt dự án
- **Backend:** API Node.js / Express được triển khai lên AWS Lambda thông qua Serverless Framework
- **Web:** React 19 (Vite và Next.js), Material-UI 7
- **Di động:** React Native với Expo
- **Cơ sở dữ liệu:** MySQL 8.0, mỗi module API có một cơ sở dữ liệu riêng

## Nội dung của mục này

- **[Thiết lập](./setup/index.md)** -- Môi trường phát triển cục bộ, các yêu cầu tiên quyết và cấu hình
  - [Yêu cầu tiên quyết](./setup/prerequisites.md) -- Các công cụ và phần mềm cần thiết
  - [Tổng quan dự án](./setup/project-overview.md) -- Tất cả các dự án trong một cái nhìn
  - [Biến môi trường](./setup/environment-variables.md) -- Cấu hình các tệp `.env`
- **[API](./api/index.md)** -- Thiết lập API cốt lõi cục bộ, khởi tạo cơ sở dữ liệu và cấu trúc module
- **[Ứng dụng web](./web-apps/index.md)** -- Chạy B1Admin, B1App và LessonsApp cục bộ
- **[Ứng dụng di động](./mobile/index.md)** -- Xây dựng B1Checkin và các ứng dụng Expo khác
- **[Thư viện dùng chung](./shared-libraries/index.md)** -- Làm việc với Helpers, ApiHelper và AppHelper
- **[Triển khai](./deployment/index.md)** -- Triển khai API, ứng dụng web và ứng dụng di động
- **[Nhà cung cấp nội dung FreePlay](./freeplay-content-provider.md)** -- Tích hợp thư viện bài học của bạn với FreePlay

## Cộng đồng và tài nguyên

| Tài nguyên | Liên kết |
|----------|------|
| Tổ chức GitHub | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Theo dõi lỗi | [ChurchAppsSupport Issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Cộng đồng Slack | [Tham gia Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
Cách nhanh nhất để bắt đầu đóng góp là chọn một ứng dụng web (chẳng hạn B1Admin), trỏ nó đến các **API demo** dùng chung và bắt đầu thực hiện các thay đổi phía giao diện. Không cần thiết lập cơ sở dữ liệu hay API.
:::
