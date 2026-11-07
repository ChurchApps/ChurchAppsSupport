---
title: "Hoàn tất check-in"
description: "Hoàn tất điểm danh tại kiosk cho gia đình trong B1 Checkin, bao gồm giới hạn phòng, in nhãn, mã bảo mật khi đón và ứng dụng sẽ làm gì tiếp theo."
---

# Hoàn tất check-in

<div class="article-intro">

Sau khi bạn đã xem lại hộ gia đình và chỉ định nhóm cần thiết, bạn đã sẵn sàng hoàn tất check-in. Đây là bước cuối cùng trong quy trình trên kiosk -- ứng dụng gửi dữ liệu điểm danh, in nhãn và đặt lại để sẵn sàng cho gia đình tiếp theo.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- [Xem lại hộ gia đình](./household-review.md) trên màn hình xem lại hộ gia đình
- [Chỉ định nhóm](./group-assignment.md) cho các thành viên trong gia đình cần check-in vào một lớp hoặc chương trình cụ thể
- Tùy chọn [thêm khách](./adding-guests.md) đi cùng gia đình bạn

</div>

## Cách check-in

1. Tại **màn hình xem lại hộ gia đình**, nhấn nút **Check-in** ở cuối màn hình.
2. Ứng dụng gửi dữ liệu điểm danh lên máy chủ và hiển thị **màn hình thành công** với dấu kiểm màu xanh lá và lời chào mừng.

Vậy là xong. Việc điểm danh của gia đình bạn đã được ghi nhận.

## Phòng đầy và tỷ lệ tình nguyện viên

Nếu nhà thờ của bạn đã thiết lập [giới hạn an toàn](../../b1-admin/attendance/checkin-safety.md) cho các phòng, máy chủ sẽ kiểm tra trước khi lưu:

- Nếu phòng được chọn **đã đầy hoặc đã đóng**, check-in sẽ không thành công và ứng dụng sẽ nêu tên phòng để bạn chọn phòng khác.
- Nếu giờ thờ phượng có [lịch check-in](../../b1-admin/attendance/setup.md#setting-a-check-in-schedule) và khung giờ check-in hiện chưa mở, việc check-in vào các phòng của giờ thờ phượng đó cũng sẽ bị từ chối. Màn hình **Chưa thể check-in** sẽ liệt kê phòng với lý do "check-in chưa mở lúc này"; nhấn **Đổi phòng** để chọn giờ thờ phượng hoặc nhóm khác. (Các giờ thờ phượng đã đóng sẽ hiển thị **Đã đóng** trên [màn hình hộ gia đình](./household-review.md) và không thể chọn, vì vậy bạn thường chỉ gặp trường hợp này khi khung giờ đóng lại giữa chừng lúc đang check-in.)
- Một hộ gia đình đã check-in cho giờ thờ phượng trước đó có thể quay lại sau và thêm một giờ thờ phượng đang mở, ngay cả khi khung giờ trước đã đóng. Các lượt check-in hiện có của họ vẫn được giữ nguyên và sẽ không khiến lượt check-in mới bị từ chối.
- Nếu một phòng thiếu nhi **thiếu tình nguyện viên** so với tỷ lệ quy định, ứng dụng sẽ hoặc hiển thị cảnh báo để nhân viên xác nhận và tiếp tục, hoặc chặn check-in hoàn toàn -- tùy theo cách nhà thờ bạn cấu hình việc áp dụng tỷ lệ.

## In nhãn

Nếu đã cấu hình máy in mạng, ứng dụng sẽ tự động in nhãn sau khi check-in:

- **Nhãn tên** được in cho mỗi người được chỉ định vào nhóm có bật cài đặt **In thẻ tên**. Nhãn tên bao gồm tên người đó, nhóm được chỉ định và thông tin dị ứng/ghi chú nếu có trong hồ sơ.
- **Phiếu đón con** được in khi có bất kỳ người nào đã check-in thuộc nhóm có bật cài đặt **Đón con**. Những người check-in với vai trò **Tình nguyện viên** sẽ được bỏ qua, nên nhân viên trông trẻ phục vụ trong phòng Đón con sẽ không nhận phiếu đón con. Phiếu đón con liệt kê các em nhỏ, nhóm của các em và một **mã bảo mật gồm 4 ký tự** duy nhất.

:::info
Cùng một mã bảo mật xuất hiện trên cả nhãn tên của trẻ và phiếu đón con của phụ huynh. Khi đón con, tình nguyện viên sẽ đối chiếu mã để xác nhận đúng người lớn đang đón từng em.
:::

Mã bảo mật được tạo mới cho mỗi lần check-in và chỉ sử dụng phụ âm và chữ số (không dùng nguyên âm để tránh tạo thành các từ không phù hợp).

:::warning
Nếu nhãn không in được, hãy mở Cài đặt quản trị bằng cách nhấn vào **logo nhà thờ** bảy lần, sau đó nhấn **Đổi máy in** để kiểm tra kết nối máy in. Xem [Thiết lập máy in](../getting-started/printer-setup.md) để biết các bước khắc phục sự cố.
:::

## Sau khi check-in

- Nếu đã cấu hình máy in, ứng dụng sẽ in tất cả nhãn rồi tự động quay về **màn hình tra cứu**, sẵn sàng cho gia đình tiếp theo.
- Nếu chưa cấu hình máy in, ứng dụng cũng tự động quay về **màn hình tra cứu**.

Dù trường hợp nào, màn hình thành công vẫn hiển thị ít nhất 6 giây kể từ khi xuất hiện (8 giây khi đang chúc mừng ai đó đạt mốc điểm danh), để gia đình thấy check-in đã thành công. Nếu việc in mất nhiều thời gian hơn, ứng dụng sẽ quay về khoảng một giây rưỡi sau khi in xong.

Bạn không cần nhấn gì để quay lại màn hình tra cứu -- ứng dụng tự động chuyển màn hình. Khi màn hình đã hiển thị một lúc, bạn có thể nhấn vào để quay lại ngay; lần nhấn trong một giây rưỡi đầu sẽ bị bỏ qua, vì vậy nhấn đúp nhanh vào **Check-in** sẽ không làm bỏ qua màn hình.

:::tip
Ứng dụng được đặt lại hoàn toàn sau mỗi lần check-in, nên không có nguy cơ một gia đình nhìn thấy thông tin của gia đình khác.
:::

## Dữ liệu được ghi nhận

Khi bạn nhấn **Check-in**, ứng dụng gửi các thông tin sau lên máy chủ cho mỗi thành viên trong hộ gia đình có chỉ định nhóm:

- **Người** được check-in
- **Buổi** họ tham dự
- **Giờ thờ phượng** và **nhóm** mà họ được chỉ định

Dữ liệu này xuất hiện trong B1 Admin ở mục Điểm danh, nơi quản trị viên nhà thờ có thể xem và quản lý hồ sơ điểm danh. Xem [hướng dẫn quản trị check-in](../../b1-admin/attendance/check-in.md) để biết chi tiết.
