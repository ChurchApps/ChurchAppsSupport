---
title: "Architektur des Website-Builders"
---

# Architektur des Website-Builders

<div class="article-intro">

Jede Kirchenwebsite, die von B1App ausgeliefert wird, wird aus einem Inhaltsbaum gerendert -- Seiten, Abschnitte, Elemente -- der im ContentApi gespeichert und in B1Admin visuell bearbeitet wird. Eine gemeinsame Komponentenbibliothek rendert sowohl die Vorschau im Editor als auch die Live-Seite; ein Katalog von Elementtypen legt fest, was auf einer Seite erscheinen kann; und ein eigener KI-Dienst kann diesen Baum erzeugen oder umschreiben. Diese Seite beschreibt den gesamten Aufbau: den Vertrag der Elemente in `@churchapps/helpers`, die Render-Pipeline, Elemente mit Kirchendaten, seitenweite Widgets, die Blog-Schicht, zugriffsgesteuerte Seiten, SEO, die KI-Generierung und Konversationsformulare.

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

Drei Regeln gelten im gesamten Aufbau:

1. **Ein Baum, zwei Renderer.** Eine Seite ist ein Baum aus `pages → sections → elements`, bei dem jeder Knoten seine Einstellungen als JSON-Blob `answers` trägt. Dieselben apphelper-Komponenten rendern den Drag-and-Drop-Editor in B1Admin und die serverseitig gerenderte öffentliche Seite in B1App -- es gibt kein gesondertes "Veröffentlichungsformat".
2. **Der Vertrag liegt in `@churchapps/helpers`.** `ElementTypes.ts` ist der einzige Katalog der Elementtypen; Renderer werden über eine Registrierung in apphelper aufgelöst; die Bearbeitungsformulare liegen in B1Admin. Einen Elementtyp hinzuzufügen bedeutet, alle drei Stellen in dieser Reihenfolge anzufassen.
3. **Die öffentliche Seite liest anonyme Endpunkte.** Alles, was B1App braucht -- den Seitenbaum, Einstellungen, Blogbeiträge, Weiterleitungen und die Endpunkte mit Kirchendaten anderer Module -- ist öffentlich. Die Authentifizierung ist optional: Ein JWT am anonymen Baum-Endpunkt schaltet nur Seiten nur für Mitglieder frei; sonst ändert sich nichts.

## Der Inhaltsbaum

Das Content-Modul (`Api/src/modules/content`) besitzt die Daten des Builders:

| Tabelle | Aufgabe |
|-------|------|
| `pages` | Eine Seite je URL: `url`, `title`, `layout`, dazu `visibility`/`groupIds` (Zugriffssteuerung) und `metaDescription` (SEO) |
| `sections` | Horizontale Bänder auf einer Seite (oder in einem Block): Hintergrund, Textfarbe und ein `answersJSON`, das die Gestaltung sowie die Konfigurationen der Formteiler `dividerTop`/`dividerBottom` enthält |
| `elements` | Inhaltsstücke innerhalb eines Abschnitts: `elementType` + `answersJSON`, für Layouttypen (Zeile/Spalte, Karussell) verschachtelbar |
| `blocks` | Wiederverwendbare Gruppen aus Abschnitten/Elementen (Fußblöcke, Elementblöcke), die über Seiten hinweg geteilt werden |
| `posts` | Eigenständige Blogbeiträge (siehe [Blog](#blog)) |
| `redirects` | Paare `fromPath → toPath` je Kirche, auf 200 begrenzt (siehe [SEO](#seo-und-auffindbarkeit)) |
| `settings` | Schlüssel-Wert-Kircheneinstellungen; Zeilen mit dem Kennzeichen `public` werden anonym ausgeliefert und enthalten die Konfiguration von Widgets und Analyse |

Der gesamte Baum einer URL kommt aus einem einzigen anonymen Aufruf zurück -- `GET /content/pages/:churchId/tree?url=/about` --, aus dem B1App serverseitig rendert. Anfragen des Editors laden stattdessen nach ID und behalten interne IDs bei.

## Der Vertrag der Elemente

### Der Katalog (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` definiert jeden Elementtyp als `ElementTypeDefinition`: `elementType`, `label`, `category`, `schemaVersion`, `defaults` und ein JSON-Schema-artiges `answersSchema` für seine Antworten. `validateElementAnswers()` ist bewusst nachsichtig: Unbekannte Typen und zusätzliche Schlüssel werden akzeptiert, sodass alte Inhalte bei einer Aktualisierung des Katalogs nie brechen. **Heute werden 35 Typen mitgeliefert:**

| Kategorie | Elementtypen |
|----------|---------------|
| Layout (6) | row, column, box, carousel, whiteSpace, block |
| Inhalt (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| Medien (4) | image, gallery, video, map |
| Kirche (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| Erweitert (2) | rawHTML, iframe |

Das Element `sermons` ist das am stärksten konfigurierbare der Kirchentypen: Eine Antwort `layout` wählt `browse` (der frühere vollständige Browser), `grid`, `list` oder `featuredLatest`; `playlistId`, `itemCount`, `showTitles` und `showDates` verfeinern die Layouts außer browse.

Das Element `rawHTML` hat zwei Antworten: `rawHTML` (Auszeichnung) und `javascript`. Skripte, die über `innerHTML` eingefügt werden, werden nie ausgeführt. Deshalb erzeugt `RawHTMLElement` jeden `<script>`-Knoten in der Auszeichnung als neues Element neu. Diese nicht vom Parser eingefügten Knoten gelten unter der `strict-dynamic` der CSP als vertrauenswürdig. Eine Antwort `javascript`, die mit `<` beginnt (ein Herstellerschnipsel mit seinen `<script>`-Tags), wird als Auszeichnung geparst und gleich behandelt. Andernfalls läuft sie als einfaches Inline-Skript. B1Admin markiert im Feld JavaScript eine bloße URL, da eine einzelne URL als Skript nichts tut. Das Element `map` rendert nichts und lädt kein Google-Maps-Skript, wenn kein Maps-API-Schlüssel konfiguriert ist.

### Renderer (`@churchapps/apphelper`)

Die Renderer liegen in `Packages/apphelper/src/website/components/elementTypes/`, eine Komponente je Typ, aufgelöst über `ElementRegistry.ts` -- einer zweistufigen Zuordnung, bei der `Element.tsx` den Standard-Renderer für alle 35 Typen registriert (`registerDefaultElementRenderer`) und eine Host-App jeden davon zur Laufzeit überschreiben kann (`registerElementRenderer`), ohne das Paket zu forken.

### Bearbeitungsformulare (B1Admin)

Die Einstellungsformulare des Editors für die einzelnen Typen liegen in `B1Admin/src/site/admin/elements/` -- `ElementEdit.tsx` verzweigt zu einer eigenen Komponente (`GalleryEdit`, `TestimonialEdit`, `StatsEdit` …) oder zu einem Feldaufbau je Typ. Das KI-seitige Gegenstück zu diesem Katalog ist das Werkzeug `describe_page_builder` des MCP der API (siehe [MCP-Server](../api/mcp)).

Die Vorschau des Editors nutzt dasselbe `Theme` wie die Live-Seite; es setzt die CSS-Variablen `--headingFont` / `--bodyFont` aus den globalen Stilen der Kirche. B1App wendet diese Variablen über `pages.css` an, das B1Admin nicht importieren kann. Daher injiziert `ContentEditor.tsx` `EDITOR_PAGE_FONT_CSS` (`src/site/admin/editorCss.ts`), das sie auf den Fließtext `.page` und die Überschriften `h1`–`h6` anwendet. Ohne dies zeigte die Vorschau Überschriften in der Verwaltungsschrift.

### Formteiler für Abschnitte

Abschnitte können an beiden Kanten dekorative Formteiler tragen. Die Konfiguration steht im `answersJSON` des Abschnitts als Objekte `dividerTop` / `dividerBottom` -- `{ shape, color, height, flip }` mit `shape` aus `wave, waves, slant, curve, triangle, peaks`. Apphelper liefert die Komponente `SectionDivider` und die Hilfsfunktion `parseDividerConfig()`; beide Abschnitts-Renderer der Apps (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) lesen die Antworten und binden den Formteiler ein, und `SectionEdit.tsx` in B1Admin bietet die Auswahl. Die Pakete liefern nur den Baustein -- die Verdrahtung auf Abschnittsebene ist Aufgabe der nutzenden Apps.

## Elemente mit Kirchendaten

Drei Elementtypen rendern Live-Daten der Kirche statt erstellter Inhalte. Die Modulisolation gilt weiterhin -- jedes ruft den öffentlichen Endpunkt des zuständigen Moduls aus dem Browser auf:

| Element | Endpunkt | Hinweise |
|---------|----------|----------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Liefert `{ fundId, totalAmount, donationCount }`, optional mit einem Zeitfenster `?startDate=&endDate=`; das Element vergleicht es mit seiner Antwort `goalAmount` |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Nur mit Opt-in**: Die Gruppe muss `publicRoster` gesetzt haben (Standard aus). Die Projektion ist bewusst minimal -- `personId`, `displayName`, `leader`, Foto -- ohne Kontakt- oder Stammdaten |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Liefert den Baum Standort → Gottesdienst → Gottesdienstzeit; der Renderer von apphelper erzeugt daraus nach bestem Bemühen schema.org-`Event`-JSON-LD (die API liefert nur Rohdaten) |

:::warning
`publicRoster` ist das Datenschutztor für `staffGrid`. Erweitern Sie die öffentliche Projektion der Gruppenmitglieder nie und umgehen Sie das Kennzeichen nie -- der Endpunkt der Mitgliederliste ist mit Absicht anonym, und die knappe Feldliste ist die Sicherheitseigenschaft.
:::

### Kalenderelement und Veranstaltungsseiten

Die Antworten des Elements `calendar` sind `calendarType` (`group` | `curated`), `calendarId`, `display` (`month`, der Standard, oder `upcoming`) und `tag`. B1App überschreibt den Renderer von apphelper in `src/components/Element.tsx` mit `registerElementRenderer("calendar", …)`:

- **`display: "upcoming"`** rendert `UpcomingEventsElement` von B1App: Es lädt `GET /content/events/public/group/:churchId/:groupId` oder `GET /content/curatedEvents/public/calendar/:churchId/:curatedCalendarId`, löst Wiederholungen mit `buildOccurrences()` auf (`src/helpers/EventOccurrences.ts`, ein Termin je Veranstaltung innerhalb eines Jahres) und zeigt die ersten 12 als Fotokacheln (`events.photoUrl`; ohne Foto der Titel auf der dunklen Farbe des Designs), die zu `/events/{id}` verlinken, mit einem Menü Abonnieren für den ICS-Feed des Kalenders.
- **`display: "month"`** rendert `CalendarElement` von apphelper mit einem Callback `eventUrl`. `GroupCalendar` / `CuratedCalendar` → `EventCalendar` / `CuratedEventCalendar` navigieren dann beim Klick zu dieser URL, statt den Detaildialog zu öffnen (B1Admin übergibt kein `eventUrl`, daher behält der Admin-Kalender seinen Dialog).
- **`tag`** filtert beide Darstellungen mit `EventHelper.hasTag()` (`@churchapps/helpers`): ein Vergleich ohne Berücksichtigung der Groß-/Kleinschreibung gegen die kommagetrennten `events.tags`; leer zeigt alles. Die Verknüpfung der Kuratierten Kalender wählt `e.tags`, damit kuratierte Veranstaltungen ihre Schlagwörter tragen.

Kuratierte Veranstaltungen verlinken über `realEventId` (`eventPageId()`), sodass die URL immer die zugrunde liegende Veranstaltung nennt. `/{sdSlug}/events/[eventId]` ist eine eigene Route (nicht die Pipeline des Builders): Sie lädt `GET /content/events/public/:churchId/:id` -- das `null` liefert für ausstehende oder abgelehnte Veranstaltungen und für private Veranstaltungen ohne Anmeldung und ergänzt `roomNames` aus den nicht abgelehnten Raumbuchungen -- rendert `EventPageContent` (Foto als Kopfbereich, Beschreibung als Markdown, Seitenleiste Wann/Wo, **Für diese Veranstaltung anmelden**, wenn `registrationEnabled`, und den Link **Zu meinem Kalender hinzufügen** auf `GET /content/events/public/:churchId/:id/ical`), verwendet das Foto als Open-Graph-Bild und sendet über `EventPageJsonLd` ein `Event`-JSON-LD für den nächsten Termin. Eine unbekannte oder verborgene Veranstaltung liefert eine echte 404.

## Seitenweite Widgets

Zwei Widgets erscheinen auf jeder öffentlichen Seite, nicht innerhalb des Baums: **AnnouncementBanner** (eine schließbare Leiste oben auf der Seite) und **Launcher** (ein schwebendes Aktionsmenü für Links wie Geben, Besuchen oder Ansehen). Beide Komponenten und ihre Hilfsfunktionen `parse*Config()` werden in apphelper mitgeliefert. Die Konfiguration besteht aus zwei öffentlichen Einstellungszeilen mit den Schlüsseln `announcementBanner` und `launcher`. B1Admins `SiteWidgetsEdit` (auf der Seite Erscheinungsbild) schreibt sie, und das öffentliche Layout von B1App liest sie über `GET /content/settings/public/:churchId`. Die API behandelt diese Einträge als undurchsichtige Schlüssel-Wert-Paare; die Schlüsselnamen sind eine Vereinbarung zwischen den beiden Apps.

## Blog

Der Blog ist ein eigenständiger Inhaltstyp, keine Schicht über den Seiten des Builders. Eine Zeile `posts` enthält den gesamten Beitrag: `title`, `slug`, `excerpt`, `content` (Markdown-Text), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`. Die öffentliche Oberfläche (alles anonym, `PostController`):

| Route | Zweck |
|-------|---------|
| `GET /content/posts/public/:churchId` | Veröffentlichte Beiträge, filterbar nach `?category=&tag=`, paginiert |
| `GET /content/posts/public/:churchId/categories` | Verschiedene Kategorien veröffentlichter Beiträge |
| `GET /content/posts/public/:churchId/slug/:slug` | Ein veröffentlichter Beitrag |
| `GET /content/posts/rss/:churchId?siteUrl=` | RSS-2.0-Feed mit dem Namen der Kirche als Titel, mit Kategorie und Beschreibung (Auszug oder Inhalt) je Eintrag |

Ein Beitrag gilt als "veröffentlicht", sobald `publishDate` gesetzt und erreicht ist; ein künftiges `publishDate` ist ein geplanter Beitrag (öffentlich verborgen, in der Verwaltung mit einem Chip Geplant angezeigt). Lesende Endpunkte reichern jeden Beitrag mit `authorName` an, das über `authorId` aus dem Gateway des Mitgliedschaftsmoduls aufgelöst wird. Fehlt ein Auszug, nehmen Listenkarten, Meta-Beschreibungen und RSS den Anfang des Inhalts ohne Markdown (etwa 160 Zeichen). B1App bietet `/{sdSlug}/blog` -- eine redaktionelle Liste (zentrierter Kopf, der bei einem Filter zum Namen der gewählten Kategorie oder des Schlagworts wird, eine Reihe von Kategorie-Chips, Beitragszeilen mit Vorschaubild links, Autorzeile und Auszug), wobei der RSS-Feed als alternativer Link angekündigt wird -- und `/{sdSlug}/blog/[postSlug]`, eine eigene Route (nicht die Zone/Abschnitt-Pipeline) mit zentriertem Kopf (Kategorie-Auszeichnung, Titel, Autorzeile, Akzentlinie in der Primärfarbe), einem Hero-Bild im Format 16:9 in Containerbreite, dem Markdown-Text in einer Lesespalte von etwa 720 px, Schlagwort-Chips im Fuß des Artikels, einer Leiste "Mehr aus {Kategorie}" mit verwandten Beiträgen und `BlogPosting`-JSON-LD einschließlich des Autors. Beide Seiten gestalten sich ausschließlich über Designtokens und übernehmen so die Farbpalette jeder Kirche. Die URLs der Blogbeiträge sind in der Sitemap jeder Kirche enthalten. Die Autorenoberfläche von B1Admin (**Website → Blog**) bearbeitet Beiträge in einem Dialog: Markdown-Editor mit Umschalter für die Vorschau, Auswahl eines Bildes in der Galerie im Zuschnitt 16:9, Auswahl der Autorin bzw. des Autors (Vorgabe: die bearbeitende Person), Autovervollständigung der Kategorien aus den bestehenden, Prüfung auf doppelte Slugs und ein Schalter für die Veröffentlichung; veröffentlichte Zeilen verlinken auf den Live-Beitrag, und die Seite erinnert daran, einen Navigationslink auf `/blog` anzulegen. Kommentare überlässt man Drittdiensten: Eine seitenweite öffentliche Inhaltseinstellung `blogFooterHtml` (bearbeitet unter **Unter jedem Beitrag** auf der Seite Blog, nur mit Einstellungsrecht Bearbeiten sichtbar) wird unter jedem Beitrag von `BlogFooterEmbed` der B1App ausgegeben. Diese Komponente erzeugt die `<script>`-Tags neu, damit sie unter `'strict-dynamic'` ausgeführt werden, und führt sie der Reihe nach aus (eine externe `src` wird vollständig geladen, bevor das nächste Inline-Skript läuft), da Herstellerschnipsel zuerst eine Bibliothek laden und sie danach aufrufen.

## Seiten nur für Mitglieder

`pages.visibility` verwendet dieselbe Aufzählung wie die Navigationslinks -- `everyone` (Standard), `visitors`, `members`, `staff`, `team`, `groups` (mit `groupIds`) --, aber als **harte Zugriffssperre** und nicht als Filter der Navigation (`PageVisibilityHelper.canViewPage`). Der Ablauf:

1. Der anonyme Baum-Endpunkt prüft bei Abrufen über die URL die Sichtbarkeit. Anonyme Aufrufer einer gesperrten Seite erhalten `{ restricted: true, visibility }` statt Inhalt -- der Baum gibt nie etwas preis.
2. Der Endpunkt beachtet trotzdem ein JWT: `CustomAuthProvider` prüft den Header `Authorization` bei *jeder* Anfrage, auch auf anonymen Routen. Ein angemeldetes Mitglied, das dieselbe URL abruft, erhält sie daher normal.
3. B1App rendert bei einer Antwort `restricted` die Komponente `RestrictedPage`: Sie stellt die Sitzung aus den gespeicherten Zugangsdaten wieder her, lädt den Baum mit dem JWT erneut und zeigt ihn an -- oder zeigt eine Anmeldesperre mit einer `returnUrl`, wenn keine Sitzung besteht.

:::info
Die Feinheit der Sperre variiert je Stufe: `groups` prüft die `groupIds` des Tokens gegen die Liste der Seite und `staff` prüft `membershipStatus`, aber `members` und `team` lassen derzeit jeden angemeldeten Benutzer der Kirche durch. Behandeln Sie `groups` als die strenge Option.
:::

## SEO und Auffindbarkeit

Das alles rendert B1App aus den Daten des ContentApi -- die API speichert, die App gibt aus:

| Thema | Funktionsweise |
|---------|--------------|
| Meta-Beschreibungen | `pages.metaDescription` (höchstens 300 Zeichen) fließt über `MetaHelper.getMetaData()` in die `Metadata` von Next.js (Beschreibung und Open Graph) auf jeder vom Builder gerenderten Route. Die Seiteneinstellungen in B1Admin enthalten eine KI-Schaltfläche **Erzeugen** (siehe unten) |
| Weiterleitungen | Zeilen `redirects` je Kirche, verwaltet unter `/content/redirects` (`content.edit`, Obergrenze 200 Zeilen, normalisierte Pfade). Bei einem sonst fälligen 404 löst die Seitenroute von B1App den Pfad gegen `GET /content/redirects/public/:churchId` auf und sendet eine HTTP-308 über `permanentRedirect` von Next; nicht passende Pfade fallen auf `notFound()` zurück |
| Eigene 404-Seite | `not-found.tsx` rendert `BrandedNotFound` mit Logo, Name und Design der Kirche statt einer allgemeinen Fehlerseite. Unbekannte Pfade `/register/[eventId]`, `/events/[eventId]`, `/stream/[pageSlug]` und `/volunteer/[planId]` liefern eine echte 404, ebenso unbekannte Subdomains und fehlerhafte Seiten-Slugs (siehe [Website-Routing & Mehrere Sites](./websites)) |
| Strukturierte Daten | `BlogPosting`-JSON-LD für Blogbeiträge; `VideoObject` auf den Einzelseiten der Predigten (`/{sdSlug}/sermons/[sermonId]`) und auf Seiten mit einem Element `sermons`; `Event` aus Kalender-/Veranstaltungselementen auf Builder-Seiten und auf jeder Seite `/{sdSlug}/events/[eventId]` (nächster Termin, mit dem Veranstaltungsfoto als `image`); schema.org-`Event` aus dem Element `serviceTimes` |
| Predigtseiten | Jede öffentliche Predigt erhält eine von Suchmaschinen erreichbare Seite unter `/sermons/[sermonId]` mit vollständigen Metadaten -- Predigten stecken nicht mehr im clientseitigen Browser-Element |
| Analyse | Die öffentliche Einstellung `ga4MeasurementId` (verwaltet neben den Weiterleitungen in B1Admin) bindet einen kirchenspezifischen GA4-gtag über `next/script` ein. Die B1-App (`/{sdSlug}/mobile`) sendet ihre Seitenaufrufe ebenfalls an diese ID, zusätzlich zum eigenen Tag von ChurchApps, sofern sie eine gültige `G-`-ID ist (GTM-Container-IDs bleiben der Website vorbehalten). Jeder `gtag('config')`-Aufruf trägt ein `display_mode` mit dem Wert `installed` oder `browser`, abhängig von `navigator.standalone` oder der Medienabfrage `(display-mode: standalone)` (`B1App/src/helpers/mobileAnalytics.ts`) |
| Sitemap und Feeds | Die `sitemap.xml`-Route je Kirche enthält Builder-Seiten, Blog-URLs und die 50 neuesten Predigtseiten (mit `<lastmod>` aus dem Veröffentlichungsdatum der Predigt). Sie listet außerdem die eingebauten Seiten `/sermons`, `/groups` und `/volunteer`, sofern sie Inhalte haben (öffentliche Gruppen, Anmeldungen für Dienste), es sei denn, eine gespeicherte Weiterleitung ersetzt diesen Pfad. `/` wird weggelassen, wenn die Kirche keine Startseite hat, denn `/` leitet dann auf das ausgeschlossene `/mobile` weiter. Die Blogübersicht verweist auf den RSS-Feed |
| Barrierefreiheit | Die öffentliche Oberfläche zeigt in jedem Layout-Wrapper einen Sprunglink zum Landmark `<main id="main-content">` |

## KI-Generierung (AskApi)

Die Erzeugung von Seiten und ganzen Websites läuft in **AskApi**, einem eigenen Dienst unter dem Controller `/website`. Er authentifiziert sich mit demselben JWT von `CustomAuthProvider` wie alles andere und ist **in Bezug auf Inhalte zustandslos**: Jeder Endpunkt liefert JSON, und der Aufrufer (B1Admin) speichert das Ergebnis über das ContentApi (`POST /content/pages/importTree` legt eine Seite mit ihrem vollständigen verschachtelten Baum aus Abschnitten und Elementen in einem Aufruf an; er fügt immer unter der Kirche des Aufrufers ein und ignoriert IDs im Body).

### Seitenerzeugung (`planPage` → `writePage`)

Die Vorlage "KI" im Dialog `AddPageModal` von B1Admin nutzt eine kostengünstige Pipeline (`AskApi/src/helpers/SiteGenHelper.ts`), die auf einer Regel beruht: **Kein Modell gibt Builder-JSON aus**. Zwei Modelle teilen sich die Arbeit über das Vercel AI Gateway (reines HTTP, Schlüssel aus SSM `/{env}/aiGatewayApiKey` oder `AI_GATEWAY_API_KEY`):

- **JEV** (`typesafe-ai/jev`) -- ein typisiertes Entscheidungsmodell, das Auswahlen, Bewertungen und Ja/Nein-Werte mit Wahrscheinlichkeiten liefert, aber selbst keinen Text schreibt. Es wählt jeden Abschnitt nacheinander aus einer festen Vorlagenbibliothek, bewertet Layouts, prüft Texte auf Fakten und wählt Stockfotos und Symbole. Die Eingabe kostet etwa 0,04 $ je Million Token, die Ausgabe ist kostenlos; daher kosten etwa 90 Aufrufe je Seite einen Bruchteil eines Cents.
- **Ein kleines Chatmodell (standardmäßig GPT-4.1 mini)** -- füllt die benannten, in der Länge begrenzten Textfelder der gewählten Vorlagen. Der Textschreiber ist eine Konstante, überschreibbar über die Umgebungsvariable `SITEGEN_COPY_MODEL` (jede Chat-Modell-ID des Gateways, z. B. `anthropic/claude-haiku-4.5`). In einem blinden Vergleich bei drei Kirchen klang Claude Haiku 4.5 etwas herzlicher, aber GPT-4.1 mini lag nahe dran, war etwa viermal günstiger und schneller; daher ist es der Standard. Eine vollständige Seite mit allen drei Layouts kostet etwa 1,3 Cent, davon etwa 80 % der Textschreiber.

| Phase | Endpunkt | Was geschieht |
|-------|----------|--------------|
| 1 | `POST /website/planPage` | Ordnet den Seitentyp ein (Start, Besuch, Über uns …) und zieht dann 10 Kandidaten-Layouts aus den Wahrscheinlichkeiten von JEV je Runde (Held + Anzahl Abschnitte → jeder Abschnitt → Abschluss), entfernt Dubletten, lässt JEV jeden auf Passung, Fluss und Lücken bewerten und liefert die besten 3 zurück sowie einen Schreibstil und einen `suggestedStyle` (Palette + Schriften). Kandidaten mit denselben Abschnitten bis dahin stellen JEV eine identische Frage, daher werden Runden nach Präfix gespeichert. Liegt die beste Bewertung unter 6, wird `lowLayoutScore` protokolliert -- dieses Protokoll ist der Rückstau an Vorlagen, die sich zu ergänzen lohnen. ~2 s |
| 2 | `POST /website/writePage` (ein Aufruf je Kandidat) | Der Textschreiber füllt die Textfelder zwei Abschnitte je Aufruf, parallel, und liefert fünf Schlagzeilen für den Kopf, aus denen JEV wählt; JEV prüft jeden Abschnitt auf Fakten; Abschnitte, die scheitern, eine Floskel enthalten oder einen früheren Abschnitt wiederholen (gemeinsame Folgen von 4 Wörtern, im Code geprüft), werden parallel mit dem konkreten Grund neu geschrieben; ein Bereinigungsschritt im Code entfernt Sätze mit typischen Kirchen-Floskeln (es sei denn, die eigene Beschreibung der Kirche verwendet sie); JEV wählt Motive für Fotos, Symbole und den Formteiler des Kopfes und bewertet das Ergebnis. Liefert einen speicherfertigen Abschnittsbaum und eine Bewertung. ~6–9 s |
| 3 | `POST /content/pages/importTree` | B1Admin schreibt nur das bestplatzierte Layout (der Zweitplatzierte ist ein Ersatz, falls dieser Schreibvorgang scheitert), speichert es und öffnet die Vorschau (~10 s nach dem Speichern) |

Jede Phase ist eine eigene Anfrage, damit jeder Aufruf innerhalb der Grenze von 29 Sekunden des API Gateway bleibt. Die Vorlagen in `SiteGenHelper.buildTree` sind feste Abschnitts- und Elementbäume aus dem Katalog (`text`, `row`/`column`, `card`, `iconFeature`, `faq`, `table`, `testimonial`, `textWithPhoto`, `box`, `map`, `sermons`) und verweisen auf Designtokens (`var(--accent)`, `var(--lightAccent)` …). Erzeugte Seiten übernehmen daher das bestehende Erscheinungsbild der Kirche. Eine neue Abschnittsvorlage braucht ihre Liste von Textfeldern in `SECTIONS` und ihren Baum in `buildTree`; der Komponententest durchläuft jede Vorlage und prüft den Baum.

**Eingaben.** Der Text darf nur Tatsachen aus zwei Quellen nennen: dem, was der Benutzer eingegeben hat, und `churchContext.facts` -- Angaben, die B1Admin vor der Planung sammelt (öffentliche Gottesdienstzeiten und öffentliche Gruppennamen sowie Name und Adresse der Kirche). Dieselben Kennzeichen steuern die Vorlagen mit Daten: `times` rendert das Live-Element `serviceTimes`, wenn die Kirche Gottesdienstzeiten in B1 pflegt (sonst eine geschriebene Tabelle), und `groups` sowie `countdown` werden nur angeboten, wenn Daten dahinter stehen. JEV-Aufrufe sind abgesichert: Ein Duplikat startet nach 1,5 s, und die erste Antwort gewinnt, weil das Gateway gelegentlich hängt und die Aufrufe nahezu kostenlos sind.

**Beim Thema bleiben.** Die Anfrage des Benutzers ist das *Thema der Seite* und keine Hintergrundinformation über die Kirche. `planPage` ordnet die Anfrage ein (`home`, `visit`, `about`, `ministries`, `give`, `contact`, `event`, `topic`). Bei den Seitentypen `event` und `topic` werden die allgemeinen Vorlagen für Kirchen (Notiz des Pastors, Predigten, Dienste, Gruppen, gesellschaftliches Engagement, wöchentliche Zeiten und Countdown, Video-Kopf) nicht einmal angeboten, dafür `details` (Wann / Wo / Was mitbringen) und ein Datums-Countdown `eventCountdown`. Beide Bewerter prüfen die Thementreue. B1Admin übergibt `pageType` aus dem Plan an jeden Aufruf von `writePage`.

**Vollständige Seiten aus kurzen Anfragen.** Seiten haben drei bis sechs mittlere Abschnitte, großzügige Textlängen, eine Einleitung bei Kartenabschnitten und einen FAQ mit fünf Fragen; der Reparaturschritt erweitert jeden Abschnitt, der dünn ausfällt. Die Erzeugung ist ein Klick: Es gibt keine Rückfragen. Fehlt in der Anfrage eine gewöhnliche Angabe, die eine vollständige Seite braucht (eine Startzeit, ein Raum, was mitzubringen ist, wie man sich anmeldet), füllt der Textschreiber sie mit einer plausiblen, schlichten Wahl aus, die die Kirche anpassen kann. Da Abschnitte parallel geschrieben werden, werden diese Lücken **einmal** in `planPage` entschieden (`assumedDetails`, ein kleiner Aufruf des Textschreibers, der parallel zur Auswahl der Layouts läuft) und über `churchContext.assumedDetails` in jeden Aufruf von `writePage` gegeben. So kann ein Abschnitt nicht 17:00 sagen, während ein anderer 17:30 sagt. JEV korrigiert jeden Abschnitt, der der Anfrage, den Unterlagen der Kirche oder diesen festgelegten Angaben widerspricht. Die festgelegten Angaben werden in der Oberfläche nicht gezeigt; die Kirche prüft und bearbeitet die Seite wie jede andere. Manches wird nie erfunden: Namen von Personen, Telefonnummern, E-Mail- und Webadressen, Preise, Statistiken, die Geschichte der Kirche, Zitate, die Personen zugeschrieben werden, und ein Wochentag für ein Datum, für das die Anfrage keinen angibt.

**Visuelles.** Vorlagen benennen ihre Fotos und Symbole nie. Sie lassen Plätze offen, und ein allgemeiner Durchlauf (`visualSlots` → `pickVisuals` → `applyVisuals` in `SiteGenHelper`) geht den fertigen Baum ab und füllt jeden davon: einen Abschnittshintergrund oder einen Galerieeintrag mit der Markierung `auto:photo`, ein `auto:icon`, den Formteiler des Kopfes `auto:divider` und, ganz ohne Markierung, jedes Element `textWithPhoto`, `card` oder `image`, dessen `photo` leer ist. JEV wählt jedes Motiv aus dem Text daneben (das Foto einer Karte aus deren Titel und Text, ein Hintergrund aus dem Text des Abschnitts), wobei auf einer Seite kein Motiv doppelt vorkommt. Eine neue Vorlage bekommt daher Fotos ohne weiteres Zutun. Fotos sind Suchbegriffe für Pexels, ausgegeben als Platzhalter `pexels:<term>`, die B1Admin über `POST /content/stock/search` auflöst. Ein Client, der `resolvesPhotos` nicht sendet, erhält ein eingebautes Titelbild, flächige Farbbänder und Karten ohne Foto. Bewusst gibt es keine Motive mit Porträts, und die Pastorenvorlage hat kein Foto: Ein Stockfoto eines Fremden darf nie für eine echte Person stehen. Für eine Kirche ohne Seiten wendet B1Admin `suggestedStyle` auf die globalen Stile an; bestehende Websites behalten ihr Aussehen.

### Weitere Endpunkte

:::info
Die Schaltfläche `SectionToolbar` zum Umschreiben und die Schaltfläche **Website erzeugen** in der Seitenliste von B1Admin sind clientseitig weiterhin auskommentiert. Die folgenden AskApi-Endpunkte antworten dennoch; nur die Oberfläche dafür ist ausgeblendet.
:::

| Endpunkt | Zweck |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | Der ursprüngliche zweistufige Ablauf für Seiten (Gliederung, dann je Abschnitt ein LLM-Aufruf, der Element-JSON ausgibt). Wegen der Kosten in B1Admin durch `planPage`/`writePage` ersetzt; für API-Nutzer beibehalten |
| `POST /website/generateSite` | Erzeugung ganzer Websites. **Bewusst zweiphasig**: Ein Aufruf mit `planOnly: true` liefert nur den Plan mit mehreren Seiten (ein schneller Modellaufruf); danach fordert der Client den vollständigen Inhalt an -- so bleibt jede Anfrage innerhalb der Zeitgrenze von Lambda/API Gateway |
| `POST /website/rewriteSection` | Umschreiben unter Erhalt der Struktur: Das Modell darf nur Antworten mit Text ändern. Eine rekursive Strukturkennung (IDs, Typen, Reihenfolge) wird vor und nach dem Lauf verglichen; jede Abweichung liefert den ursprünglichen Abschnitt mit `fallback: true` zurück, statt eine beschädigte Struktur zu liefern |
| `POST /website/generateAltText` | Bildauswertung über bis zu 20 Bild-URLs; liefert knappen Alternativtext (höchstens 125 Zeichen, Präfixe wie "Foto von" entfernt) |
| `POST /website/generateMetaDescription` | Eine SEO-Meta-Beschreibung (höchstens 155 Zeichen) aus dem Text der Seite -- verbunden mit der Schaltfläche Erzeugen in den Seiteneinstellungen von B1Admin |

Die Prompts für diese Endpunkte sind Markdown-Dateien unter `AskApi/config/instructions/`, darunter der Elementkatalog, aus dem das Modell erzeugt. Zwei Entwurfsentscheidungen halten diesen Katalog ehrlich: Der Client übergibt bei jeder Anfrage `availableElementTypes` (der Prompt darf nur Typen aus dieser Liste verwenden -- der Server hartcodiert nie die vollständige Menge), und das MCP-Werkzeug `describe_page_builder` der API enthält dieselbe Anleitung für KI-Agenten, die über [MCP](../api/mcp) arbeiten. Die Modelle sind Anthropic Claude über OpenRouter -- 3.5 Haiku für Abschnittsinhalte (wegen der Latenz), 3.5 Sonnet für Gliederungen, Site-Pläne und Bildauswertung --, mit einem Rückfall auf OpenAI, falls kein OpenRouter-Schlüssel konfiguriert ist.

## Konversationsformulare

Formulare (Modul Membership) erhielten einen Konversationsmodus, der auf Seiten im Stil einer Kontaktkarte zielt. Vier Spalten der Tabelle `forms` steuern ihn: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **Darstellung** — Die Komponente `FormSubmissionEdit` von apphelper wechselt zur Komponente `ConversationalForm` (eine Frage nach der anderen), wenn `displayMode` `conversational` ist; die Formularseite der B1App reicht den Modus durch. Die übermittelte Nutzlast ist in beiden Fällen dieselbe.
- **Person automatisch anlegen** — Bei einer Einreichung mit `autoCreatePerson` sucht `ConversationalFormHelper.findOrCreatePerson` per E-Mail (ohne Berücksichtigung der Groß-/Kleinschreibung) und legt andernfalls einen Haushalt und eine Person mit `membershipStatus: "Guest"` an; danach verknüpft es die Einreichung mit dieser Person.
- **Nachfass-E-Mail** — Sind Betreff und Text gesetzt, erhält der Absender eine vorlagenbasierte E-Mail (mit den Platzhaltern `{firstName}` / `{churchName}`) über den bestehenden Weg für Transaktions-E-Mails (`TransactionalEmailHelper`), nie über den Weg der Benachrichtigungsübersicht. Beide Nebenwirkungen sind nicht fatal: Ein Fehler verliert nie die Einreichung.

Die vier Felder werden heute über die API gesetzt; der Formular-Editor von B1Admin zeigt sie noch nicht an.

## Zwischenspeicher der öffentlichen Website

Der öffentliche Renderpfad von B1App speichert kirchengekennzeichnete Abrufe zwischen (`next: { revalidate: 300, tags: [sdSlug] }` in der Produktion; `0` in der Entwicklung). Dadurch kann eine Live-Seite bis zu fünf Minuten veraltet sein, nachdem das ContentApi geschrieben wurde. `POST /api/revalidate/{sdSlug}` in B1App ruft `revalidateTag(sdSlug)` auf und ist der einzige Weg, den Zwischenspeicher vorzeitig zu leeren.

Zwei Schreiber lösen das aus:

1. **B1Admin** — `clearSiteCache()` in `B1Admin/src/site/siteCache.ts` sendet nach Speichervorgängen im Editor eine Anfrage. Sie bevorzugt die Subdomain der aktiven Site (eine sekundäre Site muss *ihr* Tag leeren, nicht das der Kirche).
2. **Api** — Änderungen am Inhalt, die nicht über B1Admin laufen (API-Schlüssel, MCP, KI), lösen aus den Inhalts-Controllern `SiteCacheHelper.bump(churchId)` aus. Die Hilfsfunktion löst die Subdomain der Kirche über `SubDomainHelper` auf und sendet `{b1AppRoot}/api/revalidate/{sd}`. Fehler werden verschluckt, damit eine nicht erreichbare B1App kein Speichern scheitern lässt.

Die Controller, die einen Stoß auslösen: Seiten (Speichern, Löschen, Duplizieren, Veröffentlichen, Verwerfen, Zurückziehen, KI-Entwurf), Abschnitte, Elemente, Blöcke, Links, globale Stile, Beiträge und Weiterleitungen. `b1AppRoot` in der Entwicklung ist `http://{subdomain}.localtest.me:3301`; Demo und Produktion verwenden `https://{subdomain}.b1.church`.

## Verwandte Seiten

- [Website-Routing & Mehrere Sites](./websites) — wie eine Anfrage einer Kirche bzw. Site zugeordnet wird und wie eigene Domains geleitet werden
- [Content-Endpunkte](../api/endpoints/content) — vollständige REST-Schnittstelle für Seiten, Abschnitte, Elemente, Blöcke, Beiträge, Weiterleitungen und Einstellungen
- [AppHelper](../shared-libraries/app-helper) — das npm-Paket mit den Renderern, der Registrierung, den Formteilern und Widgets
- [MCP-Server](../api/mcp) — einschließlich des Anleitungswerkzeugs `describe_page_builder`
- [Seiteneditor (für Endnutzer)](/docs/b1-admin/website/page-editor) — die Dokumentation des Editors für Mitarbeitende
