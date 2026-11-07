---
title: "Nyitott leckeformátum"
description: "Formátumleírás harmadik féltől származó tantervi szolgáltatóknak a Lessons.churchen: a szolgáltatófa és helyszín-feed JSON-mezői, műveletek és médiafájlok."
---

# Nyitott leckeformátum

<div class="article-intro">

A Nyitott leckeformátum egy szabványosított JSON-séma, amely lehetővé teszi harmadik fél tartalomszolgáltatóinak, hogy tanterveket tegyenek közzé a Lessons.church számára. Bármely szervezet, amely ilyen formátumú hírcsatornát üzemeltet, külső szolgáltatóként hozzáadható, így tartalmai a beépített könyvtár mellett is böngészhetők és lejátszhatók lesznek.

</div>

## Hogyan működik

A szolgáltató kétféle végpontot üzemeltet:

1. **Szolgáltatói fa** -- Egyetlen URL, amely a programok, tanulmányok, leckék és helyszínek teljes katalógusát adja vissza. Minden helyszín tartalmaz egy hírcsatorna-URL-t, amely a részletes leckeanyagra mutat.
2. **Helyszíni hírcsatorna** -- Helyszínenként egy URL, amely a teljes leckeanyagot adja vissza (szakaszok, műveletek és médiafájlok).

Amikor egy gyülekezet hozzáadja a szolgáltató URL-jét a Lessons.church-ben, a platform lekéri a fát, hogy felderítse az elérhető tartalmakat, majd igény szerint egyenként lekéri a helyszíni hírcsatornákat.

## Szolgáltatói fa

A szolgáltató URL-jének ezzel a szerkezettel rendelkező JSON-objektumot kell visszaadnia:

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

### Fa mezői

| Mező | Típus | Leírás |
|-------|------|-------------|
| `programs[].id` | string | Egyedi programazonosító |
| `programs[].name` | string | Megjelenített név |
| `programs[].slug` | string | URL-barát név |
| `programs[].image` | string | A program képének URL-je (opcionális) |
| `programs[].about` | string | Leírás (opcionális) |
| `studies[].id` | string | Egyedi tanulmányazonosító |
| `studies[].name` | string | Megjelenített név |
| `studies[].slug` | string | URL-barát név |
| `studies[].image` | string | A tanulmány képének URL-je (opcionális) |
| `lessons[].id` | string | Egyedi leckeazonosító |
| `lessons[].name` | string | Megjelenített név |
| `lessons[].slug` | string | URL-barát név |
| `lessons[].title` | string | Teljes cím |
| `lessons[].image` | string | A lecke képének URL-je (opcionális) |
| `lessons[].description` | string | Leckeösszefoglaló (opcionális). A könyvtárat böngésző tanítók számára készült katalógusszöveg, nem a szülőknek szánt hazavihető üzenet. |
| `lessons[].bottomLine` | string | Egy mondatos üzenet a szülőknek, hogy mit vihetnek haza (opcionális) |
| `lessons[].verse` | string | Memoritere hivatkozása és rövid szövege (opcionális) |
| `lessons[].parentQuestion` | string | Egy kérdés, amelyet a szülők otthon feltehetnek (opcionális) |
| `lessons[].parentNote` | string | Opcionális kiegészítő megjegyzés a szülőknek (markdown) |
| `venues[].id` | string | Egyedi helyszínazonosító |
| `venues[].name` | string | A helyszín neve (pl. „Kids”, „Adults”, „Youth”) |
| `venues[].apiUrl` | string | Az URL, amely a helyszíni hírcsatornát adja vissza (lásd alább) |

A négy szülői hazavihető mező (`bottomLine`, `verse`, `parentQuestion`, `parentNote`) mind a fán, mind a helyszíni hírcsatornán opcionális. Ha kimaradnak, üresnek tekintjük őket. Ne másold ide a `description` mező tartalmát.

**Helyszínek** ugyanannak a leckének különböző, eltérő közönségre (korcsoportok, környezetek stb.) szabott változatait jelentik.

## Helyszíni hírcsatorna

Minden helyszín `apiUrl` mezőjének az alábbi sémának megfelelő JSON-objektumot kell visszaadnia:

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

### Helyszíni hírcsatorna mezői

#### Gyökérobjektum

| Mező | Típus | Leírás |
|-------|------|-------------|
| `id` | string | Helyszínazonosító |
| `name` | string | A helyszín neve |
| `lessonId` | string | Leckeazonosító |
| `lessonName` | string | A lecke megjelenített neve |
| `lessonImage` | string | A lecke képének URL-je |
| `lessonDescription` | string | Leckeösszefoglaló (katalógusszöveg) |
| `bottomLine` | string | Egy mondatos üzenet a szülőknek, hogy mit vihetnek haza (opcionális) |
| `verse` | string | Memoritere hivatkozása és rövid szövege (opcionális) |
| `parentQuestion` | string | Egy kérdés, amelyet a szülők otthon feltehetnek (opcionális) |
| `parentNote` | string | Opcionális kiegészítő megjegyzés a szülőknek, markdownban (opcionális) |
| `studyName` | string | A szülő tanulmány neve |
| `studySlug` | string | A szülő tanulmány slugja |
| `programName` | string | A szülő program neve |
| `programSlug` | string | A szülő program slugja |
| `programAbout` | string | A program leírása |
| `downloads` | array | Letölthető fájlcsomagok |
| `sections` | array | Sorrendbe rendezett leckeszakaszok |

#### Szakasz

| Mező | Típus | Leírás |
|-------|------|-------------|
| `id` | string | Szakaszazonosító |
| `name` | string | Szakasz címe |
| `sort` | number | Megjelenítési sorrend |
| `materials` | string | Anyagok vagy előkészítési megjegyzések (opcionális) |
| `actions` | array | A szakaszon belüli műveletek sorrendben |

#### Művelet

| Mező | Típus | Leírás |
|-------|------|-------------|
| `id` | string | Műveletazonosító |
| `actionType` | string | Ezek egyike: `play`, `text`, `question`, `quote`, `subhead` |
| `content` | string | Szöveges tartalom vagy médiacímke |
| `sort` | number | Megjelenítési sorrend |
| `role` | string | Szerepkör neve, pl. „Leader”, „Kids” (opcionális) |
| `roleId` | string | Szerepkör-azonosító (opcionális) |
| `files` | array | Médiafájlok a `play` típusú műveletekhez (opcionális) |

#### Fájl

| Mező | Típus | Leírás |
|-------|------|-------------|
| `id` | string | Fájlazonosító |
| `name` | string | Fájlnév |
| `url` | string | Közvetlen letöltési URL |
| `streamUrl` | string | Streaming URL, pl. Vimeo-link (opcionális) |
| `fileType` | string | MIME-típus (pl. `video/mp4`, `image/jpeg`) |
| `seconds` | number | Hang- vagy videofájl hossza másodpercben (opcionális) |
| `bytes` | number | A fájl mérete bájtban (opcionális) |
| `thumbnail` | string | Bélyegkép URL-je (opcionális) |
| `loop` | boolean | Ismétlődjön-e a médiatartalom (opcionális, alapértelmezés szerint false) |

#### Letöltés

| Mező | Típus | Leírás |
|-------|------|-------------|
| `name` | string | Letöltési csomag neve (pl. „Printable Materials”) |
| `files` | array | A letöltési csomagban lévő fájlok (ugyanazok a mezők, mint fent a Fájl alatt) |

## Műveletek típusai

| Típus | Célja |
|------|---------|
| `play` | Médialejátszás -- videó, hang vagy diavetítés. Tartalmaznia kell a `files` mezőt. |
| `text` | Statikus szöveges tartalom. Támogatja a markdown-stílusú félkövér szedést (`**szöveg**`). |
| `question` | Beszélgetést vagy elmélkedést indító kérdés a közönség számára. |
| `quote` | Kiemelt idézet vagy bibliai szakasz. |
| `subhead` | Címsor vagy elválasztó egy szakaszon belül. |

:::tip
A hírcsatorna működését egy működő példán keresztül is megtekintheted: a beépített Lessons.church tartalomfát a `https://api.lessons.church/lessons/public/tree` címen találod, és innen bármely helyszíni hírcsatorna URL-jét lekérheted.
:::
