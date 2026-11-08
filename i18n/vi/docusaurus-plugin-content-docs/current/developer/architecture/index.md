---
title: "Kiến trúc"
description: "Sơ đồ hệ thống liên kho lưu trữ cho thấy cách quyên góp, check-in, thông báo và website hoạt động trên B1 Admin, B1.church và Api trước khi bạn thay đổi chúng."
---

# Kiến trúc

<div class="article-intro">

Các trang này là sơ đồ hệ thống liên kho lưu trữ: chúng mô tả cách một hệ thống cốt lõi của ChurchApps hoạt động từ đầu đến cuối, qua các ứng dụng, mô-đun API và thư viện dùng chung, thay vì cách thiết lập một dự án riêng lẻ. Hãy đọc chúng trước khi thay đổi hành vi của một hệ thống; đọc [Thiết lập](../setup/index.md) để chạy một dự án và [phần API](../api/index.md) để xem tài liệu tham chiếu cấp endpoint.

</div>

## Tổng quan hệ sinh thái

ChurchApps gồm khoảng 20 kho lưu trữ độc lập (không phải monorepo). Các ứng dụng phía client giao tiếp với một nhóm nhỏ API backend qua HTTPS và WebSocket, đồng thời chia sẻ mã thông qua các gói npm được xuất bản dưới phạm vi `@churchapps`.

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Clients                       │            │  Api — core modular monolith (AWS Lambda)    │
│                                │            │                                              │
│  B1Admin    staff dashboard    │   HTTPS    │   membership    attendance    content        │
│  B1App      member portal +    │ ─────────▶ │   giving        messaging     doing          │
│             church websites    │            │                                              │
│  B1Checkin  check-in kiosk     │ ◀───WS───▶ │   one MySQL database per module (6 total)    │
│                                │            └──────────────────────────────────────────────┘
│  FreePlay   TV content player  │            ┌──────────────────────────────────────────────┐
└───────────────┬────────────────┘            │  LessonsApi — Lessons.church backend         │
                │                             └──────────────────────────────────────────────┘
                │  shared code via npm (@churchapps/*)
                ▼
   helpers (cross-app interfaces) · apphelper (React components) · apihelper (Express/server utilities)
```

Hai quy tắc cấu trúc định hình mọi nội dung được ghi lại trong phần này:

1. **Các mô-đun được cô lập.** Mỗi mô-đun Api sở hữu cơ sở dữ liệu và các bảng của riêng nó; các mô-đun và ứng dụng khác chỉ truy cập dữ liệu của nó thông qua các endpoint REST. Xem [Cấu trúc mô-đun](../api/module-structure.md).
2. **Mã dùng chung được phân phối dưới dạng gói npm.** Các ứng dụng không import mã nguồn của nhau; bất cứ thứ gì được tái sử dụng đều đi qua ranh giới kho lưu trữ thông qua `@churchapps/helpers`, `@churchapps/apphelper` hoặc `@churchapps/apihelper`. Xem [Thư viện dùng chung](../shared-libraries/index.md).

## Sơ đồ hệ thống

| Trang | Nội dung | Phạm vi |
|------|----------------|-------|
| [Thông báo & Nhắc nhở](./notifications.md) | Cách mọi thứ thông báo cho một người: hai cửa phân phối, chuỗi leo thang kênh và công cụ nhắc nhở | Api (messaging), B1Admin, B1App |
| [Kiến trúc thời gian thực](../realtime.md) | Framework phân phối WebSocket đứng sau chat, trạng thái hiện diện và phân phối trong ứng dụng | Api (messaging), tất cả các ứng dụng web |
| [Thông báo đẩy web](../web-push.md) | Kênh đẩy trên trình duyệt: khóa VAPID, lưu trữ đăng ký, phân phối | Api (messaging), tất cả các ứng dụng web |
| [Quyên góp](./giving.md) | Nhà cung cấp thanh toán và cổng thanh toán, luồng quyên góp, quỹ/đợt, webhook của cổng thanh toán | Api (giving), apphelper, B1App, B1Admin |
| [Đăng ký sự kiện](./registrations.md) | Mô hình thương mại đăng ký: loại người tham dự, lựa chọn, mã giảm giá, thanh toán qua cổng quyên góp và danh sách chờ | Api (content + giving), B1App, B1Admin |
| [Check-in](./check-ins.md) | Check-in tại kiosk và tự check-in, mô hình dữ liệu điểm danh, định tuyến phòng, lớp bảo vệ trẻ em, in nhãn | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Trình tạo website](./website-builder.md) | Cây trang/phần/phần tử, hợp đồng loại phần tử và bộ kết xuất, blog, trang có kiểm soát truy cập, SEO và tạo nội dung bằng AI | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Định tuyến website & đa trang](./websites.md) | Cách một yêu cầu được phân giải thành một nhà thờ và một trang cụ thể, mô hình dữ liệu `siteId` đa trang, và lớp biên tên miền tùy chỉnh Caddy | B1App, Api (membership + content), B1Admin |
| [Tích hợp](./integrations.md) | Bề mặt mở rộng: OAuth, khóa API, webhook, nhà cung cấp nội dung, MCP | Api, thư viện dùng chung, ứng dụng bên ngoài |
| [Nhật ký kiểm tra & Lô có thể hoàn tác](./audit-log.md) | Kiểm tra mặc định cho mọi thay đổi dữ liệu tại điểm kiểm soát controller, và lớp lô giúp các thao tác nhập và hành động hàng loạt có thể hoàn tác | Api (tất cả mô-đun), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff.md) | Dịch vụ lưu trữ và tín dụng nhắn tin trả phí: danh tính JWT dùng chung, khóa dịch vụ S2S, các điểm nối nhà cung cấp nhắn tin và lưu trữ, thanh toán Stripe | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), các gói texting/apihelper, B1Admin |
| [Lưu trữ riêng (Bring-Your-Own Storage)](./byos-storage.md) | Nhà thờ liên kết Google Drive, Dropbox, OneDrive hoặc bucket tương thích S3 để tải lên vượt quá giới hạn miễn phí 100MB: kết nối OAuth, cấu trúc tải lên theo từng nhà cung cấp, chuyển hướng tải xuống công khai | Api (content + membership), các gói helpers/apphelper, B1Admin, B1App |
| [Kho nội dung chung (Content Commons)](./commons.md) | Xương sống tài nguyên và gửi nội dung dùng chung đằng sau nội dung do người dùng tạo xuyên sản phẩm, và hàng đợi kiểm duyệt duy nhất chỉ dành cho nhân viên trong Server Admin của B1Admin | Api (commons module), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
Khi một thay đổi làm thay đổi cách một trong các hệ thống này hoạt động — chứ không chỉ một trang bên trong một ứng dụng — sơ đồ hệ thống tương ứng ở đây cần được cập nhật trong cùng một đợt công việc. Điều đó giữ cho phần này đáng tin cậy như điểm khởi đầu đầu tiên dành cho những người đóng góp mới.
:::

## Đề xuất

Các tài liệu này mô tả công việc được đề xuất để xem xét, chứ không phải hành vi sản phẩm hiện có.

| Đề xuất | Nội dung |
|---|---|
| [Twilio BYOK](./twilio-byok-proposal.md) | Tài khoản, khóa, dịch vụ và số điện thoại thuộc sở hữu của nhà thờ; phạm vi tích hợp, sự đồng ý, phân phối, ước tính và kiểm tra trước khi phát hành |
| [Bản nháp đưa nhà thờ vào Twilio](./twilio-byok-onboarding-draft.md) | Cài đặt biểu mẫu đăng ký B1 được đề xuất, ví dụ chiến dịch dành riêng cho nhà thờ, và danh sách kiểm tra phê duyệt/vận hành |
