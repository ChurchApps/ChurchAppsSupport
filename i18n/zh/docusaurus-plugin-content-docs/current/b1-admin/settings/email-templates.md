---
title: "邮件模板"
description: "在 B1 Admin 中设置电子邮件和短信模板，包括合并字段、短信选项和用于群发沟通的预览。"
---

# 邮件模板

<div class="article-intro">

邮件模板让您保存可重复使用的邮件内容——欢迎信、活动提醒、奉献感谢信——这样您（或[工作流](../serving/workflows.md)）只需点击一次即可发送，无需每次从头撰写。同一列表还保存了用于小组和个人短信窗口以及工作流 **Send Text**（发送短信）操作的短信模板。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 您需要有权访问 B1 Admin 中的设置区域。

</div>

## 访问邮件模板

1. 在 B1 Admin 中，打开[快速跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），并展开 **Settings**。
2. 点击 **Email Templates**。
3. 您会看到现有模板的列表，包括其主题、类别和最后修改日期。

## 创建模板

1. 点击 **New Template**（新模板）。
2. 输入用于在列表中识别它的 **Template Name**（模板名称），并选择 **Category**（类别）（General（通用）、Events（活动）、Groups（小组）、Giving（奉献）、Welcome（欢迎）或 Text（短信）），以便整理模板。如果要改为创建短信模板，请选择 **Text**（参见下文[短信模板](#text-templates)）。
3. 输入**主题**。
4. 使用富文本编辑器撰写**正文**。
5. 点击 **Save**。

## 合并字段 {#merge-fields}

点击主题或正文上方的合并字段标签，即可将其插入光标处——请先点击文本中您想要放置字段的位置，然后再点击标签。光标会保持在原处，因此您可以在插入的字段后继续输入。如果您在未先点击正文的情况下点击正文标签，该字段会被添加到正文末尾。发送邮件时，每个合并字段都会被替换为收件人的实际信息：

- `{{firstName}}`、`{{lastName}}`、`{{displayName}}`——收件人的姓名
- `{{email}}`——收件人的电子邮件地址
- `{{churchName}}`——您教会的名称

### 奉献合并字段 {#gift-merge-fields}

这些字段仅在由 **Donation · Created**（奉献 · 已创建）触发器启动的[工作流](../serving/workflows.md#sending-email)发送邮件时才会填充。在任何其他邮件中，它们都会留空。

- `{{amount}}`——奉献金额，例如 $50.00
- `{{giftDate}}`——奉献日期
- `{{fund}}`——奉献所属的一个或多个基金
- `{{receipt}}`——奉献摘要：日期和方式、每个基金及其金额的一行，以及总额。可用于在感谢邮件中同时向捐赠人发送收据。它仅提供给正文，不提供给主题。

## 短信模板 {#text-templates}

类别为 **Text** 的模板是用于发送短信（而非电子邮件）的纯文本消息：

- 它没有主题。富文本编辑器会被替换为一个普通的 **Text Message**（短信内容）框，最多可容纳 1,600 个字符。
- 输入框上方的合并字段标签会在光标处插入 `{{firstName}}`、`{{lastName}}`、`{{displayName}}`、`{{churchName}}`，或[奉献合并字段](#gift-merge-fields)。在短信中，`{{receipt}}` 会变成一行文字，例如 *$50.00 to General Fund on Nov 8, 2026*（2026 年 11 月 8 日，$50.00 捐给通用基金）。
- 短信模板会出现在[小组](../groups/group-members.md#texting-group-members)或单个人员的短信窗口中的 **Load Template (optional)**（加载模板，可选）选择器中。选择一个模板会填入消息内容，您仍可在发送前进行编辑。
- 它们也会出现在工作流 [Send Text](../serving/workflows.md#sending-a-text) 操作的 **Start from a template**（从模板开始）列表中。
- 它们不会出现在邮件模板选择器中，包括工作流的 **Send email**（发送邮件）操作。

使用短信功能需要连接[短信服务提供商](./church-settings.md#texting)。

## 预览模板

点击 **Preview**（预览），即可在保存或发送之前，查看主题和正文在填入示例数据后的呈现效果。

## 使用模板

已保存的模板可以在向个人或小组撰写邮件时选择使用，也可以作为[工作流](../serving/workflows.md)中的一个操作使用。在您的教会可以发送这些模板之前，ChurchApps 团队需要对其进行一次小组邮件审批。参见[为教会开启小组邮件](../groups/group-members.md#turning-on-group-email-for-your-church)。

## 编辑和删除

点击模板旁边的**编辑**图标即可更新，点击**删除**图标即可永久移除。

## 后续步骤

- [工作流](../serving/workflows.md)——根据规则自动触发模板邮件
