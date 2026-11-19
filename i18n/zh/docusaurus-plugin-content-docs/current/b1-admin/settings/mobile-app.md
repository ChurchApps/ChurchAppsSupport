---
title: "移动应用设置"
description: "在 B1 Admin 中配置 B1.church 成员应用的导航标签、主屏幕图块、登录提示以及会员目录隐私设置。"
---

# 移动应用设置

<div class="article-intro">

移动应用设置页面让你可以配置 **B1.church 移动端体验（PWA**）中显示给教会成员的导航标签。你可以控制哪些标签可见、它们链接到哪里，以及如何显示。

</div>

## 培训视频 {#training-video}

<YouTube id="7x2CQG_pH6o" title="在 B1 中自定义教会的成员应用" />

:::info
此处配置的标签会显示在 B1 App 中，成员可以将其[安装为渐进式 Web 应用（PWA）](../../b1-church/getting-started/installing-pwa.md)。请将你教会的安装页面 -- `https://yourchurchname.b1.church/mobile/install` -- 分享给成员；该页面会引导他们在设备上安装应用，无需从 App Store 或 Google Play 下载。
:::

<div class="prereqs">
<h4>开始之前</h4>

- 你需要拥有 "Edit Church Settings"（编辑教会设置）权限。如果你没有访问权限，请参阅[角色与权限](./roles-permissions.md)。
- 请先配置好[教会设置](./church-settings.md)，包括教会名称和品牌形象

</div>

## 进入导航设置 {#accessing-navigation-settings}

1. 在 B1 Admin 中，打开[跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），并展开 **Mobile**（移动端）。
2. 点击 **Navigation**（导航）（`/mobile/navigation`）。你需要拥有 **Edit Content**（编辑内容）权限才能看到它。
3. **App Tabs**（应用标签）列表会按顺序显示你当前的标签及其可见性。位于文件夹内的标签会缩进显示在该文件夹之下。

Mobile 菜单还包括 **App Theme**（应用主题）、**Member portal**（会员门户）、**B1 Check-In**（B1 签到）、**Labels**（标签打印）和 **Push Notifications**（推送通知）。应用主题和会员门户将在下文介绍；有关推送通知的定时发送，请参阅[推送通知](#push-notifications)。

## 添加新标签 {#adding-a-new-tab}

1. 点击页面顶部的 **Add Tab**（添加标签）按钮。
2. 填写标签的详细信息：
   - **Tab Name**（标签名称）-- 标签上显示的文字（例如 "Sermons"（讲道）或 "Give"（奉献））。
   - **Icon**（图标）-- 点击图标选择器，为标签选择图标。
   - **Image**（图片）-- 点击 **Select Image**（选择图片）（或 **Change Image**（更换图片））为标签添加照片。带有照片的标签会在应用的主屏幕上显示为照片图块 -- 参见[主屏幕图块](#home-screen-tiles)。若要移除照片，请点击 **Remove Image**（移除图片）并保存；此后该标签将以普通标签的形式显示，而不再作为主屏幕图块。
   - **Tab Type**（标签类型）-- **Bible**（圣经）、**Live Stream**（直播）、**Verse of the Day**（每日经文）、**Sermons**（讲道）、**Check-in**（签到）、**Donation**（奉献）、**Member Directory**（会员名录）、**My Groups**（我的小组）、**Volunteer Opportunities**（志愿者机会）、**Serving Plans**（服事计划）、**Registrations**（报名）、**Requests**（请求）、**External URL**（外部网址）、**Internal Page**（内部页面）或 **Folder**（文件夹）。**Registrations** 会打开会员的活动报名记录；**Requests** 会打开"我的请求"，会员可以在其中申请活动并查看过往请求的状态。对于这些类型，请将 Visibility（可见性）设置为 Logged-in Users（已登录用户）或 Members & Staff（会员和工作人员），因为它们需要会员已登录。
   - **URL**（网址）-- 仅在 **External URL** 标签中显示：标签打开的网址。
   - **Page**（页面）-- 仅在 **Internal Page** 标签中显示：从你的网站页面中选择一个。
   - **Parent tab**（父标签）-- 将标签放入某个 **Folder**（文件夹）标签中，或保持为 **None (top level)**（无（顶层））。参见[这些标签的显示位置](#where-these-tabs-appear)。
   - **Visibility**（可见性）-- 谁可以看到此标签：**Everyone (including anonymous)**（所有人（包括匿名用户））、**Logged-in Users**（已登录用户）、**Members & Staff**（会员和工作人员）、**Staff Only**（仅工作人员）、**Serving Team Members**（服事团队成员）或 **Specific Groups...**（特定小组...）（然后勾选小组）。对于 **Member Directory** 标签，此设置仅控制谁能看到该标签本身；谁能打开名录则由会员门户页面上的 **Show in Directory**（在名录中显示）设置决定（参见[会员名录与消息设置](#member-directory--messaging-settings)）。
3. 点击 **Save Tab**（保存标签）将其添加到你的应用中。

## 编辑现有标签 {#editing-an-existing-tab}

1. 点击 **App Tabs** 列表中某个标签上的编辑（铅笔）图标。
2. 更新标签的名称、图标、图片、类型或可见性设置。
3. 点击 **Save Tab** 以应用更改。若要移除该标签，请改为点击 **Delete Tab**（删除标签）。删除文件夹会将其中的标签移回顶层。

## 重新排列标签 {#reordering-tabs}

你可以更改标签在移动应用中的显示顺序。使用每个标签上的 **Move Up**（上移）和 **Move Down**（下移）箭头进行重新排列。文件夹内的标签只会在该文件夹内移动。本页面显示的顺序，与会员在应用中看到的顺序一致。

:::info
当满足某些条件时，某些标签可能会自动出现 -- 例如，直播处于活动状态时可能会显示直播标签。手动添加的标签可让你完全控制会员随时能看到的内容。
:::

:::tip
请保持标签数量在可管理的范围内。对大多数教会而言，三到五个标签效果最佳。标签过多会让会员感到导航混乱。
:::

## 应用主题 {#app-theme}

**Mobile > App Theme**（移动端 > 应用主题）（`/mobile/theme`）用于设置 B1 应用、会员门户和签到自助终端所使用的颜色。你需要拥有 **Edit Church Settings** 权限。

1. 展开 **Light Mode**（浅色模式）或 **Dark Mode**（深色模式）。
2. 对于每种颜色 -- **Background**（背景）、**Surface**（表面）、**Primary**（主色）、**Primary Contrast**（主色对比色，即主色按钮和页眉上的文字）、**Secondary**（辅助色）和 **Text Color**（文字颜色）-- 点击色块选择颜色，或在 **Hex**（十六进制）框中输入。下方的 **Preview**（预览）会以你选择的颜色显示页眉、卡片和按钮。
3. 点击 **Save**（保存）。

点击 **Reset to Defaults**（恢复默认值）即可恢复标准颜色。B1 Admin 自身的 **Custom**（自定义）主题也会使用浅色模式的 **Primary** 颜色 -- 参见[管理你的个人资料](../profile/managing-profile.md)。

## 会员名录与消息设置 {#member-directory--messaging-settings}

同一移动端版块中的 **Member portal**（会员门户）项目（`/mobile/b1-mobile`，标题为 **Portal settings**（门户设置））包含用于管理 B1.church 体验中会员名录和私人消息的设置。你需要拥有 **Edit Church Settings** 权限。更改以下任何设置后，请点击页面底部的 **Save**：

- **Directory Approval Group**（名录审批小组）-- 在会员名录更新和[账户删除请求](../profile/account-deletion.md)生效之前对其进行审核的小组。
- **Show in Directory**（在名录中显示）-- 谁可以打开会员名录，以及谁会被列入其中：**Admins Only**（仅管理员）、**Members and Above**（会员及以上，默认）、**Regular Attendees and Above**（常规参加者及以上）或 **Visitors and Above**（访客及以上）。会员身份状态低于你所选级别的人员既看不到名录，也不会被列入其中。**Admins Only** 会将名录对所有人关闭，但拥有 People &gt; View（人员 > 查看）权限的工作人员除外（仅有 Staff 会员身份状态并不足够）；这些人员无论此设置如何，都始终可以打开名录并看到所有人。访客永远不会被包括在内，因为任何在线自行注册的人员最初都是访客。
- **Visibility Preference**（可见性偏好）-- 为尚未自行选择设置的会员设定全教会的默认值。**Address**（地址）、**Phone Number**（电话号码）和 **Email**（电子邮件）各有一个下拉菜单（默认均为 **Members**（会员）），且在配置可见性的所有地方都提供以下五个级别：
  - **Everyone**（所有人）-- 对任何人可见，包括匿名访客
  - **Members**（会员）-- 仅对拥有会员或工作人员记录的人员可见
  - **Groups Only**（仅小组）-- 仅对与该人员共享小组的人员以及工作人员可见
  - **My Group Leaders and Staff**（我的小组负责人和工作人员）-- 仅对该人员所属小组的负责人以及工作人员可见
  - **Staff Only**（仅工作人员）-- 仅对工作人员（会员身份状态为 Staff，或拥有 People &gt; View 权限的人员）以及该人员本人可见

  这些级别中的"工作人员"是指会员身份状态为 Staff 或拥有 People &gt; View 权限的任何人。小组变动会立即生效：加入某个小组或被任命为小组负责人的人员，无需退出再重新登录，即可看到该小组成员中与 **Groups Only** 或 **My Group Leaders and Staff** 相符的详细信息。

  会员可以在 B1.church PWA 中其个人资料的 **Privacy**（隐私）标签页中，为自己的记录覆盖这些默认值 -- 参见[编辑你的个人资料](/docs/b1-church/getting-started/me-page)。
- **Minimum Age for Private Messages**（私人消息最低年龄）-- 一项儿童安全控制。当双方中任何一方低于此年龄时（根据其出生日期判断；若档案中没有出生日期，则以家庭角色作为备选依据），B1 将不允许开启**新的**私人消息对话。未达到该年龄的人员仍会完整显示在名录中 -- 仅直接消息功能会被**双向**阻止，对所有人（包括工作人员）一律适用。小组对话以及向儿童的家长发送消息仍然可以使用。可选值为 Off（关闭）、13、16 或 18；默认为 **18**。现有对话不受影响。

:::tip
由于最低年龄检查依赖出生日期，请确保你的会众中儿童的出生日期已填写完整。此设置与[签到安全控制](../attendance/checkin-safety.md)同属儿童安全功能。
:::

### 主屏幕登录提示 {#home-screen-sign-in-prompt}

未登录就打开应用[主屏幕](/docs/b1-church/getting-started/navigating#home)的访客，会在 **Sign In**（登录）按钮旁边看到一段简短提示 -- 默认为 *"Sign in to see your groups, giving, and more."*（登录即可查看你的小组、奉献等内容。）。同一会员门户页面（`/mobile/b1-mobile`）上的 **Home screen sign-in prompt**（主屏幕登录提示）设置可让你更改它：

- **Show sign-in prompt on the app home screen**（在应用主屏幕上显示登录提示）-- 关闭此项即可从主屏幕隐藏提示和 **Sign In** 按钮。访客仍然可以通过应用菜单登录。
- **Sign-in prompt text**（登录提示文字）-- 用你自己的消息替换默认文字（最多 150 个字符）。留空则使用默认文字。当提示被关闭时，此输入框会被禁用。

点击 **Save** 以应用。**Saved**（已保存）消息会确认更改。保存后会刷新应用的缓存设置，因此更改会在下次加载主屏幕时显示。

### 主屏幕图块 {#home-screen-tiles}

带有照片的标签（参见[添加新标签](#adding-a-new-tab)下的 **Image**）会在应用的[主屏幕](/docs/b1-church/getting-started/navigating#home)上以照片图块的形式显示，并位于以你教会名称为标题的区域中。如果你为每日经文标签添加了照片，它也会包含在内。照片标签同时仍会显示在标签栏中。

同一会员门户页面（`/mobile/b1-mobile`）上的 **Home screen tiles**（主屏幕图块）设置用于控制这些图块的排列方式。选择一种 **Layout**（布局）：

- **Grid**（网格）-- 每行两个图块（默认）。当图块数量为奇数时，第一个图块会横跨整行。
- **Scrolling row**（横向滚动）-- 一行图块，会员可左右滑动。
- **Scrolling (automatic)**（自动滚动）-- 与横向滚动相同，但它还会自行移动，大约每四秒前进一个图块，并在最后一个图块之后回到第一个继续循环。当会员触摸、悬停或通过键盘进入该行时会暂停，几秒钟后恢复。在设置了减少动态效果的设备上，该行保持静止，其行为与 **Scrolling row** 相同。
- **List**（列表）-- 列表形式，每个标签名称旁边都有一个小照片缩略图。
- **Grid and list**（网格和列表）-- 前三个照片标签以网格形式显示，第一个图块横跨整行；其余三个则以列表形式显示在其下方，每个名称旁边都有一个小缩略图。当标签超过三个时，版块标题会显示 **All**（全部）链接，点击后会打开应用的 **More**（更多）页面，其中列出所有标签。
- **Scrolling (automatic) and list**（自动滚动和列表）-- 上述自动前进的横向行中包含所有照片标签，前三个同时还会列在其下方；当标签超过三个时，同样会显示 **All** 链接。

在两种滚动布局中，当图块数量超过屏幕可容纳的数量时，图块下方会出现一排圆点，每个图块对应一个圆点，当前图块的圆点会被填充。会员可以点击某个圆点直接跳转到对应图块。

点击 **Save** 以应用。

### 主屏幕版块 {#home-screen-sections}

已登录的会员始终可以在[我的页面](/docs/b1-church/getting-started/me-page)上看到自己的出勤记录和已提交的表单。同一会员门户页面（`/mobile/b1-mobile`）上的 **Home screen sections**（主屏幕版块）开关也可以将它们显示在主屏幕上：

- **Show My Attendance on Home**（在主屏幕显示我的出勤）-- 添加 **My Attendance**（我的出勤）版块，显示会员在过去 90 天内的出席次数、最近两次到访记录，以及通往其完整出勤列表的 **History**（历史）链接。
- **Show My Forms on Home**（在主屏幕显示我的表单）-- 添加 **My Forms**（我的表单）版块，显示会员最近两次的表单提交记录，以及 **All forms**（所有表单）链接。

这两项默认均为关闭。只有已登录且至少有一条记录可显示的会员，才会看到相应版块。

- **Show News on Home**（在主屏幕显示新闻）-- 在问候语正下方添加 **News**（新闻）版块，以照片卡片的形式横向显示你最新的五篇已发布[博客文章](../website/blog.md)，卡片会自行移动。点击卡片会在应用内打开完整文章，而 **All news**（所有新闻）链接会列出你最近的文章。开启后，**Only this category**（仅此类别）允许你选择一个博客类别（例如 *Announcements*（公告）），使只有该类别的文章显示；保持为 **All posts**（所有文章）则显示全部内容。无论是否登录，所有打开应用的人都能看到新闻，因为博客文章在你的网站上是公开的。该功能默认关闭，并且只有在至少有一篇已发布文章时才会显示。

点击 **Save** 以应用。

## 推送通知 {#push-notifications}

**Mobile > Push Notifications**（移动端 > 推送通知）（`/mobile/notifications`）可向已安装 B1 应用并开启通知的人员发送或定时发送推送通知。向所有人发送需要 **Edit Content**（编辑内容）权限，向某个小组发送则需要 **Edit Group Members**（编辑小组成员）权限。

1. 点击 **Send Notification**（发送通知）。
2. 选择 **Audience**（受众）：**Everyone with the app**（所有安装了应用的人员），或你的某个小组。B1 会显示此推送将覆盖的人数，以及关闭了推送的人数；推送不会发送给你自己。
3. 输入 **Title**（标题）（最多 80 个字符）和 **Message**（消息）（最多 240 个字符），并可选择填写 **Open link or flyer URL**（打开链接或传单网址）和 **Image URL**（图片网址）（与[小组通知](../groups/group-members.md#sending-push-notifications-to-group-members)中的字段相同）。
4. 在 **When**（何时）下，保持 **Send now**（立即发送），或选择 **Schedule for later**（稍后定时发送），并选择未来的 **Send at**（发送时间）。
5. 点击 **Send Notification**（或 **Schedule Notification**（定时发送通知））。

该页面会列出 **Scheduled**（已定时）通知（每条均带有 **Edit**（编辑）、**Send now**（立即发送）和 **Cancel**（取消）按钮）以及 **Recent**（最近）通知及其状态，例如 *Sent: 12 of 15*（已发送：15 人中的 12 人）、*Cancelled*（已取消）或 *Missed (the send time passed)*（已错过（发送时间已过））。点击 **Remove**（移除）可将已完成的通知从列表中移除，或点击 **Clear all**（全部清除）移除所有已发送、失败和已取消的通知。时间以你教会的[时区](./church-settings.md#time-zone)显示；若教会未设置时区，则以你电脑的时区显示。接收定时通知的人员会在通知发出时重新计算。

如果 B1 尝试发送某条通知时已晚于 30 分钟，该通知会被标记为 *Missed*（已错过）且不会发送；如果某条通知失败三次，则会显示 *Failed*（失败）并附上错误信息。将通知从列表中移除，并不会将其从已收到该通知的人员处收回。当推送没有链接时，点击它会对于全教会推送打开应用的通知列表，对于小组推送则打开该小组的页面。在其[通知偏好](../../b1-church/getting-started/notification-preferences.md)中关闭了 **Church Announcements**（教会公告）的会员，无论推送发送给所有人还是某个小组，都不会收到这些推送。

## 这些标签的显示位置 {#where-these-tabs-appear}

你在此处配置的标签会显示在会员从 `https://yourchurchname.b1.church` 上的任何页面安装的 **B1.church PWA** 中。你在此页面上做出的更改，会在会员下次打开应用时生效。

在手机上，底部标签栏会显示 **Home**（主页）、最多三个你的标签以及 **More**（更多）；在电脑上，页眉最多显示五个标签。内置页面（例如讲道、奉献或小组）会优先占用这些位置，剩余位置则由**内部页面**标签填充。**外部网址**和**每日经文**标签永远不会占用这些位置。所有标签，包括无法放入的标签，都会列在应用的 **More** 页面中。

放在**文件夹**标签内的标签是例外：它们只会显示在文件夹自身的页面上，会员点击文件夹即可打开。该页面会为每个带有图片的标签显示一个全宽照片横幅，没有图片的标签则列在其下方。对于某位会员而言，如果文件夹中没有其可以看到的标签，该文件夹将对其隐藏。参见[文件夹标签](../../b1-church/getting-started/navigating.md#folder-tabs)。有关会员所看到的内容，请参阅[导航 B1App](../../b1-church/getting-started/navigating.md)。

## 后续步骤 {#next-steps}

- [教会设置](./church-settings.md) -- 配置教会信息和品牌形象
- [角色与权限](./roles-permissions.md) -- 管理团队的访问权限
