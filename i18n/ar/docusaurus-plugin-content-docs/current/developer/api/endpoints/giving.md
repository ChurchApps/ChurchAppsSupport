---
title: "نقاط نهاية العطاء"
description: "مرجع واجهة العطاء البرمجية في ChurchApps: التبرعات والدفعات والبوابات والاشتراكات وطرق الدفع، مع قواعد المصادقة والأذونات للمطورين."
---

# نقاط نهاية العطاء

<div class="article-intro">

تدير وحدة العطاء التبرعات والصناديق ومعالجة المدفوعات والاشتراكات والعمليات المالية ذات الصلة. تدعم بوابات دفع متعددة (Stripe وPayPal)، وتتعامل مع التبرعات لمرة واحدة والمتكررة، وتتتبع دفعات التبرعات، وتوفر معالجة لخطافات الويب (webhooks) لأحداث الدفع غير المتزامنة.

</div>

**المسار الأساسي:** `/giving`

## التبرعات

المسار الأساسي: `/giving/donations`

| الطريقة | المسار | المصادقة | الصلاحية | الوصف |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View أو personId الخاص به | عرض جميع التبرعات. التصفية باستخدام `?batchId=` أو `?personId=`. مع `?personId=`، تُستثنى الهدايا المخصصة لصناديق غير قابلة للخصم (كما في كشوف العطاء) ما لم يضف المستدعي الذي يملك Donations.View المعامل `&includeNonDeductible=1`، وهو ما يفعله سجل الشخص في B1Admin |
| GET | `/:id` | JWT | Donations.View | الحصول على تبرع بواسطة المعرف |
| GET | `/my` | JWT | — | الحصول على تبرعات المستخدم الحالي |
| GET | `/my/summary?year=` | JWT | — | إجمالي عطاء المستخدم الحالي لسنة معينة (افتراضياً السنة الحالية): `{ year, total, count, currency, isConverted }`، مع تحويل الإجماليات إلى عملة الكنيسة. يُغذي معاينة العطاء في الصفحة الرئيسية للعضو |
| GET | `/?startDate=&endDate=` | JWT | Donations.View | التبرعات المؤرخة ضمن النطاق (شاملاً). التاريخان مطلوبان بصيغة `YYYY-MM-DD`، وإلا فسيُرجع `400`. تطلب صفحات كشوف العطاء في B1Admin سنة تقويمية واحدة بهذه الطريقة بدلاً من السجل الكامل للكنيسة |
| GET | `/summary` | JWT | Donations.ViewSummary | الحصول على ملخص التبرعات. التصفية باستخدام `?startDate=&endDate=&type=`. استخدم `type=person` للحصول على تفصيل لكل شخص |
| GET | `/testEmail` | عام | — | إرسال بريد إلكتروني تجريبي (للتطوير والتصحيح) |
| POST | `/` | JWT | Donations.Edit أو Donations.Enter | إنشاء التبرعات أو تحديثها (دفعة). مع Donations.Enter فقط، يجب أن تكون الدفعة المستهدفة، وفي حالة التحديث، الدفعة الحالية للتبرع، مفتوحتين، ولا يمكن تغيير هدايا البوابة (تلك التي تحمل `transactionId`)؛ وإلا فسيُرجع `403 { "error": "This batch is closed." }` |
| DELETE | `/:id` | JWT | Donations.Edit أو Donations.Enter | حذف تبرع. مع Donations.Enter فقط: يجب أن يكون التبرع في دفعة مفتوحة وألا يكون هدية من البوابة، وإلا فسيُرجع `403` |

### مثال: عرض التبرعات حسب الدفعة

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

### مثال: الحصول على ملخص التبرعات

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

## دفعات التبرعات

المسار الأساسي: `/giving/donationbatches`

يمتد `GenericCrudController` مع مسارات CRUD: `getById` و`getAll` و`post` و`delete`. تقوم عملية الحذف أيضاً بإزالة جميع التبرعات ضمن الدفعة.

| الطريقة | المسار | المصادقة | الصلاحية | الوصف |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary أو Donations.Enter | عرض جميع دفعات التبرعات |
| GET | `/:id` | JWT | Donations.ViewSummary أو Donations.Enter | الحصول على دفعة تبرعات بواسطة المعرف |
| POST | `/` | JWT | Donations.Edit أو Donations.Enter | إنشاء دفعات التبرعات أو تحديثها. مع Donations.Enter فقط: تحديث دفعة موجودة يتطلب أن تكون مفتوحة، وإلا فسيُرجع `403 { "error": "This batch is closed." }`. يتم تجاهل `status` هنا، لذا لا يمكن حفظ دفعة لإعادة فتحها |
| POST | `/:id/close` | JWT | Donations.Edit | إغلاق دفعة: يضبط `status` على `closed`، و`closedDate` على الوقت الحالي، و`closedBy` على معرف مستخدم المستدعي. يُرجع الدفعة |
| POST | `/:id/reopen` | JWT | Donations.Edit | إعادة فتح دفعة: يضبط `status` على `open` ويمسح `closedDate` و`closedBy`. يُرجع الدفعة |
| DELETE | `/:id` | JWT | Donations.Edit | حذف دفعة وجميع تبرعاتها |

تتضمن كل دفعة `status` (`open` أو `closed`؛ الدفعات الجديدة والموجودة مسبقاً تكون `open`)، و`closedDate`، و`closedBy`. يمكن لـ Donations.Edit تغيير التبرعات في أي دفعة. أما Donations.Enter (ويظهر باسم **إدخال التبرعات** في محرر الأدوار) فيمكنه فقط إضافة التبرعات أو تغييرها أو حذفها، وكذلك تقسيمات الصناديق، ما دامت الدفعة مفتوحة.

## التبرع

المسار الأساسي: `/giving/donate`

يتعامل مع تدفق التبرع العام، بما في ذلك الرسوم والاشتراكات وخطافات الويب وحسابات الرسوم. لا توجد مسارات CRUD أساسية مفعّلة؛ جميع نقاط النهاية مخصصة.

| الطريقة | المسار | المصادقة | الصلاحية | الوصف |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | عام | — | الحصول على بوابات الدفع المتاحة لكنيسة (المفاتيح العامة فقط) |
| POST | `/client-token` | JWT | — | إنشاء رمز عميل لتهيئة البوابة |
| POST | `/create-order` | JWT | — | إنشاء طلب دفع (على طريقة PayPal للدفع) |
| POST | `/charge` | JWT | — | معالجة خصم تبرع لمرة واحدة |
| POST | `/subscribe` | JWT | — | إنشاء اشتراك تبرع متكرر |
| POST | `/log` | عام | — | تسجيل تبرع. الجسم: `{ donation, fundData }` |
| POST | `/webhook/:provider` | عام | — | استقبال أحداث خطاف الدفع (Stripe وPayPal). يتطلب `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | إعادة تشغيل أحداث Stripe لنطاق تاريخ. الجسم: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | عام | — | حساب رسوم المعاملات. الجسم: `{ type, provider, gatewayId, amount, currency }`. يتطلب `?churchId=` |
| POST | `/captcha-verify` | عام | — | التحقق من رمز reCAPTCHA. الجسم: `{ token, churchId? }`. الإجابة البشرية تُرجع `{ response: "human", pass }`، حيث `pass` هو تصريح عطاء للضيوف موقّع وصالح لمدة 10 دقائق (ولـ `churchId` فقط عند إرساله) |

عندما تعمل الواجهة البرمجية بالإعداد `CAPTCHA_ENFORCE=true`، يجب أن تتضمن الطلبات من الضيوف (غير المسجلين دخولهم) إلى `/giving/donate/create-order` و`/charge` و`/subscribe` و`/giving/paymentmethods/addcard` و`/giving/paymentmethods/ach-setup-intent-anon` (وطلبات `POST /content/registrations/register` للضيوف المسعّرة) هذا `captchaPass` في الجسم، وإلا فستُرجع 403 `Captcha verification required`. يمكن إعادة استخدام التصريح حتى تنتهي صلاحيته، لأن تدفق Stripe للضيوف يقوم بطلبين (إضافة البطاقة، ثم الخصم). لا تتأثر الطلبات من المستخدمين المسجلين دخولهم. القيمة الافتراضية لـ `CAPTCHA_ENFORCE` هي `false`؛ ونماذج العطاء للضيوف في `@churchapps/apphelper` ترسل التصريح تلقائياً.

### مثال: معالجة خصم تبرع

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

### مثال: إنشاء اشتراك متكرر

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

## الصناديق

المسار الأساسي: `/giving/funds`

يمتد `GenericCrudController` مع مسارات CRUD: `getById` و`getAll` و`post` و`delete`. الصلاحية `view` هي `null` (لا تُطلب صلاحية لعرض الصناديق).

| الطريقة | المسار | المصادقة | الصلاحية | الوصف |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | عرض جميع الصناديق |
| GET | `/:id` | JWT | — | الحصول على صندوق بواسطة المعرف |
| GET | `/churchId/:churchId` | عام | — | الحصول على جميع الصناديق لكنيسة معينة (عام) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | عام | — | الحصول على إجمالي تبرعات الصندوق: `{ fundId, totalAmount, donationCount }`. يُغذي عنصر `campaignProgress` في منشئ الموقع |
| POST | `/` | JWT | Donations.Edit | إنشاء الصناديق أو تحديثها |
| DELETE | `/:id` | JWT | Donations.Edit | حذف صندوق |

## تبرعات الصناديق

المسار الأساسي: `/giving/funddonations`

يتتبع كيفية توزيع التبرعات الفردية على الصناديق. لا توجد مسارات CRUD أساسية مفعّلة؛ جميع نقاط النهاية مخصصة.

| الطريقة | المسار | المصادقة | الصلاحية | الوصف |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | عرض تبرعات الصناديق. التصفية باستخدام `?donationId=` أو `?personId=` أو `?fundId=` أو `?fundName=`. يمكن اختيارياً إضافة `?startDate=&endDate=` للتصفية حسب التاريخ |
| GET | `/:id` | JWT | Donations.View | الحصول على تبرع صندوق بواسطة المعرف |
| GET | `/my` | JWT | — | الحصول على تبرعات صناديق المستخدم الحالي |
| POST | `/` | JWT | Donations.Edit أو Donations.Enter | إنشاء تبرعات الصناديق أو تحديثها (دفعة). مع Donations.Enter فقط: يجب أن يكون التبرع الأصلي في دفعة مفتوحة وألا يكون هدية من البوابة، وإلا فسيُرجع `403` |
| DELETE | `/:id` | JWT | Donations.Edit أو Donations.Enter | حذف تبرع صندوق. القاعدة نفسها للدفعات المفتوحة تنطبق على Donations.Enter |

## البوابات

المسار الأساسي: `/giving/gateways`

يدير إعدادات بوابات الدفع (Stripe وPayPal وغيرها). لا توجد مسارات CRUD أساسية مفعّلة؛ جميع نقاط النهاية مخصصة. تُشفَّر أسرار البوابات أثناء التخزين.

| الطريقة | المسار | المصادقة | الصلاحية | الوصف |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | عرض جميع البوابات للكنيسة |
| GET | `/:id` | JWT | Settings.Edit | الحصول على بوابة بواسطة المعرف |
| GET | `/churchId/:churchId` | عام | — | الحصول على البوابات لكنيسة (المفاتيح العامة فقط) |
| GET | `/configured/:churchId` | عام | — | التحقق مما إذا كانت الكنيسة قد أعدّت بوابة دفع |
| POST | `/` | JWT | Settings.Edit | إنشاء البوابات أو تحديثها (يشفّر المفاتيح ويجهّز خطافات الويب والمنتجات) |
| PATCH | `/:id` | JWT | Settings.Edit | تحديث جزئي لبوابة |
| DELETE | `/:id` | JWT | Settings.Edit | حذف بوابة (ويزيل خطافات الويب الخاصة بها أيضاً) |

### مثال: التحقق من إعداد البوابة

```
GET /giving/gateways/configured/church-123
```

```json
{
  "configured": true
}
```

## العملاء

المسار الأساسي: `/giving/customers`

يمتد `GenericCrudController` مع مسارات CRUD: `getAll` و`delete`. يربط الأشخاص بسجلات عملائهم في بوابة الدفع.

| الطريقة | المسار | المصادقة | الصلاحية | الوصف |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | عرض جميع العملاء |
| GET | `/:id` | JWT | Donations.ViewSummary أو السجل الخاص به | الحصول على عميل بواسطة المعرف |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary أو السجل الخاص به | الحصول على اشتراكات البوابة لعميل |
| DELETE | `/:id` | JWT | Donations.Edit | حذف عميل |

## الاشتراكات

المسار الأساسي: `/giving/subscriptions`

يدير اشتراكات التبرعات المتكررة. لا توجد مسارات CRUD أساسية مفعّلة؛ جميع نقاط النهاية مخصصة.

| الطريقة | المسار | المصادقة | الصلاحية | الوصف |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | عرض جميع الاشتراكات |
| GET | `/:id` | JWT | Donations.ViewSummary | الحصول على اشتراك بواسطة المعرف |
| POST | `/` | JWT | Donations.Edit أو الاشتراك الخاص به | تحديث الاشتراكات مع بوابة الدفع |
| DELETE | `/:id` | JWT | Donations.Edit أو الاشتراك الخاص به | إلغاء اشتراك وإزالته من قاعدة البيانات. الجسم: `{ provider, reason }` |

## صناديق الاشتراكات

المسار الأساسي: `/giving/subscriptionfunds`

يتتبع توزيعات الصناديق للاشتراكات المتكررة. لا توجد مسارات CRUD أساسية مفعّلة؛ جميع نقاط النهاية مخصصة.

| الطريقة | المسار | المصادقة | الصلاحية | الوصف |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View أو الاشتراك الخاص به | عرض صناديق الاشتراكات. التصفية باستخدام `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | الحصول على صندوق اشتراك بواسطة المعرف |
| DELETE | `/:id` | JWT | Donations.Edit | حذف صندوق اشتراك |
| DELETE | `/subscription/:id` | JWT | Donations.Edit أو الاشتراك الخاص به | حذف جميع الصناديق لاشتراك |

## طرق الدفع

المسار الأساسي: `/giving/paymentmethods`

يدير طرق الدفع المحفوظة (البطاقات والحسابات المصرفية) عبر واجهات برمجة بوابة الدفع. لا توجد مسارات CRUD أساسية مفعّلة؛ جميع نقاط النهاية مخصصة.

| الطريقة | المسار | المصادقة | الصلاحية | الوصف |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View أو personId الخاص به | الحصول على جميع طرق الدفع المحفوظة لشخص (البطاقات والحسابات المصرفية) |
| POST | `/addcard` | JWT | — | إرفاق طريقة دفع ببطاقة. الجسم: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit أو personId الخاص به | تحديث تفاصيل البطاقة. الجسم: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit أو personId الخاص به | إنشاء SetupIntent من Stripe لربط حساب مصرفي عبر ACH. الجسم: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | عام | — | إنشاء SetupIntent مجهول عبر ACH لتبرعات الضيوف. الجسم: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit أو personId الخاص به | إضافة حساب مصرفي عبر رمز (مهمل؛ استخدم `ach-setup-intent`). الجسم: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit أو personId الخاص به | تحديث تفاصيل الحساب المصرفي. الجسم: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit أو العميل الخاص به | التحقق من حساب مصرفي بإيداعات صغيرة. الجسم: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit أو العميل الخاص به | حذف طريقة دفع (بطاقة أو حساب مصرفي) |

## سجل الأحداث

المسار الأساسي: `/giving/eventLog`

يمتد `GenericCrudController` مع مسارات CRUD: `getById` و`getAll` و`post` و`delete`. يتتبع أحداث خطاف بوابة الدفع للتدقيق ومنع التكرار.

| الطريقة | المسار | المصادقة | الصلاحية | الوصف |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | عرض جميع سجلات الأحداث |
| GET | `/:id` | JWT | Donations.ViewSummary | الحصول على سجل حدث بواسطة المعرف |
| GET | `/type/:type` | JWT | Donations.ViewSummary | الحصول على سجلات الأحداث مصفاة حسب نوع الحدث |
| POST | `/` | JWT | Donations.Edit | إنشاء سجلات الأحداث أو تحديثها |
| DELETE | `/:id` | JWT | Donations.Edit | حذف سجل حدث |

## صفحات ذات صلة

- [نقاط نهاية العضوية](./membership.md) — الأشخاص والكنائس والمجموعات والأدوار والصلاحيات
- [المصادقة والصلاحيات](./authentication.md) — تدفق تسجيل الدخول وJWT وOAuth ونموذج الصلاحيات
- [بنية الوحدة](../module-structure.md) — أنماط تنظيم الشيفرة
