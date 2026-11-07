---
title: "Öppet lektionsformat"
---

# Öppet lektionsformat

<div class="article-intro">

Det öppna lektionsformatet är ett standardiserat JSON-schema som gör det möjligt för externa innehållsleverantörer att publicera läroplaner för Lessons.church. Alla organisationer som tillhandahåller ett flöde i detta format kan läggas till som externa leverantörer, vilket gör deras innehåll bläddringsbart och spelbart tillsammans med det inbyggda biblioteket.

</div>

## Så fungerar det

En leverantör tillhandahåller två typer av slutpunkter:

1. **Providerträd** – En enda URL som returnerar hela katalogen med program, studier, lektioner och platser. Varje plats innehåller en flödes-URL som pekar på det detaljerade lektionsinnehållet.
2. **Platsflöde** – En URL per plats, som returnerar hela lektionsinnehållet (avsnitt, åtgärder och mediefiler).

När en kyrka lägger till din providers URL i Lessons.church hämtar plattformen ditt träd för att upptäcka tillgängligt innehåll och hämtar sedan enskilda platsflöden vid behov.

## Providerträd

Din provider-URL måste returnera ett JSON-objekt med denna struktur:

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
              "bottomLine": "God keeps His promises.",
              "verse": "Genesis 9:13 — I have set my rainbow in the clouds…",
              "parentQuestion": "What is one promise God has kept in our family?",
              "parentNote": "Pray together thanking God for keeping His promises.",
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

### Trädfält

| Fält | Typ | Beskrivning |
|-------|------|-------------|
| `programs[].id` | string | Unik programidentifierare |
| `programs[].name` | string | Visningsnamn |
| `programs[].slug` | string | URL-vänligt namn |
| `programs[].image` | string | Programmets bild-URL (valfri) |
| `programs[].about` | string | Beskrivning (valfri) |
| `studies[].id` | string | Unik studieidentifierare |
| `studies[].name` | string | Visningsnamn |
| `studies[].slug` | string | URL-vänligt namn |
| `studies[].image` | string | Studiens bild-URL (valfri) |
| `lessons[].id` | string | Unik lektionsidentifierare |
| `lessons[].name` | string | Visningsnamn |
| `lessons[].slug` | string | URL-vänligt namn |
| `lessons[].title` | string | Fullständig titel |
| `lessons[].image` | string | Lektionens bild-URL (valfri) |
| `lessons[].description` | string | Lektionssammanfattning (valfri). Katalogtext för lärare som bläddrar i biblioteket – inte hemtagning för föräldrar. |
| `lessons[].bottomLine` | string | En mening som föräldrar tar med sig hem (valfri) |
| `lessons[].verse` | string | Referens till minnesvers och kort text (valfri) |
| `lessons[].parentQuestion` | string | En fråga för föräldrar att ställa hemma (valfri) |
| `lessons[].parentNote` | string | Valfri extra anteckning till föräldrar (markdown) |
| `venues[].id` | string | Unik platsidentifierare |
| `venues[].name` | string | Platsnamn (t.ex. "Barn", "Vuxna", "Ungdom") |
| `venues[].apiUrl` | string | URL som returnerar platsflödet (se nedan) |

De fyra fälten för hemtagning till föräldrar (`bottomLine`, `verse`, `parentQuestion`, `parentNote`) är valfria både i trädet och i platsflödet. Om de utelämnas behandlas de som tomma. Kopiera inte `description` till dem.

**Platser** representerar olika versioner av samma lektion, anpassade för olika målgrupper (åldersgrupper, miljöer med mera).

## Platsflöde

Varje platss `apiUrl` måste returnera ett JSON-objekt som matchar detta schema:

```json
{
  "id": "venue-1",
  "name": "Kids",
  "lessonId": "lesson-1",
  "lessonName": "The Baptism of Jesus",
  "lessonImage": "https://example.com/images/lesson1.jpg",
  "lessonDescription": "An introduction to Jesus' ministry.",
  "bottomLine": "God keeps His promises.",
  "verse": "Genesis 9:13 — I have set my rainbow in the clouds…",
  "parentQuestion": "What is one promise God has kept in our family?",
  "parentNote": "Pray together thanking God for keeping His promises.",
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

### Platsflödets fält

#### Rotobjekt

| Fält | Typ | Beskrivning |
|-------|------|-------------|
| `id` | string | Platsidentifierare |
| `name` | string | Platsnamn |
| `lessonId` | string | Lektionsidentifierare |
| `lessonName` | string | Lektionens visningsnamn |
| `lessonImage` | string | Lektionens bild-URL |
| `lessonDescription` | string | Lektionssammanfattning (katalogtext) |
| `bottomLine` | string | En mening som föräldrar tar med sig hem (valfri) |
| `verse` | string | Referens till minnesvers och kort text (valfri) |
| `parentQuestion` | string | En fråga för föräldrar att ställa hemma (valfri) |
| `parentNote` | string | Valfri extra anteckning till föräldrar, markdown (valfri) |
| `studyName` | string | Namn på överordnad studie |
| `studySlug` | string | URL-vänligt namn för överordnad studie |
| `programName` | string | Namn på överordnat program |
| `programSlug` | string | URL-vänligt namn för överordnat program |
| `programAbout` | string | Programbeskrivning |
| `downloads` | array | Paket med nedladdningsbara filer |
| `sections` | array | Ordnade lektionsavsnitt |

#### Avsnitt

| Fält | Typ | Beskrivning |
|-------|------|-------------|
| `id` | string | Avsnittsidentifierare |
| `name` | string | Avsnittsrubrik |
| `sort` | number | Visningsordning |
| `materials` | string | Material eller förberedelseanteckningar (valfri) |
| `actions` | array | Ordnade åtgärder inom detta avsnitt |

#### Åtgärd

| Fält | Typ | Beskrivning |
|-------|------|-------------|
| `id` | string | Åtgärdsidentifierare |
| `actionType` | string | Ett av: `play`, `text`, `question`, `quote`, `subhead` |
| `content` | string | Textinnehåll eller medieetikett |
| `sort` | number | Visningsordning |
| `role` | string | Rollnamn, t.ex. "Ledare", "Barn" (valfri) |
| `roleId` | string | Rollidentifierare (valfri) |
| `files` | array | Mediefiler för `play`-åtgärder (valfri) |

#### Fil

| Fält | Typ | Beskrivning |
|-------|------|-------------|
| `id` | string | Filidentifierare |
| `name` | string | Filnamn |
| `url` | string | Direkt nedladdnings-URL |
| `streamUrl` | string | Strömningsadress, t.ex. en Vimeo-länk (valfri) |
| `fileType` | string | MIME-typ (t.ex. `video/mp4`, `image/jpeg`) |
| `seconds` | number | Längd i sekunder för ljud och video (valfri) |
| `bytes` | number | Filstorlek i byte (valfri) |
| `thumbnail` | string | URL till miniatyrbild (valfri) |
| `loop` | boolean | Om mediet ska spelas i loop (valfri, standard är false) |

#### Nedladdning

| Fält | Typ | Beskrivning |
|-------|------|-------------|
| `name` | string | Namn på nedladdningspaketet (t.ex. "Utskrivbart material") |
| `files` | array | Filer i detta nedladdningspaket (samma fält som File ovan) |

## Åtgärdstyper

| Typ | Syfte |
|------|---------|
| `play` | Mediauppspelning – video, ljud eller bildspel. Måste innehålla `files`. |
| `text` | Statiskt textinnehåll. Stöder markdown-fetstil (`**text**`). |
| `question` | Diskussions- eller reflektionsfråga till målgruppen. |
| `quote` | Ett framhävt citat eller en skriftpassage. |
| `subhead` | En rubrik eller avdelare inom ett avsnitt. |

:::tip
För att se ett fungerande exempel på flödet i praktiken kan du visa det inbyggda Lessons.church-innehållsträdet på `https://api.lessons.church/lessons/public/tree` och hämta valfri platsflödes-URL från det.
:::
