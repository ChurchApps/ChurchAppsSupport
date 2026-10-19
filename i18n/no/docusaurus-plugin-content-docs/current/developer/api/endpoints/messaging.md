---
title: "Meldingsendepunkter"
---

# Meldingsendepunkter

<div class="article-intro">

Meldingsmodulen håndterer sanntidssamtaler, chattemeldinger, push-varsler, SMS- og e-postlevering, WebSocket-forbindelser, private meldinger, enhetsregistrering og tekstmeldingsleverandører. Den gir kommunikasjonslaget som brukes på tvers av alle ChurchApps-applikasjoner, både for direktesendingschat og asynkrone varsler.

</div>

**Basissti:** `/messaging`

## Samtaler

Basissti: `/messaging/conversations`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Last inn samtaler etter kommaseparerte ID-er, med første/siste meldinger |
| GET | `/messages/:contentType/:contentId` | JWT | — | Last inn samtaler for innhold med paginerte meldinger (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Hent innleggssamtaler for gjeldende brukers grupper |
| GET | `/posts/group/:groupId` | JWT | — | Hent innleggssamtaler for en bestemt gruppe |
| GET | `/current/:churchId/:contentType/:contentId` | Offentlig | — | Hent eller opprett gjeldende samtale for innhold (dekrypterer contentId automatisk) |
| GET | `/:churchId/:contentType/:contentId` | Offentlig | — | Last inn samtaler etter innholdstype og ID |
| GET | `/:churchId/:id` | Offentlig | — | Last inn én samtale etter ID |
| POST | `/` | JWT | — | Opprett eller oppdater samtaler (batch) |
| POST | `/start` | JWT | — | Start en ny samtale med en innledende kommentar |
| DELETE | `/:churchId/:id` | JWT | — | Slett en samtale |

### Tilgangskontroll for personnotater

Samtaler med `contentType: "person"` (fanen Notater på en personpost) eller `contentType: "personConfidential"` (seksjonen Konfidensielle notater) er låst på alle lese- og skrivestier, også de ellers offentlige rutene over, som returnerer `401` for disse innholdstypene. `person` krever MembershipApi-tillatelsen **People / Edit**; `personConfidential` krever **People / View Confidential Notes**. For API-nøkler med begrenset omfang gir `people:write` begge handlingene (brukeren som eier nøkkelen må fortsatt ha den underliggende rolletillatelsen).

### Tilgangskontroll for gruppe- og arrangementsnotater {#group-and-event-notes-access-control}

To notatinnholdstyper til er låst på samme måte, på alle lese- og skrivestier (også de offentlige rutene over), og er aldri åpne for anonym publisering:

- **`groupNote`** (`contentId` = gruppe-ID) -- strømmen **Lederes notater** på en gruppe. Bare den gruppens ledere (`leaderGroupIds` i JWT-en) kan lese eller skrive. Ingen ansatttillatelse gir tilgang, heller ikke `content.edit` og gruppemedlemstillatelsene.
- **`eventNote`** (`contentId` = arrangements-ID) -- notatene på en kalenderhendelse. Ansatte med `content.edit` eller **Calendars / Admin** kan alltid lese og skrive. Ellers følger tilgangen arrangementets `notesViewRole` (lese) og `notesPostRole` (skrive): `staff` (standard, brukes når feltet er `null`) gir ingen andre tilgang, `leaders` gir ledere av arrangementets gruppe tilgang, og `members` gir medlemmer og ledere av arrangementets gruppe tilgang. Et arrangement uten `groupId` er bare for ansatte.

### Tilgangskontroll for notater på arbeidskort

Samtaler med `contentType: "workflowCard"` (notatene på et arbeidskort, der `contentId` er kortets oppgave-ID) kan bare leses og skrives av noen som kan åpne kortet: en bruker med DoingApi-tillatelsen **Tasks / View**, eller personen eller gruppen kortet er tildelt, opprettet av eller handler om. Alle andre får `401` på alle lesestier, også de offentlige rutene over. En kortsamtale knyttes til kortet selv med `POST /doing/tasks/:id/conversation` (body `{ "conversationId": "..." }`; den første samtalen som knyttes, vinner), og det kan kalles av kortets redaktører og den som er tildelt kortet.

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
| GET | `/conversation/:conversationId` | JWT | — | Last inn alle meldinger for en samtale |
| GET | `/catchup/:churchId/:conversationId` | Offentlig | — | Last inn alle meldinger for en samtale (offentlig innhenting for direktechat) |
| GET | `/:churchId/:id` | Offentlig | — | Last inn én melding etter ID |
| POST | `/` | JWT | — | Lagre meldinger (batch). Sender sanntidsoppdateringer og utløser varsler. Å oppdatere en eksisterende melding krever at du er forfatteren eller har `content.edit`; lagret forfatter kan aldri endres |
| POST | `/send` | Offentlig | — | Send meldinger (batch, offentlig). Sender sanntidsoppdateringer via WebSocket og utløser varsler |
| POST | `/setCallout` | JWT | — | (eldre) Kringkast en fremhevet melding i sanntid. Ingen aktiv klient; chat i direktesending viser ikke lenger fremhevinger |
| DELETE | `/:churchId/:id` | JWT | — | Slett en melding og kringkast slettingen i sanntid. Se [Moderering av meldinger](#message-moderation) |

### Moderering av meldinger {#message-moderation}

Å slette en melding er tillatt for:

- forfatteren av meldingen;
- ansatte med `content.edit` (hvor som helst i kirken);
- **gruppeledere**, for samtaler med `contentType` `group` eller `groupAnnouncement` der `contentId` er en gruppe de leder (`leaderGroupIds` i JWT-en).

Personnotat-samtaler (`person` / `personConfidential`) modereres aldri av ledere -- de bruker i stedet notattillatelsene (`people.edit`, `people.viewConfidentialNotes`).

Ledere får bare slette, ikke redigere: å skrive om et annet medlems melding er fortsatt begrenset til forfatteren og ansatte med `content.edit`.

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
| GET | `/` | JWT | — | Last inn alle private meldinger for gjeldende bruker (inkluderer siste melding per samtale, og markerer alle som lest) |
| GET | `/existing/:personId` | JWT | — | Finn en eksisterende privat samtale med en bestemt person |
| GET | `/:id` | JWT | — | Last inn en privat melding etter ID (fjerner varselet hvis den er adressert til gjeldende bruker) |
| POST | `/` | JWT | — | Send private meldinger (batch). Utløser push-varsel til mottakeren |

## Varsler

Basissti: `/messaging/notifications`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Hent antall uleste varsler for gjeldende bruker |
| GET | `/my` | JWT | — | Last inn alle varsler for gjeldende bruker (markerer alle som lest) |
| GET | `/tmpEmail` | Offentlig | — | Utløs det daglige e-postsammendraget av varsler (feilsøkings-/cron-endepunkt) |
| GET | `/:churchId/person/:personId` | JWT | — | Last inn varsler for en bestemt person |
| GET | `/:churchId/:id` | JWT | — | Last inn et varsel etter ID |
| POST | `/` | JWT | — | Opprett eller oppdater varsler (batch) |
| POST | `/create` | JWT | — | Opprett varsler for flere personer. Body: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Marker alle varsler som lest for en person |
| POST | `/sendTest` | JWT | — | Send et test-push-varsel. Body: `{ personId, title }` |
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
| GET | `/categories` | JWT | — | List varselkategorier med standard- og tillatte kanaler |
| GET | `/my` | JWT | — | Last inn varselinnstillinger for gjeldende bruker (oppretter standardverdier automatisk hvis ingen finnes) |
| POST | `/` | JWT | — | Lagre gjeldende brukers innstillinger. Body: en eller flere av `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, pluss valgfri `overrides: [{ categoryKey, channel, optedIn }]` (kanal kan være `push`, `email`, `in_app` eller `sms`; låste kategorier ignoreres). `allowSms` er medlemmets samtykke til tekstpåminnelser. En eldre body med en matrise av rader godtas fortsatt |

## Tilkoblinger

Basissti: `/messaging/connections`

Administrerer WebSocket-/sanntidsforbindelser for chat, gruppesamtaler, private meldinger og direktesending. Se [Sanntidsarkitektur](../../realtime) for den fullstendige protokollen.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/:churchId/:conversationId` | Offentlig | — | Last inn alle tilkoblinger for en samtale |
| POST | `/` | Offentlig | — | Registrer tilkoblinger (batch). Utløser en oppmøtekringkasting på samtalen. Elementer i body: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Offentlig | — | Oppdater visningsnavnet for en tilkobling etter socket-ID. Body: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Offentlig | — | Fjern en tilkobling fra en samtale. Utløser en oppmøtekringkasting |
| POST | `/tmpSendAlert` | Offentlig | — | Send et varselsvarsel til en persons tilkoblinger. Body: `{ churchId, personId }` |

## Enheter

Basissti: `/messaging/devices`

Administrerer enhetsregistrering for push-varsler og innholdsparing (f.eks. Lessons-appen på TV-skjermer).

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| POST | `/enroll` | JWT | — | Registrer eller oppdater en enhet (registrering av mobil-push). Samsvarer etter FCM-token eller enhets-ID |
| POST | `/enrollAnon` | Offentlig | — | Registrer en anonym enhet og generer en paringskode på 4 tegn |
| POST | `/` | Offentlig | — | Lagre enheter (batch) |
| GET | `/pair/:pairingCode` | JWT | — | Par en enhet med paringskoden. Valgfritt `?contentType=&contentId=` for å tilordne innhold |
| GET | `/status/:deviceId` | Offentlig | — | Sjekk paringsstatusen til en enhet |
| GET | `/:churchId` | JWT | — | Last inn alle enheter for en kirke |
| GET | `/:churchId/person/:personId` | JWT | — | Last inn alle enheter for en person |
| GET | `/:churchId/:id` | JWT | — | Last inn en enhet etter ID |
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

## Enhetsinnhold

Basissti: `/messaging/devicecontents`

Administrerer innholdstilordninger for parede enheter (f.eks. hvilken leksjon som vises på en TV).

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Last inn innholdstilordninger for en enhet |
| POST | `/` | JWT | — | Lagre tilordninger av enhetsinnhold (batch) |
| DELETE | `/:id` | JWT | — | Slett en tilordning av enhetsinnhold |

## Tekstmeldinger

Basissti: `/messaging/texting`

Administrerer SMS-leverandører, gruppetekstmeldinger og leveringssporing.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/providers` | JWT | — | Last inn tekstmeldingsleverandører for kirken (legitimasjon er maskert) |
| GET | `/status` | JWT | — | `{ enabled }` -- om kirken har en aktivert tekstmeldingsleverandør. Alle innloggede kirkebrukere; brukes for å vise alternativene **Tekst** bare når tekstmeldinger kan sendes |
| GET | `/inboundUrl` | JWT | `texting.send` eller `settings.edit` | `{ url }` -- kirkens webhook-URL for innkommende meldinger (STOP) som limes inn hos leverandøren |
| POST | `/inbound/:churchId/:token` | Offentlig | — | Webhook for innkommende meldinger fra leverandøren. `token` er en HMAC av kirke-ID-en. Et svar som er nøyaktig et stoppord (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`) markerer alle samsvarende personer som `optedOut` og slår av deres `allowSms`. Returnerer `{ optedOut: <antall> }`; andre svar returnerer `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | Forhåndsvis mottakere av en gruppetekstmelding (antall som kan motta, reservert, uten telefonnummer) |
| GET | `/sent` | JWT | — | Last inn alle sendte tekstmeldingsposter for kirken |
| GET | `/sent/:id/details` | JWT | — | Last inn en sendt tekstmelding med leveringslogg per mottaker |
| POST | `/providers` | JWT | — | Lagre tekstmeldingsleverandører (batch). Krypterer API-legitimasjon |
| POST | `/send` | JWT | — | Send en SMS til alle som kan motta i en gruppe. Body: `{ groupId, message }`. Flettefelt (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) løses per mottaker |
| POST | `/sendPerson` | JWT | — | Send en SMS til én person. Body: `{ personId, phoneNumber, message }`. Flettefelt løses, og den løste teksten er det som logges |
| DELETE | `/providers/:id` | JWT | — | Slett en tekstmeldingsleverandør |

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

Administrerer gjenbrukbare e-postmaler og sending av malbaserte e-poster til grupper.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/` | JWT | — | Last inn alle e-postmaler for kirken |
| GET | `/:id` | JWT | — | Last inn en enkelt e-postmal etter ID |
| GET | `/preview/:groupId` | JWT | — | Forhåndsvis e-postlevering til en gruppe (antall mottakere som kan få e-post, medlemmer uten e-postadresse) |
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

(eldre) IP-blokkering for chat i direktesending. B1App-klienten kaller ikke lenger `POST /` -- IP-blokkering ble fjernet i migreringen til samlet levering. Ruten `/clear` kalles fortsatt server-til-server av `StreamingServiceController` når direktesendingstjenester lagres.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| POST | `/` | JWT | — | (eldre) Lagre blokkerte IP-adresser (batch). Ingen aktiv klient |
| POST | `/clear` | JWT | — | Fjern alle blokkerte IP-adresser for bestemte tjenester. Body: `[{ serviceId, churchId }]` |

## Leveringslogger

Basissti: `/messaging/deliverylogs`

Sporer leveringsstatus for sendte meldinger (SMS, push-varsler, e-post).

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Last inn leveringslogger etter innholdstype og ID |
| GET | `/person/:personId` | JWT | — | Last inn leveringslogger for en person. Valgfritt `?startDate=&endDate=` filtrerer |
| GET | `/recent` | JWT | — | Last inn nylige leveringslogger for kirken. Valgfritt `?limit=` (standard 100) |
| GET | `/:id` | JWT | — | Last inn en leveringslogg etter ID |

## Relaterte sider

- [Sanntidsarkitektur](../../realtime) -- WebSocket-protokoll, romabonnementer og det samlede leveringsrammeverket
- [Web Push-varsler](../../web-push) -- Registrering og levering av push i nettleseren
- [Medlemsendepunkter](./membership) -- Personer, grupper, roller og kjernekonto
- [Oppmøteendepunkter](./attendance) -- Sporing av tjenester og besøk
- [Autentisering og tillatelser](./authentication) -- Innloggingsflyt, JWT, OAuth, tillatelsesmodell
- [Modulstruktur](../module-structure) -- Mønstre for kodeorganisering
