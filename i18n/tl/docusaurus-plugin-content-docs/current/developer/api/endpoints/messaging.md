---
title: "Mga Endpoint ng Messaging"
---

# Mga Endpoint ng Messaging

<div class="article-intro">

Pinapamahalaan ng Messaging module ang mga real-time na pag-uusap, mensahe sa chat, push notification, pagpapadala ng SMS/email, mga koneksyon ng WebSocket, pribadong pagmemensahe, pagpaparehistro ng device, at mga provider ng texting. Nagbibigay ito ng layer ng komunikasyon na ginagamit sa lahat ng ChurchApps na aplikasyon para sa parehong live streaming chat at asynchronous na mga abiso.

</div>

**Base path:** `/messaging`

## Mga Pag-uusap

Base path: `/messaging/conversations`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | I-load ang mga pag-uusap ayon sa mga ID na pinaghiwalay ng kuwit kasama ang una/huling mensahe |
| GET | `/messages/:contentType/:contentId` | JWT | — | I-load ang mga pag-uusap para sa nilalaman na may paginated na mga mensahe (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Kunin ang mga pag-uusap na uri ng post para sa mga grupo ng kasalukuyang gumagamit |
| GET | `/posts/group/:groupId` | JWT | — | Kunin ang mga pag-uusap na uri ng post para sa isang partikular na grupo |
| GET | `/current/:churchId/:contentType/:contentId` | Pampubliko | — | Kunin o lumikha ng kasalukuyang pag-uusap para sa nilalaman (awtomatikong dine-decrypt ang contentId) |
| GET | `/:churchId/:contentType/:contentId` | Pampubliko | — | I-load ang mga pag-uusap ayon sa uri ng nilalaman at ID |
| GET | `/:churchId/:id` | Pampubliko | — | I-load ang isang pag-uusap ayon sa ID |
| POST | `/` | JWT | — | Lumikha o mag-update ng mga pag-uusap (batch) |
| POST | `/start` | JWT | — | Magsimula ng bagong pag-uusap na may paunang mensaheng komentaryo |
| DELETE | `/:churchId/:id` | JWT | — | Burahin ang isang pag-uusap |

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

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | I-load ang lahat ng mensahe para sa isang pag-uusap |
| GET | `/catchup/:churchId/:conversationId` | Pampubliko | — | I-load ang lahat ng mensahe para sa isang pag-uusap (pampublikong catchup para sa live chat) |
| GET | `/:churchId/:id` | Pampubliko | — | I-load ang isang mensahe ayon sa ID |
| POST | `/` | JWT | — | I-save ang mga mensahe (batch). Nagpapadala ng mga real-time na update at nagti-trigger ng mga abiso |
| POST | `/send` | Pampubliko | — | Magpadala ng mga mensahe (batch, pampubliko). Nagpapadala ng mga real-time na update sa pamamagitan ng WebSocket at nagti-trigger ng mga abiso |
| POST | `/setCallout` | JWT | — | Mag-broadcast ng callout na mensahe sa isang pag-uusap nang real time |
| DELETE | `/:churchId/:id` | JWT | — | Burahin ang isang mensahe at i-broadcast ang pagbura nang real time |

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

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | I-load ang lahat ng pribadong mensahe para sa kasalukuyang gumagamit (kasama ang huling mensahe bawat pag-uusap, minamarkahan lahat bilang nabasa) |
| GET | `/existing/:personId` | JWT | — | Hanapin ang umiiral na pribadong pag-uusap sa isang partikular na tao |
| GET | `/:id` | JWT | — | I-load ang isang pribadong mensahe ayon sa ID (binubura ang abiso kung nakatuon sa kasalukuyang gumagamit) |
| POST | `/` | JWT | — | Magpadala ng mga pribadong mensahe (batch). Nagti-trigger ng push notification sa tumatanggap |

## Mga Abiso

Base path: `/messaging/notifications`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Kunin ang bilang ng hindi pa nababasang abiso para sa kasalukuyang gumagamit |
| GET | `/my` | JWT | — | I-load ang lahat ng abiso para sa kasalukuyang gumagamit (minamarkahan lahat bilang nabasa) |
| GET | `/tmpEmail` | Pampubliko | — | Mag-trigger ng pang-araw-araw na email notification digest (debug/cron endpoint) |
| GET | `/:churchId/person/:personId` | JWT | — | I-load ang mga abiso para sa isang partikular na tao |
| GET | `/:churchId/:id` | JWT | — | I-load ang isang abiso ayon sa ID |
| POST | `/` | JWT | — | Lumikha o mag-update ng mga abiso (batch) |
| POST | `/create` | JWT | — | Lumikha ng mga abiso para sa maraming tao. Body: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Markahan lahat ng abiso bilang nabasa para sa isang tao |
| POST | `/sendTest` | JWT | — | Magpadala ng test push notification. Body: `{ personId, title }` |
| POST | `/ping` | Pampubliko | — | Lumikha ng abiso mula sa isang panlabas na trigger. Body: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Burahin ang isang abiso |

### Halimbawa: Lumikha ng mga Abiso

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

## Mga Kagustuhan sa Abiso

Base path: `/messaging/notificationpreferences`

Nag-eextend ng karaniwang CRUD. Ang base class ay nagbibigay ng POST `/` (lumikha o mag-update, walang kinakailangang pahintulot).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Lumikha o mag-update ng mga kagustuhan sa abiso (mula sa CRUD base class) |
| GET | `/my` | JWT | — | I-load ang mga kagustuhan sa abiso para sa kasalukuyang gumagamit (awtomatikong lumilikha ng mga default kung wala pa) |

## Mga Koneksyon

Base path: `/messaging/connections`

Pinapamahalaan ang mga koneksyon ng WebSocket/real-time para sa live streaming chat.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | Pampubliko | — | I-load ang lahat ng koneksyon para sa isang pag-uusap |
| POST | `/` | Pampubliko | — | Magrehistro ng mga koneksyon (batch). Awtomatikong nagbibilang ng mga anonymous na gumagamit at nagpapadala ng mga update ng attendance/naka-block na IP |
| POST | `/setName` | Pampubliko | — | I-update ang display name para sa isang koneksyon ayon sa socket ID. Body: `{ socketId, name }` |
| POST | `/tmpSendAlert` | Pampubliko | — | Magpadala ng alerto ng abiso sa mga koneksyon ng isang tao. Body: `{ churchId, personId }` |

## Mga Device

Base path: `/messaging/devices`

Pinapamahalaan ang pagpaparehistro ng device para sa push notification at pagpapares ng nilalaman (hal., Lessons app sa mga TV display).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | Mag-enroll o mag-update ng isang device (pagpaparehistro ng mobile push). Tugma ayon sa FCM token o device ID |
| POST | `/enrollAnon` | Pampubliko | — | Mag-enroll ng anonymous na device at bumuo ng 4 na karakter na pairing code |
| POST | `/` | Pampubliko | — | I-save ang mga device (batch) |
| GET | `/pair/:pairingCode` | JWT | — | Ipares ang isang device gamit ang pairing code nito. Opsyonal na `?contentType=&contentId=` para magtalaga ng nilalaman |
| GET | `/status/:deviceId` | Pampubliko | — | Suriin ang katayuan ng pagpapares ng isang device |
| GET | `/:churchId` | JWT | — | I-load ang lahat ng device para sa isang simbahan |
| GET | `/:churchId/person/:personId` | JWT | — | I-load ang lahat ng device para sa isang tao |
| GET | `/:churchId/:id` | JWT | — | I-load ang isang device ayon sa ID |
| DELETE | `/:churchId/:id` | JWT | — | Burahin ang isang device |

### Halimbawa: Mag-enroll ng Device

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

Pinapamahalaan ang mga takdang-aralin ng nilalaman para sa mga naipares na device (hal., kung aling aralin ang ipinapakita sa isang TV).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | I-load ang mga takdang-aralin ng nilalaman para sa isang device |
| POST | `/` | JWT | — | I-save ang mga takdang-aralin ng nilalaman ng device (batch) |
| DELETE | `/:id` | JWT | — | Burahin ang isang takdang-aralin ng nilalaman ng device |

## Texting

Base path: `/messaging/texting`

Pinapamahalaan ang mga provider ng SMS texting, pagmemensahe ng grupo sa text, at pagsubaybay ng paghahatid.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | I-load ang mga provider ng texting para sa simbahan (nakatago ang mga kredensyal) |
| GET | `/preview/:groupId` | JWT | — | I-preview ang mga tatanggap para sa isang group text (bilang ng mga kwalipikado, nag-opt-out, walang-telepono) |
| GET | `/sent` | JWT | — | I-load ang lahat ng naipadala na mga talaan ng text message para sa simbahan |
| GET | `/sent/:id/details` | JWT | — | I-load ang isang naipadala na text kasama ang mga log ng paghahatid bawat tatanggap |
| POST | `/providers` | JWT | — | I-save ang mga provider ng texting (batch). Nag-e-encrypt ng mga kredensyal ng API |
| POST | `/send` | JWT | — | Magpadala ng SMS sa lahat ng kwalipikadong miyembro ng isang grupo. Body: `{ groupId, message }` |
| POST | `/sendPerson` | JWT | — | Magpadala ng SMS sa isang tao. Body: `{ personId, phoneNumber, message }` |
| DELETE | `/providers/:id` | JWT | — | Burahin ang isang provider ng texting |

### Halimbawa: Magpadala ng Group Text

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

## Mga Naka-block na IP

Base path: `/messaging/blockedips`

Pinapamahalaan ang pag-block ng IP para sa mga pag-uusap sa live streaming chat.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | I-save ang mga naka-block na IP (batch). Nag-bo-broadcast ng na-update na listahan ng block sa pag-uusap |
| POST | `/clear` | JWT | — | Burahin ang lahat ng naka-block na IP para sa mga partikular na serbisyo. Body: `[{ serviceId, churchId }]` |

## Mga Log ng Paghahatid

Base path: `/messaging/deliverylogs`

Sinusubaybayan ang katayuan ng paghahatid para sa mga naipadala na mensahe (SMS, push notification, email).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | I-load ang mga log ng paghahatid ayon sa uri ng nilalaman at ID |
| GET | `/person/:personId` | JWT | — | I-load ang mga log ng paghahatid para sa isang tao. Opsyonal na mga filter na `?startDate=&endDate=` |
| GET | `/recent` | JWT | — | I-load ang mga kamakailang log ng paghahatid para sa simbahan. Opsyonal na `?limit=` (default 100) |
| GET | `/:id` | JWT | — | I-load ang isang log ng paghahatid ayon sa ID |

## Mga Kaugnay na Pahina

- [Mga Endpoint ng Membership](./membership) -- Mga tao, grupo, tungkulin, at pangunahing pagkakakilanlan
- [Mga Endpoint ng Attendance](./attendance) -- Pagsubaybay ng serbisyo at pagbisita
- [Authentication at Mga Pahintulot](./authentication) -- Daloy ng pag-login, JWT, OAuth, modelo ng pahintulot
- [Istraktura ng Module](../module-structure) -- Mga pattern ng organisasyon ng code
