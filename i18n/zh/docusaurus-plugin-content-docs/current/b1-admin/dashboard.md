---
title: "仪表板"
description: "了解 B1 Admin 仪表板显示的内容：本周的聚会程序、服事人员和签到情况、需要关注的事项，以及你的任务和小组。"
---

# 仪表板

<div class="article-intro">

仪表板是 B1 Admin 的首页。登录时会自动打开，其内容围绕教会每周的聚会来组织：即将到来的计划的聚会程序、服事人员、本主日在场的人员、等待你处理的事项，以及你自己的任务和小组。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 登录 [B1 Admin](https://admin.b1.church)。每位已登录的用户都有仪表板，但其显示内容取决于你的[角色和权限](./settings/roles-permissions.md)。
- 使用[计划](./serving/plans.md)以及[考勤](./attendance/index.md)或[签到](./attendance/check-in.md)后，聚会相关板块才会填充内容。

</div>

## 打开仪表板 {#opening-the-dashboard}

- 登录——B1 Admin 会默认打开仪表板。
- 点击任意页面左上角的小型教会徽标。
- 打开[跳转菜单](./introduction.md#getting-around-with-the-jump-menu)（点击搜索栏，或按 **Ctrl+K** / **Cmd+K**），然后选择 **Dashboard**。

## 本周聚会 {#this-weeks-service}

顶部的大卡片显示一个聚会计划：即上一个主日与本周日之间的下一个即将到来的计划；如果没有即将到来的计划，则显示上一个主日的计划。如果同一天有多个计划，则优先显示使用聚会程序的计划，其次是聚会时间最早的计划。

- **日期行**——计划的星期、日期和第一个聚会时间（例如 *星期日 · 11 月 15 日 · 上午 9:00*）。
- **标题**——计划的名称。如果你可以打开该计划（你可以编辑计划、属于该计划所属的事工，或正在参与该计划的服事），标题会链接到该[计划](./serving/plans.md)。
- **聚会程序**——计划[聚会程序](./serving/service-order.md)中的每一项，并附有根据第一个聚会时间和每项的时长推算出的开始时钟时间。聚会进行期间，当前项目会被高亮显示。

如果本周没有计划，卡片会显示 **No service planned this week.**（本周未安排聚会）；如果该计划没有聚会程序，则显示 **No order of service on this plan.**（该计划没有聚会程序）。可以编辑计划的人员会在这两种提示旁边看到 **Plans** 链接。

### 服事人员与在场人员 {#who-is-serving-and-who-is-in-the-room}

在聚会程序旁边，仪表板会在有相关数据后，显示聚会周边的情况：

| 板块 | 显示内容 |
|---|---|
| **in the room**（在场） | 已签到或已被标记为出席的人数。在主日当天，显示当天人数并带有 **Live** 标记；在一周的其他时间，则显示**上个主日**的人数。如果没有按姓名记录任何人，则使用当天的[人数登记](./attendance/headcount-entry.md)。 |
| **Serving Sunday** / **Serving this hour**（本主日服事/本时段服事） | 计划中安排的所有人员及其岗位，并链接到其人员记录。已拒绝的安排不会显示。 |
| **First time** / **First time last Sunday**（首次到访 / 上个主日首次到访） | 首次到访的访客（具有 *Visitor* 或 *Guest* 会员状态的人员，或以访客身份签到的人员），按家庭分组。 |
| **Rooms**（教室） | 该周每个班级或教室的签到人数；若小组设置了 **Capacity**（容量），则显示容量进度条。 |

在这些数据出现之前，卡片会显示一段简短提示，并附有 **People**、**Attendance** 和 **Plans** 的链接（仅显示你有权打开的链接）。

:::info
人数和姓名来自你的考勤和服事数据，因此只有具备相应查看权限的人员才会看到。例如，查看访客姓名和服事名单需要查看人员的权限，而教室人数则需要查看考勤的权限。
:::

## 需要关注 {#needs-attention}

当有事项等待你处理时，**Needs attention**（需要关注）卡片会列出这些事项并附上链接：

- **pending calendar approvals**（待处理的日历审批）——需要审批的活动以及房间或资源预订。打开[审批](./calendars/approvals.md)页面。对可以编辑内容的人员显示。
- **pending group join requests**（待处理的小组加入申请）——请求加入小组的人员。打开[待处理申请](./groups/group-join-requests.md)列表。对可以编辑小组成员的人员显示。

当没有待办事项时，此卡片会隐藏。

## 我的任务与我的小组 {#my-tasks-and-my-groups}

页面底部包括：

- **My tasks**（我的任务）——列出分配给你的最多四个未完成的[任务](./serving/tasks.md)；点击某项即可打开。点击 **Add Task**（添加任务）即可在此直接创建任务（选择任务相关人员和负责人，然后填写标题、截止日期和备注），或点击 **All tasks**（所有任务）打开 **Serving > My Work**（服事 > 我的工作）。
- **My Groups**（我的小组）——列出你所属的小组；点击某个小组即可打开。如果你可以管理小组或查看人员，**All groups**（所有小组）会打开完整的[小组](./groups/index.md)列表。

## 快捷操作 {#quick-actions}

以前显示在仪表板上的设置快捷方式（例如 **Add Your Church Logo**（添加教会徽标）、**Set Up Online Giving**（设置在线奉献）和 **Create Your First Group**（创建你的第一个小组）），现在位于跳转菜单的 **Quick Actions**（快捷操作）下。请参见[快捷操作](./introduction.md#quick-actions)。

## 相关文章 {#related-articles}

- [简介](./introduction.md)——登录以及使用跳转菜单查找功能
- [通知与消息](./notifications.md)——用户菜单中的提醒和私信
- [计划](./serving/plans.md)和[聚会程序](./serving/service-order.md)——为聚会卡片提供数据的来源
- [签到](./attendance/check-in.md)——人员如何被计入在场人数
