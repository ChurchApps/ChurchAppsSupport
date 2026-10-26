---
title: "批量导入"
---

# 批量导入

<div class="article-intro">

批量导入页面可让您通过从 YouTube 或 Vimeo 导入视频，快速填充您的讲道库。与逐个添加视频相比，这是引入现有讲道内容最快的方式。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 您需要具备 **contentApi.streamingServices.edit** 权限。如果您没有访问权限，请参阅[角色与权限](../settings/roles-permissions.md)。
- 至少创建一个[播放列表](playlists)，用于导入您的讲道
- 准备好您的 YouTube 频道 ID 或 Vimeo 账户信息

</div>

## 选择来源

1. 在 B1 Admin 中，打开 [Jump 菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），展开 **Sermons**（讲道），然后点击 **Sermons**。点击 **Add Sermon**（添加讲道），并从菜单中选择 **Bulk Import**（批量导入）。
2. 在 **Choose Import Source**（选择导入来源）下，您会看到两个选项：
   - **YouTube**：从 YouTube 频道导入视频
   - **Vimeo**：从 Vimeo 账户导入视频
3. 点击您的讲道所在平台的选项（或点击其说明下方的 **Import from YouTube**（从 YouTube 导入）/ **Import from Vimeo**（从 Vimeo 导入））。点击页面顶部的 **Back**（返回）即可回到来源选择页面。

:::tip
如果您的视频同时位于两个平台上，您可以随时返回并切换来源。
:::

## 导入前的准备

在导入视频之前，您至少需要一个播放列表来组织这些视频。如果您尚未创建任何播放列表：

1. 返回 **Sermons** 页面，找到 **Playlists**（播放列表）面板。
2. 点击 **Create First Playlist**（创建第一个播放列表），并填写名称、描述、发布日期和缩略图。
3. 点击 **Save**（保存），然后点击 **Add Sermon**，选择 **Bulk Import**，返回批量导入页面。

有关创建和管理播放列表的详细说明，请参阅[播放列表](playlists)。

## 导入视频

1. 选择 YouTube 或 Vimeo 后，在提供的字段中输入您的 **YouTube Channel ID**（YouTube 频道 ID）或 **Vimeo account information**（Vimeo 账户信息）。
2. 点击 **Fetch**（获取）按钮，以检索您频道或账户中的所有可用视频。
3. 获取后，您将看到带复选框的所有视频列表。
4. 勾选您要导入的视频。您可以全选，也可以只选择特定视频。
5. 可选：启用 **Auto Import New Videos**（自动导入新视频），以便将未来上传的视频自动添加到您的库中。
6. 点击 **Import Into Playlist**（导入到播放列表）下拉菜单，选择这些视频应添加到哪个播放列表。
7. 点击 **Import** 按钮，完成批量导入。

您的视频将连同其全部详细信息一起导入，包括标题、描述、日期和缩略图。YouTube 标题和描述中的特殊字符（例如 `&`、撇号和引号）会按原样保留，而不会显示为 `&amp;` 之类的编码。

:::info
如果您正从其他平台迁移，批量导入非常适合用于入门。对于今后逐个添加的讲道，请改用[管理讲道](managing-sermons)页面。
:::

## 后续步骤

- [管理讲道](managing-sermons)：编辑已导入的讲道详细信息
- [播放列表](playlists)：创建和管理讲道系列
- [直播](live-streaming)：为您的礼拜设置直播
