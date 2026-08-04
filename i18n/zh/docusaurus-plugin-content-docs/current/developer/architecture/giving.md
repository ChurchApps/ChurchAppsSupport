---
title: "捐赠架构"
---

# 捐赠架构

<div class="article-intro">

ChurchApps 在“网关直连”模型上运营捐赠功能：教会自己保有其 Stripe（或 PayPal、Kingdom Funding）账户，B1 从来不会作为平台方处理器插入到资金流转路径中。银行卡数据在浏览器中就被令牌化，永远不会到达 ChurchApps 的服务器。本页面梳理了整个技术栈——`@churchapps/apphelper` 中的客户端支付服务商注册表、GivingApi 的网关抽象层、捐赠数据模型，以及网关 Webhook 如何回写数据库完成对账。

</div>

## 概览

```
┌─────────────────────────────┐                   ┌───────────────────────────────────────┐
│  B1App / B1Admin (browser)  │                   │  Payment gateway                      │
│                             │                   │  (Stripe / PayPal / Kingdom Funding)  │
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

以下三条原则贯穿整个技术栈：

1. **银行卡数据始终由网关持有。**每个服务商的输入控件都在浏览器中完成令牌化；API 永远只会收到一个令牌、nonce 或订单 ID。
2. **一套抽象，多个服务商。**浏览器端从一个注册表中解析出 `PaymentProvider`；服务器端从一个工厂中解析出 `IGatewayProvider`。两者都以存储在网关记录上的同一个标准化服务商名称作为键。
3. **Webhook 是结算状态的事实来源。**一次扣款响应会被乐观地先行记录，但真正确认（或创建）该笔已完成捐赠记录的，是网关发来的已签名 Webhook，两端都设有幂等性保护。

## 客户端：支付服务商注册表（`@churchapps/apphelper`）

该注册表位于 `Packages/apphelper/src/donations/providers/`，每个服务商各自的控件与辅助函数都放在自己的子目录下（`providers/stripe/`、`providers/paypal/`、`providers/kingdomfunding/`）——`providers/` 目录之外没有任何代码会根据服务商名称做分支判断。一个 `PaymentProvider`（见 `providers/types.ts`）打包了宿主应用接入某个网关所需的一切：一个 `descriptor`（管理端展示标签、支持的币种、手续费字段、默认费率、控制台/注册链接）、一组 `capabilities` 能力标志（已保存银行卡、ACH、循环扣款、内联新卡录入、令牌化即隐式保存）、面向会员录入的 React 控件（`MemberWrapper`/`MemberEntry`）、访客捐赠（`GuestForm`）、已保存方式编辑（`MethodEditForm`）、表单问答内嵌付款（`FormPayment`），以及 `buildChargeRequest(ctx, token)`——扣款负载结构因服务商而异的唯一之处。每个服务商的 `MemberWrapper` 都会根据网关记录中的公钥自行加载其 SDK，因此宿主应用永远不需要引入任何网关 SDK（B1App 和 B1Admin 都没有 `@stripe/*` 这样的依赖）。`pickDefaultGateway(gateways, capability?)` 集中决定某个界面应该使用一个教会众多网关中的哪一个。

`providers/registry.ts` 保存了内置的服务商。它们是**按值引用**注册的，而非通过某个模块的副作用注册，因此打包工具的摇树优化永远不会误删这份注册：

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider]) builtins.set(p.key, p);
```

| 函数 | 用途 |
|----------|---------|
| `getPaymentProvider(name)` | 按标准化名称解析；找不到时回退到 Stripe，因此一个配置错误的服务商永远不会导致捐赠表单硬崩溃 |
| `registerPaymentProvider(p)` | 在运行时注册一个额外的服务商（供宿主应用接入自定义网关使用） |
| `listPaymentProviders()` | 枚举内置服务商及自定义服务商——用于构建管理端的网关下拉列表 |
| `hasPaymentProvider(name)` | 成员资格检查 |

**内置的客户端服务商：Stripe、PayPal、Kingdom Funding。**B1App 和 B1Admin 只*读取*这份注册表（`getPaymentProvider`、`listPaymentProviders`）；两者都不会调用 `registerPaymentProvider`——注册逻辑始终留在 apphelper 内部。

每个服务商的令牌化方式各不相同，但都确保银行卡信息不进入 B1：

| 服务商 | 录入控件 | 返回给 API 的令牌 |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` 的 `CardElement` → `stripe.createPaymentMethod(...)` | 支付方式 ID（`pm_…`）；银行账户则通过 Financial Connections / ACH SetupIntent |
| Kingdom Funding | 由网关公钥键入的托管令牌化表单 | 一次性 nonce |
| PayPal | PayPal 托管字段；服务器端订单通过 `/donate/client-token` + `/donate/create-order` 构建 | 已捕获的订单 ID |

Stripe 的 `finalizeResult` 会在捐赠被视为完成之前，在浏览器中运行 3-D Secure / SCA 校验（`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`）；共享表单只是调用 `provider.finalizeResult(result)`，完全不了解其内部具体做了什么。

## 服务器端：网关抽象层（GivingApi）

`/giving` 模块（`Api/src/modules/giving`）负责暴露 REST 接入面；网关相关的管道逻辑位于 `Api/src/shared/helpers`。`DonateController` 从不直接与某个网关 SDK 打交道——它统一通过 `GatewayService`，由后者从 `GatewayFactory` 解析出正确的 `IGatewayProvider`，并交给它一份已解密的 `GatewayConfig`。

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · …
```

`IGatewayProvider`（`shared/helpers/gateways/IGatewayProvider.ts`）是每一个网关都必须实现的契约——包括 Webhook 生命周期（`createWebhookEndpoint`、`verifyWebhookSignature`、`classifyWebhookEvent`）、支付相关（`prepareCharge`、`processCharge`、`prepareSubscription`、`createSubscription`、`finalizeSubscription`、`cancelSubscription`）、手续费（`calculateFees`）、已保存支付方式处理（`listNormalizedPaymentMethods`、`buildAttachOptions`、`buildLocalMethodRecord`、`deletePaymentMethod`、`verifyMethodOwnership`、`ownsPaymentMethodId`），以及若干可选的扩展能力（客户、订单、SetupIntent、事件重放）。每个服务商类都会声明自己的 `capabilities` 能力矩阵（支持的币种、ACH、退款、订阅要求、交易限额）——`GatewayService.getProviderCapabilities(provider)` 只是读取这份矩阵——诸如 `logsDonationsImmediately` 之类的标志会驱动控制器的行为，而控制器代码里完全不存在任何针对具体服务商名称的条件判断。

**在 `GatewayFactory` 中注册的服务器端服务商：**

| 服务商 | 可用性 |
|----------|-------------|
| Stripe | 始终开启 |
| PayPal | 始终开启 |
| Kingdom Funding | 始终开启 |
| Square | 通过 `ENABLE_SQUARE` 环境变量选择性开启 |
| ePayMints | 通过 `ENABLE_EPAYMINTS` 环境变量选择性开启 |

当设置了 `ENABLE_CUSTOM_GATEWAY_PROVIDERS` 时，可以在运行时注册自定义服务商；`AbstractExperimentalGatewayProvider` 是这类服务商的基类。服务商名称匹配不区分大小写。

### 网关配置与密钥

管理员通过 `POST /giving/gateways`（`GatewayController`）保存网关凭证。保存时控制器会用 `EncryptionHelper` 加密私钥和 Webhook 密钥后再持久化，随后——在任何非 localhost 的主机环境下——会删除该教会现有的 Webhook，并重新配置一个指向 `/giving/donate/webhook/{provider}?churchId=…` 的新 Webhook。公开读取接口（`GET /giving/gateways/churchId/:churchId`、`/configured/:churchId`）只会返回公钥。

## 数据模型

giving 模式（`Api/src/modules/giving/db/DatabaseTypes.ts`，模型位于 `models/`）是一个通过 Kysely 访问的 MySQL 数据库模式：

| 表 | 角色 |
|-------|------|
| `gateways` | 每个教会的服务商配置：`provider`、`publicKey`、加密的 `privateKey`/`webhookKey`、`productId`、`payFees`、`currency`、`settings`、`environment` |
| `funds` | 捐赠指定用途（`name`、`taxDeductible`、`productId`） |
| `donationBatches` | 用于录入/报表的分组（`name`、`batchDate`） |
| `donations` | 一笔捐赠：`batchId`、`personId`、`donationDate`、`amount`、`currency`、`method`、`status`（`pending`/`complete`/`failed`）、`transactionId` |
| `fundDonations` | 一笔捐赠在一个或多个基金之间的分配（`donationId`、`fundId`、`amount`） |
| `subscriptions` | 循环捐赠；`id` 就是网关自身的订阅 ID，关联到 `personId`、`customerId`、`gatewayId` |
| `subscriptionFunds` | 一笔循环捐赠的基金拆分 |
| `customers` | 将 `personId` 关联到其在某个 `provider` 下的网关客户 ID |
| `gatewayPaymentMethods` | 已保存的银行卡/银行账户：`customerId`、`externalId`、`methodType`、`displayName`、`metadata` |
| `eventLogs` | Webhook/事件审计轨迹与去重键（`provider`、`providerId`、`eventType`、`status`、`resolved`） |
| `campaigns` / `pledges` | 关联到某个基金的认捐活动，以及每个人认捐的金额 |

一笔捐赠通过 `fundDonations` 分配到多个基金——捐赠记录本身携带总额，每一条 `fundDonation` 携带其中一部分金额。`donations.currency` 和 `gateways.currency` 携带 ISO 币种代码；每个服务商都会公布自己支持的 `supportedCurrencies`，金额则使用 `CurrencyHelper.formatCurrencyWithLocale` 进行格式化。

## 端到端流程

### 会员一次性捐赠与循环捐赠（B1App）

已认证的捐赠页面（`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`）组合了三个 apphelper 组件：`MultiGatewayDonationForm`、`PaymentMethods` 和 `RecurringDonations`。围绕这些组件的数据加载由 B1App 负责——`GET /donations/my`、`/gateways`、`/paymentmethods/personid/:id`、`/customers/:id/subscriptions`——并将网关列表传递下去；被解析出的服务商会根据网关的公钥自行加载其 SDK。扣款操作本身发生在 apphelper 内部：被解析出的服务商对（新的或已保存的）支付方式进行令牌化，随后为一次性捐赠调用 `/giving/donate/charge`，或为循环捐赠调用 `/giving/donate/subscribe`。循环捐赠会创建一条 `subscriptions` 记录以及对应的 `subscriptionFunds`，并把排期交给网关处理（Stripe 的 Subscriptions、PayPal 的 Billing Plans，或 KF 的循环排期）。

### 访客/匿名捐赠

公开捐赠页面（`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`）以及“立即捐赠”面板会渲染来自 `@churchapps/apphelper/website` 的 `NonAuthDonationWrapper`，它会在服务商的 `GuestForm` 周围注入 reCAPTCHA 和网关的 Elements 上下文。访客不会有登录、不会有已保存的支付方式，也不会有历史记录。整个流程会获取 `GET /giving/funds/churchId/:id` 和 `GET /giving/donate/gateways/:churchId`（仅返回公钥），通过 `POST /giving/donate/captcha-verify` 验证访客身份，在浏览器中完成令牌化，并提交到 `/giving/donate/charge`（或 `/subscribe`）。访客的 ACH 捐赠使用匿名端点 `POST /giving/paymentmethods/ach-setup-intent-anon`。

### 管理端录入与 Stripe 导入（B1Admin）

B1Admin 的捐赠板块（`B1Admin/src/donations/`）是财务团队的工作台。批量录入（`components/BulkDonationEntry.tsx`）通过依次调用 `/giving/donations` 和 `/giving/funddonations` 来记录现金/支票/实物捐赠——不涉及任何网关。基金、批次、活动和结算单各自对应到相应的 `/giving/*` 增删改查路由。会员风格的捐赠面板（`B1Admin/src/donationComponents/`）复用了与 B1App 相同的 apphelper 组件。

Stripe 导入功能（`B1Admin/src/donations/StripeImportPage.tsx`）用于回填在 B1 之外发生的捐赠：它先以 `dryRun: true` 调用 `POST /giving/donate/replay-stripe-events` 进行预览，再以 `dryRun: false` 执行正式导入。服务器会列出该日期范围内的 Stripe 事件，并跳过已经记录过的事件——先按 `eventLogs` 中的服务商 ID 匹配，再按 `DonationRepo.findMatchingDonation`（金额 + 日期 + 人员）匹配，因此重复运行永远不会造成重复导入。

## Webhook 与对账

已结算的支付以及订阅状态变更会到达 `POST /giving/donate/webhook/:provider?churchId=…`（`DonateController.webhook`）。处理过程被刻意设计为幂等的：

1. **验证** —— `GatewayService.verifyWebhook` 会委托给对应服务商的签名校验逻辑；签名校验失败返回 401。不需要处理的事件会以 200 短路返回。
2. **事件去重** —— `EventLogRepo.loadByProviderId` 会跳过已记录在 `eventLogs` 中的 Webhook。
3. **捐赠去重** —— 在创建任何记录之前，都会用 `DonationRepo.loadByTransactionId` 对照负载中可能携带的每一个候选 ID 进行检查。这一机制能够吸收重复投递、多阶段的 ACH 事件（待结算 → 已结算），以及 `/donate/charge` 已经乐观地记录过这笔捐赠的情况。
4. **应用变更** —— 服务商的 `classifyWebhookEvent(eventType)` 会说明该事件的含义（`donation` 待结算/已完成、`cancel-subscription`，或 `ignore`）；已完成的支付会创建一条 `complete` 状态的捐赠记录（或将某条已存在的 `pending` 记录升级）；ACH 类事件在正式结算前会以 `pending` 状态落地；取消类事件会删除本地的 `subscriptions` 记录。控制器从不检查任何特定于服务商的事件名称。

具备 `logsDonationsImmediately` 特性的服务商（PayPal、Kingdom Funding）会直接从 `/charge` 响应中记录扣款（在正常路径下无需 Webhook 往返），而 Stripe 则依赖 `payment_intent.succeeded` / `invoice.paid` 以及 ACH 的 `payment_intent.processing`。手续费处理逻辑（`POST /giving/donate/fee`、网关的 `payFees` 标志，以及每个服务商各自的 `calculateFees`）会在捐赠人一侧计算“承担手续费”的加成金额——B1 不抽取任何平台分成，因此永远不会额外附加应用费用。

:::info
扣款路径和 Webhook 路径写入的是同一批 `donations` / `fundDonations` 记录。`transactionId` 正是这个用于关联的键，它确保一次乐观记录的扣款日志与其随后到达的 Webhook 不会为同一笔捐赠产生两条重复记录。
:::

## 相关页面

- [捐赠端点](../api/endpoints/giving) —— 涵盖捐赠、基金、批次、网关、订阅、支付方式和 Webhook 的完整 REST 接入面
- [AppHelper](../shared-libraries/app-helper) —— 提供支付服务商注册表与捐赠组件的 npm 包
- [模块结构](../api/module-structure) —— GivingApi 模块在服务器端的组织方式
