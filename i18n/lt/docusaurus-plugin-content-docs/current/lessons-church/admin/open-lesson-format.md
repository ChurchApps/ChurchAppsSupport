---
title: "Atvirojo pamokos formatas"
---

# Atvirojo pamokos formatas

<div class="article-intro">

Atvirojo pamokos formatas – tai standartizuota JSON schema, leidžianti trečiųjų šalių turinio teikėjams skelbti mokymo programas Lessons.church. Bet kuri organizacija, talpinanti šio formato srautą, gali būti pridėta kaip išorinis teikėjas, o jos turinys bus naršomas ir leidžiamas kartu su įtaisyta biblioteka.

</div>

## Kaip tai veikia

Teikėjas talpina du tipus galutinių taškų:

1. **Teikėjo medis** -- vienas URL, grąžinantis visą programų, studijų, pamokų ir vietų katalogą. Kiekvienoje vietoje yra srauto URL, nukreipiantis į išsamų pamokos turinį.
2. **Vietos srautas** -- vienas URL kiekvienai vietai, grąžinantis visą pamokos turinį (skyrius, veiksmus ir medijos failus).

Kai bažnyčia prideda jūsų teikėjo URL Lessons.church, platforma atsisiunčia jūsų medį, kad surastų prieinamą turinį, o vėliau pagal poreikį atsisiunčia atskirų vietų srautus.

## Teikėjo medis

Jūsų teikėjo URL turi grąžinti JSON objektą su tokia struktūra:

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

### Medžio laukai

| Laukas | Tipas | Aprašymas |
|-------|------|-------------|
| `programs[].id` | string | Unikalus programos identifikatorius |
| `programs[].name` | string | Rodomas pavadinimas |
| `programs[].slug` | string | URL draugiškas pavadinimas |
| `programs[].image` | string | Programos paveikslėlio URL (pasirinktinai) |
| `programs[].about` | string | Aprašymas (pasirinktinai) |
| `studies[].id` | string | Unikalus studijos identifikatorius |
| `studies[].name` | string | Rodomas pavadinimas |
| `studies[].slug` | string | URL draugiškas pavadinimas |
| `studies[].image` | string | Studijos paveikslėlio URL (pasirinktinai) |
| `lessons[].id` | string | Unikalus pamokos identifikatorius |
| `lessons[].name` | string | Rodomas pavadinimas |
| `lessons[].slug` | string | URL draugiškas pavadinimas |
| `lessons[].title` | string | Pilnas pavadinimas |
| `lessons[].image` | string | Pamokos paveikslėlio URL (pasirinktinai) |
| `lessons[].description` | string | Pamokos santrauka (pasirinktinai). Katalogo tekstas mokytojams, naršantiems biblioteką, o ne tėvų namų užduotis. |
| `lessons[].bottomLine` | string | Vienas sakinys, skirtas tėvams namams (pasirinktinai) |
| `lessons[].verse` | string | Įsimintinos Šventojo Rašto eilutės nuoroda ir trumpas tekstas (pasirinktinai) |
| `lessons[].parentQuestion` | string | Vienas klausimas, kurį tėvai gali užduoti namuose (pasirinktinai) |
| `lessons[].parentNote` | string | Papildoma pastaba tėvams (markdown, pasirinktinai) |
| `venues[].id` | string | Unikalus vietos identifikatorius |
| `venues[].name` | string | Vietos pavadinimas (pvz., "Kids", "Adults", "Youth") |
| `venues[].apiUrl` | string | URL, grąžinantis vietos srautą (žr. žemiau) |

Keturi tėvams skirti namų užduočių laukai (`bottomLine`, `verse`, `parentQuestion`, `parentNote`) yra neprivalomi tiek medžio, tiek vietos srauto lygmenyse. Jei jie praleidžiami, laikoma, kad jie tušti. Nekopijuokite `description` į šiuos laukus.

**Vietos** atspindi skirtingas tos pačios pamokos versijas, pritaikytas skirtingai auditorijai (amžiaus grupėms, aplinkai ir pan.).

## Vietos srautas

Kiekvienos vietos `apiUrl` turi grąžinti JSON objektą, atitinkantį šią schemą:

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

### Vietos srauto laukai

#### Šakninis objektas

| Laukas | Tipas | Aprašymas |
|-------|------|-------------|
| `id` | string | Vietos identifikatorius |
| `name` | string | Vietos pavadinimas |
| `lessonId` | string | Pamokos identifikatorius |
| `lessonName` | string | Pamokos rodomas pavadinimas |
| `lessonImage` | string | Pamokos paveikslėlio URL |
| `lessonDescription` | string | Pamokos santrauka (katalogo tekstas) |
| `bottomLine` | string | Vienas sakinys, skirtas tėvams namams (pasirinktinai) |
| `verse` | string | Įsimintinos Šventojo Rašto eilutės nuoroda ir trumpas tekstas (pasirinktinai) |
| `parentQuestion` | string | Vienas klausimas, kurį tėvai gali užduoti namuose (pasirinktinai) |
| `parentNote` | string | Papildoma pastaba tėvams, markdown (pasirinktinai) |
| `studyName` | string | Tėvinės studijos pavadinimas |
| `studySlug` | string | Tėvinės studijos URL draugiškas pavadinimas |
| `programName` | string | Tėvinės programos pavadinimas |
| `programSlug` | string | Tėvinės programos URL draugiškas pavadinimas |
| `programAbout` | string | Programos aprašymas |
| `downloads` | array | Atsisiunčiamų failų rinkiniai |
| `sections` | array | Eilės tvarka surikiuoti pamokos skyriai |

#### Skyrius

| Laukas | Tipas | Aprašymas |
|-------|------|-------------|
| `id` | string | Skyriaus identifikatorius |
| `name` | string | Skyriaus pavadinimas |
| `sort` | number | Rodymo tvarka |
| `materials` | string | Medžiagų ar pasiruošimo pastabos (pasirinktinai) |
| `actions` | array | Eilės tvarka surikiuoti veiksmai šiame skyriuje |

#### Veiksmas

| Laukas | Tipas | Aprašymas |
|-------|------|-------------|
| `id` | string | Veiksmo identifikatorius |
| `actionType` | string | Vienas iš: `play`, `text`, `question`, `quote`, `subhead` |
| `content` | string | Tekstinis turinys arba medijos etiketė |
| `sort` | number | Rodymo tvarka |
| `role` | string | Vaidmens pavadinimas, pvz., "Leader", "Kids" (pasirinktinai) |
| `roleId` | string | Vaidmens identifikatorius (pasirinktinai) |
| `files` | array | Medijos failai `play` veiksmams (pasirinktinai) |

#### Failas

| Laukas | Tipas | Aprašymas |
|-------|------|-------------|
| `id` | string | Failo identifikatorius |
| `name` | string | Failo pavadinimas |
| `url` | string | Tiesioginio atsisiuntimo URL |
| `streamUrl` | string | Srautinio perdavimo URL, pvz., Vimeo nuoroda (pasirinktinai) |
| `fileType` | string | MIME tipas (pvz., `video/mp4`, `image/jpeg`) |
| `seconds` | number | Garso ar vaizdo trukmė sekundėmis (pasirinktinai) |
| `bytes` | number | Failo dydis baitais (pasirinktinai) |
| `thumbnail` | string | Miniatiūros paveikslėlio URL (pasirinktinai) |
| `loop` | boolean | Ar medija turi kartotis (pasirinktinai, numatytoji reikšmė false) |

#### Atsisiuntimas

| Laukas | Tipas | Aprašymas |
|-------|------|-------------|
| `name` | string | Atsisiuntimo rinkinio pavadinimas (pvz., "Printable Materials") |
| `files` | array | Failai šiame atsisiuntimo rinkinyje (tie patys laukai kaip ir aukščiau aprašytame faile) |

## Veiksmų tipai

| Tipas | Paskirtis |
|------|---------|
| `play` | Medijos atkūrimas -- vaizdo, garso ar skaidrių demonstravimas. Privalo turėti `files`. |
| `text` | Statinis tekstas. Palaiko markdown stiliaus paryškinimą (`**tekstas**`). |
| `question` | Diskusijos ar apmąstymų klausimas auditorijai. |
| `quote` | Paryškinta citata ar Šventojo Rašto ištrauka. |
| `subhead` | Antraštė ar skirtukas skyriaus viduje. |

:::tip
Norėdami pamatyti veikiantį srauto pavyzdį, galite peržiūrėti įtaisytą Lessons.church turinio medį adresu `https://api.lessons.church/lessons/public/tree` ir atsisiųsti bet kurį vietos srauto URL iš jo.
:::
