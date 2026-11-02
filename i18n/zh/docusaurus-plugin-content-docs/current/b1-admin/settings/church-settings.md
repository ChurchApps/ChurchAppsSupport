---
title: "教会设置"
---

# 教会设置

<div class="article-intro">

教会设置页面用于配置你教会的基本信息、联系方式和品牌形象。这些信息会在所有 ChurchApps 工具中使用，包括你的 B1.church 网站和 B1 移动应用。

</div>

## 培训视频

<YouTube id="634zSbzDkYA" title="Setting Up Church Info and Branding in B1" next="Roles, Permissions, and Inviting Your Team in B1" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>开始之前</h4>

- 你需要拥有"编辑教会设置（Edit Church Settings）"权限。如果你没有访问权限，请参阅[角色与权限](./roles-permissions.md)。
- 请准备好教会的地址、联系信息和标志

</div>

## 编辑教会信息

1. 在 B1 Admin 中，打开[快速跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），展开 **Settings**，然后点击 **Settings**。
2. 在 **Church Information**（教会信息）部分（页面顶部），点击 **Edit**。
3. 更新以下任一字段：
   - **Church Name**（教会名称）—— 在所有 ChurchApps 产品中显示的名称。
   - **Address**（地址）—— 教会的实际地址。
   - **Contact Information**（联系信息）—— 电话号码、电子邮件及其他联系方式。
   - **Time Zone**（时区）—— 教会所在的时区。请参阅下方的[时区](#time-zone)。
4. 点击 **Save** 应用你的更改。

## 设置子域名

你的教会可以免费获得一个子域名 **yourchurch.1.church**。这是成员和访客访问教会在线页面的网址。

1. 在设置页面，点击 **Church Information** 部分中的 **Edit**，并找到 **Subdomain**（子域名）字段。
2. 输入你希望使用的子域名（例如，使用 gracechurch 即为 gracechurch.1.church）。
3. 保存更改。

:::info
你的子域名在所有 ChurchApps 教会中必须是唯一的。如果你偏好的名称已被占用，可以尝试加上你所在的城市或州（例如"gracechurch-dallas"）。
:::

如果你希望访客通过你自己的域名（例如 **`www.gracechurch.org`**）访问你的网站，请参阅[自定义域名](./custom-domain.md)。

## 配置品牌形象

自定义你的教会在所有 ChurchApps 工具中的呈现方式：

1. 点击标志区域并选择图片文件，上传你的**教会标志**。
2. 添加网站和[移动应用](./mobile-app.md)中使用的其他**教会图片**。

:::tip
为获得最佳效果，请使用背景透明的 PNG 格式标志。这样无论在浅色还是深色背景上都能显示良好。
:::

## 每周第一天

选择你的日历从哪一天开始。**Church Info** 部分中的 **First Day of Week**（每周第一天）下拉菜单默认为**星期日**，但可以设置为任意一天。更改后，它会在 B1 Admin 和 B1.church 成员门户的日历视图中生效——小组日历、精选日历和活动编辑器都会以你所选的那一天作为每周的起始日。

## 时区 {#time-zone}

**Church Information** 部分中的 **Time Zone**（时区）下拉菜单用于设置教会的时区（例如 *America/Chicago*）。选择 **None**（无）可将其留空。保存后，该时区会显示在教会信息摘要中。

B1 将此时区用于全教会范围内的时间，例如活动提醒以及你的 [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md) 电视上的排期。[签到计划](../attendance/setup.md#setting-a-check-in-schedule)首先以礼拜所在[校区](./campuses.md)的时区计算，只有当该校区未设置时区时，才会使用教会的时区。如果你的所有校区都位于同一时区，请同时在教会和每个校区上进行设置。

## 地区（日期和电话格式）

**Region**（地区）设置用于控制 B1 中日期和时间的书写方式。默认情况下，日期采用美国格式（例如 "Sep 28, 2026" 和 "9/28/2026"）。美国以外的教会可以切换为本地格式——例如，选择英语（英国）后，会显示为 "28 Sept 2026" 和 "28/09/2026"。

1. 在设置页面，点击左侧列表中的 **Region**，然后点击 **Region** 部分中的 **Edit**。
2. 从 **Region** 下拉菜单中选择你所在的地区。每个选项都会显示一个示例日期，方便你确切看到日期的显示效果。
3. 点击 **Save**。

之后，Region 部分会显示你选择的地区、**Date format**（日期格式）示例，以及你的**电话号码（Phone numbers）**格式。

### 电话号码格式

同一个 Region 部分中，**Phone numbers**（电话号码）设置用于控制人员记录中电话号码的输入方式：

- **International（国际格式，含国家代码）** —— 默认选项。电话字段会显示国旗选择器，并以国家代码保存号码（例如 +1 918 555 1234）。
- **Local（本地格式，按输入保存）** —— 电话字段变为普通文本框，并按你输入的内容原样保存，不会添加国家代码（例如 0701 234 5678）。如果你的教会习惯以本地格式书写号码，并且不希望 B1 添加国家代码，请选择此项。

选择 **Local** 后，Region 部分还会在你的地区旁边显示 "Local phone numbers"（本地电话号码）。

:::tip
短信在号码包含国家代码时效果最佳。如果你通过 B1 发送短信，请保持 **International** 格式，或确保在 Local 模式下输入的号码包含国家代码。
:::

你所选的地区会应用于 B1 Admin 以及你的 B1.church 网站和成员门户中的日期和时间，包括讲道、博客文章、小组日历和服事计划，使成员看到的日期格式与教职员工一致。

## 短信（Texting）{#texting}

连接短信服务商，即可从 B1 Admin 向个人或整个小组发送短信。短信通过你自己在服务商处的账号发送，因此适用其定价和限制。

1. 在设置页面，点击左侧列表中的 **Texting**，然后点击 **Texting** 部分中的 **Edit**。
2. 选择 **Provider**（服务商）：
   - **Clearstream** —— 输入 **API Key**。请在你的 Clearstream 账号设置中的 API Keys 下创建。
   - **Text In Church** —— 输入 **API Key**。请先向 Text In Church 支持团队申请开发者 API 访问权限，然后在你的账号设置 > Developer API 部分创建密钥。
   - **Nalo Solutions**（加纳）—— 将你的 Nalo Solutions 账号中的授权密钥作为 **API Key** 输入，并输入 Nalo 为你批准的 **Sender ID**（发送者 ID，最多 11 个字符）。
   - **Twilio** —— 使用你教会自己的 Twilio 账号；费用由 Twilio 直接向你收取。从 [Twilio 控制台](https://console.twilio.com)复制 **Account SID** 和 **Auth Token**，并输入 **From Number**（发送号码）——即已注册 A2P 10DLC 的 Twilio 电话号码，格式如 `+15551234567`。保存后，将下方的入站 webhook 网址粘贴到 Twilio 中该号码的 **A message comes in** webhook 中，这样 STOP 回复也会在 B1 中被记录。
3. 点击 **Save**。

要停止发送短信，请将 **Provider** 设为 **None**（无）并保存。这会移除已保存的服务商。

### 对回复 STOP 的人员进行退订

保存服务商后，点击 **Edit** 重新打开 Texting 部分。在服务商设置下方，一个只读的 **Inbound (STOP) webhook URL**（入站（STOP）webhook 网址）字段会显示一个专属于你教会的网址。点击该字段即可选中地址，复制后粘贴到你的短信服务商的入站消息（回复）webhook 设置中。上述任一可以将收到的回复转发到 webhook 的服务商都支持此功能。

此后，当有人回复你的短信并发送 **STOP**（或 STOPALL、UNSUBSCRIBE、CANCEL、END、QUIT、OPTOUT 或 REVOKE）时，B1 会查找所有手机号码匹配的人员，将其标记为已退订，并关闭其短信提醒。之后，他们在小组短信中会被跳过。其他回复则会被忽略。

:::info
此功能与 **Hide me from the member directory**（在成员通讯录中隐藏我）使用的是同一个退订设置，因此回复 STOP 的人员在其资料中也会显示为 **Hidden from directory**（已在通讯录中隐藏）。该字段仅在选中已保存的服务商时才会出现——如果你将下拉菜单切换为其他服务商，请先保存，才能再次看到该网址。
:::

连接服务商后，拥有发送短信权限的工作人员会在小组页面（**Text this group**（向本小组发送短信））以及拥有手机号码的个人页面（**Send text message**（发送短信））上看到 **Text**（短信）按钮。输入消息并点击 **Send**。该对话框会统计字符数和短信分段数。对于小组，发送前会显示将收到短信的成员人数：

- 没有登记手机号码的成员会被跳过。
- 选择了 **Hide me from the member directory** 的成员会被计为已退订，并被跳过。
- 共用同一手机号码的家庭成员只会收到一条短信。

### 使用合并字段个性化短信 {#personalizing-texts-with-merge-fields}

在消息框下方，短信对话框会显示占位符标签：**First Name**（名字）、**Last Name**（姓氏）、**Display Name**（显示名称）和 **Church Name**（教会名称）。点击某个标签，即可将其占位符（`{{firstName}}`、`{{lastName}}`、`{{displayName}}` 或 `{{churchName}}`）插入光标处。短信发送时，每个占位符都会被替换为该收件人的信息，因此像 `Hi {{firstName}}, see you Sunday!`（你好 `{{firstName}}`，周日见！）这样的小组短信，会以每位成员自己的姓名送达。占位符既适用于小组短信，也适用于发给单个人的短信。发给小组的短信还提供 **Group Name**（小组名称）标签（`{{groupName}}`），会替换为小组的名称。

若要复用某条消息，请将其保存为[短信模板](./email-templates.md#text-templates)（即分类为 **Text** 的电子邮件模板），然后在短信窗口顶部的 **Load Template (optional)**（加载模板，可选）中选择它。

:::info
1,600 个字符的限制适用于你输入时的消息内容。在占位符被填充之后，任何超过 1,600 个字符的内容都会在该长度处被截断。
:::

短信也可以通过[工作流](../serving/workflows.md#sending-a-text)中的 **Send Text** 步骤自动发出，它使用相同的服务商和占位符。

## 文件存储

默认情况下，你通过[文件](../website/files.md)上传到网站的文件，以及其他内容区域的文件，都使用 B1 免费提供的托管存储，最高 100MB。如果你需要更多空间，可以改为连接你自己的云存储——此后新上传的文件将直接保存到你的账户中，没有平台限制。

1. 在设置页面，点击左侧列表中的 **File Storage**（文件存储），然后点击 **File Storage** 部分中的 **Edit**。
2. 选择服务商：**Google Drive**、**Dropbox**、**OneDrive**，或 **S3-compatible bucket**（兼容 S3 的存储桶，例如 AWS S3、Cloudflare R2、Backblaze B2 等）。
3. 对于 Google Drive、Dropbox 或 OneDrive，点击 **Connect**（连接），并登录以授权访问。对于兼容 S3 的存储桶，请输入你的访问密钥、密钥、存储桶名称和公开 URL 基础地址。
4. 点击 **Save**。

:::info
此设置仅影响你网站文件及类似内容区域的新上传文件。图库图片、缩略图、标志和人员照片始终保存在 B1 的默认存储中。
:::

## 年级升级

如果你在儿童和学生中记录了**年级（Grade）**，B1 可以在你选择的日期（例如 8 月 1 日）自动将所有人升一个年级，而无需你逐一手动编辑每个资料。

1. 在设置页面，点击左侧列表中的 **Grade Promotion**（年级升级），然后点击 **Grade Promotion** 部分中的 **Edit**。
2. 打开开关（显示为 **Enabled**（已启用）），并选择每年升级年级的 **Month**（月）和 **Day**（日）。在该日期，所有有年级的人员都会升一个年级，而 12 年级的学生将变为 **Graduated**（已毕业）。
3. 保存更改。

要停止自动升级，请关闭开关（使其显示为 **Disabled**（已禁用））并保存。升级日期会被移除，年级将不再自动变化。

## 志愿者报名 {#volunteer-signup}

默认情况下，浏览[志愿者报名](../../b1-church/serving/volunteer-signup.md)的成员会看到所有有开放岗位的未来周次。如果列表过长，你可以改为只显示每种计划类型的下一周。

1. 在设置页面，点击左侧列表中的 **Volunteer Signup**（志愿者报名），然后点击 **Volunteer Signup** 部分中的 **Edit**。
2. 开启 **Show only the next week of each plan type**（仅显示每种计划类型的下一周）。
3. 保存更改。

开启后，每种计划类型只会显示其下一个即将到来的计划。下一周的计划会在该日期过去后出现。该部分的 **Weeks shown**（显示的周数）一行会显示 **Only the next week of each plan type**（仅每种计划类型的下一周）或 **All upcoming weeks**（所有即将到来的周）。

## 奉献隐私 {#giving-privacy}

拥有奉献访问权限的人员通常可以在人员记录上看到其奉献总额（参见[编辑详细信息](../people/adding-people.md#editing-details)）。如果你不希望每次打开记录时都显示金额，可以将其隐藏，直到有人主动请求查看。

1. 在设置页面，点击左侧列表中的 **Giving privacy**（奉献隐私），然后点击 **Giving privacy** 部分中的 **Edit**。
2. 开启 **Hide giving on person records until clicked**（在点击之前，隐藏人员记录上的奉献信息）。
3. 保存更改。

开启后，人员记录上的奉献卡片会显示"奉献信息已在人员记录中隐藏。"点击 **Show giving**（显示奉献）即可加载并显示该人员的奉献信息。当你打开另一个人员时，它会再次隐藏。谁可以查看奉献并不会改变：只有拥有奉献访问权限的人员才能看到该卡片。

## 导入和导出

设置页面中教会名称下方的 **Import/Export**（导入/导出）链接，会在新的浏览器窗口中打开一个专用工具。你可以用它来：

- 从其他教会管理系统导入成员数据。
- 导出你的 ChurchApps 数据，用于备份或迁移。

在你首次设置教会、需要将现有记录转移到 ChurchApps 中时，这一功能尤其有用。

:::warning
导入数据之前，请务必先备份现有记录。导入操作会向系统中添加数据，如果多次运行，可能会产生重复的条目。
:::
