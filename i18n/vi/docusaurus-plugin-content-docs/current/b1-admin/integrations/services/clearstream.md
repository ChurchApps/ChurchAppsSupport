---
title: "Clearstream"
---

# Clearstream

<div class="article-intro">

Kích hoạt tin nhắn văn bản [Clearstream](https://clearstream.io) từ bất kỳ sự kiện nào trong B1, chẳng hạn khi có người mới, quà tặng mới, biểu mẫu được gửi hoặc lịch được cập nhật, và nhận phản hồi trở lại dưới dạng bản ghi B1. Ứng dụng Zapier của Clearstream hỗ trợ cả hai chiều, nên toàn bộ việc thiết lập chỉ là một công thức có sẵn và không cần viết mã tùy chỉnh.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Một tài khoản [Clearstream](https://clearstream.io) có ít nhất một danh sách và hạn mức SMS
- Một tài khoản [Zapier](https://zapier.com)
- Một người dùng B1Admin có quyền **Chỉnh sửa cài đặt**

</div>

## Những gì bạn có thể thiết lập

| Chiều | Trigger | Hành động |
|---|---|---|
| B1 → Clearstream | B1 `person.created` | Clearstream: Create/Update Subscriber + Send Text to Number |
| B1 → Clearstream | B1 `donation.created` | Clearstream: Send Text to List (ví dụ: thông báo cho đội tài chính) |
| B1 → Clearstream | B1 `form.submission.created` | Clearstream: Send Text to a routing list (ví dụ: đội cầu nguyện) |
| Clearstream → B1 | New Incoming Text | B1: Create Person; gắn thẻ bằng từ khóa mà người đó đã nhắn |

Các hành động Zapier của Clearstream: *Send Text to Number*, *Send Text to List*, *Create/Update Subscriber*, *Add Subscriber to Automated Workflow*, *Add Tag to Subscriber*, *Remove Subscriber From List*.

## Thiết lập

### 1. Tạo khóa API B1

**Cài đặt → Nhà phát triển → API Keys → New API Key**:

- `settings:write` — bắt buộc để B1 đăng ký webhook trigger
- `people:read` — cần để tra cứu người liên quan đến sự kiện (`personId` → tên/số điện thoại/email)
- (Tùy chọn) `people:write` nếu bạn muốn các phản hồi từ Clearstream tạo liên hệ mới trong B1

### 2. Xây dựng Zap "gửi tin nhắn khi có quà mới"

1. **Trigger** — B1.church: New Donation
2. **Action** — B1.church: Find Person (`personId` của khoản quà)
3. **Action** — Clearstream: Send Text to Number. Dùng số điện thoại của người từ bước 2 làm người nhận, rồi soạn nội dung (`"Cảm ơn quà tặng của bạn, {first}! …"`).

Bật Zap. Khi được kích hoạt, B1 sẽ đăng ký webhook quà tặng; bạn sẽ thấy `Zapier — donation.created` xuất hiện trong **Cài đặt → Nhà phát triển → Webhooks**.

### 3. (Tùy chọn) Nhận phản hồi trở lại dưới dạng bản ghi B1

1. **Trigger** — Clearstream: New Incoming Text
2. **Action** — Filter by Zapier theo từ khóa, ví dụ chỉ tiếp tục khi nội dung tin nhắn bắt đầu bằng `PRAY`
3. **Action** — B1.church: Find Person (theo số điện thoại)
4. **Action** — Filter / Path: nếu không tìm thấy, tạo người mới; trong mọi trường hợp, lưu nội dung tin nhắn vào một nơi nào đó (Slack, Google Sheet, hoặc một bản gửi biểu mẫu B1 qua Webhooks by Zapier).

## Các công thức thường dùng

### Nhắn tin cho đội tình nguyện

- **Trigger** — B1.church: New Form Submission (lọc theo id của biểu mẫu yêu cầu cầu nguyện)
- **Action** — Clearstream: Send Text to List, với danh sách là đội mục vụ trực của bạn. Soạn nội dung là `Yêu cầu cầu nguyện mới: {data.questions.0.answer}`.

### Chuỗi theo dõi cho khách viếng thăm lần đầu

- **Trigger** — B1.church: New Person, lọc theo thẻ người của B1 là "Khách viếng thăm lần đầu"
- **Action** — Clearstream: Add Subscriber to Automated Workflow. Ánh xạ id quy trình sang chuỗi tin nhắn 7 ngày đã được thiết lập sẵn.

### Tham gia nhóm qua từ khóa

- **Trigger** — Clearstream: New Incoming Text (lọc theo từ khóa `MENS`)
- **Action** — B1.church: Find Person (theo số điện thoại); nếu không tìm thấy → Create Person
- **Action** — B1.church: Add Group Member vào nhóm Men's Ministry

## Giới hạn và lưu ý

- **Clearstream tính phí SMS theo tin nhắn.** Mỗi hành động Send Text tiêu tốn một hoặc nhiều tín dụng tùy độ dài và số người nhận. Hãy kiểm tra hạn mức trong gói của bạn.
- **Số điện thoại phải ở định dạng E.164** (ví dụ `+15555550199`) đối với *Send Text to Number*. Hồ sơ người trong B1 lưu bất cứ định dạng nào đã nhập; nếu không chắc định dạng, hãy dùng bước *Formatter by Zapier — Numbers → Format Phone Number*.
- **B1 không cần gửi tiêu đề nào** — xác thực của Clearstream hoàn toàn nằm trong kết nối Zapier của Clearstream.

## Khắc phục sự cố

- **Trigger không bao giờ chạy** — `Cài đặt → Nhà phát triển → Webhooks` sẽ hiển thị một dòng `Zapier — <event>` sau khi bật Zap. Nếu không có, khóa API B1 đang thiếu `settings:write`. Hãy tạo lại khóa và kết nối lại.
- **Clearstream trả về "Invalid phone number"** — trường người nhận không ở định dạng E.164. Hãy thêm bước Format Phone Number.
- **Send Text to List thất bại với `403`** — người dùng API của Clearstream không có quyền với danh sách đó, hoặc id danh sách sai. Id danh sách hiển thị trên trang chi tiết danh sách của Clearstream.

## Xem thêm

- [Text In Church](./text-in-church) — nền tảng SMS thay thế, có cấu trúc kết nối tương tự
- [Mobile Message](./mobile-message) — dành cho các hội thánh ngoài Hoa Kỳ
- [Tổng quan về Zapier](../zapier) — phần B1 của mọi công thức Zapier
- [Tài liệu API của Clearstream](https://api-docs.clearstream.io/) — dành cho các tích hợp tùy chỉnh ngoài ứng dụng Zapier
