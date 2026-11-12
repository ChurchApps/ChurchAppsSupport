---
title: "ChatGPT"
description: "使用 API 密钥将 ChatGPT 连接到你教会的 B1 资料，即可在 B1 Admin 中以浅显的语言询问有关人员、奉献和出席的问题。"
---

# ChatGPT

<div class="article-intro">

将 ChatGPT 连接到你教会的 B1 资料，即可用浅显的语言向它提问——它会根据你教会的实时记录作答。你也可以请它协助处理那些在 B1 Admin 中需要多个步骤才能完成的工作。

**你可以问的一些问题**：
- *"列出上周有出席但尚未加入任何小组的所有人"*
- *"按基金总结本月的奉献情况"*
- *"我们最近的新会员是谁？我们有没有跟进他们？"*
- *"我不知道如何在 B1 中做 X，你能一步步教我吗？"*

</div>

<div class="prereqs">
<h4>所需条件</h4>

- **ChatGPT 桌面应用程序**（适用于 Mac 或 Windows）
- **付费的 ChatGPT 套餐**（Plus 或更高级别）。免费的 ChatGPT 账户无法连接 B1。
- **你的 B1 登录账户**，并具有管理教会设置的权限（建立密钥时需要）。没有权限？请询问你教会的 B1 管理员。

</div>

:::tip 推荐：先试用 Claude，它是免费的
[Claude](./claude.md) 可在**免费方案**下连接 B1，设置时间不到 3 分钟——只需将 B1 添加为连接器并使用你的 B1 账户登录即可，无需密钥。这是你的教会在付费之前，试用 B1 结合 AI 功能最简单的方式。
:::

## 设置方法 {#set-it-up}

你所使用的 ChatGPT 版本，画面可能略有不同。

---

**步骤 1——建立你的 B1 密钥**

这个密钥让 ChatGPT 能够进入*你的*教会 B1——你可以把它看作仅供 ChatGPT 使用的密码。

1. 登录 [B1 Admin](https://admin.b1.church)，然后前往 [Settings → Developer](https://admin.b1.church/settings/developer)。
2. 在 **API Keys** 标签页中，点击 **New API Key**，并将其命名为 `ChatGPT`。
3. **权限范围（Scopes）**：勾选 ChatGPT 可以执行的操作。每个区域都有 **read**（只读）和 **write**（可更改）两个方框。如果不确定，可先只勾选 **read** 方框。
4. 点击 **Save**，然后点击 **Copy** 复制密钥（它以 `cak_` 开头）。该密钥只会显示一次。

---

**步骤 2——点击 ChatGPT 左下角的你的名字**

![点击你的个人资料名称](/img/guides/chatgpt-mcp/01.png)

---

**步骤 3——点击 Settings**

![从菜单中点击 Settings](/img/guides/chatgpt-mcp/02.png)

---

**步骤 4——点击左侧边栏中的 Plugins**

![点击 Integrations 下的 Plugins](/img/guides/chatgpt-mcp/03.png)

---

**步骤 5——点击 MCPs 标签页**

![点击 MCPs 标签页](/img/guides/chatgpt-mcp/04.png)

你已添加的 MCP 服务器会显示在这里。

---

**步骤 6——点击 Add → Add MCP server**

![点击 Add，然后点击 Add MCP server](/img/guides/chatgpt-mcp/06.png)

---

**步骤 7——填写表单并点击 Save**

![连接到自定义 MCP 的表单](/img/guides/chatgpt-mcp/07.png)

点击 **Streamable HTTP**，然后填写：

| 字段 | 填入内容 |
|---|---|
| **Name** | `B1 Church`（或任何你喜欢的名称） |
| **Type** | 点击 **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | 留空 |
| **Headers** | 点击 **+ Add header** → Key：`Authorization` → Value：见下方 |

![填写示例，Key 为 Authorization，Value 为 Bearer 密钥](/img/guides/chatgpt-mcp/08.png)

- **Key**： `Authorization`
- **Value**： `Bearer cak_yourkey`——先输入单词 Bearer，接着一个空格，然后是你的密钥

点击 **Save**。

完成了！回到聊天画面，询问类似*"我们教会有多少人？"*的问题，ChatGPT 便会直接从 B1 获取答案。

---

## 安全吗？ {#is-it-safe}

- ChatGPT 只能看到**你教会**的资料。
- 它只能执行你的密钥所允许的操作——只勾选了 **read** 方框的密钥，只能查看，无法更改任何内容。
- 若要关闭此连接，请在 B1 Admin 的 **Settings → Developer** 中删除该密钥。访问权限会立即停止。

## 费用是多少？ {#what-does-it-cost}

B1 连接是免费的，它是 ChurchApps 的一部分。ChatGPT 需要付费方案（Plus 或更高级别）才能连接；请参阅 OpenAI 的定价说明。

## 技术细节 {#technical-details}

本页其余部分供技术用户和 AI 助手参考。B1 的 MCP 服务器位于 `https://api.churchapps.org/mcp`（Streamable HTTP），并以 `Authorization: Bearer cak_…` 标头接收 API 密钥。请参阅 [MCP 服务器开发者参考](/docs/developer/api/mcp)。

### 带有 Actions 的自定义 GPT {#custom-gpt-with-actions}

自定义 GPT 可让你建立一个专属助手，供整个团队共享——他们只需打开链接即可开始提问，无需任何设置。它需要 ChatGPT Plus、Team 或 Enterprise 账户，大约需要 10 分钟。

#### 1. 建立 API 密钥 {#1-create-an-api-key}

如果你尚未这样做，请先依照上方"设置方法"的步骤 1 操作。

#### 2. 建立自定义 GPT {#2-build-the-custom-gpt}

1. 在 ChatGPT 中，点击你的个人资料 → **My GPTs** → **Create a GPT**。
2. 切换到 **Configure** 标签页，为 GPT 命名（例如"B1 Assistant"），并添加指令：

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. 滚动到 **Actions** → **Create new action** → **Authentication**。
   - **Authentication type**：API Key
   - **API Key**：粘贴你的 `cak_…` 密钥
   - **Auth Type**：Bearer
   - 保存。

4. 在 **Schema** 方框中，粘贴以下入门级 OpenAPI 规范：

   ```yaml
   openapi: 3.1.0
   info:
     title: B1 API
     version: "1.0"
   servers:
     - url: https://api.churchapps.org
   paths:
     /membership/people:
       get:
         operationId: listPeople
         summary: List everyone in the church
         responses:
           "200":
             description: OK
     /membership/people/search:
       get:
         operationId: searchPeople
         summary: Find people by name, or by exact email
         parameters:
           - in: query
             name: term
             schema: { type: string }
           - in: query
             name: email
             schema: { type: string }
         responses:
           "200":
             description: OK
     /membership/people/{id}:
       get:
         operationId: getPerson
         summary: Get a single person by id
         parameters:
           - in: path
             name: id
             required: true
             schema: { type: string }
         responses:
           "200":
             description: OK
     /membership/groups:
       get:
         operationId: listGroups
         summary: List groups in the church
         responses:
           "200":
             description: OK
     /giving/donations:
       get:
         operationId: listDonations
         summary: List donations for one person, or between two dates (send both startDate and endDate as YYYY-MM-DD)
         parameters:
           - in: query
             name: personId
             schema: { type: string }
           - in: query
             name: startDate
             schema: { type: string, format: date }
           - in: query
             name: endDate
             schema: { type: string, format: date }
         responses:
           "200":
             description: OK
     /attendance/attendancerecords/search:
       get:
         operationId: listAttendance
         summary: List attendance records between two dates, optionally for one campus, service, service time, or group
         parameters:
           - in: query
             name: startDate
             required: true
             schema: { type: string, format: date }
           - in: query
             name: endDate
             required: true
             schema: { type: string, format: date }
           - in: query
             name: campusId
             schema: { type: string }
           - in: query
             name: serviceTimeId
             schema: { type: string }
           - in: query
             name: groupId
             schema: { type: string }
         responses:
           "200":
             description: OK
   ```

5. 保存该 action。测试一下：*"教会里有多少人？"*——ChatGPT 会调用 `listPeople` 并给出答案。
6. **Publish** 该 GPT（Only me / Anyone with link / Organization），并将链接分享给你的团队。

#### 3. 使用方式 {#3-use-it}

任何拥有该链接的人都可以用自然语言提问。密钥的权限范围仍然适用——只读密钥无论 action 规范如何设置，都会拒绝写入操作。

---

### 安全与限制 {#safety-and-limits}

- **每间教会互相隔离**。API 密钥只对应一间教会。ChatGPT 无法看到其他教会的资料。
- **依权限限定范围**。密钥只包含你授予的权限范围。删除并重新建立密钥以移除某项权限，该权限会在下一次调用时失效。
- **可立即撤销**。在 **Settings → Developer → API Keys** 中删除密钥，访问权限会立即结束。
- **分享自定义 GPT 即等于分享资料**。任何有权使用该 GPT 的人，都能看到密钥权限范围所允许的内容。对于会广泛分享的 GPT，建议使用范围较窄的权限（例如省略 `donations:read`）。
- **审计记录**。通过 ChatGPT 所做的任何更改，都会记录在与 B1 Admin 操作相同的审计日志中，可在 **Settings → Audit Log** 中查看。

### 故障排除 {#troubleshooting}

**MCP 连接器显示"Unauthorized"或 401 错误**：你的 API 密钥缺失或不正确。请打开连接器设置并检查 **Authorization** 标头：其值应为单词 `Bearer`、一个空格，然后是完整的 `cak_…` 密钥，中间不能有多余的空格。

**ChatGPT 表示找不到某些资料**：该密钥可能缺少所需的权限范围。请在 **Settings → Developer → API Keys** 中，建立一个包含额外权限范围的新密钥，并更新连接器。

**自定义 GPT 的 action 返回 401**：请在 action 的验证面板中确认已选择 **Auth Type: Bearer**，并且密钥中不包含 `Bearer` 一词（ChatGPT 会自动加上）。

**自定义 GPT 的 action 返回 403**：该密钥没有此端点的权限范围。请建立包含正确权限范围的新密钥，并更新该 GPT。

**action 规范被拒绝**：ChatGPT 要求 OpenAPI 3.1，且至少包含一个 `paths` 条目以及 `servers` 网址。粘贴前请先在 [editor.swagger.io](https://editor.swagger.io) 验证 YAML。

## 相关链接 {#related}

- [API 密钥](/docs/developer/api/api-keys)：完整的权限范围参考
- [MCP 服务器（开发者参考）](/docs/developer/api/mcp)：协议细节与工具规范
- [Claude](./claude.md)：相同的概念，适用于 Anthropic 的模型
- [REST API 参考](/docs/developer/api/endpoints)：自定义 GPT action 可调用的每个端点
