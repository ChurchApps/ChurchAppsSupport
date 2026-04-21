---
title: "Open Lesson Format"
---

# Open Lesson Format

<div class="article-intro">

The Open Lesson Format is een gestandaardiseerd JSON-schema dat inhoudsaanbieders van derden in staat stelt om onderwijs voor Lessons.church uit te geven. Elke organisatie die een feed in dit formaat host, kan als externe provider worden toegevoegd, waardoor hun inhoud naast de ingebouwde bibliotheek kan worden doorbladerd en afgespeeld.

</div>

## Hoe Het Werkt

Een provider host twee soorten eindpunten:

1. **Provider Tree** -- Een enkele URL die de volledige katalogus van programma's, studies, lessen en plaatsen retourneert. Elke plaats bevat een feed-URL die naar de gedetailleerde lesseninhoud wijst.
2. **Venue Feed** -- Eén URL per plaats, die de volledige lesseninhoud retourneert (secties, acties en mediabestanden).

Wanneer een kerk uw provider-URL in Lessons.church toevoegt, haalt het platform uw boom op om beschikbare inhoud te ontdekken, en haalt vervolgens afzonderlijke venuefeed's op aanvraag op.

## Provider Tree

Uw provider-URL moet een JSON-object met deze structuur retourneren:

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
| `programs[].id` | string | Unieke programma-ID |
| `programs[].name` | string | Weergavenaam |
| `programs[].slug` | string | URL-vriendelijke naam |
| `programs[].image` | string | Programma-afbeelding-URL (optioneel) |
| `programs[].about` | string | Beschrijving (optioneel) |
| `studies[].id` | string | Unieke studie-ID |
| `studies[].name` | string | Weergavenaam |
| `studies[].slug` | string | URL-vriendelijke naam |
| `studies[].image` | string | Studie-afbeelding-URL (optioneel) |
| `lessons[].id` | string | Unieke les-ID |
| `lessons[].name` | string | Weergavenaam |
| `lessons[].slug` | string | URL-vriendelijke naam |
| `lessons[].title` | string | Volledige titel |
| `lessons[].image` | string | Les-afbeelding-URL (optioneel) |
| `lessons[].description` | string | Lesbeschrijving (optioneel) |
| `venues[].id` | string | Unieke plaats-ID |
| `venues[].name` | string | Plaats-naam (bijv. "Kids", "Adults", "Youth") |
| `venues[].apiUrl` | string | URL die de plaats feed retourneert (zie hieronder) |

**Venues** vertegenwoordigen verschillende versies van dezelfde les op maat van verschillende doelgroepen (leeftijdsgroepen, instellingen, enz.).

## Venue Feed

De `apiUrl` van elke plaats moet een JSON-object retourneren dat overeenkomt met dit schema:

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
| `id` | string | Plaats-ID |
| `name` | string | Plaats-naam |
| `lessonId` | string | Les-ID |
| `lessonName` | string | Les-weergavenaam |
| `lessonImage` | string | Les-afbeelding-URL |
| `lessonDescription` | string | Lesbeschrijving |
| `studyName` | string | Bovenliggende studie-naam |
| `studySlug` | string | Bovenliggende studie slug |
| `programName` | string | Bovenliggend programmanaam |
| `programSlug` | string | Bovenliggend programma slug |
| `programAbout` | string | Programma-beschrijving |
| `downloads` | array | Downloadbare bestandsbundels |
| `sections` | array | Geordende lessecties |

#### Section

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Sectie-ID |
| `name` | string | Sectietitel |
| `sort` | number | Weergavevolgorde |
| `materials` | string | Materialen of voorbereiding-aantekeningen (optioneel) |
| `actions` | array | Geordende acties in dit gedeelte |

#### Action

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Actie-ID |
| `actionType` | string | Een van: `play`, `text`, `question`, `quote`, `subhead` |
| `content` | string | Tekstinhoud of medialabel |
| `sort` | number | Weergavevolgorde |
| `role` | string | Rolnaam, bijv. "Leader", "Kids" (optioneel) |
| `roleId` | string | Rol-ID (optioneel) |
| `files` | array | Mediabestanden voor `play`-acties (optioneel) |

#### File

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Bestand-ID |
| `name` | string | Bestandsnaam |
| `url` | string | Directe download-URL |
| `streamUrl` | string | Streaming-URL, bijv. Vimeo link (optioneel) |
| `fileType` | string | MIME-type (bijv. `video/mp4`, `image/jpeg`) |
| `seconds` | number | Duur in seconden voor audio/video (optioneel) |
| `bytes` | number | Bestandsgrootte in bytes (optioneel) |
| `thumbnail` | string | Miniatuurafbeelding-URL (optioneel) |
| `loop` | boolean | Of media moet lussen (optioneel, standaard onwaar) |

#### Download

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Download-bundelnaam (bijv. "Printable Materials") |
| `files` | array | Bestanden in deze download-bundel (dezelfde velden als File hierboven) |

## Action Types

| Type | Purpose |
|------|---------|
| `play` | Media afspelen -- video, audio of diashow. Moet `files` bevatten. |
| `text` | Statische tekstinhoud. Ondersteunt markdown-stijl vet (`**text**`). |
| `question` | Discussie of reflectievraag voor het publiek. |
| `quote` | Een gemarkeerde citaat of Schrifturengedeelte. |
| `subhead` | Een kop of scheidslijn binnen een sectie. |

:::tip
Ga naar `https://api.lessons.church/lessons/public/tree` om een werkend voorbeeld van de feed in actie te zien en haal een willekeurige plaats feed URL ervan op.
:::
