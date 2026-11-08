---
title: "指南：设置在线奉献"
description: "在 B1 Admin 中设置在线奉献：创建奉献基金、连接 Stripe，并在您的 B1.church 网站上为会众添加“捐赠”页面。"
---

# 设置在线奉献

<div class="article-intro">

按照以下步骤，即可在您的教会开始接受在线捐款，包括创建奉献基金、连接 Stripe 处理支付，以及与会众分享奉献页面。完成后，会友即可通过您的网站和手机应用在线奉献。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 拥有管理员权限的 B1 Admin 账户，参见[角色与权限](../people/roles-permissions.md)
- 一个 Stripe 账户（如果没有，可在 [stripe.com](https://stripe.com) 免费注册）

</div>

## 第 1 步：创建奉献基金

基金是捐赠者可以奉献的类别。在接受捐款之前，您至少需要一个基金。

按照[基金](../donations/funds.md)指南设置您的奉献类别：

1. 创建您最常用的基金（例如“总务基金”“建堂基金”“宣教基金”）
2. 适当标记可抵税的基金，这会影响年终奉献证明

:::tip
您可以随时添加更多基金。建议从最常见的奉献类别开始。
:::

## 第 2 步：连接 Stripe

Stripe 负责所有支付处理。您需要将 Stripe 账户连接到 B1 Admin，这样捐款才能转入您的银行账户。

按照[在线奉献设置](../donations/online-giving-setup.md)指南连接 Stripe：

1. 登录您的 Stripe 控制台，获取 Publishable Key（可公开密钥）和 Secret Key（私密密钥）
2. 在 B1 Admin 中进入“设置”，输入这两个密钥

:::warning
Stripe 只会显示一次您的私密密钥。请在离开 Stripe 控制台之前复制并保存。如果丢失，您需要重新生成一个新的密钥。
:::

## 第 3 步：在您的网站上添加奉献页面

在您的 B1 网站上添加一个捐赠页面，方便会众奉献。

按照[在线奉献设置](../donations/online-giving-setup.md)和[管理页面](../website/managing-pages.md)指南完成以下操作：

1. 在您的 B1.church 网站上添加“捐赠”标签页
2. 您的奉献网址将为：`https://yoursubdomain.b1.church/donate`
3. 会友可以不登录即可奉献（公开页面），也可以登录以保存支付方式和查看奉献记录

## 第 4 步：进行一次测试捐款

在向会众宣布之前，请先确认一切正常。

1. 进行一笔小额测试捐款，确认整个流程畅通
2. 在 B1 Admin 的“捐款”下检查该笔捐款是否出现

:::tip
如果希望在不产生真实扣款的情况下进行验证，可以先使用 Stripe 的测试模式，然后在向会众宣布前切换到正式模式。
:::

## 第 5 步：通知您的会众

告知会众，让他们知道可以在线奉献。

1. 通过您的网站、电子邮件通讯、主日流程单和社交媒体分享奉献网址
2. 会友也可以通过 [B1 App](../../b1-church/giving/index.md) 奉献，奉献功能已内置其中

:::info
登录的会友可以保存支付方式、设置定期奉献，并查看奉献记录。匿名奉献同样可行，无需登录。
:::

## 第 6 步：日常管理

全年保持奉献记录更新，并生成报告。

1. 定期（每周或每月）[导入 Stripe 交易记录](../donations/stripe-import.md)，保持记录最新
2. [查看奉献报告](../donations/donation-reports.md)，按基金追踪奉献趋势和总额
3. [生成年终奉献证明](../donations/giving-statements.md)，供捐赠者用于报税

:::tip
请至少每月导入一次 Stripe 交易记录，以确保记录保持最新。完整的年终流程请参阅[年终报告指南](./year-end-reports.md)。
:::

## 完成！

您的教会现已开始接受在线捐款。会友可以通过您的网站、B1 App 或任何带浏览器的设备进行奉献。所有捐款都会自动记录在 B1 Admin 中。

## 相关文章

- [基金](../donations/funds.md)：创建和管理奉献类别
- [批次](../donations/batches.md)：将捐款整理为分组
- [记录捐款](../donations/recording-donations.md)：手动录入现金和支票捐款
- [Stripe 导入](../donations/stripe-import.md)：将在线交易导入 B1 Admin
- [捐款报告](../donations/donation-reports.md)：查看奉献趋势和总额
- [奉献证明](../donations/giving-statements.md)：生成年终报税证明
- [进行奉献](../../b1-church/giving/making-donations.md)：会友在 B1.church 和 B1 App 中的奉献体验
