---
title: "Nhập dữ liệu"
---

# Nhập dữ liệu

<div class="article-intro">

Công cụ B1 Transfer giúp bạn dễ dàng đưa dữ liệu hiện có vào B1, dù bạn bắt đầu từ đầu bằng một bảng tính, chuyển từ một nền tảng quản lý giáo hội khác, hay nhập các bản ghi quyên góp. Bạn cũng có thể dùng công cụ này để xuất hoặc sao lưu dữ liệu bất cứ lúc nào.

</div>

## Video hướng dẫn

<YouTube id="G-VnhzACYIU" title="Nhập cơ sở dữ liệu người dùng trong B1" next="Searching People and Building Lists in B1" nextUrl="/docs/b1-admin/people/searching-people" />

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Bạn cần có tài khoản B1 Admin đang hoạt động với quyền truy cập **Settings**.
- Hãy xuất dữ liệu từ hệ thống cũ và chuẩn bị sẵn sàng trước khi bắt đầu.
- Công cụ này dành cho việc di chuyển dữ liệu ban đầu. Nếu bạn đã sử dụng B1 một thời gian, việc nhập lại có thể tạo ra các bản ghi trùng lặp.

</div>

## Truy cập công cụ Transfer

1. Đăng nhập vào **B1 Admin**.
2. Mở [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (thanh tìm kiếm ở góc trên bên trái), mở rộng **Settings**, rồi nhấp **Settings**.
3. Nhấp liên kết **Import/Export** bên dưới tên giáo hội của bạn ở đầu menu cài đặt bên trái.
4. Thao tác này sẽ mở công cụ **B1 Transfer** trong một tab mới tại [transfer.b1.church](https://transfer.b1.church).

Công cụ transfer hướng dẫn bạn qua bốn bước: Source (Nguồn), Preview (Xem trước), Destination (Đích) và Run (Chạy).

---

## Bước 1 - Chọn nguồn dữ liệu

Chọn nơi dữ liệu của bạn đến từ đâu. Có bảy tùy chọn:

- **B1 Database** — Lấy dữ liệu trực tiếp từ cơ sở dữ liệu B1 hiện tại của giáo hội bạn. Hữu ích để sao lưu hoặc chuyển đổi dữ liệu sang định dạng khác. Bạn phải đăng nhập để sử dụng tùy chọn này.
- **B1 Import Zip** — Một tệp zip theo định dạng riêng của B1. Tùy chọn này chủ yếu dùng để khôi phục một bản xuất B1 trước đó. Khi tải lại tệp B1 Export Zip vào **B1 Database**, mọi thứ trong bản xuất sẽ được khôi phục (xem [Xuất dữ liệu](./exporting-data.md#full-data-export-from-settings)). Nếu không đọc được tệp, công cụ sẽ hiển thị lỗi thay vì bắt đầu lại từ đầu.
- **Breeze Import Zip** — Một tệp zip chứa các tệp đã xuất từ Breeze ChMS.
- **Planning Center Zip** — Một tệp zip hoặc CSV đã xuất từ Planning Center.
- **Custom CSV / Excel** — Bất kỳ tệp CSV hoặc Excel nào chứa dữ liệu người. Sau khi tải lên, bạn sẽ ánh xạ các cột sang trường của B1 trước khi quá trình nhập tiếp tục.
- **Tithe.ly CSV** — Tệp xuất dữ liệu người hoặc quyên góp từ Tithe.ly (chấp nhận định dạng CSV hoặc Excel).
- **CCB / Pushpay CSV** — Tệp CSV xuất dữ liệu người hoặc quyên góp từ Church Community Builder hoặc Pushpay.

Bạn có thể kéo và thả tệp vào vùng tải lên, hoặc nhấp để duyệt tìm tệp.

---

## Bước 1b - Ánh xạ các trường (chỉ dành cho Custom CSV / Excel)

Nếu bạn chọn **Custom CSV / Excel**, sau khi tải tệp lên, công cụ sẽ hiển thị màn hình ánh xạ trường trước khi chuyển sang bước xem trước.

Mỗi cột trong tệp của bạn được liệt kê cùng với một giá trị mẫu. Với mỗi cột, hãy dùng menu thả xuống để chọn trường B1 tương ứng. Công cụ sẽ tự động nhận diện các tên cột phổ biến như "First Name," "Email," hoặc "Zip Code," nhưng bạn nên kiểm tra từng hàng và sửa bất kỳ cột nào bị bỏ sót.

Các trường B1 có sẵn bao gồm:

- First Name, Last Name, Middle Name, Nickname, Display Name, Title/Prefix, Suffix
- Email, Home Phone, Mobile Phone, Work Phone
- Address Line 1, Address Line 2, City, State, Zip Code
- Birth Date, Anniversary, Gender, Marital Status, Membership Status
- Household/Family Name
- Group Name — gán người đó vào một nhóm theo tên
- **Custom Field (match by name)** — lưu cột vào một trong các [trường người tùy chỉnh](../settings/custom-fields.md) của giáo hội bạn. Một ô **B1 field name** sẽ xuất hiện, được điền sẵn bằng tiêu đề cột. Hãy thay đổi nó thành đúng tên trường như hiển thị trong B1 (không phân biệt chữ hoa chữ thường).
- **Form Answer (custom field)** — lưu giá trị của cột đó như một trường tùy chỉnh gắn với hồ sơ của người đó. Nếu bạn dùng tùy chọn này, bạn sẽ được yêu cầu đặt tên cho biểu mẫu.

Ngày tháng có thể ở các định dạng phổ biến như `9/17/1994` và sẽ được tự động chuyển đổi. Với trường tùy chỉnh, các trường Yes/No chấp nhận các giá trị như Yes, No, Y, N, True, False, 1 và 0; còn các trường trắc nghiệm chấp nhận văn bản của lựa chọn hoặc giá trị của lựa chọn đó.

:::info
Hãy tạo các trường người tùy chỉnh trong B1 Admin trước khi nhập. Khi quá trình nhập hoàn tất, bước **Custom Fields** sẽ liệt kê bất kỳ tên cột nào không khớp với trường B1 và đếm các giá trị không phù hợp với kiểu của trường. Những giá trị này sẽ bị bỏ qua, và phần còn lại của quá trình nhập vẫn hoàn tất bình thường.
:::

Những cột bạn không muốn nhập có thể được đặt thành **(Skip)**. Ít nhất một trường tên (First Name hoặc Last Name) phải được ánh xạ trước khi bạn có thể tiếp tục.

Nhấp **Confirm Mapping & Import** để chuyển sang bước xem trước.

---

## Bước 2 - Xem trước dữ liệu

Sau khi tải lên, công cụ hiển thị bản xem trước toàn bộ dữ liệu sẽ được nhập. Dùng các tab để kiểm tra từng loại dữ liệu:

- **People** — Được liệt kê theo hộ gia đình, kèm ảnh nếu có.
- **Groups** — Được sắp xếp theo cơ sở, buổi lễ, thời gian và danh mục.
- **Attendance** — Ngày của buổi, nhóm và số lần tham dự.
- **Donations** — Đợt, quỹ, người quyên góp và số tiền.
- **Forms** — Tên biểu mẫu và loại nội dung.

Hãy xem xét kỹ trước khi tiếp tục. Nếu có điều gì không ổn, hãy nhấp **Start Over** và sửa tệp nguồn của bạn.

---

## Bước 3 - Chọn đích đến

Chọn nơi bạn muốn dữ liệu được chuyển đến:

- **B1 Database** — Nhập trực tiếp vào cơ sở dữ liệu B1 của giáo hội bạn. Sau khi chọn tùy chọn này, công cụ sẽ hiển thị số lượng bản ghi cuối cùng sẽ được thêm vào. Nhấp **Start Transfer** để xác nhận.
- **B1 Export Zip** — Tải dữ liệu của bạn xuống dưới dạng tệp zip theo định dạng B1, có thể khôi phục sau bằng **B1 Import Zip**. Phù hợp để sao lưu.
- **Breeze Export Zip** — Chuyển đổi dữ liệu của bạn sang định dạng Breeze.
- **Planning Center Zip** — Chuyển đổi dữ liệu của bạn sang định dạng Planning Center.

:::warning
Định dạng nguồn và đích không được giống nhau. Nếu chúng trùng nhau, công cụ sẽ cảnh báo để tránh nhân đôi dữ liệu do vô tình.
:::

---

## Bước 4 - Chạy

Công cụ xử lý quá trình chuyển và hiển thị tiến trình của từng bước:

- Campuses, Services và Times
- People
- Photos
- Groups và Group Members
- Donations
- Attendance
- Forms, Questions, Answers và Form Submissions
- Custom Fields (khi bạn đã ánh xạ bất kỳ cột Custom Field nào)
- Compressing (chỉ dành cho đích là tệp zip)

Khi đích là **B1 Database**, thẻ tiến trình có tiêu đề **Import Progress** và kết thúc bằng **Import Complete!** (hoặc **Import Completed with Errors**). Với đích là tệp zip, các thông báo tương tự sẽ dùng từ **Export**.

:::info
Khi khôi phục **B1 Import Zip**, các bản ghi trỏ đến một thứ không còn có trong tệp sẽ được bỏ qua thay vì dừng quá trình nhập: tư cách thành viên nhóm của những người hoặc nhóm không có trong tệp zip, lượt tham dự của nhóm hoặc người đã bị xóa, và liên kết giữa nhóm với thời gian buổi lễ đã bị xóa. Các buổi tham dự chưa từng gắn với thời gian buổi lễ nào vẫn được khôi phục. Tương tự, khi xuất dữ liệu, một ảnh không thể tải xuống hoặc đọc được sẽ bị bỏ qua để bước **Photos** tiếp tục.
:::

:::warning
Đừng đóng trình duyệt trong khi quá trình chuyển đang chạy. Hãy đợi cho đến khi tất cả các bước hiển thị đã hoàn thành.
:::

---

## Chuẩn bị tệp zip Breeze để nhập

1. Trong Breeze, vào **Settings** và nhấp **Export** ở thanh bên trái.
2. Xuất ba tệp riêng biệt: **People**, **Tags** và **Contributions**.
3. Chọn cả ba tệp, nhấp chuột phải và nén chúng thành một tệp zip duy nhất.
   - Trên Mac: chọn các tệp, nhấp chuột phải và chọn **Compress**.
   - Trên PC: chọn các tệp, nhấp chuột phải, chọn **Send to**, rồi chọn **Compressed (zipped) folder**.
4. Tải tệp zip lên bằng tùy chọn **Breeze Import Zip** ở Bước 1.

Quá trình nhập từ Breeze sẽ tự động chuyển dữ liệu người, nhóm (tags) và bản ghi quyên góp.

---

## Chuẩn bị bản xuất từ Planning Center

1. Đăng nhập vào Planning Center và mở sản phẩm **People**.
2. Ở thanh bên trái, nhấp **Lists** và tạo một danh sách bao gồm tất cả những người bạn muốn chuyển sang. (Nếu bạn đã có danh sách toàn bộ thành viên trong giáo hội, hãy dùng danh sách đó.)
3. Mở danh sách và dùng tùy chọn **export** để tải dữ liệu người của bạn về dưới dạng tệp **CSV**. Hãy bao gồm các trường bạn muốn giữ lại — tên, email, số điện thoại, địa chỉ, ngày sinh, giới tính và trạng thái thành viên đều được ánh xạ sang B1.
4. Nếu Planning Center cung cấp nhiều hơn một tệp, hãy chọn tất cả, nhấp chuột phải và nén chúng thành một tệp zip duy nhất.
   - Trên Mac: chọn các tệp, nhấp chuột phải và chọn **Compress**.
   - Trên PC: chọn các tệp, nhấp chuột phải, chọn **Send to**, rồi chọn **Compressed (zipped) folder**.
5. Tải tệp CSV hoặc zip lên bằng tùy chọn **Planning Center Zip** ở Bước 1.

Sau khi tải lên, hãy tiếp tục đến bước xem trước và xác nhận rằng danh sách người và hộ gia đình của bạn hiển thị đúng trước khi chạy quá trình nhập.

---

## Chuẩn bị bản xuất từ Tithe.ly

1. Trong Tithe.ly, xuất dữ liệu **People** của bạn dưới dạng tệp CSV hoặc Excel. Bạn cũng có thể xuất một tệp **Giving** riêng nếu muốn nhập các bản ghi quyên góp.
2. Công cụ sẽ tự động nhận diện tệp chứa dữ liệu người hay dữ liệu quyên góp dựa trên tên cột.
3. Tải tệp lên bằng tùy chọn **Tithe.ly CSV** ở Bước 1.

:::info
Các tệp xuất từ Tithe.ly có thể nhập từng tệp một. Hãy chạy quy trình hai lần nếu bạn cần nhập riêng dữ liệu người và dữ liệu quyên góp.
:::

---

## Chuẩn bị bản xuất từ CCB hoặc Pushpay

1. Trong Church Community Builder hoặc Pushpay, xuất dữ liệu **People** của bạn dưới dạng tệp CSV. Bạn cũng có thể xuất một tệp quyên góp/đóng góp riêng.
2. Công cụ sẽ tự động nhận diện tệp chứa dữ liệu người hay dữ liệu quyên góp dựa trên tên cột.
3. Tải tệp lên bằng tùy chọn **CCB / Pushpay CSV** ở Bước 1.

---

## Sau khi nhập

Khi quá trình chuyển hoàn tất, hãy dành vài phút để kiểm tra dữ liệu:

1. Mở trang [People](../people/adding-people.md) và kiểm tra ngẫu nhiên một vài hồ sơ.
2. Xác nhận rằng tên, email, số điện thoại và địa chỉ đã được chuyển đúng.
3. Kiểm tra xem các mối liên kết hộ gia đình còn nguyên vẹn không. Vai trò trong hộ gia đình của mỗi người (Head, Spouse, Child hoặc Other) sẽ được giữ lại nếu nguồn dữ liệu có thông tin đó: cột **householdRole** trong B1 Import Zip, **Family Role** trong Breeze hoặc Tithe.ly, và **Family Position** trong CCB / Pushpay. Các vai trò như "Head of Household", "Primary", "Wife" hoặc "Son" sẽ được chuyển sang vai trò B1 tương ứng. Các tệp nhập từ Planning Center và Custom CSV / Excel không có cột vai trò, nên những người này sẽ được đặt thành **Other**; bạn có thể thay đổi vai trò từ hộ gia đình của người đó trên trang [People](../people/adding-people.md#managing-households).
4. Xem lại các nhóm và bản ghi quyên góp đã nhập.

Nếu bạn thấy có vấn đề, bạn có thể chỉnh sửa từng hồ sơ riêng lẻ từ trang People. Bạn cũng có thể chạy lại công cụ transfer để [xuất dữ liệu](exporting-data.md) làm bản sao lưu.
