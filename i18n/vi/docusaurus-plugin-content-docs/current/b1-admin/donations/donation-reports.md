---
title: "Báo cáo quyên góp"
description: "Xem tổng số dâng hiến, người ngừng dâng và chi tiết theo đợt trong B1 Admin với bảng tổng quan Donations Summary, màn hình Lapsed Givers và xuất CSV."
---

# Báo cáo quyên góp

<div class="article-intro">

B1 Admin cung cấp nhiều cách để xem và phân tích dữ liệu quyên góp của nhà thờ bạn. Bảng điều khiển quyên góp trên trang **Summary** (Tổng quan) của Donations (Quyên góp) hiển thị tổng quan trực quan với biểu đồ và bộ lọc, còn mục Reports (Báo cáo) cung cấp báo cáo Donation Summary (Tổng hợp quyên góp) chi tiết hơn. Hãy dùng các công cụ này để theo dõi xu hướng quyên góp, chuẩn bị cho các cuộc họp hội đồng, hoặc đối chiếu hồ sơ của bạn.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Đảm bảo các khoản quyên góp đã được [ghi nhận theo đợt](recording-donations.md) hoặc [nhập từ Stripe](stripe-import.md)
- Kiểm tra rằng các [quỹ](funds.md) của bạn đã được thiết lập đúng để các khoản quyên góp được phân loại chính xác

</div>

## Bảng điều khiển quyên góp

Bảng điều khiển quyên góp là chế độ xem **Dashboard** (Bảng điều khiển) của trang **Summary**, trang đầu tiên bạn thấy khi mở mục **Donations**.

1. Mở [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (thanh tìm kiếm ở góc trên bên trái của B1 Admin), mở rộng **Donations**, rồi nhấp **Summary**. Trang **Summary** sẽ mở ở chế độ **Dashboard**. Nút chuyển **View** (Chế độ xem) ở góc trên bên phải cho phép chuyển giữa **Dashboard** và **Lapsed Givers** (Người quyên góp đã ngừng).
2. Dùng nút chuyển **Weekly** (Hàng tuần), **Monthly** (Hàng tháng) và **Quarterly** (Hàng quý) phía trên báo cáo để chọn cách nhóm dữ liệu quyên góp.
3. Trong bảng **Filter Report** (Lọc báo cáo), đặt **Start Date** (Ngày bắt đầu) và **End Date** (Ngày kết thúc) (mặc định là từ một năm trước đến hôm qua), và tùy chọn chọn một **Fund** (Quỹ), rồi nhấp **Run Report** (Chạy báo cáo). Báo cáo sẽ tự động chạy với các giá trị mặc định khi trang được mở.
4. Bốn **thẻ KPI** hiển thị các chỉ số quyên góp trong khoảng thời gian đã chọn:
   - **Total Giving** (Tổng quyên góp) -- Tổng số tiền đã được quyên góp.
   - **Average Gift** (Quà trung bình) -- Số tiền quyên góp trung bình.
   - **Unique Donors** (Người quyên góp duy nhất) -- Số người khác nhau đã quyên góp.
   - **Total Donations** (Tổng số lần quyên góp) -- Tổng số lần quyên góp riêng lẻ.
5. Bên dưới các KPI, biểu đồ cột hiển thị số tiền quyên góp theo tuần, tháng hoặc quý, được phân tách theo quỹ.
6. Nhấp **Download Options** (Tùy chọn tải xuống) và chọn **Summary** để xuất tệp CSV gồm tổng số theo kỳ và theo quỹ, hoặc nhấp biểu tượng máy in để in báo cáo. Logo nhà thờ của bạn (**Light Background Logo** (Logo nền sáng) từ [Website > Appearance](../website/appearance.md), nếu bạn đã tải lên) và tên nhà thờ sẽ xuất hiện căn giữa ở đầu báo cáo in. Bản in dùng chữ tối và biểu đồ nền sáng ngay cả khi bạn dùng B1 Admin ở chế độ tối.

Nếu các khoản quyên góp trong kỳ được thực hiện bằng nhiều loại tiền tệ, tổng KPI sẽ được quy đổi sang tiền tệ của nhà thờ và một ghi chú **Converted at current exchange rates** (Đã quy đổi theo tỷ giá hiện tại) sẽ xuất hiện bên dưới các thẻ. Xem [Hỗ trợ đa tiền tệ](./multi-currency.md#converted-totals) để biết chi tiết.

:::info
Bảng điều khiển chỉ hiển thị dữ liệu quyên góp tổng hợp. Dữ liệu này không bao gồm tên người quyên góp cá nhân. Để xem chi tiết theo từng người quyên góp, hãy dùng trang [Batches](batches.md) (Các đợt).
:::

## Người quyên góp đã ngừng

Chọn **Lapsed Givers** trong nút chuyển **View** để liệt kê những người đã quyên góp trong một kỳ nhưng không quyên góp kể từ đó. Mặc định, báo cáo so sánh năm dương lịch trước với năm nay đến hiện tại; bạn có thể thay đổi một trong hai khoảng ngày để mở rộng hoặc thu hẹp phạm vi tìm kiếm. Mỗi dòng hiển thị người quyên góp, ngày của lần quyên góp gần nhất, và tổng số tiền của kỳ trước đó. Nhấp **Download Options > Summary** để tải danh sách dưới dạng CSV, dùng làm danh sách gửi thư hoặc gọi điện theo dõi.

## Xem chi tiết theo người quyên góp

Để xem ai đã quyên góp, số tiền bao nhiêu và vào quỹ nào:

1. Điều hướng đến **Donations > Batches**.
2. Nhấp vào **tên đợt** để mở đợt đó.
3. Trang chi tiết đợt liệt kê từng khoản quyên góp kèm phương thức (và số séc hoặc bốn số cuối của thẻ), tên người quyên góp, ngày, ghi chú và số tiền, với tổng số ở cuối trang.
4. Nhấp **Edit** (Chỉnh sửa) trên một dòng quyên góp để mở thông tin đầy đủ của khoản quyên góp đó, bao gồm quỹ.
5. Nhấp **Export** (Xuất) phía trên danh sách để tải xuống tệp CSV chứa toàn bộ thông tin người quyên góp và khoản quyên góp của đợt đó.

## Báo cáo tổng hợp quyên góp

Báo cáo quyên góp được tích hợp trực tiếp vào mục Donations -- trang Summary đóng vai trò là báo cáo tổng hợp quyên góp của bạn:

1. Trong menu Jump, chọn **Donations > Summary**.
2. Ở chế độ **Dashboard**, đặt **Start Date** và **End Date** trong bảng **Filter Report** rồi nhấp **Run Report**.
3. Nhấp **Download Options** và chọn **Summary** để xuất báo cáo dưới dạng tệp CSV.

## Xuất dữ liệu

Bạn có thể xuất dữ liệu quyên góp từ nhiều nơi:

- **Trang Summary** -- tải xuống CSV gồm tổng số quyên góp theo tuần, tháng hoặc quý và theo quỹ
- **Trang chi tiết đợt** -- tải xuống CSV gồm các khoản quyên góp riêng lẻ kèm thông tin người quyên góp
- **Trang chi tiết quỹ** -- tải xuống lịch sử quyên góp của một quỹ cụ thể

:::tip
Để báo cáo cuối năm, hãy kết hợp tệp xuất từ trang Summary với công cụ [Giving Statements](giving-statements.md) (Sao kê quyên góp) để có cả xu hướng tổng hợp lẫn sao kê từng người quyên góp.
:::

## Bước tiếp theo

- Tạo [Giving Statements](giving-statements.md) (Sao kê quyên góp) cho người quyên góp của bạn vào cuối năm
- Xem lại từng [đợt](batches.md) để kiểm tra chi tiết quyên góp
- Kiểm tra trang chi tiết [quỹ](funds.md) để xem phân tích quyên góp theo danh mục
