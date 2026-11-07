---
title: "Donorbox"
---

# Donorbox

<div class="article-intro">

إذا كانت كنيستك تستقبل التبرعات عبر Donorbox لكنها تتتبع الأشخاص وكشوفات التبرعات في B1، يمكنك جعل مشغّلات Zapier الفورية من Donorbox تُنشئ سجلات تبرع مطابقة داخل B1، وتُنشئ المتبرع كشخص في B1 إذا لم يكن موجودًا. دون مطابقة يدوية، ودون تصدير شهري.

</div>

<div class="prereqs">
<h4>قبل أن تبدأ</h4>

- حساب [Donorbox](https://donorbox.org) يحتوي على حملة واحدة على الأقل
- حساب [Zapier](https://zapier.com)
- مستخدم B1Admin يملك صلاحية **Edit Settings**

</div>

## ما يمكنك ربطه

| الاتجاه | مشغّل Donorbox | إجراء B1 |
|---|---|---|
| Donorbox → B1 | New or Updated Donation (فوري) | Find Person → Add Donation |
| Donorbox → B1 | New or Updated Donor | Create Person |
| Donorbox → B1 | New or Updated Plan (متكرر) | Find Person → Add Donation (استخدم معرّف الخطة كملاحظة) |

يُصدر Donorbox مشغّلاته كـ **فورية**، أي أنها تعمل خلال ثوانٍ من كل تبرع حقيقي. لا يوجد أي تأخير في الاستعلام.

## الإعداد

### 1. إنشاء مفتاح API في B1

في B1Admin: **Settings → Developer → API Keys → New API Key**. النطاقات المطلوبة:

- `people:read` للبحث عن المتبرع بالبريد الإلكتروني
- `people:write` لإنشائه إذا كان جديدًا
- `donations:write` لتسجيل الهبة

المشغّلات في هذا الاتجاه تابعة لـ Donorbox وليست لـ B1، لذلك لا تحتاج إلى `settings:write` هنا.

### 2. بناء Zap "تسجيل تبرع"

1. **المشغّل:** Donorbox: New Donation. اربط الحساب بمفتاح API الخاص بـ Donorbox (في Donorbox: *Account → Profile → API Settings*).
2. **الإجراء:** B1.church: Find Person. اربط البريد الإلكتروني للمتبرع من المشغّل بحقل البحث *Email*.
3. **الإجراء:** Filter by Zapier (اختياري): تابع فقط إذا لم يُعثر على المتبرع، ثم…
4. **الإجراء:** B1.church: Create Person. اربط الاسم الأول والأخير والبريد الإلكتروني ليُضاف المتبرع كعضو، وليس مجرد سجل تبرع.
5. **الإجراء:** B1.church: Add Donation. اربط:
   - Amount → `data.amount`
   - Donation Date → تاريخ التبرع من المشغّل
   - Fund → اختر صندوق B1 الذي يعكس حملة Donorbox (يتيح Zapier تبديل الصناديق بناءً على فلتر أو خطوة Formatter)
   - Method → "Online"
   - Notes → معرّف معاملة Donorbox (مفيد عند المطابقة)

فعّل الـ Zap. سيظهر أول تبرع حي عبر Donorbox تلقائيًا في **B1Admin → Donations**.

## وصفات شائعة

### Zap واحد لكل صندوق

إذا كانت لديك حملات متعددة في Donorbox تُطابق صناديق منفصلة في B1، فأنظف تنظيم هو Zap واحد لكل حملة، مع فلتر *campaign* من Donorbox في البداية. بهذه الطريقة يكون ربط الصندوق ثابتًا في الإعداد، فتتجاوز خطوة البحث.

### اعتبر التبرعات المحدَّثة تصحيحات

يُطلَق حدث *New or Updated Donation* عند التعديلات أيضًا. استخدم خطوة *Path* في Zapier على `event_type` للتفريع: "new" ← Add Donation، و"updated" ← Find Donation + Update. (ملاحظة: إجراء Zapier الخاص بـ B1 لا يملك حاليًا إجراء Update Donation، لذا في الوقت الحالي سجّل أحداث "updated" في قناة Slack لمراجعتها يدويًا.)

### مزامنة تغييرات الخطط المتكررة إلى قناة Slack

- **المشغّل:** Donorbox: New or Updated Plan
- **الإجراء:** Slack: Send Message إلى `#donations` (مثال: "تغيّرت الخطة. هبة سارة الشهرية أصبحت الآن 200 دولار")

## القيود والملاحظات

- **طابِق المتبرعين بالبريد الإلكتروني.** لا يشارك Donorbox معرّف الشخص في B1، والمفتاح الوحيد الثابت للربط هو البريد الإلكتروني. المتبرعون الذين يتبرعون ببريد إلكتروني مختلف سيُنشأ لهم شخص جديد في B1، لذا ينبغي أن تبحث عن هذه الحالات في مطابقتك الشهرية.
- **لا تُعرض المبالغ المستردة بشكل منفصل.** يُصدر Donorbox تحديث حالة على التبرع نفسه. إجراء Zapier الخاص بـ B1 لا يملك حاليًا إجراء *Update Donation*، لذا فالنمط الآمن اليوم هو تسجيل أحداث الاسترداد خارج النظام وتعديل التبرع يدويًا.
- **اختبر أولاً في بيئة الاختبار (sandbox) الخاصة بـ Donorbox** لتجنب إنشاء تبرعات وهمية في B1 الإنتاجي. يوفّر Donorbox بيانات اعتماد وضع الاختبار منفصلة عن البيانات الحية.

## استكشاف الأخطاء وإصلاحها

- **تحذير "Person not found" في كل تشغيل:** هذا طبيعي إذا رتّبت الخطوات بحيث يعمل *Create Person* في فرع "not found". إذا لم تُنفَّذ خطوة *Create Person* أيضًا، فتحقق من أن مفتاح API يملك صلاحية `people:write`.
- **مبلغ التبرع يبدو أكبر أو أصغر بمئة ضعف:** يرسل Donorbox المبالغ بالسنتات في بعض صيغ البيانات وبالدولارات في غيرها. استخدم خطوة *Formatter by Zapier — Numbers* للقسمة على 100 عند الحاجة.
- **تبرعات مكررة من هبة واحدة:** يُطلق Donorbox حدثي *New Donation* و*Updated Donation* معًا. إما أن تفلتر إلى `event_type = "donation.succeeded"`، أو تبني Zapين بفلاتر غير متداخلة.

## انظر أيضًا

- [نظرة عامة على Zapier](../zapier): الجانب الخاص بـ B1 في كل وصفات Zapier
- [Subsplash](./subsplash): منصة تبرع أخرى لديها تطبيق Zapier
- [Mailchimp](./mailchimp): اربط "هبة جديدة" بوسم بريد إلكتروني
