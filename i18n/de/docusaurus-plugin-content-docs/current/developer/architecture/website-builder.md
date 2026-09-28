---
title: "Website-Builder-Architektur"
---

# Website-Builder-Architektur

<div class="article-intro">

Jede von B1App bereitgestellte Kirchenwebseite wird aus einer Inhaltsstruktur gerendert – Seiten, Abschnitte, Elemente – die in der ContentApi gespeichert und visuell in B1Admin bearbeitet wird. Eine gemeinsame Komponentenbibliothek rendert sowohl die Editor-Vorschau als auch die Live-Website, ein einzelner Element-Typ-Katalog definiert, was auf einer Seite erscheinen kann, und ein separater KI-Dienst kann diese Struktur generieren oder umschreiben. Diese Seite zeigt den gesamten Stack: den Element-Vertrag in `@churchapps/helpers`, die Render-Pipeline, Kirchendaten-Elemente, Website-Widgets, die Blog-Schicht, zugangsgesperrte Seiten, SEO, KI-Generierung und konversative Formulare.

</div>

## Übersicht

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

Drei Regeln gelten im gesamten Stack:

1. **Ein Baum, zwei Renderer.** Eine Seite ist eine `pages → sections → elements`-Struktur, wobei jeder Knoten seine Einstellungen als JSON-Blob `answers` trägt. Dieselben Apphelper-Komponenten rendern den Drag-and-Drop-Editor in B1Admin und die Server-seitigen Rendering-Seite in B1App – es gibt kein separates „Veröffentlichungsformat".
2. **Der Vertrag lebt in `@churchapps/helpers`.** `ElementTypes.ts` ist der einzelne Katalog der Element-Typen; Renderer werden durch eine Registrierung in apphelper aufgelöst; Editor-Formulare leben in B1Admin. Das Hinzufügen eines Element-Typs bedeutet, alle drei in dieser Reihenfolge zu ändern.
3. **Die öffentliche Website liest anonyme Endpunkte.** Alles, was B1App benötigt – die Seitenstruktur, Einstellungen, Blog-Posts, Weiterleitungen und die Kirchendaten-Endpunkte in anderen Modulen – ist öffentlich. Authentifizierung ist optional: Ein JWT am anonymen Struktur-Endpunkt entsperrt nur für Mitglieder zugängliche Seiten, sonst ändert sich nichts.

## Die Inhaltsstruktur

Das Content-Modul (`Api/src/modules/content`) besitzt die Builder-Daten:

| Tabelle | Rolle |
|-------|------|
| `pages` | Eine Seite pro URL: `url`, `title`, `layout`, plus `visibility`/`groupIds` (Zugriffskontrolle) und `metaDescription` (SEO) |
| `sections` | Horizontale Bänder auf einer Seite (oder in einem Block): Hintergrund, Textfarbe und ein `answersJSON`, das Styling und die `dividerTop`/`dividerBottom`-Forme-Divider-Konfigurationen trägt |
| `elements` | Inhaltsteile in einem Abschnitt: `elementType` + `answersJSON`, verschachtelbar für Layout-Typen (row/column, carousel) |
| `blocks` | Wiederverwendbare Abschnitts-/Element-Gruppen (Footer-Blöcke, Element-Blöcke) über Seiten hinweg freigegeben |
| `posts` | Eigenständige Blog-Posts (siehe [Blog](#blog)) |
| `redirects` | Pro-Kirche `fromPath → toPath`-Paare, begrenzt auf 200 (siehe [SEO](#seo-und-entdeckbarkeit)) |
| `settings` | Schlüssel-Wert-Kircheneinstellungen; Zeilen mit Flag `public` werden anonym bereitgestellt und tragen die Widget-/Analyse-Konfiguration |

Der gesamte Baum für eine URL kommt von einem einzelnen anonymen Aufruf – `GET /content/pages/:churchId/tree?url=/about` – das ist das, was B1App serverseitig rendert. Editor-Anfragen rufen stattdessen nach ID ab und behalten interne IDs.

## Der Element-Vertrag

### Der Katalog (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` definiert jeden Element-Typ als `ElementTypeDefinition`: `elementType`, `label`, `category`, `schemaVersion`, `defaults` und ein JSON-Schema-ähnliches `answersSchema` für seine Antworten. `validateElementAnswers()` ist absichtlich tolerant – unbekannte Typen und zusätzliche Schlüssel passieren, sodass alte Inhalte bei einem Katalog-Upgrade nie unterbrochen werden. **35 Typen sind heute enthalten:**

| Kategorie | Element-Typen |
|----------|---------------|
| layout (6) | row, column, box, carousel, whiteSpace, block |
| content (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| media (4) | image, gallery, video, map |
| church (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| advanced (2) | rawHTML, iframe |

Das `sermons`-Element ist das konfigurierbarste der Kirchen-Typen: Eine `layout`-Antwort wählt `browse` (der Legacy-Vollbrowser), `grid`, `list` oder `featuredLatest`, wobei `playlistId`, `itemCount`, `showTitles` und `showDates` die Nicht-Browse-Layouts verfeinern.

### Renderer (`@churchapps/apphelper`)

Renderer befinden sich in `Packages/apphelper/src/website/components/elementTypes/`, eine Komponente pro Typ, die durch `ElementRegistry.ts` aufgelöst wird – eine zweischichtige Map, wobei `Element.tsx` den Standard-Renderer für alle 35 Typen registriert (`registerDefaultElementRenderer`) und eine Host-App jeden zur Laufzeit überschreiben kann (`registerElementRenderer`) ohne die Packe zu forken.

### Editor-Formulare (B1Admin)

Die Editor-Einstellungsformulare pro Typ befinden sich in `B1Admin/src/site/admin/elements/` – `ElementEdit.tsx` verteilt an eine dedizierte Komponente (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) oder einen Inline-Feld-Builder pro Typ. Das KI-Pendant dieses Katalogs ist das MCP-Tool `describe_page_builder` der API (siehe [MCP Server](../api/mcp)).

### Abschnitt-Form-Divider

Abschnitte können dekorative Form-Divider an jedem Rand tragen. Die Konfiguration befindet sich im `answersJSON` des Abschnitts als `dividerTop` / `dividerBottom`-Objekte – `{ shape, color, height, flip }` mit `shape` als eines von `wave, waves, slant, curve, triangle, peaks`. Apphelper verschifft die `SectionDivider`-Komponente und den `parseDividerConfig()`-Helper; beide Apps' Abschnitts-Renderer (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) analysieren die Antworten und montieren den Divider, und `SectionEdit.tsx` in B1Admin bietet die Picker-UI. Die Pakete verschicken nur den Baustein – die Verdrahtung auf Abschnittsebene ist Aufgabe der verbrauchenden Apps.

## Kirchendaten-Elemente

Drei Element-Typen rendern Live-Kirchendaten statt verfasster Inhalte. Die Modul-Isolation gilt weiterhin – jeder ruft seinen eigenen öffentlichen Endpunkt des Moduls vom Browser auf:

| Element | Endpunkt | Anmerkungen |
|---------|----------|-------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Gibt `{ fundId, totalAmount, donationCount }` zurück, optionales `?startDate=&endDate=`-Fenster; das Element vergleicht dies mit seiner `goalAmount`-Antwort |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Nur auf Opt-in-Basis**: Die Gruppe muss `publicRoster` gesetzt haben (Standard aus). Die Projektion ist absichtlich minimal – `personId`, `displayName`, `leader`, Foto – keine Kontakt- oder demografischen Felder |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Gibt den Campus → Service → Zeit-Baum zurück; der Apphelper-Renderer gibt sein Best-Effort-Schema.org `Event` JSON-LD aus (die API gibt einfache Daten zurück) |

:::warning
`publicRoster` ist das Datenschutz-Gate für `staffGrid`. Erweitern Sie nie die öffentliche Gruppenmitglieder-Projektion oder umgehen Sie das Flag – der Roster-Endpunkt ist nach Design anonym und die minimale Feldliste ist die Sicherheitseigenschaft.
:::

## Website-Widgets

Zwei Widgets rendern auf jeder öffentlichen Seite statt in der Struktur: **AnnouncementBanner** (Dismissible Top-of-Page-Leiste) und **Launcher** (Floating-Action-Hub für Give/Visit/Watch-artige Links). Beide Komponenten und ihre `parse*Config()`-Helper werden in Apphelper verschickt. Die Konfiguration besteht aus zwei öffentlichen Einstellungszeilen – Schlüssel `announcementBanner` und `launcher` – geschrieben von B1Admin's `SiteWidgetsEdit` (auf der Appearance-Seite) und gelesen von B1App's öffentliches Layout via `GET /content/settings/public/:churchId`. Die API behandelt diese als undurchsichtige Schlüssel-Wert-Paare; die Schlüsselnamen sind eine Konvention zwischen den beiden Apps.

## Blog

Der Blog ist ein eigenständiger Content-Typ, keine Ebene über Builder-Seiten. Eine `posts`-Zeile hält den gesamten Post: `title`, `slug`, `excerpt`, `content` (Markdown-Text), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`. Öffentliche Oberfläche (alle anonym, `PostController`):

| Route | Zweck |
|-------|---------|
| `GET /content/posts/public/:churchId` | Veröffentlichte Posts, filterbar nach `?category=&tag=`, paginiert |
| `GET /content/posts/public/:churchId/categories` | Unterschiedliche Kategorien über veröffentlichte Posts |
| `GET /content/posts/public/:churchId/slug/:slug` | Ein veröffentlichter Post |
| `GET /content/posts/rss/:churchId?siteUrl=` | RSS-2.0-Feed, betitelt mit dem Kirchennamen, mit Pro-Element-Kategorie und Ausschnitt-oder-Inhalt-Beschreibung |

Ein Post wird „veröffentlicht", sobald `publishDate` gesetzt und vorbei ist; ein zukünftiges `publishDate` ist ein geplanter Post (öffentlich verborgen, mit einem geplanten Chip in Admin angezeigt). Endpunkte lesen die Abfrage jedes Posts mit `authorName`, die durch `authorId` durch das Mitgliedschaftsmodul-Gateway aufgelöst wird. Fehlende Ausschnitte fallen auf gezogene Markdown-Inhalte (~160 Zeichen) in Listenkarten, Metabeschreibungen und RSS zurück. B1App dient `/{sdSlug}/blog` – eine redaktionelle Liste (Kopfzeile in der Mitte, die zum aktiven Kategorie-/Tag-Namen wird, wenn gefiltert, Kategorie-Chip-Filterzeile, Bild-links Post-Reihen mit Autoren- und Ausschnittzeilen) mit dem RSS-Feed als alternativer Link angekündigt – und `/{sdSlug}/blog/[postSlug]`, eine dedizierte Route (nicht die Zone/Section-Pipeline) mit einer zentrierten Kopfzeile (Kategorie-Kicker, Titel, Autorenliste, primäre Farb-Akzentregel), ein 16:9-Hero bei Container-Breite, der Markdown-Text in einer ~720px-Lesesspalte, Tag-Chips im Artikel-Footer, einen `"More in {category}"`-verwandten Posts-Streifen und `BlogPosting` JSON-LD einschließlich des Autors. Beide Seiten styling ausschließlich aus Designmarken, damit sie die Palette jeder Kirche erben. Blog-URLs sind in der Pro-Kirche-Sitemap enthalten. B1Admin's Autorenschaft UI (**Site → Blog**) bearbeitet Posts in einem Dialog: Markdown-Editor mit Umschalter-Vorschau, 16:9-zugeschnittene Galerie-Bild-Picker, Autoren-Person-Picker (Standardwerte für den Benutzer, der bearbeitet), Kategorie-Autocomplete mit bestehenden Kategorien gespielt, Duplikat-Slug-Validierung und ein Veröffentlichungs-Schalter; veröffentlichte Zeilen verlinken zum Live-Post, und die Seite ermutigt Administratoren, einen `/blog`-Navigationslink hinzuzufügen.

## Nur-für-Mitglieder-Seiten

`pages.visibility` verwendet die Navigations-Links-Enum – `everyone` (Standard), `visitors`, `members`, `staff`, `team`, `groups` (mit `groupIds`) – aber als **harte Zugriffskontrolle**, keine Nav-Filter (`PageVisibilityHelper.canViewPage`). Der Flow:

1. Der anonyme Struktur-Endpunkt überprüft Sichtbarkeit bei URL-basierten Abfragen. Anonyme Aufrufer einer Tor-Seite erhalten stattdessen `{ restricted: true, visibility }` – die Struktur leckt niemals.
2. Der Endpunkt ehrt weiterhin ein JWT: `CustomAuthProvider` verifiziert den `Authorization`-Header bei *jedem* Request, einschließlich anonyme Routen, sodass ein authentifiziertes Mitglied das Abrufen der gleichen URL normal auflöst.
3. B1App rendert `RestrictedPage` bei einer `restricted`-Antwort: es hydratisiert die Sitzung aus gespeicherten Anmeldedaten, ruft die Struktur mit dem JWT erneut ab und rendert es – oder zeigt ein Login-Tor mit einer `returnUrl`, wenn es keine Sitzung gibt.

:::info
Die Granularität des Gatters variiert je nach Ebene: `groups` überprüft die `groupIds` des Tokens gegen die Liste der Seite und `staff` überprüft `membershipStatus`, aber `members` und `team` übergeben derzeit jeden authentifizierten Benutzer der Kirche. Behandeln Sie `groups` als die strenge Option.
:::

## SEO und Entdeckbarkeit

Dies ist alles B1App-seitige Rendering über ContentApi-Daten – die API speichert, die App gibt aus:

| Anliegen | Wie es funktioniert |
|---------|--------------|
| Meta-Beschreibungen | `pages.metaDescription` (≤300 Zeichen) fließt durch `MetaHelper.getMetaData()` in die Next.js `Metadata` (Beschreibung + Open Graph) auf jeder Builder-gerenderten Route. B1Admin's Seiteneinstellungen beinhalten einen KI-Button „Generieren" (siehe unten) |
| Weiterleitungen | Pro-Kirche `redirects`-Zeilen verwaltet unter `/content/redirects` (`content.edit`, 200-Zeilen-Kappe, normalisierte Pfade). In einer würde-sein-404, B1App's Seite Route löst den Pfad gegen `GET /content/redirects/public/:churchId` auf und gibt ein HTTP 308 via Next's `permanentRedirect` aus; unabgepasste Pfade fallen durch zu `notFound()` |
| Gebrandmarkte 404 | `not-found.tsx` rendert `BrandedNotFound` mit dem Logo der Kirche, Name und Designmarken statt eines generischen Fehlers |
| Strukturierte Daten | `BlogPosting` JSON-LD auf Blog-Posts; `VideoObject` auf den Pro-Predigtseiten (`/{sdSlug}/sermons/[sermonId]`) und auf Seiten, die ein `sermons`-Element enthalten; `Event` aus Kalender-/Event-Elementen auf Builder-Seiten; schema.org `Event` aus dem `serviceTimes`-Element |
| Predigt-Seiten | Jede öffentliche Predigt erhält eine crawlbar-Seite unter `/sermons/[sermonId]` mit vollständigen Metadaten – Predigten sind nicht mehr in der Client-Seiten-Browser-Element gesperrt |
| Analytik | Der Einstellung öffentliche Schlüssel `ga4MeasurementId` (neben Umleitungen in B1Admin verwaltet) injiziert einen Pro-Kirche GA4 gtag via `next/script` |
| Sitemap & Feeds | Die Pro-Kirche `sitemap.xml`-Route umfasst Builder-Seiten und Blog-URLs; die Blog-Liste bewirbt den RSS-Feed |
| Barrierefreiheit | Die öffentliche Chrome rendert einen Skip-Link, der auf das `<main id="main-content">`-Landmarke in jedem Layout-Wrapper zielt |

## KI-Generierung (AskApi)

Die Seiten- und Sitegenerierung läuft in **AskApi**, einem separaten Service, unter dem `/website`-Controller. Es authentifiziert mit demselben `CustomAuthProvider`-JWT wie alles andere und ist **zustandslos in Bezug auf Inhalte**: Jeder Endpunkt gibt JSON zurück und der Aufrufer (B1Admin) behält das Ergebnis durch ContentApi (`POST /content/pages/importTree` erstellt eine Seite mit ihrer vollständigen verschachtelten Abschnitts-/Element-Struktur in einem Aufruf; es wird immer unter der Kirche des Aufrufers eingefügt und ignoriert IDs im Text).

### Seitengenerierung (`planPage` → `writePage`)

Die „KI"-Seiten-Vorlage in B1Admin's `AddPageModal` verwendet eine kostengünstige Pipeline (`AskApi/src/helpers/SiteGenHelper.ts`), die auf einer Regel aufgebaut ist: **Kein Modell gibt je Builder-JSON aus**. Zwei Modelle teilen die Arbeit durch das Vercel AI Gateway (einfaches HTTP, SSM-Schlüssel `/{env}/aiGatewayApiKey` oder `AI_GATEWAY_API_KEY`):

- **JEV** (`typesafe-ai/jev`) – ein Typ-Entscheidungs-Modell, das Entscheidungen, Scores und Booleane mit Wahrscheinlichkeiten zurückgibt, kann aber keinen Text schreiben. Es wählt jeden Abschnitt der Reihe nach aus einer festen Template-Bibliothek, bewertet Layouts, überprüft den Wahrheitsgehalt von Kopien und wählt Stockfototos und Symbole. Eingabe kostet etwa $0,04 pro Million Token und Ausgabe ist kostenlos, also ~90 Aufrufe pro Seite kosten einen Bruchteil eines Cent.
- **Ein kleines Chat-Modell (GPT-4.1 mini standardmäßig)** – füllt die benannten, längenbegrenzten Textschlitze der gewählten Templates. Der Schriftsteller ist eine Konstante, überschreibbar mit der Umgebungsvariablen `SITEGEN_COPY_MODEL` (beliebiges Chat-Modell-ID auf dem Gateway, z.B. `anthropic/claude-haiku-4.5`). In einem blinden Side-by-Side auf drei Kirchen las Claude Haiku 4.5 sich leicht wärmer, aber GPT-4.1 mini war nah, ungefähr 4x billiger und schneller, also ist es der Standard. Eine vollständige Seite mit allen drei Layouts kostet etwa 1,3 Cent, etwa 80% davon der Schriftsteller.

| Phase | Endpunkt | Was passiert |
|-------|----------|--------------|
| 1 | `POST /website/planPage` | Klassifiziert den Seiten-Typ (home, visit, about…), dann Beispiele 10 Kandidaten-Layouts aus JEV's Pro-Runden-Wahrscheinlichkeiten (hero + Abschnittsanzahl → jeden Abschnitt → näher), dedupliziert, hat JEV jeden für Fit/Flow/Lücken bewerten, und gibt die Top 3 plus eine Schreibstimme und eine `suggestedStyle` (Palette + Fonts) zurück. Kandidaten, die bisher die gleichen Abschnitte teilen, fragen JEV eine identische Frage, also Runden werden durch Prefix auswendig gelernt. Ein bestes Score unter 6 wird als `lowLayoutScore` protokolliert – dieses Log ist das Rücklog der Vorlagen, die hinzugefügt werden sollten. ~2s |
| 2 | `POST /website/writePage` (ein Aufruf pro Kandidat) | Der Schriftsteller füllt die Slot-Kopie zwei Abschnitte pro Aufruf, parallel, und gibt fünf Hero-Überschriften zurück, die JEV wählt; JEV überprüft jeden Abschnitt auf den Wahrheitsgehalt; Abschnitte, die fehlschlagen, einen Standardsatz verwenden oder einen früheren Abschnitt nacherzählen (gemeinsame 4-Wort-Läufe, im Code überprüft) werden parallel mit dem spezifischen Grund neu geschrieben; ein Code-Scrub fallen Sätze mit Standard-Kirchenwebseiten-Phrasen weg (es sei denn, die Beschreibung der Kirche selbst verwendet sie); JEV wählt Fotosubjekte, Symbole und Hero's Form-Divider, und bewertet das Ergebnis. Gibt einen ready-to-save Abschnitts-Baum und ein Score zurück. ~6–9s |
| 3 | `POST /content/pages/importTree` | B1Admin schreibt nur das beste-Ranking-Layout (der Runner-up ist ein Fallback, falls dieser Schreib fehlschlägt), speichert es und öffnet die Vorschau (~10s nach Speichern) |

Jede Phase ist ihr eigener Request, also jeder Aufruf bleibt in dem API Gateway 29-Sekunden-Limit. Templates in `SiteGenHelper.buildTree` sind feste Abschnitts- + Element-Bäume aus dem Katalog (`text`, `row`/`column`, `card`, `iconFeature`, `faq`, `table`, `testimonial`, `textWithPhoto`, `box`, `map`, `sermons`) und Referenz-Design-Marken (`var(--accent)`, `var(--lightAccent)`…), also generierte Seiten erben die bestehenden Erscheinungseinstellungen der Kirche. Das Hinzufügen einer Abschnitts-Template bedeutet, seine Slot-Liste zu `SECTIONS` hinzuzufügen und seinen Baum zu `buildTree`; der Unit-Test geht jede Template durch und validiert den Baum.

**Eingaben.** Kopie kann nur Fakten aus zwei Quellen angeben: was der Benutzer eingegeben hat, und `churchContext.facts` – Datensätze B1Admin vor der Planung sammelt (öffentliche Servicezeiten und öffentliche Gruppennamen, plus Name und Adresse der Kirche). Die gleichen Flags Tor-Daten-Backends Templates: `times` rendert das Live-`serviceTimes`-Element, wenn die Kirche Servicezeiten in B1 führt (eine Typ-Tabelle sonst), `groups` und `countdown` werden nur angeboten, wenn es Daten dahinter gibt. JEV-Aufrufe sind abgesichert – ein Duplikat feuert nach 1,5s und die erste Antwort gewinnt – da das Gateway gelegentlich stecken bleibt und die Aufrufe fast kostenlos sind.

**Auf dem Thema bleiben.** Der Benutzer-Prompt ist der *Thema der Seite*, nicht Hintergrund über die Kirche. `planPage` klassifiziert die Anfrage (`home`, `visit`, `about`, `ministries`, `give`, `contact`, `event`, `topic`), und für `event`- und `topic`-Seiten die allgemeinen Kirchenvorlagen (Pfarrer-Anmerkung, Predigten, Ministerien, Gruppen, Gemeinschaftsauswirkung, wöchentliche Zeiten und Countdown, Video-Hero) werden nicht einmal angeboten, während `details` (wann / wo / was man mitbringen soll) und ein Datum `eventCountdown` sind. Beide Richter bewerten auf-Thema-Heit. B1Admin übergibt `pageType` von der Plan an jeden `writePage`-Aufruf.

**Vollständige Seiten aus kurzen Anfragen.** Seiten haben drei bis sechs mittlere Abschnitte, großzügige Slot-Längen, eine Einleitung zu Abschnitts-Karten und eine Fünf-Fragen-FAQ, und der Reparatur-Pass erweitert jeden Abschnitt, der dünn zurückkommt. Generation ist ein Klick: es gibt keine Folgefragen. Wo die Anfrage eine gewöhnliche Einzelheit auslässt, die eine vollständige Seite benötigt (eine Startzeit, einen Raum, was man mitbringen soll, wie man sich anmeldet), füllt der Schriftsteller sie mit einer angemessenen, bescheidenen Wahl für die Kirche aus. Da Abschnitte parallel geschrieben werden, werden diese Lücken **einmal** entschieden, in `planPage` (`assumedDetails`, ein kleiner Schriftsteller-Aufruf, der neben Layout-Sampling läuft), und in jeden `writePage`-Aufruf durch `churchContext.assumedDetails` zurückgegeben, also ein Abschnitt kann nicht sagen 5:00 während ein anderer 5:30 sagt. JEV repariert jeden Abschnitt, der die Anfrage, die Aufzeichnungen der Kirche oder diese entschiedenen Details widerspricht. Die entschiedenen Einzelheiten werden nicht in der UI angespannt; die Kirche überprüft und bearbeitet die Seite wie jede andere. Einige Dinge werden nie gemacht: Namen von Menschen, Telefonnummern, E-Mail- und Web-Adressen, Preise, Statistiken, die Geschichte der Kirche, Zitate von Personen, und ein Wochentag für ein Datum, das die Anfrage nicht gab.

**Visuals.** Templates benennen nie ihre Fotos oder Symbole. Sie lassen Schlitze offen, und ein generischer Pass (`visualSlots` → `pickVisuals` → `applyVisuals` in `SiteGenHelper`) geht den beendeten Baum durch und füllt jeden: einen Abschnitts-Hintergrund oder Galerie-Eintrag mit `auto:photo` gekennzeichnet, ein `auto:icon`, Hero's `auto:divider`, und, ohne Markierung überhaupt, jeden `textWithPhoto`, `card` oder `image` Element, dessen `photo` leer ist. JEV wählt jeden aus dem Text neben ihm (ein Foto einer Karte aus dem Titel und Text dieser Karte; einen Hintergrund aus dem Abschnitts-Text), ohne Thema wiederholt auf einer Seite. Eine neue Template erhält also Fotos kostenlos. Fotos sind Pexels-Suchthemen, die als `pexels:<term>`-Platzhalter ausgegeben werden, die B1Admin durch `POST /content/stock/search` auflöst; ein Client, der nicht `resolvesPhotos` sendet, bekommt einen Built-in-Hero-Bild, flache Farbbänder und fotolose Karten stattdessen. Es gibt absichtlich keine Porträt-Themen und die Pfarrer-Template trägt kein Foto: ein Lager-Fremder muss nie eine echte Person ersetzen. Für eine Kirche ohne Seiten noch B1Admin wendet `suggestedStyle` auf die globalen Stile an; bestehende Seiten behalten ihre Erscheinung.

### Andere Endpunkte

:::info
Der `SectionToolbar`-Rewrite-Button und der Seiten-Liste „Generate Site"-Button in B1Admin bleiben Client-seitig auskommentiert. Die AskApi-Endpunkte unten antworten weiterhin; nur diese UI ist versteckt.
:::

| Endpunkt | Zweck |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | Der ursprüngliche zweigliedrige Seiten-Flow (Outline, dann ein LLM-Aufruf pro Abschnitt gibt Element-JSON aus). Übertrumpft in B1Admin durch `planPage`/`writePage` wegen Kosten; behalten für API-Verbraucher |
| `POST /website/generateSite` | Ganze-Seite-Generierung. **Zwei-Phase nach Design**: ein `planOnly: true` Aufruf gibt nur den Multi-Seite-Plan zurück (ein schneller Modell-Aufruf), dann fordert der Client vollständigen Inhalt – hält jeden Request in dem Lambda/API-Gateway-Timeout |
| `POST /website/rewriteSection` | Struktur-bewahrtes Umschreiben: das Modell kann nur Text-Tragende Antworten ändern. Eine rekursive Struktur-Signatur (IDs + Typen + Reihenfolge) wird vor und nach verglichen; jedes Mismatch gibt den ursprünglichen Abschnitt mit `fallback: true` statt beschädigter Struktur zurück |
| `POST /website/generateAltText` | Vision-Aufruf über bis zu 20 Bild-URLs; gibt prägnante Alt-Text (≤125 Zeichen, „Foto"-Präfixe entfernt) |
| `POST /website/generateMetaDescription` | Eine SEO-Meta-Beschreibung (≤155 Zeichen) aus dem Text-Inhalt der Seite – verdrahtet zum Generate-Button auf B1Admin's Seiten-Einstellungen |

Anfragen für diese Endpunkte sind Markdown-Dateien unter `AskApi/config/instructions/`, einschließlich des Element-Katalogs, den das Modell generiert. Zwei Design-Punkte halten den Katalog ehrlich: der Client übergibt `availableElementTypes` bei jedem Request (der Prompt darf nur Typen aus dieser Liste verwenden – der Server hardcoded nie das volle Set), und das MCP-Tool `describe_page_builder` der API trägt den gleichen Leitfaden für KI-Agenten durch [MCP](../api/mcp). Modelle sind Anthropic Claude via OpenRouter – 3.5 Haiku für Abschnitts-Inhalt (Latenz), 3.5 Sonnet für Outlines, Site-Pläne und Vision – mit einem OpenAI-Fallback, wenn kein OpenRouter-Schlüssel konfiguriert ist.

## Konversative Formulare

Formulare (Mitgliedschaftsmodul) gewannen einen konversativen Modus gezielt auf Connect-Karte-Seiten. Vier Spalten auf `forms` fahren: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **Rendering** – apphelper's `FormSubmissionEdit` schaltet zur `ConversationalForm`-Komponente (eine Frage zu einer Zeit) wenn `displayMode` `conversational` ist; B1App's Formular-Seite übergibt den Modus. Gleiche Absendenutzlast entweder Weg.
- **Auto-create Person** – bei Abgabe mit `autoCreatePerson` gesetzt, `ConversationalFormHelper.findOrCreatePerson` deduplicates per E-Mail (case-insensitive) und ansonsten erzeugt einen Haushalt + Person mit `membershipStatus: "Guest"`, dann verknüpft die Abgabe mit dieser Person.
- **Folge-E-Mail** – wenn ein Betreff und Text gesetzt sind, erhält der Absender eine verdrahtete E-Mail (mit `{firstName}` / `{churchName}`-Tokens) durch die bestehende transaktionale Weg (`TransactionalEmailHelper`), nie die Mitteilungs-Verdau Tür. Beide Nebenwirkungen sind nicht-fatal: ein Fehler verliert nie die Abgabe.

Die vier Felder werden heute über die API gesetzt; der B1Admin-Formular-Editor macht sie noch nicht sichtbar.

## Public-Site-Cache

B1App's öffentlicher Render-Weg Caches Kirche-getaggte Abfragen (`next: { revalidate: 300, tags: [sdSlug] }` in Produktion; `0` in Entwicklung), also eine Live-Seite kann bis zu fünf Minuten nach einem ContentApi-Schreib alt bleiben. `POST /api/revalidate/{sdSlug}` auf B1App ruft `revalidateTag(sdSlug)` auf und ist die einzige Weise, um diesen Cache früh zu löschen.

Zwei Schriftsteller treffen es:

1. **B1Admin** – `clearSiteCache()` in `B1Admin/src/site/siteCache.ts` POSTs nach Editor-Speicherung. Es bevorzugt die aktive Site's Subdomain (eine sekundäre Site muss *diese* Tag, nicht die Standard der Kirche, brechen).
2. **Api** – Content-Mutationen, die nie durch B1Admin gehen (API-Schlüssel, MCP, KI) feuern `SiteCacheHelper.bump(churchId)` von den Content-Controllern. Der Helper löst die Kirche-Subdomain über `SubDomainHelper` auf und POSTs `{b1AppRoot}/api/revalidate/{sd}`. Fehlschläge werden geschluckt, also ein unerreichbarer B1App kann einen Speichern nicht fehlschlagen.

Controller, die umräumen: Seiten (speichern, löschen, duplizieren, veröffentlichen, verwerfen, unveröffentlichen, KI temp), Abschnitte, Elemente, Blöcke, Links, globale Stile, Posts und Weiterleitungen. Entwicklung `b1AppRoot` ist `http://{subdomain}.localtest.me:3301`; Demo/Staging/Produktion verwenden `https://{subdomain}.b1.church`.

## Zugehörige Seiten

- [Website-Routing & Multi-Site](./websites) – wie ein Request zu einer Kirche/Site aufgelöst wird und wie benutzerdefinierte Domains routen
- [Content-Endpunkte](../api/endpoints/content) – volle REST-Oberfläche für Seiten, Abschnitte, Elemente, Blöcke, Posts, Umleitungen und Einstellungen
- [AppHelper](../shared-libraries/app-helper) – das npm-Paket, das die Renderer, Registry, Divider und Widgets verschickt
- [MCP-Server](../api/mcp) – einschließlich des `describe_page_builder`-Leitfadens-Tools
- [Seite-Editor (End-Benutzer)](/docs/b1-admin/website/page-editor) – die Mitarbeiter-beherrschte Editor-Dokumentation
