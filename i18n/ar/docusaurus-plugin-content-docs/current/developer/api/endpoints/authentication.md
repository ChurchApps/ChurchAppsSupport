---
title: "المصادقة والصلاحيات"
description: "مرجع تسجيل الدخول عبر JWT والتحقق بخطوتين وتدفقات OAuth 2.0 ونموذج الأذونات في واجهة ChurchApps البرمجية، للمطورين الذين يبنون التكاملات."
---

# المصادقة والصلاحيات

<div class="article-intro">

تستخدم واجهة ChurchApps البرمجية (API) المصادقة المعتمدة على JWT. يسجّل المستخدم الدخول فيحصل على رمز (token) يحمل هويته وعضويته في الكنيسة وصلاحياته. تشرح هذه الصفحة آلية تسجيل الدخول ونموذج الصلاحيات ودعم OAuth.

</div>

## تدفّق تسجيل الدخول

### تسجيل الدخول القياسي

```
POST /membership/users/login
```

**المصادقة:** عامة

يقبل ثلاثة أنواع من بيانات الاعتماد:

| الحقل | الوصف |
|-------|-------|
| `email` + `password` | تسجيل الدخول العادي بالبريد الإلكتروني وكلمة المرور |
| `jwt` | إعادة المصادقة باستخدام JWT موجود |
| `authGuid` | رابط مصادقة لمرة واحدة (يُستخدم في رسائل الترحيب وإعادة التعيين) |

**الاستجابة:**

```json
{
  "user": {
    "id": "abc-123",
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane@example.com"
  },
  "churches": [
    {
      "church": { "id": "church-1", "name": "First Church", "subDomain": "firstchurch" },
      "person": { "id": "person-1", "membershipStatus": "Member" },
      "groups": [{ "id": "group-1", "name": "Choir", "leader": false }],
      "apis": [
        {
          "keyName": "MembershipApi",
          "permissions": [
            { "contentType": "People", "action": "View" },
            { "contentType": "People", "action": "Edit" }
          ]
        }
      ]
    }
  ],
  "token": "<jwt-token>"
}
```

الحقل `token` هو JWT يجب إرساله في الطلبات اللاحقة بالشكل `Authorization: Bearer <token>`.

### تسجيل الدخول بالتحقق بخطوتين

يمكن للمستخدمين تفعيل التحقق بخطوتين عبر تطبيق المصادقة (TOTP). بالنسبة لهؤلاء المستخدمين، لا يُرجع تسجيل الدخول بالبريد الإلكتروني وكلمة المرور أو برابط `authGuid` أو بتسجيل الدخول الموحّد (SSO) رمزًا، بل يُرجع تحديًا بدلًا من ذلك:

```json
{ "mfaRequired": true, "mfaToken": "<challenge-token>" }
```

يبقى رمز التحدي صالحًا لمدة 5 دقائق. أرسله مرة أخرى إلى نفس نقطة النهاية مع الرمز:

```json
{ "mfaToken": "<challenge-token>", "mfaCode": "123456" }
```

يمكن أن يكون `mfaCode` رمز التطبيق الحالي المكوّن من 6 أرقام، أو أحد رموز النسخ الاحتياطي العشرة للاستخدام مرة واحدة الخاصة بالمستخدم. يُرجع الرمز الخاطئ الرسالة `Invalid code`، ويُقيَّد عدد المحاولات الفاشلة المتكررة لكل حساب. لا يُطلب التحقق عند إعادة تسجيل الدخول باستخدام `jwt`، فتستمر الجلسات الحالية في التجديد. يحتوي كائن `user` في استجابة تسجيل الدخول على الحقل `mfaEnabled`.

نقاط نهاية الخدمة الذاتية (للمستخدم المسجّل دخوله فقط، تحت `/membership/users/mfa`):

| نقطة النهاية | الوصف |
|----------|-------|
| `GET /status` | `{ enabled, backupCodesLeft }` |
| `POST /setup` | يبدأ الإعداد؛ يُرجع `{ secret, otpauthUrl }` لرمز QR |
| `POST /enable` | الجسم `{ code }`؛ يفعّل التحقق ويُرجع `{ backupCodes }` مرة واحدة فقط |
| `POST /disable` | الجسم `{ code }` (رمز التطبيق أو رمز النسخ الاحتياطي)؛ يعطّل التحقق |
| `POST /reset/:userId` | لمسؤول الخادم (Server.Admin) فقط؛ يعطّل التحقق لمستخدم آخر |

تُخزَّن الأسرار مشفّرة، وتُخزَّن رموز النسخ الاحتياطي على شكل تجزئات (hashes). تُسجَّل عمليات التفعيل والتعطيل وإعادة التعيين في سجل التدقيق.

### محتويات الرمز

يحمل JWT المعلومات التالية:
- `id` — معرّف المستخدم
- `churchId` — الكنيسة المختارة حاليًا
- `personId` — سجل الشخص في الكنيسة المختارة
- مصفوفات الصلاحيات لكل واجهة برمجية

### اختيار الكنيسة

قد ينتمي المستخدم إلى أكثر من كنيسة. تتضمن استجابة تسجيل الدخول جميع الكنائس مع صلاحيات كل منها. للتبديل بين الكنائس، يُنشئ العميل JWT جديدًا محددًا بكنيسة أخرى من بيانات استجابة تسجيل الدخول.

## تسجيل المستخدمين

### تسجيل مستخدم جديد

```
POST /membership/users/register
```

**المصادقة:** عامة

```json
{
  "email": "jane@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "appName": "B1 Admin",
  "appUrl": "https://app.b1.church"
}
```

يُنشئ هذا الطلب مستخدمًا بكلمة مرور مؤقتة ويرسل رسالة ترحيب تتضمن رابط مصادقة. يُمنح أول مستخدم يُسجَّل في نسخة جديدة صلاحية مسؤول الخادم تلقائيًا.

تُقبل حقلان اختياريان لمصيدة الروبوتات: `website` (حقل مخفي يتركه المستخدمون الحقيقيون فارغًا) و`fillMs` (المدة التي بقي فيها النموذج مفتوحًا بالمللي ثانية). إذا مُلئ الحقل `website` أو كانت قيمة `fillMs` أقل من 2000، فلن يُنشأ أي حساب، لكن نقطة النهاية تُرجع استجابة `200` عادية حتى لا يتمكن الروبوتات من معرفة أنها رُفضت. أما العملاء الذين يحذفون الحقلين فيُسجَّلون بشكل عادي.

### تسجيل كنيسة جديدة

```
POST /membership/churches/add
```

**المصادقة:** JWT

بعد تسجيل المستخدم، استدعِ نقطة النهاية هذه لإنشاء كنيسة وربط المستخدم بها.

## إدارة كلمات المرور

| الطريقة | المسار | المصادقة | الوصف |
|--------|------|------|-------|
| POST | `/membership/users/forgot` | عامة | إرسال رسالة إعادة تعيين كلمة المرور. الجسم: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | عامة | تعيين كلمة مرور جديدة باستخدام معرّف المصادقة من رسالة إعادة التعيين. الجسم: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | تغيير كلمة مرور المستخدم الحالي. الجسم: `{ "newPassword": "..." }` |

## نموذج الصلاحيات

تُنظَّم الصلاحيات حسب الوحدة، وتُسنَد إلى المستخدمين عبر الأدوار. لكل صلاحية **نوع محتوى** و**إجراء**.

### مرجع الصلاحيات

| قسم العرض | نوع المحتوى | الإجراء | الوصف |
|----------------|--------------|--------|-------|
| **الحضور** | Attendance | Checkin | تسجيل حضور الأعضاء في الخدمات |
| | Attendance | Edit | تعديل سجلات الحضور |
| | Services | Edit | إدارة الخدمات وأوقاتها |
| | Attendance | View | عرض سجلات الحضور |
| | Attendance | View Summary | عرض ملخصات الحضور والتقارير |
| **التبرعات** | Donations | Edit | إنشاء سجلات التبرعات وتعديلها |
| | Settings | Edit | تعديل إعدادات العطاء والدفع |
| | Donations | View Summary | عرض تقارير ملخص التبرعات |
| | Donations | View | عرض سجلات التبرعات الفردية |
| **الأشخاص والمجموعات** | Forms | Admin | إدارة النماذج بالكامل |
| | Forms | Edit | تعديل تعريفات النماذج |
| | Plans | Edit | تعديل خطط الخدمة |
| | Group Members | Edit | إضافة أعضاء المجموعات وإزالتهم |
| | Groups | Edit | إنشاء المجموعات وتعديلها |
| | Households | Edit | تعديل تعيينات الأسر |
| | People | Edit | تعديل أي سجل شخص |
| | People | Edit Self | تعديل سجل الشخص الخاص بك فقط |
| | Roles | Edit | إدارة الأدوار وتعيينات المستخدمين |
| | Group Members | View | عرض قوائم أعضاء المجموعات |
| | People | View Members | عرض الأعضاء فقط (دون الزوار) |
| | People | View | عرض جميع الأشخاص |
| | Roles | View | عرض الأدوار والتعيينات |
| | Settings | Edit | تعديل إعدادات الكنيسة |
| **المحتوى** | Content | Edit | تعديل الصفحات والأقسام والعناصر |
| | Settings | Edit | تعديل إعدادات المحتوى |
| | StreamingServices | Edit | إدارة إعدادات خدمات البث |
| | Chat | Host | استضافة جلسات الدردشة والإشراف عليها |
| **المراسلة** | Texting | Send | إرسال رسائل SMS نصية |

### كيفية التحقق من الصلاحيات

في وحدات التحكم (controllers)، تُتحقَّق الصلاحيات باستخدام الدالة `au.checkAccess()`:

```typescript
// طلب صلاحية محددة
if (!au.checkAccess(Permissions.people.edit)) return this.json({}, 401);

// أو ضمن actionWrapper — يتحقق نظام CRUD تلقائيًا
crudSettings: {
  permissions: {
    view: Permissions.people.view,
    edit: Permissions.people.edit
  }
}
```

### مسؤول الخادم

تمنح الصلاحية `Server.Admin` وصولًا كاملًا عبر جميع الكنائس. تُسنَد هذه الصلاحية إلى أول مستخدم مسجَّل، ويمكن منحها لغيره عبر دور مسؤول الخادم.

## OAuth 2.0

تدعم واجهة البرمجة OAuth 2.0 للتكاملات مع أطراف ثالثة. يتوفر نوعان من المنح.

### تدفّق رمز التفويض (Authorization Code)

1. **التفويض:** `POST /membership/oauth/authorize` (يتطلب JWT)
   - الجسم: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "...", "code_challenge": "...", "code_challenge_method": "S256" }`
   - الحقلان `code_challenge` و`code_challenge_method` (PKCE، بالقيمة `S256` فقط) مطلوبان للعملاء العامين الذين لا يملكون سرًا
   - تُرجع: `{ "code": "...", "state": "..." }`

2. **استبدال الرمز بالرمز المميّز (token):** `POST /membership/oauth/token` (عامة)
   - الجسم: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "...", "code_verifier": "..." }`
   - أرسل `code_verifier` عندما تستخدم خطوة التفويض `code_challenge`؛ ويحذف العملاء العامون `client_secret`. تُقبل أجسام JSON أو المرمّزة كنماذج (form-encoded)
   - تُرجع: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **تجديد الرمز:** `POST /membership/oauth/token` (عامة)
   - الجسم: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

تنتهي صلاحية رموز الوصول بعد **12 ساعة**.

### تدفّق رمز الجهاز (Device Code Flow، RFC 8628)

للأجهزة التي لا تملك متصفحًا (تطبيقات التلفاز، والأكشاك):

1. **طلب رمز الجهاز:** `POST /membership/oauth/device/authorize` (عامة)
   - الجسم: `{ "client_id": "...", "scope": "..." }`
   - تُرجع: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **يُدخل المستخدم الرمز** في عنوان التحقق ويوافق عليه أو يرفضه

3. **الاستعلام عن الرمز المميّز:** `POST /membership/oauth/token` (عامة)
   - الجسم: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - تُرجع `authorization_pending` حتى تتم الموافقة، ثم تُرجع رمز الوصول

### إدارة عملاء OAuth

| الطريقة | المسار | المصادقة | الصلاحية | الوصف |
|--------|------|------|------------|-------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | عرض جميع عملاء OAuth |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | جلب عميل بمعرّفه |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | جلب عميل بمعرّف العميل (السر مخفي) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | إنشاء عميل أو تحديثه |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | حذف عميل |
| POST | `/membership/oauth/register` | عامة | — | التسجيل الديناميكي للعملاء (RFC 7591) للعملاء العامين مثل موصّلات MCP. راجع [التطبيقات المتصلة](../connected-apps.md#dynamic-client-registration) |

### نقاط نهاية الموافقة على الأجهزة

| الطريقة | المسار | المصادقة | الوصف |
|--------|------|------|-------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | جلب معلومات رمز الجهاز المعلّق لواجهة الموافقة |
| POST | `/membership/oauth/device/approve` | JWT | الموافقة على تفويض جهاز. الجسم: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | رفض تفويض جهاز. الجسم: `{ "user_code": "..." }` |

## نقاط النهاية العامة مقابل المصادَقة

تستخدم واجهة البرمجة دالتين غلافيتين تحددان متطلبات المصادقة:

- **`actionWrapper`** — يتطلب JWT صالحًا. كائن المستخدم المصادَق (`au`) متاح، ويحمل `churchId` و`userId` وفحوصات الصلاحيات.
- **`actionWrapperAnon`** — لا يتطلب مصادقة. يُستخدم لتسجيل الدخول والتسجيل وعمليات البحث عن المحتوى العام ومستقبلات الويب هوك.

في جداول نقاط النهاية في هذا الدليل، يُشار إلى هذين النوعين بـ **JWT** و**عامة** على التوالي في عمود المصادقة.

## صفحات ذات صلة

- [بنية الوحدات](../module-structure.md) — كيفية تنظيم وحدات التحكم والمستودعات والنماذج
- [الإعداد المحلي](../local-setup.md) — تشغيل واجهة البرمجة محليًا للتطوير
