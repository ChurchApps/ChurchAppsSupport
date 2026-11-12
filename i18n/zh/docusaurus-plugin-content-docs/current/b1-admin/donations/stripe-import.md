---
title: "Stripe 导入"
description: "将 Stripe 奉献导入 B1 Admin，采用先预览的导入方式，在确认前将每笔收费标记为新增、已导入或已跳过。"
---

# Stripe 导入

<div class="article-intro">

如果你通过 Stripe 接受在线奉献，Stripe 导入工具可以将这些交易导入 B1 Admin，使你所有的奉献数据都集中在一处。这对于找出未被自动同步的交易尤其有用。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 完成[在线奉献设置](online-giving-setup.md)，将你的 Stripe 账户连接到 B1 Admin。只有当教会的奉献网关为 Stripe 时，**Stripe Import** 菜单项和批次页面上的按钮才会出现，并且仅对有权编辑奉献的人员显示
- 确认你的 Stripe 后台在你要导入的日期范围内有奉献记录

</div>

## 工作原理 {#how-it-works}

导入过程分为两个步骤：首先预览将要导入的内容，然后确认导入。这种试运行方式让你在创建任何数据之前可以先检查所有内容。

## 导入交易 {#importing-transactions}

1. 在 **B1 Admin** 中，进入 **Donations > Stripe Import**。（你也可以点击 **Batches** 页面顶部的 **Import missing Stripe transactions**（导入缺失的 Stripe 交易）。）
2. 随即打开 **Import Stripe Transactions**（导入 Stripe 交易）页面。
3. 在 **Select Date Range**（选择日期范围）下，设置你要导入的交易的 **Start Date** 和 **End Date**。范围默认从今年 1 月 1 日开始，到今天为止。
4. 点击 **Preview**（预览）进行试运行检查。在预览找到新交易之前，**Import Missing**（导入缺失项）保持禁用；更改任一日期都会清除预览，因此你需要先预览新的日期范围。

## 查看预览 {#reviewing-the-preview}

预览会列出每个 Stripe 事件，显示其 **Event ID**（事件 ID）、**Type**（类型）、**Amount**（金额）、**Date**（日期）和 **Status**（状态）：

- **New**（新增）——该交易尚未导入，如果你继续操作，它将被包含在内。
- **Already Imported**（已导入）——该交易已存在于 B1 Admin 中，将被跳过。
- **Skipped**（已跳过）——该交易因其他原因被排除（例如退款或失败的收费）。

页面顶部的摘要会显示事件的 **Total**（总数）以及 **New**、**Already Imported** 和 **Skipped** 各自的数量。如果有任何事件无法读取，则会出现 **Errors**（错误）计数，并且该事件所在行的 **Notes**（备注）列会显示相应信息。

:::info
预览步骤不会创建任何记录。它只是一个只读检查，让你在正式提交前确认将会发生的操作。
:::

## 完成导入 {#completing-the-import}

1. 查看预览结果和摘要总计。
2. 点击 **Import Missing**，导入所有标记为 **New** 的交易。
3. 导入完成后，列表会变为 **Import Results**（导入结果）：每笔已添加的交易会显示 **Imported**（已导入），摘要中也会增加 **Imported** 计数。

## 使用 Stripe 导入的建议 {#tips-for-using-stripe-import}

- 定期（每周或每月）运行导入，使你的记录保持最新。
- 如果某笔交易显示为 **Already Imported**，表示 B1 Admin 中已有对应的记录——无需任何操作。
- 如果你要查找特定交易，可使用日期范围筛选器聚焦于某个时段。

:::tip
导入后，请访问[批次](batches.md)页面，确认导入的奉献显示正确，并且合计金额与你在 Stripe 后台看到的一致。
:::

## 后续步骤 {#next-steps}

- 查看[奉献报表](donation-reports.md)，将导入的交易与其他奉献数据一并审阅
- 确保导入的奉献已分配到正确的[基金](funds.md)，以便[奉献收据](giving-statements.md)准确无误
