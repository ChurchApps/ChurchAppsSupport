---
title: "Phân công vai trò"
---

# Phân công vai trò

<div class="article-intro">

B1 Admin sử dụng hệ thống phân quyền theo vai trò để kiểm soát những gì mỗi người dùng trong nhóm của bạn có thể xem và thực hiện. Bằng cách gán vai trò, bạn có thể cấp cho nhân viên và tình nguyện viên quyền truy cập đúng những khu vực họ cần, và không hơn thế. Quản lý vai trò đúng cách giúp bảo mật dữ liệu của hội thánh và giúp nhóm của bạn làm việc hiệu quả hơn.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Bạn cần có quyền **Domain Admin** hoặc một vai trò có quyền quản lý **Settings** trong B1 Admin.
- Những người bạn muốn gán vai trò phải đã có trong danh bạ. Xem [Thêm người](adding-people.md) nếu bạn cần thêm họ trước.

</div>

## Tìm hiểu về vai trò

Vai trò là một tập hợp các quyền mà bạn gán cho một hoặc nhiều người dùng. Ví dụ, bạn có thể tạo vai trò "Nhóm tài chính" để cấp quyền truy cập [hồ sơ quyên góp](../donations/recording-donations.md), hoặc vai trò "Tình nguyện viên Check-In" chỉ cho phép truy cập [các tính năng điểm danh](../attendance/check-in.md).

Mỗi vai trò kiểm soát quyền truy cập vào các khu vực cụ thể của B1 Admin, bao gồm:

- **People** -- xem và chỉnh sửa hồ sơ thành viên. Phần Notes trên hồ sơ một người yêu cầu quyền **Edit People**, và quyền riêng **View Confidential Notes** kiểm soát việc truy cập phần Confidential Notes (dành cho mục vụ chăm sóc, lịch sử cá nhân và các ghi chú nhạy cảm tương tự). **View People Names Only** cho phép ai đó tra cứu người theo tên (chỉ thấy tên, ảnh và trạng thái thành viên) mà không cần truy cập toàn bộ danh bạ. Khi kết hợp với **View Attendance** hoặc **Edit Attendance**, quyền này cho phép tình nguyện viên mở **Groups** và xem danh sách lớp theo tên; với **Edit Attendance**, họ còn có thể [ghi nhận điểm danh](../attendance/recording-attendance.md). Xem [People Names Only](../settings/roles-permissions.md#people-names-only).
- **Donations** -- quản lý các khoản đóng góp và báo cáo tài chính. **Enter Donations** là một tùy chọn hẹp hơn dành cho các nhóm kiểm đếm: nó cho phép ai đó nhập tiền quyên góp, nhưng chỉ trong các [đợt](../donations/batches.md#who-can-change-a-batch) vẫn còn mở.
- **Attendance** -- ghi nhận và xem dữ liệu điểm danh
- **Forms** -- tạo và quản lý [biểu mẫu tùy chỉnh](../forms/creating-forms.md)
- **Groups** -- quản lý [thành viên nhóm](../groups/group-members.md) và lịch
- **Settings** -- cấu hình các thiết lập chung của hội thánh

:::warning
**Domain Admin** có toàn quyền truy cập mọi khu vực của B1 Admin. Quyền của họ không thể chỉnh sửa hoặc hạn chế. Chỉ sử dụng vai trò này cho những quản trị viên chính của bạn.
:::

## Xem và quản lý vai trò

1. Mở [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (thanh tìm kiếm ở góc trên bên trái của B1 Admin) và mở rộng **Settings**.
2. Nhấp vào **Roles**.
3. Bạn sẽ thấy danh sách tất cả các vai trò được cấu hình cho hội thánh của bạn, với cột **Members** hiển thị số người dùng trong mỗi vai trò.
4. Nhấp vào bất kỳ vai trò nào để xem thành viên và quyền của vai trò đó.

## Thêm người dùng vào vai trò

1. Trong menu Jump, chọn **Settings > Roles**.
2. Nhấp vào vai trò bạn muốn thêm người dùng.
3. Trong phần **Members**, tìm kiếm người đó theo tên.
4. Nhấp **Add** để gán họ vào vai trò.

Người dùng sẽ có tất cả các quyền liên quan đến vai trò đó vào lần đăng nhập tiếp theo.

## Chỉnh sửa quyền của vai trò

1. Trong menu Jump, chọn **Settings > Roles**.
2. Nhấp vào vai trò bạn muốn chỉnh sửa.
3. Trong phần **Permissions**, chọn hoặc bỏ chọn các khu vực bạn muốn vai trò đó truy cập. Mỗi nhóm quyền hiển thị số quyền đã được chọn trong nhóm (ví dụ, **2 of 5**).
4. Mỗi thay đổi được lưu ngay khi bạn chọn hoặc bỏ chọn một ô.

:::tip
Hãy tuân theo nguyên tắc đặc quyền tối thiểu -- chỉ cấp cho mỗi vai trò những quyền thực sự cần thiết. Điều này giúp dữ liệu của bạn an toàn và giảm khả năng thay đổi ngoài ý muốn.
:::

## Ví dụ về vai trò thông dụng

- **Office Staff** -- truy cập People, Donations, Attendance và Forms
- **Group Leaders** -- chỉ truy cập [Groups](../groups/creating-groups.md)
- **Check-In Volunteers** -- quyền điểm danh **Checkin**, mà tài khoản đăng nhập trên [kiosk check-in](../attendance/check-in.md) cần có
- **Finance Team** -- truy cập [Donations](../donations/recording-donations.md) và báo cáo
- **Counting Team** -- **Enter Donations** và **View Donations**, để tình nguyện viên có thể nhập tiền dâng vào các đợt đang mở mà không thấy tổng hợp quyên góp

Xem [Roles & Permissions](../settings/roles-permissions.md) để biết chi tiết hơn về quyền liên quan đến quyên góp và thành viên.
