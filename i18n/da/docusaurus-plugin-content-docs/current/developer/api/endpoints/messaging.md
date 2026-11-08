---
title: "Endpoints for meddelelser"
description: "Referencе for ChurchApps' API-endpoints til meddelelser: samtaler, adgangsregler for noter, sms, e-mailskabeloner, notifikationer og enheder."
---

# Endpoints for meddelelser

<div class="article-intro">

Modulet Meddelelser håndterer realtidssamtaler, chatbeskeder, push-notifikationer, levering af sms og e-mail, WebSocket-forbindelser, private beskeder, registrering af enheder og sms-udbydere. Det leverer kommunikationslaget, som bruges på tværs af alle ChurchApps-applikationer, både til chat i live-streaming og til asynkrone notifikationer.

</div>

**Basissti:** `/messaging`

## Samtaler

Basissti: `/messaging/conversations`

| Metode | Sti | Godkendelse | Tilladelse | Beskrivelse |
|--------|-----|-------------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Indlæs samtaler efter kommaseparerede ID'er med første og seneste besked |
| GET | `/messages/:contentType/:contentId` | JWT | — | Indlæs samtaler for indhold med beskeder opdelt i sider (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Hent samtaler af typen opslag for den aktuelle brugers grupper |
| GET | `/posts/group/:groupId` | JWT | — | Hent samtaler af typen opslag for en bestemt gruppe |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | De nyeste noter på tværs af alle poster til siden Noter i B1 Admin. `section` er `people`, `groups`, `events` eller `workflows` (ellers 400). `limit` har standardværdien 25 (maks. 100). `before` er markøren fra den forrige side. Hver note skal stadig opfylde reglen for sin egen type (tilladelsen People Edit / fortrolige noter, gruppeledere, begivenhedsseere, seere af workflow-kort), så kaldere kun ser noter, de ville kunne åbne. Notetekst afkortes til 300 tegn |
| GET | `/current/:churchId/:contentType/:contentId` | Offentlig | — | Hent eller opret den aktuelle samtale for indhold (dekrypterer contentId automatisk) |
| GET | `/:churchId/:contentType/:contentId` | Offentlig | — | Indlæs samtaler efter indholdstype og ID |
| GET | `/:churchId/:id` | Offentlig | — | Indlæs en enkelt samtale efter ID |
| POST | `/` | JWT | — | Opret eller opdater samtaler (batch) |
| POST | `/start` | JWT | — | Start en ny samtale med en indledende kommentar |
| DELETE | `/:churchId/:id` | JWT | — | Slet en samtale |

### Adgangskontrol for personnoter

Samtaler med `contentType: "person"` (fanen Noter på en persons profil) eller `contentType: "personConfidential"` (sektionen Fortrolige noter) er låst på alle læse- og skrivestier, herunder de offentlige ruter ovenfor, som returnerer `401` for disse indholdstyper. `person` kræver tilladelsen **People / Edit** i MembershipApi, og `personConfidential` kræver **People / View Confidential Notes**. For scopede API-nøgler dækker `people:write` begge handlinger (nøglens bruger skal dog stadig have den underliggende rolletilladelse).

### Adgangskontrol for gruppe- og begivenhedsnoter {#group-and-event-notes-access-control}

To andre notetyper er låst på samme måde, på alle læse- og skrivestier (herunder de offentlige ruter ovenfor), og de kan aldrig opslås anonymt:

- **`groupNote`** (`contentId` = gruppe-ID) -- feedet **Lederens noter** på en gruppe. Kun gruppens ledere (`leaderGroupIds` i JWT'en) kan læse eller skrive. Ingen medarbejdertilladelse giver adgang, heller ikke `content.edit` og gruppemedlemstilladelserne.
- **`eventNote`** (`contentId` = begivenheds-ID) -- noterne på en kalenderbegivenhed. Medarbejdere med `content.edit` eller **Calendars / Admin** kan altid læse og skrive. Ellers følger adgangen begivenhedens `notesViewRole` (læsning) og `notesPostRole` (skrivning): `staff` (standard, når feltet er `null`) giver ingen andre adgang, `leaders` giver adgang til ledere af begivenhedens gruppe, og `members` giver adgang til medlemmer og ledere af begivenhedens gruppe. En begivenhed uden `groupId` er kun for medarbejdere.

### Adgangskontrol for noter på workflow-kort

Samtaler med `contentType: "workflowCard"` (noterne på et workflow-kort, hvor `contentId` er kortets opgave-ID) kan kun læses og skrives af den, der kan åbne kortet: en bruger med tilladelsen DoingApi **Tasks / View**, eller personen eller gruppen, kortet er tildelt, oprettet af eller handler om. Alle andre får `401` på alle læsestier, herunder de offentlige ruter ovenfor. Et kortes samtale knyttes til selve kortet med `POST /doing/tasks/:id/conversation` (body `{ "conversationId": "..." }`; den første samtale, der knyttes, vinder). Kaldet kan foretages af kortets redaktører og den person, kortet er tildelt.

### Eksempel: Start en samtale

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

## Beskeder

Basissti: `/messaging/messages`

| Metode | Sti | Godkendelse | Tilladelse | Beskrivelse |
|--------|-----|-------------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Indlæs alle beskeder i en samtale |
| GET | `/catchup/:churchId/:conversationId` | Offentlig | — | Indlæs alle beskeder i en samtale (offentlig catchup til live chat) |
| GET | `/:churchId/:id` | Offentlig | — | Indlæs en enkelt besked efter ID |
| POST | `/` | JWT | — | Gem beskeder (batch). Sender realtidsopdateringer og udløser notifikationer. Opdatering af en eksisterende besked kræver, at man er dens forfatter eller har `content.edit`; den gemte forfatter kan aldrig ændres |
| POST | `/send` | Offentlig | — | Send beskeder (batch, offentlig). Sender realtidsopdateringer via WebSocket og udløser notifikationer |
| POST | `/setCallout` | JWT | — | (forældet) Udsender en callout-besked i realtid. Ingen aktiv klient; chat i live-streaming viser ikke længere callouts |
| DELETE | `/:churchId/:id` | JWT | — | Slet en besked og udsend sletningen i realtid. Se [Moderering af beskeder](#message-moderation) |

### Moderering af beskeder

Det er tilladt at slette en besked for:

- beskedens forfatter
- medarbejdere med `content.edit` (overalt i kirken)
- **gruppeledere** for samtaler med `contentType` `group` eller `groupAnnouncement`, hvor `contentId` er en gruppe, de leder (`leaderGroupIds` i JWT'en)

Samtaler om personnoter (`person` / `personConfidential`) modereres aldrig af ledere. De bruger i stedet tilladelserne for noter (`people.edit`, `people.viewConfidentialNotes`).

Ledere kan kun slette, ikke redigere. At omskrive et andet medlems besked er fortsat begrænset til forfatteren og medarbejdere med `content.edit`.

### Eksempel: Send en besked

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

## Private beskeder

Basissti: `/messaging/privatemessages`

| Metode | Sti | Godkendelse | Tilladelse | Beskrivelse |
|--------|-----|-------------|------------|-------------|
| GET | `/` | JWT | — | Indlæs alle private beskeder for den aktuelle bruger (inkluderer sidste besked pr. samtale og markerer alle som læst) |
| GET | `/existing/:personId` | JWT | — | Find en eksisterende privat samtale med en bestemt person |
| GET | `/:id` | JWT | — | Indlæs en privat besked efter ID (fjerner notifikationen, hvis beskeden er rettet til den aktuelle bruger) |
| POST | `/` | JWT | — | Send private beskeder (batch). Udløser push-notifikation til modtageren |

## Notifikationer

Basissti: `/messaging/notifications`

| Metode | Sti | Godkendelse | Tilladelse | Beskrivelse |
|--------|-----|-------------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Hent antal ulæste notifikationer for den aktuelle bruger |
| GET | `/my` | JWT | — | Indlæs alle notifikationer for den aktuelle bruger (markerer alle som læst) |
| GET | `/tmpEmail` | Offentlig | — | Udløser det daglige e-mailoversigt over notifikationer (debug/cron-endpoint) |
| GET | `/:churchId/person/:personId` | JWT | — | Indlæs notifikationer for en bestemt person |
| GET | `/:churchId/:id` | JWT | — | Indlæs en notifikation efter ID |
| POST | `/` | JWT | — | Opret eller opdater notifikationer (batch) |
| POST | `/create` | JWT | — | Opret notifikationer for flere personer. Body: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Markér alle notifikationer som læst for en person |
| POST | `/sendTest` | JWT | — | Send en test-push-notifikation. Body: `{ personId, title }` |
| POST | `/ping` | Offentlig | — | Opret en notifikation fra en ekstern udløser. Body: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Slet en notifikation |

### Eksempel: Opret notifikationer

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

## Præferencer for notifikationer

Basissti: `/messaging/notificationpreferences`

| Metode | Sti | Godkendelse | Tilladelse | Beskrivelse |
|--------|-----|-------------|------------|-------------|
| GET | `/categories` | JWT | — | Vis kategorier af notifikationer med deres standardkanaler og tilladte kanaler |
| GET | `/my` | JWT | — | Indlæs præferencer for notifikationer for den aktuelle bruger (opretter automatisk standardindstillinger, hvis der ikke findes nogen) |
| POST | `/` | JWT | — | Gem den aktuelle brugers præferencer. Body: en eller flere af `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, samt valgfri `overrides: [{ categoryKey, channel, optedIn }]` (channel kan være `push`, `email`, `in_app` eller `sms`; låste kategorier ignoreres). `allowSms` er medlemmets tilvalg af sms-påmindelser. En ældre body med en række af rækker accepteres stadig |

## Forbindelser

Basissti: `/messaging/connections`

Håndterer WebSocket-/realtidsforbindelser til chat, gruppesamtaler, private beskeder og live-streaming. Se [Realtidsarkitektur](../../realtime.md) for hele protokollen.

| Metode | Sti | Godkendelse | Tilladelse | Beskrivelse |
|--------|-----|-------------|------------|-------------|
| GET | `/:churchId/:conversationId` | Offentlig | — | Indlæs alle forbindelser i en samtale |
| POST | `/` | Offentlig | — | Registrer forbindelser (batch). Udløser en udsendelse af fremmøde i samtalen. Elementer i body: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Offentlig | — | Opdater visningsnavnet for en forbindelse ud fra socket-ID. Body: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Offentlig | — | Fjern en forbindelse fra en samtale. Udløser en udsendelse af fremmøde |
| POST | `/tmpSendAlert` | Offentlig | — | Send en notifikationsadvarsel til en persons forbindelser. Body: `{ churchId, personId }` |

## Enheder

Basissti: `/messaging/devices`

Håndterer registrering af enheder til push-notifikationer og parring af indhold (f.eks. Lessons-appen på tv-skærme).

| Metode | Sti | Godkendelse | Tilladelse | Beskrivelse |
|--------|-----|-------------|------------|-------------|
| POST | `/enroll` | JWT | — | Tilmeld eller opdater en enhed (registrering af push på mobil). Matcher på FCM-token eller enheds-ID |
| POST | `/enrollAnon` | Offentlig | — | Tilmeld en anonym enhed og generér en parringskode på 4 tegn |
| POST | `/` | Offentlig | — | Gem enheder (batch) |
| GET | `/pair/:pairingCode` | JWT | — | Par en enhed med dens parringskode. Valgfri `?contentType=&contentId=` for at tildele indhold |
| GET | `/status/:deviceId` | Offentlig | — | Tjek parringsstatus for en enhed |
| GET | `/:churchId` | JWT | — | Indlæs alle enheder for en kirke |
| GET | `/:churchId/person/:personId` | JWT | — | Indlæs alle enheder for en person |
| GET | `/:churchId/:id` | JWT | — | Indlæs en enhed efter ID |
| DELETE | `/:churchId/:id` | JWT | — | Slet en enhed |

### Eksempel: Tilmeld en enhed

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

## Indhold på enheder

Basissti: `/messaging/devicecontents`

Håndterer tildeling af indhold til parrede enheder (f.eks. hvilken lektion der vises på et tv).

| Metode | Sti | Godkendelse | Tilladelse | Beskrivelse |
|--------|-----|-------------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Indlæs indholdstildelinger for en enhed |
| POST | `/` | JWT | — | Gem indholdstildelinger for enheder (batch) |
| DELETE | `/:id` | JWT | — | Slet en indholdstildeling for en enhed |

## Sms

Basissti: `/messaging/texting`

Håndterer sms-udbydere, gruppebeskeder via sms og sporing af levering.

| Metode | Sti | Godkendelse | Tilladelse | Beskrivelse |
|--------|-----|-------------|------------|-------------|
| GET | `/providers` | JWT | — | Indlæs sms-udbydere for kirken (legitimationsoplysninger er maskeret) |
| GET | `/status` | JWT | — | `{ enabled }` -- om kirken har en aktiveret sms-udbyder. Alle indloggede brugere i kirken kan se dette; det bruges til kun at vise valgmulighederne **Text**, når sms kan sendes |
| GET | `/inboundUrl` | JWT | `texting.send` eller `settings.edit` | `{ url }` -- kirkens webhook-URL for indgående beskeder (STOP), som indsættes hos udbyderen |
| POST | `/inbound/:churchId/:token` | Offentlig | — | Webhook for indgående beskeder fra udbyderen. `token` er en HMAC af kirkens ID. Et svar, der er præcis et stopord (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), markerer alle matchende personer som `optedOut` og slår deres `allowSms` fra. Returnerer `{ optedOut: <count> }`; andre svar returnerer `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | Forhåndsvis modtagere af en gruppesms (antal berettigede, afmeldte og uden telefonnummer) |
| GET | `/sent` | JWT | — | Indlæs alle registreringer af sendte sms'er for kirken |
| GET | `/sent/:id/details` | JWT | — | Indlæs en sendt sms med leveringslogs pr. modtager |
| POST | `/providers` | JWT | — | Gem sms-udbydere (batch). Krypterer API-legitimationsoplysninger |
| POST | `/send` | JWT | — | Send en sms til alle berettigede medlemmer af en gruppe. Body: `{ groupId, message }`. Flettefelter (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) erstattes for hver modtager |
| POST | `/sendPerson` | JWT | — | Send en sms til en enkelt person. Body: `{ personId, phoneNumber, message }`. Flettefelter erstattes, og den erstattede tekst er den, der logges |
| DELETE | `/providers/:id` | JWT | — | Slet en sms-udbyder |

### Eksempel: Send gruppesms

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

## E-mailskabeloner

Basissti: `/messaging/emailTemplates`

Håndterer genbrugelige e-mailskabeloner og afsendelse af skabelonbaserede e-mails til grupper.

| Metode | Sti | Godkendelse | Tilladelse | Beskrivelse |
|--------|-----|-------------|------------|-------------|
| GET | `/` | JWT | — | Indlæs alle e-mailskabeloner for kirken |
| GET | `/:id` | JWT | — | Indlæs en enkelt e-mailskabelon efter ID |
| GET | `/sendStatus` | JWT | `groupMembers.edit` eller `tasks.admin` | Kirkens status for gruppe-e-mail: `{ approved, paused, remaining, requested }`. Dialogen Send Email i B1Admin og workflow-handlingen **Send email** bruger den til at advare, når e-mails ikke sendes |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | Bed supporten om at godkende kirken til gruppe-e-mail (højst én gang pr. kirke om ugen) |
| GET | `/preview/:groupId` | JWT | — | Forhåndsvis e-mailafsendelse til en gruppe (antal berettigede modtagere, medlemmer uden e-mailadresse) |
| POST | `/` | JWT | — | Opret eller opdater e-mailskabeloner (batch) |
| POST | `/send` | JWT | — | Send en skabelonbaseret e-mail til alle medlemmer af en gruppe. Body: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Slet en e-mailskabelon |

### Eksempel: Send e-mail til en gruppe

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

**Understøttede flettefelter:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## Blokerede IP-adresser

Basissti: `/messaging/blockedips`

(forældet) IP-blokering til chat i live-streaming. B1App-klienten kalder ikke længere `POST /`, da IP-blokering blev fjernet i migreringen til samlet levering. Ruten `/clear` kaldes stadig server-til-server af `StreamingServiceController`, når streamingtjenester gemmes.

| Metode | Sti | Godkendelse | Tilladelse | Beskrivelse |
|--------|-----|-------------|------------|-------------|
| POST | `/` | JWT | — | (forældet) Gem blokerede IP-adresser (batch). Ingen aktiv klient |
| POST | `/clear` | JWT | — | Ryd alle blokerede IP-adresser for bestemte tjenester. Body: `[{ serviceId, churchId }]` |

## Leveringslogs

Basissti: `/messaging/deliverylogs`

Sporer leveringsstatus for sendte beskeder (sms, push-notifikationer, e-mail).

| Metode | Sti | Godkendelse | Tilladelse | Beskrivelse |
|--------|-----|-------------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Indlæs leveringslogs efter indholdstype og ID |
| GET | `/person/:personId` | JWT | — | Indlæs leveringslogs for en person. Valgfrie filtre `?startDate=&endDate=` |
| GET | `/recent` | JWT | — | Indlæs de seneste leveringslogs for kirken. Valgfri `?limit=` (standard 100) |
| GET | `/:id` | JWT | — | Indlæs en leveringslog efter ID |

## Relaterede sider

- [Realtidsarkitektur](../../realtime.md) -- WebSocket-protokol, rumabonnementer og det samlede leveringsrammeværk
- [Push-notifikationer i browseren](../../web-push.md) -- Tilmelding og levering af push i browseren
- [Endpoints for medlemskab](./membership.md) -- Personer, grupper, roller og kerneidentitet
- [Endpoints for fremmøde](./attendance.md) -- Sporing af gudstjenester og besøg
- [Godkendelse og tilladelser](./authentication.md) -- Login-flow, JWT, OAuth, tilladelsesmodel
- [Modulstruktur](../module-structure.md) -- Mønstre for kodeorganisering
