---
title: "Content-Endpunkte"
---

# Content-Endpunkte

<div class="article-intro">

Das Content-Modul verwaltet Website-Seiten, Abschnitte, Elemente, Blöcke, Blog-Posts, Weiterleitungen, Predigten, Wiedergabelisten, Streaming-Services, Ereignisse, kuratierte Kalender, Dateien, Galerien, Bibelübersetzungen und Vers-Lookups, Songs, Arrangements, globale Stile, Stockfotos und Einstellungen. Es ist das größte Modul in der API und unterstützt die CMS-, Media/Streaming-, Worship-Planning- und Bible-Funktionen in allen ChurchApps-Anwendungen.

</div>

**Basispfad:** `/content`

## Seiten

Basispfad: `/content/pages`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Public | — | Laden Sie den vollständigen Seitenbaum (Abschnitte, Elemente, Blöcke) nach URL oder ID. Entfernt interne IDs beim Abrufen nach URL. URL-basierte Abrufe erzwingen `pages.visibility` – eine geschützte Seite gibt `{ restricted: true, visibility }` zurück, es sei denn, das (optionale) JWT erfüllt die Gate |
| GET | `/public/:churchId` | Public | — | Liste öffentlicher Seiten (`url`, `title`, `metaDescription`); nur `visibility = everyone` |
| GET | `/:id` | JWT | — | Seite nach ID abrufen |
| GET | `/` | JWT | — | Liste aller Seiten für die Kirche |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplizieren Sie eine Seite mit allen Abschnitten und Elementen |
| POST | `/temp/ai` | JWT | Content.Edit | Speichern Sie eine KI-generierte Seite (Seite, Abschnitte und Elemente in einem Aufruf) |
| POST | `/importTree` | JWT | Content.Edit | Erstellen Sie eine Seite aus einem verschachtelten Baum (`title`, `url`, `sections[].elements[]…`). Wird immer unter der Kirche des Aufrufers eingefügt; IDs im Body werden ignoriert. Zeilen müssen ihre `column`-Kinder enthalten. Max. 30 Abschnitte / 500 Elemente |
| POST | `/` | JWT | Content.Edit | Seiten erstellen oder aktualisieren (Batch) |
| DELETE | `/:id` | JWT | Content.Edit | Seite löschen |

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

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Abschnitt nach ID abrufen |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Duplizieren Sie einen Abschnitt oder konvertieren Sie ihn in einen wiederverwendbaren Block |
| POST | `/` | JWT | Content.Edit | Abschnitte erstellen oder aktualisieren (Batch). Aktualisiert automatisch die Sortierreihenfolge |
| DELETE | `/:id` | JWT | Content.Edit | Abschnitt löschen (aktualisiert automatisch die Sortierreihenfolge) |

## Elemente

Basispfad: `/content/elements`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Element nach ID abrufen |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplizieren Sie ein Element mit allen Kindern |
| POST | `/` | JWT | Content.Edit | Elemente erstellen oder aktualisieren (Batch). Verwaltet automatisch Zeilenspalten und Karussell-Folien |
| DELETE | `/:id` | JWT | Content.Edit | Element löschen |

## Blöcke

Basispfad: `/content/blocks`

Erweitert Standard-CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` aus der Basisklasse mit Content.Edit-Berechtigung für Schreibvorgänge).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Block nach ID abrufen |
| GET | `/` | JWT | — | Liste aller Blöcke |
| GET | `/:churchId/tree/:id` | Public | — | Laden Sie den vollständigen Block-Baum mit Abschnitten und Elementen |
| GET | `/blockType/:blockType` | JWT | — | Blöcke nach Typ laden (z. B. footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Public | — | Footer-Block-Baum für eine Kirche laden |
| POST | `/` | JWT | Content.Edit | Blöcke erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Content.Edit | Block löschen |

## Links

Basispfad: `/content/links`

Erweitert Standard-CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` aus der Basisklasse mit Content.Edit-Berechtigung für Schreibvorgänge).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Link nach ID abrufen |
| GET | `/` | JWT | — | Liste aller Links. Optionaler `?category=`-Filter. Wird nach dem Speichern automatisch sortiert |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Links laden gefiltert nach Sichtbarkeit (everyone, visitors, members, staff, groups) |
| GET | `/church/:churchId?category=` | Public | — | Links für eine Kirche nach Kategorie laden (öffentlich) |
| POST | `/` | JWT | Content.Edit | Links erstellen oder aktualisieren (Batch). Wird automatisch nach Kategorie sortiert |
| DELETE | `/:id` | JWT | Content.Edit | Link löschen |

## Globale Stile

Basispfad: `/content/globalStyles`

Erweitert Standard-CRUD (POST `/`, DELETE `/:id` aus der Basisklasse mit Content.Edit-Berechtigung für Schreibvorgänge).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/church/:churchId` | Public | — | Globale Stile für eine Kirche laden (gibt Standardwerte zurück, falls keine gesetzt) |
| GET | `/` | JWT | — | Globale Stile für die authentifizierte Kirche laden |
| POST | `/` | JWT | Content.Edit | Globale Stile erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Content.Edit | Globale Stile löschen |

## Seitenverlauf

Basispfad: `/content/pageHistory`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | Verlaufsceinträge für eine Seite auflisten |
| GET | `/block/:blockId` | JWT | Content.Edit | Verlaufseinträge für einen Block auflisten |
| GET | `/:id` | JWT | Content.Edit | Verlaufseintrag nach ID abrufen |
| POST | `/` | JWT | Content.Edit | Speichern Sie eine Seite/Block-Momentaufnahme. Bereinigt regelmäßig Einträge, die älter als 30 Tage sind |
| POST | `/restore/:id` | JWT | Content.Edit | Seite/Block aus einer Verlaufs-Momentaufnahme wiederherstellen (löscht aktuellen Inhalt und erstellt ihn aus der Momentaufnahme neu) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Aus einem Inline-Momentaufnahme-Objekt wiederherstellen. Body: `{ pageId, blockId, snapshot }` |

## Posts (Blog)

Basispfad: `/content/posts`

Blog-Posts sind eigenständige Zeilen: `title`, `slug` (eindeutig pro Kirche), `excerpt`, `content` (Markdown-Body), `authorId`, `photoUrl`, `publishDate`, `category` und `tags`. Ein Post wird veröffentlicht, sobald `publishDate` gesetzt und in der Vergangenheit liegt. Read-Endpunkte bereichern jeden Post mit `authorName`, das aus `authorId` aufgelöst wird. Siehe [Website Builder Architecture](../../architecture/website-builder#blog).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Public | — | Veröffentlichte Posts auflisten, paginiert (max. 50 pro Seite) |
| GET | `/public/:churchId/categories` | Public | — | Unterschiedliche Kategorien über veröffentlichte Posts hinweg |
| GET | `/public/:churchId/slug/:slug` | Public | — | Veröffentlichten Post nach Slug abrufen |
| GET | `/rss/:churchId?siteUrl=` | Public | — | RSS 2.0-Feed veröffentlichter Posts (Links gebaut als `{siteUrl}/blog/{slug}`) |
| GET | `/:id` | JWT | — | Post nach ID abrufen |
| GET | `/` | JWT | — | Liste aller Posts für die Kirche |
| POST | `/` | JWT | Content.Edit | Posts erstellen oder aktualisieren (Batch) |
| DELETE | `/:id` | JWT | Content.Edit | Post löschen |

## Umleitungen

Basispfad: `/content/redirects`

Pro-Kirchen-URL-Umleitungen (`fromPath` → `toPath`), begrenzt auf 200 pro Kirche. Pfade werden normalisiert (kleingeschrieben, führender Schrägstrich, kein nachgestellter Schrägstrich) und `fromPath` ist eindeutig pro Kirche. B1App löst diese bei würde-404s auf und gibt HTTP 308 aus.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?path=` | Public | — | Pfad auflösen (oder alle Umleitungen auflisten, wenn `path` weggelassen wird) |
| GET | `/:id` | JWT | — | Umleitung nach ID abrufen |
| GET | `/` | JWT | — | Liste aller Umleitungen für die Kirche |
| POST | `/` | JWT | Content.Edit | Umleitungen erstellen oder aktualisieren. Lehnt `fromPath = toPath` ab und erzwingt die 200-Zeilen-Obergrenze |
| DELETE | `/:id` | JWT | Content.Edit | Umleitung löschen |

## Predigten

Basispfad: `/content/sermons`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | Abrufen einer Beispiel-FreeShow-Wiedergabelistenstruktur |
| GET | `/public/tvWrapper/:churchId` | JWT | — | TV-App-Wrapper mit Predigt-, Unterrichts- und FreeShow-Quellen abrufen |
| GET | `/public/tvFeed/:churchId/:sermonId` | Public | — | Abrufen einer einzelnen Predigt als TV-Feed-Wiedergabeliste |
| GET | `/public/tvFeed/:churchId` | Public | — | Abrufen aller öffentlichen Wiedergabelisten/Predigten als TV-Feed |
| GET | `/public/:churchId` | Public | — | Liste aller öffentlichen Predigten für eine Kirche |
| GET | `/timeline?sermonIds=` | JWT | — | Timeline-Daten für Predigten laden |
| GET | `/lookup?videoType=&videoData=` | Public | — | Predigtmetadaten von YouTube oder Vimeo nachschlagen |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | KI-Vorschläge für soziale Medien aus Predigt-Untertiteln generieren |
| GET | `/outline?url=&title=&author=` | JWT | — | KI-Unterrichtsgliederung aus einer URL generieren |
| GET | `/youtubeImport/:channelId` | JWT | — | Vidoes von einem YouTube-Kanal importieren |
| GET | `/vimeoImport/:channelId` | JWT | — | Videos von einem Vimeo-Kanal importieren |
| GET | `/:id` | JWT | — | Predigt nach ID abrufen |
| GET | `/` | JWT | — | Liste aller Predigten |
| POST | `/` | JWT | StreamingServices.Edit | Predigten erstellen oder aktualisieren (Batch, unterstützt Base64-Thumbnail-Upload) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Predigt löschen |

### Beispiel: YouTube-Predigt nachschlagen

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

## Wiedergabelisten

Basispfad: `/content/playlists`

Erweitert Standard-CRUD (GET `/:id`, GET `/`, DELETE `/:id` aus der Basisklasse mit StreamingServices.Edit-Berechtigung für Schreibvorgänge).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Wiedergabeliste nach ID abrufen |
| GET | `/` | JWT | — | Liste aller Wiedergabelisten |
| GET | `/public/:churchId` | Public | — | Liste aller öffentlichen Wiedergabelisten für eine Kirche |
| POST | `/` | JWT | StreamingServices.Edit | Wiedergabelisten erstellen oder aktualisieren (Batch, unterstützt Base64-Thumbnail-Upload) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Wiedergabeliste löschen |

## Streaming-Services

Basispfad: `/content/streamingServices`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Abrufen verschlüsselter Host-Chat-Raum-ID für einen Service |
| GET | `/` | JWT | — | Liste aller Streaming-Services. Bereinigt automatisch abgelaufene nicht wiederholte Services und aktualisiert wiederholte |
| POST | `/` | JWT | StreamingServices.Edit | Streaming-Services erstellen oder aktualisieren (Batch) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Streaming-Service löschen (löscht auch blockierte IPs) |

## Ereignisse

Basispfad: `/content/events`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Timeline-Ereignisse für eine Gruppe laden |
| GET | `/timeline?eventIds=` | JWT | — | Timeline-Ereignisse für die Gruppen des aktuellen Benutzers laden |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Public | — | Ereignisse als ICS-Kalender-Feed abonnieren |
| GET | `/group/:groupId` | JWT | — | Abrufen von Ereignissen für eine Gruppe (einschließlich Ausnahmetermine) |
| GET | `/public/group/:churchId/:groupId` | Public | — | Abrufen öffentlicher Ereignisse für eine Gruppe |
| GET | `/:id` | JWT | — | Ereignis nach ID abrufen |
| POST | `/` | JWT | — | Ereignisse erstellen oder aktualisieren (Batch) |
| DELETE | `/:id` | JWT | Content.Edit | Ereignis löschen |

## Ereignisausnahmen

Basispfad: `/content/eventExceptions`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ereignisausnahme nach ID abrufen |
| POST | `/` | JWT | Content.Edit | Ereignisausnahmen erstellen oder aktualisieren (Batch) |
| DELETE | `/:id` | JWT | Content.Edit | Ereignisausnahme löschen |

## Kuratierte Kalender

Basispfad: `/content/curatedCalendars`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kuratierter Kalender nach ID abrufen |
| GET | `/` | JWT | — | Liste aller kuratierten Kalender |
| POST | `/` | JWT | Content.Edit | Kuratierte Kalender erstellen oder aktualisieren (Batch) |
| DELETE | `/:id` | JWT | Content.Edit | Kuratierter Kalender löschen |

## Kuratierte Ereignisse

Basispfad: `/content/curatedEvents`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Kuratierte Ereignisse für einen Kalender abrufen (einschließlich Ereignisdetails und Ausnahmetermine, es sei denn, `?withoutEvents` ist gesetzt) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Public | — | Abrufen öffentlicher kuratierter Ereignisse für einen Kalender |
| GET | `/:id` | JWT | — | Kuratiertes Ereignis nach ID abrufen |
| GET | `/` | JWT | — | Liste aller kuratierten Ereignisse |
| POST | `/` | JWT | Content.Edit | Kuratierte Ereignisse erstellen oder aktualisieren. Unterstützt `eventIds`-Array zum Hinzufügen spezifischer Gruppenereignisse |
| DELETE | `/:id` | JWT | Content.Edit | Kuratiertes Ereignis löschen |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Entfernen Sie ein bestimmtes Ereignis aus einem kuratierten Kalender |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Entfernen Sie alle Ereignisse einer Gruppe aus einem kuratierten Kalender |

## Dateien

Basispfad: `/content/files`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | Abrufen von Dateien nach Inhaltstyp und Inhalts-ID |
| GET | `/` | JWT | — | Liste aller Dateien für die Kirchen-Website |
| GET | `/:id` | JWT | — | Datei nach ID abrufen |
| POST | `/` | JWT | Content.Edit* | Dateien hochladen (Base64). *Auch erlaubt, wenn der Benutzer ein Mitglied der Gruppe ist, die mit `contentId` übereinstimmt |
| POST | `/postUrl` | JWT | Content.Edit* | Abrufen einer vorgesignerten S3-Upload-URL. *Auch erlaubt für Gruppenmitglieder. Max. 100 MB pro Inhaltselement |
| DELETE | `/:id` | JWT | Content.Edit* | Datei löschen und aus dem Speicher entfernen. *Auch erlaubt für Gruppenmitglieder |

## Galerie

Basispfad: `/content/gallery`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/stock/:folder` | Public | — | Auflisten von Stockfotos in einem Ordner |
| GET | `/:folder` | JWT | Content.Edit | Galerie-Bilder in einem Ordner auflisten |
| POST | `/requestUpload` | JWT | Content.Edit | Abrufen einer vorgesignerten S3-Upload-URL für ein Galerie-Bild |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Galerie-Bild löschen |

## Bibeln

Basispfad: `/content/bibles`

Alle Bible-Endpunkte sind öffentlich (keine Authentifizierung erforderlich). Daten werden aus externen Quellen abgerufen und lokal zwischengespeichert.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | Public | — | Liste aller Bibelübersetzungen (ruft aus der Quelle ab, wenn der Cache leer ist) |
| GET | `/stats?startDate=&endDate=` | Public | — | Abrufen von Bible-Lookup-Statistiken für einen Datumsbereich |
| GET | `/availableTranslations/:source` | Public | — | Verfügbare Übersetzungen aus einer Quelle auflisten (z. B. api.bible) |
| GET | `/updateTranslations` | Public | — | Synchronisieren Sie alle Übersetzungen aus allen Quellen |
| GET | `/updateTranslations/:source` | Public | — | Übersetzungen von einer bestimmten Quelle synchronisieren |
| GET | `/updateCopyrights` | Public | — | Aktualisieren Sie Urheberinformationen für Übersetzungen, denen diese fehlen |
| GET | `/:translationKey/updateCopyright` | Public | — | Urheberrecht für eine bestimmte Übersetzung aktualisieren |
| GET | `/:translationKey/search?query=&limit=` | Public | — | Verse in einer Übersetzung durchsuchen |
| GET | `/:translationKey/books` | Public | — | Bücher für eine Übersetzung abrufen (wird lokal zwischengespeichert) |
| GET | `/:translationKey/:bookKey/chapters` | Public | — | Kapitel für ein Buch abrufen (wird lokal zwischengespeichert) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Public | — | Verse für ein Kapitel abrufen (wird lokal zwischengespeichert) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Public | — | Verstext für einen Bereich abrufen. Protokolliert Nachschläge. Einige Übersetzungen umgehen das Zwischenspeichern aus Lizenzgründen |

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
| GET | `/search?q=` | JWT | — | Songs nach Abfrage durchsuchen |
| GET | `/:id` | JWT | — | Song nach ID abrufen |
| GET | `/` | JWT | Content.Edit | Liste aller Songs |
| POST | `/` | JWT | Content.Edit | Songs erstellen oder aktualisieren (Batch) |
| POST | `/import` | JWT | — | Songs aus FreeShow importieren (Batch) |
| DELETE | `/:id` | JWT | Content.Edit | Song löschen |

## Song-Details

Basispfad: `/content/songDetails`

Song-Details sind global (nicht auf die Kirche beschränkt). Diese stellen kanonische Song-Metadaten dar, die zwischen Kirchen gemeinsam genutzt werden.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Song-Detail nach ID abrufen (global) |
| GET | `/` | JWT | — | Song-Details für die Kirche auflisten |
| POST | `/create` | JWT | — | Song-Detail aus PraiseCharts-ID erstellen (gibt vorhandene zurück, wenn bereits erstellt). Auto-fetcht Metadaten aus PraiseCharts und MusicBrainz |
| POST | `/` | JWT | — | Song-Details erstellen oder aktualisieren (Batch) |

## Song-Detail-Links

Basispfad: `/content/songDetailLinks`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Song-Detail-Link nach ID abrufen |
| GET | `/songDetail/:songDetailId` | JWT | — | Alle Links für ein Song-Detail abrufen |
| POST | `/` | JWT | — | Song-Detail-Links erstellen oder aktualisieren (Batch). Ruft automatisch MusicBrainz-Daten ab, wenn verlinkt |
| DELETE | `/:id` | JWT | — | Song-Detail-Link löschen |

## Arrangements

Basispfad: `/content/arrangements`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Arrangement nach ID abrufen |
| GET | `/song/:songId` | JWT | Content.Edit | Arrangements für einen Song abrufen |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Arrangements für ein Song-Detail abrufen |
| GET | `/` | JWT | Content.Edit | Alle Arrangements auflisten |
| POST | `/` | JWT | Content.Edit | Arrangements erstellen oder aktualisieren (Batch) |
| POST | `/freeShow/missing` | JWT | — | FreeShow-IDs finden, die nicht in der Kirche vorhanden sind. Body: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Arrangement löschen (löscht auch Tasten; löscht den Song, wenn keine Arrangements verbleiben) |

## Arrangements-Tasten

Basispfad: `/content/arrangementKeys`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:id` | Public | — | Abrufen der Arrangements-Taste mit vollständigen Song-Daten für die Moderator-Ansicht |
| GET | `/:id` | JWT | — | Arrangements-Taste nach ID abrufen |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Tasten für ein Arrangement abrufen |
| GET | `/` | JWT | Content.Edit | Alle Arrangements-Tasten auflisten |
| POST | `/` | JWT | Content.Edit | Arrangements-Tasten erstellen oder aktualisieren (Batch) |
| DELETE | `/:id` | JWT | Content.Edit | Arrangements-Taste löschen |

## Einstellungen

Basispfad: `/content/settings`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Einstellungen des aktuellen Benutzers abrufen |
| GET | `/` | JWT | Settings.Edit | Alle Einstellungen für die Kirche abrufen |
| GET | `/public/:churchId` | Public | — | Öffentliche Einstellungen für eine Kirche abrufen (als Schlüssel-Wert-Paare zurückgegeben) |
| POST | `/my` | JWT | — | Benutzereinstellungen speichern (unterstützt Base64-Bild-Upload) |
| POST | `/` | JWT | Settings.Edit | Kircheneinstellungen speichern (unterstützt Base64-Bild-Upload) |
| DELETE | `/my/:id` | JWT | — | Benutzereinstellung löschen |

## Vorschau

Basispfad: `/content/preview`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/data/:key` | Public | — | Streaming-Vorschaudaten für eine Kirche nach Subdomänen-Schlüssel laden (Tabs, Links, Services, Predigten) |

## Galerie (Stock Photos)

Basispfad: `/content/stock`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/search` | Public | — | Pexels-Stockfotos durchsuchen. Body: `{ term: "church" }` |

## PraiseCharts

Basispfad: `/content/praiseCharts`

Integration mit PraiseCharts für die Entdeckung von Worship-Songs und Downloads von Noten.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/raw/:id` | JWT | — | Rohe PraiseCharts-Daten für einen Song abrufen |
| GET | `/hasAccount` | JWT | — | Überprüfen Sie, ob der Benutzer ein verknüpftes PraiseCharts-Konto hat |
| GET | `/search?q=` | JWT | — | PraiseCharts-Katalog durchsuchen |
| GET | `/products/:id?keys=` | JWT | — | Abrufen von Produkten für einen Song (aus der Bibliothek, wenn authentifiziert, ansonsten Katalog) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Rohe Arrangements-Daten aus der Bibliothek abrufen |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Datei von PraiseCharts herunterladen (PDF oder ZIP). Gibt `{ redirectUrl }` zurück |
| GET | `/authUrl?returnUrl=` | Public | — | OAuth-Autorisierungs-URL für PraiseCharts abrufen |
| GET | `/access?verifier=&token=&secret=` | JWT | — | OAuth-Verifier gegen Zugriffstoken austauschen und in Benutzereinstellungen speichern |
| GET | `/library` | JWT | — | PraiseCharts-Bibliothek des Benutzers durchsuchen |

## Unterstützung

Basispfad: `/content/support`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/createAudio` | Public | — | SSML mit AWS Polly in MP3-Audio konvertieren. Body: `{ ssml: "<speak>...</speak>" }` |

## Zugehörige Seiten

- [Website Builder Architecture](../../architecture/website-builder) -- Wie Seiten, Abschnitte, Elemente, Posts und Umleitungen in allen Apps zusammenpassen
- [Membership Endpoints](./membership) -- Personen, Kirchen, Gruppen, Rollen, Berechtigungen
- [Attendance Endpoints](./attendance) -- Service- und Besuchsverfolgung
- [Authentication & Permissions](./authentication) -- Anmeldefluss, JWT, Berechtigungsmodell
- [Module Structure](../module-structure) -- Code-Organisationsmuster
