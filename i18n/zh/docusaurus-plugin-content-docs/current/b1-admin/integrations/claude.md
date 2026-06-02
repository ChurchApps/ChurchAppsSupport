---
title: "Claude"
---

# Claude

<div class="article-intro">

将 Anthropic 的 Claude 连接到您的教会的 B1 数据。使用 API 密钥和几分钟的设置，您可以询问 Claude"上周有多少首次访问者？"或"为本月向建筑基金捐款的人起草感谢邮件" — Claude 将直接从您的教会记录中读取答案，范围限制在您的权限内。

</div>

<div class="prereqs">
<h4>开始前</h4>

- 一个拥有 **编辑设置** 权限的教会管理员（用于生成 API 密钥）
- 以下之一：**Claude Code**（CLI/IDE 扩展）、**Claude Desktop**（Mac/Windows）或 **Claude Pro/Max/Team** 账户
- 您的 B1 API 的完整 URL — 对于托管教会通常是 `https://api.churchapps.org`，或您的自托管 Api 主机

</div>

## Claude 可以看到什么

Claude 通过内置在 B1 API 中的 **模型上下文协议（MCP）服务器** 与 B1 通信。Claude 进行的每次调用都通过与 B1Admin 请求相同的身份验证、权限和教会范围规则 — 这意味着 Claude：

- 只能看到 **您的** 教会的数据
- 受限于您给它的 API 密钥所携带的 **权限和 scopes**
- 无法访问 webhooks、OAuth 管理员端点或其他仅限操作员的路径（这些被列入黑名单）

`donations:read` 密钥让 Claude 总结捐款，但不能记录礼物。`people:write` 密钥可以添加人员，但不能看到捐款。选择与工作相匹配的 scopes。

## 设置

### 1. 创建 API 密钥

1. 在 B1Admin 中转到 **设置 → 开发者 → API 密钥**。
2. 点击 **新建 API 密钥**，将其命名为 `Claude`，并选择 Claude 应该具有的 scopes。常见的初始设置：
   - **只读助手：** `people:read`、`groups:read`、`attendance:read`、`donations:read`、`content:read`
   - **读取 + 添加注释/任务：** 添加 `people:write`
   - **完整操作助手：** 添加您想要的匹配 `:write` scopes
3. 保存。完整的 `cak_…` 密钥 **仅显示一次** — 复制它。

查看 [API 密钥](/docs/developer/api/api-keys) 以了解每个 scope 允许什么。

### 2. 连接 Claude

选择您使用的 Claude 客户端：

#### Claude Code（CLI）

在终端中：

```bash
claude mcp add --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

就这样。在任何 Claude Code 会话中，输入 `/mcp` 以确认 `b1` 服务器已连接，然后询问 Claude 关于您的教会的任何问题。

#### Claude Desktop

编辑 Claude Desktop 的配置文件：

- **macOS：** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows：** `%APPDATA%\Claude\claude_desktop_config.json`

添加一个 `b1` 服务器条目。更新的 Claude Desktop 版本本地支持 HTTP MCP：

```json
{
  "mcpServers": {
    "b1": {
      "url": "https://api.churchapps.org/mcp",
      "headers": {
        "Authorization": "Bearer cak_<prefix>.<secret>"
      }
    }
  }
}
```

如果您的 Claude Desktop 版本仅支持 stdio 服务器，请通过 `mcp-remote` 桥接：

```json
{
  "mcpServers": {
    "b1": {
      "command": "npx",
      "args": [
        "-y", "mcp-remote",
        "https://api.churchapps.org/mcp",
        "--header", "Authorization:Bearer cak_<prefix>.<secret>"
      ]
    }
  }
}
```

重启 Claude Desktop。编写器中的连接器图标将显示 `b1` 和三个工具（`list_endpoints`、`describe_endpoint`、`api_call`）。

#### Claude.ai（网络）— 自定义连接器

Claude.ai 的"添加自定义连接器"功能需要 OAuth，这是 B1 MCP 服务器目前不支持的。改用 Claude Code 或 Claude Desktop。

### 3. 询问 Claude 一些事情

连接后，不需要特殊语法 — Claude 会动态发现可用的内容。示例：

- *"我的教会有多少人，活跃的小组有哪些？"*
- *"按基金总结本月的捐款。"*
- *"列出上周日参加 10am 服务的人，但在过去 60 天内没有参加周三小组的人。"*
- *"为这周添加的四个人起草欢迎邮件，按名字称呼。"*

在后台，Claude 将调用 MCP 工具 — 首先发现正确的端点，然后获取数据 — 并用纯语言回答。

## 工作原理

B1 API 在 `/mcp` 处公开一个 MCP 端点。Claude 连接到它，使用您的 `cak_…` 密钥进行身份验证，并获得三个工具的访问权限：

| 工具 | 功能说明 |
|---|---|
| `list_endpoints` | 列出 Claude 可以调用的 REST 端点，可按路径过滤。用于发现。 |
| `describe_endpoint` | 返回特定端点的简短总结和示例请求/响应。 |
| `api_call` | 实际调用一个 REST 端点作为经过身份验证的用户。 |

这与您的 B1Admin 使用的 `/membership/people`、`/giving/donations`、`/attendance/visits` 等表面相同 — 每个授权规则的应用方式相同。

## 安全和限制

- **按教会隔离。** API 密钥解析为一个教会。Claude 无法看到其他教会的数据。
- **权限范围内。** 如果您从在 B1Admin 中生成密钥的人员中移除权限，Claude 在下次调用时会失去它 — 立即。
- **可撤销。** 在 **设置 → 开发者 → API 密钥** 中删除密钥，Claude 的访问权限立即结束。
- **黑名单。** 提供商 webhooks、OAuth 客户端管理员端点和仅限操作员的 `apiEmails` 路由无法通过 MCP 调用。
- **响应大小上限。** 单个工具响应的上限为 64 KB，以便长列表不会花光 Claude 的上下文 — 当这种情况发生时，Claude 将通过过滤器缩小查询。
- **审计追踪。** 变更通过与 B1Admin 操作相同的审计日志；您可以在 **报告 → 审计日志** 下查看它们。

## 成本

ChurchApps 是免费和开源的 — MCP 服务器是您的教会已经运行的 API 的一部分。Anthropic 根据他们的计划为 Claude 使用收费。来自 ChurchApps 没有按调用收费。

## 故障排查

**Claude 报告"未授权"或 401：** bearer token 丢失、格式错误或密钥已被撤销。重新检查 `Authorization: Bearer cak_…` 标头（注意空格和字面 `Bearer`）。

**工具调用返回 403：** API 密钥没有该端点的 scope。在 **设置 → 开发者 → API 密钥** 中添加 scope（您需要创建一个新密钥 — scopes 无法原地更改），并更新 Claude 的配置。

**Claude 找不到端点：** 要求它使用过滤器调用 `list_endpoints`，例如 *"使用过滤器 'donations' 的 list_endpoints 来找到正确的路径"*。路由清单是从实时 API 生成的，所以您可以用 `curl` 击中的任何东西都在那里。

**本地开发：** 将 `https://api.churchapps.org/mcp` 替换为 `http://localhost:8084/mcp` — 相同的身份验证、相同的工具。

## 相关

- [API 密钥](/docs/developer/api/api-keys) — 完整的 scope 参考
- [MCP 服务器（开发者参考）](/docs/developer/api/mcp) — 协议详情和工具模式
- [ChatGPT](./chatgpt) — 对 OpenAI 模型的相同想法
