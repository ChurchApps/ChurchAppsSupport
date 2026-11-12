---
title: "奉献报表"
description: "在 B1 Admin 中通过奉献概览仪表板、流失奉献者视图和 CSV 导出，查看奉献总额、奉献者流失情况以及批次层面的详细信息。"
---

# 奉献报表

<div class="article-intro">

B1 Admin 提供多种方式来查看和分析教会的奉献数据。奉献**概览**页面上的奉献仪表板以图表和筛选器提供可视化的总览，而报表板块则提供更详细的奉献概要报表。你可以利用这些工具跟踪奉献趋势、为董事会会议做准备，或核对记录。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 确保奉献已[按批次登记](recording-donations.md)或[从 Stripe 导入](stripe-import.md)
- 核实你的[基金](funds.md)设置正确，以确保奉献被正确分类

</div>

## 奉献仪表板 {#giving-dashboard}

奉献仪表板即**概览**页面的**仪表板**视图，也就是你打开**奉献**板块时首先看到的页面。

1. 打开[跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（B1 Admin 左上角的搜索栏），展开 **Donations**，然后点击 **Summary**。**Summary** 页面会打开**仪表板**视图。右上角的 **View** 切换按钮可在 **Dashboard**（仪表板）和 **Lapsed Givers**（流失奉献者）之间切换。
2. 使用报表上方的 **Weekly**（每周）、**Monthly**（每月）和 **Quarterly**（每季度）切换按钮，选择奉献的分组方式。
3. 在 **Filter Report** 面板中设置 **Start Date** 和 **End Date**（默认为过去一年至昨天），也可以选择一个 **Fund**（基金），然后点击 **Run Report**。页面打开时，报表会自动以默认设置运行。
4. 四张 **KPI 卡片**显示所选时间范围内的奉献指标：
   - **Total Giving**（奉献总额）——捐赠的总金额。
   - **Average Gift**（平均奉献）——平均每笔奉献的金额。
   - **Unique Donors**（独立奉献者）——奉献的不同人数。
   - **Total Donations**（奉献总笔数）——单笔奉献的总数。
5. KPI 下方的柱状图按周、月或季度显示奉献金额，并按基金细分。
6. 点击 **Download Options**，选择 **Summary**，即可导出按时段和基金汇总的 CSV；或点击打印图标打印报表。打印的报表顶部中央会显示教会徽标（如果你已在[网站 > 外观](../website/appearance.md)中上传，则使用 **Light Background Logo**）和教会名称。即使你在 B1 Admin 中使用深色模式，打印件仍使用深色文字和浅色图表。

如果该时段内的奉献使用了多种货币，KPI 总额会按当前汇率换算为教会的货币，并在卡片下方显示 **Converted at current exchange rates**（按当前汇率换算）的说明。详情请参见[多币种支持](./multi-currency.md#converted-totals)。

:::info
仪表板显示的是汇总的奉献数据，不包括个别捐赠人的姓名。如需查看捐赠人层面的详细信息，请使用[批次](batches.md)页面。
:::

## 流失奉献者 {#lapsed-givers}

在 **View** 切换按钮中选择 **Lapsed Givers**，可列出在某一时段内曾奉献、但之后再未奉献的人员。默认比较上一个日历年与今年至今的数据；如需扩大或缩小搜索范围，可在 **Filter Report** 面板中更改 **Previous Period Start**（上一时段开始）、**Previous Period End**（上一时段结束）、**Current Period Start**（当前时段开始）或 **Current Period End**（当前时段结束），然后点击 **Run Report**。此视图需要 **View Donations** 权限。每一行显示人员、其最近一次奉献的日期以及其在较早时段的奉献总额；**Download Options > Summary** 可将列表下载为 CSV，用于后续邮寄或电话联络。

## 查看捐赠人层面的详细信息 {#viewing-donor-level-details}

如需查看谁奉献了多少、奉献到哪个基金，请按以下步骤操作：

1. 进入 **Donations > Batches**。
2. 点击某个**批次名称**将其打开。
3. 批次详情页面会列出每笔奉献，包括其方式（以及支票号码或卡号后几位）、捐赠人姓名、日期、备注和金额，底部显示合计。
4. 点击某笔奉献所在行的 **Edit**，即可打开该笔奉献的完整详情，包括其所属基金。
5. 点击列表上方的 **Export**，即可下载该批次所有捐赠人和奉献信息的 CSV。

## 奉献概要报表 {#donation-summary-report}

奉献报表已内置于奉献板块中——**概览**页面即是你的奉献概要报表：

1. 在跳转菜单中，选择 **Donations > Summary**。
2. 在**仪表板**视图中，于 **Filter Report** 面板设置 **Start Date** 和 **End Date**，然后点击 **Run Report**。
3. 点击 **Download Options**，选择 **Summary**，即可将报表导出为 CSV 文件。

## 导出数据 {#exporting-data}

你可以在多个位置导出奉献数据：

- **概览页面**——下载按周、月或季度及基金汇总的奉献总额 CSV
- **批次详情页面**——下载包含捐赠人详细信息的单笔奉献 CSV
- **基金详情页面**——下载特定基金的奉献历史

:::tip
进行年终报表时，可将概览页面的导出与[奉献收据](giving-statements.md)工具结合使用，既获得汇总趋势，也获得每位捐赠人的个人收据。
:::

## 后续步骤 {#next-steps}

- 年底为你的捐赠人生成[奉献收据](giving-statements.md)
- 查看各个[批次](batches.md)，核实奉献详情
- 查看[基金](funds.md)详情页面，了解按类别划分的奉献情况
