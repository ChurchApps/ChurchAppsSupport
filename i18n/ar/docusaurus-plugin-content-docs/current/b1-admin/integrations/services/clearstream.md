---
title: "Clearstream"
description: "اربط Clearstream SMS بـ B1 Admin عبر Zapier: أرسل رسائل نصية عند الهدايا الجديدة أو إرسال النماذج، واسترجع الردود الواردة كأشخاص."
---

# Clearstream

<div class="article-intro">

أرسل رسالة نصية عبر [Clearstream](https://clearstream.io) من أي حدث في B1، مثل إضافة شخص جديد، أو تسجيل تبرع، أو إرسال نموذج، أو تحديث التقويم، واسترجع الردود إلى سجلات B1. يوفر تطبيق Zapier الخاص بـ Clearstream الاتجاهين معًا، لذلك يكون الربط كله وصفة جاهزة وليس كودًا مخصصًا.

</div>

<div class="prereqs">
<h4>قبل أن تبدأ</h4>

- حساب [Clearstream](https://clearstream.io) يحتوي على قائمة واحدة على الأقل ومخصص رسائل نصية
- حساب [Zapier](https://zapier.com)
- مستخدم B1Admin يملك صلاحية **Edit Settings**

</div>

## ما يمكنك ربطه

| الاتجاه | المُشغِّل | الإجراء |
|---|---|---|
| B1 → Clearstream | B1 `person.created` | Clearstream: Create/Update Subscriber + Send Text to Number |
| B1 → Clearstream | B1 `donation.created` | Clearstream: Send Text to List (مثلاً لإشعار فريق المالية) |
| B1 → Clearstream | B1 `form.submission.created` | Clearstream: Send Text to a routing list (مثلاً لفريق طلبات الصلاة) |
| Clearstream → B1 | New Incoming Text | B1: Create Person؛ ضع وسمًا باسم الكلمة المفتاحية التي أرسلوها |

إجراءات Clearstream في Zapier: *Send Text to Number*، و*Send Text to List*، و*Create/Update Subscriber*، و*Add Subscriber to Automated Workflow*، و*Add Tag to Subscriber*، و*Remove Subscriber From List*.

## الإعداد

### 1. إنشاء مفتاح API لـ B1

**Settings → Developer → API Keys → New API Key**:

- `settings:write`: مطلوب ليسجّل B1 خطاف الويب (webhook) الخاص بالمُشغِّل
- `people:read`: مطلوب للبحث عن الشخص من الحدث (`personId` → الاسم/الهاتف/البريد الإلكتروني)
- (اختياري) `people:write` إذا كان ينبغي أن تُنشئ ردود Clearstream جهات اتصال في B1

### 2. بناء Zap "إرسال رسالة عند تبرع جديد"

1. **المُشغِّل**: B1.church: New Donation
2. **الإجراء**: B1.church: Find Person (المعرّف `personId` الخاص بالتبرع)
3. **الإجراء**: Clearstream: Send Text to Number. استخدم هاتف الشخص من الخطوة 2 كمستلم، واكتب الرسالة (`"شكرًا لعطائك يا {first}! …"`).

فعّل الـ Zap. يسجّل B1 خطاف التبرعات عند التفعيل، وسترى `Zapier — donation.created` يظهر في **Settings → Developer → Webhooks**.

### 3. (اختياري) استرجاع الردود كسجلات في B1

1. **المُشغِّل**: Clearstream: New Incoming Text
2. **الإجراء**: Filter by Zapier على الكلمة المفتاحية، مثلاً المتابعة فقط إذا بدأ نص الرسالة بـ `PRAY`
3. **الإجراء**: B1.church: Find Person (بالهاتف)
4. **الإجراء**: Filter / Path. إذا لم يُعثر على الشخص، فأنشئه؛ وفي الحالتين، احفظ نص الرسالة في مكان ما (Slack أو جدول Google أو إرسال نموذج B1 عبر Webhooks by Zapier).

## وصفات شائعة

### تنبيه فريق المتطوعين

- **المُشغِّل**: B1.church: New Form Submission (مُرشَّح حسب معرّف نموذج طلب الصلاة)
- **الإجراء**: Clearstream: Send Text to List، حيث تكون القائمة هي فريق الرعاية المناوب لديك. اكتب نص الرسالة هكذا: `طلب صلاة جديد: {data.questions.0.answer}`.

### متابعة الزوار للمرة الأولى

- **المُشغِّل**: B1.church: New Person، مُرشَّح حسب وسم الشخص في B1 "زائر لأول مرة"
- **الإجراء**: Clearstream: Add Subscriber to Automated Workflow. اربط معرّف سير العمل بسلسلة رسائل نصية جاهزة مدتها 7 أيام.

### الانضمام إلى مجموعة عبر كلمة مفتاحية

- **المُشغِّل**: Clearstream: New Incoming Text (مُرشَّح للكلمة المفتاحية `MENS`)
- **الإجراء**: B1.church: Find Person (بالهاتف)؛ وعند عدم العثور عليه، تفرّع إلى Create Person
- **الإجراء**: B1.church: Add Group Member إلى مجموعة خدمة الرجال

## القيود والملاحظات

- **تحتسب Clearstream الرسائل النصية حسب عدد الرسائل.** كل إجراء Send Text يستهلك رصيدًا واحدًا أو أكثر حسب الطول وعدد المستلمين. تحقّق من حصة خطتك.
- **يجب أن يكون الهاتف بصيغة E.164** (مثل `+15555550199`) لإجراء *Send Text to Number*. يخزّن سجل الشخص في B1 ما أُدخل فيه تمامًا؛ استخدم خطوة *Formatter by Zapier — Numbers → Format Phone Number* إذا لم تستطع ضمان الصيغة.
- **لا يتطلب B1 أي ترويسة (header)** من جانبه، فالمصادقة الخاصة بـ Clearstream موجودة بالكامل داخل اتصال Zapier الخاص بها.

## استكشاف الأخطاء وإصلاحها

- **المُشغِّل لا يعمل أبدًا**: يجب أن يظهر في `Settings → Developer → Webhooks` صف `Zapier — <event>` بعد تفعيل الـ Zap. إذا لم يظهر، فمفتاح API لـ B1 يفتقد صلاحية `settings:write`. أعد إنشاء المفتاح وأعد الربط.
- **Clearstream تُرجع "Invalid phone number"**: حقل المستلم ليس بصيغة E.164. أضف خطوة Format Phone Number.
- **يفشل Send Text to List برمز `403`**: مستخدم API في Clearstream لا يملك صلاحية لهذه القائمة، أو معرّف القائمة غير صحيح. تظهر معرّفات القوائم في صفحة تفاصيل القائمة في Clearstream.

## انظر أيضًا

- [Text In Church](./text-in-church.md): منصة رسائل نصية بديلة، بهيكل ربط مشابه
- [Mobile Message](./mobile-message.md): للكنائس خارج الولايات المتحدة
- [Zapier (overview)](../zapier.md): الجانب الخاص بـ B1 من كل وصفات Zapier
- [Clearstream API docs](https://api-docs.clearstream.io/): للتكاملات المخصصة التي تتجاوز تطبيق Zapier
