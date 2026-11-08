---
title: "Hướng dẫn: Thiết lập đăng ký sự kiện"
description: "Thiết lập biểu mẫu đăng ký sự kiện trong B1 Admin để thu thập thông tin người tham dự và thanh toán tùy chọn, nhúng biểu mẫu vào trang web nhà thờ và theo dõi các đăng ký."
---

# Thiết lập đăng ký sự kiện

<div class="article-intro">

Tạo biểu mẫu đăng ký sự kiện, thu thập thông tin người tham dự và thanh toán tùy chọn, nhúng biểu mẫu vào trang web nhà thờ và quản lý các đăng ký khi chúng đến. Khi hoàn tất, bạn sẽ có một trang đăng ký có thể chia sẻ cho bất kỳ sự kiện nào của nhà thờ.

</div>

:::info
**Hai cách xử lý đăng ký sự kiện:** Hướng dẫn này đề cập đến **đăng ký qua biểu mẫu**, cho phép bạn kiểm soát toàn bộ các trường tùy chỉnh và việc thu thanh toán. Với các sự kiện đơn giản chỉ cần theo dõi ai sẽ tham dự, hãy sử dụng **đăng ký sự kiện gốc** có sẵn trong lịch -- xem [Tạo lịch](../calendars/creating-calendars.md#enabling-event-registration) để biết hướng dẫn thiết lập. Đăng ký gốc cho phép thành viên tự đăng ký trực tiếp từ [B1.church hoặc ứng dụng B1 App](../../b1-church/events/registering.md) với tính năng theo dõi sức chứa, khoảng thời gian đăng ký và email xác nhận.
:::

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Tài khoản B1 Admin có quyền quản trị
- Để thu thanh toán: [Phải cấu hình Stripe](../donations/online-giving-setup.md) trước

</div>

## Bước 1: Tạo biểu mẫu độc lập

Biểu mẫu độc lập có URL công khai riêng mà bất kỳ ai cũng có thể truy cập -- rất phù hợp cho đăng ký sự kiện.

Làm theo hướng dẫn [Tạo biểu mẫu](../forms/creating-forms.md) để:

1. Vào Forms và nhấn Add Form
2. Chọn loại "Stand Alone" -- điều này giúp biểu mẫu có URL công khai riêng
3. Đặt tên theo sự kiện (ví dụ: "Đăng ký Retreat Nam", "Đăng ký VBS")

## Bước 2: Thêm câu hỏi

Xây dựng các trường thông tin cần thu thập từ người đăng ký.

Làm theo hướng dẫn [Tạo biểu mẫu](../forms/creating-forms.md#adding-questions) để thêm câu hỏi:

1. Vào tab Questions và thêm các trường cho thông tin bạn cần: họ tên, email, số điện thoại, hạn chế ăn uống, cỡ áo thun, liên hệ khẩn cấp, v.v.
2. Dùng Multiple Choice cho các lựa chọn như sở thích bữa ăn hoặc phiên tham gia

:::warning
Loại trường Payment yêu cầu phải cấu hình Stripe. Nếu bạn chưa thiết lập dâng hiến trực tuyến, hãy xem [Thiết lập dâng hiến trực tuyến](../donations/online-giving-setup.md) trước khi thêm trường thanh toán.
:::

## Bước 3: Cấu hình cài đặt biểu mẫu

Kiểm soát thời điểm và cách biểu mẫu đăng ký có sẵn.

1. Đặt ngày mở đăng ký nếu việc đăng ký chỉ mở trong một khoảng thời gian giới hạn
2. Sao chép URL công khai -- bạn có thể chia sẻ trực tiếp
3. Thêm thành viên biểu mẫu với vai trò Admin hoặc View Only để hỗ trợ quản lý các đăng ký

## Bước 4: Nhúng vào trang web

Giúp người ta dễ dàng tìm thấy biểu mẫu đăng ký bằng cách thêm vào trang web nhà thờ.

Làm theo hướng dẫn [Quản lý trang](../website/managing-pages.md) để:

1. Trong trình chỉnh sửa website B1, thêm một phần mới vào trang và chọn phần tử Form
2. Chọn biểu mẫu đăng ký từ danh sách

:::tip
Cũng hãy chia sẻ URL độc lập qua email, mạng xã hội và bản tin nhà thờ -- biểu mẫu càng được hiển thị ở nhiều nơi, bạn càng nhận được nhiều đăng ký.
:::

## Bước 5: Quản lý các đăng ký

Theo dõi các đăng ký khi chúng đến và xuất dữ liệu khi cần.

Làm theo hướng dẫn [Quản lý đăng ký](../forms/managing-submissions.md) để:

1. Xem các phản hồi khi chúng đến trên tab Submissions
2. Xuất sang CSV để dùng với bảng tính, theo dõi số lượng người tham dự, hoặc chia sẻ với người điều phối sự kiện

## Hoàn tất!

Đăng ký sự kiện của bạn đã được đưa vào hoạt động. Chia sẻ liên kết, nhúng vào trang web và theo dõi các đăng ký từ B1 Admin. Khi sự kiện kết thúc, hãy xuất danh sách cuối cùng để lưu hồ sơ.

## Bài viết liên quan

- [Tạo biểu mẫu](../forms/creating-forms.md) — tạo biểu mẫu với nhiều loại trường khác nhau
- [Quản lý đăng ký](../forms/managing-submissions.md) — xem và xuất phản hồi biểu mẫu
- [Quản lý trang](../website/managing-pages.md) — nhúng biểu mẫu vào trang web
- [Thiết lập dâng hiến trực tuyến](../donations/online-giving-setup.md) — bắt buộc đối với các trường thanh toán
