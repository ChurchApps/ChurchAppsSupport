---
title: "活动提醒"
description: "在 B1 Admin 中设置活动的推送、电子邮件和短信提醒，选择发送时间、接收对象和自定义消息，确保人员准时收到通知。"
---

# 活动提醒

<div class="article-intro">

活动提醒会在活动开始前自动通知相关人员——例如"别忘了！健康讲座明天上午 9:00 开始。"你只需在活动上配置一次提醒，B1 便会按计划通过推送通知、电子邮件发送，如果你的教会已设置短信服务，还会发送短信。成员可以在各自的[通知偏好设置](../../b1-church/getting-started/notification-preferences.md)中，控制自己接收哪些提醒。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 创建你想要提醒的活动（参见[创建日历](./creating-calendars.md)）
- 若要通知已报名的参与者，请在活动上[开启报名](./creating-calendars.md)
- 若要通知整个小组，请确保该活动属于一个有成员的[小组](../groups/creating-groups.md)

</div>

## 设置提醒 {#setting-up-a-reminder}

你可以在活动的 **Reminders** 部分配置提醒。展开该部分即可看到设置选项。

- 在**创建新活动**时，展开 **New Event** 编辑器底部的 **Reminders** 部分；保存活动时，提醒也会一并保存。
- 对于**已有的活动**，可在以下任一位置使用 **Reminders** 部分，并点击该部分内的 **Save** 按钮：点击日历上的活动后打开的对话框、**Edit Event** 编辑器，或活动的报名页面（**Calendars > Registrations**，然后选择该活动）。

1. 开启 **Enable reminders**。
2. 选择要发送的 **When (up to 3)**（最多 3 个时间点）：**7 days before**（提前 7 天）、**3 days before**（提前 3 天）、**1 day before**（提前 1 天）和 **Day of**（当天）。选满三个后，其余选项会被禁用，直到你取消选择其中一个。
3. 设置提醒发出的 **Time of day**（时刻）（默认为 **9:00 AM**，以教会的[时区](../settings/church-settings.md#time-zone)为准）。
4. 选择应被提醒的 **Who**（对象）（参见下文[提醒对象](#who-gets-reminded)）。
5. 可选填写 **Message (optional)**（消息，可选）。留空则使用默认措辞，或自行撰写——你可以加入 `{{eventTitle}}`，它会被替换为活动名称。
6. 选择 **Channels**（渠道）：**Push**（推送通知）和 **Email**（电子邮件）（默认均已开启）；如果你的教会已连接[短信服务提供商](../settings/church-settings.md#texting)，还可以选择 **Text**（短信）。
7. 点击 **Save**（若是新活动，则保存该活动）。

若要停止某个活动的提醒，请关闭 **Enable reminders** 并保存。

对于已保存的活动，**实时预览**会在你做出更改时，大致显示将被提醒的人数、无法联系到的参与者人数，以及下一次计划发送的时间——让你在保存前确认提醒的效果。全新的活动在保存之前没有预览。

## 提醒对象 {#who-gets-reminded}

**Who** 设置用于控制提醒发送给哪些人：

- **Registrants only**（仅报名人）——所有已报名该活动且关联了人员记录的人。当活动开启了报名时，这是默认选项，因此针对一个小型报名活动的提醒不会意外发送给整个小组。
- **Heads / registrants only**（仅户主/报名人）——每次报名只发送一条提醒（发送给报名的人），而不是报名中的每位家庭成员。
- **Group members**（小组成员）——活动所属小组中的所有人。当活动未使用报名时，这是默认选项。
- **Auto**（自动）——若开启了报名，则提醒报名人；否则提醒小组成员。

:::info
仅凭姓名添加、未关联人员记录的访客无法接收提醒，因为没有可发送的账户、设备或电子邮件地址。预览会告诉你有多少参与者属于这一类，以免出现意外。已选择退出通讯的成员也会被跳过。
:::

## 提醒的发送时间 {#when-reminders-are-sent}

- 提醒会在你选择的**时刻**发出，使用教会当地时区，并按你所选的每个时间偏移量发送。
- 如果你**更改活动的日期或时间**，尚未发送的提醒会自动重新排期——你无需编辑提醒。
- 如果你**删除活动**（或取消定期活动的某一次安排），其尚未发送的提醒会自动取消。
- 定期活动会自动处理：每个即将到来的安排都会有自己的提醒。

:::tip
提醒**优先通过推送发送，以电子邮件作为备选**。如果成员已开启推送通知，他们会收到推送；否则将改为收到电子邮件。成员可以在各自的[通知偏好设置](../../b1-church/getting-started/notification-preferences.md)中，按通知类型选择希望使用的渠道。
:::

## 短信提醒 {#text-reminders}

只有当你的教会已连接短信服务提供商时，才会显示 **Text** 渠道。短信通过教会的短信服务提供商发送，每条短信可能会产生费用。短信会在推送或电子邮件提醒之外另行发送，且仅发送给同时满足以下条件的人员：

- 在其[通知偏好设置](../../b1-church/getting-started/notification-preferences.md)中开启了 **Text messages**，并且
- 其个人资料中有手机号码。

具有发送短信权限的工作人员，可以在该人员的[记录](../people/adding-people.md#text-reminders)中，于其手机号码下方的一行为其开启 **Text reminders**（短信提醒）。在包含 **Text** 的提醒上点击 **Send now** 后，B1 会显示已发送给多少人、跳过多少人，例如 *Sent to 2 people · 1 texted, 1 skipped*。

每条短信都以教会名称开头，控制在一条短信之内，并以"回复 STOP 退订"结尾。回复 STOP 的人将不再收到教会发出的短信。为使 STOP 回复能够传送到 B1，请将[短信设置](../settings/church-settings.md#texting)中的 **Inbound (STOP) webhook URL** 粘贴到你的服务提供商的入站消息 webhook 中。

## 成员可以控制的内容 {#what-members-can-control}

提醒始终会遵守每位成员的[通知偏好设置](../../b1-church/getting-started/notification-preferences.md)。成员可以：

- 关闭推送、电子邮件或短信的 **Event Reminders**，同时保留其他通知。
- 通过 **Text messages** 开启或关闭短信提醒。
- 设置**免打扰时段**，使非紧急通知在合理的时间才发送。

你无法覆盖成员选择退出活动提醒的决定——这样可确保 B1 符合反垃圾信息规定，并让成员掌控自己的收件箱。

## 服事提醒 {#serving-reminders}

在计划中被安排服事的志愿者会收到一封单独的**服事提醒**，其中包含计划详情；如果他们尚未回复，电子邮件中还会直接显示 **Accept / Decline**（接受/拒绝）按钮。这些提醒是在计划类型上配置的，而非在日历活动上配置，并且也可以通过短信发送——关于志愿者排班和提醒的运作方式，请参见[志愿者提醒](../serving/plans.md#volunteer-reminders)和[主日志愿者](../guides/sunday-volunteers.md)。

## 后续步骤 {#next-steps}

- [通知偏好设置](../../b1-church/getting-started/notification-preferences.md)——成员可以控制的内容
- [活动报名指南](../guides/event-registration.md)——设置报名，以便提醒能够送达参与者
- [创建日历](./creating-calendars.md)——返回日历设置
