---
title: "在线奉献设置"
description: "将 Stripe、PayPal、Kingdom Funding 或 Paystack 连接到 B1 Admin，使会员可以通过您的 B1.church 网站在线奉献，奉献记录同步到您的账目中。"
---

# 在线奉献设置

<div class="article-intro">

B1 Admin 与 **Stripe**、**PayPal**、**Kingdom Funding** 和 **Paystack**（适用于非洲的教会）集成，使您的会员可以通过 B1.church 网站在线奉献。配置完成后，在线奉献会自动出现在您的奉献记录中，与手动录入的奉献并列，让一切都保存在同一个系统中。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 先设置您的[奉献基金](funds.md)，以便捐赠人指定其奉献用途
- 在 [stripe.com](https://stripe.com) 创建 Stripe 账户并将其激活（退出测试模式）
- 准备好您的 B1 Admin 登录凭据

</div>

## 设置 Stripe

1. 如果您还没有 Stripe 账户，请在 [stripe.com](https://stripe.com) 创建一个。请务必**激活您的账户**，并退出测试模式。
2. 在 Stripe 中，前往 **Developers > API Keys**。
3. 复制您的 **Publishable Key**（可公开密钥）。
4. 登录 [B1 Admin](https://admin.b1.church/)。
5. 前往 **Settings** 并打开 **Giving** 部分。
6. 点击 **Giving** 部分上的 **Edit**。
7. 将 **Provider**（提供商）设置为 **Stripe**。
8. 将 Publishable Key 粘贴到 **Public Key** 字段。
9. 返回 Stripe，显示您的 **Secret Key**（私密密钥）（该密钥只能查看一次，请务必备份保存）。
10. 将 Secret Key 粘贴到 **Secret Key** 字段，然后点击 **Save**。

:::warning
您的 Stripe Secret Key 只会显示一次。在离开 Stripe 后台之前，请将其复制到安全的位置。如果您丢失了它，则需要重新生成新的密钥。
:::

## 选择币种 {#choosing-your-currency}

在选择 Stripe 作为提供商后，API 密钥旁会出现 **Currency**（币种）下拉菜单。请选择与您的 Stripe 账户结算币种一致的币种，以确保奉献被正确扣款。

如果您尚未保存币种，下拉菜单会默认为您注册教会时所在国家的币种，而不是美元。请在保存前确认它与您的 Stripe 账户一致。

如果您的教会不接受在线奉献，请将 **Provider** 保持为 **None**，并仍然选择 **Currency**——此时列表会包含所有币种，并附有说明“教会记录奉献所用的币种”。通过批次手动录入的奉献会以该币种记录，奉献合计也会以该币种显示。

支持的币种包括 USD、EUR、GBP、CAD、AUD、INR、JPY、SGD、HKD、SEK、NOK、DKK、CHF、MXN、BRL 和 PHP。您可以在 [Stripe 后台](https://dashboard.stripe.com/settings/currencies)确认或更改您账户的默认币种。

:::info
您在此选择的币种将用于一次性奉献、定期订阅、手续费计算和奉献报告。如果您之后更改币种，只有新的奉献和订阅会使用新币种——已有的定期奉献将继续使用创建时的币种。
:::

:::warning
请确保您的 Stripe 账户已配置为接受您所选的币种。如果您的 Stripe 账户不支持所选币种，奉献在结账时将会失败。
:::

## Apple Pay 和 Google Pay

使用 Stripe 的教会会在公共奉献页面上自动获得 Apple Pay 和 Google Pay 按钮。捐赠人选择基金和金额后，这些按钮会出现在一次性奉献的银行卡字段上方，并且仅在捐赠人的浏览器或设备已设置钱包时显示。定期奉献仍使用银行卡或银行字段。

使用 Google Pay 无需任何设置。使用 Apple Pay 则需要将您的奉献页面域名在 Stripe 中注册；B1 会在奉献页面首次在您的域名上加载时完成注册。如果 iPhone 上没有显示 Apple Pay 按钮，请在您的 Stripe 后台检查 **Settings > Payment method domains**（支付方式域名），并确认您的 `yoursubdomain.b1.church`（或自定义）域名已列出且已验证。

## 匿名奉献

在公共奉献页面上，捐赠人可以勾选 **Give anonymously**（匿名奉献）。匿名奉献会记录为不关联任何捐赠人，仍然计入捐赠人所选的基金，并在您的批次和报告中显示为 **Anonymous**（匿名）。系统仍需要捐赠人的电子邮件地址以便发送收据，但不会创建人员记录。匿名奉献仅限一次性奉献，且不会出现在任何奉献证明上。

## 失败的定期奉献

当 Stripe 上的定期奉献失败（例如银行卡过期或被拒绝）时，失败的扣款会显示在 **Donations > Failed Gifts**（失败的奉献）下，并附带捐赠人、金额、日期以及网关给出的失败原因。待捐赠人更新付款方式后，点击 **Retry**（重试）即可再次尝试扣款。

如果扣款失败，B1 会向捐赠人发送邮件；若仍未成功，则会在三天和七天后再次发送邮件，并附上可在 B1.church 中更新付款方式的链接。

:::info
如果您的教会在此功能推出之前已设置 Stripe，请打开 **Settings** > **Giving**，点击编辑，然后点击一次 **Save**。这会刷新 Stripe 的 Webhook，使失败的扣款能够报告给 B1。
:::

## 为您的 B1.church 网站添加奉献页面

1. 前往 [b1.church](https://b1.church/) 并登录。
2. 点击 **Settings** 图标。
3. 点击 **Add Tab**（添加标签页）。
4. 选择 **Donation**（奉献）作为类型。
5. 为标签页输入名称（例如“Give”），然后点击 **Save**。
6. 可选地更改标签页图标——在图标搜索中输入“Giv”，即可找到与奉献相关的图标。

您的奉献页面现已上线。会员可以访问 `yoursubdomain.b1.church/donate`。

## 分享您的奉献链接

要找到您的奉献网址，请前往 **B1 Admin** 并点击 **Settings** 图标，即可看到您的子域名。您的奉献链接格式如下：

`https://yoursubdomain.b1.church/donate`

可将此链接分享到您的网站、电子邮件或主日周报中，让会员知道在哪里可以在线奉献。

### 带有预设基金和金额的链接

要将捐赠人直接带到特定基金，请前往 **Donations > Funds**（奉献 > 基金），点击该基金上的 **Giving Link**（奉献链接）。可选择输入金额，然后复制链接。对话框还会显示同一链接的二维码；点击 **Download PNG** 即可保存，用于主日周报、幻灯片或海报。当捐赠人打开链接或扫描二维码时，奉献页面上已预先选好基金和金额。链接格式如下：

`https://yoursubdomain.b1.church/donate?fundId=FUND_ID&amount=25`

相同的参数也适用于网站编辑器中的 **Donate Link**（奉献链接）元素。

## 奉献通知

每次收到奉献时，Stripe 都会发送一封电子邮件通知。如需更改通知邮箱地址，请前往 Stripe 后台，点击右上角的个人头像，选择 **Profile**（个人资料），然后更新您的电子邮件地址。

## 手续费选项

您可以配置奉献页面，让捐赠人自愿承担手续费，使教会收到全部奉献金额。此设置在 B1 Admin 的教会设置中管理。

:::tip
设置完成后，请先进行一笔小额测试奉献，确认一切正常，然后再向会众宣布在线奉献。
:::

## 设置 Kingdom Funding

Kingdom Funding 是一家基督教支付处理商，支持信用卡/借记卡和 ACH 银行转账。如果您的教会已加入 Kingdom Funding，可以将其连接为您的奉献网关。

:::info
Kingdom Funding 集成目前处于测试阶段。请联系您的 B1 客户代表为您的教会启用该功能。
:::

1. 在 [kingdomfundinginternational.com](https://kingdomfundinginternational.com/churches/apply) 注册或登录。
2. 从 Kingdom Funding 商户后台获取您的 **Security Key**（安全密钥，公开）和 **Private Key**（私密密钥）。
3. 在 B1 Admin 中，前往 **Settings**，打开 **Giving** 部分并点击编辑。
4. 将 **Provider** 设置为 **Kingdom Funding**。
5. 将 Security Key 粘贴到 **Security Key** 字段，将 Private Key 粘贴到 **Private Key** 字段。
6. 设置您从 Kingdom Funding 收到的 **Webhook Key**，并将显示的 Webhook 网址复制到您的 Kingdom Funding 商户设置中，以便 Kingdom Funding 能够通知 B1 已完成的交易。
7. 保存。

连接完成后，会员将在奉献页面上看到银行卡/银行转账切换按钮，并可以通过信用卡或 ACH 转账进行奉献。

## PayPal 和 Venmo 按钮

将 **PayPal** 作为提供商的教会，会在奉献页面的银行卡字段上方为一次性奉献显示 **PayPal** 和 **Venmo** 按钮。点击其中一个的捐赠人会在 PayPal 窗口中完成付款，该奉献会像其他在线奉献一样被记录。Venmo 仅对美国境内、且 PayPal 认为符合条件的设备上的捐赠人显示。定期奉献仍使用银行卡字段。

## 设置 Paystack（非洲）

Stripe 不为加纳、尼日利亚、肯尼亚、南非和科特迪瓦的教会开设账户。[Paystack](https://paystack.com) 则可以，它接受当地银行卡、**移动货币**（MTN MoMo、Vodafone Cash、AirtelTigo、M-PESA）、银行转账和 USSD——捐赠人以您的当地币种付款（GHS、NGN、KES、ZAR、XOF）。

1. 使用您教会的营业登记证书和当地银行账户在 [paystack.com](https://paystack.com) 注册，并完成 Paystack 的激活（上线）审核。
2. 在 Paystack 后台打开 **Settings → API Keys & Webhooks**，复制 **Public Key** 和 **Secret Key**（请使用正式密钥，而非测试密钥）。
3. 在 B1 Admin 中，前往 **Settings**，打开 **Giving** 部分并点击编辑。
4. 将 **Provider** 设置为 **Paystack**，粘贴 Public Key 和 Secret Key，并选择您的 **Currency**。
5. 复制提供商下方显示的 **webhook URL**（Webhook 网址），返回 Paystack 后台（**Settings → API Keys & Webhooks**），将其粘贴到 **Webhook URL** 字段中。这是定期奉献和移动货币付款得以记录的方式。
6. 保存。

捐赠人会在安全的 Paystack 窗口中完成付款，并可在其中选择银行卡、移动货币或银行转账。注意事项：

- **定期奉献**需要使用银行卡；移动货币无法自动再次扣款，因此 Paystack 仅允许一次性的移动货币奉献。
- Paystack 的定期奉献可以在 B1 中取消，但无法暂停或编辑——如需更改金额，请取消后重新创建。
- **Processing Fee**（处理费）的默认值反映 Paystack 针对您所在币种的本地银行卡费率；如果您协商的费率不同，请进行修改。

## 后续步骤

- 如果在线交易没有自动同步，请使用 [Stripe 导入](stripe-import.md)将其拉入 B1 Admin
- 检查您的[奉献报告](donation-reports.md)，确认在线奉献正确显示
- 生成同时包含在线和线下奉献的[奉献证明](giving-statements.md)
