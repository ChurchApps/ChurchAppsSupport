---
title: "البنية الفورية"
description: "كيف تُوصل طبقة WebSocket في ChurchApps الدردشة المباشرة والحضور والإشعارات: مصافحة المقبس، واشتراكات الغرف، والعناصر الأساسية للعميل للمطورين."
---

# البنية الفورية

<div class="article-intro">

تستخدم ChurchApps إطار عمل واحدًا قائمًا على WebSocket لكل الأسطح الفورية، مثل دردشة المجموعات والرسائل الخاصة وملاحظات المحتوى ودردشة البث المباشر والحضور والوجود. تُوثّق هذه الصفحة البروتوكول والخادم والعناصر الأساسية للعميل التي يستخدمها المستهلكون.

</div>

## نظرة عامة

```
┌────────────────────┐                ┌────────────────────────────┐
│ Browser / B1Admin  │                │  MessagingApi (Lambda)     │
│ Browser / B1App    │ ─── WS ─────▶  │  ┌───────────────────────┐ │
│  - SocketHelper    │                │  │ SocketHelper (server) │ │
│  - SubscriptionMgr │   POST /msg ──▶│  │ MessageController     │ │
│  - ConversationStore│  POST /conn ─▶│  │ ConnectionController  │ │
│  - PresenceStore   │ ◀── action ──  │  │ DeliveryHelper        │ │
└────────────────────┘                │  └───────────────────────┘ │
                                      └────────────────────────────┘
```

يتكون البروتوكول من ثلاثة مكوّنات:

1. **اتصال WebSocket واحد دائم** لكل تبويب متصفح، يفتحه `SocketHelper`.
2. **صفوف الاتصال** (`POST /messaging/connections`) المسجّلة في جدول `connections`. تُعلّم هذه الصفوف المجموعة `(socketId, churchId, conversationId)` كمشترك في غرفة.
3. **النشر من الخادم إلى المشتركين** عبر `DeliveryHelper.sendConversationMessages()`. عند حفظ رسالة (`POST /messaging/messages/send`)، يقرأ الخادم صفوف الاتصال المطابقة ويدفع حمولة مُصنّفة إلى كل مقبس مفتوح.

لا يوجد Socket.IO، ولا آلية بديلة بالاستطلاع الطويل (long-polling)، ولا خدمة مصغّرة منفصلة. يعمل WebSocket داخل العملية نفسها التي تعمل فيها واجهة REST البرمجية (دالة `web` في Lambda لطلبات HTTP، ودالة `socket` في Lambda لـ WebSocket على AWS، وعملية واحدة مدمجة محليًا وعلى Railway).

## المنافذ والنقل

| البيئة | HTTP | WebSocket |
|--------|------|-----------|
| بيئة التطوير المحلية | `8084` | `ws://localhost:8087` (`WebSocketServer` منفصل) |
| Railway / Docker / المضيفات ذات المنفذ الواحد (عند ضبط `RAILWAY_ENVIRONMENT` أو `SELF_HOSTED`) | مشترك | خادم HTTP مشترك (`SocketHelper.attachToServer()`) |
| AWS Lambda | API Gateway HTTP | API Gateway WebSocket (مسارات `$connect` / `$disconnect` / `$default`) |

يُحدَّد ناقل الاتصال بإعداد `deliveryProvider`:

- `local` ← مكتبة `ws` الخام؛ يتصل العملاء بـ `MessagingApiSocket` من `CommonEnvironmentHelper`.
- `aws` ← API Gateway WebSocket؛ يرسل الخادم الحمولات إلى الاتصالات النشطة عبر `@aws-sdk/client-apigatewaymanagementapi`.

لا يحتاج العميل أبدًا إلى معرفة أي الناقلين مستخدَم، فهو يتحدث البروتوكول نفسه المعتمد على JSON في الحالتين.

## بروتوكول النقل

كل إطار هو JSON بالشكل `PayloadInterface`:

```typescript
interface PayloadInterface {
  churchId: string;
  conversationId: string;  // the "room" — usually a UUID, sometimes "alerts" or "content-{type}-{id}"
  action: PayloadAction;
  data: unknown;
}

type PayloadAction =
  | "socketId"            // server → client, after connect, carries the socketId to use for room joins
  | "message"             // server → client, new message
  | "deleteMessage"       // server → client, message removed
  | "privateMessage"      // server → client, badge-count ping to the recipient's "alerts" room when a direct message escalates; the message body itself arrives via the ordinary "message" action inside the open conversation
  | "reaction"            // server → client, emoji reaction toggled on a message; data is { messageId, conversationId, personId, emoji, added } (added=false means removed). Broadcast to the conversation room by POST /messaging/messages/:messageId/reactions
  | "conversationActivity"// server → client, secondary "something happened" signal for content-room subscribers
  | "attendance"          // server → client, viewer list / presence snapshot
  | "notification"        // server → client, generic notification (counts, etc.)
  | "reconnect"           // client-internal, dispatched locally by SocketHelper after a new socketId handshake completes following a drop — either an exponential-backoff reconnect after an unexpected close, or an immediate reconnect triggered by the resume probe (tab focus/visibility/online); never sent by the server
  | "alert" | "callout";  // legacy, see Connections endpoint reference
```

### المصافحة

1. يفتح العميل المقبس ويرسل النص الحرفي `"getId"`.
2. يرد الخادم بـ `{ action: "socketId", data: "<id>" }`.
3. يخزّن العميل `socketId` ويستخدمه كالإحداثية الثالثة في كل اشتراك بغرفة.

### الانضمام إلى غرفة

الـ«غرفة» ليست سوى مجموعة `(churchId, conversationId)`. للاشتراك، يرسل العميل صف `Connection`:

```http
POST /messaging/connections
[
  {
    "churchId": "CHU00000001",
    "conversationId": "CON123…",
    "socketId": "abc123",
    "personId": null,            // optional; null for anonymous live stream viewers
    "displayName": "Anonymous4823"
  }
]
```

يؤدي الإرسال أيضًا إلى بث `attendance` في المحادثة، ليعلم المشتركون الحاليون بانضمام مشاهد جديد.

### إرسال رسالة

`POST /messaging/messages/send` (يُسمح به للمجهولين) أو `POST /messaging/messages/` (يتطلب المصادقة):

```json
[
  { "churchId": "CHU00000001", "conversationId": "CON123…", "displayName": "John Smith", "content": "Hello!", "messageType": "comment" }
]
```

يحفظ الخادم الرسالة، ثم يبحث `DeliveryHelper.sendConversationMessages()` عن كل صف اتصال لذلك `conversationId` ويرسل إلى كل مقبس إطارًا `{ action: "message", data: <message> }`.

في المحادثات المرتبطة بالمحتوى (مثل الملاحظات المرفقة بشخص)، يُطلق بث ثانٍ بـ `action: "conversationActivity"` على الغرفة الاصطناعية `"content-{type}-{id}"`، ليعرف المستهلكون في عرض القائمة أنهم بحاجة إلى التحديث دون إبقاء المحادثة الأساسية مفتوحة.

### مغادرة غرفة

```http
DELETE /messaging/connections/:churchId/:conversationId/:socketId
```

يحذف صف الاتصال ويُطلق بث `attendance` أخيرًا.

## مكوّنات جانب الخادم

| الملف | الدور |
|------|------|
| `Api/src/modules/messaging/helpers/SocketHelper.ts` | يملك `WebSocketServer`. يعيّن `socketId` عند الاتصال. يشغّل نبضة ping/pong كل 30 ثانية (`startHeartbeat`) تقوم بـ `terminate()` وتنظّف أي اتصال يفوته pong. ينظّف المقابس الميتة ويُعيد بث الحضور عند قطع الاتصال. يعرض `getLiveSocketIds()` و`reapStaleConnections()`، ويستخدمهما مؤقت المهام كل 30 دقيقة لحذف صفوف `connections` القديمة. يتم ذلك محليًا بالتحقق من المقابس الحية داخل العملية، وعلى AWS كآلية احتياطية بمدة صلاحية 24 ساعة لأحداث `$disconnect` الفائتة (تحدّ API Gateway الاتصالات بنحو ساعتين، لذا لا يمكن لهذا أن يحذف اتصالًا حيًّا) |
| `Api/src/modules/messaging/helpers/DeliveryHelper.ts` | `sendConversationMessages(payload)` يقرأ الاتصالات الخاصة بالغرفة ويوجّه كل إطار إلى المقبس المحلي أو إلى اتصال API Gateway على AWS. يبني `sendAttendance(churchId, conversationId)` لقطة المشاهدين ويبثها |
| `Api/src/modules/messaging/controllers/ConnectionController.ts` | `POST /` للانضمام، و`DELETE /:churchId/:conversationId/:socketId` للمغادرة، و`POST /setName` لتحديث الاسم المعروض |
| `Api/src/modules/messaging/controllers/MessageController.ts` | `POST /send` (للمجهولين) و`POST /` (للمصادَقين) يحفظان ثم يوزّعان الرسالة |
| `Api/src/modules/messaging/repositories/ConnectionRepo.ts` | `loadForConversation(churchId, conversationId)` هو المصدر الموثوق لتحديد المشتركين |

## العناصر الأساسية لجانب العميل (`@churchapps/apphelper`)

العناصر الأساسية الخمسة كلها كائنات مفردة ثابتة (static singletons) في `apphelper/src/helpers/`. تعمل معًا بحيث يفتح كل تبويب **اتصال WebSocket واحدًا** مهما بلغ عدد المكوّنات المُركّبة في الصفحة.

### `SocketHelper`

يملك اتصال WebSocket الوحيد. `init()` القابلة لإعادة الدخول آمنة من التكرار، إذ يمكن لعدة مكوّنات استدعاؤها دون فتح مقابس مكررة. تُتيح:

- `init()`: فتح (أو إعادة استخدام) المقبس وإتمام مصافحة `getId`. تُحلّ عند اكتمال المصافحة، أو بعد مهلة 5 ثوانٍ عند تولّي حلقة إعادة المحاولة في الخلفية. لا ترفض أبدًا، فلا يحتاج المستدعون إلى معالجة خاصة لفشل الاتصال الأول.
- `addHandler(action, id, fn)` / `removeHandler(id)`: تسجيل وإلغاء تسجيل المستمعين حسب `action`. يمكن لعدة معالجات الاستماع إلى الإجراء نفسه.
- `setPersonChurch({ personId, churchId })`: للمستدعين المصادَقين؛ يُفعّل الاشتراك في غرفة `"alerts"` ليصل إشعارات الدفع عبر هذا المقبس.
- `onSocketIdReady(fn)`: يُطلق عند كل `socketId` جديد، لا عند الأول فقط، أي المصافحة الأولية وكل إعادة اتصال لاحقة. يستخدمه `SubscriptionManager` لتنفيذ الانضمامات المعلّقة.
- `checkConnection()`: تُستدعى بواسطة مستمعي الاستئناف أدناه؛ تعيد الاتصال فورًا إذا كان المقبس مغلقًا بالفعل، أو ترسل مسبار حيوية إذا بدا مفتوحًا.

**دورة حياة إعادة الاتصال.** يُجدول الإغلاق غير المتوقع إعادة اتصال بتأخير متزايد أسيًّا (1 ثانية، تتضاعف حتى سقف 30 ثانية). يستمع `SocketHelper` أيضًا إلى `online` و`focus` و`pageshow` و`visibilitychange` على `window`/`document` لاكتشاف استئناف التبويب. إذا كان المقبس مغلقًا بالفعل، يعيد الاتصال فورًا ويُعيد ضبط التأخير. وإذا بدا مفتوحًا، يرسل مسبار حيوية `"getId"` ويفرض إعادة الاتصال إذا لم يصل أي إطار خلال 3 ثوانٍ. وهذا يلتقط المقابس نصف المفتوحة التي تتركها أنظمة الهاتف المحمول بعد تعليق التطبيق. عند نجاح إعادة المصافحة، يُرسل `SocketHelper` الإجراء المحلي `"reconnect"` (انظر [بروتوكول النقل](#wire-protocol)) إلى كل معالج مسجّل لهذا الإجراء.

### `SubscriptionManager`

عضوية الغرف بعدّ المراجع (ref-counted). عدة مكوّنات تشترك في المحادثة نفسها تُسجّل صف اتصال واحدًا فقط على الخادم.

```typescript
import { SubscriptionManager } from "@churchapps/apphelper";

await SubscriptionManager.joinRoom(conversationId, churchId, personId, displayName);
// ... component renders, receives socket frames via ConversationStore.subscribe ...
await SubscriptionManager.leaveRoom(conversationId, churchId);
```

ثلاثة سلوكيات يحصل عليها المستهلكون مجانًا:

- **تأخير المغادرة (300 مللي ثانية)**: يتحمل الإلغاء المزدوج للتركيب والإزالة في React StrictMode، ودورات إعادة التركيب القصيرة، دون إسقاط الاشتراك على الخادم. كما يلغي `reset()` أي عمليات مغادرة مؤجلة معلّقة.
- **إعادة الانضمام عند إعادة الاتصال**: يتذكر `SubscriptionManager` القيمتين `personId`/`displayName` المستخدمتين للانضمام إلى كل غرفة. لذا عند حدث `"reconnect"` في `SocketHelper` (وعند كل استدعاء لـ `onSocketIdReady`)، يعيد إرسال كل صف اتصال نشط مع الحفاظ على الهوية. تُزال التكرارات لكل `socketId`، فلا تُرسل الغرفة نفسها مرتين في إعادة الاتصال نفسها.
- **ربط `socketId` المتأخر**: يسجّل `joinRoom` النية قبل أن تكتمل مصافحة المقبس، ويُنفَّذ `POST /connections` الفعلي عند `onSocketIdReady`.

### `ConversationStore`

ذاكرة تخزين مؤقت في الذاكرة مفهرسة بـ `conversationId`. تسجّل معالجات المقبس `message` و`deleteMessage` و`privateMessage` مرة واحدة فقط، وتطبّق الإطارات الواردة على المحادثات المفتوحة حاليًا.

```typescript
import { ConversationStore } from "@churchapps/apphelper";

const conv = await ConversationStore.loadByConversationId(conversationId, churchId);
// ↑ uses /messages/conversation/:id when authenticated, /messages/catchup/:churchId/:id when anonymous

const unsubscribe = ConversationStore.subscribe(conversationId, (conv) => {
  setMessages(conv.messages);  // re-render with the latest snapshot
});
// ...
unsubscribe();
ConversationStore.forget(conversationId);  // optional explicit cleanup
```

يحصل المستدعون المصادَقون أيضًا على **تعبئة بيانات الأشخاص**. تُحَلّ قيم `personId` في الرسائل الواردة إلى كائنات `PersonInterface` عبر استعلام `GET /people/ids` مخزّن مؤقتًا. يتخطى المجهولون هذه الخطوة.

عند حدث `"reconnect"` في `SocketHelper`، يعيد `ConversationStore` جلب كل محادثة لديها مستمعو `subscribe` نشطون حاليًا، لاستعادة الرسائل التي فاتت أثناء انقطاع المقبس. تتخطى المحادثات المجهولة هذا الاستدراك إذا لم يُسجَّل `churchId` الخاص بها أبدًا، لأن نقطة الاستدراك تتطلب هذا المعرّف.

### `PresenceStore`

يحاكي نمط `ConversationStore` لإجراء `attendance`. يتلقى المشتركون لقطة `PresenceSnapshot { conversationId, totalViewers, viewers }` كلما أعاد الخادم بث الحضور. تُزال اللقطات المتطابقة قبل الإشعار، فلا تُسبب عواصف إعادة الاتصال عمليات إعادة رسم غير ضرورية.

```typescript
import { PresenceStore } from "@churchapps/apphelper";

const unsubscribe = PresenceStore.subscribe(conversationId, (snapshot) => {
  setViewerCount(snapshot.totalViewers);
});
```

### `NotificationService`

نقطة التشغيل الرئيسية للمستدعين **المصادَقين**. يغلّف `SocketHelper.init()`، ويضبط سياق الشخص والكنيسة (الذي ينضم تلقائيًا إلى غرفة `"alerts")، ويستدعي `ConversationStore.ensureHandlers()` و`PresenceStore.ensureHandlers()` و`SubscriptionManager.setupRejoin()` مرة واحدة فقط. كما يسجّل معالج `"reconnect"` خاصًا به يعيد تحميل عدادات الإشعارات والرسائل الخاصة (PM)، لتستعيد الشارات حالتها بعد انقطاع الاتصال.

```typescript
await NotificationService.getInstance().initialize(userContext);
```

تتجاوز التدفقات المجهولة (ودردشة البث المباشر هي المثال الأوضح) `NotificationService` وتستدعي العناصر الأساسية مباشرة. راجع `B1App/src/helpers/StreamChatManager.ts` للاطلاع على تطبيق مرجعي.

## دردشة البث المباشر

البث المباشر هو أكبر مستهلك مجهول لهذا الإطار. يستخدم نوعين من `contentType` لتحديد نطاق الغرف:

- `streamingLive`: تبويب الدردشة العام في `/stream` (غرفة واحدة لكل `streamingService`).
- `streamingLiveHost`: غرفة خاصة لا تظهر إلا للموظفين الذين لديهم صلاحية `contentApi.chat.host`. يُشفَّر معرّف الغرفة على الخادم (`GET /streamingServices/:id/hostChat`) حتى لا يكشفه الجمع العرضي للبيانات.

يُشغّل `B1App/src/helpers/StreamChatManager.ts` الغرفتين عبر العناصر الأساسية الموحّدة، ولم يعد هناك أي كود مقابس خاص بالبث المباشر.

## الأنماط والمزالق الشائعة

- **لا تفتح WebSocket خاصًا بك.** `SocketHelper` كائن مفرد لسبب. إن احتجت للاستماع إلى إجراء مخصص، فسجّل معالجًا على المقبس الموجود عبر `SocketHelper.addHandler`.
- **لا تتجاوز `SubscriptionManager`.** استدعاءات `POST /connections` المباشرة تعمل، لكنها تفقد عدّ المراجع وتأخير المغادرة وإعادة الانضمام عند إعادة الاتصال. تمر دردشة المجموعات ومستهلكو الرسائل الخاصة جميعهم عبر `SubscriptionManager`.
- **يجب أن تكون معرّفات المعالجات فريدة لكل إجراء.** يفهرس `SocketHelper.addHandler(action, id, fn)` بالزوج `(action, id)`، وإعادة استخدام المعرّف نفسه لمستمعين اثنين يستبدل الأول. تستخدم المخازن الموحّدة معرّفات مثل `"ConversationStore-Message"` و`"PresenceStore-Attendance"` لتجنب التعارض مع معرّفات المستهلكين.
- **معرّفات الغرف نصوص غامضة (opaque).** معظمها UUID للمحادثات، لكن النظام يدعم أيضًا `"alerts"` (إشعارات كل شخص)، و`"content-{type}-{id}"` (غرف النشاط الاصطناعية)، ومعرّفات `streamingLiveHost` المشفّرة.
- **تُتحقق المصادقة عند حدّ REST لا عند المقبس.** الانضمام إلى غرفة عبر `POST /connections` مسموح للمجهولين. يتم التحكم في الوصول وقت إرسال الرسالة، إذ يحدد متحكّم الرسائل أنواع `messageType` التي يحق للمجهول إرسالها.

## صفحات ذات صلة

- [بنية الإشعارات](./architecture/notifications.md) -- مسار التصعيد داخل التطبيق والدفع والبريد الذي يغذيه هذا النقل
- [نقاط نهاية المراسلة](./api/endpoints/messaging.md) -- واجهة REST الكاملة للرسائل والمحادثات والاتصالات والأجهزة
- [إشعارات الدفع على الويب](./web-push.md) -- دفع المتصفح، منفصل عن تسليم المقبس داخل الصفحة
- [AppHelper](./shared-libraries/app-helper.md) -- حزمة npm التي تشحن العناصر الأساسية لجانب العميل
- [هيكل الوحدات](./api/module-structure.md) -- كيف تُنظَّم وحدة المراسلة على جانب الخادم
