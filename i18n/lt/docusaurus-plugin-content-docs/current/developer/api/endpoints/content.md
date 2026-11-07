---
title: "Turinio galutiniai taškai"
description: "Galutinių taškų nuoroda ChurchApps Content API: svetainių puslapiai, tinklaraščio įrašai, nukreipimai, pamokslai, renginiai, failai, Biblijos paieška ir dainos B1 Admin."
---

# Turinio galutiniai taškai

<div class="article-intro">

Turinio modulis valdo svetainės puslapius, skyrius, elementus, blokus, tinklaraščio įrašus, nukreipimus, pamokslus, grojaraščius, transliacijos paslaugas, renginius, kuruojamus kalendorius, failus, galerijas, Biblijos vertimus ir eilučių paiešką, dainas, aranžuotes, bendruosius stilius, nemokamas nuotraukas ir nustatymus. Tai didžiausias API modulis, o jis maitina turinio valdymo sistemą (CMS), medijos ir transliacijų, pamaldų planavimo bei Biblijos funkcijas visose ChurchApps programose.

</div>

**Bazinis kelias:** `/content`

## Puslapiai

Bazinis kelias: `/content/pages`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|-------------|
| GET | `/:churchId/tree?url=&id=` | Viešas | — | Įkelia visą puslapio medį (skyrius, elementus, blokus) pagal URL arba ID. Kai duomenys gaunami pagal URL, vidiniai ID pašalinami. URL pagrindu gaunami puslapiai tikrina `pages.visibility`. Puslapis su apribojimu grąžina `{ restricted: true, visibility }`, nebent (neprivalomas) JWT atitinka apribojimą |
| GET | `/public/:churchId` | Viešas | — | Išvardija viešus puslapius (`url`, `title`, `metaDescription`); tik su `visibility = everyone` |
| GET | `/:id` | JWT | — | Gauna puslapį pagal ID |
| GET | `/` | JWT | — | Išvardija visus bažnyčios puslapius |
| POST | `/duplicate/:id` | JWT | Content.Edit | Dubliuoja puslapį su visais skyriais ir elementais |
| POST | `/temp/ai` | JWT | Content.Edit | Išsaugo DI sugeneruotą puslapį (puslapį, skyrius ir elementus vienu kvietimu) |
| POST | `/importTree` | JWT | Content.Edit | Sukuria puslapį iš įdėto medžio (`title`, `url`, `sections[].elements[]…`). Visada įterpia po kvietėjo bažnyčia; užklausos turinio ID ignoruojami. Eilutės turi apimti savo `column` elementus. Daugiausia 30 skyrių ir 500 elementų |
| POST | `/` | JWT | Content.Edit | Sukuria arba atnaujina puslapius (paketu) |
| DELETE | `/:id` | JWT | Content.Edit | Ištrina puslapį |

### Pavyzdys: puslapio medžio įkėlimas

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

## Skyriai

Bazinis kelias: `/content/sections`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Gauna skyrių pagal ID |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Dubliuoja skyrių arba paverčia jį pakartotinai naudojamu bloku |
| POST | `/` | JWT | Content.Edit | Sukuria arba atnaujina skyrius (paketu). Automatiškai atnaujina rikiavimo tvarką |
| DELETE | `/:id` | JWT | Content.Edit | Ištrina skyrių (automatiškai atnaujina rikiavimo tvarką) |

## Elementai

Bazinis kelias: `/content/elements`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Gauna elementą pagal ID |
| POST | `/duplicate/:id` | JWT | Content.Edit | Dubliuoja elementą su visais jo vaikiniais elementais |
| POST | `/` | JWT | Content.Edit | Sukuria arba atnaujina elementus (paketu). Automatiškai tvarko eilučių stulpelius ir karuselės skaidres |
| DELETE | `/:id` | JWT | Content.Edit | Ištrina elementą |

## Blokai

Bazinis kelias: `/content/blocks`

Išplečia standartines CRUD operacijas (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` iš bazinės klasės, įrašymui reikalingas Content.Edit leidimas).

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Gauna bloką pagal ID |
| GET | `/` | JWT | — | Išvardija visus blokus |
| GET | `/:churchId/tree/:id` | Viešas | — | Įkelia visą bloko medį su skyriais ir elementais |
| GET | `/blockType/:blockType` | JWT | — | Įkelia blokus pagal tipą (pvz., footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Viešas | — | Įkelia bažnyčios poraštės bloko medį |
| POST | `/` | JWT | Content.Edit | Sukuria arba atnaujina blokus |
| DELETE | `/:id` | JWT | Content.Edit | Ištrina bloką |

## Nuorodos

Bazinis kelias: `/content/links`

Išplečia standartines CRUD operacijas (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` iš bazinės klasės, įrašymui reikalingas Content.Edit leidimas).

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Gauna nuorodą pagal ID |
| GET | `/` | JWT | — | Išvardija visas nuorodas. Pasirinktinis `?category=` filtras. Po išsaugojimo automatiškai rikiuoja |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Įkelia nuorodas, filtruotas pagal matomumą (everyone, visitors, members, staff, groups) |
| GET | `/church/:churchId?category=` | Viešas | — | Įkelia bažnyčios nuorodas pagal kategoriją (viešai) |
| POST | `/` | JWT | Content.Edit | Sukuria arba atnaujina nuorodas (paketu). Automatiškai rikiuoja pagal kategoriją |
| DELETE | `/:id` | JWT | Content.Edit | Ištrina nuorodą |

## Bendrieji stiliai

Bazinis kelias: `/content/globalStyles`

Išplečia standartines CRUD operacijas (POST `/`, DELETE `/:id` iš bazinės klasės, įrašymui reikalingas Content.Edit leidimas).

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|-------------|
| GET | `/church/:churchId` | Viešas | — | Įkelia bažnyčios bendruosius stilius (jei nenustatyta, grąžina numatytuosius) |
| GET | `/` | JWT | — | Įkelia autentifikuotos bažnyčios bendruosius stilius |
| POST | `/` | JWT | Content.Edit | Sukuria arba atnaujina bendruosius stilius |
| DELETE | `/:id` | JWT | Content.Edit | Ištrina bendruosius stilius |

## Puslapio istorija

Bazinis kelias: `/content/pageHistory`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | Išvardija puslapio istorijos įrašus |
| GET | `/block/:blockId` | JWT | Content.Edit | Išvardija bloko istorijos įrašus |
| GET | `/:id` | JWT | Content.Edit | Gauna istorijos įrašą pagal ID |
| POST | `/` | JWT | Content.Edit | Išsaugo puslapio arba bloko momentinę kopiją. Periodiškai išvalo įrašus, senesnius nei 30 dienų |
| POST | `/restore/:id` | JWT | Content.Edit | Atkuria puslapį arba bloką iš istorijos momentinės kopijos (ištrina dabartinį turinį ir sukuria jį iš naujo pagal momentinę kopiją) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Atkuria iš įterpto momentinės kopijos objekto. Turinys: `{ pageId, blockId, snapshot }` |

## Įrašai (tinklaraštis)

Bazinis kelias: `/content/posts`

Tinklaraščio įrašai yra savarankiškos eilutės: `title`, `slug` (unikalus kiekvienoje bažnyčioje), `excerpt`, `content` (Markdown tekstas), `authorId`, `photoUrl`, `publishDate`, `category` ir `tags`. Įrašas paskelbiamas, kai nustatyta `publishDate` ir ji yra praeityje. Skaitymo galutiniai taškai kiekvienam įrašui pridedą `authorName`, nustatytą pagal `authorId`. Žr. [Svetainės kūrėjo architektūra](../../architecture/website-builder.md#blog).

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Viešas | — | Išvardija paskelbtus įrašus puslapiais (daugiausia 50 puslapyje) |
| GET | `/public/:churchId/categories` | Viešas | — | Skirtingos kategorijos tarp paskelbtų įrašų |
| GET | `/public/:churchId/slug/:slug` | Viešas | — | Gauna paskelbtą įrašą pagal slug |
| GET | `/rss/:churchId?siteUrl=` | Viešas | — | RSS 2.0 paskelbtų įrašų kanalas (nuorodos formuojamos kaip `{siteUrl}/blog/{slug}`) |
| GET | `/:id` | JWT | — | Gauna įrašą pagal ID |
| GET | `/` | JWT | — | Išvardija visus bažnyčios įrašus |
| POST | `/` | JWT | Content.Edit | Sukuria arba atnaujina įrašus (paketu) |
| DELETE | `/:id` | JWT | Content.Edit | Ištrina įrašą |

## Nukreipimai

Bazinis kelias: `/content/redirects`

Kiekvienos bažnyčios URL nukreipimai (`fromPath` → `toPath`), ribojami iki 200 vienai bažnyčiai. Keliai normalizuojami (mažosiomis raidėmis, su pradiniu brūkšniu, be galinio brūkšnio), o `fromPath` yra unikalus kiekvienai bažnyčiai. B1App šiuos nukreipimus taiko, kai būtų gautas 404, ir išsiunčia HTTP 308.

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|-------------|
| GET | `/public/:churchId?path=` | Viešas | — | Išsprendžia kelią (arba išvardija visus nukreipimus, kai `path` nenurodytas) |
| GET | `/:id` | JWT | — | Gauna nukreipimą pagal ID |
| GET | `/` | JWT | — | Išvardija visus bažnyčios nukreipimus |
| POST | `/` | JWT | Content.Edit | Sukuria arba atnaujina nukreipimus. Atmeta `fromPath = toPath` ir taiko 200 eilučių ribą |
| DELETE | `/:id` | JWT | Content.Edit | Ištrina nukreipimą |

## Pamokslai

Bazinis kelias: `/content/sermons`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|-------------|
| GET | `/public/freeshowSample` | JWT | — | Gauna FreeShow grojaraščio struktūros pavyzdį |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Gauna TV programos apvalkalą su pamokslo, pamokos ir FreeShow šaltiniais |
| GET | `/public/tvFeed/:churchId/:sermonId` | Viešas | — | Gauna vieną pamokslą kaip TV kanalo grojaraštį |
| GET | `/public/tvFeed/:churchId` | Viešas | — | Gauna visus viešus grojaraščius / pamokslus kaip TV kanalą |
| GET | `/public/:churchId` | Viešas | — | Išvardija visus bažnyčios viešus pamokslus |
| GET | `/timeline?sermonIds=` | JWT | — | Įkelia pamokslų laiko juostos duomenis |
| GET | `/lookup?videoType=&videoData=` | Viešas | — | Ieško pamokslo metaduomenų YouTube ar Vimeo |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Sugeneruoja DI pasiūlymus socialinių tinklų įrašams pagal pamokslo subtitrus |
| GET | `/outline?url=&title=&author=` | JWT | — | Sugeneruoja DI pamokos planą pagal URL |
| GET | `/youtubeImport/:channelId` | JWT | — | Importuoja vaizdo įrašus iš YouTube kanalo. HTML simboliai (pvz., `&amp;` ir `&#39;`), kuriuos YouTube paieškos API įdeda į pavadinimus ir aprašymus, yra iškoduojami |
| GET | `/vimeoImport/:channelId` | JWT | — | Importuoja vaizdo įrašus iš Vimeo kanalo |
| GET | `/:id` | JWT | — | Gauna pamokslą pagal ID |
| GET | `/` | JWT | — | Išvardija visus pamokslus |
| POST | `/` | JWT | StreamingServices.Edit | Sukuria arba atnaujina pamokslus. Priima masyvą arba vieną pamokslo objektą (visada grąžina masyvą); tuščias turinys grąžina 400. Palaiko miniatiūros įkėlimą base64 formatu |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Ištrina pamokslą |

### Pavyzdys: YouTube pamokslo paieška

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

## Grojaraščiai

Bazinis kelias: `/content/playlists`

Išplečia standartines CRUD operacijas (GET `/:id`, GET `/`, DELETE `/:id` iš bazinės klasės, įrašymui reikalingas StreamingServices.Edit leidimas).

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Gauna grojaraštį pagal ID |
| GET | `/` | JWT | — | Išvardija visus grojaraščius |
| GET | `/public/:churchId` | Viešas | — | Išvardija visus bažnyčios viešus grojaraščius |
| POST | `/` | JWT | StreamingServices.Edit | Sukuria arba atnaujina grojaraščius (paketu, palaiko miniatiūros įkėlimą base64 formatu) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Ištrina grojaraštį |

## Transliacijos paslaugos

Bazinis kelias: `/content/streamingServices`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Gauna šifruotą paslaugos vedėjo pokalbių kambario ID |
| GET | `/` | JWT | — | Išvardija visas transliacijos paslaugas. Automatiškai išvalo pasibaigusias nepasikartojančias paslaugas ir perkelia pasikartojančias |
| POST | `/` | JWT | StreamingServices.Edit | Sukuria arba atnaujina transliacijos paslaugas (paketu) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Ištrina transliacijos paslaugą (taip pat išvalo užblokuotus IP adresus) |

## Renginiai

Bazinis kelias: `/content/events`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Įkelia grupės laiko juostos renginius (įtraukia išimties datas, kad būtų galima praleisti ištrintus pasikartojimus) |
| GET | `/timeline?eventIds=` | JWT | — | Įkelia dabartinio naudotojo grupių laiko juostos renginius (įtraukia išimties datas) |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Viešas | — | Prenumeruoja renginius kaip ICS kalendoriaus kanalą |
| GET | `/group/:groupId` | JWT | — | Gauna grupės renginius (įtraukia išimties datas) |
| GET | `/public/group/:churchId/:groupId` | Viešas | — | Gauna viešus grupės renginius |
| GET | `/public/:churchId/:id` | Viešas | — | Gauna vieną renginį jo viešam puslapiui su `roomNames` (kambariai iš rezervacijų, kurios nebuvo atmestos). Grąžina `null` laukiamiems ar atmestiems renginiams ir privatiems renginiams, kurie nepriima registracijų |
| GET | `/public/:churchId/:id/ical` | Viešas | — | Atsisiunčia šį vieną renginį kaip `.ics` failą (`text/calendar`, taikomos išimties datos). Grąžina `404`, jei renginys paslėptas pagal tas pačias taisykles |
| GET | `/:id` | JWT | — | Gauna renginį pagal ID |
| POST | `/` | JWT | — | Sukuria arba atnaujina renginius (paketu) |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin arba grupės vadovas | Ištrina renginį ir jo rezervacijas. Renginio grupės vadovai gali jį ištrinti, o prašytojas gali atšaukti savo laukiančią užklausą |

Renginių įrašuose yra `photoUrl` (16:9 renginio nuotrauka, rodoma viešame renginio puslapyje ir artėjančių renginių kortelėse), `tags` (atskirti kableliais, naudojami svetainės Kalendoriaus elemento žymų filtre) ir `notesViewRole` / `notesPostRole` (`staff`, kai `null`, `leaders` arba `members`), kurie valdo renginio `eventNote` pokalbio prieigą. Žr. [Grupės ir renginio pastabų prieigos valdymas](./messaging.md#group-and-event-notes-access-control). Viešų kuruojamų renginių atsakymuose taip pat pateikiami kiekvieno renginio `photoUrl` ir `tags`.

## Renginių išimtys

Bazinis kelias: `/content/eventExceptions`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Gauna renginio išimtį pagal ID |
| POST | `/` | JWT | Content.Edit, Calendars.Admin arba grupės vadovas | Sukuria arba atnaujina renginių išimtis (paketu). Vadovai gali pridėti išimtis tik toms grupių renginiams, kurių vadovai jie yra |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin arba grupės vadovas | Ištrina renginio išimtį |

## Kuruojami kalendoriai

Bazinis kelias: `/content/curatedCalendars`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Gauna kuruojamą kalendorių pagal ID |
| GET | `/` | JWT | — | Išvardija visus kuruojamus kalendorius |
| POST | `/` | JWT | Content.Edit | Sukuria arba atnaujina kuruojamus kalendorius (paketu) |
| DELETE | `/:id` | JWT | Content.Edit | Ištrina kuruojamą kalendorių |

## Kuruojami renginiai

Bazinis kelias: `/content/curatedEvents`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Gauna kalendoriaus kuruojamus renginius (įtraukia renginių detales ir išimties datas, nebent nustatytas `?withoutEvents`) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Viešas | — | Gauna viešus kalendoriaus kuruojamus renginius |
| GET | `/:id` | JWT | — | Gauna kuruojamą renginį pagal ID |
| GET | `/` | JWT | — | Išvardija visus kuruojamus renginius |
| POST | `/` | JWT | Content.Edit | Sukuria arba atnaujina kuruojamus renginius. Palaiko `eventIds` masyvą konkrečių grupių renginiams pridėti |
| DELETE | `/:id` | JWT | Content.Edit | Ištrina kuruojamą renginį |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Pašalina konkretų renginį iš kuruojamo kalendoriaus |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Pašalina visus grupės renginius iš kuruojamo kalendoriaus |

## Failai

Bazinis kelias: `/content/files`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | Gauna failus pagal turinio tipą ir turinio ID |
| GET | `/` | JWT | — | Išvardija visus bažnyčios svetainės failus |
| GET | `/:id` | JWT | — | Gauna failą pagal ID |
| POST | `/` | JWT | Content.Edit* | Įkelia failus (base64). *Leidžiama ir tada, jei naudotojas yra grupės, atitinkančios `contentId`, narys |
| POST | `/postUrl` | JWT | Content.Edit* | Gauna iš anksto pasirašytą S3 įkėlimo URL. *Leidžiama ir grupės nariams. Daugiausia 100 MB vienam turinio elementui |
| DELETE | `/:id` | JWT | Content.Edit* | Ištrina failą ir pašalina jį iš saugyklos. *Leidžiama ir grupės nariams |

## Galerija

Bazinis kelias: `/content/gallery`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|-------------|
| GET | `/stock/:folder` | Viešas | — | Išvardija nemokamas nuotraukas aplanke |
| GET | `/:folder` | JWT | Content.Edit | Išvardija galerijos paveikslėlius aplanke |
| POST | `/requestUpload` | JWT | Content.Edit | Gauna iš anksto pasirašytą S3 įkėlimo URL galerijos paveikslėliui |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Ištrina galerijos paveikslėlį |

## Biblijos

Bazinis kelias: `/content/bibles`

Visi Biblijos galutiniai taškai yra vieši (autentifikacija nereikalinga). Duomenys gaunami iš išorinių šaltinių ir saugomi vietinėje talpykloje. Užklausos į api.bible baigiasi po 15 sekundžių; skirtasis laikas grąžina **504**.

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|-------------|
| GET | `/` | Viešas | — | Išvardija visus Biblijos vertimus (jei talpykla tuščia, gauna iš šaltinio) |
| GET | `/stats?startDate=&endDate=` | Viešas | — | Gauna Biblijos paieškų statistiką nurodytam datų intervalui |
| GET | `/availableTranslations/:source` | Viešas | — | Išvardija galimus vertimus iš šaltinio (pvz., api.bible) |
| GET | `/updateTranslations` | Viešas | — | Sinchronizuoja visus vertimus iš visų šaltinių |
| GET | `/updateTranslations/:source` | Viešas | — | Sinchronizuoja vertimus iš konkretaus šaltinio |
| GET | `/updateCopyrights` | Viešas | — | Atnaujina autorių teisių informaciją vertimams, kuriems jos trūksta |
| GET | `/:translationKey/updateCopyright` | Viešas | — | Atnaujina konkretaus vertimo autorių teisių informaciją |
| GET | `/:translationKey/search?query=&limit=` | Viešas | — | Ieško eilučių vertime |
| GET | `/:translationKey/books` | Viešas | — | Gauna vertimo knygas (saugo vietinėje talpykloje) |
| GET | `/:translationKey/:bookKey/chapters` | Viešas | — | Gauna knygos skyrius (saugo vietinėje talpykloje) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Viešas | — | Gauna skyriaus eilutes (saugo vietinėje talpykloje) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Viešas | — | Gauna eilučių tekstą intervale. Registruoja paieškas. Kai kurie vertimai apeina talpyklą dėl licencijavimo |

### Pavyzdys: eilutės teksto gavimas

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

## Dainos

Bazinis kelias: `/content/songs`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|-------------|
| GET | `/search?q=` | JWT | — | Ieško dainų pagal užklausą |
| GET | `/:id` | JWT | — | Gauna dainą pagal ID |
| GET | `/` | JWT | Content.Edit | Išvardija visas dainas |
| POST | `/` | JWT | Content.Edit | Sukuria arba atnaujina dainas (paketu) |
| POST | `/import` | JWT | — | Importuoja dainas iš FreeShow (paketu) |
| DELETE | `/:id` | JWT | Content.Edit | Ištrina dainą |

## Dainų duomenys

Bazinis kelias: `/content/songDetails`

Dainų duomenys yra globalūs (ne priklausomi nuo bažnyčios). Jie atspindi kanoninius dainų metaduomenis, bendrus visoms bažnyčioms.

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Gauna dainos duomenis pagal ID (globaliai) |
| GET | `/` | JWT | — | Išvardija bažnyčios dainų duomenis |
| POST | `/create` | JWT | — | Sukuria dainos duomenis pagal PraiseCharts ID (jei jau sukurta, grąžina esamus). Automatiškai gauna metaduomenis iš PraiseCharts ir MusicBrainz |
| POST | `/` | JWT | — | Sukuria arba atnaujina dainos duomenis (paketu) |

## Dainų duomenų nuorodos

Bazinis kelias: `/content/songDetailLinks`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Gauna dainos duomenų nuorodą pagal ID |
| GET | `/songDetail/:songDetailId` | JWT | — | Gauna visas dainos duomenų nuorodas |
| POST | `/` | JWT | — | Sukuria arba atnaujina dainos duomenų nuorodas (paketu). Jei nuoroda susieta, automatiškai gauna MusicBrainz duomenis |
| DELETE | `/:id` | JWT | — | Ištrina dainos duomenų nuorodą |

## Aranžuotės

Bazinis kelias: `/content/arrangements`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Gauna aranžuotę pagal ID |
| GET | `/song/:songId` | JWT | Content.Edit | Gauna dainos aranžuotes |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Gauna dainos duomenų aranžuotes |
| GET | `/` | JWT | Content.Edit | Išvardija visas aranžuotes |
| POST | `/` | JWT | Content.Edit | Sukuria arba atnaujina aranžuotes (paketu) |
| POST | `/freeShow/missing` | JWT | — | Suranda FreeShow ID, kurių nėra bažnyčioje. Turinys: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Ištrina aranžuotę (taip pat ištrina tonacijas; ištrina dainą, jei aranžuočių nebeliko) |

## Aranžuotės tonacijos

Bazinis kelias: `/content/arrangementKeys`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|-------------|
| GET | `/presenter/:churchId/:id` | Viešas | — | Gauna aranžuotės tonaciją su pilnais dainos duomenimis pristatymo rodiniui |
| GET | `/:id` | JWT | — | Gauna aranžuotės tonaciją pagal ID |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Gauna aranžuotės tonacijas |
| GET | `/` | JWT | Content.Edit | Išvardija visas aranžuotės tonacijas |
| POST | `/` | JWT | Content.Edit | Sukuria arba atnaujina aranžuotės tonacijas (paketu) |
| DELETE | `/:id` | JWT | Content.Edit | Ištrina aranžuotės tonaciją |

## Nustatymai

Bazinis kelias: `/content/settings`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|-------------|
| GET | `/my` | JWT | — | Gauna dabartinio naudotojo nustatymus |
| GET | `/` | JWT | Settings.Edit | Gauna visus bažnyčios nustatymus |
| GET | `/public/:churchId` | Viešas | — | Gauna viešus bažnyčios nustatymus (grąžinami kaip raktų ir reikšmių poros) |
| POST | `/my` | JWT | — | Išsaugo naudotojo lygio nustatymus (palaiko paveikslėlių įkėlimą base64 formatu) |
| POST | `/` | JWT | Settings.Edit | Išsaugo bažnyčios lygio nustatymus (palaiko paveikslėlių įkėlimą base64 formatu) |
| DELETE | `/my/:id` | JWT | — | Ištrina naudotojo nustatymą |

## Peržiūra

Bazinis kelias: `/content/preview`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|-------------|
| GET | `/data/:key` | Viešas | — | Įkelia bažnyčios transliacijos peržiūros duomenis pagal subdomeno raktą (skirtukai, nuorodos, paslaugos, pamokslai) |

## Galerija (nemokamos nuotraukos)

Bazinis kelias: `/content/stock`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|-------------|
| POST | `/search` | Viešas | — | Ieško nemokamų Pexels nuotraukų. Turinys: `{ term: "church" }` |

## PraiseCharts

Bazinis kelias: `/content/praiseCharts`

Integracija su PraiseCharts dainų atradimui ir natų atsisiuntimams.

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|-------------|
| GET | `/raw/:id` | JWT | — | Gauna neapdorotus PraiseCharts dainos duomenis |
| GET | `/hasAccount` | JWT | — | Tikrina, ar naudotojas turi susietą PraiseCharts paskyrą |
| GET | `/search?q=` | JWT | — | Ieško PraiseCharts kataloge |
| GET | `/products/:id?keys=` | JWT | — | Gauna dainos produktus (iš bibliotekos, jei autentifikuota, kitaip iš katalogo) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Gauna neapdorotus aranžuotės duomenis iš bibliotekos |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Atsisiunčia failą iš PraiseCharts (PDF arba ZIP). Grąžina `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Viešas | — | Gauna PraiseCharts OAuth autorizacijos URL |
| GET | `/access?verifier=&token=&secret=` | JWT | — | Pakeičia OAuth patvirtinimo kodą į prieigos raktą ir išsaugo naudotojo nustatymuose |
| GET | `/library` | JWT | — | Naršo naudotojo PraiseCharts biblioteką |

## Palaikymas

Bazinis kelias: `/content/support`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|-------------|
| POST | `/createAudio` | Viešas | — | Konvertuoja SSML į MP3 garsą naudojant AWS Polly. Turinys: `{ ssml: "<speak>...</speak>" }` |

## Susiję puslapiai

- [Svetainės kūrėjo architektūra](../../architecture/website-builder.md) -- Kaip puslapiai, skyriai, elementai, įrašai ir nukreipimai susiję tarp programų
- [Narystės galutiniai taškai](./membership.md) -- Asmenys, bažnyčios, grupės, vaidmenys, leidimai
- [Lankomumo galutiniai taškai](./attendance.md) -- Pamaldų ir apsilankymų sekimas
- [Autentifikacija ir leidimai](./authentication.md) -- Prisijungimo eiga, JWT, leidimų modelis
- [Modulio struktūra](../module-structure.md) -- Kodo organizavimo modeliai
