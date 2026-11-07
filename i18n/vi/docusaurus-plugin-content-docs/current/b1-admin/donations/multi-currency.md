---
title: "Hỗ trợ nhiều loại tiền tệ"
description: "Ghi nhận và báo cáo dâng hiến bằng nhiều loại tiền tệ trong B1 Admin, gồm nhập thủ công, dâng trực tuyến qua Stripe và cách quy đổi tổng hợp."
---

# Hỗ trợ nhiều loại tiền tệ

<div class="article-intro">

Tính năng nhiều loại tiền tệ của B1 cho phép hội thánh của bạn nhận và theo dõi các khoản quyên góp bằng nhiều loại tiền khác nhau. Tính năng này đặc biệt hữu ích cho các hội thánh có thành viên quốc tế, các thừa sai hoặc nhiều cơ sở ở các quốc gia khác nhau.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Bạn cần có quyền quản lý quyên góp. Xem [Vai trò & Quyền hạn](../people/roles-permissions.md) để biết chi tiết.
- Thiết lập [quyên góp trực tuyến](./online-giving-setup.md) với Stripe, nền tảng hỗ trợ giao dịch nhiều loại tiền tệ.
- Hiểu rõ nhu cầu kế toán của hội thánh khi xử lý nhiều loại tiền tệ.

</div>

## Bật nhiều loại tiền tệ

Hỗ trợ nhiều loại tiền tệ hiện được bật mặc định trong B1. Khi đã bật:

- Thành viên có thể quyên góp bằng tiền tệ địa phương của họ khi đóng góp trực tuyến
- Bạn có thể ghi nhận thủ công các khoản quyên góp bằng bất kỳ loại tiền tệ nào
- Báo cáo quyên góp hiển thị số tiền theo loại tiền tệ gốc
- Stripe tự động xử lý quy đổi tiền tệ cho việc quyên góp trực tuyến

## Các loại tiền tệ được hỗ trợ

Hệ thống hỗ trợ tất cả các loại tiền tệ chính trên thế giới, bao gồm:

- **USD** -- Đô la Mỹ
- **EUR** -- Euro
- **GBP** -- Bảng Anh
- **CAD** -- Đô la Canada
- **AUD** -- Đô la Úc
- **MXN** -- Peso Mexico
- **BRL** -- Real Brazil
- **INR** -- Rupee Ấn Độ
- **CNY** -- Nhân dân tệ
- **JPY** -- Yên Nhật
- Và nhiều loại khác...

Các loại tiền tệ khả dụng cho quyên góp trực tuyến phụ thuộc vào các loại tiền tệ mà tài khoản Stripe của bạn hỗ trợ.

## Ghi nhận quyên góp bằng các loại tiền tệ khác nhau

### Quyên góp trực tuyến

Khi một thành viên quyên góp trực tuyến qua Stripe:

1. Họ chọn loại tiền tệ ưa thích tại bước thanh toán
2. Stripe xử lý khoản thanh toán bằng loại tiền tệ đó
3. Khoản quyên góp được ghi nhận trong B1 với số tiền theo loại tiền tệ gốc
4. Stripe tự động xử lý mọi việc quy đổi tiền tệ cần thiết sang loại tiền tệ mặc định của tài khoản hội thánh bạn

### Nhập thủ công

Để ghi nhận một khoản quyên góp bằng tiền mặt hoặc séc với loại tiền tệ khác:

1. Điều hướng đến **Quyên góp > Đợt quyên góp** trong B1 Admin và mở đợt quyên góp
2. Nhấp **Thêm quyên góp** ở đầu trang đợt quyên góp
3. Chọn loại tiền tệ từ danh sách thả xuống
4. Nhập số tiền bằng loại tiền tệ đó
5. Hoàn tất các chi tiết còn lại của khoản quyên góp
6. Nhấp **Lưu**

## Xem các khoản quyên góp nhiều loại tiền tệ

### Báo cáo quyên góp

Báo cáo quyên góp hiển thị số tiền theo loại tiền tệ gốc:

- Từng bản ghi quyên góp hiển thị mã loại tiền tệ (ví dụ: "$100.00 USD")
- Tổng số được tính riêng theo từng loại tiền tệ
- Bạn có thể lọc theo các loại tiền tệ cụ thể

### Tổng số đã quy đổi

Bất cứ nơi nào B1 hiển thị một tổng số gộp duy nhất -- thẻ KPI tóm tắt quyên góp, tổng của một đợt quyên góp, hay tổng của một quỹ -- các khoản quyên góp được ghi bằng loại tiền tệ khác với loại tiền mặc định của hội thánh sẽ được quy đổi sang tiền tệ của hội thánh bạn theo tỷ giá hối đoái hiện hành, nhờ đó tổng số là một con số có ý nghĩa thay vì cộng các loại tiền tệ khác nhau với nhau. Dòng chú thích **Quy đổi theo tỷ giá hối đoái hiện hành** sẽ xuất hiện bên dưới tổng số bất cứ khi nào có áp dụng quy đổi. Các dòng chi tiết từng khoản quyên góp vẫn hiển thị theo loại tiền tệ gốc.

### Biên lai quyên góp

Khi tạo biên lai quyên góp:

- Mỗi khoản quyên góp xuất hiện với loại tiền tệ gốc của nó
- Tổng số được phân chia theo từng loại tiền tệ
- Thành viên thấy chính xác số tiền họ đã quyên góp bằng từng loại tiền tệ

## Tích hợp Stripe

Đối với quyên góp trực tuyến, Stripe xử lý các giao dịch nhiều loại tiền tệ:

- **Tự động quy đổi** -- Stripe chuyển đổi tiền tệ sang loại tiền tệ mặc định của tài khoản hội thánh bạn
- **Tỷ giá hối đoái** -- Stripe sử dụng tỷ giá thị trường hiện hành
- **Phí** -- Việc quy đổi tiền tệ có thể phát sinh thêm phí Stripe
- **Tiền tệ chuyển khoản** -- Tiền được gửi vào tài khoản bằng loại tiền tệ mặc định của bạn

:::info
Hãy kiểm tra bảng điều khiển Stripe của bạn để xem tỷ giá quy đổi hiện hành và các khoản phí liên quan đến giao dịch nhiều loại tiền tệ.
:::

## Những lưu ý về kế toán

Khi làm việc với nhiều loại tiền tệ:

- **Lưu trữ hồ sơ** -- Theo dõi số tiền và loại tiền tệ gốc của các khoản quyên góp để báo cáo chính xác
- **Tỷ giá hối đoái** -- Lưu ý rằng tỷ giá quy đổi của Stripe có thể khác với tỷ giá của ngân hàng bạn
- **Biên lai thuế** -- Hãy tham khảo ý kiến kế toán viên về cách báo cáo các khoản quyên góp bằng nhiều loại tiền tệ cho mục đích thuế
- **Phân bổ quỹ** -- Bạn có thể phân bổ các khoản quyên góp vào các quỹ cụ thể, bất kể loại tiền tệ nào

## Thực hành tốt nhất

- **Tiền tệ mặc định** -- Đặt loại tiền tệ chính của hội thánh làm mặc định cho hầu hết các giao dịch
- **Trao đổi rõ ràng** -- Cho người quyên góp biết họ đang quyên góp bằng loại tiền tệ nào trong quá trình thanh toán
- **Báo cáo nhất quán** -- Tổng số gộp luôn được tự động quy đổi sang tiền tệ của hội thánh; hãy dùng bộ lọc tiền tệ theo từng khoản quyên góp khi bạn cần xem số tiền gốc
- **Đối chiếu định kỳ** -- Đối chiếu các khoản chi trả của Stripe với hồ sơ quyên góp của bạn, có tính đến các khoản quy đổi tiền tệ

## Giới hạn

- Việc quy đổi tiền tệ khi xử lý thanh toán chỉ do Stripe đảm nhiệm đối với quyên góp trực tuyến; các khoản quyên góp thủ công được ghi nhận đúng như đã nhập, không có quy đổi tự động
- Báo cáo lịch sử và các dòng chi tiết từng khoản quyên góp luôn hiển thị loại tiền tệ gốc mà khoản quyên góp đã được ghi nhận
- Tổng số gộp (thẻ KPI, tổng đợt quyên góp, tổng quỹ) được quy đổi sang tiền tệ của hội thánh theo tỷ giá hiện hành -- các tỷ giá này có thể khác đôi chút so với tỷ giá của ngân hàng hoặc của Stripe tại thời điểm tiền được quyết toán

## Bài viết liên quan

- [Thiết lập quyên góp trực tuyến](./online-giving-setup.md) -- Cấu hình Stripe để nhận quyên góp
- [Ghi nhận quyên góp](./recording-donations.md) -- Nhập thủ công các bản ghi quyên góp
- [Báo cáo quyên góp](./donation-reports.md) -- Tạo và xem tóm tắt quyên góp
- [Biên lai quyên góp](./giving-statements.md) -- Tạo biên lai quyên góp cuối năm
