---
title: "MCP 服务器"
---

# MCP 服务器

<div class="article-intro">

B1 API 在 `/mcp` 提供一个 [MCP（Model Context Protocol，模型上下文协议）](https://modelcontextprotocol.io) 服务器。任何支持 MCP 的 AI 客户端——claude.ai 自定义连接器、Claude Code、Claude Desktop、OpenAI Agents SDK、Cursor 或你自己的客户端——都可以连接到它，并代表已通过身份验证的教会用户调用底层 REST API。它是一个轻量、通用的封装：三个通用工具动态地暴露整个 API 接口，而不是为每个端点逐一建模，另外还有一个用于网站构建器的领域指南工具。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 一个具有客户端所需权限范围的 [B1 API 密钥](./api-keys)（`cak_…`），或者一个可以通过 OAuth 登录的 MCP 客户端（参见 [OAuth 发现](#oauth-discovery)）
- 一个可访问的 B1 API 主机——托管教会使用 `https://api.churchapps.org`，或使用你自己的部署
- 一个 MCP 客户端。终端用户设置请参见 [Claude](/docs/b1-admin/integrations/claude) 和 [ChatGPT](/docs/b1-admin/integrations/chatgpt)

</div>

## 端点

```
POST /mcp
Content-Type: application/json
Accept: application/json, text/event-stream
Authorization: Bearer cak_<prefix>.<secret>
```

| 项目 | 值 |
|---|---|
| **路径** | `/mcp`（相对于 API 主机） |
| **方法** | 仅 `POST`——请求/响应和 SSE 流式传输都在同一端点上进行 |
| **传输方式** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **会话模型** | 无状态。每个请求都会构建一个全新的 MCP 服务器实例——没有会话 ID，也不支持恢复 |
| **鉴权** | Bearer 令牌。`cak_…` API 密钥和 B1 JWT（包括 OAuth 访问令牌）都可以使用；解析方式与其他任何需要鉴权的端点相同 |

如果请求的 `Authorization` 头缺失或无效，将返回：

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

该响应的 HTTP 状态码为 401，并带有 `WWW-Authenticate: Bearer resource_metadata="<api>/.well-known/oauth-protected-resource"` 头，支持 OAuth 的客户端会依据该头开始登录流程。

在托管 API（生产和演示环境）上，`/mcp` 通过 API Gateway HTTP API 提供，而不是其他端点所用的 REST API。REST API 会在 Lambda 代理响应中将 `WWW-Authenticate` 重命名为 `x-amzn-remapped-www-authenticate`，这导致 ChatGPT 等客户端只收到一个空白的 401 响应，无法开始登录。HTTP API 则会原样传递该头。

## 工具

共三个通用工具和一个指南工具。模型使用 `list_endpoints` 进行发现，使用 `describe_endpoint` 了解请求负载的结构，使用 `api_call` 实际调用 API；当任务涉及网站内容时，则使用 `describe_page_builder`。

### `list_endpoints`

返回所有已注册 REST 路由的完整清单，可通过可选的子字符串和/或 HTTP 动词进行筛选。每个条目包含控制器名称以及最可能需要的 API 密钥权限范围。

**输入：**

| 字段 | 类型 | 说明 |
|---|---|---|
| `filter` | string（可选） | 不区分大小写的子字符串，与路径匹配，例如 `"people"` |
| `method` | enum（可选） | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

**输出：** 具有以下结构的 JSON 文档：

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

该清单在 API 启动时根据实时路由表构建一次——凡是可以通过 `curl` 访问的内容都会出现在这里。

### `describe_endpoint`

返回简短摘要，并在可用时返回某个端点手动整理的请求体和响应示例。

**输入：**

| 字段 | 类型 | 说明 |
|---|---|---|
| `method` | string | HTTP 动词 |
| `path` | string | 由 `list_endpoints` 返回的完整路径 |

**输出：** 对于已整理的端点，返回包含 `summary`、`requestBody` 和 `responseSample` 的示例。对于未整理的端点，返回一条备用消息，指示模型先调用 `GET` 以查看结构。大约十几个高频路由（人员、群组、捐赠、考勤、基金）已整理。

### `api_call`

在进程内，通过与普通 HTTP 请求相同的 Express 中间件栈调用所选的 REST 端点——鉴权、请求体解析、审计日志记录以及按教会的范围限制都会生效。

**输入：**

| 字段 | 类型 | 说明 |
|---|---|---|
| `method` | enum | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | string | 包含模块前缀的路径，例如 `/membership/people` |
| `query` | object（可选） | 扁平的查询字符串参数对象 |
| `body` | any（可选） | JSON 请求体——对于 `POST`，通常是模型对象数组 |

**输出：**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* the controller's JSON response */ ]
}
```

对于状态码 ≥ 400 的任何响应，工具结果都会标记为 `isError: true`。

### `describe_page_builder`

这是唯一的非通用工具：一份静态的、自包含的指南，说明如何通过 `/content/*` 端点构建网站页面——包括页面 → 区块 → 元素的数据模型、创建流程、每种 `elementType` 及其 `answersJSON` 结构、区块级设置（例如 `dividerTop`/`dividerBottom` 形状分隔线），以及一个完整的端到端示例。它不需要任何输入，并与 B1Admin 编辑器中维护的元素目录保持一致（参见 [网站构建器架构](../architecture/website-builder)）。在创建或编辑页面内容之前，代理应先调用一次该工具，然后通过 `api_call` 执行操作。

## 鉴权模型

MCP 请求本身通过 `CustomAuthProvider.getUser()` 处理——这与每个需要鉴权的 B1 端点所用的路径相同。`cak_…` 令牌会被解析为一个 `Principal`，其权限为签发该密钥的人员当前的 RBAC **与** 密钥所授予权限范围的交集。该交集在每次请求时都会重新计算，因此：

- 从密钥中移除某项权限范围（通过删除并重新创建）会在下一次调用时切断访问。
- 在 B1Admin 中从底层人员身上移除某项权限，即使密钥仍然存在，也会在下一次调用时切断访问。

对于嵌套的 `api_call` 调用，原始的 `Authorization` 头会被复制到合成请求上，因此 `CustomAuthProvider` 会再次运行，并在每次调用时重新应用权限范围的交集。不做任何令牌缓存。

## 路径黑名单

有一小部分路由即使使用有效的密钥也无法通过 `api_call` 访问：

| 模式 | 原因 |
|---|---|
| `/giving/donate/webhook/*` | 提供商 Webhook 端点需要来自 Stripe/PayPal 的原始、经签名验证的请求体——并非面向一般调用者 |
| `/membership/oauth/clients*` | OAuth 客户端注册仅限运营人员使用 |
| `/membership/people/apiEmails` | 由运营人员的 `jwtSecret` 控制，而非用户权限 |
| 任何需要 `multipart/form-data` 的路由 | 文件上传不适合 JSON-RPC |

被阻止的路径会返回一个 `isError: true` 的工具结果，并附带说明性消息；底层路由从不会被调用。

## 响应大小上限

每个 `api_call` 的响应体上限为捕获输出的 **64 KB**。如果查询超出该上限，响应中会包含 `"truncated": true`，模型应使用更窄的查询参数重试。这可防止单个工具响应占满客户端的上下文窗口。

## 速率限制

`/mcp` 没有应用层的速率限制。在生产环境中，限流交由 API Gateway / Lambda 并发控制处理；在自托管部署中，则由你的反向代理强制执行。

## OAuth 发现 {#oauth-discovery}

MCP 服务器会公布 OAuth 2.1 元数据，因此只连接到通过 OAuth 发现的服务器的客户端——尤其是 Claude.ai 的 "Add custom connector" 界面——无需粘贴密钥即可为用户登录。`/mcp` 是受保护资源，位于 `/membership/oauth` 下的现有 [OAuth 提供方](./connected-apps) 是其授权服务器，而 B1Admin 的 `/oauth` 页面则是同意页面。

| 端点 | 用途 |
|---|---|
| `GET /.well-known/oauth-protected-resource`（也包括 `/.well-known/oauth-protected-resource/mcp`） | 受保护资源元数据（RFC 9728）：`resource` 为 `<api>/mcp`，`authorization_servers` 为 API 根地址，`scopes_supported` 列出所有 [API 密钥权限范围](./api-keys#scopes) |
| `GET /.well-known/oauth-authorization-server` | 授权服务器元数据（RFC 8414）：`authorization_endpoint` 为 B1Admin 的 `/oauth`，`token_endpoint` 为 `/membership/oauth/token`，`registration_endpoint` 为 `/membership/oauth/register` |
| `POST /membership/oauth/register` | 动态客户端注册（RFC 7591） |

像 claude.ai 这样的客户端所执行的流程如下：

1. 不带令牌的 `POST /mcp` 返回 401，并附带指向受保护资源元数据的 `WWW-Authenticate` 头。
2. 客户端读取这两份元数据文档，然后通过 `POST /membership/oauth/register` 注册自己，发送 `client_name`、`redirect_uris`，并可选发送 `scope`。每个自注册的客户端都是**公开**客户端：不会颁发密钥，响应中的 `token_endpoint_auth_method` 为 `"none"`。重定向 URI 必须为 `https`，或指向回环地址（`localhost`、`127.0.0.1`、`[::1]`）的 `http`；每个客户端最多 10 个。注册按每个 IP 每小时 20 次进行速率限制。
3. 用户被引导至 B1Admin 的 `/oauth`，并附带 `code_challenge` 和 `code_challenge_method=S256`。同意页面会以通俗语言列出每项请求的权限范围（若未请求任何范围，则显示 "Everything your B1 account can access"），显示用户将被送回的主机，并注明应用是否为自行注册。用户点击 **Allow**。
4. 客户端使用 `grant_type=authorization_code` 及其 `code_verifier`，在 `/membership/oauth/token` 处交换授权码，之后使用 `grant_type=refresh_token` 刷新。表单编码和 JSON 请求体均被接受。
5. 生成的访问令牌是一个具有权限范围的 B1 JWT，用作 `/mcp` 的 Bearer 令牌。

PKCE 规则：仅接受 `S256`。没有密钥的客户端必须在授权时发送 `code_challenge`，并在令牌交换时发送匹配的 `code_verifier`；机密客户端（具有密钥）仍可仅使用密钥。重定向 URI 必须与已注册的 URI 完全匹配。

在配置中接受静态 Bearer 令牌的客户端——Claude Code、Claude Desktop、OpenAI Agents SDK、Cursor、自定义代码——可以继续使用 `cak_…` 密钥。

## 本地开发

在本地运行 API 时，MCP 端点会与其他所有内容一同挂载：

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

启动时，日志行 `📡 MCP server ready at /mcp — N routes in inventory` 确认清单已构建完成。

使用 MCP Inspector 进行探测：

```bash
npx @modelcontextprotocol/inspector
```

在 Inspector 界面中，将其指向 `http://localhost:8084/mcp`，并将 `Authorization` 头设置为 `Bearer cak_<prefix>.<secret>`。先调用 `list_endpoints`，应能看到完整的路由列表。然后执行 `api_call({ method: "GET", path: "/membership/people" })`，应返回你本地的种子人员数据。

## 代码结构

MCP 服务器位于 Api 仓库的 `src/modules/mcp/` 目录中。主要文件如下：

| 文件 | 用途 |
|---|---|
| `McpController.ts` | `@controller("/mcp")`；为每个请求连接 `StreamableHTTPServerTransport`，并在 401 时发送 `WWW-Authenticate` 质询 |
| `WellKnownController.ts` / `OAuthMetadata.ts` | 提供 `/.well-known` OAuth 发现文档 |
| `McpServer.ts` | 构建 MCP `Server`，注册四个工具 |
| `RouteInventory.ts` | 在启动时遍历 inversify-express-utils 元数据，枚举路由 |
| `internalDispatch.ts` | 合成的 `req`/`res`，在进程内重新进入 Express 应用 |
| `tools/` | `listEndpoints.ts`、`describeEndpoint.ts`、`apiCall.ts`、`describePageBuilder.ts` |
| `examples.ts` | 高频端点的已整理请求/响应示例 |

## 相关内容

- [API 密钥](./api-keys)
- [Webhooks](./webhooks)
- [已连接应用（OAuth）](./connected-apps)
- [Claude — 终端用户设置](/docs/b1-admin/integrations/claude)
- [ChatGPT — 终端用户设置](/docs/b1-admin/integrations/chatgpt)
