---
title: "添加人员"
description: "在 B1 Admin 中将一个人添加到教会数据库，填写其详细信息，并将家庭成员关联为家庭，以便签到和报告使用。"
---

# 添加人员

<div class="article-intro">

人员板块是 B1 Admin 的基础——它是您的教会会员数据库。其他所有功能（小组、出勤、奉献、表单）都与人员记录相关联。本指南将逐步介绍如何将某人添加到数据库、编辑其详细信息，以及将家庭成员关联为家庭。

</div>

## 培训视频

<YouTube id="GtsczJ8JPio" title="Adding People and Households in B1" next="Importing Your People Database in B1" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>开始之前</h4>

- 您需要拥有管理人员权限的有效 B1 Admin 账户。如果您不确定自己的访问级别，请参见[角色与权限](roles-permissions.md)。
- 如果您要添加的人数超过几个，请考虑改用[CSV 导入](importing-data.md)工具。

</div>

## 添加人员

1. 前往 B1.church Admin 仪表板。
2. 打开[快速跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），展开 **People**，然后点击 **People**。
3. 点击页面标题中的 **Add Person**（添加人员）按钮。页面会向下滚动到通讯录下方的 **Add New Person**（添加新人员）表单。
4. 填写该人员的 **First Name**（名字）和 **Last Name**（姓氏），并可选填 **Title**（称谓，可从 Mr、Mrs、Dr、Pastor 等建议中选择，也可自行输入，最多 10 个字符）、**Email**（电子邮件）和 **Mobile Phone**（手机号码），然后点击 **Add**。

该人员的个人资料页面会打开，您可以继续补充更多详细信息。

:::tip
如果您正从其他教会管理系统迁移，[导入数据](importing-data.md)功能可以让您从 CSV 文件导入整个通讯录——比逐个添加人员快得多。
:::

### 重复提醒

如果电子邮件地址（或在从完整的编辑表单创建人员时，电话号码，或名字 + 姓氏 + 出生日期的组合）与数据库中已有的人员相匹配，系统会在保存新记录之前显示 **Possible Duplicate**（可能的重复）对话框。它会列出每位匹配的人员及其电子邮件、电话和出生日期，方便您进行比较。

- 点击某个匹配项旁边的 **Use Existing**（使用现有记录），即可使用该人员的记录，而不是创建新记录。
- 点击 **Create Anyway**（仍然创建），即使找到了可能的匹配，也添加新人员。

仅在创建全新的人员时才会进行重复检查——编辑现有记录时永远不会触发。它只能防止新增重复记录，不会合并已经存在的两条记录。

## 编辑详细信息 {#editing-details}

1. 在人员的个人资料页面，点击左侧联系方式下方的 **Edit**（编辑）按钮。
2. 在 **Personal Details**（个人详细信息）表单中，填写更多信息，例如 **Title**（称谓，可从 Mr、Mrs、Miss、Ms、Dr、Prof、Rev 或 Pastor 中选择，也可自行输入，最多 10 个字符）、中间名、会籍状态（**Visitor**（访客）、**Guest**（来宾）、**Regular Attendee**（常规参加者）、**Member**（会员）、**Staff**（员工）、**Inactive**（不活跃）或 **Deceased**（已故））、日期、地址、电话号码，以及（针对儿童和学生）年级和学校。
3. 点击 **Save** 保存个人信息。

个人资料的左侧会显示该人员的照片、姓名、会籍状态、联系方式、任何[自定义字段](../settings/custom-fields.md)的值，以及其所属家庭。在家庭下方，**Added**（添加日期）会显示记录的创建日期（仅适用于 2026 年 10 月下旬之后添加的人员）。点击照片即可更换。在 **Edit** 按钮下方还有一些其他操作：**Workflow**（工作流，将该人员添加到某个[工作流](../serving/workflows.md)）、**Merge**（合并）、**Export**（导出）和 **Export Data**（导出数据）。

个人资料的其余部分按类别显示相关信息的摘要：

- **Attendance**（出勤）——显示该人员最近几周的出勤情况及其最近几次到访。点击 **All years**（所有年份）可查看其完整到访记录，包括校区、礼拜、礼拜时间、小组，以及显示自助机签到时间的 **Checked In**（签到时间）列（没有自助机签到的到访记录显示为破折号）。也可以点击 **Print**（打印）进行打印（打印件顶部居中显示教会徽标和名称，人员姓名位于其下方）。若要查看全教会的趋势而非个人记录，请参见[追踪出勤](../attendance/tracking-attendance.md)。
- **Donations**（奉献）——显示本年度的奉献，包括捐给不可抵税基金的奉献。点击 **All years** 可查看其完整的[奉献历史](../donations/recording-donations.md)，或点击 **Log a gift**（登记奉献）记录一笔新的奉献。如果您的教会开启了[奉献隐私](../settings/church-settings.md#giving-privacy)，金额将保持隐藏，直到您点击 **Show giving**（显示奉献）。
- **Groups**（小组）——列出该人员的[小组成员资格](../groups/group-members.md)，并在已记录的情况下显示 **Joined**（加入）及其加入每个小组的日期。
- **Notes**（备注）——显示关于该人员的最近备注（牧养关怀、跟进等）。点击 **All notes** 可阅读和添加备注。每条备注都会显示撰写人以及发布的日期和时间。若要设置备注格式，请在备注框中选中文字，然后从小弹出菜单中选择 **Bold**（粗体）、**Italic**（斜体）、**Bulleted list**（项目符号列表）或 **Numbered list**（编号列表）（或按 **Ctrl+B** / **Ctrl+I**，Mac 上为 **Cmd**）；备注发布后会显示格式。删除备注前会要求您先确认，因为删除后无法撤销。若要一次查看所有人的最近备注，请使用[备注](./notes.md)页面。
- **Forms**（表单）——列出该人员的表单，以及每个表单是否已提交（见下文[使用表单](#working-with-forms)）
- **Requests & registrations**（申请与报名）——列出该人员的房间和资源[活动申请](../calendars/approvals.md)（包括所申请的房间或资源，以及 **Pending**（待处理）、**Approved**（已批准）或 **Rejected**（已拒绝）状态），以及其[活动报名](../calendars/paid-registrations.md)（包括其报名的人数，以及 **Registered**（已报名）、**Pending**（待处理）、**Waitlisted**（候补）或 **Cancelled**（已取消）状态），按最新排序。仅显示最近五条；点击 **All requests**（全部申请）可查看完整列表。如果您可以使用[审批](../calendars/approvals.md)页面，就能看到活动申请；如果您可以查看报名，就能看到报名记录。两者都没有权限时，此部分会被隐藏。

打开这些完整视图中的任何一个后，点击页面顶部带有该人员姓名的 **Back to** 链接，即可返回个人资料。

## 给某人发送电子邮件

如果该人员在档案中有电子邮件地址，个人资料左侧的联系方式下方会出现 **Email** 按钮。

1. 在该人员的个人资料页面，点击 **Email**。
2. 一个以该人员姓名为标题的 **Email** 对话框会打开，并在 **Sending to**（发送至）处显示该人员的地址。
3. 可选择从 **Load Template (optional)** 中加载已保存的模板。
4. 输入**主题**并撰写消息。
5. 点击 **Send Email**。

若要改用您自己的邮件程序撰写邮件，请点击 **Open in my email app**（在我的邮件应用中打开）。

:::info
从 B1 发送邮件与小组邮件使用相同的审批和每日上限。如果您的教会尚未获得批准，对话框会要求您申请审核——在此期间，您仍可以点击 **Open in my email app**。请参见[为教会开启小组邮件](../groups/group-members.md#turning-on-group-email-for-your-church)。没有编辑小组成员权限的用户在点击 **Email** 时会直接进入其邮件应用。
:::

## 使用表单 {#working-with-forms}

您可以直接从人员的个人资料页面填写自定义表单。这些是用户自定义的表单，您可以按照[创建表单](../forms/creating-forms.md)指南来构建。

1. 在人员的个人资料页面，找到 **Forms** 部分。它会列出每个表单，并显示其是否已 **Submitted**（已提交）或 **Not submitted**（未提交）。
2. 点击表单名称即可打开（或点击 **All forms** 查看完整列表）。
3. 点击表单上的**编辑图标**（铅笔），填写详细信息，然后点击 **Save**。

表单提交后，点击其旁边的**打印图标**，即可打印该人员填写的答案。当某人只提交过一次某表单时，该表单会在答案上方显示 **Submitted** 及日期。

如果某份提交被错误地关联到了其他人，请点击其旁边的 **Change person**（更改人员）图标（两个箭头），将其转移给其他人或取消关联。参见[更改提交内容所属人员](../forms/managing-submissions.md#changing-the-person-on-a-submission)。

:::info
关联到人员个人资料的表单使用 **People** 表单类型。如果您需要独立表单（例如活动报名），请参见表单指南中的 [Stand Alone 表单选项](../forms/creating-forms.md)。
:::

:::tip
如果您只需要为人员记录一两项额外信息——例如日期、数字或是/否的答案——请使用[自定义字段](../settings/custom-fields.md)，而不是表单。自定义字段填写更快，并且可以在高级搜索中直接搜索。
:::

## 管理家庭 {#managing-households}

家庭功能让您可以将家庭成员关联在一起。这对于[签到](../attendance/check-in.md)特别有用，因为家长可以一次为所有子女办理签到。

1. 在某人的个人资料页面，点击左侧 **Household**（家庭）标题旁边的 **Edit**。
2. 家庭编辑器会打开。为当前人员选择**家庭角色**（例如 Head（户主）、Spouse（配偶）、Child（子女）或 Other（其他））。
3. 点击 **Add** 图标，添加另一位家庭成员。
4. 在 **Add Household Member**（添加家庭成员）下，在搜索框中输入该人员的姓名，然后按 **Enter** 或点击搜索图标。（在您输入之前，会显示一个简短的**最近人员**列表——即您在任何人员搜索中最近选择过的人员，然后是 B1 中最新添加的人员。）
5. 当该人员出现在结果中时，点击其姓名或其旁边的添加图标。
6. 选择其家庭角色，然后点击 **Save** 完成家庭设置。

如果该人员还不在 B1 中，请点击搜索下方的 **Add New Person**（添加新人员）。除姓名、称谓、电子邮件和手机号码外，对话框还会要求填写其**家庭角色**（Head、Spouse、Child 或 Other）。新人员会被创建，并以该角色加入此家庭；点击 **Save** 即可完成。
