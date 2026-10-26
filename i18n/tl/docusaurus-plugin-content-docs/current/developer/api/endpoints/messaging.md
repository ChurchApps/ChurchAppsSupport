---
title: "Mga Endpoint ng Messaging"
---

# Mga Endpoint ng Messaging

<div class="article-intro">

Pinamamahalaan ng modyul na Messaging ang mga real-time na usapan, chat message, push notification, paghahatid ng SMS/email, WebSocket connection, pribadong mensahe, device registration, at mga texting provider. Ito ang nagbibigay ng communication layer na ginagamit sa lahat ng ChurchApps application, para sa live streaming chat at mga asynchronous na notification.

</div>

**Pangunahing path:** `/messaging`

## Mga Usapan

Pangunahing path: `/messaging/conversations`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | I-load ang mga usapan ayon sa mga ID na pinaghihiwalay ng kuwit, kasama ang unang at huling mensahe |
| GET | `/messages/:contentType/:contentId` | JWT | — | I-load ang mga usapan para sa content na may paginated na mensahe (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Kunin ang mga usapang uri ng post para sa mga grupo ng kasalukuyang user |
| GET | `/posts/group/:groupId` | JWT | — | Kunin ang mga usapang uri ng post para sa isang partikular na grupo |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | Pinakabagong mga tala sa lahat ng rekord para sa B1 Admin Notes page. Ang `section` ay `people`, `groups`, `events`, o `workflows` (400 kung iba); ang `limit` ay 25 bilang default (max 100); ang `before` ang cursor mula sa nakaraang page. Ang bawat tala ay sumusunod pa rin sa sariling patakaran ng uri nito (People Edit / pahintulot sa confidential notes, mga lider ng grupo, mga tumitingin ng event, mga tumitingin ng workflow card), kaya nakikita lamang ng mga tumatawag ang mga tala na mabubuksan nila. Ang teksto ng tala ay pinuputol sa 300 karakter |
| GET | `/current/:churchId/:contentType/:contentId` | Publiko | — | Kunin o gumawa ng kasalukuyang usapan para sa content (awtomatikong dini-decrypt ang contentId) |
| GET | `/:churchId/:contentType/:contentId` | Publiko | — | I-load ang mga usapan ayon sa uri ng content at ID |
| GET | `/:churchId/:id` | Publiko | — | I-load ang isang usapan ayon sa ID |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga usapan (batch) |
| POST | `/start` | JWT | — | Magsimula ng bagong usapan na may unang komento |
| DELETE | `/:churchId/:id` | JWT | — | Burahin ang usapan |

### Kontrol ng access sa tala ng tao

Ang mga usapang may `contentType: "person"` (ang tab na Notes sa rekord ng tao) o `contentType: "personConfidential"` (ang seksyong Confidential Notes) ay kontrolado sa bawat read at write path, kasama ang mga public na route sa itaas, na nagbabalik ng `401` para sa mga uri ng content na ito. Ang `person` ay nangangailangan ng pahintulot na **People / Edit** ng MembershipApi; ang `personConfidential` ay nangangailangan ng **People / View Confidential Notes**. Para sa mga scoped API key, sakop ng `people:write` ang parehong aksyon (ang user ng key ay dapat pa ring may pahintulot ng tungkuling pinagbabatayan).

### Kontrol ng access sa tala ng grupo at event {#group-and-event-notes-access-control}

May dalawa pang uri ng tala na kinokontrol sa parehong paraan, sa bawat read at write path (kasama ang mga public na route sa itaas), at hindi kailanman bukas sa anonymous na pag-post:

- **`groupNote`** (`contentId` = ID ng grupo) -- ang feed na **Leader notes** sa isang grupo. Tanging ang mga lider ng grupong iyon (`leaderGroupIds` sa JWT) ang makakabasa o makakapag-post. Walang staff permission ang nagbibigay ng access dito, kasama ang `content.edit` at ang mga pahintulot sa membership ng grupo.
- **`eventNote`** (`contentId` = ID ng event) -- ang mga tala sa isang calendar event. Palaging makakabasa at makakapag-post ang staff na may `content.edit` o **Calendars / Admin**. Kung wala sila, sinusunod ng access ang `notesViewRole` (basahin) at `notesPostRole` (mag-post) ng event: ang `staff` (ang default, ginagamit kapag `null` ang field) ay walang ibang pinapayagan, ang `leaders` ay nagbibigay-daan sa mga lider ng grupo ng event, at ang `members` ay nagbibigay-daan sa mga miyembro at lider ng grupo ng event. Ang event na walang `groupId` ay staff lamang.

### Kontrol ng access sa tala ng workflow card

Ang mga usapang may `contentType: "workflowCard"` (ang mga tala sa isang workflow card, kung saan ang `contentId` ay ang task ID ng card) ay mababasa at masusulatan lamang ng sinumang makakabukas ng card na iyon: isang user na may pahintulot na DoingApi **Tasks / View**, o ang taong o grupong nakatalaga sa card, gumawa nito, o tungkol dito. Ang lahat ng iba ay makakakuha ng `401` sa bawat read path, kasama ang mga public na route sa itaas. Naka-attach ang usapan ng isang card sa pamamagitan ng card mismo gamit ang `POST /doing/tasks/:id/conversation` (body `{ "conversationId": "..." }`; ang unang naka-attach na usapan ang mananalo), na maaaring tawagin ng mga editor ng card at ng assignee nito.

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

Pangunahing path: `/messaging/messages`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | I-load ang lahat ng mensahe ng isang usapan |
| GET | `/catchup/:churchId/:conversationId` | Publiko | — | I-load ang lahat ng mensahe ng isang usapan (public catchup para sa live chat) |
| GET | `/:churchId/:id` | Publiko | — | I-load ang isang mensahe ayon sa ID |
| POST | `/` | JWT | — | I-save ang mga mensahe (batch). Nagpapadala ng real-time na update at nag-trigger ng notification. Ang pag-edit ng umiiral na mensahe ay nangangailangan na ikaw ang may-akda nito o may hawak ng `content.edit`; hindi kailanman maaaring ilipat ang nakaimbak na may-akda |
| POST | `/send` | Publiko | — | Magpadala ng mga mensahe (batch, public). Nagpapadala ng real-time na update sa pamamagitan ng WebSocket at nag-trigger ng notification |
| POST | `/setCallout` | JWT | — | (legacy) Mag-broadcast ng callout message nang real time. Walang aktibong client; hindi na nire-render ng live stream chat ang mga callout |
| DELETE | `/:churchId/:id` | JWT | — | Burahin ang mensahe at i-broadcast ang pagbura nang real time. Tingnan ang [Pag-moderate ng mensahe](#message-moderation) |

### Pag-moderate ng mensahe {#message-moderation}

Maaaring burahin ang isang mensahe ng:

- ang may-akda ng mensahe;
- staff na may `content.edit` (saanman sa simbahan);
- **mga lider ng grupo**, para sa mga usapang may `contentType` na `group` o `groupAnnouncement` na ang `contentId` ay grupong pinamumunuan nila (`leaderGroupIds` sa JWT).

Ang mga usapan ng tala ng tao (`person` / `personConfidential`) ay hindi kailanman namo-moderate ng lider — sumusunod ang mga ito sa mga pahintulot sa tala (`people.edit`, `people.viewConfidentialNotes`).

Ang mga lider ay pagbura lamang ang makukuha, hindi pag-edit: ang pagsulat muli ng mensahe ng ibang miyembro ay nananatiling limitado sa may-akda at sa staff na may `content.edit`.

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

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | I-load ang lahat ng pribadong mensahe ng kasalukuyang user (kasama ang huling mensahe sa bawat usapan, at minamarkahan ang lahat bilang nabasa na) |
| GET | `/existing/:personId` | JWT | — | Maghanap ng umiiral nang pribadong usapan kasama ang isang partikular na tao |
| GET | `/:id` | JWT | — | I-load ang pribadong mensahe ayon sa ID (binubura ang notification kung para sa kasalukuyang user) |
| POST | `/` | JWT | — | Magpadala ng pribadong mensahe (batch). Nagti-trigger ng push notification sa tatanggap |

## Mga Notification

Pangunahing path: `/messaging/notifications`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Kunin ang bilang ng hindi pa nababasang notification ng kasalukuyang user |
| GET | `/my` | JWT | — | I-load ang lahat ng notification ng kasalukuyang user (minamarkahan ang lahat bilang nabasa na) |
| GET | `/tmpEmail` | Publiko | — | I-trigger ang pang-araw-araw na email digest ng notification (debug/cron endpoint) |
| GET | `/:churchId/person/:personId` | JWT | — | I-load ang mga notification ng isang partikular na tao |
| GET | `/:churchId/:id` | JWT | — | I-load ang notification ayon sa ID |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga notification (batch) |
| POST | `/create` | JWT | — | Gumawa ng mga notification para sa maraming tao. Body: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Markahan bilang nabasa na ang lahat ng notification ng isang tao |
| POST | `/sendTest` | JWT | — | Magpadala ng test push notification. Body: `{ personId, title }` |
| POST | `/ping` | Publiko | — | Gumawa ng notification mula sa external na trigger. Body: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Burahin ang notification |

### Halimbawa: Gumawa ng Mga Notification

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

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/categories` | JWT | — | Ilista ang mga kategorya ng notification kasama ang kanilang default at pinapayagang channel |
| GET | `/my` | JWT | — | I-load ang mga kagustuhan sa notification ng kasalukuyang user (awtomatikong gumagawa ng default kung wala pa) |
| POST | `/` | JWT | — | I-save ang mga kagustuhan ng kasalukuyang user. Body: alinman sa `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, kasama ang opsyonal na `overrides: [{ categoryKey, channel, optedIn }]` (ang channel ay maaaring `push`, `email`, `in_app`, o `sms`; hindi pinapansin ang mga naka-lock na kategorya). Ang `allowSms` ang opt-in ng miyembro para sa text reminder. Tinatanggap pa rin ang legacy na body na array ng mga row |

## Mga Connection

Pangunahing path: `/messaging/connections`

Pinamamahalaan ang mga WebSocket/real-time connection para sa chat, mga usapan ng grupo, pribadong mensahe, at live streaming. Tingnan ang [Arkitektura ng Real-time](../../realtime) para sa kumpletong protocol mula dulo hanggang dulo.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | Publiko | — | I-load ang lahat ng connection ng isang usapan |
| POST | `/` | Publiko | — | Magrehistro ng mga connection (batch). Nagti-trigger ng attendance broadcast sa usapan. Mga item ng body: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Publiko | — | I-update ang display name ng isang connection ayon sa socket ID. Body: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Publiko | — | Alisin ang connection sa isang usapan. Nagti-trigger ng attendance broadcast |
| POST | `/tmpSendAlert` | Publiko | — | Magpadala ng alerto ng notification sa mga connection ng isang tao. Body: `{ churchId, personId }` |

## Mga Device

Pangunahing path: `/messaging/devices`

Pinamamahalaan ang device registration para sa push notification at content pairing (hal., ang Lessons app sa mga TV display).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | Mag-enroll o mag-update ng device (mobile push registration). Nagtutugma ayon sa FCM token o device ID |
| POST | `/enrollAnon` | Publiko | — | Mag-enroll ng anonymous na device at gumawa ng 4-karakter na pairing code |
| POST | `/` | Publiko | — | I-save ang mga device (batch) |
| GET | `/pair/:pairingCode` | JWT | — | I-pair ang device gamit ang pairing code nito. Opsyonal ang `?contentType=&contentId=` para magtalaga ng content |
| GET | `/status/:deviceId` | Publiko | — | Suriin ang pairing status ng isang device |
| GET | `/:churchId` | JWT | — | I-load ang lahat ng device ng isang simbahan |
| GET | `/:churchId/person/:personId` | JWT | — | I-load ang lahat ng device ng isang tao |
| GET | `/:churchId/:id` | JWT | — | I-load ang device ayon sa ID |
| DELETE | `/:churchId/:id` | JWT | — | Burahin ang device |

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

Pangunahing path: `/messaging/devicecontents`

Pinamamahalaan ang mga assignment ng content para sa mga naka-pair na device (hal., aling lesson ang ipinapakita sa TV).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | I-load ang mga assignment ng content para sa isang device |
| POST | `/` | JWT | — | I-save ang mga assignment ng content ng device (batch) |
| DELETE | `/:id` | JWT | — | Burahin ang assignment ng content ng device |

## Texting

Pangunahing path: `/messaging/texting`

Pinamamahalaan ang mga SMS texting provider, group text messaging, at delivery tracking.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | I-load ang mga texting provider ng simbahan (tinatakpan ang mga credential) |
| GET | `/status` | JWT | — | `{ enabled }` — kung may naka-enable na texting provider ang simbahan. Sinumang naka-sign in na user ng simbahan; ginagamit para ipakita ang mga opsyong **Text** kapag maaaring magpadala ng text |
| GET | `/inboundUrl` | JWT | `texting.send` o `settings.edit` | `{ url }` — ang inbound (STOP) webhook URL ng simbahan na ipe-paste sa provider |
| POST | `/inbound/:churchId/:token` | Publiko | — | Webhook ng inbound message ng provider. Ang `token` ay HMAC ng church ID. Ang reply na eksaktong stop word (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`) ay nagmamarka sa bawat katugmang tao bilang `optedOut` at nag-o-off ng kanilang `allowSms`. Nagbabalik ng `{ optedOut: <count> }`; ang ibang reply ay nagbabalik ng `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | I-preview ang mga tatanggap ng group text (bilang ng karapat-dapat, naka-opt out, at walang telepono) |
| GET | `/sent` | JWT | — | I-load ang lahat ng naipadalang text message record ng simbahan |
| GET | `/sent/:id/details` | JWT | — | I-load ang naipadalang text kasama ang delivery log ng bawat tatanggap |
| POST | `/providers` | JWT | — | I-save ang mga texting provider (batch). Nag-e-encrypt ng API credential |
| POST | `/send` | JWT | — | Magpadala ng SMS sa lahat ng karapat-dapat na miyembro ng grupo. Body: `{ groupId, message }`. Ang mga merge field (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) ay nire-resolve para sa bawat tatanggap |
| POST | `/sendPerson` | JWT | — | Magpadala ng SMS sa isang tao. Body: `{ personId, phoneNumber, message }`. Nire-resolve ang mga merge field, at ang nire-resolve na teksto ang naitatala |
| DELETE | `/providers/:id` | JWT | — | Burahin ang texting provider |

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

Pinamamahalaan ang mga reusable na email template at pagpapadala ng templated na email sa mga grupo.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | I-load ang lahat ng email template ng simbahan |
| GET | `/:id` | JWT | — | I-load ang isang email template ayon sa ID |
| GET | `/sendStatus` | JWT | `groupMembers.edit` o `tasks.admin` | Ang status ng group email ng simbahan: `{ approved, paused, remaining, requested }`. Ginagamit ng dialog na Send Email ng B1Admin at ng aksyong **Send email** ng workflow para magbabala kapag hindi ipapadala ang email |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | Hilingin sa support na aprubahan ang simbahan para sa group email (isang beses lamang bawat simbahan kada linggo) |
| GET | `/preview/:groupId` | JWT | — | I-preview ang paghahatid ng email sa isang grupo (bilang ng karapat-dapat na tatanggap, mga miyembrong walang email) |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga email template (batch) |
| POST | `/send` | JWT | — | Magpadala ng templated na email sa lahat ng miyembro ng grupo. Body: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Burahin ang email template |

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

**Mga suportadong merge field:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## Mga Blocked IP

Pangunahing path: `/messaging/blockedips`

(legacy) Pag-block ng IP para sa live streaming chat. Hindi na tinatawag ng B1App client ang `POST /` — inalis ang IP blocking sa unified-delivery migration. Tinatawag pa rin ang `/clear` route nang server-to-server ng `StreamingServiceController` kapag na-save ang mga streaming service.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | (legacy) I-save ang mga blocked IP (batch). Walang aktibong client |
| POST | `/clear` | JWT | — | Alisin ang lahat ng blocked IP para sa mga partikular na service. Body: `[{ serviceId, churchId }]` |

## Mga Delivery Log

Pangunahing path: `/messaging/deliverylogs`

Sinusubaybayan ang delivery status ng mga naipadalang mensahe (SMS, push notification, email).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | I-load ang delivery log ayon sa uri ng content at ID |
| GET | `/person/:personId` | JWT | — | I-load ang delivery log ng isang tao. Opsyonal na `?startDate=&endDate=` na filter |
| GET | `/recent` | JWT | — | I-load ang mga kamakailang delivery log ng simbahan. Opsyonal ang `?limit=` (default 100) |
| GET | `/:id` | JWT | — | I-load ang delivery log ayon sa ID |

## Mga Kaugnay na Pahina

- [Arkitektura ng Real-time](../../realtime) -- WebSocket protocol, room subscription, at unified delivery framework
- [Web Push Notifications](../../web-push) -- Browser push enrollment at paghahatid
- [Mga Endpoint ng Membership](./membership) -- Mga tao, grupo, tungkulin, at core identity
- [Mga Endpoint ng Attendance](./attendance) -- Pagsubaybay sa serbisyo at pagbisita
- [Pagpapatunay at Mga Pahintulot](./authentication) -- Daloy ng login, JWT, OAuth, modelo ng pahintulot
- [Istruktura ng Modyul](../module-structure) -- Mga pattern ng organisasyon ng code
