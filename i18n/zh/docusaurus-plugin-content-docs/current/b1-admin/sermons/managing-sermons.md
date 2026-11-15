---
title: "管理讲道"
description: "在 B1 Admin 中管理你的讲道库：从 YouTube、Vimeo 或 Facebook 添加讲道，编辑详细信息，并为你的教会获取播客订阅源。"
---

# 管理讲道

<div class="article-intro">

讲道页面显示你的整个讲道库。在这里，你可以添加新讲道、编辑现有条目，并按播放列表整理内容。每场讲道都可以链接到托管在 YouTube、Vimeo、Facebook 或自定义网址上的视频或音频。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 你需要在角色的 **Content**（内容）部分拥有 **Edit Services**（编辑礼拜）权限。如果你没有访问权限，请参阅[角色与权限](../settings/roles-permissions.md)。
- 至少创建一个[播放列表](./playlists.md)，用于整理你的讲道
- 准备好来自 YouTube、Vimeo 或 Facebook 的视频 ID 或网址

</div>

## 查看讲道库 {#viewing-your-sermon-library}

1. 在 B1 Admin 中，打开[跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），展开 **Sermons**（讲道），然后点击 **Sermons**。
2. 讲道页面以表格形式显示你的讲道条目，包括每场讲道的 **Playlist**（播放列表）、标题（**Sermon**，讲道）和 **Publish Date**（发布日期），按从新到旧排列，并显示类似 "11 of 11 sermons"（共 11 场讲道中的 11 场）的计数。在 **Search sermons by title or playlist...**（按标题或播放列表搜索讲道...）输入框中输入内容，即可筛选列表。你的播放列表显示在表格旁边的 **Playlists**（播放列表）面板中，**Podcast Feed**（播客订阅源）面板位于其下方。
3. 将鼠标悬停在某个讲道行上，然后点击 **Edit**（编辑），即可查看或编辑其详细信息。

## 添加讲道 {#adding-a-sermon}

1. 点击右上角的 **Add Sermon**（添加讲道）按钮，并从下拉菜单中选择 **Add Sermon**。列表上方会打开 **Edit Sermon**（编辑讲道）表单。
2. 选择一个 **Playlist**（播放列表）来分配该讲道（或保持为 **None**（无））。
3. 选择你的 **Video Provider**（视频提供商）-- **YouTube**、**Vimeo**、**Facebook** 或 **Custom Embed Url**（自定义嵌入网址）。我们推荐使用 YouTube，因为它与 B1 系统配合最佳。
4. 输入视频的 **YouTube ID**、**Vimeo ID**、**Sermon ID**（Facebook）或 **Sermon Embed Url**（讲道嵌入网址）。你可以粘贴完整的视频链接，B1 会只保留其中的 ID。对于 YouTube，视频 ID 是 YouTube 网址中 `v=` 之后的字符串。
5. 对于 YouTube 和 Vimeo，点击 **Fetch**（获取），自动导入讲道详细信息，包括发布日期、时长、标题、描述和缩略图。如果无法加载详细信息，页面会显示相应提示，你可以自行填写。
6. 根据需要进行任何更改，然后点击 **Save**（保存）。

:::tip
你也可以从 **Add Sermon** 下拉菜单中选择 **Add Permanent Live URL**（添加永久直播网址），添加永久直播网址。这将使用你的频道 ID 建立与 YouTube 频道直播的持久连接。更多详情请参阅[直播](./live-streaming.md)。
:::

## 编辑讲道 {#editing-a-sermon}

1. 在讲道库中点击任意讲道行上的 **Edit**，打开其详细信息。
2. 根据需要更新标题、日期、描述、缩略图、时长或媒体链接。
3. 点击 **Save** 应用更改，或点击 **Cancel**（取消）关闭表单。

要删除讲道，请打开该讲道，点击 **Delete**（删除），然后确认。

### 将讲道添加到其他播放列表 {#adding-a-sermon-to-another-playlist}

要将同一场讲道列入第二个播放列表（例如，一场既属于某个系列、又属于 "Best Of"（精选）合集的讲道），请打开该讲道，点击 **Add to another playlist**（添加到其他播放列表），选择播放列表，然后点击 **Add**（添加）。这会在该播放列表中保存一份讲道副本。

## 讲道详情 {#sermon-details}

每个讲道条目可包含以下内容：

- **Playlist**（播放列表）-- 该讲道所属的系列
- **Video Provider**（视频提供商）和视频 ID -- 讲道视频的托管位置：YouTube、Vimeo、Facebook 或自定义嵌入网址
- **Publish Date**（发布日期）-- 讲道的发布日期；没有发布日期的讲道在列表中显示 **Not scheduled**（未排定）
- **Total Sermon Duration**（讲道总时长）-- 讲道的时长，以分钟和秒为单位
- **Thumbnail**（缩略图）-- 在讲道库中显示的预览图片。点击图片可裁剪或替换（比例为 16:9）。
- **Title**（标题）-- 向访客显示的讲道名称
- **Description**（描述）-- 讲道内容的摘要
- **Audio File URL (for podcast)**（音频文件网址，用于播客）-- 该讲道 MP3/M4A 文件的直接链接。你可以粘贴网址，或在讲道保存后，点击 **Upload Audio**（上传音频），上传文件并自动填入。只有设置了此字段（或直接的视频文件链接）的讲道才会包含在播客订阅源中。

## 你的播客订阅源 {#your-podcast-feed}

只要至少有一场讲道附加了音频或视频文件，B1 Admin 就会自动为你的教会生成播客 RSS 订阅源，无需任何开启操作。你可以在讲道列表旁边的 **Podcast Feed** 面板（位于 **Playlists** 面板下方）中找到它：点击复制图标复制订阅源网址，然后将该网址提交到 Apple Podcasts、Spotify 或其他任何播客目录。

:::info
仅链接到嵌入式播放器的讲道（例如 YouTube 或 Vimeo 视频 ID）不会出现在播客订阅源中，因为播客应用需要可直接下载的媒体文件。添加 **Audio File URL** 即可将该讲道包含在内。
:::

## 为直播安排讲道 {#scheduling-a-sermon-for-live-stream}

添加讲道后，你可以将其安排到直播页面上播出：

1. 在跳转菜单中，选择 **Sermons > Live Stream Times**（讲道 > 直播时间）。
2. 编辑某个礼拜，并在 **Video Settings**（视频设置）下，从 **Sermon** 下拉菜单中选择你的讲道。
3. 讲道将在预定的礼拜时间播放。

:::info
如果需要一次导入多场讲道，而不是逐个添加，请使用[批量导入](./bulk-import.md)工具直接从你的 YouTube 或 Vimeo 账户中提取视频。
:::

## 后续步骤 {#next-steps}

- [播放列表](./playlists.md) -- 将讲道整理为系列
- [在线直播](./live-streaming.md) -- 配置你的直播时间表
- [批量导入](./bulk-import.md) -- 一次导入多场讲道
