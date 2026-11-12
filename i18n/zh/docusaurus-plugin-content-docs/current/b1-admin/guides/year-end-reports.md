---
title: "指南：生成年终奉献报表"
description: "在 B1 Admin 中完成当年度的奉献记录、检查基金的税务设置，并为每位奉献者生成可抵税的奉献证明。"
---

# 生成年终奉献报表

<div class="article-intro">

依照年终流程完成奉献记录、核对基金设置，并为每位奉献者生成可抵税的奉献证明。通常在次年一月初针对上一个日历年度进行。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 具有财务权限的 B1 Admin 账户
- 全年记录的奉献（通过 Stripe 线上奉献和/或手动输入）
- 如果你接受线上奉献，需要有 Stripe 账户的访问权限

</div>

## 步骤 1：导入最后的 Stripe 交易 {#step-1-import-final-stripe-transactions}

确保年底的所有线上奉献都已导入系统。

请按照 [Stripe 导入](../donations/stripe-import.md)指南完成以下操作：

1. 在[快速菜单](../introduction.md#getting-around-with-the-jump-menu)中，选择 **Donations > Stripe Import**（只有当你的奉献提供商为 Stripe 时才会显示）
2. 将 **Start Date** 和 **End Date** 设为涵盖年底的日期范围（例如 12 月 1 日至 12 月 31 日）
3. 先点击 **Preview** 进行检查，然后点击 **Import Missing** 完成导入

:::warning
在生成奉献证明之前，请先执行此导入。尚未导入的交易不会出现在奉献者的证明上。
:::

## 步骤 2：检查奉献报表 {#step-2-review-donation-reports}

在生成证明之前，先确认记录准确无误。

请按照[奉献报表](../donations/donation-reports.md)指南完成以下操作：

1. 在快速菜单中，选择 **Donations > Summary**，在 **Filter Report** 中将 **Start Date** 和 **End Date** 设为整个年度，然后点击 **Run Report**
2. 按基金检查总额，并与银行对账单比对，以找出任何差异。点击 **Download Options**，选择 **Summary** 下载 CSV 文件
3. 如有需要，可在 **Donations > Batches** 下打开各个批次，核对每位奉献者的详细记录

## 步骤 3：核对基金的税务状态 {#step-3-verify-fund-tax-status}

确认每个基金的可抵税设置正确，以确保证明内容无误。

请按照[基金](../donations/funds.md)指南完成以下操作：

1. 在快速菜单中，选择 **Donations > Funds**，检查每个基金的 **Tax Status**
2. 在某个基金上点击 **Edit**，即可更改其 **Tax Deductible** 设置

:::info
只有标记为可抵税的基金奉献才会出现在奉献证明上。如果某个基金应该可抵税却未作此标记，请在生成证明之前先进行更新。
:::

## 步骤 4：生成奉献证明 {#step-4-generate-giving-statements}

为你的奉献者制作正式的奉献证明。

请按照[奉献证明](../donations/giving-statements.md)指南完成以下操作：

1. 在快速菜单中，选择 **Donations > Giving Statements**
2. 选择 **Year**，并检查摘要统计数据。加拿大、澳大利亚或新西兰的教会可点击 **Statement format**，切换为该国官方收据的格式
3. 选择下载方式：
   - **Download ZIP**：每位奉献者一个 CSV 文件
   - **Print All**：可打印的版面，每份证明各占一页，并在顶端显示你的教会标志（如果你已上传）

:::tip
请在一月初、记录仍然新鲜时尽早生成证明。这样你便有时间在寄出前发现并处理任何问题。
:::

## 步骤 5：分发给奉献者 {#step-5-distribute-to-donors}

将证明交到奉献者手中。

1. 打印并邮寄证明，或将个别 CSV 文件以电子邮件发送给奉献者
2. 会员也可以在 [B1.church 或 B1 App](../../b1-church/giving/donation-history.md) 中查看自己的奉献记录并打印证明

## 完成！ {#youre-done}

你的年终奉献报表已经完成。奉献者拿到了可抵税的证明，而你的财务记录也已完成当年度的结算。

## 相关文章 {#related-articles}

- [Stripe 导入](../donations/stripe-import.md)：导入线上交易
- [奉献报表](../donations/donation-reports.md)：查看奉献趋势与总额
- [基金](../donations/funds.md)：管理基金与可抵税设置
- [奉献证明](../donations/giving-statements.md)：生成年终证明
- [记录奉献](../donations/recording-donations.md)：手动输入现金与支票奉献
- [奉献记录（网页）](../../b1-church/giving/donation-history.md)：会员的自助查看页面
- [设置线上奉献指南](./online-giving.md)：Stripe 与奉献的初始设置
