---
title: "创建表单"
description: "在 B1 Admin 中为活动报名、问卷和访客卡创建自定义表单，然后通过链接、二维码或打印进行分享。"
---

# 创建表单

<div class="article-intro">

创建自定义表单，收集会众的信息。您可以为活动报名、问卷调查、访客卡、入会申请等创建表单。表单可以关联到数据库中的人员，也可以作为独立页面使用，拥有各自的公开网址。

</div>

## 培训视频

<YouTube id="UZ4dGCNIFw4" title="Creating Forms and Managing Submissions in B1" next="Launching Your Church Website in B1" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>开始之前</h4>

- 对于**人员**表单（关联到人员记录），您需要先在数据库中[添加人员](../people/adding-people.md)。
- 对于需要收取**付款**的表单，您必须先[为在线奉献配置 Stripe](../donations/online-giving-setup.md)。

</div>

## 创建新表单

1. 打开[快速跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（B1 Admin 左上角的搜索栏），展开 **People**，然后点击 **Forms**。
2. 点击 **Add Form**。
3. 输入表单的**名称**。
4. 在 **Associate With**（关联对象）下拉菜单中选择表单类型：
   - **People**（人员）——将提交内容关联到数据库中的[人员记录](../people/adding-people.md)。人员表单是从某个人员的记录中填写的，因此不会生成可分享的链接。
   - **Stand Alone**（独立）——创建一个拥有独立公开网址的表单，适用于外部报名等场景。只有独立表单才提供[页眉照片](#adding-a-header-photo)、[二维码](#sharing-a-form-with-a-qr-code)、[关联小组](#linking-a-form-to-a-group)以及**从提交内容创建人员记录**（Create a person record from submissions）选项。
5. 点击 **Save** 创建表单。

新表单会出现在列表中。点击它即可开始添加问题。

## 打印空白表单 {#printing-a-blank-form}

需要纸质表单发给他人吗？例如欢迎台的访客卡，或者没有网络的人需要手写填写的表单？在主表单列表中点击表单旁边的 **Print**，打开预览，然后点击 **Print**。空白字段会为每个问题打印下划线或复选框，方便手写填写；必填问题会标注星号。页面顶部会显示教会徽标（如果您已在[网站 > 外观](../website/appearance.md)中上传了**浅色背景徽标**），徽标下方是教会名称，再下方是表单名称。打印没有其他选项——只能打印整个表单。

## 通过二维码分享表单 {#sharing-a-form-with-a-qr-code}

独立表单在主表单列表中旁边有一个 **QR Code**（二维码）链接（已归档的表单没有此链接）。点击它即可打开该表单公开网址的二维码，并在下方显示链接。点击 **Download PNG** 可将二维码保存为图片，用于印在主日周报上或在幻灯片中展示。扫描二维码的人会在手机上打开该表单。

## 添加问题 {#adding-questions}

1. 打开您的表单，前往 **Questions**（问题）标签页。
2. 点击 **Add Question**（添加问题）。
3. 从 Provider 下拉菜单中选择**字段类型**。可用类型包括：
   - **Textbox**（文本框）——用于简短的文字回答
   - **Date**（日期）——用于选择日期
   - **Email**（电子邮件）——用于电子邮件地址
   - **Phone Number**（电话号码）——用于输入电话
   - **Multiple Choice**（多项选择）——用于从预设选项中选择
   - **Payment**（付款）——用于收取付款
4. 输入问题的**标题**，并可选填写**描述**。描述会在人们填写表单时显示在问题下方，因此可用于提示，例如“请填写需要我们注意的任何过敏信息”。
5. 如果该字段是必填项，请勾选 **Require an answer**（必须回答）。
6. 点击 **Save**。
7. 重复以上步骤添加更多问题。

:::warning
**Payment**（付款）字段类型需要先配置 Stripe。如果您尚未设置在线奉献，请在添加付款字段之前参阅[在线奉献设置](../donations/online-giving-setup.md)。未登录就在表单上付款的人，必须先勾选 **I'm not a robot**（我不是机器人）验证，银行卡才会被接受。
:::

## 管理表单成员 {#managing-form-members}

1. 打开您的表单，前往 **Form Members**（表单成员）标签页。
2. 搜索某人，并为其添加角色：
   - **Admin**（管理员）——可以编辑表单并查看所有提交内容。
   - **View Only**（仅查看）——可以查看提交内容，但不能编辑表单。

## 将表单关联到小组 {#linking-a-form-to-a-group}

您可以将任何独立表单关联到某个小组——例如为小组设置的代祷请求表，或为青年旅行设置的医疗同意书：

1. 打开表单的 **Details**（详情）。
2. 在 **Linked group**（关联小组）下，选择小组，或保持为 **None**（无）。
3. 点击 **Save**。

表单关联后：

- **小组成员**在表单开放期间，会在 B1.church 上该小组页面的 **Forms**（表单）部分看到此表单，并带有可打开表单的 **Fill out**（填写）按钮（参见[小组详情](../../b1-church/groups/group-details.md#linked-forms)）。
- **小组负责人**还可以看到已关闭的表单，并能阅读每份提交内容的回答，也可以打印它们（单份提交或 **Print all**（全部打印））。负责人只能查看回答——除非同时也是[表单成员](#managing-form-members)，否则无法编辑表单。
- **在 B1 Admin 中**，小组页面会显示 **Linked forms**（关联表单）部分，列出每个关联表单及其 **Open**（开放）或 **Closed**（关闭）状态。该部分对小组负责人以及有权管理表单的人员可见。参见[小组成员](../groups/group-members.md#linked-forms)。

当表单超出其可用时间范围时，表单即为关闭状态。已归档的表单不会显示在小组页面上。

### 自动将提交人加入小组 {#automatically-adding-submitters-to-a-group}

仅关联小组并不会自动把任何人加入小组。若要将每位提交人加入关联小组的名单，还需在表单详情中打开**从提交内容创建人员记录**（Create a person record from submissions），然后点击 **Save**。

每当有人提交表单时，匹配到的人员或新创建的人员都会被加入该小组（已是小组成员的人会被跳过）。这对于营会报名表之类的场景很有用，它可以自动为营会建立名单小组。

### 发送跟进邮件 {#sending-a-follow-up-email}

打开**从提交内容创建人员记录**后，您还可以向每位提交表单的人发送邮件。在表单详情中填写 **Follow-up Email Subject**（跟进邮件主题）和 **Follow-up Email Body**（跟进邮件正文）。两处都可以使用 `{firstName}` 和 `{churchName}` 标记。只有两个字段都填写时才会发送邮件。

:::info
跟进邮件只有在教会获准发送小组邮件之后才会发出，并且会计入教会的每日邮件上限。参见[为教会开启小组邮件](../groups/group-members.md#turning-on-group-email-for-your-church)。
:::

## 复制表单

要以某个表单为起点创建新表单，请在表单列表中点击表单旁的 **Duplicate**（复制），然后确认。B1 会创建一份完全相同的表单副本（包括所有问题），之后您可以独立地重命名和编辑它。

:::tip
复制功能适合每年报名问题基本不变的定期活动。复制去年的表单，更新名称和日期，就可以直接使用了。
:::

## 配置表单属性

您可以随时更新表单的名称和设置。对于独立表单，您还会看到一个可与任何人分享的唯一**公开网址**，以及一个**Description**（描述）字段——描述文字会显示在公开表单页面的问题上方，用于在人们开始填写之前说明表单的用途。

### 添加页眉照片 {#adding-a-header-photo}

独立表单可以在表单顶部显示**页眉照片**（Header Photo）。在表单详情中，点击照片框或 **Add Photo**，然后选择或上传图片（图片会被裁剪为 16:9 比例）。点击 **Save**。照片会显示在表单名称下方、描述上方，出现在表单的公开网址页面上，以及通过网站 **Form** 元素嵌入表单的任何位置。使用 **Change Photo** 可替换照片，使用 **Remove** 可将其删除。

使用 **Thank You Message**（感谢信息）字段设置人们提交表单后看到的内容，包括表单公开网址页面上的内容。如果留空，他们会看到“Thank you for submitting the form!”（感谢您提交表单！）。

:::tip
独立表单非常适合活动报名。可以通过电子邮件、社交媒体分享公开网址，也可以直接将表单嵌入教会网站。
:::

:::info
要在 B1 网站上嵌入表单，请前往网站编辑器，添加新的板块，然后选择 **Form** 元素。接着选择要显示的表单。有关编辑网站的详细信息，请参见[管理页面](../website/managing-pages.md)。
:::
