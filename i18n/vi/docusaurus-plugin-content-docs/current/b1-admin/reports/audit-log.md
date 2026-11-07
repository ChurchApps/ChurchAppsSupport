---
title: "Nhật ký kiểm toán"
---

# Nhật ký kiểm toán

<div class="article-intro">

Nhật ký kiểm toán ghi lại tất cả các hành động và thay đổi quan trọng trong hệ thống quản lý nhà thờ của bạn. Hãy dùng nó để xem lịch sử đăng nhập, theo dõi ai đã thay đổi hồ sơ thành viên, giám sát việc cập nhật quyền truy cập và duy trì trách nhiệm giải trình trong nhóm của bạn.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Tài khoản B1 Admin có quyền quản trị máy chủ
- Điều hướng đến **Cài đặt** để tìm Nhật ký kiểm toán

</div>

## Xem Nhật ký kiểm toán

1. Mở [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (thanh tìm kiếm ở góc trên bên trái của B1 Admin) và mở rộng **Cài đặt**.
2. Nhấp vào **Nhật ký kiểm toán**.
3. Nhật ký hiển thị các mục gần đây trong một bảng với các cột sau:
   - **Ngày** -- Thời điểm hành động xảy ra.
   - **Danh mục** -- Loại hành động (được mã hóa màu để dễ quét nhanh).
   - **Hành động** -- Việc gì đã được thực hiện (ví dụ: create, update, delete, login_success).
   - **Đối tượng** -- Loại và ID của bản ghi bị ảnh hưởng.
   - **Địa chỉ IP** -- Địa chỉ IP của người dùng đã thực hiện hành động.
   - **Chi tiết** -- Tóm tắt các thay đổi cụ thể đã được thực hiện.

## Lọc nhật ký

Sử dụng các bộ lọc ở đầu trang để thu hẹp kết quả:

- **Danh mục** -- Lọc theo loại hành động:
  - **Tất cả danh mục** -- Hiển thị tất cả.
  - **Đăng nhập** -- Các lần đăng nhập thành công và thất bại.
  - **Thành viên** -- Tạo, cập nhật hoặc xóa hồ sơ thành viên.
  - **Quyền truy cập** -- Cấp và thu hồi quyền truy cập.
  - **Quyên góp** -- Thay đổi bản ghi quyên góp.
  - **Nhóm** -- Các hoạt động quản lý nhóm.
  - **Biểu mẫu** -- Hoạt động gửi biểu mẫu.
  - **Cài đặt** -- Thay đổi cấu hình.
- **Ngày bắt đầu** -- Hiển thị các mục từ ngày này trở về sau.
- **Ngày kết thúc** -- Hiển thị các mục đến ngày này.

Nhấp **Tìm kiếm** sau khi thiết lập bộ lọc để cập nhật kết quả.

## Tìm hiểu về danh mục

Mỗi danh mục được mã hóa màu để dễ nhận biết:

- **Đăng nhập** -- Thẻ màu xanh dương. Theo dõi các lần đăng nhập thành công và thất bại.
- **Thành viên** -- Thẻ màu tím. Theo dõi việc tạo, cập nhật và xóa hồ sơ thành viên.
- **Quyền truy cập** -- Thẻ màu đỏ. Theo dõi khi quyền truy cập được cấp hoặc thu hồi.
- **Quyên góp** -- Thẻ màu xanh lá. Theo dõi thay đổi bản ghi quyên góp.
- **Nhóm** -- Thẻ màu xám. Theo dõi các thao tác quản lý nhóm.
- **Biểu mẫu** -- Thẻ màu cam. Theo dõi hoạt động gửi biểu mẫu.
- **Cài đặt** -- Thẻ màu vàng. Theo dõi thay đổi cấu hình.

## Xuất nhật ký

Khi các mục nhật ký đang hiển thị, nút **tải xuống CSV** sẽ xuất hiện. Nhấp vào đó để xuất kết quả đã lọc hiện tại ra bảng tính, phục vụ việc xem xét ngoại tuyến hoặc lưu trữ hồ sơ.

## Phân trang

Sử dụng các điều khiển phân trang ở cuối bảng để di chuyển qua các kết quả. Bạn có thể hiển thị 25, 50 hoặc 100 mục trên mỗi trang.

:::info
Các mục nhật ký kiểm toán được tự động lưu giữ trong một năm. Các mục cũ hơn 365 ngày sẽ bị xóa để giữ hệ thống hoạt động hiệu quả.
:::

:::tip
Hãy xem xét nhật ký kiểm toán thường xuyên, đặc biệt sau khi tiếp nhận thành viên mới trong nhóm hoặc thực hiện các thay đổi cấu hình quan trọng. Điều này giúp phát hiện sớm các hoạt động bất thường.
:::

## Bài viết liên quan

- [Vai trò & Quyền truy cập](../settings/roles-permissions) -- Quản lý ai có quyền truy cập vào những gì
- [Bảo mật dữ liệu](../settings/data-security) -- Tìm hiểu cách dữ liệu của bạn được bảo vệ
- [Tổng quan báo cáo](./index.md) -- Xem tất cả các báo cáo có sẵn
