---
title: "可用性日历"
description: "在 B1 Admin 中设置可预订的房间和设备，然后在日历上进行预订，添加准备/收拾缓冲时间，并处理定期或需要审批的预订。"
---

# 可用性日历

<div class="article-intro">

可用性日历让你俯瞰教会所有房间和资源的预订情况。在这里，你可以查看已排定的安排，在冲突发生之前及时发现，并直接为任何活动预订房间或资源。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 在"房间与资源"板块中至少设置一个[房间或资源](./rooms-resources.md)
- 你需要 **Edit Content** 权限

</div>

## 打开可用性日历 {#opening-the-availability-calendar}

在 B1 Admin 中，打开[跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），展开 **Calendars**，然后点击 **Availability**。

## 查看日历 {#reading-the-calendar}

日历默认显示当前月份。使用页面顶部的 **Today**、**Back** 和 **Next** 切换日期，使用 **Month**、**Week**、**Day** 或 **Agenda** 切换视图。

每项预订都会根据状态以颜色区分：

| 颜色 | 含义 |
|-------|---------|
| 绿色 | 已批准 |
| 橙色 | 待审批 |
| 灰色 | 已封锁（不可用），显示为 *Blocked: 原因* |

每项预订都会显示活动标题，随后是其使用的房间和资源。将鼠标悬停在预订上可查看完整文字。点击预订即可打开并编辑其活动。

## 按房间或资源筛选 {#filtering-by-room-or-resource}

使用左上角的 **Room / Resource** 下拉菜单，将日历缩小到单个房间或资源。选择 **All rooms & resources** 可返回完整视图。

## 预订房间或资源 {#booking-a-room-or-resource}

1. 点击页面顶部的 **Book** 按钮。
2. 随即打开 **New Event** 对话框——与日历中使用的编辑器相同（参见[添加和编辑活动](./creating-calendars.md#adding-and-editing-events)）。填写活动详细信息：
   - **Group**（*必填*）——活动所属的小组。如果你已设置[模板](./rooms-resources.md#event-templates)，还可以选择一个 **Template** 来填充其余内容。
   - **Title**（*必填*）
   - **Start** 和 **End** 日期/时间（*必填；End 必须晚于 Start*）
   - **Visibility**——Public（公开）或 Private（私密）
   - **Rooms**——选择一个或多个要预留的房间
   - **Resources**——选择一个或多个要预留的资源
3. 选定房间或资源后，即可设置 **Setup (min before)**（活动前准备时间）和 **Teardown (min after)**（活动后收拾时间）。这两项会在预订的两端各增加一段时间，使场地在准备和收拾期间也被预留，而活动的开始和结束时间保持不变。
4. 若要重复预订，请先设置 **Start**，然后勾选 **Repeats** 并配置重复规则：
   - **Interval**——重复的频率（例如，选择 2 并搭配 Week，表示每两周一次）。
   - **Frequency**——Day（每日）、Week（每周）或 Month（每月）。按周重复时可选择一周中的特定日期；按月重复时可选择每月的固定日期，或"第二个星期二"之类的相对规则。
   - **Ends**——**Never**（永不结束）、**On** 某个特定的 **End Date**（在某日结束），或 **After** 设定的次数（在若干次后结束）。
5. 若要设置自定义的预订时段（与活动的开始/结束时间不同），请开启 **Custom reservation window**，并输入 **Reserve from** 和 **Reserve until**。此设置会取代准备和收拾时间。当房间需要在活动所列时段之外可用时，请使用此功能。
6. 点击 **Save** 提交预订。

:::info
如果房间或资源设置了**审批小组（Approval Group）**，该预订将显示为 **Pending**，直到在审批页面获得批准为止——除非你本人是该小组成员，此时预订会立即获得批准。有关审批流程，请参阅[日历审批](./approvals.md)。
:::

:::tip
如果在该时间房间或资源已被预订或封锁，编辑器在你保存前会显示警告。如果看到冲突警告，请调整时间或选择其他房间。
:::

## 相关文章 {#related-articles}

- [房间、资源与排期](./rooms-resources.md)——设置可预订的场地和设备
- [日历审批](./approvals.md)——批准或拒绝预订申请
- [创建日历](./creating-calendars.md)——管理活动日历
