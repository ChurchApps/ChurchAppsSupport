---
title: "Các đợt quyên góp"
---

# Các đợt quyên góp

<div class="article-intro">

Đợt (batch) giúp nhóm các khoản quyên góp lại với nhau để dễ theo dõi và đối chiếu hơn. Một đợt thường ứng với một lần thu, chẳng hạn như tiền dâng Chúa Nhật hoặc một sự kiện đặc biệt. Dùng đợt giúp bạn sắp xếp gọn gàng và dễ kiểm tra xem sổ sách có khớp với số tiền thực tế đã gửi vào tài khoản hay không.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Hãy chắc chắn bạn đã [thiết lập các quỹ](funds.md) để có sẵn khi ghi nhận quyên góp
- Bạn cần quyền **Xem tóm tắt quyên góp**, **Sửa quyên góp** hoặc **Nhập quyên góp** để xem trang Đợt (xem [Ai có thể thay đổi đợt](#who-can-change-a-batch))

</div>

## Trang Đợt

Khi bạn vào **Donations > Batches**, bạn sẽ thấy danh sách các đợt. Mỗi dòng hiển thị:

- **Tên** -- nhãn bạn đặt cho đợt
- **Ngày** -- ngày diễn ra lần thu
- **Donations** -- số khoản quyên góp riêng lẻ trong đợt
- **Total** -- tổng số tiền bằng đô la
- **Status** -- **Open** (đang mở) hoặc **Closed** (đã đóng) (xem [Đóng và mở lại một đợt](#closing-and-reopening-a-batch))

Phía trên danh sách có các nút năm, cho phép bạn chỉ xem các đợt trong một năm, hoặc **All** để xem tất cả. Một dòng tóm tắt ngắn cho biết số đợt, số khoản quà và tổng số tiền của các đợt đang hiển thị.

## Tạo đợt mới

1. Nhấn **Add Batch** ở đầu trang.
2. Nhập một tên mô tả rõ ràng (ví dụ: “Sunday Offering - Feb 9”).
3. Chọn ngày diễn ra lần thu.
4. Nhấn **Save**.

Đợt mới sẽ xuất hiện trong danh sách, sẵn sàng để bạn thêm các khoản quyên góp.

## Làm việc với đợt

- **Xem khoản quyên góp** -- nhấn vào tên đợt để mở và xem tất cả khoản quyên góp riêng lẻ trong đó. Từ đây bạn có thể thêm, sửa hoặc xóa khoản quyên góp, hoặc nhấn **Import CSV** để thêm nhiều khoản cùng lúc từ bảng tính (xem [Nhập khoản quyên góp từ tệp CSV](recording-donations.md#importing-donations-from-a-csv-file)).
- **Sửa thông tin đợt** -- nhấn nút **Edit** trên dòng của đợt để thay đổi tên hoặc ngày. Chỉ những người có quyền **Sửa quyên góp** mới có thể xóa một đợt.
- **Sắp xếp** -- dùng tiêu đề cột để sắp xếp các đợt theo tên hoặc ngày.
- **Xuất dữ liệu** -- nhấn **Export** ở đầu trang để tải xuống các đợt đang hiển thị dưới dạng bảng tính (CSV).
- **Sự kiện lỗi** -- nếu cổng thanh toán của bạn đã báo có sự cố, một nút **Failed events** (kèm số sự kiện chưa được xử lý) sẽ xuất hiện ở đầu trang. Nhấn vào đó để hiện hoặc ẩn danh sách sự kiện bên dưới các đợt.
- **Nhập từ Stripe** -- nhấn **Import missing Stripe transactions** ở đầu trang để mở công cụ [Nhập từ Stripe](stripe-import.md). Nút này chỉ xuất hiện khi cổng quyên góp của hội thánh bạn là Stripe.

## Ai đã nhập từng khoản quà

Mỗi khoản quà được nhập vào đợt sẽ hiển thị **Entered by** cùng tên người nhập, nằm dưới tên người quyên góp, để bạn biết ai đã nhập mà không cần đến phiếu ký nhận. B1 tự động ghi nhận điều này dựa trên người đang đăng nhập, và việc sửa khoản quà sau đó không làm thay đổi thông tin này. Các khoản quà được nhập bằng **Import CSV** sẽ hiển thị người đã chạy thao tác nhập.

Quà trực tuyến, quà được thêm bởi công cụ [Nhập từ Stripe](stripe-import.md), và các khoản quà đã nhập trước khi tính năng này được thêm vào tháng 11 năm 2026 sẽ không hiển thị tên.

## Đóng và mở lại một đợt

Khi một đợt đã được kiểm đếm và gửi vào tài khoản, hãy đóng đợt để các khoản quyên góp của đợt giữ nguyên như lúc bạn đóng.

1. Mở đợt.
2. Nhấn **Close Batch** ở đầu trang.

Nhãn trạng thái bên cạnh tên đợt sẽ đổi từ **Open** sang **Closed**, đợt sẽ hiển thị **Closed** trong cột **Status** trên trang Đợt, và một thông báo ở đầu đợt sẽ giải thích rằng đợt đã đóng. Khi đợt đã đóng, những người có quyền **Nhập quyên góp** vẫn có thể xem, nhưng không thể thêm, sửa hoặc xóa khoản quyên góp của đợt, cũng như không thể đổi tên hoặc ngày của đợt.

Để thay đổi lại, hãy mở đợt và nhấn **Reopen Batch**. Đợt mới luôn bắt đầu ở trạng thái mở.

:::info
Chỉ những người có quyền **Sửa quyên góp** mới thấy các nút **Close Batch** và **Reopen Batch**. Họ cũng có thể sửa khoản quyên góp trong đợt đã đóng nếu cần chỉnh sửa, mà không cần mở lại đợt.
:::

## Ai có thể thay đổi đợt

Hai [quyền của vai trò](../settings/roles-permissions.md) cho phép một người làm việc với đợt:

- **Sửa quyên góp** -- toàn quyền: thêm và xóa đợt, đóng và mở lại đợt, cũng như thêm, sửa hoặc xóa bất kỳ khoản quyên góp nào, dù đợt đang mở hay đã đóng.
- **Nhập quyên góp** -- dành cho nhóm kiểm đếm và tình nguyện viên nhập tiền dâng. Họ có thể thêm đợt và thêm, sửa hoặc xóa khoản quyên góp, nhưng chỉ khi đợt đang mở. Họ không thể xóa đợt, đóng hoặc mở lại đợt, hay thay đổi các khoản quà đến từ quyên góp trực tuyến.

Người có quyền **Nhập quyên góp** nhưng không có quyền **Xem tóm tắt quyên góp** sẽ thấy **Donations** trong menu B1 Admin, và mục này dẫn thẳng đến trang Đợt. Các mục **Summary**, **Funds**, **Campaigns** và **Giving Statements** sẽ bị ẩn đối với họ. Để mở một đợt và xem các khoản quyên góp trong đó, vai trò đó cũng cần quyền **Xem quyên góp**.

:::tip
Một cách thiết lập phổ biến là tạo vai trò “Counting Team” với quyền **Nhập quyên góp** và **Xem quyên góp**, còn thủ quỹ có quyền **Sửa quyên góp** sẽ đóng từng đợt sau khi đã đối chiếu xong với tiền gửi.
:::

## In một đợt

Mở đợt và nhấn **Print** phía trên danh sách quyên góp để in bản giấy cho nhóm kiểm đếm hoặc hồ sơ gửi tiền. Bản in bao gồm:

- Tiêu đề thư của hội thánh -- logo của bạn (**Light Background Logo** từ [Website > Appearance](../website/appearance.md), nếu bạn đã tải lên) với tên hội thánh bên dưới -- rồi đến tên đợt và ngày của đợt
- Mọi khoản quyên góp trong đợt, gồm tên người quyên góp, người nhập, phương thức, ghi chú, ngày và số tiền (các khoản quà đã hoàn lại sẽ được gạch ngang và đánh dấu là đã hoàn)
- **Fund Subtotals** -- tổng số tiền đã dâng cho từng quỹ trong đợt
- **Batch Total** -- tổng số tiền của cả đợt

Nút **Print** chỉ xuất hiện khi đợt có ít nhất một khoản quyên góp.

### In nhiều đợt cùng lúc

Để in tất cả các đợt trong một khoảng thời gian chỉ bằng một thao tác -- chẳng hạn như tất cả các đợt gửi tiền của tháng trước -- nhấn **Print** ở đầu trang **Batches**, cạnh **Export**. Trang **Print Batches** sẽ mở ra với **Start Date** và **End Date** khớp với các đợt đang hiển thị: từ ngày 1 tháng 1 đến ngày 31 tháng 12 của năm bạn đã chọn, hoặc từ ngày sớm nhất đến ngày muộn nhất của các đợt khi chọn **All**. Bạn có thể thay đổi một trong hai ngày để chọn một khoảng khác.

Mọi đợt có ngày nằm trong khoảng (bao gồm cả ngày bắt đầu và kết thúc) sẽ được in theo thứ tự ngày, mỗi đợt một trang, với cùng bố cục như bản in một đợt. Các đợt không có khoản quyên góp nào sẽ bị bỏ qua, và nếu không có đợt nào trong khoảng có khoản quyên góp, bạn sẽ thấy thông báo “No batches with donations in this date range.” Nhấn **Print** để mở hộp thoại in của trình duyệt, hoặc **Close** để quay lại danh sách đợt.

## Xuất đợt sang QuickBooks Online

Mở đợt và nhấn **Export for QuickBooks** để tải xuống đợt dưới dạng một bút toán nhật ký mà QuickBooks Online có thể nhập (**Settings > Import Data > Journal Entries**). Tệp này gồm một bút ghi nợ vào **Undeposited Funds** với tổng số tiền của đợt, và một bút ghi có cho mỗi quỹ, dùng tên của quỹ làm tên tài khoản. Khi nhập, QuickBooks sẽ yêu cầu bạn đối chiếu các tên này với hệ thống tài khoản của mình, vì vậy hãy đặt tên quỹ giống cách kế toán viên của bạn đặt tên các tài khoản thu nhập, hoặc ánh xạ một lần khi nhập.

:::tip
Hãy đặt tên các đợt nhất quán để dễ tìm sau này. Đưa ngày và loại lần thu vào tên (ví dụ: “Sunday AM - 2025-02-09”) sẽ giúp danh sách luôn gọn gàng khi số lượng tăng lên.
:::

## Bước tiếp theo

Khi đã có một đợt, hãy xem [Ghi nhận quyên góp](recording-donations.md) để học cách thêm từng khoản quyên góp riêng lẻ vào đợt. Bạn cũng có thể [nhập giao dịch Stripe](stripe-import.md) để tự động tạo đợt từ quyên góp trực tuyến.
