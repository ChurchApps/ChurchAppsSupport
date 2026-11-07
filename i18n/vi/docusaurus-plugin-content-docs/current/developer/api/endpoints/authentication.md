---
title: "Xác thực & Phân quyền"
---

# Xác thực & Phân quyền

<div class="article-intro">

API ChurchApps sử dụng xác thực dựa trên JWT. Người dùng đăng nhập để nhận một token mã hóa danh tính, tư cách thành viên nhà thờ và các quyền của họ. Trang này trình bày luồng xác thực, mô hình phân quyền và hỗ trợ OAuth.

</div>

## Luồng đăng nhập

### Đăng nhập tiêu chuẩn

```
POST /membership/users/login
```

**Xác thực:** Public

Chấp nhận một trong ba loại thông tin xác thực:

| Trường | Mô tả |
|-------|-------------|
| `email` + `password` | Đăng nhập tiêu chuẩn bằng email/mật khẩu |
| `jwt` | Xác thực lại bằng JWT hiện có |
| `authGuid` | Liên kết xác thực dùng một lần (dùng trong email chào mừng và email đặt lại mật khẩu) |

**Phản hồi:**

```json
{
  "user": {
    "id": "abc-123",
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane@example.com"
  },
  "churches": [
    {
      "church": { "id": "church-1", "name": "First Church", "subDomain": "firstchurch" },
      "person": { "id": "person-1", "membershipStatus": "Member" },
      "groups": [{ "id": "group-1", "name": "Choir", "leader": false }],
      "apis": [
        {
          "keyName": "MembershipApi",
          "permissions": [
            { "contentType": "People", "action": "View" },
            { "contentType": "People", "action": "Edit" }
          ]
        }
      ]
    }
  ],
  "token": "<jwt-token>"
}
```

Trường `token` là một JWT, cần được gửi dưới dạng `Authorization: Bearer <token>` trong các yêu cầu sau đó.

### Xác minh hai bước khi đăng nhập

Người dùng có thể bật xác minh hai bước khi đăng nhập bằng ứng dụng xác thực (TOTP). Với những người dùng này, đăng nhập bằng `email` + `password`, `authGuid` hoặc SSO sẽ không trả về token. Thay vào đó, hệ thống trả về một thử thách:

```json
{ "mfaRequired": true, "mfaToken": "<challenge-token>" }
```

Mã thử thách có hiệu lực trong 5 phút. Gửi lại mã này đến cùng endpoint kèm mã xác thực:

```json
{ "mfaToken": "<challenge-token>", "mfaCode": "123456" }
```

`mfaCode` có thể là mã 6 chữ số hiện tại từ ứng dụng xác thực, hoặc một trong mười mã dự phòng dùng một lần của người dùng. Mã sai sẽ trả về `Invalid code`, và các lần thất bại liên tiếp bị giới hạn tần suất theo từng tài khoản. Đăng nhập lại bằng `jwt` không bao giờ bị yêu cầu xác minh, nên các phiên hiện có vẫn được làm mới bình thường. Đối tượng `user` trong phản hồi đăng nhập có trường `mfaEnabled`.

Các endpoint tự phục vụ (chỉ dành cho người dùng đã đăng nhập, nằm dưới `/membership/users/mfa`):

| Endpoint | Mô tả |
|----------|-------------|
| `GET /status` | `{ enabled, backupCodesLeft }` |
| `POST /setup` | Bắt đầu thiết lập; trả về `{ secret, otpauthUrl }` để tạo mã QR |
| `POST /enable` | Nội dung `{ code }`; bật tính năng và trả về `{ backupCodes }` một lần duy nhất |
| `POST /disable` | Nội dung `{ code }` (mã xác thực hoặc mã dự phòng); tắt tính năng |
| `POST /reset/:userId` | Chỉ Server.Admin; tắt tính năng cho người dùng khác |

Khóa bí mật được lưu ở dạng mã hóa và mã dự phòng được lưu ở dạng băm. Các thao tác bật, tắt và đặt lại đều được ghi vào nhật ký kiểm toán.

### Nội dung Token

JWT mã hóa các thông tin sau:
- `id` — ID người dùng
- `churchId` — Nhà thờ đang được chọn
- `personId` — Bản ghi người của nhà thờ đã chọn
- Các mảng quyền theo từng API

### Chọn nhà thờ

Người dùng có thể thuộc về nhiều nhà thờ. Phản hồi đăng nhập bao gồm tất cả nhà thờ cùng quyền của người dùng trong đó. Để chuyển sang nhà thờ khác, client tạo một JWT mới gắn với nhà thờ đó dựa trên dữ liệu có trong phản hồi đăng nhập.

## Đăng ký người dùng

### Đăng ký người dùng mới

```
POST /membership/users/register
```

**Xác thực:** Public

```json
{
  "email": "jane@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "appName": "B1 Admin",
  "appUrl": "https://app.b1.church"
}
```

Endpoint này tạo người dùng với mật khẩu tạm thời và gửi email chào mừng kèm liên kết xác thực. Người dùng đầu tiên đăng ký trên một instance mới sẽ tự động được cấp quyền quản trị máy chủ.

Endpoint chấp nhận hai trường tùy chọn dùng để chặn bot: `website` (trường honeypot ẩn mà người dùng thật sẽ để trống) và `fillMs` (thời gian biểu mẫu được mở, tính bằng mili giây). Nếu `website` có giá trị hoặc `fillMs` nhỏ hơn 2000, hệ thống sẽ không tạo tài khoản nhưng vẫn trả về phản hồi `200` bình thường, để bot không biết mình đã bị từ chối. Client bỏ qua cả hai trường sẽ đăng ký như bình thường.

### Đăng ký nhà thờ mới

```
POST /membership/churches/add
```

**Xác thực:** JWT

Sau khi đăng ký người dùng, gọi endpoint này để tạo nhà thờ và liên kết người dùng với nhà thờ đó.

## Quản lý mật khẩu

| Phương thức | Đường dẫn | Xác thực | Mô tả |
|--------|------|------|-------------|
| POST | `/membership/users/forgot` | Public | Gửi email đặt lại mật khẩu. Nội dung: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Public | Đặt mật khẩu mới bằng GUID xác thực từ email đặt lại. Nội dung: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | Đổi mật khẩu của người dùng hiện tại. Nội dung: `{ "newPassword": "..." }` |

## Mô hình phân quyền

Quyền được tổ chức theo mô-đun và gán cho người dùng thông qua vai trò. Mỗi quyền có một **loại nội dung** và một **hành động**.

### Bảng tham chiếu quyền

| Mục hiển thị | Loại nội dung | Hành động | Mô tả |
|----------------|--------------|--------|-------------|
| **Điểm danh** | Attendance | Checkin | Điểm danh thành viên tại các buổi nhóm |
| | Attendance | Edit | Chỉnh sửa bản ghi điểm danh |
| | Services | Edit | Quản lý buổi nhóm và giờ nhóm |
| | Attendance | View | Xem bản ghi điểm danh |
| | Attendance | View Summary | Xem tổng hợp và báo cáo điểm danh |
| **Quyên góp** | Donations | Edit | Tạo và chỉnh sửa bản ghi quyên góp |
| | Settings | Edit | Chỉnh sửa cài đặt dâng hiến/thanh toán |
| | Donations | View Summary | Xem báo cáo tổng hợp quyên góp |
| | Donations | View | Xem từng bản ghi quyên góp |
| **Người và nhóm** | Forms | Admin | Quản trị toàn bộ biểu mẫu |
| | Forms | Edit | Chỉnh sửa định nghĩa biểu mẫu |
| | Plans | Edit | Chỉnh sửa kế hoạch buổi nhóm |
| | Group Members | Edit | Thêm/xóa thành viên nhóm |
| | Groups | Edit | Tạo và chỉnh sửa nhóm |
| | Households | Edit | Chỉnh sửa phân công hộ gia đình |
| | People | Edit | Chỉnh sửa bất kỳ hồ sơ người nào |
| | People | Edit Self | Chỉ chỉnh sửa hồ sơ của chính mình |
| | Roles | Edit | Quản lý vai trò và phân công người dùng |
| | Group Members | View | Xem danh sách thành viên nhóm |
| | People | View Members | Chỉ xem thành viên (không xem khách) |
| | People | View | Xem tất cả mọi người |
| | Roles | View | Xem vai trò và phân công |
| | Settings | Edit | Chỉnh sửa cài đặt nhà thờ |
| **Nội dung** | Content | Edit | Chỉnh sửa trang, phần và thành phần |
| | Settings | Edit | Chỉnh sửa cài đặt nội dung |
| | StreamingServices | Edit | Quản lý cấu hình dịch vụ phát trực tuyến |
| | Chat | Host | Tổ chức và kiểm duyệt phiên trò chuyện |
| **Nhắn tin** | Texting | Send | Gửi tin nhắn SMS |

### Cách kiểm tra quyền

Trong controller, quyền được kiểm tra bằng phương thức `au.checkAccess()`:

```typescript
// Yêu cầu quyền cụ thể
if (!au.checkAccess(Permissions.people.edit)) return this.json({}, 401);

// Hoặc trong actionWrapper — hệ thống CRUD tự động kiểm tra
crudSettings: {
  permissions: {
    view: Permissions.people.view,
    edit: Permissions.people.edit
  }
}
```

### Quản trị máy chủ

Quyền `Server.Admin` cấp toàn quyền truy cập trên tất cả nhà thờ. Quyền này được gán cho người dùng đăng ký đầu tiên và có thể cấp cho người khác thông qua vai trò quản trị máy chủ.

## OAuth 2.0

API hỗ trợ OAuth 2.0 cho các tích hợp bên thứ ba. Có hai loại grant.

### Luồng Authorization Code

1. **Ủy quyền:** `POST /membership/oauth/authorize` (yêu cầu JWT)
   - Nội dung: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "...", "code_challenge": "...", "code_challenge_method": "S256" }`
   - `code_challenge` / `code_challenge_method` (PKCE, chỉ `S256`) là bắt buộc đối với client công khai không có secret
   - Trả về: `{ "code": "...", "state": "..." }`

2. **Đổi code lấy token:** `POST /membership/oauth/token` (Public)
   - Nội dung: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "...", "code_verifier": "..." }`
   - Gửi `code_verifier` khi bước ủy quyền đã dùng `code_challenge`; client công khai bỏ qua `client_secret`. Chấp nhận nội dung dạng JSON hoặc form-encoded
   - Trả về: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **Làm mới token:** `POST /membership/oauth/token` (Public)
   - Nội dung: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

Access token hết hạn sau **12 giờ**.

### Luồng Device Code (RFC 8628)

Dành cho thiết bị không có trình duyệt (ứng dụng TV, kiosk):

1. **Yêu cầu device code:** `POST /membership/oauth/device/authorize` (Public)
   - Nội dung: `{ "client_id": "...", "scope": "..." }`
   - Trả về: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **Người dùng nhập mã** tại URI xác minh, sau đó phê duyệt hoặc từ chối

3. **Thăm dò token:** `POST /membership/oauth/token` (Public)
   - Nội dung: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - Trả về `authorization_pending` cho đến khi được phê duyệt, sau đó trả về access token

### Quản lý OAuth client

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | Liệt kê tất cả OAuth client |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | Lấy client theo ID |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | Lấy client theo client ID (đã ẩn secret) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | Tạo mới hoặc cập nhật client |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | Xóa client |
| POST | `/membership/oauth/register` | Public | — | Đăng ký client động (RFC 7591) cho client công khai như các connector MCP. Xem [Ứng dụng đã kết nối](../connected-apps#dynamic-client-registration) |

### Endpoint phê duyệt thiết bị

| Phương thức | Đường dẫn | Xác thực | Mô tả |
|--------|------|------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | Lấy thông tin device code đang chờ để hiển thị giao diện phê duyệt |
| POST | `/membership/oauth/device/approve` | JWT | Phê duyệt ủy quyền thiết bị. Nội dung: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | Từ chối ủy quyền thiết bị. Nội dung: `{ "user_code": "..." }` |

## Endpoint công khai và endpoint yêu cầu xác thực

API sử dụng hai hàm bao (wrapper) để quyết định yêu cầu xác thực:

- **`actionWrapper`** — Yêu cầu JWT hợp lệ. Đối tượng người dùng đã xác thực (`au`) có sẵn với `churchId`, `userId` và các kiểm tra quyền.
- **`actionWrapperAnon`** — Không cần xác thực. Dùng cho đăng nhập, đăng ký, tra cứu nội dung công khai và bộ nhận webhook.

Trong các bảng endpoint của tài liệu này, hai loại này được ký hiệu lần lượt là **JWT** và **Public** ở cột Xác thực.

## Trang liên quan

- [Cấu trúc mô-đun](../module-structure) — Cách controller, repository và model được tổ chức
- [Thiết lập cục bộ](../local-setup) — Chạy API trên máy để phát triển
