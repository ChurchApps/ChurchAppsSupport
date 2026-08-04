---
title: "Zapier"
---

# Zapier

<div class="article-intro">

Zapier 上的官方 B1.church 应用可以让 Zap 对教会中发生的事件（新人员、新捐款、新小组成员……）做出反应，并将记录写回 B1。无需编写代码，无需搭建基础设施——您只需在 Zapier 的拖放式编辑器中完成配置，粘贴 API 密钥，然后启用 Zap。

</div>

<div class="prereqs">
<h4>准备工作</h4>

- 一个 [Zapier](https://zapier.com) 账户（免费套餐足以支持少量 Zap）
- 一个在 B1Admin 中拥有**编辑设置**权限的教会管理员（您将用它创建 API 密钥）
- 明确想要实现的功能——例如"当 B1 中添加了一个人员时，将其加入我的 Mailchimp 列表"

</div>

## 触发器与操作

| 类型 | 内容 | B1 事件/端点 |
|---|---|---|
| **触发器** | 新人员 | `person.created` |
| **触发器** | 更新的人员 | `person.updated` |
| **触发器** | 新捐款 | `donation.created` |
| **触发器** | 新小组成员 | `group.member.added` |
| **触发器** | 新表单提交 | `form.submission.created` |
| **操作** | 创建人员 | 添加新人员 |
| **操作** | 添加捐款 | 记录一笔捐款 |
| **操作** | 添加小组成员 | 将某人加入小组 |
| **操作** | 查找人员 | 按 id、邮箱或姓名查找人员；找不到匹配项时任务失败 |

您可以将这些自由组合，与 Zapier 支持的 7,000 多个应用配合使用。

## 设置

### 1. 创建一个 B1 API 密钥

1. 在 B1Admin 中前往**设置 → 开发者 → API 密钥**。
2. 点击**新建 API 密钥**，为其命名（例如"Zapier"），并选择 Zap 所需的权限范围。
3. **重要提示：**当 Zap 启用时，Zapier 触发器会代表您注册一个 Webhook，这需要 **`settings:write`** 权限。只要您的任意 Zap 使用了 B1 触发器，请务必包含 `settings:write`。
4. 同时授予操作所需的权限——例如"添加捐款"操作需要 `donations:write`，"创建人员"需要 `people:write`。
5. 保存。完整的 `cak_…` 密钥只会显示**一次**——请及时复制。

### 2. 将 Zapier 连接到 B1

1. 在 Zapier 中新建一个 Zap。
2. 首次选择 B1 触发器或操作时，Zapier 会要求您**登录 B1.church**。
3. 粘贴步骤 1 中的 API 密钥并点击**是，继续**。Zapier 会针对您的教会验证该密钥。

该连接会保存在 Zapier 中，并被您账户下的每个 Zap 重复使用。

### 3. 构建 Zap

选择一个触发器，然后添加一个或多个操作步骤。示例见下文。

## 常见方案

### 将新的 B1 人员添加到 Mailchimp

- **触发器** — B1：新人员
- **操作** — Mailchimp：添加/更新订阅者。将 B1 的 `name__first`、`name__last`、`contactInfo__email` 映射到 Mailchimp 的名字/姓氏/邮箱字段。

### 以比内置连接器更丰富的卡片将捐款发布到 Slack 频道

- **触发器** — B1：新捐款
- **操作** — Slack：发送频道消息。可组合任意布局——按钮、附件等——这些是内置的 [Slack 连接器](./slack-discord) 所做不到的。

### 将新小组成员添加到 Google 网上论坛群组

- **触发器** — B1：新小组成员（按特定 `groupId` 筛选）
- **操作** — 通过 Zapier 筛选：仅当该 B1 小组是您关心的小组时才继续
- **操作** — B1：查找人员（使用触发器的 `personId` 获取邮箱）
- **操作** — Google Groups：添加成员

### 将表单提交转发到项目跟踪工具

- **触发器** — B1：新表单提交
- **操作** — Notion / Linear / Asana / Trello：创建页面/问题/任务

## 触发器的底层工作原理

触发器采用的是 **REST hook**（REST 钩子）机制，而非轮询——Zapier 不会每 15 分钟对 B1 进行一次探测。当您启用 Zap 时，Zapier 会要求 B1 注册一个指向 Zapier 私有 URL 的 Webhook；事件发生时，B1 会将事件包 POST 给 Zapier，您的 Zap 会**在几秒钟内**启动。关闭 Zap 后，Zapier 会要求 B1 删除该 Webhook——不会留下孤立订阅。

这意味着触发器只会对 Zap **启用之后**发生的事件生效。没有回填机制——启用 Zap 不会重放昨天的捐款记录。

## 限制与说明

- **多个 Zap 使用相同触发器**时，每个 Zap 会各自注册自己的 B1 Webhook——这不会造成冲突，但如果您在检查**设置 → 开发者 → Webhooks**时看到三行相同的 `Zapier — donation.created` 记录，了解这一点会有帮助。
- **构建 Zap 时的测试数据** — 构建 Zap 时，Zapier 会要求提供示例数据以映射字段。如果 B1 中存在最近匹配的事件，它会拉取该事件；否则会使用应用定义中的合成示例。
- **操作失败会显示为 Zap 错误**，记录在 Zapier 的任务历史中。常见原因：API 密钥缺少相应权限（例如"添加捐款"操作需要 `donations:write`）。请使用正确的权限范围重新生成密钥，并在 Zapier 中重新连接。
- **出站 API 调用配额** — 操作中每一次 B1 API 调用都会计入您的 Zapier 任务配额，而不会计入 B1 一侧的任何配额。

## 故障排查

- **连接时提示"身份验证失败"** — API 密钥错误、已被吊销，或缺少 Zap 所需的权限范围。请在 B1Admin 中重新生成密钥，至少包含 `settings:write` 以及 Zap 涉及的相应资源权限，然后更新连接。
- **触发器从不触发** — 确认 Webhook 是否真的已注册：在 B1Admin 的**设置 → 开发者 → Webhooks**中，此时应显示一行名为"Zapier — &lt;事件&gt;"的记录。如果没有，很可能是启用 Zap 时 API 密钥缺少 `settings:write`。修复密钥后，将 Zap 关闭再重新开启。
- **触发器触发两次** — 如果 Zapier 的确认信息丢失，偶尔会重新投递事件。如果需要严格去重，可对唯一 id（例如人员的 `id`）使用"通过 Zapier 筛选"步骤。

## 另请参阅

- [Make](./make) — 相同模式，不同平台
- [Slack 与 Discord](./slack-discord) — 无需 Zapier 的更简单聊天通知方式
- [Webhooks（开发者参考）](/docs/developer/api/webhooks)
