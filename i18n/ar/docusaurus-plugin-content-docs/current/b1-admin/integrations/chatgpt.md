---
title: "ChatGPT"
description: "اربط ChatGPT ببيانات B1 الخاصة بكنيستك بمفتاح API لتطرح أسئلة بلغة بسيطة حول الأشخاص والعطاء والحضور في B1 Admin."
---

# ChatGPT

<div class="article-intro">

اربط ChatGPT ببيانات B1 الخاصة بكنيستك واطرح عليه الأسئلة بلغة عادية، فيجيب من سجلات كنيستك الحية. يمكنك أيضًا أن تطلب منه المساعدة في المهام التي تتطلب عدة خطوات في B1 Admin.

**أمثلة على ما يمكنك أن تسأله:**
- *"أرني كل من حضر الأسبوع الماضي ولم يُسند إلى مجموعة صغيرة"*
- *"لخّص عطاء هذا الشهر حسب الصندوق"*
- *"من هم أحدث أعضائنا، وهل تابعنا معهم؟"*
- *"لا أعرف كيف أفعل كذا في B1، هل يمكنك أن ترشدني خطوة بخطوة؟"*

</div>

<div class="prereqs">
<h4>ما تحتاجه</h4>

- **تطبيق ChatGPT لسطح المكتب** لنظام Mac أو Windows
- **خطة ChatGPT مدفوعة** (Plus أو أعلى). لا يمكن للحسابات المجانية الاتصال بـ B1.
- **تسجيل دخولك إلى B1** مع صلاحية إدارة إعدادات الكنيسة (لازمة لإنشاء المفتاح). إن لم يكن لديك، فاسأل مسؤول B1 في كنيستك.

</div>

:::tip ننصح بتجربة Claude أولًا، فهو مجاني
[Claude](./claude.md) يتصل بـ B1 ضمن **خطته المجانية**، ويُعدّ في أقل من 3 دقائق. كل ما عليك إضافة B1 كموصل وتسجيل الدخول بحسابك في B1. لا حاجة إلى مفتاح. وهو أسهل طريقة لتجربة كنيستك للذكاء الاصطناعي مع B1 قبل الدفع مقابل أي شيء.
:::

## الإعداد

قد تبدو الشاشات مختلفة قليلًا في نسختك من ChatGPT.

---

**الخطوة 1 — أنشئ مفتاح B1 الخاص بك**

المفتاح هو ما يسمح لـ ChatGPT بالدخول إلى B1 *الخاص بكنيستك*. فكّر فيه كأنه كلمة مرور مخصصة لـ ChatGPT فقط.

1. سجّل الدخول إلى [B1 Admin](https://admin.b1.church) وانتقل إلى [Settings → Developer](https://admin.b1.church/settings/developer).
2. في تبويب **API Keys**، انقر على **New API Key** وسمِّه `ChatGPT`.
3. **النطاقات (Scopes):** حدِّد ما يُسمح لـ ChatGPT بفعله. لكل مجال مربع **read** (للقراءة فقط) ومربع **write** (لإجراء التغييرات). إن لم تكن متأكدًا، فحدِّد مربعات **read** فقط للبداية.
4. انقر على **Save**، ثم على **Copy** لنسخ المفتاح (يبدأ بـ `cak_`). يُعرض مرة واحدة فقط.

---

**الخطوة 2 — انقر على اسمك في الزاوية السفلية اليسرى من ChatGPT**

![انقر على اسم ملفك الشخصي](/img/guides/chatgpt-mcp/01.png)

---

**الخطوة 3 — انقر على Settings**

![انقر على Settings من القائمة](/img/guides/chatgpt-mcp/02.png)

---

**الخطوة 4 — انقر على Plugins في الشريط الجانبي الأيسر**

![انقر على Plugins ضمن Integrations](/img/guides/chatgpt-mcp/03.png)

---

**الخطوة 5 — انقر على تبويب MCPs**

![انقر على تبويب MCPs](/img/guides/chatgpt-mcp/04.png)

ستجد هنا أي خوادم MCP أضفتها سابقًا.

---

**الخطوة 6 — انقر على Add ← Add MCP server**

![انقر على Add ثم Add MCP server](/img/guides/chatgpt-mcp/06.png)

---

**الخطوة 7 — املأ النموذج وانقر على Save**

![نموذج الاتصال بخادم MCP مخصص](/img/guides/chatgpt-mcp/07.png)

انقر على **Streamable HTTP**، ثم املأ الحقول التالية:

| الحقل | ما تدخله |
|---|---|
| **Name** | `B1 Church` (أو أي اسم تفضله) |
| **Type** | انقر على **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | اتركه فارغًا |
| **Headers** | انقر على **+ Add header** ← Key: `Authorization` ← Value: انظر أدناه |

![مثال على الحقول المملوءة يوضح Authorization في خانة Key وBearer مع المفتاح في خانة Value](/img/guides/chatgpt-mcp/08.png)

- **Key:** `Authorization`
- **Value:** `Bearer cak_yourkey` — كلمة Bearer، ثم مسافة، ثم مفتاحك

انقر على **Save**.

وهذا كل شيء! ارجع إلى أي محادثة واسأل شيئًا مثل *"كم عدد الأشخاص في كنيستنا؟"*، وسيستخرج ChatGPT الجواب مباشرة من B1.

---

## هل هو آمن؟

- لا يستطيع ChatGPT رؤية إلا بيانات **كنيستك**.
- لا يستطيع فعل إلا ما يسمح به مفتاحك. فالمفتاح الذي لا تُحدَّد فيه إلا مربعات **read** يمكنه القراءة فقط ولا يمكنه إجراء أي تغيير أبدًا.
- لإيقافه، احذف المفتاح من B1 Admin عبر **Settings → Developer**. يتوقف الوصول فورًا.

## كم تكلفته؟

الاتصال بـ B1 مجاني، فهو جزء من ChurchApps. يحتاج ChatGPT إلى خطة مدفوعة (Plus أو أعلى) للاتصال، راجع أسعار OpenAI.

## التفاصيل التقنية

بقية هذه الصفحة موجهة إلى المستخدمين التقنيين ومساعدي الذكاء الاصطناعي. يوجد خادم MCP الخاص بـ B1 على `https://api.churchapps.org/mcp` (Streamable HTTP)، ويستقبل مفتاح API كترويسة `Authorization: Bearer cak_…`. راجع [مرجع مطوّر خادم MCP](/docs/developer/api/mcp).

### GPT مخصص مع Actions

يتيح لك GPT المخصص إنشاء مساعد مخصص يمكن لفريقك كله مشاركته، فيفتحون الرابط ويبدأون بطرح الأسئلة دون أي إعداد من جهتهم. يتطلب حساب ChatGPT Plus أو Team أو Enterprise، ويستغرق نحو 10 دقائق.

#### 1. أنشئ مفتاح API

اتبع الخطوة 1 من قسم "الإعداد" أعلاه إذا لم تكن قد فعلت ذلك.

#### 2. أنشئ GPT المخصص

1. في ChatGPT، انقر على ملفك الشخصي ← **My GPTs** ← **Create a GPT**.
2. انتقل إلى تبويب **Configure**، وأعطِ الـ GPT اسمًا (مثل "مساعد B1")، وأضف التعليمات:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. انتقل إلى **Actions** ← **Create new action** ← **Authentication**.
   - **Authentication type:** API Key
   - **API Key:** الصق مفتاح `cak_…` الخاص بك
   - **Auth Type:** Bearer
   - احفظ.

4. في مربع **Schema**، الصق مواصفة OpenAPI الأولية هذه:

   ```yaml
   openapi: 3.1.0
   info:
     title: B1 API
     version: "1.0"
   servers:
     - url: https://api.churchapps.org
   paths:
     /membership/people:
       get:
         operationId: listPeople
         summary: List people in the church
         parameters:
           - in: query
             name: firstName
             schema: { type: string }
           - in: query
             name: lastName
             schema: { type: string }
           - in: query
             name: email
             schema: { type: string }
         responses:
           "200":
             description: OK
     /membership/people/{id}:
       get:
         operationId: getPerson
         summary: Get a single person by id
         parameters:
           - in: path
             name: id
             required: true
             schema: { type: string }
         responses:
           "200":
             description: OK
     /membership/groups:
       get:
         operationId: listGroups
         summary: List groups in the church
         responses:
           "200":
             description: OK
     /giving/donations:
       get:
         operationId: listDonations
         summary: List donations
         parameters:
           - in: query
             name: personId
             schema: { type: string }
           - in: query
             name: startDate
             schema: { type: string, format: date }
           - in: query
             name: endDate
             schema: { type: string, format: date }
         responses:
           "200":
             description: OK
     /attendance/attendance:
       get:
         operationId: listAttendance
         summary: List attendance records
         parameters:
           - in: query
             name: serviceTimeId
             schema: { type: string }
           - in: query
             name: campusId
             schema: { type: string }
         responses:
           "200":
             description: OK
   ```

5. احفظ الإجراء (Action). ثم اختبره: *"كم عدد الأشخاص في الكنيسة؟"*. يستدعي ChatGPT الدالة `listPeople` ويجيب.
6. **انشر** الـ GPT (Only me / Anyone with link / Organization) وشارك الرابط مع فريقك.

#### 3. استخدامه

يمكن لأي شخص يملك الرابط أن يطرح أسئلة بلغة طبيعية. تظل نطاقات المفتاح سارية، فالمفتاح المقروء فقط يرفض عمليات الكتابة مهما قالت مواصفة الإجراء.

---

### الأمان والحدود

- **عزل كل كنيسة على حدة.** يرتبط مفتاح API بكنيسة واحدة فقط. لا يستطيع ChatGPT رؤية بيانات الكنائس الأخرى.
- **مقيّد بالصلاحيات.** يحمل المفتاح النطاقات التي منحتها فقط. وإزالة نطاق (بحذف المفتاح وإنشاء آخر) تقطع هذا الوصول عند الاستدعاء التالي.
- **قابل للإلغاء فورًا.** احذف المفتاح من **Settings ← Developer ← API Keys** فينتهي الوصول فورًا.
- **مشاركة GPT المخصص تعني مشاركة البيانات.** يستطيع كل من له حق الوصول إلى الـ GPT رؤية كل ما تسمح به نطاقات المفتاح. فضّل نطاقات أضيق (مثل حذف `donations:read`) للـ GPT الذي سيُشارَك على نطاق واسع.
- **سجل التدقيق.** أي تغييرات تُجرى عبر ChatGPT تمر عبر سجل التدقيق نفسه الخاص بإجراءات B1 Admin، ويمكنك العثور عليها ضمن **Settings ← Audit Log**.

### استكشاف الأخطاء وإصلاحها

**يقول موصل MCP "Unauthorized" أو يظهر خطأ 401:** مفتاح API مفقود أو غير صحيح. افتح إعدادات الموصل وتحقق من ترويسة **Authorization**: يجب أن تكون القيمة كلمة `Bearer`، ثم مسافة واحدة، ثم مفتاح `cak_…` كاملًا دون أي مسافات زائدة.

**يقول ChatGPT إنه لا يستطيع العثور على بيانات معينة:** قد لا يملك المفتاح النطاقات المناسبة. أنشئ مفتاحًا جديدًا في **Settings ← Developer ← API Keys** بالنطاقات الإضافية، وحدّث الموصل.

**يعيد إجراء GPT المخصص خطأ 401:** في لوحة المصادقة الخاصة بالإجراء، تأكد من اختيار **Auth Type: Bearer**، وأن المفتاح لا يتضمن كلمة `Bearer` (يضيفها ChatGPT تلقائيًا).

**يعيد إجراء GPT المخصص خطأ 403:** المفتاح لا يملك النطاق المطلوب لنقطة النهاية هذه. أنشئ مفتاحًا جديدًا بالنطاقات الصحيحة، وحدّث الـ GPT.

**يتم رفض مواصفة الإجراء (Action Schema):** يتطلب ChatGPT مواصفة OpenAPI 3.1 مع مدخل `paths` واحد على الأقل وعنوان URL في `servers`. تحقق من صحة YAML على [editor.swagger.io](https://editor.swagger.io) قبل لصقه.

## ذات صلة

- [API Keys](/docs/developer/api/api-keys) — مرجع النطاقات الكامل
- [MCP Server (مرجع المطوّر)](/docs/developer/api/mcp) — تفاصيل البروتوكول ومخططات الأدوات
- [Claude](./claude.md) — الفكرة نفسها، لنماذج Anthropic
- [مرجع REST API](/docs/developer/api/endpoints) — كل نقطة نهاية يمكن لإجراء GPT مخصص استدعاؤها
