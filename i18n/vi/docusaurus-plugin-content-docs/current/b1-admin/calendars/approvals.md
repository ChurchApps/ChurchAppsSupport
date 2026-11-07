---
title: "Phê duyệt lịch"
description: "Xem các yêu cầu đặt phòng và tài nguyên đang chờ trong B1 Admin, kiểm tra xung đột, rồi duyệt hoặc từ chối, có thể đăng sự kiện kèm theo."
---

# Phê duyệt lịch

<div class="article-intro">

Trang Phê duyệt là nơi quản trị viên xem xét và xử lý các yêu cầu đặt phòng và tài nguyên đang chờ duyệt, cũng như các sự kiện lịch cần được phê duyệt trước khi được công bố.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Cấu hình phòng hoặc tài nguyên với một **Nhóm phê duyệt** trong [Phòng & Tài nguyên](./rooms-resources.md)
- Bạn cần quyền **Quản trị lịch** hoặc quyền **content.edit**

</div>

## Mở trang Phê duyệt

Trong B1 Admin, mở [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (thanh tìm kiếm ở góc trên bên trái), mở rộng **Lịch**, rồi nhấp **Phê duyệt**. Các yêu cầu đặt phòng đang chờ và các sự kiện đang chờ xem xét sẽ được liệt kê tại đây.

## Yêu cầu đặt phòng

Khi một nhóm tạo sự kiện và yêu cầu phòng hoặc tài nguyên, yêu cầu đó sẽ xuất hiện trong mục **Yêu cầu phòng & tài nguyên**. Mỗi dòng hiển thị:

- Tên sự kiện và ngày/giờ
- Phòng hoặc tài nguyên được yêu cầu (kèm số lượng đối với tài nguyên có nhiều đơn vị)
- Huy hiệu trạng thái cho biết yêu cầu có xung đột hay không

### Chỉ báo xung đột

Nếu một yêu cầu trùng với một lịch đặt khác hoặc một khoảng thời gian chặn cho cùng phòng hoặc tài nguyên, trạng thái của yêu cầu sẽ hiển thị huy hiệu **Xung đột**; di chuột qua huy hiệu để xem chi tiết. Các yêu cầu không trùng lặp sẽ hiển thị **Không có xung đột**. Hãy xem xét kỹ các yêu cầu xung đột trước khi phê duyệt bất kỳ yêu cầu nào trong số đó.

### Phê duyệt hoặc từ chối

Nhấp **Phê duyệt** hoặc **Từ chối** trên bất kỳ yêu cầu đặt phòng nào (khi từ chối, hệ thống sẽ yêu cầu bạn xác nhận trước). Nhóm đã gửi yêu cầu sẽ nhận được thông báo về quyết định. Các lịch đặt đã được phê duyệt sẽ được khóa cho phòng hoặc tài nguyên đó trong thời gian diễn ra sự kiện; các lịch đặt bị từ chối sẽ giải phóng khung giờ cho người khác.

Khi bạn nhấp **Phê duyệt**, hộp thoại **Phê duyệt đặt phòng** sẽ mở ra để bạn có thể đồng thời công bố sự kiện trong cùng một bước:

1. Chọn **Công bố lên lịch công khai** để sự kiện hiển thị công khai trên lịch của nhóm. Bỏ chọn nếu bạn chỉ muốn phê duyệt lịch đặt mà không thay đổi chế độ hiển thị của sự kiện.
2. Khi đã chọn **Công bố lên lịch công khai**, bạn có thể tùy chọn chọn một lịch được tuyển chọn trong **Cũng thêm vào lịch** để thêm sự kiện vào một trong các [lịch được tuyển chọn](./curated-calendar.md) của bạn. Giữ nguyên **Không có** nếu bạn muốn bỏ qua bước này. (Tùy chọn này chỉ xuất hiện nếu bạn có quyền **content.edit**.)
3. Nhấp **Phê duyệt**.

## Sự kiện đang chờ

Nếu quy trình lịch của bạn yêu cầu phê duyệt sự kiện trước khi sự kiện hiển thị với công chúng, các sự kiện đang chờ sẽ xuất hiện trong mục **Yêu cầu sự kiện**. Nhấp **Phê duyệt** để công bố sự kiện lên lịch, hoặc **Từ chối** để thông báo cho người gửi rằng cần chỉnh sửa.

:::tip
Thiết lập Nhóm phê duyệt cho một phòng trong [Phòng & Tài nguyên](./rooms-resources.md) để yêu cầu phê duyệt đối với phòng đó. Khi đó, các nhóm có quyền truy cập có thể yêu cầu phòng khi tạo sự kiện, và các yêu cầu này sẽ chuyển về trang này.
:::

## Bài viết liên quan

- [Phòng, Tài nguyên & Lập lịch](./rooms-resources.md) — cấu hình các phòng và tài nguyên có thể đặt
- [Tạo lịch](./creating-calendars.md) — quản lý lịch và sự kiện
