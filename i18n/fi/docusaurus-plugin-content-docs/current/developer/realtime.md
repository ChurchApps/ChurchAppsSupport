---
title: "Reaaliaikainen arkkitehtuuri"
---

# Reaaliaikainen arkkitehtuuri

<div class="article-intro">

ChurchApps käyttää yhtä WebSocket-pohjaista toimitusjärjestelmää kaikille reaaliaikaisille osille: ryhmäkeskustelulle, yksityisviesteille, sisältömuistiinpanoille, live-striimin chatille sekä läsnäololle ja osallistumiselle. Tämä sivu kuvaa protokollan, palvelimen ja asiakaspuolen perusrakenteet, joita kuluttajat käyttävät.

</div>

## Yleiskatsaus

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

Protokollassa on kolme osaa:

1. **Yksi pysyvä WebSocket-yhteys** per selainvälilehti, jonka avaa `SocketHelper`.
2. **Yhteystietueet** (`POST /messaging/connections`), jotka tallennetaan `connections`-tauluun. Nämä merkitsevät `(socketId, churchId, conversationId)`-kolmikon huoneen tilaajaksi.
3. **Palvelinpuolen jakelu** funktiolla `DeliveryHelper.sendConversationMessages()`. Kun viesti tallennetaan (`POST /messaging/messages/send`), palvelin lukee vastaavat yhteystietueet ja lähettää tyypitetyn sanoman jokaiseen avoimeen socketiin.

Socket.IO:ta, long-polling-vararatkaisua tai erillistä mikropalvelua ei ole. WebSocket toimii samassa prosessissa REST-rajapinnan kanssa. AWS:ssä HTTP:lle käytetään `web`-Lambdaa ja WebSocketille `socket`-Lambdaa. Paikallisesti ja Railwayssa kyseessä on yksi yhdistetty prosessi.

## Portit ja siirtoprotokolla

| Ympäristö | HTTP | WebSocket |
|-------------|------|-----------|
| Paikallinen kehitys | `8084` | `ws://localhost:8087` (erillinen `WebSocketServer`) |
| Railway / Docker / yhden portin isännät (`RAILWAY_ENVIRONMENT` tai `SELF_HOSTED` asetettu) | yhteinen | yhteinen HTTP-palvelin (`SocketHelper.attachToServer()`) |
| AWS Lambda | API Gateway HTTP | API Gateway WebSocket (`$connect` / `$disconnect` / `$default` -reitit) |

Siirtoprotokollan valitsee `deliveryProvider`-asetus:

- `local` → suora `ws`-kirjasto. Asiakkaat yhdistävät `MessagingApiSocket`-osoitteeseen, joka tulee `CommonEnvironmentHelper`:ilta.
- `aws` → API Gateway WebSocket. Palvelin lähettää sanomat aktiivisiin yhteyksiin `@aws-sdk/client-apigatewaymanagementapi`-paketin kautta.

Asiakkaan ei tarvitse tietää, kumpaa käytetään. Se puhuu molemmissa tapauksissa samaa JSON-protokollaa.

## Langalla kulkeva protokolla

Jokainen kehys on JSON-muotoinen `PayloadInterface`-rakenne:

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

### Kättely

1. Asiakas avaa socketin ja lähettää merkkijonon `"getId"`.
2. Palvelin vastaa `{ action: "socketId", data: "<id>" }`.
3. Asiakas tallentaa `socketId`:n ja käyttää sitä kolmantena koordinaattina jokaisessa huonetilauksessa.

### Huoneeseen liittyminen

"Huone" on yksinkertaisesti `(churchId, conversationId)`-kolmikko. Tilataksesi huoneen asiakas lähettää `Connection`-rivin:

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

Liittyminen aiheuttaa myös `attendance`-lähetyksen keskustelussa, jotta olemassa olevat tilaajat tietävät uuden katsojan liittyneen.

### Viestin lähettäminen

`POST /messaging/messages/send` (anonyymi sallittu) tai `POST /messaging/messages/` (vaatii kirjautumisen):

```json
[
  { "churchId": "CHU00000001", "conversationId": "CON123…", "displayName": "John Smith", "content": "Hello!", "messageType": "comment" }
]
```

Palvelin tallentaa viestin, minkä jälkeen `DeliveryHelper.sendConversationMessages()` hakee kaikki kyseisen `conversationId`:n yhteystietueet ja lähettää jokaiseen socketiin kehyksen `{ action: "message", data: <message> }`.

Sisältöön sidotuissa keskusteluissa (esimerkiksi henkilöön liitetyissä muistiinpanoissa) toinen lähetys `action: "conversationActivity"` tapahtuu synteettisessä huoneessa `"content-{type}-{id}"`. Näin listanäkymien kuluttajat tietävät päivittää sisällön ilman, että taustalla oleva keskustelu pidetään auki.

### Huoneesta poistuminen

```http
DELETE /messaging/connections/:churchId/:conversationId/:socketId
```

Poistaa yhteystietueen ja lähettää lopullisen `attendance`-lähetyksen.

## Palvelinpuolen komponentit

| Tiedosto | Tehtävä |
|------|------|
| `Api/src/modules/messaging/helpers/SocketHelper.ts` | Omistaa `WebSocketServer`-palvelimen. Antaa `socketId`:n yhteyden muodostuessa. Suorittaa 30 sekunnin ping/pong-sykkeen (`startHeartbeat`), joka `terminate()`-kutsuu ja siivoaa yhteyden, jolta pong puuttuu. Siivoaa kuolleet socketit ja lähettää osallistumislistan uudelleen katkaisun yhteydessä. Tarjoaa `getLiveSocketIds()`- ja `reapStaleConnections()`-funktiot, joita 30 minuutin ajastettu tehtävä käyttää vanhentuneiden `connections`-rivien poistamiseen. Paikallisesti tämä tarkistaa, mitkä socketId:t ovat yhä käynnissä prosessissa. AWS:ssä se toimii 24 tunnin TTL-varmistuksena puuttuville `$disconnect`-tapahtumille. API Gateway rajoittaa yhteydet noin kahteen tuntiin, joten tämä ei voi poistaa elävää yhteyttä. |
| `Api/src/modules/messaging/helpers/DeliveryHelper.ts` | `sendConversationMessages(payload)` lukee huoneen yhteydet ja ohjaa jokaisen kehyksen joko paikalliseen socketiin tai AWS API Gateway -yhteyteen. `sendAttendance(churchId, conversationId)` rakentaa katsojakatsauksen ja lähettää sen. |
| `Api/src/modules/messaging/controllers/ConnectionController.ts` | `POST /` liittää, `DELETE /:churchId/:conversationId/:socketId` poistaa, `POST /setName` päivittää näytettävän nimen |
| `Api/src/modules/messaging/controllers/MessageController.ts` | `POST /send` (anonyymi) ja `POST /` (kirjautunut) tallentavat viestin ja välittävät sen eteenpäin |
| `Api/src/modules/messaging/repositories/ConnectionRepo.ts` | `loadForConversation(churchId, conversationId)` on totuuden lähde siitä, kuka on tilannut huoneen |

## Asiakaspuolen perusrakenteet (`@churchapps/apphelper`)

Viisi perusrakennetta ovat staattisia singletoneja kansiossa `apphelper/src/helpers/`. Ne toimivat yhdessä, jotta jokainen välilehti avaa **yhden** WebSocket-yhteyden riippumatta siitä, montako komponenttia sivulla on.

### `SocketHelper`

Omistaa yhden WebSocket-yhteyden. Uudelleen kutsuttava `init()` on idempotentti, eli useat komponentit voivat kutsua sitä avaamatta kaksoiskappaleita. Tarjoaa:

- `init()`: avaa socketin (tai käyttää olemassa olevaa uudelleen) ja suorittaa `getId`-kättelyn. Ratkeaa, kun kättely on valmis, tai 5 sekunnin aikakatkaisun jälkeen, kun taustalla oleva uudelleenyritysluuppi on ottanut ohjat. Se ei koskaan hylkää, joten kutsujien ei tarvitse käsitellä epäonnistunutta ensimmäistä yhteyttä erikseen.
- `addHandler(action, id, fn)` / `removeHandler(id)`: rekisteröi ja poistaa kuuntelijat `action`-kentän mukaan. Useat käsittelijät voivat kuunnella samaa toimintoa.
- `setPersonChurch({ personId, churchId })`: kirjautuneille kutsujille. Käynnistää `"alerts"`-huoneen tilauksen, jotta push-ilmoitukset saapuvat tähän socketiin.
- `onSocketIdReady(fn)`: laukeaa jokaisella uudella socketId:llä, ei vain ensimmäisellä. Se laukeaa alkukättelyssä ja jokaisessa myöhemmässä uudelleenyhdistämisessä. `SubscriptionManager` käyttää sitä odottavien liittymisten purkamiseen.
- `checkConnection()`: kutsutaan alla olevilla jatkamiskuuntelijoilla. Yhdistää heti uudelleen, jos socket on jo suljettu, tai lähettää elossaolokyselyn, jos se näyttää avoimelta.

**Uudelleenyhdistämisen elinkaari.** Odottamaton sulkeutuminen ajastaa uudelleenyhdistämisen eksponentiaalisella viiveellä (1 s, kaksinkertaistuen enintään 30 sekuntiin). `SocketHelper` kuuntelee myös tapahtumia `online`, `focus`, `pageshow` ja `visibilitychange` kohteissa `window` ja `document`, jotta palanneen välilehden voi havaita. Jos socket on jo suljettu, se yhdistää heti uudelleen ja nollaa viiveen. Jos se näyttää avoimelta, se lähettää `"getId"`-elossaolokyselyn ja pakottaa uudelleenyhdistämisen, jos kehystä ei saavu 3 sekunnin kuluessa. Tämä havaitsee puoliavoimet socketit, joita jää jäljelle, kun mobiilikäyttöjärjestelmä keskeyttää sovelluksen. Onnistuneen uudelleenkättelyn jälkeen `SocketHelper` lähettää paikallisen `"reconnect"`-toiminnon (katso [Langalla kulkeva protokolla](#wire-protocol)) jokaiselle kyseiseen toimintoon rekisteröidylle käsittelijälle.

### `SubscriptionManager`

Viitelaskettu huonejäsenyys. Useat saman keskustelun tilaavat komponentit rekisteröivät vain yhden palvelinpuolen yhteystietueen.

```typescript
import { SubscriptionManager } from "@churchapps/apphelper";

await SubscriptionManager.joinRoom(conversationId, churchId, personId, displayName);
// ... component renders, receives socket frames via ConversationStore.subscribe ...
await SubscriptionManager.leaveRoom(conversationId, churchId);
```

Kolme toimintaa, jotka kuluttajat saavat ilmaiseksi:

- **Viivästetty poistuminen (300 ms)**: selviytyy Reactin StrictMode -kaksoiskiinnityksestä ja lyhyistä uudelleenkiinnityksistä katkaisematta palvelinpuolen tilausta. `reset()` peruuttaa myös odottavat viivästetyt poistumiset.
- **Liittyminen uudelleen yhdistämisen jälkeen**: `SubscriptionManager` muistaa jokaiseen huoneeseen liittymiseen käytetyt `personId`- ja `displayName`-arvot. `SocketHelper`:n `"reconnect"`-tapahtumassa (ja jokaisella `onSocketIdReady`-kutsulla) se lähettää uudelleen jokaisen aktiivisen yhteystietueen henkilöllisyys säilyttäen. Uudelleenliittymiset on deduplikoitu socketId:n mukaan, joten sama uudelleenyhdistäminen ei lähetä huonetta kahdesti.
- **Myöhäinen socketId-sidonta**: `joinRoom` tallentaa aikomuksen ennen kuin socket on valmis kättelyyn. Varsinainen `POST /connections` lähtee `onSocketIdReady`-tapahtumassa.

### `ConversationStore`

Muistissa oleva välimuisti, jonka avaimena on `conversationId`. Rekisteröi `message`-, `deleteMessage`- ja `privateMessage`-socket-käsittelijät täsmälleen kerran ja soveltaa saapuvat kehykset tällä hetkellä avoimiin keskusteluihin.

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

Kirjautuneet kutsujat saavat myös **henkilöiden täydennyksen**. Saapuvien viestien `personId`-arvot ratkaistaan `PersonInterface`-objekteiksi välimuistissa olevan `GET /people/ids`-haun kautta. Anonyymit kutsujat ohittavat tämän.

Kun `SocketHelper` lähettää `"reconnect"`-tapahtuman, `ConversationStore` hakee uudelleen jokaisen keskustelun, jolla on tällä hetkellä aktiivisia `subscribe`-kuuntelijoita. Näin palautuvat viestit, jotka jäivät väliin socketin ollessa poikki. Anonyymit keskustelut ohittavat tämän päivityksen, jos niiden `churchId`:tä ei ole koskaan tallennettu, sillä päivitysrajapinta vaatii sen.

### `PresenceStore`

Noudattaa `ConversationStore`:n mallia `attendance`-toiminnolle. Tilaajat saavat `PresenceSnapshot { conversationId, totalViewers, viewers }` -kuvauksen aina, kun palvelin lähettää läsnäolon uudelleen. Identtiset kuvaukset deduplikoidaan ennen ilmoittamista, joten uudelleenyhdistämisryöpyt eivät aiheuta tarpeettomia uudelleenrenderöintejä.

```typescript
import { PresenceStore } from "@churchapps/apphelper";

const unsubscribe = PresenceStore.subscribe(conversationId, (snapshot) => {
  setViewerCount(snapshot.totalViewers);
});
```

### `NotificationService`

Kirjautuneiden kutsujien päätason käynnistys. Kääri `SocketHelper.init()`:n, asettaa henkilö- ja seurakuntakontekstin (joka liittää automaattisesti `"alerts"`-huoneeseen) ja kutsuu `ConversationStore.ensureHandlers()`-, `PresenceStore.ensureHandlers()`- ja `SubscriptionManager.setupRejoin()`-funktioita täsmälleen kerran. Se rekisteröi myös oman `"reconnect"`-käsittelijänsä, joka lataa ilmoitus- ja yksityisviestilaskurit uudelleen, jotta merkit palautuvat katkenneen yhteyden jälkeen.

```typescript
await NotificationService.getInstance().initialize(userContext);
```

Anonyymit käyttötilanteet (live-striimin chat on tärkein esimerkki) ohittavat `NotificationService`:n ja kutsuvat perusrakenteita suoraan. Katso viitetoteutus tiedostosta `B1App/src/helpers/StreamChatManager.ts`.

## Live-striimin chat

Live-striimi on suurin anonyymi kuluttaja tälle järjestelmälle. Se käyttää huoneiden rajaamiseen kahta `contentType`-arvoa:

- `streamingLive`: julkinen chat-välilehti sivulla `/stream` (yksi huone per `streamingService`).
- `streamingLiveHost`: yksityinen huone, joka näkyy vain henkilökunnalle, jolla on `contentApi.chat.host`-oikeus. Palvelin salaa huoneen tunnuksen (`GET /streamingServices/:id/hostChat`), jotta tavallinen kaavinta ei paljasta sitä.

`B1App/src/helpers/StreamChatManager.ts` käynnistää molemmat huoneet yhtenäisten perusrakenteiden kautta. Live-striimiin liittyvää erillistä socket-koodia ei enää ole.

## Käytännöt ja sudenkuopat

- **Älä avaa omaa WebSocket-yhteyttä.** `SocketHelper` on singleton syystä. Jos haluat kuunnella mukautettua toimintoa, rekisteröi käsittelijä olemassa olevaan socketiin `SocketHelper.addHandler`-funktiolla.
- **Älä ohita `SubscriptionManager`ia.** Suorat `POST /connections`-kutsut toimivat, mutta ne menettävät viitelaskennan, viivästetyn poistumisen ja uudelleenliittymisen. Ryhmäkeskustelun ja yksityisviestien kuluttajat kulkevat kaikki `SubscriptionManager`in kautta.
- **Käsittelijätunnusten on oltava uniikkeja toimintoa kohti.** `SocketHelper.addHandler(action, id, fn)` tallentaa avaimella `(action, id)`. Saman tunnuksen käyttäminen kahdelle kuuntelijalle korvaa ensimmäisen. Yhtenäiset storet käyttävät tunnuksia kuten `"ConversationStore-Message"` ja `"PresenceStore-Attendance"`, jotta ne pysyvät erillään kuluttajien tunnuksista.
- **Huonetunnukset ovat läpinäkymättömiä merkkijonoja.** Useimmat ovat keskustelujen UUID-tunnuksia, mutta järjestelmä tukee myös `"alerts"` (henkilökohtaiset ilmoitukset), `"content-{type}-{id}"` (synteettiset aktiivisuushuoneet) ja salatut `streamingLiveHost`-tunnukset.
- **Todennus tarkistetaan REST-rajapinnan rajalla, ei socketissa.** Huoneeseen liittyminen `POST /connections`-kutsulla sallii anonyymit. Pääsynhallinta tapahtuu viestiä lähetettäessä: viestikontrolleri päättää, mitkä `messageType`-tyypit anonyymi kutsuja saa lähettää.

## Liittyvät sivut

- [Ilmoitusarkkitehtuuri](./architecture/notifications) -- In-app-, push- ja sähköpostiilmoitusten eskalointiputki, johon tämä kuljetus syöttää
- [Viestinnän päätepisteet](./api/endpoints/messaging) -- Täydellinen REST-rajapinta viesteille, keskusteluille, yhteyksille ja laitteille
- [Web Push -ilmoitukset](./web-push) -- Selainpush, erillään sivun sisäisestä socket-toimituksesta
- [AppHelper](./shared-libraries/app-helper) -- npm-paketti, joka toimittaa asiakaspuolen perusrakenteet
- [Moduulirakenne](./api/module-structure) -- Viestintämoduulin järjestely palvelinpuolella
