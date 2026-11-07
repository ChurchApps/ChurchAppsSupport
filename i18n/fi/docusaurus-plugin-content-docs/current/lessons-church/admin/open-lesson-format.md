---
title: "Avoin oppituntimuoto"
description: "Muotomääritys ulkoisille opetussuunnitelmatarjoajille Lessons.churchissa: tarjoajapuu ja paikkasyötteen JSON-kentät, toiminnot ja mediatiedostot."
---

# Avoin oppituntimuoto

<div class="article-intro">

Avoin oppituntimuoto on standardoitu JSON-skeema, jonka avulla kolmannen osapuolen sisällöntuottajat voivat julkaista opetussuunnitelmia Lessons.church-palveluun. Mikä tahansa organisaatio, joka isännöi syötettä tässä muodossa, voidaan lisätä ulkoisena tarjoajana. Sen sisältö on silloin selattavissa ja toistettavissa sisäänrakennetun kirjaston rinnalla.

</div>

## Miten se toimii

Tarjoaja isännöi kahta tyyppiä päätepisteitä:

1. **Tarjoajapuu** -- Yksi URL-osoite, joka palauttaa koko ohjelmien, opintojaksojen, oppituntien ja toimipaikkojen luettelon. Jokainen toimipaikka sisältää syöte-URL-osoitteen, joka osoittaa yksityiskohtaiseen oppitunnin sisältöön.
2. **Toimipaikkasyöte** -- Yksi URL-osoite toimipaikkaa kohden, joka palauttaa koko oppitunnin sisällön (osiot, toiminnot ja mediatiedostot).

Kun kirkko lisää tarjoajan URL-osoitteen Lessons.church-palveluun, alusta hakee puun löytääkseen saatavilla olevan sisällön. Yksittäiset toimipaikkasyötteet haetaan tarvittaessa.

## Tarjoajapuu

Tarjoajan URL-osoitteen on palautettava JSON-objekti tällä rakenteella:

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

### Puun kentät

| Kenttä | Tyyppi | Kuvaus |
|-------|------|-------------|
| `programs[].id` | string | Ohjelman yksilöllinen tunniste |
| `programs[].name` | string | Näytettävä nimi |
| `programs[].slug` | string | URL-ystävällinen nimi |
| `programs[].image` | string | Ohjelman kuvan URL-osoite (valinnainen) |
| `programs[].about` | string | Kuvaus (valinnainen) |
| `studies[].id` | string | Opintojakson yksilöllinen tunniste |
| `studies[].name` | string | Näytettävä nimi |
| `studies[].slug` | string | URL-ystävällinen nimi |
| `studies[].image` | string | Opintojakson kuvan URL-osoite (valinnainen) |
| `lessons[].id` | string | Oppitunnin yksilöllinen tunniste |
| `lessons[].name` | string | Näytettävä nimi |
| `lessons[].slug` | string | URL-ystävällinen nimi |
| `lessons[].title` | string | Koko otsikko |
| `lessons[].image` | string | Oppitunnin kuvan URL-osoite (valinnainen) |
| `lessons[].description` | string | Oppitunnin yhteenveto (valinnainen). Luettelotieto, joka on tarkoitettu kirjastoa selaaville opettajille, ei vanhemmille tarkoitettua kotiviestiä. |
| `lessons[].bottomLine` | string | Yksi lause vanhemmille tarkoitetusta kotiviestistä (valinnainen) |
| `lessons[].verse` | string | Muistettava jae viitteineen ja lyhyine tekstineen (valinnainen) |
| `lessons[].parentQuestion` | string | Yksi kysymys, jonka vanhemmat voivat esittää kotona (valinnainen) |
| `lessons[].parentNote` | string | Valinnainen lisähuomautus vanhemmille (markdown) |
| `venues[].id` | string | Toimipaikan yksilöllinen tunniste |
| `venues[].name` | string | Toimipaikan nimi (esim. "Kids", "Adults", "Youth") |
| `venues[].apiUrl` | string | Toimipaikkasyötteen palauttava URL-osoite (katso alla) |

Neljä vanhempien kotiviestikenttää (`bottomLine`, `verse`, `parentQuestion`, `parentNote`) ovat valinnaisia sekä puussa että toimipaikkasyötteessä. Jos ne jätetään pois, niitä käsitellään tyhjinä. Älä kopioi `description`-kenttää niihin.

**Toimipaikat** edustavat saman oppitunnin eri versioita, jotka on räätälöity eri yleisöille, kuten ikäryhmille tai eri ympäristöihin.

## Toimipaikkasyöte

Jokaisen toimipaikan `apiUrl`-osoitteen on palautettava JSON-objekti, joka vastaa tätä skeemaa:

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

### Toimipaikkasyötteen kentät

#### Juuriobjekti

| Kenttä | Tyyppi | Kuvaus |
|-------|------|-------------|
| `id` | string | Toimipaikan tunniste |
| `name` | string | Toimipaikan nimi |
| `lessonId` | string | Oppitunnin tunniste |
| `lessonName` | string | Oppitunnin näytettävä nimi |
| `lessonImage` | string | Oppitunnin kuvan URL-osoite |
| `lessonDescription` | string | Oppitunnin yhteenveto (luettelotieto) |
| `bottomLine` | string | Yksi lause vanhemmille tarkoitetusta kotiviestistä (valinnainen) |
| `verse` | string | Muistettava jae viitteineen ja lyhyine tekstineen (valinnainen) |
| `parentQuestion` | string | Yksi kysymys, jonka vanhemmat voivat esittää kotona (valinnainen) |
| `parentNote` | string | Valinnainen lisähuomautus vanhemmille, markdown (valinnainen) |
| `studyName` | string | Vanhemman opintojakson nimi |
| `studySlug` | string | Vanhemman opintojakson URL-nimi |
| `programName` | string | Vanhemman ohjelman nimi |
| `programSlug` | string | Vanhemman ohjelman URL-nimi |
| `programAbout` | string | Ohjelman kuvaus |
| `downloads` | array | Ladattavat tiedostopaketit |
| `sections` | array | Järjestetyt oppituntiosiot |

#### Osio

| Kenttä | Tyyppi | Kuvaus |
|-------|------|-------------|
| `id` | string | Osion tunniste |
| `name` | string | Osion otsikko |
| `sort` | number | Näyttöjärjestys |
| `materials` | string | Materiaalit tai valmisteluohjeet (valinnainen) |
| `actions` | array | Tämän osion järjestetyt toiminnot |

#### Toiminto

| Kenttä | Tyyppi | Kuvaus |
|-------|------|-------------|
| `id` | string | Toiminnon tunniste |
| `actionType` | string | Yksi seuraavista: `play`, `text`, `question`, `quote`, `subhead` |
| `content` | string | Tekstisisältö tai median nimike |
| `sort` | number | Näyttöjärjestys |
| `role` | string | Roolin nimi, esim. "Leader" tai "Kids" (valinnainen) |
| `roleId` | string | Roolin tunniste (valinnainen) |
| `files` | array | Median tiedostot `play`-toiminnoille (valinnainen) |

#### Tiedosto

| Kenttä | Tyyppi | Kuvaus |
|-------|------|-------------|
| `id` | string | Tiedoston tunniste |
| `name` | string | Tiedoston nimi |
| `url` | string | Suora lataus-URL-osoite |
| `streamUrl` | string | Suoratoiston URL-osoite, esim. Vimeo-linkki (valinnainen) |
| `fileType` | string | MIME-tyyppi (esim. `video/mp4`, `image/jpeg`) |
| `seconds` | number | Kesto sekunneissa ääni- tai videosisällölle (valinnainen) |
| `bytes` | number | Tiedoston koko tavuina (valinnainen) |
| `thumbnail` | string | Pikkukuvan URL-osoite (valinnainen) |
| `loop` | boolean | Toistetaanko media silmukassa (valinnainen, oletus false) |

#### Lataus

| Kenttä | Tyyppi | Kuvaus |
|-------|------|-------------|
| `name` | string | Latauspaketin nimi (esim. "Tulostettavat materiaalit") |
| `files` | array | Tämän latauspaketin tiedostot (samat kentät kuin yllä olevalla File-rakenteella) |

## Toimintotyypit

| Tyyppi | Tarkoitus |
|------|---------|
| `play` | Median toisto -- video, ääni tai diaesitys. Täytyy sisältää `files`. |
| `text` | Staattinen tekstisisältö. Tukee markdown-tyylistä lihavointia (`**teksti**`). |
| `question` | Keskustelu- tai pohdintakysymys yleisölle. |
| `quote` | Korostettu lainaus tai raamatunkohta. |
| `subhead` | Otsikko tai väliotsikko osion sisällä. |

:::tip
Voit nähdä toimivan esimerkin syötteestä tarkastelemalla sisäänrakennettua Lessons.church-sisältöpuuta osoitteessa `https://api.lessons.church/lessons/public/tree` ja hakemalla sieltä minkä tahansa toimipaikkasyötteen URL-osoitteen.
:::
