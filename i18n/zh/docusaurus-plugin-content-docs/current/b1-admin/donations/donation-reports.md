---
title: "捐款报告"
---

# 捐款报告

<div class="article-intro">

B1 Admin 为你提供多种查看和分析教会奉献数据的方式。捐款**汇总**页面上的奉献仪表板以图表和筛选器提供可视化概览，而报告板块则提供更详细的捐款汇总报告。你可以利用这些工具跟踪奉献趋势、为董事会会议做准备，或核对你的记录。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 确保捐款已[按批次录入](recording-donations.md)或[从 Stripe 导入](stripe-import.md)
- 确认你的[基金](funds.md)设置正确，以便捐款能被正确分类

</div>

## 奉献仪表板

奉献仪表板是 **Summary** 页面的 **Dashboard** 视图，也是你打开 **Donations** 板块时首先看到的页面。

1. 打开[跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的 B1 Admin 搜索栏），展开 **Donations**，然后点击 **Summary**。**Summary** 页面会打开 **Dashboard** 视图。右上角的 **View** 切换按钮可在 **Dashboard** 和 **Lapsed Givers**（流失奉献者）之间切换。
2. 使用报告上方的 **Weekly**（每周）、**Monthly**（每月）和 **Quarterly**（每季度）切换按钮，选择奉献的分组方式。
3. 在 **Filter Report** 面板中，设置 **Start Date** 和 **End Date**（默认为过去一年至昨天），还可以选择一个 **Fund**（基金），然后点击 **Run Report**。页面打开时，报告会使用默认设置自动运行。
4. 四张 **KPI 卡片**显示所选时间范围内的奉献指标：
   - **Total Giving**（奉献总额）—— 捐款的总金额。
   - **Average Gift**（平均礼金）—— 平均每笔捐款的金额。
   - **Unique Donors**（独立捐款人数）—— 奉献的不同人数。
   - **Total Donations**（捐款笔数）—— 单笔捐款的总数量。
5. KPI 下方的柱状图按周、月或季度显示奉献金额，并按基金细分。
6. 点击 **Download Options** 并选择 **Summary**，即可导出按时段和基金汇总的 CSV 文件；或点击打印图标打印报告。你的教会标志（如果你已上传过，则为 [Website > Appearance](../website/appearance.md) 中的**浅色背景标志**）和名称会居中显示在打印报告的顶部。即使你在深色模式下使用 B1 Admin，打印件也会使用深色文字和浅色图表。

如果该时间段内的捐款是以多种货币进行的，KPI 总额会被换算为教会的货币，并且卡片下方会出现**按当前汇率换算**的说明。详情参见[多币种支持](./multi-currency.md#converted-totals)。

:::info
仪表板显示的是汇总的奉献数据，不包括捐款人的个人姓名。如需查看个人捐款详情，请使用[批次](batches.md)页面。
:::

## 流失奉献者

在 **View** 切换按钮中选择 **Lapsed Givers**，即可列出某一时期曾经奉献、但之后没有再奉献的人员。默认情况下，它会比较去年整年与今年至今的数据；你可以更改任一日期范围来扩大或缩小搜索范围。每一行显示人员、其最后一次礼金的日期，以及其在较早时期的捐款总额。点击 **Download Options > Summary** 可将该名单下载为 CSV 文件，用于后续邮寄或电话跟进。

## 查看捐款人明细

要查看谁捐了多少、捐给了哪个基金的详细情况：

1. 进入 **Donations > Batches**。
2. 点击某个**批次名称**将其打开。
3. 批次详情页会列出每笔捐款的方式（以及支票号码或卡号后四位）、捐款人姓名、日期、备注和金额，底部显示合计。
4. 在某笔捐款行上点击 **Edit**，即可打开该笔捐款的完整详情，包括其所属基金。
5. 点击列表上方的 **Export**，即可下载包含该批次全部捐款人和捐款信息的 CSV 文件。

## 捐款汇总报告

捐款报告已内置于 Donations 板块中——**Summary** 页面即为你的捐款汇总报告：

1. 在跳转菜单中，选择 **Donations > Summary**。
2. 在 **Dashboard** 视图中，于 **Filter Report** 面板设置 **Start Date** 和 **End Date**，然后点击 **Run Report**。
3. 点击 **Download Options** 并选择 **Summary**，将报告导出为 CSV 文件。

## 导出数据

你可以在多个位置导出捐款数据：

- **Summary 页面** —— 下载按周、月或季度及基金汇总的奉献总额 CSV
- **批次详情页面** —— 下载包含捐款人详细信息的单笔捐款 CSV
- **基金详情页面** —— 下载特定基金的捐款历史

:::tip
进行年终报告时，可将 Summary 页面的导出与[奉献报表](giving-statements.md)工具结合使用，既能获得汇总趋势，又能获得捐款人的个人报表。
:::

## 下一步

- 为年终的捐款人生成[奉献报表](giving-statements.md)
- 查看各个[批次](batches.md)，核对捐款详情
- 查看[基金](funds.md)详情页面，了解按类别划分的奉献明细
