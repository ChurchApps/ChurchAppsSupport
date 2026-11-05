---
title: "创建表单"
---

# 创建表单

<div class="article-intro">

创建自定义表单，用于收集会众的信息。你可以创建活动报名表、调查问卷、访客卡、会籍申请表等。表单可以关联到数据库中的人员，也可以作为独立页面使用，并拥有自己的公开网址。

</div>

## 培训视频

<YouTube id="sr9wxEj9ghQ" title="Creating Forms and Managing Submissions in B1" next="Launching Your Church Website in B1" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>开始之前</h4>

- 对于 **People** 表单（与人员记录相关联），你需要先在数据库中[添加人员](../people/adding-people.md)。
- 对于需要收取**付款**的表单，你必须先[配置在线捐赠的 Stripe](../donations/online-giving-setup.md)。

</div>

## 创建新表单

1. 打开[快速跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（B1 Admin 左上角的搜索栏），展开 **People**，然后点击 **Forms**。
2. 点击 **Add Form**。
3. 输入表单的**名称**。
4. 从 **Associate With** 下拉菜单中选择表单类型：
   - **People**——将提交内容与数据库中的[人员记录](../people/adding-people.md)关联。人员表单需从某人的记录中填写，因此不会生成可分享的链接。
   - **Stand Alone**（独立）——创建一个拥有独立公开网址的表单，适用于外部报名等场景。只有独立表单才提供[页眉照片](#adding-a-header-photo)、[二维码](#sharing-a-form-with-a-qr-code)、[关联小组](#linking-a-form-to-a-group)以及**Create a person record from submissions**（根据提交内容创建人员记录）选项。
5. 点击 **Save** 创建表单。

新表单会出现在列表中。点击该表单即可开始添加问题。

## 打印空白表单 {#printing-a-blank-form}

需要纸质版表单供人发放吗？例如迎宾台的访客卡，或供没有网络的人手写填写的表单。在表单主列表中，点击表单旁边的 **Print** 打开预览，然后点击 **Print**。空白字段会以下划线或复选框的形式打印，方便人们手写填写；必填问题会标有星号。页面顶部会显示你的教会标志（如果你已上传，则为来自[网站 > 外观](../website/appearance.md)的 **Light Background Logo**），标志下方是教会名称，然后是表单名称。没有其他打印选项，只能打印整个表单。

## 通过二维码分享表单 {#sharing-a-form-with-a-qr-code}

独立表单在主表单列表中的旁边都有一个 **QR Code** 链接（已归档的表单没有此链接）。点击它即可打开该表单公开网址的二维码，下方显示链接。点击 **Download PNG** 即可将二维码保存为图片，用于印在周报上或在幻灯片中展示。任何扫描该二维码的人，都会在手机上打开该表单。

## 添加问题 {#adding-questions}

1. 打开你的表单，进入 **Questions** 标签页。
2. 点击 **Add Question**。
3. 从 Provider 下拉菜单中选择**字段类型**。可用类型包括：
   - **Textbox**（文本框）——用于简短的文字回答
   - **Date**（日期）——用于选择日期
   - **Email**（电子邮件）——用于电子邮件地址
   - **Phone Number**（电话号码）——用于输入电话
   - **Multiple Choice**（多项选择）——用于从预设选项中选择
   - **Payment**（付款）——用于收取款项
4. 输入问题的**标题**，并可选填**描述**。描述会在人们填写表单时显示在问题下方，因此可用于提示，例如"请写明我们需要了解的任何过敏情况"。
5. 如果该字段为必填，请勾选 **Require an answer**（必须回答）。
6. 点击 **Save**。
7. 重复上述步骤添加更多问题。

:::warning
**Payment** 字段类型需要已配置 Stripe。如果你尚未设置在线捐赠，请在添加付款字段之前参阅[在线捐赠设置](../donations/online-giving-setup.md)。未登录即在表单上付款的人员，必须先勾选 **I'm not a robot** 验证，银行卡才会被接受。
:::

## 管理表单成员 {#managing-form-members}

1. 打开你的表单，进入 **Form Members** 标签页。
2. 搜索某人，并为其分配角色后添加：
   - **Admin**（管理员）——可以编辑表单并查看所有提交内容。
   - **View Only**（仅查看）——可以查看提交内容，但不能编辑表单。

## 将表单关联到小组 {#linking-a-form-to-a-group}

你可以将任何独立表单关联到某个小组，例如为小组设置的代祷请求表，或为青年旅行设置的医疗授权书：

1. 打开你的表单的 **Details**。
2. 在 **Linked group** 下，选择该小组，或保持为 **None**。
3. 点击 **Save**。

表单关联后：

- 在表单开放期间，**小组成员**会在 B1.church 上小组页面的 **Forms** 部分看到该表单，并可点击 **Fill out** 按钮打开它（参见[小组详情](../../b1-church/groups/group-details.md#linked-forms)）。
- **小组负责人**还可以看到已关闭的表单，并能阅读每份提交内容的答复，还可以打印（单份提交或 **Print all**）。负责人只能查看答复；除非他们同时也是[表单成员](#managing-form-members)，否则无法编辑表单。
- **在 B1 Admin 中**，小组页面会显示 **Linked forms** 部分，列出每个关联表单及其 **Open**（开放）或 **Closed**（关闭）状态。该部分对小组负责人以及有权管理表单的人员可见。参见[小组成员](../groups/group-members.md#linked-forms)。

当表单超出其开放时间范围时，表单即为关闭状态。已归档的表单不会显示在小组页面上。

### 自动将提交人加入小组 {#automatically-adding-submitters-to-a-group}

仅将表单关联到小组，并不会自动将任何人加入该小组。若要将每位提交人加入关联小组的名单，还需在表单详情中开启 **Create a person record from submissions**，然后点击 **Save**。

每当有人提交表单时，匹配到的或新创建的人员都会被加入该小组（已是小组成员的人员会被跳过）。这对于营地报名表之类的场景很有用，因为它可以自动建立营地的名单小组。

### 发送跟进邮件 {#sending-a-follow-up-email}

开启 **Create a person record from submissions** 后，你还可以向每位提交表单的人发送电子邮件。在表单详情中填写 **Follow-up Email Subject**（跟进邮件主题）和 **Follow-up Email Body**（跟进邮件正文）。两者中都可以使用 `{firstName}` 和 `{churchName}` 标记。只有当两个字段都已填写时，才会发送该邮件。

:::info
跟进邮件只有在你的教会获准发送小组邮件之后才会发出，并且会计入教会的每日邮件发送上限。参见[为教会开启小组邮件](../groups/group-members.md#turning-on-group-email-for-your-church)。
:::

## 复制表单

要以某个表单为起点创建新表单，请在表单列表中点击该表单旁边的 **Duplicate**，然后确认。B1 会创建该表单的完整副本（包括所有问题），之后你可以独立地为其重命名和编辑。

:::tip
复制功能适用于每年报名问题保持不变的定期活动。复制去年的表单，更新名称和日期，即可直接使用。
:::

## 配置表单属性

你可以随时更新表单的名称和设置。对于独立表单，你还会看到一个唯一的**公开网址**，可以分享给任何人；此外还有 **Description** 字段，即显示在公开表单页面问题上方的文字，可用于在人们开始填写之前说明表单的用途。

### 添加页眉照片 {#adding-a-header-photo}

独立表单可以在表单顶部显示**页眉照片**。在表单详情中，点击照片框或 **Add Photo**，然后选择或上传图片（会裁剪为 16:9 的比例）。点击 **Save**。照片会显示在表单名称下方、描述上方，出现在表单的公开网址页面以及使用网站 **Form** 元素嵌入该表单的任何位置。使用 **Change Photo** 可替换照片，或使用 **Remove** 将其删除。

使用 **Thank You Message** 字段，可设置人们提交表单后看到的内容，包括在表单的公开网址页面上。如果留空，人们将看到 "Thank you for submitting the form!"（感谢您提交表单！）。

:::tip
独立表单非常适合用于活动报名。可通过电子邮件、社交媒体分享公开网址，或直接将表单嵌入你的教会网站。
:::

:::info
要在你的 B1 网站上嵌入表单，请进入网站编辑器，添加一个新区块，并选择 **Form** 元素，然后选择你要显示的表单。有关编辑网站的详细信息，请参阅[管理页面](../website/managing-pages.md)。
:::
