---
title: "Open Lesson Format"
---

# Open Lesson Format

<div class="article-intro">

Das Open Lesson Format ist ein standardisiertes JSON-Schema, das es Drittanbietern von Inhalten ermöglicht, Curricula für Lessons.church zu veröffentlichen. Jede Organisation, die einen Feed in diesem Format hostet, kann als externer Anbieter hinzugefügt werden, wodurch ihre Inhalte neben der integrierten Bibliothek durchsuchbar und abspielbar werden.

</div>

## Funktionsweise

Ein Anbieter hostet zwei Arten von Endpunkten:

1. **Provider Tree (Anbieter-Baum)** -- Eine einzelne URL, die den vollständigen Katalog von Programmen, Studien, Lektionen und Venues zurückgibt. Jede Venue enthält eine Feed-URL, die auf den detaillierten Lektionsinhalt verweist.
2. **Venue Feed** -- Eine URL pro Venue, die den vollständigen Lektionsinhalt zurückgibt (Abschnitte, Aktionen und Mediendateien).

Wenn eine Kirche Ihre Anbieter-URL in Lessons.church hinzufügt, ruft die Plattform Ihren Baum ab, um verfügbare Inhalte zu erkennen, und ruft dann bei Bedarf einzelne Venue-Feeds ab.

## Provider Tree

Ihre Anbieter-URL muss ein JSON-Objekt mit dieser Struktur zurückgeben:

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

### Baum-Felder

| Feld | Typ | Beschreibung |
|-------|------|-------------|
| `programs[].id` | string | Eindeutige Programm-Kennung |
| `programs[].name` | string | Anzeigename |
| `programs[].slug` | string | URL-freundlicher Name |
| `programs[].image` | string | Programm-Bild-URL (optional) |
| `programs[].about` | string | Beschreibung (optional) |
| `studies[].id` | string | Eindeutige Studien-Kennung |
| `studies[].name` | string | Anzeigename |
| `studies[].slug` | string | URL-freundlicher Name |
| `studies[].image` | string | Studien-Bild-URL (optional) |
| `lessons[].id` | string | Eindeutige Lektions-Kennung |
| `lessons[].name` | string | Anzeigename |
| `lessons[].slug` | string | URL-freundlicher Name |
| `lessons[].title` | string | Vollständiger Titel |
| `lessons[].image` | string | Lektions-Bild-URL (optional) |
| `lessons[].description` | string | Lektionszusammenfassung (optional) |
| `venues[].id` | string | Eindeutige Venue-Kennung |
| `venues[].name` | string | Venue-Name (z. B. "Kids", "Adults", "Youth") |
| `venues[].apiUrl` | string | URL, die den Venue-Feed zurückgibt (siehe unten) |

**Venues** repräsentieren verschiedene Versionen derselben Lektion, die auf unterschiedliche Zielgruppen zugeschnitten sind (Altersgruppen, Settings usw.).

## Venue Feed

Die `apiUrl` jeder Venue muss ein JSON-Objekt zurückgeben, das diesem Schema entspricht:

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

### Venue-Feed-Felder

#### Wurzelobjekt

| Feld | Typ | Beschreibung |
|-------|------|-------------|
| `id` | string | Venue-Kennung |
| `name` | string | Venue-Name |
| `lessonId` | string | Lektions-Kennung |
| `lessonName` | string | Lektions-Anzeigename |
| `lessonImage` | string | Lektions-Bild-URL |
| `lessonDescription` | string | Lektionszusammenfassung |
| `studyName` | string | Name der übergeordneten Studie |
| `studySlug` | string | Slug der übergeordneten Studie |
| `programName` | string | Name des übergeordneten Programms |
| `programSlug` | string | Slug des übergeordneten Programms |
| `programAbout` | string | Programmbeschreibung |
| `downloads` | array | Herunterladbare Datei-Bundles |
| `sections` | array | Geordnete Lektionsabschnitte |

#### Abschnitt (Section)

| Feld | Typ | Beschreibung |
|-------|------|-------------|
| `id` | string | Abschnitts-Kennung |
| `name` | string | Abschnittstitel |
| `sort` | number | Anzeigereihenfolge |
| `materials` | string | Materialien oder Vorbereitungshinweise (optional) |
| `actions` | array | Geordnete Aktionen innerhalb dieses Abschnitts |

#### Aktion (Action)

| Feld | Typ | Beschreibung |
|-------|------|-------------|
| `id` | string | Aktions-Kennung |
| `actionType` | string | Eines von: `play`, `text`, `question`, `quote`, `subhead` |
| `content` | string | Textinhalt oder Medien-Label |
| `sort` | number | Anzeigereihenfolge |
| `role` | string | Rollenname, z. B. "Leader", "Kids" (optional) |
| `roleId` | string | Rollen-Kennung (optional) |
| `files` | array | Mediendateien für `play`-Aktionen (optional) |

#### Datei (File)

| Feld | Typ | Beschreibung |
|-------|------|-------------|
| `id` | string | Datei-Kennung |
| `name` | string | Dateiname |
| `url` | string | Direkte Download-URL |
| `streamUrl` | string | Streaming-URL, z. B. Vimeo-Link (optional) |
| `fileType` | string | MIME-Typ (z. B. `video/mp4`, `image/jpeg`) |
| `seconds` | number | Dauer in Sekunden für Audio/Video (optional) |
| `bytes` | number | Dateigröße in Bytes (optional) |
| `thumbnail` | string | Thumbnail-Bild-URL (optional) |
| `loop` | boolean | Ob die Medien in einer Schleife wiedergegeben werden sollen (optional, Standard false) |

#### Download

| Feld | Typ | Beschreibung |
|-------|------|-------------|
| `name` | string | Name des Download-Bundles (z. B. "Printable Materials") |
| `files` | array | Dateien in diesem Download-Bundle (gleiche Felder wie bei File oben) |

## Aktionstypen

| Typ | Zweck |
|------|---------|
| `play` | Medienwiedergabe -- Video, Audio oder Diashow. Muss `files` enthalten. |
| `text` | Statischer Textinhalt. Unterstützt Markdown-artige Fettschrift (`**text**`). |
| `question` | Diskussions- oder Reflexionsfrage für das Publikum. |
| `quote` | Ein hervorgehobenes Zitat oder eine Schriftstelle. |
| `subhead` | Eine Überschrift oder ein Trenner innerhalb eines Abschnitts. |

:::tip
Um ein funktionierendes Beispiel des Feeds in Aktion zu sehen, können Sie den integrierten Lessons.church-Inhaltsbaum unter `https://api.lessons.church/lessons/public/tree` aufrufen und jede beliebige Venue-Feed-URL daraus abrufen.
:::
