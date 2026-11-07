---
title: "वेब Push सूचनाएँ"
description: "VAPID कुंजियाँ, WebPushHelper क्लाइंट और सर्विस वर्कर हैंडलिंग सेट करें, ताकि B1.church और B1 Admin सदस्यों को ब्राउज़र पुश नोटिफ़िकेशन भेज सकें।"
---

# वेब Push सूचनाएँ

<div class="article-intro">

ChurchApps वेब ऐप्स W3C Web Push API के माध्यम से push सूचनाएँ भेजते हैं -- वही तंत्र जो सर्वर-साइड पर Firebase Cloud Messaging उपयोग करता है, लेकिन FCM के बजाय ब्राउज़र के नेटिव `PushManager` के माध्यम से। MessagingApi पर एक एकल VAPID key pair हर उपभोक्ता (B1Admin, B1App, भविष्य के PWAs) को कवर करता है।

</div>

## Push कब चलता है {#when-push-fires}

Push `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`) में एक एकल डिलीवरी पास के भीतर एक स्तर है: पहले एक इन-ऐप प्राथमिकता गेट, फिर socket डिलीवरी और push एक ही पास में प्रयास किए जाते हैं (हर एक अपने प्राथमिकता गेट के पीछे), फिर ईमेल। जिस प्राप्तकर्ता ने श्रेणी को म्यूट किया है, वह कभी push तक नहीं पहुँचता। Socket डिलीवरी सफल होने पर भी अब push नहीं रुकता -- हर सूचना प्रकार अब वैसे ही व्यवहार करता है जैसे निजी संदेश हमेशा करते थे, इसलिए पृष्ठभूमि में बैठा इंस्टॉल किया हुआ PWA भी OS-स्तरीय सूचना दिखाता है, भले ही socket डिलीवरी पहले ही पहुँच गई हो; डुप्लिकेट बैनर इसके बजाय service worker द्वारा क्लाइंट-साइड पर दबाए जाते हैं (देखें [Service worker आवश्यकता](#service-worker-requirement))। निर्धारित रिमाइंडर और स्टाफ़-ट्रिगर प्रसारण सीधे push स्तर से शुरू होते हैं, socket चरण पूरी तरह छोड़ते हुए। ईमेल अब भी टाइमर-चालित है, अपनी अलग शेड्यूल पर अपठित पंक्तियों को आगे बढ़ाता है, इस पास के हिस्से के रूप में नहीं।

Push तक पहुँचने वाले सबसे आम पथ:

1. **कंटेंट सूचनाएँ** -- किसी ऐसी बातचीत का उत्तर जिसे व्यक्ति फ़ॉलो करता है, एक mention, या `NotificationHelper.createNotifications()` के माध्यम से रूट होने वाला कोई अन्य इवेंट।
2. **निजी संदेश** -- एक सीधा संदेश उसी डिलीवरी फ़ंक्शन से जाता है और हमेशा socket डिलीवरी के साथ push का प्रयास करता है।
3. **निर्धारित रिमाइंडर** -- इवेंट, कार्य, और सेवा रिमाइंडर जिन्हें रिमाइंडर इंजन विस्तारित और भेजता है, जो नई घटनाएँ सीधे push स्तर पर शुरू करता है।
4. **स्टाफ़-ट्रिगर push** -- एक-बारगी या समूह प्रसारण के लिए `POST /messaging/notifications/create`, `/ping`, और `/group/send`।

## सर्वर प्रवाह

```
NotificationHelper.createNotifications(...) / checkShouldNotify(...) / ReminderEngine.scan(...)
  │
  └─ NotificationHelper.attemptDeliveryWithEscalation(...)
       ├─ इन-ऐप प्राथमिकता गेट                  ← म्यूट प्राप्तकर्ता यहीं रुकते हैं, कोई push नहीं
       ├─ उसी पास में, दोनों प्रयास किए जाते हैं (कोई दूसरे को गेट नहीं करता):
       │    ├─ DeliveryHelper के माध्यम से socket डिलीवरी  ← रिमाइंडर/प्रसारण के लिए छोड़ी जाती है (वे push से शुरू होते हैं)
       │    └─ push प्राथमिकता गेट
       │         └─ WebPushHelper.sendBulkTypedMessages(tokens, title, body, type, contentId)
       │              └─ web-push library → VAPID-हस्ताक्षरित POST → ब्राउज़र push सेवा
       └─ ईमेल प्राथमिकता गेट → टाइमर-चालित, अपठित पंक्तियों को अलग से आगे बढ़ाता है
```

### आवश्यक पर्यावरण चर

VAPID keys `Environment` में संग्रहीत होती हैं और push सक्षम होने के लिए मौजूद होनी चाहिए:

| पर्यावरण चर | `Environment` सेटिंग | विवरण |
|----------|----------|-------------|
| `WEB_PUSH_PUBLIC_KEY` | `webPushPublicKey` | VAPID सार्वजनिक key (base64url)। `GET /messaging/webpush/publicKey` के माध्यम से क्लाइंट्स को लौटाई जाती है |
| `WEB_PUSH_PRIVATE_KEY` | `webPushPrivateKey` | VAPID निजी key। हर बाहरी push पर हस्ताक्षर के लिए उपयोग |
| `WEB_PUSH_SUBJECT` | `webPushSubject` | Push सेवाओं को रिपोर्ट किया गया `mailto:` URI। डिफ़ॉल्ट `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` तब `false` लौटाता है जब कोई भी key गायब हो -- messaging मॉड्यूल चलता रहता है, push डिलीवरी बस no-op होती हैं। B1App का मोबाइल साइट तब सदस्यों को बताता है कि push चालू नहीं है, सेटअप की पेशकश करने के बजाय।

### VAPID key pair बनाना

```bash
npx web-push generate-vapid-keys
```

आउटपुट को अपने `.env` (स्थानीय) या AWS SSM Parameter Store (डिप्लॉय किए गए) में जोड़ें। Keys बदलने से हर मौजूदा सदस्यता अमान्य हो जाती है -- क्लाइंट्स को अगले पेज लोड पर फिर से पंजीकरण करना होगा।

## भंडारण मॉडल

Web Push सदस्यताएँ मौजूदा `devices` तालिका में FCM डिवाइस रिकॉर्ड के साथ संग्रहीत होती हैं। वे `fcmToken` कॉलम पर `webpush:` उपसर्ग से अलग पहचानी जाती हैं:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

इससे एक एकल `loadByPersonId` कॉल हर वह डिवाइस लौटाती है जो किसी उपयोगकर्ता ने पंजीकृत किया है, प्लेटफ़ॉर्म चाहे जो हो। `WebPushHelper.isWebPushToken(token)` और `decodeSubscription(token)` उपसर्ग तर्क संभालते हैं।

## Endpoints

Base path: `/messaging/webpush`

| विधि | पथ | Auth | विवरण |
|--------|------|------|-------------|
| GET | `/publicKey` | Public | `{ publicKey, enabled }` लौटाता है। क्लाइंट्स `publicKey` को `pushManager.subscribe({ applicationServerKey })` को पास करते हैं |
| POST | `/subscribe` | JWT | प्रमाणित उपयोगकर्ता के लिए एक सदस्यता पंजीकृत (या upsert) करता है। बॉडी: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Public | ऐसी कोई भी डिवाइस पंक्ति हटाता है जिसके `fcmToken` में दिया गया endpoint हो। बॉडी: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | सर्वर-साइड id से एक विशिष्ट डिवाइस पंक्ति हटाता है |

## क्लाइंट प्रिमिटिव: `WebPushHelper`

`@churchapps/apphelper` का `WebPushHelper` एकल क्लाइंट-साइड प्रवेश बिंदु है। होस्ट इसे बूट पर एक बार कॉन्फ़िगर करते हैं और लॉगिन के बाद `subscribe()` कॉल करते हैं।

```typescript
import { WebPushHelper } from "@churchapps/apphelper";

// आपके ऐप के bootstrap में (जैसे _app.tsx, layout.tsx)
WebPushHelper.configure({
  scope: "/",                // service worker scope; sw.js पंजीकरण से मेल खाता है
  appName: "B1AppPwa"        // डिवाइस पंक्ति पर संग्रहीत, सतह द्वारा फ़िल्टर करने के लिए उपयोगी
});

// लॉगिन के बाद (और हर userChurch बदलाव के बाद)
await WebPushHelper.subscribe();
```

उपभोक्ताओं को मुफ़्त में मिलने वाले व्यवहार:

- **क्षमता जाँच** -- `isSupported()` उन ब्राउज़रों पर `false` लौटाता है जिनमें `serviceWorker` / `PushManager` / `Notification` नहीं है।
- **कूलडाउन** -- `canPromptNow()` `localStorage` के माध्यम से प्रॉम्प्ट्स के बीच 7-दिन का कूलडाउन लागू करता है, ताकि OS प्रॉम्प्ट खारिज करने वाले उपयोगकर्ताओं से हर सत्र पर फिर न पूछा जाए।
- **Opt-out** -- `setOptedOut(true)` और `unsubscribe()` फिर से प्रॉम्प्ट करना रोकते हैं और सर्वर-साइड डिवाइस पंक्ति हटाते हैं।
- **Standalone-PWA पहचान** -- `isStandalone()` होस्ट्स को iOS push प्रॉम्प्ट्स को "उपयोगकर्ता ने PWA को होम स्क्रीन पर इंस्टॉल किया है" के पीछे गेट करने देता है (iOS केवल इंस्टॉल किए गए PWAs से push की अनुमति देता है)।
- **चर्च बदलने पर फिर से नामांकन** -- `refreshEnrollment()` उपयोगकर्ता से फिर प्रॉम्प्ट किए बिना मौजूदा ब्राउज़र सदस्यता को नए `userChurch` के विरुद्ध फिर पोस्ट करता है। इसे `userChurch` बदलाव handler से कॉल करें।

### Service worker आवश्यकता {#service-worker-requirement}

ब्राउज़र का `PushManager` केवल तभी सदस्यता हल करता है जब कॉन्फ़िगर किए गए scope पर एक service worker पंजीकृत हो। ChurchApps PWAs service worker उत्पन्न करने के लिए [Serwist](https://serwist.dev/) (Next.js ऐप्स) या workbox उपयोग करते हैं। चूँकि सर्वर अब हमेशा socket डिलीवरी के साथ push का प्रयास करता है (देखें [Push कब चलता है](#when-push-fires)), service worker डुप्लिकेशन बिंदु है: इसका `push` handler `showNotification` को दबाना चाहिए जब कोई फ़ोकस्ड/दिखने वाला क्लाइंट पहले से सूचना के deep-link लक्ष्य पर हो, लेकिन बैनर दिखाया गया था या नहीं, इसकी परवाह किए बिना ऐप बैज हमेशा अपडेट करना चाहिए:

```javascript
// public/sw.js (या जो भी Serwist/workbox उत्पन्न करे)
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "ChurchApps";
  const target = deepLinkFor(data.type, data.contentId, data);

  event.waitUntil((async () => {
    if (typeof data.badgeCount === "number") await updateAppBadge(data.badgeCount); // हमेशा चलता है, भले ही बैनर दबाया गया हो

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

`deepLinkFor` / `clientMatchesTarget` उपभोक्ता-विशिष्ट हैं -- संदर्भ कार्यान्वयन के लिए `B1App/src/app/sw.ts` देखें। B1App `privateMessage` को `/mobile/messages/:personId` पर रूट करता है, B1Admin `notification` को अपने alerts पैनल पर रूट करता है, आदि।

## परिचालन नोट्स

- **`gone: true` परिणाम** -- `WebPushHelper.sendBulk` प्रति प्राप्तकर्ता `{ token, success, gone, errorMessage }` लौटाता है। `gone: true` परिणाम (push सेवा ने `404` या `410` दिया) का मतलब है कि सदस्यता स्थायी रूप से अमान्य है; `NotificationHelper` में बाद का कोड उन डिवाइस पंक्तियों को हटाता है ताकि उन्हें फिर से प्रयास न किया जाए।
- **TTL** -- push संदेश `TTL: 86400` (24 घंटे) के साथ भेजे जाते हैं। यदि उपयोगकर्ता का ब्राउज़र 24 घंटों के भीतर push सेवा से नहीं जुड़ता, तो push छोड़ दिया जाता है।
- **कोई पुनः प्रयास नहीं** -- एक क्षणिक विफलता (timeout, 5xx) लॉग होती है और दोबारा प्रयास नहीं होता। Push सर्वोत्तम-प्रयास है; पेज के भीतर का socket और ईमेल सूचना स्तर स्थायित्व की कहानी संभालते हैं।
- **अक्षम वातावरण** -- डेव वातावरण VAPID keys खाली छोड़ सकते हैं; `WebPushHelper.isEnabled()` `false` लौटाएगा और push short-circuit होंगे। उन वातावरणों के लिए जिनकी अपनी VAPID पहचान नहीं है, यही इच्छित व्यवहार है।

## संबंधित पृष्ठ

- [Notifications Architecture](./architecture/notifications.md) -- पूरा इन-ऐप/push/ईमेल escalation funnel और रिमाइंडर इंजन
- [Real-time Architecture](./realtime.md) -- WebSocket डिलीवरी; push अब उसी पास में socket डिलीवरी के साथ उसी इन-ऐप funnel से फ़ायर होता है, केवल तब fallback के रूप में नहीं जब socket डिलीवरी न पहुँचे
- [Messaging Endpoints](./api/endpoints/messaging.md) -- सूचनाएँ, डिवाइस, और messaging सतह का बाकी हिस्सा
- [AppHelper](./shared-libraries/app-helper.md) -- npm पैकेज जो `WebPushHelper` भेजता है
