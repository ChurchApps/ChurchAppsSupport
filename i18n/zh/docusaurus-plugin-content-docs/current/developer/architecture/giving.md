---
title: "奉献架构"
---

# 奉献架构

<div class="article-intro">

ChurchApps 采用网关通道模式处理捐款：教会保留自己的 Stripe（或 PayPal、Kingdom Funding、Paystack）账户，B1 从不作为平台处理方介入资金流。卡片数据在浏览器中完成令牌化，永远不会到达 ChurchApps 服务器。本页介绍整个技术栈：`@churchapps/apphelper` 中的客户端支付提供方注册表、GivingApi 网关抽象、捐款数据模型，以及网关 webhook 如何回写并同步到数据库。

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

贯穿整个技术栈的三项原则：

1. **网关持有卡片。** 每个提供方的录入组件都在浏览器中完成令牌化；API 只会接收到令牌、nonce 或订单 ID。
2. **一套抽象，多个提供方。** 浏览器从注册表中解析出 `PaymentProvider`；服务器则从工厂中解析出 `IGatewayProvider`。两端都使用保存在网关记录上的同一标准化提供方名称作为键。
3. **Webhook 是结算的权威来源。** 收款响应会被乐观地记录，但真正确认（或创建）已完成捐款的是网关的签名 webhook，两端都设有幂等保护。

## 客户端：支付提供方注册表（`@churchapps/apphelper`）

注册表位于 `Packages/apphelper/src/donations/providers/` 中，每个提供方的组件和辅助函数都放在其各自的子文件夹下（`providers/stripe/`、`providers/paypal/`、`providers/kingdomfunding/`、`providers/paystack/`）——`providers/` 之外的任何代码都不会根据提供方名称进行分支。`PaymentProvider`（参见 `providers/types.ts`）打包了宿主应用对单个网关所需的全部内容：`descriptor`（管理员标签、支持的货币、手续费字段、默认费率、仪表板/注册 URL）、`capabilities` 功能标志集（已保存的卡片、ACH、定期捐款、内联新卡录入、隐式的保存并令牌化）、用于会员录入的 React 组件（`MemberWrapper`/`MemberEntry`）、访客奉献表单（`GuestForm`）、已保存支付方式的编辑（`MethodEditForm`），以及表单问题付款（`FormPayment`），还有 `buildChargeRequest(ctx, token)`——这是各提供方收款请求结构唯一存在差异的地方。每个提供方的 `MemberWrapper` 都会根据网关记录中的公钥加载自己的 SDK，因此宿主应用从不导入网关 SDK（B1App 和 B1Admin 没有 `@stripe/*` 依赖）。`pickDefaultGateway(gateways, capability?)` 统一决定某个界面应使用教会的哪个网关。

`providers/registry.ts` 保存内置提供方。它们是**以值的方式直接引用**的，而不是通过模块副作用注册，因此打包工具的摇树优化（tree-shaking）永远不会移除这些注册：

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| 函数 | 用途 |
|----------|---------|
| `getPaymentProvider(name)` | 按标准化名称解析；若找不到则回退到 Stripe，确保配置错误的提供方不会导致捐款表单崩溃 |
| `registerPaymentProvider(p)` | 在运行时注册额外的提供方（用于宿主应用的自定义网关） |
| `listPaymentProviders()` | 列出内置及自定义提供方——用于构建管理员的网关下拉列表 |
| `hasPaymentProvider(name)` | 检查是否已注册 |

**内置客户端提供方：Stripe、PayPal、Kingdom Funding、Paystack。** B1App 和 B1Admin 只*读取*注册表（`getPaymentProvider`、`listPaymentProviders`）；两者都不调用 `registerPaymentProvider`——注册始终保留在 apphelper 内部。

每个提供方的令牌化方式各不相同，但都确保卡片信息不经过 B1：

| 提供方 | 录入组件 | 返回给 API 的令牌 |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` 的 `CardElement` → `stripe.createPaymentMethod(...)`；访客表单还会挂载 `ExpressCheckoutElement`（Apple Pay / Google Pay，用于单次捐赠），其 `onConfirm` 同样会得到 `pm_…` ID | 支付方式 ID（`pm_…`）；银行账户通过 `/paymentmethods/ach-setup-intent` 完成——美元网关使用 Financial Connections `us_bank_account`，加元网关使用加拿大 PAD `acss_debit`（托管授权弹窗，授权书的 `default_for` 指向发票/订阅，一次性收费则传递授权书 ID） |
| Kingdom Funding | 以网关公钥为键的托管式令牌化表单 | 一次性 nonce |
| PayPal | PayPal Hosted Fields（卡片、定期捐款）以及带 Venmo 资金来源的 PayPal Smart Buttons（单次捐赠）；两者共用一次 SDK 加载，服务器端订单通过 `/donate/client-token` + `/donate/create-order` 构建 | 已捕获的订单 ID |
| Paystack | Paystack Inline 弹窗（`js.paystack.co/v2/inline.js`）——弹窗本身完成付款（卡片、移动货币、银行转账、USSD） | 已付款的交易参考号；已保存的支付方式为 Paystack `AUTH_…` 授权码 |

Stripe 的 `finalizeResult` 会在浏览器中执行 3D Secure / SCA 验证（`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`），之后才认为捐款已完成；共享表单只需调用 `provider.finalizeResult(result)`，无需了解其具体行为。

## 服务器端：网关抽象（GivingApi）

`/giving` 模块（`Api/src/modules/giving`）对外提供 REST 接口；网关的底层实现位于 `Api/src/shared/helpers` 中。`DonateController` 从不直接调用网关 SDK——它通过 `GatewayService` 完成操作，后者从 `GatewayFactory` 中解析出正确的 `IGatewayProvider`，并将解密后的 `GatewayConfig` 交给它。

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider`（`shared/helpers/gateways/IGatewayProvider.ts`）是每个网关都必须实现的契约，涵盖：webhook 生命周期（`createWebhookEndpoint`、`verifyWebhookSignature`、`classifyWebhookEvent`）、支付（`prepareCharge`、`processCharge`、`prepareSubscription`、`createSubscription`、`finalizeSubscription`、`cancelSubscription`）、手续费（`calculateFees`）、已保存支付方式的处理（`listNormalizedPaymentMethods`、`buildAttachOptions`、`buildLocalMethodRecord`、`deletePaymentMethod`、`verifyMethodOwnership`、`ownsPaymentMethodId`），以及可选扩展（客户、订单、SetupIntent、事件重放、针对失败订阅发票的 `retryFailedPayment`，以及用于 Apple Pay 域名验证的 `registerPaymentMethodDomain`）。若提供方未实现某个可选钩子，则该操作会被视为不受支持，界面也会隐藏相应控件。每个提供方类都声明了自己的 `capabilities` 矩阵（支持的货币、ACH、退款、订阅要求、交易限额）——`GatewayService.getProviderCapabilities(provider)` 只是读取该矩阵；`logsDonationsImmediately` 等标志驱动控制器行为，因此控制器中无需任何针对提供方名称的条件判断。

**在 `GatewayFactory` 中注册的服务器端提供方：**

| 提供方 | 可用性 |
|----------|-------------|
| Stripe | 始终开启 |
| PayPal | 始终开启 |
| Kingdom Funding | 始终开启 |
| Paystack | 始终开启（适用于尼日利亚、加纳、南非、肯尼亚、科特迪瓦的商户；货币为 NGN/GHS/ZAR/KES/XOF/USD） |
| Square | 通过 `ENABLE_SQUARE` 环境变量选择开启 |
| ePayMints | 通过 `ENABLE_EPAYMINTS` 环境变量选择开启 |

Paystack 与其他提供方的不同之处在于，资金在 GivingApi 介入之前就已经转移：弹窗向捐赠者收费，`processCharge` 是一个 `GET /transaction/verify/:reference` 请求，其已付金额和货币必须与待记录的捐款一致（已存档的参考号绝不会被重复记录）；定期捐款计划的第一笔奉献由 `finalizeSubscription` 记录（验证 → `POST /plan` → `POST /subscription`，其中 `start_date` 为一个周期之后）。Webhook 使用密钥本身签名（`x-paystack-signature`，对原始请求体进行 HMAC-SHA512 计算），且 Paystack 没有 webhook 管理 API，因此管理员界面会显示 URL，供教会粘贴到其 Paystack 仪表板中。续订时的 `charge.success` 事件不包含基金拆分信息，提供方会从捐赠者本地的 `subscriptions`/`subscriptionFunds` 记录中恢复该信息。只有银行卡授权是 `reusable` 的——移动货币奉献仅限一次性，因此 `createSubscription` 会拒绝这类支付。演示数据中为第二个教会（Accra Community Church，`CHU00000002`）配置了 Paystack 测试模式 GHS 网关，使 Paystack 的 Playwright 测试套件能与 Grace 的 Stripe 套件并行运行。

设置 `ENABLE_CUSTOM_GATEWAY_PROVIDERS` 后，可在运行时注册自定义提供方；`AbstractExperimentalGatewayProvider` 是这些提供方的基类。提供方名称的匹配不区分大小写。

### 网关配置与密钥

管理员通过 `POST /giving/gateways`（`GatewayController`）保存网关凭据。保存时，控制器会先使用 `EncryptionHelper` 加密私钥和 webhook 密钥再持久化；然后，若主机名不是 localhost，则会删除该教会现有的 webhook，并新建一个指向 `/giving/donate/webhook/{provider}?churchId=…` 的 webhook。每个教会对每个提供方只保留一行记录：保存网关时，只会替换同一提供方的现有记录。公开读取接口（`GET /giving/gateways/churchId/:churchId`、`/configured/:churchId`）只返回公钥。

## 数据模型

奉献数据库结构（`Api/src/modules/giving/db/DatabaseTypes.ts`，模型位于 `models/` 中）是通过 Kysely 访问的 MySQL 数据库结构：

| 表 | 作用 |
|-------|------|
| `gateways` | 每个教会的提供方配置：`provider`、`publicKey`、加密的 `privateKey`/`webhookKey`、`productId`、`payFees`、`currency`、`settings`、`environment` |
| `funds` | 奉献基金（`name`、`taxDeductible`、`productId`） |
| `donationBatches` | 用于录入和报表的分组（`name`、`batchDate`、`status` `open`/`closed`、`closedDate`、`closedBy`） |
| `donations` | 单笔奉献：`batchId`、`personId`、`donationDate`、`amount`、`currency`、`method`、`status`（`pending`/`complete`/`failed`/`refunded`；对账单、总计、仪表板和奉献报表只统计 `complete` 或 null 的记录）、`transactionId` |
| `fundDonations` | 将一笔捐款分配到一个或多个基金（`donationId`、`fundId`、`amount`） |
| `subscriptions` | 定期奉献；`id` 为网关的订阅 ID，关联 `personId`、`customerId`、`gatewayId` |
| `subscriptionFunds` | 定期奉献的基金拆分 |
| `customers` | 按 `provider` 将 `personId` 与网关客户 ID 关联 |
| `gatewayPaymentMethods` | 已保存的卡片/银行账户：`customerId`、`externalId`、`methodType`、`displayName`、`metadata` |
| `eventLogs` | Webhook/事件审计记录及去重键（`provider`、`providerId`、`eventType`、`status`、`resolved`） |
| `campaigns` / `pledges` | 关联到某个基金的认捐活动，以及每个人的认捐金额 |

一笔捐款通过 `fundDonations` 分配到各个基金——捐款记录保存总额，每条 `fundDonation` 记录保存其中一部分。`donations.currency` 和 `gateways.currency` 保存 ISO 货币代码；每个提供方都会公布其 `supportedCurrencies`，金额通过 `CurrencyHelper.formatCurrencyWithLocale` 进行格式化。

## 端到端流程

### 会员单次及定期捐款（B1App）

已登录的捐款页面（`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`）组合了 apphelper 中的三个组件：`MultiGatewayDonationForm`、`PaymentMethods` 和 `RecurringDonations`。B1App 负责周边的数据加载——`GET /donations/my`、`/gateways`、`/paymentmethods/personid/:id`、`/customers/:id/subscriptions`——并将网关列表传递下去；解析出的提供方会根据网关的公钥加载自己的 SDK。实际收款在 apphelper 内部完成：解析出的提供方先对（新的或已保存的）支付方式进行令牌化，然后单次捐赠发送到 `/giving/donate/charge`，定期捐赠则发送到 `/giving/donate/subscribe`。两个端点都会将已登录捐赠者归属到其自己的 `personId`（只有具备 `donations.edit` 权限的人才能将捐款归属到他人名下），并会拒绝基金拆分总额超过收款金额的请求。定期捐赠会创建一条 `subscriptions` 记录及 `subscriptionFunds`，并将排期交给网关（Stripe Subscriptions、PayPal Billing Plans 或 KF 定期排期）。

### 访客/匿名奉献

公开的捐款页面（`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`）以及“立即奉献”面板会渲染来自 `@churchapps/apphelper/website` 的 `NonAuthDonationWrapper`，它会在提供方的 `GuestForm` 外层注入 reCAPTCHA 和网关的 Elements 上下文。访客无需登录，无法使用已保存的支付方式，也看不到历史记录。流程中会调用 `GET /giving/funds/churchId/:id` 和 `GET /giving/donate/gateways/:churchId`（仅公钥），通过 `POST /giving/donate/captcha-verify` 验证访问者，在浏览器中完成令牌化，然后发送到 `/giving/donate/charge`（或 `/subscribe`）。访客 ACH 使用匿名接口 `POST /giving/paymentmethods/ach-setup-intent-anon`，且仅允许即时（Financial Connections）验证：小额存款验证需要数天才能完成，而那时访客早已离开页面，因此无法完成奉献。表单会拒绝对未验证的 SetupIntent 收款，并引导捐赠者使用银行卡或已登录的银行账户设置。

访客表单有三个选项，它们都使用同一个收款请求。捐款页面 URL 上的 `?fundId=` 和 `?amount=` 会预先选定基金拆分（由各提供方的访客表单在挂载时读取，并经由常规的基金变更处理函数处理，从而更新总计和手续费）。`anonymous: true` 会使 `DonateController.charge` 丢弃客户端发送的任何人员信息，并以 `personId = null` 记录该笔奉献；访客表单会跳过 `/people/loadOrCreate` 以及客户/保险库步骤，三个立即记录的提供方也不再从网关客户中解析出人员。Apple Pay 需要在 Stripe 中注册页面所在的域名，因此 Stripe 访客表单每个会话会向公开的、有速率限制的 `POST /giving/donate/register-domain` 发送一次请求；该接口只接受属于该教会的域名（`<subDomain>.b1.church`、内容模块域名表中的记录，或本地主机），然后再调用 Stripe 的 payment-method-domains API。

### 管理员录入与 Stripe 导入（B1Admin）

B1Admin 的奉献板块（`B1Admin/src/donations/`）是财务团队的工作区。批量录入（`components/BulkDonationEntry.tsx`）通过依次发送 `/giving/donations` 和 `/giving/funddonations` 记录现金/支票/实物奉献——不涉及网关。人员记录上的 **Log a gift（记录奉献）** 对话框（`components/LogGiftDialog.tsx`）为单笔奉献执行同样的操作：先查找 `batchDate` 与奉献日期一致的批次，若不存在则以该日期命名创建新批次（`POST /giving/donationbatches`），并在后续步骤失败时删除刚创建的奉献/新批次。基金、批次、活动和对账单各自对应其 `/giving/*` CRUD 路由；奉献对账单页面（`BatchGivingStatementsPage`、`PrintAllStatementsPage`）通过 `GET /donations?startDate=&endDate=` 和 `GET /fundDonations?startDate=&endDate=` 只请求一个日历年的数据，而不是教会的全部历史，因为后者可能超出 Lambda 的响应大小限制。成员风格的捐款面板（`B1Admin/src/donationComponents/`）复用了与 B1App 相同的 apphelper 组件。

报表与会计对接属于客户端或报表运行器的工作，而非网关的工作：批次页面的 QuickBooks 导出会根据批次的 `donations` + `fundDonations` 构建日记账分录 CSV（借记 Undeposited Funds，每个基金贷记一笔）；汇总页面的“Lapsed Givers（已停止奉献者）”视图通过通用报表运行器运行 `Api/reports/lapsedGivers.json`，人员姓名由 `ReportOutput` 解析；国家收据格式（加拿大 / 澳大利亚 / 新西兰）是会员（membership）键值存储中的教会设置，由 `GivingStatementDocument` 渲染，并在 B1App 打印页面中复制。B1Admin 的对账单打印页面（`PrintDonationPage`、`PrintAllStatementsPage`）会传递教会的 `logoLight` 设置（通过 `B1Admin/src/components/PrintChurchHeader.tsx` 中的 `usePrintLogo`），使每份对账单顶部都打印出 Logo，并在自动打印前等待图片加载完成。

### 批次状态与“录入奉献”权限

批次可以关闭，以便已清点的存款保持原样。`POST /giving/donationbatches/:id/close` 和 `/:id/reopen`（仅限 Donations.Edit）是 `status`、`closedDate` 和 `closedBy` 唯一的写入途径（`DonationBatchRepo.setStatus`）；普通的批次保存不会修改这些字段，因此提交批次不会意外重新打开它。写入权限集中在 `Api/src/modules/giving/helpers/BatchAccessHelper.ts` 中：Donations.Edit 可以更改任何内容，而范围较窄的 Donations.Enter 权限（`GivingApi` / `Donations` / `Enter`，在角色编辑器中显示为“Enter Donations”）只能在奉献当前所在批次和目标批次都处于开启状态时，创建批次并保存或删除奉献及基金拆分，并且绝不能用于网关奉献（即带有 `transactionId` 的记录）。被阻止的写入会返回 `403 { error: "This batch is closed." }`。读取批次时，Donations.ViewSummary 或 Donations.Enter 均可，以便计数人员选择要录入的批次。在客户端，`B1Admin/src/donations/batchAccess.ts` 镜像了这些规则（`canSeeBatches`、`canEnterDonations`、`canChangeBatch`），并且 `Header` / `SecondaryMenuHelper` 会向任何可以查看批次的人显示 **Donations > Batches（奉献 > 批次）**，即使他们没有 View Summary 权限。

### 换算混合货币总额

任何返回可能包含多种货币的合并总额的端点——奉献汇总 KPI（`GivingKpiCards`）、批次总额、基金总额，以及 B1App 捐款页面的年初至今/期间总额——都会在服务器端将其换算为教会的默认货币，而不是直接累加不同货币的金额。`Api/src/shared/helpers/ExchangeRateHelper.ts` 以教会货币为基准从 `api.frankfurter.dev` 获取汇率，并在进程内缓存 12 小时，同时提供 `convertTotals(rows, churchCurrency, rates)`：各行数据先在 SQL 中按货币分组（只有少数几组，而不是逐笔换算），每组进行换算后求和，结果中带有 `isConverted` 标志，客户端据此显示“按当前汇率换算”的提示。`GET /donations/exchange-rates` 向需要汇率表的客户端（B1App 的捐款页面）提供该数据；汇率本身永远不会从请求中接收，只会在服务器端获取，因此客户端无法影响报告的总额。单笔奉献记录以及历史/原始货币报表从不进行换算——只有合并总额才会换算。

Stripe 导入（`B1Admin/src/donations/StripeImportPage.tsx`）用于补录在 B1 之外完成的奉献：它先以 `dryRun: true` 调用 `POST /giving/donate/replay-stripe-events` 进行预览，然后以 `dryRun: false` 执行导入。服务器会列出日期范围内的 Stripe 事件，并跳过已记录的事件——匹配顺序为：先按 `eventLogs` 的提供方 ID，再按交易 ID，最后按 `DonationRepo.findMatchingDonation`（金额 + 日期 + 人员），因此重复运行不会重复导入。订阅的 `charge.succeeded` / `payment_intent.succeeded` 事件会被跳过，因为这些奉献由 `invoice.paid` 记录；较新的 Stripe API 版本会移除 `PaymentIntent.invoice`，因此跳过逻辑还会依据“Subscription …”描述进行判断。

## Webhook 与对账

已结算的付款和订阅状态变更会发送到 `POST /giving/donate/webhook/:provider?churchId=…`（`DonateController.webhook`）。处理过程特意设计为幂等的：

1. **验证**——`GatewayService.verifyWebhook` 委托给提供方的签名检查；签名失败返回 401。不需要处理的事件直接返回 200。
2. **事件去重**——`EventLogRepo.loadByProviderId` 会跳过已记录在 `eventLogs` 中的 webhook。
3. **奉献去重**——在创建任何记录之前，会用 webhook 载荷可能携带的每个候选 ID 调用 `DonationRepo.loadByTransactionId` 进行检查。这可以吸收重复投递、多阶段 ACH 事件（待处理 → 已结算），以及 `/donate/charge` 已经乐观记录了该笔奉献的情况。
4. **应用**——提供方的 `classifyWebhookEvent(eventType)` 会说明该事件的含义（`donation` 待处理/已完成、`cancel-subscription` 或 `ignore`）；已完成的付款会创建一条 `complete` 的奉献记录（或将已存在的 `pending` 或 `failed` 记录升级为完成）；ACH 类事件在结算前保持为 `pending`；订阅发票支付失败（Stripe `invoice.payment_failed`）会以发票 ID 为键创建一条 `failed` 的奉献记录；取消类事件会删除本地的 `subscriptions` 记录。控制器从不检查特定提供方的事件名称。

### 定期捐款失败与催收

`failed` 奉献记录是追回工作的基本单元。`GET /giving/donations/failed` 会列出这些记录，并附上 `eventLogs` 中最新的网关失败消息，以及根据网关能力计算出的 `canRetry` 标志；`POST /giving/donate/retry/:donationId` 会调用提供方的 `retryFailedPayment`（Stripe 会支付未结的发票），由此产生的 webhook 会通过常规的去重路径将该记录升级为 `complete`。催收邮件由 webhook 处理程序在第 0 天发送给捐赠者，随后由午夜定时器（同时接入 `lambda/timer-handler.ts` 和 `RailwayCron.ts`）中的 `DunningHelper.run` 在第 3 天和第 7 天发送；每次发送都会以 `provider: "dunning"`、`providerId: "<donationId>:<day>"` 的形式记录在 `eventLogs` 中，因此重新运行不会重复发送邮件。当 Stripe 放弃并取消订阅（`customer.subscription.deleted` 且 `cancellation_details.reason: "payment_failed"`）时，`DunningHelper.notifyCanceled` 会向捐赠者发送一次邮件（`providerId: "<subscriptionId>:canceled"`）；捐赠者或管理员发起的取消则不会发送通知。Stripe 不会向已有的端点添加事件：修改 `StripeHelper.webhookEvents` 后，应重新保存网关，或针对生产环境运行 `tools/manual/stripe-webhook-events.ts`（默认为试运行，使用 `--apply` 才会写入）。

具有 `logsDonationsImmediately` 标志的提供方（PayPal、Kingdom Funding、Paystack）会根据 `/charge` 的响应记录收款（正常情况下无需 webhook 往返），而 Stripe 则依赖 `payment_intent.succeeded` / `invoice.paid` 以及 ACH 的 `payment_intent.processing`。手续费处理（`POST /giving/donate/fee`、网关的 `payFees` 标志，以及各提供方的 `calculateFees`）会在捐赠者一侧计算“承担手续费”的总额上调——B1 不收取平台费用，因此永远不会添加任何应用手续费。

:::info
收款和 webhook 路径会写入相同的 `donations` / `fundDonations` 记录。`transactionId` 是关联键，可确保乐观的收款记录与其后的 webhook 不会为同一笔奉献生成两条捐款记录。
:::

## 相关页面

- [奉献 API 端点](../api/endpoints/giving)——捐款、基金、批次、网关、订阅、支付方式和 webhook 的完整 REST 接口
- [AppHelper](../shared-libraries/app-helper)——提供支付提供方注册表和捐款组件的 npm 包
- [模块结构](../api/module-structure)——GivingApi 模块在服务器端的组织方式
