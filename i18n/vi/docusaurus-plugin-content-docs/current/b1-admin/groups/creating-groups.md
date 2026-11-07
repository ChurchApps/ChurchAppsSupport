---
title: "Tạo nhóm"
---

# Tạo nhóm

<div class="article-intro">

Tạo nhóm trong B1 Admin rất đơn giản. Bạn sẽ thiết lập một danh mục, đặt tên cho nhóm, sau đó cấu hình các thiết lập của nhóm. Nhóm giúp bạn tổ chức hội thánh thành các đơn vị có ý nghĩa như nhóm nhỏ, ban điều hành và lớp học.

</div>

## Video hướng dẫn

<YouTube id="uG93pXVreNo" title="Tạo nhóm và thêm thành viên trong B1" next="Yêu cầu tham gia nhóm và lịch nhóm trong B1" nextUrl="/docs/b1-admin/groups/group-join-requests" />

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Bạn cần có tài khoản B1 Admin đang hoạt động với quyền quản lý nhóm. Xem [Vai trò & Quyền](../people/roles-permissions.md) nếu bạn không chắc về mức truy cập của mình.
- Hãy quyết định cấu trúc danh mục cho các nhóm (ví dụ: "Nhóm nhỏ", "Mục vụ", "Ban điều hành"). Danh mục giúp các nhóm liên quan được sắp xếp gọn gàng.

</div>

## Thêm nhóm mới

1. Mở [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (thanh tìm kiếm ở góc trên bên trái của B1 Admin), mở rộng **Người**, rồi nhấp **Nhóm**.
2. Nhấp **Thêm nhóm** ở tiêu đề trang. Một biểu mẫu **Nhóm mới** sẽ mở ra bên dưới danh sách. Nhập **Tên danh mục**. Danh mục giúp bạn sắp xếp các nhóm liên quan với nhau (ví dụ: "Nhóm nhỏ", "Mục vụ" hoặc "Ban điều hành"). Nếu danh mục đã tồn tại, bạn có thể chọn từ danh sách.
3. Nhập **Tên** của nhóm.
4. Nhấp **Thêm**. Nhóm mới sẽ xuất hiện trong danh sách, với danh mục hiển thị bên dưới tên nhóm.

## Cấu hình thiết lập nhóm

Sau khi nhóm được tạo, bạn có thể bổ sung thêm thông tin chi tiết:

1. Nhấp vào **tên nhóm** trong danh sách để mở nhóm.
2. Nhấp nút **Chỉnh sửa** ở phía bên trái trang nhóm, bên dưới thông tin chi tiết của nhóm.
3. Cấu hình các tùy chọn sau:
   - **Mô tả** -- Một bản tóm tắt ngắn về nội dung của nhóm. Thành viên có thể xem phần này.
   - **Giờ họp** -- Thời điểm nhóm thường gặp nhau (ví dụ: "Thứ Tư lúc 7 giờ tối").
   - **Chính sách tham gia** -- Chọn ai có thể tham gia nhóm này:
     - **Mở** -- Bất kỳ ai cũng có thể tham gia ngay mà không cần phê duyệt
     - **Yêu cầu** -- Mọi người phải gửi yêu cầu tham gia và cần được phê duyệt (xem [Yêu cầu tham gia nhóm](./group-join-requests.md))
     - **Đóng** -- Thành viên phải được người lãnh đạo hoặc quản trị viên thêm thủ công
   - **Nhãn** -- Gán một hoặc nhiều nhãn mô tả cho nhóm (ví dụ: "Trực tiếp", "Trực tuyến", "Chào đón thành viên mới"). Nhãn là thẻ tự do do bạn định nghĩa; hãy đánh dấu tất cả những nhãn phù hợp. Nhãn có thể được dùng để lọc nhóm trong thành phần Trình duyệt nhóm trên website.
   - **Nhóm bí mật** -- Ẩn nhóm này và danh sách thành viên khỏi các trang công khai, công cụ tìm nhóm và những người không phải thành viên. Hãy dùng tùy chọn này cho các nhóm nhạy cảm như mục vụ phục hồi hoặc tư vấn; chỉ thành viên nhóm và nhân viên hội thánh mới có thể xem.
   - **Thảo luận** -- Bật hoặc tắt luồng trò chuyện của nhóm, nơi bất kỳ thành viên nào cũng có thể đăng bài. Mặc định là bật.
   - **Thông báo** -- Bật một luồng trò chuyện thứ hai chỉ dành cho người lãnh đạo -- thành viên có thể đọc và bày tỏ cảm xúc, nhưng chỉ người lãnh đạo mới có thể đăng bài. Mặc định là bật.
   - **Theo dõi điểm danh** -- Bật tùy chọn này nếu bạn muốn ghi lại [điểm danh](../attendance/tracking-attendance.md) cho nhóm này.
   - **Giờ thờ phượng** -- Liên kết nhóm với các giờ thờ phượng cụ thể của hội thánh, nếu có. Xem [Thiết lập điểm danh](../attendance/setup.md) để biết chi tiết về giờ thờ phượng.
4. Nhấp **Lưu** để áp dụng các thay đổi.

:::tip
Thêm một mô tả rõ ràng và giờ họp giúp thành viên biết trước những gì sẽ diễn ra khi họ tham gia nhóm.
:::

:::info
Nếu tắt cả Thảo luận và Thông báo, tab Tin nhắn sẽ bị xóa khỏi nhóm trong cổng thành viên. Nếu chỉ tắt một trong hai, tab đó sẽ bị ẩn; thành viên sẽ được chuyển sang luồng nào vẫn đang bật. Dù thế nào, các tin nhắn hiện có vẫn được giữ lại -- các nút bật/tắt chỉ kiểm soát việc đăng bài mới.
:::

## Nhân bản nhóm

Bạn đang bắt đầu một đợt mới của một lớp học hoặc mục vụ định kỳ? Thay vì nhập lại tất cả thiết lập, hãy nhân bản một nhóm có sẵn:

1. Mở nhóm và nhấp **Nhân bản** (bên dưới nút **Chỉnh sửa** ở phía bên trái trang nhóm).
2. Xác nhận việc nhân bản.

Bản sao sẽ giữ lại các thiết lập của nhóm gốc -- danh mục, mô tả, giờ/địa điểm họp, chính sách tham gia, nhãn và cơ sở -- nhưng **không** bao gồm thành viên. Nhóm mới sẽ được đặt tên theo nhóm gốc với " (Bản sao)" được thêm vào sau; hãy đổi tên trong thiết lập nhóm.

## Lưu trữ nhóm

Khi một nhóm không còn hoạt động nhưng bạn muốn giữ lại lịch sử thay vì xóa:

1. Mở nhóm và nhấp **Chỉnh sửa** để sửa thiết lập.
2. Nhấp **Lưu trữ** và xác nhận.

Các nhóm đã lưu trữ sẽ không còn hiển thị trong danh sách Nhóm chính. Để tìm lại, nhấp nút **Hiện nhóm đã lưu trữ** cạnh các nút danh mục ở đầu trang Nhóm, rồi nhấp **Khôi phục** cạnh nhóm để đưa nhóm trở lại.

:::info
Lưu trữ nhóm không xóa thành viên, lịch sử điểm danh hoặc sự kiện lịch của nhóm -- nó chỉ ẩn nhóm khỏi danh sách mặc định cho đến khi bạn khôi phục.
:::

## Bước tiếp theo

Sau khi tạo và cấu hình nhóm, bạn đã sẵn sàng để:

- **Thêm thành viên** -- Tìm kiếm người và thêm họ vào nhóm. Sử dụng biểu tượng ngôi sao (**Đặt làm người lãnh đạo**) để chỉ định người lãnh đạo nhóm. Xem [Thành viên nhóm](./group-members.md).
- **Thiết lập lịch** -- Tạo sự kiện và các buổi họp định kỳ cho nhóm. Xem [Lịch nhóm](./group-calendar.md).
- **Liên lạc** -- Gửi tin nhắn trực tiếp đến tất cả thành viên nhóm từ trang nhóm.
- **Xuất dữ liệu** -- Nhấp **Xuất** phía trên danh sách thành viên của nhóm để tải xuống.

:::info
Mỗi nhóm đều thuộc một danh mục, và trang Nhóm chính cho phép bạn lọc danh sách theo danh mục. Bạn luôn có thể sắp xếp lại hoặc đổi tên danh mục khi hội thánh phát triển.
:::
