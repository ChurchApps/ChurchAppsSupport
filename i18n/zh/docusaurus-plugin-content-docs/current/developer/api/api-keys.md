---
title: "API 密钥"
---

# API 密钥

<div class="article-intro">

API 密钥（个人访问令牌）是从服务器端脚本、第三方连接器（Zapier、Make、Google Sheets）或完整 OAuth 流多余的任何地方向 B1 API 进行身份验证的最简单方式。密钥绑定到特定教会中的特定人员，并继承该人员的权限，由一组可选范围进行缩小。

</div>

<div class="prereqs">
<h4>开始前</h4>

- 具有**编辑设置**权限的教会管理员创建和管理密钥
- 原始密钥在创建时**显示一次** -- 立即将其存储在安全的地方
- 所有 API 请求必须使用**HTTPS**

</div>

## 密钥格式

B1 API 密钥看起来像：

```
cak_<prefix>.<secret>
```

- `cak_` -- 固定标识符（认证层匹配的 API 密钥前缀）
- `<prefix>` -- 8 字符公开查找段
- `<secret>` -- 48 字符密钥；只有 SHA-256 哈希存储在服务器端

完整密钥在标准 bearer 标题中呈现给服务器：

```http
Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7
```

API 认证层路由任何以 `cak_` 开头的令牌到 API 密钥路径，哈希密钥，按前缀查找它，并解析密钥人员的当前权限 -- 所以在 B1Admin 中撤销权限在下一个请求时立即生效，密钥永远不会与角色不同步。

## 创建密钥 (B1Admin)

1. 作为具有**编辑设置**的用户登录 B1Admin。
2. 打开**设置 → 开发人员 → API 密钥**。
3. 点击**新 API 密钥**，给它一个可识别的名称（例如"Zapier -- 捐赠同步"），选择密钥应该具有的范围，然后**保存**。
4. 完整的 `cak_…` 密钥在对话框中**显示一次**。关闭前复制它到您的集成配置 -- 以后无法检索。您可以随时创建新密钥。

## 范围

范围**缩小**密钥能做什么 -- 它永远不能授予基础人员没有的权限。无范围 / 没有范围意味着密钥携带该人员的完整权限集。

| 范围 | 允许 |
|---|---|
| `people:read` / `people:write` | 查看 / 编辑人员、家庭、团体成员 |
| `groups:read` / `groups:write` | 查看 / 编辑团体及其成员 |
| `donations:read` / `donations:write` | 查看 / 记录捐赠 |
| `attendance:read` / `attendance:write` | 查看 / 记录出席、会议、签到 |
| `forms:write` | 管理表单（读访问权限包含在写中） |
| `content:read` / `content:write` | 查看 / 编辑网站内容、注册、流媒体 |
| `messaging:read` / `messaging:write` | 读消息；写也允许发送短信 |
| `roles:read` / `roles:write` | 查看 / 编辑角色定义 |
| `settings:read` / `settings:write` | 查看 / 编辑教会设置（**需要**以编程方式注册 webhooks） |
| `offline_access` | 允许长期刷新令牌（仅 OAuth 流 -- 对 API 密钥无效） |

`write` 范围隐式包括匹配的 `read`。服务器和域管理员权限故意不作为范围暴露 -- 有范围的凭证永远不能提升为网站管理。

:::tip
如果您将使用密钥注册 webhooks（例如对于 Zapier 或 Make 集成），密钥需要 `settings:write`。一个仅 `people:read` 密钥在 `POST /membership/webhooks` 时无声地 403。
:::

## 使用密钥

与任何 bearer 令牌相同 -- 每个认证端点接受 API 密钥完全如同它接受 JWT：

```bash
curl https://api.churchapps.org/membership/people \
  -H "Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7"
```

一个密钥范围不足的请求用与任何权限拒绝错误相同的形状响应**403 禁止**。

## 通过 API 管理密钥

所有端点都在会员模块的 `/membership/apiKeys` 路径下，需要来自具有**编辑设置**的教会管理员的 JWT（不是 API 密钥）。

| 方法与路径 | 用途 |
|---|---|
| `GET /membership/apiKeys` | 列出教会的密钥（无密钥 -- 仅 `id`、`name`、`prefix`、`scopes`、`lastUsedAt`、`expiresAt`、`createdAt`） |
| `GET /membership/apiKeys/scopes` | 所有可用范围名称的列表 -- 对于密钥创建 UI |
| `POST /membership/apiKeys` | 创建新密钥。正文：`{ "name": "...", "scopes": ["people:read"] }`。响应包括原始 `cak_…` 密钥**一次**。 |
| `DELETE /membership/apiKeys/:id` | 撤销密钥 -- 在下一个请求时生效 |

撤销的密钥立即消失 -- 没有宽限期。

## 最佳实践

- **每个集成一个密钥。** 如果出了问题被泄露，您撤销一个密钥而不破坏其他的。
- **制造最窄的有效范围。** Google Sheets 导出仅需要 `people:read`，而不是 `settings:write`。
- **将密钥绑定到服务帐户，而不是真实的员工。** 如果一个员工离开，他们的 B1 访问结束 -- 以及在他们身份下造成的任何密钥。
- **在密钥管理器中存储密钥**（您的托管提供商的环境变量、AWS 密钥管理器等）-- 永远不要在源控制中。
- **轮换密钥**如果您怀疑曝露：创建新密钥，更新集成，然后删除旧的。

## 它与 OAuth 的区别

API 密钥适用于**您的教会是使用集成的唯一一个**的情况。对于需要访问许多教会且每个都有明确同意的连接器 -- 比如在 B1 社区中共享的 SaaS 应用 -- 使用 [OAuth 和连接应用](./connected-apps) 代替。

| | API 密钥 | OAuth |
|---|---|---|
| 谁安装 | 一个教会管理员 | 每个教会管理员授权应用 |
| 认证标题 | `Authorization: Bearer cak_…` | `Authorization: Bearer <jwt>` |
| 令牌寿命 | 直到撤销 | 访问 ≈ 7 天，刷新 ≈ 90 天 |
| 最佳用途 | 内部脚本、Zapier/Make/Sheets 连接器 | 多租户第三方应用 |
