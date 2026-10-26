---
title: "已连接应用与 OAuth"
---

# 已连接应用与 OAuth

<div class="article-intro">

B1 API 支持 OAuth 2.0，因此第三方应用可以向每位教会管理员请求访问其数据的许可——教会无需分享密码或 API 密钥。**已连接应用**是教会管理员已批准的 OAuth 令牌；撤销它只需单击一次即可切断第三方应用的访问权限。多租户 SaaS 连接器应使用此方式。对于单个教会的集成，建议优先使用 [API 密钥](./api-keys)。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 在教会授予访问权限之前，必须先注册 OAuth **客户端**——可由 B1 服务器管理员注册，或由客户端通过[动态注册](#dynamic-client-registration)自行注册
- 所有 OAuth 端点都位于 Membership 模块下：`/membership/oauth/...`
- 访问令牌为 JWT——它们携带用户的权限，并按授予的权限范围进行过滤

</div>

## 基本概念

| 术语 | 含义 |
|---|---|
| **OAuth 客户端** | 第三方应用本身——由 `client_id` 标识，由 `client_secret` 保护。一次性在 B1 注册，供所有安装该应用的教会共享。 |
| **已连接应用** | 特定的 `(客户端, 教会管理员)` 组合，即管理员已授予该客户端访问权限。每个已连接应用都由一个 OAuth 刷新令牌支撑。 |
| **访问令牌** | 客户端用于调用 API 的短期 JWT（约 7 天）。其结构与用户 JWT 相同——`Authorization: Bearer <jwt>`。 |
| **刷新令牌** | 客户端用于获取新访问令牌的长期不透明字符串（约 90 天）。 |
| **权限范围（Scope）** | 限制访问令牌的能力范围——参见[权限范围目录](./api-keys#scopes)。 |

## 授权流程

B1 支持三种 OAuth 流程，均由 RFC 6749 和 RFC 8628 定义。

### 授权码模式（Web 应用）

适用于应用具有服务器端组件并能够妥善保管 `client_secret` 的情况。

1. **授权**

   ```http
   POST /membership/oauth/authorize
   Authorization: Bearer <user JWT>
   Content-Type: application/json

   { "client_id": "...", "redirect_uri": "https://app.example.com/cb",
     "response_type": "code", "scope": "people:read groups:read", "state": "xyz" }
   ```

   公共客户端（没有 `client_secret`）还必须发送 `"code_challenge": "..."` 和 `"code_challenge_method": "S256"`（PKCE，RFC 7636）。仅接受 `S256`。

   返回 `{ "code": "...", "state": "xyz" }`。授权码端点有意设计为需要认证的 POST 请求——您的应用会获取用户的 B1 JWT（通常是在用户的 B1 会话中托管一个按钮），并在授权同意步骤中将其转发。

2. **用授权码换取令牌**

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "authorization_code", "code": "...",
     "client_id": "...", "client_secret": "...", "redirect_uri": "..." }
   ```

   如果授权步骤发送了 `code_challenge`，则需要包含对应的 `"code_verifier": "..."`。公共客户端需发送 verifier 并省略 `client_secret`。令牌端点接受 JSON 或表单编码（`application/x-www-form-urlencoded`）格式的请求体。

   返回令牌响应：

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

3. **刷新**——当访问令牌即将过期时：

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "refresh_token", "refresh_token": "...",
     "client_id": "...", "client_secret": "..." }
   ```

   刷新令牌在 90 天未使用后过期；如已过期，教会管理员需要重新授权。

### 设备码模式（电视、自助终端、命令行）

适用于设备没有浏览器的情况。由 RFC 8628 定义。

1. **请求设备码**

   ```http
   POST /membership/oauth/device/authorize
   Content-Type: application/json

   { "client_id": "...", "scope": "content:read" }
   ```

   返回面向用户的代码和轮询间隔：

   ```json
   { "device_code": "...", "user_code": "WXYZ-1234",
     "verification_uri": "https://app.b1.church/device",
     "expires_in": 900, "interval": 5 }
   ```

2. 向用户显示 `user_code` 和 `verification_uri`。

3. 使用 `grant_type=urn:ietf:params:oauth:grant-type:device_code` 和 `device_code` **轮询** `/membership/oauth/token`。标准响应如下：

   | 错误 | 含义 |
   |---|---|
   | `authorization_pending` | 用户尚未批准——请按建议间隔继续轮询 |
   | `expired_token` | 设备码已超过 `expires_in`——请重新开始 |
   | `access_denied` | 用户拒绝了请求 |
   | _（无错误 —— 200 OK）_ | 已批准——响应体为 `B1TokenResponse` |

4. 批准后，保存 `refresh_token`，并在 `access_token` 过期前使用它。

B1 SDK 包含 `B1OAuthClient.awaitDeviceToken(...)`，可为您运行符合 RFC 规范的合理退避轮询循环。

### 刷新令牌

一旦您持有 `refresh_token`，即可随时作为独立请求使用：

```http
POST /membership/oauth/token
{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "..." }
```

将返回新的 `access_token` 和 `refresh_token`。**公共客户端**（没有 `client_secret`）在刷新时可以省略 `client_secret`——这对于无法保密密钥的移动端或桌面 OAuth 应用非常有用。

刷新令牌会轮换，但旧令牌不会立即作废。如果客户端从未收到刷新响应（例如电视在请求过程中断电或断网），它可以在最多 **7 天**内使用之前的 `refresh_token` 重试。只有当替换令牌尚未被使用时，重试才会成功；未使用的替换令牌随后会被丢弃，并签发一组全新的令牌。一旦替换令牌本身被刷新，旧令牌将返回 `invalid_grant`。撤销连接时也会撤销仍处于宽限期内的已轮换令牌，并且已连接应用列表中每个连接只会显示一次。

## 令牌结构

访问令牌是 B1 签发的 JWT，与用户通过 `POST /membership/users/login` 获得的令牌完全相同——具有相同的模块化权限声明，并且在每个控制器中都具有相同的 `checkAccess` 行为——**唯一的区别**是权限数组在签发时已经按授予的权限范围进行了过滤。范围受限的访问令牌所能执行的操作，与权限相似的 API 密钥完全一致；并且没有任何控制器存在单独的"OAuth 路径"——`actionWrapper` 并不关心请求方是个人、API 密钥还是 OAuth 客户端。

## 已连接应用（面向用户）

从教会管理员的角度来看，"已连接应用"是已获得其教会访问权限的应用列表。每一行都是一个有效的 `(OAuthClient, OAuthToken)` 组合。

在 B1Admin 中，**设置 → 开发者 → 已连接应用**会显示：

- 客户端名称
- 管理员批准的权限范围
- 获得访问权限的日期
- **撤销**按钮

| 方法和路径 | 认证 | 用途 |
|---|---|---|
| `GET /membership/oauth/connections` | JWT | 列出调用者自己的有效连接（关联客户端名称和权限范围） |
| `DELETE /membership/oauth/connections/:id` | JWT | 通过 OAuth 令牌 ID 撤销连接——令牌将在下一次请求时失效 |

列表会自动排除已过期的令牌。

## 权限范围与同意

权限范围字符串与 [API 密钥](./api-keys#scopes)的目录相同。客户端的最佳实践如下：

- **请求满足需求的最小权限范围。** 如果您只需要读取人员信息，却请求 `donations:write`，教会会注意到这一点。
- **使用刷新令牌加短期访问令牌。** 长期有效的访问令牌更难以快速撤销。
- **始终在您自己的界面中将已授予的权限范围展示给用户**，以便他们核实自己同意了哪些内容。

## OAuth 客户端管理

OAuth 客户端（即第三方应用本身）是全局注册的。带有 `client_secret` 的机密客户端由 B1 服务器管理员创建——如需发布，请联系 ChurchApps 团队获取 `client_id` / `client_secret` 配对，并注册您的重定向 URI。MCP 连接器等公共客户端可以自行注册（见下文）。

已注册的重定向 URI 必须与请求中的 `redirect_uri` 完全匹配；前缀匹配或部分匹配将被拒绝。

| 方法和路径 | 权限 | 描述 |
|---|---|---|
| `GET /membership/oauth/clients` | Server.Admin | 列出所有 OAuth 客户端 |
| `GET /membership/oauth/clients/clientId/:clientId` | — | 通过公开 ID 获取客户端（密钥已隐藏） |
| `POST /membership/oauth/clients` | Server.Admin | 创建或更新客户端 |
| `DELETE /membership/oauth/clients/:id` | Server.Admin | 删除客户端 |

### 动态客户端注册

`POST /membership/oauth/register`（公开，RFC 7591）允许 claude.ai 的 MCP 连接器等客户端自行注册。该端点通过 API 的 `/.well-known/oauth-authorization-server` 文档进行公布——参见 [MCP 服务器 → OAuth 发现](./mcp#oauth-discovery)。

```http
POST /membership/oauth/register
Content-Type: application/json

{ "client_name": "My AI assistant", "redirect_uris": ["https://assistant.example.com/oauth/callback"], "scope": "people:read" }
```

返回 201，包含 `client_id`、`client_id_issued_at`、`client_name`、`redirect_uris`、`grant_types`（`authorization_code`、`refresh_token`）、`response_types`（`code`）以及 `token_endpoint_auth_method: "none"`。

- 永远不会签发密钥，因此客户端在每次授权时都必须使用 PKCE。
- `redirect_uris` 必须是 1–10 个 `https` URL，或者是 `localhost`、`127.0.0.1` 或 `[::1]` 上的 `http` URL。
- `client_name` 会被截断至 45 个字符（默认为 "AI assistant"）。
- 每个 IP 每小时最多允许 20 次注册。

在 B1Admin 的同意页面上，自行注册的客户端会显示一条通知，说明其为自行注册，其权限永远不会超过用户自己的 B1 账户，并且可以在**设置 → 开发者 → 已连接应用**中断开连接。

## SDK 支持

`@churchapps/integration-sdk` 包为每个 OAuth 流程提供了类型化的辅助方法——`B1OAuthClient.exchangeCode()`、`.refresh()`、`.startDeviceFlow()`、`.pollDeviceToken()`、`.awaitDeviceToken()`。端到端示例请参见该包的 README 以及 [Webhooks](./webhooks#sdk-support)。
