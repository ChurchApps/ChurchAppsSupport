---
title: "Format odprte lekcije"
description: "Specifikacija formata za zunanje ponudnike kurikula v Lessons.church: drevo ponudnika in JSON polja vira prostorov, dejanja ter medijske datoteke."
---

# Format odprte lekcije

<div class="article-intro">

Format odprte lekcije je standardizirana shema JSON, ki zunanjim ponudnikom vsebin omogoča objavljanje učnih načrtov za Lessons.church. Vsaka organizacija, ki gosti vir v tem formatu, je lahko dodana kot zunanji ponudnik, njena vsebina pa je tako dostopna za brskanje in predvajanje skupaj z vgrajeno knjižnico.

</div>

## Kako deluje

Ponudnik gosti dve vrsti končnih točk:

1. **Drevo ponudnika** -- En sam URL, ki vrne celoten katalog programov, študij, lekcij in okolij. Vsako okolje vsebuje URL vira, ki kaže na podrobno vsebino lekcije.
2. **Vir okolja** -- En URL za vsako okolje, ki vrne celotno vsebino lekcije (razdelke, dejanja in medijske datoteke).

Ko cerkev v Lessons.church doda vaš URL ponudnika, platforma pridobi vaše drevo, da odkrije razpoložljivo vsebino, nato pa posamezne vire okolij pridobi po potrebi.

## Drevo ponudnika

Vaš URL ponudnika mora vrniti objekt JSON s to strukturo:

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

### Polja drevesa

| Polje | Tip | Opis |
|-------|------|-------------|
| `programs[].id` | string | Edinstven identifikator programa |
| `programs[].name` | string | Prikazno ime |
| `programs[].slug` | string | Ime, prijazno za URL |
| `programs[].image` | string | URL slike programa (neobvezno) |
| `programs[].about` | string | Opis (neobvezno) |
| `studies[].id` | string | Edinstven identifikator študije |
| `studies[].name` | string | Prikazno ime |
| `studies[].slug` | string | Ime, prijazno za URL |
| `studies[].image` | string | URL slike študije (neobvezno) |
| `lessons[].id` | string | Edinstven identifikator lekcije |
| `lessons[].name` | string | Prikazno ime |
| `lessons[].slug` | string | Ime, prijazno za URL |
| `lessons[].title` | string | Polni naslov |
| `lessons[].image` | string | URL slike lekcije (neobvezno) |
| `lessons[].description` | string | Povzetek lekcije (neobvezno). Katalogsko besedilo za učitelje, ki brskajo po knjižnici, ne domača naloga za starše. |
| `lessons[].bottomLine` | string | En stavek kot glavno sporočilo za starše za domov (neobvezno) |
| `lessons[].verse` | string | Sklic na memorijski verz in kratko besedilo (neobvezno) |
| `lessons[].parentQuestion` | string | Eno vprašanje, ki ga starši zastavijo doma (neobvezno) |
| `lessons[].parentNote` | string | Dodatna opomba za starše (neobvezno; markdown) |
| `venues[].id` | string | Edinstven identifikator okolja |
| `venues[].name` | string | Ime okolja (npr. „Otroci“, „Odrasli“, „Mladina“) |
| `venues[].apiUrl` | string | URL, ki vrne vir okolja (glejte spodaj) |

Štirje polja za glavno sporočilo za starše za domov (`bottomLine`, `verse`, `parentQuestion`, `parentNote`) so neobvezna tako v drevesu kot v viru okolja. Če so izpuščena, se obravnavajo kot prazna. Ne kopirajte `description` vanje.

**Okolja** predstavljajo različne različice iste lekcije, prilagojene različnim občinstvom (starostnim skupinam, okoljem itd.).

## Vir okolja

`apiUrl` vsakega okolja mora vrniti objekt JSON, ki ustreza tej shemi:

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

### Polja vira okolja

#### Korenski objekt

| Polje | Tip | Opis |
|-------|------|-------------|
| `id` | string | Identifikator okolja |
| `name` | string | Ime okolja |
| `lessonId` | string | Identifikator lekcije |
| `lessonName` | string | Prikazno ime lekcije |
| `lessonImage` | string | URL slike lekcije |
| `lessonDescription` | string | Povzetek lekcije (katalogsko besedilo) |
| `bottomLine` | string | En stavek kot glavno sporočilo za starše za domov (neobvezno) |
| `verse` | string | Sklic na memorijski verz in kratko besedilo (neobvezno) |
| `parentQuestion` | string | Eno vprašanje, ki ga starši zastavijo doma (neobvezno) |
| `parentNote` | string | Dodatna opomba za starše, markdown (neobvezno) |
| `studyName` | string | Ime nadrejene študije |
| `studySlug` | string | Slug nadrejene študije |
| `programName` | string | Ime nadrejenega programa |
| `programSlug` | string | Slug nadrejenega programa |
| `programAbout` | string | Opis programa |
| `downloads` | array | Paketi datotek za prenos |
| `sections` | array | Urejeni razdelki lekcije |

#### Razdelek

| Polje | Tip | Opis |
|-------|------|-------------|
| `id` | string | Identifikator razdelka |
| `name` | string | Naslov razdelka |
| `sort` | number | Vrstni red prikaza |
| `materials` | string | Gradivo ali opombe za pripravo (neobvezno) |
| `actions` | array | Urejena dejanja znotraj tega razdelka |

#### Dejanje

| Polje | Tip | Opis |
|-------|------|-------------|
| `id` | string | Identifikator dejanja |
| `actionType` | string | Eno od: `play`, `text`, `question`, `quote`, `subhead` |
| `content` | string | Besedilna vsebina ali oznaka medija |
| `sort` | number | Vrstni red prikaza |
| `role` | string | Ime vloge, npr. „Voditelj“ ali „Otroci“ (neobvezno) |
| `roleId` | string | Identifikator vloge (neobvezno) |
| `files` | array | Medijske datoteke za dejanja `play` (neobvezno) |

#### Datoteka

| Polje | Tip | Opis |
|-------|------|-------------|
| `id` | string | Identifikator datoteke |
| `name` | string | Ime datoteke |
| `url` | string | Neposredni URL za prenos |
| `streamUrl` | string | URL za pretakanje, npr. povezava Vimeo (neobvezno) |
| `fileType` | string | Vrsta MIME (npr. `video/mp4`, `image/jpeg`) |
| `seconds` | number | Trajanje v sekundah za zvok ali video (neobvezno) |
| `bytes` | number | Velikost datoteke v bajtih (neobvezno) |
| `thumbnail` | string | URL sličice (neobvezno) |
| `loop` | boolean | Ali naj se medij ponavlja (neobvezno, privzeto false) |

#### Prenos

| Polje | Tip | Opis |
|-------|------|-------------|
| `name` | string | Ime paketa za prenos (npr. „Gradivo za tiskanje“) |
| `files` | array | Datoteke v tem paketu za prenos (enaka polja kot pri zgornji datoteki) |

## Vrste dejanj

| Vrsta | Namen |
|------|---------|
| `play` | Predvajanje medijev -- video, zvok ali diaprojekcija. Mora vključevati `files`. |
| `text` | Statično besedilo. Podpira krepko pisavo v slogu markdown (`**besedilo**`). |
| `question` | Vprašanje za razpravo ali razmislek za občinstvo. |
| `quote` | Poudarjen citat ali odlomek iz Svetega pisma. |
| `subhead` | Naslov ali ločilna črta znotraj razdelka. |

:::tip
Če si želite ogledati delujoč primer vira v praksi, si lahko oglejte vgrajeno drevo vsebine Lessons.church na `https://api.lessons.church/lessons/public/tree` in iz njega pridobite kateri koli URL vira okolja.
:::
