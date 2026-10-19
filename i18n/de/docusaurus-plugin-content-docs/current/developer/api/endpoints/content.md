---
title: "Content-Endpunkte"
---

# Content-Endpunkte

<div class="article-intro">

Das Content-Modul verwaltet Website-Seiten, Abschnitte, Elemente, Blöcke, Blogbeiträge, Weiterleitungen, Predigten, Playlists, Streaming-Dienste, Veranstaltungen, kuratierte Kalender, Dateien, Galerien, Bibelübersetzungen und Bibelvers-Abfragen, Lieder, Arrangements, globale Stile, Stockfotos und Einstellungen. Es ist das größte Modul der API und stellt die Funktionen für das CMS, Medien/Streaming, die Gottesdienstplanung und die Bibelfunktionen in allen ChurchApps-Anwendungen bereit.

</div>

**Basispfad:** `/content`

## Seiten

Basispfad: `/content/pages`

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Öffentlich | — | Lädt den vollständigen Seitenbaum (Abschnitte, Elemente, Blöcke) über URL oder ID. Entfernt interne IDs bei Abruf über die URL. URL-basierte Abrufe prüfen `pages.visibility` — eine eingeschränkte Seite gibt `{ restricted: true, visibility }` zurück, sofern das (optionale) JWT die Bedingung nicht erfüllt |
| GET | `/public/:churchId` | Öffentlich | — | Listet öffentliche Seiten auf (`url`, `title`, `metaDescription`); nur `visibility = everyone` |
| GET | `/:id` | JWT | — | Ruft eine Seite anhand der ID ab |
| GET | `/` | JWT | — | Listet alle Seiten der Gemeinde auf |
| POST | `/duplicate/:id` | JWT | Content.Edit | Dupliziert eine Seite mit allen Abschnitten und Elementen |
| POST | `/temp/ai` | JWT | Content.Edit | Speichert eine KI-generierte Seite (Seite, Abschnitte und Elemente in einem Aufruf) |
| POST | `/importTree` | JWT | Content.Edit | Erstellt eine Seite aus einem verschachtelten Baum (`title`, `url`, `sections[].elements[]…`). Fügt immer unter der Gemeinde des Aufrufers ein; IDs im Body werden ignoriert. Zeilen müssen ihre `column`-Kindelemente enthalten. Maximal 30 Abschnitte / 500 Elemente |
| POST | `/` | JWT | Content.Edit | Erstellt oder aktualisiert Seiten (Stapelverarbeitung) |
| DELETE | `/:id` | JWT | Content.Edit | Löscht eine Seite |

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

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ruft einen Abschnitt anhand der ID ab |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Dupliziert einen Abschnitt oder wandelt ihn in einen wiederverwendbaren Block um |
| POST | `/` | JWT | Content.Edit | Erstellt oder aktualisiert Abschnitte (Stapelverarbeitung). Aktualisiert die Sortierreihenfolge automatisch |
| DELETE | `/:id` | JWT | Content.Edit | Löscht einen Abschnitt (aktualisiert die Sortierreihenfolge automatisch) |

## Elemente

Basispfad: `/content/elements`

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ruft ein Element anhand der ID ab |
| POST | `/duplicate/:id` | JWT | Content.Edit | Dupliziert ein Element mit allen untergeordneten Elementen |
| POST | `/` | JWT | Content.Edit | Erstellt oder aktualisiert Elemente (Stapelverarbeitung). Verwaltet Zeilenspalten und Karussell-Folien automatisch |
| DELETE | `/:id` | JWT | Content.Edit | Löscht ein Element |

## Blöcke

Basispfad: `/content/blocks`

Erweitert die Standard-CRUD-Funktionen (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` aus der Basisklasse mit der Berechtigung Content.Edit für Schreibzugriffe).

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ruft einen Block anhand der ID ab |
| GET | `/` | JWT | — | Listet alle Blöcke auf |
| GET | `/:churchId/tree/:id` | Öffentlich | — | Lädt den vollständigen Blockbaum mit Abschnitten und Elementen |
| GET | `/blockType/:blockType` | JWT | — | Lädt Blöcke nach Typ (z. B. footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Öffentlich | — | Lädt den Fußzeilen-Blockbaum für eine Gemeinde |
| POST | `/` | JWT | Content.Edit | Erstellt oder aktualisiert Blöcke |
| DELETE | `/:id` | JWT | Content.Edit | Löscht einen Block |

## Links

Basispfad: `/content/links`

Erweitert die Standard-CRUD-Funktionen (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` aus der Basisklasse mit der Berechtigung Content.Edit für Schreibzugriffe).

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ruft einen Link anhand der ID ab |
| GET | `/` | JWT | — | Listet alle Links auf. Optionaler Filter `?category=`. Sortiert nach dem Speichern automatisch |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Lädt Links, gefiltert nach Sichtbarkeit (everyone, visitors, members, staff, groups) |
| GET | `/church/:churchId?category=` | Öffentlich | — | Lädt Links einer Gemeinde nach Kategorie (öffentlich) |
| POST | `/` | JWT | Content.Edit | Erstellt oder aktualisiert Links (Stapelverarbeitung). Sortiert automatisch nach Kategorie |
| DELETE | `/:id` | JWT | Content.Edit | Löscht einen Link |

## Globale Stile

Basispfad: `/content/globalStyles`

Erweitert die Standard-CRUD-Funktionen (POST `/`, DELETE `/:id` aus der Basisklasse mit der Berechtigung Content.Edit für Schreibzugriffe).

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/church/:churchId` | Öffentlich | — | Lädt die globalen Stile einer Gemeinde (gibt Standardwerte zurück, wenn keine festgelegt sind) |
| GET | `/` | JWT | — | Lädt die globalen Stile der angemeldeten Gemeinde |
| POST | `/` | JWT | Content.Edit | Erstellt oder aktualisiert globale Stile |
| DELETE | `/:id` | JWT | Content.Edit | Löscht globale Stile |

## Seitenverlauf

Basispfad: `/content/pageHistory`

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | Listet Verlaufseinträge für eine Seite auf |
| GET | `/block/:blockId` | JWT | Content.Edit | Listet Verlaufseinträge für einen Block auf |
| GET | `/:id` | JWT | Content.Edit | Ruft einen Verlaufseintrag anhand der ID ab |
| POST | `/` | JWT | Content.Edit | Speichert einen Snapshot einer Seite bzw. eines Blocks. Entfernt Einträge, die älter als 30 Tage sind, in regelmäßigen Abständen |
| POST | `/restore/:id` | JWT | Content.Edit | Stellt eine Seite bzw. einen Block aus einem Verlaufs-Snapshot wieder her (löscht den aktuellen Inhalt und erstellt ihn aus dem Snapshot neu) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Stellt aus einem eingebetteten Snapshot-Objekt wieder her. Body: `{ pageId, blockId, snapshot }` |

## Beiträge (Blog)

Basispfad: `/content/posts`

Blogbeiträge sind eigenständige Datensätze mit `title`, `slug` (pro Gemeinde eindeutig), `excerpt`, `content` (Markdown-Text), `authorId`, `photoUrl`, `publishDate`, `category` und `tags`. Ein Beitrag gilt als veröffentlicht, sobald `publishDate` gesetzt und in der Vergangenheit liegt. Leseendpunkte ergänzen jeden Beitrag um `authorName`, das aus `authorId` ermittelt wird. Siehe [Architektur des Website-Builders](../../architecture/website-builder#blog).

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Öffentlich | — | Listet veröffentlichte Beiträge seitenweise auf (maximal 50 pro Seite) |
| GET | `/public/:churchId/categories` | Öffentlich | — | Eindeutige Kategorien über alle veröffentlichten Beiträge |
| GET | `/public/:churchId/slug/:slug` | Öffentlich | — | Ruft einen veröffentlichten Beitrag anhand des Slugs ab |
| GET | `/rss/:churchId?siteUrl=` | Öffentlich | — | RSS-2.0-Feed der veröffentlichten Beiträge (Links werden als `{siteUrl}/blog/{slug}` erstellt) |
| GET | `/:id` | JWT | — | Ruft einen Beitrag anhand der ID ab |
| GET | `/` | JWT | — | Listet alle Beiträge der Gemeinde auf |
| POST | `/` | JWT | Content.Edit | Erstellt oder aktualisiert Beiträge (Stapelverarbeitung) |
| DELETE | `/:id` | JWT | Content.Edit | Löscht einen Beitrag |

## Weiterleitungen

Basispfad: `/content/redirects`

Gemeindespezifische URL-Weiterleitungen (`fromPath` → `toPath`), begrenzt auf 200 pro Gemeinde. Pfade werden normalisiert (Kleinschreibung, führender Schrägstrich, kein abschließender Schrägstrich), und `fromPath` ist pro Gemeinde eindeutig. B1App löst diese bei möglichen 404-Fehlern auf und sendet eine HTTP-308-Antwort.

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?path=` | Öffentlich | — | Löst einen Pfad auf (oder listet alle Weiterleitungen auf, wenn `path` weggelassen wird) |
| GET | `/:id` | JWT | — | Ruft eine Weiterleitung anhand der ID ab |
| GET | `/` | JWT | — | Listet alle Weiterleitungen der Gemeinde auf |
| POST | `/` | JWT | Content.Edit | Erstellt oder aktualisiert Weiterleitungen. Lehnt `fromPath = toPath` ab und erzwingt das Limit von 200 Zeilen |
| DELETE | `/:id` | JWT | Content.Edit | Löscht eine Weiterleitung |

## Predigten

Basispfad: `/content/sermons`

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | Ruft ein Beispiel für die Struktur einer FreeShow-Playlist ab |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Ruft den TV-App-Wrapper mit Predigt-, Lektions- und FreeShow-Quellen ab |
| GET | `/public/tvFeed/:churchId/:sermonId` | Öffentlich | — | Ruft eine einzelne Predigt als TV-Feed-Playlist ab |
| GET | `/public/tvFeed/:churchId` | Öffentlich | — | Ruft alle öffentlichen Playlists/Predigten als TV-Feed ab |
| GET | `/public/:churchId` | Öffentlich | — | Listet alle öffentlichen Predigten einer Gemeinde auf |
| GET | `/timeline?sermonIds=` | JWT | — | Lädt Zeitleistendaten für Predigten |
| GET | `/lookup?videoType=&videoData=` | Öffentlich | — | Ruft Predigtmetadaten von YouTube oder Vimeo ab |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Erstellt KI-gestützte Vorschläge für Social-Media-Beiträge aus den Untertiteln einer Predigt |
| GET | `/outline?url=&title=&author=` | JWT | — | Erstellt eine KI-gestützte Lektionsgliederung aus einer URL |
| GET | `/youtubeImport/:channelId` | JWT | — | Importiert Videos aus einem YouTube-Kanal |
| GET | `/vimeoImport/:channelId` | JWT | — | Importiert Videos aus einem Vimeo-Kanal |
| GET | `/:id` | JWT | — | Ruft eine Predigt anhand der ID ab |
| GET | `/` | JWT | — | Listet alle Predigten auf |
| POST | `/` | JWT | StreamingServices.Edit | Erstellt oder aktualisiert Predigten (Stapelverarbeitung, unterstützt den Upload von Vorschaubildern als Base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Löscht eine Predigt |

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

## Playlists

Basispfad: `/content/playlists`

Erweitert die Standard-CRUD-Funktionen (GET `/:id`, GET `/`, DELETE `/:id` aus der Basisklasse mit der Berechtigung StreamingServices.Edit für Schreibzugriffe).

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ruft eine Playlist anhand der ID ab |
| GET | `/` | JWT | — | Listet alle Playlists auf |
| GET | `/public/:churchId` | Öffentlich | — | Listet alle öffentlichen Playlists einer Gemeinde auf |
| POST | `/` | JWT | StreamingServices.Edit | Erstellt oder aktualisiert Playlists (Stapelverarbeitung, unterstützt den Upload von Vorschaubildern als Base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Löscht eine Playlist |

## Streaming-Dienste

Basispfad: `/content/streamingServices`

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Ruft die verschlüsselte Chatraum-ID des Gastgebers für einen Dienst ab |
| GET | `/` | JWT | — | Listet alle Streaming-Dienste auf. Entfernt abgelaufene, nicht wiederkehrende Dienste automatisch und rückt wiederkehrende Dienste vor |
| POST | `/` | JWT | StreamingServices.Edit | Erstellt oder aktualisiert Streaming-Dienste (Stapelverarbeitung) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Löscht einen Streaming-Dienst (entfernt außerdem gesperrte IP-Adressen) |

## Veranstaltungen

Basispfad: `/content/events`

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Lädt Zeitleistenereignisse für eine Gruppe |
| GET | `/timeline?eventIds=` | JWT | — | Lädt Zeitleistenereignisse für die Gruppen des aktuellen Benutzers |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Öffentlich | — | Abonniert Veranstaltungen als ICS-Kalenderfeed |
| GET | `/group/:groupId` | JWT | — | Ruft Veranstaltungen einer Gruppe ab (inklusive Ausnahmedaten) |
| GET | `/public/group/:churchId/:groupId` | Öffentlich | — | Ruft öffentliche Veranstaltungen einer Gruppe ab |
| GET | `/public/:churchId/:id` | Öffentlich | — | Ruft eine Veranstaltung für ihre öffentliche Seite ab, mit `roomNames` (Räume aus Buchungen, die nicht abgelehnt wurden). Gibt `null` für ausstehende oder abgelehnte Veranstaltungen sowie für private Veranstaltungen zurück, die keine Anmeldungen annehmen |
| GET | `/public/:churchId/:id/ical` | Öffentlich | — | Lädt diese einzelne Veranstaltung als `.ics`-Datei herunter (`text/calendar`, Ausnahmedaten werden berücksichtigt). `404`, wenn die Veranstaltung nach denselben Regeln ausgeblendet ist |
| GET | `/:id` | JWT | — | Ruft eine Veranstaltung anhand der ID ab |
| POST | `/` | JWT | — | Erstellt oder aktualisiert Veranstaltungen (Stapelverarbeitung) |
| DELETE | `/:id` | JWT | Content.Edit | Löscht eine Veranstaltung |

Veranstaltungsdatensätze enthalten `photoUrl` (das 16:9-Veranstaltungsfoto, das auf der öffentlichen Veranstaltungsseite und den Kacheln für kommende Veranstaltungen angezeigt wird), `tags` (kommagetrennt, genutzt vom Tag-Filter des Kalender-Elements der Website) sowie `notesViewRole` / `notesPostRole` (`staff`, wenn `null`, `leaders` oder `members`). Diese steuern den Zugriff auf die Unterhaltung `eventNote` der Veranstaltung. Siehe [Zugriffssteuerung für Gruppen- und Veranstaltungsnotizen](./messaging.md#group-and-event-notes-access-control). Öffentliche Antworten zu kuratierten Veranstaltungen enthalten ebenfalls `photoUrl` und `tags` jeder Veranstaltung.

## Veranstaltungsausnahmen

Basispfad: `/content/eventExceptions`

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ruft eine Veranstaltungsausnahme anhand der ID ab |
| POST | `/` | JWT | Content.Edit | Erstellt oder aktualisiert Veranstaltungsausnahmen (Stapelverarbeitung) |
| DELETE | `/:id` | JWT | Content.Edit | Löscht eine Veranstaltungsausnahme |

## Kuratierte Kalender

Basispfad: `/content/curatedCalendars`

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ruft einen kuratierten Kalender anhand der ID ab |
| GET | `/` | JWT | — | Listet alle kuratierten Kalender auf |
| POST | `/` | JWT | Content.Edit | Erstellt oder aktualisiert kuratierte Kalender (Stapelverarbeitung) |
| DELETE | `/:id` | JWT | Content.Edit | Löscht einen kuratierten Kalender |

## Kuratierte Veranstaltungen

Basispfad: `/content/curatedEvents`

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Ruft kuratierte Veranstaltungen eines Kalenders ab (enthält Veranstaltungsdetails und Ausnahmedaten, sofern `?withoutEvents` nicht gesetzt ist) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Öffentlich | — | Ruft öffentliche kuratierte Veranstaltungen eines Kalenders ab |
| GET | `/:id` | JWT | — | Ruft eine kuratierte Veranstaltung anhand der ID ab |
| GET | `/` | JWT | — | Listet alle kuratierten Veranstaltungen auf |
| POST | `/` | JWT | Content.Edit | Erstellt oder aktualisiert kuratierte Veranstaltungen. Unterstützt ein Array `eventIds`, um bestimmte Gruppenveranstaltungen hinzuzufügen |
| DELETE | `/:id` | JWT | Content.Edit | Löscht eine kuratierte Veranstaltung |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Entfernt eine bestimmte Veranstaltung aus einem kuratierten Kalender |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Entfernt alle Veranstaltungen einer Gruppe aus einem kuratierten Kalender |

## Dateien

Basispfad: `/content/files`

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | Ruft Dateien nach Inhaltstyp und Inhalts-ID ab |
| GET | `/` | JWT | — | Listet alle Dateien für die Website der Gemeinde auf |
| GET | `/:id` | JWT | — | Ruft eine Datei anhand der ID ab |
| POST | `/` | JWT | Content.Edit* | Lädt Dateien hoch (Base64). *Auch erlaubt, wenn der Benutzer Mitglied der Gruppe ist, die `contentId` entspricht |
| POST | `/postUrl` | JWT | Content.Edit* | Ruft eine vorsignierte S3-Upload-URL ab. *Auch für Gruppenmitglieder erlaubt. Maximal 100 MB pro Inhaltselement |
| DELETE | `/:id` | JWT | Content.Edit* | Löscht eine Datei und entfernt sie aus dem Speicher. *Auch für Gruppenmitglieder erlaubt |

## Galerie

Basispfad: `/content/gallery`

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/stock/:folder` | Öffentlich | — | Listet Stockfotos in einem Ordner auf |
| GET | `/:folder` | JWT | Content.Edit | Listet Galeriebilder in einem Ordner auf |
| POST | `/requestUpload` | JWT | Content.Edit | Ruft eine vorsignierte S3-Upload-URL für ein Galeriebild ab |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Löscht ein Galeriebild |

## Bibeln

Basispfad: `/content/bibles`

Alle Bibel-Endpunkte sind öffentlich (keine Authentifizierung erforderlich). Die Daten werden aus externen Quellen abgerufen und lokal zwischengespeichert.

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | Öffentlich | — | Listet alle Bibelübersetzungen auf (ruft sie aus der Quelle ab, wenn der Cache leer ist) |
| GET | `/stats?startDate=&endDate=` | Öffentlich | — | Ruft Bibel-Abfragestatistiken für einen Zeitraum ab |
| GET | `/availableTranslations/:source` | Öffentlich | — | Listet verfügbare Übersetzungen einer Quelle auf (z. B. api.bible) |
| GET | `/updateTranslations` | Öffentlich | — | Synchronisiert alle Übersetzungen aus allen Quellen |
| GET | `/updateTranslations/:source` | Öffentlich | — | Synchronisiert Übersetzungen aus einer bestimmten Quelle |
| GET | `/updateCopyrights` | Öffentlich | — | Aktualisiert die Urheberrechtsangaben für Übersetzungen, denen sie fehlen |
| GET | `/:translationKey/updateCopyright` | Öffentlich | — | Aktualisiert das Urheberrecht für eine bestimmte Übersetzung |
| GET | `/:translationKey/search?query=&limit=` | Öffentlich | — | Durchsucht Verse in einer Übersetzung |
| GET | `/:translationKey/books` | Öffentlich | — | Ruft die Bücher einer Übersetzung ab (wird lokal zwischengespeichert) |
| GET | `/:translationKey/:bookKey/chapters` | Öffentlich | — | Ruft die Kapitel eines Buches ab (wird lokal zwischengespeichert) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Öffentlich | — | Ruft die Verse eines Kapitels ab (wird lokal zwischengespeichert) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Öffentlich | — | Ruft den Verstext für einen Bereich ab. Protokolliert Abfragen. Einige Übersetzungen umgehen den Cache aus lizenzrechtlichen Gründen |

### Beispiel: Versttext abrufen

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

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/search?q=` | JWT | — | Durchsucht Lieder nach Suchbegriff |
| GET | `/:id` | JWT | — | Ruft ein Lied anhand der ID ab |
| GET | `/` | JWT | Content.Edit | Listet alle Lieder auf |
| POST | `/` | JWT | Content.Edit | Erstellt oder aktualisiert Lieder (Stapelverarbeitung) |
| POST | `/import` | JWT | — | Importiert Lieder aus FreeShow (Stapelverarbeitung) |
| DELETE | `/:id` | JWT | Content.Edit | Löscht ein Lied |

## Liededetails

Basispfad: `/content/songDetails`

Liededetails sind global (nicht gemeindespezifisch). Sie stellen kanonische Liedmetadaten dar, die von allen Gemeinden gemeinsam genutzt werden.

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ruft ein Liededetail anhand der ID ab (global) |
| GET | `/` | JWT | — | Listet die Liededetails der Gemeinde auf |
| POST | `/create` | JWT | — | Erstellt ein Liededetail aus einer PraiseCharts-ID (gibt das bestehende zurück, wenn bereits erstellt). Ruft Metadaten automatisch von PraiseCharts und MusicBrainz ab |
| POST | `/` | JWT | — | Erstellt oder aktualisiert Liededetails (Stapelverarbeitung) |

## Verknüpfungen von Liededetails

Basispfad: `/content/songDetailLinks`

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ruft eine Verknüpfung von Liededetails anhand der ID ab |
| GET | `/songDetail/:songDetailId` | JWT | — | Ruft alle Verknüpfungen eines Liededetails ab |
| POST | `/` | JWT | — | Erstellt oder aktualisiert Verknüpfungen von Liededetails (Stapelverarbeitung). Ruft MusicBrainz-Daten automatisch ab, wenn eine Verknüpfung besteht |
| DELETE | `/:id` | JWT | — | Löscht eine Verknüpfung von Liededetails |

## Arrangements

Basispfad: `/content/arrangements`

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ruft ein Arrangement anhand der ID ab |
| GET | `/song/:songId` | JWT | Content.Edit | Ruft die Arrangements eines Liedes ab |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Ruft die Arrangements eines Liededetails ab |
| GET | `/` | JWT | Content.Edit | Listet alle Arrangements auf |
| POST | `/` | JWT | Content.Edit | Erstellt oder aktualisiert Arrangements (Stapelverarbeitung) |
| POST | `/freeShow/missing` | JWT | — | Ermittelt FreeShow-IDs, die in der Gemeinde nicht vorhanden sind. Body: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Löscht ein Arrangement (löscht auch die Tonarten; löscht das Lied, wenn keine Arrangements mehr vorhanden sind) |

## Arrangement-Tonarten

Basispfad: `/content/arrangementKeys`

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:id` | Öffentlich | — | Ruft eine Arrangement-Tonart mit vollständigen Liededaten für die Präsentationsansicht ab |
| GET | `/:id` | JWT | — | Ruft eine Arrangement-Tonart anhand der ID ab |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Ruft die Tonarten eines Arrangements ab |
| GET | `/` | JWT | Content.Edit | Listet alle Arrangement-Tonarten auf |
| POST | `/` | JWT | Content.Edit | Erstellt oder aktualisiert Arrangement-Tonarten (Stapelverarbeitung) |
| DELETE | `/:id` | JWT | Content.Edit | Löscht eine Arrangement-Tonart |

## Einstellungen

Basispfad: `/content/settings`

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Ruft die Einstellungen des aktuellen Benutzers ab |
| GET | `/` | JWT | Settings.Edit | Ruft alle Einstellungen der Gemeinde ab |
| GET | `/public/:churchId` | Öffentlich | — | Ruft die öffentlichen Einstellungen einer Gemeinde ab (als Schlüssel-Wert-Paare zurückgegeben) |
| POST | `/my` | JWT | — | Speichert benutzerbezogene Einstellungen (unterstützt den Upload von Bildern als Base64) |
| POST | `/` | JWT | Settings.Edit | Speichert gemeindebezogene Einstellungen (unterstützt den Upload von Bildern als Base64) |
| DELETE | `/my/:id` | JWT | — | Löscht eine benutzerbezogene Einstellung |

## Vorschau

Basispfad: `/content/preview`

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/data/:key` | Öffentlich | — | Lädt Vorschaudaten des Streamings für eine Gemeinde anhand des Subdomain-Schlüssels (Tabs, Links, Dienste, Predigten) |

## Galerie (Stockfotos)

Basispfad: `/content/stock`

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/search` | Öffentlich | — | Durchsucht Stockfotos von Pexels. Body: `{ term: "church" }` |

## PraiseCharts

Basispfad: `/content/praiseCharts`

Integration mit PraiseCharts zum Entdecken von Anbetungsliedern und zum Herunterladen von Notenblättern.

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/raw/:id` | JWT | — | Ruft die Rohdaten von PraiseCharts für ein Lied ab |
| GET | `/hasAccount` | JWT | — | Prüft, ob der Benutzer ein verknüpftes PraiseCharts-Konto hat |
| GET | `/search?q=` | JWT | — | Durchsucht den PraiseCharts-Katalog |
| GET | `/products/:id?keys=` | JWT | — | Ruft Produkte für ein Lied ab (aus der Bibliothek, wenn angemeldet, sonst aus dem Katalog) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Ruft die Rohdaten eines Arrangements aus der Bibliothek ab |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Lädt eine Datei von PraiseCharts herunter (PDF oder ZIP). Gibt `{ redirectUrl }` zurück |
| GET | `/authUrl?returnUrl=` | Öffentlich | — | Ruft die OAuth-Autorisierungs-URL für PraiseCharts ab |
| GET | `/access?verifier=&token=&secret=` | JWT | — | Tauscht den OAuth-Verifizierer gegen ein Zugriffstoken ein und speichert es in den Benutzereinstellungen |
| GET | `/library` | JWT | — | Durchsucht die PraiseCharts-Bibliothek des Benutzers |

## Support

Basispfad: `/content/support`

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/createAudio` | Öffentlich | — | Wandelt SSML mit AWS Polly in MP3-Audio um. Body: `{ ssml: "<speak>...</speak>" }` |

## Verwandte Seiten

- [Architektur des Website-Builders](../../architecture/website-builder) -- Wie Seiten, Abschnitte, Elemente, Beiträge und Weiterleitungen über die Apps hinweg zusammenspielen
- [Mitglieder-Endpunkte](./membership) -- Personen, Gemeinden, Gruppen, Rollen, Berechtigungen
- [Anwesenheits-Endpunkte](./attendance) -- Erfassung von Gottesdiensten und Besuchen
- [Authentifizierung & Berechtigungen](./authentication) -- Anmeldeablauf, JWT, Berechtigungsmodell
- [Modulstruktur](../module-structure) -- Muster der Codeorganisation
