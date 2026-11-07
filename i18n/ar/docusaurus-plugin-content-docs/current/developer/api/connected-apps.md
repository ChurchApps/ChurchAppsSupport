---
title: "التطبيقات المتصلة وOAuth"
---

# التطبيقات المتصلة وOAuth

<div class="article-intro">

تدعم واجهة برمجة تطبيقات B1 بروتوكول OAuth 2.0، فيتيح ذلك لتطبيق تابع لجهة خارجية أن يطلب من كل مسؤول كنيسة إذنًا للوصول إلى بياناتها، دون أن تشارك الكنيسة كلمة مرور أو مفتاح API في أي وقت. **التطبيق المتصل** هو رمز OAuth وافق عليه مسؤول الكنيسة، وإلغاؤه يقطع وصول التطبيق الخارجي بنقرة واحدة. استخدم هذا المسار لموصلات SaaS متعددة المستأجرين. أما للتكامل مع كنيسة واحدة فيُفضَّل استخدام [مفاتيح API](./api-keys).

</div>

<div class="prereqs">
<h4>قبل البدء</h4>

- يجب تسجيل **عميل** OAuth قبل أن تتمكن الكنائس من منحه الوصول، إما من قِبل مسؤول خادم B1، أو من قِبل العميل نفسه عبر [التسجيل الديناميكي](#dynamic-client-registration)
- تقع جميع نقاط نهاية OAuth ضمن وحدة العضوية: `/membership/oauth/...`
- رموز الوصول هي JWT، وتحمل صلاحيات المستخدم مُصفّاةً وفق النطاقات الممنوحة

</div>

## المفاهيم

| المصطلح | المعنى |
|---|---|
| **عميل OAuth** | تطبيق الطرف الثالث نفسه، ويُعرَّف بـ `client_id` ويُؤمَّن بـ `client_secret`. يُسجَّل مرة واحدة لدى B1، ويُشارَك بين جميع الكنائس التي تثبّته. |
| **تطبيق متصل** | زوج محدد `(العميل، مسؤول الكنيسة)` منح فيه المسؤول العميلَ حق الوصول. كل تطبيق متصل مدعوم برمز تحديث من OAuth. |
| **رمز الوصول** | JWT قصير العمر (نحو 7 أيام) يستخدمه العميل لاستدعاءات API. بنفس بنية JWT الخاص بالمستخدم: `Authorization: Bearer <jwt>`. |
| **رمز التحديث** | سلسلة مُعتمة طويلة العمر (نحو 90 يومًا) يستخدمها العميل لإصدار رموز وصول جديدة. |
| **النطاق** | يحدّ مما يستطيع رمز الوصول فعله. انظر [كتالوج النطاقات](./api-keys#scopes). |

## تدفقات المنح

تدعم B1 ثلاثة تدفقات OAuth، وجميعها معرّفة وفق RFC 6749 وRFC 8628.

### رمز التفويض (تطبيقات الويب)

استخدمه عندما يكون لتطبيقك مكوّن على جانب الخادم، ويمكنه إبقاء `client_secret` سرًّا.

1. **التفويض**

   ```http
   POST /membership/oauth/authorize
   Authorization: Bearer <user JWT>
   Content-Type: application/json

   { "client_id": "...", "redirect_uri": "https://app.example.com/cb",
     "response_type": "code", "scope": "people:read groups:read", "state": "xyz" }
   ```

   يجب أن يرسل العملاء العامون (بدون `client_secret`) أيضًا `"code_challenge": "..."` و`"code_challenge_method": "S256"` (PKCE، وفق RFC 7636). ولا يُقبل سوى `S256`.

   يعيد `{ "code": "...", "state": "xyz" }`. نقطة نهاية رمز التفويض مصادَق عليها عن قصد عبر POST، إذ يجمع تطبيقك رمز JWT الخاص بالمستخدم في B1 (عادةً عبر استضافة زر ضمن جلسة المستخدم في B1) ثم يُرسله ضمن خطوة الموافقة.

2. **استبدال الرمز برموز الوصول**

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "authorization_code", "code": "...",
     "client_id": "...", "client_secret": "...", "redirect_uri": "..." }
   ```

   إذا أرسلت خطوة التفويض `code_challenge`، فضمّن `"code_verifier": "..."` المطابق له. يرسل العميل العام المُتحقِّق ويحذف `client_secret`. تقبل نقطة نهاية الرمز نصوص JSON أو نصوص مُرمَّزة بصيغة النموذج (`application/x-www-form-urlencoded`).

   تعيد استجابة الرمز:

   ```json
   {
     "access_token": "eyJ...",
     "token_type": "Bearer",
     "expires_in": 604800,
     "created_at": 1715000000,
     "refresh_token": "abc123…",
     "scope": "people:read groups:read"
   }
   ```

3. **التحديث** عندما يقترب رمز الوصول من الانتهاء:

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "refresh_token", "refresh_token": "...",
     "client_id": "...", "client_secret": "..." }
   ```

   ينتهي رمز التحديث بعد 90 يومًا من عدم الاستخدام، وإذا انتهى، يعيد مسؤول الكنيسة التفويض.

### رمز الجهاز (الشاشات وأجهزة الكشك وواجهة سطر الأوامر)

استخدمه عندما لا يتوفر متصفح على الجهاز. معرَّف وفق RFC 8628.

1. **طلب رمز جهاز**

   ```http
   POST /membership/oauth/device/authorize
   Content-Type: application/json

   { "client_id": "...", "scope": "content:read" }
   ```

   يعيد الرمز الظاهر للمستخدم وفترة الاستطلاع:

   ```json
   { "device_code": "...", "user_code": "WXYZ-1234",
     "verification_uri": "https://app.b1.church/device",
     "expires_in": 900, "interval": 5 }
   ```

2. اعرض `user_code` و`verification_uri` للمستخدم.

3. **استطلِع** `/membership/oauth/token` باستخدام `grant_type=urn:ietf:params:oauth:grant-type:device_code` و`device_code`. الاستجابات القياسية:

   | الخطأ | المعنى |
   |---|---|
   | `authorization_pending` | لم يوافق المستخدم بعد. استمر في الاستطلاع بالفترة المقترحة |
   | `expired_token` | انتهت صلاحية رمز الجهاز بعد `expires_in`. ابدأ من جديد |
   | `access_denied` | رفض المستخدم الطلب |
   | _(لا يوجد، 200 OK)_ | تمت الموافقة، والجسم هو `B1TokenResponse` |

4. بعد الموافقة، احفظ `refresh_token` واستخدم `access_token` حتى ينتهي.

تتضمن حزمة B1 SDK الدالة `B1OAuthClient.awaitDeviceToken(...)` التي تنفّذ حلقة الاستطلاع نيابةً عنك، مع تراجع (backoff) متوافق مع RFC.

### رمز التحديث

يبقى متاحًا دائمًا كطلب مستقل بمجرد أن تحوز `refresh_token`:

```http
POST /membership/oauth/token
{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "..." }
```

يُعاد `access_token` و`refresh_token` جديدان. يمكن **للعملاء العامين** (بدون `client_secret`) حذف `client_secret` عند التحديث، وهذا مفيد لتطبيقات OAuth على الجوال وسطح المكتب التي لا تستطيع إبقاء سر.

تُدوَّر رموز التحديث، لكن القديم لا يُتخلَّص منه فورًا. إذا لم يتلقَّ العميل ردّ التحديث أبدًا (مثلًا شاشة TV فقدت الطاقة أو اتصال Wi-Fi في منتصف الطلب)، يمكنه إعادة المحاولة باستخدام `refresh_token` السابق لمدة تصل إلى **7 أيام**. تنجح المحاولة فقط ما دام الرمز البديل لم يُستخدم بعد، ثم يُسقَط الرمز البديل غير المستخدم ويُصدَر زوج جديد. وبمجرد أن يُحدَّث الرمز البديل نفسه، يعيد الرمز القديم `invalid_grant`. كما أن إلغاء الاتصال يُلغي أي رموز مُدوَّرة لا تزال ضمن نافذة السماح هذه، وتعرض قائمة التطبيقات المتصلة كل اتصال مرة واحدة فقط.

## شكل الرمز

رمز الوصول هو JWT تُصدره B1 ومطابق للرمز الذي يحصل عليه المستخدم من `POST /membership/users/login`: نفس مطالبة الصلاحيات المعيارية، ونفس سلوك `checkAccess` في كل متحكم. **والاستثناء** هو أن مصفوفة الصلاحيات قد صُفّيت عبر النطاقات الممنوحة وقت الإصدار. لا يستطيع رمز وصول محدد النطاق فعل أي شيء لا يستطيعه مفتاح API بنطاق مماثل، ولا يوجد "مسار OAuth" منفصل في أي متحكم، فـ `actionWrapper` لا يعرف إن كان حامل الرمز شخصًا أو مفتاح API أو عميل OAuth.

## التطبيقات المتصلة (للمستخدم)

من وجهة نظر مسؤول الكنيسة، "التطبيقات المتصلة" هي قائمة التطبيقات التي مُنحت حق الوصول إلى كنيسته. كل صف هو زوج `(OAuthClient, OAuthToken)` حي.

في B1Admin: **الإعدادات ← المطوّر ← التطبيقات المتصلة** تعرض:

- اسم العميل
- النطاقات التي وافق عليها المسؤول
- تاريخ منح الوصول
- زر **إلغاء**

| الطريقة والمسار | المصادقة | الغرض |
|---|---|---|
| `GET /membership/oauth/connections` | JWT | سرد الاتصالات النشطة الخاصة بالمستدعي (مع اسم العميل والنطاقات) |
| `DELETE /membership/oauth/connections/:id` | JWT | إلغاء اتصال بمعرّف رمز OAuth، فيتوقف الرمز عن العمل عند الطلب التالي |

تستثني القائمة الرموز المنتهية الصلاحية تلقائيًا.

## النطاقات والموافقة

قائمة النطاقات هي نفسها كتالوج [مفاتيح API](./api-keys#scopes). وهذه أفضل الممارسات للعملاء:

- **اطلب أضيق النطاقات التي تعمل.** ستلاحظ الكنائس إن طلبت `donations:write` بينما تحتاج فقط إلى قراءة بيانات الأشخاص.
- **استخدم رمز تحديث مع رموز وصول قصيرة العمر.** رموز الوصول طويلة العمر يصعب إلغاؤها بسرعة.
- **اعرض دائمًا النطاقات الممنوحة على المستخدم** في واجهتك الخاصة حتى يتمكن من التحقق مما وافق عليه.

## إدارة عملاء OAuth

تُسجَّل عملاء OAuth (تطبيقات الطرف الثالث نفسها) على المستوى العام. يُصدر العميل السري الذي يحمل `client_secret` من قِبل مسؤول خادم B1. لإطلاق تطبيق من هذا النوع، تواصل مع فريق ChurchApps للحصول على زوج `client_id` / `client_secret`، وسجّل عناوين إعادة التوجيه الخاصة بتطبيقك. أما العملاء العامون مثل موصلات MCP فيمكنهم تسجيل أنفسهم (أدناه).

يجب أن تتطابق عناوين إعادة التوجيه المسجلة مع `redirect_uri` في الطلب تمامًا، ويُرفض أي تطابق جزئي أو بالبادئة.

| الطريقة والمسار | الصلاحية | الوصف |
|---|---|---|
| `GET /membership/oauth/clients` | Server.Admin | سرد جميع عملاء OAuth |
| `GET /membership/oauth/clients/clientId/:clientId` | — | الحصول على عميل بمعرّفه العام (السر مخفي) |
| `POST /membership/oauth/clients` | Server.Admin | إنشاء عميل أو تحديثه |
| `DELETE /membership/oauth/clients/:id` | Server.Admin | حذف عميل |

### التسجيل الديناميكي للعملاء

`POST /membership/oauth/register` (عام، وفق RFC 7591) يتيح لعميل مثل موصل MCP في claude.ai أن يسجّل نفسه. تعلن عنه وثيقة `/.well-known/oauth-authorization-server` الخاصة بالواجهة، انظر [خادم MCP ← اكتشاف OAuth](./mcp#oauth-discovery).

```http
POST /membership/oauth/register
Content-Type: application/json

{ "client_name": "My AI assistant", "redirect_uris": ["https://assistant.example.com/oauth/callback"], "scope": "people:read" }
```

يعيد 201 مع `client_id` و`client_id_issued_at` و`client_name` و`redirect_uris` و`grant_types` (`authorization_code`, `refresh_token`) و`response_types` (`code`) و`token_endpoint_auth_method: "none"`.

- لا يُصدر أي سر أبدًا، لذا يجب على العميل استخدام PKCE في كل تفويض.
- يجب أن تكون `redirect_uris` بين 1 و10 عناوين `https`، أو `http` على `localhost` أو `127.0.0.1` أو `[::1]`.
- يُقتطع `client_name` إلى 45 حرفًا (القيمة الافتراضية "AI assistant").
- محدود بـ 20 تسجيلًا في الساعة لكل عنوان IP.

في صفحة الموافقة في B1Admin، يتلقى العميل المسجَّل ذاتيًا إشعارًا بأنه سجّل نفسه، ولا يستطيع أبدًا فعل أكثر مما يستطيعه حساب B1 الخاص بالمستخدم، ويمكن فصله من **الإعدادات ← المطوّر ← التطبيقات المتصلة**.

## دعم SDK

تُغلّف حزمة `@churchapps/integration-sdk` كل تدفق OAuth بمساعدات مُنمَّطة: `B1OAuthClient.exchangeCode()` و`.refresh()` و`.startDeviceFlow()` و`.pollDeviceToken()` و`.awaitDeviceToken()`. انظر README الحزمة و[Webhooks](./webhooks#sdk-support) للاطلاع على مثال شامل من البداية إلى النهاية.
