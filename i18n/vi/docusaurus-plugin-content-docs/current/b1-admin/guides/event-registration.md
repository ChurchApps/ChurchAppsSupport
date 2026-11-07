---
title: "Hướng dẫn: Thiết lập đăng ký sự kiện"
description: "Thiết lập biểu mẫu đăng ký sự kiện trong B1 Admin để thu thông tin người tham dự và thanh toán tùy chọn, nhúng lên website hội thánh và theo dõi đăng ký."
---

# Thiết lập đăng ký sự kiện

<div class="article-intro">

Tạo biểu mẫu đăng ký sự kiện, thu thập thông tin người tham dự và các khoản thanh toán tùy chọn, nhúng biểu mẫu lên trang web của hội thánh, và quản lý các đăng ký khi chúng được gửi đến. Khi hoàn tất, bạn sẽ có một trang đăng ký có thể chia sẻ cho bất kỳ sự kiện nào của hội thánh.

</div>

:::info
**Hai cách xử lý đăng ký sự kiện:** Hướng dẫn này đề cập đến **đăng ký dựa trên biểu mẫu**, cho phép bạn kiểm soát toàn bộ các trường tùy chỉnh và việc thu thanh toán. Với những sự kiện đơn giản chỉ cần theo dõi ai sẽ tham dự, hãy dùng **đăng ký sự kiện gốc** có sẵn trong lịch -- xem [Tạo lịch](../calendars/creating-calendars.md#enabling-event-registration) để biết hướng dẫn thiết lập. Đăng ký gốc cho phép thành viên đăng ký trực tiếp từ [trang web B1](../../b1-church/events/registering.md) và [ứng dụng di động](../../b1-mobile/events/registering.md), kèm theo theo dõi sức chứa, khoảng thời gian đăng ký và email xác nhận.
:::

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Tài khoản B1 Admin có quyền quản trị
- Để thu thanh toán: [Stripe phải được cấu hình](../donations/online-giving-setup.md) trước

</div>

## Bước 1: Tạo biểu mẫu độc lập

Biểu mẫu độc lập có URL công khai riêng mà bất kỳ ai cũng có thể truy cập -- rất phù hợp cho đăng ký sự kiện.

Làm theo hướng dẫn [Tạo biểu mẫu](../forms/creating-forms.md) để:

1. Vào mục Biểu mẫu (Forms) và nhấn Thêm biểu mẫu (Add Form)
2. Chọn loại "Stand Alone" -- điều này giúp biểu mẫu có URL công khai riêng
3. Đặt tên theo sự kiện (ví dụ: "Đăng ký Tĩnh nguyện nam", "Đăng ký VBS")

## Bước 2: Thêm câu hỏi

Xây dựng các trường thông tin bạn cần thu thập từ người đăng ký.

Làm theo hướng dẫn [Tạo biểu mẫu](../forms/creating-forms.md#adding-questions) để thêm câu hỏi:

1. Vào tab Câu hỏi (Questions) và thêm các trường cho thông tin cần thiết: họ tên, email, số điện thoại, hạn chế về ăn uống, cỡ áo thun, liên hệ khẩn cấp, v.v.
2. Dùng Trắc nghiệm (Multiple Choice) cho các lựa chọn như sở thích bữa ăn hoặc chọn buổi học

:::warning
Loại trường Thanh toán (Payment) yêu cầu Stripe phải được cấu hình. Nếu bạn chưa thiết lập dâng hiến trực tuyến, hãy xem [Thiết lập dâng hiến trực tuyến](../donations/online-giving-setup.md) trước khi thêm trường thanh toán.
:::

## Bước 3: Cấu hình cài đặt biểu mẫu

Kiểm soát thời điểm và cách thức biểu mẫu đăng ký được mở.

1. Đặt ngày mở đăng ký nếu việc đăng ký chỉ được mở trong một khoảng thời gian giới hạn
2. Sao chép URL công khai -- bạn có thể chia sẻ trực tiếp đường link này
3. Thêm thành viên biểu mẫu với vai trò Quản trị (Admin) hoặc Chỉ xem (View Only) để hỗ trợ quản lý các đăng ký

## Bước 4: Nhúng lên trang web của bạn

Giúp người ta dễ tìm thấy biểu mẫu đăng ký bằng cách thêm nó vào trang web của hội thánh.

Làm theo hướng dẫn [Quản lý trang](../website/managing-pages.md) để:

1. Trong trình chỉnh sửa trang web B1, thêm một phần mới vào trang và chọn phần tử Biểu mẫu (Form)
2. Chọn biểu mẫu đăng ký của bạn từ danh sách

:::tip
Cũng hãy chia sẻ URL độc lập qua email, mạng xã hội và bản tin của hội thánh -- càng nhiều nơi hiển thị, bạn càng nhận được nhiều đăng ký.
:::

## Bước 5: Quản lý các đăng ký

Theo dõi các đăng ký khi chúng được gửi đến và xuất dữ liệu khi cần.

Làm theo hướng dẫn [Quản lý các phản hồi](../forms/managing-submissions.md) để:

1. Xem lại các phản hồi khi chúng đến trong tab Phản hồi (Submissions)
2. Xuất ra CSV để dùng với bảng tính, theo dõi số lượng người tham dự, hoặc chia sẻ với người điều phối sự kiện

## Hoàn tất!

Đăng ký sự kiện của bạn đã sẵn sàng. Hãy chia sẻ liên kết, nhúng lên trang web và theo dõi số người đăng ký từ B1 Admin. Khi sự kiện kết thúc, hãy xuất danh sách cuối cùng để lưu hồ sơ.

## Bài viết liên quan

- [Tạo biểu mẫu](../forms/creating-forms.md) -- xây dựng biểu mẫu với nhiều loại trường khác nhau
- [Quản lý các phản hồi](../forms/managing-submissions.md) -- xem lại và xuất phản hồi của biểu mẫu
- [Quản lý trang](../website/managing-pages.md) -- nhúng biểu mẫu lên trang web của bạn
- [Thiết lập dâng hiến trực tuyến](../donations/online-giving-setup.md) -- bắt buộc đối với các trường thanh toán
