---
title: "使用 B1 Checkin 和 B1 Admin 设置自助签到"
sidebar_label: "签到"
description: "在 B1 Admin 中为聚会设置 B1 Checkin 应用的自助签到，涵盖设备、签到亭账户、时间表、品牌设置和二维码访客登记。"
---

# 签到

<div class="article-intro">

B1 Admin 支持通过配套的 **B1 Checkin** 应用在聚会时进行自助签到。成员到达时可以在签到亭或专用设备上为自己和家人签到，过程快捷，也减轻了志愿者的工作负担。每次签到都会自动记录为考勤。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 你的堂区、聚会时间和小组必须已在[考勤设置](setup.md)中配置完成。
- 你需要在数据库中有[人员](../people/adding-people.md)，并设置好[家庭](../people/adding-people.md#managing-households)，以便家人可以一起签到。
- 你需要一台平板电脑，另外可选配 Brother 标签打印机（参见下方的[硬件推荐](#recommended-hardware)）。

</div>

## 工作原理 {#how-it-works}

B1 Checkin 应用与你的 B1 Admin 考勤设置相连接。成员签到时，其考勤会自动记录到正确的堂区、聚会时间和小组。对于使用签到系统的成员，你无需手动输入考勤。

## 设置签到 {#setting-up-check-in}

1. **先配置考勤结构。** 在 B1 Admin 中，进入 **People > Attendance**，点击 **Setup**，确保堂区、聚会时间和小组都已设置好。签到应用依赖此配置。你也可以为每个聚会时间设置[签到时间表](setup.md#setting-a-check-in-schedule)，使签到每周自动开启和关闭。时间表使用聚会所在堂区的时区；如果堂区未设置时区，则使用教会的时区。签到亭会将窗口已关闭的聚会时间列为 **Closed**，并告知家庭签到何时开始。详情请参阅[考勤设置](setup.md)。
2. **在你计划使用的设备上安装 B1 Checkin 应用。** 该应用支持以下平台：
   - **iPad/iOS：** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/三星平板：** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **亚马逊 Fire 平板：** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **登录 B1 Checkin 应用**，使用具有 **Checkin** 考勤权限（或 **Edit Attendance**）的账户。参见[签到亭账户](../settings/roles-permissions.md#check-in-kiosk-accounts)。
4. **为当前聚会选择堂区和聚会时间。**
5. 成员现在可以在设备上搜索自己的姓名并进行签到。

:::tip
将签到设备放置在醒目且易于到达的位置，例如大堂入口或迎宾台。在聚会期间简短宣布一下，有助于成员了解这一选项。
:::

:::tip
如果你的教会有多个堂区，则需要在[考勤设置](setup.md)中为每个堂区重复设置。每台签到设备可以配置为不同的堂区。
:::

## 推荐硬件 {#recommended-hardware}

**平板电脑**——以下任何一款都能很好地运行该应用：

- **小巧型：** Samsung Galaxy Tab A7 Lite 8.7"
- **大屏型：** Samsung Galaxy Tab A8 10.5"
- **经济型：** Amazon Fire HD 10

**打印机**——签到可搭配 Brother 标签打印机打印姓名牌：

- **最佳：** Brother QL-1110NWB（支持通过蓝牙和 WiFi 连接多台平板）
- **良好：** Brother QL-810W（支持通过 WiFi 连接多台平板）
- **经济型：** Brother QL-1100（仅支持 WiFi）

**标签纸：** Brother DK-1201（1-1/7" x 3-1/2"）

:::warning
只有 Brother 标签打印机与 B1 Checkin 应用兼容。其他品牌的打印机无法打印姓名牌。
:::

:::info
请按照打印机的设置说明，将其连接到与平板相同的 WiFi 网络。你可以在 [Brother 支持网站](https://support.brother.com)上找到 Brother 打印机驱动程序和设置指南。
:::

## 自定义签到亭外观 {#customizing-the-kiosk-appearance}

你可以自定义 B1 Checkin 应用的外观，使其与教会的品牌风格保持一致。在 B1 Admin 中，进入 **Mobile > B1 CheckIn**（或在 Attendance 页面点击 **Kiosk**），使用 **Kiosk Theme** 卡片。修改后请点击该卡片上的 **Save**。

### 颜色 {#colors}

签到亭使用与教会应用相同的颜色。请在 **Mobile > App Theme** 中设置颜色；Kiosk Theme 卡片没有独立的颜色设置。

### 背景图片 {#background-image}

在 **Background Image** 下，点击 **Upload Image**，可为签到亭的欢迎和查询屏幕添加可选的背景图片。建议尺寸为 1920x1080 像素。使用 **Change Image** 或 **Remove** 可以替换或清除图片。

### 待机屏幕/屏保 {#idle-screen--screensaver}

设置在一段时间无操作后启动的屏保：

1. 打开 **Idle Screen / Screensaver**，并开启 **Enable idle screen**。
2. 设置 **Timeout (seconds)**——无操作多少秒后启动屏保（最少 10 秒）。
3. 为每张幻灯片点击 **Add Slide**，点击 **Upload** 选择其图片，并设置 **Duration (s)**（最少 3 秒）。

:::tip
当签到亭没有被使用时，可以利用待机屏幕显示公告、即将举行的活动或欢迎信息。
:::

## 通过二维码进行访客登记 {#guest-registration-via-qr-code}

签到亭可以显示一个二维码，访客可以用手机扫描后自行为自己和家人登记。这能加快首次到访者的签到速度。

访客扫描二维码后，会进入[访客登记页面](../../b1-church/checkin/guest-registration.md)，在那里填写家庭成员的姓名以及你选择要求填写的其他信息。之后，志愿者可以在签到亭上查找他们并为其签到。

### 启用二维码访客登记 {#enabling-qr-guest-registration}

要开启二维码显示：

1. 在 B1 Admin 中，打开[跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），并展开 **Mobile**。
2. 点击 **B1 CheckIn**。
3. 将 **QR Guest Registration** 切换为开启，然后点击 **Save**。

:::note
此设置位于 **Mobile > B1 CheckIn**（与 **Kiosk Theme** 卡片位于同一页面），而不在 Attendance 下。Attendance 页面上的 **Kiosk** 操作带有指向此页面的链接。
:::

切换开启后，下方的其他选项会出现在同一个 **QR Guest Registration** 卡片中。更改任何选项后，请点击该卡片上的 **Save**。

### 选择登记字段 {#choosing-sign-up-fields}

**Sign-up fields** 复选列表用于控制登记表单要求填写的内容。**First Name** 和 **Last Name** 始终显示在表单中，且对每位家庭成员都是必填项。对于其他字段，开启 **Include** 即可将其添加到表单中，若希望访客必须填写，再开启 **Required**。只有在字段已包含的情况下才能开启 **Required**，而关闭 **Include** 会同时清除该字段的必填设置。

| 字段 | 询问对象 | 默认是否包含 |
|-------|-----------|---------------------|
| **Title** | 每位家庭成员，以下拉菜单形式显示在姓名前（Mr、Mrs、Miss、Ms、Dr、Prof、Rev、Pastor） | 否 |
| **Email** | 仅主要联系人 | 是（可选） |
| **Phone** | 每位家庭成员。设为必填时，仅主要联系人必须填写。 | 是（可选） |
| **Household role** | 主要联系人之后的每位家庭成员——Spouse、Child 或 Other。主要联系人为新家庭的户主。未选择角色的人员将保存为 Other。 | 是（可选） |
| **Home address** | 整个家庭填写一次——街道、地址第二行、城市、州/省和邮编。设为必填时，除地址第二行外均须填写。该地址会保存到每位家庭成员的记录中。 | 否 |
| **Birth date** | 每位家庭成员 | 否 |
| **Gender** | 每位家庭成员 | 否 |
| **Marital status** | 仅主要联系人 | 否 |
| **Grade** | 每位家庭成员（PreK 至 12，或 Graduated） | 否 |
| **Comments** | 整个家庭填写一次，位于家庭成员下方的文本框中（最多 1,000 个字符） | 否 |

关闭的字段即使有人通过其他方式提交，也永远不会被保存。备注会作为一条笔记保存在主要联系人的记录上（标注为 "Guest sign-up"），因此你可以在其个人资料的 **Notes** 部分查看。

### 将访客添加到小组 {#adding-guests-to-a-group}

使用 **Add new guests to group**，可将所有登记的人员自动加入你的某个小组——例如"新朋友"小组，或本周活动的小组。选择 **None**（默认值）则跳过此步骤。访客无法看到或选择小组，该设置仅能在此处进行。每次活动前请更改此设置，以便你能将该活动的访客一起跟进。

### 记录考勤 {#recording-attendance}

选择小组后，会出现 **Also record attendance** 开关。开启后，访客在登记的那一刻即被标记为出席，你无需再单独为其签到。

只有当登记发生在所选小组的某个**已排定**聚会时间内，才会记录考勤：

- 小组必须关联一个或多个聚会时间，且这些聚会时间必须设有[签到时间表](setup.md#setting-a-check-in-schedule)（包括**星期**和**开始时间**）。
- "期间"指该聚会时间的签到窗口内——从开始前的 **Open check-in** 分钟，直到结束后的 **Close check-in** 分钟（若未设置结束时间，则为开始后的该分钟数；若既无结束时间也无关闭分钟数，则直到当天结束），时区与签到时间表所用的时区相同。
- 在当前时刻开放签到的每个聚会时间，都会将每位家庭成员在当天日期下标记为该小组的出席。
- 在其他时间进行的登记，或其聚会时间未设置时间表的小组，会被加入小组但不计为出席。

### 页眉照片 {#header-photo}

在 **Header photo** 下，点击 **Change photo**，选择或上传一张图片（裁剪为 16:9 比例），显示在登记页面顶部，代替默认图标。点击 **Remove** 可恢复为图标。

### 分享登记链接 {#sharing-the-registration-link}

启用二维码访客登记后，卡片底部会出现 **Share registration QR code** 部分。除签到亭的二维码外，你还有两种方式可以引导访客进入登记表单：

- **Copy link**——复制登记网址，以便粘贴到教会网站、电子邮件或其他任何网络位置。
- **Download PNG**——将二维码下载为图片，可打印在传单、主日周报或指示牌上。

:::tip
将登记链接添加到教会网站的"Plan Your Visit"或"I'm New"页面，让访客在到达之前就能完成登记。
:::

### 访客登记后会发生什么 {#what-happens-after-a-guest-signs-up}

B1 首先会在**人员**中查找已存在的人员。当恰好有一人具有相同的名字，并且电子邮件或电话号码也相同时，该家庭成员即被匹配到现有人员。未填写电子邮件或电话的儿童，会在已匹配的家庭内按名字进行匹配。匹配到的人员将保持原样——登记不会更改其资料或会员状态——而新成员则加入已匹配的家庭。

若无人匹配，登记会创建一个新家庭，以主要联系人的姓氏命名，并为每位家庭成员建立一条人员记录。所有新成员都会以会员状态 **Visitor** 添加到**人员**中，主要联系人为户主。

无论是匹配的还是新建的人员，若尚未在所选小组中，都会被加入该小组；若已开启相关设置，还会记录其考勤。备注会作为一条笔记保存在主要联系人上。

若要自动跟进，可添加[工作流触发器](../serving/workflows.md#triggers)，例如条件为*会员状态为 Visitor* 的 **Person · Created**，或上述所选小组的 **Group · Member Joined**。

## 记录内容 {#what-gets-recorded}

每次签到都会在 B1 Admin 中创建一条考勤记录。你可以在[考勤](tracking-attendance.md)页面以及每个[小组](../groups/group-members.md)的聚会记录中查看这些记录，与手动输入的考勤一样。两种方式的数据显示没有任何区别——两者都会汇入相同的报表。
