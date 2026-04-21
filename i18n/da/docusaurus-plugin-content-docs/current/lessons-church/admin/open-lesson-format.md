---
title: "Open Lesson Format"
---

# Open Lesson Format

<div class="article-intro">

Open Lesson Format er et standardiseret JSON-skema, der tillader tredjepartsindholdsudgivere at udgive undervisningsplan for Lessons.church. Enhver organisation, der hoster et feed i dette format, kan tilføjes som en ekstern udbyder, hvilket gør deres indhold gennemsogeligt og afspilleligt sammen med det indbyggede bibliotek.

</div>

## Hvordan det fungerer

En udbyder hoster to typer endepunkter:

1. **Provider Tree** -- En enkelt URL, der returnerer hele katalog med programmer, studier, lektioner og venues. Hver venue inkluderer en feed-URL, der peger på det detaljerede lektionsindhold.
2. **Venue Feed** -- En URL pr. venue, der returnerer det fulde lektionsindhold (sektioner, handlinger og mediefiler).

Når en kirke tilføjer din udbyder-URL i Lessons.church, henter platformen dit træ for at opdage tilgængeligt indhold, derefter henter individuelle venue-feeds efter behov.

## Provider Tree

Din udbyder-URL skal returnere et JSON-objekt med denne struktur:

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

### Tree-felter

| Felt | Type | Beskrivelse |
|-------|------|-------------|
| `programs[].id` | string | Unik programidentifikator |
| `programs[].name` | string | Visningsmavn |
| `programs[].slug` | string | URL-venligt navn |
| `programs[].image` | string | Program billede-URL (valgfrit) |
| `programs[].about` | string | Beskrivelse (valgfrit) |
| `studies[].id` | string | Unik studieidentifikator |
| `studies[].name` | string | Visningsmavn |
| `studies[].slug` | string | URL-venligt navn |
| `studies[].image` | string | Studie billede-URL (valgfrit) |
| `lessons[].id` | string | Unik lektionsidentifikator |
| `lessons[].name` | string | Visningsmavn |
| `lessons[].slug` | string | URL-venligt navn |
| `lessons[].title` | string | Fuld titel |
| `lessons[].image` | string | Lektions billede-URL (valgfrit) |
| `lessons[].description` | string | Lektionsopsummering (valgfrit) |
| `venues[].id` | string | Unik venue-identifikator |
| `venues[].name` | string | Venue-navn (f.eks. "Kids", "Adults", "Youth") |
| `venues[].apiUrl` | string | URL, der returnerer venue-feedet (se nedenfor) |

**Venues** repræsenterer forskellige versioner af den samme lektion tilpasset forskellige publikum (aldersgrupper, indstillinger osv.).

## Venue Feed

Hver venues `apiUrl` skal returnere et JSON-objekt, der matcher dette skema:

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

### Venue Feed-felter

#### Rodoblekt

| Felt | Type | Beskrivelse |
|-------|------|-------------|
| `id` | string | Venue-identifikator |
| `name` | string | Venue-navn |
| `lessonId` | string | Lektionsidentifikator |
| `lessonName` | string | Lektionens visningsmavn |
| `lessonImage` | string | Lektions billede-URL |
| `lessonDescription` | string | Lektionsopsummering |
| `studyName` | string | Overordnet studienavn |
| `studySlug` | string | Overordnet studie slug |
| `programName` | string | Overordnet programnavn |
| `programSlug` | string | Overordnet program slug |
| `programAbout` | string | Programbeskrivelse |
| `downloads` | array | Downloadbare filbundter |
| `sections` | array | Ordnede lektionssektioner |

#### Sektion

| Felt | Type | Beskrivelse |
|-------|------|-------------|
| `id` | string | Sektions-identifikator |
| `name` | string | Sektions-titel |
| `sort` | number | Visningsrækkefølge |
| `materials` | string | Materialer eller forberedelsesnoter (valgfrit) |
| `actions` | array | Ordnede handlinger inden for denne sektion |

#### Handling

| Felt | Type | Beskrivelse |
|-------|------|-------------|
| `id` | string | Handling-identifikator |
| `actionType` | string | En af: `play`, `text`, `question`, `quote`, `subhead` |
| `content` | string | Tekstindhold eller medieudtalelse |
| `sort` | number | Visningsrækkefølge |
| `role` | string | Rollenavn, f.eks. "Leader", "Kids" (valgfrit) |
| `roleId` | string | Rolle-identifikator (valgfrit) |
| `files` | array | Mediefiler til `play`-handlinger (valgfrit) |

#### Fil

| Felt | Type | Beskrivelse |
|-------|------|-------------|
| `id` | string | Fil-identifikator |
| `name` | string | Filnavn |
| `url` | string | Direkte download-URL |
| `streamUrl` | string | Streaming URL, f.eks. Vimeo-link (valgfrit) |
| `fileType` | string | MIME-type (f.eks. `video/mp4`, `image/jpeg`) |
| `seconds` | number | Varighed i sekunder til lyd/video (valgfrit) |
| `bytes` | number | Filstørrelse i bytes (valgfrit) |
| `thumbnail` | string | Thumbnail billede-URL (valgfrit) |
| `loop` | boolean | Om medier skal loops (valgfrit, standard falsk) |

#### Download

| Felt | Type | Beskrivelse |
|-------|------|-------------|
| `name` | string | Download bundtnavn (f.eks. "Printable Materials") |
| `files` | array | Filer i dette downloadbundt (samme felter som Fil ovenfor) |

## Handlingstyper

| Type | Formål |
|------|---------|
| `play` | Mediaafspilning -- video, lyd eller slideshow. Skal inkludere `files`. |
| `text` | Statisk tekstindhold. Understøtter markdown-style fed (`**text**`). |
| `question` | Diskussion eller reflektionsspørgsmål til publikum. |
| `quote` | Et fremhævet citat eller skrift passage. |
| `subhead` | En overskrift eller skillelinie inden for en sektion. |

:::tip
For at se et arbejdende eksempel på feedet i handling, kan du se det indbyggede Lessons.church-indholdstræ på `https://api.lessons.church/lessons/public/tree` og hente enhver venue feed-URL derfra.
:::
