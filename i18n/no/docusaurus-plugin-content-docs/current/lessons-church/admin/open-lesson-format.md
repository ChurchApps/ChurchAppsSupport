---
title: "Åpen leksjon format"
---

# Åpen leksjon format

<div class="article-intro">

Åpen leksjon format er et standardisert JSON-skjema som tillater tredjepartinnholdsleverandører å publisere læreplan for Lessons.church. Enhver organisasjon som er vert for en feed i dette formatet kan legges til som en ekstern leverandør, noe som gjør innholdet deres bla og avspillbar sammen med det innebygde biblioteket.

</div>

## Hvordan det fungerer

En leverandør er vert for to typer endepunkter:

1. **Provider Tree** -- En enkelt URL som returnerer den fullstendige katalogen av programmer, studier, leksjoner og steder. Hvert sted inkluderer en feed-URL som peker til detaljert leksjonsinnhold.
2. **Venue Feed** -- En URL per sted, som returnerer fullstendig leksjonsinnhold (seksjoner, handlinger og mediefiler).

Når en kirke legger til provider-URL-adressen i Lessons.church, henter plattformen treet for å oppdage tilgjengelig innhold, og henter deretter individuelle venue feeds på forespørsel.

## Provider tree

Provider-URL-adressen din må returnere et JSON-objekt med denne strukturen:

```json
{
  "programs": [
    {
      "id": "program-1",
      "name": "Gospel of Mark",
      "slug": "gospel-of-mark",
      "image": "https://example.com/images/mark.jpg",
      "about": "En 12-ukers studie gjennom evangeliet Markus.",
      "studies": [
        {
          "id": "study-1",
          "name": "Begynnelsen",
          "slug": "the-beginning",
          "image": "https://example.com/images/study1.jpg",
          "lessons": [
            {
              "id": "lesson-1",
              "name": "Jesu dåp",
              "slug": "baptism-of-jesus",
              "title": "Jesu dåp",
              "image": "https://example.com/images/lesson1.jpg",
              "description": "En introduksjon til Jesu misjons.",
              "venues": [
                {
                  "id": "venue-1",
                  "name": "Barn",
                  "apiUrl": "https://example.com/feed/venues/venue-1"
                },
                {
                  "id": "venue-2",
                  "name": "Voksne",
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

### Tre felt

| Felt | Type | Beskrivelse |
|-------|------|-------------|
| `programs[].id` | string | Unikt programidentifikator |
| `programs[].name` | string | Visningsnavn |
| `programs[].slug` | string | URL-vennlig navn |
| `programs[].image` | string | Program bildURL (valgfritt) |
| `programs[].about` | string | Beskrivelse (valgfritt) |
| `studies[].id` | string | Unikt studieidentifikator |
| `studies[].name` | string | Visningsnavn |
| `studies[].slug` | string | URL-vennlig navn |
| `studies[].image` | string | Studie bildURL (valgfritt) |
| `lessons[].id` | string | Unikt leksjonsidentifikator |
| `lessons[].name` | string | Visningsnavn |
| `lessons[].slug` | string | URL-vennlig navn |
| `lessons[].title` | string | Full tittel |
| `lessons[].image` | string | Leksjon bildURL (valgfritt) |
| `lessons[].description` | string | Leksjonsammendrag (valgfritt) |
| `venues[].id` | string | Unikt stedsidentifikator |
| `venues[].name` | string | Stedsnavn (f.eks. "Barn", "Voksne", "Ungdom") |
| `venues[].apiUrl` | string | URL returnerer venue-feed-en (se nedenfor) |

**Steder** representerer ulike versjoner av samme leksjon skreddersydd for ulike publikum (aldersgrupper, innstillinger osv.).

## Venue feed

Hver venues `apiUrl` må returnere et JSON-objekt som samsvarer med dette skjemaet:

```json
{
  "title": "Jesu dåp",
  "sections": []
}
```

Se API-dokumentasjonen for fullstendige detaljer om format og feltbeskrivelser.
