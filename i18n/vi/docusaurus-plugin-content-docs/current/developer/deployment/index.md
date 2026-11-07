---
title: "Triển khai"
description: "Tìm nơi triển khai từng dự án ChurchApps, từ API AWS Lambda và web S3 đến bản build di động Expo và B1 Admin tự host trên Railway hoặc Docker."
---

# Triển khai

<div class="article-intro">

ChurchApps sử dụng các chiến lược triển khai khác nhau tùy theo loại dự án. API được triển khai lên AWS Lambda, ứng dụng web được triển khai dưới dạng trang tĩnh lên S3 với CloudFront, còn ứng dụng di động được xây dựng và phân phối qua Expo EAS và các cửa hàng ứng dụng.

</div>

## Triển khai theo loại dự án

| Loại dự án | Đích triển khai | Công cụ |
|-------------|-------------------|---------|
| [API](./apis.md) | AWS Lambda | Serverless Framework v3 (runtime Node.js 24.x) |
| [Ứng dụng web](./web-apps.md) | S3 + CloudFront | Build tĩnh, đồng bộ S3, làm mới bộ nhớ đệm CloudFront |
| [Ứng dụng di động](./mobile.md) | Cửa hàng ứng dụng | Expo EAS Build + OTA Updates |
| [Tự lưu trữ (Railway)](./railway-template.md) | Railway | Mẫu một cú nhấp: MySQL + Api + B1Admin + B1App |
| [Tự lưu trữ (Docker)](./docker.md) | Bất kỳ máy chủ Docker nào | Trình cài đặt một dòng; image GHCR dựng sẵn + Caddy, `./deploy/b1` để nâng cấp/sao lưu/khôi phục |
| [Proxy tên miền tùy chỉnh Caddy](./caddy-proxy.md) | EC2 Windows (Elastic IP `3.23.251.61`) | Caddyfile tĩnh + dịch vụ WinSW + đồng bộ bản đồ theo lịch |
| FreeShow | Tải xuống trực tiếp | Electron Builder (tệp nhị phân đa nền tảng) |

## Môi trường

| Môi trường | Mục đích |
|-------------|---------|
| `dev` | Phát triển cục bộ |
| `demo` | Phiên bản demo công khai; được triển khai sau mỗi lần push lên `main`, nên cũng đóng vai trò kiểm thử tiền sản xuất |
| `prod` | Sản xuất |

:::info
Mỗi môi trường có bộ endpoint API, cơ sở dữ liệu và cấu hình riêng. Các thiết lập theo môi trường được quản lý thông qua tệp `.env` ở máy cục bộ và AWS SSM Parameter Store trong các môi trường đã triển khai.
:::
