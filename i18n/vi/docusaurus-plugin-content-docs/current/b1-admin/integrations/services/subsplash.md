---
title: "Subsplash"
---

# Subsplash

<div class="article-intro">

Nếu bạn dùng Subsplash cho ứng dụng nhà thờ, quyên góp hoặc biểu mẫu, nhưng muốn B1 là hệ thống chính để lưu thông tin về người và các khoản quyên góp, thì ứng dụng Zapier của Subsplash có thể chuyển quyên góp, hồ sơ người mới và phản hồi biểu mẫu sang B1 theo thời gian thực. Lưu ý rằng ứng dụng Zapier của Subsplash hiện chỉ hỗ trợ **trình kích hoạt** — kết nối chỉ đi một chiều (Subsplash → B1).

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Một tài khoản Subsplash thuộc gói có quyền truy cập **API + Zapier** (hãy hỏi Quản lý Thành công Khách hàng của Subsplash, vì tính năng này phụ thuộc vào cấp gói)
- Một tài khoản [Zapier](https://zapier.com)
- Một người dùng B1Admin có quyền **Edit Settings**

</div>

## Những gì bạn có thể kết nối

Tất cả các trình kích hoạt dưới đây thuộc về Subsplash. Các hành động thuộc về B1.

| Trình kích hoạt Subsplash | Hành động B1 |
|---|---|
| New Donation | Find Person → Add Donation (Create Person nếu chưa có) |
| New Pledge | Add Donation (với `notes` = "Pledge: …") |
| New Person Created | Create Person |
| Person Updated Profile | (không có hành động B1 trực tiếp — ghi vào Google Sheet để xem xét thủ công) |
| New Form Response | Create Person + (tùy chọn) Add Group Member dựa trên biểu mẫu |

Hiện tại, Subsplash → B1 là chiều duy nhất mà ứng dụng Subsplash hỗ trợ.

## Thiết lập

### 1. Tạo khóa API B1

Trong B1Admin: **Settings → Developer → API Keys → New API Key**. Các phạm vi (scopes):

- `people:read` — để tìm người quyên góp theo email
- `people:write` — để tạo người đó nếu chưa tồn tại
- `donations:write` — để ghi nhận khoản quyên góp
- (Không cần `settings:write` — trong trường hợp này, Subsplash chứ không phải B1 là bên quản lý trình kích hoạt.)

### 2. Kết nối Subsplash với Zapier

Làm theo [hướng dẫn tích hợp Zapier của Subsplash](https://support.subsplash.com/en/articles/9825926-zapier-integration). Họ sẽ cấp một mã thông báo API từ bên trong Subsplash Dashboard, và Zapier dùng mã này để xác thực phía trình kích hoạt.

### 3. Xây dựng Zap "ghi nhận quyên góp"

1. **Trình kích hoạt** — Subsplash: New Donation
2. **Hành động** — B1.church: Find Person (theo email)
3. **Bộ lọc / Đường dẫn** — phân nhánh theo "đã tìm thấy người":
   - **Đã tìm thấy:** B1.church: Add Donation. Ánh xạ số tiền, ngày, quỹ, phương thức = "Online", và notes = mã giao dịch của Subsplash.
   - **Không tìm thấy:** B1.church: Create Person → B1.church: Add Donation (dùng mã của người vừa được tạo).

Bật Zap. Các khoản quyên góp Subsplash mới sau đó sẽ xuất hiện trong **B1Admin → Donations** trong vòng vài giây.

## Các công thức thường dùng

### Gửi lời cảm ơn khi nhận khoản quyên góp đầu tiên

- **Trình kích hoạt** — Subsplash: New Donation
- **Hành động** — Filter by Zapier: chỉ tiếp tục nếu đây là khoản quyên góp đầu tiên của người đó (dùng *Lookup Table* trên Donor Email so với một Google Sheet chứa danh sách những người đã quyên góp trước đó, hoặc dùng bước *Paths* của Zapier dựa trên ngày tạo hồ sơ người quyên góp)
- **Hành động** — Mailchimp / SMTP / SendGrid: gửi thư cảm ơn cho khoản quyên góp đầu tiên
- **Hành động** — B1.church: Add Donation (như thường lệ)

### Tách quyên góp theo cam kết khỏi luồng quyên góp thường xuyên

- **Trình kích hoạt** — Subsplash: New Pledge
- **Hành động** — B1.church: Add Donation với `notes = "Pledge — Subsplash"` và một quỹ tên là `Pledges` (tách biệt với quỹ hoạt động), để bạn có thể báo cáo riêng về các cam kết trong **B1Admin → Donations → Summary**.

### Đồng bộ người dùng ứng dụng mới thành người trong B1

- **Trình kích hoạt** — Subsplash: New Person Created
- **Hành động** — B1.church: Create Person, điền tên, email, số điện thoại. Gắn thẻ trong B1 bằng cách thêm người mới vào một nhóm như "Subsplash App Users".

## Giới hạn và lưu ý

- **Ứng dụng Zapier của Subsplash chỉ có trình kích hoạt.** Nếu bạn muốn các thay đổi phía B1 (ví dụ: một người mới trong B1 cũng được đưa vào Subsplash), bạn cần xây dựng cầu nối đó từ các trình kích hoạt trong ứng dụng Zapier của B1, gọi REST API của Subsplash qua hành động tùy chỉnh *Webhooks by Zapier — POST*. Đây là một tích hợp tùy chỉnh, không phải một công thức có sẵn.
- **Quyền truy cập API phụ thuộc vào gói.** Nếu kết nối Zapier báo lỗi `403 Forbidden`, gói Subsplash của bạn có thể không bao gồm quyền truy cập API — hãy liên hệ Quản lý Thành công Khách hàng của bạn.
- **Ánh xạ quỹ thực hiện thủ công.** Subsplash truyền tên chiến dịch hoặc danh mục, trong khi B1 cần mã quỹ dạng số. Bạn có thể mã hóa cứng quỹ trong Zap hoặc duy trì một *Lookup Table* của Zapier để ánh xạ các chiến dịch Subsplash sang quỹ B1.

## Khắc phục sự cố

- **Không có trình kích hoạt nào chạy sau khi có khoản quyên góp** — kiểm tra trong bảng điều khiển Zapier của Subsplash xem kết nối vẫn hiển thị *Connected* hay không. Nếu mã thông báo API đã được thay đổi phía Subsplash, Zap sẽ ngừng hoạt động mà không báo lỗi; hãy kết nối lại.
- **Hành động B1 *Add Donation* báo lỗi 422** — thường là do thiếu hoặc không nhận diện được `fundId`. Hãy liệt kê các quỹ của bạn qua **B1Admin → Donations → Funds** và sao chép chính xác mã vào bước Zap.
- **Khoản quyên góp đầu tiên kích hoạt hai lần** — Subsplash đôi khi gửi lại một trình kích hoạt nếu Zapier không nhận được xác nhận. Thêm một *Filter by Zapier* theo mã khoản quyên góp (Subsplash gửi kèm trong dữ liệu) để loại bỏ các bản trùng lặp.

## Xem thêm

- [Donorbox](./donorbox) — cùng dạng công thức, nhưng dùng nền tảng quyên góp khác
- [Zapier (tổng quan)](../zapier) — phần B1 của mọi công thức Zapier
- [Hướng dẫn tích hợp Zapier của Subsplash](https://support.subsplash.com/en/articles/9825926-zapier-integration) (tài liệu của Subsplash)
