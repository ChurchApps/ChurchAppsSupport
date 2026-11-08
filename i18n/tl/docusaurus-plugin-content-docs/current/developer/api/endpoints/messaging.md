---
title: "Mga Endpoint ng Messaging"
description: "Sanggunian para sa mga API endpoint ng ChurchApps messaging: mga usapan, mga patakaran sa pag-access ng mga tala, texting, mga email template, notification, at mga device."
---

# Mga Endpoint ng Messaging

<div class="article-intro">

Pinamamahalaan ng Messaging module ang mga real-time na usapan, chat message, push notification, paghahatid ng SMS/email, koneksyon ng WebSocket, pribadong mensahe, pagpaparehistro ng device, at mga texting provider. Ito ang communication layer na ginagamit sa lahat ng ChurchApps application, para sa live streaming chat at para sa mga asynchronous na notification.

</div>

**Pangunahing path:** `/messaging`

## Mga Usapan

Pangunahing path: `/messaging/conversations`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | I-load ang mga usapan gamit ang mga ID na pinaghihiwalay ng kuwit, kasama ang unang at huling mensahe |
| GET | `/messages/:contentType/:contentId` | JWT | — | I-load ang mga usapan para sa content na may paginated na mga mensahe (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Kunin ang mga usapang uri ng post para sa mga grupo ng kasalukuyang user |
| GET | `/posts/group/:groupId` | JWT | — | Kunin ang mga usapang uri ng post para sa isang partikular na grupo |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | Pinakabagong mga tala mula sa lahat ng record para sa pahina ng Notes ng B1 Admin. Ang `section` ay `people`, `groups`, `events` o `workflows` (400 kung iba); ang `limit` ay 25 bilang default (pinakamataas na 100); ang `before` ay ang cursor mula sa nakaraang pahina. Bawat tala ay dumadaan pa rin sa patakaran ng sarili nitong uri (permission sa People Edit / confidential notes, mga leader ng grupo, mga viewer ng event, mga viewer ng workflow card), kaya ang mga tumatawag ay nakakakita lamang ng mga tala na mabubuksan nila. Ang teksto ng tala ay pinuputol sa 300 karakter |
| GET | `/current/:churchId/:contentType/:contentId` | Publiko | — | Kunin o gumawa ng kasalukuyang usapan para sa content (awtomatikong dine-decrypt ang contentId) |
| GET | `/:churchId/:contentType/:contentId` | Publiko | — | I-load ang mga usapan ayon sa content type at ID |
| GET | `/:churchId/:id` | Publiko | — | I-load ang isang usapan ayon sa ID |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga usapan (batch) |
| POST | `/start` | JWT | — | Simulan ang bagong usapan gamit ang paunang komento |
| DELETE | `/:churchId/:id` | JWT | — | Burahin ang isang usapan |

### Kontrol sa pag-access ng tala ng tao

Ang mga usapang may `contentType: "person"` (ang tab na Notes sa record ng tao) o `contentType: "personConfidential"` (ang seksyong Confidential Notes) ay nakabantay sa bawat read at write path, kabilang ang mga nabanggit na public route, na nagbabalik ng `401` para sa mga content type na ito. Kailangan ng `person` ang permiso ng MembershipApi na **People / Edit**; kailangan naman ng `personConfidential` ang **People / View Confidential Notes**. Para sa mga scoped API key, sakop ng `people:write` ang parehong aksyon (dapat pa ring hawak ng user ng key ang pinagbabatayang permiso ng role).

### Kontrol sa pag-access ng tala ng grupo at event {#group-and-event-notes-access-control}

Dalawa pang uri ng tala ang nakabantay sa parehong paraan, sa bawat read at write path (kabilang ang mga nabanggit na public route), at hindi kailanman bukas para sa anonymous na pag-post:

- **`groupNote`** (`contentId` = group ID) -- ang feed ng **Leader notes** sa isang grupo. Ang mga leader lamang ng grupong iyon (`leaderGroupIds` sa JWT) ang makakabasa o makakapag-post. Walang permiso ng staff ang nagbibigay ng access dito, kabilang ang `content.edit` at mga permiso ng membership sa grupo.
- **`eventNote`** (`contentId` = event ID) -- ang mga tala sa isang calendar event. Ang staff na may `content.edit` o **Calendars / Admin** ay laging makakabasa at makakapag-post. Kung wala, sumusunod ang access sa `notesViewRole` (pagbasa) at `notesPostRole` (pag-post) ng event: ang `staff` (default, ginagamit kapag `null ang field) ay hindi nagbibigay ng access sa iba, ang `leaders` ay nagbibigay ng access sa mga leader ng grupo ng event, at ang `members` ay nagbibigay ng access sa mga miyembro at leader ng grupo ng event. Ang event na walang `groupId` ay para sa staff lamang.

### Kontrol sa pag-access ng tala ng workflow card

Ang mga usapang may `contentType: "workflowCard"` (ang mga tala sa isang workflow card, kung saan ang `contentId` ay ang task ID ng card) ay mababasa at mababago lamang ng taong makakabukas ng card na iyon: isang user na may permiso ng DoingApi na **Tasks / View**, o ang taong o grupong nakatalaga sa card, gumawa nito, o tungkol dito. Ang iba ay makakatanggap ng `401` sa bawat read path, kabilang ang mga nabanggit na public route. Ang usapan ng card ay ikinakabit sa mismong card gamit ang `POST /doing/tasks/:id/conversation` (body `{ "conversationId": "..." }`; ang unang usapang naikabit ang nananatili), na maaaring tawagin ng mga editor ng card at ng itinalagang assignee nito.

### Halimbawa: Simulan ang Usapan

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

Pangunahing path: `/messaging/messages`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | I-load ang lahat ng mensahe ng isang usapan |
| GET | `/catchup/:churchId/:conversationId` | Publiko | — | I-load ang lahat ng mensahe ng isang usapan (public catchup para sa live chat) |
| GET | `/:churchId/:id` | Publiko | — | I-load ang isang mensahe ayon sa ID |
| POST | `/` | JWT | — | I-save ang mga mensahe (batch). Nagpapadala ng real-time na update at nag-trigger ng mga notification. Ang pag-update ng umiiral na mensahe ay nangangailangan na ikaw ang may-akda nito o may hawak ng `content.edit`; hindi kailanman maaaring ilipat sa iba ang nakatalang may-akda |
| POST | `/send` | Publiko | — | Magpadala ng mga mensahe (batch, public). Nagpapadala ng real-time na update sa pamamagitan ng WebSocket at nag-trigger ng mga notification |
| POST | `/setCallout` | JWT | — | (legacy) Mag-broadcast ng callout message nang real time. Walang aktibong client; hindi na nire-render ng live stream chat ang mga callout |
| DELETE | `/:churchId/:id` | JWT | — | Burahin ang isang mensahe at i-broadcast ang pagbura nang real time. Tingnan ang [Pagmo-moderate ng mensahe](#message-moderation) |

### Pagmo-moderate ng mensahe

Maaaring burahin ang isang mensahe ng:

- ang may-akda ng mensahe;
- staff na may `content.edit` (saanman sa simbahan);
- **mga leader ng grupo**, para sa mga usapang may `contentType` na `group` o `groupAnnouncement` na ang `contentId` ay grupong pinamumunuan nila (`leaderGroupIds` sa JWT).

Ang mga usapan ng tala ng tao (`person` / `personConfidential`) ay hindi kailanman namo-moderate ng leader—gumagamit ang mga ito ng mga permiso sa tala (`people.edit`, `people.viewConfidentialNotes`).

Pagbura lamang ang nakukuha ng mga leader, hindi pag-edit: ang muling pagsulat ng mensahe ng ibang miyembro ay nananatiling limitado sa may-akda at sa staff na may `content.edit`.

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

Pangunahing path: `/messaging/privatemessages`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | I-load ang lahat ng pribadong mensahe ng kasalukuyang user (kasama ang huling mensahe bawat usapan, at minamarkahan ang lahat bilang nabasa na) |
| GET | `/existing/:personId` | JWT | — | Hanapin ang umiiral na pribadong usapan kasama ang isang partikular na tao |
| GET | `/:id` | JWT | — | I-load ang isang pribadong mensahe ayon sa ID (binubura ang notification kung para sa kasalukuyang user) |
| POST | `/` | JWT | — | Magpadala ng mga pribadong mensahe (batch). Nagti-trigger ng push notification sa tatanggap |

## Mga Notification

Pangunahing path: `/messaging/notifications`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Kunin ang bilang ng hindi pa nababasang notification ng kasalukuyang user |
| GET | `/my` | JWT | — | I-load ang lahat ng notification ng kasalukuyang user (minamarkahan lahat bilang nabasa na) |
| GET | `/tmpEmail` | Publiko | — | I-trigger ang pang-araw-araw na email digest ng notification (debug/cron endpoint) |
| GET | `/:churchId/person/:personId` | JWT | — | I-load ang mga notification ng isang partikular na tao |
| GET | `/:churchId/:id` | JWT | — | I-load ang isang notification ayon sa ID |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga notification (batch) |
| POST | `/create` | JWT | — | Gumawa ng mga notification para sa maraming tao. Body: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Markahan bilang nabasa na ang lahat ng notification ng isang tao |
| POST | `/sendTest` | JWT | — | Magpadala ng test push notification. Body: `{ personId, title }` |
| POST | `/ping` | Publiko | — | Gumawa ng notification mula sa external trigger. Body: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Burahin ang isang notification |

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

Pangunahing path: `/messaging/notificationpreferences`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/categories` | JWT | — | Ilista ang mga kategorya ng notification kasama ang kanilang default at pinahihintulutang channel |
| GET | `/my` | JWT | — | I-load ang mga kagustuhan sa notification ng kasalukuyang user (awtomatikong gumagawa ng default kung wala pa) |
| POST | `/` | JWT | — | I-save ang mga kagustuhan ng kasalukuyang user. Body: alinman sa `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, at opsyonal na `overrides: [{ categoryKey, channel, optedIn }]` (ang channel ay maaaring `push`, `email`, `in_app`, o `sms`; hindi pinapansin ang mga naka-lock na kategorya). Ang `allowSms` ang opt-in ng miyembro para sa mga paalala sa text. Tinatanggap pa rin ang legacy na body na array ng mga row |

## Mga Koneksyon

Pangunahing path: `/messaging/connections`

Pinamamahalaan ang mga koneksyon ng WebSocket/real-time para sa chat, mga usapan ng grupo, pribadong mensahe, at live streaming. Tingnan ang [Real-time Architecture](../../realtime.md) para sa buong protocol.

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | Publiko | — | I-load ang lahat ng koneksyon ng isang usapan |
| POST | `/` | Publiko | — | Magparehistro ng mga koneksyon (batch). Nagti-trigger ng attendance broadcast sa usapan. Mga item ng body: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Publiko | — | I-update ang display name ng isang koneksyon ayon sa socket ID. Body: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Publiko | — | Alisin ang isang koneksyon sa usapan. Nagti-trigger ng attendance broadcast |
| POST | `/tmpSendAlert` | Publiko | — | Magpadala ng notification alert sa mga koneksyon ng isang tao. Body: `{ churchId, personId }` |

## Mga Device

Pangunahing path: `/messaging/devices`

Pinamamahalaan ang pagpaparehistro ng device para sa push notification at pagpapares ng content (hal. Lessons app sa mga TV display).

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | Mag-enroll o mag-update ng device (pagpaparehistro ng mobile push). Tumutugma ayon sa FCM token o device ID |
| POST | `/enrollAnon` | Publiko | — | Mag-enroll ng anonymous na device at gumawa ng 4-character na pairing code |
| POST | `/` | Publiko | — | I-save ang mga device (batch) |
| GET | `/pair/:pairingCode` | JWT | — | Ipares ang isang device gamit ang pairing code nito. Opsyonal na `?contentType=&contentId=` para magtalaga ng content |
| GET | `/status/:deviceId` | Publiko | — | Suriin ang estado ng pagpapares ng isang device |
| GET | `/:churchId` | JWT | — | I-load ang lahat ng device ng isang simbahan |
| GET | `/:churchId/person/:personId` | JWT | — | I-load ang lahat ng device ng isang tao |
| GET | `/:churchId/:id` | JWT | — | I-load ang isang device ayon sa ID |
| DELETE | `/:churchId/:id` | JWT | — | Burahin ang isang device |

### Halimbawa: Mag-enroll ng Device

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

## Nilalaman ng Device

Pangunahing path: `/messaging/devicecontents`

Pinamamahalaan ang mga takdang content para sa mga nakapares na device (hal. aling aralin ang ipinapakita sa TV).

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | I-load ang mga takdang content ng isang device |
| POST | `/` | JWT | — | I-save ang mga takdang content ng device (batch) |
| DELETE | `/:id` | JWT | — | Burahin ang isang takdang content ng device |

## Texting

Pangunahing path: `/messaging/texting`

Pinamamahalaan ang mga SMS texting provider, group text messaging, at pagsubaybay sa paghahatid.

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | I-load ang mga texting provider ng simbahan (namamaskara ang mga credential) |
| GET | `/status` | JWT | — | `{ enabled }` — kung may naka-enable na texting provider ang simbahan. Sinumang naka-sign in na user ng simbahan; ginagamit para ipakita ang mga opsyong **Text** kapag maaaring magpadala ng text |
| GET | `/inboundUrl` | JWT | `texting.send` o `settings.edit` | `{ url }` — ang inbound (STOP) webhook URL ng simbahan na ipe-paste sa provider |
| POST | `/inbound/:churchId/:token` | Publiko | — | Inbound-message webhook ng provider. Ang `token` ay HMAC ng church ID. Ang reply na eksaktong stop word (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`) ay nagmamarka sa bawat tugmang tao bilang `optedOut` at pinapatay ang kanilang `allowSms`. Nagbabalik ng `{ optedOut: <count> }`; ang ibang reply ay nagbabalik ng `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | I-preview ang mga tatanggap ng group text (mga bilang ng karapat-dapat, nag-opt-out, at walang telepono) |
| GET | `/sent` | JWT | — | I-load ang lahat ng naipadalang text message record ng simbahan |
| GET | `/sent/:id/details` | JWT | — | I-load ang isang naipadalang text kasama ang delivery log bawat tatanggap |
| POST | `/providers` | JWT | — | I-save ang mga texting provider (batch). Nine-encrypt ang mga API credential |
| POST | `/send` | JWT | — | Magpadala ng SMS sa lahat ng karapat-dapat na miyembro ng grupo. Body: `{ groupId, message }`. Ang mga merge field (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) ay niresolba para sa bawat tatanggap |
| POST | `/sendPerson` | JWT | — | Magpadala ng SMS sa isang tao. Body: `{ personId, phoneNumber, message }`. Niresolba ang mga merge field, at ang naresolbang teksto ang naitatala |
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

## Mga Email Template

Pangunahing path: `/messaging/emailTemplates`

Pinamamahalaan ang mga magagamit-muli na email template at ang pagpapadala ng mga naka-template na email sa mga grupo.

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | I-load ang lahat ng email template ng simbahan |
| GET | `/:id` | JWT | — | I-load ang isang email template ayon sa ID |
| GET | `/sendStatus` | JWT | `groupMembers.edit` o `tasks.admin` | Ang status ng group email ng simbahan: `{ approved, paused, remaining, requested }`. Ginagamit ng dialog na Send Email ng B1Admin at ng aksyong workflow na **Send email** para magbabala kapag hindi makakalabas ang email |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | Humiling sa support na aprubahan ang simbahan para sa group email (pinakamaraming isang beses bawat simbahan kada linggo) |
| GET | `/preview/:groupId` | JWT | — | I-preview ang paghahatid ng email sa isang grupo (bilang ng karapat-dapat na tatanggap, mga miyembrong walang email) |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga email template (batch) |
| POST | `/send` | JWT | — | Magpadala ng naka-template na email sa lahat ng miyembro ng grupo. Body: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Burahin ang isang email template |

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

Pangunahing path: `/messaging/blockedips`

(legacy) Pag-block ng IP para sa live streaming chat. Hindi na tinatawag ng B1App client ang `POST /`—inalis ang pag-block ng IP sa unified-delivery migration. Tinatawag pa rin ang route na `/clear` ng `StreamingServiceController` nang server-to-server kapag na-save ang mga streaming service.

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | (legacy) I-save ang mga naka-block na IP (batch). Walang aktibong client |
| POST | `/clear` | JWT | — | Burahin ang lahat ng naka-block na IP para sa mga partikular na service. Body: `[{ serviceId, churchId }]` |

## Mga Delivery Log

Pangunahing path: `/messaging/deliverylogs`

Sinusubaybayan ang status ng paghahatid ng mga naipadalang mensahe (SMS, push notification, email).

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | I-load ang mga delivery log ayon sa content type at ID |
| GET | `/person/:personId` | JWT | — | I-load ang mga delivery log ng isang tao. Opsyonal na filter na `?startDate=&endDate=` |
| GET | `/recent` | JWT | — | I-load ang mga kamakailang delivery log ng simbahan. Opsyonal na `?limit=` (default 100) |
| GET | `/:id` | JWT | — | I-load ang isang delivery log ayon sa ID |

## Mga Kaugnay na Pahina

- [Real-time Architecture](../../realtime.md) -- protocol ng WebSocket, mga room subscription, at ang unified delivery framework
- [Web Push Notifications](../../web-push.md) -- Pagpaparehistro at paghahatid ng browser push
- [Membership Endpoints](./membership.md) -- Mga tao, grupo, role, at pangunahing pagkakakilanlan
- [Attendance Endpoints](./attendance.md) -- Pagsubaybay sa serbisyo at pagbisita
- [Authentication & Permissions](./authentication.md) -- Daloy ng login, JWT, OAuth, modelo ng permiso
- [Module Structure](../module-structure.md) -- Mga pattern ng organisasyon ng code
