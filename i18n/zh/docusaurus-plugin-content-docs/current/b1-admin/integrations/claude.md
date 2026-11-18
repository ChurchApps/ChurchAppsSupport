---
title: "Claude"
description: "将 B1 Admin 连接到 Claude，即可用浅显的语言询问出席、奉献和小组情况；可选择使用账户登录，或使用权限受限的密钥。"
---

# Claude

<div class="article-intro">

用浅显的语言向 Claude 询问教会的情况，它会根据你的 B1 资料作答——包括你的 FreePlay 课程与班级。你可以问"周日来了多少位初次到访的访客？"或"这个月有谁加入了小组？"，也可以请它执行操作，例如"在我们的网站上新增一个名为 Events 的页面。"设置时间不到 3 分钟，无需任何技术知识，也不需要安装任何软件。

</div>

<div class="prereqs">
<h4>所需条件</h4>

- **Claude 账户**。**免费方案即可使用**，是很好的试用方式。不过免费账户有每日消息数量限制，而在 B1 中查询资料会快速消耗消息数量，因此如果你经常使用，我们建议订阅 **Claude Pro**（约每月 20 美元）。
- **你的 B1 登录账户**——与你登录 B1 Admin 时使用的相同。

</div>

:::tip 推荐——可免费试用
Claude 是将 B1 连接到 AI 最简单的方式，并可在 Claude 的**免费方案**下使用——非常适合你的教会在付费之前先行试用。
:::

连接方式有两种。**选项 1 最简单**——无需密钥，也无需安装任何东西。

## 选项 1——使用 B1 账户登录（最简单） {#option-1--sign-in-with-b1-easiest}

可在 Claude 网站、Claude 桌面应用程序和 Claude 手机应用程序中使用——只需设置一次，即可在所有平台上使用。

### 步骤 1——打开 Claude 的连接器设置 {#step-1--open-claudes-connector-settings}

1. 前往 [claude.ai](https://claude.ai)并登录（或建立免费账户）。
2. 点击左下角的你的名字，然后依次点击 **Customize** → **Connectors**。

### 步骤 2——添加 B1 {#step-2--add-b1}

1. 点击 **Add**，然后点击 **Add custom connector**。
2. **Name**：输入 `B1`。
3. **URL**：粘贴 `https://api.churchapps.org/mcp`
4. 其他选项保持不变，然后点击 **Add**。

### 步骤 3——登录 B1 {#step-3--sign-in-to-b1}

1. 点击 **Connect**。随即会打开 B1 登录页面。
2. 使用你的 B1 账户登录。如果你隶属于一间以上的教会，请确认页面上显示的是正确的教会（"Would you like to access the following data from *your church*…"）。
3. B1 会列出 Claude 所请求的权限（**Everything your B1 account can access**），说明该应用程序已向 B1 注册，并确认你将被送回 **claude.ai**。点击 **Allow**。

你会回到 Claude 中，而 B1 会显示为已连接。

### 步骤 4——试着提问 {#step-4--ask-it-something}

开始一个**新的对话**，然后试试：

- *"我们教会有多少人？"*
- *"列出我们目前活跃的小组。"*
- *"按基金总结本月的奉献情况。"*
- *"过去 30 天内有谁加入了教会？"*

首次使用时，Claude 会请求使用 B1 的许可——点击 **Allow**。

## 选项 2——使用 B1 密钥的桌面扩展功能 {#option-2--desktop-extension-with-a-b1-key}

如果你希望为 Claude 提供权限受限的密钥（例如仅供查看），请使用此方式。它适用于 Mac 或 Windows 上的 Claude 桌面应用程序，你需要具有在 B1 中管理教会设置的权限才能建立密钥。

### 步骤 1——获取 Claude 应用程序 {#step-1--get-the-claude-app}

从 [claude.com/download](https://claude.com/download) 下载 Claude 应用程序，安装、打开并登录。

### 步骤 2——建立你的 B1 密钥 {#step-2--make-your-b1-key}

这个密钥让 Claude 能够进入*你的*教会 B1——你可以把它看作仅供 Claude 使用的密码。

1. 登录 [B1 Admin](https://admin.b1.church)，然后前往 [Settings → Developer](https://admin.b1.church/settings/developer)。
2. 在 **API Keys** 标签页中，点击 **New API Key**。
3. **Name**：输入 `Claude`。
4. **权限范围（Scopes）**：勾选 Claude 可以执行的操作。大多数区域都有 **read**（只读）和 **write**（可更改）两个方框；表单区域则只有 **forms:write**。如果不确定，可先只勾选 **read** 方框——之后随时可以建立权限更多的新密钥。
5. 点击 **Save**，然后点击 **Copy** 复制密钥。它只会显示一次，因此请直接进行步骤 3。

### 步骤 3——将 B1 添加到 Claude {#step-3--add-b1-to-claude}

1. [下载 B1 扩展功能](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb)。
2. **双击**下载的文件（`b1-churchapps.mcpb`）。Claude 会打开并显示 **B1 (ChurchApps)**。
3. 点击 **Install**。
4. 出现要求输入 **B1 API key** 的提示时，粘贴步骤 2 中的密钥并保存。
5. **完全退出 Claude**（Mac：**Cmd+Q** · Windows：在任务栏中右键点击 Claude 图标 → **Quit**），然后重新打开。

如果双击无法打开 Claude，请在 Claude 中前往 **Settings → Extensions → Advanced settings → Install Extension…**，然后选择下载的文件。接着开始一个新的对话并询问它任何问题。

:::tip 已经安装了扩展功能？
无需任何操作——FreePlay 通过同一个连接运行。唯一的例外是 1.1.0 版本，它会要求输入 B1 的电子邮件和密码：请重新下载并安装扩展功能以进行更新。你的密钥不会受影响。
:::

## 安全吗？ {#is-it-safe}

- Claude 只能看到**你教会**的资料。
- **已登录（选项 1）**：Claude 的权限永远不会超过你自己的 B1 登录账户。在你点击 **Allow** 之前，B1 登录页面会显示 Claude 所请求的内容。
- **使用密钥（选项 2）**：Claude 只能执行该密钥在 B1 中所允许的操作——只勾选了 **read** 方框的密钥，只能查看，无法更改任何内容。FreePlay 以相同的密钥、以相同的方式运作。
- **如何关闭**：在 B1 Admin 中前往 **Settings → Developer**，在 **Connected Apps** 下撤销该应用程序（选项 1），或在 **API Keys** 下删除该密钥（选项 2）。访问权限会立即停止。你也可以在 Claude 中点击 B1 连接器上的 **Disconnect**。

## 费用是多少？ {#what-does-it-cost}

B1 连接是免费的，它是 ChurchApps 的一部分。Claude 本身有免费方案；Claude Pro（约每月 20 美元）则可提供更多的使用额度。请参阅 [claude.com/pricing](https://claude.com/pricing)。

## 技术细节 {#technical-details}

本页其余部分供技术用户和 AI 助手参考：包括权限范围、其他连接方式，以及运作原理。

### 权限范围 {#scopes}

Claude 通过内置于 B1 API（`https://api.churchapps.org/mcp`）中的 **Model Context Protocol (MCP) 服务器**与 B1 通信。每一次调用都会经过与 B1 Admin 请求相同的身份验证、权限与教会范围规则。Claude 仅限于该 API 密钥的**权限与权限范围**，无法访问付款服务提供商的 webhook、OAuth 客户端管理端点，或登录与密码端点。

常见的入门权限组合：

- **只读助手**：`people:read`、`groups:read`、`attendance:read`、`donations:read`、`content:read`
- **读取 + 新增备注 / 任务**：加上 `people:write`
- **完整的运营助手**：加上你需要的对应 `:write` 权限范围

拥有 `donations:read` 的密钥可以让 Claude 总结奉献情况，但无法记录奉献。拥有 `people:write` 的密钥可以新增人员，但无法查看奉献。各权限范围允许的操作，请参阅 [API 密钥](/docs/developer/api/api-keys)。

### 其他连接方式 {#other-ways-to-connect}

#### Claude Code（CLI） {#claude-code-cli}

在终端机中：

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

完成。在任何 Claude Code 会话中，输入 `/mcp` 以确认 `b1` 服务器已连接，然后询问 Claude 任何有关你教会的问题。

#### Claude Desktop——手动设置（进阶） {#claude-desktop--manual-config-advanced}

如果你不想使用扩展功能，可以编辑 Claude Desktop 的设置文件：

- **macOS**：`~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**：`%APPDATA%\Claude\claude_desktop_config.json`

添加一个通过 `mcp-remote` 连接 B1 的 `b1` 服务器项目（需要 [Node.js](https://nodejs.org)）：

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

重新启动 Claude Desktop。聊天输入框中的连接器菜单会显示 `b1` 及其工具。

#### Claude.ai（网页）——自定义连接器 {#claudeai-web--custom-connector}

请参阅上方的**选项 1**。该连接器使用 OAuth 2.1：Claude 会从 `https://api.churchapps.org/.well-known/oauth-protected-resource` 发现 B1 的授权服务器，通过 Dynamic Client Registration 向其注册，并使用 PKCE 登录。在 Team 和 Enterprise 方案中，组织的拥有者可能需要先为整个组织添加该连接器。Claude 不会请求特定的权限范围，因此同意页面会列出已登录的 B1 账户可以访问的全部内容。若要撤销，请在 B1 Admin 中前往 **Settings → Developer → Connected Apps**。

### 运作原理 {#how-it-works}

B1 API 在 `/mcp` 提供单一的 MCP 端点。Claude 连接该端点，使用你的 `cak_…` 密钥进行身份验证，并取得以下四个工具的访问权限：

| 工具 | 功能 |
|---|---|
| `list_endpoints` | 列出 Claude 可以调用的 REST 端点，可依路径筛选。用于探索。 |
| `describe_endpoint` | 返回特定端点的简短说明，以及示例请求与响应。 |
| `api_call` | 以已通过身份验证的用户身份，实际调用 REST 端点。 |
| `describe_page_builder` | 有关建立与编辑教会网站页面的指南，Claude 在处理网站内容前会先阅读它。 |

这与你在 B1Admin 中使用的 `/membership/people`、`/giving/donations`、`/attendance/visits` 等接口相同——每一条授权规则都同样适用。FreePlay（lessons.church）的端点列于 `/lessons/*` 之下；Claude 对这些端点的调用会以同一位用户的身份、相同的权限转发给 FreePlay。

### 安全与限制 {#safety-and-limits}

- **每间教会互相隔离**。API 密钥只对应一间教会。Claude 无法看到其他教会的资料。
- **依权限限定范围**。如果你在 B1Admin 中移除建立该密钥的人员的某项权限，Claude 会在下一次调用时立即失去该权限。
- **可撤销**。在 **Settings → Developer → API Keys** 中删除密钥，Claude 的访问权限会立即结束。
- **禁止清单**。付款服务提供商的 webhook 端点、OAuth 客户端管理端点，以及登录、注册、密码和双重验证端点，都无法通过 MCP 调用。
- **回应大小上限**。单一工具的回应上限为 64 KB，以免长列表占满 Claude 的上下文——发生此情况时，Claude 会以筛选条件缩小查询范围。
- **审计记录**。变更操作会记录在与 B1Admin 操作相同的审计日志中；你可以在 **Settings → Audit Log** 中查看。

### 故障排除 {#troubleshooting}

**Claude 要求输入 B1 电子邮件和密码才能使用 FreePlay**：你使用的是桌面扩展功能的 1.1.0 版本。请重新下载并安装以进行更新——较新版本只需使用你的密钥。

**Claude 显示"Unauthorized"或 401**：Bearer 令牌缺失、格式错误，或该密钥已被撤销。如果你使用的是扩展功能，请在 Claude 中打开 **Settings → Extensions → B1 (ChurchApps)**，然后重新粘贴密钥。否则，请重新检查 `Authorization: Bearer cak_…` 标头（注意其中的空格以及字面上的 `Bearer`）。

**工具调用返回 403**：该 API 密钥没有此端点的权限范围。请在 **Settings → Developer → API Keys** 中新增权限范围（你需要建立新的密钥——权限范围无法原地更改），然后将新密钥粘贴到扩展功能的设置或 Claude 的设置中。

**Claude 找不到某个端点**：请它以筛选条件调用 `list_endpoints`，例如 *"use list_endpoints with filter 'donations' to find the right path"*。路由清单由线上 API 自动生成，因此任何你能用 `curl` 访问的端点都包含在内。

**本地开发**：将 `https://api.churchapps.org/mcp` 替换为 `http://localhost:8084/mcp`——身份验证与工具完全相同。

## 相关链接 {#related}

- [API 密钥](/docs/developer/api/api-keys)：完整的权限范围参考
- [MCP 服务器（开发者参考）](/docs/developer/api/mcp)：协议细节与工具规范
- [ChatGPT](./chatgpt.md)：相同的概念，适用于 OpenAI 的模型
