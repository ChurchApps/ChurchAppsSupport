---
title: "移动应用设置"
---

# 移动应用设置

<div class="article-intro">

移动应用设置页面可让您配置教会成员在 **B1.church 移动体验（PWA）** 中看到的导航标签。您可以控制哪些标签可见、它们链接到哪里，以及它们的显示方式。

</div>

## 培训视频

<YouTube id="ydY7WGK16fE" title="Customizing Your Church's Member App in B1" />

:::info 原生 B1 移动应用已弃用
此处配置的标签通过 [B1.church 渐进式 Web 应用（PWA）](/docs/b1-church/getting-started/installing-pwa)提供，它已取代原生 B1 移动应用。请将您教会的安装页面 `https://yourchurchname.b1.church/mobile/install` 分享给成员。该页面会指导他们在设备上安装应用，无需从 App Store 或 Google Play 下载。
:::

<div class="prereqs">
<h4>开始之前</h4>

- 您需要"编辑教会设置"权限。如果您没有此权限，请参阅[角色与权限](./roles-permissions.md)。
- 请先配置您的[教会设置](./church-settings.md)，包括教会名称和品牌形象

</div>

## 访问导航设置

1. 在 B1 Admin 中，打开[跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），并展开 **Mobile**（移动）。
2. 点击 **Navigation**（导航）（`/mobile/navigation`）。
3. 导航页面会显示您当前的应用标签。

## 添加新标签 {#adding-a-new-tab}

1. 点击页面顶部的 **Add Tab**（添加标签）按钮。
2. 填写标签详细信息：
   - **Name**（名称）——标签上显示的文字（例如"讲道"或"奉献"）。
   - **Icon**（图标）——点击图标选择器，为您的标签选择图标。
   - **Image**（图片）——点击 **Select Image**（选择图片）（或 **Change Image**（更改图片））为标签添加照片。带有照片的标签会在应用的主屏幕上以照片磁贴的形式显示，请参阅[主屏幕磁贴](#home-screen-tiles)。
   - **Tab Type**（标签类型）——从 Bible（圣经）、Live Stream（直播）、Donation（奉献）、Website（网站）等选项中选择。
   - **URL**（网址）——输入标签应链接到的网址。
   - **Visibility**（可见性）——控制谁可以看到此标签（所有人、仅成员等）。对于 **Member Directory**（成员目录）标签，此设置仅控制谁能看到该标签本身；谁可以打开目录则由成员门户页面上的 **Show in Directory**（在目录中显示）设置决定（请参阅[成员目录与消息设置](#member-directory--messaging-settings)）。
3. 点击 **Save Tab**（保存标签），将其添加到您的应用中。

## 编辑现有标签

1. 点击 **App Tabs**（应用标签）列表中的任意现有标签。
2. 更新标签的名称、图标、网址、类型或可见性设置。
3. 点击 **Save Tab** 以应用更改。

## 重新排序标签

您可以更改标签在移动应用中出现的顺序。在列表中拖放标签即可重新排列。此页面上显示的顺序与成员在应用中看到的顺序一致。

:::info
某些标签可能会在满足特定条件时自动出现，例如直播标签可能会在直播进行时出现。手动添加的标签可让您完全控制成员随时看到的内容。
:::

:::tip
保持标签数量在可控范围内。对大多数教会而言，三到五个标签效果最佳。标签过多可能会让成员的导航变得混乱。
:::

## 成员目录与消息设置 {#member-directory--messaging-settings}

移动部分中的 **Member portal**（成员门户）项目包含管理 B1.church 体验中成员目录和私信的设置：

- **Directory Approval Group**（目录审批小组）——在成员目录更新以及[账户删除请求](../profile/account-deletion.md)生效之前进行审核的小组。
- **Show in Directory**（在目录中显示）——谁可以打开成员目录，以及谁会被列在其中：**Admins Only**（仅管理员）、**Members and Above**（成员及以上，默认）、**Regular Attendees and Above**（常规出席者及以上）或 **Visitors and Above**（访客及以上）。成员身份状态低于您所选级别的人员无法看到目录，也不会被列出。**Admins Only** 会将目录对除拥有"People > View"（人员 > 查看）权限的工作人员以外的所有人关闭（仅有 Staff 身份状态并不足够），这些工作人员无论此设置如何，始终可以打开目录并查看所有人。访客永远不会被包括在内，因为任何在线自行注册的人都以访客身份开始。
- **Visibility Preference**（可见性偏好）——为尚未选择自身设置的成员设定全教会的默认值。**Address**（地址）、**Phone Number**（电话号码）和 **Email**（电子邮件）各有其下拉菜单，并提供在所有可见性配置处通用的五个级别：
  - **Everyone**（所有人）——对任何人可见，包括匿名访客
  - **Members**（成员）——仅对拥有成员或工作人员记录的人可见
  - **Groups Only**（仅小组）——仅对与该人员同属一个小组的人以及工作人员可见
  - **My Group Leaders and Staff**（我的小组负责人和工作人员）——仅对该人员所属小组的负责人以及工作人员可见
  - **Staff Only**（仅工作人员）——仅对工作人员（成员身份状态为 Staff，或拥有"People > View"权限的人）以及本人可见

  这些级别中的"工作人员"是指成员身份状态为 Staff，或拥有"People > View"权限的任何人。小组变动会立即生效：加入某个小组或被任命为小组负责人的人，无需退出再重新登录，即可看到该小组成员中与 **Groups Only** 或 **My Group Leaders and Staff** 相匹配的详细信息。

  成员可以在 B1.church PWA 中其个人资料的 **Privacy**（隐私）选项卡中，为自己的记录覆盖这些默认设置，请参阅[编辑您的个人资料](/docs/b1-church/getting-started/me-page)。
- **Minimum Age for Private Messages**（私信最低年龄）——一项儿童安全控制。当双方中任一人低于此年龄时，B1 将不会开启**新的**私信对话（基于其出生日期；如果没有记录出生日期，则使用家庭角色作为备选）。低于该年龄的人员在目录中仍完全可见，仅直接消息被阻止，且是**双向**阻止，对包括工作人员在内的所有人均适用。群组对话以及向儿童的家长发送消息仍然可用。可选项为 Off（关闭）、13、16 或 18；默认值为 **18**。现有对话不受影响。

:::tip
由于最低年龄检查依赖出生日期，请确保您教会中儿童的出生日期已填写。此设置与[签到安全控制](../attendance/checkin-safety.md)属于同一儿童安全系列。
:::

### 主屏幕登录提示 {#home-screen-sign-in-prompt}

未登录即打开应用[主屏幕](/docs/b1-church/getting-started/navigating#home)的访客会看到一段简短的提示，默认为 *"Sign in to see your groups, giving, and more."*（登录以查看您的小组、奉献等内容。），旁边有一个 **Sign In** 按钮。成员门户页面（`/mobile/b1-mobile`）上的 **Home screen sign-in prompt**（主屏幕登录提示）设置可以让您更改此提示：

- **Show sign-in prompt on the app home screen**（在应用主屏幕上显示登录提示）——关闭此选项可在主屏幕上同时隐藏提示和 **Sign In** 按钮。访客仍可通过应用菜单登录。
- **Sign-in prompt text**（登录提示文字）——将默认文字替换为您自己的信息（最多 150 个字符）。留空则使用默认文字。提示关闭时，此文本框将被禁用。

点击 **Save** 以应用。**Saved** 消息会确认更改。保存时会刷新应用的缓存设置，因此更改将在下次加载主屏幕时显示。

### 主屏幕磁贴 {#home-screen-tiles}

带有照片的标签（请参阅[添加新标签](#adding-a-new-tab)下的 **Image**）会在应用的[主屏幕](/docs/b1-church/getting-started/navigating#home)上以照片磁贴的形式显示，位于以您教会名称为标题的部分中。如果您为"每日经文"标签提供照片，它也会包含在内。带照片的标签同时仍会显示在标签栏中。

同一成员门户页面（`/mobile/b1-mobile`）上的 **Home screen tiles**（主屏幕磁贴）设置控制这些磁贴的布局方式。请选择一个 **Layout**（布局）：

- **Grid**（网格）——每行两个磁贴（默认）。当磁贴数量为奇数时，第一个磁贴将横跨整个宽度。
- **Scrolling row**（滚动行）——一行磁贴，成员可以左右滑动。
- **Scrolling (automatic)**（滚动（自动））——与 **Scrolling row** 相同的左右滚动行，但它还会自动移动，大约每四秒前进一个磁贴，到末尾后循环回到起点。当成员触摸、悬停或通过键盘切换到该行时会暂停，几秒钟后再继续。在设置为减少动态效果的设备上，该行保持静止，其工作方式与 **Scrolling row** 相同。
- **List**（列表）——每个标签名称旁带有小照片缩略图的列表。

点击 **Save** 以应用。

### 主屏幕部分 {#home-screen-sections}

已登录的成员始终可以在[我的页面](/docs/b1-church/getting-started/me-page)上看到自己的出勤记录和已提交的表单。同一成员门户页面（`/mobile/b1-mobile`）上的 **Home screen sections**（主屏幕部分）开关也可以将它们显示在主屏幕上：

- **Show My Attendance on Home**（在主屏幕上显示我的出勤）——添加一个 **My Attendance**（我的出勤）部分，显示成员在过去 90 天内的出勤次数、最近两次到访记录，以及指向其完整出勤列表的 **History**（历史记录）链接。
- **Show My Forms on Home**（在主屏幕上显示我的表单）——添加一个 **My Forms**（我的表单）部分，显示成员最近两次表单提交记录以及 **All forms**（所有表单）链接。

两者默认均为关闭。仅当成员已登录且至少有一条记录可显示时，相应部分才会出现。点击 **Save** 以应用。

## 这些标签的显示位置

您在此处配置的标签会显示在成员从 `https://yourchurchname.b1.church` 任意页面安装的 **B1.church PWA** 中。您在此页面上所做的更改将在成员下次打开应用时生效。

在手机上，底部标签栏显示 **Home**（主页）、最多三个您的标签以及 **More**（更多）；在电脑上，页眉最多显示五个标签。内置屏幕（例如 Sermons（讲道）、Giving（奉献）或 Groups（小组））优先占用这些位置，**Internal Page**（内部页面）标签则填充剩余的位置。**External URL**（外部网址）和 **Verse of the Day**（每日经文）标签永远不会占用位置。每个标签（包括未能放入的标签）都会列在应用的 **More** 页面中。成员所见的内容请参阅[导航 B1App](/docs/b1-church/getting-started/navigating)。（对于仍在使用旧版[B1 移动原生应用](/docs/b1-mobile/)的成员，标签也会在该应用中显示，但该应用已弃用，不再更新。）

## 后续步骤

- [教会设置](./church-settings.md)——配置您的教会信息和品牌形象
- [角色与权限](./roles-permissions.md)——管理您团队的访问权限
