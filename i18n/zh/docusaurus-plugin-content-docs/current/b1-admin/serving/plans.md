---
title: "服事计划"
---

# 服事计划

<div class="article-intro">

服事计划用于安排谁在何时服事。每个计划都关联到特定的日期和事工，便于您逐周协调志愿者团队，确保每场礼拜都有充足的人手。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 在 Serving（服事）区域中设置好您的事工和团队
- 确保志愿者已添加到您的[人员名录](../people/adding-people.md)并分配到团队

</div>

## 访问计划

1. 在 B1 Admin 中，打开[快速跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），展开 **Serving**，然后点击 **Plans**。
2. 选择页面顶部的**事工标签**。
3. 点击**计划类型**，即可查看该类型的计划列表。使用列表上方的 **Upcoming** 和 **Past** 可在未来计划和过去计划之间切换。**Upcoming** 列出从今天起的计划，最近的排在最前，没有日期的计划排在最后。**Past** 仅列出过去的计划，最新的排在最前。
4. 点击某个具体计划即可打开。

每个计划页面都包含返回其计划类型和 **Plans** 的链接，因此您无需使用浏览器的后退按钮即可返回上一级。

:::info
管理计划无需完整的管理员权限。任何事工的成员都可以进入 Serving，为自己的事工创建、编辑和安排计划，而无需拥有 Plans Edit 权限。拥有 Plans Edit 角色的编辑者可以管理所有事工的计划。
:::

## 创建计划

1. 在计划类型页面，点击页面顶部的 **New Plan**。
2. 为计划命名，或直接以日期作为名称。选择礼拜的**日期**。
3. 如果您的事工有[模板](./plan-templates.md)，可以在 **Start from template** 下选择一个模板，一步完成礼拜程序、职位和备注的填写。
4. 否则，如果您希望从之前的计划复制内容，请使用 **Copy from Previous Plan**，选择 **Positions Only**（仅职位）或 **Positions and Assignments**（职位和分配）。如果不想复制，请选择 **Nothing**（无）。您还可以勾选 **Copy Order of Service**（复制礼拜程序）。从之前的计划复制时，新计划还会保留该计划的 **Notes**（备注）、**Signup Deadline**（报名截止时间）、**Show volunteer names on signup page**（在报名页面显示志愿者姓名）以及自动替换设置，因此您无需每周重新输入这些内容。您可以在新计划的设置中更改其中任何一项。
5. 如果要在复制时一次性设置多周，请在 **Repeat weekly for this many weeks**（每周重复的周数）中输入数字（最多 12 周）。B1 会为每周创建一个计划，每个计划都复制自前一个计划。如果计划以日期命名，则每个新计划都会以其各自的日期命名。
6. 可选：设置 **Signup Deadline (hours before service)**（礼拜前多少小时截止报名）。新计划会沿用上一个计划的截止时间，您可以在此处更改。如果不设截止时间，请留空。
7. 保存计划。现在您可以开始分配团队成员，并编排[礼拜程序](./service-order.md)。

:::tip
**Repeat weekly for this many weeks** 仅在您从上一个计划复制内容（职位、分配或礼拜程序）时可用。
:::

## 计划详情页面

打开计划后，计划的名称、事工、计划类型和礼拜日期会显示在页面顶部，并附有 **Edit** 和 **Print** 按钮。其下的所有内容都在同一页面中：

- **[礼拜程序](./service-order.md)** -- 编排礼拜程序，加入诗歌敬拜、祷告、公告和讲道等环节。
- **Serving Team Assignments**（服事团队分配）-- 管理分配到该计划的团队成员。您可以从现有团队中添加人员，并查看谁已确认、谁仍待定。职位上方的链接可打开该计划的 **Notes**（备注）和 **Times**（时间）。

## 分配团队成员

1. 打开一个计划，并滚动到 **Serving Team Assignments**。
2. 点击 **Add Position**（添加职位）。在添加职位表单中填写相关信息。类别名称可以随意填写。如果您希望教会中的任何人都能担任该职位（而不仅限于某个团队的成员），请将 **Volunteer Group**（志愿者小组）保持为 **None**。
3. 点击 **People Needed**（所需人员），选择志愿者来填补该职位。如果该职位设置了 **Volunteer Group**，则从该小组的成员中选择。如果其 Volunteer Group 设置为 **None**，您可以改为搜索教会中的任何人。
4. 点击 **Add**，从团队名册中添加成员。
5. 已分配的成员会在其所属团队下显示，并附有其分配状态。
6. 点击 notify volunteers（通知志愿者），通过 B1 应用或电子邮件通知他们。

每个职位都会显示一个数量标签（例如“2/3”），便于您一目了然地看出有多少名额已填满。在 **Serving Team Assignments** 标题下，会显示一条摘要（“X of Y positions filled”，即已填满 X/Y 个职位），说明该计划的整体人手情况以及仍需多少人。当所有职位都已覆盖时，摘要会变为 **Fully staffed**（人员已满）。

:::tip
在创建计划之前，请先在事工设置中设置好您的团队。这样您就有一个现成的志愿者池可供分配。
:::

### 将职位复制到空计划

如果某个计划尚无职位，而且存在同类型的更早计划，**Serving Team Assignments** 中会出现 **Copy from Previous Plan** 链接。选择 **Positions Only** 或 **Positions and Assignments**，即可将上一个计划的职位（以及志愿者）填入您当前打开的计划。复制的内容会进入当前计划，而不会为同一日期再创建一个计划。

## 计划设置

每个计划都有额外的设置项，您可以点击计划类型列表中该计划旁边的 **Edit**，或点击计划页面顶部的 **Edit** 按钮进行配置。点击 **Done**（或计划名称）即可返回计划。这些设置包括：

- **Signup Deadline (hours before service)**（礼拜前多少小时截止报名）—— 礼拜开始前多少小时停止接受志愿者报名。输入负数可使报名在礼拜开始后仍然开放。如果不设截止时间，请留空。
- **Show volunteer names on signup page**（在报名页面显示志愿者姓名）—— 勾选后，已登录的志愿者可以在 B1.church 报名页面上看到每个职位已有哪些人报名。未登录的访客永远看不到姓名。
- **Penciled in**（暂定）—— 在您准备好发布排班表之前，对志愿者隐藏分配信息。
- **Automatically schedule a replacement when a volunteer declines**（志愿者婉拒时自动安排替补）—— 勾选后，如果已分配的志愿者婉拒其职位，B1 会自动联系团队名册中的下一位可用人员，询问其是否愿意服事。这一过程会依次进行，直到有人接受为止，无需手动跟进即可保持职位填满。

:::tip
在会员报名页面上，每个计划的空缺职位会先按类别、再按名称列出。除非您在[设置 > 志愿者报名](../settings/church-settings.md#volunteer-signup)中开启 **Show only the next week of each plan type**（每种计划类型仅显示下一周），否则会员会看到所有有空缺职位的未来周次。
:::

## 志愿者提醒 {#volunteer-reminders}

B1 可以在志愿者被安排的礼拜前自动提醒他们，因此您无需每周逐一催促团队成员。提醒会发送给**所有已排班的人员**——包括已确认和尚未回复的人。每封提醒邮件都包含志愿者的职位、礼拜日期、计划备注以及您自定义的消息。

提醒的时间和内容按**计划类型**分别设置，因此每种礼拜都可以拥有各自的时间安排。

1. 在 **Serving** 区域中，选择包含该计划类型的事工。
2. 在 **Plan Types**（计划类型）列表中，点击该计划类型旁边的 **Edit**。
3. 展开 **Reminders**（提醒）部分，并开启 **Send reminders for plans of this type**（为此类型的计划发送提醒）。
4. 在 **When should reminders go out?**（提醒何时发送？）下，最多选择三个时间点：**7 days before**（提前 7 天）、**3 days before**（提前 3 天）、**2 days before**（提前 2 天）、**1 day before**（提前 1 天）或 **Day of**（当天）。
5. 设置提醒发送的 **Time of Day**（时间）。
6. 可选：添加 **Message**（消息）。留空则使用默认的提醒措辞。
7. 在 **Send By**（发送方式）下，选择 **Push**（推送）、**Email**（电子邮件），以及在您的教会已连接[短信服务商](../settings/church-settings.md#texting)的情况下选择 **Text**（短信）。
8. 点击 **Save Reminders**（保存提醒）。

在您开启之前，某个计划类型的提醒默认是关闭的。

:::tip
尚未确认的志愿者会在提醒邮件中直接看到 **Accept**（接受）和 **Decline**（婉拒）按钮，无需登录即可回复。
:::

### 短信提醒

只有在您的教会已连接短信服务商时，才会出现 **Text**（短信）选项。短信通过您教会的短信服务商发送，每条短信都可能产生费用。只有当志愿者在其[通知偏好设置](../../b1-church/getting-started/notification-preferences.md)中开启了**短信**，并且个人资料中有手机号码时，才会收到短信提醒。每条短信都以您教会的名称开头，并保持在一条短信之内，结尾为“Reply STOP to opt out”（回复 STOP 退订）。回复 STOP 的人将不再收到您教会发出的短信。为了让 STOP 回复能够传送到 B1，请将[短信设置](../settings/church-settings.md#texting)中的 **Inbound (STOP) webhook URL**（入站 STOP webhook 网址）粘贴到您服务商的入站消息 webhook 中。

如需立即向某个日期范围内所有已排班的人员发送短信，请使用[计划概览](./plans-overview.md#texting-everyone-scheduled)中的 **Text Volunteers**（群发志愿者短信）。

:::info
每条提醒只发送一次。短信提醒是在推送和电子邮件之外额外发送的，而不是替代它们。
:::

## 将小组与计划类型关联

在计划类型页面的计划列表下方，**Associated Groups**（关联小组）部分可让您决定哪些小组可以在其会员门户中查看该计划类型的计划。这是一种快速向相关团队展示即将到来的礼拜，而无需授予其管理员权限的方法。

1. 在计划类型页面上，点击页面顶部的 **Associated Groups**（或向下滚动至该部分）。
2. 点击 **Add Group**（添加小组），然后从下拉菜单中选择一个小组。
3. 在 **Shows**（显示）列中，选择该小组的成员应查看该计划类型的 **Past plans only**（仅过去的计划）、**Upcoming plans only**（仅即将到来的计划）还是 **Past and upcoming plans**（过去和即将到来的计划）。
4. 如需关联更多小组，请重复上述步骤；如需移除某个小组，请点击垃圾桶图标。

:::info
只有标记为 **Standard**（标准）的小组才会出现在选择列表中。关联小组的成员会自动在 B1 会员门户中该小组的页面上看到此计划类型的计划，且仅限于您所选的时间范围。
:::

如果这些计划是 Lessons.church 的课程，关联小组的成员还会在小组页面上看到**本周课程**卡片（包括底线、经文以及给家长的问题）。请在此将家长小组与计划关联，并将筛选条件设置为 **Past plans only**，以便包含今天的课程。服事团队通常使用 **Upcoming plans only** 或 **Past and upcoming plans**。

## 打印计划

您可以打印计划，以便分发给团队。打开计划，然后点击页面顶部的 **Print**，即可生成包含分配信息和礼拜程序的可打印版本。打印件顶部会显示您的教会标志（如果您已上传，则使用 [Website > Appearance](../website/appearance.md) 中的 **Light Background Logo**），下方是教会名称和计划名称，方便识别散落的页面。这在排练时分发或张贴在公共区域时非常有用。

:::info
计划按事工进行组织。在创建或查看计划之前，请确保您位于正确的事工标签上。
:::

## 后续步骤

- 使用[计划概览](./plans-overview.md)，在一个网格中查看多周的所有即将到来的分配，发现未填满的职位，并直接在网格中分配志愿者
- 将计划结构保存为[计划模板](./plan-templates.md)，以便一键应用到未来的计划中
- 使用[礼拜程序](./service-order.md)，编排诗歌、读经及其他环节
- 从您的资料库中将[诗歌](./songs.md)直接添加到礼拜程序中
- 使用[任务](./tasks.md)为团队成员分配后续跟进事项
- 使用[数字标牌](./digital-signage.md)在大厅电视上显示当前的课程内容
