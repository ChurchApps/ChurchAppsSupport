---
title: "Messaging Endpoints"
---

# Messaging Endpoints

<div class="article-intro">

Messaging module real-time conversations, chat messages, push notifications, SMS/email delivery, WebSocket connections, private messaging, device registration, और texting providers को manage करता है। यह सभी ChurchApps applications में दोनों live streaming chat और asynchronous notifications के लिए उपयोग किया जाने वाला communication layer provide करता है।

</div>

**Base path:** `/messaging`

## Conversations

Base path: `/messaging/conversations`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Load conversations by comma-separated IDs with first/last messages |
| GET | `/messages/:contentType/:contentId` | JWT | — | Load conversations for content with paginated messages (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Get post-type conversations for the current user's groups |
| GET | `/posts/group/:groupId` | JWT | — | Get post-type conversations for a specific group |
| GET | `/current/:churchId/:contentType/:contentId` | Public | — | Get or create the current conversation for content (auto-decrypts contentId) |
| GET | `/:churchId/:contentType/:contentId` | Public | — | Load conversations by content type and ID |
| GET | `/:churchId/:id` | Public | — | Load a single conversation by ID |
| POST | `/` | JWT | — | Create or update conversations (batch) |
| POST | `/start` | JWT | — | Start a new conversation with an initial comment message |
| DELETE | `/:churchId/:id` | JWT | — | Delete a conversation |

### Person notes access control

`contentType: "person"` वाली conversations (एक person record पर Notes tab) या `contentType: "personConfidential"` (Confidential Notes section) हर read और write path पर गated होती हैं, जिसमें above के अन्यथा-public routes शामिल हैं, जो इन content types के लिए `401` return करते हैं। `person` को MembershipApi **People / Edit** permission की आवश्यकता है; `personConfidential` को **People / View Confidential Notes** की आवश्यकता है। Scoped API keys के लिए, `people:write` दोनों actions को carry करता है (key का user अभी भी underlying role permission को hold करना चाहिए)।

### उदाहरण: एक Conversation शुरू करना

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

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Load all messages for a conversation |
| GET | `/catchup/:churchId/:conversationId` | Public | — | Load all messages for a conversation (public catchup for live chat) |
| GET | `/:churchId/:id` | Public | — | Load a single message by ID |
| POST | `/` | JWT | — | Save messages (batch). Sends real-time updates and triggers notifications |
| POST | `/send` | Public | — | Send messages (batch, public). Sends real-time updates via WebSocket and triggers notifications |
| POST | `/setCallout` | JWT | — | (legacy) Broadcast a callout message in real time. No active client; live stream chat no longer renders callouts |
| DELETE | `/:churchId/:id` | JWT | — | Delete a message and broadcast the deletion in real time |

### उदाहरण: एक Message भेजना

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

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Load all private messages for the current user (includes last message per conversation, marks all as read) |
| GET | `/existing/:personId` | JWT | — | Find an existing private conversation with a specific person |
| GET | `/:id` | JWT | — | Load a private message by ID (clears notification if addressed to current user) |
| POST | `/` | JWT | — | Send private messages (batch). Triggers push notification to recipient |

## Notifications

Base path: `/messaging/notifications`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Get unread notification count for the current user |
| GET | `/my` | JWT | — | Load all notifications for the current user (marks all as read) |
| GET | `/tmpEmail` | Public | — | Trigger daily email notification digest (debug/cron endpoint) |
| GET | `/:churchId/person/:personId` | JWT | — | Load notifications for a specific person |
| GET | `/:churchId/:id` | JWT | — | Load a notification by ID |
| POST | `/` | JWT | — | Create or update notifications (batch) |
| POST | `/create` | JWT | — | Create notifications for multiple people. Body: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Mark all notifications as read for a person |
| POST | `/sendTest` | JWT | — | Send a test push notification. Body: `{ personId, title }` |
| POST | `/ping` | Public | — | Create a notification from an external trigger. Body: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Delete a notification |

### उदाहरण: Notifications बनाना

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

Standard CRUD extend करता है। Base class POST `/` provide करता है (create या update, कोई permission की आवश्यकता नहीं)।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Create or update notification preferences (from CRUD base class) |
| GET | `/my` | JWT | — | Load notification preferences for the current user (auto-creates defaults if none exist) |

## Connections

Base path: `/messaging/connections`

Chat, group conversations, private messages, और live streaming के लिए WebSocket/real-time connections को manage करता है। [Real-time Architecture](../../realtime) देखें end-to-end protocol के लिए।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | Public | — | Load all connections for a conversation |
| POST | `/` | Public | — | Register connections (batch). Triggers an attendance broadcast on the conversation. Body items: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Public | — | Update the display name for a connection by socket ID. Body: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Public | — | Drop a connection from a conversation. Triggers an attendance broadcast |
| POST | `/tmpSendAlert` | Public | — | Send a notification alert to a person's connections. Body: `{ churchId, personId }` |

## Devices

Base path: `/messaging/devices`

Push notifications और content pairing के लिए device registration को manage करता है (उदाहरण के लिए, TV displays पर Lessons app)।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | Enroll या update एक device (mobile push registration)। FCM token या device ID द्वारा match करता है |
| POST | `/enrollAnon` | Public | — | Enroll एक anonymous device और एक 4-character pairing code generate करें |
| POST | `/` | Public | — | Save devices (batch) |
| GET | `/pair/:pairingCode` | JWT | — | Pair एक device अपने pairing code का उपयोग करके। Optional `?contentType=&contentId=` content assign करने के लिए |
| GET | `/status/:deviceId` | Public | — | Check pairing status of एक device |
| GET | `/:churchId` | JWT | — | Load सभी devices एक church के लिए |
| GET | `/:churchId/person/:personId` | JWT | — | Load सभी devices एक person के लिए |
| GET | `/:churchId/:id` | JWT | — | Load एक device by ID |
| DELETE | `/:churchId/:id` | JWT | — | Delete एक device |

### उदाहरण: एक Device को Enroll करना

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

Paired devices के लिए content assignments को manage करता है (उदाहरण के लिए, कौन सा lesson एक TV पर display किया जाता है)।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Load content assignments एक device के लिए |
| POST | `/` | JWT | — | Save device content assignments (batch) |
| DELETE | `/:id` | JWT | — | Delete एक device content assignment |

## Texting

Base path: `/messaging/texting`

SMS texting providers, group text messaging, और delivery tracking को manage करता है।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | Load texting providers church के लिए (credentials को mask किए जाते हैं) |
| GET | `/preview/:groupId` | JWT | — | Preview recipients एक group text के लिए (eligible, opted-out, no-phone counts) |
| GET | `/sent` | JWT | — | Load सभी sent text message records church के लिए |
| GET | `/sent/:id/details` | JWT | — | Load एक sent text per-recipient delivery logs के साथ |
| POST | `/providers` | JWT | — | Save texting providers (batch)। API credentials को encrypt करता है |
| POST | `/send` | JWT | — | Send एक SMS को group के सभी eligible members को। Body: `{ groupId, message }` |
| POST | `/sendPerson` | JWT | — | Send एक SMS को single person को। Body: `{ personId, phoneNumber, message }` |
| DELETE | `/providers/:id` | JWT | — | Delete एक texting provider |

### उदाहरण: Group Text भेजना

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

Reusable email templates और groups को templated emails भेजने को manage करता है।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Load सभी email templates church के लिए |
| GET | `/:id` | JWT | — | Load एक single email template by ID |
| GET | `/preview/:groupId` | JWT | — | Preview email delivery एक group के लिए (eligible recipient count, members with no email) |
| POST | `/` | JWT | — | Create या update email templates (batch) |
| POST | `/send` | JWT | — | Send एक templated email को group के सभी members को। Body: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Delete एक email template |

### उदाहरण: Group को Email भेजना

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

**Supported merge fields:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## Blocked IPs

Base path: `/messaging/blockedips`

(legacy) Live streaming chat के लिए IP-blocking। B1App client अब `POST /` को call नहीं करता है — IP blocking को unified-delivery migration में remove किया गया। `/clear` route को अभी भी server-to-server द्वारा invoked किया जाता है `StreamingServiceController` द्वारा जब streaming services save किए जाते हैं।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | (legacy) Save blocked IPs (batch)। कोई active client नहीं है |
| POST | `/clear` | JWT | — | Clear सभी blocked IPs specific services के लिए। Body: `[{ serviceId, churchId }]` |

## Delivery Logs

Base path: `/messaging/deliverylogs`

Sent messages (SMS, push notifications, email) के लिए delivery status को tracks करता है।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Load delivery logs by content type और ID |
| GET | `/person/:personId` | JWT | — | Load delivery logs एक person के लिए। Optional `?startDate=&endDate=` filters |
| GET | `/recent` | JWT | — | Load recent delivery logs church के लिए। Optional `?limit=` (default 100) |
| GET | `/:id` | JWT | — | Load एक delivery log by ID |

## संबंधित पृष्ठ

- [Real-time Architecture](../../realtime) -- WebSocket protocol, room subscriptions, और unified delivery framework
- [Web Push Notifications](../../web-push) -- Browser push enrollment और delivery
- [Membership Endpoints](./membership) -- People, groups, roles, और core identity
- [Attendance Endpoints](./attendance) -- Service और visit tracking
- [Authentication & Permissions](./authentication) -- Login flow, JWT, OAuth, permission model
- [Module Structure](../module-structure) -- Code organization patterns
