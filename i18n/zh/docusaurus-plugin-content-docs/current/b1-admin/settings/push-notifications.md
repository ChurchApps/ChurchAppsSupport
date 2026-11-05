---
title: "推送通知"
---

# 推送通知

<div class="article-intro">

**Push Notifications**（推送通知）页面可让您向使用教会 B1.church 应用的所有人，或向某个小组，立即或在您设定的时间发送推送通知。该页面还会列出等待发送的通知，方便您编辑、立即发送或取消，并显示近期通知的送达情况。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 若要发送给 **Everyone with the app**（所有使用应用的人），您需要 **Edit Content**（编辑内容）权限；若要发送给小组，则需要 **Edit Group Members**（编辑小组成员）权限。拥有其中任一权限，**Push Notifications** 页面都会出现在 **Mobile** 下。请参阅[角色与权限](./roles-permissions.md)。
- 通知只会发送给已安装 [B1.church 应用](/docs/b1-church/getting-started/installing-pwa)并允许接收通知的成员。

</div>

## 打开页面

1. 在 B1 Admin 中，打开[Jump 菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），并展开 **Mobile**。
2. 点击 **Push Notifications**（`/mobile/notifications`）。

页面上的所有时间均以教会所在的时区显示（如果教会未设置时区，则以您浏览器的时区显示）。页面会注明所用的时区，例如 *"Times are in America/Chicago."*（时间以 America/Chicago 时区显示。）

## 发送或排定通知

1. 点击页面顶部的 **Send Notification**（发送通知）。
2. 在 **Audience**（受众）下，选择 **Everyone with the app**（所有使用应用的人），或选择您的某个小组。
3. 填写通知内容：
   - **Title**（标题）（**必填**）——简短摘要，最多 80 个字符。
   - **Message**（消息）（**必填**）——通知正文，最多 240 个字符。
   - **Open link or flyer URL**（打开链接或传单网址）（*可选*）——点击通知时打开的应用相对路径（例如 `/mobile/groups`），或完整的 `https://` 网址。若不填写链接，全教会通知会打开成员的通知列表，小组通知则会打开该小组。
   - **Image URL**（图片网址）（*可选*）——在支持的设备上随通知一同显示的 `https://` 图片。
4. 在 **When**（何时）下，选择 **Send now**（立即发送），或选择 **Schedule for later**（稍后排定），然后选择 **Send at**（发送时间）的日期和时间。时间必须是未来的时间。
5. 点击 **Send Notification**（或排定通知时点击 **Schedule Notification**）。

对话框中的预览会显示通知的外观，以及可以接收该通知的人数。立即发送的通知至少需要有一位可接收通知的人。排定的通知即使当下没有可接收的人，也可以保存，因为收件人会在发送时重新核对。

排定后，对话框会确认发送时间，并提醒您可以在 **Mobile > Push Notifications** 下查看、编辑或取消该通知。

:::tip
您也可以从某个小组页面，使用该页面上的 **Notify**（通知）按钮，向该小组发送或排定一条通知。参见[向小组成员发送推送通知](../groups/group-members.md#sending-push-notifications-to-group-members)。
:::

## 管理已排定的通知

**Scheduled**（已排定）卡片会列出等待发送的通知，并显示其 **Send at** 时间、**Audience**（受众）和 **Notification**（通知）文字。每条通知都有三项操作：

- **Edit**（编辑）——更改标题、消息、链接、图片或发送时间。受众无法更改；如需更改受众，请取消该通知并新建一条。
- **Send now**（立即发送）——不再等待，立即发送。点击 **Send now** 确认。
- **Cancel**（取消）——阻止该通知发出。点击 **Cancel notification**（取消通知）确认。

没有等待中的通知时，卡片会显示 *"Nothing is scheduled."*（暂无排定的通知。）

## 查看近期通知

**Recent**（近期）卡片会列出已发送或已停止的通知，并显示其 **Sent at**（发送时间）、**Audience**、**Notification** 文字和 **Status**（状态）：

- **Sent: X of Y**（已发送：X / Y）——该通知送达的人数，占受众中总人数的比例。
- **Failed**（失败）——发送失败，并显示错误信息。B1 会对失败的发送最多重试三次，之后才会标记为失败。
- **Cancelled**（已取消）——在发送前被取消。
- **Missed (the send time passed)**（已错过（发送时间已过））——未能在发送时间后 30 分钟内发出，因此已跳过，而不会延迟发送。

## 谁会收到通知

- **Everyone with the app** 会发送给教会中每一位已安装 B1.church 应用并允许接收通知的人，但发送者本人除外。
- 小组通知会发送给该小组中已安装应用并允许接收通知的成员。
- 如果成员在其[通知偏好设置](/docs/b1-church/getting-started/notification-preferences)中关闭了 **Church Announcements**（教会公告）的推送，则不会收到全教会通知。

## 相关文章

- [向小组成员发送推送通知](../groups/group-members.md#sending-push-notifications-to-group-members)
- [移动应用设置](./mobile-app.md)
- [活动提醒](../calendars/event-reminders.md)
- [通知偏好设置](/docs/b1-church/getting-started/notification-preferences)
