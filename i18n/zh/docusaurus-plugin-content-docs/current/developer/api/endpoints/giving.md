---
title: "Giving 端点"
---

# Giving 端点

<div class="article-intro">

Giving 模块负责管理奉献、基金、支付处理、订阅以及相关的财务操作。它支持多种支付网关（Stripe、PayPal），处理一次性和定期奉献，追踪奉献批次，并为异步付款事件提供 webhook 处理。

</div>

**基础路径：** `/giving`

## 奉献

基础路径：`/giving/donations`

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View 或本人的 personId | 列出所有奉献。可按 `?batchId=` 或 `?personId=` 筛选。使用 `?personId=` 时，不可抵税基金的奉献会被排除（与奉献报表一致），除非具有 Donations.View 权限的调用者添加 `&includeNonDeductible=1`（B1Admin 的人员记录会这样做） |
| GET | `/:id` | JWT | Donations.View | 根据 ID 获取奉献 |
| GET | `/my` | JWT | — | 获取当前用户的奉献 |
| GET | `/my/summary?year=` | JWT | — | 当前用户某一年的奉献总额（默认为今年）：`{ year, total, count, currency, isConverted }`，金额已换算为教会货币。为成员主页上的奉献预览提供数据 |
| GET | `/?startDate=&endDate=` | JWT | Donations.View | 日期在范围内（含首尾）的奉献。两个日期均为必填，格式为 `YYYY-MM-DD`，否则返回 `400`。B1Admin 的奉献报表页面以此方式请求一个自然年，而不是整个教会的全部历史 |
| GET | `/summary` | JWT | Donations.ViewSummary | 获取奉献汇总。可按 `?startDate=&endDate=&type=` 筛选。使用 `type=person` 可按人员细分 |
| GET | `/testEmail` | Public | — | 发送测试邮件（用于开发/调试） |
| POST | `/` | JWT | Donations.Edit 或 Donations.Enter | 创建或更新奉献（批次）。仅具有 Donations.Enter 时，目标批次以及（更新时）奉献当前所属的批次都必须是开放的，且网关奉献（带有 `transactionId` 的）不可更改；否则返回 `403 { "error": "This batch is closed." }` |
| DELETE | `/:id` | JWT | Donations.Edit 或 Donations.Enter | 删除奉献。仅具有 Donations.Enter 时：奉献必须位于开放的批次中，且不能是网关奉献，否则返回 `403` |

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

继承 `GenericCrudController`，提供 CRUD 路由：`getById`、`getAll`、`post`、`delete`。删除操作也会删除批次内的所有奉献。

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary 或 Donations.Enter | 列出所有奉献批次 |
| GET | `/:id` | JWT | Donations.ViewSummary 或 Donations.Enter | 根据 ID 获取奉献批次 |
| POST | `/` | JWT | Donations.Edit 或 Donations.Enter | 创建或更新奉献批次。仅具有 Donations.Enter 时：更新已有批次需要该批次处于开放状态，否则返回 `403 { "error": "This batch is closed." }`。此处会忽略 `status`，因此保存批次无法将其重新开放 |
| POST | `/:id/close` | JWT | Donations.Edit | 关闭批次：将 `status` 设为 `closed`，`closedDate` 设为当前时间，`closedBy` 设为调用者的用户 ID。返回该批次 |
| POST | `/:id/reopen` | JWT | Donations.Edit | 重新开放批次：将 `status` 设为 `open`，并清除 `closedDate` 和 `closedBy`。返回该批次 |
| DELETE | `/:id` | JWT | Donations.Edit | 删除批次及其所有奉献 |

每个批次都包含 `status`（`open` 或 `closed`；新建批次和已有批次均为 `open`）、`closedDate` 和 `closedBy`。Donations.Edit 可以更改任何批次中的奉献；Donations.Enter（在角色编辑器中显示为 **Enter Donations**（录入奉献））只能在批次处于开放状态时添加、更改或删除奉献及基金拆分。

## 捐献（Donate）

基础路径：`/giving/donate`

处理面向公众的捐献流程，包括扣款、订阅、webhook 和手续费计算。此处未启用基础 CRUD 路由；所有端点均为自定义端点。

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Public | — | 获取某教会可用的支付网关（仅公钥） |
| POST | `/client-token` | JWT | — | 生成用于初始化网关的客户端令牌 |
| POST | `/create-order` | JWT | — | 创建支付订单（PayPal 风格的结账） |
| POST | `/charge` | JWT | — | 处理一次性奉献扣款 |
| POST | `/subscribe` | JWT | — | 创建定期奉献订阅 |
| POST | `/log` | Public | — | 记录一笔奉献。请求体：`{ donation, fundData }` |
| POST | `/webhook/:provider` | Public | — | 接收支付 webhook 事件（Stripe、PayPal）。需要 `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | 重放某日期范围内的 Stripe 事件。请求体：`{ startDate, endDate, dryRun }` |
| POST | `/fee` | Public | — | 计算交易手续费。请求体：`{ type, provider, gatewayId, amount, currency }`。需要 `?churchId=` |
| POST | `/captcha-verify` | Public | — | 验证 reCAPTCHA 令牌。请求体：`{ token, churchId? }`。通过人机验证时返回 `{ response: "human", pass }`，其中 `pass` 是一个有效期为 10 分钟的已签名访客奉献通行证（若发送了 `churchId`，则仅对该教会有效） |

当 API 以 `CAPTCHA_ENFORCE=true` 运行时，访客（未登录）调用 `/giving/donate/create-order`、`/charge`、`/subscribe`、`/giving/paymentmethods/addcard` 和 `/giving/paymentmethods/ach-setup-intent-anon`（以及访客的付费 `POST /content/registrations/register` 调用）时，请求体中必须包含该 `captchaPass`，否则将返回 403 `Captcha verification required`。由于 Stripe 访客流程会进行两次调用（先添加银行卡，再扣款），通行证在过期前可以重复使用。已登录的调用不受影响。`CAPTCHA_ENFORCE` 默认为 `false`；`@churchapps/apphelper` 的访客奉献表单会自动发送该通行证。

### 示例：处理一次性奉献扣款

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

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 列出所有基金 |
| GET | `/:id` | JWT | — | 根据 ID 获取基金 |
| GET | `/churchId/:churchId` | Public | — | 获取某教会的所有基金（公开） |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Public | — | 获取某基金的奉献总额：`{ fundId, totalAmount, donationCount }`。为网站构建器的 `campaignProgress` 元素提供数据 |
| POST | `/` | JWT | Donations.Edit | 创建或更新基金 |
| DELETE | `/:id` | JWT | Donations.Edit | 删除基金 |

## 基金奉献

基础路径：`/giving/funddonations`

追踪单笔奉献如何分配到各个基金。此处未启用基础 CRUD 路由；所有端点均为自定义端点。

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | 列出基金奉献。可按 `?donationId=`、`?personId=`、`?fundId=` 或 `?fundName=` 筛选。可选择添加 `?startDate=&endDate=` 进行日期筛选 |
| GET | `/:id` | JWT | Donations.View | 根据 ID 获取基金奉献 |
| GET | `/my` | JWT | — | 获取当前用户的基金奉献 |
| POST | `/` | JWT | Donations.Edit 或 Donations.Enter | 创建或更新基金奉献（批次）。仅具有 Donations.Enter 时：所属的父级奉献必须位于开放的批次中，且不能是网关奉献，否则返回 `403` |
| DELETE | `/:id` | JWT | Donations.Edit 或 Donations.Enter | 删除基金奉献。对于 Donations.Enter，适用相同的开放批次规则 |

## 网关

基础路径：`/giving/gateways`

管理支付网关配置（Stripe、PayPal 等）。此处未启用基础 CRUD 路由；所有端点均为自定义端点。网关密钥在存储时会被加密。

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 列出教会的所有网关 |
| GET | `/:id` | JWT | Settings.Edit | 根据 ID 获取网关 |
| GET | `/churchId/:churchId` | Public | — | 获取某教会的网关（仅公钥） |
| GET | `/configured/:churchId` | Public | — | 检查某教会是否已配置支付网关 |
| POST | `/` | JWT | Settings.Edit | 创建或更新网关（加密密钥，并配置 webhook 和产品） |
| PATCH | `/:id` | JWT | Settings.Edit | 部分更新网关 |
| DELETE | `/:id` | JWT | Settings.Edit | 删除网关（同时删除其 webhook） |

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

继承 `GenericCrudController`，提供 CRUD 路由：`getAll`、`delete`。将人员与其支付网关的客户记录相关联。

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | 列出所有客户 |
| GET | `/:id` | JWT | Donations.ViewSummary 或本人记录 | 根据 ID 获取客户 |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary 或本人记录 | 获取某客户在网关中的订阅 |
| DELETE | `/:id` | JWT | Donations.Edit | 删除客户 |

## 订阅

基础路径：`/giving/subscriptions`

管理定期奉献订阅。此处未启用基础 CRUD 路由；所有端点均为自定义端点。

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | 列出所有订阅 |
| GET | `/:id` | JWT | Donations.ViewSummary | 根据 ID 获取订阅 |
| POST | `/` | JWT | Donations.Edit 或本人订阅 | 在支付网关中更新订阅 |
| DELETE | `/:id` | JWT | Donations.Edit 或本人订阅 | 取消订阅并从数据库中删除。请求体：`{ provider, reason }` |

## 订阅基金

基础路径：`/giving/subscriptionfunds`

追踪定期订阅的基金分配。此处未启用基础 CRUD 路由；所有端点均为自定义端点。

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View 或本人订阅 | 列出订阅基金。可按 `?subscriptionId=` 筛选 |
| GET | `/:id` | JWT | Donations.ViewSummary | 根据 ID 获取订阅基金 |
| DELETE | `/:id` | JWT | Donations.Edit | 删除订阅基金 |
| DELETE | `/subscription/:id` | JWT | Donations.Edit 或本人订阅 | 删除某订阅的所有基金 |

## 付款方式

基础路径：`/giving/paymentmethods`

通过支付网关 API 管理已保存的付款方式（银行卡、银行账户）。此处未启用基础 CRUD 路由；所有端点均为自定义端点。

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View 或本人 personId | 获取某人已保存的所有付款方式（银行卡、银行账户） |
| POST | `/addcard` | JWT | — | 绑定银行卡付款方式。请求体：`{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit 或本人 personId | 更新银行卡信息。请求体：`{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit 或本人 personId | 为绑定银行账户创建 Stripe ACH SetupIntent。请求体：`{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Public | — | 为访客奉献创建匿名 ACH SetupIntent。请求体：`{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit 或本人 personId | 通过令牌添加银行账户（已弃用；请使用 `ach-setup-intent`）。请求体：`{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit 或本人 personId | 更新银行账户信息。请求体：`{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit 或本人客户 | 通过小额测试打款验证银行账户。请求体：`{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit 或本人客户 | 删除付款方式（银行卡或银行账户） |

## 事件日志

基础路径：`/giving/eventLog`

继承 `GenericCrudController`，提供 CRUD 路由：`getById`、`getAll`、`post`、`delete`。用于记录支付网关 webhook 事件，以便审计和去重。

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | 列出所有事件日志 |
| GET | `/:id` | JWT | Donations.ViewSummary | 根据 ID 获取事件日志 |
| GET | `/type/:type` | JWT | Donations.ViewSummary | 按事件类型获取事件日志 |
| POST | `/` | JWT | Donations.Edit | 创建或更新事件日志 |
| DELETE | `/:id` | JWT | Donations.Edit | 删除事件日志 |

## 相关页面

- [会员端点](./membership) —— 人员、教会、小组、角色和权限
- [身份验证与权限](./authentication) —— 登录流程、JWT、OAuth、权限模型
- [模块结构](../module-structure) —— 代码组织模式
