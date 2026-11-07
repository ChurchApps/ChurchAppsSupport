---
title: "Koncové body zpráv"
description: "Referenční přehled endpointů messaging API ChurchApps: konverzace, pravidla přístupu k poznámkám, SMS, šablony e-mailů, oznámení a zařízení."
---

# Koncové body zpráv

<div class="article-intro">

Modul Zprávy spravuje konverzace v reálném čase, chatové zprávy, push oznámení, doručování SMS a e-mailů, připojení WebSocket, soukromé zprávy, registraci zařízení a poskytovatele textových zpráv. Poskytuje komunikační vrstvu používanou ve všech aplikacích ChurchApps, a to jak pro živý chat při streamování, tak pro asynchronní oznámení.

</div>

**Základní cesta:** `/messaging`

## Konverzace

Základní cesta: `/messaging/conversations`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/timeline/ids?ids=` | JWT | — | Načte konverzace podle ID oddělených čárkou, včetně první a poslední zprávy |
| GET | `/messages/:contentType/:contentId` | JWT | — | Načte konverzace k obsahu se stránkovanými zprávami (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Získá konverzace typu příspěvek pro skupiny aktuálního uživatele |
| GET | `/posts/group/:groupId` | JWT | — | Získá konverzace typu příspěvek pro konkrétní skupinu |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | Nejnovější poznámky ze všech záznamů pro stránku Poznámky v B1 Admin. `section` je `people`, `groups`, `events` nebo `workflows` (jinak chyba 400); `limit` má výchozí hodnotu 25 (maximum 100); `before` je kurzor z předchozí stránky. Každá poznámka stále prochází pravidlem svého typu (oprávnění Úprava osob / důvěrné poznámky, vedoucí skupiny, zobrazovatelé událostí, zobrazovatelé karet pracovních postupů), takže volající vidí jen poznámky, které by mohl otevřít. Text poznámky je zkrácen na 300 znaků |
| GET | `/current/:churchId/:contentType/:contentId` | Veřejný | — | Získá nebo vytvoří aktuální konverzaci k obsahu (automaticky dešifruje contentId) |
| GET | `/:churchId/:contentType/:contentId` | Veřejný | — | Načte konverzace podle typu obsahu a ID |
| GET | `/:churchId/:id` | Veřejný | — | Načte jednu konverzaci podle ID |
| POST | `/` | JWT | — | Vytvoří nebo aktualizuje konverzace (dávkově) |
| POST | `/start` | JWT | — | Zahájí novou konverzaci s úvodním komentářem |
| DELETE | `/:churchId/:id` | JWT | — | Smaže konverzaci |

### Řízení přístupu k poznámkám osob

Konverzace s `contentType: "person"` (karta Poznámky na záznamu osoby) nebo `contentType: "personConfidential"` (sekce Důvěrné poznámky) jsou chráněny při každém čtení i zápisu, včetně výše uvedených veřejných cest, které pro tyto typy obsahu vracejí `401`. Pro `person` je vyžadováno oprávnění MembershipApi **Osoby / Úprava**, pro `personConfidential` oprávnění **Osoby / Zobrazit důvěrné poznámky**. U klíčů API s omezeným rozsahem pokrývá `people:write` obě akce (uživatel klíče musí stále mít příslušné oprávnění role).

### Řízení přístupu k poznámkám skupin a událostí {#group-and-event-notes-access-control}

Dva další typy poznámek jsou chráněny stejným způsobem při každém čtení i zápisu (včetně výše uvedených veřejných cest) a nikdy nejsou otevřené pro anonymní přidávání:

- **`groupNote`** (`contentId` = ID skupiny) -- kanál **Poznámky vedoucích** u skupiny. Čtení nebo přidávání mohou jen vedoucí dané skupiny (`leaderGroupIds` v JWT). Žádné oprávnění pro zaměstnance to neumožňuje, včetně `content.edit` a oprávnění založených na členství ve skupině.
- **`eventNote`** (`contentId` = ID události) -- poznámky u události v kalendáři. Zaměstnanci s `content.edit` nebo oprávněním **Kalendáře / Správce** mohou vždy číst i přidávat. Jinak přístup určují pole události `notesViewRole` (čtení) a `notesPostRole` (přidávání): `staff` (výchozí, použitá když je pole `null`) nepovoluje nikomu jinému, `leaders` povoluje vedoucím skupiny události a `members` povoluje členům i vedoucím skupiny události. Událost bez `groupId` je dostupná jen zaměstnancům.

### Řízení přístupu k poznámkám karet pracovních postupů

Konverzace s `contentType: "workflowCard"` (poznámky na kartě pracovního postupu, kde `contentId` je ID úkolu karty) mohou číst a zapisovat jen ti, kdo může kartu otevřít: uživatel s oprávněním DoingApi **Úkoly / Zobrazit**, nebo osoba či skupina, které je karta přiřazena, kterou ji vytvořila nebo se jí týká. Všichni ostatní dostanou `401` při každém čtení, včetně výše uvedených veřejných cest. Konverzace karty se připojuje přes samotnou kartu pomocí `POST /doing/tasks/:id/conversation` (tělo `{ "conversationId": "..." }`; připojí se první konverzace), což mohou volat editoři karty a její přiřazená osoba.

### Příklad: Zahájení konverzace

```
POST /messaging/conversations/start
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "contentType": "group",
  "contentId": "group-123",
  "title": "Týdenní diskuse",
  "comment": "Vítejte v tomto týdenním diskusním vlákně!"
}
```

```json
{
  "id": "conv-456",
  "churchId": "church-789",
  "contentType": "group",
  "contentId": "group-123",
  "title": "Týdenní diskuse",
  "dateCreated": "2026-02-17T10:00:00.000Z",
  "visibility": "public",
  "allowAnonymousPosts": false,
  "groupId": "group-123"
}
```

## Zprávy

Základní cesta: `/messaging/messages`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/conversation/:conversationId` | JWT | — | Načte všechny zprávy konverzace |
| GET | `/catchup/:churchId/:conversationId` | Veřejný | — | Načte všechny zprávy konverzace (veřejné doplnění pro živý chat) |
| GET | `/:churchId/:id` | Veřejný | — | Načte jednu zprávu podle ID |
| POST | `/` | JWT | — | Uloží zprávy (dávkově). Odesílá aktualizace v reálném čase a spouští oznámení. Úprava existující zprávy vyžaduje, aby uživatel byl jejím autorem nebo měl `content.edit`; uložený autor se nikdy nedá přiřadit jinému |
| POST | `/send` | Veřejný | — | Odešle zprávy (dávkově, veřejně). Odesílá aktualizace v reálném čase přes WebSocket a spouští oznámení |
| POST | `/setCallout` | JWT | — | (zastaralé) Vysílá zvýrazněnou zprávu v reálném čase. Žádný aktivní klient; chat živého přenosu již zvýrazněné zprávy nezobrazuje |
| DELETE | `/:churchId/:id` | JWT | — | Smaže zprávu a v reálném čase rozešle informaci o smazání. Viz [Moderování zpráv](#message-moderation) |

### Moderování zpráv

Smazat zprávu mohou:

- autor zprávy;
- zaměstnanci s `content.edit` (v celém sboru);
- **vedoucí skupin** u konverzací s `contentType` `group` nebo `groupAnnouncement`, pokud je `contentId` skupina, kterou vedou (`leaderGroupIds` v JWT).

Konverzace typu poznámka k osobě (`person` / `personConfidential`) nemoderují vedoucí skupin -- používají místo toho oprávnění k poznámkám (`people.edit`, `people.viewConfidentialNotes`).

Vedoucí mohou zprávu pouze smazat, nikoli upravit: přepisovat zprávu jiného člena zůstává omezeno na autora a zaměstnance s `content.edit`.

### Příklad: Odeslání zprávy

```
POST /messaging/messages/send

[
  {
    "churchId": "church-789",
    "conversationId": "conv-456",
    "personId": "person-123",
    "displayName": "Jan Novák",
    "content": "Ahoj všem!",
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
    "displayName": "Jan Novák",
    "timeSent": "2026-02-17T10:05:00.000Z",
    "content": "Ahoj všem!",
    "messageType": "comment"
  }
]
```

## Soukromé zprávy

Základní cesta: `/messaging/privatemessages`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/` | JWT | — | Načte všechny soukromé zprávy aktuálního uživatele (včetně poslední zprávy v každé konverzaci, všechny označí jako přečtené) |
| GET | `/existing/:personId` | JWT | — | Najde existující soukromou konverzaci s konkrétní osobou |
| GET | `/:id` | JWT | — | Načte soukromou zprávu podle ID (pokud je adresována aktuálnímu uživateli, vymaže oznámení) |
| POST | `/` | JWT | — | Odešle soukromé zprávy (dávkově). Spustí push oznámení příjemci |

## Oznámení

Základní cesta: `/messaging/notifications`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/unreadCount` | JWT | — | Získá počet nepřečtených oznámení aktuálního uživatele |
| GET | `/my` | JWT | — | Načte všechna oznámení aktuálního uživatele (všechna označí jako přečtená) |
| GET | `/tmpEmail` | Veřejný | — | Spustí denní e-mailový souhrn oznámení (ladicí nebo cron koncový bod) |
| GET | `/:churchId/person/:personId` | JWT | — | Načte oznámení pro konkrétní osobu |
| GET | `/:churchId/:id` | JWT | — | Načte oznámení podle ID |
| POST | `/` | JWT | — | Vytvoří nebo aktualizuje oznámení (dávkově) |
| POST | `/create` | JWT | — | Vytvoří oznámení pro více osob. Tělo: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Označí všechna oznámení osoby jako přečtená |
| POST | `/sendTest` | JWT | — | Odešle zkušební push oznámení. Tělo: `{ personId, title }` |
| POST | `/ping` | Veřejný | — | Vytvoří oznámení z externího spouštěče. Tělo: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Smaže oznámení |

### Příklad: Vytvoření oznámení

```
POST /messaging/notifications/create
Authorization: Bearer <token>

{
  "peopleIds": ["person-123", "person-456"],
  "contentType": "group",
  "contentId": "group-789",
  "message": "Ve vaší skupině byla přidána nová událost",
  "link": "/groups/group-789"
}
```

## Předvolby oznámení

Základní cesta: `/messaging/notificationpreferences`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/categories` | JWT | — | Vypíše kategorie oznámení s jejich výchozími a povolenými kanály |
| GET | `/my` | JWT | — | Načte předvolby oznámení aktuálního uživatele (pokud žádné neexistují, automaticky vytvoří výchozí) |
| POST | `/` | JWT | — | Uloží předvolby aktuálního uživatele. Tělo: libovolné z `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, plus volitelné `overrides: [{ categoryKey, channel, optedIn }]` (kanál může být `push`, `email`, `in_app` nebo `sms`; uzamčené kategorie se ignorují). `allowSms` je souhlas člena s textovými připomenutími. Starší tělo ve formě pole řádků je stále přijímáno |

## Připojení

Základní cesta: `/messaging/connections`

Spravuje připojení WebSocket/v reálném čase pro chat, skupinové konverzace, soukromé zprávy a živé přenosy. Celý průběh protokolu je popsán v [Architektuře v reálném čase](../../realtime.md).

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/:churchId/:conversationId` | Veřejný | — | Načte všechna připojení ke konverzaci |
| POST | `/` | Veřejný | — | Zaregistruje připojení (dávkově). Spustí vysílání údaje o účasti v konverzaci. Položky těla: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Veřejný | — | Aktualizuje zobrazované jméno připojení podle ID socketu. Tělo: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Veřejný | — | Odstraní připojení z konverzace. Spustí vysílání údaje o účasti |
| POST | `/tmpSendAlert` | Veřejný | — | Odešle upozornění osobě všem jejím připojením. Tělo: `{ churchId, personId }` |

## Zařízení

Základní cesta: `/messaging/devices`

Spravuje registraci zařízení pro push oznámení a párování obsahu (např. aplikace Lessons na televizních displejích).

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| POST | `/enroll` | JWT | — | Zaregistruje nebo aktualizuje zařízení (registrace push v mobilní aplikaci). Shodu hledá podle tokenu FCM nebo ID zařízení |
| POST | `/enrollAnon` | Veřejný | — | Zaregistruje anonymní zařízení a vygeneruje čtyřmístný párovací kód |
| POST | `/` | Veřejný | — | Uloží zařízení (dávkově) |
| GET | `/pair/:pairingCode` | JWT | — | Spáruje zařízení pomocí jeho párovacího kódu. Volitelné `?contentType=&contentId=` pro přiřazení obsahu |
| GET | `/status/:deviceId` | Veřejný | — | Ověří stav párování zařízení |
| GET | `/:churchId` | JWT | — | Načte všechna zařízení sboru |
| GET | `/:churchId/person/:personId` | JWT | — | Načte všechna zařízení osoby |
| GET | `/:churchId/:id` | JWT | — | Načte zařízení podle ID |
| DELETE | `/:churchId/:id` | JWT | — | Smaže zařízení |

### Příklad: Zaregistrování zařízení

```
POST /messaging/devices/enroll
Authorization: Bearer <token>

{
  "fcmToken": "firebase-token-abc123",
  "appName": "B1Mobile",
  "label": "iPhone Jana",
  "deviceInfo": "iOS 17, iPhone 15"
}
```

```json
{
  "id": "device-001",
  "churchId": "church-789",
  "fcmToken": "firebase-token-abc123",
  "appName": "B1Mobile",
  "label": "iPhone Jana",
  "registrationDate": "2026-02-17T10:00:00.000Z",
  "lastActiveDate": "2026-02-17T10:00:00.000Z"
}
```

## Obsah zařízení

Základní cesta: `/messaging/devicecontents`

Spravuje přiřazení obsahu spárovaným zařízením (např. která lekce se zobrazuje na televizi).

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/deviceId/:deviceId` | JWT | — | Načte přiřazení obsahu pro zařízení |
| POST | `/` | JWT | — | Uloží přiřazení obsahu zařízení (dávkově) |
| DELETE | `/:id` | JWT | — | Smaže přiřazení obsahu zařízení |

## Textové zprávy

Základní cesta: `/messaging/texting`

Spravuje poskytovatele SMS, skupinové textové zprávy a sledování doručení.

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/providers` | JWT | — | Načte poskytovatele textových zpráv pro sbor (přihlašovací údaje jsou maskovány) |
| GET | `/status` | JWT | — | `{ enabled }` -- zda má sbor zapnutého poskytovatele textových zpráv. Dostupné pro každého přihlášeného uživatele sboru; používá se k zobrazení možností **Text** pouze tehdy, když lze zprávy odeslat |
| GET | `/inboundUrl` | JWT | `texting.send` nebo `settings.edit` | `{ url }` -- URL příchozího webhooku (STOP) sboru, které se vloží do poskytovatele |
| POST | `/inbound/:churchId/:token` | Veřejný | — | Webhook pro příchozí zprávy od poskytovatele. `token` je HMAC ID sboru. Odpověď, která je přesně slovem pro odhlášení (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), označí každou odpovídající osobu jako `optedOut` a vypne jí `allowSms`. Vrací `{ optedOut: <count> }`; ostatní odpovědi vracejí `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | Náhled příjemců skupinové textové zprávy (počty způsobilých, odhlášených a osob bez telefonu) |
| GET | `/sent` | JWT | — | Načte všechny záznamy odeslaných textových zpráv sboru |
| GET | `/sent/:id/details` | JWT | — | Načte odeslanou textovou zprávu s protokolem doručení pro každého příjemce |
| POST | `/providers` | JWT | — | Uloží poskytovatele textových zpráv (dávkově). Šifruje přihlašovací údaje API |
| POST | `/send` | JWT | — | Odešle SMS všem způsobilým členům skupiny. Tělo: `{ groupId, message }`. Slučovací pole (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) se vyplní pro každého příjemce zvlášť |
| POST | `/sendPerson` | JWT | — | Odešle SMS jedné osobě. Tělo: `{ personId, phoneNumber, message }`. Slučovací pole se vyplní a do protokolu se zapisuje vyplněný text |
| DELETE | `/providers/:id` | JWT | — | Smaže poskytovatele textových zpráv |

### Příklad: Odeslání skupinové textové zprávy

```
POST /messaging/texting/send
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "message": "Připomenutí: Bohoslužba začíná tuto neděli v 10 hodin!"
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

## Šablony e-mailů

Základní cesta: `/messaging/emailTemplates`

Spravuje opakovaně použitelné šablony e-mailů a odesílání e-mailů ze šablon skupinám.

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/` | JWT | — | Načte všechny šablony e-mailů sboru |
| GET | `/:id` | JWT | — | Načte jednu šablonu e-mailu podle ID |
| GET | `/sendStatus` | JWT | `groupMembers.edit` nebo `tasks.admin` | Stav e-mailů skupin sboru: `{ approved, paused, remaining, requested }`. Dialog Odeslat e-mail v B1Admin a akce pracovního postupu **Odeslat e-mail** ji používají k upozornění, když e-mail nebude odeslán |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | Požádá podporu o schválení sboru pro e-maily skupinám (nejvýše jednou za týden u každého sboru) |
| GET | `/preview/:groupId` | JWT | — | Náhled doručení e-mailu skupině (počet způsobilých příjemců, členové bez e-mailu) |
| POST | `/` | JWT | — | Vytvoří nebo aktualizuje šablony e-mailů (dávkově) |
| POST | `/send` | JWT | — | Odešle e-mail ze šablony všem členům skupiny. Tělo: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Smaže šablonu e-mailu |

### Příklad: Odeslání e-mailu skupině

```
POST /messaging/emailTemplates/send
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "subject": "Týdenní přehled -- {{churchName}}",
  "htmlContent": "<p>Dobrý den, {{firstName}},</p><p>Zde je přehled toho, co se tento týden děje...</p>"
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

**Podporovaná slučovací pole:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## Blokované IP adresy

Základní cesta: `/messaging/blockedips`

(zastaralé) Blokování IP adres pro chat živého přenosu. Klient B1App již nevolá `POST /` -- blokování IP bylo odstraněno při migraci na jednotné doručování. Trasa `/clear` je stále volána mezi servery z `StreamingServiceController` při ukládání služeb přenosu.

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| POST | `/` | JWT | — | (zastaralé) Uloží blokované IP adresy (dávkově). Žádný aktivní klient |
| POST | `/clear` | JWT | — | Vymaže všechny blokované IP adresy pro konkrétní služby. Tělo: `[{ serviceId, churchId }]` |

## Protokoly doručení

Základní cesta: `/messaging/deliverylogs`

Sleduje stav doručení odeslaných zpráv (SMS, push oznámení, e-mail).

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/content/:contentType/:contentId` | JWT | — | Načte protokoly doručení podle typu obsahu a ID |
| GET | `/person/:personId` | JWT | — | Načte protokoly doručení osoby. Volitelné filtry `?startDate=&endDate=` |
| GET | `/recent` | JWT | — | Načte nedávné protokoly doručení sboru. Volitelné `?limit=` (výchozí 100) |
| GET | `/:id` | JWT | — | Načte protokol doručení podle ID |

## Související stránky

- [Architektura v reálném čase](../../realtime.md) -- protokol WebSocket, odběr místností a jednotný rámec doručování
- [Webová push oznámení](../../web-push.md) -- registrace a doručování push oznámení v prohlížeči
- [Koncové body členství](./membership.md) -- osoby, skupiny, role a základní identita
- [Koncové body docházky](./attendance.md) -- sledování bohoslužeb a návštěv
- [Ověřování a oprávnění](./authentication.md) -- přihlašovací tok, JWT, OAuth, model oprávnění
- [Struktura modulu](../module-structure.md) -- vzory organizace kódu
