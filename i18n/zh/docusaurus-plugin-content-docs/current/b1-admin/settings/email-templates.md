---
title: "电子邮件模板"
description: "在 B1 Admin 中设置电子邮件和短信模板，包括合并字段、短信选项以及群发预览。"
---

# 电子邮件模板

<div class="article-intro">

电子邮件模板让你保存可重复使用的邮件内容 -- 例如欢迎信、活动提醒、奉献感谢信 -- 这样你（或某个[工作流](../serving/workflows.md)）只需点击一次即可发送，无需每次从头撰写。同一列表还保存了用于小组和个人短信窗口以及工作流 **Send Text**（发送短信）操作的短信模板。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 你需要拥有 **Edit Church Settings**（编辑教会设置）权限（**Email Templates**（电子邮件模板）菜单项只有在拥有该权限时才会显示）。拥有 **Edit Group Members**（编辑小组成员）权限的人员也可以直接访问 **/settings/email-templates** 页面。

</div>

## 进入电子邮件模板 {#accessing-email-templates}

1. 在 B1 Admin 中，打开[跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），并展开 **Settings**（设置）。
2. 点击 **Email Templates**（电子邮件模板）。
3. 你将看到现有模板的列表，包括其 **Name**（名称）、**Subject**（主题）、**Category**（类别）和 **Modified**（修改日期）。

## 创建模板 {#creating-a-template}

1. 点击 **New Template**（新建模板）。
2. 输入 **Template Name**（模板名称）以便在列表中识别，并选择 **Category**（类别）（General（通用）、Events（活动）、Groups（小组）、Giving（奉献）、Welcome（欢迎）或 Text（短信））以帮助整理模板。若要创建短信模板，请选择 **Text**（参见下文的[短信模板](#text-templates)）。
3. 输入 **Subject**（主题）行。
4. 使用富文本编辑器撰写 **Body**（正文）。
5. 点击 **Save**（保存）。

## 合并字段 {#merge-fields}

点击主题或正文上方的合并字段标签，即可将其插入光标所在位置 -- 请先点击文本中你希望插入字段的位置，然后再点击标签。光标会保持在原位，因此你可以在插入的字段之后继续输入。如果你在未先点击正文的情况下点击正文标签，该字段会被添加到正文末尾。发送邮件时，每个合并字段都会被替换为收件人的实际信息：

- `{{firstName}}`、`{{lastName}}`、`{{displayName}}` -- 收件人的姓名
- `{{email}}` -- 收件人的电子邮件地址
- `{{churchName}}` -- 你教会的名称

### 奉献合并字段 {#gift-merge-fields}

这些字段仅在由 **Donation · Created**（奉献 · 已创建）触发器启动的[工作流](../serving/workflows.md#sending-email)发送邮件时才会填入。在其他邮件中，它们将保持为空白。

- `{{amount}}` -- 奉献金额，例如 $50.00
- `{{giftDate}}` -- 奉献日期
- `{{fund}}` -- 奉献所用的一个或多个基金
- `{{receipt}}` -- 奉献摘要：日期和方式、每个基金及其金额的一行，以及总额。可用于在感谢信的同一封邮件中向捐献者发送收据。它仅可用于正文，不可用于主题。

## 短信模板 {#text-templates}

类别为 **Text** 的模板是用于短信而非电子邮件的纯文本消息：

- 它没有主题。富文本编辑器会被替换为一个普通的 **Text Message**（短信内容）输入框，最多可容纳 1,600 个字符。
- 输入框上方的合并字段标签会在光标处插入 `{{firstName}}`、`{{lastName}}`、`{{displayName}}`、`{{churchName}}` 或[奉献合并字段](#gift-merge-fields)。在短信中，`{{receipt}}` 会变成一行内容，例如 *$50.00 to General Fund on Nov 8, 2026*（2026 年 11 月 8 日，General Fund $50.00）。
- 短信模板会显示在[小组](../groups/group-members.md#texting-group-members)或单个人员的短信窗口的 **Load Template (optional)**（加载模板（可选））选择器中。选择模板后会填入消息内容，你在发送前仍可编辑。
- 它们也会显示在工作流 [Send Text](../serving/workflows.md#sending-a-text) 操作的 **Start from a template**（从模板开始）列表中。
- 它们不会出现在电子邮件模板选择器中，包括工作流的 **Send email**（发送电子邮件）操作。

发送短信需要已连接[短信服务商](./church-settings.md#texting)。

## 预览模板 {#previewing-a-template}

在保存或发送之前，点击 **Preview**（预览），即可查看主题和正文在合并字段填入示例数据后的显示效果。

## 使用模板 {#using-a-template}

保存的模板可在向个人或小组撰写电子邮件时选择使用，也可作为[工作流](../serving/workflows.md)中的一个操作使用。在你的教会能够发送这些邮件之前，ChurchApps 团队需要先为其批准一次小组电子邮件功能。参见[为你的教会开启小组电子邮件](../groups/group-members.md#turning-on-group-email-for-your-church)。

## 编辑和删除 {#editing-and-deleting}

点击模板所在行的 **Edit**（编辑）即可更新模板，点击 **Delete**（删除）即可永久移除模板。删除前，B1 会要求你确认。

## 后续步骤 {#next-steps}

- [工作流](../serving/workflows.md) -- 根据规则自动触发模板邮件
