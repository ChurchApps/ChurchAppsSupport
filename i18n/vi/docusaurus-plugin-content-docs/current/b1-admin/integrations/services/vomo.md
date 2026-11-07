---
title: "VOMO"
description: "Kết nối đăng ký tình nguyện và check-in kiosk của VOMO với người và nhóm trong B1 Admin qua Zapier, gồm phạm vi khóa API và các bước thiết lập."
---

# VOMO

<div class="article-intro">

VOMO là nền tảng quản lý tình nguyện viên, nơi mọi người đăng ký tham gia dự án, check-in tại kiosk và tích lũy số giờ phục vụ. Nếu bạn dùng VOMO để lên lịch tình nguyện nhưng dùng B1 để quản lý hồ sơ người tham gia, Zapier có thể đồng bộ thông tin thành viên và lượt check-in giữa hai hệ thống, giúp dữ liệu hai bên luôn khớp nhau.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Một tài khoản [VOMO](https://vomo.org) thuộc gói có hỗ trợ Zapier (nếu chưa chắc, hãy hỏi bộ phận hỗ trợ của VOMO)
- Một tài khoản [Zapier](https://zapier.com)
- Một người dùng B1Admin có quyền **Edit Settings**

</div>

## Những gì bạn có thể kết nối

Ứng dụng Zapier của VOMO cung cấp bốn trigger tức thời và bốn action. Dưới đây là các kịch bản kết nối mà hầu hết hội thánh thường sử dụng:

| Hướng | Trigger | Action |
|---|---|---|
| VOMO → B1 | VOMO Membership (được tạo) | B1: Find Person → Create Person (nếu là người mới) |
| VOMO → B1 | VOMO Kiosk check-in | B1: Add Group Member vào nhóm "Currently Serving", hoặc ghi nhận như điểm danh |
| B1 → VOMO | B1 `person.created` | VOMO: Find Organizer (theo email); nếu không có thì dùng bước tùy chỉnh |
| Cả hai chiều | VOMO Participation (đăng ký) | B1: Add Group Member vào nhóm riêng của dự án |

Các action của VOMO hiện chỉ giới hạn ở việc **soạn thảo dự án** và **tìm** người tổ chức hoặc dự án đã có. Hiện chưa có action nào để "thêm người này vào một dự án VOMO". Phần kết nối hữu ích nhất chủ yếu là từ VOMO sang B1.

## Thiết lập

### 1. Tạo khóa API cho B1

Vào **Settings → Developer → API Keys → New API Key**. Các quyền (scope) cần chọn:

- `people:read`, `people:write` — để tra cứu và tạo tình nguyện viên dưới dạng người trong B1
- `groups:write` — để thêm họ vào các nhóm phục vụ
- (Tùy chọn) `attendance:write` nếu bạn coi lượt check-in tại kiosk là điểm danh

### 2. Tạo Zap đồng bộ thành viên

1. **Trigger** — VOMO: Membership (sự kiện = `created`).
2. **Action** — B1.church: Find Person, khớp theo email.
3. **Filter / Path** — phân nhánh theo kết quả tìm được hay không:
   - Không tìm thấy → B1.church: Create Person, sau đó Add Group Member vào nhóm tình nguyện phù hợp.
   - Đã tìm thấy → B1.church: Add Group Member trực tiếp.
4. Bật Zap. Các tình nguyện viên mới của VOMO sẽ xuất hiện trong B1 với đúng thông tin nhóm.

### 3. (Tùy chọn) Tạo Zap cho check-in tại kiosk

1. **Trigger** — VOMO: Kiosk
2. **Action** — B1.church: Find Person (theo email)
3. **Action** — tùy chọn của bạn:
   - *Nếu coi là điểm danh* — dùng Webhooks by Zapier để gửi POST tới endpoint `/attendance/visits` của B1 (ứng dụng Zapier của B1 hiện chưa có action *Record Attendance* riêng). [Khóa API](/docs/developer/api/api-keys) của B1 được đặt trong header `Authorization: Bearer cak_…`.
   - *Nếu coi là thành viên nhóm* — dùng B1.church: Add Group Member vào nhóm "Currently Serving (Today)", và một Zap thứ hai chạy sau trong ngày sẽ xóa họ khỏi nhóm thông qua tác vụ dọn dẹp theo lịch.

## Các kịch bản phổ biến

### Đồng bộ nhóm theo từng dự án

- **Trigger** — VOMO: Participation (được tạo)
- **Action** — Filter by Zapier theo mã dự án (project id), sau đó
- **Action** — B1.church: Add Group Member vào một nhóm B1 có tên tương ứng với dự án VOMO.

Khi dự án VOMO kết thúc, hãy xóa nhóm B1 đó theo cách thủ công (hoặc kết hợp với trigger *Participation deleted* để tự động gỡ thành viên).

### Gửi tin nhắn SMS cảm ơn khi đăng ký

Nối VOMO Participation với Clearstream Send Text hoặc Text In Church Send Message trong cùng một Zap. Cả hai đều có action Zapier chính thức. Xem [Clearstream](./clearstream.md) và [Text In Church](./text-in-church.md).

### Phát hiện người không tiếp tục tham gia

Thiết lập một trigger *Schedule* của Zapier chạy hằng ngày, gọi Find Organizer trong VOMO với danh sách người trong B1 đã tham gia đội phục vụ trong tháng này. Nếu VOMO trả về "not found", nghĩa là họ chưa kích hoạt VOMO và cần được nhắc nhở.

## Giới hạn và lưu ý

- **Email là khóa để ghép dữ liệu.** Dữ liệu VOMO gửi về có địa chỉ email của người dùng nhưng không có mã người trong B1. Những người quyên góp dùng email khác nhau ở hai hệ thống sẽ bị tạo trùng lặp.
- **Hiện chưa có action "Add to Project" trong ứng dụng Zapier của VOMO.** Nếu bạn cần ghi danh người từ B1 vào dự án VOMO, bạn phải gửi POST tới REST API của VOMO từ một bước Webhooks by Zapier. Đây là một tích hợp tùy chỉnh.
- **Các gói miễn phí hoặc gói thấp của VOMO có thể không bao gồm Zapier.** Hãy xác nhận với bộ phận hỗ trợ của VOMO trước khi hứa về thời điểm triển khai.

## Khắc phục sự cố

- **Trigger không bao giờ kích hoạt** — trigger tức thời của VOMO yêu cầu API token còn hiệu lực. Hãy kiểm tra lại Zap; nếu token đã được thay đổi, hãy kết nối lại VOMO.
- **B1 *Add Group Member* báo lỗi 422** — mã nhóm trong action không tồn tại. Mở **B1Admin → Groups**, nhấp vào nhóm, rồi sao chép phần mã nhóm trên đường dẫn URL và dán vào bước Zap.
- **Một tình nguyện viên VOMO tạo ra nhiều người trùng lặp trong B1** — có thể họ đã đăng ký bằng một email khác với email đã có trong B1. Hãy thống nhất email, hoặc thêm một Zapier *Path* để tìm kiếm theo số điện thoại trước khi tạo mới.

## Xem thêm

- [Zapier (tổng quan)](../zapier.md) — phía B1 của mọi kịch bản Zapier
- [Clearstream](./clearstream.md), [Text In Church](./text-in-church.md) — kết hợp đăng ký tình nguyện với xác nhận qua SMS
- [Webhooks (tài liệu dành cho nhà phát triển)](/docs/developer/api/webhooks) — các sự kiện mà VOMO có thể kích hoạt
