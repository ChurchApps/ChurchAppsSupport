---
title: "Content-Endpunkte"
---

# Content-Endpunkte

<div class="article-intro">

Das Content-Modul verwaltet Website-Seiten, Abschnitte, Elemente, Blöcke, Blogbeiträge, Weiterleitungen, Predigten, Playlists, Streaming-Dienste, Termine, kuratierte Kalender, Dateien, Galerien, Bibelübersetzungen und Versnachschlagewerke, Songs, Arrangements, globale Stile, Stockfotos und Einstellungen. Es ist das größte Modul der API und treibt das CMS, Medien-/Streaming-Funktionen, die Gottesdienstplanung und die Bibel-Funktionen in allen ChurchApps-Anwendungen an.

</div>

**Basispfad:** `/content`

## Seiten (Pages)

Basispfad: `/content/pages`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Öffentlich | — | Vollständigen Seitenbaum (Abschnitte, Elemente, Blöcke) anhand von URL oder ID laden. Entfernt interne IDs bei Abruf über URL. URL-basierte Abrufe erzwingen `pages.visibility` — eine gesperrte Seite liefert `{ restricted: true, visibility }`, sofern das (optionale) JWT die Bedingung nicht erfüllt |
| GET | `/public/:churchId` | Öffentlich | — | Öffentliche Seiten auflisten (`url`, `title`, `metaDescription`); nur `visibility = everyone` |
| GET | `/:id` | JWT | — | Eine Seite anhand der ID abrufen |
| GET | `/` | JWT | — | Alle Seiten der Kirche auflisten |
| POST | `/duplicate/:id` | JWT | Content.Edit | Eine Seite mit allen Abschnitten und Elementen duplizieren |
| POST | `/temp/ai` | JWT | Content.Edit | Eine KI-generierte Seite speichern (Seite, Abschnitte und Elemente in einem Aufruf) |
| POST | `/` | JWT | Content.Edit | Seiten erstellen oder aktualisieren (Batch) |
| DELETE | `/:id` | JWT | Content.Edit | Eine Seite löschen |

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

## Abschnitte (Sections)

Basispfad: `/content/sections`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Einen Abschnitt anhand der ID abrufen |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Einen Abschnitt duplizieren oder in einen wiederverwendbaren Block umwandeln |
| POST | `/` | JWT | Content.Edit | Abschnitte erstellen oder aktualisieren (Batch). Aktualisiert die Sortierreihenfolge automatisch |
| DELETE | `/:id` | JWT | Content.Edit | Einen Abschnitt löschen (aktualisiert die Sortierreihenfolge automatisch) |

## Elemente (Elements)

Basispfad: `/content/elements`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ein Element anhand der ID abrufen |
| POST | `/duplicate/:id` | JWT | Content.Edit | Ein Element mit allen untergeordneten Elementen duplizieren |
| POST | `/` | JWT | Content.Edit | Elemente erstellen oder aktualisieren (Batch). Verwaltet Zeilenspalten und Karussell-Folien automatisch |
| DELETE | `/:id` | JWT | Content.Edit | Ein Element löschen |

## Blöcke (Blocks)

Basispfad: `/content/blocks`

Erweitert Standard-CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` aus der Basisklasse, mit Content.Edit-Berechtigung für Schreibzugriffe).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Einen Block anhand der ID abrufen |
| GET | `/` | JWT | — | Alle Blöcke auflisten |
| GET | `/:churchId/tree/:id` | Öffentlich | — | Vollständigen Blockbaum mit Abschnitten und Elementen laden |
| GET | `/blockType/:blockType` | JWT | — | Blöcke nach Typ laden (z. B. footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Öffentlich | — | Footer-Blockbaum einer Kirche laden |
| POST | `/` | JWT | Content.Edit | Blöcke erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Content.Edit | Einen Block löschen |

## Links

Basispfad: `/content/links`

Erweitert Standard-CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` aus der Basisklasse, mit Content.Edit-Berechtigung für Schreibzugriffe).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Einen Link anhand der ID abrufen |
| GET | `/` | JWT | — | Alle Links auflisten. Optionaler `?category=`-Filter. Sortiert nach dem Speichern automatisch |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Links gefiltert nach Sichtbarkeit laden (everyone, visitors, members, staff, groups) |
| GET | `/church/:churchId?category=` | Öffentlich | — | Links einer Kirche nach Kategorie laden (öffentlich) |
| POST | `/` | JWT | Content.Edit | Links erstellen oder aktualisieren (Batch). Sortiert automatisch nach Kategorie |
| DELETE | `/:id` | JWT | Content.Edit | Einen Link löschen |

## Globale Stile (Global Styles)

Basispfad: `/content/globalStyles`

Erweitert Standard-CRUD (POST `/`, DELETE `/:id` aus der Basisklasse, mit Content.Edit-Berechtigung für Schreibzugriffe).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/church/:churchId` | Öffentlich | — | Globale Stile einer Kirche laden (liefert Standardwerte, falls keine gesetzt sind) |
| GET | `/` | JWT | — | Globale Stile der authentifizierten Kirche laden |
| POST | `/` | JWT | Content.Edit | Globale Stile erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Content.Edit | Globale Stile löschen |

## Seitenverlauf (Page History)

Basispfad: `/content/pageHistory`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | Verlaufseinträge für eine Seite auflisten |
| GET | `/block/:blockId` | JWT | Content.Edit | Verlaufseinträge für einen Block auflisten |
| GET | `/:id` | JWT | Content.Edit | Einen Verlaufseintrag anhand der ID abrufen |
| POST | `/` | JWT | Content.Edit | Einen Seiten-/Block-Snapshot speichern. Bereinigt periodisch Einträge, die älter als 30 Tage sind |
| POST | `/restore/:id` | JWT | Content.Edit | Eine Seite/einen Block aus einem Verlaufs-Snapshot wiederherstellen (löscht den aktuellen Inhalt und erstellt ihn aus dem Snapshot neu) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Aus einem eingebetteten Snapshot-Objekt wiederherstellen. Body: `{ pageId, blockId, snapshot }` |

## Beiträge (Blog)

Basispfad: `/content/posts`

Blogbeiträge sind eigenständige Datensätze: `title`, `slug` (eindeutig je Kirche), `excerpt`, `content` (Markdown-Text), `authorId`, `photoUrl`, `publishDate`, `category` und `tags`. Ein Beitrag ist veröffentlicht, sobald `publishDate` gesetzt ist und in der Vergangenheit liegt. Lese-Endpunkte reichern jeden Beitrag mit dem aus `authorId` aufgelösten `authorName` an. Siehe [Website-Builder-Architektur](../../architecture/website-builder#blog).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Öffentlich | — | Veröffentlichte Beiträge auflisten, paginiert (max. 50 pro Seite) |
| GET | `/public/:churchId/categories` | Öffentlich | — | Eindeutige Kategorien aller veröffentlichten Beiträge |
| GET | `/public/:churchId/slug/:slug` | Öffentlich | — | Einen veröffentlichten Beitrag anhand des Slugs abrufen |
| GET | `/rss/:churchId?siteUrl=` | Öffentlich | — | RSS-2.0-Feed veröffentlichter Beiträge (Links werden als `{siteUrl}/blog/{slug}` gebildet) |
| GET | `/:id` | JWT | — | Einen Beitrag anhand der ID abrufen |
| GET | `/` | JWT | — | Alle Beiträge der Kirche auflisten |
| POST | `/` | JWT | Content.Edit | Beiträge erstellen oder aktualisieren (Batch) |
| DELETE | `/:id` | JWT | Content.Edit | Einen Beitrag löschen |

## Weiterleitungen (Redirects)

Basispfad: `/content/redirects`

Kirchenspezifische URL-Weiterleitungen (`fromPath` → `toPath`), begrenzt auf 200 pro Kirche. Pfade werden normalisiert (Kleinschreibung, führender Schrägstrich, kein abschließender Schrägstrich), und `fromPath` ist je Kirche eindeutig. B1App löst diese bei drohenden 404-Fehlern auf und gibt einen HTTP-308-Status aus.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?path=` | Öffentlich | — | Einen Pfad auflösen (oder alle Weiterleitungen auflisten, wenn `path` weggelassen wird) |
| GET | `/:id` | JWT | — | Eine Weiterleitung anhand der ID abrufen |
| GET | `/` | JWT | — | Alle Weiterleitungen der Kirche auflisten |
| POST | `/` | JWT | Content.Edit | Weiterleitungen erstellen oder aktualisieren. Lehnt `fromPath = toPath` ab und erzwingt die 200-Zeilen-Obergrenze |
| DELETE | `/:id` | JWT | Content.Edit | Eine Weiterleitung löschen |

## Predigten (Sermons)

Basispfad: `/content/sermons`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | Eine Beispiel-FreeShow-Playlist-Struktur abrufen |
| GET | `/public/tvWrapper/:churchId` | JWT | — | TV-App-Wrapper mit Predigt-, Lektions- und FreeShow-Quellen abrufen |
| GET | `/public/tvFeed/:churchId/:sermonId` | Öffentlich | — | Eine einzelne Predigt als TV-Feed-Playlist abrufen |
| GET | `/public/tvFeed/:churchId` | Öffentlich | — | Alle öffentlichen Playlists/Predigten als TV-Feed abrufen |
| GET | `/public/:churchId` | Öffentlich | — | Alle öffentlichen Predigten einer Kirche auflisten |
| GET | `/timeline?sermonIds=` | JWT | — | Zeitleistendaten für Predigten laden |
| GET | `/lookup?videoType=&videoData=` | Öffentlich | — | Predigt-Metadaten von YouTube oder Vimeo nachschlagen |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | KI-Vorschläge für Social-Media-Beiträge anhand der Predigt-Untertitel erzeugen |
| GET | `/outline?url=&title=&author=` | JWT | — | KI-generierte Lektionsgliederung aus einer URL erzeugen |
| GET | `/youtubeImport/:channelId` | JWT | — | Videos von einem YouTube-Kanal importieren |
| GET | `/vimeoImport/:channelId` | JWT | — | Videos von einem Vimeo-Kanal importieren |
| GET | `/:id` | JWT | — | Eine Predigt anhand der ID abrufen |
| GET | `/` | JWT | — | Alle Predigten auflisten |
| POST | `/` | JWT | StreamingServices.Edit | Predigten erstellen oder aktualisieren (Batch, unterstützt Base64-Thumbnail-Upload) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Eine Predigt löschen |

### Beispiel: Eine YouTube-Predigt nachschlagen

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

## Playlists

Basispfad: `/content/playlists`

Erweitert Standard-CRUD (GET `/:id`, GET `/`, DELETE `/:id` aus der Basisklasse, mit StreamingServices.Edit-Berechtigung für Schreibzugriffe).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Eine Playlist anhand der ID abrufen |
| GET | `/` | JWT | — | Alle Playlists auflisten |
| GET | `/public/:churchId` | Öffentlich | — | Alle öffentlichen Playlists einer Kirche auflisten |
| POST | `/` | JWT | StreamingServices.Edit | Playlists erstellen oder aktualisieren (Batch, unterstützt Base64-Thumbnail-Upload) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Eine Playlist löschen |

## Streaming-Dienste (Streaming Services)

Basispfad: `/content/streamingServices`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Verschlüsselte Host-Chatraum-ID für einen Dienst abrufen |
| GET | `/` | JWT | — | Alle Streaming-Dienste auflisten. Bereinigt automatisch abgelaufene, nicht wiederkehrende Dienste und führt wiederkehrende Dienste weiter |
| POST | `/` | JWT | StreamingServices.Edit | Streaming-Dienste erstellen oder aktualisieren (Batch) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Einen Streaming-Dienst löschen (löscht auch blockierte IPs) |

## Termine (Events)

Basispfad: `/content/events`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Zeitleisten-Termine für eine Gruppe laden |
| GET | `/timeline?eventIds=` | JWT | — | Zeitleisten-Termine für die Gruppen des aktuellen Benutzers laden |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Öffentlich | — | Termine als ICS-Kalender-Feed abonnieren |
| GET | `/group/:groupId` | JWT | — | Termine für eine Gruppe abrufen (inklusive Ausnahmedaten) |
| GET | `/public/group/:churchId/:groupId` | Öffentlich | — | Öffentliche Termine für eine Gruppe abrufen |
| GET | `/:id` | JWT | — | Einen Termin anhand der ID abrufen |
| POST | `/` | JWT | — | Termine erstellen oder aktualisieren (Batch) |
| DELETE | `/:id` | JWT | Content.Edit | Einen Termin löschen |

## Termin-Ausnahmen (Event Exceptions)

Basispfad: `/content/eventExceptions`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Eine Terminausnahme anhand der ID abrufen |
| POST | `/` | JWT | Content.Edit | Terminausnahmen erstellen oder aktualisieren (Batch) |
| DELETE | `/:id` | JWT | Content.Edit | Eine Terminausnahme löschen |

## Kuratierte Kalender (Curated Calendars)

Basispfad: `/content/curatedCalendars`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Einen kuratierten Kalender anhand der ID abrufen |
| GET | `/` | JWT | — | Alle kuratierten Kalender auflisten |
| POST | `/` | JWT | Content.Edit | Kuratierte Kalender erstellen oder aktualisieren (Batch) |
| DELETE | `/:id` | JWT | Content.Edit | Einen kuratierten Kalender löschen |

## Kuratierte Termine (Curated Events)

Basispfad: `/content/curatedEvents`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Kuratierte Termine für einen Kalender abrufen (inklusive Termindetails und Ausnahmedaten, sofern `?withoutEvents` nicht gesetzt ist) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Öffentlich | — | Öffentliche kuratierte Termine für einen Kalender abrufen |
| GET | `/:id` | JWT | — | Einen kuratierten Termin anhand der ID abrufen |
| GET | `/` | JWT | — | Alle kuratierten Termine auflisten |
| POST | `/` | JWT | Content.Edit | Kuratierte Termine erstellen oder aktualisieren. Unterstützt ein `eventIds`-Array, um bestimmte Gruppentermine hinzuzufügen |
| DELETE | `/:id` | JWT | Content.Edit | Einen kuratierten Termin löschen |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Einen bestimmten Termin aus einem kuratierten Kalender entfernen |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Alle Termine einer Gruppe aus einem kuratierten Kalender entfernen |

## Dateien (Files)

Basispfad: `/content/files`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | Dateien nach Content-Typ und Content-ID abrufen |
| GET | `/` | JWT | — | Alle Dateien für die Kirchen-Website auflisten |
| GET | `/:id` | JWT | — | Eine Datei anhand der ID abrufen |
| POST | `/` | JWT | Content.Edit* | Dateien hochladen (Base64). *Auch erlaubt, wenn der Benutzer Mitglied der Gruppe ist, die `contentId` entspricht |
| POST | `/postUrl` | JWT | Content.Edit* | Eine vorsignierte S3-Upload-URL abrufen. *Auch für Gruppenmitglieder erlaubt. Max. 100 MB pro Content-Element |
| DELETE | `/:id` | JWT | Content.Edit* | Eine Datei löschen und aus dem Speicher entfernen. *Auch für Gruppenmitglieder erlaubt |

## Galerie (Gallery)

Basispfad: `/content/gallery`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/stock/:folder` | Öffentlich | — | Stockfotos in einem Ordner auflisten |
| GET | `/:folder` | JWT | Content.Edit | Galeriebilder in einem Ordner auflisten |
| POST | `/requestUpload` | JWT | Content.Edit | Eine vorsignierte S3-Upload-URL für ein Galeriebild abrufen |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Ein Galeriebild löschen |

## Bibeln (Bibles)

Basispfad: `/content/bibles`

Alle Bibel-Endpunkte sind öffentlich (keine Authentifizierung erforderlich). Die Daten werden aus externen Quellen bezogen und lokal zwischengespeichert.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | Öffentlich | — | Alle Bibelübersetzungen auflisten (ruft von der Quelle ab, falls der Cache leer ist) |
| GET | `/stats?startDate=&endDate=` | Öffentlich | — | Bibel-Nachschlagestatistiken für einen Datumsbereich abrufen |
| GET | `/availableTranslations/:source` | Öffentlich | — | Verfügbare Übersetzungen einer Quelle auflisten (z. B. api.bible) |
| GET | `/updateTranslations` | Öffentlich | — | Alle Übersetzungen aus allen Quellen synchronisieren |
| GET | `/updateTranslations/:source` | Öffentlich | — | Übersetzungen aus einer bestimmten Quelle synchronisieren |
| GET | `/updateCopyrights` | Öffentlich | — | Copyright-Informationen für Übersetzungen aktualisieren, denen diese fehlen |
| GET | `/:translationKey/updateCopyright` | Öffentlich | — | Copyright für eine bestimmte Übersetzung aktualisieren |
| GET | `/:translationKey/search?query=&limit=` | Öffentlich | — | Verse in einer Übersetzung durchsuchen |
| GET | `/:translationKey/books` | Öffentlich | — | Bücher einer Übersetzung abrufen (wird lokal zwischengespeichert) |
| GET | `/:translationKey/:bookKey/chapters` | Öffentlich | — | Kapitel eines Buches abrufen (wird lokal zwischengespeichert) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Öffentlich | — | Verse eines Kapitels abrufen (wird lokal zwischengespeichert) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Öffentlich | — | Verstext für einen Bereich abrufen. Protokolliert Nachschlagevorgänge. Manche Übersetzungen umgehen aus Lizenzgründen das Caching |

### Beispiel: Verstext abrufen

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

## Songs

Basispfad: `/content/songs`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/search?q=` | JWT | — | Songs anhand einer Suchanfrage durchsuchen |
| GET | `/:id` | JWT | — | Einen Song anhand der ID abrufen |
| GET | `/` | JWT | Content.Edit | Alle Songs auflisten |
| POST | `/` | JWT | Content.Edit | Songs erstellen oder aktualisieren (Batch) |
| POST | `/import` | JWT | — | Songs aus FreeShow importieren (Batch) |
| DELETE | `/:id` | JWT | Content.Edit | Einen Song löschen |

## Song-Details (Song Details)

Basispfad: `/content/songDetails`

Song-Details sind global (nicht kirchenspezifisch). Sie repräsentieren kanonische Song-Metadaten, die kirchenübergreifend gemeinsam genutzt werden.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ein Song-Detail anhand der ID abrufen (global) |
| GET | `/` | JWT | — | Song-Details für die Kirche auflisten |
| POST | `/create` | JWT | — | Ein Song-Detail aus einer PraiseCharts-ID erstellen (liefert das vorhandene, falls bereits erstellt). Ruft Metadaten automatisch von PraiseCharts und MusicBrainz ab |
| POST | `/` | JWT | — | Song-Details erstellen oder aktualisieren (Batch) |

## Song-Detail-Links (Song Detail Links)

Basispfad: `/content/songDetailLinks`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Einen Song-Detail-Link anhand der ID abrufen |
| GET | `/songDetail/:songDetailId` | JWT | — | Alle Links für ein Song-Detail abrufen |
| POST | `/` | JWT | — | Song-Detail-Links erstellen oder aktualisieren (Batch). Ruft bei Verknüpfung automatisch MusicBrainz-Daten ab |
| DELETE | `/:id` | JWT | — | Einen Song-Detail-Link löschen |

## Arrangements

Basispfad: `/content/arrangements`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ein Arrangement anhand der ID abrufen |
| GET | `/song/:songId` | JWT | Content.Edit | Arrangements für einen Song abrufen |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Arrangements für ein Song-Detail abrufen |
| GET | `/` | JWT | Content.Edit | Alle Arrangements auflisten |
| POST | `/` | JWT | Content.Edit | Arrangements erstellen oder aktualisieren (Batch) |
| POST | `/freeShow/missing` | JWT | — | FreeShow-IDs finden, die in der Kirche nicht existieren. Body: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Ein Arrangement löschen (löscht auch Tonarten; löscht den Song, falls keine Arrangements mehr verbleiben) |

## Arrangement-Tonarten (Arrangement Keys)

Basispfad: `/content/arrangementKeys`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:id` | Öffentlich | — | Arrangement-Tonart mit vollständigen Songdaten für die Präsentationsansicht abrufen |
| GET | `/:id` | JWT | — | Eine Arrangement-Tonart anhand der ID abrufen |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Tonarten für ein Arrangement abrufen |
| GET | `/` | JWT | Content.Edit | Alle Arrangement-Tonarten auflisten |
| POST | `/` | JWT | Content.Edit | Arrangement-Tonarten erstellen oder aktualisieren (Batch) |
| DELETE | `/:id` | JWT | Content.Edit | Eine Arrangement-Tonart löschen |

## Einstellungen (Settings)

Basispfad: `/content/settings`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Einstellungen des aktuellen Benutzers abrufen |
| GET | `/` | JWT | Settings.Edit | Alle Einstellungen der Kirche abrufen |
| GET | `/public/:churchId` | Öffentlich | — | Öffentliche Einstellungen einer Kirche abrufen (als Schlüssel-Wert-Paare geliefert) |
| POST | `/my` | JWT | — | Einstellungen auf Benutzerebene speichern (unterstützt Base64-Bild-Upload) |
| POST | `/` | JWT | Settings.Edit | Einstellungen auf Kirchenebene speichern (unterstützt Base64-Bild-Upload) |
| DELETE | `/my/:id` | JWT | — | Eine Benutzereinstellung löschen |

## Vorschau (Preview)

Basispfad: `/content/preview`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/data/:key` | Öffentlich | — | Streaming-Vorschaudaten einer Kirche anhand des Subdomain-Schlüssels laden (Tabs, Links, Dienste, Predigten) |

## Galerie (Stockfotos)

Basispfad: `/content/stock`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/search` | Öffentlich | — | Pexels-Stockfotos durchsuchen. Body: `{ term: "church" }` |

## PraiseCharts

Basispfad: `/content/praiseCharts`

Integration mit PraiseCharts zur Entdeckung von Gottesdienstliedern und für Notenblatt-Downloads.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/raw/:id` | JWT | — | Rohdaten von PraiseCharts für einen Song abrufen |
| GET | `/hasAccount` | JWT | — | Prüfen, ob der Benutzer ein verknüpftes PraiseCharts-Konto hat |
| GET | `/search?q=` | JWT | — | Den PraiseCharts-Katalog durchsuchen |
| GET | `/products/:id?keys=` | JWT | — | Produkte für einen Song abrufen (aus der Bibliothek, falls authentifiziert, andernfalls aus dem Katalog) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Rohe Arrangement-Daten aus der Bibliothek abrufen |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Eine Datei von PraiseCharts herunterladen (PDF oder ZIP). Liefert `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Öffentlich | — | OAuth-Autorisierungs-URL für PraiseCharts abrufen |
| GET | `/access?verifier=&token=&secret=` | JWT | — | OAuth-Verifier gegen ein Zugriffstoken eintauschen und in den Benutzereinstellungen speichern |
| GET | `/library` | JWT | — | Die PraiseCharts-Bibliothek des Benutzers durchsuchen |

## Support

Basispfad: `/content/support`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/createAudio` | Öffentlich | — | SSML mittels AWS Polly in MP3-Audio umwandeln. Body: `{ ssml: "<speak>...</speak>" }` |

## Verwandte Seiten

- [Website-Builder-Architektur](../../architecture/website-builder) -- Wie Seiten, Abschnitte, Elemente, Beiträge und Weiterleitungen in den Apps zusammenwirken
- [Membership-Endpunkte](./membership) -- Personen, Kirchen, Gruppen, Rollen, Berechtigungen
- [Attendance-Endpunkte](./attendance) -- Gottesdienst- und Besuchsverfolgung
- [Authentifizierung & Berechtigungen](./authentication) -- Anmeldeablauf, JWT, Berechtigungsmodell
- [Modulstruktur](../module-structure) -- Code-Organisationsmuster
