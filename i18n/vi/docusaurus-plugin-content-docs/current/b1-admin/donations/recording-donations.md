---
title: "Ghi nhận tiền quyên góp"
---

# Ghi nhận tiền quyên góp

<div class="article-intro">

Việc ghi nhận tiền quyên góp trong B1 Admin được thực hiện thông qua hệ thống Batches (đợt nhập). Bạn tạo một đợt nhập để đại diện cho một lần thu tiền (chẳng hạn như tiền dâng Chúa ngày Chủ nhật), sau đó thêm từng khoản quyên góp riêng lẻ vào đợt đó. Cách này giúp hồ sơ quyên góp của bạn được sắp xếp gọn gàng và dễ đối chiếu.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Thiết lập [quỹ](funds.md) của bạn để có thể gán các khoản quyên góp vào đúng danh mục
- Tạo một [đợt nhập](batches.md) để chứa các khoản quyên góp bạn sắp nhập
- Đảm bảo người quyên góp đã có trong [danh bạ người](../people/adding-people.md) để bạn có thể tra cứu khi nhập tiền
- Bạn cần quyền **Edit Donations**, hoặc **Enter Donations** cùng với **View Donations**, để nhập tiền vào một đợt (xem [Ai có thể thay đổi đợt nhập](batches.md#who-can-change-a-batch))

</div>

## Tạo đợt nhập và thêm khoản quyên góp

1. Trong **B1 Admin**, mở [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (thanh tìm kiếm ở góc trên bên trái), mở rộng **Donations**, rồi nhấp **Batches**.
2. Nhấp **Add Batch** ở đầu trang.
3. Nhập tên cho đợt nhập (ví dụ: "Tiền dâng Chúa Chủ nhật - 5 tháng 1") và chọn ngày. Nhấp **Save**.
4. Đợt nhập mới của bạn xuất hiện trong danh sách, hiển thị 0 khoản quyên góp và $0.00.
5. Nhấp vào **tên đợt nhập** để mở đợt đó.

## Nhập từng khoản quyên góp

1. Trên trang chi tiết đợt nhập, bảng nhập khoản quyên góp xuất hiện bên cạnh danh sách khoản quyên góp. Dưới mục **Select Person or Anonymous**, nhập tên người quyên góp vào ô tìm kiếm để tìm họ, hoặc nhấp **Anonymous** (ẩn danh). (Nhấp **Add Donation** ở đầu trang sẽ chuyển bạn đến bảng này.)
2. Sau khi chọn một người, biểu mẫu nhập liệu hiển thị các trường **Date** (ngày), **Method** (phương thức: Check, Cash, Card hoặc In-Kind), **Fund** (quỹ), **Notes** (ghi chú), **Amount** (số tiền) và **Check #** (số séc) (hoặc **Last 4 digits** — 4 số cuối đối với quyên góp bằng thẻ, hoặc **Item** — mô tả đối với quyên góp hiện vật). Nhấp **Change** bên cạnh tên người quyên góp để chọn người khác.
3. Điền thông tin chi tiết và nhấp **Add Donation** (hoặc nhấn Enter).
4. Khoản quyên góp được thêm vào danh sách, và biểu mẫu được đặt lại để bạn có thể nhập khoản tiếp theo.

:::info
Nếu đợt nhập đã được [đóng](batches.md#closing-and-reopening-a-batch), bảng nhập liệu và các liên kết **Edit** sẽ bị ẩn đối với những người không có quyền **Edit Donations**, và một thông báo ở đầu đợt nhập sẽ cho biết đợt đã đóng. Hãy nhờ người có quyền **Edit Donations** mở lại đợt đó.
:::

:::tip
Bạn có thể nhanh chóng nhập nhiều khoản quyên góp liên tiếp mà không cần rời khỏi trang đợt nhập. Biểu mẫu sẽ được đặt lại sau mỗi lần nhập, giúp bạn xử lý nhanh một xấp séc hoặc phong bì.
:::

## Nhập khoản quyên góp từ tệp CSV {#importing-donations-from-a-csv-file}

Nếu dữ liệu quyên góp đã có sẵn trong bảng tính — ví dụ, bản xuất từ một hệ thống quyên góp khác hoặc bảng kiểm đếm của nhóm thu tiền — bạn có thể nhập chúng vào một đợt nhập thay vì gõ từng khoản.

1. Mở đợt nhập và nhấp **Import CSV** ở đầu trang. (Nút này xuất hiện khi bạn có quyền thay đổi đợt nhập và nhà thờ có ít nhất một [quỹ](funds.md).)
2. Nhấp **Choose CSV File** và chọn tệp của bạn. Tệp cần có dòng tiêu đề, và các cột có thể theo bất kỳ thứ tự nào:
   - **Amount** (bắt buộc; `Total` cũng được chấp nhận) — Các ký hiệu tiền tệ và dấu phẩy sẽ bị bỏ qua, nên `$1,250.00` là hợp lệ. Số tiền phải lớn hơn không.
   - **Date** — Sử dụng định dạng như `2026-10-25` hoặc `10/25/2026`. Nếu để trống, ngày của đợt nhập sẽ được sử dụng.
   - **Fund** — Tên của quỹ, khớp không phân biệt chữ hoa chữ thường. Nếu để trống, quỹ đầu tiên của bạn sẽ được sử dụng.
   - **Method** — **Check**, **Cash**, **Card** hoặc **In-Kind**. Nếu để trống, **Check** sẽ được sử dụng.
   - **Check Number** — Số séc (hoặc chi tiết thanh toán khác).
   - **Notes** (ghi chú)
   - **Email**, **Name**, hoặc **First Name** và **Last Name** — Dùng để khớp người quyên góp với một người trong cơ sở dữ liệu. Tên được viết dạng "Smith, John" sẽ được đọc là "John Smith".
3. Xem trước danh sách. Mỗi dòng hiển thị số thứ tự, người quyên góp theo tệp, cột **Match** (khớp), quỹ và số tiền:
   - Tên một người nghĩa là người quyên góp đã được khớp. B1 khớp theo email trước, sau đó theo tên chính xác, và chỉ khi có đúng một người phù hợp.
   - **Not found — anonymous** nghĩa là không tìm thấy kết quả khớp duy nhất nào. Khoản quyên góp sẽ được nhập dưới dạng ẩn danh, và "Imported as:" cùng tên người quyên góp sẽ được thêm vào ghi chú để bạn có thể gán sau.
   - Thông báo màu đỏ như **Invalid amount** (số tiền không hợp lệ), **Unknown fund** (quỹ không xác định), **Unknown method** (phương thức không xác định) hoặc **Invalid date** (ngày không hợp lệ) có nghĩa là dòng đó sẽ bị bỏ qua. Hãy sửa tệp và chọn lại để đưa dòng đó vào.
4. Nhấp **Import** (nút sẽ hiển thị số dòng sẽ được nhập). Các khoản quyên góp sẽ được thêm vào đợt nhập.

:::tip
Sau khi nhập, hãy dùng **Edit** trên bất kỳ khoản quyên góp ẩn danh nào để chọn đúng người. Ghi chú "Imported as:" cho bạn biết tệp ghi người quyên góp là ai.
:::

## Ghi nhận khoản quyên góp từ hồ sơ của một người

Để ghi nhận một khoản quyên góp đơn lẻ mà không cần mở đợt nhập, hãy mở hồ sơ người quyên góp trong **People** và nhấp **Log a gift** (trong phần tổng hợp quyên góp, hoặc trên trang quyên góp của người đó).

1. Đặt **Date** và **Amount**.
2. Chọn **Fund** và **Method** (Check, Cash, Card hoặc In-Kind), rồi nhập **Check #**, **Last 4 digits** hoặc **Item** (đối với quyên góp hiện vật) nếu cần.
3. Tùy chọn thêm **Notes**, sau đó nhấp **Save**.

Khoản quyên góp sẽ được lưu vào đợt nhập của ngày đó. Nếu chưa có đợt nhập nào cho ngày đó, hệ thống sẽ tự động tạo một đợt và đặt tên theo ngày.

## Chia một khoản quyên góp cho nhiều quỹ

Đôi khi một người quyên góp chia tiền cho nhiều quỹ trong cùng một giao dịch. Để xử lý trường hợp này:

1. Bên dưới bảng nhập liệu, nhấp vào liên kết **full donation editor** (trình chỉnh sửa đầy đủ khoản quyên góp), hoặc nhấp **Edit** trên dòng khoản quyên góp hiện có.
2. Trong trình chỉnh sửa đầy đủ, thêm số tiền vào các quỹ khác nhau. Tổng số tiền sẽ tự động được tính từ số tiền của từng quỹ.
3. Nhấp **Save** để cập nhật khoản quyên góp.

:::info
Việc chia khoản quyên góp cho nhiều quỹ thường xảy ra khi người quyên góp viết một tấm séc duy nhất với mục đích dành cho nhiều việc, chẳng hạn như Quỹ Chung và Truyền giáo.
:::

## Chỉnh sửa hoặc xóa khoản quyên góp

Để chỉnh sửa một khoản quyên góp, nhấp nút **Edit** trên dòng của khoản đó trong đợt nhập. Bạn có thể thay đổi ngày, số tiền, quỹ, phương thức thanh toán (Check, Cash, Card hoặc In-Kind), hoặc bất kỳ chi tiết nào khác. Đối với quyên góp hiện vật, trình chỉnh sửa sẽ đặt nhãn trường chi tiết là **Item** để bạn có thể mô tả những gì đã được trao tặng. Nhấp **Save** khi hoàn tất.

:::tip
Dòng thông tin bên dưới tên đợt nhập ở đầu trang sẽ tự động cập nhật để hiển thị ngày của đợt, số lượng khoản quyên góp và tổng số tiền khi bạn thêm hoặc chỉnh sửa các mục. Hãy dùng thông tin này để đối chiếu với phiếu nộp tiền của bạn.
:::

## Hoàn tiền một khoản quyên góp

Nếu người quyên góp bị trừ tiền nhầm hoặc yêu cầu được hoàn lại tiền, bạn có thể hoàn tiền một khoản quyên góp đã hoàn tất ngay từ màn hình chỉnh sửa — không cần truy cập bảng điều khiển của cổng thanh toán.

1. Mở khoản quyên góp và nhấp **Edit**.
2. Nhấp nút **Refund** bên cạnh Delete ở cuối biểu mẫu.
3. Xác nhận hộp thoại: "Hoàn tiền toàn bộ khoản quyên góp này qua cổng thanh toán? Thao tác này không thể hoàn tác."

Khoản quyên góp sẽ được hoàn tiền toàn bộ qua cổng thanh toán ban đầu và được đánh dấu **Refunded** (đã hoàn tiền) trong các danh sách quyên góp của bạn.

:::warning
Chỉ hỗ trợ hoàn tiền toàn bộ — không có cách nào hoàn một phần số tiền từ B1 Admin. Việc hoàn tiền cũng không thể hủy bỏ sau khi đã xác nhận.
:::

:::info
Nút **Refund** chỉ xuất hiện đối với các khoản quyên góp đã được thanh toán trực tuyến (có giao dịch qua cổng thanh toán) và vẫn ở trạng thái **Complete** (hoàn tất). Các khoản quyên góp nhập thủ công (tiền mặt, séc) không có giao dịch cổng thanh toán để hoàn lại — hãy chỉnh sửa hoặc xóa những khoản đó.
:::

## In biên nhận cho một khoản quyên góp

Khi có người nộp séc, thanh toán cho một sự kiện hoặc áo thun, hoặc khi một tổ chức đến thăm mang theo khoản quyên góp, bạn có thể in biên nhận chỉ cho khoản đó thay vì cho cả đợt nhập hoặc bản kê khai cuối năm.

1. Mở đợt nhập chứa khoản quyên góp.
2. Nhấp **Receipt** bên cạnh **Edit** trên dòng của khoản quyên góp. Bạn cũng có thể nhấp **Receipt** ở cuối biểu mẫu Edit Donation.
3. Nhấp **Print** để in, hoặc **Close** để quay lại.

Biên nhận sử dụng cùng bố cục với bản kê khai quyên góp: tên nhà thờ và người quyên góp (hoặc "Anonymous"), ngày và phương thức của khoản quyên góp, từng quỹ và số tiền, ghi chú, Giving Note (ghi chú quyên góp) của bạn, và khối biên nhận chính thức nếu bạn đã thiết lập **Statement format** (định dạng bản kê) (xem [Bản kê quyên góp](giving-statements.md)). Số biên nhận trong khối này là ID của khoản quyên góp.

:::info
Dòng chữ "không có hàng hóa hoặc dịch vụ" chỉ được in khi mọi quỹ trong khoản quyên góp đều được đánh dấu là được khấu trừ thuế. Nếu bất kỳ phần nào của khoản quyên góp được chuyển vào quỹ không được khấu trừ thuế, chẳng hạn như phí sự kiện hoặc khoản mua hàng, biên nhận sẽ không có dòng chữ đó để nó được hiểu là một khoản thanh toán chứ không phải quà tặng từ thiện.
:::

:::tip
Các khoản quyên góp trực tuyến đã tự động gửi email cảm ơn, nên biên nhận chủ yếu hữu ích cho những khoản bạn nhập thủ công.
:::

## Các bước tiếp theo

- Xem lại các mục bạn đã nhập bằng [Báo cáo quyên góp](donation-reports.md) để kiểm tra độ chính xác
- Vào cuối năm, tạo [Bản kê quyên góp](giving-statements.md) cho người quyên góp của bạn
