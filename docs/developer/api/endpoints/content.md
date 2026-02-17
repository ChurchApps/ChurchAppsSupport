---
title: "Content Endpoints"
---

# Content Endpoints

<div class="article-intro">

The Content module manages website pages, sections, elements, blocks, sermons, playlists, streaming services, events, curated calendars, files, galleries, Bible translations and verse lookups, songs, arrangements, global styles, stock photos, and settings. It is the largest module in the API and powers the CMS, media/streaming, worship planning, and Bible features across all ChurchApps applications.

</div>

**Base path:** `/content`

## Pages

Base path: `/content/pages`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Public | — | Load full page tree (sections, elements, blocks) by URL or ID. Strips internal IDs when fetched by URL |
| GET | `/:id` | JWT | — | Get a page by ID |
| GET | `/` | JWT | — | List all pages for the church |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplicate a page with all sections and elements |
| POST | `/temp/ai` | JWT | Content.Edit | Save an AI-generated page (page, sections, and elements in one call) |
| POST | `/` | JWT | Content.Edit | Create or update pages (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Delete a page |

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

Extends standard CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` from base class with Content.Edit permission for writes).

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

Extends standard CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` from base class with Content.Edit permission for writes).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Get a link by ID |
| GET | `/` | JWT | — | List all links. Optional `?category=` filter. Auto-sorts after save |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Load links filtered by visibility (everyone, visitors, members, staff, groups) |
| GET | `/church/:churchId?category=` | Public | — | Load links for a church by category (public) |
| POST | `/` | JWT | Content.Edit | Create or update links (batch). Auto-sorts by category |
| DELETE | `/:id` | JWT | Content.Edit | Delete a link |

## Global Styles

Base path: `/content/globalStyles`

Extends standard CRUD (POST `/`, DELETE `/:id` from base class with Content.Edit permission for writes).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/church/:churchId` | Public | — | Load global styles for a church (returns defaults if none set) |
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

## Sermons

Base path: `/content/sermons`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | Get a sample FreeShow playlist structure |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Get TV app wrapper with sermon, lesson, and FreeShow sources |
| GET | `/public/tvFeed/:churchId/:sermonId` | Public | — | Get a single sermon as a TV feed playlist |
| GET | `/public/tvFeed/:churchId` | Public | — | Get all public playlists/sermons as a TV feed |
| GET | `/public/:churchId` | Public | — | List all public sermons for a church |
| GET | `/timeline?sermonIds=` | JWT | — | Load timeline data for sermons |
| GET | `/lookup?videoType=&videoData=` | Public | — | Look up sermon metadata from YouTube or Vimeo |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Generate AI social media post suggestions from sermon subtitles |
| GET | `/outline?url=&title=&author=` | JWT | — | Generate AI lesson outline from a URL |
| GET | `/youtubeImport/:channelId` | JWT | — | Import videos from a YouTube channel |
| GET | `/vimeoImport/:channelId` | JWT | — | Import videos from a Vimeo channel |
| GET | `/:id` | JWT | — | Get a sermon by ID |
| GET | `/` | JWT | — | List all sermons |
| POST | `/` | JWT | StreamingServices.Edit | Create or update sermons (batch, supports base64 thumbnail upload) |
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

Extends standard CRUD (GET `/:id`, GET `/`, DELETE `/:id` from base class with StreamingServices.Edit permission for writes).

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

## Events

Base path: `/content/events`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Load timeline events for a group |
| GET | `/timeline?eventIds=` | JWT | — | Load timeline events for the current user's groups |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Public | — | Subscribe to events as ICS calendar feed |
| GET | `/group/:groupId` | JWT | — | Get events for a group (includes exception dates) |
| GET | `/public/group/:churchId/:groupId` | Public | — | Get public events for a group |
| GET | `/:id` | JWT | — | Get an event by ID |
| POST | `/` | JWT | — | Create or update events (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Delete an event |

## Event Exceptions

Base path: `/content/eventExceptions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Get an event exception by ID |
| POST | `/` | JWT | Content.Edit | Create or update event exceptions (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Delete an event exception |

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

## Files

Base path: `/content/files`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | Get files by content type and content ID |
| GET | `/` | JWT | — | List all files for the church website |
| GET | `/:id` | JWT | — | Get a file by ID |
| POST | `/` | JWT | Content.Edit* | Upload files (base64). *Also allowed if user is a member of the group matching `contentId` |
| POST | `/postUrl` | JWT | Content.Edit* | Get a pre-signed S3 upload URL. *Also allowed for group members. Max 100MB per content item |
| DELETE | `/:id` | JWT | Content.Edit* | Delete a file and remove from storage. *Also allowed for group members |

## Gallery

Base path: `/content/gallery`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/stock/:folder` | Public | — | List stock photos in a folder |
| GET | `/:folder` | JWT | Content.Edit | List gallery images in a folder |
| POST | `/requestUpload` | JWT | Content.Edit | Get a pre-signed S3 upload URL for a gallery image |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Delete a gallery image |

## Bibles

Base path: `/content/bibles`

All Bible endpoints are public (no authentication required). Data is fetched from external sources and cached locally.

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
| POST | `/` | JWT | — | Create or update song detail links (batch). Auto-fetches MusicBrainz data if linked |
| DELETE | `/:id` | JWT | — | Delete a song detail link |

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
| GET | `/imports?playlistId=&channelId=&type=` | JWT | Settings.Edit | Get auto-import settings (YouTube/Vimeo channel IDs) |
| POST | `/my` | JWT | — | Save user-level settings (supports base64 image upload) |
| POST | `/` | JWT | Settings.Edit | Save church-level settings (supports base64 image upload) |
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

- [Membership Endpoints](./membership) -- People, churches, groups, roles, permissions
- [Attendance Endpoints](./attendance) -- Service and visit tracking
- [Authentication & Permissions](./authentication) -- Login flow, JWT, permission model
- [Module Structure](../module-structure) -- Code organization patterns
