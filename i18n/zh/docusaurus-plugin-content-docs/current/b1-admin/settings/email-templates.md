---
title: "电子邮件模板"
description: "在 B1 Admin 中设置电子邮件和短信模板，包括合并字段、短信选项以及群发预览。"
---

# 电子邮件模板

<div class="article-intro">

电子邮件模板允许你保存可重复使用的邮件内容——例如欢迎信息、活动提醒、奉献感谢信——这样你（或某个[工作流](../serving/workflows.md)）只需点击一次即可发送，而无需每次从头撰写。同一列表中还保存了小组和个人短信窗口使用的短信模板。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 你需要有权访问 B1 Admin 中的设置区域。

</div>

## 访问电子邮件模板

1. 在 B1 Admin 中，打开[快速跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），并展开 **Settings**。
2. 点击 **Email Templates**（电子邮件模板）。
3. 你会看到现有模板的列表，包括其主题、分类和最后修改日期。

## 创建模板

1. 点击 **New Template**（新建模板）。
2. 输入用于在列表中识别的 **Template Name**（模板名称），并选择一个 **Category**（分类）（General（通用）、Events（活动）、Groups（小组）、Giving（奉献）、Welcome（欢迎）或 Text（短信））以便整理模板。选择 **Text** 可改为创建短信模板（见下文[短信模板](#text-templates)）。
3. 输入 **Subject**（主题）。
4. 使用富文本编辑器撰写 **Body**（正文）。
5. 点击 **Save**。

## 合并字段 {#merge-fields}

在主题或正文上方点击合并字段标签，即可将其插入光标处——请先点击你希望放置该字段的文本位置，然后再点击标签。光标会保持在原位，因此你可以紧接着插入的字段继续输入。如果你在未先点击正文的情况下点击正文标签，该字段会被添加到正文末尾。发送邮件时，每个合并字段都会被替换为收件人的实际信息：

- `{{firstName}}`、`{{lastName}}`、`{{displayName}}` —— 收件人的姓名
- `{{email}}` —— 收件人的电子邮件地址
- `{{churchName}}` —— 你教会的名称

## 短信模板 {#text-templates}

分类为 **Text** 的模板是用于短信而非电子邮件的纯文本消息：

- 它没有主题。富文本编辑器会被一个纯文本的 **Text Message**（短信内容）框取代，该框最多可容纳 1,600 个字符。
- 框上方的合并字段标签会在光标处插入 `{{firstName}}`、`{{lastName}}`、`{{displayName}}`、`{{email}}` 或 `{{churchName}}`。
- 短信模板会出现在[小组](../groups/group-members.md#texting-group-members)或单个人员短信窗口的 **Load Template (optional)**（加载模板，可选）选择器中。选择模板后会填入消息内容，你仍可在发送前进行编辑。
- 它们不会出现在电子邮件模板选择器中，包括工作流的 **Send email**（发送电子邮件）操作。

发送短信需要已连接[短信服务商](./church-settings.md#texting)。

## 预览模板

点击 **Preview**（预览），可在保存或发送之前，查看主题和正文在填入示例合并数据后的效果。

## 使用模板

已保存的模板可在向个人或小组撰写电子邮件时选择使用，也可作为[工作流](../serving/workflows.md)中的一项操作。在你的教会能够发送这些模板之前，ChurchApps 团队需要先为其批准一次小组邮件。参见[为教会开启小组邮件](../groups/group-members.md#turning-on-group-email-for-your-church)。

## 编辑和删除

点击模板旁边的**编辑**图标即可更新，点击**删除**图标即可永久删除。

## 下一步

- [工作流](../serving/workflows.md) —— 根据规则自动触发模板邮件
