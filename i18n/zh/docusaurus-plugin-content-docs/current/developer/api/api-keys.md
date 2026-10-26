---
title: "API 密钥"
---

# API 密钥

<div class="article-intro">

API 密钥（个人访问令牌）是从服务器端脚本、第三方连接器（Zapier、Make、Google Sheets）或任何不需要完整 OAuth 流程的场景中验证 B1 API 身份的最简单方式。密钥绑定到某个教会中的特定人员，并继承该人员的权限，同时可选择性地通过一组权限范围（scope）进行限制。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 具有**编辑设置**权限的教会管理员可以创建和管理密钥
- 原始密钥仅在创建时显示**一次**——请立即将其保存到安全的地方
- 所有 API 请求都必须使用 **HTTPS**

</div>

## 密钥格式

B1 API 密钥的格式如下：

```
cak_<prefix>.<secret>
```

- `cak_` —— 固定标识符（认证层用于匹配的 API 密钥前缀）
- `<prefix>` —— 8 个字符的公开查找段
- `<secret>` —— 48 个字符的密钥；服务器端仅存储 SHA-256 哈希值

完整密钥通过标准的 Bearer 请求头发送给服务器：

```http
Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7
```

API 认证层会将所有以 `cak_` 开头的令牌路由到 API 密钥处理流程，对密钥进行哈希运算，按前缀查找，并解析该密钥所属人员的当前权限——因此在 B1Admin 中撤销某项权限会在下一次请求时立即生效，密钥与角色之间也不会出现不同步的情况。

## 创建密钥（B1Admin）

1. 以具有**编辑设置**权限的用户身份登录 B1Admin。
2. 打开**设置 → 开发者 → API 密钥**。
3. 点击**新建 API 密钥**，为其取一个便于识别的名称（例如"Zapier —— 奉献同步"），选择密钥应具有的权限范围，然后点击**保存**。
4. 完整的 `cak_…` 密钥会在对话框中显示**一次**。请在关闭对话框之前将其复制到您集成的配置中——之后无法再次获取。您随时可以创建新的密钥。

## 权限范围（Scopes）

权限范围会**限制**密钥的能力——它永远无法授予底层人员不具备的权限。留空或不设置权限范围时，密钥将拥有该人员的全部权限。

| 权限范围 | 允许的操作 |
|---|---|
| `people:read` / `people:write` | 查看 / 编辑人员、家庭、小组成员 |
| `groups:read` / `groups:write` | 查看 / 编辑小组及其成员关系 |
| `donations:read` / `donations:write` | 查看 / 记录奉献 |
| `attendance:read` / `attendance:write` | 查看 / 记录出勤、场次、签到 |
| `forms:write` | 管理表单（读取权限已隐含在写入权限中） |
| `content:read` / `content:write` | 查看 / 编辑网站内容、报名、直播 |
| `messaging:read` / `messaging:write` | 读取消息；写入权限还允许发送短信 |
| `roles:read` / `roles:write` | 查看 / 编辑角色定义 |
| `settings:read` / `settings:write` | 查看 / 编辑教会设置（以编程方式注册 Webhook **必需**） |
| `workflows:read` / `workflows:write` | 查看工作流和任务 / 运行和编辑工作流。运行工作流可能会发送电子邮件和短信、触发 Webhook 以及更改小组成员关系 |
| `offline_access` | 允许使用长期有效的刷新令牌（仅适用于 OAuth 流程——对 API 密钥无效） |

`write` 权限范围隐含包含对应的 `read` 权限。服务器和域管理员权限被有意排除在权限范围之外——具有范围限制的凭据永远无法提升为网站管理员权限。

:::tip
如果您打算使用该密钥注册 Webhook（例如用于 Zapier 或 Make 集成），密钥需要 `settings:write` 权限。仅具有 `people:read` 权限的密钥在调用 `POST /membership/webhooks` 时会静默返回 403。
:::

## 使用密钥

与任何 Bearer 令牌相同——每个需要认证的端点都会像接受 JWT 一样接受 API 密钥：

```bash
curl https://api.churchapps.org/membership/people \
  -H "Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7"
```

如果请求所用密钥的权限范围不足，将返回 **403 Forbidden**，其格式与任何权限拒绝错误相同。

## 通过 API 管理密钥

所有端点都位于 Membership 模块的 `/membership/apiKeys` 路径下，并且需要 JWT（而非 API 密钥），且调用者必须是具有**编辑设置**权限的教会管理员。

| 方法和路径 | 用途 |
|---|---|
| `GET /membership/apiKeys` | 列出教会的密钥（不包含密钥本身——仅返回 `id`、`name`、`prefix`、`scopes`、`lastUsedAt`、`expiresAt`、`createdAt`） |
| `GET /membership/apiKeys/scopes` | 列出所有可用的权限范围名称——用于密钥创建界面 |
| `POST /membership/apiKeys` | 创建新密钥。请求体：`{ "name": "...", "scopes": ["people:read"] }`。响应中会包含原始的 `cak_…` 密钥，且仅返回**一次**。 |
| `DELETE /membership/apiKeys/:id` | 撤销密钥——在下一次请求时生效 |

已撤销的密钥会立即失效——没有宽限期。

## 最佳实践

- **每个集成使用一个密钥。** 如果某个密钥泄露，您只需撤销该密钥，而不会影响其他集成。
- **尽量使用满足需求的最小权限范围。** Google Sheets 导出只需要 `people:read`，无需 `settings:write`。
- **将密钥绑定到服务账户，而非真实的工作人员。** 如果工作人员离职，其 B1 访问权限会结束，并且以其身份创建的所有密钥也会随之失效。
- **将密钥存储在密钥管理器中**（例如托管服务商的环境变量、AWS Secrets Manager 等）——切勿存入源代码控制系统。
- **如果怀疑密钥已泄露，请轮换密钥：** 创建新密钥，更新集成配置，然后删除旧密钥。

## 与 OAuth 的区别

当**您的教会是唯一使用该集成的教会**时，API 密钥是合适的选择。对于需要在每个教会明确同意的情况下访问多个教会数据的连接器——例如在 B1 社区中共享的 SaaS 应用——请改用 [OAuth 与已连接应用](./connected-apps)。

| | API 密钥 | OAuth |
|---|---|---|
| 由谁安装 | 一位教会管理员 | 每位教会管理员授权应用 |
| 认证请求头 | `Authorization: Bearer cak_…` | `Authorization: Bearer <jwt>` |
| 令牌有效期 | 直至被撤销 | 访问令牌约 7 天，刷新令牌约 90 天 |
| 最适合 | 内部脚本、Zapier/Make/Sheets 连接器 | 多租户第三方应用 |
