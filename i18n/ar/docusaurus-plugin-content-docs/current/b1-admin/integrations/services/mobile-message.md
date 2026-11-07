---
title: "Mobile Message"
description: "اربط فعاليات B1 Admin بـ Mobile Message، وهي واجهة برمجة رسائل SMS أسترالية، عبر ويب هوك Zapier أو Make لإرسال رسائل الترحيب والتبرع والتذكير."
---

# Mobile Message

<div class="article-intro">

[Mobile Message](https://mobilemessage.com.au) هي واجهة برمجة تطبيقات (API) أسترالية للرسائل القصيرة SMS، ويفضّلها الكثير من الكنائس الأسترالية لأنها توفّر أرقامًا محلية وأسعارًا تنافسية في أستراليا، في حين أن Clearstream وText In Church موجّهتان أساسًا إلى السوق الأمريكية. لا يوجد حاليًا تطبيق Zapier رسمي لـ Mobile Message، لكنها تنشر واجهة REST عامة، لذا يمكنك ربط أحداث B1 برسائل Mobile Message عبر **Webhooks by Zapier** (أو وحدة HTTP في Make) خلال بضع دقائق.

</div>

<div class="prereqs">
<h4>قبل أن تبدأ</h4>

- حساب على [Mobile Message](https://mobilemessage.com.au) مع معرّف مرسل (Sender ID) مسجّل وبيانات اعتماد API (اسم مستخدم API وكلمة مرور ضمن *Account → API Settings*)
- حساب على [Zapier](https://zapier.com) (أو [Make](https://www.make.com))
- مستخدم في B1Admin يملك صلاحية **Edit Settings**

</div>

## ما الذي يمكنك ربطه

واجهة Mobile Message مصممة لإرسال الرسائل القصيرة فقط، دون مشغّلات واردة، أي أنها للرسائل الصادرة فقط. لذلك تسير كل الوصفات من B1 إلى الرسائل النصية:

| الاتجاه | مشغّل B1 | النتيجة |
|---|---|---|
| B1 → Mobile Message | `person.created` | رسالة ترحيب للشخص الجديد |
| B1 → Mobile Message | `donation.created` | رسالة شكر للمتبرع |
| B1 → Mobile Message | `form.submission.created` | تنبيه فريق المناوبة |
| B1 → Mobile Message | `event.created` | بث تذكير إلى قائمة |

## الإعداد

### 1. إنشاء مفتاح API في B1

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — لتسجيل webhook المشغّل
- `people:read` — للبحث عن رقم هاتف المستلم من `personId`

### 2. بناء Zap باستخدام Webhooks by Zapier

1. **المشغّل** — B1.church: اختر الحدث المطلوب (مثل New Donation).
2. **الإجراء** — B1.church: Find Person (باستخدام `data.personId`) للحصول على رقم الهاتف والاسم.
3. **الإجراء** — Webhooks by Zapier: **POST**. اضبطه كما يلي.

إعدادات خطوة POST:

- **URL** — `https://api.mobilemessage.com.au/v1/messages`
- **Payload Type** — JSON
- **Data** —
  ```json
  {
    "messages": [
      {
        "to": "{{step2_phone}}",
        "message": "Thanks for your gift, {{step2_first_name}}!",
        "sender": "YourChurch"
      }
    ]
  }
  ```
- **Headers** — `Content-Type: application/json` (يضيفه Webhooks by Zapier تلقائيًا)
- **Basic Auth** — ضع في حقل *Basic Auth* القيمة `<api_username>|<api_password>` (يحوّلها Zapier إلى ترويسة `Authorization: Basic …` الصحيحة)

فعّل الـ Zap. أرسل تبرعًا تجريبيًا من B1Admin للتحقق من وصول الرسالة.

## وصفات شائعة

### تذكيرات بالأحداث صباح يوم الحدث

- **المشغّل** — Schedule by Zapier (يوميًا، الساعة 7 صباحًا)
- **الإجراء** — B1.church: Find Events لليوم (أو استخدم خطوة Find مع فلتر تاريخ ثابت، أو احفظ قائمة أحداث اليوم في Google Sheet)
- **الإجراء** — Webhooks by Zapier: POST إلى Mobile Message مع قائمة الأحداث إلى مجموعة مشتركين مسجّلة

### استخدام نقطة الإرسال الجماعي لبث رسالة إلى قائمة

تقبل نقطة `/v1/messages` في Mobile Message حتى 10,000 رسالة في الطلب الواحد. لبث رسالة إلى مجموعة في B1:

- **المشغّل** — B1.church: New Form Submission (مع فلترة نموذج محدد)
- **الإجراء** — B1.church: List Group Members للمجموعة المستهدفة (عبر خطوة *Webhooks by Zapier — GET* على `/membership/groupmembers?groupId=…`)
- **الإجراء** — Formatter by Zapier ← Utilities ← Line-itemize لتحويل الاستجابة إلى مصفوفة `messages`
- **الإجراء** — Webhooks by Zapier: أرسل المصفوفة كاملة بطريقة POST إلى `/v1/messages`

### بديل Make

إذا كنت تفضّل Make، أضف وحدة **HTTP — Make a request** بعد مشغّل B1 Watch Events، واضبطها بالطريقة نفسها (POST، وBasic Auth، وجسم JSON). راجع [نظرة عامة على Make](../make.md) لمعرفة الجانب المتعلق بـ B1.

## القيود والملاحظات

- **Basic Auth هي طريقة المصادقة الوحيدة** — تصدر Mobile Message اسم مستخدم وكلمة مرور من لوحة التحكم. تعامل معهما كأسرار.
- **يجب أن يكون `sender` معرّف مرسل مسجّلًا** في حسابك على Mobile Message، وإلا سيعيد الطلب الخطأ `400 Invalid sender`. وتشترط لوائح أستراليا تسجيل المرسل.
- **أرقام الهواتف الأسترالية** يمكن أن تكون `0412345678` (محلية) أو `+61412345678` (دولية). تقبل الواجهة الصيغتين، لكن وحّد الصيغة على `+61…` إذا كنت ترسل أيضًا إلى الخارج.
- **حتى 10,000 رسالة في كل طلب** — مفيد للبث الجماعي، لكن نادرًا ما يُنتج تسليم webhook واحد من B1 قائمة بهذا الحجم؛ احتفظ بنقطة الإرسال الجماعي لـ Zaps المجدولة الكبيرة.

## استكشاف الأخطاء وإصلاحها

- **يعيد POST الخطأ `401 Unauthorized`** — بيانات Basic Auth غير صحيحة. انسخها من *Account → API Settings* في لوحة Mobile Message مجددًا. لاحظ أن اسم المستخدم هو بريد حسابك الإلكتروني افتراضيًا، وليس مفتاح API منفصلًا.
- **يعيد POST الخطأ `400 Invalid sender`** — قيمة `sender` ليست معرّف مرسل مسجّلًا في حسابك. سجّلها في لوحة Mobile Message أولًا.
- **تصل الرسالة لكنها مقطوعة** — تقسّم Mobile Message الرسائل التي تتجاوز نحو 160 حرفًا إلى أجزاء متعددة، ويُحتسب سعر كل جزء على حدة. تحقق من جسم الاستجابة، فهو يوضح عدد الأجزاء.

## انظر أيضًا

- [Clearstream](./clearstream.md)، [Text In Church](./text-in-church.md) — مزوّدان بديلان للرسائل القصيرة لهما تطبيقات Zapier أصلية (لا تحتاج إلى خطوة Webhooks by Zapier)
- [Zapier (نظرة عامة)](../zapier.md) — الجانب المتعلق بـ B1 في كل وصفات Zapier
- [توثيق API الخاص بـ Mobile Message](https://mobilemessage.com.au/api-documentation)
