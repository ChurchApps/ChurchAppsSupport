---
title: "Claude"
---

# Claude

<div class="article-intro">

用简单的中文向 Claude 询问您的教会情况，它会根据您的 B1 数据作答。例如 *"周日有多少首次到访的访客？"* 或 *"这个月谁加入了小组？"*，您也可以让它执行操作，例如 *"在我们的网站上新增一个名为活动的页面。"* 设置只需不到 3 分钟，无需任何技术技能，也不需要安装任何软件。

</div>

<div class="prereqs">
<h4>您需要准备</h4>

- **一个 Claude 账户。** **免费版即可使用**，是很好的试用方式。不过，免费账户每天有消息数量限制，而在 B1 中查询信息会很快用完额度。因此，如果您经常使用，我们建议您订阅 **Claude Pro**（约每月 20 美元）。
- **您的 B1 登录账户。** 与您登录 B1 Admin 时使用的相同。

</div>

:::tip 推荐，可免费试用
Claude 是将 B1 连接到 AI 最简便的方式，并且可以在 Claude 的**免费版**上使用，非常适合您的教会在付费之前先行试用。
:::

连接方式有两种。**选项 1 最简单**，无需密钥，也无需安装任何软件。

## 选项 1：使用 B1 登录（最简单）

可在 Claude 网站、Claude 桌面应用和 Claude 手机应用上使用。只需设置一次，即可在所有平台上使用。

### 第 1 步：打开 Claude 的连接器设置

1. 访问 [claude.ai](https://claude.ai) 并登录（或注册一个免费账户）。
2. 点击左下角的您的名字，然后依次点击 **Settings** → **Connectors**。

### 第 2 步：添加 B1

1. 点击 **Add**，然后点击 **Add custom connector**。
2. **Name：** 输入 `B1`。
3. **URL：** 粘贴 `https://api.churchapps.org/mcp`
4. 其他选项保持不变，然后点击 **Add**。

### 第 3 步：登录 B1

1. 点击 **Connect**。随即会打开 B1 登录页面。
2. 使用您的 B1 账户登录。如果您属于多个教会，请检查页面顶部显示的是否为正确的教会。
3. B1 会列出 Claude 请求执行的操作，并确认您将被带回 **claude.ai**。点击 **Allow**。

您会回到 Claude 中，B1 将显示为已连接。

### 第 4 步：向它提问

开启一个**新对话**，然后试试：

- *"我们教会有多少人？"*
- *"列出我们目前活跃的小组。"*
- *"按基金汇总本月的奉献。"*
- *"过去 30 天内有谁加入了教会？"*

首次使用时，Claude 会请求使用 B1 的许可，点击 **Allow** 即可。

## 选项 2：使用 B1 密钥的桌面扩展

如果您希望给 Claude 一个权限有限的密钥（例如仅限查看），可以使用此方式。它可在 Mac 或 Windows 版 Claude 桌面应用中使用，您需要有在 B1 中管理教会设置的权限才能创建密钥。

### 第 1 步：获取 Claude 应用

从 [claude.com/download](https://claude.com/download) 下载 Claude 应用，安装、打开并登录。

### 第 2 步：创建您的 B1 密钥

该密钥让 Claude 能够访问*您的*教会 B1，可以把它理解为仅供 Claude 使用的密码。

1. 登录 [B1 Admin](https://admin.b1.church)，然后前往 [Settings → Developer](https://admin.b1.church/settings/developer)。
2. 在 **API Keys** 标签页上，点击 **New API Key**。
3. **Name：** 输入 `Claude`。
4. **Scopes：** 勾选 Claude 可以执行的操作。每个类别都有一个 **read** 复选框（仅查看）和一个 **write** 复选框（进行更改）。如果不确定，可以先只勾选 **read** 复选框，之后如需更多权限，可以再创建新密钥。
5. 点击 **Save**，然后点击 **Copy** 复制密钥。密钥只会显示一次，因此请直接进行第 3 步。

### 第 3 步：将 B1 添加到 Claude

1. [下载 B1 扩展](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb)。
2. **双击**下载的文件（`b1-churchapps.mcpb`）。Claude 会打开并显示 **B1 (ChurchApps)**。
3. 点击 **Install**。
4. 当系统要求输入您的 **B1 API 密钥**时，粘贴第 2 步中的密钥并保存。
5. **完全退出 Claude**（Mac：**Cmd+Q** · Windows：右键点击任务栏中的 Claude 图标 → **Quit**），然后重新打开。

如果双击后 Claude 没有打开，请在 Claude 中前往 **Settings → Extensions → Advanced settings → Install Extension…**，然后选择下载的文件。之后开启一个新对话，并向它提问即可。

## 安全吗？

- Claude 只能看到**您教会的**数据。
- **已登录（选项 1）：** Claude 的权限永远不会超过您自己的 B1 登录账户。在您点击 **Allow** 之前，B1 登录页面会列出 Claude 可以执行的所有操作。
- **使用密钥（选项 2）：** Claude 只能执行密钥允许的操作。仅勾选了 **read** 复选框的密钥只能查看，无法进行任何更改。
- **关闭连接：** 在 B1 Admin 中前往 **Settings → Developer**，在 **Connected Apps**（选项 1）下撤销该应用，或在 **API Keys**（选项 2）下删除该密钥。访问权限会立即停止。您也可以在 Claude 中点击 B1 连接器上的 **Disconnect**。

## 费用是多少？

B1 连接是免费的，它是 ChurchApps 的一部分。Claude 本身有免费版；Claude Pro（约每月 20 美元）可提供更多使用额度。请参阅 [claude.com/pricing](https://claude.com/pricing)。

## 技术细节

本页其余部分面向技术用户和 AI 助手，内容包括权限范围、其他连接方式以及工作原理。

### 权限范围

Claude 通过 B1 API 内置的 **Model Context Protocol (MCP) 服务器**与 B1 通信（`https://api.churchapps.org/mcp`）。每次调用都会经过与 B1 Admin 请求相同的身份验证、权限和教会范围规则。Claude 仅限于 API 密钥的**权限和范围**，无法访问 webhooks、OAuth 管理端点或其他仅限运营方使用的路径。

常见的入门权限范围组合：

- **只读助手：** `people:read`、`groups:read`、`attendance:read`、`donations:read`、`content:read`
- **读取 + 添加笔记 / 任务：** 添加 `people:write`
- **完整运营助手：** 添加您需要的相应 `:write` 权限范围

`donations:read` 密钥允许 Claude 汇总奉献情况，但无法记录奉献。`people:write` 密钥可以添加人员，但无法查看奉献。有关每个权限范围允许的操作，请参阅 [API Keys](/docs/developer/api/api-keys)。

### 其他连接方式

#### Claude Code（CLI）

在终端中执行：

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

完成。在任意 Claude Code 会话中，输入 `/mcp` 以确认 `b1` 服务器已连接，然后即可向 Claude 询问任何有关您教会的问题。

#### Claude Desktop：手动配置（高级）

如果您不想使用扩展，可以编辑 Claude Desktop 的配置文件：

- **macOS：** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows：** `%APPDATA%\Claude\claude_desktop_config.json`

添加一个 `b1` 服务器条目，通过 `mcp-remote` 连接到 B1（需要 [Node.js](https://nodejs.org)）：

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

#### Claude.ai（网页版）：自定义连接器

请参阅上方的**选项 1**。该连接器使用 OAuth 2.1：Claude 从 `https://api.churchapps.org/.well-known/oauth-protected-resource` 发现 B1 的授权服务器，通过动态客户端注册（Dynamic Client Registration）进行自我注册，并使用 PKCE 登录。在 Team 和 Enterprise 套餐中，组织所有者可能需要先为该组织添加此连接器。Claude 不会请求特定权限范围，因此授权页面会提供已登录 B1 账户可访问的全部内容。若要撤销，请在 B1 Admin 中前往 **Settings → Developer → Connected Apps**。

### 工作原理

B1 API 在 `/mcp` 提供单一的 MCP 端点。Claude 连接该端点，使用您的 `cak_…` 密钥进行身份验证，并获得四个工具的访问权限：

| 工具 | 功能 |
|---|---|
| `list_endpoints` | 列出 Claude 可以调用的 REST 端点，可按路径筛选。用于发现端点。 |
| `describe_endpoint` | 返回特定端点的简要说明以及示例请求/响应。 |
| `api_call` | 以已认证用户的身份实际调用 REST 端点。 |
| `describe_page_builder` | 构建和编辑教会网站页面的指南，Claude 在处理网站内容前会先阅读此指南。 |

这与您的 B1Admin 所使用的 `/membership/people`、`/giving/donations`、`/attendance/visits` 等接口相同，所有授权规则同样适用。

### 安全与限制

- **按教会隔离。** API 密钥仅对应一个教会。Claude 无法查看其他教会的数据。
- **受权限约束。** 如果您在 B1Admin 中移除创建该密钥的人员的某项权限，Claude 将在下一次调用时立即失去该权限。
- **可撤销。** 在 **Settings → Developer → API Keys** 中删除密钥，Claude 的访问权限会立即终止。
- **黑名单。** 服务提供商的 webhooks、OAuth 客户端管理端点以及仅限运营方使用的 `apiEmails` 路由，都无法通过 MCP 调用。
- **响应大小上限。** 单次工具响应上限为 64 KB，以免长列表撑爆 Claude 的上下文。发生这种情况时，Claude 会使用筛选条件缩小查询范围。
- **审计记录。** 数据变更与 B1Admin 操作使用相同的审计日志；您可以在 **Settings → Audit Log** 中查看。

### 故障排除

**Claude 报告 "Unauthorized" 或 401：** Bearer 令牌缺失、格式错误，或该密钥已被撤销。如果您使用的是扩展，请在 Claude 中打开 **Settings → Extensions → B1 (ChurchApps)**，然后重新粘贴密钥。否则，请重新检查 `Authorization: Bearer cak_…` 标头（注意其中的空格以及字面上的 `Bearer`）。

**工具调用返回 403：** 该 API 密钥没有此端点所需的权限范围。请在 **Settings → Developer → API Keys** 中添加该权限范围（您需要创建新密钥，因为权限范围无法原地修改），然后将新密钥粘贴到扩展设置或 Claude 的配置中。

**Claude 找不到某个端点：** 请让它使用筛选条件调用 `list_endpoints`，例如 *"使用 list_endpoints 并以 'donations' 作为筛选条件，找到正确的路径"*。路由清单由实时 API 生成，因此您用 `curl` 能访问到的内容都包含在内。

**本地开发：** 将 `https://api.churchapps.org/mcp` 替换为 `http://localhost:8084/mcp`，认证方式和工具完全相同。

## 相关内容

- [API Keys](/docs/developer/api/api-keys)：完整的权限范围参考
- [MCP Server（开发者参考）](/docs/developer/api/mcp)：协议详情和工具架构
- [ChatGPT](./chatgpt)：同样的思路，适用于 OpenAI 的模型
