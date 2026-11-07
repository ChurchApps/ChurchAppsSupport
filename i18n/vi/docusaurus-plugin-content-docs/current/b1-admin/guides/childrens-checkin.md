---
title: "Hướng dẫn: Thiết lập Check-In cho Ban Thiếu nhi"
---

# Thiết lập Check-In cho Ban Thiếu nhi

<div class="article-intro">

Hướng dẫn này sẽ giúp bạn từng bước thiết lập hệ thống check-in cho trẻ em tại nhà thờ của bạn, từ việc nhập thông tin gia đình vào cơ sở dữ liệu, cấu hình các nhóm phù hợp với độ tuổi, cho đến in thẻ tên vào sáng Chúa nhật. Khi hoàn tất, phụ huynh có thể check-in con em tại màn hình kiosk bằng máy tính bảng và nhận một thẻ an ninh tương ứng.

</div>

## Video hướng dẫn

<YouTube id="Ep9CBUcJwPI" title="Thiết lập Check-In cho Thiếu nhi trong B1" next="Ghi nhận và theo dõi điểm danh trong B1" nextUrl="/docs/b1-admin/attendance/recording-attendance" />

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Tạo tài khoản nhà thờ của bạn tại [admin.b1.church](https://admin.b1.church)
- Đảm bảo bạn có quyền quản trị — xem [Vai trò & Quyền hạn](../people/roles-permissions.md) nếu cần
- Tùy chọn: Chuẩn bị tệp CSV chứa danh sách gia đình nếu bạn đang chuyển dữ liệu từ hệ thống khác

</div>

## Bước 1: Thêm gia đình vào cơ sở dữ liệu

Trước khi check-in có thể hoạt động, hệ thống cần biết về các gia đình của bạn. Mỗi trẻ em cần được liên kết với phụ huynh thông qua tính năng hộ gia đình.

Làm theo hướng dẫn [Thêm người](../people/adding-people.md) để thêm ít nhất một gia đình. Hãy đảm bảo:

- Thêm phụ huynh trước
- Thêm từng đứa trẻ
- Liên kết họ vào cùng một hộ gia đình bằng [trình chỉnh sửa hộ gia đình](../people/adding-people.md#managing-households)

:::tip
Nếu bạn có nhiều hơn một vài gia đình cần thêm, hãy dùng công cụ [Nhập dữ liệu CSV](../people/importing-data.md) thay vì thêm từng người một. Bạn có thể nhập toàn bộ danh bạ chỉ trong vài phút.
:::

## Bước 2: Tạo nhóm thiếu nhi

Nhóm xác định các lớp mà trẻ em sẽ check-in vào. Thông thường, bạn nên có một nhóm cho mỗi độ tuổi.

Làm theo hướng dẫn [Tạo nhóm](../groups/creating-groups.md) để tạo các nhóm như:

- **Nhà trẻ** (từ 0–2 tuổi)
- **Mẫu giáo** (từ 3–5 tuổi)
- **Tiểu học** (từ 6–10 tuổi)

Bạn có thể điều chỉnh tên và độ tuổi để phù hợp với cơ cấu mục vụ của mình.

## Bước 3: Cấu hình cơ sở và buổi nhóm

Check-in được gắn với các giờ nhóm cụ thể. Bạn cần cấu hình ít nhất một cơ sở và một buổi nhóm.

Làm theo hướng dẫn [Thiết lập điểm danh](../attendance/setup.md) để:

1. Thêm cơ sở của bạn (ví dụ: "Cơ sở chính")
2. Thêm một buổi nhóm (ví dụ: "Sáng Chúa nhật")
3. Đặt giờ nhóm (ví dụ: "9:00 sáng") và, tùy chọn, [lịch check-in](../attendance/setup.md#setting-a-check-in-schedule) để check-in tự động mở trước mỗi buổi nhóm và đóng sau khi buổi nhóm kết thúc
4. Gán các nhóm thiếu nhi cho buổi nhóm

## Bước 4: Thiết lập ứng dụng Check-In

Bây giờ hãy kết nối mọi thứ bằng cách cài đặt ứng dụng check-in trên máy tính bảng.

1. Cài đặt ứng dụng **B1 Checkin** — xem bài viết [Check-In](../attendance/check-in.md) để có liên kết tải xuống
2. Đăng nhập bằng thông tin B1 Admin của bạn
3. Chọn cơ sở và giờ nhóm của bạn

Xem bài viết đầy đủ [Check-In](../attendance/check-in.md) để biết các bước thiết lập chi tiết.

## Bước 5: Chuẩn bị phần cứng

Bạn cần một máy tính bảng cho kiosk và tùy chọn một máy in nhãn Brother để in thẻ tên.

Tối thiểu cần có:
- **Một máy tính bảng Android hoặc Amazon Fire** — xem [các máy tính bảng được khuyến nghị](../attendance/check-in.md#recommended-hardware)
- **Một máy in nhãn Brother** — khuyến nghị dùng QL-1110NWB vì hỗ trợ Bluetooth và WiFi
- **Nhãn Brother DK-1201** (1-1/7" x 3-1/2")

:::warning
Chỉ máy in nhãn Brother mới tương thích với ứng dụng B1 Checkin. Các thương hiệu máy in khác sẽ không hoạt động.
:::

## Bước 6: Chạy thử check-in

Trước sáng Chúa nhật, hãy thực hiện một lần chạy thử:

1. Mở ứng dụng B1 Checkin trên máy tính bảng
2. Chọn cơ sở và giờ nhóm chính xác
3. Tìm một trong các gia đình bạn đã thêm
4. Check-in một đứa trẻ và kiểm tra:
   - Thông tin điểm danh hiển thị trong B1 Admin tại mục **Attendance**
   - Nếu dùng máy in, thẻ tên được in chính xác

:::tip
Hãy hướng dẫn các tình nguyện viên đón tiếp về quy trình check-in trước khi triển khai. Thường chỉ cần một buổi hướng dẫn nhanh 5 phút là đủ.
:::

## Hoàn tất!

Dịch vụ check-in cho thiếu nhi của bạn đã sẵn sàng. Phụ huynh có thể tìm gia đình của mình, chọn các con và check-in tại kiosk. Thông tin điểm danh sẽ tự động được ghi nhận trong B1 Admin.

## Bài viết liên quan

- [Thêm người](../people/adding-people.md) — thêm các gia đình mới khi họ đến thăm
- [Tạo nhóm](../groups/creating-groups.md) — quản lý các nhóm thiếu nhi của bạn
- [Thiết lập điểm danh](../attendance/setup.md) — cấu hình cơ sở và buổi nhóm
- [Check-In](../attendance/check-in.md) — thiết lập chi tiết ứng dụng check-in và phần cứng
- [Theo dõi điểm danh](../attendance/tracking-attendance.md) — xem báo cáo check-in
