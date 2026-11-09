---
title: "Mga Endpoint ng Messaging"
description: "Sanggunian para sa mga API endpoint ng ChurchApps messaging: mga usapan, patakaran sa pag-access ng mga tala, texting, mga email template, notification, at mga device."
---

# Mga Endpoint ng Messaging

<div class="article-intro">

Pinamamahalaan ng Messaging module ang mga real-time na usapan, chat message, push notification, paghahatid ng SMS/email, koneksyon ng WebSocket, pribadong mensahe, pagpaparehistro ng device, at mga texting provider. Ito ang communication layer na ginagamit sa lahat ng ChurchApps application, para sa live streaming chat at para sa mga asynchronous na notification.

</div>

**Base path:** `/messaging`

## Mga Usapan

Base path: `/messaging/conversations`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | I-load ang mga usapan gamit ang mga ID na pinaghihiwalay ng kuwit, kasama ang una at huling mensahe |
| GET | `/messages/:contentType/:contentId` | JWT | — | I-load ang mga usapan para sa content na may paginated na mga mensahe (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Kunin ang mga post-type na usapan para sa mga grupo ng kasalukuyang user |
| GET | `/posts/group/:groupId` | JWT | — | Kunin ang mga post-type na usapan para sa isang partikular na grupo |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | Pinakabagong mga tala sa lahat ng record para sa pahina ng Notes ng B1 Admin. Ang `section` ay `people`, `groups`, `events`, o `workflows` (400 kung iba); ang `limit` ay 25 bilang default (pinakamataas na 100); ang `before` ay ang cursor mula sa nakaraang pahina. Bawat tala ay dumadaan pa rin sa patakaran ng sarili nitong uri (People Edit / confidential notes permission, mga leader ng grupo, event viewer, workflow card viewer), kaya nakikita lang ng mga tumatawag ang mga tala na mabubuksan nila. Pinuputol sa 300 karakter ang teksto ng tala |
| GET | `/current/:churchId/:contentType/:contentId` | Public | — | Kunin o gumawa ng kasalukuyang usapan para sa content (awtomatikong dine-decrypt ang contentId) |
| GET | `/:churchId/:contentType/:contentId` | Public | — | I-load ang mga usapan ayon sa content type at ID |
| GET | `/:churchId/:id` | Public | — | I-load ang isang usapan ayon sa ID |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga usapan (batch) |
| POST | `/start` | JWT | — | Magsimula ng bagong usapan kasama ang paunang komentong mensahe |
| DELETE | `/:churchId/:id` | JWT | — | Burahin ang isang usapan |

### Kontrol sa pag-access ng tala ng tao

Ang mga usapang may `contentType: "person"` (ang tab na Notes sa record ng tao) o `contentType: "personConfidential"` (ang seksyong Confidential Notes) ay nakabantay sa bawat read at write path, kabilang ang mga nabanggit na public route, na nagbabalik ng `401` para sa mga content type na ito. Kailangan ng `person` ang MembershipApi permission na **People / Edit**; kailangan naman ng `personConfidential` ang **People / View Confidential Notes**. Para sa mga scoped API key, sakop ng `people:write` ang parehong aksyon (dapat pa ring hawak ng user ng key ang pinagbabatayang permiso ng role).

### Kontrol sa pag-access ng tala ng grupo at event {#group-and-event-notes-access-control}

Dalawa pang uri ng tala ang nakabantay sa parehong paraan, sa bawat read at write path (kabilang ang mga nabanggit na public route), at hindi kailanman bukas para sa anonymous na pag-post:

- **`groupNote`** (`contentId` = group ID) -- ang feed na **Leader notes** sa isang grupo. Ang mga leader lamang ng grupong iyon (`leaderGroupIds` sa JWT) ang makakabasa o makakapag-post. Walang permiso ng staff ang nagbibigay ng access dito, kabilang ang `content.edit` at mga permiso ng membership sa grupo.
- **`eventNote`** (`contentId` = event ID) -- ang mga tala sa isang calendar event. Ang staff na may `content.edit` o **Calendars / Admin** ay laging makakabasa at makakapag-post. Kung wala, sumusunod ang access sa `notesViewRole` (pagbasa) at `notesPostRole` (pag-post) ng event: ang `staff` (default, ginagamit kapag `null` ang field) ay hindi nagbibigay ng access sa iba, ang `leaders` ay nagbibigay ng access sa mga leader ng grupo ng event, at ang `members` ay nagbibigay ng access sa mga miyembro at leader ng grupo ng event. Ang event na walang `groupId` ay para sa staff lamang.

### Kontrol sa pag-access ng tala ng workflow card

Ang mga usapang may `contentType: "workflowCard"` (ang mga tala sa isang workflow card, kung saan ang `contentId` ay ang task ID ng card) ay mababasa at maisusulatan lamang ng sinumang makakabukas ng card na iyon: isang user na may DoingApi permission na **Tasks / View**, o ang taong o grupong nakatalaga sa card, gumawa nito, o tungkol dito. Ang iba ay makakatanggap ng `401` sa bawat read path, kabilang ang mga nabanggit na public route. Ang usapan ng card ay ikinakabit sa mismong card gamit ang `POST /doing/tasks/:id/conversation` (body `{ "conversationId": "..." }`; ang unang usapang naikabit ang nananatili), na maaaring tawagin ng mga editor ng card at ng assignee nito.

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

Base path: `/messaging/messages`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | I-load ang lahat ng mensahe ng isang usapan |
| GET | `/catchup/:churchId/:conversationId` | Public | — | I-load ang lahat ng mensahe ng isang usapan (public catchup para sa live chat) |
| GET | `/:churchId/:id` | Public | — | I-load ang isang mensahe ayon sa ID |
| POST | `/` | JWT | — | I-save ang mga mensahe (batch). Nagpapadala ng real-time na update at nag-t-trigger ng mga notification. Ang pag-update ng umiiral na mensahe ay nangangailangan na ikaw ang may-akda nito o may hawak ng `content.edit`; hindi kailanman maaaring ilipat ang nakatalang may-akda |
| POST | `/send` | Public | — | Magpadala ng mga mensahe (batch, public). Nagpapadala ng real-time na update sa pamamagitan ng WebSocket at nag-t-trigger ng mga notification |
| POST | `/setCallout` | JWT | — | (legacy) Mag-broadcast ng callout message nang real time. Walang aktibong client; hindi na nire-render ng live stream chat ang mga callout |
| DELETE | `/:churchId/:id` | JWT | — | Burahin ang isang mensahe at i-broadcast ang pagbura nang real time. Tingnan ang [Message moderation](#message-moderation) |

### Pagmo-moderate ng mensahe {#message-moderation}

Maaaring burahin ang isang mensahe ng:

- ang may-akda ng mensahe;
- staff na may `content.edit` (saanman sa simbahan);
- **mga leader ng grupo**, para sa mga usapang may `contentType` na `group` o `groupAnnouncement` na ang `contentId` ay grupong pinamumunuan nila (`leaderGroupIds` sa JWT).

Hindi kailanman namo-moderate ng leader ang mga usapan ng tala ng tao (`person` / `personConfidential`) -- gumagamit ang mga ito ng mga permiso sa tala (`people.edit`, `people.viewConfidentialNotes`).

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

Base path: `/messaging/privatemessages`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | I-load ang lahat ng pribadong mensahe ng kasalukuyang user (kasama ang huling mensahe bawat usapan, at minamarkahang nabasa na ang lahat) |
| GET | `/existing/:personId` | JWT | — | Hanapin ang umiiral na pribadong usapan kasama ang isang partikular na tao |
| GET | `/:id` | JWT | — | I-load ang isang pribadong mensahe ayon sa ID (binubura ang notification kung para sa kasalukuyang user) |
| POST | `/` | JWT | — | Magpadala ng mga pribadong mensahe (batch). Nagti-trigger ng push notification sa tatanggap |

## Mga Notification

Base path: `/messaging/notifications`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Kunin ang bilang ng hindi pa nababasang notification ng kasalukuyang user |
| GET | `/my` | JWT | — | I-load ang lahat ng notification ng kasalukuyang user (minamarkahang nabasa na ang lahat) |
| GET | `/tmpEmail` | Public | — | I-trigger ang pang-araw-araw na email digest ng notification (debug/cron endpoint) |
| GET | `/:churchId/person/:personId` | JWT | — | I-load ang mga notification ng isang partikular na tao |
| GET | `/:churchId/:id` | JWT | — | I-load ang isang notification ayon sa ID |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga notification (batch) |
| POST | `/create` | JWT | — | Gumawa ng mga notification para sa maraming tao. Body: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Markahang nabasa na ang lahat ng notification ng isang tao |
| POST | `/sendTest` | JWT | — | Magpadala ng test push notification. Body: `{ personId, title }` |
| POST | `/ping` | Public | — | Gumawa ng notification mula sa external trigger. Body: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Burahin ang isang notification |
| GET | `/groupPreview/:groupId` | JWT | `groupMembers.edit` | Bilangin kung ilan sa mga miyembro ng grupo ang maaabot ng isang push |
| GET | `/churchPreview` | JWT | `content.edit` | Bilangin kung ilang tao ang maaabot ng push sa lahat ng may app |
| POST | `/group/send` | JWT | `groupMembers.edit` | Magpadala ng push sa mga miyembro ng grupo ngayon mismo |

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

## Mga Naka-iskedyul na Notification

Base path: `/messaging/scheduledNotifications`

Mga push na naka-iskedyul nang maaga. Ang `audience` ay `church` (lahat ng may app; kailangan ang `content.edit`) o `group` (kailangan ang `groupMembers.edit` at `groupId`). Hanggang 80 karakter ang title at 240 ang message. Ang due na row ay ipinapadala ng 1-minutong timer.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | `groupMembers.edit` o `content.edit` | Ilista ang mga naka-iskedyul at kamakailang notification ng simbahan |
| POST | `/` | JWT | ayon sa audience | Gumawa ng naka-iskedyul na notification, o mag-update kapag may `id`. Body: `{ id?, audience, groupId?, title, message, link?, imageUrl?, sendAt }`. Ang pag-update ng isang hindi na pending ay nagbabalik ng 409 |
| POST | `/:id/sendNow` | JWT | ayon sa audience | Ipadala ngayon ang isang pending na notification. Nagbabalik ng 409 kung naipadala na, kinansela, o kasalukuyang ipinapadala |
| DELETE | `/:id` | JWT | ayon sa audience | Kanselahin ang isang pending na notification, o alisin ang naipadala, pumalyang, o kinanselang notification sa listahan. Nagbabalik ng 409 habang ipinapadala ito |
| DELETE | `/` | JWT | `groupMembers.edit` o `content.edit` | Alisin ang bawat naipadala, pumalya, at kinanselang notification para sa mga audience na maipapadalhan ng user. Nagbabalik ng `{ deleted }` |

## Mga Kagustuhan sa Notification

Base path: `/messaging/notificationpreferences`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/categories` | JWT | — | Ilista ang mga kategorya ng notification kasama ang kanilang default at pinapayagang channel |
| GET | `/my` | JWT | — | I-load ang mga kagustuhan sa notification ng kasalukuyang user (awtomatikong gumagawa ng default kung wala pa) |
| POST | `/` | JWT | — | I-save ang mga kagustuhan ng kasalukuyang user. Body: alinman sa `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, at opsyonal na `overrides: [{ categoryKey, channel, optedIn }]` (ang channel ay maaaring `push`, `email`, `in_app`, o `sms`; hindi pinapansin ang mga naka-lock na kategorya). Ang `allowSms` ang opt-in ng miyembro para sa mga paalala sa text. Tinatanggap pa rin ang legacy na body na array ng mga row |

## Mga Koneksyon

Base path: `/messaging/connections`

Pinamamahalaan ang mga koneksyon ng WebSocket/real-time para sa chat, mga usapan ng grupo, pribadong mensahe, at live streaming. Tingnan ang [Real-time Architecture](../../realtime.md) para sa buong protocol.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | Public | — | I-load ang lahat ng koneksyon ng isang usapan |
| POST | `/` | Public | — | Magrehistro ng mga koneksyon (batch). Nagti-trigger ng attendance broadcast sa usapan. Mga item ng body: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Public | — | I-update ang display name ng isang koneksyon ayon sa socket ID. Body: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Public | — | Alisin ang isang koneksyon sa usapan. Nagti-trigger ng attendance broadcast |
| POST | `/tmpSendAlert` | Public | — | Magpadala ng notification alert sa mga koneksyon ng isang tao. Body: `{ churchId, personId }` |

## Mga Device

Base path: `/messaging/devices`

Pinamamahalaan ang pagpaparehistro ng device para sa push notification at pagpapares ng content (hal., ang Lessons app sa mga TV display).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | Mag-enroll o mag-update ng device (mobile push registration). Tumutugma ayon sa FCM token o device ID |
| POST | `/enrollAnon` | Public | — | Mag-enroll ng anonymous na device at gumawa ng 4-karakter na pairing code |
| POST | `/` | Public | — | I-save ang mga device (batch) |
| GET | `/pair/:pairingCode` | JWT | — | Ipares ang isang device gamit ang pairing code nito. Opsyonal ang `?contentType=&contentId=` para magtalaga ng content |
| GET | `/status/:deviceId` | Public | — | Suriin ang status ng pagpapares ng isang device |
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

Base path: `/messaging/devicecontents`

Pinamamahalaan ang mga takdang content para sa mga nakapares na device (hal., aling lesson ang ipinapakita sa TV).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | I-load ang mga takdang content ng isang device |
| POST | `/` | JWT | — | I-save ang mga takdang content ng device (batch) |
| DELETE | `/:id` | JWT | — | Burahin ang isang takdang content ng device |

## Texting

Base path: `/messaging/texting`

Pinamamahalaan ang mga SMS texting provider, group text messaging, at pagsubaybay sa paghahatid.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | I-load ang mga texting provider ng simbahan (namamaskara ang mga credential) |
| GET | `/status` | JWT | — | `{ enabled }` -- kung may naka-enable na texting provider ang simbahan. Sinumang naka-sign in na user ng simbahan; ginagamit para ipakita ang mga opsyong **Text** kapag maaaring magpadala ng text |
| GET | `/inboundUrl` | JWT | `texting.send` o `settings.edit` | `{ url }` -- ang inbound (STOP) webhook URL ng simbahan na ipe-paste sa provider |
| POST | `/inbound/:churchId/:token` | Public | — | Inbound-message webhook ng provider. Ang `token` ay HMAC ng church ID. Ang reply na eksaktong stop word (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`) ay nagmamarka sa bawat tugmang tao bilang `optedOut` at pinapatay ang kanilang `allowSms`. Nagbabalik ng `{ optedOut: <count> }`; ang ibang reply ay nagbabalik ng `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | I-preview ang mga tatanggap ng group text (bilang ng karapat-dapat, nag-opt out, at walang telepono) |
| GET | `/sent` | JWT | — | I-load ang lahat ng naipadalang text message record ng simbahan |
| GET | `/sent/:id/details` | JWT | — | I-load ang isang naipadalang text kasama ang delivery log ng bawat tatanggap |
| POST | `/providers` | JWT | — | I-save ang mga texting provider (batch). Nine-encrypt ang mga API credential |
| POST | `/send` | JWT | — | Magpadala ng SMS sa lahat ng karapat-dapat na miyembro ng grupo. Body: `{ groupId, message }`. Nire-resolve ang mga merge field (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) para sa bawat tatanggap |
| POST | `/sendPerson` | JWT | — | Magpadala ng SMS sa isang tao. Body: `{ personId, phoneNumber, message }`. Nire-resolve ang mga merge field, at ang na-resolve na teksto ang naitatala |
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

Base path: `/messaging/emailTemplates`

Pinamamahalaan ang mga reusable na email template at ang pagpapadala ng mga naka-template na email sa mga grupo.

| Method | Path | Auth | Permission | Paglalarawan |
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

Base path: `/messaging/blockedips`

(legacy) Pag-block ng IP para sa live streaming chat. Hindi na tinatawag ng B1App client ang `POST /` -- inalis ang pag-block ng IP sa unified-delivery migration. Tinatawag pa rin ng server-to-server ang route na `/clear` ng `StreamingServiceController` kapag na-save ang mga streaming service.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | (legacy) I-save ang mga naka-block na IP (batch). Walang aktibong client |
| POST | `/clear` | JWT | — | Burahin ang lahat ng naka-block na IP para sa mga partikular na service. Body: `[{ serviceId, churchId }]` |

## Mga Delivery Log

Base path: `/messaging/deliverylogs`

Sinusubaybayan ang status ng paghahatid ng mga naipadalang mensahe (SMS, push notification, email).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | I-load ang mga delivery log ayon sa content type at ID |
| GET | `/person/:personId` | JWT | — | I-load ang mga delivery log ng isang tao. Opsyonal na filter na `?startDate=&endDate=` |
| GET | `/recent` | JWT | — | I-load ang mga kamakailang delivery log ng simbahan. Opsyonal na `?limit=` (default 100) |
| GET | `/:id` | JWT | — | I-load ang isang delivery log ayon sa ID |

## Mga Kaugnay na Pahina

- [Real-time Architecture](../../realtime.md) -- WebSocket protocol, mga room subscription, at ang unified delivery framework
- [Web Push Notifications](../../web-push.md) -- Browser push enrollment at paghahatid
- [Membership Endpoints](./membership.md) -- Mga tao, grupo, role, at pangunahing pagkakakilanlan
- [Attendance Endpoints](./attendance.md) -- Pagsubaybay sa serbisyo at pagbisita
- [Authentication & Permissions](./authentication.md) -- Daloy ng login, JWT, OAuth, modelo ng permiso
- [Module Structure](../module-structure.md) -- Mga pattern ng organisasyon ng code
