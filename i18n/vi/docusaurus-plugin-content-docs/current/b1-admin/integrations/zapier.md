---
title: "Zapier"
---

# Zapier

<div class="article-intro">

Ứng dụng B1.church chính thức trên Zapier cho phép một Zap phản ứng với các sự kiện trong nhà thờ của bạn (người mới, quyên góp mới, thành viên nhóm mới, …) và ghi dữ liệu trở lại B1. Không cần lập trình, không cần hạ tầng. Bạn kết nối trong trình chỉnh sửa kéo-thả của Zapier, dán khóa API và bật Zap.

</div>

:::caution Đang chờ Zapier phê duyệt
Ứng dụng B1.church đã được xây dựng và hoạt động, nhưng vẫn đang chờ Zapier xem xét trước khi xuất hiện công khai trong thư mục ứng dụng của trình chỉnh sửa Zap. Cho đến khi được phê duyệt, chỉ những tài khoản được mời mới có thể sử dụng. Phần hướng dẫn bên dưới mô tả cách ứng dụng sẽ hoạt động sau khi được phê duyệt.
:::

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Một tài khoản [Zapier](https://zapier.com) (gói miễn phí đủ dùng cho một vài Zap)
- Một quản trị viên nhà thờ có quyền **Edit Settings** trong B1Admin (bạn sẽ tạo khóa API)
- Một ý tưởng về việc bạn muốn làm, ví dụ: "khi một người được thêm vào B1, thêm họ vào danh sách Mailchimp của tôi"

</div>

## Trigger và Action

| Loại | Nội dung | Sự kiện / endpoint của B1 |
|---|---|---|
| **Trigger** | New Person | `person.created` |
| **Trigger** | Updated Person | `person.updated` |
| **Trigger** | New Donation | `donation.created` |
| **Trigger** | New Group Member | `group.member.added` |
| **Trigger** | New Form Submission | `form.submission.created` |
| **Action** | Create Person | thêm một người mới |
| **Action** | Add Donation | ghi nhận một khoản quyên góp |
| **Action** | Add Group Member | thêm một người vào nhóm |
| **Action** | Find Person | tìm người theo id, email hoặc tên; làm tác vụ thất bại nếu không có ai khớp |

Bạn có thể kết hợp tự do các mục này với hơn 7.000 ứng dụng được Zapier hỗ trợ.

## Thiết lập

### 1. Tạo khóa API của B1

1. Trong B1Admin, vào **Settings → Developer → API Keys**.
2. Nhấn **New API Key**, đặt tên như "Zapier", và chọn các scope mà Zap cần.
3. **Quan trọng:** Trigger của Zapier đăng ký một webhook thay bạn khi Zap được bật, và điều này yêu cầu scope **`settings:write`**. Luôn bao gồm `settings:write` nếu bất kỳ Zap nào của bạn dùng trigger của B1.
4. Cấp thêm các scope mà action cần. Ví dụ, action "Add Donation" cần `donations:write`, còn "Create Person" cần `people:write`.
5. Lưu lại. Khóa `cak_…` đầy đủ chỉ được hiển thị **một lần**. Hãy sao chép ngay.

### 2. Kết nối Zapier với B1

1. Trong Zapier, tạo một Zap mới.
2. Khi lần đầu chọn một trigger hoặc action của B1, Zapier sẽ yêu cầu bạn **Sign in to B1.church**.
3. Dán khóa API từ bước 1 và nhấn **Yes, Continue**. Zapier sẽ xác thực khóa với nhà thờ của bạn.

Kết nối được lưu trong Zapier và được mọi Zap trong tài khoản của bạn sử dụng lại.

### 3. Xây dựng Zap

Chọn một trigger, sau đó thêm một hoặc nhiều bước action. Các ví dụ bên dưới.

## Các công thức thường dùng

### Thêm người mới của B1 vào Mailchimp

- **Trigger** — B1: New Person
- **Action** — Mailchimp: Add/Update Subscriber. Ánh xạ `name__first`, `name__last`, `contactInfo__email` của B1 vào các trường First Name / Last Name / Email của Mailchimp.

### Đăng quyên góp lên kênh Slack với thẻ thông tin phong phú hơn trình kết nối có sẵn

- **Trigger** — B1: New Donation
- **Action** — Slack: Send Channel Message. Tự thiết kế bố cục bất kỳ (nút bấm, tệp đính kèm, v.v.) mà [trình kết nối Slack](./slack-discord) có sẵn không làm được.

### Thêm thành viên nhóm mới vào Google Group

- **Trigger** — B1: New Group Member (lọc theo một `groupId` cụ thể)
- **Action** — Filter by Zapier: chỉ tiếp tục nếu nhóm B1 là nhóm bạn quan tâm
- **Action** — B1: Find Person (dùng `personId` từ trigger để lấy email)
- **Action** — Google Groups: Add Member

### Chuyển tiếp phản hồi biểu mẫu sang công cụ quản lý dự án

- **Trigger** — B1: New Form Submission
- **Action** — Notion / Linear / Asana / Trello: Create page / issue / task

## Trigger hoạt động như thế nào

Trigger là **REST hook**, không phải polling. Zapier không hỏi B1 mỗi 15 phút. Khi bạn bật Zap, Zapier yêu cầu B1 đăng ký một webhook trỏ đến một URL riêng của Zapier. Khi sự kiện xảy ra, B1 gửi POST dữ liệu đến Zapier và Zap của bạn bắt đầu chạy **trong vòng vài giây**. Khi bạn tắt Zap, Zapier yêu cầu B1 xóa webhook, nên không còn đăng ký mồ côi nào.

Điều này có nghĩa là trigger chỉ kích hoạt cho các sự kiện xảy ra **sau** khi Zap được bật. Không có việc phát lại dữ liệu cũ. Bật Zap không tái hiện các khoản quyên góp của ngày hôm qua.

## Giới hạn và lưu ý

- **Nhiều Zap dùng cùng một trigger** mỗi Zap sẽ đăng ký một webhook B1 riêng. Điều này không gây xung đột, nhưng bạn nên biết nếu thấy nhiều dòng `Zapier — donation.created` giống hệt nhau trong **Settings → Developer → Webhooks** và thắc mắc vì sao.
- **Dữ liệu thử nghiệm khi thiết lập Zap**: khi bạn xây dựng Zap, Zapier sẽ yêu cầu dữ liệu mẫu để ánh xạ các trường. Nó sẽ lấy sự kiện khớp gần nhất từ B1 nếu có. Nếu không, nó dùng dữ liệu mẫu tổng hợp từ định nghĩa ứng dụng.
- **Lỗi action xuất hiện dưới dạng lỗi Zap** trong lịch sử tác vụ của Zapier. Nguyên nhân thường gặp: khóa API thiếu scope phù hợp (ví dụ action "Add Donation" cần `donations:write`). Tạo lại khóa với scope đúng và kết nối lại trong Zapier.
- **Hạn mức lệnh gọi API ra ngoài**: mỗi lệnh gọi API B1 từ một action được tính vào hạn mức tác vụ Zapier của bạn, không tính vào bất kỳ thứ gì phía B1.

## Khắc phục sự cố

- **"Authentication failed"** khi kết nối: khóa API sai, đã bị thu hồi, hoặc thiếu các scope mà Zap cần. Tạo lại khóa trong B1Admin với ít nhất `settings:write` cùng các scope tài nguyên mà Zap sử dụng, sau đó cập nhật kết nối.
- **Trigger không bao giờ kích hoạt**: kiểm tra webhook đã thực sự được đăng ký chưa. Trong B1Admin, **Settings → Developer → Webhooks** phải hiển thị một dòng tên "Zapier — &lt;event&gt;". Nếu không có, có thể khóa API thiếu `settings:write` tại thời điểm bạn bật Zap. Sửa khóa, sau đó tắt rồi bật lại Zap.
- **Trigger kích hoạt hai lần**: đôi khi Zapier gửi lại sự kiện nếu xác nhận bị mất. Nếu bạn cần loại trừ trùng lặp nghiêm ngặt, hãy dùng bước "Filter by Zapier" trên một id duy nhất (ví dụ `id` của người đó).

## Xem thêm

- [Make](./make): cùng mô hình, nền tảng khác
- [Slack & Discord](./slack-discord): thông báo trò chuyện đơn giản hơn, không cần Zapier
- [Webhooks (tài liệu tham khảo cho nhà phát triển)](/docs/developer/api/webhooks)
