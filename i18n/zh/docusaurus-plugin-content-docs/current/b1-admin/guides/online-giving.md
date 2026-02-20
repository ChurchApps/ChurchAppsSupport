---
title: "指南：设置在线奉献"
---

# 设置在线奉献

<div class="article-intro">

逐步指导您在教会接受在线捐赠所需的一切——从创建捐赠基金、连接 Stripe 进行支付处理，到与会众分享奉献页面。完成后，会众将能够通过您的网站和移动应用进行在线奉献。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 拥有管理员权限的 B1 Admin 帐户——请参阅[角色与权限](../people/roles-permissions.md)
- 一个 Stripe 帐户（如需创建，请前往 [stripe.com](https://stripe.com) 免费注册）

</div>

## 第 1 步：创建捐赠基金

基金是捐赠者可以指定奉献的类别。您至少需要创建一个基金才能接受捐赠。

按照[基金](../donations/funds.md)指南设置您的奉献类别：

1. 创建最常用的基金（例如"一般基金"、"建堂基金"、"宣教基金"）
2. 适当标记免税基金——这会影响年终奉献报告

:::tip
您可以随时添加更多基金。先从最常用的奉献类别开始即可。
:::

## 第 2 步：连接 Stripe

Stripe 处理所有支付事务。您需要将 Stripe 帐户连接到 B1 Admin，以便捐赠款项转入您的银行帐户。

按照[在线奉献设置](../donations/online-giving-setup.md)指南连接 Stripe：

1. 登录您的 Stripe 控制面板，获取您的 Publishable Key 和 Secret Key
2. 在 B1 Admin 中，进入设置并输入这两个密钥

:::warning
Stripe 仅显示一次您的 Secret Key。在离开 Stripe 控制面板之前请复制并保存。如果遗失，您需要重新生成一个新的。
:::

## 第 3 步：在您的网站添加奉献页面

通过在 B1 网站上添加捐赠页面，方便会众进行奉献。

按照[在线奉献设置](../donations/online-giving-setup.md)和[页面管理](../website/managing-pages.md)指南：

1. 在您的 B1.church 网站上添加一个"捐赠"标签
2. 您的奉献链接将是：`https://yoursubdomain.b1.church/donate`
3. 会众无需登录即可奉献（公开页面），也可以登录以使用已保存的支付方式和捐赠记录

## 第 4 步：进行测试捐赠

在向会众宣布之前，请验证一切是否正常运行。

1. 进行一笔小额测试捐赠，验证整个流程是否端到端正常运作
2. 在 B1 Admin 的捐赠部分检查该笔捐赠是否已显示

:::tip
如果您想在不产生实际费用的情况下进行验证，请先使用 Stripe 的测试模式，然后在向会众宣布之前切换到正式模式。
:::

## 第 5 步：向会众宣布

让会众知道他们可以在线奉献。

1. 通过您的网站、电子邮件通讯、教会公告和社交媒体分享奉献链接
2. 会众还可以通过 [B1 Mobile 应用](../../b1-mobile/giving/)进行奉献——奉献功能已内置

:::info
登录的会众可以保存支付方式、设置定期奉献并查看奉献历史。匿名奉献同样可用——无需登录。
:::

## 第 6 步：日常管理

保持捐赠记录更新，并在全年生成报告。

1. 定期[导入 Stripe 交易](../donations/stripe-import.md)（每周或每月），以保持记录最新
2. [查看捐赠报告](../donations/donation-reports.md)以跟踪各基金的奉献趋势和总额
3. [生成年终奉献报告](../donations/giving-statements.md)以供捐赠者作为税务记录

:::tip
至少每月运行一次 Stripe 导入，以保持记录最新。有关完整的年终流程，请参阅[年终报告指南](./year-end-reports.md)。
:::

## 完成！

您的教会现在可以接受在线捐赠了。会众可以通过您的网站、B1 Mobile 应用或任何带有网页浏览器的设备进行奉献。所有捐赠将自动在 B1 Admin 中记录。

## 相关文章

- [基金](../donations/funds.md)——创建和管理捐赠类别
- [批次](../donations/batches.md)——将捐赠整理成组
- [记录捐赠](../donations/recording-donations.md)——手动输入现金和支票捐赠
- [Stripe 导入](../donations/stripe-import.md)——将在线交易导入 B1 Admin
- [捐赠报告](../donations/donation-reports.md)——查看奉献趋势和总额
- [奉献报告单](../donations/giving-statements.md)——生成年终税务报告
- [进行捐赠（网页端）](../../b1-church/giving/making-donations.md)——会众的奉献体验
- [进行捐赠（移动端）](../../b1-mobile/giving/making-donations.md)——通过移动应用奉献
