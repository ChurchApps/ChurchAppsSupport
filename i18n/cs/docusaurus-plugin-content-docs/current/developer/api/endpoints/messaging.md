---
title: "Koncové body zpráv"
description: "Referenční přehled koncových bodů API zpráv ChurchApps: konverzace, pravidla přístupu k poznámkám, textové zprávy, e-mailové šablony, oznámení a zařízení."
---

# Koncové body zpráv

<div class="article-intro">

Modul Zprávy spravuje konverzace v reálném čase, chatové zprávy, push oznámení, doručování SMS a e-mailů, připojení WebSocket, soukromé zprávy, registraci zařízení a poskytovatele textových zpráv. Poskytuje komunikační vrstvu používanou napříč všemi aplikacemi ChurchApps, a to jak pro chat živého přenosu, tak pro asynchronní oznámení.

</div>

**Základní cesta:** `/messaging`

## Konverzace

Základní cesta: `/messaging/conversations`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/timeline/ids?ids=` | JWT | — | Načte konverzace podle ID oddělených čárkou spolu s první a poslední zprávou |
| GET | `/messages/:contentType/:contentId` | JWT | — | Načte konverzace k obsahu se stránkovanými zprávami (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Získá konverzace typu příspěvek pro skupiny aktuálního uživatele |
| GET | `/posts/group/:groupId` | JWT | — | Získá konverzace typu příspěvek pro konkrétní skupinu |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | Nejnovější poznámky ze všech záznamů pro stránku Poznámky v B1 Admin. `section` je `people`, `groups`, `events` nebo `workflows` (jinak 400); `limit` má výchozí hodnotu 25 (nejvýše 100); `before` je kurzor z předchozí stránky. Každá poznámka stále prochází pravidlem svého typu (oprávnění Osoby / Úpravy nebo důvěrné poznámky, vedoucí skupiny, prohlížeči událostí, prohlížeči karet pracovního postupu), takže volající vidí jen poznámky, které by mohl otevřít. Text poznámky je zkrácen na 300 znaků |
| GET | `/current/:churchId/:contentType/:contentId` | Veřejné | — | Získá nebo vytvoří aktuální konverzaci pro obsah (automaticky dešifruje contentId) |
| GET | `/:churchId/:contentType/:contentId` | Veřejné | — | Načte konverzace podle typu obsahu a ID |
| GET | `/:churchId/:id` | Veřejné | — | Načte jednu konverzaci podle ID |
| POST | `/` | JWT | — | Vytvoří nebo aktualizuje konverzace (dávkově) |
| POST | `/start` | JWT | — | Zahájí novou konverzaci s úvodním komentářem |
| DELETE | `/:churchId/:id` | JWT | — | Smaže konverzaci |

### Řízení přístupu k osobním poznámkám

Konverzace s `contentType: "person"` (karta Poznámky u záznamu osoby) nebo `contentType: "personConfidential"` (sekce Důvěrné poznámky) jsou omezeny na každé cestě čtení i zápisu, včetně výše uvedených veřejných tras, které pro tyto typy obsahu vracejí `401`. Typ `person` vyžaduje oprávnění MembershipApi **Osoby / Úpravy**; typ `personConfidential` vyžaduje oprávnění **Osoby / Zobrazit důvěrné poznámky**. U klíčů API s omezeným rozsahem přísluší oprávnění `people:write` obě akce (uživatel klíče musí stále mít příslušné oprávnění role).

### Řízení přístupu k poznámkám skupiny a události {#group-and-event-notes-access-control}

Dva další typy poznámek jsou omezeny stejným způsobem na každé cestě čtení i zápisu (včetně výše uvedených veřejných tras) a nikdy nejsou otevřené pro anonymní přidávání:

- **`groupNote`** (`contentId` = ID skupiny) -- kanál **Poznámky vedoucích** u skupiny. Čtení nebo přidávání mohou jen vedoucí této skupiny (`leaderGroupIds` v JWT). Žádné oprávnění pro zaměstnance nedává přístup, včetně `content.edit` a oprávnění členství ve skupině.
- **`eventNote`** (`contentId` = ID události) -- poznámky k události v kalendáři. Zaměstnanci s `content.edit` nebo **Kalendáře / Správce** mohou vždy číst a přidávat. Jinak přístup závisí na poli `notesViewRole` události (čtení) a `notesPostRole` (přidávání): `staff` (výchozí, použije se, když je pole `null`) nepovoluje nikomu jinému, `leaders` povoluje vedoucí skupiny události a `members` povoluje členy a vedoucí skupiny události. Událost bez `groupId` je přístupná jen zaměstnancům.

### Řízení přístupu k poznámkám karty pracovního postupu

Konverzace s `contentType: "workflowCard"` (poznámky na kartě pracovního postupu, kde `contentId` je ID úkolu karty) mohou číst a zapisovat jen ti, kdo mohou danou kartu otevřít: uživatel s oprávněním DoingApi **Úkoly / Zobrazit**, nebo osoba či skupina, které je karta přiřazena, kterou karta vytvořila nebo se jí týká. Všichni ostatní dostanou `401` na každé cestě čtení, včetně výše uvedených veřejných tras. Konverzace karty se připojí přes samotnou kartu pomocí `POST /doing/tasks/:id/conversation` (tělo `{ "conversationId": "..." }`; připojí se první konverzace), což mohou volat editoři karty a její přiřazený uživatel.

### Příklad: Zahájení konverzace

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

## Zprávy

Základní cesta: `/messaging/messages`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/conversation/:conversationId` | JWT | — | Načte všechny zprávy konverzace |
| GET | `/catchup/:churchId/:conversationId` | Veřejné | — | Načte všechny zprávy konverzace (veřejné dohnání pro živý chat) |
| GET | `/:churchId/:id` | Veřejné | — | Načte jednu zprávu podle ID |
| POST | `/` | JWT | — | Uloží zprávy (dávkově). Odesílá aktualizace v reálném čase a spouští oznámení. Úprava existující zprávy vyžaduje, aby uživatel byl její autor, nebo měl oprávnění `content.edit`; uložený autor se nikdy nedá přiřadit jinému |
| POST | `/send` | Veřejné | — | Odešle zprávy (dávkově, veřejně). Odesílá aktualizace v reálném čase přes WebSocket a spouští oznámení |
| POST | `/setCallout` | JWT | — | (zastaralé) Odešle výzvu v reálném čase. Žádný aktivní klient; chat živého přenosu výzvy již nezobrazuje |
| DELETE | `/:churchId/:id` | JWT | — | Smaže zprávu a v reálném čase rozešle informaci o smazání. Viz [Moderování zpráv](#message-moderation) |

### Moderování zpráv

Smazat zprávu mohou:

- autor zprávy;
- zaměstnanci s `content.edit` (v rámci celého sboru);
- **vedoucí skupin**, u konverzací s `contentType` `group` nebo `groupAnnouncement`, jejichž `contentId` je skupina, kterou vedou (`leaderGroupIds` v JWT).

Konverzace s poznámkami k osobě (`person` / `personConfidential`) nikdy nemoderují vedoucí -- používají oprávnění k poznámkám (`people.edit`, `people.viewConfidentialNotes`).

Vedoucí mohou zprávy pouze mazat, nikoli upravovat: přepisování zprávy jiného člena zůstává omezeno na autora a zaměstnance s `content.edit`.

### Příklad: Odeslání zprávy

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

## Soukromé zprávy

Základní cesta: `/messaging/privatemessages`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/` | JWT | — | Načte všechny soukromé zprávy aktuálního uživatele (včetně poslední zprávy každé konverzace a označí vše jako přečtené) |
| GET | `/existing/:personId` | JWT | — | Najde existující soukromou konverzaci s konkrétní osobou |
| GET | `/:id` | JWT | — | Načte soukromou zprávu podle ID (pokud je adresována aktuálnímu uživateli, vymaže oznámení) |
| POST | `/` | JWT | — | Odešle soukromé zprávy (dávkově). Spustí push oznámení příjemci |

## Oznámení

Základní cesta: `/messaging/notifications`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/unreadCount` | JWT | — | Získá počet nepřečtených oznámení aktuálního uživatele |
| GET | `/my` | JWT | — | Načte všechna oznámení aktuálního uživatele (označí je všechna jako přečtená) |
| GET | `/tmpEmail` | Veřejné | — | Spustí denní e-mailový souhrn oznámení (ladicí nebo cron koncový bod) |
| GET | `/:churchId/person/:personId` | JWT | — | Načte oznámení konkrétní osoby |
| GET | `/:churchId/:id` | JWT | — | Načte oznámení podle ID |
| POST | `/` | JWT | — | Vytvoří nebo aktualizuje oznámení (dávkově) |
| POST | `/create` | JWT | — | Vytvoří oznámení pro více osob. Tělo: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Označí všechna oznámení osoby jako přečtená |
| POST | `/sendTest` | JWT | — | Odešle zkušební push oznámení. Tělo: `{ personId, title }` |
| POST | `/ping` | Veřejné | — | Vytvoří oznámení z externího spouštěče. Tělo: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Smaže oznámení |

### Příklad: Vytvoření oznámení

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

## Předvolby oznámení

Základní cesta: `/messaging/notificationpreferences`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/categories` | JWT | — | Vypíše kategorie oznámení s jejich výchozími a povolenými kanály |
| GET | `/my` | JWT | — | Načte předvolby oznámení aktuálního uživatele (pokud žádné neexistují, automaticky vytvoří výchozí) |
| POST | `/` | JWT | — | Uloží předvolby aktuálního uživatele. Tělo: libovolné z `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, a volitelně `overrides: [{ categoryKey, channel, optedIn }]` (kanál může být `push`, `email`, `in_app` nebo `sms`; uzamčené kategorie se ignorují). `allowSms` je souhlas člena s textovými připomínkami. Stále je přijímáno i starší tělo ve formě pole řádků |

## Připojení

Základní cesta: `/messaging/connections`

Spravuje připojení WebSocket a připojení v reálném čase pro chat, skupinové konverzace, soukromé zprávy a živé přenosy. Kompletní protokol najdete v části [Architektura v reálném čase](../../realtime.md).

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/:churchId/:conversationId` | Veřejné | — | Načte všechna připojení ke konverzaci |
| POST | `/` | Veřejné | — | Zaregistruje připojení (dávkově). Spustí vysílání účasti ke konverzaci. Položky těla: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Veřejné | — | Aktualizuje zobrazované jméno připojení podle ID socketu. Tělo: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Veřejné | — | Odpojí připojení od konverzace. Spustí vysílání účasti |
| POST | `/tmpSendAlert` | Veřejné | — | Odešle upozornění na připojení osoby. Tělo: `{ churchId, personId }` |

## Zařízení

Základní cesta: `/messaging/devices`

Spravuje registraci zařízení pro push oznámení a párování obsahu (např. aplikace Lessons na televizních displejích).

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| POST | `/enroll` | JWT | — | Zaregistruje nebo aktualizuje zařízení (registrace mobilních push). Shoduje se podle tokenu FCM nebo ID zařízení |
| POST | `/enrollAnon` | Veřejné | — | Zaregistruje anonymní zařízení a vygeneruje párovací kód o 4 znacích |
| POST | `/` | Veřejné | — | Uloží zařízení (dávkově) |
| GET | `/pair/:pairingCode` | JWT | — | Spáruje zařízení pomocí jeho párovacího kódu. Volitelné `?contentType=&contentId=` k přiřazení obsahu |
| GET | `/status/:deviceId` | Veřejné | — | Zkontroluje stav párování zařízení |
| GET | `/:churchId` | JWT | — | Načte všechna zařízení sboru |
| GET | `/:churchId/person/:personId` | JWT | — | Načte všechna zařízení osoby |
| GET | `/:churchId/:id` | JWT | — | Načte zařízení podle ID |
| DELETE | `/:churchId/:id` | JWT | — | Smaže zařízení |

### Příklad: Registrace zařízení

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

## Obsah zařízení

Základní cesta: `/messaging/devicecontents`

Spravuje přiřazení obsahu spárovaným zařízením (např. která lekce se zobrazuje na televizi).

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/deviceId/:deviceId` | JWT | — | Načte přiřazení obsahu zařízení |
| POST | `/` | JWT | — | Uloží přiřazení obsahu zařízení (dávkově) |
| DELETE | `/:id` | JWT | — | Smaže přiřazení obsahu zařízení |

## Textové zprávy

Základní cesta: `/messaging/texting`

Spravuje poskytovatele SMS, skupinové textové zprávy a sledování doručení.

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/providers` | JWT | — | Načte poskytovatele textových zpráv sboru (přihlašovací údaje jsou maskované) |
| GET | `/status` | JWT | — | `{ enabled }` -- zda má sbor povoleného poskytovatele textových zpráv. Libovolný přihlášený uživatel sboru; slouží k zobrazení možností **Text** jen tehdy, když lze texty odeslat |
| GET | `/inboundUrl` | JWT | `texting.send` nebo `settings.edit` | `{ url }` -- příchozí webhook (STOP) sboru, který se vloží do poskytovatele |
| POST | `/inbound/:churchId/:token` | Veřejné | — | Webhook příchozích zpráv poskytovatele. `token` je HMAC ID sboru. Odpověď, která je přesně slovem pro odhlášení (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), označí každou odpovídající osobu jako `optedOut` a vypne její `allowSms`. Vrací `{ optedOut: <count> }`; ostatní odpovědi vracejí `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | Náhled příjemců skupinové zprávy (počty způsobilých, odhlášených a osob bez telefonu) |
| GET | `/sent` | JWT | — | Načte všechny záznamy odeslaných textových zpráv sboru |
| GET | `/sent/:id/details` | JWT | — | Načte odeslanou textovou zprávu s protokoly doručení pro jednotlivé příjemce |
| POST | `/providers` | JWT | — | Uloží poskytovatele textových zpráv (dávkově). Šifruje přihlašovací údaje API |
| POST | `/send` | JWT | — | Odešle SMS všem způsobilým členům skupiny. Tělo: `{ groupId, message }`. Slučovací pole (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) se vyhodnocují pro každého příjemce zvlášť |
| POST | `/sendPerson` | JWT | — | Odešle SMS jedné osobě. Tělo: `{ personId, phoneNumber, message }`. Slučovací pole se vyhodnotí a zaznamená se vyhodnocený text |
| DELETE | `/providers/:id` | JWT | — | Smaže poskytovatele textových zpráv |

### Příklad: Odeslání skupinové textové zprávy

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

## Šablony e-mailů

Základní cesta: `/messaging/emailTemplates`

Spravuje opakovaně použitelné e-mailové šablony a odesílání šablonovaných e-mailů skupinám.

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/` | JWT | — | Načte všechny e-mailové šablony sboru |
| GET | `/:id` | JWT | — | Načte jednu e-mailovou šablonu podle ID |
| GET | `/sendStatus` | JWT | `groupMembers.edit` nebo `tasks.admin` | Stav e-mailu skupin sboru: `{ approved, paused, remaining, requested }`. Dialog Odeslat e-mail v B1Admin a akce **Odeslat e-mail** pracovního postupu ji používají k varování, když e-mail nebude odeslán |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | Požádá podporu o schválení sboru pro e-maily skupinám (nejvýše jednou za týden u každého sboru) |
| GET | `/preview/:groupId` | JWT | — | Náhled doručení e-mailu skupině (počet způsobilých příjemců, členové bez e-mailu) |
| POST | `/` | JWT | — | Vytvoří nebo aktualizuje e-mailové šablony (dávkově) |
| POST | `/send` | JWT | — | Odešle šablonovaný e-mail všem členům skupiny. Tělo: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Smaže e-mailovou šablonu |

### Příklad: Odeslání e-mailu skupině

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

**Podporovaná slučovací pole:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## Blokované IP adresy

Základní cesta: `/messaging/blockedips`

(zastaralé) Blokování IP adres pro chat živého přenosu. Klient B1App již nevolá `POST /` -- blokování IP bylo odstraněno při migraci na sjednocené doručování. Trasu `/clear` stále volá server-to-server `StreamingServiceController`, když se ukládají streamovací služby.

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

- [Architektura v reálném čase](../../realtime.md) -- protokol WebSocket, odběr místností a sjednocený rámec doručování
- [Push oznámení pro web](../../web-push.md) -- registrace a doručování push oznámení v prohlížeči
- [Koncové body členství](./membership.md) -- osoby, skupiny, role a základní identita
- [Koncové body docházky](./attendance.md) -- sledování bohoslužeb a návštěv
- [Autentizace a oprávnění](./authentication.md) -- přihlašovací tok, JWT, OAuth, model oprávnění
- [Struktura modulu](../module-structure.md) -- vzory organizace kódu
