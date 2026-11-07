---
title: "Donorbox"
---

# Donorbox

<div class="article-intro">

Nếu nhà thờ của bạn nhận quyên góp qua Donorbox nhưng theo dõi người và báo cáo đóng góp trong B1, bạn có thể dùng các trigger tức thời của Zapier cho Donorbox để tự động tạo bản ghi quyên góp tương ứng bên trong B1, và tạo người quyên góp thành một người trong B1 nếu họ chưa có. Không cần đối chiếu thủ công và không cần xuất dữ liệu hằng tháng.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Một tài khoản [Donorbox](https://donorbox.org) với ít nhất một chiến dịch
- Một tài khoản [Zapier](https://zapier.com)
- Một người dùng B1Admin có quyền **Edit Settings**

</div>

## Những gì bạn có thể kết nối

| Hướng | Trigger Donorbox | Hành động B1 |
|---|---|---|
| Donorbox → B1 | New or Updated Donation (tức thời) | Find Person → Add Donation |
| Donorbox → B1 | New or Updated Donor | Create Person |
| Donorbox → B1 | New or Updated Plan (định kỳ) | Find Person → Add Donation (dùng Plan id làm ghi chú) |

Donorbox công bố các trigger của họ dưới dạng **tức thời**. Chúng kích hoạt trong vài giây sau một khoản quyên góp thực tế, không có độ trễ do truy vấn định kỳ.

## Thiết lập

### 1. Tạo khóa API B1

Trong B1Admin: **Settings → Developer → API Keys → New API Key**. Phạm vi quyền:

- `people:read` để tra cứu người quyên góp qua email
- `people:write` để tạo họ nếu họ là người mới
- `donations:write` để ghi nhận khoản quyên góp

Các trigger theo hướng này thuộc về Donorbox chứ không phải B1, nên bạn không cần `settings:write` ở đây.

### 2. Tạo Zap "ghi nhận khoản quyên góp"

1. **Trigger**: Donorbox: New Donation. Kết nối bằng khóa API của Donorbox (trong Donorbox: *Account → Profile → API Settings*).
2. **Hành động**: B1.church: Find Person. Ánh xạ email của người quyên góp từ trigger vào trường tìm kiếm *Email*.
3. **Hành động**: Filter by Zapier (tùy chọn). Chỉ tiếp tục nếu không tìm thấy người quyên góp, sau đó…
4. **Hành động**: B1.church: Create Person. Ánh xạ tên, họ và email để người quyên góp được thêm như một thành viên, chứ không chỉ là một bản ghi quà tặng.
5. **Hành động**: B1.church: Add Donation. Ánh xạ:
   - Amount → `data.amount`
   - Donation Date → ngày quyên góp từ trigger
   - Fund → chọn quỹ B1 tương ứng với chiến dịch Donorbox (Zapier cho phép chuyển quỹ dựa trên bước lọc hoặc bước định dạng)
   - Method → "Online"
   - Notes → mã giao dịch Donorbox (hữu ích khi đối chiếu)

Bật Zap. Khoản quyên góp trực tuyến tiếp theo qua Donorbox sẽ tự động xuất hiện trong **B1Admin → Donations**.

## Các công thức thường dùng

### Một Zap cho mỗi quỹ

Nếu bạn chạy nhiều chiến dịch Donorbox ánh xạ đến các quỹ B1 riêng biệt, cách bố trí gọn nhất là một Zap cho mỗi chiến dịch, với bộ lọc *campaign* của Donorbox ở đầu. Như vậy, việc ánh xạ quỹ được cố định sẵn và bạn bỏ qua bước tra cứu.

### Xử lý quyên góp được cập nhật như điều chỉnh

Sự kiện *New or Updated Donation* của Donorbox cũng kích hoạt khi chỉnh sửa. Dùng bước *Path* của Zapier trên `event_type` để rẽ nhánh: "new" → Add Donation, "updated" → Find Donation + Update. Lưu ý: ứng dụng Zapier của B1 hiện chưa có hành động Update Donation, nên tạm thời hãy ghi các sự kiện "updated" vào một kênh Slack để xem xét thủ công.

### Đồng bộ thay đổi gói định kỳ vào kênh Slack

- **Trigger**: Donorbox: New or Updated Plan
- **Hành động**: Slack: Send Message tới `#donations` (ví dụ: "Gói đã thay đổi, khoản quyên góp hằng tháng của Sarah giờ là $200")

## Giới hạn và lưu ý

- **Khớp người quyên góp theo email.** Donorbox không chia sẻ mã person của B1. Khóa nối bền vững duy nhất là email. Những người quyên góp bằng email khác sẽ tạo ra một person mới trong B1, nên việc đối chiếu hằng tháng của bạn nên tìm các trường hợp này.
- **Hoàn tiền không được hiển thị riêng.** Donorbox phát ra cập nhật trạng thái trên cùng khoản quyên góp. Ứng dụng Zapier của B1 hiện không có hành động *Update Donation*, nên cách an toàn hiện nay là ghi nhận sự kiện hoàn tiền ở bên ngoài và điều chỉnh khoản quyên góp thủ công.
- **Kiểm thử trong sandbox của Donorbox trước** để tránh tạo khoản quyên góp giả trong B1 sản xuất. Donorbox cung cấp thông tin xác thực chế độ thử nghiệm tách biệt với chế độ thực.

## Khắc phục sự cố

- **Cảnh báo "Person not found" mỗi lần chạy**: điều đó không sao nếu bạn đã sắp xếp các bước sao cho *Create Person* chạy trong nhánh not-found. Nếu bước Create Person cũng không bao giờ chạy, hãy kiểm tra lại khóa API có quyền `people:write` hay không.
- **Số tiền quyên góp lớn hơn hoặc nhỏ hơn 100 lần**: Donorbox gửi số tiền theo xu trong một số biến thể payload và theo đô la trong các biến thể khác. Dùng bước *Formatter by Zapier — Numbers* để chia cho 100 nếu cần.
- **Khoản quyên góp trùng lặp từ một lần tặng**: Donorbox kích hoạt cả *New Donation* và *Updated Donation*. Hãy lọc theo `event_type = "donation.succeeded"` hoặc tạo hai Zap với bộ lọc không chồng chéo.

## Xem thêm

- [Zapier (tổng quan)](../zapier): phía B1 của mọi công thức Zapier
- [Subsplash](./subsplash): nền tảng quyên góp khác có ứng dụng Zapier
- [Mailchimp](./mailchimp): nối "quà tặng mới" với một thẻ email
