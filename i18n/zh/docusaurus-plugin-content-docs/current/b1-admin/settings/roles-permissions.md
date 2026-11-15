---
title: "角色与权限"
description: "在 B1 Admin 中设置角色，控制员工和志愿者可以查看和更改的内容，涵盖奉献、出勤、人员和小组等方面。"
---

# 角色与权限

<div class="article-intro">

角色让你可以控制不同用户在 ChurchApps 账户中可以访问的内容。你可以为员工、志愿者和其他团队成员创建自定义角色，每个角色拥有各自的访问级别，从而保障数据安全。

</div>

## 培训视频 {#training-video}

<YouTube id="ZzCIkinVMnE" title="在 B1 中设置角色、权限并邀请团队" next="在 B1 中设置礼拜和出勤" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>开始之前</h4>

- 你需要拥有 Domain Admin（域管理员）访问权限，或拥有管理角色权限的角色
- 准备好团队成员名单，以及他们需要访问的范围
- 在下文中查看可用的权限类别，以便规划你的角色

</div>

## 进入角色 {#accessing-roles}

1. 在 B1 Admin 中，打开[跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），并展开 **Settings**（设置）。
2. 点击 **Roles**（角色）。
3. 角色页面会显示你教会当前已定义的所有角色。**Members**（成员）列会显示每个角色中的用户数量，**(Everyone)**（所有人）一行显示为 **All users**（所有用户）。

## 创建角色 {#creating-a-role}

点击角色页面顶部的 **Add role**（添加角色）。菜单中提供以下选项：

- **Add Custom Role**（添加自定义角色）-- 在列表上方打开 **Edit Role**（编辑角色）表单。输入 **Role Name**（角色名称），然后点击 **Save**（保存）。新角色初始不包含任何权限。
- **Add "Accounting" Role**（添加"会计"角色）、**Add "Church Staff" Role**（添加"教会员工"角色）、**Add "Content Admin" Role**（添加"内容管理员"角色）和 **Add "Lessons Admin" Role**（添加"课程管理员"角色）-- 预设的角色，已勾选一组合理的权限。B1 会请你确认，然后创建该角色。之后你可以像对待其他角色一样更改其权限。

## 重命名或删除角色 {#renaming-or-deleting-a-role}

将鼠标悬停在某个角色所在行上，然后点击 **Edit**（编辑）。在 **Edit Role** 表单中，更改 **Role Name**（角色名称）并点击 **Save**；或点击 **Delete**（删除）并确认以移除该角色。**Domain Admins**（域管理员）角色无法被删除。

## 了解角色页面 {#understanding-a-roles-page}

点击角色名称即可打开其页面。页面包含两个面板：

- **Members**（成员）（左侧）-- 该角色中的人员，显示其姓名和电子邮件。
- **Edit Permissions**（编辑权限）（右侧）-- 可授予该角色的权限。

**(Everyone)**（所有人）一行会打开一个页面，用于设置适用于教会所有用户的权限；该页面没有成员列表。

## 将用户添加到角色 {#adding-users-to-a-role}

1. 打开角色，点击 **Members** 面板中的 **Add**（添加）。随即打开该角色的 **Add To**（添加到）表单。
2. 在搜索框中输入姓名或电子邮件，然后点击搜索按钮。
3. 点击该人员旁边的添加按钮。他们会立即被加入该角色，B1 会提示你是否发送邀请电子邮件，以便他们登录。
4. 如果该人员尚未属于你的教会，请点击搜索结果下方的 **Create New User**（创建新用户），输入其 **First Name**（名字）、**Last Name**（姓氏）和 **Email**（电子邮件），然后点击 **Save**。

若要更改成员的姓名或电子邮件，请点击其所在行上的编辑图标。

## 将用户从角色中移除 {#removing-users-from-a-role}

1. 打开包含你要移除的用户的角色。
2. 在 **Members** 列表中找到该人员。
3. 点击其所在行上的删除图标并确认。

你的教会必须始终至少有一名域管理员，因此 **Domain Admins** 中的最后一名成员无法被移除。

## 配置权限 {#configuring-permissions}

每个角色都可以被授予 B1 Admin 中特定区域的访问权限。在 **Edit Permissions** 面板中，权限按可展开的版块分组，例如 **Attendance**（出勤）、**Content**（内容）、**Donations**（奉献）、**Forms and Plans**（表单与计划）、**Lessons**（课程）、**Messaging**（消息）、**People and Groups**（人员与小组）以及 **Tasks**（任务）。在 **Filter permissions**（筛选权限）框中输入内容，即可只显示匹配的权限。

勾选或取消勾选某项权限，即可为该角色授予或移除该权限。每次更改都会立即保存，没有保存按钮。请注意，用于打开设置页面的 **Edit Church Settings**（编辑教会设置）位于 **Content** 版块中。每个版块标题会显示该角色拥有的权限数量，例如 **2 of 5**（5 项中的 2 项），并且随着你勾选和取消勾选复选框而实时更新。

### 奉献权限 {#donations-permissions}

**Donations**（奉献）版块包含以下权限：

- **View Donation Summaries**（查看奉献汇总）-- 查看奉献版块，包括汇总、批次、基金、活动和奉献报告页面。
- **View Donations**（查看奉献）-- 查看单笔奉献记录，例如某个批次中的各笔奉献。
- **Edit Donations**（编辑奉献）-- 完全控制：添加、编辑和删除奉献及批次，并[关闭和重新打开批次](../donations/batches.md#closing-and-reopening-a-batch)。
- **Enter Donations**（录入奉献）-- 添加批次，并录入、编辑或删除奉献，但仅限于仍处于开放状态的批次。只拥有此权限的人员无法删除批次、关闭或重新打开批次，也无法更改通过在线奉献进入的奉献记录。
- **Edit Settings**（编辑设置）-- 管理奉献设置。

拥有 **Enter Donations** 但没有 **View Donation Summaries** 的人员，在 **Donations** 下只能看到 **Batches**（批次）页面。请为点票团队同时授予 **Enter Donations** 和 **View Donations**，以便他们能够打开批次并查看自己录入的奉献。详情请参阅[谁可以更改批次](../donations/batches.md#who-can-change-a-batch)。

### 仅限人员姓名 {#people-names-only}

**People and Groups**（人员与小组）版块包含 **View People Names Only**（仅查看人员姓名）权限。对于需要按姓名查找人员（例如在搜索框中选择某人）、但无权访问完整名录的志愿者，可以使用此权限。仅拥有此权限时，该人员：

- 可以按姓名搜索人员，并查看最近添加人员的列表，但只能看到每个人的姓名、照片和会员身份状态
- 无法按电子邮件搜索、查看联系方式，或打开 **People**（人员）名录

对于负责记录课堂出勤的志愿者，可将 **View People Names Only** 与 **View Attendance**（查看出勤）或 **Edit Attendance**（编辑出勤）搭配使用。此时，他们菜单中的 **People** 会打开 **Groups**（小组）页面，在那里他们可以打开 **All groups**（所有小组）列表，查看每个班级的成员姓名和聚会记录。拥有 **Edit Attendance** 的人员还可以[记录出勤](../attendance/recording-attendance.md)，并通过搜索姓名添加访客。姓名不会链接到人员记录，除非志愿者本身是成员，否则保密小组仍会保持隐藏。

B1 Admin 会隐藏角色没有权限时无法使用的链接和按钮。例如，**All groups** 列表仅对能够编辑小组、查看小组成员或查看人员的人员开放，或者对同时拥有 **View People Names Only** 以及 **View Attendance** 或 **Edit Attendance** 的人员开放（其他人员会被带回仪表板）；出勤设置仅在拥有 **Edit Services**（编辑礼拜）权限时才会显示；小组的 **Email**（电子邮件）按钮仅对拥有 **Edit Group Members**（编辑小组成员，即发送小组电子邮件所需的权限）的人员显示；打印小组名单需要 **View Group Members**（查看小组成员）权限，或是该小组的负责人；删除日历活动则需要 **Edit Content**（编辑内容）权限（或撤回你自己待处理的请求）。

### 签到自助终端账户 {#check-in-kiosk-accounts}

用于登录 [B1 Checkin](../../b1-checkin/getting-started/logging-in.md) 自助终端的账户，需要 **Attendance**（出勤）版块中的 **Checkin**（签到）权限（或 **Edit Attendance**（编辑出勤））。仅拥有 **Checkin** 权限时，自助终端即可按姓名或电话查找家庭、为其签到和签出，并显示谁可以接走儿童，而无需访问人员名录。

签到权限不再通过 **(Everyone)** 一行授予。即使某人所在的角色拥有其他权限，也无法借此运行自助终端；请将 **Checkin** 添加到诸如 "Check-In Volunteers"（签到志愿者）之类的角色中，并将自助终端账户加入该角色。

:::warning
**Domain Admins**（域管理员）对你的 ChurchApps 账户的所有区域拥有完全访问权限。其权限无法被修改或限制。请仅将此角色分配给你最信任的管理员。
:::

:::tip
可以创建专门的角色，例如仅拥有 **Donations** 访问权限的 "Treasurer"（司库），拥有 **Enter Donations** 和 **View Donations** 的 "Counting Team"（点票团队），或仅拥有 **Attendance** 访问权限的 "Check-In Volunteer"（签到志愿者）。这遵循最小权限原则，有助于保障数据安全。有关 ChurchApps 如何保护你的信息，请参阅[数据安全](./data-security.md)。
:::
