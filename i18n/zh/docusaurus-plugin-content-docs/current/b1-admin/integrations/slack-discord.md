---
title: "Slack 与 Discord"
description: "通过传入式 webhook，将 B1 Admin 的事件（例如新人员、奉献与表单提交）发布到 Slack 或 Discord 频道，无需使用 Zapier。"
---

# Slack 与 Discord

<div class="article-intro">

直接从 B1 将易读的通知发布到 Slack 或 Discord 频道——包括新人员、奉献、小组报名、表单提交、日历活动等等。无需第三方账户，也无需维护 Zap：B1 会将事件重新格式化为聊天讯息，并直接 POST 到频道的 webhook 网址。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 你需要在 B1Admin 中具有 **Edit Settings** 权限
- Slack 工作区或 Discord 服务器中的管理员，用于建立该频道的传入式 Webhook
- 决定你要在哪个频道接收通知（你可以将多种事件放在同一个频道，也可以分散到不同频道）

</div>

## 运作方式 {#how-it-works}

B1 内置了适用于聊天平台的 **Connector Type**。当你以 **Slack** 或 **Discord** 类型建立 webhook 时，webhook 引擎仍会执行一般的传送、重试与签名标头流程，但传送的内容会从 B1 一般的 `{event,churchId,data}` 数据包，重新整理为这两项服务所需的简短 `{text}`（Slack）或 `{content}`（Discord）讯息。

除了既有的外发 webhook 流程之外，B1 的服务器不会针对每间教会另行连接 Slack。无需托管任何新东西，也不需要额外付费。

## Slack——逐步说明 {#slack--step-by-step}

### 1. 取得 Slack 传入式 Webhook 网址 {#1-get-a-slack-incoming-webhook-url}

1. 在你希望接收通知的 Slack 工作区中，打开 [api.slack.com/apps](https://api.slack.com/apps)。
2. 点击 **Create New App → From scratch**，将其命名为"B1 Notifications"之类的名称，并选择工作区。
3. 在左侧导航中选择 **Incoming Webhooks**，并将 **Activate Incoming Webhooks** 切换为 *On*。
4. 点击 **Add New Webhook to Workspace**，选择频道（例如 `#donations`），然后点击 **Allow**。
5. Slack 会带你回到页面，并显示一个新的 **Webhook URL**，格式类似 `https://hooks.slack.com/services/T0XXXXXXX/B0YYYYYYY/zzz…`。请复制它——这是 B1 所需的唯一资料。

:::caution
请将 Slack webhook 网址视为机密。任何拥有该网址的人都可以在频道中发布任意讯息。如果你不慎外泄，请从 Slack 应用程序页面重新产生网址（重新产生只会更换网址；之后请同步更新 B1）。
:::

### 2. 在 B1Admin 中连接 {#2-connect-it-in-b1admin}

1. 在 B1Admin 中前往 **Settings → Developer → Webhooks**。
2. 点击 **New Webhook**。
3. 填写：
   - **Name**——使用易读的名称，例如"奉献 → #donations"。只有你的团队会看到。
   - **Connector Type**——选择 **Slack**。
   - **Payload URL**——粘贴第 1 步中的 Slack 网址。
   - **Events**——勾选你希望以讯息形式接收的事件。若是奉献频道，只需勾选 `donation.created`。若是 #people 频道，可以试试 `person.created` 与 `group.member.added`。
4. 点击 **Save**。此时会出现"Signing Secret"对话框——对于 Slack，你可以忽略它（Slack 不会验证 B1 的签名），直接关闭即可。

### 3. 测试 {#3-test-it}

从列表中重新打开该 webhook，然后点击 **Send Test Event**。B1 会发送你所勾选的第一个事件的示例，因此在一两秒内，你的 Slack 频道中就会出现类似以下的讯息：

> 💝 New donation: $50.00

同时，同一画面的 **Recent Deliveries** 表格中会出现一列，状态为 `succeeded`。完成！

## Discord——逐步说明 {#discord--step-by-step}

### 1. 取得 Discord Webhook 网址 {#1-get-a-discord-webhook-url}

1. 在你的 Discord 服务器中，将鼠标移到你希望接收通知的频道上，然后点击 **⚙ 齿轮**图标（Edit Channel）。
2. 打开 **Integrations → Webhooks → New Webhook**。
3. 为它命名，并（选填）设置头像，然后点击 **Copy Webhook URL**——网址格式类似 `https://discord.com/api/webhooks/123…/abc…`。

### 2. 在 B1Admin 中连接 {#2-connect-it-in-b1admin-1}

与上方的 Slack 流程完全相同，只需将 **Connector Type** 设为 **Discord**。将 Discord 网址粘贴到 **Payload URL** 中并保存。

:::tip
你**不需要**在 Discord 网址末尾加上 `/slack`——B1 送出的是 Discord 原生的 `{content}` 数据，而非 Slack 相容格式。直接粘贴 Discord 提供的网址即可。
:::

### 3. 测试 {#3-test-it-1}

同样点击 **Send Test Event**——Discord 会在所选频道中显示该讯息，并且传送记录会变为 `succeeded`。

## 讯息的样子 {#what-the-messages-look-like}

| 事件 | 示例讯息 |
|---|---|
| `person.created` | 👤 已新增人员：Jordan Rivera |
| `person.updated` | 👤 人员已更新：Jordan Rivera |
| `group.created` | 👥 已建立新小组：Tuesday Bible Study |
| `group.member.added` | ➕ 有人加入了小组 |
| `donation.created` | 💝 新奉献：$50.00 |
| `donation.updated` | 💝 奉献已更新：$75.00 |
| `attendance.recorded` | ✅ 已记录出席 |
| `form.submission.created` | 📝 已收到新的表单提交 |
| `event.created` | 📅 新活动：Easter Service |

完整清单请参阅 [webhook 事件目录](/docs/developer/api/webhooks#event-catalog)——其中任何事件都可以路由到 Slack／Discord。

## 每个主题使用一个频道 {#one-channel-per-topic}

你不必把所有事件都放在同一个地方。大多数教会会设置数个 webhook：

- 一个 **#donations** 频道，只接收 `donation.created`
- 一个 **#new-people** 频道，接收 `person.created` 与 `group.member.added`
- 一个 **#admin-alerts** 频道，接收 `form.submission.created` 等低流量的事件

每间教会的 webhook 数量没有上限。每个 webhook 都是独立的——删除或停用其中一个，不会影响其他的。

## 检视传送记录 {#inspecting-deliveries}

webhook 编辑器中的 **Recent Deliveries** 表格会显示最近 50 次的传送尝试。点击某一列，即可查看实际送出的内容，以及所返回的回应。对于 Slack 连接器，传送的内容是 `{"text":"💝 New donation: $50.00"}`——而不是原始的 `{event,churchId,...}` 数据包——因为 B1 会在传送前进行重新格式化。

如果传送失败（B1 仍在重试时会显示黄色的 `failed` 标记，放弃后则显示红色的 `exhausted` 标记），**Response** 栏会显示 HTTP 状态码，该列的对话框则会显示回应内容，让你确切看到 Slack 或 Discord 不接受的原因——通常是网址复制粘贴时出错。点击 **Redeliver** 即可重新传送该次内容。

## 故障排除 {#troubleshooting}

- **没有出现任何讯息，且传送状态为 `400`**——通常是 Connector Type 设为 **Standard**，但网址却是 Slack／Discord 的网址。Slack／Discord 会拒绝原始数据包。请将下拉菜单切换为 **Slack** 或 **Discord**，然后重新发送测试。
- **Webhook 自动停用**——B1 会针对每次失败的传送重试约五天。如果连续三次传送都耗尽了重试次数，B1 会关闭该 webhook（其状态会显示为 **Disabled**）。请修正网址（或在 Slack／Discord 中轮替网址），重新开启 **Active**，然后保存。
- **讯息已送达但缺少详细内容**——所有聊天平台都会限制讯息大小。B1 的讯息在设计上为单行文字；如需更丰富的通知，请使用 [Zapier](./zapier.md) 或 [Make](./make.md)，透过其 Slack 操作组合更完整的 Slack 讯息。

## 日后切换 Connector Type {#switching-connector-types-later}

你可以更改现有 webhook 的 Connector Type——变更会在下一次传送时生效。如果你从 Slack 切换为 Standard，请将网址指向你自己的 HTTPS 端点，原本的签名密钥（在建立 webhook 时已发出）便可用来验证原始数据包。

## 另见 {#see-also}

- [Zapier](./zapier.md)：用于由 B1 事件触发的多步骤工作流程
- [Make](./make.md)：可视化的场景构建器
- [Webhook（开发者参考）](/docs/developer/api/webhooks)：若你要将 webhook 指向自己的服务器，可参阅完整的数据包与签名格式
