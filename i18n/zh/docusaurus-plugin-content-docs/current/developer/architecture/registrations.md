---
title: "活动报名"
---

# 活动报名

<div class="article-intro">

原生活动报名功能位于内容模块中，并且自付费报名版本推出后，具备完整的商业功能：带价格的参与者类型、带价格的附加选项、折扣码、通过教会现有的奉献网关收款，以及由状态驱动的候补名单。资金通道有意复用奉献技术栈——报名控制器通过与[奉献](./giving)中描述的相同的 `GatewayService` / `IGatewayProvider` 抽象进行扣款，因此内容模块中不包含任何卡片数据或网关 SDK 相关的知识。本页梳理了数据模型、定价与容量规则，以及报名、付款和候补名单的流程。

</div>

## 概览

```
┌──────────────────────────────┐            ┌─────────────────────────────────────────────┐
│ B1App（成员门户）              │            │ Api —— content 模块                         │
│  报名向导 ·                    │   HTTPS    │  RegistrationController                     │
│  我的报名                      │ ─────────▶ │   /content/registrations                    │
├──────────────────────────────┤            │  RegistrationPricingHelper（服务端定价）      │
│ B1Admin（工作人员）             │            │  RegistrationHelper（邮件）                  │
│  活动报名设置                   │            └───────────────┬─────────────────────────────┘
│  · 名单 · CSV 导出              │                            │ processCharge
└──────────────────────────────┘                            ▼
                                            ┌─────────────────────────────────────────────┐
                                            │ 共享网关抽象（giving）                        │
                                            │  GatewayService → IGatewayProvider          │
                                            │  Stripe · PayPal · Kingdom Funding          │
                                            └─────────────────────────────────────────────┘
```

整个技术栈遵循三条规则：

1. **价格由服务端决定。** 客户端提交类型 ID、选项 ID 和数量；`RegistrationPricingHelper.computeTotal()` 在服务端计算总额，优惠券在扣款时会重新校验。客户端提交的金额永远不被信任。
2. **容量在插入时原子性地强制执行。** 每一次受容量限制的插入都使用 `INSERT … SELECT … FROM dual WHERE (有效记录数) < capacity` 语句，因此两个同时进行的报名不可能都抢到最后一个名额。计数由状态推导得出，从不单独存储。
3. **付款走奉献通道。** `RegistrationController` 使用教会配置的网关调用共享的 `GatewayService.processCharge`——与奉献使用相同的服务商抽象、令牌化模型和 SCA 处理。

## 数据模型（`Api/src/modules/content`）

模型位于 `models/Registration.ts`；数据表映射位于 `db/DatabaseTypes.ts`；每张数据表在 `repositories/` 下都有一个对应的仓储。

| 数据表 | 含义 | 关键字段 |
|-------|---------|-----------|
| `registrations` | 一条报名（某活动的一个家庭/团体） | eventId、personId、householdId、**status**（`pending` / `confirmed` / `waitlisted` / `cancelled`）、totalAmount、amountPaid、couponId、waitlistNotifiedDate、registeredDate、cancelledDate |
| `registrationMembers` | 某条报名中的一位参与者 | registrationId、personId、firstName、lastName、**registrationTypeId** |
| `registrationTypes` | 每个活动的参与者类型（例如成人 / 儿童） | eventId、name、description、**price**、**capacity**、minAgeYears、maxAgeYears、formId、sort、active |
| `registrationSelections` | 带价格的附加选项（例如 T 恤） | eventId、name、description、**price**、**capacity**、**maxQuantity**（每条报名的上限）、sort、active |
| `registrationSelectionChoices` | 某条报名/某位成员所选的某项附加选项的数量 | registrationId、registrationMemberId、selectionId、**quantity** |
| `registrationPayments` | 对某条报名的一次成功扣款 | registrationId、gatewayId、provider、transactionId、method、amount、currency、kind（`charge`）、status（`succeeded`）、personId |
| `registrationCoupons` | 每个活动的折扣码 | eventId、code、**discountType**（`percent` / `amount`）、**value**、startDate、endDate、**minMembers**、**maxUses**、active |

说明：

- **没有候补名单表。** 候补的团体就是 `status = 'waitlisted'` 的 `registrations` 行；整个候补生命周期就是该表上的状态转换。
- **没有存储计数器。** "已售"/"已使用"的数量（活动容量、各类型容量、各选项容量、优惠券使用次数）都通过对状态属于 `('pending','confirmed')` 的记录进行相关子查询计算得出（`RegistrationTypeRepo.loadActiveWithUsage`、`RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`）。因此，取消一条报名会释放容量，无需任何额外的记账操作。
- 价格为 MySQL 的 DECIMAL 列（在传输中为字符串），在定价辅助函数内部通过 `Number()` 转换。

## REST 接口

所有接口都位于 `/content/registrations` 下（`controllers/RegistrationController.ts`），由 `Permissions.registrations`（`view` / `edit`）控制访问：

| 路由 | 访问方式 | 用途 |
|-------|--------|---------|
| `POST /register` | 匿名 | 完整提交：访客、会员，或工作人员的"添加参与者"；服务端定价、容量检查、可选扣款 |
| `GET /types/event/:eventId`、`GET /selections/event/:eventId` | 公开 | 为向导提供带有推导出的 `used` / `remainingCapacity` 的类型/选项 |
| `POST /types`、`DELETE /types/:id`（`/selections`、`/coupons` 同理） | `registrations.edit` | 工作人员设置的增删改查 |
| `POST /coupons/validate` | 公开 | 向导中的优惠码即时校验 |
| `GET /coupons/event/:eventId` | 工作人员 | 带使用次数统计的优惠券 |
| `GET /event/:eventId` · `GET /event/:eventId/count` | 工作人员 · 公开 | 名单；用于容量显示的有效计数 |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | 已授权 | 我的报名、详情、付款记录 |
| `PUT /:id` | 所有者/工作人员 | 提交后的编辑——以新的原子容量检查替换参与者和选项选择，并重新计算 `totalAmount`；从不自动扣款或退款 |
| `POST /:id/pay` | 所有者 | "完成付款"：扣除 `totalAmount − amountPaid`，并将 `waitlisted`/`pending` 转为 `confirmed` |
| `POST /:id/promote` | 工作人员 | 手动候补转正 |
| `POST /:id/cancel` · `DELETE /:id` | 所有者 · 工作人员 | 取消 / 删除；两者都会触发候补自动转正 |

同一人员（`personId`）在同一活动上若已存在未取消的报名，将被以 409 拒绝；每一条新建的报名都会通过 `WebhookDispatcher` 触发一个 `registration.created` webhook。

## 定价与优惠码

`helpers/RegistrationPricingHelper.ts` 是唯一的金额计算权威：

- `computeTotal()` 将每位参与者的类型价格，加上每项选项选择的 `价格 × 数量`，进行求和。
- `validateCoupon()` 会检查：是否启用、日期范围（`startDate`/`endDate`）、提交的团体人数是否满足 `minMembers`，以及基于状态推导出的兑换次数是否未超过 `maxUses`。
- `applyDiscount()`——`percent` 减去 `总额 × value/100`；`amount` 减去 `value`；两者结果均不低于零。

向导会调用 `POST /coupons/validate` 以提供即时反馈，但 `register` 会在服务端重新校验并重新应用优惠券——客户端显示的总额仅供参考。

## 原子容量惯用法

每一次受容量限制的插入，都通过将容量检查直接放入 `INSERT` 语句中，在无需事务或锁的情况下安全地处理竞争。活动级别（`RegistrationRepo.atomicInsertWithCapacityCheck`）：

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

受影响行数为零即表示"已满"。同样的惯用法也用于保护按类型插入（`RegistrationMemberRepo.atomicInsertWithTypeCapacity`，统计与有效报名关联的成员）以及按选项数量插入（`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`，使用 `COALESCE(SUM(quantity),0) + ? <= capacity`）。如果在报名过程中某个成员或选项插入失败，控制器会通过 `deleteCascade()` 回滚部分报名，并报告哪个类型或选项已售罄。

## 付款流程 {#payment-flow}

`processRegistrationCharge`（位于控制器中）是报名唯一涉及资金的地方，它只是奉献技术栈的一个薄客户端：

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  （Stripe / PayPal / Kingdom Funding）
```

令牌化与奉献完全一致，发生在浏览器中（参见[奉献](./giving)）——向导复用了 apphelper 的支付 provider 注册表，因此已登录的会员可以使用已保存的银行卡付款，访客则令牌化一张新卡。控制器会镜像 `DonateController` 的服务商特殊处理（Kingdom Funding 的 `pm-{id}` 支付方式 ID，以及 Stripe 的 SCA `requires_action` 响应——这些响应会返回给客户端，且不记录付款）。扣款成功时，会写入一行 `registrationPayments`，增加 `amountPaid`，并确认报名。**退款功能尚未实现**——被取消的付费报名会保留其付款记录，任何退款都需在网关控制台中另行处理。

两个入口都走相同的代码路径：`register`（报名时付款）和 `pay`（支付余额 / 完成候补）。

`register` 在以下两种情况下会跳过扣款，并将报名保存为 `pending`，`amountPaid = 0`，全部金额作为待付余额：

- **工作人员"添加参与者"。** 请求体携带的 `personId` 不是调用者本人，没有 `guestInfo`，并且调用者在该教会中拥有 `registrations.edit` 权限。该人员必须存在（否则返回 404），绕过家庭成员过滤，并且不会扣款。
- **没有网关。** 教会没有奉献网关（由 `gateway.loadAll` 检查 `hasGateway`）。B1App 的付款步骤会显示 **Register and Pay Later**（报名并稍后付款），而不是银行卡表单。

访客（没有 `au.id`）的付费报名必须携带来自 `POST /giving/donate/captcha-verify` 的 `captchaPass`。`CaptchaPass.verify`（现位于 `shared/helpers`）会在扣款前立即运行，因此候补和免费报名不受影响。当 `CAPTCHA_ENFORCE=true` 且通行证缺失或无效时，新建的报名会通过 `deleteCascade()` 回滚，并返回 403。B1App 的 `RegistrationPaymentForm` 会向访客显示 reCAPTCHA 复选框，并在保存银行卡和提交报名时一并发送通行证。

## 候补名单生命周期

当活动已满且活动的 `waitlistEnabled` 标志开启时，`register` 会将该团体保存为 `waitlisted`（跳过容量检查），并发送标注为候补名额的常规确认邮件。候补转正有三种途径——`cancel`、`delete` 以及工作人员的 `promote` 接口——都汇入 `RegistrationRepo.promoteFromWaitlist`，它会选取最早的候补记录，并以原子方式将其翻转：

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…该活动的有效计数…) < ?
```

`status='waitlisted'` 的守卫条件确保并发的转正不会重复转正同一行，而容量子查询则保证转正不会导致超售。转正的记录会落在 `pending` 而非 `confirmed` 状态，因为可能仍有余额未付；`RegistrationHelper.sendWaitlistAvailabilityEmail` 会通知报名人其名额已空出，并且当 `totalAmount − amountPaid > 0` 时，附上指向教会 B1 `/mobile/registrations` 页面（我的报名）的链接，该链接由 `B1AppRoot` 和教会子域名构建。付款（或无余额）后即确认报名。

:::info
仅提高容量并不会自动转正——工作人员需要在提高容量后，使用名单中的"转正（Promote）"操作。取消和删除操作则会自动转正。
:::

## 客户端界面

- **B1App 向导** —— 同一个 hook `B1App/src/components/registration/useEventRegistration.ts` 同时驱动网站组件（`components/registration/EventRegister.tsx`）和移动端门户页面（`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`），步骤依次为 `info → members → selections → questions → payment → confirm`（中间的步骤仅在活动设有选项、附加了表单或总额不为零时才会显示）。信息和成员步骤会显示每种参与者类型的选择器，并附带实时剩余容量和售罄状态；付款步骤（`RegistrationPaymentForm.tsx`）会显示订单摘要、优惠码输入，并且对于已登录的会员，会通过 apphelper 的 provider 注册表显示已保存的支付方式，访客则令牌化一张新卡。**报名（Registrations）**移动端页面（`screens/RegistrationsPage.tsx`）即"我的报名"：显示状态、待付余额、完成付款（`POST /:id/pay`）、编辑（`PUT /:id`——联系人、成员类型、选项数量）以及取消。
- **B1Admin 设置** —— `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` 添加了 Enable Waitlist（启用候补名单）开关，以及参与者类型、选项和优惠码（`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`）的折叠面板，全部通过 `/types`、`/selections`、`/coupons` 路由进行增删改查。
- **B1Admin 名单** —— `B1Admin/src/registrations/RegistrationDetailsPage.tsx`：每位参与者的类型列、已付/总额列（附余额标签）、每种类型的人数标签、付款详情对话框（`RegistrationDetailDialog.tsx`，数据来自 `GET /payments/:registrationId`）、候补的"转正"行操作，以及包含参与者类型、选项、已付/总额/余额和问题答案的 CSV 导出。

跨模块查询（解析或创建访客人员、加载教会以发送邮件）都通过 `getMembershipModuleGateway()` 进行——内容模块从不直接读取会员数据表。

## 相关页面

- [奉献](./giving) —— 本功能复用的网关抽象、provider 注册表和令牌化模型
- [内容端点](../api/endpoints/content) —— 内容模块的 REST 接口
- [Webhooks](../api/webhooks) —— `registration.created` 事件
- [模块结构](../api/module-structure) —— 内容模块在服务端的组织方式
