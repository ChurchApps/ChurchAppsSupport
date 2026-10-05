---
title: "奉献架构"
---

# 奉献架构

<div class="article-intro">

ChurchApps 在网关轨道模型上运行捐款：教会保持自己的 Stripe（或 PayPal、Kingdom Funding 或 Paystack）账户，B1 从不坐在金钱路径中作为平台处理器。卡数据在浏览器中标记化，永不到达 ChurchApps 服务器。此页面映射整个栈 -- `@churchapps/apphelper` 中的客户端提供商注册、GivingApi 网关抽象、捐款数据模型以及网关 Webhooks 如何调和回数据库。

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
└─────────────┬───────────────────────────────┘
                      │  save donations + fundDonations — dedup via eventLogs / transactionId
                      ▼
                MySQL (giving schema)
```

三个原则在整个栈中保持：

1. **网关持有卡。** 每个提供商的条目小部件在浏览器中标记化；API 仅接收令牌、nonce 或订单 id。
2. **一个抽象，许多提供商。** 浏览器从注册表解决 `PaymentProvider`；服务器从工厂解决 `IGatewayProvider`。两者都使用存储在网关记录上的相同标准化提供商名称。
3. **Webhooks 是结算的事实来源。** 电荷响应被乐观记录，但网关的签名 webhook 是确认（或创建）完成捐款，两侧都有幂等性防护。

## 客户端：付款提供商注册（`@churchapps/apphelper`）

注册位于 `Packages/apphelper/src/donations/providers/`，每个提供商的小部件和助手位于其自己的子文件夹（`providers/stripe/`、`providers/paypal/`、`providers/kingdomfunding/`、`providers/paystack/`）-- `providers/` 外没有任何东西在提供商名称上分支。`PaymentProvider`（请参阅 `providers/types.ts`）捆绑一个主机应用程序为一个网关需要的一切：`descriptor`（管理标签、支持的货币、费用字段、默认费率、仪表板/注册 URL）、`capabilities` 标志集（已保存卡、ACH、定期、内联新卡条目、隐式保存标记化）、React 小部件对于成员条目（`MemberWrapper`/`MemberEntry`）、来宾奉献（`GuestForm`）、已保存方法编辑（`MethodEditForm`）和表单问题支付（`FormPayment`），加 `buildChargeRequest(ctx, token)` -- 电荷有效载荷形状每个提供商不同的一个地方。每个提供商的 `MemberWrapper` 从网关记录的公钥加载自己的 SDK，所以主机应用程序永不导入网关 SDK（B1App 和 B1Admin 没有 `@stripe/*` 依赖）。`pickDefaultGateway(gateways, capability?)` 集中一个表面应该使用哪个教会网关。

`providers/registry.ts` 持有内置。它们**按值引用**，不通过模块副作用注册，所以捆绑器的树摇动永远不能丢弃注册：

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| 函数 | 目的 |
|------|------|
| `getPaymentProvider(name)` | 按标准化名称解决；如果配置错误的提供商永远不会硬崩溃捐赠者表单则回退到 Stripe |
| `registerPaymentProvider(p)` | 在运行时注册额外提供商（针对主机应用程序的自定义网关） |
| `listPaymentProviders()` | 列举内置 + 自定义 -- 用于构建管理网关下拉列表 |
| `hasPaymentProvider(name)` | 成员资格检查 |

**内置客户端提供商：Stripe、PayPal、Kingdom Funding、Paystack。** B1App 和 B1Admin 仅*读取*注册表（`getPaymentProvider`、`listPaymentProviders`）；两者都不调用 `registerPaymentProvider` -- 注册保持在 apphelper 内部。

每个提供商标记化不同，但所有都将卡保留在 B1 外：

| 提供商 | 条目小部件 | 返回给 API 的令牌 |
|---------|---------|---------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`；来宾表单也装载 `ExpressCheckoutElement`（Apple Pay / Google Pay，一次性礼物），其 `onConfirm` 解决到相同 `pm_…` id | 支付方法 id（`pm_…`）；银行通过 `/paymentmethods/ach-setup-intent` -- 财务连接 `us_bank_account` 针对 USD 网关，加拿大 PAD `acss_debit`（托管授权模式，授权 `default_for` 发票/订阅，一次性电荷通过授权 id）针对 CAD 网关 |
| Kingdom Funding | 由网关公钥键控的托管标记化表单 | 一次性 nonce |
| PayPal | PayPal 托管字段（卡、定期）加 PayPal 智能按钮带 Venmo 资金（一次性）；两者共享一个 SDK 加载和服务器订单通过 `/donate/client-token` + `/donate/create-order` | 捕获的订单 id |
| Paystack | Paystack 内联弹出（`js.paystack.co/v2/inline.js`）-- 弹出本身采用支付（卡、手机钱、银行转账、USSD） | 支付的交易参考；已保存方法是 Paystack `AUTH_…` 授权码 |

Stripe 的 `finalizeResult` 在浏览器中运行 3-D Secure / SCA（`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`）在捐款被认为完成之前；共享表单仅调用 `provider.finalizeResult(result)` 不知道它做什么。

## 服务器端：网关抽象（GivingApi）

`/giving` 模块（`Api/src/modules/giving`）暴露 REST 表面；网关管道位于 `Api/src/shared/helpers`。`DonateController` 从不直接与网关 SDK 交谈 -- 它通过 `GatewayService` 进行，从 `GatewayFactory` 解决正确的 `IGatewayProvider` 并交付已解密的 `GatewayConfig`。

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider`（`shared/helpers/gateways/IGatewayProvider.ts`）是每个网关实现的合约 -- webhook 生命周期（`createWebhookEndpoint`、`verifyWebhookSignature`、`classifyWebhookEvent`）、支付（`prepareCharge`、`processCharge`、`prepareSubscription`、`createSubscription`、`finalizeSubscription`、`cancelSubscription`）、费用（`calculateFees`）、已保存方法处理（`listNormalizedPaymentMethods`、`buildAttachOptions`、`buildLocalMethodRecord`、`deletePaymentMethod`、`verifyMethodOwnership`、`ownsPaymentMethodId`）和可选扩展（客户、订单、SetupIntents、事件重播、`retryFailedPayment` 针对失败的订阅发票，`registerPaymentMethodDomain` 针对 Apple Pay 域验证）。省略可选钩子的提供商被报告为该操作不支持，UI 隐藏控制。每个提供商类声明自己的 `capabilities` 矩阵（支持的货币、ACH、退款、订阅要求、交易限制）-- `GatewayService.getProviderCapabilities(provider)` 仅读取它 -- 和像 `logsDonationsImmediately` 的标志驱动控制器行为，无任何控制器中的提供商名称条件。

**服务器提供商在 `GatewayFactory` 中注册：**

| 提供商 | 可用性 |
|---------|-------|
| Stripe | 总是开启 |
| PayPal | 总是开启 |
| Kingdom Funding | 总是开启 |
| Paystack | 总是开启（尼日利亚、加纳、南非、肯尼亚、科特迪瓦商人；货币 NGN/GHS/ZAR/KES/XOF/USD） |
| Square | 通过 `ENABLE_SQUARE` 环境旗选择加入 |
| ePayMints | 通过 `ENABLE_EPAYMINTS` 环境旗选择加入 |

Paystack 与其他不同，金钱在 GivingApi 涉及之前移动：弹出收费捐赠者，`processCharge` 是 `GET /transaction/verify/:reference` 其支付金额和货币必须匹配记录的捐款（已在档案上的参考永不记录两次），定期计划的第一份礼物从 `finalizeSubscription` 记录（验证 → `POST /plan` → `POST /subscription` 带 `start_date` 一个间隔出）。Webhooks 使用秘钥本身签名（`x-paystack-signature`，HMAC-SHA512 覆盖原始正文），Paystack 没有 webhook 管理 API，所以管理屏幕显示教会粘贴到其仪表板的 URL。续订 `charge.success` 事件不携带基金分割；提供商从捐赠者的本地 `subscriptions`/`subscriptionFunds` 行恢复它。仅卡授权是 `reusable` -- 手机钱礼物是一次性仅，所以 `createSubscription` 拒绝它们。演示数据播种第二个教会（Accra Community Church，`CHU00000002`）在 Paystack 测试模式 GHS 网关上，所以 Paystack Playwright 套件与 Grace's Stripe 运行。

自定义提供商可以在运行时注册，当 `ENABLE_CUSTOM_GATEWAY_PROVIDERS` 设置时；`AbstractExperimentalGatewayProvider` 是这些的基类。提供商名称不区分大小写匹配。

### 网关配置与秘密

管理员通过 `POST /giving/gateways`（`GatewayController`）保存网关凭据。在保存时，控制器使用 `EncryptionHelper` 加密私钥和 webhook 键后持久化，然后 -- 在任何非本地主机上 -- 删除教会的现有 webhook 并配置一个新的指向 `/giving/donate/webhook/{provider}?churchId=…`。教会为每个提供商保持一行：保存网关仅替换该相同提供商的现有行。公开读取（`GET /giving/gateways/churchId/:churchId`、`/configured/:churchId`）仅返回公钥。

## 数据模型

奉献架构（`Api/src/modules/giving/db/DatabaseTypes.ts`，模型在 `models/`）是通过 Kysely 访问的 MySQL 架构：

| 表 | 角色 |
|-----|------|
| `gateways` | 每教会提供商配置：`provider`、`publicKey`、加密的 `privateKey`/`webhookKey`、`productId`、`payFees`、`currency`、`settings`、`environment` |
| `funds` | 奉献指定（`name`、`taxDeductible`、`productId`） |
| `donationBatches` | 条目/报告分组（`name`、`batchDate`） |
| `donations` | 一份礼物：`batchId`、`personId`、`donationDate`、`amount`、`currency`、`method`、`status`（`pending`/`complete`/`failed`/`refunded`；声明、总计、仪表板和捐款报告仅计 `complete` 或 null）、`transactionId` |
| `fundDonations` | 跨一个或多个基金分配捐款（`donationId`、`fundId`、`amount`） |
| `subscriptions` | 定期礼物；`id` 是网关的订阅 id，链接到 `personId`、`customerId`、`gatewayId` |
| `subscriptionFunds` | 定期礼物的基金分割 |
| `customers` | 链接 `personId` 到其网关客户 id，每个 `provider` |
| `gatewayPaymentMethods` | 已保存卡/银行：`customerId`、`externalId`、`methodType`、`displayName`、`metadata` |
| `eventLogs` | Webhook/事件审计线索和 dedup 密钥（`provider`、`providerId`、`eventType`、`status`、`resolved`） |
| `campaigns` / `pledges` | 链接到基金的承诺活动，及每个人的承诺金额 |

捐款通过 `fundDonations` 分割跨基金 -- 捐款携带总计，每个 `fundDonation` 携带一部分。`donations.currency` 和 `gateways.currency` 携带 ISO 货币；每个提供商宣传其 `supportedCurrencies`，金额用 `CurrencyHelper.formatCurrencyWithLocale` 格式化。

## 端到端流程

### 成员一次性和定期（B1App）

认证捐款屏幕（`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`）组成三个 apphelper 组件：`MultiGatewayDonationForm`、`PaymentMethods` 和 `RecurringDonations`。B1App 做周围数据加载 -- `GET /donations/my`、`/gateways`、`/paymentmethods/personid/:id`、`/customers/:id/subscriptions` -- 并传递网关列表；解决的提供商从网关的公钥加载自己的 SDK。电荷本身在 apphelper 内发生：解决的提供商标记化（新的或已保存）方法，然后发布到 `/giving/donate/charge` 一次性礼物或 `/giving/donate/subscribe` 定期。两个端点都属性一个登录捐赠者到他们自己的 `personId`（仅 `donations.edit` 持有者可能属性给别人）并拒绝添加到超过收费金额的基金分割。定期礼物创建 `subscriptions` 行加 `subscriptionFunds` 并交付计划到网关（Stripe 订阅、PayPal 计费计划或 KF 定期计划）。

### 来宾/匿名奉献

公开捐款页面（`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`）和"立即捐献"面板呈现 `NonAuthDonationWrapper` 从 `@churchapps/apphelper/website`，它注入 reCAPTCHA 和网关的元素上下文围绕提供商的 `GuestForm`。来宾获得无登录、无已保存方法和无历史。流程获取 `GET /giving/funds/churchId/:id` 和 `GET /giving/donate/gateways/:churchId`（仅公钥），使用 `POST /giving/donate/captcha-verify` 验证访客，在浏览器中标记化，并发布到 `/giving/donate/charge`（或 `/subscribe`）。来宾 ACH 使用匿名 `POST /giving/paymentmethods/ach-setup-intent-anon`。

三个来宾表单选项乘以相同电荷调用。`?fundId=` 和 `?amount=` 在捐款 URL 上预选基金分割（在装载时由每个提供商的来宾表单读取，通过正常基金变化处理器路由所以总计和费用更新）。`anonymous: true` 使 `DonateController.charge` 丢弃客户端发送的任何人并使用 `personId = null` 记录礼物；来宾表单跳过 `/people/loadOrCreate` 和客户/保险库步骤，三个立即记录提供商停止从网关客户解决人员。Apple Pay 需要页面的域注册 Stripe，所以 Stripe 来宾表单为每个会话发布一次到公开、速率限制的 `POST /giving/donate/register-domain`，它仅接受属于教会的域（`<subDomain>.b1.church`、内容模块的域表中的行或本地主机）在调用 Stripe 的支付方法域 API 之前。

### 管理员录制和 Stripe 导入（B1Admin）

B1Admin 捐款部分（`B1Admin/src/donations/`）是金融团队工作的地方。批量条目（`components/BulkDonationEntry.tsx`）通过发布 `/giving/donations` 然后 `/giving/funddonations` 记录现金/支票/实物礼物 -- 没有网关涉及。基金、批次、活动和声明每个映射到他们的 `/giving/*` CRUD 路由。

报告和会计交接是客户端或报告运行器工作，不是网关工作：批次页面的 QuickBooks 导出从批次的 `donations` + `fundDonations` 构建日记条目 CSV（借用未存款的基金，每个基金一个信用），"失效捐献者"选项卡运行 `Api/reports/lapsedGivers.json` 通过通用报告运行器与人员名称由 `ReportOutput` 解决，国家收据格式（加拿大/澳大利亚/新西兰）是教会设置在成员资格键/值存储中由 `GivingStatementDocument` 呈现并复制在 B1App 打印页面。

### 转换混合货币总计

任何返回跨可能混合货币礼物的单个组合总计的端点 -- 奉献摘要 KPI（`GivingKpiCards`）、捐款批次总计、基金总计和 B1App 捐款屏幕的年初至今/期间总计 -- 在服务器端转换为教会默认货币，而不是求和不同货币。`Api/src/shared/helpers/ExchangeRateHelper.ts` 从 `api.frankfurter.dev` 通过教会货币键控获取速率，在过程中缓存 12 小时，并暴露 `convertTotals(rows, churchCurrency, rates)`：行在 SQL 中预分组按货币（一些小组，永不每份礼物转换），每组被转换和求和，结果携带 `isConverted` 旗客户端使用显示"按当前汇率转换"笔记。个别捐款记录和历史/原始货币报告永不被转换 -- 仅组合总计。

Stripe 导入（`B1Admin/src/donations/StripeImportPage.tsx`）回填在 B1 外制造的礼物：它调用 `POST /giving/donate/replay-stripe-events` 带 `dryRun: true` 为预览，然后 `dryRun: false` 导入。服务器列出日期范围的 Stripe 事件并跳过任何已记录 -- 首先由 `eventLogs` 提供商 id 匹配，然后由 `DonationRepo.findMatchingDonation`（金额 + 日期 + 人员）所以重新运行永不双导入。

## Webhooks 和调和

结算付款和订阅状态改变抵达 `POST /giving/donate/webhook/:provider?churchId=…`（`DonateController.webhook`）。处理故意幂等：

1. **验证** -- `GatewayService.verifyWebhook` 委托给提供商的签名检查；失败的签名返回 401。不需要处理的事件用 200 短路。
2. **Dedup 事件** -- `EventLogRepo.loadByProviderId` 跳过已在 `eventLogs` 中记录的 webhook。
3. **Dedup 捐款** -- 在创建任何东西之前，`DonationRepo.loadByTransactionId` 被检查对每个候选 id 有效载荷可能携带。这吸收复制交付、多阶段 ACH 事件（待处理 → 结算）和 `/donate/charge` 已乐观记录礼物的情况。
4. **应用** -- 提供商的 `classifyWebhookEvent(eventType)` 说事件意味着什么（`donation` 待处理/完成、`cancel-subscription` 或 `ignore`）；完成的付款创建 `complete` 捐款（或晋升现有 `pending` 或 `failed`），ACH 风格事件落作为 `pending` 直到结算，失败的订阅发票（Stripe `invoice.payment_failed`）创建 `failed` 捐款键控在发票 id，并且取消事件删除本地 `subscriptions` 行。控制器永不检查提供商特定事件名称。

### 失败的定期礼物和催款

`failed` 捐款是恢复的工作单位。`GET /giving/donations/failed` 列出他们带最新的网关失败消息从 `eventLogs` 和来自网关功能的 `canRetry` 旗；`POST /giving/donate/retry/:donationId` 调用提供商的 `retryFailedPayment`（Stripe 支付开放发票），结果 webhook 通过正常 dedup 路径晋升行到 `complete`。催款电子邮件在第 0 天从 webhook 处理程序转到捐赠者，然后从 `DunningHelper.run` 在午夜计时器（在 `lambda/timer-handler.ts` 和 `RailwayCron.ts` 中连接）在第 3 和 7 天；每个发送记录在 `eventLogs` 作为 `provider: "dunning"`、`providerId: "<donationId>:<day>"`，所以重新运行永不电子邮件两次。当 Stripe 放弃并取消订阅（`customer.subscription.deleted` 带 `cancellation_details.reason: "payment_failed"`）时，`DunningHelper.notifyCanceled` 电子邮件捐赠者一次（`providerId: "<subscriptionId>:canceled"`）；捐赠者或管理员启动取消保持沉默。Stripe 永不添加事件到现有端点：改变 `StripeHelper.webhookEvents` 后，要么重新保存网关要么对产品运行 `tools/manual/stripe-webhook-events.ts`（默认干运行，`--apply` 写）。

提供商带 `logsDonationsImmediately`（PayPal、Kingdom Funding、Paystack）从 `/charge` 响应记录他们的电荷（没有 webhook 往返路需要对快乐路），而 Stripe 依赖 `payment_intent.succeeded` / `invoice.paid` 和 ACH `payment_intent.processing`。费用处理（`POST /giving/donate/fee`、`payFees` 网关旗和每个提供商的 `calculateFees`）计算"覆盖费用"毛利在捐赠者端 -- B1 接受无平台削减，所以无应用费永不添加。

:::info
电荷和 webhook 路径写相同 `donations` / `fundDonations` 行。`transactionId` 是保持乐观电荷日志和其后面 webhook 的联接键，不为一份礼物生产两个捐款。
:::

## 相关页面

- [奉献端点](../api/endpoints/giving) -- 捐款、基金、批次、网关、订阅、支付方法和 webhooks 的完整 REST 表面
- [AppHelper](../shared-libraries/app-helper) -- npm 包，运送支付提供商注册和捐款组件
- [模块结构](../api/module-structure) -- GivingApi 模块如何在服务器端组织
