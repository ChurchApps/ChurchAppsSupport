---
title: "Nhập từ Stripe"
description: "Kéo các khoản dâng từ Stripe vào B1 Admin bằng bước xem trước, đánh dấu từng giao dịch là mới, đã nhập hoặc bỏ qua trước khi xác nhận."
---

# Nhập từ Stripe

<div class="article-intro">

Nếu bạn nhận quyên góp trực tuyến qua Stripe, công cụ Nhập từ Stripe cho phép bạn kéo các giao dịch đó vào B1 Admin để toàn bộ dữ liệu quyên góp nằm ở một nơi. Công cụ này đặc biệt hữu ích khi bạn cần tìm những giao dịch chưa được đồng bộ tự động.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Hoàn tất [Thiết lập quyên góp trực tuyến](online-giving-setup.md) để kết nối tài khoản Stripe với B1 Admin. Mục menu **Nhập từ Stripe** và nút trên trang Batches chỉ xuất hiện khi cổng quyên góp của hội thánh bạn là Stripe, và chỉ với những người có quyền chỉnh sửa quyên góp
- Kiểm tra xem trong bảng điều khiển Stripe của bạn có các khoản quyên góp trong khoảng thời gian bạn muốn nhập hay không

</div>

## Cách hoạt động

Quy trình nhập gồm hai bước: trước tiên bạn xem trước những gì sẽ được nhập, sau đó xác nhận việc nhập. Cách chạy thử này cho phép bạn xem lại mọi thứ trước khi có bất kỳ dữ liệu nào được tạo.

## Nhập giao dịch

1. Trong **B1 Admin**, vào **Donations > Stripe Import**. (Bạn cũng có thể nhấp **Import missing Stripe transactions** ở đầu trang **Batches**.)
2. Trang **Stripe Import** sẽ mở ra.
3. Chọn **khoảng thời gian** cho các giao dịch bạn muốn nhập.
4. Nhấp **Preview** để chạy kiểm tra thử.

## Xem lại bản xem trước

Bản xem trước hiển thị từng giao dịch từ Stripe cùng với một chỉ báo trạng thái:

- **New** -- giao dịch này chưa được nhập và sẽ được đưa vào nếu bạn tiếp tục.
- **Already Imported** -- giao dịch này đã có trong B1 Admin và sẽ được bỏ qua.
- **Skipped** -- giao dịch này bị loại trừ vì lý do khác (ví dụ: hoàn tiền hoặc thanh toán thất bại).

Phần tóm tắt ở đầu trang hiển thị tổng số giao dịch trong mỗi nhóm và các số tiền liên quan.

:::info
Bước xem trước không tạo bất kỳ bản ghi nào. Đây chỉ là một bước kiểm tra chỉ đọc để bạn xác minh điều gì sẽ xảy ra trước khi thực hiện.
:::

## Hoàn tất việc nhập

1. Xem lại kết quả xem trước và tổng số trong phần tóm tắt.
2. Nhấp **Import Missing** để nhập tất cả giao dịch được đánh dấu **New**.
3. Sau khi việc nhập hoàn tất, các nhãn trạng thái bên cạnh mỗi giao dịch sẽ cập nhật để hiển thị kết quả.

## Mẹo sử dụng Nhập từ Stripe

- Thực hiện nhập thường xuyên (hàng tuần hoặc hàng tháng) để giữ hồ sơ luôn cập nhật.
- Nếu một giao dịch hiển thị **Already Imported**, nghĩa là B1 Admin đã có một bản ghi tương ứng -- không cần thao tác gì thêm.
- Dùng bộ lọc khoảng thời gian để tập trung vào một giai đoạn cụ thể nếu bạn đang tìm những giao dịch nhất định.

:::tip
Sau khi nhập, hãy truy cập trang [Batches](batches.md) để kiểm tra xem các khoản quyên góp đã nhập có xuất hiện đúng hay không và tổng số có khớp với những gì bạn thấy trong bảng điều khiển Stripe hay không.
:::

## Bước tiếp theo

- Xem [Báo cáo quyên góp](donation-reports.md) để xem lại các giao dịch đã nhập cùng với dữ liệu quyên góp khác của bạn
- Đảm bảo các khoản quyên góp đã nhập được gán đúng [quỹ](funds.md) để [giấy xác nhận quyên góp](giving-statements.md) chính xác
