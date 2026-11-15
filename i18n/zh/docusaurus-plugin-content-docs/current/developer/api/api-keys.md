---
title: "API 密钥"
description: "在 B1 管理后台中创建、限定范围和撤销 B1 API 密钥，用于服务器脚本以及 Zapier、Make 或 Google 表格连接器，无需完整的 OAuth 流程。"
---

# API 密钥

<div class="article-intro">

API 密钥（个人访问令牌）是从服务器端脚本、第三方连接器（Zapier、Make、Google 表格），或任何不需要完整 OAuth 流程的场景中对 B1 API 进行身份验证的最简单方式。密钥与某个教会中的特定人员绑定，并继承该人员的权限，同时可以通过可选的范围集合进一步限定。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 需要具备**编辑设置**权限的教会管理员才能创建和管理密钥
- 原始密钥仅在创建时显示**一次** -- 请立即将其保存到安全的位置
- 所有 API 请求都必须使用 **HTTPS**

</div>

## 密钥格式 {#key-format}

B1 API 密钥的格式如下：

```
cak_<prefix>.<secret>
```

- `cak_` -- 固定标识符（身份验证层用于匹配的 API 密钥前缀）
- `<prefix>` -- 8 个字符的公开查找段
- `<secret>` -- 48 个字符的密钥；服务器端仅存储其 SHA-256 哈希值

完整密钥通过标准的 Bearer 请求头发送至服务器：

```http
Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7
```

API 身份验证层会将任何以 `cak_` 开头的令牌路由到 API 密钥处理流程，对密钥部分进行哈希，按前缀查找密钥，并解析该密钥所属人员的当前权限 -- 因此在 B1Admin 中撤销某项权限会在下一次请求时立即生效，密钥也不会与角色产生偏差。

## 创建密钥（B1Admin） {#creating-a-key-b1admin}

1. 以具备**编辑设置**权限的用户身份登录 B1Admin。
2. 打开**设置 → 开发者 → API 密钥**。
3. 点击**新建 API 密钥**，为其设置一个易于识别的**名称**（例如"Zapier — 奉献同步"），至少选择一个该密钥应具备的**范围**，可选择设置**过期时间**（留空则密钥永不过期），然后点击**保存**。
4. 完整的 `cak_…` 密钥会在对话框中显示**一次**。请在关闭前将其复制到您的集成配置中 -- 之后无法再次获取。您随时都可以创建新的密钥。

## 范围 {#scopes}

范围用于**限定**密钥的功能 -- 它永远无法授予底层人员不具备的权限。没有范围（即无范围）意味着密钥拥有该人员的全部权限；B1Admin 始终要求至少选择一个范围，因此无范围的密钥只能通过 API 创建。

| 范围 | 允许的操作 |
|---|---|
| `people:read` / `people:write` | 查看 / 编辑人员、家庭、小组成员 |
| `groups:read` / `groups:write` | 查看 / 编辑小组及其成员资格 |
| `donations:read` / `donations:write` | 查看 / 记录奉献 |
| `attendance:read` / `attendance:write` | 查看 / 记录出勤、场次、签到 |
| `forms:write` | 管理表单（读取权限隐含在写入权限中） |
| `content:read` / `content:write` | 查看 / 编辑网站内容、报名、直播 |
| `messaging:read` / `messaging:write` | 读取消息；写入权限还允许发送短信 |
| `roles:read` / `roles:write` | 查看 / 编辑角色定义 |
| `settings:read` / `settings:write` | 查看 / 编辑教会设置（以程序方式注册 webhook **必需**） |
| `workflows:read` / `workflows:write` | 查看工作流和任务 / 运行和编辑工作流。运行工作流可能会发送电子邮件和短信、触发 webhook 以及更改小组成员资格 |
| `offline_access` | 允许长期有效的刷新令牌（仅适用于 OAuth 流程 -- 对 API 密钥无效） |

`write` 范围隐含包含对应的 `read` 范围。服务器和域管理员权限被有意不作为范围对外开放 -- 限定范围的凭据永远无法提升为站点管理员权限。

:::tip
如果您将使用该密钥注册 webhook（例如用于 Zapier 或 Make 集成），该密钥需要 `settings:write` 范围。仅有 `people:read` 范围的密钥调用 `POST /membership/webhooks` 时会静默返回 403。
:::

## 使用密钥 {#using-a-key}

与任何 Bearer 令牌相同 -- 每个需要身份验证的端点都会像接受 JWT 一样接受 API 密钥：

```bash
curl https://api.churchapps.org/membership/people \
  -H "Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7"
```

如果密钥的范围不足，请求将返回 **403 Forbidden**，其响应格式与任何权限拒绝错误相同。

## 通过 API 管理密钥 {#managing-keys-via-the-api}

所有端点都位于成员模块的 `/membership/apiKeys` 路径下，并且需要来自具备**编辑设置**权限的教会管理员的 JWT（而非 API 密钥）。

| 方法与路径 | 用途 |
|---|---|
| `GET /membership/apiKeys` | 列出教会的密钥（不含密钥本身 -- 仅包含 `id`、`name`、`prefix`、`scopes`、`lastUsedAt`、`expiresAt`、`createdAt`） |
| `GET /membership/apiKeys/scopes` | 列出所有可用的范围名称 -- 用于密钥创建界面 |
| `POST /membership/apiKeys` | 创建新密钥。请求体：`{ "name": "...", "scopes": ["people:read"] }`。响应中会包含原始的 `cak_…` 密钥，且仅返回**一次**。 |
| `DELETE /membership/apiKeys/:id` | 撤销密钥 -- 在下一次请求时生效 |

已撤销的密钥会立即失效 -- 没有宽限期。

## 最佳实践 {#best-practices}

- **每个集成使用一个密钥。** 如果某个密钥泄露，您只需撤销该密钥，而不会影响其他集成。
- **创建能满足需求的最小范围。** Google 表格导出只需要 `people:read`，而不需要 `settings:write`。
- **将密钥绑定到服务账户，而非真实的员工。** 如果员工离职，其 B1 访问权限即告终止 -- 以其身份创建的密钥也会随之失效。
- **将密钥存储在密钥管理器中**（托管服务商的环境变量、AWS Secrets Manager 等）-- 切勿存入源代码控制系统。
- **如果怀疑密钥泄露，请轮换密钥：** 创建新密钥，更新集成配置，然后删除旧密钥。

## 与 OAuth 的区别 {#how-it-differs-from-oauth}

当**您的教会是该集成的唯一使用者**时，适合使用 API 密钥。如果是需要在每个教会各自明确同意的情况下访问多个教会的连接器 -- 例如在 B1 社区中共享的 SaaS 应用 -- 请改用 [OAuth 与已连接应用](./connected-apps.md)。

| | API 密钥 | OAuth |
|---|---|---|
| 由谁安装 | 一位教会管理员 | 每位教会管理员分别授权该应用 |
| 身份验证请求头 | `Authorization: Bearer cak_…` | `Authorization: Bearer <jwt>` |
| 令牌有效期 | 直至被撤销 | 访问令牌约 7 天，刷新令牌约 90 天 |
| 最适合 | 内部脚本、Zapier/Make/表格连接器 | 多租户第三方应用 |
