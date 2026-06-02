---
title: "MCP 服务器"
---

# MCP 服务器

<div class="article-intro">

B1 API 在 `/mcp` 装载一个 [MCP（模型上下文协议）](https://modelcontextprotocol.io) 服务器。任何 MCP 感知的 AI 客户端 -- Claude Code、Claude Desktop、OpenAI Agents SDK、Cursor 或您自己的 -- 可以连接到它并代表认证的教会用户调用基础 REST API。它是一个薄的、通用的包装器：有三个工具，它们动态地暴露整个 API 表面而不是手工建模每个端点。

</div>

<div class="prereqs">
<h4>开始前</h4>

- 一个 [B1 API 密钥](./api-keys)（`cak_…`）具有客户端应该拥有的范围
- 一个可达的 B1 API 主机 -- 托管教会的 `https://api.churchapps.org`，或您自己的部署
- 一个 MCP 客户端。查看 [Claude](/docs/b1-admin/integrations/claude) 和 [ChatGPT](/docs/b1-admin/integrations/chatgpt) 对端用户设置

</div>

## 端点

```
POST /mcp
Content-Type: application/json
Accept: application/json, text/event-stream
Authorization: Bearer cak_<prefix>.<secret>
```

| 方面 | 值 |
|---|---|
| **路径** | `/mcp`（相对于 API 主机） |
| **方法** | 仅 `POST` -- 请求/响应和 SSE 流媒体都发生在同一端点上 |
| **传输** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **会议模型** | 无状态。每个请求构建一个新的 MCP 服务器实例 -- 无会话 id、无恢复 |
| **认证** | Bearer 令牌。`cak_…` API 密钥和 B1 JWT 都工作；解析与任何其他认证端点相同 |

一个 `Authorization` 标题缺失或无效的请求返回：

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

带有 HTTP 401。

## 工具

三个工具，都是通用的。模型使用 `list_endpoints` 进行发现，`describe_endpoint` 了解负载形状，`api_call` 实际调用 API。

### `list_endpoints`

返回已注册 REST 路由的完整清单，通过可选子串和/或 HTTP 动词过滤。每个条目包括控制器名称和最可能需要的 API 密钥范围。

**输入：**

| 字段 | 类型 | 描述 |
|---|---|---|
| `filter` | 字符串（可选） | 不区分大小写的子串匹配路径，例如 `"people"` |
| `method` | 枚举（可选） | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

**输出：** JSON 文档，形式为

```json
{
  "total": 24,
  "endpoints": [
    {
      "method": "GET",
      "path": "/membership/people",
      "controller": "PersonController.getAll",
      "likelyScopes": ["people:read", "people:write"]
    }
  ]
}
```

清单在 API 启动时从实时路由表构建一次 -- 您可以用 `curl` 击中的任何东西都显示在这里。

### `describe_endpoint`

返回一个简短摘要加，其中可用，一个手工策划的请求正文和响应示例对于一个端点。

**输入：**

| 字段 | 类型 | 描述 |
|---|---|---|
| `method` | 字符串 | HTTP 动词 |
| `path` | 字符串 | 完整路径如 `list_endpoints` 返回的 |

**输出：** 对于策划端点，一个带有 `summary`、`requestBody` 和 `responseSample` 的示例。对于非策划端点，一个回退消息指示模型首先调用 `GET` 以查看形状。大约一打高流量路由（人员、团体、捐赠、出席、基金）是策划的。

### `api_call`

调用选择的 REST 端点，进程内，通过与普通 HTTP 请求相同的 Express 中间件栈 -- 认证、正文解析、审计日志和按教会范围都适用。

**输入：**

| 字段 | 类型 | 描述 |
|---|---|---|
| `method` | 枚举 | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | 字符串 | 路径包括任何模块前缀，例如 `/membership/people` |
| `query` | 对象（可选） | 查询字符串参数的平面对象 |
| `body` | 任意（可选） | JSON 请求正文 -- 通常是 `POST` 的模型对象数组 |

**输出：**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* 控制器的 JSON 响应 */ ]
}
```

工具结果对任何状态 ≥ 400 的响应标记 `isError: true`。

## 认证模型

MCP 请求本身通过 `CustomAuthProvider.getUser()` 运行 -- 与每个认证 B1 端点相同的路径。一个 `cak_…` bearer 解析为一个 `Principal`，其权限是发行人员的当前 RBAC，**与**密钥的授予范围相交。这个交集在每个请求上重新计算，所以：

- 从密钥中移除范围（通过删除和重新创建它）在下一个调用时切断访问。
- 从基础人员中移除权限在 B1Admin 中即使密钥仍存在，在下一个调用时也切断访问。

对于嵌套 `api_call` 调用，原始 `Authorization` 标题被复制到合成请求上，所以 `CustomAuthProvider` 再次运行且范围交集被每个调用重新应用。没有令牌缓存。

## 路径黑名单

一小组路由即使用有效密钥也不通过 `api_call` 可达：

| 模式 | 为什么 |
|---|---|
| `/giving/donate/webhook/*` | 提供商 webhook 端点期望原始的、签名验证的来自 Stripe/PayPal 的正文 -- 不是一般调用者 |
| `/membership/oauth/clients*` | OAuth 客户端注册仅限操作员 |
| `/membership/people/apiEmails` | 由操作员 `jwtSecret` 门控，而不是用户权限 |
| 任何期望 `multipart/form-data` 的路由 | 文件上传对 JSON-RPC 不友好 |

被阻止的路径返回一个 `isError: true` 工具结果带有描述消息；基础路由永远不被调用。

## 响应大小限制

每个 `api_call` 响应正文被限制在**64 KB** 的捕获输出。如果查询超过限制，响应携带 `"truncated": true` 且模型期望用更窄的查询参数重试。这保持单个工具响应不会吹爆客户端的上下文窗口。

## 速率限制

在 `/mcp` 上没有应用层速率限制。节流被推迟到生产中的 API Gateway / Lambda 并发，和在自托管部署中的您的反向代理强制什么。

## OAuth 发现

MCP 服务器**不**播告 OAuth 2.1 元数据（`/.well-known/oauth-authorization-server`、动态客户端注册、PKCE 流）。需要 OAuth 发现 MCP 服务器的客户端 -- 特别是 Claude.ai 的"添加自定义连接器"UI 和 ChatGPT 的"连接器"功能 -- 在没有该表面的情况下无法连接。

接受在其配置中的静态 bearer 令牌的客户端 -- Claude Code、Claude Desktop、OpenAI Agents SDK、Cursor、自定义代码 -- 今天工作。现有的 [OAuthController](/docs/developer/api/connected-apps) 已经通过授权码 + PKCE 为第三方应用发行令牌；MCP 规范兼容的发现层在其顶部会关闭差距。

## 本地开发

MCP 端点在 API 运行本地时与其他所有东西一起装载：

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

在启动时日志行 `📡 MCP server ready at /mcp — N routes in inventory` 确认清单被构建。

用 MCP 检查器探测它：

```bash
npx @modelcontextprotocol/inspector
```

在检查器 UI 中，指向它在 `http://localhost:8084/mcp` 并将 `Authorization` 标题设置为 `Bearer cak_<prefix>.<secret>`。首先调用 `list_endpoints`；您应该看到完整路由列表。然后 `api_call({ method: "GET", path: "/membership/people" })` 应返回您的本地种子人员。

## 代码布局

MCP 服务器位于 Api 仓库的 `src/modules/mcp/` 在。值得注意的文件：

| 文件 | 用途 |
|---|---|
| `McpController.ts` | `@controller("/mcp")`；每个请求时接线 `StreamableHTTPServerTransport` |
| `McpServer.ts` | 构建一个 MCP `Server`，注册三个工具 |
| `RouteInventory.ts` | 在启动时走过 inversify-express-utils 元数据以枚举路由 |
| `internalDispatch.ts` | 合成 `req`/`res`，在进程内重新进入 Express 应用 |
| `tools/` | `listEndpoints.ts`、`describeEndpoint.ts`、`apiCall.ts` |
| `examples.ts` | 对高流量端点的策划请求/响应示例 |

## 相关

- [API 密钥](./api-keys)
- [Webhooks](./webhooks)
- [连接应用 (OAuth)](./connected-apps)
- [Claude -- 端用户设置](/docs/b1-admin/integrations/claude)
- [ChatGPT -- 端用户设置](/docs/b1-admin/integrations/chatgpt)
