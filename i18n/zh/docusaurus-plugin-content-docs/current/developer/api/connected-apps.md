---
title: "连接应用与 OAuth"
---

# 连接应用与 OAuth

<div class="article-intro">

B1 API 支持 OAuth 2.0 使第三方应用可以向每个教会管理员请求访问其数据的权限 -- 而无需教会共享密码或 API 密钥。**连接应用**是教会管理员批准的 OAuth 令牌；撤销它会一键切断第三方应用的访问。对多租户 SaaS 连接器使用此路径。对单个教会集成，优先使用 [API 密钥](./api-keys)。

</div>

<div class="prereqs">
<h4>开始前</h4>

- OAuth **客户端**必须被注册（当前由 B1 服务器管理员）在教会可以授予它访问权限之前
- 所有 OAuth 端点位于会员模块下：`/membership/oauth/...`
- 访问令牌是 JWT -- 它们携带用户的权限通过授予的范围过滤

</div>

## 概念

| 术语 | 含义 |
|---|---|
| **OAuth 客户端** | 第三方应用本身 -- 由 `client_id` 标识，由 `client_secret` 保护。与 B1 注册一次，在安装它的所有教会间共享。 |
| **连接应用** | 特定的 `(client, church-admin)` 对，其中管理员已授予客户端访问权限。每个连接应用由 OAuth 刷新令牌支持。 |
| **访问令牌** | 短期 JWT（≈ 7 天）客户端用于 API 调用。与用户 JWT 相同形状 -- `Authorization: Bearer <jwt>`。 |
| **刷新令牌** | 长期不透明字符串（≈ 90 天）客户端用来制造新访问令牌。 |
| **范围** | 缩小访问令牌能做什么 -- 查看 [范围目录](./api-keys#scopes)。 |

## 授权流

B1 支持三种 OAuth 流，都由 RFC 6749 + RFC 8628 定义。

### 授权代码（Web 应用）

当您的应用有服务器端组件且可以保持 `client_secret` 私有时使用。

1. **授权**

   ```http
   POST /membership/oauth/authorize
   Authorization: Bearer <user JWT>
   Content-Type: application/json

   { "client_id": "...", "redirect_uri": "https://app.example.com/cb",
     "response_type": "code", "scope": "people:read groups:read", "state": "xyz" }
   ```

   返回 `{ "code": "...", "state": "xyz" }`。授权代码端点故意是一个认证 POST -- 您的应用收集用户的 B1 JWT（通常通过在用户的 B1 会议中托管一个按钮）并将其作为同意步骤的一部分转发。

2. **交换代码换取令牌**

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "authorization_code", "code": "...",
     "client_id": "...", "client_secret": "...", "redirect_uri": "..." }
   ```

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

3. **刷新**当访问令牌即将过期时：

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "refresh_token", "refresh_token": "...",
     "client_id": "...", "client_secret": "..." }
   ```

   刷新令牌在 90 天不使用后过期；如果它过期，教会管理员重新授权。

### 设备代码（电视、自助服务机、CLI）

当设备没有浏览器时使用。由 RFC 8628 定义。

1. **请求设备代码**

   ```http
   POST /membership/oauth/device/authorize
   Content-Type: application/json

   { "client_id": "...", "scope": "content:read" }
   ```

   返回用户界面代码和轮询间隔：

   ```json
   { "device_code": "...", "user_code": "WXYZ-1234",
     "verification_uri": "https://app.b1.church/device",
     "expires_in": 900, "interval": 5 }
   ```

2. 向用户显示 `user_code` + `verification_uri`。

3. **轮询** `/membership/oauth/token` 带有 `grant_type=urn:ietf:params:oauth:grant-type:device_code` 和 `device_code`。标准响应：

   | 错误 | 含义 |
   |---|---|
   | `authorization_pending` | 用户还未批准 -- 继续按建议间隔轮询 |
   | `expired_token` | 设备代码超过 `expires_in` -- 重新开始 |
   | `access_denied` | 用户拒绝了请求 |
   | _（无 -- 200 OK）_ | 批准 -- 正文是一个 `B1TokenResponse` |

4. 一旦批准，存储 `refresh_token` 并使用 `access_token` 直到它过期。

B1 SDK 包括 `B1OAuthClient.awaitDeviceToken(...)` 为您用合理的 RFC 兼容退避运行轮询循环。

### 刷新令牌

在您保持 `refresh_token` 后总是作为独立请求可用：

```http
POST /membership/oauth/token
{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "..." }
```

新 `access_token` 和 `refresh_token` 回来。**公开客户端**（无 `client_secret`）可以在刷新时省略 `client_secret` -- 对无法保持密钥的移动/桌面 OAuth 应用有用。

## 令牌形状

访问令牌是 B1 发行的 JWT，与用户从 `POST /membership/users/login` 会得到的相同 -- 相同的模块权限声明，相同的 `checkAccess` 行为在每个控制器中 -- **除了**权限数组通过在铸造时授予的范围被过滤。有范围的访问令牌不能做任何相似范围的 API 密钥不能做的，并且没有单独的"OAuth 路径"在任何控制器中；`actionWrapper` 不知道 bearer 是一个人、API 密钥还是 OAuth 客户端。

## 连接应用（用户界面）

从教会管理员的观点，"连接应用"是已被授予对其教会访问权限的应用列表。每行是实时 `(OAuthClient, OAuthToken)` 对。

在 B1Admin：**设置 → 开发人员 → 连接应用**显示：

- 客户端的名称
- 管理员批准的范围
- 访问被授予的日期
- 一个**撤销**按钮

| 方法与路径 | 认证 | 用途 |
|---|---|---|
| `GET /membership/oauth/connections` | JWT | 列出调用者自己的活跃连接（与客户端名称 + 范围连接） |
| `DELETE /membership/oauth/connections/:id` | JWT | 通过其 OAuth 令牌 id 撤销一个连接 -- 令牌在下一个请求时停止工作 |

列表自动排除过期令牌。

## 范围与同意

范围字符串与 [API 密钥](./api-keys#scopes) 的相同目录。客户端的最佳实践：

- **请求有效的最窄范围。** 教会注意到如果您要求 `donations:write` 当您只需要读人员时。
- **使用刷新令牌加短期访问令牌。** 长期访问令牌更难快速撤销。
- **总是向用户呈现授予的范围**在您自己的 UI 中，所以他们可以验证他们同意了什么。

## OAuth 客户端管理

OAuth 客户端（第三方应用本身）当前由 B1 服务器管理员全球注册。按教会自助注册在路线图上 -- 直到那时，为了提供公开连接器，您联系 ChurchApps 团队来生成 `client_id` / `client_secret` 对并注册您的重定向 URI。

| 方法与路径 | 权限 | 描述 |
|---|---|---|
| `GET /membership/oauth/clients` | Server.Admin | 列出所有 OAuth 客户端 |
| `GET /membership/oauth/clients/clientId/:clientId` | — | 通过其公开 id 获取一个客户端（密钥编辑） |
| `POST /membership/oauth/clients` | Server.Admin | 创建或更新一个客户端 |
| `DELETE /membership/oauth/clients/:id` | Server.Admin | 删除一个客户端 |

## SDK 支持

`@churchapps/integration-sdk` 包用类型化的助手包裹每个 OAuth 流 -- `B1OAuthClient.exchangeCode()`、`.refresh()`、`.startDeviceFlow()`、`.pollDeviceToken()`、`.awaitDeviceToken()`。查看包 README 和 [Webhooks](./webhooks#sdk-support) 对端到端示例。
