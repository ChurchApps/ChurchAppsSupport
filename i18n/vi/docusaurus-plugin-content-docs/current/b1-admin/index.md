---
title: "Tổng quan B1 Admin"
description: "Tham quan trang chủ B1 Admin, gồm kế hoạch phục vụ hàng tuần, số lượt check-in trực tiếp, các mục duyệt cần xử lý, công việc của bạn và nhóm."
---

# Tổng quan B1 Admin

<div class="article-intro">

B1 Admin là bảng điều khiển quản lý giáo hội của bạn. Ứng dụng cung cấp các công cụ để quản lý mọi mặt trong hoạt động của giáo hội, từ danh bạ thành viên và quyên góp đến xây dựng website và phát trực tiếp, tất cả ở một nơi.

</div>

## Bắt đầu

1. Mở trình duyệt và truy cập [admin.b1.church](https://admin.b1.church)
2. Đăng nhập bằng tên người dùng và mật khẩu
3. Bạn sẽ được đưa đến **Dashboard**, trang chủ của bạn. Trang này hiển thị thứ tự buổi thờ phượng trong tuần, ai đang check-in và phục vụ theo thời gian thực, những việc cần bạn chú ý (như các yêu cầu đang chờ duyệt hoặc yêu cầu tham gia nhóm), các công việc còn mở và các nhóm của bạn

:::tip
Mới dùng B1 Admin? Hãy bắt đầu với [Giới thiệu](./introduction.md) để xem video hướng dẫn, sau đó truy cập [Cài đặt](./settings/index.md) để cấu hình thông tin giáo hội và mời nhóm của bạn tham gia.
:::

## Dashboard của bạn

Dashboard là trang chủ B1 Admin của bạn (`/`). Trang này được xây dựng xoay quanh buổi thờ phượng hằng tuần của giáo hội:

- **Buổi thờ phượng tuần này** -- tên và thứ tự buổi thờ phượng hiện tại hoặc sắp tới, kèm liên kết để xem toàn bộ kế hoạch
- **Trạng thái trực tiếp** -- khi mọi người bắt đầu check-in vào Chủ nhật, trang sẽ hiển thị số người đang có mặt, ai đang phục vụ trong giờ này, khách lần đầu đến, và thống kê theo từng phòng với thanh sức chứa
- **Cần chú ý** -- các yêu cầu chờ duyệt và yêu cầu tham gia nhóm cần xử lý
- **Công việc của tôi** và **Nhóm của tôi** -- các công việc còn mở (thêm bằng **Add Task**, hoặc nhấn **All tasks** để xem toàn bộ danh sách) và các nhóm bạn tham gia

Nội dung Dashboard hiển thị phụ thuộc vào [vai trò](./settings/roles-permissions.md) của bạn. Ví dụ, liên kết đến toàn bộ kế hoạch chỉ xuất hiện nếu bạn có thể mở kế hoạch đó (bạn chỉnh sửa kế hoạch, thuộc bộ phận của kế hoạch, hoặc đang phục vụ trong đó), và liên kết **All groups** chỉ xuất hiện nếu bạn có quyền quản lý nhóm, xem thành viên nhóm, hoặc xem danh sách người.

:::tip
Mọi mục, bao gồm Sermons, Calendars, Mobile và Settings, đều có trong [menu Jump](./introduction.md#getting-around-with-the-jump-menu) ở góc trên bên trái của B1 Admin. Nhấn vào menu này hoặc nhấn **Ctrl+K** (hoặc **Cmd+K**), rồi duyệt hoặc bắt đầu gõ tên mục.
:::

## Tính năng chính

- **[People](./people/index.md)** - Quản lý danh bạ giáo hội, thêm thành viên, chỉnh sửa dữ liệu hàng loạt, và xem theo hộ gia đình hoặc dạng bảng có thể sắp xếp. Mỗi người mở ra một trang hồ sơ duy nhất, với thông tin chi tiết ở bên trái và các tóm tắt về điểm danh, quyên góp, nhóm, ghi chú và biểu mẫu ở bên phải. Tìm những người mới thêm gần đây bằng tìm kiếm **Date Added**. Trang [Notes](./people/notes.md) liệt kê các ghi chú gần đây của mọi người, nhóm, sự kiện và thẻ quy trình
- **[Groups](./groups/index.md)** - Tạo và tổ chức các nhóm trong giáo hội với yêu cầu tham gia, quản lý thành viên, email nhóm, tin nhắn văn bản nhóm được cá nhân hóa với mẫu văn bản có thể tái sử dụng và placeholder Group Name, cùng danh sách liên lạc có thể in. Mỗi nhóm mở ra một trang duy nhất với các thao tác ở bên trái và tóm tắt thành viên, buổi họp, lịch và tình trạng nhóm ở bên phải
- **[Attendance](./attendance/index.md)** - Thiết lập cơ sở, giờ thờ phượng, theo dõi điểm danh có tên kèm sổ điểm danh lớp có thể in, xem lớp nào còn thiếu dữ liệu điểm danh, ghi nhận sĩ số đơn giản kèm báo cáo xu hướng, đặt lịch check-in cho từng giờ thờ phượng để tính năng tự check-in mở và đóng tự động theo múi giờ của từng cơ sở, và cho phép khách lần đầu đăng ký qua [mã QR](./attendance/check-in.md#guest-registration-via-qr-code) với các trường thông tin bạn chọn
- **[Donations](./donations/index.md)** - Ghi nhận quyên góp bằng nhiều loại tiền tệ, quản lý quỹ, ghi nhận một khoản quyên góp từ hồ sơ của một người, in các đợt quyên góp (từng đợt hoặc tất cả đợt trong một khoảng ngày) trên giấy tiêu đề của giáo hội với tổng phụ theo quỹ, đóng đợt sau khi đã kiểm đếm, nhập đợt từ tệp CSV, cho phép nhóm kiểm đếm nhập khoản quyên góp với quyền **Enter Donations**, và tạo sao kê in kèm logo giáo hội
- **[Serving](./serving/index.md)** - Điều phối tình nguyện viên, tạo kế hoạch phục vụ (hoặc sao chép kế hoạch sang các tuần tiếp theo, tối đa 12 tuần), gửi nhắc nhở qua thông báo đẩy, email hoặc tin nhắn văn bản, nhắn tin cho tất cả người được phân công bằng **Text Volunteers**, quản lý công việc, và đưa mọi người qua các quy trình từng bước có thể gửi email và tin nhắn, thông báo cho nhân viên, ghi nhận điểm danh, và theo dõi việc tình nguyện viên có xác nhận nhiệm vụ phục vụ hay không. Các quy tắc quy trình theo lịch có thể tìm những người hiến tặng định kỳ đã ngừng, và các kế hoạch in ra sẽ bỏ các cột trống
- **[Forms](./forms/index.md)** - Tạo biểu mẫu tùy chỉnh cho đăng ký và thu thập dữ liệu, thêm ảnh tiêu đề, chia sẻ biểu mẫu độc lập bằng mã QR, và liên kết biểu mẫu với một nhóm để các trưởng nhóm có thể xem và in câu trả lời
- **[Reports](./reports/index.md)** - Xem báo cáo sinh nhật, điểm danh và quyên góp
- **[Website](./website/index.md)** - Xây dựng và quản lý website giáo hội với kiểu điều hướng tùy chỉnh, theo dõi lượt truy cập website và ứng dụng B1 bằng GA4 ID của bạn, hoặc tắt trang công khai và chỉ giữ cổng thành viên
- **[Sermons](./sermons/index.md)** - Quản lý thư viện bài giảng, phát trực tiếp, và nguồn podcast tự động
- **[Calendars](./calendars/index.md)** - Tạo lịch được chọn lọc, quản lý đặt phòng/tài nguyên, và xem tình trạng trống. Thực hiện [đăng ký sự kiện](./calendars/paid-registrations.md) với các loại người tham dự có giá, thêm người tham dự thủ công mà không thu phí, và cho phép người dân đăng ký và thanh toán sau khi giáo hội không có hình thức quyên góp trực tuyến
- **[Settings](./settings/index.md)** - Cấu hình mọi thứ trên một trang cuộn với danh sách nhảy nhanh: thông tin giáo hội, khu vực, định dạng ngày và số điện thoại, nhắn tin văn bản (bao gồm tài khoản Twilio riêng của bạn), vai trò kèm số lượng thành viên, quyền, và các trường thông tin người tùy chỉnh

:::info
Nhấn vào biểu tượng dấu hỏi ở góc trên bên phải của bất kỳ trang nào để truy cập nhanh trợ giúp và tài liệu. Để thay đổi chủ đề màu (**Default**, **Classic**, hoặc **Custom**) hoặc chuyển giữa chế độ sáng và tối, hãy mở menu người dùng và chọn **Theme Preferences**. Để bảo vệ tài khoản bằng mã từ ứng dụng xác thực, hãy bật [Đăng nhập hai bước](./profile/managing-profile.md#two-factor-sign-in) trong hồ sơ của bạn.
:::

Cần hỗ trợ? Gửi email đến [support@churchapps.org](mailto:support@churchapps.org).
