---
title: "Lập lịch trên trang Lịch"
---

# Lập lịch trên trang Lịch

<div class="article-intro">

Trang **Lịch** trong FreePlay Admin quyết định mỗi nhóm màn hình phát nội dung gì và vào lúc nào. Thêm lịch cho một danh sách phát, một kế hoạch buổi thờ phượng hoặc một thư mục nhà cung cấp, rồi đặt lịch lặp lại hàng tuần hoặc phát một lần. Khi không có lịch nào, vòng lặp mặc định của nhóm sẽ phát.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Tạo ít nhất một nhóm màn hình. Xem [Quản lý màn hình và nhóm](./managing-screens#screen-groups)
- [Tạo danh sách phát](./building-playlists), hoặc đã thiết lập loại kế hoạch trong B1 Admin

</div>

## Đọc trang Lịch

1. Vào **Lịch**.
2. Chọn một nhóm màn hình từ các thẻ ở phía trên. Mỗi thẻ hiển thị số lượng lịch mà nhóm có.
3. Chế độ xem tuần chạy từ thứ Hai đến Chủ nhật, từ 6 giờ sáng đến 10 giờ tối. Một đường màu đỏ đánh dấu thời điểm hiện tại.
4. Dùng các mũi tên để chuyển sang tuần trước hoặc tuần sau, hoặc nhấp **Hôm nay** để quay lại tuần này.

Phụ đề của trang hiển thị múi giờ được dùng cho lịch. Lịch tuân theo múi giờ của hội thánh bạn, được đặt trong B1 Admin tại [Thông tin hội thánh](../../b1-admin/settings/church-settings.md#time-zone). Nếu hội thánh chưa đặt múi giờ, FreePlay sẽ dùng múi giờ của cơ sở bạn. Lịch và TV dùng chung một múi giờ, nên một khối đặt lúc 9:00 sáng trên lịch sẽ phát lúc 9:00 sáng trên màn hình, ngay cả khi máy tính của bạn đặt múi giờ khác.

Lịch được mã hóa màu theo loại. Chú giải giải thích các màu:

- **Vòng lặp mặc định** - Nền kẻ sọc, hiển thị phía sau mọi thứ khi nhóm có vòng lặp mặc định
- **Danh sách phát**
- **Kế hoạch buổi thờ phượng**
- **Thư mục nhà cung cấp**

Mỗi khối hiển thị tên của nó, và các khối cao hơn còn hiển thị thời gian, việc lặp lại (**hàng tuần** hoặc **một lần**) và điều gì xảy ra khi kết thúc sớm.

## Đặt vòng lặp mặc định

Vòng lặp mặc định phát trên màn hình của nhóm bất cứ khi nào không có lịch nào được đặt.

1. Trên trang **Lịch**, nhấp **Vòng lặp mặc định…** ở phần tiêu đề. Nếu đã đặt vòng lặp mặc định, nút sẽ hiển thị **Vòng lặp mặc định:** theo sau là tên danh sách phát.
2. Chọn một **Danh sách phát**, hoặc chọn **Không có — màn hình tắt**.
3. Nhấp **Lưu**.

## Thêm lịch

Có ba cách để bắt đầu một lịch mới:

- Nhấp vào một ô trống trên lịch. Biểu mẫu sẽ mở ra với ngày và nửa giờ đó đã được điền sẵn.
- Nhấp **Thêm lịch** ở phần tiêu đề.
- Chọn **Thêm lịch** từ bảng lệnh (**Ctrl+K** hoặc **⌘K**).

Sau đó điền biểu mẫu:

1. **Phát** - Chọn nội dung cần phát:
   - **Danh sách phát** - Bất kỳ danh sách phát nào bạn đã tạo
   - **Kế hoạch buổi thờ phượng** - Một loại kế hoạch từ B1 Admin, được đánh dấu **(kế hoạch hiện tại)**. Màn hình sẽ phát kế hoạch hiện tại của loại kế hoạch đó mỗi tuần, bao gồm các bài học Go Curriculum (cả những bài đã tùy chỉnh), dùng đăng nhập Go được liên kết với mục vụ của loại kế hoạch
   - **Thư mục nhà cung cấp…** - Mở **Chọn thư mục nhà cung cấp**. Duyệt đến một thư mục và nhấp **Dùng thư mục này**. Để chọn thư mục khác sau này, nhấp **Đổi**
2. **Lặp lại** - Chọn các ngày trong tuần mà lịch này sẽ phát. Để chọn một ngày cụ thể, bật **Một lần** và chọn **Ngày**.
3. **Bắt đầu** và **Kết thúc** - Thời gian lịch bắt đầu và dừng.
4. **Nếu kết thúc sớm** - Việc cần làm khi nội dung hết trước giờ kết thúc:
   - **Lặp đến giờ kết thúc** - Bắt đầu lại từ đầu. Phù hợp cho các vòng lặp biển hiệu, thông báo và đếm ngược
   - **Theo nhịp giảng viên** - Các slide chờ điều khiển từ xa của giảng viên. Bài học vẫn hiển thị sau giờ kết thúc cho đến slide cuối cùng
   - **Phát một lần, rồi quay lại vòng lặp mặc định**
5. Với lịch lặp lại, đặt **Bắt đầu từ** là ngày đầu tiên. Dưới **Kết thúc**, chọn **Không bao giờ**, hoặc chọn **Vào ngày** và nhập **Ngày kết thúc**.
6. Nhấp **Lưu**.

:::info
**Theo nhịp giảng viên** đã thay thế tùy chọn cũ "giữ slide cuối". Các lịch được lưu với tùy chọn đó giờ sẽ phát theo nhịp giảng viên.
:::

## Chỉnh sửa hoặc xóa lịch

1. Nhấp vào khối của lịch trên trang lịch.
2. Thay đổi bất kỳ trường nào rồi nhấp **Lưu**, hoặc nhấp **Xóa** để gỡ lịch.

## Lịch trùng nhau

Nếu hai lịch trùng nhau, biểu mẫu sẽ hiện cảnh báo: **Trùng với một lịch khác. Lịch bắt đầu muộn hơn sẽ được ưu tiên.** Trong khi lịch muộn hơn đang chạy, màn hình sẽ phát nó. Khi nó kết thúc, màn hình sẽ quay lại lịch sớm hơn nếu lịch đó vẫn đang chạy.

## Màn hình cập nhật thay đổi như thế nào

Các màn hình đã ghép đôi sẽ tải xuống mọi nội dung được lên lịch trong 7 ngày tới và tự kiểm tra thay đổi. Bạn không cần chạm vào TV sau khi chỉnh sửa lịch. Để xem khi nào màn hình đã có đủ mọi thứ cần thiết, hãy kiểm tra **Sẵn sàng đến** trên [trang Màn hình](./managing-screens).

## Bài viết liên quan

- **[Tạo danh sách phát](./building-playlists)** - Tạo các danh sách phát bạn sẽ lên lịch
- **[Phát theo lịch trên TV](./scheduled-playback)** - Cách bài học theo nhịp giảng viên và điều khiển từ xa hoạt động trên TV
- **[Quản lý màn hình và nhóm](./managing-screens)** - Thêm nhóm và kiểm tra việc tải xuống của từng màn hình
- **[Chỉ giữ một phần của mỗi bài học](/docs/b1-admin/serving/scheduling-lessons#keeping-only-part-of-every-lesson)** - Cắt mọi bài học đã lên lịch trong một loại kế hoạch xuống các phần mà phòng của bạn phát
