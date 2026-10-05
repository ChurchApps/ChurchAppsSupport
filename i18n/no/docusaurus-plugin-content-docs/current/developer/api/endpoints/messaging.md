---
title: "Endepunkter for meldinger"
---

# Endepunkter for meldinger

<div class="article-intro">

Meldingsmodulen håndterer sanntidssamtaler, chattemeldinger, push-varsler, levering av SMS og e-post, WebSocket-tilkoblinger, private meldinger, enhetsregistrering og tekstmeldingsleverandører. Den utgjør kommunikasjonslaget som brukes i alle ChurchApps-applikasjoner, både for chat under direktesendinger og for asynkrone varsler.

</div>

**Basissti:** `/messaging`

## Samtaler

Basissti: `/messaging/conversations`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Last inn samtaler etter kommaseparerte ID-er, med første/siste melding |
| GET | `/messages/:contentType/:contentId` | JWT | — | Last inn samtaler for innhold med sideinndelte meldinger (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Hent samtaler av typen innlegg for den nåværende brukerens grupper |
| GET | `/posts/group/:groupId` | JWT | — | Hent samtaler av typen innlegg for en bestemt gruppe |
| GET | `/current/:churchId/:contentType/:contentId` | Offentlig | — | Hent eller opprett den gjeldende samtalen for innhold (dekrypterer contentId automatisk) |
| GET | `/:churchId/:contentType/:contentId` | Offentlig | — | Last inn samtaler etter innholdstype og ID |
| GET | `/:churchId/:id` | Offentlig | — | Last inn én samtale etter ID |
| POST | `/` | JWT | — | Opprett eller oppdater samtaler (batch) |
| POST | `/start` | JWT | — | Start en ny samtale med en innledende kommentar |
| DELETE | `/:churchId/:id` | JWT | — | Slett en samtale |

### Tilgangskontroll for personnotater

Samtaler med `contentType: "person"` (fanen Notater på en personpost) eller `contentType: "personConfidential"` (seksjonen Konfidensielle notater) er beskyttet på alle lese- og skrivestier, også de ellers offentlige rutene ovenfor, som returnerer `401` for disse innholdstypene. `person` krever MembershipApi-tillatelsen **People / Edit**; `personConfidential` krever **People / View Confidential Notes**. For API-nøkler med begrenset omfang gir `people:write` begge handlingene (nøkkelens bruker må fortsatt ha den underliggende rolletillatelsen).

### Eksempel: start en samtale

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
|--------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Last inn alle meldinger i en samtale |
| GET | `/catchup/:churchId/:conversationId` | Offentlig | — | Last inn alle meldinger i en samtale (offentlig innhenting for direktechat) |
| GET | `/:churchId/:id` | Offentlig | — | Last inn én melding etter ID |
| POST | `/` | JWT | — | Lagre meldinger (batch). Sender sanntidsoppdateringer og utløser varsler. For å oppdatere en eksisterende melding må du være forfatteren eller ha `content.edit`; den lagrede forfatteren kan aldri endres |
| POST | `/send` | Offentlig | — | Send meldinger (batch, offentlig). Sender sanntidsoppdateringer via WebSocket og utløser varsler |
| POST | `/setCallout` | JWT | — | (eldre) Kringkast en utropsmelding i sanntid. Ingen aktiv klient; chat under direktesending viser ikke lenger utrop |
| DELETE | `/:churchId/:id` | JWT | — | Slett en melding og kringkast slettingen i sanntid. Se [Moderering av meldinger](#message-moderation) |

### Moderering av meldinger {#message-moderation}

Sletting av en melding er tillatt for:

- meldingens forfatter;
- ansatte med `content.edit` (hvor som helst i menigheten);
- **gruppeledere**, for samtaler med `contentType` lik `group` eller `groupAnnouncement` der `contentId` er en gruppe de leder (`leaderGroupIds` i JWT).

Samtaler med personnotater (`person` / `personConfidential`) modereres aldri av ledere — de bruker i stedet notattillatelsene (`people.edit`, `people.viewConfidentialNotes`).

Ledere får bare slette, ikke redigere: å omskrive et annet medlems melding er fortsatt forbeholdt forfatteren og ansatte med `content.edit`.

### Eksempel: send en melding

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
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Last inn alle private meldinger for den nåværende brukeren (inkluderer siste melding per samtale, markerer alle som lest) |
| GET | `/existing/:personId` | JWT | — | Finn en eksisterende privat samtale med en bestemt person |
| GET | `/:id` | JWT | — | Last inn en privat melding etter ID (fjerner varselet hvis den er adressert til den nåværende brukeren) |
| POST | `/` | JWT | — | Send private meldinger (batch). Utløser push-varsel til mottakeren |

## Varsler

Basissti: `/messaging/notifications`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Hent antall uleste varsler for den nåværende brukeren |
| GET | `/my` | JWT | — | Last inn alle varsler for den nåværende brukeren (markerer alle som lest) |
| GET | `/tmpEmail` | Offentlig | — | Utløs den daglige e-postoppsummeringen av varsler (endepunkt for feilsøking/cron) |
| GET | `/:churchId/person/:personId` | JWT | — | Last inn varsler for en bestemt person |
| GET | `/:churchId/:id` | JWT | — | Last inn et varsel etter ID |
| POST | `/` | JWT | — | Opprett eller oppdater varsler (batch) |
| POST | `/create` | JWT | — | Opprett varsler for flere personer. Body: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Marker alle varsler som lest for en person |
| POST | `/sendTest` | JWT | — | Send et test-push-varsel. Body: `{ personId, title }` |
| POST | `/ping` | Offentlig | — | Opprett et varsel fra en ekstern utløser. Body: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Slett et varsel |

### Eksempel: opprett varsler

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

Utvider standard CRUD. Baseklassen tilbyr POST `/` (opprett eller oppdater, ingen tillatelse kreves).

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Opprett eller oppdater varselinnstillinger (fra CRUD-baseklassen) |
| GET | `/my` | JWT | — | Last inn varselinnstillinger for den nåværende brukeren (oppretter standardverdier automatisk hvis ingen finnes) |

## Tilkoblinger

Basissti: `/messaging/connections`

Håndterer WebSocket-/sanntidstilkoblinger for chat, gruppesamtaler, private meldinger og direktesending. Se [Sanntidsarkitektur](../../realtime) for hele protokollen.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | Offentlig | — | Last inn alle tilkoblinger for en samtale |
| POST | `/` | Offentlig | — | Registrer tilkoblinger (batch). Utløser en oppmøtekringkasting på samtalen. Elementer i body: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Offentlig | — | Oppdater visningsnavnet for en tilkobling etter socket-ID. Body: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Offentlig | — | Fjern en tilkobling fra en samtale. Utløser en oppmøtekringkasting |
| POST | `/tmpSendAlert` | Offentlig | — | Send en varsling til en persons tilkoblinger. Body: `{ churchId, personId }` |

## Enheter

Basissti: `/messaging/devices`

Håndterer enhetsregistrering for push-varsler og innholdskobling (for eksempel Lessons-appen på TV-skjermer).

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | Registrer eller oppdater en enhet (mobil push-registrering). Samsvarer på FCM-token eller enhets-ID |
| POST | `/enrollAnon` | Offentlig | — | Registrer en anonym enhet og generer en paringskode på 4 tegn |
| POST | `/` | Offentlig | — | Lagre enheter (batch) |
| GET | `/pair/:pairingCode` | JWT | — | Par en enhet ved hjelp av paringskoden. Valgfritt `?contentType=&contentId=` for å tilordne innhold |
| GET | `/status/:deviceId` | Offentlig | — | Sjekk paringsstatusen til en enhet |
| GET | `/:churchId` | JWT | — | Last inn alle enheter for en menighet |
| GET | `/:churchId/person/:personId` | JWT | — | Last inn alle enheter for en person |
| GET | `/:churchId/:id` | JWT | — | Last inn en enhet etter ID |
| DELETE | `/:churchId/:id` | JWT | — | Slett en enhet |

### Eksempel: registrer en enhet

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

Håndterer innholdstilordninger for parede enheter (for eksempel hvilken leksjon som vises på en TV).

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Last inn innholdstilordninger for en enhet |
| POST | `/` | JWT | — | Lagre innholdstilordninger for enheter (batch) |
| DELETE | `/:id` | JWT | — | Slett en innholdstilordning for en enhet |

## Tekstmeldinger

Basissti: `/messaging/texting`

Håndterer SMS-leverandører, gruppetekstmeldinger og sporing av levering.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | Last inn tekstmeldingsleverandører for menigheten (legitimasjon er maskert) |
| GET | `/preview/:groupId` | JWT | — | Forhåndsvis mottakere for en gruppetekstmelding (antall som kan motta, som har reservert seg og som mangler telefonnummer) |
| GET | `/sent` | JWT | — | Last inn alle registreringer av sendte tekstmeldinger for menigheten |
| GET | `/sent/:id/details` | JWT | — | Last inn en sendt tekstmelding med leveringslogger per mottaker |
| POST | `/providers` | JWT | — | Lagre tekstmeldingsleverandører (batch). Krypterer API-legitimasjon |
| POST | `/send` | JWT | — | Send en SMS til alle aktuelle medlemmer i en gruppe. Body: `{ groupId, message }`. Flettefelt (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) løses opp per mottaker |
| POST | `/sendPerson` | JWT | — | Send en SMS til én enkelt person. Body: `{ personId, phoneNumber, message }`. Flettefelt løses opp, og den oppløste teksten er den som logges |
| DELETE | `/providers/:id` | JWT | — | Slett en tekstmeldingsleverandør |

### Eksempel: send gruppetekstmelding

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

Håndterer gjenbrukbare e-postmaler og sending av e-poster fra maler til grupper.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Last inn alle e-postmaler for menigheten |
| GET | `/:id` | JWT | — | Last inn én e-postmal etter ID |
| GET | `/preview/:groupId` | JWT | — | Forhåndsvis e-postlevering for en gruppe (antall aktuelle mottakere, medlemmer uten e-postadresse) |
| POST | `/` | JWT | — | Opprett eller oppdater e-postmaler (batch) |
| POST | `/send` | JWT | — | Send en e-post fra en mal til alle medlemmer i en gruppe. Body: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Slett en e-postmal |

### Eksempel: send e-post til gruppe

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

(eldre) IP-blokkering for chat under direktesending. B1App-klienten kaller ikke lenger `POST /` — IP-blokkering ble fjernet i migreringen til samlet levering. Ruten `/clear` kalles fortsatt server-til-server av `StreamingServiceController` når strømmetjenester lagres.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | (eldre) Lagre blokkerte IP-adresser (batch). Ingen aktiv klient |
| POST | `/clear` | JWT | — | Fjern alle blokkerte IP-adresser for bestemte tjenester. Body: `[{ serviceId, churchId }]` |

## Leveringslogger

Basissti: `/messaging/deliverylogs`

Sporer leveringsstatus for sendte meldinger (SMS, push-varsler, e-post).

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Last inn leveringslogger etter innholdstype og ID |
| GET | `/person/:personId` | JWT | — | Last inn leveringslogger for en person. Valgfrie filtre `?startDate=&endDate=` |
| GET | `/recent` | JWT | — | Last inn nylige leveringslogger for menigheten. Valgfri `?limit=` (standard 100) |
| GET | `/:id` | JWT | — | Last inn en leveringslogg etter ID |

## Relaterte sider

- [Sanntidsarkitektur](../../realtime) -- WebSocket-protokoll, romabonnementer og det samlede leveringsrammeverket
- [Web Push-varsler](../../web-push) -- Registrering og levering av push i nettleseren
- [Endepunkter for medlemskap](./membership) -- Personer, grupper, roller og kjerneidentitet
- [Endepunkter for oppmøte](./attendance) -- Oppfølging av gudstjenester og besøk
- [Autentisering og tillatelser](./authentication) -- Innloggingsflyt, JWT, OAuth, tillatelsesmodell
- [Modulstruktur](../module-structure) -- Mønstre for kodeorganisering
