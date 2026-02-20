---
title: "认证与权限"
---

# 认证与权限

<div class="article-intro">

ChurchApps API 使用基于 JWT 的认证。用户登录后获得一个令牌，其中编码了用户身份、教会成员资格和权限。本页介绍认证流程、权限模型和 OAuth 支持。

</div>

## 登录流程

### 标准登录

```
POST /membership/users/login
```

**认证：** 公开

接受以下三种凭据类型之一：

| 字段 | 描述 |
|-------|-------------|
| `email` + `password` | 标准邮箱/密码登录 |
| `jwt` | 使用现有 JWT 重新认证 |
| `authGuid` | 一次性认证链接（用于欢迎/重置邮件） |

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

`token` 字段是一个 JWT，应在后续请求中作为 `Authorization: Bearer <token>` 发送。

### 令牌内容

JWT 编码了以下信息：
- `id` — 用户 ID
- `churchId` — 当前选择的教会
- `personId` — 所选教会的人员记录
- 各 API 的权限数组

### 教会选择

用户可能属于多个教会。登录响应包含所有教会及其权限。要切换教会，客户端从登录响应数据中生成一个限定到不同教会的新 JWT。

## 用户注册

### 注册新用户

```
POST /membership/users/register
```

**认证：** 公开

```json
{
  "email": "jane@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "appName": "B1 Admin",
  "appUrl": "https://app.b1.church"
}
```

创建一个带有临时密码的用户，并发送一封包含认证链接的欢迎邮件。在新实例上注册的第一个用户将自动获得服务器管理员权限。

### 注册新教会

```
POST /membership/churches/add
```

**认证：** JWT

注册用户后，调用此端点创建教会并将用户与之关联。

## 密码管理

| 方法 | 路径 | 认证 | 描述 |
|--------|------|------|-------------|
| POST | `/membership/users/forgot` | 公开 | 发送密码重置邮件。请求体：`{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | 公开 | 使用重置邮件中的认证 GUID 设置新密码。请求体：`{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | 更改当前用户的密码。请求体：`{ "newPassword": "..." }` |

## 权限模型

权限按模块组织，并通过角色分配给用户。每个权限有一个**内容类型**和一个**操作**。

### 权限参考

| 显示区域 | 内容类型 | 操作 | 描述 |
|----------------|--------------|--------|-------------|
| **出席** | Attendance | Checkin | 在礼拜中为成员签到 |
| | Attendance | Edit | 编辑出席记录 |
| | Services | Edit | 管理礼拜和礼拜时间 |
| | Attendance | View | 查看出席记录 |
| | Attendance | View Summary | 查看出席汇总和报告 |
| **捐赠** | Donations | Edit | 创建和编辑捐赠记录 |
| | Settings | Edit | 编辑捐赠/支付设置 |
| | Donations | View Summary | 查看捐赠汇总报告 |
| | Donations | View | 查看个人捐赠记录 |
| **人员和群组** | Forms | Admin | 完整的表单管理 |
| | Forms | Edit | 编辑表单定义 |
| | Plans | Edit | 编辑礼拜计划 |
| | Group Members | Edit | 添加/移除群组成员 |
| | Groups | Edit | 创建和编辑群组 |
| | Households | Edit | 编辑家庭分配 |
| | People | Edit | 编辑任何人员记录 |
| | People | Edit Self | 仅编辑自己的人员记录 |
| | Roles | Edit | 管理角色和用户分配 |
| | Group Members | View | 查看群组成员列表 |
| | People | View Members | 仅查看成员（不含访客） |
| | People | View | 查看所有人员 |
| | Roles | View | 查看角色和分配 |
| | Settings | Edit | 编辑教会设置 |
| **内容** | Content | Edit | 编辑页面、区块、元素 |
| | Settings | Edit | 编辑内容设置 |
| | StreamingServices | Edit | 管理流媒体服务配置 |
| | Chat | Host | 主持/管理聊天会话 |
| **消息** | Texting | Send | 发送短信 |

### 权限检查方式

在控制器中，使用 `au.checkAccess()` 方法检查权限：

```typescript
// 要求特定权限
if (!au.checkAccess(Permissions.people.edit)) return this.json({}, 401);

// 或在 actionWrapper 中 — CRUD 系统自动检查
crudSettings: {
  permissions: {
    view: Permissions.people.view,
    edit: Permissions.people.edit
  }
}
```

### 服务器管理员

`Server.Admin` 权限授予跨所有教会的完全访问权限。此权限分配给第一个注册用户，可以通过服务器管理员角色授予其他人。

## OAuth 2.0

API 支持 OAuth 2.0 用于第三方集成。提供两种授权类型。

### 授权码流程

1. **授权：** `POST /membership/oauth/authorize`（需要 JWT）
   - 请求体：`{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "..." }`
   - 返回：`{ "code": "...", "state": "..." }`

2. **用授权码换取令牌：** `POST /membership/oauth/token`（公开）
   - 请求体：`{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "..." }`
   - 返回：`{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **刷新令牌：** `POST /membership/oauth/token`（公开）
   - 请求体：`{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

访问令牌在 **12 小时**后过期。

### 设备码流程（RFC 8628）

适用于没有浏览器的设备（电视应用、自助终端）：

1. **请求设备码：** `POST /membership/oauth/device/authorize`（公开）
   - 请求体：`{ "client_id": "...", "scope": "..." }`
   - 返回：`{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **用户在验证 URI 输入代码**并批准或拒绝

3. **轮询获取令牌：** `POST /membership/oauth/token`（公开）
   - 请求体：`{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - 在获得批准前返回 `authorization_pending`，之后返回访问令牌

### OAuth 客户端管理

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | 列出所有 OAuth 客户端 |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | 按 ID 获取客户端 |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | 按客户端 ID 获取客户端（密钥已脱敏） |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | 创建或更新客户端 |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | 删除客户端 |

### 设备审批端点

| 方法 | 路径 | 认证 | 描述 |
|--------|------|------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | 获取待审批设备码信息以供审批界面使用 |
| POST | `/membership/oauth/device/approve` | JWT | 批准设备授权。请求体：`{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | 拒绝设备授权。请求体：`{ "user_code": "..." }` |

## 公开端点与认证端点

API 使用两个包装函数来确定认证要求：

- **`actionWrapper`** — 需要有效的 JWT。已认证用户对象（`au`）可用，包含 `churchId`、`userId` 和权限检查。
- **`actionWrapperAnon`** — 无需认证。用于登录、注册、公开内容查询和 Webhook 接收器。

在本文档的端点表中，认证列中分别用 **JWT** 和 **公开** 表示。

## 相关页面

- [模块结构](../module-structure) — 控制器、仓储和模型的组织方式
- [本地配置](../local-setup) — 在本地运行 API 进行开发
