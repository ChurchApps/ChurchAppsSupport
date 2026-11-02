---
title: "添加人员"
---

# 添加人员

<div class="article-intro">

人员板块是 B1 Admin 的基础——它是教会的会员数据库。其他所有功能（小组、出勤、奉献、表单）都与人员记录相关联。本指南将带你完成在数据库中添加某人、编辑其详细信息，以及将家庭成员关联为家庭的操作。

</div>

## 培训视频

<YouTube id="NTL1UDQpx8s" title="Adding People and Households in B1" next="Importing Your People Database in B1" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>开始之前</h4>

- 你需要拥有一个可以管理人员的 B1 Admin 账号。如果你不确定自己的访问级别，请参阅[角色与权限](roles-permissions.md)。
- 如果你要添加的人数超过少数几个，请考虑改用 [CSV 导入](importing-data.md)工具。

</div>

## 添加人员

1. 进入 B1.church 管理仪表板。
2. 打开[快速跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），展开 **People**，然后点击 **People**。
3. 点击页面标题中的 **Add Person** 按钮。页面会向下滚动到通讯录下方的 **Add New Person** 表单。
4. 填写人员的 **First Name**（名字）、**Last Name**（姓氏）和 **Email**（电子邮件），然后点击 **Add**。

该人员的资料页会随即打开，方便你继续补充更多详细信息。

:::tip
如果你是从其他教会管理系统迁移，[导入数据](importing-data.md)功能可以让你从 CSV 文件中导入整个通讯录——比逐个添加人员快得多。
:::

### 重复提醒

如果电子邮件地址（或在完整的编辑表单中创建人员时，电话号码，或名字 + 姓氏 + 出生日期完全相同）与数据库中已有的人员匹配，则在保存新记录之前会弹出 **Possible Duplicate**（可能重复）对话框。该对话框会列出每位匹配的人员及其电子邮件、电话和出生日期，方便你进行比对。

- 点击匹配项旁边的 **Use Existing**（使用现有记录），即可使用该人员的记录，而不创建新记录。
- 点击 **Create Anyway**（仍然创建），即使发现可能的匹配，也仍添加新人员。

只有在创建全新人员时才会检查重复——编辑现有记录永远不会触发此检查。它只能防止新增重复记录，并不会合并已经存在的两条记录。

## 编辑详细信息 {#editing-details}

1. 在人员的资料页面，点击左侧联系方式下方的 **Edit** 按钮。
2. 在 **Personal Details**（个人详细信息）表单中，填写更多信息，例如 **Title**（称谓，可从列表中选择 Mr、Mrs、Miss、Ms、Dr、Prof、Rev 或 Pastor，也可以输入自定义称谓，最多 10 个字符）、中间名、会籍状态（**Visitor**（访客）、**Guest**（来宾）、**Regular Attendee**（常规参加者）、**Member**（会员）、**Staff**（工作人员）、**Inactive**（不活跃）或 **Deceased**（已故））、日期、地址、电话号码，以及（针对儿童和学生）年级和学校。
3. 点击 **Save** 保存个人信息。

资料页左侧会显示该人员的照片、姓名、会籍状态、联系方式、任何[自定义字段](../settings/custom-fields.md)的值，以及其所在家庭。在家庭下方，**Added**（添加时间）会显示记录的创建日期（仅适用于 2026 年 10 月下旬之后添加的人员）。点击照片即可更换。在 **Edit** 按钮下方还有一些其他操作：**Workflow**（将该人员加入[工作流](../serving/workflows.md)）、**Merge**（合并）、**Export**（导出）和 **Export Data**（导出数据）。

资料页的其余部分为每类相关信息显示一个摘要区域：

- **Attendance**（出勤）—— 显示该人员在最近几周中参加了哪些礼拜，以及最近的到访记录。点击 **All years** 可查看其完整的到访历史，包括校区、礼拜、礼拜时间、小组，以及显示自助签到时间的 **Checked In** 列（没有自助签到记录的到访则显示为短横线），或点击 **Print**（打印）进行打印（打印件顶部居中显示你的教会标志和名称，位于该人员的姓名上方）。若要查看全教会的趋势而非某个人的历史，请参阅[追踪出勤](../attendance/tracking-attendance.md)。
- **Donations**（奉献）—— 显示今年的奉献，包括捐给不可抵税基金的奉献。点击 **All years** 查看其完整的[奉献历史](../donations/recording-donations.md)，或点击 **Log a gift**（记录一笔奉献）记录新的奉献。如果你的教会开启了[奉献隐私](../settings/church-settings.md#giving-privacy)，金额会保持隐藏，直到你点击 **Show giving**（显示奉献）。
- **Groups**（小组）—— 列出该人员的[小组成员资格](../groups/group-members.md)，并在有记录时显示 **Joined**（加入）及其加入每个小组的日期。
- **Notes**（备注）—— 显示关于该人员的近期备注（牧养关怀、后续跟进等）。点击 **All notes** 阅读和添加备注。每条备注都会显示撰写人以及发布的日期和时间。若要一次查看所有人的近期备注，请使用[备注](./notes.md)页面。
- **Forms**（表单）—— 列出该人员的表单，以及每份表单是否已提交（见下文[使用表单](#working-with-forms)）

打开这些完整视图之一后，点击页面顶部带有该人员姓名的**返回**链接，即可回到资料页。

## 向某人发送电子邮件

如果该人员在档案中登记了电子邮件地址，资料页左侧的联系方式下方会出现 **Email**（电子邮件）按钮。

1. 在人员的资料页上，点击 **Email**。
2. 会打开一个以该人员姓名为标题的 **Email** 对话框，其中 **Sending to**（发送至）会显示该人员的地址。
3. 可选择从 **Load Template (optional)**（加载模板，可选）中选择一个已保存的模板。
4. 输入 **Subject**（主题）并撰写消息。
5. 点击 **Send Email**（发送电子邮件）。

如果你想改用自己的邮件程序撰写消息，请点击 **Open in my email app**（在我的邮件应用中打开）。

:::info
从 B1 发送邮件与小组邮件使用相同的审批和每日限额。如果你的教会尚未获得批准，对话框会要求你请求审核——在此期间，你仍可以点击 **Open in my email app**。参见[为教会开启小组邮件](../groups/group-members.md#turning-on-group-email-for-your-church)。没有编辑小组成员权限的用户点击 **Email** 时，会直接打开其邮件应用。
:::

## 使用表单 {#working-with-forms}

你可以直接从人员的资料页填写自定义表单。这些是用户自定义的表单，你可以按照[创建表单](../forms/creating-forms.md)指南来建立。

1. 在人员的资料页上，找到 **Forms**（表单）部分。它会列出每份表单，并显示是否已 **Submitted**（已提交）或 **Not submitted**（未提交）。
2. 点击表单名称将其打开（或点击 **All forms** 查看完整列表）。
3. 点击表单上的**编辑图标**（铅笔），填写详细信息，然后点击 **Save**。

表单提交后，点击其旁边的**打印图标**，即可打印该人员填写的答案。当某人只提交过一次某份表单时，表单会在答案上方显示 **Submitted** 以及提交日期。

如果某份提交被误归到了错误的人员名下，请点击该提交旁边的 **Change person**（更改人员）图标（两个箭头），将其移至其他人员名下或取消关联。参见[更改提交内容所属的人员](../forms/managing-submissions.md#changing-the-person-on-a-submission)。

:::info
关联到人员资料的表单使用 **People**（人员）表单类型。如果你需要独立表单（例如活动报名），请参阅表单指南中的 [Stand Alone（独立）表单选项](../forms/creating-forms.md)。
:::

:::tip
如果你只需要为人员记录一两项额外信息——例如一个日期、一个数字或一个是/否答案——请使用[自定义字段](../settings/custom-fields.md)而不是表单。它们填写更快，并且可以直接在高级搜索中进行搜索。
:::

## 管理家庭 {#managing-households}

家庭功能可以将家庭成员关联在一起。这对于[签到](../attendance/check-in.md)尤其有用，家长可以一次为所有孩子签到。

1. 在某人的资料页上，点击左侧 **Household**（家庭）标题旁边的 **Edit**。
2. 家庭编辑器会打开。为当前人员选择**家庭角色**（例如 Head（户主）、Spouse（配偶）、Child（子女）、Other（其他））。
3. 点击 **Add** 图标，添加另一位家庭成员。
4. 在 **Add Household Member**（添加家庭成员）下，在搜索框中输入该人员的姓名，然后按 **Enter** 或点击搜索图标。（在输入之前，会显示一个简短的**最近人员**列表。）
5. 当该人员出现在搜索结果中时，点击其姓名或其旁边的添加图标。
6. 选择其家庭角色，然后点击 **Save** 完成家庭设置。
