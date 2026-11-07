---
title: "تسجيلات الفعاليات"
description: "كيف تعمل تسجيلات الفعاليات في B1 Admin وB1App: أنواع الحضور، والإضافات المدفوعة، ورموز الخصم، والمدفوعات عبر بوابة العطاء، وترقية قائمة الانتظار."
---

# تسجيلات الفعاليات

<div class="article-intro">

يقع تسجيل الفعاليات الأصلي في وحدة المحتوى، ومنذ موجة التسجيلات المدفوعة صار يتضمن نموذجًا تجاريًا كاملًا: أنواع حضور مُسعّرة، وخيارات إضافية مُسعّرة، ورموز خصم، ومدفوعات عبر بوابة التبرعات الحالية في الكنيسة، وقائمة انتظار تعتمد على الحالة. يعيد مسار الدفع استخدام منظومة التبرعات عن قصد، إذ يحتسب متحكم التسجيل المبالغ عبر `GatewayService` / `IGatewayProvider` نفسه الموثّق في [التبرعات](./giving.md)، لذلك لا توجد بيانات البطاقات ولا حزمة SDK الخاصة بالبوابة داخل وحدة المحتوى. تعرض هذه الصفحة نموذج البيانات، وقواعد التسعير والسعة، وتدفقات التسجيل والدفع وقائمة الانتظار.

</div>

## نظرة عامة

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

تنطبق ثلاث قواعد على المنظومة كلها:

1. **الخادم هو من يحدد السعر.** ترسل الواجهة معرّفات الأنواع والخيارات والكميات، ويحسب `RegistrationPricingHelper.computeTotal()` الإجمالي على الخادم، ويُعاد التحقق من الكوبونات وقت الخصم. لا يُوثَق أبدًا بمبلغ يرسله العميل.
2. **تُفرض السعة بشكل ذري وقت الإدراج.** كل إدراج محدود بالسعة يستخدم عبارة `INSERT … SELECT … FROM dual WHERE (count of active rows) < capacity`، فلا يمكن لتسجيلين متزامنين أن يحجزا آخر مقعد معًا. تُحسب الأعداد من الحالة (`pending`/`confirmed`) ولا تُخزَّن.
3. **تمر المدفوعات عبر مسارات التبرعات.** يستدعي `RegistrationController` الدالة المشتركة `GatewayService.processCharge` مع بوابة الكنيسة المُعدّة، أي تجريد المزوّد نفسه ونموذج الترميز نفسه ومعالجة SCA نفسها المستخدمة في التبرعات.

## نموذج البيانات (`Api/src/modules/content`)

توجد النماذج في `models/Registration.ts`، وتعيينات الجداول في `db/DatabaseTypes.ts`، ويوجد مستودع واحد لكل جدول ضمن `repositories/`.

| الجدول | المعنى | الحقول الرئيسية |
|-------|---------|-----------|
| `registrations` | تسجيل واحد (أسرة أو مجموعة واحدة لفعالية واحدة) | eventId, personId, householdId, **status** (`pending` / `confirmed` / `waitlisted` / `cancelled`), totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | حاضر واحد ضمن تسجيل | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | أنواع الحضور لكل فعالية (مثل بالغ / طفل) | eventId, name, description, **price**, **capacity**, minAgeYears, maxAgeYears, formId, sort, active |
| `registrationSelections` | خيارات إضافية مسماة ومسعّرة (مثل قميص) | eventId, name, description, **price**, **capacity**, **maxQuantity** (الحد الأقصى لكل تسجيل), sort, active |
| `registrationSelectionChoices` | كمية من خيار معين يختارها تسجيل أو حاضر | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | عملية خصم ناجحة واحدة مقابل تسجيل | registrationId, gatewayId, provider, transactionId, method, amount, currency, kind (`charge`), status (`succeeded`), personId |
| `registrationCoupons` | رموز خصم لكل فعالية | eventId, code, **discountType** (`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, active |

ملاحظات:

- **لا يوجد جدول لقائمة الانتظار.** الأطراف المدرجة في قائمة الانتظار هي صفوف في `registrations` قيمتها `status = 'waitlisted'`، ودورة حياة قائمة الانتظار كلها تغييرات حالة على هذا الجدول الواحد.
- **لا توجد عدادات مخزنة.** تُحسب أعداد "المباع" و"المستخدم" (سعة الفعالية، وسعة كل نوع، وسعة كل خيار، واستخدامات الكوبون) باستخدام استعلامات فرعية مترابطة على الصفوف التي حالتها ضمن `('pending','confirmed')` (`RegistrationTypeRepo.loadActiveWithUsage`، و`RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`). لذلك فإن إلغاء التسجيل يحرر السعة دون الحاجة إلى أي عملية محاسبية إضافية.
- الأسعار أعمدة DECIMAL في MySQL (تصل كنصوص عبر الشبكة) ويجري تحويلها باستخدام `Number()` داخل مساعد التسعير.

## واجهة REST

كل المسارات تحت `/content/registrations` (`controllers/RegistrationController.ts`)، ومحمية بالصلاحية `Permissions.registrations` (`view` / `edit`):

| المسار | الوصول | الغرض |
|-------|--------|---------|
| `POST /register` | مجهول | إرسال كامل: ضيف، أو عضو، أو إضافة حاضر من الموظفين؛ تسعير على الخادم، وفحوص السعة، وخصم اختياري |
| `GET /types/event/:eventId`، `GET /selections/event/:eventId` | عام | الأنواع والخيارات مع القيم المشتقة `used` / `remainingCapacity` لمعالج التسجيل |
| `POST /types`، `DELETE /types/:id` (وبالمثل لـ `/selections` و`/coupons`) | `registrations.edit` | عمليات الإنشاء والقراءة والتحديث والحذف لإعدادات الموظفين |
| `POST /coupons/validate` | عام | التحقق الفوري من رمز الخصم أثناء المعالج |
| `GET /coupons/event/:eventId` | الموظفون | الكوبونات مع عدد مرات الاستخدام |
| `GET /event/:eventId` · `GET /event/:eventId/count` | الموظفون · عام | قائمة الحضور؛ وعدد المسجلين النشطين لعرض السعة |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | مسجّل الدخول | تسجيلاتي، والتفاصيل، وسجل الدفعات |
| `PUT /:id` | المالك أو الموظف | تعديل بعد الإرسال: يستبدل الأعضاء واختيارات الخيارات مع فحوص سعة ذرية جديدة، ويعيد حساب `totalAmount`؛ لا يُجري أي خصم أو استرداد تلقائيًا أبدًا |
| `POST /:id/pay` | المالك | "إتمام الدفع": يخصم `totalAmount − amountPaid`، ويحوّل `waitlisted`/`pending` إلى `confirmed` |
| `POST /:id/promote` | الموظف | ترقية يدوية من قائمة الانتظار |
| `POST /:id/cancel` · `DELETE /:id` | المالك · الموظف | إلغاء أو حذف؛ وكلاهما يشغّل الترقية التلقائية من قائمة الانتظار |

يُرفض أي تسجيل موجود وغير ملغى للـ`personId` نفسه في الفعالية نفسها برمز 409، ويرسل كل تسجيل مُنشأ حدث ويب هوك باسم `registration.created` عبر `WebhookDispatcher`.

## التسعير ورموز الخصم

`helpers/RegistrationPricingHelper.ts` هو المرجع الوحيد لحساب المبالغ:

- يجمع `computeTotal()` سعر نوع كل عضو مع `السعر × الكمية` لكل اختيار خيار.
- يفرض `validateCoupon()` شرط التفعيل، ونافذة التاريخ (`startDate`/`endDate`)، و`minMembers` مقارنةً بعدد أفراد الطلب، و`maxUses` مقارنةً بعدد مرات الاستخدام المشتقة من الحالة.
- تطبق `applyDiscount()` الخصم: النوع `percent` يطرح `total × value/100`، والنوع `amount` يطرح `value`، وكلاهما لا ينزل تحت الصفر.

تستدعي الواجهة `POST /coupons/validate` لإعطاء ملاحظات فورية، لكن `register` يعيد التحقق من الكوبون ويطبقه مرة أخرى على الخادم، أي أن الإجمالي الذي تعرضه الواجهة استرشادي فقط.

## نمط السعة الذرية

كل إدراج محدود بالسعة يعمل بأمان في ظل التزامن دون معاملات أو أقفال، وذلك بجعل فحص السعة جزءًا من عبارة `INSERT` نفسها. على مستوى الفعالية (`RegistrationRepo.atomicInsertWithCapacityCheck`):

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

عدد الصفوف المتأثرة صفر يعني "اكتملت السعة". ويحمي النمط نفسه إدراجات كل نوع (`RegistrationMemberRepo.atomicInsertWithTypeCapacity`، ويحسب الأعضاء المرتبطين بالتسجيلات النشطة)، وكميات كل خيار (`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`، باستخدام `COALESCE(SUM(quantity),0) + ? <= capacity`). وإذا فشل إدراج أي عضو أو خيار في منتصف التسجيل، يتراجع المتحكم عن التسجيل الجزئي باستخدام `deleteCascade()` ويبلغ عن النوع أو الخيار الذي نفدت سعته.

## تدفق الدفع

تُعد `processRegistrationCharge` في المتحكم النقطة الوحيدة التي تلمس فيها التسجيلات الأموال، وهي عميل خفيف لمنظومة التبرعات:

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

يجري الترميز في المتصفح تمامًا كما في التبرعات (انظر [التبرعات](./giving.md))، إذ يعيد المعالج استخدام سجل مزودي الدفع في apphelper، لذلك يمكن للأعضاء المسجلين الدفع ببطاقات محفوظة، ويقوم الضيوف برمّزة بطاقة جديدة. ويحاكي المتحكم خصائص المزودين الخاصة في `DonateController` (معرّفات طريقة الدفع `pm-{id}` في Kingdom Funding، واستجابات `requires_action` في Stripe SCA التي تُعاد إلى العميل دون تسجيل دفعة). وعند نجاح الخصم، يُكتب صف في `registrationPayments`، ويُزاد `amountPaid`، ويُؤكَّد التسجيل. **الاسترداد غير مُنفَّذ**، فالتسجيل المدفوع الملغى يحتفظ بصفوف الدفع الخاصة به، ويُعالج أي استرداد خارج النظام من لوحة تحكم البوابة.

يمر كلا نقطتي الدخول عبر المسار البرمجي نفسه: `register` (الدفع عند التسجيل) و`pay` (دفع الرصيد المتبقي أو إكمال قائمة الانتظار).

يتجاوز `register` الخصم في حالتين، ويحفظ التسجيل بالحالة `pending` مع `amountPaid = 0`، تاركًا الإجمالي كاملًا مستحقًا كرصيد:

- **إضافة حاضر من الموظفين.** يحمل الطلب `personId` ليس للمستدعي، ولا يحمل `guestInfo`، والمستدعي لديه `registrations.edit` في تلك الكنيسة. يجب أن يكون الشخص موجودًا (وإلا يُرجع 404)، ويُتجاوز فلتر أفراد الأسرة، ولا يُخصم أي مبلغ من البطاقة.
- **لا توجد بوابة.** لدى الكنيسة بوابة تبرعات مُعدّة (يتحقق `hasGateway` من `gateway.loadAll`). تعرض خطوة الدفع في B1App الخيار **سجّل وادفع لاحقًا** بدلًا من نموذج البطاقة.

يجب أن يحمل التسجيل المسعّر للضيوف (الذين لا يملكون `au.id`) الرمز `captchaPass` الصادر عن `POST /giving/donate/captcha-verify`. ويعمل `CaptchaPass.verify` (الموجود الآن في `shared/helpers`) مباشرة قبل الخصم، لذلك لا تتأثر التسجيلات المجانية وتلك الموجودة في قائمة الانتظار. وعند ضبط `CAPTCHA_ENFORCE=true` وكان الرمز مفقودًا أو غير صالح، يُتراجع عن التسجيل الجديد باستخدام `deleteCascade()` ويعيد الاستدعاء الرمز 403. ويعرض `RegistrationPaymentForm` في B1App مربع reCAPTCHA للضيوف، ويرسل الرمز مع حفظ البطاقة والتسجيل معًا.

## دورة حياة قائمة الانتظار

عندما تكتمل الفعالية ويكون العلم `waitlistEnabled` مفعّلًا، يحفظ `register` الطرف بالحالة `waitlisted` (متجاوزًا فحوص السعة) ويرسل رسالة التأكيد المعتادة مع تمييزها كمقعد في قائمة الانتظار. تحدث الترقية بثلاث طرق: `cancel`، و`delete`، ونقطة الموظف `promote`، وكلها تمر عبر `RegistrationRepo.promoteFromWaitlist`، الذي يختار أقدم صف في قائمة الانتظار ويقلبه بشكل ذري:

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…active count for the event…) < ?
```

يمنع الشرط `status='waitlisted'` ترقية الصف نفسه مرتين عند تزامن عمليات الترقية، ويمنع شرط السعة الفرعي الترقية من تجاوز السعة المتاحة. تنتقل الصفوف المُرقّاة إلى `pending` وليس `confirmed`، لأن الرصيد قد يكون مستحقًا؛ وتخبر `RegistrationHelper.sendWaitlistAvailabilityEmail` المسجَّل بأن مقعده قد أصبح متاحًا، وعندما يكون `totalAmount − amountPaid > 0` تتضمن الرسالة رابطًا إلى صفحة `/mobile/registrations` في B1 التابعة للكنيسة (تسجيلاتي)، ويُبنى من `B1AppRoot` ونطاق الكنيسة الفرعي. ويؤكَّد المسجل بعد الدفع، أو إذا لم يكن هناك رصيد مستحق.

:::info
رفع السعة لا يُرقّي أحدًا تلقائيًا بمفرده، إذ يستخدم الموظفون إجراء **ترقية** في قائمة الحضور بعد رفع السعة. أما الإلغاءات والحذف فتُرقّي تلقائيًا.
:::

## واجهات العميل

- **معالج B1App**: خطاف مشترك واحد، `B1App/src/components/registration/useEventRegistration.ts`، يقود كلًا من مكوّن الموقع (`components/registration/EventRegister.tsx`) وشاشة البوابة على الهاتف (`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`) عبر الخطوات `info → members → selections → questions → payment → confirm` (تظهر الخطوات الوسطى فقط عندما تحتوي الفعالية على خيارات، أو نموذج مرفق، أو إجمالي غير صفري). تعرض خطوتا المعلومات والأعضاء أدوات اختيار لكل نوع حضور مع حالات السعة المتبقية المباشرة وحالات النفاد. أما الدفع (`RegistrationPaymentForm.tsx`) فيعرض ملخص الطلب، وإدخال رمز الخصم، وطرق الدفع المحفوظة للأعضاء المسجلين عبر سجل مزودي apphelper، بينما يرمّز الضيوف بطاقة جديدة. أما شاشة **التسجيلات** على الهاتف (`screens/RegistrationsPage.tsx`) فهي تسجيلاتي: الحالة، والرصيد المستحق، و"إتمام الدفع" (`POST /:id/pay`)، و"تعديل" (`PUT /:id`، ويشمل بيانات الاتصال وأنواع الأعضاء وكميات الخيارات)، و"إلغاء".
- **إعدادات B1Admin**: يضيف `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` مفتاح **تفعيل قائمة الانتظار**، إضافة إلى أقسام قابلة للطي لـ**أنواع الحضور** و**الخيارات** و**رموز الخصم** (`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`)، وكلها عمليات إنشاء وقراءة وتحديث وحذف عبر المسارات `/types` و`/selections` و`/coupons`.
- **قائمة الحضور في B1Admin**: `B1Admin/src/registrations/RegistrationDetailsPage.tsx`، ويضم عمود النوع لكل حاضر، وعمود **المدفوع / الإجمالي** مع شارة الرصيد، وشارات عدد كل نوع، وحوار تفاصيل الدفعات (`RegistrationDetailDialog.tsx`، من `GET /payments/:registrationId`)، وإجراء **ترقية** لكل صف في قائمة الانتظار، وتصدير CSV يتضمن أنواع الحضور والخيارات والمدفوع والإجمالي والرصيد وإجابات الأسئلة.

تتم عمليات البحث عبر الوحدات عبر `getMembershipModuleGateway()` (لتحديد أو إنشاء بيانات الشخص الضيف، وتحميل الكنيسة لإرسال الرسائل)، إذ لا تقرأ وحدة المحتوى جداول العضوية مباشرة أبدًا.

## صفحات ذات صلة

- [التبرعات](./giving.md): تجريد البوابة، وسجل المزودين، ونموذج الترميز الذي تعيد هذه الميزة استخدامه
- [نقاط نهاية المحتوى](../api/endpoints/content.md): واجهة REST لوحدة المحتوى
- [ويب هوكس](../api/webhooks.md): حدث `registration.created`
- [بنية الوحدات](../api/module-structure.md): كيفية تنظيم وحدة المحتوى على الخادم
