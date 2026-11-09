---
title: "वेब पुश सूचनाएँ"
description: "VAPID keys, WebPushHelper क्लाइंट, और service worker हैंडलिंग सेट करें, ताकि B1.church और B1 Admin सदस्यों तक ब्राउज़र पुश सूचनाएँ पहुँचा सकें।"
---

# वेब पुश सूचनाएँ

<div class="article-intro">

ChurchApps वेब ऐप W3C Web Push API के माध्यम से पुश सूचनाएँ भेजते हैं -- वही तंत्र जो सर्वर पर Firebase Cloud Messaging इस्तेमाल करता है, लेकिन यह ब्राउज़र के नेटिव `PushManager` के ज़रिए पहुँचता है। MessagingApi पर एक VAPID key pair हर उपभोक्ता को कवर करता है (B1Admin, B1App, और भविष्य के PWA)।

</div>

## Push कब चलता है {#when-push-fires}

Push एक ही डिलीवरी पास में `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`) का एक स्तर है: पहले एक in-app प्राथमिकता गेट, फिर socket डिलीवरी और push एक ही पास में आज़माए जाते हैं (हर एक अपने प्राथमिकता गेट के पीछे), फिर ईमेल। जिस प्राप्तकर्ता ने श्रेणी को म्यूट किया है, वह कभी push तक नहीं पहुँचता। अब socket डिलीवरी सफल होने पर भी push नहीं रुकता -- हर सूचना प्रकार अब वैसे ही व्यवहार करता है जैसे निजी संदेश हमेशा करते थे, ताकि पृष्ठभूमि में चल रहा इंस्टॉल किया हुआ PWA तब भी OS-स्तर की सूचना दिखा सके जब socket डिलीवरी पहले ही पहुँच चुकी हो; डुप्लिकेट बैनर इसके बजाय service worker द्वारा क्लाइंट-साइड पर दबाए जाते हैं (देखें [Service worker आवश्यकता](#service-worker-requirement))। निर्धारित रिमाइंडर और स्टाफ़ प्रसारण सीधे push स्तर से शुरू होते हैं, socket चरण को पूरी तरह छोड़ते हुए। ईमेल अब भी टाइमर-संचालित है, और अपठित पंक्तियों को अपने शेड्यूल पर आगे बढ़ाता है, इस पास का हिस्सा बनने के बजाय।

वे सबसे सामान्य रास्ते जो push तक पहुँचते हैं:

1. **सामग्री सूचनाएँ** -- किसी बातचीत का जवाब जिसे व्यक्ति फ़ॉलो करता है, एक mention, या `NotificationHelper.createNotifications()` के ज़रिए गुज़रने वाली कोई और घटना।
2. **निजी संदेश** -- सीधा संदेश उसी डिलीवरी फ़ंक्शन से गुज़रता है और हमेशा socket डिलीवरी के साथ push भी आज़माता है।
3. **निर्धारित रिमाइंडर** -- इवेंट, टास्क, और सेवा रिमाइंडर, जिन्हें रिमाइंडर इंजन विस्तारित और डिस्पैच करता है, और जो नई घटनाएँ सीधे push स्तर से शुरू करता है।
4. **स्टाफ़ द्वारा शुरू किए गए push** -- एक-बार या समूह प्रसारण के लिए `POST /messaging/notifications/create`, `/ping`, और `/group/send`।
5. **निर्धारित स्टाफ़ push** -- `POST /messaging/scheduledNotifications` उस push को सहेजता है जो ऐप वाले सभी लोगों (`audience: "church"`) या एक समूह के लिए है, और 1-मिनट टाइमर उसे समय आने पर भेजता है (देखें [सूचना आर्किटेक्चर](./architecture/notifications.md))। बिना लिंक वाला चर्च-व्यापी push `/mobile/notifications` खोलता है; बिना लिंक वाला समूह push उस समूह को खोलता है।

## सर्वर फ़्लो

```
NotificationHelper.createNotifications(...) / checkShouldNotify(...) / ReminderEngine.scan(...)
  │
  └─ NotificationHelper.attemptDeliveryWithEscalation(...)
       ├─ in-app प्राथमिकता गेट                  ← म्यूट प्राप्तकर्ता यहीं रुकते हैं, कोई push नहीं
       ├─ एक ही पास में, दोनों आज़माए जाते हैं (कोई एक दूसरे को नहीं रोकता):
       │    ├─ DeliveryHelper के ज़रिए socket डिलीवरी  ← रिमाइंडर/प्रसारण के लिए छोड़ी जाती है (वे push से शुरू होते हैं)
       │    └─ push प्राथमिकता गेट
       │         └─ WebPushHelper.sendBulkTypedMessages(tokens, title, body, type, contentId)
       │              └─ web-push लाइब्रेरी → VAPID-हस्ताक्षरित POST → ब्राउज़र push सर्विस
       └─ ईमेल प्राथमिकता गेट → टाइमर-संचालित, अपठित पंक्तियों को अलग से आगे बढ़ाता है
```

### आवश्यक environment variables

VAPID keys `Environment` में संग्रहीत होती हैं, और push चालू होने के लिए उनका होना ज़रूरी है:

| Environment variable | `Environment` सेटिंग | विवरण |
|----------|----------|-------------|
| `WEB_PUSH_PUBLIC_KEY` | `webPushPublicKey` | VAPID सार्वजनिक key (base64url)। `GET /messaging/webpush/publicKey` के ज़रिए क्लाइंट को लौटाई जाती है |
| `WEB_PUSH_PRIVATE_KEY` | `webPushPrivateKey` | VAPID निजी key। हर बाहर जाने वाले push पर हस्ताक्षर के लिए उपयोग होती है |
| `WEB_PUSH_SUBJECT` | `webPushSubject` | `mailto:` URI जो push सर्विस को बताया जाता है। डिफ़ॉल्ट `mailto:support@churchapps.org` है |

अगर दोनों में से कोई key गायब है, तो `WebPushHelper.isEnabled()` `false` लौटाता है -- messaging module चलता रहता है, लेकिन push डिलीवरी बस कुछ नहीं करती। B1App मोबाइल साइट तब सदस्यों को बताती है कि push चालू नहीं है, सेटअप की पेशकश करने के बजाय।

### VAPID key pair बनाना

```bash
npx web-push generate-vapid-keys
```

आउटपुट को अपनी `.env` (स्थानीय) या AWS SSM Parameter Store (तैनात) में जोड़ें। Keys बदलने पर हर मौजूदा subscription अमान्य हो जाती है -- क्लाइंट को अगले पेज लोड पर फिर से enroll करना होगा।

## स्टोरेज मॉडल

Web Push subscriptions मौजूदा `devices` तालिका में FCM device रिकॉर्ड के साथ संग्रहीत होती हैं। इन्हें `fcmToken` कॉलम पर `webpush:` उपसर्ग से पहचाना जाता है:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

इससे एक ही `loadByPersonId` कॉल किसी भी उपयोगकर्ता के enroll किए गए हर डिवाइस को लौटा देती है, प्लेटफ़ॉर्म चाहे जो हो। `WebPushHelper.isWebPushToken(token)` और `decodeSubscription(token)` उपसर्ग का तर्क संभालते हैं।

## एंडपॉइंट

Base path: `/messaging/webpush`

| Method | Path | Auth | विवरण |
|--------|------|------|-------------|
| GET | `/publicKey` | Public | `{ publicKey, enabled }` लौटाता है। क्लाइंट `publicKey` को `pushManager.subscribe({ applicationServerKey })` को देते हैं |
| POST | `/subscribe` | JWT | प्रमाणित उपयोगकर्ता के लिए subscription रजिस्टर करता (या अपडेट करता) है। Body: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Public | ऐसी कोई भी device पंक्ति हटाता है जिसके `fcmToken` में दिया गया endpoint है। Body: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | सर्वर-साइड id से एक विशिष्ट device पंक्ति हटाता है |

## क्लाइंट प्रिमिटिव: `WebPushHelper`

`@churchapps/apphelper` का `WebPushHelper` एकमात्र क्लाइंट-साइड प्रवेश बिंदु है। होस्ट इसे बूट पर एक बार कॉन्फ़िगर करते हैं और लॉगिन के बाद `subscribe()` कॉल करते हैं।

```typescript
import { WebPushHelper } from "@churchapps/apphelper";

// आपके ऐप के bootstrap में (जैसे _app.tsx, layout.tsx)
WebPushHelper.configure({
  scope: "/",                // service worker scope; sw.js पंजीकरण से मेल खाता है
  appName: "B1AppPwa"        // device पंक्ति पर संग्रहीत, surface के अनुसार फ़िल्टर करने के लिए उपयोगी
});

// लॉगिन के बाद (और हर userChurch बदलाव के बाद)
await WebPushHelper.subscribe();
```

उपभोक्ताओं को मुफ़्त में मिलने वाले व्यवहार:

- **क्षमता जाँच** -- `isSupported()` उन ब्राउज़रों पर `false` लौटाता है जिनमें `serviceWorker` / `PushManager` / `Notification` नहीं हैं।
- **Cooldown** -- `canPromptNow()` `localStorage` के ज़रिए प्रॉम्प्ट के बीच 7 दिन का cooldown लागू करता है, ताकि जो उपयोगकर्ता OS प्रॉम्प्ट खारिज करते हैं, उनसे हर सत्र में फिर न पूछा जाए।
- **Opt-out** -- `setOptedOut(true)` और `unsubscribe()` फिर से प्रॉम्प्ट करने से रोकते हैं और सर्वर-साइड device पंक्ति हटाते हैं।
- **Standalone-PWA पहचान** -- `isStandalone()` होस्ट को iOS push प्रॉम्प्ट को "उपयोगकर्ता ने PWA को होम स्क्रीन पर इंस्टॉल किया है" के पीछे रखने देता है (iOS केवल इंस्टॉल किए गए PWA से push की अनुमति देता है)।
- **चर्च बदलने पर फिर से enroll** -- `refreshEnrollment()` मौजूदा ब्राउज़र subscription को नए `userChurch` के विरुद्ध फिर पोस्ट करता है, उपयोगकर्ता से दोबारा पूछे बिना। इसे `userChurch` बदलाव हैंडलर से कॉल करें।

### Service worker आवश्यकता {#service-worker-requirement}

ब्राउज़र का `PushManager` तभी subscription हल करता है जब कॉन्फ़िगर किए गए scope पर service worker पंजीकृत हो। ChurchApps PWA service worker बनाने के लिए [Serwist](https://serwist.dev/) (Next.js ऐप) या workbox उपयोग करते हैं। चूँकि सर्वर अब हमेशा socket डिलीवरी के साथ push भी आज़माता है (देखें [push कब चलता है](#when-push-fires)), इसलिए service worker ही डुप्लिकेट रोकने का बिंदु है: इसका `push` हैंडलर `showNotification` दबा देना चाहिए जब कोई फ़ोकस्ड/दृश्यमान क्लाइंट पहले से उसी सूचना के डीप-लिंक लक्ष्य पर हो, लेकिन ऐप बैज को हमेशा अपडेट करना चाहिए, चाहे बैनर दिखाया गया हो या नहीं:

```javascript
// public/sw.js (या जो भी Serwist/workbox उत्पन्न करता है)
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "ChurchApps";
  const target = deepLinkFor(data.type, data.contentId, data);

  event.waitUntil((async () => {
    if (typeof data.badgeCount === "number") await updateAppBadge(data.badgeCount); // हमेशा चलता है, भले ही बैनर दबा दिया गया हो

    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    // वही pathname; निजी संदेशों के लिए, वही conversationId भी।
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
    if (exact) return exact.focus(); // पहले से लक्ष्य पर: फ़ोकस करें, नेविगेट न करें

    const mobileClient = clients.find((client) => new URL(client.url).pathname.startsWith("/mobile"));
    if (mobileClient) {
      await mobileClient.focus();
      return mobileClient.navigate(target);
    }

    return self.clients.openWindow(target);
  })());
});
```

`deepLinkFor` / `clientMatchesTarget` उपभोक्ता-विशिष्ट हैं -- संदर्भ कार्यान्वयन के लिए `B1App/src/app/sw.ts` देखें। B1App `privateMessage` को `/mobile/messages/:personId` पर भेजता है, B1Admin `notification` को अपने अलर्ट पैनल पर, आदि।

## परिचालन नोट्स

- **`gone: true` परिणाम** -- `WebPushHelper.sendBulk` हर प्राप्तकर्ता के लिए `{ token, success, gone, errorMessage }` लौटाता है। `gone: true` परिणाम (push सर्विस ने `404` या `410` दिया) का अर्थ है कि subscription स्थायी रूप से अमान्य है; `NotificationHelper` का आगे का कोड ऐसी device पंक्तियाँ हटा देता है ताकि वे फिर न आज़माई जाएँ।
- **TTL** -- push संदेश `TTL: 86400` (24 घंटे) के साथ भेजे जाते हैं। अगर उपयोगकर्ता का ब्राउज़र 24 घंटे के भीतर push सर्विस से कनेक्ट नहीं होता, तो push छोड़ दिया जाता है।
- **कोई retry नहीं** -- अस्थायी विफलता (timeout, 5xx) दर्ज होती है और उसे दोबारा नहीं आज़माया जाता। Push सर्वोत्तम प्रयास है; टिकाऊपन की ज़िम्मेदारी इन-पेज socket और ईमेल सूचना स्तर की है।
- **निष्क्रिय वातावरण** -- डेव वातावरण VAPID keys खाली छोड़ सकते हैं; तब `WebPushHelper.isEnabled()` `false` लौटेगा और push बिना भेजे रुक जाएँगे। उन वातावरणों के लिए जिनकी अपनी VAPID पहचान नहीं है, यही इच्छित व्यवहार है।

## संबंधित पेज

- [सूचना आर्किटेक्चर](./architecture/notifications.md) -- पूरा in-app/push/ईमेल एस्केलेशन फ़नल और रिमाइंडर इंजन
- [Real-time आर्किटेक्चर](./realtime.md) -- WebSocket डिलीवरी; push अब socket डिलीवरी के साथ उसी in-app फ़नल से एक ही पास में चलता है, केवल तब का fallback नहीं जब socket डिलीवरी न पहुँचे
- [Messaging Endpoints](./api/endpoints/messaging.md) -- सूचनाएँ, devices, और messaging की बाकी सतह
- [AppHelper](./shared-libraries/app-helper.md) -- वह npm पैकेज जो `WebPushHelper` भेजता है
