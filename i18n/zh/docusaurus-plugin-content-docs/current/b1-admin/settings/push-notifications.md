---
title: "推送通知"
description: "在 B1 Admin 中向教会应用的所有用户或某个小组发送或定时发送推送通知，然后编辑、发送、取消或清理这些通知。"
---

# 推送通知

<div class="article-intro">

**Mobile**（移动端）下的 **Push Notifications**（推送通知）页面，可以让您立即或在您选择的时间，向使用教会应用的所有人，或某个小组的成员发送推送通知。页面会列出已排定的通知，方便您在其发出前进行编辑、发送或取消，并显示最近通知的历史记录，您可以清除这些记录。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 要发送给 **Everyone with the app**（所有使用应用的人），您需要拥有编辑内容的权限；要发送给小组，您需要拥有编辑小组成员的权限。参见[角色与权限](./roles-permissions.md)。
- 会员只有在[安装教会应用](../../b1-church/getting-started/installing-pwa.md)并允许通知后，才能收到推送。

</div>

## 打开页面

在 B1 Admin 中，前往 **Mobile** 并点击 **Push Notifications**。页面包含 **Scheduled**（已排定）卡片和 **Recent**（最近）卡片。页面上的时间以教会的时区显示（如果教会未设置时区，则以您电脑的时区显示），时区名称会显示在已排定列表的上方。

## 发送或排定通知

1. 点击 **Send Notification**（发送通知）。
2. 选择 **Audience**（受众）：**Everyone with the app**（所有使用应用的人），或您的某个小组。您只能看到您的权限允许的选项。
3. B1 会显示此推送将覆盖的人数——例如 *42 of 60 people using the app have push enabled*（使用应用的 60 人中，有 42 人已开启推送）——以及已关闭推送的人数。您自己不会被包含在您的推送中。
4. 在 **When**（何时）下，选择 **Send now**（立即发送），或选择 **Schedule for later**（稍后定时发送），然后选择未来的 **Send at**（发送时间）日期和时刻。
5. 输入**标题**（最多 80 个字符）和**消息**（最多 240 个字符）。
6. 可选地添加 **Open link or flyer URL**（打开链接或海报网址）（`https` 网址或应用路径，例如 `/mobile/groups`），供推送点击后打开；以及 **Image URL**（图片网址）（`https` 网址），随推送一同显示。
7. 点击 **Send Notification**（或 **Schedule Notification**（定时通知））。

对于定时推送，推送覆盖的人员会在发送时重新检查，因此在此期间加入小组或开启通知的人员也会被包括在内。

您也可以在小组自己的页面上使用 **Notify** 向小组发送推送。参见[向小组成员发送推送通知](../groups/group-members.md#sending-push-notifications-to-group-members)。

:::tip
如果推送没有设置链接，点击它时，全教会的推送会打开应用的通知列表，小组推送则会打开该小组的页面。
:::

## 管理已排定的通知

**Scheduled** 卡片会列出每条等待发出的通知，显示其 **Send at** 时间、**Audience**（受众）、标题和消息。对于每条通知，您可以：

- **Edit**（编辑）——更改受众、时间或文字，然后点击 **Save Changes**（保存更改）。
- **Send now**（立即发送）——不等待，立即发出。
- **Cancel**（取消）——阻止其发出。已取消的通知会移至 Recent 卡片。

正在发出的通知会显示 **Sending**（发送中），且无法更改。

## 最近的通知

**Recent** 卡片列出已发出或已停止的通知，每条都带有 **Status**（状态）：

| 状态 | 含义 |
|--------|---------|
| **Sent: X of Y**（已发送：X / Y） | 推送已发出。*Y* 为可以收到它的人数，*X* 为实际以推送通知形式收到的人数。 |
| **Missed (the send time passed)**（已错过（发送时间已过）） | 当 B1 尝试发送时，该通知已超过 30 分钟，因此未发出。 |
| **Failed**（失败） | 发送失败了三次。错误信息会显示在状态下方。 |
| **Cancelled**（已取消） | 在发出之前已被取消。 |

若要从列表中移除某条通知，请点击其所在行的 **Remove**（移除）。若要清空列表，请点击卡片顶部的 **Clear all**（全部清除）；这会移除您有权管理的所有已发送、失败和已取消的通知。两者都会要求您确认，并且都无法撤销。移除通知并不会将其从已收到它的人那里收回。

:::info
在[通知偏好设置](../../b1-church/getting-started/notification-preferences.md)中关闭了**教会公告**的会员，不会收到这些推送，无论推送是发送给全体还是某个小组。
:::

## 相关文章

- [移动应用设置](./mobile-app.md)
- [小组成员](../groups/group-members.md)
- [角色与权限](./roles-permissions.md)
- [通知偏好设置](../../b1-church/getting-started/notification-preferences.md)
