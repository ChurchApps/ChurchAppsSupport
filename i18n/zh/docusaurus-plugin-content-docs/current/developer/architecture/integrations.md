---
title: "集成和扩展表面"
---

# 集成和扩展表面

<div class="article-intro">

第三方可以插入的所有东西都通过一个 API 和一个授权模型运行。此页面是地图：它命名每个集成表面，显示它们如何连接，并链接到每个的详细参考。如果您对 B1 进行构建，请从这里开始选择正确的入口，然后遵循链接到记录它的深入页面。

</div>

## 一览表面

有六种进出方式，它们都共享相同的身份验证层：

- **[REST API](../api/api-keys)**——整个产品表面，可从任何语言使用持有者令牌调用。
- **[API 密钥](../api/api-keys)**——最简单的凭证：绑定到一个教会中的一个人的 `cak_…` 令牌。
- **[OAuth 2.0 和连接的应用](../api/connected-apps)**——多租户应用的按教会同意；发出用户获得的相同 JWT。
- **[Webhooks](../api/webhooks)**——已签名的、持久交付的出站事件。
- **[MCP 服务器](../api/mcp)**——REST API 的 AI 面向包装器，位于 `/mcp`。
- **[内容提供商](../freeplay-content-provider)**——外部媒体库进入 FreePlay 和 B1 应用的入站路径。

除了内容提供商外，所有内容都由单个整体 API（[Api](https://github.com/ChurchApps/Api) 存储库）提供，其模块在稳定基本路径下安装——`/membership`、`/giving`、`/attendance`、`/content`、`/messaging`、`/doing`、`/reporting` 和 `/mcp`。

## 它如何组合在一起

```
   ┌─────────────────────┐                          ┌───────────────────────────────────────┐
   │  第三方应用         │   持有者 cak_… / JWT     │              B1 API (Api)              │
   │  · 服务器 / SaaS    │ ───────────────────────▶ │  ┌─────────────────────────────────┐  │
   │  · Zapier / Make    │                          │  │ CustomAuthProvider.getUser()    │  │
   │  · Google Sheets    │                          │  │   cak_ key ─┐                    │  │
   │  · CLI / 脚本      │                          │  │   OAuth JWT ┴▶ Principal          │  │
   │  · AI 客户端 (MCP)  │ ─── POST /mcp ──────────▶ │  │   作用域过滤 → 权限[]            │  │
   └─────────────────────┘                          │  └────────────────┬────────────────┘  │
             ▲                                        │                   ▼                    │
             │                                        │  API 模块：/membership /giving         │
             │        已签名的 JSON POST             │  /attendance /content /messaging …    │
             │   （人员 / 捐赠 / 团体 / …）          │                   │                    │
             └──────────── webhooks ◀─────────────────┼─ shared/webhooks/WebhookDispatcher     │
                     （持久，HMAC-SHA256 已签名）     └───────────────────────────────────────┘

   外部内容来源（Planning Center、Dropbox、Life.Church、CBN 等）
             │   OAuth PKCE / 设备流 / 无   ──  B1 是 OAuth *客户端*  ──▶
             ▼
   Packages/content-providers   ──▶   FreePlay / B1 应用        （入站内容路径）
```

三个箭头说明整个故事：第三方**调用进来**，使用持有者令牌（API 密钥或 OAuth JWT，包括通过 `/mcp`）；API **通过已签名的 webhooks 调用回出**；内容提供商是一个**入站内容**路径，其中 B1 本身是从外部来源拉取媒体的 OAuth *客户端*。

## 共享授权模型

每个凭证——用户的登录 JWT、OAuth 访问令牌或 API 密钥——解析为**相同的 `Principal`** 并以相同的方式检查。没有单独的"集成身份验证"路径；一个作用域凭证与较低特权的用户无区别。

### JWT 结构

B1 访问令牌是在 `Api/src/modules/membership/auth/AuthenticatedUser.ts` 中铸造的 HS256 JWTs。声明集：

| 声明 | 含义 |
|---|---|
| `id`、`email`、`firstName`、`lastName` | 令牌背后的人员 |
| `churchId` | 此令牌作用的单个教会——所有数据范围的锚 |
| `personId` | 该教会内的人员记录 |
| `permissions` | RBAC 权限字符串的平面数组（`[apiName_]contentType_contentId_action`） |
| `groupIds`、`leaderGroupIds` | 团体成员资格 / 领导，用于团体范围检查 |
| `membershipStatus` | 访客 vs. 成员，用于自助服务门控 |

OAuth 访问令牌的形状与登录 JWT 完全相同——唯一的区别是其 `permissions` 数组在签署前**通过授予的作用域进行了筛选**（`getCombinedApiJwt(...)`）。

### 按教会范围

`churchId` 是令牌声明，而不是请求参数，因此凭证永远无法跨教会到达。每个存储库查询都针对调用方的 `churchId` 进行过滤；API 密钥或 OAuth 令牌在铸造时绑定到恰好一个教会。

### 边界处的基于角色的权限

控制器使用 `au.checkAccess(contentType, action)` 针对令牌的 `permissions` 数组门控操作。作用域是一个**过滤器，永不是授权**（`Api/src/shared/auth/Scopes.ts`）：`SCOPE_CATALOG` 将每个作用域（例如 `people:read`、`donations:write`）映射到它允许的 RBAC 对，`filterPermissionsByScopes()` 在每次解析时与该人的*当前*权限相交。后果：

- 在 B1Admin 中撤销权限会在下一个请求时切断凭证的访问——令牌永远不会与角色漂移。
- 作用域只能*移除*权限，所以一个有作用域的凭证永远无法提升到服务器 / 域管理（那些权限故意未映射到任何作用域）。
- API 密钥携带 `cak_` 前缀；`CustomAuthProvider.getUser()` 在它上分支，哈希秘密，并在每次调用时重新解析所有者的实时 RBAC。

查看 [API 密钥 → 作用域](../api/api-keys#scopes) 了解完整目录。

## 表面参考

### REST API

完整产品表面。任何经过身份验证的端点接受 `Authorization: Bearer` 标题中的 JWT 或 `cak_…` API 密钥——没有单独的仅限密钥或仅限 OAuth 路由表。模块及其基本路径位于 `Api/src/modules/*` 下。

### API 密钥

一个 `cak_<prefix>.<secret>` 个人访问令牌，在 **B1Admin → 设置 → 开发者 → API 密钥** 中创建。仅存储 SHA-256 哈希；原始密钥显示一次。在 `/membership/apiKeys`（`Api/src/modules/membership/controllers/ApiKeyController.ts`）管理。最适合单个教会自己的脚本和 Zapier、Make 和 Google Sheets 等连接器。→ **[API 密钥](../api/api-keys)**

### OAuth 2.0 和连接的应用

用于需要每个教会同意的多租户应用。在 `Api/src/modules/membership/controllers/OAuthController.ts` 下的 `/membership/oauth` 中实现。服务器支持三个授权：

- **授权代码**——`POST /oauth/authorize`（经过身份验证）返回短期代码；`POST /oauth/token` 带 `grant_type=authorization_code` 用访问 JWT（≈ 7 天）加刷新令牌（≈ 90 天）交换它。
- **设备代码**（RFC 8628）——`POST /oauth/device/authorize` 发出 `user_code`；用户在 B1Admin 中批准它（`/oauth/device/approve`）；设备使用设备代码授权轮询 `/oauth/token`。用于电视、亭和没有浏览器的 CLI。
- **刷新令牌**——`grant_type=refresh_token` 铸造新的访问令牌；公开（无密钥）客户端可能会忽略密钥。

**连接的应用** 是授予令牌的教会管理员面向视图，在 `/membership/oauth/connections` 列出和可撤销。控制器也托管一个 OAuth **中继会话**桥（`/oauth/relay/*`），让无浏览器设备完成针对*外部*提供商的登录。→ **[连接的应用和 OAuth](../api/connected-apps)**

### Webhooks

唯一的出站表面。教会订阅公共 HTTPS 端点到事件；当匹配的改变发生时，`WebhookDispatcher.emit(churchId, event, payload)` 通过显示名称丰富仅 ID 的负载（`personName`、`groupName`、`formName`——查找仅在匹配订阅时运行），记录交付，背景工作者发布带有重试/退避和重新交付的已签名 JSON 信封。引擎位于 `Api/src/shared/webhooks/`，按教会 CRUD 位于 `/membership/webhooks`（`WebhookController.ts`）。`connectorType` 字段为 Slack / Discord 重塑主体；`mailchimp` 连接器更进一步，拥有整个 HTTP 交换（针对 Mailchimp 的 API 的每个事件方法/URL/身份验证，凭证在 `webhooks.connectorConfig` 中加密）。→ **[Webhooks](../api/webhooks)**

### MCP 服务器

AI 面向包装器，位于 `/mcp`（`Api/src/modules/mcp/`）。三个通用工具——`list_endpoints`、`describe_endpoint`、`api_call`——动态向任何 MCP 客户端公开整个 REST 表面。身份验证是与其他所有东西相同的持有者令牌，`api_call` 在进程中重新进入 Express 堆栈，因此每个权限和教会范围规则仍然适用。→ **[MCP 服务器](../api/mcp)**

### 内容提供商

入站内容路径，在单独的包 `Packages/content-providers`（`@churchapps/content-providers`）中，而不是 API。每个提供商实现 `IProvider` 接口（`src/interfaces.ts`）——`browse`、`getPlaylist`、`getInstructions`，加上身份验证钩子——并自注册到 `Map` 注册表（`src/providers/registry.ts`）。这里**B1 是 OAuth 客户端**：提供商声明 `AuthType` 为 `none`、`oauth_pkce`、`device_flow` 或 `form_login`，共享助手（`OAuthHelper`、`DeviceFlowHelper`、`TokenHelper`、`ApiHelper`）对外部来源运行客户端 PKCE / 设备流。今天有 11 个提供商运行——包括 Planning Center、Dropbox、Life.Church、CBN、BibleProject、Jesus Film、Lessons.church 和 B1.church——供养 FreePlay 和 B1 应用。→ **[FreePlay 内容提供商](../freeplay-content-provider)**

## 摘要

| 表面 | 身份验证机制 | 方向 | 实现处 | 参考 |
|---|---|---|---|---|
| REST API | `Bearer` JWT 或 `cak_…` 密钥 | 入站 | `Api/src/modules/*` | [API 密钥](../api/api-keys) |
| API 密钥 | SHA-256 哈希的 `cak_` 令牌 | 凭证 | `Api/.../membership/controllers/ApiKeyController.ts` | [API 密钥](../api/api-keys) |
| OAuth 2.0 / 连接的应用 | 身份验证代码 · 设备 · 刷新 → JWT | 入站 | `Api/.../membership/controllers/OAuthController.ts` | [连接的应用](../api/connected-apps) |
| Webhooks | 每个钩的密钥，HMAC-SHA256 签名 | 出站 | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhooks](../api/webhooks) |
| MCP 服务器 | `Bearer` JWT 或 `cak_…` 密钥 | 入站（AI） | `Api/src/modules/mcp/` | [MCP 服务器](../api/mcp) |
| 内容提供商 | 每个提供商：无 / OAuth PKCE / 设备 / 表单 | 入站内容 | `Packages/content-providers/` | [内容提供商](../freeplay-content-provider) |

## 预构建连接器

而不是每个人都从头开始，ChurchApps 在上述表面顶部运送连接器：

- **[Slack 和 Discord](/docs/b1-admin/integrations/slack-discord)**——webhook `connectorType` 重塑标准信封为聊天消息；完全在 B1Admin 中配置，无需第三方账户。
- **[Mailchimp](/docs/b1-admin/integrations/services/mailchimp)**——一个将人员同步到 Mailchimp 受众的 `mailchimp` connectorType，并将团体/列表成员资格映射到标签（`Api/src/shared/webhooks/MailchimpConnector.ts`）。与聊天连接器不同，它针对每个事件向 Mailchimp 的 API 发出自己的经过身份验证的请求（upsert/archive/tag），而不是发布到教会提供的 URL；API 密钥和受众 id 在 `webhooks.connectorConfig` 中存储为加密。单向，仅标准合并字段。
- **[Zapier](/docs/b1-admin/integrations/zapier)** 和 **[Make](/docs/b1-admin/integrations/make)**——触发 webhook 事件并通过 REST API 作用；当 Zap/场景打开时它们注册自己的 webhook（需要带 `settings:write` 的密钥）。Zapier 应用的源位于 `Integrations` 存储库下的 `zapier/`（Zapier CLI，用 `zapier push` 部署）。
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)**——一个 API 密钥经过身份验证的附加组件，按需导出人员 / 捐赠 / 团体 / 出席。
- **[Claude](/docs/b1-admin/integrations/claude)** 和 **[ChatGPT](/docs/b1-admin/integrations/chatgpt)**——MCP 客户端指向 `/mcp`。

对于您自己的代码，**[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)**（`Packages/integration-sdk`）包裹所有内容：一个类型化 REST 客户端、OAuth 客户端（身份验证代码 / 刷新 / 设备流）和 HMAC webhook 验证器，带有 Express 中间件。

## 相关页面

- [API 密钥](../api/api-keys)——最简单的凭证和作用域目录
- [连接的应用和 OAuth](../api/connected-apps)——多租户同意流
- [Webhooks](../api/webhooks)——出站事件系统
- [MCP 服务器](../api/mcp)——AI 集成包装器
- [FreePlay 内容提供商](../freeplay-content-provider)——成为入站内容来源
- [集成（最终用户）](/docs/b1-admin/integrations/)——预构建连接器设置指南
