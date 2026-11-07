---
title: "分配角色"
description: "在 B1 Admin 中分配角色，使员工和志愿者只能访问其所需的人员、奉献、考勤和小组区域。"
---

# 分配角色

<div class="article-intro">

B1 Admin 采用基于角色的权限系统，用于控制团队中每位用户能看到和操作的内容。通过分配角色，你可以让工作人员和志愿者只访问其所需的区域——不多不少。合理的角色管理既能保障教会数据的安全，又能帮助团队高效工作。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 你需要拥有 **Domain Admin**（域名管理员）权限，或在 B1 Admin 中拥有管理 **Settings**（设置）权限的角色。
- 你要分配角色的人员必须已存在于你的通讯录中。如果需要先添加他们，请参阅[添加人员](adding-people.md)。

</div>

## 了解角色

角色是一组权限的集合，可以分配给一个或多个用户。例如，你可以创建一个"财务团队"角色，授予其访问[奉献记录](../donations/recording-donations.md)的权限；或者创建一个"签到志愿者"角色，只允许其访问[出勤功能](../attendance/check-in.md)。

每个角色都控制对 B1 Admin 特定区域的访问，包括：

- **People（人员）** —— 查看和编辑会员资料。人员记录上的 Notes（备注）区域需要 **Edit People** 权限，而单独的 **View Confidential Notes**（查看保密备注）权限则控制对 Confidential Notes 区域的访问（用于牧养关怀、个人经历以及类似的敏感备注）。**View People Names Only**（仅查看人员姓名）允许某人仅通过姓名查找人员（只能看到姓名、照片和会籍状态），而无法访问完整的通讯录。与 **View Attendance**（查看出勤）或 **Edit Attendance**（编辑出勤）结合使用时，它能让志愿者打开**小组**并按姓名查看班级名单；拥有 **Edit Attendance** 的人员还可以[记录出勤](../attendance/recording-attendance.md)。参见[仅显示姓名](../settings/roles-permissions.md#people-names-only)。
- **Donations（奉献）** —— 管理捐献和财务报表。**Enter Donations**（录入奉献）是为清点团队设计的更精简选项：它允许某人录入奉献，但仅限于仍处于开放状态的[批次](../donations/batches.md#who-can-change-a-batch)。
- **Attendance（出勤）** —— 记录和查看出勤数据
- **Forms（表单）** —— 创建和管理[自定义表单](../forms/creating-forms.md)
- **Groups（小组）** —— 管理[小组成员资格](../groups/group-members.md)和日历
- **Settings（设置）** —— 配置全教会的设置

:::warning
**Domain Admins**（域名管理员）可完全访问 B1 Admin 的每个区域。他们的权限无法被编辑或限制。请仅将此角色分配给主要管理员。
:::

## 查看和管理角色

1. 打开[快速跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（B1 Admin 左上角的搜索栏），展开 **Settings**。
2. 点击 **Roles**。
3. 你会看到教会中配置的所有角色列表，其中 **Members** 列会显示每个角色中的用户人数。
4. 点击任意角色，即可查看其成员和权限。

## 为角色添加用户

1. 在快速跳转菜单中，选择 **Settings > Roles**。
2. 点击你要为其添加用户的角色。
3. 在 **Members** 部分，按姓名搜索该人员。
4. 点击 **Add**，将其分配到该角色。

该用户在下次登录时，即会拥有与该角色相关联的所有权限。

## 编辑角色权限

1. 在快速跳转菜单中，选择 **Settings > Roles**。
2. 点击你要修改的角色。
3. 在 **Permissions**（权限）部分，勾选或取消勾选你希望该角色访问的区域。每个权限组都会显示其中已勾选的权限数量（例如 **2 of 5**）。
4. 每次勾选或取消勾选复选框后，更改都会立即保存。

:::tip
遵循最小权限原则——只为每个角色授予其真正需要的权限。这样可以保障数据安全，并减少意外更改的可能性。
:::

## 常见角色示例

- **办公室工作人员** —— 可访问人员、奉献、出勤和表单
- **小组负责人** —— 仅可访问[小组](../groups/creating-groups.md)
- **签到志愿者** —— **Checkin** 出勤权限，即登录[签到自助机](../attendance/check-in.md)的账号所需的权限
- **财务团队** —— 可访问[奉献](../donations/recording-donations.md)和报表
- **清点团队** —— **Enter Donations** 和 **View Donations**，使志愿者可以将奉献录入开放的批次中，而无需查看奉献汇总

有关奉献和人员权限的更详细说明，请参阅[角色与权限](../settings/roles-permissions.md)。
