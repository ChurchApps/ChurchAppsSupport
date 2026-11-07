---
title: "Viết bài blog cho trang web trong B1 Admin"
sidebar_label: "Blog"
description: "Tạo, lên lịch và xuất bản bài viết blog trên trang web hội thánh trong B1 Admin, bao gồm đoạn trích, danh mục, thẻ, ảnh tiêu đề và nhúng bình luận."
---

# Blog

<div class="article-intro">

Trang Blog cho phép bạn đăng tin tức, cập nhật và bài suy niệm lên website của hội thánh. Các bài đăng xuất hiện dưới dạng danh sách thẻ tại `/blog`, tại địa chỉ URL riêng của từng bài, và trong nguồn RSS để các công cụ khác (như Zapier) có thể theo dõi bài đăng mới.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Hoàn tất [Thiết lập ban đầu](./initial-setup.md) cho website của bạn
- Thêm liên kết điều hướng đến `/blog` từ [Quản lý trang](./managing-pages.md) nếu bạn muốn khách truy cập tìm thấy blog từ menu

</div>

## Truy cập Blog

1. Trong B1 Admin, mở [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (thanh tìm kiếm ở góc trên bên trái) và mở rộng **Website**.
2. Nhấp **Blog**.
3. Trang Blog liệt kê mọi bài đăng cùng trạng thái và ngày xuất bản của chúng.

## Thêm bài đăng

1. Nhấp **Thêm bài đăng** ở góc trên bên phải.
2. Nhập **Tiêu đề**. Một **Địa chỉ web** (slug) thân thiện với URL sẽ được tự động tạo khi bạn gõ -- bạn có thể chỉnh sửa trực tiếp nếu muốn một địa chỉ khác.
3. Thêm **Tóm tắt** -- một đoạn tóm tắt ngắn hiển thị trong danh sách bài đăng, mô tả meta và nguồn RSS. Nếu bạn để trống, hệ thống sẽ tự động tạo tóm tắt từ phần đầu nội dung bài đăng.
4. Viết nội dung bài trong trình soạn thảo **Nội dung** bằng Markdown. Nhấp **Xem trước** để xem bài đăng đã định dạng sẽ trông như thế nào.
5. Chọn **Danh mục** (chọn danh mục có sẵn hoặc nhập danh mục mới) và tùy chọn **Thẻ** phân cách bằng dấu phẩy.
6. Nhấp **Chọn ảnh** để chọn ảnh từ thư viện [Tệp](./files.md) của bạn, hoặc tải ảnh mới lên. Ảnh tải lên sẽ mở trong công cụ cắt tích hợp được khóa ở tỷ lệ 16:9, để bạn có thể căn khung bất kỳ ảnh nào cho vừa với đầu trang bài đăng và thẻ danh sách.
7. Đặt **Tác giả** -- mặc định là bạn, nhưng bạn có thể tìm và chọn bất kỳ người nào trong cơ sở dữ liệu.
8. Bật **Đã xuất bản** và đặt **Ngày xuất bản** khi bạn sẵn sàng công khai bài đăng. Để tắt nếu muốn lưu bài dưới dạng bản nháp.

:::tip
Đặt **Ngày xuất bản** trong tương lai để lên lịch đăng bài. Bài sẽ ẩn với khách truy cập và hiển thị nhãn **Đã lên lịch** trong danh sách Blog cho đến ngày đó.
:::

## Trạng thái bài đăng

Mỗi bài đăng trong danh sách hiển thị một trong ba trạng thái:

- **Bản nháp** -- Chưa xuất bản. Chỉ hiển thị trong trang quản trị.
- **Đã lên lịch** -- Đã bật Đã xuất bản, nhưng ngày xuất bản ở tương lai.
- **Đã xuất bản** -- Hiển thị trên website và có trong nguồn RSS.

## Chỉnh sửa, xem trước và xóa bài đăng

- Nhấp **Chỉnh sửa** bên cạnh bài đăng để thực hiện thay đổi.
- Nhấp **Xem trên trang** (hiển thị ở các bài đã xuất bản) để mở bài đăng trực tiếp trên website trong tab mới.
- Nhấp **Xóa** để gỡ vĩnh viễn bài đăng.

## Cách khách truy cập xem blog của bạn

Các bài đã xuất bản xuất hiện tại `{yoursite}/blog`, mỗi trang 10 bài, với liên kết **Cũ hơn**/**Mới hơn** để lật qua kho lưu trữ, cùng bộ lọc danh mục và tên tác giả, ảnh của mỗi bài. Thẻ cũng hiển thị dưới dạng nhãn có thể nhấp, cho phép khách lọc danh sách theo thẻ tương tự. Từng bài đăng nằm tại `{yoursite}/blog/{slug}` và bao gồm các bài liên quan cùng danh mục. Trang blog cũng xuất bản nguồn RSS, có thể được trình đọc nguồn và công cụ tự động hóa như Zapier tự động phát hiện.

:::info
Bài blog là một loại nội dung riêng biệt so với trang web thông thường -- chúng không được tạo trong [trình soạn thảo trang](./page-editor.md) và không xuất hiện trong danh sách Trang. Điều này giúp việc viết blog nhanh hơn và tập trung vào nội dung.
:::

## Thêm bình luận dưới bài đăng

B1 không tự lưu trữ bình luận blog, nhưng bạn có thể thêm một dịch vụ bình luận. Bạn cũng có thể đặt bất kỳ nội dung nào khác dưới mọi bài đăng, chẳng hạn như form đăng ký nhận bản tin hoặc nút quyên góp.

1. Đăng ký một dịch vụ bình luận như [Hyvor Talk](https://talk.hyvor.com), [FastComments](https://fastcomments.com), hoặc [Disqus](https://disqus.com) và sao chép mã nhúng của dịch vụ đó.
2. Trên trang Blog, cuộn đến **Bên dưới mọi bài đăng**.
3. Dán mã nhúng và nhấp **Lưu**.

Mã sẽ xuất hiện bên dưới nội dung của mọi bài đã xuất bản. Dịch vụ bình luận của bạn xử lý kiểm duyệt và lọc thư rác, vì vậy hãy thường xuyên kiểm tra bảng điều khiển của dịch vụ đó.

:::tip
Xóa nội dung trong ô và nhấp **Lưu** để gỡ mã khỏi mọi bài đăng. Chỉ những người có quyền chỉnh sửa cài đặt hội thánh mới thấy ô này.
:::

## Bước tiếp theo

- [Quản lý trang](./managing-pages.md) -- Thêm liên kết điều hướng đến blog của bạn
- [Tệp](./files.md) -- Tải ảnh lên để dùng trong bài đăng
- [Tích hợp Zapier](../integrations/zapier.md) -- Kích hoạt tự động hóa khi bài đăng mới được xuất bản
