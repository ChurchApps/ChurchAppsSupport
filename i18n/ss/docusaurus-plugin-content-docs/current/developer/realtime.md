---
title: "Sakhiwo Sesikhatsi Lesiphetsimile"
---

# Sakhiwo Sesikhatsi Lesiphetsimile

<div class="article-intro">

I-ChurchApps isebentisa luhlaka lunye lwekuletsa lolusekelwe ku-WebSocket kuto tonkhe tibonakaliso tesikhatsi lesiphetsimile — ingcoco yeciembu, imilayeto yangasese, emanotsi ekucuketfwe, ingcoco ye-live stream, kanye nekubakhona (attendance). Lelikhasi lichaza i-protocol, i-server, kanye netisekelo te-client letisetjentiswa ngulabasebentisako.

</div>

## Sibuko Lesibanti

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

I-protocol inetincenye letintsatfu:

1. **WebSocket linye lelihlala khona** ngalinye ku-tab yebrawuza, levulwa yi-`SocketHelper`.
2. **Emalayini Ekuxhumana** (`POST /messaging/connections`) labhalwe kuthebula le-`connections` — laba maphawula i-tuple ye-`(socketId, churchId, conversationId)` njengombhaleli wegumbi.
3. **Kusakateka Kwaceleni Lwe-Server** yi-`DeliveryHelper.sendConversationMessages()` — nangabe umlayeto ugcinwe (`POST /messaging/messages/send`), i-server ifundza emalayini ekuxhumana lafanako bese idubula i-payload lenelusayina ku-socket ngalinye lelivulekile.

Akukho i-Socket.IO, akukho i-long-polling fallback, futsi akukho i-microservice lehlukene. I-WebSocket isebenta kunchubo lefanako ne-REST API (i-`web` Lambda ye-HTTP, i-`socket` Lambda ye-WebSocket ku-AWS; nchubo linye lelihlangenwe ekhaya naku-Railway).

## Ema-Port Kanye Nekutfutfwa (Transport)

| Simo | HTTP | WebSocket |
|-------------|------|-----------|
| Kutfutfukisa Kwasekhaya | `8084` | `ws://localhost:8087` (`WebSocketServer` lehlukene) |
| Railway / Docker / ema-host e-port linye (`RAILWAY_ENVIRONMENT` nobe `SELF_HOSTED` lihleliwe) | kuhlanganyelwe | i-server ye-HTTP lehlanganyelwe (`SocketHelper.attachToServer()`) |
| AWS Lambda | API Gateway HTTP | API Gateway WebSocket (tindlela `$connect` / `$disconnect` / `$default`) |

Sikhetsi setfutfwa ngukuhlelwa kwe-`deliveryProvider`:

- `local` → incwadzi lengakalungiswa ye-`ws`; ema-client axhumana ne-`MessagingApiSocket` kusuka ku-`CommonEnvironmentHelper`.
- `aws` → API Gateway WebSocket; i-server itfumela ema-payload kuma-connection lasebentako nge-`@aws-sdk/client-apigatewaymanagementapi`.

I-client ayidzingi kwati kutsi yikuphi lokusebentiswako — ikhuluma i-protocol ye-JSON lefanako nome ngayiphi indlela.

## I-Protocol Ye-Wire

Iframe ngayinye yi-JSON yesakhiwo se-`PayloadInterface`:

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

### Kuxhumana (Handshake)

1. I-client ivula i-socket bese itfumela lulwimi lolucondzile `"getId"`.
2. I-server iphendvula nge-`{ action: "socketId", data: "<id>" }`.
3. I-client igcina i-`socketId` bese iyisebentisa njengekhuwodinethi lesitsatfu lekubhaliswa kwegumbi ngalinye.

### Kungena Egumbini

"Igumbi" liyi-tuple nje ye-`(churchId, conversationId)`. Kute abhalise, i-client itfumela lilayini le-`Connection`:

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

Kutfumela naku kucalisa kusakateka kwe-`attendance` engcoceni kute lababhalisiwe sebe khona bati kutsi umbukeli lomusha ungenile.

### Kutfumela Umlayeto

`POST /messaging/messages/send` (kuvunyelwe kungabatiwa) nobe `POST /messaging/messages/` (kudzingeka kucinisekiswa):

```json
[
  { "churchId": "CHU00000001", "conversationId": "CON123…", "displayName": "John Smith", "content": "Hello!", "messageType": "comment" }
]
```

I-server igcina umlayeto, bese i-`DeliveryHelper.sendConversationMessages()` icinga lilayini lekuxhumana ngalinye le-`conversationId` leyo bese itfumela i-socket ngayinye iframe le-`{ action: "message", data: <message> }`.

Etingcoceni letibotjelwe kucuketfwe (sib., emanotsi lanamatsele emuntfwini), kusakateka kwesibili nge-`action: "conversationActivity"` kudubula kugumbi lelakhiwe le-`"content-{type}-{id}"` kuze labasebentisako labamemetela luhlu bati kuvuselela ngaphandle kwekugcina ingcoco lengaphansi ivulekile.

### Kuphuma Egumbini

```http
DELETE /messaging/connections/:churchId/:conversationId/:socketId
```

Icitsa lilayini lekuxhumana bese icalisa kusakateka kwekugcina kwe-attendance.

## Tincenye Taceleni Lwe-Server

| Fayela | Indzima |
|------|------|
| `Api/src/modules/messaging/helpers/SocketHelper.ts` | Inayo i-`WebSocketServer`. Inikeza i-`socketId` nakuxhunyiwe. Isebentisa i-heartbeat ye-ping/pong yemasekhondi lang-30 (`startHeartbeat`) le-`terminate()`a futsi ihlambulule nome nguluphi luxhumano lolungakabuyisi i-pong. Ihlambulula ema-socket lafile futsi icalisa kusakateka kwe-attendance kabusha nakukhundlulwa. Yembula i-`getLiveSocketIds()` kanye ne-`reapStaleConnections()`, lokusetjentiswa ngumsebenti we-timer wemaminithi lang-30 kucitsa emalayini e-`connections` lasagcwele — ekhaya ngekuhlola kutsi ngutiphi ema-`socketId` lasesahleti asebenta ku-process, ku-AWS njenge-backstop ye-24h-TTL yetehlakalo te-`$disconnect` letingakafiki (API Gateway ivimbela emaxhumano ema-~2h, ngako loku akukhoni kutfola lokusebentako) |
| `Api/src/modules/messaging/helpers/DeliveryHelper.ts` | `sendConversationMessages(payload)` ifundza emaxhumano egumbi bese icondzisa iframe ngayinye ku-socket yasekhaya nobe kuxhumano lwe-AWS API Gateway. `sendAttendance(churchId, conversationId)` yakha futsi isakate sitfombe sebabukeli |
| `Api/src/modules/messaging/controllers/ConnectionController.ts` | `POST /` iyangena, `DELETE /:churchId/:conversationId/:socketId` iyaphuma, `POST /setName` ibuyeketa ligama lelibonakalako |
| `Api/src/modules/messaging/controllers/MessageController.ts` | `POST /send` (kungabatiwa) kanye ne-`POST /` (kucinisekisiwe) kuyagcinwa bese kusakateka |
| `Api/src/modules/messaging/repositories/ConnectionRepo.ts` | `loadForConversation(churchId, conversationId)` ngumtfombo weliciniso ngekutsi ngubani lobhalisiwe |

## Tisekelo Taceleni Lwe-Client (`@churchapps/apphelper`)

Tonkhe tisekelo letinhlanu ti-static singleton ku-`apphelper/src/helpers/`. Tisebentisana kanyekanye kuze i-tab ngayinye ivule i-WebSocket **linye** kungakhatsaliseki kutsi ngiticomponent letinganani letifaka ekhasini.

### `SocketHelper`

Inayo luxhumano lolulodwa lwe-WebSocket. I-`init()` le-re-entrant iyi-idempotent — ticomponent letinyenti tingayibita ngaphandle kwekuvula ema-socket laphindziwe. Yembula:

- `init()` — vula (nobe uphindze usebentise) i-socket bese ucedza kuxhumana kwe-`getId`. Iyaxatjiswa nakucedza kuxhumana nobe, ngemuva kwe-timeout yemasekhondi lasi-5, nakuvele luphindze-luzame lwasemuva selutsatsele. Ayikaze yenqabe, ngako labayibitako abadzingi kucaphuna sehlo lekungaphumeleli kuxhumana kwekucala.
- `addHandler(action, id, fn)` / `removeHandler(id)` — bhalisa/susa balaleli nge-`action`. Ema-handler lamanyenti angalalela ku-`action` lefanako.
- `setPersonChurch({ personId, churchId })` — kulabo labacinisekisiwe; icalisa kubhaliswa kwegumbi le-`"alerts"` kuze tatiso te-push tifike kule socket.
- `onSocketIdReady(fn)` — idubula ku-`socketId` lensha ngayinye, hhayi kuphela lekucala — kuxhumana kwekucala kanye nakuphindze kuxhunywa konkhe lokulandzelako. Isetjentiswa yi-`SubscriptionManager` kucwenga kungena lokulindzile.
- `checkConnection()` — ibitwa yi-balaleli labekuchubeka lababekwe ngentasi; iphindze ixhume ngalokushesha nangabe i-socket sekuvele ivalwe, nobe itfumela i-liveness probe nangabe ibonakala ivulekile.

**Sitfulo Sekuphindza Kuxhuma (Reconnect Lifecycle).** Kuvalwa lokungakalindzeleki kuhlela kuphindze kuxhume nge-exponential backoff (1s, ikhulisa kabili kuze kufike ku-cap ye-30s). I-`SocketHelper` iphindze ilalele i-`online`, `focus`, `pageshow`, kanye ne-`visibilitychange` ku-`window`/`document` kutfola i-tab lechubekile: nangabe i-socket sekuvele ivaliwe, iphindze ixhume ngalokushesha bese isetha kabusha i-backoff; nangabe ibonakala ivulekile, itfumela i-liveness probe ye-`"getId"` bese iphocelela kuphindze kuxhuma nangabe kute iframe lefikako ngekhatsi kwemasekhondi lama-3 — loku kubamba ema-socket la-half-open lasale ngemuva kwekutsi i-OS yeselula imise i-app. Nakuphumelela kuxhumana kabusha, i-`SocketHelper` idlulisa `action` yasekhaya ye-`"reconnect"` (bona [I-Protocol Ye-Wire](#wire-protocol)) ku-handler ngayinye lebhalisiwe ye-`action` leyo.

### `SubscriptionManager`

Bulunga begumbi lelibalwa nge-ref (ref-counted). Ticomponent letinyenti letibhalisela engcoceni lefanako tibhalisa kuphela lilayini lelilodwa lekuxhumana laceleni lwe-server.

```typescript
import { SubscriptionManager } from "@churchapps/apphelper";

await SubscriptionManager.joinRoom(conversationId, churchId, personId, displayName);
// ... component renders, receives socket frames via ConversationStore.subscribe ...
await SubscriptionManager.leaveRoom(conversationId, churchId);
```

Kutiphatsa lokutsatfu lokutfolwa ngalabasebentisako simahla:

- **Kuphuma Lokucindzetelwe (300 ms)** — kusinda ku-double mount/unmount ye-React StrictMode kanye netigcikwane letimfishane te-remount ngaphandle kwekulahla kubhaliswa laceleni lwe-server; `reset()` iphindze icishe nome ngukuphi kuphuma lokucindzetelwe lokusalindzile.
- **Kuphindze Kungena Nakuphindze Kuxhunywa** — i-`SubscriptionManager` iyakhumbula i-`personId`/`displayName` lesetjentiswe kungena egunjini ngalinye, ngako ku-`"reconnect"` event ye-`SocketHelper` (nakubitwa konkhe kwe-`onSocketIdReady`) iphindze itfumele lilayini lekuxhumana ngalinye lelisebentako ne-identity ingakashintji. Kuphindze kungena kuyacinwa ngokuphindzaphindza (deduped) nge-`socketId` kuze kuphindze kuxhuma lokufanako kungaphindzi kutfumela igumbi kabili.
- **Kubotjwa Kwe-SocketId Kwasekugcineni** — `joinRoom` ibhala injongo ngaphambi kwekutsi i-socket icedze kuxhumana kwayo; i-`POST /connections` yangempela idubula ku-`onSocketIdReady`.

### `ConversationStore`

I-cache le-in-memory lenesikhiya se-`conversationId`. Ibhalisa ema-handler e-socket e-`message` / `deleteMessage` / `privateMessage` kanye kanye bese isebentisa ema-frame langenako kuloko konkhe ingcoco lesekuvulekile njengamanje.

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

Labo labacinisekisiwe nabo batfola **kuhydratwa kwebantfu** — ema-`personId` emilayeto lengenako acondziswa kuma-object e-`PersonInterface` ngekusebentisa kubukwa lokucachiwe kwe-`GET /people/ids`. Labo labangabatiwa bayaweca loku.

Ku-`"reconnect"` event ye-`SocketHelper`, i-`ConversationStore` iphindze icoshe ingcoco ngayinye lenetilaleli te-`subscribe` letisebentako njengamanje, itfola imilayeto leyeciwe ngesikhatsi i-socket beyingekho. Ingcoco letingabatiwa tiyakweca loku kucatcha nangabe `churchId` yato beyingakaze ibhalwe (i-endpoint yekucatcha idzinga yona).

### `PresenceStore`

Ifanisa iphetheni ye-`ConversationStore` ye-`action` ye-`attendance`. Lababhalisiwe batfola i-`PresenceSnapshot { conversationId, totalViewers, viewers }` nome ngunini i-server iphindze isakate kubakhona. Tisnapshot letifanako tiyacinwa (deduped) ngaphambi kwekwatisa, ngako tiphephetfo tekuphindze kuxhuma atikacalisi kuphindza-render lokungadzingekile.

```typescript
import { PresenceStore } from "@churchapps/apphelper";

const unsubscribe = PresenceStore.subscribe(conversationId, (snapshot) => {
  setViewerCount(snapshot.totalViewers);
});
```

### `NotificationService`

Kucaliswa kwelizinga leliphakeme kulabo labacinisekisiwe. Isongela i-`SocketHelper.init()`, ihlela simo semuntfu/bandla (lesizingena ngekutentela egunjini le-`"alerts"`), bese ibita `ConversationStore.ensureHandlers()` / `PresenceStore.ensureHandlers()` / `SubscriptionManager.setupRejoin()` kanye kanye. Iphindze ibhalise i-handler yayo ye-`"reconnect"` lephindze icoshe tibalo tetatiso/te-PM, kuze ema-badge abuyele emuva kuxhumano lolulahlekile.

```typescript
await NotificationService.getInstance().initialize(userContext);
```

Tinchubo letingabatiwa (ingcoco ye-live stream siyintfo lesibonelo lesijwayelekile) tiyaweca i-`NotificationService` bese tibita tisekelo ngalokucondzile — bona `B1App/src/helpers/StreamChatManager.ts` ekusetjentisweni lokusibuyeketi.

## Ingcoco Ye-Live Stream

I-live stream ngumsebentisi lomkhulu longabatiwa waloluhlaka. Isebentisa ema-`contentType` lamabili kubeka umkhawulo wegumbi:

- `streamingLive` — i-tab yengcoco levulekile ku-`/stream` (igumbi linye ngamunye we-`streamingService`).
- `streamingLiveHost` — igumbi lelingasese lelibonakala kuphela kubasebenti labanemvumo ye-`contentApi.chat.host`. I-id yegumbi iyi-encrypted ku-server (`GET /streamingServices/:id/hostChat`) kuze kukhukhulisa lokujwayelekile kungayembuli.

`B1App/src/helpers/StreamChatManager.ts` icalisa emagumbi lomabili ngekusebentisa tisekelo letihlanganisiwe — akusekho ikhodi ye-socket lekhetsekile ye-live-stream.

## Emaphetheni Kanye Netingozi

- **Ungavuli i-WebSocket yakho.** I-`SocketHelper` iyi-singleton ngesizatfu. Nangabe udzinga kulalela `action` lekhetsekile, bhalisa i-handler ku-socket lekhona nge-`SocketHelper.addHandler`.
- **Ungaweci i-`SubscriptionManager`.** Kubita lokucondzile kwe-`POST /connections` kuyasebenta kodvwa kulahlekelwa kubalwa nge-ref, kuphuma lokucindzetelwe, kanye nekuphindze kungena nakuphindze kuxhunywa. Bonkhe labasebentisi bengcoco yeciembu ne-PM badlula nge-`SubscriptionManager`.
- **Ema-id ehandler kufanele abe ngawodvwana ngamunye we-`action`.** I-`SocketHelper.addHandler(action, id, fn)` isebentisa sikhiya se-`(action, id)`; kuphindze kusebentise i-id lefanako kubalaleli lababili kushintjanisa lowekucala. Tisitolo letihlanganisiwe tisebentisa ema-id lafana ne-`"ConversationStore-Message"` kanye ne-`"PresenceStore-Attendance"` kute tihlale tihlukile kuma-id alabasebentisako.
- **Ema-id emagumbi ti-string letingacaci.** Linyenti ngema-UUID engcoco kodvwa lusetjentiswa luphindze lusekele i-`"alerts"` (tatiso ngamunye ngamunye), i-`"content-{type}-{id}"` (emagumbi emsebenti lalakhiwe), kanye nema-id lasa-encrypted e-`streamingLiveHost`.
- **Kucinisekiswa kwebuwena kuyahlolwa emkhawulweni we-REST, hhayi ku-socket.** Kungena egunjini nge-`POST /connections` kuvunyelwe kungabatiwa; kulawulwa kwekufinyelela kwenteka ngesikhatsi sekutfumela umlayeto (i-message controller ikhetsa kutsi ngutiphi ema-`messageType` lombiti longabatiwa angawatfumela).

## Emakhasi Lahambelanako

- [Sakhiwo Setatiso](./architecture/notifications) -- Lifonile lekukhulisa kwe-in-app/push/imeyili lokudliwa yilolutfutfwa
- [Messaging Endpoints](./api/endpoints/messaging) -- Sibonelo lesiphelele se-REST setemilayeto, tingcoco, emaxhumano, emadivayisi
- [Tatiso Te-Push Te-Web](./web-push) -- I-push yebrawuza, lehlukene nekuletsiwa nge-socket yasekhasini
- [AppHelper](./shared-libraries/app-helper) -- Liphakheji le-npm lelitfumela tisekelo te-client
- [Module Structure](./api/module-structure) -- Indlela i-module yemilayeto lehlelwe ngayo laceleni lwe-server
