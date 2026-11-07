---
title: "Máy chủ MCP"
description: "Thiết lập MCP cho API B1 để client AI như Claude Code, Cursor hay Claude Desktop gọi endpoint dữ liệu nhà thờ bằng khóa API hoặc đăng nhập OAuth."
---

# Máy chủ MCP

<div class="article-intro">

API B1 đi kèm một máy chủ [MCP (Model Context Protocol)](https://modelcontextprotocol.io) tại `/mcp`. Bất kỳ client AI nào hỗ trợ MCP, như custom connector của claude.ai, Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor hoặc client do bạn tự phát triển, đều có thể kết nối và gọi API REST bên dưới thay mặt người dùng giáo hội đã xác thực. Đây là một lớp bao bọc mỏng và mang tính tổng quát: ba công cụ chung cung cấp toàn bộ bề mặt API một cách động, thay vì mô hình hóa thủ công từng endpoint, cùng với một công cụ hướng dẫn theo lĩnh vực cho trình xây dựng trang web.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- [Khóa API B1](./api-keys.md) (`cak_…`) với các scope mà client cần có, hoặc một client MCP có thể đăng nhập bằng OAuth (xem [Khám phá OAuth](#oauth-discovery))
- Một host API B1 có thể truy cập, như `https://api.churchapps.org` cho các giáo hội được lưu trữ, hoặc triển khai riêng của bạn
- Một client MCP. Xem [Claude](/docs/b1-admin/integrations/claude) và [ChatGPT](/docs/b1-admin/integrations/chatgpt) để biết hướng dẫn thiết lập cho người dùng cuối

</div>

## Endpoint

```
POST /mcp
Content-Type: application/json
Accept: application/json, text/event-stream
Authorization: Bearer cak_<prefix>.<secret>
```

| Khía cạnh | Giá trị |
|---|---|
| **Đường dẫn** | `/mcp` (tương đối so với host API) |
| **Phương thức** | Chỉ `POST`. Yêu cầu/phản hồi và truyền SSE đều diễn ra trên cùng một endpoint |
| **Transport** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **Mô hình phiên** | Không trạng thái (stateless). Một instance máy chủ MCP mới được tạo cho mỗi yêu cầu, không có session id và không có khôi phục phiên |
| **Xác thực** | Bearer token. Khóa API `cak_…` và B1 JWT (bao gồm OAuth access token) đều hoạt động; cách phân giải giống như mọi endpoint được xác thực khác |

Yêu cầu có header `Authorization` bị thiếu hoặc không hợp lệ sẽ trả về:

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

với HTTP 401 và header `WWW-Authenticate: Bearer resource_metadata="<api>/.well-known/oauth-protected-resource"`. Các client hỗ trợ OAuth sẽ dựa vào header này để bắt đầu quá trình đăng nhập.

Trên API được lưu trữ (production và demo), `/mcp` được phục vụ qua API Gateway HTTP API thay vì REST API dùng cho các endpoint khác. REST API đổi tên `WWW-Authenticate` thành `x-amzn-remapped-www-authenticate` trong các phản hồi proxy của Lambda, khiến các client như ChatGPT chỉ nhận được 401 trống và không có cách nào để bắt đầu đăng nhập. HTTP API truyền header này nguyên vẹn.

## Công cụ

Có ba công cụ chung và một hướng dẫn. Mô hình dùng `list_endpoints` để khám phá, `describe_endpoint` để tìm hiểu cấu trúc payload, `api_call` để thực sự gọi API, và `describe_page_builder` khi tác vụ liên quan đến nội dung trang web.

### `list_endpoints`

Trả về toàn bộ danh sách route REST đã đăng ký, có thể lọc theo chuỗi con và/hoặc động từ HTTP. Mỗi mục bao gồm tên controller và các scope khóa API có khả năng cần thiết nhất.

**Đầu vào:**

| Trường | Kiểu | Mô tả |
|---|---|---|
| `filter` | string (tùy chọn) | Chuỗi con không phân biệt chữ hoa chữ thường, khớp với đường dẫn, ví dụ `"people"` |
| `method` | enum (tùy chọn) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

**Đầu ra:** một tài liệu JSON có dạng:

```json
{
  "total": 24,
  "endpoints": [
    {
      "method": "GET",
      "path": "/membership/people",
      "controller": "PersonController.getAll",
      "likelyScopes": ["people:read", "people:write"]
    }
  ]
}
```

Danh sách được xây dựng một lần khi API khởi động, từ bảng route đang hoạt động. Mọi thứ bạn có thể gọi bằng `curl` đều xuất hiện ở đây.

### `describe_endpoint`

Trả về một tóm tắt ngắn và, nếu có, nội dung yêu cầu cùng mẫu phản hồi được chọn lọc thủ công cho một endpoint.

**Đầu vào:**

| Trường | Kiểu | Mô tả |
|---|---|---|
| `method` | string | Động từ HTTP |
| `path` | string | Đường dẫn đầy đủ như trả về từ `list_endpoints` |

**Đầu ra:** với các endpoint đã được chọn lọc, một ví dụ gồm `summary`, `requestBody` và `responseSample`. Với các endpoint chưa được chọn lọc, một thông báo dự phòng hướng dẫn mô hình gọi `GET` trước để xem cấu trúc. Khoảng một chục route có lưu lượng cao (people, groups, donations, attendance, funds) đã được chọn lọc.

### `api_call`

Gọi endpoint REST đã chọn ngay trong tiến trình, thông qua cùng một ngăn xếp middleware Express như một yêu cầu HTTP thông thường. Xác thực, phân tích body, ghi nhật ký kiểm toán và phạm vi theo từng giáo hội đều được áp dụng.

**Đầu vào:**

| Trường | Kiểu | Mô tả |
|---|---|---|
| `method` | enum | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | string | Đường dẫn bao gồm tiền tố module, ví dụ `/membership/people` |
| `query` | object (tùy chọn) | Đối tượng phẳng chứa các tham số chuỗi truy vấn |
| `body` | any (tùy chọn) | Nội dung yêu cầu JSON, thường là một mảng các đối tượng model cho `POST` |

**Đầu ra:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* the controller's JSON response */ ]
}
```

Kết quả công cụ được đánh dấu `isError: true` cho mọi phản hồi có status ≥ 400.

### `describe_page_builder`

Đây là công cụ duy nhất không mang tính tổng quát: một hướng dẫn tĩnh, tự đầy đủ về việc xây dựng trang web thông qua các endpoint `/content/*`. Nội dung bao gồm mô hình dữ liệu Page → Section → Element, quy trình tạo, từng `elementType` cùng cấu trúc `answersJSON` của nó, các cài đặt ở cấp section như đường phân chia hình dạng `dividerTop`/`dividerBottom`, và một ví dụ đầu cuối. Công cụ không nhận đầu vào và phản ánh danh mục element được duy trì trong trình chỉnh sửa B1Admin (xem [Kiến trúc Website Builder](../architecture/website-builder.md)). Các agent được kỳ vọng gọi công cụ này một lần trước khi tạo hoặc chỉnh sửa nội dung trang, sau đó thực hiện thao tác qua `api_call`.

## Mô hình xác thực

Bản thân yêu cầu MCP chạy qua `CustomAuthProvider.getUser()`, cùng đường dẫn mà mọi endpoint B1 được xác thực đều sử dụng. Bearer `cak_…` được phân giải thành một `Principal` có quyền là RBAC hiện tại của người đã phát hành khóa, **giao** với các scope được cấp cho khóa. Phép giao này được tính lại trên mỗi yêu cầu, nên:

- Xóa một scope khỏi khóa (bằng cách xóa và tạo lại khóa) sẽ chặn quyền truy cập ở lần gọi tiếp theo.
- Xóa một quyền khỏi người dùng gốc trong B1Admin sẽ chặn quyền truy cập ở lần gọi tiếp theo, ngay cả khi khóa vẫn còn tồn tại.

Với các lần gọi `api_call` lồng nhau, header `Authorization` gốc được sao chép sang yêu cầu tổng hợp, nên `CustomAuthProvider` chạy lại và phép giao scope được áp dụng lại cho mỗi lần gọi. Không có bộ nhớ đệm token.

## Danh sách chặn đường dẫn

Một số ít route không thể truy cập qua `api_call`, ngay cả với khóa hợp lệ:

| Mẫu | Lý do |
|---|---|
| `/giving/donate/webhook/*` | Các endpoint webhook của nhà cung cấp yêu cầu nội dung thô đã được xác minh chữ ký từ Stripe/PayPal, không dành cho các bên gọi thông thường |
| `/membership/oauth/clients*` | Đăng ký client OAuth chỉ dành cho quản trị viên vận hành |
| `/membership/people/apiEmails` | Được bảo vệ bởi `jwtSecret` của vận hành, không phải bởi quyền người dùng |
| Bất kỳ route nào yêu cầu `multipart/form-data` | Tải tệp lên không thân thiện với JSON-RPC |

Đường dẫn bị chặn sẽ trả về kết quả công cụ `isError: true` kèm thông báo mô tả. Route bên dưới không bao giờ được gọi.

## Giới hạn kích thước phản hồi

Nội dung phản hồi của mỗi `api_call` được giới hạn ở **64 KB** đầu ra được ghi nhận. Nếu truy vấn vượt quá giới hạn, phản hồi sẽ có `"truncated": true` và mô hình được kỳ vọng thử lại với các tham số truy vấn hẹp hơn. Điều này giúp một phản hồi công cụ đơn lẻ không làm tràn cửa sổ ngữ cảnh của client.

## Giới hạn tốc độ

Không có giới hạn tốc độ ở cấp ứng dụng trên `/mcp`. Việc điều tiết được xử lý bởi đồng thời của API Gateway và Lambda trong môi trường production, và bởi bất kỳ cơ chế nào reverse proxy của bạn áp dụng trong các triển khai tự lưu trữ.

## Khám phá OAuth

Máy chủ MCP công bố metadata OAuth 2.1 để các client chỉ kết nối tới máy chủ được khám phá qua OAuth, đặc biệt là giao diện "Add custom connector" của Claude.ai, có thể đăng nhập người dùng mà không cần dán khóa. `/mcp` là protected resource, [nhà cung cấp OAuth](./connected-apps.md) hiện có dưới `/membership/oauth` là authorization server, và trang `/oauth` của B1Admin là màn hình đồng ý.

| Endpoint | Mục đích |
|---|---|
| `GET /.well-known/oauth-protected-resource` (cũng là `/.well-known/oauth-protected-resource/mcp`) | Metadata protected resource (RFC 9728): `resource` là `<api>/mcp`, `authorization_servers` là gốc API, `scopes_supported` liệt kê mọi [scope khóa API](./api-keys.md#scopes) |
| `GET /.well-known/oauth-authorization-server` | Metadata authorization server (RFC 8414): `authorization_endpoint` là `/oauth` của B1Admin, `token_endpoint` là `/membership/oauth/token`, `registration_endpoint` là `/membership/oauth/register` |
| `POST /membership/oauth/register` | Đăng ký client động (RFC 7591) |

Luồng mà một client như claude.ai thực hiện:

1. `POST /mcp` không có token trả về 401 với header `WWW-Authenticate` trỏ tới metadata protected resource.
2. Client đọc cả hai tài liệu metadata, sau đó tự đăng ký với `POST /membership/oauth/register`, gửi `client_name`, `redirect_uris` và tùy chọn `scope`. Mọi client tự đăng ký đều là client **công khai** (public): không cấp secret và phản hồi có `token_endpoint_auth_method: "none"`. URI chuyển hướng phải là `https`, hoặc `http` trên địa chỉ loopback (`localhost`, `127.0.0.1`, `[::1]`); tối đa 10 URI cho mỗi client. Việc đăng ký bị giới hạn 20 lần mỗi giờ cho mỗi IP.
3. Người dùng được chuyển đến `/oauth` của B1Admin với `code_challenge` và `code_challenge_method=S256`. Trang đồng ý liệt kê từng scope được yêu cầu bằng ngôn ngữ đơn giản (hoặc "Everything your B1 account can access" khi không có scope nào được yêu cầu), hiển thị host mà người dùng sẽ được chuyển hướng trở lại, và ghi chú khi ứng dụng tự đăng ký. Người dùng nhấn **Allow**.
4. Client đổi mã tại `/membership/oauth/token` với `grant_type=authorization_code` và `code_verifier` của nó, sau đó làm mới bằng `grant_type=refresh_token`. Cả nội dung form-encoded và JSON đều được chấp nhận.
5. Access token thu được là một B1 JWT có phạm vi, được dùng làm bearer trên `/mcp`.

Quy tắc PKCE: chỉ chấp nhận `S256`. Client không có secret phải gửi `code_challenge` khi authorize và `code_verifier` khớp khi đổi token. Client bảo mật (có secret) vẫn có thể chỉ dùng secret. URI chuyển hướng phải khớp chính xác với một URI đã đăng ký.

Các client chấp nhận bearer token tĩnh trong cấu hình, như Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor và mã tùy chỉnh, có thể tiếp tục dùng khóa `cak_…` thay thế.

## Phát triển cục bộ

Endpoint MCP được gắn cùng mọi thứ khác khi API chạy cục bộ:

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

Khi khởi động, dòng log `📡 MCP server ready at /mcp — N routes in inventory` xác nhận danh sách đã được xây dựng.

Kiểm tra bằng MCP Inspector:

```bash
npx @modelcontextprotocol/inspector
```

Trong giao diện Inspector, trỏ đến `http://localhost:8084/mcp` và đặt header `Authorization` thành `Bearer cak_<prefix>.<secret>`. Hãy gọi `list_endpoints` trước; bạn sẽ thấy toàn bộ danh sách route. Sau đó, `api_call({ method: "GET", path: "/membership/people" })` sẽ trả về những người mẫu trong dữ liệu seed cục bộ của bạn.

## Bố cục mã

Máy chủ MCP nằm tại `src/modules/mcp/` trong repo Api. Các tệp đáng chú ý:

| Tệp | Mục đích |
|---|---|
| `McpController.ts` | `@controller("/mcp")`; tạo `StreamableHTTPServerTransport` cho mỗi yêu cầu và gửi thử thách `WWW-Authenticate` khi trả về 401 |
| `WellKnownController.ts` / `OAuthMetadata.ts` | Phục vụ các tài liệu khám phá OAuth trong `/.well-known` |
| `McpServer.ts` | Xây dựng một `Server` MCP và đăng ký bốn công cụ |
| `RouteInventory.ts` | Duyệt metadata inversify-express-utils khi khởi động để liệt kê các route |
| `internalDispatch.ts` | `req`/`res` tổng hợp để gọi lại ứng dụng Express trong cùng tiến trình |
| `tools/` | `listEndpoints.ts`, `describeEndpoint.ts`, `apiCall.ts`, `describePageBuilder.ts` |
| `examples.ts` | Mẫu yêu cầu/phản hồi được chọn lọc cho các endpoint có lưu lượng cao |

## Liên quan

- [Khóa API](./api-keys.md)
- [Webhook](./webhooks.md)
- [Ứng dụng được kết nối (OAuth)](./connected-apps.md)
- [Claude: thiết lập cho người dùng cuối](/docs/b1-admin/integrations/claude)
- [ChatGPT: thiết lập cho người dùng cuối](/docs/b1-admin/integrations/chatgpt)
