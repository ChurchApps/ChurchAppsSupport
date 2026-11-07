---
title: "Xem xét yêu cầu xóa tài khoản"
description: "Duyệt hoặc từ chối yêu cầu xóa tài khoản của thành viên trong B1 Admin, chuyển qua Nhóm duyệt danh bạ và đáp ứng thời hạn 30 ngày theo GDPR."
---

# Xem xét yêu cầu xóa tài khoản

<div class="article-intro">

Khi một nhà thờ đã cấu hình Nhóm phê duyệt danh bạ (Directory Approval Group), việc xóa tài khoản không còn diễn ra ngay lập tức nữa — yêu cầu của thành viên sẽ trở thành một tác vụ để nhóm phê duyệt của bạn xem xét trước khi bất kỳ dữ liệu nào bị xóa. Trang này giải thích cách gửi yêu cầu, cách phê duyệt hoặc từ chối yêu cầu, và điều gì xảy ra trong từng trường hợp.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Phải cấu hình **Nhóm phê duyệt danh bạ** trong **Mobile &rarr; Cổng thông tin thành viên**. Nếu chưa có nhóm này, việc nhấn **Delete my account** trên trang Hồ sơ vẫn sẽ xóa tài khoản ngay lập tức, không có bước xem xét. Xem [Cài đặt ứng dụng di động](../settings/mobile-app.md).
- Để phê duyệt hoặc từ chối yêu cầu, bạn cần quyền **People &gt; Edit**.

</div>

## Cách thành viên gửi yêu cầu xóa

Yêu cầu xóa tài khoản được gửi từ trang **My Profile** — cùng trang tài khoản dùng chung được đề cập trong [Quản lý hồ sơ của bạn](./managing-profile.md) — trong mục **Account Deletion**. Khi đã cấu hình nhóm phê duyệt, việc xác nhận yêu cầu sẽ không xóa bất cứ thứ gì ngay. Thay vào đó, hệ thống sẽ:

1. Tạo một tác vụ đang mở có tiêu đề **"Account deletion request"**, được giao cho Nhóm phê duyệt danh bạ, nằm dưới **Serving &rarr; My Work**.
2. Vô hiệu hóa nút **Delete my account** đối với người đó và hiển thị thông báo rằng yêu cầu đang chờ xem xét.

Nếu gửi thêm một yêu cầu khi đã có yêu cầu đang mở, hệ thống sẽ chỉ mở lại chính tác vụ đó — mỗi người chỉ có thể có một yêu cầu xóa đang chờ xử lý tại một thời điểm.

## Xem xét yêu cầu

1. Vào **Serving &rarr; My Work** (hoặc **Assigned to My Groups** trên bảng điều khiển của bạn — cùng vị trí mà các [yêu cầu thay đổi hồ sơ](./approving-profile-changes.md) xuất hiện).
2. Mở tác vụ có tiêu đề **"Account deletion request from *Name*"**.
3. Bạn sẽ thấy hai thao tác: **Approve deletion** và **Decline**.

### Phê duyệt

Xác nhận thông báo **"Permanently anonymize this person's record and remove their login? This cannot be undone."** Thao tác này sẽ thay thế thông tin cá nhân của người đó bằng các giá trị chung chung (cùng cách ẩn danh được dùng trong thao tác **Data Management &gt; Anonymize** trên hồ sơ một người — xem [Bảo mật dữ liệu](../settings/data-security.md)) và xóa thông tin đăng nhập của họ. Tác vụ sẽ tự động đóng, và thành viên sẽ nhận được thông báo rằng yêu cầu đã được phê duyệt.

### Từ chối

Khi từ chối, bạn bắt buộc phải nêu lý do, vì GDPR chỉ cho phép từ chối yêu cầu xóa dữ liệu trong các trường hợp ngoại lệ theo luật định:

- **Lưu giữ theo quy định pháp luật** (hồ sơ quyên góp, thuế hoặc việc làm)
- **Cần thiết cho một yêu cầu pháp lý**
- **Khác** — giải thích trong ô văn bản (tối thiểu 10 ký tự)

Thành viên sẽ được thông báo về quyết định cùng lý do bạn đã nêu, và họ có thể gửi lại yêu cầu hoặc khiếu nại lên cơ quan giám sát có thẩm quyền nếu không đồng ý.

:::info
Các nhà thờ có 30 ngày để phản hồi yêu cầu xóa dữ liệu. Tác vụ có hạn trong 28 ngày, và nhóm phê duyệt sẽ nhận được nhắc nhở tự động nếu tác vụ vẫn còn mở sau 21 và 27 ngày.
:::

:::tip
Yêu cầu xóa và yêu cầu thay đổi hồ sơ dùng chung Nhóm phê duyệt danh bạ và cùng quy trình xem xét dựa trên Tác vụ — xem [Phê duyệt thay đổi hồ sơ](./approving-profile-changes.md) nếu bạn cũng cần xem xét các yêu cầu cập nhật danh bạ.
:::

## Bài viết liên quan

- [Quản lý hồ sơ của bạn](./managing-profile.md) — Nơi thành viên yêu cầu xóa tài khoản của chính họ
- [Phê duyệt thay đổi hồ sơ](./approving-profile-changes.md) — Quy trình xem xét tương tự cho các yêu cầu cập nhật danh bạ
- [Bảo mật dữ liệu](../settings/data-security.md) — Tuân thủ GDPR và ẩn danh do quản trị viên khởi tạo
- [Cài đặt ứng dụng di động](../settings/mobile-app.md) — Cấu hình Nhóm phê duyệt danh bạ
