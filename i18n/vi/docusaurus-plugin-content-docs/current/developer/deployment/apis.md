---
title: "Triển khai API"
---

# Triển khai API

<div class="article-intro">

API của ChurchApps được triển khai dưới dạng hàm AWS Lambda bằng Serverless Framework. Trang này hướng dẫn quy trình build, deploy và cấu hình cho môi trường demo và production.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Thiết lập API trên máy cục bộ -- xem [Thiết lập API cục bộ](../api/local-setup)
- Cấu hình thông tin xác thực AWS trên máy của bạn
- Đảm bảo bạn có quyền truy cập vào tài khoản AWS đích

</div>

## Build

API được build cho production bằng một cấu hình TypeScript riêng:

```bash
npm run build:prod
```

Lệnh này sử dụng `tsconfig.prod.json` để biên dịch dự án cho runtime Lambda.

## Deploy

Deploy lên môi trường demo:

```bash
npm run deploy-demo
```

Deploy lên production:

```bash
npm run deploy-prod
```

Trên thực tế, API được deploy bằng GitHub Actions: **Deploy Demo** chạy mỗi khi có push lên `main`, còn **Deploy Prod** được khởi chạy thủ công (workflow dispatch). Hiện không còn môi trường staging.

## Di chuyển cơ sở dữ liệu

**Deploy Prod** áp dụng các migration cơ sở dữ liệu đang chờ xử lý như một phần của quá trình deploy. Cơ sở dữ liệu production chỉ chấp nhận kết nối từ bên trong VPC, vì vậy ngay sau `serverless deploy`, workflow sẽ gọi Lambda `migrate` (`api-Prod-migrate`). Lambda này chạy các migration đang chờ của mọi module và trả về `{ ok, environment, modules }`. Nếu có module nào thất bại hoặc bị từ chối (ví dụ cơ sở dữ liệu chưa có lịch sử migration), job sẽ dừng lại để đảm bảo schema không bao giờ bị lạc hậu so với mã nguồn. **Rollback Prod** chỉ hoàn tác mã Lambda; các migration vẫn được giữ nguyên, vì vậy hãy viết migration theo hướng chỉ thêm mới (additive). Xem [Quản trị máy chủ -- Di chuyển cơ sở dữ liệu](../server-admin#database-migrations) để kiểm tra trạng thái hoặc chạy migration thủ công.

## Các tài nguyên được tạo

Mỗi lần triển khai API sẽ tạo mới hoặc cập nhật các hàm AWS Lambda sau:

| Hàm | Mục đích |
|----------|---------|
| `web` | Xử lý yêu cầu HTTP qua API Gateway |
| `socket` | Xử lý kết nối WebSocket |
| `timer15Min` | Tác vụ theo lịch chạy mỗi 30 phút (tên là do lịch sử để lại) |
| `timerMidnight` | Tác vụ theo lịch chạy hằng ngày vào nửa đêm |
| `migrate` | Áp dụng các migration cơ sở dữ liệu đang chờ; được gọi bởi workflow Deploy Prod |

## Cấu hình môi trường

Trong các môi trường đã triển khai, cấu hình được đọc từ **AWS SSM Parameter Store** thay vì các tệp `.env`. Cách này giúp dữ liệu nhạy cảm không nằm trong gói triển khai và cho phép thay đổi cấu hình mà không cần deploy lại.

:::warning
Không bao giờ commit thông tin xác thực production vào kho mã nguồn. Mọi cấu hình nhạy cảm phải được lưu trong AWS SSM Parameter Store và được truy cập tại thời điểm chạy.
:::

:::tip
Mỗi lần merge vào `main` đều triển khai lên môi trường demo trước. Hãy kiểm tra thay đổi của bạn ở đó (ví dụ tại [demo.b1.church](https://demo.b1.church)) trước khi chạy Deploy Prod.
:::

## Bài viết liên quan

- **[Thiết lập API cục bộ](../api/local-setup)** -- Thiết lập API để phát triển
- **[Cấu trúc module](../api/module-structure)** -- Tìm hiểu kiến trúc hàm Lambda
- **[Triển khai ứng dụng web](./web-apps)** -- Triển khai các ứng dụng frontend
