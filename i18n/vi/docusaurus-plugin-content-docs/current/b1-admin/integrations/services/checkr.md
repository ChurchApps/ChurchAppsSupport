---
title: "Checkr"
description: "Kết nối đăng ký tình nguyện viên trong B1 Admin với kiểm tra lý lịch Checkr qua Make.com, có thông báo trạng thái báo cáo cho điều phối viên an toàn mục vụ."
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com) cung cấp dịch vụ kiểm tra lý lịch (background screening) cho nhân viên và tình nguyện viên, một nhu cầu gần như phổ biến với mọi hội thánh có chương trình dành cho trẻ em hoặc thanh thiếu niên. B1 **không có tính năng kiểm tra lý lịch tích hợp sẵn**. Việc yêu cầu kiểm tra, theo dõi kết quả và tuân thủ quy định sàng lọc đều nằm trong Checkr. Hướng dẫn bên dưới chỉ kết nối các sự kiện của B1 với Checkr. Checkr không có ứng dụng Zapier, nhưng [tích hợp Checkr của Make.com](https://www.make.com/en/integrations/checkr) đã được xác minh và cung cấp các hành động bạn cần để bắt đầu một lần kiểm tra từ một sự kiện của B1.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Một tài khoản [Checkr](https://checkr.com) có quyền truy cập API và ít nhất một gói sàng lọc đã được cấu hình
- Một tài khoản [Make](https://www.make.com)
- Một người dùng B1Admin có quyền **Edit Settings** (Chỉnh sửa cài đặt)

</div>

## Bạn có thể kết nối những gì

Ứng dụng Checkr của Make cung cấp 1 trigger và 6 action:

| Chiều | Trigger B1 / Make | Hành động |
|---|---|---|
| B1 → Checkr | Sự kiện `group.member.added` của B1 (lọc theo nhóm tình nguyện viên) | Checkr: Create Candidate → Create Background Check Invitation |
| Checkr → B1 | Webhook của Checkr (sự kiện lời mời / báo cáo) | B1: Cập nhật hồ sơ của người đó (ví dụ gắn thẻ "Checkr cleared") |

Các action của Checkr trong Make: Create Candidate, Create Background Check Invitation, Get Candidate, Get Report, Get Report's ETA, Get an Invitation. Ngoài ra có 4 module tìm kiếm.

## Thiết lập

### 1. Tạo khóa API của B1

**Cài đặt → Nhà phát triển → Khóa API → Khóa API mới**:

- `settings:write`: dùng cho webhook của trigger
- `people:read`: để tra cứu họ tên và email của người đó khi bắt đầu kiểm tra
- (Tùy chọn) `people:write` nếu bạn muốn ghi trạng thái báo cáo trở lại dưới dạng trường tùy chỉnh hoặc thẻ

### 2. Xây dựng kịch bản "bắt đầu kiểm tra khi tình nguyện viên đăng ký" trong Make

1. **Trigger**: B1.church: Watch Events (`group.member.added`).
2. **Bộ lọc**: chỉ tiếp tục nếu `data.groupId` khớp với nhóm "Children's Volunteers" (hoặc nhóm tương đương) của bạn.
3. **Action**: B1.church: Find Person (theo `data.personId`) để lấy email, họ và tên.
4. **Action**: Checkr: Create Candidate. Ánh xạ họ, tên và email từ bước 3.
5. **Action**: Checkr: Create Background Check Invitation. Ánh xạ id ứng viên mới từ bước 4 vào trường *candidate_id*. Chọn gói sàng lọc (ví dụ `tasker_standard` hoặc gói nào mà tài khoản của bạn cung cấp).
6. (Tùy chọn) **Action**: Slack: thông báo cho điều phối viên an toàn mục vụ rằng một lần kiểm tra đã được khởi tạo.

Bật kịch bản. Tình nguyện viên mới trong nhóm được nhắm tới sẽ tự động nhận lời mời kiểm tra của Checkr qua email. Họ hoàn thành trên điện thoại hoặc máy tính xách tay, rồi Checkr thực hiện việc sàng lọc.

### 3. (Tùy chọn) Nhận báo cáo trở lại

1. **Trigger**: Checkr: Watch Events (webhook). Make đăng ký một webhook của Checkr khi kịch bản được kích hoạt.
2. **Bộ lọc**: chỉ tiếp tục nếu `event_type = report.completed`.
3. **Action**: Checkr: Get Report (dùng id báo cáo từ webhook).
4. **Action**: B1.church: Find Person (theo email của ứng viên).
5. **Action**: Slack / Email có điều kiện: thông báo cho điều phối viên với trạng thái `clear` / `consider` / `suspended`.

Lưu ý: hiện B1 chưa có trường "trạng thái kiểm tra lý lịch" tích hợp sẵn. Các lựa chọn thực tế là (a) đăng kết quả lên một kênh Slack riêng tư để xem xét, (b) ghi vào Google Trang tính để kiểm tra, hoặc (c) thêm người đó vào nhóm B1 "Cleared volunteers" khi kết quả là `clear`.

## Các công thức thông dụng

### Kiểm tra lại tình nguyện viên mỗi 2 năm

Kết hợp các bước trên với một trigger theo lịch của Make:

- **Trigger**: Make: Schedule (hàng tháng)
- **Action**: B1.church: List Group Members cho nhóm "Cleared volunteers"
- **Action**: Lọc bằng Make: ngày được duyệt cũ hơn 22 tháng
- **Action**: Checkr: Create Background Check Invitation (giống quy trình ban đầu)

### Chặn quyền truy cập ở giai đoạn 1 cho đến khi kiểm tra hoàn tất

Nếu hội thánh của bạn dùng tư cách thành viên nhóm B1 để giới hạn quyền truy cập (ví dụ chỉ thành viên nhóm "Cleared" mới xuất hiện trong lịch phục vụ), hãy giữ tình nguyện viên mới trong một nhóm tạm cho đến khi sự kiện `report.completed` của Checkr chuyển trạng thái của họ.

## Giới hạn và lưu ý

- **Checkr chỉ hoạt động tại Hoa Kỳ** đối với hầu hết các gói sàng lọc. Các hội thánh ở Úc, Anh và Canada sẽ cần một giải pháp thay thế.
- **Giá** tính theo từng lần kiểm tra. Mỗi Create Invitation trong Make đều tiêu tốn một lần kiểm tra thật. Hãy thử nghiệm trong môi trường sandbox hoặc staging của Checkr trước (ứng dụng Checkr của Make dùng thông tin đăng nhập bạn truyền vào kết nối, nên đổi thông tin đăng nhập sẽ chuyển giữa sandbox và live).
- **Quyền truy cập API của Checkr phụ thuộc vào gói dịch vụ.** Các tài khoản Checkr nhỏ hơn có thể chỉ dùng giao diện web. Hãy liên hệ Checkr để bật API.

## Khắc phục sự cố

- **Create Candidate báo lỗi `403`**: token API của Checkr chỉ có quyền đọc hoặc thiếu quyền phù hợp với tài khoản. Hãy cấp lại token từ bảng điều khiển Checkr với quyền ghi.
- **Lời mời không bao giờ đến**: kiểm tra email của ứng viên ở bước 3. B1 có thể đang để trống trường email của người đó. Hãy thêm bộ lọc yêu cầu có email trước bước Checkr.
- **Trigger webhook không kích hoạt**: việc đăng ký webhook của Checkr đôi khi thất bại âm thầm nếu tài khoản Make của bạn không ở gói trả phí hỗ trợ webhook gửi ra ngoài. Hãy kiểm tra trên trang *Webhooks* của bảng điều khiển Checkr xem URL của Make đã được liệt kê chưa.

## Xem thêm

- [Make (tổng quan)](../make.md): phía B1 của mọi kịch bản Make
- [Tin nhắn di động](./mobile-message.md): dành cho các nhà cung cấp SMS không có ứng dụng Zapier, dùng cùng mô hình Webhooks/HTTP như kết nối Checkr với Make
- [Tài liệu API Checkr](https://docs.checkr.com/)
