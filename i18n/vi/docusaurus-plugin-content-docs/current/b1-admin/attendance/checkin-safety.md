---
title: "An toàn khi điểm danh"
description: "Cấu hình an toàn trẻ em trong B1 Admin: sức chứa phòng, tỷ lệ tình nguyện viên, danh sách người đón đáng tin cậy và tin nhắn báo phụ huynh khi check-in."
---

# An toàn khi điểm danh

<div class="article-intro">

B1 có sẵn một bộ công cụ bảo vệ trẻ em khi điểm danh: giới hạn sức chứa phòng và tỷ lệ tình nguyện viên trên trẻ em, hướng dẫn theo độ tuổi và cấp lớp tại kiosk, các loại điểm danh phân biệt thành viên, khách và tình nguyện viên, cùng danh sách người đón được tin cậy của từng gia đình, được xác minh khi trả trẻ. Trang này hướng dẫn cách cấu hình từng tính năng an toàn trong B1 Admin.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Thiết lập [cấu trúc điểm danh](setup.md) và [kiosk điểm danh](check-in.md) của bạn
- Phòng là các [nhóm](../groups/creating-groups.md) được liên kết với giờ thờ phượng — các cài đặt an toàn bên dưới được đặt trên nhóm
- Chức năng nhắn tin cho phụ huynh và phát thanh khẩn cấp yêu cầu một nhà cung cấp dịch vụ nhắn tin đã kết nối ([Text In Church](../integrations/services/text-in-church.md), [Clearstream](../integrations/services/clearstream.md), hoặc Mutual Ministry)

</div>

## Sức chứa phòng và đóng phòng

Mỗi phòng điểm danh (nhóm) có thể áp dụng giới hạn riêng. Mở nhóm, nhấp **Chỉnh sửa** để sửa cài đặt, rồi tìm mục **Sức chứa điểm danh**:

- **Sức chứa** -- Số người tối đa có thể được điểm danh vào phòng này cùng lúc. Khi phòng đầy, việc điểm danh vào phòng bị chặn và kiosk sẽ thông báo tên phòng đã đầy.
- **Sức chứa khách** -- Giới hạn riêng, không bắt buộc, cho số lượng khách mà phòng có thể tiếp nhận.
- **Đóng điểm danh** -- Chọn **Có** để ngừng ngay mọi việc điểm danh vào phòng này (ví dụ khi lớp học bị hủy hoặc phòng không sử dụng được). Việc trả trẻ vẫn hoạt động bình thường.

## Tỷ lệ tình nguyện viên

Mục **Sức chứa điểm danh** trên nhóm cũng bao gồm các quy tắc về nhân sự:

- **Trẻ em trên mỗi tình nguyện viên** -- Số trẻ tối đa mà mỗi tình nguyện viên đã điểm danh có thể phụ trách (ví dụ 5 nghĩa là một tình nguyện viên cho năm trẻ em).
- **Số tình nguyện viên tối thiểu** -- Số tình nguyện viên ít nhất phải được điểm danh trước khi trẻ có thể điểm danh vào phòng.

Tình nguyện viên được tính vào các quy tắc này khi họ điểm danh với loại **Tình nguyện viên** tại kiosk (xem [Các loại điểm danh](#check-in-types) bên dưới).

### Chọn cảnh báo hay chặn

Mức độ nghiêm ngặt khi áp dụng tỷ lệ là cài đặt chung cho toàn hội thánh:

1. Trong B1 Admin, vào **Cài đặt** và mở mục **Điểm danh**.
2. Đặt **Áp dụng tỷ lệ tình nguyện viên**:
   - **Cảnh báo (cho phép kèm xác nhận)** -- Kiosk hiển thị cảnh báo khi phòng vượt tỷ lệ hoặc chưa đủ số tình nguyện viên tối thiểu, và nhân viên có thể xác nhận để tiếp tục. Đây là mặc định.
   - **Chặn (ngăn điểm danh)** -- Việc điểm danh vào phòng bị từ chối cho đến khi có đủ tình nguyện viên được điểm danh.

:::info
Sức chứa và Đóng điểm danh luôn là giới hạn cứng — lựa chọn cảnh báo/chặn chỉ áp dụng cho tỷ lệ tình nguyện viên.
:::

## Các loại điểm danh

Mỗi lần điểm danh đều ghi nhận người đó là **Thành viên**, **Khách** hay **Tình nguyện viên**. Loại được chọn bằng các nút chọn trên màn hình hộ gia đình của kiosk (Thành viên là mặc định). Các loại này được dùng trong quy tắc an toàn — tình nguyện viên đảm bảo tỷ lệ phụ trách, còn khách được tính vào Sức chứa khách của phòng.

## Hướng dẫn phòng theo độ tuổi và cấp lớp

Bạn có thể đặt giới hạn độ tuổi hoặc cấp lớp cho từng phòng để kiosk hướng dẫn gia đình đến đúng phòng:

- Trong cài đặt của nhóm, dùng mục **Độ tuổi & Cấp lớp** để đặt độ tuổi tối thiểu/tối đa (theo năm và tháng) và/hoặc cấp lớp cho phòng.
- Tại kiosk, các phòng mà trẻ đủ điều kiện sẽ được làm nổi bật, còn các phòng không phù hợp sẽ bị làm mờ. Phòng bị làm mờ vẫn có thể được chọn nếu nhân viên xác nhận — hướng dẫn này không bao giờ chặn cứng.

Cấp lớp được chuyển lên theo **ngày lên lớp** của hội thánh:

1. Trong B1 Admin, vào **Cài đặt** và mở mục **Lên lớp**.
2. Đặt tháng và ngày hội thánh của bạn lên lớp cho học sinh (ví dụ 1 tháng 8). Độ tuổi và cấp lớp tại kiosk được tính theo ngày lên lớp gần nhất.

## Người đón được tin cậy và người không được phép đón

Mỗi gia đình có thể có danh sách những người được phép — hoặc không được phép — đón con của họ.

1. Mở trang của một người trong **Người** và tìm thẻ **Đón trẻ**.
2. Nhấp **Thêm**. Tìm một người đã có trong hệ thống, hoặc thêm người chưa có bằng cách nhập **Tên**, **Mối quan hệ** và một ảnh.
3. Đặt **Trạng thái**:
   - **Được tin cậy** -- Khi trả trẻ, người này xuất hiện dưới dạng thẻ đón có thể chạm vào, kèm ảnh, giúp việc đón trẻ được xác minh nhanh chóng.
   - **Không được phép** -- Nếu có người cố đón trẻ dưới tên này, kiosk sẽ chặn việc trả trẻ và hiển thị cảnh báo. Nhân viên có thể ghi đè, và việc ghi đè được lưu trong hồ sơ điểm danh.

Nhấp vào nút trạng thái của người đó trên thẻ để chuyển đổi giữa Được tin cậy và Không được phép.

:::tip
Hãy thêm ảnh cho những người đón được tin cậy bất cứ khi nào có thể — màn hình trả trẻ hiển thị ảnh để tình nguyện viên có thể đối chiếu người đang đứng trước mặt.
:::

## Nhắn tin cho phụ huynh và phát thanh khẩn cấp

Cả hai tính năng đều gửi tin nhắn văn bản qua nhà cung cấp dịch vụ nhắn tin đã kết nối của hội thánh — B1 không có dịch vụ SMS tích hợp sẵn, nên phải cấu hình một trong các nhà cung cấp được hỗ trợ trước.

- **Nhắn tin cho phụ huynh** -- Từ màn hình trả trẻ của kiosk có nhân viên trực, nhân viên có thể nhắn tin cho cha mẹ/người giám hộ của trẻ đã điểm danh (ví dụ "Vui lòng đến phòng nhi").
- **Phát thanh khẩn cấp** -- Từ cài đặt quản trị của kiosk, nhân viên có thể nhắn tin cho người giám hộ của mọi gia đình đã điểm danh cho giờ thờ phượng được chọn, cùng một lúc. Để gửi, cần gõ **EMERGENCY** để xác nhận.

Những người đã từ chối nhận tin nhắn, hoặc không có số di động trong hồ sơ, sẽ được bỏ qua tự động — kiosk sẽ báo số tin nhắn đã gửi và số tin nhắn đã bị bỏ qua.

Xem hướng dẫn phía kiosk tại [Trả trẻ & An toàn cho trẻ em](../../b1-checkin/check-in/checking-out.md).

## Bài viết liên quan

- [Điểm danh](check-in.md) — thiết lập kiosk và phần cứng
- [Trả trẻ & An toàn cho trẻ em](../../b1-checkin/check-in/checking-out.md) — quy trình trả trẻ tại kiosk, xác minh người đón và nhắn tin
- [Tạo nhóm](../groups/creating-groups.md) — nơi đặt cài đặt phòng
- [Thiết lập điểm danh](setup.md) — buổi thờ phượng, giờ thờ phượng và phân công phòng
- [Độ tuổi tối thiểu để nhắn tin riêng](../settings/mobile-app.md#member-directory--messaging-settings) — chặn các cuộc trò chuyện riêng mới với trẻ em, đồng thời vẫn giữ trẻ trong danh bạ
