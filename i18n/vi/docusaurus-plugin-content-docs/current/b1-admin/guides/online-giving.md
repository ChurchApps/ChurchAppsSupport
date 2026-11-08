---
title: "Hướng dẫn: Thiết lập quyên góp trực tuyến"
description: "Thiết lập quyên góp trực tuyến trong B1 Admin bằng cách tạo quỹ quyên góp, kết nối Stripe và thêm trang Quyên góp vào website B1.church cho thành viên."
---

# Thiết lập quyên góp trực tuyến

<div class="article-intro">

Hướng dẫn các bước cần thiết để nhận quyên góp trực tuyến cho hội thánh của bạn — từ tạo quỹ quyên góp, kết nối Stripe để xử lý thanh toán, đến chia sẻ trang quyên góp với cộng đồng tín hữu. Khi hoàn tất, các thành viên có thể quyên góp trực tuyến qua website và ứng dụng di động của bạn.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Tài khoản B1 Admin có quyền quản trị — xem [Vai trò & Quyền hạn](../people/roles-permissions.md)
- Một tài khoản Stripe (tạo miễn phí tại [stripe.com](https://stripe.com) nếu chưa có)

</div>

## Bước 1: Tạo quỹ quyên góp

Quỹ là các danh mục mà người quyên góp có thể chọn. Bạn cần có ít nhất một quỹ trước khi có thể nhận quyên góp.

Làm theo hướng dẫn [Quỹ](../donations/funds.md) để thiết lập các danh mục quyên góp:

1. Tạo các quỹ phổ biến nhất (ví dụ: "Quỹ chung", "Quỹ xây dựng", "Truyền giáo")
2. Đánh dấu phù hợp các quỹ được khấu trừ thuế — điều này ảnh hưởng đến bảng kê quyên góp cuối năm

:::tip
Bạn có thể thêm quỹ bất cứ lúc nào. Hãy bắt đầu với các danh mục quyên góp phổ biến nhất.
:::

## Bước 2: Kết nối Stripe

Stripe xử lý toàn bộ việc thanh toán. Bạn sẽ kết nối tài khoản Stripe với B1 Admin để tiền quyên góp được chuyển vào tài khoản ngân hàng của bạn.

Làm theo hướng dẫn [Thiết lập quyên góp trực tuyến](../donations/online-giving-setup.md) để kết nối Stripe:

1. Đăng nhập vào bảng điều khiển Stripe và lấy Publishable Key và Secret Key của bạn
2. Trong B1 Admin, vào Settings và nhập cả hai khóa

:::warning
Stripe chỉ hiển thị Secret Key một lần. Hãy sao chép và lưu lại trước khi rời khỏi bảng điều khiển Stripe. Nếu làm mất, bạn sẽ cần tạo khóa mới.
:::

## Bước 3: Thêm trang quyên góp vào website

Giúp việc quyên góp dễ tiếp cận bằng cách thêm trang quyên góp vào website B1 của bạn.

Làm theo hướng dẫn [Thiết lập quyên góp trực tuyến](../donations/online-giving-setup.md) và [Quản lý trang](../website/managing-pages.md) để:

1. Thêm tab "Donate" vào trang B1.church của bạn
2. Đường dẫn quyên góp sẽ là: `https://yoursubdomain.b1.church/donate`
3. Thành viên có thể quyên góp mà không cần đăng nhập (trang công khai) hoặc đăng nhập để lưu phương thức thanh toán và xem lịch sử quyên góp

## Bước 4: Thực hiện một lần quyên góp thử

Trước khi thông báo cho cộng đồng, hãy kiểm tra để đảm bảo mọi thứ hoạt động.

1. Thực hiện một khoản quyên góp nhỏ để kiểm tra toàn bộ quy trình từ đầu đến cuối
2. Kiểm tra xem khoản quyên góp có xuất hiện trong B1 Admin, mục Donations hay không

:::tip
Nếu muốn kiểm tra mà không phát sinh giao dịch thật, hãy dùng chế độ thử nghiệm (test mode) của Stripe trước, sau đó chuyển sang chế độ trực tiếp (live mode) trước khi thông báo cho cộng đồng.
:::

## Bước 5: Thông báo đến cộng đồng

Lan tỏa thông tin để các thành viên biết họ có thể quyên góp trực tuyến.

1. Chia sẻ đường dẫn quyên góp qua website, bản tin email, tờ thông tin hàng tuần và mạng xã hội
2. Thành viên cũng có thể quyên góp qua [B1 App](../../b1-church/giving/index.md) — tính năng quyên góp đã được tích hợp sẵn

:::info
Thành viên đã đăng nhập có thể lưu phương thức thanh toán, thiết lập quyên góp định kỳ và xem lịch sử quyên góp. Quyên góp ẩn danh cũng được hỗ trợ — không cần đăng nhập.
:::

## Bước 6: Quản lý thường xuyên

Giữ cho hồ sơ quyên góp luôn được cập nhật và tạo báo cáo trong suốt năm.

1. [Nhập giao dịch Stripe](../donations/stripe-import.md) thường xuyên (hàng tuần hoặc hàng tháng) để hồ sơ luôn cập nhật
2. [Xem báo cáo quyên góp](../donations/donation-reports.md) để theo dõi xu hướng và tổng số tiền theo từng quỹ
3. [Tạo bảng kê quyên góp cuối năm](../donations/giving-statements.md) để phục vụ việc khai thuế của người quyên góp

:::tip
Hãy nhập dữ liệu Stripe ít nhất mỗi tháng một lần để hồ sơ luôn được cập nhật. Xem [Hướng dẫn báo cáo cuối năm](./year-end-reports.md) để biết toàn bộ quy trình cuối năm.
:::

## Hoàn tất!

Hội thánh của bạn giờ đã có thể nhận quyên góp trực tuyến. Thành viên có thể quyên góp qua website, B1 App hoặc bất kỳ thiết bị nào có trình duyệt web. Mọi khoản quyên góp đều được tự động ghi nhận trong B1 Admin.

## Bài viết liên quan

- [Quỹ](../donations/funds.md) — tạo và quản lý các danh mục quyên góp
- [Lô quyên góp](../donations/batches.md) — sắp xếp khoản quyên góp thành nhóm
- [Ghi nhận quyên góp](../donations/recording-donations.md) — nhập thủ công các khoản quyên góp bằng tiền mặt và séc
- [Nhập Stripe](../donations/stripe-import.md) — đưa các giao dịch trực tuyến vào B1 Admin
- [Báo cáo quyên góp](../donations/donation-reports.md) — xem xu hướng và tổng số quyên góp
- [Bảng kê quyên góp](../donations/giving-statements.md) — tạo bảng kê thuế cuối năm
- [Quyên góp](../../b1-church/giving/making-donations.md) — trải nghiệm quyên góp của thành viên trên B1.church và trong B1 App
