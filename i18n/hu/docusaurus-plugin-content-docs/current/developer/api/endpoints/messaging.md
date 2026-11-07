---
title: "Üzenetküldési végpontok"
description: "Referencia a ChurchApps üzenetküldő API-végpontjaihoz: beszélgetések, jegyzetek hozzáférési szabályai, SMS, e-mail-sablonok, értesítések és eszközök."
---

# Üzenetküldési végpontok

<div class="article-intro">

A Messaging modul kezeli a valós idejű beszélgetéseket, a csevegőüzeneteket, a push-értesítéseket, az SMS- és e-mail-kézbesítést, a WebSocket-kapcsolatokat, a privát üzeneteket, az eszközregisztrációt és az SMS-szolgáltatókat. Ez biztosítja azt a kommunikációs réteget, amelyet minden ChurchApps-alkalmazás használ az élő közvetítések csevegéséhez és az aszinkron értesítésekhez.

</div>

**Alapútvonal:** `/messaging`

## Beszélgetések

Alapútvonal: `/messaging/conversations`

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Beszélgetések betöltése vesszővel elválasztott azonosítók alapján, az első és utolsó üzenetekkel |
| GET | `/messages/:contentType/:contentId` | JWT | — | Tartalomhoz tartozó beszélgetések betöltése lapozott üzenetekkel (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Az aktuális felhasználó csoportjaihoz tartozó bejegyzéstípusú beszélgetések lekérése |
| GET | `/posts/group/:groupId` | JWT | — | Egy adott csoport bejegyzéstípusú beszélgetéseinek lekérése |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | A legfrissebb jegyzetek minden rekordból a B1 Admin Jegyzetek oldalához. A `section` értéke `people`, `groups`, `events` vagy `workflows` lehet (különben 400); a `limit` alapértéke 25 (maximum 100); a `before` az előző oldal kurzora. Minden jegyzetre érvényes a saját típusának szabálya (Személyek / Szerkesztés vagy bizalmas jegyzetek jogosultsága, a csoport vezetői, az események megtekintői, a munkafolyamat-kártyák megtekintői), így a hívók csak azokat a jegyzeteket látják, amelyeket megnyithatnának. A jegyzetek szövege 300 karakterre van vágva |
| GET | `/current/:churchId/:contentType/:contentId` | Nyilvános | — | Tartalomhoz tartozó aktuális beszélgetés lekérése vagy létrehozása (a contentId automatikusan visszafejtődik) |
| GET | `/:churchId/:contentType/:contentId` | Nyilvános | — | Beszélgetések betöltése tartalomtípus és azonosító alapján |
| GET | `/:churchId/:id` | Nyilvános | — | Egy beszélgetés betöltése azonosító alapján |
| POST | `/` | JWT | — | Beszélgetések létrehozása vagy frissítése (kötegelve) |
| POST | `/start` | JWT | — | Új beszélgetés indítása kezdő megjegyzéssel |
| DELETE | `/:churchId/:id` | JWT | — | Beszélgetés törlése |

### Személyi jegyzetek hozzáférés-vezérlése

A `contentType: "person"` típusú beszélgetések (a személyi rekord Jegyzetek lapja) és a `contentType: "personConfidential"` típusú beszélgetések (a Bizalmas jegyzetek szakasz) minden olvasási és írási útvonalon védettek, beleértve a fenti, egyébként nyilvános útvonalakat is, amelyek ezekre a tartalomtípusokra `401` választ adnak. A `person` a MembershipApi **Személyek / Szerkesztés** jogosultságát igényli, a `personConfidential` pedig a **Személyek / Bizalmas jegyzetek megtekintése** jogosultságot. Korlátozott API-kulcsok esetén a `people:write` mindkét műveletet magában foglalja (a kulcs felhasználójának továbbra is rendelkeznie kell az alapul szolgáló szerepkör-jogosultsággal).

### Csoport- és eseményjegyzetek hozzáférés-vezérlése {#group-and-event-notes-access-control}

Két további jegyzettípus ugyanígy védett minden olvasási és írási útvonalon (a fenti nyilvános útvonalakat is beleértve), és soha nem érhető el névtelen bejegyzéshez:

- **`groupNote`** (`contentId` = csoport-azonosító) – a csoport **Vezetői jegyzetei** hírfolyam. Csak az adott csoport vezetői (a JWT `leaderGroupIds` mezője) olvashatnak vagy írhatnak. Egyetlen munkatársi jogosultság sem ad hozzáférést, beleértve a `content.edit` jogot és a csoporttagsági jogosultságokat is.
- **`eventNote`** (`contentId` = eseményazonosító) – egy naptári eseményhez tartozó jegyzetek. A `content.edit` jogosultsággal rendelkező vagy a **Naptárak / Adminisztrátor** jogkörű munkatársak mindig olvashatnak és írhatnak. Egyébként az esemény `notesViewRole` (olvasás) és `notesPostRole` (írás) mezői döntenek: a `staff` (alapérték, ha a mező `null`) senki mást nem enged, a `leaders` az esemény csoportjának vezetőit engedi, a `members` pedig az esemény csoportjának tagjait és vezetőit. A `groupId` nélküli esemény csak munkatársak számára érhető el.

### Munkafolyamat-kártyák jegyzeteinek hozzáférés-vezérlése

A `contentType: "workflowCard"` típusú beszélgetéseket (a munkafolyamat-kártyák jegyzetei, ahol a `contentId` a kártya feladatazonosítója) csak az olvashatja és írhatja, aki meg tudja nyitni az adott kártyát: olyan felhasználó, akinek van a DoingApi **Feladatok / Megtekintés** jogosultsága, vagy az a személy vagy csoport, akihez a kártya hozzá van rendelve, amely létrehozta, vagy akire vonatkozik. Mindenki más `401` választ kap minden olvasási útvonalon, beleértve a fenti nyilvános útvonalakat is. A kártya beszélgetését magán a kártyán keresztül lehet csatolni a `POST /doing/tasks/:id/conversation` végponttal (törzs: `{ "conversationId": "..." }`; az első csatolt beszélgetés marad érvényben), amelyet a kártya szerkesztői és a hozzárendelt személy hívhat meg.

### Példa: Beszélgetés indítása

```
POST /messaging/conversations/start
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "contentType": "group",
  "contentId": "group-123",
  "title": "Weekly Discussion",
  "comment": "Welcome to this week's discussion thread!"
}
```

```json
{
  "id": "conv-456",
  "churchId": "church-789",
  "contentType": "group",
  "contentId": "group-123",
  "title": "Weekly Discussion",
  "dateCreated": "2026-02-17T10:00:00.000Z",
  "visibility": "public",
  "allowAnonymousPosts": false,
  "groupId": "group-123"
}
```

## Üzenetek

Alapútvonal: `/messaging/messages`

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Egy beszélgetés összes üzenetének betöltése |
| GET | `/catchup/:churchId/:conversationId` | Nyilvános | — | Egy beszélgetés összes üzenetének betöltése (nyilvános utolsónak lekérés az élő csevegéshez) |
| GET | `/:churchId/:id` | Nyilvános | — | Egy üzenet betöltése azonosító alapján |
| POST | `/` | JWT | — | Üzenetek mentése (kötegelve). Valós idejű frissítéseket küld és értesítéseket indít. Létező üzenet szerkesztéséhez a szerzőnek kell lennie, vagy a `content.edit` jogosultsággal kell rendelkezni; a tárolt szerző soha nem módosítható |
| POST | `/send` | Nyilvános | — | Üzenetek küldése (kötegelve, nyilvános). Valós idejű frissítéseket küld WebSocketen keresztül, és értesítéseket indít |
| POST | `/setCallout` | JWT | — | (elavult) Kiemelt üzenet közvetítése valós időben. Nincs aktív kliens; az élő közvetítési csevegés már nem jeleníti meg a kiemeléseket |
| DELETE | `/:churchId/:id` | JWT | — | Üzenet törlése és a törlés közvetítése valós időben. Lásd: [Üzenetmoderálás](#message-moderation) |

### Üzenetmoderálás

Üzenetet törölhet:

- a üzenet szerzője;
- `content.edit` jogosultsággal rendelkező munkatárs (a gyülekezeten belül bárhol);
- **csoportvezető**, a `contentType` értéke `group` vagy `groupAnnouncement` típusú beszélgetéseknél, amelyek `contentId` mezője olyan csoport, amelynek vezetője (a JWT `leaderGroupIds` mezője).

Személyi jegyzetekhez tartozó beszélgetéseket (`person` / `personConfidential`) soha nem moderálnak a vezetők; helyette a jegyzetekre vonatkozó jogosultságokat (`people.edit`, `people.viewConfidentialNotes`) használják.

A vezetők csak törölhetnek, szerkeszteni nem. Más tag üzenetének átírása továbbra is csak a szerzőre és a `content.edit` jogosultsággal rendelkező munkatársakra korlátozódik.

### Példa: Üzenet küldése

```
POST /messaging/messages/send

[
  {
    "churchId": "church-789",
    "conversationId": "conv-456",
    "personId": "person-123",
    "displayName": "John Smith",
    "content": "Hello everyone!",
    "messageType": "comment"
  }
]
```

```json
[
  {
    "id": "msg-001",
    "churchId": "church-789",
    "conversationId": "conv-456",
    "personId": "person-123",
    "displayName": "John Smith",
    "timeSent": "2026-02-17T10:05:00.000Z",
    "content": "Hello everyone!",
    "messageType": "comment"
  }
]
```

## Privát üzenetek

Alapútvonal: `/messaging/privatemessages`

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|-------------|
| GET | `/` | JWT | — | Az aktuális felhasználó összes privát üzenetének betöltése (beszélgetésenként az utolsó üzenettel, és mindet olvasottnak jelöli) |
| GET | `/existing/:personId` | JWT | — | Egy adott személlyel folytatott meglévő privát beszélgetés keresése |
| GET | `/:id` | JWT | — | Privát üzenet betöltése azonosító alapján (törli az értesítést, ha az aktuális felhasználónak szól) |
| POST | `/` | JWT | — | Privát üzenetek küldése (kötegelve). Push-értesítést küld a címzettnek |

## Értesítések

Alapútvonal: `/messaging/notifications`

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|-------------|
| GET | `/unreadCount` | JWT | — | Az aktuális felhasználó olvasatlan értesítéseinek számának lekérése |
| GET | `/my` | JWT | — | Az aktuális felhasználó összes értesítésének betöltése (mindet olvasottnak jelöli) |
| GET | `/tmpEmail` | Nyilvános | — | Napi e-mail-értesítési összefoglaló indítása (hibakereső/cron végpont) |
| GET | `/:churchId/person/:personId` | JWT | — | Egy adott személy értesítéseinek betöltése |
| GET | `/:churchId/:id` | JWT | — | Értesítés betöltése azonosító alapján |
| POST | `/` | JWT | — | Értesítések létrehozása vagy frissítése (kötegelve) |
| POST | `/create` | JWT | — | Értesítések létrehozása több személy számára. Törzs: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Egy személy összes értesítésének olvasottnak jelölése |
| POST | `/sendTest` | JWT | — | Tesztpush-értesítés küldése. Törzs: `{ personId, title }` |
| POST | `/ping` | Nyilvános | — | Értesítés létrehozása külső eseményindítóból. Törzs: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Értesítés törlése |

### Példa: Értesítések létrehozása

```
POST /messaging/notifications/create
Authorization: Bearer <token>

{
  "peopleIds": ["person-123", "person-456"],
  "contentType": "group",
  "contentId": "group-789",
  "message": "New event posted in your group",
  "link": "/groups/group-789"
}
```

## Értesítési beállítások

Alapútvonal: `/messaging/notificationpreferences`

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|-------------|
| GET | `/categories` | JWT | — | Értesítési kategóriák listázása az alapértelmezett és engedélyezett csatornáikkal |
| GET | `/my` | JWT | — | Az aktuális felhasználó értesítési beállításainak betöltése (ha nincsenek, alapértelmezetteket hoz létre) |
| POST | `/` | JWT | — | Az aktuális felhasználó beállításainak mentése. Törzs: a következők bármelyike: `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, valamint opcionálisan `overrides: [{ categoryKey, channel, optedIn }]` (a `channel` értéke lehet `push`, `email`, `in_app` vagy `sms`; a zárolt kategóriák figyelmen kívül maradnak). Az `allowSms` a tag hozzájárulása a szöveges emlékeztetőkhöz. A régi, sorokból álló tömb formátumú törzs továbbra is elfogadott |

## Kapcsolatok

Alapútvonal: `/messaging/connections`

A WebSocket- és valós idejű kapcsolatokat kezeli csevegéshez, csoportbeszélgetésekhez, privát üzenetekhez és élő közvetítéshez. A teljes protokollért lásd: [Valós idejű architektúra](../../realtime.md).

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|-------------|
| GET | `/:churchId/:conversationId` | Nyilvános | — | Egy beszélgetés összes kapcsolatának betöltése |
| POST | `/` | Nyilvános | — | Kapcsolatok regisztrálása (kötegelve). Részvételi szórást indít a beszélgetésben. Törzselemek: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Nyilvános | — | Egy kapcsolat megjelenítendő nevének frissítése socket-azonosító alapján. Törzs: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Nyilvános | — | Kapcsolat eltávolítása egy beszélgetésből. Részvételi szórást indít |
| POST | `/tmpSendAlert` | Nyilvános | — | Értesítési riasztás küldése egy személy kapcsolatainak. Törzs: `{ churchId, personId }` |

## Eszközök

Alapútvonal: `/messaging/devices`

Push-értesítések regisztrációját és tartalompárosítást kezel (pl. a Lessons alkalmazás TV-kijelzőkön).

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|-------------|
| POST | `/enroll` | JWT | — | Eszköz regisztrálása vagy frissítése (mobil push-regisztráció). FCM-token vagy eszközazonosító alapján párosít |
| POST | `/enrollAnon` | Nyilvános | — | Névtelen eszköz regisztrálása és 4 karakteres párosítókód generálása |
| POST | `/` | Nyilvános | — | Eszközök mentése (kötegelve) |
| GET | `/pair/:pairingCode` | JWT | — | Eszköz párosítása a párosítókódja alapján. Opcionális `?contentType=&contentId=` a tartalom hozzárendeléséhez |
| GET | `/status/:deviceId` | Nyilvános | — | Egy eszköz párosítási állapotának ellenőrzése |
| GET | `/:churchId` | JWT | — | Egy gyülekezet összes eszközének betöltése |
| GET | `/:churchId/person/:personId` | JWT | — | Egy személy összes eszközének betöltése |
| GET | `/:churchId/:id` | JWT | — | Eszköz betöltése azonosító alapján |
| DELETE | `/:churchId/:id` | JWT | — | Eszköz törlése |

### Példa: Eszköz regisztrálása

```
POST /messaging/devices/enroll
Authorization: Bearer <token>

{
  "fcmToken": "firebase-token-abc123",
  "appName": "B1Mobile",
  "label": "John's iPhone",
  "deviceInfo": "iOS 17, iPhone 15"
}
```

```json
{
  "id": "device-001",
  "churchId": "church-789",
  "fcmToken": "firebase-token-abc123",
  "appName": "B1Mobile",
  "label": "John's iPhone",
  "registrationDate": "2026-02-17T10:00:00.000Z",
  "lastActiveDate": "2026-02-17T10:00:00.000Z"
}
```

## Eszköztartalmak

Alapútvonal: `/messaging/devicecontents`

Párosított eszközökhöz tartozó tartalomhozzárendeléseket kezel (pl. melyik lecke jelenik meg egy TV-n).

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Egy eszköz tartalomhozzárendeléseinek betöltése |
| POST | `/` | JWT | — | Eszköztartalom-hozzárendelések mentése (kötegelve) |
| DELETE | `/:id` | JWT | — | Eszköztartalom-hozzárendelés törlése |

## SMS-küldés

Alapútvonal: `/messaging/texting`

SMS-szolgáltatókat, csoportos szöveges üzenetküldést és kézbesítéskövetést kezel.

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|-------------|
| GET | `/providers` | JWT | — | A gyülekezet SMS-szolgáltatóinak betöltése (a hitelesítő adatok maszkolva) |
| GET | `/status` | JWT | — | `{ enabled }` – hogy a gyülekezetnek van-e engedélyezett SMS-szolgáltatója. Bármely bejelentkezett gyülekezeti felhasználó lekérheti; a **Szöveg** lehetőségek csak akkor jelennek meg, ha szöveges üzenet küldhető |
| GET | `/inboundUrl` | JWT | `texting.send` vagy `settings.edit` | `{ url }` – a gyülekezet bejövő (STOP) webhook URL-je, amelyet be kell illeszteni a szolgáltatóba |
| POST | `/inbound/:churchId/:token` | Nyilvános | — | Szolgáltatói bejövő üzenet webhookja. A `token` a gyülekezet azonosítójának HMAC-je. Ha a válasz pontosan egy leiratkozó szó (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), minden egyező személy `optedOut` állapotba kerül, és az `allowSms` értéke kikapcsol. Visszatér: `{ optedOut: <count> }`; más válaszok esetén `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | Csoportos szöveges üzenet címzettjeinek előnézete (jogosult, leiratkozott és telefonszám nélküli darabszámok) |
| GET | `/sent` | JWT | — | A gyülekezet összes elküldött szöveges üzenet-rekordjának betöltése |
| GET | `/sent/:id/details` | JWT | — | Elküldött szöveges üzenet betöltése címzettenkénti kézbesítési naplókkal |
| POST | `/providers` | JWT | — | SMS-szolgáltatók mentése (kötegelve). Titkosítja az API-hitelesítő adatokat |
| POST | `/send` | JWT | — | SMS küldése a csoport összes jogosult tagjának. Törzs: `{ groupId, message }`. A sablonmezők (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) címzettenként kerülnek feloldásra |
| POST | `/sendPerson` | JWT | — | SMS küldése egy személynek. Törzs: `{ personId, phoneNumber, message }`. A sablonmezők feloldódnak, és a feloldott szöveg kerül naplózásra |
| DELETE | `/providers/:id` | JWT | — | SMS-szolgáltató törlése |

### Példa: Csoportos szöveges üzenet küldése

```
POST /messaging/texting/send
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "message": "Reminder: Service starts at 10 AM this Sunday!"
}
```

```json
{
  "totalMembers": 50,
  "recipientCount": 42,
  "successCount": 40,
  "failCount": 2,
  "optedOutCount": 5,
  "noPhoneCount": 3
}
```

## E-mail sablonok

Alapútvonal: `/messaging/emailTemplates`

Újrafelhasználható e-mail-sablonokat kezel, és sablonos e-maileket küld csoportoknak.

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|-------------|
| GET | `/` | JWT | — | A gyülekezet összes e-mail-sablonjának betöltése |
| GET | `/:id` | JWT | — | Egy e-mail-sablon betöltése azonosító alapján |
| GET | `/sendStatus` | JWT | `groupMembers.edit` vagy `tasks.admin` | A gyülekezet csoportos e-mail-állapota: `{ approved, paused, remaining, requested }`. A B1Admin E-mail küldése párbeszédablaka és a munkafolyamat **E-mail küldése** művelete ezt használja, hogy figyelmeztessen, ha az e-mail nem fog kimenni |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | Kérés a supportnak, hogy engedélyezze a gyülekezetet a csoportos e-mailekhez (gyülekezetenként hetente legfeljebb egyszer) |
| GET | `/preview/:groupId` | JWT | — | Csoport e-mail-kézbesítésének előnézete (jogosult címzettek száma, e-mail-cím nélküli tagok) |
| POST | `/` | JWT | — | E-mail-sablonok létrehozása vagy frissítése (kötegelve) |
| POST | `/send` | JWT | — | Sablonos e-mail küldése a csoport összes tagjának. Törzs: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | E-mail-sablon törlése |

### Példa: E-mail küldése csoportnak

```
POST /messaging/emailTemplates/send
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "subject": "This Week's Update - {{churchName}}",
  "htmlContent": "<p>Hello {{firstName}},</p><p>Here's what's happening this week...</p>"
}
```

```json
{
  "totalMembers": 50,
  "recipientCount": 45,
  "successCount": 44,
  "failCount": 1,
  "noEmailCount": 5
}
```

**Támogatott sablonmezők:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## Letiltott IP-címek

Alapútvonal: `/messaging/blockedips`

(elavult) IP-letiltás élő közvetítési csevegéshez. A B1App kliens már nem hívja a `POST /` végpontot, mert az IP-letiltás az egységes kézbesítésre való átállás során megszűnt. A `/clear` útvonalat a `StreamingServiceController` továbbra is szerver-szerver hívással használja, amikor élő közvetítési szolgáltatásokat mentenek.

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|-------------|
| POST | `/` | JWT | — | (elavult) Letiltott IP-címek mentése (kötegelve). Nincs aktív kliens |
| POST | `/clear` | JWT | — | Összes letiltott IP törlése adott szolgáltatásokhoz. Törzs: `[{ serviceId, churchId }]` |

## Kézbesítési naplók

Alapútvonal: `/messaging/deliverylogs`

Az elküldött üzenetek (SMS, push-értesítések, e-mail) kézbesítési állapotát követi.

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Kézbesítési naplók betöltése tartalomtípus és azonosító alapján |
| GET | `/person/:personId` | JWT | — | Egy személy kézbesítési naplóinak betöltése. Opcionális `?startDate=&endDate=` szűrők |
| GET | `/recent` | JWT | — | A gyülekezet legutóbbi kézbesítési naplóinak betöltése. Opcionális `?limit=` (alapértelmezés 100) |
| GET | `/:id` | JWT | — | Kézbesítési napló betöltése azonosító alapján |

## Kapcsolódó oldalak

- [Valós idejű architektúra](../../realtime.md) – WebSocket-protokoll, szobafeliratkozások és az egységes kézbesítési keretrendszer
- [Webes push-értesítések](../../web-push.md) – Böngésző-push regisztráció és kézbesítés
- [Tagsági végpontok](./membership.md) – Személyek, csoportok, szerepkörök és alapvető identitás
- [Részvételi végpontok](./attendance.md) – Istentiszteletek és látogatások követése
- [Hitelesítés és jogosultságok](./authentication.md) – Bejelentkezési folyamat, JWT, OAuth és jogosultsági modell
- [Modulstruktúra](../module-structure.md) – Kódszervezési minták
