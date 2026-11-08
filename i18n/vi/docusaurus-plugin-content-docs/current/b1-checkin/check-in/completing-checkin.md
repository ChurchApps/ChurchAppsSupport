---
title: "Hoàn tất Check-In"
description: "Hoàn tất check-in cho gia đình tại kiosk trong B1 Checkin, bao gồm giới hạn phòng, in nhãn, mã bảo mật đón con và những việc ứng dụng thực hiện tiếp theo."
---

# Hoàn tất Check-In

<div class="article-intro">

Sau khi bạn đã xem lại hộ gia đình và thực hiện các phân công nhóm cần thiết, bạn đã sẵn sàng hoàn tất check-in. Đây là bước cuối cùng trong quy trình kiosk -- ứng dụng sẽ gửi dữ liệu điểm danh, in nhãn và làm mới để phục vụ gia đình tiếp theo.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- [Xem lại hộ gia đình](./household-review.md) trên màn hình xem lại hộ gia đình
- [Phân công nhóm](./group-assignment.md) cho các thành viên cần check-in vào một lớp hoặc chương trình cụ thể
- Tùy chọn [thêm khách](./adding-guests.md) đi cùng gia đình bạn

</div>

## Cách check-in

1. Từ **màn hình xem lại hộ gia đình**, chạm vào nút **Check-in** ở cuối màn hình.
2. Ứng dụng gửi dữ liệu điểm danh lên máy chủ và hiển thị **màn hình thành công** với dấu tích xanh và lời chào mừng.

Vậy là xong. Việc điểm danh cho gia đình bạn đã được ghi nhận.

Nếu có ai bạn đã chọn đã check-in cho buổi nhóm hôm nay, cửa sổ **Đã Check-In** sẽ xuất hiện trước và nêu tên họ. Chạm **Check In Lại** để lưu lựa chọn nhóm mới, hoặc **Hủy** để quay lại màn hình hộ gia đình.

## Phòng đầy và tỷ lệ tình nguyện viên

Nếu nhà thờ của bạn đã cấu hình [giới hạn an toàn](../../b1-admin/attendance/checkin-safety.md) cho các phòng, máy chủ sẽ kiểm tra trước khi lưu:

- Nếu phòng đã chọn **đầy hoặc đã đóng**, check-in sẽ không thành công và ứng dụng sẽ nêu tên phòng để bạn chọn phòng khác.
- Nếu giờ nhóm có [lịch check-in](../../b1-admin/attendance/setup.md#setting-a-check-in-schedule) và khung giờ check-in hiện chưa mở, việc check-in vào các phòng của giờ nhóm đó cũng sẽ bị từ chối. Màn hình **Chưa thể check-in** sẽ liệt kê phòng cùng lý do "hiện chưa mở check-in"; chạm **Đổi phòng** để chọn giờ nhóm hoặc nhóm khác. (Các giờ nhóm đã đóng sẽ hiển thị **Đã đóng** trên [màn hình hộ gia đình](./household-review.md) và không thể chọn, nên bạn thường chỉ gặp trường hợp này khi khung giờ đóng giữa chừng lúc đang check-in.)
- Một hộ gia đình đã check-in cho giờ nhóm trước đó có thể quay lại sau và thêm một giờ nhóm đang mở, ngay cả khi khung giờ trước đã đóng. Các lần check-in hiện có vẫn được giữ nguyên và không khiến lần check-in mới bị từ chối.
- Nếu một phòng thiếu nhiều tình nguyện viên so với tỷ lệ quy định, ứng dụng sẽ hiển thị cảnh báo để nhân viên xác nhận và tiếp tục, hoặc chặn check-in hoàn toàn -- tùy theo cách nhà thờ bạn cấu hình việc thực thi tỷ lệ.

## In nhãn

Nếu đã cấu hình máy in mạng, ứng dụng sẽ tự động in nhãn sau khi check-in:

- **Nhãn tên** được in cho mỗi người được phân vào nhóm có bật cài đặt **In thẻ tên**. Nhãn tên bao gồm tên người đó, phân công nhóm và thông tin dị ứng/ghi chú nếu có trong hồ sơ.
- **Phiếu đón con** được in khi bất kỳ người nào đã check-in thuộc nhóm có bật cài đặt **Đón con**. Những người check-in với vai trò **Tình nguyện viên** sẽ được bỏ qua, nên nhân viên trông trẻ phục vụ trong phòng Đón con sẽ không nhận phiếu đón con. Phiếu đón con liệt kê các em, phân công nhóm của các em và một **mã bảo mật 4 ký tự** riêng biệt.

:::info
Cùng một mã bảo mật xuất hiện trên cả nhãn tên của trẻ và phiếu đón con của phụ huynh. Khi đón con, tình nguyện viên đối chiếu mã để xác minh đúng người lớn đang đón từng em.
:::

Mã bảo mật được tạo mới cho mỗi lần check-in và chỉ sử dụng phụ âm và chữ số (loại bỏ nguyên âm để tránh tạo thành từ không phù hợp).

:::warning
Nếu nhãn không in được, hãy mở Cài đặt quản trị bằng cách chạm vào **logo nhà thờ** bảy lần, sau đó chạm **Đổi máy in** để kiểm tra kết nối máy in. Xem [Thiết lập máy in](../getting-started/printer-setup.md) để biết các bước khắc phục sự cố.
:::

## Điều gì xảy ra sau khi check-in

- Nếu đã cấu hình máy in, ứng dụng sẽ in tất cả nhãn rồi tự động quay lại **màn hình tra cứu**, sẵn sàng cho gia đình tiếp theo.
- Nếu chưa cấu hình máy in, ứng dụng cũng tự động quay lại **màn hình tra cứu**.

Dù trường hợp nào, màn hình thành công sẽ hiển thị ít nhất 6 giây kể từ khi xuất hiện (8 giây khi đang chúc mừng mốc điểm danh của ai đó), để gia đình thấy việc check-in đã thành công. Nếu việc in mất nhiều thời gian hơn, ứng dụng sẽ quay lại khoảng một giây rưỡi sau khi in xong.

Bạn không cần chạm vào đâu để quay lại màn hình tra cứu -- ứng dụng tự xử lý việc chuyển màn hình. Khi màn hình đã hiển thị một lúc, bạn có thể chạm vào để quay lại ngay; lần chạm trong một giây rưỡi đầu sẽ bị bỏ qua, nên việc chạm đúp nhanh vào **Check-in** sẽ không làm bỏ qua màn hình.

:::tip
Ứng dụng được làm mới hoàn toàn sau mỗi lần check-in, nên không có nguy cơ một gia đình nhìn thấy thông tin của gia đình khác.
:::

## Dữ liệu được ghi nhận

Khi bạn chạm **Check-in**, ứng dụng gửi các thông tin sau lên máy chủ cho mỗi thành viên trong hộ gia đình có phân công nhóm:

- **Người** được check-in
- **Buổi nhóm** họ tham dự
- **Giờ nhóm** và **nhóm** mà họ được phân công

Dữ liệu này hiển thị trong B1 Admin ở mục Điểm danh, nơi quản trị viên nhà thờ có thể xem và quản lý hồ sơ điểm danh. Xem [hướng dẫn quản trị check-in](../../b1-admin/attendance/check-in.md) để biết chi tiết.
