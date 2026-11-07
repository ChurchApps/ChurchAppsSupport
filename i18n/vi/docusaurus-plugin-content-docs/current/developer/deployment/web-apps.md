---
title: "Triển khai ứng dụng web"
description: "Hướng dẫn triển khai ứng dụng web ChurchApps như B1 Admin lên Amazon S3 và CloudFront, tự động qua GitHub Actions khi merge hoặc chạy lệnh thủ công."
---

# Triển khai ứng dụng web

<div class="article-intro">

Các ứng dụng web của ChurchApps được triển khai dưới dạng trang tĩnh lên **Amazon S3**, với **CloudFront** làm mạng phân phối nội dung (CDN). Việc triển khai được tự động hóa thông qua GitHub Actions, nhưng cũng có thể chạy thủ công khi cần.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Thiết lập ứng dụng web trên máy cục bộ và xác nhận ứng dụng build thành công -- xem [Ứng dụng web](../web-apps/index.md)
- Cấu hình thông tin xác thực AWS với quyền truy cập S3 và CloudFront
- Biết tên S3 bucket đích và ID của CloudFront distribution

</div>

## Các bước triển khai

1. **Build ứng dụng** -- tạo ra kết quả tĩnh:

   ```bash
   npm run build
   ```

2. **Đồng bộ lên S3** -- tải kết quả build lên S3 bucket:

   ```bash
   aws s3 sync build/ s3://bucket-name
   ```

3. **Làm mới CloudFront** -- xóa bộ nhớ đệm CDN để người dùng nhận được phiên bản mới nhất:

   ```bash
   aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
   ```

## Triển khai tự động

Các workflow GitHub Actions tự động xử lý việc triển khai khi có push lên nhánh `main`. Workflow thực hiện cả ba bước trên -- build, đồng bộ S3 và làm mới CloudFront -- mà không cần can thiệp thủ công.

:::info
Thông thường bạn không cần chạy các lệnh này thủ công. Việc merge một pull request vào `main` sẽ kích hoạt quy trình triển khai tự động.
:::

:::tip
Nếu bạn cần kiểm tra bản build trên máy cục bộ trước khi triển khai, hãy chạy `npm run build` và xem kết quả trong thư mục `build/`. Bạn có thể phục vụ thư mục này bằng bất kỳ máy chủ tệp tĩnh nào để xác nhận mọi thứ hoạt động.
:::

## Bài viết liên quan

- **[Ứng dụng web](../web-apps/index.md)** -- Hướng dẫn thiết lập cho B1Admin, B1App và LessonsApp
- **[Triển khai API](./apis.md)** -- Triển khai các API phía máy chủ
- **[Triển khai ứng dụng di động](./mobile.md)** -- Triển khai ứng dụng di động lên cửa hàng ứng dụng
