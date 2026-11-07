---
title: "إشعارات الويب الفورية"
---

# إشعارات الويب الفورية

<div class="article-intro">

تُرسل تطبيقات ChurchApps للويب إشعارات فورية عبر واجهة W3C Web Push API، وهي الآلية نفسها التي تستخدمها Firebase Cloud Messaging على الخادم، لكنها تُسلَّم عبر `PushManager` الأصلي في المتصفح بدلاً من FCM. يغطي زوج مفاتيح VAPID واحد في MessagingApi جميع المستهلكين، مثل B1Admin وB1App وتطبيقات PWA المستقبلية.

</div>

## متى يُرسَل الإشعار الفوري

يمثل الإشعار الفوري مرحلة واحدة ضمن مسار تسليم واحد داخل `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`). يبدأ المسار ببوابة تفضيلات داخل التطبيق، ثم تُجرَّب في الدفعة نفسها كلٌّ من خدمة السوكيت والإشعار الفوري، ولكل منهما بوابة تفضيلات خاصة، وأخيراً يُرسل البريد الإلكتروني. لا يصل الإشعار الفوري أبداً إلى مستلم كتم الفئة. ولم يعد نجاح تسليم السوكيت يوقف الإشعار الفوري، إذ أصبح كل نوع إشعار يتصرف كما كانت تتصرف الرسائل الخاصة دائماً. لذلك يُظهر تطبيق PWA المثبّت الذي يعمل في الخلفية إشعاراً على مستوى نظام التشغيل حتى لو وصل الإشعار عبر السوكيت بالفعل. أما الإشعارات المكررة فيمنعها Service Worker على جانب العميل (انظر [متطلب Service Worker](#service-worker-requirement)). تبدأ التذكيرات المجدولة وعمليات البث التي يطلقها الموظفون مباشرةً من مرحلة الإشعار الفوري، فتتجاوز خطوة السوكيت تماماً. أما البريد الإلكتروني فيبقى مدفوعاً بالمؤقت، إذ يصعّد الصفوف غير المقروءة وفق جدول زمني خاص به، وليس كجزء من هذه الدفعة.

أكثر المسارات شيوعاً التي تصل إلى مرحلة الإشعار الفوري:

1. **إشعارات المحتوى**: رد على محادثة يتابعها الشخص، أو إشارة إليه، أو حدث آخر يُوجَّه عبر `NotificationHelper.createNotifications()`.
2. **الرسائل الخاصة**: تمر الرسالة المباشرة عبر دالة التسليم نفسها، وتحاول دائماً إرسال إشعار فوري إلى جانب تسليم السوكيت.
3. **التذكيرات المجدولة**: تذكيرات الأحداث والمهام والخدمة التي يوسّعها محرك التذكيرات ويرسلها، ويبدأ المواعيد الجديدة مباشرةً من مرحلة الإشعار الفوري.
4. **الإشعارات التي يطلقها الموظفون**: `POST /messaging/notifications/create` و`/ping` و`/group/send` للبث لمرة واحدة أو لمجموعة.

## تدفق الخادم

```
NotificationHelper.createNotifications(...) / checkShouldNotify(...) / ReminderEngine.scan(...)
  │
  └─ NotificationHelper.attemptDeliveryWithEscalation(...)
       ├─ in-app preference gate                  ← muted recipients stop here, no push
       ├─ same pass, both attempted (neither gates the other):
       │    ├─ socket delivery via DeliveryHelper  ← skipped for reminders/broadcasts (they start at push)
       │    └─ push preference gate
       │         └─ WebPushHelper.sendBulkTypedMessages(tokens, title, body, type, contentId)
       │              └─ web-push library → VAPID-signed POST → browser push service
       └─ email preference gate → timer-driven, escalates unread rows separately
```

### متغيرات البيئة المطلوبة

يجب أن تكون مفاتيح VAPID مخزّنة في `Environment` حتى يُفعَّل الإشعار الفوري:

| متغير البيئة | إعداد `Environment` | الوصف |
|----------|----------|-------------|
| `WEB_PUSH_PUBLIC_KEY` | `webPushPublicKey` | المفتاح العام لـ VAPID (base64url). يُعاد للعملاء عبر `GET /messaging/webpush/publicKey` |
| `WEB_PUSH_PRIVATE_KEY` | `webPushPrivateKey` | المفتاح الخاص لـ VAPID. يُستخدم لتوقيع كل إشعار فوري صادر |
| `WEB_PUSH_SUBJECT` | `webPushSubject` | عنوان `mailto:` الذي يُبلَّغ لخدمات الإشعارات الفورية. القيمة الافتراضية هي `mailto:support@churchapps.org` |

يُرجع `WebPushHelper.isEnabled()` القيمة `false` إذا كان أحد المفتاحين مفقوداً. تستمر وحدة الرسائل في العمل، لكن عمليات الإشعار الفوري لا تنفذ شيئاً. ثم يُخبر موقع B1App للأعضاء المتنقّل الأعضاءَ بأن الإشعارات الفورية غير مفعّلة، بدلاً من عرض خيار الإعداد.

### توليد زوج مفاتيح VAPID

```bash
npx web-push generate-vapid-keys
```

أضف الناتج إلى ملف `.env` محلياً، أو إلى AWS SSM Parameter Store في البيئة المنشورة. يؤدي تدوير المفاتيح إلى إبطال كل الاشتراكات الحالية، ويجب على العملاء إعادة التسجيل عند تحميل الصفحة التالية.

## نموذج التخزين

تُخزَّن اشتراكات Web Push في جدول `devices` الموجود إلى جانب سجلات أجهزة FCM. وتتميز بالبادئة `webpush:` في عمود `fcmToken`:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

يتيح هذا لاستدعاء `loadByPersonId` واحد إرجاع كل الأجهزة التي سجّلها المستخدم، بغض النظر عن المنصة. تتولى `WebPushHelper.isWebPushToken(token)` و`decodeSubscription(token)` التعامل مع منطق البادئة.

## نقاط النهاية

المسار الأساسي: `/messaging/webpush`

| الطريقة | المسار | المصادقة | الوصف |
|--------|------|------|-------------|
| GET | `/publicKey` | عامة | تُرجع `{ publicKey, enabled }`. يمرر العملاء `publicKey` إلى `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | تسجّل (أو تحدّث) اشتراكاً للمستخدم المصادَق عليه. النص: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | عامة | تحذف أي صف جهاز يحتوي `fcmToken` على نقطة النهاية المحددة. النص: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | تحذف صف جهاز محدداً بمعرّفه على الخادم |

## عميل المكوّن الأساسي: `WebPushHelper`

`WebPushHelper` في `@churchapps/apphelper` هو نقطة الدخول الوحيدة على جانب العميل. تُهيّئه التطبيقات المضيفة مرة واحدة عند الإقلاع، وتستدعي `subscribe()` بعد تسجيل الدخول.

```typescript
import { WebPushHelper } from "@churchapps/apphelper";

// In your app's bootstrap (e.g., _app.tsx, layout.tsx)
WebPushHelper.configure({
  scope: "/",                // service worker scope; matches sw.js registration
  appName: "B1AppPwa"        // stored on the device row, useful for filtering by surface
});

// After login (and after every userChurch change)
await WebPushHelper.subscribe();
```

السلوكيات التي يحصل عليها المستهلكون دون أي جهد إضافي:

- **فحص الدعم**: تُرجع `isSupported()` القيمة `false` في المتصفحات التي لا تدعم `serviceWorker` أو `PushManager` أو `Notification`.
- **فترة التهدئة**: تفرض `canPromptNow()` فترة تهدئة مدتها 7 أيام بين مرات الطلب، عبر `localStorage`، حتى لا يُسأل المستخدمون الذين رفضوا طلب النظام مرة أخرى في كل جلسة.
- **إلغاء الاشتراك**: يمنع `setOptedOut(true)` و`unsubscribe()` إعادة الطلب، ويحذفان صف الجهاز على الخادم.
- **اكتشاف وضع PWA المستقل**: تتيح `isStandalone()` للتطبيقات المضيفة تقييد طلبات الإشعارات على iOS بحالة "قام المستخدم بتثبيت PWA على شاشته الرئيسية"، لأن iOS لا يسمح بالإشعارات الفورية إلا من تطبيقات PWA المثبّتة.
- **إعادة التسجيل عند تبديل الكنيسة**: تعيد `refreshEnrollment()` إرسال اشتراك المتصفح الحالي مع `userChurch` الجديد دون طلب إذن المستخدم مرة أخرى. استدعها من معالج تغيّر `userChurch`.

### متطلب Service Worker

لا يستطيع `PushManager` في المتصفح تفعيل اشتراك إلا إذا كان Service Worker مسجّلاً على النطاق المُعدّ. تستخدم تطبيقات ChurchApps PWA مكتبة [Serwist](https://serwist.dev/) (لتطبيقات Next.js) أو workbox لتوليد Service Worker. ولأن الخادم يحاول الآن دائماً إرسال إشعار فوري إلى جانب تسليم السوكيت (انظر [متى يُرسَل الإشعار الفوري](#when-push-fires))، يكون Service Worker هو نقطة إزالة التكرار. يجب أن يمنع معالج `push` الخاص به استدعاء `showNotification` عندما يكون عميل مركّز أو مرئي معروضاً بالفعل على وجهة الرابط العميق نفسها، لكن يجب عليه دائماً تحديث شارة التطبيق، سواء ظهر الإشعار أم لم يظهر:

```javascript
// public/sw.js (or whatever Serwist/workbox emits)
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "ChurchApps";
  const target = deepLinkFor(data.type, data.contentId, data);

  event.waitUntil((async () => {
    if (typeof data.badgeCount === "number") await updateAppBadge(data.badgeCount); // always runs, even if the banner is suppressed

    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    // Same pathname; for private messages, also same conversationId.
    const alreadyViewing = clients.some((client) => (client.focused || client.visibilityState === "visible") && clientMatchesTarget(client.url, target));
    if (alreadyViewing) return;

    await self.registration.showNotification(title, {
      body: data.body,
      data: { type: data.type, contentId: data.contentId, url: target },
      icon: "/icons/icon-192.png"
    });
  })());
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const { url: target } = event.notification.data || {};
  event.waitUntil((async () => {
    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });

    const exact = clients.find((client) => clientMatchesTarget(client.url, target));
    if (exact) return exact.focus(); // already on the target: focus, don't navigate

    const mobileClient = clients.find((client) => new URL(client.url).pathname.startsWith("/mobile"));
    if (mobileClient) {
      await mobileClient.focus();
      return mobileClient.navigate(target);
    }

    return self.clients.openWindow(target);
  })());
});
```

تختلف `deepLinkFor` و`clientMatchesTarget` من تطبيق لآخر، وللاطلاع على التطبيق المرجعي راجع `B1App/src/app/sw.ts`. يوجّه B1App نوع `privateMessage` إلى `/mobile/messages/:personId`، ويوجّه B1Admin نوع `notification` إلى لوحة التنبيهات الخاصة به، وهكذا.

## ملاحظات تشغيلية

- **نتائج `gone: true`**: تُرجع `WebPushHelper.sendBulk` النتيجة `{ token, success, gone, errorMessage }` لكل مستلم. تعني النتيجة `gone: true` (أي أن خدمة الإشعارات ردت بالرمز `404` أو `410`) أن الاشتراك صار غير صالح بشكل دائم. ويقوم الكود اللاحق في `NotificationHelper` بحذف صفوف هذه الأجهزة حتى لا تُجرَّب مرة أخرى.
- **TTL**: تُرسل الإشعارات الفورية بقيمة `TTL: 86400` (24 ساعة). إذا لم يتصل متصفح المستخدم بخدمة الإشعارات خلال 24 ساعة، فسيُسقط الإشعار.
- **لا إعادة محاولة**: يُسجَّل الفشل المؤقت (مثل انتهاء المهلة أو خطأ 5xx) دون إعادة محاولة. الإشعار الفوري أفضل جهد ممكن، أما ضمان الاستمرارية فيتولاه السوكيت داخل الصفحة وطبقة البريد الإلكتروني.
- **البيئات غير المفعّلة**: يمكن لبيئات التطوير أن تترك مفاتيح VAPID فارغة، فستُرجع `WebPushHelper.isEnabled()` القيمة `false` وتتجاوز الإشعارات الفورية. وهذا هو السلوك المقصود للبيئات التي لا تملك هوية VAPID خاصة بها.

## صفحات ذات صلة

- [بنية الإشعارات](./architecture/notifications) -- مسار التصعيد الكامل داخل التطبيق والإشعار الفوري والبريد الإلكتروني، ومحرك التذكيرات
- [البنية الفورية](./realtime) -- تسليم WebSocket. يُطلق الإشعار الفوري الآن من مسار التطبيق الداخلي نفسه إلى جانب تسليم السوكيت في الدفعة نفسها، ولا يقتصر دوره على كونه بديلاً عندما لا يصل تسليم السوكيت
- [نقاط نهاية الرسائل](./api/endpoints/messaging) -- الإشعارات والأجهزة وبقية واجهة الرسائل
- [AppHelper](./shared-libraries/app-helper) -- حزمة npm التي تحتوي على `WebPushHelper`
