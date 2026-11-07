---
title: "Slack & Discord"
description: "Đăng sự kiện B1 Admin như người mới, khoản dâng và phản hồi biểu mẫu lên kênh Slack hoặc Discord qua webhook đến, không cần Zapier."
---

# Slack & Discord

<div class="article-intro">

Gửi thông báo dễ đọc từ B1 trực tiếp đến kênh Slack hoặc Discord: người mới, tiền quyên góp, đăng ký nhóm, biểu mẫu đã gửi, sự kiện lịch, và nhiều loại khác. Không cần tài khoản bên thứ ba, không cần Zap để bảo trì. B1 tự định dạng lại sự kiện thành tin nhắn chat và gửi đến URL webhook của kênh.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Bạn cần quyền **Edit Settings** trong B1Admin
- Một quản trị viên trong không gian làm việc Slack hoặc máy chủ Discord của bạn để tạo Incoming Webhook cho kênh
- Quyết định kênh bạn muốn nhận thông báo (bạn có thể dùng cùng một kênh cho nhiều loại sự kiện, hoặc tách ra nhiều kênh)

</div>

## Cách hoạt động

B1 có sẵn một **Connector Type** dành cho các nền tảng chat. Khi bạn tạo webhook với loại **Slack** hoặc **Discord**, công cụ webhook vẫn thực hiện quy trình gửi, thử lại và gắn header chữ ký như bình thường. Tuy nhiên, nội dung gửi đi được định dạng lại từ phong bì `{event,churchId,data}` thông thường của B1 thành tin nhắn ngắn `{text}` (Slack) hoặc `{content}` (Discord) mà các dịch vụ này yêu cầu.

Ngoài luồng webhook gửi đi hiện có, không có máy chủ B1 nào kết nối đến Slack theo từng nhà thờ. Không có gì mới cần lưu trữ và không phát sinh chi phí thêm.

## Slack: Từng bước

### 1. Lấy URL Incoming Webhook của Slack

1. Mở [api.slack.com/apps](https://api.slack.com/apps) trong không gian làm việc Slack mà bạn muốn nhận thông báo.
2. Nhấp **Create New App → From scratch**, đặt tên như "B1 Notifications", rồi chọn không gian làm việc.
3. Ở thanh điều hướng bên trái, chọn **Incoming Webhooks** và bật **Activate Incoming Webhooks** sang *On*.
4. Nhấp **Add New Webhook to Workspace**, chọn kênh (ví dụ `#donations`), rồi nhấp **Allow**.
5. Slack sẽ đưa bạn về trang có một **Webhook URL** mới, dạng `https://hooks.slack.com/services/T0XXXXXXX/B0YYYYYYY/zzz…`. Hãy sao chép URL này. Đây là thông tin duy nhất B1 cần.

:::caution
Hãy coi URL webhook của Slack là bí mật. Bất kỳ ai có URL này đều có thể đăng tin nhắn tùy ý lên kênh. Nếu bạn vô tình để lộ, hãy tạo lại URL từ trang ứng dụng Slack (việc tạo lại chỉ đổi URL, sau đó bạn cần cập nhật B1 cho khớp).
:::

### 2. Kết nối trong B1Admin

1. Trong B1Admin, vào **Settings → Developer → Webhooks**.
2. Nhấp **New Webhook**.
3. Điền thông tin:
   - **Name**: tên dễ đọc như "Donations → #donations". Chỉ nhóm của bạn nhìn thấy tên này.
   - **Connector Type**: chọn **Slack**.
   - **Payload URL**: dán URL Slack từ bước 1.
   - **Events**: chọn các sự kiện muốn gửi dưới dạng tin nhắn. Với kênh tiền quyên góp, chỉ cần `donation.created`. Với kênh #people, hãy thử `person.created` và `group.member.added`.
4. Nhấp **Save**. Hộp thoại "Signing Secret" sẽ xuất hiện. Với Slack, bạn có thể bỏ qua (Slack không xác minh chữ ký của B1) và đóng hộp thoại.

### 3. Kiểm tra

Mở lại webhook từ danh sách và nhấp **Send Test Event**. Trong vòng một hoặc hai giây, một tin nhắn như

> 💝 New donation: $50.00

sẽ xuất hiện trong kênh Slack của bạn. Đồng thời, một hàng mới sẽ hiện trong bảng **Recent Deliveries** trên cùng màn hình với trạng thái `succeeded`. Vậy là xong.

## Discord: Từng bước

### 1. Lấy URL Webhook của Discord

1. Trong máy chủ Discord, di chuột đến kênh bạn muốn nhận thông báo và nhấp biểu tượng **⚙ bánh răng** (Edit Channel).
2. Mở **Integrations → Webhooks → New Webhook**.
3. Đặt tên và (tùy chọn) chọn ảnh đại diện, rồi nhấp **Copy Webhook URL**. URL có dạng `https://discord.com/api/webhooks/123…/abc…`.

### 2. Kết nối trong B1Admin

Quy trình giống hệt Slack ở trên, chỉ khác là đặt **Connector Type** thành **Discord**. Dán URL Discord vào **Payload URL** rồi lưu.

:::tip
Bạn **không** cần thêm `/slack` vào cuối URL Discord. B1 gửi nội dung `{content}` theo định dạng gốc của Discord, không phải định dạng tương thích với Slack. Chỉ cần dán URL mà Discord cung cấp.
:::

### 3. Kiểm tra

Dùng nút **Send Test Event** như trên. Discord sẽ hiển thị tin nhắn trong kênh đã chọn, và nhật ký gửi sẽ chuyển sang `succeeded`.

## Tin nhắn trông như thế nào

| Sự kiện | Tin nhắn ví dụ |
|---|---|
| `person.created` | 👤 New person added: Jordan Rivera |
| `person.updated` | 👤 Person updated: Jordan Rivera |
| `group.created` | 👥 New group created: Tuesday Bible Study |
| `group.member.added` | ➕ Someone was added to a group |
| `donation.created` | 💝 New donation: $50.00 |
| `donation.updated` | 💝 Donation updated: $75.00 |
| `attendance.recorded` | ✅ Attendance recorded |
| `form.submission.created` | 📝 New form submission received |
| `event.created` | 📅 New event: Easter Service |

Danh sách đầy đủ nằm trong [danh mục sự kiện webhook](/docs/developer/api/webhooks#event-catalog). Bất kỳ sự kiện nào trong đó đều có thể được chuyển đến Slack hoặc Discord.

## Mỗi chủ đề một kênh

Bạn không cần đưa mọi sự kiện vào cùng một nơi. Hầu hết các nhà thờ thiết lập vài webhook:

- Kênh **#donations** chỉ nhận `donation.created`
- Kênh **#new-people** nhận `person.created` và `group.member.added`
- Kênh **#admin-alerts** nhận các sự kiện ít xảy ra hơn như `form.submission.created`

Không giới hạn số lượng webhook cho mỗi nhà thờ. Mỗi webhook hoạt động độc lập. Xóa hoặc tắt một webhook không ảnh hưởng đến các webhook khác.

## Kiểm tra các lần gửi

Bảng **Recent Deliveries** trong trình chỉnh sửa webhook hiển thị 50 lần thử gần nhất. Nhấp vào một hàng để xem chính xác nội dung đã gửi và phản hồi nhận được. Với connector Slack, nội dung là `{"text":"💝 New donation: $50.00"}`, không phải phong bì `{event,churchId,...}` gốc, vì B1 định dạng lại trước khi gửi.

Nếu có lỗi (huy hiệu đỏ `failed` hoặc `exhausted`), hộp thoại sẽ hiển thị mã trạng thái HTTP và nội dung phản hồi, giúp bạn thấy chính xác Slack hoặc Discord không chấp nhận điều gì. Thường đó là lỗi sao chép hoặc dán URL.

## Xử lý sự cố

- **Không có tin nhắn xuất hiện và trạng thái gửi là `400`**: thường là Connector Type đang đặt là **Standard** trong khi URL là của Slack hoặc Discord. Slack và Discord từ chối phong bì gốc. Hãy chuyển danh sách thả xuống sang **Slack** hoặc **Discord** rồi gửi lại thử nghiệm.
- **Webhook tự động bị tắt**: sau 3 lần gửi thất bại liên tiếp, B1 sẽ tắt webhook. Hãy sửa URL (hoặc tạo lại URL trên Slack hoặc Discord) rồi bật lại **Active**.
- **Tin nhắn đến nhưng thiếu chi tiết**: mọi nền tảng chat đều giới hạn kích thước tin nhắn. Tin nhắn của B1 được thiết kế ngắn gọn có chủ đích. Để có thông báo phong phú hơn, hãy dùng [Zapier](./zapier.md) hoặc [Make](./make.md) để soạn tin nhắn Slack đầy đủ hơn thông qua các hành động Slack của chúng.

## Đổi Connector Type sau này

Bạn có thể đổi Connector Type của một webhook hiện có. Thay đổi sẽ có hiệu lực ở lần gửi tiếp theo. Nếu bạn chuyển từ Slack sang Standard, hãy trỏ URL đến endpoint HTTPS của riêng bạn. Signing secret đã được cấp khi tạo webhook vẫn giữ nguyên và có thể dùng để xác minh phong bì gốc.

## Xem thêm

- [Zapier](./zapier.md): cho các quy trình nhiều bước được kích hoạt bởi sự kiện B1
- [Make](./make.md): trình xây dựng kịch bản trực quan
- [Webhooks (tài liệu dành cho nhà phát triển)](/docs/developer/api/webhooks): định dạng payload và chữ ký đầy đủ nếu bạn muốn trỏ webhook đến máy chủ riêng
