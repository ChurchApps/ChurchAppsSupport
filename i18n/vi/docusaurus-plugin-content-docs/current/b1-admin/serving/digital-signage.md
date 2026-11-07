---
title: "Digital Signage"
---

# Digital Signage

<div class="article-intro">

Gửi nội dung bài học của bạn đến TV ở sảnh hoặc hành lang bằng nguồn cấp digital signage. Mỗi loại kế hoạch có một URL nguồn cấp luôn phát nội dung của kế hoạch hiện tại, nên bạn không cần cập nhật gì mỗi tuần. Nếu TV của bạn chạy FreePlay, bạn có thể lên lịch loại kế hoạch cho chúng trong FreePlay Admin.

</div>

<div class="prereqs">
<h4>Trước Khi Bắt Đầu</h4>

- Thiết lập một [loại kế hoạch](./plans.md) với [Lessons.church](../../b1-church/content/lessons.md) hoặc nội dung bài học khác đã được lên lịch
- Có tài khoản [SignPresenter](https://www.signpresenter.com) và thiết bị được thiết lập để hiển thị nó, hoặc một TV chạy [FreePlay](../../freeplay/)

</div>

## Lấy URL Nguồn Cấp

1. Vào **Serving**, chọn nhóm phục vụ chứa loại kế hoạch của bạn, rồi nhấp vào loại kế hoạch để mở.
2. Nhấp **Digital Signage** (biểu tượng TV) ở đầu trang loại kế hoạch.
3. Trong hộp thoại **Digital Signage Feed**, nhấp nút sao chép bên cạnh **Feed Url**.

:::info
URL nguồn cấp được gắn với loại kế hoạch, không phải một kế hoạch cụ thể. Nó tự động theo dõi kế hoạch nào đang được đặt là hiện tại cho loại kế hoạch đó, nên bạn chỉ cần thiết lập một lần.
:::

## Kết Nối với SignPresenter

Nguồn cấp được thiết kế để hoạt động với [SignPresenter](https://www.signpresenter.com), một ứng dụng digital signage của bên thứ ba. Dán URL đã sao chép vào SignPresenter như một nguồn cấp bên ngoài để hiển thị nội dung bài học hiện tại trên màn hình được kết nối.

Để xem hướng dẫn thiết lập từng bước trong SignPresenter, hãy xem [hướng dẫn Lessons.church của SignPresenter](https://support.signpresenter.com/topics/lessons-dot-church.html). Hộp thoại cũng có liên kết đến các hướng dẫn này.

## Dùng TV FreePlay Thay Thế

Nếu màn hình của bạn chạy [FreePlay](../../freeplay/), bạn không cần URL nguồn cấp. Hộp thoại **Digital Signage Feed** có liên kết đến **admin.freeplay.church/calendar**, nơi bạn có thể lên lịch loại kế hoạch này trên TV FreePlay:

1. Nhấp liên kết **admin.freeplay.church/calendar** trong hộp thoại. FreePlay Admin dùng cùng thông tin đăng nhập với B1 Admin.
2. Chọn nhóm màn hình cho TV của bạn rồi nhấp **Add schedule**.
3. Trong mục **Play**, chọn loại kế hoạch của bạn từ **Service plans**. Mục này được đánh dấu **(current plan)**.
4. Đặt các ngày và giờ, rồi nhấp **Save**.

Mỗi tuần, TV sẽ phát kế hoạch hiện tại của loại kế hoạch đó vào các giờ bạn đã đặt. Cách này cũng hoạt động với bài học Go Curriculum, kể cả các kế hoạch bạn đã tùy chỉnh. FreePlay đăng nhập bằng tài khoản Go Curriculum được liên kết với nhóm phục vụ trong **Content Providers** (xem [Lên Lịch Bài Học](./scheduling-lessons.md)), hoặc bằng kết nối Go Curriculum của nhà thờ nếu nhóm đó không có. Xem [Lên Lịch Lịch Trình](../../freeplay/scheduled-mode/scheduling-the-calendar) để biết tất cả các tùy chọn, và [Ghép Nối Màn Hình](../../freeplay/scheduled-mode/pairing-a-screen) để thêm TV.

:::note
URL nguồn cấp không bao gồm phương tiện Go Curriculum, vì nội dung đó cần thông tin đăng nhập Go Curriculum của nhà thờ bạn. Để hiển thị bài học Go Curriculum trên TV ở sảnh hoặc lớp học, hãy dùng FreePlay.
:::

## Các Bước Tiếp Theo

- Quản lý các kế hoạch cung cấp nội dung cho màn hình này trên trang [Plans](./plans.md)
- Lên lịch nội dung với [Lessons.church](./scheduling-lessons.md)
- Đặt TV FreePlay vào lịch với [Scheduled Mode](../../freeplay/scheduled-mode/)
