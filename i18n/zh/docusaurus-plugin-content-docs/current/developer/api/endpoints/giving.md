---
title: "捐赠端点"
---

# 捐赠端点

<div class="article-intro">

捐赠模块管理捐款、基金、支付处理、订阅和相关的财务操作。它支持多个支付网关（Stripe、PayPal），处理一次性和定期捐款，跟踪捐款批次，并提供异步支付事件的 Webhook 处理。

</div>

**基础路径：** `/giving`

## 捐款

基础路径：`/giving/donations`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View 或自己的 personId | 列出所有捐款。按 `?batchId=` 或 `?personId=` 过滤 |
| GET | `/:id` | JWT | Donations.View | 按 ID 获取捐款 |
| GET | `/my` | JWT | — | 获取当前用户的捐款 |
| GET | `/summary` | JWT | Donations.ViewSummary | 获取捐款汇总。按 `?startDate=&endDate=&type=` 过滤。使用 `type=person` 获取按人员细分 |
| GET | `/testEmail` | 公开 | — | 发送测试邮件（开发/调试） |
| POST | `/` | JWT | Donations.Edit | 创建或更新捐款（批量） |
| DELETE | `/:id` | JWT | Donations.Edit | 删除捐款 |

### 示例：按批次列出捐款

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

### 示例：获取捐款汇总

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

## 捐款批次

基础路径：`/giving/donationbatches`

继承 `GenericCrudController`，带有 CRUD 路由：`getById`、`getAll`、`post`、`delete`。删除操作同时移除批次内的所有捐款。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | 列出所有捐款批次 |
| GET | `/:id` | JWT | Donations.ViewSummary | 按 ID 获取捐款批次 |
| POST | `/` | JWT | Donations.Edit | 创建或更新捐款批次 |
| DELETE | `/:id` | JWT | Donations.Edit | 删除批次及其所有捐款 |

## 捐赠

基础路径：`/giving/donate`

处理面向公众的捐赠流程，包括收费、订阅、Webhook 和手续费计算。未启用基础 CRUD 路由；所有端点都是自定义的。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | 公开 | — | 获取教会的可用支付网关（仅公钥） |
| POST | `/client-token` | JWT | — | 生成网关初始化的客户端令牌 |
| POST | `/create-order` | JWT | — | 创建支付订单（PayPal 风格结账） |
| POST | `/charge` | JWT | — | 处理一次性捐款收费 |
| POST | `/subscribe` | JWT | — | 创建定期捐款订阅 |
| POST | `/log` | 公开 | — | 记录捐款。请求体：`{ donation, fundData }` |
| POST | `/webhook/:provider` | 公开 | — | 接收支付 Webhook 事件（Stripe、PayPal）。需要 `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | 重放日期范围内的 Stripe 事件。请求体：`{ startDate, endDate, dryRun }` |
| POST | `/fee` | 公开 | — | 计算交易手续费。请求体：`{ type, provider, gatewayId, amount, currency }`。需要 `?churchId=` |
| POST | `/captcha-verify` | 公开 | — | 验证 reCAPTCHA 令牌。请求体：`{ token }` |

### 示例：处理捐款收费

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

基础路径：`/giving/funds`

继承 `GenericCrudController`，带有 CRUD 路由：`getById`、`getAll`、`post`、`delete`。`view` 权限为 `null`（查看基金无需权限）。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 列出所有基金 |
| GET | `/:id` | JWT | — | 按 ID 获取基金 |
| GET | `/churchId/:churchId` | 公开 | — | 获取特定教会的所有基金（公开） |
| POST | `/` | JWT | Donations.Edit | 创建或更新基金 |
| DELETE | `/:id` | JWT | Donations.Edit | 删除基金 |

## 基金捐款

基础路径：`/giving/funddonations`

跟踪单笔捐款如何在不同基金间分配。未启用基础 CRUD 路由；所有端点都是自定义的。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | 列出基金捐款。按 `?donationId=`、`?personId=`、`?fundId=` 或 `?fundName=` 过滤。可选添加 `?startDate=&endDate=` 进行日期过滤 |
| GET | `/:id` | JWT | Donations.View | 按 ID 获取基金捐款 |
| GET | `/my` | JWT | — | 获取当前用户的基金捐款 |
| POST | `/` | JWT | Donations.Edit | 创建或更新基金捐款（批量） |
| DELETE | `/:id` | JWT | Donations.Edit | 删除基金捐款 |

## 网关

基础路径：`/giving/gateways`

管理支付网关配置（Stripe、PayPal 等）。未启用基础 CRUD 路由；所有端点都是自定义的。网关密钥静态加密存储。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 列出教会的所有网关 |
| GET | `/:id` | JWT | Settings.Edit | 按 ID 获取网关 |
| GET | `/churchId/:churchId` | 公开 | — | 获取教会的网关（仅公钥） |
| GET | `/configured/:churchId` | 公开 | — | 检查教会是否已配置支付网关 |
| POST | `/` | JWT | Settings.Edit | 创建或更新网关（加密密钥，配置 Webhook 和产品） |
| PATCH | `/:id` | JWT | Settings.Edit | 部分更新网关 |
| DELETE | `/:id` | JWT | Settings.Edit | 删除网关（同时移除其 Webhook） |

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

基础路径：`/giving/customers`

继承 `GenericCrudController`，带有 CRUD 路由：`getAll`、`delete`。将人员与其支付网关客户记录关联。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | 列出所有客户 |
| GET | `/:id` | JWT | Donations.ViewSummary 或自己的记录 | 按 ID 获取客户 |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary 或自己的记录 | 获取客户的网关订阅 |
| DELETE | `/:id` | JWT | Donations.Edit | 删除客户 |

## 订阅

基础路径：`/giving/subscriptions`

管理定期捐款订阅。未启用基础 CRUD 路由；所有端点都是自定义的。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | 列出所有订阅 |
| GET | `/:id` | JWT | Donations.ViewSummary | 按 ID 获取订阅 |
| POST | `/` | JWT | Donations.Edit 或自己的订阅 | 更新支付网关的订阅 |
| DELETE | `/:id` | JWT | Donations.Edit 或自己的订阅 | 取消订阅并从数据库中移除。请求体：`{ provider, reason }` |

## 订阅基金

基础路径：`/giving/subscriptionfunds`

跟踪定期订阅的基金分配。未启用基础 CRUD 路由；所有端点都是自定义的。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View 或自己的订阅 | 列出订阅基金。按 `?subscriptionId=` 过滤 |
| GET | `/:id` | JWT | Donations.ViewSummary | 按 ID 获取订阅基金 |
| DELETE | `/:id` | JWT | Donations.Edit | 删除订阅基金 |
| DELETE | `/subscription/:id` | JWT | Donations.Edit 或自己的订阅 | 删除某订阅的所有基金 |

## 支付方式

基础路径：`/giving/paymentmethods`

通过支付网关 API 管理存储的支付方式（银行卡、银行账户）。未启用基础 CRUD 路由；所有端点都是自定义的。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View 或自己的 personId | 获取某人所有存储的支付方式（银行卡、银行账户） |
| POST | `/addcard` | JWT | — | 添加银行卡支付方式。请求体：`{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit 或自己的 personId | 更新银行卡详情。请求体：`{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit 或自己的 personId | 创建 Stripe ACH SetupIntent 以关联银行账户。请求体：`{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | 公开 | — | 为匿名捐款创建匿名 ACH SetupIntent。请求体：`{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit 或自己的 personId | 通过令牌添加银行账户（已弃用；请使用 `ach-setup-intent`）。请求体：`{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit 或自己的 personId | 更新银行账户详情。请求体：`{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit 或自己的客户 | 通过微额存款验证银行账户。请求体：`{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit 或自己的客户 | 删除支付方式（银行卡或银行账户） |

## 事件日志

基础路径：`/giving/eventLog`

继承 `GenericCrudController`，带有 CRUD 路由：`getById`、`getAll`、`post`、`delete`。跟踪支付网关 Webhook 事件，用于审计和去重。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | 列出所有事件日志 |
| GET | `/:id` | JWT | Donations.ViewSummary | 按 ID 获取事件日志 |
| GET | `/type/:type` | JWT | Donations.ViewSummary | 按事件类型过滤获取事件日志 |
| POST | `/` | JWT | Donations.Edit | 创建或更新事件日志 |
| DELETE | `/:id` | JWT | Donations.Edit | 删除事件日志 |

## 相关页面

- [成员管理端点](./membership) — 人员、教会、群组、角色和权限
- [认证与权限](./authentication) — 登录流程、JWT、OAuth、权限模型
- [模块结构](../module-structure) — 代码组织模式
