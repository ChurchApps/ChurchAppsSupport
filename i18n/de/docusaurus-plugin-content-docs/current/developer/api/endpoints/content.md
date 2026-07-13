---
title: "Content-Endpunkte"
---

# Content-Endpunkte

<div class="article-intro">

Das Content-Modul verwaltet Website-Seiten, Abschnitte, Elemente, Blöcke, Blog-Beiträge, Umleitungen, Predigten, Playlisten, Streaming-Services, Ereignisse, kuratierte Kalender, Dateien, Galerien, Bibelübersetzungen und Versesuche, Lieder, Arrangements, globale Stile, Fotos und Einstellungen. Es ist das größte Modul der API und betreibt CMS, Medien/Streaming, Worship-Planung und Bibelmerkmale auf allen ChurchApps-Anwendungen.

</div>

**Basispfad:** `/content`

## Seiten

Basispfad: `/content/pages`

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Public | — | Laden Sie den gesamten Seitenbaum (Abschnitte, Elemente, Blöcke) nach URL oder ID. Entfernt interne IDs bei URL-Abruf. URL-basierte Abrufe erzwingen `pages.visibility` — eine gesperrte Seite gibt `{ restricted: true, visibility }` zurück, sofern das optionale JWT das Gate erfüllt |
| GET | `/public/:churchId` | Public | — | Auflisten öffentlicher Seiten (`url`, `title`, `metaDescription`); nur `visibility = everyone` |
| GET | `/:id` | JWT | — | Eine Seite nach ID abrufen |
| GET | / | JWT | — | Auflisten aller Seiten für die Kirche |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplizieren Sie eine Seite mit allen Abschnitten und Elementen |
| POST | `/temp/ai` | JWT | Content.Edit | Speichern Sie eine KI-generierte Seite (Seite, Abschnitte und Elemente in einem Aufruf) |
| POST | / | JWT | Content.Edit | Erstellen oder aktualisieren Sie Seiten (Batch) |
| DELETE | `/:id` | JWT | Content.Edit | Löschen Sie eine Seite |

### Beispiel: Seitenbaum laden

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

## Abschnitte

Basispfad: `/content/sections`

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Einen Abschnitt nach ID abrufen |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Duplizieren Sie einen Abschnitt oder konvertieren Sie ihn in einen wiederverwendbaren Block |
| POST | / | JWT | Content.Edit | Erstellen oder aktualisieren Sie Abschnitte (Batch). Auto-Updates der Sortierreihenfolge |
| DELETE | `/:id` | JWT | Content.Edit | Löschen Sie einen Abschnitt (Auto-Updates der Sortierreihenfolge) |

## Elemente

Basispfad: `/content/elements`

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ein Element nach ID abrufen |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplizieren Sie ein Element mit all seinen Kindern |
| POST | / | JWT | Content.Edit | Erstellen oder aktualisieren Sie Elemente (Batch). Auto-verwaltet Zeilenspalten und Karussell-Folien |
| DELETE | `/:id` | JWT | Content.Edit | Löschen Sie ein Element |

## Blöcke

Basispfad: `/content/blocks`

Erweitert Standard-CRUD (GET `/:id`, GET /, POST /, DELETE `/:id` aus der Basisklasse mit Content.Edit-Berechtigung für Schreibvorgänge).

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Einen Block nach ID abrufen |
| GET | / | JWT | — | Auflisten aller Blöcke |
| GET | `/:churchId/tree/:id` | Public | — | Laden Sie den vollständigen Blockbaum mit Abschnitten und Elementen |
| GET | `/blockType/:blockType` | JWT | — | Laden Sie Blöcke nach Typ (z.B. footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Public | — | Laden Sie den Fußzeilenblock für eine Kirche |
| POST | / | JWT | Content.Edit | Erstellen oder aktualisieren Sie Blöcke |
| DELETE | `/:id` | JWT | Content.Edit | Löschen Sie einen Block |

## Links

Basispfad: `/content/links`

Erweitert Standard-CRUD (GET `/:id`, GET /, POST /, DELETE `/:id` aus der Basisklasse mit Content.Edit-Berechtigung für Schreibvorgänge).

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Einen Link nach ID abrufen |
| GET | / | JWT | — | Auflisten aller Links. Optionaler Filter `?category=`. Auto-Sortierung nach dem Speichern |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Laden Sie Links gefiltert nach Sichtbarkeit (Everyone, Visitors, Members, Staff, Groups) |
| GET | `/church/:churchId?category=` | Public | — | Laden Sie Links für eine Kirche nach Kategorie (öffentlich) |
| POST | / | JWT | Content.Edit | Erstellen oder aktualisieren Sie Links (Batch). Auto-Sortierung nach Kategorie |
| DELETE | `/:id` | JWT | Content.Edit | Löschen Sie einen Link |

## Globale Stile

Basispfad: `/content/globalStyles`

Erweitert Standard-CRUD (POST /, DELETE `/:id` aus der Basisklasse mit Content.Edit-Berechtigung für Schreibvorgänge).

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/church/:churchId` | Public | — | Laden Sie globale Stile für eine Kirche (gibt Standardwerte zurück, falls keine gesetzt) |
| GET | / | JWT | — | Laden Sie globale Stile für die authentifizierte Kirche |
| POST | / | JWT | Content.Edit | Erstellen oder aktualisieren Sie globale Stile |
| DELETE | `/:id` | JWT | Content.Edit | Löschen Sie globale Stile |

## Seitenverlauf

Basispfad: `/content/pageHistory`

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | Auflisten von Verlaufseinträgen für eine Seite |
| GET | `/block/:blockId` | JWT | Content.Edit | Auflisten von Verlaufseinträgen für einen Block |
| GET | `/:id` | JWT | Content.Edit | Einen Verlaufseintrag nach ID abrufen |
| POST | / | JWT | Content.Edit | Speichern Sie einen Seiten-/Block-Snapshot. Bereinigt regelmäßig Einträge älter als 30 Tage |
| POST | `/restore/:id` | JWT | Content.Edit | Stellen Sie eine Seite/einen Block aus einem Verlaufs-Snapshot wieder her (löscht aktuellen Inhalt und erstellt aus Snapshot neu) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Wiederherstellen aus einem Inline-Snapshot-Objekt. Body: `{ pageId, blockId, snapshot }` |

## Beiträge (Blog)

Basispfad: `/content/posts`

Blog-Beiträge sind Metadaten über reguläre Seiten: Jeder `pageId` eines Beitrags referenziert die Seite, die den Body enthält, und die Beitragszeile fügt `title`, `slug` (eindeutig pro Kirche), `excerpt`, `authorId`, `photoUrl`, `publishDate`, `category` und `tags` hinzu. Ein Beitrag wird veröffentlicht, sobald `publishDate` gesetzt und in der Vergangenheit liegt. Siehe [Website-Builder-Architektur](../../architecture/website-builder#blog-posts-over-pages).

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Public | — | Auflisten veröffentlichter Beiträge, paginiert (max. 50 pro Seite) |
| GET | `/public/:churchId/slug/:slug` | Public | — | Abrufen der Metadaten eines veröffentlichten Beitrags nach Slug |
| GET | `/rss/:churchId?siteUrl=` | Public | — | RSS 2.0-Feed veröffentlichter Beiträge (Links erstellt als `{siteUrl}/blog/{slug}`) |
| GET | `/:id` | JWT | — | Einen Beitrag nach ID abrufen |
| GET | / | JWT | — | Auflisten aller Beiträge für die Kirche |
| POST | / | JWT | Content.Edit | Erstellen oder aktualisieren Sie Beiträge (Batch) |
| DELETE | `/:id` | JWT | Content.Edit | Löschen Sie einen Beitrag |

## Umleitungen

Basispfad: `/content/redirects`

Pro-Kirchen-URL-Umleitungen (`fromPath` → `toPath`), begrenzt auf 200 pro Kirche. Pfade werden normalisiert (kleingeschrieben, führender Schrägstrich, kein abschließender Schrägstrich) und `fromPath` ist eindeutig pro Kirche. B1App löst diese bei 404ern auf und gibt einen HTTP 308 aus.

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?path=` | Public | — | Einen Pfad auflösen (oder alle Umleitungen auflisten, wenn `path` weggelassen wird) |
| GET | `/:id` | JWT | — | Eine Umleitung nach ID abrufen |
| GET | / | JWT | — | Auflisten aller Umleitungen für die Kirche |
| POST | / | JWT | Content.Edit | Erstellen oder aktualisieren Sie Umleitungen. Lehnt `fromPath = toPath` ab und erzwingt die 200-Zeilen-Grenze |
| DELETE | `/:id` | JWT | Content.Edit | Löschen Sie eine Umleitung |

## Predigten

Basispfad: `/content/sermons`

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | Abrufen einer Beispiel-FreeShow-Playlist-Struktur |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Abrufen des TV-App-Wrapper mit Predigt-, Unterrichts- und FreeShow-Quellen |
| GET | `/public/tvFeed/:churchId/:sermonId` | Public | — | Abrufen einer einzelnen Predigt als TV-Feed-Playlist |
| GET | `/public/tvFeed/:churchId` | Public | — | Abrufen aller öffentlichen Playlisten/Predigten als TV-Feed |
| GET | `/public/:churchId` | Public | — | Auflisten aller öffentlichen Predigten für eine Kirche |
| GET | `/timeline?sermonIds=` | JWT | — | Laden Sie Zeitdaten für Predigten |
| GET | `/lookup?videoType=&videoData=` | Public | — | Metadaten von YouTube oder Vimeo auflösen |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Generieren Sie KI-Vorschläge für Social-Media-Beiträge aus Predigt-Untertiteln |
| GET | `/outline?url=&title=&author=` | JWT | — | Generieren Sie eine KI-Unterrichtsgliederung aus einer URL |
| GET | `/youtubeImport/:channelId` | JWT | — | Importieren Sie Videos aus einem YouTube-Kanal |
| GET | `/vimeoImport/:channelId` | JWT | — | Importieren Sie Videos aus einem Vimeo-Kanal |
| GET | `/:id` | JWT | — | Eine Predigt nach ID abrufen |
| GET | / | JWT | — | Auflisten aller Predigten |
| POST | / | JWT | StreamingServices.Edit | Erstellen oder aktualisieren Sie Predigten (Batch, unterstützt Base64-Thumbnail-Upload) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Löschen Sie eine Predigt |

### Beispiel: Suchen Sie eine YouTube-Predigt

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

## Playlisten

Basispfad: `/content/playlists`

Erweitert Standard-CRUD (GET `/:id`, GET /, DELETE `/:id` aus der Basisklasse mit StreamingServices.Edit-Berechtigung für Schreibvorgänge).

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Eine Playlist nach ID abrufen |
| GET | / | JWT | — | Auflisten aller Playlisten |
| GET | `/public/:churchId` | Public | — | Auflisten aller öffentlichen Playlisten für eine Kirche |
| POST | / | JWT | StreamingServices.Edit | Erstellen oder aktualisieren Sie Playlisten (Batch, unterstützt Base64-Thumbnail-Upload) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Löschen Sie eine Playlist |

## Streaming-Services

Basispfad: `/content/streamingServices`

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Abrufen der verschlüsselten Host-Chat-Raum-ID für einen Service |
| GET | / | JWT | — | Auflisten aller Streaming-Services. Auto-bereinigt abgelaufene nicht wiederkehrende Services und erweitert wiederkehrende |
| POST | / | JWT | StreamingServices.Edit | Erstellen oder aktualisieren Sie Streaming-Services (Batch) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Löschen Sie einen Streaming-Service (löscht auch blockierte IPs) |

## Ereignisse

Basispfad: `/content/events`

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Laden Sie Zeitereignisse für eine Gruppe |
| GET | `/timeline?eventIds=` | JWT | — | Laden Sie Zeitereignisse für die Gruppen des aktuellen Benutzers |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Public | — | Abonnieren Sie Ereignisse als ICS-Kalender-Feed |
| GET | `/group/:groupId` | JWT | — | Abrufen von Ereignissen für eine Gruppe (einschließlich Ausnahmedaten) |
| GET | `/public/group/:churchId/:groupId` | Public | — | Abrufen öffentlicher Ereignisse für eine Gruppe |
| GET | `/:id` | JWT | — | Ein Ereignis nach ID abrufen |
| POST | / | JWT | — | Erstellen oder aktualisieren Sie Ereignisse (Batch) |
| DELETE | `/:id` | JWT | Content.Edit | Löschen Sie ein Ereignis |

## Ereignisausnahmen

Basispfad: `/content/eventExceptions`

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Eine Ereignisausnahme nach ID abrufen |
| POST | / | JWT | Content.Edit | Erstellen oder aktualisieren Sie Ereignisausnahmen (Batch) |
| DELETE | `/:id` | JWT | Content.Edit | Löschen Sie eine Ereignisausnahme |

## Kuratierte Kalender

Basispfad: `/content/curatedCalendars`

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Einen kuratierten Kalender nach ID abrufen |
| GET | / | JWT | — | Auflisten aller kuratierten Kalender |
| POST | / | JWT | Content.Edit | Erstellen oder aktualisieren Sie kuratierte Kalender (Batch) |
| DELETE | `/:id` | JWT | Content.Edit | Löschen Sie einen kuratierten Kalender |

## Kuratierte Ereignisse

Basispfad: `/content/curatedEvents`

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Abrufen kuratierter Ereignisse für einen Kalender (einschließlich Ereignisdetails und Ausnahmedaten, sofern `?withoutEvents` nicht gesetzt) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Public | — | Abrufen öffentlich kuratierter Ereignisse für einen Kalender |
| GET | `/:id` | JWT | — | Ein kuriertes Ereignis nach ID abrufen |
| GET | / | JWT | — | Auflisten aller kuratierten Ereignisse |
| POST | / | JWT | Content.Edit | Erstellen oder aktualisieren Sie kuratierte Ereignisse. Unterstützt `eventIds`-Array zum Hinzufügen spezifischer Gruppenereignisse |
| DELETE | `/:id` | JWT | Content.Edit | Löschen Sie ein kuriertes Ereignis |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Entfernen Sie ein spezifisches Ereignis aus einem kuratierten Kalender |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Entfernen Sie alle Ereignisse für eine Gruppe aus einem kuratierten Kalender |

## Dateien

Basispfad: `/content/files`

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | Abrufen von Dateien nach Inhaltstyp und Inhalts-ID |
| GET | / | JWT | — | Auflisten aller Dateien für die Kirchen-Website |
| GET | `/:id` | JWT | — | Eine Datei nach ID abrufen |
| POST | / | JWT | Content.Edit* | Hochladen von Dateien (Base64). *Auch erlaubt, wenn der Benutzer Mitglied der Gruppe ist, die `contentId` entspricht |
| POST | `/postUrl` | JWT | Content.Edit* | Abrufen einer vorab signierten S3-Upload-URL. *Auch für Gruppenmitglieder zulässig. Max. 100 MB pro Inhaltsgegenstand |
| DELETE | `/:id` | JWT | Content.Edit* | Löschen Sie eine Datei und entfernen Sie sie aus dem Speicher. *Auch für Gruppenmitglieder zulässig |

## Galerie

Basispfad: `/content/gallery`

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/stock/:folder` | Public | — | Auflisten von Fotos in einem Ordner |
| GET | `/:folder` | JWT | Content.Edit | Auflisten von Galerie-Bildern in einem Ordner |
| POST | `/requestUpload` | JWT | Content.Edit | Abrufen einer vorab signierten S3-Upload-URL für ein Galerie-Bild |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Löschen Sie ein Galerie-Bild |

## Bibeln

Basispfad: `/content/bibles`

Alle Bibelendpunkte sind öffentlich (keine Authentifizierung erforderlich). Daten werden aus externen Quellen abgerufen und lokal zwischengespeichert.

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | / | Public | — | Auflisten aller Bibelübersetzungen (ruft die Quelle ab, wenn der Cache leer ist) |
| GET | `/stats?startDate=&endDate=` | Public | — | Abrufen von Bibelsuchen-Statistiken für einen Datumsbereich |
| GET | `/availableTranslations/:source` | Public | — | Auflisten verfügbarer Übersetzungen aus einer Quelle (z.B. api.bible) |
| GET | `/updateTranslations` | Public | — | Synchronisieren aller Übersetzungen aus allen Quellen |
| GET | `/updateTranslations/:source` | Public | — | Synchronisieren von Übersetzungen aus einer bestimmten Quelle |
| GET | `/updateCopyrights` | Public | — | Aktualisieren der Copyright-Informationen für Übersetzungen, denen diese fehlen |
| GET | `/:translationKey/updateCopyright` | Public | — | Aktualisieren des Copyrights für eine bestimmte Übersetzung |
| GET | `/:translationKey/search?query=&limit=` | Public | — | Suchen Sie Verse in einer Übersetzung |
| GET | `/:translationKey/books` | Public | — | Abrufen von Büchern für eine Übersetzung (lokal zwischengespeichert) |
| GET | `/:translationKey/:bookKey/chapters` | Public | — | Abrufen von Kapiteln für ein Buch (lokal zwischengespeichert) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Public | — | Abrufen von Versen für ein Kapitel (lokal zwischengespeichert) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Public | — | Abrufen des Verstexts für einen Bereich. Protokollsuchen. Einige Übersetzungen umgehen das Caching aus Lizenzgründen |

### Beispiel: Verstetext abrufen

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

## Lieder

Basispfad: `/content/songs`

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/search?q=` | JWT | — | Suchen Sie Lieder nach Abfrage |
| GET | `/:id` | JWT | — | Ein Lied nach ID abrufen |
| GET | / | JWT | Content.Edit | Auflisten aller Lieder |
| POST | / | JWT | Content.Edit | Erstellen oder aktualisieren Sie Lieder (Batch) |
| POST | `/import` | JWT | — | Importieren Sie Lieder von FreeShow (Batch) |
| DELETE | `/:id` | JWT | Content.Edit | Löschen Sie ein Lied |

## Lieddetails

Basispfad: `/content/songDetails`

Lieddetails sind global (nicht kirchengebunden). Diese repräsentieren kanonische Liedmetadaten, die von Kirchen gemeinsam genutzt werden.

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ein Lieddetail nach ID abrufen (global) |
| GET | / | JWT | — | Auflisten von Lieddetails für die Kirche |
| POST | `/create` | JWT | — | Erstellen Sie ein Lieddetail aus einer PraiseCharts-ID (gibt das Vorhandene zurück, falls bereits erstellt). Auto-Abrufen von Metadaten aus PraiseCharts und MusicBrainz |
| POST | / | JWT | — | Erstellen oder aktualisieren Sie Lieddetails (Batch) |

## Lieddetail-Links

Basispfad: `/content/songDetailLinks`

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Einen Lieddetail-Link nach ID abrufen |
| GET | `/songDetail/:songDetailId` | JWT | — | Abrufen aller Links für ein Lieddetail |
| POST | / | JWT | — | Erstellen oder aktualisieren Sie Lieddetail-Links (Batch). Auto-Abrufen von MusicBrainz-Daten bei Verknüpfung |
| DELETE | `/:id` | JWT | — | Löschen Sie einen Lieddetail-Link |

## Arrangements

Basispfad: `/content/arrangements`

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ein Arrangement nach ID abrufen |
| GET | `/song/:songId` | JWT | Content.Edit | Abrufen von Arrangements für ein Lied |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Abrufen von Arrangements für ein Lieddetail |
| GET | / | JWT | Content.Edit | Auflisten aller Arrangements |
| POST | / | JWT | Content.Edit | Erstellen oder aktualisieren Sie Arrangements (Batch) |
| POST | `/freeShow/missing` | JWT | — | Suchen Sie FreeShow-IDs, die nicht in der Kirche vorhanden sind. Body: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Löschen Sie ein Arrangement (löscht auch Tasten; löscht das Lied, wenn keine Arrangements verbleiben) |

## Arrangement-Tasten

Basispfad: `/content/arrangementKeys`

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:id` | Public | — | Abrufen der Arrangement-Taste mit vollständigen Lied-Daten für die Presenter-Ansicht |
| GET | `/:id` | JWT | — | Eine Arrangement-Taste nach ID abrufen |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Abrufen von Tasten für ein Arrangement |
| GET | / | JWT | Content.Edit | Auflisten aller Arrangement-Tasten |
| POST | / | JWT | Content.Edit | Erstellen oder aktualisieren Sie Arrangement-Tasten (Batch) |
| DELETE | `/:id` | JWT | Content.Edit | Löschen Sie eine Arrangement-Taste |

## Einstellungen

Basispfad: `/content/settings`

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Abrufen von Einstellungen des aktuellen Benutzers |
| GET | / | JWT | Settings.Edit | Abrufen aller Einstellungen für die Kirche |
| GET | `/public/:churchId` | Public | — | Abrufen öffentlicher Einstellungen für eine Kirche (zurückgegeben als Schlüssel-Wert-Paare) |
| POST | `/my` | JWT | — | Speichern von Einstellungen auf Benutzerebene (unterstützt Base64-Bild-Upload) |
| POST | / | JWT | Settings.Edit | Speichern von Einstellungen auf Kirchenebene (unterstützt Base64-Bild-Upload) |
| DELETE | `/my/:id` | JWT | — | Löschen Sie eine Benutzereinstellung |

## Vorschau

Basispfad: `/content/preview`

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/data/:key` | Public | — | Laden Sie Streaming-Vorschaudaten für eine Kirche nach Subdomain-Schlüssel (Registerkarten, Links, Services, Predigten) |

## Galerie (Fotos)

Basispfad: `/content/stock`

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/search` | Public | — | Suchen Sie Pexels-Fotos. Body: `{ term: "church" }` |

## PraiseCharts

Basispfad: `/content/praiseCharts`

Integration mit PraiseCharts zur Entdeckung von Worship-Liedern und zum Download von Noten.

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/raw/:id` | JWT | — | Abrufen roher PraiseCharts-Daten für ein Lied |
| GET | `/hasAccount` | JWT | — | Überprüfen Sie, ob der Benutzer ein verknüpftes PraiseCharts-Konto hat |
| GET | `/search?q=` | JWT | — | Suchen Sie den PraiseCharts-Katalog |
| GET | `/products/:id?keys=` | JWT | — | Abrufen von Produkten für ein Lied (aus der Bibliothek, falls authentifiziert, andernfalls Katalog) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Abrufen von rohen Arrangement-Daten aus der Bibliothek |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Laden Sie eine Datei von PraiseCharts herunter (PDF oder ZIP). Gibt `{ redirectUrl }` zurück |
| GET | `/authUrl?returnUrl=` | Public | — | Abrufen der OAuth-Autorisierungs-URL für PraiseCharts |
| GET | `/access?verifier=&token=&secret=` | JWT | — | OAuth-Verifier gegen Zugriffstoken austauschen und in Benutzereinstellungen speichern |
| GET | `/library` | JWT | — | Durchsuchen Sie die PraiseCharts-Bibliothek des Benutzers |

## Unterstützung

Basispfad: `/content/support`

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/createAudio` | Public | — | Konvertieren Sie SSML in MP3-Audio mit AWS Polly. Body: `{ ssml: "<speak>...</speak>" }` |

## Verwandte Seiten

- [Website-Builder-Architektur](../../architecture/website-builder) -- Wie Seiten, Abschnitte, Elemente, Beiträge und Umleitungen auf den Apps zusammenpassen
- [Membership-Endpunkte](./membership) -- Personen, Kirchen, Gruppen, Rollen, Berechtigungen
- [Attendance-Endpunkte](./attendance) -- Dienst- und Besuchsverfolgung
- [Authentifizierung & Berechtigungen](./authentication) -- Anmeldefluss, JWT, Berechtigungsmodell
- [Modulstruktur](../module-structure) -- Codeorganisationsmuster
