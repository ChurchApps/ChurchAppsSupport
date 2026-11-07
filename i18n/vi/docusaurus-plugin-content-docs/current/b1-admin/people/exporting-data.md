---
title: "Xuất dữ liệu"
description: "Xuất danh sách người ra CSV, danh sách thành viên nhóm hoặc bản sao lưu đầy đủ cơ sở dữ liệu B1 từ B1 Admin, và xem nội dung tệp B1 Export Zip."
---

# Xuất dữ liệu

<div class="article-intro">

B1 Admin cho phép bạn xuất dữ liệu của hội thánh để sử dụng trong bảng tính, chia sẻ với nhóm hoặc lưu bản sao lưu. Dù bạn cần một danh sách nhanh gồm tên và email hay toàn bộ cơ sở dữ liệu, đều có các tùy chọn phù hợp.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Bạn cần có tài khoản B1 Admin đang hoạt động và có quyền xem dữ liệu muốn xuất. Xem [Vai trò & Quyền hạn](roles-permissions.md) nếu bạn không chắc về mức truy cập của mình.
- Để xuất toàn bộ cơ sở dữ liệu, bạn cần có quyền truy cập khu vực **Settings** (Cài đặt).

</div>

## Xuất từ trang People (Thành viên)

Cách nhanh nhất để xuất danh bạ là thực hiện trực tiếp từ trang **People** (Thành viên):

1. Mở [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (thanh tìm kiếm ở góc trên bên trái của B1 Admin), mở rộng **People**, rồi nhấp **People**.
2. Dùng thanh tìm kiếm hoặc bộ lọc để thu hẹp kết quả bạn muốn xuất (hoặc để nguyên nếu muốn xuất tất cả mọi người). Xem [Tìm kiếm thành viên](searching-people.md) để biết thêm mẹo lọc.
3. Nhấp nút **Export** (Xuất) ở phần đầu trang People.
4. Một tệp CSV sẽ được tải xuống máy tính với những người có trong kết quả hiện tại, bao gồm tên, thông tin liên hệ, địa chỉ và các trường tiêu chuẩn khác.

:::tip
Tệp xuất sẽ bao gồm tất cả mọi người trong kết quả hiện tại. Hãy tìm kiếm, tải một [Danh sách đã lưu](./lists.md), hoặc dùng tìm kiếm **Advanced** (Nâng cao) trước để chỉ xuất những người bạn cần.
:::

## Xuất toàn bộ dữ liệu từ Settings (Cài đặt)

Để xuất đầy đủ mọi dữ liệu B1 của bạn (không chỉ thành viên), hãy dùng công cụ xuất trong Settings:

1. Trong menu Jump, chọn **Settings > Settings**.
2. Nhấp liên kết **Import/Export** dưới tên hội thánh của bạn ở đầu menu cài đặt bên trái.
3. Chọn **B1 Database** trong danh sách thả xuống **Data Source** (Nguồn dữ liệu).
4. Xem trước dữ liệu rồi nhấp **Continue to Destination** (Tiếp tục đến đích).
5. Chọn **B1 Export Zip** làm đích xuất.
6. Theo dõi tiến trình xuất cho đến khi tất cả các mục hiển thị dấu kiểm màu xanh.
7. Tệp xuất sẽ tự động tải xuống. Tìm tệp `B1Export` trong thư mục tải xuống của bạn.
8. Giải nén tệp để truy cập các tệp CSV riêng lẻ (như `people.csv`) mà bạn có thể mở bằng Excel, Google Sheets hoặc Numbers.

:::info
B1 Export Zip là bản sao lưu đầy đủ dữ liệu của hội thánh bạn. Tệp này bao gồm:

- thành viên (kèm ảnh) và hộ gia đình, bao gồm liên hệ đón con
- chi nhánh, buổi nhóm và giờ nhóm
- nhóm và thành viên trong nhóm
- quỹ và tiền quyên góp, bao gồm các khoản được chia cho nhiều quỹ
- điểm danh
- biểu mẫu, câu hỏi, bài nộp và câu trả lời
- trường tùy chỉnh và giá trị của chúng
- danh sách thành viên đã lưu

Nếu ảnh của một người không thể tải xuống hoặc đọc được trong quá trình xuất, ảnh đó sẽ được bỏ qua và quá trình xuất vẫn tiếp tục mà không có ảnh đó.

Để khôi phục, hãy chọn **B1 Import Zip** làm nguồn và **B1 Database** làm đích (xem [Nhập dữ liệu](./importing-data.md)). Hộ gia đình, liên hệ đón con và danh sách đã lưu sẽ được tái tạo cùng với thành viên. Bộ lọc của danh sách đã lưu sẽ được trỏ đến các nhóm, quỹ, chi nhánh và trường tùy chỉnh đã khôi phục.
:::

## Xuất dữ liệu nhóm

Bạn cũng có thể xuất danh sách thành viên của từng nhóm. Từ trang **Groups** (Nhóm), mở một nhóm và nhấp **biểu tượng tải xuống** để xuất danh sách thành viên của nhóm đó. Xem [Thành viên nhóm](../groups/group-members.md) để biết thêm chi tiết.

:::info
Các tệp CSV đã xuất hoạt động với hầu hết các ứng dụng bảng tính phổ biến, bao gồm Microsoft Excel, Google Sheets và Apple Numbers.
:::
