---
title: "Kiểm tra kế hoạch & Thông báo"
description: "Kiểm tra các kế hoạch phục vụ trong B1 Admin để tìm vị trí chưa có người, xung đột lịch và tình nguyện viên đã đăng ký bận, sau đó gửi thông báo đẩy cho toàn bộ đội chỉ bằng một cú nhấp chuột."
---

# Kiểm tra kế hoạch & Thông báo cho tình nguyện viên

<div class="article-intro">

B1 Admin tự động kiểm tra kế hoạch của bạn trước Chủ nhật — các vị trí chưa có người, xung đột lịch và tình nguyện viên đã đăng ký bận vào ngày đó. Khi mọi thứ đã ổn, bạn có thể thông báo cho toàn bộ đội chỉ bằng một cú nhấp chuột.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Tạo [kế hoạch phục vụ](./plans.md) và phân công tình nguyện viên vào các vị trí
- Thêm [giờ phục vụ](./plans.md) vào kế hoạch để tính năng phát hiện xung đột có thể kiểm tra các khoảng thời gian trùng nhau
- Đảm bảo tình nguyện viên đã [cài đặt B1 App](../../b1-church/getting-started/installing-pwa.md) để nhận thông báo đẩy

</div>

## Bảng kiểm tra

Mỗi kế hoạch đều có bảng **Kiểm tra** (Validation), tự động chạy khi bạn xây dựng kế hoạch. Bảng này kiểm tra ba điều:

### Vị trí chưa có người
Nếu một vị trí cần nhiều người hơn số người hiện được phân công, bảng kiểm tra sẽ liệt kê chính xác những gì còn thiếu, ví dụ: *“Kỹ thuật âm thanh: cần thêm 1 người.”* Bạn có thể nhìn nhanh để biết kế hoạch đã đủ người trước khi tuần đó đến.

### Xung đột lịch
Nếu một tình nguyện viên được phân công vào hai vị trí có thời gian trùng nhau trong cùng một kế hoạch, bảng kiểm tra sẽ đánh dấu xung đột, ví dụ: *“Jane Smith: trùng giờ giữa Người dẫn thờ phượng và Điểm danh thiếu nhi trong Buổi thờ phượng Chủ nhật.”* Điều này giúp phát hiện việc đặt trùng lịch trước khi nó trở thành vấn đề vào sáng Chủ nhật.

### Ngày đăng ký bận
Tình nguyện viên có thể đặt những ngày họ không thể tham gia trong B1 App. Nếu ai đó được phân công vào một kế hoạch rơi vào một trong các ngày bận của họ, bảng kiểm tra sẽ tự động hiển thị xung đột để bạn có thể tìm người thay thế.

### Xung đột giữa các kế hoạch
Kiểm tra cũng quét trên tất cả các kế hoạch của bạn cùng lúc. Nếu cùng một tình nguyện viên được phân công vào hai kế hoạch khác nhau có thời gian trùng nhau — ví dụ, buổi 9 giờ sáng và buổi 10 giờ sáng cùng kéo dài đến 10 giờ 30 — B1 Admin sẽ đánh dấu người đó là bị đặt trùng lịch giữa các kế hoạch.

:::tip
Bạn không cần làm gì để chạy kiểm tra — nó tự cập nhật mỗi khi bạn thêm hoặc thay đổi một phân công. Chỉ cần theo dõi bảng khi bạn đang xây dựng kế hoạch.
:::

## Thông báo cho tình nguyện viên

Khi kế hoạch đã hoàn tất, bạn có thể thông báo cho tất cả tình nguyện viên được phân công cùng lúc ngay từ bảng kiểm tra.

1. Mở kế hoạch và cuộn đến bảng **Kiểm tra**
2. Nếu có tình nguyện viên chưa được thông báo, bạn sẽ thấy một liên kết hiển thị số người cần thông báo (ví dụ: *“Thông báo cho 8 tình nguyện viên”*)
3. Nhấp vào liên kết để gửi thông báo đẩy đến tất cả những người chưa được thông báo
4. Tình nguyện viên sẽ nhận được thông báo trên điện thoại, cho biết họ đã được xếp lịch và nhắc họ xác nhận phân công

:::info
Chỉ những tình nguyện viên chưa được thông báo mới được gửi. Nếu sau này bạn thêm ai đó vào kế hoạch, liên kết sẽ xuất hiện lại để bạn thông báo cho người mới mà không cần thông báo lại cho những người còn lại trong đội.
:::

### Kế hoạch có quy trình xác nhận

Nếu cài đặt của kế hoạch chỉ định một [quy trình xác nhận](./workflows.md#serving-assignment-confirmations), bảng sẽ hiển thị *“Các yêu cầu mới sẽ dùng quy trình xác nhận. Thông báo trong ứng dụng vẫn được bật. Việc nhắc lại sẽ dừng khi mỗi yêu cầu được chấp nhận hoặc từ chối.”* Trong trường hợp này:

- Liên kết thông báo chỉ đếm những tình nguyện viên chưa được thông báo và chưa phản hồi.
- Khi nhấp vào, hệ thống gửi thông báo trong ứng dụng thông thường và tạo một thẻ cho mỗi yêu cầu trên bảng của quy trình. Sau đó, quy trình sẽ gửi email và tin nhắn nhắc nhở và, nếu cần, chuyển yêu cầu cho một người để gọi điện.
- Kế hoạch phải được xuất bản (không ở trạng thái nháp) và quy trình phải đang hoạt động. Nếu không, bảng sẽ hiển thị *“Không thể gửi yêu cầu. Hãy kiểm tra xem quy trình đã chọn có đang hoạt động và kế hoạch đã được xuất bản chưa, rồi thử lại.”*

:::warning
Để nhận thông báo đẩy, tình nguyện viên phải cài đặt B1 App trên màn hình chính và bật thông báo. Xem [Cài đặt như một ứng dụng (PWA)](../../b1-church/getting-started/installing-pwa.md) để biết hướng dẫn thiết lập.
:::

## Bài viết liên quan

- [Kế hoạch phục vụ](./plans.md)
- [Quy trình](./workflows.md)
- [Cài đặt PWA B1.church](/docs/b1-church/getting-started/installing-pwa)
