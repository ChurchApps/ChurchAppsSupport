---
title: "Điểm cuối Quyên góp"
---

# Điểm cuối Quyên góp

<div class="article-intro">

Mô-đun Quyên góp quản lý các khoản quyên góp, quỹ, xử lý thanh toán, đăng ký định kỳ và các hoạt động tài chính liên quan. Mô-đun hỗ trợ nhiều cổng thanh toán (Stripe, PayPal), xử lý quyên góp một lần và định kỳ, theo dõi các đợt quyên góp, và cung cấp xử lý webhook cho các sự kiện thanh toán không đồng bộ.

</div>

**Đường dẫn gốc:** `/giving`

## Quyên góp

Đường dẫn gốc: `/giving/donations`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View hoặc personId của chính mình | Liệt kê tất cả quyên góp. Lọc theo `?batchId=` hoặc `?personId=`. Với `?personId=`, các khoản tặng cho quỹ không được khấu trừ thuế sẽ bị loại trừ (như trên báo cáo quyên góp) trừ khi người gọi có quyền Donations.View thêm `&includeNonDeductible=1`, điều mà trang hồ sơ thành viên của B1Admin thực hiện |
| GET | `/:id` | JWT | Donations.View | Lấy một khoản quyên góp theo ID |
| GET | `/my` | JWT | — | Lấy các khoản quyên góp của người dùng hiện tại |
| GET | `/my/summary?year=` | JWT | — | Tổng số tiền quyên góp của người dùng hiện tại trong một năm (mặc định là năm nay): `{ year, total, count, currency, isConverted }`, với tổng số được quy đổi sang tiền tệ của nhà thờ. Hỗ trợ phần xem trước quyên góp trên trang chủ thành viên |
| GET | `/?startDate=&endDate=` | JWT | Donations.View | Các khoản quyên góp có ngày nằm trong khoảng (bao gồm cả hai đầu). Cả hai ngày đều bắt buộc, theo định dạng `YYYY-MM-DD`, nếu không sẽ trả về `400`. Các trang báo cáo quyên góp của B1Admin yêu cầu một năm dương lịch theo cách này thay vì toàn bộ lịch sử của nhà thờ |
| GET | `/summary` | JWT | Donations.ViewSummary | Lấy tóm tắt quyên góp. Lọc theo `?startDate=&endDate=&type=`. Dùng `type=person` để xem chi tiết theo từng người |
| GET | `/testEmail` | Public | — | Gửi email thử nghiệm (dùng khi phát triển hoặc gỡ lỗi) |
| POST | `/` | JWT | Donations.Edit hoặc Donations.Enter | Tạo hoặc cập nhật quyên góp (theo đợt). Chỉ với Donations.Enter, cả đợt đích lẫn đợt hiện tại của khoản quyên góp (khi cập nhật) đều phải đang mở, và không thể thay đổi các khoản tặng qua cổng thanh toán (những khoản có `transactionId`); nếu không sẽ trả về `403 { "error": "This batch is closed." }` |
| DELETE | `/:id` | JWT | Donations.Edit hoặc Donations.Enter | Xóa một khoản quyên góp. Chỉ với Donations.Enter: khoản quyên góp phải nằm trong đợt đang mở và không phải là khoản tặng qua cổng thanh toán, nếu không sẽ trả về `403` |

### Ví dụ: Liệt kê quyên góp theo đợt

```
GET /giving/donations?batchId=abc-123
Authorization: Bearer <token>
```

```json
[
  {
    "id": "don-456",
    "batchId": "abc-123",
    "personId": "per-789",
    "donationDate": "2025-03-15T00:00:00.000Z",
    "amount": 100.00,
    "method": "card"
  }
]
```

### Ví dụ: Lấy tóm tắt quyên góp

```
GET /giving/donations/summary?startDate=2025-01-01&endDate=2025-12-31
Authorization: Bearer <token>
```

```json
[
  {
    "week": "2025-01-06",
    "fund": "General Fund",
    "totalAmount": 2500.00,
    "count": 15
  }
]
```

## Đợt quyên góp

Đường dẫn gốc: `/giving/donationbatches`

Mở rộng `GenericCrudController` với các route CRUD: `getById`, `getAll`, `post`, `delete`. Thao tác xóa cũng xóa tất cả quyên góp trong đợt.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary hoặc Donations.Enter | Liệt kê tất cả đợt quyên góp |
| GET | `/:id` | JWT | Donations.ViewSummary hoặc Donations.Enter | Lấy một đợt quyên góp theo ID |
| POST | `/` | JWT | Donations.Edit hoặc Donations.Enter | Tạo hoặc cập nhật đợt quyên góp. Chỉ với Donations.Enter: cập nhật một đợt hiện có yêu cầu đợt đó phải đang mở, nếu không sẽ trả về `403 { "error": "This batch is closed." }`. `status` bị bỏ qua ở đây, nên việc lưu đợt không thể mở lại đợt đã đóng |
| POST | `/:id/close` | JWT | Donations.Edit | Đóng một đợt: đặt `status` thành `closed`, `closedDate` thành thời điểm hiện tại, và `closedBy` thành ID người dùng của người gọi. Trả về đợt |
| POST | `/:id/reopen` | JWT | Donations.Edit | Mở lại một đợt: đặt `status` thành `open` và xóa `closedDate` và `closedBy`. Trả về đợt |
| DELETE | `/:id` | JWT | Donations.Edit | Xóa một đợt và tất cả quyên góp trong đợt |

Mỗi đợt có `status` (`open` hoặc `closed`; đợt mới và đợt đã có sẵn đều là `open`), `closedDate` và `closedBy`. Donations.Edit có thể thay đổi quyên góp trong bất kỳ đợt nào; Donations.Enter (hiển thị là **Enter Donations** trong trình chỉnh sửa vai trò) chỉ có thể thêm, thay đổi hoặc xóa quyên góp và phân bổ quỹ khi đợt của chúng đang mở.

## Quyên góp (công khai)

Đường dẫn gốc: `/giving/donate`

Xử lý luồng quyên góp công khai, bao gồm thu tiền, đăng ký định kỳ, webhook và tính phí. Không có route CRUD cơ bản nào được bật; tất cả endpoint đều là tùy chỉnh.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Public | — | Lấy các cổng thanh toán khả dụng của một nhà thờ (chỉ khóa công khai) |
| POST | `/client-token` | JWT | — | Tạo client token để khởi tạo cổng thanh toán |
| POST | `/create-order` | JWT | — | Tạo đơn thanh toán (kiểu thanh toán PayPal) |
| POST | `/charge` | JWT | — | Xử lý một khoản quyên góp một lần |
| POST | `/subscribe` | JWT | — | Tạo đăng ký quyên góp định kỳ |
| POST | `/log` | Public | — | Ghi nhận một khoản quyên góp. Nội dung: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Public | — | Nhận sự kiện webhook thanh toán (Stripe, PayPal). Yêu cầu `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Phát lại các sự kiện Stripe trong một khoảng thời gian. Nội dung: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Public | — | Tính phí giao dịch. Nội dung: `{ type, provider, gatewayId, amount, currency }`. Yêu cầu `?churchId=` |
| POST | `/captcha-verify` | Public | — | Xác minh token reCAPTCHA. Nội dung: `{ token, churchId? }`. Câu trả lời từ con người trả về `{ response: "human", pass }`, trong đó `pass` là vé quyên góp dành cho khách có chữ ký, có hiệu lực 10 phút (và chỉ áp dụng cho `churchId` nếu được gửi kèm) |

Khi API chạy với `CAPTCHA_ENFORCE=true`, các lệnh gọi của khách (chưa đăng nhập) tới `/giving/donate/create-order`, `/charge`, `/subscribe`, `/giving/paymentmethods/addcard` và `/giving/paymentmethods/ach-setup-intent-anon` (cũng như `POST /content/registrations/register` có giá dành cho khách) phải kèm `captchaPass` trong nội dung, nếu không sẽ trả về 403 `Captcha verification required`. Vé có thể dùng lại cho đến khi hết hạn, vì luồng quyên góp qua Stripe của khách thực hiện hai lệnh gọi (thêm thẻ, rồi thanh toán). Các lệnh gọi của người đã đăng nhập không bị ảnh hưởng. `CAPTCHA_ENFORCE` mặc định là `false`; các biểu mẫu quyên góp dành cho khách trong `@churchapps/apphelper` tự động gửi vé này.

### Ví dụ: Xử lý một khoản quyên góp

```
POST /giving/donate/charge
Authorization: Bearer <token>

{
  "provider": "stripe",
  "amount": 50.00,
  "currency": "usd",
  "person": { "id": "per-123", "email": "donor@example.com" },
  "funds": [{ "id": "fund-001", "name": "General Fund", "amount": 50.00 }],
  "church": { "name": "First Church", "subDomain": "firstchurch" }
}
```

```json
{
  "id": "ch_abc123",
  "status": "succeeded",
  "provider": "stripe"
}
```

### Ví dụ: Tạo đăng ký định kỳ

```
POST /giving/donate/subscribe
Authorization: Bearer <token>

{
  "provider": "stripe",
  "amount": 100.00,
  "customerId": "cus_abc123",
  "interval": { "interval_count": 1, "interval": "month" },
  "billing_cycle_anchor": 1710460800,
  "person": { "id": "per-123", "email": "donor@example.com" },
  "funds": [{ "id": "fund-001", "name": "General Fund", "amount": 100.00 }],
  "church": { "name": "First Church", "subDomain": "firstchurch" }
}
```

```json
{
  "id": "sub_xyz789",
  "status": "active",
  "provider": "stripe"
}
```

## Quỹ

Đường dẫn gốc: `/giving/funds`

Mở rộng `GenericCrudController` với các route CRUD: `getById`, `getAll`, `post`, `delete`. Quyền `view` là `null` (không cần quyền để xem quỹ).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Liệt kê tất cả quỹ |
| GET | `/:id` | JWT | — | Lấy một quỹ theo ID |
| GET | `/churchId/:churchId` | Public | — | Lấy tất cả quỹ của một nhà thờ cụ thể (công khai) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Public | — | Lấy tổng số tiền quyên góp của một quỹ: `{ fundId, totalAmount, donationCount }`. Phục vụ phần tử `campaignProgress` của trình tạo website |
| POST | `/` | JWT | Donations.Edit | Tạo hoặc cập nhật quỹ |
| DELETE | `/:id` | JWT | Donations.Edit | Xóa một quỹ |

## Quyên góp theo quỹ

Đường dẫn gốc: `/giving/funddonations`

Theo dõi cách phân bổ từng khoản quyên góp vào các quỹ. Không có route CRUD cơ bản nào được bật; tất cả endpoint đều là tùy chỉnh.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | Liệt kê quyên góp theo quỹ. Lọc theo `?donationId=`, `?personId=`, `?fundId=` hoặc `?fundName=`. Có thể thêm `?startDate=&endDate=` để lọc theo ngày |
| GET | `/:id` | JWT | Donations.View | Lấy một bản ghi quyên góp theo quỹ bằng ID |
| GET | `/my` | JWT | — | Lấy các khoản quyên góp theo quỹ của người dùng hiện tại |
| POST | `/` | JWT | Donations.Edit hoặc Donations.Enter | Tạo hoặc cập nhật quyên góp theo quỹ (theo đợt). Chỉ với Donations.Enter: khoản quyên góp cha phải nằm trong đợt đang mở và không phải là khoản tặng qua cổng thanh toán, nếu không sẽ trả về `403` |
| DELETE | `/:id` | JWT | Donations.Edit hoặc Donations.Enter | Xóa một bản ghi quyên góp theo quỹ. Áp dụng cùng quy tắc đợt đang mở cho Donations.Enter |

## Cổng thanh toán

Đường dẫn gốc: `/giving/gateways`

Quản lý cấu hình cổng thanh toán (Stripe, PayPal, v.v.). Không có route CRUD cơ bản nào được bật; tất cả endpoint đều là tùy chỉnh. Khóa bí mật của cổng được mã hóa khi lưu trữ.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Liệt kê tất cả cổng thanh toán của nhà thờ |
| GET | `/:id` | JWT | Settings.Edit | Lấy một cổng thanh toán theo ID |
| GET | `/churchId/:churchId` | Public | — | Lấy các cổng thanh toán của một nhà thờ (chỉ khóa công khai) |
| GET | `/configured/:churchId` | Public | — | Kiểm tra xem nhà thờ đã cấu hình cổng thanh toán hay chưa |
| POST | `/` | JWT | Settings.Edit | Tạo hoặc cập nhật cổng thanh toán (mã hóa khóa, tạo webhook và sản phẩm) |
| PATCH | `/:id` | JWT | Settings.Edit | Cập nhật một phần cổng thanh toán |
| DELETE | `/:id` | JWT | Settings.Edit | Xóa cổng thanh toán (đồng thời xóa các webhook của cổng) |

### Ví dụ: Kiểm tra cấu hình cổng thanh toán

```
GET /giving/gateways/configured/church-123
```

```json
{
  "configured": true
}
```

## Khách hàng

Đường dẫn gốc: `/giving/customers`

Mở rộng `GenericCrudController` với các route CRUD: `getAll`, `delete`. Liên kết người với hồ sơ khách hàng của họ trên cổng thanh toán.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Liệt kê tất cả khách hàng |
| GET | `/:id` | JWT | Donations.ViewSummary hoặc hồ sơ của chính mình | Lấy một khách hàng theo ID |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary hoặc hồ sơ của chính mình | Lấy các đăng ký trên cổng thanh toán của một khách hàng |
| DELETE | `/:id` | JWT | Donations.Edit | Xóa một khách hàng |

## Đăng ký định kỳ

Đường dẫn gốc: `/giving/subscriptions`

Quản lý các đăng ký quyên góp định kỳ. Không có route CRUD cơ bản nào được bật; tất cả endpoint đều là tùy chỉnh.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Liệt kê tất cả đăng ký |
| GET | `/:id` | JWT | Donations.ViewSummary | Lấy một đăng ký theo ID |
| POST | `/` | JWT | Donations.Edit hoặc đăng ký của chính mình | Cập nhật đăng ký với cổng thanh toán |
| DELETE | `/:id` | JWT | Donations.Edit hoặc đăng ký của chính mình | Hủy đăng ký và xóa khỏi cơ sở dữ liệu. Nội dung: `{ provider, reason }` |

## Quỹ đăng ký

Đường dẫn gốc: `/giving/subscriptionfunds`

Theo dõi phân bổ quỹ cho các đăng ký định kỳ. Không có route CRUD cơ bản nào được bật; tất cả endpoint đều là tùy chỉnh.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View hoặc đăng ký của chính mình | Liệt kê quỹ của đăng ký. Lọc theo `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Lấy một quỹ đăng ký theo ID |
| DELETE | `/:id` | JWT | Donations.Edit | Xóa một quỹ đăng ký |
| DELETE | `/subscription/:id` | JWT | Donations.Edit hoặc đăng ký của chính mình | Xóa tất cả quỹ của một đăng ký |

## Phương thức thanh toán

Đường dẫn gốc: `/giving/paymentmethods`

Quản lý các phương thức thanh toán đã lưu (thẻ, tài khoản ngân hàng) thông qua API của cổng thanh toán. Không có route CRUD cơ bản nào được bật; tất cả endpoint đều là tùy chỉnh.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View hoặc personId của chính mình | Lấy tất cả phương thức thanh toán đã lưu của một người (thẻ, tài khoản ngân hàng) |
| POST | `/addcard` | JWT | — | Gắn một phương thức thanh toán bằng thẻ. Nội dung: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit hoặc personId của chính mình | Cập nhật thông tin thẻ. Nội dung: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit hoặc personId của chính mình | Tạo SetupIntent ACH của Stripe để liên kết tài khoản ngân hàng. Nội dung: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Public | — | Tạo SetupIntent ACH ẩn danh cho quyên góp của khách. Nội dung: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit hoặc personId của chính mình | Thêm tài khoản ngân hàng qua token (không còn được khuyến nghị; hãy dùng `ach-setup-intent`). Nội dung: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit hoặc personId của chính mình | Cập nhật thông tin tài khoản ngân hàng. Nội dung: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit hoặc khách hàng của chính mình | Xác minh tài khoản ngân hàng bằng các khoản tiền gửi thử (micro-deposits). Nội dung: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit hoặc khách hàng của chính mình | Xóa một phương thức thanh toán (thẻ hoặc tài khoản ngân hàng) |

## Nhật ký sự kiện

Đường dẫn gốc: `/giving/eventLog`

Mở rộng `GenericCrudController` với các route CRUD: `getById`, `getAll`, `post`, `delete`. Theo dõi các sự kiện webhook của cổng thanh toán để kiểm toán và loại bỏ trùng lặp.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Liệt kê tất cả nhật ký sự kiện |
| GET | `/:id` | JWT | Donations.ViewSummary | Lấy một nhật ký sự kiện theo ID |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Lấy nhật ký sự kiện được lọc theo loại sự kiện |
| POST | `/` | JWT | Donations.Edit | Tạo hoặc cập nhật nhật ký sự kiện |
| DELETE | `/:id` | JWT | Donations.Edit | Xóa một nhật ký sự kiện |

## Trang liên quan

- [Điểm cuối Thành viên](./membership) — Người, nhà thờ, nhóm, vai trò và quyền
- [Xác thực & Quyền](./authentication) — Luồng đăng nhập, JWT, OAuth, mô hình quyền
- [Cấu trúc mô-đun](../module-structure) — Các mẫu tổ chức mã
