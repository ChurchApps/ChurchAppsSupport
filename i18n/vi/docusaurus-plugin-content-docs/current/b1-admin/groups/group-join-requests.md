---
title: "Yêu cầu tham gia nhóm"
description: "Xem, duyệt hoặc từ chối yêu cầu tham gia nhóm trong B1 Admin, tìm yêu cầu đang chờ với vai trò trưởng nhóm hoặc quản trị, và ghi lý do khi từ chối."
---

# Yêu cầu tham gia nhóm

<div class="article-intro">

Khi một nhóm được cấu hình với chính sách tham gia cần phê duyệt, mọi người có thể gửi yêu cầu tham gia. Trưởng nhóm và quản trị viên sẽ xem xét và chấp nhận hoặc từ chối các yêu cầu này. Cách này giúp hội thánh của bạn kiểm soát thành viên trong nhóm, đồng thời giúp mọi người dễ dàng bày tỏ mong muốn tham gia.

</div>

## Video hướng dẫn

<YouTube id="1vj-suCiIsE" title="Yêu cầu tham gia nhóm và lịch nhóm trong B1" next="Thiết lập buổi nhóm và điểm danh trong B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Bạn cần có quyền quản lý nhóm, hoặc bạn phải là trưởng của nhóm cụ thể đó. Xem [Vai trò & Quyền hạn](../people/roles-permissions.md) để biết chi tiết.
- Nhóm phải được đặt chính sách tham gia thành **Yêu cầu** (cần phê duyệt). Xem [Tạo nhóm](./creating-groups.md) để biết cách cấu hình chính sách tham gia.

</div>

## Tìm hiểu chính sách tham gia

Nhóm có thể có ba chính sách tham gia khác nhau:

- **Mở** -- Bất kỳ ai cũng có thể tham gia ngay lập tức mà không cần phê duyệt
- **Yêu cầu** -- Mọi người gửi yêu cầu tham gia và yêu cầu này cần được phê duyệt
- **Đóng** -- Không ai có thể yêu cầu tham gia (thành viên phải được thêm thủ công)

Khi nhóm sử dụng chính sách **Yêu cầu**, mọi lần tham gia đều đi qua quy trình phê duyệt được mô tả trong trang này.

## Xem các yêu cầu đang chờ

### Dành cho trưởng nhóm

1. Trong B1 Admin, mở [menu Jump](../introduction.md#getting-around-with-the-jump-menu) và chọn **People > Groups**
2. Nhấp vào tên nhóm
3. Mục **Members** sẽ hiển thị số yêu cầu đang chờ. Nhấp vào **All members** -- các yêu cầu đang chờ của nhóm này sẽ xuất hiện ở đầu danh sách thành viên

### Dành cho quản trị viên

Quản trị viên có quyền quản lý nhóm có thể xem các yêu cầu đang chờ của tất cả nhóm:

1. Trong menu Jump, chọn **People > Groups**
2. Nhấp vào nút **pending requests** ở đầu trang (ví dụ: "3 pending requests"). Nút này chỉ xuất hiện khi có yêu cầu đang chờ.
3. Xem xét tất cả yêu cầu đang chờ trong toàn hội thánh

## Xem xét một yêu cầu tham gia

Mỗi yêu cầu tham gia hiển thị:

- **Tên và ảnh của người** -- Người gửi yêu cầu tham gia
- **Lời nhắn tùy chọn** -- Lời nhắn cá nhân giải thích lý do họ muốn tham gia (nếu có)
- **Ngày yêu cầu** -- Thời điểm yêu cầu được gửi

Để xem xét một yêu cầu:

1. Đọc lời nhắn của người đó nếu họ có để lại
2. Nhấp vào tên người đó để xem hồ sơ nếu cần
3. Quyết định chấp nhận hoặc từ chối

## Phê duyệt một yêu cầu

1. Nhấp **Approve** trên yêu cầu tham gia
2. Người đó ngay lập tức được thêm vào nhóm với vai trò thành viên
3. Người gửi yêu cầu nhận được thông báo rằng yêu cầu đã được chấp nhận
4. Yêu cầu được đánh dấu là đã chấp nhận trong hệ thống

:::tip
Khi bạn chấp nhận một yêu cầu, người đó trở thành thành viên thông thường của nhóm. Sau này, nếu cần, bạn có thể thăng họ lên làm trưởng nhóm từ trang [Thành viên nhóm](./group-members.md).
:::

## Từ chối một yêu cầu

1. Nhấp **Decline** trên yêu cầu tham gia
2. Tùy chọn nhập lý do từ chối (tối đa 500 ký tự)
3. Nhấp **Confirm**
4. Người gửi yêu cầu nhận được thông báo kèm lý do từ chối (nếu có)
5. Yêu cầu được đánh dấu là đã từ chối

:::info
Việc cung cấp lý do từ chối giúp người đó hiểu vì sao yêu cầu không được chấp nhận, và có thể khuyến khích họ thử lại sau hoặc tìm hiểu các nhóm khác.
:::

## Phê duyệt từ trang Tasks

Mỗi yêu cầu tham gia cũng tạo ra một công việc trong **Serving &rarr; My Work**, với tiêu đề "*Người đó* yêu cầu tham gia *Nhóm*." Công việc này được giao cho trưởng nhóm. Nếu nhóm chưa có trưởng nào, công việc sẽ được giao cho bất kỳ nhân viên nào có quyền **Group Members &gt; Edit**, hoặc cho quản trị viên tên miền của hội thánh nếu không ai có quyền đó. Nhân viên và quản trị viên nhận công việc theo cách này cũng sẽ nhận được thông báo có liên kết trực tiếp đến công việc.

Mở công việc sẽ hiển thị tên người gửi, tên nhóm và lời nhắn tùy chọn của họ, cùng các nút **Approve** và **Decline** ngay trên thẻ công việc (nút Decline mở cùng ô lý do tùy chọn đã mô tả ở trên). Nhờ vậy, trưởng nhóm có thêm một cách xử lý yêu cầu thông qua thông báo mà không cần mở danh sách thành viên của nhóm.

Quyết định một yêu cầu từ bất kỳ nơi nào -- danh sách thành viên của nhóm hoặc thẻ công việc -- đều sẽ đóng yêu cầu ở mọi nơi, nên trưởng nhóm sẽ không bao giờ thấy công việc cũ cho một yêu cầu đã được xử lý.

## Thông báo

Hệ thống yêu cầu tham gia tự động gửi thông báo:

- **Khi có yêu cầu được gửi** -- Tất cả trưởng nhóm nhận được thông báo. Nếu nhóm chưa có trưởng nào, thay vào đó, nhân viên hoặc quản trị viên được giao công việc sẽ nhận thông báo (xem phần trên).
- **Khi yêu cầu được chấp nhận** -- Người gửi yêu cầu nhận được xác nhận
- **Khi yêu cầu bị từ chối** -- Người gửi yêu cầu nhận được thông báo kèm lý do từ chối (nếu có)

Thông báo xuất hiện trong trung tâm thông báo của người dùng trên B1.church và trong ứng dụng di động. Trong biểu tượng chuông thông báo của B1 Admin, nhấp vào thông báo yêu cầu tham gia (hoặc **View Details**) sẽ mở nhóm trên trang B1.church của hội thánh bạn trong một tab mới.

## Quản lý yêu cầu từ phía thành viên

Mọi người có thể tự quản lý yêu cầu tham gia của mình trên B1.church:

- Xem trạng thái các yêu cầu đang chờ trên trang chi tiết nhóm
- Hủy yêu cầu đang chờ nếu thay đổi ý định
- Xem yêu cầu của họ đã được chấp nhận hay bị từ chối

## Thực hành tốt nhất

- **Phản hồi kịp thời** -- Cố gắng xem xét các yêu cầu trong vòng 24-48 giờ để mọi người không phải chờ đợi lâu
- **Nêu rõ lý do từ chối** -- Giúp mọi người hiểu các bước tiếp theo hoặc các lựa chọn thay thế
- **Kiểm tra hồ sơ** -- Xem hồ sơ của người đó để đánh giá họ có phù hợp với nhóm hay không
- **Truyền đạt kỳ vọng** -- Đảm bảo mô tả nhóm nêu rõ nhóm dành cho ai

## Bài viết liên quan

- [Tạo nhóm](./creating-groups.md) -- Tìm hiểu cách thiết lập nhóm và cấu hình chính sách tham gia
- [Thành viên nhóm](./group-members.md) -- Quản lý các thành viên hiện có của nhóm
- [Lịch nhóm](./group-calendar.md) -- Lên lịch các buổi họp và sự kiện của nhóm
