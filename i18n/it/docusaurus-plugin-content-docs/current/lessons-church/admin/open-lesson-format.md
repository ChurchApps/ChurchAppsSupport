---
title: "Formato Open Lesson"
---

# Formato Open Lesson

<div class="article-intro">

Il Formato Open Lesson e uno schema JSON standardizzato che consente ai fornitori di contenuti di terze parti di pubblicare materiale didattico per Lessons.church. Qualsiasi organizzazione che ospita un feed in questo formato puo essere aggiunta come fornitore esterno, rendendo i suoi contenuti navigabili e riproducibili insieme alla libreria integrata.

</div>

## Come funziona

Un fornitore ospita due tipi di endpoint:

1. **Provider Tree** -- Un singolo URL che restituisce il catalogo completo di programmi, studi, lezioni e ambienti. Ogni ambiente include un URL di feed che punta al contenuto dettagliato della lezione.
2. **Venue Feed** -- Un URL per ogni ambiente, che restituisce il contenuto completo della lezione (sezioni, azioni e file multimediali).

Quando una chiesa aggiunge l'URL del vostro fornitore in Lessons.church, la piattaforma recupera il vostro albero per scoprire i contenuti disponibili, quindi recupera i singoli feed dell'ambiente su richiesta.

## Provider Tree

L'URL del vostro fornitore deve restituire un oggetto JSON con questa struttura:

```json
{
  "programs": [
    {
      "id": "program-1",
      "name": "Vangelo di Marco",
      "slug": "gospel-of-mark",
      "image": "https://example.com/images/mark.jpg",
      "about": "Uno studio di 12 settimane attraverso il Vangelo di Marco.",
      "studies": [
        {
          "id": "study-1",
          "name": "L'Inizio",
          "slug": "the-beginning",
          "image": "https://example.com/images/study1.jpg",
          "lessons": [
            {
              "id": "lesson-1",
              "name": "Il Battesimo di Gesu",
              "slug": "baptism-of-jesus",
              "title": "Il Battesimo di Gesu",
              "image": "https://example.com/images/lesson1.jpg",
              "description": "Un'introduzione al ministero di Gesu.",
              "venues": [
                {
                  "id": "venue-1",
                  "name": "Bambini",
                  "apiUrl": "https://example.com/feed/venues/venue-1"
                },
                {
                  "id": "venue-2",
                  "name": "Adulti",
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

### Campi del Provider Tree

| Campo | Tipo | Descrizione |
|-------|------|-------------|
| `programs[].id` | string | Identificatore univoco del programma |
| `programs[].name` | string | Nome visualizzato |
| `programs[].slug` | string | Nome adatto per URL |
| `programs[].image` | string | URL dell'immagine del programma (opzionale) |
| `programs[].about` | string | Descrizione (opzionale) |
| `studies[].id` | string | Identificatore univoco dello studio |
| `studies[].name` | string | Nome visualizzato |
| `studies[].slug` | string | Nome adatto per URL |
| `studies[].image` | string | URL dell'immagine dello studio (opzionale) |
| `lessons[].id` | string | Identificatore univoco della lezione |
| `lessons[].name` | string | Nome visualizzato |
| `lessons[].slug` | string | Nome adatto per URL |
| `lessons[].title` | string | Titolo completo |
| `lessons[].image` | string | URL dell'immagine della lezione (opzionale) |
| `lessons[].description` | string | Riassunto della lezione (opzionale) |
| `venues[].id` | string | Identificatore univoco dell'ambiente |
| `venues[].name` | string | Nome dell'ambiente (es. "Bambini", "Adulti", "Giovani") |
| `venues[].apiUrl` | string | URL che restituisce il feed dell'ambiente (vedi sotto) |

**Gli ambienti** rappresentano diverse versioni della stessa lezione adattate per diversi tipi di pubblico (gruppi di eta, contesti, ecc.).

## Venue Feed

L'URL `apiUrl` di ogni ambiente deve restituire un oggetto JSON che corrisponda a questo schema:

```json
{
  "id": "venue-1",
  "name": "Bambini",
  "lessonId": "lesson-1",
  "lessonName": "Il Battesimo di Gesu",
  "lessonImage": "https://example.com/images/lesson1.jpg",
  "lessonDescription": "Un'introduzione al ministero di Gesu.",
  "studyName": "L'Inizio",
  "studySlug": "the-beginning",
  "programName": "Vangelo di Marco",
  "programSlug": "gospel-of-mark",
  "programAbout": "Uno studio di 12 settimane attraverso il Vangelo di Marco.",
  "downloads": [],
  "sections": [
    {
      "id": "section-1",
      "name": "Discussione iniziale",
      "sort": 1,
      "materials": "Lavagna e pennarelli",
      "actions": [
        {
          "id": "action-1",
          "actionType": "text",
          "content": "**Versetto chiave:** Marco 1:9-11",
          "sort": 1
        },
        {
          "id": "action-2",
          "actionType": "question",
          "content": "Cosa sai del battesimo?",
          "sort": 2,
          "role": "Leader"
        },
        {
          "id": "action-3",
          "actionType": "play",
          "content": "Video introduttivo",
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

### Campi del Venue Feed

#### Oggetto radice

| Campo | Tipo | Descrizione |
|-------|------|-------------|
| `id` | string | Identificatore dell'ambiente |
| `name` | string | Nome dell'ambiente |
| `lessonId` | string | Identificatore della lezione |
| `lessonName` | string | Nome visualizzato della lezione |
| `lessonImage` | string | URL dell'immagine della lezione |
| `lessonDescription` | string | Riassunto della lezione |
| `studyName` | string | Nome dello studio principale |
| `studySlug` | string | Slug dello studio principale |
| `programName` | string | Nome del programma principale |
| `programSlug` | string | Slug del programma principale |
| `programAbout` | string | Descrizione del programma |
| `downloads` | array | Pacchetti di file scaricabili |
| `sections` | array | Sezioni della lezione ordinate |

#### Sezione

| Campo | Tipo | Descrizione |
|-------|------|-------------|
| `id` | string | Identificatore della sezione |
| `name` | string | Titolo della sezione |
| `sort` | number | Ordine di visualizzazione |
| `materials` | string | Materiali o note di preparazione (opzionale) |
| `actions` | array | Azioni ordinate all'interno di questa sezione |

#### Azione

| Campo | Tipo | Descrizione |
|-------|------|-------------|
| `id` | string | Identificatore dell'azione |
| `actionType` | string | Uno di: `play`, `text`, `question`, `quote`, `subhead` |
| `content` | string | Contenuto testuale o etichetta del media |
| `sort` | number | Ordine di visualizzazione |
| `role` | string | Nome del ruolo, es. "Leader", "Bambini" (opzionale) |
| `roleId` | string | Identificatore del ruolo (opzionale) |
| `files` | array | File multimediali per azioni `play` (opzionale) |

#### File

| Campo | Tipo | Descrizione |
|-------|------|-------------|
| `id` | string | Identificatore del file |
| `name` | string | Nome del file |
| `url` | string | URL di download diretto |
| `streamUrl` | string | URL di streaming, es. collegamento Vimeo (opzionale) |
| `fileType` | string | Tipo MIME (es. `video/mp4`, `image/jpeg`) |
| `seconds` | number | Durata in secondi per audio/video (opzionale) |
| `bytes` | number | Dimensione del file in byte (opzionale) |
| `thumbnail` | string | URL dell'immagine in miniatura (opzionale) |
| `loop` | boolean | Se il media deve ripetersi in loop (opzionale, predefinito false) |

#### Download

| Campo | Tipo | Descrizione |
|-------|------|-------------|
| `name` | string | Nome del pacchetto di download (es. "Materiali stampabili") |
| `files` | array | File in questo pacchetto di download (stessi campi del File sopra) |

## Tipi di azione

| Tipo | Scopo |
|------|---------|
| `play` | Riproduzione di media -- video, audio o presentazione. Deve includere `files`. |
| `text` | Contenuto testuale statico. Supporta grassetto nello stile markdown (`**text**`). |
| `question` | Domanda di discussione o riflessione per il pubblico. |
| `quote` | Una citazione in evidenza o brano biblico. |
| `subhead` | Un'intestazione o divisore all'interno di una sezione. |

:::tip
Per vedere un esempio funzionante del feed in azione, potete visualizzare l'albero dei contenuti di Lessons.church integrato su `https://api.lessons.church/lessons/public/tree` e recuperare qualsiasi URL di feed dell'ambiente da esso.
:::
