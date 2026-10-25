---
title: "创建表单"
---

# 创建表单

<div class="article-intro">

创建自定义表单，用于收集会众的信息。您可以创建活动报名、调查问卷、访客卡、入会申请等各类表单。表单可以关联到数据库中的人员，也可以作为独立页面，拥有自己的公开网址。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 对于**人员（People）**表单（关联人员档案），您需要先在数据库中[添加人员](../people/adding-people.md)。
- 对于需要收取**付款**的表单，您必须先[配置 Stripe 以开通在线奉献](../donations/online-giving-setup.md)。

</div>

## 创建新表单

1. 打开[快速跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（B1 Admin 左上角的搜索栏），展开 **People**，然后点击 **Forms**。
2. 点击 **Add Form**。
3. 为您的表单输入**名称**。
4. 从下拉菜单中选择表单类型：
   - **People** —— 将提交内容与您数据库中的[人员档案](../people/adding-people.md)关联。
   - **Stand Alone** —— 创建一个独立表单，拥有自己的公开网址，适合外部报名。
5. 点击 **Save** 创建表单。

新表单会出现在列表中。点击它即可开始添加问题。

## 打印空白表单 {#printing-a-blank-form}

需要纸质版表单用于分发吗？例如放在迎宾台的访客卡，或者供没有网络的人手写填写的表单？在表单主列表中点击表单旁边的 **Print**，打开预览，然后点击 **Print**。空白字段会打印出下划线或复选框，方便人们手写填写；必填问题会标注星号。页面顶部会显示您的教会标志（如果您已上传，则使用 [Website > Appearance](../website/appearance.md) 中的 **Light Background Logo**），下方是教会名称，然后是表单名称。没有其他打印选项——只能打印整张表单。

## 添加问题 {#adding-questions}

1. 打开您的表单，进入 **Questions** 标签页。
2. 点击 **Add Question**。
3. 从 Provider 下拉菜单中选择**字段类型**。可用类型包括：
   - **Textbox** —— 用于简短的文字回答
   - **Date** —— 用于日期选择
   - **Email** —— 用于电子邮件地址
   - **Phone Number** —— 用于电话号码输入
   - **Multiple Choice** —— 用于从预设选项中选择
   - **Payment** —— 用于收取付款
4. 为问题输入**标题**，并可选填**描述**。描述会显示在人们填写表单时的问题下方，因此可用于提示信息，例如“请填写需要我们注意的任何过敏情况”。
5. 如果该字段为必填项，请勾选 **Require an answer**。
6. 点击 **Save**。
7. 重复以上步骤，添加更多问题。

:::warning
**Payment** 字段类型需要配置 Stripe。如果您尚未设置在线奉献，请在添加付款字段之前参阅[在线奉献设置](../donations/online-giving-setup.md)。
:::

## 管理表单成员

1. 打开您的表单，进入 **Form Members** 标签页。
2. 搜索人员，并为其分配角色：
   - **Admin** —— 可以编辑表单并查看所有提交内容。
   - **View Only** —— 可以查看提交内容，但不能编辑表单。

## 自动将提交者添加到小组 {#automatically-adding-submitters-to-a-group}

启用 **Create a person record from submissions** 后，您还可以将表单关联到某个小组，使每位提交者都自动加入该小组的名单：

1. 打开您表单的 **Details**，并开启 **Create a person record from submissions**。
2. 在 **Add submitters to a group** 下，选择要将提交者加入的小组，或保留为 **None**。
3. 点击 **Save**。

每当有人提交表单时，匹配到的或新创建的人员都会被加入该小组（已是小组成员的人员会被跳过）。这对于营会报名表等场景很有用，例如报名表可以自动生成营会的小组名单。

### 发送跟进邮件 {#sending-a-follow-up-email}

开启 **Create a person record from submissions** 后，您还可以向每位提交表单的人发送电子邮件。在表单的详情中填写 **Follow-up Email Subject** 和 **Follow-up Email Body**。两者中都可以使用 `{firstName}` 和 `{churchName}` 占位符。只有当两个字段都填写完整时，才会发送邮件。

:::info
只有在您的教会获准发送小组邮件后，跟进邮件才会发出，并且它们会计入教会的每日邮件发送上限。请参阅[为教会开启小组邮件](../groups/group-members.md#turning-on-group-email-for-your-church)。
:::

## 复制表单

如需以现有表单为基础创建新表单，请在表单列表中点击表单旁边的 **Duplicate** 并确认。B1 会创建一份完全相同的表单副本（包括所有问题），您可以随后对其重命名并独立编辑。

:::tip
复制功能非常适合每年报名问题基本不变的定期活动。复制去年的表单，更新名称和日期，即可直接使用。
:::

## 配置表单属性

您可以随时更新表单的名称和设置。对于 Stand Alone 表单，您还会看到一个唯一的**公开网址**，可与任何人分享；同时还有一个**描述**字段，其文字会显示在公开表单页面的问题上方，便于人们在开始填写前了解表单用途。

使用 **Thank You Message** 字段可设置人们提交表单后看到的内容，包括表单公开网址页面上的内容。如果留空，他们会看到“Thank you for submitting the form!”（感谢您提交表单！）。

:::tip
Stand Alone 表单非常适合活动报名。您可以通过电子邮件、社交媒体分享公开网址，也可以直接将表单嵌入教会网站。
:::

:::info
要在您的 B1 网站上嵌入表单，请进入网站编辑器，添加新的板块，然后选择 **Form** 元素，再选择您要显示的表单。有关编辑网站的详情，请参阅[管理页面](../website/managing-pages.md)。
:::
