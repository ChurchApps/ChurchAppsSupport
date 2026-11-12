---
title: "B1 Admin 中的直播时间与设置"
sidebar_label: "在线直播"
description: "在 B1 Admin 中安排每周或一次性直播礼拜，设置聊天和提前播放时间，连接 YouTube 频道，并排查嵌入问题。"
---

# 在线直播

<div class="article-intro">

直播时间页面让你配置教会的直播时间表、管理礼拜时间，并自定义观众的观看体验。你可以设置每周重复的礼拜或一次性活动，配置聊天和视频设置，并控制直播的开始时间。

</div>

## 培训视频 {#training-video}

<YouTube id="tpEY-sEYW6A" title="在 B1 中设置在线直播" next="在 B1 中自定义教会的会员应用" nextUrl="/docs/b1-admin/settings/mobile-app" />

<div class="prereqs">
<h4>开始之前</h4>

- 你需要在角色的 **Content**（内容）部分拥有 **Edit Services**（编辑礼拜）权限。如果你没有访问权限，请参阅[角色与权限](../settings/roles-permissions.md)。
- 如果计划使用自动直播，请准备好你的 YouTube 频道 ID
- 至少添加一场[讲道](./managing-sermons.md)或一个永久直播网址，作为直播源

</div>

在线直播需要通过跳转菜单中 **Sermons**（讲道）版块的两个页面进行管理：**Live Stream Times**（直播时间）用于管理直播时间表，**Settings**（设置）用于配置直播页面上的标签页。

## 管理礼拜 {#managing-services}

### 添加礼拜 {#adding-a-service}

1. 在 B1 Admin 中，打开[跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），展开 **Sermons**（讲道），然后点击 **Live Stream Times**（直播时间）。
2. 点击页面顶部的 **Add Service**（添加礼拜）按钮，创建新的预定礼拜。现有礼拜会以表格形式列出，显示每个礼拜的名称（定期礼拜带有 **Weekly**（每周）标记）、时间、提供商和时长；将鼠标悬停在某一行上并点击编辑图标即可修改。
3. 输入 **Service Name**（礼拜名称），例如 "Sunday Morning"（周日早晨）。新礼拜默认名称为 "Sunday Morning"。
4. 设置 **Service Time**（礼拜时间）-- 选择礼拜开始的日期和时间。新礼拜默认为下一个周日上午 9:00。
5. 将 **Recurs Weekly**（每周重复）设为 **Yes**（**Weekly**，每周）以设置定期礼拜，或设为 **No**（**One-time**，一次性）以设置一次性活动。

### 配置聊天和视频设置 {#configuring-chat-and-video-settings}

6. 在 **Chat Settings**（聊天设置）下，设置 **Enable Chat - Minutes Before**（提前启用聊天 - 礼拜前分钟数）和 **Enable Chat - Minutes After**（提前启用聊天 - 礼拜后分钟数），即礼拜开始前和结束后应开启聊天的分钟数（新礼拜默认各为 10 分钟）。这样观众可以在礼拜开始前就开始聊天，并在礼拜结束后继续交流。每个输入框旁边的时间会显示聊天开启和关闭的时刻。
7. 在 **Video Settings**（视频设置）下，设置 **Start Video Early**（提前开始视频）-- 提前多少分钟开始视频直播，用于倒计时或礼拜前的内容。聊天会在提前视频开始的 *前* 几分钟开启，因此旁边显示的聊天礼拜前分钟数时间会同时计算这两个数值。例如，对于 10:00 的礼拜，设置礼拜前 15 分钟聊天和提前 5 分钟开始视频，则聊天将于 9:40 开启。
8. 从 **Sermon**（讲道）下拉菜单中选择要播放的内容：
   - **Latest Sermon**（最新讲道，**Auto**（自动））-- 自动播放你最近添加的视频。
   - 你的[永久直播网址](#setting-up-your-youtube-live-stream)，列在其后 -- 每个网址都会使用你的频道 ID，播放你的 YouTube 频道当前的直播。新建的网址默认名为 **Current Live Service**（当前直播礼拜），除非你重新命名。
   - 排在最后的是你已保存的任何特定讲道。
9. 点击 **Save**（保存）以安排礼拜，或点击 **Cancel**（取消）关闭表单。

要删除礼拜，请编辑该礼拜，点击 **Delete**（删除），然后确认。

:::info
如果设置为定期重复，你的礼拜每周将自动更新。在夏令时开始或结束时，它会保持相同的当地时间。你可以根据需要添加任意数量的礼拜。观众访问你的直播页面时，会看到下一场预定礼拜的时间。
:::

## 直播页面设置 {#streaming-page-settings}

要自定义显示在直播旁边的标签页和链接，请打开跳转菜单，展开 **Sermons**，然后点击 **Settings**。**Stream Settings**（直播设置）页面会显示你的 **Content Tabs**（内容标签页）列表，顺序与观众看到的一致。外部链接标签页在被点击时会在新的浏览器标签页中打开链接。

### 添加标签页 {#adding-tabs}

1. 点击 **Add**（添加）按钮，为直播页面添加新标签页。随即打开 **Create New Tab**（创建新标签页）对话框。
2. 在 **Tab Text**（标签文字）框中输入标签页名称，并点击图标按钮选择 **Icon**（图标）。
3. 选择 **Link Type**（链接类型）：**External URL**（外部网址，默认）用于自定义链接，或选择内置的 **Chat**（聊天）或 **Prayer**（祷告）标签页。
4. 对于外部网址标签页，在 **External URL**（外部网址）框中输入地址。聊天和祷告标签页无需其他设置。
5. 点击 **Save Tab**（保存标签页）。新标签页会添加到列表末尾。

你配置的标签页将显示在直播页面上，供观众访问额外的资源和互动功能。

### 编辑、重新排序和删除标签页 {#editing-reordering-and-deleting-tabs}

将鼠标悬停在某个标签页上，然后使用其按钮：

- **Move up**（上移）和 **Move down**（下移）箭头 -- 更改标签页的顺序。
- **Edit**（编辑，铅笔图标）-- 更改标签页的文字、图标、类型或网址，然后点击 **Save Tab**。要删除标签页，请点击 **Delete**，并在 **Delete Tab**（删除标签页）对话框中确认。

### 预览直播 {#previewing-your-stream}

在 **Live Stream Times** 页面中，点击页面顶部的 **View Your Stream**（查看你的直播），即可准确查看观众将看到的直播页面，包括你的徽标、礼拜时间和已配置的标签页。

## 设置 YouTube 直播 {#setting-up-your-youtube-live-stream}

要连接你的 YouTube 频道以进行自动直播：

1. 进入 **Sermons**，点击 **Add Sermon**（添加讲道），然后选择 **Add Permanent Live URL**（添加永久直播网址）。随即打开 **Edit Permanent Live Url**（编辑永久直播网址）表单。
2. **Video Provider**（视频提供商）默认为 **Current YouTube Live Stream**（当前 YouTube 直播）。请输入你的 **YouTube Channel ID**（YouTube 频道 ID）（不是频道网址；如需帮助，请点击 **Get Your Channel Id**（获取频道 ID））。
3. 标题默认为 **Current Live Service**（当前直播礼拜）。如有需要可以更改，并可添加描述，然后点击 **Save**。永久直播网址没有播放列表或发布日期。
4. 在 **Live Stream Times** 中创建礼拜，并从 **Sermon** 下拉菜单中选择你的永久直播网址。

:::tip
要找到你的 YouTube 频道 ID，请进入 YouTube 频道的高级设置，复制 Channel ID 的值。
:::

## 自定义颜色和徽标 {#customizing-colors-and-logo}

你的直播页面使用网站的[外观](../website/appearance.md)设置：

- 页眉使用 **light accent color**（浅色强调色）搭配深色文字。
- 侧边栏使用 **dark accent color**（深色强调色）搭配浅色文字。
- 你的 **Light Background Logo**（浅色背景徽标）会显示在直播页面上。请使用背景透明、宽高比为 4:1 的图片。

要更改这些设置，请进入 **Website**（网站），然后进入 **Appearance**（外观），并更新你的[配色方案](../website/appearance.md#color-palette)和[徽标](../website/appearance.md#logo-and-branding)设置。

## 添加直播主持人 {#adding-streaming-hosts}

要让团队成员在公开聊天之外，还能使用仅主持人可见的聊天：

1. 在跳转菜单中，选择 **Settings > Roles**（设置 > 角色）。
2. 点击 **Add role**（添加角色），然后选择 **Add Custom Role**（添加自定义角色）。
3. 将角色命名为 "Streaming Host"（直播主持人），然后点击 **Save**。
4. 点击新建的角色，在其成员列表中搜索人员并添加（参见[为角色添加用户](../settings/roles-permissions.md#adding-users-to-a-role)）。
5. 向下滚动到 **Edit Permissions**（编辑权限），展开 **Content** 部分，并勾选 **Host Chat**（主持人聊天）。

主持人登录直播页面后，会在公开聊天旁边出现一个私密的 **Host Chat** 标签页，供工作人员在直播期间进行仅限内部的交流。

:::info
有关创建角色和管理权限的更多详情，请参阅[角色与权限](../settings/roles-permissions.md)。
:::

## 故障排除 {#troubleshooting}

如果你在使用 "Current YouTube Live Stream"（当前 YouTube 直播）选项（配合频道 ID）时，自动 YouTube 直播无法正常显示，请尝试以下方法：

**症状：**
- 直播嵌入内容显示 "Video unavailable"（视频不可用）
- 页面已加载，但没有出现视频
- 直接的 YouTube 嵌入可以正常工作，但自动频道直播无法显示

**解决方法：**
检查你的 YouTube 频道中是否有旧的或已预定的直播，并将其删除：

1. 进入你的 YouTube Studio。
2. 导航至 **Content**（内容），然后点击 **Live**（直播）。
3. 查找所有旧的已预定直播或即将开始的预定直播。
4. 删除这些旧的或已预定的直播条目。
5. 再次测试你的直播页面。

:::warning
当你的频道中存在多个已预定或过往的直播条目时，YouTube 的自动频道直播嵌入可能会被阻止。删除这些条目后，YouTube 便能正确识别并提供你当前的直播。
:::

**其他要求：**
- 你的直播必须设置为 **Public**（公开）（而非 Unlisted（不公开列出）或 Private（私密））。
- 你的 YouTube 直播设置中必须允许嵌入。
- 请确保使用的是 **Current YouTube Live Stream**（当前 YouTube 直播）提供商（配合频道 ID），而不是 **YouTube** 提供商（配合视频 ID）。

## 后续步骤 {#next-steps}

- [管理讲道](./managing-sermons.md) -- 将讲道添加到你的讲道库
- [播放列表](./playlists.md) -- 将讲道整理为系列
