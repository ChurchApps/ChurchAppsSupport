---
title: "公告"
---

# 公告

<div class="article-intro">

FreePlay 可以在你的电视上循环播放一个公告幻灯片文件夹——例如在大厅里，或在课程开始之前。你可以从已连接的内容提供商中选择一个文件夹，FreePlay 会将其中的幻灯片下载到设备上，并在侧边栏中显示一个 **Announcements** 项目，以便你随时开始循环播放。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- [连接一个内容提供商](./connecting-providers)，该提供商需存放你的公告幻灯片，例如 Dropbox 或 OneDrive
- 将要循环播放的图片或视频放在该提供商的同一个文件夹中

</div>

## 选择公告文件夹

1. 从侧边栏底部打开 **Settings**，然后选择 **Providers**
2. 选择存放你幻灯片的已连接提供商（它会显示 **Connected** 标记），以打开其 **Provider Settings**
3. 选择 **Use for Announcements**
4. 随即打开 **Choose the Announcements Folder** 浏览器。逐级浏览文件夹，直到找到存放幻灯片的文件夹，然后选择该文件夹（或其中的任意文件）
5. FreePlay 会下载幻灯片并返回 **Provider Settings**，此时该行会显示 **Looping "*folder name*" -- *number* slides downloaded**（正在循环播放 "*文件夹名称*" -- 已下载 *数量* 张幻灯片）

同一时间只会使用一个文件夹作为公告。选择另一个提供商的文件夹会替换之前的文件夹。

## 播放公告

幻灯片下载完成后，侧边栏顶部附近会出现一个 **Announcements** 项目（如果你的电视显示了 **Today's Plan**，则位于其下方）。选择它即可开始循环播放。

- 图片会在屏幕上停留 15 秒，除非提供商为该文件指定了自己的时长
- 视频会播放到结束，然后再切换到下一张幻灯片
- 播放到最后一张幻灯片后，循环会从第一张重新开始
- 如果文件夹中只有一个视频，它会原地重复播放

循环播放使用的是保存在设备上的文件，因此即使没有网络连接也能持续运行。你可以使用与其他内容相同的遥控器操作——请参阅[播放内容](./playing-content)。

## 更新幻灯片

FreePlay 每次启动应用时都会检查公告文件夹，下载新的幻灯片，并删除已从文件夹中移除的幻灯片。

如需立即检查，请打开该提供商的 **Provider Settings**，然后选择 **Check for Announcement Updates**。完成后，该行会显示 **Up to date** 以及幻灯片数量。

:::info
如果 FreePlay 无法连接到提供商，或文件夹返回为空，它会继续播放已有的幻灯片。若要完全停止使用公告，请按照下文所述将其关闭。
:::

:::warning
以相同文件名替换为新版本的幻灯片不会被重新下载。若要更改某张幻灯片，请将其作为新文件添加，然后删除旧文件。
:::

## 关闭公告

再次打开该提供商的 **Provider Settings**，然后选择 **Use for Announcements**。FreePlay 会停止使用该文件夹，从设备中删除已下载的幻灯片，并从侧边栏中移除 **Announcements**。

断开提供商的连接也会关闭来自该提供商的公告。

## 相关文章

- **[连接提供商](./connecting-providers)** —— 连接存放你幻灯片的提供商
- **[浏览和下载内容](./browsing-content)** —— 浏览提供商的文件夹，并按需播放内容
- **[播放内容](./playing-content)** —— 电视遥控器的播放器控制
