---
title: "服事计划"
description: "在 B1 Admin 中设置志愿者排班：按日期创建崇拜计划，从前几周复制，为岗位指派团队成员，并管理报名截止日期和提醒。"
---

# 服事计划 {#service-plans}

<div class="article-intro">

服事计划用于安排谁在何时服事。每份计划都关联特定的日期和事工，便于你按周协调各志愿者团队，确保每场礼拜都有充足的人手。

</div>

## 培训视频 {#training-video}

<YouTube id="47DstBXKl74" title="在 B1 中创建计划并安排志愿者" next="在 B1 中建立崇拜程序和诗歌库" nextUrl="/docs/b1-admin/serving/service-order" />

<div class="prereqs">
<h4>开始之前</h4>

- 在服事区设置好你的事工和团队
- 确保志愿者已添加到你的[人员名录](../people/adding-people.md)中，并已分配到团队

</div>

## 进入计划 {#accessing-plans}

1. 在 B1 Admin 中，打开[跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），展开 **Serving**（服事），然后点击 **Plans**（计划）。
2. 选择页面顶部的某个**事工标签页**。
3. 点击某个**计划类型**，查看该类型的计划列表。使用列表上方的 **Upcoming**（即将到来）和 **Past**（过去）在未来和较早的计划之间切换。**Upcoming** 列出从今天起的计划，最近的排在最前，没有日期的计划排在最后。**Past** 仅列出较早的计划，最新的排在最前。
4. 点击某个具体计划将其打开。

每个计划页面都提供返回其计划类型和 **Plans** 的链接，因此你无需使用浏览器的后退按钮即可返回上一级。

:::info
管理计划无需完整的管理员权限。任何事工成员都可以进入服事区，为自己所属的事工创建、编辑和排定计划，而无需拥有 Plans Edit（编辑计划）权限。拥有 Plans Edit 角色的编辑者可以管理所有事工的计划。
:::

## 创建计划 {#creating-a-plan}

1. 在计划类型页面，点击页面顶部的 **New Plan**（新建计划）。随即打开 **Add a Plan**（添加计划）表单。
2. 为计划命名，或直接使用日期作为名称。选择 **Service Date**（礼拜日期）。如果你的教会有多个校区，还可以选择计划的 **Campus**（校区）。
3. 如果你的事工有[模板](./plan-templates.md)，可以在 **Start from template**（从模板开始）下选择一个模板，一步填入崇拜程序、岗位和备注。
4. 否则，如果你想从之前的计划复制，请使用 **Copy from Previous Plan**（从上一份计划复制），并选择 **Positions Only**（仅岗位）或 **Positions and Assignments**（岗位和分派）。如果不想复制，请选择 **Nothing**（不复制）。你也可以勾选 **Copy Order of Service**（复制崇拜程序）。从前一份计划复制时，新计划还会保留该计划的 **Notes**（备注）、**Signup Deadline**（报名截止时间）、**Show volunteer names on signup page**（在报名页面显示志愿者姓名）以及自动替换设置，因此你无需每周重新输入。你可以在新计划的设置中更改其中任何一项。
5. 若要在复制的同时一次设置多份计划，请选择 **Repeat every**（重复周期）和 **Frequency**（频率，Day（天）、Week（周）或 Month（月）），然后输入 **Number of plans**（计划数量，最多 12 份）。对于按月重复，**On**（于）选项可让你保持相同的月中日期，或相同的星期几，例如每月第二个星期六。B1 会在保存前列出日期，并为每个日期创建一份计划，每份计划都复制自前一份。如果计划以日期命名，每份新计划都会以其各自的日期命名。
6. 可选设置 **Signup Deadline (hours before service)**（报名截止时间（礼拜前小时数））。新计划会沿用前一份计划的截止时间，你可以在此更改。留空则表示没有截止时间。关于截止时间的计算方式，请参阅[计划设置](#plan-settings)。
7. 保存计划。现在你可以开始指派团队成员，并编排[崇拜程序](./service-order.md)。

:::tip
重复设置仅在从上一份计划复制某些内容（岗位、分派或崇拜程序）时可用。
:::

## 计划页面 {#the-plan-page}

打开计划后，页面顶部会显示其事工和计划类型、名称及礼拜日期，并附有 **Print**（打印）和 **Edit details**（编辑详情）按钮。页面提供整个计划的概览：

- **Run time**（总时长）、**Serving team**（服事团队）和 **Responses**（回复）方块分别显示崇拜程序的总长度、已填满的岗位数量（例如 "10 of 13 filled"（13 个岗位已填 10 个）），以及已接受、待定或已拒绝的志愿者人数。
- **Order of Service**（崇拜程序）显示[崇拜程序](./service-order.md)的前几项及其时长。点击 **Edit order of service**（编辑崇拜程序），即可在独立页面中打开完整的崇拜程序。
- **Serving team**（服事团队）按类别列出每个岗位，显示已分派的志愿者以及仍需的人数。如果有需要处理的事项，会出现类似 "1 conflict · 3 not notified"（1 项冲突 · 3 人未通知）的提示，并附有 **Review**（查看）链接。点击 **Manage serving team**（管理服事团队），即可打开完整的服事团队页面。
- **Times**（时间）列出计划的礼拜时间和排练时间。请参阅[礼拜时间](#service-times)。
- **Notes**（备注）用于存放面向整个团队的备注。点击 **Edit**，输入备注内容，然后点击 **Save Notes**（保存备注）。

崇拜程序和服事团队页面各自都有 **Back to plan**（返回计划）链接，可返回概览页面。

## 礼拜时间 {#service-times}

时间设置告诉 B1 礼拜和任何排练何时举行。这些时间用于报名截止、[计划验证](./plan-validation.md)、志愿者提醒，以及崇拜程序中的时钟时间。

1. 在计划页面上，点击 **Times** 旁边的 **Add time**（添加时间）。
2. 选择 **Type**（类型）：**Service**（礼拜）、**Rehearsal**（排练）或 **Other**（其他）。
3. 输入 **Display Name**（显示名称），例如 "Sunday Service"（主日礼拜）或 "Rehearsal"（排练）。
4. 设置 **Start Time**（开始时间）和 **End Time**（结束时间）。
5. 在 **Needed Serving Teams**（所需服事团队）下，勾选在此时间段服事的岗位类别，例如 Worship（敬拜）或 Technical（技术）。
6. 点击 **Save**（保存）。

点击某个时间的名称即可编辑或删除该时间。

## 指派团队成员 {#assigning-team-members}

1. 打开某份计划，点击 **Manage serving team**（管理服事团队）。
2. 点击 **Add Position**（添加岗位）。在 **Add a Position**（添加岗位）对话框中，选择或输入 **Category Name**（类别名称），例如 Worship（敬拜）或 Hospitality（接待）；输入岗位 **Name**（名称）和 **Volunteer Count**（志愿者人数）；然后选择 **Volunteer Group**（志愿者小组）。如果希望教会中的任何人都能担任该岗位（而不仅限于某个团队的成员），请将 **Volunteer Group** 保持为 **None**（无）。勾选 **Allow Self-Signup**（允许自助报名），让志愿者可以自行报名空缺岗位；还可以添加可选的 **Description**（描述），志愿者在浏览报名机会时会看到该描述。点击 **Save**。
3. 点击岗位旁边的 **People Needed**（所需人数）链接（例如 "2 People Needed"（需要 2 人））。
4. 在 **Assign Position**（指派岗位）对话框中，点击团队成员的姓名即可将其指派到该岗位。若团队人数较多，可在 **Search team**（搜索团队）中输入部分姓名以缩小列表范围；列表会独立滚动，因此 **Done** 始终可见。计划日期当天设有[不可服事日期](./plan-validation.md#blockout-dates)的团队成员会显示 **Unavailable**（不可服事）标记，并列在最后。如果该岗位的志愿者小组设置为 **None**，请搜索教会中的任何人，然后点击其旁边的添加人员图标。完成后点击 **Done**（完成）。
5. 已指派的志愿者会显示在岗位旁边。其头像上的绿点表示已接受，红点表示已拒绝。**Unavailable** 标记则表示其在该计划日期不可服事。
6. 在 **Validation**（验证）面板中通知志愿者（参见[通知志愿者](./plan-validation.md#notifying-volunteers)）。如果该计划使用了[确认工作流](#plan-settings)，通知志愿者时还会启动一张工作流卡片，持续跟进每项请求，直到志愿者回复为止。

若要更改或移除某项分派，请点击志愿者的姓名，然后在 **Edit Assignment**（编辑分派）对话框中点击 **Delete**（删除）。若要更改岗位，请点击其名称；在 **Edit Position**（编辑岗位）对话框中点击 **Delete** 会删除该岗位，并取消分派到该岗位的所有人员。

每个岗位都会显示一个计数标签（例如 "2/3"，或自助报名岗位显示 "1/2 signup"（1/2 报名）），便于你一目了然地了解已填满多少名额。服事团队页面顶部会显示汇总信息（"X of Y positions filled"（Y 个岗位已填 X 个）），展示该计划的整体人员配置及仍需的人数；当所有岗位均已覆盖时，会切换为 **Fully staffed**（人手已满）。

:::tip
在创建计划之前，请先在事工设置中配置好团队。这样，你在指派时就有现成的志愿者可选。
:::

### 自动指派 {#auto-assign}

在服事团队页面点击 **Auto Assign**（自动指派），即可从岗位的志愿者小组中填满所有空缺名额。未设置志愿者小组的岗位会被跳过。若要撤回刚刚自动添加的志愿者，请点击 **Undo Auto Assign**（撤销自动指派）。你也可以在[计划总览](./plans-overview.md#auto-scheduling-from-the-overview)中一次为多份计划填充人员。

### 排班偏好 {#scheduling-preferences}

在 **Assign Position**（指派岗位）对话框中，点击某位团队成员旁边的滑块图标，即可设置其 **Scheduling Preferences**（排班偏好）：**Max times per month**（每月最多次数）、**Preferred service times**（偏好的礼拜时间），以及 **Household scheduling**（家庭排班，即是否将同一家庭的成员安排在一起，或避免安排在同一天）。当某项分派违背这些偏好时，[计划验证](./plan-validation.md)会向你发出警告。

### 将岗位复制到空白计划 {#copying-positions-into-an-empty-plan}

如果某份计划尚无岗位，且存在同类型的较早计划，服事团队页面上会出现 **Copy from Previous Plan**（从上一份计划复制）链接。选择 **Positions Only**（仅岗位）或 **Positions and Assignments**（岗位和分派），即可用上一份计划的岗位（及志愿者）填充你当前打开的计划。复制内容会加入当前计划，不会为同一日期另建一份计划。

## 计划设置 {#plan-settings}

每份计划都有其他设置，你可以在计划类型列表中点击计划旁边的 **Edit**（编辑），或在计划页面顶部点击 **Edit details**（编辑详情）进行配置。点击 **Done**（完成）（或表单上方的计划名称）即可返回计划。同一表单中有一个 **Delete**（删除）按钮，可删除该计划，包括其岗位、分派和崇拜程序。设置项包括：

- **Signup Deadline (hours before service)**（报名截止时间（礼拜前小时数））-- 礼拜前多少小时关闭志愿者报名。小时数从计划的第一个 **Service**（礼拜）时间向前计算（排练和其他时间会被跳过，除非计划中没有其他时间），因此对于上午 10:00 的礼拜，设置 2 小时截止时间，则当天上午 8:00 关闭报名。如果计划没有设置任何时间，则截止时间从礼拜日期当天、按教会所在时区的上午 9:00 开始计算。截止时间过后，志愿者既不能报名，也不能取消自己的报名。输入负数可使报名在礼拜开始后仍保持开放。留空或清除该值则表示没有截止时间。
- **Confirmation workflow**（确认工作流）-- 选择一个[服事分派确认工作流](./workflows.md#serving-assignment-confirmations)，通过电子邮件和短信跟进该计划的服事请求，直到每位志愿者接受或拒绝为止。在已发布的计划上点击 **Notify**（通知）志愿者时，每项新请求都会在该工作流的看板上生成自己的卡片，且通知链接上方会显示提示 *"New requests use the confirmation workflow."*（新请求将使用确认工作流。）。若保持 **Use existing assignment notifications**（使用现有分派通知），则继续使用常规通知。列表中只会显示已启用的确认工作流；请先在 **Serving > Workflows**（服事 > 工作流）下创建一个。
- **Show volunteer names on signup page**（在报名页面显示志愿者姓名）-- 勾选后，已登录的志愿者可以在 B1.church 报名页面上看到每个岗位已有哪些人报名。未登录的访客永远看不到姓名。此设置还控制是否在崇拜程序的每个项目旁打印负责的志愿者（参见[打印计划](#printing-plans)）。
- **Penciled in**（暂定）-- 在你准备发布排班之前，对志愿者隐藏分派。计划处于暂定状态时，服事团队页面上的 **Validation** 面板会显示 **Publish Plan**（发布计划）按钮（如果尚未通知志愿者，则显示 **Publish & Notify**（发布并通知）），点击后即可让分派对志愿者可见。
- **Automatically schedule a replacement when a volunteer declines**（志愿者拒绝时自动安排替补）-- 勾选后，如果某位被分派的志愿者拒绝其岗位，B1 会自动联系服事名单上下一位可用的人，询问其是否可以服事。此过程会依次进行，直到有人接受为止，无需人工跟进即可保持岗位有人。

:::tip
在会员报名页面上，每份计划的空缺岗位会先按类别、再按名称列出。除非你在[设置 > 志愿者报名](../settings/church-settings.md#volunteer-signup)中开启 **Show only the next week of each plan type**（仅显示每种计划类型的下一周），否则会员可以看到所有存在空缺岗位的即将到来的周次。
:::

## 志愿者提醒 {#volunteer-reminders}

B1 可以在志愿者被安排服事的礼拜之前自动提醒他们，让你无需每周逐一催促团队。提醒会发送给**所有已被安排的人**，包括已确认的和尚未回复的。例外情况是通过[确认工作流](./workflows.md#serving-assignment-confirmations)发出的请求：该志愿者只有在接受后才会收到提醒，因为在此之前，工作流会负责跟进。每封提醒邮件都包含志愿者的岗位、礼拜日期、计划备注以及你自定义的消息。

提醒的时间和内容按**计划类型**设置，因此每种礼拜类型都可以有各自的时间表。

1. 在**服事**区中，选择包含该计划类型的事工。
2. 在 **Plan Types**（计划类型）列表中，点击该计划类型旁边的 **Edit**。
3. 展开 **Reminders**（提醒）部分，并开启 **Send reminders for plans of this type**（为此类型的计划发送提醒）。
4. 在 **When should reminders go out?**（何时发送提醒？）下，最多选择三个时间点：**7 days before**（提前 7 天）、**3 days before**（提前 3 天）、**2 days before**（提前 2 天）、**1 day before**（提前 1 天）或 **Day of**（当天）。
5. 设置提醒发送的 **Time of Day**（时间）。
6. 可选择添加 **Message**（消息）。留空则使用默认的提醒文字。
7. 在 **Send By**（发送方式）下，选择 **Push**（推送）、**Email**（电子邮件），以及在你的教会已连接[短信服务商](../settings/church-settings.md#texting)的情况下选择 **Text**（短信）。
8. 点击 **Save Reminders**（保存提醒）。

在你开启之前，某种计划类型的提醒默认是关闭的。

:::tip
尚未确认的志愿者可以直接在提醒邮件中看到 **Accept**（接受）和 **Decline**（拒绝）按钮，无需登录即可回复。
:::

### 短信提醒 {#text-reminders}

只有在你的教会连接了短信服务商后，才会出现 **Text**（短信）选项。短信通过你教会的短信服务商发送，每条短信可能会产生费用。只有在志愿者已在其[通知偏好](../../b1-church/getting-started/notification-preferences.md)中开启 **Text messages**（短信），并且个人资料中有手机号码时，才会收到短信提醒。每条短信都以你教会的名称开头，内容限制为一条短信，并以 "Reply STOP to opt out."（回复 STOP 即可退订。）结尾。回复 STOP 的人将不再收到你教会发来的短信。要让 STOP 回复能够传送到 B1，请将[短信设置](../settings/church-settings.md#texting)中的 **Inbound (STOP) webhook URL**（入站（STOP）Webhook 网址）粘贴到你的服务商的入站消息 Webhook 中。

如需立即向某个日期范围内的所有已排班人员发送短信，请使用[计划总览](./plans-overview.md#texting-everyone-scheduled)中的 **Text Volunteers**（短信通知志愿者）。

:::info
每条提醒只发送一次。短信提醒是在推送和电子邮件之外额外发送的，并非取代它们。
:::

## 将小组与计划类型关联 {#associating-groups-with-a-plan-type}

在计划类型页面的计划列表下方，**Associated Groups**（关联小组）部分可让你决定哪些小组可以通过其成员门户查看该计划类型的计划。这是一种快速的方式，可以将即将到来的礼拜展示给相关团队，而无需授予他们管理员权限。

1. 在计划类型页面上，点击页面顶部的 **Associated Groups**（或向下滚动到该部分）。
2. 点击 **Add Group**（添加小组），并从下拉菜单中选择一个小组。
3. 在 **Shows**（显示）列中，选择该小组的成员在此计划类型中应看到 **Past plans only**（仅过去的计划）、**Upcoming plans only**（仅即将到来的计划），还是 **Past and upcoming plans**（过去和即将到来的计划）。
4. 如需关联更多小组，请重复上述步骤；如需移除某个小组，请点击垃圾桶图标。

:::info
只有标记为 **Standard**（标准）的小组才会出现在选择器中。已关联小组的成员会自动在 B1 会员门户中该小组的页面上看到此计划类型的计划，且仅限于你所选的时间范围。
:::

如果这些计划是 Lessons.church 的课程，已关联小组的成员还会在小组页面上看到 **This week's lesson**（本周课程）卡片（包含底线、经文以及给家长的问题）。请在此关联家长小组，并将筛选条件设为 **Past plans only**，以便包含今天的课程。服事团队通常使用 **Upcoming plans only** 或 **Past and upcoming plans**。

## 打印计划 {#printing-plans}

你可以打印计划，分发给团队。打开计划后，点击页面顶部的 **Print**，即可生成可打印版本，其中包含分派和崇拜程序。打印件顶部会显示你的教会徽标（如果你已上传，则为 [Website > Appearance](../website/appearance.md) 中的 **Light Background Logo**（浅色背景徽标）），其下方是教会名称，以及计划名称，方便区分散落的页面。这对于在排练时发放或张贴在公共区域非常实用。

当计划包含多个礼拜时间时，打印件中每场礼拜都会有一列时间，列标题为其开始时间。若某个项目未包含在某场礼拜中（参见[将项目纳入特定礼拜时间](./service-order.md#including-items-in-specific-service-times)），该场礼拜的列中会显示一个短横线。

打印件会省略任何为空的内容。如果没有分派任何志愿者，则不会显示团队框，崇拜程序将占满整个页面宽度。如果没有任何项目设置时长，则省略 **Length**（时长）列；如果计划既没有礼拜时间也没有时长，则同时省略 **Time**（时间）列。若要去掉带有礼拜日期的黑色 **Service Order**（崇拜程序）标题栏，请取消勾选打印页面顶部的 **Show Service Order heading**（显示崇拜程序标题）；B1 Admin 会记住你在该浏览器上的选择。

:::info
计划按事工组织。在创建或查看计划之前，请确保你位于正确的事工标签页。
:::

## 后续步骤 {#next-steps}

- 使用[计划总览](./plans-overview.md)，在一个网格中查看多周内的所有即将到来的分派，发现未填满的岗位，并直接从网格中为志愿者分派任务
- 将计划结构保存为[计划模板](./plan-templates.md)，以便一键应用到未来的计划中
- 使用诗歌、读经和其他元素，完善你的[崇拜程序](./service-order.md)
- 将你诗歌库中的[诗歌](./songs.md)直接添加到崇拜程序中
- 使用[任务](./tasks.md)为团队成员分配后续跟进事项
- 使用[数字标牌](./digital-signage.md)在大厅电视上显示当前课程内容
