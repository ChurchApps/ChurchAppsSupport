---
title: "Üzenetküldési végpontok"
description: "A ChurchApps üzenetküldési API-végpontjainak referenciája: beszélgetések, jegyzetekhez való hozzáférési szabályok, SMS-küldés, e-mail sablonok, értesítések és eszközök."
---

# Üzenetküldési végpontok

<div class="article-intro">

Az Üzenetküldési modul a valós idejű beszélgetéseket, csevegőüzeneteket, push-értesítéseket, SMS- és e-mail-küldést, WebSocket-kapcsolatokat, privát üzeneteket, eszközregisztrációt és SMS-szolgáltatókat kezeli. Ez biztosítja a kommunikációs réteget, amelyet minden ChurchApps-alkalmazás használ, mind az élő közvetítés csevegéséhez, mind az aszinkron értesítésekhez.

</div>

**Alapútvonal:** `/messaging`

## Beszélgetések

Alapútvonal: `/messaging/conversations`

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Beszélgetések betöltése vesszővel elválasztott azonosítók alapján, az első és utolsó üzenetekkel |
| GET | `/messages/:contentType/:contentId` | JWT | — | Egy tartalomhoz tartozó beszélgetések betöltése lapozott üzenetekkel (`?page=&limit=`) |
| GET | `/posts` | JWT | — | A jelenlegi felhasználó csoportjaihoz tartozó bejegyzés-típusú beszélgetések lekérése |
| GET | `/posts/group/:groupId` | JWT | — | Egy adott csoporthoz tartozó bejegyzés-típusú beszélgetések lekérése |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | A legújabb jegyzetek minden rekordhoz a B1 Admin Jegyzetek oldalon. A `section` értéke `people`, `groups`, `events` vagy `workflows` lehet (egyébként 400-as hiba); a `limit` alapértéke 25 (maximum 100); a `before` az előző oldal kurzora. Minden jegyzetnek meg kell felelnie a saját típusa szabályának (Személyek szerkesztése / bizalmas jegyzetek jogosultság, csoportvezetők, eseményt megtekintők, munkafolyamat-kártyát megtekintők), így a hívók csak azokat a jegyzeteket látják, amelyeket meg tudnának nyitni. A jegyzetek szövegét 300 karakterre vágjuk |
| GET | `/current/:churchId/:contentType/:contentId` | Nyilvános | — | A tartalomhoz tartozó aktuális beszélgetés lekérése vagy létrehozása (a contentId-t automatikusan visszafejti) |
| GET | `/:churchId/:contentType/:contentId` | Nyilvános | — | Beszélgetések betöltése tartalomtípus és azonosító alapján |
| GET | `/:churchId/:id` | Nyilvános | — | Egy beszélgetés betöltése azonosító alapján |
| POST | `/` | JWT | — | Beszélgetések létrehozása vagy frissítése (kötegelve) |
| POST | `/start` | JWT | — | Új beszélgetés indítása egy kezdeti hozzászólás üzenettel |
| DELETE | `/:churchId/:id` | JWT | — | Beszélgetés törlése |

### Személyes jegyzetekhez való hozzáférés-szabályozás

A `contentType: "person"` (a személyi rekord Jegyzetek lapja) vagy `contentType: "personConfidential"` (a Bizalmas jegyzetek szakasz) típusú beszélgetéseket minden olvasási és írási útvonalon ellenőrzik, beleértve a fenti, egyébként nyilvános útvonalakat is, amelyek ezekre a tartalomtípusokra `401`-es választ adnak. A `person` típushoz a MembershipApi **Személyek / Szerkesztés** jogosultság szükséges; a `personConfidential` típushoz a **Személyek / Bizalmas jegyzetek megtekintése** jogosultság. Korlátozott API-kulcsok esetén a `people:write` mindkét műveletet tartalmazza (a kulcs felhasználójának továbbra is rendelkeznie kell a mögöttes szerepkör-jogosultsággal).

### Csoport- és eseményjegyzetek hozzáférés-szabályozása {#group-and-event-notes-access-control}

Két további jegyzettípust ugyanúgy ellenőriznek minden olvasási és írási útvonalon (a fenti nyilvános útvonalakat is beleértve), és soha nem nyitják meg névtelen hozzászólás számára:

- **`groupNote`** (`contentId` = csoportazonosító) -- a csoport **Vezetői jegyzetei** hírfolyama. Csak az adott csoport vezetői (a JWT `leaderGroupIds` mezője) olvashatják vagy tehetnek közzé bejegyzést. Egyetlen munkatársi jogosultság sem biztosít hozzáférést, beleértve a `content.edit` és a csoporttagsági jogosultságokat.
- **`eventNote`** (`contentId` = eseményazonosító) -- egy naptári eseményhez tartozó jegyzetek. A `content.edit` jogosultsággal rendelkező vagy a **Naptárak / Adminisztrátor** jogkörrel bíró munkatársak mindig olvashatják és közzétehetik a jegyzeteket. Egyébként a hozzáférés az esemény `notesViewRole` (olvasás) és `notesPostRole` (közzététel) mezőjét követi: a `staff` (az alapértelmezett, ha a mező `null`) senki mást nem enged, a `leaders` az esemény csoportjának vezetőit, a `members` pedig az esemény csoportjának tagjait és vezetőit engedélyezi. A `groupId` nélküli esemény csak munkatársak számára érhető el.

### Munkafolyamat-kártya jegyzeteinek hozzáférés-szabályozása

A `contentType: "workflowCard"` típusú beszélgetések (a munkafolyamat-kártya jegyzetei, ahol a `contentId` a kártya feladatazonosítója) csak azok számára olvashatók és írhatók, akik meg tudják nyitni az adott kártyát: a DoingApi **Feladatok / Megtekintés** jogosultsággal rendelkező felhasználó, vagy az a személy vagy csoport, akihez a kártya hozzá van rendelve, akit a kártya létrehozott, vagy akire a kártya vonatkozik. Mindenki más `401`-es választ kap minden olvasási útvonalon, beleértve a fenti nyilvános útvonalakat is. A kártya beszélgetését magán a kártyán keresztül lehet csatolni a `POST /doing/tasks/:id/conversation` hívással (törzs: `{ "conversationId": "..." }`; az első csatolt beszélgetés marad érvényben), amelyet a kártya szerkesztői és a hozzárendelt személy hívhat meg.

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
|--------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Egy beszélgetés összes üzenetének betöltése |
| GET | `/catchup/:churchId/:conversationId` | Nyilvános | — | Egy beszélgetés összes üzenetének betöltése (nyilvános utolérés élő csevegéshez) |
| GET | `/:churchId/:id` | Nyilvános | — | Egy üzenet betöltése azonosító alapján |
| POST | `/` | JWT | — | Üzenetek mentése (kötegelve). Valós idejű frissítéseket küld és értesítéseket indít. Egy meglévő üzenet frissítéséhez a szerzőnek kell lennie, vagy a `content.edit` jogosultsággal kell rendelkezni; a tárolt szerző nem cserélhető le |
| POST | `/send` | Nyilvános | — | Üzenetek küldése (kötegelve, nyilvános). Valós idejű frissítéseket küld WebSocketen keresztül és értesítéseket indít |
| POST | `/setCallout` | JWT | — | (elavult) Kiemelt üzenet közvetítése valós időben. Nincs aktív kliens; az élő közvetítés csevegése már nem jeleníti meg a kiemeléseket |
| DELETE | `/:churchId/:id` | JWT | — | Üzenet törlése és a törlés közvetítése valós időben. Lásd: [Üzenetmoderálás](#message-moderation) |

### Üzenetmoderálás

Üzenetet törölhet:

- az üzenet szerzője;
- a `content.edit` jogosultsággal rendelkező munkatárs (a gyülekezeten belül bárhol);
- **csoportvezetők**, a `contentType` értéke `group` vagy `groupAnnouncement` típusú beszélgetések esetén, ahol a `contentId` olyan csoport, amelyet vezetnek (a JWT `leaderGroupIds` mezője).

A személyi jegyzetekhez tartozó beszélgetéseket (`person` / `personConfidential`) soha nem moderálják a vezetők; ezekre a jegyzetekre vonatkozó jogosultságok (`people.edit`, `people.viewConfidentialNotes`) vonatkoznak.

A vezetők csak törölhetnek, szerkeszteni nem: más tag üzenetének átírása továbbra is csak a szerzőre és a `content.edit` jogosultsággal rendelkező munkatársakra korlátozódik.

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
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | A jelenlegi felhasználó összes privát üzenetének betöltése (beszélgetésenként az utolsó üzenettel, mindent olvasottnak jelöl) |
| GET | `/existing/:personId` | JWT | — | Egy adott személlyel folytatott meglévő privát beszélgetés keresése |
| GET | `/:id` | JWT | — | Egy privát üzenet betöltése azonosító alapján (törli az értesítést, ha az aktuális felhasználónak szól) |
| POST | `/` | JWT | — | Privát üzenetek küldése (kötegelve). Push-értesítést indít a címzettnek |

## Értesítések

Alapútvonal: `/messaging/notifications`

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | A jelenlegi felhasználó olvasatlan értesítéseinek száma |
| GET | `/my` | JWT | — | A jelenlegi felhasználó összes értesítésének betöltése (mindent olvasottnak jelöl) |
| GET | `/tmpEmail` | Nyilvános | — | Napi e-mail-értesítési összesítő indítása (hibakereső / ütemezett feladat végpont) |
| GET | `/:churchId/person/:personId` | JWT | — | Egy adott személy értesítéseinek betöltése |
| GET | `/:churchId/:id` | JWT | — | Egy értesítés betöltése azonosító alapján |
| POST | `/` | JWT | — | Értesítések létrehozása vagy frissítése (kötegelve) |
| POST | `/create` | JWT | — | Értesítések létrehozása több személy számára. Törzs: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Egy személy összes értesítésének olvasottnak jelölése |
| POST | `/sendTest` | JWT | — | Teszt push-értesítés küldése. Törzs: `{ personId, title }` |
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
|--------|------|------|------------|-------------|
| GET | `/categories` | JWT | — | Értesítési kategóriák listázása az alapértelmezett és engedélyezett csatornáikkal |
| GET | `/my` | JWT | — | A jelenlegi felhasználó értesítési beállításainak betöltése (ha nincsenek, automatikusan létrehozza az alapértékeket) |
| POST | `/` | JWT | — | A jelenlegi felhasználó beállításainak mentése. Törzs: a következők bármelyike: `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, valamint opcionálisan `overrides: [{ categoryKey, channel, optedIn }]` (a `channel` értéke lehet `push`, `email`, `in_app` vagy `sms`; a zárolt kategóriákat figyelmen kívül hagyja). Az `allowSms` a tag szöveges emlékeztetőkre adott hozzájárulását jelöli. A régi, sorokból álló tömb formátumú törzs továbbra is elfogadott |

## Kapcsolatok

Alapútvonal: `/messaging/connections`

A WebSocket- és valós idejű kapcsolatokat kezeli csevegéshez, csoportbeszélgetésekhez, privát üzenetekhez és élő közvetítéshez. A teljes protokollért lásd: [Valós idejű architektúra](../../realtime.md).

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | Nyilvános | — | Egy beszélgetéshez tartozó összes kapcsolat betöltése |
| POST | `/` | Nyilvános | — | Kapcsolatok regisztrálása (kötegelve). Jelenlétet közvetít a beszélgetésen. A törzs elemei: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Nyilvános | — | Egy kapcsolat megjelenítendő nevének frissítése socket-azonosító alapján. Törzs: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Nyilvános | — | Kapcsolat eltávolítása egy beszélgetésből. Jelenlétet közvetít |
| POST | `/tmpSendAlert` | Nyilvános | — | Értesítő riasztás küldése egy személy kapcsolatainak. Törzs: `{ churchId, personId }` |

## Eszközök

Alapútvonal: `/messaging/devices`

Push-értesítésekhez és tartalompárosításhoz (pl. a Lessons alkalmazás TV-kijelzőkön) szükséges eszközregisztrációt kezeli.

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | Eszköz regisztrálása vagy frissítése (mobil push-regisztráció). FCM-token vagy eszközazonosító alapján illeszt |
| POST | `/enrollAnon` | Nyilvels | — | Névtelen eszköz regisztrálása, és 4 karakteres párosítókód generálása |
| POST | `/` | Nyilvános | — | Eszközök mentése (kötegelve) |
| GET | `/pair/:pairingCode` | JWT | — | Eszköz párosítása a párosítókódjával. Opcionális `?contentType=&contentId=` a tartalom hozzárendeléséhez |
| GET | `/status/:deviceId` | Nyilvános | — | Egy eszköz párosítási állapotának ellenőrzése |
| GET | `/:churchId` | JWT | — | Egy gyülekezet összes eszközének betöltése |
| GET | `/:churchId/person/:personId` | JWT | — | Egy személy összes eszközének betöltése |
| GET | `/:churchId/:id` | JWT | — | Egy eszköz betöltése azonosító alapján |
| DELETE | `/:churchId/:id` | JWT | — | Eszköz törlése |

### Példa: Eszköz regisztrálása

```
POST /messaging/devices/enroll
Authorization: Bearer <token>

{
  "fcmToken": "firebase-token-abc123",
  "appName": "B1App",
  "label": "John's iPhone",
  "deviceInfo": "iOS 17, iPhone 15"
}
```

```json
{
  "id": "device-001",
  "churchId": "church-789",
  "fcmToken": "firebase-token-abc123",
  "appName": "B1App",
  "label": "John's iPhone",
  "registrationDate": "2026-02-17T10:00:00.000Z",
  "lastActiveDate": "2026-02-17T10:00:00.000Z"
}
```

## Eszköztartalmak

Alapútvonal: `/messaging/devicecontents`

Párosított eszközökhöz tartozó tartalom-hozzárendeléseket kezeli (pl. melyik lecke jelenik meg egy TV-n).

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Egy eszköz tartalom-hozzárendeléseinek betöltése |
| POST | `/` | JWT | — | Eszköz tartalom-hozzárendelések mentése (kötegelve) |
| DELETE | `/:id` | JWT | — | Eszköz tartalom-hozzárendelés törlése |

## SMS-küldés

Alapútvonal: `/messaging/texting`

SMS-szolgáltatókat, csoportos szöveges üzenetküldést és kézbesítés-követést kezel.

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | A gyülekezet SMS-szolgáltatóinak betöltése (a hitelesítő adatok maszkolva vannak) |
| GET | `/status` | JWT | — | `{ enabled }` -- az, hogy a gyülekezetnek van-e engedélyezett SMS-szolgáltatója. Bármely bejelentkezett gyülekezeti felhasználó lekérheti; a **Szöveg** lehetőségek csak akkor jelennek meg, ha szöveges üzenet küldhető |
| GET | `/inboundUrl` | JWT | `texting.send` vagy `settings.edit` | `{ url }` -- a gyülekezet bejövő (STOP) webhook URL-je, amelyet be kell illeszteni a szolgáltatóba |
| POST | `/inbound/:churchId/:token` | Nyilvános | — | Szolgáltató bejövő üzenet webhookja. A `token` a gyülekezet azonosítójának HMAC-je. Ha a válasz pontosan egy leállító szó (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), minden egyező személy `optedOut` állapotot kap, és a `allowSms` értéke kikapcsol. Visszaadja: `{ optedOut: <count> }`; más válaszok esetén `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | Egy csoportos szöveges üzenet címzettjeinek előnézete (jogosult, leiratkozott és telefonszám nélküli darabszámok) |
| GET | `/sent` | JWT | — | A gyülekezet összes elküldött szöveges üzenetének rekordjai |
| GET | `/sent/:id/details` | JWT | — | Egy elküldött szöveges üzenet betöltése, címzettenkénti kézbesítési naplókkal |
| POST | `/providers` | JWT | — | SMS-szolgáltatók mentése (kötegelve). Titkosítja az API-hitelesítő adatokat |
| POST | `/send` | JWT | — | SMS küldése egy csoport összes jogosult tagjának. Törzs: `{ groupId, message }`. A összefésülő mezők (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) címzettenként kerülnek feloldásra |
| POST | `/sendPerson` | JWT | — | SMS küldése egyetlen személynek. Törzs: `{ personId, phoneNumber, message }`. Az összefésülő mezők feloldódnak, és a feloldott szöveg kerül naplózásra |
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

Újrafelhasználható e-mail sablonokat kezel, és sablonos e-maileket küld csoportoknak.

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | A gyülekezet összes e-mail sablonjának betöltése |
| GET | `/:id` | JWT | — | Egy e-mail sablon betöltése azonosító alapján |
| GET | `/sendStatus` | JWT | `groupMembers.edit` vagy `tasks.admin` | A gyülekezet csoportos e-mail állapota: `{ approved, paused, remaining, requested }`. A B1Admin E-mail küldése párbeszédablaka és a munkafolyamat **E-mail küldése** művelete ezt használja, hogy figyelmeztessen, ha az e-mail nem fog kimenni |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | Kérés a támogatásnak, hogy hagyják jóvá a gyülekezetet csoportos e-mailekhez (gyülekezetenként legfeljebb hetente egyszer) |
| GET | `/preview/:groupId` | JWT | — | Egy csoport e-mail-kézbesítésének előnézete (jogosult címzettek száma, e-mail-cím nélküli tagok) |
| POST | `/` | JWT | — | E-mail sablonok létrehozása vagy frissítése (kötegelve) |
| POST | `/send` | JWT | — | Sablonos e-mail küldése egy csoport összes tagjának. Törzs: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | E-mail sablon törlése |

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

**Támogatott összefésülő mezők:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## Letiltott IP-címek

Alapútvonal: `/messaging/blockedips`

(elavult) IP-címek letiltása élő közvetítésű csevegéshez. A B1App kliens már nem hívja meg a `POST /` végpontot -- az IP-letiltást az egységesített kézbesítési migráció során eltávolították. A `/clear` útvonalat a `StreamingServiceController` továbbra is szerverek közötti hívásként használja, amikor közvetítési szolgáltatásokat mentenek.

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | (elavult) Letiltott IP-címek mentése (kötegelve). Nincs aktív kliens |
| POST | `/clear` | JWT | — | Letiltott IP-címek törlése meghatározott szolgáltatásokhoz. Törzs: `[{ serviceId, churchId }]` |

## Kézbesítési naplók

Alapútvonal: `/messaging/deliverylogs`

Az elküldött üzenetek (SMS, push-értesítések, e-mail) kézbesítési állapotát követi nyomon.

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Kézbesítési naplók betöltése tartalomtípus és azonosító alapján |
| GET | `/person/:personId` | JWT | — | Egy személy kézbesítési naplóinak betöltése. Opcionális `?startDate=&endDate=` szűrők |
| GET | `/recent` | JWT | — | A gyülekezet legutóbbi kézbesítési naplóinak betöltése. Opcionális `?limit=` (alapértelmezett 100) |
| GET | `/:id` | JWT | — | Kézbesítési napló betöltése azonosító alapján |

## Kapcsolódó oldalak

- [Valós idejű architektúra](../../realtime.md) -- WebSocket-protokoll, szobafeliratkozások és az egységesített kézbesítési keretrendszer
- [Webes push-értesítések](../../web-push.md) -- Böngésző push-regisztráció és kézbesítés
- [Tagsági végpontok](./membership.md) -- Személyek, csoportok, szerepkörök és alapvető identitás
- [Jelenléti végpontok](./attendance.md) -- Istentiszteletek és látogatások nyomon követése
- [Hitelesítés és jogosultságok](./authentication.md) -- Bejelentkezési folyamat, JWT, OAuth, jogosultsági modell
- [Modulszerkezet](../module-structure.md) -- Kódszervezési minták
