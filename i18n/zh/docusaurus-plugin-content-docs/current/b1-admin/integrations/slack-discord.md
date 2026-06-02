---
title: "Slack 和 Discord"
---

# Slack 和 Discord

<div class="article-intro">

将 B1 的可读通知直接发布到 Slack 或 Discord 频道 — 新人员、捐款、小组注册、表格提交、日历事件等。无需第三方账户，无需维护 Zap：B1 将事件重新格式化为聊天消息，并将它们 POST 到频道的 webhook URL。

</div>

<div class="prereqs">
<h4>开始前</h4>

- 您需要在 B1Admin 中具有 **编辑设置** 权限
- 您的 Slack 工作区或 Discord 服务器中的管理员，用于创建频道的传入 Webhook
- 决定您想要通知的频道（您可以为多个事件类型使用同一频道，或在频道之间拆分它们）

</div>

## 工作原理

B1 有一个内置的聊天平台 **连接器类型**。当您使用类型 **Slack** 或 **Discord** 创建 webhook 时，webhook 引擎仍然执行其常规的交付 + 重试 + 签名标头舞蹈，但它发送的主体是从 B1 的普通 `{event,churchId,data}` 信封重新形成为这些服务期望的小 `{text}`（Slack）或 `{content}`（Discord）消息。

除了现有的出站 webhook 流，B1 服务器不会按每教会基础与 Slack 交互 — 没有新的托管，没有额外费用。

## Slack — 逐步

### 1. 获取 Slack 传入 Webhook URL

1. 在您想要通知的 Slack 工作区中打开 [api.slack.com/apps](https://api.slack.com/apps)。
2. 点击 **创建新应用 → 从头开始**，将其命名为"B1 通知"之类的东西，并选择工作区。
3. 在左侧导航中选择 **传入 Webhooks** 并将 **激活传入 Webhooks** 切换为 *开*。
4. 点击 **向工作区添加新 Webhook**，选择频道（例如 `#donations`），然后 **允许**。
5. Slack 会将您返回到页面，带有一个看起来像 `https://hooks.slack.com/services/T0XXXXXXX/B0YYYYYYY/zzz…` 的全新 **Webhook URL**。复制它 — 这是 B1 需要的唯一信息。

:::caution
将 Slack webhook URL 视为机密。任何拥有它的人都可以将任意消息发布到频道。如果您意外暴露了它，从 Slack 应用页面重新生成它（重新生成只是轮换 URL；更新 B1 以匹配）。
:::

### 2. 在 B1Admin 中连接它

1. 在 B1Admin 中转到 **设置 → 开发者 → Webhooks**。
2. 点击 **新建 Webhook**。
3. 填写：
   - **名称** — 类似"捐款 → #donations"之类的可读内容。仅您的团队看到。
   - **连接器类型** — 选择 **Slack**。
   - **有效负载 URL** — 粘贴第 1 步中的 Slack URL。
   - **事件** — 勾选您想要作为消息的事件。对于捐款频道，只需 `donation.created`。对于 #people 频道，尝试 `person.created` 和 `group.member.added`。
4. 点击 **保存**。出现"签名机密"对话框 — 对于 Slack，您可以忽略（Slack 不验证 B1 签名）并关闭它。

### 3. 测试它

从列表中重新打开 webhook 并点击 **发送测试事件**。在一两秒内，一条像这样的消息

> 💝 新捐款：$50.00

出现在您的 Slack 频道中，同一屏幕上的 **最近交付** 表中显示一个新行，状态为 `succeeded`。您完成了。

## Discord — 逐步

### 1. 获取 Discord Webhook URL

1. 在您的 Discord 服务器中，将鼠标悬停在您想要通知的频道上，然后点击 **⚙ 齿轮**（编辑频道）。
2. 打开 **集成 → Webhooks → 新 Webhook**。
3. 给它一个名称和（可选）一个头像，然后点击 **复制 Webhook URL** — 看起来像 `https://discord.com/api/webhooks/123…/abc…`。

### 2. 在 B1Admin 中连接它

与上面的 Slack 流相同，除了将 **连接器类型** 设置为 **Discord**。将 Discord URL 粘贴到 **有效负载 URL** 并保存。

:::tip
您 **不需要** 在 Discord URL 末尾添加 `/slack` — B1 发送 Discord 原生 `{content}` 有效负载，而不是 Slack 兼容的。只需粘贴 Discord 给您的 URL。
:::

### 3. 测试它

相同的 **发送测试事件** 按钮 — Discord 在选择的频道中显示消息，交付日志翻转到 `succeeded`。

## 消息看起来像什么

| 事件 | 示例消息 |
|---|---|
| `person.created` | 👤 添加了新人员：Jordan Rivera |
| `person.updated` | 👤 人员已更新：Jordan Rivera |
| `group.created` | 👥 创建了新小组：Tuesday Bible Study |
| `group.member.added` | ➕ 有人被添加到小组 |
| `donation.created` | 💝 新捐款：$50.00 |
| `donation.updated` | 💝 捐款已更新：$75.00 |
| `attendance.recorded` | ✅ 出席已记录 |
| `form.submission.created` | 📝 收到新表格提交 |
| `event.created` | 📅 新事件：Easter Service |

完整列表位于 [webhook 事件目录](/docs/developer/api/webhooks#event-catalog) — 那里的任何事件都可以路由到 Slack/Discord。

## 每个主题一个频道

您不必将每个事件放在一个地方。大多数教会设置少数 webhooks：

- 一个 **#donations** 频道，仅监听 `donation.created`
- 一个 **#new-people** 频道，用于 `person.created` 和 `group.member.added`
- 一个 **#admin-alerts** 频道，用于低容量的东西，如 `form.submission.created`

每个教会的 webhooks 数量没有限制。每个都是独立的 — 删除或禁用一个不会影响其他。

## 检查交付

webhook 编辑器的 **最近交付** 表显示最后 50 次尝试。点击一行以查看发送的确切有效负载和返回的响应。对于 Slack 连接器，有效负载是 `{"text":"💝 新捐款：$50.00"}` — 而不是原始 `{event,churchId,...}` 信封 — 因为 B1 在交付前重新塑造了它。

如果出了问题（红色 `failed` 或 `exhausted` 徽章），对话框显示 HTTP 状态和响应主体，以便您可以看到 Slack 或 Discord 不喜欢什么 — 通常是 URL 中的复制/粘贴错误。

## 故障排查

- **没有消息出现 + 交付状态 `400`** — 通常连接器类型设置为 **标准**，但 URL 是 Slack/Discord 之一。Slack/Discord 拒绝原始信封。将下拉列表切换为 **Slack** 或 **Discord** 并重新发送测试。
- **Webhook 自动禁用** — 经过 3 次连续失败交付后，B1 关闭 webhook。修复 URL（或在 Slack/Discord 上轮换它）并将 **激活** 切换回开。
- **消息到达但缺少细节** — 每个聊天平台都限制消息大小。B1 的消息设计为单行；为了获得更丰富的通知，使用 [Zapier](./zapier) 或 [Make](./make) 通过他们的 Slack 操作组成更完整的 Slack 消息。

## 稍后切换连接器类型

您可以在现有 webhook 上更改连接器类型 — 它对下一次交付生效。如果您从 Slack 切换到标准，将 URL 指向您自己的 HTTPS 端点，同一签名机密（创建 webhook 时颁发）开始可验证为原始信封。

## 另请参阅

- [Zapier](./zapier) — 用于由 B1 事件触发的多步工作流
- [Make](./make) — 可视化场景生成器
- [Webhooks（开发者参考）](/docs/developer/api/webhooks) — 如果您曾经将 webhook 指向您自己的服务器，完整的有效负载 + 签名格式
