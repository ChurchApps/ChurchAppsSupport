---
title: "Subsplash"
description: "اربط تبرعات Subsplash والأشخاص الجدد وردود النماذج بـ B1 عبر Zapier، لتصل الهدايا والملفات إلى B1 Admin تلقائيًا."
---

# Subsplash

<div class="article-intro">

إذا كنت تستخدم Subsplash لتطبيق كنيستك أو للتبرعات أو النماذج، لكنك تريد أن يكون B1 نظام السجل الرئيسي للأشخاص والتبرعات، فيمكن لتطبيق Zapier الخاص بـ Subsplash أن ينقل التبرعات والملفات الشخصية الجديدة وردود النماذج إلى B1 في الوقت الفعلي. يُرجى ملاحظة أن تطبيق Zapier من Subsplash يقتصر حاليًا على **المشغّلات فقط**، فالربط أحادي الاتجاه (من Subsplash إلى B1).

</div>

<div class="prereqs">
<h4>قبل أن تبدأ</h4>

- حساب Subsplash على خطة تتضمن الوصول إلى **API + Zapier** (استفسر من مدير نجاح العملاء لديك في Subsplash، إذ إن هذه الميزات مرتبطة بمستوى الخطة)
- حساب على [Zapier](https://zapier.com)
- مستخدم B1Admin يملك صلاحية **Edit Settings**

</div>

## ما يمكنك ربطه

جميع المشغّلات أدناه تابعة لـ Subsplash، والإجراءات تابعة لـ B1.

| مشغّل Subsplash | إجراء B1 |
|---|---|
| New Donation | Find Person ← Add Donation (Create Person إذا كان الشخص غير موجود) |
| New Pledge | Add Donation (مع `notes` = "Pledge: …") |
| New Person Created | Create Person |
| Person Updated Profile | (لا يوجد إجراء مباشر في B1، سجّله في جدول Google للمراجعة اليدوية) |
| New Form Response | Create Person + (اختياريًا) Add Group Member بناءً على النموذج |

الاتجاه من Subsplash إلى B1 هو الاتجاه الوحيد الذي يدعمه تطبيق Subsplash حاليًا.

## الإعداد

### 1. إنشاء مفتاح API في B1

في B1Admin: **Settings → Developer → API Keys → New API Key**. النطاقات (Scopes):

- `people:read`: للبحث عن المتبرع بواسطة البريد الإلكتروني
- `people:write`: لإنشائه إذا لم يكن موجودًا
- `donations:write`: لتسجيل التبرع
- (لا حاجة إلى `settings:write`، فالمشغّل هنا تابع لـ Subsplash وليس لـ B1.)

### 2. ربط Subsplash بـ Zapier

اتبع [دليل تكامل Subsplash مع Zapier](https://support.subsplash.com/en/articles/9825926-zapier-integration). سيصدرون رمز API من داخل لوحة تحكم Subsplash، ويستخدمه Zapier للتحقق من هوية جانب المشغّل.

### 3. إنشاء Zap "تسجيل تبرع"

1. **المشغّل**: Subsplash: New Donation
2. **الإجراء**: B1.church: Find Person (بواسطة البريد الإلكتروني)
3. **الفلتر / المسار**: قسّم المسار بناءً على "هل تم العثور على الشخص":
   - **تم العثور عليه:** B1.church: Add Donation. قم بربط المبلغ والتاريخ والصندوق، وضع الطريقة = "Online"، واجعل الملاحظات هي معرّف معاملة Subsplash.
   - **لم يُعثر عليه:** B1.church: Create Person ← B1.church: Add Donation (باستخدام معرّف الشخص الذي أُنشئ للتو).

فعّل الـ Zap. ستظهر التبرعات المستقبلية من Subsplash في **B1Admin ← Donations** خلال ثوانٍ.

## وصفات شائعة

### إرسال رسالة شكر عند وصول أول هدية

- **المشغّل**: Subsplash: New Donation
- **الإجراء**: Filter by Zapier: تابع فقط إذا كانت هذه أول هدية للمتبرع (استخدم *Lookup Table* على Donor Email مقابل جدول Google يحتوي على أسماء المتبرعين السابقين، أو خطوة Zapier *Paths* بناءً على تاريخ إنشاء المتبرع)
- **الإجراء**: Mailchimp / SMTP / SendGrid: أرسل رسالة شكر لأول هدية
- **الإجراء**: B1.church: Add Donation (كالمعتاد)

### فصل التعهدات عن تدفق العطاء المنتظم

- **المشغّل**: Subsplash: New Pledge
- **الإجراء**: B1.church: Add Donation مع `notes = "Pledge — Subsplash"` وصندوق باسم `Pledges` (منفصل عن صندوق التشغيل لديك) حتى تتمكن من إعداد تقارير التعهدات بشكل مستقل في **B1Admin ← Donations ← Summary**.

### مزامنة مستخدمي التطبيق الجدد كأشخاص في B1

- **المشغّل**: Subsplash: New Person Created
- **الإجراء**: B1.church: Create Person، مع تعبئة الاسم والبريد الإلكتروني والهاتف. يمكنك وضع وسم في B1 بإضافة الشخص الجديد إلى مجموعة مثل "Subsplash App Users".

## القيود والملاحظات

- **تطبيق Subsplash على Zapier مقتصر على المشغّلات.** إذا أردت تغييرات تحدث في B1 (مثلًا، أن يظهر شخص جديد في B1 في Subsplash أيضًا)، ستحتاج إلى بناء هذا الجسر من مشغّلات تطبيق B1 على Zapier، عبر استدعاء REST API الخاص بـ Subsplash من خلال إجراء *Webhooks by Zapier — POST* مخصص. هذا تكامل مخصص وليس وصفة جاهزة.
- **الوصول إلى API مرتبط بالخطة.** إذا فشل الاتصال بـ Zapier مع `403 Forbidden`، فمن المرجح أن خطتك في Subsplash لا تتضمن الوصول إلى API. تواصل مع مدير نجاح العملاء لديك.
- **ربط الصناديق يدوي.** يمرر Subsplash اسم حملة أو فئة، بينما يحتاج B1 إلى معرّف صندوق رقمي. إما أن تثبّت الصندوق في الـ Zap مباشرة، أو تحتفظ بجدول *Lookup Table* في Zapier يربط حملات Subsplash بصناديق B1.

## استكشاف الأخطاء وإصلاحها

- **لا يعمل أي مشغّل بعد التبرع**: تحقق في لوحة Zapier الخاصة بـ Subsplash من أن الاتصال ما زال يظهر بحالة *Connected*. إذا تم تدوير رمز API من جانب Subsplash، فسيتوقف الـ Zap بصمت، وعندها أعد الاتصال.
- **يفشل *Add Donation* في B1 برمز 422**: غالبًا ما يكون السبب `fundId` مفقودًا أو غير معروف. اعرض صناديقك عبر **B1Admin ← Donations ← Funds** وانسخ المعرّف الدقيق إلى خطوة الـ Zap.
- **تُشغَّل أول هدية مرتين**: يعيد Subsplash أحيانًا إرسال المشغّل إذا فاتت Zapier رسالة التأكيد. أضف *Filter by Zapier* على معرّف التبرع (يرسله Subsplash في الحمولة) لإسقاط النسخ المكررة.

## انظر أيضًا

- [Donorbox](./donorbox.md): الوصفات نفسها تقريبًا، ولكن مع منصة تبرعات مختلفة
- [Zapier (نظرة عامة)](../zapier.md): الجانب الخاص بـ B1 في كل وصفات Zapier
- [دليل تكامل Subsplash مع Zapier](https://support.subsplash.com/en/articles/9825926-zapier-integration) (وثائق Subsplash)
