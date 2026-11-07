---
title: "Chọn dịch vụ"
description: "Chọn buổi thờ phượng bạn tham dự trên màn hình dịch vụ của B1 Checkin, điều này xác định giờ thờ phượng và nhóm hiển thị trong các bước điểm danh tiếp theo."
---

# Chọn dịch vụ

<div class="article-intro">

Bước đầu tiên của mỗi lần check-in là chọn dịch vụ mà bạn tham dự. Màn hình dịch vụ xuất hiện ngay sau khi ứng dụng tải xong và quyết định những giờ dịch vụ và nhóm nào sẽ khả dụng trong suốt quy trình check-in.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- [Đăng nhập](../getting-started/logging-in.md) vào ứng dụng B1 Church Checkin và chọn nhà thờ của bạn
- Đảm bảo quản trị viên nhà thờ đã [cấu hình dịch vụ và giờ dịch vụ](../../b1-admin/attendance/setup.md) trong B1 Admin

</div>

## Cách hoạt động

1. Sau khi đăng nhập (hoặc sau khi tự động đăng nhập trong các lần quay lại), ứng dụng hiển thị **màn hình dịch vụ**.
2. Bạn sẽ thấy danh sách tất cả các dịch vụ đã được cấu hình cho nhà thờ của bạn. Mỗi dịch vụ xuất hiện dưới dạng một thẻ hiển thị tên dịch vụ (ví dụ: "Sáng Chủ Nhật" hoặc "Tối Thứ Tư").
3. Nhấn vào dịch vụ bạn đang tham dự.

Ứng dụng sẽ tải các giờ dịch vụ và nhóm liên quan đến dịch vụ đó, sau đó đưa bạn đến [màn hình tra cứu thành viên](./looking-up-members.md).

## Khi chưa mở check-in

Nếu quản trị viên của bạn đã đặt [lịch check-in](../../b1-admin/attendance/setup.md#setting-a-check-in-schedule) cho một giờ dịch vụ, ứng dụng chỉ cho phép các gia đình chọn giờ dịch vụ đó khi thời gian check-in đang mở. Các giờ dịch vụ mà thời gian check-in hiện đã đóng vẫn xuất hiện trên [màn hình hộ gia đình](./household-review.md), nhưng được đánh dấu **Đã đóng** (ví dụ: **Đã đóng · mở Chủ Nhật 9:30 SA**) thay vì hiển thị nút nhóm.

Nếu tất cả các giờ dịch vụ của dịch vụ bạn đã nhấn đều đã đóng, ứng dụng sẽ cho bạn biết khi nào check-in mở -- ví dụ: **"Check-in cho dịch vụ này mở vào Chủ Nhật 9:30 SA."** (Nếu không thể hiển thị giờ mở, ứng dụng sẽ hiện **"Hiện tại chưa mở check-in cho dịch vụ này."**) Nhấn **Quay lại** để trở về danh sách dịch vụ và chọn dịch vụ khác, hoặc đợi đến khi thời gian check-in mở rồi thử lại.

:::info
Thời gian check-in theo múi giờ của cơ sở (campus) chứa dịch vụ đó. Nếu cơ sở đó chưa thiết lập múi giờ, múi giờ của nhà thờ bạn sẽ được sử dụng thay thế. Nếu giờ dịch vụ có vẻ mở vào sai giờ, hãy nhờ quản trị viên kiểm tra múi giờ trong cài đặt cơ sở hoặc nhà thờ. Trên màn hình hộ gia đình, kiosk cũng dùng đồng hồ của máy tính bảng để mở và đóng các giờ dịch vụ, vì vậy hãy đảm bảo máy tính bảng được đặt đúng giờ và múi giờ.
:::

:::info
Dịch vụ được quản trị viên nhà thờ cấu hình trong B1 Admin, thuộc mục Attendance (Điểm danh). Nếu bạn không thấy dịch vụ mong đợi, hãy nhờ quản trị viên kiểm tra xem dịch vụ đó đã được tạo trong [cài đặt điểm danh](../../b1-admin/attendance/setup.md) hay chưa.
:::

## Những gì diễn ra phía sau

Khi bạn chọn một dịch vụ, ứng dụng sẽ lấy ba loại dữ liệu từ máy chủ:

- Các **giờ dịch vụ** của dịch vụ đó (ví dụ: một dịch vụ có thể có khung giờ 9:00 SA và 11:00 SA).
- Các **nhóm** khả dụng tại mỗi giờ dịch vụ (ví dụ: Nhà trẻ, Mẫu giáo, Tiểu học).
- Các **liên kết giữa nhóm và giờ dịch vụ** xác định nhóm nào khả dụng vào giờ nào.

Dữ liệu này được lưu tạm trên thiết bị để các bước còn lại của quy trình check-in diễn ra nhanh chóng và mượt mà.

:::tip
Nếu nhà thờ của bạn chỉ có một dịch vụ được cấu hình, bạn vẫn cần nhấn vào dịch vụ đó để tiếp tục. Ứng dụng không tự động chọn khi chỉ có một dịch vụ.
:::

## Bước tiếp theo

Sau khi chọn dịch vụ, bạn sẽ [tìm hộ gia đình của mình](./looking-up-members.md) bằng số điện thoại hoặc tên.
