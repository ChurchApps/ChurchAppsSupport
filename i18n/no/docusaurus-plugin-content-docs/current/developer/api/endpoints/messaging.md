---
title: "Endepunkter for meldinger"
description: "Referanse for ChurchApps API-endepunkter for meldinger: samtaler, tilgangsregler for notater, tekstmeldinger, e-postmaler, varsler og enheter."
---

# Endepunkter for meldinger

<div class="article-intro">

Meldingsmodulen håndterer sanntidssamtaler, chatmeldinger, push-varsler, levering av SMS og e-post, WebSocket-tilkoblinger, private meldinger, registrering av enheter og leverandører av tekstmeldinger. Den gir kommunikasjonslaget som brukes på tvers av alle ChurchApps-applikasjoner, både for direktestrøms-chat og asynkrone varsler.

</div>

**Grunnsti:** `/messaging`

## Samtaler

Grunnsti: `/messaging/conversations`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Last samtaler etter kommaseparerte ID-er, med første og siste melding |
| GET | `/messages/:contentType/:contentId` | JWT | — | Last samtaler for innhold med paginerte meldinger (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Hent innleggssamtaler for den innloggede brukerens grupper |
| GET | `/posts/group/:groupId` | JWT | — | Hent innleggssamtaler for en bestemt gruppe |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | Nyeste notater på tvers av alle poster for siden Notater i B1 Admin. `section` er `people`, `groups`, `events` eller `workflows` (400 ellers). `limit` er 25 som standard (maks 100). `before` er markøren fra forrige side. Hvert notat må fortsatt oppfylle regelen for sin egen type (tillatelse for personredigering eller konfidensielle notater, gruppeledere, arrangementsseere, seere av arbeidsflytkort), slik at kallere bare ser notater de ville kunne åpne. Notatteksten kuttes etter 300 tegn |
| GET | `/current/:churchId/:contentType/:contentId` | Offentlig | — | Hent eller opprett gjeldende samtale for innhold (dekrypterer contentId automatisk) |
| GET | `/:churchId/:contentType/:contentId` | Offentlig | — | Last samtaler etter innholdstype og ID |
| GET | `/:churchId/:id` | Offentlig | — | Last én samtale etter ID |
| POST | `/` | JWT | — | Opprett eller oppdater samtaler (batch) |
| POST | `/start` | JWT | — | Start en ny samtale med en innledende kommentarmelding |
| DELETE | `/:churchId/:id` | JWT | — | Slett en samtale |

### Tilgangskontroll for personnotater

Samtaler med `contentType: "person"` (fanen Notater på en person) eller `contentType: "personConfidential"` (delen Konfidensielle notater) er låst på alle lese- og skrivestier, inkludert de offentlige rutene over. Disse returnerer `401` for disse innholdstypene. `person` krever MembershipApi-tillatelsen **Personer / Rediger**. `personConfidential` krever **Personer / Vis konfidensielle notater**. For API-nøkler med begrenset omfang gir `people:write` begge handlingene. Brukeren som eier nøkkelen må fortsatt ha tillatelsen til den underliggende rollen.

### Tilgangskontroll for gruppe- og arrangementsnotater {#group-and-event-notes-access-control}

To andre notattyper er låst på samme måte, på alle lese- og skrivestier (inkludert de offentlige rutene over), og de er aldri åpne for anonyme innlegg:

- **`groupNote`** (`contentId` = gruppe-ID) – feeden **Lederens notater** på en gruppe. Bare gruppens ledere (`leaderGroupIds` i JWT) kan lese eller skrive innlegg. Ingen stillingstillatelse gir tilgang, heller ikke `content.edit` eller tillatelsene for gruppemedlemskap.
- **`eventNote`** (`contentId` = arrangement-ID) – notatene på en kalenderhendelse. Ansatte med `content.edit` eller **Kalendere / Admin** kan alltid lese og legge inn. Ellers følger tilgangen arrangementets `notesViewRole` (lesing) og `notesPostRole` (innlegg): `staff` (standard, brukes når feltet er `null`) gir ingen andre tilgang, `leaders` gir tilgang til ledere i arrangementets gruppe, og `members` gir tilgang til medlemmer og ledere i arrangementets gruppe. Et arrangement uten `groupId` er bare for ansatte.

### Tilgangskontroll for notater på arbeidsflytkort

Samtaler med `contentType: "workflowCard"` (notatene på et arbeidsflytkort, der `contentId` er kortets oppgave-ID) kan bare leses og skrives av den som kan åpne kortet. Det er en bruker med DoingApi-tillatelsen **Oppgaver / Vis**, eller personen eller gruppen kortet er tildelt, opprettet av eller gjelder. Alle andre får `401` på alle leseveier, inkludert de offentlige rutene over. En kortsamtale knyttes til selve kortet med `POST /doing/tasks/:id/conversation` (body `{ "conversationId": "..." }`). Den første samtalen som knyttes, gjelder. Kortets redigerere og den tildelte kan kalle dette endepunktet.

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

Grunnsti: `/messaging/messages`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Last alle meldinger i en samtale |
| GET | `/catchup/:churchId/:conversationId` | Offentlig | — | Last alle meldinger i en samtale (offentlig innhenting for direktechat) |
| GET | `/:churchId/:id` | Offentlig | — | Last én melding etter ID |
| POST | `/` | JWT | — | Lagre meldinger (batch). Sender sanntidsoppdateringer og utløser varsler. Å oppdatere en eksisterende melding krever at du er forfatteren eller har `content.edit`. Den lagrede forfatteren kan aldri endres |
| POST | `/send` | Offentlig | — | Send meldinger (batch, offentlig). Sender sanntidsoppdateringer via WebSocket og utløser varsler |
| POST | `/setCallout` | JWT | — | (eldre) Kringkast en fremhevet melding i sanntid. Ingen aktiv klient. Livestrøm-chat viser ikke lenger fremhevinger |
| DELETE | `/:churchId/:id` | JWT | — | Slett en melding og kringkast slettingen i sanntid. Se [Moderering av meldinger](#message-moderation) |

### Moderering av meldinger

Du kan slette en melding hvis du er:

- forfatteren av meldingen;
- ansatt med `content.edit` (hvor som helst i menigheten);
- **gruppeleder**, for samtaler med `contentType` `group` eller `groupAnnouncement` der `contentId` er en gruppe du leder (`leaderGroupIds` i JWT).

Personnotat-samtaler (`person` / `personConfidential`) modereres aldri av ledere. De bruker i stedet notattillatelsene (`people.edit`, `people.viewConfidentialNotes`).

Ledere kan bare slette, ikke redigere. Å skrive om en annen medlems melding er fortsatt begrenset til forfatteren og ansatte med `content.edit`.

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

Grunnsti: `/messaging/privatemessages`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/` | JWT | — | Last alle private meldinger for den innloggede brukeren (inkluderer siste melding per samtale og markerer alle som lest) |
| GET | `/existing/:personId` | JWT | — | Finn en eksisterende privat samtale med en bestemt person |
| GET | `/:id` | JWT | — | Last en privat melding etter ID (fjerner varselet hvis meldingen er adressert til innlogget bruker) |
| POST | `/` | JWT | — | Send private meldinger (batch). Utløser push-varsel til mottakeren |

## Varsler

Grunnsti: `/messaging/notifications`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Hent antall uleste varsler for den innloggede brukeren |
| GET | `/my` | JWT | — | Last alle varsler for den innloggede brukeren (markerer alle som lest) |
| GET | `/tmpEmail` | Offentlig | — | Utløs den daglige e-postoppsummeringen av varsler (feilsøkings- og cron-endepunkt) |
| GET | `/:churchId/person/:personId` | JWT | — | Last varsler for en bestemt person |
| GET | `/:churchId/:id` | JWT | — | Last et varsel etter ID |
| POST | `/` | JWT | — | Opprett eller oppdater varsler (batch) |
| POST | `/create` | JWT | — | Opprett varsler for flere personer. Body: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Merk alle varsler som lest for en person |
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

Grunnsti: `/messaging/notificationpreferences`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/categories` | JWT | — | List varselkategorier med standard og tillatte kanaler |
| GET | `/my` | JWT | — | Last varselinnstillingene for den innloggede brukeren (oppretter standardverdier automatisk hvis ingen finnes) |
| POST | `/` | JWT | — | Lagre den innloggede brukerens innstillinger. Body: en eller flere av `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, pluss valgfri `overrides: [{ categoryKey, channel, optedIn }]` (channel kan være `push`, `email`, `in_app` eller `sms`; låste kategorier ignoreres). `allowSms` er medlemmets samtykke til tekstpåminnelser. En eldre body med en liste av rader godtas fortsatt |

## Tilkoblinger

Grunnsti: `/messaging/connections`

Administrerer WebSocket- og sanntidstilkoblinger for chat, gruppesamtaler, private meldinger og livestrømming. Se [Sanntidsarkitektur](../../realtime.md) for hele protokollen.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/:churchId/:conversationId` | Offentlig | — | Last alle tilkoblinger for en samtale |
| POST | `/` | Offentlig | — | Registrer tilkoblinger (batch). Utløser en oppmøtekringkasting for samtalen. Elementer i body: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Offentlig | — | Oppdater visningsnavnet for en tilkobling etter socket-ID. Body: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Offentlig | — | Fjern en tilkobling fra en samtale. Utløser en oppmøtekringkasting |
| POST | `/tmpSendAlert` | Offentlig | — | Send et varsel til en persons tilkoblinger. Body: `{ churchId, personId }` |

## Enheter

Grunnsti: `/messaging/devices`

Administrerer enhetsregistrering for push-varsler og innholdsparing (f.eks. Lessons-appen på TV-skjermer).

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| POST | `/enroll` | JWT | — | Registrer eller oppdater en enhet (registrering av mobil push). Treffer på FCM-token eller enhets-ID |
| POST | `/enrollAnon` | Offentlig | — | Registrer en anonym enhet og generer en paringskode på 4 tegn |
| POST | `/` | Offentlig | — | Lagre enheter (batch) |
| GET | `/pair/:pairingCode` | JWT | — | Par en enhet med paringskoden. Valgfritt `?contentType=&contentId=` for å tilordne innhold |
| GET | `/status/:deviceId` | Offentlig | — | Sjekk paringsstatus for en enhet |
| GET | `/:churchId` | JWT | — | Last alle enheter for en menighet |
| GET | `/:churchId/person/:personId` | JWT | — | Last alle enheter for en person |
| GET | `/:churchId/:id` | JWT | — | Last en enhet etter ID |
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

## Enhetsinnhold

Grunnsti: `/messaging/devicecontents`

Administrerer innholdstilordninger for parede enheter (f.eks. hvilken leksjon som vises på en TV).

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Last innholdstilordninger for en enhet |
| POST | `/` | JWT | — | Lagre innholdstilordninger for enheter (batch) |
| DELETE | `/:id` | JWT | — | Slett en innholdstilordning for en enhet |

## Tekstmeldinger

Grunnsti: `/messaging/texting`

Administrerer leverandører av SMS-tjenester, gruppetekstmeldinger og sporing av levering.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/providers` | JWT | — | Last tekstmeldingsleverandører for menigheten (legitimasjon er maskert) |
| GET | `/status` | JWT | — | `{ enabled }` – om menigheten har en aktivert leverandør for tekstmeldinger. Gjelder alle innloggede medlemmer av menigheten. Brukes til å vise alternativene **Tekst** bare når tekstmeldinger kan sendes |
| GET | `/inboundUrl` | JWT | `texting.send` eller `settings.edit` | `{ url }` – menighetens innkommende (STOP-) webhook-URL som limes inn hos leverandøren |
| POST | `/inbound/:churchId/:token` | Offentlig | — | Webhook for innkommende meldinger fra leverandøren. `token` er en HMAC av menighets-ID-en. Et svar som er nøyaktig et stoppord (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`) merker alle matchende personer som `optedOut` og slår av deres `allowSms`. Returnerer `{ optedOut: <count> }`. Andre svar gir `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | Forhåndsvis mottakere for en gruppetekst (antall kvalifiserte, reserverte og uten telefonnummer) |
| GET | `/sent` | JWT | — | Last alle sendte tekstmeldingsposter for menigheten |
| GET | `/sent/:id/details` | JWT | — | Last en sendt tekstmelding med leveringslogger per mottaker |
| POST | `/providers` | JWT | — | Lagre tekstmeldingsleverandører (batch). Krypterer API-legitimasjon |
| POST | `/send` | JWT | — | Send en SMS til alle kvalifiserte medlemmer i en gruppe. Body: `{ groupId, message }`. Flettefelt (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) løses for hver mottaker |
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

Grunnsti: `/messaging/emailTemplates`

Administrerer gjenbrukbare e-postmaler og sending av malbaserte e-poster til grupper.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/` | JWT | — | Last alle e-postmaler for menigheten |
| GET | `/:id` | JWT | — | Last en e-postmal etter ID |
| GET | `/sendStatus` | JWT | `groupMembers.edit` eller `tasks.admin` | Menighetens status for gruppe-e-post: `{ approved, paused, remaining, requested }`. Dialogen Send e-post i B1Admin og arbeidsflyt-handlingen **Send e-post** bruker den til å varsle når e-post ikke vil bli sendt |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | Be support om å godkjenne menigheten for gruppe-e-post (høyst én gang per menighet per uke) |
| GET | `/preview/:groupId` | JWT | — | Forhåndsvis e-postlevering for en gruppe (antall mottakere som kan få e-post, medlemmer uten e-postadresse) |
| POST | `/` | JWT | — | Opprett eller oppdater e-postmaler (batch) |
| POST | `/send` | JWT | — | Send en malbasert e-post til alle medlemmer i en gruppe. Body: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Slett en e-postmal |

### Eksempel: Send e-post til gruppe

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

Grunnsti: `/messaging/blockedips`

(eldre) IP-blokkering for chat i livestrømming. B1App-klienten kaller ikke lenger `POST /`. IP-blokkering ble fjernet i migreringen til enhetlig levering. Ruten `/clear` kalles fortsatt server-til-server av `StreamingServiceController` når strømmetjenester lagres.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| POST | `/` | JWT | — | (eldre) Lagre blokkerte IP-adresser (batch). Ingen aktiv klient |
| POST | `/clear` | JWT | — | Fjern alle blokkerte IP-adresser for bestemte tjenester. Body: `[{ serviceId, churchId }]` |

## Leveringslogger

Grunnsti: `/messaging/deliverylogs`

Sporer leveringsstatus for sendte meldinger (SMS, push-varsler og e-post).

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Last leveringslogger etter innholdstype og ID |
| GET | `/person/:personId` | JWT | — | Last leveringslogger for en person. Valgfrie `?startDate=&endDate=` filtrerer resultatet |
| GET | `/recent` | JWT | — | Last nylige leveringslogger for menigheten. Valgfri `?limit=` (standard 100) |
| GET | `/:id` | JWT | — | Last en leveringslogg etter ID |

## Relaterte sider

- [Sanntidsarkitektur](../../realtime.md) -- WebSocket-protokoll, romabonnement og det enhetlige leveringsrammeverket
- [Push-varsler i nettleser](../../web-push.md) -- Registrering og levering av push i nettleseren
- [Endepunkter for medlemskap](./membership.md) -- Personer, grupper, roller og kjerneidentitet
- [Endepunkter for oppmøte](./attendance.md) -- Sporing av gudstjenester og besøk
- [Autentisering og tillatelser](./authentication.md) -- Innloggingsflyt, JWT, OAuth og tillatelsesmodell
- [Modulstruktur](../module-structure.md) -- Mønstre for kodeorganisering
