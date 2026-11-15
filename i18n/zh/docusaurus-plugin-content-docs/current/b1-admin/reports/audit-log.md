---
title: "审计日志"
description: "在 B1 Admin 中查看审计日志，了解谁登录、编辑了人员记录或更改了权限，并将筛选后的条目导出为 CSV。"
---

# 审计日志

<div class="article-intro">

审计日志记录你的教会管理系统中所有重要的操作和更改。你可以用它查看登录活动、追踪谁修改了人员记录、监控权限更新，并确保团队成员各自的操作可以追溯问责。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 需要拥有 **Edit Church Settings** 权限的角色（该权限位于角色权限的 **Content** 部分；同一权限也可打开 **Settings**）。参见[角色与权限](../settings/roles-permissions.md)。

</div>

## 查看审计日志 {#viewing-the-audit-log}

1. 打开[跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（B1 Admin 左上角的搜索栏），展开 **Settings**。
2. 点击 **Audit Log**。
3. 日志以表格形式显示最近的条目，包含以下列：
   - **Date** -- 操作发生的时间。
   - **Module** -- 更改发生在 B1 的哪个模块中（例如成员管理或奉献）。
   - **Category** -- 记录或操作的类型（以颜色区分，便于快速浏览）。
   - **Action** -- 所执行的操作（例如 Donation Saved、Login Success、Note Updated）。
   - **Entity** -- 受影响记录的类型和 ID。
   - **IP Address** -- 执行该操作的用户的 IP 地址。
4. 点击某行开头的箭头可查看其详细信息：列出每个被更改字段及其 **Old Value**（旧值）和 **New Value**（新值）的表格；如果是删除操作，则显示 **Deleted Record**（已删除记录）。

## 筛选日志 {#filtering-the-log}

使用页面顶部的筛选条件缩小结果范围：

- **Module** -- 按区域筛选：**All Modules**、**People**、**Giving**、**Attendance**、**Messaging**、**Content**、**Serving** 或 **Lessons**。
- **Category** -- 按操作类型筛选：
  - **All Categories** -- 显示全部内容。
  - **Login** -- 登录成功和失败记录。
  - **People** -- 创建、更新或删除人员记录。
  - **Permissions** -- 权限的授予和撤销。
  - **Donations** -- 奉献记录的更改。
  - **Groups** -- 小组管理操作。
  - **Forms** -- 表单提交活动。
  - **Settings** -- 配置更改。
- **Start Date** -- 显示从该日期起的条目。
- **End Date** -- 显示截至该日期的条目。

设置筛选条件后，点击 **Search** 更新结果。

## 了解分类 {#understanding-categories}

每条记录的分类以彩色标签显示，便于快速识别：

- **login** -- 蓝色标签。记录成功和失败的登录尝试。
- **person** -- 蓝色标签。记录人员记录的创建、更新和删除。
- **permission** -- 红色标签。记录访问权限的授予或撤销。
- **donation** -- 绿色标签。记录奉献记录的更改。
- **form** -- 橙色标签。记录表单提交活动。
- **group**、**settings** 以及其他分类（例如 **userchurch**）-- 灰色标签。

## 人员和小组的备注历史 {#note-history-on-people-and-groups}

如果你能打开审计日志，你还会在人员或小组的 **Notes**（备注）标签页中，直接看到备注更改的记录：

1. 被编辑过的备注会在日期旁显示 **(edited · view history)**（已编辑 · 查看历史）。点击它即可打开审计日志，并自动筛选为该人员或小组的备注历史。
2. 被删除的备注会留下一个灰色的 **Deleted note**（已删除备注）标记，显示撰写者、发布时间和删除时间。点击 **View history**（查看历史）可打开同样筛选后的日志。
3. 在筛选后的日志中，展开 **Note Updated** 或 **Note Deleted** 条目，即可查看旧文本以及进行更改的账户。点击 **Show all**（显示全部）可清除筛选。
4. 在 **Entity** 列中，人员或小组备注的 ID 会链接回该人员或小组的备注列表。

无法打开审计日志的工作人员看到的备注列表中不会显示这些标记。

## 导出日志 {#exporting-the-log}

显示日志条目时，页面顶部会出现 **Export CSV** 按钮。点击它可将当前筛选后的结果导出为电子表格，供离线查阅或留存记录。

## 分页 {#pagination}

使用表格底部的分页控件浏览结果。每页可显示 25、50（默认）或 100 条记录。

:::info
审计日志条目会自动保留一年。超过 365 天的条目将被删除，以保持系统性能。
:::

:::tip
请定期查看审计日志，尤其是在新成员加入或进行重大配置更改之后。这有助于及早发现异常活动。
:::

## 相关文章 {#related-articles}

- [角色与权限](../settings/roles-permissions.md) -- 管理谁可以访问哪些内容
- [数据安全](../settings/data-security.md) -- 了解你的数据如何受到保护
- [报表概览](./index.md) -- 查看所有可用报表
