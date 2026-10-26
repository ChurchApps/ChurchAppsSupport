---
title: "身份验证与权限"
---

# 身份验证与权限

<div class="article-intro">

ChurchApps API 使用基于 JWT 的身份验证。用户登录后会获得一个令牌，其中编码了其身份、教会成员资格和权限。本页介绍身份验证流程、权限模型以及 OAuth 支持。

</div>

## 登录流程

### 标准登录

```
POST /membership/users/login
```

**认证：** 公开

接受以下三种凭据类型之一：

| 字段 | 说明 |
|-------|-------------|
| `email` + `password` | 标准的邮箱/密码登录 |
| `jwt` | 使用已有的 JWT 重新认证 |
| `authGuid` | 一次性认证链接（用于欢迎邮件和重置密码邮件） |

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

`token` 字段是一个 JWT，后续请求应以 `Authorization: Bearer <token>` 的形式发送。

### 令牌内容

JWT 中编码了以下内容：
- `id` — 用户 ID
- `churchId` — 当前选择的教会
- `personId` — 所选教会中对应的人员记录
- 按 API 划分的权限数组

### 教会选择

用户可能属于多个教会。登录响应中包含所有教会及其权限。若要切换教会，客户端需根据登录响应中的数据，为其他教会生成一个新的 JWT。

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

创建一个带有临时密码的用户，并发送包含认证链接的欢迎邮件。新实例上注册的第一个用户将自动获得服务器管理员权限。

接受两个可选的机器人拦截字段：`website`（隐藏的蜜罐字段，真实用户会将其留空）和 `fillMs`（表单打开的时长，单位为毫秒）。如果填写了 `website`，或 `fillMs` 小于 2000，则不会创建账户，但接口仍会返回正常的 `200` 响应，使机器人无法判断自己已被拒绝。同时省略这两个字段的客户端可正常注册。

### 注册新教会

```
POST /membership/churches/add
```

**认证：** JWT

注册用户后，调用此接口创建教会并将该用户与其关联。

## 密码管理

| 方法 | 路径 | 认证 | 说明 |
|--------|------|------|-------------|
| POST | `/membership/users/forgot` | Public | 发送密码重置邮件。请求体：`{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Public | 使用重置邮件中的认证 GUID 设置新密码。请求体：`{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | 修改当前用户的密码。请求体：`{ "newPassword": "..." }` |

## 权限模型

权限按模块组织，并通过角色分配给用户。每项权限都有一个**内容类型**和一个**操作**。

### 权限参考

| 显示分组 | 内容类型 | 操作 | 说明 |
|----------------|--------------|--------|-------------|
| **考勤** | 考勤 | 签到 | 在服务中为成员签到 |
| | 考勤 | 编辑 | 编辑考勤记录 |
| | 服务 | 编辑 | 管理服务和服务时间 |
| | 考勤 | 查看 | 查看考勤记录 |
| | 考勤 | 查看汇总 | 查看考勤汇总和报表 |
| **奉献** | 奉献 | 编辑 | 创建和编辑奉献记录 |
| | 设置 | 编辑 | 编辑奉献/支付设置 |
| | 奉献 | 查看汇总 | 查看奉献汇总报表 |
| | 奉献 | 查看 | 查看单笔奉献记录 |
| **人员与小组** | 表单 | 管理 | 完整的表单管理 |
| | 表单 | 编辑 | 编辑表单定义 |
| | 计划 | 编辑 | 编辑服务计划 |
| | 小组成员 | 编辑 | 添加/移除小组成员 |
| | 小组 | 编辑 | 创建和编辑小组 |
| | 家庭 | 编辑 | 编辑家庭分配 |
| | 人员 | 编辑 | 编辑任意人员记录 |
| | 人员 | 编辑本人 | 仅编辑自己的人员记录 |
| | 角色 | 编辑 | 管理角色和用户分配 |
| | 小组成员 | 查看 | 查看小组成员列表 |
| | 人员 | 查看成员 | 仅查看成员（不包括访客） |
| | 人员 | 查看 | 查看所有人员 |
| | 角色 | 查看 | 查看角色和分配情况 |
| | 设置 | 编辑 | 编辑教会设置 |
| **内容** | 内容 | 编辑 | 编辑页面、板块、元素 |
| | 设置 | 编辑 | 编辑内容设置 |
| | 直播服务 | 编辑 | 管理直播服务配置 |
| | 聊天 | 主持 | 主持/管理聊天会话 |
| **消息** | 短信 | 发送 | 发送短信 |

### 权限检查方式

在控制器中，使用 `au.checkAccess()` 方法检查权限：

```typescript
// Require specific permission
if (!au.checkAccess(Permissions.people.edit)) return this.json({}, 401);

// Or within actionWrapper — the CRUD system checks automatically
crudSettings: {
  permissions: {
    view: Permissions.people.view,
    edit: Permissions.people.edit
  }
}
```

### 服务器管理员

`Server.Admin` 权限可授予对所有教会的完全访问权限。该权限会分配给第一个注册的用户，也可以通过服务器管理员角色授予其他用户。

## OAuth 2.0

API 支持第三方集成的 OAuth 2.0。提供两种授权类型。

### 授权码流程

1. **授权：** `POST /membership/oauth/authorize`（需要 JWT）
   - 请求体：`{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "...", "code_challenge": "...", "code_challenge_method": "S256" }`
   - 对于没有密钥的公共客户端，`code_challenge` / `code_challenge_method`（PKCE，仅支持 `S256`）为必填项
   - 返回：`{ "code": "...", "state": "..." }`

2. **用授权码换取令牌：** `POST /membership/oauth/token`（公开）
   - 请求体：`{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "...", "code_verifier": "..." }`
   - 若授权步骤使用了 `code_challenge`，则需发送 `code_verifier`；公共客户端省略 `client_secret`。接受 JSON 或表单编码的请求体
   - 返回：`{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **刷新令牌：** `POST /membership/oauth/token`（公开）
   - 请求体：`{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

访问令牌在 **12 小时** 后过期。

### 设备码流程（RFC 8628）

适用于没有浏览器的设备（电视应用、自助终端）：

1. **请求设备码：** `POST /membership/oauth/device/authorize`（公开）
   - 请求体：`{ "client_id": "...", "scope": "..." }`
   - 返回：`{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **用户在验证 URI 处输入代码**，并选择批准或拒绝

3. **轮询获取令牌：** `POST /membership/oauth/token`（公开）
   - 请求体：`{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - 在获得批准之前返回 `authorization_pending`，批准后返回访问令牌

### OAuth 客户端管理

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | 列出所有 OAuth 客户端 |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | 按 ID 获取客户端 |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | 按客户端 ID 获取客户端（密钥已隐藏） |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | 创建或更新客户端 |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | 删除客户端 |
| POST | `/membership/oauth/register` | Public | — | 为 MCP 连接器等公共客户端提供动态客户端注册（RFC 7591）。请参阅 [已连接应用](../connected-apps#dynamic-client-registration) |

### 设备审批接口

| 方法 | 路径 | 认证 | 说明 |
|--------|------|------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | 获取待审批的设备码信息，用于审批界面 |
| POST | `/membership/oauth/device/approve` | JWT | 批准设备授权。请求体：`{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | 拒绝设备授权。请求体：`{ "user_code": "..." }` |

## 公开接口与需认证接口

API 使用两个包装函数来决定认证要求：

- **`actionWrapper`** —— 需要有效的 JWT。已认证的用户对象（`au`）可用，其包含 `churchId`、`userId` 以及权限检查功能。
- **`actionWrapperAnon`** —— 无需认证。用于登录、注册、公开内容查询和 Webhook 接收端。

在本文档的各接口表格中，这两者分别在「认证」列中标注为 **JWT** 和 **Public**。

## 相关页面

- [模块结构](../module-structure) —— 控制器、仓库和模型的组织方式
- [本地环境搭建](../local-setup) —— 在本地运行 API 进行开发
