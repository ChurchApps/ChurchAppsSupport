---
title: "Quản lý bài giảng"
---

# Quản lý bài giảng

<div class="article-intro">

Trang Bài giảng hiển thị toàn bộ thư viện bài giảng của bạn. Từ đây, bạn có thể thêm bài giảng mới, chỉnh sửa các mục hiện có và sắp xếp nội dung theo danh sách phát. Mỗi bài giảng có thể liên kết đến video hoặc âm thanh được lưu trên YouTube, Vimeo, Facebook hoặc một URL tùy chỉnh.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Bạn cần có quyền **contentApi.streamingServices.edit**. Xem [Vai trò & Quyền](../settings/roles-permissions.md) nếu bạn chưa có quyền truy cập.
- Tạo ít nhất một [danh sách phát](playlists) để sắp xếp bài giảng của bạn
- Chuẩn bị sẵn ID video hoặc URL từ YouTube, Vimeo hoặc Facebook

</div>

## Xem thư viện bài giảng

1. Trong B1 Admin, mở [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (thanh tìm kiếm ở góc trên bên trái), mở rộng **Sermons**, rồi nhấp vào **Sermons**.
2. Trang Bài giảng hiển thị các mục bài giảng trong một bảng với **Danh sách phát**, tiêu đề và **Ngày đăng** của từng bài giảng. Sử dụng hộp tìm kiếm phía trên bảng để lọc danh sách. Các danh sách phát của bạn được liệt kê trong bảng **Danh sách phát** bên cạnh bảng.
3. Nhấp **Edit** ở bất kỳ dòng bài giảng nào để xem hoặc chỉnh sửa chi tiết.

## Thêm bài giảng

1. Nhấp nút **Add Sermon** ở góc trên bên phải và chọn **Add Sermon** trong danh sách thả xuống.
2. Chọn một **Danh sách phát** để gán bài giảng vào.
3. Chọn **Nhà cung cấp video** của bạn -- YouTube, Vimeo, Facebook hoặc Custom URL. Chúng tôi khuyên dùng YouTube vì hoạt động tốt nhất với hệ thống B1.
4. Nhập ID video hoặc URL rồi nhấp **Fetch**. Với YouTube, ID video là chuỗi ký tự nằm sau `v=` trong URL YouTube.
5. Khi bạn nhấp **Fetch**, thông tin bài giảng sẽ được nhập tự động, bao gồm ngày đăng, thời lượng, tiêu đề, mô tả và ảnh thu nhỏ.
6. Thực hiện các thay đổi mong muốn và nhấp **Save**.

:::tip
Bạn cũng có thể thêm URL phát trực tiếp cố định bằng cách chọn **Add Permanent Live URL** trong danh sách thả xuống **Add Sermon**. Thao tác này tạo một kết nối lâu dài đến luồng phát trực tiếp trên kênh YouTube của bạn bằng Channel ID. Xem [Phát trực tiếp](live-streaming) để biết thêm chi tiết.
:::

## Chỉnh sửa bài giảng

1. Nhấp **Edit** ở bất kỳ dòng bài giảng nào trong thư viện để mở chi tiết.
2. Cập nhật tiêu đề, người giảng, ngày, mô tả, ảnh thu nhỏ hoặc liên kết phương tiện theo nhu cầu.
3. Nhấp **Save** để áp dụng thay đổi.

## Chi tiết bài giảng

Mỗi mục bài giảng có thể bao gồm:

- **Tiêu đề** -- Tên bài giảng hiển thị cho khách truy cập
- **Người giảng** -- Người đã trình bày bài giảng
- **Ngày** -- Ngày đăng hoặc ngày trình bày
- **Mô tả** -- Tóm tắt nội dung bài giảng
- **Ảnh thu nhỏ** -- Ảnh xem trước hiển thị trong thư viện bài giảng của bạn
- **Liên kết video/âm thanh** -- URL đến phương tiện bài giảng trên YouTube, Vimeo, Facebook hoặc máy chủ tùy chỉnh
- **URL tệp âm thanh (cho podcast)** -- Liên kết trực tiếp đến tệp MP3/M4A của bài giảng này. Bạn có thể dán URL hoặc nhấp **Upload Audio** để tải tệp lên và điền thông tin tự động. Chỉ những bài giảng có trường này (hoặc liên kết tệp video trực tiếp) được thiết lập mới được đưa vào nguồn cấp podcast của bạn.

## Nguồn cấp podcast của bạn

Khi ít nhất một bài giảng có tệp âm thanh hoặc video đính kèm, B1 Admin sẽ tự động tạo nguồn cấp podcast RSS cho hội thánh của bạn -- bạn không cần bật thêm gì. Tìm nguồn cấp trong bảng **Podcast Feed** bên dưới danh sách bài giảng: nhấp biểu tượng sao chép để sao chép URL nguồn cấp, rồi gửi URL đó đến Apple Podcasts, Spotify hoặc bất kỳ thư mục podcast nào khác.

:::info
Các bài giảng chỉ liên kết đến trình phát nhúng (như ID video YouTube hoặc Vimeo) sẽ không xuất hiện trong nguồn cấp podcast -- ứng dụng podcast cần một tệp phương tiện trực tiếp có thể tải xuống. Hãy thêm **URL tệp âm thanh** để đưa bài giảng vào.
:::

## Lên lịch bài giảng cho phát trực tiếp

Sau khi thêm bài giảng, bạn có thể lên lịch phát sóng trên trang phát trực tiếp của mình:

1. Trong menu Jump, chọn **Sermons > Live Stream Times**.
2. Chỉnh sửa một buổi lễ và trong **Video Settings**, chọn bài giảng của bạn từ danh sách thả xuống.
3. Bài giảng sẽ được phát vào thời điểm buổi lễ đã lên lịch.

:::info
Để nhập nhiều bài giảng cùng lúc thay vì thêm từng bài một, hãy sử dụng công cụ [Nhập hàng loạt](bulk-import) để kéo video trực tiếp từ tài khoản YouTube hoặc Vimeo của bạn.
:::

## Bước tiếp theo

- [Danh sách phát](playlists) -- Sắp xếp bài giảng thành chuỗi
- [Phát trực tiếp](live-streaming) -- Cấu hình lịch phát trực tiếp của bạn
- [Nhập hàng loạt](bulk-import) -- Nhập nhiều bài giảng cùng lúc
