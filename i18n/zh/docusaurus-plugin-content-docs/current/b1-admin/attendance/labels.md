---
title: "签到标签设计器"
description: "自定义签到时打印的姓名牌和接送单模板，包括字段、位置以及生日或备注条件，均可在 B1 Admin 中设置。"
---

# 签到标签设计器

<div class="article-intro">

标签设计器可让你创建和自定义在家庭为孩子签到时打印的姓名牌和接送单模板。你可以精确控制每张标签上显示的信息、其位置以及外观。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 设置[考勤](./setup.md)，并至少配置一个已启用签到的聚会时间
- 设置[签到](./check-in.md)，以便标签能够打印
- 你需要 **Edit Attendance** 权限

</div>

## 打开标签设计器 {#opening-the-label-designer}

在 B1 Admin 中，打开[跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），展开 **Mobile**，然后点击 **Labels**。你也可以点击 **B1 CheckIn**，再点击 **Check-in Labels** 卡片上的 **Design Labels**。

**Check-in Labels** 页面会列出你已保存的模板，包括其 **Name**、**Type**（**Nametag** 或 **Pickup Slip**）以及 **Size**。如果你尚未创建任何模板，页面会显示 **No label templates**，此时 B1 Checkin 将打印其内置的姓名牌和接送单。

## 标签类型 {#label-types}

- **Nametag（姓名牌）**——打印后贴在孩子身上。通常包括孩子的姓名、所在教室/时段以及安全码。
- **Pickup Slip（接送单）**——交给家长或监护人。通常包括安全码以及他们为孩子签到的名单。

两种起始模板都按标准 3.5 × 1.1 英寸热敏标签（Brother DK-1201）的尺寸设计。

## 创建标签模板 {#creating-a-label-template}

1. 点击 **Add label**，并选择一个起始模板：**Nametag 3.5" x 1.1"**、**Pickup Slip 3.5" x 1.1"** 或 **Blank**（空白）。
2. 模板会在标签编辑器中打开，并以示例数据预览标签的填充效果。

### 标签编辑器 {#label-editor}

在编辑器顶部，你可以设置：

- **Name**——模板名称（仅供你参考；必填）
- **Type**——Nametag 或 Pickup Slip
- **Width (in)** / **Height (in)**——标签尺寸（英寸）

### 添加模块 {#adding-blocks}

标签由模块构成——即放置在标签上的各个内容块。点击 **Add Block** 面板中的按钮即可添加一个模块：

- **Fields（字段）**——在打印时填入一个值。姓名牌提供 **Display Name**、**First Name**、**Last Name**、**Nickname**、**Nametag Notes**（人员记录上的备注）、**Birthday This Week**（当人员生日位于签到日期前后 3 天内时为 true）、**Sessions**（其签到的聚会时间和教室）、**Security Code**、**Date** 和 **Church Name**。接送单提供 **Children**、**Children & Allergies**、**Security Code**、**Date** 和 **Church Name**。
- **Text（文本）**——你输入的静态文字（用于标题、标签或说明）
- **Barcode（条形码）**——某个字段的 Code 128 或 Code 39 条形码，例如安全码
- **QR Code（二维码）**——某个字段的二维码
- **Box（方框）**——带有可选填充颜色和边框的矩形

### 定位和设置模块样式 {#positioning-and-styling-blocks}

在标签上拖动模块即可移动，或点击模块后使用 **Properties** 面板。**X**、**Y**、**W** 和 **H** 均为占标签的百分比（0–100）。根据模块类型，你还可以设置：

- **Font Size（字号）**——文字大小，相对于标签高度
- **Bold（粗体）** 和 **Italic（斜体）**
- **Align（对齐）**——左对齐、居中或右对齐
- **Symbology（编码类型）** 和 **Value（值）**——用于条形码和二维码
- **Fill（填充）** 和 **Border（边框）**——用于方框
- **Condition（条件）**——**Always** 表示始终显示该模块。选择一个字段后，可设置仅当该字段**不为空**、**为空**、**等于**或**不等于**某个值时才显示该模块。例如，仅在填写了姓名牌备注时才显示备注，或仅当 **Birthday This Week** 等于 `true` 时才显示生日图案。

点击 **Remove Block** 可删除所选模块。

### 保存 {#saving}

点击 **Save** 保存模板，或点击 **Cancel** 放弃更改。B1 Checkin 会在下次加载设置时使用更新后的模板。

## 选择默认模板 {#choosing-the-default-template}

如果某一类型有多个模板，请点击 B1 Checkin 应当打印的那个模板上的 **Set Default**。它会显示 **Default** 标记，同类型的其他模板将不再是默认模板。如果某一类型没有标记为默认的模板，签到亭将使用第一个模板。

## 删除模板 {#deleting-a-template}

点击模板所在行的 **Delete** 并确认。如果删除了某一类型的全部模板，B1 Checkin 将恢复为该类型的内置标签。

:::tip
编辑模板后，请先打印一张测试样张，确认版式无误后再用于下次聚会。
:::

## 相关文章 {#related-articles}

- [考勤设置](./setup.md)——为签到配置聚会和小组
- [签到](./check-in.md)——设置 B1 Checkin 签到亭
- [B1 Checkin 入门](../../b1-checkin/getting-started/index.md)——签到亭应用
