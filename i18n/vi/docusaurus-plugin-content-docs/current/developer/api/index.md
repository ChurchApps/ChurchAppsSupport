---
title: "API"
---

# API

<div class="article-intro">

API của ChurchApps là một **khối nguyên khối mô-đun** (modular monolith), nghĩa là một mã nguồn duy nhất phục vụ sáu mô-đun dữ liệu, mỗi mô-đun có cơ sở dữ liệu riêng. Kiến trúc này mang lại lợi ích tổ chức của microservices (ranh giới rõ ràng, kho dữ liệu độc lập) với sự đơn giản trong vận hành của một lần triển khai duy nhất.

</div>

## Các mô-đun

| Mô-đun | Mục đích |
|--------|---------|
| **Membership** | Người, nhóm, hộ gia đình, quyền hạn |
| **Attendance** | Buổi lễ, phiên điểm danh, bản ghi check-in |
| **Content** | Trang, phần, thành phần, phát trực tuyến |
| **Giving** | Quyên góp, quỹ, xử lý thanh toán |
| **Messaging** | Cuộc trò chuyện, thông báo, email |
| **Doing** | Nhiệm vụ, kế hoạch, phân công |

## Ngăn xếp công nghệ

- **Runtime:** Node.js 24.x với TypeScript (ES modules)
- **Framework:** Express
- **Tiêm phụ thuộc (Dependency Injection):** Inversify (định tuyến dựa trên decorator)
- **Cơ sở dữ liệu:** MySQL -- mỗi mô-đun một cơ sở dữ liệu, mỗi cơ sở có pool kết nối riêng
- **Xác thực:** Xác thực dựa trên JWT thông qua `CustomAuthProvider`
- **Triển khai:** AWS Lambda với Serverless Framework v3

## Cổng

| Giao thức | Cổng | Mô tả |
|-----------|------|-------|
| HTTP | `8084` | REST API chính |
| WebSocket | `8087` | Kết nối socket thời gian thực |

## Hàm Lambda

Khi được triển khai lên AWS, API chạy dưới dạng sáu hàm Lambda:

- **`web`** -- Xử lý tất cả yêu cầu HTTP
- **`socket`** -- Quản lý kết nối WebSocket
- **`timer15Min`** -- Chạy mỗi 30 phút để gửi email thông báo (tên này là do lịch sử để lại)
- **`timerMidnight`** -- Chạy hằng ngày để gửi email tổng hợp và thực hiện các tác vụ bảo trì
- **`timerScheduledTasks`** -- Chạy hằng ngày để xử lý các tự động hóa đến hạn và quy trình công việc quá hạn
- **`timerWebhooks`** -- Chạy mỗi phút để gửi các webhook đi đang chờ trong hàng đợi

## Thư viện dùng chung

API phụ thuộc vào hai gói dùng chung của ChurchApps:

- **[`@churchapps/helpers`](../shared-libraries/helpers)** -- Các tiện ích nền tảng (DateHelper, ApiHelper, v.v.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** -- Tiện ích máy chủ Express, bao gồm xác thực, trợ giúp cơ sở dữ liệu và tích hợp AWS

:::info
API sử dụng ES modules (`"type": "module"` trong `package.json`). Hãy đảm bảo các câu lệnh import của bạn dùng cú pháp ES module.
:::

## Trong mục này

- **[Thiết lập cục bộ](./local-setup)** -- Sao chép, cấu hình và chạy API trên máy của bạn
- **[Cơ sở dữ liệu](./database)** -- Kiến trúc mỗi mô-đun một cơ sở dữ liệu, các script schema và mẫu truy cập dữ liệu
- **[Cấu trúc mô-đun](./module-structure)** -- Controllers, repositories, models và xác thực
- **[Khóa API](./api-keys)** -- Mã truy cập cá nhân cho các script và trình kết nối
- **[Ứng dụng được kết nối (OAuth)](./connected-apps)** -- Luồng OAuth đa người thuê cho các ứng dụng bên thứ ba
- **[Webhooks](./webhooks)** -- Đẩy thông báo sự kiện đến các hệ thống bên ngoài
- **[Máy chủ MCP](./mcp)** -- Điểm cuối Model Context Protocol đưa API đến các trợ lý AI
- **[Tài liệu tham chiếu endpoint](./endpoints/)** -- Tài liệu REST API đầy đủ cho tất cả các mô-đun
