---
title: "直播"
---

# 直播

<div class="article-intro">

直播时间页面允许您配置教会的流媒体时间表、管理服务时间并自定义查看者体验。设置定期的每周服务或一次性活动，配置聊天和视频设置，并控制您的流何时上线。

</div>

<div class="prereqs">
<h4>开始前</h4>

- 您需要 **contentApi.streamingServices.edit** 权限。如果您没有访问权限，请参见 [角色和权限](../settings/roles-permissions.md)。
- 如果您计划使用自动直播，请准备好您的 YouTube 频道 ID
- 添加至少一个 [讲道](managing-sermons) 或永久直播 URL 以用作您的流源

</div>

该页面有两个主要标签页：**Services** 用于管理您的直播时间表，**Settings** 用于配置您的流媒体页面。

## 管理服务

### 添加服务

1. 在 B1 Admin 中，打开 [Jump 菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），展开 **Sermons**，然后点击 **Live Stream Times**。
2. 点击 **Add Service** 按钮以创建新的预定服务。
3. 输入 **Service Name**（例如"Sunday Morning"）。
4. 设置 **Service Time** -- 选择您的服务开始的日期和时间。
5. 将 **Recurs Weekly** 设置为 **Yes** 以进行定期每周服务，或 **No** 以进行一次性活动。

### 配置聊天和视频设置

6. 在 **Chat Settings** 下，设置服务前后多少分钟应启用聊天。这允许访问者在服务开始前开始聊天并在之后继续。
7. 在 **Video Settings** 下，设置多早开始视频流以用于倒计时或服务前内容。
8. 从下拉菜单中选择要播放的讲道：
   - **Latest Sermon** -- 自动播放您最近添加的视频。
   - **Current Live Service** -- 使用您的频道 ID 从 YouTube 播放您当前的直播。
   - 您也可以选择任何已保存的特定讲道。
9. 点击 **Save** 以安排您的服务。

:::info
如果设置为定期，您的服务将每周自动更新。您可以根据需要添加尽可能多的服务。访问者在访问您的流媒体页面时将看到下一个预定服务时间。
:::

## 流媒体页面设置

点击 **Settings** 标签页以自定义在直播旁显示的标签页和链接。

### 添加标签页

1. 点击 **Add** 按钮为您的直播页面添加新标签页。
2. 选择 **Chat** 预设计标签页或使用外部 URL 添加自定义标签页。
3. 对于聊天标签页，只需在 **Tab Text** 框中为其提供名称，设置即完成。
4. 对于链接标签页，输入标签页名称，通过点击图标按钮选择图标，然后输入 URL。
5. 您配置的标签页将出现在直播页面上，供观众访问其他资源和交互功能。

### 预览您的流

点击 **View Your Stream** 按钮以准确看到您的直播页面对访问者的样子，包括您的徽标、服务时间和配置的标签页。

## 设置 YouTube 直播

要连接 YouTube 频道以进行自动直播：

1. 转到 **Sermons** 并点击 **Add Sermon**，然后选择 **Add Permanent Live URL**。
2. 视频提供程序默认为 **Current YouTube Live Stream**。输入您的 **YouTube 频道 ID**。
3. 添加标题和描述，然后点击 **Save**。
4. 在 **Live Stream Times** 中，创建服务并从讲道下拉菜单中选择您的永久直播 URL。

:::tip
要查找您的 YouTube 频道 ID，请转到您的 YouTube 频道的高级设置并复制频道 ID 值。
:::

## 自定义颜色和徽标

您的直播页面使用您网站的 [Appearance](../website/appearance) 设置：

- **light accent color** 配合深色文本用于标题。
- **dark accent color** 配合浅色文本用于侧栏。
- 您的 **Light Background Logo** 出现在流媒体页面上。使用带有透明背景的图像和 4:1 纵横比。

要更改这些，请转到 **Website** 然后 **Appearance** 并更新您的 [Color Palette](../website/appearance#color-palette) 和 [Logo](../website/appearance#logo-and-branding) 设置。

## 添加流媒体主持人

要为团队成员提供对主持人专用聊天（以及公共聊天）的访问权限：

1. 在 Jump 菜单中，选择 **Settings > Roles**。
2. 点击加号按钮并选择 **Add Custom Role**。
3. 将角色命名为"Streaming Host"并点击 **Save**。
4. 点击新角色，然后点击成员部分中的 **Add** 以添加人员。
5. 向下滚动到 **Edit Permissions**，展开 **Content** 部分，并勾选 **Host Chat**。

当主持人登录直播页面时，私人 **Host Chat** 标签页会出现在公共聊天旁，用于广播期间的员工专用对话。

:::info
有关创建角色和管理权限的更多详情，请参见 [角色和权限](../settings/roles-permissions.md)。
:::

## 故障排除

如果您的自动 YouTube 直播在使用"Current YouTube Live Stream"选项和您的频道 ID 时显示不正确，请尝试以下操作：

**症状：**
- 直播嵌入显示"视频不可用"
- 页面加载但没有视频出现
- 直接 YouTube 嵌入有效，但自动频道直播无效

**解决方案：**
检查您的 YouTube 频道中是否有旧的或即将进行的预定直播并删除它们：

1. 转到您的 YouTube Studio。
2. 导航到 **Content** 然后 **Live**。
3. 查找任何旧的预定直播或即将进行的预定流。
4. 删除这些旧的或预定的直播条目。
5. 再次测试您的直播页面。

:::warning
当您的频道中有多个预定或过去的直播条目时，YouTube 的自动频道直播嵌入可能会被阻止。移除这些允许 YouTube 正确识别并提供您当前的直播。
:::

**额外要求：**
- 您的直播必须设置为 **Public**（而非 Unlisted 或 Private）。
- 必须在您的 YouTube 流设置中允许嵌入。
- 确保您使用的是 **Current YouTube Live Stream** 提供程序（带频道 ID），而不是 **YouTube** 提供程序（带视频 ID）。

## 后续步骤

- [管理讲道](managing-sermons) -- 向您的库添加讲道
- [播放列表](playlists) -- 将讲道组织成系列
