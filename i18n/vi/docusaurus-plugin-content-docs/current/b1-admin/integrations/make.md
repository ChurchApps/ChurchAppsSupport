---
title: "Make"
description: "Kết nối B1 Admin với Make để tự động hóa quy trình: tạo khóa API, thiết lập trình kích hoạt và hành động B1.church, và khắc phục lỗi thường gặp."
---

# Make

<div class="article-intro">

[Make](https://www.make.com) (trước đây là Integromat) là nền tảng tự động hóa quy trình làm việc trực quan, về tinh thần tương tự Zapier nhưng có logic linh hoạt hơn và chi phí thấp hơn khi quy mô lớn. Ứng dụng Make chính thức của B1.church cho phép bạn xây dựng các "kịch bản" phản ứng ngay lập tức với các sự kiện B1 và ghi dữ liệu trở lại B1.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Một tài khoản [Make](https://www.make.com) (gói miễn phí đủ cho các quy trình nhỏ)
- Một quản trị viên nhà thờ có quyền **Edit Settings** trong B1Admin
- Ý tưởng sơ bộ về kịch bản bạn muốn xây dựng

</div>

## Mô-đun

| Loại | Chức năng | Sự kiện B1 / endpoint |
|---|---|---|
| **Instant Trigger** | Watch Events | bất kỳ sự kiện B1 đã đăng ký nào (`person.created`, `donation.created`, …) |
| **Action** | Create Person | thêm một người mới |
| **Action** | Add Donation | ghi nhận một khoản quyên góp |
| **Action** | Add Group Member | thêm một người vào nhóm |
| **Search** | Search People | tìm người theo tên hoặc email |

Trình kích hoạt tức thì cho phép bạn chọn sự kiện cần lắng nghe. Mỗi kịch bản có một mô-đun kích hoạt, được cấu hình theo từng sự kiện.

## Thiết lập

### 1. Tạo khóa API B1

1. Trong B1Admin, vào **Settings → Developer → API Keys**.
2. Nhấn **New API Key**, đặt tên là "Make", và cấp các quyền (scope) bạn cần.
3. **Thêm `settings:write`** nếu bất kỳ kịch bản nào dùng trình kích hoạt tức thì. Make sẽ đăng ký webhook thay bạn khi kịch bản được bật.
4. Cũng cấp các quyền mà mô-đun hành động cần (ví dụ `donations:write` cho mô-đun Add Donation).
5. Lưu và sao chép khóa `cak_…`.

### 2. Cài đặt kết nối

1. Trong Make, tạo kịch bản mới và kéo mô-đun trigger **B1.church** vào canvas.
2. Khi được yêu cầu, chọn **Create a connection**. Dán khóa API vào trường *API Key* và giữ nguyên *API Base URL* là `https://api.churchapps.org` (trừ khi bạn đang thử nghiệm trên môi trường staging).
3. Nhấn **Save**. Make sẽ kiểm tra khóa bằng cách đọc hồ sơ nhà thờ của bạn.

Kết nối được lưu trong tài khoản Make và dùng lại cho các kịch bản khác.

### 3. Cấu hình trigger

1. Mở phần cài đặt của mô-đun **Watch Events**.
2. Chọn sự kiện bạn muốn, ví dụ `donation.created`.
3. Lưu lại. Make sẽ tạo một URL webhook riêng và lưu trữ nội bộ.

### 4. Thêm các mô-đun phía sau

Kéo bất kỳ mô-đun ứng dụng nào trong hàng trăm mô-đun của Make vào canvas, như Mailchimp, Google Sheets, Slack, HubSpot, endpoint HTTP riêng của bạn, v.v. Ánh xạ đầu ra của trigger (`event`, `churchId`, `data.id`, `data.amount`, …) vào các trường đầu vào của chúng. Các mô-đun flatten / iterator / router / aggregator của Make cho phép bạn xây dựng luồng rẽ nhánh và song song, điều khó thực hiện trên Zapier.

### 5. Bật kịch bản

Bật **Active** trong phần đầu kịch bản. Make sẽ gọi `POST /membership/webhooks` của B1 để đăng ký URL. Kể từ thời điểm đó, mọi sự kiện B1 phù hợp sẽ chạy qua kịch bản theo thời gian thực.

Tắt kịch bản sẽ gọi `DELETE /membership/webhooks/{id}` để không còn đăng ký mồ côi nào.

## Các công thức phổ biến

### Đồng bộ quyên góp vào Google Sheet để bộ phận tài chính xem xét

- **Trigger**: B1: Watch Events (`donation.created`)
- **Action**: Google Sheets: Add a Row. Ánh xạ `data.donationDate`, `data.amount`, `data.personId`, `data.method`, `data.batchId` vào các cột của bảng tính.

### Thông báo Slack có điều kiện theo số tiền quyên góp

- **Trigger**: B1: Watch Events (`donation.created`)
- **Router**:
  - Nhánh A, Filter: `data.amount >= 1000` → Slack: đăng vào `#major-gifts`
  - Nhánh B, trường hợp còn lại → Slack: đăng vào `#donations`

### Người mới → CRM + email chào mừng + Slack

- **Trigger**: B1: Watch Events (`person.created`)
- **Action**: HubSpot: Create Contact
- **Action**: Mailgun: Send Welcome Email
- **Action**: Slack: Thông báo đến `#new-people` (chạy song song, dùng router của Make)

## Cách hoạt động của trình kích hoạt tức thì

Trình kích hoạt tức thì dựa trên webhook, không phải polling. Khi được kích hoạt, Make gọi `POST /membership/webhooks` với URL do Make tạo và sự kiện bạn đã chọn. Khi sự kiện xảy ra trong B1, B1 sẽ POST dữ liệu đến URL của Make và kịch bản của bạn chạy trong vài giây. Tắt kịch bản sẽ xóa webhook.

Trigger chỉ kích hoạt với các sự kiện xảy ra **khi kịch bản đang bật**. Không có cơ chế bổ sung dữ liệu cũ.

## Giới hạn và lưu ý

- **Một sự kiện cho mỗi mô-đun Watch Events.** Để lắng nghe nhiều sự kiện trong một kịch bản, hãy thêm nhiều mô-đun trigger vào các kịch bản riêng biệt (hoặc dùng một mô-đun duy nhất với danh sách sự kiện hợp nhất, xem bên dưới).
- **Không hỗ trợ xác minh chữ ký.** Make không chuyển `X-B1-Signature` đến kịch bản. Ranh giới tin cậy là URL webhook riêng của từng kịch bản, khó đoán. Đây là thông lệ bình thường của Make. Nếu bạn cần kiểm tra chữ ký rõ ràng, hãy xây dựng tích hợp tùy chỉnh bằng [SDK](/docs/developer/api/webhooks#sdk-support).
- **Số lượng thao tác.** Mọi lệnh gọi API từ mô-đun hành động đều được tính vào hạn mức thao tác Make của bạn, không tính vào bất kỳ mục nào phía B1.

## Khắc phục sự cố

- **Kiểm tra kết nối thất bại**: thường là do gõ sai khóa API. Sao chép lại từ B1Admin (khóa đầy đủ chỉ hiển thị một lần; nếu đã mất, hãy tạo khóa mới).
- **Mô-đun trigger không kích hoạt**: kiểm tra **Settings → Developer → Webhooks** trong B1Admin. Nếu sau khi kích hoạt kịch bản bạn không thấy dòng "Make — &lt;event&gt;", khóa đang thiếu `settings:write`. Cập nhật khóa và kích hoạt lại.
- **Hành động trả về `403 Forbidden`**: khóa API thiếu quyền cho endpoint đó. Ví dụ, Add Donation cần `donations:write`. Cập nhật khóa trong B1Admin và kiểm tra lại.

## Tùy chỉnh ứng dụng

Ứng dụng Make của B1.church là mã nguồn mở. Các định nghĩa JSON nằm trong repo `B1Integrations/Make/`. Nếu bạn cần một mô-đun chưa có (ví dụ một hành động mới cho endpoint chưa được hỗ trợ), hãy mở issue hoặc PR tại đó.

## Xem thêm

- [Zapier](./zapier.md): cùng mô hình với giao diện đơn giản hơn và danh mục ứng dụng lớn hơn
- [Slack & Discord](./slack-discord.md): thông báo chat tích hợp sẵn mà không cần Make
- [Webhooks (tài liệu cho nhà phát triển)](/docs/developer/api/webhooks)
