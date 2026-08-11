---
title: "Meldingsendepunkter"
---

# Meldingsendepunkter

<div class="article-intro">

Meldingsmodulen administrerer sanntidssamtaler, chatkjedter, push-meldinger, SMS/e-postlevering, WebSocket-tilkoblinger, private meldinger, enhetsregistrering og tekstingsleverandører. Det gir kommunikasjonslaget som brukes på tvers av alle ChurchApps-programmer for både live streaming chat og asynkrone meldinger.

</div>

**Basisbane:** `/messaging`

## Samtaler

Basisbane: `/messaging/conversations`

| Metode | Bane | Godkjennelse | Tillatelse | Beskrivelse |
|--------|------|-------------|-----------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Last samtaler etter kommaseparerte IDer med første/siste meldinger |
| GET | `/messages/:contentType/:contentId` | JWT | — | Last samtaler for innhold med paginerte meldinger (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Få innlegg-type samtaler for de gjeldende brukergruppenes grupper |
| GET | `/posts/group/:groupId` | JWT | — | Få innlegg-type samtaler for en spesifikk gruppe |
| GET | `/current/:churchId/:contentType/:contentId` | Offentlig | — | Få eller opprett gjeldende samtale for innhold (auto-dekrypterer contentId) |
| GET | `/:churchId/:contentType/:contentId` | Offentlig | — | Last samtaler etter innholdstype og ID |
| GET | `/:churchId/:id` | Offentlig | — | Last en enkelt samtale etter ID |
| POST | `/` | JWT | — | Opprett eller oppdater samtaler (batch) |
| POST | `/start` | JWT | — | Start en ny samtale med en initial kommentarmelding |
| DELETE | `/:churchId/:id` | JWT | — | Slett en samtale |

### Adgangskontroll for personmerknader

Samtaler med `contentType: "person"` (Merknader-fanen på en personoppføring) eller `contentType: "personConfidential"` (Konfidensielle merknader-delen) blir gates på alle les- og skrivebaner, inkludert de offentlige rutene ovenfor, som returnerer `401` for disse innholdstypene. `person` krever MembershipApi **Mennesker / Rediger** tillatelse; `personConfidential` krever **Mennesker / Vis konfidensielle merknader**. For scoped API-nøkler, `people:write` transporterer begge handlinger (nøkkelens bruker må fortsatt holde den underliggende rolletillatelsen).

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

| Metode | Bane | Godkjennelse | Tillatelse | Beskrivelse |
|--------|------|-------------|-----------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Last alle meldinger for en samtale |
| GET | `/catchup/:churchId/:conversationId` | Offentlig | — | Last alle meldinger for en samtale (offentlig opptak for live chat) |
| GET | `/:churchId/:id` | Offentlig | — | Last en enkelt melding etter ID |
| POST | `/` | JWT | — | Lagre meldinger (batch). Sender sanntidsoppdateringer og utløser meldinger |
| POST | `/send` | Offentlig | — | Send meldinger (batch, offentlig). Sender sanntidsoppdateringer via WebSocket og utløser meldinger |
| POST | `/setCallout` | JWT | — | (legacy) Kringkast en kallutmelding i sanntid. Ingen aktiv klient; live streaming chat gir ikke lenger opprop |
| DELETE | `/:churchId/:id` | JWT | — | Slett en melding og kringkast slettingen i sanntid |

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

| Metode | Bane | Godkjennelse | Tillatelse | Beskrivelse |
|--------|------|-------------|-----------|-------------|
| GET | `/` | JWT | — | Last alle private meldinger for gjeldende bruker (inkluderer siste melding per samtale, merker alle som lest) |
| GET | `/existing/:personId` | JWT | — | Finn en eksisterende privat samtale med en spesifikk person |
| GET | `/:id` | JWT | — | Last en privat melding etter ID (fjerner melding hvis adressert til gjeldende bruker) |
| POST | `/` | JWT | — | Send private meldinger (batch). Utløser push-melding til mottaker |

## Meldinger

Basisbane: `/messaging/notifications`

| Metode | Bane | Godkjennelse | Tillatelse | Beskrivelse |
|--------|------|-------------|-----------|-------------|
| GET | `/unreadCount` | JWT | — | Få ulest meldingsantall for gjeldende bruker |
| GET | `/my` | JWT | — | Last alle meldinger for gjeldende bruker (merker alle som lest) |
| GET | `/tmpEmail` | Offentlig | — | Utløs daglig e-post-meldingssamling (debug/cron-endepunkt) |
| GET | `/:churchId/person/:personId` | JWT | — | Last meldinger for en spesifikk person |
| GET | `/:churchId/:id` | JWT | — | Last en melding etter ID |
| POST | `/` | JWT | — | Opprett eller oppdater meldinger (batch) |
| POST | `/create` | JWT | — | Opprett meldinger for flere mennesker. Kropp: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Merk alle meldinger som lest for en person |
| POST | `/sendTest` | JWT | — | Send en test-push-melding. Kropp: `{ personId, title }` |
| POST | `/ping` | Offentlig | — | Opprett en melding fra en ekstern utløser. Kropp: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Slett en melding |

### Eksempel: Opprett meldinger

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

## Meldingspreferanser

Basisbane: `/messaging/notificationpreferences`

Utvider standard CRUD. Baseklassen gir POST `/` (opprett eller oppdater, ingen tillatelse påkrevd).

| Metode | Bane | Godkjennelse | Tillatelse | Beskrivelse |
|--------|------|-------------|-----------|-------------|
| POST | `/` | JWT | — | Opprett eller oppdater meldingspreferanser (fra CRUD-baseklasse) |
| GET | `/my` | JWT | — | Last meldingspreferanser for gjeldende bruker (auto-oppretter standarder hvis ingen eksisterer) |

## Tilkoblinger

Basisbane: `/messaging/connections`

Administrerer WebSocket/sanntidstilkoblinger for chat, gruppsamtaler, private meldinger og live streaming. Se [Sanntidsarkitektur](../../realtime) for protokollen ende-til-ende.

| Metode | Bane | Godkjennelse | Tillatelse | Beskrivelse |
|--------|------|-------------|-----------|-------------|
| GET | `/:churchId/:conversationId` | Offentlig | — | Last alle tilkoblinger for en samtale |
| POST | `/` | Offentlig | — | Registrer tilkoblinger (batch). Utløser kringkasting av deltagelse på samtalen. Kroppen elementer: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Offentlig | — | Oppdater visningsnavnet for en tilkobling etter socket ID. Kropp: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Offentlig | — | Slipp en tilkobling fra en samtale. Utløser kringkasting av deltagelse |
| POST | `/tmpSendAlert` | Offentlig | — | Send en meldingsvarsling til en persons tilkoblinger. Kropp: `{ churchId, personId }` |

## Enheter

Basisbane: `/messaging/devices`

Administrerer enhetsregistrering for push-meldinger og innholdspairing (f.eks. Lessons-app på TV-skjermer).

| Metode | Bane | Godkjennelse | Tillatelse | Beskrivelse |
|--------|------|-------------|-----------|-------------|
| POST | `/enroll` | JWT | — | Registrer eller oppdater en enhet (registrering av mobil push). Samsvarer med FCM-token eller enhet-ID |
| POST | `/enrollAnon` | Offentlig | — | Registrer en anonym enhet og generer en 4-tegns parringskode |
| POST | `/` | Offentlig | — | Lagre enheter (batch) |
| GET | `/pair/:pairingCode` | JWT | — | Pair en enhet ved hjelp av dens parringskode. Valgfritt `?contentType=&contentId=` for å tildele innhold |
| GET | `/status/:deviceId` | Offentlig | — | Sjekk parringsstatus for en enhet |
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

## Enhetsinnhold

Basisbane: `/messaging/devicecontents`

Administrerer innholdsoppdrag for parede enheter (f.eks. hvilken leksjon som vises på en TV).

| Metode | Bane | Godkjennelse | Tillatelse | Beskrivelse |
|--------|------|-------------|-----------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Last innholdsoppdrag for en enhet |
| POST | `/` | JWT | — | Lagre enhetsinnholdsoppdrag (batch) |
| DELETE | `/:id` | JWT | — | Slett et enhetsinnholdsoppdrag |

## Tekstering

Basisbane: `/messaging/texting`

Administrerer SMS-tekstingsleverandører, gruppetext-meldinger og leveringssporing.

| Metode | Bane | Godkjennelse | Tillatelse | Beskrivelse |
|--------|------|-------------|-----------|-------------|
| GET | `/providers` | JWT | — | Last tekstingsleverandører for kirken (legitimasjon er maskert) |
| GET | `/preview/:groupId` | JWT | — | Forhåndsvis mottakere for en gruppetekst (kvalifisert, meldt av, ingen telefon antall) |
| GET | `/sent` | JWT | — | Last alle sendte tekstmeldingsposter for kirken |
| GET | `/sent/:id/details` | JWT | — | Last en sendt tekst med per-mottaker leveringslogger |
| POST | `/providers` | JWT | — | Lagre tekstingsleverandører (batch). Krypterer API-legitimasjon |
| POST | `/send` | JWT | — | Send en SMS til alle kvalifiserte medlemmer av en gruppe. Kropp: `{ groupId, message }` |
| POST | `/sendPerson` | JWT | — | Send en SMS til en enkelt person. Kropp: `{ personId, phoneNumber, message }` |
| DELETE | `/providers/:id` | JWT | — | Slett en tekstingsleverandør |

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

Administrerer gjenbrukbare e-postmaler og sending av templated e-post til grupper.

| Metode | Bane | Godkjennelse | Tillatelse | Beskrivelse |
|--------|------|-------------|-----------|-------------|
| GET | `/` | JWT | — | Last alle e-postmaler for kirken |
| GET | `/:id` | JWT | — | Last en enkelt e-postmal etter ID |
| GET | `/preview/:groupId` | JWT | — | Forhåndsvis e-postlevering for en gruppe (antall kvalifiserte mottakere, medlemmer uten e-post) |
| POST | `/` | JWT | — | Opprett eller oppdater e-postmaler (batch) |
| POST | `/send` | JWT | — | Send en templated e-post til alle medlemmer av en gruppe. Kropp: `{ groupId, subject, htmlContent }` |
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

**Støttede flettfelt:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## Blockerte IP-adresser

Basisbane: `/messaging/blockedips`

(legacy) IP-blokkering for live streaming chat. B1App-klienten kaller ikke lenger `POST /` -- IP-blokkering ble fjernet i den enhetlige leveringsmigringen. `/clear`-ruten blir fortsatt påkalt server-til-server av `StreamingServiceController` når streaming-tjenester lagres.

| Metode | Bane | Godkjennelse | Tillatelse | Beskrivelse |
|--------|------|-------------|-----------|-------------|
| POST | `/` | JWT | — | (legacy) Lagre blockerte IP-adresser (batch). Ingen aktiv klient |
| POST | `/clear` | JWT | — | Fjern alle blockerte IP-adresser for spesifikke tjenester. Kropp: `[{ serviceId, churchId }]` |

## Leveringslogger

Basisbane: `/messaging/deliverylogs`

Sporer leveringsstatus for sendte meldinger (SMS, push-meldinger, e-post).

| Metode | Bane | Godkjennelse | Tillatelse | Beskrivelse |
|--------|------|-------------|-----------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Last leveringslogger etter innholdstype og ID |
| GET | `/person/:personId` | JWT | — | Last leveringslogger for en person. Valgfritt `?startDate=&endDate=` filtre |
| GET | `/recent` | JWT | — | Last nylige leveringslogger for kirken. Valgfritt `?limit=` (standard 100) |
| GET | `/:id` | JWT | — | Last en leveringslogg etter ID |

## Relaterte sider

- [Sanntidsarkitektur](../../realtime) -- WebSocket-protokoll, romallementer og det enhetlige leveringsrammeverket
- [Web Push-meldinger](../../web-push) -- Registrering og levering av nettleserpush
- [Medlemskapendepunkter](./membership) -- Mennesker, grupper, roller og kjerne-identitet
- [Nærværendepunkter](./attendance) -- Service- og besøkssporing
- [Godkjennelse & rettigheter](./authentication) -- Påloggingsflyt, JWT, OAuth, tillatelsemodell
- [Modulstruktur](../module-structure) -- Organisasjonsmønster på server-siden
