---
title: "Thiết lập ban đầu"
---

# Thiết lập ban đầu

<div class="article-intro">

Mỗi tài khoản B1 đều đi kèm một trang web sẵn sàng sử dụng. Hướng dẫn này sẽ giúp bạn thiết lập tên miền của nhà thờ, cấu hình giao diện trang web, tạo các trang đầu tiên và sắp xếp thanh điều hướng.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Bạn cần có tài khoản B1.church với quyền quản trị
- Nếu sử dụng tên miền riêng, hãy chuẩn bị thông tin đăng nhập vào nhà cung cấp DNS của bạn (ví dụ: GoDaddy, Cloudflare hoặc AWS)
- Chuẩn bị logo nhà thờ ở định dạng PNG với nền trong suốt để có kết quả tốt nhất

</div>

## Thiết lập tên miền

Nhà thờ của bạn tự động nhận được một tên miền phụ trên B1.church (ví dụ: `yourchurch.b1.church`). Bạn cũng có thể trỏ tên miền riêng đến trang web B1 của mình.

1. Truy cập **B1.church Admin** bằng cách mở admin.b1.church hoặc nhấp vào menu hồ sơ của bạn và chọn **Switch App**.
2. Mở [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (thanh tìm kiếm ở góc trên bên trái), mở rộng **Settings**, rồi nhấp vào **Settings**.
3. Mở mục **Church Information** để xem tên miền phụ của bạn. Đặt tên ngắn gọn, dễ nhớ và không có khoảng trắng.
4. Để sử dụng tên miền riêng, hãy đăng nhập vào nhà cung cấp DNS của bạn (chẳng hạn như GoDaddy, Cloudflare hoặc AWS) và thêm hai bản ghi:
   - Một bản ghi **A** cho tên miền gốc, trỏ đến `3.23.251.61`
   - Một bản ghi **CNAME** cho `www`, trỏ đến `proxy.b1.church`
5. Quay lại B1.church Admin, mở mục **Domains** trên cùng trang Settings, thêm tên miền riêng vào danh sách, rồi nhấp **Add** và sau đó **Save**. Trang web của bạn sẽ có thể truy cập qua tên miền riêng trong vòng vài phút.

:::tip
Nếu bạn không thấy tùy chọn Settings, hãy nhờ người đã thiết lập tài khoản nhà thờ của bạn cấp quyền "Edit Church Settings" cho bạn. Xem [Roles & Permissions](../settings/roles-permissions.md) để biết thêm chi tiết.
:::

## Tạo trang đầu tiên

1. Trong B1 Admin, mở [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (thanh tìm kiếm ở góc trên bên trái), mở rộng **Website**, rồi nhấp vào **Pages**.
2. Nhấp **Add Page** ở góc trên bên phải.
3. Chọn **Blank** làm loại trang và đặt tên là "Home."
4. Nhấp **Page Settings** và đặt đường dẫn URL thành `/` (một dấu gạch chéo, không có chữ nào khác) cho trang chủ của bạn. Các trang khác sử dụng `/page-name`.
5. Nhấp **Edit Content** để bắt đầu xây dựng. Mỗi trang phải bắt đầu bằng một **Section** (phần) -- đây là vùng chứa cho tất cả các thành phần khác.
6. Sau khi thêm một section, nhấp **Add Content** một lần nữa để chèn văn bản, hình ảnh, video, thẻ, biểu mẫu và nhiều thành phần khác bằng cách kéo thả chúng vào section của bạn.

:::info
Để xem hướng dẫn chi tiết về cách làm việc với trang và điều hướng, hãy xem [Managing Pages](managing-pages). Để có hướng dẫn đầy đủ về trình chỉnh sửa trực quan, hãy xem [Using the Page Editor](page-editor).
:::

## Cấu hình giao diện trang web

1. Trong Jump menu, chọn **Website > Appearance**.
2. Sử dụng **Color Palette** để đặt màu thương hiệu cho các tông màu chính, phụ và nhấn mạnh.
3. Trong mục **Fonts**, chọn phông chữ tiêu đề và phông chữ nội dung từ trình duyệt phông chữ.
4. Tải logo nhà thờ lên mục **Logo** trong Style Settings. Hãy cung cấp cả phiên bản dành cho nền sáng và nền tối.
5. Cấu hình **Site Footer** với thông tin liên hệ và liên kết của nhà thờ bạn.

:::info
Các thay đổi bạn thực hiện trong Appearance sẽ áp dụng cho toàn bộ trang web của bạn. Xem trang [Appearance](appearance) để biết hướng dẫn chi tiết về từng cài đặt.
:::

## Thiết lập điều hướng

Các liên kết điều hướng của bạn xuất hiện trong chế độ xem Website Pages. Để sắp xếp chúng:

1. Nhấp **Add** để tạo một liên kết điều hướng mới và trỏ nó đến một trong các trang của bạn.
2. Kéo và thả liên kết để sắp xếp lại thứ tự hoặc lồng chúng dưới các mục cha.
3. Xem trước trang web của bạn để xác nhận điều hướng hiển thị đúng.

## Bước tiếp theo

- [Managing Pages](managing-pages) -- Tìm hiểu chi tiết cách làm việc với trang và điều hướng
- [Appearance](appearance) -- Tinh chỉnh màu sắc, phông chữ và bố cục trang web của bạn
- [Files](files) -- Tải hình ảnh và tài liệu lên cho trang web của bạn
