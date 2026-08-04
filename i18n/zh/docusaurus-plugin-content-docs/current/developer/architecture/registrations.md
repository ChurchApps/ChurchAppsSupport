---
title: "活动报名"
---

# 活动报名

<div class="article-intro">

原生的活动报名功能位于 content 模块中，自付费报名功能上线以来，它已具备完整的商业模型：带价格的参会者类型、带价格的附加选项、折扣码、通过教会现有捐赠网关完成的付款，以及基于状态驱动的候补名单。资金路径特意复用了捐赠技术栈——报名控制器通过[捐赠](./giving)一文所记录的同一套 `GatewayService` / `IGatewayProvider` 抽象完成扣款，因此 content 模块中不存在任何银行卡数据或网关 SDK 相关知识。本页面梳理数据模型、定价与容量规则，以及报名、付款和候补名单流程。

</div>

## 概览

```
┌──────────────────────────────┐            ┌─────────────────────────────────────────────┐
│ B1App (member portal)        │            │ Api — content module                        │
│  registration wizard ·       │   HTTPS    │  RegistrationController                     │
│  My Registrations            │ ─────────▶ │   /content/registrations                    │
├──────────────────────────────┤            │  RegistrationPricingHelper (server pricing) │
│ B1Admin (staff)              │            │  RegistrationHelper (emails)                │
│  event registration settings │            └───────────────┬─────────────────────────────┘
│  · roster · CSV export       │                            │ processCharge
└──────────────────────────────┘                            ▼
                                            ┌─────────────────────────────────────────────┐
                                            │ shared gateway abstraction (giving)         │
                                            │  GatewayService → IGatewayProvider          │
                                            │  Stripe · PayPal · Kingdom Funding          │
                                            └─────────────────────────────────────────────┘
```

以下三条规则贯穿整个技术栈：

1. **价格由服务器掌控。**客户端只提交类型 ID、选项 ID 和数量；`RegistrationPricingHelper.computeTotal()` 在服务器端计算总价，优惠券也会在扣款时重新校验。客户端提交的金额永远不会被信任。
2. **容量在插入时原子性地强制执行。**每一次受容量限制的插入都使用 `INSERT … SELECT … FROM dual WHERE (count of active rows) < capacity` 语句，因此两个同时进行的报名不可能同时抢到最后一个名额。计数是根据状态（`pending`/`confirmed`）动态推算的，从不单独存储。
3. **付款走捐赠通道。**`RegistrationController` 使用教会配置的网关调用共享的 `GatewayService.processCharge`——与捐赠功能相同的服务商抽象层、令牌化模型和 SCA 处理流程。

## 数据模型（`Api/src/modules/content`）

模型位于 `models/Registration.ts`；表映射位于 `db/DatabaseTypes.ts`；每张表在 `repositories/` 下有对应的仓储。

| 表 | 含义 | 关键字段 |
|-------|---------|-----------|
| `registrations` | 一条报名记录（一个家庭/团体针对一场活动的报名） | eventId、personId、householdId、**status**（`pending` / `confirmed` / `waitlisted` / `cancelled`）、totalAmount、amountPaid、couponId、waitlistNotifiedDate、registeredDate、cancelledDate |
| `registrationMembers` | 一条报名记录中的一位参会者 | registrationId、personId、firstName、lastName、**registrationTypeId** |
| `registrationTypes` | 每场活动的参会者类型（例如成人/儿童） | eventId、name、description、**price**、**capacity**、minAgeYears、maxAgeYears、formId、sort、active |
| `registrationSelections` | 带价格的具名附加选项（例如 T 恤） | eventId、name、description、**price**、**capacity**、**maxQuantity**（单次报名的上限）、sort、active |
| `registrationSelectionChoices` | 一条报名/一位参会者所选某个选项的数量 | registrationId、registrationMemberId、selectionId、**quantity** |
| `registrationPayments` | 针对一条报名记录的一次成功扣款 | registrationId、gatewayId、provider、transactionId、method、amount、currency、kind（`charge`）、status（`succeeded`）、personId |
| `registrationCoupons` | 每场活动的折扣码 | eventId、code、**discountType**（`percent` / `amount`）、**value**、startDate、endDate、**minMembers**、**maxUses**、active |

说明：

- **没有单独的候补名单表。**候补中的团体就是 `status = 'waitlisted'` 的 `registrations` 行；整个候补名单的生命周期都体现为这一张表上的状态迁移。
- **没有存储的计数器。**“已售出”/“已使用”计数（活动容量、按类型容量、按选项容量、优惠券使用次数）都是通过对状态在 `('pending','confirmed')` 范围内的行做相关子查询实时计算出来的（`RegistrationTypeRepo.loadActiveWithUsage`、`RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`）。因此取消一条报名记录会立即释放容量，无需任何簿记操作。
- 价格字段是 MySQL 的 DECIMAL 列（在网络传输中为字符串），在定价辅助类内部用 `Number()` 强制转换。

## REST 接口

全部位于 `/content/registrations` 下（`controllers/RegistrationController.ts`），由 `Permissions.registrations`（`view` / `edit`）控制访问：

| 路由 | 访问权限 | 用途 |
|-------|--------|---------|
| `POST /register` | 匿名 | 完整提交：访客或会员，服务器端定价，容量检查，可选扣款 |
| `GET /types/event/:eventId`、`GET /selections/event/:eventId` | 公开 | 带派生出的 `used` / `remainingCapacity` 的类型/选项数据，供报名向导使用 |
| `POST /types`、`DELETE /types/:id`（`/selections`、`/coupons` 同理） | `registrations.edit` | 工作人员设置的增删改查 |
| `POST /coupons/validate` | 公开 | 报名向导中的内联折扣码校验 |
| `GET /coupons/event/:eventId` | 工作人员 | 带使用次数统计的优惠券列表 |
| `GET /event/:eventId` · `GET /event/:eventId/count` | 工作人员 · 公开 | 名册；用于容量显示的有效计数 |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | 已认证 | 我的报名记录、详情、付款历史 |
| `PUT /:id` | 报名者本人/工作人员 | 提交后编辑——用全新的原子性容量检查替换参会者与选项数据，重新计算 `totalAmount`；从不自动扣款或退款 |
| `POST /:id/pay` | 报名者本人 | “完成付款”：扣除 `totalAmount − amountPaid`，将 `waitlisted`/`pending` 状态转为 `confirmed` |
| `POST /:id/promote` | 工作人员 | 手动候补名单晋升 |
| `POST /:id/cancel` · `DELETE /:id` | 报名者本人 · 工作人员 | 取消/删除；两者都会触发候补名单自动晋升 |

同一 `personId` 对同一活动已存在未取消的报名记录时会以 409 拒绝，每条新建的报名记录都会通过 `WebhookDispatcher` 发出一个 `registration.created` Webhook 事件。

## 定价与折扣码

`helpers/RegistrationPricingHelper.ts` 是唯一的金额计算权威：

- `computeTotal()` 汇总每位参会者的类型价格，加上每个所选选项的 `price × quantity`。
- `validateCoupon()` 校验有效标志、日期窗口（`startDate`/`endDate`）、`minMembers`（对照提交的团体规模）以及 `maxUses`（对照根据状态推算出的兑换次数）。
- `applyDiscount()` —— `percent` 减去 `total × value/100`；`amount` 减去 `value`；两者最低都为零。

报名向导会调用 `POST /coupons/validate` 获取即时反馈，但 `register` 端点会在服务器端重新校验并重新应用优惠券——客户端显示的总价仅供参考。

## 原子性容量惯用法

每一次受容量限制的插入操作，都通过把容量检查纳入 `INSERT` 语句本身来实现无需事务或锁的安全并发。活动级别（`RegistrationRepo.atomicInsertWithCapacityCheck`）：

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

零受影响行意味着“已达容量上限”。同样的惯用法也用于保护按类型的插入（`RegistrationMemberRepo.atomicInsertWithTypeCapacity`，统计关联到有效报名记录的参会者）以及按选项的数量（`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`，使用 `COALESCE(SUM(quantity),0) + ? <= capacity`）。当任何参会者或选项插入在报名过程中途失败时，控制器会用 `deleteCascade()` 回滚这部分报名记录，并报告哪个类型或选项已经售罄。

## 付款流程

控制器中的 `processRegistrationCharge` 是报名功能唯一涉及资金的地方，它只是捐赠技术栈的一个薄客户端：

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

令牌化在浏览器中进行，与捐赠功能完全一致（参见[捐赠](./giving)）——报名向导复用了 apphelper 的支付服务商注册表，因此已登录会员可以使用已保存的银行卡，访客则会对新银行卡进行令牌化。控制器沿用了 `DonateController` 处理各服务商差异的方式（Kingdom Funding 的 `pm-{id}` 支付方式 ID、Stripe 的 SCA `requires_action` 响应会原样返回给客户端而不记录付款）。一次成功的扣款会写入一条 `registrationPayments` 记录、增加 `amountPaid`，并确认该条报名记录。**退款功能尚未实现**——已付款报名记录被取消后仍保留其付款记录，任何退款都需在网关控制台中线下处理。

两个入口都走同一条代码路径：`register`（报名时付款）和 `pay`（余款支付/候补名单转正付款）。

## 候补名单生命周期

当活动已满且活动的 `waitlistEnabled` 标志开启时，`register` 会将该团体保存为 `waitlisted`（跳过容量检查），并发送标注为候补名额的常规确认邮件。晋升有三种触发方式——`cancel`、`delete` 和工作人员的 `promote` 端点——三者都汇入 `RegistrationRepo.promoteFromWaitlist`，该函数选取最早的候补记录并原子性地翻转其状态：

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…active count for the event…) < ?
```

`status='waitlisted'` 这一防护条件意味着并发晋升不会重复晋升同一行记录，容量子查询则意味着晋升不会导致超卖。晋升后的记录进入 `pending`——而非 `confirmed`——因为可能仍有余款未付；`RegistrationHelper.sendWaitlistAvailabilityEmail` 会告知报名者名额已开放，并且在 `totalAmount − amountPaid > 0` 时附上完成付款页面的链接。付款完成（或本就没有余款）后即确认报名。

:::info
提高容量本身不会自动晋升候补名单——工作人员需要在提高容量后使用名册中的“晋升”操作。取消和删除操作会自动晋升。
:::

## 客户端界面

- **B1App 报名向导** —— 一个共享的钩子 `B1App/src/components/registration/useEventRegistration.ts`，同时驱动网站组件（`components/registration/EventRegister.tsx`）和移动端门户页面（`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`），流程分为 `info → members → selections → questions → payment → confirm` 几个步骤（中间几步仅在活动带有选项、关联表单或非零总价时才渲染）。信息/参会者步骤展示带实时剩余容量与售罄状态的按参会者类型选择器；付款步骤（`RegistrationPaymentForm.tsx`）展示订单摘要、折扣码输入，以及——对已登录会员——通过 apphelper 服务商注册表提供的已保存支付方式，访客则对新银行卡进行令牌化。**Registrations** 移动端页面（`screens/RegistrationsPage.tsx`）就是“我的报名记录”：状态、应付余额、完成付款（`POST /:id/pay`）、编辑（`PUT /:id` —— 联系方式、参会者类型、选项数量）和取消。
- **B1Admin 设置** —— `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` 添加了“启用候补名单”开关，以及参会者类型、附加选项和折扣码的手风琴面板（`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`），均对 `/types`、`/selections`、`/coupons` 路由执行增删改查。
- **B1Admin 名册** —— `B1Admin/src/registrations/RegistrationDetailsPage.tsx`：按参会者显示的类型列、带余额芯片的已付/总额列、按类型的计数芯片、付款详情对话框（`RegistrationDetailDialog.tsx`，数据来自 `GET /payments/:registrationId`）、候补名单晋升的行内操作，以及包含参会者类型、附加选项、已付/总额/余额和问题答案的 CSV 导出。

跨模块查询（解析或创建访客的人员记录、为邮件加载教会信息）都通过 `getMembershipModuleGateway()` 完成——content 模块从不直接读取 membership 模块的表。

## 相关页面

- [捐赠](./giving) —— 本功能所复用的网关抽象、服务商注册表和令牌化模型
- [Content 端点](../api/endpoints/content) —— content 模块的 REST 接口
- [Webhook](../api/webhooks) —— `registration.created` 事件
- [模块结构](../api/module-structure) —— content 模块在服务器端的组织方式
