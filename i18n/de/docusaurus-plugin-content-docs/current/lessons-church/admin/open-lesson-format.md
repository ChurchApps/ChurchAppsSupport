---
title: "Open Lesson Format"
---

# Open Lesson Format

<div class="article-intro">

Das Open Lesson Format ist ein standardisiertes JSON-Schema, das es Drittanbieter-Content-Anbietern ermöglicht, Lehrplan für Lessons.church zu veröffentlichen. Jede Organisation, die einen Feed in diesem Format hostet, kann als externer Anbieter hinzugefügt werden, wobei ihr Inhalt zusammen mit der eingebauten Bibliothek durchsucht und wiedergegeben werden kann.

</div>

## How It Works

Ein Anbieter hostet zwei Arten von Endpunkten:

1. **Provider Tree** -- Eine einzelne URL, die den vollständigen Katalog von Programmen, Studien, Lektionen und Veranstaltungsorten zurückgibt
2. **Venue Feed** -- Eine URL pro Veranstaltungsort, die den vollständigen Lektionsinhalt zurückgibt

## Provider Tree

Ihre Provider-URL muss ein JSON-Objekt mit dieser Struktur zurückgeben:

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

## Venue Feed

Jede Veranstaltungs-URL muss ein JSON-Objekt mit diesem Schema zurückgeben.

## Action Types

| Type | Purpose |
|------|---------|
| `play` | Media playback |
| `text` | Static `text` `content` |
| `question` | Discussion `question` |
| `quote` | Highlighted `quote` |
| `subhead` | Heading or divider |

:::tip
Um ein funktionierendes Beispiel des Feeds in Aktion zu sehen, können Sie den eingebauten Lessons.church-Inhaltsbaum unter `https://api.lessons.church/lessons/public/tree` ansehen.
:::
