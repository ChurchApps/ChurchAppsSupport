---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

将 OpenAI 的 ChatGPT 连接到您的教会 B1 数据，以便您可以问"谁在这个季度没有参加任何小组？"或"总结本月建筑基金的捐献"之类的问题，并让 ChatGPT 直接从 B1 提取答案。支持两条路径：适用于任何 ChatGPT Plus 计划的 **自定义 GPT**，以及支持它的开发人员工具的 **MCP 服务器**。

</div>

<div class="prereqs">
<h4>开始前</h4>

- 具有 **编辑设置** 权限的教会管理员（用于生成 API 密钥）
- 一个 **ChatGPT Plus、Pro、Team 或 Enterprise** 账户（免费计划无法使用自定义 GPT 或连接器）
- 您的 B1 API 的完整 URL -- 通常对于托管教会是 `https://api.churchapps.org`，或您的自托管 Api 主机

</div>

## 选择正确的路径

| 路径 | 所需计划 | 工作量 | 您获得的 |
|---|---|---|---|
| **带操作的自定义 GPT** | ChatGPT Plus / Team / Enterprise | 10 分钟 | 可共享的 GPT，为任何队友调用 B1 的 REST API |
| **通过 OpenAI 工具的 MCP** | 开发人员 / Agent SDK / Pro 连接器 | 更多 | 通过 MCP 服务器的完整发现，适合编码工具和代理平台 |

对于大多数教会来说，**自定义 GPT** 路径是正确的答案 -- 它不需要开发人员设置，在常规 ChatGPT 应用和移动客户端内工作，并可与您的团队共享。MCP 路径在下面为使用 OpenAI 开发人员工具或代理平台的技术人员记录。

## 路径 A -- 带操作的自定义 GPT

这将 ChatGPT 直接连接到 B1 REST API。您的自定义 GPT 将能够代表使用它的任何人读取和（可选）写入 B1 记录。

### 1. 创建 API 密钥

1. 在 B1Admin 中转到 **设置 → 开发人员 → API 密钥**。
2. 点击 **新 API 密钥**，命名为 `ChatGPT`，并选择范围。常见的初始集合：
   - **只读助手：** `people:read`、`groups:read`、`attendance:read`、`donations:read`
   - **读 + 写：** 添加匹配的 `:write` 范围
3. 保存并复制完整的 `cak_…` 密钥。

有关完整范围列表，请参阅 [API 密钥](/docs/developer/api/api-keys)。

### 2. 构建自定义 GPT

1. 在 ChatGPT 中，点击您的个人资料 → **我的 GPT** → **创建 GPT**。
2. 切换到 **配置** 标签并给 GPT 一个名称（例如"B1 助手"）和说明，如：

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. 滚动到 **操作** → **创建新操作** → **身份验证**。
   - **身份验证类型：** API Key
   - **API Key：** `cak_<prefix>.<secret>`
   - **Auth Type：** Bearer
   - 保存。
4. 在 **Schema** 框中，粘贴一个描述您想 GPT 使用的端点的最小 OpenAPI 规范。涵盖最常见读取的初始化：

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

   根据需要扩展模式与更多端点 -- B1 中的每个经过身份验证的路由接受相同的 `cak_…` 密钥。[REST API 参考](/docs/developer/api/endpoints) 列出了可用的内容。

5. 保存操作。使用"教会中有多少人？"之类的提示进行测试 -- ChatGPT 将调用 `listPeople` 并回答。
6. **发布** GPT（仅我 / 任何具有链接的人 / 组织）并与您的团队共享。

### 3. 使用它

您与之共享 GPT 的任何人都可以问自然语言问题 -- ChatGPT 选择正确的操作，调用 B1，并回答。密钥的范围仍然适用：只读密钥无论在模式中定义的操作如何都会拒绝写入。

## 路径 B -- 通过 OpenAI 工具的 MCP

B1 API 在 `/mcp` 包含一个 MCP 服务器，任何支持 MCP 的 OpenAI 工具都可以使用 -- 例如 [OpenAI Agents SDK](https://platform.openai.com/docs/guides/agents)、Responses API 的 MCP 工具或使用 MCP 服务器的第三方代理平台。

使用 `Authorization: Bearer` 标头中的相同 `cak_…` 密钥进行身份验证。公开三个工具：`list_endpoints`、`describe_endpoint` 和 `api_call`。有关协议、传输和工具模式的详细信息，请参阅 [MCP 服务器开发人员参考](/docs/developer/api/mcp)。

ChatGPT 的内置"连接器"（Pro/Business/Enterprise）目前期望具有特定 `search` 和 `fetch` 工具形状和基于 OAuth 的身份验证的 MCP 服务器，这是 B1 MCP 服务器不公开的。对于消费应用中的 ChatGPT，上面的自定义 GPT 路径是实用的选择。

## 安全性和限制

- **按教会隔离。** API 密钥解析为一个教会。ChatGPT 看不到其他教会的数据。
- **权限范围。** 如果您删除生成密钥的人的权限，ChatGPT 在下一次调用时丧失 -- 立即。
- **可撤销。** 在 **设置 → 开发人员 → API 密钥** 中删除密钥，ChatGPT 的访问权限立即结束。
- **共享自定义 GPT 共享数据。** 任何能访问 GPT 的人都可以提出问题并查看密钥有范围访问的任何内容。将共享限制给应该看到那些数据的人员，并优先使用更窄的范围（例如，为广泛共享的 GPT 省略 `donations:read`）。
- **审计线索。** 变异通过与 B1Admin 操作相同的审计日志；在 **报告 → 审计日志** 下审查它们。

## 成本

ChurchApps 是免费和开源的 -- 您的自定义 GPT 调用的 API 是您的教会已经运行的 API 的一部分。OpenAI 按其计划对 ChatGPT 使用收费。来自 ChurchApps 的没有按次计费成本。

## 故障排除

**操作返回 401：** Bearer 标头未正确设置。在操作的身份验证面板中，确保 **Auth Type: Bearer** 被选中，密钥值不包含单词 `Bearer`（ChatGPT 为您提前添加）。

**操作返回 403：** 密钥没有该端点的范围。使用正确的范围生成新密钥并更新 GPT。

**ChatGPT 调用错误的操作：** 紧化 OpenAPI 模式中的 `summary` 和 `description` 字段，以便模型选择正确的。将示例查询添加到 GPT 说明也有帮助。

**操作面板拒绝模式：** ChatGPT 要求 OpenAPI 3.1，至少一个 `paths` 条目和一个 `servers` URL。在粘贴前在任何在线 OpenAPI 验证器中验证 YAML。

**本地开发：** 将操作的 `servers` URL 指向您的本地 Api（例如 `http://localhost:8084`）-- 但请注意 ChatGPT 的操作仅调用公共 URL，所以对于本地测试使用 `ngrok` 之类的隧道或通过 `curl` 直接命中 API 以首先确认密钥。

## 相关

- [API 密钥](/docs/developer/api/api-keys) -- 完整范围参考
- [MCP 服务器（开发人员参考）](/docs/developer/api/mcp) -- 协议详情和工具模式
- [Claude](./claude) -- 相同的想法，用于 Anthropic 的模型
- [REST API 参考](/docs/developer/api/endpoints) -- 自定义 GPT 操作可以命中的每个端点
