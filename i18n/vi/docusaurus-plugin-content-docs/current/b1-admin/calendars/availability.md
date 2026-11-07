---
title: "Lịch khả dụng"
description: "Thiết lập phòng và thiết bị có thể đặt trong B1 Admin, đặt lịch trên lịch chung, thêm đệm chuẩn bị và dọn dẹp, và xử lý đặt định kỳ hoặc cần phê duyệt."
---

# Lịch khả dụng

<div class="article-intro">

Lịch khả dụng giúp bạn xem tổng quan về tất cả các lượt đặt phòng và tài nguyên trong nhà thờ của bạn. Từ đây, bạn có thể xem những gì đã được lên lịch, phát hiện xung đột trước khi chúng xảy ra và đặt phòng hoặc tài nguyên cho bất kỳ sự kiện nào ngay lập tức.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Thiết lập ít nhất một [phòng hoặc tài nguyên](./rooms-resources.md) trong mục Phòng & Tài nguyên
- Bạn cần có quyền chỉnh sửa mục Lịch trong B1 Admin

</div>

## Mở lịch khả dụng

Trong B1 Admin, mở [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (thanh tìm kiếm ở góc trên bên trái), mở rộng **Calendars**, rồi nhấp **Availability**.

## Đọc lịch

Mặc định, lịch hiển thị tháng hiện tại. Bạn có thể chuyển đến tháng sau hoặc tháng trước bằng các mũi tên ở trên cùng, hoặc chuyển đổi giữa chế độ xem theo tháng, tuần và ngày.

Mỗi sự kiện được mã hóa màu theo trạng thái đặt chỗ:

| Màu | Ý nghĩa |
|-----|---------|
| Xanh lá | Đã duyệt |
| Cam | Đang chờ duyệt |
| Xám | Đã khóa (không khả dụng) |

Khi di chuột qua một sự kiện, tiêu đề sự kiện cùng với phòng hoặc tài nguyên liên quan sẽ hiện ra.

## Lọc theo phòng hoặc tài nguyên

Sử dụng danh sách thả xuống **Room / Resource** ở góc trên bên trái để thu hẹp lịch chỉ còn một phòng hoặc tài nguyên. Chọn **All Rooms & Resources** để quay lại chế độ xem đầy đủ.

## Đặt phòng hoặc tài nguyên

1. Nhấp nút **Book** ở đầu trang.
2. Trong hộp thoại mở ra, điền thông tin chi tiết của sự kiện:
   - **Title** — tên của sự kiện
   - **Start** và **End** — ngày/giờ bắt đầu và kết thúc
   - **Visibility** — Public (công khai) hoặc Private (riêng tư)
   - **Rooms** — chọn một hoặc nhiều phòng để giữ chỗ
   - **Resources** — chọn một hoặc nhiều tài nguyên để giữ chỗ
3. Tùy chọn, đặt thời gian **Setup** và **Teardown** (tính bằng phút). Hai khoảng thời gian này sẽ kéo dài lượt đặt ở cả hai đầu để không gian được giữ chỗ cho việc chuẩn bị và dọn dẹp, trong khi giờ bắt đầu và kết thúc của sự kiện vẫn giữ nguyên.
4. Để lặp lại lượt đặt, chọn **Repeats** và cấu hình quy tắc lặp:
   - **Repeat every** -- đặt khoảng cách lặp (ví dụ, mỗi 2 tuần).
   - **Frequency** -- Daily (hằng ngày), Weekly (hằng tuần) hoặc Monthly (hằng tháng). Với Weekly, bạn có thể chọn các ngày cụ thể trong tuần; với Monthly, bạn có thể chọn một ngày cố định trong tháng hoặc một quy tắc tương đối như "thứ Ba thứ hai".
   - **Ends** -- Never (không bao giờ), vào một ngày cụ thể, hoặc sau một số lần lặp nhất định.
5. Để chỉ định khoảng thời gian đặt chỗ tùy chỉnh (khác với giờ bắt đầu và kết thúc của sự kiện), bật **Custom Booking Window** và nhập giờ bắt đầu và kết thúc của khoảng thời gian đó. Hãy dùng tính năng này khi phòng cần được mở cửa ngoài khung giờ đã ghi nhận của sự kiện.
6. Nhấp **Save** để gửi lượt đặt.

:::info
Nếu phòng hoặc tài nguyên đã được cấu hình **Approval Group**, lượt đặt sẽ hiển thị là **Pending** cho đến khi một người lãnh đạo của nhóm đó duyệt. Xem [Duyệt lịch](./approvals.md) để biết quy trình duyệt.
:::

:::tip
Lịch sẽ đánh dấu mọi xung đột trước khi bạn lưu. Nếu bạn thấy cảnh báo xung đột, hãy điều chỉnh thời gian hoặc chọn một phòng khác.
:::

## Bài viết liên quan

- [Phòng, Tài nguyên & Lập lịch](./rooms-resources.md) — thiết lập các không gian và thiết bị có thể đặt trước
- [Duyệt lịch](./approvals.md) — duyệt hoặc từ chối yêu cầu đặt chỗ
- [Tạo lịch](./creating-calendars.md) — quản lý các lịch sự kiện
