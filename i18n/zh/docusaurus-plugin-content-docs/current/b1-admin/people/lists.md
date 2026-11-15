---
title: "已保存的名单"
description: "将 B1 Admin 中的人员搜索保存为具名名单，之后只需点击一次即可重新载入。名单为动态更新，新符合条件的会员会自动出现。"
---

# 已保存的名单

<div class="article-intro">

**已保存的名单**让你可以将搜索条件储存为一个名称，并随时点击一次即可重新执行。只需建立一次名单——例如"北校区的活跃会员"、"过去 90 天内的访客"，或任何进阶筛选——它便会留在人员页面顶端，你再也不必重新建立查询条件。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 请先在人员区域执行至少一次搜索，以便有结果可以保存。请参阅[搜索人员](./searching-people.md)或[AI 搜索](./ai-search.md)。
- 保存、更改与删除名单需要 **Edit People** 权限。请参阅[指派角色](./roles-permissions.md)。

</div>

## 将搜索保存为名单 {#saving-a-search-as-a-list}

1. 在 **People** 页面执行搜索——快速搜索、AI 搜索或进阶筛选搜索皆可。
2. 当搜索找到至少一位人员时，人员页面标题中会出现 **Save as List** 按钮。
3. 点击 **Save as List**。
4. 输入 **List Name**（必填）。
5. 也可以选择性地输入 **Category**，将相关的名单归在一起（例如"外展"或"会员"）。
6. 在 **Who can see this list** 下，选择 **All staff** 或 **Only me**。
7. 在 **Match** 下，选择 **All filters**（人员必须符合所有筛选条件）或 **Any filter**（人员只需符合至少一项筛选条件）。
8. 在 **Include household** 下，选择 **Matches only**（仅符合条件者）、**Children of matches**（同时加入每位符合条件者住户中的子女），或 **Entire household**（加入每位符合条件者住户中的所有人）。
9. 也可以选择性地勾选 **Refresh nightly**（请参阅下方的[每晚更新](#nightly-refresh)）。勾选后，你也可以勾选 **Email me when membership changes**。
10. 点击 **Save**。

名单现已保存，并会以按钮的形式出现在人员页面顶端的已保存名单列中，位于 **Everyone** 旁边。设为 **Only me** 的名单会显示一个小型锁头图标。

:::info
设为 **All staff** 的名单会在整个教会中共享——任何具有人员访问权限的人都可以查看并载入。只有具备适当权限的工作人员才能更改或删除名单。
:::

## 载入已保存的名单 {#loading-a-saved-list}

在人员页面顶端，点击任何名单的名称。搜索会立即以储存的查询条件重新执行，并更新结果。点击 **Everyone** 即可返回整个通讯录。

名单会依类别分组（如果你有指定类别），未分类的名单则会排在最后。

:::tip
名单是**动态查询**，而非快照。每次载入名单时，搜索都会以你当前的资料重新执行，因此新符合条件的人员会出现在结果中。
:::

## 重新命名与删除名单 {#renaming-and-deleting-lists}

具有管理权限的工作人员，可以从人员页面重新命名或删除任何名单。请先点击该名单将其载入——此时名称旁会出现两个图标：

- 点击**名单设置**（齿轮）图标，即可重新命名，或更改其类别与共享设置。使用这些选项保存的名单，也可以在此处更改 **Include household**、**Refresh nightly** 与 **Email me when membership changes**。名单保存之后，**Match** 设置便无法更改。
- 点击**删除**（垃圾桶）图标即可删除该名单（系统会要求你确认）。

## 每晚更新 {#nightly-refresh}

无论是否勾选 **Refresh nightly**，载入名单时都会以全新的方式执行搜索。**Refresh nightly** 则会让 B1 每晚重新执行该名单，并记录谁加入或离开了名单。如果你勾选了 **Email me when membership changes**，每次每晚更新新增或移除了任何人员后，B1 都会向你（即保存该名单的人）发送电子邮件，告知新增与移除的人数。每晚更新也会将名单成员的变动同步到你的[整合](../integrations/index.md)，例如 Mailchimp 标签。

## 使用情境 {#use-cases}

| 情境 | 如何建立名单 |
|---|---|
| 所有访客 | 进阶搜索：Membership Status = Visitor |
| 特定校区的会员 | 进阶搜索：Campus = [你的校区] |
| 背景调查已过期的志愿者 | 进阶搜索：[自定义栏位](../settings/custom-fields.md)"Background check expires"早于今天 |
| AI 问题的结果 | 在 AI 搜索中提问，然后保存 |

## 相关文章 {#related-articles}

- [搜索人员](./searching-people.md)——快速搜索与栏位自定义
- [AI 搜索](./ai-search.md)——可保存为名单的自然语言查询
- [自定义栏位](../settings/custom-fields.md)——定义你自己的人员栏位，然后依这些栏位进行筛选并保存名单
- [人口统计](./demographics.md)——将人口统计图表深入转换为人员筛选，再保存为名单
- [批量编辑](./bulk-editing.md)——载入名单后，可一次批量更新其所有成员
