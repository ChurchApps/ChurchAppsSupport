---
title: "Formatul Open Lesson"
description: "Specificația formatului pentru furnizorii terți de curriculum: arborele furnizorului, câmpurile JSON ale feed-ului de locații, acțiunile și fișierele media."
---

# Formatul Open Lesson

<div class="article-intro">

Formatul Open Lesson este o schemă JSON standardizată, care permite furnizorilor de conținut terți să publice curricule pentru Lessons.church. Orice organizație care găzduiește un flux în acest format poate fi adăugată ca furnizor extern, astfel încât conținutul său poate fi răsfoit și redat alături de biblioteca integrată.

</div>

## Cum funcționează

Un furnizor găzduiește două tipuri de puncte de acces (endpoints):

1. **Arborele furnizorului** -- Un singur URL care returnează catalogul complet al programelor, studiilor, lecțiilor și variantelor. Fiecare variantă include un URL de flux care indică spre conținutul detaliat al lecției.
2. **Fluxul variantei** -- Un URL pentru fiecare variantă, care returnează conținutul complet al lecției (secțiuni, acțiuni și fișiere media).

Atunci când o biserică adaugă URL-ul furnizorului dumneavoastră în Lessons.church, platforma preia arborele dumneavoastră pentru a descoperi conținutul disponibil, apoi preia fluxurile fiecărei variante la cerere.

## Arborele furnizorului

URL-ul furnizorului trebuie să returneze un obiect JSON cu următoarea structură:

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

### Câmpurile arborelui

| Câmp | Tip | Descriere |
|-------|------|-------------|
| `programs[].id` | string | Identificator unic al programului |
| `programs[].name` | string | Nume afișat |
| `programs[].slug` | string | Nume compatibil cu URL-ul |
| `programs[].image` | string | URL-ul imaginii programului (opțional) |
| `programs[].about` | string | Descriere (opțional) |
| `studies[].id` | string | Identificator unic al studiului |
| `studies[].name` | string | Nume afișat |
| `studies[].slug` | string | Nume compatibil cu URL-ul |
| `studies[].image` | string | URL-ul imaginii studiului (opțional) |
| `lessons[].id` | string | Identificator unic al lecției |
| `lessons[].name` | string | Nume afișat |
| `lessons[].slug` | string | Nume compatibil cu URL-ul |
| `lessons[].title` | string | Titlu complet |
| `lessons[].image` | string | URL-ul imaginii lecției (opțional) |
| `lessons[].description` | string | Rezumatul lecției (opțional). Text de catalog pentru profesorii care răsfoiesc biblioteca -- nu este mesajul pentru acasă destinat părinților. |
| `lessons[].bottomLine` | string | Mesajul pentru acasă destinat părinților, într-o propoziție (opțional) |
| `lessons[].verse` | string | Referința versetului de memorat și un text scurt (opțional) |
| `lessons[].parentQuestion` | string | O întrebare pe care părinții o pot pune acasă (opțional) |
| `lessons[].parentNote` | string | Notă suplimentară opțională pentru părinți (markdown) |
| `venues[].id` | string | Identificator unic al variantei |
| `venues[].name` | string | Numele variantei (de ex. "Kids", "Adults", "Youth") |
| `venues[].apiUrl` | string | URL-ul care returnează fluxul variantei (vezi mai jos) |

Cele patru câmpuri pentru mesajul destinat părinților (`bottomLine`, `verse`, `parentQuestion`, `parentNote`) sunt opționale atât în arbore, cât și în fluxul variantei. Dacă lipsesc, sunt tratate ca fiind goale. Nu copiați `description` în aceste câmpuri.

**Variantele** reprezintă versiuni diferite ale aceleiași lecții, adaptate pentru audiențe diferite (grupe de vârstă, contexte etc.).

## Fluxul variantei

Fiecare `apiUrl` al unei variante trebuie să returneze un obiect JSON care respectă această schemă:

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

### Câmpurile fluxului variantei

#### Obiectul rădăcină

| Câmp | Tip | Descriere |
|-------|------|-------------|
| `id` | string | Identificatorul variantei |
| `name` | string | Numele variantei |
| `lessonId` | string | Identificatorul lecției |
| `lessonName` | string | Numele lecției afișat |
| `lessonImage` | string | URL-ul imaginii lecției |
| `lessonDescription` | string | Rezumatul lecției (text de catalog) |
| `bottomLine` | string | Mesajul pentru acasă destinat părinților, într-o propoziție (opțional) |
| `verse` | string | Referința versetului de memorat și un text scurt (opțional) |
| `parentQuestion` | string | O întrebare pe care părinții o pot pune acasă (opțional) |
| `parentNote` | string | Notă suplimentară opțională pentru părinți, markdown (opțional) |
| `studyName` | string | Numele studiului părinte |
| `studySlug` | string | Slug-ul studiului părinte |
| `programName` | string | Numele programului părinte |
| `programSlug` | string | Slug-ul programului părinte |
| `programAbout` | string | Descrierea programului |
| `downloads` | array | Pachete de fișiere descărcabile |
| `sections` | array | Secțiunile lecției, în ordine |

#### Secțiune

| Câmp | Tip | Descriere |
|-------|------|-------------|
| `id` | string | Identificatorul secțiunii |
| `name` | string | Titlul secțiunii |
| `sort` | number | Ordinea de afișare |
| `materials` | string | Materiale sau note de pregătire (opțional) |
| `actions` | array | Acțiunile din această secțiune, în ordine |

#### Acțiune

| Câmp | Tip | Descriere |
|-------|------|-------------|
| `id` | string | Identificatorul acțiunii |
| `actionType` | string | Unul dintre: `play`, `text`, `question`, `quote`, `subhead` |
| `content` | string | Conținutul text sau eticheta fișierului media |
| `sort` | number | Ordinea de afișare |
| `role` | string | Numele rolului, de ex. "Leader", "Kids" (opțional) |
| `roleId` | string | Identificatorul rolului (opțional) |
| `files` | array | Fișiere media pentru acțiunile `play` (opțional) |

#### Fișier

| Câmp | Tip | Descriere |
|-------|------|-------------|
| `id` | string | Identificatorul fișierului |
| `name` | string | Numele fișierului |
| `url` | string | URL direct de descărcare |
| `streamUrl` | string | URL de streaming, de ex. link Vimeo (opțional) |
| `fileType` | string | Tip MIME (de ex. `video/mp4`, `image/jpeg`) |
| `seconds` | number | Durata în secunde pentru audio/video (opțional) |
| `bytes` | number | Dimensiunea fișierului în octeți (opțional) |
| `thumbnail` | string | URL-ul imaginii miniatură (opțional) |
| `loop` | boolean | Dacă fișierul media trebuie redat în buclă (opțional, implicit false) |

#### Descărcare

| Câmp | Tip | Descriere |
|-------|------|-------------|
| `name` | string | Numele pachetului de descărcare (de ex. "Printable Materials") |
| `files` | array | Fișierele din acest pachet (aceleași câmpuri ca la Fișier de mai sus) |

## Tipuri de acțiuni

| Tip | Scop |
|------|---------|
| `play` | Redare media -- video, audio sau prezentare de diapozitive. Trebuie să includă `files`. |
| `text` | Conținut text static. Acceptă aldine în stil markdown (`**text**`). |
| `question` | Întrebare de discuție sau de reflecție pentru audiență. |
| `quote` | Un citat evidențiat sau un pasaj din Scriptură. |
| `subhead` | Un titlu sau un separator în cadrul unei secțiuni. |

:::tip
Pentru a vedea un exemplu funcțional al fluxului, puteți consulta arborele de conținut integrat Lessons.church la `https://api.lessons.church/lessons/public/tree` și puteți prelua oricare URL de flux al unei variante din acesta.
:::
