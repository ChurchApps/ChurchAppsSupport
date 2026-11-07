---
title: "Vai trò & Quyền hạn"
description: "Thiết lập vai trò trong B1 Admin để kiểm soát những gì nhân viên và tình nguyện viên có thể xem và thay đổi, từ quyên góp và điểm danh đến người và nhóm."
---

# Vai trò & Quyền hạn

<div class="article-intro">

Vai trò giúp bạn kiểm soát những gì người dùng khác nhau có thể truy cập trong tài khoản ChurchApps của mình. Bạn có thể tạo vai trò tùy chỉnh cho nhân viên, tình nguyện viên và các thành viên khác trong nhóm, mỗi vai trò có mức truy cập riêng để giữ an toàn dữ liệu.

</div>

## Video hướng dẫn

<YouTube id="ZzCIkinVMnE" title="Vai trò, Quyền hạn và Mời nhóm của bạn trong B1" next="Thiết lập buổi nhóm và điểm danh trong B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Bạn cần quyền Quản trị viên miền (Domain Admin) hoặc một vai trò có quyền quản lý vai trò
- Chuẩn bị danh sách các thành viên trong nhóm và các khu vực họ cần truy cập
- Xem các danh mục quyền có sẵn bên dưới để lên kế hoạch cho vai trò của bạn

</div>

## Truy cập Vai trò

1. Trong B1 Admin, mở [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (thanh tìm kiếm ở góc trên bên trái) và mở rộng **Cài đặt**.
2. Nhấn **Vai trò**.
3. Trang Vai trò hiển thị tất cả các vai trò hiện có của nhà thờ bạn. Cột **Thành viên** cho biết có bao nhiêu người dùng trong mỗi vai trò, còn hàng **(Everyone)** hiển thị **Tất cả người dùng**.

## Tìm hiểu trang Vai trò

Trang Vai trò được chia thành hai khung:

- **Bên trái** -- Hiển thị danh sách thành viên được gán cho vai trò đã chọn.
- **Bên phải** -- Hiển thị các cài đặt quyền bạn có thể cấu hình cho vai trò đó.

Nhấn vào tên bất kỳ vai trò nào để xem và quản lý thành viên cũng như quyền của vai trò đó.

## Thêm người dùng vào vai trò

1. Chọn vai trò bạn muốn thêm thành viên.
2. Sử dụng **ô tìm kiếm** ở bên trái để tìm người bạn muốn thêm.
3. Chọn người đó từ kết quả tìm kiếm.
4. Họ sẽ được thêm vào vai trò ngay lập tức.

## Xóa người dùng khỏi vai trò

1. Chọn vai trò có người dùng bạn muốn xóa.
2. Tìm người đó trong danh sách thành viên ở bên trái.
3. Nhấn nút **xóa** bên cạnh tên của họ.

## Cấu hình quyền

Mỗi vai trò có thể được cấp quyền truy cập vào các khu vực cụ thể của B1 Admin. Trong bảng **Chỉnh sửa quyền**, các quyền được nhóm thành các phần bạn có thể mở rộng, như **Điểm danh**, **Nội dung**, **Quyên góp**, **Biểu mẫu và Kế hoạch**, **Bài học**, **Nhắn tin**, **Người và Nhóm**, và **Công việc**. Nhập vào hộp **Lọc quyền** để chỉ hiển thị các quyền phù hợp.

Chọn hoặc bỏ chọn một quyền để cấp hoặc gỡ quyền đó khỏi vai trò. Tiêu đề mỗi phần hiển thị số quyền mà vai trò có trong phần đó, chẳng hạn **2 trên 5**, và con số này được cập nhật khi bạn chọn hoặc bỏ chọn các ô.

### Quyền Quyên góp

Phần **Quyên góp** có các quyền sau:

- **Xem tóm tắt quyên góp** -- xem phần Quyên góp, bao gồm các trang Tóm tắt, Đợt, Quỹ, Chiến dịch và Báo cáo quyên góp.
- **Xem quyên góp** -- xem từng khoản quyên góp, chẳng hạn các khoản trong một đợt.
- **Chỉnh sửa quyên góp** -- toàn quyền: thêm, sửa và xóa quyên góp và đợt, cũng như [đóng và mở lại đợt](../donations/batches.md#closing-and-reopening-a-batch).
- **Nhập quyên góp** -- thêm đợt và nhập, sửa hoặc xóa quyên góp, nhưng chỉ trong các đợt còn mở. Người chỉ có quyền này không thể xóa đợt, đóng hoặc mở lại đợt, hay thay đổi các khoản quyên góp đến từ hình thức quyên góp trực tuyến.
- **Chỉnh sửa cài đặt** -- quản lý cài đặt quyên góp.

Người có **Nhập quyên góp** nhưng không có **Xem tóm tắt quyên góp** chỉ thấy trang **Đợt** trong phần **Quyên góp**. Hãy cấp cho nhóm kiểm đếm cả **Nhập quyên góp** và **Xem quyên góp** để họ có thể mở một đợt và xem các khoản quyên góp mà họ đã nhập. Xem [Ai có thể thay đổi một đợt](../donations/batches.md#who-can-change-a-batch) để biết chi tiết.

### Chỉ xem tên người

Phần **Người và Nhóm** bao gồm quyền **Chỉ xem tên người**. Dùng quyền này cho các tình nguyện viên cần tra cứu người theo tên -- ví dụ, để chọn một người trong ô tìm kiếm -- mà không cần truy cập vào danh bạ đầy đủ. Chỉ với quyền này, một người:

- Có thể tìm người theo tên và xem danh sách những người được thêm gần đây, nhưng chỉ thấy tên, ảnh và trạng thái thành viên của mỗi người
- Không thể tìm theo email, xem thông tin liên hệ hoặc mở danh bạ **Người**

Kết hợp **Chỉ xem tên người** với **Xem điểm danh** hoặc **Chỉnh sửa điểm danh** cho các tình nguyện viên điểm danh lớp học. Khi đó, mục **Người** trong menu của họ sẽ mở **Nhóm**, nơi họ có thể mở danh sách **Tất cả nhóm** và xem tên thành viên cùng các buổi học của từng lớp. Với **Chỉnh sửa điểm danh**, họ cũng có thể [ghi nhận điểm danh](../attendance/recording-attendance.md) và thêm khách bằng cách tìm theo tên. Tên không phải là liên kết đến hồ sơ người, và các nhóm bảo mật vẫn bị ẩn trừ khi tình nguyện viên là thành viên của nhóm đó.

B1 Admin ẩn các liên kết và nút cần những quyền mà vai trò không có. Ví dụ, danh sách **Tất cả nhóm** chỉ dành cho những người có thể chỉnh sửa nhóm, xem thành viên nhóm hoặc xem người, hoặc có **Chỉ xem tên người** cùng với **Xem điểm danh** hoặc **Chỉnh sửa điểm danh** (những người khác sẽ được chuyển về Bảng điều khiển); thiết lập điểm danh chỉ xuất hiện với **Chỉnh sửa buổi nhóm**; nút **Email** của một nhóm chỉ xuất hiện với người có **Chỉnh sửa thành viên nhóm** (quyền cần thiết để gửi email nhóm); in danh sách nhóm cần **Xem thành viên nhóm** hoặc là người phụ trách nhóm đó; và xóa sự kiện lịch cần **Chỉnh sửa nội dung** (hoặc rút lại yêu cầu đang chờ của chính bạn).

### Tài khoản Kiosk Check-In

Tài khoản đăng nhập vào kiosk [B1 Checkin](../../b1-checkin/getting-started/logging-in.md) cần quyền **Checkin** trong phần **Điểm danh** (hoặc **Chỉnh sửa điểm danh**). Chỉ với **Checkin**, kiosk có thể tra cứu gia đình theo tên hoặc số điện thoại, điểm danh vào và ra, và hiển thị ai được phép đón trẻ, mà không cần truy cập vào danh bạ Người.

Quyền Checkin không còn được cấp qua hàng **(Everyone)**. Việc thuộc một vai trò có các quyền khác không cho phép ai đó vận hành kiosk; hãy thêm **Checkin** vào một vai trò như "Tình nguyện viên Check-In" và đưa các tài khoản kiosk vào vai trò đó.

:::warning
**Quản trị viên miền** có toàn quyền truy cập vào tất cả các khu vực trong tài khoản ChurchApps của bạn. Quyền của họ không thể bị thay đổi hoặc hạn chế. Chỉ dùng vai trò này cho những quản trị viên đáng tin cậy nhất.
:::

:::tip
Hãy tạo các vai trò cụ thể như "Thủ quỹ" chỉ có quyền **Quyên góp**, "Nhóm kiểm đếm" với **Nhập quyên góp** và **Xem quyên góp**, hoặc "Tình nguyện viên Check-In" chỉ có quyền **Điểm danh**. Cách này tuân theo nguyên tắc đặc quyền tối thiểu và giúp dữ liệu của bạn an toàn. Xem [Bảo mật dữ liệu](./data-security.md) để biết thêm về cách ChurchApps bảo vệ thông tin của bạn.
:::
