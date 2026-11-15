---
title: "指派角色"
description: "在 B1 Admin 中指派角色，让员工与志愿者只能访问其所需的人员、奉献、出席与小组区域。"
---

# 指派角色

<div class="article-intro">

B1 Admin 使用基于角色的权限系统，控制团队中每位用户可以查看与执行的操作。通过指派角色，你可以让员工与志愿者只访问其所需的确切区域——不多也不少。妥善的角色管理能确保教会资料的安全，同时让团队更有效率地工作。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 你需要具有 **Domain Admin** 权限，或拥有在 B1 Admin 中管理**设置**的权限的角色。
- 你要指派角色的人员必须已存在于通讯录中。如果你需要先新增他们，请参阅[新增人员](adding-people.md)。

</div>

## 了解角色 {#understanding-roles}

角色是一组权限，你可以将它指派给一位或多位用户。例如，你可以建立一个"财务团队"角色，授予其[奉献记录](../donations/recording-donations.md)的访问权限；或建立一个"报到志愿者"角色，只允许访问[出席功能](../attendance/check-in.md)。

每个角色都控制 B1 Admin 中特定区域的访问权限，包括：

- **人员**——查看与编辑会员的个人资料。人员记录上的备注区块需要 **Edit People** 权限，另有独立的 **View Confidential Notes** 权限，用于控制对机密备注区块的访问（适用于牧养关怀、个人历史等敏感备注）。**View People Names Only** 让某人只能依姓名查找人员（仅能看到姓名、照片与会员状态），而无法访问完整的通讯录。搭配 **View Attendance** 或 **Edit Attendance**，它能让志愿者打开**小组**并依姓名查看班级名单；若有 **Edit Attendance** 权限，他们还能[登记出席](../attendance/recording-attendance.md)。请参阅[仅限人员姓名](../settings/roles-permissions.md#people-names-only)。
- **奉献**——管理捐献与财务报表。**Enter Donations** 是专为计数团队设计的较窄选项：它允许某人输入奉献，但只限于仍然开启的[批次](../donations/batches.md#who-can-change-a-batch)。
- **出席**——登记与查看出席资料
- **表单**——建立与管理[自定义表单](../forms/creating-forms.md)
- **小组**——管理[小组成员资格](../groups/group-members.md)与日历
- **设置**——配置全教会的设置

:::warning
**Domain Admins** 拥有 B1 Admin 每个区域的完整访问权限。其权限无法被编辑或限制。请只将此角色用于你的主要管理员。
:::

## 检视与管理角色 {#viewing-and-managing-roles}

1. 打开[快速菜单](../introduction.md#getting-around-with-the-jump-menu)（B1 Admin 左上角的搜索栏），并展开 **Settings**。
2. 点击 **Roles**。
3. 你会看到为你的教会设置的所有角色列表，其中的 **Members** 栏会显示每个角色的用户数量。**(Everyone)** 角色适用于所有用户。
4. 点击任何角色，即可查看其成员与权限。

## 将用户加入角色 {#adding-users-to-a-role}

1. 在快速菜单中，选择 **Settings > Roles**。
2. 点击你要加入用户的角色。
3. 在 **Members** 区块中，点击 **Add**。
4. 依姓名搜索该人员（或从**最近的人员**中选取），然后点击其姓名或旁边的新增图标。他们会立即加入该角色。

该用户在下次登录时，便会拥有该角色所对应的所有权限。

## 编辑角色权限 {#editing-role-permissions}

1. 在快速菜单中，选择 **Settings > Roles**。
2. 点击你要修改的角色。
3. 在 **Edit Permissions** 区块中，展开某个权限群组（例如 **People and Groups**、**Donations** 或 **Attendance**），然后勾选或取消勾选你希望该角色拥有的权限。每个群组都会显示其中已勾选的权限数量（例如 **2 of 5**）。在 **Filter permissions** 中输入文字，即可依名称找到某项权限。
4. 每次勾选或取消勾选方框，更改都会立即储存。

:::tip
请遵循最小权限原则——只赋予每个角色其真正需要的权限。这样既能保障资料安全，也能减少误操作的机会。
:::

## 常见角色范例 {#common-role-examples}

- **办公室职员**——访问人员、奉献、出席与表单
- **小组负责人**——仅能访问[小组](../groups/creating-groups.md)
- **报到志愿者**——**Checkin** 出席权限，供登入[报到机](../attendance/check-in.md)的账户使用
- **财务团队**——访问[奉献](../donations/recording-donations.md)与报表
- **计数团队**——**Enter Donations** 与 **View Donations**，让志愿者能将奉献输入开启中的批次，而无需看到奉献摘要

有关奉献与人员权限的详细说明，请参阅[角色与权限](../settings/roles-permissions.md)。
