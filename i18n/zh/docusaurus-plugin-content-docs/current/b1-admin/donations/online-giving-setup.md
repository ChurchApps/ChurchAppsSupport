---
title: "在线奉献设置"
description: "将 Stripe、Kingdom Funding 或 Paystack 连接到 B1 Admin，使成员可以通过你的 B1.church 网站在线奉献，奉献记录自动同步到你的系统中。"
---

# 在线奉献设置

<div class="article-intro">

B1 Admin 与 **Stripe**、**Kingdom Funding** 和 **Paystack**（适用于非洲的教会）集成，使成员可以通过你的 B1.church 网站进行在线奉献。配置完成后，在线奉献会自动出现在你的奉献记录中，与手动登记的奉献并列，让所有数据都保存在同一个系统中。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 设置你的[奉献基金](funds.md)，以便捐赠人指定其奉献用途
- 在 [stripe.com](https://stripe.com) 创建 Stripe 账户并将其激活（退出测试模式）
- 准备好你的 B1 Admin 登录凭据

</div>

## 设置 Stripe {#setting-up-stripe}

1. 如果你还没有 Stripe 账户，请在 [stripe.com](https://stripe.com) 创建一个。请务必**激活你的账户**，并退出测试模式。
2. 在 Stripe 中，进入 **Developers > API Keys**（开发者 > API 密钥）。
3. 复制你的 **Publishable Key**（可公开密钥）。
4. 登录 [B1 Admin](https://admin.b1.church/)。
5. 进入 **Settings**（设置），并打开 **Giving**（奉献）板块。
6. 点击 **Giving** 板块上的 **Edit**（编辑）。
7. 将 **Provider**（提供商）设置为 **Stripe**。
8. 将你的可公开密钥粘贴到 **Public Key**（公开密钥）字段中。
9. 返回 Stripe，显示你的 **Secret Key**（私密密钥）（该密钥只能查看一次，请务必保存备份）。
10. 将私密密钥粘贴到 **Secret Key**（私密密钥）字段中，然后点击 **Save**。

:::warning
Stripe 私密密钥只会显示一次。在离开 Stripe 后台之前，请将其复制到安全的地方。如果丢失，则需要重新生成新的密钥。
:::

## 选择货币 {#choosing-your-currency}

选择 Stripe 作为提供商后，API 密钥旁边会出现 **Currency**（货币）下拉菜单。请选择与你的 Stripe 账户结算货币相符的货币，以确保奉献能被正确扣款。

如果你尚未保存过货币，下拉菜单会默认为你教会注册时所在国家的货币，而非美元。保存前请确认它与你的 Stripe 账户一致。

如果你的教会不接受在线奉献，请将 **Provider** 保持为 **None**（无），但仍需选择 **Currency**——此时列表会包含所有货币，并附有说明"教会记录奉献所用的货币。"你在批次中手动录入的奉献将以该货币记录，奉献合计也会以该货币显示。

支持的货币包括 USD、EUR、GBP、CAD、AUD、INR、JPY、SGD、HKD、SEK、NOK、DKK、CHF、MXN、BRL 和 PHP。你可以在 [Stripe 后台](https://dashboard.stripe.com/settings/currencies)中确认或更改账户的默认货币。

:::info
此处选择的货币将用于一次性奉献、定期订阅、手续费计算和奉献报表。如果你之后更改货币，只有新的奉献和订阅会使用新货币——已存在的定期奉献仍按创建时的货币继续收取。
:::

:::warning
请确保你的 Stripe 账户已配置为接受所选货币。如果 Stripe 账户不支持所选货币，奉献将在结账时失败。
:::

## Apple Pay 和 Google Pay {#apple-pay-and-google-pay}

使用 Stripe 的教会会自动在公开奉献页面上获得 Apple Pay 和 Google Pay 按钮。当捐赠人选择了基金和金额后，这些按钮会出现在一次性奉献的银行卡字段上方，且仅当捐赠人的浏览器或设备已设置钱包时才会显示。定期奉献仍使用银行卡或银行账户字段。

Google Pay 无需设置。Apple Pay 要求你的奉献页面域名已在 Stripe 注册；B1 会在奉献页面首次在你的域名上加载时进行注册。如果 iPhone 上没有显示 Apple Pay 按钮，请检查 Stripe 后台中的 **Settings > Payment method domains**（设置 > 付款方式域名），并确认你的 `yoursubdomain.b1.church`（或自定义）域名已列出并通过验证。

## 匿名奉献 {#anonymous-gifts}

公开奉献页面上的捐赠人可以勾选 **Give anonymously**（匿名奉献）。匿名奉献会在没有关联捐赠人的情况下记录，仍会发送到捐赠人所选的基金，并在你的批次和报表中显示为 **Anonymous**（匿名）。系统仍要求提供捐赠人的电子邮件，以便发送收据，但不会创建人员记录。匿名奉献仅限一次性奉献，且不会出现在任何奉献收据上。

## 失败的定期奉献 {#failed-recurring-gifts}

当 Stripe 上的定期奉献失败时（例如银行卡已过期或被拒绝），失败的扣款会出现在 **Donations > Failed Gifts**（奉献 > 失败的奉献）下，并显示捐赠人、金额、日期以及网关给出的原因。在捐赠人更新付款方式后，点击 **Retry**（重试）即可再次尝试扣款。

扣款失败时，B1 也会向捐赠人发送电子邮件；如果仍未成功，则会在三天和七天后再次发送，邮件中附有在 B1.church 中更新付款方式的链接。

:::info
如果你的教会是在此功能推出之前设置的 Stripe，请打开 **Settings**（设置）> **Giving**（奉献），点击编辑，然后点击一次 **Save**。这会刷新 Stripe 的 webhook，使失败的扣款能够报告给 B1。
:::

## 在你的 B1.church 网站上添加奉献页面 {#adding-a-donation-page-to-your-b1church-site}

1. 前往 [b1.church](https://b1.church/) 并登录。
2. 点击 **Settings**（设置）图标。
3. 点击 **Add Tab**（添加标签页）。
4. 选择 **Donation**（奉献）作为类型。
5. 为标签页输入名称（例如"奉献"），然后点击 **Save**。
6. 可选：更改标签页图标——在图标搜索中输入"Giv"，即可找到与奉献相关的图标。

你的奉献页面现已上线。成员可以通过 `yoursubdomain.b1.church/donate` 访问。

## 分享你的奉献链接 {#sharing-your-giving-link}

要找到你的奉献网址，请前往 **B1 Admin** 并点击 **Settings** 图标，查看你的子域名。你的奉献链接格式如下：

`https://yoursubdomain.b1.church/donate`

将此链接分享到你的网站、电子邮件或主日周报中，让成员知道在哪里可以在线奉献。

### 带有预设基金和金额的链接 {#links-with-a-preset-fund-and-amount}

若要将捐赠人直接引导到特定基金，请前往 **Donations > Funds**（奉献 > 基金），然后点击该基金上的 **Giving Link**（奉献链接）。可选择输入金额，然后复制链接。对话框还会显示同一链接的二维码；点击 **Download PNG**（下载 PNG）即可保存，用于主日周报、幻灯片或海报。捐赠人打开链接或扫描二维码时，奉献页面上已预先选择好基金和金额。链接格式如下：

`https://yoursubdomain.b1.church/donate?fundId=FUND_ID&amount=25`

同样的参数也适用于网站编辑器中的 **Donate Link**（奉献链接）组件。

## 奉献通知 {#donation-notifications}

每次收到奉献时，Stripe 都会发送一封电子邮件通知。若要更改通知邮箱地址，请前往 Stripe 后台，点击右上角的个人资料，选择 **Profile**（个人资料），然后更新你的电子邮件地址。

## 手续费选项 {#processing-fee-options}

你可以让捐赠人选择性地承担手续费，使教会收到完整的奉献金额。在 **Settings > Giving**（设置 > 奉献）中，点击编辑，然后开启密钥旁边的 **Transaction Fee**（交易手续费）开关。计算手续费所用的费率位于 **Fees & statements**（手续费与收据）下：银行卡的 **Flat Rate**（固定费率）和 **Transaction Fee**（交易手续费），以及 Stripe 银行账户（ACH）奉献的百分比费率和 **Hard limit**（上限）。费率默认为你的提供商标准费率；如果你协商的费率不同，请进行修改，然后点击 **Save**。

:::tip
完成设置后，请先进行一笔小额测试奉献，确认一切运作正常，然后再向会众宣布在线奉献。
:::

## 设置 Kingdom Funding {#setting-up-kingdom-funding}

Kingdom Funding 是一家基督教支付处理商，支持信用卡/借记卡和 ACH 银行转账。如果你的教会已加入 Kingdom Funding，即可将其连接为你的奉献网关。

:::info
Kingdom Funding 集成目前处于测试阶段。请联系你的 B1 客户代表，为你的教会开通此功能。
:::

1. 在 [kingdomfundinginternational.com](https://kingdomfundinginternational.com/churches/apply) 注册或登录。
2. 从 Kingdom Funding 后台获取你的 **Tokenization Key**（令牌化密钥）和 **Source Key**（来源密钥）。
3. 在 B1 Admin 中，进入 **Settings**（设置），打开 **Giving**（奉献）板块并点击编辑。
4. 将 **Provider**（提供商）设置为 **Kingdom Funding**。
5. 将密钥粘贴到 **Tokenization Key** 和 **Source Key** 字段中。
6. 输入 **Webhook Key**（Webhook 密钥）（即 Kingdom Funding 控制面板中的 webhook 签名密钥），并将提供商下方显示的 webhook 网址复制到你的 Kingdom Funding 设置中，以便 Kingdom Funding 能够通知 B1 已完成的交易。
7. 点击 **Save**。

连接完成后，成员将在奉献页面上看到银行卡/银行账户切换按钮，并可以通过信用卡或 ACH 转账进行奉献。

## PayPal 和 Venmo 按钮 {#paypal-and-venmo-buttons}

新设置的教会已不再能在 **Provider** 列表中选择 PayPal。已连接 **PayPal** 的教会，会在奉献页面的银行卡字段上方显示 **PayPal** 和 **Venmo** 按钮，用于一次性奉献。捐赠人点击后，会在 PayPal 窗口中完成付款，奉献将与其他在线奉献一样被记录。Venmo 仅对位于美国、且使用 PayPal 认为符合条件的设备的捐赠人显示。定期奉献仍使用银行卡字段。

## 设置 Paystack（非洲） {#setting-up-paystack-africa}

Stripe 不为加纳、尼日利亚、肯尼亚、南非或科特迪瓦的教会开设账户。[Paystack](https://paystack.com) 则可以，它支持本地银行卡、**移动货币**（MTN MoMo、Vodafone Cash、AirtelTigo、M-PESA）、银行转账和 USSD——捐赠人以当地货币付款（GHS、NGN、KES、ZAR、XOF）。

1. 使用教会的商业注册证书和当地银行账户在 [paystack.com](https://paystack.com) 注册，并完成 Paystack 的激活（正式上线）审核。
2. 在 Paystack 后台中打开 **Settings → API Keys & Webhooks**（设置 → API 密钥与 Webhook），复制 **Public Key**（公开密钥）和 **Secret Key**（私密密钥）（请使用正式环境密钥，而非测试密钥）。
3. 在 B1 Admin 中，进入 **Settings**（设置），打开 **Giving**（奉献）板块并点击编辑。
4. 将 **Provider**（提供商）设置为 **Paystack**，粘贴公开密钥和私密密钥，并选择你的 **Currency**（货币）。
5. 复制提供商下方显示的 **webhook URL**，返回 Paystack 后台（**Settings → API Keys & Webhooks**），将其粘贴到 **Webhook URL** 字段中。这是定期奉献和移动货币付款得以记录的方式。
6. 保存。

捐赠人在安全的 Paystack 窗口中完成付款，并可以在其中选择银行卡、移动货币或银行转账。注意事项：

- **定期奉献**需要使用银行卡；移动货币无法自动重复扣款，因此 Paystack 仅允许一次性的移动货币奉献。
- Paystack 的定期奉献可以在 B1 中取消，但无法暂停或编辑——如需更改金额，请取消后重新创建。
- **手续费**默认值反映了 Paystack 针对你所用货币的本地银行卡费率；如果你协商的费率不同，请进行修改。

## 后续步骤 {#next-steps}

- 如果在线交易没有自动同步，请使用 [Stripe 导入](stripe-import.md)将其导入 B1 Admin
- 查看你的[奉献报表](donation-reports.md)，确认在线奉献显示正确
- 生成同时包含在线和线下奉献的[奉献收据](giving-statements.md)
