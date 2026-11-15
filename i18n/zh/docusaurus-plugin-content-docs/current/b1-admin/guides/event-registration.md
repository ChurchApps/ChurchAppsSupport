---
title: "指南：设置活动报名"
description: "在 B1 Admin 中设置活动报名表，收集参与者信息及可选付款，将其嵌入教会网站，并跟踪报名情况。"
---

# 设置活动报名

<div class="article-intro">

创建活动报名表，收集参与者信息和可选付款，将其嵌入你的教会网站，并随着提交内容的到达进行管理。完成后，你将为任何教会活动拥有一个可分享的报名页面。

</div>

:::info
**处理活动报名的两种方式**：本指南介绍的是**基于表单的报名**——即拥有独立公开链接、自定义问题以及可选付款字段的独立表单。如果是日历上的活动，你也可以改用日历内置的**活动报名**功能——参见[创建日历](../calendars/creating-calendars.md#enabling-event-registration)。该功能允许成员直接通过 [B1.church 或 B1 应用](../../b1-church/events/registering.md)报名，并支持名额、开放与截止日期、候补名单、来自表单的可选报名问题，以及定价的参与者类型（参见[付费报名](../calendars/paid-registrations.md)）。
:::

<div class="prereqs">
<h4>开始之前</h4>

- 拥有管理员权限的 B1 Admin 账户
- 若要收取付款：需先[配置 Stripe](../donations/online-giving-setup.md)

</div>

## 第 1 步：创建独立表单 {#step-1-create-a-stand-alone-form}

独立表单拥有任何人都可以访问的公开网址——非常适合用于活动报名。

请按照[创建表单](../forms/creating-forms.md)指南操作：

1. 在[跳转菜单](../introduction.md#getting-around-with-the-jump-menu)中，选择 **People > Forms**，然后点击 **Add Form**
2. 以活动命名（例如"男士退修会报名""暑期圣经学校报名"）
3. 在 **Associate With**（关联类型）中选择 **Stand Alone**（独立）——这会为表单分配其专属的公开网址
4. 点击 **Save**

## 第 2 步：添加问题 {#step-2-add-questions}

构建你需要向报名人收集的字段。

请按照[创建表单](../forms/creating-forms.md#adding-questions)指南添加问题：

1. 打开表单，进入 **Questions** 标签，并为你需要收集的每项信息点击 **Add Question**：姓名、电子邮件、电话、饮食限制、T 恤尺码、紧急联系人等
2. 对于餐饮偏好或场次选择等选项，使用 **Multiple Choice**（单选）
3. 若要收取费用，请添加一个 **Payment**（付款）问题，并选择其 **Fund**（基金）和 **Amount**（金额）

:::warning
Payment（付款）字段类型需要配置 Stripe。如果你尚未设置在线奉献，请先参阅[在线奉献设置](../donations/online-giving-setup.md)，再添加付款字段。
:::

## 第 3 步：配置表单设置 {#step-3-configure-form-settings}

控制报名表的开放时间和方式。请按照[配置表单属性](../forms/creating-forms.md#configuring-form-properties)部分进行操作：

1. 点击 **Edit Form**（编辑表单）。如果报名只应在有限时间内开放，请将 **Set Form Availability Timeframe**（设置表单开放时间范围）设为 **Yes**（是），并选择开始和结束日期
2. 复制表单页面左侧显示的**公开网址**——你可以直接分享。点击表单列表中该表单旁边的 **QR Code**（二维码），即可下载用于传单和幻灯片的二维码
3. 在 **Form Members**（表单成员）标签中，将人员添加为 **Admin**（管理员）或 **View Only**（仅查看），以协助管理提交内容；并为应在每次新报名时收到电子邮件的人员开启 **Email Notification**（电子邮件通知）

## 第 4 步：嵌入你的网站 {#step-4-embed-on-your-website}

将报名表添加到教会网站上，让人们更容易找到。

请按照[页面编辑器](../website/page-editor.md)指南操作：

1. 在 B1 网站编辑器中打开一个页面，并点击 **Add Content**（添加内容）
2. 将 **Form**（表单）组件拖入一个板块，并选择你的报名表

:::tip
也请通过电子邮件、社交媒体和教会周报分享独立网址——展示的地方越多，报名人数就越多。
:::

## 第 5 步：管理提交内容 {#step-5-manage-submissions}

在报名到达时进行跟踪，并在需要时导出数据。

请按照[管理提交内容](../forms/managing-submissions.md)指南操作：

1. 在 **Form Submissions**（表单提交）标签中，随着回复的到达进行审阅
2. 点击 **Export**（导出），下载 CSV 文件，用于电子表格、人数统计或与活动负责人共享

## 完成！ {#youre-done}

你的活动报名已经上线。分享链接、将其嵌入你的网站，并在 B1 Admin 中跟踪报名情况。活动结束后，请导出最终名单留存备查。

## 相关文章 {#related-articles}

- [创建表单](../forms/creating-forms.md)——使用不同字段类型构建表单
- [管理提交内容](../forms/managing-submissions.md)——查看和导出表单回复
- [页面编辑器](../website/page-editor.md)——在网站上嵌入表单
- [在线奉献设置](../donations/online-giving-setup.md)——付款字段所必需
