---
title: "Mga Endpoint ng Messaging"
description: "Sanggunian para sa mga endpoint ng ChurchApps messaging API: mga usapan, patakaran sa pag-access ng notes, texting, mga email template, notification, at device."
---

# Mga Endpoint ng Messaging

<div class="article-intro">

Pinamamahalaan ng Messaging module ang mga real-time na usapan, chat message, push notification, paghahatid ng SMS/email, koneksyon ng WebSocket, pribadong mensahe, pagpaparehistro ng device, at mga texting provider. Ito ang communication layer na ginagamit sa lahat ng ChurchApps application, para sa live stream chat at sa mga asynchronous na notification.

</div>

**Base path:** `/messaging`

## Mga Usapan {#conversations}

Base path: `/messaging/conversations`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | I-load ang mga usapan ayon sa mga ID na pinaghihiwalay ng kuwit, kasama ang unang/huling mensahe |
| GET | `/messages/:contentType/:contentId` | JWT | — | I-load ang mga usapan para sa content na may paginated na mensahe (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Kunin ang mga usapang uri ng post para sa mga grupo ng kasalukuyang user |
| GET | `/posts/group/:groupId` | JWT | — | Kunin ang mga usapang uri ng post para sa isang partikular na grupo |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | Pinakabagong notes sa bawat record para sa pahina ng Notes ng B1 Admin. Ang `section` ay `people`, `groups`, `events`, o `workflows` (400 kung iba); ang `limit` ay default na 25 (max 100); ang `before` ay cursor mula sa nakaraang pahina. Dumadaan pa rin ang bawat note sa sarili nitong patakaran ng uri (People Edit / pahintulot sa confidential notes, mga lider ng grupo, mga viewer ng event, mga viewer ng workflow card), kaya tanging mga note na mabubuksan nila ang nakikita ng tumatawag. Pinuputol sa 300 karakter ang teksto ng note |
| GET | `/current/:churchId/:contentType/:contentId` | Public | — | Kunin o gumawa ng kasalukuyang usapan para sa content (awtomatikong dine-decrypt ang contentId) |
| GET | `/:churchId/:contentType/:contentId` | Public | — | I-load ang mga usapan ayon sa uri at ID ng content |
| GET | `/:churchId/:id` | Public | — | I-load ang isang usapan ayon sa ID |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga usapan (batch) |
| POST | `/start` | JWT | — | Magsimula ng bagong usapan na may paunang comment na mensahe |
| DELETE | `/:churchId/:id` | JWT | — | Burahin ang isang usapan |

### Kontrol sa pag-access ng notes ng tao {#person-notes-access-control}

Ang mga usapang may `contentType: "person"` (ang tab na Notes sa record ng tao) o `contentType: "personConfidential"` (ang seksyong Confidential Notes) ay nakabantay sa bawat read at write path, kasama ang mga pampublikong route sa itaas, na nagbabalik ng `401` para sa mga uring ito ng content. Ang `person` ay nangangailangan ng pahintulot ng MembershipApi na **People / Edit**; ang `personConfidential` ay nangangailangan ng **People / View Confidential Notes**. Para sa mga scoped API key, sakop ng `people:write` ang parehong aksyon (dapat taglay pa rin ng user ng key ang pinagbabatayang pahintulot ng role).

### Kontrol sa pag-access ng notes ng grupo at event {#group-and-event-notes-access-control}

May dalawa pang uri ng note na binabantayan sa parehong paraan, sa bawat read at write path (kasama ang mga pampublikong route sa itaas), at hindi kailanman bukas sa anonymous na pag-post:

- **`groupNote`** (`contentId` = group ID) -- ang feed na **Leader notes** ng isang grupo. Tanging ang mga lider ng grupong iyon (`leaderGroupIds` sa JWT) ang makakabasa o makakapag-post. Walang pahintulot ng staff ang nagbibigay ng access, kasama ang `content.edit` at ang mga pahintulot ng membership ng grupo.
- **`eventNote`** (`contentId` = event ID) -- ang mga note sa isang calendar event. Palaging makakabasa at makakapag-post ang staff na may `content.edit` o **Calendars / Admin**. Kung hindi, sumusunod ang access sa `notesViewRole` (basa) at `notesPostRole` (post) ng event: ang `staff` (default, ginagamit kapag `null` ang field) ay walang pinapayagang iba, ang `leaders` ay pinapayagan ang mga lider ng grupo ng event, at ang `members` ay pinapayagan ang mga miyembro at lider ng grupo ng event. Ang event na walang `groupId` ay para sa staff lamang.

### Kontrol sa pag-access ng notes ng workflow card {#workflow-card-notes-access-control}

Ang mga usapang may `contentType: "workflowCard"` (ang mga note sa isang workflow card, kung saan ang `contentId` ay ang task ID ng card) ay mababasa at masusulatan lamang ng sinumang makakabukas ng card na iyon: isang user na may pahintulot na DoingApi **Tasks / View**, o ang taong o grupong naka-assign sa card, gumawa nito, o tungkol dito. Ang iba ay makakatanggap ng `401` sa bawat read path, kasama ang mga pampublikong route sa itaas. Naka-attach ang usapan ng card sa pamamagitan ng card mismo gamit ang `POST /doing/tasks/:id/conversation` (body `{ "conversationId": "..." }`; ang unang naka-attach na usapan ang nananaig), na maaaring tawagin ng mga editor ng card at ng assignee nito.

### Halimbawa: Pagsisimula ng Usapan {#example-start-a-conversation}

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

## Mga Mensahe {#messages}

Base path: `/messaging/messages`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | I-load ang lahat ng mensahe ng isang usapan |
| GET | `/catchup/:churchId/:conversationId` | Public | — | I-load ang lahat ng mensahe ng isang usapan (pampublikong catchup para sa live chat) |
| GET | `/:churchId/:id` | Public | — | I-load ang isang mensahe ayon sa ID |
| POST | `/` | JWT | — | I-save ang mga mensahe (batch). Nagpapadala ng real-time na update at nagti-trigger ng mga notification. Ang pag-update ng umiiral na mensahe ay nangangailangan na ikaw ang may-akda nito o may hawak ng `content.edit`; hindi kailanman maililipat sa iba ang nakatalang may-akda |
| POST | `/send` | Public | — | Magpadala ng mga mensahe (batch, pampubliko). Nagpapadala ng real-time na update sa pamamagitan ng WebSocket at nagti-trigger ng mga notification |
| POST | `/setCallout` | JWT | — | (legacy) Mag-broadcast ng callout message nang real time. Walang aktibong client; hindi na nire-render ng live stream chat ang mga callout |
| DELETE | `/:churchId/:id` | JWT | — | Burahin ang isang mensahe at i-broadcast ang pagbura nang real time. Tingnan ang [Moderation ng mensahe](#message-moderation) |

### Moderation ng mensahe {#message-moderation}

Pinapayagan ang pagbura ng mensahe para sa:

- ang may-akda ng mensahe;
- staff na may `content.edit` (saanman sa simbahan);
- **mga lider ng grupo**, para sa mga usapang may `contentType` na `group` o `groupAnnouncement` na ang `contentId` ay grupong pinamumunuan nila (`leaderGroupIds` sa JWT).

Hindi kailanman minomoderate ng lider ang mga usapan ng note ng tao (`person` / `personConfidential`) -- gumagamit ang mga ito ng mga pahintulot sa notes (`people.edit`, `people.viewConfidentialNotes`) sa halip.

Pagbura lamang ang ibinibigay sa mga lider, hindi pag-edit: ang pagsusulat muli ng mensahe ng ibang miyembro ay nananatiling limitado sa may-akda at sa staff na may `content.edit`.

### Halimbawa: Pagpapadala ng Mensahe {#example-send-a-message}

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

## Mga Pribadong Mensahe {#private-messages}

Base path: `/messaging/privatemessages`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | I-load ang lahat ng pribadong mensahe ng kasalukuyang user (kasama ang huling mensahe bawat usapan, at minamarkahang nabasa ang lahat) |
| GET | `/existing/:personId` | JWT | — | Hanapin ang umiiral na pribadong usapan sa isang partikular na tao |
| GET | `/:id` | JWT | — | I-load ang pribadong mensahe ayon sa ID (binubura ang notification kung para sa kasalukuyang user) |
| POST | `/` | JWT | — | Magpadala ng mga pribadong mensahe (batch). Nagti-trigger ng push notification sa tatanggap |

## Mga Notification {#notifications}

Base path: `/messaging/notifications`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Kunin ang bilang ng hindi pa nababasang notification ng kasalukuyang user |
| GET | `/my` | JWT | — | I-load ang lahat ng notification ng kasalukuyang user (minamarkahang nabasa ang lahat) |
| GET | `/tmpEmail` | Public | — | I-trigger ang araw-araw na email digest ng notification (debug/cron endpoint) |
| GET | `/:churchId/person/:personId` | JWT | — | I-load ang mga notification ng isang partikular na tao |
| GET | `/:churchId/:id` | JWT | — | I-load ang notification ayon sa ID |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga notification (batch) |
| POST | `/create` | JWT | — | Gumawa ng mga notification para sa maraming tao. Body: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Markahang nabasa ang lahat ng notification ng isang tao |
| POST | `/sendTest` | JWT | — | Magpadala ng test push notification. Body: `{ personId, title }` |
| POST | `/ping` | Public | — | Gumawa ng notification mula sa external na trigger. Body: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Burahin ang isang notification |
| GET | `/groupPreview/:groupId` | JWT | `groupMembers.edit` | Bilangin kung ilan sa mga miyembro ng grupo ang maaabot ng isang push |
| GET | `/churchPreview` | JWT | `content.edit` | Bilangin kung ilang tao ang maaabot ng push sa lahat ng may app |
| POST | `/group/send` | JWT | `groupMembers.edit` | Magpadala ng push sa mga miyembro ng grupo ngayon din |

### Halimbawa: Paggawa ng Mga Notification {#example-create-notifications}

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

## Mga Naka-iskedyul na Notification {#scheduled-notifications}

Base path: `/messaging/scheduledNotifications`

Mga push na naka-iskedyul nang maaga. Ang `audience` ay `church` (lahat ng may app; nangangailangan ng `content.edit`) o `group` (nangangailangan ng `groupMembers.edit` at `groupId`). Hanggang 80 karakter ang title at 240 ang message. Ipinapadala ng 1-minutong timer ang row na dumating na ang oras.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | `groupMembers.edit` o `content.edit` | Ilista ang mga naka-iskedyul at kamakailang notification ng simbahan |
| POST | `/` | JWT | ayon sa audience | Gumawa ng naka-iskedyul na notification, o mag-update kapag may `id`. Body: `{ id?, audience, groupId?, title, message, link?, imageUrl?, sendAt }`. Ang pag-update ng hindi na pending ay nagbabalik ng 409 |
| POST | `/:id/sendNow` | JWT | ayon sa audience | Ipadala agad ang pending na notification. Nagbabalik ng 409 kung naipadala na, nakansela, o kasalukuyang ipinapadala |
| DELETE | `/:id` | JWT | ayon sa audience | Kanselahin ang pending na notification, o alisin sa listahan ang naipadala, pumalya, o nakanselang notification. Nagbabalik ng 409 habang ipinapadala ito |
| DELETE | `/` | JWT | `groupMembers.edit` o `content.edit` | Alisin ang lahat ng naipadala, pumalya, at nakanselang notification para sa mga audience na maaaring padalhan ng user. Nagbabalik ng `{ deleted }` |

## Mga Kagustuhan sa Notification {#notification-preferences}

Base path: `/messaging/notificationpreferences`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/categories` | JWT | — | Ilista ang mga kategorya ng notification kasama ang default at pinapayagang channel nito |
| GET | `/my` | JWT | — | I-load ang mga kagustuhan sa notification ng kasalukuyang user (awtomatikong gumagawa ng default kung wala pa) |
| POST | `/` | JWT | — | I-save ang mga kagustuhan ng kasalukuyang user. Body: anuman sa `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, kasama ang opsyonal na `overrides: [{ categoryKey, channel, optedIn }]` (ang channel ay maaaring `push`, `email`, `in_app`, o `sms`; hindi pinapansin ang mga naka-lock na kategorya). Ang `allowSms` ay opt-in ng miyembro para sa mga paalala sa text. Tinatanggap pa rin ang legacy na body na array ng mga row |

## Mga Koneksyon {#connections}

Base path: `/messaging/connections`

Pinamamahalaan ang mga koneksyon ng WebSocket/real-time para sa chat, mga usapan ng grupo, pribadong mensahe, at live streaming. Tingnan ang [Real-time Architecture](../../realtime.md) para sa buong protocol.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | Public | — | I-load ang lahat ng koneksyon ng isang usapan |
| POST | `/` | Public | — | Magrehistro ng mga koneksyon (batch). Nagti-trigger ng attendance broadcast sa usapan. Mga item ng body: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Public | — | I-update ang display name ng koneksyon ayon sa socket ID. Body: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Public | — | Alisin ang koneksyon sa isang usapan. Nagti-trigger ng attendance broadcast |
| POST | `/tmpSendAlert` | Public | — | Magpadala ng notification alert sa mga koneksyon ng isang tao. Body: `{ churchId, personId }` |

## Mga Device {#devices}

Base path: `/messaging/devices`

Pinamamahalaan ang pagpaparehistro ng device para sa push notification at content pairing (hal., ang Lessons app sa mga TV display).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | Mag-enroll o mag-update ng device (mobile push registration). Tumutugma ayon sa FCM token o device ID |
| POST | `/enrollAnon` | Public | — | Mag-enroll ng anonymous na device at gumawa ng 4-karakter na pairing code |
| POST | `/` | Public | — | I-save ang mga device (batch) |
| GET | `/pair/:pairingCode` | JWT | — | I-pair ang device gamit ang pairing code nito. Opsyonal na `?contentType=&contentId=` para mag-assign ng content |
| GET | `/status/:deviceId` | Public | — | Suriin ang pairing status ng device |
| GET | `/:churchId` | JWT | — | I-load ang lahat ng device ng simbahan |
| GET | `/:churchId/person/:personId` | JWT | — | I-load ang lahat ng device ng isang tao |
| GET | `/:churchId/:id` | JWT | — | I-load ang device ayon sa ID |
| DELETE | `/:churchId/:id` | JWT | — | Burahin ang device |

### Halimbawa: Pag-enroll ng Device {#example-enroll-a-device}

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

## Nilalaman ng Device {#device-contents}

Base path: `/messaging/devicecontents`

Pinamamahalaan ang mga assignment ng content para sa mga naka-pair na device (hal., aling aralin ang ipinapakita sa TV).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | I-load ang mga assignment ng content para sa isang device |
| POST | `/` | JWT | — | I-save ang mga assignment ng content ng device (batch) |
| DELETE | `/:id` | JWT | — | Burahin ang isang assignment ng content ng device |

## Texting {#texting}

Base path: `/messaging/texting`

Pinamamahalaan ang mga SMS texting provider, group text messaging, at pagsubaybay sa paghahatid.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | I-load ang mga texting provider ng simbahan (minamaskara ang mga credential) |
| GET | `/status` | JWT | — | `{ enabled }` -- kung may naka-enable na texting provider ang simbahan. Sinumang naka-sign in na user ng simbahan; ginagamit para ipakita ang mga opsyong **Text** lamang kapag maaari nang magpadala ng text |
| GET | `/inboundUrl` | JWT | `texting.send` o `settings.edit` | `{ url }` -- ang inbound (STOP) webhook URL ng simbahan na ipe-paste sa provider |
| POST | `/inbound/:churchId/:token` | Public | — | Inbound-message webhook ng provider. Ang `token` ay HMAC ng church id. Ang reply na eksaktong stop word (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`) ay minamarkahang `optedOut` ang bawat tugmang tao at pinapatay ang kanilang `allowSms`. Nagbabalik ng `{ optedOut: <count> }`; ibang reply ay nagbabalik ng `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | I-preview ang mga tatanggap ng group text (bilang ng eligible, opted-out, at walang phone) |
| GET | `/sent` | JWT | — | I-load ang lahat ng naipadalang text message record ng simbahan |
| GET | `/sent/:id/details` | JWT | — | I-load ang naipadalang text kasama ang delivery log bawat tatanggap |
| POST | `/providers` | JWT | — | I-save ang mga texting provider (batch). Nag-e-encrypt ng API credential |
| POST | `/send` | JWT | — | Magpadala ng SMS sa lahat ng eligible na miyembro ng grupo. Body: `{ groupId, message }`. Ang mga merge field (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) ay nireresolba bawat tatanggap |
| POST | `/sendPerson` | JWT | — | Magpadala ng SMS sa iisang tao. Body: `{ personId, phoneNumber, message }`. Nireresolba ang mga merge field, at ang nireresolbang teksto ang naitatala |
| DELETE | `/providers/:id` | JWT | — | Burahin ang isang texting provider |

### Halimbawa: Pagpapadala ng Group Text {#example-send-group-text}

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

## Mga Email Template {#email-templates}

Base path: `/messaging/emailTemplates`

Pinamamahalaan ang mga magagamit-muling email template at pagpapadala ng templated na email sa mga grupo.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | I-load ang lahat ng email template ng simbahan |
| GET | `/:id` | JWT | — | I-load ang isang email template ayon sa ID |
| GET | `/sendStatus` | JWT | `groupMembers.edit` o `tasks.admin` | Ang status ng group email ng simbahan: `{ approved, paused, remaining, requested }`. Ginagamit ng dialog na Send Email ng B1Admin at ng aksyong workflow na **Send email** para magbabala kapag hindi makakalabas ang email |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | Humiling sa support na aprubahan ang simbahan para sa group email (hanggang isang beses lamang bawat simbahan kada linggo) |
| GET | `/preview/:groupId` | JWT | — | I-preview ang paghahatid ng email sa isang grupo (bilang ng eligible na tatanggap, mga miyembrong walang email) |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga email template (batch) |
| POST | `/send` | JWT | — | Magpadala ng templated na email sa lahat ng miyembro ng grupo. Body: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Burahin ang isang email template |

### Halimbawa: Pagpapadala ng Email sa Grupo {#example-send-email-to-group}

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

## Mga Naka-block na IP {#blocked-ips}

Base path: `/messaging/blockedips`

(legacy) Pag-block ng IP para sa live streaming chat. Hindi na tinatawag ng B1App client ang `POST /` -- inalis ang IP blocking sa unified-delivery migration. Tinatawag pa rin ang route na `/clear` nang server-to-server ng `StreamingServiceController` kapag na-save ang mga streaming service.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | (legacy) I-save ang mga naka-block na IP (batch). Walang aktibong client |
| POST | `/clear` | JWT | — | Burahin ang lahat ng naka-block na IP para sa mga partikular na service. Body: `[{ serviceId, churchId }]` |

## Mga Delivery Log {#delivery-logs}

Base path: `/messaging/deliverylogs`

Sinusubaybayan ang status ng paghahatid ng mga naipadalang mensahe (SMS, push notification, email).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | I-load ang mga delivery log ayon sa uri at ID ng content |
| GET | `/person/:personId` | JWT | — | I-load ang mga delivery log ng isang tao. Opsyonal na `?startDate=&endDate=` na filter |
| GET | `/recent` | JWT | — | I-load ang kamakailang delivery log ng simbahan. Opsyonal na `?limit=` (default 100) |
| GET | `/:id` | JWT | — | I-load ang delivery log ayon sa ID |

## Mga Kaugnay na Pahina {#related-pages}

- [Real-time Architecture](../../realtime.md) -- Protocol ng WebSocket, room subscription, at unified delivery framework
- [Web Push Notifications](../../web-push.md) -- Pag-enroll at paghahatid ng browser push
- [Membership Endpoints](./membership.md) -- Mga tao, grupo, role, at core identity
- [Attendance Endpoints](./attendance.md) -- Pagsubaybay sa serbisyo at pagbisita
- [Authentication & Permissions](./authentication.md) -- Login flow, JWT, OAuth, modelo ng permission
- [Module Structure](../module-structure.md) -- Mga pattern sa organisasyon ng code
