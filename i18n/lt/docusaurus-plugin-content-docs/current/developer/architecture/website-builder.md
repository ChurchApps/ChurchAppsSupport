---
title: "Svetainių kūrėjo architektūra"
description: "B1 svetainių kūrėjo žemėlapis: turinio medis, bendras elementų katalogas, atvaizdavimo procesas ir DI puslapių kūrimas B1 Admin bei B1.church."
---

# Svetainių kūrėjo architektūra

<div class="article-intro">

Kiekvieną bažnyčios svetainę, kurią teikia B1App, atvaizduoja turinio medis (puslapiai, skyriai, elementai), saugomas ContentApi ir redaguojamas vizualiai B1Admin. Viena bendra komponentų biblioteka atvaizduoja ir redaktoriaus peržiūrą, ir tiesioginę svetainę. Vienas elementų tipų katalogas apibrėžia, kas gali atsirasti puslapyje, o atskira DI paslauga gali sugeneruoti arba perrašyti tą medį. Šis puslapis aprašo visą sistemą: elementų sąsają pakete `@churchapps/helpers`, atvaizdavimo grandinę, bažnyčios duomenų elementus, visos svetainės valdiklius, tinklaraščio sluoksnį, prieigos ribojamus puslapius, SEO, DI generavimą ir pokalbio formas.

</div>

## Apžvalga

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

Visos sistemos taisyklės yra tokios:

1. **Vienas medis, du atvaizdavimo įrankiai.** Puslapis yra medis `pages → sections → elements`, kur kiekvienas mazgas savo nustatymus saugo `answers` JSON duomenyse. Tos pačios apphelper komponentai atvaizduoja vilkimo ir numetimo redaktorių B1Admin ir serverio pusėje atvaizduojamą viešąją svetainę B1App. Atskiro „publikavimo formato" nėra.
2. **Sąsaja gyvena pakete `@churchapps/helpers`.** `ElementTypes.ts` yra vienintelis elementų tipų katalogas. Atvaizdavimo įrankiai pasiekiami per registrą apphelper pakete, o redaktoriaus formos yra B1Admin. Pridėjus naują elementų tipą, reikia keisti visus tris, šia tvarka.
3. **Viešoji svetainė skaito anoniminius galinius taškus.** Viskas, ko reikia B1App (puslapių medis, nustatymai, tinklaraščio įrašai, peradresavimai ir bažnyčios duomenų galiniai taškai kituose moduliuose), yra viešai pasiekiama. Autentifikacija neprivaloma: JWT anoniminiame medžio galiniame taške atrakina tik puslapius, skirtus nariams, ir nieko daugiau nekeičia.

## Turinio medis

Turinio modulis (`Api/src/modules/content`) valdo kūrėjo duomenis:

| Lentelė | Paskirtis |
|---------|-----------|
| `pages` | Vienas puslapis vienam URL: `url`, `title`, `layout`, taip pat `visibility`/`groupIds` (prieigos ribojimas) ir `metaDescription` (SEO) |
| `sections` | Horizontalios juostos puslapyje (arba bloke): fonas, teksto spalva ir `answersJSON`, kuriame saugomas stilius ir `dividerTop`/`dividerBottom` formos skirtukų nustatymai |
| `elements` | Turinio dalys skyriuje: `elementType` + `answersJSON`, įdėjimas galimas išdėstymo tipams (eilutė/stulpelis, karuselė) |
| `blocks` | Pakartotinai naudojami skyrių ar elementų rinkiniai (poraštės blokai, elementų blokai), bendri tarp puslapių |
| `posts` | Savarankiški tinklaraščio įrašai (žr. [Tinklaraštis](#blog)) |
| `redirects` | Kiekvienos bažnyčios poros `fromPath → toPath`, ribojamos iki 200 (žr. [SEO](#seo-and-discoverability)) |
| `settings` | Raktas-reikšmė bažnyčios nustatymai; eilutės pažymėtos `public` teikiamos anonimiškai ir turi valdiklių bei analitikos nustatymus |

Visas vieno URL medis grąžinamas vienu anonimišku užklausimu, `GET /content/pages/:churchId/tree?url=/about`, ir būtent iš jo B1App atvaizduoja puslapį serveryje. Redaktoriaus užklausos vietoj to gauna duomenis pagal id ir išlaiko vidinius id.

## Elemento sąsaja

### Katalogas (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` aprašo kiekvieną elementų tipą kaip `ElementTypeDefinition`: `elementType`, `label`, `category`, `schemaVersion`, `defaults` ir JSON schemos stiliaus `answersSchema` jo atsakymams. `validateElementAnswers()` tyčia yra švelni: nežinomi tipai ir papildomi raktai praeina, todėl senas turinys nenutrūksta atnaujinus katalogą. **Šiuo metu pateikiami 35 tipai:**

| Kategorija | Elementų tipai |
|------------|----------------|
| išdėstymas (6) | row, column, box, carousel, whiteSpace, block |
| turinys (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| medija (4) | image, gallery, video, map |
| bažnyčia (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| išplėstiniai (2) | rawHTML, iframe |

Elementas `sermons` yra labiausiai konfigūruojamas iš bažnytinių tipų: atsakymas `layout` pasirenka `browse` (senąją pilną naršyklę), `grid`, `list` arba `featuredLatest`. Ne naršyklės išdėstymams papildomai tikslina `playlistId`, `itemCount`, `showTitles` ir `showDates`.

Elementas `rawHTML` turi du atsakymus: `rawHTML` (žymėjimas) ir `javascript`. Skriptai, įterpti per `innerHTML`, niekada nevykdomi, todėl `RawHTMLElement` sukuria iš naujo kiekvieną `<script>` mazgą žymėjime kaip naują elementą. Šie mazgai, įterpti ne per analizatorių, yra patikimi pagal CSP `strict-dynamic`. Atsakymas `javascript`, prasidedantis `<` (tiekėjo fragmentas, įklijuotas su `<script>` žymėmis), analizuojamas kaip žymėjimas ir apdorojamas taip pat. Priešingu atveju jis vykdomas kaip paprastas įterptinis skriptas. B1Admin pažymi grynąjį URL JavaScript laukelyje, nes vienas URL vykdomas kaip tuščias skriptas. Elementas `map` neatvaizduoja nieko ir neįkelia Google Maps skripto, kai nesukonfigūruotas Maps API raktas.

### Atvaizdavimo įrankiai (`@churchapps/apphelper`)

Atvaizdavimo įrankiai yra `Packages/apphelper/src/website/components/elementTypes/` kataloge, po vieną komponentą kiekvienam tipui, ir pasiekiami per `ElementRegistry.ts`, dviejų sluoksnių žemėlapį. `Element.tsx` užregistruoja numatytąjį atvaizdavimo įrankį visiems 35 tipams (`registerDefaultElementRenderer`), o pagrindinė programa bet kurį iš jų gali pakeisti veikimo metu (`registerElementRenderer`), nesukurdama paketo kopijos.

### Redaktoriaus formos (B1Admin)

Kiekvieno tipo nustatymų formos redaktoriuje yra `B1Admin/src/site/admin/elements/` kataloge. `ElementEdit.tsx` perduoda užklausą atskiram komponentui (`GalleryEdit`, `TestimonialEdit`, `StatsEdit` ir kt.) arba įterptam lauko kūrėjui kiekvienam tipui. DI skirtas šio katalogo atspindys yra API MCP įrankis `describe_page_builder` (žr. [MCP serveris](../api/mcp.md)).

Redaktoriaus peržiūra prijungia tą patį `Theme` kaip ir tiesioginė svetainė. Jis nustato CSS kintamuosius `--headingFont` ir `--bodyFont` pagal bažnyčios bendrus stilius. B1App šiuos kintamuosius taiko per `pages.css`, kurio B1Admin negali importuoti, todėl `ContentEditor.tsx` įterpia `EDITOR_PAGE_FONT_CSS` (`src/site/admin/editorCss.ts`), kad jie būtų taikomi `.page` pagrindinio teksto ir `h1`–`h6` antraštėms. Be jo peržiūroje antraštės būtų rodomos administravimo šriftu.

### Skyrių formos skirtukai

Skyriai gali turėti dekoratyvius formos skirtukus bet kuriame krašte. Nustatymai saugomi skyriaus `answersJSON` kaip `dividerTop` / `dividerBottom` objektai: `{ shape, color, height, flip }`, kur `shape` yra vienas iš `wave, waves, slant, curve, triangle, peaks`. Apphelper pateikia komponentą `SectionDivider` ir pagalbinę funkciją `parseDividerConfig()`. Abiejų programų skyrių atvaizdavimo įrankiai (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) nuskaito atsakymus ir įdeda skirtuką. `SectionEdit.tsx` B1Admin pateikia formos pasirinkimo sąsają. Paketai teikia tik statybinį bloką, o skyriaus lygmens susiejimas yra naudojančių programų darbas.

## Bažnyčios duomenų elementai

Trys elementų tipai atvaizduoja gyvus bažnyčios duomenis, o ne autorinį turinį. Modulių izoliacija galioja ir čia: kiekvienas jų iš naršyklės kviečia savo modulio viešąjį galinį tašką:

| Elementas | Galinis taškas | Pastabos |
|-----------|----------------|----------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Grąžina `{ fundId, totalAmount, donationCount }`, pasirenkamas langas `?startDate=&endDate=`. Elementas palygina jį su savo atsakymu `goalAmount` |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Tik pasirinktinai**: grupei turi būti nustatytas `publicRoster` (numatytoji reikšmė išjungta). Projekcija tyčia minimali: `personId`, `displayName`, `leader`, nuotrauka. Kontaktų ar demografinių laukų nėra |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Grąžina medį: kampusas → pamaldos → laikas. Apphelper atvaizdavimo įrankis iš jo sugeneruoja schema.org `Event` JSON-LD, pagal galimybes (API grąžina paprastus duomenis) |

:::warning
`publicRoster` yra `staffGrid` privatumo vartai. Niekada neplėskite viešosios grupės narių projekcijos ir neapeikite šios žymos. Roster galinis taškas tyčia yra anoniminis, o minimalus laukų sąrašas yra saugumo savybė.
:::

### Kalendoriaus elementas ir renginių puslapiai

Elemento `calendar` atsakymai yra `calendarType` (`group` | `curated`), `calendarId`, `display` (`month`, numatytoji reikšmė, arba `upcoming`) ir `tag`. B1App perrašo apphelper atvaizdavimo įrankį `src/components/Element.tsx` su `registerElementRenderer("calendar", …)`:

- **`display: "upcoming"`** atvaizduoja B1App komponentą `UpcomingEventsElement`. Jis įkelia `GET /content/events/public/group/:churchId/:groupId` arba `GET /content/curatedEvents/public/calendar/:churchId/:curatedCalendarId`, išplečia pasikartojimus su `buildOccurrences()` (`src/helpers/EventOccurrences.ts`, po vieną įvykį per metus) ir rodo pirmuosius 12 kaip nuotraukų plyteles (`events.photoUrl`, o jei jos nėra, pavadinimą temos tamsiai spalvai), nuorodomis į `/events/{id}`. Yra meniu Prenumeruoti kalendoriaus ICS srautui.
- **`display: "month"`** atvaizduoja apphelper komponentą `CalendarElement` su `eventUrl` atgaliniu kvietimu. `GroupCalendar` / `CuratedCalendar` → `EventCalendar` / `CuratedEventCalendar` paspaudus nukreipia į tą URL, o ne atidaro išsamų dialogą (B1Admin neperduoda `eventUrl`, todėl administravimo kalendorius išlaiko dialogą).
- **`tag`** filtruoja abu rodinius naudodamas `EventHelper.hasTag()` (`@churchapps/helpers`): atitikimas be skirtumo tarp didžiųjų ir mažųjų raidžių su kableliais atskirtais `events.tags`. Tuščias laukas rodo viską. Kuravimo kalendoriaus jungtis parenka `e.tags`, kad kuruojami renginiai turėtų žymas.

Kuruojami renginiai nukreipia pagal `realEventId` (`eventPageId()`), todėl URL visada nurodo pagrindinį renginį. `/{sdSlug}/events/[eventId]` yra atskiras maršrutas (ne kūrėjo grandinė). Jis įkelia `GET /content/events/public/:churchId/:id`, kuris grąžina `null` laukiamiems ar atmestiems renginiams ir privatiems renginiams be registracijos. Be to, prideda `roomNames` iš nenuneštų kambarių rezervacijų. Jis atvaizduoja `EventPageContent` (nuotraukos antraštė, Markdown aprašymas, šoninė juosta Kada / Kur, **Registruotis į šį renginį**, kai `registrationEnabled`, ir nuoroda **Pridėti į mano kalendorių** į `GET /content/events/public/:churchId/:id/ical`). Nuotrauka naudojama kaip Open Graph vaizdas, o kitam pasikartojimui `EventPageJsonLd` sugeneruojamas `Event` JSON-LD. Nežinomas arba paslėptas renginys grąžina tikrą 404.

## Visos svetainės valdikliai

Du valdikliai rodomi kiekviename viešame puslapyje, o ne medžio viduje: **AnnouncementBanner** (juosta viršuje, kurią galima uždaryti) ir **Launcher** (plaukiantis veiksmų centras mygtukams, pvz., aukoti, apsilankyti ar žiūrėti). Abu komponentai ir jų `parse*Config()` pagalbinės funkcijos yra apphelper ppakete. Konfigūraciją sudaro du viešieji nustatymų įrašai, kurių raktai yra `announcementBanner` ir `launcher`. Juos įrašo B1Admin `SiteWidgetsEdit` (puslapyje Išvaizda), o skaito B1App viešasis maketas per `GET /content/settings/public/:churchId`. API šiuos įrašus traktuoja kaip neaiškias raktas-reikšmė poras. Raktų pavadinimai yra dviejų programų susitarimas.

## Tinklaraštis

Tinklaraštis yra savarankiškas turinio tipas, o ne sluoksnis virš kūrėjo puslapių. `posts` įrašas talpina visą įrašą: `title`, `slug`, `excerpt`, `content` (Markdown tekstas), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`. Viešoji dalis (visa anoniminė, `PostController`):

| Maršrutas | Paskirtis |
|-----------|-----------|
| `GET /content/posts/public/:churchId` | Paskelbti įrašai, filtruojami pagal `?category=&tag=`, su puslapiavimu |
| `GET /content/posts/public/:churchId/categories` | Skirtingos kategorijos tarp paskelbtų įrašų |
| `GET /content/posts/public/:churchId/slug/:slug` | Vienas paskelbtas įrašas |
| `GET /content/posts/rss/:churchId?siteUrl=` | RSS 2.0 srautas, pavadintas bažnyčios vardu, su kiekvieno elemento kategorija ir aprašymu (santrauka arba turinys) |

Įrašas laikomas „paskelbtu", kai nustatyta `publishDate` ir ji jau praėjusi. Ateities `publishDate` reiškia suplanuotą įrašą: viešai jis paslėptas, o administravime rodomas žyme Suplanuota. Skaitymo galiniai taškai papildo kiekvieną įrašą `authorName`, kuris nustatomas pagal `authorId` per narystės modulio šliuzą. Trūkstamos santraukos pakeičiamos turiniu be Markdown žymų (apie 160 simbolių) sąrašų kortelėse, meta aprašymuose ir RSS. B1App teikia `/{sdSlug}/blog`, redakcinį sąrašą (centruota antraštė, kuri filtruojant tampa aktyvios kategorijos ar žymos pavadinimu, kategorijų žymių eilutė, įrašai su miniatiūra kairėje, autoriai ir santraukos), o RSS srautas nurodomas kaip alternatyvi nuoroda. Taip pat teikia `/{sdSlug}/blog/[postSlug]`, atskirą maršrutą (ne Zone/Section grandinę). Jame yra centruota antraštė (kategorijos įvadas, pavadinimas, autorius, pagrindinės spalvos akcento linija), 16:9 antraštės nuotrauka konteinerio pločiu, Markdown tekstas ~720 px skaitymo stulpelyje, žymių žymės straipsnio poraštėje, eilutė `"Daugiau iš {category}"` su susijusiais įrašais ir `BlogPosting` JSON-LD, įskaitant autorių. Abu puslapiai formatuojami tik pagal temos žetonus, todėl paveldi kiekvienos bažnyčios paletę. Tinklaraščio URL įtraukiami į kiekvienos bažnyčios svetainės žemėlapį. B1Admin autorystės sąsaja (**Svetainė → Tinklaraštis**) redaguoja įrašus dialoge. Jame yra Markdown redaktorius su peržiūros perjungikliu, galerijos nuotraukų parinkiklis su 16:9 apkarpymu, autoriaus asmens parinkiklis (numatytai redaguojantis naudotojas), kategorijų automatinis užpildymas pagal jau esamas kategorijas, pasikartojančių nuorodų (slug) tikrinimas ir paskelbimo perjungiklis. Paskelbti įrašai nukreipia į tiesioginį įrašą, o puslapis primena administratoriams pridėti navigacijos nuorodą `/blog`. Komentarus palieka trečiųjų šalių paslaugoms. Visos bažnyčios viešasis turinio nustatymas `blogFooterHtml` (redaguojamas skiltyje **Po kiekvienu įrašu** puslapyje Tinklaraštis, rodomas tik per Nustatymai → Redaguoti) atvaizduojamas po kiekvienu įrašu B1App komponentu `BlogFooterEmbed`. Jis iš naujo sukuria `<script>` žymas, kad jos vykdytųsi pagal `'strict-dynamic'`, ir vykdo jas eilės tvarka (išorinis `src` baigia įkelti prieš einant prie kito įterptinio skripto). Tai svarbu, nes tiekėjų fragmentai pirmiausia įkelia biblioteką, o tada ją iškviečia.

## Tik nariams skirti puslapiai

`pages.visibility` naudoja navigacijos nuorodų sąrašą: `everyone` (numatytoji), `visitors`, `members`, `staff`, `team`, `groups` (su `groupIds`). Tačiau tai yra **griežtas prieigos vartai**, o ne navigacijos filtras (`PageVisibilityHelper.canViewPage`). Eiga tokia:

1. Anoniminis medžio galinis taškas tikrina matomumą URL pagrindu gaunamiems puslapiams. Anoniminiai užklausėjai, bandantys pasiekti ribojamą puslapį, gauna `{ restricted: true, visibility }` vietoj turinio, todėl medis niekada neatskleidžia duomenų.
2. Galinis taškas vis tiek priima JWT. `CustomAuthProvider` patikrina `Authorization` antraštę *kiekvienoje* užklausoje, įskaitant anoniminius maršrutus, todėl autentifikuoto nario užklausa tuo pačiu URL išsprendžiama įprastai.
3. B1App atvaizduoja `RestrictedPage`, kai gauna atsakymą `restricted`. Jis atkuria sesiją iš išsaugotų prisijungimo duomenų, iš naujo gauna medį su JWT ir jį atvaizduoja. Jei sesijos nėra, rodomas prisijungimo vartai su `returnUrl`.

:::info
Vartų detalumas skiriasi pagal lygį. `groups` tikrina prieigos žetono `groupIds` su puslapio sąrašu, o `staff` tikrina `membershipStatus`. Tačiau `members` ir `team` šiuo metu leidžia bet kurį bažnyčios autentifikuotą naudotoją. Laikykite `groups` griežtu pasirinkimu.
:::

## SEO ir matomumas paieškoje

Visa tai yra B1App pusės atvaizdavimas ContentApi duomenų pagrindu: API saugo, programa skelbia.

| Aspektas | Kaip veikia |
|----------|-------------|
| Meta aprašymai | `pages.metaDescription` (≤300 simbolių) per `MetaHelper.getMetaData()` patenka į Next.js `Metadata` (aprašymas ir Open Graph) kiekviename kūrėjo atvaizduojamame maršrute. B1Admin puslapio nustatymuose yra DI mygtukas „Generuoti" (žr. žemiau) |
| Peradresavimai | Kiekvienos bažnyčios `redirects` įrašai valdomi `/content/redirects` (`content.edit`, 200 eilučių riba, normalizuoti keliai). Kai būtų 404, B1App puslapio maršrutas nustato kelią pagal `GET /content/redirects/public/:churchId` ir išduoda HTTP 308 per Next `permanentRedirect`. Nesutapę keliai pereina į `notFound()` |
| Prekinio ženklo 404 | `not-found.tsx` atvaizduoja `BrandedNotFound` su bažnyčios logotipu, pavadinimu ir tema, o ne bendrą klaidą. Nežinomi keliai `/register/[eventId]`, `/events/[eventId]`, `/stream/[pageSlug]` ir `/volunteer/[planId]` grąžina tikrą 404, kaip ir nežinomi subdomenai bei netinkami puslapių slug (žr. [Svetainių maršrutizavimas ir kelios svetainės](./websites.md)) |
| Struktūrizuoti duomenys | `BlogPosting` JSON-LD tinklaraščio įrašams; `VideoObject` kiekvieno pamokslo puslapiuose (`/{sdSlug}/sermons/[sermonId]`) ir puslapiuose, kuriuose yra elementas `sermons`; `Event` iš kalendoriaus ir renginių elementų kūrėjo puslapiuose bei kiekviename `/{sdSlug}/events/[eventId]` puslapyje (kitas pasikartojimas, su renginio nuotrauka kaip `image`); schema.org `Event` iš elemento `serviceTimes` |
| Pamokslų puslapiai | Kiekvienas viešas pamokslas gauna indeksuojamą puslapį `/sermons/[sermonId]` su pilna meta informacija. Pamokslai nebėra užrakinti kliento pusės naršyklės elemente |
| Analitika | Viešasis nustatymas `ga4MeasurementId` (valdomas šalia peradresavimų B1Admin) įterpia kiekvienos bažnyčios GA4 gtag per `next/script`. B1 programa (`/{sdSlug}/mobile`) taip pat siunčia savo puslapių peržiūras į tą ID, kartu su ChurchApps žyma, jei tai galiojantis `G-` ID (GTM konteinerių ID lieka tik svetainėms). Kiekvienas `gtag('config')` turi `display_mode` reikšmę `installed` arba `browser`, pagal `navigator.standalone` arba `(display-mode: standalone)` medijos užklausą (`B1App/src/helpers/mobileAnalytics.ts`) |
| Žemėlapis ir srautai | Kiekvienos bažnyčios `sitemap.xml` maršrutas apima kūrėjo puslapius, tinklaraščio URL ir 50 naujausių pamokslų puslapių (su `<lastmod>` iš kiekvieno pamokslo publikavimo datos). Jis taip pat įtraukia įmontuotus puslapius `/sermons`, `/groups` ir `/volunteer`, kai jie turi turinio (viešos grupės, registracijos planai), nebent išsaugotas peradresavimas pakeičia tą kelią. `/` praleidžiama, kai bažnyčia neturi pagrindinio puslapio, nes tada `/` peradresuoja į neleidžiamą `/mobile`. Tinklaraščio sąrašas skelbia RSS srautą |
| Prieinamumas | Viešasis apvalkalas kiekviename maketo apvalkale atvaizduoja praleidimo nuorodą, nukreiptą į orientyrą `<main id="main-content">` |

## DI generavimas (AskApi)

Puslapių ir svetainių generavimas vyksta **AskApi**, atskiroje paslaugoje, pagal valdiklį `/website`. Ji autentifikuojasi tuo pačiu `CustomAuthProvider` JWT kaip ir visa kita, ir yra **be būsenos turinio atžvilgiu**. Kiekvienas galinis taškas grąžina JSON, o kviečiantysis (B1Admin) rezultatą išsaugo per ContentApi. `POST /content/pages/importTree` sukuria puslapį su pilnu įdėtu skyrių ir elementų medžiu vienu kvietimu. Jis visada įterpia po kviečiančiosios bažnyčios ir ignoruoja id, esančius turinyje.

### Puslapio generavimas (`planPage` → `writePage`)

DI puslapio šablonas B1Admin `AddPageModal` naudoja pigų vamzdyną (`AskApi/src/helpers/SiteGenHelper.ts`), paremtą viena taisykle: **joks modelis neskleidžia kūrėjo JSON**. Du modeliai pasidalija darbą per Vercel AI Gateway (paprastas HTTP, SSM raktas `/{env}/aiGatewayApiKey` arba `AI_GATEWAY_API_KEY`):

- **JEV** (`typesafe-ai/jev`): tipizuotas sprendimų modelis, kuris grąžina pasirinkimus, įvertinimus ir loginius teiginius su tikimybėmis, bet negali rašyti tekstų. Jis pasirenka kiekvieną skyrių iš fiksuotos šablonų bibliotekos, vertina išdėstymus, tikrina tekstų faktus ir parenka nuotraukas bei piktogramas. Įvestis kainuoja apie 0,04 USD už milijoną žetonų, o išvestis nemokama, todėl ~90 kvietimų vienam puslapiui kainuoja mažiau nei centą.
- **Mažas pokalbio modelis (numatytai GPT-4.1 mini)**: užpildo pavadintus, ilgiu ribojamus tekstų laukus pasirinktuose šablonuose. Rašytojas yra viena konstanta, kurią galima perrašyti aplinkos kintamuoju `SITEGEN_COPY_MODEL` (bet koks pokalbio modelio ID šliuze, pvz., `anthropic/claude-haiku-4.5`). Akli palyginimai trijose bažnyčiose parodė, kad Claude Haiku 4.5 skamba šiek tiek šilčiau, tačiau GPT-4.1 mini buvo panašus, apie 4 kartus pigesnis ir greitesnis, todėl jis yra numatytasis. Pilnas puslapis su visais trimis išdėstymais kainuoja apie 1,3 cento, iš kurių apie 80% tenka rašytojui.

| Etapas | Galinis taškas | Kas vyksta |
|--------|----------------|------------|
| 1 | `POST /website/planPage` | Klasifikuoja puslapio tipą (pagrindinis, apsilankymas, apie…), tada atrenka 10 kandidatų išdėstymų pagal JEV kiekvieno etapo tikimybes (antraštė + skyrių skaičius → kiekvienas skyrius → pabaiga), pašalina dublikatus, leidžia JEV įvertinti kiekvieną pagal tinkamumą, eigą ir spragas, ir grąžina geriausius 3 kartu su rašymo tonu ir `suggestedStyle` (paletė + šriftai). Kandidatai, kurie iki šiol turi tuos pačius skyrius, JEV uždeda identišką klausimą, todėl etapai įsimenami pagal priešdėlį. Geriausias įvertinimas žemiau 6 įrašomas kaip `lowLayoutScore`. Tas įrašas yra šablonų, kuriuos verta pridėti, sąrašas. ~2 s |
| 2 | `POST /website/writePage` (vienas kvietimas kiekvienam kandidatui) | Rašytojas užpildo tekstus po du skyrius viename kvietime lygiagrečiai ir grąžina penkias antraštes, iš kurių JEV pasirenka. JEV tikrina kiekvieno skyriaus faktus. Skyriai, kurie nepraeina tikrinimo, naudoja šabloninę frazę arba kartoja ankstesnį skyrių (bendri 4 žodžių fragmentai, tikrinami kode), perrašomi lygiagrečiai su konkrečia priežastimi. Kodo valymas pašalina sakinius su bažnytinių svetainių šabloninėmis frazėmis (nebent paties bažnyčios aprašymas jas naudoja). JEV parenka nuotraukų temas, piktogramas ir pagrindinio skirtuko formą, bei įvertina rezultatą. Grąžina paruoštą išsaugoti skyrių medį ir įvertinimą. ~6–9 s |
| 3 | `POST /content/pages/importTree` | B1Admin įrašo tik geriausiai įvertintą išdėstymą (antrasis yra atsarginis, jei tas įrašymas nepavyksta), jį išsaugo ir atidaro peržiūrą (~10 s po Išsaugoti) |

Kiekvienas etapas yra atskira užklausa, kad kiekvienas kvietimas tilptų į API Gateway 29 sekundžių ribą. Šablonai `SiteGenHelper.buildTree` yra fiksuoti skyrių ir elementų medžiai iš katalogo (`text`, `row`/`column`, `card`, `iconFeature`, `faq`, `table`, `testimonial`, `textWithPhoto`, `box`, `map`, `sermons`) ir nurodo temos žetonus (`var(--accent)`, `var(--lightAccent)`…), todėl sugeneruoti puslapiai paveldi esamus bažnyčios išvaizdos nustatymus. Pridedant skyriaus šabloną, reikia įtraukti jo tekstų laukų sąrašą į `SECTIONS` ir jo medį į `buildTree`. Vienetinis testas apeina kiekvieną šabloną ir patikrina medį.

**Įvestis.** Tekstuose galima nurodyti faktus tik iš dviejų šaltinių: to, ką įvedė naudotojas, ir `churchContext.facts`. Tai įrašai, kuriuos B1Admin surenka prieš planavimą (viešasis pamaldų laikas ir viešųjų grupių pavadinimai, taip pat bažnyčios pavadinimas ir adresas). Tos pačios vėliavėlės riboja šablonus, susietus su duomenimis: `times` atvaizduoja gyvą elementą `serviceTimes`, jei bažnyčia pamaldų laikus laiko B1 (priešingu atveju įvestą lentelę), o `groups` ir `countdown` siūlomi tik tada, kai už jų yra duomenų. JEV kvietimai yra apsaugoti: dublikatas paleidžiamas po 1,5 s, o pirmasis atsakymas laimi, nes šliuzas kartais sustoja, o kvietimai beveik nemokami.

**Likimas prie temos.** Naudotojo užklausa yra *puslapio tema*, o ne fonas apie bažnyčią. `planPage` klasifikuoja užklausą (`home`, `visit`, `about`, `ministries`, `give`, `contact`, `event`, `topic`). Puslapiams `event` ir `topic` bendrieji bažnyčios šablonai (pastoriaus žinutė, pamokslai, tarnystės, grupės, bendruomenės poveikis, savaitės laikas ir atgalinis skaitiklis, vaizdo pagrindinis skyrius) net nesiūlomi, o siūlomi `details` (kada / kur / ką atsinešti) ir datos `eventCountdown`. Abu vertintojai įvertina, ar tekstas atitinka temą. B1Admin perduoda `pageType` iš plano kiekvienam `writePage` kvietimui.

**Pilni puslapiai iš trumpų užklausų.** Puslapiuose yra trys–šeši vidurio skyriai, pakankamai ilgi tekstų laukai, įvadinė eilutė kortelių skyriuose ir penkių klausimų DUK. Remonto etapas išplečia kiekvieną per kuklų skyrių. Generavimas vyksta vienu paspaudimu: nėra papildomų klausimų. Jei užklausoje trūksta įprasto, pilnam puslapiui reikalingo detalės (pradžios laikas, kambarys, ką atsinešti, kaip registruotis), rašytojas įrašo pagrįstą, kuklų pasirinkimą, kurį bažnyčia gali redaguoti. Kadangi skyriai rašomi lygiagrečiai, tos spragos nustatomos **vieną kartą** `planPage` (`assumedDetails`, vienas mažas rašytojo kvietimas, veikiantis kartu su išdėstymų atranka) ir perduodamos kiekvienam `writePage` kvietimui per `churchContext.assumedDetails`. Taip vienas skyrius negali sakyti 5:00, o kitas 5:30. JEV taiso kiekvieną skyrių, kuris prieštarauja užklausai, bažnyčios įrašams ar nustatytoms detalėms. Nustatytos detalės vartotojo sąsajoje nerodomos. Bažnyčia peržiūri ir redaguoja puslapį kaip bet kurį kitą. Kai kurių dalykų niekada neišgalvojama: asmenų vardai, telefono numeriai, el. pašto ir interneto adresai, kainos, statistika, bažnyčios istorija, citatos, priskirtos asmenims, ir savaitės diena datai, kurios užklausoje nenurodyta.

**Vaizdai.** Šablonai niekada nenurodo savo nuotraukų ar piktogramų. Jie palieka tuščias vietas, o vienas bendras etapas (`visualSlots` → `pickVisuals` → `applyVisuals` `SiteGenHelper`) praeina baigtą medį ir užpildo kiekvieną: skyriaus foną ar galerijos įrašą, pažymėtą `auto:photo`, `auto:icon`, pagrindinio skyriaus `auto:divider`, ir bet kurį `textWithPhoto`, `card` ar `image` elementą, kurio `photo` tuščias ir kuris neturi žymos. JEV parenka kiekvieną pagal šalia esantį tekstą (kortelės nuotrauką pagal jos pavadinimą ir tekstą, foną pagal skyriaus turinį), o puslapyje tema nesikartoja. Todėl naujas šablonas automatiškai gauna nuotraukas. Nuotraukos yra Pexels paieškos temos, pateiktos kaip vietos žymekliai `pexels:<term>`, kuriuos B1Admin išsprendžia per `POST /content/stock/search`. Klientas, kuris nesiunčia `resolvesPhotos`, vietoj jų gauna įmontuotą pagrindinį paveikslėlį, vientisas spalvotas juostas ir kortelės be nuotraukų. Portretinių temų tyčia nėra, o pastoriaus šablonas nenaudoja nuotraukos, nes atsitiktinis nepažįstamas žmogus negali pakeisti tikro asmens. Bažnyčiai, kuri dar neturi puslapių, B1Admin pritaiko `suggestedStyle` globaliems stiliams. Esamos svetainės išlaiko savo išvaizdą.

### Kiti galiniai taškai

:::info
Mygtukas `SectionToolbar` perrašymui ir mygtukas „Generuoti svetainę" puslapių sąraše B1Admin kliento pusėje lieka užkomentuoti. Toliau nurodyti AskApi galiniai taškai vis tiek atsako. Paslėpta tik ši sąsaja.
:::

| Galinis taškas | Paskirtis |
|----------------|-----------|
| `POST /website/generatePageOutline` → `generateSection` | Originalus dviejų žingsnių puslapio srautas (struktūra, tada vienas LLM kvietimas kiekvienam skyriui, skleidžiantis elementų JSON). B1Admin pakeistas `planPage`/`writePage` dėl kainos. Paliktas API vartotojams |
| `POST /website/generateSite` | Visos svetainės generavimas. **Dviejų etapų pagal dizainą**: kvietimas `planOnly: true` grąžina tik kelių puslapių planą (vienas greitas modelio kvietimas), tada klientas prašo pilno turinio. Taip kiekviena užklausa lieka Lambda / API Gateway laiko ribose |
| `POST /website/rewriteSection` | Struktūrą išsaugantis perrašymas: modelis gali keisti tik tekstinius atsakymus. Prieš ir po perrašymo lyginamas rekursinis struktūros parašas (id + tipai + tvarka). Bet koks neatitikimas grąžina pradinį skyrių su `fallback: true`, o ne sugadintą struktūrą |
| `POST /website/generateAltText` | Vaizdo kvietimas iki 20 vaizdo URL. Grąžina trumpą alternatyvųjį tekstą (≤125 simboliai, pašalinami priešdėliai „photo of") |
| `POST /website/generateMetaDescription` | Vienas SEO meta aprašymas (≤155 simboliai) iš puslapio teksto. Susietas su mygtuku Generuoti B1Admin puslapio nustatymuose |

Šių galinių taškų užklausos yra Markdown failai kataloge `AskApi/config/instructions/`, įskaitant elementų katalogą, iš kurio modelis generuoja. Du dizaino sprendimai išlaiko katalogą patikimą. Klientas perduoda `availableElementTypes` kiekvienoje užklausoje (užklausa gali naudoti tik tipus iš šio sąrašo. Serveris nekoduoja viso rinkinio), o API MCP įrankis `describe_page_builder` pateikia tą patį vadovą DI agentams, dirbantiems per [MCP](../api/mcp.md). Modeliai yra Anthropic Claude per OpenRouter: 3.5 Haiku skyrių turiniui (greitis), 3.5 Sonnet struktūroms, svetainių planams ir vaizdui. Kai OpenRouter raktas nesukonfigūruotas, naudojamas OpenAI atsarginis variantas.

## Pokalbio formos

Formos (narystės modulis) gavo pokalbio režimą, skirtą kortelių stiliaus puslapiams. Keturi `forms` stulpeliai jį valdo: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **Atvaizdavimas**: apphelper `FormSubmissionEdit` perjungia į komponentą `ConversationalForm` (po vieną klausimą), kai `displayMode` yra `conversational`. B1App formos puslapis perduoda režimą. Pateikimo duomenys abiem atvejais tie patys.
- **Asmens automatinis sukūrimas**: pateikus formą su `autoCreatePerson`, `ConversationalFormHelper.findOrCreatePerson` pašalina dublikatus pagal el. paštą (nepriklausomai nuo raidžių dydžio). Kitu atveju sukuria namų ūkį ir asmenį su `membershipStatus: "Guest"`, tada susieja pateikimą su tuo asmeniu.
- **Tęstinis el. laiškas**: kai nustatyta tema ir tekstas, pateikėjas gauna šabloninį el. laišką (su žetonais `{firstName}` / `{churchName}`) per esamą transakcinį kelią (`TransactionalEmailHelper`), o ne per pranešimų santrauką. Abu šalutiniai poveikiai nėra kritiniai: klaida niekada nepraranda pateikimo.

Šiuo metu keturiais laukais nustatomi per API. B1Admin formos redaktorius jų dar neatveria.

## Viešosios svetainės talpykla

B1App viešasis atvaizdavimo kelias talpina bažnyčios žymėtas gavimo užklausas (`next: { revalidate: 300, tags: [sdSlug] }` gamyboje; `0` kūrimo aplinkoje). Todėl tiesioginis puslapis gali likti pasenęs iki penkių minučių po ContentApi įrašo. `POST /api/revalidate/{sdSlug}` B1App kviečia `revalidateTag(sdSlug)` ir yra vienintelis būdas anksčiau išvalyti talpyklą.

Talpyklą pasiekia du rašytojai:

1. **B1Admin**: `clearSiteCache()` faile `B1Admin/src/site/siteCache.ts` siunčia POST po redaktoriaus įrašymų. Pirmenybę teikia aktyvios svetainės subdomenui (antrinė svetainė turi išvalyti *tą* žymą, o ne bažnyčios numatytąją).
2. **Api**: turinio pakeitimai, kurie nepraeina per B1Admin (API raktai, MCP, DI), iškviečia `SiteCacheHelper.bump(churchId)` iš turinio valdiklių. Pagalbinė funkcija nustato bažnyčios subdomeną per `SubDomainHelper` ir siunčia POST į `{b1AppRoot}/api/revalidate/{sd}`. Klaidos nutildomos, todėl nepasiekiamas B1App negali sugadinti įrašymo.

Valdikliai, kurie atlieka `bump`: puslapiai (įrašymas, ištrynimas, dubliavimas, paskelbimas, atmetimas, nepaskelbimas, DI laikinasis), skyriai, elementai, blokai, nuorodos, globalūs stiliai, tinklaraščio įrašai ir peradresavimai. Kūrimo aplinkos `b1AppRoot` yra `http://{subdomain}.localtest.me:3301`, o demo ir gamybos aplinkose naudojamas `https://{subdomain}.b1.church`.

## Susiję puslapiai

- [Svetainių maršrutizavimas ir kelios svetainės](./websites.md): kaip užklausa nustatoma į bažnyčią ir svetainę ir kaip veikia pasirinkti domenai
- [Turinio galiniai taškai](../api/endpoints/content.md): pilnas REST paviršius puslapiams, skyriams, elementams, blokams, įrašams, peradresavimams ir nustatymams
- [AppHelper](../shared-libraries/app-helper.md): npm paketas, kuriame yra atvaizdavimo įrankiai, registras, skirtukai ir valdikliai
- [MCP serveris](../api/mcp.md): įskaitant įrankį `describe_page_builder`
- [Puslapio redaktorius (galutiniam naudotojui)](/docs/b1-admin/website/page-editor): darbuotojams skirta redaktoriaus dokumentacija
