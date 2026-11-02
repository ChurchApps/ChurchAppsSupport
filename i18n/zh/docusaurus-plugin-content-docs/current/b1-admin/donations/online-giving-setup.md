---
title: "在线捐赠设置"
---

# 在线捐赠设置

<div class="article-intro">

B1 Admin 支持与 **Stripe**、**PayPal**、**Kingdom Funding** 和 **Paystack**（适用于非洲的教会）集成，使成员可以通过你的 B1.church 网站在线奉献。配置完成后，在线捐款会自动出现在你的奉献记录中，与手动录入的奉献并列显示，所有数据都保存在同一个系统中。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 设置好你的[奉献基金](funds.md)，以便捐献者指定其奉献用途
- 在 [stripe.com](https://stripe.com) 创建 Stripe 账户并将其激活（退出测试模式）
- 准备好你的 B1 Admin 登录凭据

</div>

## 设置 Stripe

1. 如果你还没有 Stripe 账户，请在 [stripe.com](https://stripe.com) 创建一个。请确保**激活你的账户**，并退出测试模式。
2. 在 Stripe 中，进入 **Developers > API Keys**。
3. 复制你的 **Publishable Key**（可公开密钥）。
4. 登录 [B1 Admin](https://admin.b1.church/)。
5. 进入 **Settings**，打开 **Giving** 部分。
6. 点击 **Giving** 部分上的 **Edit**。
7. 将 **Provider** 设置为 **Stripe**。
8. 将你的 Publishable Key 粘贴到 **Public Key** 字段中。
9. 返回 Stripe，显示你的 **Secret Key**（密钥只能查看一次，因此请务必备份保存）。
10. 将 Secret Key 粘贴到 **Secret Key** 字段中，然后点击 **Save**。

:::warning
Stripe 的 Secret Key 只会显示一次。在离开 Stripe 控制台之前，请将其复制到安全的位置。如果丢失，你将需要重新生成一个新密钥。
:::

## 选择币种

选择 Stripe 作为服务商后，API 密钥旁边会出现 **Currency** 下拉菜单。请选择与你 Stripe 账户结算币种一致的币种，以确保捐款被正确扣款。

支持的币种包括 USD、EUR、GBP、CAD、AUD、INR、JPY、SGD、HKD、SEK、NOK、DKK、CHF、MXN 和 BRL。你可以在 [Stripe 控制台](https://dashboard.stripe.com/settings/currencies)中确认或更改账户的默认币种。

:::info
此处选择的币种将用于一次性捐款、定期订阅、手续费计算以及奉献报表。如果你之后更换币种，只有新的捐款和订阅会使用新币种——现有的定期奉献将继续使用创建时的币种。
:::

:::warning
请确保你的 Stripe 账户已配置为可接受你所选的币种。如果你的 Stripe 账户不支持所选币种，捐款在结账时将失败。
:::

## Apple Pay 和 Google Pay

使用 Stripe 的教会，其公开奉献页面会自动显示 Apple Pay 和 Google Pay 按钮。一次性奉献的按钮会在捐献者选择基金和金额后，显示在银行卡输入框的上方，并且仅当捐献者的浏览器或设备已设置钱包时才会出现。定期奉献仍使用银行卡或银行账户输入框。

Google Pay 无需任何设置。Apple Pay 则要求你的奉献页面域名已在 Stripe 注册；B1 会在奉献页面首次于你的域名下加载时自动完成注册。如果 iPhone 上没有显示 Apple Pay 按钮，请在 Stripe 控制台中检查 **Settings > Payment method domains**，并确认你的 `yoursubdomain.b1.church`（或自定义）域名已列出且已验证。

## 匿名奉献

公开奉献页面上的捐献者可以勾选 **Give anonymously**（匿名奉献）。匿名奉献记录时不会关联任何捐献者，仍会计入捐献者所选的基金，并在你的批次和报表中显示为 **Anonymous**。仍需填写捐献者的电子邮件以便发送收据，但不会创建人员记录。匿名奉献仅限一次性捐款，且不会出现在任何奉献报表中。

## 定期奉献失败

当 Stripe 上的定期奉献失败（例如银行卡过期或被拒）时，失败的扣款会出现在 **Donations > Failed Gifts** 下，并显示捐献者、金额、日期以及网关给出的原因。待捐献者更新付款方式后，点击 **Retry** 即可重新尝试扣款。

B1 还会在扣款失败时向捐献者发送电子邮件；如果三天和七天后仍未成功，会再次发送，邮件中附有在 B1.church 中更新付款方式的链接。

:::info
如果你的教会在此功能推出之前已设置了 Stripe，请打开 **Settings** > **Giving**，点击编辑，然后点击一次 **Save**。这样可以刷新 Stripe 的 webhook，使失败的扣款能够上报给 B1。
:::

## 在你的 B1.church 网站中添加奉献页面

1. 前往 [b1.church](https://b1.church/) 并登录。
2. 点击 **Settings** 图标。
3. 点击 **Add Tab**。
4. 将类型选择为 **Donation**。
5. 为该标签页输入名称（例如"奉献"），然后点击 **Save**。
6. 可选：更改标签图标——在图标搜索中输入"Giv"，即可找到与奉献相关的图标。

你的奉献页面现已上线。成员可以访问 `yoursubdomain.b1.church/donate`。

## 分享你的奉献链接

要查找你的奉献网址，请前往 **B1 Admin**，点击 **Settings** 图标即可看到你的子域名。你的奉献链接格式如下：

`https://yoursubdomain.b1.church/donate`

将此链接分享到你的网站、电子邮件或主日周报中，让成员知道可以在哪里在线奉献。

### 带有预设基金和金额的链接

要将捐献者直接引导至特定基金，请进入 **Donations > Funds**，点击该基金上的 **Giving Link**。可选择输入金额，然后复制链接。对话框还会显示同一链接的二维码；点击 **Download PNG** 即可将其保存，用于周报、幻灯片或海报。当捐献者打开链接或扫描二维码时，奉献页面上的基金和金额都已预先选好。链接格式如下：

`https://yoursubdomain.b1.church/donate?fundId=FUND_ID&amount=25`

同样的参数也适用于网站编辑器中的 **Donate Link** 元素。

## 奉献通知

每当收到一笔捐款时，Stripe 都会发送一封电子邮件通知。要更改通知邮箱地址，请进入 Stripe 控制台，点击右上角的个人头像，选择 **Profile**，然后更新你的电子邮件地址。

## 手续费选项

你可以配置奉献页面，让捐献者自愿承担手续费，使教会获得全额奉献。此设置在 B1 Admin 的教会设置中管理。

:::tip
完成设置后，请先进行一笔小额测试捐款，确认一切正常，然后再向会众宣布在线奉献。
:::

## 设置 Kingdom Funding

Kingdom Funding 是一家基督教支付处理商，支持信用卡/借记卡以及 ACH 银行转账。如果你的教会已加入 Kingdom Funding，可以将其连接为你的奉献网关。

:::info
Kingdom Funding 集成目前处于测试阶段。请联系你的 B1 客户代表，为你的教会启用该功能。
:::

1. 在 [kingdomfundinginternational.com](https://kingdomfundinginternational.com/churches/apply) 注册或登录。
2. 从 Kingdom Funding 商户门户获取你的 **Security Key**（公开密钥）和 **Private Key**（私钥）。
3. 在 B1 Admin 中，进入 **Settings**，打开 **Giving** 部分并点击编辑。
4. 将 **Provider** 设置为 **Kingdom Funding**。
5. 将你的 Security Key 粘贴到 **Security Key** 字段中，将你的 Private Key 粘贴到 **Private Key** 字段中。
6. 设置你从 Kingdom Funding 获得的 **Webhook Key**，并将显示的 webhook 网址复制到你的 Kingdom Funding 商户设置中，以便 Kingdom Funding 能够通知 B1 已完成的交易。
7. 保存。

连接完成后，成员在奉献页面上会看到银行卡/银行账户的切换选项，可以选择通过信用卡或 ACH 转账进行奉献。

## PayPal 和 Venmo 按钮

以 **PayPal** 作为服务商的教会，其奉献页面上的银行卡输入框上方会为一次性奉献显示 **PayPal** 和 **Venmo** 按钮。捐献者点击其中一个后，会在 PayPal 窗口中完成付款，该笔奉献会像其他在线捐款一样被记录。Venmo 仅对在美国、且设备符合 PayPal 条件的捐献者显示。定期奉献仍使用银行卡输入框。

## 设置 Paystack（非洲）

Stripe 不为加纳、尼日利亚、肯尼亚、南非或科特迪瓦的教会开设账户。[Paystack](https://paystack.com) 则可以，并支持本地银行卡、**移动货币**（MTN MoMo、Vodafone Cash、AirtelTigo、M-PESA）、银行转账和 USSD——捐献者可使用你的本地货币（GHS、NGN、KES、ZAR、XOF）付款。

1. 使用你教会的营业登记证书和当地银行账户在 [paystack.com](https://paystack.com) 注册，并完成 Paystack 的激活（上线）审核。
2. 在 Paystack 控制台中打开 **Settings → API Keys & Webhooks**，复制 **Public Key** 和 **Secret Key**（请使用正式环境密钥，而非测试密钥）。
3. 在 B1 Admin 中，进入 **Settings**，打开 **Giving** 部分并点击编辑。
4. 将 **Provider** 设置为 **Paystack**，粘贴 Public Key 和 Secret Key，并选择你的 **Currency**。
5. 复制服务商下方显示的 **webhook URL**，返回 Paystack 控制台（**Settings → API Keys & Webhooks**），将其粘贴到 **Webhook URL** 字段中。这样定期奉献和移动货币付款才能被记录。
6. 保存。

捐献者会在安全的 Paystack 窗口中完成付款，并可在其中选择银行卡、移动货币或银行转账。注意事项：

- **定期奉献** 需要使用银行卡；移动货币无法自动重复扣款，因此 Paystack 仅允许一次性的移动货币奉献。
- Paystack 的定期奉献可以在 B1 中取消，但无法暂停或编辑——如需更改金额，请取消后重新创建。
- **手续费** 默认值反映了 Paystack 针对你所用货币的本地银行卡费率；如果你协商的费率不同，请进行修改。

## 下一步

- 如果在线交易没有自动同步，请使用 [Stripe 导入](stripe-import.md)将其拉入 B1 Admin
- 查看你的[奉献报表](donation-reports.md)，确认在线奉献显示正确
- 生成同时包含在线和线下奉献的[奉献报表（捐款证明）](giving-statements.md)
