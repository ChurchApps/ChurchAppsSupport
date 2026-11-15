---
title: "批量导入"
description: "将 YouTube 频道或 Vimeo 账户中的讲道视频批量导入 B1 Admin，然后将其整理到播放列表中。"
---

# 批量导入

<div class="article-intro">

批量导入页面让你可以通过从 YouTube 或 Vimeo 导入视频，快速填充你的讲道库。与逐个添加视频相比，这是引入现有讲道内容最快的方式。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 你需要在角色的 **Content**（内容）部分拥有 **Edit Services**（编辑礼拜）权限。如果你没有访问权限，请参阅[角色与权限](../settings/roles-permissions.md)。
- 至少创建一个[播放列表](./playlists.md)，用于存放导入的讲道
- 准备好你的 YouTube 频道 ID 或 Vimeo 账户信息

</div>

## 选择导入来源 {#choosing-your-source}

1. 在 B1 Admin 中，打开[跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），展开 **Sermons**（讲道），然后点击 **Sermons**。点击 **Add Sermon**（添加讲道），并从菜单中选择 **Bulk Import**（批量导入）。
2. 在 **Choose Import Source**（选择导入来源）下，你会看到两个选项：
   - **YouTube** -- 从 YouTube 频道导入视频
   - **Vimeo** -- 从 Vimeo 账户导入视频
3. 点击你的讲道所在平台的选项（或点击其描述下方的 **Import from YouTube** / **Import from Vimeo**）。点击页面顶部的 **Back**（返回）可回到来源选择页面。

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

## 后续步骤 {#next-steps}

- [管理讲道](./managing-sermons.md) -- 编辑已导入的讲道详情
- [播放列表](./playlists.md) -- 创建和管理讲道系列
- [直播](./live-streaming.md) -- 为你的礼拜设置直播
