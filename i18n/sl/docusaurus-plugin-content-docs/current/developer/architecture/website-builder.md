---
title: "Arhitektura graditelja spletnih strani"
---

# Arhitektura graditelja spletnih strani

<div class="article-intro">

Vsako cerkveno spletno mesto, ki ga streže B1App, se prikaže iz drevesa vsebine (strani, razdelkov, elementov), shranjenega v ContentApi in vizualno urejenega v B1Admin. Ena skupna knjižnica komponent prikazuje tako predogled urejevalnika kot živo spletno mesto, en katalog tipov elementov določa, kaj se lahko pojavi na strani, ločena storitev umetne inteligence pa lahko to drevo ustvari ali prepiše. Ta stran opisuje celoten sklad: pogodbo elementov v `@churchapps/helpers`, cevovod upodabljanja, elemente s podatki o cerkvi, vtičnike za celotno spletno mesto, plast za blog, strani z omejenim dostopom, SEO, ustvarjanje z umetno inteligenco in pogovorne obrazce.

</div>

## Pregled

```
┌──────────────────────────────┐             ┌─────────────────────────────────────────┐
│  B1Admin — urejevalnik       │             │  Api — modul /content (ContentApi)      │
│  ContentEditor · SectionEdit │  POST /…    │                                         │
│  ElementEdit · PageLinkEdit  │ ──────────▶ │  pages ─ sections ─ elements   blocks   │
│  SiteWidgetsEdit · Blog      │             │  posts   redirects   settings   styles  │
└──────────┬───────────────────┘             └───────────────┬─────────────────────────┘
           │                                                 │ GET /content/pages/:churchId/tree?url=…
           │        skupni cevovod upodabljanja              ▼            (anonimno, JWT se upošteva)
           │   ┌───────────────────────────────┐   ┌─────────────────────────────────┐
           └──▶│  @churchapps/helpers          │◀──│  B1App — javno spletno mesto    │
               │    ElementTypes.ts (katalog)  │   │  (Next.js)                      │
               │  @churchapps/apphelper        │   │  Zone → Section → Element       │
               │    ElementRegistry, renderers │   │  + vtičniki, JSON-LD, zemljevid │
               │    SectionDivider, widgets    │   │    spletnega mesta, preusmeritve, │
               └───────────────────────────────┘   │    404 z blagovno znamko        │
                                                   └───────────────┬─────────────────┘
┌──────────────────────────────┐                                   │ elementi s podatki o cerkvi
│  AskApi — /website/* (AI)    │                                   ▼
│  generateSite · rewriteSection│             ┌─────────────────────────────────────────┐
│  generateAltText · metaDesc  │             │  /giving/funds/public/…/total           │
│  vrne JSON; B1Admin shrani   │             │  /membership/groupmembers/public/…      │
└──────────────────────────────┘             │  /attendance/servicetimes/public/…      │
                                             └─────────────────────────────────────────┘
```

Tri pravila veljajo v celotnem skladu:

1. **Eno drevo, dva upodabljalnika.** Stran je drevo `pages → sections → elements`, kjer vsako vozlišče nosi svoje nastavitve kot blob JSON `answers`. Isti apphelper komponente upodabljajo urejevalnik z vlečenjem in spuščanjem v B1Admin ter strežniško upodobljeno javno spletno mesto v B1App. Ni ločenega „formata za objavo“.
2. **Pogodba živi v `@churchapps/helpers`.** `ElementTypes.ts` je edini katalog tipov elementov; upodabljalniki se razrešijo prek registra v apphelper; obrazci za urejanje živijo v B1Admin. Dodajanje tipa elementa pomeni posegati v vse tri, v tem vrstnem redu.
3. **Javno spletno mesto bere anonimne končne točke.** Vse, kar B1App potrebuje (drevo strani, nastavitve, objave bloga, preusmeritve in končne točke s podatki o cerkvi v drugih modulih), je javno. Avtentikacija je neobvezna: JWT na anonimni končni točki drevesa odklene le strani, namenjene samo članom, nič drugega se ne spremeni.

## Drevo vsebine

Modul vsebine (`Api/src/modules/content`) hrani podatke graditelja:

| Tabela | Vloga |
|--------|-------|
| `pages` | Ena stran za vsak URL: `url`, `title`, `layout`, ter `visibility`/`groupIds` (omejitev dostopa) in `metaDescription` (SEO) |
| `sections` | Vodoravni pasovi na strani (ali v bloku): ozadje, barva besedila in `answersJSON`, ki vsebuje slog ter konfiguracijo oblikovnih ločilnikov `dividerTop`/`dividerBottom` |
| `elements` | Vsebinski kosi znotraj razdelka: `elementType` + `answersJSON`, gnezdijo se pri tipih za postavitev (vrstica/stolpec, vrtiljak) |
| `blocks` | Ponovno uporabni skupini razdelkov/elementov (bloki noge, bloki elementov), deljeni med stranmi |
| `posts` | Samostojne objave na blogu (glejte [Blog](#blog)) |
| `redirects` | Pari `fromPath → toPath` za posamezno cerkev, omejeni na 200 (glejte [SEO](#seo-and-discoverability)) |
| `settings` | Nastavitve cerkve v obliki ključ–vrednost; vrstice, označene kot `public`, se streži anonimno in vsebujejo konfiguracijo vtičnikov/analitike |

Celotno drevo za en URL se vrne z enim anonimnim klicem — `GET /content/pages/:churchId/tree?url=/about` — in iz tega B1App izvaja strežniško upodabljanje. Zahteve urejevalnika namesto tega pridobivajo po ID-ju in ohranjajo notranje ID-je.

## Pogodba elementov

### Katalog (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` opredeljuje vsak tip elementa kot `ElementTypeDefinition`: `elementType`, `label`, `category`, `schemaVersion`, `defaults` in `answersSchema` v slogu JSON-sheme za njegove odgovore. `validateElementAnswers()` je namerno popustljiv — neznani tipi in dodatni ključi prestanejo preverjanje, tako da stara vsebina nikoli ne pade ob nadgradnji kataloga. **Danes je na voljo 35 tipov:**

| Kategorija | Tipi elementov |
|------------|----------------|
| postavitev (6) | row, column, box, carousel, whiteSpace, block |
| vsebina (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| mediji (4) | image, gallery, video, map |
| cerkev (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| napredno (2) | rawHTML, iframe |

Element `sermons` je med cerkvenimi tipi najbolj nastavljiv: odgovor `layout` izbere `browse` (stari celoviti brskalnik), `grid`, `list` ali `featuredLatest`, pri čemer `playlistId`, `itemCount`, `showTitles` in `showDates` natančneje določijo postavitve, ki niso `browse`.

Element `rawHTML` ima dva odgovora: `rawHTML` (označevanje) in `javascript`. Skripti, vstavljeni prek `innerHTML`, se nikoli ne izvedejo, zato `RawHTMLElement` ustvari vsako vozlišče `<script>` v označevanju kot novi element. Ta vozlišča, ki jih ne vstavi razčlenjevalnik, so zaupanja vredna pod `strict-dynamic` v CSP. Odgovor `javascript`, ki se začne z `<` (fragment dobavitelja, prilepljen s svojimi oznakami `<script>`), se razčleni kot označevanje in deležen je enake obravnave. Sicer se izvede kot navaden vgrajeni skript. B1Admin označi goli URL v polju JavaScript, saj goli URL deluje kot skript brez učinka. Element `map` ne izriše ničesar in ne naloži skripta Google Maps, če ni nastavljen ključ API za Maps.

### Upodabljalniki (`@churchapps/apphelper`)

Upodabljalniki živijo v `Packages/apphelper/src/website/components/elementTypes/`, po ena komponenta za vsak tip, razrešeni prek `ElementRegistry.ts` — dvoslojnega preslikovanja, kjer `Element.tsx` registrira privzeti upodabljalnik za vseh 35 tipov (`registerDefaultElementRenderer`), gostiteljska aplikacija pa lahko kateregakoli prepiše med izvajanjem (`registerElementRenderer`), ne da bi morala razvejiti paket.

### Obrazci urejevalnika (B1Admin)

Obrazci za nastavitve posameznega tipa v urejevalniku živijo v `B1Admin/src/site/admin/elements/` — `ElementEdit.tsx` pošlje zahtevo namenski komponenti (`GalleryEdit`, `TestimonialEdit`, `StatsEdit` …) ali vgrajenemu graditelju polj za vsak tip. Zrcalo tega kataloga, namenjeno umetni inteligenci, je orodje API-ja MCP `describe_page_builder` (glejte [MCP strežnik](../api/mcp)).

Predogled urejevalnika priklopi isto `Theme` kot živo spletno mesto, ki nastavi spremenljivki CSS `--headingFont` / `--bodyFont` iz globalnih slogov cerkve. B1App uporablja te spremenljivke prek `pages.css`, kar B1Admin ne more uvoziti, zato `ContentEditor.tsx` vbrizga `EDITOR_PAGE_FONT_CSS` (`src/site/admin/editorCss.ts`), da jih uporabi za besedilo v `.page` in naslove `h1`–`h6`. Brez tega je predogled prikazoval naslove v pisavi skrbniškega vmesnika.

### Oblikovni ločilniki razdelkov

Razdelki lahko na katerem koli robu nosijo dekorativne oblikovne ločilnike. Konfiguracija je v `answersJSON` razdelka kot objekta `dividerTop` / `dividerBottom` — `{ shape, color, height, flip }`, kjer je `shape` eden od `wave, waves, slant, curve, triangle, peaks`. Apphelper prinaša komponento `SectionDivider` in pomožno funkcijo `parseDividerConfig()`; upodabljalnika Section obeh aplikacij (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) razčlenita odgovore in vstavita ločilnik, `SectionEdit.tsx` v B1Admin pa ponuja izbirnik. Paketi prinašajo le gradnik — povezovanje na ravni razdelkov je naloga aplikacij, ki ga uporabljajo.

## Elementi s podatki o cerkvi

Trije tipi elementov prikazujejo žive podatke cerkve, ne avtorske vsebine. Izolacija modulov še vedno velja — vsak od njih kliče javno končno točko lastniškega modula neposredno iz brskalnika:

| Element | Končna točka | Opombe |
|---------|--------------|--------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Vrne `{ fundId, totalAmount, donationCount }`, izbirno okno `?startDate=&endDate=`; element to primerja z odgovorom `goalAmount` |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Samo za izbiro**: skupina mora imeti nastavljen `publicRoster` (privzeto izklopljen). Projekcija je namerno minimalna — `personId`, `displayName`, `leader`, fotografija — brez kontaktnih ali demografskih polj |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Vrne drevo kampus → bogoslužje → čas; upodabljalnik apphelper iz njega izpiše približen JSON-LD `Event` po shemi schema.org (API vrne čisте podatke) |

:::warning
`publicRoster` je zasebnostna zapora za `staffGrid`. Nikoli ne razširjajte javne projekcije članov skupine in ne obidite zastavice — končna točka seznama je po zasnovi anonimna, varnost pa zagotavlja minimalni seznam polj.
:::

### Koledarski element in strani dogodkov

Odgovori elementa `calendar` so `calendarType` (`group` | `curated`), `calendarId`, `display` (`month`, privzeto, ali `upcoming`) in `tag`. B1App prepiše upodabljalnik apphelper v `src/components/Element.tsx` z `registerElementRenderer("calendar", …)`:

- **`display: "upcoming"`** prikaže `UpcomingEventsElement` iz B1App: naloži `GET /content/events/public/group/:churchId/:groupId` ali `GET /content/curatedEvents/public/calendar/:churchId/:curatedCalendarId`, ponovitve razširi z `buildOccurrences()` (`src/helpers/EventOccurrences.ts`, po en pojav na dogodek v enem letu) in prikaže prvih 12 kot fotografske ploščice (`events.photoUrl`, sicer naslov na temno barvo teme), ki vodijo na `/events/{id}`, z meni­jem Subscribe za ICS vir koledarja.
- **`display: "month"`** prikaže `CalendarElement` iz apphelper z povratnim klicem `eventUrl`. `GroupCalendar` / `CuratedCalendar` → `EventCalendar` / `CuratedEventCalendar` ob kliku nato krmarijo na ta URL namesto odpiranja pogovornega okna s podrobnostmi (B1Admin ne posreduje `eventUrl`, zato administrativni koledar ohrani pogovorno okno).
- **`tag`** filtrira oba prikaza s `EventHelper.hasTag()` (`@churchapps/helpers`): neobčutljivo na velike in male črke ujemanje z vejico ločenimi `events.tags`; prazno pomeni prikaz vsega. Pridružitev kuriranemu koledarju izbere `e.tags`, da kuriran dogodek nosi oznake.

Kurirani dogodki povezujejo prek `realEventId` (`eventPageId()`), zato URL vedno navaja osnovni dogodek. `/{sdSlug}/events/[eventId]` je namenska pot (ne cevovod graditelja): naloži `GET /content/events/public/:churchId/:id` — ki vrne `null` za dogodke na čakanju/zavrnjene in za zasebne dogodke brez prijave — doda `roomNames` iz nezavrnjenih rezervacij prostorov, izriše `EventPageContent` (glavno fotografijo, opis v markdownu, stransko vrstico Kdaj/Kje, **Register for this Event**, kadar je `registrationEnabled`, in povezavo **Add to my calendar** do `GET /content/events/public/:churchId/:id/ical`), fotografijo uporabi kot sliko Open Graph in prek `EventPageJsonLd` izda JSON-LD `Event` za naslednji pojav. Neznan ali skrit dogodek vrne pravi 404.

## Vtičniki za celotno spletno mesto

Dva vtičnika se prikazujeta na vsaki javni strani, ne znotraj drevesa: **AnnouncementBanner** (zaprta vrstica na vrhu strani) in **Launcher** (lebdeče središče dejanj za povezave tipa dai/obišči/glej). Obe komponenti in njuni pomožni funkcije `parse*Config()` prinaša apphelper. Konfiguracija sta dve javni vrstici nastavitev — ključa `announcementBanner` in `launcher` — ki ju zapisuje `SiteWidgetsEdit` v B1Admin (na strani Videz), bere pa ju javna postavitev B1App prek `GET /content/settings/public/:churchId`. API ju obravnava kot neprozorna para ključ–vrednost; imena ključev so dogovor med obema aplikacijama.

## Blog

Blog je samostojen tip vsebine, ne plast nad stranmi graditelja. Vrstica `posts` hrani celotno objavo: `title`, `slug`, `excerpt`, `content` (telo v markdownu), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`. Javna površina (vse anonimno, `PostController`):

| Pot | Namen |
|-----|-------|
| `GET /content/posts/public/:churchId` | Objavljene objave, filtrirljive z `?category=&tag=`, paginirane |
| `GET /content/posts/public/:churchId/categories` | Različne kategorije med objavljenimi objavami |
| `GET /content/posts/public/:churchId/slug/:slug` | Ena objavljena objava |
| `GET /content/posts/rss/:churchId?siteUrl=` | Vir RSS 2.0, naslovljen z imenom cerkve, z kategorijo za vsak element ter opisom iz izvletka ali vsebine |

Objava je „objavljena“, ko je `publishDate` nastavljen in že minil; prihodnji `publishDate` pomeni načrtovano objavo (javno skrito, v upravi prikazano z značko Scheduled). Končne točke za branje vsaki objavi dodajo `authorName`, razrešen iz `authorId` prek prehoda modula membership. Manjkajoči izvlečki se v karticah seznama, opisih meta in RSS nadomestijo z vsebino brez oznak markdown (~160 znakov). B1App streže `/{sdSlug}/blog` — uredniški seznam (središčna glava, ki ob filtriranju postane ime aktivne kategorije/oznake, vrstica filtrov s čipi kategorij, vrstice objav z miniaturo levo, avtorji in izvlečki), z RSS virom, oglašenim kot alternativna povezava — in `/{sdSlug}/blog/[postSlug]`, namensko pot (ne cevovod Zone/Section), s središčno glavo (kategorijska oznaka, naslov, avtor, poudarjena barvna črta), 16:9 glavno fotografijo v širini vsebnika, telesom v markdownu v bralnem stolpcu široko okoli 720 px, značkami oznak v nogi članka, vrstico `"More in {category}"` s sorodnimi objavami in JSON-LD `BlogPosting` z avtorjem. Obe strani se oblikujeta izključno z žetoni teme, tako da podedujeta barvno paleto vsake cerkve. URL-ji bloga so vključeni v zemljevid spletnega mesta vsake cerkve. Uredniški vmesnik B1Admin (**Site → Blog**) ureja objave v pogovornem oknu: urejevalnik markdowna s preklopom predogleda, izbirnik slik z galerijo obrezanih na 16:9, izbirnik avtorja (privzeto uporabnik, ki ureja), samodejno dopolnjevanje kategorij iz obstoječih kategorij, preverjanje podvojenih slugov in preklop objave; objavljene vrstice vodijo na objavo v živo, stran pa skrbnike opomni, naj dodajo povezavo za navigacijo `/blog`. Komentarje prepuščamo storitvam tretjih oseb: celocerkvena javna nastavitev `blogFooterHtml` (urejena v **Below Every Post** na strani Blog, prikazana samo z Settings→Edit) se izriše pod vsako objavo prek `BlogFooterEmbed` v B1App, ki ponovno ustvari oznake `<script>`, da se izvedejo pod `'strict-dynamic'`, in jih izvaja po vrsti (zunanji `src` konča nalaganje, preden se izvede naslednji vgrajeni skript), ker dobaviteljevi fragmenti najprej naložijo knjižnico in jo nato pokličejo.

## Strani, namenjene samo članom

`pages.visibility` ponovno uporablja nabor vrednosti povezav v navigaciji — `everyone` (privzeto), `visitors`, `members`, `staff`, `team`, `groups` (z `groupIds`) — vendar kot **trdo omejitev dostopa**, ne kot filter navigacije (`PageVisibilityHelper.canViewPage`). Tok je naslednji:

1. Anonimna končna točka drevesa preveri vidnost pri pridobivanju na podlagi URL-ja. Anonimni klicatelji zaščitene strani dobijo `{ restricted: true, visibility }` namesto vsebine — drevo nikoli ne pušča.
2. Končna točka še vedno upošteva JWT: `CustomAuthProvider` preveri glavo `Authorization` pri *vsaki* zahtevi, tudi na anonimnih poteh, zato se pridobitev istega URL-ja za prijavljenega člana razreši običajno.
3. B1App ob odgovoru `restricted` prikaže `RestrictedPage`: iz shranjenih poverilnic obnovi sejo, ponovno pridobi drevo z JWT in ga upodobi — ali, če seje ni, prikaže prijavno zaporo z `returnUrl`.

:::info
Natančnost zapore se razlikuje po ravneh: `groups` preveri `groupIds` iz žetona glede na seznam strani, `staff` pa preveri `membershipStatus`, vendar `members` in `team` trenutno spustita vsakega prijavljenega uporabnika cerkve. Obravnavajte `groups` kot strogo možnost.
:::

## SEO in odkrljivost

Vse to je upodabljanje na strani B1App nad podatki ContentApi — API shranjuje, aplikacija oddaja:

| Vidik | Kako deluje |
|-------|-------------|
| Opisi meta | `pages.metaDescription` (≤300 znakov) prek `MetaHelper.getMetaData()` teče v Next.js `Metadata` (description + Open Graph) na vsaki poti, ki jo upodablja graditelj. Nastavitve strani v B1Admin vključujejo gumb AI **Generate** (glejte spodaj) |
| Preusmeritve | Vrstice `redirects` za posamezno cerkev, upravljane na `/content/redirects` (`content.edit`, omejitev 200 vrstic, normalizirane poti). Ob morebitnem 404 pot strani B1App razreši proti `GET /content/redirects/public/:churchId` in izda HTTP 308 prek `permanentRedirect` iz Next; neujemajoče poti padejo na `notFound()` |
| 404 z blagovno znamko | `not-found.tsx` prikaže `BrandedNotFound` z logotipom cerkve, imenom in temo namesto splošne napake. Neznane poti `/register/[eventId]`, `/events/[eventId]`, `/stream/[pageSlug]` in `/volunteer/[planId]` vrnejo pravi 404, enako neznane poddomene in neveljavni slugi strani (glejte [Usmerjanje spletnih mest in več mest](./websites)) |
| Strukturirani podatki | JSON-LD `BlogPosting` na objavah bloga; `VideoObject` na straneh posameznih pridig (`/{sdSlug}/sermons/[sermonId]`) in na straneh z elementom `sermons`; `Event` iz koledarskih/dogodkovnih elementov na straneh graditelja in na vsaki strani `/{sdSlug}/events/[eventId]` (naslednji pojav, s fotografijo dogodka kot `image`); schema.org `Event` iz elementa `serviceTimes` |
| Strani pridig | Vsaka javna pridiga dobi indeksirljivo stran na `/sermons/[sermonId]` s polnimi metapodatki — pridige niso več zaklenjene znotraj odjemalskega brskalnega elementa |
| Analitika | Javni ključ nastavitve `ga4MeasurementId` (upravljan ob preusmeritvah v B1Admin) vbrizga gtag GA4 za posamezno cerkev prek `next/script`. Aplikacija B1 (`/{sdSlug}/mobile`) svoje oglede strani pošilja tudi na ta ID poleg oznake ChurchApps, kadar je veljaven ID `G-` (ID-ji vsebnikov GTM ostanejo samo za spletno mesto). Vsak `gtag('config')` nosi `display_mode` z vrednostjo `installed` ali `browser`, glede na `navigator.standalone` ali poizvedbo medija `(display-mode: standalone)` (`B1App/src/helpers/mobileAnalytics.ts`) |
| Zemljevid spletnega mesta in viri | Pot `sitemap.xml` za posamezno cerkev vključuje strani graditelja, URL-je bloga in 50 najnovejših strani pridig (z `<lastmod>` iz datuma objave vsake pridige). Navaja tudi vgrajene strani `/sermons`, `/groups` in `/volunteer`, kadar imajo vsebino (javne skupine, načrti prostovoljstva), razen če shranjena preusmeritev nadomesti to pot. `/` je izpuščen, kadar cerkev nima domače strani, saj `/` nato preusmeri na prepovedani `/mobile`. Seznam bloga oglašuje vir RSS |
| Dostopnost | Javni okvir izriše povezavo za preskok, ki cilja na oznako `<main id="main-content">` v vsakem ovoju postavitve |

## Ustvarjanje z umetno inteligenco (AskApi)

Ustvarjanje strani in spletnega mesta poteka v **AskApi**, ločeni storitvi, pod krmilnikom `/website`. Overja se z istim JWT `CustomAuthProvider` kot vse drugo in je **brez stanja glede vsebine**: vsaka končna točka vrne JSON, klicatelj (B1Admin) pa rezultat shrani prek ContentApi (`POST /content/pages/importTree` ustvari stran s celotnim gnezdenim drevesom razdelkov/elementov v enem klicu; vedno vstavi pod cerkev klicatelja in prezre ID-je v telesu).

### Ustvarjanje strani (`planPage` → `writePage`)

Predloga „AI“ za stran v `AddPageModal` v B1Admin uporablja poceni cevovod (`AskApi/src/helpers/SiteGenHelper.ts`), zgrajen na enem pravilu: **noben model nikoli ne izda JSON-a graditelja**. Dva modela si delita delo prek Vercel AI Gateway (navaden HTTP, ključ SSM `/{env}/aiGatewayApiKey` ali `AI_GATEWAY_API_KEY`):

- **JEV** (`typesafe-ai/jev`) — tipiziran odločitveni model, ki vrača izbire, ocene in logične vrednosti z verjetnostmi, vendar ne zna pisati besedila. Izbira vsak razdelek po vrsti iz fiksne knjižnice predlog, ocenjuje postavitve, preverja dejstva v besedilu ter izbira stock fotografije in ikone. Vhod stane približno 0,04 $ na milijon žetonov, izhod je brezplačen, zato ~90 klicev na stran stane delček centa.
- **Majhen klepetalni model (privzeto GPT-4.1 mini)** — napolni poimenovane, po dolžini omejene besedilne reže izbranih predlog. Pisec je ena konstanta, ki jo je mogoče preglasiti z okoljsko spremenljivko `SITEGEN_COPY_MODEL` (katerikoli ID klepetalnega modela na prehodu, npr. `anthropic/claude-haiku-4.5`). V slepem primerjalnem testu na treh cerkvah je Claude Haiku 4.5 zvenel nekoliko toplejše, vendar je bil GPT-4.1 mini blizu, približno 4-krat cenejši in hitrejši, zato je privzet. Cela stran z vsemi tremi postavitvami stane približno 1,3 centa, od tega okoli 80 % pisec.

| Faza | Končna točka | Kaj se zgodi |
|------|--------------|--------------|
| 1 | `POST /website/planPage` | Razvrsti vrsto strani (domača, obisk, o nas …), nato vzorči 10 kandidatnih postavitev iz verjetnosti JEV po krogih (glava + število razdelkov → vsak razdelek → zaključek), odstrani podvojene, pusti JEV, da vsako oceni glede ustreznosti/toka/vrzeli, in vrne najboljše tri ter glas pisanja in `suggestedStyle` (paleta + pisave). Kandidati, ki imajo do zdaj enake razdelke, sprašujejo JEV enako vprašanje, zato se krogi shranjujejo v predpomnilnik po predponah. Najboljša ocena pod 6 se zabeleži kot `lowLayoutScore` — ta dnevnik je zaostanek predlog, vrednih dodajanja. ~2 s |
| 2 | `POST /website/writePage` (en klic na kandidata) | Pisec napolni besedilo rež po dva razdelka na klic, vzporedno, in vrne pet naslovov glave, med katerimi izbira JEV; JEV preveri dejstva v vsakem razdelku; razdelki, ki ne uspejo, uporabijo ustaljeno frazo ali ponovijo prejšnji razdelek (skupni 4-besedni nizi, preverjeni v kodi), se vzporedno prepišejo z navedbo specifičnega razloga; kodno čiščenje odstrani stavke s stock frazami spletnih mest cerkva (razen če opis cerkve same uporablja te fraze); JEV izbere motive fotografij, ikone in oblikovni ločilnik glave ter oceni rezultat. Vrne pripravljeno drevo razdelkov za shranjevanje in oceno. ~6–9 s |
| 3 | `POST /content/pages/importTree` | B1Admin zapiše samo najbolje uvrščeno postavitev (drugouvrščena je rezerva, če zapis ne uspe), jo shrani in odpre predogled (~10 s po Save) |

Vsaka faza je svoja zahteva, da vsak klic ostane znotraj omejitve API Gateway 29 sekund. Predloge v `SiteGenHelper.buildTree` so fiksna drevesa razdelkov in elementov iz kataloga (`text`, `row`/`column`, `card`, `iconFeature`, `faq`, `table`, `testimonial`, `textWithPhoto`, `box`, `map`, `sermons`) in se sklicujejo na žetone teme (`var(--accent)`, `var(--lightAccent)` …), zato ustvarjene strani podedujejo obstoječe nastavitve videza cerkve. Dodajanje predloge razdelka pomeni dodati njen seznam rež v `SECTIONS` in njeno drevo v `buildTree`; enotski test pregleda vsako predlogo in preveri drevo.

**Vhodi.** Besedilo sme navajati dejstva le iz dveh virov: kar je vnesel uporabnik, in `churchContext.facts` — zapisi, ki jih B1Admin zbere pred načrtovanjem (javni časi bogoslužij in imena javnih skupin ter ime in naslov cerkve). Enake zastavice določajo predloge, ki temeljijo na podatkih: `times` izriše živi element `serviceTimes`, kadar cerkev časovnice bogoslužij hrani v B1 (sicer vtipkano tabelo), `groups` in `countdown` pa sta ponujena samo, kadar za njima stojijo podatki. Klici JEV so zavarovani — podvojen klic se sproži po 1,5 s in zmaga prvi odgovor — ker prehod občasno zastane, klici pa so skoraj brezplačni.

**Ostati pri temi.** Uporabnikov poziv je *tema strani*, ne ozadje o cerkvi. `planPage` razvrsti zahtevo (`home`, `visit`, `about`, `ministries`, `give`, `contact`, `event`, `topic`), pri straneh `event` in `topic` pa predloge splošne cerkve (beležka pastorja, pridige, službe, skupine, vpliv na skupnost, tedenski časi in odštevanje, glavna z videom) sploh niso ponujene, medtem ko so na voljo `details` (kdaj / kje / kaj prinesti) in datumski `eventCountdown`. Obe ocenjevalni fazi ocenjujeta tudi ustreznost teme. B1Admin posreduje `pageType` iz načrta v vsak klic `writePage`.

**Cele strani iz kratkih zahtev.** Strani imajo tri do šest srednjih razdelkov, velodušne dolžine rež, uvodno vrstico na razdelkih s karticami in peto-vprašanjski FAQ, popravilni prehod pa razširi vsak razdelek, ki se vrne prešibek. Ustvarjanje poteka z enim klikom: ni nadaljnjih vprašanj. Kadar zahteva izpušča običajno podrobnost, ki jo popolna stran potrebuje (začetni čas, prostor, kaj prinesti, kako se prijaviti), pisec vnese verjetno, skromno izbiro, ki jo cerkev lahko uredi. Ker se razdelki pišejo vzporedno, se te vrzeli odločijo **enkrat**, v `planPage` (`assumedDetails`, en majhen klic pisca, ki teče vzporedno z vzorčenjem postavitev), in se prek `churchContext.assumedDetails` vrnejo v vsak klic `writePage`, zato en razdelek ne more reči 5:00, drugi pa 5:30. JEV popravi vsak razdelek, ki nasprotuje zahtevi, zapisom cerkve ali tem odločenim podrobnostim. Odločene podrobnosti v uporabniškem vmesniku niso prikazane; cerkev stran pregleda in ureja kot vsako drugo. Nekaj stvari se nikoli ne izmišlja: imena oseb, telefonske številke, e-poštni in spletni naslovi, cene, statistika, zgodovina cerkve, citati, pripisani osebam, in dan v tednu za datum, za katerega zahteva ni podala dneva.

**Vizualni elementi.** Predloge nikoli ne poimenujejo svojih fotografij ali ikon. Pustijo odprte reže, en splošen prehod (`visualSlots` → `pickVisuals` → `applyVisuals` v `SiteGenHelper`) pa pregleda končno drevo in napolni vsako: ozadje razdelka ali vnos v galeriji z oznako `auto:photo`, `auto:icon`, oblikovni ločilnik glave `auto:divider` in, brez katerekoli oznake, vsak element `textWithPhoto`, `card` ali `image`, katerega `photo` je prazen. JEV izbere vsakega iz besedila ob njem (fotografijo kartice iz njenega naslova in besedila; ozadje iz besedila razdelka), na strani pa se nobena tema ne ponovi. Nova predloga tako dobi fotografije zastonj. Fotografije so iskalne teme Pexels, oddane kot ograditveni nadomestki `pexels:<term>`, ki jih B1Admin razreši prek `POST /content/stock/search`; odjemalec, ki ne pošlje `resolvesPhotos`, dobi vgrajeno glavno sliko, ploske barvne pasove in kartice brez fotografij. Namerno ni portretnih tem, predloga pastorja pa nima fotografije: tujec iz zaloge ne sme nikoli nadomestiti resnične osebe. Za cerkev brez strani B1Admin uporabi `suggestedStyle` na globalnih slogih; obstoječa spletna mesta ohranijo svoj videz.

### Druge končne točke

:::info
Gumb za prepisovanje v `SectionToolbar` in gumb „Generate Site“ na seznamu strani v B1Admin ostajata na odjemalski strani zakomentirana. Spodnje končne točke AskApi se še vedno odzivajo; skrit je samo ta uporabniški vmesnik.
:::

| Končna točka | Namen |
|--------------|-------|
| `POST /website/generatePageOutline` → `generateSection` | Prvotni dvostopenjski tok strani (oris, nato en klic LLM na razdelek, ki izda JSON elementov). V B1Admin ga zaradi stroškov nadomešča `planPage`/`writePage`; ohranjen je za uporabnike API-ja |
| `POST /website/generateSite` | Ustvarjanje celotnega spletnega mesta. **Dvofazno po zasnovi**: klic `planOnly: true` vrne samo načrt več strani (en hitri klic modela), nato odjemalec zahteva celotno vsebino — tako vsaka zahteva ostane znotraj časovne omejitve Lambda/API Gateway |
| `POST /website/rewriteSection` | Prepis, ki ohranja strukturo: model lahko spremeni samo odgovore z besedilom. Rekurzivni podpis strukture (ID-ji + tipi + vrstni red) se primerja pred in po; vsako neujemanje vrne prvotni razdelek z `fallback: true` namesto pokvarjene strukture |
| `POST /website/generateAltText` | Vizualni klic za do 20 URL-jev slik; vrne jedrnato nadomestno besedilo (≤125 znakov, predpone „photo of“ odstranjene) |
| `POST /website/generateMetaDescription` | En opis meta za SEO (≤155 znakov) iz besedila strani — povezan z gumbom Generate v nastavitvah strani B1Admin |

Pozivi za te končne točke so datoteke markdown v `AskApi/config/instructions/`, vključno s katalogom elementov, iz katerega model ustvarja. Dve zasnovni točki ohranjata katalog poštenega: odjemalec pošlje `availableElementTypes` pri vsaki zahtevi (poziv sme uporabljati samo tipe s tega seznama — strežnik nikoli ne vdela celotnega nabora), orodje MCP `describe_page_builder` pa nosi isti vodnik za agente umetne inteligence, ki delajo prek [MCP](../api/mcp). Modeli so Anthropic Claude prek OpenRouter — 3.5 Haiku za vsebino razdelkov (zakasnitev), 3.5 Sonnet za orise, načrte spletnih mest in vid — z rezervo OpenAI, kadar ključ OpenRouter ni nastavljen.

## Pogovorni obrazci

Obrazci (modul membership) so dobili pogovorni način, namenjen stranem v slogu kartice za povezavo. Štirje stolpci v `forms` ga poganjajo: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **Upodabljanje** — `FormSubmissionEdit` iz apphelper preklopi na komponento `ConversationalForm` (eno vprašanje naenkrat), kadar je `displayMode` `conversational`; obrazec na strani B1App način posreduje naprej. Obremenitev oddaje je v obeh primerih enaka.
- **Samodejno ustvarjanje osebe** — ob oddaji z nastavljenim `autoCreatePerson` `ConversationalFormHelper.findOrCreatePerson` odstrani podvojitve po e-pošti (neobčutljivo na velike in male črke), sicer ustvari gospodinjstvo + osebo z `membershipStatus: "Guest"` in nato poveže oddajo s to osebo.
- **Dopisni e-poštni sporočilo** — kadar sta nastavljena zadeva in telo, pošiljatelj prejme predlogo e-pošte (z žetoni `{firstName}` / `{churchName}`) prek obstoječe transakcijske poti (`TransactionalEmailHelper`), nikoli prek digesta obvestil. Oba stranska učinka sta necelovitna: napaka nikoli ne izgubi oddaje.

Štiri polja se trenutno nastavljajo prek API-ja; urejevalnik obrazcev v B1Admin jih še ne razkriva.

## Predpomnilnik javnega spletnega mesta

Javna pot upodabljanja B1App predpomni pridobitve, označene s cerkvijo (`next: { revalidate: 300, tags: [sdSlug] }` v produkciji; `0` v razvoju), zato lahko živa stran po zapisu ContentApi ostane zastarela do pet minut. `POST /api/revalidate/{sdSlug}` v B1App pokliče `revalidateTag(sdSlug)` in je edini način, da predpomnilnik izpraznimo prej.

Dva pisca zadenesta vanj:

1. **B1Admin** — `clearSiteCache()` v `B1Admin/src/site/siteCache.ts` pošlje POST po shranjevanju v urejevalniku. Prednostno uporablja poddomeno aktivnega spletnega mesta (sekundarno spletno mesto mora izprazniti *svojo* oznako, ne privzete oznake cerkve).
2. **Api** — spremembe vsebine, ki nikoli ne gredo prek B1Admin (ključi API, MCP, AI), sprožijo `SiteCacheHelper.bump(churchId)` iz krmilnikov vsebine. Pomočnik razreši poddomeno cerkve prek `SubDomainHelper` in pošlje POST na `{b1AppRoot}/api/revalidate/{sd}`. Napake se pogoltnejo, da nedosegljiv B1App ne more pokvariti shranjevanja.

Krmilniki, ki sprožijo osvežitev: strani (shrani, izbriši, podvoji, objavi, zavrzi, prekliči objavo, začasna AI), razdelki, elementi, bloki, povezave, globalni slogi, objave in preusmeritve. Razvojni `b1AppRoot` je `http://{subdomain}.localtest.me:3301`; demo/produkcija uporabljata `https://{subdomain}.b1.church`.

## Sorodne strani

- [Usmerjanje spletnih mest in več mest](./websites) — kako zahteva preide do cerkve/spletnega mesta in kako se usmerjajo domene po meri
- [Končne točke vsebine](../api/endpoints/content) — celotna površina REST za strani, razdelke, elemente, bloke, objave, preusmeritve in nastavitve
- [AppHelper](../shared-libraries/app-helper) — paket npm, ki prinaša upodabljalnike, register, ločilnike in vtičnike
- [MCP strežnik](../api/mcp) — vključno z orodjem vodnika `describe_page_builder`
- [Urejevalnik strani (za končne uporabnike)](/docs/b1-admin/website/page-editor) — dokumentacija urejevalnika za osebje
