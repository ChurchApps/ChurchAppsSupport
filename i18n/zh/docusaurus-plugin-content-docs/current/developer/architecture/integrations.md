---
title: "集成和扩展表面"
---

# 集成和扩展表面

<div class="article-intro">

第三方可以插入的所有东西都通过一个API和一个授权模型运行。此页面是映射：它命名每个集成表面，显示它们如何连接，并链接到每个的详细参考。如果您要针对B1构建，请从这里开始选择正确的门，然后按照链接到深入记录它的页面。

</div>

## 表面一览

有六种进出方式，它们都共享相同的auth层：

- **[REST API](../api/api-keys)** — 完整的产品表面，可从任何语言使用持有者令牌调用。
- **[API密钥](../api/api-keys)** — 最简单的凭证：一个`cak_…`令牌绑定到一个教会中的一个人。
- **[OAuth 2.0和连接的应用](../api/connected-apps)** — 每教会同意多租户应用；发出用户得到的相同JWT。
- **[Webhook](../api/webhooks)** — 已签名的、持久交付的出站事件。
- **[MCP服务器](../api/mcp)** — 在`/mcp`处REST API上的AI面向包装器。
- **[内容提供商](../freeplay-content-provider)** — 外部媒体库进入FreePlay和B1应用的入站路径。

除内容提供商外，所有内容都由单个单体API（[Api](https://github.com/ChurchApps/Api)存储库）提供，其模块在稳定基路径下挂载 — `/membership`、`/giving`、`/attendance`、`/content`、`/messaging`、`/doing`、`/reporting`和`/mcp`。

## 它如何组合在一起

```
   ┌─────────────────────┐                          ┌───────────────────────────────────────┐
   │  第三方应用         │   Bearer  cak_… / JWT    │              B1 API（Api）            │
   │  · 服务器/SaaS      │ ───────────────────────▶ │  ┌─────────────────────────────────┐  │
   │  · Zapier / Make    │                          │  │ CustomAuthProvider.getUser()    │  │
   │  · Google Sheets    │                          │  │   cak_密钥 ─┐                    │  │
   │  · CLI/脚本         │                          │  │   OAuth JWT ┴▶ Principal          │  │
   │  · AI客户端（MCP）  │ ─── POST /mcp ──────────▶ │  │   范围过滤 → 权限[] │
   └─────────────────────┘                          │  └────────────────┬────────────────┘  │
             ▲                                        │                   ▼                    │
             │                                        │  API模块：/membership /giving     │
             │        已签名的JSON POST               │  /attendance /content /messaging …    │
             │   （人员/捐赠/小组/…）                │                   │                    │
             └──────────── webhooks ◀─────────────────┼─ shared/webhooks/WebhookDispatcher     │
                     （持久的、HMAC-SHA256签名）    └───────────────────────────────────────┘

   外部内容源（Planning Center、Dropbox、Life.Church、CBN等）
             │   OAuth PKCE/设备流程/无   ──  B1是这里的OAuth*客户端*  ──▶
             ▼
   Packages/content-providers   ──▶   FreePlay / B1应用        （入站内容路径）
```

三个箭头讲述整个故事：第三方**使用持有者令牌调用**（API密钥或OAuth JWT，包括通过`/mcp`）；API**通过已签名的webhook调用回出**；内容提供商是唯一**入站内容**路径，其中B1本身是OAuth*客户端*从外部源拉取媒体。

## 共享Auth模型

每个凭证 — 用户的登录JWT、OAuth访问令牌或API密钥 — 解析到**相同的`Principal`**并以相同的方式检查。没有单独的"集成auth"路径；范围凭证只是与较低权限用户不可区分。

### JWT结构

B1访问令牌是在`Api/src/modules/membership/auth/AuthenticatedUser.ts`中铸造的HS256 JWT。声明集：

| 声明 | 含义 |
|---|---|
| `id`、`email`、`firstName`、`lastName` | 令牌后面的人 |
| `churchId` | 此令牌在其中行动的单个教会 — 所有数据范围的锚 |
| `personId` | 该教会内的人员记录 |
| `permissions` | RBAC许可字符串的平面数组（`[apiName_]contentType_contentId_action`） |
| `groupIds`、`leaderGroupIds` | 小组成员资格/领导权，用于小组范围检查 |
| `membershipStatus` | 访客vs.成员，用于自助服务门控 |

OAuth访问令牌的形状与登录JWT字节对字节相同 — 唯一的区别是其`permissions`数组**通过授予的范围进行过滤，然后再签名**（`getCombinedApiJwt(...)`）。

### 按教会范围

`churchId`是令牌声明，不是请求参数，所以凭证永不能跨教会到达。每个存储库查询在调用者的`churchId`上过滤；API密钥或OAuth令牌在铸造时绑定到完全一个教会。

### 边界处的基于角色的权限

控制器使用`au.checkAccess(contentType, action)`对着令牌的`permissions`数组门控操作。范围是**过滤器，从不授权**（`Api/src/shared/auth/Scopes.ts`）：`SCOPE_CATALOG`映射每个范围（例如`people:read`、`donations:write`）到它允许的RBAC对，`filterPermissionsByScopes()`在每个解析时与人的*当前*权限相交。后果：

- 在B1Admin中撤销权限会在下一个请求时切断凭证的访问 — 令牌从不与角色漂移。
- 范围只能*移除*权限，所以范围凭证永不能升级为服务器/域管理（那些权限故意未映射到任何范围）。
- API密钥携带`cak_`前缀；`CustomAuthProvider.getUser()`在其上分支，哈希秘密，并在每次调用时重新解析所有者的实时RBAC。

请参见[API密钥→范围](../api/api-keys#范围)了解完整的目录。

## 表面参考

### REST API

完整的产品表面。任何经过身份验证的端点在`Authorization: Bearer`标题中接受JWT或`cak_…` API密钥 — 没有单独的仅密钥或仅OAuth路由表。模块及其基路径存在于`Api/src/modules/*`下。

### API密钥

一个`cak_<prefix>.<secret>`个人访问令牌，在**B1Admin→设置→开发人员→API密钥**中创建。仅存储SHA-256哈希；原始密钥显示一次。在`/membership/apiKeys`处管理（`Api/src/modules/membership/controllers/ApiKeyController.ts`）。最适合单个教会自己的脚本，以及诸如Zapier、Make和Google Sheets之类的连接器。→ **[API密钥](../api/api-keys)**

### OAuth 2.0和连接的应用

对于需要每个教会同意的多租户应用。在`/membership/oauth`处的`Api/src/modules/membership/controllers/OAuthController.ts`中实现。服务器支持三个授权：

- **授权代码** — `POST /oauth/authorize`（已验证）返回短期代码；`POST /oauth/token`与`grant_type=authorization_code`交换它以获得访问JWT（≈7天）加刷新令牌（≈90天）。
- **设备代码**（RFC 8628） — `POST /oauth/device/authorize`发出`user_code`；用户在B1Admin（`/oauth/device/approve`）中批准它；设备使用设备代码授权轮询`/oauth/token`。用于没有浏览器的TV、信息亭和CLI。
- **刷新令牌** — `grant_type=refresh_token`铸造新的访问令牌；公开（无秘密）客户端可能省略秘密。

**连接的应用**是授予的令牌的教会管理员面向视图，在`/membership/oauth/connections`处列出和可撤销。控制器也托管OAuth**中继会话**桥（`/oauth/relay/*`），使无浏览器设备完成针对*外部*提供商的登录。→ **[连接的应用和OAuth](../api/connected-apps)**

### Webhook

唯一的出站表面。教会订阅公开HTTPS端点到事件；当匹配的更改发生时，`WebhookDispatcher.emit(churchId, event, payload)`记录交付，后台工作者POST已签名的JSON信封，带有重试/回退和重新交付。引擎在`Api/src/shared/webhooks/`，按教会CRUD在`/membership/webhooks`下（`WebhookController.ts`）。`connectorType`字段为Slack/Discord重新塑造主体。→ **[Webhook](../api/webhooks)**

### MCP服务器

在`/mcp`处的AI面向包装器（`Api/src/modules/mcp/`）。三个通用工具 — `list_endpoints`、`describe_endpoint`、`api_call` — 动态地暴露完整的REST表面给任何MCP客户端。Auth与所有其他相同的持有者令牌，`api_call`在进程中重新进入Express堆栈，所以每个权限和教会范围规则仍然适用。→ **[MCP服务器](../api/mcp)**

### 内容提供商

入站内容路径，在单独的包`Packages/content-providers`（`@churchapps/content-providers`）中，而不是API。每个提供商实现`IProvider`接口（`src/interfaces.ts`） — `browse`、`getPlaylist`、`getInstructions`，加上auth钩子 — 并自注册到`Map`注册表（`src/providers/registry.ts`）。这里**B1是OAuth客户端**：提供商声明`AuthType`为`none`、`oauth_pkce`、`device_flow`或`form_login`，共享帮助器（`OAuthHelper`、`DeviceFlowHelper`、`TokenHelper`、`ApiHelper`）针对外部源运行客户端PKCE/设备流程。今天运送11个提供商 — 包括Planning Center、Dropbox、Life.Church、CBN、BibleProject、Jesus Film、Lessons.church和B1.church — 馈入FreePlay和B1应用。→ **[FreePlay内容提供商](../freeplay-content-provider)**

## 摘要

| 表面 | Auth机制 | 方向 | 实现位置 | 参考 |
|---|---|---|---|---|
| REST API | `Bearer` JWT或`cak_…`密钥 | 入站 | `Api/src/modules/*` | [API密钥](../api/api-keys) |
| API密钥 | SHA-256哈希的`cak_`令牌 | 凭证 | `Api/.../membership/controllers/ApiKeyController.ts` | [API密钥](../api/api-keys) |
| OAuth 2.0/连接的应用 | 授权代码·设备·刷新→JWT | 入站 | `Api/.../membership/controllers/OAuthController.ts` | [连接的应用](../api/connected-apps) |
| Webhook | 每个钩子秘密，HMAC-SHA256签名 | 出站 | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhook](../api/webhooks) |
| MCP服务器 | `Bearer` JWT或`cak_…`密钥 | 入站（AI） | `Api/src/modules/mcp/` | [MCP服务器](../api/mcp) |
| 内容提供商 | 按提供商：无/OAuth PKCE/设备/表单 | 入站内容 | `Packages/content-providers/` | [内容提供商](../freeplay-content-provider) |

## 预构建连接器

而不是每个人都从头开始构建，ChurchApps在上述表面之上运送连接器：

- **[Slack和Discord](/docs/b1-admin/integrations/slack-discord)** — 一个webhook`connectorType`将标准信封重新塑造为聊天消息；完全在B1Admin中配置，无第三方账户。
- **[Zapier](/docs/b1-admin/integrations/zapier)**和**[Make](/docs/b1-admin/integrations/make)** — 在webhook事件上触发，通过REST API行动；它们在Zap/场景打开时注册自己的webhook（需要带有`settings:write`的密钥）。
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** — API密钥认证的附加组件，按需导出人员/捐赠/小组/出勤。
- **[Claude](/docs/b1-admin/integrations/claude)**和**[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — 指向`/mcp`的MCP客户端。

对于您自己的代码，**[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)**（`Packages/integration-sdk`）包装所有内容：一个类型化的REST客户端、一个OAuth客户端（授权代码/刷新/设备流程）和一个带有Express中间件的HMAC webhook验证器。

## 相关页面

- [API密钥](../api/api-keys) — 最简单的凭证和范围目录
- [连接的应用和OAuth](../api/connected-apps) — 多租户同意流程
- [Webhook](../api/webhooks) — 出站事件系统
- [MCP服务器](../api/mcp) — AI集成包装器
- [FreePlay内容提供商](../freeplay-content-provider) — 成为入站内容源
- [集成（终端用户）](/docs/b1-admin/integrations/) — 预构建连接器设置指南
