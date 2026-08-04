---
title: "集成与扩展接入面"
---

# 集成与扩展接入面

<div class="article-intro">

第三方可以接入的一切都通过同一个 API 和同一套授权模型运行。本页面就是一张地图：列出每一个集成接入面，展示它们之间的关联，并链接到各自的详细参考文档。如果你正在基于 B1 开发，请从这里开始，先选对入口，再跟随链接查阅深入记录该入口的页面。

</div>

## 接入面一览

共有六种进出方式，它们共享同一套认证层：

- **[REST API](../api/api-keys)** —— 完整的产品接入面，可用持有者令牌（bearer token）从任何语言调用。
- **[API 密钥](../api/api-keys)** —— 最简单的凭证：一个绑定到某个教会中某个人的 `cak_…` 令牌。
- **[OAuth 2.0 与已连接应用](../api/connected-apps)** —— 面向多租户应用的按教会授权；签发与用户获得的相同 JWT。
- **[Webhook](../api/webhooks)** —— 经过签名、可靠投递的出站事件。
- **[MCP 服务器](../api/mcp)** —— 位于 `/mcp` 的面向 AI 的 REST API 封装层。
- **[内容提供方](../freeplay-content-provider)** —— 外部媒体库接入 FreePlay 与 B1 各应用的入站路径。

除内容提供方之外，其余全部由一个单体式 API（[Api](https://github.com/ChurchApps/Api) 代码仓库）提供服务，其各模块挂载在稳定的基础路径下——`/membership`、`/giving`、`/attendance`、`/content`、`/messaging`、`/doing`、`/reporting` 和 `/mcp`。

## 整体运作方式

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

三个箭头概括了整个故事：第三方用持有者令牌（API 密钥或 OAuth JWT，包括通过 `/mcp`）**主动调入**；API 通过已签名的 Webhook **主动回调**；而内容提供方是唯一的**入站内容**路径——在这条路径上，是 B1 本身作为 OAuth *客户端* 从外部源拉取媒体内容。

## 共享的认证模型

无论是用户登录 JWT、OAuth 访问令牌，还是 API 密钥——每一种凭证都解析为**同一个 `Principal`**，并以同样的方式进行校验。不存在单独的“集成认证”路径；一个带作用域的凭证与一个权限较低的普通用户在系统看来并无区别。

### JWT 结构

B1 的访问令牌是在 `Api/src/modules/membership/auth/AuthenticatedUser.ts` 中签发的 HS256 JWT。声明（claim）集合如下：

| 声明 | 含义 |
|---|---|
| `id`、`email`、`firstName`、`lastName` | 令牌所代表的用户 |
| `churchId` | 该令牌所作用的唯一教会——所有数据范围限定的锚点 |
| `personId` | 该教会内对应的人员记录 |
| `permissions` | 扁平化的 RBAC 权限字符串数组（`[apiName_]contentType_contentId_action`） |
| `groupIds`、`leaderGroupIds` | 小组成员/组长身份，用于小组范围的权限判断 |
| `membershipStatus` | 访客与会员的区分，用于自助服务相关的门控 |

OAuth 访问令牌与登录 JWT 在结构上完全一致——唯一的区别在于其 `permissions` 数组在签名之前**经过了所授予作用域（scope）的过滤**（`getCombinedApiJwt(...)`）。

### 按教会限定范围

`churchId` 是令牌中的一个声明，而非请求参数，因此一个凭证永远无法跨教会访问数据。每一次仓储查询都会按调用方的 `churchId` 进行过滤；一个 API 密钥或 OAuth 令牌在签发时就被绑定到唯一一个教会。

### 边界处基于角色的权限控制

控制器通过 `au.checkAccess(contentType, action)` 对照令牌的 `permissions` 数组来控制操作权限。作用域（scope）**只能起过滤作用，绝不能授予权限**（`Api/src/shared/auth/Scopes.ts`）：`SCOPE_CATALOG` 将每个作用域（例如 `people:read`、`donations:write`）映射到它所允许的 RBAC 权限对，`filterPermissionsByScopes()` 在每次解析时都会将其与该人员*当前*拥有的权限取交集。这带来的后果是：

- 在 B1Admin 中撤销某项权限会在下一次请求时立即切断该凭证的对应访问权——令牌永远不会与角色的实际权限产生偏差。
- 作用域只能*收窄*权限，因此带作用域的凭证永远无法提升到服务器级或域级管理权限（这些权限被刻意排除在任何作用域映射之外）。
- API 密钥带有 `cak_` 前缀；`CustomAuthProvider.getUser()` 依据该前缀分支处理，对密钥进行哈希校验，并在每次调用时重新解析所有者当前的实时 RBAC 权限。

完整目录参见 [API 密钥 → 作用域](../api/api-keys#scopes)。

## 接入面参考

### REST API

完整的产品接入面。任何需要认证的端点在 `Authorization: Bearer` 请求头中既接受 JWT，也接受 `cak_…` API 密钥——不存在单独的仅密钥或仅 OAuth 路由表。各模块及其基础路径都位于 `Api/src/modules/*` 下。

### API 密钥

一个 `cak_<prefix>.<secret>` 形式的个人访问令牌，在 **B1Admin → 设置 → 开发者 → API 密钥** 中创建。系统只存储 SHA-256 哈希值；原始密钥仅显示一次。管理入口为 `/membership/apiKeys`（`Api/src/modules/membership/controllers/ApiKeyController.ts`）。最适合单个教会自身的脚本，以及 Zapier、Make、Google Sheets 等连接器。→ **[API 密钥](../api/api-keys)**

### OAuth 2.0 与已连接应用

适用于需要每个教会分别授权的多租户应用。实现于 `Api/src/modules/membership/controllers/OAuthController.ts`，挂载在 `/membership/oauth` 下。服务器支持三种授权类型：

- **授权码模式** —— `POST /oauth/authorize`（需认证）返回一个短期有效的授权码；`POST /oauth/token` 携带 `grant_type=authorization_code` 用该码换取访问 JWT（约 7 天有效期）以及刷新令牌（约 90 天有效期）。
- **设备码模式**（RFC 8628） —— `POST /oauth/device/authorize` 签发一个 `user_code`；用户在 B1Admin 中批准（`/oauth/device/approve`）；设备则以设备码授权类型轮询 `/oauth/token`。适用于电视、自助终端和没有浏览器的 CLI。
- **刷新令牌模式** —— `grant_type=refresh_token` 签发新的访问令牌；公开（无密钥）客户端可以省略密钥。

**已连接应用**是面向教会管理员的、对已授权令牌的可视化管理页面，可在 `/membership/oauth/connections` 处列出并撤销。该控制器还承载了一个 OAuth **中继会话**桥接功能（`/oauth/relay/*`），使无浏览器设备也能完成针对*外部*服务商的登录流程。→ **[已连接应用与 OAuth](../api/connected-apps)**

### Webhook

唯一的出站接入面。教会订阅一个公开的 HTTPS 端点以接收事件；当发生匹配的变更时，`WebhookDispatcher.emit(churchId, event, payload)` 会用展示名称（`personName`、`groupName`、`formName` —— 仅在有订阅匹配时才会执行查找）丰富仅含 ID 的负载内容，记录一次投递，并由后台工作进程 POST 一个带签名的 JSON 信封，具备重试/退避与重新投递能力。引擎位于 `Api/src/shared/webhooks/`，按教会的增删改查位于 `/membership/webhooks`（`WebhookController.ts`）。`connectorType` 字段会为 Slack / Discord 重新塑造请求体格式。→ **[Webhook](../api/webhooks)**

### MCP 服务器

位于 `/mcp` 的面向 AI 的封装层（`Api/src/modules/mcp/`）。三个通用工具——`list_endpoints`、`describe_endpoint`、`api_call`——将完整的 REST 接入面动态暴露给任意 MCP 客户端。认证方式与其他一切相同，都是同一种持有者令牌，`api_call` 会在进程内重新进入 Express 调用栈，因此所有权限与教会范围限定规则依然全部生效。→ **[MCP 服务器](../api/mcp)**

### 内容提供方

入站内容路径，位于独立的包 `Packages/content-providers`（`@churchapps/content-providers`）中，而非 API 本身。每个提供方都实现 `IProvider` 接口（`src/interfaces.ts`）——`browse`、`getPlaylist`、`getInstructions`，以及若干认证钩子——并自行注册进一个 `Map` 注册表（`src/providers/registry.ts`）。在这里**B1 是 OAuth 客户端**：某个提供方会声明其 `AuthType` 为 `none`、`oauth_pkce`、`device_flow` 或 `form_login`，共享的辅助工具（`OAuthHelper`、`DeviceFlowHelper`、`TokenHelper`、`ApiHelper`）会针对外部源运行客户端侧的 PKCE / 设备码流程。目前已上线十一个提供方——包括 Planning Center、Dropbox、Life.Church、CBN、BibleProject、Jesus Film、Lessons.church 和 B1.church——为 FreePlay 与 B1 各应用提供内容。→ **[FreePlay 内容提供方](../freeplay-content-provider)**

## 摘要

| 接入面 | 认证机制 | 方向 | 实现位置 | 参考 |
|---|---|---|---|---|
| REST API | `Bearer` JWT 或 `cak_…` 密钥 | 入站 | `Api/src/modules/*` | [API 密钥](../api/api-keys) |
| API 密钥 | SHA-256 哈希的 `cak_` 令牌 | 凭证 | `Api/.../membership/controllers/ApiKeyController.ts` | [API 密钥](../api/api-keys) |
| OAuth 2.0 / 已连接应用 | 授权码 · 设备码 · 刷新 → JWT | 入站 | `Api/.../membership/controllers/OAuthController.ts` | [已连接应用](../api/connected-apps) |
| Webhook | 每个钩子独立密钥，HMAC-SHA256 签名 | 出站 | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhook](../api/webhooks) |
| MCP 服务器 | `Bearer` JWT 或 `cak_…` 密钥 | 入站（AI） | `Api/src/modules/mcp/` | [MCP 服务器](../api/mcp) |
| 内容提供方 | 按提供方各异：none / OAuth PKCE / 设备码 / 表单登录 | 入站内容 | `Packages/content-providers/` | [内容提供方](../freeplay-content-provider) |

## 预构建连接器

与其让每个人都从零开始搭建，ChurchApps 在上述接入面之上直接提供了成品连接器：

- **[Slack 与 Discord](/docs/b1-admin/integrations/slack-discord)** —— 一个 Webhook `connectorType` 将标准信封重新塑造为聊天消息；完全在 B1Admin 中配置，无需任何第三方账号。
- **[Zapier](/docs/b1-admin/integrations/zapier)** 与 **[Make](/docs/b1-admin/integrations/make)** —— 根据 Webhook 事件触发，并通过 REST API 执行操作；当某个 Zap / 场景被启用时会自行注册相应的 Webhook（需要一个带 `settings:write` 权限的密钥）。Zapier 应用的源码位于 `Integrations` 代码仓库的 `zapier/` 目录下（Zapier CLI，使用 `zapier push` 部署）。
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** —— 一个使用 API 密钥认证的插件，可按需导出人员/捐赠/小组/出勤数据。
- **[Claude](/docs/b1-admin/integrations/claude)** 与 **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** —— 指向 `/mcp` 的 MCP 客户端。

如果你要编写自己的代码，**[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)**（`Packages/integration-sdk`）将上述一切都封装好了：一个带类型的 REST 客户端、一个 OAuth 客户端（授权码/刷新/设备码流程），以及一个带 Express 中间件的 HMAC Webhook 校验器。

## 相关页面

- [API 密钥](../api/api-keys) —— 最简单的凭证类型与作用域目录
- [已连接应用与 OAuth](../api/connected-apps) —— 多租户授权流程
- [Webhook](../api/webhooks) —— 出站事件系统
- [MCP 服务器](../api/mcp) —— AI 集成封装层
- [FreePlay 内容提供方](../freeplay-content-provider) —— 如何成为一个入站内容源
- [集成（面向终端用户）](/docs/b1-admin/integrations/) —— 预构建连接器的设置指南
