---
title: "Messaging Endpoints"
description: "Reference for ChurchApps messaging API endpoints: conversations, notes access rules, notifications, reminders, web push, texting, email templates, and devices."
---

# Messaging Endpoints

<div class="article-intro">

The Messaging module manages real-time conversations, chat messages, push notifications (mobile and browser web push), scheduled reminders, SMS/email delivery, WebSocket connections, private messaging, device registration, and texting providers. It provides the communication layer used across all ChurchApps applications for both live streaming chat and asynchronous notifications.

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
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | Newest notes across every record for the B1 Admin Notes page. `section` is `people`, `groups`, `events` or `workflows` (400 otherwise); `limit` defaults to 25 (max 100); `before` is the cursor from the previous page. Each note still passes its own type's rule (People Edit / confidential notes permission, leaders of the group, event viewers, workflow card viewers), so callers only see notes they could open. Note text is cut to 300 characters |
| GET | `/current/:churchId/:contentType/:contentId` | Public | — | Get or create the current conversation for content (auto-decrypts contentId) |
| GET | `/:churchId/:contentType/:contentId` | Public | — | Load conversations by content type and ID |
| GET | `/:churchId/:id` | Public | — | Load a single conversation by ID |
| POST | `/` | JWT | — | Create or update conversations (batch) |
| POST | `/start` | JWT | — | Start a new conversation with an initial comment message |
| POST | `/ensure` | JWT | — | Get or create the public live stream chat room for the caller's church. Body: `{ contentType, contentId }`, where `contentType` must be `streamingLive`. Returns the current conversation for that `contentId`, creating it (public, anonymous posts allowed) if there is none. `401` without a signed-in user, for any other `contentType`, or when `contentId` is missing |
| DELETE | `/:churchId/:id` | JWT | `content.edit` | Delete a conversation |

### Person notes access control

Conversations with `contentType: "person"` (the Notes tab on a person record) or `contentType: "personConfidential"` (the Confidential Notes section) are gated on every read and write path, including the otherwise-public routes above, which return `401` for these content types. `person` requires the MembershipApi **People / Edit** permission; `personConfidential` requires **People / View Confidential Notes**. For scoped API keys, `people:write` carries both actions (the key's user must still hold the underlying role permission).

### Group and event notes access control {#group-and-event-notes-access-control}

Two more note content types are gated the same way, on every read and write path (including the public routes above), and are never open to anonymous posting:

- **`groupNote`** (`contentId` = group ID) -- the **Leader notes** feed on a group. Only that group's leaders (`leaderGroupIds` on the JWT) can read or post. No staff permission grants access, including `content.edit` and the group-membership permissions.
- **`eventNote`** (`contentId` = event ID) -- the notes on a calendar event. Staff with `content.edit` or **Calendars / Admin** can always read and post. Otherwise access follows the event's `notesViewRole` (read) and `notesPostRole` (post): `staff` (the default, used when the field is `null`) allows no one else, `leaders` allows leaders of the event's group, and `members` allows the event group's members and leaders. An event with no `groupId` is staff-only.

### Workflow card notes access control

Conversations with `contentType: "workflowCard"` (the notes on a workflow card, where `contentId` is the card's task ID) are readable and writable only by someone who can open that card: a user with the DoingApi **Tasks / View** permission, or the person or group the card is assigned to, created by, or about. Everyone else gets `401` on every read path, including the public routes above. A card's conversation is attached through the card itself with `POST /doing/tasks/:id/conversation` (body `{ "conversationId": "..." }`; the first conversation attached wins), which the card's editors and its assignee can call.

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
| POST | `/` | JWT | — | Save messages (batch). Sends real-time updates and triggers notifications. Updating an existing message requires being its author or holding `content.edit`; the stored author is never reassignable |
| POST | `/send` | Public | — | Send messages (batch, public). Sends real-time updates via WebSocket and triggers notifications |
| POST | `/setCallout` | JWT | — | (legacy) Broadcast a callout message in real time. No active client; live stream chat no longer renders callouts |
| POST | `/:messageId/reactions` | JWT | Conversation participant | Toggle an emoji reaction for the current user. Body: `{ emoji }`. Adds the reaction, or removes it when the caller has already reacted with that emoji, and broadcasts a `reaction` event to the conversation. Returns `{ messageId, emoji, added }`. Allowed for group members in their group's feeds (including feeds they cannot post to), the two people in a private message, hosts with `chat.host` in host chat, anyone who can post to that note or open that workflow card or task, any signed-in church user in a public live stream room, and `content.edit` staff anywhere; otherwise `401`. `400` without `emoji`; `404` when the message or its conversation is not found |
| DELETE | `/:id` | JWT | Author or moderator | Delete a message and broadcast the deletion in real time. `404` when the message is not found; `401` when the caller is neither its author nor allowed to moderate it. See [Message moderation](#message-moderation) |

### Message moderation

Deleting a message is allowed for:

- the message's author;
- staff with `content.edit` (anywhere in the church);
- **group leaders**, for conversations with a `contentType` of `group` or `groupAnnouncement` whose `contentId` is a group they lead (`leaderGroupIds` on the JWT).

Person-note conversations (`person` / `personConfidential`) are never leader-moderated — they use the notes permissions (`people.edit`, `people.viewConfidentialNotes`) instead.

Leaders get delete only, not edit: rewriting another member's message stays restricted to the author and `content.edit` staff.

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
| DELETE | `/:id` | JWT | Sender or recipient | Delete a private message record (the row that links the two people to their conversation). Only its two participants may call this. Returns `{ success: true }`. `404` when it is not found; `401` for anyone else |

## Notifications

Base path: `/messaging/notifications`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Get unread notification count for the current user |
| GET | `/my` | JWT | — | Load all notifications for the current user (marks all as read) |
| GET | `/:churchId/person/:personId` | JWT | — | Load notifications for a specific person |
| GET | `/:churchId/:id` | JWT | — | Load a notification by ID |
| POST | `/` | JWT | — | Create or update notifications (batch) |
| POST | `/create` | JWT | `messaging.admin` | Create notifications for multiple people. Body: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Mark all notifications as read for a person |
| POST | `/sendTest` | JWT | — | Send a test push notification. Body: `{ personId, title }` |
| POST | `/ping` | JWT | `messaging.admin` | Create a notification for one person in the caller's church. Body: `{ personId, contentType, contentId, message, triggeredByPersonId? }`. A `churchId` in the body is not read |
| DELETE | `/my` | JWT | — | Delete all of the current user's notifications. The hidden entries that track unread private messages are kept |
| DELETE | `/:churchId/:id` | JWT | Own notification or `messaging.admin` | Delete a notification |
| GET | `/groupPreview/:groupId` | JWT | `groupMembers.edit` | Count how many of a group's members a push would reach |
| GET | `/churchPreview` | JWT | `content.edit` | Count how many people a push to everyone with the app would reach |
| POST | `/group/send` | JWT | `groupMembers.edit` | Send a push to a group's members now |

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

## Scheduled Notifications

Base path: `/messaging/scheduledNotifications`

Pushes scheduled ahead of time. `audience` is `church` (everyone with the app; needs `content.edit`) or `group` (needs `groupMembers.edit` and a `groupId`). Title is limited to 80 characters and message to 240. A due row is sent by the 1-minute timer.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | `groupMembers.edit` or `content.edit` | List scheduled and recent notifications for the church |
| POST | `/` | JWT | per audience | Create a scheduled notification, or update one when `id` is set. Body: `{ id?, audience, groupId?, title, message, link?, imageUrl?, sendAt }`. Updating one that is no longer pending returns 409 |
| POST | `/:id/sendNow` | JWT | per audience | Send a pending notification now. Returns 409 if it was already sent, cancelled, or is being sent |
| DELETE | `/:id` | JWT | per audience | Cancel a pending notification, or remove a sent, failed, or cancelled one from the list. Returns 409 while it is being sent |
| DELETE | `/` | JWT | `groupMembers.edit` or `content.edit` | Remove every sent, failed, and cancelled notification for the audiences the user can send to. Returns `{ deleted }` |

## Reminders

Base path: `/messaging/reminders`

Reminder definitions tell the reminder engine when to notify the people attached to an entity. `entityType` is `event`, `plan`, or `task`; any other value returns `400`. A definition belongs either to one entity (`/:entityType/:entityId`) or to a scope whose entities all inherit it (`/scope/:entityType/:scopeId`, used for serving reminders per plan type). Saving a definition cancels its pending sends that are still in the future and schedules new ones straight away. See [Notifications & Reminders Architecture](../../architecture/notifications.md) for the engine, the delivery channels, and the preference rules.

Definition body: `{ offsets, sendLocalTime, timeZone, message, channels, recipientMode, enabled }`. `offsets` are minutes before (an array or a comma-separated string such as `1440,60`; default `1440`), and each send time is the occurrence's date at `sendLocalTime` (`HH:MM` or `HH:MM:SS`, default 9:00) minus the offset. `timeZone` is an IANA zone and falls back to the church's. `channels` is an array or comma-separated list of `push`, `email`, `in_app`, and `sms`. `enabled` defaults to `true`.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:entityType/:entityId` | JWT | `content.edit` | List the reminder definitions saved for one entity |
| GET | `/scope/:entityType/:scopeId` | JWT | `content.edit` | List the definitions saved for a scope |
| GET | `/event/:eventId/preview?recipientMode=&offsets=&sendLocalTime=&timeZone=` | JWT | `content.edit` | Preview an event reminder before saving it: `{ recipientMode, recipientCount, scope, unlinkedAttendeeCount, nextFires }`. `scope` is `registrants` or `group`, `unlinkedAttendeeCount` counts registered attendees with no person record (registrant scope only), and `nextFires` lists up to five send times (ISO) for occurrences in the next 14 days. Defaults: `recipientMode=auto`, `offsets=1440`, `sendLocalTime=09:00:00`, the church's time zone. An unknown event returns zero counts with `scope: "none"` |
| GET | `/log` | JWT | `messaging.admin` or `content.edit` | The church's 50 most recent reminder occurrences (pending, sent, cancelled, or failed), latest send time first |
| GET | `/mute?entityType=` | JWT | — | The current user's own per-entity mutes, optionally narrowed to one `entityType` (for example `group`). `[]` when the user is not linked to a person |
| POST | `/:entityType/:entityId` | JWT | `content.edit` | Create or update the entity's reminder definition (the entity's existing definition is overwritten). Adding the `sms` channel to a definition that does not already text also requires `texting.send`, otherwise `401`. Returns the saved definition |
| POST | `/scope/:entityType/:scopeId` | JWT | `content.edit` | Create or update a scope-level definition. A scope holds one reminder and, beside it, at most one leader gap alert (`recipientMode: "leaderGaps"`); the body's `recipientMode` decides which of the two is saved. Same `texting.send` rule for adding `sms` |
| POST | `/:entityType/:entityId/sendNow` | JWT | `content.edit` | Send the entity's saved reminder to its recipients immediately, through the definition's channels. The definition must be saved and enabled (`400` otherwise), and when its channels include `sms` the caller also needs `texting.send` (`401`). The scheduled sends are left in place and still go out. Emails sent this way count against the church's email sending limit. Returns `{ sent, textsSent, textsSkipped }`: `sent` is the number of recipients notified, and `textsSkipped` counts recipients who were not texted, for example because they have not turned on text reminders, have opted out, have no mobile phone, or the church has no texting provider. Scope-level definitions cannot be sent this way |
| POST | `/mute` | JWT | — | Set the current user's notification level for one entity. Body: `{ entityType, entityId, level? }`, where `level` is `all` (default), `mentions`, or `muted`. Saving again for the same entity updates the level. `400` when `entityType` or `entityId` is missing |
| DELETE | `/:defId` | JWT | `content.edit` | Delete a definition and cancel its pending occurrences. `404` when it is not found |

## Notification Preferences

Base path: `/messaging/notificationpreferences`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/categories` | JWT | — | List notification categories with their default and allowed channels |
| GET | `/my` | JWT | — | Load notification preferences for the current user (auto-creates defaults if none exist) |
| POST | `/` | JWT | — | Save the current user's preferences. Body: any of `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, plus optional `overrides: [{ categoryKey, channel, optedIn }]` (channel may be `push`, `email`, `in_app`, or `sms`; locked categories are ignored). `allowSms` is the member's opt-in for text reminders. A legacy array-of-rows body is still accepted |
| GET | `/person/:personId/sms` | JWT | `texting.send` | Read one person's text reminder opt-in: `{ allowSms }` (`false` when the person has no saved preferences) |
| POST | `/person/:personId/sms` | JWT | `texting.send` | Set one person's text reminder opt-in on their behalf. Body: `{ allowSms }`. Only `allowSms` changes; a preferences row is created if the person has none. Returns `{ allowSms }` |

## Connections

Base path: `/messaging/connections`

Manages WebSocket/real-time connections for chat, group conversations, private messages, and live streaming. See [Real-time Architecture](../../realtime.md) for the end-to-end protocol.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | Public | — | Load all connections for a conversation |
| POST | `/` | Public | — | Register connections (batch). Triggers an attendance broadcast on the conversation. Body items: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Public | — | Update the display name for a connection by socket ID. Body: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Public | — | Drop a connection from a conversation. Triggers an attendance broadcast |

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

## Device Contents

Base path: `/messaging/devicecontents`

Manages content assignments for paired devices (e.g., which lesson is displayed on a TV).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Load content assignments for a device |
| POST | `/` | JWT | — | Save device content assignments (batch) |
| DELETE | `/:id` | JWT | — | Delete a device content assignment |

## Web Push

Base path: `/messaging/webpush`

Browser push subscriptions (W3C Web Push with VAPID keys). A subscription is stored as a device record, alongside mobile push registrations. See [Web Push Notifications](../../web-push.md) for the keys, the client helper, and service worker handling.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/publicKey` | Public | — | `{ publicKey, enabled }`: the server's VAPID public key (`""` when none is set) and whether web push is configured, meaning both VAPID keys are present |
| POST | `/subscribe` | JWT | — | Save the current user's browser subscription. Body: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }`; `endpoint` must be an `https` URL and `appName` defaults to `B1AppPwa`. Updates the church's device that already holds that subscription or endpoint (otherwise creates one), links it to the caller, and removes the church's other device rows for the same endpoint. Returns `{ success: true, id }`; an invalid body returns `200` with `{ success: false, error: "invalid subscription" }` |
| POST | `/unsubscribe` | Public | — | Delete every device row holding a subscription endpoint, in any church. Body: `{ endpoint }`, an `https` URL of at least 40 characters (otherwise `{ success: false }`). No sign-in is needed; knowing the endpoint URL is the only check. Returns `{ success: true }` |
| DELETE | `/subscription/:id` | JWT | Own device or `content.edit` | Delete a subscription by its device ID. Returns `{ success: true }`. `401` when the device is not the caller's or does not exist |

## Texting

Base path: `/messaging/texting`

Manages SMS texting providers, group text messaging, and delivery tracking.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | `texting.send` or `settings.edit` | Load texting providers for the church (credentials are masked) |
| GET | `/status` | JWT | — | `{ enabled }` — whether the church has an enabled texting provider. Any signed-in church user; used to show **Text** options only when texts can be sent |
| GET | `/inboundUrl` | JWT | `texting.send` or `settings.edit` | `{ url }` — the church's inbound (STOP) webhook URL to paste into the provider |
| POST | `/inbound/:churchId/:token` | Public | — | Provider inbound-message webhook. `token` is an HMAC of the church id (`401` when it does not match). A reply that is exactly a stop word (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`) marks every person with that mobile number `smsOptedOut` and turns off their `allowSms`, returning `{ optedOut: <count> }`. A reply of `START` or `UNSTOP` clears `smsOptedOut` for those people and returns `{ optedIn: <count> }`; it does not turn `allowSms` back on. Any other reply returns `{ optedOut: 0 }` |
| GET | `/credits` | JWT | — | Texting credit status for the church. No enabled texting provider: `{ configured: false, supported: false }`. A provider other than MinistryStuff: `{ configured: true, supported: false }`. MinistryStuff: `{ configured: true, supported: true }` plus the credit fields that service reports, or `hasCredits: false, error: "unavailable"` when the balance cannot be fetched. Read-only; no credits are used |
| GET | `/preview/:groupId` | JWT | `texting.send` | Preview recipients for a group text (eligible, opted-out, no-phone counts) |
| POST | `/preview` | JWT | `texting.send` | Preview recipients for a text to specific people. Body: `{ personIds }`. Returns counts only: `{ totalMembers, eligibleCount, optedOutCount, noPhoneCount }`. People who share a mobile number count once toward `eligibleCount`. Nothing is sent |
| GET | `/sent` | JWT | `texting.send` | Load all sent text message records for the church |
| GET | `/sent/:id/details` | JWT | `texting.send` | Load a sent text with per-recipient delivery logs |
| POST | `/providers` | JWT | `texting.send` | Save texting providers (batch). Encrypts API credentials |
| POST | `/send` | JWT | `texting.send` | Send an SMS to the eligible members of a group, or to specific people. Body: `{ groupId, message }` or `{ personIds, message }` (`groupId` is used when both are sent). Merge fields (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) are resolved per recipient. `400` when the body is incomplete, the church has no enabled texting provider, there are no eligible recipients, or every send fails for lack of credits (`{ error: "insufficient_credits" }`) |
| POST | `/sendPerson` | JWT | `texting.send` | Send an SMS to a single person. Body: `{ personId, message, personName? }`. The text goes to the mobile phone on the person's record; a `phoneNumber` in the body is ignored. Merge fields are resolved, and the resolved text is what gets logged. Returns `{ recipientCount, successCount, failCount }`, plus `error` (still `200`) when the provider fails to send. `404` when the person is not found; `400` when `personId` or `message` is missing, the person has no mobile phone or has opted out of texts, the church has no enabled texting provider, or it is out of credits (`{ error: "insufficient_credits" }`) |
| DELETE | `/providers/:id` | JWT | `texting.send` | Delete a texting provider |

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

## Email Templates

Base path: `/messaging/emailTemplates`

Manages reusable email templates and sending templated emails to groups.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Load all email templates for the church |
| GET | `/:id` | JWT | — | Load a single email template by ID |
| GET | `/mergeFields` | JWT | — | List the merge fields a template can use: `[{ key, label }]`, for example `{ key: "{{firstName}}", label: "First Name" }` |
| GET | `/sendStatus` | JWT | `groupMembers.edit` or `tasks.admin` | The church's group email status: `{ approved, paused, remaining, requested }`. B1Admin's Send Email dialog and the workflow **Send Email** action use it to warn when email won't go out |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | Ask support to approve the church for group email (at most once per church per week) |
| GET | `/preview/:groupId` | JWT | `groupMembers.edit` | Preview email delivery for a group (eligible recipient count, members with no email) |
| POST | `/preview` | JWT | `groupMembers.edit` | Preview email delivery to specific people. Body: `{ personIds }`. Returns `{ totalMembers, eligibleCount, noEmailCount }`. Nothing is sent |
| POST | `/` | JWT | `groupMembers.edit` | Create or update email templates (batch) |
| POST | `/send` | JWT | `groupMembers.edit` | Send a templated email to the members of a group, or to specific people. Body: `{ subject, htmlContent, groupId }` or `{ subject, htmlContent, personIds }` (`groupId` is used when both are sent), plus optional `sendCopy` to email the sender a copy; the response then includes `copySent` (true or false) once at least one email went out. `400` when `subject` or `htmlContent` is missing, neither `groupId` nor `personIds` is sent, or no recipient has an email address. `403` with `code: "emailNotApproved"` when the church has not been approved for group email. `429` with `code: "emailPaused"` when group email is paused for the church, and `429` when the send would exceed the church's current sending limit |
| DELETE | `/:churchId/:id` | JWT | `groupMembers.edit` | Delete an email template. The `churchId` segment is required in the path but not used: the template is deleted from the caller's own church |

### Example: Send Email to Group

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

(legacy) IP-blocking for live streaming chat. The B1App client no longer calls `POST /` — IP blocking was removed in the unified-delivery migration. The `/clear` route is still invoked server-to-server by `StreamingServiceController` when streaming services are saved.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | (legacy) Save blocked IPs (batch). No active client |
| POST | `/clear` | JWT | — | Clear all blocked IPs for specific services. Body: `[{ serviceId, churchId }]` |

## Delivery Logs

Base path: `/messaging/deliverylogs`

Tracks delivery status for sent messages (SMS, push notifications, email).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | `messaging.admin` | Load delivery logs by content type and ID |
| GET | `/person/:personId` | JWT | Own record or `messaging.admin` | Load delivery logs for a person. Optional `?startDate=&endDate=` filters |
| GET | `/person/:personId/emailStatus` | JWT | Own record, `people.view`, `people.edit`, or `messaging.admin` | Whether the person's most recent email event was a bounce: `{ bounced: false }`, or `{ bounced: true, address, date }`. Gives the bounce warning on a profile without exposing the full delivery log |
| GET | `/person/:personId/failures` | JWT | `people.edit` | The person's 25 most recent failed deliveries, newest first: `[{ attemptTime, deliveryMethod, deliveryAddress, errorMessage }]`. Message content is never returned |
| GET | `/recent` | JWT | `messaging.admin` | Load recent delivery logs for the church. Optional `?limit=` (default 100, maximum 500) |
| GET | `/:id` | JWT | Own record or `messaging.admin` | Load a delivery log by ID |

## Related Pages

- [Real-time Architecture](../../realtime.md) -- WebSocket protocol, room subscriptions, and the unified delivery framework
- [Web Push Notifications](../../web-push.md) -- Browser push enrollment and delivery
- [Notifications & Reminders Architecture](../../architecture/notifications.md) -- The delivery funnel, the reminder engine, and notification preferences
- [Membership Endpoints](./membership.md) -- People, groups, roles, and core identity
- [Attendance Endpoints](./attendance.md) -- Service and visit tracking
- [Authentication & Permissions](./authentication.md) -- Login flow, JWT, OAuth, permission model
- [Module Structure](../module-structure.md) -- Code organization patterns
