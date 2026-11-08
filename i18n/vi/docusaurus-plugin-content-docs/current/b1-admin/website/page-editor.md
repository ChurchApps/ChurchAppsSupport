---
title: "Sử dụng trình chỉnh sửa trang"
description: "Thiết lập trang trong B1 Admin bằng cách thêm phần và thành phần, định kiểu, xem trước trên điện thoại và xuất bản bản nháp. Cũng bao gồm hoàn tác và lịch sử phiên bản."
---

# Sử dụng trình chỉnh sửa trang

<div class="article-intro">

Trình chỉnh sửa trang của B1 là công cụ xây dựng trực quan với thao tác kéo và thả, giúp bạn thiết kế các trang web của nhà thờ mà không cần viết mã. Bạn có thể thêm phần và khối nội dung, tùy chỉnh kiểu dáng, xem trước kết quả và hoàn tác thay đổi, tất cả ngay trong trình duyệt.

</div>

## Video hướng dẫn

<YouTube id="m2B_JxmfFm4" title="Chỉnh sửa trang và điều hướng trong B1" next="Kết nối tên miền tùy chỉnh trong B1" nextUrl="/docs/b1-admin/settings/custom-domain" />

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Hoàn tất [Thiết lập ban đầu](./initial-setup.md) để cấu hình trang web của bạn
- Tạo ít nhất một trang trong [Quản lý trang](./managing-pages.md)
- Bạn cần quyền **content.edit** để truy cập trình chỉnh sửa

</div>

## Mở trình chỉnh sửa

1. Trong B1 Admin, mở [Menu nhảy nhanh](../introduction.md#getting-around-with-the-jump-menu) (thanh tìm kiếm ở góc trên bên trái), mở rộng **Website**, rồi nhấp **Pages**.
2. Tìm trang bạn muốn chỉnh sửa trong bảng Pages và nhấp **Edit Content**.

Trình chỉnh sửa mở ở chế độ toàn màn hình. Bảng bên trái hiển thị cấu trúc trang và các thành phần nội dung có sẵn; khu vực ở giữa hiển thị bản xem trước trực tiếp của trang.

:::info
Trình chỉnh sửa luôn hiển thị ở chế độ sáng, bất kể cài đặt giao diện B1 Admin của bạn, và sử dụng phông chữ tiêu đề và nội dung mà bạn đã chọn trong [Giao diện](./appearance.md). Điều này đảm bảo bản xem trước khớp chính xác với cách trang hiển thị với khách truy cập website.
:::

## Cấu trúc trang: Phần và thành phần

Mỗi trang được xây dựng từ hai cấp:

- **Phần** -- Các vùng chứa cấp cao nhất chia trang thành những dải ngang (ví dụ: phần giới thiệu nổi bật, khối nội dung hoặc dải chân trang). Mỗi trang phải có ít nhất một phần trước khi bạn có thể thêm nội dung.
- **Thành phần** -- Các mảnh nội dung riêng lẻ được đặt bên trong một phần, chẳng hạn như văn bản, hình ảnh, nút bấm, thẻ, biểu mẫu và lịch.

### Thêm phần

1. Nhấp **Add Section** (hoặc nút **+** ở đầu bảng bên trái).
2. Chọn cách bắt đầu:
   - **Từ mẫu** — duyệt thư viện mẫu phần được phân loại theo danh mục (Hero, About, Services, Giving, v.v.) và nhấp một mẫu để chèn vào dưới dạng phần đã được định kiểu và điền sẵn nội dung. Bạn có thể tùy chỉnh mọi thứ sau khi phần được thêm vào.
   - **Phần trống** — chọn bố cục cột (một cột, hai cột, ba cột, v.v.) và xây dựng từ đầu.
3. Phần mới xuất hiện trong bản xem trước. Nhấp vào phần để chọn và cấu hình màu nền, khoảng đệm và các tùy chọn kiểu dáng khác.

### Đổi bố cục phần

Đã xây dựng xong một phần nhưng muốn cấu trúc khác? Dùng công cụ đổi bố cục trên phần đó để thay đổi cách sắp xếp cột sang một bố cục khác trong thư viện, đồng thời giữ nguyên nội dung và thành phần hiện có.

### Thêm thành phần vào phần

1. Nhấp vào bên trong một phần trong bản xem trước để chọn phần đó.
2. Nhấp **Add Content** và chọn loại thành phần từ danh sách:
   - **Text** -- Tiêu đề, đoạn văn và văn bản định dạng
   - **Image** -- Tải lên hoặc liên kết đến một bức ảnh
   - **Button** -- Liên kết nút bấm kêu gọi hành động
   - **Card** -- Một hình ảnh kèm tiêu đề và mô tả
   - **Form** -- Nhúng một [biểu mẫu](../forms/creating-forms.md) trực tiếp vào trang. Nếu biểu mẫu có [ảnh tiêu đề](../forms/creating-forms.md#adding-a-header-photo), ảnh sẽ hiển thị phía trên các câu hỏi
   - **Calendar** -- Hiển thị lịch sự kiện
   - **FAQ** -- Các khối câu hỏi và trả lời dạng accordion
   - **Video** -- Nhúng video theo URL
   - **Groups Browser** -- Danh bạ có thể lọc tất cả các nhóm của nhà thờ, với tùy chọn tìm kiếm, lọc theo danh mục và lọc theo nhãn. **Layout** của nó có thể là **Grid** (mặc định) hoặc **Scrolling (automatic)** -- xem [Bố cục cuộn](#scrolling-layouts)
   - **Group List** -- Các ô hiển thị nhóm công khai của bạn, có thể chỉ hiển thị các nhóm có một nhãn nhất định. **Layout** của nó có thể là **Grid** (mặc định; tối đa ba ô mỗi hàng) hoặc **Scrolling (automatic)** -- xem [Bố cục cuộn](#scrolling-layouts)
   - **Icon Feature** -- Một biểu tượng kèm tiêu đề và mô tả ngắn, dùng để nổi bật tính năng hoặc mục vụ
   - **Gallery** -- Lưới hoặc bố cục masonry nhiều ảnh
   - **Testimonial** -- Một hoặc nhiều lời chứng thực kèm tên tác giả, vai trò và ảnh
   - **Social Icons** -- Các biểu tượng liên kết đến hồ sơ mạng xã hội của nhà thờ: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo và Podcast. Điền liên kết cho từng mạng bạn muốn hiển thị; với **WhatsApp**, hãy dùng liên kết `https://wa.me/` kèm số điện thoại của bạn hoặc liên kết mời tham gia nhóm
   - **Countdown** -- Bộ đếm ngược đến một ngày hoặc giờ thờ phượng hằng tuần
   - **Stats** -- Một hàng số lớn kèm nhãn (thành viên, số năm, cơ sở)
   - **Campaign Progress** -- Thanh tiến trình trực tiếp cho một chiến dịch quyên góp, hiển thị tổng số tiền đã gây được so với mục tiêu quỹ
   - **Staff Grid** -- Thẻ ảnh cho các thành viên của một nhóm; nhóm đó phải bật tùy chọn **public roster**
   - **Service Times** -- Lịch các buổi thờ phượng của các cơ sở, được lấy tự động từ thiết lập điểm danh
   - **Sermons** -- Thư viện bài giảng của bạn, dưới dạng trình duyệt đầy đủ hoặc bố cục lưới, danh sách, hay bài mới nổi bật
   - **Map** -- Bản đồ nhúng được căn giữa theo địa chỉ nhà thờ của bạn
   - **Table** -- Lưới đơn giản gồm các hàng và cột cho nội dung dạng bảng
   - **Text with Photo** -- Văn bản và hình ảnh đặt cạnh nhau
   - **Logo** -- Logo nhà thờ của bạn, lấy từ [Giao diện](./appearance.md)
   - **Live Stream** -- Trình phát luồng trực tiếp của bạn, được nhúng trực tiếp vào trang
   - **Podcast** -- Danh sách các tập lấy từ URL nguồn RSS podcast bên ngoài mà bạn cung cấp, với cài đặt số tập hiển thị và có hiển thị ngày và mô tả hay không. Mỗi tập trên trang web trực tiếp có trình phát âm thanh và liên kết **Download** để lưu tệp âm thanh của tập dưới tên tiêu đề tập đó. Thành phần này dùng để giới thiệu bất kỳ nguồn podcast nào trên trang của bạn; để xuất bản bài giảng của chính mình dưới dạng podcast, hãy xem thay thế [Quản lý bài giảng](../sermons/managing-sermons.md#your-podcast-feed)
   - **Donation** -- Nút quyên góp hoặc biểu mẫu quyên góp được nhúng
   - **HTML** -- HTML thô của riêng bạn, dành cho các trường hợp nâng cao như nhúng widget của bên thứ ba (xem [Sử dụng thành phần HTML](#using-the-html-element))
   - **iFrame** -- Nhúng nội dung bên ngoài theo URL
3. Cấu hình thành phần bằng bảng cài đặt xuất hiện.

### Sử dụng thành phần HTML

Thành phần **HTML** có hai ô:

- **HTML Content** -- Mã đánh dấu sẽ hiển thị trên trang. Mọi thẻ `<script>` bạn đưa vào đây sẽ chạy trên trang web trực tiếp.
- **JavaScript (exclude script tag)** -- Mã script chạy khi trang được tải. Bạn cũng có thể dán đoạn mã nhúng của nhà cung cấp kèm các thẻ `<script>` vào đây, và đoạn mã đó sẽ chạy trên trang web trực tiếp.

Nếu bạn chỉ dán một địa chỉ web (chẳng hạn liên kết hình ảnh) vào ô JavaScript, ô sẽ chuyển sang màu đỏ kèm cảnh báo *"This is a web address, not JavaScript."* Một địa chỉ đứng riêng trong ô đó sẽ không làm gì cả. Để hiển thị hình ảnh, hãy dùng thành phần **Image** hoặc đặt `<img src="...">` vào **HTML Content**.

### Sử dụng thành phần Calendar {#using-the-calendar-element}

Thành phần **Calendar** hiển thị sự kiện từ một trong các lịch của bạn:

1. Dưới **Select**, chọn **Group Calendar** (sự kiện của một nhóm -- danh sách hiển thị các nhóm bạn tham gia) hoặc **Curated Calendar** (lịch bạn đã tạo trong **Calendars**; xem [Curated Calendar](../calendars/curated-calendar.md)).
2. Dưới **Select Calendar**, chọn nhóm hoặc lịch.
3. Dưới **Display**, chọn cách hiển thị:
   - **Month calendar** -- Lưới theo tháng để khách truy cập có thể chuyển qua các tháng. Mỗi sự kiện được tô màu theo nhóm mà nó thuộc về, nên sự kiện của một nhóm có cùng màu trên mọi lịch. B1 tự động chọn màu; bạn không cần thiết lập gì.
   - **Upcoming events** -- Lưới các ô cho 12 sự kiện sắp tới, trong đó sự kiện lặp lại chỉ hiển thị một lần vào ngày gần nhất. Mỗi ô hiển thị ảnh của sự kiện (hoặc tiêu đề trên nền màu tối của giao diện nếu không có ảnh), nhãn ngày, ngày và giờ, cùng dòng đầu tiên của mô tả. Nút **Subscribe** phía trên các ô cho phép khách truy cập sao chép liên kết ICS của lịch hoặc tải xuống. Cài đặt **Layout** xuất hiện cho kiểu hiển thị này: **Grid** (mặc định) hoặc **Scrolling (automatic)**, sắp xếp các ô thành một hàng tự động cuộn (xem [Bố cục cuộn](#scrolling-layouts)). Với **Curated Calendar**, bật cài đặt **Group badge** để hiển thị tên nhóm của mỗi sự kiện ở góc trên bên phải ô, theo màu lịch của nhóm đó. Sự kiện từ nhóm đã lưu trữ hoặc nhóm bảo mật sẽ không có nhãn.
4. Để chỉ hiển thị một số sự kiện, nhập thẻ vào **Only events tagged** -- ví dụ, `youth`. Chỉ những sự kiện có **Tags** chứa từ đó mới xuất hiện. Để trống để hiển thị mọi sự kiện. Thẻ được đặt trên từng sự kiện; xem [Thêm và chỉnh sửa sự kiện](../calendars/creating-calendars.md#adding-and-editing-events).

Ở cả hai kiểu hiển thị, nhấp vào một sự kiện sẽ mở trang riêng của sự kiện đó trên website. Trang sự kiện hiển thị ảnh, tiêu đề, ngày và giờ, mô tả sự kiện, cùng một khung có **When** (bao gồm quy luật lặp lại đối với sự kiện định kỳ) và **Where** (các phòng đã đặt cho sự kiện). Trang cũng có nút **Register for this Event** khi bật đăng ký và liên kết **Add to my calendar** để tải sự kiện xuống dưới dạng tệp lịch. Trang được thiết lập để công cụ tìm kiếm có thể hiển thị ngày và chi tiết sự kiện trong kết quả. Các trang sự kiện từ lịch được chọn lọc, hiển thị trên trang của bạn (cho các sự kiện trong sáu tháng tới), cũng được liệt kê trong sơ đồ trang web (sitemap), để công cụ tìm kiếm có thể tìm thấy chúng.

### Bố cục cuộn {#scrolling-layouts}

Bố cục **Scrolling (automatic)** trên **Groups Browser**, **Group List** và kiểu hiển thị **Upcoming events** của thành phần Calendar sắp xếp các ô thành một hàng thay vì lưới. Trên điện thoại, mỗi ô chiếm trọn hàng; trên máy tính, hai ô vừa vặn cạnh nhau. Khi có nhiều ô hơn mức hiển thị được, hàng sẽ:

- Chuyển sang ô tiếp theo khoảng bốn giây một lần, và quay lại ô đầu tiên sau khi đến ô cuối cùng.
- Tạm dừng khi khách truy cập di chuột vào, chạm vào hoặc dùng phím Tab để đến hàng, rồi tiếp tục sau vài giây.
- Hiển thị một hàng chấm bên dưới, mỗi ô một chấm, với chấm của ô hiện tại được tô đậm. Khách truy cập có thể nhấp vào một chấm để chuyển đến ô tương ứng.

Trên thiết bị được cài đặt giảm chuyển động, hàng sẽ đứng yên và khách truy cập tự vuốt hoặc cuộn. Nếu tất cả các ô vừa vặn trong một màn hình, hàng không di chuyển và không có chấm nào xuất hiện.

### Sắp xếp lại nội dung

Kéo phần hoặc thành phần bằng biểu tượng tay cầm (sáu chấm) ở bên trái mỗi mục để sắp xếp lại. Bạn có thể kéo thành phần trong cùng một phần hoặc chuyển chúng sang phần khác.

## Định kiểu trang

### Kiểu của phần

Nhấp vào bất kỳ phần nào để mở bảng kiểu. Bạn có thể đặt:

- **Background** -- Màu đặc, chuyển màu gradient hoặc ảnh. Khi dùng ảnh làm nền, công cụ **Focal Point** cho phép bạn nhấp để chọn phần nào của ảnh giữ ở giữa khi phần được co giãn, và tùy chọn màu **Overlay** cho phép bạn thêm lớp phủ bán trong suốt lên ảnh để chữ dễ đọc hơn.
- **Padding** -- Khoảng cách trên và dưới bên trong phần
- **Width** -- Toàn chiều rộng hoặc căn giữa/giới hạn chiều rộng
- **Dividers** -- Đường phân cách trang trí dạng hình (sóng, nghiêng, cong, tam giác và nhiều kiểu khác) ở cạnh trên hoặc cạnh dưới của phần, với các tùy chọn màu, chiều cao và lật

### Kiểu của thành phần

Nhấp vào bất kỳ thành phần nào để mở bảng kiểu. Các tùy chọn phổ biến gồm cỡ chữ, màu sắc, căn lề, lề ngoài và khoảng đệm. Với hình ảnh, bạn có thể đặt văn bản thay thế (alt text) và đích của liên kết.

### CSS tùy chỉnh

Với việc định kiểu nâng cao, mỗi phần và thành phần đều có ô **Custom CSS** để bạn viết quy tắc CSS riêng. Các quy tắc này chỉ áp dụng cho thành phần đó, nên sẽ không vô tình ảnh hưởng đến phần còn lại của trang.

:::tip
Nếu bạn cần áp dụng kiểu cho toàn bộ website -- chẳng hạn phông chữ tùy chỉnh hoặc màu chung -- hãy dùng cài đặt [Giao diện](./appearance.md) thay vì CSS tùy chỉnh trên từng trang.
:::

## Xem trước trang

Dùng các nút xem trước trên thanh công cụ để kiểm tra trang trông như thế nào ở các kích thước màn hình khác nhau:

- **Desktop** -- Chế độ xem toàn chiều rộng trên trình duyệt
- **Mobile** -- Chế độ xem hẹp cỡ điện thoại

Trên điện thoại, các cột trong một hàng sẽ xếp chồng lên nhau theo chiều dọc với toàn chiều rộng, trừ khi bạn đặt **Mobile Width** cho chúng trong cài đặt của hàng. Danh sách bài giảng và podcast cũng xếp phần văn bản của mỗi tập bên dưới ảnh thu nhỏ khi xem trên điện thoại.

Để xem trang trực tiếp đúng như khách truy cập sẽ thấy, hãy quay lại danh sách Pages và nhấp vào đường dẫn của trang. Trang sẽ mở trong một thẻ trình duyệt mới.

## Kiểm tra khả năng truy cập

Nhấp vào biểu tượng **Accessibility** trên thanh công cụ để chạy kiểm tra nhanh các lỗi thường gặp -- hình ảnh thiếu văn bản thay thế, độ tương phản màu thấp hoặc tiêu đề sai thứ tự. Mỗi lỗi có liên kết trực tiếp đến thành phần cần sửa để bạn có thể khắc phục ngay tại chỗ.

## Hoàn tác thay đổi

Trình chỉnh sửa tự động ghi lại lịch sử chỉnh sửa của bạn. Dùng các nút trên thanh công cụ hoặc phím tắt để điều hướng:

- **Undo** (Ctrl+Z / Cmd+Z) -- Hoàn tác thao tác cuối cùng
- **Redo** (Ctrl+Shift+Z hoặc Ctrl+Y / Cmd+Shift+Z) -- Thực hiện lại thao tác đã hoàn tác

Bạn cũng có thể khôi phục trang về một bản chụp trước đó. Nhấp **View history** trên thanh công cụ để xem danh sách các bản chụp đã lưu kèm mô tả, rồi nhấp vào bất kỳ mục nào để khôi phục về thời điểm đó.

:::warning
Khôi phục bản chụp sẽ thay thế nội dung trang hiện tại bằng phiên bản trong bản chụp. Thao tác này không thể hoàn tác bằng nút hoàn tác thông thường. Nếu muốn giữ khả năng quay lại, hãy lưu bản chụp trạng thái hiện tại trước khi khôi phục một bản cũ.
:::

## Lưu và xuất bản

Thay đổi được tự động lưu khi bạn làm việc. Chỉ báo trạng thái trên thanh công cụ cho biết các thay đổi của bạn đã được lưu hay chưa.

### Trạng thái bản nháp và đã xuất bản

Trang có thể ở trạng thái **published**, quyết định thời điểm khách truy cập thấy các thay đổi của bạn. Thanh công cụ hiển thị một nhãn trạng thái cho biết tình trạng hiện tại:

- **Live on save** -- Trang không dùng quy trình xuất bản. Mọi thay đổi được lưu sẽ có hiệu lực ngay lập tức. Đây là mặc định cho trang mới.
- **Unpublished changes** -- Trang đã được xuất bản trước đó, nhưng bạn đã thay đổi kể từ lần xuất bản gần nhất. Khách truy cập vẫn thấy phiên bản đã xuất bản trước đó.
- **Published** -- Trang đang hoạt động và nội dung đã lưu của bạn khớp với những gì khách truy cập thấy.

Để xuất bản thay đổi, nhấp nút **Publish** trên thanh công cụ. Trang sẽ có hiệu lực ngay lập tức.

Để quay về phiên bản đã xuất bản gần nhất mà không ảnh hưởng đến nội dung khách truy cập đang thấy, mở menu tràn (⋮) và nhấp **Discard unpublished changes**.

Để ngừng sử dụng quy trình xuất bản, mở menu tràn và nhấp **Turn off publishing**. Sau đó, các chỉnh sửa sẽ lại có hiệu lực ngay lập tức.

:::tip
Dùng quy trình bản nháp/xuất bản khi bạn muốn chuẩn bị trang -- chẳng hạn cho một sự kiện sắp tới -- và chỉ đưa trang lên mạng vào đúng thời điểm. Hãy xây dựng và xem trước trang, rồi nhấp Publish khi đã sẵn sàng.
:::

## Bài viết liên quan

- [Quản lý trang](./managing-pages.md) -- Tạo trang, đặt URL và quản lý điều hướng website
- [Giao diện](./appearance.md) -- Thiết lập màu sắc, phông chữ và thương hiệu cho toàn bộ website
- [Tệp](./files.md) -- Tải lên hình ảnh và tài liệu để sử dụng trong trình chỉnh sửa
- [Tạo biểu mẫu](../forms/creating-forms.md) -- Xây dựng biểu mẫu có thể nhúng vào trang
