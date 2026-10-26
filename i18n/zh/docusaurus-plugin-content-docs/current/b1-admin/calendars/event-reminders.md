---
title: "活动提醒"
---

# 活动提醒

<div class="article-intro">

活动提醒会在活动开始前自动通知合适的人员——例如，“别错过了！医疗保健研讨会明天上午 9:00 开始。”你只需在活动上配置一次提醒，B1 就会按计划通过推送通知、电子邮件发送；如果你的教会已设置短信服务，还会发送短信。成员可以在各自的[通知偏好设置](../../b1-church/getting-started/notification-preferences)中控制要接收哪些提醒。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 创建你想要提醒人员的活动（参见[创建日历](creating-calendars)）
- 若要提醒已报名的参加者，请先在活动上[开启报名](creating-calendars)
- 若要提醒整个小组，请确保活动隶属于一个有成员的[小组](../groups/creating-groups)

</div>

## 设置提醒

你在活动的 **Reminders** 部分配置提醒。

- **创建新活动**时，请在保存前于活动编辑器中展开 **Reminders** 部分。
- 对于**已有活动**，请打开活动的 **Registration Details** 页面（从 **Registrations** 部分进入）来添加或更改其提醒。

1. 开启 **Enable reminders**。
2. 选择发送**时间（When）**。最多可选择三个时间点：**7 days before**（提前 7 天）、**3 days before**（提前 3 天）、**1 day before**（提前 1 天）和 **Day of**（当天）。
3. 设置提醒发出的**时刻（Time of day）**（默认为 **9:00 AM**，以教会的[时区](../settings/church-settings.md#time-zone)为准）。
4. 选择提醒对象**（Who）**（参见下方的[提醒对象](#who-gets-reminded)）。
5. 可选填写**消息（Message）**。留空则使用默认措辞，也可以自行撰写——你可以包含 `{{eventTitle}}`，它会被替换为活动名称。
6. 选择**渠道（Channels）**：**Push** 推送通知、**Email** 电子邮件，以及在你的教会已连接[短信服务商](../settings/church-settings.md#texting)的情况下选择 **Text** 短信。
7. 保存活动。

在你进行更改时，**实时预览**会大致显示将有多少人收到提醒、有多少参加者无法接收，以及接下来的预定发送时间——这样你可以在保存前确认提醒的内容是否正确。

## 提醒对象 {#who-gets-reminded}

**Who** 设置用于控制提醒发送给谁：

- **仅报名者（Registrants only）** —— 所有已报名该活动且关联了人员记录的人。当活动开启了报名时，这是默认值，因此小型报名活动的提醒绝不会意外发送给整个小组。
- **仅负责人/报名者（Heads / registrants only）** —— 每份报名发送一条提醒（即报名的那个人），而不是报名中的每位家庭成员。
- **小组成员（Group members）** —— 活动所属小组中的所有人。当活动未使用报名功能时，这是默认值。
- **自动（Auto）** —— 若开启了报名则以报名者为对象，否则以小组为对象。

:::info
仅通过姓名添加、未关联人员记录的访客无法接收提醒，因为没有可用于发送的账号、设备或电子邮件。预览会告诉你属于此类的参加者人数，以免出现意外情况。已选择退出通信的成员同样会被跳过。
:::

## 提醒的发送时机

- 提醒会在你选择的**时刻**，以教会当地时区发送，并按你所选的每个时间点触发。
- 如果你更改活动的**日期或时间**，待发送的提醒会自动重新排期——你无需编辑提醒本身。
- 如果你**删除活动**（或取消重复活动的单次安排），其待发送的提醒会自动取消。
- 重复活动会自动处理：每个即将到来的场次都会有各自的提醒。

:::tip
提醒**优先推送，电子邮件作为备用**。如果成员已开启推送通知，他们会收到推送；否则将改为收到电子邮件。成员可以在各自的[通知偏好设置](../../b1-church/getting-started/notification-preferences)中，按通知类型选择希望接收的渠道。
:::

## 短信提醒

只有当你的教会已连接短信服务商时，**Text** 渠道才会出现。短信通过你教会的短信服务商发送，每条短信都可能产生费用。短信会与推送或电子邮件提醒一并发送，且仅发送给同时满足以下条件的人：

- 在其[通知偏好设置](../../b1-church/getting-started/notification-preferences)中开启了**短信（Text messages）**，并且
- 其个人资料中有手机号码。

每条短信都以教会名称开头，内容保持在单条短信之内，并以“Reply STOP to opt out.”（回复 STOP 即可退订）结尾。回复 STOP 的人将不再收到教会发送的短信。要使 STOP 回复能够传送到 B1，请将[短信设置](../settings/church-settings.md#texting)中的 **Inbound (STOP) webhook URL**（入站 STOP 回调网址）粘贴到你服务商的入站消息回调设置中。

## 成员可控制的内容

提醒始终遵循每位成员的[通知偏好设置](../../b1-church/getting-started/notification-preferences)。成员可以：

- 关闭推送、电子邮件或短信的**活动提醒（Event Reminders）**，同时保持其他通知开启。
- 通过 **Text messages** 开启或关闭短信提醒。
- 设置**免打扰时段（quiet hours）**，使非紧急通知在合理的时间才送达。

你无法覆盖成员选择退出活动提醒的决定——这样做是为了使 B1 符合反垃圾邮件规定，并让成员掌控自己的收件箱。

## 服务提醒

被排入计划的志愿者会收到一封单独的**服务提醒（serving reminder）**，其中包含计划详情；如果他们尚未回复，邮件中会直接显示**Accept / Decline**（接受/拒绝）按钮。这些提醒是在计划类型上配置的，而不是在日历活动上配置，同样也可以通过短信发送——参见[志愿者提醒](../serving/plans#volunteer-reminders)，以及[周日志愿者](../guides/sunday-volunteers)，了解志愿者排班与提醒的工作方式。

## 下一步

- [通知偏好设置](../../b1-church/getting-started/notification-preferences) —— 成员可以控制的内容
- [活动报名指南](../guides/event-registration) —— 设置报名，使提醒能够送达参加者
- [创建日历](creating-calendars) —— 返回日历设置页面
