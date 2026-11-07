---
title: "Giao diện"
---

# Giao diện

<div class="article-intro">

Trang Giao diện cho phép bạn tùy chỉnh diện mạo tổng thể của trang web nhà thờ. Từ màu sắc, phông chữ đến khoảng cách và CSS tùy chỉnh, bạn có thể kiểm soát mọi khía cạnh hiển thị của trang web ngay tại một nơi.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Hoàn tất [Thiết lập ban đầu](initial-setup) cho trang web của bạn
- Chuẩn bị logo nhà thờ ở định dạng PNG, nền trong suốt và tỷ lệ khung hình 4:1
- Biết các màu thương hiệu của nhà thờ (mã hex) nếu bạn đã có sổ tay phong cách

</div>

## Truy cập cài đặt giao diện

1. Trong B1 Admin, mở [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (thanh tìm kiếm ở góc trên bên trái) và mở rộng **Website**.
2. Nhấp **Appearance**.
3. Trang **Site Styles** sẽ tải lên. Thẻ **Theme, fonts & footer** hiển thị danh sách **Style Settings** ở bên trái và bản xem trước một trang web mẫu ở bên phải. Bên dưới là các thẻ **Announcement & widgets** và **Redirects & analytics**.

## Bảng màu {#color-palette}

1. Nhấp **Color Palette** trong bảng Style Settings.
2. Bạn sẽ thấy **Base Colors** (các sắc độ sáng, nhấn và tối) và **Semantic Colors** (Primary, Secondary, Success, Warning và Error).
3. Nhấp vào bất kỳ ô màu nào để mở bộ chọn màu. Kéo con trỏ chọn hoặc nhập mã hex để chọn màu của bạn.
4. **Color Combinations Preview** cho thấy các màu bạn chọn kết hợp với nhau như thế nào.
5. Dùng **Suggested Palettes** để nhanh chóng áp dụng một bảng màu được thiết kế sẵn.
6. Nhấp **Save Palette** khi bạn đã hài lòng.

## Kiểu chữ

1. Nhấp **Fonts** trong bảng Style Settings.
2. Nhấp nút **Heading Font** hoặc **Body Font** để mở trình duyệt phông chữ. Bạn có thể tìm theo tên hoặc duyệt theo danh mục như Serif, Sans Serif, Display, Handwriting và Monospace. Bạn cũng có thể chọn một trong các **Popular Font Combinations**.
3. Nhấp **Save Fonts** để áp dụng lựa chọn phông chữ.
4. Để điều chỉnh thứ bậc kích thước cho Heading 1 đến Heading 4, nhấp **Typography Scale** trong bảng Style Settings. Dùng các trường **Type Scale**, **Base Size** và **Line Height** để tinh chỉnh, sau đó nhấp **Save Typography**.

## Khoảng cách

1. Nhấp **Spacing Scale** trong bảng Style Settings.
2. Điều chỉnh các giá trị khoảng cách từ Extra Small đến Extra Large. Các ví dụ thực tế cho thấy mỗi giá trị ảnh hưởng đến bố cục như thế nào.
3. Nhấp **Save Spacing** để áp dụng các giá trị trên toàn bộ trang web.

## Logo và thương hiệu {#logo-and-branding}

1. Nhấp **Logo** trong bảng Style Settings.
2. Tải lên **Light Background Logo** và **Dark Background Logo** của bạn. Nên dùng hình ảnh có nền trong suốt và tỷ lệ khung hình 4:1 để có kết quả tốt nhất.
3. Tải lên **Social Media Image** để hiển thị khi chia sẻ liên kết và **Favicon** để hiển thị biểu tượng trên thẻ trình duyệt.
4. Nhấp **Save Changes**. Hình ảnh đã tải lên sẽ không được lưu cho đến khi bạn nhấp lưu, vì vậy nếu bạn cố đóng hoặc tải lại thẻ trình duyệt trước, trình duyệt sẽ cảnh báo rằng bạn có thay đổi chưa lưu.

:::tip
Để có kết quả tốt nhất, hãy dùng logo nền trong suốt ở định dạng PNG. Điều này đảm bảo logo hiển thị đẹp trên cả nền sáng lẫn nền tối trên trang web và [ứng dụng di động](../settings/mobile-app.md).
:::

## Kiểu thanh điều hướng

Tùy chỉnh màu thanh điều hướng của trang web cho cả chế độ đặc và chế độ trong suốt:

1. Nhấp **Navigation** trong bảng Style Settings
2. Cấu hình màu cho **Header (solid)** và **Header over hero (transparent)**
3. Nhấp **Save Navigation** để áp dụng màu thanh điều hướng

Để xem hướng dẫn chi tiết, hãy xem [Kiểu thanh điều hướng](./navigation-styles.md).

## Thông báo và tiện ích

Các tiện ích trang web xuất hiện trên mọi trang của bạn, nổi phía trên nội dung trang:

- **Announcement Banner** -- Một thanh có thể đóng ở đầu trang web dành cho thông điệp có thời hạn, chẳng hạn như một sự kiện sắp diễn ra hoặc thay đổi lịch thờ phượng.
- **Launcher** -- Một nút nổi mở menu truy cập nhanh, ví dụ như các liên kết để quyên góp, check-in hoặc xem bản tin.

1. Tìm thẻ **Announcement & widgets** bên dưới bảng Style Settings.
2. Bật các tiện ích bạn muốn và cấu hình văn bản, liên kết và màu sắc của chúng.
3. Nhấp **Save**.

## Chuyển hướng và phân tích

Thẻ **Redirects & analytics** (bên dưới bảng Style Settings) chứa hai cài đặt không liên quan đến nhau nhưng thường cần thiết:

- **Analytics** -- Thêm **GA4 Measurement ID** của bạn (định dạng `G-XXXXXXXXXX`) để theo dõi lưu lượng truy cập trang web. ID này cũng theo dõi lượt xem trang trong ứng dụng B1 của nhà thờ (cổng thành viên tại `/mobile`, bao gồm cả ứng dụng đã cài đặt), được gắn thẻ `display_mode` là `installed` hoặc `browser` để bạn có thể phân biệt lượt truy cập từ ứng dụng đã cài với lượt truy cập từ trình duyệt trong Google Analytics.
- **Redirects** -- Ánh xạ một đường dẫn URL cũ sang đường dẫn mới, để các liên kết đến trang bạn đã di chuyển hoặc đổi tên vẫn hoạt động thay vì báo lỗi 404. Nhập đường dẫn **From** cũ và đường dẫn **To** mới, sau đó nhấp **Save**. Chuyển hướng cũng được ưu tiên hơn các trang tích hợp sẵn của B1 (`/sermons`, `/stream`, `/donate`, `/bible` và `/votd`), vì vậy bạn có thể chuyển địa chỉ đó đến nơi khác (ví dụ, đến trang bài giảng của riêng bạn hoặc kênh YouTube). Chuyển hướng không ghi đè một trang bạn đã tự tạo tại cùng địa chỉ. Hãy xóa trang đó trước nếu bạn muốn chuyển hướng có hiệu lực.

## CSS và JavaScript tùy chỉnh

1. Nhấp **CSS & Javascript** trong bảng Style Settings.
2. Thêm **Custom CSS** để ghi đè kiểu mặc định nhằm tùy chỉnh nâng cao.
3. Thêm **Custom HTML** cho mã theo dõi hoặc các tập lệnh khác.
4. Dùng phần **Common JavaScript Examples** để lấy các đoạn mã mẫu, chẳng hạn như tích hợp Google Analytics.

:::warning
CSS tùy chỉnh rất mạnh nhưng có thể làm hỏng bố cục trang web nếu dùng không đúng cách. Hầu hết các nhà thờ có thể đạt được diện mạo mong muốn bằng các công cụ màu sắc, phông chữ và khoảng cách có sẵn. Chỉ dùng CSS tùy chỉnh nếu bạn quen thuộc với phát triển web.
:::

:::info
Trang web của bạn áp dụng Chính sách bảo mật nội dung (Content Security Policy) chặn các tập lệnh nội tuyến từ bất kỳ nguồn nào khác. Trường **Custom HTML** ở đây và [phần tử HTML](page-editor#using-the-html-element) trên từng trang là các ngoại lệ được tin cậy -- mã bạn lưu ở đó sẽ chạy nguyên dạng, vì vậy chỉ dán các tập lệnh từ nguồn bạn tin cậy (thẻ phân tích, tiện ích trò chuyện và các đoạn nhúng tương tự).
:::

## Chủ đề kiểu dáng

Nếu bạn muốn có điểm khởi đầu nhanh, **Suggested Palettes** trong phần Color Palette cung cấp các chủ đề có sẵn, thiết lập đồng bộ các màu chỉ với một cú nhấp. Bạn luôn có thể tinh chỉnh từng cài đặt riêng lẻ sau khi áp dụng một chủ đề.

## Bước tiếp theo

- [Quản lý trang](managing-pages) -- Xây dựng và sắp xếp các trang web của bạn
- [Tệp](files) -- Tải lên tài nguyên đa phương tiện cho trang web của bạn
