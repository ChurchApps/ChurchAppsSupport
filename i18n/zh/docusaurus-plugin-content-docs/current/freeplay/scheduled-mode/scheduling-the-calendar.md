---
title: "安排日历"
---

# 安排日历

<div class="article-intro">

FreePlay Admin 中的 **Calendar** 页面用于控制每个屏幕组播放什么内容以及何时播放。你可以为播放列表、服务计划或提供商文件夹添加排程，并将其设置为每周重复或仅播放一次。当没有任何排定内容时，该组的默认循环会播放。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 至少创建一个屏幕组。参见[管理屏幕和组](./managing-screens#screen-groups)
- [制作播放列表](./building-playlists)，或在 B1 Admin 中已设置好服务计划类型

</div>

## 查看日历

1. 进入 **Calendar**。
2. 从顶部的标签中选择一个屏幕组。每个标签都会显示该组有多少个排程。
3. 周视图从周一到周日，时间为早上 6 点到晚上 10 点。红线标示当前时间。
4. 使用箭头切换到上一周或下一周，或点击 **Today** 返回本周。

页面副标题会显示日历所使用的时区。排程遵循你教会的时区，该时区可在 B1 Admin 的 [Church Information](../../b1-admin/settings/church-settings.md#time-zone) 下设置。如果教会没有设置时区，FreePlay 会使用你所在校区的时区。日历和你的电视使用相同的时区，因此在日历上放置于上午 9:00 的排程，会在屏幕上于上午 9:00 播放，即使你的电脑设置了不同的时区。

排程按类型进行颜色编码。图例会说明各种颜色的含义：

- **Default loop**——斜纹背景，当该组设有默认循环时，它会显示在所有内容的后面
- **Playlist**（播放列表）
- **Service plan**（服务计划）
- **Provider folder**（提供商文件夹）

每个区块都会显示其名称；较高的区块还会显示时间、是否重复（**weekly** 或 **once**），以及内容提前结束时会发生什么。

## 设置默认循环

默认循环会在没有任何排定内容时，在该组的屏幕上播放。

1. 在 **Calendar** 页面中，点击页眉中的 **Default loop…**。如果已设置默认循环，该按钮会显示 **Default loop:**，后跟播放列表的名称。
2. 选择一个 **Playlist**，或选择 **None — screen goes dark**。
3. 点击 **Save**。

## 添加排程

有三种方式可以开始新建排程：

- 点击日历上的空白处。表单会打开，并已填入该日期和半小时时段。
- 点击页眉中的 **Add schedule**。
- 从命令面板（**Ctrl+K** 或 **⌘K**）中选择 **Add schedule**。

然后填写表单：

1. **Play**——选择要播放的内容：
   - **Playlists**——你制作的任何播放列表
   - **Service plans**——来自 B1 Admin 的计划类型，标有 **(current plan)**。屏幕会在每周播放该计划类型当前的计划，包括 Go Curriculum 课程（也包括你自定义的课程），这些课程使用与该计划类型所属事工关联的 Go 登录
   - **Provider folder…**——打开 **Choose a provider folder**。浏览到某个文件夹并点击 **Use this folder**。若要稍后更换文件夹，请点击 **Change**
2. **Repeats**——选择该排程播放的星期几。若只需单个日期，请改为开启 **One time** 并选择 **Date**。
3. **Start** 和 **End**——排程开始和停止的时间。
4. **If it finishes early**——当内容在结束时间之前播完时的处理方式：
   - **Loop until the end time**——从头开始重新播放。适合标识循环、公告和倒计时
   - **Teacher paced**——幻灯片会等待老师的遥控器。课程会一直显示到最后一张幻灯片，即使超过结束时间
   - **Play once, then go back to the default loop**——播放一次，然后返回默认循环
5. 对于重复的排程，将 **Starts** 设为第一个日期。在 **Ends** 下，选择 **Never**，或选择 **On date** 并输入 **End date**。
6. 点击 **Save**。

:::info
**Teacher paced** 取代了较早的“保持最后一张幻灯片”选项。使用该选项保存的排程现在将以 teacher paced 方式播放。
:::

## 编辑或删除排程

1. 点击日历上该排程的区块。
2. 修改任意字段并点击 **Save**，或点击 **Delete** 删除该排程。

## 重叠的排程

如果两个排程重叠，表单会显示一条警告：**Overlaps another schedule. The one that starts later wins.**（与另一个排程重叠。开始较晚的排程优先。）在较晚的排程运行期间，屏幕会播放它。当它结束时，如果较早的排程仍在运行，屏幕会切换回较早的排程。

## 屏幕如何获取更改

已配对的屏幕会下载未来 7 天内排定的所有内容，并会自行检查更改。编辑日历后，你无需再去操作电视。要查看屏幕是否已具备所需的全部内容，请查看 [Screens 页面](./managing-screens)上的 **Ready through**。

## 相关文章

- **[制作播放列表](./building-playlists)**——创建你要排程的播放列表
- **[电视上的定时播放](./scheduled-playback)**——老师控制节奏的课程以及遥控器在电视上的工作方式
- **[管理屏幕和组](./managing-screens)**——添加组并检查每个屏幕的下载情况
