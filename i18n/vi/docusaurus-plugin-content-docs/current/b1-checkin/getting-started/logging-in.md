---
title: "Đăng nhập vào B1 Church Checkin"
sidebar_label: "Đăng nhập"
description: "Đăng nhập vào ứng dụng kiosk B1 Church Checkin, chọn nhà thờ của bạn, và tìm hiểu về tự động đăng nhập, cài đặt quản trị và đăng xuất trên máy tính bảng check-in."
---

# Đăng nhập

<div class="article-intro">

Trước khi có thể sử dụng kiosk để check-in, bạn cần đăng nhập bằng tài khoản ChurchApps có quyền truy cập vào nhà thờ của bạn. Trang này hướng dẫn quy trình đăng nhập lần đầu, cách chọn nhà thờ, hành vi tự động đăng nhập và cách đăng xuất.

</div>

<div class="prereqs">
<h4>Trước Khi Bắt Đầu</h4>

- Cài đặt B1 Church Checkin trên máy tính bảng Android của bạn (xem [Bắt đầu](./index.md))
- Chuẩn bị sẵn email và mật khẩu tài khoản ChurchApps của bạn
- Tài khoản cần có quyền **Checkin** (hoặc **Edit Attendance**) tại nhà thờ của bạn. Quản trị viên sẽ thêm quyền này trong B1 Admin tại **Settings > Roles** — xem [Tài khoản Kiosk Check-In](../../b1-admin/settings/roles-permissions.md#check-in-kiosk-accounts)

</div>

## Đăng Nhập Lần Đầu

1. Mở ứng dụng B1 Church Checkin. Sau màn hình khởi động, bạn sẽ thấy màn hình đăng nhập với logo B1 Church Checkin.
2. Nhập **địa chỉ email** của bạn vào ô thứ nhất.
3. Nhập **mật khẩu** của bạn vào ô thứ hai.
4. Nhấn nút **Login**.

Ứng dụng sẽ xác thực thông tin của bạn và đăng nhập. Nếu email hoặc mật khẩu không đúng, bạn sẽ thấy thông báo lỗi ở cuối màn hình.

Nếu tài khoản đã bật [đăng nhập hai lớp](../../b1-admin/profile/managing-profile.md#two-factor-sign-in), ứng dụng sẽ yêu cầu một mã. Nhập mã 6 chữ số từ ứng dụng xác thực của chủ tài khoản, hoặc một trong các mã dự phòng của họ, rồi nhấn **Login** lần nữa. Bạn chỉ cần mã này cho lần đăng nhập đầu tiên; sau đó kiosk sẽ giữ trạng thái đã đăng nhập.

:::info
Đây là cùng email và mật khẩu bạn dùng cho B1 Admin hoặc bất kỳ sản phẩm ChurchApps nào khác. Bạn không cần tài khoản riêng cho kiosk check-in.
:::

## Chọn Nhà Thờ

Sau khi đăng nhập thành công, ứng dụng sẽ tải các nhà thờ mà tài khoản của bạn có quyền **Checkin** hoặc **Edit Attendance**. Các nhà thờ mà bạn chỉ có quyền khác sẽ không được hiển thị. Nếu không còn nhà thờ nào, ứng dụng sẽ hiển thị **No check-in access** và yêu cầu quản trị viên nhà thờ thêm quyền Checkin vào một trong các vai trò của bạn. Mỗi nhà thờ được hiển thị dưới dạng một thẻ, kèm tên và logo nhà thờ (nếu đã được thiết lập trong B1 Admin).

- Nếu tài khoản của bạn chỉ liên kết với **một nhà thờ**, bạn vẫn sẽ thấy màn hình chọn. Nhấn vào nhà thờ của bạn để tiếp tục.
- Nếu tài khoản của bạn liên kết với **nhiều nhà thờ**, hãy nhấn vào nhà thờ mà bạn muốn kiosk này phục vụ.

Khi bạn chọn nhà thờ, ứng dụng sẽ tải thương hiệu và cài đặt giao diện của nhà thờ đó. Logo nhà thờ sẽ xuất hiện ở phần tiêu đề trên tất cả các màn hình sau đó.

## Tự Động Đăng Nhập Khi Mở Lại

Sau lần đăng nhập thành công đầu tiên, ứng dụng sẽ lưu trên máy tính bảng một mã đăng nhập bảo mật và nhà thờ bạn đã chọn. Ứng dụng **không** lưu mật khẩu của bạn. Trong những lần mở ứng dụng sau:

- Ứng dụng sẽ tự động đăng nhập lại bằng mã đã lưu.
- Nếu trước đó bạn đã chọn nhà thờ, ứng dụng sẽ khôi phục lựa chọn đó và đưa bạn thẳng đến **màn hình dịch vụ**.
- Nếu phiên đăng nhập đã lưu không còn hợp lệ, ứng dụng sẽ quay về màn hình đăng nhập để bạn đăng nhập lại.

:::tip
Vì kiosk tự động đăng nhập, bạn chỉ cần nhập thông tin đăng nhập một lần khi thiết lập ban đầu. Sau đó, bạn chỉ cần bật máy tính bảng là có thể sử dụng ngay.
:::

## Cài Đặt Quản Trị

Cài đặt quản trị được ẩn có chủ đích để các thành viên nhà thờ sử dụng kiosk không vô tình thay đổi cấu hình. Để truy cập:

1. Nhấn vào **logo nhà thờ** ở phần tiêu đề **bảy lần liên tiếp** (trong vòng hai giây).
2. Nếu đã đặt mã PIN kiosk, hãy nhập mã PIN khi được yêu cầu.
3. Màn hình **Admin Settings** sẽ mở ra với các tùy chọn sau:
   - **Change Service** — chuyển sang giờ dịch vụ khác
   - **Change Printer** — mở [cài đặt máy in](./printer-setup.md) để tìm kiếm và chọn máy in
   - **Set Admin PIN** (hoặc **Change Admin PIN** khi đã đặt mã) — đặt hoặc cập nhật mã PIN kiosk để bảo vệ quyền truy cập quản trị
   - **Emergency broadcast** — gửi tin nhắn đến người giám hộ của mọi hộ gia đình đã check-in (xem [Thông Báo Khẩn Cấp](../check-in/checking-out.md#emergency-broadcast))
   - **Manned station mode** — công tắc để thêm chức năng check-out, gọi tên, in lại và chỉnh sửa hồ sơ cho trạm này (xem [Check-Out](../check-in/checking-out.md))
   - **Logout** — đăng xuất và quay về màn hình đăng nhập

   Nhấn **Back to Kiosk** để quay lại check-in.

:::warning
Đăng xuất sẽ xóa tất cả thông tin đăng nhập đã lưu và lựa chọn nhà thờ. Bạn sẽ cần nhập lại email và mật khẩu để sử dụng kiosk. Chỉ đăng xuất khi bạn cần chuyển tài khoản hoặc cấu hình lại kiosk.
:::

## Bước Tiếp Theo

Sau khi đăng nhập, bạn có thể [thiết lập máy in](./printer-setup.md) hoặc chuyển thẳng đến [quy trình check-in](../check-in/index.md).
