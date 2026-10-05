---
title: "Mga Endpoint ng Messaging"
---

# Mga Endpoint ng Messaging

<div class="article-intro">

Pinamamahalaan ng Messaging module ang mga real-time na usapan, chat message, push notification, paghahatid ng SMS/email, mga koneksyon sa WebSocket, pribadong pagmemensahe, pagpaparehistro ng device, at mga provider ng texting. Ito ang layer ng komunikasyon na ginagamit sa lahat ng aplikasyon ng ChurchApps, para sa live streaming chat at sa mga asynchronous na notification.

</div>

**Base path:** `/messaging`

## Mga Usapan

Base path: `/messaging/conversations`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Kunin ang mga usapan ayon sa mga ID na pinaghiwalay ng kuwit, kasama ang una/huling mensahe |
| GET | `/messages/:contentType/:contentId` | JWT | — | Kunin ang mga usapan para sa isang content kasama ang mga mensaheng may pagination (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Kunin ang mga usapang uri ng post para sa mga grupo ng kasalukuyang user |
| GET | `/posts/group/:groupId` | JWT | — | Kunin ang mga usapang uri ng post para sa isang partikular na grupo |
| GET | `/current/:churchId/:contentType/:contentId` | Public | — | Kunin o gumawa ng kasalukuyang usapan para sa isang content (awtomatikong dine-decrypt ang contentId) |
| GET | `/:churchId/:contentType/:contentId` | Public | — | Kunin ang mga usapan ayon sa uri ng content at ID |
| GET | `/:churchId/:id` | Public | — | Kunin ang isang usapan ayon sa ID |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga usapan (batch) |
| POST | `/start` | JWT | — | Magsimula ng bagong usapan na may unang komento |
| DELETE | `/:churchId/:id` | JWT | — | Magtanggal ng usapan |

### Kontrol sa access sa mga tala ng tao

Ang mga usapang may `contentType: "person"` (ang tab na Notes sa tala ng isang tao) o `contentType: "personConfidential"` (ang seksyon ng Confidential Notes) ay may bantay sa bawat read at write path, kasama ang mga route sa itaas na karaniwang pampubliko, na nagbabalik ng `401` para sa mga uri ng content na ito. Ang `person` ay nangangailangan ng permission na MembershipApi **People / Edit**; ang `personConfidential` ay nangangailangan ng **People / View Confidential Notes**. Para sa mga scoped API key, ang `people:write` ay sumasaklaw sa dalawang aksyon (kailangan pa ring hawak ng user ng key ang pinagbabatayang permission ng role).

### Halimbawa: Magsimula ng Usapan

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
| GET | `/conversation/:conversationId` | JWT | — | Kunin ang lahat ng mensahe ng isang usapan |
| GET | `/catchup/:churchId/:conversationId` | Public | — | Kunin ang lahat ng mensahe ng isang usapan (pampublikong catchup para sa live chat) |
| GET | `/:churchId/:id` | Public | — | Kunin ang isang mensahe ayon sa ID |
| POST | `/` | JWT | — | I-save ang mga mensahe (batch). Nagpapadala ng mga real-time na update at nagti-trigger ng mga notification. Ang pag-update ng kasalukuyang mensahe ay nangangailangang ikaw ang may-akda nito o may hawak ng `content.edit`; ang naka-store na may-akda ay hindi kailanman maaaring italaga sa iba |
| POST | `/send` | Public | — | Magpadala ng mga mensahe (batch, pampubliko). Nagpapadala ng mga real-time na update sa pamamagitan ng WebSocket at nagti-trigger ng mga notification |
| POST | `/setCallout` | JWT | — | (legacy) Mag-broadcast ng callout message nang real time. Walang aktibong client; hindi na nagre-render ng mga callout ang live stream chat |
| DELETE | `/:churchId/:id` | JWT | — | Magtanggal ng mensahe at i-broadcast ang pagtanggal nang real time. Tingnan ang [Moderasyon ng mensahe](#message-moderation) |

### Moderasyon ng mensahe

Pinapayagan ang pagtanggal ng mensahe para sa:

- ang may-akda ng mensahe;
- mga staff na may `content.edit` (saanman sa simbahan);
- **mga lider ng grupo**, para sa mga usapang may `contentType` na `group` o `groupAnnouncement` na ang `contentId` ay isang grupong pinamumunuan nila (`leaderGroupIds` sa JWT).

Ang mga usapan ng tala ng tao (`person` / `personConfidential`) ay hindi kailanman imo-moderate ng mga lider -- gumagamit ang mga ito ng mga permission sa notes (`people.edit`, `people.viewConfidentialNotes`) sa halip.

Ang mga lider ay may pahintulot lamang magtanggal, hindi mag-edit: ang pagbabago ng mensahe ng ibang miyembro ay nananatiling limitado sa may-akda at sa mga staff na may `content.edit`.

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
| GET | `/` | JWT | — | Kunin ang lahat ng pribadong mensahe ng kasalukuyang user (kasama ang huling mensahe bawat usapan, minamarkahang nabasa na ang lahat) |
| GET | `/existing/:personId` | JWT | — | Humanap ng kasalukuyang pribadong usapan sa isang partikular na tao |
| GET | `/:id` | JWT | — | Kunin ang isang pribadong mensahe ayon sa ID (inaalis ang notification kung para ito sa kasalukuyang user) |
| POST | `/` | JWT | — | Magpadala ng mga pribadong mensahe (batch). Nagti-trigger ng push notification sa tatanggap |

## Mga Notification

Base path: `/messaging/notifications`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Kunin ang bilang ng hindi pa nababasang notification ng kasalukuyang user |
| GET | `/my` | JWT | — | Kunin ang lahat ng notification ng kasalukuyang user (minamarkahang nabasa na ang lahat) |
| GET | `/tmpEmail` | Public | — | I-trigger ang pang-araw-araw na email digest ng mga notification (debug/cron endpoint) |
| GET | `/:churchId/person/:personId` | JWT | — | Kunin ang mga notification ng isang partikular na tao |
| GET | `/:churchId/:id` | JWT | — | Kunin ang isang notification ayon sa ID |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga notification (batch) |
| POST | `/create` | JWT | — | Gumawa ng mga notification para sa maraming tao. Body: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Markahang nabasa na ang lahat ng notification ng isang tao |
| POST | `/sendTest` | JWT | — | Magpadala ng test na push notification. Body: `{ personId, title }` |
| POST | `/ping` | Public | — | Gumawa ng notification mula sa panlabas na trigger. Body: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Magtanggal ng notification |

### Halimbawa: Gumawa ng mga Notification

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

## Mga Kagustuhan sa Notification

Base path: `/messaging/notificationpreferences`

Nag-e-extend ng karaniwang CRUD. Ang base class ang nagbibigay ng POST `/` (gumawa o mag-update, walang kailangang permission).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Gumawa o mag-update ng mga kagustuhan sa notification (mula sa CRUD base class) |
| GET | `/my` | JWT | — | Kunin ang mga kagustuhan sa notification ng kasalukuyang user (awtomatikong gumagawa ng mga default kung wala pa) |

## Mga Koneksyon

Base path: `/messaging/connections`

Pinamamahalaan ang mga koneksyon sa WebSocket/real-time para sa chat, mga usapan ng grupo, mga pribadong mensahe, at live streaming. Tingnan ang [Real-time Architecture](../../realtime) para sa buong protocol mula simula hanggang dulo.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | Public | — | Kunin ang lahat ng koneksyon ng isang usapan |
| POST | `/` | Public | — | Magrehistro ng mga koneksyon (batch). Nagti-trigger ng attendance broadcast sa usapan. Mga item sa body: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Public | — | I-update ang display name ng isang koneksyon ayon sa socket ID. Body: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Public | — | Alisin ang isang koneksyon sa isang usapan. Nagti-trigger ng attendance broadcast |
| POST | `/tmpSendAlert` | Public | — | Magpadala ng notification alert sa mga koneksyon ng isang tao. Body: `{ churchId, personId }` |

## Mga Device

Base path: `/messaging/devices`

Pinamamahalaan ang pagpaparehistro ng device para sa mga push notification at pagpapares ng content (hal., ang Lessons app sa mga display ng TV).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | Mag-enroll o mag-update ng device (pagpaparehistro ng mobile push). Tumutugma ayon sa FCM token o device ID |
| POST | `/enrollAnon` | Public | — | Mag-enroll ng anonymous na device at gumawa ng 4-na-karakter na pairing code |
| POST | `/` | Public | — | I-save ang mga device (batch) |
| GET | `/pair/:pairingCode` | JWT | — | Ipares ang isang device gamit ang pairing code nito. Opsyonal ang `?contentType=&contentId=` para magtalaga ng content |
| GET | `/status/:deviceId` | Public | — | Tingnan ang katayuan ng pagpapares ng isang device |
| GET | `/:churchId` | JWT | — | Kunin ang lahat ng device ng isang simbahan |
| GET | `/:churchId/person/:personId` | JWT | — | Kunin ang lahat ng device ng isang tao |
| GET | `/:churchId/:id` | JWT | — | Kunin ang isang device ayon sa ID |
| DELETE | `/:churchId/:id` | JWT | — | Magtanggal ng device |

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

## Mga Content ng Device

Base path: `/messaging/devicecontents`

Pinamamahalaan ang mga itinalagang content para sa mga nakapares na device (hal., kung aling leksyon ang ipinapakita sa isang TV).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Kunin ang mga itinalagang content ng isang device |
| POST | `/` | JWT | — | I-save ang mga itinalagang content ng device (batch) |
| DELETE | `/:id` | JWT | — | Magtanggal ng itinalagang content ng device |

## Texting

Base path: `/messaging/texting`

Pinamamahalaan ang mga provider ng SMS texting, group text messaging, at pagsubaybay sa paghahatid.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | Kunin ang mga provider ng texting ng simbahan (nakatago ang mga credential) |
| GET | `/preview/:groupId` | JWT | — | I-preview ang mga tatanggap ng group text (bilang ng eligible, nag-opt-out, at walang telepono) |
| GET | `/sent` | JWT | — | Kunin ang lahat ng tala ng naipadalang text message ng simbahan |
| GET | `/sent/:id/details` | JWT | — | Kunin ang isang naipadalang text kasama ang mga delivery log bawat tatanggap |
| POST | `/providers` | JWT | — | I-save ang mga provider ng texting (batch). Ine-encrypt ang mga API credential |
| POST | `/send` | JWT | — | Magpadala ng SMS sa lahat ng eligible na miyembro ng isang grupo. Body: `{ groupId, message }`. Ang mga merge field (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) ay nireresolba bawat tatanggap |
| POST | `/sendPerson` | JWT | — | Magpadala ng SMS sa isang tao. Body: `{ personId, phoneNumber, message }`. Nireresolba ang mga merge field, at ang nareresolbang teksto ang nilo-log |
| DELETE | `/providers/:id` | JWT | — | Magtanggal ng provider ng texting |

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

## Mga Template ng Email

Base path: `/messaging/emailTemplates`

Pinamamahalaan ang mga magagamit-muling template ng email at ang pagpapadala ng mga email na may template sa mga grupo.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Kunin ang lahat ng template ng email ng simbahan |
| GET | `/:id` | JWT | — | Kunin ang isang template ng email ayon sa ID |
| GET | `/preview/:groupId` | JWT | — | I-preview ang paghahatid ng email para sa isang grupo (bilang ng eligible na tatanggap, mga miyembrong walang email) |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga template ng email (batch) |
| POST | `/send` | JWT | — | Magpadala ng email na may template sa lahat ng miyembro ng isang grupo. Body: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Magtanggal ng template ng email |

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

**Mga sinusuportahang merge field:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## Mga Naka-block na IP

Base path: `/messaging/blockedips`

(legacy) Pag-block ng IP para sa live streaming chat. Hindi na tinatawag ng B1App client ang `POST /` -- inalis ang pag-block ng IP sa unified-delivery migration. Ang route na `/clear` ay tinatawag pa rin server-to-server ng `StreamingServiceController` kapag sine-save ang mga streaming service.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | (legacy) I-save ang mga naka-block na IP (batch). Walang aktibong client |
| POST | `/clear` | JWT | — | Alisin ang lahat ng naka-block na IP para sa mga partikular na serbisyo. Body: `[{ serviceId, churchId }]` |

## Mga Delivery Log

Base path: `/messaging/deliverylogs`

Sinusubaybayan ang katayuan ng paghahatid ng mga naipadalang mensahe (SMS, push notification, email).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Kunin ang mga delivery log ayon sa uri ng content at ID |
| GET | `/person/:personId` | JWT | — | Kunin ang mga delivery log ng isang tao. Opsyonal ang mga filter na `?startDate=&endDate=` |
| GET | `/recent` | JWT | — | Kunin ang mga kamakailang delivery log ng simbahan. Opsyonal ang `?limit=` (default 100) |
| GET | `/:id` | JWT | — | Kunin ang isang delivery log ayon sa ID |

## Mga Kaugnay na Pahina

- [Real-time Architecture](../../realtime) -- Protocol ng WebSocket, mga room subscription, at ang unified delivery framework
- [Web Push Notifications](../../web-push) -- Pag-enroll at paghahatid ng browser push
- [Mga Endpoint ng Membership](./membership) -- Mga tao, grupo, role, at pangunahing pagkakakilanlan
- [Mga Endpoint ng Attendance](./attendance) -- Pagsubaybay sa serbisyo at mga visit
- [Authentication at Mga Permission](./authentication) -- Daloy ng login, JWT, OAuth, modelo ng permission
- [Istruktura ng Module](../module-structure) -- Mga pattern sa pag-aayos ng code
