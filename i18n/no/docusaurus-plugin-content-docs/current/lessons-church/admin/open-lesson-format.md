---
title: "Åpent leksjonformat"
---

# Åpent leksjonformat

<div class="article-intro">

Åpent leksjonformat er et standardisert JSON-skjema som lar tredjepartsinnholds-leverandører publisere pensum for Lessons.church. Enhver organisasjon som er vert for en feed i dette formatet kan legges til som en ekstern leverandør, noe som gjør innholdet deres bla og spilt sammen med det innebygde biblioteket.

</div>

## Hvordan det fungerer

En leverandør er vert for to typer sluttpunkter:

1. **Provider-tre** -- En enkelt URL som returnerer komplett katalog av programmer, studier, leksjoner og venues. Hvert venue inkluderer feed-URL som peker til detaljert leksjons-innhold.
2. **Venue-feed** -- En URL per venue, som returnerer komplett leksjons-innhold.

Når en kirke legger til leverandør-URL i Lessons.church, henter plattformen ditt tre for å finne tilgjengelig innhold, deretter henter individuelle venue-feeds etter behov.

## Provider-tre

Din leverandør-URL må returnere JSON-objekt med denne strukturen. Det inkluderer programmer, som inkluderer studier, som inkluderer leksjoner, som inkluderer venues.

### Tre-felt

| Felt | Type | Beskrivelse |
|---|---|---|
| `programs[].id` | streng | Unik program-identifikator |
| `programs[].name` | streng | Visnings-navn |
| `programs[].slug` | streng | URL-venlig navn |
| `programs[].image` | streng | Program-bilde URL (valgfritt) |
| `programs[].about` | streng | Beskrivelse (valgfritt) |
| `studies[].id` | streng | Unik studie-identifikator |
| `studies[].name` | streng | Visnings-navn |
| `studies[].slug` | streng | URL-venlig navn |
| `lessons[].id` | streng | Unik leksjons-identifikator |
| `lessons[].name` | streng | Visnings-navn |
| `lessons[].slug` | streng | URL-venlig navn |
| `lessons[].title` | streng | Full tittel |
| `lessons[].image` | streng | Leksjons-bilde URL (valgfritt) |
| `lessons[].description` | streng | Leksjons-sammendrag (valgfritt) |
| `venues[].id` | streng | Unik venue-identifikator |
| `venues[].name` | streng | Venue-navn (f.eks. "Barn", "Voksne") |
| `venues[].apiUrl` | streng | URL som returnerer venue-feed |

## Venue-feed

Hver venue sin `apiUrl` må returnere JSON-objekt som samsvarer med dette skjemaet:

Roten-objektet inneholder leksjons-detaljer, studier-info, program-info, downloads og seksjoner.

### Seksjon

| Felt | Type | Beskrivelse |
|---|---|---|
| `id` | streng | Seksjon-identifikator |
| `name` | streng | Seksjons-tittel |
| `sort` | nummer | Visnings-rekkefølge |
| `materials` | streng | Materialer eller prep-notater (valgfritt) |
| `actions` | matrise | Ordnete handlinger innen denne seksjonen |

### Handling

| Felt | Type | Beskrivelse |
|---|---|---|
| `id` | streng | Handlings-identifikator |
| `actionType` | streng | En av: `play`, `text`, `question`, `quote`, `subhead` |
| `content` | streng | Tekst-innhold eller media-merke |
| `sort` | nummer | Visnings-rekkefølge |
| `role` | streng | Rolle-navn, f.eks. "Leder" (valgfritt) |
| `files` | matrise | Media-filer for `play`-handlinger (valgfritt) |

### Fil

| Felt | Type | Beskrivelse |
|---|---|---|
| `id` | streng | Fil-identifikator |
| `name` | streng | Filnavn |
| `url` | streng | Direkte last-ned-URL |
| `streamUrl` | streng | Stream-URL, f.eks. Vimeo-lenke (valgfritt) |
| `fileType` | streng | MIME-type |
| `seconds` | nummer | Varighet i sekunder for lyd/video (valgfritt) |
| `bytes` | nummer | Filstørrelse i bytes (valgfritt) |
| `thumbnail` | streng | Thumbnail-bilde URL (valgfritt) |
| `loop` | boolsk | Hvorvidt media skal løkke (valgfritt) |

## Handling-typer

| Type | Formål |
|---|---|
| `play` | Media-avspilling -- video, lyd eller bildeshow |
| `text` | Statisk tekst-innhold |
| `question` | Diskusjons- eller refleksjons-spørsmål |
| `quote` | Et fremhevet sitat eller Bibel-passasje |
| `subhead` | En heading eller skilletegn innen en seksjon |

:::tip
For å se et arbeidende eksempel på feeden i aksjon, kan du vise det innebygde Lessons.church-innholdt-treet på `https://api.lessons.church/lessons/public/tree`.
:::

