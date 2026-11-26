---
title: "Content Endpoints"
description: "Endpoint reference for the ChurchApps Content API: website pages, blog posts, sermons, events, registrations, room and resource booking, files, storage, Bible lookups, and songs."
---

# Content Endpoints

<div class="article-intro">

The Content module manages website pages, sections, elements, blocks, blog posts, redirects, sermons, playlists, streaming services, events, RSVPs, event registrations and their payments, room and resource bookings with their approval workflow, curated calendars, files, bring-your-own storage providers, galleries, Bible translations and verse lookups, songs, arrangements, global styles, stock photos, and settings. It is the largest module in the API and powers the CMS, media/streaming, calendar and event registration, worship planning, and Bible features across all ChurchApps applications.

</div>

**Base path:** `/content`

## Pages

Base path: `/content/pages`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Public | — | Load full page tree (sections, elements, blocks) by URL or ID. Strips internal IDs when fetched by URL. URL-based fetches enforce `pages.visibility` — a gated page returns `{ restricted: true, visibility }` unless the (optional) JWT satisfies the gate |
| GET | `/public/:churchId` | Public | — | List public pages (`url`, `title`, `metaDescription`); only `visibility = everyone` |
| GET | `/:id` | JWT | — | Get a page by ID |
| GET | `/` | JWT | — | List all pages for the church |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplicate a page with all sections and elements |
| POST | `/temp/ai` | JWT | Content.Edit | Save an AI-generated page (page, sections, and elements in one call) |
| POST | `/importTree` | JWT | Content.Edit | Create a page from a nested tree (`title`, `url`, `sections[].elements[]…`). Always inserts under the caller's church; ids in the body are ignored. Rows must include their `column` children. Max 30 sections / 500 elements |
| POST | `/` | JWT | Content.Edit | Create or update pages (batch) |
| POST | `/:id/publish` | JWT | Content.Edit | Publish a page: stores a snapshot of its current sections and elements. Public tree requests then serve that snapshot, while editors keep seeing the working copy. Returns `{ publishedAt }`. `404` if the page does not exist |
| POST | `/:id/discard` | JWT | Content.Edit | Discard unpublished changes: replaces the page's working sections and elements with the published snapshot. Returns `{ success: true }`. `400` if the page has no published version |
| DELETE | `/:id` | JWT | Content.Edit | Delete a page |
| DELETE | `/:id/published` | JWT | Content.Edit | Remove a page's published snapshot (clears `publishedAt`), so public tree requests serve the working copy again |

### Example: Load Page Tree

```
GET /content/pages/abc-church-id/tree?url=/about
```

```json
{
  "name": "About",
  "url": "/about",
  "sections": [
    {
      "background": "#FFFFFF",
      "textColor": "dark",
      "elements": [
        { "elementType": "textWithPhoto", "answers": { "text": "Welcome" } }
      ]
    }
  ]
}
```

## Sections

Base path: `/content/sections`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Get a section by ID |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Duplicate a section or convert it to a reusable block |
| POST | `/` | JWT | Content.Edit | Create or update sections (batch). Auto-updates sort order |
| POST | `/tree` | JWT | Content.Edit | Create one section with its full nested element tree in a single call. Body: `{ section }`, where `section` carries a `pageId` or `blockId` and nested `elements[]`. Always inserts new rows under the caller's church; ids in the body are ignored. Returns the saved section and auto-updates sort order. `400` with `errors[]` when `pageId` and `blockId` are both missing, an `answersJSON`, `stylesJSON` or `animationsJSON` value is not valid JSON, or an element's answers fail validation |
| DELETE | `/:id` | JWT | Content.Edit | Delete a section (auto-updates sort order) |

## Elements

Base path: `/content/elements`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Get an element by ID |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplicate an element with all children |
| POST | `/` | JWT | Content.Edit | Create or update elements (batch). Auto-manages row columns and carousel slides |
| DELETE | `/:id` | JWT | Content.Edit | Delete an element |

## Blocks

Base path: `/content/blocks`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Get a block by ID |
| GET | `/` | JWT | — | List all blocks |
| GET | `/:churchId/tree/:id` | Public | — | Load full block tree with sections and elements |
| GET | `/blockType/:blockType` | JWT | — | Load blocks by type (e.g. footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Public | — | Load footer block tree for a church |
| POST | `/` | JWT | Content.Edit | Create or update blocks |
| DELETE | `/:id` | JWT | Content.Edit | Delete a block |

## Links

Base path: `/content/links`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — (People.View for person links) | Get a link by ID. A link in the `personLink` category (a link on a person's record) returns `401` without People.View |
| GET | `/` | JWT | — (People.View for person links) | List all links. Optional `?category=` filter. Person links are left out unless `?category=personLink&linkData=` (the person id) is requested, which needs People.View |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Load links filtered by visibility (everyone, visitors, members, staff, groups) |
| GET | `/church/:churchId?category=` | Public | — | Load links for a church by category (public) |
| POST | `/` | JWT | Content.Edit (People.Edit for person links) | Create or update links (batch). Auto-sorts by category. A batch of `personLink` links needs People.Edit instead, and each must carry `linkData` (the person id). Person links cannot be mixed with other links in one batch, and an existing link cannot be moved into or out of the `personLink` category (`401`) |
| DELETE | `/:id` | JWT | Content.Edit (People.Edit for person links) | Delete a link |

## Global Styles

Base path: `/content/globalStyles`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/church/:churchId` | Public | — | Load global styles for a church (returns defaults if none set) |
| GET | `/:id` | JWT | — | Get a global styles record by ID |
| GET | `/` | JWT | — | Load global styles for the authenticated church |
| POST | `/` | JWT | Content.Edit | Create or update global styles |
| DELETE | `/:id` | JWT | Content.Edit | Delete global styles |

## Page History

Base path: `/content/pageHistory`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | List history entries for a page |
| GET | `/block/:blockId` | JWT | Content.Edit | List history entries for a block |
| GET | `/:id` | JWT | Content.Edit | Get a history entry by ID |
| POST | `/` | JWT | Content.Edit | Save a page/block snapshot. Periodically cleans up entries older than 30 days |
| POST | `/restore/:id` | JWT | Content.Edit | Restore a page/block from a history snapshot (deletes current content and recreates from snapshot) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Restore from an inline snapshot object. Body: `{ pageId, blockId, snapshot }` |

## Posts (Blog)

Base path: `/content/posts`

Blog posts are standalone rows: `title`, `slug` (unique per church), `excerpt`, `content` (markdown body), `authorId`, `photoUrl`, `publishDate`, `category`, and `tags`. A post is published once `publishDate` is set and in the past. Read endpoints enrich each post with `authorName` resolved from `authorId`. See [Website Builder Architecture](../../architecture/website-builder.md#blog).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Public | — | List published posts, paginated (max 50 per page) |
| GET | `/public/:churchId/categories` | Public | — | Distinct categories across published posts |
| GET | `/public/:churchId/slug/:slug` | Public | — | Get a published post by slug |
| GET | `/rss/:churchId?siteUrl=` | Public | — | RSS 2.0 feed of published posts (links built as `{siteUrl}/blog/{slug}`) |
| GET | `/:id` | JWT | — | Get a post by ID |
| GET | `/` | JWT | — | List all posts for the church |
| POST | `/` | JWT | Content.Edit | Create or update posts (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Delete a post |

## Redirects

Base path: `/content/redirects`

Per-church URL redirects (`fromPath` → `toPath`), capped at 200 per church. Paths are normalized (lowercased, leading slash, no trailing slash) and `fromPath` is unique per church. B1App resolves these on would-be 404s and issues an HTTP 308.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?path=` | Public | — | Resolve a path (or list all redirects when `path` is omitted) |
| GET | `/:id` | JWT | — | Get a redirect by ID |
| GET | `/` | JWT | — | List all redirects for the church |
| POST | `/` | JWT | Content.Edit | Create or update redirects. Rejects `fromPath = toPath` and enforces the 200-row cap |
| DELETE | `/:id` | JWT | Content.Edit | Delete a redirect |

## Sermons

Base path: `/content/sermons`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | Get a sample FreeShow playlist structure |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Get TV app wrapper with sermon, lesson, and FreeShow sources |
| GET | `/public/tvFeed/:churchId/:sermonId` | Public | — | Get a single sermon as a TV feed playlist |
| GET | `/public/tvFeed/:churchId` | Public | — | Get all public playlists/sermons as a TV feed |
| GET | `/public/:churchId` | Public | — | List all public sermons for a church |
| GET | `/public/download/:churchId/:sermonId` | Public | — | `302` redirect to a published sermon's media file: its `audioUrl`, or its `videoUrl` when that points directly at an `.mp3`, `.m4a` or `.mp4` file. A file uploaded to the church's sermon files on the platform's S3 storage gets a short-lived signed link that downloads under the sermon title. `404` when the sermon is missing, not yet published, or has no direct media URL |
| GET | `/rss/:churchId?siteUrl=` | Public | — | Podcast RSS 2.0 feed (`application/rss+xml`, with iTunes tags) of the church's published sermons that have a direct media file (same rule as the download route). Item links are built as `{siteUrl}/sermons/{id}`. The title comes from the `podcastTitle` setting (church name when unset) and the image from `podcastImage` (church logo when unset) |
| GET | `/timeline?sermonIds=` | JWT | — | Load timeline data for sermons |
| GET | `/lookup?videoType=&videoData=` | Public | — | Look up sermon metadata from YouTube or Vimeo |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | StreamingServices.Edit | Generate AI social media post suggestions from sermon subtitles |
| GET | `/outline?url=&title=&author=` | JWT | StreamingServices.Edit | Generate AI lesson outline from a URL |
| GET | `/youtubeImport/:channelId` | JWT | StreamingServices.Edit | Import videos from a YouTube channel. HTML entities that YouTube's search API puts in titles and descriptions (such as `&amp;` and `&#39;`) are decoded |
| GET | `/vimeoImport/:channelId` | JWT | StreamingServices.Edit | Import videos from a Vimeo channel |
| GET | `/:id` | JWT | — | Get a sermon by ID |
| GET | `/` | JWT | — | List all sermons |
| POST | `/` | JWT | StreamingServices.Edit | Create or update sermons. Accepts an array or a single sermon object (always returns an array); an empty body returns 400. Supports base64 thumbnail upload |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Delete a sermon |

### Example: Look Up a YouTube Sermon

```
GET /content/sermons/lookup?videoType=youtube&videoData=dQw4w9WgXcQ
```

```json
{
  "title": "Sunday Service - Faith in Action",
  "description": "Pastor John speaks about faith...",
  "thumbnail": "https://img.youtube.com/vi/dQw4w9WgXcQ/default.jpg",
  "duration": 2400,
  "publishDate": "2025-01-15T10:00:00Z"
}
```

## Playlists

Base path: `/content/playlists`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Get a playlist by ID |
| GET | `/` | JWT | — | List all playlists |
| GET | `/public/:churchId` | Public | — | List all public playlists for a church |
| POST | `/` | JWT | StreamingServices.Edit | Create or update playlists (batch, supports base64 thumbnail upload) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Delete a playlist |

## Streaming Services

Base path: `/content/streamingServices`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Get encrypted host chat room ID for a service |
| GET | `/` | JWT | — | List all streaming services. Auto-cleans expired non-recurring services and advances recurring ones |
| POST | `/` | JWT | StreamingServices.Edit | Create or update streaming services (batch) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Delete a streaming service (also clears blocked IPs) |

## Podcast Feeds

Base path: `/content/podcast`

Reads a third-party podcast feed for the website's podcast element. The church's own sermon podcast feed is `GET /content/sermons/rss/:churchId`.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/feed?url=` | Public | — | Fetch a podcast RSS feed and return it as JSON: `{ title, description, image, link, author, episodes }`, with each episode as `{ guid, title, pubDate, description, audioUrl, audioType, duration, image, episodeNumber, link }` (`duration` in seconds; first 200 episodes). Results are cached for 15 minutes. `400` when `url` is missing, is not `http`/`https`, or points at a blocked or private host; `422` when the response is not an RSS feed; `502` when the feed cannot be loaded |

## Events

Base path: `/content/events`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Load timeline events for a group (includes exception dates, so deleted occurrences can be skipped) |
| GET | `/timeline?eventIds=` | JWT | — | Load timeline events for the current user's groups (includes exception dates) |
| GET | `/registerable` | JWT | — | List the church's events that have `registrationEnabled` set, ordered by start |
| GET | `/requests/mine` | JWT | — | List the event requests the caller submitted (events whose `requestedBy` is the caller's person), latest start first. Each event carries a `bookings` array with its room and resource bookings (`roomName` / `resourceName`, `status`) |
| GET | `/requests/person/:personId` | JWT | Content.Edit or Calendars.Admin | Same as `/requests/mine`, for another person |
| GET | `/pending` | JWT | Content.Edit or Calendars.Admin | List event requests awaiting approval (`approvalStatus` = `pending`), ordered by start |
| GET | `/resolved` | JWT | Content.Edit or Calendars.Admin | List approved and rejected event requests, latest start first |
| GET | `/subscribe/mine` | JWT | — | Get the caller's personal calendar feed credentials: `{ churchId, personId, token }`. Passing all three to `GET /subscribe` (`?churchId=&personId=&token=`) returns that person's ICS feed; a wrong token gets `401`. The token is a signature tied to the church and person and has no expiry. `400` when the user has no person record |
| GET | `/subscribe?churchId=&groupId=&roomId=&curatedCalendarId=&personId=&token=` | Public | — | Subscribe to events as ICS calendar feed (`text/calendar`). `churchId` is required (`400` without it), together with one of: `groupId` (the group's public events); `roomId` (events with an approved booking of that room, where events that are not public are listed as "Reserved" with no description or location); `curatedCalendarId` (the public events on that curated calendar); or `personId` with the `token` from `/subscribe/mine` (upcoming and recurring events of the person's groups, plus public events from the church's curated calendars; `401` when the token is missing or wrong). When several are sent, the first in that order is used |
| GET | `/group/:groupId` | JWT | — | Get events for a group (includes exception dates) |
| GET | `/public/tag/:churchId/:tag` | Public | — | List public events whose `tags` contain the given tag, ordered by start. `confirmationMessage` is left out |
| GET | `/public/registerable/:churchId` | Public | — | List the church's events that have `registrationEnabled` set, ordered by start. `confirmationMessage` is left out |
| GET | `/public/group/:churchId/:groupId` | Public | — | Get public events for a group |
| GET | `/public/:churchId/:id` | Public | — | Get one event for its public page, with `roomNames` (rooms from bookings that are not rejected). Returns `null` for pending or rejected events and for private events that don't take registrations |
| GET | `/public/:churchId/:id/ical` | Public | — | Download that single event as an `.ics` file (`text/calendar`, exception dates applied). `404` when the event is hidden by the same rules |
| GET | `/holidays?start=&end=` | JWT | — | List holidays in a date range as `[{ date, name }]` (`date` is `YYYY-MM-DD`), from a fixed set of US holidays. `start` defaults to today and `end` to one year after `start` |
| GET | `/:id` | JWT | — | Get an event by ID |
| POST | `/` | JWT | Content.Edit, Calendars.Admin, or group leader | Create or update events (batch). Without Content.Edit or Calendars.Admin, every event in the batch must carry the `groupId` of a group the caller leads, and an event being updated must already belong to a group the caller leads (`401` otherwise) |
| POST | `/conflicts` | JWT | — | Check a proposed event and its room/resource bookings for conflicts before saving. Body: `{ eventId?, start, end, recurrenceRule?, setupMinutes?, teardownMinutes?, startTime?, endTime?, roomIds, resources: [{ resourceId, quantity }], timeZone? }`. Returns an array of `{ type, roomId, resourceId, blockoutId, conflictingEventId, conflictingEventTitle, date, message }`, where `type` is `room` (already booked), `resource` (not enough quantity left) or `blockout`; an empty array means no conflicts. Rejected bookings and the bookings of `eventId` itself are ignored, and recurring events are checked about a year ahead |
| POST | `/request` | JWT | — | Submit an event request. Body: `{ title, description?, location?, start, end, allDay?, recurrenceRule?, groupId?, roomIds?, resources?: [{ resourceId, quantity }] }`. Creates a private event with `approvalStatus` = `pending` and `requestedBy` set to the caller, plus one booking per room and resource (up to 50 of each; unknown ids are skipped). `groupId` is kept only when the caller belongs to that group or has Content.Edit. Returns `{ event, bookings }`. `401` when the user has no person record |
| POST | `/ical` | JWT | Content.Edit | Bulk-create events from an iCalendar file. Body: `{ ics, groupId, visibility? }`, where `ics` is the file's text and `visibility` defaults to `public`. Creates one event in the group per `VEVENT` (up to 500) with its title, description, location, start, end, all-day flag and recurrence rule; times with no usable `TZID` are read in the church's time zone. Returns the created events. `400` when `ics` or `groupId` is missing |
| POST | `/:id/approve` | JWT | Content.Edit or Calendars.Admin | Approve an event request: sets `approvalStatus` to `approved`, records `resolvedBy` and `resolvedDate`, makes the event public, and notifies the requester. `404` if the event does not exist |
| POST | `/:id/reject` | JWT | Content.Edit or Calendars.Admin | Reject an event request: sets `approvalStatus` to `rejected`, makes the event private, and notifies the requester. Body: `{ reason? }` (optional, first 500 characters are added to the notification). `404` if the event does not exist |
| POST | `/:id/requester` | JWT | Content.Edit or Calendars.Admin | Reassign a request to another person. Body: `{ personId }`. Sets `requestedBy` on every booking of the event and, when the event is itself a request (has an `approvalStatus`), on the event. Returns `{ event, bookings }`. `404` if the event does not exist; `400` when `personId` is missing or is not a person in the church |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin, or group leader | Delete an event and its bookings. Leaders of the event's group may delete it, and a requester may withdraw their own pending request |

Event records include `photoUrl` (the 16:9 event photo shown on the public event page and upcoming-event tiles), `tags` (comma-separated, used by the website Calendar element's tag filter), and `notesViewRole` / `notesPostRole` (`staff` when `null`, `leaders`, or `members`), which gate the event's `eventNote` conversation — see [Group and event notes access control](./messaging.md#group-and-event-notes-access-control). Public curated-event responses also carry each event's `photoUrl` and `tags`.

An event request (`POST /request`) is an event with `approvalStatus` = `pending` and a `requestedBy` person. It stays in `GET /pending` until someone with Content.Edit or Calendars.Admin approves or rejects it. Approving or rejecting the event does not change its room and resource bookings, which have their own status — see [Event Bookings](#event-bookings).

## Event RSVPs

Base path: `/content/events`

RSVPs belong to group events and are stored per occurrence: one response (`yes`, `no` or `maybe`) per person for each `occurrenceStart`. "Group member" below means a member of the event's group.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/rsvps/group/:groupId?from=&to=` | JWT | Group member | RSVP counts for the group's events in a date window (default: now to 90 days ahead). Returns one entry per occurrence that has responses: `{ eventId, occurrenceStart, yes, no, maybe, mine }`, where `mine` is the caller's own response or `null` |
| GET | `/:eventId/rsvps?occurrenceStart=` | JWT | Groups.Edit or group leader | List the responses for one occurrence: `[{ id, personId, response, occurrenceStart }]`. `400` without `occurrenceStart`; `404` if the event does not exist |
| POST | `/:eventId/rsvp` | JWT | Group member | Set the caller's own response for one occurrence. Body: `{ occurrenceStart, response }`. Saving again replaces the earlier response. `400` when the event has `rsvpDisabled` set, `occurrenceStart` is missing, or `response` is not `yes`, `no` or `maybe`; `404` if the event does not exist |
| DELETE | `/:eventId/rsvp?occurrenceStart=` | JWT | Group member | Remove the caller's own response for one occurrence. `400` without `occurrenceStart`; `404` if the event does not exist |

## Event Exceptions

Base path: `/content/eventExceptions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Get an event exception by ID |
| POST | `/` | JWT | Content.Edit, Calendars.Admin, or group leader | Create or update event exceptions (batch). Leaders may only add exceptions for events in groups they lead |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin, or group leader | Delete an event exception |

## Event Bookings

Base path: `/content/eventBookings`

A booking reserves a room, or a quantity of a resource, for an event, and has a `status` of `pending`, `approved` or `rejected`. Bookings connect the event request routes under [Events](#events) with the [Rooms](#rooms), [Resources](#resources), [Calendar Blockouts](#calendar-blockouts) and [Event Templates](#event-templates) sections below. A new booking is approved at once when its room or resource has no `approvalGroupId`, or when the person making it belongs to that group; otherwise it stays `pending` until a member of the approval group, or someone with Content.Edit or Calendars.Admin, approves or rejects it. A scheduled job emails new pending bookings to the approval group's members as a digest. Blockouts mark times when a room, a resource or the whole facility is unavailable, and the conflict check (`POST /content/events/conflicts`) reports them along with overlapping bookings. Templates are saved presets for new events (title, description, duration, visibility, rooms and resources); the API only stores them.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/event/:eventId` | JWT | — | List an event's bookings, each with `roomName` or `resourceName` |
| GET | `/calendar?startTime=&endTime=&roomId=&resourceId=` | JWT | — | List bookings that are not rejected, for an availability calendar. Each row adds `eventTitle`, `eventStart`, `eventEnd`, `eventRecurrenceRule`, `roomName` and `resourceName`. One-time events are returned when they overlap the window (default: now to one year ahead); recurring events are always returned and the client expands them. `roomId` and `resourceId` are optional filters |
| GET | `/pending` | JWT | — | Approvals inbox: pending bookings, oldest request first, with event, room and resource details and a `conflicts` array (same shape as `POST /content/events/conflicts`). Callers with Content.Edit or Calendars.Admin see every pending booking; other callers see only those whose room or resource has an approval group they belong to |
| GET | `/resolved` | JWT | — | Approvals history: approved and rejected bookings, most recently decided first, limited to the same bookings as `/pending` |
| POST | `/` | JWT | Content.Edit, Calendars.Admin, or group leader | Create or update bookings (batch). Each item has an `eventId`, a `roomId` or a `resourceId`, a `quantity` (default 1), and optionally `setupMinutes` / `teardownMinutes` (padding around each occurrence) or `startTime` / `endTime` (an absolute window used instead of the event's times). Leaders may only book for events of groups they lead. A new booking records the caller as `requestedBy` and gets its status from the approval-group rule above. An update saves only `quantity`, `status`, the setup/teardown minutes and `startTime` / `endTime`: the event, room and resource of a booking are fixed once created, and only callers with Content.Edit or Calendars.Admin can set `status` (for a leader it is kept, or worked out again when the quantity changes). `404` when an `id` does not exist |
| POST | `/:id/approve` | JWT | Content.Edit, Calendars.Admin, or approval group member | Approve a booking: sets `status` to `approved`, records `resolvedBy` and `resolvedDate`, and notifies the requester. Optional body: `{ publish?, curatedCalendarId? }`. `publish: true` also makes the booking's event public and needs Content.Edit or Calendars.Admin; with `curatedCalendarId` the event is also added to that curated calendar, which needs Content.Edit (`400` if the calendar does not exist). `404` if the booking does not exist |
| POST | `/:id/reject` | JWT | Content.Edit, Calendars.Admin, or approval group member | Reject a booking: sets `status` to `rejected`, records `resolvedBy` and `resolvedDate`, and notifies the requester. Body: `{ reason? }` (optional, first 500 characters are added to the notification). `404` if the booking does not exist |
| DELETE | `/:id` | JWT | Content.Edit or own request | Delete a booking. Callers without Content.Edit may only delete bookings they requested. `404` if the booking does not exist |

## Rooms

Base path: `/content/rooms`

Rooms that events can book. Fields: `name`, `description`, `capacity`, `categoryName`, `active`, and `approvalGroupId` (the group whose members approve bookings of the room; empty means bookings need no approval).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Get a room by ID |
| GET | `/` | JWT | — | List all rooms, ordered by name |
| POST | `/` | JWT | Content.Edit | Create or update rooms (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Delete a room. Bookings and blockouts that reference it are left in place |

## Resources

Base path: `/content/resources`

Items that events can book by quantity. Fields: `name`, `description`, `quantity` (how many the church has; the conflict check reports a conflict when overlapping bookings would need more), `categoryName`, `active`, and `approvalGroupId` (same meaning as for rooms).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Get a resource by ID |
| GET | `/` | JWT | — | List all resources, ordered by name |
| POST | `/` | JWT | Content.Edit | Create or update resources (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Delete a resource. Bookings and blockouts that reference it are left in place |

## Calendar Blockouts

Base path: `/content/calendarBlockouts`

A blockout marks a time range (`startTime` to `endTime`, with an optional `reason`) as unavailable for one room (`roomId`), one resource (`resourceId`), or every room and resource when neither is set. Blockouts do not stop a booking from being saved; they are reported by the conflict check.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Get a blockout by ID |
| GET | `/` | JWT | — | List all blockouts, ordered by start time |
| POST | `/` | JWT | Content.Edit | Create or update blockouts (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Delete a blockout |

## Event Templates

Base path: `/content/eventTemplates`

Saved presets for creating events. Fields: `name`, `title`, `description`, `durationMinutes`, `visibility`, `roomIds` and `resourcesJson` (both stored as strings exactly as sent).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Get an event template by ID |
| GET | `/` | JWT | — | List all event templates, ordered by name |
| POST | `/` | JWT | Content.Edit | Create or update event templates (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Delete an event template |

## Curated Calendars

Base path: `/content/curatedCalendars`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Get a curated calendar by ID |
| GET | `/` | JWT | — | List all curated calendars |
| POST | `/` | JWT | Content.Edit | Create or update curated calendars (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Delete a curated calendar |

## Curated Events

Base path: `/content/curatedEvents`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Get curated events for a calendar (includes event details and exception dates unless `?withoutEvents` is set) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Public | — | Get public curated events for a calendar |
| GET | `/:id` | JWT | — | Get a curated event by ID |
| GET | `/` | JWT | — | List all curated events |
| POST | `/` | JWT | Content.Edit | Create or update curated events. Supports `eventIds` array to add specific group events |
| DELETE | `/:id` | JWT | Content.Edit | Delete a curated event |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Remove a specific event from a curated calendar |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Remove all events for a group from a curated calendar |

## Registrations

Base path: `/content/registrations`

Event registration with priced attendee types, add-on selections, discount codes, payments and a waitlist. [Event Registrations](../../architecture/registrations.md) describes the data model and the flows in full. Rules that hold across the registration sections:

- A registration has a `status` of `pending` (awaiting payment), `confirmed`, `waitlisted` or `cancelled`. Only `pending` and `confirmed` registrations count toward the event's `capacity`, an attendee type's or selection's `capacity`, and a discount code's `maxUses`.
- Prices are worked out on the server from the type ids, selection ids and quantities in the request. `totalAmount` is the price after any discount, `amountPaid` is payments minus refunds, and the balance due is the difference.
- The registration form runs signed out, so the public routes take `churchId` in the query string or the body.
- The registrant (the person a registration belongs to) can read, edit, pay for and cancel their own registration. Anyone else needs Registrations.View to read and Registrations.Edit to change.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/event/:eventId` | JWT | Registrations.View or group leader | List every registration for an event (all statuses), oldest first, each with its `members`. Leaders of the event's group may call it too |
| GET | `/event/:eventId/count?churchId=` | Public | — | Returns `{ count }`: the number of `pending` and `confirmed` registrations for the event (registrations, not attendees). `400` without `churchId` |
| GET | `/event/:eventId/household` | JWT | — | Returns `{ personIds }`: the caller and the members of the caller's household who are already on a registration for the event that is not cancelled, as registrant or attendee. Empty when the user has no person record |
| GET | `/person/:personId` | JWT | Registrations.View or own record | List the registrations a person made (as registrant), newest first, each with its `event` and `members` |
| GET | `/:id` | JWT | Registrations.View or own registration | Get a registration with its `members`, `selectionChoices`, `payments` and `event`. Returns an empty object when it does not exist |
| POST | `/register` | Public | — | Submit a registration as a guest, as a signed-in member, or as staff adding someone else. Body: `{ churchId, eventId, guestInfo?: { firstName, lastName, email, phone? }, personId?, members: [{ firstName, lastName, registrationTypeId?, personId? }], selections?: [{ selectionId, quantity? }], couponCode?, formSubmissionId?, payLater?, captchaPass? }`, plus payment fields when a charge is due. Returns the registration with its `members` (`personId` and `householdId` are left out for callers with no person record). The rules and status codes are under [Registering](#registering) |
| PUT | `/:id` | JWT | Registrations.Edit or own registration | Edit a registration. Body: `{ notes?, formSubmissionId?, members?, selections? }`. `members` and `selections`, when sent, replace the stored ones with the same checks as `POST /register` (`400` invalid type, selection or quantity; `409` `type-full` or `selection-full`, which leaves the registration unchanged; `409` `already-registered`), and a registrant may only link attendees from their own household. `totalAmount` is then worked out again, keeping the registration's discount code while its `minMembers` is still met. Nothing is charged or refunded, so a changed total shows up as a balance. `404` if the registration does not exist |
| POST | `/:id/promote` | JWT | Registrations.Edit | Move a waitlisted registration off the waitlist if the event has room. It becomes `pending` when a balance is owed and `confirmed` otherwise, and the registrant is emailed. `409` when there is no spot or the registration is not waitlisted; `404` if it does not exist |
| POST | `/:id/cancel` | JWT | Registrations.Edit or own registration | Cancel a registration: sets `status` to `cancelled` and `cancelledDate`, emits the `registration.cancelled` webhook, emails the registrant, and then promotes the oldest waitlisted registration if the event has room. Payments are kept and nothing is refunded. `403` when a registrant cancels and the event has `allowSelfCancel` turned off; `400` if already cancelled; `404` if it does not exist |
| POST | `/:id/restore` | JWT | Registrations.Edit | Restore a cancelled registration to `pending` (a balance is owed) or `confirmed`. `400` if it is not cancelled. `409` with a `code` when it no longer fits: `already-registered` (someone on it is on another registration; `personIds` lists them), `event-full`, `type-full` (with `registrationTypeId`) or `coupon-max-uses`. `404` if it does not exist |
| DELETE | `/:id` | JWT | Registrations.Edit | Permanently delete a registration with its attendees and selection choices, then promote the oldest waitlisted registration if the event has room. `409` with `code: "registration-has-payments"` when it has any payment or refund on record; cancel it instead |

### Registering

`POST /register` applies these rules. Unless noted, a failure saves nothing.

- **Event.** `404` if the event does not exist. `400` if registration is not enabled, has not opened yet (`registrationOpenDate`) or has closed (`registrationCloseDate`).
- **Rate limit.** Callers without a signed-in user get `429` after 30 registrations an hour from one IP address, or 5 an hour for one guest email.
- **Registrant.** With `guestInfo`, the registrant is the person in the church who has that email, or a new person created with membership status `Guest`. Without it, a signed-in member registers themselves by sending their own `personId`. A caller with Registrations.Edit in that church who sends another person's `personId` adds that person as staff (`404` if the person does not exist), and that registration is never charged. `409` if the registrant already has a registration for the event that is not cancelled.
- **Attendees and selections.** `400` for an attendee type or selection that is not an active one of this event, for a quantity that is not a whole number of 1 or more, and, when the event has a priced attendee type, for a request with no attendees or with an attendee that has no type. An attendee's `personId` is kept only for people in the registrant's household; staff additions are not limited, and a guest submission from a caller with no person record cannot link anyone. Unless `guestInfo` was sent, the call returns `409` with `status: "already-registered"` and `personIds` when the registrant or a linked attendee is already on another registration that is not cancelled.
- **Price.** The total is each attendee's type `price` plus each selection's `price` times its quantity. A `couponCode` is validated again here and its discount applied; an invalid code returns `400` with a `reason` (listed under [Registration Coupons](#registration-coupons)).
- **Capacity.** When the event is full, the registration is saved as `waitlisted` if the event has `waitlistEnabled` (no payment is taken and the response has `status: "waitlisted"`); otherwise the call returns `409` with `status: "full"`. A full attendee type returns `409` with `status: "type-full"` and `registrationTypeId`, and a full selection returns `409` with `status: "selection-full"` and `selectionId`.
- **Payment.** A total of zero is `confirmed` straight away. Any other registration starts as `pending` and is charged in the same call, except when it was added by staff, the church has no payment gateway, or `payLater: true` was sent and the event has `allowPayLater` (`400` when the event does not allow it). The charge is the amount due now: the `depositAmount` of attendee types that have one, the full price of everything else, and never more than the discounted total. The payment fields are `provider` or `gatewayId` (one is required), `type` (default `card`), `token` or `id`, `customerId`, `paymentMethodId` and `currency`. A successful charge is recorded as a payment and confirms the registration, leaving any remainder as a balance. A failed charge returns `400`. When captcha enforcement is on, a caller without a signed-in user must also send a `captchaPass` from `POST /giving/donate/captcha-verify`, or the call returns `403`.
- **Afterwards.** A saved registration emits the `registration.created` webhook and emails a confirmation to the registrant. A waitlisted signup gets the email but no webhook. If the gateway asks for further customer authentication, the call returns the still-`pending` registration with a `payment` object; no payment is recorded and no webhook or email is sent.

## Registration Payments

Base path: `/content/registrations`

Every money movement on a registration is a row in its payment ledger with a `kind`: `charge` (an online payment through the church's payment gateway), `payment` (recorded by staff) or `refund`. Charges and payments raise `amountPaid`. Refunds lower it and never change the registration's `status`.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/payments/:registrationId` | JWT | Registrations.View or own registration | List a registration's ledger rows, oldest first: `{ id, registrationId, kind, method, amount, currency, provider, transactionId, status, personId, createdDate }`. `404` if the registration does not exist |
| POST | `/:id/pay` | JWT | Registrations.Edit or own registration | Charge the whole balance due through the church's payment gateway. Body: the payment fields of `POST /register` (`provider` or `gatewayId`, `type`, `token` or `id`, `customerId`, `paymentMethodId`, `currency`). Records a `charge` row and confirms a `pending` registration once it is paid in full; returns the registration. If the gateway asks for further customer authentication, the registration is returned with a `payment` object and nothing is recorded. `409` while `waitlisted`; `400` when there is no balance or the charge fails; `404` if the registration does not exist |
| POST | `/:id/payments` | JWT | Registrations.Edit | Record an offline payment. Body: `{ amount, method, checkNumber? }`, with `method` one of `cash`, `check` or `other` (`checkNumber` is kept for checks only). `400` unless `amount` is above zero, has at most two decimals and is no more than the balance due. Confirms a `pending` registration once it is paid in full. `409` for a cancelled or waitlisted registration, for the same payment entered again within 60 seconds, or when the registration changed while saving. Returns `{ registration, payments }` |
| POST | `/:id/refunds` | JWT | Registrations.Edit | Record an offline refund; no gateway is called. Same body as `/:id/payments`. `400` when `amount` is invalid or more than `amountPaid`; `409` for the same refund entered again within 60 seconds or when the registration changed while saving. Returns `{ registration, payments }` |
| POST | `/payments/:paymentId/refund` | JWT | Registrations.Edit | Refund an online charge, in full or in part, through the payment gateway. Body: `{ amount }`. `400` when the payment is not an online charge, `amount` is more than what is left of that charge after earlier refunds or more than the registration's `amountPaid`, the gateway does not support refunds, or the gateway declines. `409` when another refund on the registration is in progress. `404` if the payment does not exist. Returns `{ registration, payments }` |
| POST | `/event/:eventId/balance-reminders` | JWT | Registrations.Edit | Email every `pending` or `confirmed` registrant on the event who still owes a balance and has an email address: their total, amount paid and balance, with a link to pay. Returns `{ sent }`. `404` if the event does not exist |

## Registration Types

Base path: `/content/registrations/types`

Attendee types (for example Adult and Child) set the price per attendee. Fields: `eventId`, `name`, `description`, `price`, `depositAmount` (optional; charged per attendee at registration instead of the full price), `capacity`, `minAgeYears`, `maxAgeYears`, `formId`, `sort` and `active`. The age limits are stored for clients to apply; the API does not enforce them.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/event/:eventId?churchId=` | Public | — | List an event's active attendee types, ordered by `sort`, each with `used` (attendees of that type on `pending` or `confirmed` registrations) and `remainingCapacity` (`null` when the type has no `capacity`). `400` without `churchId` |
| POST | `/` | JWT | Registrations.Edit | Create or update attendee types (batch). `400` when a `depositAmount` is zero or less, or more than the `price` |
| DELETE | `/:id` | JWT | Registrations.Edit | Delete an attendee type |

## Registration Selections

Base path: `/content/registrations/selections`

Selections are priced add-ons chosen by quantity. Fields: `eventId`, `name`, `description`, `price`, `capacity` (total quantity available across all registrations), `maxQuantity`, `sort` and `active`. `maxQuantity` is stored for clients to apply; the API does not enforce it.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/event/:eventId?churchId=` | Public | — | List an event's active selections, ordered by `sort`, each with `used` (total quantity chosen on `pending` or `confirmed` registrations) and `remainingCapacity` (`null` when the selection has no `capacity`). `400` without `churchId` |
| POST | `/` | JWT | Registrations.Edit | Create or update selections (batch) |
| DELETE | `/:id` | JWT | Registrations.Edit | Delete a selection |

## Registration Coupons

Base path: `/content/registrations/coupons`

Discount codes for one event. Fields: `eventId`, `code` (matched without regard to case), `discountType` (`percent` or `amount`), `value`, `startDate`, `endDate`, `minMembers` (smallest number of attendees), `maxUses` and `active`. A percent discount takes `value` percent off the total and an amount discount subtracts `value`; the total never goes below zero. A code is refused with one of these reasons: `not-found`, `inactive`, `not-started`, `expired`, `min-members` or `max-uses`.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/event/:eventId` | JWT | Registrations.Edit | List an event's discount codes, each with `uses` (the `pending` and `confirmed` registrations that used it) |
| POST | `/validate` | Public | — | Check a discount code before checkout. Body: `{ churchId, eventId, code, memberCount? }` (`memberCount` defaults to 1). Returns `{ valid: true, discountType, value }` or `{ valid: false, reason }`. `400` without `churchId`; `429` after 30 checks an hour from one IP address |
| POST | `/` | JWT | Registrations.Edit | Create or update discount codes (batch) |
| DELETE | `/:id` | JWT | Registrations.Edit | Delete a discount code |

## Files

Base path: `/content/files`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:contentType/:contentId` | JWT | — (People.View for person files) | Get files by content type and content ID. Content type `person` (files on a person's record, with the person id as `contentId`) needs People.View (`401`) |
| GET | `/` | JWT | — | List all files for the church website |
| GET | `/:id` | JWT | — (People.View for person files) | Get a file by ID. A person file (content type `person`) needs People.View (`401`) |
| GET | `/download/:id` | Public | — | Download a file by ID. The response is normally a `302` redirect to where the bytes are stored; for a file on a connected Google Drive, Dropbox or OneDrive account that is a short-lived provider link, reused for up to 30 minutes. Files with content type `website` or `arrangement` are open to anyone. Other files need a JWT for the file's church (`401`). Person files (content type `person`) need the signed `exp` and `sig` query values issued by `/download/:id/link` (`401` when missing, wrong or expired). `404` if the file does not exist |
| GET | `/download/:id/link` | JWT | — (People.View for person files) | Get a URL for downloading a file: `{ url }`. For most files it is the file's `contentPath`. For a person file it is a signed `/download/:id` link that is valid for 5 minutes, and the caller needs People.View (`401`). `404` if the file does not exist |
| GET | `/sync/:teamId/:fileName` | JWT | Content.Edit or group member | Find where a team's FreeShow sync archive is stored. `teamId` is the group id and `fileName` must be `current.zip` or `previous.zip` (`400` otherwise). Returns `{ external: false }` when the archive is on the platform's content host at its usual path, or `{ external: true, url, md5, modified, size }` when the church's connected Google Drive holds it (only `external` is returned until the first upload) |
| POST | `/` | JWT | Content.Edit* (People.Edit for person files) | Upload files (base64). *Also allowed if user is a member of the group matching `contentId` (content type `group` only). The base64 content may not decode to more than 25 MB (`400` `file_too_large`). A batch that contains a person file (content type `person`) needs People.Edit instead: every file in it must be a person file with the person id as `contentId` and a `fileName` (`400` `invalid_file`), each is always saved as a new file, and one person's files may total 100 MB at most (`400` `storage_quota_exceeded`) |
| POST | `/postUrl` | JWT | Content.Edit* (People.Edit for person files) | Get a pre-signed S3 upload URL. *Also allowed for group members. Max 100MB per content item. For a person file (content type `person`) the caller needs People.Edit instead, `contentId` must be the person id and `fileName` is required (`400` `invalid_file`), and one person's files may total 100 MB at most (`400` `storage_quota_exceeded`) |
| DELETE | `/:id` | JWT | Content.Edit* (People.Edit for person files) | Delete a file and remove from storage. *Also allowed for group members. Deleting a person file (content type `person`) needs People.Edit instead. `404` if the file does not exist |

## Storage Providers

Base path: `/content/storage`

A church can connect its own storage for files uploaded through `/content/files`: `googledrive`, `dropbox`, `onedrive`, or an S3-compatible bucket (`s3`). One provider is enabled at a time, and with none enabled files go to the platform's default storage. See [Bring-Your-Own Storage](../../architecture/byos-storage.md) for the upload and download flows.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | Content.Edit or Settings.Edit | List the church's storage provider records as `{ id, churchId, provider, enabled, settings, apiKey, apiSecret, connected }`. Secrets are never returned: `apiKey` and `apiSecret` read `********` when set, and `connected` tells whether OAuth tokens are stored |
| GET | `/status` | JWT | — | Get the storage the church's uploads currently use: `{ provider }` (`churchapps` is the platform default), plus `usedBytes` and `quotaBytes` when the provider reports a quota, or `error: "unavailable"` when the quota lookup fails |
| POST | `/providers` | JWT | Content.Edit | Create or update provider records (batch). Fields: `provider`, `enabled`, `apiKey`, `apiSecret` and `settings` (a JSON string; for `s3` it holds `endpoint`, `region`, `bucket` and `publicBase`). An item without an `id` updates the church's existing record for the same `provider`. Sending `********` keeps the stored key or secret, and OAuth tokens cannot be set through this route. Enabling a record disables the church's other records. `400` when `settings` is not valid JSON, or its `endpoint` is not an `https` URL or points at a blocked or private host |
| POST | `/exchange` | JWT | Content.Edit | Complete an OAuth connection. Body: `{ provider, code, codeVerifier, redirectUri }`, with `provider` one of `googledrive`, `dropbox` or `onedrive`. Exchanges the authorization code for tokens, stores them encrypted on the church's record for that provider, enables it and disables the others. Returns the masked record. `400` for an unknown provider or a failed exchange |
| DELETE | `/providers/:id` | JWT | Content.Edit | Disconnect a provider. When files are still stored with it, the record is kept but disabled, so downloads and deletes keep working, and the response is `{ disabled: true, fileCount }`. Otherwise the record is deleted |

## Gallery

Base path: `/content/gallery`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/stock/:folder` | Public | — | List stock photos in a folder |
| GET | `/:folder` | JWT | Content.Edit or group leader | List gallery images in a folder. Leaders of any group may call it without Content.Edit |
| POST | `/requestUpload` | JWT | Content.Edit or group leader | Get a pre-signed S3 upload URL for a gallery image. Body: `{ folder, fileName, contentType?, size? }`. Leaders of any group may call it without Content.Edit, but only for `.jpg`, `.jpeg`, `.png`, `.webp` or `.gif` files whose `contentType`, when sent, is `image/jpeg`, `image/png`, `image/webp` or `image/gif` (`400` otherwise); their image is stored under a randomized file name. Returns an empty object when the API does not store files in S3 |
| POST | `/upload` | JWT | Content.Edit or group leader | Upload a gallery image in the request body, for self-hosted installs that keep files on disk; when the API stores files in S3 it returns `400` and `/requestUpload` must be used. Body: `{ folder, fileName, contentType, fileContents }`, with `fileContents` as base64 (25 MB at most, else `400`). Returns `{ key }`. Leaders of any group may upload without Content.Edit, but only `.jpg`, `.jpeg`, `.png`, `.webp` or `.gif` images (`400` otherwise), which are saved under a randomized file name |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Delete a gallery image |

## Bibles

Base path: `/content/bibles`

All Bible endpoints are public (no authentication required). Data is fetched from external sources and cached locally. Requests to api.bible time out after 15 seconds; a timeout returns **504**.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | Public | — | List all Bible translations (fetches from source if cache is empty) |
| GET | `/stats?startDate=&endDate=` | Public | — | Get Bible lookup statistics for a date range |
| GET | `/availableTranslations/:source` | Public | — | List available translations from a source (e.g. api.bible) |
| GET | `/updateTranslations` | Public | — | Sync all translations from all sources |
| GET | `/updateTranslations/:source` | Public | — | Sync translations from a specific source |
| GET | `/updateCopyrights` | Public | — | Update copyright info for translations missing it |
| GET | `/:translationKey/updateCopyright` | Public | — | Update copyright for a specific translation |
| GET | `/:translationKey/search?query=&limit=` | Public | — | Search verses in a translation |
| GET | `/:translationKey/books` | Public | — | Get books for a translation (caches locally) |
| GET | `/:translationKey/:bookKey/chapters` | Public | — | Get chapters for a book (caches locally) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Public | — | Get verses for a chapter (caches locally) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Public | — | Get verse text for a range. Logs lookups. Some translations bypass caching for licensing |

### Example: Get Verse Text

```
GET /content/bibles/de4e12af7f28f599-02/verses/GEN.1.1-GEN.1.3
```

```json
[
  { "verseKey": "GEN.1.1", "content": "In the beginning God created the heavens and the earth.", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 1 },
  { "verseKey": "GEN.1.2", "content": "Now the earth was formless and empty...", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 2 },
  { "verseKey": "GEN.1.3", "content": "And God said, \"Let there be light,\" and there was light.", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 3 }
]
```

## Songs

Base path: `/content/songs`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/search?q=` | JWT | — | Search songs by query |
| GET | `/:id` | JWT | — | Get a song by ID |
| GET | `/` | JWT | Content.Edit | List all songs |
| POST | `/` | JWT | Content.Edit | Create or update songs (batch) |
| POST | `/import` | JWT | — | Import songs from FreeShow (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Delete a song |

## Song Details

Base path: `/content/songDetails`

Song details are global (not church-scoped). These represent canonical song metadata shared across churches.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Get a song detail by ID (global) |
| GET | `/` | JWT | — | List song details for the church |
| POST | `/create` | JWT | — | Create a song detail from PraiseCharts ID (returns existing if already created). Auto-fetches metadata from PraiseCharts and MusicBrainz |
| POST | `/` | JWT | — | Create or update song details (batch) |

## Song Detail Links

Base path: `/content/songDetailLinks`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Get a song detail link by ID |
| GET | `/songDetail/:songDetailId` | JWT | — | Get all links for a song detail |
| GET | `/church/:service` | JWT | Content.Edit | List the links of one service (the link's `service` value, such as `CCLI` or `Spotify`) for every song in the church's library |
| POST | `/` | JWT | Content.Edit | Create or update song detail links (batch). Auto-fetches MusicBrainz data if linked. `400` when a `MusicBrainz` link's `serviceKey` is not a recording id (a UUID). Song details are shared between churches, so for callers without Server.Admin: an existing link can be changed only while no other church's songs use its song detail (`403` otherwise, and also when the `id` is unknown or the `songDetailId` does not match the stored link); `url` is rebuilt on the server from `service` and `serviceKey` for the services the API knows (such as `CCLI`, `Spotify` and `YouTube`); and a link for any other service, or with a `serviceKey` that is empty or contains whitespace, is accepted only on a song detail that no other church uses (`400` otherwise) |
| DELETE | `/:id` | JWT | Content.Edit | Delete a song detail link. Without Server.Admin, `403` when the link does not exist or its song detail is used by another church's songs |

## Arrangements

Base path: `/content/arrangements`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Get an arrangement by ID |
| GET | `/song/:songId` | JWT | Content.Edit | Get arrangements for a song |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Get arrangements for a song detail |
| GET | `/` | JWT | Content.Edit | List all arrangements |
| POST | `/` | JWT | Content.Edit | Create or update arrangements (batch) |
| POST | `/freeShow/missing` | JWT | — | Find FreeShow IDs that don't exist in the church. Body: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Delete an arrangement (also deletes keys; deletes the song if no arrangements remain) |

## Arrangement Keys

Base path: `/content/arrangementKeys`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:id` | Public | — | Get arrangement key with full song data for presenter view |
| GET | `/:id` | JWT | — | Get an arrangement key by ID |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Get keys for an arrangement |
| GET | `/` | JWT | Content.Edit | List all arrangement keys |
| POST | `/` | JWT | Content.Edit | Create or update arrangement keys (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Delete an arrangement key |

## Settings

Base path: `/content/settings`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Get current user's settings |
| GET | `/` | JWT | Settings.Edit | Get all settings for the church |
| GET | `/public/:churchId` | Public | — | Get public settings for a church (returned as key-value pairs) |
| GET | `/imports?type=&playlistId=&channelId=` | JWT | Settings.Edit | List the church's sermon auto-import settings. Each `autoImportSermons` setting comes back as `{ id, churchId, keyName, playlistId }` plus its channel as `youtubeChannelId` or `vimeoChannelId`. With both `playlistId` and `channelId`, only the import for that playlist and channel is returned (an empty array when there is none); `type` then says whether `channelId` is a `youtube` channel, otherwise it is treated as a Vimeo channel |
| POST | `/my` | JWT | — | Save user-level settings (supports base64 image upload) |
| POST | `/` | JWT | Settings.Edit | Save church-level settings (supports base64 image upload). A batch that includes the `blogFooterHtml` setting also needs Content.Edit (`401`) |
| DELETE | `/my/:id` | JWT | — | Delete a user setting |

## Preview

Base path: `/content/preview`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/data/:key` | Public | — | Load streaming preview data for a church by subdomain key (tabs, links, services, sermons) |

## Gallery (Stock Photos)

Base path: `/content/stock`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/search` | Public | — | Search Pexels stock photos. Body: `{ term: "church" }` |

## PraiseCharts

Base path: `/content/praiseCharts`

Integration with PraiseCharts for worship song discovery and sheet music downloads.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/raw/:id` | JWT | — | Get raw PraiseCharts data for a song |
| GET | `/hasAccount` | JWT | — | Check if the user has a linked PraiseCharts account |
| GET | `/search?q=` | JWT | — | Search the PraiseCharts catalog |
| GET | `/products/:id?keys=` | JWT | — | Get products for a song (from library if authenticated, otherwise catalog) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Get raw arrangement data from library |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Download a file from PraiseCharts (PDF or ZIP). Returns `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Public | — | Get OAuth authorization URL for PraiseCharts |
| GET | `/access?verifier=&token=&secret=` | JWT | — | Exchange OAuth verifier for access token and save to user settings |
| GET | `/library` | JWT | — | Browse the user's PraiseCharts library |

## Support

Base path: `/content/support`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/createAudio` | Public | — | Convert SSML to MP3 audio using AWS Polly. Body: `{ ssml: "<speak>...</speak>" }` |

## Related Pages

- [Website Builder Architecture](../../architecture/website-builder.md) -- How pages, sections, elements, posts, and redirects fit together across the apps
- [Event Registrations](../../architecture/registrations.md) -- Data model, pricing, capacity, payment, refund, and waitlist flows behind the registration endpoints
- [Bring-Your-Own Storage](../../architecture/byos-storage.md) -- The storage providers behind `/content/storage` and the file upload and download flows
- [Membership Endpoints](./membership.md) -- People, churches, groups, roles, permissions
- [Attendance Endpoints](./attendance.md) -- Service and visit tracking
- [Authentication & Permissions](./authentication.md) -- Login flow, JWT, permission model
- [Module Structure](../module-structure.md) -- Code organization patterns
