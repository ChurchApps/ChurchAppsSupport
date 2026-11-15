---
title: "Endepunkter for meldinger"
description: "Referanse for ChurchApps' endepunkter for meldings-API: samtaler, regler for tilgang til notater, tekst, e-postmaler, varsler og enheter."
---

# Endepunkter for meldinger

<div class="article-intro">

Meldingsmodulen håndterer sanntidssamtaler, chatmeldinger, push-varsler, levering av SMS og e-post, WebSocket-tilkoblinger, private meldinger, registrering av enheter og leverandører for tekstmeldinger. Den gir kommunikasjonslaget som brukes på tvers av alle ChurchApps-applikasjoner, både for direktesendingschat og for asynkrone varsler.

</div>

**Basisbane:** `/messaging`

## Samtaler {#conversations}

Basisbane: `/messaging/conversations`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|---------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Laster samtaler etter kommaseparerte id-er, med første og siste meldinger |
| GET | `/messages/:contentType/:contentId` | JWT | — | Laster samtaler for innhold med paginerte meldinger (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Henter innleggsamtaler for den innloggede brukerens grupper |
| GET | `/posts/group/:groupId` | JWT | — | Henter innleggsamtaler for en bestemt gruppe |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | Nyeste notater på tvers av alle poster, for siden Notater i B1 Admin. `section` er `people`, `groups`, `events` eller `workflows` (400 ellers). `limit` er 25 som standard (maks 100). `before` er markøren fra forrige side. Hvert notat må fortsatt oppfylle regelen for sin egen type (tillatelsen People Edit / konfidensielle notater, ledere av gruppen, arrangementsseere, seere av arbeidsflytkort), så kallere ser bare notater de ville kunne åpne. Notatteksten kuttes til 300 tegn |
| GET | `/current/:churchId/:contentType/:contentId` | Offentlig | — | Henter eller oppretter gjeldende samtale for innhold (dekrypterer contentId automatisk) |
| GET | `/:churchId/:contentType/:contentId` | Offentlig | — | Laster samtaler etter innholdstype og id |
| GET | `/:churchId/:id` | Offentlig | — | Laster én samtale etter id |
| POST | `/` | JWT | — | Oppretter eller oppdaterer samtaler (batch) |
| POST | `/start` | JWT | — | Starter en ny samtale med en innledende kommentarmelding |
| DELETE | `/:churchId/:id` | JWT | — | Sletter en samtale |

### Tilgangskontroll for personnotater {#person-notes-access-control}

Samtaler med `contentType: "person"` (fanen Notater på en personpost) eller `contentType: "personConfidential"` (seksjonen Konfidensielle notater) er låst på alle lese- og skrivestier, også på de ellers offentlige rutene ovenfor, som returnerer `401` for disse innholdstypene. `person` krever tillatelsen **People / Edit** i MembershipApi. `personConfidential` krever **People / View Confidential Notes**. For API-nøkler med omfang gir `people:write` begge handlingene (brukeren bak nøkkelen må fortsatt ha den underliggende rolletillatelsen).

### Tilgangskontroll for gruppe- og arrangementsnotater {#group-and-event-notes-access-control}

To andre innholdstyper for notater er låst på samme måte, på alle lese- og skrivestier (også på de offentlige rutene ovenfor), og er aldri åpne for anonym posting:

- **`groupNote`** (`contentId` = gruppe-id) -- strømmen **Ledernotater** på en gruppe. Bare den gruppens ledere (`leaderGroupIds` i JWT-en) kan lese eller legge inn. Ingen ansatt-tillatelse gir tilgang, heller ikke `content.edit` og gruppemedlemstillatelsene.
- **`eventNote`** (`contentId` = arrangements-id) -- notatene på et kalenderarrangement. Ansatte med `content.edit` eller **Calendars / Admin** kan alltid lese og legge inn. Ellers følger tilgangen arrangementets `notesViewRole` (lesing) og `notesPostRole` (posting): `staff` (standard, brukes når feltet er `null`) gir ingen andre tilgang, `leaders` gir tilgang til lederne av arrangementets gruppe, og `members` gir tilgang til medlemmene og lederne i arrangementets gruppe. Et arrangement uten `groupId` er bare for ansatte.

### Tilgangskontroll for notater på arbeidsflytkort {#workflow-card-notes-access-control}

Samtaler med `contentType: "workflowCard"` (notatene på et arbeidsflytkort, der `contentId` er kortets oppgave-id) kan bare leses og skrives av noen som kan åpne kortet: en bruker med tillatelsen DoingApi **Tasks / View**, eller personen eller gruppen kortet er tildelt, opprettet av eller handler om. Alle andre får `401` på alle lesestier, også på de offentlige rutene ovenfor. En kortsamtale knyttes til kortet selv med `POST /doing/tasks/:id/conversation` (body `{ "conversationId": "..." }`; den første samtalen som knyttes, vinner). Det kan kortets redaktører og den tildelte personen kalle.

### Eksempel: starte en samtale {#example-start-a-conversation}

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

## Meldinger {#messages}

Basisbane: `/messaging/messages`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|---------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Laster alle meldinger i en samtale |
| GET | `/catchup/:churchId/:conversationId` | Offentlig | — | Laster alle meldinger i en samtale (offentlig innhenting for direktechat) |
| GET | `/:churchId/:id` | Offentlig | — | Laster én melding etter id |
| POST | `/` | JWT | — | Lagrer meldinger (batch). Sender sanntidsoppdateringer og utløser varsler. Å oppdatere en eksisterende melding krever at du er forfatteren eller har `content.edit`. Den lagrede forfatteren kan aldri endres |
| POST | `/send` | Offentlig | — | Sender meldinger (batch, offentlig). Sender sanntidsoppdateringer via WebSocket og utløser varsler |
| POST | `/setCallout` | JWT | — | (utgått) Kringkaster en fremhevet melding i sanntid. Ingen aktiv klient; chatten i direktesendingen viser ikke lenger fremhevinger |
| DELETE | `/:churchId/:id` | JWT | — | Sletter en melding og kringkaster slettingen i sanntid. Se [Moderering av meldinger](#message-moderation) |

### Moderering av meldinger {#message-moderation}

Å slette en melding er tillatt for:

- forfatteren av meldingen;
- ansatte med `content.edit` (hvor som helst i menigheten);
- **gruppeledere**, for samtaler med `contentType` `group` eller `groupAnnouncement` der `contentId` er en gruppe de leder (`leaderGroupIds` i JWT-en).

Personnotatsamtaler (`person` / `personConfidential`) modereres aldri av ledere. De bruker i stedet tillatelsene for notater (`people.edit`, `people.viewConfidentialNotes`).

Ledere får bare slette, ikke redigere. Å skrive om et annet medlems melding er fortsatt begrenset til forfatteren og ansatte med `content.edit`.

### Eksempel: sende en melding {#example-send-a-message}

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

## Private meldinger {#private-messages}

Basisbane: `/messaging/privatemessages`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|---------|------------|-------------|
| GET | `/` | JWT | — | Laster alle private meldinger for den innloggede brukeren (inkluderer siste melding per samtale, og markerer alle som lest) |
| GET | `/existing/:personId` | JWT | — | Finner en eksisterende privat samtale med en bestemt person |
| GET | `/:id` | JWT | — | Laster en privat melding etter id (fjerner varselet hvis meldingen er adressert til den innloggede brukeren) |
| POST | `/` | JWT | — | Sender private meldinger (batch). Utløser push-varsel til mottakeren |

## Varsler {#notifications}

Basisbane: `/messaging/notifications`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|---------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Henter antall uleste varsler for den innloggede brukeren |
| GET | `/my` | JWT | — | Laster alle varsler for den innloggede brukeren (markerer alle som lest) |
| GET | `/tmpEmail` | Offentlig | — | Utløser den daglige e-postoppsummeringen av varsler (feilsøkings-/cron-endepunkt) |
| GET | `/:churchId/person/:personId` | JWT | — | Laster varsler for en bestemt person |
| GET | `/:churchId/:id` | JWT | — | Laster et varsel etter id |
| POST | `/` | JWT | — | Oppretter eller oppdaterer varsler (batch) |
| POST | `/create` | JWT | — | Oppretter varsler for flere personer. Body: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Markerer alle varsler for en person som lest |
| POST | `/sendTest` | JWT | — | Sender et testvarsel. Body: `{ personId, title }` |
| POST | `/ping` | Offentlig | — | Oppretter et varsel fra en ekstern utløser. Body: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Sletter et varsel |
| GET | `/groupPreview/:groupId` | JWT | `groupMembers.edit` | Teller hvor mange av gruppens medlemmer et push-varsel ville nå |
| GET | `/churchPreview` | JWT | `content.edit` | Teller hvor mange personer et push til alle med appen ville nå |
| POST | `/group/send` | JWT | `groupMembers.edit` | Sender et push til gruppens medlemmer nå |

### Eksempel: opprette varsler {#example-create-notifications}

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

## Planlagte varsler {#scheduled-notifications}

Basisbane: `/messaging/scheduledNotifications`

Push-varsler som planlegges på forhånd. `audience` er `church` (alle med appen; krever `content.edit`) eller `group` (krever `groupMembers.edit` og en `groupId`). Tittelen er begrenset til 80 tegn og meldingen til 240. En rad som er forfalt, sendes av 1-minuttstimeren.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|---------|------------|-------------|
| GET | `/` | JWT | `groupMembers.edit` eller `content.edit` | Lister planlagte og nylige varsler for menigheten |
| POST | `/` | JWT | avhengig av målgruppe | Oppretter et planlagt varsel, eller oppdaterer et når `id` er satt. Body: `{ id?, audience, groupId?, title, message, link?, imageUrl?, sendAt }`. Å oppdatere et varsel som ikke lenger venter, gir 409 |
| POST | `/:id/sendNow` | JWT | avhengig av målgruppe | Sender et ventende varsel nå. Gir 409 hvis det allerede er sendt, kansellert eller er under sending |
| DELETE | `/:id` | JWT | avhengig av målgruppe | Kansellerer et ventende varsel, eller fjerner et sendt, mislykket eller kansellert varsel fra listen. Gir 409 mens det sendes |
| DELETE | `/` | JWT | `groupMembers.edit` eller `content.edit` | Fjerner alle sendte, mislykkede og kansellerte varsler for målgruppene brukeren kan sende til. Returnerer `{ deleted }` |

## Varselinnstillinger {#notification-preferences}

Basisbane: `/messaging/notificationpreferences`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|---------|------------|-------------|
| GET | `/categories` | JWT | — | Lister varselkategorier med standard- og tillatte kanaler |
| GET | `/my` | JWT | — | Laster varselinnstillingene for den innloggede brukeren (oppretter standardverdier automatisk hvis ingen finnes) |
| POST | `/` | JWT | — | Lagrer den innloggede brukerens innstillinger. Body: én eller flere av `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, pluss valgfri `overrides: [{ categoryKey, channel, optedIn }]` (channel kan være `push`, `email`, `in_app` eller `sms`. Låste kategorier ignoreres). `allowSms` er medlemmets samtykke til påminnelser som tekst. Et eldre body med en liste av rader godtas fortsatt |

## Tilkoblinger {#connections}

Basisbane: `/messaging/connections`

Administrerer WebSocket-/sanntidstilkoblinger for chat, gruppesamtaler, private meldinger og direktesending. Se [Sanntidsarkitektur](../../realtime.md) for hele protokollen fra start til slutt.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|---------|------------|-------------|
| GET | `/:churchId/:conversationId` | Offentlig | — | Laster alle tilkoblinger for en samtale |
| POST | `/` | Offentlig | — | Registrerer tilkoblinger (batch). Utløser en oppmøtekringkasting i samtalen. Elementer i body: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Offentlig | — | Oppdaterer visningsnavnet for en tilkobling etter socket-id. Body: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Offentlig | — | Fjerner en tilkobling fra en samtale. Utløser en oppmøtekringkasting |
| POST | `/tmpSendAlert` | Offentlig | — | Sender et varsel til alle tilkoblingene til en person. Body: `{ churchId, personId }` |

## Enheter {#devices}

Basisbane: `/messaging/devices`

Administrerer registrering av enheter for push-varsler og innholdskobling (f.eks. appen Lessons på TV-skjermer).

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|---------|------------|-------------|
| POST | `/enroll` | JWT | — | Registrerer eller oppdaterer en enhet (registrering for mobil push). Matcher på FCM-token eller enhets-id |
| POST | `/enrollAnon` | Offentlig | — | Registrerer en anonym enhet og genererer en paringskode på 4 tegn |
| POST | `/` | Offentlig | — | Lagrer enheter (batch) |
| GET | `/pair/:pairingCode` | JWT | — | Parer en enhet med paringskoden. Valgfritt `?contentType=&contentId=` for å tildele innhold |
| GET | `/status/:deviceId` | Offentlig | — | Sjekker paringsstatus for en enhet |
| GET | `/:churchId` | JWT | — | Laster alle enheter for en menighet |
| GET | `/:churchId/person/:personId` | JWT | — | Laster alle enheter for en person |
| GET | `/:churchId/:id` | JWT | — | Laster en enhet etter id |
| DELETE | `/:churchId/:id` | JWT | — | Sletter en enhet |

### Eksempel: registrere en enhet {#example-enroll-a-device}

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

## Innhold på enheter {#device-contents}

Basisbane: `/messaging/devicecontents`

Administrerer innholdstildelinger for parede enheter (f.eks. hvilken leksjon som vises på en TV).

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|---------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Laster innholdstildelinger for en enhet |
| POST | `/` | JWT | — | Lagrer innholdstildelinger for enheter (batch) |
| DELETE | `/:id` | JWT | — | Sletter en innholdstildeling for en enhet |

## Tekstmeldinger {#texting}

Basisbane: `/messaging/texting`

Administrerer leverandører for SMS, gruppetekstmeldinger og sporing av levering.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|---------|------------|-------------|
| GET | `/providers` | JWT | — | Laster leverandører for tekstmeldinger for menigheten (påloggingsdetaljer er maskert) |
| GET | `/status` | JWT | — | `{ enabled }` -- om menigheten har en aktivert leverandør for tekstmeldinger. Alle innloggede brukere i menigheten; brukes til å vise alternativene **Tekst** bare når tekstmeldinger kan sendes |
| GET | `/inboundUrl` | JWT | `texting.send` eller `settings.edit` | `{ url }` -- menighetens webhook-URL for innkommende meldinger (STOP), som limes inn hos leverandøren |
| POST | `/inbound/:churchId/:token` | Offentlig | — | Webhook for innkommende meldinger fra leverandøren. `token` er en HMAC av menighets-id-en. Et svar som er nøyaktig et stoppord (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`) markerer alle matchende personer som `optedOut` og slår av deres `allowSms`. Returnerer `{ optedOut: <count> }`. Andre svar returnerer `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | Forhåndsviser mottakere for en gruppetekst (antall berettigede, avmeldte og uten telefon) |
| GET | `/sent` | JWT | — | Laster alle sendte tekstmeldinger for menigheten |
| GET | `/sent/:id/details` | JWT | — | Laster en sendt tekstmelding med leveringslogg per mottaker |
| POST | `/providers` | JWT | — | Lagrer leverandører for tekstmeldinger (batch). Krypterer API-påloggingsdetaljer |
| POST | `/send` | JWT | — | Sender en SMS til alle berettigede medlemmer i en gruppe. Body: `{ groupId, message }`. Flettefelt (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) løses per mottaker |
| POST | `/sendPerson` | JWT | — | Sender en SMS til én person. Body: `{ personId, phoneNumber, message }`. Flettefelt løses, og det løste teksten er det som logges |
| DELETE | `/providers/:id` | JWT | — | Sletter en leverandør for tekstmeldinger |

### Eksempel: sende gruppetekst {#example-send-group-text}

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

## E-postmaler {#email-templates}

Basisbane: `/messaging/emailTemplates`

Administrerer gjenbrukbare e-postmaler og sending av malbaserte e-poster til grupper.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|---------|------------|-------------|
| GET | `/` | JWT | — | Laster alle e-postmaler for menigheten |
| GET | `/:id` | JWT | — | Laster én e-postmal etter id |
| GET | `/sendStatus` | JWT | `groupMembers.edit` eller `tasks.admin` | Menighetens status for gruppe-e-post: `{ approved, paused, remaining, requested }`. Dialogen Send e-post i B1Admin og handlingen **Send e-post** i arbeidsflyter bruker den for å varsle når e-post ikke kommer til å gå ut |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | Ber støtte om å godkjenne menigheten for gruppe-e-post (høyst én gang per menighet per uke) |
| GET | `/preview/:groupId` | JWT | — | Forhåndsviser e-postlevering for en gruppe (antall berettigede mottakere, medlemmer uten e-post) |
| POST | `/` | JWT | — | Oppretter eller oppdaterer e-postmaler (batch) |
| POST | `/send` | JWT | — | Sender en malbasert e-post til alle medlemmene i en gruppe. Body: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Sletter en e-postmal |

### Eksempel: sende e-post til en gruppe {#example-send-email-to-group}

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

**Støttede flettefelt:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## Blokkerte IP-adresser {#blocked-ips}

Basisbane: `/messaging/blockedips`

(utgått) IP-blokkering for chat i direktesending. B1App-klienten kaller ikke lenger `POST /` -- IP-blokkering ble fjernet i migreringen til samlet levering. Ruten `/clear` kalles fortsatt server-til-server av `StreamingServiceController` når direktesendingstjenester lagres.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|---------|------------|-------------|
| POST | `/` | JWT | — | (utgått) Lagrer blokkerte IP-adresser (batch). Ingen aktiv klient |
| POST | `/clear` | JWT | — | Fjerner alle blokkerte IP-adresser for bestemte tjenester. Body: `[{ serviceId, churchId }]` |

## Leveringslogger {#delivery-logs}

Basisbane: `/messaging/deliverylogs`

Sporer leveringsstatus for sendte meldinger (SMS, push-varsler, e-post).

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|---------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Laster leveringslogger etter innholdstype og id |
| GET | `/person/:personId` | JWT | — | Laster leveringslogger for en person. Valgfritt `?startDate=&endDate=` for filtrering |
| GET | `/recent` | JWT | — | Laster nylige leveringslogger for menigheten. Valgfritt `?limit=` (standard 100) |
| GET | `/:id` | JWT | — | Laster en leveringslogg etter id |

## Relaterte sider {#related-pages}

- [Sanntidsarkitektur](../../realtime.md) -- WebSocket-protokollen, romabonnementer og det samlede leveringsrammeverket
- [Web Push-varsler](../../web-push.md) -- Registrering og levering av push i nettleser
- [Endepunkter for medlemskap](./membership.md) -- Personer, grupper, roller og kjernen i identitet
- [Endepunkter for oppmøte](./attendance.md) -- Sporing av tjenester og besøk
- [Autentisering og tillatelser](./authentication.md) -- Innloggingsflyt, JWT, OAuth og tillatelsesmodellen
- [Modulstruktur](../module-structure.md) -- Mønstre for kodeorganisering
