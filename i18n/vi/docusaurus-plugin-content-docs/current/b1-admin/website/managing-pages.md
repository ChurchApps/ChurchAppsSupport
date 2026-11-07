---
title: "Quản lý trang"
---

# Quản lý trang

<div class="article-intro">

Chế độ xem Trang web là trung tâm để bạn tạo, chỉnh sửa và sắp xếp tất cả các trang trên website của nhà thờ. Từ màn hình duy nhất này, bạn có thể quản lý cả nội dung trang lẫn điều hướng của website.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Hoàn tất [Thiết lập ban đầu](initial-setup) để cấu hình tên miền và các cài đặt cơ bản của website
- Chuẩn bị sẵn nội dung và hình ảnh. Hãy dùng trình quản lý [Tệp](files) để tải lên các tài nguyên đa phương tiện trước.

</div>

:::info
Nếu nhà thờ của bạn có nhiều hơn một website (ví dụ, mỗi chi nhánh có một website riêng), hãy dùng công cụ chuyển đổi website ở đầu chế độ xem Trang web để chuyển qua lại giữa các website. Mỗi website có trang, điều hướng và cài đặt [giao diện](appearance) riêng.
:::

## Hiểu các loại trang

Bảng **Trang** liệt kê mọi trang trên website của bạn theo **Đường dẫn** và **Tiêu đề**. Có hai loại trang:

- **Được tạo tự động** -- Các trang do hệ thống tự động tạo dựa trên dữ liệu của nhà thờ (ví dụ, trang Nhóm, trang Bài giảng, hoặc một trang riêng cho mỗi bài giảng trong thư viện của bạn). Các trang này hiển thị huy hiệu **Được tạo tự động** và tự cập nhật khi dữ liệu của bạn thay đổi.
- **Tùy chỉnh** -- Các trang do chính bạn tạo, với nội dung và bố cục riêng.

Bạn có thể chuyển bất kỳ trang tự động tạo nào thành trang tùy chỉnh nếu muốn kiểm soát hoàn toàn nội dung và thiết kế. Nhấp **Chuyển đổi** bên cạnh trang được tạo tự động rồi xác nhận.

## Thêm và chỉnh sửa trang

1. Nhấp nút **Thêm trang** ở góc trên bên phải của chế độ xem Trang web.
2. Chọn loại trang (trang trống hoặc một mẫu) và đặt tên cho trang.
3. Nhấp **Chỉnh sửa nội dung** bên cạnh bất kỳ trang nào để mở [trình chỉnh sửa trang](page-editor), nơi bạn có thể thêm phần, văn bản, hình ảnh và các thành phần khác.
4. Nhấp **Cài đặt trang** bên cạnh một trang để cập nhật tiêu đề, đường dẫn URL và các siêu dữ liệu khác.
5. Nhấp đường dẫn của trang trong cột **Đường dẫn** để mở trang trực tiếp trong tab mới và xem chính xác cách khách truy cập sẽ thấy.

:::tip
Với trang chủ, hãy đặt đường dẫn URL chỉ là `/`. Với các trang khác, hãy dùng đường dẫn mô tả như `/about` hoặc `/contact`.
:::

### Cài đặt trang

Mở **Cài đặt trang** trên bất kỳ trang nào để cấu hình:

- **Tiêu đề và đường dẫn URL** -- Tên trang và địa chỉ của trang trên website.
- **Khả năng hiển thị** -- Chọn ai có thể xem trang: mọi người, chỉ thành viên, chỉ nhân viên, hoặc thành viên của các nhóm cụ thể. Đây là cách nhanh để giới hạn một trang riêng tư (như trang tài nguyên dành cho nhân viên) mà không cần mật khẩu riêng.
- **Mô tả meta** -- Một đoạn tóm tắt ngắn hiển thị trong kết quả tìm kiếm và khi chia sẻ liên kết trên mạng xã hội.
- **Chuyển hướng** -- Trỏ một đường dẫn URL cũ đến trang này, để các liên kết và dấu trang dẫn đến một trang đã ngừng sử dụng vẫn hoạt động.

## Quản lý điều hướng

Bảng **Điều hướng chính** ở bên phải chế độ xem Trang web hiển thị các liên kết điều hướng của bạn. Các liên kết này kiểm soát menu mà khách truy cập thấy trên website.

1. Nhấp **Thêm** để tạo liên kết điều hướng mới. Bạn có thể trỏ liên kết đến bất kỳ trang nào trên website hoặc đến một URL bên ngoài.
2. Để sắp xếp lại các liên kết, hãy kéo và thả chúng theo thứ tự mong muốn. Bạn cũng có thể lồng liên kết dưới một mục cha để tạo menu thả xuống.
3. Nhấp vào bất kỳ liên kết nào để mở **Cài đặt liên kết** và thay đổi văn bản, URL hoặc trang cha của liên kết đó.
4. Để xóa một liên kết khỏi điều hướng, hãy mở **Cài đặt liên kết** của liên kết đó rồi nhấp **Xóa**.

:::info
Xóa một liên kết điều hướng không xóa chính trang đó. Trang vẫn tồn tại và vẫn có thể truy cập trực tiếp qua URL của nó -- chỉ là trang sẽ không xuất hiện trong menu.
:::

## Công tắc toàn website

Bên dưới các liên kết trong bảng **Điều hướng chính** là hai công tắc áp dụng cho toàn bộ website của nhà thờ:

- **Hiển thị đăng nhập** -- Hiển thị nút **Đăng nhập** trên thanh điều hướng của website.
- **Tắt website công khai** -- Tắt website công khai của bạn. Hãy dùng tùy chọn này nếu nhà thờ chỉ dùng B1 cho cổng thành viên, dâng hiến và đăng ký, còn website chính đặt ở nơi khác.

### Tác động của việc tắt website công khai

Khi **Tắt website công khai** được bật:

- Mọi trang công khai, bao gồm trang chủ và các trang tùy chỉnh, đều chuyển khách truy cập chưa đăng nhập đến màn hình đăng nhập. Sau khi đăng nhập, họ sẽ quay lại trang mà họ đã yêu cầu.
- Thành viên đã đăng nhập vẫn thấy toàn bộ website như bình thường, bao gồm điều hướng và các trang **Được tạo tự động** tích hợp sẵn (như Nhóm và Bài giảng). Các trang tự động tạo không còn xuất hiện trong bảng Trang.
- Các công cụ tìm kiếm được yêu cầu không lập chỉ mục website. Sơ đồ trang web (sitemap) sẽ trống và `robots.txt` chặn mọi hoạt động thu thập dữ liệu.

Các liên kết sau vẫn hoạt động, nên thành viên và khách vẫn có thể truy cập:

- Đăng nhập và đăng xuất
- Cổng thành viên (mọi nội dung trong `/mobile`)
- Các liên kết [đăng ký sự kiện](../guides/event-registration.md) và đăng ký khách

Một cảnh báo sẽ hiển thị bên dưới công tắc khi website công khai đang tắt. Hãy tắt công tắc này để khôi phục các trang của bạn. Không có gì bị xóa trong khi website đang tắt.

:::info
Cài đặt này áp dụng cho toàn bộ nhà thờ. Nếu bạn có nhiều hơn một website, việc tắt sẽ áp dụng cho tất cả, chứ không chỉ cho website được chọn trong công cụ chuyển đổi.
:::

## Mẹo tổ chức website

- Giữ điều hướng cấp cao nhất ở mức năm hoặc sáu mục để khách truy cập có thể tìm thấy nội dung nhanh chóng.
- Dùng liên kết lồng nhau cho các trang con liên quan (ví dụ, một menu thả xuống "Giới thiệu" với "Đội ngũ của chúng tôi," "Niềm tin," và "Lịch sử").
- Xem thử điều hướng trên điện thoại để đảm bảo hoạt động tốt trên màn hình nhỏ hơn.
- Đặt tên trang rõ ràng, mô tả để khách truy cập hiểu họ sẽ tìm thấy gì.

:::tip
Bạn có thể thêm [biểu mẫu](../forms/creating-forms.md) vào các trang để thu thập đăng ký, yêu cầu cầu nguyện hoặc các thông tin khác từ khách truy cập.
:::

## Bắt đầu từ mẫu website

Nếu bạn đang xây dựng website từ đầu, bạn có thể khởi tạo bằng **Mẫu website** thay vì tạo từng trang một. Mẫu website tạo sẵn một bộ trang -- trang chủ, giới thiệu, kết nối, dâng hiến và các trang khác -- với nội dung giữ chỗ và liên kết điều hướng đã được thiết lập sẵn.

1. Trên màn hình Trang, nhấp nút **Bắt đầu từ mẫu** (bên cạnh nút **Thêm trang**).
2. Duyệt qua các mẫu có sẵn và nhấp vào một mẫu để xem trước cấu trúc trang.
3. Khi tìm thấy mẫu ưng ý, nhấp **Áp dụng mẫu**.
4. Các trang chưa tồn tại sẽ được tạo và thêm vào điều hướng của bạn. Các trang đã có sẵn sẽ được giữ nguyên.

Sau khi áp dụng mẫu, hãy mở từng trang trong [trình chỉnh sửa trang](page-editor) để thay thế văn bản và hình ảnh giữ chỗ bằng nội dung thật của nhà thờ bạn.

:::info
Mẫu website chỉ tạo cấu trúc trang và điều hướng. Chúng không ghi đè bảng màu hoặc phông chữ của website -- các thứ này do [Giao diện](appearance) kiểm soát.
:::

## Hộp xem ảnh (Lightbox)

Khi khách truy cập nhấp vào một hình ảnh trên website của bạn, hình ảnh sẽ mở trong lớp phủ toàn màn hình. Điều này cho phép mọi người xem ảnh với kích thước lớn hơn mà không cần rời khỏi trang. Không cần cấu hình gì -- hộp xem ảnh được bật tự động cho các hình ảnh trong nội dung trang của bạn.

## Bước tiếp theo

- [Thiết lập ban đầu](initial-setup) -- Hướng dẫn thiết lập lần đầu
- [Sử dụng trình chỉnh sửa trang](page-editor) -- Tìm hiểu cách xây dựng và tạo kiểu cho nội dung trang
- [Giao diện](appearance) -- Tùy chỉnh chủ đề hình ảnh của website
- [Tệp](files) -- Tải lên và quản lý tài nguyên đa phương tiện cho các trang của bạn
