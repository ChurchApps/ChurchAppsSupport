---
title: "线上奉献设置"
---

# 线上奉献设置

<div class="article-intro">

B1 Admin 与 **Stripe**、**PayPal**、**Kingdom Funding** 以及 **Paystack**（面向非洲教会）集成，使你的成员可以通过你的 B1.church 网站进行线上奉献。配置完成后，线上捐款会自动出现在你的捐款记录中，与手动录入的礼金并列，使所有内容都保存在同一系统中。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 设置好你的[奉献基金](funds.md)，以便捐款人指定其礼金的用途
- 在 [stripe.com](https://stripe.com) 创建一个 Stripe 账户并将其激活（退出测试模式）
- 准备好你的 B1 Admin 登录凭据

</div>

## 设置 Stripe

1. 如果你还没有账户，请在 [stripe.com](https://stripe.com) 创建一个。务必**激活你的账户**，并退出测试模式。
2. 在 Stripe 中，进入 **Developers > API Keys**。
3. 复制你的 **Publishable Key**（可公开密钥）。
4. 登录 [B1 Admin](https://admin.b1.church/)。
5. 进入 **Settings**，打开 **Giving** 板块。
6. 点击 **Giving** 板块上的 **Edit**。
7. 将 **Provider**（服务商）设置为 **Stripe**。
8. 将你的 Publishable Key 粘贴到 **Public Key** 字段中。
9. 返回 Stripe，显示你的 **Secret Key**（私密密钥）（该密钥只能查看一次，因此请务必备份保存）。
10. 将 Secret Key 粘贴到 **Secret Key** 字段中，然后点击 **Save**。

:::warning
你的 Stripe Secret Key 只会显示一次。在离开 Stripe 控制台之前，请将其复制到安全的位置。如果你丢失了它，则需要生成一个新密钥。
:::

## 选择货币

选择 Stripe 作为服务商后，API 密钥旁边会出现一个**货币（Currency）**下拉菜单。请选择与你 Stripe 账户的结算货币相匹配的货币，以确保捐款被正确扣款。

支持的货币包括 USD、EUR、GBP、CAD、AUD、INR、JPY、SGD、HKD、SEK、NOK、DKK、CHF、MXN 和 BRL。你可以在你的 [Stripe 控制台](https://dashboard.stripe.com/settings/currencies)中确认或更改账户的默认货币。

:::info
你在此处选择的货币将用于一次性捐款、定期订阅、手续费计算以及捐款报告。如果你之后更改货币，则只有新的捐款和订阅会使用新货币——已有的定期奉献将继续使用创建时的货币。
:::

:::warning
请确保你的 Stripe 账户已配置为可接受你所选的货币。如果你的 Stripe 账户不支持所选货币，捐款将在结账时失败。
:::

## Apple Pay 和 Google Pay

使用 Stripe 的教会会自动在公开奉献页面上获得 Apple Pay 和 Google Pay 按钮。当捐款人选择了基金和金额后，这些按钮会出现在一次性奉献的银行卡字段上方，并且只有在捐款人的浏览器或设备已设置电子钱包时才会显示。定期奉献仍然使用银行卡或银行账户字段。

Google Pay 无需任何设置。Apple Pay 要求将你奉献页面的域名注册到 Stripe；B1 会在奉献页面首次在你的域名上加载时自动完成注册。如果 iPhone 上没有出现 Apple Pay 按钮，请在你的 Stripe 控制台中检查 **Settings > Payment method domains**，并确认你的 `yoursubdomain.b1.church`（或自定义）域名已列出并通过验证。

## 匿名奉献

公开奉献页面上的捐款人可以勾选**Give anonymously**（匿名奉献）。匿名奉献会记录为没有关联捐款人，但仍会计入捐款人所选择的基金，并在你的批次和报告中显示为**Anonymous**（匿名）。捐款人的电子邮件仍为必填项，以便发送收据，但不会创建人员记录。匿名奉献仅限一次性捐款，并且不会出现在任何奉献报表上。

## 定期奉献失败

当 Stripe 上的定期奉献失败（例如银行卡过期或被拒绝）时，失败的扣款会显示在 **Donations > Failed Gifts**（失败的奉献）下，并附带捐款人、金额、日期以及网关给出的原因。在捐款人更新其付款方式后，点击 **Retry**（重试）即可再次尝试扣款。

如果扣款失败，B1 也会向捐款人发送电子邮件；若仍未成功，还会在三天和七天后再次发送，并附上可在 B1.church 中更新付款方式的链接。

:::info
如果你的教会在此功能推出之前已设置 Stripe，请打开 **Settings** > **Giving**，点击编辑，然后点击一次 **Save**。这会刷新 Stripe 的 Webhook，使失败的扣款能够上报给 B1。
:::

## 为你的 B1.church 网站添加奉献页面

1. 前往 [b1.church](https://b1.church/) 并登录。
2. 点击**设置**图标。
3. 点击 **Add Tab**（添加标签页）。
4. 将类型选择为 **Donation**（奉献）。
5. 为该标签页输入名称（例如“奉献”），然后点击 **Save**。
6. 可选：更改标签页图标——在图标搜索中输入“Giv”，即可找到与奉献相关的图标。

你的奉献页面现已上线。成员可以访问 `yoursubdomain.b1.church/donate`。

## 分享你的奉献链接

要找到你的奉献网址，请前往 **B1 Admin** 并点击**设置**图标，即可看到你的子域名。你的奉献链接格式如下：

`https://yoursubdomain.b1.church/donate`

将此链接分享到你的网站、电子邮件或周报中，使成员知道在哪里进行线上奉献。

### 带有预设基金和金额的链接

要将捐款人直接引导到特定基金，请前往 **Donations > Funds**，并点击该基金上的 **Giving Link**（奉献链接）。可选择输入金额，然后复制链接。捐款人打开链接后，奉献页面上的基金和金额会已经被选定。链接格式如下：

`https://yoursubdomain.b1.church/donate?fundId=FUND_ID&amount=25`

同样的参数也适用于网站构建器中的 **Donate Link**（奉献链接）元素。

## 捐款通知

每次收到捐款时，Stripe 都会发送一封电子邮件通知。要更改通知的电子邮件地址，请前往 Stripe 控制台，点击右上角的个人头像，选择 **Profile**（个人资料），然后更新你的电子邮件地址。

## 手续费选项

你可以配置奉献页面，让捐款人自愿承担手续费，使教会收到全额捐款。此设置在 B1 Admin 的教会设置中进行管理。

:::tip
完成设置后，请先进行一笔小额测试捐款，确认一切运作正常，再向会众宣布线上奉献。
:::

## 设置 Kingdom Funding

Kingdom Funding 是一家基督教支付处理商，支持信用卡/借记卡和 ACH 银行转账。如果你的教会已加入 Kingdom Funding，即可将其连接为你的奉献网关。

:::info
Kingdom Funding 集成目前处于测试阶段。请联系你的 B1 客户代表，为你的教会启用此功能。
:::

1. 在 [kingdomfundinginternational.com](https://kingdomfundinginternational.com/churches/apply) 注册或登录。
2. 从 Kingdom Funding 商户门户获取你的**Security Key**（安全密钥，公开）和 **Private Key**（私密密钥）。
3. 在 B1 Admin 中，进入 **Settings**，打开 **Giving** 板块并点击编辑。
4. 将 **Provider** 设置为 **Kingdom Funding**。
5. 将你的 Security Key 粘贴到 **Security Key** 字段中，将你的 Private Key 粘贴到 **Private Key** 字段中。
6. 设置你从 Kingdom Funding 收到的 **Webhook Key**，并将显示的 Webhook 网址复制到你的 Kingdom Funding 商户设置中，以便 Kingdom Funding 能够通知 B1 已完成的交易。
7. 保存。

连接完成后，成员将在奉献页面上看到银行卡/银行账户切换开关，并可以通过信用卡或 ACH 转账进行奉献。

## PayPal 和 Venmo 按钮

以 **PayPal** 作为服务商的教会，会在奉献页面的银行卡字段上方为一次性奉献显示 **PayPal** 和 **Venmo** 按钮。点击其中一个的捐款人会在 PayPal 窗口中完成付款，该笔奉献将像其他线上捐款一样被记录。Venmo 仅对美国境内、且 PayPal 认为符合条件的设备上的捐款人显示。定期奉献仍然使用银行卡字段。

## 设置 Paystack（非洲）

Stripe 不为加纳、尼日利亚、肯尼亚、南非和科特迪瓦的教会开设账户。[Paystack](https://paystack.com) 则可以，它接受当地银行卡、**移动货币（mobile money）**（MTN MoMo、Vodafone Cash、AirtelTigo、M-PESA）、银行转账和 USSD——捐款人以你当地的货币支付（GHS、NGN、KES、ZAR、XOF）。

1. 使用你教会的营业登记证书和当地银行账户在 [paystack.com](https://paystack.com) 注册，并完成 Paystack 的激活（正式上线）审核。
2. 在 Paystack 控制台中，打开 **Settings → API Keys & Webhooks**，复制 **Public Key** 和 **Secret Key**（请使用正式环境密钥，而非测试密钥）。
3. 在 B1 Admin 中，进入 **Settings**，打开 **Giving** 板块并点击编辑。
4. 将 **Provider** 设置为 **Paystack**，粘贴 Public Key 和 Secret Key，并选择你的**货币（Currency）**。
5. 复制服务商下方显示的 **webhook URL**，返回 Paystack 控制台（**Settings → API Keys & Webhooks**），并将其粘贴到 **Webhook URL** 字段中。这样定期奉献和移动货币付款才能被记录下来。
6. 保存。

捐款人会在安全的 Paystack 窗口中完成付款，并可在其中选择银行卡、移动货币或银行转账。注意事项：

- **定期奉献**需要使用银行卡；移动货币无法自动重复扣款，因此 Paystack 仅允许一次性的移动货币奉献。
- Paystack 的定期奉献可以在 B1 中取消，但无法暂停或编辑——如需更改金额，请取消后重新创建。
- **手续费（Processing Fee）**的默认值反映的是 Paystack 针对你所用货币的本地银行卡费率；如果你协商的费率不同，请进行编辑。

## 下一步

- 如果线上捐款没有自动同步，请使用 [Stripe 导入](stripe-import.md)将其拉取到 B1 Admin 中
- 查看你的[捐款报告](donation-reports.md)，确认线上捐款是否正确显示
- 生成同时包含线上和线下捐款的[奉献报表](giving-statements.md)
