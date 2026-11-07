---
title: "خطافات الويب"
---

# خطافات الويب

<div class="article-intro">

تتيح خطافات الويب (Webhooks) للكنيسة إرسال إشعارات فورية إلى أدوات الطرف الثالث، مثل منصات الأتمتة (Zapier وMake وn8n)، وأنظمة إدارة العلاقات مع المتبرعين والأعضاء، وأنظمة المحاسبة، أو أي خدمة تقبل طلبات HTTP POST. عندما يتغيّر شخص أو مجموعة أو أسرة في B1، يرسل B1 حمولة JSON موقّعة إلى كل عنوان URL مشترك في ذلك الحدث.

</div>

<div class="prereqs">
<h4>قبل أن تبدأ</h4>

- يحتاج مسؤول الكنيسة الذي يملك صلاحية **تعديل إعدادات الكنيسة** إلى تسجيل خطافات الويب وإدارتها
- يجب أن يكون نقطة الاستقبال لديك متاحةً عبر **HTTPS** على عنوان عام
- احرص على وجود طريقة آمنة لحفظ المفتاح السري للتوقيع، فهو يُعرض مرة واحدة فقط

</div>

## نظرة عامة

خطافات الويب **صادرة** فقط: يستدعي B1 نقطة الاستقبال لديك، ولا تستدعي أنت B1. كل خطاف ويب هو اشتراك خاص بالكنيسة يتكوّن من عنوان URL للوجهة، ومفتاح سري للتوقيع، وقائمة بالأحداث المشترك فيها.

يعتمد التسليم على **صندوق صادر متين**: عند وقوع حدث مشترك فيه، يسجّل B1 صفاً للتسليم، ويرسله عامل خلفي عبر طلب POST خلال دقيقة تقريباً. تُعاد محاولات التسليم الفاشلة باستخدام تراجع أُسّي (exponential backoff). ولا تضيع أي بيانات إذا كان التسليم بطيئاً أو إذا تعطّلت نقطة الاستقبال لديك لفترة قصيرة.

## تسجيل خطاف ويب

### في B1Admin

انتقل إلى **الإعدادات ← المطوّر ← Webhooks ← خطاف ويب جديد**. أدخل اسماً، وعنوان URL للحمولة، ثم اختر الأحداث التي تريد الاشتراك فيها. عند الحفظ، **يُعرض المفتاح السري للتوقيع مرة واحدة فقط**، فانسخه فوراً واحفظه مع تكاملك. لن يُعرض مرة أخرى (يمكنك تدويره لاحقاً، لكن لا يمكنك استرجاع القيمة الأصلية).

### عبر الواجهة البرمجية (API)

جميع نقاط النهاية تقع تحت مسار وحدة العضوية الأساسي `/membership/webhooks` وتتطلب إما رمز JWT من مسؤول كنيسة يملك صلاحية `Settings / Edit`، **أو [مفتاح API](./api-keys) أُنشئ بالنطاق `settings:write`**. تقبل المسارات نفسها كلا النوعين من المصادقة. وهذا ما يتيح لـ Zapier وMake تسجيل خطافات الويب نيابةً عن الكنيسة عند تشغيل Zap أو سيناريو.

```http
POST /membership/webhooks
Authorization: Bearer <jwt>
Content-Type: application/json

{
  "name": "Zapier — new members",
  "url": "https://hooks.zapier.com/hooks/catch/123/abc",
  "events": ["person.created", "person.updated", "group.member.added"]
}
```

تتضمن استجابة الإنشاء — و**فقط** استجابة الإنشاء — الحقل `secret`:

```json
{
  "id": "a1b2c3d4e5f",
  "name": "Zapier — new members",
  "url": "https://hooks.zapier.com/hooks/catch/123/abc",
  "events": ["person.created", "person.updated", "group.member.added"],
  "active": true,
  "secret": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822c"
}
```

| الطريقة والمسار | الغرض |
|---|---|
| `GET /membership/webhooks` | عرض خطافات ويب الكنيسة (دون المفتاح السري) |
| `GET /membership/webhooks/events` | قائمة أسماء الأحداث الصالحة |
| `GET /membership/webhooks/:id` | تحميل خطاف ويب واحد |
| `POST /membership/webhooks` | الإنشاء (بدون `id`) أو التحديث (مع `id`) |
| `POST /membership/webhooks/:id/regenerate-secret` | تدوير المفتاح السري للتوقيع؛ يعيد القيمة الجديدة مرة واحدة |
| `DELETE /membership/webhooks/:id` | حذف خطاف ويب |
| `GET /membership/webhooks/:id/deliveries` | أحدث محاولات التسليم لخطاف ويب |
| `GET /membership/webhooks/deliveries/:deliveryId` | الحمولة الكاملة والاستجابة لعملية تسليم واحدة |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | إعادة جدولة عملية تسليم |

## قائمة الأحداث

تتبع أسماء الأحداث النمط `{entity}.{action}`. احصل على القائمة الحالية من `GET /membership/webhooks/events`.

| الحدث | يُطلق عندما |
|---|---|
| `person.created` | تتم إضافة شخص |
| `person.updated` | يتم تغيير سجل شخص |
| `person.destroyed` | يتم حذف شخص |
| `household.created` | تتم إضافة أسرة |
| `household.updated` | يتم تغيير أسرة |
| `household.destroyed` | يتم حذف أسرة |
| `group.created` | تتم إضافة مجموعة |
| `group.updated` | يتم تغيير مجموعة |
| `group.destroyed` | يتم حذف مجموعة |
| `group.member.added` | يُضاف شخص إلى مجموعة |
| `group.member.removed` | يُزال شخص من مجموعة |
| `donation.created` | يُسجَّل تبرع — بالإدخال اليدوي، أو عبر الإنترنت، أو عند الانتقال من حالة معلّق إلى مكتمل |
| `donation.updated` | يتم تعديل سجل تبرع |
| `attendance.recorded` | يُسجَّل حضور (بالإدخال اليدوي أو عبر تسجيل الوصول) |
| `session.created` | يتم إنشاء جلسة حضور جديدة (يدوياً أو تلقائياً عند أول تسجيل وصول) |
| `form.submission.created` | يتم إرسال نموذج |
| `event.created` | تتم إضافة حدث إلى التقويم |
| `event.updated` | يتم تعديل حدث في التقويم |
| `event.destroyed` | يتم حذف حدث من التقويم |

## تنسيق الحمولة

كل عملية تسليم هي طلب HTTP من نوع `POST` يحتوي على جسم بصيغة JSON وهذه الترويسات:

| الترويسة | الوصف |
|---|---|
| `Content-Type` | دائماً `application/json` |
| `X-B1-Event` | اسم الحدث، مثل `person.created` |
| `X-B1-Delivery-Id` | معرّف فريد لمحاولة التسليم هذه — استخدمه لإزالة التكرار |
| `X-B1-Signature` | توقيع HMAC-SHA256 للجسم الخام (انظر أدناه) |
| `X-B1-Timestamp` | الوقت المرسَل فيه الطلب بصيغة Unix (بالثواني) |
| `User-Agent` | `B1-Webhooks/1.0` |

يغلّف الجسم المورد الذي تغيّر داخل مظروف بسيط:

```json
{
  "event": "person.created",
  "churchId": "AbC123XyZ90",
  "occurredAt": "2026-05-17T14:32:08.114Z",
  "data": {
    "id": "Pq7Rs2Tu4Vw",
    "churchId": "AbC123XyZ90",
    "name": { "display": "Jordan Rivera", "first": "Jordan", "last": "Rivera" },
    "contactInfo": { "email": "jordan@example.com" }
  }
}
```

بالنسبة إلى أحداث `*.destroyed`، يحتوي الحقل `data` على `id` و`churchId` للسجل المحذوف فقط.

تحمل الأحداث التي تشير حمولاتها إلى سجلات أخرى بالمعرّف أيضاً أسماءً مقروءة، تُحلّ وقت التسليم: الحقلان `personName` و`groupName` في أحداث عضوية المجموعة، والحقل `personName` في أحداث الحضور والتبرع وعضوية القوائم، والحقل `groupName` في `session.created`، والحقل `formName` (بالإضافة إلى `personName` عندما يكون الإرسال مرتبطاً بشخص) في `form.submission.created`.

## أنواع الموصّلات

صيغة التسليم الافتراضية هي مظروف JSON أعلاه — أي `connectorType: "standard"`. أما بالنسبة إلى [Slack وDiscord](/docs/b1-admin/integrations/slack-discord)، فإن محرك خطافات الويب نفسه يرسل بدلاً من ذلك رسالة بشكل المحادثة تقبلها هاتان الخدمتان مباشرة:

| قيمة `connectorType` | الجسم المرسل | متى تستخدمه |
|---|---|---|
| `"standard"` (الافتراضي) | مظروف `{event, churchId, occurredAt, data}` موقّع | عندما تكتب تكاملك الخاص، أو توجّهه إلى Zapier / Make / خادم مخصص |
| `"slack"` | `{ "text": "💝 New donation: $50.00" }` | عندما ترسل مباشرة إلى عنوان URL لـ Slack Incoming Webhook |
| `"discord"` | `{ "content": "💝 New donation: $50.00" }` | عندما ترسل مباشرة إلى عنوان URL لخطاف قناة Discord |
| `"mailchimp"` | غير متاح — الموصّل يستدعي واجهة Mailchimp البرمجية بنفسه | عندما تريد [مزامنة الجمهور](/docs/b1-admin/integrations/services/mailchimp) دون عنوان URL تستضيفه |

يُحدَّد نوع الموصّل من القائمة المنسدلة **Connector Type** في محرر خطاف الويب، أو عبر `connectorType` في جسم `POST /membership/webhooks`. لا تزال ترويسة `X-B1-Signature` الموقّعة تُرسل مع عمليات تسليم Slack وDiscord (وهما تتجاهلانها دون ضرر)، لذا فإن التحويل لاحقاً إلى `standard` لا يتطلب إعادة توقيع.

تُعد Slack وDiscord مجرد إعادة تشكيل للجسم؛ إذ يرسل المحرك ما يزال إلى عنوان URL الذي توفره الكنيسة. أما `mailchimp` فهو أول موصّل يتولى بنفسه تبادل HTTP الخاص به: لكل حدث، يُرسل طلبات مصادَقاً عليها لإضافة/تحديث/أرشفة/وسم عبر واجهة Mailchimp البرمجية (`MailchimpConnector.deliver`)، وتُخزَّن بياناته الاعتمادية (`{apiKey, audienceId}`) مشفّرة بخوارزمية AES في `webhooks.connectorConfig`، وتكون للكتابة فقط عبر الواجهة البرمجية. لا تقبل خطافات Mailchimp إلا أحداث الشخص وعضوية المجموعة وعضوية القائمة، ويتحقق مسار الحفظ من المفتاح والجمهور لدى Mailchimp قبل القبول. تحفظ صفوف التسليم المظروف القياسي، لذا يُظهر سجل التسليم ما رآه B1 مع استجابة Mailchimp. أما الحالات غير المعيّنة (شخص بلا بريد إلكتروني، أو حدث بلا تعيين) فتُكمل بنجاح مع نص استجابة يبدأ بـ `Skipped:` بدلاً من استهلاك المحاولات.

## عمليات التسليم التجريبية

يحتوي كل محرر خطاف ويب على زر **Send Test Event**، ويقابله استدعاء الواجهة البرمجية `POST /membership/webhooks/:id/test`. يبني مسار الاختبار حمولة اصطناعية للحدث المشترك فيه الأول، ويرسلها فوراً عبر مسار التسليم الموقّع الحقيقي (ومن خلال `formatForConnector` بالنسبة إلى Slack وDiscord)، ويعيد صف التسليم الناتج متضمناً `responseStatus` و`responseBody`. استخدمه للتأكد من الاتصال ومعالجة التوقيع قبل تفعيل التكامل فعلياً. أما بالنسبة إلى خطافات `mailchimp`، فيتحقق الاختبار بدلاً من ذلك من بيانات الاعتماد المخزَّنة لدى واجهة Mailchimp البرمجية (لأن الحدث الاصطناعي سيكتب مشتركاً وهمياً في الجمهور الحقيقي للكنيسة)، ويعيد نتيجة بشكل التسليم دون إنشاء صف.

## التحقق من التوقيعات

تحقّق دائماً من `X-B1-Signature` قبل الوثوق بأي حمولة. التوقيع هو `sha256=` متبوعاً بقيمة HMAC-SHA256 بالترميز السداسي عشري للـ**جسم الخام للطلب**، مُفتاحةً بمفتاحك السري للتوقيع. احسب التوقيع على البايتات التي استلمتها — ولا تُعِد تسلسل كائن JSON المحلَّل.

**Node.js**

```js
const crypto = require("crypto");

function isValid(rawBody, signatureHeader, secret) {
  const expected = "sha256=" + crypto.createHmac("sha256", secret).update(rawBody, "utf8").digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signatureHeader || "");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
```

**Python**

```python
import hashlib, hmac

def is_valid(raw_body: bytes, signature_header: str, secret: str) -> bool:
    expected = "sha256=" + hmac.new(secret.encode(), raw_body, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, signature_header or "")
```

**PHP**

```php
function isValid(string $rawBody, string $signatureHeader, string $secret): bool {
    $expected = "sha256=" . hash_hmac("sha256", $rawBody, $secret);
    return hash_equals($expected, $signatureHeader ?? "");
}
```

ارفض أي طلب لا يتطابق توقيعه. يمكنك أيضاً، اختيارياً، رفض الطلبات التي يزيد عمر `X-B1-Timestamp` فيها على بضع دقائق، للحد من نافذة إعادة التشغيل.

## دعم SDK

بالنسبة إلى Node.js، يوفّر الحزمة `@churchapps/integration-sdk` أداة تحقق مُكتوبة بأنواع البيانات، وبرمجية وسيطة (middleware) لـ Express تتولى عنك التقاط الجسم الخام، والتحقق من التوقيع، وتحليل المظروف:

```ts
import express from "express";
import { b1WebhookMiddleware } from "@churchapps/integration-sdk";

const app = express();
// Capture the raw body before JSON parsing — required so the signature still verifies.
app.use(express.json({ verify: (req, _res, buf) => { (req as any).rawBody = buf; } }));

app.post("/webhooks/b1", b1WebhookMiddleware({ secret: process.env.B1_WEBHOOK_SECRET! }), (req, res) => {
  const env = req.b1Webhook!;
  switch (env.event) {
    case "donation.created": console.log("new gift", env.data.amount); break;
  }
  res.sendStatus(200);
});
```

يوفّر SDK أيضاً الدالة `WebhookVerifier.verify(secret, rawBody, signatureHeader)` لبيئات التشغيل غير Express (مثل الدوال بلا خادم، أو Fastify وغيرها). راجع الحزمة على npm للمزيد.

## التسليم وإعادة المحاولة

ينبغي أن ترد نقطة الاستقبال لديك برمز حالة `2xx` بأسرع ما يمكن — ويفضَّل أن يكون ذلك بعد وضع العمل في قائمة الانتظار فقط، لا بعد معالجته. يُعدّ أي رد غير `2xx`، أو فشل في الاتصال، أو رد يستغرق أكثر من **10 ثوانٍ**، عملية تسليم فاشلة.

تُعاد محاولات التسليم الفاشلة باستخدام تراجع أُسّي — **16 محاولة على مدى نحو 5 أيام**. تبدأ الفترة من دقيقة واحدة، ثم تمتد إلى ساعات، وصولاً إلى فجوات مدتها 3 أيام للمحاولات الأخيرة. بعد المحاولة الفاشلة السادسة عشرة، تُوسَم عملية التسليم بالحالة `exhausted` وتُهمل.

التسليم **مرة واحدة على الأقل** (at-least-once): قد تصل عملية التسليم أكثر من مرة (على سبيل المثال، إذا نجحت نقطة الاستقبال لديك لكن الرد ضاع). استخدم ترويسة `X-B1-Delivery-Id` لإزالة التكرار — عالج كل معرّف مرة واحدة فقط، واعتبر التكرارات بلا أثر.

### التعطيل التلقائي

إذا أنتج خطاف ويب **ثلاث عمليات تسليم متتالية بالحالة `exhausted`**، يعطّله B1 تلقائياً. أصلح نقطة الاستقبال لديك، ثم أعد تفعيل خطاف الويب من B1Admin (أو عبر `POST /membership/webhooks` مع `"active": true`).

## الفحص وإعادة التسليم

يعرض محرر خطاف الويب في B1Admin جدولاً باسم **Recent Deliveries** يتضمن الحدث، والحالة، وعدد المحاولات، ورمز الاستجابة، والطابع الزمني. عند اختيار صف، تظهر الحمولة الكاملة التي أُرسلت والاستجابة التي عادت.

استخدم **Redeliver** لإعادة جدولة أي عملية تسليم سابقة بحمولتها الأصلية — وهذا مفيد بعد إصلاح خلل في نقطة الاستقبال لديك، أو لاستعادة أحداث فاتتها أثناء تعطّلها.

## متطلبات عنوان URL

بما أن عناوين URL لخطافات الويب توفّرها الكنيسة، يفرض B1 ضوابط حماية من تزوير الطلبات من جانب الخادم (SSRF). يُرفض عنوان URL لخطاف الويب — عند التسجيل، ويُعاد التحقق منه قبل كل عملية تسليم — إذا:

- لم يكن يستخدم **`https`**
- كان يشير إلى `localhost` أو اسم مضيف بالنطاق `.local` / `.internal`، أو
- كان يُحلّ إلى عنوان IP **خاص، أو loopback، أو link-local، أو خاص ببيانات تعريف السحابة (cloud metadata)**

يجب أن تكون نقطة الاستقبال لديك خدمة HTTPS عامة يمكن الوصول إليها.
