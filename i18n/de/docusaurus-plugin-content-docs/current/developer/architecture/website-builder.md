---
title: "Architektur des Website-Builders"
---

# Architektur des Website-Builders

<div class="article-intro">

Jede Kirchenwebsite, die von B1App bereitgestellt wird, wird aus einem Inhaltsbaum gerendert — Seiten, Abschnitte, Elemente —, der in der ContentApi gespeichert und in B1Admin visuell bearbeitet wird. Eine gemeinsame Komponentenbibliothek rendert sowohl die Editor-Vorschau als auch die Live-Website, ein Katalog von Element-Typen legt fest, was auf einer Seite erscheinen kann, und ein separater KI-Dienst kann diesen Baum erzeugen oder umschreiben. Diese Seite beschreibt den gesamten Stack: den Element-Vertrag in `@churchapps/helpers`, die Render-Pipeline, Elemente mit Kirchendaten, seitenweite Widgets, die Blog-Ebene, zugangsbeschränkte Seiten, SEO, KI-Generierung und Dialogformulare.

</div>

## Überblick

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

Über den gesamten Stack gelten drei Regeln:

1. **Ein Baum, zwei Renderer.** Eine Seite ist ein Baum aus `pages → sections → elements`, bei dem jeder Knoten seine Einstellungen als JSON-Objekt `answers` mitführt. Dieselben apphelper-Komponenten rendern den Drag-and-Drop-Editor in B1Admin und die serverseitig gerenderte öffentliche Website in B1App — ein eigenes „Veröffentlichungsformat“ gibt es nicht.
2. **Der Vertrag liegt in `@churchapps/helpers`.** `ElementTypes.ts` ist der einzige Katalog der Element-Typen; Renderer werden über eine Registry in apphelper aufgelöst; Editor-Formulare liegen in B1Admin. Einen Element-Typ hinzuzufügen bedeutet, alle drei Stellen in dieser Reihenfolge anzupassen.
3. **Die öffentliche Website liest anonyme Endpunkte.** Alles, was B1App benötigt — der Seitenbaum, Einstellungen, Blogbeiträge, Weiterleitungen und die Endpunkte mit Kirchendaten in anderen Modulen — ist öffentlich. Authentifizierung ist optional: Ein JWT am anonymen Baum-Endpunkt schaltet nur Seiten für Mitglieder frei; sonst ändert sich nichts.

## Der Inhaltsbaum

Das Inhaltsmodul (`Api/src/modules/content`) verwaltet die Daten des Builders:

| Tabelle | Funktion |
|-------|------|
| `pages` | Eine Seite pro URL: `url`, `title`, `layout` sowie `visibility`/`groupIds` (Zugriffsbeschränkung) und `metaDescription` (SEO) |
| `sections` | Horizontale Bänder auf einer Seite (oder in einem Block): Hintergrund, Textfarbe und ein `answersJSON`, das die Gestaltung sowie die Form-Trenner `dividerTop`/`dividerBottom` enthält |
| `elements` | Inhaltselemente innerhalb eines Abschnitts: `elementType` + `answersJSON`, bei Layout-Typen (Zeile/Spalte, Karussell) verschachtelbar |
| `blocks` | Wiederverwendbare Gruppen aus Abschnitten/Elementen (Fußblöcke, Elementblöcke), die über Seiten hinweg geteilt werden |
| `posts` | Eigenständige Blogbeiträge (siehe [Blog](#blog)) |
| `redirects` | Kirchenspezifische Paare `fromPath → toPath`, begrenzt auf 200 (siehe [SEO](#seo-and-discoverability)) |
| `settings` | Schlüssel-Wert-Einstellungen der Kirche; mit `public` markierte Zeilen werden anonym ausgeliefert und enthalten die Konfiguration von Widgets und Analytics |

Der gesamte Baum für eine URL wird über einen einzigen anonymen Aufruf geliefert — `GET /content/pages/:churchId/tree?url=/about` —, daraus rendert B1App serverseitig. Editor-Anfragen laden stattdessen über die ID und behalten interne IDs bei.

## Der Element-Vertrag

### Der Katalog (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` definiert jeden Element-Typ als `ElementTypeDefinition`: `elementType`, `label`, `category`, `schemaVersion`, `defaults` und ein `answersSchema` im JSON-Schema-Stil für seine Antworten. `validateElementAnswers()` ist bewusst nachsichtig — unbekannte Typen und zusätzliche Schlüssel werden akzeptiert, sodass älterer Inhalt bei einem Katalog-Update nie kaputtgeht. **Derzeit sind 35 Typen enthalten:**

| Kategorie | Element-Typen |
|----------|---------------|
| Layout (6) | row, column, box, carousel, whiteSpace, block |
| Inhalt (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| Medien (4) | image, gallery, video, map |
| Kirche (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| Erweitert (2) | rawHTML, iframe |

Das Element `sermons` ist das konfigurierbarste unter den Kirchen-Typen: Eine `layout`-Antwort wählt `browse` (der bisherige vollständige Browser), `grid`, `list` oder `featuredLatest`; `playlistId`, `itemCount`, `showTitles` und `showDates` verfeinern die Layouts außer `browse`.

Das Element `rawHTML` hat zwei Antworten: `rawHTML` (Markup) und `javascript`. Über `innerHTML` eingefügte Skripte werden nie ausgeführt, daher erzeugt `RawHTMLElement` jeden `<script>`-Knoten im Markup als neues Element. Diese nicht vom Parser eingefügten Knoten gelten unter der `strict-dynamic`-Richtlinie der CSP als vertrauenswürdig. Eine `javascript`-Antwort, die mit `<` beginnt (ein Snippet eines Anbieters, eingefügt mit seinen `<script>`-Tags), wird als Markup geparst und genauso behandelt. Andernfalls läuft sie als einfaches Inline-Skript. B1Admin markiert eine nackte URL im JavaScript-Feld, da eine einzelne URL als wirkungsloses Skript läuft. Das Element `map` rendert nichts und lädt kein Google-Maps-Skript, wenn kein Maps-API-Schlüssel konfiguriert ist.

### Renderer (`@churchapps/apphelper`)

Die Renderer liegen in `Packages/apphelper/src/website/components/elementTypes/`, eine Komponente pro Typ, und werden über `ElementRegistry.ts` aufgelöst — eine zweischichtige Zuordnung, bei der `Element.tsx` den Standard-Renderer für alle 35 Typen registriert (`registerDefaultElementRenderer`) und eine Host-App jeden davon zur Laufzeit überschreiben kann (`registerElementRenderer`), ohne das Paket zu forken.

### Editor-Formulare (B1Admin)

Die typspezifischen Einstellungsformulare des Editors liegen in `B1Admin/src/site/admin/elements/` — `ElementEdit.tsx` verteilt an eine eigene Komponente (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) oder an einen Inline-Feld-Builder je Typ. Das KI-seitige Gegenstück zu diesem Katalog ist das MCP-Tool `describe_page_builder` der API (siehe [MCP-Server](../api/mcp)).

Die Editor-Vorschau bindet dasselbe `Theme` ein wie die Live-Website; dieses setzt die CSS-Variablen `--headingFont` / `--bodyFont` aus den globalen Stilen der Kirche. B1App wendet diese Variablen über `pages.css` an, das B1Admin nicht importieren kann. Daher fügt `ContentEditor.tsx` `EDITOR_PAGE_FONT_CSS` (`src/site/admin/editorCss.ts`) ein, um sie auf den Fließtext von `.page` sowie `h1`–`h6` anzuwenden. Ohne dies zeigte die Vorschau Überschriften in der Schrift der Verwaltungsoberfläche.

### Form-Trenner für Abschnitte

Abschnitte können an beiden Kanten dekorative Form-Trenner haben. Die Konfiguration liegt im `answersJSON` des Abschnitts als Objekte `dividerTop` / `dividerBottom` — `{ shape, color, height, flip }`, wobei `shape` einer der Werte `wave, waves, slant, curve, triangle, peaks` ist. Apphelper liefert die Komponente `SectionDivider` und die Hilfsfunktion `parseDividerConfig()`; die Section-Renderer beider Apps (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) lesen die Antworten aus und binden den Trenner ein, und `SectionEdit.tsx` in B1Admin stellt die Auswahloberfläche bereit. Die Pakete liefern nur den Baustein — die Verdrahtung auf Abschnittsebene ist Aufgabe der nutzenden Apps.

## Elemente mit Kirchendaten

Drei Element-Typen zeigen Live-Kirchendaten statt erstellter Inhalte an. Die Modulisolation gilt weiterhin — jedes ruft den öffentlichen Endpunkt des zuständigen Moduls direkt aus dem Browser auf:

| Element | Endpunkt | Hinweise |
|---------|----------|-------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Gibt `{ fundId, totalAmount, donationCount }` zurück, optional mit dem Zeitfenster `?startDate=&endDate=`; das Element vergleicht den Wert mit seiner Antwort `goalAmount` |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Nur auf Wunsch**: Die Gruppe muss `publicRoster` gesetzt haben (Standard: aus). Die Projektion ist bewusst minimal — `personId`, `displayName`, `leader`, Foto — ohne Kontakt- oder demografische Felder |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Gibt den Baum Campus → Gottesdienst → Uhrzeit zurück; der apphelper-Renderer erzeugt daraus nach bestem Bemühen schema.org-`Event`-JSON-LD (die API liefert reine Daten) |

:::warning
`publicRoster` ist die Datenschutzsperre für `staffGrid`. Erweitern Sie niemals die öffentliche Projektion der Gruppenmitglieder und umgehen Sie das Flag nicht — der Roster-Endpunkt ist absichtlich anonym, und die minimale Feldliste ist die Sicherheitseigenschaft.
:::

### Kalenderelement und Veranstaltungsseiten

Die Antworten des Elements `calendar` sind `calendarType` (`group` | `curated`), `calendarId`, `display` (`month`, der Standard, oder `upcoming`) und `tag`. B1App überschreibt den apphelper-Renderer in `src/components/Element.tsx` mit `registerElementRenderer("calendar", …)`:

- **`display: "upcoming"`** rendert das `UpcomingEventsElement` von B1App: Es lädt `GET /content/events/public/group/:churchId/:groupId` oder `GET /content/curatedEvents/public/calendar/:churchId/:curatedCalendarId`, löst Wiederholungen mit `buildOccurrences()` auf (`src/helpers/EventOccurrences.ts`, eine Auftretung pro Veranstaltung innerhalb eines Jahres) und zeigt die ersten 12 als Foto-Kacheln (`events.photoUrl`; ersatzweise der Titel auf der dunklen Farbe des Themes), die auf `/events/{id}` verlinken, mit einem Menü „Abonnieren“ für den ICS-Feed des Kalenders.
- **`display: "month"`** rendert das `CalendarElement` von apphelper mit einem `eventUrl`-Callback. `GroupCalendar` / `CuratedCalendar` → `EventCalendar` / `CuratedEventCalendar` navigieren dann beim Klicken zu dieser URL, statt den Detaildialog zu öffnen (B1Admin übergibt kein `eventUrl`, daher behält der Administratorkalender seinen Dialog).
- **`tag`** filtert beide Darstellungen mit `EventHelper.hasTag()` (`@churchapps/helpers`): ein Abgleich ohne Beachtung der Groß-/Kleinschreibung gegen die durch Kommas getrennten `events.tags`; leer zeigt alles. Die Verknüpfung des kuratierten Kalenders wählt `e.tags` aus, damit kuratierte Veranstaltungen sie mitführen.

Kuratierte Veranstaltungen verlinken über `realEventId` (`eventPageId()`), sodass die URL immer die zugrunde liegende Veranstaltung nennt. `/{sdSlug}/events/[eventId]` ist eine eigene Route (nicht die Builder-Pipeline): Sie lädt `GET /content/events/public/:churchId/:id` — das für ausstehende oder abgelehnte Veranstaltungen sowie für nicht öffentliche Veranstaltungen ohne Anmeldung `null` zurückgibt und `roomNames` aus nicht abgelehnten Raumbuchungen ergänzt —, rendert `EventPageContent` (Foto-Kopfbereich, Beschreibung als Markdown, Seitenleiste Wann/Wo, **Für diese Veranstaltung anmelden**, wenn `registrationEnabled` gesetzt ist, und einen Link **Zu meinem Kalender hinzufügen** auf `GET /content/events/public/:churchId/:id/ical`), verwendet das Foto als Open-Graph-Bild und gibt über `EventPageJsonLd` `Event`-JSON-LD für die nächste Auftretung aus. Eine unbekannte oder verborgene Veranstaltung liefert einen echten 404-Fehler.

## Seitenweite Widgets

Zwei Widgets werden auf jeder öffentlichen Seite außerhalb des Baums angezeigt: **AnnouncementBanner** (schließbare Leiste am oberen Seitenrand) und **Launcher** (schwebendes Aktionsmenü für Links wie Geben, Besuchen oder Anschauen). Beide Komponenten und ihre Hilfsfunktionen `parse*Config()` liefert apphelper. Die Konfiguration besteht aus zwei öffentlichen Einstellungszeilen — Schlüssel `announcementBanner` und `launcher` —, die von `SiteWidgetsEdit` in B1Admin (auf der Seite Erscheinungsbild) geschrieben und vom öffentlichen Layout von B1App über `GET /content/settings/public/:churchId` gelesen werden. Die API behandelt diese als undurchsichtige Schlüssel-Wert-Paare; die Schlüsselnamen sind eine Konvention zwischen den beiden Apps.

## Blog

Der Blog ist ein eigenständiger Inhaltstyp und keine Schicht über den Builder-Seiten. Eine Zeile in `posts` enthält den gesamten Beitrag: `title`, `slug`, `excerpt`, `content` (Markdown-Text), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`. Öffentliche Oberfläche (alle anonym, `PostController`):

| Route | Zweck |
|-------|---------|
| `GET /content/posts/public/:churchId` | Veröffentlichte Beiträge, filterbar nach `?category=&tag=`, paginiert |
| `GET /content/posts/public/:churchId/categories` | Eindeutige Kategorien über alle veröffentlichten Beiträge hinweg |
| `GET /content/posts/public/:churchId/slug/:slug` | Ein veröffentlichter Beitrag |
| `GET /content/posts/rss/:churchId?siteUrl=` | RSS-2.0-Feed, betitelt mit dem Namen der Kirche, mit Kategorie und Beschreibung (Auszug oder Inhalt) je Eintrag |

Ein Beitrag gilt als „veröffentlicht“, sobald `publishDate` gesetzt und erreicht ist; ein künftiges `publishDate` kennzeichnet einen geplanten Beitrag (öffentlich verborgen, in der Verwaltung mit dem Chip „Geplant“ angezeigt). Leseendpunkte reichern jeden Beitrag mit `authorName` an, das über `authorId` durch das Gateway des Mitgliedermoduls aufgelöst wird. Fehlt ein Auszug, greifen Listenkarten, Meta-Beschreibungen und RSS auf den Inhalt ohne Markdown zurück (ca. 160 Zeichen). B1App stellt `/{sdSlug}/blog` bereit — eine redaktionelle Übersicht (zentrierter Kopfbereich, der bei Filterung zum Namen der aktiven Kategorie bzw. des Schlagworts wird, Filterleiste mit Kategorie-Chips, Beitragszeilen mit Vorschaubild links, Autorenzeile und Auszügen), wobei der RSS-Feed als alternativer Link angeboten wird — und `/{sdSlug}/blog/[postSlug]`, eine eigene Route (nicht die Zone/Section-Pipeline) mit zentriertem Kopfbereich (Kategorie-Überschrift, Titel, Autorenzeile, Akzentlinie in der Primärfarbe), einem 16:9-Titelbild in Containerbreite, dem Markdown-Text in einer Lesespalte von ca. 720 px, Schlagwort-Chips im Fußbereich des Artikels, einem Streifen `"More in {category}"` mit verwandten Beiträgen und `BlogPosting`-JSON-LD einschließlich des Autors. Beide Seiten werden ausschließlich über Theme-Tokens gestaltet, sodass sie die Farbpalette jeder Kirche übernehmen. Blog-URLs sind in der Sitemap jeder Kirche enthalten. Die Erstellungsoberfläche von B1Admin (**Site → Blog**) bearbeitet Beiträge in einem Dialog: Markdown-Editor mit Umschaltung der Vorschau, Bildauswahl aus der Galerie mit 16:9-Zuschnitt, Auswahl der Person als Autorin bzw. Autor (standardmäßig der bearbeitende Benutzer), Autovervollständigung der Kategorien aus bereits vorhandenen Kategorien, Prüfung auf doppelte Slugs und einen Veröffentlichen-Schalter; veröffentlichte Zeilen verlinken auf den Live-Beitrag, und die Seite weist Administratoren darauf hin, einen Navigationslink `/blog` hinzuzufügen.

## Seiten nur für Mitglieder

`pages.visibility` verwendet dieselbe Aufzählung wie die Navigationslinks — `everyone` (Standard), `visitors`, `members`, `staff`, `team`, `groups` (mit `groupIds`) —, jedoch als **harte Zugriffssperre** und nicht als Navigationsfilter (`PageVisibilityHelper.canViewPage`). Der Ablauf:

1. Der anonyme Baum-Endpunkt prüft die Sichtbarkeit bei URL-basierten Abfragen. Anonyme Aufrufer einer gesperrten Seite erhalten `{ restricted: true, visibility }` statt Inhalt — der Baum gibt nie etwas preis.
2. Der Endpunkt berücksichtigt weiterhin ein JWT: `CustomAuthProvider` prüft den `Authorization`-Header bei *jeder* Anfrage, auch auf anonymen Routen, sodass die Abfrage derselben URL durch ein angemeldetes Mitglied normal aufgelöst wird.
3. B1App rendert `RestrictedPage` bei einer `restricted`-Antwort: Es stellt die Sitzung aus gespeicherten Zugangsdaten wieder her, lädt den Baum mit dem JWT erneut und rendert ihn — oder zeigt, falls keine Sitzung besteht, eine Anmeldesperre mit einer `returnUrl`.

:::info
Die Granularität der Sperre variiert je nach Stufe: `groups` prüft die `groupIds` des Tokens gegen die Liste der Seite und `staff` prüft `membershipStatus`, aber `members` und `team` lassen derzeit jeden angemeldeten Benutzer der Kirche durch. Behandeln Sie `groups` als die strikte Option.
:::

## SEO und Auffindbarkeit {#seo-and-discoverability}

All dies ist serverseitiges Rendern durch B1App auf Basis der ContentApi-Daten — die API speichert, die App gibt aus:

| Thema | Funktionsweise |
|---------|--------------|
| Meta-Beschreibungen | `pages.metaDescription` (≤300 Zeichen) fließt über `MetaHelper.getMetaData()` in die Next.js-`Metadata` (description + Open Graph) jeder vom Builder gerenderten Route. Die Seiteneinstellungen in B1Admin enthalten eine KI-Schaltfläche „Generieren“ (siehe unten) |
| Weiterleitungen | Kirchenspezifische `redirects`-Zeilen, verwaltet unter `/content/redirects` (`content.edit`, Obergrenze 200 Zeilen, normalisierte Pfade). Bei einem Aufruf, der sonst zu einem 404 führen würde, löst die Seitenroute von B1App den Pfad gegen `GET /content/redirects/public/:churchId` auf und sendet über `permanentRedirect` von Next eine HTTP-308-Weiterleitung; nicht zugeordnete Pfade fallen auf `notFound()` zurück |
| Gebrandete 404-Seite | `not-found.tsx` rendert `BrandedNotFound` mit Logo, Name und Theme der Kirche statt einer allgemeinen Fehlermeldung. Unbekannte Pfade `/register/[eventId]`, `/events/[eventId]`, `/stream/[pageSlug]` und `/volunteer/[planId]` liefern einen echten 404-Fehler, ebenso unbekannte Subdomains und fehlerhafte Seiten-Slugs (siehe [Website-Routing & Multi-Site](./websites)) |
| Strukturierte Daten | `BlogPosting`-JSON-LD für Blogbeiträge; `VideoObject` auf den Predigtseiten (`/{sdSlug}/sermons/[sermonId]`) und auf Seiten mit einem Element `sermons`; `Event` aus Kalender-/Veranstaltungselementen auf Builder-Seiten und auf jeder Seite `/{sdSlug}/events/[eventId]` (nächste Auftretung, mit dem Veranstaltungsfoto als `image`); schema.org-`Event` aus dem Element `serviceTimes` |
| Predigtseiten | Jede öffentliche Predigt erhält eine crawlbare Seite unter `/sermons/[sermonId]` mit vollständigen Metadaten — Predigten sind nicht mehr im clientseitigen Browser-Element eingeschlossen |
| Analytics | Die öffentliche Einstellung `ga4MeasurementId` (verwaltet neben den Weiterleitungen in B1Admin) bindet einen kirchenspezifischen GA4-gtag über `next/script` ein. Die B1-App (`/{sdSlug}/mobile`) sendet ihre Seitenaufrufe ebenfalls an diese ID, zusätzlich zum eigenen Tag von ChurchApps, sofern es eine gültige `G-`-ID ist (GTM-Container-IDs bleiben auf die Website beschränkt). Jeder `gtag('config')`-Aufruf trägt einen `display_mode` von `installed` oder `browser`, abhängig von `navigator.standalone` bzw. der Medienabfrage `(display-mode: standalone)` (`B1App/src/helpers/mobileAnalytics.ts`) |
| Sitemap & Feeds | Die Route `sitemap.xml` je Kirche enthält Builder-Seiten, Blog-URLs und die 50 neuesten Predigtseiten (mit `<lastmod>` aus dem Veröffentlichungsdatum jeder Predigt). Außerdem listet sie die eingebauten Seiten `/sermons`, `/groups` und `/volunteer`, sofern sie Inhalte haben (öffentliche Gruppen, Einsatzpläne), es sei denn, eine gespeicherte Weiterleitung ersetzt diesen Pfad. `/` wird ausgelassen, wenn die Kirche keine Startseite hat, da `/` dann auf das nicht erlaubte `/mobile` weiterleitet. Die Blogübersicht bewirbt den RSS-Feed |
| Barrierefreiheit | Der öffentliche Rahmen rendert in jedem Layout-Wrapper einen Sprunglink auf den Landmark `<main id="main-content">` |

## KI-Generierung (AskApi)

Die Erzeugung von Seiten und Websites läuft in **AskApi**, einem eigenständigen Dienst unter dem Controller `/website`. Er authentifiziert sich mit demselben `CustomAuthProvider`-JWT wie alles andere und ist **bezüglich der Inhalte zustandslos**: Jeder Endpunkt liefert JSON, und der Aufrufer (B1Admin) speichert das Ergebnis über die ContentApi (`POST /content/pages/importTree` legt eine Seite mit ihrem vollständigen verschachtelten Abschnitts- und Elementbaum in einem einzigen Aufruf an; sie fügt stets unter der Kirche des Aufrufers ein und ignoriert IDs im Body).

### Seitenerzeugung (`planPage` → `writePage`)

Die Seitenvorlage „KI“ im `AddPageModal` von B1Admin verwendet eine kostengünstige Pipeline (`AskApi/src/helpers/SiteGenHelper.ts`), die auf einer Regel beruht: **Kein Modell gibt jemals Builder-JSON aus**. Zwei Modelle teilen sich die Arbeit über das Vercel AI Gateway (einfaches HTTP, SSM-Schlüssel `/{env}/aiGatewayApiKey` oder `AI_GATEWAY_API_KEY`):

- **JEV** (`typesafe-ai/jev`) — ein typisiertes Entscheidungsmodell, das Auswahlen, Bewertungen und Wahrheitswerte mit Wahrscheinlichkeiten zurückgibt, aber keinen Text schreiben kann. Es wählt jeden Abschnitt nacheinander aus einer festen Vorlagenbibliothek, bewertet Layouts, prüft Texte auf Fakten und wählt Stockfotos und Symbole aus. Die Eingabe kostet etwa 0,04 $ pro Million Token, die Ausgabe ist kostenlos, sodass ca. 90 Aufrufe pro Seite einen Bruchteil eines Cents kosten.
- **Ein kleines Chat-Modell (standardmäßig GPT-4.1 mini)** — füllt die benannten, in der Länge begrenzten Textfelder der gewählten Vorlagen. Der Texter ist eine Konstante, die mit der Umgebungsvariable `SITEGEN_COPY_MODEL` überschrieben werden kann (jede Chat-Modell-ID des Gateways, z. B. `anthropic/claude-haiku-4.5`). In einem blinden Vergleich bei drei Kirchen las sich Claude Haiku 4.5 etwas wärmer, aber GPT-4.1 mini lag nahe dran, ist etwa viermal günstiger und schneller, daher ist es der Standard. Eine vollständige Seite mit allen drei Layouts kostet etwa 1,3 Cent, davon rund 80 % für den Texter.

| Phase | Endpunkt | Ablauf |
|-------|----------|--------------|
| 1 | `POST /website/planPage` | Klassifiziert den Seitentyp (Startseite, Besuch, Über uns …) und zieht dann 10 Kandidaten-Layouts aus den Wahrscheinlichkeiten von JEV je Runde (Hero + Abschnittsanzahl → jeder Abschnitt → Abschluss), entfernt Duplikate, lässt JEV jeden auf Passung, Ablauf und Lücken bewerten und gibt die besten 3 zurück, zusammen mit einem Schreibstil und einem `suggestedStyle` (Palette + Schriften). Kandidaten, die bis dahin dieselben Abschnitte teilen, stellen JEV eine identische Frage, daher werden Runden nach Präfix zwischengespeichert. Eine beste Bewertung unter 6 wird als `lowLayoutScore` protokolliert — dieses Protokoll ist der Rückstand an Vorlagen, die es sich lohnt hinzuzufügen. ca. 2 s |
| 2 | `POST /website/writePage` (ein Aufruf pro Kandidat) | Der Texter füllt die Textfelder je zwei Abschnitte pro Aufruf parallel aus und liefert fünf Hero-Überschriften, zwischen denen JEV wählt; JEV prüft jeden Abschnitt auf Fakten; Abschnitte, die fehlschlagen, eine Floskel verwenden oder einen früheren Abschnitt wiedergeben (gemeinsame Vier-Wort-Folgen, im Code geprüft), werden parallel mit dem konkreten Grund neu geschrieben; eine Code-Bereinigung entfernt Sätze mit typischen Kirchenfloskeln (sofern die eigene Beschreibung der Kirche diese nicht verwendet); JEV wählt Fotomotive, Symbole und den Form-Trenner des Hero und bewertet das Ergebnis. Liefert einen speicherfertigen Abschnittsbaum und eine Bewertung. ca. 6–9 s |
| 3 | `POST /content/pages/importTree` | B1Admin schreibt nur das best platzierte Layout (das zweitplatzierte dient als Ersatz, falls dieses Schreiben fehlschlägt), speichert es und öffnet die Vorschau (ca. 10 s nach dem Speichern) |

Jede Phase ist eine eigene Anfrage, damit jeder Aufruf innerhalb des Limits von 29 Sekunden des API Gateway bleibt. Vorlagen in `SiteGenHelper.buildTree` sind feste Abschnitts- und Elementbäume aus dem Katalog (`text`, `row`/`column`, `card`, `iconFeature`, `faq`, `table`, `testimonial`, `textWithPhoto`, `box`, `map`, `sermons`) und verweisen auf Theme-Tokens (`var(--accent)`, `var(--lightAccent)` …), sodass erzeugte Seiten die bestehenden Darstellungseinstellungen der Kirche übernehmen. Eine Abschnittsvorlage hinzuzufügen bedeutet, ihre Slot-Liste zu `SECTIONS` und ihren Baum zu `buildTree` hinzuzufügen; der Unittest durchläuft jede Vorlage und prüft den Baum.

**Eingaben.** Texte dürfen nur Fakten aus zwei Quellen nennen: was der Benutzer eingegeben hat und `churchContext.facts` — Datensätze, die B1Admin vor der Planung sammelt (öffentliche Gottesdienstzeiten und Namen öffentlicher Gruppen sowie der Name und die Adresse der Kirche). Dieselben Markierungen steuern datengestützte Vorlagen: `times` rendert das Live-Element `serviceTimes`, wenn die Kirche Gottesdienstzeiten in B1 pflegt (andernfalls eine eingetippte Tabelle); `groups` und `countdown` werden nur angeboten, wenn dahinter Daten stehen. JEV-Aufrufe werden abgesichert — ein Duplikat wird nach 1,5 s ausgelöst, und die erste Antwort gewinnt —, da das Gateway gelegentlich stockt und die Aufrufe nahezu kostenlos sind.

**Beim Thema bleiben.** Die Eingabe des Benutzers ist das *Thema der Seite*, nicht Hintergrund über die Kirche. `planPage` klassifiziert die Anfrage (`home`, `visit`, `about`, `ministries`, `give`, `contact`, `event`, `topic`). Bei Seiten vom Typ `event` und `topic` werden die allgemeinen Kirchenvorlagen (Notiz des Pastors, Predigten, Dienste, Gruppen, gesellschaftliches Engagement, wöchentliche Zeiten und Countdown, Video-Hero) gar nicht erst angeboten, dafür aber `details` (Wann / Wo / Was mitbringen) und ein datumsbezogener `eventCountdown`. Beide Bewerter prüfen die Themenrelevanz. B1Admin übergibt `pageType` aus dem Plan an jeden `writePage`-Aufruf.

**Vollständige Seiten aus knappen Anfragen.** Seiten haben drei bis sechs mittlere Abschnitte, großzügige Feldlängen, eine Einleitungszeile bei Kartenabschnitten und eine FAQ mit fünf Fragen; der Reparaturdurchlauf erweitert jeden Abschnitt, der zu dünn zurückkommt. Die Erzeugung erfolgt mit einem Klick: Es gibt keine Rückfragen. Wenn die Anfrage ein übliches Detail auslässt, das eine vollständige Seite braucht (eine Startzeit, einen Raum, was mitzubringen ist, wie man sich anmeldet), ergänzt der Texter eine plausible, zurückhaltende Angabe, die die Kirche anpassen kann. Da Abschnitte parallel geschrieben werden, werden diese Lücken **einmal** in `planPage` entschieden (`assumedDetails`, ein kleiner Texteraufruf, der parallel zur Layout-Auswahl läuft) und über `churchContext.assumedDetails` in jeden `writePage`-Aufruf zurückgegeben, damit ein Abschnitt nicht 5:00 und ein anderer 5:30 nennt. JEV korrigiert jeden Abschnitt, der der Anfrage, den Unterlagen der Kirche oder diesen festgelegten Angaben widerspricht. Die festgelegten Angaben werden in der Oberfläche nicht angezeigt; die Kirche prüft und bearbeitet die Seite wie jede andere. Einige Dinge werden nie erfunden: Namen von Personen, Telefonnummern, E-Mail- und Webadressen, Preise, Statistiken, die Geschichte der Kirche, Zitate, die Personen zugeschrieben werden, und ein Wochentag für ein Datum, zu dem die Anfrage keinen angibt.

**Bilder.** Vorlagen benennen ihre Fotos oder Symbole nie. Sie lassen Felder offen, und ein allgemeiner Durchlauf (`visualSlots` → `pickVisuals` → `applyVisuals` in `SiteGenHelper`) geht den fertigen Baum durch und füllt jedes davon: einen Abschnittshintergrund oder Galerieeintrag mit `auto:photo`, ein `auto:icon`, den `auto:divider` des Hero und — ganz ohne Markierung — jedes Element `textWithPhoto`, `card` oder `image`, dessen `photo` leer ist. JEV wählt jedes anhand des danebenstehenden Textes (das Foto einer Karte anhand von Titel und Text dieser Karte; einen Hintergrund anhand des Textes des Abschnitts), ohne dass ein Motiv auf einer Seite wiederholt wird. Eine neue Vorlage erhält daher kostenlos Fotos. Fotos sind Suchbegriffe für Pexels, die als Platzhalter `pexels:<term>` ausgegeben werden; B1Admin löst sie über `POST /content/stock/search` auf. Ein Client, der `resolvesPhotos` nicht sendet, erhält stattdessen ein eingebautes Hero-Bild, einfarbige Bänder und Karten ohne Foto. Porträtmotive gibt es bewusst nicht, und die Pastor-Vorlage enthält kein Foto: Ein Stockfoto eines Fremden darf nie an die Stelle einer echten Person treten. Für eine Kirche ohne Seiten wendet B1Admin `suggestedStyle` auf die globalen Stile an; bestehende Websites behalten ihr Erscheinungsbild.

### Weitere Endpunkte

:::info
Die Schaltfläche `SectionToolbar` zum Umschreiben und die Schaltfläche „Website generieren“ in der Seitenliste von B1Admin sind auf Client-Seite weiterhin auskommentiert. Die folgenden AskApi-Endpunkte antworten noch; nur diese Oberfläche ist ausgeblendet.
:::

| Endpunkt | Zweck |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | Der ursprüngliche zweistufige Seitenablauf (Gliederung, dann ein LLM-Aufruf je Abschnitt, der Element-JSON ausgibt). Wegen der Kosten in B1Admin durch `planPage`/`writePage` ersetzt; für API-Nutzer beibehalten |
| `POST /website/generateSite` | Erzeugung der ganzen Website. **Absichtlich zweiphasig**: Ein Aufruf mit `planOnly: true` liefert nur den mehrseitigen Plan (ein schneller Modellaufruf), danach fordert der Client den vollständigen Inhalt an — so bleibt jede Anfrage innerhalb des Zeitlimits von Lambda/API Gateway |
| `POST /website/rewriteSection` | Umschreiben unter Erhalt der Struktur: Das Modell darf nur textbezogene Antworten ändern. Eine rekursive Strukturkennung (IDs + Typen + Reihenfolge) wird vorher und nachher verglichen; bei jeder Abweichung wird der ursprüngliche Abschnitt mit `fallback: true` zurückgegeben statt einer beschädigten Struktur |
| `POST /website/generateAltText` | Bildauswertung über bis zu 20 Bild-URLs; liefert knappen Alternativtext (≤125 Zeichen, Präfixe wie „Foto von“ entfernt) |
| `POST /website/generateMetaDescription` | Eine SEO-Meta-Beschreibung (≤155 Zeichen) aus dem Textinhalt der Seite — mit der Schaltfläche „Generieren“ in den Seiteneinstellungen von B1Admin verbunden |

Die Prompts für diese Endpunkte sind Markdown-Dateien unter `AskApi/config/instructions/`, einschließlich des Element-Katalogs, aus dem das Modell erzeugt. Zwei Gestaltungsentscheidungen halten den Katalog verlässlich: Der Client übergibt bei jeder Anfrage `availableElementTypes` (der Prompt darf nur Typen aus dieser Liste verwenden — der Server hartkodiert nie die vollständige Menge), und das MCP-Tool `describe_page_builder` der API enthält dieselbe Anleitung für KI-Agenten, die über [MCP](../api/mcp) arbeiten. Die Modelle sind Anthropic Claude über OpenRouter — 3.5 Haiku für Abschnittsinhalte (Latenz), 3.5 Sonnet für Gliederungen, Website-Pläne und Bildauswertung — mit einem OpenAI-Ersatz, wenn kein OpenRouter-Schlüssel konfiguriert ist.

## Dialogformulare

Formulare (Mitgliedermodul) erhielten einen Dialogmodus für Seiten im Stil von Kontaktkarten. Vier Spalten in `forms` steuern ihn: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **Rendering** — `FormSubmissionEdit` von apphelper wechselt zur Komponente `ConversationalForm` (eine Frage nach der anderen), wenn `displayMode` auf `conversational` steht; die Formularseite von B1App gibt den Modus weiter. Die übermittelten Daten sind in beiden Fällen dieselben.
- **Automatisch Person anlegen** — bei einer Übermittlung mit gesetztem `autoCreatePerson` prüft `ConversationalFormHelper.findOrCreatePerson` auf Doppelte anhand der E-Mail-Adresse (ohne Beachtung der Groß-/Kleinschreibung) und legt andernfalls einen Haushalt und eine Person mit `membershipStatus: "Guest"` an und verknüpft die Übermittlung dann mit dieser Person.
- **Nachfass-E-Mail** — sind Betreff und Text gesetzt, erhält die absendende Person eine vorlagenbasierte E-Mail (mit den Platzhaltern `{firstName}` / `{churchName}`) über den bestehenden transaktionalen Weg (`TransactionalEmailHelper`), niemals über den Benachrichtigungs-Digest. Beide Nebenwirkungen sind nicht kritisch: Ein Fehler führt nie zum Verlust der Übermittlung.

Die vier Felder werden derzeit über die API gesetzt; der Formulareditor von B1Admin zeigt sie noch nicht an.

## Cache der öffentlichen Website

Der öffentliche Renderpfad von B1App speichert kirchenmarkierte Abrufe im Cache (`next: { revalidate: 300, tags: [sdSlug] }` in der Produktion; `0` in der Entwicklung), sodass eine Live-Seite bis zu fünf Minuten nach einem Schreibzugriff auf die ContentApi veraltet sein kann. `POST /api/revalidate/{sdSlug}` auf B1App ruft `revalidateTag(sdSlug)` auf und ist der einzige Weg, diesen Cache vorzeitig zu leeren.

Zwei Stellen schreiben in diesen Cache:

1. **B1Admin** — `clearSiteCache()` in `B1Admin/src/site/siteCache.ts` sendet nach Speicherungen im Editor einen POST. Es bevorzugt die Subdomain der aktiven Website (eine sekundäre Website muss *dieses* Tag leeren, nicht das Standard-Tag der Kirche).
2. **Api** — Inhaltsänderungen, die nie über B1Admin laufen (API-Schlüssel, MCP, KI), lösen `SiteCacheHelper.bump(churchId)` aus den Content-Controllern aus. Der Helfer ermittelt die Subdomain der Kirche über `SubDomainHelper` und sendet einen POST an `{b1AppRoot}/api/revalidate/{sd}`. Fehler werden verschluckt, damit ein nicht erreichbares B1App kein Speichern zum Scheitern bringen kann.

Controller, die den Cache leeren: Seiten (speichern, löschen, duplizieren, veröffentlichen, verwerfen, Veröffentlichung zurückziehen, KI-Zwischenstand), Abschnitte, Elemente, Blöcke, Links, globale Stile, Beiträge und Weiterleitungen. Das Entwicklungs-`b1AppRoot` ist `http://{subdomain}.localtest.me:3301`; Demo und Produktion verwenden `https://{subdomain}.b1.church`.

## Verwandte Seiten

- [Website-Routing & Multi-Site](./websites) — wie eine Anfrage einer Kirche bzw. Website zugeordnet wird und wie eigene Domains geroutet werden
- [Content-Endpunkte](../api/endpoints/content) — vollständige REST-Schnittstelle für Seiten, Abschnitte, Elemente, Blöcke, Beiträge, Weiterleitungen und Einstellungen
- [AppHelper](../shared-libraries/app-helper) — das npm-Paket, das die Renderer, die Registry, die Trenner und die Widgets enthält
- [MCP-Server](../api/mcp) — einschließlich des Anleitungstools `describe_page_builder`
- [Seiteneditor (für Endbenutzer)](/docs/b1-admin/website/page-editor) — die Dokumentation des Editors für Mitarbeitende
