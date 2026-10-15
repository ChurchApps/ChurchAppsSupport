---
title: "添加人员"
---

# 添加人员

<div class="article-intro">

“人员”板块是 B1 Admin 的基础——它是您教会的会众数据库。所有其他功能（小组、考勤、奉献、表单）都与人员档案相关联。本指南将引导您将某人添加到数据库、编辑其详细信息，以及将家庭成员关联为同一户。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 您需要一个拥有人员管理权限的 B1 Admin 账户。如果您不确定自己的访问权限级别，请参阅[角色与权限](roles-permissions.md)。
- 如果您要添加的人数超过几个，请考虑使用 [CSV 导入](importing-data.md)工具。

</div>

## 添加人员

1. 进入 B1.church Admin 仪表板。
2. 打开[快速跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），展开 **People**，然后点击 **People**。
3. 点击页面标题中的 **Add Person** 按钮。页面会向下滚动到名录下方的 **Add New Person** 表单。
4. 填写该人员的 **First Name**、**Last Name** 和 **Email**，然后点击 **Add**。

该人员的档案页面会随即打开，您可以继续添加更多详细信息。

:::tip
如果您是从其他教会管理系统迁移，可以使用[导入数据](importing-data.md)功能，从 CSV 文件导入整个名录，这比逐个添加人员快得多。
:::

### 重复提醒

如果电子邮件地址（或者在使用完整的编辑表单创建人员时，电话号码，或者姓名加出生日期完全一致）与数据库中已有的人员匹配，那么在保存新记录之前会弹出**可能重复**对话框。对话框会列出每位匹配人员及其电子邮件、电话和出生日期，以便您进行比对。

- 点击某个匹配项旁边的 **Use Existing**，即可使用该人员的现有档案，而不创建新记录。
- 点击 **Create Anyway**，即可在发现可能匹配项的情况下仍然添加新人员。

此检查仅在您创建全新人员时进行——编辑现有记录时永远不会触发。它只能防止新的重复记录，不会合并已存在的两条记录。

## 编辑详细信息

1. 在人员的档案页面上，点击左侧联系方式下方的 **Edit** 按钮。
2. 在 **Personal Details** 表单中填写更多信息，例如中间名、会籍状态（**Visitor**、**Guest**、**Regular Attendee**、**Member**、**Staff**、**Inactive** 或 **Deceased**）、日期、地址、电话号码，以及（针对儿童和学生）年级和学校。
3. 点击 **Save** 保存个人信息。

档案左侧显示该人员的照片、姓名、会籍状态、联系方式、任何[自定义字段](../settings/custom-fields.md)的值以及其所在家庭。点击照片即可更换。在 **Edit** 按钮下方还有一些其他操作：**Workflow**（将该人员添加到[工作流](../serving/workflows.md)）、**Merge**、**Export** 和 **Export Data**。

档案的其余部分为每类相关信息提供了摘要区域：

- **Attendance** —— 显示该人员最近几周的出席情况及其最近的到访记录。点击 **All years** 可查看其完整的到访历史，包括校区、礼拜、礼拜时间、小组，以及显示自助签到机签到时间的 **Checked In** 列（未通过签到机记录的到访显示为短横线），也可以点击 **Print** 打印。若要查看全教会的整体趋势而非某个人的历史，请参阅[考勤追踪](../attendance/tracking-attendance.md)。
- **Donations** —— 显示今年的奉献记录，包括捐给不可免税基金的奉献。点击 **All years** 可查看其完整的[奉献历史](../donations/recording-donations.md)，或点击 **Log a gift** 记录一笔新奉献。如果您的教会开启了[奉献隐私](../settings/church-settings.md#giving-privacy)，金额将保持隐藏，直到您点击 **Show giving**。
- **Groups** —— 列出该人员的[小组成员身份](../groups/group-members.md)
- **Notes** —— 显示关于该人员的近期备注（牧养关怀、跟进事项等）。点击 **All notes** 可阅读并添加备注
- **Forms** —— 列出该人员的表单及其是否已提交（见下文[使用表单](#working-with-forms)）

打开其中任一完整视图后，点击页面顶部带有该人员姓名的 **Back to** 链接，即可返回档案页面。

## 给人员发送邮件

如果该人员的档案中有电子邮件地址，档案左侧的联系方式下方会出现 **Email** 按钮。

1. 在人员的档案页面上，点击 **Email**。
2. 随即打开以该人员姓名为标题的 **Email** 对话框，其中 **Sending to** 处显示该人员的地址。
3. 可选：从 **Load Template (optional)** 中选择已保存的模板。
4. 输入 **Subject** 并撰写邮件内容。
5. 点击 **Send Email**。

如果您想改用自己的邮件程序撰写邮件，请点击 **Open in my email app**。

:::info
从 B1 发送邮件与小组邮件使用相同的审批和每日上限。如果您的教会尚未获得批准，对话框会要求您申请审核——在此期间您仍可点击 **Open in my email app**。请参阅[为教会开启小组邮件](../groups/group-members.md#turning-on-group-email-for-your-church)。没有编辑小组成员权限的用户点击 **Email** 时，会直接打开其邮件应用。
:::

## 使用表单

您可以直接从人员的档案中填写自定义表单。这些是用户自定义的表单，您可以按照[创建表单](../forms/creating-forms.md)指南进行创建。

1. 在人员的档案页面上，找到 **Forms** 部分。它会列出每个表单，并显示其是否已 **Submitted**（已提交）或 **Not submitted**（未提交）。
2. 点击表单名称即可打开（或点击 **All forms** 查看完整列表）。
3. 点击表单上的**编辑图标**（铅笔），填写详细信息，然后点击 **Save**。

表单提交后，点击其旁边的**打印图标**即可打印该人员填写的答案。

如果提交内容被错误地关联到了其他人，请点击其旁边的 **Change person** 图标（两个箭头），将其移给其他人或取消关联。请参阅[更改提交内容的关联人员](../forms/managing-submissions.md#changing-the-person-on-a-submission)。

:::info
关联到人员档案的表单使用 **People** 表单类型。如果您需要独立表单（例如活动报名），请参阅表单指南中的 [Stand Alone 表单选项](../forms/creating-forms.md)。
:::

:::tip
如果您只需要记录人员的一两项额外信息——例如一个日期、一个数字或一个是/否的答案——请使用[自定义字段](../settings/custom-fields.md)代替表单。自定义字段填写更快，并且可以直接在高级搜索中搜索。
:::

## 管理家庭

家庭功能可以将家庭成员关联在一起。这对于[签到](../attendance/check-in.md)特别有用，家长可以一次为所有子女办理签到。

1. 在人员的档案页面上，点击左侧 **Household** 标题旁的 **Edit**。
2. 家庭编辑器会打开。为当前人员选择**家庭角色**（例如 Head、Spouse、Child、Other）。
3. 点击**添加**图标，以添加另一位家庭成员。
4. 在 **Add Household Member** 下，在搜索框中输入该人员的姓名，然后按 **Enter** 或点击搜索图标。（在您输入之前，会显示一个简短的 **Recent people**（最近的人员）列表。）
5. 当该人员出现在搜索结果中时，点击其姓名或其旁边的添加图标。
6. 选择其家庭角色，然后点击 **Save** 完成家庭设置。
