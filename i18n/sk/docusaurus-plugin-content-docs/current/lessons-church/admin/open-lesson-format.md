---
title: "Formát otvorenej lekcie"
---

# Formát otvorenej lekcie

<div class="article-intro">

Formát otvorenej lekcie je štandardizovaná schéma JSON, ktorá umožňuje poskytovateľom obsahu tretích strán publikovať učebné osnovy pre Lessons.church. Akákoľvek organizácia, ktorá hostí kanál v tomto formáte, môže byť pridaná ako externý poskytovateľ, čím sa jej obsah stane prehľadateľným a prehrateľným spolu s vstavaným obsahom knižnice.

</div>

## Ako to funguje

Poskytovateľ hostí dva typy koncových bodov:

1. **Strom poskytovateľa** -- Jediná URL adresa, ktorá vráti úplný katalóg programov, štúdií, lekcií a miest konania. Každé miesto obsahuje URL adresu kanála, ktorá smeruje na podrobný obsah lekcie.
2. **Kanál miesta** -- Jedna URL adresa pre každé miesto, ktorá vráti úplný obsah lekcie (sekcie, akcie a mediálne súbory).

Keď cirkev pridá vašu URL adresu poskytovateľa v Lessons.church, platforma stiahne váš strom, aby zistila dostupný obsah, a následne na požiadanie načíta jednotlivé kanály miest.

## Strom poskytovateľa

Vaša URL adresa poskytovateľa musí vrátiť objekt JSON s touto štruktúrou:

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

### Polia stromu

| Pole | Typ | Popis |
|-------|------|-------------|
| `programs[].id` | reťazec | Jedinečný identifikátor programu |
| `programs[].name` | reťazec | Zobrazovaný názov |
| `programs[].slug` | reťazec | Názov vhodný pre URL |
| `programs[].image` | reťazec | URL adresa obrázka programu (voliteľné) |
| `programs[].about` | reťazec | Popis (voliteľné) |
| `studies[].id` | reťazec | Jedinečný identifikátor štúdie |
| `studies[].name` | reťazec | Zobrazovaný názov |
| `studies[].slug` | reťazec | Názov vhodný pre URL |
| `studies[].image` | reťazec | URL adresa obrázka štúdie (voliteľné) |
| `lessons[].id` | reťazec | Jedinečný identifikátor lekcie |
| `lessons[].name` | reťazec | Zobrazovaný názov |
| `lessons[].slug` | reťazec | Názov vhodný pre URL |
| `lessons[].title` | reťazec | Úplný názov |
| `lessons[].image` | reťazec | URL adresa obrázka lekcie (voliteľné) |
| `lessons[].description` | reťazec | Zhrnutie lekcie (voliteľné). Katalógový text pre učiteľov prezerajúcich knižnicu -- nie domáce posolstvo pre rodičov. |
| `lessons[].bottomLine` | reťazec | Jedna veta ako domáce posolstvo pre rodičov (voliteľné) |
| `lessons[].verse` | reťazec | Odkaz na pamäťový verš a krátky text (voliteľné) |
| `lessons[].parentQuestion` | reťazec | Jedna otázka, ktorú si rodičia môžu položiť doma (voliteľné) |
| `lessons[].parentNote` | reťazec | Voliteľná dodatočná poznámka pre rodičov (markdown) |
| `venues[].id` | reťazec | Jedinečný identifikátor miesta |
| `venues[].name` | reťazec | Názov miesta (napr. "Deti", "Dospelí", "Mládež") |
| `venues[].apiUrl` | reťazec | URL adresa, ktorá vráti kanál miesta (pozri nižšie) |

Štyri polia domáceho posolstva pre rodičov (`bottomLine`, `verse`, `parentQuestion`, `parentNote`) sú voliteľné v strome aj v kanáli miesta. Ak sa vynechajú, považujú sa za prázdne. Nekopírujte do nich obsah poľa `description`.

**Miesta** predstavujú rôzne verzie tej istej lekcie prispôsobené pre rôzne publikum (vekové skupiny, prostredia a pod.).

## Kanál miesta

Každá `apiUrl` miesta musí vrátiť objekt JSON zodpovedajúci tejto schéme:

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

### Polia kanála miesta

#### Koreňový objekt

| Pole | Typ | Popis |
|-------|------|-------------|
| `id` | reťazec | Identifikátor miesta |
| `name` | reťazec | Názov miesta |
| `lessonId` | reťazec | Identifikátor lekcie |
| `lessonName` | reťazec | Zobrazovaný názov lekcie |
| `lessonImage` | reťazec | URL adresa obrázka lekcie |
| `lessonDescription` | reťazec | Zhrnutie lekcie (katalógový text) |
| `bottomLine` | reťazec | Jedna veta ako domáce posolstvo pre rodičov (voliteľné) |
| `verse` | reťazec | Odkaz na pamäťový verš a krátky text (voliteľné) |
| `parentQuestion` | reťazec | Jedna otázka, ktorú si rodičia môžu položiť doma (voliteľné) |
| `parentNote` | reťazec | Voliteľná dodatočná poznámka pre rodičov, markdown (voliteľné) |
| `studyName` | reťazec | Názov nadradenej štúdie |
| `studySlug` | reťazec | Názov nadradenej štúdie vhodný pre URL |
| `programName` | reťazec | Názov nadradeného programu |
| `programSlug` | reťazec | Názov nadradeného programu vhodný pre URL |
| `programAbout` | reťazec | Popis programu |
| `downloads` | pole | Balíky súborov na stiahnutie |
| `sections` | pole | Usporiadané sekcie lekcie |

#### Sekcia

| Pole | Typ | Popis |
|-------|------|-------------|
| `id` | reťazec | Identifikátor sekcie |
| `name` | reťazec | Názov sekcie |
| `sort` | číslo | Poradie zobrazenia |
| `materials` | reťazec | Materiály alebo poznámky na prípravu (voliteľné) |
| `actions` | pole | Usporiadané akcie v rámci tejto sekcie |

#### Akcia

| Pole | Typ | Popis |
|-------|------|-------------|
| `id` | reťazec | Identifikátor akcie |
| `actionType` | reťazec | Jedna z hodnôt: `play`, `text`, `question`, `quote`, `subhead` |
| `content` | reťazec | Textový obsah alebo označenie média |
| `sort` | číslo | Poradie zobrazenia |
| `role` | reťazec | Názov role, napr. "Vedúci", "Deti" (voliteľné) |
| `roleId` | reťazec | Identifikátor role (voliteľné) |
| `files` | pole | Mediálne súbory pre akcie `play` (voliteľné) |

#### Súbor

| Pole | Typ | Popis |
|-------|------|-------------|
| `id` | reťazec | Identifikátor súboru |
| `name` | reťazec | Názov súboru |
| `url` | reťazec | Priama URL adresa na stiahnutie |
| `streamUrl` | reťazec | URL adresa streamu, napr. odkaz na Vimeo (voliteľné) |
| `fileType` | reťazec | Typ MIME (napr. `video/mp4`, `image/jpeg`) |
| `seconds` | číslo | Dĺžka v sekundách pre audio alebo video (voliteľné) |
| `bytes` | číslo | Veľkosť súboru v bajtoch (voliteľné) |
| `thumbnail` | reťazec | URL adresa obrázka náhľadu (voliteľné) |
| `loop` | logická hodnota | Či sa má médium opakovať (voliteľné, predvolene false) |

#### Na stiahnutie

| Pole | Typ | Popis |
|-------|------|-------------|
| `name` | reťazec | Názov balíka na stiahnutie (napr. "Materiály na tlač") |
| `files` | pole | Súbory v tomto balíku na stiahnutie (rovnaké polia ako pri súbore vyššie) |

## Typy akcií

| Typ | Účel |
|------|---------|
| `play` | Prehrávanie médií -- video, audio alebo prezentácia. Musí obsahovať `files`. |
| `text` | Statický textový obsah. Podporuje tučné písmo v štýle markdownu (`**text**`). |
| `question` | Diskusná alebo reflexná otázka pre publikum. |
| `quote` | Zvýraznená citácia alebo úryvok z Písma. |
| `subhead` | Nadpis alebo oddeľovač v rámci sekcie. |

:::tip
Ak chcete vidieť funkčný príklad kanála v praxi, môžete si pozrieť vstavaný strom obsahu Lessons.church na adrese `https://api.lessons.church/lessons/public/tree` a z neho načítať ľubovoľnú URL adresu kanála miesta.
:::
