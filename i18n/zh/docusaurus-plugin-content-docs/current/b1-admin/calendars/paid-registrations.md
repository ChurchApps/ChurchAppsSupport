---
title: "付费报名"
---

# 付费报名

<div class="article-intro">

活动报名不仅仅是简单的人数统计。你可以定义带价格的参与者类型（例如成人和儿童），提供设有独立价格和数量的可选附加项目，创建折扣码，并通过教会现有的捐赠服务商在报名时收取费用。当活动名额已满时，可选的候补名单会让有意向的成员保持排队，并在有名额空出时自动为其转正。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 请先为活动开启报名——参见[创建日历](creating-calendars#enabling-event-registration)
- 若要在线收款，教会需要[配置在线捐赠](../donations/online-giving-setup.md)（Stripe、PayPal 或 Kingdom Funding）。免费活动无需任何捐赠设置。没有在线捐赠时，付费报名仍可使用，但参与者需直接向教会付款——参见[没有在线捐赠的教会](#churches-without-online-giving)。

</div>

## 打开报名设置

1. 在 B1 Admin 中，打开[快速跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），选择 **Calendars > Registrations**，然后打开你的活动（或从其所在日历中打开该活动）。
2. **Registration Settings** 卡片显示基本信息——**Enable Registration**、**Capacity**、**Registration Opens/Closes**、**Tags** 和 **Registration Questions**。
3. 基本信息下方有三个折叠面板：**Attendee Types**、**Selections** 和 **Discount Codes**。

## 参与者类型

参与者类型可让你为不同类别的参与者设定不同的价格，并分别限制每种类型的人数。

1. 展开 **Attendee Types** 面板，点击 **Add Type**。
2. 输入 **Name**（名称），例如"成人""儿童""学生"。
3. 设置 **Price**（价格）。免费类型请填写 0。
4. 可选择为该类型单独设置 **Capacity**（名额），例如仅限 20 个儿童名额。留空则不限制该类型人数。
5. 点击 **Save**。

报名时，每位参与者需选择一种类型；已售罄的类型会显示为 **Sold out**，且无法选择。报名名单会显示每位参与者的类型，以及每种类型的实时人数统计。

## 附加选项

附加选项是可选的收费项目——例如 T 恤、餐饮套餐、活动升级等。

1. 展开 **Selections** 面板，点击 **Add Selection**。
2. 输入 **Name**（名称）、可选的 **Description**（描述），以及 **Price**（价格）（填写 0 则显示为"Free"，即免费）。
3. 可选择设置 **Capacity**（名额，所有报名的总可售数量）以及 **Max Qty**（最大数量，即单次报名最多可订购的数量）。
4. 点击 **Save**。

报名者在注册时选择数量，这些数量会计入名额，因此不会超额售卖。

## 折扣码

1. 展开 **Discount Codes** 面板，点击 **Add Discount Code**。
2. 输入报名者需要输入的 **Code**（代码）。
3. 选择 **Type**（类型）——**Percent**（百分比）或 **Amount**（金额），并填写其 **Value**（数值）。
4. 可选择通过 **Start Date** / **End Date**（开始日期 / 结束日期）、**Min Members**（最少人数，即一次报名中的最少参与人数）以及 **Max Uses**（最大使用次数）来限制折扣码的使用。
5. 点击 **Save**。

每个折扣码都会显示 **Uses**（使用次数），方便你了解它被兑换的频率。报名者在应用折扣码时会立即收到反馈——包括折扣码已过期、尚未生效或需要更多参与人数等明确提示。

## 候补名单 {#waitlist}

在 **Registration Settings** 卡片中开启 **Enable Waitlist**。当活动达到名额上限时：

- 新报名者会被提供候补名额，而不是被拒绝。他们完成相同的报名流程（候补期间会跳过付款）。
- 当有人取消报名时，最早的候补报名会**自动转正**，并收到一封邮件，通知其已有名额空出。如果他们仍有未付款项，邮件会链接到你教会 B1 网站上的 [My Registrations](../../b1-church/events/my-registrations)，他们可以在那里完成付款。
- 你可以随时对候补中的某一行使用 **Promote** 操作，手动为其转正——例如在提高活动名额之后，这一功能很有用。

:::info
转正的报名在任何未付款项支付之前会保持**待定（pending）**状态；付款（或无需付款）后即会确认。
:::

## 报名名单 {#the-registration-roster}

从 Registrations 页面打开某个活动，即可查看所有报名。卡片标题会显示占用名额的报名数量（例如 *Registrations (18 / 20)*）。只有待定和已确认的报名才计入名额；如果有候补人员，标题中会附加候补人数（例如 *· 3 waitlisted*），同样的候补数量也会显示在名额进度条下方。表格显示 **Name**（姓名）、**Members**（人数）、**Type**（类型，即每位参与者的类型）、**Paid / Total**（已付 / 总额，若仍有欠款则显示余额提醒）、**Status**（状态）和 **Date**（日期），表格上方还有各类型的人数统计标签。

- 点击某一行的详情图标，即可打开 **Registration Details**（报名详情）对话框——包括人员、附加选项、已付 / 余额，以及列出每笔费用（金额、付款方式、日期）的 **Payments**（付款）表。
- **Export CSV**（导出 CSV）会下载完整名单，包含人员、参与者类型、附加选项、已付 / 总额 / 余额、状态，以及每个报名问题各占一列。
- **Add Attendee**（添加参与者）可为教会中的任何人记录线下或电话报名。选择人员，若是付费活动，还需选择其参与者类型。系统不会对其进行扣款：付费报名会以**待定（pending）**状态保存，并将全部金额记为待付余额。如果教会已开通在线捐赠，此人可以通过 [My Registrations](../../b1-church/events/my-registrations)付款；否则请当面收取。添加参与者需要拥有 Registrations Edit 权限。

:::info
B1 内不处理退款。如需为已取消的付费报名退款，请通过你的捐赠服务商后台（例如 Stripe）办理。
:::

## 付款的运作方式

付款通过教会已用于捐赠的同一支付网关进行——卡片信息直接发送至服务商，从不经过 B1 的服务器。价格始终由服务器根据你设置的类型、附加选项和折扣码计算，因此报名者无法篡改总额。已登录的成员可以使用已保存的银行卡付款。访客需要在结账时输入卡片信息，并在付款前勾选 **I'm not a robot** 验证。

### 没有在线捐赠的教会 {#churches-without-online-giving}

如果教会没有设置任何捐赠服务商，付费活动仍可接受报名。付款步骤会告知报名者当前无法在线付款，并可直接向教会付款；此时，**Register and Pay Later**（报名并稍后付款）按钮会保存报名信息。报名会以**待定（pending）**状态保存，并将全部金额记为待付余额，并在名单中显示欠款提醒。请按照教会平常的方式收取款项。

:::info
B1 无法将线下付款标记为已收讫。收款之后，待付余额仍会保留在名单上以及报名者的 [My Registrations](../../b1-church/events/my-registrations) 卡片中，因此请自行记录谁已付款。
:::

## 相关文章

- [创建日历](creating-calendars#enabling-event-registration) —— 开启报名及基本设置
- [在线捐赠设置](../donations/online-giving-setup.md) —— 配置结账时使用的支付网关
- [报名参加活动](../../b1-church/events/registering) —— 成员报名时看到的内容
- [My Registrations](../../b1-church/events/my-registrations) —— 成员如何支付余额并编辑报名信息
