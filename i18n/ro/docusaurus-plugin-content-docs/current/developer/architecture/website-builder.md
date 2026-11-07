---
title: "Arhitectura constructorului de site-uri"
description: "Harta pentru dezvoltatori a constructorului de site-uri B1: arborele de conținut, catalogul comun de elemente, pipeline-ul de randare și generarea de pagini cu AI în B1 Admin și B1.church."
---

# Arhitectura constructorului de site-uri

<div class="article-intro">

Fiecare site de biserică servit de B1App este randat dintr-un arbore de conținut — pagini, secțiuni, elemente — stocat în ContentApi și editat vizual în B1Admin. O bibliotecă comună de componente randează atât previzualizarea editorului, cât și site-ul live; un catalog de tipuri de elemente definește ce poate apărea pe o pagină, iar un serviciu AI separat poate genera sau rescrie acel arbore. Această pagină descrie întreaga arhitectură: contractul elementelor din `@churchapps/helpers`, pipeline-ul de randare, elementele cu date ale bisericii, widget-urile la nivel de site, stratul de blog, paginile cu acces restricționat, SEO, generarea AI și formularele conversaționale.

</div>

## Prezentare generală

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

Trei reguli se mențin în întreaga arhitectură:

1. **Un arbore, două randatoare.** O pagină este un arbore `pages → sections → elements` în care fiecare nod își transmite setările ca un obiect JSON `answers`. Aceleași componente apphelper randează editorul drag-and-drop din B1Admin și site-ul public randat pe server din B1App — nu există un „format de publicare" separat.
2. **Contractul se află în `@churchapps/helpers`.** `ElementTypes.ts` este catalogul unic al tipurilor de elemente; randatoarele se rezolvă printr-un registru din apphelper; formularele de editare se află în B1Admin. Adăugarea unui tip de element presupune modificarea tuturor celor trei, în această ordine.
3. **Site-ul public citește endpoint-uri anonime.** Tot ce are nevoie B1App — arborele paginii, setările, articolele de blog, redirecționările și endpoint-urile de date ale bisericii din celelalte module — este public. Autentificarea este opțională: un JWT trimis către endpoint-ul anonim al arborelui deblochează doar paginile rezervate membrilor, nimic altceva nu se schimbă.

## Arborele de conținut

Modulul de conținut (`Api/src/modules/content`) deține datele constructorului:

| Tabel | Rol |
|-------|-----|
| `pages` | O pagină per URL: `url`, `title`, `layout`, plus `visibility`/`groupIds` (restricționarea accesului) și `metaDescription` (SEO) |
| `sections` | Benzi orizontale pe o pagină (sau într-un bloc): fundal, culoare text și un `answersJSON` care conține stilizarea plus configurațiile separatoarelor de formă `dividerTop`/`dividerBottom` |
| `elements` | Piese de conținut în interiorul unei secțiuni: `elementType` + `answersJSON`, cuibăribile pentru tipurile de layout (row/column, carousel) |
| `blocks` | Grupuri reutilizabile de secțiuni/elemente (blocuri de subsol, blocuri de elemente) partajate între pagini |
| `posts` | Articole de blog independente (vezi [Blog](#blog)) |
| `redirects` | Perechi `fromPath → toPath` per biserică, limitate la 200 (vezi [SEO](#seo-and-discoverability)) |
| `settings` | Setări de biserică cheie-valoare; rândurile marcate `public` sunt servite anonim și conțin configurația widget-urilor/analiticii |

Arborele complet pentru un URL vine dintr-un singur apel anonim — `GET /content/pages/:churchId/tree?url=/about` — din care B1App face randarea pe server. Cererile editorului preiau arborele după id și păstrează id-urile interne.

## Contractul elementelor

### Catalogul (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` definește fiecare tip de element ca `ElementTypeDefinition`: `elementType`, `label`, `category`, `schemaVersion`, `defaults` și un `answersSchema` în stil JSON-schema pentru răspunsurile sale. `validateElementAnswers()` este intenționat permisiv — tipurile necunoscute și cheile în plus trec, astfel încât conținutul vechi nu se strică la o actualizare a catalogului. **Astăzi sunt livrate 35 de tipuri:**

| Categorie | Tipuri de elemente |
|----------|---------------|
| layout (6) | row, column, box, carousel, whiteSpace, block |
| content (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| media (4) | image, gallery, video, map |
| church (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| advanced (2) | rawHTML, iframe |

Elementul `sermons` este cel mai configurabil dintre tipurile de biserică: un răspuns `layout` alege `browse` (vechiul browser complet), `grid`, `list` sau `featuredLatest`, iar `playlistId`, `itemCount`, `showTitles` și `showDates` rafinează layout-urile care nu sunt `browse`.

Elementul `rawHTML` are două răspunsuri: `rawHTML` (markup) și `javascript`. Scripturile inserate prin `innerHTML` nu se execută niciodată, așa că `RawHTMLElement` recreează fiecare nod `<script>` din markup ca un element nou. Aceste noduri nu sunt inserate de parser și sunt considerate de încredere sub `strict-dynamic` din CSP. Un răspuns `javascript` care începe cu `<` (un fragment de la un furnizor, lipit cu tag-urile sale `<script>`) este parsat ca markup și primește același tratament. Altfel, rulează ca un script inline simplu. B1Admin semnalează un URL simplu în caseta JavaScript, deoarece un URL izolat rulează ca un script fără efect. Elementul `map` nu randează nimic și nu încarcă niciun script Google Maps când nu este configurată o cheie API pentru Maps.

### Randatoare (`@churchapps/apphelper`)

Randatoarele se află în `Packages/apphelper/src/website/components/elementTypes/`, câte o componentă per tip, rezolvate prin `ElementRegistry.ts` — o hartă pe două straturi, unde `Element.tsx` înregistrează randatorul implicit pentru toate cele 35 de tipuri (`registerDefaultElementRenderer`), iar o aplicație gazdă poate suprascrie oricare dintre ele în timpul rulării (`registerElementRenderer`) fără a bifurca pachetul.

### Formularele editorului (B1Admin)

Formularele de setări pe tip din editor se află în `B1Admin/src/site/admin/elements/` — `ElementEdit.tsx` trimite către o componentă dedicată (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) sau către un constructor de câmpuri inline pentru fiecare tip. Oglinda acestui catalog destinată AI-ului este instrumentul MCP `describe_page_builder` al API-ului (vezi [Serverul MCP](../api/mcp.md)).

Previzualizarea editorului montează aceeași `Theme` ca site-ul live, care setează variabilele CSS `--headingFont` / `--bodyFont` din stilurile globale ale bisericii. B1App aplică aceste variabile prin `pages.css`, pe care B1Admin nu le poate importa, așa că `ContentEditor.tsx` injectează `EDITOR_PAGE_FONT_CSS` (`src/site/admin/editorCss.ts`) pentru a le aplica textului corpului `.page` și titlurilor `h1`–`h6`. Fără el, previzualizarea afișa titlurile cu fontul din admin.

### Separatoare de formă pentru secțiuni

Secțiunile pot avea separatoare decorative de formă pe oricare margine. Configurația se află în `answersJSON` al secțiunii, sub forma obiectelor `dividerTop` / `dividerBottom` — `{ shape, color, height, flip }`, unde `shape` este unul dintre `wave, waves, slant, curve, triangle, peaks`. Apphelper livrează componenta `SectionDivider` și helper-ul `parseDividerConfig()`; randatoarele Section din ambele aplicații (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) parsează răspunsurile și montează separatorul, iar `SectionEdit.tsx` din B1Admin oferă interfața de selecție. Pachetele livrează doar blocul de construcție — conectarea la nivel de secțiune este sarcina aplicațiilor care le folosesc.

## Elemente cu date ale bisericii

Trei tipuri de elemente randează date live ale bisericii, nu conținut scris manual. Izolarea modulelor rămâne valabilă — fiecare apelează din browser endpoint-ul public propriu al modulului care îl deține:

| Element | Endpoint | Note |
|---------|----------|-------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Returnează `{ fundId, totalAmount, donationCount }`, cu fereastră opțională `?startDate=&endDate=`; elementul o compară cu răspunsul `goalAmount` |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Doar opt-in**: grupul trebuie să aibă setat `publicRoster` (implicit dezactivat). Proiecția este intenționat minimală — `personId`, `displayName`, `leader`, fotografie — fără câmpuri de contact sau demografice |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Returnează arborele campus → serviciu → oră; randatorul din apphelper emite JSON-LD `Event` schema.org, în regim best-effort, pe baza lui (API-ul returnează date simple) |

:::warning
`publicRoster` este poarta de confidențialitate pentru `staffGrid`. Nu lărgiți niciodată proiecția publică a membrilor grupului și nu ocoliți acest indicator — endpoint-ul listei este anonim prin design, iar lista minimă de câmpuri este proprietatea de siguranță.
:::

### Elementul calendar și paginile de evenimente

Răspunsurile elementului `calendar` sunt `calendarType` (`group` | `curated`), `calendarId`, `display` (`month`, implicit, sau `upcoming`) și `tag`. B1App suprascrie randatorul din apphelper în `src/components/Element.tsx` cu `registerElementRenderer("calendar", …)`:

- **`display: "upcoming"`** randează `UpcomingEventsElement` din B1App: încarcă `GET /content/events/public/group/:churchId/:groupId` sau `GET /content/curatedEvents/public/calendar/:churchId/:curatedCalendarId`, extinde recurențele cu `buildOccurrences()` (`src/helpers/EventOccurrences.ts`, o apariție per eveniment într-un an) și afișează primele 12 ca plăci cu fotografii (`events.photoUrl`, iar dacă lipsește, titlul pe culoarea întunecată a temei), care duc la `/events/{id}`, cu un meniu Subscribe pentru feed-ul ICS al calendarului.
- **`display: "month"`** randează `CalendarElement` din apphelper cu un callback `eventUrl`. `GroupCalendar` / `CuratedCalendar` → `EventCalendar` / `CuratedEventCalendar` navighează apoi la acel URL la clic, în loc să deschidă dialogul cu detalii (B1Admin nu trimite `eventUrl`, astfel că዆ calendarul din admin păstrează dialogul).
- **`tag`** filtrează ambele afișări cu `EventHelper.hasTag()` (`@churchapps/helpers`): o potrivire insensibilă la majuscule cu `events.tags`, care conține valori separate prin virgulă; valoarea goală afișează totul. Join-ul calendarului curatoriat selectează `e.tags`, astfel încât evenimentele curatoriate să le conțină.

Evenimentele curatoriate duc la pagină prin `realEventId` (`eventPageId()`), astfel încât URL-ul indică întotdeauna evenimentul de bază. `/{sdSlug}/events/[eventId]` este o rută dedicată (nu pipeline-ul constructorului): încarcă `GET /content/events/public/:churchId/:id` — care returnează `null` pentru evenimentele în așteptare sau respinse și pentru evenimentele private fără înregistrare, și adaugă `roomNames` din rezervările de săli care nu sunt respinse — randează `EventPageContent` (imagine principală cu fotografie, descriere markdown, bara laterală Când/Unde, butonul **Înregistrează-te la acest eveniment** atunci când `registrationEnabled` este activ, și un link **Adaugă în calendarul meu** către `GET /content/events/public/:churchId/:id/ical`), folosește fotografia ca imagine Open Graph și emite JSON-LD `Event` pentru următoarea apariție prin `EventPageJsonLd`. Un eveniment necunoscut sau ascuns returnează un 404 real.

## Widget-uri la nivel de site

Două widget-uri sunt randate pe fiecare pagină publică, nu în interiorul arborelui: **AnnouncementBanner** (bară de sus, care poate fi închisă) și **Launcher** (hub de acțiuni plutitor pentru linkuri de tip „dăruiește", „vizitează" sau „urmărește"). Ambele componente și helper-ele lor `parse*Config()` sunt livrate în apphelper. Configurația constă în două rânduri de setări publice — cheile `announcementBanner` și `launcher` — scrise de `SiteWidgetsEdit` din B1Admin (pe pagina „Aspect") și citite de layout-ul public din B1App prin `GET /content/settings/public/:churchId`. API-ul tratează acestea ca perechi cheie-valoare opace; numele cheilor este o convenție între cele două aplicații.

## Blog

Blogul este un tip de conținut independent, nu un strat peste paginile constructorului. Un rând din `posts` conține întreaga postare: `title`, `slug`, `excerpt`, `content` (corpul markdown), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`. Suprafața publică (toate anonime, `PostController`):

| Rută | Scop |
|-------|---------|
| `GET /content/posts/public/:churchId` | Postările publicate, filtrabile cu `?category=&tag=`, cu paginare |
| `GET /content/posts/public/:churchId/categories` | Categoriile distincte din postările publicate |
| `GET /content/posts/public/:churchId/slug/:slug` | O postare publicată |
| `GET /content/posts/rss/:churchId?siteUrl=` | Feed RSS 2.0, cu titlul numelui bisericii, cu categoria fiecărui element și descrierea de tip extras-sau-conținut |

O postare este „publicată" după ce `publishDate` este setat și a trecut; o `publishDate` viitoare înseamnă o postare programată (ascunsă public, afișată cu cipul „Programată" în admin). Endpoint-urile de citire îmbogățesc fiecare postare cu `authorName`, rezolvat din `authorId` prin gateway-ul modulului membership. Lipsa extrasului este înlocuită cu conținutul fără markdown (~160 de caractere) în cardurile de listare, în meta descrieri și în RSS.

B1App servește `/{sdSlug}/blog` — o listare editorială (antet centrat care devine numele categoriei sau etichetei active când se filtrează, rând de cipuri pentru categorii, rânduri cu miniatură în stânga, cu semnături și extrase), cu feed-ul RSS anunțat ca link alternativ — și `/{sdSlug}/blog/[postSlug]`, o rută dedicată (nu pipeline-ul Zone/Section), cu antet centrat (cuvânt-cheie al categoriei, titlu, semnătură, linie de accent în culoarea principală), imagine principală 16:9 la lățimea containerului, corpul markdown într-o coloană de lectură de ~720 px, cipuri de etichete în subsolul articolului, o fâșie „Mai multe în `{category}`" cu postări conexe și JSON-LD `BlogPosting` care include autorul. Ambele pagini se stilizează exclusiv din tokenii temei, astfel încât moștenesc paleta fiecărei biserici. URL-urile de blog sunt incluse în sitemap-ul fiecărei biserici.

Interfața de creare a articolelor din B1Admin (**Site → Blog**) editează postările într-o fereastră de dialog: editor markdown cu comutator de previzualizare, selector de imagini din galerie decupate 16:9, selector de persoane pentru autor (implicit utilizatorul care editează), autocompletare a categoriilor din cele existente, validarea slug-urilor duplicate și un comutator de publicare; rândurile publicate duc către postarea live, iar pagina îi îndeamnă pe administratori să adauge un link `/blog` în navigare. Comentariile sunt lăsate serviciilor terțe: o setare publică de conținut la nivel de biserică, `blogFooterHtml` (editată în **Below Every Post**, pe pagina Blog, și vizibilă doar cu Settings→Edit), este randată sub fiecare postare de componenta `BlogFooterEmbed` din B1App, care recreează tag-urile `<script>` pentru a se executa sub `'strict-dynamic'` și le rulează în ordine (un `src` extern termină de încărcat înainte ca următorul script inline să ruleze), deoarece fragmentele furnizorilor încarcă o bibliotecă și apoi o apelează.

## Pagini rezervate membrilor

`pages.visibility` reutilizează enumerarea linkurilor de navigare — `everyone` (implicit), `visitors`, `members`, `staff`, `team`, `groups` (cu `groupIds`) — dar ca **poartă de acces strictă**, nu ca filtru de navigare (`PageVisibilityHelper.canViewPage`). Fluxul:

1. Endpoint-ul anonim al arborelui verifică vizibilitatea pentru cererile pe bază de URL. Apelanții anonimi ai unei pagini restricționate primesc `{ restricted: true, visibility }` în loc de conținut — arborele nu scurge niciodată conținut.
2. Endpoint-ul tot acceptă un JWT: `CustomAuthProvider` verifică antetul `Authorization` la *fiecare* cerere, inclusiv pe rutele anonime, astfel că cererea unui membru autentificat pentru același URL se rezolvă normal.
3. B1App randează `RestrictedPage` la un răspuns `restricted`: hidratează sesiunea din credențialele stocate, reface cererea arborelui cu JWT-ul și îl randează — sau afișează o poartă de autentificare cu un `returnUrl` când nu există sesiune.

:::info
Granularitatea porții variază în funcție de nivel: `groups` verifică `groupIds` din token față de lista paginii, iar `staff` verifică `membershipStatus`, dar `members` și `team` acceptă momentan orice utilizator autentificat al bisericii. Tratați `groups` ca opțiunea strictă.
:::

## SEO și descoperabilitate

Toate acestea sunt randate de B1App peste datele ContentApi — API-ul stochează, aplicația emite:

| Aspect | Cum funcționează |
|---------|--------------|
| Meta descrieri | `pages.metaDescription` (≤300 de caractere) ajunge prin `MetaHelper.getMetaData()` în `Metadata` din Next.js (description + Open Graph) pe fiecare rută randată de constructor. Setările paginii din B1Admin includ un buton AI „Generate" (vezi mai jos) |
| Redirecționări | Rânduri `redirects` per biserică, administrate la `/content/redirects` (`content.edit`, limită de 200 de rânduri, căi normalizate). La o potențială 404, ruta paginii din B1App rezolvă calea față de `GET /content/redirects/public/:churchId` și emite un HTTP 308 prin `permanentRedirect` din Next; căile nepotrivite ajung la `notFound()` |
| 404 cu brandul bisericii | `not-found.tsx` randează `BrandedNotFound` cu logo-ul, numele și tema bisericii, în loc de o eroare generică. Căile necunoscute `/register/[eventId]`, `/events/[eventId]`, `/stream/[pageSlug]` și `/volunteer/[planId]` returnează un 404 real, la fel ca subdomeniile necunoscute și slug-urile de pagină malformate (vezi [Rutare site-uri și multi-site](./websites.md)) |
| Date structurate | JSON-LD `BlogPosting` pe postările de blog; `VideoObject` pe paginile fiecărei predici (`/{sdSlug}/sermons/[sermonId]`) și pe paginile care conțin un element `sermons`; `Event` din elementele de calendar/evenimente de pe paginile constructorului și pe fiecare pagină `/{sdSlug}/events/[eventId]` (următoarea apariție, cu fotografia evenimentului ca `image`); `Event` schema.org din elementul `serviceTimes` |
| Pagini de predici | Fiecare predică publică primește o pagină indexabilă la `/sermons/[sermonId]`, cu metadate complete — predicile nu mai sunt blocate în browser-ul din partea clientului |
| Analitică | Setarea publică `ga4MeasurementId` (administrată lângă redirecționări, în B1Admin) injectează un gtag GA4 specific bisericii prin `next/script`. Aplicația B1 (`/{sdSlug}/mobile`) trimite și ea vizualizările de pagină către acest ID, alături de tag-ul propriu ChurchApps, când este un ID `G-` valid (ID-urile containerelor GTM rămân doar pe site-urile web). Fiecare `gtag('config')` poartă un `display_mode` de `installed` sau `browser`, pe baza `navigator.standalone` sau a interogării media `(display-mode: standalone)` (`B1App/src/helpers/mobileAnalytics.ts`) |
| Sitemap și feed-uri | Ruta `sitemap.xml` a fiecărei biserici include paginile constructorului, URL-urile de blog și cele mai recente 50 de pagini de predici (cu `<lastmod>` din data publicării fiecărei predici). Mai listează paginile integrate `/sermons`, `/groups` și `/volunteer` atunci când au conținut (grupuri publice, planuri de înscriere), cu excepția cazului în care o redirecționare salvată înlocuiește acea cale. `/` este omis când biserica nu are pagină de start, deoarece `/` redirecționează atunci către `/mobile`, care este interzis. Listarea de blog anunță feed-ul RSS |
| Accesibilitate | Interfața publică randează un link de sărire (skip link) care țintește reperul `<main id="main-content">` din fiecare wrapper de layout |

## Generare AI (AskApi)

Generarea paginilor și a site-urilor rulează în **AskApi**, un serviciu separat, sub controller-ul `/website`. Se autentifică cu același JWT `CustomAuthProvider` ca restul și este **fără stare în raport cu conținutul**: fiecare endpoint returnează JSON, iar apelantul (B1Admin) salvează rezultatul prin ContentApi (`POST /content/pages/importTree` creează o pagină cu întregul arbore imbricat de secțiuni și elemente într-un singur apel; inserează întotdeauna sub biserica apelantului și ignoră id-urile din corpul cererii).

### Generarea paginilor (`planPage` → `writePage`)

Șablonul „AI" al paginii din `AddPageModal` din B1Admin folosește un pipeline cu cost redus (`AskApi/src/helpers/SiteGenHelper.ts`), construit pe o regulă: **niciun model nu emite JSON pentru constructor**. Două modele împart munca prin Vercel AI Gateway (HTTP simplu, cheie SSM `/{env}/aiGatewayApiKey` sau `AI_GATEWAY_API_KEY`):

- **JEV** (`typesafe-ai/jev`) — un model de decizii tipizate, care returnează alegeri, scoruri și valori booleene cu probabilități, dar nu poate scrie text. Alege fiecare secțiune pe rând dintr-o bibliotecă fixă de șabloane, punctează layout-urile, verifică faptic textul și alege fotografii de stoc și iconițe. Costul de intrare este de aproximativ 0,04 $ per milion de tokeni, iar ieșirea este gratuită, astfel că ~90 de apeluri per pagină costă o fracțiune de cent.
- **Un model de chat mic (GPT-4.1 mini implicit)** — completează sloturile de text denumite și limitate ca lungime ale șabloanelor alese. Modelul de scriere este o constantă, care poate fi suprascrisă cu variabila de mediu `SITEGEN_COPY_MODEL` (orice ID de model de chat de pe gateway, de ex. `anthropic/claude-haiku-4.5`). Într-o comparație oarbă, pe trei biserici, Claude Haiku 4.5 a sunat puțin mai cald, dar GPT-4.1 mini a fost apropiat, de aproximativ 4 ori mai ieftin și mai rapid, așa că este implicit. O pagină completă cu toate cele trei layout-uri costă aproximativ 1,3 cenți, din care ~80% revine modelului de scriere.

| Fază | Endpoint | Ce se întâmplă |
|-------|----------|---------------|
| 1 | `POST /website/planPage` | Clasifică tipul paginii (home, visit, about…), apoi eșantionează 10 layout-uri candidate din probabilitățile per rundă ale JEV (hero + număr de secțiuni → fiecare secțiune → închidere), elimină duplicatele, cere JEV-ului să le puncteze pentru potrivire, flux și lacune, și returnează primele 3 plus o voce de scriere și un `suggestedStyle` (paletă + fonturi). Candidații care au aceleași secțiuni până acum pun JEV-ului o întrebare identică, deci rundele sunt memorate pe prefix. Un scor maxim sub 6 este înregistrat ca `lowLayoutScore` — acest jurnal este lista de șabloane care merită adăugate. ~2 s |
| 2 | `POST /website/writePage` (un apel per candidat) | Modelul de scriere completează textul sloturilor câte două secțiuni per apel, în paralel, și returnează cinci titluri hero dintre care alege JEV; JEV verifică faptic fiecare secțiune; secțiunile care eșuează, folosesc o formulare generică sau repetă o secțiune anterioară (secvențe comune de 4 cuvinte, verificate în cod) sunt rescrise în paralel, cu motivul specific; o curățare în cod elimină propozițiile cu formulări generice de site-uri de biserică (cu excepția cazului în care descrierea proprie a bisericii le folosește); JEV alege subiectele fotografiilor, iconițele și separatorul de formă al hero-ului și punctează rezultatul. Returnează un arbore de secțiuni gata de salvat și un scor. ~6–9 s |
| 3 | `POST /content/pages/importTree` | B1Admin scrie doar layout-ul cel mai bine clasat (al doilea este rezerva dacă scrierea eșuează), îl salvează și deschide previzualizarea (~10 s după Salvează) |

Fiecare fază este o cerere separată, astfel încât fiecare apel rămâne în limita de 29 de secunde a API Gateway. Șabloanele din `SiteGenHelper.buildTree` sunt arbori fixi de secțiuni și elemente din catalog (`text`, `row`/`column`, `card`, `iconFeature`, `faq`, `table`, `testimonial`, `textWithPhoto`, `box`, `map`, `sermons`) și fac referire la tokenii temei (`var(--accent)`, `var(--lightAccent)`…), astfel încât paginile generate moștenesc setările de aspect existente ale bisericii. Adăugarea unui șablon de secțiune înseamnă adăugarea listei sale de sloturi în `SECTIONS` și a arborelui său în `buildTree`; testul unitar parcurge fiecare șablon și validează arborele.

**Intrările.** Textul poate afirma fapte doar din două surse: ce a scris utilizatorul și `churchContext.facts` — înregistrări pe care B1Admin le adună înainte de planificare (orele publice ale serviciilor, numele grupurilor publice, plus numele și adresa bisericii). Aceiași indicatori controlează șabloanele bazate pe date: `times` randează elementul live `serviceTimes` atunci când biserica își ține orele serviciilor în B1 (altfel, un tabel scris manual), iar `groups` și `countdown` sunt oferite doar când există date în spatele lor. Apelurile JEV sunt acoperite (hedged) — un duplicat pornește după 1,5 s, iar primul răspuns câștigă — pentru că gateway-ul se blochează ocazional, iar apelurile sunt aproape gratuite.

**Rămânerea pe subiect.** Promptul utilizatorului este *subiectul paginii*, nu informații generale despre biserică. `planPage` clasifică cererea (`home`, `visit`, `about`, `ministries`, `give`, `contact`, `event`, `topic`), iar pentru paginile `event` și `topic` șabloanele generale ale bisericii (notă de la pastor, predici, lucrări, grupuri, impact comunitar, orele săptămânale și numărătoarea inversă, hero video) nu sunt oferite deloc, în schimb sunt oferite `details` (când / unde / ce să aduci) și un `eventCountdown` cu dată. Ambii evaluatori punctează încadrarea în subiect. B1Admin transmite `pageType` din plan în fiecare apel `writePage`.

**Pagini complete din cereri scurte.** Paginile au între trei și șase secțiuni mijlocii, lungimi generoase ale sloturilor, o linie introductivă la secțiunile cu carduri și un FAQ cu cinci întrebări, iar pasul de reparare extinde orice secțiune care iese prea subțire. Generarea se face cu un singur clic: nu există întrebări de clarificare. Când cererea nu include un detaliu obișnuit de care are nevoie o pagină completă (o oră de început, o sală, ce să aducă, cum te înscrii), scriitorul completează cu o alegere plauzibilă și modestă, pe care biserica o poate edita. Pentru că secțiunile sunt scrise în paralel, aceste lacune sunt hotărâte **o singură dată**, în `planPage` (`assumedDetails`, un apel mic al scriitorului care rulează alături de eșantionarea layout-urilor), și sunt transmise înapoi în fiecare apel `writePage` prin `churchContext.assumedDetails`, astfel încât o secțiune nu poate spune 5:00 în timp ce alta spune 5:30. JEV repară orice secțiune care contrazice cererea, înregistrările bisericii sau detaliile hotărâte. Detaliile hotărâte nu sunt afișate în interfață; biserica revizuiește și editează pagina ca orice altă pagină. Unele lucruri nu sunt niciodată inventate: numele persoanelor, numerele de telefon, adresele de e-mail și web, prețurile, statisticile, istoria bisericii, citatele atribuite unor persoane și ziua săptămânii pentru o dată pentru care cererea nu o specifică.

**Elemente vizuale.** Șabloanele nu-și numesc niciodată fotografiile sau iconițele. Lasă sloturi deschise, iar o singură trecere generică (`visualSlots` → `pickVisuals` → `applyVisuals` în `SiteGenHelper`) parcurge arborele terminat și completează fiecare: un fundal de secțiune sau o intrare de galerie marcată `auto:photo`, un `auto:icon`, `auto:divider` al hero-ului și, fără niciun marcaj, orice element `textWithPhoto`, `card` sau `image` al cărui `photo` este gol. JEV alege fiecare element din textul de lângă el (fotografia unui card din titlul și textul acestuia; un fundal din textul secțiunii), fără ca vreun subiect să se repete pe pagină. Un șablon nou primește astfel fotografii gratuit. Fotografiile sunt subiecte de căutare Pexels, emise ca substituenți `pexels:<term>`, pe care B1Admin îi rezolvă prin `POST /content/stock/search`; un client care nu trimite `resolvesPhotos` primește în schimb o imagine hero integrată, benzi de culoare plată și carduri fără fotografie. Intenționat nu există subiecte cu portrete, iar șablonul pentru pastor nu conține nicio fotografie: un străin de la stoc nu trebuie să ia locul unei persoane reale. Pentru o biserică fără pagini încă, B1Admin aplică `suggestedStyle` la stilurile globale; site-urile existente își păstrează aspectul.

### Alte endpoint-uri

:::info
Butonul de rescriere din `SectionToolbar` și butonul „Generate Site" din lista paginilor din B1Admin rămân comentate pe partea de client. Endpoint-urile AskApi de mai jos continuă să răspundă; doar interfața este ascunsă.
:::

| Endpoint | Scop |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | Fluxul original de pagină în doi pași (schiță, apoi un apel LLM per secțiune care emite JSON de elemente). Înlocuit în B1Admin de `planPage`/`writePage` din cauza costului; păstrat pentru consumatorii API |
| `POST /website/generateSite` | Generarea întregului site. **În două faze, prin design**: un apel cu `planOnly: true` returnează doar planul multi-pagină (un apel rapid la model), apoi clientul cere conținutul complet — astfel fiecare cerere rămâne în limita de timp Lambda/API Gateway |
| `POST /website/rewriteSection` | Rescriere care păstrează structura: modelul poate schimba doar răspunsurile cu text. O semnătură recursivă a structurii (id-uri, tipuri și ordine) se compară înainte și după; orice nepotrivire returnează secțiunea originală cu `fallback: true`, în loc de o structură coruptă |
| `POST /website/generateAltText` | Apel de viziune pentru până la 20 de URL-uri de imagini; returnează un text alternativ concis (≤125 de caractere, fără prefixele „photo of") |
| `POST /website/generateMetaDescription` | O meta descriere SEO (≤155 de caractere) din conținutul textual al paginii — conectată la butonul Generate din setările paginii din B1Admin |

Prompturile acestor endpoint-uri sunt fișiere markdown din `AskApi/config/instructions/`, inclusiv catalogul de elemente din care generează modelul. Două decizii de design mențin catalogul onest: clientul transmite `availableElementTypes` în fiecare cerere (promptul poate folosi doar tipuri din această listă — serverul nu fixează niciodată setul complet), iar instrumentul MCP `describe_page_builder` al API-ului conține același ghid pentru agenții AI care lucrează prin [MCP](../api/mcp.md). Modelele sunt Anthropic Claude prin OpenRouter — 3.5 Haiku pentru conținutul secțiunilor (latență), 3.5 Sonnet pentru schițe, planuri de site și viziune — cu un fallback OpenAI când nu este configurată o cheie OpenRouter.

## Formulare conversaționale

Formularele (modulul membership) au primit un mod conversațional, destinat paginilor de tip connect card. Patru coloane din `forms` îl controlează: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **Randare** — `FormSubmissionEdit` din apphelper trece la componenta `ConversationalForm` (câte o întrebare pe rând) când `displayMode` este `conversational`; pagina de formular din B1App transmite modul mai departe. Același payload de trimitere în ambele cazuri.
- **Crearea automată a persoanei** — la trimiterea cu `autoCreatePerson` activ, `ConversationalFormHelper.findOrCreatePerson` deduplică după e-mail (fără sensibilitate la majuscule) și altfel creează o gospodărie și o persoană cu `membershipStatus: "Guest"`, apoi leagă trimiterea de acea persoană.
- **E-mail de urmărire** — când sunt setate un subiect și un corp, expeditorul primește un e-mail șablon (cu tokenii `{firstName}` și `{churchName}`) prin calea tranzacțională existentă (`TransactionalEmailHelper`), niciodată prin digestul de notificări. Ambele efecte secundare sunt non-fatale: un eșec nu pierde niciodată trimiterea.

Cele patru câmpuri sunt setate momentan prin API; editorul de formulare din B1Admin nu le expune încă.

## Cache-ul site-ului public

Calea de randare publică a B1App memorează în cache preluările etichetate cu biserica (`next: { revalidate: 300, tags: [sdSlug] }` în producție; `0` în dev), astfel că o pagină live poate rămâne veche până la cinci minute după o scriere în ContentApi. `POST /api/revalidate/{sdSlug}` din B1App apelează `revalidateTag(sdSlug)` și este singura cale de a elimina din cache mai devreme.

Doi scriitori ating acest cache:

1. **B1Admin** — `clearSiteCache()` din `B1Admin/src/site/siteCache.ts` face POST după salvările din editor. Preferă subdomeniul site-ului activ (un site secundar trebuie să invalideze *acel* tag, nu cel implicit al bisericii).
2. **Api** — mutațiile de conținut care nu trec niciodată prin B1Admin (chei API, MCP, AI) apelează `SiteCacheHelper.bump(churchId)` din controller-ele de conținut. Helper-ul rezolvă subdomeniul bisericii prin `SubDomainHelper` și face POST către `{b1AppRoot}/api/revalidate/{sd}`. Erorile sunt înghițite, astfel încât un B1App inaccesibil nu poate face să eșueze o salvare.

Controller-ele care fac bump: pagini (salvare, ștergere, duplicare, publicare, renunțare, anulare publicare, temp AI), secțiuni, elemente, blocuri, linkuri, stiluri globale, postări și redirecționări. `b1AppRoot` în dev este `http://{subdomain}.localtest.me:3301`; demo și producția folosesc `https://{subdomain}.b1.church`.

## Pagini conexe

- [Rutare site-uri și multi-site](./websites.md) — cum se rezolvă o cerere către o biserică sau un site și cum se rutează domeniile personalizate
- [Endpoint-uri de conținut](../api/endpoints/content.md) — suprafața REST completă pentru pagini, secțiuni, elemente, blocuri, postări, redirecționări și setări
- [AppHelper](../shared-libraries/app-helper.md) — pachetul npm care livrează randatoarele, registrul, separatoarele și widget-urile
- [Serverul MCP](../api/mcp.md) — inclusiv instrumentul de ghid `describe_page_builder`
- [Editorul de pagini (utilizator final)](/docs/b1-admin/website/page-editor) — documentația editorului pentru personalul bisericii
