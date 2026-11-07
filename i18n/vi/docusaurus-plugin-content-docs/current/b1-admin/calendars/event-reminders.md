---
title: "Nhắc nhở sự kiện"
---

# Nhắc nhở sự kiện

<div class="article-intro">

Nhắc nhở sự kiện tự động thông báo cho đúng người trước khi sự kiện diễn ra -- ví dụ: "Đừng bỏ lỡ! Buổi hội thảo về chăm sóc sức khỏe sẽ bắt đầu vào ngày mai lúc 9:00 sáng." Bạn chỉ cần thiết lập nhắc nhở một lần trên sự kiện, và B1 sẽ gửi đi đúng lịch qua thông báo đẩy, email, và nếu nhà thờ của bạn đã thiết lập nhắn tin, qua tin nhắn văn bản. Thành viên có thể kiểm soát những nhắc nhở nào họ nhận được trong [Tùy chọn thông báo](../../b1-church/getting-started/notification-preferences) của riêng mình.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Tạo sự kiện mà bạn muốn nhắc nhở mọi người (xem [Tạo lịch](creating-calendars))
- Để tiếp cận những người đã đăng ký tham dự, hãy [bật đăng ký](creating-calendars) cho sự kiện
- Để tiếp cận cả một nhóm, hãy đảm bảo sự kiện thuộc về một [nhóm](../groups/creating-groups) có thành viên

</div>

## Thiết lập nhắc nhở

Bạn cấu hình nhắc nhở trong mục **Nhắc nhở** của sự kiện.

- Khi **tạo sự kiện mới**, hãy mở rộng mục **Nhắc nhở** trong trình chỉnh sửa sự kiện trước khi lưu.
- Với **sự kiện đã có**, hãy mở trang **Chi tiết đăng ký** của sự kiện (từ mục **Đăng ký**) để thêm hoặc thay đổi nhắc nhở.

1. Bật **Kích hoạt nhắc nhở**.
2. Chọn **Thời điểm** gửi. Chọn tối đa ba mốc: **7 ngày trước**, **3 ngày trước**, **1 ngày trước**, và **Ngay trong ngày**.
3. Đặt **Giờ trong ngày** nhắc nhở sẽ được gửi (mặc định là **9:00 sáng**, theo [múi giờ](../settings/church-settings.md#time-zone) của nhà thờ bạn).
4. Chọn **Đối tượng** cần được nhắc (xem [Ai sẽ nhận nhắc nhở](#who-gets-reminded) bên dưới).
5. Tùy chọn thêm **Nội dung**. Để trống để dùng câu chữ mặc định, hoặc tự viết -- bạn có thể đưa vào `{{eventTitle}}` và nó sẽ được thay bằng tên sự kiện.
6. Chọn **Kênh**: **Thông báo đẩy**, **Email**, và nếu nhà thờ của bạn đã kết nối [nhà cung cấp nhắn tin](../settings/church-settings.md#texting), thì thêm **Tin nhắn văn bản**.
7. Lưu sự kiện.

Khi bạn thay đổi, một **bản xem trước trực tiếp** sẽ hiển thị gần đúng số người sẽ được nhắc, số người tham dự không thể liên lạc được, và thời điểm gửi dự kiến tiếp theo -- để bạn xác nhận nhắc nhở đã đúng trước khi lưu.

## Ai sẽ nhận nhắc nhở

Cài đặt **Đối tượng** quyết định nhắc nhở được gửi đến ai:

- **Chỉ người đã đăng ký** -- Tất cả những người đã đăng ký sự kiện và được liên kết với hồ sơ cá nhân. Đây là mặc định khi sự kiện bật đăng ký, nên nhắc nhở cho một sự kiện nhỏ có đăng ký sẽ không vô tình gửi đến cả một nhóm.
- **Người đứng đầu / chỉ người đăng ký** -- Mỗi đăng ký nhận một nhắc nhở (người đã đăng ký), thay vì gửi cho từng thành viên gia đình trong đăng ký.
- **Thành viên nhóm** -- Tất cả những người trong nhóm của sự kiện. Đây là mặc định khi sự kiện không dùng đăng ký.
- **Tự động** -- Dùng người đã đăng ký khi bật đăng ký, nếu không thì dùng nhóm.

:::info
Khách chỉ được thêm bằng tên (không liên kết với hồ sơ cá nhân) không thể nhận nhắc nhở, vì không có tài khoản, thiết bị, hay email để gửi đến. Bản xem trước sẽ cho bạn biết có bao nhiêu người tham dự thuộc nhóm này để không có gì bất ngờ. Những thành viên đã chọn không nhận liên lạc cũng sẽ bị bỏ qua.
:::

## Thời điểm nhắc nhở được gửi

- Nhắc nhở được gửi vào **giờ trong ngày bạn đã chọn**, theo múi giờ địa phương của nhà thờ, vào từng mốc thời gian bạn đã chọn.
- Nếu bạn **thay đổi ngày hoặc giờ** của sự kiện, các nhắc nhở đang chờ sẽ được tự động lên lịch lại -- bạn không cần chỉnh sửa nhắc nhở.
- Nếu bạn **xóa sự kiện** (hoặc hủy một buổi riêng lẻ của sự kiện định kỳ), các nhắc nhở đang chờ của sự kiện đó sẽ tự động bị hủy.
- Sự kiện định kỳ được xử lý tự động: mỗi buổi sắp tới sẽ có nhắc nhở riêng.

:::tip
Nhắc nhở được gửi **qua thông báo đẩy trước, email là phương án dự phòng**. Nếu thành viên đã bật thông báo đẩy, họ sẽ nhận thông báo đẩy; nếu không, họ sẽ nhận email. Thành viên chọn kênh nào họ muốn cho từng loại thông báo trong [Tùy chọn thông báo](../../b1-church/getting-started/notification-preferences) của mình.
:::

## Nhắc nhở qua tin nhắn văn bản

Kênh **Tin nhắn văn bản** chỉ xuất hiện khi nhà thờ của bạn đã kết nối nhà cung cấp nhắn tin. Tin nhắn được gửi qua nhà cung cấp nhắn tin của nhà thờ bạn, và mỗi tin nhắn có thể phát sinh chi phí cho nhà thờ. Chúng được gửi thêm vào bất kỳ nhắc nhở thông báo đẩy hoặc email nào, và chỉ gửi đến những người:

- Đã bật **Tin nhắn văn bản** trong [Tùy chọn thông báo](../../b1-church/getting-started/notification-preferences) của họ, và
- Có số điện thoại di động trong hồ sơ cá nhân.

Mỗi tin nhắn bắt đầu bằng tên nhà thờ của bạn, được giữ gọn trong một tin nhắn văn bản duy nhất, và kết thúc bằng "Trả lời STOP để hủy đăng ký." Bất kỳ ai trả lời STOP sẽ không nhận thêm tin nhắn từ nhà thờ bạn nữa. Để các phản hồi STOP đến được B1, hãy dán **URL webhook nhận tin nhắn đến (STOP)** từ [cài đặt nhắn tin](../settings/church-settings.md#texting) của bạn vào webhook nhận tin nhắn đến của nhà cung cấp.

## Thành viên có thể kiểm soát những gì

Nhắc nhở luôn tôn trọng [Tùy chọn thông báo](../../b1-church/getting-started/notification-preferences) của từng thành viên. Một thành viên có thể:

- Tắt **Nhắc nhở sự kiện** cho thông báo đẩy, email, hoặc tin nhắn văn bản trong khi vẫn giữ các thông báo khác.
- Bật hoặc tắt nhắc nhở qua tin nhắn văn bản bằng **Tin nhắn văn bản**.
- Đặt **giờ yên tĩnh** để các thông báo không khẩn cấp chờ đến một thời điểm hợp lý.

Bạn không thể ghi đè lựa chọn hủy nhận nhắc nhở sự kiện của thành viên -- điều này giúp B1 tuân thủ quy định chống thư rác và để thành viên luôn kiểm soát hộp thư của họ.

## Nhắc nhở cho tình nguyện viên phục vụ

Tình nguyện viên được phân công trong một kế hoạch sẽ nhận một **nhắc nhở phục vụ** riêng, kèm chi tiết kế hoạch và, nếu họ chưa phản hồi, các nút **Chấp nhận / Từ chối** ngay trong email. Những nhắc nhở này được cấu hình trên loại kế hoạch chứ không phải trên sự kiện lịch, và cũng có thể được gửi qua tin nhắn văn bản -- xem [Nhắc nhở tình nguyện viên](../serving/plans#volunteer-reminders) và [Tình nguyện viên Chủ nhật](../guides/sunday-volunteers) để biết cách hoạt động của việc phân công và nhắc nhở tình nguyện viên.

## Các bước tiếp theo

- [Tùy chọn thông báo](../../b1-church/getting-started/notification-preferences) -- Những gì thành viên có thể kiểm soát
- [Hướng dẫn đăng ký sự kiện](../guides/event-registration) -- Thiết lập đăng ký để nhắc nhở có thể tiếp cận người tham dự
- [Tạo lịch](creating-calendars) -- Quay lại thiết lập lịch
