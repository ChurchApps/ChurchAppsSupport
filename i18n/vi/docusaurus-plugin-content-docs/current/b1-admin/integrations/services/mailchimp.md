---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Giữ danh sách người nhận (audience) Mailchimp đồng bộ với B1 một cách tự động: thông tin họ tên, email và số điện thoại được chuyển sang; việc thuộc nhóm hoặc danh sách trở thành thẻ (tag) trong Mailchimp; người bị xóa khỏi B1 sẽ được lưu trữ (archive) trong Mailchimp. Tính năng đồng bộ được tích hợp sẵn trong B1, không cần dịch vụ bên thứ ba, không tính phí theo số tác vụ, và các thay đổi được gửi gần như theo thời gian thực thay vì theo lịch hằng đêm.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Một tài khoản [Mailchimp](https://mailchimp.com) có danh sách người nhận (audience) mà bạn muốn B1 quản lý
- Một **API key** của Mailchimp (Mailchimp: biểu tượng hồ sơ → **Account & billing → Extras → API keys**)
- **Audience ID** của bạn (Mailchimp: **Audience → Settings → Audience name and defaults**)
- Một người dùng B1Admin có quyền **Edit Settings**

</div>

## Những gì được đồng bộ

| Thay đổi trong B1 | Tác động trong Mailchimp |
|---|---|
| Thêm hoặc cập nhật người | Thêm/cập nhật người đăng ký (họ, tên, số điện thoại; người đăng ký mới có trạng thái `subscribed`) |
| Xóa người (hoặc xóa theo GDPR) | Người đăng ký được lưu trữ (archive) |
| Người tham gia một nhóm | Thêm thẻ có tên theo tên nhóm |
| Người rời khỏi một nhóm | Gỡ thẻ đó |
| Người được thêm vào một danh sách đã lưu | Thêm thẻ có tên theo tên danh sách |
| Người rời khỏi một danh sách đã lưu | Gỡ thẻ đó |

**Danh sách đã lưu thường là nguồn thẻ tốt hơn.** [Danh sách đã lưu](/docs/b1-admin/people/lists) trong B1 là một nhóm đối tượng dựa trên quy tắc và tự động cập nhật, chẳng hạn "mọi người ở cơ sở phía Bắc" hoặc "thành viên đã đăng ký nhận email mục vụ". Hãy dùng thẻ từ danh sách cho các phân khúc (segment) trong Mailchimp; còn thẻ nhóm phù hợp cho thư gửi đến các đội phục vụ.

Việc đồng bộ là **một chiều** (B1 → Mailchimp) và chỉ thay đổi các trường tiêu chuẩn của Mailchimp, nên sẽ không xung đột với các trường gộp (merge field) hoặc phân khúc mà bạn tự quản lý trong Mailchimp.

## Thiết lập

1. Trong B1Admin, vào **Settings → Developer → Webhooks → New Webhook**.
2. Đặt **Connector Type** thành **Mailchimp**.
3. Dán **Mailchimp API Key** và **Audience ID** của bạn. Khóa được lưu ở dạng mã hóa và sẽ không hiển thị lại.
4. Các sự kiện liên quan đã được chọn sẵn; hãy bỏ chọn những sự kiện bạn không muốn (ví dụ: giữ sự kiện về người nhưng bỏ qua thẻ nhóm).
5. Lưu lại. B1 sẽ xác minh khóa và danh sách người nhận với Mailchimp trước khi chấp nhận. Nếu nhập sai, lỗi sẽ được báo ngay kèm lý do.

Bạn có thể dùng **Send Test** bất cứ lúc nào để kiểm tra lại kết nối. Mỗi lần đồng bộ đều được ghi lại trong lịch sử gửi của webhook, kèm phản hồi thực tế từ Mailchimp. Các lần gửi thất bại sẽ tự động thử lại với khoảng thời gian tăng dần, trong khoảng năm ngày.

## Nhập dữ liệu ban đầu

Trình kết nối chỉ đồng bộ *những thay đổi* kể từ khi được bật; nó không tự động bổ sung dữ liệu cho danh sách người hiện có. Vào ngày thiết lập:

1. Trong B1Admin, vào **People**, tìm những người bạn muốn (hoặc chạy một danh sách đã lưu), rồi nhấn **Export** để tải về tệp CSV.
2. Trong Mailchimp, dùng **Audience → Import contacts** để tải tệp CSV lên, đồng thời áp dụng các thẻ cần thiết trong quá trình nhập.

Việc nhập dữ liệu ban đầu qua công cụ nhập của Mailchimp giúp bạn kiểm soát vấn đề sự đồng ý: chỉ nhập những người thực sự đã đồng ý nhận email từ bạn. Nhập hàng loạt toàn bộ danh sách người dưới dạng người đăng ký có thể vi phạm điều khoản của Mailchimp và luật chống thư rác (CAN-SPAM/GDPR).

## Giới hạn và lưu ý

- **Đồng bộ một chiều.** Việc hủy đăng ký, email bị trả lại và các chỉnh sửa thực hiện trong Mailchimp sẽ không được gửi ngược về B1. Người đã hủy đăng ký trong Mailchimp vẫn có thể nhận email được gửi trực tiếp từ B1. Vì vậy, hãy xem Mailchimp là nguồn chính xác nhất cho sự đồng ý nhận thư hàng loạt.
- **Người không có địa chỉ email sẽ bị bỏ qua** (được ghi nhận trong lịch sử gửi) vì người đăng ký trong Mailchimp được xác định theo email.
- **Thay đổi địa chỉ email sẽ tạo người đăng ký mới.** Mailchimp nhận diện người dùng qua email, nên nếu bạn đổi email của một người trong B1, họ sẽ được thêm dưới địa chỉ mới. Người đăng ký cũ vẫn tồn tại cho đến khi bạn lưu trữ nó trong Mailchimp.
- **Chỉ các trường tiêu chuẩn được đồng bộ**: họ, tên và số điện thoại. Trạng thái thành viên, cơ sở và các trường tùy chỉnh của B1 không được ánh xạ sang trường gộp của Mailchimp trong phiên bản này; hãy dùng thẻ danh sách để phân khúc.
- **Tên thẻ là tên nhóm/danh sách.** Khi đổi tên nhóm hoặc danh sách, việc gắn thẻ sẽ dùng tên mới. Thẻ cũ vẫn còn trên những người đăng ký hiện có cho đến khi bạn gỡ nó trong Mailchimp.
- **Giới hạn số liên hệ của Mailchimp vẫn được áp dụng.** Nếu một đợt đồng bộ đẩy danh sách miễn phí vượt quá giới hạn, lịch sử gửi sẽ ghi lỗi `Member limit reached`.

## Các công thức khác (Zapier / Make)

Mọi nhu cầu ngoài việc đồng bộ danh sách người nhận, chẳng hạn gắn thẻ người quyên góp khi có `donation.created`, chiều ngược lại từ Mailchimp sang B1, hoặc đồng bộ sang một nền tảng email khác (Constant Contact, Brevo, v.v.), vẫn có thể thực hiện qua [Zapier](../zapier) hoặc [Make](../make). Các công cụ này được kích hoạt bởi cùng các sự kiện webhook:

- **Gắn thẻ người quyên góp:** B1 *New Donation* → B1 *Find Person* → Mailchimp *Add Subscriber to Tag* (`Gave-2026`)
- **Hai chiều:** Mailchimp *New Subscriber* → B1 *Create Person*

Nếu trước đây bạn đã thiết lập đồng bộ người và nhóm qua Zapier, hãy tắt các Zap đó sau khi bật trình kết nối gốc. Chạy song song cả hai sẽ xử lý mỗi sự kiện hai lần và tốn số tác vụ Zapier một cách vô ích.

## Khắc phục sự cố

- **Lưu thất bại với thông báo "Mailchimp rejected the API key"**: khóa đã bị thu hồi hoặc nhập sai. Khóa phải kết thúc bằng hậu tố trung tâm dữ liệu như `-us21`.
- **Lưu thất bại với thông báo "audience not found"**: Audience ID không tồn tại trong tài khoản đó. Hãy sao chép lại từ **Audience → Settings → Audience name and defaults** (đây không phải là tên của danh sách người nhận).
- **Một người chưa bao giờ xuất hiện trong Mailchimp**: hãy kiểm tra lịch sử gửi của webhook. Thông báo "Skipped: person has no email address" có nghĩa đúng như vậy; mã lỗi `4xx` từ Mailchimp sẽ hiển thị lý do trong nội dung phản hồi.
- **Việc gửi dữ liệu dừng hẳn**: sau nhiều lần gửi thất bại liên tiếp, webhook sẽ tự động bị tắt. Hãy khắc phục nguyên nhân (thường là khóa bị thu hồi), bật lại webhook, rồi dùng **Send Test** để xác nhận.

## Xem thêm

- [Webhooks (tài liệu dành cho nhà phát triển)](/docs/developer/api/webhooks): nền tảng bên dưới, danh mục sự kiện, ngữ nghĩa gửi lại và thử lại
- [Saved Lists](/docs/b1-admin/people/lists): các nhóm đối tượng dựa trên quy tắc, tương ứng tự nhiên với thẻ Mailchimp
- [Zapier (tổng quan)](../zapier): dành cho các công thức ngoài việc đồng bộ danh sách người nhận
