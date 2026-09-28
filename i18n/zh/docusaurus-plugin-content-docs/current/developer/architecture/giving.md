---
title: "捐赠架构"
---

# 捐赠架构

<div class="article-intro">

ChurchApps 采用网关路由模式处理捐赠:教会保有自己的 Stripe(或 PayPal、Kingdom Funding 或 Paystack)账户,B1 不作为平台支付处理者介入资金路由。卡数据在浏览器中被令牌化,永远不会到达 ChurchApps 服务器。本页面展示整个堆栈 —— `@churchapps/apphelper` 中的客户端提供商注册表、GivingApi 网关抽象、捐赠数据模型,以及网关 webhook 如何将数据对账回数据库。

</div>

## 概述

```
┌─────────────────────────────┐                   ┌───────────────────────────────────────┐
│  B1App / B1Admin (browser)  │                   │  Payment gateway                      │
│                             │                   │  (Stripe / PayPal / KF / Paystack)  │
│  @churchapps/apphelper      │                   │                                       │
│  ┌───────────────────────┐  │ card entry in the │  Stripe Elements · KF tokenizer ·     │
│  │ Payment provider      │──┼──────────────────▶│  PayPal Hosted Fields                 │
│  │ registry              │  │◀── token / nonce ─│  (card never reaches a B1 server)     │
│  │ getPaymentProvider()  │  │                   └──────────▲────────────────┬───────────┘
│  │ Stripe · PayPal · KF  │  │                              │                │
│  └──────────┬────────────┘  │                              │                │
└─────────────┼───────────────┘                              │                │
              │  POST /giving/donate/charge | /subscribe     │                │
              │  { token, amount, funds, person }            │                │
              ▼                            charge / subscribe│                │ signed webhook
┌─────────────────────────────────────────────┐ (secret key) │                │ event
│  GivingApi — /giving module                 │──────────────┘                │
│  DonateController → GatewayService          │                               │
│  → GatewayFactory → IGatewayProvider        │◀──────────────────────────────┘
│  donations · funds · subscriptions · …      │  POST /giving/donate/webhook/:provider
└─────────────────────┬───────────────────────┘
                      │  save donations + fundDonations — dedup via eventLogs / transactionId
                      ▼
                MySQL (giving schema)
```

整个堆栈遵循三项原则:

1. **网关持有卡数据。** 每个提供商的输入小部件在浏览器中进行令牌化;API 只会收到令牌、nonce 或订单 ID。
2. **一个抽象,多个提供商。** 浏览器从注册表解析 `PaymentProvider`;服务器从工厂解析 `IGatewayProvider`。两者都基于存储在网关记录上的相同规范化提供商名称。
3. **Webhook 是清算的事实来源。** 收费响应被乐观地记录,但网关的签名 webhook 才是确认(或创建)已完成捐赠的内容,两端都有幂等性保护。

## 客户端:支付提供商注册表(`@churchapps/apphelper`)

注册表位于 `Packages/apphelper/src/donations/providers/`,每个提供商的小部件和助手在其自己的子文件夹中(`providers/stripe/`、`providers/paypal/`、`providers/kingdomfunding/`、`providers/paystack/`) —— `providers/` 外的任何内容都不会基于提供商名称进行分支。`PaymentProvider`(参见 `providers/types.ts`)捆绑了主机应用对一个网关的所有需求:一个 `descriptor`(管理标签、支持的货币、费用字段、默认费率、仪表板/注册 URL)、一个 `capabilities` 标志集(已保存的卡、ACH、定期、内联新卡输入、隐式保存令牌化)、用于成员输入的 React 小部件(`MemberWrapper`/`MemberEntry`)、访客捐赠(`GuestForm`)、已保存方法编辑(`MethodEditForm`)和表单问题支付(`FormPayment`),加上 `buildChargeRequest(ctx, token)` —— 收费有效负载形状根据提供商而异的唯一地方。每个提供商的 `MemberWrapper` 从网关记录的公钥加载其自己的 SDK,因此主机应用永远不会导入网关 SDK(B1App 和 B1Admin 没有 `@stripe/*` 依赖)。`pickDefaultGateway(gateways, capability?)` 集中了教会的哪个网关应该被表面使用。

`providers/registry.ts` 持有内置项。它们**按值引用**,而不是通过模块副作用注册,因此打包器的树摇永远无法删除注册:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| 函数 | 目的 |
|----------|---------|
| `getPaymentProvider(name)` | 按规范化名称解析;回退到 Stripe 以便配置错误的提供商永远不会硬崩溃捐赠者表单 |
| `registerPaymentProvider(p)` | 在运行时注册额外的提供商(用于主机应用的自定义网关) |
| `listPaymentProviders()` | 枚举内置项 + 自定义项 —— 用于构建管理网关下拉列表 |
| `hasPaymentProvider(name)` | 成员资格检查 |

**内置客户端提供商:Stripe、PayPal、Kingdom Funding、Paystack。** B1App 和 B1Admin 仅**读**注册表(`getPaymentProvider`、`listPaymentProviders`);两者都不会调用 `registerPaymentProvider` —— 注册保留在 apphelper 内部。

每个提供商的令牌化方式不同,但都将卡保留在 B1 外:

| 提供商 | 输入小部件 | 返回给 API 的令牌 |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`;访客表单还挂载 `ExpressCheckoutElement`(Apple Pay / Google Pay,一次性礼物),其 `onConfirm` 解析为相同的 `pm_…` ID | 支付方法 ID(`pm_…`);通过 `/paymentmethods/ach-setup-intent` 的银行 —— USD 网关的金融连接 `us_bank_account`,CAD 网关的加拿大 PAD `acss_debit`(托管授权模式、授权 `default_for` 发票/订阅、一次性收费传递授权 ID) |
| Kingdom Funding | 由网关公钥键入的托管令牌化表单 | 单次使用 nonce |
| PayPal | PayPal 托管字段(卡、定期)加上带 Venmo 资金的 PayPal 智能按钮(一次性);两者共享一个 SDK 加载和通过 `/donate/client-token` + `/donate/create-order` 构建的服务器订单 | 已捕获的订单 ID |
| Paystack | Paystack 内联弹出窗口(`js.paystack.co/v2/inline.js`) —— 弹出窗口本身进行支付(卡、移动货币、银行转账、USSD) | 已支付的交易参考;已保存的方法是 Paystack `AUTH_…` 授权代码 |

Stripe 的 `finalizeResult` 在浏览器中运行 3-D Secure / SCA(`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`),然后才认为捐赠已完成;共享表单只调用 `provider.finalizeResult(result)`,对其执行的操作一无所知。

## 服务器端:网关抽象(GivingApi)

`/giving` 模块(`Api/src/modules/giving`)暴露 REST 表面;网关管道位于 `Api/src/shared/helpers`。`DonateController` 永远不会直接与网关 SDK 交谈 —— 它通过 `GatewayService` 进行,后者从 `GatewayFactory` 解析正确的 `IGatewayProvider` 并向其传递解密的 `GatewayConfig`。

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider`(`shared/helpers/gateways/IGatewayProvider.ts`)是每个网关实现的合约 —— webhook 生命周期(`createWebhookEndpoint`、`verifyWebhookSignature`、`classifyWebhookEvent`)、支付(`prepareCharge`、`processCharge`、`prepareSubscription`、`createSubscription`、`finalizeSubscription`、`cancelSubscription`)、费用(`calculateFees`)、已保存方法处理(`listNormalizedPaymentMethods`、`buildAttachOptions`、`buildLocalMethodRecord`、`deletePaymentMethod`、`verifyMethodOwnership`、`ownsPaymentMethodId`)以及可选附加功能(客户、订单、SetupIntents、事件重放、用于失败订阅发票的 `retryFailedPayment`、Apple Pay 域验证的 `registerPaymentMethodDomain`)。省略可选钩子的提供商被报告为该操作不支持,UI 隐藏控件。每个提供商类声明其自己的 `capabilities` 矩阵(支持的货币、ACH、退款、订阅要求、交易限制) —— `GatewayService.getProviderCapabilities(provider)` 只是读取它 —— 并且 `logsDonationsImmediately` 等标志驱动控制器行为,而不是控制器中的任何提供商名称条件。

**在 `GatewayFactory` 中注册的服务器提供商:**

| 提供商 | 可用性 |
|----------|-------------|
| Stripe | 始终开启 |
| PayPal | 始终开启 |
| Kingdom Funding | 始终开启 |
| Paystack | 始终开启(尼日利亚、加纳、南非、肯尼亚、科特迪瓦商户;货币 NGN/GHS/ZAR/KES/XOF/USD) |
| Square | 通过 `ENABLE_SQUARE` 环境标志选择加入 |
| ePayMints | 通过 `ENABLE_EPAYMINTS` 环境标志选择加入 |

Paystack 与其他的不同之处在于,资金在 GivingApi 参与之前就已经转移:弹出窗口向捐赠者收费,`processCharge` 是一个 `GET /transaction/verify/:reference`,其已支付金额和货币必须与正在记录的捐赠相匹配(已有文件中的参考从不被记录两次),定期安排的第一笔礼物从 `finalizeSubscription` 记录(验证 → `POST /plan` → `POST /subscription`,其中 `start_date` 是一个间隔之后)。Webhook 由秘钥本身签署(`x-paystack-signature`、原始正文的 HMAC-SHA512),Paystack 没有 webhook 管理 API,因此管理屏幕显示教会要粘贴到其仪表板中的 URL。续订 `charge.success` 事件不包含资金拆分;提供商从捐赠者的本地 `subscriptions`/`subscriptionFunds` 行中恢复它。只有卡授权是 `reusable` 的 —— 移动货币礼物是一次性的,因此 `createSubscription` 拒绝它们。演示数据为第二个教会(Accra Community Church、`CHU00000002`)播种在 Paystack 测试模式 GHS 网关上,以便 Paystack Playwright 套件与 Grace 的 Stripe 套件一起运行。

当设置 `ENABLE_CUSTOM_GATEWAY_PROVIDERS` 时,可以在运行时注册自定义提供商;`AbstractExperimentalGatewayProvider` 是这些的基类。提供商名称不区分大小写进行匹配。

### 网关配置和秘密

管理员通过 `POST /giving/gateways`(`GatewayController`)保存网关凭证。保存时,控制器使用 `EncryptionHelper` 加密私钥和 webhook 密钥后再持久化,然后 —— 在任何非本地主机上 —— 删除教会的现有 webhook 并配置一个指向 `/giving/donate/webhook/{provider}?churchId=…` 的新 webhook。教会每个提供商保有一行:保存网关仅替换该提供商的现有行。公共读取(`GET /giving/gateways/churchId/:churchId`、`/configured/:churchId`)仅返回公钥。

## 数据模型

giving 模式(`Api/src/modules/giving/db/DatabaseTypes.ts`、`models/` 中的模型)是通过 Kysely 访问的 MySQL 模式:

| 表 | 角色 |
|-------|------|
| `gateways` | 每教会提供商配置:提供商、公钥、加密的 privateKey/webhookKey、productId、payFees、货币、设置、环境 |
| `funds` | 捐赠指定(`name`、`taxDeductible`、`productId`) |
| `donationBatches` | 输入/报告的分组(`name`、`batchDate`) |
| `donations` | 一笔礼物:`batchId`、`personId`、`donationDate`、`amount`、`currency`、`method`、`status`(pending/complete/failed/refunded;语句、总计、仪表板和捐赠报告仅计数 complete 或 null)、`transactionId` |
| `fundDonations` | 跨一个或多个资金分配捐赠(`donationId`、`fundId`、`amount`) |
| `subscriptions` | 定期礼物;`id` 是网关的订阅 ID,链接到 `personId`、`customerId`、`gatewayId` |
| `subscriptionFunds` | 定期礼物的资金拆分 |
| `customers` | 将 `personId` 链接到其网关客户 ID,按 `provider` |
| `gatewayPaymentMethods` | 已保存的卡/银行:`customerId`、`externalId`、`methodType`、`displayName`、`metadata` |
| `eventLogs` | Webhook/事件审计跟踪和重复数据删除密钥(provider、providerId、eventType、status、resolved) |
| `campaigns` / `pledges` | 与资金相关的承诺活动,以及每个人的承诺金额 |

捐赠通过 `fundDonations` 拆分为资金 —— 捐赠携带总额,每个 `fundDonation` 携带一个切片。`donations.currency` 和 `gateways.currency` 携带 ISO 货币;每个提供商宣传其 `supportedCurrencies`,金额使用 `CurrencyHelper.formatCurrencyWithLocale` 格式化。

## 端到端流程

### 成员一次性和定期(B1App)

认证捐赠屏幕(`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`)组成三个 apphelper 组件:`MultiGatewayDonationForm`、`PaymentMethods` 和 `RecurringDonations`。B1App 进行周围的数据加载 —— `GET /donations/my`、`/gateways`、`/paymentmethods/personid/:id`、`/customers/:id/subscriptions` —— 并传递网关列表;解析的提供商从网关的公钥加载其自己的 SDK。收费本身发生在 apphelper 内:解析的提供商令牌化(新的或已保存的)方法,然后发布到 `/giving/donate/charge` 用于一次性礼物或 `/giving/donate/subscribe` 用于定期礼物。两个端点都将已签入的捐赠者属性到其自己的 `personId`(仅 `donations.edit` 持有者可能属性给其他人)并拒绝加起来超过收费金额的资金拆分。定期礼物创建一个 `subscriptions` 行加 `subscriptionFunds` 并将时间表交给网关(Stripe 订阅、PayPal 计费计划或 KF 定期时间表)。

### 访客/匿名捐赠

公共捐赠页面(`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`)和"立即捐赠"面板呈现来自 `@churchapps/apphelper/website` 的 `NonAuthDonationWrapper`,它在提供商的 `GuestForm` 周围注入 reCAPTCHA 和网关的 Elements 上下文。访客没有登录、没有已保存的方法和没有历史记录。流程获取 `GET /giving/funds/churchId/:id` 和 `GET /giving/donate/gateways/:churchId`(仅公钥)、使用 `POST /giving/donate/captcha-verify` 验证访客、在浏览器中令牌化并发布到 `/giving/donate/charge`(或 `/subscribe`)。访客 ACH 使用匿名 `POST /giving/paymentmethods/ach-setup-intent-anon`。

三个访客表单选项乘坐相同的收费调用。捐赠 URL 上的 `?fundId=` 和 `?amount=` 预选资金拆分(由每个提供商的访客表单在挂载时读取,通过正常的资金更改处理程序路由,以便总计和费用更新)。`anonymous: true` 使 `DonateController.charge` 丢弃客户端发送的任何人员并使用 `personId = null` 记录礼物;访客表单跳过 `/people/loadOrCreate` 和客户/保险库步骤,三个立即日志提供商停止从网关客户解析人员。Apple Pay 需要在 Stripe 中注册页面的域,因此 Stripe 访客表单每个会话发布一次到公共、速率受限的 `POST /giving/donate/register-domain`,它仅在属于教会的域上接受(`<subDomain>.b1.church`、内容模块的域表中的一行或本地主机)后才调用 Stripe 的支付方法域 API。

### 管理记录和 Stripe 导入(B1Admin)

B1Admin 捐赠部分(`B1Admin/src/donations/`)是财务团队工作的地方。批量输入(`components/BulkDonationEntry.tsx`)通过发布 `/giving/donations` 然后 `/giving/funddonations` 来记录现金/支票/实物礼物 —— 没有涉及网关。资金、批次、活动和对账单各自映射到其 `/giving/*` CRUD 路由。成员风格的捐赠面板(`B1Admin/src/donationComponents/`)重用 B1App 相同的 apphelper 组件。

报告和会计交接是客户端或报告运行程序工作,而不是网关工作:批次页面的 QuickBooks 导出从批次的 `donations` + `fundDonations` 构建日记账条目 CSV(借记未存款资金,每个资金一个贷记)、过期捐赠者标签通过 `ReportOutput` 解析人员名称运行 `Api/reports/lapsedGivers.json` 通过通用报告运行程序、国家收据格式(加拿大/澳大利亚/新西兰)是会员键/值存储中的教会设置,由 `GivingStatementDocument` 呈现并在 B1App 打印页面中重复。

### 转换混合货币总计

任何返回可能混合货币礼物的单个组合总计的端点 —— giving 摘要 KPI(`GivingKpiCards`)、捐赠批次总计、资金总计和 B1App 捐赠屏幕的年初至今/期间总计 —— 在服务器端转换到教会的默认货币而不是对不同货币求和。`Api/src/shared/helpers/ExchangeRateHelper.ts` 从 `api.frankfurter.dev` 获取以教会货币为键的汇率,在进程中缓存 12 小时,并暴露 `convertTotals(rows, churchCurrency, rates)`:行在 SQL 中按货币预先分组(少数几个分组,从不是每笔礼物转换)、每个分组被转换和求和,结果携带一个 `isConverted` 标志客户端使用以显示"在当前汇率下转换"注记。个别捐赠记录和历史/原始货币报告永远不会被转换 —— 仅组合总计。

Stripe 导入(`B1Admin/src/donations/StripeImportPage.tsx`)回填在 B1 外进行的礼物:它调用 `POST /giving/donate/replay-stripe-events`,其中 `dryRun: true` 用于预览,然后 `dryRun: false` 用于导入。服务器列出日期范围的 Stripe 事件并跳过已记录的任何内容 —— 首先通过 `eventLogs` 提供商 ID 匹配,然后通过 `DonationRepo.findMatchingDonation`(金额 + 日期 + 人员)以便重新运行永远不会重复导入。

## Webhook 和对账

已清算的支付和订阅状态更改到达 `POST /giving/donate/webhook/:provider?churchId=…`(`DonateController.webhook`)。处理有意是幂等的:

1. **验证** —— `GatewayService.verifyWebhook` 委托给提供商的签名检查;失败的签名返回 401。不需要处理的事件使用 200 快速回路。
2. **重复数据删除事件** —— `EventLogRepo.loadByProviderId` 跳过 `eventLogs` 中已记录的 webhook。
3. **重复数据删除捐赠** —— 在创建任何内容之前,会检查 `DonationRepo.loadByTransactionId` 对抗有效负载可能携带的每个候选 ID。这吸收重复传递、多阶段 ACH 事件(pending → settled)和 `/donate/charge` 已乐观地记录礼物的情况。
4. **应用** —— 提供商的 `classifyWebhookEvent(eventType)` 说事件意味着什么(捐赠 pending/complete、cancel-subscription 或 ignore);已完成的支付创建一个 `complete` 捐赠(或晋升现有的 `pending` 或 `failed` 捐赠)、ACH 风格事件落地为 `pending` 直到清算、失败的订阅发票(Stripe `invoice.payment_failed`)创建一个以发票 ID 为键的 `failed` 捐赠、取消事件删除本地 `subscriptions` 行。控制器永远不会检查提供商特定的事件名称。

### 失败的定期礼物和追债

一个 `failed` 捐赠是恢复的工作单位。`GET /giving/donations/failed` 列出它们及来自 `eventLogs` 的最新网关失败消息和来自网关功能的 `canRetry` 标志;`POST /giving/donate/retry/:donationId` 调用提供商的 `retryFailedPayment`(Stripe 支付未清发票),生成的 webhook 通过正常重复数据删除路径将行晋升为 `complete`。追债电子邮件在 webhook 处理程序的第 0 天从捐赠者进行,然后从午夜计时器(在 `lambda/timer-handler.ts` 和 `RailwayCron.ts` 中有线)中的 `DunningHelper.run` 在第 3 和第 7 天进行;每个发送在 `eventLogs` 中记录为 `provider: "dunning"`、`providerId: "<donationId>:<day>"`,因此重新运行永远不会发送两次电子邮件。在此功能之前创建的 Stripe webhook 端点不订阅 `invoice.payment_failed`;重新保存网关使用事件配置新的端点。

具有 `logsDonationsImmediately` 的提供商(PayPal、Kingdom Funding、Paystack)将其费用从 `/charge` 响应记录(对于快乐路径不需要 webhook 往返),而 Stripe 依赖 `payment_intent.succeeded` / `invoice.paid` 和 ACH `payment_intent.processing`。费用处理(`POST /giving/donate/fee`、`payFees` 网关标志和每个提供商的 `calculateFees`)在捐赠者端计算"覆盖费用"总额 —— B1 不获取平台削减,因此永远不会添加应用费用。

:::info
收费和 webhook 路径写入相同的 `donations` / `fundDonations` 行。`transactionId` 是连接键,使乐观费用日志及其后来的 webhook 不会为一笔礼物产生两个捐赠。
:::

## 相关页面

- [Giving 端点](../api/endpoints/giving) —— 用于捐赠、资金、批次、网关、订阅、支付方法和 webhook 的完整 REST 表面
- [AppHelper](../shared-libraries/app-helper) —— 提供支付提供商注册表和捐赠组件的 npm 包
- [模块结构](../api/module-structure) —— GivingApi 模块在服务器端的组织方式
