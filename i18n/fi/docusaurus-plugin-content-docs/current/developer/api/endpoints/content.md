---
title: "Sisällön päätepisteet"
description: "Päätepisteiden viiteopas ChurchApps Content API:lle: verkkosivut, blogikirjoitukset, uudelleenohjaukset, saarnat, tapahtumat, tiedostot, Raamattu-haut ja laulut B1 Adminissa."
---

# Sisällön päätepisteet

<div class="article-intro">

Sisältömoduuli hallitsee verkkosivujen sivuja, osioita, elementtejä, lohkoja, blogijulkaisuja, uudelleenohjauksia, saarnoja, soittolistoja, suoratoistopalveluja, tapahtumia, kuratoituja kalentereita, tiedostoja, galleriaa, Raamatun käännöksiä ja jakeiden hakuja, lauluja, sovituksia, yleisiä tyylejä, kuvapankkikuvia ja asetuksia. Se on API:n suurin moduuli, ja se tukee CMS:ää, media- ja suoratoistoa, musiikin suunnittelua ja Raamattu-ominaisuuksia kaikissa ChurchApps-sovelluksissa.

</div>

**Perusreitti:** `/content`

## Sivut

Perusreitti: `/content/pages`

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/:churchId/tree?url=&id=` | Julkinen | — | Lataa koko sivupuu (osiot, elementit, lohkot) URL-osoitteen tai tunnuksen perusteella. Poistaa sisäiset tunnukset, kun haku tehdään URL-osoitteella. URL-pohjaiset haut noudattavat `pages.visibility`-asetusta: rajoitettu sivu palauttaa `{ restricted: true, visibility }`, ellei (valinnainen) JWT täytä rajoitusta |
| GET | `/public/:churchId` | Julkinen | — | Listaa julkiset sivut (`url`, `title`, `metaDescription`); vain `visibility = everyone` |
| GET | `/:id` | JWT | — | Hae sivu tunnuksen perusteella |
| GET | `/` | JWT | — | Listaa kaikki seurakunnan sivut |
| POST | `/duplicate/:id` | JWT | Content.Edit | Monista sivu kaikkine osioineen ja elementteineen |
| POST | `/temp/ai` | JWT | Content.Edit | Tallenna tekoälyn luoma sivu (sivu, osiot ja elementit yhdellä kutsulla) |
| POST | `/importTree` | JWT | Content.Edit | Luo sivu sisäkkäisestä puurakenteesta (`title`, `url`, `sections[].elements[]…`). Lisää aina kutsujan seurakuntaan; pyynnön rungon tunnukset ohitetaan. Rivien on sisällettävä `column`-lapsensa. Enintään 30 osiota / 500 elementtiä |
| POST | `/` | JWT | Content.Edit | Luo tai päivitä sivuja (erissä) |
| DELETE | `/:id` | JWT | Content.Edit | Poista sivu |

### Esimerkki: Lataa sivupuu

```
GET /content/pages/abc-church-id/tree?url=/about
```

```json
{
  "name": "About",
  "url": "/about",
  "sections": [
    {
      "background": "#FFFFFF",
      "textColor": "dark",
      "elements": [
        { "elementType": "textWithPhoto", "answers": { "text": "Welcome" } }
      ]
    }
  ]
}
```

## Osiot

Perusreitti: `/content/sections`

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Hae osio tunnuksen perusteella |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Monista osio tai muunna se uudelleenkäytettäväksi lohkoksi |
| POST | `/` | JWT | Content.Edit | Luo tai päivitä osioita (erissä). Päivittää lajittelujärjestyksen automaattisesti |
| DELETE | `/:id` | JWT | Content.Edit | Poista osio (päivittää lajittelujärjestyksen automaattisesti) |

## Elementit

Perusreitti: `/content/elements`

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Hae elementti tunnuksen perusteella |
| POST | `/duplicate/:id` | JWT | Content.Edit | Monista elementti kaikkine lapsineen |
| POST | `/` | JWT | Content.Edit | Luo tai päivitä elementtejä (erissä). Hallitsee rivien sarakkeita ja karusellin dioja automaattisesti |
| DELETE | `/:id` | JWT | Content.Edit | Poista elementti |

## Lohkot

Perusreitti: `/content/blocks`

Laajentaa vakio-CRUD-toimintoja (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` kantaluokasta, kirjoitukset vaativat Content.Edit-oikeuden).

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Hae lohko tunnuksen perusteella |
| GET | `/` | JWT | — | Listaa kaikki lohkot |
| GET | `/:churchId/tree/:id` | Julkinen | — | Lataa koko lohkopuu osioineen ja elementteineen |
| GET | `/blockType/:blockType` | JWT | — | Lataa lohkot tyypin mukaan (esim. footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Julkinen | — | Lataa seurakunnan alatunnisteen lohkopuu |
| POST | `/` | JWT | Content.Edit | Luo tai päivitä lohkoja |
| DELETE | `/:id` | JWT | Content.Edit | Poista lohko |

## Linkit

Perusreitti: `/content/links`

Laajentaa vakio-CRUD-toimintoja (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` kantaluokasta, kirjoitukset vaativat Content.Edit-oikeuden).

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Hae linkki tunnuksen perusteella |
| GET | `/` | JWT | — | Listaa kaikki linkit. Valinnainen `?category=`-suodatin. Lajittelee automaattisesti tallennuksen jälkeen |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Lataa linkit näkyvyyden mukaan suodatettuina (everyone, visitors, members, staff, groups) |
| GET | `/church/:churchId?category=` | Julkinen | — | Lataa seurakunnan linkit kategorian mukaan (julkinen) |
| POST | `/` | JWT | Content.Edit | Luo tai päivitä linkkejä (erissä). Lajittelee automaattisesti kategorian mukaan |
| DELETE | `/:id` | JWT | Content.Edit | Poista linkki |

## Yleiset tyylit

Perusreitti: `/content/globalStyles`

Laajentaa vakio-CRUD-toimintoja (POST `/`, DELETE `/:id` kantaluokasta, kirjoitukset vaativat Content.Edit-oikeuden).

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/church/:churchId` | Julkinen | — | Lataa seurakunnan yleiset tyylit (palauttaa oletukset, jos niitä ei ole asetettu) |
| GET | `/` | JWT | — | Lataa todennetun seurakunnan yleiset tyylit |
| POST | `/` | JWT | Content.Edit | Luo tai päivitä yleiset tyylit |
| DELETE | `/:id` | JWT | Content.Edit | Poista yleiset tyylit |

## Sivuhistoria

Perusreitti: `/content/pageHistory`

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/page/:pageId` | JWT | Content.Edit | Listaa sivun historiamerkinnät |
| GET | `/block/:blockId` | JWT | Content.Edit | Listaa lohkon historiamerkinnät |
| GET | `/:id` | JWT | Content.Edit | Hae historiamerkintä tunnuksen perusteella |
| POST | `/` | JWT | Content.Edit | Tallenna sivun/lohkon tilannekuva. Siivoaa säännöllisesti yli 30 päivää vanhat merkinnät |
| POST | `/restore/:id` | JWT | Content.Edit | Palauta sivu/lohko historian tilannekuvasta (poistaa nykyisen sisällön ja luo sen uudelleen tilannekuvasta) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Palauta upotetusta tilannekuva-objektista. Runko: `{ pageId, blockId, snapshot }` |

## Julkaisut (blogi)

Perusreitti: `/content/posts`

Blogijulkaisut ovat itsenäisiä rivejä: `title`, `slug` (uniikki seurakunnittain), `excerpt`, `content` (markdown-runko), `authorId`, `photoUrl`, `publishDate`, `category` ja `tags`. Julkaisu julkaistaan, kun `publishDate` on asetettu ja menneisyydessä. Lukupäätepisteet rikastavat jokaisen julkaisun `authorName`-kentällä, joka määritetään `authorId`:n perusteella. Katso [Verkkosivurakentajan arkkitehtuuri](../../architecture/website-builder.md#blog).

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Julkinen | — | Listaa julkaistut julkaisut sivutettuna (enintään 50 per sivu) |
| GET | `/public/:churchId/categories` | Julkinen | — | Erilliset kategoriat julkaistujen julkaisujen joukosta |
| GET | `/public/:churchId/slug/:slug` | Julkinen | — | Hae julkaistu julkaisu slugin perusteella |
| GET | `/rss/:churchId?siteUrl=` | Julkinen | — | RSS 2.0 -syöte julkaistuista julkaisuista (linkit muodostetaan muodossa `{siteUrl}/blog/{slug}`) |
| GET | `/:id` | JWT | — | Hae julkaisu tunnuksen perusteella |
| GET | `/` | JWT | — | Listaa seurakunnan kaikki julkaisut |
| POST | `/` | JWT | Content.Edit | Luo tai päivitä julkaisuja (erissä) |
| DELETE | `/:id` | JWT | Content.Edit | Poista julkaisu |

## Uudelleenohjaukset

Perusreitti: `/content/redirects`

Seurakuntakohtaiset URL-uudelleenohjaukset (`fromPath` → `toPath`), enintään 200 per seurakunta. Polut normalisoidaan (pienet kirjaimet, johtava kauttaviiva, ei loppukauttaviivaa), ja `fromPath` on uniikki seurakunnittain. B1App ratkaisee nämä mahdollisissa 404-tilanteissa ja antaa HTTP 308 -vastauksen.

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/public/:churchId?path=` | Julkinen | — | Ratkaise polku (tai listaa kaikki uudelleenohjaukset, kun `path` jätetään pois) |
| GET | `/:id` | JWT | — | Hae uudelleenohjaus tunnuksen perusteella |
| GET | `/` | JWT | — | Listaa seurakunnan kaikki uudelleenohjaukset |
| POST | `/` | JWT | Content.Edit | Luo tai päivitä uudelleenohjauksia. Hylkää `fromPath = toPath` ja noudattaa 200 rivin rajaa |
| DELETE | `/:id` | JWT | Content.Edit | Poista uudelleenohjaus |

## Saarnat

Perusreitti: `/content/sermons`

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/public/freeshowSample` | JWT | — | Hae esimerkki FreeShow-soittolistan rakenteesta |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Hae TV-sovelluksen kääre saarna-, oppitunti- ja FreeShow-lähteineen |
| GET | `/public/tvFeed/:churchId/:sermonId` | Julkinen | — | Hae yksittäinen saarna TV-syötteen soittolistana |
| GET | `/public/tvFeed/:churchId` | Julkinen | — | Hae kaikki julkiset soittolistat ja saarnat TV-syötteenä |
| GET | `/public/:churchId` | Julkinen | — | Listaa seurakunnan kaikki julkiset saarnat |
| GET | `/timeline?sermonIds=` | JWT | — | Lataa saarnojen aikajanatiedot |
| GET | `/lookup?videoType=&videoData=` | Julkinen | — | Hae saarnan metatiedot YouTubesta tai Vimeosta |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Luo tekoälyllä somejulkaisuehdotuksia saarnan tekstityksistä |
| GET | `/outline?url=&title=&author=` | JWT | — | Luo tekoälyllä oppitunnin runko URL-osoitteesta |
| GET | `/youtubeImport/:channelId` | JWT | — | Tuo videoita YouTube-kanavalta. YouTuben hakupalvelun otsikoihin ja kuvauksiin laittamat HTML-entiteetit (kuten `&amp;` ja `&#39;`) puretaan |
| GET | `/vimeoImport/:channelId` | JWT | — | Tuo videoita Vimeo-kanavalta |
| GET | `/:id` | JWT | — | Hae saarna tunnuksen perusteella |
| GET | `/` | JWT | — | Listaa kaikki saarnat |
| POST | `/` | JWT | StreamingServices.Edit | Luo tai päivitä saarnoja. Hyväksyy taulukon tai yksittäisen saarnaobjektin (palauttaa aina taulukon); tyhjä runko palauttaa 400. Tukee base64-pikkukuvan lataamista |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Poista saarna |

### Esimerkki: Hae YouTube-saarna

```
GET /content/sermons/lookup?videoType=youtube&videoData=dQw4w9WgXcQ
```

```json
{
  "title": "Sunday Service - Faith in Action",
  "description": "Pastor John speaks about faith...",
  "thumbnail": "https://img.youtube.com/vi/dQw4w9WgXcQ/default.jpg",
  "duration": 2400,
  "publishDate": "2025-01-15T10:00:00Z"
}
```

## Soittolistat

Perusreitti: `/content/playlists`

Laajentaa vakio-CRUD-toimintoja (GET `/:id`, GET `/`, DELETE `/:id` kantaluokasta, kirjoitukset vaativat StreamingServices.Edit-oikeuden).

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Hae soittolista tunnuksen perusteella |
| GET | `/` | JWT | — | Listaa kaikki soittolistat |
| GET | `/public/:churchId` | Julkinen | — | Listaa seurakunnan kaikki julkiset soittolistat |
| POST | `/` | JWT | StreamingServices.Edit | Luo tai päivitä soittolistoja (erissä, tukee base64-pikkukuvan lataamista) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Poista soittolista |

## Suoratoistopalvelut

Perusreitti: `/content/streamingServices`

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Hae palvelun salatun isäntächat-huoneen tunnus |
| GET | `/` | JWT | — | Listaa kaikki suoratoistopalvelut. Poistaa automaattisesti vanhentuneet ei-toistuvat palvelut ja siirtää toistuvia eteenpäin |
| POST | `/` | JWT | StreamingServices.Edit | Luo tai päivitä suoratoistopalveluja (erissä) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Poista suoratoistopalvelu (tyhjentää myös estetyt IP-osoitteet) |

## Tapahtumat

Perusreitti: `/content/events`

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Lataa ryhmän aikajanatapahtumat (sisältää poikkeuspäivät, joiden avulla poistetut esiintymät voidaan ohittaa) |
| GET | `/timeline?eventIds=` | JWT | — | Lataa nykyisen käyttäjän ryhmien aikajanatapahtumat (sisältää poikkeuspäivät) |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Julkinen | — | Tilaa tapahtumat ICS-kalenterisyötteenä |
| GET | `/group/:groupId` | JWT | — | Hae ryhmän tapahtumat (sisältää poikkeuspäivät) |
| GET | `/public/group/:churchId/:groupId` | Julkinen | — | Hae ryhmän julkiset tapahtumat |
| GET | `/public/:churchId/:id` | Julkinen | — | Hae yksi tapahtuma julkista sivua varten, `roomNames`-kentällä (huoneet varauksista, joita ei ole hylätty). Palauttaa `null` odottaville tai hylätyille tapahtumille sekä yksityisille tapahtumille, jotka eivät ota ilmoittautumisia vastaan |
| GET | `/public/:churchId/:id/ical` | Julkinen | — | Lataa yksittäinen tapahtuma `.ics`-tiedostona (`text/calendar`, poikkeuspäivät huomioitu). `404`, jos tapahtuma on piilotettu samojen sääntöjen mukaan |
| GET | `/:id` | JWT | — | Hae tapahtuma tunnuksen perusteella |
| POST | `/` | JWT | — | Luo tai päivitä tapahtumia (erissä) |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin tai ryhmän johtaja | Poista tapahtuma ja sen varaukset. Tapahtuman ryhmän johtajat voivat poistaa sen, ja pyytäjä voi peruuttaa oman odottavan pyyntönsä |

Tapahtumatietueet sisältävät `photoUrl`-kentän (16:9-tapahtumakuva, joka näkyy julkisella tapahtumasivulla ja tulevien tapahtumien laatoissa), `tags`-kentän (pilkuilla erotettu, käytetään verkkosivun Kalenteri-elementin tunnisteiden suodattimessa) sekä `notesViewRole`- ja `notesPostRole`-kentät (`staff`, kun arvo on `null`, `leaders` tai `members`). Ne rajoittavat tapahtuman `eventNote`-keskustelun käyttöä. Katso [Ryhmien ja tapahtumien muistiinpanojen käyttöoikeudet](./messaging.md#group-and-event-notes-access-control). Julkisten kuratoitujen tapahtumien vastauksissa on myös kunkin tapahtuman `photoUrl` ja `tags`.

## Tapahtumapoikkeukset

Perusreitti: `/content/eventExceptions`

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Hae tapahtumapoikkeus tunnuksen perusteella |
| POST | `/` | JWT | Content.Edit, Calendars.Admin tai ryhmän johtaja | Luo tai päivitä tapahtumapoikkeuksia (erissä). Johtajat voivat lisätä poikkeuksia vain johtamiensa ryhmien tapahtumille |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin tai ryhmän johtaja | Poista tapahtumapoikkeus |

## Kuratoidut kalenterit

Perusreitti: `/content/curatedCalendars`

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Hae kuratoitu kalenteri tunnuksen perusteella |
| GET | `/` | JWT | — | Listaa kaikki kuratoidut kalenterit |
| POST | `/` | JWT | Content.Edit | Luo tai päivitä kuratoituja kalentereita (erissä) |
| DELETE | `/:id` | JWT | Content.Edit | Poista kuratoitu kalenteri |

## Kuratoidut tapahtumat

Perusreitti: `/content/curatedEvents`

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Hae kuratoidun kalenterin tapahtumat (sisältää tapahtumien tiedot ja poikkeuspäivät, ellei `?withoutEvents` ole asetettu) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Julkinen | — | Hae kuratoidun kalenterin julkiset tapahtumat |
| GET | `/:id` | JWT | — | Hae kuratoitu tapahtuma tunnuksen perusteella |
| GET | `/` | JWT | — | Listaa kaikki kuratoidut tapahtumat |
| POST | `/` | JWT | Content.Edit | Luo tai päivitä kuratoituja tapahtumia. Tukee `eventIds`-taulukkoa tiettyjen ryhmätapahtumien lisäämiseen |
| DELETE | `/:id` | JWT | Content.Edit | Poista kuratoitu tapahtuma |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Poista tietty tapahtuma kuratoidusta kalenterista |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Poista kaikki ryhmän tapahtumat kuratoidusta kalenterista |

## Tiedostot

Perusreitti: `/content/files`

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/:contentType/:contentId` | JWT | — | Hae tiedostot sisältötyypin ja sisältötunnuksen mukaan |
| GET | `/` | JWT | — | Listaa kaikki seurakunnan verkkosivun tiedostot |
| GET | `/:id` | JWT | — | Hae tiedosto tunnuksen perusteella |
| POST | `/` | JWT | Content.Edit* | Lataa tiedostoja (base64). *Sallittu myös, jos käyttäjä on `contentId`:tä vastaavan ryhmän jäsen |
| POST | `/postUrl` | JWT | Content.Edit* | Hae esiallekirjoitettu S3-latausosoite. *Sallittu myös ryhmän jäsenille. Enintään 100 Mt per sisältökohde |
| DELETE | `/:id` | JWT | Content.Edit* | Poista tiedosto ja poista se tallennustilasta. *Sallittu myös ryhmän jäsenille |

## Galleria

Perusreitti: `/content/gallery`

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/stock/:folder` | Julkinen | — | Listaa kuvapankkikuvat kansiossa |
| GET | `/:folder` | JWT | Content.Edit | Listaa galleriakuvat kansiossa |
| POST | `/requestUpload` | JWT | Content.Edit | Hae esiallekirjoitettu S3-latausosoite galleriakuvalle |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Poista galleriakuva |

## Raamatut

Perusreitti: `/content/bibles`

Kaikki Raamattu-päätepisteet ovat julkisia (todennusta ei vaadita). Tiedot haetaan ulkoisista lähteistä ja tallennetaan välimuistiin paikallisesti. Pyynnöt api.bibleen aikakatkaistaan 15 sekunnin jälkeen, ja aikakatkaisu palauttaa **504**-vastauksen.

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/` | Julkinen | — | Listaa kaikki Raamatun käännökset (hakee lähteestä, jos välimuisti on tyhjä) |
| GET | `/stats?startDate=&endDate=` | Julkinen | — | Hae Raamatun hakutilastot päivämääräväliltä |
| GET | `/availableTranslations/:source` | Julkinen | — | Listaa lähteen saatavilla olevat käännökset (esim. api.bible) |
| GET | `/updateTranslations` | Julkinen | — | Synkronoi kaikki käännökset kaikista lähteistä |
| GET | `/updateTranslations/:source` | Julkinen | — | Synkronoi käännökset tietystä lähteestä |
| GET | `/updateCopyrights` | Julkinen | — | Päivitä tekijänoikeustiedot käännöksille, joilta ne puuttuvat |
| GET | `/:translationKey/updateCopyright` | Julkinen | — | Päivitä tietyn käännöksen tekijänoikeustiedot |
| GET | `/:translationKey/search?query=&limit=` | Julkinen | — | Hae jakeita käännöksestä |
| GET | `/:translationKey/books` | Julkinen | — | Hae käännöksen kirjat (tallentaa välimuistiin) |
| GET | `/:translationKey/:bookKey/chapters` | Julkinen | — | Hae kirjan luvut (tallentaa välimuistiin) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Julkinen | — | Hae luvun jakeet (tallentaa välimuistiin) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Julkinen | — | Hae jaevälin teksti. Kirjaa haut. Jotkin käännökset ohittavat välimuistin lisensointisyistä |

### Esimerkki: Hae jakeen teksti

```
GET /content/bibles/de4e12af7f28f599-02/verses/GEN.1.1-GEN.1.3
```

```json
[
  { "verseKey": "GEN.1.1", "content": "In the beginning God created the heavens and the earth.", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 1 },
  { "verseKey": "GEN.1.2", "content": "Now the earth was formless and empty...", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 2 },
  { "verseKey": "GEN.1.3", "content": "And God said, \"Let there be light,\" and there was light.", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 3 }
]
```

## Laulut

Perusreitti: `/content/songs`

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/search?q=` | JWT | — | Hae lauluja kyselyllä |
| GET | `/:id` | JWT | — | Hae laulu tunnuksen perusteella |
| GET | `/` | JWT | Content.Edit | Listaa kaikki laulut |
| POST | `/` | JWT | Content.Edit | Luo tai päivitä lauluja (erissä) |
| POST | `/import` | JWT | — | Tuo lauluja FreeShow'sta (erissä) |
| DELETE | `/:id` | JWT | Content.Edit | Poista laulu |

## Laulujen tiedot

Perusreitti: `/content/songDetails`

Laulujen tiedot ovat globaaleja (eivät seurakuntakohtaisia). Ne edustavat seurakuntien kesken jaettuja vakiomuotoisia laulujen metatietoja.

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Hae laulun tiedot tunnuksen perusteella (globaali) |
| GET | `/` | JWT | — | Listaa seurakunnan laulujen tiedot |
| POST | `/create` | JWT | — | Luo laulun tiedot PraiseCharts-tunnuksella (palauttaa olemassa olevan, jos se on jo luotu). Hakee metatiedot automaattisesti PraiseChartsista ja MusicBrainzistä |
| POST | `/` | JWT | — | Luo tai päivitä laulujen tietoja (erissä) |

## Laulujen tietolinkit

Perusreitti: `/content/songDetailLinks`

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Hae laulun tietolinkki tunnuksen perusteella |
| GET | `/songDetail/:songDetailId` | JWT | — | Hae kaikki laulun tietojen linkit |
| POST | `/` | JWT | — | Luo tai päivitä laulun tietolinkkejä (erissä). Hakee MusicBrainz-tiedot automaattisesti, jos linkitetty |
| DELETE | `/:id` | JWT | — | Poista laulun tietolinkki |

## Sovitukset

Perusreitti: `/content/arrangements`

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Hae sovitus tunnuksen perusteella |
| GET | `/song/:songId` | JWT | Content.Edit | Hae laulun sovitukset |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Hae laulun tiedon sovitukset |
| GET | `/` | JWT | Content.Edit | Listaa kaikki sovitukset |
| POST | `/` | JWT | Content.Edit | Luo tai päivitä sovituksia (erissä) |
| POST | `/freeShow/missing` | JWT | — | Etsi FreeShow-tunnukset, joita ei ole seurakunnassa. Runko: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Poista sovitus (poistaa myös sävellajit; poistaa laulun, jos sovituksia ei ole jäljellä) |

## Sovituksen sävellajit

Perusreitti: `/content/arrangementKeys`

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/presenter/:churchId/:id` | Julkinen | — | Hae sovituksen sävellaji koko laulutiedoilla esittäjänäkymää varten |
| GET | `/:id` | JWT | — | Hae sovituksen sävellaji tunnuksen perusteella |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Hae sovituksen sävellajit |
| GET | `/` | JWT | Content.Edit | Listaa kaikki sovituksen sävellajit |
| POST | `/` | JWT | Content.Edit | Luo tai päivitä sovituksen sävellajeja (erissä) |
| DELETE | `/:id` | JWT | Content.Edit | Poista sovituksen sävellaji |

## Asetukset

Perusreitti: `/content/settings`

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/my` | JWT | — | Hae nykyisen käyttäjän asetukset |
| GET | `/` | JWT | Settings.Edit | Hae kaikki seurakunnan asetukset |
| GET | `/public/:churchId` | Julkinen | — | Hae seurakunnan julkiset asetukset (palautetaan avain-arvo-pareina) |
| POST | `/my` | JWT | — | Tallenna käyttäjäkohtaiset asetukset (tukee base64-kuvien lataamista) |
| POST | `/` | JWT | Settings.Edit | Tallenna seurakuntakohtaiset asetukset (tukee base64-kuvien lataamista) |
| DELETE | `/my/:id` | JWT | — | Poista käyttäjäasetus |

## Esikatselu

Perusreitti: `/content/preview`

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/data/:key` | Julkinen | — | Lataa seurakunnan suoratoiston esikatselutiedot aliverkkotunnuksen avaimella (välilehdet, linkit, palvelut, saarnat) |

## Galleria (kuvapankkikuvat)

Perusreitti: `/content/stock`

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| POST | `/search` | Julkinen | — | Hae Pexels-kuvapankkikuvia. Runko: `{ term: "church" }` |

## PraiseCharts

Perusreitti: `/content/praiseCharts`

Integraatio PraiseChartsiin laulujen löytämistä ja nuottilatauksia varten.

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/raw/:id` | JWT | — | Hae laulun raakadata PraiseChartsista |
| GET | `/hasAccount` | JWT | — | Tarkista, onko käyttäjällä linkitetty PraiseCharts-tili |
| GET | `/search?q=` | JWT | — | Hae PraiseChartsin katalogista |
| GET | `/products/:id?keys=` | JWT | — | Hae laulun tuotteet (kirjastosta, jos todennettu, muuten katalogista) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Hae raakasovitusdata kirjastosta |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Lataa tiedosto PraiseChartsista (PDF tai ZIP). Palauttaa `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Julkinen | — | Hae PraiseChartsin OAuth-valtuutusosoite |
| GET | `/access?verifier=&token=&secret=` | JWT | — | Vaihda OAuth-varmenne käyttöoikeustunnukseen ja tallenna käyttäjäasetuksiin |
| GET | `/library` | JWT | — | Selaa käyttäjän PraiseCharts-kirjastoa |

## Tuki

Perusreitti: `/content/support`

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| POST | `/createAudio` | Julkinen | — | Muunna SSML MP3-äänitiedostoksi AWS Pollyn avulla. Runko: `{ ssml: "<speak>...</speak>" }` |

## Aiheeseen liittyvät sivut

- [Verkkosivurakentajan arkkitehtuuri](../../architecture/website-builder.md) -- Miten sivut, osiot, elementit, julkaisut ja uudelleenohjaukset liittyvät toisiinsa sovelluksissa
- [Jäsenyyden päätepisteet](./membership.md) -- Henkilöt, seurakunnat, ryhmät, roolit, oikeudet
- [Läsnäolon päätepisteet](./attendance.md) -- Palvelu- ja vierailuseuranta
- [Todennus ja oikeudet](./authentication.md) -- Kirjautumisvirta, JWT, oikeusmalli
- [Moduulin rakenne](../module-structure.md) -- Koodin järjestämisen mallit
