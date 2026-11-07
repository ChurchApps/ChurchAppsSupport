---
title: "Mẫu Email"
description: "Thiết lập mẫu email và tin nhắn văn bản trong B1 Admin, với trường ghép, tùy chọn tin nhắn và bản xem trước để gửi thông điệp hàng loạt."
---

# Mẫu Email

<div class="article-intro">

Mẫu Email cho phép bạn lưu nội dung email dùng lại nhiều lần -- một tin nhắn chào mừng, lời nhắc sự kiện, hay lời cảm ơn về việc quyên góp -- để bạn (hoặc một [quy trình làm việc](../serving/workflows.md)) có thể gửi chỉ với một cú nhấp chuột thay vì phải soạn lại từ đầu mỗi lần. Danh sách này cũng chứa các mẫu tin nhắn văn bản dùng trong cửa sổ Nhắn tin của nhóm và của từng người.

</div>

<div class="prereqs">
<h4>Trước Khi Bắt Đầu</h4>

- Bạn cần có quyền truy cập khu vực Cài đặt trong B1 Admin.

</div>

## Truy Cập Mẫu Email

1. Trong B1 Admin, mở [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (thanh tìm kiếm ở góc trên bên trái) và mở rộng **Cài đặt**.
2. Nhấp **Mẫu Email**.
3. Bạn sẽ thấy danh sách các mẫu hiện có, kèm theo tiêu đề, danh mục và ngày sửa đổi gần nhất.

## Tạo Mẫu Mới

1. Nhấp **Mẫu Mới**.
2. Nhập **Tên Mẫu** để nhận diện mẫu trong danh sách, và chọn **Danh mục** (Chung, Sự kiện, Nhóm, Quyên góp, Chào mừng, hoặc Văn bản) để giúp sắp xếp các mẫu. Chọn **Văn bản** nếu muốn tạo mẫu tin nhắn văn bản thay thế (xem [Mẫu Tin Nhắn Văn Bản](#text-templates) bên dưới).
3. Nhập dòng **Tiêu đề**.
4. Soạn **Nội dung** bằng trình soạn thảo văn bản định dạng.
5. Nhấp **Lưu**.

## Trường Ghép

Nhấp vào một chip trường ghép phía trên Tiêu đề hoặc Nội dung để chèn trường đó tại vị trí con trỏ -- hãy nhấp vào vị trí bạn muốn đặt trường trong văn bản trước, rồi nhấp vào chip. Con trỏ sẽ giữ nguyên vị trí, nên bạn có thể tiếp tục gõ ngay sau trường vừa chèn. Nếu bạn nhấp vào chip Nội dung mà chưa nhấp vào vùng nội dung trước, trường sẽ được thêm vào cuối nội dung. Khi email được gửi, mỗi trường ghép sẽ được thay thế bằng thông tin thực tế của người nhận:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- Tên của người nhận
- `{{email}}` -- Địa chỉ email của người nhận
- `{{churchName}}` -- Tên nhà thờ của bạn

## Mẫu Tin Nhắn Văn Bản

Mẫu thuộc danh mục **Văn bản** là tin nhắn thuần văn bản dành cho nhắn tin SMS thay vì email:

- Mẫu này không có tiêu đề. Trình soạn thảo văn bản định dạng sẽ được thay bằng một hộp **Tin Nhắn Văn Bản** thuần túy, chứa tối đa 1.600 ký tự.
- Các chip trường ghép phía trên hộp sẽ chèn `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, hoặc `{{churchName}}` tại vị trí con trỏ.
- Mẫu tin nhắn văn bản xuất hiện trong bộ chọn **Tải Mẫu (tùy chọn)** của cửa sổ Nhắn tin dành cho một [nhóm](../groups/group-members.md#texting-group-members) hoặc một người cụ thể. Khi bạn chọn một mẫu, nội dung sẽ được điền sẵn, và bạn vẫn có thể chỉnh sửa trước khi gửi.
- Các mẫu này không xuất hiện trong bộ chọn mẫu email, bao gồm cả hành động **Gửi email** của quy trình làm việc.

Tính năng nhắn tin cần có một [nhà cung cấp dịch vụ nhắn tin](./church-settings.md#texting) đã được kết nối.

## Xem Trước Mẫu

Nhấp **Xem trước** để xem tiêu đề và nội dung sẽ trông như thế nào khi các trường ghép được điền dữ liệu mẫu, trước khi bạn lưu hoặc gửi.

## Sử Dụng Mẫu

Các mẫu đã lưu có thể chọn khi soạn email gửi cho cá nhân hoặc nhóm, và có thể dùng làm một hành động trong [Quy trình làm việc](../serving/workflows.md). Trước khi nhà thờ của bạn có thể gửi các mẫu này, đội ngũ ChurchApps cần phê duyệt việc gửi email nhóm một lần. Xem [Bật Email Nhóm Cho Nhà Thờ Của Bạn](../groups/group-members.md#turning-on-group-email-for-your-church).

## Chỉnh Sửa và Xóa

Nhấp biểu tượng **Chỉnh sửa** bên cạnh một mẫu để cập nhật, hoặc biểu tượng **Xóa** để gỡ bỏ vĩnh viễn.

## Bước Tiếp Theo

- [Quy trình làm việc](../serving/workflows.md) -- Tự động kích hoạt email mẫu dựa trên các quy tắc
