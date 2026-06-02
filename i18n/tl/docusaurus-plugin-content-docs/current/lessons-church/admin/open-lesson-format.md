---
title: "Open Lesson Format"
---

# Open Lesson Format

<div class="article-intro">

Ang Open Lesson Format ay isang standardized JSON schema na nagbibigay-daan sa third-party content providers na mag-publish ng curriculum para sa Lessons.church. Anumang organisasyon na nag-host ng feed sa format na ito ay maaaring idagdag bilang isang external provider.

</div>

## Paano Ito Gumagana

Ang isang provider ay nag-host ng dalawang uri ng endpoints:

1. **Provider Tree** -- Isang solong URL na nagbabalik ng buong catalog ng programs, studies, lessons, at venues. Bawat venue ay may kasamang feed URL na tumuturo sa detailed lesson content.
2. **Venue Feed** -- Isang URL bawat venue, na nagbabalik ng buong lesson content.

Kapag ang isang simbahan ay nagdagdag ng iyong provider URL sa Lessons.church, ang platform ay hihingi ng iyong tree upang tuklasin ang available content, pagkatapos ay hihingi ng individual venue feeds on demand.

## Provider Tree

Ang iyong provider URL ay dapat magbalik ng JSON object na may ganitong structure:

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

| Field | Type | Paglalarawan |
|-------|------|-------------|
| `programs[].id` | string | Natatanging program identifier |
| `programs[].name` | string | Display name |
| `programs[].slug` | string | URL-friendly name |
| `programs[].image` | string | Program image URL (optional) |
| `programs[].about` | string | Paglalarawan (optional) |
| `studies[].id` | string | Natatanging study identifier |
| `studies[].name` | string | Display name |
| `studies[].slug` | string | URL-friendly name |
| `studies[].image` | string | Study image URL (optional) |
| `lessons[].id` | string | Natatanging lesson identifier |
| `lessons[].name` | string | Display name |
| `lessons[].slug` | string | URL-friendly name |
| `lessons[].title` | string | Full title |
| `lessons[].image` | string | Lesson image URL (optional) |
| `lessons[].description` | string | Lesson summary (optional) |
| `venues[].id` | string | Natatanging venue identifier |
| `venues[].name` | string | Venue name (e.g. "Kids", "Adults", "Youth") |
| `venues[].apiUrl` | string | URL returning the venue feed |

## Venue Feed

Bawat venue's `apiUrl` ay dapat magbalik ng JSON object na tumutugma sa schema na ito.

### Root Object

| Field | Type | Paglalarawan |
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

### Section

| Field | Type | Paglalarawan |
|-------|------|-------------|
| `id` | string | Section identifier |
| `name` | string | Section title |
| `sort` | number | Display order |
| `materials` | string | Materials or preparation notes (optional) |
| `actions` | array | Ordered actions within this section |

### Action

| Field | Type | Paglalarawan |
|-------|------|-------------|
| `id` | string | Action identifier |
| `actionType` | string | One of: `play`, `text`, `question`, `quote`, `subhead` |
| `content` | string | Text content or media label |
| `sort` | number | Display order |
| `role` | string | Role name, e.g. "Leader", "Kids" (optional) |
| `roleId` | string | Role identifier (optional) |
| `files` | array | Media files para sa `play` actions (optional) |

### File

| Field | Type | Paglalarawan |
|-------|------|-------------|
| `id` | string | File identifier |
| `name` | string | File name |
| `url` | string | Direct download URL |
| `streamUrl` | string | Streaming URL, e.g. Vimeo link (optional) |
| `fileType` | string | MIME type |
| `seconds` | number | Duration in seconds (optional) |
| `bytes` | number | File size in bytes (optional) |
| `thumbnail` | string | Thumbnail image URL (optional) |
| `loop` | boolean | Whether media should loop (optional) |

## Action Types

| Type | Layunin |
|------|---------|
| `play` | Media playback -- video, audio, or slideshow. Must include `files`. |
| `text` | Static text content. Supports markdown-style bold (`**text**`). |
| `question` | Discussion or reflection question. |
| `quote` | Isang highlighted quote o Scripture passage. |
| `subhead` | Isang heading o divider within a section. |

:::tip
Upang makita ang isang gumagana na halimbawa, bisitahin ang https://api.lessons.church/lessons/public/tree at kunin ang kahit anong venue feed URL mula dito.
:::
