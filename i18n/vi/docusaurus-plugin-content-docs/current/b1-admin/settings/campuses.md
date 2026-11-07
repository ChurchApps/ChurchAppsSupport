---
title: "Cơ sở"
description: "Thiết lập cơ sở trong B1 Admin để theo dõi mỗi người và nhóm thuộc địa điểm nào, rồi lọc người, điểm danh và nhân khẩu học theo vị trí."
---

# Cơ sở

<div class="article-intro">

Nếu hội thánh của bạn tổ chức nhóm tại nhiều hơn một địa điểm, **Cơ sở** cho phép bạn theo dõi mỗi người và mỗi nhóm thuộc cơ sở nào. Sau khi thiết lập, các cơ sở sẽ xuất hiện như một tùy chọn trên hồ sơ cá nhân, trong phần thiết lập điểm danh và trong bảng điều khiển Nhân khẩu học. Các hội thánh có nhiều cơ sở có thể lọc, tìm kiếm và lập báo cáo theo cơ sở ở mọi nơi trong B1 Admin.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Bạn cần quyền **Chỉnh sửa cài đặt hội thánh** để quản lý cơ sở. Xem [Vai trò và quyền hạn](./roles-permissions.md).

</div>

## Mở cài đặt cơ sở

Trong B1 Admin, mở [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (thanh tìm kiếm ở góc trên bên trái), chọn **Settings > Settings**, rồi nhấp **Campuses** trong danh sách bên trái để cuộn đến phần **Campuses**. Bạn cũng có thể truy cập trực tiếp tại **/settings/campuses**. Bạn sẽ thấy danh sách tất cả cơ sở đã thiết lập, cùng với tên, địa điểm và múi giờ của từng cơ sở.

## Thêm một cơ sở

1. Nhấp **Add Campus**.
2. Điền thông tin chi tiết về cơ sở:
   - **Name** *(bắt buộc)* — tên hiển thị trong toàn bộ B1 Admin (ví dụ: "Cơ sở chính" hoặc "Cơ sở phía Bắc").
   - **Address** — địa chỉ đường phố của cơ sở (dùng để hiển thị thông tin; không giống địa chỉ chính của hội thánh trong Cài đặt hội thánh).
   - **City / State / Zip** — vị trí của cơ sở.
   - **Time Zone** — múi giờ theo chuẩn IANA cho cơ sở này (ví dụ: *America/Chicago*). [Lịch điểm danh](../attendance/setup.md#setting-a-check-in-schedule) cho các buổi nhóm tại cơ sở này sẽ mở và đóng theo múi giờ này. Nếu đặt là **None**, múi giờ của [hội thánh](./church-settings.md#time-zone) sẽ được sử dụng thay thế. Hữu ích khi các cơ sở nằm ở các múi giờ khác nhau.
   - **Website** — URL không bắt buộc dành cho trang web riêng của cơ sở.
3. Nhấp **Save**.

## Chỉnh sửa cơ sở

Nhấp vào bất kỳ dòng cơ sở nào trong danh sách để mở trình chỉnh sửa ở bảng bên phải. Cập nhật các trường cần thiết rồi nhấp **Save**.

## Xóa cơ sở

Mở cơ sở để chỉnh sửa rồi nhấp **Delete**. Bạn sẽ được yêu cầu xác nhận. Việc xóa cơ sở không xóa những người đang được gán vào cơ sở đó — trường cơ sở của họ sẽ chỉ để trống.

## Gán người vào cơ sở

Sau khi tạo cơ sở, nhân viên có thể gán một người vào cơ sở từ hồ sơ của người đó:

1. Mở hồ sơ của người trong **People**.
2. Nhấp **Edit**.
3. Chọn cơ sở từ danh sách thả xuống **Campus**.
4. Nhấp **Save**.

Bạn cũng có thể cập nhật cơ sở hàng loạt từ trang People. Chọn nhiều người, dùng **Bulk Edit**, rồi đặt trường Campus cho tất cả cùng lúc.

## Lọc theo cơ sở

Sau khi thiết lập cơ sở, bạn có thể lọc trong toàn bộ B1 Admin theo cơ sở:

- **Tìm kiếm người** — thêm điều kiện Campus trong tìm kiếm nâng cao, hoặc tải một [Danh sách đã lưu](../people/lists.md) được giới hạn theo cơ sở.
- **Demographics** — [bảng điều khiển Nhân khẩu học](../people/demographics.md) hiển thị biểu đồ donut theo Campus khi có ít nhất một người được gán cơ sở.
- **Attendance Setup** — mỗi khung giờ nhóm trong Điểm danh có thể được liên kết với một cơ sở.

:::tip
Các hội thánh chỉ có một địa điểm không cần thiết lập cơ sở. Tất cả tính năng liên quan đến cơ sở đều không bắt buộc — nếu không có cơ sở nào, các trường và biểu đồ về cơ sở sẽ không xuất hiện.
:::

## Bài viết liên quan

- [Cài đặt hội thánh](./church-settings.md) — địa chỉ chính và thương hiệu của hội thánh (tách biệt với địa chỉ cơ sở)
- [Nhân khẩu học](../people/demographics.md) — biểu đồ phân tích theo Cơ sở
- [Thiết lập điểm danh](../attendance/setup.md) — liên kết khung giờ nhóm với một cơ sở
- [Chỉnh sửa hàng loạt](../people/bulk-editing.md) — gán cơ sở cho nhiều người cùng lúc
