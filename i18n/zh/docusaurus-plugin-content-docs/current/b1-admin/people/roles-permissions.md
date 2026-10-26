---
title: "分配角色"
---

# 分配角色

<div class="article-intro">

B1 Admin 采用基于角色的权限系统，用于控制团队中每位用户能够查看和执行的操作。通过分配角色，您可以让员工和志愿者只访问他们所需的区域，而不会超出范围。妥善的角色管理能够保障您的教会数据安全，同时让团队更加高效地工作。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 您需要具备 **Domain Admin** 访问权限，或具有在 B1 Admin 中管理 **Settings** 权限的角色。
- 您要分配角色的人员必须已存在于您的通讯录中。如果您需要先添加他们，请参阅[添加人员](adding-people.md)。

</div>

## 了解角色

角色是一组权限，您可以将其分配给一个或多个用户。例如，您可以创建一个"财务团队"角色，授予其访问[奉献记录](../donations/recording-donations.md)的权限；或创建一个"签到志愿者"角色，仅允许其访问[考勤功能](../attendance/check-in.md)。

每个角色控制对 B1 Admin 特定区域的访问，包括：

- **People**（人员）：查看和编辑会员个人资料。人员记录中的笔记部分需要 **Edit People** 权限，而单独的 **View Confidential Notes**（查看机密笔记）权限控制对机密笔记部分（用于牧养关怀、个人历史及类似的敏感笔记）的访问。**View People Names Only**（仅查看人员姓名）允许某人仅通过姓名查找人员（只能看到姓名、照片和会员状态），而无法访问完整的通讯录。与 **View Attendance**（查看考勤）或 **Edit Attendance**（编辑考勤）结合使用时，它允许志愿者打开**小组**并按姓名查看班级点名册；若同时拥有 **Edit Attendance**，他们还可以[记录考勤](../attendance/recording-attendance.md)。请参阅[仅查看人员姓名](../settings/roles-permissions.md#people-names-only)。
- **Donations**（奉献）：管理捐款和财务报告。**Enter Donations**（录入奉献）是面向点数团队的较窄权限选项：它允许某人录入奉献，但仅限于仍处于开放状态的[批次](../donations/batches.md#who-can-change-a-batch)。
- **Attendance**（考勤）：记录和查看考勤数据
- **Forms**（表单）：创建和管理[自定义表单](../forms/creating-forms.md)
- **Groups**（小组）：管理[小组成员](../groups/group-members.md)和日历
- **Settings**（设置）：配置全教会范围的设置

:::warning
**Domain Admins**（域管理员）拥有 B1 Admin 每个区域的完全访问权限。他们的权限无法被编辑或限制。请仅将此角色用于您的主要管理员。
:::

## 查看和管理角色

1. 打开 [Jump 菜单](../introduction.md#getting-around-with-the-jump-menu)（B1 Admin 左上角的搜索栏），并展开 **Settings**。
2. 点击 **Roles**（角色）。
3. 您将看到您教会配置的所有角色列表，其中的 **Members**（成员）列显示每个角色中有多少用户。
4. 点击任意角色，即可查看其成员和权限。

## 为角色添加用户

1. 在 Jump 菜单中，选择 **Settings > Roles**。
2. 点击您想要为其添加用户的角色。
3. 在 **Members** 部分中，按姓名搜索该人员。
4. 点击 **Add** 将其分配到该角色。

该用户在下次登录时，将拥有该角色的所有相关权限。

## 编辑角色权限

1. 在 Jump 菜单中，选择 **Settings > Roles**。
2. 点击您想要修改的角色。
3. 在 **Permissions**（权限）部分中，勾选或取消勾选您希望该角色可以访问的区域。每个权限组都会显示其中已勾选的权限数量（例如 **2 of 5**）。
4. 每次勾选或取消勾选复选框后，更改都会立即保存。

:::tip
遵循最小权限原则，即只为每个角色授予其真正需要的权限。这样可以保障您的数据安全，并降低意外更改的可能性。
:::

## 常见角色示例

- **Office Staff**（办公室员工）：可访问 People、Donations、Attendance 和 Forms
- **Group Leaders**（小组负责人）：仅可访问[小组](../groups/creating-groups.md)
- **Check-In Volunteers**（签到志愿者）：仅可访问[考勤](../attendance/check-in.md)
- **Finance Team**（财务团队）：可访问[奉献](../donations/recording-donations.md)和报告
- **Counting Team**（点数团队）：拥有 **Enter Donations** 和 **View Donations**，使志愿者能够将奉献录入未关闭的批次中，而无需查看奉献汇总

请参阅[角色与权限](../settings/roles-permissions.md)，了解奉献和人员相关权限的更多细节。
