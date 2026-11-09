---
title: "Meldings-endepunkter"
description: "Referanse for meldings-API-endepunktene i ChurchApps: samtaler, regler for tilgang til notater, tekstmeldinger, e-postmaler, varsler og enheter."
---

# Meldings-endepunkter

<div class="article-intro">

Meldingsmodulen håndterer samtaler i sanntid, chattemeldinger, pushvarsler, levering av SMS og e-post, WebSocket-tilkoblinger, private meldinger, registrering av enheter og leverandører av tekstmeldinger. Den gir kommunikasjonslaget som brukes i alle ChurchApps-applikasjoner, både for chat i direktesendinger og for asynkrone varsler.

</div>

**Basisbane:** `/messaging`

## Samtaler

Basisbane: `/messaging/conversations`

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------------|-------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Last inn samtaler etter kommaseparerte ID-er med første og siste meldinger |
| GET | `/messages/:contentType/:contentId` | JWT | — | Last inn samtaler for innhold med paginerte meldinger (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Hent innleggssamtaler for gjeldende brukers grupper |
| GET | `/posts/group/:groupId` | JWT | — | Hent innleggssamtaler for en bestemt gruppe |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | Nyeste notater på tvers av alle poster for siden Notater i B1 Admin. `section` er `people`, `groups`, `events` eller `workflows` (400 ellers); `limit` er 25 som standard (maks 100); `before` er markøren fra forrige side. Hvert notat må fortsatt oppfylle regelen for sin egen type (tillatelsen Personer – rediger / konfidensielle notater, ledere av gruppen, arrangementsvisere, visere av arbeidsflytkort), slik at kallere bare ser notater de kunne åpnet. Notatteksten kuttes til 300 tegn |
| GET | `/current/:churchId/:contentType/:contentId` | Offentlig | — | Hent eller opprett gjeldende samtale for innhold (dekoder contentId automatisk) |
| GET | `/:churchId/:contentType/:contentId` | Offentlig | — | Last inn samtaler etter innholdstype og ID |
| GET | `/:churchId/:id` | Offentlig | — | Last inn en enkelt samtale etter ID |
| POST | `/` | JWT | — | Opprett eller oppdater samtaler (batch) |
| POST | `/start` | JWT | — | Start en ny samtale med en innledende kommentarmelding |
| DELETE | `/:churchId/:id` | JWT | — | Slett en samtale |

### Tilgangskontroll for personnotater

Samtaler med `contentType: "person"` (fanen Notater på en personpost) eller `contentType: "personConfidential"` (seksjonen Konfidensielle notater) er låst på hver lese- og skrivevei, inkludert de ellers offentlige rutene over, som returnerer `401` for disse innholdstypene. `person` krever tillatelsen **Personer / Rediger** i MembershipApi; `personConfidential` krever **Personer / Vis konfidensielle notater**. For API-nøkler med begrenset omfang gir `people:write` begge handlingene (brukeren for nøkkelen må fortsatt ha den underliggende rolletillatelsen).

### Tilgangskontroll for gruppe- og arrangementsnotater {#group-and-event-notes-access-control}

To andre innholdstyper for notater er låst på samme måte, på hver lese- og skrivevei (inkludert de offentlige rutene over), og er aldri åpne for anonym innsending:

- **`groupNote`** (`contentId` = gruppe-ID) -- feeden **Lederens notater** på en gruppe. Bare gruppens ledere (`leaderGroupIds` i JWT) kan lese eller skrive. Ingen ansatttillatelse gir tilgang, heller ikke `content.edit` og gruppemedlemstillatelsene.
- **`eventNote`** (`contentId` = arrangements-ID) -- notatene på en kalenderhendelse. Ansatte med `content.edit` eller **Kalendere / Admin** kan alltid lese og skrive. Ellers følger tilgangen arrangementets `notesViewRole` (lesing) og `notesPostRole` (skriving): `staff` (standard, brukes når feltet er `null`) gir ingen andre tilgang, `leaders` gir ledere av arrangementets gruppe tilgang, og `members` gir medlemmer og ledere av arrangementets gruppe tilgang. Et arrangement uten `groupId` er bare for ansatte.

### Tilgangskontroll for notater på arbeidsflytkort

Samtaler med `contentType: "workflowCard"` (notatene på et arbeidsflytkort, der `contentId` er kortets oppgave-ID) kan bare leses og skrives av noen som kan åpne kortet: en bruker med DoingApi **Oppgaver / Vis**-tillatelsen, eller personen eller gruppen kortet er tildelt, opprettet av eller handler om. Alle andre får `401` på hver lesevei, inkludert de offentlige rutene over. En kortsamtale knyttes til kortet via `POST /doing/tasks/:id/conversation` (body `{ "conversationId": "..." }`; den første samtalen som knyttes vinner), som kortets redigerere og tildelte kan kalle.

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

## Meldinger

Basisbane: `/messaging/messages`

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------------|-------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Last inn alle meldinger i en samtale |
| GET | `/catchup/:churchId/:conversationId` | Offentlig | — | Last inn alle meldinger i en samtale (offentlig innhenting for chat i sanntid) |
| GET | `/:churchId/:id` | Offentlig | — | Last inn en enkelt melding etter ID |
| POST | `/` | JWT | — | Lagre meldinger (batch). Sender oppdateringer i sanntid og utløser varsler. Oppdatering av en eksisterende melding krever at man er forfatteren eller har `content.edit`; den lagrede forfatteren kan aldri endres |
| POST | `/send` | Offentlig | — | Send meldinger (batch, offentlig). Sender oppdateringer i sanntid via WebSocket og utløser varsler |
| POST | `/setCallout` | JWT | — | (utdatert) Kringkast en innrykket melding i sanntid. Ingen aktiv klient; chat i direktesendinger viser ikke lenger innrykkede meldinger |
| DELETE | `/:churchId/:id` | JWT | — | Slett en melding og kringkast slettingen i sanntid. Se [Moderering av meldinger](#message-moderation) |

### Moderering av meldinger {#message-moderation}

Sletting av en melding er tillatt for:

- forfatteren av meldingen;
- ansatte med `content.edit` (hvor som helst i menigheten);
- **gruppeledere**, for samtaler med `contentType` `group` eller `groupAnnouncement` der `contentId` er en gruppe de leder (`leaderGroupIds` i JWT).

Personnotatsamtaler (`person` / `personConfidential`) modereres aldri av ledere -- de bruker i stedet tillatelsene for notater (`people.edit`, `people.viewConfidentialNotes`).

Ledere får bare slette, ikke redigere: å skrive om en annen medlems melding er fortsatt begrenset til forfatteren og ansatte med `content.edit`.

### Eksempel: Send en melding

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

## Private meldinger

Basisbane: `/messaging/privatemessages`

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------------|-------------|-------------|
| GET | `/` | JWT | — | Last inn alle private meldinger for gjeldende bruker (inkluderer siste melding per samtale, og markerer alle som lest) |
| GET | `/existing/:personId` | JWT | — | Finn en eksisterende privat samtale med en bestemt person |
| GET | `/:id` | JWT | — | Last inn en privat melding etter ID (fjerner varselet hvis den er adressert til gjeldende bruker) |
| POST | `/` | JWT | — | Send private meldinger (batch). Utløser pushvarsel til mottakeren |

## Varsler

Basisbane: `/messaging/notifications`

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------------|-------------|-------------|
| GET | `/unreadCount` | JWT | — | Hent antall uleste varsler for gjeldende bruker |
| GET | `/my` | JWT | — | Last inn alle varsler for gjeldende bruker (markerer alle som lest) |
| GET | `/tmpEmail` | Offentlig | — | Utløs daglig e-postsammendrag av varsler (feilsøkings-/cron-endepunkt) |
| GET | `/:churchId/person/:personId` | JWT | — | Last inn varsler for en bestemt person |
| GET | `/:churchId/:id` | JWT | — | Last inn et varsel etter ID |
| POST | `/` | JWT | — | Opprett eller oppdater varsler (batch) |
| POST | `/create` | JWT | — | Opprett varsler for flere personer. Body: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Merk alle varsler for en person som lest |
| POST | `/sendTest` | JWT | — | Send et testpushvarsel. Body: `{ personId, title }` |
| POST | `/ping` | Offentlig | — | Opprett et varsel fra en ekstern utløser. Body: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Slett et varsel |
| GET | `/groupPreview/:groupId` | JWT | `groupMembers.edit` | Tell hvor mange av en gruppes medlemmer et push ville nå |
| GET | `/churchPreview` | JWT | `content.edit` | Tell hvor mange personer et push til alle med appen ville nå |
| POST | `/group/send` | JWT | `groupMembers.edit` | Send et push til en gruppes medlemmer nå |

### Eksempel: Opprett varsler

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

## Planlagte varsler

Basisbane: `/messaging/scheduledNotifications`

Pushvarsler planlagt på forhånd. `audience` er `church` (alle med appen; krever `content.edit`) eller `group` (krever `groupMembers.edit` og en `groupId`). Tittelen er begrenset til 80 tegn og meldingen til 240. En rad som forfaller, sendes av 1-minutters-timeren.

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------------|-------------|-------------|
| GET | `/` | JWT | `groupMembers.edit` eller `content.edit` | List planlagte og nylige varsler for menigheten |
| POST | `/` | JWT | etter målgruppe | Opprett et planlagt varsel, eller oppdater ett når `id` er satt. Body: `{ id?, audience, groupId?, title, message, link?, imageUrl?, sendAt }`. Oppdatering av et som ikke lenger er ventende, gir 409 |
| POST | `/:id/sendNow` | JWT | etter målgruppe | Send et ventende varsel nå. Gir 409 hvis det allerede er sendt, avbrutt eller er under sending |
| DELETE | `/:id` | JWT | etter målgruppe | Avbryt et ventende varsel, eller fjern et sendt, mislykket eller avbrutt fra listen. Gir 409 mens det sendes |
| DELETE | `/` | JWT | `groupMembers.edit` eller `content.edit` | Fjern alle sendte, mislykkede og avbrutte varsler for målgruppene brukeren kan sende til. Returnerer `{ deleted }` |

## Varselinnstillinger

Basisbane: `/messaging/notificationpreferences`

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------------|-------------|-------------|
| GET | `/categories` | JWT | — | List varselkategorier med standard- og tillatte kanaler |
| GET | `/my` | JWT | — | Last inn varselinnstillinger for gjeldende bruker (oppretter standardverdier automatisk hvis ingen finnes) |
| POST | `/` | JWT | — | Lagre gjeldende brukers innstillinger. Body: en av `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, pluss valgfri `overrides: [{ categoryKey, channel, optedIn }]` (kanal kan være `push`, `email`, `in_app` eller `sms`; låste kategorier ignoreres). `allowSms` er medlemmets samtykke til tekstpåminnelser. En eldre body med en rad per innstilling godtas fortsatt |

## Tilkoblinger

Basisbane: `/messaging/connections`

Håndterer WebSocket-/sanntidstilkoblinger for chat, gruppesamtaler, private meldinger og direktesendinger. Se [Sanntidsarkitektur](../../realtime.md) for hele protokollen.

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------------|-------------|-------------|
| GET | `/:churchId/:conversationId` | Offentlig | — | Last inn alle tilkoblinger for en samtale |
| POST | `/` | Offentlig | — | Registrer tilkoblinger (batch). Utløser en oppmøtekringkasting i samtalen. Elementer i body: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Offentlig | — | Oppdater visningsnavnet for en tilkobling etter socket-ID. Body: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Offentlig | — | Fjern en tilkobling fra en samtale. Utløser en oppmøtekringkasting |
| POST | `/tmpSendAlert` | Offentlig | — | Send et varsel til en persons tilkoblinger. Body: `{ churchId, personId }` |

## Enheter

Basisbane: `/messaging/devices`

Håndterer registrering av enheter for pushvarsler og innholdskobling (f.eks. Lessons-appen på TV-skjermer).

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------------|-------------|-------------|
| POST | `/enroll` | JWT | — | Registrer eller oppdater en enhet (registrering for mobilpush). Matcher på FCM-token eller enhets-ID |
| POST | `/enrollAnon` | Offentlig | — | Registrer en anonym enhet og generer en 4-tegns koblingskode |
| POST | `/` | Offentlig | — | Lagre enheter (batch) |
| GET | `/pair/:pairingCode` | JWT | — | Koble en enhet med koblingskoden. Valgfri `?contentType=&contentId=` for å tilordne innhold |
| GET | `/status/:deviceId` | Offentlig | — | Sjekk koblingsstatusen til en enhet |
| GET | `/:churchId` | JWT | — | Last inn alle enheter for en menighet |
| GET | `/:churchId/person/:personId` | JWT | — | Last inn alle enheter for en person |
| GET | `/:churchId/:id` | JWT | — | Last inn en enhet etter ID |
| DELETE | `/:churchId/:id` | JWT | — | Slett en enhet |

### Eksempel: Registrer en enhet

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

## Innhold på enheter

Basisbane: `/messaging/devicecontents`

Håndterer innholdstilordninger for koblede enheter (f.eks. hvilken leksjon som vises på en TV).

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------------|-------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Last inn innholdstilordninger for en enhet |
| POST | `/` | JWT | — | Lagre tilordninger av innhold til enheter (batch) |
| DELETE | `/:id` | JWT | — | Slett en tilordning av innhold til en enhet |

## Tekstmeldinger

Basisbane: `/messaging/texting`

Håndterer leverandører av SMS, gruppetekstmeldinger og sporing av levering.

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------------|-------------|-------------|
| GET | `/providers` | JWT | — | Last inn tekstleverandører for menigheten (legitimasjon er maskert) |
| GET | `/status` | JWT | — | `{ enabled }` -- om menigheten har en aktivert tekstleverandør. Alle innloggede brukere i menigheten; brukes til å vise **Tekst**-alternativer bare når tekster kan sendes |
| GET | `/inboundUrl` | JWT | `texting.send` eller `settings.edit` | `{ url }` -- menighetens nettadresse for innkommende (STOP-)webhook, som limes inn hos leverandøren |
| POST | `/inbound/:churchId/:token` | Offentlig | — | Webhook for innkommende meldinger fra leverandøren. `token` er en HMAC av menighets-ID-en. Et svar som er nøyaktig et stoppord (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`) merker alle matchende personer som `optedOut` og slår av deres `allowSms`. Returnerer `{ optedOut: <count> }`; andre svar returnerer `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | Forhåndsvis mottakere av en gruppetekst (antall som kan få den, avmeldte, og uten telefonnummer) |
| GET | `/sent` | JWT | — | Last inn alle sendte tekstmeldinger for menigheten |
| GET | `/sent/:id/details` | JWT | — | Last inn en sendt tekst med leveringslogg per mottaker |
| POST | `/providers` | JWT | — | Lagre tekstleverandører (batch). Krypterer API-legitimasjon |
| POST | `/send` | JWT | — | Send en SMS til alle som kan få den i en gruppe. Body: `{ groupId, message }`. Flettefelt (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) løses per mottaker |
| POST | `/sendPerson` | JWT | — | Send en SMS til én enkelt person. Body: `{ personId, phoneNumber, message }`. Flettefelt løses, og den løste teksten er det som logges |
| DELETE | `/providers/:id` | JWT | — | Slett en tekstleverandør |

### Eksempel: Send gruppetekst

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

## E-postmaler

Basisbane: `/messaging/emailTemplates`

Håndterer gjenbrukbare e-postmaler og sending av malbaserte e-poster til grupper.

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------------|-------------|-------------|
| GET | `/` | JWT | — | Last inn alle e-postmaler for menigheten |
| GET | `/:id` | JWT | — | Last inn en enkelt e-postmal etter ID |
| GET | `/sendStatus` | JWT | `groupMembers.edit` eller `tasks.admin` | Menighetens status for gruppe-e-post: `{ approved, paused, remaining, requested }`. Dialogen Send e-post i B1Admin og handlingen **Send e-post** i arbeidsflyter bruker det til å advare når e-post ikke sendes |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | Be support godkjenne menigheten for gruppe-e-post (høyst én gang per menighet per uke) |
| GET | `/preview/:groupId` | JWT | — | Forhåndsvis e-postutsending for en gruppe (antall mottakere som kan få den, medlemmer uten e-post) |
| POST | `/` | JWT | — | Opprett eller oppdater e-postmaler (batch) |
| POST | `/send` | JWT | — | Send en malbasert e-post til alle medlemmer i en gruppe. Body: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Slett en e-postmal |

### Eksempel: Send e-post til en gruppe

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

## Blokkerte IP-adresser

Basisbane: `/messaging/blockedips`

(utdatert) IP-blokkering for chat i direktesendinger. B1App-klienten kaller ikke lenger `POST /` -- IP-blokkering ble fjernet i migreringen til enhetlig levering. Ruten `/clear` kalles fortsatt server-til-server av `StreamingServiceController` når direktesendingstjenester lagres.

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------------|-------------|-------------|
| POST | `/` | JWT | — | (utdatert) Lagre blokkerte IP-adresser (batch). Ingen aktiv klient |
| POST | `/clear` | JWT | — | Fjern alle blokkerte IP-adresser for bestemte tjenester. Body: `[{ serviceId, churchId }]` |

## Leveringslogger

Basisbane: `/messaging/deliverylogs`

Sporer leveringsstatus for sendte meldinger (SMS, pushvarsler, e-post).

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------------|-------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Last inn leveringslogger etter innholdstype og ID |
| GET | `/person/:personId` | JWT | — | Last inn leveringslogger for en person. Valgfri `?startDate=&endDate=` for filtrering |
| GET | `/recent` | JWT | — | Last inn nylige leveringslogger for menigheten. Valgfri `?limit=` (standard 100) |
| GET | `/:id` | JWT | — | Last inn en leveringslogg etter ID |

## Relaterte sider

- [Sanntidsarkitektur](../../realtime.md) -- WebSocket-protokoll, rom-abonnementer og det enhetlige leveringsrammeverket
- [Web-pushvarsler](../../web-push.md) -- Registrering og levering av nettleserpush
- [Medlems-endepunkter](./membership.md) -- Personer, grupper, roller og kjerneidentitet
- [Oppmøte-endepunkter](./attendance.md) -- Sporing av gudstjenester og besøk
- [Autentisering og tillatelser](./authentication.md) -- Innloggingsflyt, JWT, OAuth, tillatelsesmodell
- [Modulstruktur](../module-structure.md) -- Mønstre for kodeorganisering
