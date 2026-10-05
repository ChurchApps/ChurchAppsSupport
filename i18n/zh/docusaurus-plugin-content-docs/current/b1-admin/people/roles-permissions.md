---
title: "分配角色"
---

# 分配角色

<div class="article-intro">

B1 Admin 使用基于角色的权限系统来控制团队中每个用户可以看到和执行的操作。通过分配角色，您可以为员工和志愿者提供对他们需要的确切区域的访问权限——仅此而已。恰当的角色管理可以保护您的教会数据安全，同时让您的团队高效工作。

</div>

<div class="prereqs">
<h4>开始前</h4>

- 您需要拥有 **Domain Admin** 访问权限或具有在 B1 Admin 中管理 **Settings** 权限的角色。
- 您想要分配角色的人必须已存在于您的目录中。如果您需要先添加他们，请参见 [添加人员](adding-people.md)。

</div>

## 了解角色

角色是您分配给一个或多个用户的一组权限。例如，您可能创建一个"财务团队"角色，该角色授予对 [捐赠记录](../donations/recording-donations.md) 的访问权限，或者创建一个"Check-In 志愿者"角色，该角色仅允许访问 [出勤功能](../attendance/check-in.md)。

每个角色控制对 B1 Admin 特定区域的访问权限，包括：

- **People** -- 查看和编辑成员资料。人员记录上的备注标签页需要 **Edit People** 权限，单独的 **View Confidential Notes** 权限控制对机密备注部分的访问（用于牧养关怀、个人历史和类似的敏感备注）。
- **Donations** -- 管理捐献和财务报告
- **Attendance** -- 记录和查看出勤数据
- **Forms** -- 创建和管理 [自定义表单](../forms/creating-forms.md)
- **Groups** -- 管理 [小组成员](../groups/group-members.md) 和日历
- **Settings** -- 配置教会范围的设置

:::warning
**Domain Admins** 对 B1 Admin 的每个区域都拥有完全访问权限。他们的权限无法编辑或限制。仅为您的主要管理员使用此角色。
:::

## 查看和管理角色

1. 打开 [Jump 菜单](../introduction.md#getting-around-with-the-jump-menu)（B1 Admin 左上角的搜索栏）并展开 **Settings**。
2. 点击 **Roles**。
3. 您将看到为您的教会配置的所有角色的列表。
4. 点击任何角色以查看其成员和权限。

## 向角色添加用户

1. 在 Jump 菜单中，选择 **Settings > Roles**。
2. 点击您想要添加用户的角色。
3. 在 **Members** 部分，按名称搜索该人。
4. 点击 **Add** 将他们分配给该角色。

用户下次登录时将拥有与该角色关联的所有权限。

## 编辑角色权限

1. 在 Jump 菜单中，选择 **Settings > Roles**。
2. 点击您想要修改的角色。
3. 在 **Permissions** 部分，勾选或取消勾选您希望该角色访问的区域。
4. 点击 **Save** 以应用您的更改。

:::tip
遵循最小权限原则 -- 仅为每个角色授予它真正需要的权限。这可以保护您的数据安全并减少意外更改的可能性。
:::

## 常见角色示例

- **Office Staff** -- 访问人员、捐赠、出勤和表单
- **Group Leaders** -- 仅访问 [小组](../groups/creating-groups.md)
- **Check-In Volunteers** -- 仅访问 [出勤](../attendance/check-in.md)
- **Finance Team** -- 访问 [捐赠](../donations/recording-donations.md) 和报告
