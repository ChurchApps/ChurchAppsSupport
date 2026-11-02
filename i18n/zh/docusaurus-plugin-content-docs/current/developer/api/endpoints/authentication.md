---
title: "身份验证与权限"
---

# 身份验证与权限

<div class="article-intro">

ChurchApps API 使用基于 JWT 的身份验证。用户登录后会获得一个令牌，该令牌编码了其身份、教会归属和权限。本页介绍身份验证流程、权限模型以及 OAuth 支持。

</div>

## 登录流程

### 标准登录

```
POST /membership/users/login
```

**Auth（身份验证）：** Public（公开）

接受以下三种凭据类型之一：

| 字段 | 说明 |
|-------|-------------|
| `email` + `password` | 标准的电子邮件/密码登录 |
| `jwt` | 使用现有的 JWT 重新验证身份 |
| `authGuid` | 一次性身份验证链接（用于欢迎邮件和重置密码邮件） |

**响应：**

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

`token` 字段是一个 JWT，之后的请求应以 `Authorization: Bearer <token>` 的形式发送。

### 两步登录 {#two-factor-sign-in}

用户可以开启基于身份验证器应用的（TOTP）两步登录。对于这些用户，使用 `email` + `password`、`authGuid` 或 SSO 登录时，不会直接返回令牌，而是返回一个验证挑战：

```json
{ "mfaRequired": true, "mfaToken": "<challenge-token>" }
```

挑战令牌的有效期为 5 分钟。请将其连同验证码一并回传到同一端点：

```json
{ "mfaToken": "<challenge-token>", "mfaCode": "123456" }
```

`mfaCode` 可以是当前的 6 位身份验证器验证码，也可以是用户十个一次性备用代码之一。验证码错误会返回 `Invalid code`，并且对每个账号的重复失败次数会进行速率限制。使用 `jwt` 重新登录时永远不会要求验证，因此现有会话可以持续刷新。登录响应中的 `user` 对象包含 `mfaEnabled` 字段。

自助服务端点（仅限已登录用户，位于 `/membership/users/mfa` 下）：

| 端点 | 说明 |
|----------|-------------|
| `GET /status` | `{ enabled, backupCodesLeft }` |
| `POST /setup` | 开始设置；返回用于二维码的 `{ secret, otpauthUrl }` |
| `POST /enable` | 请求体 `{ code }`；开启两步登录，并仅返回一次 `{ backupCodes }` |
| `POST /disable` | 请求体 `{ code }`（身份验证器验证码或备用代码）；关闭两步登录 |
| `POST /reset/:userId` | 仅限 Server.Admin；为其他用户关闭两步登录 |

密钥以加密形式存储，备用代码以哈希形式存储。开启、关闭和重置操作都会写入审计日志。

### 令牌内容

JWT 编码了以下内容：
- `id` —— 用户 ID
- `churchId` —— 当前所选的教会
- `personId` —— 所选教会中的人员记录
- 各 API 的权限数组

### 教会选择

用户可能同时属于多个教会。登录响应会包含所有教会及其对应的权限。若要切换教会，客户端会根据登录响应中的数据，生成一个限定于另一教会的新 JWT。

## 用户注册

### 注册新用户

```
POST /membership/users/register
```

**Auth（身份验证）：** Public（公开）

```json
{
  "email": "jane@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "appName": "B1 Admin",
  "appUrl": "https://app.b1.church"
}
```

该接口会创建一个带有临时密码的用户，并发送一封包含身份验证链接的欢迎邮件。在新实例上注册的第一个用户将自动被授予服务器管理员权限。

接口接受两个可选的机器人陷阱字段：`website`（一个隐藏的蜜罐字段，真实用户会将其留空）和 `fillMs`（表单被打开的时长，单位为毫秒）。如果填写了 `website`，或 `fillMs` 小于 2000，则不会创建账号，但接口仍会返回一个看似正常的 `200`，使机器人无法判断自己已被拒绝。同时省略这两个字段的客户端会正常注册。

### 注册新教会

```
POST /membership/churches/add
```

**Auth（身份验证）：** JWT

注册用户后，调用此端点即可创建教会，并将该用户与之关联。

## 密码管理

| 方法 | 路径 | 身份验证 | 说明 |
|--------|------|------|-------------|
| POST | `/membership/users/forgot` | Public | 发送密码重置邮件。请求体：`{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Public | 使用重置邮件中的身份验证 GUID 设置新密码。请求体：`{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | 更改当前用户的密码。请求体：`{ "newPassword": "..." }` |

## 权限模型

权限按模块组织，并通过角色分配给用户。每项权限都包含一个**内容类型（content type）**和一个**操作（action）**。

### 权限参考

| 显示分组 | 内容类型 | 操作 | 说明 |
|----------------|--------------|--------|-------------|
| **Attendance**（出勤） | Attendance | Checkin | 在礼拜中为成员签到 |
| | Attendance | Edit | 编辑出勤记录 |
| | Services | Edit | 管理礼拜和礼拜时间 |
| | Attendance | View | 查看出勤记录 |
| | Attendance | View Summary | 查看出勤汇总和报表 |
| **Donations**（奉献） | Donations | Edit | 创建和编辑奉献记录 |
| | Settings | Edit | 编辑奉献/付款设置 |
| | Donations | View Summary | 查看奉献汇总报表 |
| | Donations | View | 查看单笔奉献记录 |
| **People and Groups**（人员与小组） | Forms | Admin | 完整的表单管理 |
| | Forms | Edit | 编辑表单定义 |
| | Plans | Edit | 编辑服事计划 |
| | Group Members | Edit | 添加/移除小组成员 |
| | Groups | Edit | 创建和编辑小组 |
| | Households | Edit | 编辑家庭分配 |
| | People | Edit | 编辑任何人员记录 |
| | People | Edit Self | 仅编辑你自己的人员记录 |
| | Roles | Edit | 管理角色和用户分配 |
| | Group Members | View | 查看小组成员名单 |
| | People | View Members | 仅查看会员（不含访客） |
| | People | View | 查看所有人员 |
| | Roles | View | 查看角色和分配情况 |
| | Settings | Edit | 编辑教会设置 |
| **Content**（内容） | Content | Edit | 编辑页面、区块、元素 |
| | Settings | Edit | 编辑内容设置 |
| | StreamingServices | Edit | 管理直播服务配置 |
| | Chat | Host | 主持/管理聊天会话 |
| **Messaging**（消息） | Texting | Send | 发送短信 |

### 权限如何检查

在控制器中，使用 `au.checkAccess()` 方法检查权限：

```typescript
// 要求特定权限
if (!au.checkAccess(Permissions.people.edit)) return this.json({}, 401);

// 或在 actionWrapper 中——CRUD 系统会自动检查
crudSettings: {
  permissions: {
    view: Permissions.people.view,
    edit: Permissions.people.edit
  }
}
```

### 服务器管理员

`Server.Admin` 权限可授予跨所有教会的完整访问权限。它会分配给第一个注册的用户，也可以通过服务器管理员角色授予其他人。

## OAuth 2.0

API 支持 OAuth 2.0，用于第三方集成。提供两种授权类型。

### 授权码流程

1. **授权：** `POST /membership/oauth/authorize`（需要 JWT）
   - 请求体：`{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "...", "code_challenge": "...", "code_challenge_method": "S256" }`
   - 对于没有密钥的公开客户端，`code_challenge` / `code_challenge_method`（PKCE，仅支持 `S256`）为必填项
   - 返回：`{ "code": "...", "state": "..." }`

2. **用授权码换取令牌：** `POST /membership/oauth/token`（Public）
   - 请求体：`{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "...", "code_verifier": "..." }`
   - 如果授权步骤使用了 `code_challenge`，则需要发送 `code_verifier`；公开客户端省略 `client_secret`。接受 JSON 或表单编码的请求体
   - 返回：`{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **刷新令牌：** `POST /membership/oauth/token`（Public）
   - 请求体：`{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

访问令牌在 **12 小时**后过期。

### 设备码流程（RFC 8628）

适用于没有浏览器的设备（电视应用、自助机）：

1. **请求设备码：** `POST /membership/oauth/device/authorize`（Public）
   - 请求体：`{ "client_id": "...", "scope": "..." }`
   - 返回：`{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **用户在验证地址输入代码**，并选择批准或拒绝

3. **轮询获取令牌：** `POST /membership/oauth/token`（Public）
   - 请求体：`{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - 在获得批准之前返回 `authorization_pending`，批准后返回访问令牌

### OAuth 客户端管理

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | 列出所有 OAuth 客户端 |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | 根据 ID 获取客户端 |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | 根据客户端 ID 获取客户端（密钥已隐去） |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | 创建或更新客户端 |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | 删除客户端 |
| POST | `/membership/oauth/register` | Public | — | 面向 MCP 连接器等公开客户端的动态客户端注册（RFC 7591）。参见[已连接的应用](../connected-apps#dynamic-client-registration) |

### 设备批准端点

| 方法 | 路径 | 身份验证 | 说明 |
|--------|------|------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | 获取待处理设备码的信息，用于批准界面 |
| POST | `/membership/oauth/device/approve` | JWT | 批准设备授权。请求体：`{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | 拒绝设备授权。请求体：`{ "user_code": "..." }` |

## 公开端点与需身份验证端点

API 使用两个包装函数来决定身份验证要求：

- **`actionWrapper`** —— 需要有效的 JWT。已通过身份验证的用户对象（`au`）可用，包含 `churchId`、`userId` 和权限检查。
- **`actionWrapperAnon`** —— 无需身份验证。用于登录、注册、公开内容查询以及 webhook 接收器。

在本文档的各个端点表格中，身份验证列分别以 **JWT** 和 **Public** 标示这两类端点。

## 相关页面

- [模块结构](../module-structure) —— 控制器、仓储和模型的组织方式
- [本地设置](../local-setup) —— 在本地运行 API 进行开发
