---
title: "Giving 端点"
---

# Giving 端点

<div class="article-intro">

Giving 模块负责管理奉献、基金、支付处理、订阅以及相关的财务操作。它支持多种支付网关（Stripe、PayPal），处理一次性和定期奉献，跟踪奉献批次，并为异步支付事件提供 webhook 处理。

</div>

**基础路径：** `/giving`

## 奉献

基础路径：`/giving/donations`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View 或本人 personId | 列出所有奉献。可按 `?batchId=` 或 `?personId=` 筛选。使用 `?personId=` 时，捐给不可免税基金的奉献会被排除（与奉献报表一致），除非具有 Donations.View 权限的调用者添加 `&includeNonDeductible=1`，B1Admin 的人员档案即会这样做 |
| GET | `/:id` | JWT | Donations.View | 按 ID 获取奉献 |
| GET | `/my` | JWT | — | 获取当前用户的奉献 |
| GET | `/my/summary?year=` | JWT | — | 当前用户某一年的奉献总额（默认为今年）：`{ year, total, count, currency, isConverted }`，金额已转换为教会货币。用于会员首页的奉献预览 |
| GET | `/?startDate=&endDate=` | JWT | Donations.View | 日期在范围内（含首尾）的奉献。两个日期均为必填，格式为 `YYYY-MM-DD`，否则返回 `400`。B1Admin 的奉献报表页面以这种方式请求一个日历年的数据，而不是教会的全部历史记录 |
| GET | `/summary` | JWT | Donations.ViewSummary | 获取奉献汇总。可按 `?startDate=&endDate=&type=` 筛选。使用 `type=person` 可获取按人员的明细 |
| GET | `/testEmail` | 公开 | — | 发送测试电子邮件（用于开发/调试） |
| POST | `/` | JWT | Donations.Edit 或 Donations.Enter | 创建或更新奉献（批量）。仅具有 Donations.Enter 时，目标批次以及（更新时）奉献当前所在的批次都必须处于开启状态，并且网关奉献（带有 `transactionId` 的）不可更改；否则返回 `403 { "error": "This batch is closed." }` |
| DELETE | `/:id` | JWT | Donations.Edit 或 Donations.Enter | 删除奉献。仅具有 Donations.Enter 时：奉献必须位于开启的批次中，且不能是网关奉献，否则返回 `403` |

### 示例：按批次列出奉献

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

### 示例：获取奉献汇总

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

## 奉献批次 {#donation-batches}

基础路径：`/giving/donationbatches`

继承 `GenericCrudController`，提供 CRUD 路由：`getById`、`getAll`、`post`、`delete`。删除操作也会移除批次中的所有奉献。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary 或 Donations.Enter | 列出所有奉献批次 |
| GET | `/:id` | JWT | Donations.ViewSummary 或 Donations.Enter | 按 ID 获取奉献批次 |
| POST | `/` | JWT | Donations.Edit 或 Donations.Enter | 创建或更新奉献批次。仅具有 Donations.Enter 时：更新现有批次需要该批次处于开启状态，否则返回 `403 { "error": "This batch is closed." }`。此处会忽略 `status`，因此保存批次无法重新开启它 |
| POST | `/:id/close` | JWT | Donations.Edit | 关闭批次：将 `status` 设为 `closed`，`closedDate` 设为当前时间，`closedBy` 设为调用者的用户 ID。返回该批次 |
| POST | `/:id/reopen` | JWT | Donations.Edit | 重新开启批次：将 `status` 设为 `open`，并清除 `closedDate` 和 `closedBy`。返回该批次 |
| DELETE | `/:id` | JWT | Donations.Edit | 删除批次及其所有奉献 |

每个批次包含 `status`（`open` 或 `closed`；新建批次和已有批次默认为 `open`）、`closedDate` 和 `closedBy`。Donations.Edit 可以更改任何批次中的奉献；Donations.Enter（在角色编辑器中显示为 **Enter Donations**）只能在其批次开启时添加、更改或删除奉献及基金分配。

## 奉献页面（Donate）

基础路径：`/giving/donate`

处理面向公众的奉献流程，包括收费、订阅、webhook 和费用计算。未启用基础 CRUD 路由；所有端点均为自定义端点。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | 公开 | — | 获取某教会可用的支付网关（仅公钥） |
| POST | `/client-token` | JWT | — | 生成用于初始化网关的客户端令牌 |
| POST | `/create-order` | JWT | — | 创建支付订单（PayPal 风格的结账） |
| POST | `/charge` | JWT | — | 处理一次性奉献收费 |
| POST | `/subscribe` | JWT | — | 创建定期奉献订阅 |
| POST | `/log` | 公开 | — | 记录一笔奉献。请求体：`{ donation, fundData }` |
| POST | `/webhook/:provider` | 公开 | — | 接收支付 webhook 事件（Stripe、PayPal）。需要 `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | 重放某日期范围内的 Stripe 事件。请求体：`{ startDate, endDate, dryRun }` |
| POST | `/fee` | 公开 | — | 计算交易费用。请求体：`{ type, provider, gatewayId, amount, currency }`。需要 `?churchId=` |
| POST | `/captcha-verify` | 公开 | — | 验证 reCAPTCHA 令牌。请求体：`{ token }` |

### 示例：处理奉献收费

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

继承 `GenericCrudController`，提供 CRUD 路由：`getById`、`getAll`、`post`、`delete`。`view` 权限为 `null`（查看基金无需权限）。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 列出所有基金 |
| GET | `/:id` | JWT | — | 按 ID 获取基金 |
| GET | `/churchId/:churchId` | 公开 | — | 获取某教会的所有基金（公开） |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | 公开 | — | 获取某基金的奉献总额：`{ fundId, totalAmount, donationCount }`。为网站构建器的 `campaignProgress` 元素提供数据 |
| POST | `/` | JWT | Donations.Edit | 创建或更新基金 |
| DELETE | `/:id` | JWT | Donations.Edit | 删除基金 |

## 基金奉献

基础路径：`/giving/funddonations`

跟踪每笔奉献如何分配到各基金。未启用基础 CRUD 路由；所有端点均为自定义端点。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | 列出基金奉献。可按 `?donationId=`、`?personId=`、`?fundId=` 或 `?fundName=` 筛选。可选添加 `?startDate=&endDate=` 进行日期筛选 |
| GET | `/:id` | JWT | Donations.View | 按 ID 获取基金奉献 |
| GET | `/my` | JWT | — | 获取当前用户的基金奉献 |
| POST | `/` | JWT | Donations.Edit 或 Donations.Enter | 创建或更新基金奉献（批量）。仅具有 Donations.Enter 时：其所属的奉献必须位于开启的批次中且不能是网关奉献，否则返回 `403` |
| DELETE | `/:id` | JWT | Donations.Edit 或 Donations.Enter | 删除基金奉献。对 Donations.Enter 适用相同的开启批次规则 |

## 网关

基础路径：`/giving/gateways`

管理支付网关配置（Stripe、PayPal 等）。未启用基础 CRUD 路由；所有端点均为自定义端点。网关密钥在存储时会加密。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 列出教会的所有网关 |
| GET | `/:id` | JWT | Settings.Edit | 按 ID 获取网关 |
| GET | `/churchId/:churchId` | 公开 | — | 获取某教会的网关（仅公钥） |
| GET | `/configured/:churchId` | 公开 | — | 检查某教会是否已配置支付网关 |
| POST | `/` | JWT | Settings.Edit | 创建或更新网关（加密密钥，并配置 webhook 和产品） |
| PATCH | `/:id` | JWT | Settings.Edit | 部分更新网关 |
| DELETE | `/:id` | JWT | Settings.Edit | 删除网关（同时移除其 webhook） |

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

继承 `GenericCrudController`，提供 CRUD 路由：`getAll`、`delete`。将人员与其支付网关客户记录关联。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | 列出所有客户 |
| GET | `/:id` | JWT | Donations.ViewSummary 或本人记录 | 按 ID 获取客户 |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary 或本人记录 | 获取某客户在网关中的订阅 |
| DELETE | `/:id` | JWT | Donations.Edit | 删除客户 |

## 订阅

基础路径：`/giving/subscriptions`

管理定期奉献订阅。未启用基础 CRUD 路由；所有端点均为自定义端点。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | 列出所有订阅 |
| GET | `/:id` | JWT | Donations.ViewSummary | 按 ID 获取订阅 |
| POST | `/` | JWT | Donations.Edit 或本人订阅 | 在支付网关中更新订阅 |
| DELETE | `/:id` | JWT | Donations.Edit 或本人订阅 | 取消订阅并从数据库中删除。请求体：`{ provider, reason }` |

## 订阅基金

基础路径：`/giving/subscriptionfunds`

跟踪定期订阅的基金分配。未启用基础 CRUD 路由；所有端点均为自定义端点。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View 或本人订阅 | 列出订阅基金。可按 `?subscriptionId=` 筛选 |
| GET | `/:id` | JWT | Donations.ViewSummary | 按 ID 获取订阅基金 |
| DELETE | `/:id` | JWT | Donations.Edit | 删除订阅基金 |
| DELETE | `/subscription/:id` | JWT | Donations.Edit 或本人订阅 | 删除某订阅的所有基金 |

## 支付方式

基础路径：`/giving/paymentmethods`

通过支付网关 API 管理已保存的支付方式（银行卡、银行账户）。未启用基础 CRUD 路由；所有端点均为自定义端点。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View 或本人 personId | 获取某人员所有已保存的支付方式（银行卡、银行账户） |
| POST | `/addcard` | JWT | — | 绑定银行卡支付方式。请求体：`{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit 或本人 personId | 更新银行卡信息。请求体：`{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit 或本人 personId | 创建用于绑定银行账户的 Stripe ACH SetupIntent。请求体：`{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | 公开 | — | 为匿名奉献者创建 ACH SetupIntent。请求体：`{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit 或本人 personId | 通过令牌添加银行账户（已弃用；请使用 `ach-setup-intent`）。请求体：`{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit 或本人 personId | 更新银行账户信息。请求体：`{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit 或本人客户 | 通过小额试验存款验证银行账户。请求体：`{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit 或本人客户 | 删除支付方式（银行卡或银行账户） |

## 事件日志

基础路径：`/giving/eventLog`

继承 `GenericCrudController`，提供 CRUD 路由：`getById`、`getAll`、`post`、`delete`。跟踪支付网关 webhook 事件，用于审计和去重。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | 列出所有事件日志 |
| GET | `/:id` | JWT | Donations.ViewSummary | 按 ID 获取事件日志 |
| GET | `/type/:type` | JWT | Donations.ViewSummary | 按事件类型筛选获取事件日志 |
| POST | `/` | JWT | Donations.Edit | 创建或更新事件日志 |
| DELETE | `/:id` | JWT | Donations.Edit | 删除事件日志 |

## 相关页面

- [Membership 端点](./membership) — 人员、教会、小组、角色和权限
- [认证与权限](./authentication) — 登录流程、JWT、OAuth、权限模型
- [模块结构](../module-structure) — 代码组织模式
