---
title: "教会设置"
---

# 教会设置

<div class="article-intro">

教会设置页面用于配置教会的基本信息、联系方式和品牌形象。这些信息会在所有 ChurchApps 工具中使用，包括您的 B1.church 网站和 B1 Mobile 应用。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 您需要拥有“编辑教会设置”权限。如果您没有访问权限，请参阅[角色与权限](./roles-permissions.md)。
- 请提前准备好教会的地址、联系信息和标志。

</div>

## 编辑教会信息

1. 在 B1 Admin 中，打开[快速跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），展开 **Settings**，然后点击 **Settings**。
2. 在 **Church Information**（教会信息）部分（位于页面顶部），点击 **Edit**。
3. 更新以下任意字段：
   - **Church Name**（教会名称）-- 在所有 ChurchApps 产品中显示的名称。
   - **Address**（地址）-- 您教会的实际地址。
   - **Contact Information**（联系信息）-- 电话号码、电子邮件及其他联系方式。
4. 点击 **Save** 应用您的更改。

## 设置子域名

您的教会可获得一个免费子域名，格式为 **yourchurch.1.church**。这是会众和访客访问教会线上主页的网址。

1. 在设置页面上，点击 **Church Information** 部分中的 **Edit**，并找到 **Subdomain**（子域名）字段。
2. 输入您希望使用的子域名（例如，输入“gracechurch”即可得到 gracechurch.1.church）。
3. 保存您的更改。

:::info
您的子域名在所有 ChurchApps 教会中必须是唯一的。如果您希望使用的名称已被占用，可以尝试添加您所在的城市或州名（例如“gracechurch-dallas”）。
:::

如果您希望访客通过您自己的域名访问网站（例如 **`www.gracechurch.org`**），请参阅[自定义域名](./custom-domain.md)。

## 配置品牌形象

自定义您的教会在所有 ChurchApps 工具中的呈现方式：

1. 点击**教会标志**区域，并选择图片文件，即可上传您的**教会标志**。
2. 添加在您的网站和[移动应用](./mobile-app.md)中使用的其他**教会图片**。

:::tip
为获得最佳效果，请使用透明背景的 PNG 格式标志。这样可以确保它在浅色和深色背景上都显示良好。
:::

## 一周的第一天

选择您的日历从哪一天开始。Church Information 部分中的 **First Day of Week**（一周的第一天）下拉菜单默认为 **Sunday**（周日），但可以设置为任意一天。更改后，B1 Admin 和 B1.church 会员门户中的日历网格都会遵循此设置——小组日历、精选日历和活动编辑器中的周次都会从您选择的那一天开始排列。

## 地区（日期和电话格式）

**Region**（地区）设置用于控制 B1 中日期和时间的书写方式。默认情况下，日期采用美国格式（例如“Sep 28, 2026”和“9/28/2026”）。美国以外的教会可以切换为本地格式——例如，选择 English (United Kingdom) 后，会显示“28 Sept 2026”和“28/09/2026”。

1. 在设置页面上，点击左侧列表中的 **Region**，然后点击 **Region** 部分中的 **Edit**。
2. 从 **Region** 下拉菜单中选择您所在的地区。每个选项都会显示一个示例日期，方便您确认日期的显示效果。
3. 点击 **Save**。

随后，Region 部分会显示您所选的地区、**Date format**（日期格式）示例以及您的 **Phone numbers**（电话号码）格式。

### 电话号码格式

同一 Region 部分中的 **Phone numbers** 设置用于控制在人员档案中输入电话号码的方式：

- **International (with country code)**（国际格式，含国家代码）-- 默认选项。电话字段会显示国旗选择器，并以国家代码保存号码（例如 +1 918 555 1234）。
- **Local (as typed)**（本地格式，按原样输入）-- 电话字段变为普通文本框，号码会按您输入的内容原样保存，不会添加国家代码（例如 0701 234 5678）。如果您的教会以本地格式书写号码，且不希望 B1 添加国家代码，请选择此项。

选择 **Local** 后，Region 部分还会在您的地区旁边显示“Local phone numbers”（本地电话号码）。

:::tip
短信在号码包含国家代码时效果最佳。如果您要从 B1 发送短信，请保持 **International** 格式，或确保您在 Local 模式下输入的号码包含国家代码。
:::

您所选的地区会应用于 B1 Admin 以及您的 B1.church 网站和会员门户中的日期和时间显示，包括讲道、博客文章、小组日历和服事计划，因此会员看到的日期格式与教职员工看到的一致。

## 短信服务 {#texting}

连接短信服务商后，即可从 B1 Admin 向个人或整个小组发送短信。短信通过您自己在服务商处的账户发送，因此将适用其定价和限制。

1. 在设置页面上，点击左侧列表中的 **Texting**，然后点击 **Texting** 部分中的 **Edit**。
2. 选择一个 **Provider**（服务商）：
   - **Clearstream** -- 输入 **API Key**（API 密钥）。请在您的 Clearstream 账户设置中的 API Keys 下创建密钥。
   - **Text In Church** -- 输入 **API Key**。请先向 Text In Church 支持团队申请开发者 API 访问权限，然后在您的账户设置 > Developer API 部分创建密钥。
   - **Nalo Solutions**（加纳）-- 将您 Nalo Solutions 账户中的授权密钥作为 **API Key** 输入，并输入 Nalo 为您批准的 **Sender ID**（发件人 ID，最多 11 个字符）。
3. 点击 **Save**。

如需停止发送短信，请将 **Provider** 设置为 **None**（无）并保存。这会移除已保存的服务商。

### 为回复 STOP 的人员退订

保存服务商后，请使用 **Edit** 重新打开 Texting 部分。在服务商设置下方，有一个只读的 **Inbound (STOP) webhook URL**（入站 STOP webhook 网址）字段，显示专属于您教会的网址。点击该字段即可选中网址，复制后粘贴到您服务商的入站消息（回复）webhook 设置中。上述任一支持将回复转发至 webhook 的服务商均可使用此功能。

此后，当有人回复您的短信并发送 **STOP**（或 STOPALL、UNSUBSCRIBE、CANCEL、END、QUIT、OPTOUT 或 REVOKE）时，B1 会找到手机号码匹配的所有人员，将其标记为已退订，并关闭其短信提醒。之后他们将被排除在小组短信之外。其他回复会被忽略。

:::info
此功能与**对会员目录隐藏我（Hide me from the member directory）**使用相同的退订设置，因此回复 STOP 的人在其个人资料中也会显示为 **Hidden from directory**（已从目录中隐藏）。该字段仅在选中已保存的服务商时才会显示——如果您将下拉菜单切换为其他服务商，请先保存，才能再次看到该网址。
:::

连接服务商后，具有发送短信权限的教职员工会在小组页面（**Text this group**，给此小组发短信）以及拥有手机号码的个人页面（**Send text message**，发送短信）上看到 **Text**（短信）按钮。输入您的消息并点击 **Send**（发送）。对话框会统计字符数和短信条数。对于小组，它会在发送前显示将收到短信的成员人数：

- 档案中没有手机号码的成员会被跳过。
- 选择了**对会员目录隐藏我**的成员会被计为已退订，并被跳过。
- 共享同一手机号码的家庭成员只会收到一条短信。

### 使用合并字段个性化短信 {#personalizing-texts-with-merge-fields}

在消息框下方，短信对话框会显示占位符标签：**First Name**（名字）、**Last Name**（姓氏）、**Display Name**（显示名称）和 **Church Name**（教会名称）。点击某个标签，即可在光标处插入对应的占位符（`{{firstName}}`、`{{lastName}}`、`{{displayName}}` 或 `{{churchName}}`）。发送短信时，每个占位符都会被替换为该收件人的相应信息，因此像 `Hi {{firstName}}, see you Sunday!`（您好 {{firstName}}，周日见！）这样的小组短信，会以每位成员自己的名字发送。占位符同时适用于小组短信和发给单个人的短信。

:::info
1,600 个字符的限制适用于您输入时的消息内容。占位符被填充后，任何超过 1,600 个字符的短信都会在该长度处被截断。
:::

短信也可以通过[工作流](../serving/workflows.md#sending-a-text)中的 **Send Text** 操作步骤自动发送，并使用相同的服务商和占位符。

## 文件存储

默认情况下，您通过[文件](../website/files.md)上传到网站以及其他内容区域的文件，会使用 B1 免费提供的托管存储空间，上限为 100MB。如果您需要更多空间，可以改为连接您自己的云存储——此后新上传的文件将直接存入您的账户，不受平台限制。

1. 在设置页面上，点击左侧列表中的 **File Storage**，然后点击 **File Storage** 部分中的 **Edit**。
2. 选择服务商：**Google Drive**、**Dropbox**、**OneDrive**，或 **S3-compatible bucket**（兼容 S3 的存储桶，如 AWS S3、Cloudflare R2、Backblaze B2 等）。
3. 对于 Google Drive、Dropbox 或 OneDrive，请点击 **Connect**，然后登录以授权访问。对于 S3 兼容的存储桶，请输入您的访问密钥、密钥、存储桶名称和公开 URL 前缀。
4. 点击 **Save**。

:::info
此设置仅影响网站文件及类似内容区域的新上传文件。图库图片、缩略图、标志和人员照片始终保存在 B1 的默认存储中。
:::

## 年级升级

如果您在儿童和学生档案中记录了**年级（Grade）**，B1 可以在您选择的日期（例如 8 月 1 日）自动将所有人升一个年级，无需您逐一手动编辑档案。

1. 在设置页面上，点击左侧列表中的 **Grade Promotion**，然后点击 **Grade Promotion** 部分中的 **Edit**。
2. 打开开关（显示为 **Enabled**），并选择每年升级年级的 **Month**（月）和 **Day**（日）。到了该日期，所有有年级的人都会升一个年级，12 年级学生则会变为 **Graduated**（已毕业）。
3. 保存您的更改。

如需停止自动升级，请将开关关闭（显示为 **Disabled**）并保存。升级日期会被移除，年级将不再自动更改。

## 志愿者报名 {#volunteer-signup}

默认情况下，浏览[志愿者报名](../../b1-church/serving/volunteer-signup.md)的会员会看到所有有空缺职位的未来周次。如果列表过长，您可以改为仅显示每种计划类型的下一周。

1. 在设置页面上，点击左侧列表中的 **Volunteer Signup**，然后点击 **Volunteer Signup** 部分中的 **Edit**。
2. 开启 **Show only the next week of each plan type**（每种计划类型仅显示下一周）。
3. 保存您的更改。

开启此选项后，每种计划类型只会显示其下一个即将到来的计划。下一周的计划会在当前日期过去后出现。该部分的 **Weeks shown**（显示周数）一行会显示 **Only the next week of each plan type**（每种计划类型仅显示下一周）或 **All upcoming weeks**（所有即将到来的周次）。

## 奉献隐私 {#giving-privacy}

有奉献访问权限的人通常可以在人员档案的[人员记录](../people/adding-people.md#editing-details)中看到该人的奉献总额。如果您不希望每次打开档案时都显示金额，可以将其隐藏，直到有人主动查看。

1. 在设置页面上，点击左侧列表中的 **Giving privacy**，然后点击 **Giving privacy** 部分中的 **Edit**。
2. 开启 **Hide giving on person records until clicked**（在点击前隐藏人员档案中的奉献信息）。
3. 保存您的更改。

开启此选项后，人员档案上的奉献卡片会显示“Giving is hidden on person records”（奉献信息已在人员档案中隐藏）。点击 **Show giving**（显示奉献）即可加载并显示该人的奉献信息。当您打开其他人员的档案时，它会再次隐藏。谁能看到奉献信息不会改变：只有拥有奉献访问权限的人才能看到该卡片。

## 导入和导出

设置页面上教会名称下方的 **Import/Export** 链接会在新的浏览器窗口中打开一个专门的工具。您可以用它来：

- 从其他教会管理系统导入会员数据。
- 导出您的 ChurchApps 数据，用于备份或迁移。

在您首次设置教会、需要将现有记录迁移到 ChurchApps 时，此功能尤其有用。

:::warning
导入数据时，请务必先备份现有记录。导入操作会向系统添加数据，如果多次运行，可能会产生重复条目。
:::
