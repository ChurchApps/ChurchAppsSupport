---
title: "Google Sheets"
description: "Kết nối B1 Admin với Google Sheets qua tiện ích B1 Export để kéo dữ liệu Người, Dâng hiến, Nhóm và Điểm danh vào các tab bảng tính khi cần."
---

# Google Sheets

<div class="article-intro">

**B1 Export** là tiện ích bổ sung chính thức của Google Sheets dành cho B1.church. Tiện ích này thêm một thanh bên vào bất kỳ bảng tính nào, để xuất dữ liệu Người, Quyên góp, Nhóm hoặc Điểm danh từ hội thánh B1 của bạn vào các tab có tên riêng, theo yêu cầu, chỉ với một cú nhấp chuột. Tiện ích chạy hoàn toàn trong tài khoản Google của người dùng; ngoài các lệnh gọi API chỉ đọc mà mỗi lần xuất thực hiện, nó không tác động gì đến máy chủ của ChurchApps.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Một tài khoản Google có quyền chỉnh sửa bảng tính mà bạn muốn xuất dữ liệu vào
- Một quản trị viên hội thánh (hoặc người có quyền đọc dữ liệu bạn muốn xuất) có thể tạo khóa API B1
- Tiện ích B1 Export đã được cài đặt từ Google Workspace Marketplace

</div>

## Dữ liệu xuất ra

| Mục menu | Tab trong bảng tính | Dữ liệu |
|---|---|---|
| Export People | `B1 People` | ID, Tên hiển thị, Tên, Họ, Email, Trạng thái thành viên |
| Export Donations | `B1 Donations` | ID, Person ID, Ngày, Số tiền, Phương thức, Batch ID |
| Export Groups | `B1 Groups` | ID, Tên, Danh mục, Số thành viên |
| Export Attendance | `B1 Attendance` | ID, Person ID, Ngày tham dự, Service ID, Group ID |

Mỗi lần xuất sẽ **thay thế** nội dung của tab có tên tương ứng. Chạy lại một lần xuất sẽ cho bạn một bản chụp mới, chứ không thêm dòng vào cuối. Các tab khác trong bảng tính không bị ảnh hưởng.

## Thiết lập

### 1. Tạo khóa API B1 với đúng quyền

1. Trong B1Admin, vào **Settings → Developer → API Keys**.
2. Nhấp **New API Key**, đặt tên là "Sheets Export", rồi cấp quyền **read** cho những dữ liệu bạn định xuất:
   - `people:read` cho việc xuất People
   - `donations:read` cho Donations
   - `groups:read` cho Groups
   - `attendance:read` cho Attendance
3. Khóa chỉ dùng để xuất dữ liệu **không** cần `settings:write`. Quyền đó chỉ dành cho các kết nối đăng ký webhook (Zapier / Make). Hãy giữ khóa này ở mức quyền tối thiểu.
4. Lưu lại và sao chép khóa `cak_…`.

### 2. Cài đặt tiện ích

1. Mở bảng tính mà bạn muốn xuất dữ liệu vào.
2. Chọn **Extensions → Add-ons → Get add-ons**.
3. Tìm **B1 Export** và cài đặt. Google sẽ yêu cầu bạn cấp quyền truy cập vào bảng tính và quyền gửi yêu cầu HTTP ra bên ngoài (để tiện ích có thể gọi API B1).

Sau khi cài đặt, mục **B1 Export** sẽ xuất hiện trong menu **Extensions** của mọi bảng tính bạn mở bằng tài khoản Google này.

### 3. Kết nối khóa

1. Chọn **Extensions → B1 Export → Connect…** (hoặc **B1 Export → Connect…** trên thanh menu sau lần mở đầu tiên).
2. Dán khóa API vào thanh bên, giữ nguyên Base URL là `https://api.churchapps.org` (trừ khi bạn đang thử nghiệm trên môi trường staging), rồi nhấp **Save**.
3. Nhấp **Test Connection**. Dòng "Connection OK" màu xanh lá cho biết khóa hoạt động.

Khóa được lưu trong **thuộc tính riêng của người dùng** (`PropertiesService.getUserProperties()`). Khóa gắn với tài khoản Google của bạn, không bao giờ được ghi vào bảng tính và không hiển thị với những người khác có quyền chỉnh sửa bảng tính.

## Chạy một lần xuất

Bạn có thể làm theo một trong hai cách:

- **Từ menu**: chọn **Extensions → B1 Export → Export People** (hoặc Donations / Groups / Attendance)
- **Từ thanh bên**: mở thanh bên (Connect…) rồi nhấp nút tương ứng với loại dữ liệu

Một thông báo ngắn sẽ xác nhận khi xuất xong: "_N_ dòng đã được ghi vào 'B1 People'."

## Xây dựng báo cáo từ dữ liệu xuất

Các tab được xuất ra chỉ là dữ liệu Google Sheets thông thường. Bạn có thể tự xây dựng phân tích trên các tab này bằng cách tham chiếu đến chúng:

- Một **tab tổng hợp** với `=SUMIF('B1 Donations'!E:E, "card", 'B1 Donations'!D:D)` để cộng tổng các khoản quyên góp qua thẻ
- Một **chế độ xem đã lọc** chỉ gồm các thành viên với `=FILTER('B1 People'!A:F, 'B1 People'!F:F = "Member")`
- Một **biểu đồ** xu hướng điểm danh lấy dữ liệu từ `B1 Attendance`

Khi chạy lại lần xuất, tab dữ liệu sẽ được làm mới và các công thức của bạn sẽ tự động cập nhật.

## Lên lịch xuất định kỳ

Tiện ích mặc định chỉ chạy theo yêu cầu. Nếu muốn xuất dữ liệu hằng tuần hoặc hằng tháng, hãy dùng trình kích hoạt theo thời gian có sẵn của Apps Script:

1. Trong bảng tính, chọn **Extensions → Apps Script** (thao tác này mở mã script đi kèm tiện ích).
2. Nhấp biểu tượng **⏰ Triggers** ở thanh bên trái.
3. Chọn **Add Trigger** cho `exportPeople` (hoặc bất kỳ hàm xuất nào khác), rồi chọn *Time-driven*, *Week timer*, ví dụ *Every Monday 6am*.

Lần xuất sẽ chạy ngầm dưới tài khoản Google của bạn. Nếu khóa API bị thay đổi hoặc thu hồi, trình kích hoạt sẽ gửi email cho bạn vào lần chạy thất bại tiếp theo.

## Quyền truy cập và quyền riêng tư

- Tiện ích chỉ yêu cầu `spreadsheets.currentonly` (chỉ có thể truy cập bảng tính đang mở) và `script.external_request` (để `UrlFetchApp` gọi API B1). Tiện ích **không** xem được Drive, Gmail hay dữ liệu Google khác của bạn.
- Khóa API B1 được lưu riêng cho từng người dùng, nên những người khác có quyền chỉnh sửa cùng bảng tính không thể xem được khóa.
- Mọi lệnh gọi API B1 đều được thực hiện qua HTTPS với `Authorization: Bearer cak_…`.

## Xử lý sự cố

- **"No API key set"**: mở **Extensions → B1 Export → Connect…** và dán khóa vào.
- **"B1 rejected the API key (401)"**: khóa đã bị thu hồi hoặc nhập sai. Hãy tạo lại khóa và dán lại.
- **"This API key lacks permission for /giving/donations (403)"**: khóa không có quyền `donations:read`. Hãy cập nhật quyền của khóa trong B1Admin.
- **Bảng tính không làm mới** sau khi chạy: đảm bảo bạn đang xem đúng tên tab (`B1 People`, v.v.). Lần xuất sẽ tự tạo tab nếu tab chưa tồn tại.
- **"Quota exceeded"**: Apps Script giới hạn hạn ngạch hằng ngày cho mỗi người dùng đối với `UrlFetchApp` (thường là hàng nghìn lệnh gọi mỗi ngày). Một hội thánh lớn có nhiều bản ghi có thể cần chia nhỏ việc xuất qua nhiều ngày, hoặc dùng [Make](./make.md) / một tích hợp tùy chỉnh để đồng bộ khối lượng lớn.

## Tùy chỉnh tiện ích

Tiện ích là mã nguồn mở. Dự án Apps Script nằm trong kho `B1Integrations/GoogleSheetsAddon/`. Nếu bạn muốn thêm một cột chưa được xuất, một loại dữ liệu bổ sung hoặc một định dạng đầu ra khác, hãy mở một issue hoặc PR tại đó.

## Xem thêm

- [Zapier](./zapier.md): để đồng bộ theo thời gian thực thay vì xuất theo yêu cầu
- [Make](./make.md): để đồng bộ với các bước chuyển đổi phức tạp hơn
- [API Keys (developer reference)](/docs/developer/api/api-keys)
