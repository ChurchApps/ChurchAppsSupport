---
title: "Open Lesson Format"
---

# Open Lesson Format

<div class="article-intro">

Open Lesson Format er et standardisert JSON-skjema som tillater tredjeparts innholdsleverandører å publisere lærebok for Lessons.church. Enhver organisasjon som er vert for en feed i dette formatet kan legges til som en ekstern leverandør, noe som gjør innholdet deres gjennomlovlig og avspillingsbart sammen med det innebygde biblioteket.

</div>

## Hvordan det fungerer

En leverandør er vert for to typer endepunkter:

1. **Provider Tree** -- En enkelt URL som returnerer hele katalogen over programmer, studier, leksjoner og venues. Hver venue inkluderer en feed-URL som peker til det detaljerte leksjonsinnholdet.
2. **Venue Feed** -- En URL per venue, returnerer hele leksjonsinnholdet (seksjoner, handlinger og mediefiler).

Når en kirke legger til leverandørens URL i Lessons.church, henter plattformen treet ditt for å oppdage tilgjengelig innhold, deretter henter individuell venue-feed på etterspørsel.

## Provider Tree

Leverandørens URL må returnere en JSON-objekt med denne strukturen:

```json
{
  "programs": [
    {
      "id": "program-1",
      "name": "Gospel of Mark",
      "slug": "gospel-of-mark",
      "about": "A 12-week study through the Gospel of Mark.",
      "studies": [
        {
          "id": "study-1",
          "name": "The Beginning",
          "slug": "the-beginning",
          "lessons": [
            {
              "id": "lesson-1",
              "name": "The Baptism of Jesus",
              "slug": "baptism-of-jesus",
              "bottomLine": "God keeps His promises.",
              "verse": "Genesis 9:13",
              "parentQuestion": "What is one promise God has kept?",
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

Hver venues `apiUrl` må returnere en JSON-objekt som samsvarer med dette skjemaet:

```json
{
  "id": "venue-1",
  "name": "Kids",
  "lessonId": "lesson-1",
  "lessonName": "The Baptism of Jesus",
  "bottomLine": "God keeps His promises.",
  "sections": [
    {
      "id": "section-1",
      "name": "Opening Discussion",
      "sort": 1,
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

## Handlingstyper

| Type | Formål |
|------|--------|
| `play` | Medieavspilling -- video, lyd eller lysbildeshow |
| `text` | Statisk tekstinnhold |
| `question` | Diskusjons- eller refleksjonsspørsmål |
| `quote` | Høydepunkt sitat eller Skriftstedspassasje |
| `subhead` | Overskrift eller skillelinje innenfor en seksjons |

:::tip
For å se et arbeidende eksempel på feed, kan du vise det innebygde Lessons.church-innholdstreet på `https://api.lessons.church/lessons/public/tree`.
:::

