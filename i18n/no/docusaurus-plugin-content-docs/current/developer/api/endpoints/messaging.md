---
title: "Messaging Endpoints"
---

# Messaging Endpoints

<div class="article-intro">

Messaging-modulen administrerer sanntids samtaler, chat-meldinger, push-varslinger, SMS/e-post-levering, WebSocket-tilkoblinger, private meldinger, enhetsregistrering og tekstleverandører. Den gir kommunikasjonslaget som brukes på tvers av alle ChurchApps-applikasjoner.

</div>

**Base path:** `/messaging`

## Conversations

Base path: `/messaging/conversations`

| Method | Path | Description |
|--------|------|-------------|
| GET | `/timeline/ids?ids=` | Last inn samtaler etter komma-skilte ID-er |
| GET | `/messages/:contentType/:contentId` | Last inn samtaler for innhold med paginerte meldinger |
| POST | `/` | Opprett eller oppdater samtaler (batch) |
| DELETE | `/:churchId/:id` | Slett en samtale |

## Messages

Base path: `/messaging/messages`

| Method | Path | Description |
|--------|------|-------------|
| GET | `/conversation/:conversationId` | Last inn alle meldinger for en samtale |
| POST | `/` | Lagre meldinger (batch) |
| POST | `/send` | Send meldinger (batch, public) |
| DELETE | `/:churchId/:id` | Slett en melding |

## Private Messages

Base path: `/messaging/privatemessages`

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Last inn alle private meldinger for gjeldende bruker |
| POST | `/` | Send private meldinger (batch) |

## Notifications

Base path: `/messaging/notifications`

| Method | Path | Description |
|--------|------|-------------|
| GET | `/unreadCount` | Få ulestt varslingsantall |
| GET | `/my` | Last inn alle varslinger for gjeldende bruker |
| POST | `/create` | Opprett varslinger for flere personer |
| DELETE | `/:churchId/:id` | Slett en varsling |

## Devices

Base path: `/messaging/devices`

Administrerer enhetsregistrering for push-varslinger og innholdspairing.

| Method | Path | Description |
|--------|------|-------------|
| POST | `/enroll` | Registrer eller oppdater en enhet |
| GET | `/:churchId` | Last inn alle enheter for en kirke |
| DELETE | `/:churchId/:id` | Slett en enhet |

## Texting

Base path: `/messaging/texting`

Administrerer SMS-tekstleverandører og leveringssporing.

| Method | Path | Description |
|--------|------|-------------|
| GET | `/providers` | Last inn tekstleverandører for kirken |
| POST | `/send` | Send SMS til alle aktive medlemmer av en gruppe |
| DELETE | `/providers/:id` | Slett en tekstleverandør |

## Email Templates

Base path: `/messaging/emailTemplates`

Administrerer gjenbrukbare e-postmaler.

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Last inn alle e-postmaler for kirken |
| POST | `/send` | Send en templat-e-post til alle medlemmer av en gruppe |
| DELETE | `/:id` | Slett en e-postmal |

