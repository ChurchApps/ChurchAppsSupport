---
title: "赠与架构"
---

# 赠与架构

<div class="article-intro">

ChurchApps在网关轨道模型上运行捐赠：教会保留自己的Stripe（或PayPal或Kingdom Funding）账户，B1从不作为平台处理器坐在资金路径中。卡数据在浏览器中被标记化，永远不会到达ChurchApps服务器。此页面映射整个堆栈 — `@churchapps/apphelper`中的客户端提供商注册表、GivingApi网关抽象、捐赠数据模型以及网关webhook如何协调回到数据库。

</div>

## 概览

```
┌─────────────────────────────┐                   ┌───────────────────────────────────────┐
│  B1App / B1Admin（浏览器）  │                   │  支付网关                              │
│                             │                   │  (Stripe / PayPal / Kingdom Funding)  │
│  @churchapps/apphelper      │                   │                                       │
│  ┌───────────────────────┐  │ 在浏览器中的     │  Stripe Elements · KF标记器 ·         │
│  │ 支付提供商              │──┼──────────────────▶│  PayPal托管字段                       │
│  │ 注册表                  │  │◀─ 令牌/现时 ─│  (卡永不到达B1服务器)     │
│  │ getPaymentProvider()  │  │                   └──────────▲────────────────┬───────────┘
│  │ Stripe · PayPal · KF  │  │                              │                │
│  └──────────┬────────────┘  │                              │                │
└─────────────┼───────────────┘                              │                │
              │  POST /giving/donate/charge | /subscribe     │                │
              │  { token, amount, funds, person }            │                │
              ▼                            charge/subscribe  │                │ 签名webhook
┌─────────────────────────────────────────────┐ (秘钥) │                │ 事件
│  GivingApi — /giving模块                   │──────────────┘                │
│  DonateController → GatewayService          │                               │
│  → GatewayFactory → IGatewayProvider        │◀──────────────────────────────┘
│  donations · funds · subscriptions · …      │  POST /giving/donate/webhook/:provider
└─────────────────────┬───────────────────────┘
                      │  保存捐赠+fundDonations — 通过eventLogs/transactionId去重
                      ▼
                MySQL (giving模式)
```

三个原则在整个堆栈中保持：

1. **网关保存卡。**每个提供商的条目小部件在浏览器中标记化；API只接收令牌、现时或订单id。
2. **一个抽象，许多提供商。**浏览器从注册表解析`PaymentProvider`；服务器从工厂解析`IGatewayProvider`。两者都关键存储在网关记录上的相同标准化提供商名称。
3. **Webhook是结算的事实来源。**充电响应被乐观地记录，但网关的签名webhook是确认（或创建）完成捐赠的原因，两边都有等幂性保护。

## 客户端：支付提供商注册表（`@churchapps/apphelper`）

注册表住在`Packages/apphelper/src/donations/providers/`中，每个提供商的小部件和帮助器在其自己的子文件夹下（`providers/stripe/`、`providers/paypal/`、`providers/kingdomfunding/`） — `providers/`之外什么都不分支在提供商名称上。`PaymentProvider`（见`providers/types.ts`）捆绑一个网关的宿主应用需要的所有内容：`descriptor`（管理标签、支持的货币、费用字段、默认费率、仪表板/注册URL）、`capabilities`标志集（保存的卡、ACH、循环、内联新卡条目、保存-在-标记化隐含）、用于成员条目的React小部件（`MemberWrapper`/`MemberEntry`）、访客给予（`GuestForm`）、保存方法编辑（`MethodEditForm`）和表单问题支付（`FormPayment`），加上`buildChargeRequest(ctx, token)` — 充电有效负载形状与提供商不同的唯一地方。每个提供商的`MemberWrapper`从网关记录的公钥加载其自己的SDK，所以宿主应用永不导入网关SDK（B1App和B1Admin没有`@stripe/*`依赖）。`pickDefaultGateway(gateways, capability?)`集中一个教会的网关中的哪个表面应该使用。

`providers/registry.ts`保有内置件。它们由**值引用**，不通过模块副作用注册，所以打包工具的树摇动永不能丢弃注册：

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider]) builtins.set(p.key, p);
```

| 函数 | 目的 |
|----------|---------|
| `getPaymentProvider(name)` | 按标准化名称解析；回退到Stripe所以一个错误配置的提供商从不硬崩溃捐赠者表单 |
| `registerPaymentProvider(p)` | 在运行时注册一个额外提供商（用于宿主应用的自定义网关） |
| `listPaymentProviders()` | 枚举内置件+自定义 — 用于构建管理网关下拉菜单 |
| `hasPaymentProvider(name)` | 成员身份检查 |

**内置客户端提供商：Stripe、PayPal、Kingdom Funding。**B1App和B1Admin只*读*注册表（`getPaymentProvider`、`listPaymentProviders`）；两者都不调用`registerPaymentProvider` — 注册保持在apphelper内。

每个提供商标记化不同，但所有保持卡外B1：

| 提供商 | 条目小部件 | 返回到API的令牌 |
|----------|--------------|-----------------------|
| Stripe | Stripe`Elements``CardElement` → `stripe.createPaymentMethod(...)` | 支付方法id（`pm_…`）；通过财务连接/ACH SetupIntent的银行 |
| Kingdom Funding | 由网关公钥键入的托管标记器表单 | 单次使用现时 |
| PayPal | PayPal托管字段；通过`/donate/client-token` + `/donate/create-order`构建的服务器订单 | 捕获的订单id |

Stripe的`finalizeResult`在捐赠被认为完成之前在浏览器中运行3-D Secure / SCA（`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`）；共享表单只调用`provider.finalizeResult(result)`，不知道它做什么。

## 服务器端：网关抽象（GivingApi）

`/giving`模块（`Api/src/modules/giving`）暴露REST表面；网关管道住在`Api/src/shared/helpers`。`DonateController`从不直接与网关SDK交谈 — 它通过`GatewayService`，它从`GatewayFactory`解析正确的`IGatewayProvider`并交给它一个解密的`GatewayConfig`。

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() 解密 privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · …
```

`IGatewayProvider`（`shared/helpers/gateways/IGatewayProvider.ts`）是每个网关实现的合同 — webhook生命周期（`createWebhookEndpoint`、`verifyWebhookSignature`、`classifyWebhookEvent`）、支付（`prepareCharge`、`processCharge`、`prepareSubscription`、`createSubscription`、`finalizeSubscription`、`cancelSubscription`）、费用（`calculateFees`）、保存方法处理（`listNormalizedPaymentMethods`、`buildAttachOptions`、`buildLocalMethodRecord`、`deletePaymentMethod`、`verifyMethodOwnership`、`ownsPaymentMethodId`）以及可选的附加项（客户、订单、SetupIntents、事件回放）。每个提供商类声明其自己的`capabilities`矩阵（支持的货币、ACH、退款、订阅要求、交易限制） — `GatewayService.getProviderCapabilities(provider)`只读它 — 和诸如`logsDonationsImmediately`的标志不驱动控制器行为，在控制器中没有任何提供商名称条件。

**在`GatewayFactory`中注册的服务器提供商：**

| 提供商 | 可用性 |
|----------|-------------|
| Stripe | 总是开启 |
| PayPal | 总是开启 |
| Kingdom Funding | 总是开启 |
| Square | 通过`ENABLE_SQUARE`环境标志选择加入 |
| ePayMints | 通过`ENABLE_EPAYMINTS`环境标志选择加入 |

当`ENABLE_CUSTOM_GATEWAY_PROVIDERS`设置时，自定义提供商可以在运行时注册；`AbstractExperimentalGatewayProvider`是那些的基类。提供商名称不区分大小写匹配。

### 网关配置和秘密

管理员通过`POST /giving/gateways`（`GatewayController`）保存网关凭证。保存时控制器用`EncryptionHelper`加密私钥和webhook密钥，然后 — 在任何非localhost主机上 — 删除教会的现有webhook并提供一个新的指向`/giving/donate/webhook/{provider}?churchId=…`的。公开读取（`GET /giving/gateways/churchId/:churchId`、`/configured/:churchId`）仅返回公钥。

## 数据模型

giving模式（`Api/src/modules/giving/db/DatabaseTypes.ts`，模型在`models/`）是一个通过Kysely访问的MySQL模式：

| 表 | 角色 |
|-------|------|
| `gateways` | 按教会提供商配置：`provider`、`publicKey`、加密的`privateKey`/`webhookKey`、`productId`、`payFees`、`currency`、`settings`、`environment` |
| `funds` | 给予指定（`name`、`taxDeductible`、`productId`） |
| `donationBatches` | 用于条目/报告的分组（`name`、`batchDate`） |
| `donations` | 一个礼物：`batchId`、`personId`、`donationDate`、`amount`、`currency`、`method`、`status`（`pending`/`complete`/`failed`）、`transactionId` |
| `fundDonations` | 跨一个或多个基金分配捐赠（`donationId`、`fundId`、`amount`） |
| `subscriptions` | 循环礼物；`id`是网关的订阅id，链接到`personId`、`customerId`、`gatewayId` |
| `subscriptionFunds` | 循环礼物的基金分割 |
| `customers` | 将`personId`链接到其网关客户id，按`provider` |
| `gatewayPaymentMethods` | 保存的卡/银行：`customerId`、`externalId`、`methodType`、`displayName`、`metadata` |
| `eventLogs` | Webhook/事件审计线索和去重密钥（`provider`、`providerId`、`eventType`、`status`、`resolved`） |
| `campaigns` / `pledges` | 绑定到基金的承诺活动以及每个人承诺的金额 |

捐赠通过`fundDonations`跨基金分割 — 捐赠携带总额，每个`fundDonation`携带一个切片。`donations.currency`和`gateways.currency`携带ISO货币；每个提供商宣传其`supportedCurrencies`，金额用`CurrencyHelper.formatCurrencyWithLocale`格式化。

## 端到端流程

### 成员一次性和循环（B1App）

认证的捐赠屏幕（`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`）组成三个apphelper组件：`MultiGatewayDonationForm`、`PaymentMethods`和`RecurringDonations`。B1App进行周围的数据加载 — `GET /donations/my`、`/gateways`、`/paymentmethods/personid/:id`、`/customers/:id/subscriptions` — 并通过网关列表；解析的提供商从网关的公钥加载其自己的SDK。充电本身发生在apphelper内：解析的提供商标记化（新或保存的）方法，然后发布到`/giving/donate/charge`用于一次性礼物或`/giving/donate/subscribe`用于循环礼物。循环礼物创建`subscriptions`行加上`subscriptionFunds`并将时间表交给网关（Stripe订阅、PayPal计费计划或KF循环时间表）。

### 访客/匿名给予

公开捐赠页面（`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`）和"现在给予"面板呈现`NonAuthDonationWrapper`来自`@churchapps/apphelper/website`，它在提供商的`GuestForm`周围注入reCAPTCHA和网关的Elements上下文。访客获得无登录、无保存方法和无历史。流程获取`GET /giving/funds/churchId/:id`和`GET /giving/donate/gateways/:churchId`（仅公钥）、用`POST /giving/donate/captcha-verify`验证访客、在浏览器中标记化并发布到`/giving/donate/charge`（或`/subscribe`）。访客ACH使用匿名`POST /giving/paymentmethods/ach-setup-intent-anon`。

### 管理员记录和Stripe导入（B1Admin）

B1Admin捐赠部分（`B1Admin/src/donations/`）是财务团队工作的地方。批量条目（`components/BulkDonationEntry.tsx`）通过发布`/giving/donations`然后`/giving/funddonations` — 无网关涉及 — 记录现金/支票/实物礼物。基金、批次、活动和陈述每个映射到他们的`/giving/*` CRUD路由。成员风格捐赠面板（`B1Admin/src/donationComponents/`）重用与B1App相同的apphelper组件。

Stripe导入（`B1Admin/src/donations/StripeImportPage.tsx`）回填在B1之外进行的礼物：它使用`dryRun: true`用于预览调用`POST /giving/donate/replay-stripe-events`，然后`dryRun: false`导入。服务器列出日期范围的Stripe事件，跳过已记录的任何 — 首先通过`eventLogs`提供商id匹配，然后通过`DonationRepo.findMatchingDonation`（金额+日期+人）所以重新运行永不双导入。

## Webhook和协调

结算的支付和订阅状态变更到达`POST /giving/donate/webhook/:provider?churchId=…`（`DonateController.webhook`）。处理故意是等幂的：

1. **验证** — `GatewayService.verifyWebhook`委托给提供商的签名检查；失败的签名返回401。不需要处理的事件用200短路。
2. **去重事件** — `EventLogRepo.loadByProviderId`跳过`eventLogs`中已记录的webhook。
3. **去重捐赠** — 创建任何事物之前，检查`DonationRepo.loadByTransactionId`对抗有效负载可能携带的每个候选id。这吸收重复交付、多阶段ACH事件（待定→结算）以及`/donate/charge`已经乐观地记录了礼物的情况。
4. **应用** — 提供商的`classifyWebhookEvent(eventType)`说事件的含义（`donation`待定/完成、`cancel-subscription`或`ignore`）；完成的支付创建`complete`捐赠（或促进现有`pending`捐赠），ACH风格事件作为`pending`直到结算降落，取消事件删除本地`subscriptions`行。控制器从不检查提供商特定的事件名称。

具有`logsDonationsImmediately`的提供商（PayPal、Kingdom Funding）从`/charge`响应记录他们的充电（快乐路径无需webhook往返），而Stripe依赖`payment_intent.succeeded` / `invoice.paid`和ACH `payment_intent.processing`。费用处理（`POST /giving/donate/fee`、`payFees`网关标志和每个提供商的`calculateFees`）计算捐赠人方的"覆盖费用"总额 — B1采取无平台减少，所以永不添加应用费用。

:::info
充电和webhook路径写入相同的`donations` / `fundDonations`行。`transactionId`是保持一个乐观充电日志及其稍后webhook不为一个礼物产生两个捐赠的连接密钥。
:::

## 相关页面

- [赠与端点](../api/endpoints/giving) — 捐赠、基金、批次、网关、订阅、支付方法和webhook的完整REST表面
- [AppHelper](../shared-libraries/app-helper) — 发送支付提供商注册表和捐赠组件的npm包
- [模块结构](../api/module-structure) — GivingApi模块在服务器端如何组织
