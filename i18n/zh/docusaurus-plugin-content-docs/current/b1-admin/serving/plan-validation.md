---
title: "计划验证与通知"
description: "在 B1 Admin 中检查服事计划是否存在未填补的岗位、排班冲突以及不可排班的志愿者，然后一键向全体团队发送推送通知。"
---

# 计划验证与志愿者通知

<div class="article-intro">

B1 Admin 会在主日到来之前自动检查你的计划是否存在问题，包括未填补的岗位、排班冲突，以及已标记该日期不可服事的志愿者。当一切就绪后，你只需点击一次即可通知全体团队。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 创建一份[服事计划](./plans.md)并为岗位分派志愿者
- 为计划添加[礼拜时间](./plans.md)，以便冲突检测可以检查时间重叠
- 确保志愿者已[安装 B1 App](../../b1-church/getting-started/installing-pwa.md)，以便接收推送通知

</div>

## 验证面板 {#the-validation-panel}

每份计划都有一个 **Validation**（验证）面板，在你编排计划时自动运行。打开计划并点击 **Manage serving team**（管理服事团队），即可在岗位旁边看到该面板。计划页面本身会在 **Serving team**（服事团队）下方显示一行摘要（例如 "2 conflicts · 3 not notified"（2 项冲突 · 3 人未通知）），并附有 **Review**（查看）链接，可跳转到完整面板。仍需人员的岗位也会列在计划页面上，因此摘要行只统计冲突和未通知的志愿者。

该面板检查以下内容：

### 未填补的岗位 {#unfilled-positions}
如果某个岗位所需人数多于当前已分派的人数，验证面板会准确列出仍需的人员，例如 *"Sound Tech: 1 more person needed."*（音响技术：还需 1 人。）。在礼拜日到来之前，你可以一目了然地看出计划的人手是否已经配备齐全。

### 排班冲突 {#scheduling-conflicts}
如果某位志愿者在同一计划中被分派到两个时间重叠的岗位，验证面板会标记该冲突，例如 *"Jane Smith: time conflict between Worship Leader and Children's Check-in during Sunday Service."*（Jane Smith：主日礼拜期间，敬拜领导与儿童签到的时间冲突。）。这可以在变成主日早晨的问题之前，发现重复排班的情况。

### 不可服事日期 {#blockout-dates}
志愿者可以在 B1 App 中设置他们无法服事的日期。如果某人被分派到的计划落在其不可服事日期之内，验证面板会自动提示该冲突，以便你找人替补。

### 跨计划冲突 {#cross-plan-conflicts}
验证还会一次性检查你所有的计划。如果同一位志愿者被分派到两份时间重叠的不同计划中，例如上午 9 点和上午 10 点的礼拜都持续到上午 10:30，B1 Admin 会将该人员标记为跨计划重复排班。

### 排班偏好 {#scheduling-preferences}
如果志愿者设置了[排班偏好](./plans.md#scheduling-preferences)，当某项分派与之相悖时，面板会向你发出警告：例如，他们本月被安排的次数超过了 **Max times per month**（每月最多次数），该计划的时间与其 **Preferred service times**（偏好的礼拜时间）均不匹配，或者他们要求不与家庭成员在同一天服事，而该家庭成员也已被安排。

当所有检查都通过时，面板会显示 **Plan is valid.**（计划有效。）

:::tip
你无需执行任何操作来运行验证，每次添加或更改分派时它都会自动更新。在编排计划时，只需留意面板即可。
:::

## 通知志愿者 {#notifying-volunteers}

计划确定后，你可以直接从验证面板一次性通知所有已分派的志愿者。

1. 打开计划，点击 **Manage serving team**（或计划摘要行中的 **Review**（查看））以查看 **Validation** 面板。
2. 如果存在未通知的志愿者，你会看到一个链接，显示需要通知的人数（例如 *"Notify 8 volunteer(s)"*（通知 8 位志愿者））。当所有人都已收到通知后，面板会显示 **All volunteers notified.**（已通知所有志愿者。）
3. 点击该链接，向所有尚未收到通知的人发送推送通知。
4. 志愿者会在手机上收到通知，告知他们已被安排服事，并提示他们确认分派。

:::info
只会包括尚未收到通知的志愿者。如果你之后将某人添加到计划中，该链接会再次出现，以便你只通知新增的人员，而无需重复通知团队其他成员。
:::

### 发布暂定计划 {#publishing-a-penciled-in-plan}

如果计划处于[暂定](./plans.md#plan-settings)状态，志愿者暂时无法看到他们的分派，面板会显示 *"Penciled in — volunteers can't see these assignments yet."*（暂定 — 志愿者暂时无法看到这些分派。），并在通知链接的位置显示一个按钮：

- **Publish Plan**（发布计划）使分派对志愿者可见。
- **Publish & Notify**（发布并通知）（当部分志愿者尚未收到通知时显示，例如 *"Publish & Notify 8 volunteer(s)"*（发布并通知 8 位志愿者））会使分派对志愿者可见，并立即通知这些志愿者。

在对话框中确认即可发布。

### 带有确认工作流的计划 {#plans-with-a-confirmation-workflow}

如果计划设置中指定了[确认工作流](./workflows.md#serving-assignment-confirmations)，面板会显示 *"New requests use the confirmation workflow. App alerts stay enabled. Follow-ups stop when each request is accepted or declined."*（新请求将使用确认工作流。应用内提醒保持开启。每项请求被接受或拒绝后，后续跟进将停止。）在这种情况下：

- 通知链接只统计尚未收到通知且尚未回复的志愿者。
- 点击后会发送常规的应用内提醒，并在该工作流的看板上为每项请求创建一张卡片。随后，工作流会发送电子邮件和短信跟进；如有需要，还会将该请求交给某人进行电话联系。
- 计划必须已发布（而非暂定），并且工作流必须处于启用状态。否则面板会显示 *"Requests could not be issued. Check that the selected workflow is active and the plan is published, then try again."*（无法发出请求。请检查所选工作流是否已启用、计划是否已发布，然后重试。）

:::warning
志愿者必须在主屏幕上安装 B1 App，并开启通知，才能接收推送通知。设置说明请参阅[将 B1.church PWA 安装为应用](../../b1-church/getting-started/installing-pwa.md)。
:::

## 相关文章 {#related-articles}

- [服事计划](./plans.md)
- [工作流](./workflows.md)
- [安装 B1.church PWA](/docs/b1-church/getting-started/installing-pwa)
