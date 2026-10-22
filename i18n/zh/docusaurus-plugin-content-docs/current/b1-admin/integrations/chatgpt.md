---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

将 ChatGPT 连接到您教会的 B1 数据，然后用日常语言向它提问 — 它会根据您教会的实时记录作答。您还可以让它帮忙处理在 B1 Admin 中需要好几个步骤才能完成的事情。

**您可以问的一些问题：**
- *"告诉我上周出席但还没有被分配到小组的每个人"*
- *"按基金汇总本月的奉献"*
- *"我们最新的成员有哪些，我们是否跟进过他们？"*
- *"我不知道如何在 B1 中做 X — 你能一步步教我吗？"*

</div>

<div class="prereqs">
<h4>您需要准备</h4>

- 适用于 Mac 或 Windows 的 **ChatGPT 桌面应用**
- **付费的 ChatGPT 计划**（Plus 或更高级别）。免费的 ChatGPT 账户无法连接到 B1。
- **您的 B1 登录账户**，并具有管理教会设置的权限（创建密钥时需要）。没有这个权限？请联系您教会的 B1 管理员。

</div>

:::tip 推荐：先试试 Claude — 它是免费的
[Claude](./claude) 在其 **免费计划** 上即可连接 B1，设置不到 3 分钟 — 只需将 B1 添加为连接器，并使用您的 B1 账户登录。无需密钥。这是您的教会在付费之前试用 AI 与 B1 的最简单方式。
:::

## 开始设置

在您的 ChatGPT 版本中，屏幕可能看起来略有不同。

---

**第 1 步 — 创建您的 B1 密钥**

密钥让 ChatGPT 能够进入 *您的* 教会的 B1 — 可以把它看作是专门给 ChatGPT 用的密码。

1. 登录 [B1 Admin](https://admin.b1.church)，然后前往 [设置 → 开发者](https://admin.b1.church/settings/developer)。
2. 在 **API 密钥** 标签页中，点击 **新建 API 密钥**，并将其命名为 `ChatGPT`。
3. **Scopes：** 勾选 ChatGPT 可以执行的操作。每个区域都有一个 **read** 框（仅查看）和一个 **write** 框（进行更改）。不确定？先只勾选 **read** 框。
4. 点击 **保存**，然后 **复制** 密钥（以 `cak_` 开头）。密钥只显示一次。

---

**第 2 步 — 单击 ChatGPT 左下角的您的名称**

![点击您的资料名称](/img/guides/chatgpt-mcp/01.png)

---

**第 3 步 — 单击 Settings（设置）**

![从菜单中单击 Settings](/img/guides/chatgpt-mcp/02.png)

---

**第 4 步 — 在左侧边栏中单击 Plugins（插件）**

![在 Integrations 下单击 Plugins](/img/guides/chatgpt-mcp/03.png)

---

**第 5 步 — 单击 MCPs 标签**

![单击 MCPs 标签](/img/guides/chatgpt-mcp/04.png)

您会在这里看到您已添加的所有 MCP 服务器。

---

**第 6 步 — 单击 Add → Add MCP server**

![单击 Add 然后单击 Add MCP server](/img/guides/chatgpt-mcp/06.png)

---

**第 7 步 — 填写表单并单击 Save**

![Connect to a custom MCP 表单](/img/guides/chatgpt-mcp/07.png)

单击 **Streamable HTTP**，然后填写：

| 字段 | 填写内容 |
|---|---|
| **Name** | `B1 Church`（或您喜欢的任何名称） |
| **Type** | 单击 **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | 留空 |
| **Headers** | 单击 **+ Add header** → Key：`Authorization` → Value：见下文 |

![填写示例：Key 中为 Authorization，Value 中为 Bearer 密钥](/img/guides/chatgpt-mcp/08.png)

- **Key：** `Authorization`
- **Value：** `Bearer cak_yourkey` — 单词 Bearer，一个空格，然后是您的密钥

单击 **Save**。

就这样！回到聊天中，问一些类似 *"我们教会有多少人？"* 的问题，ChatGPT 就会直接从 B1 获取答案。

---

## 安全吗？

- ChatGPT 只能看到 **您的教会** 的数据。
- 它只能执行您的密钥允许的操作 — 只勾选了 **read** 框的密钥只能查看，永远无法更改任何内容。
- 要关闭它，请在 B1 Admin 的 **设置 → 开发者** 下删除密钥。访问会立即停止。

## 费用是多少？

B1 连接是免费的 — 它是 ChurchApps 的一部分。ChatGPT 需要付费计划（Plus 或更高级别）才能连接；请参阅 OpenAI 的定价。

## 技术细节

本页其余部分面向技术用户和 AI 助手。B1 的 MCP 服务器位于 `https://api.churchapps.org/mcp`（Streamable HTTP），通过 `Authorization: Bearer cak_…` 标头接收 API 密钥。请参阅 [MCP 服务器开发者参考](/docs/developer/api/mcp)。

### 带 Actions 的自定义 GPT

自定义 GPT 让您可以创建一个整个团队都能共享的专用助手 — 他们打开一个链接就能开始提问，无需自己进行任何设置。它需要 ChatGPT Plus、Team 或 Enterprise 账户，大约需要 10 分钟。

#### 1. 创建 API 密钥

如果您还没有创建，请按照上文"开始设置"中的第 1 步操作。

#### 2. 构建自定义 GPT

1. 在 ChatGPT 中，单击您的个人资料 → **My GPTs** → **Create a GPT**。
2. 切换到 **Configure** 标签页，为 GPT 命名（例如"B1 Assistant"）并添加说明：

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. 滚动到 **Actions** → **Create new action** → **Authentication**。
   - **Authentication type：** API Key
   - **API Key：** 粘贴您的 `cak_…` 密钥
   - **Auth Type：** Bearer
   - 保存。

4. 在 **Schema** 框中，粘贴以下入门 OpenAPI 规范：

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
         summary: List people in the church
         parameters:
           - in: query
             name: firstName
             schema: { type: string }
           - in: query
             name: lastName
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
         summary: List donations
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
     /attendance/attendance:
       get:
         operationId: listAttendance
         summary: List attendance records
         parameters:
           - in: query
             name: serviceTimeId
             schema: { type: string }
           - in: query
             name: campusId
             schema: { type: string }
         responses:
           "200":
             description: OK
   ```

5. 保存该 action。测试一下：*"教会里有多少人？"* — ChatGPT 会调用 `listPeople` 并作答。
6. **Publish** 该 GPT（Only me / Anyone with link / Organization），然后与您的团队分享链接。

#### 3. 使用它

任何拥有链接的人都可以用自然语言提问。密钥的 scopes 仍然适用 — 无论 action 规范怎么写，只读密钥都会拒绝写入操作。

---

### 安全和限制

- **按教会隔离。** API 密钥只对应一个教会。ChatGPT 无法看到其他教会的数据。
- **受权限约束。** 密钥只带有您授予的 scopes。移除某个 scope（通过删除并重新创建密钥）会在下一次调用时切断该访问权限。
- **可立即撤销。** 在 **设置 → 开发者 → API 密钥** 中删除密钥，访问会立即结束。
- **共享自定义 GPT 就是共享数据。** 每个能访问该 GPT 的人都能看到密钥 scopes 所允许的任何内容。对于广泛共享的 GPT，最好使用范围更窄的 scopes（例如不包含 `donations:read`）。
- **审计追踪。** 通过 ChatGPT 进行的任何更改都与 B1 Admin 操作记录在同一审计日志中 — 可在 **设置 → 审计日志** 下找到。

### 故障排查

**MCP 连接器显示"Unauthorized"或 401 错误：** 您的 API 密钥缺失或不正确。打开连接器设置并检查 **Authorization** 标头：值应为单词 `Bearer`、一个空格，然后是完整的 `cak_…` 密钥，不要有多余的空格。

**ChatGPT 说找不到某些数据：** 密钥可能没有正确的 scopes。在 **设置 → 开发者 → API 密钥** 中创建一个带有更多 scopes 的新密钥，并更新连接器。

**自定义 GPT action 返回 401：** 在 action 的身份验证面板中，确认已选择 **Auth Type: Bearer**，并且密钥中不包含单词 `Bearer`（ChatGPT 会自动添加）。

**自定义 GPT action 返回 403：** 密钥没有该端点的 scope。创建一个具有正确 scopes 的新密钥并更新 GPT。

**action 规范被拒绝：** ChatGPT 要求使用 OpenAPI 3.1，并且至少包含一个 `paths` 条目和一个 `servers` URL。粘贴之前，请在 [editor.swagger.io](https://editor.swagger.io) 上验证 YAML。

## 相关

- [API 密钥](/docs/developer/api/api-keys) — 完整的 scope 参考
- [MCP 服务器（开发者参考）](/docs/developer/api/mcp) — 协议详情和工具模式
- [Claude](./claude) — 同样的思路，适用于 Anthropic 的模型
- [REST API 参考](/docs/developer/api/endpoints) — 自定义 GPT action 可以调用的每个端点
