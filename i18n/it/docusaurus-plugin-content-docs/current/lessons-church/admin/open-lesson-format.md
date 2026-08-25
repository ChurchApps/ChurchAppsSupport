---
title: "Formato di Lezione Aperto"
---

# Formato di Lezione Aperto

<div class="article-intro">

Il Formato di Lezione Aperto è uno schema JSON standardizzato che consente ai provider di contenuto di terze parti di pubblicare il curriculum per Lessons.church. Qualsiasi organizzazione che ospita un feed in questo formato può essere aggiunto come provider esterno, rendendo il suo contenuto consultabile e riproducibile insieme alla biblioteca integrata.

</div>

## Come Funziona

Un provider ospita due tipi di endpoint:

1. **Albero del Provider** -- Un singolo URL che restituisce il catalogo completo di programmi, studi, lezioni e luoghi.
2. **Feed del Luogo** -- Un URL per luogo, che restituisce il contenuto della lezione completo.

Quando una chiesa aggiunge l'URL del tuo provider in Lessons.church, la piattaforma recupera il tuo albero per scoprire il contenuto disponibile, quindi recupera i singoli feed del luogo su richiesta.

## Albero del Provider

L'URL del tuo provider deve restituire un oggetto JSON con questa struttura:

```json
{
  "programs": [
    {
      "id": "program-1",
      "name": "Vangelo di Marco",
      "slug": "gospel-of-mark",
      "image": "https://example.com/images/mark.jpg",
      "about": "Uno studio di 12 settimane del Vangelo di Marco.",
      "studies": [
        {
          "id": "study-1",
          "name": "L'Inizio",
          "slug": "the-beginning",
          "image": "https://example.com/images/study1.jpg",
          "lessons": [
            {
              "id": "lesson-1",
              "name": "Il Battesimo di Gesù",
              "slug": "baptism-of-jesus",
              "title": "Il Battesimo di Gesù",
              "image": "https://example.com/images/lesson1.jpg",
              "description": "Un'introduzione al ministero di Gesù.",
              "bottomLine": "Dio mantiene le Sue promesse.",
              "verse": "Genesi 9:13 — Ho posto l'arcobaleno nelle nuvole…",
              "parentQuestion": "Qual è una promessa di Dio che Dio ha mantenuto nella nostra famiglia?",
              "parentNote": "Pregate insieme ringraziando Dio per aver mantenuto le Sue promesse.",
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

### Campi dell'Albero

| Campo | Tipo | Descrizione |
|-------|------|-------------|
| `programs[].id` | string | Identificatore unico del programma |
| `programs[].name` | string | Nome visualizzato |
| `programs[].slug` | string | Nome adatto all'URL |
| `programs[].image` | string | URL dell'immagine del programma (facoltativo) |
| `programs[].about` | string | Descrizione (facoltativo) |
| `studies[].id` | string | Identificatore unico dello studio |
| `studies[].name` | string | Nome visualizzato |
| `studies[].slug` | string | Nome adatto all'URL |
| `lessons[].id` | string | Identificatore unico della lezione |
| `lessons[].name` | string | Nome visualizzato |
| `lessons[].slug` | string | Nome adatto all'URL |
| `lessons[].title` | string | Titolo completo |
| `lessons[].image` | string | URL dell'immagine della lezione (facoltativo) |
| `lessons[].description` | string | Riepilogo della lezione (facoltativo) |
| `lessons[].bottomLine` | string | Presa a casa per i genitori su una frase (facoltativo) |
| `lessons[].verse` | string | Riferimento del versetto della memoria e testo breve (facoltativo) |
| `lessons[].parentQuestion` | string | Una domanda per i genitori (facoltativo) |
| `lessons[].parentNote` | string | Nota extra facoltativa per i genitori (markdown) |
| `venues[].id` | string | Identificatore unico del luogo |
| `venues[].name` | string | Nome del luogo (ad es. "Bambini", "Adulti", "Giovani") |
| `venues[].apiUrl` | string | URL che restituisce il feed del luogo (vedi sotto) |

I quattro campi di presa a casa per i genitori (`bottomLine`, `verse`, `parentQuestion`, `parentNote`) sono facoltativi sia nell'albero che nel feed del luogo.

## Feed del Luogo

L'`apiUrl` di ogni luogo deve restituire un oggetto JSON che corrisponda a questo schema:

```json
{
  "id": "venue-1",
  "name": "Bambini",
  "lessonId": "lesson-1",
  "lessonName": "Il Battesimo di Gesù",
  "bottomLine": "Dio mantiene le Sue promesse.",
  "verse": "Genesi 9:13 — Ho posto l'arcobaleno nelle nuvole…",
  "parentQuestion": "Qual è una promessa di Dio che Dio ha mantenuto nella nostra famiglia?",
  "parentNote": "Pregate insieme ringraziando Dio per aver mantenuto le Sue promesse.",
  "sections": [
    {
      "id": "section-1",
      "name": "Discussione di Apertura",
      "sort": 1,
      "materials": "Lavagna e pennarelli",
      "actions": [
        {
          "id": "action-1",
          "actionType": "text",
          "content": "**Versetto Chiave:** Marco 1:9-11",
          "sort": 1
        }
      ]
    }
  ]
}
```

:::tip
Per vedere un esempio di feed funzionante, puoi visualizzare l'albero di contenuto Lessons.church integrato su `https://api.lessons.church/lessons/public/tree` e recuperare qualsiasi URL di feed del luogo da esso.
:::
