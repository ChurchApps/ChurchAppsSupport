---
title: "奉献批次"
description: "在 B1 Admin 中将奉献归入奉献批次，然后关闭、打印或导出每个批次，使合计金额与银行存款相符。"
---

# 奉献批次 {#donation-batches}

<div class="article-intro">

批次将你的奉献归在一起，便于跟踪和对账。一个典型的批次代表一次收款，例如一次主日奉献或一场特别活动的奉献。使用批次可以帮助你保持井井有条，并便于核对记录是否与实际存款一致。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 请确保你已[设置好基金](funds.md)，以便在登记奉献时可以选用
- 你需要 **View Donation Summaries**、**Edit Donations** 或 **Enter Donations** 权限，才能查看批次页面（参见[谁可以更改批次](#who-can-change-a-batch)）

</div>

## 批次页面 {#the-batches-page}

进入 **Donations > Batches** 后，你会看到批次列表。每一行显示：

- **Name**（名称）——你为批次设置的标签
- **Date**（日期）——收款的日期
- **Donations**（奉献笔数）——批次中单笔奉献的数量
- **Total**（合计）——合计金额
- **Status**（状态）——**Open**（开放）或 **Closed**（已关闭）（参见[关闭和重新开放批次](#closing-and-reopening-a-batch)）

列表上方的年份按钮可让你只显示某一年的批次，或选择 **All**（全部）批次。旁边的状态按钮——**All**、**Open** 和 **Closed**——可将列表缩小为仍在处理中的批次或已完成的批次。两个筛选条件可以同时使用，例如选择 **2026** 和 **Open**，即可查看今年尚未关闭的批次。一行摘要会显示所列批次的数量、奉献笔数和合计金额。

## 创建新批次 {#creating-a-new-batch}

1. 点击页面顶部的 **Add Batch**。
2. 输入描述性名称（例如"2 月 9 日主日奉献"）。名称为可选项，但清晰的名称可以让批次日后更容易找到。
3. 选择收款日期。默认为今天的日期。
4. 点击 **Save**。

新批次会出现在列表中，随时可以添加奉献。

## 管理批次 {#working-with-batches}

- **查看奉献**——点击批次名称即可打开，查看其中包含的所有单笔奉献。在此你可以添加、编辑或删除奉献，也可以点击 **Import CSV**，从电子表格一次性添加大量奉献（参见[从 CSV 文件导入奉献](recording-donations.md#importing-donations-from-a-csv-file)）。
- **编辑批次详情**——点击批次行上的 **Edit** 按钮（或在已打开批次的顶部点击 **Edit Batch**），即可更改名称或日期。只有具备 **Edit Donations** 权限的人员才会在此处看到 **Delete**；删除批次会移除其中的奉献，如果是在批次自身页面中删除，则会返回批次列表。
- **排序**——使用列标题可按名称或日期对批次排序。
- **导出**——点击页面顶部的 **Export**，即可将当前显示的批次下载为电子表格（CSV）。
- **失败的事件**——如果你的支付网关报告了问题，页面顶部会出现 **Failed events** 按钮（并显示未解决事件的数量）。点击即可显示或隐藏批次下方的事件列表。
- **从 Stripe 导入**——点击页面顶部的 **Import missing Stripe transactions**，即可打开 [Stripe 导入](stripe-import.md)工具。仅当你的教会奉献网关为 Stripe 时，此按钮才会出现。

## 每笔奉献由谁登记 {#who-entered-each-gift}

在批次中登记的每笔奉献，都会在捐赠人姓名下方显示 **Entered by** 及登记人的姓名，因此无需签名表，也能知道是谁登记的。B1 会根据当前登录的用户自动记录这一信息，之后编辑该笔奉献也不会改变它。通过 **Import CSV** 导入的奉献，则显示执行导入的人员。

在线奉献、通过 [Stripe 导入](stripe-import.md)工具添加的奉献，以及在 2026 年 11 月新增此功能之前登记的奉献，都不会显示姓名。

## 关闭和重新开放批次 {#closing-and-reopening-a-batch}

当批次已经清点并存入银行后，请将其关闭，使其中的奉献保持关闭时的状态。

1. 打开批次。
2. 点击页面顶部的 **Close Batch**。

批次名称旁边的状态标签会从 **Open** 变为 **Closed**，批次列表页面的 **Status** 列也会显示 **Closed**，并且批次顶部会出现一条通知说明该批次已关闭。批次关闭期间，具有 **Enter Donations** 权限的人员仍可查看该批次，但不能添加、编辑或删除其中的奉献，也不能更改批次的名称或日期。

若要再次进行更改，请打开批次并点击 **Reopen Batch**。新建的批次始终处于开放状态。

:::info
只有具备 **Edit Donations** 权限的人员才能看到 **Close Batch** 和 **Reopen Batch** 按钮。如果需要更正，他们也可以在不重新开放的情况下，更改已关闭批次中的奉献。
:::

## 谁可以更改批次 {#who-can-change-a-batch}

有两种[角色权限](../settings/roles-permissions.md)可以让人员处理批次：

- **Edit Donations**——完全权限：可以添加和删除批次，关闭和重新开放批次，并且无论批次是开放还是关闭，都可以添加、编辑或删除任何奉献。
- **Enter Donations**——适用于负责清点和登记奉献的团队与志愿者。他们可以添加批次，并添加、编辑或删除奉献，但仅限批次处于开放状态时。他们不能删除批次、关闭或重新开放批次，也不能更改通过在线奉献收到的奉献。

拥有 **Enter Donations** 但没有 **View Donation Summaries** 权限的人员，会在 B1 Admin 菜单中看到 **Donations**，点击后将直接进入批次页面。**Summary**、**Funds**、**Campaigns** 和 **Giving Statements** 对他们隐藏。若要打开批次并查看其中的奉献，该角色还需要 **View Donations** 权限。

:::tip
常见的设置方式是创建一个"清点团队"角色，赋予 **Enter Donations** 和 **View Donations** 权限；同时由财务负责人持有 **Edit Donations** 权限，并在存款对账完成后关闭每个批次。
:::

## 打印批次 {#printing-a-batch}

打开批次，点击奉献列表上方的 **Print**，即可打印纸质副本，供清点团队或存款记录使用。打印件包括：

- 教会抬头——你的徽标（如果你已上传，则使用[网站 > 外观](../website/appearance.md)中的 **Light Background Logo**），其下方为教会名称，然后是批次名称和批次日期
- 批次中的每笔奉献，包括捐赠人姓名、登记人、方式、备注、日期和金额（已退款的奉献会被划掉并标记为已退款）
- **Fund Subtotals**（基金小计）——批次中每个基金的奉献总额
- **Batch Total**（批次合计）——整个批次的合计金额

只有当批次中至少有一笔奉献时，**Print** 按钮才会出现。

### 一次打印多个批次 {#printing-several-batches-at-once}

若要一次性打印某一时段的所有批次——例如上个月的全部存款——请点击 **Batches** 页面顶部、**Export** 旁边的 **Print**。随即会打开 **Print Batches** 页面，其 **Start Date** 和 **End Date** 与屏幕上显示的批次相匹配：即所选年份的 1 月 1 日至 12 月 31 日；若选择了 **All**，则为最早至最晚的批次日期。你可以更改任一日期，以选择其他范围。

范围内所有日期的批次（包括开始和结束日期）都会按日期顺序打印，每页一个批次，版式与单个批次的打印件相同。没有奉献的批次会被略过；如果该范围内的批次都没有奉献，则会显示"此日期范围内没有包含奉献的批次。"点击 **Print** 即可打开浏览器的打印对话框，或点击 **Close** 返回批次列表。

## 导出批次到 QuickBooks Online {#exporting-a-batch-to-quickbooks-online}

打开批次，点击 **Export for QuickBooks**，即可将该批次下载为日记账分录，供 QuickBooks Online 导入（**Settings > Import Data > Journal Entries**）。文件包含一笔对 **Undeposited Funds**（未存入资金）的借方分录（金额为批次合计），以及每个基金一笔贷方分录，并以每个基金的名称作为账户名称。导入时 QuickBooks 会要求你将这些名称与会计科目表进行匹配，因此请按照簿记人员为收入科目命名的方式为基金命名，或在导入时一次性完成映射。

:::tip
请始终如一地为批次命名，方便日后查找。在名称中加入日期和收款类型（例如"主日上午 - 2025-02-09"），可以让列表随着数量增长仍然井井有条。
:::

## 后续步骤 {#next-steps}

创建批次后，请参阅[登记奉献](recording-donations.md)，了解如何向批次中添加单笔奉献。你也可以[导入 Stripe 交易](stripe-import.md)，从在线奉献自动创建批次。
