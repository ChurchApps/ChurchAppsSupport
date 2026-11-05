---
title: "在线直播"
---

# 在线直播

<div class="article-intro">

直播时间页面可让你配置教会的直播时间表、管理礼拜时间，并自定义观众的观看体验。你可以设置每周定期的礼拜或一次性活动，配置聊天和视频设置，并控制直播何时开始。

</div>

## 培训视频

<YouTube id="tpEY-sEYW6A" title="Setting Up Live Streaming in B1" next="Customizing Your Church's Member App in B1" nextUrl="/docs/b1-admin/settings/mobile-app" />

<div class="prereqs">
<h4>开始之前</h4>

- 你需要 **contentApi.streamingServices.edit** 权限。如果你没有访问权限，请参阅[角色与权限](../settings/roles-permissions.md)。
- 如果你计划使用自动直播，请准备好你的 YouTube 频道 ID
- 至少添加一个[讲道](managing-sermons)或永久直播网址，作为直播来源

</div>

在线直播通过 **Sermons** 板块下的两个页面进行管理：**Live Stream Times**（直播时间）用于管理直播时间表，**Settings**（设置）用于配置直播页面上的标签页。

## 管理礼拜

### 添加礼拜

1. 在 B1 Admin 中，打开[快速跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），展开 **Sermons**，然后点击 **Live Stream Times**。
2. 点击页面顶部的 **Add Service** 按钮，创建一个新的定时礼拜。现有礼拜会以表格形式列出，显示每个礼拜的名称、时间、服务提供方和时长；点击某一行的编辑图标即可修改。
3. 输入 **Service Name**（礼拜名称），例如 "Sunday Morning"（主日早间礼拜）。
4. 设置 **Service Time**（礼拜时间）——选择礼拜开始的星期和时间。
5. 对于定期的每周礼拜，将 **Recurs Weekly** 设为 **Yes**；对于一次性活动，设为 **No**。

### 配置聊天和视频设置

6. 在 **Chat Settings**（聊天设置）下，设置礼拜开始前和结束后多少分钟开放聊天。这样观众可以在礼拜开始前就开始聊天，并在礼拜结束后继续交流。
7. 在 **Video Settings**（视频设置）下，设置提前多久开始视频直播，以便播放倒计时或礼拜前的内容。聊天会在提前的视频开始*之前*开放，因此聊天"提前多少分钟"设置旁显示的时间会同时计入这两个数字。例如，一场 10:00 的礼拜，设置聊天提前 15 分钟、视频提前 5 分钟开始，则聊天将在 9:40 开放。
8. 从下拉菜单中选择要播放的讲道：
   - **Latest Sermon**（最新讲道）——自动播放你最近添加的视频。
   - **Current Live Service**（当前直播）——使用你的频道 ID，播放你在 YouTube 上正在进行的直播。
   - 你也可以选择任何已保存的特定讲道。
9. 点击 **Save** 为礼拜排期。

:::info
如果设置为定期重复，你的礼拜每周都会自动更新。遇到夏令时开始或结束时，它会保持在相同的当地时间。你可以添加任意数量的礼拜。观众访问你的直播页面时，将看到下一场排定礼拜的时间。
:::

## 直播页面设置

要自定义直播旁边显示的标签页和链接，请打开快速跳转菜单，展开 **Sermons**，然后点击 **Settings**。**Stream Settings**（直播设置）页面会显示你的 **Content Tabs**（内容标签页）列表。

### 添加标签页

1. 点击 **Add** 按钮，为直播页面添加一个新标签页。
2. 选择 **Link Type**（链接类型）：自定义链接选择 **External URL**（外部网址），或选择预先设计好的 **Chat**（聊天）或 **Prayer**（代祷）标签页之一。
3. 对于聊天标签页，只需在 **Tab Text**（标签文字）框中为其命名，即可完成设置。
4. 对于链接标签页，输入标签名称，点击图标按钮选择一个图标，然后输入网址。
5. 你配置的标签页会显示在直播页面上，供观众访问更多资源和互动功能。

### 预览你的直播

在 **Live Stream Times** 页面，点击页面顶部的 **View Your Stream**（查看你的直播），即可准确看到观众所见的直播页面，包括你的标志、礼拜时间和已配置的标签页。

## 设置你的 YouTube 直播

要连接你的 YouTube 频道以实现自动直播：

1. 进入 **Sermons**，点击 **Add Sermon**，然后选择 **Add Permanent Live URL**（添加永久直播网址）。
2. 视频服务提供方默认为 **Current YouTube Live Stream**（当前 YouTube 直播）。输入你的 **YouTube Channel ID**（YouTube 频道 ID）。
3. 添加标题和描述，然后点击 **Save**。
4. 在 **Live Stream Times** 中，创建一个礼拜，并从讲道下拉菜单中选择你的永久直播网址。

:::tip
要找到你的 YouTube 频道 ID，请进入你的 YouTube 频道的高级设置，复制其中的 Channel ID 值。
:::

## 自定义颜色和标志

你的直播页面使用你网站的[外观](../website/appearance)设置：

- **浅色强调色**搭配深色文字用于页眉。
- **深色强调色**搭配浅色文字用于侧边栏。
- 你的**浅色背景标志**会显示在直播页面上。请使用背景透明、宽高比为 4:1 的图片。

要更改这些设置，请进入 **Website**，然后点击 **Appearance**，更新你的[配色方案](../website/appearance#color-palette)和[标志](../website/appearance#logo-and-branding)设置。

## 添加直播主持人

要让团队成员可以在公开聊天之外，使用仅限主持人的聊天功能：

1. 在快速跳转菜单中，选择 **Settings > Roles**。
2. 点击加号按钮，并选择 **Add Custom Role**（添加自定义角色）。
3. 将角色命名为 "Streaming Host"（直播主持人），然后点击 **Save**。
4. 点击新角色，然后在 **Members**（成员）部分点击 **Add**，添加人员。
5. 向下滚动到 **Edit Permissions**（编辑权限），展开 **Content**（内容）部分，并勾选 **Host Chat**（主持人聊天）。

主持人登录直播页面后，公开聊天旁边会出现一个私密的 **Host Chat** 标签页，供工作人员在直播期间进行仅限内部的交流。

:::info
有关创建角色和管理权限的更多详情，请参阅[角色与权限](../settings/roles-permissions.md)。
:::

## 故障排除

如果你使用频道 ID 选择 "Current YouTube Live Stream" 选项时，自动 YouTube 直播没有正常显示，请尝试以下方法：

**症状：**
- 直播嵌入区域显示 "Video unavailable"（视频不可用）
- 页面已加载，但没有出现视频
- 直接嵌入的 YouTube 直播可以正常播放，但自动的频道直播却不行

**解决方法：**
检查你的 YouTube 频道中是否有旧的或即将开始的定时直播，并将其删除：

1. 进入你的 YouTube Studio。
2. 导航至 **Content**（内容），然后点击 **Live**（直播）。
3. 查找任何旧的定时直播或即将开始的定时直播。
4. 删除这些旧的或定时的直播条目。
5. 再次测试你的直播页面。

:::warning
当你的频道中存在多个定时或已结束的直播条目时，YouTube 的自动频道直播嵌入可能会被阻止。删除这些条目后，YouTube 便能正确识别并提供你当前的直播。
:::

**其他要求：**
- 你的直播必须设置为**公开**（Public），而非不公开（Unlisted）或私密（Private）。
- 你的 YouTube 直播设置中必须允许嵌入。
- 请确保使用的是 **Current YouTube Live Stream**（带频道 ID）服务提供方，而非 **YouTube**（带视频 ID）服务提供方。

## 后续步骤

- [管理讲道](managing-sermons)——向你的讲道库中添加讲道
- [播放列表](playlists)——将讲道整理成系列
