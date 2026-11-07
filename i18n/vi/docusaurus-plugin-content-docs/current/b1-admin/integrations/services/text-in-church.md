---
title: "Text In Church"
description: "Kết nối B1 Admin với Text In Church qua Zapier: tạo khóa API, xây Zap từ thẻ kết nối đến B1 và đồng bộ thành viên nhóm."
---

# Text In Church

<div class="article-intro">

[Text In Church](https://textinchurch.com) gộp SMS và các quy trình nhỏ giọt (drip) cùng với tự động hóa thẻ kết nối. Ứng dụng Zapier của họ hỗ trợ cả hai chiều: đưa các sự kiện từ B1 vào một quy trình của Text In Church, và lấy các trigger từ thẻ kết nối hoặc liên hệ mới từ phía bên kia để đưa vào B1.

</div>

<div class="prereqs">
<h4>Trước Khi Bắt Đầu</h4>

- Một tài khoản [Text In Church](https://textinchurch.com) thuộc gói có tích hợp Zapier
- Một tài khoản [Zapier](https://zapier.com)
- Một người dùng B1Admin có quyền **Edit Settings**

</div>

## Những Gì Bạn Có Thể Kết Nối

| Chiều | Trigger | Hành động |
|---|---|---|
| B1 → Text In Church | B1 `person.created` | Tạo/Cập nhật người + Thêm vào nhóm |
| B1 → Text In Church | B1 `form.submission.created` | Gửi tin nhắn văn bản qua nhóm phụ trách |
| B1 → Text In Church | B1 `group.member.added` | Thêm vào nhóm (đồng bộ thành viên nhóm) |
| Text In Church → B1 | Connect Card Submitted | B1: Tạo người + Thêm thành viên nhóm |
| Text In Church → B1 | Person Created | B1: Tạo người |
| Text In Church → B1 | Person Joined Group | B1: Thêm thành viên nhóm |

Các hành động của Text In Church còn bao gồm *Send Text Message*, *Send Voice Broadcast*, *Create Task*, *Find Person/Group*, và thêm hoặc xóa thành viên nhóm.

## Thiết Lập

### 1. Tạo khóa API của B1

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — bắt buộc đối với các Zap được kích hoạt từ B1
- `people:read`, `people:write` — để tìm hoặc tạo người
- `groups:write` — để đồng bộ nhóm
- (Tùy chọn) `donations:write` nếu bạn muốn gửi xác nhận quà tặng sang TIC

### 2. Kết nối Text In Church với Zapier

Làm theo [hướng dẫn tích hợp Zapier của Text In Church](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration). Họ sẽ tạo mã thông báo API từ bên trong bảng điều khiển TIC.

### 3. Xây dựng Zap từ thẻ kết nối đến B1

Đây là chiều phổ biến nhất. Các thẻ kết nối được gửi từ TIC sẽ tự động trở thành người mới trong B1.

1. **Trigger** — Text In Church: Connect Card Submitted.
2. **Hành động** — B1.church: Find Person (theo email).
3. **Nhánh** — rẽ theo kết quả tìm thấy / không tìm thấy:
   - Không tìm thấy → B1.church: Create Person.
   - Tìm thấy → tiếp tục.
4. **Hành động** — B1.church: Add Group Member vào nhóm "New Contact".

Bật Zap. Thẻ kết nối tiếp theo được gửi qua TIC sẽ tự động xuất hiện trong **B1Admin → People**.

## Các Công Thức Thường Dùng

### Kích hoạt quy trình kiểu thẻ kết nối từ biểu mẫu B1

- **Trigger** — B1.church: New Form Submission (lọc theo mã biểu mẫu "I'm new here")
- **Hành động** — Text In Church: Create/Update Person, ánh xạ các câu trả lời về email / số điện thoại / họ tên từ biểu mẫu
- **Hành động** — Text In Church: Add to Group, trong đó nhóm đã được gắn sẵn một quy trình chào mừng

### Đồng bộ thành viên nhóm

- **Trigger** — B1.church: New Group Member, lọc theo một `groupId` cụ thể
- **Hành động** — Text In Church: Add to Group (cùng người đó, đồng bộ nhóm). Kết hợp với một Zap `group.member.removed` nếu bạn muốn đồng bộ đầy đủ.

### Nhắn tin cho người phụ trách khi có người tham gia

- **Trigger** — B1.church: New Group Member
- **Hành động** — Text In Church: Send Text Message, người nhận = số điện thoại của người phụ trách nhóm, nội dung = `"{first} {last} vừa tham gia {group}"`.

## Giới Hạn & Lưu Ý

- **Ứng dụng Zapier của TIC phụ thuộc vào gói dịch vụ.** Nếu tích hợp Zapier bị mờ trong bảng điều khiển TIC, hãy liên hệ bộ phận hỗ trợ của TIC để bật tính năng này cho gói của bạn.
- **Mã nhóm là của TIC, không phải của B1.** Khi đồng bộ, bạn sẽ cần duy trì một bảng ánh xạ ở đâu đó (một *Lookup Table* của Zapier, hoặc mã cố định trong từng Zap).
- **Gửi tin nhắn văn bản tốn credit.** Mỗi Zap kích hoạt *Send Text* sẽ trừ vào hạn mức SMS của TIC.

## Khắc Phục Sự Cố

- **Trigger Connect-Card không kích hoạt** — TIC cần bật công tắc tích hợp Zapier. Ngoài ra, hãy kiểm tra biểu mẫu bạn dùng để thử nghiệm đã được cấu hình là "Connect Card", không phải khảo sát thông thường.
- **Create Person trong B1 bị lỗi 401** — khóa API sai, đã bị thu hồi, hoặc thiếu quyền `people:write`. Hãy tạo lại khóa.
- **Trùng lặp người trong B1** — TIC gửi cả *Person Created* và *Connect Card Submitted* cho cùng một sự kiện. Hãy chọn một trong hai làm nguồn dữ liệu chính và thêm một Zapier Filter cho trigger còn lại.

## Xem Thêm

- [Clearstream](./clearstream.md) — nền tảng SMS thay thế, có cấu trúc Zapier tương tự
- [Zapier (tổng quan)](../zapier.md) — phía B1 của mọi công thức Zapier
- [Hướng dẫn Zapier của Text In Church](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration) (tài liệu của TIC)
