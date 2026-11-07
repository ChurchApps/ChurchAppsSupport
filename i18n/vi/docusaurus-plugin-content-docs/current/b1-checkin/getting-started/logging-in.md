---
title: "Đăng nhập"
---

# Đăng nhập

<div class="article-intro">

Trước khi có thể sử dụng kiosk để điểm danh, bạn cần đăng nhập bằng tài khoản ChurchApps có quyền truy cập vào nhà thờ của bạn. Trang này hướng dẫn quy trình đăng nhập lần đầu, cách chọn nhà thờ, hành vi tự động đăng nhập và cách đăng xuất.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Cài đặt B1 Church Checkin trên máy tính bảng Android của bạn (xem [Bắt đầu](./index.md))
- Chuẩn bị sẵn email và mật khẩu tài khoản ChurchApps của bạn
- Tài khoản cần có quyền **Checkin** (hoặc **Chỉnh sửa điểm danh**) tại nhà thờ của bạn. Quản trị viên sẽ thêm quyền này trong B1 Admin tại **Cài đặt > Vai trò** — xem [Tài khoản kiosk điểm danh](../../b1-admin/settings/roles-permissions.md#check-in-kiosk-accounts)

</div>

## Đăng nhập lần đầu

1. Mở ứng dụng B1 Church Checkin. Sau màn hình chào, bạn sẽ thấy màn hình đăng nhập với logo B1 Church Checkin.
2. Nhập **địa chỉ email** của bạn vào ô đầu tiên.
3. Nhập **mật khẩu** của bạn vào ô thứ hai.
4. Nhấn nút **Đăng nhập**.

Ứng dụng sẽ xác thực thông tin của bạn và đăng nhập. Nếu email hoặc mật khẩu không chính xác, bạn sẽ thấy thông báo lỗi ở cuối màn hình.

Nếu tài khoản đã bật [đăng nhập hai lớp](../../b1-admin/profile/managing-profile.md#two-factor-sign-in), ứng dụng sẽ yêu cầu bạn nhập mã. Nhập mã 6 chữ số từ ứng dụng xác thực của chủ tài khoản, hoặc một trong các mã dự phòng, rồi nhấn lại **Đăng nhập**. Bạn chỉ cần mã này cho lần đăng nhập đầu tiên; sau đó kiosk sẽ giữ trạng thái đăng nhập.

:::info
Đây là cùng email và mật khẩu mà bạn dùng cho B1 Admin hoặc bất kỳ sản phẩm ChurchApps nào khác. Bạn không cần tài khoản riêng cho kiosk điểm danh.
:::

## Chọn nhà thờ

Sau khi đăng nhập thành công, ứng dụng sẽ tải danh sách các nhà thờ mà tài khoản của bạn có quyền **Checkin** hoặc **Chỉnh sửa điểm danh**. Các nhà thờ mà bạn chỉ có quyền khác sẽ không được hiển thị. Nếu không còn nhà thờ nào, ứng dụng sẽ hiển thị **Không có quyền điểm danh** và yêu cầu quản trị viên nhà thờ thêm quyền Checkin vào một trong các vai trò của bạn. Mỗi nhà thờ được hiển thị dưới dạng một thẻ, kèm tên nhà thờ và logo (nếu đã được cấu hình trong B1 Admin).

- Nếu tài khoản của bạn chỉ liên kết với **một nhà thờ**, bạn vẫn sẽ thấy màn hình chọn nhà thờ. Nhấn vào nhà thờ của bạn để tiếp tục.
- Nếu tài khoản của bạn liên kết với **nhiều nhà thờ**, hãy nhấn vào nhà thờ mà bạn muốn kiosk này phục vụ.

Sau khi bạn chọn nhà thờ, ứng dụng sẽ tải thương hiệu và cài đặt giao diện của nhà thờ đó. Logo nhà thờ của bạn sẽ xuất hiện ở tiêu đề trên tất cả các màn hình tiếp theo.

## Tự động đăng nhập khi quay lại

Sau lần đăng nhập thành công đầu tiên, ứng dụng sẽ lưu một mã thông báo đăng nhập bảo mật và nhà thờ bạn đã chọn trên máy tính bảng. Ứng dụng không lưu mật khẩu của bạn. Trong những lần mở ứng dụng sau:

- Ứng dụng sẽ tự động đăng nhập lại bằng mã thông báo đã lưu.
- Nếu trước đó bạn đã chọn nhà thờ, ứng dụng sẽ khôi phục lựa chọn đó và đưa bạn thẳng đến **màn hình dịch vụ**.
- Nếu phiên đăng nhập đã lưu không còn hợp lệ, ứng dụng sẽ quay về màn hình đăng nhập để bạn đăng nhập lại.

:::tip
Vì kiosk tự động đăng nhập, bạn chỉ cần nhập thông tin đăng nhập một lần khi thiết lập ban đầu. Sau đó, bạn chỉ cần bật máy tính bảng là có thể sử dụng ngay.
:::

## Cài đặt quản trị

Cài đặt quản trị được ẩn có chủ ý để các thành viên nhà thờ sử dụng kiosk không vô tình thay đổi cấu hình. Để truy cập:

1. Nhấn vào **logo nhà thờ** ở tiêu đề **bảy lần liên tiếp** (trong vòng hai giây).
2. Nếu đã đặt mã PIN kiosk, hãy nhập mã PIN khi được yêu cầu.
3. Màn hình **Cài đặt quản trị** sẽ mở ra với các tùy chọn sau:
   - **Đổi dịch vụ** — chuyển sang giờ dịch vụ đã chọn khác
   - **Đổi máy in** — mở [cài đặt máy in](./printer-setup) để quét và chọn máy in
   - **Đặt/Đổi mã PIN** — đặt hoặc cập nhật mã PIN kiosk dùng để bảo vệ quyền truy cập quản trị
   - **Đăng xuất** — đăng xuất và quay về màn hình đăng nhập

:::warning
Đăng xuất sẽ xóa toàn bộ thông tin đăng nhập đã lưu và lựa chọn nhà thờ. Bạn sẽ cần nhập lại email và mật khẩu để sử dụng kiosk. Chỉ đăng xuất khi bạn cần chuyển tài khoản hoặc cấu hình lại kiosk.
:::

## Bước tiếp theo

Sau khi đăng nhập, bạn có thể [thiết lập máy in](./printer-setup) hoặc chuyển thẳng đến [quy trình điểm danh](../check-in/).
