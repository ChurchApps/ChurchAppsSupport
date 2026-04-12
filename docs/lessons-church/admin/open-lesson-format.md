---
title: "Open Lesson Format"
---

# Open Lesson Format

<div class="article-intro">

The Open Lesson Format is a standardized JSON schema that allows third-party content providers to publish curriculum for Lessons.church. Any organization that hosts a feed in this format can be added as an external provider, making their content browsable and playable alongside the built-in library.

</div>

## How It Works

A provider hosts two types of endpoints:

1. **Provider Tree** -- A single URL that returns the full catalog of programs, studies, lessons, and venues. Each venue includes a feed URL pointing to the detailed lesson content.
2. **Venue Feed** -- One URL per venue, returning the full lesson content (sections, actions, and media files).

When a church adds your provider URL in Lessons.church, the platform fetches your tree to discover available content, then fetches individual venue feeds on demand.

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

| Field | Type | Description |
|-------|------|-------------|
| `programs[].id` | string | Unique program identifier |
| `programs[].name` | string | Display name |
| `programs[].slug` | string | URL-friendly name |
| `programs[].image` | string | Program image URL (optional) |
| `programs[].about` | string | Description (optional) |
| `studies[].id` | string | Unique study identifier |
| `studies[].name` | string | Display name |
| `studies[].slug` | string | URL-friendly name |
| `studies[].image` | string | Study image URL (optional) |
| `lessons[].id` | string | Unique lesson identifier |
| `lessons[].name` | string | Display name |
| `lessons[].slug` | string | URL-friendly name |
| `lessons[].title` | string | Full title |
| `lessons[].image` | string | Lesson image URL (optional) |
| `lessons[].description` | string | Lesson summary (optional) |
| `venues[].id` | string | Unique venue identifier |
| `venues[].name` | string | Venue name (e.g. "Kids", "Adults", "Youth") |
| `venues[].apiUrl` | string | URL returning the venue feed (see below) |

**Venues** represent different versions of the same lesson tailored for different audiences (age groups, settings, etc.).

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

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Venue identifier |
| `name` | string | Venue name |
| `lessonId` | string | Lesson identifier |
| `lessonName` | string | Lesson display name |
| `lessonImage` | string | Lesson image URL |
| `lessonDescription` | string | Lesson summary |
| `studyName` | string | Parent study name |
| `studySlug` | string | Parent study slug |
| `programName` | string | Parent program name |
| `programSlug` | string | Parent program slug |
| `programAbout` | string | Program description |
| `downloads` | array | Downloadable file bundles |
| `sections` | array | Ordered lesson sections |

#### Section

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Section identifier |
| `name` | string | Section title |
| `sort` | number | Display order |
| `materials` | string | Materials or preparation notes (optional) |
| `actions` | array | Ordered actions within this section |

#### Action

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Action identifier |
| `actionType` | string | One of: `play`, `text`, `question`, `quote`, `subhead` |
| `content` | string | Text content or media label |
| `sort` | number | Display order |
| `role` | string | Role name, e.g. "Leader", "Kids" (optional) |
| `roleId` | string | Role identifier (optional) |
| `files` | array | Media files for `play` actions (optional) |

#### File

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | File identifier |
| `name` | string | File name |
| `url` | string | Direct download URL |
| `streamUrl` | string | Streaming URL, e.g. Vimeo link (optional) |
| `fileType` | string | MIME type (e.g. `video/mp4`, `image/jpeg`) |
| `seconds` | number | Duration in seconds for audio/video (optional) |
| `bytes` | number | File size in bytes (optional) |
| `thumbnail` | string | Thumbnail image URL (optional) |
| `loop` | boolean | Whether media should loop (optional, default false) |

#### Download

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Download bundle name (e.g. "Printable Materials") |
| `files` | array | Files in this download bundle (same fields as File above) |

## Action Types

| Type | Purpose |
|------|---------|
| `play` | Media playback -- video, audio, or slideshow. Must include `files`. |
| `text` | Static text content. Supports markdown-style bold (`**text**`). |
| `question` | Discussion or reflection question for the audience. |
| `quote` | A highlighted quote or Scripture passage. |
| `subhead` | A heading or divider within a section. |

:::tip
To see a working example of the feed in action, you can view the built-in Lessons.church content tree at `https://api.lessons.church/lessons/public/tree` and fetch any venue feed URL from it.
:::
