---
title: "Formát otevřené lekce"
description: "Specifikace formátu pro externí poskytovatele kurikula v Lessons.church: strom poskytovatele a pole JSON venue feedu, akce a mediální soubory."
---

# Formát otevřené lekce

<div class="article-intro">

Formát otevřené lekce je standardizované JSON schéma, které umožňuje externím poskytovatelům obsahu zveřejňovat učební osnovy pro Lessons.church. Každá organizace, která hostuje kanál v tomto formátu, může být přidána jako externí poskytovatel. Jejich obsah pak lze procházet a přehrávat stejně jako vestavěnou knihovnu.

</div>

## Jak to funguje

Poskytovatel hostuje dva typy koncových bodů:

1. **Strom poskytovatele** -- jedna adresa URL, která vrací úplný katalog programů, studií, lekcí a variant. Každá varianta obsahuje adresu URL kanálu, na které jsou podrobnosti o obsahu lekce.
2. **Kanál varianty** -- jedna adresa URL pro každou variantu, která vrací úplný obsah lekce (sekce, aktivity a mediální soubory).

Když církev přidá adresu URL vašeho poskytovatele v Lessons.church, platforma načte váš strom, aby zjistila dostupný obsah, a následně na vyžádání načítá kanály jednotlivých variant.

## Strom poskytovatele

Adresa URL vašeho poskytovatele musí vracet JSON objekt s touto strukturou:

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

### Pole stromu

| Pole | Typ | Popis |
|------|-----|-------|
| `programs[].id` | řetězec | Jedinečný identifikátor programu |
| `programs[].name` | řetězec | Zobrazovaný název |
| `programs[].slug` | řetězec | Název vhodný pro URL |
| `programs[].image` | řetězec | Adresa URL obrázku programu (nepovinné) |
| `programs[].about` | řetězec | Popis (nepovinné) |
| `studies[].id` | řetězec | Jedinečný identifikátor studie |
| `studies[].name` | řetězec | Zobrazovaný název |
| `studies[].slug` | řetězec | Název vhodný pro URL |
| `studies[].image` | řetězec | Adresa URL obrázku studie (nepovinné) |
| `lessons[].id` | řetězec | Jedinečný identifikátor lekce |
| `lessons[].name` | řetězec | Zobrazovaný název |
| `lessons[].slug` | řetězec | Název vhodný pro URL |
| `lessons[].title` | řetězec | Úplný název |
| `lessons[].image` | řetězec | Adresa URL obrázku lekce (nepovinné) |
| `lessons[].description` | řetězec | Shrnutí lekce (nepovinné). Katalogový text pro učitele, kteří procházejí knihovnu, nikoli to, co si rodiče odnášejí domů. |
| `lessons[].bottomLine` | řetězec | Jedna věta o tom, co si rodiče odnesou domů (nepovinné) |
| `lessons[].verse` | řetězec | Odkaz na memorovaný verš a krátký text (nepovinné) |
| `lessons[].parentQuestion` | řetězec | Jedna otázka, kterou se rodiče mohou zeptat doma (nepovinné) |
| `lessons[].parentNote` | řetězec | Volitelná dodatečná poznámka pro rodiče (markdown) |
| `venues[].id` | řetězec | Jedinečný identifikátor varianty |
| `venues[].name` | řetězec | Název varianty (např. "Kids", "Adults", "Youth") |
| `venues[].apiUrl` | řetězec | Adresa URL, která vrací kanál varianty (viz níže) |

Čtyři pole pro to, co si rodiče odnesou domů (`bottomLine`, `verse`, `parentQuestion`, `parentNote`), jsou nepovinná jak ve stromu, tak v kanálu varianty. Pokud chybí, považují se za prázdná. Do těchto polí nekopírujte `description`.

**Varianty** představují různé verze stejné lekce přizpůsobené různému publiku (věkové skupiny, prostředí apod.).

## Kanál varianty

Hodnota `apiUrl` každé varianty musí vracet JSON objekt odpovídající tomuto schématu:

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

### Pole kanálu varianty

#### Kořenový objekt

| Pole | Typ | Popis |
|------|-----|-------|
| `id` | řetězec | Identifikátor varianty |
| `name` | řetězec | Název varianty |
| `lessonId` | řetězec | Identifikátor lekce |
| `lessonName` | řetězec | Zobrazovaný název lekce |
| `lessonImage` | řetězec | Adresa URL obrázku lekce |
| `lessonDescription` | řetězec | Shrnutí lekce (katalogový text) |
| `bottomLine` | řetězec | Jedna věta o tom, co si rodiče odnesou domů (nepovinné) |
| `verse` | řetězec | Odkaz na memorovaný verš a krátký text (nepovinné) |
| `parentQuestion` | řetězec | Jedna otázka, kterou se rodiče mohou zeptat doma (nepovinné) |
| `parentNote` | řetězec | Volitelná dodatečná poznámka pro rodiče, markdown (nepovinné) |
| `studyName` | řetězec | Název nadřazené studie |
| `studySlug` | řetězec | Název nadřazené studie vhodný pro URL |
| `programName` | řetězec | Název nadřazeného programu |
| `programSlug` | řetězec | Název nadřazeného programu vhodný pro URL |
| `programAbout` | řetězec | Popis programu |
| `downloads` | pole | Balíčky souborů ke stažení |
| `sections` | pole | Seřazené sekce lekce |

#### Sekce

| Pole | Typ | Popis |
|------|-----|-------|
| `id` | řetězec | Identifikátor sekce |
| `name` | řetězec | Nadpis sekce |
| `sort` | číslo | Pořadí zobrazení |
| `materials` | řetězec | Pomůcky nebo poznámky k přípravě (nepovinné) |
| `actions` | pole | Seřazené aktivity v této sekci |

#### Aktivita

| Pole | Typ | Popis |
|------|-----|-------|
| `id` | řetězec | Identifikátor aktivity |
| `actionType` | řetězec | Jedna z hodnot: `play`, `text`, `question`, `quote`, `subhead` |
| `content` | řetězec | Textový obsah nebo popisek média |
| `sort` | číslo | Pořadí zobrazení |
| `role` | řetězec | Název role, např. "Leader", "Kids" (nepovinné) |
| `roleId` | řetězec | Identifikátor role (nepovinné) |
| `files` | pole | Mediální soubory pro aktivity `play` (nepovinné) |

#### Soubor

| Pole | Typ | Popis |
|------|-----|-------|
| `id` | řetězec | Identifikátor souboru |
| `name` | řetězec | Název souboru |
| `url` | řetězec | Přímá adresa URL ke stažení |
| `streamUrl` | řetězec | Adresa URL pro streamování, např. odkaz na Vimeo (nepovinné) |
| `fileType` | řetězec | Typ MIME (např. `video/mp4`, `image/jpeg`) |
| `seconds` | číslo | Délka v sekundách u audia nebo videa (nepovinné) |
| `bytes` | číslo | Velikost souboru v bajtech (nepovinné) |
| `thumbnail` | řetězec | Adresa URL náhledového obrázku (nepovinné) |
| `loop` | logická hodnota | Zda se má médium přehrávat ve smyčce (nepovinné, výchozí false) |

#### Ke stažení

| Pole | Typ | Popis |
|------|-----|-------|
| `name` | řetězec | Název balíčku ke stažení (např. "Printable Materials") |
| `files` | pole | Soubory v tomto balíčku ke stažení (stejná pole jako u souboru výše) |

## Typy aktivit

| Typ | Účel |
|-----|------|
| `play` | Přehrávání médií -- video, audio nebo prezentace. Musí obsahovat `files`. |
| `text` | Statický textový obsah. Podporuje tučné písmo ve stylu markdownu (`**text**`). |
| `question` | Otázka k diskusi nebo k zamyšlení pro publikum. |
| `quote` | Zvýrazněná citace nebo úryvek z Písma. |
| `subhead` | Nadpis nebo oddělovač v rámci sekce. |

:::tip
Příklad fungujícího kanálu si můžete prohlédnout ve vestavěném stromu obsahu Lessons.church na adrese `https://api.lessons.church/lessons/public/tree`. Z něj můžete načíst libovolnou adresu URL kanálu varianty.
:::
