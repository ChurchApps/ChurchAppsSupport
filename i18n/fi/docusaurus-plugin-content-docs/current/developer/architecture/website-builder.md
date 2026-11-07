---
title: "Verkkosivustonrakentajan arkkitehtuuri"
---

# Verkkosivustonrakentajan arkkitehtuuri

<div class="article-intro">

Jokainen B1App-palvelun tarjoama seurakunnan verkkosivu renderöidään sisältöpuusta, jossa ovat sivut, osiot ja elementit. Puu on tallennettu ContentApi:hin ja sitä muokataan visuaalisesti B1Admin-sovelluksessa. Yksi yhteinen komponenttikirjasto renderöi sekä editorin esikatselun että julkisen sivuston, yksi elementtityyppikatalogi määrittelee, mitä sivulle voi lisätä, ja erillinen tekoälypalvelu voi luoda tai kirjoittaa puun uudelleen. Tämä sivu kuvaa koko pinon: elementtisopimuksen paketissa `@churchapps/helpers`, renderöintiputken, seurakuntatietoja käyttävät elementit, sivustolaajuiset widgetit, blogikerroksen, vain tietyille käyttäjille näkyvät sivut, SEO:n, tekoälygenerroinnin ja keskustelevat lomakkeet.

</div>

## Yleiskatsaus

```
┌──────────────────────────────┐             ┌─────────────────────────────────────────┐
│  B1Admin — editor            │             │  Api — /content module (ContentApi)     │
│  ContentEditor · SectionEdit │  POST /…    │                                         │
│  ElementEdit · PageLinkEdit  │ ──────────▶ │  pages ─ sections ─ elements   blocks   │
│  SiteWidgetsEdit · Blog      │             │  posts   redirects   settings   styles  │
└──────────┬───────────────────┘             └───────────────┬─────────────────────────┘
           │                                                 │ GET /content/pages/:churchId/tree?url=…
           │        shared render pipeline                   ▼            (anon, JWT honored)
           │   ┌───────────────────────────────┐   ┌─────────────────────────────────┐
           └──▶│  @churchapps/helpers          │◀──│  B1App — public site (Next.js)  │
               │    ElementTypes.ts (catalog)  │   │  Zone → Section → Element       │
               │  @churchapps/apphelper        │   │  + widgets, JSON-LD, sitemap,   │
               │    ElementRegistry, renderers │   │    redirects, branded 404       │
               │    SectionDivider, widgets    │   └───────────────┬─────────────────┘
               └───────────────────────────────┘                   │ church-data elements
┌──────────────────────────────┐                                   ▼
│  AskApi — /website/* (AI)    │             ┌─────────────────────────────────────────┐
│  generateSite · rewriteSection│            │  /giving/funds/public/…/total           │
│  generateAltText · metaDesc  │             │  /membership/groupmembers/public/…      │
│  returns JSON; B1Admin saves │             │  /attendance/servicetimes/public/…      │
└──────────────────────────────┘             └─────────────────────────────────────────┘
```

Kolme sääntöä pätee koko pinossa:

1. **Yksi puu, kaksi renderöijää.** Sivu on `pages → sections → elements` -puu, jossa jokainen solmu sisältää asetuksensa `answers`-JSON-lohkona. Samat apphelper-komponentit renderöivät vedä-ja-pudota-editorin B1Adminissa ja palvelimella renderöidyn julkisen sivuston B1Appissa. Erillistä "julkaisumuotoa" ei ole.
2. **Sopimus elää paketissa `@churchapps/helpers`.** `ElementTypes.ts` on ainoa elementtityyppien katalogi. Renderöijät ratkeavat apphelperin rekisterin kautta, ja editorin lomakkeet sijaitsevat B1Adminissa. Uuden elementtityypin lisääminen koskee kaikkia kolmea, tässä järjestyksessä.
3. **Julkinen sivusto lukee anonyymejä päätepisteitä.** Kaikki, mitä B1App tarvitsee (sivupuu, asetukset, blogikirjoitukset, uudelleenohjaukset ja muiden moduulien seurakuntatietojen päätepisteet), on julkista. Todennus on valinnainen: JWT anonyymissä puupäätepisteessä avaa vain jäsenille tarkoitetut sivut, mikään muu ei muutu.

## Sisältöpuu

Sisältömoduuli (`Api/src/modules/content`) hallinnoi rakentajan dataa:

| Taulu | Tehtävä |
|-------|---------|
| `pages` | Yksi sivu per URL-osoite: `url`, `title`, `layout`, sekä `visibility`/`groupIds` (käyttöoikeuksien rajaus) ja `metaDescription` (SEO) |
| `sections` | Vaakasuuntaiset kaistat sivulla (tai lohkossa): tausta, tekstin väri ja `answersJSON`, joka sisältää tyylit sekä `dividerTop`/`dividerBottom`-muotoerottimien asetukset |
| `elements` | Sisältöosat osion sisällä: `elementType` + `answersJSON`. Asettelutyypit (rivi/sarake, karuselli) voivat sisältää muita elementtejä |
| `blocks` | Uudelleenkäytettävät osio- ja elementtiryhmät (alatunnisteen lohkot, elementtilohkot), joita jaetaan sivujen kesken |
| `posts` | Itsenäiset blogikirjoitukset (katso [Blogi](#blog)) |
| `redirects` | Seurakuntakohtaiset `fromPath → toPath`-parit, enintään 200 (katso [SEO](#seo-and-discoverability)) |
| `settings` | Avain-arvo-parit seurakunnan asetuksille. `public`-merkityt rivit tarjoillaan anonyymisti ja sisältävät widgetien ja analytiikan asetukset |

Yhden URL-osoitteen koko puu saadaan yhdellä anonyymillä kutsulla, `GET /content/pages/:churchId/tree?url=/about`. B1App renderöi sivun palvelimella tästä. Editorin pyynnöt hakevat puun tunnisteen perusteella ja säilyttävät sisäiset tunnisteet.

## Elementtisopimus

### Katalogi (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` määrittelee jokaisen elementtityypin `ElementTypeDefinition`-rakenteena: `elementType`, `label`, `category`, `schemaVersion`, `defaults` sekä JSON-skeemamaisen `answersSchema`-kentän vastauksille. `validateElementAnswers()` on tarkoituksella salliva. Tuntemattomat tyypit ja ylimääräiset avaimet hyväksytään, joten vanha sisältö ei hajoa katalogin päivityksessä. **Tänään mukana on 35 tyyppiä:**

| Kategoria | Elementtityypit |
|-----------|-----------------|
| asettelu (6) | row, column, box, carousel, whiteSpace, block |
| sisältö (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| media (4) | image, gallery, video, map |
| seurakunta (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| edistynyt (2) | rawHTML, iframe |

`sermons`-elementti on seurakuntatyypeistä muokattavin. `layout`-vastaus valitsee `browse`-tilan (vanha koko selain), `grid`, `list` tai `featuredLatest`. `playlistId`, `itemCount`, `showTitles` ja `showDates` tarkentavat muita kuin selaustilan asetteluja.

`rawHTML`-elementillä on kaksi vastausta: `rawHTML` (merkintä) ja `javascript`. `innerHTML`:n kautta lisätyt skriptit eivät suority, joten `RawHTMLElement` luo uudelleen jokaisen merkinnän `<script>`-solmun tuoreena elementtinä. Näitä ei jäsennin lisännyt solmuja luotetaan CSP:n `strict-dynamic`-direktiivin alla. `javascript`-vastaus, joka alkaa merkillä `<` (toimittajan katkelma, joka on liitetty `<script>`-tageineen), jäsennetään merkinnäksi ja käsitellään samalla tavalla. Muuten se suoritetaan tavallisena inline-skriptinä. B1Admin merkitsee JavaScript-kenttään yksinäisen URL-osoitteen, koska yksinäinen URL suoritetaan tyhjänä skriptinä. `map`-elementti ei renderöi mitään eikä lataa Google Maps -skriptiä, jos Maps API -avainta ei ole määritetty.

### Renderöijät (`@churchapps/apphelper`)

Renderöijät sijaitsevat kansiossa `Packages/apphelper/src/website/components/elementTypes/`, yksi komponentti tyyppiä kohden. Ne ratkaistaan `ElementRegistry.ts`-tiedoston kautta. Kyseessä on kaksitasoinen kartta: `Element.tsx` rekisteröi oletusrenderöijän kaikille 35 tyypille (`registerDefaultElementRenderer`), ja isäntäsovellus voi korvata minkä tahansa niistä ajonaikaisesti (`registerElementRenderer`) haarauttamatta pakettia.

### Editorin lomakkeet (B1Admin)

Editorin tyyppikohtaiset asetuslomakkeet sijaitsevat kansiossa `B1Admin/src/site/admin/elements/`. `ElementEdit.tsx` ohjaa tyypin omalle komponentille (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) tai tyyppikohtaiselle sisäiselle kenttärakentajalle. Tekoälylle suunnattu peili tästä katalogista on API:n MCP-työkalu `describe_page_builder` (katso [MCP-palvelin](../api/mcp)).

Editorin esikatselu liittää saman `Theme`-komponentin kuin julkinen sivusto. Se asettaa `--headingFont`- ja `--bodyFont`-CSS-muuttujat seurakunnan yleisistä tyyleistä. B1App soveltaa nämä muuttujat tiedoston `pages.css` kautta, jota B1Admin ei voi tuoda. Siksi `ContentEditor.tsx` lisää `EDITOR_PAGE_FONT_CSS`-tyylit (`src/site/admin/editorCss.ts`), jotka soveltavat ne `.page`-elementin leipätekstiin ja `h1`–`h6`-otsikoihin. Ilman sitä esikatselussa otsikot näkyivät ylläpitosivuston fontilla.

### Osioiden muotoerottimet

Osioihin voi lisätä koristeellisia muotoerottimia kumpaan tahansa reunaan. Asetukset ovat osion `answersJSON`-kentässä objekteina `dividerTop` / `dividerBottom`: `{ shape, color, height, flip }`, jossa `shape` on yksi seuraavista: `wave, waves, slant, curve, triangle, peaks`. Apphelper toimittaa `SectionDivider`-komponentin ja `parseDividerConfig()`-apufunktion. Molempien sovellusten Section-renderöijät (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) jäsentävät vastaukset ja liittävät erottimen. B1Adminin `SectionEdit.tsx` tarjoaa valintakäyttöliittymän. Paketit toimittavat vain rakennuspalikan, ja osiotason kytkentä on käyttävien sovellusten vastuulla.

## Seurakuntatietoja käyttävät elementit

Kolme elementtityyppiä renderöi seurakunnan reaaliaikaista dataa kirjoitetun sisällön sijaan. Moduulien eristys pätee yhä: jokainen niistä kutsuu omistavan moduulin omaa julkista päätepistettä selaimesta.

| Elementti | Päätepiste | Huomautuksia |
|-----------|------------|--------------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Palauttaa `{ fundId, totalAmount, donationCount }`, valinnainen `?startDate=&endDate=`-aikaväli. Elementti vertaa tulosta `goalAmount`-vastaukseensa |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Vain pyynnöstä**: ryhmällä on oltava `publicRoster` asetettuna (oletuksena pois päältä). Projektio on tarkoituksella minimaalinen: `personId`, `displayName`, `leader` ja valokuva. Yhteystietoja tai demografisia kenttiä ei ole |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Palauttaa kampus → jumalanpalvelus → aika -puun. Apphelper-renderöijä tuottaa siitä parhaan yrityksen mukaan schema.org `Event` JSON-LD -datan (API palauttaa tavallista dataa) |

:::warning
`publicRoster` on `staffGrid`-elementin yksityisyysportti. Älä koskaan laajenna julkista ryhmäjäsenten projektiota tai ohita tätä lippua. Rosteripäätepiste on tarkoituksella anonyymi, ja minimaalinen kenttälista on turvallisuuden perusta.
:::

### Kalenterielementti ja tapahtumasivut

`calendar`-elementin vastaukset ovat `calendarType` (`group` | `curated`), `calendarId`, `display` (`month`, oletus, tai `upcoming`) ja `tag`. B1App korvaa apphelper-renderöijän tiedostossa `src/components/Element.tsx` kutsulla `registerElementRenderer("calendar", …)`:

- **`display: "upcoming"`** renderöi B1Appin `UpcomingEventsElement`-komponentin. Se lataa `GET /content/events/public/group/:churchId/:groupId` tai `GET /content/curatedEvents/public/calendar/:churchId/:curatedCalendarId`, laajentaa toistuvuudet funktiolla `buildOccurrences()` (`src/helpers/EventOccurrences.ts`, yksi esiintymä tapahtumaa kohden vuoden sisällä) ja näyttää ensimmäiset 12 valokuvaruutuina. Jos kuvaa `events.photoUrl` ei ole, näytetään otsikko teeman tummalla värillä. Ruudut linkittyvät osoitteeseen `/events/{id}`, ja mukana on Tilaa-valikko kalenterin ICS-syötettä varten.
- **`display: "month"`** renderöi apphelperin `CalendarElement`-komponentin `eventUrl`-takaisinkutsulla. `GroupCalendar` / `CuratedCalendar` → `EventCalendar` / `CuratedEventCalendar` siirtyy napsautuksessa tuohon osoitteeseen sen sijaan, että avaisi yksityiskohtaisen dialogin. B1Admin ei välitä `eventUrl`-kenttää, joten ylläpitokalenteri säilyttää dialogin.
- **`tag`** suodattaa molemmat näkymät funktiolla `EventHelper.hasTag()` (`@churchapps/helpers`). Vertailu ei välitä kirjainkoosta ja kohdistuu pilkuilla erotettuun `events.tags`-kenttään. Tyhjä arvo näyttää kaiken. Curated-kalenterin liitos valitsee `e.tags`-kentän, jotta curated-tapahtumilla on tagit.

Curated-tapahtumat linkittyvät `realEventId`-kentän kautta (`eventPageId()`), joten URL nimeää aina taustalla olevan tapahtuman. `/{sdSlug}/events/[eventId]` on oma reitti eikä osa rakentajan putkea. Se lataa `GET /content/events/public/:churchId/:id` -päätepisteen. Tämä palauttaa `null` odottaville ja hylätyille tapahtumille sekä yksityisille tapahtumille ilman ilmoittautumista, ja lisää `roomNames`-kentän hylkäämättömistä tilavarauksista. Reitti renderöi `EventPageContent`-komponentin: valokuvakuvan, Markdown-kuvauksen, Milloin/Missä-sivupalkin, **Rekisteröidy tapahtumaan** -painikkeen, kun `registrationEnabled` on päällä, sekä **Lisää omaan kalenteriin** -linkin osoitteeseen `GET /content/events/public/:churchId/:id/ical`. Valokuva toimii Open Graph -kuvana, ja seuraavalle esiintymälle tuotetaan `Event` JSON-LD `EventPageJsonLd`-komponentin kautta. Tuntematon tai piilotettu tapahtuma palauttaa oikean 404-vastauksen.

## Sivustolaajuiset widgetit

Kaksi widgetiä renderöityy jokaiselle julkiselle sivulle puun ulkopuolella: **AnnouncementBanner** (suljettava ilmoituspalkki sivun yläreunassa) ja **Launcher** (kelluva toimintakeskus antaa-, käy- ja katso-tyylisille linkeille). Molemmat komponentit ja niiden `parse*Config()`-apufunktiot toimitetaan apphelperissä. Asetukset ovat kaksi julkista asetusriviä, joiden avaimet ovat `announcementBanner` ja `launcher`. B1Adminin `SiteWidgetsEdit` kirjoittaa ne Ulkoasu-sivulla, ja B1Appin julkinen asettelu lukee ne päätepisteestä `GET /content/settings/public/:churchId`. API käsittelee nämä läpinäkyvinä avain-arvo-pareina. Avainten nimet ovat kahden sovelluksen välinen sopimus.

## Blogi

Blogi on itsenäinen sisältötyyppi, ei kerros rakentajan sivujen päällä. `posts`-rivi sisältää koko kirjoituksen: `title`, `slug`, `excerpt`, `content` (Markdown-runko), `authorId`, `photoUrl`, `publishDate`, `category` ja `tags`. Julkinen pinta koostuu seuraavista reiteistä. Kaikki ovat anonyymejä, ja ne on toteutettu `PostController`-ohjaimessa:

| Reitti | Tarkoitus |
|--------|-----------|
| `GET /content/posts/public/:churchId` | Julkaistut kirjoitukset, suodatettavissa `?category=&tag=`-parametreilla, sivutettu |
| `GET /content/posts/public/:churchId/categories` | Erilliset kategoriat julkaistuissa kirjoituksissa |
| `GET /content/posts/public/:churchId/slug/:slug` | Yksi julkaistu kirjoitus |
| `GET /content/posts/rss/:churchId?siteUrl=` | RSS 2.0 -syöte, jonka otsikkona on seurakunnan nimi. Jokaisella kohteella on kategoria sekä tiivistelmä tai sisällön kuvaus |

Kirjoitus on "julkaistu", kun `publishDate` on asetettu ja menneisyydessä. Tulevaisuuden `publishDate` tekee kirjoituksesta ajastetun: se on piilossa julkisesti ja näkyy ylläpidossa Ajastettu-merkillä. Lukupäätepisteet rikastavat jokaisen kirjoituksen kentällä `authorName`, joka ratkaistaan `authorId`:stä jäsenyysmoduulin gatewayn kautta. Puuttuva tiivistelmä korvataan muotoilemattomalla sisällöllä (noin 160 merkkiä) luettelokorteissa, metakuvauksissa ja RSS:ssä.

Luettelosivu `/{sdSlug}/blog` on toimituksellinen lista. Siinä on keskitetty otsikko, joka muuttuu suodatuksen aikana aktiivisen kategorian tai tunnisteen nimeksi, kategoriasirujen suodatusrivi sekä kirjoitusrivit, joissa pikkukuva on vasemmalla, ja tekijätiedot ja tiivistelmät. RSS-syöte on ilmoitettu vaihtoehtoisena linkkinä. Yksittäinen kirjoitus `/{sdSlug}/blog/[postSlug]` on oma reitti eikä Zone/Section-putki. Siinä on keskitetty otsikko (kategoriaotsikko, otsikko, tekijätieto ja pääväriin perustuva korostusviiva), 16:9-kuva säiliön leveydellä, Markdown-runko noin 720 pikselin lukusarakkeessa, tunnistesirut artikkelin alatunnisteessa, samankaltaisten kirjoitusten nauha otsikolla `"More in {category}"` sekä `BlogPosting`-JSON-LD, joka sisältää tekijän. Molemmat sivut tyylitellään kokonaan teemamerkeillä, joten ne perivät kunkin seurakunnan väripaletin. Blogi-URL-osoitteet sisältyvät seurakunnan sivustokarttaan.

B1Adminin kirjoitusnäkymä (**Sivusto → Blogi**) muokkaa kirjoituksia dialogissa. Siinä on Markdown-editori esikatselukytkimellä, 16:9-rajattu galleriakuvan valitsin, tekijän henkilövalitsin (oletuksena muokkaava käyttäjä), kategorian automaattinen täydennys olemassa olevien kategorioiden pohjalta, kaksoiskappaleen slug-tarkistus ja julkaisukytkin. Julkaistut rivit linkittyvät julkiseen kirjoitukseen, ja sivu kehottaa ylläpitäjiä lisäämään `/blog`-navigointilinkin.

Kommentit jätetään kolmannen osapuolen palveluille. Seurakuntakohtainen julkinen sisäasetus `blogFooterHtml` (muokataan **Jokaisen artikkelin alla** -kohdassa Blogi-sivulla, ja se näkyy vain Asetukset→Muokkaa-tilassa) renderöidään jokaisen kirjoituksen alle B1Appin `BlogFooterEmbed`-komponentilla. Komponentti luo `<script>`-tagit uudelleen, jotta ne suoritetaan `'strict-dynamic'`-direktiivin alla ja järjestyksessä. Ulkoisen `src`-skriptin on valmistuttava ennen seuraavaa inline-skriptiä, koska toimittajien katkelmat lataavat kirjaston ja kutsuvat sitä sen jälkeen.

## Vain jäsenille tarkoitetut sivut

`pages.visibility` käyttää uudelleen navigointilinkkien enum-arvoja: `everyone` (oletus), `visitors`, `members`, `staff`, `team` ja `groups` (`groupIds`-kentän kanssa). Arvo toimii kovana käyttöoikeusporttina, ei navigointisuodattimena (`PageVisibilityHelper.canViewPage`). Kulku on seuraava:

1. Anonyymi puupäätepiste tarkistaa näkyvyyden URL-pohjaisissa hauissa. Anonyymit pyytäjät rajatulle sivulle saavat `{ restricted: true, visibility }` sisällön sijaan, joten puu ei vuoda koskaan.
2. Päätepiste kunnioittaa edelleen JWT:tä. `CustomAuthProvider` tarkistaa `Authorization`-otsikon *jokaisesta* pyynnöstä, myös anonyymeistä reiteistä. Todennetun jäsenen haku samaan URL-osoitteeseen ratkeaa siksi normaalisti.
3. B1App renderöi `RestrictedPage`-sivun `restricted`-vastauksella. Se palauttaa istunnon tallennetuista tunnuksista, hakee puun uudelleen JWT:llä ja renderöi sen. Jos istuntoa ei ole, se näyttää kirjautumisportin `returnUrl`-parametrilla.

:::info
Portin tarkkuus vaihtelee tasoittain. `groups` tarkistaa tokenin `groupIds`-kentän sivun listaa vastaan, ja `staff` tarkistaa `membershipStatus`-kentän. `members` ja `team` hyväksyvät kuitenkin tällä hetkellä minkä tahansa seurakunnan todennetun käyttäjän. Pidä `groups`-vaihtoehtoa tiukimpana.
:::

## SEO ja löydettävyys

Tämä kaikki on B1Appin puolella tehtävää renderöintiä ContentApi-datan päällä. API tallentaa, sovellus tuottaa:

| Aihe | Toiminta |
|------|----------|
| Metakuvaukset | `pages.metaDescription` (enintään 300 merkkiä) kulkee funktion `MetaHelper.getMetaData()` kautta Next.js:n `Metadata`-objektiin (kuvaus ja Open Graph) jokaisella rakentajan renderöimällä reitillä. B1Adminin sivuasetuksissa on tekoälyllä toimiva Luo-painike (katso alla) |
| Uudelleenohjaukset | Seurakuntakohtaiset `redirects`-rivit, joita hallitaan osoitteessa `/content/redirects` (`content.edit`, 200 rivin raja, normalisoidut polut). Mahdollisessa 404-tilanteessa B1Appin sivureitti ratkaisee polun päätepisteen `GET /content/redirects/public/:churchId` avulla ja antaa HTTP 308 -uudelleenohjauksen Next:n `permanentRedirect`-funktiolla. Täsmäämättömät polut siirtyvät `notFound()`-funktioon |
| Brändätty 404 | `not-found.tsx` renderöi `BrandedNotFound`-komponentin seurakunnan logolla, nimellä ja teemalla yleisen virheen sijaan. Tuntemattomat `/register/[eventId]`-, `/events/[eventId]`-, `/stream/[pageSlug]`- ja `/volunteer/[planId]`-polut palauttavat oikean 404-vastauksen. Sama koskee tuntemattomia aliverkkotunnuksia ja virheellisiä sivu-slugeja (katso [Verkkosivujen reititys ja monisivustot](./websites)) |
| Jäsennelty data | `BlogPosting`-JSON-LD blogikirjoituksille. `VideoObject` jokaisen saarnan sivulla (`/{sdSlug}/sermons/[sermonId]`) ja sivuilla, joilla on `sermons`-elementti. `Event` kalenteri- ja tapahtumaelementeistä rakentajan sivuilla sekä jokaisella `/{sdSlug}/events/[eventId]`-sivulla (seuraava esiintymä, tapahtuman valokuva `image`-kenttänä). schema.org `Event` `serviceTimes`-elementistä |
| Saarnasivut | Jokainen julkinen saarna saa indeksoitavan sivun osoitteeseen `/sermons/[sermonId]` täydellisillä metatiedoilla. Saarnat eivät ole enää lukittuina asiakaspuolen selainelementin sisään |
| Analytiikka | Julkinen asetusavain `ga4MeasurementId` (hallitaan B1Adminissa uudelleenohjausten vieressä) lisää seurakuntakohtaisen GA4 gtag-koodin `next/script`-komponentilla. B1-sovellus (`/{sdSlug}/mobile`) lähettää sivunäyttönsä myös tähän tunnukseen ChurchAppsin oman tagin rinnalla, kun tunnus on kelvollinen `G-`-tunnus. GTM-konttitunnukset pysyvät vain verkkosivustolla. Jokaisessa `gtag('config')`-kutsussa on `display_mode`-arvo `installed` tai `browser`. Arvo perustuu `navigator.standalone`-ominaisuuteen tai `(display-mode: standalone)`-media-kyselyyn (`B1App/src/helpers/mobileAnalytics.ts`) |
| Sivustokartta ja syötteet | Seurakuntakohtainen `sitemap.xml`-reitti sisältää rakentajan sivut, blogi-URL-osoitteet ja 50 viimeisintä saarnasivua (`<lastmod>` jokaisen saarnan julkaisupäivästä). Se listaa myös sisäänrakennetut `/sermons`-, `/groups`- ja `/volunteer`-sivut, kun niissä on sisältöä (julkiset ryhmät, ilmoittautumissuunnitelmat). Poikkeus on tilanne, jossa tallennettu uudelleenohjaus korvaa polun. `/` jätetään pois, jos seurakunnalla ei ole etusivua, koska `/` ohjautuisi silloin kielletylle `/mobile`-polulle. Blogin luettelosivu mainostaa RSS-syötettä |
| Saavutettavuus | Julkinen kehys renderöi ohituslinkin, joka osoittaa `<main id="main-content">`-maamerkkiin jokaisessa asettelukääreessä |

## Tekoälygenerointi (AskApi)

Sivujen ja sivustojen generointi toimii **AskApi**-palvelussa. Se on erillinen palvelu, ja se toimii `/website`-ohjaimen alla. Palvelu todentaa samalla `CustomAuthProvider`-JWT:llä kuin kaikki muu. Se on **sisällön suhteen tilaton**: jokainen päätepiste palauttaa JSON-muotoista dataa, ja kutsuja (B1Admin) tallentaa tuloksen ContentApi:n kautta. Esimerkiksi `POST /content/pages/importTree` luo sivun täydellisen sisäkkäisen osio- ja elementtipuun kanssa yhdellä kutsulla. Se lisää sivun aina kutsujan seurakuntaan ja jättää huomiotta pyynnön rungon tunnisteet.

### Sivujen generointi (`planPage` → `writePage`)

B1Adminin `AddPageModal`-komponentin "AI"-sivumalli käyttää edullista putkea (`AskApi/src/helpers/SiteGenHelper.ts`). Putki perustuu yhteen sääntöön: **yksikään malli ei koskaan tuota rakentajan JSON-dataa**. Kaksi mallia jakavat työn Vercel AI Gatewayn kautta. Yhteys on tavallista HTTP:tä, ja avain luetaan SSM-polusta `/{env}/aiGatewayApiKey` tai ympäristömuuttujasta `AI_GATEWAY_API_KEY`:

- **JEV** (`typesafe-ai/jev`) on tyypitetty päätösmalli. Se palauttaa valintoja, pisteitä ja totuusarvoja todennäköisyyksineen, mutta ei osaa kirjoittaa tekstiä. Se valitsee vuorollaan jokaisen osion kiinteästä mallikirjastosta, pisteyttää asetteluja, tarkistaa tekstin faktat sekä valitsee kuvapankin kuvat ja kuvakkeet. Syöte maksaa noin 0,04 dollaria miljoonaa tokenia kohden ja tuloste on ilmainen, joten noin 90 kutsua sivua kohden maksaa murto-osan sentistä.
- **Pieni keskustelumalli (oletuksena GPT-4.1 mini)** täyttää valittujen mallien nimetyt ja pituusrajoitetut tekstipaikat. Kirjoittaja on yksi vakio, jonka voi ohittaa ympäristömuuttujalla `SITEGEN_COPY_MODEL`. Arvona kelpaa mikä tahansa keskustelumallin tunnus gatewayssa, esimerkiksi `anthropic/claude-haiku-4.5`. Sokkotestissä kolmella seurakunnalla Claude Haiku 4.5 kuulosti hieman lämpimämmältä, mutta GPT-4.1 mini oli lähellä. Se on noin nelinkertaisesti halvempi ja nopeampi, joten se on oletus. Täysi sivu kaikilla kolmella asettelulla maksaa noin 1,3 senttiä, josta noin 80 % on kirjoittajan osuus.

| Vaihe | Päätepiste | Mitä tapahtuu |
|-------|------------|---------------|
| 1 | `POST /website/planPage` | Luokittelee sivutyypin (etusivu, vierailu, tietoa…) ja poimii 10 ehdokasasettelua JEV:n kierroskohtaisista todennäköisyyksistä: hero, osioiden määrä, jokainen osio ja päätös. Ehdokkaat poistetaan kaksoiskappaleina, ja JEV pisteyttää jokaisen sopivuuden, sujuvuuden ja aukkojen osalta. Palautukseen tulevat parhaat 3, kirjoitustyyli ja `suggestedStyle`-ehdotus (paletti ja fontit). Ehdokkaat, joilla on tähän asti samat osiot, esittävät JEV:lle saman kysymyksen, joten kierrokset muistetaan etuliitteen mukaan. Paras pistemäärä alle 6 kirjataan `lowLayoutScore`-merkinnällä. Tämä loki on lista malleista, jotka kannattaa lisätä. Noin 2 s |
| 2 | `POST /website/writePage` (yksi kutsu ehdokasta kohden) | Kirjoittaja täyttää paikkojen tekstit kaksi osiota kerrallaan rinnakkain ja palauttaa viisi hero-otsikkoa, joista JEV valitsee. JEV tarkistaa jokaisen osion faktat. Osiot, jotka epäonnistuvat, käyttävät valmiita fraaseja tai toistavat aiemman osion (jaetut 4 sanan jaksot tarkistetaan koodissa), kirjoitetaan uudelleen rinnakkain syyn kera. Koodin siivous poistaa lauseet, joissa on valmiita seurakuntasivuston fraaseja, paitsi jos seurakunnan oma kuvaus käyttää niitä. JEV valitsee kuvien aiheet, kuvakkeet ja heron muotoerottimen sekä pisteyttää tuloksen. Palautukseen tulee tallennusvalmis osiopuu ja pistemäärä. Noin 6–9 s |
| 3 | `POST /content/pages/importTree` | B1Admin kirjoittaa vain parhaiten sijoittuneen asettelun. Toiseksi paras on varasuunnitelma, jos kirjoitus epäonnistuu. Sitten B1Admin tallentaa sivun ja avaa esikatselun (noin 10 s tallennuksen jälkeen) |

Jokainen vaihe on oma pyyntönsä, jotta jokainen kutsu pysyy API Gatewayn 29 sekunnin rajan sisällä. `SiteGenHelper.buildTree`-mallit ovat kiinteitä osio- ja elementtipuita katalogista (`text`, `row`/`column`, `card`, `iconFeature`, `faq`, `table`, `testimonial`, `textWithPhoto`, `box`, `map`, `sermons`). Ne viittaavat teemamerkkeihin (`var(--accent)`, `var(--lightAccent)`…), joten generoidut sivut perivät seurakunnan olemassa olevat ulkoasuasetukset. Uuden osiomallin lisääminen tarkoittaa sen paikkalistan lisäämistä kohtaan `SECTIONS` ja sen puun lisäämistä kohtaan `buildTree`. Yksikkötesti käy läpi jokaisen mallin ja validoi puun.

**Syötteet.** Tekstit saavat esittää faktoja vain kahdesta lähteestä: käyttäjän kirjoittamasta sisällöstä ja `churchContext.facts`-kentästä. Jälkimmäinen sisältää tiedot, jotka B1Admin kerää ennen suunnittelua: julkiset jumalanpalveluksen ajat, julkisten ryhmien nimet sekä seurakunnan nimen ja osoitteen. Samat liput rajaavat dataan sidotut mallit. `times` renderöi live-`serviceTimes`-elementin, jos seurakunta ylläpitää jumalanpalvelusaikoja B1:ssä, ja muuten kirjoitetun taulukon. `groups` ja `countdown` tarjotaan vain, jos niiden takana on dataa. JEV-kutsut suojataan varakutsulla: kaksoiskappale käynnistyy 1,5 sekunnin kuluttua, ja ensimmäinen vastaus voittaa. Tämä on tarpeen, koska gateway pysähtyy silloin tällöin ja kutsut ovat lähes ilmaisia.

**Pysyminen aiheessa.** Käyttäjän kehote on *sivun aihe*, ei taustatietoa seurakunnasta. `planPage` luokittelee pyynnön (`home`, `visit`, `about`, `ministries`, `give`, `contact`, `event`, `topic`). `event`- ja `topic`-sivuilla yleisseurakunnan mallit eivät ole edes tarjolla: pastorin tervehdys, saarnat, toiminnat, ryhmät, yhteisövaikutus, viikkoajat ja laskuri sekä videoheero. Sen sijaan tarjolla ovat `details` (milloin, missä, mitä tuoda mukanaan) ja päivämäärän `eventCountdown`. Molemmat arvioijat pisteyttävät aiheen pysymisen. B1Admin välittää suunnitelman `pageType`-arvon jokaiseen `writePage`-kutsuun.

**Täydet sivut lyhyistä pyynnöistä.** Sivuilla on kolmesta kuuteen keskiosiota, reilut tekstipaikkojen pituudet, johdantorivi korttiosioissa ja viiden kysymyksen UKK. Korjausvaihe laajentaa jokaisen osion, joka palautuu ohuena. Generointi on yhden napsautuksen toiminto, eikä lisäkysymyksiä ole. Kun pyyntö jättää pois tavallisen yksityiskohdan, jota täydellinen sivu tarvitsee (aloitusajan, tilan, mitä tuoda mukanaan tai miten ilmoittautua), kirjoittaja täyttää sen uskottavalla ja maltillisella valinnalla, jonka seurakunta voi muokata. Koska osiot kirjoitetaan rinnakkain, nämä aukot ratkaistaan **kerran**, `planPage`-vaiheessa. Siellä `assumedDetails` kirjoitetaan yhdellä pienellä kirjoittajakutsulla, joka kulkee asettelunäytteistyksen rinnalla. Päätökset välitetään takaisin jokaiseen `writePage`-kutsuun `churchContext.assumedDetails`-kentän kautta, joten yksi osio ei voi sanoa 5:00 ja toinen 5:30. JEV korjaa jokaisen osion, joka on ristiriidassa pyynnön, seurakunnan tietojen tai näiden päätettyjen yksityiskohtien kanssa. Päätettyjä yksityiskohtia ei näytetä käyttöliittymässä. Seurakunta tarkistaa ja muokkaa sivua kuten mitä tahansa muuta. Joitain asioita ei koskaan keksitä: ihmisten nimet, puhelinnumerot, sähköposti- ja verkko-osoitteet, hinnat, tilastot, seurakunnan historia, ihmisille osoitetut lainaukset sekä viikonpäivä päivämäärälle, jota pyyntö ei ilmoittanut.

**Kuvat.** Mallit eivät koskaan nimeä kuviaan tai kuvakkeitaan. Ne jättävät paikkoja auki, ja yksi yleinen vaihe (`visualSlots` → `pickVisuals` → `applyVisuals` funktiossa `SiteGenHelper`) käy valmiin puun läpi ja täyttää jokaisen. Vaihe täyttää osion taustan tai galleriakohdan, joka on merkitty `auto:photo`-merkinnällä, `auto:icon`-kuvakkeen, heron `auto:divider`-erottimen sekä ilman merkintääkin jokaisen `textWithPhoto`-, `card`- tai `image`-elementin, jonka `photo` on tyhjä. JEV valitsee jokaisen kuvan sen vieressä olevan tekstin perusteella: kortin kuvan kortin otsikosta ja tekstistä, taustan osion tekstistä. Yhtään aihetta ei toisteta sivulla. Uusi malli saa siis kuvat ilmaiseksi. Kuvat ovat Pexels-hakuaiheita, jotka annetaan `pexels:<term>`-paikanpitäjinä. B1Admin ratkaisee ne `POST /content/stock/search`-päätepisteen kautta. Asiakas, joka ei lähetä `resolvesPhotos`-liputusta, saa sisäänrakennetun heron kuvan, tasaisia värikaistoja ja kortit ilman kuvia. Muotokuvien aiheita ei ole tarkoituksella, eikä pastorimallissa ole kuvaa. Vieras kuvapankin ihminen ei saa koskaan korvata oikeaa henkilöä. Seurakunnalle, jolla ei ole vielä sivuja, B1Admin soveltaa `suggestedStyle`-ehdotuksen yleisiin tyyleihin. Olemassa olevat sivustot säilyttävät ulkoasunsa.

### Muut päätepisteet

:::info
B1Adminin `SectionToolbar`-kirjoitauspainike ja sivulistan "Luo sivusto" -painike ovat edelleen kommentoituina asiakaspuolella. Alla olevat AskApi-päätepisteet vastaavat yhä. Vain käyttöliittymä on piilotettu.
:::

| Päätepiste | Tarkoitus |
|------------|-----------|
| `POST /website/generatePageOutline` → `generateSection` | Alkuperäinen kaksivaiheinen sivuvirta: runko, sitten yksi LLM-kutsu per osio, joka tuottaa elementti-JSON:ia. Korvattu B1Adminissa `planPage`/`writePage`-virralla kustannussyistä. Säilytetty API-käyttäjille |
| `POST /website/generateSite` | Koko sivuston generointi. **Kaksivaiheinen suunnittelun mukaan**: `planOnly: true` -kutsu palauttaa vain monisivuisen suunnitelman (yksi nopea mallikutsu). Sen jälkeen asiakas pyytää täyden sisällön. Näin jokainen pyyntö pysyy Lambda- ja API Gateway -aikarajan sisällä |
| `POST /website/rewriteSection` | Rakennetta säilyttävä uudelleenkirjoitus: malli saa muuttaa vain tekstiä sisältäviä vastauksia. Rekursiivinen rakennetunnus (tunnisteet, tyypit ja järjestys) verrataan ennen ja jälkeen. Jokainen poikkeama palauttaa alkuperäisen osion `fallback: true` -merkinnällä vioittuneen rakenteen sijaan |
| `POST /website/generateAltText` | Näkömallikutsu enintään 20 kuva-URL-osoitteelle. Palauttaa tiiviin alt-tekstin (enintään 125 merkkiä, ”photo of” -etuliitteet poistettu) |
| `POST /website/generateMetaDescription` | Yksi SEO-metakuvaus (enintään 155 merkkiä) sivun tekstisisällöstä. Kytketty B1Adminin sivuasetusten Luo-painikkeeseen |

Näiden päätepisteiden kehotteet ovat Markdown-tiedostoja kansiossa `AskApi/config/instructions/`, mukaan lukien elementtikatalogi, jonka pohjalta malli generoi. Kaksi suunnitteluratkaisua pitää katalogin rehellisenä. Ensinnäkin asiakas välittää `availableElementTypes`-kentän jokaisessa pyynnössä, joten kehote saa käyttää vain tuon listan tyyppejä. Palvelin ei koskaan kovakoodaa koko joukkoa. Toiseksi API:n MCP-työkalu `describe_page_builder` sisältää saman oppaan tekoälyagenteille, jotka työskentelevät [MCP:n](../api/mcp) kautta. Malleina on Anthropic Claude OpenRouterin kautta: 3.5 Haiku osion sisältöön (viiveen takia) sekä 3.5 Sonnet runkoihin, sivustosuunnitelmiin ja näkökykyyn. OpenAI-varamalli käytetään, jos OpenRouter-avainta ei ole määritetty.

## Keskustelevat lomakkeet

Lomakkeet (jäsenyysmoduuli) saivat keskustelutilan, joka on suunnattu yhteystietokortin kaltaisille sivuille. Neljä saraketta `forms`-taulussa ohjaavat sitä: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject` ja `followUpBody`.

- **Renderöinti**: apphelperin `FormSubmissionEdit` vaihtuu `ConversationalForm`-komponenttiin (yksi kysymys kerrallaan), kun `displayMode` on `conversational`. B1Appin lomakesivu välittää tilan eteenpäin. Lähetyksen sisältö on molemmissa tapauksissa sama.
- **Henkilön automaattinen luonti**: kun lähetys tehdään ja `autoCreatePerson` on asetettu, `ConversationalFormHelper.findOrCreatePerson` poistaa kaksoiskappaleet sähköpostin perusteella (kirjainkoosta riippumatta). Muuten se luo taloudelle ja henkilölle `membershipStatus: "Guest"`-tilan ja linkittää lähetyksen tuohon henkilöön.
- **Seurantasähköposti**: kun aihe ja runko on asetettu, lähettäjä saa mallipohjaisen sähköpostin tokeneilla `{firstName}` ja `{churchName}`. Viesti lähetetään olemassa olevan transaktioreitin kautta (`TransactionalEmailHelper`), ei koskaan ilmoitusten koosteen kautta. Molemmat sivuvaikutukset eivät ole kriittisiä, eli virhe ei koskaan menetä lähetystä.

Nämä neljä kenttää asetetaan tällä hetkellä API:n kautta. B1Adminin lomake-editori ei vielä näytä niitä.

## Julkisen sivuston välimuisti

B1Appin julkinen renderöintipolku tallentaa välimuistiin seurakuntatunnisteiset haut (`next: { revalidate: 300, tags: [sdSlug] }` tuotannossa ja `0` kehityksessä). Live-sivu voi siis pysyä vanhentuneena jopa viisi minuuttia ContentApi-kirjoituksen jälkeen. `POST /api/revalidate/{sdSlug}` B1Appissa kutsuu `revalidateTag(sdSlug)`-funktiota. Se on ainoa tapa poistaa välimuisti etukäteen.

Kaksi kirjoittajaa käyttää sitä:

1. **B1Admin**: `clearSiteCache()` tiedostossa `B1Admin/src/site/siteCache.ts` lähettää POST-pyynnön editorin tallennusten jälkeen. Se suosii aktiivisen sivuston aliverkkotunnusta. Toissijaisen sivuston on mitätöitävä *tuo* tunniste, ei seurakunnan oletusta.
2. **Api**: Sisältömuutokset, jotka eivät koskaan kulje B1Adminin kautta (API-avaimet, MCP, tekoäly), käynnistävät `SiteCacheHelper.bump(churchId)`-kutsun sisältöohjaimista. Apuohjelma ratkaisee seurakunnan aliverkkotunnuksen `SubDomainHelper`-luokan avulla ja lähettää POST-pyynnön osoitteeseen `{b1AppRoot}/api/revalidate/{sd}`. Virheet nielaistaan, jotta saavuttamaton B1App ei voi kaataa tallennusta.

Ohjaimet, jotka käynnistävät päivityksen: sivut (tallennus, poisto, kopiointi, julkaisu, hylkäys, julkaisun peruutus ja tekoälyn väliaikaiset), osiot, elementit, lohkot, linkit, yleiset tyylit, kirjoitukset ja uudelleenohjaukset. Kehityksen `b1AppRoot` on `http://{subdomain}.localtest.me:3301`. Demo- ja tuotantoympäristöt käyttävät osoitetta `https://{subdomain}.b1.church`.

## Aiheeseen liittyvät sivut

- [Verkkosivujen reititys ja monisivustot](./websites): miten pyyntö ratkaistaan seurakunnaksi ja sivustoksi ja miten mukautetut verkkotunnukset reititetään
- [Sisältöpäätepisteet](../api/endpoints/content): täydellinen REST-rajapinta sivuille, osioille, elementeille, lohkoille, kirjoituksille, uudelleenohjauksille ja asetuksille
- [AppHelper](../shared-libraries/app-helper): npm-paketti, joka toimittaa renderöijät, rekisterin, erottimet ja widgetit
- [MCP-palvelin](../api/mcp), mukaan lukien `describe_page_builder`-oppaan työkalu
- [Sivueditori (loppukäyttäjä)](/docs/b1-admin/website/page-editor): henkilökunnalle suunnattu editorin dokumentaatio
