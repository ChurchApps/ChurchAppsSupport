---
title: "خادم MCP"
---

# خادم MCP

<div class="article-intro">

تتضمن واجهة برمجة تطبيقات B1 خادم [MCP (Model Context Protocol)](https://modelcontextprotocol.io) على المسار `/mcp`. يمكن لأي عميل ذكاء اصطناعي يدعم MCP — مثل الموصلات المخصصة في claude.ai، وClaude Code، وClaude Desktop، وOpenAI Agents SDK، وCursor، أو أي عميل خاص بك — الاتصال به واستدعاء واجهة REST الأساسية نيابةً عن مستخدم كنيسة مُصادَق عليه. وهو غلاف عام وخفيف: ثلاث أدوات عامة تكشف سطح واجهة البرمجة بالكامل ديناميكيًا بدلاً من نمذجة كل نقطة نهاية يدويًا، إضافةً إلى أداة دليل مجالي واحدة لمنشئ الموقع.

</div>

<div class="prereqs">
<h4>قبل أن تبدأ</h4>

- [مفتاح API من B1](./api-keys) (`cak_…`) مع النطاقات التي ينبغي أن يملكها العميل، أو عميل MCP قادر على تسجيل الدخول عبر OAuth (راجع [اكتشاف OAuth](#oauth-discovery))
- مضيف واجهة برمجة B1 قابل للوصول — `https://api.churchapps.org` للكنائس المستضافة، أو نشرك الخاص
- عميل MCP. راجع [Claude](/docs/b1-admin/integrations/claude) و[ChatGPT](/docs/b1-admin/integrations/chatgpt) لإعداد المستخدم النهائي

</div>

## نقطة النهاية

```
POST /mcp
Content-Type: application/json
Accept: application/json, text/event-stream
Authorization: Bearer cak_<prefix>.<secret>
```

| الجانب | القيمة |
|---|---|
| **المسار** | `/mcp` (بالنسبة إلى مضيف واجهة البرمجة) |
| **الطريقة** | `POST` فقط — يتم الطلب/الاستجابة وبث SSE على نقطة النهاية نفسها |
| **النقل** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **نموذج الجلسة** | عديم الحالة. يُنشأ مثيل خادم MCP جديد لكل طلب — لا يوجد معرّف جلسة ولا استئناف |
| **المصادقة** | رمز Bearer. مفاتيح `cak_…` ورموز JWT من B1 (بما في ذلك رموز وصول OAuth) تعمل جميعها؛ آلية التحقق هي نفسها في أي نقطة نهاية مُصادَق عليها أخرى |

الطلب الذي يكون ترويسة `Authorization` الخاصة به مفقودة أو غير صالحة يُعيد:

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

مع رمز HTTP 401 وترويسة `WWW-Authenticate: Bearer resource_metadata="<api>/.well-known/oauth-protected-resource"`، والتي تتبعها العملاء القادرون على OAuth لبدء تسجيل الدخول.

على واجهة برمجة التطبيقات المستضافة (الإنتاج والعرض التجريبي)، يُقدَّم `/mcp` عبر API Gateway HTTP API بدلاً من واجهة REST API المستخدمة لبقية نقاط النهاية. كانت واجهة REST API تُعيد تسمية `WWW-Authenticate` إلى `x-amzn-remapped-www-authenticate` في استجابات Lambda proxy، مما ترك عملاء مثل ChatGPT بردّ 401 مجرد دون أي طريقة لبدء تسجيل الدخول؛ أما HTTP API فتمرر الترويسة دون تغيير.

## الأدوات

ثلاث أدوات عامة بالإضافة إلى دليل واحد. يستخدم النموذج `list_endpoints` للاستكشاف، و`describe_endpoint` لمعرفة شكل الحمولة، و`api_call` لاستدعاء واجهة البرمجة فعليًا، و`describe_page_builder` عندما تتعلق المهمة بمحتوى الموقع.

### `list_endpoints`

يُرجع قائمة كاملة بمسارات REST المسجَّلة، مُصفّاة بسلسلة جزئية اختيارية و/أو بفعل HTTP. يتضمن كل إدخال اسم المتحكم ونطاقات مفاتيح API الأكثر احتمالًا للحاجة إليها.

**المدخلات:**

| الحقل | النوع | الوصف |
|---|---|---|
| `filter` | سلسلة (اختياري) | سلسلة جزئية غير حساسة لحالة الأحرف تُطابَق مع المسار، مثل `"people"` |
| `method` | تعداد (اختياري) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

**المخرجات:** مستند JSON بالشكل التالي:

```json
{
  "total": 24,
  "endpoints": [
    {
      "method": "GET",
      "path": "/membership/people",
      "controller": "PersonController.getAll",
      "likelyScopes": ["people:read", "people:write"]
    }
  ]
}
```

يُبنى السجل مرة واحدة عند بدء تشغيل واجهة البرمجة من جدول المسارات الحي — أي شيء يمكن الوصول إليه باستخدام `curl` يظهر هنا.

### `describe_endpoint`

يُرجع ملخصًا قصيرًا، بالإضافة إلى نموذج جسم طلب واستجابة منتقى يدويًا حيثما كان متاحًا، لنقطة نهاية واحدة.

**المدخلات:**

| الحقل | النوع | الوصف |
|---|---|---|
| `method` | سلسلة | فعل HTTP |
| `path` | سلسلة | المسار الكامل كما يُرجعه `list_endpoints` |

**المخرجات:** بالنسبة لنقاط النهاية المنتقاة، مثال يحتوي على `summary` و`requestBody` و`responseSample`. أما لنقاط النهاية غير المنتقاة، فتظهر رسالة احتياطية تُوجّه النموذج لاستدعاء `GET` أولًا لمعرفة الشكل. يوجد نحو اثني عشر مسارًا عالي الاستخدام (الأشخاص، والمجموعات، والتبرعات، والحضور، والصناديق) منتقاة.

### `api_call`

يستدعي نقطة نهاية REST المختارة، داخل العملية نفسها، عبر مكدس وسيط Express نفسه المستخدم في أي طلب HTTP عادي — تُطبَّق المصادقة، وتحليل الجسم، وتسجيل التدقيق، وتحديد النطاق لكل كنيسة.

**المدخلات:**

| الحقل | النوع | الوصف |
|---|---|---|
| `method` | تعداد | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | سلسلة | المسار بما في ذلك أي بادئة وحدة، مثل `/membership/people` |
| `query` | كائن (اختياري) | كائن مسطّح لمعاملات سلسلة الاستعلام |
| `body` | أي شيء (اختياري) | جسم طلب JSON — عادةً مصفوفة من كائنات النموذج لطلبات `POST` |

**المخرجات:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* the controller's JSON response */ ]
}
```

تُوسَم نتيجة الأداة بـ `isError: true` لأي استجابة برمز حالة ≥ 400.

### `describe_page_builder`

الأداة الوحيدة غير العامة: دليل ثابت ومستقل لبناء صفحات الموقع عبر نقاط النهاية `/content/*` — نموذج البيانات صفحة ← قسم ← عنصر، وسير عمل الإنشاء، وكل `elementType` مع شكل `answersJSON` الخاص به، وإعدادات مستوى القسم مثل فواصل الأشكال `dividerTop`/`dividerBottom`، ومثال تطبيقي كامل من البداية إلى النهاية. لا يأخذ أي مدخلات، ويعكس كتالوج العناصر المحفوظ في محرر B1Admin (راجع [بنية منشئ الموقع](../architecture/website-builder)). يُتوقع من الوكلاء استدعاؤها مرة واحدة قبل إنشاء محتوى الصفحات أو تحريره، ثم التصرف عبر `api_call`.

## نموذج المصادقة

يمر طلب MCP نفسه عبر `CustomAuthProvider.getUser()` — المسار نفسه الذي تستخدمه كل نقطة نهاية مُصادَق عليها في B1. يُحوَّل رمز `cak_…` من نوع Bearer إلى `Principal` تكون صلاحياته RBAC الحالية لشخص الإصدار، **متقاطعةً** مع النطاقات الممنوحة للمفتاح. يُعاد حساب هذا التقاطع في كل طلب، وبالتالي:

- إزالة نطاق من مفتاح (بحذفه وإعادة إنشائه) تقطع الوصول عند الاستدعاء التالي.
- إزالة صلاحية من الشخص المعني في B1Admin تقطع الوصول عند الاستدعاء التالي، حتى لو ظل المفتاح موجودًا.

بالنسبة لاستدعاءات `api_call` المتداخلة، يُنسخ ترويسة `Authorization` الأصلية إلى الطلب الاصطناعي، فيعمل `CustomAuthProvider` مرة أخرى ويُعاد تطبيق تقاطع النطاقات لكل استدعاء. لا يوجد تخزين مؤقت للرموز.

## قائمة المسارات المحظورة

مجموعة صغيرة من المسارات لا يمكن الوصول إليها عبر `api_call`، حتى مع مفتاح صالح:

| النمط | السبب |
|---|---|
| `/giving/donate/webhook/*` | نقاط نهاية Webhook للمزوّدين تتوقع أجسامًا خام موقّعة ومتحقَّقًا منها من Stripe/PayPal — وليست للمستدعين العامين |
| `/membership/oauth/clients*` | تسجيل عملاء OAuth مقصور على المشغّل |
| `/membership/people/apiEmails` | محمي بـ `jwtSecret` الخاص بالمشغّل، وليس بصلاحيات المستخدم |
| أي مسار يتوقع `multipart/form-data` | رفع الملفات غير متوافق مع استدعاءات JSON-RPC |

يُرجع المسار المحظور نتيجة أداة بـ `isError: true` مع رسالة وصفية، ولا يُستدعى المسار الأساسي أبدًا.

## حد حجم الاستجابة

يُحدّ جسم استجابة `api_call` الواحد بـ **64 كيلوبايت** من المخرجات الملتقطة. إذا تجاوز الاستعلام الحد، تحمل الاستجابة `"truncated": true` ويُتوقع من النموذج إعادة المحاولة بمعاملات استعلام أضيق. يمنع هذا استهلاك استجابة أداة واحدة لكامل نافذة سياق العميل.

## تحديد المعدل

لا يوجد حد لمعدل الطلبات على مستوى التطبيق في `/mcp`. يُؤجَّل التقنين إلى تزامن API Gateway / Lambda في الإنتاج، وإلى ما يفرضه الوكيل العكسي لديك في عمليات النشر الذاتي.

## اكتشاف OAuth

يعلن خادم MCP عن بيانات تعريف OAuth 2.1 حتى تتمكن العملاء التي تتصل فقط بالخوادم المكتشفة عبر OAuth — وبالأخص واجهة "Add custom connector" في Claude.ai — من تسجيل دخول المستخدم دون مفتاح ملصوق. يُعد `/mcp` المورد المحمي، و[مزوّد OAuth](./connected-apps) الموجود تحت `/membership/oauth` هو خادم التفويض الخاص به، وصفحة `/oauth` في B1Admin هي شاشة الموافقة.

| نقطة النهاية | الغرض |
|---|---|
| `GET /.well-known/oauth-protected-resource` (وأيضًا `/.well-known/oauth-protected-resource/mcp`) | بيانات المورد المحمي (RFC 9728): `resource` هو `<api>/mcp`، و`authorization_servers` هو جذر واجهة البرمجة، و`scopes_supported` يسرد كل [نطاق من نطاقات مفتاح API](./api-keys#scopes) |
| `GET /.well-known/oauth-authorization-server` | بيانات خادم التفويض (RFC 8414): `authorization_endpoint` هو `/oauth` في B1Admin، و`token_endpoint` هو `/membership/oauth/token`، و`registration_endpoint` هو `/membership/oauth/register` |
| `POST /membership/oauth/register` | التسجيل الديناميكي للعميل (RFC 7591) |

التدفق الذي يُنفّذه عميل مثل claude.ai:

1. يُعيد `POST /mcp` بدون رمز الرد 401 مع ترويسة `WWW-Authenticate` تشير إلى بيانات المورد المحمي.
2. يقرأ العميل وثيقتي البيانات، ثم يسجّل نفسه عبر `POST /membership/oauth/register`، مرسلًا `client_name` و`redirect_uris` واختياريًا `scope`. كل عميل يسجّل نفسه هو عميل **عام**: لا يُصدَر أي سر، والاستجابة تحمل `token_endpoint_auth_method: "none"`. يجب أن تكون عناوين إعادة التوجيه `https`، أو `http` على عنوان loopback (`localhost` أو `127.0.0.1` أو `[::1]`)؛ وبحد أقصى 10 لكل عميل. التسجيل محدود بمعدل 20 في الساعة لكل عنوان IP.
3. يُوجَّه المستخدم إلى `/oauth` في B1Admin مع `code_challenge` و`code_challenge_method=S256`. تسرد صفحة الموافقة كل نطاق مطلوب بلغة واضحة (أو "كل ما يمكن لحساب B1 الخاص بك الوصول إليه" إذا لم يُطلب شيء)، وتعرض المضيف الذي سيُعاد توجيه المستخدم إليه، وتشير إلى أن التطبيق سجّل نفسه ذاتيًا. ينقر المستخدم **السماح**.
4. يتبادل العميل الرمز عند `/membership/oauth/token` مع `grant_type=authorization_code` و`code_verifier` الخاص به، ولاحقًا يجدّد الرمز بـ `grant_type=refresh_token`. يُقبل كلٌّ من الأجسام المُرمَّزة بصيغة النموذج وأجسام JSON.
5. رمز الوصول الناتج هو رمز JWT من B1 ذي نطاق محدد، ويُستخدم كرمز Bearer على `/mcp`.

قواعد PKCE: يُقبل `S256` فقط. يجب على العميل الذي لا يملك سرًا أن يرسل `code_challenge` عند التفويض و`code_verifier` المطابق عند تبادل الرمز؛ أما العملاء السريون (الذين لديهم سر) فقد يستخدمون السر وحده. يجب أن تتطابق عناوين إعادة التوجيه مع عنوان مسجَّل تطابقًا تامًا.

العملاء الذين يقبلون رمز Bearer ثابتًا في إعدادهم — مثل Claude Code وClaude Desktop وOpenAI Agents SDK وCursor والكود المخصص — يمكنهم الاستمرار في استخدام مفتاح `cak_…` بدلًا من ذلك.

## التطوير المحلي

تُركَّب نقطة نهاية MCP جنبًا إلى جنب مع كل شيء آخر عند تشغيل واجهة البرمجة محليًا:

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

عند البدء، يؤكد سطر السجل `📡 MCP server ready at /mcp — N routes in inventory` أن السجل قد بُني.

اختبره باستخدام MCP Inspector:

```bash
npx @modelcontextprotocol/inspector
```

في واجهة Inspector، وجّهه إلى `http://localhost:8084/mcp` واضبط ترويسة `Authorization` على `Bearer cak_<prefix>.<secret>`. استدعِ `list_endpoints` أولًا؛ يجب أن ترى قائمة المسارات الكاملة. ثم يجب أن يُعيد `api_call({ method: "GET", path: "/membership/people" })` أشخاص البيانات التجريبية المحلية لديك.

## تخطيط الشيفرة

يقع خادم MCP في `src/modules/mcp/` في مستودع Api. الملفات المهمة:

| الملف | الغرض |
|---|---|
| `McpController.ts` | `@controller("/mcp")`؛ يربط `StreamableHTTPServerTransport` لكل طلب ويرسل تحدي `WWW-Authenticate` عند 401 |
| `WellKnownController.ts` / `OAuthMetadata.ts` | يقدّم وثائق اكتشاف OAuth في `/.well-known` |
| `McpServer.ts` | يبني خادم MCP `Server` ويسجّل الأدوات الأربع |
| `RouteInventory.ts` | يمرّ على بيانات inversify-express-utils وقت البدء لتعداد المسارات |
| `internalDispatch.ts` | كائنا `req`/`res` اصطناعيان يعيدان الدخول إلى تطبيق Express داخل العملية |
| `tools/` | `listEndpoints.ts`، `describeEndpoint.ts`، `apiCall.ts`، `describePageBuilder.ts` |
| `examples.ts` | عينات طلب/استجابة منتقاة لنقاط النهاية عالية الاستخدام |

## ذو صلة

- [مفاتيح API](./api-keys)
- [Webhooks](./webhooks)
- [التطبيقات المتصلة (OAuth)](./connected-apps)
- [Claude — إعداد المستخدم النهائي](/docs/b1-admin/integrations/claude)
- [ChatGPT — إعداد المستخدم النهائي](/docs/b1-admin/integrations/chatgpt)
