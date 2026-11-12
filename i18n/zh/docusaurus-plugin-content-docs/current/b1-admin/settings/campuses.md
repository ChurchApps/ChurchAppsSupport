---
title: "校区"
description: "在 B1 Admin 中设置校区，记录每个人和小组所属的场地，然后按地点筛选人员、出勤情况和人口统计数据。"
---

# 校区

<div class="article-intro">

如果你的教会在多个地点聚会，**Campuses**（校区）功能可以帮助你记录每个人和小组所属的场地。设置完成后，校区会作为选项出现在人员资料、出勤设置和人口统计仪表板中。多场地教会可以在整个 B1 Admin 中按校区进行筛选、搜索和报告。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 你需要拥有 **Edit Church Settings**（编辑教会设置）权限才能管理校区。参见[角色与权限](./roles-permissions.md)。

</div>

## 打开校区设置 {#opening-campus-settings}

在 B1 Admin 中，打开[跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），选择 **Settings > Settings**（设置 > 设置），然后在左侧列表中点击 **Campuses**（校区），即可滚动到 **Campuses** 部分。你也可以直接访问 **/settings/campuses**。页面将列出所有已配置的校区，显示其名称、位置和时区。

## 添加校区 {#adding-a-campus}

1. 点击 **Add Campus**（添加校区）。
2. 填写校区详细信息：
   - **Name**（名称）*（必填）* -- 在 B1 Admin 各处显示的名称（例如 "Main Campus"（主校区）或 "North Campus"（北校区））。
   - **Address**（地址）和 **Address Line 2**（地址第二行）-- 校区的街道地址（仅用于信息展示；与教会设置中的主教会地址不同）。
   - **City / State / Zip**（城市 / 州 / 邮编）-- 校区所在位置。
   - **Time Zone**（时区）-- 该校区的 IANA 时区（例如 *America/Chicago*）。该校区礼拜的[签到时间表](../attendance/setup.md#setting-a-check-in-schedule)将按此时区开始和结束。如果设置为 **None**（无），则改用你教会的[时区](./church-settings.md#time-zone)。当各校区位于不同时区时，此设置很有用。
   - **Website**（网站）-- 该校区自有网站的可选网址。
3. 点击 **Save**（保存）。

列表会显示每个校区的 **Name**、**Location**（位置，即城市和州）以及 **Time Zone**，左侧列表中的 **Campuses** 项目则会显示你拥有的地点数量。

## 编辑校区 {#editing-a-campus}

点击列表中的任意校区行，即可在右侧面板中打开其编辑器。更新字段后点击 **Save**；若不想保存，请点击 **Cancel**（取消）关闭编辑器。

## 删除校区 {#deleting-a-campus}

打开校区进行编辑，然后点击 **Delete**（删除）。系统会要求你确认。删除校区不会移除分配到该校区的人员 -- 他们的校区字段将简单地变为空白。

## 将人员分配到校区 {#assigning-people-to-a-campus}

创建校区后，工作人员可以从人员资料中为其分配校区：

1. 在 **People**（人员）中打开某个人员的记录。
2. 点击 **Edit**（编辑）。
3. 从 **Campus**（校区）下拉菜单中选择校区。
4. 点击 **Save**。

你也可以在人员页面批量更新校区。选择多个人员，使用 **Bulk Edit**（批量编辑），即可一次性为所有人设置校区字段。

## 按校区筛选 {#filtering-by-campus}

设置校区后，你可以在整个 B1 Admin 中按校区进行筛选：

- **人员搜索** -- 在高级搜索中添加校区条件，或加载限定于某个校区的[已保存列表](../people/lists.md)。
- **人口统计** -- 当至少有一人分配了校区时，[人口统计仪表板](../people/demographics.md)会显示校区环形图。
- **出勤设置** -- 出勤中的每个礼拜时间都可以关联到某个校区。

:::tip
单一地点的教会无需设置校区。所有校区功能都是可选的 -- 如果没有任何校区，校区字段和图表就不会显示。
:::

## 相关文章 {#related-articles}

- [教会设置](./church-settings.md) -- 你的主教会地址和品牌形象（与校区地址分开）
- [人口统计](../people/demographics.md) -- 校区分布图表
- [出勤设置](../attendance/setup.md) -- 将礼拜时间关联到校区
- [批量编辑](../people/bulk-editing.md) -- 一次为多人分配校区
