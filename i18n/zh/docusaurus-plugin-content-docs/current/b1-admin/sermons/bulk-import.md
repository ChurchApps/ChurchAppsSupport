---
title: "批量导入"
---

# 批量导入

<div class="article-intro">

批量导入页面允许您通过从 YouTube 或 Vimeo 导入视频来快速填充您的讲道库。这是引入现有讲道内容的最快方式，而不是一次添加一个视频。

</div>

<div class="prereqs">
<h4>开始前</h4>

- 您需要 **contentApi.streamingServices.edit** 权限。如果您没有访问权限，请参见 [角色和权限](../settings/roles-permissions.md)。
- 创建至少一个 [播放列表](playlists) 以导入您的讲道
- 准备好您的 YouTube 频道 ID 或 Vimeo 账户信息

</div>

## 选择您的源

1. 在 B1 Admin 中，打开 [Jump 菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），展开 **Sermons**，然后点击 **Sermons**。点击 **Add Sermon** 并从菜单中选择 **Bulk Import**。
2. 您会看到两张可点击的卡片：
   - **YouTube**（红色）-- 从 YouTube 频道导入视频
   - **Vimeo**（蓝色）-- 从 Vimeo 账户导入视频
3. 点击您的讲道所在平台的卡片。

:::tip
您可以随时返回并切换源，如果您在两个平台上都有视频的话。
:::

## 导入前

在导入视频之前，您至少需要一个播放列表来组织它们。如果您还没有创建任何播放列表：

1. 返回 **Sermons** 页面并找到 **Playlists** 面板。
2. 点击 **Create First Playlist** 并填写名称、描述、发布日期和缩略图。
3. 点击 **Save**，然后通过点击 **Add Sermon** 并选择 **Bulk Import** 返回到批量导入。

参见 [播放列表](playlists) 了解创建和管理播放列表的详细说明。

## 导入视频

1. 选择 YouTube 或 Vimeo 后，在提供的字段中输入您的 **YouTube 频道 ID** 或 **Vimeo 账户信息**。
2. 点击 **Fetch** 按钮以从您的频道或账户检索所有可用视频。
3. 获取后，您将看到所有视频的列表及复选框。
4. 勾选您想要导入的视频旁的复选框。您可以选择全部或挑选特定的。
5. 可选地，启用 **Auto Import New Videos** 以自动将未来上传的内容添加到您的库。
6. 点击 **Import Into Playlist** 下拉菜单以选择这些视频应添加到哪个播放列表。
7. 点击 **Import** 按钮完成批量导入。

您的视频将与所有详细信息一起导入，包括标题、描述、日期和缩略图。

:::info
批量导入非常适合在从另一个平台迁移时快速入门。要添加单个讲道，请改为使用 [管理讲道](managing-sermons) 页面。
:::

## 后续步骤

- [管理讲道](managing-sermons) -- 编辑导入的讲道详细信息
- [播放列表](playlists) -- 创建和管理讲道系列
- [直播](live-streaming) -- 为您的服务设置直播
