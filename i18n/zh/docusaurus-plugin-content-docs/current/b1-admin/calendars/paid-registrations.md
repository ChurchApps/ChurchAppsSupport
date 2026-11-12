---
title: "付费报名"
description: "在 B1 Admin 中设置付费活动报名：定价的参与者类型、附加选项、折扣码、候补名单，以及通过奉献服务提供商收取付款。"
---

# 付费报名

<div class="article-intro">

活动报名可以不止于简单的人数统计。你可以定义定价的参与者类型（例如成人和儿童），提供带有独立价格和数量的可选附加项目，创建折扣码，并通过教会现有的奉献服务提供商在报名时收取付款。当活动名额已满时，可选的候补名单会让有意向的成员排队等候，并在出现空位时自动递补。

</div>

## 培训视频 {#training-video}

<YouTube id="eGSZv24Dlzk" title="B1 中的活动报名和付费活动" next="在 B1 中上线你的教会网站" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>开始之前</h4>

- 请先为活动开启报名——参见[创建日历](./creating-calendars.md#enabling-event-registration)
- 若要在线收款，你的教会需要[配置在线奉献](../donations/online-giving-setup.md)（Stripe、PayPal 或 Kingdom Funding）。免费活动无需设置奉献功能。若未设置在线奉献，付费报名仍可使用，但人员需直接向教会付款——参见[没有在线奉献的教会](#churches-without-online-giving)。

</div>

## 打开报名设置 {#opening-registration-settings}

1. 在 B1 Admin 中，打开[跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），选择 **Calendars > Registrations**，然后点击你的活动（或在该活动所在的日历上点击活动，并选择 **Manage Registrations**）。
2. 点击 **Edit settings**。**Registration Settings** 卡片显示基本设置——**Enable Registration**、**Capacity**、**Enable Waitlist**、**Registration Opens/Closes**、**Tags** 和 **Registration Questions**——并附有 **Save Settings** 按钮。
3. 基本设置下方有三个折叠面板：**Attendee Types**、**Selections** 和 **Discount Codes**。每个面板都有各自的 **Save** 按钮，与 **Save Settings** 相互独立；如果你在未保存更改的情况下离开，B1 会发出警告。点击 **Back to Registrations** 即可返回名单。

## 参与者类型 {#attendee-types}

参与者类型让你为不同类别的参与者收取不同的费用，并分别设置每种类型的名额上限。

1. 展开 **Attendee Types** 折叠面板，然后点击 **Add Type**。
2. 输入 **Name**（例如"成人""儿童""学生"）。
3. 设置 **Price**（价格）。免费类型请填 0。
4. 可选择为该类型单独设置 **Capacity**（名额）（例如仅 20 个儿童名额）。留空则不对该类型设限。
5. 可选择设置 **Sort**（排序），以控制各类型的列出顺序。
6. 点击 **Save**。

若要删除已保存的类型，请点击其删除图标并确认；删除会立即生效。选项和折扣码的删除方式相同。

报名过程中，每位参与者需选择一种类型；已售罄的类型会显示为 **Sold out**，无法选择。名单会显示每位参与者的类型以及各类型的实时人数统计。

## 附加选项 {#selections}

附加选项是可选的、带有价格的附加项目——例如 T 恤、餐饮套餐、活动升级等。

1. 展开 **Selections** 折叠面板，然后点击 **Add Selection**。
2. 输入 **Name**（名称）、可选的 **Description**（说明），以及 **Price**（价格）（填 0 会显示为"Free"，即免费）。
3. 可选择设置 **Capacity**（名额）（所有报名的可用总数）以及 **Max Qty**（最大数量）（单次报名最多可订购的数量）。
4. 点击 **Save**。

报名人在注册时选择数量，所选总数会计入名额，因此不会超额售出。

## 折扣码 {#discount-codes}

1. 展开 **Discount Codes** 折叠面板，然后点击 **Add Discount Code**。
2. 输入报名人需要输入的 **Code**（折扣码）。
3. 选择 **Type**（类型）——**Percent**（百分比）或 **Amount**（金额）——并设置其 **Value**（数值）。
4. 可选择通过 **Start Date** / **End Date**（起止日期）、**Min Members**（最少人数，即报名中的最少参与者人数）以及 **Max Uses**（最大使用次数）对折扣码进行限制。
5. 点击 **Save**。

每个折扣码都会显示 **Uses**（使用次数），让你了解其被兑换的频率。报名人在应用折扣码时会立即得到反馈——包括折扣码已过期、尚未开始或需要更多参与者的明确提示。

## 候补名单 {#waitlist}

在 Registration Settings 卡片中开启 **Enable Waitlist**。当活动达到名额上限时：

- 新报名人会被提供候补名额，而不是被拒之门外。他们完成相同的报名步骤（候补期间会跳过付款）。
- 当有人取消报名时，最早的候补报名会被**自动递补**，并收到一封电子邮件，告知有空位出现。如果他们仍有欠款，邮件会链接到教会 B1 网站上的 [My Registrations](../../b1-church/events/my-registrations.md)，他们可以在那里完成付款。
- 你随时可以对候补行使用 **Promote** 操作，手动为某人递补——例如在提高活动名额之后，这一功能非常实用。

:::info
递补后的报名会保持*待处理*状态，直到欠款付清；付款（或无需付款）后即会确认。
:::

## 报名名单 {#the-registration-roster}

从报名页面打开某个活动，即可查看所有报名。卡片标题会显示占用名额的报名数与名额上限的对比（例如 *Registrations (18 / 20)*）。只有待处理和已确认的报名才计入名额；有候补人员时，标题会附加候补人数（例如 *· 3 waitlisted*），同一数字也会显示在名额进度条下方。名额进度条上方较大的数字统计的是**人数**，而非报名次数——即每条待处理或已确认报名中的所有人——因此一个四口之家算作四人。名额限制本身仍按报名次数计算。表格显示 **Name**、**Members**、**Type**（每位参与者的类型）、**Paid / Total**（已付/总额，若仍有欠款则显示余额警告）、**Status** 和 **Date**，表格上方还有各类型的人数标签。

- 点击某行的详情图标，即可打开 **Registration Details** 对话框——包括成员、附加选项、已付/余额，以及列出每笔费用（金额、方式、日期）的 **Payments** 表格。
- **Export CSV** 会下载完整名单，包含成员、参与者类型、附加选项、已付/总额/余额、状态，以及每个报名问题各占一列。
- **Add Attendee** 可为教会中的任何人记录线下或电话报名。选择该人员，若为付费活动，还需选择其参与者类型。系统不会对其扣款：付费报名会以**待处理**状态保存，全额作为应付余额。如果你的教会设有在线奉献，该人员可通过 [My Registrations](../../b1-church/events/my-registrations.md) 付款；否则请当面收取。添加参与者需要具有 Registrations 的编辑权限。

:::info
退款不在 B1 内处理。如需为已取消的付费报名退款，请在奉献服务提供商的后台（例如 Stripe）中进行退款。
:::

## 付款的运作方式 {#how-payment-works}

付款通过教会已在用于奉献的同一支付网关进行——卡片信息直接发送给服务提供商，绝不经过 B1 的服务器。价格始终根据你配置的类型、附加选项和折扣码在服务器端计算，因此报名人无法篡改总额。已登录的成员可以使用已保存的银行卡付款。访客需要在结账时输入卡号，并在付款前勾选 **I'm not a robot** 验证。

### 没有在线奉献的教会 {#churches-without-online-giving}

如果你的教会未设置奉献服务提供商，付费活动仍可接受报名。付款步骤会告知报名人在线付款不可用，他们可以直接向教会付款；**Register and Pay Later**（报名并稍后付款）按钮会保存该报名。报名会以**待处理**状态保存，全额作为应付余额，并在名单中显示余额警告。请按照教会平时的方式收取款项。

:::info
B1 无法将线下付款标记为已收到。收款之后，应付余额会保留在名单上以及报名人的 [My Registrations](../../b1-church/events/my-registrations.md) 卡片上，因此请自行记录哪些人已付款。
:::

## 相关文章 {#related-articles}

- [创建日历](./creating-calendars.md#enabling-event-registration)——开启报名及基本设置
- [在线奉献设置](../donations/online-giving-setup.md)——配置结账时使用的支付网关
- [活动报名](../../b1-church/events/registering.md)——成员报名时所看到的内容
- [My Registrations](../../b1-church/events/my-registrations.md)——成员如何支付余额并修改报名
