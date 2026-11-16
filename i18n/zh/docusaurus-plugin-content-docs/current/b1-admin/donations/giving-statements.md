---
title: "奉献收据"
description: "在 B1 Admin 中为每位捐赠人生成年终奉献收据，然后以 CSV 文件下载或打印出来邮寄，并附上可免税的合计金额。"
---

# 奉献收据 {#giving-statements}

<div class="article-intro">

每年年底，捐赠人都需要一份可免税奉献的摘要，用于留存记录。B1 Admin 让你可以一次性为所有捐赠人生成这些收据，为你节省大量手工操作的时间。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 核实你的[基金](funds.md)已正确标记为 **Tax Deductible**（可免税）——只有发给可免税基金的奉献才会出现在收据上
- 确保所有奉献都已[登记](recording-donations.md)，并且所有在线交易都已[从 Stripe 导入](stripe-import.md)

</div>

## 打开奉献收据 {#accessing-giving-statements}

1. 在 **B1 Admin** 中，打开[跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），并展开 **Donations**。
2. 点击 **Giving Statements**。随即打开 **Batch Giving Statements**（批次奉献收据）页面。

## 生成收据 {#generating-statements}

1. 在 **Select Year**（选择年份）面板中，从下拉菜单选择 **Year**（年份）。你可以选择当前年份或之前的五个年份。
2. 页面只加载该年份（1 月 1 日至 12 月 31 日）的奉献数据，因此即使教会有多年的奉献历史，页面也能快速打开。切换到其他年份时，摘要会刷新为该年份的奉献数据。年份下方的 **Summary**（摘要）面板会显示该年的统计信息，统计口径与收据所包含的奉献一致（仅发给不可免税基金的奉献不计入）：
   - **Total Donors**（奉献者总数）——奉献的人数
   - **Total Donations**（奉献总笔数）——单笔奉献记录的数量
   - **Total Amount**（总金额）——其奉献的合计金额

## 下载收据 {#downloading-statements}

**Download Options**（下载选项）面板提供两种将收据交给捐赠人的方式：

### 下载为 CSV 文件 {#download-as-csv-files}

在 **Individual CSV Files**（单独的 CSV 文件）下，点击 **Download ZIP**（下载 ZIP）（按钮上会显示文件数量），即可下载一个 ZIP 文件，其中包含每位捐赠人的单独 CSV 文件。如果你希望逐一通过电子邮件发送收据，或将其导入其他系统，此方式很有用。

### 打印全部收据 {#print-all-statements}

在 **Printable Statements**（可打印的收据）下，点击 **Print All**（全部打印）（按钮上会显示收据数量），即可在浏览器中打开所选年份每位捐赠人收据的可打印视图。随后，使用浏览器的打印功能将其发送到打印机。每份收据都从新的一页开始，便于折叠和邮寄；收据按捐赠人的姓氏、再按名字排序。

如果你已在[网站 > 外观](../website/appearance.md)中上传了 **Light Background Logo**（浅色背景徽标），它会居中打印在每份收据的顶部、收据标题之上。这适用于 **Print All**、从人员记录中打印的单个捐赠人收据，以及成员在 B1.church 的**奉献**页面中自行打印的收据。

:::tip
请在一月初、记录仍然新鲜时就生成收据。在生成收据之前，请再次核实你的基金已正确标记为可免税——只有发给可免税基金的奉献才会被计入。
:::

:::info
奉献收据仅包含分配到已启用 **Tax Deductible** 设置的基金的奉献。如果某个基金未标记为可免税，其奉献将不会出现在收据上。你可以在[基金](funds.md)页面管理此设置。
:::

## 收据中的礼物备注 {#gift-memos-on-statements}

每份收据都会列出每笔奉献的日期、方式、基金和金额。当收据上至少有一笔奉献带有 **Memo**（备注）时，基金栏之后会增加一列 **Memo**，使捐赠人能够看到每笔奉献的用途。没有备注的收据则保持四列版式。奉献的 **Notes**（内部备注）仅供内部使用，绝不会出现在收据上。ZIP 中的 CSV 文件会将备注作为最后一列。

若要在收据上注明用途，请在[登记奉献](recording-donations.md)时将其填写为该笔奉献的 **Memo**；如果希望单独汇总，则可为其设置独立的[基金](funds.md)。

## 加拿大、澳大利亚和新西兰的收据格式 {#receipt-formats-for-canada-australia-and-new-zealand}

教会在美国以外地区，可以将收据切换为其所在国家的官方收据格式。点击奉献收据页面顶部的 **Statement format**（收据格式）（或前往 **Settings** 并打开 **Giving** 板块），将 **Statement Format**（收据格式）（默认为 **Standard**）设置为 **Canada - CRA official receipt**（加拿大 - CRA 官方收据）、**Australia**（澳大利亚）或 **New Zealand**（新西兰），然后填写出现的字段：你的注册号（**CRA Registration Number**（CRA 注册号）、**ABN**（澳大利亚商业编号）或 **NZ Charity Registration Number**（新西兰慈善注册号））、**Organization Address**（机构地址）、**Authorized Signatory Name**（授权签署人姓名），加拿大还需填写 **City of Issue**（签发城市）。点击 **Save**。

收据随后会采用税务机构要求的措辞（例如加拿大的"Official Receipt for Income Tax Purposes"（所得税用途官方收据），并附上 CRA 参考编号），收据编号格式为 `YEAR-DONORID`，可享受税务优惠的金额仅计入可免税基金的奉献，而发给不可免税基金的奉献则单独列为一行。当捐赠人从 B1.church 自行打印收据时，同样会看到该收据信息栏。

## 成员在 B1.church 中看到的内容 {#what-members-see-in-b1church}

同一个 **Giving** 设置板块也控制成员在 B1.church 中自己的奉献页面所显示的内容：

- **Member Giving History**（成员奉献历史）用于选择成员可查看的年份。默认为 **All years**（所有年份）。选择 **Through 2025**（截至 2025 年）（或其他任何年份）则会停在该年，因此在你允许之前，成员无法查看或打印更晚的年份。在你完成更正和退款处理期间，可以用此设置暂时隐藏当年的数据。选择 **Hidden**（隐藏）则会完全移除奉献历史、年度总额以及收据打印功能。成员仍可以进行奉献。
- **Giving Note**（奉献备注）是一段简短的信息，显示在成员的奉献页面和奉献历史上，并印在每份奉献收据的底部，包括你在此处打印的收据。可用于填写退款政策等内容。

这些设置只会改变成员所看到的内容。你仍可以在此页面打印任何年份的收据。

## 后续步骤 {#next-steps}

如果在生成收据之前需要检查奉献详情，请访问[奉献报表](donation-reports.md)页面，或查看各个[批次](batches.md)。
