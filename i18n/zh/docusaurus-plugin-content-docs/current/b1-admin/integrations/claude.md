---
title: "Claude"
description: "将 B1 Admin 连接到 Claude，让您以日常语言询问考勤、奉献和小组情况，并可选择登录方式或权限受限的密钥。"
---

# Claude

<div class="article-intro">

用简单的中文向 Claude 提问关于你教会的问题，它会根据你的 B1 数据作答——包括你的 FreePlay 课程和班级。例如*"周日有多少位初次到访的访客？"*或*"本月有谁加入了小组？"*——也可以让它执行操作，例如*"帮我们的网站新增一个名为活动的页面。"*设置只需不到 3 分钟，无需任何技术技能，也无需安装任何软件。

</div>

<div class="prereqs">
<h4>你需要准备</h4>

- **一个 Claude 账号。** **免费版即可使用**——这是试用的好方法。不过免费账号有每日消息数量限制，而在 B1 中查询信息会较快消耗消息额度，因此如果你经常使用，我们建议订阅 **Claude Pro**（约每月 20 美元）。
- **你的 B1 登录账号**——与你登录 B1 Admin 所用的相同。

</div>

:::tip 推荐——可免费试用
Claude 是将 B1 连接到 AI 最简便的方式，并且支持 Claude 的**免费版**——是你的教会在花钱之前试用的理想选择。
:::

有两种连接方式。**方式 1 最简单**——无需密钥，也无需安装任何东西。

## 方式 1 —— 使用 B1 账号登录（最简单）

可在 Claude 网站、Claude 桌面应用和 Claude 手机应用上使用——只需设置一次，即可在所有设备上生效。

### 第 1 步 —— 打开 Claude 的连接器设置

1. 访问 [claude.ai](https://claude.ai) 并登录（或创建免费账号）。
2. 点击左下角的你的名字，然后依次点击 **Settings** → **Connectors**。

### 第 2 步 —— 添加 B1

1. 点击 **Add**，然后点击 **Add custom connector**。
2. **Name（名称）：** 输入 `B1`。
3. **URL：** 粘贴 `https://api.churchapps.org/mcp`
4. 其他选项保持默认，然后点击 **Add**。

### 第 3 步 —— 登录 B1

1. 点击 **Connect**。会打开 B1 登录页面。
2. 使用你的 B1 账号登录。如果你属于多个教会，请确认顶部显示的是正确的教会。
3. B1 会列出 Claude 请求执行的操作，并确认你将返回 **claude.ai**。点击 **Allow**。

你已返回 Claude，B1 会显示为已连接。

### 第 4 步 —— 试着提问

开启一个**新对话**，然后试试：

- *"我们教会有多少人？"*
- *"列出我们的活跃小组。"*
- *"按基金汇总本月的奉献。"*
- *"过去 30 天内有谁加入了教会？"*

第一次使用时，Claude 会请求使用 B1 的权限——点击 **Allow** 即可。

## 方式 2 —— 带 B1 密钥的桌面扩展

如果你希望为 Claude 提供权限有限的密钥（例如仅允许查看），可以使用此方式。它适用于 Mac 或 Windows 上的 Claude 桌面应用，并且你需要拥有在 B1 中管理教会设置的权限才能创建密钥。

### 第 1 步 —— 获取 Claude 应用

从 [claude.com/download](https://claude.com/download) 下载 Claude 应用，安装、打开并登录。

### 第 2 步 —— 创建你的 B1 密钥

该密钥让 Claude 能够访问*你的*教会 B1——可以把它理解为专门供 Claude 使用的密码。

1. 登录 [B1 Admin](https://admin.b1.church)，进入 [Settings → Developer](https://admin.b1.church/settings/developer)。
2. 在 **API Keys** 标签页中，点击 **New API Key**。
3. **Name（名称）：** 输入 `Claude`。
4. **Scopes（权限范围）：** 勾选 Claude 可以执行的操作。每个模块都有一个 **read**（只读）复选框和一个 **write**（写入）复选框。不确定时，可先只勾选 **read** 复选框——之后如需更多权限，可以再创建新密钥。
5. 点击 **Save**，然后点击 **Copy** 复制密钥。密钥只会显示一次，请直接进入第 3 步。

### 第 3 步 —— 将 B1 添加到 Claude

1. [下载 B1 扩展](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb)。
2. **双击**下载的文件（`b1-churchapps.mcpb`）。Claude 会打开并显示 **B1 (ChurchApps)**。
3. 点击 **Install**。
4. 当提示输入你的 **B1 API key** 时，粘贴第 2 步中的密钥并保存。
5. **完全退出 Claude**（Mac：**Cmd+Q** · Windows：右键点击任务栏中的 Claude 图标 → **Quit**），然后重新打开。

如果双击没有打开 Claude，请在 Claude 中进入 **Settings → Extensions → Advanced settings → Install Extension…**，然后选择下载的文件。之后开启新对话，并提问即可。

:::tip 已经安装了扩展？
无需任何操作——FreePlay 通过同一连接工作。唯一的例外是 1.1.0 版本，它会要求输入 B1 的电子邮件和密码：请重新下载并安装扩展以进行更新。你的密钥会保留。
:::

## 是否安全？

- Claude 只能看到**你教会的**数据。
- **使用账号登录（方式 1）：** Claude 的权限永远不会超过你自己的 B1 登录账号。在你点击 **Allow** 之前，B1 登录页面会列出 Claude 可以执行的所有操作。
- **使用密钥（方式 2）：** Claude 在 B1 中只能执行该密钥允许的操作——只勾选了 **read** 复选框的密钥只能查看，永远无法做出任何更改。FreePlay 在同一密钥下以相同方式工作。
- **如何关闭：** 在 B1 Admin 中进入 **Settings → Developer**，在 **Connected Apps**（方式 1）下撤销该应用，或在 **API Keys**（方式 2）下删除该密钥。访问会立即停止。你也可以在 Claude 中点击 B1 连接器上的 **Disconnect**。

## 费用如何？

B1 连接是免费的——它是 ChurchApps 的一部分。Claude 本身有免费版；Claude Pro（约每月 20 美元）可提供更多使用额度。参见 [claude.com/pricing](https://claude.com/pricing)。

## 技术细节

本页其余部分面向技术用户和 AI 助手：权限范围、其他连接方式以及工作原理。

### 权限范围 {#scopes}

Claude 通过内置于 B1 API（`https://api.churchapps.org/mcp`）中的 **Model Context Protocol (MCP) 服务器**与 B1 通信。每次调用都会经过与 B1 Admin 请求相同的身份验证、权限和教会范围规则。Claude 的权限仅限于 API 密钥的**权限和范围**，无法访问 webhooks、OAuth 管理端点或其他仅限运营方使用的路径。

常见的入门权限组合：

- **只读助手：** `people:read`、`groups:read`、`attendance:read`、`donations:read`、`content:read`
- **读取 + 添加备注 / 任务：** 再加上 `people:write`
- **完整运营助手：** 添加你需要的对应 `:write` 权限

仅拥有 `donations:read` 的密钥可以让 Claude 汇总奉献，但无法记录奉献。仅拥有 `people:write` 的密钥可以添加人员，但无法查看奉献。每项权限允许的操作，参见 [API 密钥](/docs/developer/api/api-keys)。

### 其他连接方式

#### Claude Code（命令行）

在终端中执行：

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

完成。在任意 Claude Code 会话中输入 `/mcp`，即可确认 `b1` 服务器已连接，然后向 Claude 询问任何关于你教会的问题。

#### Claude Desktop —— 手动配置（进阶）

如果你不想使用扩展，可以编辑 Claude Desktop 的配置文件：

- **macOS：** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows：** `%APPDATA%\Claude\claude_desktop_config.json`

添加一个 `b1` 服务器条目，通过 `mcp-remote` 连接到 B1（需要安装 [Node.js](https://nodejs.org)）：

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

#### Claude.ai（网页）—— 自定义连接器

参见上文的**方式 1**。该连接器使用 OAuth 2.1：Claude 从 `https://api.churchapps.org/.well-known/oauth-protected-resource` 发现 B1 的授权服务器，通过动态客户端注册（Dynamic Client Registration）完成自我注册，并使用 PKCE 登录。在 Team 和 Enterprise 方案中，组织所有者可能需要先为组织添加该连接器。Claude 不会请求特定的权限范围，因此授权页面会提供已登录 B1 账号可访问的全部内容。若要撤销，请在 B1 Admin 中进入 **Settings → Developer → Connected Apps**。

### 工作原理

B1 API 在 `/mcp` 上提供单一的 MCP 端点。Claude 连接到该端点，使用你的 `cak_…` 密钥进行身份验证，并获得四种工具的访问权限：

| 工具 | 功能 |
|---|---|
| `list_endpoints` | 列出 Claude 可以调用的 REST 端点，可按路径筛选。用于发现可用端点。 |
| `describe_endpoint` | 返回某个特定端点的简要说明以及请求/响应示例。 |
| `api_call` | 以已通过身份验证的用户身份实际调用某个 REST 端点。 |
| `describe_page_builder` | 关于构建和编辑教会网站页面的指南，Claude 在处理网站内容前会先阅读它。 |

这与你的 B1 Admin 所使用的 `/membership/people`、`/giving/donations`、`/attendance/visits` 等接口完全相同——所有授权规则同样适用。FreePlay（lessons.church）的端点列在 `/lessons/*` 下；Claude 对其的调用会以相同用户的身份、相同权限转发给 FreePlay。

### 安全性与限制

- **教会间隔离。** API 密钥只对应一个教会。Claude 无法查看其他教会的数据。
- **权限范围控制。** 如果你在 B1 Admin 中移除了创建该密钥的人员的某项权限，Claude 会在下一次调用时立即失去该权限。
- **可撤销。** 在 **Settings → Developer → API Keys** 中删除该密钥，Claude 的访问权限会立即终止。
- **黑名单。** 服务商 webhooks、OAuth 客户端管理端点以及仅限运营方使用的 `apiEmails` 路由，都无法通过 MCP 调用。
- **响应大小上限。** 单次工具响应上限为 64 KB，以免长列表占满 Claude 的上下文——发生这种情况时，Claude 会使用筛选条件缩小查询范围。
- **审计记录。** 数据变更会经过与 B1 Admin 操作相同的审计日志；你可以在 **Settings → Audit Log** 中查看。

### 故障排除

**Claude 要求输入 B1 的电子邮件和密码才能使用 FreePlay：** 你使用的是桌面扩展的 1.1.0 版本。请重新下载并安装以进行更新——较新版本只需使用你的密钥。

**Claude 报告 "Unauthorized" 或 401：** 缺少 Bearer 令牌、令牌格式错误，或密钥已被撤销。如果你使用的是扩展，请在 Claude 中打开 **Settings → Extensions → B1 (ChurchApps)**，然后重新粘贴密钥。否则，请重新检查 `Authorization: Bearer cak_…` 请求头（注意其中的空格以及字面上的 `Bearer`）。

**工具调用返回 403：** 该 API 密钥没有该端点所需的权限范围。请在 **Settings → Developer → API Keys** 中添加权限范围（由于权限范围无法原地修改，你需要创建一个新密钥），然后将新密钥粘贴到扩展设置或 Claude 的配置中。

**Claude 找不到某个端点：** 请让它使用筛选条件调用 `list_endpoints`，例如*"使用 list_endpoints 并以 'donations' 作为筛选条件，查找正确的路径"*。路由清单由实时 API 生成，因此你可以用 `curl` 访问的任何接口都包含在内。

**本地开发：** 将 `https://api.churchapps.org/mcp` 替换为 `http://localhost:8084/mcp`——身份验证和工具完全相同。

## 相关内容

- [API 密钥](/docs/developer/api/api-keys) —— 完整的权限范围参考
- [MCP 服务器（开发者参考）](/docs/developer/api/mcp) —— 协议细节和工具架构
- [ChatGPT](./chatgpt.md) —— 同样的思路，适用于 OpenAI 的模型
