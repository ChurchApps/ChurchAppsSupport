---
title: "Ghép nối màn hình"
---

# Ghép nối màn hình

<div class="article-intro">

Để đưa một TV vào lịch chiếu, hãy ghép nối nó với **FreePlay Admin**. TV sẽ hiển thị một mã gồm bốn chữ cái. Bạn nhập mã đó tại [admin.freeplay.church](https://admin.freeplay.church) và chọn nhóm màn hình mà TV này nên theo lịch. Bạn chỉ cần làm việc này một lần cho mỗi TV.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Cài đặt và mở FreePlay trên TV. Xem [Bắt đầu sử dụng](../getting-started/)
- Có tài khoản ChurchApps dành cho nhà thờ của bạn để đăng nhập vào FreePlay Admin
- Tùy chọn: [tạo danh sách phát](./building-playlists) và [lên lịch](./scheduling-the-calendar) trước để TV có nội dung phát ngay

</div>

## Hiển thị mã trên TV

1. Trên TV, mở **Settings** ở cuối thanh bên.
2. Chọn **Pair to a calendar**. Dòng này hiển thị **Not paired** khi TV chưa được ghép nối.
3. Màn hình **Pair this screen** hiển thị mã QR và mã ghép nối gồm bốn chữ cái, kèm thông báo **Scan with your phone, or go to freeplay.church/pair and enter this code**.
4. Bên dưới mã, **Waiting for confirmation** nhấp nháy trong lúc FreePlay chờ bạn hoàn tất việc ghép nối.

Mã có hiệu lực trong 15 phút, và đồng hồ đếm ngược bên dưới cho biết thời gian còn lại. Khi hết thời gian, FreePlay tự động hiển thị mã mới. Bạn cũng có thể chọn **Generate New Code** để lấy mã mới, hoặc **Cancel** để quay lại Settings.

## Ghép nối trong FreePlay Admin

1. Quét mã QR bằng điện thoại, hoặc truy cập **freeplay.church/pair** trên bất kỳ máy tính hay điện thoại nào. Đăng nhập nếu được yêu cầu. FreePlay Admin sẽ mở biểu mẫu **Pair screen** với mã đã được điền sẵn.
   - Bạn cũng có thể tự mở biểu mẫu. Vào **Screens** trong FreePlay Admin và nhấp **Pair screen**.
2. Kiểm tra **Pairing code**. Đây là bốn chữ cái hiển thị trên TV.
3. Nhập **Label** để bạn phân biệt được TV này với các TV khác, ví dụ “Sảnh trái”. Mục này không bắt buộc.
4. Trong mục **Group**, chọn nhóm màn hình mà TV này nên theo lịch. Để tạo nhóm mới, chọn **＋ New group…** và nhập **New group name**.
5. Trong mục **Mode**, giữ nguyên lựa chọn **Scheduled**. TV sẽ tự phát theo lịch của nhóm.
6. Nhấp **Pair**.

TV sẽ hiển thị **Connected!** rồi **Loading your schedule...**. Sau đó nó tải nội dung đã lên lịch và bắt đầu phát. Xem [Phát theo lịch trên TV](./scheduled-playback).

:::info
Nếu FreePlay Admin báo **That code didn't match a TV**, hãy kiểm tra lại mã trên màn hình. Nếu mã đã hết hạn, hãy dùng mã mới mà TV đang hiển thị.
:::

### Theo lịch hoặc thủ công

Cài đặt **Mode** có hai lựa chọn:

- **Scheduled** - Phát theo lịch của nhóm một cách tự động. Không cần ai nhấn Start.
- **Manual** - Người dùng chọn nội dung bằng điều khiển từ xa. Màn hình thủ công vẫn xuất hiện trong danh sách **Screens** của bạn, nhưng nó không theo lịch nào, nên trường **Group** bị tắt.

Bạn có thể đổi chế độ của màn hình sau này bằng **Edit** trên [trang Screens](./managing-screens).

## Ghép nối với kế hoạch phục vụ thay thế

Mã trên màn hình **Pair this screen** cũng hoạt động trong B1 Admin. Nếu bạn nhập mã ở đó và chọn loại kế hoạch trong mục **Show Plans For**, TV sẽ theo loại kế hoạch đó trong [Chế độ kế hoạch](../plan-mode/) thay vì theo lịch. Xem [Ghép nối thiết bị của bạn](../plan-mode/device-pairing).

## Thay đổi hoặc hủy ghép nối từ TV

Khi TV đã được ghép nối, dòng **Pair to a calendar** trong **Settings** hiển thị tên nhóm màn hình mà TV đang theo. Chọn dòng này để mở hộp thoại **Paired to**, có ba lựa chọn:

- **Back to schedule** - Đóng hộp thoại và quay lại trình phát theo lịch. Không có gì thay đổi về việc ghép nối.
- **Unpair** - Ngừng theo lịch. FreePlay mở màn hình **Content Providers**.
- **Pair to a different calendar** - Hủy ghép nối, rồi hiển thị mã ghép nối mới để bạn ghép nối lại TV.

:::warning
Hủy ghép nối sẽ xóa các tệp mà FreePlay đã tải xuống cho lịch đó.
:::

## Hủy ghép nối từ FreePlay Admin

1. Vào **Screens** và nhấp vào nhãn của màn hình.
2. Nhấp **More**, rồi nhấp **Unpair**.
3. Nhấp **Unpair** một lần nữa để xác nhận.

TV sẽ quay lại hiển thị mã ghép nối. Bạn có thể ghép nối lại bất cứ lúc nào.

## Bài viết liên quan

- **[Quản lý màn hình và nhóm](./managing-screens)** - Đổi tên màn hình, chuyển sang nhóm khác, hoặc kiểm tra các tệp đã tải xuống
- **[Lên lịch chiếu](./scheduling-the-calendar)** - Quyết định nội dung mà các màn hình trong nhóm sẽ phát
- **[Chọn chế độ ghép nối](../getting-started/pairing-modes)** - So sánh Chế độ theo lịch với Chế độ kế hoạch và tự duyệt các nhà cung cấp nội dung
