---
title: "指南：设置在线奉献"
description: "在 B1 Admin 中设置在线奉献：创建奉献基金、连接 Stripe，并在 B1.church 网站上为成员添加奉献页面。"
---

# 设置在线奉献

<div class="article-intro">

本指南将引导你完成在教会接受在线奉献所需的全部步骤——从创建奉献基金，到连接 Stripe 处理付款，再到与会众分享奉献页面。完成后，成员即可通过你的网站和移动应用在线奉献。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 拥有管理员权限的 B1 Admin 账户——参见[角色与权限](../people/roles-permissions.md)
- 一个 Stripe 账户（如需要，可在 [stripe.com](https://stripe.com) 免费创建）

</div>

## 第 1 步：创建奉献基金 {#step-1-create-donation-funds}

基金是捐赠人可以奉献的类别。在接受奉献之前，你至少需要一个基金。

请按照[基金](../donations/funds.md)指南设置你的奉献类别：

1. 在[跳转菜单](../introduction.md#getting-around-with-the-jump-menu)中，选择 **Donations > Funds**，然后点击 **Add Fund**
2. 创建你最常用的基金（例如"总基金""建堂基金""宣教"）
3. 对于奉献应计入年终奉献收据的基金，勾选 **Tax Deductible**（可免税）；对于捐赠人应能在线选择的基金，保持勾选 **Visible to Donors**（对捐赠人可见）

:::tip
你可以随时添加更多基金。先从最常见的奉献类别开始即可。
:::

## 第 2 步：连接 Stripe {#step-2-connect-stripe}

Stripe 负责处理所有付款。你需要将 Stripe 账户连接到 B1 Admin，使奉献款项进入你的银行账户。

请按照[在线奉献设置](../donations/online-giving-setup.md)指南连接 Stripe：

1. 登录你的 Stripe 后台，前往 **Developers > API Keys**（开发者 > API 密钥），找到你的 Publishable Key（可公开密钥）和 Secret Key（私密密钥）
2. 在 B1 Admin 中，进入 **Settings**，点击 **Giving**（奉献）板块中的 **Edit**，并将 **Provider**（提供商）设置为 **Stripe**
3. 将可公开密钥粘贴到 **Public Key**（公开密钥）中，将私密密钥粘贴到 **Secret Key**（私密密钥）中，确认 **Currency**（货币），然后点击 **Save**

B1 也支持 **Kingdom Funding** 和 **Paystack**（适用于非洲的教会）作为奉献提供商——参见[在线奉献设置](../donations/online-giving-setup.md)。

:::warning
Stripe 只会显示一次你的 Secret Key。在离开 Stripe 后台之前，请复制并保存。如果丢失，则需要重新生成一个新的密钥。
:::

## 第 3 步：在你的网站上添加奉献页面 {#step-3-add-a-giving-page-to-your-website}

添加一个奉献页面，让成员能够便捷地奉献。

请按照[在线奉献设置](../donations/online-giving-setup.md)和[管理页面](../website/managing-pages.md)指南操作：

1. 在你的 B1.church 网站中添加一个 **Donation**（奉献）标签页（或在网站构建工具的某个页面中添加一个 **Donation** 组件）
2. 你的奉献网址为：`https://yoursubdomain.b1.church/donate`
3. 成员无需登录即可奉献（公开页面），也可以登录以使用已保存的付款方式并查看奉献历史
4. 若要将捐赠人直接引导至某个基金，请在 **Donations > Funds** 中点击该基金上的 **Giving Link**（奉献链接），复制一个已预设基金和金额的链接（或下载二维码）

## 第 4 步：进行测试奉献 {#step-4-make-a-test-donation}

在向会众宣布之前，请先验证一切运作正常。

1. 进行一笔小额测试奉献，验证整个流程是否畅通
2. 在 B1 Admin 中，前往 **Donations > Batches**，确认该奉献已出现

:::tip
若要在不产生真实扣款的情况下进行验证，你可以先保存 Stripe 的测试密钥，然后在向会众宣布之前，在 **Settings > Giving** 中将其替换为正式的密钥。
:::

## 第 5 步：通知你的会众 {#step-5-announce-to-your-congregation}

告知大家，让成员知道他们可以在线奉献。

1. 通过你的网站、电子邮件简报、主日周报和社交媒体分享奉献网址
2. 成员也可以通过 [B1 应用](../../b1-church/giving/index.md)奉献——奉献功能已内置其中

:::info
登录的成员可以保存付款方式、设置定期奉献并查看奉献历史。匿名奉献同样可行——无需登录。
:::

## 第 6 步：日常管理 {#step-6-ongoing-management}

全年保持奉献记录的更新，并生成报表。

1. 在线奉献会自动记录。如果有 Stripe 交易未同步，请使用 [Stripe 导入](../donations/stripe-import.md)进行补充——点击 **Preview**（预览）查看缺失的内容，然后点击 **Import Missing**（导入缺失项）
2. 在 **Donations > Summary**（奉献 > 概览）下[查看奉献报表](../donations/donation-reports.md)，跟踪奉献趋势以及各基金的总额
3. 查看 **Donations > Failed Gifts**（奉献 > 失败的奉献），找出银行卡被拒的定期奉献，待捐赠人更新付款方式后，点击 **Retry**（重试）
4. 为捐赠人[生成年终奉献收据](../donations/giving-statements.md)，供其用于税务记录

:::tip
在每月结账之前，请先运行一次 Stripe 导入预览，确保你的记录与 Stripe 相符。完整的年终流程，请参阅[年终报表指南](./year-end-reports.md)。
:::

## 完成！ {#youre-done}

你的教会现已可以接受在线奉献。成员可以通过你的网站、B1 应用，或任何带有网页浏览器的设备进行奉献。所有奉献都会自动记录在 B1 Admin 中。

## 相关文章 {#related-articles}

- [基金](../donations/funds.md)——创建和管理奉献类别
- [批次](../donations/batches.md)——将奉献整理为批次
- [登记奉献](../donations/recording-donations.md)——手动录入现金和支票奉献
- [Stripe 导入](../donations/stripe-import.md)——将在线交易导入 B1 Admin
- [奉献报表](../donations/donation-reports.md)——查看奉献趋势和总额
- [奉献收据](../donations/giving-statements.md)——生成年终税务收据
- [进行奉献](../../b1-church/giving/making-donations.md)——B1.church 和 B1 应用中的成员奉献体验
