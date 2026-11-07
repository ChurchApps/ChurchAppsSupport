---
title: "Web Push Bildirimleri"
description: "B1.church ve B1 Admin'in üyelere tarayıcı push bildirimleri gönderebilmesi için VAPID anahtarlarını, WebPushHelper istemcisini ve service worker işlemini kurun."
---

# Web Push Bildirimleri

<div class="article-intro">

ChurchApps web uygulamaları, W3C Web Push API üzerinden push bildirimleri gönderir. Bu, sunucu tarafında Firebase Cloud Messaging'in kullandığı mekanizmanın aynısıdır, ancak bildirimler FCM yerine tarayıcının yerel `PushManager` arayüzü üzerinden iletilir. MessagingApi üzerindeki tek bir VAPID anahtar çifti, tüm kullanıcı uygulamalarını (B1Admin, B1App ve gelecekteki PWA'lar) kapsar.

</div>

## Push bildirimleri ne zaman gönderilir

Push, `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`) içindeki tek bir iletim sürecinde bir aşamadır. Bu süreç şu sırayla çalışır: önce uygulama içi tercih kontrolü, ardından aynı turda denenen soket iletimi ve push (her biri kendi tercih kontrolüne tabidir), en son e-posta. Kategoriyi sessize almış bir alıcıya push hiç ulaşmaz. Soket iletimi başarılı olsa bile push artık durdurulmaz. Her bildirim türü artık özel mesajların her zaman davrandığı gibi davranır. Bu sayede arka planda duran yüklü bir PWA, bildirim soket üzerinden zaten ulaşmış olsa bile işletim sistemi düzeyinde bir bildirim gösterir. Yinelenen bildirim pankartları, bunun yerine hizmet çalışanı (service worker) tarafından istemci tarafında bastırılır (bkz. [Hizmet çalışanı gereksinimi](#service-worker-requirement)). Zamanlanmış hatırlatıcılar ve personel tarafından başlatılan yayınlar doğrudan push aşamasından başlar ve soket adımını tamamen atlar. E-posta ise bu süreçten bağımsız olarak zamanlayıcıyla çalışır. Okunmamış kayıtları kendi takvimine göre yükseltir.

Push aşamasına ulaşan en yaygın yollar şunlardır:

1. **İçerik bildirimleri**: Kişinin takip ettiği bir konuşmaya yanıt, bir etiketleme veya `NotificationHelper.createNotifications()` üzerinden yönlendirilen başka bir olay.
2. **Özel mesajlar**: Doğrudan mesaj aynı iletim fonksiyonundan geçer ve soket iletimiyle birlikte her zaman push da dener.
3. **Zamanlanmış hatırlatıcılar**: Etkinlik, görev ve hizmet hatırlatıcıları. Bunlar hatırlatıcı motoru tarafından genişletilir ve gönderilir. Motor yeni oluşumları doğrudan push aşamasından başlatır.
4. **Personel tarafından başlatılan push'lar**: Tek seferlik veya grup yayınları için `POST /messaging/notifications/create`, `/ping` ve `/group/send`.

## Sunucu akışı

```
NotificationHelper.createNotifications(...) / checkShouldNotify(...) / ReminderEngine.scan(...)
  │
  └─ NotificationHelper.attemptDeliveryWithEscalation(...)
       ├─ uygulama içi tercih kontrolü            ← sessize alınmış alıcılar burada durur, push gönderilmez
       ├─ aynı turda, ikisi de denenir (hiçbiri diğerini engellemez):
       │    ├─ DeliveryHelper üzerinden soket iletimi  ← hatırlatıcılar/yayınlar için atlanır (push'tan başlarlar)
       │    └─ push tercih kontrolü
       │         └─ WebPushHelper.sendBulkTypedMessages(tokens, title, body, type, contentId)
       │              └─ web-push kütüphanesi → VAPID ile imzalanmış POST → tarayıcı push servisi
       └─ e-posta tercih kontrolü → zamanlayıcıyla çalışır, okunmamış kayıtları ayrıca yükseltir
```

### Gerekli ortam değişkenleri

VAPID anahtarları `Environment` içinde saklanır. Push'un etkinleştirilmesi için bu anahtarların mevcut olması gerekir:

| Ortam değişkeni | `Environment` ayarı | Açıklama |
|----------|----------|-------------|
| `WEB_PUSH_PUBLIC_KEY` | `webPushPublicKey` | VAPID genel anahtarı (base64url). `GET /messaging/webpush/publicKey` üzerinden istemcilere döndürülür |
| `WEB_PUSH_PRIVATE_KEY` | `webPushPrivateKey` | VAPID özel anahtarı. Giden her push'u imzalamak için kullanılır |
| `WEB_PUSH_SUBJECT` | `webPushSubject` | Push servislerine bildirilen `mailto:` URI'si. Varsayılanı `mailto:support@churchapps.org` adresidir |

Anahtarlardan herhangi biri eksikse `WebPushHelper.isEnabled()` `false` döndürür. Mesajlaşma modülü çalışmaya devam eder, ancak push iletimleri boşa çıkar. B1App mobil sitesi, kurulum önermek yerine üyelere push'un açık olmadığını bildirir.

### VAPID anahtar çifti oluşturma

```bash
npx web-push generate-vapid-keys
```

Çıktıyı yerel ortamda `.env` dosyanıza, yayınlanmış ortamda ise AWS SSM Parameter Store'a ekleyin. Anahtarları değiştirmek, mevcut tüm abonelikleri geçersiz kılar. İstemcilerin bir sonraki sayfa yüklemesinde yeniden kayıt olması gerekir.

## Depolama modeli

Web Push abonelikleri, FCM cihaz kayıtlarıyla birlikte mevcut `devices` tablosunda saklanır. Bunlar `fcmToken` sütunundaki `webpush:` önekiyle ayırt edilir:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Bu yapı sayesinde tek bir `loadByPersonId` çağrısı, platform fark etmeksizin bir kullanıcının kayıtlı olduğu tüm cihazları döndürür. `WebPushHelper.isWebPushToken(token)` ve `decodeSubscription(token)` önek işlemlerini yönetir.

## Uç noktalar

Temel yol: `/messaging/webpush`

| Yöntem | Yol | Yetkilendirme | Açıklama |
|--------|------|------|-------------|
| GET | `/publicKey` | Herkese açık | `{ publicKey, enabled }` döndürür. İstemciler `publicKey` değerini `pushManager.subscribe({ applicationServerKey })` çağrısına geçirir |
| POST | `/subscribe` | JWT | Kimliği doğrulanmış kullanıcı için bir abonelik kaydeder (varsa günceller). Gövde: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Herkese açık | `fcmToken` değeri verilen endpoint'i içeren cihaz kayıtlarını siler. Gövde: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Sunucu tarafı kimliğiyle belirli bir cihaz kaydını siler |

## İstemci bileşeni: `WebPushHelper`

`@churchapps/apphelper` paketindeki `WebPushHelper`, istemci tarafındaki tek giriş noktasıdır. Uygulamalar bunu başlangıçta bir kez yapılandırır ve oturum açıldıktan sonra `subscribe()` çağrısını yapar.

```typescript
import { WebPushHelper } from "@churchapps/apphelper";

// Uygulamanızın başlatma kodunda (ör. _app.tsx, layout.tsx)
WebPushHelper.configure({
  scope: "/",                // hizmet çalışanı kapsamı; sw.js kaydıyla eşleşir
  appName: "B1AppPwa"        // cihaz kaydında saklanır, yüzeye göre filtrelemek için kullanışlıdır
});

// Oturum açıldıktan sonra (ve her userChurch değişikliğinden sonra)
await WebPushHelper.subscribe();
```

Tüketicilerin ek bir çaba harcamadan kazandığı davranışlar:

- **Yetenek kontrolü**: `isSupported()`, `serviceWorker` / `PushManager` / `Notification` desteklemeyen tarayıcılarda `false` döndürür.
- **Bekleme süresi**: `canPromptNow()`, `localStorage` üzerinden istemler arasında 7 günlük bir bekleme süresi uygular. Böylece işletim sistemi istemini kapatan kullanıcılara her oturumda tekrar sorulmaz.
- **Çıkış**: `setOptedOut(true)` ve `unsubscribe()`, yeniden istemeyi engeller ve sunucu tarafındaki cihaz kaydını kaldırır.
- **Bağımsız PWA algılama**: `isStandalone()`, uygulamaların iOS push istemlerini "kullanıcı PWA'yı ana ekrana yükledi" koşuluna bağlamasını sağlar. iOS yalnızca yüklü PWA'lardan push'a izin verir.
- **Kilise değişiminde yeniden kayıt**: `refreshEnrollment()`, mevcut tarayıcı aboneliğini kullanıcıya yeniden sormadan yeni `userChurch` için yeniden gönderir. Bunu `userChurch` değişiklik işleyicisinden çağırın.

### Hizmet çalışanı gereksinimi

Tarayıcının `PushManager` arayüzü, bir abonelik ancak yapılandırılmış kapsamda bir hizmet çalışanı kayıtlıysa çözümlenir. ChurchApps PWA'ları, hizmet çalışanı üretimi için [Serwist](https://serwist.dev/) (Next.js uygulamaları) veya workbox kullanır. Sunucu artık push'u her zaman soket iletimiyle birlikte denediği için (bkz. [Push bildirimleri ne zaman gönderilir](#when-push-fires)), hizmet çalışanı tekrarları önleme noktasıdır. Açık veya görünür bir istemci zaten bildirimin derin bağlantı hedefindeyse, `push` işleyicisi `showNotification` çağrısını bastırmalıdır. Ancak pankart gösterilip gösterilmediğine bakılmaksızın uygulama rozetini her zaman güncellemelidir:

```javascript
// public/sw.js (veya Serwist/workbox'ın ürettiği dosya)
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "ChurchApps";
  const target = deepLinkFor(data.type, data.contentId, data);

  event.waitUntil((async () => {
    if (typeof data.badgeCount === "number") await updateAppBadge(data.badgeCount); // pankart bastırılsa bile her zaman çalışır

    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    // Aynı yol adı; özel mesajlar için ayrıca aynı conversationId de gerekir.
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
    if (exact) return exact.focus(); // zaten hedefte: odaklan, yeniden yönlendirme yapma

    const mobileClient = clients.find((client) => new URL(client.url).pathname.startsWith("/mobile"));
    if (mobileClient) {
      await mobileClient.focus();
      return mobileClient.navigate(target);
    }

    return self.clients.openWindow(target);
  })());
});
```

`deepLinkFor` ve `clientMatchesTarget` her uygulamaya özgüdür. Referans uygulama için `B1App/src/app/sw.ts` dosyasına bakın. B1App, `privateMessage` türünü `/mobile/messages/:personId` yoluna yönlendirir. B1Admin ise `notification` türünü kendi uyarılar panmasına yönlendirir.

## Operasyonel notlar

- **`gone: true` sonuçları**: `WebPushHelper.sendBulk`, her alıcı için `{ token, success, gone, errorMessage }` döndürür. `gone: true` sonucu (push servisi `404` veya `410` yanıtı verdi), aboneliğin kalıcı olarak geçersiz olduğu anlamına gelir. `NotificationHelper` içindeki sonraki kod bu cihaz kayıtlarını siler, böylece tekrar denenmezler.
- **TTL**: Push mesajları `TTL: 86400` (24 saat) ile gönderilir. Kullanıcının tarayıcısı 24 saat içinde push servisine bağlanmazsa, push düşürülür.
- **Yeniden deneme yok**: Geçici bir hata (zaman aşımı, 5xx) günlüğe yazılır ve yeniden denenmez. Push en iyi çaba esasına dayanır. Kalıcılık, sayfa içindeki soket ve e-posta bildirim aşaması tarafından sağlanır.
- **Devre dışı ortamlar**: Geliştirme ortamları VAPID anahtarlarını boş bırakabilir. Bu durumda `WebPushHelper.isEnabled()` `false` döndürür ve push'lar hemen sonlanır. Bu, kendi VAPID kimliği olmayan ortamlar için amaçlanan davranıştır.

## İlgili sayfalar

- [Bildirim mimarisi](./architecture/notifications.md): Uygulama içi, push ve e-posta yükseltme akışının tamamı ve hatırlatıcı motoru
- [Gerçek zamanlı mimari](./realtime.md): WebSocket iletimi. Push artık yalnızca soket iletimi ulaşmadığında bir yedek olarak değil, aynı turda soket iletimiyle birlikte aynı uygulama içi akıştan tetiklenir.
- [Mesajlaşma uç noktaları](./api/endpoints/messaging.md): Bildirimler, cihazlar ve mesajlaşma yüzeyinin geri kalanı
- [AppHelper](./shared-libraries/app-helper.md): `WebPushHelper` bileşenini içeren npm paketi
