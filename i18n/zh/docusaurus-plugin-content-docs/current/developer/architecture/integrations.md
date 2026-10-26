---
title: "集成与扩展接口"
---

# 集成与扩展接口

<div class="article-intro">

第三方可以接入的一切，都通过同一个 API 和同一套授权模型运行。本页是一份地图：它列出了每一个集成接口，展示了它们如何连接，并链接到每个接口的详细参考。如果你正在基于 B1 进行开发，请从这里开始选择合适的入口，再按链接进入深入介绍该入口的页面。

</div>

## 接口概览

进出系统的方式共有六种，它们都共享同一个认证层：

- **[REST API](../api/api-keys)** —— 整个产品接口，可从任何语言使用 bearer token 调用。
- **[API 密钥](../api/api-keys)** —— 最简单的凭证：一个绑定到某教会中某个人员的 `cak_…` 令牌。
- **[OAuth 2.0 与连接应用](../api/connected-apps)** —— 面向多租户应用、按教会授予同意；签发与用户获得的相同 JWT。
- **[Webhooks](../api/webhooks)** —— 经过签名、可持久投递的出站事件。
- **[MCP 服务器](../api/mcp)** —— 位于 `/mcp` 的、面向 AI 的 REST API 封装。
- **[内容提供方](../freeplay-content-provider)** —— 外部媒体库进入 FreePlay 和 B1 应用的入站路径。

除内容提供方外，其他所有功能都由单一的单体 API（[Api](https://github.com/ChurchApps/Api) 代码仓库）提供服务，其各模块挂载在稳定的基础路径下——`/membership`、`/giving`、`/attendance`、`/content`、`/messaging`、`/doing`、`/reporting` 和 `/mcp`。

## 整体协作方式

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

三个箭头概括了整个设计：第三方使用 bearer token（API 密钥或 OAuth JWT，包括通过 `/mcp`）**调入**；API 通过签名的 webhook **回调**外部；而内容提供方是唯一的**入站内容**路径，其中 B1 本身作为 OAuth *客户端*，从外部来源拉取媒体。

## 共享认证模型

每种凭证——用户的登录 JWT、OAuth 访问令牌或 API 密钥——都会解析为**同一个 `Principal`**，并以相同的方式进行检查。不存在单独的“集成认证”路径；受限范围的凭证与权限较低的用户没有区别。

### JWT 结构

B1 访问令牌是在 `Api/src/modules/membership/auth/AuthenticatedUser.ts` 中签发的 HS256 JWT。其声明集如下：

| 声明 | 含义 |
|---|---|
| `id`、`email`、`firstName`、`lastName` | 令牌所代表的人员 |
| `churchId` | 此令牌所操作的唯一教会——所有数据范围划分的锚点 |
| `personId` | 该教会内的人员记录 |
| `permissions` | RBAC 权限字符串的扁平数组（`[apiName_]contentType_contentId_action`） |
| `groupIds`、`leaderGroupIds` | 群组成员身份/领导身份，用于基于群组的检查 |
| `membershipStatus` | 访客还是会员，用于自助服务的权限控制 |

OAuth 访问令牌的结构与登录 JWT 完全相同——唯一的区别在于，其 `permissions` 数组在签名前已**经过所授予范围的过滤**（`getCombinedApiJwt(...)`）。

### 按教会划分的数据范围

`churchId` 是令牌的一项声明，而不是请求参数，因此凭证永远无法跨教会访问数据。每个仓储查询都会按调用者的 `churchId` 过滤；API 密钥或 OAuth 令牌在签发时即绑定到唯一的一个教会。

### 边界处的基于角色的权限

控制器通过 `au.checkAccess(contentType, action)` 对照令牌的 `permissions` 数组来限制操作。范围是一种**过滤器，而非授权**（`Api/src/shared/auth/Scopes.ts`）：`SCOPE_CATALOG` 将每个范围（例如 `people:read`、`donations:write`）映射到它所允许的 RBAC 配对，而 `filterPermissionsByScopes()` 会在每次解析时将其与该人员的*当前*权限取交集。由此产生以下结果：

- 在 B1Admin 中撤销某项权限，会在下一次请求时切断该凭证的访问——令牌永远不会与角色脱节。
- 范围只能*移除*权限，因此受限范围的凭证永远无法提升为服务器/域管理员权限（这些权限被有意排除在任何范围之外）。
- API 密钥带有 `cak_` 前缀；`CustomAuthProvider.getUser()` 会根据该前缀进行分支，对密钥进行哈希，并在每次调用时重新解析所属人员实时的 RBAC 权限。

完整范围目录参见 [API 密钥 → 范围](../api/api-keys#scopes)。

## 接口参考

### REST API

完整的产品接口。任何需要认证的端点都接受在 `Authorization: Bearer` 头中传入的 JWT 或 `cak_…` API 密钥——不存在仅限密钥或仅限 OAuth 的独立路由表。各模块及其基础路径位于 `Api/src/modules/*` 之下。

### API 密钥

一个 `cak_<prefix>.<secret>` 形式的个人访问令牌，在 **B1Admin → Settings → Developer → API Keys** 中创建。系统仅存储其 SHA-256 哈希值，原始密钥只显示一次。通过 `/membership/apiKeys` 管理（`Api/src/modules/membership/controllers/ApiKeyController.ts`）。最适用于单个教会自己的脚本，以及 Zapier、Make 和 Google Sheets 等连接器。→ **[API 密钥](../api/api-keys)**

### OAuth 2.0 与连接应用

适用于需要每个教会分别授权同意的多租户应用。实现位于 `Api/src/modules/membership/controllers/OAuthController.ts`，路径为 `/membership/oauth`。服务器支持三种授权类型：

- **授权码** —— `POST /oauth/authorize`（需认证）返回一个短期有效的代码；`POST /oauth/token` 配合 `grant_type=authorization_code` 将其兑换为访问 JWT（约 7 天）以及刷新令牌（约 90 天）。公开（无密钥）客户端必须使用 PKCE（仅限 `S256`）：在授权时提供 `code_challenge`，在兑换令牌时提供对应的 `code_verifier`。
- **设备码**（RFC 8628）—— `POST /oauth/device/authorize` 签发一个 `user_code`；用户在 B1Admin（`/oauth/device/approve`）中批准它；设备通过设备码授权类型轮询 `/oauth/token`。适用于没有浏览器的电视、自助终端和命令行工具。
- **刷新令牌** —— `grant_type=refresh_token` 签发新的访问令牌；公开（无密钥）客户端可以省略密钥。

公开客户端也可以通过 `POST /oauth/register` 自行注册（RFC 7591 动态客户端注册）；它们会获得一个 `client_id` 且没有密钥，其重定向 URI 必须为 `https` 或回环地址。

**连接应用**是教会管理员所看到的、已授予令牌的视图，可在 `/membership/oauth/connections` 中列出并撤销。该控制器还提供一个 OAuth **中继会话**桥接（`/oauth/relay/*`），使没有浏览器的设备能够针对*外部*提供方完成登录。→ **[连接应用与 OAuth](../api/connected-apps)**

### Webhooks

这是唯一的出站接口。教会可以为事件订阅一个公开的 HTTPS 端点；当发生匹配的变更时，`WebhookDispatcher.emit(churchId, event, payload)` 会用显示名称（`personName`、`groupName`、`formName`——仅在有订阅匹配时才执行查询）丰富只含 id 的载荷，记录一次投递，然后由后台工作进程以带重试/退避和重投机制的方式 POST 一个经过签名的 JSON 信封。引擎位于 `Api/src/shared/webhooks/`，每个教会的增删改查位于 `/membership/webhooks`（`WebhookController.ts`）。`connectorType` 字段会为 Slack / Discord 重新塑造请求体；`mailchimp` 连接器则更进一步，全权负责整个 HTTP 交互（针对 Mailchimp API 的每个事件方法/URL/认证，凭证加密存储于 `webhooks.connectorConfig`）。→ **[Webhooks](../api/webhooks)**

### MCP 服务器

位于 `/mcp` 的面向 AI 的封装（`Api/src/modules/mcp/`）。三个通用工具——`list_endpoints`、`describe_endpoint`、`api_call`——将整个 REST 接口动态地暴露给任何 MCP 客户端。认证方式与其他所有接口相同，使用同一个 bearer token。对于使用 OAuth 登录的客户端（claude.ai 自定义连接器），`/mcp` 返回的 401 会附带一个 `WWW-Authenticate` 头，指向 `/.well-known/oauth-protected-resource`；而 `/.well-known/oauth-authorization-server` 会公布 `/membership/oauth` 端点、动态注册、PKCE 以及 B1Admin 的 `/oauth` 同意页面（`WellKnownController.ts`、`OAuthMetadata.ts`）。`api_call` 会在进程内重新进入 Express 栈，因此所有权限和教会范围规则依然生效。→ **[MCP 服务器](../api/mcp)**

### 内容提供方

入站内容路径，位于独立的包 `Packages/content-providers`（`@churchapps/content-providers`）中，而不在 API 内。每个提供方都实现 `IProvider` 接口（`src/interfaces.ts`）——包括 `browse`、`getPlaylist`、`getInstructions` 以及认证钩子——并自行注册到 `Map` 注册表中（`src/providers/registry.ts`）。在这里，**B1 是 OAuth 客户端**：提供方声明其 `AuthType` 为 `none`、`oauth_pkce`、`device_flow` 或 `form_login` 之一，由共享的辅助工具（`OAuthHelper`、`DeviceFlowHelper`、`TokenHelper`、`ApiHelper`）针对外部来源执行客户端侧的 PKCE 或设备流程。目前共内置 11 个提供方，包括 Planning Center、Dropbox、Life.Church、CBN、BibleProject、Jesus Film、Lessons.church 和 B1.church，为 FreePlay 和 B1 应用提供内容。→ **[FreePlay 内容提供方](../freeplay-content-provider)**

**年度计划**也依托于这一路径。课程发布者（需具备 `lessons.edit` 权限）在 Lessons.church 管理后台中维护有序的第 1/2/3 周序列（LessonsApi 数据表 `yearPlans` / `yearPlanWeeks`，可选 `startMonth`，每周可设置 `anchor` 为 `easter` / `christmas`）；LessonsApi 上的 `GET /yearPlans/public` 匿名提供已上线的计划，并从课程树中为每周补全程序/研读/场地信息。B1Admin 的**服务 → 计划 → 排定课程 → 应用年度计划**会调用该端点，并为每个包含的周写入一个 DoingApi 计划（`providerId=lessonschurch`，`providerPlanId=/lessons/{programId}/{studyId}/{lessonId}/{venueId}`）。带有 `startMonth` 的计划会根据所选年份解析锚定周（复活节使用公历 computus 算法，圣诞节为不晚于 12 月 25 日的那个周日），并填充其间的周；不带 `startMonth` 的计划仍会将第 N 周映射为 `startDate + (N−1)×7` 天。来自外部 OLF 提供方的周或路径不完整的周，会在应用时跳过；教会可像编辑其他计划一样编辑生成的计划，而 FreePlay 会播放计划中的任何内容。

## 摘要

| 接口 | 认证机制 | 方向 | 实现位置 | 参考 |
|---|---|---|---|---|
| REST API | `Bearer` JWT 或 `cak_…` 密钥 | 入站 | `Api/src/modules/*` | [API 密钥](../api/api-keys) |
| API 密钥 | SHA-256 哈希的 `cak_` 令牌 | 凭证 | `Api/.../membership/controllers/ApiKeyController.ts` | [API 密钥](../api/api-keys) |
| OAuth 2.0 / 连接应用 | 授权码（PKCE）· 设备 · 刷新 → JWT；动态客户端注册 | 入站 | `Api/.../membership/controllers/OAuthController.ts` | [连接应用](../api/connected-apps) |
| Webhooks | 每个 hook 的密钥，HMAC-SHA256 签名 | 出站 | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhooks](../api/webhooks) |
| MCP 服务器 | `Bearer` JWT、OAuth JWT（通过 `/.well-known` 发现）或 `cak_…` 密钥 | 入站（AI） | `Api/src/modules/mcp/` | [MCP 服务器](../api/mcp) |
| 内容提供方 | 按提供方：无 / OAuth PKCE / 设备 / 表单 | 入站内容 | `Packages/content-providers/` | [内容提供方](../freeplay-content-provider) |

## 预构建连接器

ChurchApps 并不要求每个人都从零开始构建，而是在上述接口之上提供了现成的连接器：

- **[Slack 与 Discord](/docs/b1-admin/integrations/slack-discord)** —— webhook 的 `connectorType` 会将标准信封重塑为聊天消息；完全在 B1Admin 中配置，无需第三方账户。
- **[Mailchimp](/docs/b1-admin/integrations/services/mailchimp)** —— `mailchimp` connectorType 会将人员同步到 Mailchimp 受众，并将群组/列表成员身份映射为标签（`Api/src/shared/webhooks/MailchimpConnector.ts`）。与聊天类连接器不同，它会针对每个事件发出自己的已认证请求（新增或更新/归档/打标签），而不是向教会提供的 URL 发送 POST；API 密钥和受众 ID 加密保存在 `webhooks.connectorConfig` 中。该同步为单向，仅包含标准合并字段。
- **[Zapier](/docs/b1-admin/integrations/zapier)** 和 **[Make](/docs/b1-admin/integrations/make)** —— 基于 webhook 事件触发，并通过 REST API 执行操作；当 Zap/场景启用时，它们会注册自己的 webhook（需要具备 `settings:write` 权限的密钥）。Zapier 应用的源代码位于 `Integrations` 代码仓库的 `zapier/` 目录下（使用 Zapier CLI 通过 `zapier push` 部署）。
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** —— 一个使用 API 密钥认证的附加组件，可按需导出人员 / 捐款 / 群组 / 出勤数据。
- **[Claude](/docs/b1-admin/integrations/claude)** 和 **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** —— 指向 `/mcp` 的 MCP 客户端。

对于你自己的代码，**[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)**（`Packages/integration-sdk`）封装了以上所有内容：一个有类型的 REST 客户端、一个 OAuth 客户端（授权码 / 刷新 / 设备流程），以及一个带 Express 中间件的 HMAC webhook 验证器。

## 相关页面

- [API 密钥](../api/api-keys) —— 最简单的凭证以及范围目录
- [连接应用与 OAuth](../api/connected-apps) —— 多租户同意流程
- [Webhooks](../api/webhooks) —— 出站事件系统
- [MCP 服务器](../api/mcp) —— AI 集成封装
- [FreePlay 内容提供方](../freeplay-content-provider) —— 成为入站内容来源
- [集成（最终用户）](/docs/b1-admin/integrations/) —— 预构建连接器设置指南
