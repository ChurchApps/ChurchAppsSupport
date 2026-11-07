---
title: "Theo dõi điểm danh"
---

# Theo dõi điểm danh

<div class="article-intro">

Sau khi bạn đã thiết lập các cơ sở, giờ lễ và nhóm, B1 Admin giúp bạn dễ dàng xem dữ liệu điểm danh và phát hiện xu hướng. Trang Điểm danh mở ra với phần tóm tắt điểm danh của tuần này, và các báo cáo **Tất cả các năm** cung cấp hai góc nhìn chính: tab **Xu hướng điểm danh** để xem xu hướng toàn hội thánh và tab **Điểm danh nhóm** để xem chi tiết theo nhóm. Hãy dùng các công cụ này để hiểu các mô hình tăng trưởng, nhận diện sự tham gia đang giảm sút và đưa ra quyết định dựa trên dữ liệu cho hội thánh của bạn.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Cấu trúc điểm danh của bạn phải được thiết lập với ít nhất một cơ sở và một giờ lễ. Xem [Thiết lập điểm danh](setup.md) nếu bạn chưa làm việc này.
- Dữ liệu điểm danh cần được ghi nhận trước khi báo cáo hiển thị kết quả. Dữ liệu có thể đến từ [nhập thủ công](recording-attendance.md) hoặc [tự điểm danh](check-in.md).

</div>

## Xem xu hướng điểm danh

1. Mở **B1 Admin**, mở [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (thanh tìm kiếm ở góc trên bên trái), mở rộng **People**, rồi nhấp **Attendance**.
2. Nhấp **Tất cả các năm** ở cột bên trái. Tab **Xu hướng điểm danh** được chọn mặc định.
3. Báo cáo tự động chạy khi tab được mở, hiển thị tổng số điểm danh của từng tuần.

:::tip
Để xem nhanh tuần hiện tại, trang Điểm danh chính hiển thị có bao nhiêu người đang có mặt trong tuần này, phân tích theo phòng (nhóm), số khách, và biểu đồ cột 13 tuần của các lượt điểm danh — không cần chạy báo cáo.
:::

## Lọc dữ liệu

Sử dụng các bộ lọc trong hộp **Bộ lọc báo cáo** để thu hẹp kết quả, sau đó nhấp **Chạy báo cáo**:

- **Campus** (Cơ sở) — chọn một cơ sở để xem điểm danh chỉ tại địa điểm đó.
- **Service** (Buổi lễ) — giới hạn báo cáo trong một buổi lễ.
- **Service Time** (Giờ lễ) — chọn một giờ lễ để xem chi tiết một buổi nhóm họp cụ thể.
- **Group** (Nhóm) — hiển thị điểm danh của một nhóm riêng lẻ.
- **Start Date** (Ngày bắt đầu) và **End Date** (Ngày kết thúc) — khoảng thời gian cần bao gồm. Mặc định, báo cáo bao gồm năm vừa qua, từ một năm trước đến hôm nay, và ngày kết thúc được tính đầy đủ.

Báo cáo hiển thị biểu đồ cột và bảng tổng số lượt tham dự theo tuần. Mỗi tuần được ghi nhãn bằng ngày Chủ nhật của tuần đó. Bảng cũng có cột **Ngày buổi họp**, liệt kê các ngày thực tế trong tuần có điểm danh (ví dụ: “9/27, 9/30”), để bạn thấy khi nào một buổi nhóm giữa tuần được tính vào cùng tuần với Chủ nhật.

:::info
Báo cáo tự động chạy mỗi lần bạn mở tab Xu hướng điểm danh, nên bạn luôn thấy số liệu cập nhật mà không cần nhấp nút làm mới.
:::

## Điểm danh nhóm

Tab **Điểm danh nhóm** cho biết ai đã tham dự từng buổi nhóm. Điều này hữu ích khi bạn muốn theo dõi một lớp học, đội phục vụ hoặc nhóm nhỏ cụ thể thay vì xem số liệu chung của các buổi lễ.

1. Trong các báo cáo **Tất cả các năm**, chọn tab **Điểm danh nhóm**.
2. Tùy chọn chọn **Campus** và **Service**.
3. Đặt **Start Date** và **End Date**. Mặc định, báo cáo bao gồm từ Chủ nhật vừa qua đến hôm nay.
4. Nhấp **Chạy báo cáo**.

Kết quả được nhóm theo ngày buổi họp, sau đó theo giờ lễ và nhóm, với những người đã tham dự được liệt kê dưới mỗi nhóm. Giờ lễ, nhóm và tên được sắp xếp theo thứ tự bảng chữ cái để mỗi tiêu đề chỉ xuất hiện một lần. Dòng của mỗi người cũng hiển thị cột **Giờ điểm danh** với thời điểm lượt điểm danh được ghi nhận (để trống khi không có thời gian được lưu) và cột **Trạng thái thành viên** (ví dụ: Thành viên hoặc Khách), giúp bạn nhận ra khách ngay lập tức.

Để tải dữ liệu xuống, nhấp **Tùy chọn tải xuống** và chọn **Tóm tắt**. Tệp CSV có một dòng cho mỗi thành viên nhóm, được sắp xếp theo nhóm rồi theo tên, và một cột cho mỗi buổi họp có ngày trong khoảng thời gian (ví dụ: “Chủ nhật - 9:00 AM (2026-09-27)”), được đánh dấu **present** (có mặt) hoặc **absent** (vắng mặt).

:::tip
Điểm danh nhóm đặc biệt hữu ích cho những [trưởng nhóm nhỏ](../groups/creating-groups.md) muốn theo dõi mức độ tham gia trong nhóm của mình theo thời gian.
:::

## Mẹo sử dụng dữ liệu điểm danh

- Xem lại xu hướng hằng tháng để phát hiện sớm các mô hình theo mùa.
- So sánh dữ liệu theo cơ sở để hiểu địa điểm nào đang phát triển.
- Dùng báo cáo theo nhóm để theo dõi các [nhóm](../groups/group-members.md) có điểm danh đang giảm.
- Kết hợp thông tin điểm danh với công cụ [AI Search](../people/ai-search.md) để tìm những người lâu rồi không tham dự.

## Trang liên quan

- [Ghi nhận điểm danh](recording-attendance.md) — nhập thủ công điểm danh cho một buổi nhóm
- [Nhập số lượng & Xu hướng](headcount-entry.md) — cách đơn giản hơn để nhập tổng số người, kèm biểu đồ xu hướng hằng tuần riêng
- [Điểm danh](check-in.md) — thiết lập tự điểm danh để việc ghi nhận diễn ra tự động
