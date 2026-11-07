---
title: "Thiết kế nhãn Check-In"
description: "Tùy chỉnh mẫu thẻ tên và phiếu nhận con in khi check-in trong B1 Admin, gồm các trường, vị trí và điều kiện sinh nhật hoặc ghi chú."
---

# Thiết kế nhãn Check-In

<div class="article-intro">

Trình thiết kế nhãn cho phép bạn tạo và tùy chỉnh mẫu thẻ tên và phiếu nhận con, được in khi gia đình làm thủ tục check-in cho con em. Bạn có thể kiểm soát chính xác thông tin xuất hiện trên mỗi nhãn, vị trí và cách trình bày.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Thiết lập [Điểm danh](./setup.md) và cấu hình ít nhất một giờ lễ/sinh hoạt có bật check-in
- Thiết lập [Check-In](./check-in.md) để nhãn có thể in được
- Bạn cần có quyền quản trị trong mục Điểm danh

</div>

## Mở Trình thiết kế nhãn

Trong B1 Admin, mở [Menu Jump](../introduction.md#getting-around-with-the-jump-menu) (thanh tìm kiếm ở góc trên bên trái), mở rộng **Mobile**, rồi nhấp **B1 CheckIn**. Sau đó nhấp nút **Design Labels** trên thẻ Check-in Labels. Bạn sẽ thấy danh sách các mẫu nhãn đã lưu, được phân loại theo loại: **Nametag** và **Pickup Slip**.

## Các loại nhãn

- **Nametag** — được in và gắn lên người trẻ. Thường bao gồm tên trẻ, lớp/buổi sinh hoạt và mã bảo mật.
- **Pickup Slip** — được đưa cho phụ huynh hoặc người giám hộ. Thường bao gồm mã bảo mật và danh sách các trẻ đã check-in.

B1 cung cấp sẵn một mẫu nametag và một mẫu pickup slip mặc định, có kích thước phù hợp với nhãn nhiệt tiêu chuẩn 3.5 × 1.1 inch.

## Tạo mẫu nhãn

1. Nhấp **Add** và chọn điểm bắt đầu từ menu: **Nametag 3.5" x 1.1"**, **Pickup Slip 3.5" x 1.1"** hoặc **Blank** (trống).
2. Một mẫu mới sẽ mở ra trong trình chỉnh sửa nhãn.

### Trình chỉnh sửa nhãn

Trình chỉnh sửa hiển thị bản xem trước được thu nhỏ của nhãn theo kích thước đã cấu hình. Ở bảng bên trái, bạn có thể cấu hình:

- **Name** — tên mẫu (chỉ để bạn tham khảo)
- **Label Type** — Nametag hoặc Pickup Slip
- **Width / Height** — kích thước nhãn tính bằng inch

### Thêm khối

Một nhãn được tạo từ các khối — từng phần nội dung riêng lẻ được đặt trên khung nhãn. Nhấp **Add Block** để chèn khối mới và chọn loại khối:

- **Field** — lấy giá trị dữ liệu tại thời điểm in:
  - `person.displayName` — họ và tên đầy đủ của người đó
  - `sessions` — giờ lễ/lớp mà người đó đã check-in
  - `securityCode` — mã bảo mật nhận con được tạo ngẫu nhiên
  - `children` — danh sách trẻ em (dùng cho phiếu nhận con)
  - `person.nametagNotes` — mọi ghi chú đặc biệt trong hồ sơ của người đó
  - `person.isBirthdayWeek` — đúng nếu ngày sinh (tháng và ngày) của người đó nằm trong khoảng 3 ngày trước hoặc sau ngày check-in
  - `campus` — tên cơ sở
- **Text** — văn bản tĩnh bạn nhập vào (dùng cho tiêu đề, nhãn hoặc hướng dẫn)
- **Barcode** — mã vạch mã hóa mã bảo mật

### Định vị khối

Mỗi khối có các trường **X**, **Y**, **Width** và **Height**, biểu thị bằng phần trăm của khung nhãn (0–100). Điều chỉnh các giá trị này để đặt nội dung chính xác. Bạn cũng có thể thiết lập:

- **Font Size** — cỡ chữ tính bằng point
- **Bold** — bật/tắt chữ đậm
- **Align** — căn trái, giữa hoặc phải
- **Condition** — tùy chọn ẩn khối nếu một trường bị trống (ví dụ: chỉ hiển thị nametagNotes khi có giá trị). Tính năng này cũng hoạt động với `person.isBirthdayWeek` để chỉ hiển thị hình ảnh hoặc văn bản sinh nhật trên thẻ tên của những trẻ có sinh nhật trong vài ngày trước hoặc sau ngày check-in.

### Lưu

Nhấp **Save** để lưu mẫu. Mẫu đã cập nhật sẽ được dùng lần tới khi nhãn được in trong B1 Checkin.

## Sắp xếp lại mẫu

Nếu bạn có nhiều mẫu nametag hoặc pickup slip, B1 Checkin sẽ mặc định dùng mẫu đầu tiên trong danh sách. Kéo các mẫu để sắp xếp lại thứ tự.

## Xóa mẫu

Nhấp biểu tượng xóa trên dòng mẫu bất kỳ rồi xác nhận. Khi xóa mẫu cuối cùng của một loại, mẫu mặc định tích hợp sẵn sẽ được khôi phục.

:::tip
Hãy in thử sau khi chỉnh sửa mẫu để xác nhận bố cục đúng trước buổi lễ tiếp theo.
:::

## Bài viết liên quan

- [Thiết lập Check-In](./setup.md) — cấu hình các buổi lễ và nhóm cho check-in
- [Hoàn tất Check-In](./check-in.md) — quy trình check-in dành cho gia đình
- [Bắt đầu với B1 Checkin](../../b1-checkin/getting-started/index.md) — ứng dụng kiosk Checkin
