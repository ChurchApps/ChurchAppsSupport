---
title: "在线奉献设置"
---

# 在线奉献设置

<div class="article-intro">

B1 Admin 与 **Stripe**、**PayPal** 和 **Kingdom Funding** 集成，让您的成员可以通过 B1.church 网站在线奉献。配置完成后，在线捐赠会自动出现在您的奉献记录中，与手动输入的捐赠并列，使一切都保存在一个系统中。

</div>

<div class="prereqs">
<h4>开始前</h4>

- 设置您的[奉献基金](funds.md)，以便捐赠者可以指定他们的奉献
- 在 [stripe.com](https://stripe.com) 创建 Stripe 账户并激活（退出测试模式）
- 准备好您的 B1 Admin 登录凭证

</div>

## 设置 Stripe

1. 访问 [stripe.com](https://stripe.com) 创建账户（如果尚未有账户）。确保 **激活您的账户**，并退出测试模式。
2. 在 Stripe 中，转到 **Developers > API Keys**。
3. 复制您的 **Publishable Key**（可发布密钥）。
4. 登录到 [B1 Admin](https://admin.b1.church/)。
5. 点击顶部导航栏中的 **Church**，然后点击 **Edit Church Settings**。
6. 点击 **Church Settings** 旁的编辑图标。
7. 向下滚动到 **Giving**（奉献）部分。
8. 将 **Provider** 设置为 **Stripe**。
9. 将您的可发布密钥粘贴到 **Public Key** 字段中。
10. 返回 Stripe，显示您的 **Secret Key**（您只能查看一次，请保存备份）。
11. 将 Secret Key 粘贴到 **Secret Key** 字段中，然后点击 **Save**。

:::warning
您的 Stripe Secret Key 仅显示一次。在离开 Stripe 仪表板前，请将其复制到安全的位置。如果丢失，您需要生成新密钥。
:::

## 选择货币

选择 Stripe 作为提供商后，**Currency**（货币）下拉菜单会与您的 API 密钥一起显示。选择与您 Stripe 账户的结算货币相匹配的货币，以确保正确收费。

支持的货币包括 USD、EUR、GBP、CAD、AUD、INR、JPY、SGD、HKD、SEK、NOK、DKK、CHF、MXN 和 BRL。您可以在 [Stripe Dashboard](https://dashboard.stripe.com/settings/currencies) 中确认或更改账户的默认货币。

:::info
您在此处选择的货币用于一次性捐赠、定期订阅、手续费计算和捐赠报告。如果稍后切换货币，只有新的捐赠和订阅会使用新货币 — 现有的定期捐赠会继续使用创建时的货币。
:::

:::warning
确保您的 Stripe 账户已配置为接受您选择的货币。如果您的 Stripe 账户不支持所选货币，捐赠将在结账时失败。
:::

## 将奉献页面添加到您的 B1.church 网站

1. 转到 [b1.church](https://b1.church/) 并登录。
2. 点击 **Settings**（设置）图标。
3. 点击 **Add Tab**（添加标签页）。
4. 选择 **Donation** 作为类型。
5. 输入标签页的名称（例如"Give"）并点击 **Save**。
6. 可选地更改标签页图标 — 在图标搜索中输入"Giv"找到与奉献相关的图标。

您的奉献页面现已上线。成员可以在 `yoursubdomain.b1.church/donate` 访问。

## 分享您的奉献链接

要查找您的奉献 URL，请转到 **B1 Admin** 并点击 **Settings** 图标查看您的子域。您的奉献链接格式为：

`https://yoursubdomain.b1.church/donate`

在您的网站、电子邮件或公告中分享此链接，以便成员知道在哪里在线奉献。

## 奉献通知

每次收到捐赠时，Stripe 都会发送电子邮件通知。要更改通知电子邮件地址，请转到 Stripe 仪表板，点击右上角的您的头像，选择 **Profile**，并更新您的电子邮件地址。

## 处理费选项

您可以将奉献页面配置为让捐赠者选择支付处理费，以便您的教会获得全部捐赠金额。此设置在 B1 Admin 的教会设置中管理。

:::tip
设置完成后，请进行小额测试捐赠以确认一切正常工作，然后再向您的会众宣传在线奉献。
:::

## 设置 Kingdom Funding

Kingdom Funding 是一家支持信用卡/借记卡和 ACH 银行转账的基督教支付处理商。如果您的教会与 Kingdom Funding 合作，您可以将其连接为您的奉献网关。

:::info
Kingdom Funding 集成目前处于测试阶段。请联系您的 B1 账户代表为您的教会启用此功能。
:::

1. 在 [kingdomfunding.org](https://kingdomfunding.org) 注册或登录。
2. 从 Kingdom Funding 商家门户获取您的 **Security Key**（安全密钥）和 **Private Key**（私密密钥）。
3. 在 B1 Admin 中，转到 **Settings** 并打开 **Church Settings**。
4. 在 **Giving** 部分，将 **Provider** 设置为 **Kingdom Funding**。
5. 将您的 Security Key 粘贴到 **Security Key** 字段，将您的 Private Key 粘贴到 **Private Key** 字段中。
6. 设置您从 Kingdom Funding 收到的 **Webhook Key**，并将显示的 webhook URL 复制到您的 Kingdom Funding 商家设置中，以便 Kingdom Funding 可以通知 B1 已完成的交易。
7. 保存。

连接后，成员将在奉献页面上看到卡/银行切换，可以通过信用卡或 ACH 转账奉献。

## 后续步骤

- 使用 [Stripe Import](stripe-import.md) 如果在线交易未自动同步，将其导入到 B1 Admin 中
- 检查您的[捐赠报告](donation-reports.md)以验证在线捐赠是否正确显示
- 生成[奉献对账单](giving-statements.md)，包括在线和离线捐赠
