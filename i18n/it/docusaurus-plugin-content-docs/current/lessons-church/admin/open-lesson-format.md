---
title: "Formato Open Lesson"
description: "Specifica del formato per i provider terzi su Lessons.church: albero dei provider, campi JSON del feed delle sedi, azioni e file multimediali."
---

# Formato Open Lesson

<div class="article-intro">

Il formato Open Lesson è uno schema JSON standardizzato che consente ai fornitori di contenuti di terze parti di pubblicare curricula per Lessons.church. Qualsiasi organizzazione che ospiti un feed in questo formato può essere aggiunta come fornitore esterno, rendendo i propri contenuti consultabili e riproducibili insieme alla libreria integrata.

</div>

## Come funziona

Un fornitore ospita due tipi di endpoint:

1. **Albero del fornitore** -- Un singolo URL che restituisce il catalogo completo di programmi, studi, lezioni e venue. Ogni venue include un URL di feed che punta al contenuto dettagliato della lezione.
2. **Feed del venue** -- Un URL per ciascun venue, che restituisce il contenuto completo della lezione (sezioni, azioni e file multimediali).

Quando una chiesa aggiunge l'URL del tuo fornitore in Lessons.church, la piattaforma recupera l'albero per scoprire i contenuti disponibili, quindi recupera i singoli feed dei venue su richiesta.

## Albero del fornitore

L'URL del tuo fornitore deve restituire un oggetto JSON con questa struttura:

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

### Campi dell'albero

| Campo | Tipo | Descrizione |
|-------|------|-------------|
| `programs[].id` | stringa | Identificatore univoco del programma |
| `programs[].name` | stringa | Nome visualizzato |
| `programs[].slug` | stringa | Nome compatibile con gli URL |
| `programs[].image` | stringa | URL dell'immagine del programma (facoltativo) |
| `programs[].about` | stringa | Descrizione (facoltativo) |
| `studies[].id` | stringa | Identificatore univoco dello studio |
| `studies[].name` | stringa | Nome visualizzato |
| `studies[].slug` | stringa | Nome compatibile con gli URL |
| `studies[].image` | stringa | URL dell'immagine dello studio (facoltativo) |
| `lessons[].id` | stringa | Identificatore univoco della lezione |
| `lessons[].name` | stringa | Nome visualizzato |
| `lessons[].slug` | stringa | Nome compatibile con gli URL |
| `lessons[].title` | stringa | Titolo completo |
| `lessons[].image` | stringa | URL dell'immagine della lezione (facoltativo) |
| `lessons[].description` | stringa | Riepilogo della lezione (facoltativo). Testo di catalogo per gli insegnanti che sfogliano la libreria, non per la sintesi destinata ai genitori. |
| `lessons[].bottomLine` | stringa | Messaggio chiave per i genitori, in una sola frase (facoltativo) |
| `lessons[].verse` | stringa | Riferimento del versetto da memorizzare e breve testo (facoltativo) |
| `lessons[].parentQuestion` | stringa | Una domanda che i genitori possono porre a casa (facoltativo) |
| `lessons[].parentNote` | stringa | Nota aggiuntiva facoltativa per i genitori (markdown) |
| `venues[].id` | stringa | Identificatore univoco del venue |
| `venues[].name` | stringa | Nome del venue (ad es. "Kids", "Adults", "Youth") |
| `venues[].apiUrl` | stringa | URL che restituisce il feed del venue (vedi sotto) |

I quattro campi di sintesi per i genitori (`bottomLine`, `verse`, `parentQuestion`, `parentNote`) sono facoltativi sia nell'albero sia nel feed del venue. Se omessi, vengono trattati come vuoti. Non copiare `description` in questi campi.

**I venue** rappresentano versioni diverse della stessa lezione, adattate a pubblici differenti (fasce d'età, contesti, ecc.).

## Feed del venue

L'`apiUrl` di ciascun venue deve restituire un oggetto JSON conforme a questo schema:

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

### Campi del feed del venue

#### Oggetto radice

| Campo | Tipo | Descrizione |
|-------|------|-------------|
| `id` | stringa | Identificatore del venue |
| `name` | stringa | Nome del venue |
| `lessonId` | stringa | Identificatore della lezione |
| `lessonName` | stringa | Nome visualizzato della lezione |
| `lessonImage` | stringa | URL dell'immagine della lezione |
| `lessonDescription` | stringa | Riepilogo della lezione (testo di catalogo) |
| `bottomLine` | stringa | Messaggio chiave per i genitori, in una sola frase (facoltativo) |
| `verse` | stringa | Riferimento del versetto da memorizzare e breve testo (facoltativo) |
| `parentQuestion` | stringa | Una domanda che i genitori possono porre a casa (facoltativo) |
| `parentNote` | stringa | Nota aggiuntiva facoltativa per i genitori, in markdown (facoltativo) |
| `studyName` | stringa | Nome dello studio di appartenenza |
| `studySlug` | stringa | Nome compatibile con gli URL dello studio di appartenenza |
| `programName` | stringa | Nome del programma di appartenenza |
| `programSlug` | stringa | Nome compatibile con gli URL del programma di appartenenza |
| `programAbout` | stringa | Descrizione del programma |
| `downloads` | array | Pacchetti di file scaricabili |
| `sections` | array | Sezioni della lezione, in ordine |

#### Sezione

| Campo | Tipo | Descrizione |
|-------|------|-------------|
| `id` | stringa | Identificatore della sezione |
| `name` | stringa | Titolo della sezione |
| `sort` | numero | Ordine di visualizzazione |
| `materials` | stringa | Materiali o note di preparazione (facoltativo) |
| `actions` | array | Azioni della sezione, in ordine |

#### Azione

| Campo | Tipo | Descrizione |
|-------|------|-------------|
| `id` | stringa | Identificatore dell'azione |
| `actionType` | stringa | Uno tra: `play`, `text`, `question`, `quote`, `subhead` |
| `content` | stringa | Contenuto testuale o etichetta del file multimediale |
| `sort` | numero | Ordine di visualizzazione |
| `role` | stringa | Nome del ruolo, ad es. "Leader", "Kids" (facoltativo) |
| `roleId` | stringa | Identificatore del ruolo (facoltativo) |
| `files` | array | File multimediali per le azioni `play` (facoltativo) |

#### File

| Campo | Tipo | Descrizione |
|-------|------|-------------|
| `id` | stringa | Identificatore del file |
| `name` | stringa | Nome del file |
| `url` | stringa | URL di download diretto |
| `streamUrl` | stringa | URL di streaming, ad es. un link Vimeo (facoltativo) |
| `fileType` | stringa | Tipo MIME (ad es. `video/mp4`, `image/jpeg`) |
| `seconds` | numero | Durata in secondi per audio e video (facoltativo) |
| `bytes` | numero | Dimensione del file in byte (facoltativo) |
| `thumbnail` | stringa | URL dell'immagine di anteprima (facoltativo) |
| `loop` | booleano | Indica se il file multimediale deve essere riprodotto in loop (facoltativo, predefinito false) |

#### Download

| Campo | Tipo | Descrizione |
|-------|------|-------------|
| `name` | stringa | Nome del pacchetto di download (ad es. "Printable Materials") |
| `files` | array | File contenuti in questo pacchetto (stessi campi di File sopra) |

## Tipi di azione

| Tipo | Scopo |
|------|-------|
| `play` | Riproduzione multimediale -- video, audio o presentazione. Deve includere `files`. |
| `text` | Contenuto testuale statico. Supporta il grassetto in stile markdown (`**testo**`). |
| `question` | Domanda di discussione o riflessione per il pubblico. |
| `quote` | Una citazione evidenziata o un passo della Scrittura. |
| `subhead` | Un titolo o un separatore all'interno di una sezione. |

:::tip
Per vedere un esempio funzionante del feed in azione, puoi consultare l'albero dei contenuti integrato di Lessons.church all'indirizzo `https://api.lessons.church/lessons/public/tree` e recuperare da lì un qualsiasi URL di feed di venue.
:::
