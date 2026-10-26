---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

将 ChatGPT 连接到您教会的 B1 数据，并用平实的语言向它提问——它会根据您教会的实时记录作答。您还可以让它帮忙完成在 B1 Admin 中需要多个步骤才能完成的工作。

**您可以问的一些问题：**
- *“请列出上周参加了礼拜、但尚未被分配到小组的所有人”*
- *“按基金汇总本月的奉献情况”*
- *“我们最新的会员是谁？我们是否已经跟进过他们？”*
- *“我不知道如何在 B1 中完成 X——你能一步步指导我吗？”*

</div>

<div class="prereqs">
<h4>您需要准备</h4>

- **适用于 Mac 或 Windows 的 ChatGPT 桌面应用**
- **付费的 ChatGPT 套餐**（Plus 或更高级别）。免费的 ChatGPT 账户无法连接到 B1。
- **您的 B1 登录账户**，并具有管理教会设置的权限（生成密钥时需要）。如果没有，请询问您教会的 B1 管理员。

</div>

:::tip 推荐：先试用 Claude——它是免费的
[Claude](./claude) 可以在其**免费套餐**中连接到 B1，设置只需不到 3 分钟——只需将 B1 添加为连接器，并使用您的 B1 账户登录即可。无需密钥。这是您的教会在为任何服务付费之前，尝试将 AI 与 B1 结合使用的最简单方式。
:::

## 设置步骤

您使用的 ChatGPT 版本中的界面可能略有不同。

---

**第 1 步——生成您的 B1 密钥**

密钥是让 ChatGPT 进入*您教会的* B1 的凭证——可以把它看作专门供 ChatGPT 使用的密码。

1. 登录 [B1 Admin](https://admin.b1.church)，然后前往 [设置 → 开发者（Developer）](https://admin.b1.church/settings/developer)。
2. 在 **API Keys（API 密钥）**选项卡上，点击 **New API Key（新建 API 密钥）**，并将其命名为 `ChatGPT`。
3. **权限范围（Scopes）：**勾选 ChatGPT 可以执行的操作。每个区域都有一个 **read（只读）**框（仅查看）和一个 **write（写入）**框（进行更改）。如果不确定，可以先只勾选 **read（只读）**框。
4. 点击 **Save（保存）**，然后点击 **Copy（复制）**密钥（密钥以 `cak_` 开头）。它只会显示一次。

---

**第 2 步——点击 ChatGPT 左下角的您的名字**

![点击您的个人资料名称](/img/guides/chatgpt-mcp/01.png)

---

**第 3 步——点击 Settings（设置）**

![从菜单中点击设置](/img/guides/chatgpt-mcp/02.png)

---

**第 4 步——点击左侧边栏中的 Plugins（插件）**

![点击 Integrations（集成）下的插件](/img/guides/chatgpt-mcp/03.png)

---

**第 5 步——点击 MCPs 选项卡**

![点击 MCPs 选项卡](/img/guides/chatgpt-mcp/04.png)

您已添加的任何 MCP 服务器都会显示在这里。

---

**第 6 步——点击 Add（添加）→ Add MCP server（添加 MCP 服务器）**

![点击 Add，然后点击 Add MCP server](/img/guides/chatgpt-mcp/06.png)

---

**第 7 步——填写表单并点击 Save（保存）**

![连接到自定义 MCP 表单](/img/guides/chatgpt-mcp/07.png)

点击 **Streamable HTTP**，然后填写：

| 字段 | 填写内容 |
|---|---|
| **Name（名称）** | `B1 Church`（或任何您喜欢的名称） |
| **Type（类型）** | 点击 **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var（Bearer 令牌环境变量）** | 留空 |
| **Headers（请求头）** | 点击 **+ Add header（添加请求头）** → Key（键）：`Authorization` → Value（值）：见下文 |

![示例填写效果，Key 中为 Authorization，Value 中为 Bearer 密钥](/img/guides/chatgpt-mcp/08.png)

- **Key（键）：**`Authorization`
- **Value（值）：**`Bearer cak_yourkey`——即单词 Bearer、一个空格，然后是您的密钥

点击 **Save（保存）**。

完成！返回聊天窗口，问一个类似“我们教会有多少人？”的问题，ChatGPT 就会直接从 B1 中获取答案。

---

## 是否安全？

- ChatGPT 只能看到**您教会的**数据。
- 它只能执行您的密钥所允许的操作——只勾选了**只读**框的密钥只能查看，永远无法做出更改。
- 若要关闭此连接，请在 B1 Admin 中前往 **设置 → 开发者（Settings → Developer）**并删除该密钥。访问权限将立即停止。

## 费用是多少？

B1 连接是免费的——它是 ChurchApps 的一部分。ChatGPT 需要付费套餐（Plus 或更高级别）才能连接；请参阅 OpenAI 的定价。

## 技术细节

本页的其余部分面向技术用户和 AI 助手。B1 的 MCP 服务器地址为 `https://api.churchapps.org/mcp`（Streamable HTTP），并通过 `Authorization: Bearer cak_…` 请求头接收 API 密钥。请参阅 [MCP 服务器开发者参考](/docs/developer/api/mcp)。

### 带有 Actions 的自定义 GPT

自定义 GPT 可以让您创建一个专用的助手，供您的整个团队共享——他们只需打开一个链接即可开始提问，无需任何额外设置。它需要 ChatGPT Plus、Team 或 Enterprise 账户，大约需要 10 分钟。

#### 1. 创建 API 密钥

如果您还没有创建，请按照上文“设置步骤”中的第 1 步操作。

#### 2. 构建自定义 GPT

1. 在 ChatGPT 中，点击您的个人资料 → **My GPTs（我的 GPT）** → **Create a GPT（创建 GPT）**。
2. 切换到 **Configure（配置）**选项卡，为该 GPT 命名（例如“B1 助手”），并添加指令：

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. 滚动到 **Actions（操作）** → **Create new action（创建新操作）** → **Authentication（身份验证）**。
   - **Authentication type（身份验证类型）：**API Key
   - **API Key：**粘贴您的 `cak_…` 密钥
   - **Auth Type（认证类型）：**Bearer
   - 保存。

4. 在 **Schema（架构）**框中，粘贴以下入门 OpenAPI 规范：

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

5. 保存操作。测试一下：*“教会里有多少人？”*——ChatGPT 会调用 `listPeople` 并给出答案。
6. **发布（Publish）**该 GPT（仅限我本人 / 任何拥有链接的人 / 组织内），并将链接分享给您的团队。

#### 3. 使用

任何拥有该链接的人都可以用自然语言提问。密钥的权限范围依然适用——只读密钥会拒绝任何写入操作，无论操作架构中如何定义。

---

### 安全性与限制

- **按教会隔离。**API 密钥只对应一个教会。ChatGPT 无法查看其他教会的数据。
- **受权限范围约束。**密钥只携带您授予的权限范围。删除并重新创建密钥以移除某项权限范围后，该访问权限将在下次调用时失效。
- **可立即撤销。**在 **设置 → 开发者 → API Keys（API 密钥）**中删除密钥，访问将立即终止。
- **分享自定义 GPT 即分享数据。**所有有权访问该 GPT 的人，都能看到该密钥权限范围允许的任何数据。对于广泛共享的 GPT，建议使用更窄的权限范围（例如省略 `donations:read`）。
- **审计追踪。**通过 ChatGPT 所做的任何更改，都会记录在与 B1 Admin 操作相同的审计日志中——可在 **设置 → 审计日志（Audit Log）**中找到。

### 故障排除

**MCP 连接器显示“Unauthorized”或 401 错误：**您的 API 密钥缺失或不正确。打开连接器设置，检查 **Authorization** 请求头：其值应为单词 `Bearer`、一个空格，然后是完整的 `cak_…` 密钥，中间不能有多余的空格。

**ChatGPT 提示找不到某些数据：**密钥可能没有所需的权限范围。请在 **设置 → 开发者 → API Keys（API 密钥）**中创建一个包含额外权限范围的新密钥，并更新连接器。

**自定义 GPT 操作返回 401：**在操作的身份验证面板中，确认已选择 **Auth Type: Bearer**，并且密钥中不包含单词 `Bearer`（ChatGPT 会自动添加）。

**自定义 GPT 操作返回 403：**该密钥没有该接口所需的权限范围。请创建一个具有正确权限范围的新密钥，并更新 GPT。

**操作架构被拒绝：**ChatGPT 要求 OpenAPI 3.1，且至少包含一个 `paths` 条目和一个 `servers` 网址。粘贴前请在 [editor.swagger.io](https://editor.swagger.io) 上验证 YAML。

## 相关内容

- [API Keys（API 密钥）](/docs/developer/api/api-keys)——完整的权限范围参考
- [MCP 服务器（开发者参考）](/docs/developer/api/mcp)——协议细节和工具架构
- [Claude](./claude)——同样的思路，适用于 Anthropic 的模型
- [REST API 参考](/docs/developer/api/endpoints)——自定义 GPT 操作可以调用的每个接口
