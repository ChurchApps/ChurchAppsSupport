---
title: "捐赠端点"
---

# 捐赠端点

<div class="article-intro">

捐赠模块管理捐赠、基金、支付处理、订阅和相关的财务操作。它支持多个支付网关（Stripe、PayPal），处理一次性和定期捐赠，跟踪捐赠批处理，并为异步支付事件提供 webhook 处理。

</div>

**基本路径：** `/giving`

## 捐赠

基本路径：`/giving/donations`

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View or own personId | 列出所有捐赠。按 `?batchId=` 或 `?personId=` 筛选 |
| GET | `/:id` | JWT | Donations.View | 按 ID 获取捐赠 |
| GET | `/my` | JWT | — | 获取当前用户的捐赠 |
| GET | `/summary` | JWT | Donations.ViewSummary | 获取捐赠摘要。按 `?startDate=&endDate=&type=` 筛选。使用 `type=person` 获得人员细分 |
| GET | `/testEmail` | Public | — | 发送测试电子邮件（开发/调试） |
| POST | `/` | JWT | Donations.Edit | 创建或更新捐赠（批处理） |
| DELETE | `/:id` | JWT | Donations.Edit | 删除捐赠 |

### 示例：按批处理列出捐赠

```
GET /giving/donations?batchId=abc-123
Authorization: Bearer <token>
```

```json
[
  {
    "id": "don-456",
    "batchId": "abc-123",
    "personId": "per-789",
    "donationDate": "2025-03-15T00:00:00.000Z",
    "amount": 100.00,
    "method": "card"
  }
]
```

### 示例：获取捐赠摘要

```
GET /giving/donations/summary?startDate=2025-01-01&endDate=2025-12-31
Authorization: Bearer <token>
```

```json
[
  {
    "week": "2025-01-06",
    "fund": "General Fund",
    "totalAmount": 2500.00,
    "count": 15
  }
]
```

## 捐赠批处理

基本路径：`/giving/donationbatches`

扩展 `GenericCrudController`，带有 CRUD 路由：`getById`、`getAll`、`post`、`delete`。删除操作也会删除批处理中的所有捐赠。

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | 列出所有捐赠批处理 |
| GET | `/:id` | JWT | Donations.ViewSummary | 按 ID 获取捐赠批处理 |
| POST | `/` | JWT | Donations.Edit | 创建或更新捐赠批处理 |
| DELETE | `/:id` | JWT | Donations.Edit | 删除批处理及其所有捐赠 |

## 捐赠

基本路径：`/giving/donate`

处理公开面向的捐赠流程，包括费用、订阅、webhooks 和费用计算。不启用基础 CRUD 路由；所有端点都是自定义的。

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Public | — | 获取教会的可用支付网关（仅公开密钥） |
| POST | `/client-token` | JWT | — | 生成用于网关初始化的客户端令牌 |
| POST | `/create-order` | JWT | — | 创建支付订单（PayPal 风格的结账） |
| POST | `/charge` | JWT | — | 处理一次性捐赠费用 |
| POST | `/subscribe` | JWT | — | 创建定期捐赠订阅 |
| POST | `/log` | Public | — | 记录捐赠。正文：`{ donation, fundData }` |
| POST | `/webhook/:provider` | Public | — | 接收支付 webhook 事件（Stripe、PayPal）。需要 `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | 重播日期范围内的 Stripe 事件。正文：`{ startDate, endDate, dryRun }` |
| POST | `/fee` | Public | — | 计算交易费用。正文：`{ type, provider, gatewayId, amount, currency }`。需要 `?churchId=` |
| POST | `/captcha-verify` | Public | — | 验证 reCAPTCHA 令牌。正文：`{ token }` |

### 示例：处理捐赠费用

```
POST /giving/donate/charge
Authorization: Bearer <token>

{
  "provider": "stripe",
  "amount": 50.00,
  "currency": "usd",
  "person": { "id": "per-123", "email": "donor@example.com" },
  "funds": [{ "id": "fund-001", "name": "General Fund", "amount": 50.00 }],
  "church": { "name": "First Church", "subDomain": "firstchurch" }
}
```

```json
{
  "id": "ch_abc123",
  "status": "succeeded",
  "provider": "stripe"
}
```

### 示例：创建定期订阅

```
POST /giving/donate/subscribe
Authorization: Bearer <token>

{
  "provider": "stripe",
  "amount": 100.00,
  "customerId": "cus_abc123",
  "interval": { "interval_count": 1, "interval": "month" },
  "billing_cycle_anchor": 1710460800,
  "person": { "id": "per-123", "email": "donor@example.com" },
  "funds": [{ "id": "fund-001", "name": "General Fund", "amount": 100.00 }],
  "church": { "name": "First Church", "subDomain": "firstchurch" }
}
```

```json
{
  "id": "sub_xyz789",
  "status": "active",
  "provider": "stripe"
}
```

## 基金

基本路径：`/giving/funds`

扩展 `GenericCrudController`，带有 CRUD 路由：`getById`、`getAll`、`post`、`delete`。`view` 权限是 `null`（查看基金不需要权限）。

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 列出所有基金 |
| GET | `/:id` | JWT | — | 按 ID 获取基金 |
| GET | `/churchId/:churchId` | Public | — | 获取特定教会的所有基金（公开） |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Public | — | 获取基金的捐赠总计：`{ fundId, totalAmount, donationCount }`。为网站构建器的 `campaignProgress` 元素提供支持 |
| POST | `/` | JWT | Donations.Edit | 创建或更新基金 |
| DELETE | `/:id` | JWT | Donations.Edit | 删除基金 |

## 基金捐赠

基本路径：`/giving/funddonations`

跟踪单个捐赠如何分配到基金。不启用基础 CRUD 路由；所有端点都是自定义的。

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | 列出基金捐赠。按 `?donationId=`、`?personId=`、`?fundId=` 或 `?fundName=` 筛选。可选添加 `?startDate=&endDate=` 以筛选日期 |
| GET | `/:id` | JWT | Donations.View | 按 ID 获取基金捐赠 |
| GET | `/my` | JWT | — | 获取当前用户的基金捐赠 |
| POST | `/` | JWT | Donations.Edit | 创建或更新基金捐赠（批处理） |
| DELETE | `/:id` | JWT | Donations.Edit | 删除基金捐赠 |

## 网关

基本路径：`/giving/gateways`

管理支付网关配置（Stripe、PayPal 等）。不启用基础 CRUD 路由；所有端点都是自定义的。网关机密在静止时加密。

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 列出教会的所有网关 |
| GET | `/:id` | JWT | Settings.Edit | 按 ID 获取网关 |
| GET | `/churchId/:churchId` | Public | — | 获取教会的网关（仅公开密钥） |
| GET | `/configured/:churchId` | Public | — | 检查教会是否有配置的支付网关 |
| POST | `/` | JWT | Settings.Edit | 创建或更新网关（加密密钥、配置 webhooks 和产品） |
| PATCH | `/:id` | JWT | Settings.Edit | 部分更新网关 |
| DELETE | `/:id` | JWT | Settings.Edit | 删除网关（也删除其 webhooks） |

### 示例：检查网关配置

```
GET /giving/gateways/configured/church-123
```

```json
{
  "configured": true
}
```

## 客户

基本路径：`/giving/customers`

扩展 `GenericCrudController`，带有 CRUD 路由：`getAll`、`delete`。将人员链接到其支付网关客户记录。

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | 列出所有客户 |
| GET | `/:id` | JWT | Donations.ViewSummary or own record | 按 ID 获取客户 |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary or own record | 获取客户的网关订阅 |
| DELETE | `/:id` | JWT | Donations.Edit | 删除客户 |

## 订阅

基本路径：`/giving/subscriptions`

管理定期捐赠订阅。不启用基础 CRUD 路由；所有端点都是自定义的。

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | 列出所有订阅 |
| GET | `/:id` | JWT | Donations.ViewSummary | 按 ID 获取订阅 |
| POST | `/` | JWT | Donations.Edit or own subscription | 使用支付网关更新订阅 |
| DELETE | `/:id` | JWT | Donations.Edit or own subscription | 取消订阅并从数据库中删除。正文：`{ provider, reason }` |

## 订阅基金

基本路径：`/giving/subscriptionfunds`

跟踪定期订阅的基金分配。不启用基础 CRUD 路由；所有端点都是自定义的。

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View or own subscription | 列出订阅基金。按 `?subscriptionId=` 筛选 |
| GET | `/:id` | JWT | Donations.ViewSummary | 按 ID 获取订阅基金 |
| DELETE | `/:id` | JWT | Donations.Edit | 删除订阅基金 |
| DELETE | `/subscription/:id` | JWT | Donations.Edit or own subscription | 删除订阅的所有基金 |

## 支付方法

基本路径：`/giving/paymentmethods`

管理存储的支付方法（卡、银行账户）通过支付网关 API。不启用基础 CRUD 路由；所有端点都是自定义的。

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View or own personId | 获取人员的所有存储支付方法（卡、银行账户） |
| POST | `/addcard` | JWT | — | 附加卡支付方法。正文：`{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit or own personId | 更新卡详细信息。正文：`{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit or own personId | 创建 Stripe ACH SetupIntent 用于银行账户关联。正文：`{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Public | — | 为来宾捐赠创建匿名 ACH SetupIntent。正文：`{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit or own personId | 通过令牌添加银行账户（已弃用；使用 `ach-setup-intent`）。正文：`{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit or own personId | 更新银行账户详细信息。正文：`{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit or own customer | 使用微收费验证银行账户。正文：`{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit or own customer | 删除支付方法（卡或银行账户） |

## 事件日志

基本路径：`/giving/eventLog`

扩展 `GenericCrudController`，带有 CRUD 路由：`getById`、`getAll`、`post`、`delete`。跟踪支付网关 webhook 事件以进行审计和重复删除。

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | 列出所有事件日志 |
| GET | `/:id` | JWT | Donations.ViewSummary | 按 ID 获取事件日志 |
| GET | `/type/:type` | JWT | Donations.ViewSummary | 获取按事件类型筛选的事件日志 |
| POST | `/` | JWT | Donations.Edit | 创建或更新事件日志 |
| DELETE | `/:id` | JWT | Donations.Edit | 删除事件日志 |

## 相关页面

- [成员端点](./membership) — 人员、教会、小组、角色和权限
- [验证和权限](./authentication) — 登录流、JWT、OAuth、权限模型
- [模块结构](../module-structure) — 代码组织模式
