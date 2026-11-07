---
title: "Kiến trúc"
---

# Kiến trúc

<div class="article-intro">

Các trang này là bản đồ hệ thống liên kho mã (cross-repo), mô tả cách một hệ thống cốt lõi của ChurchApps hoạt động từ đầu đến cuối: qua các ứng dụng, các module API và các thư viện dùng chung. Chúng không hướng dẫn cách thiết lập một dự án riêng lẻ. Hãy đọc chúng trước khi thay đổi hành vi của một hệ thống. Đọc [Thiết lập](../setup/) để chạy một dự án và [phần API](../api/) để tra cứu tham chiếu ở cấp endpoint.

</div>

## Tổng quan hệ sinh thái

ChurchApps gồm khoảng 20 kho mã độc lập (không phải monorepo). Các ứng dụng phía máy khách giao tiếp với một tập nhỏ các API backend qua HTTPS và WebSocket, đồng thời chia sẻ mã thông qua các gói npm được phát hành dưới phạm vi `@churchapps`.

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Clients                       │            │  Api — core modular monolith (AWS Lambda)    │
│                                │            │                                              │
│  B1Admin    staff dashboard    │   HTTPS    │   membership    attendance    content        │
│  B1App      member portal +    │ ─────────▶ │   giving        messaging     doing          │
│             church websites    │            │                                              │
│  B1Checkin  check-in kiosk     │ ◀───WS───▶ │   one MySQL database per module (6 total)    │
│  B1Mobile   (maintenance-only) │            └──────────────────────────────────────────────┘
│  FreePlay   TV content player  │            ┌──────────────────────────────────────────────┐
└───────────────┬────────────────┘            │  LessonsApi — Lessons.church backend         │
                │                             └──────────────────────────────────────────────┘
                │  shared code via npm (@churchapps/*)
                ▼
   helpers (cross-app interfaces) · apphelper (React components) · apihelper (Express/server utilities)
```

Hai quy tắc cấu trúc định hình mọi nội dung trong phần này:

1. **Các module được cô lập.** Mỗi module Api sở hữu cơ sở dữ liệu và các bảng của riêng nó. Các module và ứng dụng khác chỉ truy cập dữ liệu của nó thông qua các endpoint REST. Xem [Cấu trúc module](../api/module-structure).
2. **Mã dùng chung được phát hành dưới dạng gói npm.** Các ứng dụng không bao giờ import mã nguồn của nhau. Bất cứ thứ gì được tái sử dụng đều vượt qua ranh giới kho mã thông qua `@churchapps/helpers`, `@churchapps/apphelper` hoặc `@churchapps/apihelper`. Xem [Thư viện dùng chung](../shared-libraries/).

## Bản đồ hệ thống

| Trang | Nội dung | Phạm vi |
|------|----------------|-------|
| [Thông báo & Nhắc nhở](./notifications) | Cách mọi thứ thông báo cho một người: hai cửa phát tán, chuỗi leo thang kênh và công cụ nhắc nhở | Api (messaging), B1Admin, B1App |
| [Kiến trúc thời gian thực](../realtime) | Framework phân phối WebSocket đứng sau trò chuyện, trạng thái hiện diện và phân phối trong ứng dụng | Api (messaging), tất cả ứng dụng web |
| [Thông báo đẩy web](../web-push) | Kênh đẩy trên trình duyệt: khóa VAPID, lưu trữ đăng ký và phân phối | Api (messaging), tất cả ứng dụng web |
| [Quyên góp](./giving) | Nhà cung cấp thanh toán và cổng thanh toán, luồng quyên góp, quỹ/đợt xử lý và webhook của cổng | Api (giving), apphelper, B1App, B1Admin |
| [Đăng ký sự kiện](./registrations) | Mô hình thương mại đăng ký: loại người tham dự, lựa chọn, mã giảm giá, thanh toán qua cổng quyên góp và danh sách chờ | Api (content + giving), B1App, B1Admin |
| [Check-In](./check-ins) | Check-in tại kiosk và tự check-in, mô hình dữ liệu điểm danh, định tuyến phòng, lớp bảo vệ trẻ em và in nhãn | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Trình tạo website](./website-builder) | Cây trang/phần/phần tử, hợp đồng và trình hiển thị loại phần tử, blog, trang có kiểm soát truy cập, SEO và tạo nội dung bằng AI | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Định tuyến website & Đa trang](./websites) | Cách một yêu cầu được xác định với một hội thánh và một trang cụ thể, mô hình dữ liệu `siteId` đa trang và lớp biên Caddy cho tên miền tùy chỉnh | B1App, Api (membership + content), B1Admin |
| [Tích hợp](./integrations) | Bề mặt mở rộng: OAuth, khóa API, webhook, nhà cung cấp nội dung và MCP | Api, thư viện dùng chung, ứng dụng bên ngoài |
| [Nhật ký kiểm tra & Đợt có thể hoàn tác](./audit-log) | Ghi nhật ký mặc định cho mọi thao tác thay đổi tại điểm kiểm soát controller, và lớp đợt xử lý giúp các thao tác nhập và hàng loạt có thể hoàn tác | Api (tất cả module), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff) | Dịch vụ lưu trữ và mua tín dụng nhắn tin trả phí: danh tính JWT dùng chung, S2S bằng khóa dịch vụ, các điểm nối nhà cung cấp nhắn tin và lưu trữ, thanh toán Stripe | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), gói texting/apihelper, B1Admin |
| [Lưu trữ tự mang (BYOS)](./byos-storage) | Hội thánh liên kết Google Drive, Dropbox, OneDrive hoặc bucket tương thích S3 để tải lên vượt quá 100MB miễn phí: kết nối OAuth, cấu trúc tải lên theo từng nhà cung cấp, chuyển hướng tải xuống công khai | Api (content + membership), gói helpers/apphelper, B1Admin, B1App |
| [Kho nội dung chung](./commons) | Lớp xương sống dùng chung cho tài sản và bài gửi, làm nền cho nội dung do người dùng tạo xuyên suốt các sản phẩm, cùng hàng đợi kiểm duyệt duy nhất chỉ dành cho nhân viên trong Server Admin của B1Admin | Api (module commons), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
Khi một thay đổi làm thay đổi cách hoạt động của một trong các hệ thống này, không chỉ một trang trong một ứng dụng, bản đồ hệ thống tương ứng ở đây cần được cập nhật trong cùng công việc. Điều này giúp phần này luôn đáng tin cậy như điểm khởi đầu đầu tiên cho những người đóng góp mới.
:::

## Đề xuất

Các tài liệu này mô tả công việc được đề xuất để xem xét, chứ không phải hành vi sản phẩm hiện có.

| Đề xuất | Nội dung |
|---|---|
| [Twilio BYOK](./twilio-byok-proposal) | Tài khoản, khóa, dịch vụ và số điện thoại thuộc sở hữu của hội thánh; phạm vi tích hợp, sự đồng ý, phân phối, ước tính và các kiểm tra trước khi phát hành |
| [Bản nháp đăng ký Twilio cho hội thánh](./twilio-byok-onboarding-draft) | Đề xuất cài đặt biểu mẫu đăng ký B1, ví dụ chiến dịch riêng cho từng hội thánh, và danh sách kiểm tra phê duyệt và vận hành |
