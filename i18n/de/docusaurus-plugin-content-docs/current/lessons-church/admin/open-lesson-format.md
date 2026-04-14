---
title: "Offenes Lektionen-Format"
---

# Offenes Lektionen-Format

<div class="article-intro">

Das Offene Lektionen-Format ist ein standardisiertes JSON-Schema, das es Drittanbieter-Inhaltsanbietern ermöglicht, Lehrplan für Lessons.church zu veröffentlichen. Jede Organisation, die einen Feed in diesem Format hostet, kann als externer Anbieter hinzugefügt werden, was ihren Inhalt durchsuchbar und neben der integrierten Bibliothek abrufbar macht.

</div>

## Wie es funktioniert

Ein Anbieter hostet zwei Arten von Endpunkten:

1. **Anbieter-Baum** -- Eine einzelne URL, die den vollständigen Katalog von Programmen, Studien, Lektionen und Venues zurückgibt. Jedes Venue umfasst eine Feed-URL, die auf den detaillierten Lektionsinhalt verweist.
2. **Venue-Feed** -- Eine URL pro Venue, die den vollständigen Lektionsinhalt zurückgibt (Abschnitte, Aktionen und Mediendateien).

Wenn eine Kirche Ihre Anbieter-URL in Lessons.church hinzufügt, ruft die Plattform Ihren Baum ab, um verfügbare Inhalte zu entdecken, dann ruft sie einzelne Venue-Feeds bei Bedarf ab.

## Anbieter-Baum

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

## Baum-Felder

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| `programs[].id` | string | Eindeutige Programm-ID |
| `programs[].name` | string | Anzeigenam |
| `programs[].slug` | string | URL-freundlicher Name |
| `programs[].image` | string | Programm-Bild-URL (optional) |
| `programs[].about` | string | Beschreibung (optional) |
| `studies[].id` | string | Eindeutige Studien-ID |
| `studies[].name` | string | Anzeigenam |
| `studies[].slug` | string | URL-freundlicher Name |
| `studies[].image` | string | Studien-Bild-URL (optional) |
| `lessons[].id` | string | Eindeutige Lektions-ID |
| `lessons[].name` | string | Anzeigenam |
| `lessons[].slug` | string | URL-freundlicher Name |
| `lessons[].title` | string | Vollständiger Titel |
| `lessons[].image` | string | Lektions-Bild-URL (optional) |
| `lessons[].description` | string | Lektionszusammenfassung (optional) |
| `venues[].id` | string | Eindeutige Venue-ID |
| `venues[].name` | string | Venue-Name (z.B. "Kids", "Adults", "Youth") |
| `venues[].apiUrl` | string | URL, die den Venue-Feed zurückgibt (siehe unten) |

**Venues** stellen verschiedene Versionen der gleichen Lektion dar, angepasst für verschiedene Zielgruppen (Altersgruppen, Einstellungen, usw.).

## Venue-Feed

Jeder `apiUrl` des Venues muss ein JSON-Objekt zurückgeben, das diesem Schema entspricht:

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
        }
      ]
    }
  ]
}
```

## Aktionstypen

| Typ | Zweck |
|-----|-------|
| `play` | Medien-Wiedergabe -- Video, Audio oder Diaschau. Muss `files` enthalten. |
| `text` | Statischer Textinhalt. Unterstützt Markdown-ähnlich fett (`**text**`). |
| `question` | Diskussions- oder Reflexionsfrage für das Publikum. |
| `quote` | Ein hervorgehobenes Zitat oder Schriftstelle. |
| `subhead` | Eine Überschrift oder ein Teiler in einem Abschnitt. |

:::tip
Um ein funktionierendes Beispiel des Feeds in Aktion zu sehen, können Sie den eingebauten Lessons.church-Inhaltsbaum unter `https://api.lessons.church/lessons/public/tree` anzeigen und die Venue-Feed-URL daraus abrufen.
:::

