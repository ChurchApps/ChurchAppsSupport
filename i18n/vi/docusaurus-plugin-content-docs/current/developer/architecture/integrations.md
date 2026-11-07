---
title: "Bề mặt tích hợp & mở rộng"
description: "Bản đồ mọi cách kết nối với B1 của ChurchApps: REST API, khóa API, OAuth, webhook, MCP và nhà cung cấp nội dung, kèm liên kết tới từng tài liệu."
---

# Bề mặt tích hợp & mở rộng

<div class="article-intro">

Mọi thứ mà bên thứ ba có thể kết nối đều đi qua một API và một mô hình ủy quyền duy nhất. Trang này là bản đồ: nó nêu tên mọi bề mặt tích hợp, cho thấy chúng kết nối với nhau như thế nào, và liên kết đến tài liệu chi tiết cho từng bề mặt. Nếu bạn đang xây dựng trên B1, hãy bắt đầu ở đây để chọn đúng cửa, rồi theo liên kết đến trang mô tả chi tiết cửa đó.

</div>

## Các bề mặt tổng quan

Có sáu cách để đi vào hoặc đi ra, và tất cả đều dùng chung một lớp xác thực:

- **[REST API](../api/api-keys.md)** — toàn bộ bề mặt sản phẩm, có thể gọi bằng bearer token từ bất kỳ ngôn ngữ nào.
- **[API keys](../api/api-keys.md)** — thông tin xác thực đơn giản nhất: một token `cak_…` gắn với một người trong một nhà thờ.
- **[OAuth 2.0 & Connected Apps](../api/connected-apps.md)** — sự đồng ý theo từng nhà thờ cho các ứng dụng đa thuê; cấp cùng loại JWT mà người dùng nhận được.
- **[Webhooks](../api/webhooks.md)** — sự kiện đi ra có chữ ký, được gửi bền vững.
- **[MCP server](../api/mcp.md)** — lớp bọc hướng AI trên REST API tại `/mcp`.
- **[Content providers](../freeplay-content-provider.md)** — đường nội dung đi vào để đưa thư viện media bên ngoài vào FreePlay và các ứng dụng B1.

Mọi thứ ngoại trừ content providers đều được phục vụ bởi một API nguyên khối duy nhất (repository [Api](https://github.com/ChurchApps/Api)), trong đó các module được gắn dưới các base path ổn định — `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting` và `/mcp`.

## Cách các phần kết nối với nhau

```
   ┌─────────────────────┐                          ┌───────────────────────────────────────┐
   │  Third-party app     │   Bearer  cak_… / JWT    │              B1 API (Api)              │
   │  · server / SaaS     │ ───────────────────────▶ │  ┌─────────────────────────────────┐  │
   │  · Zapier / Make     │                          │  │ CustomAuthProvider.getUser()    │  │
   │  · Google Sheets     │                          │  │   cak_ key ─┐                    │  │
   │  · CLI / scripts     │                          │  │   OAuth JWT ┴▶ Principal          │  │
   │  · AI client (MCP)   │ ─── POST /mcp ──────────▶ │  │   scopes filter → permissions[] │  │
   └─────────────────────┘                          │  └────────────────┬────────────────┘  │
             ▲                                        │                   ▼                    │
             │                                        │  API modules: /membership /giving     │
             │        signed JSON POST                │  /attendance /content /messaging …    │
             │   (person / donation / group / …)      │                   │                    │
             └──────────── webhooks ◀─────────────────┼─ shared/webhooks/WebhookDispatcher     │
                     (durable, HMAC-SHA256 signed)     └───────────────────────────────────────┘

   External content sources (Planning Center, Dropbox, Life.Church, CBN, …)
             │   OAuth PKCE / device flow / none   ──  B1 is the OAuth *client* here  ──▶
             ▼
   Packages/content-providers   ──▶   FreePlay / B1 apps        (inbound content path)
```

Ba mũi tên kể toàn bộ câu chuyện: một bên thứ ba **gọi vào** bằng bearer token (API key hoặc OAuth JWT, kể cả qua `/mcp`); API **gọi ngược ra** qua webhook có chữ ký; và content providers là đường **nội dung đi vào** duy nhất, nơi chính B1 đóng vai trò OAuth client để kéo media từ một nguồn bên ngoài.

## Mô hình xác thực dùng chung

Mọi thông tin xác thực — JWT đăng nhập của người dùng, access token OAuth hoặc API key — đều được phân giải thành cùng một **`Principal`** và được kiểm tra theo cùng một cách. Không tồn tại đường xác thực "tích hợp" riêng biệt; một thông tin xác thực có phạm vi giới hạn đơn giản là không thể phân biệt với một người dùng có đặc quyền thấp hơn.

### Cấu trúc JWT

Access token của B1 là JWT HS256 được tạo trong `Api/src/modules/membership/auth/AuthenticatedUser.ts`. Tập claim như sau:

| Claim | Ý nghĩa |
|---|---|
| `id`, `email`, `firstName`, `lastName` | Người đứng sau token |
| `churchId` | Nhà thờ duy nhất mà token này hoạt động trong — điểm neo cho mọi phạm vi dữ liệu |
| `personId` | Bản ghi người trong nhà thờ đó |
| `permissions` | Mảng phẳng các chuỗi quyền RBAC (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Thành viên và vai trò lãnh đạo nhóm, phục vụ các kiểm tra theo phạm vi nhóm |
| `membershipStatus` | Khách hay thành viên, để kiểm soát quyền tự phục vụ |

Access token OAuth có cấu trúc giống hệt JWT đăng nhập. Khác biệt duy nhất là mảng `permissions` của nó đã được **lọc qua các scope được cấp trước khi ký** (`getCombinedApiJwt(...)`).

### Phạm vi theo từng nhà thờ

`churchId` là một claim của token, không phải tham số yêu cầu, nên một thông tin xác thực không bao giờ có thể truy cập dữ liệu của nhà thờ khác. Mọi truy vấn repository đều lọc theo `churchId` của người gọi; một API key hoặc token OAuth được gắn với đúng một nhà thờ tại thời điểm tạo.

### Quyền dựa trên vai trò tại ranh giới

Controller chặn hành động bằng `au.checkAccess(contentType, action)`, đối chiếu với mảng `permissions` của token. Scope là **bộ lọc, không bao giờ là quyền được cấp** (`Api/src/shared/auth/Scopes.ts`): `SCOPE_CATALOG` ánh xạ mỗi scope (ví dụ `people:read`, `donations:write`) tới các cặp RBAC mà nó cho phép, và `filterPermissionsByScopes()` giao kết quả này với quyền *hiện tại* của người dùng ở mỗi lần phân giải. Hệ quả:

- Thu hồi một quyền trong B1Admin sẽ cắt quyền truy cập của thông tin xác thực ở yêu cầu tiếp theo — token không bao giờ lệch khỏi vai trò.
- Một scope chỉ có thể *loại bỏ* quyền, nên thông tin xác thực có phạm vi không bao giờ có thể nâng lên quyền quản trị máy chủ hoặc miền (những quyền này được cố ý không ánh xạ tới scope nào).
- API key mang tiền tố `cak_`; `CustomAuthProvider.getUser()` phân nhánh theo tiền tố đó, băm secret, và phân giải lại RBAC trực tiếp của người sở hữu ở mỗi lần gọi.

Xem [API Keys → Scopes](../api/api-keys.md#scopes) để có danh mục đầy đủ.

## Tài liệu tham khảo các bề mặt

### REST API

Bề mặt sản phẩm đầy đủ. Mọi endpoint đã xác thực đều chấp nhận JWT hoặc API key `cak_…` trong header `Authorization: Bearer` — không có bảng route riêng chỉ dành cho key hay chỉ dành cho OAuth. Các module và base path của chúng nằm dưới `Api/src/modules/*`.

### API keys

Một personal access token dạng `cak_<prefix>.<secret>`, được tạo trong **B1Admin → Settings → Developer → API Keys**. Chỉ lưu hash SHA-256; khóa gốc chỉ hiển thị một lần. Được quản lý tại `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Phù hợp nhất cho script riêng của một nhà thờ và các connector như Zapier, Make và Google Sheets. → **[API Keys](../api/api-keys.md)**

### OAuth 2.0 & Connected Apps

Dành cho các ứng dụng đa thuê cần sự đồng ý của từng nhà thờ. Được triển khai trong `Api/src/modules/membership/controllers/OAuthController.ts` dưới `/membership/oauth`. Máy chủ hỗ trợ ba loại grant:

- **Authorization Code** — `POST /oauth/authorize` (đã xác thực) trả về một mã ngắn hạn; `POST /oauth/token` với `grant_type=authorization_code` đổi mã đó lấy access JWT (khoảng 7 ngày) cùng refresh token (khoảng 90 ngày). Client công khai (không có secret) phải dùng PKCE (chỉ `S256`): một `code_challenge` ở bước authorize và `code_verifier` tương ứng ở bước đổi token.
- **Device Code** (RFC 8628) — `POST /oauth/device/authorize` phát hành một `user_code`; người dùng phê duyệt trong B1Admin (`/oauth/device/approve`); thiết bị thăm dò `/oauth/token` bằng device-code grant. Dành cho TV, kiosk và CLI không có trình duyệt.
- **Refresh Token** — `grant_type=refresh_token` tạo access token mới; client công khai (không có secret) có thể bỏ qua secret.

Client công khai cũng có thể tự đăng ký qua `POST /oauth/register` (đăng ký client động theo RFC 7591); họ nhận được `client_id` và không có secret, và redirect URI của họ phải là `https` hoặc loopback.

**Connected App** là góc nhìn của quản trị viên nhà thờ đối với token đã được cấp, được liệt kê và có thể thu hồi tại `/membership/oauth/connections`. Controller cũng lưu trữ một cầu nối OAuth **relay-session** (`/oauth/relay/*`), cho phép thiết bị không có trình duyệt hoàn tất đăng nhập với một nhà cung cấp *bên ngoài*. → **[Connected Apps & OAuth](../api/connected-apps.md)**

### Webhooks

Bề mặt đi ra duy nhất. Một nhà thờ đăng ký một endpoint HTTPS công khai cho các sự kiện; khi có thay đổi khớp, `WebhookDispatcher.emit(churchId, event, payload)` bổ sung tên hiển thị (`personName`, `groupName`, `formName` — các tra cứu chỉ chạy khi có đăng ký khớp) vào payload chỉ có id, ghi nhận một lần gửi, và một worker nền POST một envelope JSON đã ký, có retry/backoff và gửi lại. Engine nằm tại `Api/src/shared/webhooks/`, CRUD theo nhà thờ nằm dưới `/membership/webhooks` (`WebhookController.ts`). Trường `connectorType` định hình lại body cho Slack và Discord; connector `mailchimp` đi xa hơn và tự quản lý toàn bộ trao đổi HTTP (method, URL và xác thực theo từng sự kiện với API của Mailchimp; thông tin xác thực được mã hóa trong `webhooks.connectorConfig`). → **[Webhooks](../api/webhooks.md)**

### MCP server

Một lớp bọc hướng AI tại `/mcp` (`Api/src/modules/mcp/`). Ba công cụ chung — `list_endpoints`, `describe_endpoint` và `api_call` — cung cấp toàn bộ bề mặt REST một cách động cho bất kỳ client MCP nào. Xác thực dùng cùng bearer token như mọi thứ khác. Với các client đăng nhập bằng OAuth (custom connector của claude.ai), phản hồi 401 từ `/mcp` mang header `WWW-Authenticate` trỏ đến `/.well-known/oauth-protected-resource`, và `/.well-known/oauth-authorization-server` quảng bá các endpoint `/membership/oauth`, đăng ký động, PKCE, cùng trang đồng ý `/oauth` của B1Admin (`WellKnownController.ts`, `OAuthMetadata.ts`). `api_call` đi lại vào stack Express trong cùng tiến trình, nên mọi quy tắc phân quyền và phạm vi nhà thờ vẫn được áp dụng. → **[MCP Server](../api/mcp.md)**

### Content providers

Đường nội dung đi vào, nằm trong package riêng `Packages/content-providers` (`@churchapps/content-providers`) thay vì trong API. Mỗi provider triển khai interface `IProvider` (`src/interfaces.ts`) — gồm `browse`, `getPlaylist`, `getInstructions` và các hook xác thực — và tự đăng ký vào registry kiểu `Map` (`src/providers/registry.ts`). Ở đây **B1 là OAuth client**: một provider khai báo `AuthType` là `none`, `oauth_pkce`, `device_flow` hoặc `form_login`, và các helper dùng chung (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) thực hiện luồng PKCE hoặc device phía client với nguồn bên ngoài. Hiện có mười một provider — bao gồm Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church và B1.church — cung cấp nội dung cho FreePlay và các ứng dụng B1. → **[FreePlay Content Provider](../freeplay-content-provider.md)**

**Year plans** chạy trên đường này. Một nhà xuất bản giáo trình (có quyền `lessons.edit`) duy trì các chuỗi tuần 1/2/3 có thứ tự trong trang quản trị Lessons.church (các bảng `yearPlans` / `yearPlanWeeks` của `LessonsApi`, với `startMonth` tùy chọn và `anchor` theo từng tuần là `easter` hoặc `christmas`). `GET /yearPlans/public` trên LessonsApi phục vụ các plan đang hoạt động một cách ẩn danh, và điền chương trình, nghiên cứu, địa điểm của mỗi tuần từ cây bài học. **B1Admin → Serving → Plans → Schedule Lesson → Apply Year Plan** dùng endpoint đó và ghi một plan DoingApi cho mỗi tuần được bao gồm (`providerId=lessonschurch`, `providerPlanId=/lessons/{programId}/{studyId}/{lessonId}/{venueId}`). Các plan có `startMonth` sẽ xác định các tuần neo theo năm đã chọn (Phục Sinh theo thuật toán computus Gregorian, Giáng Sinh là Chủ nhật trước hoặc đúng ngày 25 tháng 12) và điền các chuỗi tuần nằm giữa chúng; các plan không có `startMonth` vẫn ánh xạ tuần N tới `startDate + (N−1)×7` ngày. Các tuần từ provider OLF bên ngoài hoặc có đường dẫn chưa đầy đủ sẽ bị bỏ qua khi áp dụng; nhà thờ chỉnh sửa các plan được tạo ra như bất kỳ plan nào khác, và FreePlay phát bất cứ nội dung nào có trong plan.

## Tóm tắt

| Bề mặt | Cơ chế xác thực | Hướng | Nơi triển khai | Tài liệu tham khảo |
|---|---|---|---|---|
| REST API | JWT `Bearer` hoặc key `cak_…` | Đi vào | `Api/src/modules/*` | [API Keys](../api/api-keys.md) |
| API keys | Token `cak_` đã băm SHA-256 | Thông tin xác thực | `Api/.../membership/controllers/ApiKeyController.ts` | [API Keys](../api/api-keys.md) |
| OAuth 2.0 / Connected Apps | Auth code (PKCE) · device · refresh → JWT; đăng ký client động | Đi vào | `Api/.../membership/controllers/OAuthController.ts` | [Connected Apps](../api/connected-apps.md) |
| Webhooks | Secret theo từng hook, chữ ký HMAC-SHA256 | Đi ra | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhooks](../api/webhooks.md) |
| MCP server | JWT `Bearer`, OAuth JWT (khám phá qua `/.well-known`), hoặc key `cak_…` | Đi vào (AI) | `Api/src/modules/mcp/` | [MCP Server](../api/mcp.md) |
| Content providers | Theo từng provider: none / OAuth PKCE / device / form | Nội dung đi vào | `Packages/content-providers/` | [Content Provider](../freeplay-content-provider.md) |

## Các connector dựng sẵn

Thay vì mọi người tự xây dựng từ đầu, ChurchApps cung cấp các connector chạy trên các bề mặt ở trên:

- **[Slack & Discord](/docs/b1-admin/integrations/slack-discord)** — một `connectorType` cho webhook định hình lại envelope chuẩn thành tin nhắn chat; được cấu hình hoàn toàn trong B1Admin, không cần tài khoản bên thứ ba.
- **[Mailchimp](/docs/b1-admin/integrations/services/mailchimp)** — một `connectorType` `mailchimp` đồng bộ người dùng vào một audience của Mailchimp và ánh xạ thành viên nhóm hoặc danh sách thành thẻ (tag) (`Api/src/shared/webhooks/MailchimpConnector.ts`). Khác với các connector chat, nó tự gửi các yêu cầu có xác thực riêng cho mỗi sự kiện (upsert, archive, tag) thay vì POST đến URL do nhà thờ cung cấp; API key và audience id được mã hóa lưu trong `webhooks.connectorConfig`. Chỉ một chiều, chỉ dùng các merge field chuẩn.
- **[Zapier](/docs/b1-admin/integrations/zapier)** và **[Make](/docs/b1-admin/integrations/make)** — kích hoạt theo sự kiện webhook và thực hiện hành động qua REST API; chúng tự đăng ký webhook riêng khi một Zap hoặc scenario được bật (cần key có `settings:write`). Mã nguồn ứng dụng Zapier nằm trong repository `Integrations` dưới `zapier/` (Zapier CLI, triển khai bằng `zapier push`).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** — một add-on xác thực bằng API key, xuất People / Donations / Groups / Attendance theo yêu cầu.
- **[Claude](/docs/b1-admin/integrations/claude)** và **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — các client MCP trỏ đến `/mcp`.

Với mã của riêng bạn, **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) bao bọc toàn bộ phần trên: một REST client có kiểu dữ liệu, một OAuth client (auth-code / refresh / device flow), và trình xác minh webhook HMAC kèm middleware Express.

## Các trang liên quan

- [API Keys](../api/api-keys.md) — thông tin xác thực đơn giản nhất và danh mục scope
- [Connected Apps & OAuth](../api/connected-apps.md) — các luồng đồng ý đa thuê
- [Webhooks](../api/webhooks.md) — hệ thống sự kiện đi ra
- [MCP Server](../api/mcp.md) — lớp tích hợp AI
- [FreePlay Content Provider](../freeplay-content-provider.md) — trở thành nguồn nội dung đi vào
- [Integrations (end-user)](/docs/b1-admin/integrations/) — hướng dẫn thiết lập các connector dựng sẵn
