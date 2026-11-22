---
title: "新增人员"
description: "在 B1 Admin 中将人员新增到教会资料库、填写其详细信息，并将家庭成员连结为住户，以用于报到与报表。"
---

# 新增人员

<div class="article-intro">

人员区域是 B1 Admin 的基础——它就是你教会的会员资料库。其他所有功能（小组、出席、奉献、表单）都会与人员记录相连。本指南将带你把某人加入资料库、编辑其详细信息，并将家庭成员连结为住户。

</div>

## 培训视频 {#training-video}

<YouTube id="GtsczJ8JPio" title="在 B1 中新增人员与住户" next="在 B1 中导入你的人员资料库" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>开始之前</h4>

- 你需要一个有效的 B1 Admin 账户，并具有管理人员的权限。如果你不确定自己的访问级别，请参阅[角色与权限](roles-permissions.md)。
- 如果你要新增的人员超过少数几位，请考虑改用 [CSV 导入](importing-data.md)工具。

</div>

## 新增人员 {#adding-a-person}

1. 前往 B1.church Admin 仪表板。
2. 打开[快速菜单](../introduction.md#getting-around-with-the-jump-menu)（位于左上角的搜索栏），展开**People**，然后点击**People**。
3. 点击页面标题中的 **Add Person** 按钮。页面会向下滚动到通讯录下方的 **Add a New Person** 表单。
4. 填写该人员的 **First Name** 与 **Last Name**（两者皆为必填）。也可以选择性地填写 **Title**、**Email** 和 **Mobile Phone**，然后点击 **Add**（或按下 **Enter**）。

B1 会为该人员建立一个新的住户，并以其姓氏命名。

随后会打开该人员的个人资料页面，你可以在此继续补充更多详细信息。

:::tip
如果你是从其他教会管理系统转移过来，可以使用[导入资料](importing-data.md)功能，从 CSV 文件导入整个通讯录——这比逐一新增人员快得多。
:::

### 重复资料警告 {#duplicate-warnings}

在 **Add a New Person** 表单中输入电子邮件地址时，B1 会在储存之前检查是否有重复资料。如果该电子邮件地址（或在完整的编辑表单中建立人员时，其电话号码，或名字 + 姓氏 + 出生日期的组合）与资料库中已有的人员相符，则会在储存新记录之前显示 **Possible Duplicate** 对话框。对话框会列出每位相符的人员及其电子邮件、电话和出生日期，方便你进行比对。

- 点击相符人员旁边的 **Use Existing**，即可使用该人员的记录，而不建立新记录。
- 点击 **Create Anyway**，即可在找到可能相符的人员时仍然新增该人员。

只有在建立全新人员时才会进行重复检查——编辑既有记录时永远不会触发。此功能只能防止新增重复的资料，并不会合并两笔已经存在的记录。

## 编辑详细信息 {#editing-details}

1. 在人员的个人资料页面，点击左侧 **Household** 区块下方的 **Edit** 按钮。
2. 在 **Personal Details** 表单中，填写更多信息，例如 **Title**（可从列表中选择 Mr、Mrs、Miss、Ms、Dr、Prof、Rev 或 Pastor，或输入你自己的称谓，最多 10 个字符）、中间名、昵称、**Name Tag Notes**（会印在报到名牌上，并在个人资料中以警示标签显示）、**Donor Number**、会员状态（**Visitor**、**Guest**、**Regular Attendee**、**Member**、**Staff**、**Inactive** 或 **Deceased**）、性别、婚姻状况、出生日期与结婚纪念日、校区、地址、含分机号码的电话，以及（适用于儿童与学生）年级与学校。勾选 **Hide me from the member directory**，即可让该人员不出现在[印制的通讯录](./print-directory.md)以及应用程序的会员通讯录中。任何[自定义栏位](../settings/custom-fields.md)都会显示在 **Custom Fields** 之下。
3. 点击 **Save** 以储存个人信息，或点击 **Cancel** 关闭表单而不储存。

如果你更改与他人同住一个住户的人员的地址，B1 会询问是否要将新地址套用到整个住户。表单中还有 **Delete** 按钮（用于删除该人员），以及 **Data Management** 区块，可用于汇出或匿名化该人员的资料（参见[资料安全](../settings/data-security.md#using-the-data-management-tools)）。

个人资料的左侧会显示该人员的照片、姓名、年龄、性别、婚姻状况、校区、会员状态、联络信息、任何[自定义栏位](../settings/custom-fields.md)的值，以及其住户。姓名下方的标签会显示该人员是否**Has login**（拥有 B1 账户）、是否**Hidden from directory**（已从通讯录中隐藏），或是否有名牌备注。住户上方的 **Added** 会显示建立该记录的日期（仅适用于 2026 年 10 月下旬之后新增的人员）。点击照片即可更换。住户下方是 **Edit**、**Email** 与 **Text** 按钮（见下文），以及其他几项操作：**Workflow**（将该人员加入[工作流程](../serving/workflows.md)）、**Merge**、**Export** 和 **Export Data**。如果该人员属于某个住户，则会显示 **Pickup** 区块，列出在[报到](../attendance/checkin-safety.md#trusted-and-not-authorized-pickup-people)时获准接回儿童的人员。

个人资料的其余部分，会为每一类相关信息显示摘要区块：

- **Attendance**——显示该人员在最近数周中出席了哪些礼拜，以及其最近的几次到访。点击 **All years** 可查看完整的到访记录，包括校区、礼拜、礼拜时间、小组，以及一个 **Checked In** 栏位（会显示报到机的报到时间；如果到访记录并非通过报到机登记，则以破折号表示）；或点击 **Print** 进行打印（打印件顶端中央会显示你的教会标志与名称，位于该人员姓名的上方）。若要查看全教会的趋势，而非单一人员的历史记录，请参阅[统计出席](../attendance/tracking-attendance.md)。
- **Donations**——显示今年的奉献，包括对不可抵税基金的奉献。点击 **All years** 可查看完整的[奉献历史](../donations/recording-donations.md)，或点击 **Log a gift** 记录新的奉献。如果你的教会开启了[奉献隐私](../settings/church-settings.md#giving-privacy)，金额会保持隐藏，直到你点击 **Show giving**。
- **Groups**——列出该人员的[小组成员资格](../groups/group-members.md)；如果档案中有记录，还会显示 **Joined** 以及每个小组的加入日期。
- **Notes**——显示关于该人员的最近备注（牧养关怀、后续跟进等）。点击 **All notes** 即可阅读与新增备注。每则备注都会显示撰写者，以及发布的日期和时间。若要为备注设置格式，请在备注框中选取文字，然后从小型弹出菜单中选择 **Bold**、**Italic**、**Bulleted list** 或 **Numbered list**（或按下 **Ctrl+B** / **Ctrl+I**，Mac 上则为 **Cmd**）；发布后，备注会显示格式。删除备注前会要求你先确认，因为无法复原。若要一次查看所有人的最近备注，请使用[备注](./notes.md)页面。
- **Forms**——列出该人员的表单，以及每份表单是否已提交（见下方的[处理表单](#working-with-forms)）。
- **Requests & registrations**——列出该人员的房间与资源[活动申请](../calendars/approvals.md)（包括所申请的房间或资源，以及 **Pending**、**Approved** 或 **Rejected** 状态），以及其[活动报名](../calendars/paid-registrations.md)（包括其报名的人数，以及 **Registered**、**Pending**、**Waitlisted** 或 **Cancelled** 状态），依最新排序。会显示最近的五笔；点击 **All requests** 可查看完整列表。如果你可以使用[审批](../calendars/approvals.md)页面，就能看到活动申请；如果你可以查看报名，就能看到报名记录；两者皆无权限时，此区块会被隐藏。

当你打开其中一个完整的检视页面时，请点击顶端显示该人员姓名的 **Back to** 链接，即可返回个人资料。

## 发送电子邮件给人员 {#emailing-a-person}

如果该人员的档案中有电子邮件地址，个人资料左侧住户下方、**Edit** 旁边会出现 **Email** 按钮。

1. 在该人员的个人资料中，点击 **Email**。
2. 随即会打开以该人员姓名为标题的 **Email** 对话框，其中 **Sending to** 会显示该人员的地址。
3. 也可以选择性地从 **Load Template (optional)** 中选择一个已保存的范本。
4. 输入 **Subject** 并撰写讯息。
5. 点击 **Send Email**。

若要改用你自己的电子邮件程序撰写讯息，请点击 **Open in my email app**。

:::info
从 B1 发送邮件，与小组电子邮件使用相同的审批与每日限制。如果你的教会尚未获得批准，对话框会要求你申请审查——在此期间，你仍可点击 **Open in my email app**。请参阅[为你的教会开启小组电子邮件](../groups/group-members.md#turning-on-group-email-for-your-church)。没有编辑小组成员权限的用户，点击 **Email** 后会直接进入其电子邮件程序。
:::

## 发送短信给人员 {#texting-a-person}

如果你的教会已连接[短信服务商](../settings/church-settings.md#texting)、你拥有发送短信的权限，且该人员有手机号码，则 **Email** 旁边会出现 **Text** 按钮。点击它，输入你的 **Message**，然后点击 **Send**。对话框会显示短信将发送到的号码。短信的运作方式请参阅[向小组成员发送短信](../groups/group-members.md#texting-group-members)。

### 短信提醒 {#text-reminders}

只有已开启短信功能的人员才会收到任务、活动和服事提醒短信。若你的教会已连接相同的短信服务商、你拥有相应权限，且该人员有手机号码，则其记录会在手机号码下方显示 **Text reminders**（短信提醒），并标示 **On** 或 **Off**。点击 **Turn on** 即可开始发送提醒短信，或点击 **Turn off** 停止。此开关与该人员自己的[通知偏好设置](../../b1-church/getting-started/notification-preferences.md)中的 **Text messages** 为同一设置，因此你和该人员皆可更改。曾回复 STOP 退订你教会短信的人员，即使开启了 **Text reminders**，仍不会收到提醒短信。

## 处理表单 {#working-with-forms}

你可以直接从人员的个人资料中填写自定义表单。这些是用户自定义的表单，你可以依照[建立表单](../forms/creating-forms.md)指南自行建立。

1. 在该人员的个人资料中，找到 **Forms** 区块。它会列出每份表单，以及该表单是 **Submitted**（已提交）还是 **Not submitted**（未提交）。
2. 点击表单的名称即可打开（或点击 **All forms** 查看完整列表）。
3. 点击表单上的**编辑图标**（铅笔），填写详细信息，然后点击 **Save**。

表单提交之后，点击其旁边的**打印图标**，即可打印该人员填写的答案。若该人员只提交过一次某份表单，该表单会在答案上方显示 **Submitted** 及日期。

如果某份提交被误归到其他人名下，请点击其旁边的 **Change person** 图标（两个箭头），将其移给他人或取消连结。请参阅[更改提交的人员](../forms/managing-submissions.md#changing-the-person-on-a-submission)。

:::info
连结到人员个人资料的表单使用 **People** 表单类型。如果你需要独立的表单（例如活动报名），请参阅表单指南中的[独立表单选项](../forms/creating-forms.md)。
:::

:::tip
如果你只需要记录人员的一两项额外信息——例如日期、数字或是否的答案——请改用[自定义栏位](../settings/custom-fields.md)，而非表单。自定义栏位填写较快，并且可以直接在进阶搜索中搜索。
:::

## 管理住户 {#managing-households}

住户功能让你可以将家庭成员连结在一起。这对于[报到](../attendance/check-in.md)特别有用，家长可以一次为所有子女办理报到。

1. 在人员的个人资料中，点击左侧 **Household** 标题旁边的 **Edit**。
2. 住户编辑器会打开。为当前人员选择**住户角色**（例如 Head、Spouse、Child、Other）。
3. 点击**新增**图标，以加入另一位住户成员。
4. 在 **Add Household Member** 下，于搜索框中输入该人员的姓名，然后按下 **Enter** 或点击搜索图标。（在你输入之前，会显示一份简短的**最近的人员**清单——即你在任何人员搜索中最近选择过的人员，然后是 B1 中最新的人员。）
5. 当该人员出现在结果中时，点击其姓名或旁边的新增图标。
6. 选择其住户角色，然后点击 **Save**，完成住户设置。

如果该人员尚未存在于 B1 中，请改为点击搜索下方的 **Add New Person**。除了姓名、称谓、电子邮件和手机号码之外，对话框还会要求填写其**Household Role**（Head、Spouse、Child 或 Other）。系统会建立该新人员，并以该角色将其放入此住户；点击 **Save** 即可完成。
