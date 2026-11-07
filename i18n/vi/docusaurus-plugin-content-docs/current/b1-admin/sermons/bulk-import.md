---
title: "Nhập hàng loạt"
description: "Nhập hàng loạt video bài giảng từ kênh YouTube hoặc tài khoản Vimeo vào B1 Admin, rồi sắp xếp chúng vào danh sách phát."
---

# Nhập hàng loạt

<div class="article-intro">

Trang Nhập hàng loạt giúp bạn nhanh chóng bổ sung thư viện bài giảng bằng cách nhập video từ YouTube hoặc Vimeo. Đây là cách nhanh nhất để đưa nội dung bài giảng hiện có vào hệ thống, thay vì thêm từng video một.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Bạn cần quyền **contentApi.streamingServices.edit**. Xem [Vai trò và quyền hạn](../settings/roles-permissions.md) nếu bạn chưa có quyền truy cập.
- Tạo ít nhất một [danh sách phát](./playlists.md) để nhập bài giảng vào
- Chuẩn bị sẵn ID kênh YouTube hoặc thông tin tài khoản Vimeo của bạn

</div>

## Chọn nguồn

1. Trong B1 Admin, mở [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (thanh tìm kiếm ở góc trên bên trái), mở rộng **Sermons**, rồi nhấp **Sermons**. Nhấp **Add Sermon** và chọn **Bulk Import** từ menu.
2. Trong mục **Choose Import Source**, bạn sẽ thấy hai tùy chọn:
   - **YouTube** -- Nhập video từ một kênh YouTube
   - **Vimeo** -- Nhập video từ một tài khoản Vimeo
3. Nhấp vào tùy chọn của nền tảng nơi bài giảng của bạn được lưu trữ (hoặc nhấp **Import from YouTube** / **Import from Vimeo** bên dưới phần mô tả). Nhấp **Back** ở đầu trang để quay lại lựa chọn nguồn.

:::tip
Bạn có thể quay lại và chuyển đổi nguồn bất cứ lúc nào nếu có video trên cả hai nền tảng.
:::

## Trước khi nhập

Trước khi nhập video, bạn cần ít nhất một danh sách phát để sắp xếp chúng. Nếu bạn chưa tạo danh sách phát nào:

1. Quay lại trang **Sermons** và tìm bảng **Playlists**.
2. Nhấp **Create First Playlist** và điền tên, mô tả, ngày xuất bản và ảnh thu nhỏ.
3. Nhấp **Save**, sau đó quay lại Bulk Import bằng cách nhấp **Add Sermon** và chọn **Bulk Import**.

Xem [Danh sách phát](./playlists.md) để biết hướng dẫn chi tiết về cách tạo và quản lý danh sách phát.

## Nhập video

1. Sau khi chọn YouTube hoặc Vimeo, nhập **YouTube Channel ID** hoặc **thông tin tài khoản Vimeo** vào ô được cung cấp.
2. Nhấp nút **Fetch** để lấy tất cả video có sẵn từ kênh hoặc tài khoản của bạn.
3. Sau khi lấy dữ liệu, bạn sẽ thấy danh sách tất cả video kèm hộp kiểm.
4. Chọn các hộp bên cạnh những video bạn muốn nhập. Bạn có thể chọn tất cả hoặc chọn từng video cụ thể.
5. Tùy chọn: bật **Auto Import New Videos** để tự động thêm các video tải lên sau này vào thư viện.
6. Nhấp menu thả xuống **Import Into Playlist** để chọn danh sách phát mà các video này sẽ được thêm vào.
7. Nhấp nút **Import** để hoàn tất việc nhập hàng loạt.

Video sẽ được nhập kèm đầy đủ thông tin, bao gồm tiêu đề, mô tả, ngày tháng và ảnh thu nhỏ. Các ký tự đặc biệt trong tiêu đề và mô tả YouTube, chẳng hạn như `&`, dấu nháy đơn và dấu ngoặc kép, sẽ được giữ nguyên như đã viết thay vì hiển thị dưới dạng mã như `&amp;`.

:::info
Nhập hàng loạt là lựa chọn lý tưởng để bắt đầu khi bạn chuyển từ nền tảng khác. Để thêm từng bài giảng riêng lẻ về sau, hãy dùng trang [Quản lý bài giảng](./managing-sermons.md).
:::

## Bước tiếp theo

- [Quản lý bài giảng](./managing-sermons.md) -- Chỉnh sửa thông tin bài giảng đã nhập
- [Danh sách phát](./playlists.md) -- Tạo và quản lý chuỗi bài giảng
- [Phát trực tiếp](./live-streaming.md) -- Thiết lập phát trực tiếp cho các buổi thờ phượng
