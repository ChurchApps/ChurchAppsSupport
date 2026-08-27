---
title: "在线捐赠设置"
---

# 在线捐赠设置

<div class="article-intro">

B1Admin 与 **Stripe**、**PayPal**、**Kingdom Funding** 和 **Paystack**（针对非洲的教会）整合，以便您的成员可以通过您的 B1.church 网站在线捐赠。配置后，在线捐赠会自动出现在您的捐赠记录中，与手动输入的礼物一起，将所有内容保留在一个系统中。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 设置您的[捐赠基金](funds.md)以便捐赠者可以指定他们的礼物
- 在 [stripe.com](https://stripe.com) 创建 Stripe 帐户并激活它（将其从测试模式中取出）
- 准备好您的 B1Admin 登录凭据

</div>

## 设置 Stripe

1. 如果您还没有帐户，请在 [stripe.com](https://stripe.com) 创建一个。确保**激活您的帐户**并将其从测试模式中取出。
2. 在 Stripe 中，转到**开发人员 > API 密钥**。
3. 复制您的**可发布密钥**。
4. 登录到 [B1Admin](https://admin.b1.church/)。
5. 单击顶部导航中的**教会**，然后单击**编辑教会设置**。
6. 单击**教会设置**旁边的编辑图标。
7. 向下滚动到**捐赠**部分。
8. 将**提供商**设置为 **Stripe**。
9. 将您的可发布密钥粘贴到**公开密钥**字段中。
10. 回到 Stripe 并显示您的**秘密密钥**（您只能查看一次，所以保存备份）。
11. 将秘密密钥粘贴到**秘密密钥**字段中，然后单击**保存**。

:::warning
您的 Stripe 秘密密钥只显示一次。在远离 Stripe 仪表板之前将其复制到安全位置。如果您丢失了它，您将需要生成一个新密钥。
:::

## 选择您的货币

选择 Stripe 作为您的提供商后，**货币**下拉菜单会出现在您的 API 密钥旁边。选择与您的 Stripe 帐户的结算货币匹配的货币，以便正确收取捐赠费用。

支持的货币包括 USD、EUR、GBP、CAD、AUD、INR、JPY、SGD、HKD、SEK、NOK、DKK、CHF、MXN 和 BRL。您可以在您的 [Stripe 仪表板](https://dashboard.stripe.com/settings/currencies)中确认或更改您的帐户的默认货币。

:::info
您在此选择的货币用于一次性捐赠、定期订阅、费用计算和捐赠报告。如果您稍后切换货币，只有新的捐赠和订阅会使用新货币 — 现有的定期礼物会继续使用创建时的货币。
:::

:::warning
确保您的 Stripe 帐户配置为接受您选择的货币。如果您的 Stripe 帐户不支持所选货币，捐赠将在结账时失败。
:::

## 将捐赠页面添加到您的 B1.church 网站

1. 转到 [b1.church](https://b1.church/) 并登录。
2. 单击**设置**图标。
3. 点击**添加标签**。
4. 选择**捐赠**作为类型。
5. 输入标签的名称（例如"捐赠"）并单击**保存**。
6. 可选择更改标签图标 — 在图标搜索中输入"捐赠"以获得与捐赠相关的图标。

您的捐赠页面现在已上线。成员可以在`yoursubdomain.b1.church/donate`访问它。

## 分享您的捐赠链接

要找到您的捐赠 URL，请转到 **B1Admin** 并单击**设置**图标以查看您的子域。您的捐赠链接遵循格式：

`https://yoursubdomain.b1.church/donate`

在您的网站、电子邮件或公告中分享此链接，以便成员知道在哪里在线捐赠。

## 捐赠通知

每次收到捐赠时，Stripe 都会发送电子邮件通知。要更改通知电子邮件地址，请转到 Stripe 仪表板，单击右上角的您的资料，选择**资料**，并更新您的电子邮件地址。

## 处理费选项

您可以配置您的捐赠页面，让捐赠者可选择覆盖处理费，以便您的教会获得全额捐赠。此设置在 B1Admin 中的教会设置中管理。

:::tip
设置后，进行小笔测试捐赠以确认一切正常，然后再向您的会众宣布在线捐赠。
:::

## 设置 Kingdom Funding

Kingdom Funding 是一个支持信用卡/借记卡和 ACH 银行转账的基督教支付处理器。如果您的教会已注册 Kingdom Funding，您可以将其连接为您的捐赠网关。

:::info
Kingdom Funding 整合目前处于测试版。联系您的 B1 帐户代表以为您的教会启用它。
:::

1. 在 [kingdomfunding.org](https://kingdomfunding.org) 注册或登录。
2. 从 Kingdom Funding 商人门户获取您的**安全密钥**（公开）和**私有密钥**。
3. 在 B1Admin 中，转到**设置**并打开**教会设置**。
4. 在**捐赠**部分，将**提供商**设置为 **Kingdom Funding**。
5. 将您的安全密钥粘贴到**安全密钥**字段，将您的私有密钥粘贴到**私有密钥**字段。
6. 设置您从 Kingdom Funding 收到的**Webhook 密钥**，并将显示的 webhook URL 复制到您的 Kingdom Funding 商人设置中，以便 Kingdom Funding 可以通知 B1 已完成的交易。
7. 保存。
