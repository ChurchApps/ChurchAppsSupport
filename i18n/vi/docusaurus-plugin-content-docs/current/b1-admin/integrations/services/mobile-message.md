---
title: "Mobile Message"
---

# Mobile Message

<div class="article-intro">

[Mobile Message](https://mobilemessage.com.au) là API SMS của Úc, được nhiều hội thánh tại Úc ưa chuộng vì cung cấp số điện thoại địa phương và giá cước SMS cạnh tranh tại Úc, trong khi Clearstream và Text In Church chủ yếu phục vụ thị trường Mỹ. Hiện Mobile Message chưa có ứng dụng Zapier chính thức, nhưng họ công bố một REST API công khai, nên bạn có thể kết nối các sự kiện B1 với tin nhắn Mobile Message thông qua **Webhooks by Zapier** (hoặc module HTTP của Make) chỉ trong vài phút.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Một tài khoản [Mobile Message](https://mobilemessage.com.au) với Sender ID đã đăng ký và thông tin API (tên người dùng API và mật khẩu API trong *Account → API Settings*)
- Một tài khoản [Zapier](https://zapier.com) (hoặc [Make](https://www.make.com))
- Một người dùng B1Admin có quyền **Edit Settings**

</div>

## Những gì bạn có thể kết nối

API của Mobile Message hoạt động theo kiểu "gửi SMS": không có trigger, chỉ có tin nhắn gửi đi. Vì vậy, tất cả các công thức đều theo hướng B1 → SMS:

| Hướng | Trigger trong B1 | Kết quả |
|---|---|---|
| B1 → Mobile Message | `person.created` | Tin nhắn chào mừng gửi đến người mới |
| B1 → Mobile Message | `donation.created` | Tin nhắn cảm ơn gửi đến người quyên góp |
| B1 → Mobile Message | `form.submission.created` | Nhắn tin cho nhóm trực |
| B1 → Mobile Message | `event.created` | Gửi tin nhắn nhắc nhở hàng loạt đến một danh sách |

## Thiết lập

### 1. Tạo khóa API cho B1

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — để đăng ký webhook trigger
- `people:read` — để tra cứu số điện thoại của người nhận từ `personId`

### 2. Tạo Zap với Webhooks by Zapier

1. **Trigger** — B1.church: chọn sự kiện bạn muốn (ví dụ: New Donation).
2. **Action** — B1.church: Find Person (dùng `data.personId`) để lấy số điện thoại và tên.
3. **Action** — Webhooks by Zapier: **POST**. Cấu hình như bên dưới.

Các thiết lập của bước POST:

- **URL** — `https://api.mobilemessage.com.au/v1/messages`
- **Payload Type** — JSON
- **Data** —
  ```json
  {
    "messages": [
      {
        "to": "{{step2_phone}}",
        "message": "Cảm ơn món quà của bạn, {{step2_first_name}}!",
        "sender": "YourChurch"
      }
    ]
  }
  ```
- **Headers** — `Content-Type: application/json` (Webhooks by Zapier tự động thêm mục này)
- **Basic Auth** — điền vào trường *Basic Auth* theo dạng `<api_username>|<api_password>` (Zapier sẽ chuyển thành header `Authorization: Basic …` đúng định dạng)

Bật Zap. Gửi một khoản quà thử nghiệm trong B1Admin để kiểm tra xem tin nhắn có đến không.

## Các công thức thường dùng

### Nhắc nhở sự kiện vào buổi sáng

- **Trigger** — Schedule by Zapier (hằng ngày, 7 giờ sáng)
- **Action** — B1.church: Find Events cho ngày hôm nay (hoặc dùng bước Find với bộ lọc ngày cố định, hoặc lưu danh sách sự kiện trong ngày vào Google Sheet)
- **Action** — Webhooks by Zapier: POST đến Mobile Message kèm danh sách sự kiện, gửi cho một nhóm người đăng ký

### Dùng endpoint hàng loạt để gửi tin nhắn cho cả danh sách

Endpoint `/v1/messages` của Mobile Message chấp nhận tối đa 10.000 tin nhắn mỗi lần gọi. Để gửi tin nhắn cho một nhóm trong B1:

- **Trigger** — B1.church: New Form Submission (lọc theo một biểu mẫu cụ thể)
- **Action** — B1.church: List Group Members cho nhóm mục tiêu (thông qua bước *Webhooks by Zapier — GET* trên `/membership/groupmembers?groupId=…`)
- **Action** — Formatter by Zapier → Utilities → Line-itemize để chuyển phản hồi thành mảng `messages`
- **Action** — Webhooks by Zapier: POST toàn bộ mảng đến `/v1/messages`

### Thay thế bằng Make

Nếu bạn thích Make, hãy thêm module **HTTP — Make a request** sau trigger B1 Watch Events, rồi cấu hình tương tự (POST, Basic Auth, nội dung JSON). Xem [tổng quan về Make](../make) để biết phần cấu hình phía B1.

## Giới hạn và lưu ý

- **Basic Auth là phương thức xác thực duy nhất** — Mobile Message cấp tên người dùng và mật khẩu từ bảng điều khiển. Hãy coi cả hai là thông tin bí mật.
- **`sender` phải là Sender ID đã đăng ký** trong tài khoản Mobile Message của bạn, nếu không yêu cầu gửi sẽ trả về `400 Invalid sender`. Quy định của Úc yêu cầu đăng ký Sender ID.
- **Số điện thoại Úc** có thể ở dạng `0412345678` (nội địa) hoặc `+61412345678` (quốc tế). API chấp nhận cả hai, nhưng nếu bạn cũng gửi tin nhắn ra nước ngoài, hãy chuẩn hóa về dạng `+61…`.
- **Tối đa 10.000 tin nhắn mỗi yêu cầu** — hữu ích cho các đợt gửi hàng loạt, nhưng một lần gửi webhook từ B1 hiếm khi tạo ra danh sách lớn như vậy; hãy dành endpoint hàng loạt cho các Zap chạy theo lịch.

## Xử lý sự cố

- **POST trả về `401 Unauthorized`** — thông tin Basic Auth không đúng. Hãy sao chép lại từ *Account → API Settings* trong bảng điều khiển Mobile Message. Lưu ý rằng tên người dùng mặc định là email tài khoản của bạn, không phải một khóa API riêng.
- **POST trả về `400 Invalid sender`** — giá trị `sender` không phải là Sender ID đã đăng ký trong tài khoản của bạn. Hãy đăng ký trước trong bảng điều khiển Mobile Message.
- **Tin nhắn đến nhưng bị cắt ngắn** — Mobile Message chia tin nhắn dài hơn khoảng 160 ký tự thành nhiều phần, và bạn bị tính phí theo từng phần. Hãy kiểm tra nội dung phản hồi, nơi có ghi số lượng phần.

## Xem thêm

- [Clearstream](./clearstream), [Text In Church](./text-in-church) — các nhà cung cấp SMS khác có ứng dụng Zapier riêng (không cần bước Webhooks by Zapier)
- [Zapier (tổng quan)](../zapier) — phần cấu hình phía B1 cho mọi công thức Zapier
- [Tài liệu API của Mobile Message](https://mobilemessage.com.au/api-documentation)
