---
title: "Thiết lập"
---

# Thiết lập

<div class="article-intro">

Phần này hướng dẫn bạn thiết lập môi trường phát triển cục bộ cho các dự án ChurchApps. Bạn có thể trỏ frontend đến các API demo dùng chung để phát triển nhanh, hoặc chạy toàn bộ hệ thống cục bộ nếu cần làm việc với backend.

</div>

## Hai cách tiếp cận

Có hai cách để phát triển cục bộ, tùy thuộc vào mức độ hệ thống bạn cần:

### 1. Trỏ đến các API demo (Dễ nhất)

Nếu bạn đang làm việc với một **dự án frontend** (ứng dụng web, ứng dụng di động hoặc ứng dụng máy tính để bàn), cách nhanh nhất là trỏ ứng dụng cục bộ đến các API demo dùng chung. Không cần cài đặt cơ sở dữ liệu hay backend.

URL cơ sở của API demo là:

```
https://api.demo.churchapps.org
```

Mỗi mô-đun API có sẵn tại một đường dẫn dưới địa chỉ cơ sở này, ví dụ:

```
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/giving
```

Môi trường demo chạy mã mới nhất từ nhánh `main`, và dữ liệu mẫu của nó được nạp lại mỗi đêm, vì vậy đừng mong những gì bạn tạo ở đó sẽ được giữ lại. (Môi trường staging cũ, `api.staging.churchapps.org`, đã ngừng hoạt động. Một số tệp `.env` mẫu vẫn có thể liệt kê URL staging -- hãy thay thế chúng bằng URL demo hoặc URL cục bộ.)

:::tip
Cách này giúp bạn bắt đầu thay đổi frontend chỉ trong vài phút. Đây là lộ trình được khuyến nghị cho hầu hết người đóng góp.
:::

### 2. Chạy toàn bộ hệ thống cục bộ

Nếu bạn cần chỉnh sửa mã API hoặc làm việc khi không có kết nối mạng, bạn có thể chạy toàn bộ hệ thống cục bộ. Cách này yêu cầu MySQL 8.0 trở lên và cấu hình bổ sung. Xem hướng dẫn [thiết lập API cục bộ](../api/local-setup) để biết hướng dẫn chi tiết.

## Bắt đầu

Hãy làm theo các trang sau theo thứ tự:

1. **[Điều kiện tiên quyết](prerequisites)** -- Cài đặt các công cụ cần thiết (Node.js, Git, MySQL, v.v.)
2. **[Tổng quan dự án](project-overview)** -- Tìm hiểu các dự án hiện có và chức năng của từng dự án
3. **[Biến môi trường](environment-variables)** -- Cấu hình các tệp `.env` để kết nối mọi thứ với nhau

:::info
Mỗi dự án ChurchApps là một kho Git độc lập. Bạn chỉ cần sao chép (clone) những dự án cụ thể mà bạn muốn làm việc.
:::
