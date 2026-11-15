---
title: "自定义字段"
description: "在 B1 Admin 中定义自定义字段，以记录额外的个人信息，如背景调查到期日期或衣服尺码，然后据此进行搜索和筛选。"
---

# 自定义字段

<div class="article-intro">

**Custom Fields**（自定义字段）让你可以在每份人员记录上追踪自己的信息 -- 包括 B1 没有内置字段的内容，例如背景调查到期日期、T 恤尺码或洗礼班状态。你只需在设置中定义一次字段，然后在每位人员的资料中填写数值，并据此进行搜索或建立列表。这取代了过去为了保存单条自定义数据而专门创建人员表单的变通做法。

</div>

## 培训视频 {#training-video}

<YouTube id="yUfDEbp2HQ4" title="在 B1 中使用自定义字段、批量编辑和导出" next="在 B1 中创建小组并添加成员" nextUrl="/docs/b1-admin/groups/creating-groups" />

<div class="prereqs">
<h4>开始之前</h4>

- 你需要拥有 **Edit Church Settings**（编辑教会设置）权限才能打开设置页面（以及保存职称列表），另外还需要 **People**（人员）编辑权限才能定义字段并填写数值。拥有人员查看权限的人都可以看到这些数值。参见[角色与权限](./roles-permissions.md)。
- 在开始之前，请先确定你想追踪的内容，以及最适合的字段类型（文本、数字、日期、是/否或选择列表）。

</div>

## 打开自定义字段 {#opening-custom-fields}

在 B1 Admin 中，打开[跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），选择 **Settings > Settings**（设置 > 设置），然后在左侧列表中点击 **Custom Fields**（自定义字段），即可滚动到 **Custom Fields** 部分。你也可以直接访问 **/settings/custom-fields**。页面会列出你已定义的所有字段，显示其 **Name**（名称）和 **Field Type**（字段类型）。如果你还没有创建任何字段，面板会显示 *"No custom fields have been added yet."*（尚未添加任何自定义字段。）

## 职称 {#titles}

自定义字段部分顶部的 **Titles**（职称）卡片列出了在 B1 Admin 和 B1 应用（个人资料编辑器和访客注册表单）中添加或编辑人员时，**Title**（职称）输入框中提供的选项。列表初始包含 Mr、Mrs、Miss、Ms、Dr、Prof、Rev 和 Pastor。

1. 在 **New title**（新职称）中输入职称（最多 10 个字符），例如 *Deacon*（执事）或 *Elder*（长老），然后点击 **Add Title**（添加职称）。
2. 若要从列表中移除某个职称，请点击其标签上的 **×**。
3. 点击 **Save**（保存）。随后会显示 *Titles saved.*（职称已保存。）消息以确认更改。如果添加的职称已在列表中，则会显示 *That title is already in the list.*（该职称已在列表中。）

:::tip
职称输入框仍然允许手动输入，因此工作人员和会员可以输入列表中没有的职称。从列表中移除某个职称，不会更改已经使用该职称的人员。
:::

## 添加字段 {#adding-a-field}

1. 点击 **Add Field**（添加字段）。
2. 在右侧打开的编辑器中，输入 **Name**（名称）-- 这是工作人员在人员资料和搜索中看到的标签（例如 *Background check expires*（背景调查到期））。
3. 选择 **Field Type**（字段类型）：
   - **Textbox**（文本框）-- 自由输入的短文本。
   - **Whole Number**（整数）-- 不带小数的数字（例如数量）。
   - **Decimal**（小数）-- 可包含小数的数字。
   - **Date**（日期）-- 日历日期。
   - **Yes/No**（是/否）-- 简单的是或否回答。
   - **Multiple Choice**（多项选择）-- 选择列表。选择此类型后，会出现 **choices editor**（选项编辑器），你可以添加人员可以选择的每个选项。
4. 点击 **Save**。

此后，每位人员的资料中都会出现该字段。

:::info
字段类型与[表单问题](../forms/creating-forms.md)所使用的类型相同，因此各项数值在 B1 中的表现保持一致。
:::

## 编辑字段 {#editing-a-field}

点击列表中的任意字段行，即可在编辑器中重新打开它。更改名称、类型或选项后，点击 **Save**。

:::warning
如果某个字段已有数值，更改其 **Field Type**（字段类型）（例如从 Textbox 改为 Date）可能会使之前录入的数值与新类型的格式不再匹配。工作人员开始填写该字段后，请谨慎更改类型。
:::

## 删除字段 {#deleting-a-field}

打开某个字段进行编辑，然后点击 **Delete**（删除）。系统会要求你确认：*"Are you sure you wish to delete this custom field? Its stored values will also be removed."*（你确定要删除此自定义字段吗？其存储的数值也将一并删除。）删除字段会永久移除该字段，以及**所有人员上为其存储的每一个数值**，此操作无法撤销。

## 为人员填写数值 {#filling-in-values-on-a-person}

只要至少存在一个自定义字段，其数值就会与每位人员记录中的内置信息并列显示 -- 你可以在个人资料左侧与其联系方式一同查看，并在用于编辑其余信息的同一表单中进行编辑。在你定义第一个字段之前，不会出现任何额外内容。

1. 在 **People** 中打开某位人员的记录。
2. 点击个人资料左侧、联系方式下方的 **Edit**（编辑）按钮。
3. 滚动到编辑表单底部的 **Custom Fields**（自定义字段）区域，为每个字段填写数值。每个字段都会显示与其类型相符的输入控件 -- 日期字段为日期选择器，是/否字段为是/否下拉菜单，多项选择字段为选择列表，依此类推。
4. 点击 **Save**。你的自定义字段数值会与该人员的其他信息一同保存。

回到个人资料页面后，任何已有数值的字段都会显示在人员联系方式下方，格式为 *字段名称: 数值*（是/否回答显示为 *Yes* 或 *No*，多项选择则显示选项的标签）。留空的字段会被直接隐藏。若要删除某个数值，请编辑该人员，清空该字段并保存 -- 空值会从记录中删除，而不会以空白形式保存。

:::tip
经典用途是志愿者安全：创建一个名为 *Background check expires*（背景调查到期）的**日期**字段，记录每位志愿者的日期，然后建立一个[已保存列表](../people/lists.md)，用于标记日期已过的人员。
:::

## 基于自定义字段进行搜索和建立列表 {#searching-and-building-lists-on-custom-fields}

自定义字段完全支持搜索：

1. 在 **People** 页面上，打开[高级搜索](../people/searching-people.md)。
2. 展开 **Custom Fields** 类别。
3. 勾选你要筛选的字段，选择运算符并输入数值。提供的运算符与字段类型相匹配：
   - **Textbox**（文本框）-- contains（包含）、equals（等于）、starts with（以……开头）、ends with（以……结尾）。
   - **Whole Number / Decimal**（整数 / 小数）-- equals（等于）、greater than（大于）、greater than or equal（大于或等于）、less than（小于）、less than or equal（小于或等于）。
   - **Date**（日期）-- equals（等于）、after（晚于，即大于）、before（早于，即小于）。
   - **Yes/No**（是/否）-- equals Yes（等于是）或 equals No（等于否）。
   - **Multiple Choice**（多项选择）-- equals（等于）或 contains（包含）其中一个选项。

你可以将任何自定义字段搜索保存为[列表](../people/lists.md)。列表是实时查询，因此基于 *Background check expires is before today*（背景调查到期早于今天）建立的列表，每次打开时都会重新检查每位人员 -- 无需手动维护。

## 将自定义字段显示为列 {#showing-a-custom-field-as-a-column}

若要一次查看所有人的某个字段数值，可以将其添加为 **People** 页面上的一列。将 **View as**（查看方式）切换为 **Table**（表格），点击页面标题中的 **Select columns**（选择列）图标，切换到 **Custom**（自定义）标签页，然后勾选该字段。每个人的数值都会显示在内置列旁边的独立一列中。参见[将自定义字段显示为列](../people/searching-people.md#showing-custom-fields-as-columns)。

## 合并时的处理 {#what-happens-on-merge}

当你[合并两份人员记录](../people/adding-people.md)时，自定义字段的数值会自动转移。保留的那位人员会保留其自身的数值；对于仅被删除的那位人员有数值的字段，该数值会被复制过来，因此不会丢失任何信息。

## 相关文章 {#related-articles}

- [搜索人员](../people/searching-people.md) -- 高级搜索（包括自定义字段类别），以及将自定义字段显示为列
- [已保存列表](../people/lists.md) -- 保存自定义字段搜索并实时重新运行
- [角色与权限](./roles-permissions.md) -- 谁可以定义字段和编辑数值
- [创建表单](../forms/creating-forms.md) -- 适用于需要收集多个问题的数据，此时完整表单比单个字段更合适
