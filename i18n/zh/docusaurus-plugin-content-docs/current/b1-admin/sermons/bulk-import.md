---
title: "批量导入"
description: "将 YouTube 频道或 Vimeo 账户中的讲道视频，或播客 RSS 订阅源中的单集，批量导入 B1 Admin，然后将其整理到播放列表中。"
---

# 批量导入

<div class="article-intro">

批量导入页面让你可以通过从 YouTube 或 Vimeo 导入视频，或从播客 RSS 订阅源导入单集，快速填充你的讲道库。与逐个添加讲道相比，这是引入现有讲道内容最快的方式。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 你需要在角色的 **Content**（内容）部分拥有 **Edit Services**（编辑礼拜）权限。如果你没有访问权限，请参阅[角色与权限](../settings/roles-permissions.md)。
- 至少创建一个[播放列表](./playlists.md)，用于存放导入的讲道
- 准备好你的 YouTube 频道 ID、Vimeo 账户信息或播客订阅源地址

</div>

## 选择导入来源 {#choosing-your-source}

1. 在 B1 Admin 中，打开[跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），展开 **Sermons**（讲道），然后点击 **Sermons**。点击 **Add Sermon**（添加讲道），并从菜单中选择 **Bulk Import**（批量导入）。
2. 在 **Choose Import Source**（选择导入来源）下，你会看到三个选项：
   - **YouTube** -- 从 YouTube 频道导入视频
   - **Vimeo** -- 从 Vimeo 账户导入视频
   - **Podcast RSS Feed** -- 从播客订阅源导入单集，作为音频讲道
3. 点击你的讲道所在平台的选项（或点击其描述下方的 **Import from YouTube**、**Import from Vimeo** 或 **Import from Podcast Feed**）。点击页面顶部的 **Back**（返回）可回到来源选择页面。

:::tip
如果你的视频分布在两个平台上，可以随时返回并切换来源。
:::

## 导入前的准备 {#before-you-import}

导入视频之前，你至少需要一个播放列表来整理它们。如果你还没有创建任何播放列表：

1. 返回 **Sermons** 页面，找到 **Playlists**（播放列表）面板。
2. 点击 **Create First Playlist**（创建第一个播放列表），填写名称、描述、发布日期和缩略图。
3. 点击 **Save**（保存），然后通过点击 **Add Sermon**（添加讲道）并选择 **Bulk Import**（批量导入）返回批量导入页面。

有关创建和管理播放列表的详细说明，请参阅[播放列表](./playlists.md)。

## 导入视频 {#importing-videos}

1. 选择 YouTube 或 Vimeo 后，在提供的输入框中输入你的 **YouTube Channel ID**（YouTube 频道 ID）或 **Vimeo Channel ID**（Vimeo 频道 ID）。
2. 点击 **Fetch**（获取）按钮，从你的频道中检索视频。如果无法加载视频或频道中没有视频，页面会显示相应提示；请检查 ID 后重试。
3. 获取完成后，你会看到视频列表，每个视频在 **Import**（导入）下都有一个复选框。
4. 勾选你想要导入的每个视频旁边的复选框。
5. 点击 **Import Into Playlist**（导入到播放列表）下拉菜单，选择这些视频应添加到的播放列表。
6. 点击 **Import** 按钮完成批量导入。导入完成后，你会返回到来源选择页面。

如果你在未选择播放列表或未勾选任何视频的情况下点击 **Import**，B1 会提示你先完成这些操作。点击 **Cancel**（取消）即可离开而不导入。

视频将连同其全部详细信息一起导入，包括标题、描述、日期和缩略图。YouTube 标题和描述中的特殊字符（例如 `&`、撇号和引号）会按原样显示，而不会变成 `&amp;` 之类的编码。

:::info
如果你正从其他平台迁移，批量导入是快速上手的理想方式。今后如需逐个添加讲道，请改用[管理讲道](./managing-sermons.md)页面。
:::

## 导入播客单集 {#importing-podcast-episodes}

如果你的讲道以播客形式发布（Spotify for Podcasters / Anchor、Buzzsprout、Podbean 等），你可以将其中的单集导入为音频讲道。

1. 选择 **Podcast RSS Feed**，并将订阅源地址粘贴到 **Podcast Feed URL** 中。以下是各平台查找该地址的位置：
   - **Spotify for Podcasters (Anchor)** -- **Settings** > **Availability** > **RSS distribution**。地址格式类似 `https://anchor.fm/s/…/podcast/rss`。
   - **Buzzsprout** -- 你的播客仪表板上的 **RSS Feed** 链接。
   - 大多数其他托管平台会在播客的设置或发布页面中显示 RSS 订阅源地址。
2. 点击 **Fetch**（获取）。播客名称会显示在其单集列表上方，并附有各单集的发布日期。如果无法加载订阅源，或其中没有音频单集，页面会显示相应提示；请检查地址后重试。
3. 系统会为你检查新单集。已存在于你的讲道库中的单集会标记为 **Already imported**（已导入）且无法勾选，因此不会重复添加。
4. 取消勾选你不想导入的单集，在 **Import Into Playlist**（导入到播放列表）下选择播放列表，然后点击 **Import**（导入）。

每个单集都会成为一个音频讲道，包含其标题、描述、日期、封面图和时长。会员在 B1 应用中会在这些讲道上看到 **Listen**（收听）和 **Download audio**（下载音频）。

导入是一次性复制，并非与订阅源的实时链接。当你发布新单集时，请回到此处，使用相同的订阅源地址再次执行导入；系统只会检查新单集。

:::note
仅导入音频。视频播客单集不会被导入；请通过 YouTube、Vimeo 或[管理讲道](./managing-sermons.md)添加这些单集。
:::

:::tip
想要在网站或应用中建立一个始终与播客同步、无需重复导入的列表吗？请在网站编辑器的某个页面中添加 **Podcast** 元素，然后将该页面作为 **Page** 标签添加到你的手机应用中。
:::

## 后续步骤 {#next-steps}

- [管理讲道](./managing-sermons.md) -- 编辑已导入的讲道详情
- [播放列表](./playlists.md) -- 创建和管理讲道系列
- [直播](./live-streaming.md) -- 为你的礼拜设置直播
