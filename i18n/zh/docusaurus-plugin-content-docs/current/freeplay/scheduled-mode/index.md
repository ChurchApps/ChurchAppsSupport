---
title: "定时模式"
---

# 定时模式

<div class="article-intro">

定时模式可以让 FreePlay 电视自动运行。你需要在 [admin.freeplay.church](https://admin.freeplay.church) 的 **FreePlay Admin** 中制作播放列表，并将其安排到日历上。与该日历配对的每台电视都会下载未来一周的内容，并按照时钟播放已排定的内容，无需有人按下开始。由于文件已经提前下载，即使 Wi-Fi 断开，播放也会继续进行。

</div>

:::tip
FreePlay Admin 使用你的 ChurchApps 登录账号，也就是你用于 B1 Admin 的同一账号。无需另外创建账号。
:::

## 整体结构

FreePlay Admin 有四个主要页面，列在网站顶部：

- **[Screens](./managing-screens)**——你已配对的电视、它们的状态，以及它们所属的**屏幕组**。同一组中的屏幕共用一个日历和一个默认循环
- **[Playlists](./building-playlists)**——你从内容提供商中挑选的图片和视频循环
- **[Calendar](./scheduling-the-calendar)**——每个屏幕组播放什么内容，以及何时播放
- **[Providers](./building-playlists#connecting-providers)**——播放列表所使用的内容来源。每个来源只需为整个教会连接一次

当没有任何排定内容时，某个组的屏幕会播放其**默认循环**。如果该组没有默认循环，屏幕就会变黑。

## 与计划模式的区别

- **[计划模式](../plan-mode/)**会从 B1 Admin 跟随一种服务计划类型。有人在电视上按下 **Start Plan**，课程才会开始播放
- **定时模式**则跟随一个日历。内容会在你设定的时间开始和停止，因此很适合大厅标识、公告循环以及需要在有人走进教室之前就把课程放好的教室

日历条目仍然可以播放服务计划。在添加排程时，在 **Service plans** 下选择计划类型，屏幕就会播放 B1 Admin 中该周当前的计划。这包括 Go Curriculum 课程，即使你已在计划中对其进行了自定义。屏幕会使用与计划类型所属事工在 B1 Admin 中关联的 Go Curriculum 登录，如果该事工没有关联，则使用教会的 Go Curriculum 连接。

## 入门

在你完成以下每一步之前，**Screens** 页面会显示一个 **Get started** 清单，每一步都附有链接：

1. **连接提供商**——在 **Providers** 页面中链接 Dropbox、OneDrive、Lessons.church 或其他来源
2. **制作播放列表**——从提供商中挑选图片和视频
3. **放到日历上**——选择何时播放什么内容，或为该组设置默认循环
4. **配对屏幕**——输入电视上显示的四位代码

点击 **Hide** 可以关闭该清单。

:::tip
按 **Ctrl+K**（Mac 上为 **⌘K**），或点击页眉中的搜索框，即可打开命令面板。在这里你可以跳转到任意页面，或启动一项操作，例如 **Pair screen**、**Add playlist** 或 **Add schedule**。
:::

## 本节内容

- **[配对屏幕](./pairing-a-screen)**——在电视上显示代码，并在 FreePlay Admin 中进行配对
- **[管理屏幕和组](./managing-screens)**——查看状态和下载情况，并将屏幕整理到各个组中
- **[连接提供商并制作播放列表](./building-playlists)**——链接内容来源，并制作图片和视频的循环
- **[安排日历](./scheduling-the-calendar)**——决定何时播放什么内容，以及内容提前结束时会发生什么
- **[电视上的定时播放](./scheduled-playback)**——电视自行执行的操作，以及播放期间如何使用遥控器
