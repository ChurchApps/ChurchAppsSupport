---
title: "签到"
---

# 签到

<div class="article-intro">

B1 Admin 通过配套的 **B1 Checkin** 应用支持聚会自助签到。成员可以在到达时，通过自助机或专用设备为自己和家人签到，使流程更快捷，并减轻志愿者的工作负担。每次签到都会自动记录为出勤。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 您的校区、聚会时间和小组必须已在[出勤设置](setup.md)中配置完成。
- 您需要在数据库中有[人员](../people/adding-people.md)，并设置好[家庭](../people/adding-people.md#managing-households)，以便家人可以一起签到。
- 您需要一台平板电脑，以及可选的 Brother 标签打印机（参见下方的[硬件推荐](#recommended-hardware)）。

</div>

## 工作原理

B1 Checkin 应用连接到您的 B1 Admin 出勤设置。当成员签到时，其出勤会自动记录到正确的校区、聚会时间和小组中。对于使用签到系统的成员，您无需手动录入出勤。

## 设置签到

1. **先配置您的出勤结构。** 在 B1 Admin 中，进入 **People > Attendance（人员 > 出勤）**，点击 **Setup（设置）**，确保您的校区、聚会时间和小组已经设置好。签到应用依赖于此配置。您也可以为每个聚会时间设置[签到时间表](setup.md#setting-a-check-in-schedule)，使签到每周自动开启和关闭。时间表以教会的时区为准；如果教会未设置时区，则以校区的时区为准。自助机会隐藏签到窗口已关闭的聚会时间，并告知家庭签到尚未开放。详情请参阅[出勤设置](setup.md)。
2. **在您计划使用的设备上安装 B1 Checkin 应用。** 该应用可在以下平台获取：
   - **iPad/iOS：** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/三星平板：** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **亚马逊 Fire 平板：** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **使用您教会的账户凭据登录 B1 Checkin 应用。**
4. **为当前聚会选择校区和聚会时间。**
5. 成员现在可以在设备上搜索自己的名字并签到。

:::tip
将签到设备放置在显眼、易于到达的位置，例如大厅入口或迎宾台。在聚会期间简短宣布一下，可以让成员知道有这个选项。
:::

:::tip
如果您的教会有多个校区，则需要在[出勤设置](setup.md)中为每个校区分别进行设置。每台签到设备都可以配置为不同的校区。
:::

## 推荐硬件 {#recommended-hardware}

**平板电脑** —— 以下任何一款都能很好地运行该应用：

- **紧凑型：** Samsung Galaxy Tab A7 Lite 8.7"
- **大屏幕：** Samsung Galaxy Tab A8 10.5"
- **经济型：** Amazon Fire HD 10

**打印机** —— 签到可配合 Brother 标签打印机打印名牌：

- **最佳：** Brother QL-1110NWB（支持通过蓝牙和 WiFi 连接多台平板）
- **良好：** Brother QL-810W（支持通过 WiFi 连接多台平板）
- **经济型：** Brother QL-1100（仅支持 WiFi）

**标签纸：** Brother DK-1201（1-1/7" x 3-1/2"）

:::warning
只有 Brother 标签打印机与 B1 Checkin 应用兼容。其他品牌的打印机无法打印名牌。
:::

:::info
请按照打印机的设置说明，将其连接到与平板电脑相同的 WiFi 网络。您可以在 [Brother 支持网站](https://support.brother.com)上找到 Brother 打印机驱动程序和设置指南。
:::

## 自定义自助机外观

您可以自定义 B1 Checkin 应用的外观和风格，使其与教会的品牌形象保持一致。在 B1 Admin 中，进入 **Mobile > B1 CheckIn（移动端 > B1 CheckIn）**，使用 **Kiosk Theme（自助机主题）** 卡片进行配置：

### 颜色

自定义八种颜色设置，以匹配教会的品牌形象：

- **Primary（主色）** 和 **Primary Contrast（主色对比色）** —— 主品牌色及其文字颜色。
- **Secondary（辅助色）** 和 **Secondary Contrast（辅助色对比色）** —— 点缀色及其文字颜色。
- **Header Background（页眉背景）** 和 **Subheader Background（副页眉背景）** —— 自助机页眉区域的颜色。
- **Button Background（按钮背景）** 和 **Button Text（按钮文字）** —— 可交互按钮的颜色。

### 背景图片

为自助机的欢迎屏幕和查找屏幕上传可选的背景图片。建议尺寸为 1920x1080 像素。

### 待机屏幕 / 屏保

配置在一段时间无操作后启动的屏保：

1. 将待机屏幕切换为 **on（开启）** 或 **off（关闭）**。
2. 设置 **timeout（超时时间）**（无操作多少秒后启动屏保，最少 10 秒）。
3. 添加一张或多张**幻灯片** —— 每张幻灯片都有一张图片和显示时长（最少 3 秒）。

:::tip
当自助机没有被使用时，可以利用待机屏幕展示公告、即将举行的活动或欢迎信息。
:::

## 通过二维码进行访客登记

签到自助机可以显示一个二维码，访客扫描后即可在自己的手机上为自己和家人登记。这能加快首次到访访客的签到速度。

访客扫描二维码后，会进入[访客登记页面](../../b1-church/checkin/guest-registration)，在那里填写姓名、电子邮箱和家庭成员信息。之后，志愿者即可在自助机上查找他们并为其签到。

### 启用二维码访客登记

要开启二维码显示：

1. 在 B1 Admin 中，打开[快速跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），展开 **Mobile（移动端）**。
2. 点击 **B1 CheckIn**。
3. 将 **QR Guest Registration（二维码访客登记）** 切换为开启，然后点击 **Save（保存）**。

:::note
此设置位于 **Mobile > B1 CheckIn**（与 **Kiosk Theme** 卡片位于同一页面），而不在出勤页面下。出勤页面中的 **Kiosk** 操作带有一个指向此页面的链接。
:::

### 分享登记链接

开启二维码访客登记后，开关下方会出现 **Share registration QR code（分享登记二维码）** 部分。除了自助机上的二维码外，这里还提供两种让访客访问登记表单的方式：

- **Copy link（复制链接）** —— 复制登记网址，以便您将其粘贴到教会网站、电子邮件或任何网络位置。
- **Download PNG（下载 PNG）** —— 将二维码下载为图片，您可以将其打印在传单、主日程序单或指示牌上。

:::tip
将登记链接添加到教会网站的"计划您的到访"或"我是新人"页面，这样访客甚至在到达之前就能完成登记。
:::

## 记录内容

每次签到都会在 B1 Admin 中创建一条出勤记录。您可以在[出勤](tracking-attendance.md)页面以及每个[小组](../groups/group-members.md)的聚会记录中查看这些记录，与手动录入的出勤完全一样。两种方式的数据显示没有任何区别，都会汇入同一份报表。
