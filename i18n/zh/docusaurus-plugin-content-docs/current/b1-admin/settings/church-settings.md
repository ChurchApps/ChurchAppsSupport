---
title: "教会设置"
description: "在 B1 Admin 的教会设置页面中设置教会的名称、地址、子域名、时区、地区格式、短信服务提供商和文件存储。"
---

# 教会设置

<div class="article-intro">

教会设置页面用于配置教会的基本信息、联系方式和品牌形象。这些信息会用于所有 ChurchApps 工具，包括你的 B1.church 网站和 B1 App。

</div>

## 培训视频 {#training-video}

<YouTube id="634zSbzDkYA" title="在 B1 中设置教会信息和品牌形象" next="在 B1 中设置角色、权限并邀请团队" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>开始之前</h4>

- 你需要拥有 "Edit Church Settings"（编辑教会设置）权限。如果你没有访问权限，请参阅[角色与权限](./roles-permissions.md)。
- 准备好教会的地址、联系信息和徽标

</div>

## 编辑教会信息 {#editing-your-church-information}

1. 在 B1 Admin 中，打开[跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），展开 **Settings**（设置），然后点击 **Settings**。
2. 在页面顶部的 **Church Information**（教会信息）部分，点击 **Edit**（编辑）。
3. 更新以下任一字段：
   - **Church Name**（教会名称）*（必填）* -- 在所有 ChurchApps 产品中显示的名称。
   - **Subdomain**（子域名）*（必填）* -- 你免费的 B1 网址。请参阅下文的[设置子域名](#setting-up-your-subdomain)。
   - **Address Line 1**（地址第一行）、**Address Line 2**（地址第二行）、**City**（城市）、**State**（州/省）、**Zip**（邮编）和 **Country**（国家）-- 教会的实际地址。
   - **First Day of Week**（每周第一天）-- 请参阅下文的[每周第一天](#first-day-of-week)。
   - **Time Zone**（时区）-- 教会所在的时区。请参阅下文的[时区](#time-zone)。
4. 点击 **Save**（保存）以应用更改，或点击 **Cancel**（取消）放弃更改。

教会名称、子域名和地址也会显示在设置页面左上角的面板中。

## 设置子域名 {#setting-up-your-subdomain}

你的教会会获得一个免费的子域名，形式为 **yourchurch.b1.church**。会众和访客可通过此网址访问教会的在线页面。

1. 在设置页面上，点击 **Church Information** 部分中的 **Edit**，并找到 **Subdomain** 字段。
2. 输入你偏好的子域名（例如，对于 gracechurch.b1.church，输入 "gracechurch"）。
3. 保存更改。

:::info
子域名在所有 ChurchApps 教会中必须是唯一的。如果你偏好的名称已被占用，可以尝试添加城市或州名（例如 "gracechurch-dallas"）。
:::

如果你希望访客通过你自己的域名访问网站（例如 **`www.gracechurch.org`**），请参阅[自定义域名](./custom-domain.md)。

## 配置品牌形象 {#configuring-branding}

你的徽标和颜色并不在设置页面中设置。请在 **Website > Appearance**（网站 > 外观）下上传教会徽标并选择颜色 -- 参见[徽标与品牌形象](../website/appearance.md#logo-and-branding)。B1 应用、会员门户和签到自助终端所使用的颜色，则在 **Mobile > App Theme**（移动端 > 应用主题）下设置 -- 参见[应用主题](./mobile-app.md#app-theme)。

## 通用（支持联系方式） {#general-support-contact}

**General**（通用）部分包含你的 **Support Contact**（支持联系方式）：即人们用来联系你教会的电子邮件地址或联系表单链接。在 **General** 部分点击 **Edit**，在 **Link**（链接）字段中输入相应内容，然后点击 **Save**。在你设置之前，该部分会显示 **Not set**（未设置）。

## 每周第一天 {#first-day-of-week}

选择你的日历从哪一天开始。Church Info 部分中的 **First Day of Week**（每周第一天）下拉菜单默认为 **Sunday**（周日），但可以设置为任意一天。更改后，B1 Admin 和 B1.church 会员门户中的所有日历视图都会遵循该设置 -- 小组日历、精选日历以及活动编辑器都会以你选择的那一天作为每周的起始日。

## 时区 {#time-zone}

**Church Information** 部分中的 **Time Zone**（时区）下拉菜单用于设置教会的时区（例如 *America/Chicago*）。选择 **None**（无）可留空。保存后，该时区会显示在教会信息摘要中。

B1 将此时区用于全教会范围的时间，例如活动提醒以及你的 [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md) 电视上的日程安排。[签到时间表](../attendance/setup.md#setting-a-check-in-schedule)首先以该礼拜所属[校区](./campuses.md)的时区计算；只有当该校区没有设置时区时，才会使用教会的时区。如果你的所有校区位于同一时区，请同时在教会和每个校区上进行设置。

## 地区（日期和电话格式） {#region-date-and-phone-format}

**Region**（地区）设置用于控制 B1 中日期和时间的书写方式。默认情况下，日期采用美国格式（例如 "Sep 28, 2026" 和 "9/28/2026"）。美国以外的教会可以切换为本国格式 -- 例如，选择 English (United Kingdom)（英语（英国））后，日期将显示为 "28 Sept 2026" 和 "28/09/2026"。

1. 在设置页面上，点击左侧列表中的 **Region**，然后点击 **Region** 部分中的 **Edit**。
2. 从 **Region** 下拉菜单中选择你所在的地区。每个选项都会显示一个示例日期，方便你准确了解日期的显示效果。
3. 点击 **Save**。

此后，Region 部分会显示你所选的地区、**Date format**（日期格式）示例，以及你的 **Phone numbers**（电话号码）格式。

### 电话号码格式 {#phone-number-format}

同一个 Region 部分中的 **Phone numbers**（电话号码）设置用于控制在人员记录中如何输入电话号码：

- **International (with country code)**（国际（含国家代码））-- 默认选项。电话字段会显示国旗选择器，并以国家代码保存号码（例如 +1 918 555 1234）。
- **Local (as typed)**（本地（按输入原样））-- 电话字段变为普通文本框，并按你输入的原样保存号码，不会添加国家代码（例如 0701 234 5678）。如果你的教会以本地格式记录号码，并且不希望 B1 添加国家代码，请选择此项。

选择 **Local** 后，Region 部分还会在你所在地区旁边显示 "Local phone numbers"（本地电话号码）。

:::tip
号码包含国家代码时，短信功能效果最佳。如果你通过 B1 发送短信，请保持 **International** 格式，或确保在 Local 模式下输入的号码包含国家代码。
:::

你所选的地区会应用于整个 B1 Admin，以及你的 B1.church 网站和会员门户中的日期和时间，包括讲道、博客文章、小组日历和服事计划，因此会众看到的日期格式与工作人员相同。

## 短信 {#texting}

连接短信服务商后，你就可以从 B1 Admin 向个人或整个小组发送短信。短信通过你在服务商处的自有账户发出，因此适用其定价和限额。

1. 在设置页面上，点击左侧列表中的 **Texting**（短信），然后点击 **Texting** 部分中的 **Edit**。
2. 选择 **Provider**（服务商）：
   - **Clearstream** -- 输入 **API Key**（API 密钥）。请在你的 Clearstream 账户设置中的 API Keys 下创建密钥。
   - **Text In Church** -- 输入 **API Key**。请先向 Text In Church 支持团队申请开发者 API 访问权限，然后在你的账户设置 > Developer API 部分创建密钥。
   - **Nalo Solutions**（加纳）-- 将你的 Nalo Solutions 账户中的授权密钥作为 **API Key** 输入，并输入 Nalo 为你批准的 **Sender ID**（发送者 ID）（最多 11 个字符）。
   - **Twilio** -- 使用你教会自己的 Twilio 账户；Twilio 会直接向你收费。从 [Twilio Console](https://console.twilio.com) 复制 **Account SID** 和 **Auth Token**，并输入 **From Number**（发送号码）-- 一个已注册 A2P 10DLC 的 Twilio 电话号码，格式如 `+15551234567`。保存后，请将下方的入站 Webhook 网址粘贴到 Twilio 中该号码的 **A message comes in**（收到消息时）Webhook 中，以便 B1 也能记录 STOP 回复。
3. 点击 **Save**。

若要停止发送短信，请将 **Provider** 设为 **None**（无）并保存。这会移除已保存的服务商。

### 为回复 STOP 的人员退订 {#opting-out-people-who-reply-stop}

保存服务商后，请通过 **Edit** 重新打开短信部分。在服务商设置下方，一个只读的 **Inbound (STOP) webhook URL**（入站（STOP）Webhook 网址）字段会显示专属于你教会的网址。点击该字段即可选中地址，复制后粘贴到你的短信服务商的入站消息（回复）Webhook 设置中。上述任何能够将入站回复转发到 Webhook 的服务商都支持此功能。

此后，当有人回复你发出的短信并输入 **STOP**（或 STOPALL、UNSUBSCRIBE、CANCEL、END、QUIT、OPTOUT 或 REVOKE）时，B1 会找到手机号码匹配的所有人，将其标记为已退订，并关闭其短信提醒。之后他们会在小组短信中被跳过。其他回复则会被忽略。

:::info
这与 **Hide me from the member directory**（在会员名录中隐藏我）使用的是同一退订设置，因此回复 STOP 的人在其资料中也会显示为 **Hidden from directory**（已从名录中隐藏）。该字段仅在已保存的服务商被选中时才会显示 -- 如果你将下拉菜单切换为其他服务商，请先保存，才能再次看到该网址。
:::

连接服务商后，具有发送短信权限的工作人员会在小组页面（**Text this group**（给此小组发短信））以及拥有手机号码的个人页面（**Send text message**（发送短信））上看到 **Text**（短信）按钮。输入消息并点击 **Send**（发送）。对话框会统计字符数和短信段数。对于小组，它会在你发送前显示将收到短信的成员人数：

- 档案中没有手机号码的成员会被跳过。
- 选择了 **Hide me from the member directory** 的成员会被计为已退订，并被跳过。
- 共用同一手机号码的家庭成员只会收到一条短信。

### 使用合并字段个性化短信 {#personalizing-texts-with-merge-fields}

在消息框下方，短信对话框会显示占位符标签：**First Name**（名字）、**Last Name**（姓氏）、**Display Name**（显示名称）和 **Church Name**（教会名称）。点击某个标签，即可在光标处插入其占位符（`{{firstName}}`、`{{lastName}}`、`{{displayName}}` 或 `{{churchName}}`）。发送短信时，每个占位符都会被替换为该接收人的信息，因此像 `Hi {{firstName}}, see you Sunday!`这样的群发短信，会以每位成员各自的姓名送达。占位符在群发短信和发给单个人的短信中均可使用。发给小组的短信还提供 **Group Name**（小组名称）标签（`{{groupName}}`），会被替换为该小组的名称。

若要复用某条消息，请将其保存为[短信模板](./email-templates.md#text-templates)（即类别为 **Text** 的电子邮件模板），然后在短信窗口顶部的 **Load Template (optional)**（加载模板（可选））中选择它。

:::info
1,600 个字符的限制适用于你输入时的消息内容。填入占位符后，任何超过 1,600 个字符的文本都会在该长度处被截断。
:::

短信也可以通过[工作流](../serving/workflows.md#sending-a-text)步骤中的 **Send Text**（发送短信）操作自动发出，该操作使用相同的服务商和占位符。

## 文件存储 {#file-storage}

默认情况下，你通过[文件](../website/files.md)上传到网站的文件以及其他内容区域，都使用 B1 免费提供的托管存储，最多 100MB。如果你需要更多空间，可以改为连接你自己的云存储 -- 此后新上传的文件将直接保存到你的账户中，不再受平台限制。

1. 在设置页面上，点击左侧列表中的 **File Storage**（文件存储），然后点击 **File Storage** 部分中的 **Edit**。
2. 选择 **Provider**（服务商）：**Google Drive**、**Dropbox** 或 **S3-Compatible Bucket (S3, R2, B2)**（兼容 S3 的存储桶（S3、R2、B2））（AWS S3、Cloudflare R2、Backblaze B2 等）。**ChurchApps (Free)**（ChurchApps（免费））为内置存储。
3. 对于 Google Drive 或 Dropbox，点击 **Connect Account**（连接账户），并登录以授权访问。连接成功后会出现 **Account connected**（账户已连接）标记；必须先完成连接才能保存。对于兼容 S3 的存储桶，请输入 **Access Key Id**（访问密钥 ID）、**Secret Access Key**（私有访问密钥）、**Bucket**（存储桶）、**Endpoint**（端点，AWS 留空即可）、**Region**（区域）和 **Public URL Base**（公共网址基础路径）。**Bucket** 和 **Public URL Base** 为必填项，且存储桶必须允许公开读取，并允许来自 B1 的 CORS 上传。
4. 点击 **Save**。

若要恢复使用免费存储，请选择 **ChurchApps (Free)** 并保存。已上传的文件将保留在原处。

:::info
此设置仅影响网站文件和类似内容区域的新上传。图库图片、缩略图、徽标和人员照片始终保存在 B1 的默认存储中。
:::

## 奉献 {#giving}

**Giving**（奉献）部分用于连接你的支付服务商，并设置教会在线奉献和付费报名所使用的货币。参见[在线奉献设置](../donations/online-giving-setup.md)。此部分仅对有权编辑奉献设置的人员显示。

## 签到 {#check-in}

**Check-In**（签到）部分用于设置 **Volunteer Ratio Enforcement**（志愿者比例执行）-- 当某个房间志愿者不足时，签到是只发出警告（**Warn (allow with confirmation)**（警告（经确认后允许））），还是直接阻止签到（**Block (prevent check-in)**（阻止（禁止签到）））。参见[志愿者比例](../attendance/checkin-safety.md#volunteer-ratios)。其下方的 **Check-in kiosk, QR, and labels**（签到自助终端、二维码和标签）链接会打开移动端页面中的自助终端设置。

## 升级年级 {#grade-promotion}

如果你在儿童和学生资料中记录了 **Grade**（年级），B1 可以在你指定的日期（例如 8 月 1 日）自动将所有人升一个年级，而无需你逐一手动编辑个人资料。

1. 在设置页面上，点击左侧列表中的 **Grade Promotion**（升级年级），然后点击 **Grade Promotion** 部分中的 **Edit**。
2. 打开开关（显示为 **Enabled**（已启用）），并选择每年升级年级的 **Month**（月）和 **Day**（日）。到了该日期，所有有年级的人员都会升一个年级，而 12 年级的学生将变为 **Graduated**（已毕业）。
3. 保存更改。

若要停止自动升级，请关闭开关，使其显示为 **Disabled**（已禁用）并保存。升级日期将被移除，年级也不会再自动变化。

## 志愿者报名 {#volunteer-signup}

默认情况下，浏览[志愿者报名](../../b1-church/serving/volunteer-signup.md)的会员会看到所有存在空缺岗位的即将到来的周次。如果列表过长，你可以改为仅显示每种计划类型的下一周。

1. 在设置页面上，点击左侧列表中的 **Volunteer Signup**（志愿者报名），然后点击 **Volunteer Signup** 部分中的 **Edit**。
2. 开启 **Show only the next week of each plan type**（仅显示每种计划类型的下一周）。
3. 保存更改。

开启后，每种计划类型只会显示其下一份即将到来的计划。下一周的计划会在该日期过去后才出现。该部分的 **Weeks shown**（显示的周数）一行会显示 **Only the next week of each plan type**（仅每种计划类型的下一周）或 **All upcoming weeks**（所有即将到来的周）。

## 奉献隐私 {#giving-privacy}

有奉献访问权限的人员通常可以在人员记录的[人员资料](../people/adding-people.md#editing-details)上看到该人员的奉献总额。如果你不希望每次打开记录时金额都显示在屏幕上，可以将其隐藏，直到有人主动请求查看。

1. 在设置页面上，点击左侧列表中的 **Giving privacy**（奉献隐私），然后点击 **Giving privacy** 部分中的 **Edit**。
2. 开启 **Hide giving on person records until clicked**（在点击之前隐藏人员记录上的奉献信息）。
3. 保存更改。

开启后，人员记录上的奉献卡片会显示 "Giving is hidden on person records."（人员记录上的奉献信息已隐藏。）。点击 **Show giving**（显示奉献）即可加载并显示该人员的奉献信息。当你打开另一位人员时，它会再次隐藏。可查看奉献的人员并不会因此改变：只有拥有奉献访问权限的人员才会看到该卡片。

## 导入和导出 {#import-and-export}

设置页面上教会名称下方的 **Import/Export**（导入/导出）链接会在新的浏览器窗口中打开一个专用工具。你可以用它来：

- 从其他教会管理系统导入会员数据。
- 为备份或迁移目的导出你的 ChurchApps 数据。

当你刚开始设置教会，需要将现有记录迁移到 ChurchApps 中时，此功能尤为有用。

:::warning
导入数据前，请务必先备份现有记录。导入操作会向系统添加数据，如果多次运行，可能会产生重复条目。
:::
