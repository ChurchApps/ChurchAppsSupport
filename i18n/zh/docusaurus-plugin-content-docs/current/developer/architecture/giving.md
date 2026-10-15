---
title: "奉献架构"
---

# 奉献架构

<div class="article-intro">

ChurchApps 采用网关通道模式处理奉献：教会保留自己的 Stripe（或 PayPal、Kingdom Funding、Paystack）账户，B1 从不作为平台处理方介入资金流。银行卡数据在浏览器中完成令牌化，永远不会到达 ChurchApps 服务器。本页梳理整个技术栈——`@churchapps/apphelper` 中的客户端提供商注册表、GivingApi 网关抽象、奉献数据模型，以及网关 webhook 如何同步回数据库。

</div>

## 概览

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

贯穿整个技术栈的三项原则：

1. **卡片由网关持有。** 每个提供商的输入组件都在浏览器中完成令牌化；API 只会接收到令牌、nonce 或订单 ID。
2. **一套抽象，多个提供商。** 浏览器从注册表中解析 `PaymentProvider`；服务器从工厂中解析 `IGatewayProvider`。两者都依据网关记录中存储的同一标准化提供商名称进行匹配。
3. **以 webhook 作为结算的权威来源。** 收费响应会被乐观地记录下来，但真正确认（或创建）已完成奉献的是网关签名的 webhook，且两端都设有幂等性保护。

## 客户端：付款提供商注册表（`@churchapps/apphelper`）

注册表位于 `Packages/apphelper/src/donations/providers/` 中，每个提供商的组件和辅助函数都位于其各自的子文件夹下（`providers/stripe/`、`providers/paypal/`、`providers/kingdomfunding/`、`providers/paystack/`）——`providers/` 之外的任何代码都不会根据提供商名称进行分支判断。`PaymentProvider`（参见 `providers/types.ts`）为宿主应用对一个网关所需的一切做了封装：`descriptor`（管理后台标签、支持的货币、手续费字段、默认手续费率、仪表板/注册 URL）、`capabilities` 标志集（已保存的银行卡、ACH、定期扣款、内联新卡输入、令牌化时隐式保存）、用于会员输入的 React 组件（`MemberWrapper`/`MemberEntry`）、访客奉献（`GuestForm`）、已保存付款方式的编辑（`MethodEditForm`），以及表单问题付款（`FormPayment`），此外还有 `buildChargeRequest(ctx, token)`——收费请求体的结构在不同提供商之间存在差异，这是唯一的处理位置。每个提供商的 `MemberWrapper` 都会根据网关记录中的公钥加载自己的 SDK，因此宿主应用从不导入网关 SDK（B1App 和 B1Admin 没有 `@stripe/*` 依赖）。`pickDefaultGateway(gateways, capability?)` 集中决定某个界面应使用教会的哪个网关。

`providers/registry.ts` 包含内置提供商。它们是**按值引用**的，而不是通过模块副作用注册，因此打包工具的摇树优化（tree-shaking）永远不会移除注册项：

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| 函数 | 用途 |
|----------|---------|
| `getPaymentProvider(name)` | 按标准化名称解析；若无匹配则回退到 Stripe，确保配置错误的提供商不会导致捐献表单硬崩溃 |
| `registerPaymentProvider(p)` | 在运行时注册额外的提供商（用于宿主应用自定义的网关） |
| `listPaymentProviders()` | 列出内置及自定义提供商——用于构建管理后台的网关下拉菜单 |
| `hasPaymentProvider(name)` | 成员检查 |

**内置客户端提供商：Stripe、PayPal、Kingdom Funding、Paystack。** B1App 和 B1Admin 只*读取*注册表（`getPaymentProvider`、`listPaymentProviders`）；两者都不调用 `registerPaymentProvider`——注册工作始终保留在 apphelper 内部。

每个提供商的令牌化方式各不相同，但都确保卡片数据不进入 B1：

| 提供商 | 输入组件 | 返回给 API 的令牌 |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` 的 `CardElement` → `stripe.createPaymentMethod(...)`；访客表单还会挂载一个 `ExpressCheckoutElement`（Apple Pay / Google Pay，用于一次性奉献），其 `onConfirm` 会解析为同样的 `pm_…` ID | 付款方式 ID（`pm_…`）；银行账户通过 `/paymentmethods/ach-setup-intent` 绑定——美元网关使用 Financial Connections `us_bank_account`，加拿大元网关使用加拿大 PAD `acss_debit`（托管授权弹窗，授权的 `default_for` 指向发票/订阅，单次收费则传递授权 ID） |
| Kingdom Funding | 以网关公钥为键的托管式令牌化表单 | 一次性 nonce |
| PayPal | PayPal Hosted Fields（银行卡、定期扣款），以及带 Venmo 资金来源的 PayPal Smart Buttons（一次性奉献）；两者共享同一个 SDK 加载，服务器订单通过 `/donate/client-token` + `/donate/create-order` 构建 | 已捕获的订单 ID |
| Paystack | Paystack Inline 弹窗（`js.paystack.co/v2/inline.js`）——付款由弹窗本身完成（银行卡、移动money、银行转账、USSD） | 已付款的交易参考号；已保存的付款方式为 Paystack `AUTH_…` 授权码 |

Stripe 的 `finalizeResult` 会在浏览器中执行 3-D Secure / SCA 验证（`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`），之后才认定奉献完成；共享表单只需调用 `provider.finalizeResult(result)`，无需了解其具体行为。

## 服务器端：网关抽象（GivingApi）

`/giving` 模块（`Api/src/modules/giving`）对外提供 REST 接口；网关相关的底层实现位于 `Api/src/shared/helpers` 中。`DonateController` 从不直接调用网关 SDK——它通过 `GatewayService` 完成，后者从 `GatewayFactory` 中解析出正确的 `IGatewayProvider`，并将解密后的 `GatewayConfig` 交给它。

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider`（`shared/helpers/gateways/IGatewayProvider.ts`）是每个网关都必须实现的契约，涵盖：webhook 生命周期（`createWebhookEndpoint`、`verifyWebhookSignature`、`classifyWebhookEvent`）、付款（`prepareCharge`、`processCharge`、`prepareSubscription`、`createSubscription`、`finalizeSubscription`、`cancelSubscription`）、手续费（`calculateFees`）、已保存付款方式的处理（`listNormalizedPaymentMethods`、`buildAttachOptions`、`buildLocalMethodRecord`、`deletePaymentMethod`、`verifyMethodOwnership`、`ownsPaymentMethodId`），以及可选扩展（客户、订单、SetupIntent、事件重放、针对失败订阅发票的 `retryFailedPayment`、用于 Apple Pay 域名验证的 `registerPaymentMethodDomain`）。如果某个提供商未实现可选钩子，则会被报告为该操作不受支持，界面也会隐藏相应控件。每个提供商类都声明了自己的 `capabilities` 矩阵（支持的货币、ACH、退款、订阅要求、交易限额）——`GatewayService.getProviderCapabilities(provider)` 只是读取它；`logsDonationsImmediately` 等标志驱动控制器行为，控制器中无需任何针对提供商名称的条件判断。

**在 `GatewayFactory` 中注册的服务器端提供商：**

| 提供商 | 可用性 |
|----------|-------------|
| Stripe | 始终开启 |
| PayPal | 始终开启 |
| Kingdom Funding | 始终开启 |
| Paystack | 始终开启（适用于尼日利亚、加纳、南非、肯尼亚、科特迪瓦商户；货币为 NGN/GHS/ZAR/KES/XOF/USD） |
| Square | 通过 `ENABLE_SQUARE` 环境变量选择开启 |
| ePayMints | 通过 `ENABLE_EPAYMINTS` 环境变量选择开启 |

Paystack 与其他提供商的不同之处在于：资金在 GivingApi 介入之前就已转移。弹窗向捐献者收费，`processCharge` 是一个 `GET /transaction/verify/:reference` 请求，其已付金额和货币必须与待记录的奉献一致（已存档的参考号永远不会被重复记录）；定期奉献计划的第一笔奉献由 `finalizeSubscription` 记录（verify → `POST /plan` → `POST /subscription`，其中 `start_date` 为一个周期之后）。Webhook 使用密钥本身签名（`x-paystack-signature`，对原始请求体进行 HMAC-SHA512），且 Paystack 没有 webhook 管理 API，因此管理界面会显示 URL，供教会粘贴到其 Paystack 仪表板中。续订的 `charge.success` 事件不包含基金拆分信息；提供商会从捐献者本地的 `subscriptions`/`subscriptionFunds` 记录中恢复该信息。只有银行卡授权是 `reusable` 的——移动money奉献仅限一次性，因此 `createSubscription` 会拒绝此类付款。演示数据中还为第二个教会（Accra Community Church，`CHU00000002`）配置了 Paystack 测试模式 GHS 网关，使 Paystack 的 Playwright 测试套件可以与 Grace 的 Stripe 测试套件并行运行。

设置 `ENABLE_CUSTOM_GATEWAY_PROVIDERS` 后，可以在运行时注册自定义提供商；`AbstractExperimentalGatewayProvider` 是这些提供商的基类。提供商名称匹配不区分大小写。

### 网关配置与密钥

管理员通过 `POST /giving/gateways`（`GatewayController`）保存网关凭据。保存时，控制器会先使用 `EncryptionHelper` 对私钥和 webhook 密钥进行加密再持久化；然后，在非 localhost 主机上，它会删除教会现有的 webhook，并创建一个新的 webhook，指向 `/giving/donate/webhook/{provider}?churchId=…`。每个教会对每个提供商只保留一行记录：保存网关只会替换同一提供商的现有记录。公开读取接口（`GET /giving/gateways/churchId/:churchId`、`/configured/:churchId`）只返回公钥。

## 数据模型

奉献数据库模式（`Api/src/modules/giving/db/DatabaseTypes.ts`，模型位于 `models/` 中）是一个通过 Kysely 访问的 MySQL 模式：

| 表 | 作用 |
|-------|------|
| `gateways` | 每个教会的提供商配置：`provider`、`publicKey`、加密的 `privateKey`/`webhookKey`、`productId`、`payFees`、`currency`、`settings`、`environment` |
| `funds` | 奉献指定用途（`name`、`taxDeductible`、`productId`） |
| `donationBatches` | 用于录入和报告的分组（`name`、`batchDate`） |
| `donations` | 一笔奉献：`batchId`、`personId`、`donationDate`、`amount`、`currency`、`method`、`status`（`pending`/`complete`/`failed`/`refunded`；报表、总额、仪表板和奉献报告只统计 `complete` 或 null 状态）、`transactionId` |
| `fundDonations` | 一笔奉献在一个或多个基金间的分配（`donationId`、`fundId`、`amount`） |
| `subscriptions` | 定期奉献；`id` 为网关的订阅 ID，关联 `personId`、`customerId`、`gatewayId` |
| `subscriptionFunds` | 定期奉献的基金拆分 |
| `customers` | 按 `provider` 将 `personId` 关联到其网关客户 ID |
| `gatewayPaymentMethods` | 已保存的银行卡/银行账户：`customerId`、`externalId`、`methodType`、`displayName`、`metadata` |
| `eventLogs` | webhook/事件审计记录以及去重键（`provider`、`providerId`、`eventType`、`status`、`resolved`） |
| `campaigns` / `pledges` | 关联到某基金的认捐活动，以及每个人的认捐金额 |

奉献通过 `fundDonations` 拆分到各基金——奉献记录保存总额，每条 `fundDonation` 记录保存其中的一部分。`donations.currency` 和 `gateways.currency` 保存 ISO 货币代码；每个提供商都会公布其 `supportedCurrencies`，金额通过 `CurrencyHelper.formatCurrencyWithLocale` 进行格式化。

## 端到端流程

### 会员一次性及定期奉献（B1App）

已登录用户的奉献页面（`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`）组合了 apphelper 中的三个组件：`MultiGatewayDonationForm`、`PaymentMethods` 和 `RecurringDonations`。B1App 负责周边的数据加载——`GET /donations/my`、`/gateways`、`/paymentmethods/personid/:id`、`/customers/:id/subscriptions`——并将网关列表传入；解析出的提供商会根据网关的公钥加载自己的 SDK。实际收费在 apphelper 内部完成：解析出的提供商对（新的或已保存的）付款方式进行令牌化，然后对一次性奉献 POST 到 `/giving/donate/charge`，或对定期奉献 POST 到 `/giving/donate/subscribe`。两个接口都会将已登录的捐献者归属到其自身的 `personId`（只有持有 `donations.edit` 权限的人才能归属到他人名下），并拒绝基金拆分总额超过已收费金额的请求。定期奉献会创建一条 `subscriptions` 记录以及 `subscriptionFunds`，并将排期交给网关处理（Stripe Subscriptions、PayPal Billing Plans，或 KF 定期排期）。

### 访客/匿名奉献

公开奉献页面（`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`）以及“立即奉献”面板会渲染来自 `@churchapps/apphelper/website` 的 `NonAuthDonationWrapper`，它会在提供商的 `GuestForm` 外层注入 reCAPTCHA 和网关的 Elements 上下文。访客无需登录，没有已保存的付款方式，也没有历史记录。流程为：获取 `GET /giving/funds/churchId/:id` 和 `GET /giving/donate/gateways/:churchId`（仅公开密钥），通过 `POST /giving/donate/captcha-verify` 验证访问者，在浏览器中完成令牌化，然后 POST 到 `/giving/donate/charge`（或 `/subscribe`）。访客 ACH 使用匿名接口 `POST /giving/paymentmethods/ach-setup-intent-anon`，且仅允许即时（Financial Connections）验证：小额试存款验证需要数天才能完成，而那时访客页面早已关闭，因此无法完成奉献。表单会拒绝对未验证的 SetupIntent 进行收费，并引导捐献者使用银行卡或登录后设置银行账户。

访客表单有三个选项共用同一收费调用。奉献页面 URL 中的 `?fundId=` 和 `?amount=` 会预先选定基金拆分（各提供商的访客表单在挂载时读取它们，并通过正常的基金变更处理程序进行路由，从而更新总额和手续费）。`anonymous: true` 会使 `DonateController.charge` 丢弃客户端发送的任何人员信息，并以 `personId = null` 记录奉献；访客表单会跳过 `/people/loadOrCreate` 以及客户/保管库步骤，三个立即记录的提供商也不再从网关客户中解析人员。Apple Pay 要求将页面域名在 Stripe 中注册，因此 Stripe 访客表单会在每个会话中向公开的、有速率限制的 `POST /giving/donate/register-domain` 发送一次请求，该接口只接受属于该教会的域名（`<subDomain>.b1.church`、内容模块域名表中的记录，或本地主机），然后再调用 Stripe 的 payment-method-domains API。

### 管理员录入及 Stripe 导入（B1Admin）

B1Admin 的奉献板块（`B1Admin/src/donations/`）是财务团队的工作区。批量录入（`components/BulkDonationEntry.tsx`）通过依次 POST `/giving/donations` 和 `/giving/funddonations` 来记录现金/支票/实物奉献——不涉及网关。人员档案中的**记录奉献**表单（`components/LogGiftDialog.tsx`）对单笔奉献执行相同操作，它会先查找 `batchDate` 与奉献日期匹配的批次，若没有则创建一个以该日期命名的批次（`POST /giving/donationbatches`），并在后续步骤失败时删除刚创建的奉献/批次。基金、批次、募捐活动和报表各自映射到对应的 `/giving/*` CRUD 路由。会员式的奉献面板（`B1Admin/src/donationComponents/`）复用了 B1App 所使用的相同 apphelper 组件。

报表和会计对接属于客户端或报表运行器的工作，而非网关工作：批次页面的 QuickBooks 导出会根据批次的 `donations` + `fundDonations` 生成日记账分录 CSV（借记 Undeposited Funds，每个基金贷记一笔）；汇总页面的 Lapsed Givers 视图通过通用报表运行器运行 `Api/reports/lapsedGivers.json`，并由 `ReportOutput` 解析人员姓名；国家收据格式（加拿大/澳大利亚/新西兰）是教会设置，存储在会员键值存储中，由 `GivingStatementDocument` 渲染，并在 B1App 的打印页面中重复实现。B1Admin 的报表打印页面（`PrintDonationPage`、`PrintAllStatementsPage`）会通过 `B1Admin/src/components/PrintChurchHeader.tsx` 中的 `usePrintLogo` 传递教会的 `logoLight` 设置，使标志打印在每份报表的顶部，并在自动打印前等待图片加载完成。

### 换算混合货币总额

任何返回单一合计总额（可能包含混合货币奉献）的接口——奉献汇总 KPI（`GivingKpiCards`）、奉献批次总额、基金总额，以及 B1App 奉献页面的年初至今/时段总额——都会在服务器端将其换算为教会的默认货币，而不是直接对不同货币求和。`Api/src/shared/helpers/ExchangeRateHelper.ts` 以教会货币为键，从 `api.frankfurter.dev` 获取汇率，并在进程内缓存 12 小时，同时提供 `convertTotals(rows, churchCurrency, rates)`：行数据在 SQL 中预先按货币分组（只有少量分组，而非逐笔换算），每组单独换算后再求和，结果中带有 `isConverted` 标志，客户端据此显示“Converted at current exchange rates”（按当前汇率换算）的说明。`GET /donations/exchange-rates` 将汇率表提供给需要它的客户端（B1App 的奉献页面）；汇率本身绝不接受来自请求的输入，只在服务器端获取，因此客户端无法影响报告的总额。单笔奉献记录以及历史/原始货币报表从不进行换算——只有合计总额会被换算。

Stripe 导入（`B1Admin/src/donations/StripeImportPage.tsx`）用于补录在 B1 之外完成的奉献：它先以 `dryRun: true` 调用 `POST /giving/donate/replay-stripe-events` 进行预览，然后以 `dryRun: false` 执行导入。服务器会列出该日期范围内的 Stripe 事件，并跳过已记录的内容——依次通过 `eventLogs` 提供商 ID、交易 ID，然后是 `DonationRepo.findMatchingDonation`（金额 + 日期 + 人员）进行匹配，因此重复运行不会重复导入。订阅的 `charge.succeeded` / `payment_intent.succeeded` 事件会被跳过，因为 `invoice.paid` 已记录了这些奉献；较新版本的 Stripe API 不再提供 `PaymentIntent.invoice`，因此跳过逻辑还会依据“Subscription …”描述进行判断。

## Webhook 与对账

已结算的付款和订阅状态变更会发送到 `POST /giving/donate/webhook/:provider?churchId=…`（`DonateController.webhook`）。处理过程被刻意设计为幂等的：

1. **验证** —— `GatewayService.verifyWebhook` 委托给提供商的签名检查；签名失败则返回 401。无需处理的事件会直接返回 200。
2. **事件去重** —— `EventLogRepo.loadByProviderId` 会跳过已记录在 `eventLogs` 中的 webhook。
3. **奉献去重** —— 在创建任何内容之前，会针对负载可能携带的每个候选 ID 调用 `DonationRepo.loadByTransactionId` 进行检查。这可以吸收重复投递、多阶段 ACH 事件（待处理 → 已结算），以及 `/donate/charge` 已乐观记录该奉献的情况。
4. **应用** —— 提供商的 `classifyWebhookEvent(eventType)` 会说明该事件的含义（`donation` 待处理/已完成、`cancel-subscription` 或 `ignore`）；已完成的付款会创建 `complete` 状态的奉献（或将已有的 `pending` 或 `failed` 奉献升级为完成），ACH 类事件在结算前会记为 `pending`，订阅发票失败（Stripe `invoice.payment_failed`）会以发票 ID 为键创建 `failed` 状态的奉献，取消事件则会删除本地的 `subscriptions` 记录。控制器从不检查特定提供商的事件名称。

### 定期奉献失败与催收

`failed` 状态的奉献是追回工作的基本单元。`GET /giving/donations/failed` 会列出这些奉献，附带来自 `eventLogs` 的最新网关失败消息，以及来自网关能力的 `canRetry` 标志；`POST /giving/donate/retry/:donationId` 会调用提供商的 `retryFailedPayment`（Stripe 支付未结清的发票），随后的 webhook 会通过正常的去重路径将该记录升级为 `complete`。催收邮件由 webhook 处理程序在第 0 天发送给捐献者，之后由午夜定时器中的 `DunningHelper.run`（同时接入 `lambda/timer-handler.ts` 和 `RailwayCron.ts`）在第 3 天和第 7 天发送；每次发送都会以 `provider: "dunning"`、`providerId: "<donationId>:<day>"` 的形式记录在 `eventLogs` 中，因此重新运行不会重复发送邮件。当 Stripe 放弃并取消订阅（`customer.subscription.deleted`，且 `cancellation_details.reason: "payment_failed"`）时，`DunningHelper.notifyCanceled` 会向捐献者发送一次邮件（`providerId: "<subscriptionId>:canceled"`）；由捐献者或管理员发起的取消则保持静默。Stripe 从不会向已有的端点添加事件：修改 `StripeHelper.webhookEvents` 后，需要重新保存网关，或者针对生产环境运行 `tools/manual/stripe-webhook-events.ts`（默认为试运行，使用 `--apply` 才会写入）。

具有 `logsDonationsImmediately` 标志的提供商（PayPal、Kingdom Funding、Paystack）会根据 `/charge` 的响应记录收费（正常流程无需经过 webhook 往返），而 Stripe 则依赖 `payment_intent.succeeded` / `invoice.paid` 以及 ACH 的 `payment_intent.processing`。手续费处理（`POST /giving/donate/fee`、网关的 `payFees` 标志，以及各提供商的 `calculateFees`）会在捐献者一侧计算“承担手续费”的总额上浮——B1 不收取平台费用，因此从不会增加任何应用手续费。

:::info
收费路径和 webhook 路径写入的是相同的 `donations` / `fundDonations` 记录。`transactionId` 是关联键，可确保乐观的收费记录与其后续的 webhook 不会为同一笔奉献产生两条奉献记录。
:::

## 相关页面

- [奉献端点](../api/endpoints/giving) —— 奉献、基金、批次、网关、订阅、付款方式和 webhook 的完整 REST 接口
- [AppHelper](../shared-libraries/app-helper) —— 包含付款提供商注册表和奉献组件的 npm 包
- [模块结构](../api/module-structure) —— GivingApi 模块在服务器端的组织方式
