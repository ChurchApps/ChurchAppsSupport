---
title: "Architektur des Website-Builders"
---

# Architektur des Website-Builders

<div class="article-intro">

Jede Gemeindewebsite, die von B1App ausgeliefert wird, entsteht aus einem Inhaltsbaum — Seiten, Abschnitte, Elemente —, der in der ContentApi gespeichert und in B1Admin visuell bearbeitet wird. Eine gemeinsame Komponentenbibliothek rendert sowohl die Vorschau im Editor als auch die Live-Website, ein einheitlicher Katalog von Elementtypen legt fest, was auf einer Seite erscheinen kann, und ein separater KI-Dienst kann diesen Baum erzeugen oder umschreiben. Diese Seite beschreibt den gesamten Stack: den Vertrag der Elemente in `@churchapps/helpers`, die Render-Pipeline, Elemente mit Gemeindedaten, seitenweite Widgets, die Blog-Schicht, zugriffsgeschützte Seiten, SEO, die KI-Erzeugung und Formulare im Dialogstil.

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

Drei Grundregeln gelten im gesamten Stack:

1. **Ein Baum, zwei Renderer.** Eine Seite ist ein Baum aus `pages → sections → elements`, bei dem jeder Knoten seine Einstellungen als JSON-Objekt `answers` trägt. Dieselben apphelper-Komponenten rendern den Drag-and-Drop-Editor in B1Admin und die serverseitig gerenderte öffentliche Website in B1App — ein eigenes „Veröffentlichungsformat“ gibt es nicht.
2. **Der Vertrag lebt in `@churchapps/helpers`.** `ElementTypes.ts` ist der einzige Katalog der Elementtypen; Renderer werden über eine Registry in apphelper aufgelöst; die Formulare des Editors liegen in B1Admin. Ein neuer Elementtyp erfordert Änderungen an allen drei Stellen, in dieser Reihenfolge.
3. **Die öffentliche Website liest anonyme Endpunkte.** Alles, was B1App benötigt — der Seitenbaum, Einstellungen, Blogbeiträge, Weiterleitungen und die Endpunkte mit Gemeindedaten in anderen Modulen —, ist öffentlich. Die Anmeldung ist optional: Ein JWT am anonymen Baum-Endpunkt schaltet nur Seiten für Mitglieder frei, sonst ändert sich nichts.

## Der Inhaltsbaum

Das Content-Modul (`Api/src/modules/content`) verwaltet die Daten des Builders:

| Tabelle | Funktion |
|-------|------|
| `pages` | Eine Seite pro URL: `url`, `title`, `layout`, dazu `visibility`/`groupIds` (Zugriffssteuerung) und `metaDescription` (SEO) |
| `sections` | Horizontale Bänder auf einer Seite (oder in einem Block): Hintergrund, Textfarbe und ein `answersJSON`, das die Gestaltung sowie die Konfigurationen der Formteiler `dividerTop`/`dividerBottom` enthält |
| `elements` | Inhaltsstücke innerhalb eines Abschnitts: `elementType` + `answersJSON`, bei Layouttypen (Zeile/Spalte, Karussell) verschachtelbar |
| `blocks` | Wiederverwendbare Gruppen aus Abschnitten/Elementen (Fußzeilenblöcke, Elementblöcke), die über Seiten hinweg geteilt werden |
| `posts` | Eigenständige Blogbeiträge (siehe [Blog](#blog)) |
| `redirects` | Paare `fromPath → toPath` je Gemeinde, begrenzt auf 200 (siehe [SEO](#seo-and-discoverability)) |
| `settings` | Schlüssel-Wert-Einstellungen der Gemeinde; Zeilen mit dem Kennzeichen `public` werden anonym ausgeliefert und enthalten die Konfiguration von Widgets und Analyse |

Der gesamte Baum einer URL kommt aus einem einzigen anonymen Aufruf — `GET /content/pages/:churchId/tree?url=/about` —, aus dem B1App serverseitig rendert. Anfragen des Editors laden stattdessen nach ID und behalten die internen IDs bei.

## Der Vertrag der Elemente

### Der Katalog (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` definiert jeden Elementtyp als `ElementTypeDefinition`: `elementType`, `label`, `category`, `schemaVersion`, `defaults` und ein `answersSchema` im Stil eines JSON-Schemas für seine Antworten. `validateElementAnswers()` ist bewusst nachsichtig — unbekannte Typen und zusätzliche Schlüssel werden akzeptiert, damit altes Material bei einer Aktualisierung des Katalogs nicht bricht. **Heute sind 35 Typen ausgeliefert:**

| Kategorie | Elementtypen |
|----------|---------------|
| layout (6) | row, column, box, carousel, whiteSpace, block |
| content (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| media (4) | image, gallery, video, map |
| church (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| advanced (2) | rawHTML, iframe |

Das Element `sermons` ist unter den Gemeindetypen das am stärksten konfigurierbare: Eine Antwort `layout` wählt `browse` (der bisherige vollständige Browser), `grid`, `list` oder `featuredLatest`; `playlistId`, `itemCount`, `showTitles` und `showDates` verfeinern die Layouts außerhalb von `browse`.

Das Element `rawHTML` hat zwei Antworten: `rawHTML` (Markup) und `javascript`. Skripte, die über `innerHTML` eingefügt werden, werden nie ausgeführt; daher erzeugt `RawHTMLElement` jeden `<script>`-Knoten im Markup als neues Element. Diese nicht durch den Parser eingefügten Knoten gelten unter `strict-dynamic` der CSP als vertrauenswürdig. Eine Antwort `javascript`, die mit `<` beginnt (ein Snippet eines Anbieters mit seinen `<script>`-Tags), wird als Markup geparst und gleich behandelt. Andernfalls läuft sie als einfaches Inline-Skript. B1Admin markiert eine nackte URL im JavaScript-Feld, weil eine einzelne URL als Skript ohne Wirkung läuft. Das Element `map` rendert nichts und lädt kein Google-Maps-Skript, wenn kein Maps-API-Schlüssel konfiguriert ist.

### Renderer (`@churchapps/apphelper`)

Die Renderer liegen in `Packages/apphelper/src/website/components/elementTypes/`, je Typ eine Komponente, und werden über `ElementRegistry.ts` aufgelöst — eine zweistufige Zuordnung, bei der `Element.tsx` den Standardrenderer für alle 35 Typen registriert (`registerDefaultElementRenderer`) und eine Host-App jeden von ihnen zur Laufzeit überschreiben kann (`registerElementRenderer`), ohne das Paket zu forken.

### Formulare im Editor (B1Admin)

Die Einstellungsformulare des Editors für jeden Typ liegen in `B1Admin/src/site/admin/elements/` — `ElementEdit.tsx` verteilt auf eine eigene Komponente (`GalleryEdit`, `TestimonialEdit`, `StatsEdit` …) oder einen eingebetteten Feldaufbau je Typ. Das KI-seitige Gegenstück zu diesem Katalog ist das MCP-Werkzeug `describe_page_builder` der API (siehe [MCP-Server](../api/mcp)).

Die Vorschau des Editors bindet dasselbe `Theme` ein wie die Live-Website; es setzt die CSS-Variablen `--headingFont` / `--bodyFont` aus den globalen Stilen der Gemeinde. B1App wendet diese Variablen über `pages.css` an, das B1Admin nicht importieren kann. Daher injiziert `ContentEditor.tsx` `EDITOR_PAGE_FONT_CSS` (`src/site/admin/editorCss.ts`), um sie auf den Fließtext in `.page` und auf `h1`–`h6` anzuwenden. Ohne dies zeigte die Vorschau Überschriften in der Schrift der Administration.

### Formteiler für Abschnitte

Abschnitte können an jedem Rand dekorative Formteiler tragen. Die Konfiguration liegt im `answersJSON` des Abschnitts als Objekte `dividerTop` / `dividerBottom` — `{ shape, color, height, flip }`, wobei `shape` einer der Werte `wave, waves, slant, curve, triangle, peaks` ist. apphelper liefert die Komponente `SectionDivider` und den Helfer `parseDividerConfig()`; die Abschnitts-Renderer beider Apps (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) lesen die Antworten und binden den Teiler ein, und `SectionEdit.tsx` in B1Admin stellt die Auswahl bereit. Die Pakete liefern nur den Baustein — die Verdrahtung auf Abschnittsebene ist Aufgabe der nutzenden Apps.

## Elemente mit Gemeindedaten

Drei Elementtypen zeigen Live-Daten der Gemeinde statt redaktionell erstellter Inhalte. Die Modulisolation gilt weiterhin — jedes ruft den öffentlichen Endpunkt des zuständigen Moduls direkt aus dem Browser auf:

| Element | Endpunkt | Hinweise |
|---------|----------|-------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Liefert `{ fundId, totalAmount, donationCount }`, optional mit dem Zeitfenster `?startDate=&endDate=`; das Element vergleicht den Wert mit seiner Antwort `goalAmount` |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Nur mit Zustimmung**: Die Gruppe muss `publicRoster` gesetzt haben (Standard: aus). Die Projektion ist bewusst minimal — `personId`, `displayName`, `leader`, Foto — ohne Kontakt- oder Demografiefelder |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Liefert den Baum Standort → Gottesdienst → Zeit; der Renderer von apphelper erzeugt daraus nach bestem Bemühen schema.org-`Event`-JSON-LD (die API liefert reine Daten) |

:::warning
`publicRoster` ist die Datenschutzschranke für `staffGrid`. Erweitern Sie die öffentliche Projektion der Gruppenmitglieder nie und umgehen Sie das Flag nicht — der Teilnehmerendpunkt ist bewusst anonym, und die minimale Feldliste ist die Sicherheitseigenschaft.
:::

### Kalenderelement und Veranstaltungsseiten

Die Antworten des Elements `calendar` sind `calendarType` (`group` | `curated`), `calendarId`, `display` (`month`, der Standard, oder `upcoming`) und `tag`. B1App überschreibt den Renderer von apphelper in `src/components/Element.tsx` mit `registerElementRenderer("calendar", …)`:

- **`display: "upcoming"`** rendert das Element `UpcomingEventsElement` von B1App: Es lädt `GET /content/events/public/group/:churchId/:groupId` oder `GET /content/curatedEvents/public/calendar/:churchId/:curatedCalendarId`, löst Wiederholungen mit `buildOccurrences()` auf (`src/helpers/EventOccurrences.ts`, ein Vorkommen je Veranstaltung innerhalb eines Jahres) und zeigt die ersten 12 als Fotokacheln (`events.photoUrl`, sonst der Titel auf der dunklen Farbe des Designs), die auf `/events/{id}` verlinken, mit einem Menü „Abonnieren“ für den ICS-Feed des Kalenders.
- **`display: "month"`** rendert das Element `CalendarElement` aus apphelper mit einem Rückruf `eventUrl`. `GroupCalendar` / `CuratedCalendar` → `EventCalendar` / `CuratedEventCalendar` navigieren beim Klick zu dieser URL, statt den Detaildialog zu öffnen (B1Admin übergibt kein `eventUrl`, daher behält der Administrationskalender seinen Dialog).
- **`tag`** filtert beide Darstellungen mit `EventHelper.hasTag()` (`@churchapps/helpers`): ein Abgleich ohne Berücksichtigung der Groß-/Kleinschreibung gegen die durch Kommas getrennten `events.tags`; leer zeigt alles. Die Verknüpfung des kuratierten Kalenders wählt `e.tags` aus, damit kuratierte Veranstaltungen sie erhalten.

Kuratierte Veranstaltungen verlinken über `realEventId` (`eventPageId()`), daher nennt die URL immer die zugrunde liegende Veranstaltung. `/{sdSlug}/events/[eventId]` ist eine eigene Route (nicht die Pipeline des Builders): Sie lädt `GET /content/events/public/:churchId/:id` — das für ausstehende/abgelehnte Veranstaltungen und für private Veranstaltungen ohne Anmeldung `null` liefert und `roomNames` aus nicht abgelehnten Raumbuchungen ergänzt —, rendert `EventPageContent` (Fotoheader, Beschreibung als Markdown, Seitenleiste mit Wann/Wo sowie **Register for this Event**, wenn `registrationEnabled` gesetzt ist, und einen Link **Add to my calendar** auf `GET /content/events/public/:churchId/:id/ical`), verwendet das Foto als Open-Graph-Bild und sendet über `EventPageJsonLd` `Event`-JSON-LD für das nächste Vorkommen. Eine unbekannte oder verborgene Veranstaltung liefert eine echte 404.

## Seitenweite Widgets

Zwei Widgets erscheinen auf jeder öffentlichen Seite außerhalb des Baums: **AnnouncementBanner** (eine schließbare Leiste am oberen Seitenrand) und **Launcher** (eine schwebende Aktionsschaltfläche für Links wie Spenden, Besuch oder Anschauen). Beide Komponenten und ihre Helfer `parse*Config()` liegen in apphelper. Die Konfiguration sind zwei öffentliche Einstellungszeilen mit den Schlüsseln `announcementBanner` und `launcher`; sie werden von `SiteWidgetsEdit` in B1Admin (auf der Seite Appearance) geschrieben und von der öffentlichen Ansicht von B1App über `GET /content/settings/public/:churchId` gelesen. Die API behandelt sie als undurchsichtige Schlüssel-Wert-Paare; die Schlüsselnamen sind eine Vereinbarung zwischen den beiden Apps.

## Blog {#blog}

Der Blog ist ein eigenständiger Inhaltstyp, keine Schicht über den Seiten des Builders. Eine Zeile `posts` enthält den gesamten Beitrag: `title`, `slug`, `excerpt`, `content` (Markdown-Text), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`. Die öffentliche Schnittstelle (alles anonym, `PostController`):

| Route | Zweck |
|-------|-------|
| `GET /content/posts/public/:churchId` | Veröffentlichte Beiträge, filterbar mit `?category=&tag=`, seitenweise |
| `GET /content/posts/public/:churchId/categories` | Verschiedene Kategorien der veröffentlichten Beiträge |
| `GET /content/posts/public/:churchId/slug/:slug` | Ein veröffentlichter Beitrag |
| `GET /content/posts/rss/:churchId?siteUrl=` | RSS-2.0-Feed mit dem Namen der Gemeinde als Titel; je Eintrag Kategorie und Beschreibung (Auszug oder Inhalt) |

Ein Beitrag gilt als „veröffentlicht“, sobald `publishDate` gesetzt und erreicht ist; ein künftiges `publishDate` kennzeichnet einen geplanten Beitrag (öffentlich verborgen, in der Administration mit dem Chip „Scheduled“ angezeigt). Lesende Endpunkte ergänzen jeden Beitrag um `authorName`, das über `authorId` durch das Gateway des Membership-Moduls aufgelöst wird. Fehlt ein Auszug, dient der Inhalt ohne Markdown-Formatierung (~160 Zeichen) in Listenkarten, Metabeschreibungen und RSS als Ersatz. B1App bietet `/{sdSlug}/blog` — eine redaktionelle Liste (zentrierter Kopf, der bei aktivem Filter den Namen der Kategorie bzw. des Schlagworts zeigt, eine Reihe von Kategorie-Chips als Filter, Beitragszeilen mit Vorschaubild links, Autorzeile und Auszug), wobei der RSS-Feed als alternativer Link angekündigt wird — und `/{sdSlug}/blog/[postSlug]`, eine eigene Route (nicht die Pipeline aus Zone und Abschnitt) mit zentriertem Kopf (Kategorie als Kicker, Titel, Autorzeile, Akzentlinie in der Primärfarbe), einem Bild im Format 16:9 in der Breite des Containers, dem Markdown-Text in einer Lesespalte von etwa 720 Pixeln, Schlagwort-Chips im Fuß des Artikels, einer Leiste `"More in {category}"` mit verwandten Beiträgen und `BlogPosting`-JSON-LD einschließlich des Autors. Beide Seiten gestalten sich vollständig über Designtokens, sodass sie die Farbpalette jeder Gemeinde übernehmen. Blog-URLs sind in der Sitemap der Gemeinde enthalten. Die Erstellung in B1Admin (**Site → Blog**) bearbeitet Beiträge in einem Dialog: Markdown-Editor mit Umschalter für die Vorschau, Bildauswahl aus der Galerie mit Zuschnitt auf 16:9, Auswahl der Person als Autor (Standard ist der bearbeitende Benutzer), Autovervollständigung der Kategorien aus bestehenden Kategorien, Prüfung auf doppelte Slugs und ein Schalter zur Veröffentlichung. Veröffentlichte Zeilen verlinken auf den Live-Beitrag, und die Seite erinnert Administratoren daran, einen Navigationslink `/blog` anzulegen. Kommentare überlässt man Drittanbietern: Eine gemeindeweite öffentliche Einstellung `blogFooterHtml` (bearbeitet unter **Below Every Post** auf der Seite Blog, nur sichtbar mit Settings→Edit) wird unter jedem Beitrag durch `BlogFooterEmbed` in B1App angezeigt. Das Element erzeugt die `<script>`-Tags neu, sodass sie unter `'strict-dynamic'` ausgeführt werden, und führt sie in der Reihenfolge aus (eine externe `src` wird vollständig geladen, bevor das nächste Inline-Skript läuft), da Snippets von Anbietern zuerst eine Bibliothek laden und sie dann aufrufen.

## Seiten nur für Mitglieder

`pages.visibility` verwendet dieselbe Aufzählung wie die Navigationslinks — `everyone` (Standard), `visitors`, `members`, `staff`, `team`, `groups` (mit `groupIds`) —, jedoch als **harte Zugriffssperre** und nicht als Filter der Navigation (`PageVisibilityHelper.canViewPage`). Der Ablauf:

1. Der anonyme Endpunkt des Baums prüft die Sichtbarkeit bei Abrufen über die URL. Anonyme Aufrufer einer geschützten Seite erhalten `{ restricted: true, visibility }` statt des Inhalts — der Baum gibt nie etwas preis.
2. Der Endpunkt berücksichtigt weiterhin ein JWT: `CustomAuthProvider` prüft den Header `Authorization` bei *jeder* Anfrage, auch auf anonymen Routen. Daher wird der Abruf derselben URL durch ein angemeldetes Mitglied normal aufgelöst.
3. B1App rendert bei der Antwort `restricted` die Komponente `RestrictedPage`: Sie stellt die Sitzung aus den gespeicherten Zugangsdaten wieder her, ruft den Baum mit dem JWT erneut ab und rendert ihn — oder zeigt eine Anmeldesperre mit einer `returnUrl`, wenn keine Sitzung besteht.

:::info
Die Feinheit der Sperre unterscheidet sich je Stufe: `groups` prüft die `groupIds` des Tokens gegen die Liste der Seite und `staff` prüft `membershipStatus`; `members` und `team` lassen derzeit jeden angemeldeten Benutzer der Gemeinde durch. Behandeln Sie `groups` als die strenge Option.
:::

## SEO und Auffindbarkeit {#seo-and-discoverability}

Dies alles wird von B1App auf Grundlage der Daten der ContentApi gerendert — die API speichert, die App erzeugt die Ausgabe:

| Belang | So funktioniert es |
|---------|--------------|
| Metabeschreibungen | `pages.metaDescription` (≤300 Zeichen) fließt über `MetaHelper.getMetaData()` in die Next.js-`Metadata` (description + Open Graph) auf jeder vom Builder gerenderten Route. Die Seiteneinstellungen in B1Admin enthalten eine KI-Schaltfläche „Generate“ (siehe unten) |
| Weiterleitungen | Gemeindeweite Zeilen `redirects`, verwaltet unter `/content/redirects` (`content.edit`, Obergrenze von 200 Zeilen, normalisierte Pfade). Bei einer Anfrage, die sonst 404 ergäbe, löst die Seitenroute von B1App den Pfad über `GET /content/redirects/public/:churchId` auf und sendet mit `permanentRedirect` von Next eine HTTP-308-Weiterleitung; nicht zugeordnete Pfade fallen auf `notFound()` zurück |
| Gebrandete 404-Seite | `not-found.tsx` rendert `BrandedNotFound` mit Logo, Name und Design der Gemeinde statt eines allgemeinen Fehlers. Unbekannte Pfade `/register/[eventId]`, `/events/[eventId]`, `/stream/[pageSlug]` und `/volunteer/[planId]` liefern eine echte 404, ebenso unbekannte Subdomains und fehlerhafte Seiten-Slugs (siehe [Website-Routing und Multi-Site](./websites)) |
| Strukturierte Daten | `BlogPosting`-JSON-LD für Blogbeiträge; `VideoObject` auf den Seiten einzelner Predigten (`/{sdSlug}/sermons/[sermonId]`) und auf Seiten mit einem Element `sermons`; `Event` aus den Elementen Kalender/Veranstaltung auf Seiten des Builders und auf jeder Seite `/{sdSlug}/events/[eventId]` (nächstes Vorkommen, mit dem Foto der Veranstaltung als `image`); schema.org-`Event` aus dem Element `serviceTimes` |
| Predigtseiten | Jede öffentliche Predigt erhält eine durchsuchbare Seite unter `/sermons/[sermonId]` mit vollständigen Metadaten — Predigten sind nicht mehr im clientseitigen Browser-Element eingeschlossen |
| Analyse | Die öffentliche Einstellung `ga4MeasurementId` (verwaltet neben den Weiterleitungen in B1Admin) bindet über `next/script` ein gtag für GA4 je Gemeinde ein. Die B1-App (`/{sdSlug}/mobile`) sendet ihre Seitenaufrufe ebenfalls an diese ID, neben dem eigenen Tag von ChurchApps, sofern es eine gültige `G-`-ID ist (GTM-Container-IDs bleiben der Website vorbehalten). Jeder `gtag('config')`-Aufruf trägt ein `display_mode` mit dem Wert `installed` oder `browser`, abhängig von `navigator.standalone` oder der Medienabfrage `(display-mode: standalone)` (`B1App/src/helpers/mobileAnalytics.ts`) |
| Sitemap und Feeds | Die Route `sitemap.xml` je Gemeinde enthält Seiten des Builders, Blog-URLs und die 50 neuesten Predigtseiten (mit `<lastmod>` aus dem Veröffentlichungsdatum jeder Predigt). Außerdem listet sie die eingebauten Seiten `/sermons`, `/groups` und `/volunteer`, wenn sie Inhalte haben (öffentliche Gruppen, Anmeldepläne), sofern keine gespeicherte Weiterleitung diesen Pfad ersetzt. `/` fehlt, wenn die Gemeinde keine Startseite hat, da `/` dann auf das nicht erlaubte `/mobile` weiterleiten würde. Die Blogübersicht bewirbt den RSS-Feed |
| Barrierefreiheit | Die öffentliche Oberfläche rendert in jedem Layout-Wrapper einen Sprunglink auf das Landmark `<main id="main-content">` |

## KI-Erzeugung (AskApi)

Die Erzeugung von Seiten und ganzen Websites läuft in **AskApi**, einem eigenständigen Dienst unter dem Controller `/website`. Er authentifiziert sich mit demselben JWT `CustomAuthProvider` wie alles andere und ist **im Hinblick auf Inhalte zustandslos**: Jeder Endpunkt liefert JSON, und der Aufrufer (B1Admin) speichert das Ergebnis über die ContentApi (`POST /content/pages/importTree` legt eine Seite mit ihrem vollständigen verschachtelten Baum aus Abschnitten und Elementen in einem Aufruf an; sie fügt immer unter der Gemeinde des Aufrufers ein und ignoriert IDs im Body).

### Seitenerzeugung (`planPage` → `writePage`)

Die Vorlage „AI“ im Dialog `AddPageModal` von B1Admin verwendet eine kostengünstige Pipeline (`AskApi/src/helpers/SiteGenHelper.ts`), die auf einer Regel beruht: **Kein Modell gibt jemals Builder-JSON aus.** Zwei Modelle teilen die Arbeit über das Vercel AI Gateway (reines HTTP, SSM-Schlüssel `/{env}/aiGatewayApiKey` oder `AI_GATEWAY_API_KEY`):

- **JEV** (`typesafe-ai/jev`) — ein typisiertes Entscheidungsmodell, das Auswahlen, Bewertungen und Wahrheitswerte mit Wahrscheinlichkeiten liefert, aber keinen Text schreiben kann. Es wählt jeden Abschnitt nacheinander aus einer festen Vorlagenbibliothek, bewertet Layouts, prüft Texte auf Fakten und wählt Stockfotos und Symbole aus. Die Eingabe kostet etwa 0,04 $ je Million Token, die Ausgabe ist kostenlos; daher kosten rund 90 Aufrufe je Seite einen Bruchteil eines Cents.
- **Ein kleines Chatmodell (standardmäßig GPT-4.1 mini)** — füllt die benannten, in der Länge begrenzten Textplätze der gewählten Vorlagen. Der Verfasser ist eine feste Konstante, die mit der Umgebungsvariablen `SITEGEN_COPY_MODEL` überschrieben werden kann (jede Chat-Modell-ID des Gateways, z. B. `anthropic/claude-haiku-4.5`). In einem blinden Vergleich bei drei Gemeinden klang Claude Haiku 4.5 etwas wärmer; GPT-4.1 mini lag aber nahe daran und war etwa viermal günstiger und schneller, daher ist es der Standard. Eine vollständige Seite mit allen drei Layouts kostet etwa 1,3 Cent, davon rund 80 % für den Verfasser.

| Phase | Endpunkt | Was geschieht |
|-------|----------|--------------|
| 1 | `POST /website/planPage` | Ordnet den Seitentyp ein (Start, Besuch, Über uns …), zieht dann 10 Kandidaten-Layouts aus den Wahrscheinlichkeiten je Runde von JEV (Hero + Anzahl der Abschnitte → jeder Abschnitt → Abschluss), entfernt Dubletten, lässt JEV jedes auf Passung, Ablauf und Lücken bewerten und gibt die besten 3 zurück, zusammen mit einer Schreibstimme und einem `suggestedStyle` (Palette + Schriften). Kandidaten, die bis dahin dieselben Abschnitte teilen, stellen JEV dieselbe Frage, daher werden Runden nach Präfix zwischengespeichert. Eine beste Bewertung unter 6 wird als `lowLayoutScore` protokolliert — dieses Protokoll ist der Rückstand an Vorlagen, die sich zu ergänzen lohnen. ~2 s |
| 2 | `POST /website/writePage` (ein Aufruf je Kandidat) | Der Verfasser füllt die Textplätze je zwei Abschnitte pro Aufruf parallel und liefert fünf Hero-Überschriften, zwischen denen JEV wählt; JEV prüft jeden Abschnitt auf Fakten; Abschnitte, die fehlschlagen, eine Floskel verwenden oder einen früheren Abschnitt wiederholen (gemeinsame Folgen von 4 Wörtern, im Code geprüft), werden parallel mit dem konkreten Grund neu geschrieben; eine Bereinigung im Code entfernt Sätze mit typischen Floskeln von Gemeindewebsites (sofern die eigene Beschreibung der Gemeinde sie nicht verwendet); JEV wählt Fotomotive, Symbole und den Formteiler des Hero und bewertet das Ergebnis. Liefert einen sofort speicherbaren Abschnittsbaum und eine Bewertung. ~6–9 s |
| 3 | `POST /content/pages/importTree` | B1Admin schreibt nur das am besten bewertete Layout (das zweitplatzierte dient als Ersatz, falls dieser Schreibvorgang scheitert), speichert es und öffnet die Vorschau (~10 s nach dem Speichern) |

Jede Phase ist eine eigene Anfrage, damit jeder Aufruf innerhalb der Grenze von 29 Sekunden des API Gateway bleibt. Die Vorlagen in `SiteGenHelper.buildTree` sind feste Bäume aus Abschnitten und Elementen des Katalogs (`text`, `row`/`column`, `card`, `iconFeature`, `faq`, `table`, `testimonial`, `textWithPhoto`, `box`, `map`, `sermons`) und verweisen auf Designtokens (`var(--accent)`, `var(--lightAccent)` …), sodass erzeugte Seiten das bestehende Erscheinungsbild der Gemeinde übernehmen. Eine neue Abschnittsvorlage bedeutet, ihre Liste der Plätze in `SECTIONS` und ihren Baum in `buildTree` einzutragen; der Modultest durchläuft jede Vorlage und prüft den Baum.

**Eingaben.** Texte dürfen nur Fakten aus zwei Quellen nennen: was die nutzende Person eingegeben hat und `churchContext.facts` — Datensätze, die B1Admin vor der Planung sammelt (öffentliche Gottesdienstzeiten und öffentliche Gruppennamen sowie Name und Adresse der Gemeinde). Dieselben Kennzeichen steuern die datengestützten Vorlagen: `times` rendert das Live-Element `serviceTimes`, wenn die Gemeinde ihre Gottesdienstzeiten in B1 führt (andernfalls eine eingetippte Tabelle), und `groups` sowie `countdown` werden nur angeboten, wenn dahinter Daten liegen. Die Aufrufe an JEV sind abgesichert: Ein Duplikat wird nach 1,5 s ausgelöst, und die erste Antwort gewinnt, weil das Gateway gelegentlich hängt und die Aufrufe nahezu kostenlos sind.

**Beim Thema bleiben.** Die Anfrage der nutzenden Person ist das *Thema der Seite* und nicht der Hintergrund über die Gemeinde. `planPage` ordnet die Anfrage ein (`home`, `visit`, `about`, `ministries`, `give`, `contact`, `event`, `topic`). Bei den Typen `event` und `topic` werden die allgemeinen Gemeindevorlagen (Wort des Pastors, Predigten, Dienste, Gruppen, gesellschaftliches Engagement, wöchentliche Zeiten und Countdown, Video-Hero) gar nicht erst angeboten; stattdessen stehen `details` (Wann / Wo / Was mitbringen) und ein datumsbezogener `eventCountdown` zur Verfügung. Beide Richter bewerten, ob der Inhalt beim Thema bleibt. B1Admin übergibt `pageType` aus dem Plan an jeden Aufruf von `writePage`.

**Vollständige Seiten aus kurzen Anfragen.** Seiten haben drei bis sechs mittlere Abschnitte, großzügige Längen der Textplätze, eine Einleitungszeile bei Kartenabschnitten und eine FAQ mit fünf Fragen; der Reparaturschritt erweitert jeden Abschnitt, der zu knapp geraten ist. Die Erzeugung erfolgt mit einem Klick: Es gibt keine Rückfragen. Lässt die Anfrage eine übliche Angabe aus, die eine vollständige Seite braucht (eine Uhrzeit, einen Raum, was mitzubringen ist, wie man sich anmeldet), ergänzt der Verfasser eine plausible, bescheidene Wahl, die die Gemeinde anpassen kann. Da Abschnitte parallel geschrieben werden, werden diese Lücken **einmal** in `planPage` entschieden (`assumedDetails`, ein kleiner Aufruf des Verfassers, der parallel zur Auswahl der Layouts läuft) und über `churchContext.assumedDetails` in jeden Aufruf von `writePage` zurückgegeben. So kann ein Abschnitt nicht 5:00 sagen, während ein anderer 5:30 sagt. JEV repariert jeden Abschnitt, der der Anfrage, den Datensätzen der Gemeinde oder diesen festgelegten Angaben widerspricht. Die festgelegten Angaben werden in der Benutzeroberfläche nicht gezeigt; die Gemeinde prüft und bearbeitet die Seite wie jede andere. Manches wird nie erfunden: Namen von Personen, Telefonnummern, E-Mail- und Webadressen, Preise, Statistiken, die Geschichte der Gemeinde, Zitate, die Personen zugeschrieben werden, und ein Wochentag für ein Datum, für das die Anfrage keinen angibt.

**Visuelle Elemente.** Vorlagen benennen ihre Fotos und Symbole nie. Sie lassen Plätze offen, und ein allgemeiner Durchgang (`visualSlots` → `pickVisuals` → `applyVisuals` in `SiteGenHelper`) geht den fertigen Baum durch und füllt jeden davon: einen Hintergrund des Abschnitts oder einen Eintrag der Galerie mit der Markierung `auto:photo`, ein `auto:icon`, den Formteiler `auto:divider` des Hero und — ohne jede Markierung — jedes Element `textWithPhoto`, `card` oder `image`, dessen `photo` leer ist. JEV wählt jedes davon anhand des danebenstehenden Textes (das Foto einer Karte anhand von Titel und Text dieser Karte, ein Hintergrund anhand des Textes des Abschnitts), wobei kein Motiv auf einer Seite doppelt vorkommt. Eine neue Vorlage erhält daher Fotos ohne eigenen Aufwand. Fotos sind Suchbegriffe für Pexels, die als Platzhalter `pexels:<term>` ausgegeben werden; B1Admin löst sie über `POST /content/stock/search` auf. Ein Client, der `resolvesPhotos` nicht sendet, erhält stattdessen ein eingebautes Hero-Bild, flächige farbige Bänder und Karten ohne Foto. Bewusst gibt es keine Motive für Porträts, und die Vorlage für den Pastor enthält kein Foto: Ein Fremdfoto aus dem Stock darf nie an die Stelle einer echten Person treten. Für eine Gemeinde ohne Seiten wendet B1Admin `suggestedStyle` auf die globalen Stile an; bestehende Websites behalten ihr Aussehen.

### Weitere Endpunkte

:::info
Die Schaltfläche „Umschreiben“ in der Symbolleiste des Abschnitts und die Schaltfläche „Generate Site“ in der Seitenliste von B1Admin sind clientseitig weiterhin auskommentiert. Die unten genannten AskApi-Endpunkte antworten dennoch; nur diese Oberfläche ist ausgeblendet.
:::

| Endpunkt | Zweck |
|----------|--------------|
| `POST /website/generatePageOutline` → `generateSection` | Der ursprüngliche zweistufige Ablauf für Seiten (Gliederung, danach ein LLM-Aufruf je Abschnitt, der JSON für Elemente ausgibt). In B1Admin durch `planPage`/`writePage` aus Kostengründen ersetzt; für API-Nutzer beibehalten |
| `POST /website/generateSite` | Erzeugung einer ganzen Website. **Bewusst zweiphasig**: Ein Aufruf mit `planOnly: true` liefert nur den Plan mit mehreren Seiten (ein schneller Modellaufruf); danach fordert der Client den vollständigen Inhalt an — so bleibt jede Anfrage innerhalb des Zeitlimits von Lambda/API Gateway |
| `POST /website/rewriteSection` | Umschreiben unter Beibehaltung der Struktur: Das Modell darf nur Antworten mit Text ändern. Eine rekursive Strukturkennung (IDs, Typen, Reihenfolge) wird vor und nach dem Aufruf verglichen; jede Abweichung liefert den ursprünglichen Abschnitt mit `fallback: true` statt einer beschädigten Struktur |
| `POST /website/generateAltText` | Bildanalyse über bis zu 20 Bild-URLs; liefert einen knappen Alternativtext (≤125 Zeichen, Präfixe wie „photo of“ entfernt) |
| `POST /website/generateMetaDescription` | Eine SEO-Metabeschreibung (≤155 Zeichen) aus dem Textinhalt der Seite — angebunden an die Schaltfläche Generate in den Seiteneinstellungen von B1Admin |

Die Prompts dieser Endpunkte sind Markdown-Dateien unter `AskApi/config/instructions/`, einschließlich des Elementkatalogs, aus dem das Modell erzeugt. Zwei Gestaltungsentscheidungen halten den Katalog korrekt: Der Client übergibt bei jeder Anfrage `availableElementTypes` (der Prompt darf nur Typen aus dieser Liste verwenden — der Server hartkodiert nie die vollständige Menge), und das MCP-Werkzeug `describe_page_builder` der API enthält dieselbe Anleitung für KI-Agenten, die über [MCP](../api/mcp) arbeiten. Die Modelle sind Anthropic Claude über OpenRouter — 3.5 Haiku für Abschnittsinhalte (Latenz), 3.5 Sonnet für Gliederungen, Seitenpläne und Bildanalyse — mit einem Rückgriff auf OpenAI, wenn kein OpenRouter-Schlüssel konfiguriert ist.

## Formulare im Dialogstil

Formulare (Membership-Modul) erhielten einen Dialogmodus, der auf Seiten im Stil einer Gemeindekarte (Connect Card) ausgerichtet ist. Vier Spalten der Tabelle `forms` steuern ihn: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **Darstellung** — Die Komponente `FormSubmissionEdit` aus apphelper wechselt zur Komponente `ConversationalForm` (eine Frage nach der anderen), wenn `displayMode` den Wert `conversational` hat; die Formularseite von B1App übergibt den Modus weiter. Die übermittelten Daten sind in beiden Fällen dieselben.
- **Automatisch anlegen der Person** — Bei einer Übermittlung mit gesetztem `autoCreatePerson` prüft `ConversationalFormHelper.findOrCreatePerson` auf Dubletten anhand der E-Mail (ohne Unterscheidung der Groß-/Kleinschreibung); andernfalls legt er einen Haushalt und eine Person mit `membershipStatus: "Guest"` an und verknüpft die Übermittlung mit dieser Person.
- **Nachfass-E-Mail** — Sind Betreff und Text gesetzt, erhält der Absender eine vorlagenbasierte E-Mail (mit den Platzhaltern `{firstName}` / `{churchName}`) über den bestehenden transaktionalen Weg (`TransactionalEmailHelper`), niemals über den Benachrichtigungs-Digest. Beide Nebenwirkungen sind nicht fatal: Ein Fehler kostet nie die Übermittlung.

Die vier Felder werden heute über die API gesetzt; der Formular-Editor in B1Admin stellt sie noch nicht bereit.

## Cache der öffentlichen Website

Der Renderpfad der öffentlichen Website in B1App speichert Abrufe mit Gemeindekennzeichen zwischen (`next: { revalidate: 300, tags: [sdSlug] }` in der Produktion; `0` in der Entwicklung). Daher kann eine Live-Seite bis zu fünf Minuten nach einem Schreibvorgang in der ContentApi veraltet angezeigt werden. `POST /api/revalidate/{sdSlug}` in B1App ruft `revalidateTag(sdSlug)` auf und ist der einzige Weg, diesen Cache vorzeitig zu leeren.

Zwei Stellen schreiben darauf:

1. **B1Admin** — `clearSiteCache()` in `B1Admin/src/site/siteCache.ts` sendet nach dem Speichern im Editor eine POST-Anfrage. Sie bevorzugt die Subdomain der aktiven Website (eine zweite Website muss *ihr* Tag leeren, nicht das der Standardwebsite der Gemeinde).
2. **Api** — Änderungen am Inhalt, die nie über B1Admin laufen (API-Schlüssel, MCP, KI), lösen `SiteCacheHelper.bump(churchId)` aus den Inhalts-Controllern aus. Der Helfer ermittelt die Subdomain der Gemeinde über `SubDomainHelper` und sendet POST an `{b1AppRoot}/api/revalidate/{sd}`. Fehler werden verschluckt, damit ein nicht erreichbares B1App nie eine Speicherung zum Scheitern bringt.

Controller, die einen Bump auslösen: Seiten (speichern, löschen, duplizieren, veröffentlichen, verwerfen, zurückziehen, KI-Zwischenstand), Abschnitte, Elemente, Blöcke, Links, globale Stile, Beiträge und Weiterleitungen. Der Basisweg `b1AppRoot` in der Entwicklung ist `http://{subdomain}.localtest.me:3301`; Demo und Produktion verwenden `https://{subdomain}.b1.church`.

## Verwandte Seiten

- [Website-Routing und Multi-Site](./websites) — wie eine Anfrage einer Gemeinde/Website zugeordnet wird und wie eigene Domains geleitet werden
- [Content-Endpunkte](../api/endpoints/content) — vollständige REST-Schnittstelle für Seiten, Abschnitte, Elemente, Blöcke, Beiträge, Weiterleitungen und Einstellungen
- [AppHelper](../shared-libraries/app-helper) — das npm-Paket mit den Renderern, der Registry, den Teilern und den Widgets
- [MCP-Server](../api/mcp) — einschließlich des Anleitungswerkzeugs `describe_page_builder`
- [Seiteneditor (für Endnutzer)](/docs/b1-admin/website/page-editor) — die Dokumentation des Editors für Mitarbeitende
