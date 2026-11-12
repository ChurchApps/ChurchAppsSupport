---
title: "管理提交内容"
description: "在 B1 Admin 中查看、打印和重新分配表单提交内容，将回复归到正确的人员名下，并跟进访客卡和代祷请求。"
---

# 管理提交内容

<div class="article-intro">

表单上线后，提交内容便会陆续到达。**Form Submissions**（表单提交）标签让你可以审阅每一份回复、跟踪谁已提交，并利用这些数据及时跟进会众。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- [创建表单](./creating-forms.md)，并至少添加一个问题
- 通过表单的公开网址分享，或将其嵌入你的[网站](../website/managing-pages.md)

</div>

## 查看提交内容 {#viewing-submissions}

1. 打开[跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（B1 Admin 左上角的搜索栏），展开 **People**，然后点击 **Forms**。
2. 点击你想要查看的表单。
3. 进入 **Form Submissions** 标签。

该标签包含两张卡片：

- **Form Submission Summary**（表单提交摘要）——对于每个多选、复选框和是/否问题，显示选择每个答案的人数统计。
- **Form Submission Results**（表单提交结果）——所有回复的表格，并显示提交数量。每一行显示提交对象（人员表单上为 **Submitted For**（提交对象），独立表单上为 **Submitted By**（提交人），或 **Anonymous**（匿名））以及 **Submission Date**（提交日期），随后是表单中每个问题的一列，顺序与表单一致。如果你的表单问题很多，请左右滚动表格以查看其余列。点击某人的姓名即可打开其记录。

点击任一卡片上的 **Export**（导出），即可将回复下载为 CSV 文件，每份提交占一行。点击 **Print**（打印）图标（打印机）可打印摘要和结果表格，页眉为你的教会名称。

## 查看单份提交内容 {#reviewing-individual-submissions}

若要阅读或打印某个人的回答，请在[人员](../people/adding-people.md#working-with-forms)中打开该人员的记录，然后点击其 **Forms**（表单）板块中的表单。你将看到他们给出的所有回答，每个问题占一行。

点击提交内容旁边的**打印图标**，即可打印该人员填写的回答——适用于纸质存档，或需要留存备查的已签署同意书。打印件顶部居中显示你的教会徽标（如果你已上传，则使用[网站 > 外观](../website/appearance.md)中的 **Light Background Logo**（浅色背景徽标）），其下方为教会名称。即使你在 B1 Admin 中使用深色模式，打印件始终采用白色页面上的深色文字。这与[打印空白表单](./creating-forms.md#printing-a-blank-form)不同；它打印的是某人已提交的回答，而非空白表格。

## 更改提交内容所对应的人员 {#changing-the-person-on-a-submission}

如果某份提交内容关联到了错误的人员——例如，两位家庭成员共用同一个电子邮件地址——你可以将其移至正确的人员，或取消关联。

1. 在 **Form Submissions** 标签上，点击人员姓名旁边的 **Change person**（更改人员）图标（两个箭头）。在[人员资料](../people/adding-people.md#working-with-forms)上，提交内容旁边也会显示同样的图标。
2. 在 **Change person** 对话框中，搜索正确的人员，然后点击 **Move to this person**（移至此人员）。
3. 或者点击 **Unlink (Anonymous)**（取消关联（匿名）），将该提交内容与任何人员分离。之后它将显示为 **Anonymous**。

只有关联关系会改变。回答内容保持不变，也不会重新发送任何跟进电子邮件。

:::info
对于设置为创建人员记录的表单，如果提交时某人已登录教会网站，即使你数据库中另一位人员与其共用电子邮件地址，该提交内容也会关联到其本人的记录。当你[合并两条人员记录](../people/adding-people.md)时，被移除人员的表单提交内容会转移到你保留的那位人员名下。
:::

## 提交内容的收集方式 {#how-submissions-are-collected}

提交内容可以通过多种渠道收集：

- **公开网址**——如果你的表单拥有公开网址（独立表单），任何拥有该链接的人都可以提交回复。可通过电子邮件、社交媒体或短信分享该网址。
- **嵌入你的网站**——嵌入 B1 网站的表单会在访客填写时自动收集提交内容。
- **内部使用**——工作人员可以在 B1 Admin 中从某人的记录为其填写人员表单。参见[使用表单](../people/adding-people.md#working-with-forms)。

:::tip
对于访客卡或代祷请求等表单，请定期查看 **Form Submissions** 标签，以便及时跟进。
:::

## 运用提交数据 {#using-submission-data}

通过表单收集的数据可以帮助你：

- 跟踪活动报名情况，并据此做好安排
- 跟进访客或新会员
- 收集调查反馈，用于事工规划
- 处理活动或项目的付款

:::info
拥有 **Admin** 或 **View Only** 角色的表单成员可以访问 **Form Submissions** 标签。请通过 **Form Members** 标签管理角色，确保团队中合适的人员拥有其所需表单的访问权限。
:::

:::info
如果某个独立表单已[关联到小组](./creating-forms.md#linking-a-form-to-a-group)，该小组的负责人无需是表单成员，即可在 B1.church 的小组页面上阅读和打印其提交内容。负责人也可以在此查看其小组活动报名问题的回答。参见[小组详情](../../b1-church/groups/group-details.md#linked-forms)。
:::

:::tip
如果**独立**表单设置为创建人员记录，那么与现有人员匹配的任何提交内容，也会显示在人员页面的 **Forms** 板块中——而不仅限于人员类型的表单。
:::

## 后续步骤 {#next-steps}

- 在[创建表单](./creating-forms.md)中学习如何构建和自定义表单
- 将表单提交中的人员添加到你的[人员名录](../people/adding-people.md)，以便持续跟进
- [将表单关联到小组](./creating-forms.md#linking-a-form-to-a-group)，使其负责人可以阅读回答；或[自动将提交人加入小组](./creating-forms.md#automatically-adding-submitters-to-a-group)，使独立的报名表自动建立其自己的名单
