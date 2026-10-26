---
title: "添加人员"
---

# 添加人员

<div class="article-intro">

People 板块是 B1 Admin 的基础，它是您教会的会员数据库。其他所有功能（小组、考勤、奉献、表单）都与人员记录相关联。本指南将逐步介绍如何将某人添加到您的数据库、编辑其详细信息，以及将家庭成员关联为家庭单元。

</div>

## 培训视频

<YouTube id="NTL1UDQpx8s" title="Adding People and Households in B1" next="Importing Your People Database in B1" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>开始之前</h4>

- 您需要有效的 B1 Admin 账户，并具备管理人员的权限。如果您不确定自己的访问级别，请参阅 [角色与权限](roles-permissions.md)。
- 如果您要添加的人员超过几个，请考虑使用 [CSV 导入](importing-data.md) 工具。

</div>

## 添加人员

1. 前往 B1.church Admin 仪表板。
2. 打开 [Jump 菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），展开 **People**，然后点击 **People**。
3. 点击页面标题中的 **Add Person** 按钮。页面会向下滚动到目录下方的 **Add New Person** 表单。
4. 填写该人员的 **First Name**（名字）、**Last Name**（姓氏）和 **Email**（电子邮件），然后点击 **Add**。

该人员的个人资料页面会打开，您可以继续添加更多详细信息。

:::tip
如果您正在从其他教会管理系统迁移，可以使用 [导入数据](importing-data.md) 功能，从 CSV 文件导入整个通讯录，这比逐个添加人员快得多。
:::

### 重复项提醒

如果电子邮件地址（或者在使用完整的编辑表单创建人员时，电话号码或匹配的名字 + 姓氏 + 出生日期）与您数据库中已有的某人相匹配，系统会在保存新记录之前显示 **Possible Duplicate**（可能重复）对话框。该对话框会列出每个匹配的人员及其电子邮件、电话和出生日期，方便您进行比较。

- 点击某个匹配项旁边的 **Use Existing**（使用现有记录），即可改用该人员的记录，而不创建新记录。
- 点击 **Create Anyway**（仍然创建），即使发现了可能的匹配项，也依然添加新人员。

此检查仅在您创建全新人员时进行，编辑现有记录时不会触发。它只能防止新增重复记录，不会合并已经存在的两条记录。

## 编辑详细信息

1. 在人员的个人资料页面上，点击左侧联系方式下方的 **Edit** 按钮。
2. 在 **Personal Details**（个人详细信息）表单中，填写其他信息，例如中间名、会员状态（**Visitor**（访客）、**Guest**（来宾）、**Regular Attendee**（常规参加者）、**Member**（会员）、**Staff**（工作人员）、**Inactive**（已停用）或 **Deceased**（已故））、日期、地址、电话号码，以及（针对儿童和学生的）年级和学校。
3. 点击 **Save** 保存个人信息。

个人资料的左侧会显示该人员的照片、姓名、会员状态、联系方式、任何[自定义字段](../settings/custom-fields.md)的值，以及其所属家庭。点击照片即可更换。在 **Edit** 按钮下方还有一些其他操作：**Workflow**（将该人员添加到某个[工作流程](../serving/workflows.md)）、**Merge**（合并）、**Export**（导出）和 **Export Data**（导出数据）。

个人资料的其余部分会为每类相关信息显示一个摘要区域：

- **Attendance**（考勤）：显示该人员最近几周的参加情况以及最近的几次到访记录。点击 **All years** 可查看其完整到访历史，包括校区、礼拜、礼拜时间、小组，以及 **Checked In**（签到时间）列（通过自助签到机记录的签到时间；没有自助签到机记录的到访则显示为一个破折号），或点击 **Print**（打印）进行打印（打印件顶部居中显示您教会的徽标和名称，人员姓名位于其下方）。如需查看全教会的整体趋势而非某个人的历史记录，请参阅 [考勤跟踪](../attendance/tracking-attendance.md)。
- **Donations**（奉献）：显示该人员今年的奉献记录，包括对不可抵税基金的奉献。点击 **All years** 可查看其完整的[奉献历史](../donations/recording-donations.md)，或点击 **Log a gift**（记录一笔奉献）来添加新的奉献记录。如果您的教会开启了[奉献隐私](../settings/church-settings.md#giving-privacy)，金额会保持隐藏，直到您点击 **Show giving**（显示奉献）。
- **Groups**（小组）：列出该人员的[小组成员资格](../groups/group-members.md)。
- **Notes**（笔记）：显示关于该人员的近期笔记（牧养关怀、跟进等）。点击 **All notes**（所有笔记）可阅读和添加笔记。每条笔记都会显示撰写人以及发布的日期和时间。若要一次查看所有人的近期笔记，请使用 [Notes](./notes.md) 页面。
- **Forms**（表单）：列出该人员的表单，以及每份表单是否已提交（参见下方的[处理表单](#working-with-forms)）。

打开其中任一完整视图后，点击顶部带有该人员姓名的 **Back to** 链接，即可返回个人资料页面。

## 向人员发送电子邮件

如果该人员在系统中有电子邮件地址，个人资料左侧的联系方式下方会出现一个 **Email** 按钮。

1. 在该人员的个人资料页面上，点击 **Email**。
2. 随即会打开一个以该人员姓名命名的 **Email** 对话框，其中 **Sending to**（发送至）显示该人员的地址。
3. 可选：从 **Load Template (optional)**（加载模板（可选））中选择一个已保存的模板。
4. 输入 **Subject**（主题）并撰写邮件内容。
5. 点击 **Send Email**（发送邮件）。

如果您希望在自己的邮件程序中撰写邮件，请点击 **Open in my email app**（在我的邮件应用中打开）。

:::info
从 B1 发送邮件与小组邮件使用相同的审批和每日限制。如果您的教会尚未获得批准，对话框会要求您申请审核。在此期间，您仍可点击 **Open in my email app**。请参阅[为您的教会开启小组邮件](../groups/group-members.md#turning-on-group-email-for-your-church)。没有编辑小组成员权限的用户，点击 **Email** 时会直接进入其邮件应用。
:::

## 处理表单

您可以直接在人员的个人资料中填写自定义表单。这些是用户自定义的表单，您可以按照[创建表单](../forms/creating-forms.md)指南进行构建。

1. 在人员的个人资料页面上，找到 **Forms** 部分。它会列出每份表单，以及该表单是否已 **Submitted**（已提交）或 **Not submitted**（未提交）。
2. 点击表单名称即可打开（或点击 **All forms** 查看完整列表）。
3. 点击表单上的**编辑图标**（铅笔），填写详细信息，然后点击 **Save**。

表单提交后，点击其旁边的**打印图标**，即可打印该人员已填写的答案。

如果某份提交被错误地关联到了其他人，请点击其旁边的 **Change person**（更改人员）图标（两个箭头），将其移至其他人员或取消关联。请参阅[更改表单提交的人员](../forms/managing-submissions.md#changing-the-person-on-a-submission)。

:::info
关联到人员个人资料的表单使用 **People** 表单类型。如果您需要独立的表单（例如活动报名表），请参阅表单指南中的[独立表单选项](../forms/creating-forms.md)。
:::

:::tip
如果您只需要为人员跟踪一两项额外信息，例如一个日期、一个数字，或一个是/否答案，请使用[自定义字段](../settings/custom-fields.md)，而不是表单。自定义字段填写更快，并且可以直接在高级搜索中进行搜索。
:::

## 管理家庭 {#managing-households}

家庭功能可将家庭成员关联在一起。这对于[签到](../attendance/check-in.md)特别有用，家长可以一次为所有子女办理签到。

1. 在人员的个人资料页面上，点击左侧 **Household**（家庭）标题旁边的 **Edit**。
2. 家庭编辑器会打开。为当前人员选择**家庭角色**（例如 Head（户主）、Spouse（配偶）、Child（子女）、Other（其他））。
3. 点击 **Add** 图标，添加另一位家庭成员。
4. 在 **Add Household Member**（添加家庭成员）下，于搜索框中输入该人员的姓名，然后按 **Enter** 或点击搜索图标。（在您输入之前，会先显示一个简短的 **Recent people**（最近的人员）列表。）
5. 当该人员出现在搜索结果中时，点击其姓名或其旁边的添加图标。
6. 选择其家庭角色，然后点击 **Save** 完成家庭设置。
