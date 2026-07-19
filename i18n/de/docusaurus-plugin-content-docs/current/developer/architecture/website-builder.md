---
title: "Website-Builder-Architektur"
---

# Website-Builder-Architektur

<div class="article-intro">

Jede von B1App bereitgestellte Kirchen-Website wird aus einem Content-Baum gerendert — Seiten, Abschnitte, Elemente —, der in der ContentApi gespeichert und in B1Admin visuell bearbeitet wird. Eine gemeinsame Komponentenbibliothek rendert sowohl die Editor-Vorschau als auch die Live-Site, ein Element-Typ-Katalog definiert, was auf einer Seite erscheinen kann, und ein separater KI-Service kann diesen Baum generieren oder umschreiben. Diese Seite bildet den gesamten Stack ab: den Element-Vertrag in `@churchapps/helpers`, die Render-Pipeline, Kirchendaten-Elemente, siteweite Widgets, die Blog-Schicht, zugangsgesperrte Seiten, SEO, KI-Generierung und Konversationsformulare.

</div>

## Überblick

```
┌──────────────────────────────┐             ┌─────────────────────────────────────────┐
│  B1Admin — Editor             │             │  Api — /content-Modul (ContentApi)      │
│  ContentEditor · SectionEdit │  POST /…    │                                         │
│  ElementEdit · PageLinkEdit  │ ──────────▶ │  pages ─ sections ─ elements   blocks   │
│  SiteWidgetsEdit · Blog      │             │  posts   redirects   settings   styles  │
└──────────┬───────────────────┘             └───────────────┬─────────────────────────┘
           │                                                 │ GET /content/pages/:churchId/tree?url=…
           │        gemeinsame Render-Pipeline                ▼            (anonym, JWT beachtet)
           │   ┌───────────────────────────────┐   ┌─────────────────────────────────┐
           └──▶│  @churchapps/helpers          │◀──│  B1App — öffentliche Site (Next.js) │
               │    ElementTypes.ts (Katalog)  │   │  Zone → Section → Element       │
               │  @churchapps/apphelper        │   │  + Widgets, JSON-LD, Sitemap,   │
               │    ElementRegistry, Renderer  │   │    Redirects, gebrandete 404    │
               │    SectionDivider, Widgets    │   └───────────────┬─────────────────┘
               └───────────────────────────────┘                   │ Kirchendaten-Elemente
┌──────────────────────────────┐                                   ▼
│  AskApi — /website/* (KI)    │             ┌─────────────────────────────────────────┐
│  generateSite · rewriteSection│            │  /giving/funds/public/…/total           │
│  generateAltText · metaDesc  │             │  /membership/groupmembers/public/…      │
│  gibt JSON zurück; B1Admin speichert │      │  /attendance/servicetimes/public/…      │
└──────────────────────────────┘             └─────────────────────────────────────────┘
```

Drei Regeln gelten durchgängig für den Stack:

1. **Ein Baum, zwei Renderer.** Eine Seite ist ein `pages → sections → elements`-Baum, bei dem jeder Knoten seine Einstellungen als `answers`-JSON-Blob trägt. Dieselben apphelper-Komponenten rendern sowohl den Drag-and-Drop-Editor in B1Admin als auch die serverseitig gerenderte öffentliche Site in B1App — es gibt kein separates „Veröffentlichungsformat“.
2. **Der Vertrag lebt in `@churchapps/helpers`.** `ElementTypes.ts` ist der einzige Katalog von Elementtypen; Renderer lösen sich über eine Registry in apphelper auf; Editor-Formulare leben in B1Admin. Einen Elementtyp hinzuzufügen bedeutet, alle drei anzufassen, in dieser Reihenfolge.
3. **Die öffentliche Site liest anonyme Endpunkte.** Alles, was B1App braucht — der Seitenbaum, Einstellungen, Blogbeiträge, Redirects und die Kirchendaten-Endpunkte in anderen Modulen — ist öffentlich. Auth ist optional: Ein JWT am anonymen Baum-Endpunkt schaltet nur die Mitglieder-only-Seiten frei, sonst ändert sich nichts.

## Der Content-Baum

Das Content-Modul (`Api/src/modules/content`) besitzt die Daten des Builders:

| Tabelle | Rolle |
|-------|------|
| `pages` | Eine Seite pro URL: `url`, `title`, `layout`, plus `visibility`/`groupIds` (Zugriffssperre) und `metaDescription` (SEO) |
| `sections` | Horizontale Bänder auf einer Seite (oder in einem Block): Hintergrund, Textfarbe und ein `answersJSON`, das Styling plus die Shape-Divider-Konfigurationen `dividerTop`/`dividerBottom` trägt |
| `elements` | Content-Stücke innerhalb eines Abschnitts: `elementType` + `answersJSON`, verschachtelbar für Layout-Typen (Zeile/Spalte, Karussell) |
| `blocks` | Wiederverwendbare Abschnitts-/Elementgruppen (Footer-Blöcke, Element-Blöcke), über Seiten hinweg geteilt |
| `posts` | Eigenständige Blogbeiträge (siehe [Blog](#blog)) |
| `redirects` | Per-Kirche `fromPath → toPath`-Paare, gedeckelt bei 200 (siehe [SEO](#seo-und-auffindbarkeit)) |
| `settings` | Schlüssel-Wert-Kircheneinstellungen; als `public` markierte Zeilen werden anonym bedient und tragen die Widget-/Analytics-Konfiguration |

Der gesamte Baum für eine URL kommt in einem einzigen anonymen Aufruf zurück — `GET /content/pages/:churchId/tree?url=/about` —, aus dem B1App serverseitig rendert. Editor-Anfragen holen stattdessen per ID und behalten interne IDs.

## Der Element-Vertrag

### Der Katalog (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` definiert jeden Elementtyp als `ElementTypeDefinition`: `elementType`, `label`, `category`, `schemaVersion`, `defaults` und ein JSON-Schema-artiges `answersSchema` für seine Antworten. `validateElementAnswers()` ist absichtlich nachsichtig — unbekannte Typen und zusätzliche Schlüssel werden durchgelassen, sodass alter Content bei einem Katalog-Upgrade nie bricht. **35 Typen werden heute ausgeliefert:**

| Kategorie | Elementtypen |
|----------|---------------|
| layout (6) | row, column, box, carousel, whiteSpace, block |
| content (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| media (4) | image, gallery, video, map |
| church (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| advanced (2) | rawHTML, iframe |

Das `sermons`-Element ist der konfigurierbarste der Kirchen-Typen: eine `layout`-Antwort wählt `browse` (der alte Voll-Browser), `grid`, `list` oder `featuredLatest`, wobei `playlistId`, `itemCount`, `showTitles` und `showDates` die Nicht-Browse-Layouts verfeinern.

### Renderer (`@churchapps/apphelper`)

Renderer leben in `Packages/apphelper/src/website/components/elementTypes/`, eine Komponente pro Typ, aufgelöst über `ElementRegistry.ts` — eine zweischichtige Map, in der `Element.tsx` den Standard-Renderer für alle 35 Typen registriert (`registerDefaultElementRenderer`) und eine Host-App jeden davon zur Laufzeit überschreiben kann (`registerElementRenderer`), ohne das Paket zu forken.

### Editor-Formulare (B1Admin)

Die per-Typ-Einstellungsformulare des Editors leben in `B1Admin/src/site/admin/elements/` — `ElementEdit.tsx` leitet an eine dedizierte Komponente weiter (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) oder an einen Inline-Feldgenerator pro Typ. Das KI-seitige Spiegelbild dieses Katalogs ist das MCP-Tool `describe_page_builder` der API (siehe [MCP-Server](../api/mcp)).

### Section-Shape-Dividers

Abschnitte können dekorative Shape-Dividers an beiden Kanten tragen. Die Konfiguration lebt im `answersJSON` des Abschnitts als `dividerTop`/`dividerBottom`-Objekte — `{ shape, color, height, flip }` mit `shape` als einem von `wave, waves, slant, curve, triangle, peaks`. Apphelper liefert die `SectionDivider`-Komponente und den `parseDividerConfig()`-Helper aus; die Section-Renderer beider Apps (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) parsen die Antworten und montieren den Divider, und `SectionEdit.tsx` in B1Admin liefert die Auswahl-UI. Die Pakete liefern nur den Baustein — die abschnittsseitige Verdrahtung ist Aufgabe der konsumierenden Apps.

## Kirchendaten-Elemente

Drei Elementtypen rendern Live-Kirchendaten statt verfasstem Content. Modulisolierung gilt weiterhin — jedes ruft aus dem Browser den eigenen öffentlichen Endpunkt des besitzenden Moduls auf:

| Element | Endpunkt | Anmerkungen |
|---------|----------|-------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Liefert `{ fundId, totalAmount, donationCount }`, optionales `?startDate=&endDate=`-Fenster; das Element vergleicht es mit seiner `goalAmount`-Antwort |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Nur Opt-in**: Die Gruppe muss `publicRoster` gesetzt haben (standardmäßig aus). Die Projektion ist absichtlich minimal — `personId`, `displayName`, `leader`, Foto — keine Kontakt- oder demografischen Felder |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Liefert den Campus → Service → Zeit-Baum; der apphelper-Renderer erzeugt daraus Best-Effort-schema.org-`Event`-JSON-LD (die API liefert reine Daten) |

:::warning
`publicRoster` ist das Datenschutz-Gate für `staffGrid`. Erweitern Sie niemals die öffentliche Gruppenmitglieder-Projektion und umgehen Sie niemals das Flag — der Roster-Endpunkt ist absichtlich anonym, und die minimale Feldliste ist die Sicherheitseigenschaft.
:::

## Siteweite Widgets

Zwei Widgets rendern auf jeder öffentlichen Seite statt innerhalb des Baums: **AnnouncementBanner** (schließbare Leiste am Seitenanfang) und **Launcher** (schwebender Aktions-Hub für Geben/Besuchen/Ansehen-artige Links). Beide Komponenten und ihre `parse*Config()`-Helper werden mit apphelper ausgeliefert. Die Konfiguration besteht aus zwei öffentlichen Einstellungszeilen — Schlüssel `announcementBanner` und `launcher` —, geschrieben von B1Admins `SiteWidgetsEdit` (auf der Erscheinungsbild-Seite) und gelesen vom öffentlichen Layout von B1App über `GET /content/settings/public/:churchId`. Die API behandelt diese als opake Schlüssel-Wert-Paare; die Schlüsselnamen sind eine Konvention zwischen den beiden Apps.

## Blog

Der Blog ist ein eigenständiger Content-Typ, keine Schicht über Builder-Seiten. Eine `posts`-Zeile enthält den ganzen Beitrag: `title`, `slug`, `excerpt`, `content` (Markdown-Body), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`. Öffentliche Oberfläche (alle anonym, `PostController`):

| Route | Zweck |
|-------|-------|
| `GET /content/posts/public/:churchId` | Veröffentlichte Beiträge, filterbar über `?category=&tag=`, paginiert |
| `GET /content/posts/public/:churchId/categories` | Eindeutige Kategorien über veröffentlichte Beiträge |
| `GET /content/posts/public/:churchId/slug/:slug` | Ein veröffentlichter Beitrag |
| `GET /content/posts/rss/:churchId?siteUrl=` | RSS-2.0-Feed, betitelt mit dem Kirchennamen, mit per-Item-Kategorie und Excerpt-oder-Content-Beschreibung |

Ein Beitrag ist „veröffentlicht“, sobald `publishDate` gesetzt ist und in der Vergangenheit liegt; ein zukünftiges `publishDate` ist ein geplanter Beitrag (öffentlich verborgen, im Admin mit einem Geplant-Chip angezeigt). Lese-Endpunkte reichern jeden Beitrag mit `authorName` an, aufgelöst aus `authorId` über das Membership-Modul-Gateway. Fehlende Excerpts fallen zurück auf bereinigten Markdown-Content (~160 Zeichen) in Listenkarten, Meta-Beschreibungen und RSS. B1App bedient `/{sdSlug}/blog` — eine redaktionelle Liste (zentrierte Überschrift, die bei Filterung zum Namen der aktiven Kategorie/des Tags wird, Kategorie-Chip-Filterzeile, Beitragszeilen mit Thumbnail links, Bylines und Excerpts) mit dem RSS-Feed als beworbenem Alternate-Link — sowie `/{sdSlug}/blog/[postSlug]`, eine dedizierte Route (nicht die Zone/Section-Pipeline) mit zentrierter Überschrift (Kategorie-Kicker, Titel, Byline, Akzentlinie in Primärfarbe), einem 16:9-Hero in Containerbreite, dem Markdown-Body in einer ~720px breiten Lesespalte, Tag-Chips im Artikel-Footer, einem „Mehr in {category}“-Streifen mit verwandten Beiträgen und `BlogPosting`-JSON-LD inklusive Autor. Beide Seiten stylen vollständig über Theme-Tokens, sodass sie die Palette jeder Kirche erben. Blog-URLs sind in der per-Kirche-Sitemap enthalten. B1Admins Autoren-UI (**Site → Blog**) bearbeitet Beiträge in einem Dialog: Markdown-Editor mit Vorschau-Umschalter, 16:9-zugeschnittener Galeriebild-Picker, Autor-Personen-Picker (standardmäßig der bearbeitende Benutzer), Kategorie-Autovervollständigung aus bestehenden Kategorien, Duplikat-Slug-Validierung und ein Veröffentlichen-Umschalter; veröffentlichte Zeilen verlinken zum Live-Beitrag, und die Seite stupst Admins an, einen `/blog`-Navigationslink hinzuzufügen.

## Mitglieder-only-Seiten

`pages.visibility` verwendet dieselbe Enumeration wie die Navigationslinks — `everyone` (Standard), `visitors`, `members`, `staff`, `team`, `groups` (mit `groupIds`) —, aber als **harte Zugriffssperre**, nicht als Nav-Filter (`PageVisibilityHelper.canViewPage`). Der Ablauf:

1. Der anonyme Baum-Endpunkt prüft die Sichtbarkeit bei URL-basierten Abrufen. Anonyme Aufrufer einer gesperrten Seite erhalten `{ restricted: true, visibility }` statt Content — der Baum leckt nie.
2. Der Endpunkt beachtet weiterhin ein JWT: `CustomAuthProvider` verifiziert den `Authorization`-Header bei *jeder* Anfrage, auch bei anonymen Routen, sodass der Abruf derselben URL durch ein authentifiziertes Mitglied normal aufgelöst wird.
3. B1App rendert `RestrictedPage` bei einer `restricted`-Antwort: Es hydratisiert die Session aus gespeicherten Anmeldedaten, holt den Baum mit dem JWT erneut und rendert ihn — oder zeigt ein Login-Gate mit einer `returnUrl`, wenn keine Session existiert.

:::info
Die Granularität des Gates variiert je nach Stufe: `groups` prüft die `groupIds` des Tokens gegen die Liste der Seite, und `staff` prüft `membershipStatus`, aber `members` und `team` lassen derzeit jeden authentifizierten Benutzer der Kirche durch. Betrachten Sie `groups` als die strikte Option.
:::

## SEO und Auffindbarkeit

Das alles ist B1App-seitiges Rendering über ContentApi-Daten — die API speichert, die App gibt aus:

| Belang | Wie es funktioniert |
|---------|--------------|
| Meta-Beschreibungen | `pages.metaDescription` (≤300 Zeichen) fließt über `MetaHelper.getMetaData()` in die Next.js-`Metadata` (Beschreibung + Open Graph) auf jeder Builder-gerenderten Route. B1Admins Seiteneinstellungen enthalten einen KI-„Generieren“-Button (siehe unten) |
| Redirects | Per-Kirche `redirects`-Zeilen, verwaltet unter `/content/redirects` (`content.edit`, 200-Zeilen-Deckel, normalisierte Pfade). Bei einem drohenden 404 löst B1Apps Seitenroute den Pfad gegen `GET /content/redirects/public/:churchId` auf und gibt über Nexts `permanentRedirect` einen HTTP 308 aus; nicht passende Pfade fallen durch zu `notFound()` |
| Gebrandete 404 | `not-found.tsx` rendert `BrandedNotFound` mit Logo, Name und Theme der Kirche statt eines generischen Fehlers |
| Strukturierte Daten | `BlogPosting`-JSON-LD auf Blogbeiträgen; `VideoObject` auf den per-Predigt-Seiten (`/{sdSlug}/sermons/[sermonId]`) und auf Seiten mit einem `sermons`-Element; `Event` aus Kalender-/Event-Elementen auf Builder-Seiten; schema.org-`Event` aus dem `serviceTimes`-Element |
| Predigt-Seiten | Jede öffentliche Predigt erhält eine crawlbare Seite unter `/sermons/[sermonId]` mit vollständigen Metadaten — Predigten sind nicht mehr im clientseitigen Browser-Element eingesperrt |
| Analytics | Der öffentliche Einstellungsschlüssel `ga4MeasurementId` (verwaltet neben Redirects in B1Admin) injiziert ein per-Kirche-GA4-gtag über `next/script` |
| Sitemap & Feeds | Die per-Kirche-`sitemap.xml`-Route enthält Builder-Seiten und Blog-URLs; die Blog-Liste bewirbt den RSS-Feed |
| Barrierefreiheit | Der öffentliche Chrome rendert einen Skip-Link, der auf das `<main id="main-content">`-Landmark in jedem Layout-Wrapper zielt |

## KI-Generierung (AskApi)

Seiten- und Site-Generierung läuft in **AskApi**, einem separaten Service, unter dem `/website`-Controller. Sie authentifiziert sich mit demselben `CustomAuthProvider`-JWT wie alles andere und ist **zustandslos in Bezug auf Content**: Jeder Endpunkt gibt JSON zurück, und der Aufrufer (B1Admin) persistiert das Ergebnis über ContentApi (`POST /content/pages/temp/ai` speichert ein generiertes Seiten-Abschnitte-Elemente-Bündel in einem Aufruf).

:::info
Stand 2026-07-03 sind B1Admins Einstiegspunkte in diese Pipeline — die Site-„KI“-Vorlage in `AddPageModal`, der Umschreiben-Button in `SectionToolbar` und der „Site generieren“-Button in der Seitenliste — clientseitig auskommentiert, während das Feature überarbeitet wird. Die AskApi-Endpunkte unten sind davon unbetroffen und antworten weiterhin; nur die B1Admin-UI ist ausgeblendet.
:::

| Endpunkt | Zweck |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | Der ursprüngliche Zwei-Schritt-Seitenfluss: erst Gliederung, dann ein Aufruf pro Abschnitt. B1Admins „KI“-Seitenvorlage in `AddPageModal` steuert dies — Gliederung, dann parallele Abschnittsgenerierung, dann Vorschau |
| `POST /website/generateSite` | Ganze-Site-Generierung. **Zweiphasig by Design**: Ein Aufruf mit `planOnly: true` liefert nur den mehrseitigen Plan (ein schneller Modellaufruf), dann fordert der Client den vollständigen Content an — hält so jede Anfrage innerhalb des Lambda-/API-Gateway-Timeouts |
| `POST /website/rewriteSection` | Struktur-erhaltendes Umschreiben: Das Modell darf nur textbasierte Antworten ändern. Eine rekursive Struktursignatur (IDs + Typen + Reihenfolge) wird vorher und nachher verglichen; jede Abweichung gibt den Originalabschnitt mit `fallback: true` zurück statt beschädigter Struktur |
| `POST /website/generateAltText` | Vision-Aufruf über bis zu 20 Bild-URLs; liefert prägnanten Alt-Text (≤125 Zeichen, „Foto von“-Präfixe entfernt) |
| `POST /website/generateMetaDescription` | Eine SEO-Meta-Beschreibung (≤155 Zeichen) aus dem Textinhalt der Seite — verdrahtet mit dem Generieren-Button in B1Admins Seiteneinstellungen |

Prompts sind Markdown-Dateien unter `AskApi/config/instructions/`, einschließlich des Element-Katalogs, aus dem das Modell generiert. Zwei Design-Punkte halten den Katalog ehrlich: Der Client übergibt `availableElementTypes` bei jeder Anfrage (der Prompt darf nur Typen aus dieser Liste verwenden — der Server hartcodiert nie den vollständigen Satz), und das MCP-Tool `describe_page_builder` der API trägt denselben Leitfaden für KI-Agenten, die über [MCP](../api/mcp) arbeiten. Modelle sind Anthropic Claude über OpenRouter — 3.5 Haiku für Abschnitts-Content (Latenz), 3.5 Sonnet für Gliederungen, Site-Pläne und Vision — mit einem OpenAI-Fallback, wenn kein OpenRouter-Schlüssel konfiguriert ist.

## Konversationsformulare

Formulare (Membership-Modul) haben einen konversationellen Modus erhalten, der auf Connect-Card-artige Seiten abzielt. Vier Spalten auf `forms` steuern das: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **Rendering** — apphelpers `FormSubmissionEdit` wechselt zur `ConversationalForm`-Komponente (eine Frage nach der anderen), wenn `displayMode` auf `conversational` steht; B1Apps Formularseite reicht den Modus durch. In beiden Fällen dasselbe Übermittlungs-Payload.
- **Person automatisch erstellen** — bei Übermittlung mit gesetztem `autoCreatePerson` dedupliziert `ConversationalFormHelper.findOrCreatePerson` per E-Mail (Groß-/Kleinschreibung ignorierend) und erstellt andernfalls einen Haushalt + eine Person mit `membershipStatus: "Guest"`, verknüpft dann die Übermittlung mit dieser Person.
- **Follow-up-E-Mail** — wenn Betreff und Body gesetzt sind, erhält der Absender eine templated E-Mail (mit `{firstName}`/`{churchName}`-Tokens) über den bestehenden transaktionalen Pfad (`TransactionalEmailHelper`), niemals über die Benachrichtigungs-Digest-Tür. Beide Nebeneffekte sind nicht-fatal: Ein Fehlschlag verliert nie die Übermittlung.

Die vier Felder werden heute über die API gesetzt; der B1Admin-Formular-Editor legt sie noch nicht offen.

## Verwandte Seiten

- [Website-Routing & Multi-Site](./websites) — wie eine Anfrage zu einer Kirche/Site aufgelöst wird und wie eigene Domains routen
- [Content-Endpunkte](../api/endpoints/content) — vollständige REST-Oberfläche für Seiten, Abschnitte, Elemente, Blöcke, Beiträge, Redirects und Einstellungen
- [AppHelper](../shared-libraries/app-helper) — das npm-Paket, das die Renderer, Registry, Divider und Widgets ausliefert
- [MCP-Server](../api/mcp) — einschließlich des `describe_page_builder`-Leitfaden-Tools
- [Seiten-Editor (Endbenutzer)](/docs/b1-admin/website/page-editor) — die mitarbeiterseitige Editor-Dokumentation
