---
title: "Báo cáo điểm danh"
---

# Báo cáo điểm danh

<div class="article-intro">

B1 Admin cung cấp ba báo cáo điểm danh giúp bạn hiểu cách mọi người tham gia các buổi nhóm và nhóm của bạn. Mỗi báo cáo đưa ra một góc nhìn khác nhau về dữ liệu điểm danh, từ xu hướng tổng quan đến chi tiết theo từng ngày.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Đảm bảo điểm danh được [theo dõi nhất quán](../attendance/tracking-attendance.md) cho các buổi nhóm và nhóm của bạn
- Đảm bảo [nhóm](../groups/creating-groups.md) và các buổi nhóm đã được thiết lập trong B1 Admin
- Bạn cần có [quyền](../settings/roles-permissions.md) phù hợp để truy cập báo cáo

</div>

## Xu hướng điểm danh

Báo cáo Xu hướng điểm danh cho thấy số lượng điểm danh của các buổi nhóm thay đổi theo thời gian như thế nào.

1. Truy cập trực tiếp **admin.b1.church/reports/attendanceTrend** trong trình duyệt của bạn (báo cáo không có mục trong thanh điều hướng — lưu địa chỉ vào dấu trang là cách dễ nhất để quay lại). Báo cáo này cũng có trên trang Điểm danh: nhấp **All years**, sau đó chọn tab **Attendance Trend**.
2. Tùy chọn chọn **Campus**, **Service**, **Service Time** hoặc **Group** để lọc kết quả.
3. Đặt **Start Date** và **End Date**. Mặc định, báo cáo bao gồm một năm qua, từ một năm trước đến hôm nay, và ngày kết thúc được tính đầy đủ. Nhấp **Run Report**.
4. Báo cáo hiển thị biểu đồ cột và bảng tổng số lượt tham dự theo tuần. Mỗi tuần được ghi nhãn bằng ngày Chủ nhật của tuần đó, và cột **Session Dates** trong bảng liệt kê các ngày thực tế trong tuần có điểm danh (ví dụ: "9/27, 9/30").

Báo cáo này hữu ích để phát hiện các mô hình như sụt giảm theo mùa, xu hướng tăng trưởng hoặc tác động của các sự kiện đặc biệt.

## Điểm danh theo nhóm

Báo cáo Điểm danh theo nhóm cho thấy ai đã tham dự từng buổi họp nhóm trong một khoảng thời gian.

1. Truy cập trực tiếp **admin.b1.church/reports/groupAttendance** trong trình duyệt, hoặc trên trang Điểm danh nhấp **All years** và chọn tab **Group Attendance**.
2. Tùy chọn chọn **Campus** và **Service**.
3. Đặt **Start Date** và **End Date**. Mặc định, báo cáo bao gồm từ Chủ nhật trước đến hôm nay, và ngày kết thúc được tính đầy đủ.
4. Nhấp **Run Report**.

Kết quả được nhóm theo ngày buổi họp, sau đó theo giờ buổi nhóm, rồi theo nhóm, với những người đã tham dự được liệt kê dưới mỗi nhóm. Giờ buổi nhóm, nhóm và tên được sắp xếp theo thứ tự bảng chữ cái. Bên cạnh tên mỗi người, cột **Checked In** hiển thị thời điểm điểm danh được ghi nhận (để trống nếu không có thời gian được lưu), và cột **Membership Status** hiển thị trạng thái của họ, chẳng hạn như Member (Thành viên) hoặc Visitor (Khách). Các buổi họp của những nhóm không họp vào một giờ buổi nhóm cụ thể cũng được bao gồm; chúng sẽ hiển thị mà không có giờ buổi nhóm.

Để tải bảng tính, nhấp **Download Options** và chọn **Summary**. Tệp CSV bao gồm:

- Một dòng cho mỗi thành viên của từng nhóm có họp trong khoảng thời gian đó, được sắp xếp theo nhóm rồi theo tên.
- Tên người và tên nhóm ở các cột đầu tiên.
- Một cột cho mỗi buổi họp có ngày, được đặt tên theo buổi nhóm, giờ buổi nhóm và ngày (ví dụ: "Sunday - 9:00 AM (2026-09-27)"), với mỗi người được đánh dấu **present** (có mặt) hoặc **absent** (vắng mặt). Buổi họp không có giờ buổi nhóm chỉ được đặt tên theo ngày.

Sử dụng báo cáo này để so sánh điểm danh giữa các nhóm và xác định nhóm nào đang phát triển hoặc cần được quan tâm.

## Điểm danh nhóm theo ngày

Báo cáo Điểm danh nhóm theo ngày (có tiêu đề **Group attendance by day**) cung cấp số lượng người đã tham dự một nhóm theo từng ngày.

1. Truy cập trực tiếp **admin.b1.church/reports/dailyGroupAttendance** trong trình duyệt.
2. Sử dụng các danh sách thả xuống **Campus**, **Service** và **Service Time** để thu hẹp danh sách, sau đó chọn **Group** bạn muốn xem xét.
3. Chạy báo cáo. Báo cáo liệt kê mọi ngày nhóm đã họp, từ cũ nhất đến mới nhất, cùng với **Date** và số lượng **Attendees** được ghi nhận trong ngày đó.

Báo cáo này cung cấp chi tiết ở mức độ cao, hữu ích để hiểu sự biến động từ tuần này sang tuần khác hoặc xác định những ngày cụ thể có số lượng tham dự bất thường cao hoặc thấp.

:::tip
Sử dụng báo cáo Xu hướng điểm danh để có cái nhìn tổng quan, và báo cáo Điểm danh nhóm theo ngày khi bạn cần đi sâu vào các ngày cụ thể.
:::

## Ứng dụng thực tế

- **Lập kế hoạch** -- Sử dụng xu hướng điểm danh để lên kế hoạch chỗ ngồi, nhân sự và nguồn lực cho các buổi nhóm sắp tới.
- **Tiếp cận** -- Phát hiện sớm các dấu hiệu sụt giảm điểm danh để có thể theo dõi với thành viên.
- **Báo cáo cho ban lãnh đạo** -- Đưa dữ liệu điểm danh vào báo cáo định kỳ cho ban lãnh đạo để thể hiện sức khỏe của mục vụ.
- **Đánh giá sự kiện** -- So sánh điểm danh trước và sau các sự kiện đặc biệt để đo lường tác động.

:::warning
Dữ liệu điểm danh được ghi nhận thông qua quy trình check-in của nhóm và buổi nhóm của bạn. Nếu điểm danh không được theo dõi nhất quán, báo cáo sẽ không phản ánh chính xác mức độ tham gia thực tế. Xem [Theo dõi điểm danh](../attendance/tracking-attendance.md) để biết hướng dẫn thiết lập.
:::
