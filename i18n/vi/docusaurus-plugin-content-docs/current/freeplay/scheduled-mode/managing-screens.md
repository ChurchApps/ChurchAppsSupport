---
title: "Quản lý màn hình và nhóm"
---

# Quản lý màn hình và nhóm

<div class="article-intro">

Trang **Screens** trong FreePlay Admin liệt kê mọi TV được ghép nối với nhà thờ của bạn, cùng với nội dung đang phát và việc màn hình đã sẵn sàng cho Chủ nhật hay chưa. Bạn cũng quản lý **nhóm màn hình** tại đây. Các màn hình trong cùng một nhóm dùng chung một lịch và một vòng lặp mặc định.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Đăng nhập vào FreePlay Admin tại [admin.freeplay.church](https://admin.freeplay.church)
- [Ghép nối ít nhất một màn hình](./pairing-a-screen)

</div>

## Trang Screens

Ở phía trên cùng, ba con số cho bạn kiểm tra nhanh tình trạng hoạt động:

- **Đang trực tuyến** - Các màn hình đã kết nối trong 15 phút gần nhất
- **Sẵn sàng cho Chủ nhật** - Số màn hình đã được lên lịch và đã tải xuống đầy đủ mọi nội dung đến Chủ nhật sắp tới
- **Cần chú ý** - Các màn hình đang ngoại tuyến hoặc thiếu tệp

Bên dưới, dùng **Search screens** để tìm màn hình theo nhãn, nhóm hoặc nội dung đang phát. Các nút lọc sẽ thu hẹp danh sách theo **All**, **Scheduled**, **Manual**, **Needs attention** hoặc một nhóm cụ thể. Chuyển đổi giữa chế độ xem **Table** và **Grid** bằng nút gạt ở bên phải.

Mỗi màn hình hiển thị:

- **Label** và kiểu thiết bị
- **Group**
- **Mode** - **Scheduled** hoặc **Manual**
- **Now playing** - Nội dung đang hiển thị trên màn hình. Màn hình Manual hiển thị **Classroom · teacher presses Start**
- **Ready through** - Ngày mà màn hình đã tải xuống đến. Nếu tệp chưa tải xong, thay vào đó sẽ hiển thị **N files missing**. Màn hình mới hiển thị **Waiting for first sync**
- **Last seen** - Thời điểm màn hình kết nối lần cuối. Màn hình không kết nối trong một thời gian dài sẽ hiển thị **Offline**, còn màn hình chưa từng kết nối sẽ hiển thị **Never seen**

Dùng **Present** để phát lịch của màn hình trong trình duyệt, hoặc **Edit** để thay đổi cài đặt.

## Xem một màn hình

Nhấp vào nhãn của màn hình để mở trang của màn hình đó. Ở bên trái:

- **Present in browser** - Phát lịch của màn hình này toàn màn hình trong trình duyệt, giống như cách nó hiển thị trên TV. Xem [Trình bày từ trình duyệt](./scheduled-playback#presenting-from-a-browser)
- **Edit** - Thay đổi nhãn, nhóm hoặc chế độ
- **More** > **Unpair** - Ngắt kết nối TV. TV sẽ quay lại hiển thị mã ghép nối

Phần còn lại của trang gồm các mục sau:

- **Now and next** - Nội dung đang phát và thời gian kết thúc, tiếp theo là mọi nội dung được lên lịch trong 7 ngày tới. Nhấp **Open calendar** để chuyển đến lịch của nhóm này
- **Downloads** - **Ready through** kèm một ngày khi mọi nội dung đã được tải xuống, hoặc danh sách các tệp còn thiếu
- **Device** - ID thiết bị, nền tảng, kiểu máy, phiên bản ứng dụng FreePlay, địa chỉ IP, dung lượng lưu trữ đã dùng và còn trống, lần kết nối cuối, và chế độ
- **Recent** - Hoạt động mới nhất mà màn hình đã báo cáo

:::tip
Nếu một màn hình hiển thị tệp còn thiếu, hãy đảm bảo màn hình đang trực tuyến và còn dung lượng lưu trữ trống. TV sẽ tự tải các tệp còn thiếu vào lần kết nối tiếp theo.
:::

## Chỉnh sửa màn hình

1. Nhấp **Edit** bên cạnh màn hình, hoặc trên trang của màn hình đó.
2. Thay đổi **Label**, **Group** hoặc **Mode** (**Scheduled** hoặc **Manual**).
3. Nhấp **Save**.

Chuyển một màn hình sang nhóm khác sẽ đổi nó sang lịch của nhóm đó.

## Nhóm màn hình

Nhóm màn hình là một tập hợp các màn hình cùng phát một nội dung vào cùng một thời điểm, chẳng hạn như "Sảnh" hoặc "Khu thiếu nhi". Mỗi nhóm có lịch riêng và có thể có một **vòng lặp mặc định** sẽ phát bất cứ khi nào không có nội dung nào được lên lịch.

Để quản lý nhóm, nhấp **Groups** ở phía trên trang **Screens**. Danh sách **Screen groups** hiển thị tên của từng nhóm, số lượng màn hình trong nhóm và vòng lặp mặc định của nhóm. Nhấp **Screens** để quay lại.

### Thêm nhóm

1. Trong chế độ xem **Screen groups**, nhấp **Add group**.
2. Nhập **Name**, ví dụ "Sảnh".
3. Chọn một danh sách phát làm **Default loop**, hoặc để ở mục **None — screen goes dark**.
4. Nhấp **Save**.

Bạn cũng có thể tạo nhóm khi ghép nối một màn hình bằng cách chọn **＋ New group…** trong trường **Group**.

### Chỉnh sửa hoặc xóa nhóm

1. Nhấp **Edit** bên cạnh nhóm.
2. Thay đổi tên hoặc vòng lặp mặc định, rồi nhấp **Save**.
3. Để xóa nhóm, nhấp **Delete** và xác nhận.

:::warning
Xóa một nhóm cũng sẽ xóa luôn lịch của nhóm đó. Các màn hình trong nhóm sẽ tắt cho đến khi bạn chuyển chúng sang nhóm khác.
:::

## Bài viết liên quan

- **[Ghép nối màn hình](./pairing-a-screen)** - Thêm TV mới
- **[Lên lịch cho lịch chiếu](./scheduling-the-calendar)** - Thiết lập nội dung mỗi nhóm phát và vòng lặp mặc định của nhóm
- **[Phát theo lịch trên TV](./scheduled-playback)** - Ý nghĩa của ngày "Ready through" trên chính TV
