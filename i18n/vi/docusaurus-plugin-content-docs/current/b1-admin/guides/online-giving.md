---
title: "Hướng dẫn: Thiết lập quyên góp trực tuyến"
description: "Thiết lập dâng trực tuyến trong B1 Admin bằng cách tạo quỹ, kết nối Stripe và thêm trang Quyên góp vào website B1.church cho thành viên."
---

# Thiết lập quyên góp trực tuyến

<div class="article-intro">

Hướng dẫn các bước cần thiết để nhận quyên góp trực tuyến cho hội thánh của bạn, từ việc tạo quỹ quyên góp, kết nối Stripe để xử lý thanh toán, đến việc chia sẻ trang quyên góp với hội thánh. Khi hoàn tất, các thành viên sẽ có thể quyên góp trực tuyến qua website và ứng dụng di động của bạn.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Tài khoản B1 Admin có quyền quản trị — xem [Vai trò & Quyền hạn](../people/roles-permissions.md)
- Một tài khoản Stripe (tạo miễn phí tại [stripe.com](https://stripe.com) nếu cần)

</div>

## Bước 1: Tạo quỹ quyên góp

Quỹ là các danh mục mà người quyên góp có thể đóng góp vào. Bạn cần có ít nhất một quỹ trước khi có thể nhận quyên góp.

Làm theo hướng dẫn [Quỹ](../donations/funds.md) để thiết lập các danh mục quyên góp của bạn:

1. Tạo các quỹ phổ biến nhất (ví dụ: "Quỹ chung", "Quỹ xây dựng", "Truyền giáo")
2. Đánh dấu các quỹ được khấu trừ thuế một cách phù hợp — điều này ảnh hưởng đến báo cáo quyên góp cuối năm

:::tip
Bạn có thể thêm quỹ bất cứ lúc nào. Hãy bắt đầu với các danh mục quyên góp phổ biến nhất.
:::

## Bước 2: Kết nối Stripe

Stripe xử lý toàn bộ việc thanh toán. Bạn sẽ kết nối tài khoản Stripe với B1 Admin để tiền quyên góp được chuyển vào tài khoản ngân hàng của bạn.

Làm theo hướng dẫn [Thiết lập quyên góp trực tuyến](../donations/online-giving-setup.md) để kết nối Stripe:

1. Đăng nhập vào bảng điều khiển Stripe và lấy Publishable Key và Secret Key của bạn
2. Trong B1 Admin, vào Cài đặt (Settings) và nhập cả hai khóa

:::warning
Stripe chỉ hiển thị Secret Key một lần. Hãy sao chép và lưu lại trước khi rời khỏi bảng điều khiển Stripe. Nếu bạn làm mất, bạn sẽ cần tạo khóa mới.
:::

## Bước 3: Thêm trang quyên góp vào website của bạn

Giúp mọi người dễ dàng quyên góp bằng cách thêm trang quyên góp vào website B1 của bạn.

Làm theo hướng dẫn [Thiết lập quyên góp trực tuyến](../donations/online-giving-setup.md) và [Quản lý trang](../website/managing-pages.md) để:

1. Thêm tab "Donate" vào site B1.church của bạn
2. Địa chỉ quyên góp của bạn sẽ là: `https://yoursubdomain.b1.church/donate`
3. Thành viên có thể quyên góp mà không cần đăng nhập (trang công khai) hoặc đăng nhập để sử dụng phương thức thanh toán đã lưu và xem lịch sử quyên góp

## Bước 4: Thực hiện một khoản quyên góp thử

Trước khi thông báo cho hội thánh, hãy kiểm tra để chắc chắn mọi thứ hoạt động đúng.

1. Thực hiện một khoản quyên góp nhỏ để kiểm tra toàn bộ quy trình từ đầu đến cuối
2. Kiểm tra xem khoản quyên góp có xuất hiện trong B1 Admin, mục Donations hay không

:::tip
Hãy dùng chế độ thử nghiệm (test mode) của Stripe trước nếu bạn muốn kiểm tra mà không thu tiền thật, sau đó chuyển sang chế độ thực (live mode) trước khi thông báo cho hội thánh.
:::

## Bước 5: Thông báo cho hội thánh

Hãy cho mọi người biết để họ biết rằng họ có thể quyên góp trực tuyến.

1. Chia sẻ địa chỉ quyên góp qua website, bản tin email, tờ thông báo và mạng xã hội
2. Thành viên cũng có thể quyên góp qua [ứng dụng B1 Mobile](../../b1-mobile/giving/index.md) — tính năng quyên góp đã được tích hợp sẵn

:::info
Thành viên đã đăng nhập có thể lưu phương thức thanh toán, thiết lập quyên góp định kỳ và xem lịch sử quyên góp. Quyên góp ẩn danh cũng được hỗ trợ — không cần đăng nhập.
:::

## Bước 6: Quản lý thường xuyên

Hãy giữ hồ sơ quyên góp luôn cập nhật và tạo báo cáo trong suốt cả năm.

1. [Nhập giao dịch Stripe](../donations/stripe-import.md) thường xuyên (hằng tuần hoặc hằng tháng) để hồ sơ luôn cập nhật
2. [Xem báo cáo quyên góp](../donations/donation-reports.md) để theo dõi xu hướng và tổng số tiền theo từng quỹ
3. [Tạo báo cáo quyên góp cuối năm](../donations/giving-statements.md) cho hồ sơ thuế của người quyên góp

:::tip
Hãy chạy nhập dữ liệu Stripe ít nhất mỗi tháng một lần để hồ sơ luôn cập nhật. Xem [Hướng dẫn báo cáo cuối năm](./year-end-reports.md) để biết toàn bộ quy trình cuối năm.
:::

## Bạn đã hoàn thành!

Hội thánh của bạn giờ đã có thể nhận quyên góp trực tuyến. Thành viên có thể quyên góp qua website, ứng dụng B1 Mobile hoặc bất kỳ thiết bị nào có trình duyệt web. Mọi khoản quyên góp đều được tự động ghi nhận trong B1 Admin.

## Bài viết liên quan

- [Quỹ](../donations/funds.md) — tạo và quản lý danh mục quyên góp
- [Lô quyên góp](../donations/batches.md) — sắp xếp quyên góp thành nhóm
- [Ghi nhận quyên góp](../donations/recording-donations.md) — nhập thủ công quyên góp bằng tiền mặt và séc
- [Nhập Stripe](../donations/stripe-import.md) — đưa giao dịch trực tuyến vào B1 Admin
- [Báo cáo quyên góp](../donations/donation-reports.md) — xem xu hướng và tổng số quyên góp
- [Báo cáo quyên góp cuối năm](../donations/giving-statements.md) — tạo báo cáo thuế cuối năm
- [Quyên góp (Web)](../../b1-church/giving/making-donations.md) — trải nghiệm quyên góp của thành viên trên web
- [Quyên góp (Mobile)](../../b1-mobile/giving/making-donations.md) — quyên góp từ ứng dụng di động
