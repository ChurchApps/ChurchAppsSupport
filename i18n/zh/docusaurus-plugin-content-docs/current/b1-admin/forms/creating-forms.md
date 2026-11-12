---
title: "创建表单"
description: "在 B1 Admin 中为活动报名、问卷和访客卡创建自定义表单，然后通过链接、二维码或打印的方式进行分享。"
---

# 创建表单

<div class="article-intro">

创建自定义表单，收集会众的信息。你可以为活动报名、问卷调查、访客卡、入会申请等创建表单。表单可以关联到数据库中的人员，也可以作为独立页面使用，并拥有自己的公开网址。

</div>

## 培训视频 {#training-video}

<YouTube id="UZ4dGCNIFw4" title="在 B1 中创建表单和管理提交内容" next="在 B1 中上线你的教会网站" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>开始之前</h4>

- 对于**人员**表单（关联到人员记录），你需要先在数据库中[添加人员](../people/adding-people.md)。
- 对于需要收取**付款**的表单，你必须先[为在线奉献配置 Stripe](../donations/online-giving-setup.md)。

</div>

## 创建新表单 {#creating-a-new-form}

1. 打开[跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（B1 Admin 左上角的搜索栏），展开 **People**，然后点击 **Forms**。
2. 点击 **Add Form**。
3. 为表单输入 **name**（名称）。
4. 在 **Associate With**（关联类型）下拉菜单中选择表单类型：
   - **People**（人员）——将提交内容关联到数据库中的[人员记录](../people/adding-people.md)。人员表单从人员的记录中填写，因此不会生成可分享的链接。
   - **Stand Alone**（独立）——创建一个拥有独立公开网址的表单，非常适合外部报名。只有独立表单才提供[页眉照片](#adding-a-header-photo)、[二维码](#sharing-a-form-with-a-qr-code)、[关联小组](#linking-a-form-to-a-group)以及**根据提交内容创建人员记录**选项。
5. 对于独立表单，你可以立即或稍后填写其[属性](#configuring-form-properties)的其余部分。
6. 点击 **Save** 创建表单。

新表单会出现在列表中。点击它即可开始添加问题。

## 打印空白表单 {#printing-a-blank-form}

需要纸质版表单发放吗？例如在迎宾台提供的访客卡，或供没有网络的人手写填写的表单？请点击主表单列表中某个表单旁边的 **Print**，打开预览，然后点击 **Print**。空白字段会为每个问题打印下划线或复选框，方便人员手写填写；必填问题会标记星号。页面顶部会显示你的教会徽标（如果你已上传，则使用[网站 > 外观](../website/appearance.md)中的 **Light Background Logo**（浅色背景徽标）），其下方为教会名称，然后是表单名称。没有其他打印选项——只能打印整个表单。

## 使用二维码分享表单 {#sharing-a-form-with-a-qr-code}

独立表单在主表单列表中旁边有一个 **QR Code**（二维码）链接（已归档的表单没有此链接）。点击它即可打开表单公开网址的二维码，并在其下方显示链接。点击 **Download PNG**（下载 PNG）即可将二维码保存为图片，用于印在主日周报上或在幻灯片中展示。任何扫描该二维码的人都会在手机上打开该表单。

## 添加问题 {#adding-questions}

1. 打开你的表单，并进入 **Questions**（问题）标签。
2. 点击 **Add Question**（添加问题）。
3. 选择 **Field Type**（字段类型）：
   - **Textbox**（文本框）——用于简短的文字回答
   - **Whole Number**（整数）和 **Decimal**（小数）——用于数字
   - **Date**（日期）——用于选择日期
   - **Yes/No**（是/否）——用于是或否的回答
   - **Email**（电子邮件）——用于电子邮件地址
   - **Phone Number**（电话号码）——用于输入电话
   - **Text Area**（多行文本）——用于较长的回答
   - **Multiple Choice**（单选）——用于从多个选项中选择一个
   - **Checkbox**（复选框）——用于勾选任意数量的选项
   - **Payment**（付款）——用于收取款项
4. 为问题输入 **Title**（标题），并可选择填写 **Description**（说明）。说明会在人员填写表单时显示在问题下方，因此可用于提供提示，例如"请写明我们需要知道的任何过敏信息。"
5. 为你所选的类型填写额外字段：
   - 对于文本、数字、日期、电子邮件和电话问题，可选择填写 **Placeholder**（占位文字），它会在空白框中显示示例文字。
   - 对于 **Multiple Choice** 和 **Checkbox**，请在 **Choices**（选项）下添加每个选项：输入 **Value**（值，即保存的内容）和 **Text**（文本，即人员看到的内容），然后点击添加按钮。点击删除图标可移除选项。
   - 对于 **Payment**，请选择款项所属的 **Fund**（基金）和 **Amount**（金额）。
6. 如果该字段为必填，请勾选 **Require an answer for this question**（此问题必须回答）。（付款问题没有此选项。）
7. 点击 **Save**。
8. 重复以上步骤添加更多问题。

**Questions** 标签会列出每个问题及其类型，以及是否为必填项。点击问题标题即可编辑，或在问题表单中点击 **Delete** 并确认即可删除。使用每行的 **Move up**（上移）和 **Move down**（下移）箭头可更改问题的显示顺序。

:::warning
**Payment**（付款）字段类型需要配置 Stripe。如果你尚未设置在线奉献，请先参阅[在线奉献设置](../donations/online-giving-setup.md)，再添加付款字段。未登录便在表单上付款的人员，必须先勾选 **I'm not a robot**（我不是机器人）验证，才能接受银行卡付款。
:::

## 管理表单成员 {#managing-form-members}

独立表单设有 **Form Members**（表单成员）标签，用于仅授予特定人员访问该表单的权限。

1. 打开你的表单，并进入 **Form Members** 标签。
2. 在 **Add Person**（添加人员）中搜索某人，并点击其姓名旁边的添加图标。新成员默认为 **View Only**（仅查看）。
3. 在 **Permission**（权限）列中，点击你想要的角色：
   - **Admin**（管理员）——可以编辑表单并查看所有提交内容。
   - **View Only**（仅查看）——可以查看提交内容，但不能编辑表单。
4. 对于每次表单被提交时都应收到电子邮件的人员，请开启 **Email Notification**（电子邮件通知）。

若要将某人移出表单成员，请点击其所在行的 **Remove**（移除）并确认。

## 将表单关联到小组 {#linking-a-form-to-a-group}

你可以将任何独立表单关联到一个小组——例如为小组设置的代祷请求表，或为青少年旅行设置的医疗同意书：

1. 打开表单，然后点击 **Edit Form**（编辑表单）（或点击表单列表中该表单旁边的 **Edit**）。
2. 在 **Linked group**（关联小组）下，选择小组，或保持为 **None**（无）。
3. 点击 **Save**。

表单关联后：

- **小组成员**在表单开放期间，可以在 B1.church 上该小组页面的 **Forms**（表单）板块中看到此表单，并通过 **Fill out**（填写）按钮打开它（参见[小组详情](../../b1-church/groups/group-details.md#linked-forms)）。
- **小组负责人**还可以看到已关闭的表单，并可以阅读每份提交内容的回答，也可以打印（单份提交或 **Print all**（全部打印））。负责人只能查看回答——除非他们同时也是[表单成员](#managing-form-members)，否则无法编辑表单。
- **在 B1 Admin 中**，小组页面会显示 **Linked forms**（关联表单）板块，列出每个关联表单及其 **Open**（开放）或 **Closed**（已关闭）状态。该板块对小组负责人以及可以管理表单的人员显示。参见[小组成员](../groups/group-members.md#linked-forms)。

当表单超出其开放时间范围时，即为关闭状态。已归档的表单不会显示在小组页面上。

### 自动将提交人加入小组 {#automatically-adding-submitters-to-a-group}

仅将表单关联到小组，并不会自动将任何人加入小组。若要将每位提交人都添加到关联小组的名单中，请同时在表单设置中勾选 **Create a person record from submissions**（根据提交内容创建人员记录），然后点击 **Save**。

每次有人提交表单时，匹配到的或新创建的人员都会被加入该小组（已是小组成员的人员将被跳过）。这对于营会报名表等场景很有用，它可以自动建立营会的名单小组。

### 发送跟进电子邮件 {#sending-a-follow-up-email}

勾选 **Create a person record from submissions** 后，你还可以向每位提交表单的人发送电子邮件。在表单设置中填写 **Follow-up Email Subject**（跟进电子邮件主题）和 **Follow-up Email Body**（跟进电子邮件正文）。两者中均可使用 `{firstName}` 和 `{churchName}` 占位符。只有两个字段都填写时，才会发送电子邮件。

:::info
跟进电子邮件只有在你的教会获准发送小组电子邮件后才会发出，并且会计入教会的每日电子邮件上限。参见[为教会开启小组电子邮件](../groups/group-members.md#turning-on-group-email-for-your-church)。
:::

## 复制表单 {#duplicating-a-form}

若要以现有表单为起点创建新表单，请在表单列表中点击该表单旁边的 **Duplicate**（复制）并确认。随即会出现 **Form duplicated**（表单已复制）提示，B1 会创建该表单的完整副本（包括所有问题），之后你可以独立地重命名和编辑它。

:::tip
复制功能适用于每年报名问题基本不变的定期活动。复制去年的表单，更新名称和日期，即可开始使用。
:::

## 配置表单属性 {#configuring-form-properties}

你可以随时更新表单的名称和设置：打开表单并点击页面左侧的 **Edit Form**，或点击表单列表中该表单旁边的 **Edit**。表单页面的左侧会显示表单类型（**People** 或 **Stand Alone**），对于独立表单，还会显示其是 **Public**（公开）还是 **Restricted**（受限），以及可与任何人分享的唯一**公开网址**。

**Edit Form** 设置包括：

- **Form Name**（表单名称）——在 B1 Admin 中以及表单顶部显示的名称。
- **Description**（说明）*（独立表单）*——显示在公开表单页面问题上方的文字，可在人员开始填写之前告知表单的用途。
- **Header Photo**（页眉照片）*（独立表单）*——参见[添加页眉照片](#adding-a-header-photo)。
- **Form Access**（表单访问权限）*（独立表单）*——**Public**（公开）允许任何拥有链接的人填写表单；**Restricted**（受限）则要求人员先登录教会网站，才能打开表单。
- **Set Form Availability Timeframe**（设置表单开放时间范围）*（独立表单）*——选择 **Yes**（是），并设置 **Availability Start Date**（开放开始日期）和 **Availability End Date**（开放结束日期），即可仅在这些日期之间接受提交。在此之外，表单将处于关闭状态。
- **Thank You Message**（感谢信息）——人员提交后看到的内容（见下文）。
- **Display Mode**（显示模式）——**Standard**（标准）在一页中显示所有问题；**Conversational (one question at a time)**（对话式，每次一个问题）则逐一显示问题。
- **Create a person record from submissions**（根据提交内容创建人员记录）*（独立表单）*、**Linked group**（关联小组）以及跟进电子邮件字段——参见[将表单关联到小组](#linking-a-form-to-a-group)和[发送跟进电子邮件](#sending-a-follow-up-email)。

点击 **Save** 保存更改。若要永久删除表单，请在表单设置中点击 **Delete** 并确认；若只想保留表单但从列表中隐藏，则应改为[归档](./index.md#what-you-can-do)该表单。

### 添加页眉照片 {#adding-a-header-photo}

独立表单可以在表单顶部显示**页眉照片**。在表单详情中，点击照片框或 **Add Photo**（添加照片），然后选择或上传图片（图片会被裁剪为 16:9 比例）。点击 **Save**。照片会显示在表单名称下方、说明上方，出现在表单的公开网址页面上，以及通过网站**表单**组件嵌入表单的任何位置。使用 **Change Photo**（更改照片）可替换照片，或使用 **Remove**（移除）将其删除。

使用 **Thank You Message**（感谢信息）字段，可设置人员提交表单后看到的内容，包括表单公开网址页面上的内容。如果留空，他们将看到"感谢您提交表单！"

:::tip
独立表单非常适合用于活动报名。通过电子邮件、社交媒体分享其公开网址，或将表单直接嵌入你的教会网站。
:::

:::info
若要将表单嵌入你的 B1 网站，请进入网站编辑器，添加一个新板块，并选择**表单**组件。然后选择你要显示的表单。有关编辑网站的详情，请参见[管理页面](../website/managing-pages.md)。
:::
