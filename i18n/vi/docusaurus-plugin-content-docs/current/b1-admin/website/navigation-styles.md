---
title: "Kiểu dáng điều hướng"
description: "Tùy chỉnh màu cho thanh điều hướng trang web trong suốt và đặc trong B1 Admin, bao gồm trạng thái liên kết, khi di chuột và đang hoạt động cho trang hội thánh."
---

# Kiểu dáng điều hướng

<div class="article-intro">

Tùy chỉnh màu thanh điều hướng trên trang web nhà thờ để phù hợp với thương hiệu của bạn. Bạn có thể cấu hình màu cho cả nền đặc và lớp phủ trong suốt, giúp bạn kiểm soát hoàn toàn cách điều hướng hiển thị trên các trang khác nhau.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Bạn cần có quyền quản lý trang web nhà thờ. Xem [Vai trò & Quyền hạn](../people/roles-permissions.md) để biết chi tiết.
- Chuẩn bị sẵn màu thương hiệu, bao gồm mã màu hex (ví dụ: #03A9F4).
- Hiểu rõ sự khác biệt giữa kiểu điều hướng nền đặc và nền trong suốt trên trang web của bạn.

</div>

## Tìm hiểu các chế độ điều hướng

Điều hướng trên trang web của bạn có thể hiển thị theo hai kiểu khác nhau tùy thuộc vào trang:

- **Điều hướng nền đặc** -- Thanh điều hướng có màu nền, thường dùng trên các trang nội dung
- **Điều hướng trong suốt** -- Điều hướng phủ lên nội dung trang, thường dùng trên các trang có ảnh nền lớn hoặc ảnh toàn màn hình

Bạn có thể tùy chỉnh màu cho từng chế độ một cách độc lập.

## Truy cập kiểu dáng điều hướng

1. Trong B1 Admin, mở [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (thanh tìm kiếm ở góc trên bên trái) và mở rộng **Website**
2. Nhấp **Appearance**
3. Trong danh sách **Style Settings**, nhấp **Navigation**

Trình chỉnh sửa **Navigation Styling** có hai thẻ: **Header (solid)** và **Header over hero (transparent)**.

## Cấu hình điều hướng nền đặc

Điều hướng nền đặc hiển thị với màu nền phía sau thanh điều hướng. Các cài đặt này nằm trong thẻ **Header (solid)**. Bạn có thể tùy chỉnh:

### Màu nền

1. Bật công tắc **Override** cho **Background color**
2. Nhấp vào bộ chọn màu
3. Chọn màu nền mong muốn
4. Mặc định là trắng (#FFFFFF)

### Màu liên kết

1. Bật công tắc **Override** cho **Link color**
2. Chọn màu cho chữ liên kết điều hướng
3. Tùy chọn này ảnh hưởng đến các liên kết ở trạng thái mặc định
4. Mặc định là xám đậm (#555555)

### Màu liên kết khi di chuột

1. Bật công tắc **Override** cho **Link hover color**
2. Chọn màu mà liên kết sẽ đổi sang khi người dùng di chuột qua
3. Điều này giúp người dùng nhận biết liên kết có thể nhấp được
4. Mặc định là xanh dương nhạt (#03A9F4)

### Màu liên kết đang hoạt động

1. Bật công tắc **Override** cho **Active link color**
2. Chọn màu cho liên kết của trang hiện tại
3. Điều này giúp người dùng biết họ đang ở trang nào
4. Mặc định là xanh dương nhạt (#03A9F4)

## Cấu hình điều hướng trong suốt

Điều hướng trong suốt phủ lên nội dung trang mà không có nền. Các cài đặt này nằm trong thẻ **Header over hero (transparent)**. Bạn có thể tùy chỉnh:

### Màu liên kết

1. Bật công tắc **Override** cho **Link color**
2. Chọn màu tương phản tốt với nền trang
3. Thường thì màu trắng hoặc màu sáng hoạt động tốt nhất trên nền tối
4. Mặc định là xám đậm (#555555)

### Màu liên kết khi di chuột

1. Bật công tắc **Override** cho **Link hover color**
2. Chọn màu cho trạng thái di chuột
3. Đảm bảo màu này hiển thị rõ trên nền trang
4. Mặc định là xanh dương nhạt (#03A9F4)

### Màu liên kết đang hoạt động

1. Bật công tắc **Override** cho **Active link color**
2. Chọn màu cho chỉ báo trang đang hoạt động
3. Màu này nên nổi bật nhưng vẫn phù hợp với thiết kế của bạn
4. Mặc định là xanh dương nhạt (#03A9F4)

:::info
Điều hướng trong suốt không có cài đặt màu nền vì nó phủ trực tiếp lên nội dung trang.
:::

## Lưu thay đổi

1. Sau khi cấu hình màu, nhấp **Save Navigation**
2. Thay đổi của bạn được áp dụng ngay lập tức trên trang web đang hoạt động
3. Truy cập trang web của bạn để xem điều hướng ở cả hai chế độ

## Khôi phục về mặc định

Nếu bạn muốn quay lại màu mặc định:

1. Tắt công tắc **Override** cho các màu tùy chỉnh
2. Nhấp **Save Navigation**
3. Điều hướng sẽ trở về bảng màu mặc định

Hoặc nhấp **Cancel** để hủy tất cả thay đổi mà không lưu.

## Thực hành tốt nhất

### Độ tương phản màu

- **Khả năng đọc** -- Đảm bảo màu liên kết có đủ độ tương phản với nền
- **Tuân thủ WCAG** -- Hướng tới tỷ lệ tương phản tối thiểu 4.5:1 để đảm bảo khả năng tiếp cận
- **Kiểm tra cả hai chế độ** -- Xem trước trang web với cả điều hướng nền đặc và trong suốt

### Tính nhất quán thương hiệu

- **Sử dụng màu thương hiệu** -- Phù hợp với logo và chủ đề trang web của bạn
- **Hạn chế bảng màu** -- Chỉ dùng 2-3 màu để có diện mạo thống nhất
- **Cân nhắc hình ảnh** -- Nếu dùng điều hướng trong suốt, hãy thử nghiệm trên các nền trang thông thường

### Trạng thái di chuột và đang hoạt động

- **Phản hồi rõ ràng** -- Làm cho trạng thái di chuột khác biệt rõ rệt so với liên kết mặc định
- **Phân biệt trang đang hoạt động** -- Dùng màu riêng biệt để người dùng biết họ đang ở đâu
- **Chuyển tiếp mượt mà** -- Hệ thống tự động tạo hiệu ứng chuyển màu

## Khắc phục sự cố

### Màu hiển thị không đúng

- **Xóa bộ nhớ đệm** -- Bộ nhớ đệm của trình duyệt có thể hiển thị màu cũ
- **Kiểm tra mã hex** -- Đảm bảo bạn đã nhập đúng mã màu hex hợp lệ
- **Kiểm tra trên các nền khác nhau** -- Màu có thể trông khác nhau tùy thuộc vào trang

### Điều hướng không hiển thị

- **Chế độ trong suốt** -- Nếu dùng điều hướng trong suốt trên ảnh sáng, chữ tối có thể khó nhìn
- **Giải pháp** -- Điều chỉnh màu liên kết hoặc dùng nền trang tối hơn
- **Phương án thay thế** -- Thêm bóng đổ nhẹ hoặc lớp phủ nền cho khu vực điều hướng

## Chi tiết kỹ thuật

Kiểu dáng điều hướng được lưu dưới dạng JSON và áp dụng bằng CSS variables:

- Thay đổi có hiệu lực ngay lập tức mà không cần xây dựng lại trang web
- Màu được áp dụng cho tất cả các phần tử điều hướng
- Việc ghi đè là không bắt buộc; màu không được đặt sẽ dùng màu mặc định của giao diện

## Bài viết liên quan

- [Giao diện](./appearance.md) -- Tùy chỉnh diện mạo tổng thể của trang web
- [Quản lý trang](./managing-pages.md) -- Tạo và sắp xếp các trang web
- [Trình chỉnh sửa trang](./page-editor.md) -- Thiết kế bố cục và nội dung trang
