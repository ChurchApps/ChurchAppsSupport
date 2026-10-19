---
title: "Mga Endpoint ng Messaging"
---

# Mga Endpoint ng Messaging

<div class="article-intro">

Pinamamahalaan ng Messaging module ang real-time na usapan, chat message, push notification, paghahatid ng SMS/email, WebSocket connection, private messaging, device registration, at mga texting provider. Ito ang communication layer na ginagamit ng lahat ng ChurchApps application, para sa live streaming chat at sa mga asynchronous na notification.

</div>

**Base path:** `/messaging`

## Conversations

Base path: `/messaging/conversations`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Ilo-load ang mga conversation ayon sa comma-separated na ID, kasama ang unang at huling mensahe |
| GET | `/messages/:contentType/:contentId` | JWT | — | Ilo-load ang mga conversation para sa content na may paginated na mga mensahe (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Kunin ang mga post-type na conversation para sa mga group ng kasalukuyang user |
| GET | `/posts/group/:groupId` | JWT | — | Kunin ang mga post-type na conversation para sa isang partikular na group |
| GET | `/current/:churchId/:contentType/:contentId` | Public | — | Kunin o gumawa ng kasalukuyang conversation para sa content (awtomatikong dine-decrypt ang contentId) |
| GET | `/:churchId/:contentType/:contentId` | Public | — | Ilo-load ang mga conversation ayon sa content type at ID |
| GET | `/:churchId/:id` | Public | — | Ilo-load ang isang conversation ayon sa ID |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga conversation (batch) |
| POST | `/start` | JWT | — | Magsimula ng bagong conversation na may paunang comment message |
| DELETE | `/:churchId/:id` | JWT | — | Burahin ang isang conversation |

### Access control ng person notes

Ang mga conversation na may `contentType: "person"` (ang Notes tab sa record ng isang tao) o `contentType: "personConfidential"` (ang seksyong Confidential Notes) ay kontrolado sa bawat read at write path, kasama ang mga public route sa itaas, na nagbabalik ng `401` para sa mga content type na ito. Kailangan ng `person` ang MembershipApi **People / Edit** na permission; kailangan ng `personConfidential` ang **People / View Confidential Notes**. Para sa mga scoped API key, sakop ng `people:write` ang parehong aksyon (dapat pa ring taglay ng user ng key ang underlying na role permission).

### Access control ng group at event notes {#group-and-event-notes-access-control}

Dalawa pang note content type ang kinokontrol sa parehong paraan, sa bawat read at write path (kasama ang mga public route sa itaas), at hindi kailanman bukas sa anonymous na pag-post:

- **`groupNote`** (`contentId` = group ID) -- ang feed na **Leader notes** sa isang group. Ang mga leader lang ng group na iyon (`leaderGroupIds` sa JWT) ang makakabasa o makakapag-post. Walang staff permission ang nagbibigay ng access dito, kasama ang `content.edit` at mga group-membership permission.
- **`eventNote`** (`contentId` = event ID) -- ang mga note sa isang calendar event. Palaging nakakabasa at nakakapag-post ang staff na may `content.edit` o **Calendars / Admin**. Kung wala, sinusunod ang `notesViewRole` (pagbasa) at `notesPostRole` (pag-post) ng event: ang `staff` (default, ginagamit kapag `null` ang field) ay walang ibang pinapayagan, ang `leaders` ay ang mga leader ng group ng event, at ang `members` ay ang mga miyembro at leader ng group ng event. Ang event na walang `groupId` ay staff lang ang makakagamit.

### Access control ng workflow card notes

Ang mga conversation na may `contentType: "workflowCard"` (ang mga note sa isang workflow card, kung saan ang `contentId` ay ang task ID ng card) ay mababasa at mababago lang ng taong makakabukas ng card na iyon: isang user na may DoingApi **Tasks / View** na permission, o ang taong o group na nakatalaga sa card, gumawa nito, o tungkol dito. Ang lahat ng iba ay makakatanggap ng `401` sa bawat read path, kasama ang mga public route sa itaas. Ang conversation ng card ay ikinakabit sa mismong card sa pamamagitan ng `POST /doing/tasks/:id/conversation` (body `{ "conversationId": "..." }`; ang unang conversation na naikabit ang masusunod), na maaaring tawagin ng mga editor ng card at ng assignee nito.

### Halimbawa: Magsimula ng Conversation

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

## Messages

Base path: `/messaging/messages`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Ilo-load ang lahat ng mensahe ng isang conversation |
| GET | `/catchup/:churchId/:conversationId` | Public | — | Ilo-load ang lahat ng mensahe ng isang conversation (public catchup para sa live chat) |
| GET | `/:churchId/:id` | Public | — | Ilo-load ang isang mensahe ayon sa ID |
| POST | `/` | JWT | — | I-save ang mga mensahe (batch). Nagpapadala ng real-time na update at nag-t-trigger ng mga notification. Ang pag-update ng umiiral na mensahe ay nangangailangan na ikaw ang author nito o may hawak ng `content.edit`; hindi kailanman maaaring ilipat ang nakaimbak na author |
| POST | `/send` | Public | — | Magpadala ng mga mensahe (batch, public). Nagpapadala ng real-time na update sa pamamagitan ng WebSocket at nag-t-trigger ng mga notification |
| POST | `/setCallout` | JWT | — | (legacy) Mag-broadcast ng callout message nang real time. Walang aktibong client; hindi na nire-render ng live stream chat ang mga callout |
| DELETE | `/:churchId/:id` | JWT | — | Burahin ang isang mensahe at i-broadcast ang pagbura nang real time. Tingnan ang [Moderasyon ng mensahe](#message-moderation) |

### Moderasyon ng mensahe {#message-moderation}

Pinapayagang burahin ang isang mensahe ng:

- ang author ng mensahe;
- staff na may `content.edit` (kahit saan sa simbahan);
- **mga group leader**, para sa mga conversation na may `contentType` na `group` o `groupAnnouncement` at ang `contentId` ay isang group na pinamumunuan nila (`leaderGroupIds` sa JWT).

Hindi kailanman minomoderate ng leader ang person-note conversation (`person` / `personConfidential`) -- gumagamit ang mga ito ng notes permission (`people.edit`, `people.viewConfidentialNotes`) sa halip.

Pagbura lang ang ibinibigay sa mga leader, hindi pag-edit: ang muling pagsusulat ng mensahe ng ibang miyembro ay nananatiling limitado sa author at sa staff na may `content.edit`.

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

## Private Messages

Base path: `/messaging/privatemessages`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilo-load ang lahat ng private message ng kasalukuyang user (kasama ang huling mensahe bawat conversation, minamarkahan ang lahat bilang nabasa na) |
| GET | `/existing/:personId` | JWT | — | Hanapin ang umiiral na private conversation kasama ang isang partikular na tao |
| GET | `/:id` | JWT | — | Ilo-load ang isang private message ayon sa ID (nililinis ang notification kung naka-address sa kasalukuyang user) |
| POST | `/` | JWT | — | Magpadala ng private message (batch). Nag-t-trigger ng push notification sa tatanggap |

## Notifications

Base path: `/messaging/notifications`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Kunin ang bilang ng hindi pa nababasang notification ng kasalukuyang user |
| GET | `/my` | JWT | — | Ilo-load ang lahat ng notification ng kasalukuyang user (minamarkahan ang lahat bilang nabasa na) |
| GET | `/tmpEmail` | Public | — | Mag-trigger ng daily email notification digest (debug/cron endpoint) |
| GET | `/:churchId/person/:personId` | JWT | — | Ilo-load ang mga notification ng isang partikular na tao |
| GET | `/:churchId/:id` | JWT | — | Ilo-load ang isang notification ayon sa ID |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga notification (batch) |
| POST | `/create` | JWT | — | Gumawa ng mga notification para sa maraming tao. Body: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Markahan bilang nabasa na ang lahat ng notification ng isang tao |
| POST | `/sendTest` | JWT | — | Magpadala ng test push notification. Body: `{ personId, title }` |
| POST | `/ping` | Public | — | Gumawa ng notification mula sa external na trigger. Body: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Burahin ang isang notification |

### Halimbawa: Gumawa ng Notification

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

## Notification Preferences

Base path: `/messaging/notificationpreferences`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/categories` | JWT | — | Ilista ang mga notification category kasama ang kanilang default at pinapayagang channel |
| GET | `/my` | JWT | — | Ilo-load ang notification preferences ng kasalukuyang user (awtomatikong gumagawa ng default kung wala pa) |
| POST | `/` | JWT | — | I-save ang preferences ng kasalukuyang user. Body: alinman sa `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, kasama ang opsyonal na `overrides: [{ categoryKey, channel, optedIn }]` (ang channel ay maaaring `push`, `email`, `in_app`, o `sms`; hindi pinapansin ang mga naka-lock na category). Ang `allowSms` ang opt-in ng miyembro para sa text reminder. Tinatanggap pa rin ang legacy na body na array ng mga row |

## Connections

Base path: `/messaging/connections`

Pinamamahalaan ang mga WebSocket/real-time connection para sa chat, group conversation, private message, at live streaming. Tingnan ang [Real-time Architecture](../../realtime) para sa buong protocol mula simula hanggang dulo.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | Public | — | Ilo-load ang lahat ng connection ng isang conversation |
| POST | `/` | Public | — | Magrehistro ng mga connection (batch). Nag-t-trigger ng attendance broadcast sa conversation. Mga item ng body: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Public | — | I-update ang display name ng isang connection ayon sa socket ID. Body: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Public | — | Alisin ang isang connection sa conversation. Nag-t-trigger ng attendance broadcast |
| POST | `/tmpSendAlert` | Public | — | Magpadala ng notification alert sa mga connection ng isang tao. Body: `{ churchId, personId }` |

## Devices

Base path: `/messaging/devices`

Pinamamahalaan ang device registration para sa push notification at content pairing (hal., ang Lessons app sa TV display).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | Mag-enroll o mag-update ng device (mobile push registration). Tumutugma ayon sa FCM token o device ID |
| POST | `/enrollAnon` | Public | — | Mag-enroll ng anonymous na device at gumawa ng 4-character na pairing code |
| POST | `/` | Public | — | I-save ang mga device (batch) |
| GET | `/pair/:pairingCode` | JWT | — | I-pair ang isang device gamit ang pairing code nito. Opsyonal na `?contentType=&contentId=` para mag-assign ng content |
| GET | `/status/:deviceId` | Public | — | Tingnan ang pairing status ng isang device |
| GET | `/:churchId` | JWT | — | Ilo-load ang lahat ng device ng isang simbahan |
| GET | `/:churchId/person/:personId` | JWT | — | Ilo-load ang lahat ng device ng isang tao |
| GET | `/:churchId/:id` | JWT | — | Ilo-load ang isang device ayon sa ID |
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

## Device Contents

Base path: `/messaging/devicecontents`

Pinamamahalaan ang mga content assignment para sa mga naka-pair na device (hal., aling lesson ang ipinapakita sa TV).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Ilo-load ang mga content assignment ng isang device |
| POST | `/` | JWT | — | I-save ang mga content assignment ng device (batch) |
| DELETE | `/:id` | JWT | — | Burahin ang isang content assignment ng device |

## Texting

Base path: `/messaging/texting`

Pinamamahalaan ang mga SMS texting provider, group text messaging, at delivery tracking.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | Ilo-load ang mga texting provider ng simbahan (namamaskara ang mga credential) |
| GET | `/status` | JWT | — | `{ enabled }` -- kung may naka-enable na texting provider ang simbahan. Sinumang naka-sign in na user ng simbahan; ginagamit para ipakita ang mga opsyong **Text** kapag maaari nang magpadala ng text |
| GET | `/inboundUrl` | JWT | `texting.send` o `settings.edit` | `{ url }` -- ang inbound (STOP) webhook URL ng simbahan na ipe-paste sa provider |
| POST | `/inbound/:churchId/:token` | Public | — | Inbound-message webhook ng provider. Ang `token` ay HMAC ng church id. Ang reply na eksaktong stop word (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`) ay nagmamarka sa bawat tugmang tao bilang `optedOut` at pinapatay ang kanilang `allowSms`. Nagbabalik ng `{ optedOut: <count> }`; ang ibang reply ay nagbabalik ng `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | I-preview ang mga tatanggap ng group text (bilang ng eligible, opted-out, at walang phone) |
| GET | `/sent` | JWT | — | Ilo-load ang lahat ng naipadalang text message record ng simbahan |
| GET | `/sent/:id/details` | JWT | — | Ilo-load ang isang naipadalang text kasama ang delivery log ng bawat tatanggap |
| POST | `/providers` | JWT | — | I-save ang mga texting provider (batch). Nag-e-encrypt ng API credential |
| POST | `/send` | JWT | — | Magpadala ng SMS sa lahat ng eligible na miyembro ng isang group. Body: `{ groupId, message }`. Ang mga merge field (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) ay nireresolba para sa bawat tatanggap |
| POST | `/sendPerson` | JWT | — | Magpadala ng SMS sa isang tao. Body: `{ personId, phoneNumber, message }`. Nireresolba ang mga merge field, at ang resolved na text ang nilalagay sa log |
| DELETE | `/providers/:id` | JWT | — | Burahin ang isang texting provider |

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

## Email Templates

Base path: `/messaging/emailTemplates`

Pinamamahalaan ang mga reusable na email template at ang pagpapadala ng naka-template na email sa mga group.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilo-load ang lahat ng email template ng simbahan |
| GET | `/:id` | JWT | — | Ilo-load ang isang email template ayon sa ID |
| GET | `/preview/:groupId` | JWT | — | I-preview ang email delivery para sa isang group (bilang ng eligible na tatanggap, mga miyembrong walang email) |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga email template (batch) |
| POST | `/send` | JWT | — | Magpadala ng naka-template na email sa lahat ng miyembro ng isang group. Body: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Burahin ang isang email template |

### Halimbawa: Magpadala ng Email sa Group

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

## Blocked IPs

Base path: `/messaging/blockedips`

(legacy) Pag-block ng IP para sa live streaming chat. Hindi na tinatawag ng B1App client ang `POST /` -- inalis ang IP blocking sa unified-delivery migration. Tinatawag pa rin ng `/clear` route nang server-to-server ng `StreamingServiceController` kapag sine-save ang mga streaming service.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | (legacy) I-save ang mga blocked IP (batch). Walang aktibong client |
| POST | `/clear` | JWT | — | Burahin ang lahat ng blocked IP para sa partikular na mga service. Body: `[{ serviceId, churchId }]` |

## Delivery Logs

Base path: `/messaging/deliverylogs`

Sinusubaybayan ang delivery status ng mga naipadalang mensahe (SMS, push notification, email).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Ilo-load ang mga delivery log ayon sa content type at ID |
| GET | `/person/:personId` | JWT | — | Ilo-load ang mga delivery log ng isang tao. Opsyonal na filter na `?startDate=&endDate=` |
| GET | `/recent` | JWT | — | Ilo-load ang mga kamakailang delivery log ng simbahan. Opsyonal na `?limit=` (default 100) |
| GET | `/:id` | JWT | — | Ilo-load ang isang delivery log ayon sa ID |

## Kaugnay na Mga Pahina

- [Real-time Architecture](../../realtime) -- WebSocket protocol, room subscription, at ang unified delivery framework
- [Web Push Notifications](../../web-push) -- Browser push enrollment at delivery
- [Membership Endpoints](./membership) -- People, group, role, at core identity
- [Attendance Endpoints](./attendance) -- Pagsubaybay ng service at pagbisita
- [Authentication & Permissions](./authentication) -- Login flow, JWT, OAuth, permission model
- [Module Structure](../module-structure) -- Mga pattern ng organisasyon ng code
