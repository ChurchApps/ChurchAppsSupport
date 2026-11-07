---
title: "角色与权限"
description: "在 B1 Admin 中设置角色，控制员工和志愿者可以查看和更改的内容，从捐款、出席到人员和小组。"
---

# 角色与权限

<div class="article-intro">

角色可以让你控制 ChurchApps 账号中不同用户的访问权限。你可以为工作人员、志愿者和其他团队成员创建自定义角色，并为每个角色设置相应的访问级别，从而保障数据安全。

</div>

## 培训视频

<YouTube id="ZzCIkinVMnE" title="Roles, Permissions, and Inviting Your Team in B1" next="Setting Up Services and Attendance in B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>开始之前</h4>

- 你需要拥有 Domain Admin（域名管理员）权限，或拥有管理角色权限的角色
- 准备好团队成员名单以及他们需要访问的区域
- 查看下方可用的权限类别，以便规划你的角色

</div>

## 访问角色

1. 在 B1 Admin 中，打开[快速跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），并展开 **Settings**。
2. 点击 **Roles**（角色）。
3. 角色页面会显示你教会目前已定义的所有角色。**Members**（成员）列会显示每个角色中的用户人数，而 **(Everyone)**（所有人）一行则显示 **All users**（所有用户）。

## 了解角色页面

角色页面分为两个面板：

- **左侧** —— 显示分配到所选角色的成员列表。
- **右侧** —— 显示你可以为该角色配置的权限设置。

点击任意角色名称，即可查看和管理其成员及权限。

## 为角色添加用户

1. 选择你要添加成员的角色。
2. 使用左侧的**搜索框**查找你要添加的人员。
3. 从搜索结果中选择该人员。
4. 该人员会立即被添加到此角色中。

## 从角色中移除用户

1. 选择包含你要移除的用户的角色。
2. 在左侧的成员列表中找到该人员。
3. 点击其姓名旁边的**移除按钮**。

## 配置权限

每个角色都可以被授予访问 B1 Admin 特定区域的权限。在 **Edit Permissions**（编辑权限）面板中，权限按部分分组，你可以展开查看，例如 **Attendance**（出勤）、**Content**（内容）、**Donations**（奉献）、**Forms and Plans**（表单与计划）、**Lessons**（课程）、**Messaging**（消息）、**People and Groups**（人员与小组）以及 **Tasks**（任务）。在 **Filter permissions**（筛选权限）框中输入文字，即可只显示匹配的权限。

勾选或取消勾选某项权限，即可为该角色授予或移除该权限。每个部分的标题会显示该角色拥有其中多少项权限（例如 **2 of 5**），并且该数字会随着你勾选或取消勾选复选框而更新。

### 奉献权限

**Donations**（奉献）部分包含以下权限：

- **View Donation Summaries**（查看奉献汇总）—— 查看奉献部分，包括汇总、批次、基金、活动和奉献报表页面。
- **View Donations**（查看奉献）—— 查看单笔奉献，例如批次中的奉献记录。
- **Edit Donations**（编辑奉献）—— 完全控制：添加、编辑和删除奉献及批次，并[关闭和重新开放批次](../donations/batches.md#closing-and-reopening-a-batch)。
- **Enter Donations**（录入奉献）—— 添加批次，并录入、编辑或删除奉献，但仅限于仍处于开放状态的批次。只拥有此权限的人员无法删除批次、关闭或重新开放批次，也无法更改通过在线奉献进入的记录。
- **Edit Settings**（编辑设置）—— 管理奉献设置。

拥有 **Enter Donations** 但没有 **View Donation Summaries** 的人员，在 **Donations** 下只能看到 **Batches**（批次）页面。为清点团队角色同时赋予 **Enter Donations** 和 **View Donations**，这样他们就可以打开批次，查看自己录入的奉献。详情参见[谁可以更改批次](../donations/batches.md#who-can-change-a-batch)。

### 仅显示姓名 {#people-names-only}

**People and Groups**（人员与小组）部分包含 **View People Names Only**（仅查看人员姓名）。它适用于需要按姓名查找人员的志愿者——例如在搜索框中选择某人——而无需访问完整通讯录。仅拥有此权限时，该用户：

- 可以按姓名搜索人员，并查看最近添加的人员列表，但只能看到每个人的姓名、照片和会籍状态
- 无法按电子邮件搜索、查看联系方式，或打开 **People**（人员）通讯录

对于负责记录班级出勤的志愿者，可将 **View People Names Only** 与 **View Attendance**（查看出勤）或 **Edit Attendance**（编辑出勤）搭配使用。此时，其菜单中的 **People** 会打开 **Groups**（小组），他们可以打开 **All groups**（所有小组）列表，查看每个班级的成员姓名和场次。拥有 **Edit Attendance** 的人员还可以[记录出勤](../attendance/recording-attendance.md)，并通过搜索姓名添加访客。姓名不会链接到人员记录，除非志愿者是其成员，否则保密小组将保持隐藏。

B1 Admin 会隐藏角色不具备相应权限的链接和按钮。例如，**All groups** 列表仅对可以编辑小组、查看小组成员或查看人员的人员开放，或对同时拥有 **View People Names Only** 与 **View Attendance** 或 **Edit Attendance** 的人员开放（其他人会被引导回仪表板）；出勤设置仅在拥有 **Edit Services** 时才会出现；小组的 **Email** 按钮仅对拥有 **Edit Group Members**（发送小组邮件所需的权限）的人员显示；打印小组名册需要 **View Group Members** 权限，或者你是该小组的负责人；删除日历活动则需要 **Edit Content**（编辑内容）权限（或撤回你自己待处理的请求）。

### 签到自助机账号 {#check-in-kiosk-accounts}

登录 [B1 Checkin](../../b1-checkin/getting-started/logging-in.md) 自助机的账号需要 **Attendance**（出勤）部分中的 **Checkin**（签到）权限（或 **Edit Attendance**）。仅拥有 **Checkin** 时，自助机即可按姓名或电话查找家庭、为其签到和签出，并显示谁可以接走孩子，而无需访问人员通讯录。

**Checkin** 权限不再通过 **(Everyone)** 一行授予。仅仅属于拥有其他权限的角色，并不能让某人运行自助机；请将 **Checkin** 添加到"签到志愿者"等角色中，并将自助机账号放入该角色。

:::warning
**Domain Admins**（域名管理员）可以完全访问你 ChurchApps 账号的所有区域。他们的权限无法被修改或限制。请仅将此角色分配给你最信任的管理员。
:::

:::tip
可以创建特定的角色，例如只拥有 **Donations** 访问权限的"财务主管"、拥有 **Enter Donations** 和 **View Donations** 的"清点团队"，或只拥有 **Attendance** 访问权限的"签到志愿者"。这样既符合最小权限原则，又能保障数据安全。有关 ChurchApps 如何保护你的信息，请参阅[数据安全](./data-security.md)。
:::
