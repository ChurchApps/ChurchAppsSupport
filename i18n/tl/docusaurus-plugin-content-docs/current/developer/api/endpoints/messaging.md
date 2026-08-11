---
title: "Mga Endpoint ng Pagmemensahe"
---

# Mga Endpoint ng Pagmemensahe

<div class="article-intro">

Ang module ng Pagmemensahe ay namamahala sa real-time na mga pag-uusap, mga mensaheng chat, mga push notification, SMS/email delivery, WebSocket connections, private messaging, device registration, at texting providers. Nag-aalok ito ng communication layer na ginagamit sa lahat ng mga aplikasyon ng ChurchApps para sa live streaming chat at asynchronous na mga notification.

</div>

**Base path:** `/messaging`

## Mga Pag-uusap

Base path: `/messaging/conversations`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Mag-load ng mga pag-uusap ayon sa comma-separated IDs na may unang/huling mga mensahe |
| GET | `/messages/:contentType/:contentId` | JWT | — | Mag-load ng mga pag-uusap para sa nilalaman na may paginated messages (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Kunin ang mga pag-uusap ng uri ng post para sa mga grupo ng kasalukuyang gumagamit |
| GET | `/posts/group/:groupId` | JWT | — | Kunin ang mga pag-uusap ng uri ng post para sa isang partikular na grupo |
| GET | `/current/:churchId/:contentType/:contentId` | Public | — | Kunin o lumikha ang kasalukuyang pag-uusap para sa nilalaman (auto-decrypts contentId) |
| GET | `/:churchId/:contentType/:contentId` | Public | — | Mag-load ng mga pag-uusap ayon sa uri ng nilalaman at ID |
| GET | `/:churchId/:id` | Public | — | Mag-load ng isang pag-uusap ayon sa ID |
| POST | `/` | JWT | — | Lumikha o i-update ang mga pag-uusap (batch) |
| POST | `/start` | JWT | — | Magsimula ng isang bagong pag-uusap na may paunang mensaheng komento |
| DELETE | `/:churchId/:id` | JWT | — | Tanggalin ang isang pag-uusap |

### Kontrol sa access ng mga tala ng tao

Ang mga pag-uusap na may `contentType: "person"` (ang tab ng Mga Tala sa isang record ng tao) o `contentType: "personConfidential"` (ang seksyon ng Mga Kumpidensyal na Tala) ay naka-gate sa bawat landas ng basahin at isulat, kasama ang mga pang-publiko na ruta sa itaas, na nagbabalik ng `401` para sa mga uri ng nilalaman na ito. Ang `person` ay nangangailangan ng MembershipApi **Mga Tao / I-edit** na pahintulot; `personConfidential` ay nangangailangan ng **Mga Tao / Tingnan ang Mga Kumpidensyal na Tala**. Para sa mga key ng scoped API, ang `people:write` ay may kasamang parehong aksyon (ang user ng susi ay dapat pa ring manatili sa pinagbabatayan na pahintulot ng papel).

### Halimbawa: Magsimula ng Pag-uusap

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

## Mga Mensahe

Base path: `/messaging/messages`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Mag-load ng lahat ng mensahe para sa isang pag-uusap |
| GET | `/catchup/:churchId/:conversationId` | Public | — | Mag-load ng lahat ng mensahe para sa isang pag-uusap (pampublikong catchup para sa live chat) |
| GET | `/:churchId/:id` | Public | — | Mag-load ng isang mensahe ayon sa ID |
| POST | `/` | JWT | — | Mag-save ng mga mensahe (batch). Nagpadala ng real-time updates at nag-trigger ng mga notification |
| POST | `/send` | Public | — | Magpadala ng mga mensahe (batch, pampubliko). Nagpadala ng real-time updates sa pamamagitan ng WebSocket at nag-trigger ng mga notification |
| POST | `/setCallout` | JWT | — | (legacy) Maglunsad ng callout message sa real time. Walang active client; ang live stream chat ay hindi na gumagana ng mga callout |
| DELETE | `/:churchId/:id` | JWT | — | Tanggalin ang isang mensahe at i-broadcast ang pagbabago sa real time |

### Halimbawa: Magpadala ng Mensahe

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

## Mga Pribadong Mensahe

Base path: `/messaging/privatemessages`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Mag-load ng lahat ng mga pribadong mensahe para sa kasalukuyang gumagamit (kasama ang huling mensahe bawat pag-uusap, minarkahan ang lahat bilang basahin) |
| GET | `/existing/:personId` | JWT | — | Maghanap ng isang umiiral na pribadong pag-uusap na may isang partikular na tao |
| GET | `/:id` | JWT | — | Mag-load ng isang pribadong mensahe ayon sa ID (nag-clear ng notification kung natugunan sa kasalukuyang gumagamit) |
| POST | `/` | JWT | — | Magpadala ng mga pribadong mensahe (batch). Nag-trigger ng push notification sa tumatanggap |

## Mga Notification

Base path: `/messaging/notifications`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Kunin ang bilang ng hindi nabasang notification para sa kasalukuyang gumagamit |
| GET | `/my` | JWT | — | Mag-load ng lahat ng notification para sa kasalukuyang gumagamit (minarkahan ang lahat bilang basahin) |
| GET | `/tmpEmail` | Public | — | I-trigger ang pang-araw-araw na email notification digest (debug/cron endpoint) |
| GET | `/:churchId/person/:personId` | JWT | — | Mag-load ng mga notification para sa isang partikular na tao |
| GET | `/:churchId/:id` | JWT | — | Mag-load ng isang notification ayon sa ID |
| POST | `/` | JWT | — | Lumikha o i-update ang mga notification (batch) |
| POST | `/create` | JWT | — | Lumikha ng mga notification para sa maraming tao. Body: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Markahan ang lahat ng notification bilang basahin para sa isang tao |
| POST | `/sendTest` | JWT | — | Magpadala ng isang pagsubok ng push notification. Body: `{ personId, title }` |
| POST | `/ping` | Public | — | Lumikha ng isang notification mula sa isang panlabas na trigger. Body: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Tanggalin ang isang notification |

### Halimbawa: Lumikha ng Mga Notification

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

## Mga Kagustuhan ng Notification

Base path: `/messaging/notificationpreferences`

Pinalawak ang standard na CRUD. Ang base class ay nagbibigay ng POST `/` (lumikha o i-update, walang kinakailangang pahintulot).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Lumikha o i-update ang mga kagustuhan ng notification (mula sa base class ng CRUD) |
| GET | `/my` | JWT | — | Mag-load ng mga kagustuhan ng notification para sa kasalukuyang gumagamit (auto-lumilikha ng mga default kung walang umiiral) |

## Mga Koneksyon

Base path: `/messaging/connections`

Namamahala sa WebSocket/real-time na mga koneksyon para sa chat, mga pag-uusap ng grupo, mga pribadong mensahe, at live streaming. Tingnan ang [Real-time Architecture](../../realtime) para sa end-to-end protocol.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | Public | — | Mag-load ng lahat ng mga koneksyon para sa isang pag-uusap |
| POST | `/` | Public | — | Mag-register ng mga koneksyon (batch). Nag-trigger ng attendance broadcast sa pag-uusap. Body items: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Public | — | I-update ang pangalan ng display para sa isang koneksyon ayon sa socket ID. Body: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Public | — | Ihulog ang isang koneksyon mula sa isang pag-uusap. Nag-trigger ng attendance broadcast |
| POST | `/tmpSendAlert` | Public | — | Magpadala ng isang notification alert sa mga koneksyon ng isang tao. Body: `{ churchId, personId }` |

## Mga Device

Base path: `/messaging/devices`

Namamahala sa device registration para sa mga push notification at content pairing (hal., Lessons app sa TV displays).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | I-enroll o i-update ang isang device (mobile push registration). Tumutugma ayon sa FCM token o device ID |
| POST | `/enrollAnon` | Public | — | I-enroll ang isang anonymous device at lumikha ng 4-character pairing code |
| POST | `/` | Public | — | Mag-save ng mga device (batch) |
| GET | `/pair/:pairingCode` | JWT | — | I-pair ang isang device gamit ang pairing code nito. Optional `?contentType=&contentId=` upang magtalag ng nilalaman |
| GET | `/status/:deviceId` | Public | — | Suriin ang pairing status ng isang device |
| GET | `/:churchId` | JWT | — | Mag-load ng lahat ng mga device para sa isang simbahan |
| GET | `/:churchId/person/:personId` | JWT | — | Mag-load ng lahat ng mga device para sa isang tao |
| GET | `/:churchId/:id` | JWT | — | Mag-load ng isang device ayon sa ID |
| DELETE | `/:churchId/:id` | JWT | — | Tanggalin ang isang device |

### Halimbawa: I-enroll ang isang Device

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

## Mga Nilalaman ng Device

Base path: `/messaging/devicecontents`

Namamahala sa mga pagtatalaga ng nilalaman para sa mga paired device (hal., aling aralin ang ipinapakita sa TV).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Mag-load ng mga pagtatalaga ng nilalaman para sa isang device |
| POST | `/` | JWT | — | Mag-save ng mga pagtatalaga ng nilalaman ng device (batch) |
| DELETE | `/:id` | JWT | — | Tanggalin ang isang pagtatalaga ng nilalaman ng device |

## Texting

Base path: `/messaging/texting`

Namamahala sa SMS texting providers, group text messaging, at delivery tracking.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | Mag-load ng mga texting provider para sa simbahan (ang mga credentials ay nakabalot) |
| GET | `/preview/:groupId` | JWT | — | I-preview ang mga tumatanggap para sa isang group text (eligible, opted-out, walang phone counts) |
| GET | `/sent` | JWT | — | Mag-load ng lahat ng napadaling record ng text message para sa simbahan |
| GET | `/sent/:id/details` | JWT | — | Mag-load ng isang napadaling text na may bawat tumatanggap na delivery logs |
| POST | `/providers` | JWT | — | Mag-save ng mga texting provider (batch). Nag-encrypt ng mga credentials ng API |
| POST | `/send` | JWT | — | Magpadala ng isang SMS sa lahat ng eligible na miyembro ng isang grupo. Body: `{ groupId, message }` |
| POST | `/sendPerson` | JWT | — | Magpadala ng isang SMS sa isang tao. Body: `{ personId, phoneNumber, message }` |
| DELETE | `/providers/:id` | JWT | — | Tanggalin ang isang texting provider |

### Halimbawa: Magpadala ng Text ng Grupo

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

## Mga Template ng Email

Base path: `/messaging/emailTemplates`

Namamahala sa mga mabagong template ng email at pagpadala ng mga template email sa mga grupo.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Mag-load ng lahat ng mga template ng email para sa simbahan |
| GET | `/:id` | JWT | — | Mag-load ng isang template ng email ayon sa ID |
| GET | `/preview/:groupId` | JWT | — | I-preview ang email delivery para sa isang grupo (eligible recipient count, mga miyembro na walang email) |
| POST | `/` | JWT | — | Lumikha o i-update ang mga template ng email (batch) |
| POST | `/send` | JWT | — | Magpadala ng isang template email sa lahat ng miyembro ng isang grupo. Body: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Tanggalin ang isang template ng email |

### Halimbawa: Magpadala ng Email sa Grupo

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

**Suportadong mga merge field:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## Mga Blocked na IP

Base path: `/messaging/blockedips`

(legacy) IP-blocking para sa live streaming chat. Ang B1App client ay hindi na tumatawag sa `POST /` -- ang IP blocking ay inalis sa unified-delivery migration. Ang `/clear` route ay patuloy na tinatawag server-to-server ng `StreamingServiceController` kapag ang mga streaming services ay naka-save.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | (legacy) Mag-save ng mga blocked IP (batch). Walang active client |
| POST | `/clear` | JWT | — | I-clear ang lahat ng mga blocked IP para sa mga partikular na serbisyo. Body: `[{ serviceId, churchId }]` |

## Mga Delivery Logs

Base path: `/messaging/deliverylogs`

Sinusubaybayan ang delivery status para sa mga napadaling mensahe (SMS, push notification, email).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Mag-load ng mga delivery logs ayon sa uri ng nilalaman at ID |
| GET | `/person/:personId` | JWT | — | Mag-load ng mga delivery logs para sa isang tao. Optional `?startDate=&endDate=` filters |
| GET | `/recent` | JWT | — | Mag-load ng mga kamakailang delivery logs para sa simbahan. Optional `?limit=` (default 100) |
| GET | `/:id` | JWT | — | Mag-load ng isang delivery log ayon sa ID |

## Mga Kaugnay na Pahina

- [Real-time Architecture](../../realtime) -- WebSocket protocol, room subscriptions, at ang unified delivery framework
- [Web Push Notifications](../../web-push) -- Browser push enrollment at delivery
- [Membership Endpoints](./membership) -- Mga tao, mga grupo, mga rol, at core identity
- [Attendance Endpoints](./attendance) -- Serbisyo at bisita na sumusubaybay
- [Authentication & Permissions](./authentication) -- Pag-login flow, JWT, OAuth, permission model
- [Module Structure](../module-structure) -- Mga pattern ng code organization
