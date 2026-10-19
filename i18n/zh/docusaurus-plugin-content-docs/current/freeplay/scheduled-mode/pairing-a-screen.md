---
title: "配对屏幕"
---

# 配对屏幕

<div class="article-intro">

要将电视加入日程，请使用 **FreePlay Admin** 进行配对。电视会显示一个四位字母代码。你需要在 [admin.freeplay.church](https://admin.freeplay.church) 输入该代码，并选择电视应该跟随的屏幕组日程。每台电视只需配对一次。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 在电视上安装并启动 FreePlay。请参阅[入门指南](../getting-started/)
- 准备好你教会的 ChurchApps 登录账户，以便登录 FreePlay Admin
- 可选：先[创建播放列表](./building-playlists)并[安排日程](./scheduling-the-calendar)，这样电视就能立即有内容播放

</div>

## 在电视上显示代码

1. 在电视上，打开侧边栏底部的 **Settings**。
2. 选择 **Pair to a calendar**。如果电视尚未配对，该行会显示 **Not paired**。
3. **Pair this screen** 屏幕会显示一个二维码和一个四位配对代码，并附带提示信息 **Scan with your phone, or go to freeplay.church/pair and enter this code**（用手机扫描，或访问 freeplay.church/pair 并输入此代码）。
4. 代码下方，**Waiting for confirmation**（等待确认）会在 FreePlay 等待你完成配对时持续闪烁。

代码有效期为 15 分钟，其下方的倒计时会显示剩余时间。时间到期后，FreePlay 会自动显示新代码。你也可以选择 **Generate New Code** 获取新代码，或选择 **Cancel** 返回 Settings。

## 在 FreePlay Admin 中配对

1. 用手机扫描二维码，或在任何电脑或手机上访问 **freeplay.church/pair**。如果系统要求登录，请登录。FreePlay Admin 会打开 **Pair screen** 表单，并已自动填入代码。
   - 你也可以自行打开该表单。在 FreePlay Admin 中进入 **Screens**，然后点击 **Pair screen**。
2. 检查 **Pairing code**。它就是电视上显示的四个字母。
3. 输入一个 **Label**，以便区分这台电视与其他电视，例如 "Lobby left"（大厅左侧）。此项为可选。
4. 在 **Group** 下，选择这台电视应跟随其日程的屏幕组。若要新建一个组，请选择 **＋ New group…**，然后输入 **New group name**。
5. 在 **Mode** 下，保持选中 **Scheduled**。电视会自动按照该组的日程播放。
6. 点击 **Pair**。

电视会显示 **Connected!**，随后显示 **Loading your schedule...**（正在加载你的日程）。它会下载已安排的内容并开始播放。请参阅[电视上的定时播放](./scheduled-playback)。

:::info
如果 FreePlay Admin 显示 **That code didn't match a TV**（该代码与任何电视都不匹配），请检查屏幕上的代码。如果代码已过期，请使用电视当前显示的新代码。
:::

### 定时模式与手动模式

**Mode** 设置有两个选项：

- **Scheduled** —— 按照该组的日程自动播放。无需有人按下 Start。
- **Manual** —— 由人员使用遥控器选择内容。手动屏幕仍会出现在你的 **Screens** 列表中，但它不跟随日程，因此 **Group** 字段会被禁用。

你之后可以在[屏幕页面](./managing-screens)中通过 **Edit** 更改屏幕的模式。

## 改为配对到服务计划

**Pair this screen** 屏幕上的代码在 B1 Admin 中同样有效。如果你在那里输入该代码，并在 **Show Plans For** 下选择计划类型，电视将跟随该计划类型在[计划模式](../plan-mode/)中播放，而不是跟随日程。请参阅[配对你的设备](../plan-mode/device-pairing)。

## 在电视上更改或取消配对 {#changing-or-unpairing-from-the-tv}

电视配对后，**Settings** 中的 **Pair to a calendar** 行会显示它所跟随的屏幕组名称。选择该行即可打开 **Paired to** 对话框，其中有三个选项：

- **Keep** —— 关闭对话框。不做任何更改。
- **Unpair** —— 停止跟随日程。FreePlay 会打开 **Content Providers** 屏幕。
- **Pair to a different calendar** —— 取消配对，然后显示新的配对代码，以便重新配对电视。

:::warning
取消配对会删除 FreePlay 为该日程下载的文件。
:::

## 在 FreePlay Admin 中取消配对

1. 进入 **Screens**，然后点击该屏幕的名称。
2. 点击 **More**，然后点击 **Unpair**。
3. 再次点击 **Unpair** 进行确认。

电视会重新显示配对代码。如果你想再次使用它，可以随时重新配对。

## 相关文章

- **[管理屏幕和屏幕组](./managing-screens)** —— 重命名屏幕、将其移动到其他组，或查看其下载内容
- **[安排日程](./scheduling-the-calendar)** —— 决定该组屏幕播放的内容
- **[选择配对模式](../getting-started/pairing-modes)** —— 比较定时模式与计划模式，以及自行浏览内容提供商
