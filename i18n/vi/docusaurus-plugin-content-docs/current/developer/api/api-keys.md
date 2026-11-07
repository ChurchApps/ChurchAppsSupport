---
title: "Khóa API"
---

# Khóa API

<div class="article-intro">

Khóa API (mã truy cập cá nhân) là cách đơn giản nhất để xác thực với B1 API từ một script phía máy chủ, một công cụ kết nối bên thứ ba (Zapier, Make, Google Sheets), hoặc bất kỳ trường hợp nào mà luồng OAuth đầy đủ là quá phức tạp. Một khóa được gắn với một người cụ thể trong một hội thánh cụ thể và kế thừa quyền hạn của người đó, được thu hẹp bởi một tập hợp phạm vi (scope) tùy chọn.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Quản trị viên hội thánh có quyền **Edit Settings** sẽ tạo và quản lý khóa
- Khóa gốc chỉ được hiển thị **một lần** khi tạo — hãy lưu ở nơi an toàn ngay lập tức
- Mọi yêu cầu API phải sử dụng **HTTPS**

</div>

## Định dạng khóa

Khóa B1 API có dạng như sau:

```
cak_<prefix>.<secret>
```

- `cak_` — định danh cố định (tiền tố khóa API mà lớp xác thực sử dụng để nhận diện)
- `<prefix>` — đoạn tra cứu công khai gồm 8 ký tự
- `<secret>` — chuỗi bí mật gồm 48 ký tự; máy chủ chỉ lưu giá trị băm SHA-256 của chuỗi này

Khi gửi đến máy chủ, khóa đầy đủ được đặt trong header bearer tiêu chuẩn:

```http
Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7
```

Lớp xác thực API chuyển mọi token bắt đầu bằng `cak_` vào luồng khóa API, băm phần bí mật, tra cứu theo tiền tố và xác định quyền hiện tại của người sở hữu khóa. Vì vậy, khi bạn thu hồi một quyền trong B1Admin, thay đổi sẽ có hiệu lực ngay ở yêu cầu tiếp theo, và khóa không bao giờ bị lệch khỏi vai trò.

## Tạo khóa (B1Admin)

1. Đăng nhập B1Admin bằng tài khoản có quyền **Edit Settings**.
2. Mở **Settings → Developer → API Keys**.
3. Nhấn **New API Key**, đặt một tên dễ nhận biết (ví dụ: "Zapier — donations sync"), chọn các phạm vi mà khóa cần có, rồi nhấn **Save**.
4. Khóa `cak_…` đầy đủ sẽ được hiển thị **một lần** trong hộp thoại. Hãy sao chép vào cấu hình tích hợp trước khi đóng — sau đó không có cách nào lấy lại. Bạn luôn có thể tạo khóa mới.

## Phạm vi (Scopes)

Phạm vi **thu hẹp** những gì một khóa có thể làm — nó không bao giờ cấp một quyền mà người sở hữu bên dưới không có. Nếu không có phạm vi nào (hoặc để trống), khóa sẽ mang toàn bộ quyền của người đó.

| Phạm vi | Cho phép |
|---|---|
| `people:read` / `people:write` | Xem / chỉnh sửa người, hộ gia đình, thành viên nhóm |
| `groups:read` / `groups:write` | Xem / chỉnh sửa nhóm và danh sách thành viên |
| `donations:read` / `donations:write` | Xem / ghi nhận quyên góp |
| `attendance:read` / `attendance:write` | Xem / ghi nhận điểm danh, buổi học và check-in |
| `forms:write` | Quản lý biểu mẫu (quyền đọc đã được bao hàm trong quyền ghi) |
| `content:read` / `content:write` | Xem / chỉnh sửa nội dung website, đăng ký và phát trực tuyến |
| `messaging:read` / `messaging:write` | Đọc tin nhắn; quyền ghi còn cho phép gửi SMS |
| `roles:read` / `roles:write` | Xem / chỉnh sửa định nghĩa vai trò |
| `settings:read` / `settings:write` | Xem / chỉnh sửa cài đặt hội thánh (**bắt buộc** để đăng ký webhook bằng lập trình) |
| `workflows:read` / `workflows:write` | Xem quy trình và công việc / chạy và chỉnh sửa quy trình. Chạy quy trình có thể gửi email và tin nhắn văn bản, kích hoạt webhook và thay đổi thành viên nhóm |
| `offline_access` | Cho phép refresh token có thời hạn dài (chỉ dùng cho luồng OAuth — không có tác dụng với khóa API) |

Phạm vi `write` ngầm bao gồm quyền `read` tương ứng. Các quyền dành cho quản trị máy chủ và quản trị miền được cố ý không đưa ra thành phạm vi — một thông tin xác thực có phạm vi giới hạn không bao giờ có thể nâng lên quyền quản trị site.

:::tip
Nếu bạn sẽ dùng khóa để đăng ký webhook (ví dụ: cho tích hợp Zapier hoặc Make), khóa cần có `settings:write`. Khóa chỉ có `people:read` sẽ âm thầm nhận lỗi 403 khi gọi `POST /membership/webhooks`.
:::

## Sử dụng khóa

Giống như mọi bearer token khác — mọi endpoint yêu cầu xác thực đều chấp nhận khóa API y hệt như cách chấp nhận JWT:

```bash
curl https://api.churchapps.org/membership/people \
  -H "Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7"
```

Nếu khóa trong yêu cầu không đủ phạm vi, máy chủ sẽ trả về **403 Forbidden** với cùng cấu trúc phản hồi như mọi lỗi từ chối quyền khác.

## Quản lý khóa qua API

Tất cả endpoint nằm dưới đường dẫn `/membership/apiKeys` của mô-đun Membership và yêu cầu JWT (không phải khóa API) từ quản trị viên hội thánh có quyền **Edit Settings**.

| Phương thức & đường dẫn | Mục đích |
|---|---|
| `GET /membership/apiKeys` | Liệt kê các khóa của hội thánh (không có bí mật — chỉ gồm `id`, `name`, `prefix`, `scopes`, `lastUsedAt`, `expiresAt`, `createdAt`) |
| `GET /membership/apiKeys/scopes` | Danh sách tất cả tên phạm vi có sẵn — dùng cho giao diện tạo khóa |
| `POST /membership/apiKeys` | Tạo khóa mới. Nội dung: `{ "name": "...", "scopes": ["people:read"] }`. Phản hồi chứa khóa `cak_…` gốc **một lần**. |
| `DELETE /membership/apiKeys/:id` | Thu hồi khóa — có hiệu lực ngay ở yêu cầu tiếp theo |

Khóa đã thu hồi sẽ mất hiệu lực ngay lập tức — không có thời gian ân hạn.

## Thực hành tốt nhất

- **Mỗi tích hợp một khóa.** Nếu một khóa bị lộ, bạn chỉ cần thu hồi khóa đó mà không làm gián đoạn các tích hợp khác.
- **Chỉ cấp phạm vi tối thiểu cần thiết.** Xuất dữ liệu sang Google Sheets chỉ cần `people:read`, không cần `settings:write`.
- **Gắn khóa với tài khoản dịch vụ, không phải một nhân viên thực.** Nếu nhân viên nghỉ việc, quyền truy cập B1 của họ sẽ kết thúc — và mọi khóa được tạo dưới danh tính của họ cũng vậy.
- **Lưu khóa trong trình quản lý bí mật** (biến môi trường của nhà cung cấp hosting, AWS Secrets Manager, v.v.) — tuyệt đối không lưu trong hệ thống quản lý mã nguồn.
- **Xoay vòng khóa** khi nghi ngờ bị lộ: tạo khóa mới, cập nhật tích hợp, sau đó xóa khóa cũ.

## Khác biệt so với OAuth

Khóa API phù hợp khi **hội thánh của bạn là đơn vị duy nhất sử dụng tích hợp**. Với một công cụ kết nối cần truy cập nhiều hội thánh, mỗi hội thánh phải đồng ý rõ ràng — chẳng hạn một ứng dụng SaaS dùng chung trong cộng đồng B1 — hãy dùng [OAuth và Connected Apps](./connected-apps) thay thế.

| | Khóa API | OAuth |
|---|---|---|
| Ai cài đặt | Một quản trị viên hội thánh | Mỗi quản trị viên hội thánh cấp quyền cho ứng dụng |
| Header xác thực | `Authorization: Bearer cak_…` | `Authorization: Bearer <jwt>` |
| Thời hạn token | Cho đến khi bị thu hồi | Access khoảng 7 ngày, refresh khoảng 90 ngày |
| Phù hợp nhất | Script nội bộ, công cụ kết nối Zapier/Make/Sheets | Ứng dụng bên thứ ba đa người thuê |
