---
title: "指南：建立你的讲道资料库与直播"
description: "在 B1 Admin 中为教会网站导入你的 YouTube 或 Vimeo 讲道视频、将其整理成播放列表，并设置定期直播及聊天功能。"
---

# 建立你的讲道资料库与直播

<div class="article-intro">

将你的讲道存档上线并设置直播——从导入现有的 YouTube 或 Vimeo 视频库，到安排定期的直播礼拜并开启互动聊天。完成后，你的会众便可在网站和手机应用程序上观看过去的讲道，并加入直播礼拜。

</div>

## 培训视频 {#training-video}

<YouTube id="b3B3A25g2Sk" title="在 B1 中建立你的讲道资料库" next="在 B1 中设置直播" nextUrl="/docs/b1-admin/sermons/live-streaming" />

<div class="prereqs">
<h4>开始之前</h4>

- 具有内容管理权限的 B1 Admin 账户
- 含有讲道视频的 YouTube 或 Vimeo 频道，以及该频道的 ID（用于导入你的存档）
- YouTube 频道 ID（用于直播，可在 YouTube Studio 的设置中找到）

</div>

## 步骤 1：建立讲道播放列表 {#step-1-create-sermon-playlists}

播放列表可将你的讲道整理成系列或合集，方便浏览。

请按照[播放列表](../sermons/playlists.md)指南完成以下操作：

1. 在[快速菜单](../introduction.md#getting-around-with-the-jump-menu)中，选择 **Sermons > Sermons**，找到 **Playlists** 面板
2. 点击 **Add playlist**（或 **Create First Playlist**），建立系列或合集，例如「2024 主日讲道」、「婚姻系列」、「圣诞礼拜」
3. 输入 **Playlist Title**、**Description** 和 **Publish Date**，点击 **Add Thumbnail** 添加图片，然后点击 **Save**

:::tip
先建立播放列表，再添加讲道。这样在逐一添加讲道时，更容易将它们归入正确的系列。
:::

## 步骤 2：导入现有的讲道 {#step-2-import-your-existing-sermons}

如果你已经在 YouTube 或 Vimeo 上有讲道视频，可以一次全部导入。

请按照[批量导入](../sermons/bulk-import.md)指南完成以下操作：

1. 点击 **Add Sermon**，选择 **Bulk Import**，然后选择 YouTube 或 Vimeo
2. 输入你的 **YouTube Channel ID** 或 **Vimeo Channel ID**，点击 **Fetch**，列出该频道的视频
3. 勾选要导入的视频，在 **Import Into Playlist** 中选择播放列表，然后点击 **Import**

## 步骤 3：逐一添加讲道 {#step-3-add-individual-sermons}

对于个别添加的讲道，或不属于批量导入的讲道，可以逐一添加。

请按照[管理讲道](../sermons/managing-sermons.md)指南完成以下操作：

1. 点击 **Add Sermon**，选择 **Add Sermon**
2. 选择 **Playlist** 和 **Video Provider**（YouTube、Vimeo、Facebook 或 Custom Embed Url），然后粘贴视频链接或 ID
3. 对于 YouTube 和 Vimeo，点击 **Fetch**，从视频中自动填入标题、描述、缩略图、时长和发布日期，然后点击 **Save**

## 步骤 4：设置直播 {#step-4-set-up-live-streaming}

连接你的 YouTube 频道，让你的 B1 网站自动获取直播内容。

请按照[直播](../sermons/live-streaming.md)指南完成以下操作：

1. 在 **Sermons** 页面，点击 **Add Sermon**，选择 **Add Permanent Live URL**，输入你的 **YouTube Channel ID**，然后点击 **Save**
2. 在快速菜单中，选择 **Sermons > Live Stream Times**，点击 **Add Service**，设置 **Service Time**（例如每周日上午 10:00），开启 **Recurs Weekly**，并在 **Sermon** 下拉菜单中选择你的永久直播网址
3. 在 **Sermons > Settings** 页面自定义直播页面的标签（聊天、代祷以及外部链接）

:::info
当你在 YouTube 上开始直播时，B1 直播页面会自动获取该直播内容。主日早上无需任何额外操作。
:::

## 步骤 5：在你的网站上显示 {#step-5-display-on-your-website}

让访客能轻松找到你的讲道资料库和直播。

请按照[页面编辑器](../website/page-editor.md)指南完成以下操作：

1. 在 B1 网站的页面中添加 **Sermons** 元素，让访客可以浏览你的资料库
2. 添加 **Stream** 元素，提供直播观看体验

## 步骤 6：手机访问 {#step-6-mobile-access}

会员可以通过任何设备观看讲道和直播。

1. 会员可以在 [B1.church 和 B1 App](../../b1-church/content/sermons.md) 中观看讲道
2. 带聊天功能的直播在手机和电脑上都可以使用

:::info
直播聊天功能让线上会众能够实时参与，就像身在现场一样。
:::

## 完成！ {#youre-done}

你的讲道资料库已经上线，直播也已设置完成。会员可以随时补看过去的讲道，并从任何地方加入直播礼拜。每当新的讲道发布到 YouTube 或 Vimeo 后，请点击 **Add Sermon**（或再次使用 **Bulk Import**）添加新内容。

## 相关文章 {#related-articles}

- [播放列表](../sermons/playlists.md)：将讲道整理成系列
- [批量导入](../sermons/bulk-import.md)：从 YouTube 或 Vimeo 导入
- [管理讲道](../sermons/managing-sermons.md)：添加和编辑个别讲道
- [直播](../sermons/live-streaming.md)：设置直播礼拜
- [讲道（会员）](../../b1-church/content/sermons.md)：会员观看讲道的体验
- [直播（会员）](../../b1-church/content/live-streaming.md)：会员的直播体验
