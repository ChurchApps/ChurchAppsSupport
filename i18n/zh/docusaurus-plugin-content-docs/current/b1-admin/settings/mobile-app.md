---
title: "移动应用设置"
description: "在 B1 Admin 中为 B1.church 会员应用配置导航标签、主屏幕卡片、登录提示以及会员目录隐私设置。"
---

# 移动应用设置

<div class="article-intro">

移动应用设置页面可以让您配置 **B1.church 移动体验（PWA）**中显示给会员的导航标签。您可以控制哪些标签可见、它们链接到什么，以及它们的显示方式。

</div>

## 培训视频

<YouTube id="ydY7WGK16fE" title="在 B1 中自定义教会的成员应用" />

:::info
此处配置的标签会显示在 B1 应用中，会员可以[将其安装为渐进式 Web 应用（PWA）](../../b1-church/getting-started/installing-pwa.md)。请与会员分享您教会的安装页面——`https://yourchurchname.b1.church/mobile/install`——它会指导他们在设备上安装应用，无需从 App Store 或 Google Play 下载。
:::

<div class="prereqs">
<h4>开始之前</h4>

- 您需要拥有“编辑教会设置”权限。如果您没有访问权限，请参见[角色与权限](./roles-permissions.md)。
- 请先配置好[教会设置](./church-settings.md)，包括教会名称和品牌

</div>

## 访问导航设置

1. 在 B1 Admin 中，打开[快速跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），并展开 **Mobile**。
2. 点击 **Navigation**（`/mobile/navigation`）。
3. 导航页面会显示您当前的应用标签。

## 添加新标签 {#adding-a-new-tab}

1. 点击页面顶部的 **Add Tab**（添加标签）按钮。
2. 填写标签详情：
   - **Name**（名称）——标签上显示的文字（例如“讲道”或“奉献”）。
   - **Icon**（图标）——点击图标选择器，为标签选择一个图标。
   - **Image**（图片）——点击 **Select Image**（选择图片）（或 **Change Image**（更换图片））为标签添加照片。带有照片的标签会在应用的主屏幕上显示为照片卡片——参见[主屏幕卡片](#home-screen-tiles)。
   - **Tab Type**（标签类型）——从 Bible（圣经）、Live Stream（直播）、Donation（奉献）、Registrations（报名）、Requests（申请）、Website（网站）等选项中选择。**Registrations** 会打开会员的活动报名记录；**Requests** 会打开“我的申请”，会员可以在其中申请活动并查看过往申请的状态。对于这些类型，请将 Visibility（可见性）设置为 Logged-in Users（已登录用户）或 Members & Staff（会员和工作人员），因为它们需要会员登录。
   - **URL**（网址）——该标签链接到的网址。
   - **Visibility**（可见性）——控制谁可以看到此标签（所有人、仅会员等）。对于 **Member Directory**（会员目录）标签，此设置只控制谁能看到标签本身；谁可以打开目录，则由“会员门户”页面上的 **Show in Directory**（在目录中显示）决定（参见[会员目录与消息设置](#member-directory--messaging-settings)）。
3. 点击 **Save Tab**（保存标签）将其添加到应用中。

## 编辑现有标签

1. 点击 **App Tabs**（应用标签）列表中的任意现有标签。
2. 更新标签的名称、图标、网址、类型或可见性设置。
3. 点击 **Save Tab** 应用您的更改。

## 调整标签顺序

您可以更改标签在移动应用中显示的顺序。在列表中拖放标签即可重新排列。本页面显示的顺序，与会员在应用中看到的顺序一致。

:::info
某些标签可能会在满足特定条件时自动出现——例如，直播标签可能会在直播进行时出现。手动添加的标签可以让您完全掌控会员始终看到的内容。
:::

:::tip
保持标签数量适中。对于大多数教会来说，三到五个标签效果最好。标签过多会让会员感到导航混乱。
:::

## 会员目录与消息设置 {#member-directory--messaging-settings}

同一移动区域中的 **Member portal**（会员门户）项包含管理 B1.church 体验中会员目录和私信的设置：

- **Directory Approval Group**（目录审批小组）——在目录更新以及[账户删除申请](../profile/account-deletion.md)生效之前进行审核的小组。
- **Show in Directory**（在目录中显示）——谁可以打开会员目录，以及谁会被列入其中：**Admins Only**（仅管理员）、**Members and Above**（会员及以上，默认）、**Regular Attendees and Above**（常规参加者及以上）或 **Visitors and Above**（访客及以上）。会员状态低于您所选级别的人员既看不到目录，也不会出现在目录中。**Admins Only** 会将目录对除拥有 People > View 权限的工作人员以外的所有人关闭（仅有“员工”会籍状态并不足够），拥有该权限的工作人员始终可以打开目录并看到所有人，无论此处如何设置。访客永远不会被列入其中，因为任何在线自行注册的人都会以来宾身份开始。
- **Visibility Preference**（可见性偏好）——为尚未选择个人设置的会员设定全教会的默认值。**Address**（地址）、**Phone Number**（电话号码）和 **Email**（电子邮件）各有其下拉菜单，使用与所有可见性设置处相同的五个级别：
  - **Everyone**（所有人）——对任何人可见，包括匿名访客
  - **Members**（会员）——仅对拥有会员或员工记录的人可见
  - **Groups Only**（仅小组）——仅对与该人员同属一个小组的人以及工作人员可见
  - **My Group Leaders and Staff**（我的小组负责人和工作人员）——仅对该人员所属小组的负责人以及工作人员可见
  - **Staff Only**（仅工作人员）——仅对工作人员（会籍状态为 Staff，或拥有 People > View 权限的人）以及本人可见

  这些级别中的“工作人员”是指会籍状态为 Staff 或拥有 People > View 权限的人。小组变更会立即生效：加入小组或被设为小组负责人的人，无需退出再重新登录，即可看到该小组成员中匹配的 **Groups Only** 或 **My Group Leaders and Staff** 详细信息。

  会员可以在 B1.church PWA 中其个人资料的 **Privacy**（隐私）标签页上，为自己的记录覆盖这些默认值——参见[编辑您的个人资料](/docs/b1-church/getting-started/me-page)。
- **Minimum Age for Private Messages**（私信最低年龄）——儿童安全控制。当任一方的年龄低于此设置时，B1 将不会开启**新的**私信对话，年龄根据出生日期计算（如果档案中没有出生日期，则以家庭角色作为备用依据）。年龄未达标的人员仍会在目录中完全可见——只有直接私信会被阻止，并且是**双向**阻止的，对所有人（包括工作人员）一视同仁。小组对话以及向儿童的父母发送消息仍然可以进行。可选项为 Off（关闭）、13、16 或 18；默认为 **18**。现有对话不受影响。

:::tip
由于最低年龄检查依赖出生日期，请确保会众中儿童的出生日期已经填写。此设置与[签到安全控制](../attendance/checkin-safety.md)属于同一类儿童安全功能。
:::

### 主屏幕登录提示 {#home-screen-sign-in-prompt}

未登录就打开应用[主屏幕](/docs/b1-church/getting-started/navigating#home)的访客，会看到一段简短的提示——默认为 *"Sign in to see your groups, giving, and more."*（登录后即可查看您的小组、奉献等内容。）——旁边配有一个 **Sign In**（登录）按钮。同一会员门户页面（`/mobile/b1-mobile`）上的 **Home screen sign-in prompt**（主屏幕登录提示）设置可以让您更改它：

- **Show sign-in prompt on the app home screen**（在应用主屏幕上显示登录提示）——关闭此项可在主屏幕上同时隐藏提示和 **Sign In** 按钮。访客仍可以从应用菜单登录。
- **Sign-in prompt text**（登录提示文字）——将默认文字替换为您自己的消息（最多 150 个字符）。留空则使用默认文字。关闭提示时，此文本框会被禁用。

点击 **Save** 应用设置。**Saved**（已保存）消息会确认更改。保存会刷新应用的缓存设置，因此更改会在下次加载主屏幕时显示。

### 主屏幕卡片 {#home-screen-tiles}

带有照片的标签（参见[添加新标签](#adding-a-new-tab)中的 **Image**）会以照片卡片的形式出现在应用的[主屏幕](/docs/b1-church/getting-started/navigating#home)上，位于以您教会名称为标题的区域中。这包括“每日经文”标签（如果您为其提供了照片）。带照片的标签也仍会显示在标签栏中。

同一会员门户页面（`/mobile/b1-mobile`）上的 **Home screen tiles**（主屏幕卡片）设置控制这些卡片的排列方式。请选择一种 **Layout**（布局）：

- **Grid**（网格）——每行两张卡片（默认）。当卡片数量为奇数时，第一张卡片会横跨整行。
- **Scrolling row**（滚动横排）——一排卡片，会员可以左右滑动。
- **Scrolling (automatic)**（自动滚动）——与上述左右滑动的一排相同，但它还会自行移动，大约每四秒前进一张卡片，并在最后一张之后回到第一张继续前进。当会员触摸、悬停或用键盘切换到该排卡片时会暂停，几秒钟后再继续。在设置了减少动态效果的设备上，该排卡片保持静止，其行为与 **Scrolling row** 相同。
- **List**（列表）——每个标签名称旁带有小照片缩略图的列表。
- **Grid and list**（网格与列表）——前三个带照片的标签以网格显示，第一张卡片横跨整行，其余的以列表形式显示在下方，每个名称旁有小缩略图。超过三个时，分区标题会显示 **All** 链接，点击后会打开应用的 **More** 页面，其中列出所有标签。
- **Scrolling (automatic) and list**（自动滚动与列表）——前三个带照片的标签采用上述自动滚动的一排显示，其余的显示在下方，并带有相同的 **All** 链接。

在两种滚动布局中，当卡片数量超过屏幕可容纳的宽度时，卡片下方会出现一排圆点，每张卡片对应一个圆点，当前卡片的圆点会被填充。会员可以点击圆点跳转到对应的卡片。

点击 **Save** 应用设置。

### 主屏幕区块 {#home-screen-sections}

已登录的会员始终可以在[我的页面](/docs/b1-church/getting-started/me-page)上看到自己的出勤记录和已提交的表单。同一会员门户页面（`/mobile/b1-mobile`）上的 **Home screen sections**（主屏幕区块）开关，也可以让它们同时显示在主屏幕上：

- **Show My Attendance on Home**（在主屏幕显示我的出勤）——添加一个 **My Attendance**（我的出勤）区块，显示会员在过去 90 天内的出勤次数、最近两次到访，以及通往其完整出勤列表的 **History**（历史）链接。
- **Show My Forms on Home**（在主屏幕显示我的表单）——添加一个 **My Forms**（我的表单）区块，显示会员最近两次的表单提交，以及 **All forms**（全部表单）链接。

这两个区块默认均为关闭。只有已登录并且至少有一条记录可显示的会员，才会看到相应区块。

- **Show News on Home**（在主屏幕显示新闻）——在问候语正下方添加一个 **News**（新闻）区块，以可自动滚动的照片卡片横排显示您最新的五篇已发布[博客文章](../website/blog.md)。点击卡片会在应用内打开完整文章，**All news**（全部新闻）链接会列出您最近的文章。开启后，**Only this category**（仅此类别）允许您选择一个博客类别（例如 *Announcements*（公告）），使只有这些类别的文章会显示；保持为 **All posts**（所有文章）则显示全部内容。无论是否登录，所有打开应用的人都能看到新闻，因为博客文章在您的网站上是公开的。此项默认关闭，并且只有在您至少有一篇已发布的文章时才会出现。

点击 **Save** 应用设置。

## 这些标签的显示位置

您在这里配置的标签，会显示在会员从 `https://yourchurchname.b1.church` 上任何页面安装的 **B1.church PWA** 中。您在本页面所做的更改，会在会员下次打开应用时生效。

在手机上，底部标签栏会显示 **Home**（首页）、最多三个您的标签，以及 **More**（更多）；在电脑上，顶部导航栏最多显示五个。内置屏幕（例如讲道、奉献或小组）会优先占用各个位置，剩余的位置则由 **Internal Page**（内部页面）标签填充。**External URL**（外部网址）和**每日经文**标签永远不会占用位置。所有标签，包括无法放入标签栏的标签，都会列在应用的 **More** 页面上。

放在 **Folder**（文件夹）标签中的标签是例外：它们只会出现在文件夹自己的屏幕上，会员点击文件夹即可打开。当文件夹中的每个标签都有图片时，该屏幕会将它们显示为照片卡片；否则显示为列表。对于没有任何可见标签的文件夹，会对该会员隐藏。参见[文件夹标签](../../b1-church/getting-started/navigating.md#folder-tabs)。有关会员所看到内容的说明，请参见[导航 B1App](../../b1-church/getting-started/navigating.md)。

## 应用主题

在 **Mobile > App Theme**（移动端 > 应用主题）下，您可以为 **Light**（浅色）和 **Dark**（深色）模式分别设置教会应用的颜色：**Background**（背景）、**Surface**（表面）、**Primary**（主色）、**Primary Contrast**（主色对比色）、**Secondary**（辅助色）和 **Text Color**（文字颜色）。点击色块即可选择颜色，或在其旁边的 **Hex**（十六进制）框中输入色值（例如 `#1565C0`；`#` 可以省略）。输入的颜色会在输入完全部六位十六进制数字后生效。

## 推送通知

若要向应用的所有用户或某个小组发送或定时发送推送通知，请使用 **Mobile > Push Notifications**（移动端 > 推送通知）。参见[推送通知](./push-notifications.md)。

## 后续步骤

- [教会设置](./church-settings.md)——配置教会信息和品牌
- [角色与权限](./roles-permissions.md)——管理团队的访问权限
