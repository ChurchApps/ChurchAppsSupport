---
title: "Gerçek Zamanlı Mimari"
description: "ChurchApps'in WebSocket katmanının canlı sohbet, varlık bilgisi ve bildirimleri nasıl ilettiği: soket el sıkışması, oda abonelikleri ve geliştiriciler için istemci temel öğeleri."
---

# Gerçek Zamanlı Mimari

<div class="article-intro">

ChurchApps, grup sohbeti, özel mesajlar, içerik notları, canlı yayın sohbeti ve varlık/katılım takibi dahil her gerçek zamanlı yüzey için tek bir WebSocket tabanlı iletim çerçevesi kullanır. Bu sayfa protokolü, sunucuyu ve tüketicilerin kullandığı istemci ilkel öğelerini belgelemektedir.

</div>

## Genel Bakış

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

Protokol üç parçadan oluşur:

1. Her tarayıcı sekmesi için, `SocketHelper` tarafından açılan **tek kalıcı bir WebSocket**.
2. `connections` tablosunda kaydedilen **bağlantı satırları** (`POST /messaging/connections`). Bunlar bir `(socketId, churchId, conversationId)` üçlüsünü bir odaya abone olarak işaretler.
3. `DeliveryHelper.sendConversationMessages()` tarafından yapılan **sunucu taraflı dağıtım**. Bir mesaj kaydedildiğinde (`POST /messaging/messages/send`), sunucu eşleşen bağlantı satırlarını okur ve açık olan her sokete türlendirilmiş bir veri yükü gönderir.

Socket.IO yoktur, uzun sorgulama (long-polling) yedeği yoktur ve ayrı bir mikro hizmet yoktur. WebSocket, REST API ile aynı süreçte çalışır (AWS'de HTTP için `web` Lambda, WebSocket için `socket` Lambda; yerelde ve Railway'de ise tek birleşik süreç).

## Bağlantı noktaları ve taşıma

| Ortam | HTTP | WebSocket |
|-------|------|-----------|
| Yerel geliştirme | `8084` | `ws://localhost:8087` (ayrı `WebSocketServer`) |
| Railway / Docker / tek bağlantı noktalı barındırma (`RAILWAY_ENVIRONMENT` veya `SELF_HOSTED` ayarlı) | Ortak | Ortak HTTP sunucusu (`SocketHelper.attachToServer()`) |
| AWS Lambda | API Gateway HTTP | API Gateway WebSocket (`$connect` / `$disconnect` / `$default` yolları) |

Taşıma seçicisi `deliveryProvider` yapılandırmasıdır:

- `local` → ham `ws` kütüphanesi; istemciler `CommonEnvironmentHelper` içindeki `MessagingApiSocket`'a bağlanır.
- `aws` → API Gateway WebSocket; sunucu, `@aws-sdk/client-apigatewaymanagementapi` aracılığıyla etkin bağlantılara veri yükü gönderir.

İstemcinin hangisinin kullanıldığını bilmesi gerekmez; her iki durumda da aynı JSON protokolünü kullanır.

## Kablo protokolü

Her çerçeve, `PayloadInterface` biçiminde bir JSON'dur:

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

### El sıkışması (handshake)

1. İstemci soketi açar ve düz metin `"getId"` dizesini gönderir.
2. Sunucu `{ action: "socketId", data: "<id>" }` ile yanıt verir.
3. İstemci `socketId` değerini saklar ve her oda aboneliğinin üçüncü koordinatı olarak kullanır.

### Bir odaya katılma

"Oda", basitçe bir `(churchId, conversationId)` üçlüsüdür. Abone olmak için istemci bir `Connection` satırı gönderir:

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

Gönderme işlemi ayrıca konuşma üzerinde bir `attendance` yayını tetikler, böylece mevcut aboneler yeni bir izleyicinin katıldığını öğrenir.

### Mesaj gönderme

`POST /messaging/messages/send` (anonim erişime izin verilir) veya `POST /messaging/messages/` (kimlik doğrulama gerekir):

```json
[
  { "churchId": "CHU00000001", "conversationId": "CON123…", "displayName": "John Smith", "content": "Hello!", "messageType": "comment" }
]
```

Sunucu mesajı kaydeder, ardından `DeliveryHelper.sendConversationMessages()` o `conversationId` için tüm bağlantı satırlarını arar ve her sokete `{ action: "message", data: <message> }` çerçevesi gönderir.

İçeriğe bağlı konuşmalar için (örneğin bir kişiye eklenmiş notlar), `action: "conversationActivity"` içeren ikinci bir yayın, sentetik `"content-{type}-{id}"` odasında tetiklenir; böylece liste görünümü tüketicileri, altta yatan konuşmayı açık tutmadan yenileme yapmayı bilir.

### Odadan ayrılma

```http
DELETE /messaging/connections/:churchId/:conversationId/:socketId
```

Bağlantı satırını siler ve son bir `attendance` yayını tetikler.

## Sunucu tarafı bileşenleri

| Dosya | Görevi |
|------|------|
| `Api/src/modules/messaging/helpers/SocketHelper.ts` | `WebSocketServer`'ı yönetir. Bağlantıda `socketId` atar. Her 30 saniyede bir ping/pong kalp atışı (`startHeartbeat`) çalıştırır; pong yanıtı alınamayan her bağlantıyı `terminate()` ile sonlandırıp temizler. Ölü soketleri temizler ve bağlantı kesildiğinde katılım yayınını yeniden tetikler. 30 dakikalık zamanlayıcı işinin eski `connections` satırlarını silmek için kullandığı `getLiveSocketIds()` ve `reapStaleConnections()` fonksiyonlarını sunar — yerelde hangi socketId'lerin süreç içinde hâlâ canlı olduğunu kontrol ederek, AWS'de ise kaçırılan `$disconnect` olayları için 24 saatlik TTL yedeği olarak (API Gateway bağlantıları yaklaşık 2 saatle sınırlar, dolayısıyla bu yedek canlı bir bağlantıyı silemez) |
| `Api/src/modules/messaging/helpers/DeliveryHelper.ts` | `sendConversationMessages(payload)`, odanın bağlantılarını okur ve her çerçeveyi yerel sokete ya da AWS API Gateway bağlantısına yönlendirir. `sendAttendance(churchId, conversationId)` izleyici anlık görüntüsünü oluşturur ve yayınlar |
| `Api/src/modules/messaging/controllers/ConnectionController.ts` | `POST /` katılır, `DELETE /:churchId/:conversationId/:socketId` ayrılır, `POST /setName` görünen adı günceller |
| `Api/src/modules/messaging/controllers/MessageController.ts` | `POST /send` (anonim) ve `POST /` (kimliği doğrulanmış) önce kaydeder, ardından dağıtır |
| `Api/src/modules/messaging/repositories/ConnectionRepo.ts` | `loadForConversation(churchId, conversationId)`, kimin abone olduğunun doğruluk kaynağıdır |

## İstemci tarafı ilkel öğeleri (`@churchapps/apphelper`)

Beş ilkel öğenin tamamı `apphelper/src/helpers/` içinde statik tekil nesnelerdir. Birlikte çalışarak, sayfada kaç bileşen bağlanırsa bağlansın her sekmenin **tek bir** WebSocket açmasını sağlarlar.

### `SocketHelper`

Tek WebSocket bağlantısını yönetir. Yeniden girişli `init()` idempotenttir — birden fazla bileşen yinelenen soketler açmadan çağırabilir. Şunları sunar:

- `init()` — soketi açar (veya yeniden kullanır) ve `getId` el sıkışmasını tamamlar. El sıkışma tamamlandığında veya 5 saniyelik bir zaman aşımından sonra arka plan yeniden deneme döngüsü devralındığında çözülür; asla reddedilmez, bu nedenle çağıranların başarısız ilk bağlantıyı özel olarak ele alması gerekmez.
- `addHandler(action, id, fn)` / `removeHandler(id)` — dinleyicileri `action` değerine göre kaydeder/kaldırır. Aynı eylemi birden fazla işleyici dinleyebilir.
- `setPersonChurch({ personId, churchId })` — kimliği doğrulanmış çağıranlar için; bu soket üzerinde anlık bildirimlerin ulaşması için bir `"alerts"` odası aboneliği tetikler.
- `onSocketIdReady(fn)` — yalnızca ilk değil, her yeni socketId'de tetiklenir — ilk el sıkışmada ve sonraki her yeniden bağlantıda. `SubscriptionManager` tarafından bekleyen katılımları boşaltmak için kullanılır.
- `checkConnection()` — aşağıdaki devam dinleyicileri tarafından çağrılır; soket zaten kapalıysa hemen yeniden bağlanır, açık görünüyorsa bir canlılık sorgusu gönderir.

**Yeniden bağlanma yaşam döngüsü.** Beklenmedik bir kapanma, üstel geri çekilme ile bir yeniden bağlanmayı zamanlar (1 saniye, 30 saniyelik bir üst sınıra kadar iki katına çıkarak). `SocketHelper` ayrıca bir sekmenin devam ettiğini algılamak için `window`/`document` üzerindeki `online`, `focus`, `pageshow` ve `visibilitychange` olaylarını dinler: soket zaten kapalıysa hemen yeniden bağlanır ve geri çekilmeyi sıfırlar; açık görünüyorsa bir `"getId"` canlılık sorgusu gönderir ve 3 saniye içinde hiçbir çerçeve gelmezse yeniden bağlanmaya zorlar — bu, bir mobil işletim sisteminin uygulamayı askıya almasından sonra kalan yarı açık soketleri yakalar. Başarılı bir yeniden el sıkışmada, `SocketHelper` o eylem için kayıtlı her işleyiciye yerel `"reconnect"` eylemini gönderir (bkz. [Kablo protokolü](#wire-protocol)).

### `SubscriptionManager`

Referans sayımlı oda üyeliği. Aynı konuşmaya abone olan birden fazla bileşen yalnızca bir sunucu tarafı bağlantı satırı kaydeder.

```typescript
import { SubscriptionManager } from "@churchapps/apphelper";

await SubscriptionManager.joinRoom(conversationId, churchId, personId, displayName);
// ... component renders, receives socket frames via ConversationStore.subscribe ...
await SubscriptionManager.leaveRoom(conversationId, churchId);
```

Tüketicilerin ek bir çaba gerektirmeden elde ettiği üç davranış:

- **Ertelenmiş ayrılma (300 ms)** — React StrictMode'un çift bağlama/çözme işlemlerini ve kısa yeniden bağlama döngülerini, sunucu tarafı aboneliği düşürmeden atlatır; `reset()` ayrıca bekleyen ertelenmiş ayrılmaları iptal eder.
- **Yeniden bağlanmada yeniden katılma** — `SocketHelper`'ın `"reconnect"` olayında (ve her `onSocketIdReady` çağrısında), `SubscriptionManager` her odaya katılmak için kullanılan `personId`/`displayName` değerlerini hatırlar ve kimliği bozulmadan her etkin bağlantı satırını yeniden gönderir. Yeniden katılımlar socketId başına tekilleştirilir, böylece aynı yeniden bağlanma bir odayı iki kez göndermez.
- **Geç bağlanan socketId** — `joinRoom`, soket el sıkışmasını bitirmeden önce niyeti kaydeder; asıl `POST /connections` isteği `onSocketIdReady` üzerinde gönderilir.

### `ConversationStore`

`conversationId` anahtarlı bellek içi önbellek. `message` / `deleteMessage` / `privateMessage` soket işleyicilerini tam olarak bir kez kaydeder ve gelen çerçeveleri o an açık olan konuşmalara uygular.

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

Kimliği doğrulanmış çağıranlar ayrıca **kişi doldurma** özelliğinden yararlanır — gelen mesajlardaki `personId` değerleri, önbelleğe alınmış bir `GET /people/ids` sorgusu aracılığıyla `PersonInterface` nesnelerine çözülür. Anonim çağıranlar bu adımı atlar.

`SocketHelper`'ın `"reconnect"` olayında, `ConversationStore`, şu anda etkin `subscribe` dinleyicilerine sahip her konuşmayı yeniden getirir ve soket kapalıyken kaçırılan mesajları kurtarır. Anonim konuşmalar, `churchId` değeri hiç kaydedilmemişse bu yakalama adımını atlar (yakalama uç noktası bunu gerektirir).

### `PresenceStore`

`attendance` eylemi için `ConversationStore` örüntüsünü yansıtır. Aboneler, sunucu varlık bilgisini yeniden yayınladığında `PresenceSnapshot { conversationId, totalViewers, viewers }` alır. Aynı anlık görüntüler bildirimden önce tekilleştirilir, böylece yeniden bağlanma fırtınaları gereksiz yeniden çizimleri tetiklemez.

```typescript
import { PresenceStore } from "@churchapps/apphelper";

const unsubscribe = PresenceStore.subscribe(conversationId, (snapshot) => {
  setViewerCount(snapshot.totalViewers);
});
```

### `NotificationService`

**Kimliği doğrulanmış** çağıranlar için üst düzey başlatma. `SocketHelper.init()`'i sarmalar, kişi/kilise bağlamını ayarlar (bu, `"alerts"` odasına otomatik olarak katılır) ve `ConversationStore.ensureHandlers()` / `PresenceStore.ensureHandlers()` / `SubscriptionManager.setupRejoin()` fonksiyonlarını tam olarak bir kez çağırır. Ayrıca bağlantı kesildikten sonra rozetlerin geri gelmesi için bildirim/özel mesaj sayılarını yeniden yükleyen kendi `"reconnect"` işleyicisini kaydeder.

```typescript
await NotificationService.getInstance().initialize(userContext);
```

Anonim akışlar (canlı yayın sohbeti en tipik örnektir) `NotificationService`'i atlar ve ilkel öğeleri doğrudan çağırır — başvuru uygulaması için `B1App/src/helpers/StreamChatManager.ts` dosyasına bakın.

## Canlı yayın sohbeti

Canlı yayın, çerçevenin en büyük anonim tüketicisidir. Oda kapsamı için iki `contentType` kullanır:

- `streamingLive` — `/stream` üzerindeki herkese açık sohbet sekmesi (`streamingService` başına bir oda).
- `streamingLiveHost` — yalnızca `contentApi.chat.host` iznine sahip personel tarafından görülebilen özel bir oda. Oda kimliği sunucuda şifrelenir (`GET /streamingServices/:id/hostChat`), böylece rastgele kazıma işlemleri odayı ortaya çıkarmaz.

`B1App/src/helpers/StreamChatManager.ts`, her iki odayı da birleşik ilkel öğeler aracılığıyla başlatır — artık canlı yayına özgü hiçbir soket kodu yoktur.

## Örüntüler ve tuzaklar

- **Kendi WebSocket'inizi açmayın.** `SocketHelper`'ın tekil olmasının bir nedeni vardır. Özel bir eylemi dinlemeniz gerekiyorsa, `SocketHelper.addHandler` ile mevcut soket üzerinde bir işleyici kaydedin.
- **`SubscriptionManager`'ı atlamayın.** Doğrudan `POST /connections` çağrıları çalışır, ancak referans sayımını, ertelenmiş ayrılmayı ve yeniden bağlanmada yeniden katılmayı kaybedersiniz. Grup sohbeti ve özel mesaj tüketicilerinin tümü `SubscriptionManager` üzerinden geçer.
- **İşleyici kimlikleri eylem başına benzersiz olmalıdır.** `SocketHelper.addHandler(action, id, fn)`, `(action, id)` ile anahtarlanır; aynı kimliği iki dinleyici için yeniden kullanmak ilkini değiştirir. Birleşik depolar, tüketici kimlikleriyle çakışmamak için `"ConversationStore-Message"` ve `"PresenceStore-Attendance"` gibi kimlikler kullanır.
- **Oda kimlikleri opak dizelerdir.** Çoğu bir konuşma UUID'sidir, ancak sistem ayrıca `"alerts"` (kişi başına bildirimler), `"content-{type}-{id}"` (sentetik etkinlik odaları) ve şifrelenmiş `streamingLiveHost` kimliklerini de destekler.
- **Kimlik doğrulama, soket düzeyinde değil REST sınırında kontrol edilir.** `POST /connections` ile bir odaya katılmaya anonim erişime izin verilir; erişim denetimi mesaj gönderme anında yapılır (mesaj denetleyicisi, anonim bir çağıranın hangi `messageType` türlerini gönderebileceğine karar verir).

## İlgili sayfalar

- [Bildirim Mimarisi](./architecture/notifications.md) -- Bu iletim katmanının beslediği uygulama içi/anlık bildirim/e-posta yükseltme hunisi
- [Mesajlaşma Uç Noktaları](./api/endpoints/messaging.md) -- Mesajlar, konuşmalar, bağlantılar ve cihazlar için tam REST yüzeyi
- [Web Anlık Bildirimleri](./web-push.md) -- Sayfa içi soket iletiminden ayrı, tarayıcı anlık bildirimleri
- [AppHelper](./shared-libraries/app-helper.md) -- İstemci ilkel öğelerini paketleyen npm paketi
- [Modül Yapısı](./api/module-structure.md) -- Mesajlaşma modülünün sunucu tarafında nasıl düzenlendiği
