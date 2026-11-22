---
title: "搜索人员"
description: "依姓名搜索 B1 Admin 的人员通讯录，在表格检视中排序与选择栏位，使用进阶搜索建立筛选条件，并将结果汇出为 CSV。"
---

# 搜索人员

<div class="article-intro">

**People**页面会将你的教会通讯录显示为可搜索的住户列表，或是可排序的个人表格。你可以快速找到会众中的任何人、自定义显示的资料，并汇出搜索结果。高效的搜索对于日常的教会行政工作至关重要，例如跟进访客、准备联络名单，以及管理会员记录。

</div>

## 培训视频 {#training-video}

<YouTube id="7Y-tN9RmnDQ" title="在 B1 中搜索人员与建立名单" next="在 B1 中设置自定义栏位、批量编辑与汇出" nextUrl="/docs/b1-admin/settings/custom-fields" />

<div class="prereqs">
<h4>开始之前</h4>

- 你需要一个有效的 B1 Admin 账户，并具有查看人员的权限。如果你不确定自己的访问级别，请参阅[角色与权限](roles-permissions.md)。
- 你的教会通讯录中应该已有人员。如果你尚未新增任何人员，请参阅[新增人员](adding-people.md)或[导入资料](importing-data.md)。

</div>

## 住户与表格检视 {#households-and-table-views}

People 页面会依**住户**将通讯录按字母顺序分组列出。每一列会显示该住户的照片、住户名称（例如"The Smith Family"），以及其中每位成员的姓名。点击某个住户，即可打开户长的个人资料；或点击任何成员的姓名，以打开该人员的资料。清单上方的数字会显示目前显示了多少住户与人员。

使用清单上方的 **View as** 切换开关，即可在 **Households** 与 **Table** 之间切换。**Table** 检视每列显示一位人员，也是你可以排序与选择栏位的地方（见下文）。B1 会在该设备上记住你的选择。

在 **Table** 检视中，每位人员的会员状态会显示在其姓名下方，七种状态各有其专属颜色，与该人员个人资料中所用的颜色相同。住户角色设为 **Child** 的人员，还会在状态旁边显示 **Child** 标签。若要将某人标记为子女，请在其个人资料的[住户面板](./adding-people.md#managing-households)中设置其角色。

默认情况下，页面只会载入通讯录的前一部分。如果人员较多，请点击清单下方的 **Show All Members**，以载入所有人员。

## 快速搜索 {#quick-search}

People 页面顶端的 **Find a household or person** 搜索框，可让你即时查找会员：

1. 点击 People 页面顶端的**搜索框**。
2. 开始输入姓名。
3. 结果会在你输入时自动筛选（会有约半秒的短暂延迟，以避免每次按键都触发搜索）。
4. 下方的清单会更新，只显示符合条件的结果。

点击搜索框下方的 **Clear**，即可重设搜索，并再次显示整个通讯录。

:::tip
你不需要按 Enter。停止输入后，搜索便会自动执行。
:::

## 排序结果 {#sorting-results}

在 **Table** 检视中，人员默认依姓氏、再依名字排序。你可以点击任何栏位标题，以其他方式排序通讯录：

1. 点击某个**栏位标题**（例如 **Name** 或 **Email**），即可依该栏位排序。
2. 再次点击同一个标题，即可反转排序顺序。

第一次点击会以升序排列（A 到 Z、由年轻到年长、日期由早到晚），标题旁的箭头会显示排序方向。该栏位没有数值的人员一律排在最后。如此一来，你便能轻松依字母顺序、年龄，或任何其他可见栏位找到人员。B1 会记住该设备上的排序方式，因此在你刷新页面或稍后返回时，表格仍会保持相同的排序。

## 自定义栏位 {#customizing-columns}

并非所有资料都需要同时显示。你可以选择表格中要显示哪些栏位：

1. 点击 People 页面标题中的**选择栏位**图标。（栏位适用于 **Table** 检视，因此勾选栏位也会将页面切换为 **Table** 检视。）
2. 勾选或取消勾选栏位，以显示或隐藏它们。**Standard** 标签提供以下选项：
   - **Photo** 与 **Display Name**（预设显示）
   - **Last Name**、**First Name** 与 **Middle Name**
   - **Address**、**City**、**State/Province** 与 **Zip/Postal**
   - **Primary Email** 与 **Primary Phone**（手机号码；若没有手机，则显示住家或工作电话）
   - **Birth Date**、**Birthday (No Year)** 与 **Age**
   - **Gender**、**Membership Status**、**Campus**、**Marital Status** 与 **Anniversary**
   - **Name Tag Notes**
   - **Date Added**——建立该人员记录的日期
   - **Delete Option**——在每一列加入删除图标（仅在你有编辑人员的权限时提供）
3. 表格会立即依你的选择更新。点击 **Done**（或 **Close**）即可关闭 **Select Columns** 对话框。B1 会在该设备上记住你的栏位设置。

### 将自定义栏位显示为栏位 {#showing-custom-fields-as-columns}

栏位选择器有两个标签：**Standard** 包含上述的内建栏位，**Custom** 则包含你教会的[自定义栏位](../settings/custom-fields.md)，以及任何人员表单中的题目。在 **Custom** 标签中勾选某个自定义栏位，即可将其加入为栏位，表格中便会显示每位人员在该栏位的值。这些值的显示方式与人员个人资料中相同——是／否栏位显示 *Yes* 或 *No*，多选栏位显示选项的标签，日期则以简短日期格式显示。没有该栏位值的人员则显示空白的储存格。


## 汇出搜索结果 {#exporting-search-results}

你随时都可以将目前的搜索结果下载为 CSV 文件：

1. 套用你想要的任何搜索或筛选条件。
2. 点击人员页面标题中的 **Export** 按钮。
3. CSV 文件会下载到你的电脑，可用 Excel、Google Sheets 或任何试算表应用程序打开。

有关汇出的更多详情，请参阅[汇出资料](./exporting-data.md)。

:::tip
若需要更进阶的查询——例如找出过去三个月内都未出席的所有人——请尝试 [AI 搜索](./ai-search.md)功能，它让你能以日常语言提问进行搜索。
:::

## 进阶搜索 {#advanced-search}

进阶搜索可让你结合多项条件，建立精确的筛选。在 People 页面的搜索框下方点击 **Advanced** 即可打开。然后展开一个类别，并勾选你想要筛选的栏位（可以点击栏位名称或其方框），再为每个栏位选择运算符与值。类别包括 **Names**、**Demographics**、**Contact Information**、**Membership & Groups**（会员状态、校区、加入日期与小组成员资格）、**Activity**（奉献与出席），以及 **Custom Fields**。

此处没有搜索按钮：你更改筛选条件后，结果会在约半秒后自动更新，而人员必须符合你勾选的所有筛选条件。已启用的筛选会以标签的形式显示在类别上方——点击标签上的 **x** 即可移除该筛选，或点击 **Clear All** 移除全部筛选。再次点击 **Advanced** 即可隐藏面板。

若要找出新加入的人员，请展开 **Membership & Groups** 并勾选 **Date Added**。它预设为 **in the last N days**，并已填入 30，因此只需点击一次，即可找出过去一个月内新增的所有人员；你可以更改天数，或切换为 *equals / after / before* 以选择特定日期。**Birth Date** 与 **Anniversary** 也提供 **in the last N days** 选项。Date Added 只会记录 2026 年 10 月下旬之后建立的人员；更早新增的人员没有日期，因此此筛选无法找到他们。

**Custom Fields** 类别会列出你教会的[自定义栏位](../settings/custom-fields.md)——即你在设置中定义，用以追踪你自己资料的字段（例如背景调查到期日）。提供的运算符会依各栏位的类型而有所不同：文字栏位支持 *contains / equals / starts with / ends with*，数字栏位支持比较运算符，日期栏位支持 *equals / after / before*，而是／否与多选栏位则让你选择一个值。你可以在此筛选的任何栏位，都能保存为动态的[名单](./lists.md)。

## 将搜索保存为名单 {#saving-searches-as-lists}

执行一个至少返回一位人员的搜索后，人员页面标题中会出现 **Save as List** 按钮（适用于有编辑人员权限的工作人员）。点击它即可将当前查询以名称及（选填的）类别储存起来，之后随时都可以立即重新载入。详细说明请参阅[已保存的名单](./lists.md)。
