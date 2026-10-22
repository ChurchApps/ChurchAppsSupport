---
title: "Claude"
---

# Claude

<div class="article-intro">

用日常语言向 Claude 询问有关您教会的问题，它会根据您的 B1 数据作答。例如 *"周日来了多少首次访问者？"* 或 *"本月有谁加入了小组？"* — 也可以让它帮您做事，比如 *"在我们的网站上添加一个名为 Events 的新页面。"* 设置不到 3 分钟，而且不需要任何技术技能，也无需安装软件。

</div>

<div class="prereqs">
<h4>您需要准备</h4>

- **一个 Claude 账户。** **免费计划即可使用** — 这是试用的好方法。不过免费账户每天有消息数量限制，而在 B1 中查询信息会很快用掉消息额度，所以如果您经常使用，我们建议使用 **Claude Pro**（约 $20/month）。
- **您的 B1 登录账户** — 与您登录 B1 Admin 时使用的账户相同。

</div>

:::tip 推荐 — 可免费试用
Claude 是将 B1 连接到 AI 最简单的方式，而且在 Claude 的 **免费计划** 上就能使用 — 让您的教会在付费之前先试用的完美方式。
:::

有两种连接方式。**方式 1 最简单** — 无需密钥，也无需安装任何东西。

## 方式 1 — 使用 B1 登录（最简单）

适用于 Claude 网站、Claude 桌面应用和 Claude 手机应用 — 只需设置一次，所有这些地方都能使用。

### 第 1 步 — 打开 Claude 的连接器设置

1. 前往 [claude.ai](https://claude.ai) 并登录（或创建一个免费账户）。
2. 点击左下角您的名字，然后点击 **Settings**（设置）→ **Connectors**（连接器）。

### 第 2 步 — 添加 B1

1. 点击 **Add**（添加），然后点击 **Add custom connector**（添加自定义连接器）。
2. **Name**（名称）：输入 `B1`。
3. **URL：** 粘贴 `https://api.churchapps.org/mcp`
4. 其他选项保持不变，然后点击 **Add**（添加）。

### 第 3 步 — 登录 B1

1. 点击 **Connect**（连接）。B1 登录页面会打开。
2. 使用您的 B1 账户登录。如果您属于多个教会，请确认顶部显示的是正确的教会。
3. B1 会列出 Claude 请求执行的操作，并确认您将被送回 **claude.ai**。点击 **Allow**（允许）。

您已回到 Claude，B1 显示为已连接。

### 第 4 步 — 向它提问

开始一个 **新对话** 并试试：

- *"我们教会有多少人？"*
- *"列出我们活跃的小组。"*
- *"按基金汇总本月的奉献。"*
- *"过去 30 天内有谁加入了教会？"*

第一次使用时，Claude 会请求使用 B1 的权限 — 点击 **Allow**（允许）。

## 方式 2 — 使用 B1 密钥的桌面扩展

如果您希望给 Claude 一个权限受限的密钥（例如仅查看），请使用此方式。它适用于 Mac 或 Windows 上的 Claude 桌面应用，并且您需要在 B1 中拥有管理教会设置的权限才能创建密钥。

### 第 1 步 — 获取 Claude 应用

从 [claude.com/download](https://claude.com/download) 下载 Claude 应用，安装并打开，然后登录。

### 第 2 步 — 创建您的 B1 密钥

密钥让 Claude 能够进入 *您的* 教会的 B1 — 可以把它看作是专门给 Claude 用的密码。

1. 登录 [B1 Admin](https://admin.b1.church)，然后前往 [设置 → 开发者](https://admin.b1.church/settings/developer)。
2. 在 **API 密钥** 标签页中，点击 **新建 API 密钥**。
3. **名称：** 输入 `Claude`。
4. **Scopes：** 勾选 Claude 可以执行的操作。每个区域都有一个 **read** 框（仅查看）和一个 **write** 框（进行更改）。不确定？先只勾选 **read** 框 — 以后可以再创建一个权限更多的新密钥。
5. 点击 **保存**，然后 **复制** 密钥。密钥只显示一次，所以请直接进入第 3 步。

### 第 3 步 — 将 B1 添加到 Claude

1. [下载 B1 扩展](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb)。
2. **双击** 下载的文件（`b1-churchapps.mcpb`）。Claude 会打开并显示 **B1 (ChurchApps)**。
3. 点击 **Install**（安装）。
4. 当它要求输入您的 **B1 API key** 时，粘贴第 2 步中的密钥并保存。
5. **完全退出 Claude**（Mac：**Cmd+Q** · Windows：右键单击任务栏中的 Claude 图标 → **Quit**），然后重新打开。

如果双击无法打开 Claude，请在 Claude 中前往 **Settings → Extensions → Advanced settings → Install Extension…** 并选择下载的文件。然后开始一个新对话，向它提问。

## 安全吗？

- Claude 只能看到 **您的教会** 的数据。
- **已登录（方式 1）：** Claude 能做的永远不会超过您自己的 B1 登录账户所能做的。在您点击 **Allow**（允许）之前，B1 登录页面会列出 Claude 可以执行的所有操作。
- **使用密钥（方式 2）：** Claude 只能执行密钥允许的操作 — 只勾选了 **read** 框的密钥只能查看，永远无法更改任何内容。
- **要关闭它：** 在 B1 Admin 中前往 **设置 → 开发者**，然后在 **已连接的应用** 下撤销该应用（方式 1），或在 **API 密钥** 下删除密钥（方式 2）。访问会立即停止。您也可以在 Claude 中的 B1 连接器上点击 **Disconnect**（断开连接）。

## 费用是多少？

B1 连接是免费的 — 它是 ChurchApps 的一部分。Claude 本身有免费计划；Claude Pro（约 $20/month）可提供多得多的使用量。请参阅 [claude.com/pricing](https://claude.com/pricing)。

## 技术细节

本页其余部分面向技术用户和 AI 助手：scopes、其他连接方式以及工作原理。

### Scopes

Claude 通过内置在 B1 API 中的 **模型上下文协议（MCP）服务器**（`https://api.churchapps.org/mcp`）与 B1 通信。每次调用都遵循与 B1 Admin 请求相同的身份验证、权限和教会范围规则。Claude 受限于 API 密钥的 **权限和 scopes**，无法访问 webhooks、OAuth 管理员端点或其他仅限操作员的路径。

常见的初始 scope 组合：

- **只读助手：** `people:read`、`groups:read`、`attendance:read`、`donations:read`、`content:read`
- **读取 + 添加备注/任务：** 添加 `people:write`
- **完整操作助手：** 添加您想要的相应 `:write` scopes

`donations:read` 密钥让 Claude 可以汇总奉献，但不能记录奉献。`people:write` 密钥可以添加人员，但不能查看奉献。请参阅 [API 密钥](/docs/developer/api/api-keys) 了解每个 scope 允许的操作。

### 其他连接方式

#### Claude Code（CLI）

在终端中：

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

就这样。在任何 Claude Code 会话中，输入 `/mcp` 以确认 `b1` 服务器已连接，然后向 Claude 询问有关您教会的任何问题。

#### Claude Desktop — 手动配置（高级）

如果您不想使用扩展，请编辑 Claude Desktop 的配置文件：

- **macOS：** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows：** `%APPDATA%\Claude\claude_desktop_config.json`

添加一个通过 `mcp-remote` 桥接到 B1 的 `b1` 服务器条目（需要 [Node.js](https://nodejs.org)）：

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

重启 Claude Desktop。聊天输入框中的连接器菜单将显示 `b1` 及其工具。

#### Claude.ai（网页版）— 自定义连接器

请参阅上面的 **方式 1**。该连接器使用 OAuth 2.1：Claude 从 `https://api.churchapps.org/.well-known/oauth-protected-resource` 发现 B1 的授权服务器，通过动态客户端注册（Dynamic Client Registration）注册自身，并使用 PKCE 登录。在 Team 和 Enterprise 计划中，可能需要所有者先为组织添加该连接器。Claude 不会请求特定的 scopes，因此授权同意页面会提供已登录 B1 账户可以访问的所有内容。可在 B1 Admin 的 **设置 → 开发者 → 已连接的应用** 下撤销。

### 工作原理

B1 API 在 `/mcp` 处公开一个 MCP 端点。Claude 连接到它，使用您的 `cak_…` 密钥进行身份验证，并获得四个工具的访问权限：

| 工具 | 功能说明 |
|---|---|
| `list_endpoints` | 列出 Claude 可以调用的 REST 端点，可按路径过滤。用于发现。 |
| `describe_endpoint` | 返回特定端点的简短摘要以及示例请求/响应。 |
| `api_call` | 以经过身份验证的用户身份实际调用 REST 端点。 |
| `describe_page_builder` | 构建和编辑您教会网站页面的指南，Claude 在处理网站内容之前会先阅读它。 |

这与您的 B1Admin 使用的 `/membership/people`、`/giving/donations`、`/attendance/visits` 等接口相同 — 每条授权规则都以相同方式适用。

### 安全和限制

- **按教会隔离。** API 密钥只对应一个教会。Claude 无法看到其他教会的数据。
- **受权限约束。** 如果您在 B1Admin 中移除了创建该密钥的人员的某项权限，Claude 会在下一次调用时立即失去该权限。
- **可撤销。** 在 **设置 → 开发者 → API 密钥** 中删除密钥，Claude 的访问权限会立即结束。
- **黑名单。** 提供商 webhooks、OAuth 客户端管理员端点以及仅限操作员的 `apiEmails` 路由无法通过 MCP 调用。
- **响应大小上限。** 单个工具响应的上限为 64 KB，以免长列表占满 Claude 的上下文 — 发生这种情况时，Claude 会使用过滤器缩小查询范围。
- **审计追踪。** 变更操作与 B1Admin 操作记录在同一审计日志中；您可以在 **设置 → 审计日志** 下查看。

### 故障排查

**Claude 报告"Unauthorized"或 401：** bearer token 缺失、格式错误，或密钥已被撤销。如果您使用的是扩展，请在 Claude 中打开 **Settings → Extensions → B1 (ChurchApps)** 并重新粘贴密钥。否则，请重新检查 `Authorization: Bearer cak_…` 标头（注意其中的空格和字面上的 `Bearer`）。

**工具调用返回 403：** API 密钥没有该端点的 scope。在 **设置 → 开发者 → API 密钥** 中添加 scope（您需要创建一个新密钥 — scopes 无法直接修改），然后将新密钥粘贴到扩展的设置或 Claude 的配置中。

**Claude 找不到端点：** 让它使用过滤器调用 `list_endpoints`，例如 *"使用 list_endpoints 并以 'donations' 过滤来找到正确的路径"*。路由清单是从实时 API 生成的，所以凡是您能用 `curl` 访问的内容都在其中。

**本地开发：** 将 `https://api.churchapps.org/mcp` 替换为 `http://localhost:8084/mcp` — 相同的身份验证，相同的工具。

## 相关

- [API 密钥](/docs/developer/api/api-keys) — 完整的 scope 参考
- [MCP 服务器（开发者参考）](/docs/developer/api/mcp) — 协议详情和工具模式
- [ChatGPT](./chatgpt) — 同样的思路，适用于 OpenAI 的模型
