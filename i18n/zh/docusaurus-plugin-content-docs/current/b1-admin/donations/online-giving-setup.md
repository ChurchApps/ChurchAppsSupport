---
title: "在线捐赠设置"
---

# 在线捐赠设置

<div class="article-intro">

B1 Admin 与 **Stripe** 和 **PayPal** 相集成，使您的信徒可以通过您的 B1.church 网站进行在线捐赠。配置完成后，在线捐赠会自动出现在您的捐赠记录中，与手动输入的捐赠并列，让一切都保存在一个系统中。

</div>

<div class="prereqs">
<h4>开始前</h4>

- 设置您的[捐赠基金](funds.md)，以便捐赠者可以指定他们的捐赠用途
- 在 [stripe.com](https://stripe.com) 创建一个 Stripe 账户并激活（从测试模式切换出来）
- 准备好您的 B1 Admin 登录凭证

</div>

## 设置 Stripe

1. 如果您还没有账户，请在 [stripe.com](https://stripe.com) 创建一个。确保**激活您的账户**并退出测试模式。
2. 在 Stripe 中，转到 **Developers > API Keys**。
3. 复制您的 **Publishable Key**。
4. 登录 [B1 Admin](https://admin.b1.church/)。
5. 点击顶部导航中的 **Church**，然后点击 **Edit Church Settings**。
6. 点击 **Church Settings** 旁边的编辑图标。
7. 向下滚动到 **Giving** 部分。
8. 将 **Provider** 设置为 **Stripe**。
9. 将您的 Publishable Key 粘贴到 **Public Key** 字段中。
10. 返回 Stripe 并显示您的 **Secret Key**（您只能查看一次，因此请保存备份）。
11. 将 Secret Key 粘贴到 **Secret Key** 字段中，然后点击 **Save**。

:::warning
您的 Stripe Secret Key 只会显示一次。离开 Stripe 仪表板之前，请将其复制到安全位置。如果丢失，您需要生成新密钥。
:::

## 选择您的货币

选择 Stripe 作为提供商后，**Currency** 下拉菜单会出现在您的 API 密钥旁边。选择与您的 Stripe 账户结算货币相匹配的货币，以确保正确收取捐赠费用。

支持的货币包括 USD、EUR、GBP、CAD、AUD、INR、JPY、SGD、HKD、SEK、NOK、DKK、CHF、MXN 和 BRL。您可以在 [Stripe 仪表板](https://dashboard.stripe.com/settings/currencies)中确认或更改您的账户默认货币。

:::info
您在此处选择的货币用于一次性捐赠、定期订阅、费用计算和捐赠报告。如果您稍后更换货币，只有新捐赠和订阅会使用新货币——现有定期捐赠会继续使用其创建时的货币。
:::

:::warning
确保您的 Stripe 账户配置为接受您选择的货币。如果您的 Stripe 账户不支持所选货币，捐赠在结账时会失败。
:::

## 向您的 B1.church 网站添加捐赠页面

1. 转到 [b1.church](https://b1.church/) 并登录。
2. 点击 **Settings** 图标。
3. 点击 **Add Tab**。
4. 选择 **Donation** 作为类型。
5. 为该选项卡输入名称（例如"Give"）并点击 **Save**。
6. 可选择更改选项卡图标——在图标搜索中键入"Giv"以查找与捐赠相关的图标。

您的捐赠页面现在已上线。信徒可以在 `yoursubdomain.b1.church/donate` 访问它。

## 分享您的捐赠链接

要找到您的捐赠 URL，请转到 **B1 Admin** 并点击 **Settings** 图标以查看您的子域。您的捐赠链接遵循以下格式：

`https://yoursubdomain.b1.church/donate`

在您的网站、电子邮件或公报中分享此链接，让信徒知道在哪里可以进行在线捐赠。

## 捐赠通知

每次收到捐赠时，Stripe 都会发送电子邮件通知。要更改通知电子邮件地址，请转到 Stripe 仪表板，点击右上角的您的个人资料，选择 **Profile**，然后更新您的电子邮件地址。

## 处理费选项

您可以配置您的捐赠页面，让捐赠者可选择支付处理费，这样您的教会就能收到全额捐赠。此设置在 B1 Admin 的教会设置中进行管理。

:::tip
设置完成后，进行一次小额试捐来确认一切正常运作，然后再向您的信徒公布在线捐赠。
:::

## 后续步骤

- 如果在线交易不能自动同步，使用 [Stripe Import](stripe-import.md) 将在线交易拉入 B1 Admin
- 查看您的[捐赠报告](donation-reports.md)以验证在线捐赠是否正确显示
- 生成[捐赠声明](giving-statements.md)，包括在线和离线捐赠
