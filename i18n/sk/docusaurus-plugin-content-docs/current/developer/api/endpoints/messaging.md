---
title: "Koncové body správ"
description: "Referencia koncových bodov API správ ChurchApps: konverzácie, pravidlá prístupu k poznámkam, textové správy, šablóny e-mailov, upozornenia a zariadenia."
---

# Koncové body správ

<div class="article-intro">

Modul Správy spravuje konverzácie v reálnom čase, chatové správy, push upozornenia, doručovanie SMS a e-mailov, pripojenia WebSocket, súkromné správy, registráciu zariadení a poskytovateľov textových správ. Poskytuje komunikačnú vrstvu, ktorú používajú všetky aplikácie ChurchApps, a to pre živý chat pri streamovaní aj pre asynchrónne upozornenia.

</div>

**Základná cesta:** `/messaging`

## Konverzácie

Základná cesta: `/messaging/conversations`

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|------|------|------|------|
| GET | `/timeline/ids?ids=` | JWT | — | Načíta konverzácie podľa ID oddelených čiarkou spolu s prvou a poslednou správou |
| GET | `/messages/:contentType/:contentId` | JWT | — | Načíta konverzácie k obsahu so stránkovanými správami (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Získa konverzácie typu príspevok pre skupiny aktuálneho používateľa |
| GET | `/posts/group/:groupId` | JWT | — | Získa konverzácie typu príspevok pre konkrétnu skupinu |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | Najnovšie poznámky zo všetkých záznamov pre stránku Poznámky v B1 Admin. `section` je `people`, `groups`, `events` alebo `workflows` (inak 400); `limit` má predvolenú hodnotu 25 (najviac 100); `before` je kurzor z predchádzajúcej stránky. Každá poznámka stále prechádza pravidlom svojho typu (oprávnenie Osoby / Úprava alebo dôverné poznámky, vedúci skupiny, prezerajúci udalostí, prezerajúci kariet pracovného postupu), takže volajúci vidia iba poznámky, ktoré by mohli otvoriť. Text poznámky je skrátený na 300 znakov |
| GET | `/current/:churchId/:contentType/:contentId` | Verejné | — | Získa alebo vytvorí aktuálnu konverzáciu k obsahu (automaticky dešifruje contentId) |
| GET | `/:churchId/:contentType/:contentId` | Verejné | — | Načíta konverzácie podľa typu obsahu a ID |
| GET | `/:churchId/:id` | Verejné | — | Načíta jednu konverzáciu podľa ID |
| POST | `/` | JWT | — | Vytvorí alebo aktualizuje konverzácie (dávkovo) |
| POST | `/start` | JWT | — | Spustí novú konverzáciu s úvodnou správou ako komentárom |
| DELETE | `/:churchId/:id` | JWT | — | Odstráni konverzáciu |

### Riadenie prístupu k poznámkam k osobe

Konverzácie s `contentType: "person"` (karta Poznámky na zázname osoby) alebo `contentType: "personConfidential"` (sekcia Dôverné poznámky) sú obmedzené pri každej operácii čítania a zápisu vrátane verejných trás uvedených vyššie, ktoré pre tieto typy obsahu vracajú `401`. Typ `person` vyžaduje oprávnenie MembershipApi **Osoby / Úprava**; typ `personConfidential` vyžaduje oprávnenie **Osoby / Zobraziť dôverné poznámky**. Pre API kľúče s obmedzeným rozsahom má `people:write` obe akcie (používateľ priradený ku kľúču však musí stále mať príslušné oprávnenie roly).

### Riadenie prístupu k poznámkam skupín a udalostí {#group-and-event-notes-access-control}

Ďalšie dva typy poznámok sú obmedzené rovnakým spôsobom pri každej operácii čítania a zápisu (vrátane verejných trás uvedených vyššie) a nikdy nie sú otvorené na anonymné pridávanie:

- **`groupNote`** (`contentId` = ID skupiny) -- kanál **Poznámky vedúcich** na skupine. Čítať alebo pridávať príspevky môžu iba vedúci tejto skupiny (`leaderGroupIds` v JWT). Žiadne oprávnenie pre zamestnancov nedáva prístup, vrátane `content.edit` a oprávnení na členstvo v skupine.
- **`eventNote`** (`contentId` = ID udalosti) -- poznámky k udalosti v kalendári. Zamestnanci s `content.edit` alebo **Kalendáre / Správca** môžu vždy čítať a pridávať. Inak prístup určujú polia `notesViewRole` (čítanie) a `notesPostRole` (pridávanie) udalosti: `staff` (predvolená hodnota, použitá, keď je pole `null`) nepovoľuje nikomu inému, `leaders` povoľuje vedúcim skupiny udalosti a `members` povoľuje členom a vedúcim skupiny udalosti. Udalosť bez `groupId` je prístupná iba zamestnancom.

### Riadenie prístupu k poznámkam kariet pracovného postupu

Konverzácie s `contentType: "workflowCard"` (poznámky na karte pracovného postupu, kde `contentId` je ID úlohy karty) môže čítať a upravovať iba ten, kto môže otvoriť túto kartu: používateľ s oprávnením DoingApi **Úlohy / Zobraziť**, alebo osoba či skupina, ktorej je karta priradená, ktorá ju vytvorila alebo ktorej sa týka. Všetci ostatní dostanú `401` pri každej trase čítania, vrátane verejných trás uvedených vyššie. Konverzácia karty sa pripája cez samotnú kartu pomocou `POST /doing/tasks/:id/conversation` (telo `{ "conversationId": "..." }`; prvá pripojená konverzácia má prednosť). Volať ju môžu editori karty a jej zodpovedná osoba.

### Príklad: Spustenie konverzácie

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

## Správy

Základná cesta: `/messaging/messages`

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|------|------|------|------|
| GET | `/conversation/:conversationId` | JWT | — | Načíta všetky správy konverzácie |
| GET | `/catchup/:churchId/:conversationId` | Verejné | — | Načíta všetky správy konverzácie (verejné doplnenie pre živý chat) |
| GET | `/:churchId/:id` | Verejné | — | Načíta jednu správu podľa ID |
| POST | `/` | JWT | — | Uloží správy (dávkovo). Odosiela aktualizácie v reálnom čase a spúšťa upozornenia. Úprava existujúcej správy vyžaduje, aby bol používateľ jej autorom alebo aby mal `content.edit`; uložený autor sa nikdy nedá preniesť na iného |
| POST | `/send` | Verejné | — | Odošle správy (dávkovo, verejne). Odosiela aktualizácie v reálnom čase cez WebSocket a spúšťa upozornenia |
| POST | `/setCallout` | JWT | — | (zastarané) Vysiela zvýraznenú správu v reálnom čase. Nemá aktívneho klienta; chat živého streamu už zvýraznenia nezobrazuje |
| DELETE | `/:churchId/:id` | JWT | — | Odstráni správu a v reálnom čase vysiela jej odstránenie. Pozri [Moderovanie správ](#message-moderation) |

### Moderovanie správ

Odstrániť správu môže:

- autor správy;
- zamestnanec s `content.edit` (kdekoľvek v cirkvi);
- **vedúci skupiny** pri konverzáciách s `contentType` `group` alebo `groupAnnouncement`, ktorých `contentId` je skupina, ktorú vedú (`leaderGroupIds` v JWT).

Konverzácie poznámok k osobe (`person` / `personConfidential`) nemoderujú vedúci -- používajú namiesto toho oprávnenia pre poznámky (`people.edit`, `people.viewConfidentialNotes`).

Vedúci môžu správy iba odstraňovať, nie upravovať: prepísanie správy iného člena zostáva obmedzené na autora a zamestnancov s `content.edit`.

### Príklad: Odoslanie správy

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

## Súkromné správy

Základná cesta: `/messaging/privatemessages`

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Načíta všetky súkromné správy aktuálneho používateľa (vrátane poslednej správy každej konverzácie a označí všetky ako prečítané) |
| GET | `/existing/:personId` | JWT | — | Nájde existujúcu súkromnú konverzáciu s konkrétnou osobou |
| GET | `/:id` | JWT | — | Načíta súkromnú správu podľa ID (ak je adresovaná aktuálnemu používateľovi, zruší upozornenie) |
| POST | `/` | JWT | — | Odošle súkromné správy (dávkovo). Spúšťa push upozornenie pre príjemcu |

## Upozornenia

Základná cesta: `/messaging/notifications`

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|------|------|------|------|
| GET | `/unreadCount` | JWT | — | Získa počet neprečítaných upozornení aktuálneho používateľa |
| GET | `/my` | JWT | — | Načíta všetky upozornenia aktuálneho používateľa (označí všetky ako prečítané) |
| GET | `/tmpEmail` | Verejné | — | Spustí denný súhrnný e-mail s upozorneniami (ladiaci alebo cron koncový bod) |
| GET | `/:churchId/person/:personId` | JWT | — | Načíta upozornenia pre konkrétnu osobu |
| GET | `/:churchId/:id` | JWT | — | Načíta upozornenie podľa ID |
| POST | `/` | JWT | — | Vytvorí alebo aktualizuje upozornenia (dávkovo) |
| POST | `/create` | JWT | — | Vytvorí upozornenia pre viacero osôb. Telo: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Označí všetky upozornenia osoby ako prečítané |
| POST | `/sendTest` | JWT | — | Odošle skúšobné push upozornenie. Telo: `{ personId, title }` |
| POST | `/ping` | Verejné | — | Vytvorí upozornenie z externého spúšťača. Telo: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Odstráni upozornenie |

### Príklad: Vytvorenie upozornení

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

## Predvoľby upozornení

Základná cesta: `/messaging/notificationpreferences`

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|------|------|------|------|
| GET | `/categories` | JWT | — | Zoznam kategórií upozornení s ich predvolenými a povolenými kanálmi |
| GET | `/my` | JWT | — | Načíta predvoľby upozornení aktuálneho používateľa (ak neexistujú, automaticky vytvorí predvolené) |
| POST | `/` | JWT | — | Uloží predvoľby aktuálneho používateľa. Telo: ľubovoľné z `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, plus voliteľné `overrides: [{ categoryKey, channel, optedIn }]` (kanál môže byť `push`, `email`, `in_app` alebo `sms`; uzamknuté kategórie sa ignorujú). `allowSms` je súhlas člena s textovými pripomienkami. Stále sa akceptuje aj zastaraný formát tela ako pole riadkov |

## Pripojenia

Základná cesta: `/messaging/connections`

Spravuje pripojenia WebSocket a pripojenia v reálnom čase pre chat, skupinové konverzácie, súkromné správy a živé streamovanie. Celý protokol nájdete v časti [Architektúra v reálnom čase](../../realtime.md).

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|------|------|------|------|
| GET | `/:churchId/:conversationId` | Verejné | — | Načíta všetky pripojenia ku konverzácii |
| POST | `/` | Verejné | — | Zaregistruje pripojenia (dávkovo). Spúšťa vysielanie účasti pre konverzáciu. Položky tela: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Verejné | — | Aktualizuje zobrazované meno pripojenia podľa ID socketu. Telo: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Verejné | — | Odstráni pripojenie z konverzácie. Spúšťa vysielanie účasti |
| POST | `/tmpSendAlert` | Verejné | — | Odošle upozornenie na pripojenia osoby. Telo: `{ churchId, personId }` |

## Zariadenia

Základná cesta: `/messaging/devices`

Spravuje registráciu zariadení pre push upozornenia a párovanie obsahu (napr. aplikácia Lessons na televíznych obrazovkách).

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|------|------|------|------|
| POST | `/enroll` | JWT | — | Zaregistruje alebo aktualizuje zariadenie (registrácia mobilného push). Hľadá podľa tokenu FCM alebo ID zariadenia |
| POST | `/enrollAnon` | Verejné | — | Zaregistruje anonymné zariadenie a vygeneruje 4-znakový párovací kód |
| POST | `/` | Verejné | — | Uloží zariadenia (dávkovo) |
| GET | `/pair/:pairingCode` | JWT | — | Spáruje zariadenie pomocou jeho párovacieho kódu. Voliteľné `?contentType=&contentId=` na priradenie obsahu |
| GET | `/status/:deviceId` | Verejné | — | Skontroluje stav párovania zariadenia |
| GET | `/:churchId` | JWT | — | Načíta všetky zariadenia cirkvi |
| GET | `/:churchId/person/:personId` | JWT | — | Načíta všetky zariadenia osoby |
| GET | `/:churchId/:id` | JWT | — | Načíta zariadenie podľa ID |
| DELETE | `/:churchId/:id` | JWT | — | Odstráni zariadenie |

### Príklad: Zaregistrovanie zariadenia

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

## Obsah zariadení

Základná cesta: `/messaging/devicecontents`

Spravuje priradenia obsahu pre spárované zariadenia (napr. ktorá lekcia sa zobrazuje na televízore).

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|------|------|------|------|
| GET | `/deviceId/:deviceId` | JWT | — | Načíta priradenia obsahu pre zariadenie |
| POST | `/` | JWT | — | Uloží priradenia obsahu zariadení (dávkovo) |
| DELETE | `/:id` | JWT | — | Odstráni priradenie obsahu zariadenia |

## Textové správy

Základná cesta: `/messaging/texting`

Spravuje poskytovateľov SMS, skupinové textové správy a sledovanie doručenia.

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|------|------|------|------|
| GET | `/providers` | JWT | — | Načíta poskytovateľov textových správ pre cirkev (prihlasovacie údaje sú maskované) |
| GET | `/status` | JWT | — | `{ enabled }` -- či cirkev má zapnutého poskytovateľa textových správ. Ktorýkoľvek prihlásený používateľ cirkvi; používa sa na zobrazenie možností **Text** iba vtedy, keď je možné správy odoslať |
| GET | `/inboundUrl` | JWT | `texting.send` alebo `settings.edit` | `{ url }` -- URL prichádzajúceho webhooku cirkvi (STOP), ktorú treba vložiť do poskytovateľa |
| POST | `/inbound/:churchId/:token` | Verejné | — | Webhook prichádzajúcich správ od poskytovateľa. `token` je HMAC ID cirkvi. Odpoveď, ktorá je presne stop slovo (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), označí každú zodpovedajúcu osobu ako `optedOut` a vypne jej `allowSms`. Vracia `{ optedOut: <count> }`; ostatné odpovede vracajú `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | Zobrazí náhľad príjemcov skupinovej textovej správy (počty oprávnených, odhlásených a bez telefónu) |
| GET | `/sent` | JWT | — | Načíta všetky záznamy odoslaných textových správ cirkvi |
| GET | `/sent/:id/details` | JWT | — | Načíta odoslanú textovú správu so záznamami doručenia pre každého príjemcu |
| POST | `/providers` | JWT | — | Uloží poskytovateľov textových správ (dávkovo). Šifruje API prihlasovacie údaje |
| POST | `/send` | JWT | — | Odošle SMS všetkým oprávneným členom skupiny. Telo: `{ groupId, message }`. Polia na zlúčenie (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) sa vyhodnocujú pre každého príjemcu |
| POST | `/sendPerson` | JWT | — | Odošle SMS jednej osobe. Telo: `{ personId, phoneNumber, message }`. Polia na zlúčenie sa vyhodnotia a zaznamená sa vyhodnotený text |
| DELETE | `/providers/:id` | JWT | — | Odstráni poskytovateľa textových správ |

### Príklad: Odoslanie skupinovej textovej správy

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

## Šablóny e-mailov

Základná cesta: `/messaging/emailTemplates`

Spravuje opakovane použiteľné šablóny e-mailov a odosielanie e-mailov zo šablón skupinám.

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Načíta všetky šablóny e-mailov cirkvi |
| GET | `/:id` | JWT | — | Načíta jednu šablónu e-mailu podľa ID |
| GET | `/sendStatus` | JWT | `groupMembers.edit` alebo `tasks.admin` | Stav e-mailov skupín cirkvi: `{ approved, paused, remaining, requested }`. Dialóg Odoslať e-mail v B1Admin a akcia pracovného postupu **Odoslať e-mail** ju používajú na upozornenie, keď e-mail neodíde |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | Požiada podporu o schválenie cirkvi pre e-maily skupín (najviac raz za týždeň na cirkev) |
| GET | `/preview/:groupId` | JWT | — | Zobrazí náhľad doručenia e-mailu pre skupinu (počet oprávnených príjemcov, členovia bez e-mailu) |
| POST | `/` | JWT | — | Vytvorí alebo aktualizuje šablóny e-mailov (dávkovo) |
| POST | `/send` | JWT | — | Odošle e-mail zo šablóny všetkým členom skupiny. Telo: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Odstráni šablónu e-mailu |

### Príklad: Odoslanie e-mailu skupine

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

**Podporované polia na zlúčenie:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## Blokované IP adresy

Základná cesta: `/messaging/blockedips`

(zastarané) Blokovanie IP adries pre chat živého streamovania. Klient B1App už nevolá `POST /` -- blokovanie IP adries bolo odstránené pri migrácii na jednotné doručovanie. Trasu `/clear` stále volá na strane servera `StreamingServiceController`, keď sa ukladajú služby streamovania.

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|------|------|------|------|
| POST | `/` | JWT | — | (zastarané) Uloží blokované IP adresy (dávkovo). Nemá aktívneho klienta |
| POST | `/clear` | JWT | — | Vymaže všetky blokované IP adresy pre konkrétne služby. Telo: `[{ serviceId, churchId }]` |

## Záznamy o doručení

Základná cesta: `/messaging/deliverylogs`

Sleduje stav doručenia odoslaných správ (SMS, push upozornenia, e-maily).

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|------|------|------|------|
| GET | `/content/:contentType/:contentId` | JWT | — | Načíta záznamy doručenia podľa typu obsahu a ID |
| GET | `/person/:personId` | JWT | — | Načíta záznamy doručenia pre osobu. Voliteľné filtre `?startDate=&endDate=` |
| GET | `/recent` | JWT | — | Načíta nedávne záznamy doručenia pre cirkev. Voliteľné `?limit=` (predvolene 100) |
| GET | `/:id` | JWT | — | Načíta záznam doručenia podľa ID |

## Súvisiace stránky

- [Architektúra v reálnom čase](../../realtime.md) -- protokol WebSocket, odbery miestností a rámec jednotného doručovania
- [Push upozornenia vo webovom prehliadači](../../web-push.md) -- registrácia a doručovanie push upozornení v prehliadači
- [Koncové body členstva](./membership.md) -- osoby, skupiny, roly a základná identita
- [Koncové body účasti](./attendance.md) -- sledovanie služieb a návštev
- [Autentifikácia a oprávnenia](./authentication.md) -- postup prihlásenia, JWT, OAuth, model oprávnení
- [Štruktúra modulu](../module-structure.md) -- vzory organizácie kódu
