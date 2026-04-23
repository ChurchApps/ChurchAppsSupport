---
title: "Open Lesson Format"
---

# Open Lesson Format

<div class="article-intro">

Ang Open Lesson Format ay isang standardized JSON schema na nagpapahintulot sa third-party content providers na maglathala ng kurso para sa Lessons.church. Anumang organisasyon na nag-host ng feed sa format na ito ay maaaring idagdag bilang isang external provider, na ginagawang browsable at playable ang kanilang nilalaman sa tabi ng ang built-in library.

</div>

## Paano Gumagana Ito

Isang provider ay nag-host ng dalawang uri ng endpoints:

1. **Provider Tree** -- Isang solong URL na nagbabalik sa buong katalogo ng mga programa, pag-aaral, mga aralin, at mga lugar. Bawat lugar ay may kasamang feed URL na tumuturo sa detalyadong nilalaman ng aralin.
2. **Venue Feed** -- Isang URL sa bawat lugar, nagbabalik sa buong nilalaman ng aralin (mga seksyon, mga aksyon, at mga media na file).

Kapag ang isang simbahan ay nagdagdag ng iyong provider URL sa Lessons.church, ang platform ay nag-fetch ng iyong tree upang matuklasan ang available na nilalaman, pagkatapos ay nag-fetch ng mga indibidwal na venue feed on demand.

## Provider Tree

Ang iyong provider URL ay dapat magbalik ng isang JSON object na may ganitong istraktura:

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

### Mga Puwang ng Tree

| Field | Type | Description |
|-------|------|-------------|
| `programs[].id` | string | Natatanging identifier ng programa |
| `programs[].name` | string | Display name |
| `programs[].slug` | string | URL-friendly name |
| `programs[].image` | string | URL ng imahe ng programa (opsyonal) |
| `programs[].about` | string | Paglalarawan (opsyonal) |
| `studies[].id` | string | Natatanging identifier ng pag-aaral |
| `studies[].name` | string | Display name |
| `studies[].slug` | string | URL-friendly name |
| `studies[].image` | string | URL ng imahe ng pag-aaral (opsyonal) |
| `lessons[].id` | string | Natatanging identifier ng aralin |
| `lessons[].name` | string | Display name |
| `lessons[].slug` | string | URL-friendly name |
| `lessons[].title` | string | Buong titulo |
| `lessons[].image` | string | URL ng imahe ng aralin (opsyonal) |
| `lessons[].description` | string | Buod ng aralin (opsyonal) |
| `venues[].id` | string | Natatanging identifier ng lugar |
| `venues[].name` | string | Pangalan ng lugar (hal. "Kids", "Adults", "Youth") |
| `venues[].apiUrl` | string | URL na nagbabalik ng venue feed (tingnan sa ibaba) |

**Ang mga lugar** ay kumakatawan sa iba't ibang bersyon ng parehong aralin na idinisenyo para sa iba't ibang audience (mga edad, setting, atb.).

## Venue Feed

Bawat `apiUrl` ng lugar ay dapat magbalik ng isang JSON object na tumutugma sa schema na ito:

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

### Mga Puwang ng Venue Feed

#### Root Object

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Identifier ng lugar |
| `name` | string | Pangalan ng lugar |
| `lessonId` | string | Identifier ng aralin |
| `lessonName` | string | Display name ng aralin |
| `lessonImage` | string | URL ng imahe ng aralin |
| `lessonDescription` | string | Buod ng aralin |
| `studyName` | string | Pangalan ng parent study |
| `studySlug` | string | Slug ng parent study |
| `programName` | string | Pangalan ng parent program |
| `programSlug` | string | Slug ng parent program |
| `programAbout` | string | Paglalarawan ng programa |
| `downloads` | array | Mga downloadable na bundles ng file |
| `sections` | array | Mga ordered na seksyon ng aralin |

#### Seksyon

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Identifier ng seksyon |
| `name` | string | Pamagat ng seksyon |
| `sort` | number | Display order |
| `materials` | string | Mga materyales o mga nota sa paghahanda (opsyonal) |
| `actions` | array | Mga ordered na aksyon sa loob ng seksyong ito |

#### Aksyon

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Identifier ng aksyon |
| `actionType` | string | Isa sa: `play`, `text`, `question`, `quote`, `subhead` |
| `content` | string | Nilalaman ng teksto o label ng media |
| `sort` | number | Display order |
| `role` | string | Pangalan ng tungkulin, hal. "Leader", "Kids" (opsyonal) |
| `roleId` | string | Identifier ng tungkulin (opsyonal) |
| `files` | array | Mga media file para sa `play` na mga aksyon (opsyonal) |

#### Puwang

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Identifier ng file |
| `name` | string | Pangalan ng file |
| `url` | string | direktang URL ng pag-download |
| `streamUrl` | string | Streaming URL, hal. Vimeo link (opsyonal) |
| `fileType` | string | MIME type (hal. `video/mp4`, `image/jpeg`) |
| `seconds` | number | Tagal sa segundo para sa audio/video (opsyonal) |
| `bytes` | number | Laki ng file sa bytes (opsyonal) |
| `thumbnail` | string | URL ng thumbnail na imahe (opsyonal) |
| `loop` | boolean | Kung ang media ay dapat mag-loop (opsyonal, default false) |

#### Pag-download

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Pangalan ng bundle ng pag-download (hal. "Printable Materials") |
| `files` | array | Mga file sa bundle ng pag-download na ito (parehong mga puwang bilang File sa itaas) |

## Mga Uri ng Aksyon

| Type | Purpose |
|------|---------|
| `play` | Playback ng media -- video, audio, o slideshow. Dapat kasama ang `files`. |
| `text` | Static text content. Sinusuportahan ang markdown-style bold (`**text**`). |
| `question` | Tanong sa pagpapahayag o pagmumuni-muni para sa audience. |
| `quote` | Isang highlight na quote o Scripture passage. |
| `subhead` | Isang heading o divider sa loob ng isang seksyon. |

:::tip
Upang makita ang isang gumagana na halimbawa ng feed sa aksyon, maaari mong tingnan ang built-in na nilalaman ng puno ng Lessons.church sa `https://api.lessons.church/lessons/public/tree` at mag-fetch ng anumang venue feed URL mula dito.
:::
