---
title: "Text In Church"
description: "اربط B1 Admin وText In Church معًا عبر Zapier: أنشئ مفتاح API، وابنِ Zap يربط بطاقة الاتصال بـ B1، وانسخ عضوية المجموعات."
---

# Text In Church

<div class="article-intro">

[Text In Church](https://textinchurch.com) يجمع بين رسائل SMS وسلاسل المتابعة الآلية المجدولة وأتمتة بطاقات التواصل. يوفّر تطبيق Zapier الخاص به الاتجاهين معًا: إرسال أحداث B1 إلى سير عمل Text In Church، وسحب مُشغّلات بطاقات التواصل أو جهات الاتصال الجديدة من الجهة الأخرى إلى B1.

</div>

<div class="prereqs">
<h4>قبل أن تبدأ</h4>

- حساب على [Text In Church](https://textinchurch.com) ضمن خطة تتضمن تكامل Zapier
- حساب على [Zapier](https://zapier.com)
- مستخدم في B1Admin لديه صلاحية **Edit Settings** (تعديل الإعدادات)

</div>

## ما يمكنك ربطه

| الاتجاه | المُشغّل | الإجراء |
|---|---|---|
| B1 → Text In Church | B1 `person.created` | إنشاء/تحديث شخص + إضافته إلى مجموعة |
| B1 → Text In Church | B1 `form.submission.created` | إرسال رسالة نصية عبر الفريق المعني |
| B1 → Text In Church | B1 `group.member.added` | إضافة إلى مجموعة (مزامنة عضوية المجموعة) |
| Text In Church → B1 | Connect Card Submitted (إرسال بطاقة تواصل) | B1: إنشاء شخص + إضافة عضو إلى مجموعة |
| Text In Church → B1 | Person Created (إنشاء شخص) | B1: إنشاء شخص |
| Text In Church → B1 | Person Joined Group (انضمام شخص إلى مجموعة) | B1: إضافة عضو إلى مجموعة |

وتشمل إجراءات Text In Church أيضًا *إرسال رسالة نصية*، و*إرسال بث صوتي*، و*إنشاء مهمة*، و*البحث عن شخص/مجموعة*، وإضافة عضو إلى مجموعة أو حذفه منها.

## الإعداد

### 1. إنشاء مفتاح API في B1

**الإعدادات ← المطوّر ← مفاتيح API ← مفتاح API جديد**:

- `settings:write` — مطلوب للـ Zaps التي تُشغَّل من B1
- `people:read`، `people:write` — للبحث عن الشخص أو إنشائه
- `groups:write` — لمزامنة المجموعات
- (اختياري) `donations:write` إذا أردت ربط تأكيدات التبرعات بـ TIC

### 2. ربط Text In Church بـ Zapier

اتبع [دليل تكامل Zapier من Text In Church](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration). ينشئون رمز API من داخل لوحة TIC.

### 3. بناء Zap من بطاقة التواصل إلى B1

وهذا هو الاتجاه الأكثر شيوعًا. تتحول بطاقات التواصل المُرسلة من TIC تلقائيًا إلى أشخاص جدد في B1.

1. **المُشغّل** — Text In Church: Connect Card Submitted (إرسال بطاقة تواصل).
2. **الإجراء** — B1.church: Find Person (البحث عن شخص بالبريد الإلكتروني).
3. **المسار** — التفرع حسب النتيجة: موجود / غير موجود:
   - غير موجود ← B1.church: Create Person (إنشاء شخص).
   - موجود ← المتابعة.
4. **الإجراء** — B1.church: Add Group Member (إضافة عضو إلى مجموعة) إلى مجموعة "جهة اتصال جديدة".

فعّل الـ Zap. ستظهر بطاقة التواصل التالية المُرسلة عبر TIC تلقائيًا في **B1Admin ← الأشخاص**.

## وصفات شائعة

### تشغيل سير عمل بطاقة تواصل من نموذج في B1

- **المُشغّل** — B1.church: New Form Submission (إرسال نموذج جديد)، مع فلترة حسب معرّف نموذج "أنا جديد هنا"
- **الإجراء** — Text In Church: Create/Update Person (إنشاء/تحديث شخص)، مع ربط إجابات البريد الإلكتروني والهاتف والاسم في النموذج بالحقول المقابلة
- **الإجراء** — Text In Church: Add to Group (إضافة إلى مجموعة)، حيث تكون للمجموعة سلسلة ترحيب جاهزة مرتبطة بها

### مزامنة عضوية المجموعة

- **المُشغّل** — B1.church: New Group Member (عضو جديد في المجموعة)، مع فلترة حسب `groupId` محدد
- **الإجراء** — Text In Church: Add to Group (إضافة إلى مجموعة) (للشخص نفسه، ومرآة للمجموعة). ادمجه مع Zap لـ `group.member.removed` إذا أردت مزامنة كاملة.

### تنبيه القائد عند انضمام شخص

- **المُشغّل** — B1.church: New Group Member (عضو جديد في المجموعة)
- **الإجراء** — Text In Church: Send Text Message (إرسال رسالة نصية)، المستلم = هاتف قائد المجموعة، والنص = `"{first} {last} just joined {group}"`.

## القيود والملاحظات

- **تكامل Zapier في TIC مرتبط بمستوى الخطة.** إذا كان تكامل Zapier معطّلًا (رمادي) في لوحة TIC، فتواصل مع دعم TIC لتفعيله ضمن خطتك.
- **معرّفات المجموعات تعود إلى TIC لا إلى B1.** عند المزامنة ستحتاج إلى جدول تطابق في مكان ما (إما *Lookup Table* في Zapier، أو قيم ثابتة في كل Zap).
- **إرسال الرسائل النصية يستهلك رصيدًا.** كل Zap يُنفّذ *Send Text* يخصم من حصة رسائل SMS في TIC.

## استكشاف الأخطاء وإصلاحها

- **مُشغّل بطاقة التواصل لا يعمل** — يجب تفعيل مفتاح تكامل Zapier في TIC. وتحقّق أيضًا من أن النموذج الذي اختبرته مُعدّ كـ "Connect Card" وليس استبيانًا عامًا.
- **فشل Create Person في B1 برمز 401** — مفتاح API غير صحيح أو أُلغي أو يفتقد صلاحية `people:write`. أعد إنشاءه.
- **تكرار الأشخاص في B1** — ترسل TIC الحدثين *Person Created* و*Connect Card Submitted* للحدث نفسه. اختر أحدهما كمصدر موثوق وأضف Zapier Filter على الآخر.

## انظر أيضًا

- [Clearstream](./clearstream.md) — منصة SMS بديلة ذات بنية Zapier مشابهة
- [Zapier (نظرة عامة)](../zapier.md) — الجانب B1 من كل وصفة Zapier
- [دليل Zapier من Text In Church](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration) (وثائق TIC)
