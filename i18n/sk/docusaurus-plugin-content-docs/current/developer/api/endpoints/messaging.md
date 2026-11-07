---
title: "Koncové body modulu správ"
---

# Koncové body modulu správ

<div class="article-intro">

Modul správ spravuje konverzácie v reálnom čase, chatové správy, push oznámenia, doručovanie SMS a e-mailov, pripojenia WebSocket, súkromné správy, registráciu zariadení a poskytovateľov textových správ. Poskytuje komunikačnú vrstvu, ktorú používajú všetky aplikácie ChurchApps, a to pre chat živých prenosov aj pre asynchrónne oznámenia.

</div>

**Základná cesta:** `/messaging`

## Konverzácie

Základná cesta: `/messaging/conversations`

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/timeline/ids?ids=` | JWT | — | Načíta konverzácie podľa ID oddelených čiarkou spolu s prvou a poslednou správou |
| GET | `/messages/:contentType/:contentId` | JWT | — | Načíta konverzácie k obsahu so stránkovanými správami (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Získa konverzácie typu príspevok pre skupiny aktuálneho používateľa |
| GET | `/posts/group/:groupId` | JWT | — | Získa konverzácie typu príspevok pre konkrétnu skupinu |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | Najnovšie poznámky zo všetkých záznamov na stránke Poznámky v B1 Admin. `section` je `people`, `groups`, `events` alebo `workflows` (inak 400); `limit` má predvolenú hodnotu 25 (najviac 100); `before` je kurzor z predchádzajúcej stránky. Každá poznámka stále prechádza pravidlom svojho typu (oprávnenie Upraviť osoby / dôverné poznámky, vedúci skupiny, prezerajúci udalostí, prezerajúci kariet pracovných postupov), takže volajúci vidia iba poznámky, ktoré by mohli otvoriť. Text poznámky je skrátený na 300 znakov |
| GET | `/current/:churchId/:contentType/:contentId` | Verejné | — | Získa alebo vytvorí aktuálnu konverzáciu k obsahu (automaticky dešifruje contentId) |
| GET | `/:churchId/:contentType/:contentId` | Verejné | — | Načíta konverzácie podľa typu obsahu a ID |
| GET | `/:churchId/:id` | Verejné | — | Načíta jednu konverzáciu podľa ID |
| POST | `/` | JWT | — | Vytvorí alebo aktualizuje konverzácie (dávkovo) |
| POST | `/start` | JWT | — | Začne novú konverzáciu s úvodnou komentárovou správou |
| DELETE | `/:churchId/:id` | JWT | — | Vymaže konverzáciu |

### Riadenie prístupu k poznámkam o osobách

Konverzácie s `contentType: "person"` (karta Poznámky v zázname osoby) alebo `contentType: "personConfidential"` (sekcia Dôverné poznámky) sú chránené pri každej ceste čítania a zápisu vrátane vyššie uvedených verejných trás, ktoré pre tieto typy obsahu vracajú `401`. `person` vyžaduje oprávnenie MembershipApi **Osoby / Upraviť**; `personConfidential` vyžaduje **Osoby / Zobraziť dôverné poznámky**. Pre API kľúče s obmedzeným rozsahom `people:write` zahŕňa obe akcie (používateľ kľúča musí mať stále príslušné oprávnenie roly).

### Riadenie prístupu k poznámkam skupín a udalostí {#group-and-event-notes-access-control}

Dva ďalšie typy poznámok sú chránené rovnako, pri každej ceste čítania a zápisu (vrátane vyššie uvedených verejných trás), a nikdy nie sú otvorené pre anonymné pridávanie:

- **`groupNote`** (`contentId` = ID skupiny) -- zdroj **Poznámky vedúcich** pri skupine. Čítať alebo pridávať môžu iba vedúci danej skupiny (`leaderGroupIds` v JWT). Žiadne personálne oprávnenie neudeľuje prístup, vrátane `content.edit` a oprávnení členstva v skupine.
- **`eventNote`** (`contentId` = ID udalosti) -- poznámky k udalosti v kalendári. Personál s `content.edit` alebo **Kalendáre / Správca** môže vždy čítať a pridávať. Inak prístup závisí od polí `notesViewRole` (čítanie) a `notesPostRole` (pridávanie) danej udalosti: `staff` (predvolené, použité, keď je pole `null`) nepovoľuje nikomu inému, `leaders` povoľuje vedúcim skupiny udalosti a `members` povoľuje členom a vedúcim skupiny udalosti. Udalosť bez `groupId` je prístupná iba personálu.

### Riadenie prístupu k poznámkam kariet pracovných postupov

Konverzácie s `contentType: "workflowCard"` (poznámky na karte pracovného postupu, kde `contentId` je ID úlohy karty) môže čítať a upravovať iba ten, kto môže danú kartu otvoriť: používateľ s oprávnením DoingApi **Úlohy / Zobraziť**, alebo osoba či skupina, ktorej je karta priradená, ktorá ju vytvorila alebo sa jej týka. Ostatní dostanú pri každej ceste čítania `401`, vrátane vyššie uvedených verejných trás. Konverzácia karty sa priraďuje cez samotnú kartu pomocou `POST /doing/tasks/:id/conversation` (telo `{ "conversationId": "..." }`; prvá priložená konverzácia má prednosť), čo môžu volať editori karty a jej poverená osoba.

### Príklad: Začatie konverzácie

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
|--------|-------|----------------|------------|-------|
| GET | `/conversation/:conversationId` | JWT | — | Načíta všetky správy konverzácie |
| GET | `/catchup/:churchId/:conversationId` | Verejné | — | Načíta všetky správy konverzácie (verejné dobehnutie pre živý chat) |
| GET | `/:churchId/:id` | Verejné | — | Načíta jednu správu podľa ID |
| POST | `/` | JWT | — | Uloží správy (dávkovo). Odosiela aktualizácie v reálnom čase a spúšťa oznámenia. Úprava existujúcej správy vyžaduje, aby bol používateľ jej autorom alebo mal `content.edit`; uložený autor sa nikdy nedá zmeniť |
| POST | `/send` | Verejné | — | Odošle správy (dávkovo, verejne). Odosiela aktualizácie v reálnom čase cez WebSocket a spúšťa oznámenia |
| POST | `/setCallout` | JWT | — | (zastarané) Vysiela výzvu-správu v reálnom čase. Žiadny aktívny klient; chat živého prenosu už výzvy nezobrazuje |
| DELETE | `/:churchId/:id` | JWT | — | Vymaže správu a v reálnom čase oznámi jej vymazanie. Pozri [Moderovanie správ](#message-moderation) |

### Moderovanie správ

Správu môže vymazať:

- autor správy;
- personál s `content.edit` (kdekoľvek v cirkvi);
- **vedúci skupín** pri konverzáciách s `contentType` `group` alebo `groupAnnouncement`, ktorých `contentId` je skupina, ktorú vedú (`leaderGroupIds` v JWT).

Konverzácie poznámok o osobách (`person` / `personConfidential`) nikdy nemodérujú vedúci skupín. Namiesto toho používajú oprávnenia k poznámkam (`people.edit`, `people.viewConfidentialNotes`).

Vedúci môžu správy iba vymazávať, nie upravovať: prepisovanie správy iného člena zostáva obmedzené na autora a personál s `content.edit`.

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
|--------|-------|----------------|------------|-------|
| GET | `/` | JWT | — | Načíta všetky súkromné správy aktuálneho používateľa (vrátane poslednej správy v každej konverzácii; všetky označí ako prečítané) |
| GET | `/existing/:personId` | JWT | — | Nájde existujúcu súkromnú konverzáciu s konkrétnou osobou |
| GET | `/:id` | JWT | — | Načíta súkromnú správu podľa ID (ak je adresovaná aktuálnemu používateľovi, vymaže oznámenie) |
| POST | `/` | JWT | — | Odošle súkromné správy (dávkovo). Spustí push oznámenie pre príjemcu |

## Oznámenia

Základná cesta: `/messaging/notifications`

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/unreadCount` | JWT | — | Získa počet neprečítaných oznámení aktuálneho používateľa |
| GET | `/my` | JWT | — | Načíta všetky oznámenia aktuálneho používateľa (všetky označí ako prečítané) |
| GET | `/tmpEmail` | Verejné | — | Spustí denný súhrn e-mailových oznámení (ladiaci/cron endpoint) |
| GET | `/:churchId/person/:personId` | JWT | — | Načíta oznámenia konkrétnej osoby |
| GET | `/:churchId/:id` | JWT | — | Načíta oznámenie podľa ID |
| POST | `/` | JWT | — | Vytvorí alebo aktualizuje oznámenia (dávkovo) |
| POST | `/create` | JWT | — | Vytvorí oznámenia pre viacero osôb. Telo: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Označí všetky oznámenia osoby ako prečítané |
| POST | `/sendTest` | JWT | — | Odošle skúšobné push oznámenie. Telo: `{ personId, title }` |
| POST | `/ping` | Verejné | — | Vytvorí oznámenie z externého spúšťača. Telo: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Vymaže oznámenie |

### Príklad: Vytvorenie oznámení

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

## Nastavenia oznámení

Základná cesta: `/messaging/notificationpreferences`

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/categories` | JWT | — | Zobrazí kategórie oznámení s ich predvolenými a povolenými kanálmi |
| GET | `/my` | JWT | — | Načíta nastavenia oznámení aktuálneho používateľa (ak neexistujú, automaticky vytvorí predvolené) |
| POST | `/` | JWT | — | Uloží nastavenia aktuálneho používateľa. Telo: ľubovoľné z `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, plus voliteľné `overrides: [{ categoryKey, channel, optedIn }]` (kanál môže byť `push`, `email`, `in_app` alebo `sms`; uzamknuté kategórie sa ignorujú). `allowSms` je súhlas člena s textovými pripomienkami. Staršie telo vo forme poľa riadkov sa stále akceptuje |

## Pripojenia

Základná cesta: `/messaging/connections`

Spravuje pripojenia WebSocket/v reálnom čase pre chat, skupinové konverzácie, súkromné správy a živé prenosy. Protokol od začiatku do konca nájdete v [Architektúra v reálnom čase](../../realtime).

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/:churchId/:conversationId` | Verejné | — | Načíta všetky pripojenia konverzácie |
| POST | `/` | Verejné | — | Zaregistruje pripojenia (dávkovo). Spustí vysielanie účasti pre konverzáciu. Položky tela: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Verejné | — | Aktualizuje zobrazované meno pripojenia podľa ID socketu. Telo: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Verejné | — | Odstráni pripojenie z konverzácie. Spustí vysielanie účasti |
| POST | `/tmpSendAlert` | Verejné | — | Odošle upozornenie na pripojenia osoby. Telo: `{ churchId, personId }` |

## Zariadenia

Základná cesta: `/messaging/devices`

Spravuje registráciu zariadení pre push oznámenia a párovanie obsahu (napr. aplikácia Lessons na TV displejoch).

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| POST | `/enroll` | JWT | — | Zaregistruje alebo aktualizuje zariadenie (registrácia mobilného push). Páruje podľa tokenu FCM alebo ID zariadenia |
| POST | `/enrollAnon` | Verejné | — | Zaregistruje anonymné zariadenie a vygeneruje 4-znakový párovací kód |
| POST | `/` | Verejné | — | Uloží zariadenia (dávkovo) |
| GET | `/pair/:pairingCode` | JWT | — | Spáruje zariadenie pomocou jeho párovacieho kódu. Voliteľné `?contentType=&contentId=` na priradenie obsahu |
| GET | `/status/:deviceId` | Verejné | — | Skontroluje stav párovania zariadenia |
| GET | `/:churchId` | JWT | — | Načíta všetky zariadenia cirkvi |
| GET | `/:churchId/person/:personId` | JWT | — | Načíta všetky zariadenia osoby |
| GET | `/:churchId/:id` | JWT | — | Načíta zariadenie podľa ID |
| DELETE | `/:churchId/:id` | JWT | — | Vymaže zariadenie |

### Príklad: Registrácia zariadenia

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

## Obsah zariadení

Základná cesta: `/messaging/devicecontents`

Spravuje priradenia obsahu pre spárované zariadenia (napr. ktorá lekcia sa zobrazuje na TV).

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/deviceId/:deviceId` | JWT | — | Načíta priradenia obsahu pre zariadenie |
| POST | `/` | JWT | — | Uloží priradenia obsahu zariadenia (dávkovo) |
| DELETE | `/:id` | JWT | — | Vymaže priradenie obsahu zariadenia |

## Textové správy

Základná cesta: `/messaging/texting`

Spravuje poskytovateľov SMS, skupinové textové správy a sledovanie doručenia.

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/providers` | JWT | — | Načíta poskytovateľov textových správ cirkvi (prihlasovacie údaje sú maskované) |
| GET | `/status` | JWT | — | `{ enabled }` — či má cirkev povoleného poskytovateľa textových správ. Ktorýkoľvek prihlásený používateľ cirkvi; používa sa na zobrazenie možností **Text** iba vtedy, keď je možné správy odoslať |
| GET | `/inboundUrl` | JWT | `texting.send` alebo `settings.edit` | `{ url }` — URL prichádzajúceho webhooku (STOP) cirkvi, ktorú treba vložiť do poskytovateľa |
| POST | `/inbound/:churchId/:token` | Verejné | — | Webhook prichádzajúcich správ od poskytovateľa. `token` je HMAC ID cirkvi. Odpoveď, ktorá je presne kľúčovým slovom odhlásenia (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), označí každú zodpovedajúcu osobu ako `optedOut` a vypne jej `allowSms`. Vracia `{ optedOut: <počet> }`; ostatné odpovede vracajú `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | Zobrazí náhľad príjemcov skupinovej správy (počty oprávnených, odhlásených a osôb bez telefónu) |
| GET | `/sent` | JWT | — | Načíta všetky záznamy odoslaných textových správ cirkvi |
| GET | `/sent/:id/details` | JWT | — | Načíta odoslanú textovú správu s protokolmi doručenia pre jednotlivých príjemcov |
| POST | `/providers` | JWT | — | Uloží poskytovateľov textových správ (dávkovo). Šifruje API prihlasovacie údaje |
| POST | `/send` | JWT | — | Odošle SMS všetkým oprávneným členom skupiny. Telo: `{ groupId, message }`. Polia na zlúčenie (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) sa vyhodnotia pre každého príjemcu |
| POST | `/sendPerson` | JWT | — | Odošle SMS jednej osobe. Telo: `{ personId, phoneNumber, message }`. Polia na zlúčenie sa vyhodnotia a zaznamená sa vyhodnotený text |
| DELETE | `/providers/:id` | JWT | — | Vymaže poskytovateľa textových správ |

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

Spravuje opakovane použiteľné šablóny e-mailov a odosielanie šablónových e-mailov skupinám.

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/` | JWT | — | Načíta všetky šablóny e-mailov cirkvi |
| GET | `/:id` | JWT | — | Načíta jednu šablónu e-mailu podľa ID |
| GET | `/sendStatus` | JWT | `groupMembers.edit` alebo `tasks.admin` | Stav e-mailov skupín cirkvi: `{ approved, paused, remaining, requested }`. Dialóg Odoslať e-mail v B1Admin a akcia pracovného postupu **Odoslať e-mail** ju používajú na upozornenie, keď e-mail neodíde |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | Požiada podporu o schválenie cirkvi pre e-maily skupín (najviac raz za týždeň pre cirkev) |
| GET | `/preview/:groupId` | JWT | — | Zobrazí náhľad doručenia e-mailov skupine (počet oprávnených príjemcov, členovia bez e-mailu) |
| POST | `/` | JWT | — | Vytvorí alebo aktualizuje šablóny e-mailov (dávkovo) |
| POST | `/send` | JWT | — | Odošle šablónový e-mail všetkým členom skupiny. Telo: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Vymaže šablónu e-mailu |

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

(zastarané) Blokovanie IP adries pre chat živých prenosov. Klient B1App už nevolá `POST /`, pretože blokovanie IP adries bolo odstránené pri migrácii na jednotné doručovanie. Trasu `/clear` stále volá na strane servera `StreamingServiceController`, keď sa ukladajú služby živého prenosu.

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| POST | `/` | JWT | — | (zastarané) Uloží blokované IP adresy (dávkovo). Žiadny aktívny klient |
| POST | `/clear` | JWT | — | Vymaže všetky blokované IP adresy pre konkrétne služby. Telo: `[{ serviceId, churchId }]` |

## Záznamy o doručení

Základná cesta: `/messaging/deliverylogs`

Sleduje stav doručenia odoslaných správ (SMS, push oznámenia, e-mail).

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/content/:contentType/:contentId` | JWT | — | Načíta záznamy o doručení podľa typu obsahu a ID |
| GET | `/person/:personId` | JWT | — | Načíta záznamy o doručení osoby. Voliteľné filtre `?startDate=&endDate=` |
| GET | `/recent` | JWT | — | Načíta posledné záznamy o doručení cirkvi. Voliteľné `?limit=` (predvolene 100) |
| GET | `/:id` | JWT | — | Načíta záznam o doručení podľa ID |

## Súvisiace stránky

- [Architektúra v reálnom čase](../../realtime) -- protokol WebSocket, odbery miestností a jednotný rámec doručovania
- [Push oznámenia pre web](../../web-push) -- registrácia a doručovanie push oznámení v prehliadači
- [Koncové body členstva](./membership) -- osoby, skupiny, roly a základná identita
- [Koncové body účasti](./attendance) -- sledovanie služieb a návštev
- [Autentifikácia a oprávnenia](./authentication) -- prihlasovací tok, JWT, OAuth, model oprávnení
- [Štruktúra modulu](../module-structure) -- vzory organizácie kódu
