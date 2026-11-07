---
title: "奉献架构"
description: "ChurchApps 奉献开发指南：B1 Admin 和 B1.church 如何通过 Stripe、PayPal、Kingdom Funding 或 Paystack 网关处理捐款。"
---

# 奉献架构

<div class="article-intro">

ChurchApps 的奉献功能采用网关通道（gateway-rail）模型：教会使用自己的 Stripe（或 PayPal、Kingdom Funding、Paystack）账户，B1 从不作为平台处理方介入资金通道。卡片数据在浏览器中被令牌化，永远不会到达 ChurchApps 服务器。本页梳理了整个技术栈——`@churchapps/apphelper` 中的客户端 provider 注册表、GivingApi 的网关抽象、奉献数据模型，以及网关 webhook 如何与数据库对账。

</div>

## 概览

```
┌─────────────────────────────┐                   ┌───────────────────────────────────────┐
│  B1App / B1Admin（浏览器）    │                   │  支付网关                              │
│                             │                   │  （Stripe / PayPal / KF / Paystack）  │
│  @churchapps/apphelper      │                   │                                       │
│  ┌───────────────────────┐  │ 在网关组件中输入卡片 │  Stripe Elements · KF 令牌化器 ·      │
│  │ 支付 provider         │──┼──────────────────▶│  PayPal Hosted Fields                 │
│  │ 注册表                 │  │◀── 令牌 / nonce ──│  （卡片永远不会到达 B1 服务器）         │
│  │ getPaymentProvider()  │  │                   └──────────▲────────────────┬───────────┘
│  │ Stripe · PayPal · KF  │  │                              │                │
│  └──────────┬────────────┘  │                              │                │
└─────────────┼───────────────┘                              │                │
              │  POST /giving/donate/charge | /subscribe     │                │
              │  { token, amount, funds, person }            │                │
              ▼                            charge / subscribe│                │ 签名的 webhook
┌─────────────────────────────────────────────┐ （使用私钥）   │                │ 事件
│  GivingApi —— /giving 模块                   │──────────────┘                │
│  DonateController → GatewayService          │                               │
│  → GatewayFactory → IGatewayProvider        │◀──────────────────────────────┘
│  donations · funds · subscriptions · …      │  POST /giving/donate/webhook/:provider
└─────────────────────┬───────────────────────┘
                      │  保存 donations + fundDonations —— 通过 eventLogs / transactionId 去重
                      ▼
                MySQL（giving 架构）
```

整个技术栈遵循三项原则：

1. **卡片由网关持有。** 每个服务商的录入组件都在浏览器中完成令牌化；API 只会收到令牌、nonce 或订单 ID。
2. **一个抽象，多个服务商。** 浏览器从注册表中解析 `PaymentProvider`；服务器从工厂中解析 `IGatewayProvider`。两者都依据网关记录中存储的同一个标准化服务商名称进行查找。
3. **Webhook 是结算的事实来源。** 扣款响应会被乐观地记录，但真正确认（或创建）已完成奉献的是网关签名的 webhook，两端都设有幂等保护。

## 客户端：支付 provider 注册表（`@churchapps/apphelper`）

注册表位于 `Packages/apphelper/src/donations/providers/`，每个服务商的组件和辅助函数都位于其独立的子目录中（`providers/stripe/`、`providers/paypal/`、`providers/kingdomfunding/`、`providers/paystack/`）——`providers/` 之外的任何代码都不会根据服务商名称进行分支判断。`PaymentProvider`（参见 `providers/types.ts`）将宿主应用对某个网关所需的一切打包在一起：`descriptor`（管理员标签、支持的币种、手续费字段、默认手续费率、控制台/注册网址）、`capabilities` 标志集（已保存的银行卡、ACH、定期、内嵌新卡录入、令牌化时自动保存）、会员录入的 React 组件（`MemberWrapper`/`MemberEntry`）、访客奉献（`GuestForm`）、已保存方式的编辑（`MethodEditForm`），以及表单问题付款（`FormPayment`），此外还有 `buildChargeRequest(ctx, token)`——这是各服务商扣款请求体结构不同的唯一位置。每个服务商的 `MemberWrapper` 都会根据网关记录中的公钥加载自己的 SDK，因此宿主应用从不直接导入网关 SDK（B1App 和 B1Admin 均没有 `@stripe/*` 依赖）。`pickDefaultGateway(gateways, capability?)` 集中决定某个界面应使用教会的哪一个网关。

`providers/registry.ts` 包含内置的 provider。它们是**通过值引用**的，而非通过模块副作用注册，因此打包工具的摇树优化（tree-shaking）永远不会丢弃注册：

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| 函数 | 用途 |
|----------|---------|
| `getPaymentProvider(name)` | 按标准化名称解析；回退到 Stripe，使配置错误的服务商永远不会导致奉献表单硬崩溃 |
| `registerPaymentProvider(p)` | 在运行时注册额外的 provider（用于宿主应用的自定义网关） |
| `listPaymentProviders()` | 列出内置及自定义的 provider——用于构建管理员的网关下拉菜单 |
| `hasPaymentProvider(name)` | 成员资格检查 |

**内置的客户端 provider：Stripe、PayPal、Kingdom Funding、Paystack。** B1App 和 B1Admin 仅*读取*注册表（`getPaymentProvider`、`listPaymentProviders`）；两者都不调用 `registerPaymentProvider`——注册工作保留在 apphelper 内部。

每个服务商的令牌化方式各不相同，但都确保卡片不经过 B1：

| 服务商 | 录入组件 | 返回给 API 的令牌 |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` 的 `CardElement` → `stripe.createPaymentMethod(...)`；访客表单还会挂载一个 `ExpressCheckoutElement`（Apple Pay / Google Pay，仅限一次性奉献），其 `onConfirm` 会解析为相同的 `pm_…` ID | 支付方式 ID（`pm_…`）；银行账户通过 `/paymentmethods/ach-setup-intent` 绑定——美元网关使用 Financial Connections 的 `us_bank_account`，加元网关使用加拿大 PAD `acss_debit`（托管授权对话框，授权 `default_for` 发票/订阅，单次扣款则传入授权 ID） |
| Kingdom Funding | 由网关公钥标识的托管式令牌化表单 | 一次性 nonce |
| PayPal | PayPal Hosted Fields（银行卡、定期），以及带 Venmo 资金来源的 PayPal Smart Buttons（一次性）；二者共享一次 SDK 加载，并通过 `/donate/client-token` + `/donate/create-order` 构建服务端订单 | 已捕获的订单 ID |
| Paystack | Paystack Inline 弹窗（`js.paystack.co/v2/inline.js`）——由弹窗本身完成付款（银行卡、移动货币、银行转账、USSD） | 已付款的交易参考号；已保存的方式为 Paystack `AUTH_…` 授权码 |

Stripe 的 `finalizeResult` 在奉献被视为完成之前，会在浏览器中运行 3-D Secure / SCA（`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`）；共享表单只需调用 `provider.finalizeResult(result)`，无需了解其具体行为。

## 服务端：网关抽象（GivingApi）

`/giving` 模块（`Api/src/modules/giving`）暴露 REST 接口；网关的底层实现位于 `Api/src/shared/helpers`。`DonateController` 从不直接与网关 SDK 通信——它通过 `GatewayService`，后者从 `GatewayFactory` 中解析出正确的 `IGatewayProvider`，并交给它一个已解密的 `GatewayConfig`。

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() 解密 privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider`（`shared/helpers/gateways/IGatewayProvider.ts`）是每个网关都必须实现的契约——包括 webhook 生命周期（`createWebhookEndpoint`、`verifyWebhookSignature`、`classifyWebhookEvent`）、支付（`prepareCharge`、`processCharge`、`prepareSubscription`、`createSubscription`、`finalizeSubscription`、`cancelSubscription`）、手续费（`calculateFees`）、已保存方式的处理（`listNormalizedPaymentMethods`、`buildAttachOptions`、`buildLocalMethodRecord`、`deletePaymentMethod`、`verifyMethodOwnership`、`ownsPaymentMethodId`），以及可选的扩展功能（客户、订单、SetupIntent、事件重放、针对失败订阅发票的 `retryFailedPayment`，以及用于 Apple Pay 域名验证的 `registerPaymentMethodDomain`）。如果某个 provider 没有实现可选的钩子，则该操作会被报告为不支持，UI 也会隐藏相应的控件。每个 provider 类都声明了自己的 `capabilities` 矩阵（支持的币种、ACH、退款、订阅要求、交易限额）——`GatewayService.getProviderCapabilities(provider)` 只是读取它；而 `logsDonationsImmediately` 等标志则驱动控制器的行为，控制器中无需任何基于服务商名称的条件判断。

**在 `GatewayFactory` 中注册的服务端 provider：**

| 服务商 | 可用性 |
|----------|-------------|
| Stripe | 始终开启 |
| PayPal | 始终开启 |
| Kingdom Funding | 始终开启 |
| Paystack | 始终开启（适用于尼日利亚、加纳、南非、肯尼亚、科特迪瓦的商户；币种为 NGN/GHS/ZAR/KES/XOF/USD） |
| Square | 通过 `ENABLE_SQUARE` 环境变量选择开启 |
| ePayMints | 通过 `ENABLE_EPAYMINTS` 环境变量选择开启 |

Paystack 与其他服务商的不同之处在于，资金在 GivingApi 介入之前就已经流动：弹窗向捐献者扣款，`processCharge` 是一个 `GET /transaction/verify/:reference`，其已付金额和币种必须与待记录的奉献一致（已存档的参考号永远不会被重复记录）；定期计划的首笔奉献则由 `finalizeSubscription` 记录（verify → `POST /plan` → `POST /subscription`，`start_date` 为一个周期之后）。Webhook 使用密钥本身签名（`x-paystack-signature`，对原始请求体进行 HMAC-SHA512），且 Paystack 没有 webhook 管理 API，因此管理员页面会显示网址，供教会粘贴到其控制台中。续费的 `charge.success` 事件不携带基金拆分信息；服务商会从捐献者本地的 `subscriptions`/`subscriptionFunds` 记录中恢复该拆分。只有银行卡授权是 `reusable`（可重复使用）的——移动货币奉献仅限一次性，因此 `createSubscription` 会拒绝它们。演示数据中额外植入了第二个教会（Accra Community Church，`CHU00000002`），使用 Paystack 测试模式的 GHS 网关，以便 Paystack 的 Playwright 测试套件与 Grace 的 Stripe 测试套件并行运行。

当设置了 `ENABLE_CUSTOM_GATEWAY_PROVIDERS` 时，可以在运行时注册自定义 provider；`AbstractExperimentalGatewayProvider` 是这些自定义 provider 的基类。服务商名称的匹配不区分大小写。

### 网关配置与密钥

管理员通过 `POST /giving/gateways`（`GatewayController`）保存网关凭据。保存时，控制器会在持久化之前使用 `EncryptionHelper` 加密私钥和 webhook 密钥；并且在非 localhost 主机上，会删除该教会现有的 webhook，并创建一个新的 webhook，指向 `/giving/donate/webhook/{provider}?churchId=…`。每个教会对每个服务商只保留一行记录：保存网关只会替换同一服务商的现有行。公开读取接口（`GET /giving/gateways/churchId/:churchId`、`/configured/:churchId`）只返回公钥。

## 数据模型

giving 架构（`Api/src/modules/giving/db/DatabaseTypes.ts`，模型位于 `models/`）是通过 Kysely 访问的 MySQL 架构：

| 数据表 | 作用 |
|-------|------|
| `gateways` | 每个教会的服务商配置：`provider`、`publicKey`、加密的 `privateKey`/`webhookKey`、`productId`、`payFees`、`currency`、`settings`、`environment` |
| `funds` | 奉献指定用途（`name`、`taxDeductible`、`productId`） |
| `donationBatches` | 用于录入和报表的分组（`name`、`batchDate`、`status` 为 `open`/`closed`、`closedDate`、`closedBy`） |
| `donations` | 一笔奉献：`batchId`、`personId`、`donationDate`、`amount`、`currency`、`method`、`status`（`pending`/`complete`/`failed`/`refunded`；捐款证明、合计、仪表板和奉献报表只统计 `complete` 或 null 的记录）、`transactionId` |
| `fundDonations` | 将一笔奉献分配到一个或多个基金（`donationId`、`fundId`、`amount`） |
| `subscriptions` | 定期奉献；`id` 为网关的订阅 ID，关联 `personId`、`customerId`、`gatewayId` |
| `subscriptionFunds` | 定期奉献的基金拆分 |
| `customers` | 按 `provider` 将 `personId` 关联到其网关客户 ID |
| `gatewayPaymentMethods` | 已保存的银行卡/银行账户：`customerId`、`externalId`、`methodType`、`displayName`、`metadata` |
| `eventLogs` | webhook/事件审计记录以及去重键（`provider`、`providerId`、`eventType`、`status`、`resolved`） |
| `campaigns` / `pledges` | 与某基金关联的认捐活动，以及每个人的认捐金额 |

一笔奉献通过 `fundDonations` 拆分到各个基金——奉献记录总额，每条 `fundDonation` 记录其中的一部分。`donations.currency` 和 `gateways.currency` 保存 ISO 币种；每个服务商都会声明其 `supportedCurrencies`，金额则使用 `CurrencyHelper.formatCurrencyWithLocale` 格式化。

## 端到端流程

### 会员单次与定期奉献（B1App）

已登录的奉献页面（`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`）组合了 apphelper 的三个组件：`MultiGatewayDonationForm`、`PaymentMethods` 和 `RecurringDonations`。B1App 负责周边的数据加载——`GET /donations/my`、`/gateways`、`/paymentmethods/personid/:id`、`/customers/:id/subscriptions`——并将网关列表传入；解析出的 provider 会根据网关的公钥加载自己的 SDK。扣款本身在 apphelper 内部完成：解析出的 provider 对（新的或已保存的）支付方式进行令牌化，然后对单次奉献 POST `/giving/donate/charge`，对定期奉献 POST `/giving/donate/subscribe`。这两个端点都会将已登录的捐献者归属到其自己的 `personId`（只有持有 `donations.edit` 的人员才能归属到他人名下），并拒绝基金拆分合计超过扣款金额的请求。定期奉献会创建一行 `subscriptions` 记录及 `subscriptionFunds`，并将排程交给网关（Stripe Subscriptions、PayPal Billing Plans，或 KF 的定期排程）。

### 访客 / 匿名奉献

公开的奉献页面（`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`）以及"立即奉献"面板会渲染来自 `@churchapps/apphelper/website` 的 `NonAuthDonationWrapper`，它会在服务商的 `GuestForm` 外层注入 reCAPTCHA 以及网关的 Elements 上下文。访客无需登录，没有已保存的支付方式，也没有奉献历史。该流程会获取 `GET /giving/funds/churchId/:id` 和 `GET /giving/donate/gateways/:churchId`（仅公钥），通过 `POST /giving/donate/captcha-verify` 验证访客身份，在浏览器中完成令牌化，然后提交到 `/giving/donate/charge`（或 `/subscribe`）。验证调用会返回一个有效期 10 分钟、经 HMAC 签名的 `captchaPass`（`Api/src/modules/giving/helpers/CaptchaPass.ts`），表单在每次访客资金相关调用中都会携带它；当 `CAPTCHA_ENFORCE=true` 时，若没有该教会的有效通行证，API 会拒绝访客的 `create-order`、`charge`、`subscribe`、`addcard` 和 `ach-setup-intent-anon` 调用。访客的付费活动报名（`POST /content/registrations/register`）会在扣款前检查同一通行证；参见[活动报名](./registrations.md#payment-flow)。访客 ACH 使用匿名的 `POST /giving/paymentmethods/ach-setup-intent-anon`，该接口仅允许即时（Financial Connections）验证：小额测试打款的核实需要数天才能完成，而那时访客已离开奉献页面，因此无法完成奉献。表单会拒绝向未经验证的 SetupIntent 扣款，并引导捐献者使用银行卡或已登录后的银行账户绑定。

访客表单有三个选项会用于同一个扣款调用。奉献 URL 上的 `?fundId=` 和 `?amount=` 会预先选定基金拆分（各服务商的访客表单在挂载时读取它们，并通过常规的基金变更处理器进行处理，以便合计金额和手续费能够同步更新）。`anonymous: true` 会使 `DonateController.charge` 丢弃客户端发送的任何人员，并以 `personId = null` 记录奉献；访客表单会跳过 `/people/loadOrCreate` 以及客户/保险库步骤，三个立即记录的服务商也会停止根据网关客户解析人员。Apple Pay 需要在 Stripe 中注册页面的域名，因此 Stripe 访客表单会在每个会话中向公开的、有速率限制的 `POST /giving/donate/register-domain` 发送一次请求，该接口仅接受属于该教会的域名（`<subDomain>.b1.church`、内容模块域名表中的记录，或本地主机），然后才调用 Stripe 的 payment-method-domains API。

### 管理员录入与 Stripe 导入（B1Admin）

B1Admin 的奉献板块（`B1Admin/src/donations/`）是财务团队的工作区。批次录入（`components/BulkDonationEntry.tsx`）通过 POST `/giving/donations` 再 POST `/giving/funddonations` 来记录现金/支票/实物奉献——不涉及网关。人员记录上的 **Log a gift**（记录一笔奉献）对话框（`components/LogGiftDialog.tsx`）对单笔奉献执行相同的操作：先查找 `batchDate` 与奉献日期一致的批次，或创建一个以该日期命名的批次（`POST /giving/donationbatches`），并在后续步骤失败时删除刚创建的奉献/新批次。基金、批次、活动和捐款证明各自映射到其 `/giving/*` CRUD 路由；捐款证明页面（`BatchGivingStatementsPage`、`PrintAllStatementsPage`）通过 `GET /donations?startDate=&endDate=` 和 `GET /fundDonations?startDate=&endDate=` 请求一个自然年，而非教会的完整历史记录，因为完整历史可能超过 Lambda 的响应大小限制。成员式奉献面板（`B1Admin/src/donationComponents/`）复用了与 B1App 相同的 apphelper 组件。

报表和会计对接属于客户端或报表运行器的工作，而非网关工作：批次页面的 QuickBooks 导出会根据批次的 `donations` + `fundDonations` 构建日记账分录 CSV（借记 Undeposited Funds（未存入资金），每个基金贷记一笔）；汇总页面的"已停止奉献者"视图通过通用报表运行器运行 `Api/reports/lapsedGivers.json`，并由 `ReportOutput` 解析人员姓名；各国的收据格式（加拿大 / 澳大利亚 / 新西兰）则是会员键值存储中的教会设置，由 `GivingStatementDocument` 渲染，并在 B1App 的打印页面中复制一份。B1Admin 的捐款证明打印页面（`PrintDonationPage`、`PrintAllStatementsPage`）会传入教会的 `logoLight` 设置（通过 `B1Admin/src/components/PrintChurchHeader.tsx` 中的 `usePrintLogo`），使标志打印在每份捐款证明的顶部，并在自动打印前等待图片加载完成。

### 批次状态与录入奉献权限

批次可以被关闭，以确保已清点存入的奉献保持原样。`POST /giving/donationbatches/:id/close` 和 `/:id/reopen`（仅限 Donations.Edit）是 `status`、`closedDate` 和 `closedBy` 的唯一写入方（`DonationBatchRepo.setStatus`）；普通的批次保存从不触碰它们，因此提交批次无法将其重新开放。写入权限集中在 `Api/src/modules/giving/helpers/BatchAccessHelper.ts` 中：Donations.Edit 可以更改任何内容，而范围较窄的 Donations.Enter 权限（`GivingApi` / `Donations` / `Enter`，即角色编辑器中的"Enter Donations"（录入奉献））只能在奉献当前所属的批次和目标批次**均处于开放状态**时，才能创建批次，并保存或删除奉献及基金拆分；并且永远不能针对网关奉献（带有 `transactionId` 的记录）进行操作。被阻止的写入会返回 `403 { error: "This batch is closed." }`。读取批次时接受 Donations.ViewSummary 或 Donations.Enter，以便录入人员选择其正在录入的批次。在客户端，`B1Admin/src/donations/batchAccess.ts` 镜像了这些规则（`canSeeBatches`、`canEnterDonations`、`canChangeBatch`），并且即使没有 View Summary 权限，`Header` / `SecondaryMenuHelper` 也会向任何能够查看批次的人员显示 **Donations > Batches**（奉献 > 批次）。

### 混合币种合计的换算

任何返回可能包含多种币种奉献的单一合计金额的端点——奉献汇总的关键指标（`GivingKpiCards`）、批次合计、基金合计，以及 B1App 奉献页面的年初至今/时段合计——都会在服务端将其换算为教会的默认币种，而不是直接对不同币种求和。`Api/src/shared/helpers/ExchangeRateHelper.ts` 会从 `api.frankfurter.dev` 获取以教会币种为基准的汇率，将其在进程内缓存 12 小时，并提供 `convertTotals(rows, churchCurrency, rates)`：行数据先在 SQL 中按币种分组（只有少数几组，而不是逐笔换算），然后每组被换算并求和，结果带有一个 `isConverted` 标志，客户端据此显示"按当前汇率换算"的提示。`GET /donations/exchange-rates` 将汇率表提供给需要它的客户端（B1App 的奉献页面）；汇率本身永远不会接受来自请求的输入，只会在服务端获取，因此客户端无法影响报告的合计金额。单笔奉献记录以及按原始币种的历史报表永远不会被换算——只有合计金额会被换算。

Stripe 导入（`B1Admin/src/donations/StripeImportPage.tsx`）用于回补在 B1 之外产生的奉献：它先以 `dryRun: true` 调用 `POST /giving/donate/replay-stripe-events` 进行预览，然后以 `dryRun: false` 执行导入。服务端会列出该日期范围内的 Stripe 事件，并跳过已记录的内容——依次通过 `eventLogs` 的服务商 ID、交易 ID，以及 `DonationRepo.findMatchingDonation`（金额 + 日期 + 人员）进行匹配，因此重复运行不会造成重复导入。订阅的 `charge.succeeded` / `payment_intent.succeeded` 事件会被跳过，因为这些奉献已由 `invoice.paid` 记录；较新的 Stripe API 版本会移除 `PaymentIntent.invoice`，因此跳过逻辑同时依据"Subscription …"描述进行判断。

## Webhook 与对账

已结算的付款和订阅状态变更会发送到 `POST /giving/donate/webhook/:provider?churchId=…`（`DonateController.webhook`）。处理过程被刻意设计为幂等的：

1. **验证** —— `GatewayService.verifyWebhook` 委托给服务商的签名检查；签名失败则返回 401。无需处理的事件会直接以 200 返回。
2. **事件去重** —— `EventLogRepo.loadByProviderId` 会跳过已记录在 `eventLogs` 中的 webhook。
3. **奉献去重** —— 在创建任何记录之前，会针对 payload 可能携带的每个候选 ID 检查 `DonationRepo.loadByTransactionId`。这可以吸收重复投递、多阶段 ACH 事件（待处理 → 已结算），以及 `/donate/charge` 已乐观记录该笔奉献的情况。
4. **应用** —— 服务商的 `classifyWebhookEvent(eventType)` 会说明该事件的含义（`donation` 待处理/已完成、`cancel-subscription`，或 `ignore`）；已完成的付款会创建一笔 `complete` 的奉献（或将已存在的 `pending` 或 `failed` 记录升级）；ACH 类事件在结算前以 `pending` 形式记录；失败的订阅发票（Stripe 的 `invoice.payment_failed`）会以发票 ID 为键创建一笔 `failed` 奉献；取消事件则会删除本地的 `subscriptions` 记录。控制器从不检查服务商特定的事件名称。

### 定期奉献失败与催款

`failed` 状态的奉献是追回工作的基本单位。`GET /giving/donations/failed` 会列出它们，并附带来自 `eventLogs` 的最新网关失败信息，以及来自网关能力声明的 `canRetry` 标志；`POST /giving/donate/retry/:donationId` 会调用服务商的 `retryFailedPayment`（Stripe 会支付未结清的发票），由此产生的 webhook 会通过常规的去重路径将该记录升级为 `complete`。催款邮件由 webhook 处理器在第 0 天发送给捐献者，然后由午夜定时器中的 `DunningHelper.run`（同时接入 `lambda/timer-handler.ts` 和 `RailwayCron.ts`）在第 3 天和第 7 天发送；每次发送都会以 `provider: "dunning"`、`providerId: "<donationId>:<day>"` 的形式记录在 `eventLogs` 中，因此重新运行不会重复发送邮件。当 Stripe 放弃并取消订阅（`customer.subscription.deleted`，且 `cancellation_details.reason: "payment_failed"`）时，`DunningHelper.notifyCanceled` 会向捐献者发送一次邮件（`providerId: "<subscriptionId>:canceled"`）；由捐献者或管理员发起的取消则保持静默。Stripe 从不会向已有的端点添加事件：修改 `StripeHelper.webhookEvents` 之后，要么重新保存网关，要么针对生产环境运行 `tools/manual/stripe-webhook-events.ts`（默认为试运行，使用 `--apply` 才会写入）。

设有 `logsDonationsImmediately` 的服务商（PayPal、Kingdom Funding、Paystack）会根据 `/charge` 的响应记录扣款（在正常流程中无需 webhook 往返），而 Stripe 则依赖 `payment_intent.succeeded` / `invoice.paid`，以及 ACH 的 `payment_intent.processing`。手续费处理（`POST /giving/donate/fee`、网关的 `payFees` 标志，以及各服务商的 `calculateFees`）在捐献者一侧计算"覆盖手续费"的总额加成——B1 不收取平台分成，因此从不会增加任何应用手续费。

:::info
扣款路径和 webhook 路径写入的是同一批 `donations` / `fundDonations` 记录。`transactionId` 是关联键，它确保乐观的扣款日志与其后续的 webhook 不会为同一笔奉献生成两条奉献记录。
:::

## 相关页面

- [奉献端点](../api/endpoints/giving.md) —— 奉献、基金、批次、网关、订阅、付款方式和 webhook 的完整 REST 接口
- [AppHelper](../shared-libraries/app-helper.md) —— 提供支付 provider 注册表和奉献组件的 npm 包
- [模块结构](../api/module-structure.md) —— GivingApi 模块在服务端的组织方式
