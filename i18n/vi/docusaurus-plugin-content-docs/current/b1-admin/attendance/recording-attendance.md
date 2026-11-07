---
title: "Ghi nhận điểm danh"
---

# Ghi nhận điểm danh

<div class="article-intro">

Sau khi bạn thiết lập xong các cơ sở, giờ phục vụ và nhóm, bạn có thể ghi nhận điểm danh thủ công sau mỗi buổi sinh hoạt. B1 Admin tổ chức điểm danh theo **buổi** — mỗi nhóm có một buổi cho mỗi ngày họp. Bạn tạo buổi, đánh dấu những người có mặt, và dữ liệu sẽ được đưa trực tiếp vào các báo cáo điểm danh.

</div>

## Video hướng dẫn

<YouTube id="gS8h2rhyMys" title="Ghi nhận và theo dõi điểm danh trong B1" next="Tạo kế hoạch và lên lịch tình nguyện viên trong B1" nextUrl="/docs/b1-admin/serving/plans" />

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Các cơ sở, giờ phục vụ và nhóm của bạn phải được cấu hình sẵn. Xem [Thiết lập điểm danh](setup.md) nếu bạn chưa làm bước này.
- Các nhóm bạn muốn theo dõi phải bật **Theo dõi điểm danh**. Xem [Thiết lập điểm danh](setup.md) để biết chi tiết.
- Bạn cần quyền **Chỉnh sửa điểm danh** để lưu điểm danh. Tình nguyện viên chỉ có quyền **Chỉ xem tên người** đối với người vẫn có thể điểm danh theo cách này — họ mở lớp từ **Nhóm** và chỉ thấy tên thành viên. Xem [Chỉ xem tên người](../settings/roles-permissions.md#people-names-only).

</div>

## Tạo buổi

Một buổi đại diện cho một lần diễn ra sinh hoạt của nhóm — ví dụ, lớp K đến lớp 3 vào một Chủ nhật cụ thể.

1. Mở **B1 Admin**, mở [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (thanh tìm kiếm ở góc trên bên trái), mở rộng **Người**, rồi nhấp **Nhóm**.
2. Chọn nhóm bạn muốn ghi nhận điểm danh.
3. Trong mục **Buổi** trên trang của nhóm, nhấp **Tất cả buổi**.
4. Nhấp **Mới** để tạo buổi mới.
5. Nếu nhóm được gán cho một giờ phục vụ, hãy chọn **Giờ phục vụ**. Nếu đó là nhóm không có lịch cố định, trường này sẽ không hiển thị.
6. Chọn **Ngày của buổi** — có thể là hôm nay, một ngày trong quá khứ, hoặc một ngày trong tương lai.
7. Nhấp **Lưu**.

### Thêm buổi cho mọi lớp trong một giờ phục vụ

Nếu các nhóm khác sinh hoạt cùng giờ phục vụ (ví dụ, tất cả các lớp thiếu nhi vào Chủ nhật lúc 9:00 sáng), bạn có thể tạo buổi cho các nhóm đó chỉ trong một bước, thay vì phải vào từng nhóm.

1. Làm theo các bước trên và chọn một **Giờ phục vụ**.
2. Chọn **Cũng thêm cho _N_ nhóm khác trong _giờ phục vụ_**. Ô này hiển thị số nhóm khác được gán vào giờ phục vụ đó. Nó chỉ xuất hiện khi bạn đang thêm buổi mới và có ít nhất một nhóm khác sinh hoạt vào giờ đó.
3. Nhấp **Lưu**.

Một buổi sẽ được tạo cho nhóm hiện tại và cho từng nhóm khác cùng ngày và cùng giờ phục vụ. Các nhóm đã có buổi cho ngày và giờ đó sẽ được bỏ qua, nên bạn sẽ không bị trùng lặp.

:::tip
Bạn có thể tạo buổi cho những ngày đã qua để bổ sung điểm danh mà bạn chưa ghi nhận, hoặc tạo trước để sẵn sàng khi nhóm của bạn gặp nhau.
:::

## Ghi chú buổi {#session-notes}

Mỗi buổi có thể có ghi chú — tóm tắt nội dung đã học, thông báo, hoặc yêu cầu cầu nguyện.

1. Khi thêm buổi, hoặc sau khi nhấp biểu tượng **Sửa** (bút chì) bên cạnh một buổi trong danh sách, hãy nhập vào ô **Ghi chú (nội dung đã học, thông báo, yêu cầu cầu nguyện)** nằm bên dưới ngày. Thanh công cụ cho phép bạn thêm chữ đậm, danh sách và liên kết.
2. Nhấp **Lưu**.

Ghi chú sẽ hiển thị ở đầu danh sách điểm danh của buổi. Đây cũng chính là ghi chú sinh hoạt mà thành viên nhóm đọc trong mục **Buổi họp** trên trang của nhóm trên B1.church, nơi các trưởng nhóm cũng có thể viết và chỉnh sửa. Xem [Chi tiết nhóm](../../b1-church/groups/group-details.md#meeting-notes-and-attendance).

## Đánh dấu điểm danh

Chọn một buổi để xem danh sách điểm danh. Mọi thành viên nhóm đều được liệt kê kèm ô đánh dấu, sắp xếp theo họ, và những người đã được ghi nhận là có mặt sẽ được đánh dấu sẵn.

1. Chọn ô bên cạnh tên từng người đã tham dự. Dùng **Chọn tất cả** hoặc **Bỏ chọn tất cả** để thay đổi cho mọi người cùng lúc.
2. Con số hiển thị phía trên danh sách (ví dụ, "12 trên 15 có mặt") sẽ cập nhật khi bạn chọn các ô.
3. Nhấp **Lưu điểm danh**. Sẽ không có gì được ghi lại cho đến khi bạn lưu, và một thông báo sẽ xác nhận khi việc lưu hoàn tất. Nếu bạn cố đóng hoặc tải lại thẻ trình duyệt trong khi đang lưu, trình duyệt sẽ cảnh báo trước để tránh mất thay đổi.

Nếu bỏ chọn một người đã được ghi nhận là có mặt rồi lưu lại, người đó sẽ bị xóa khỏi buổi.

### Thêm khách

Để ghi nhận một người không phải là thành viên của nhóm, hãy tìm họ bằng ô tìm kiếm người bên cạnh danh sách điểm danh. Nếu họ chưa có trong cơ sở dữ liệu, bạn có thể tạo họ ngay từ ô tìm kiếm. Dù bằng cách nào, họ sẽ được thêm vào danh sách với ô đã được chọn sẵn. Nhấp **Lưu điểm danh** để ghi nhận.

Những người đã check-in tại kiosk sẽ hiển thị nhãn **Tình nguyện viên** hoặc **Khách**. Những người không phải thành viên nhóm sẽ hiển thị nhãn **Khách**.

## Kiểm tra nhóm nào còn thiếu điểm danh

Khi nhiều lớp sinh hoạt cùng giờ phục vụ, bạn có thể xem nhanh những lớp nào vẫn chưa nhập điểm danh cho ngày đó.

1. Mở một buổi có giờ phục vụ.
2. Nhấp **Ai còn thiếu điểm danh** ở đầu danh sách điểm danh.
3. Một hộp thoại sẽ liệt kê mọi nhóm được gán vào giờ phục vụ đó, với phần tóm tắt như "5 trên 8 nhóm đã nhập" ở phía trên.

Các nhóm chưa có ai được đánh dấu có mặt cho ngày đó sẽ hiển thị nhãn **Chưa nhập** và được liệt kê trước. Các nhóm đã có điểm danh sẽ hiển thị **Đã nhập** cùng số người được đánh dấu có mặt (ví dụ, "Đã nhập (12)"). Nhấp vào tên nhóm để mở danh sách buổi của nhóm đó với buổi cùng ngày đã được chọn sẵn, nhờ vậy bạn có thể ghi nhận điểm danh ngay. Nếu nhóm chưa có buổi cho ngày đó, danh sách buổi của nhóm sẽ mở ra để bạn thêm buổi.

:::tip
Kết hợp tính năng này với **In tất cả lớp** và [thêm buổi cho mọi lớp trong một giờ phục vụ](#adding-sessions-for-every-class-in-a-service-time): tạo các buổi, phát phiếu điểm danh, rồi dùng **Ai còn thiếu điểm danh** để xem phiếu nào chưa được nhập.
:::

## In phiếu điểm danh

Phiếu điểm danh là danh sách lớp có thể in ra, để giáo viên đánh dấu bằng tay và giao lại cho bạn nhập sau. Mỗi phiếu hiển thị logo nhà thờ của bạn (**Logo nền sáng** từ [Website > Giao diện](../website/appearance.md), nếu bạn đã tải lên), kèm tên nhà thờ bên dưới, tên lớp, dòng **Ngày** lớn ngay dưới tên lớp, và giờ phục vụ. Thành viên được xếp thành hai cột (đọc từ cột trái xuống, rồi đến cột phải) để có thêm tên trên mỗi trang, và mỗi thành viên có ô **Có mặt** và **Vắng mặt**. Có các dòng trống dành cho khách và khu vực **Giáo viên / Ghi chú**.

- **Từ một buổi** — Nhấp biểu tượng **In phiếu điểm danh** (máy in) ở đầu danh sách điểm danh của buổi. Phiếu sẽ ghi ngày của buổi và hiển thị giờ phục vụ của buổi đó.
- **Tất cả lớp của một giờ phục vụ** — Nếu buổi có giờ phục vụ, nhấp **In tất cả lớp** để in một phiếu cho mỗi lớp được gán vào giờ phục vụ đó. Mỗi lớp sẽ được in riêng một trang.
- **Từ danh sách thành viên** — Trên trang của nhóm, nhấp **Tất cả thành viên**, rồi nhấp biểu tượng **In phiếu điểm danh** phía trên danh sách thành viên và chọn **Phiếu điểm danh** để in phiếu không ghi ngày. Cùng menu này còn có bố cục **Danh bạ liên hệ** với số điện thoại, email và địa chỉ của từng thành viên — xem [In danh sách thành viên](../groups/group-members.md#printing-the-member-list).

Phiếu sẽ mở trong một thẻ mới và hộp thoại in của trình duyệt sẽ tự động xuất hiện.

## Xuất điểm danh ra bảng tính

Bạn có thể tải về bản ghi của buổi dưới dạng tệp CSV để dùng trong Excel, Numbers hoặc Google Sheets.

1. Mở buổi bạn muốn xuất.
2. Nhấp nút **Xuất** ở đầu danh sách điểm danh.
3. Mở tệp đã tải về bằng ứng dụng bảng tính của bạn.

Tệp có một dòng cho mỗi thành viên nhóm, gồm tên và trạng thái có mặt hoặc vắng mặt, cùng với ngày của buổi và ghi chú của buổi.

## Xem điểm danh đã ghi nhận

Sau khi ghi nhận các buổi, dữ liệu sẽ xuất hiện trong báo cáo điểm danh của bạn.

- **Tab Xu hướng điểm danh** (trong **Tất cả các năm** trên trang Điểm danh) — hiển thị xu hướng toàn nhà thờ theo thời gian. Xem [Theo dõi điểm danh](tracking-attendance.md).
- **Tab Điểm danh theo nhóm** — hiển thị điểm danh chia theo từng nhóm. Xem [Báo cáo điểm danh](../reports/attendance-reports.md#group-attendance).

:::tip
Nếu buổi vừa tạo của bạn chưa xuất hiện ngay trong báo cáo, hãy kiểm tra xem ngày của buổi có nằm trong khoảng thời gian đã chọn trong bộ lọc báo cáo hay không.
:::
