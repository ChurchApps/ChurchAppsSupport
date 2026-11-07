---
title: "Hướng dẫn: Tạo báo cáo quyên góp cuối năm"
description: "Trong B1 Admin, hoàn tất hồ sơ dâng hiến cuối năm, kiểm tra cài đặt thuế của quỹ và tạo sao kê dâng hiến được khấu trừ thuế cho mọi người dâng."
---

# Tạo báo cáo quyên góp cuối năm

<div class="article-intro">

Hướng dẫn quy trình cuối năm để hoàn tất hồ sơ quyên góp, kiểm tra cài đặt quỹ và tạo giấy xác nhận quyên góp được khấu trừ thuế cho từng nhà tài trợ. Thông thường, việc này được thực hiện vào đầu tháng 1 cho năm dương lịch trước đó.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Tài khoản B1 Admin có quyền truy cập tài chính
- Các khoản quyên góp đã được ghi nhận trong suốt năm (trực tuyến qua Stripe và/hoặc nhập thủ công)
- Quyền truy cập tài khoản Stripe của bạn nếu bạn nhận quyên góp trực tuyến

</div>

## Bước 1: Nhập các giao dịch Stripe cuối cùng

Đảm bảo tất cả các khoản quyên góp trực tuyến từ cuối năm đã có trong hệ thống của bạn.

Làm theo hướng dẫn [Nhập từ Stripe](../donations/stripe-import.md) để:

1. Điều hướng đến **Donations > Stripe Import**
2. Chọn khoảng thời gian bao gồm cuối năm (ví dụ: từ ngày 1 tháng 12 đến ngày 31 tháng 12)
3. Nhấn **Preview** trước để xem lại, sau đó nhấn **Import Missing** để hoàn tất

:::warning
Hãy chạy bước nhập này trước khi tạo giấy xác nhận. Mọi giao dịch chưa được nhập sẽ không xuất hiện trên giấy xác nhận quyên góp của nhà tài trợ.
:::

## Bước 2: Xem lại báo cáo quyên góp

Kiểm tra để đảm bảo hồ sơ của bạn chính xác trước khi tạo giấy xác nhận.

Làm theo hướng dẫn [Báo cáo quyên góp](../donations/donation-reports.md) để:

1. Kiểm tra trang tóm tắt quyên góp cho cả năm
2. Xem lại tổng số theo từng quỹ và đối chiếu với sao kê ngân hàng để phát hiện mọi chênh lệch
3. Nhấp vào từng đợt (batch) để xác minh chi tiết theo từng nhà tài trợ nếu cần

## Bước 3: Xác minh tình trạng khấu trừ thuế của quỹ

Đảm bảo cài đặt khấu trừ thuế của mỗi quỹ là chính xác để giấy xác nhận được đúng.

Làm theo hướng dẫn [Quỹ](../donations/funds.md) để:

1. Mở từng quỹ và xác nhận cài đặt khấu trừ thuế là chính xác

:::info
Chỉ những khoản quyên góp vào các quỹ được đánh dấu là được khấu trừ thuế mới xuất hiện trên giấy xác nhận quyên góp. Nếu một quỹ đáng lẽ được khấu trừ thuế nhưng chưa được đánh dấu như vậy, hãy cập nhật trước khi tạo giấy xác nhận.
:::

## Bước 4: Tạo giấy xác nhận quyên góp

Tạo giấy xác nhận quyên góp chính thức cho nhà tài trợ của bạn.

Làm theo hướng dẫn [Giấy xác nhận quyên góp](../donations/giving-statements.md) để:

1. Điều hướng đến **Donations > Giving Statements**
2. Chọn năm từ danh sách thả xuống và xem lại các số liệu tóm tắt
3. Chọn phương thức tải xuống:
   - **Download ZIP**: các tệp CSV riêng lẻ, mỗi nhà tài trợ một tệp
   - **Print All**: chế độ xem để in, mỗi giấy xác nhận nằm trên một trang riêng, với logo nhà thờ của bạn ở đầu trang (nếu bạn đã tải lên)

:::tip
Hãy tạo giấy xác nhận vào đầu tháng 1 khi dữ liệu còn mới. Điều này giúp bạn có thời gian xử lý mọi vấn đề trước khi gửi đi.
:::

## Bước 5: Gửi đến nhà tài trợ

Đưa giấy xác nhận đến tay nhà tài trợ.

1. In và gửi giấy xác nhận qua đường bưu điện, hoặc gửi email các tệp CSV riêng lẻ cho nhà tài trợ
2. Thành viên cũng có thể xem lịch sử quyên góp của mình và in giấy xác nhận từ [B1.church](../../b1-church/giving/donation-history.md) và [ứng dụng B1 Mobile](../../b1-mobile/giving/donation-history.md)

## Bạn đã hoàn tất!

Báo cáo quyên góp cuối năm của bạn đã hoàn thành. Nhà tài trợ đã có giấy xác nhận được khấu trừ thuế, và hồ sơ tài chính của bạn đã được chốt cho năm đó.

## Bài viết liên quan

- [Nhập từ Stripe](../donations/stripe-import.md): nhập các giao dịch trực tuyến
- [Báo cáo quyên góp](../donations/donation-reports.md): xem xu hướng và tổng số quyên góp
- [Quỹ](../donations/funds.md): quản lý quỹ và cài đặt khấu trừ thuế
- [Giấy xác nhận quyên góp](../donations/giving-statements.md): tạo giấy xác nhận cuối năm
- [Ghi nhận quyên góp](../donations/recording-donations.md): nhập thủ công các khoản tiền mặt/séc
- [Lịch sử quyên góp (Web)](../../b1-church/giving/donation-history.md): trang tự phục vụ dành cho thành viên
- [Hướng dẫn thiết lập quyên góp trực tuyến](./online-giving.md): thiết lập Stripe và quyên góp ban đầu
