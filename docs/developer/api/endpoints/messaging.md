---
title: "Messaging Endpoints"
---

# Messaging Endpoints

<div class="article-intro">

The Messaging module manages real-time conversations, chat messages, push notifications, SMS/email delivery, WebSocket connections, private messaging, device registration, and texting providers. It provides the communication layer used across all ChurchApps applications for both live streaming chat and asynchronous notifications.

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

### Example: Start a Conversation

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
| POST | `/setCallout` | JWT | — | Broadcast a callout message to a conversation in real time |
| DELETE | `/:churchId/:id` | JWT | — | Delete a message and broadcast the deletion in real time |

### Example: Send a Message

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

### Example: Create Notifications

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

Extends standard CRUD. The base class provides POST `/` (create or update, no permission required).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Create or update notification preferences (from CRUD base class) |
| GET | `/my` | JWT | — | Load notification preferences for the current user (auto-creates defaults if none exist) |

## Connections

Base path: `/messaging/connections`

Manages WebSocket/real-time connections for live streaming chat.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | Public | — | Load all connections for a conversation |
| POST | `/` | Public | — | Register connections (batch). Auto-numbers anonymous users and sends attendance/blocked IP updates |
| POST | `/setName` | Public | — | Update the display name for a connection by socket ID. Body: `{ socketId, name }` |
| POST | `/tmpSendAlert` | Public | — | Send a notification alert to a person's connections. Body: `{ churchId, personId }` |

## Devices

Base path: `/messaging/devices`

Manages device registration for push notifications and content pairing (e.g., Lessons app on TV displays).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | Enroll or update a device (mobile push registration). Matches by FCM token or device ID |
| POST | `/enrollAnon` | Public | — | Enroll an anonymous device and generate a 4-character pairing code |
| POST | `/` | Public | — | Save devices (batch) |
| GET | `/pair/:pairingCode` | JWT | — | Pair a device using its pairing code. Optional `?contentType=&contentId=` to assign content |
| GET | `/status/:deviceId` | Public | — | Check pairing status of a device |
| GET | `/:churchId` | JWT | — | Load all devices for a church |
| GET | `/:churchId/person/:personId` | JWT | — | Load all devices for a person |
| GET | `/:churchId/:id` | JWT | — | Load a device by ID |
| DELETE | `/:churchId/:id` | JWT | — | Delete a device |

### Example: Enroll a Device

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

Manages content assignments for paired devices (e.g., which lesson is displayed on a TV).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Load content assignments for a device |
| POST | `/` | JWT | — | Save device content assignments (batch) |
| DELETE | `/:id` | JWT | — | Delete a device content assignment |

## Texting

Base path: `/messaging/texting`

Manages SMS texting providers, group text messaging, and delivery tracking.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | Load texting providers for the church (credentials are masked) |
| GET | `/preview/:groupId` | JWT | — | Preview recipients for a group text (eligible, opted-out, no-phone counts) |
| GET | `/sent` | JWT | — | Load all sent text message records for the church |
| GET | `/sent/:id/details` | JWT | — | Load a sent text with per-recipient delivery logs |
| POST | `/providers` | JWT | — | Save texting providers (batch). Encrypts API credentials |
| POST | `/send` | JWT | — | Send an SMS to all eligible members of a group. Body: `{ groupId, message }` |
| POST | `/sendPerson` | JWT | — | Send an SMS to a single person. Body: `{ personId, phoneNumber, message }` |
| DELETE | `/providers/:id` | JWT | — | Delete a texting provider |

### Example: Send Group Text

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

## Blocked IPs

Base path: `/messaging/blockedips`

Manages IP blocking for live streaming chat conversations.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Save blocked IPs (batch). Broadcasts updated block list to the conversation |
| POST | `/clear` | JWT | — | Clear all blocked IPs for specific services. Body: `[{ serviceId, churchId }]` |

## Delivery Logs

Base path: `/messaging/deliverylogs`

Tracks delivery status for sent messages (SMS, push notifications, email).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Load delivery logs by content type and ID |
| GET | `/person/:personId` | JWT | — | Load delivery logs for a person. Optional `?startDate=&endDate=` filters |
| GET | `/recent` | JWT | — | Load recent delivery logs for the church. Optional `?limit=` (default 100) |
| GET | `/:id` | JWT | — | Load a delivery log by ID |

## Related Pages

- [Membership Endpoints](./membership) -- People, groups, roles, and core identity
- [Attendance Endpoints](./attendance) -- Service and visit tracking
- [Authentication & Permissions](./authentication) -- Login flow, JWT, OAuth, permission model
- [Module Structure](../module-structure) -- Code organization patterns
