---
title: "指南：生成年度奉献报告"
description: "在 B1 Admin 中，完成本年度的捐赠记录，核对基金的税务设置，并为每位捐赠者生成可用于抵税的奉献证明。"
---

# 生成年度奉献报告

<div class="article-intro">

本文将引导您完成年终流程：确认捐赠记录完整无误、核对基金设置，并为每位捐赠者生成可用于抵税的奉献证明。这项工作通常在次年一月初进行，针对上一个日历年度。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 拥有财务访问权限的 B1 Admin 账户
- 全年记录的捐赠（通过 Stripe 在线捐赠和/或手动录入）
- 如果您接受在线捐赠，需要有 Stripe 账户的访问权限

</div>

## 第 1 步：导入最后的 Stripe 交易

确保年末的所有在线捐赠都已导入系统。

请按照 [Stripe 导入](../donations/stripe-import.md) 指南操作：

1. 进入 Donations > Stripe Import
2. 选择涵盖年末的日期范围（例如 12 月 1 日至 12 月 31 日）
3. 先点击 Preview 进行预览，然后点击 Import Missing 完成导入

:::warning
请在生成奉献证明之前运行此导入。任何未导入的交易都不会出现在捐赠者的证明中。
:::

## 第 2 步：检查捐赠报告

在生成证明之前，先核实您的记录是否准确。

请按照 [捐赠报告](../donations/donation-reports.md) 指南操作：

1. 查看全年的捐赠汇总页面
2. 按基金查看合计金额，并与银行对账单进行比对，找出任何差异
3. 如有需要，点击进入各个批次，核实每位捐赠者的详细信息

## 第 3 步：核实基金的税务状态

确保每个基金的可抵税设置正确，以保证证明内容准确。

请按照 [基金](../donations/funds.md) 指南操作：

1. 打开每个基金，确认其可抵税设置正确

:::info
只有标记为可抵税的基金捐赠才会出现在奉献证明上。如果某个基金应当可以抵税但未做此标记，请在生成证明之前更新设置。
:::

## 第 4 步：生成奉献证明

为您的捐赠者制作正式的奉献证明。

请按照 [奉献证明](../donations/giving-statements.md) 指南操作：

1. 进入 **Donations > Giving Statements**
2. 从下拉菜单中选择年份，并查看汇总统计数据
3. 选择下载方式：
   - **Download ZIP**：每位捐赠者一个单独的 CSV 文件
   - **Print All**：可打印的视图，每份证明单独占一页，如果您上传过教会标志，则会显示在页面顶部

:::tip
请在一月初记录尚新时尽早生成证明。这样您还有时间在邮寄之前发现并修正问题。
:::

## 第 5 步：分发给捐赠者

将证明送到捐赠者手中。

1. 打印并邮寄证明，或将各个 CSV 文件通过电子邮件发送给捐赠者
2. 会员也可以在 [B1.church 或 B1 App](../../b1-church/giving/donation-history.md) 中查看自己的奉献历史，并打印证明

## 大功告成！

您的年度奉献报告已经完成。捐赠者已获得可用于抵税的证明，您的财务记录也已完成本年度的结算。

## 相关文章

- [Stripe 导入](../donations/stripe-import.md) — 导入在线交易
- [捐赠报告](../donations/donation-reports.md) — 查看奉献趋势和合计金额
- [基金](../donations/funds.md) — 管理基金及可抵税设置
- [奉献证明](../donations/giving-statements.md) — 生成年终证明
- [记录捐赠](../donations/recording-donations.md) — 手动录入现金/支票捐赠
- [捐赠历史（网页版）](../../b1-church/giving/donation-history.md) — 会员自助查看
- [设置在线奉献指南](./online-giving.md) — Stripe 和奉献功能的初始设置
