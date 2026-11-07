---
title: "Ứng dụng đã kết nối & OAuth"
description: "Kết nối ứng dụng bên thứ ba với dữ liệu B1 qua sự đồng ý OAuth 2.0, không chia sẻ mật khẩu hay khóa API, và thu hồi quyền trong cài đặt B1 Admin."
---

# Ứng dụng đã kết nối & OAuth

<div class="article-intro">

API của B1 hỗ trợ OAuth 2.0, cho phép một ứng dụng bên thứ ba xin quyền truy cập dữ liệu của từng quản trị viên nhà thờ mà không cần nhà thờ phải chia sẻ mật khẩu hay khóa API. **Ứng dụng đã kết nối** (Connected App) là một token OAuth mà quản trị viên nhà thờ đã phê duyệt; thu hồi token này sẽ chấm dứt quyền truy cập của ứng dụng bên thứ ba chỉ bằng một cú nhấp chuột. Hãy dùng cách này cho các trình kết nối SaaS đa khách thuê. Với tích hợp cho một nhà thờ duy nhất, nên ưu tiên [Khóa API](./api-keys.md).

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Một **ứng dụng khách** OAuth phải được đăng ký trước khi nhà thờ có thể cấp quyền cho nó, bởi quản trị viên máy chủ B1, hoặc bởi chính ứng dụng khách thông qua [đăng ký động](#dynamic-client-registration)
- Tất cả các điểm cuối OAuth nằm dưới mô-đun Membership: `/membership/oauth/...`
- Token truy cập là JWT, chứa quyền của người dùng đã được lọc theo các phạm vi (scope) được cấp

</div>

## Khái niệm

| Thuật ngữ | Ý nghĩa |
|---|---|
| **Ứng dụng khách OAuth** | Chính ứng dụng bên thứ ba, được xác định bằng `client_id` và được bảo vệ bằng `client_secret`. Được đăng ký một lần với B1 và dùng chung cho mọi nhà thờ cài đặt ứng dụng. |
| **Ứng dụng đã kết nối** | Một cặp `(ứng dụng khách, quản trị viên nhà thờ)` cụ thể, trong đó quản trị viên đã cấp quyền truy cập cho ứng dụng khách. Mỗi ứng dụng đã kết nối được hỗ trợ bởi một refresh token OAuth. |
| **Token truy cập** | Một JWT có thời hạn ngắn (khoảng 7 ngày) mà ứng dụng khách dùng để gọi API. Có cấu trúc giống JWT của người dùng: `Authorization: Bearer <jwt>`. |
| **Refresh token** | Một chuỗi opaque có thời hạn dài (khoảng 90 ngày) mà ứng dụng khách dùng để tạo token truy cập mới. |
| **Phạm vi (scope)** | Giới hạn những gì token truy cập có thể làm. Xem [danh mục phạm vi](./api-keys.md#scopes). |

## Các luồng cấp quyền

B1 hỗ trợ ba luồng OAuth, tất cả đều được định nghĩa theo RFC 6749 và RFC 8628.

### Mã ủy quyền (ứng dụng web)

Dùng khi ứng dụng của bạn có thành phần phía máy chủ và có thể giữ `client_secret` ở chế độ riêng tư.

1. **Ủy quyền**

   ```http
   POST /membership/oauth/authorize
   Authorization: Bearer <user JWT>
   Content-Type: application/json

   { "client_id": "...", "redirect_uri": "https://app.example.com/cb",
     "response_type": "code", "scope": "people:read groups:read", "state": "xyz" }
   ```

   Các ứng dụng khách công khai (không có `client_secret`) cũng phải gửi `"code_challenge": "..."` và `"code_challenge_method": "S256"` (PKCE, RFC 7636). Chỉ chấp nhận `S256`.

   Trả về `{ "code": "...", "state": "xyz" }`. Điểm cuối mã ủy quyền cố ý là một POST yêu cầu xác thực. Ứng dụng của bạn thu thập JWT của người dùng B1 (thường bằng cách đặt một nút trong phiên B1 của người dùng) và chuyển tiếp nó như một phần của bước đồng ý.

2. **Đổi mã lấy token**

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "authorization_code", "code": "...",
     "client_id": "...", "client_secret": "...", "redirect_uri": "..." }
   ```

   Nếu bước ủy quyền đã gửi `code_challenge`, hãy thêm `"code_verifier": "..."` tương ứng. Ứng dụng khách công khai gửi verifier và bỏ qua `client_secret`. Điểm cuối token chấp nhận nội dung dạng JSON hoặc mã hóa form (`application/x-www-form-urlencoded`).

   Trả về phản hồi token:

   ```json
   {
     "access_token": "eyJ...",
     "token_type": "Bearer",
     "expires_in": 604800,
     "created_at": 1715000000,
     "refresh_token": "abc123…",
     "scope": "people:read groups:read"
   }
   ```

3. **Làm mới** khi token truy cập sắp hết hạn:

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "refresh_token", "refresh_token": "...",
     "client_id": "...", "client_secret": "..." }
   ```

   Refresh token hết hạn sau 90 ngày không sử dụng; nếu đã hết hạn, quản trị viên nhà thờ phải ủy quyền lại.

### Mã thiết bị (TV, kiosk, CLI)

Dùng khi thiết bị không có trình duyệt. Được định nghĩa bởi RFC 8628.

1. **Yêu cầu mã thiết bị**

   ```http
   POST /membership/oauth/device/authorize
   Content-Type: application/json

   { "client_id": "...", "scope": "content:read" }
   ```

   Trả về mã hiển thị cho người dùng và khoảng thời gian thăm dò:

   ```json
   { "device_code": "...", "user_code": "WXYZ-1234",
     "verification_uri": "https://app.b1.church/device",
     "expires_in": 900, "interval": 5 }
   ```

2. Hiển thị `user_code` và `verification_uri` cho người dùng.

3. **Thăm dò** `/membership/oauth/token` với `grant_type=urn:ietf:params:oauth:grant-type:device_code` và `device_code`. Các phản hồi tiêu chuẩn:

   | Lỗi | Ý nghĩa |
   |---|---|
   | `authorization_pending` | Người dùng chưa phê duyệt. Tiếp tục thăm dò theo khoảng thời gian được đề xuất |
   | `expired_token` | Mã thiết bị đã quá `expires_in`. Hãy bắt đầu lại từ đầu |
   | `access_denied` | Người dùng đã từ chối yêu cầu |
   | _(không có lỗi, 200 OK)_ | Đã phê duyệt. Nội dung là một `B1TokenResponse` |

4. Sau khi được phê duyệt, hãy lưu `refresh_token` và dùng `access_token` cho đến khi nó hết hạn.

SDK của B1 bao gồm `B1OAuthClient.awaitDeviceToken(...)`, hàm này tự động chạy vòng lặp thăm dò với cơ chế lùi thời gian (backoff) hợp lý theo RFC.

### Refresh token

Luôn có sẵn dưới dạng một yêu cầu độc lập khi bạn đã có `refresh_token`:

```http
POST /membership/oauth/token
{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "..." }
```

Một `access_token` và `refresh_token` mới sẽ được trả về. **Ứng dụng khách công khai** (không có `client_secret`) có thể bỏ qua `client_secret` khi làm mới. Điều này hữu ích cho các ứng dụng OAuth trên điện thoại hoặc máy tính không thể giữ bí mật.

Refresh token được luân chuyển (rotate), nhưng token cũ không bị hủy ngay lập tức. Nếu ứng dụng khách không nhận được phản hồi làm mới (ví dụ, một TV bị mất điện hoặc mất Wi-Fi giữa chừng), nó có thể thử lại với `refresh_token` trước đó trong tối đa **7 ngày**. Lần thử lại chỉ thành công khi token thay thế chưa được sử dụng; khi đó token thay thế chưa dùng sẽ bị loại bỏ và một cặp token mới được cấp. Khi chính token thay thế đã được làm mới, token cũ sẽ trả về `invalid_grant`. Việc thu hồi một kết nối cũng sẽ thu hồi mọi token đã được luân chuyển vẫn còn trong khoảng thời gian ân hạn đó, và danh sách ứng dụng đã kết nối chỉ hiển thị mỗi kết nối một lần.

## Cấu trúc token

Token truy cập là một JWT do B1 cấp, giống hệt token mà người dùng nhận được từ `POST /membership/users/login`, cùng claim quyền theo mô-đun, cùng hành vi `checkAccess` trong mọi controller. **Ngoại trừ** mảng quyền đã được lọc qua các phạm vi được cấp tại thời điểm tạo token. Một token truy cập có phạm vi không thể làm bất cứ điều gì mà một khóa API có phạm vi tương tự không làm được, và không có "đường dẫn OAuth" riêng biệt trong bất kỳ controller nào. `actionWrapper` không biết người mang token là một người, một khóa API hay một ứng dụng khách OAuth.

## Ứng dụng đã kết nối (dành cho người dùng)

Từ góc nhìn của quản trị viên nhà thờ, "Ứng dụng đã kết nối" là danh sách các ứng dụng đã được cấp quyền truy cập vào nhà thờ của họ. Mỗi hàng là một cặp `(OAuthClient, OAuthToken)` đang hoạt động.

Trong B1Admin: **Cài đặt → Nhà phát triển → Ứng dụng đã kết nối** hiển thị:

- Tên của ứng dụng khách
- Các phạm vi mà quản trị viên đã phê duyệt
- Ngày quyền truy cập được cấp
- Nút **Thu hồi**

| Phương thức & Đường dẫn | Xác thực | Mục đích |
|---|---|---|
| `GET /membership/oauth/connections` | JWT | Liệt kê các kết nối đang hoạt động của chính người gọi (kèm tên ứng dụng khách và phạm vi) |
| `DELETE /membership/oauth/connections/:id` | JWT | Thu hồi một kết nối theo id của token OAuth. Token sẽ ngừng hoạt động ngay ở yêu cầu tiếp theo |

Danh sách tự động loại trừ các token đã hết hạn.

## Phạm vi & Sự đồng ý

Các chuỗi phạm vi có cùng danh mục với [khóa API](./api-keys.md#scopes). Các phương pháp hay nhất dành cho ứng dụng khách:

- **Yêu cầu các phạm vi hẹp nhất có thể đáp ứng nhu cầu.** Nhà thờ sẽ nhận thấy nếu bạn yêu cầu `donations:write` trong khi chỉ cần đọc dữ liệu người dùng.
- **Dùng refresh token kết hợp với token truy cập có thời hạn ngắn.** Token truy cập có thời hạn dài khó thu hồi nhanh hơn.
- **Luôn hiển thị các phạm vi đã được cấp cho người dùng** trong giao diện của chính bạn, để họ có thể xác minh những gì mình đã đồng ý.

## Quản lý ứng dụng khách OAuth

Các ứng dụng khách OAuth (chính các ứng dụng bên thứ ba) được đăng ký trên toàn cục. Ứng dụng khách bảo mật có `client_secret` do quản trị viên máy chủ B1 tạo ra. Để triển khai một ứng dụng như vậy, hãy liên hệ với đội ngũ ChurchApps để nhận cặp `client_id` / `client_secret` và đăng ký các URI chuyển hướng của bạn. Các ứng dụng khách công khai như connector MCP có thể tự đăng ký (xem bên dưới).

Các URI chuyển hướng đã đăng ký phải khớp chính xác với `redirect_uri` trong yêu cầu. Khớp tiền tố hoặc khớp một phần sẽ bị từ chối.

| Phương thức & Đường dẫn | Quyền | Mô tả |
|---|---|---|
| `GET /membership/oauth/clients` | Server.Admin | Liệt kê tất cả ứng dụng khách OAuth |
| `GET /membership/oauth/clients/clientId/:clientId` | — | Lấy một ứng dụng khách theo id công khai (secret đã được che) |
| `POST /membership/oauth/clients` | Server.Admin | Tạo mới hoặc cập nhật một ứng dụng khách |
| `DELETE /membership/oauth/clients/:id` | Server.Admin | Xóa một ứng dụng khách |

### Đăng ký ứng dụng khách động

`POST /membership/oauth/register` (công khai, RFC 7591) cho phép một ứng dụng khách như connector MCP của claude.ai tự đăng ký. Điểm cuối này được quảng bá trong tài liệu `/.well-known/oauth-authorization-server` của API. Xem [Máy chủ MCP → Khám phá OAuth](./mcp.md#oauth-discovery).

```http
POST /membership/oauth/register
Content-Type: application/json

{ "client_name": "Trợ lý AI của tôi", "redirect_uris": ["https://assistant.example.com/oauth/callback"], "scope": "people:read" }
```

Trả về mã 201 với `client_id`, `client_id_issued_at`, `client_name`, `redirect_uris`, `grant_types` (`authorization_code`, `refresh_token`), `response_types` (`code`) và `token_endpoint_auth_method: "none"`.

- Không bao giờ cấp secret, vì vậy ứng dụng khách phải dùng PKCE trong mọi lần ủy quyền.
- `redirect_uris` phải gồm 1–10 URL `https`, hoặc `http` trên `localhost`, `127.0.0.1` hoặc `[::1]`.
- `client_name` được cắt còn tối đa 45 ký tự (mặc định là "AI assistant").
- Giới hạn 20 lần đăng ký mỗi giờ cho mỗi IP.

Trên trang đồng ý của B1Admin, một ứng dụng khách tự đăng ký sẽ hiển thị thông báo rằng ứng dụng đã tự đăng ký, không bao giờ có thể làm nhiều hơn tài khoản B1 của chính người dùng, và có thể bị ngắt kết nối tại **Cài đặt → Nhà phát triển → Ứng dụng đã kết nối**.

## Hỗ trợ SDK

Gói `@churchapps/integration-sdk` bao bọc mọi luồng OAuth bằng các hàm trợ giúp có kiểu dữ liệu: `B1OAuthClient.exchangeCode()`, `.refresh()`, `.startDeviceFlow()`, `.pollDeviceToken()`, `.awaitDeviceToken()`. Xem README của gói và [Webhooks](./webhooks.md#sdk-support) để có ví dụ đầy đủ từ đầu đến cuối.
