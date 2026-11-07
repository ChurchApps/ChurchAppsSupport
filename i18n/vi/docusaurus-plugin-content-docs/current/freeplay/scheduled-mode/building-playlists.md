---
title: "Kết nối nhà cung cấp và tạo danh sách phát"
description: "Thiết lập nhà cung cấp nội dung trong FreePlay Admin, rồi tạo, sắp xếp và xem trước danh sách phát cho màn hình TV theo lịch."
---

# Kết nối nhà cung cấp và tạo danh sách phát

<div class="article-intro">

Danh sách phát là một vòng lặp gồm hình ảnh và video mà bạn đưa lên lịch chiếu. Trong FreePlay Admin, bạn chỉ cần kết nối các nhà cung cấp nội dung một lần cho toàn bộ nhà thờ. Sau đó, bạn tạo danh sách phát bằng cách chọn tệp từ những nhà cung cấp đó.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Đăng nhập vào FreePlay Admin tại [admin.freeplay.church](https://admin.freeplay.church)
- Chuẩn bị thông tin đăng nhập cho bất kỳ tài khoản nhà cung cấp nào bạn muốn liên kết, chẳng hạn như Dropbox hoặc OneDrive

</div>

## Kết nối nhà cung cấp

Trang **Providers** liệt kê các nguồn nội dung của bạn thành hai phần:

- **Connected** - Các nhà cung cấp bạn có thể sử dụng ngay. Nhà cung cấp công khai không yêu cầu đăng nhập, chẳng hạn như Lessons.church và Bible Project, luôn xuất hiện ở đây với nhãn **Public · no sign-in needed**. Tài khoản đã liên kết hiển thị **Account linked** cùng thời hạn của liên kết.
- **Available** - Các nhà cung cấp cần bạn đăng nhập trước khi có thể sử dụng.

Để kết nối một nhà cung cấp:

1. Vào **Providers**.
2. Tìm nhà cung cấp trong mục **Available** và nhấp **Connect**.
3. Đăng nhập vào tài khoản của bạn với nhà cung cấp đó:
   - Một số nhà cung cấp, chẳng hạn như Dropbox, Google Drive và OneDrive, sẽ mở cửa sổ đăng nhập bật lên. Nếu không có gì xuất hiện, hãy cho phép cửa sổ bật lên cho admin.freeplay.church.
   - Các nhà cung cấp khác sẽ hiển thị một liên kết và một mã. Truy cập liên kết, nhập mã và chấp thuận quyền truy cập. Hộp thoại sẽ tự cập nhật khi bạn hoàn tất.
4. Khi thấy thông báo **Account linked successfully!**, nhà cung cấp sẽ chuyển sang mục **Connected**.

Các nhà cung cấp đã kết nối có ba thao tác:

- **Browse** - Duyệt qua các thư mục của nhà cung cấp
- **Refresh** - Gia hạn đăng nhập với nhà cung cấp
- **Unlink** - Ngắt kết nối tài khoản

:::info
Kết nối nhà cung cấp trong FreePlay Admin thuộc về toàn bộ nhà thờ, không thuộc về một người hay một TV cụ thể. Các màn hình theo lịch nhận tệp thông qua những kết nối này, vì vậy bạn không cần đăng nhập vào từng nhà cung cấp trên mỗi TV.
:::

**FreeShow** được liệt kê với nhãn **On your church network · each TV finds it itself**. Bạn không cần kết nối gì với FreeShow trong FreePlay Admin.

## Trang Playlists

Trang **Playlists** liệt kê từng danh sách phát cùng số mục, tổng thời lượng, nơi danh sách được sử dụng (**Default loop** đối với một nhóm, hoặc số lịch chiếu) và thời điểm được cập nhật lần cuối. Mỗi dòng có các thao tác sau:

- **Present** - Phát danh sách toàn màn hình trong trình duyệt của bạn
- **Edit** - Mở trình chỉnh sửa danh sách phát
- **Duplicate** - Tạo một bản sao có tên "(copy)"

## Tạo danh sách phát

1. Vào **Playlists** và nhấp **Add playlist**.
2. Nhập **Name**, ví dụ "Welcome loop".
3. Nhấp **Add playlist**. Trình chỉnh sửa danh sách phát sẽ mở ra.

## Thêm mục

Trình chỉnh sửa danh sách phát hiển thị các **Items** của danh sách bên trái và **Add from provider** bên phải.

1. Ở bên phải, chọn một thẻ nhà cung cấp. Để thêm nguồn khác, nhấp **Connect another**, thao tác này sẽ mở trang **Providers**.
2. Nhấp vào các thư mục để đi sâu hơn. Dùng đường dẫn thư mục (breadcrumb) để quay lại cấp trên.
3. Nhấp vào một tệp để thêm vào cuối danh sách phát. Các tệp đã có trong danh sách sẽ được đánh dấu là đã chọn.
4. Để thêm tất cả tệp trong thư mục hiện tại cùng lúc, nhấp **Add all**. Nút này hiển thị số tệp chưa có trong danh sách phát.
5. Nhấp **Save** ở đầu trình chỉnh sửa.

:::warning
Các thay đổi sẽ không được lưu cho đến khi bạn nhấp **Save**. Nhấp **Cancel** để thoát mà không lưu.
:::

## Sắp xếp các mục

Trong danh sách **Items** bên trái:

- **Reorder** - Kéo một mục bằng tay cầm ở bên trái
- **Image timing** - Hình ảnh hiển thị 10 giây theo mặc định. Thay đổi số giây bên cạnh hình ảnh
- **Videos** - Video hiển thị **Plays to end** và phát toàn bộ độ dài của video
- **Remove** - Xóa mục khỏi danh sách phát

Phần tóm tắt ở đầu hiển thị số mục và tổng thời lượng của danh sách phát.

## Đổi tên, sao chép và xóa

Bảng bên trái của trình chỉnh sửa hiển thị nơi danh sách phát được sử dụng. Bảng này cũng có các thao tác sau:

- **Present** - Phát danh sách trong trình duyệt của bạn
- **Rename** - Đổi tên danh sách phát
- **Duplicate** - Tạo một bản sao để chỉnh sửa riêng
- **Delete** - Xóa danh sách phát. Các lịch chiếu đang dùng danh sách này sẽ chuyển về vòng lặp mặc định của nhóm

## Phát danh sách trong trình duyệt

Nhấp **Present** để phát danh sách toàn màn hình trong trình duyệt. Điều này hữu ích khi xem trước danh sách, hoặc khi chạy từ một máy tính xách tay được kết nối với máy chiếu. Di chuyển chuột để hiển thị thanh điều khiển, sau đó dùng các phím sau:

| Phím | Chức năng |
|---|---|
| **Space** | Tạm dừng hoặc tiếp tục |
| **←** / **→** | Mục trước hoặc mục tiếp theo |
| **F** | Bật hoặc tắt toàn màn hình |
| **Esc** | Thoát |

## Bài viết liên quan

- **[Lên lịch chiếu](./scheduling-the-calendar.md)** - Đưa danh sách phát của bạn vào lịch của một nhóm màn hình
- **[Quản lý màn hình và nhóm](./managing-screens.md)** - Đặt một danh sách phát làm vòng lặp mặc định của nhóm
- **[Nhà cung cấp nội dung](../content-providers/index.md)** - Các nhà cung cấp bạn có thể kết nối trực tiếp trên TV
