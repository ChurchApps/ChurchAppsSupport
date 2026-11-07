---
title: "نقاط التكامل والتوسيع"
---

# نقاط التكامل والتوسيع

<div class="article-intro">

كل ما يمكن لطرف ثالث الاتصال به يعمل عبر واجهة برمجية واحدة ونموذج تفويض واحد. هذه الصفحة هي الخريطة: تسمّي كل نقطة تكامل، وتوضح كيفية ترابطها، وتربط بالمرجع التفصيلي لكل منها. إذا كنت تبني تطبيقًا على B1، فابدأ من هنا لاختيار الباب المناسب، ثم اتبع الرابط إلى الصفحة التي توثقه بالتفصيل.

</div>

## نظرة سريعة على نقاط التكامل

هناك ستّ طرق للدخول أو الخروج، وتشترك جميعها في طبقة المصادقة نفسها:

- **[واجهة REST API](../api/api-keys)** — سطح المنتج بأكمله، ويمكن استدعاؤها برمز Bearer من أي لغة برمجة.
- **[مفاتيح API](../api/api-keys)** — أبسط بيانات اعتماد: رمز `cak_…` مرتبط بشخص واحد في كنيسة واحدة.
- **[OAuth 2.0 والتطبيقات المتصلة](../api/connected-apps)** — موافقة لكل كنيسة للتطبيقات متعددة المستأجرين؛ ويُصدر JWT نفسه الذي يحصل عليه المستخدم.
- **[Webhooks](../api/webhooks)** — أحداث صادرة موقّعة ومضمونة التسليم.
- **[خادم MCP](../api/mcp)** — غلاف موجَّه للذكاء الاصطناعي فوق واجهة REST API عند المسار `/mcp`.
- **[موفرو المحتوى](../freeplay-content-provider)** — مسار الدخول لمكتبات الوسائط الخارجية إلى FreePlay وتطبيقات B1.

تُقدَّم جميع الخدمات باستثناء موفري المحتوى عبر واجهة برمجية واحدة متكاملة (مستودع [Api](https://github.com/ChurchApps/Api))، وتُركَّب وحداتها تحت مسارات أساسية ثابتة: `/membership` و`/giving` و`/attendance` و`/content` و`/messaging` و`/doing` و`/reporting` و`/mcp`.

## كيف تترابط الأجزاء

```
   ┌─────────────────────┐                          ┌───────────────────────────────────────┐
   │  Third-party app     │   Bearer  cak_… / JWT    │              B1 API (Api)              │
   │  · server / SaaS     │ ───────────────────────▶ │  ┌─────────────────────────────────┐  │
   │  · Zapier / Make     │                          │  │ CustomAuthProvider.getUser()    │  │
   │  · Google Sheets     │                          │  │   cak_ key ─┐                    │  │
   │  · CLI / scripts     │                          │  │   OAuth JWT ┴▶ Principal          │  │
   │  · AI client (MCP)   │ ─── POST /mcp ──────────▶ │  │   scopes filter → permissions[] │  │
   └─────────────────────┘                          │  └────────────────┬────────────────┘  │
             ▲                                        │                   ▼                    │
             │                                        │  API modules: /membership /giving     │
             │        signed JSON POST                │  /attendance /content /messaging …    │
             │   (person / donation / group / …)      │                   │                    │
             └──────────── webhooks ◀─────────────────┼─ shared/webhooks/WebhookDispatcher     │
                     (durable, HMAC-SHA256 signed)     └───────────────────────────────────────┘

   External content sources (Planning Center, Dropbox, Life.Church, CBN, …)
             │   OAuth PKCE / device flow / none   ──  B1 is the OAuth *client* here  ──▶
             ▼
   Packages/content-providers   ──▶   FreePlay / B1 apps        (inbound content path)
```

تختصر ثلاثة أسهم القصة كاملة: يطلب طرف ثالث **الاتصال بالنظام** برمز Bearer (مفتاح API أو OAuth JWT، بما في ذلك عبر `/mcp`)؛ ويُرسل النظام **استدعاءً عكسيًا** عبر Webhooks الموقّعة؛ وموفرو المحتوى هم المسار الوحيد **للمحتوى الوارد**، حيث يكون B1 نفسه عميل OAuth الذي يسحب الوسائط من مصدر خارجي.

## نموذج المصادقة المشترك

كل بيانات اعتماد (سواء JWT تسجيل دخول المستخدم أو رمز وصول OAuth أو مفتاح API) تُحلّ إلى **`Principal` نفسه** وتُفحص بالطريقة نفسها. لا يوجد مسار «مصادقة تكامل» منفصل؛ فبيانات الاعتماد المقيّدة بنطاقات لا تتميز ببساطة عن مستخدم ذي صلاحيات أقل.

### بنية JWT

رموز الوصول في B1 هي JWT من نوع HS256 تُصدَر في `Api/src/modules/membership/auth/AuthenticatedUser.ts`. مجموعة المطالبات:

| المطالبة | المعنى |
|---|---|
| `id`، `email`، `firstName`، `lastName` | الشخص صاحب الرمز |
| `churchId` | الكنيسة الواحدة التي يعمل الرمز ضمنها، والمرتكز لتحديد نطاق جميع البيانات |
| `personId` | سجل الشخص داخل تلك الكنيسة |
| `permissions` | مصفوفة مسطحة من سلاسل صلاحيات RBAC (`[apiName_]contentType_contentId_action`) |
| `groupIds`، `leaderGroupIds` | عضوية المجموعات وقيادتها، للتحقق على مستوى المجموعة |
| `membershipStatus` | ضيف أم عضو، للتحكم في الخدمات الذاتية |

رمز وصول OAuth له البنية نفسها تمامًا كـ JWT تسجيل الدخول، والفرق الوحيد أن مصفوفة `permissions` الخاصة به **صُفّيت عبر النطاقات الممنوحة قبل التوقيع** (`getCombinedApiJwt(...)`).

### تحديد النطاق لكل كنيسة

`churchId` مطالبة في الرمز وليس معامل طلب، لذلك لا يمكن لبيانات الاعتماد أن تصل إلى كنائس أخرى أبدًا. كل استعلام في المستودع يُصفّى حسب `churchId` الخاص بالمستدعي؛ ومفتاح API أو رمز OAuth يكون مرتبطًا بكنيسة واحدة فقط وقت الإصدار.

### الصلاحيات المبنية على الأدوار عند الحدّ

تتحكم وحدات التحكم (Controllers) في الإجراءات عبر `au.checkAccess(contentType, action)` مقابل مصفوفة `permissions` الخاصة بالرمز. النطاقات **عامل تصفية، وليست منحًا أبدًا** (`Api/src/shared/auth/Scopes.ts`): يربط `SCOPE_CATALOG` كل نطاق (مثل `people:read` و`donations:write`) بأزواج RBAC التي يسمح بها، ويُقاطع `filterPermissionsByScopes()` ذلك مع الصلاحيات *الحالية* للشخص عند كل عملية حل. والنتائج:

- سحب صلاحية في B1Admin يقطع وصول بيانات الاعتماد عند الطلب التالي، ولا تنحرف الرموز عن الدور أبدًا.
- لا يمكن للنطاق إلا *إزالة* الصلاحيات، لذلك لا يمكن لبيانات اعتماد مقيّدة بنطاق أن ترتقي إلى إدارة الخادم أو النطاق (وهذه الصلاحيات غير مرتبطة عمدًا بأي نطاق).
- تحمل مفاتيح API بادئة `cak_`؛ ويتفرع `CustomAuthProvider.getUser()` بناءً عليها، ويُجزّئ السر، ويعيد حل صلاحيات RBAC الحية للشخص المالك في كل استدعاء.

راجع [API Keys → Scopes](../api/api-keys#scopes) للاطلاع على الكتالوج الكامل.

## مرجع نقاط التكامل

### واجهة REST API

سطح المنتج الكامل. تقبل أي نقطة نهاية موثّقة إما JWT أو مفتاح API من نوع `cak_…` في ترويسة `Authorization: Bearer`، ولا يوجد جدول مسارات منفصل خاص بالمفاتيح فقط أو OAuth فقط. توجد الوحدات ومساراتها الأساسية ضمن `Api/src/modules/*`.

### مفاتيح API

رمز وصول شخصي من نوع `cak_<prefix>.<secret>`، يُنشأ في **B1Admin → Settings → Developer → API Keys**. لا يُخزَّن إلا تجزئة SHA-256، ويُعرض المفتاح الأصلي مرة واحدة فقط. تُدار عبر `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). وهو الأنسب للنصوص البرمجية الخاصة بكنيسة واحدة ولموصّلات مثل Zapier وMake وGoogle Sheets. → **[مفاتيح API](../api/api-keys)**

### OAuth 2.0 والتطبيقات المتصلة

للتطبيقات متعددة المستأجرين التي تحتاج موافقة كل كنيسة. يُنفَّذ في `Api/src/modules/membership/controllers/OAuthController.ts` ضمن `/membership/oauth`. يدعم الخادم ثلاثة أنواع منح:

- **رمز التفويض (Authorization Code)**: يُرجع `POST /oauth/authorize` (بعد المصادقة) رمزًا قصير الصلاحية، ويستبدله `POST /oauth/token` مع `grant_type=authorization_code` بـ JWT للوصول (≈ 7 أيام) بالإضافة إلى رمز تحديث (≈ 90 يومًا). يجب على العملاء العامّين (بدون سر) استخدام PKCE (`S256` فقط): وهو `code_challenge` عند التفويض و`code_verifier` المطابق عند تبادل الرمز.
- **رمز الجهاز (Device Code)** (RFC 8628): يُصدر `POST /oauth/device/authorize` رمز `user_code`، ويوافق عليه المستخدم في B1Admin (`/oauth/device/approve`)، ويستطلع الجهاز `/oauth/token` باستخدام منحة رمز الجهاز. مخصص لأجهزة التلفاز وأكشاك الخدمة وواجهات سطر الأوامر التي لا تتوفر فيها متصفحات.
- **رمز التحديث (Refresh Token)**: يُصدر `grant_type=refresh_token` رمز وصول جديدًا، ويجوز للعملاء العامّين (بدون سر) حذف السر.

يمكن للعملاء العامّين أيضًا تسجيل أنفسهم عبر `POST /oauth/register` (تسجيل العميل الديناميكي وفق RFC 7591)، فيحصلون على `client_id` دون سر، ويجب أن تكون عناوين إعادة التوجيه الخاصة بهم من نوع `https` أو loopback.

**التطبيق المتصل (Connected App)** هو العرض الذي يراه مسؤول الكنيسة لرمز ممنوح، ويُدرج ويمكن إلغاؤه في `/membership/oauth/connections`. كما تستضيف وحدة التحكم جسر **جلسة الترحيل (relay-session)** عبر OAuth (`/oauth/relay/*`) الذي يتيح لجهاز بلا متصفح إتمام تسجيل الدخول لدى مزوّد *خارجي*. → **[التطبيقات المتصلة وOAuth](../api/connected-apps)**

### Webhooks

السطح الصادر الوحيد. تشترك الكنيسة في نقطة نهاية HTTPS عامة للأحداث؛ عند حدوث تغيير مطابق، يقوم `WebhookDispatcher.emit(churchId, event, payload)` بإثراء الحمولات التي تحتوي على المعرّفات فقط بأسماء العرض (`personName` و`groupName` و`formName`، ولا تُجرى عمليات البحث إلا بعد تطابق اشتراك)، ويسجّل عملية التسليم، ويقوم عامل في الخلفية بإرسال مغلّف JSON موقّع عبر POST مع إعادة المحاولة بتأخير متزايد وإعادة التسليم. المحرك في `Api/src/shared/webhooks/`، وإدارة الاشتراكات لكل كنيسة ضمن `/membership/webhooks` (`WebhookController.ts`). يعيد حقل `connectorType` تشكيل النص للخدمات مثل Slack وDiscord، ويذهب موصّل `mailchimp` أبعد من ذلك إذ يتولى تبادل HTTP بالكامل (الطريقة والرابط والمصادقة لكل حدث عبر واجهة Mailchimp البرمجية، مع تشفير بيانات الاعتماد في `webhooks.connectorConfig`). → **[Webhooks](../api/webhooks)**

### خادم MCP

غلاف موجَّه للذكاء الاصطناعي عند `/mcp` (`Api/src/modules/mcp/`). ثلاث أدوات عامة (`list_endpoints` و`describe_endpoint` و`api_call`) تكشف واجهة REST بأكملها ديناميكيًا لأي عميل MCP. المصادقة هي رمز Bearer نفسه المستخدم في كل شيء آخر. بالنسبة للعملاء الذين يسجّلون الدخول عبر OAuth (موصّلات claude.ai المخصصة)، يحمل الرد 401 من `/mcp` ترويسة `WWW-Authenticate` تشير إلى `/.well-known/oauth-protected-resource`، ويعلن `/.well-known/oauth-authorization-server` عن نقاط نهاية `/membership/oauth` والتسجيل الديناميكي وPKCE وصفحة الموافقة `/oauth` في B1Admin (`WellKnownController.ts`، `OAuthMetadata.ts`). يعيد `api_call` الدخول إلى مكدس Express داخل العملية نفسها، بحيث تظل جميع قواعد الصلاحيات وتحديد نطاق الكنيسة سارية. → **[خادم MCP](../api/mcp)**

### موفرو المحتوى

مسار المحتوى الوارد، في الحزمة المنفصلة `Packages/content-providers` (`@churchapps/content-providers`) وليس في الواجهة البرمجية. ينفّذ كل موفر واجهة `IProvider` (`src/interfaces.ts`)، وتشمل `browse` و`getPlaylist` و`getInstructions`، إضافة إلى خطافات المصادقة، ويسجّل نفسه ذاتيًا في سجل `Map` (`src/providers/registry.ts`). هنا **يكون B1 عميل OAuth**: يُعلن الموفر عن `AuthType` من النوع `none` أو `oauth_pkce` أو `device_flow` أو `form_login`، وتتولى المساعدات المشتركة (`OAuthHelper` و`DeviceFlowHelper` و`TokenHelper` و`ApiHelper`) تنفيذ PKCE وتدفق الجهاز من جانب العميل مقابل المصدر الخارجي. يوجد اليوم أحد عشر موفرًا، من بينهم Planning Center وDropbox وLife.Church وCBN وBibleProject وJesus Film وLessons.church وB1.church، ويغذّون FreePlay وتطبيقات B1. → **[موفر محتوى FreePlay](../freeplay-content-provider)**

**خطط السنة** تعتمد على هذا المسار. يقوم ناشر منهج (لديه صلاحية `lessons.edit`) بالحفاظ على تسلسلات مرتبة للأسابيع 1/2/3 في لوحة إدارة Lessons.church (جداول `LessonsApi` وهي `yearPlans` و`yearPlanWeeks`، مع `startMonth` اختياري و`anchor` لكل أسبوع بقيمة `easter` أو `christmas`). ويقدّم `GET /yearPlans/public` في LessonsApi الخطط المفعّلة بشكل مجهول، مع ملء البرنامج والدراسة والمكان لكل أسبوع من شجرة الدروس. يستهلك **Serving → Plans → Schedule Lesson → Apply Year Plan** في B1Admin نقطة النهاية هذه، ويكتب خطة DoingApi واحدة لكل أسبوع مُدرج (`providerId=lessonschurch`، و`providerPlanId=/lessons/{programId}/{studyId}/{lessonId}/{venueId}`). تحل الخطط ذات `startMonth` الأسابيع المرتبطة بتاريخ مقابل السنة المختارة (عيد الفصح بحساب Gregorian computus، وعيد الميلاد كأول أحد يسبقه أو يساوي 25 ديسمبر) وتملأ الفترات بينها. أما الخطط بدون `startMonth` فتربط الأسبوع N بـ `startDate + (N−1)×7` يومًا. تُتخطى الأسابيع القادمة من موفري OLF الخارجيين، أو التي يكون مسارها غير مكتمل، وقت التطبيق. تعدّل الكنائس الخطط الناتجة كأي خطط أخرى، ويعرض FreePlay ما هو موجود في الخطة.

## الخلاصة

| نقطة التكامل | آلية المصادقة | الاتجاه | مكان التنفيذ | المرجع |
|---|---|---|---|---|
| واجهة REST API | JWT من نوع `Bearer` أو مفتاح `cak_…` | وارد | `Api/src/modules/*` | [مفاتيح API](../api/api-keys) |
| مفاتيح API | رمز `cak_` مُجزَّأ بـ SHA-256 | بيانات اعتماد | `Api/.../membership/controllers/ApiKeyController.ts` | [مفاتيح API](../api/api-keys) |
| OAuth 2.0 / التطبيقات المتصلة | رمز التفويض (PKCE) · الجهاز · التحديث ← JWT؛ تسجيل العميل الديناميكي | وارد | `Api/.../membership/controllers/OAuthController.ts` | [التطبيقات المتصلة](../api/connected-apps) |
| Webhooks | سر لكل خطاف، وتوقيع HMAC-SHA256 | صادر | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhooks](../api/webhooks) |
| خادم MCP | JWT من نوع `Bearer` أو OAuth JWT (يُكتشف عبر `/.well-known`) أو مفتاح `cak_…` | وارد (الذكاء الاصطناعي) | `Api/src/modules/mcp/` | [خادم MCP](../api/mcp) |
| موفرو المحتوى | حسب كل موفر: بدون / OAuth PKCE / الجهاز / نموذج | محتوى وارد | `Packages/content-providers/` | [موفر المحتوى](../freeplay-content-provider) |

## الموصّلات الجاهزة

بدلًا من أن يبني الجميع من الصفر، تُقدّم ChurchApps موصّلات فوق نقاط التكامل السابقة:

- **[Slack وDiscord](/docs/b1-admin/integrations/slack-discord)**: يعيد `connectorType` للخطاف تشكيل المغلّف القياسي ليصبح رسالة دردشة، ويُهيَّأ بالكامل في B1Admin دون الحاجة إلى حساب طرف ثالث.
- **[Mailchimp](/docs/b1-admin/integrations/services/mailchimp)**: `connectorType` من نوع `mailchimp` يزامن الأشخاص إلى جمهور Mailchimp، ويربط عضوية المجموعة أو القائمة بالوسوم (`Api/src/shared/webhooks/MailchimpConnector.ts`). على خلاف موصّلات الدردشة، يُرسل طلبات موثّقة خاصة به لكل حدث (إضافة/تحديث، أو أرشفة، أو وسم) بدلًا من إرسال POST إلى رابط تحدده الكنيسة. ويُخزَّن مفتاح API ومعرّف الجمهور مشفّرين في `webhooks.connectorConfig`. اتجاه واحد، وحقول الدمج القياسية فقط.
- **[Zapier](/docs/b1-admin/integrations/zapier)** و**[Make](/docs/b1-admin/integrations/make)**: يُطلقان عند أحداث Webhooks، وينفذان عبر REST API، ويسجّلان الخطاف الخاص بهما عند تفعيل Zap أو السيناريو (يتطلب مفتاحًا بصلاحية `settings:write`). يوجد مصدر تطبيق Zapier في مستودع `Integrations` ضمن `zapier/` (واجهة سطر أوامر Zapier، ويُنشر باستخدام `zapier push`).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)**: إضافة تعتمد على مفتاح API للمصادقة، تُصدّر الأشخاص والتبرعات والمجموعات والحضور عند الطلب.
- **[Claude](/docs/b1-admin/integrations/claude)** و**[ChatGPT](/docs/b1-admin/integrations/chatgpt)**: عملاء MCP موجَّهون إلى `/mcp`.

أما لكودك الخاص، فإن **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) يغلّف كل ما سبق: عميل REST مُكتب الأنواع، وعميل OAuth (رمز التفويض والتحديث وتدفق الجهاز)، ومُتحقق HMAC للـ Webhooks مع وسيط Express.

## صفحات ذات صلة

- [مفاتيح API](../api/api-keys): أبسط بيانات اعتماد وكتالوج النطاقات
- [التطبيقات المتصلة وOAuth](../api/connected-apps): تدفقات الموافقة متعددة المستأجرين
- [Webhooks](../api/webhooks): نظام الأحداث الصادرة
- [خادم MCP](../api/mcp): غلاف تكامل الذكاء الاصطناعي
- [موفر محتوى FreePlay](../freeplay-content-provider): أن تصبح مصدر محتوى وارد
- [التكاملات (للمستخدم النهائي)](/docs/b1-admin/integrations/): أدلة إعداد الموصّلات الجاهزة
