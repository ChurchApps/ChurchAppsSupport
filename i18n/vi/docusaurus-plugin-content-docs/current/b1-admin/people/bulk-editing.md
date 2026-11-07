---
title: "Chỉnh sửa hàng loạt người"
description: "Cập nhật hàng loạt trạng thái thành viên, tình trạng hôn nhân, giới tính, từ chối nhận tin, trường Có/Không tùy chỉnh hoặc thành viên nhóm trong B1 Admin."
---

# Chỉnh sửa hàng loạt người

<div class="article-intro">
Chỉnh sửa hàng loạt cho phép bạn cập nhật nhiều người cùng lúc, giúp tiết kiệm thời gian khi cần thực hiện cùng một thay đổi cho nhiều người. Bạn có thể cập nhật trạng thái thành viên, tình trạng hôn nhân, giới tính, tùy chọn không nhận thông tin và việc thuộc nhóm trong một thao tác duy nhất.
</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Bạn cần có quyền quản lý dữ liệu người. Xem [Vai trò & Quyền](./roles-permissions.md) để biết chi tiết.
- Bạn nên đã thêm hoặc nhập những người cần chỉnh sửa. Xem [Thêm người](./adding-people.md) nếu cần.
</div>

## Chọn người để chỉnh sửa hàng loạt

1. Vào **Người** trong B1 Admin
2. Dùng công cụ tìm kiếm hoặc bộ lọc để tìm những người bạn muốn cập nhật
3. Đánh dấu các ô để chọn người
   - Trong chế độ xem **Hộ gia đình**, đánh dấu một hộ sẽ chọn tất cả thành viên trong hộ đó
   - Trong chế độ xem **Bảng** (chuyển bằng nút **Xem dưới dạng**), bạn có thể chọn từng người
   - Hoặc dùng ô đánh dấu phía trên danh sách để chọn tất cả người đang hiển thị
4. Khi đã chọn ít nhất một người, thanh phía trên danh sách sẽ hiển thị số người được chọn, cùng với nút **Bỏ chọn** và nút **Hành động**

:::tip
Nếu bạn cần cập nhật một nhóm lớn người theo tiêu chí cụ thể, hãy dùng tính năng [Tìm kiếm AI](./ai-search.md) hoặc bộ lọc để thu hẹp danh sách trước, sau đó chọn tất cả người phù hợp.
:::

## Các hành động hàng loạt có sẵn

Menu **Hành động** cung cấp một số tùy chọn:

### Cập nhật trạng thái thành viên

Cập nhật trạng thái thành viên cho tất cả người đã chọn:

1. Nhấp **Hành động** → **Đặt trạng thái thành viên**
2. Chọn trạng thái mới:
   - **Khách viếng thăm** -- Người đến lần đầu hoặc thỉnh thoảng tham dự
   - **Khách** -- Khách, chẳng hạn như các gia đình đăng ký tại máy check-in
   - **Người tham dự thường xuyên** -- Người tham dự thường xuyên nhưng không phải thành viên
   - **Thành viên** -- Thành viên chính thức của hội thánh
   - **Nhân viên** -- Nhân viên của hội thánh
   - **Không còn hoạt động** -- Những người không còn tham dự
   - **Đã qua đời** -- Những người đã qua đời
3. Chọn chế độ cập nhật:
   - **Ghi đè tất cả** -- Thay thế trạng thái hiện tại của tất cả người đã chọn
   - **Chỉ cập nhật chỗ trống** -- Chỉ đặt trạng thái cho những người chưa có trạng thái
4. Nhấp **Cập nhật**

### Cập nhật tình trạng hôn nhân

Cập nhật tình trạng hôn nhân hàng loạt:

1. Nhấp **Hành động** → **Đặt tình trạng hôn nhân**
2. Chọn trạng thái mới:
   - **Không rõ**
   - **Độc thân**
   - **Đã kết hôn**
   - **Ly hôn**
   - **Góa**
3. Chọn ghi đè giá trị hiện có hoặc chỉ cập nhật các trường còn trống
4. Nhấp **Cập nhật**

### Cập nhật giới tính

Cập nhật thông tin giới tính cho nhiều người:

1. Nhấp **Hành động** → **Đặt giới tính**
2. Chọn giá trị:
   - **Không xác định**
   - **Nam**
   - **Nữ**
3. Chọn chế độ cập nhật (ghi đè tất cả hoặc chỉ những mục trống)
4. Nhấp **Cập nhật**

### Cập nhật tùy chọn không nhận thông tin

Kiểm soát việc người dùng có chọn không nhận thông tin liên lạc hay không:

1. Nhấp **Hành động** → **Đặt tùy chọn không nhận thông tin trong danh bạ**
2. Chọn:
   - **Không** -- Cho phép liên lạc (bỏ tùy chọn không nhận thông tin)
   - **Có** -- Chặn liên lạc (đặt tùy chọn không nhận thông tin)
3. Chọn chế độ cập nhật
4. Nhấp **Cập nhật**

:::warning
Hãy cẩn thận khi thay đổi tùy chọn không nhận thông tin. Những người đã chủ động chọn không nhận thông tin không nên nhận liên lạc trừ khi họ đã đồng ý lại.
:::

### Đặt trường tùy chỉnh

Đặt giá trị Có/Không cho [trường tùy chỉnh](../settings/custom-fields.md) cho tất cả người đã chọn cùng lúc:

1. Nhấp **Hành động** → **Đặt trường tùy chỉnh**.
2. Chọn trường tùy chỉnh Có/Không mà bạn muốn đặt.
3. Chọn giá trị (**Có** hoặc **Không**) để áp dụng.
4. Nhấp **Cập nhật**.

:::info
Chỉ các trường tùy chỉnh Có/Không mới có sẵn cho thao tác hàng loạt này. Để đặt các loại trường khác, hãy chỉnh sửa từng người riêng lẻ.
:::

### Thêm vào nhóm

Thêm tất cả người đã chọn vào một hoặc nhiều nhóm:

1. Nhấp **Hành động** → **Thêm vào nhóm**
2. Tìm và chọn (các) nhóm để thêm người vào
3. Bạn có thể chọn nhiều nhóm để thêm người vào tất cả các nhóm đó
4. Nhấp **Thêm vào nhóm**

Mỗi người sẽ được thêm làm thành viên thông thường của (các) nhóm đã chọn. Sau đó, nếu cần, bạn có thể nâng người nào đó thành trưởng nhóm từ trang [Thành viên nhóm](../groups/group-members.md).

### Xóa khỏi nhóm

Xóa tất cả người đã chọn khỏi một hoặc nhiều nhóm:

1. Nhấp **Hành động** → **Xóa khỏi nhóm**
2. Tìm và chọn (các) nhóm để xóa người khỏi
3. Bạn có thể chọn nhiều nhóm
4. Nhấp **Xóa khỏi nhóm**

:::info
Thao tác này chỉ xóa người khỏi các nhóm được chỉ định. Nó không xóa hồ sơ của họ.
:::

### Xóa người

Xóa vĩnh viễn những người đã chọn khỏi cơ sở dữ liệu hội thánh của bạn:

1. Nhấp **Hành động** → **Xóa**
2. Hộp thoại **Xóa người đã chọn** sẽ yêu cầu bạn xác nhận số người sẽ bị xóa
3. Nhấp **Xóa**

:::danger
Việc xóa người là vĩnh viễn và không thể hoàn tác. Thao tác này sẽ xóa toàn bộ dữ liệu của họ, bao gồm:
- Thông tin cá nhân
- Tư cách thành viên nhóm
- Hồ sơ điểm danh
- Lịch sử quyên góp
- Các biểu mẫu đã gửi

Chỉ sử dụng thao tác này khi bạn hoàn toàn chắc chắn muốn xóa những người này khỏi hệ thống.
:::

## Kết quả chỉnh sửa hàng loạt

Sau khi hoàn tất một thao tác hàng loạt, bạn sẽ thấy phần tóm tắt gồm:

- **Tổng số đã chọn** -- Số người được đưa vào thao tác
- **Cập nhật thành công** -- Số hồ sơ đã được thay đổi
- **Thất bại** -- Các hồ sơ không thể cập nhật (nếu có)
- **Không thay đổi** -- Các hồ sơ không cần thay đổi (ví dụ, khi dùng chế độ "chỉ cập nhật chỗ trống")

Nếu có cập nhật thất bại, bạn sẽ thấy thông tin lỗi giải thích nguyên nhân.

## Các thực hành tốt nhất

- **Bắt đầu với số lượng nhỏ** -- Thử thao tác hàng loạt trên một vài hồ sơ trước để đảm bảo bạn đang thực hiện đúng thay đổi
- **Dùng bộ lọc** -- Thu hẹp danh sách bằng bộ lọc hoặc tìm kiếm AI trước khi chọn người, để đảm bảo chỉ cập nhật đúng những người cần thiết
- **Kiểm tra lại lựa chọn** -- Xem lại danh sách người đã chọn trước khi áp dụng thay đổi hàng loạt
- **Dùng chế độ "chỉ cập nhật chỗ trống"** -- Khi bạn muốn điền dữ liệu còn thiếu mà không ghi đè thông tin hiện có
- **Ghi chú các thay đổi lớn** -- Lưu lại ghi chú về các cập nhật hàng loạt để có thể tham khảo sau này
- **Phối hợp với nhóm** -- Thông báo cho các quản trị viên khác khi bạn thực hiện thay đổi hàng loạt lớn

## Các trường hợp sử dụng phổ biến

### Cập nhật thành viên mới

Sau một lớp học thành viên, hãy cập nhật tất cả người tham dự thành trạng thái Thành viên:

1. Tìm những người đã tham dự lớp học
2. Chọn tất cả
3. Dùng **Hành động** → **Đặt trạng thái thành viên** → **Thành viên**

### Sắp xếp nhóm nhỏ

Thêm nhiều người vào một nhóm nhỏ mới:

1. Tìm những người bạn muốn đưa vào nhóm
2. Chọn họ
3. Dùng **Hành động** → **Thêm vào nhóm** và chọn nhóm nhỏ

### Dọn dẹp dữ liệu

Điền tình trạng hôn nhân còn thiếu cho các cặp vợ chồng:

1. Lọc những người đã kết hôn (dựa trên thông tin hộ gia đình)
2. Chọn những người có tình trạng hôn nhân còn trống
3. Dùng **Hành động** → **Đặt tình trạng hôn nhân** → **Đã kết hôn** → **Chỉ cập nhật chỗ trống**

## Bài viết liên quan

- [Tìm kiếm người](./searching-people.md) -- Tìm người để chỉnh sửa
- [Tìm kiếm AI](./ai-search.md) -- Dùng ngôn ngữ tự nhiên để tìm nhóm người cụ thể
- [Thành viên nhóm](../groups/group-members.md) -- Quản lý tư cách thành viên nhóm
- [Xuất dữ liệu](./exporting-data.md) -- Xuất dữ liệu người trước khi thực hiện thay đổi hàng loạt
