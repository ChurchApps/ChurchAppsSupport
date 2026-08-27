---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

将 OpenAI 的 ChatGPT 连接到您的教会的 B1 数据，让它完成繁重的工作。连接后，ChatGPT 可以看到您的实时教会记录并帮助您完成在 B1Admin 中可能需要多个步骤的事情 — 或者您根本不知道如何做的事情。

**您可以要求它做的一些事情：**
- *"设置周日学校教室，并根据他们的小组将每个教师放在正确的房间"*
- *"告诉我上周出席但还没有被分配到小组的每个人"*
- *"按基金总结这个月的捐赠"*
- *"谁是我们的最新成员，我们是否跟进过他们？"*
- *"我不知道如何在 B1 中做 X — 您能为我演示一下或为我做吗？"*

ChatGPT 从您的 B1 数据中直接提取答案并采取行动，仅限于您的教会。

:::tip 推荐：Claude Code
为了获得最顺利的 MCP 体验，[Claude Code](./claude) 是推荐客户端 — 设置只需一个命令，开箱即用。ChatGPT 也有效，如果您的团队已经在使用它，这是一个很好的选择。
:::

支持两个路径：**MCP 连接器**（内置于 ChatGPT）和针对想要可共享助手的团队的**自定义 GPT**。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 在 B1Admin 中具有**编辑设置**权限的教会管理员（需要创建 API 密钥）
- **ChatGPT Plus、Pro、Team 或 Enterprise** 帐户

</div>

## 快速设置指南

在 **ChatGPT 桌面应用**（Mac/Windows）中按照这些步骤操作。其他版本中的屏幕可能看起来略有不同。

---

**第 1 步 — 首先从 B1Admin 获取您的 API 密钥**

触及 ChatGPT 之前，在 B1Admin 中创建一个 API 密钥，准备好粘贴：

1. 在 B1Admin 中转到**设置 > 开发人员 > API 密钥**
2. 单击**新建 API 密钥**，将其命名为`ChatGPT`，选择您的范围（从`people:read`、`groups:read`、`attendance:read`、`donations:read`开始），然后单击**保存**
3. 复制`cak_…`密钥 — 它仅显示一次

---

**第 2 步 — 单击 ChatGPT 左下角的您的名称**

![点击您的资料名称](/img/guides/chatgpt-mcp/01.png)

---

**第 3 步 — 单击设置**

![从菜单中单击设置](/img/guides/chatgpt-mcp/02.png)

---

**第 4 步 — 在左侧边栏中单击插件**

![在集成下单击插件](/img/guides/chatgpt-mcp/03.png)

---

**第 5 步 — 单击 MCPs 标签**

![单击 MCPs 标签](/img/guides/chatgpt-mcp/04.png)

您会在这里看到任何您已添加的 MCP 服务器。

---

**第 6 步 — 单击添加 > 添加 MCP 服务器**

![单击添加然后添加 MCP 服务器](/img/guides/chatgpt-mcp/06.png)
