---
title: "Meldingsendepunkter"
---

# Meldingsendepunkter

<div class="article-intro">

Meldingsmodulen håndterer sanntidssamtaler, chatmeldinger, push-varsler, levering av SMS og e-post, WebSocket-tilkoblinger, private meldinger, registrering av enheter og leverandører for tekstmeldinger. Den gir kommunikasjonslaget som brukes i alle ChurchApps-applikasjoner, både for direktestrømmet chat og for asynkrone varsler.

</div>

**Basissti:** `/messaging`

## Samtaler

Basissti: `/messaging/conversations`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Last samtaler etter kommaseparerte ID-er med første og siste meldinger |
| GET | `/messages/:contentType/:contentId` | JWT | — | Last samtaler for innhold med paginerte meldinger (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Hent innleggssamtaler for den nåværende brukerens grupper |
| GET | `/posts/group/:groupId` | JWT | — | Hent innleggssamtaler for en bestemt gruppe |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | Nyeste notater på tvers av alle poster, for siden Notes i B1 Admin. `section` er `people`, `groups`, `events` eller `workflows` (ellers 400). `limit` er 25 som standard (maks 100). `before` er markøren fra forrige side. Hvert notat må fortsatt oppfylle regelen for sin egen type (People Edit / tillatelse for konfidensielle notater, ledere av gruppen, arrangementsseere, seere av arbeidsflytkort), slik at kallere kun ser notater de kunne åpnet. Notatteksten kuttes til 300 tegn |
| GET | `/current/:churchId/:contentType/:contentId` | Offentlig | — | Hent eller opprett gjeldende samtale for innhold (dekrypterer contentId automatisk) |
| GET | `/:churchId/:contentType/:contentId` | Offentlig | — | Last samtaler etter innholdstype og ID |
| GET | `/:churchId/:id` | Offentlig | — | Last en enkelt samtale etter ID |
| POST | `/` | JWT | — | Opprett eller oppdater samtaler (batch) |
| POST | `/start` | JWT | — | Start en ny samtale med en innledende kommentarmelding |
| DELETE | `/:churchId/:id` | JWT | — | Slett en samtale |

### Tilgangskontroll for personnotater

Samtaler med `contentType: "person"` (fanen Notes på en personpost) eller `contentType: "personConfidential"` (seksjonen Confidential Notes) er låst på alle lese- og skrivebaner, også de offentlige rutene over, som returnerer `401` for disse innholdstypene. `person` krever tillatelsen **People / Edit** i MembershipApi; `personConfidential` krever **People / View Confidential Notes**. For API-nøkler med begrenset omfang gir `people:write` begge handlingene (brukeren for nøkkelen må fortsatt ha den underliggende rolletillatelsen).

### Tilgangskontroll for gruppe- og arrangementsnotater {#group-and-event-notes-access-control}

To ytterligere innholdstyper for notater er låst på samme måte, på alle lese- og skrivebaner (også de offentlige rutene over), og er aldri åpne for anonym publisering:

- **`groupNote`** (`contentId` = gruppe-ID) -- feeden **Leader notes** på en gruppe. Bare gruppens ledere (`leaderGroupIds` i JWT) kan lese eller publisere. Ingen personaltillatelse gir tilgang, inkludert `content.edit` og gruppemedlemstillatelsene.
- **`eventNote`** (`contentId` = arrangements-ID) -- notatene på et kalenderarrangement. Personale med `content.edit` eller **Calendars / Admin** kan alltid lese og publisere. Ellers følger tilgangen arrangementets `notesViewRole` (lesing) og `notesPostRole` (publisering): `staff` (standard, brukes når feltet er `null`) gir ingen andre tilgang, `leaders` gir tilgang til ledere av arrangementets gruppe, og `members` gir tilgang til medlemmer og ledere av arrangementets gruppe. Et arrangement uten `groupId` er kun for personale.

### Tilgangskontroll for notater på arbeidsflytkort

Samtaler med `contentType: "workflowCard"` (notatene på et arbeidsflytkort, der `contentId` er kortets oppgave-ID) kan bare leses og skrives av noen som kan åpne kortet: en bruker med tillatelsen **Tasks / View** i DoingApi, eller personen eller gruppen kortet er tildelt, opprettet av eller handler om. Alle andre får `401` på alle lesebaner, også de offentlige rutene over. En kortsamtale knyttes til kortet selv med `POST /doing/tasks/:id/conversation` (body `{ "conversationId": "..." }`; den første samtalen som knyttes, gjelder), og det kan kortets redigerere og ansvarlige kalle.

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

Basissti: `/messaging/messages`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Last alle meldinger for en samtale |
| GET | `/catchup/:churchId/:conversationId` | Offentlig | — | Last alle meldinger for en samtale (offentlig innhenting for direktechat) |
| GET | `/:churchId/:id` | Offentlig | — | Last en enkelt melding etter ID |
| POST | `/` | JWT | — | Lagre meldinger (batch). Sender sanntidsoppdateringer og utløser varsler. Å oppdatere en eksisterende melding krever at man er forfatteren eller har `content.edit`. Den lagrede forfatteren kan aldri endres |
| POST | `/send` | Offentlig | — | Send meldinger (batch, offentlig). Sender sanntidsoppdateringer via WebSocket og utløser varsler |
| POST | `/setCallout` | JWT | — | (utdatert) Kringkast en fremhevet melding i sanntid. Ingen aktiv klient; direktestrømmet chat viser ikke lenger fremhevede meldinger |
| DELETE | `/:churchId/:id` | JWT | — | Slett en melding og kringkast slettingen i sanntid. Se [Moderering av meldinger](#message-moderation) |

### Moderering av meldinger {#message-moderation}

Du kan slette en melding hvis du er:

- forfatteren av meldingen;
- personale med `content.edit` (hvor som helst i kirken);
- **gruppeleder**, for samtaler med `contentType` `group` eller `groupAnnouncement` der `contentId` er en gruppe du leder (`leaderGroupIds` i JWT).

Samtaler med personnotater (`person` / `personConfidential`) modereres aldri av ledere. De bruker i stedet tillatelsene for notater (`people.edit`, `people.viewConfidentialNotes`).

Ledere kan bare slette, ikke redigere. Å skrive om en annen medlems melding er fortsatt begrenset til forfatteren og personale med `content.edit`.

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

Basissti: `/messaging/privatemessages`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/` | JWT | — | Last alle private meldinger for den nåværende brukeren (inkluderer siste melding per samtale, og markerer alle som lest) |
| GET | `/existing/:personId` | JWT | — | Finn en eksisterende privat samtale med en bestemt person |
| GET | `/:id` | JWT | — | Last en privat melding etter ID (fjerner varselet hvis meldingen er adressert til den nåværende brukeren) |
| POST | `/` | JWT | — | Send private meldinger (batch). Utløser push-varsel til mottakeren |

## Varsler

Basissti: `/messaging/notifications`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Hent antall uleste varsler for den nåværende brukeren |
| GET | `/my` | JWT | — | Last alle varsler for den nåværende brukeren (markerer alle som lest) |
| GET | `/tmpEmail` | Offentlig | — | Utløs det daglige e-postsammendraget av varsler (feilsøkings- eller cron-endepunkt) |
| GET | `/:churchId/person/:personId` | JWT | — | Last varsler for en bestemt person |
| GET | `/:churchId/:id` | JWT | — | Last et varsel etter ID |
| POST | `/` | JWT | — | Opprett eller oppdater varsler (batch) |
| POST | `/create` | JWT | — | Opprett varsler for flere personer. Body: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Marker alle varsler som lest for en person |
| POST | `/sendTest` | JWT | — | Send et testvarsel via push. Body: `{ personId, title }` |
| POST | `/ping` | Offentlig | — | Opprett et varsel fra en ekstern utløser. Body: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Slett et varsel |

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

## Varselinnstillinger

Basissti: `/messaging/notificationpreferences`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/categories` | JWT | — | Liste varselkategorier med standard- og tillatte kanaler |
| GET | `/my` | JWT | — | Last varselinnstillinger for den nåværende brukeren (oppretter standardverdier automatisk hvis ingen finnes) |
| POST | `/` | JWT | — | Lagre den nåværende brukerens innstillinger. Body: en eller flere av `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, pluss valgfri `overrides: [{ categoryKey, channel, optedIn }]` (channel kan være `push`, `email`, `in_app` eller `sms`; låste kategorier ignoreres). `allowSms` er medlemmets samtykke til tekstpåminnelser. En eldre body med en matrise av rader godtas fortsatt |

## Tilkoblinger

Basissti: `/messaging/connections`

Håndterer WebSocket-/sanntidstilkoblinger for chat, gruppesamtaler, private meldinger og direktestrømming. Se [Sanntidsarkitektur](../../realtime) for hele protokollen.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/:churchId/:conversationId` | Offentlig | — | Last alle tilkoblinger for en samtale |
| POST | `/` | Offentlig | — | Registrer tilkoblinger (batch). Utløser en kringkasting av oppmøte i samtalen. Elementer i body: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Offentlig | — | Oppdater visningsnavnet for en tilkobling etter socket-ID. Body: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Offentlig | — | Fjern en tilkobling fra en samtale. Utløser en kringkasting av oppmøte |
| POST | `/tmpSendAlert` | Offentlig | — | Send et varsel til tilkoblingene til en person. Body: `{ churchId, personId }` |

## Enheter

Basissti: `/messaging/devices`

Håndterer registrering av enheter for push-varsler og innholdsparing (for eksempel Lessons-appen på TV-skjermer).

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| POST | `/enroll` | JWT | — | Registrer eller oppdater en enhet (registrering for mobil push). Matcher etter FCM-token eller enhets-ID |
| POST | `/enrollAnon` | Offentlig | — | Registrer en anonym enhet og generer en paringskode på 4 tegn |
| POST | `/` | Offentlig | — | Lagre enheter (batch) |
| GET | `/pair/:pairingCode` | JWT | — | Par en enhet med paringskoden. Valgfritt `?contentType=&contentId=` for å tildele innhold |
| GET | `/status/:deviceId` | Offentlig | — | Sjekk paringsstatusen til en enhet |
| GET | `/:churchId` | JWT | — | Last alle enheter for en kirke |
| GET | `/:churchId/person/:personId` | JWT | — | Last alle enheter for en person |
| GET | `/:churchId/:id` | JWT | — | Last en enhet etter ID |
| DELETE | `/:churchId/:id` | JWT | — | Slett en enhet |

### Eksempel: Registrer en enhet

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

## Innhold på enheter

Basissti: `/messaging/devicecontents`

Håndterer innholdstilordninger for parede enheter (for eksempel hvilken leksjon som vises på en TV).

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Last innholdstilordninger for en enhet |
| POST | `/` | JWT | — | Lagre innholdstilordninger for enheter (batch) |
| DELETE | `/:id` | JWT | — | Slett en innholdstilordning for en enhet |

## Tekstmeldinger

Basissti: `/messaging/texting`

Håndterer leverandører av SMS, gruppetekstmeldinger og sporing av levering.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/providers` | JWT | — | Last leverandører av tekstmeldinger for kirken (legitimasjon er maskert) |
| GET | `/status` | JWT | — | `{ enabled }` — om kirken har en aktivert leverandør av tekstmeldinger. Gjelder enhver innlogget kirkebruker. Brukes til å vise alternativene **Text** bare når tekstmeldinger kan sendes |
| GET | `/inboundUrl` | JWT | `texting.send` eller `settings.edit` | `{ url }` — kirkens webhook-URL for innkommende meldinger (STOP), som limes inn hos leverandøren |
| POST | `/inbound/:churchId/:token` | Offentlig | — | Webhook for innkommende meldinger fra leverandør. `token` er en HMAC av kirke-ID-en. Et svar som er nøyaktig et stoppord (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`) markerer hver matchende person som `optedOut` og slår av `allowSms` for dem. Returnerer `{ optedOut: <count> }`. Andre svar returnerer `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | Forhåndsvis mottakere av en gruppetekst (antall som kan motta, reservert, uten telefonnummer) |
| GET | `/sent` | JWT | — | Last alle registrerte sendte tekstmeldinger for kirken |
| GET | `/sent/:id/details` | JWT | — | Last en sendt tekstmelding med leveringslogg per mottaker |
| POST | `/providers` | JWT | — | Lagre leverandører av tekstmeldinger (batch). Krypterer API-legitimasjon |
| POST | `/send` | JWT | — | Send en SMS til alle kvalifiserte medlemmer i en gruppe. Body: `{ groupId, message }`. Flettefelt (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) løses for hver mottaker |
| POST | `/sendPerson` | JWT | — | Send en SMS til en enkelt person. Body: `{ personId, phoneNumber, message }`. Flettefelt løses, og den løste teksten er det som logges |
| DELETE | `/providers/:id` | JWT | — | Slett en leverandør av tekstmeldinger |

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

Basissti: `/messaging/emailTemplates`

Håndterer gjenbrukbare e-postmaler og sending av malbaserte e-poster til grupper.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/` | JWT | — | Last alle e-postmaler for kirken |
| GET | `/:id` | JWT | — | Last en enkelt e-postmal etter ID |
| GET | `/sendStatus` | JWT | `groupMembers.edit` eller `tasks.admin` | Kirkens status for gruppe-e-post: `{ approved, paused, remaining, requested }`. Dialogen Send Email i B1Admin og arbeidsflyt-handlingen **Send email** bruker den til å advare når e-post ikke kommer til å gå ut |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | Be støtte om å godkjenne kirken for gruppe-e-post (høyst én gang per kirke per uke) |
| GET | `/preview/:groupId` | JWT | — | Forhåndsvis e-postlevering for en gruppe (antall mottakere som kan motta, medlemmer uten e-post) |
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

Basissti: `/messaging/blockedips`

(utdatert) IP-blokkering for direktestrømmet chat. Klienten i B1App kaller ikke lenger `POST /` — IP-blokkering ble fjernet i migreringen til samlet levering. Ruten `/clear` kalles fortsatt server-til-server av `StreamingServiceController` når direktestrømmede gudstjenester lagres.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| POST | `/` | JWT | — | (utdatert) Lagre blokkerte IP-adresser (batch). Ingen aktiv klient |
| POST | `/clear` | JWT | — | Fjern alle blokkerte IP-adresser for bestemte gudstjenester. Body: `[{ serviceId, churchId }]` |

## Leveringslogger

Basissti: `/messaging/deliverylogs`

Sporer leveringsstatus for sendte meldinger (SMS, push-varsler, e-post).

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Last leveringslogger etter innholdstype og ID |
| GET | `/person/:personId` | JWT | — | Last leveringslogger for en person. Valgfrie filtre `?startDate=&endDate=` |
| GET | `/recent` | JWT | — | Last nylige leveringslogger for kirken. Valgfri `?limit=` (standard 100) |
| GET | `/:id` | JWT | — | Last en leveringslogg etter ID |

## Relaterte sider

- [Sanntidsarkitektur](../../realtime) -- WebSocket-protokoll, rombetaling og det samlede leveringsrammeverket
- [Web-push-varsler](../../web-push) -- Registrering og levering av push i nettleser
- [Medlemskapsendepunkter](./membership) -- Personer, grupper, roller og kjernens identitet
- [Endepunkter for oppmøte](./attendance) -- Sporing av gudstjenester og besøk
- [Autentisering og tillatelser](./authentication) -- Innloggingsflyt, JWT, OAuth, tillatelsesmodell
- [Modulstruktur](../module-structure) -- Mønstre for kodeorganisering
