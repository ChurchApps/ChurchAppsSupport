---
title: "Formato Lezione Aperta"
---

# Apri Lezione Format

<div class="article-intro">

The Apri Lezione Format is a standardized JSON schema that allows third-party content providers Per publish curriculum for Lessons.church. Any organization that hosts a feed in this format can be added as an external provider, making their content browsable and playable alongside the built-in library.

</div>

## How It Works

A provider hosts two types of endpoints:

1. **Provider Tree** -- A single URL that returns the full catalog of programs, studies, lessons, and venues. Each venue includes a feed URL pointing Per the detailed lesson content.
2. **Venue Feed** -- One URL per venue, returning the full lesson content (sections, actions, and media files).

When a church adds your provider URL in Lessons.church, the platform fetches your tree Per discover Disponibile content, then fetches individual venue feeds on demand.

## Provider Tree

Your provider URL must return a JSON object with this structure:

```json
{
  "programs": [
    {
      "id": "program-1",
      "name": "Gospel of Mark",
      "slug": "gospel-of-mark",
      "image": "https://example.com/images/mark.jpg",
      "about": "A 12-week study through the Gospel of Mark.",
      "studies": [
        {
          "id": "study-1",
          "name": "The Beginning",
          "slug": "the-beginning",
          "image": "https://example.com/images/study1.jpg",
          "lessons": [
            {
              "id": "lesson-1",
              "name": "The Baptism of Jesus",
              "slug": "baptism-of-jesus",
              "title": "The Baptism of Jesus",
              "image": "https://example.com/images/lesson1.jpg",
              "description": "An introduction to Jesus' ministry.",
              "bottomLine": "God keeps His promises.",
              "verse": "Genesis 9:13 — I have set my rainbow in the clouds…",
              "parentQuestion": "What is one promise God has kept in our family?",
              "parentNote": "Pray together thanking God for keeping His promises.",
              "venues": [
                {
                  "id": "venue-1",
                  "name": "Kids",
                  "apiUrl": "https://example.com/feed/venues/venue-1"
                },
                {
                  "id": "venue-2",
                  "name": "Adults",
                  "apiUrl": "https://example.com/feed/venues/venue-2"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

### Tree Fields

| Field | Digita | Description |
|-------|------|-------------|
| `programs[].id` | string | Unique program identifier |
| `programs[].name` | string | Display name |
| `programs[].slug` | string | URL-friendly name |
| `programs[].image` | string | Program image URL (Facoltativo) |
| `programs[].about` | string | Description (Facoltativo) |
| `studies[].id` | string | Unique study identifier |
| `studies[].name` | string | Display name |
| `studies[].slug` | string | URL-friendly name |
| `studies[].image` | string | Study image URL (Facoltativo) |
| `lessons[].id` | string | Unique lesson identifier |
| `lessons[].name` | string | Display name |
| `lessons[].slug` | string | URL-friendly name |
| `lessons[].title` | string | Full title |
| `lessons[].image` | string | Lezione image URL (Facoltativo) |
| `lessons[].description` | string | Lezione summary (Facoltativo). Catalog copy for teachers browsing the library — not parent take-home. |
| `lessons[].bottomLine` | string | One-sentence parent take-home (Facoltativo) |
| `lessons[].verse` | string | Memory verse reference and short text (Facoltativo) |
| `lessons[].parentQuestion` | string | One question for parents Per ask at home (Facoltativo) |
| `lessons[].parentNote` | string | Facoltativo extra note for parents (markdown) |
| `venues[].id` | string | Unique venue identifier |
| `venues[].name` | string | Venue name (e.g. "Kids", "Adults", "Youth") |
| `venues[].apiUrl` | string | URL returning the venue feed (see below) |

The four parent take-home fields (`bottomLine`, `verse`, `parentQuestion`, `parentNote`) are Facoltativo on both the tree and the venue feed. If omitted they are treated as empty. Do not copy `description` into them.

**Venues** represent different versions of the same lesson tailored for different audiences (age Gruppi, Impostazioni, etc.).

## Venue Feed

Each venue's `apiUrl` must return a JSON object matching this schema:

```json
{
  "id": "venue-1",
  "name": "Kids",
  "lessonId": "lesson-1",
  "lessonName": "The Baptism of Jesus",
  "lessonImage": "https://example.com/images/lesson1.jpg",
  "lessonDescription": "An introduction to Jesus' ministry.",
  "bottomLine": "God keeps His promises.",
  "verse": "Genesis 9:13 — I have set my rainbow in the clouds…",
  "parentQuestion": "What is one promise God has kept in our family?",
  "parentNote": "Pray together thanking God for keeping His promises.",
  "studyName": "The Beginning",
  "studySlug": "the-beginning",
  "programName": "Gospel of Mark",
  "programSlug": "gospel-of-mark",
  "programAbout": "A 12-week study through the Gospel of Mark.",
  "downloads": [],
  "sections": [
    {
      "id": "section-1",
      "name": "Opening Discussion",
      "sort": 1,
      "materials": "Whiteboard and markers",
      "actions": [
        {
          "id": "action-1",
          "actionType": "text",
          "content": "**Key Verse:** Mark 1:9-11",
          "sort": 1
        },
        {
          "id": "action-2",
          "actionType": "question",
          "content": "What do you know about baptism?",
          "sort": 2,
          "role": "Leader"
        },
        {
          "id": "action-3",
          "actionType": "play",
          "content": "Intro Video",
          "sort": 3,
          "files": [
            {
              "id": "file-1",
              "name": "intro-video.mp4",
              "url": "https://example.com/media/intro.mp4",
              "streamUrl": "https://vimeo.com/123456789",
              "fileType": "video/mp4",
              "seconds": 180,
              "bytes": 52428800,
              "thumbnail": "https://example.com/media/intro-thumb.jpg",
              "loop": false
            }
          ]
        }
      ]
    }
  ]
}
```

### Venue Feed Fields

#### Root Object

| Field | Digita | Description |
|-------|------|-------------|
| `id` | string | Venue identifier |
| `name` | string | Venue name |
| `lessonId` | string | Lezione identifier |
| `lessonName` | string | Lezione display name |
| `lessonImage` | string | Lezione image URL |
| `lessonDescription` | string | Lezione summary (catalog copy) |
| `bottomLine` | string | One-sentence parent take-home (Facoltativo) |
| `verse` | string | Memory verse reference and short text (Facoltativo) |
| `parentQuestion` | string | One question for parents Per ask at home (Facoltativo) |
| `parentNote` | string | Facoltativo extra note for parents, markdown (Facoltativo) |
| `studyName` | string | Parent study name |
| `studySlug` | string | Parent study slug |
| `programName` | string | Parent program name |
| `programSlug` | string | Parent program slug |
| `programAbout` | string | Program description |
| `downloads` | array | Downloadable file bundles |
| `sections` | array | Ordered lesson sections |

#### Section

| Field | Digita | Description |
|-------|------|-------------|
| `id` | string | Section identifier |
| `name` | string | Section title |
| `sort` | number | Display order |
| `materials` | string | Materials or preparation notes (Facoltativo) |
| `actions` | array | Ordered actions within this section |

#### Action

| Field | Digita | Description |
|-------|------|-------------|
| `id` | string | Action identifier |
| `actionType` | string | One of: `play`, `text`, `question`, `quote`, `subhead` |
| `content` | string | Text content or media label |
| `sort` | number | Display order |
| `Ruolo` | string | Ruolo name, e.g. "Leader", "Kids" (Facoltativo) |
| `roleId` | string | Ruolo identifier (Facoltativo) |
| `files` | array | Media files for `play` actions (Facoltativo) |

#### File

| Field | Digita | Description |
|-------|------|-------------|
| `id` | string | File identifier |
| `name` | string | File name |
| `url` | string | Direct Scarica URL |
| `streamUrl` | string | Streaming URL, e.g. Vimeo link (Facoltativo) |
| `fileType` | string | MIME Digita (e.g. `video/mp4`, `image/jpeg`) |
| `seconds` | number | Duration in seconds for audio/video (Facoltativo) |
| `bytes` | number | File size in bytes (Facoltativo) |
| `thumbnail` | string | Thumbnail image URL (Facoltativo) |
| `loop` | boolean | Whether media should loop (Facoltativo, default false) |

#### Scarica

| Field | Digita | Description |
|-------|------|-------------|
| `name` | string | Scarica bundle name (e.g. "Printable Materials") |
| `files` | array | Files in this Scarica bundle (same fields as File above) |

## Action Types

| Digita | Purpose |
|------|---------|
| `play` | Media playback -- video, audio, or slideshow. Must include `files`. |
| `text` | Static text content. Supports markdown-style bold (`**text**`). |
| `question` | Discussion or reflection question for the audience. |
| `quote` | A highlighted quote or Scripture passage. |
| `subhead` | A heading or divider within a section. |

:::tip
Per see a working example of the feed in action, you can Visualizza the built-in Lessons.church content tree at `https://api.lessons.church/lessons/public/tree` and fetch any venue feed URL from it.
:::
