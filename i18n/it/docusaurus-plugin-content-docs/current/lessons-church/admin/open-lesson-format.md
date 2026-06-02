---
title: "Formato lezione aperta"
---

# Formato lezione aperta

<div class="article-intro">

L'Open Lesson Format è uno schema JSON standardizzato che consente ai fornitori di contenuto di terze parti di pubblicare curriculum per Lessons.church. Qualsiasi organizzazione che ospita un feed in questo formato può essere aggiunta come provider esterno, rendendo il loro contenuto navigabile e riproducibile insieme alla libreria integrata.

</div>

## Come funziona

Un provider ospita due tipi di endpoint:

1. **Provider Tree** -- Un singolo URL che restituisce il catalogo completo di programmi, studi, lezioni e sedi. Ogni sede include un URL di feed che punta al contenuto della lezione dettagliata.
2. **Venue Feed** -- Un URL per sede, che restituisce il contenuto della lezione completo (sezioni, azioni e file multimediali).

Quando una chiesa aggiunge l'URL del tuo provider in Lessons.church, la piattaforma recupera il tuo albero per scoprire il contenuto disponibile, quindi recupera i feed delle sedi individuali su richiesta.

## Provider Tree

Il tuo URL provider deve restituire un oggetto JSON con questa struttura:

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

### Campi dell'albero

| Campo | Tipo | Descrizione |
|-------|------|-------------|
| `programs[].id` | stringa | Identificatore univoco del programma |
| `programs[].name` | stringa | Nome visualizzato |
| `programs[].slug` | stringa | Nome URL-friendly |
| `programs[].image` | stringa | URL immagine del programma (facoltativo) |
| `programs[].about` | stringa | Descrizione (facoltativo) |
| `studies[].id` | stringa | Identificatore univoco dello studio |
| `studies[].name` | stringa | Nome visualizzato |
| `studies[].slug` | stringa | Nome URL-friendly |
| `studies[].image` | stringa | URL immagine dello studio (facoltativo) |
| `lessons[].id` | stringa | Identificatore univoco della lezione |
| `lessons[].name` | stringa | Nome visualizzato |
| `lessons[].slug` | stringa | Nome URL-friendly |
| `lessons[].title` | stringa | Titolo completo |
| `lessons[].image` | stringa | URL immagine della lezione (facoltativo) |
| `lessons[].description` | stringa | Riepilogo della lezione (facoltativo) |
| `venues[].id` | stringa | Identificatore univoco della sede |
| `venues[].name` | stringa | Nome della sede (ad es. "Kids", "Adults", "Youth") |
| `venues[].apiUrl` | stringa | URL che restituisce il feed della sede (vedi sotto) |

**Le sedi** rappresentano diverse versioni della stessa lezione personalizzate per diversi pubblici (gruppi di età, ambienti, ecc.).

## Venue Feed

L'`apiUrl` di ogni sede deve restituire un oggetto JSON che corrisponde a questo schema:

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

### Campi del feed della sede

#### Oggetto radice

| Campo | Tipo | Descrizione |
|-------|------|-------------|
| `id` | stringa | Identificatore della sede |
| `name` | stringa | Nome della sede |
| `lessonId` | stringa | Identificatore della lezione |
| `lessonName` | stringa | Nome visualizzato della lezione |
| `lessonImage` | stringa | URL immagine della lezione |
| `lessonDescription` | stringa | Riepilogo della lezione |
| `studyName` | stringa | Nome dello studio genitore |
| `studySlug` | stringa | Slug dello studio genitore |
| `programName` | stringa | Nome del programma genitore |
| `programSlug` | stringa | Slug del programma genitore |
| `programAbout` | stringa | Descrizione del programma |
| `downloads` | array | Bundle di file scaricabili |
| `sections` | array | Sezioni di lezione ordinate |

#### Sezione

| Campo | Tipo | Descrizione |
|-------|------|-------------|
| `id` | stringa | Identificatore della sezione |
| `name` | stringa | Titolo della sezione |
| `sort` | numero | Ordine di visualizzazione |
| `materials` | stringa | Materiali o note di preparazione (facoltativo) |
| `actions` | array | Azioni ordinate in questa sezione |

#### Azione

| Campo | Tipo | Descrizione |
|-------|------|-------------|
| `id` | stringa | Identificatore dell'azione |
| `actionType` | stringa | Uno di: `play`, `text`, `question`, `quote`, `subhead` |
| `content` | stringa | Contenuto di testo o etichetta multimediale |
| `sort` | numero | Ordine di visualizzazione |
| `role` | stringa | Nome del ruolo, ad es. "Leader", "Kids" (facoltativo) |
| `roleId` | stringa | Identificatore del ruolo (facoltativo) |
| `files` | array | File multimediali per azioni `play` (facoltativo) |

#### File

| Campo | Tipo | Descrizione |
|-------|------|-------------|
| `id` | stringa | Identificatore del file |
| `name` | stringa | Nome del file |
| `url` | stringa | URL di download diretto |
| `streamUrl` | stringa | URL di streaming, ad es. link Vimeo (facoltativo) |
| `fileType` | stringa | Tipo MIME (ad es. `video/mp4`, `image/jpeg`) |
| `seconds` | numero | Durata in secondi per audio/video (facoltativo) |
| `bytes` | numero | Dimensione del file in byte (facoltativo) |
| `thumbnail` | stringa | URL immagine miniatura (facoltativo) |
| `loop` | boolean | Se il supporto dovrebbe ripetersi (facoltativo, default false) |

#### Scaricamento

| Campo | Tipo | Descrizione |
|-------|------|-------------|
| `name` | stringa | Nome del bundle di download (ad es. "Printable Materials") |
| `files` | array | File in questo bundle di download (stessi campi del File sopra) |

## Tipi di azione

| Tipo | Scopo |
|------|---------|
| `play` | Riproduzione multimediale -- video, audio o presentazione. Deve includere `files`. |
| `text` | Contenuto di testo statico. Supporta testo in grassetto stile markdown (`**text**`). |
| `question` | Domanda di discussione o riflessione per il pubblico. |
| `quote` | Una citazione in evidenza o passaggio delle Scritture. |
| `subhead` | Un'intestazione o un divisore in una sezione. |

:::tip
Per vedere un esempio funzionante del feed in azione, puoi visualizzare l'albero di contenuto Lessons.church integrato su `https://api.lessons.church/lessons/public/tree` e recuperare qualsiasi URL di feed della sede da esso.
:::
