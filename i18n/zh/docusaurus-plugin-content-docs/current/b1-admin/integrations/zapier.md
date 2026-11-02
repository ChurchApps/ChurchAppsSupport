---
title: "Zapier"
---

# Zapier

<div class="article-intro">

Zapier 上官方的 B1.church 应用，可以让 Zap 响应你教会中发生的事件（新增人员、新的奉献、新的小组成员……），并将记录写回 B1。无需编程，也无需任何基础设施——你只需在 Zapier 的拖放式编辑器中进行配置，粘贴 API 密钥，然后开启 Zap 即可。

</div>

:::caution 等待 Zapier 审核
B1.church 应用已经开发完成并可以正常工作，但仍在等待 Zapier 的审核，尚未在 Zap 编辑器的应用目录中公开上架。在获得批准之前，只有受邀的账号可以使用它。以下内容描述的是该应用获批后的使用方式。
:::

<div class="prereqs">
<h4>开始之前</h4>

- 一个 [Zapier](https://zapier.com) 账号（免费版足以支持少量 Zap）
- 在 B1Admin 中拥有 **Edit Settings** 权限的教会管理员（你需要创建 API 密钥）
- 明确你想要实现的目标，例如"当在 B1 中添加人员时，将其加入我的 Mailchimp 列表"

</div>

## 触发器与操作

| 类型 | 名称 | B1 事件 / 端点 |
|---|---|---|
| **触发器** | 新增人员 | `person.created` |
| **触发器** | 人员已更新 | `person.updated` |
| **触发器** | 新增奉献 | `donation.created` |
| **触发器** | 新增小组成员 | `group.member.added` |
| **触发器** | 新的表单提交 | `form.submission.created` |
| **操作** | 创建人员 | 添加一位新人员 |
| **操作** | 添加奉献 | 记录一笔奉献 |
| **操作** | 添加小组成员 | 将一位人员加入小组 |
| **操作** | 查找人员 | 通过 ID、电子邮件或姓名查找人员；若无匹配则任务失败 |

你可以将这些功能自由组合，与 Zapier 支持的 7,000 多款应用搭配使用。

## 设置

### 1. 创建 B1 API 密钥

1. 在 B1Admin 中，进入 **Settings → Developer → API Keys**。
2. 点击 **New API Key**，为其取一个名称（例如"Zapier"），并选择该 Zap 所需的权限范围。
3. **重要：** 当 Zap 开启时，Zapier 触发器会代表你注册一个 webhook，这需要 **`settings:write`** 权限范围。如果你的任何 Zap 使用了 B1 触发器，请务必包含 `settings:write`。
4. 同时授予操作所需的权限范围——例如"添加奉献"操作需要 `donations:write`，"创建人员"操作需要 `people:write`。
5. 保存。完整的 `cak_…` 密钥只会显示**一次**——请将其复制下来。

### 2. 将 Zapier 连接到 B1

1. 在 Zapier 中新建一个 Zap。
2. 当你第一次选择 B1 的触发器或操作时，Zapier 会要求你**登录 B1.church**。
3. 粘贴第 1 步中的 API 密钥，然后点击 **Yes, Continue**。Zapier 会在你的教会中验证该密钥。

该连接会保存在 Zapier 中，并被你账号下的每个 Zap 复用。

### 3. 构建 Zap

选择一个触发器，然后添加一个或多个操作步骤。下面是一些示例。

## 常用示例

### 将新的 B1 人员添加到 Mailchimp

- **触发器** —— B1：新增人员
- **操作** —— Mailchimp：添加/更新订阅者。将 B1 的 `name__first`、`name__last`、`contactInfo__email` 映射到 Mailchimp 的 First Name / Last Name / Email 字段中。

### 以比内置连接器更丰富的卡片格式将奉献发布到 Slack 频道

- **触发器** —— B1：新增奉献
- **操作** —— Slack：发送频道消息。可以自定义任意布局——按钮、附件等——这是内置的 [Slack 连接器](./slack-discord)无法实现的。

### 将新的小组成员添加到 Google 群组

- **触发器** —— B1：新增小组成员（筛选为特定的 `groupId`）
- **操作** —— Filter by Zapier：仅当 B1 小组为你关心的那个小组时才继续执行
- **操作** —— B1：查找人员（使用触发器中的 `personId` 获取电子邮件）
- **操作** —— Google Groups：添加成员

### 将表单提交转发到项目跟踪工具

- **触发器** —— B1：新的表单提交
- **操作** —— Notion / Linear / Asana / Trello：创建页面 / 议题 / 任务

## 触发器的底层工作原理

触发器采用 **REST hooks** 机制，而非轮询——Zapier 不会每隔 15 分钟去询问 B1 一次。当你开启 Zap 时，Zapier 会请求 B1 注册一个指向 Zapier 私有 URL 的 webhook；事件发生时，B1 会将数据包 POST 给 Zapier，你的 Zap 会在**数秒内**启动。关闭 Zap 时，Zapier 会请求 B1 删除该 webhook——不会留下孤立的订阅。

这意味着触发器只会针对你开启 Zap **之后**发生的事件触发。它没有回溯功能——开启 Zap 不会重放昨天的奉献。

## 限制与说明

- **同一触发器的多个 Zap**各自会注册自己的 B1 webhook——这不会产生冲突，但如果你在检查 **Settings → Developer → Webhooks** 时看到三条相同的 `Zapier — donation.created` 记录，请不要感到困惑。
- **Zap 设置中的测试数据**——构建 Zap 时，Zapier 会要求提供示例数据以映射字段。如果 B1 中有最近的匹配事件，它会拉取最新的一条；否则会使用应用定义中的模拟示例。
- **操作失败会以 Zap 错误的形式显示**在 Zapier 的任务历史中。常见原因：API 密钥缺少相应的权限范围（例如"添加奉献"操作需要 `donations:write`）。请使用正确的权限范围重新生成密钥，并在 Zapier 中重新连接。
- **出站 API 调用配额**——来自操作的每次 B1 API 调用都会计入你的 Zapier 任务配额，而不计入 B1 一侧的任何配额。

## 故障排除

- **连接时提示 "Authentication failed"（身份验证失败）**——API 密钥错误、已被撤销，或缺少 Zap 所需的权限范围。请在 B1Admin 中至少使用 `settings:write` 以及 Zap 所涉及资源的权限范围重新生成密钥，然后更新连接。
- **触发器从不触发**——确认 webhook 确实已注册：在 B1Admin 中，**Settings → Developer → Webhooks** 中现在应该有一行名为"Zapier — &lt;事件&gt;"的记录。如果没有，很可能是你开启 Zap 时该 API 密钥缺少 `settings:write`。请修正密钥，然后关闭并重新开启 Zap。
- **触发器触发两次**——如果 Zapier 的确认信号丢失，有时会重新投递。如果你需要严格去重，请在唯一 ID（例如人员的 `id`）上使用"Filter by Zapier"步骤。

## 另请参阅

- [Make](./make) —— 相同的模式，不同的平台
- [Slack 与 Discord](./slack-discord) —— 无需 Zapier 即可使用的更简单的聊天通知
- [Webhooks（开发者参考）](/docs/developer/api/webhooks)
