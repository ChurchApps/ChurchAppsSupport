---
title: "Inhalts-Endpunkte"
---

# Inhalts-Endpunkte

<div class="article-intro">

Das Inhalts-Modul verwaltet Website-Seiten, Abschnitte, Elemente, Blöcke, Blog-Beiträge, Weiterleitungen, Predigten, Playlists, Streaming-Dienste, Veranstaltungen, kuratierte Kalender, Dateien, Galerien, Bibelübersetzungen und Bibelverse-Suche, Lieder, Arrangements, globale Stile, Stockfotos und Einstellungen. Es ist das größte Modul der API und stellt das CMS, Medien- und Streaming-Funktionen, die Gottesdienstplanung sowie die Bibelfunktionen aller ChurchApps-Anwendungen bereit.

</div>

**Basispfad:** `/content`

## Seiten

Basispfad: `/content/pages`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Öffentlich | — | Vollständigen Seitenbaum (Abschnitte, Elemente, Blöcke) über URL oder ID laden. Entfernt interne IDs, wenn über die URL abgerufen wird. URL-basierte Abfragen beachten `pages.visibility` – eine geschützte Seite gibt `{ restricted: true, visibility }` zurück, sofern das (optionale) JWT die Bedingung nicht erfüllt |
| GET | `/public/:churchId` | Öffentlich | — | Öffentliche Seiten auflisten (`url`, `title`, `metaDescription`); nur `visibility = everyone` |
| GET | `/:id` | JWT | — | Eine Seite anhand der ID abrufen |
| GET | `/` | JWT | — | Alle Seiten der Kirche auflisten |
| POST | `/duplicate/:id` | JWT | Content.Edit | Eine Seite mit allen Abschnitten und Elementen duplizieren |
| POST | `/temp/ai` | JWT | Content.Edit | Eine KI-generierte Seite speichern (Seite, Abschnitte und Elemente in einem Aufruf) |
| POST | `/importTree` | JWT | Content.Edit | Eine Seite aus einem verschachtelten Baum erstellen (`title`, `url`, `sections[].elements[]…`). Wird immer unter der Kirche des Aufrufers eingefügt; IDs im Body werden ignoriert. Zeilen müssen ihre `column`-Kinder enthalten. Maximal 30 Abschnitte / 500 Elemente |
| POST | `/` | JWT | Content.Edit | Seiten erstellen oder aktualisieren (Stapel) |
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

## Abschnitte

Basispfad: `/content/sections`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Einen Abschnitt anhand der ID abrufen |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Einen Abschnitt duplizieren oder in einen wiederverwendbaren Block umwandeln |
| POST | `/` | JWT | Content.Edit | Abschnitte erstellen oder aktualisieren (Stapel). Aktualisiert die Sortierreihenfolge automatisch |
| DELETE | `/:id` | JWT | Content.Edit | Einen Abschnitt löschen (aktualisiert die Sortierreihenfolge automatisch) |

## Elemente

Basispfad: `/content/elements`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ein Element anhand der ID abrufen |
| POST | `/duplicate/:id` | JWT | Content.Edit | Ein Element mit allen untergeordneten Elementen duplizieren |
| POST | `/` | JWT | Content.Edit | Elemente erstellen oder aktualisieren (Stapel). Verwaltet Zeilenspalten und Karussell-Folien automatisch |
| DELETE | `/:id` | JWT | Content.Edit | Ein Element löschen |

## Blöcke

Basispfad: `/content/blocks`

Erweitert das Standard-CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` aus der Basisklasse, Schreibzugriffe mit Berechtigung Content.Edit).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Einen Block anhand der ID abrufen |
| GET | `/` | JWT | — | Alle Blöcke auflisten |
| GET | `/:churchId/tree/:id` | Öffentlich | — | Vollständigen Blockbaum mit Abschnitten und Elementen laden |
| GET | `/blockType/:blockType` | JWT | — | Blöcke nach Typ laden (z. B. footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Öffentlich | — | Den Fußzeilen-Blockbaum einer Kirche laden |
| POST | `/` | JWT | Content.Edit | Blöcke erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Content.Edit | Einen Block löschen |

## Links

Basispfad: `/content/links`

Erweitert das Standard-CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` aus der Basisklasse, Schreibzugriffe mit Berechtigung Content.Edit).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Einen Link anhand der ID abrufen |
| GET | `/` | JWT | — | Alle Links auflisten. Optionaler Filter `?category=`. Sortiert nach dem Speichern automatisch |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Links laden, gefiltert nach Sichtbarkeit (everyone, visitors, members, staff, groups) |
| GET | `/church/:churchId?category=` | Öffentlich | — | Links einer Kirche nach Kategorie laden (öffentlich) |
| POST | `/` | JWT | Content.Edit | Links erstellen oder aktualisieren (Stapel). Sortiert nach Kategorie automatisch |
| DELETE | `/:id` | JWT | Content.Edit | Einen Link löschen |

## Globale Stile

Basispfad: `/content/globalStyles`

Erweitert das Standard-CRUD (POST `/`, DELETE `/:id` aus der Basisklasse, Schreibzugriffe mit Berechtigung Content.Edit).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/church/:churchId` | Öffentlich | — | Globale Stile einer Kirche laden (liefert Standardwerte, falls keine gesetzt sind) |
| GET | `/` | JWT | — | Globale Stile der angemeldeten Kirche laden |
| POST | `/` | JWT | Content.Edit | Globale Stile erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Content.Edit | Globale Stile löschen |

## Seitenverlauf

Basispfad: `/content/pageHistory`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | Verlaufseinträge einer Seite auflisten |
| GET | `/block/:blockId` | JWT | Content.Edit | Verlaufseinträge eines Blocks auflisten |
| GET | `/:id` | JWT | Content.Edit | Einen Verlaufseintrag anhand der ID abrufen |
| POST | `/` | JWT | Content.Edit | Einen Schnappschuss einer Seite bzw. eines Blocks speichern. Entfernt regelmäßig Einträge, die älter als 30 Tage sind |
| POST | `/restore/:id` | JWT | Content.Edit | Eine Seite bzw. einen Block aus einem Verlaufs-Schnappschuss wiederherstellen (löscht den aktuellen Inhalt und erstellt ihn aus dem Schnappschuss neu) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Aus einem eingebetteten Schnappschuss-Objekt wiederherstellen. Body: `{ pageId, blockId, snapshot }` |

## Beiträge (Blog)

Basispfad: `/content/posts`

Blog-Beiträge sind eigenständige Zeilen mit `title`, `slug` (je Kirche eindeutig), `excerpt`, `content` (Markdown-Text), `authorId`, `photoUrl`, `publishDate`, `category` und `tags`. Ein Beitrag gilt als veröffentlicht, sobald `publishDate` gesetzt und in der Vergangenheit liegt. Lese-Endpunkte ergänzen jeden Beitrag um `authorName`, aufgelöst aus `authorId`. Siehe [Architektur des Website-Baukastens](../../architecture/website-builder#blog).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Öffentlich | — | Veröffentlichte Beiträge seitenweise auflisten (höchstens 50 pro Seite) |
| GET | `/public/:churchId/categories` | Öffentlich | — | Verschiedene Kategorien veröffentlichter Beiträge |
| GET | `/public/:churchId/slug/:slug` | Öffentlich | — | Einen veröffentlichten Beitrag anhand des Slugs abrufen |
| GET | `/rss/:churchId?siteUrl=` | Öffentlich | — | RSS-2.0-Feed der veröffentlichten Beiträge (Links werden als `{siteUrl}/blog/{slug}` erzeugt) |
| GET | `/:id` | JWT | — | Einen Beitrag anhand der ID abrufen |
| GET | `/` | JWT | — | Alle Beiträge der Kirche auflisten |
| POST | `/` | JWT | Content.Edit | Beiträge erstellen oder aktualisieren (Stapel) |
| DELETE | `/:id` | JWT | Content.Edit | Einen Beitrag löschen |

## Weiterleitungen

Basispfad: `/content/redirects`

URL-Weiterleitungen je Kirche (`fromPath` → `toPath`), begrenzt auf 200 pro Kirche. Pfade werden normalisiert (Kleinbuchstaben, führender Schrägstrich, kein abschließender Schrägstrich), und `fromPath` ist je Kirche eindeutig. Die B1-App löst diese Weiterleitungen bei vermeintlichen 404-Fehlern auf und antwortet mit HTTP 308.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?path=` | Öffentlich | — | Einen Pfad auflösen (ohne `path` werden alle Weiterleitungen aufgelistet) |
| GET | `/:id` | JWT | — | Eine Weiterleitung anhand der ID abrufen |
| GET | `/` | JWT | — | Alle Weiterleitungen der Kirche auflisten |
| POST | `/` | JWT | Content.Edit | Weiterleitungen erstellen oder aktualisieren. Lehnt `fromPath = toPath` ab und erzwingt die Obergrenze von 200 Zeilen |
| DELETE | `/:id` | JWT | Content.Edit | Eine Weiterleitung löschen |

## Predigten

Basispfad: `/content/sermons`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | Eine Beispielstruktur einer FreeShow-Playlist abrufen |
| GET | `/public/tvWrapper/:churchId` | JWT | — | TV-App-Wrapper mit Quellen für Predigt, Lektion und FreeShow abrufen |
| GET | `/public/tvFeed/:churchId/:sermonId` | Öffentlich | — | Eine einzelne Predigt als TV-Feed-Playlist abrufen |
| GET | `/public/tvFeed/:churchId` | Öffentlich | — | Alle öffentlichen Playlists/Predigten als TV-Feed abrufen |
| GET | `/public/:churchId` | Öffentlich | — | Alle öffentlichen Predigten einer Kirche auflisten |
| GET | `/timeline?sermonIds=` | JWT | — | Zeitleistendaten für Predigten laden |
| GET | `/lookup?videoType=&videoData=` | Öffentlich | — | Predigt-Metadaten von YouTube oder Vimeo nachschlagen |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | KI-gestützte Vorschläge für Social-Media-Beiträge aus den Untertiteln einer Predigt erzeugen |
| GET | `/outline?url=&title=&author=` | JWT | — | KI-gestützte Gliederung einer Lektion aus einer URL erzeugen |
| GET | `/youtubeImport/:channelId` | JWT | — | Videos aus einem YouTube-Kanal importieren |
| GET | `/vimeoImport/:channelId` | JWT | — | Videos aus einem Vimeo-Kanal importieren |
| GET | `/:id` | JWT | — | Eine Predigt anhand der ID abrufen |
| GET | `/` | JWT | — | Alle Predigten auflisten |
| POST | `/` | JWT | StreamingServices.Edit | Predigten erstellen oder aktualisieren (Stapel, unterstützt Base64-Upload von Vorschaubildern) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Eine Predigt löschen |

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

Erweitert das Standard-CRUD (GET `/:id`, GET `/`, DELETE `/:id` aus der Basisklasse, Schreibzugriffe mit Berechtigung StreamingServices.Edit).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Eine Playlist anhand der ID abrufen |
| GET | `/` | JWT | — | Alle Playlists auflisten |
| GET | `/public/:churchId` | Öffentlich | — | Alle öffentlichen Playlists einer Kirche auflisten |
| POST | `/` | JWT | StreamingServices.Edit | Playlists erstellen oder aktualisieren (Stapel, unterstützt Base64-Upload von Vorschaubildern) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Eine Playlist löschen |

## Streaming-Dienste

Basispfad: `/content/streamingServices`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Verschlüsselte ID des Host-Chatraums für einen Dienst abrufen |
| GET | `/` | JWT | — | Alle Streaming-Dienste auflisten. Entfernt abgelaufene, nicht wiederkehrende Dienste automatisch und setzt wiederkehrende weiter |
| POST | `/` | JWT | StreamingServices.Edit | Streaming-Dienste erstellen oder aktualisieren (Stapel) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Einen Streaming-Dienst löschen (entfernt außerdem blockierte IP-Adressen) |

## Veranstaltungen

Basispfad: `/content/events`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Zeitleistenveranstaltungen einer Gruppe laden (enthält Ausnahmedaten, damit gelöschte Termine übersprungen werden können) |
| GET | `/timeline?eventIds=` | JWT | — | Zeitleistenveranstaltungen der Gruppen des aktuellen Benutzers laden (enthält Ausnahmedaten) |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Öffentlich | — | Veranstaltungen als ICS-Kalenderfeed abonnieren |
| GET | `/group/:groupId` | JWT | — | Veranstaltungen einer Gruppe abrufen (enthält Ausnahmedaten) |
| GET | `/public/group/:churchId/:groupId` | Öffentlich | — | Öffentliche Veranstaltungen einer Gruppe abrufen |
| GET | `/public/:churchId/:id` | Öffentlich | — | Eine Veranstaltung für ihre öffentliche Seite abrufen, mit `roomNames` (Räume aus Buchungen, die nicht abgelehnt sind). Gibt `null` zurück für ausstehende oder abgelehnte Veranstaltungen sowie für private Veranstaltungen, die keine Anmeldungen annehmen |
| GET | `/public/:churchId/:id/ical` | Öffentlich | — | Diese einzelne Veranstaltung als `.ics`-Datei herunterladen (`text/calendar`, Ausnahmedaten werden angewendet). `404`, wenn die Veranstaltung nach denselben Regeln ausgeblendet ist |
| GET | `/:id` | JWT | — | Eine Veranstaltung anhand der ID abrufen |
| POST | `/` | JWT | — | Veranstaltungen erstellen oder aktualisieren (Stapel) |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin oder Gruppenleitung | Eine Veranstaltung und ihre Buchungen löschen. Leitende der Gruppe der Veranstaltung dürfen sie löschen, und eine anfragende Person darf ihre eigene ausstehende Anfrage zurückziehen |

Veranstaltungsdatensätze enthalten `photoUrl` (das 16:9-Foto der Veranstaltung, das auf der öffentlichen Veranstaltungsseite und kommenden Veranstaltungskacheln angezeigt wird), `tags` (durch Kommas getrennt; wird im Schlagwortfilter des Kalenderelements der Website verwendet) und `notesViewRole` / `notesPostRole` (`staff`, wenn `null`, `leaders` oder `members`), die die Unterhaltung `eventNote` der Veranstaltung steuern – siehe [Zugriffssteuerung für Gruppen- und Veranstaltungsnotizen](./messaging.md#group-and-event-notes-access-control). Öffentliche Antworten zu kuratierten Veranstaltungen enthalten ebenfalls `photoUrl` und `tags` jeder Veranstaltung.

## Ausnahmen von Veranstaltungen

Basispfad: `/content/eventExceptions`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Eine Ausnahme einer Veranstaltung anhand der ID abrufen |
| POST | `/` | JWT | Content.Edit, Calendars.Admin oder Gruppenleitung | Ausnahmen von Veranstaltungen erstellen oder aktualisieren (Stapel). Leitende dürfen nur Ausnahmen für Veranstaltungen in Gruppen hinzufügen, die sie leiten |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin oder Gruppenleitung | Eine Ausnahme einer Veranstaltung löschen |

## Kuratierte Kalender

Basispfad: `/content/curatedCalendars`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Einen kuratierten Kalender anhand der ID abrufen |
| GET | `/` | JWT | — | Alle kuratierten Kalender auflisten |
| POST | `/` | JWT | Content.Edit | Kuratierte Kalender erstellen oder aktualisieren (Stapel) |
| DELETE | `/:id` | JWT | Content.Edit | Einen kuratierten Kalender löschen |

## Kuratierte Veranstaltungen

Basispfad: `/content/curatedEvents`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Kuratierte Veranstaltungen eines Kalenders abrufen (mit Veranstaltungsdetails und Ausnahmedaten, sofern nicht `?withoutEvents` gesetzt ist) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Öffentlich | — | Öffentliche kuratierte Veranstaltungen eines Kalenders abrufen |
| GET | `/:id` | JWT | — | Eine kuratierte Veranstaltung anhand der ID abrufen |
| GET | `/` | JWT | — | Alle kuratierten Veranstaltungen auflisten |
| POST | `/` | JWT | Content.Edit | Kuratierte Veranstaltungen erstellen oder aktualisieren. Unterstützt das Array `eventIds`, um bestimmte Gruppenveranstaltungen hinzuzufügen |
| DELETE | `/:id` | JWT | Content.Edit | Eine kuratierte Veranstaltung löschen |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Eine bestimmte Veranstaltung aus einem kuratierten Kalender entfernen |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Alle Veranstaltungen einer Gruppe aus einem kuratierten Kalender entfernen |

## Dateien

Basispfad: `/content/files`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | Dateien nach Inhaltstyp und Inhalts-ID abrufen |
| GET | `/` | JWT | — | Alle Dateien der Website der Kirche auflisten |
| GET | `/:id` | JWT | — | Eine Datei anhand der ID abrufen |
| POST | `/` | JWT | Content.Edit* | Dateien hochladen (Base64). *Auch erlaubt für Mitglieder der Gruppe, deren `contentId` passt |
| POST | `/postUrl` | JWT | Content.Edit* | Eine vorsignierte S3-Upload-URL abrufen. *Auch für Gruppenmitglieder erlaubt. Maximal 100 MB pro Inhaltselement |
| DELETE | `/:id` | JWT | Content.Edit* | Eine Datei löschen und aus dem Speicher entfernen. *Auch für Gruppenmitglieder erlaubt |

## Galerie

Basispfad: `/content/gallery`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/stock/:folder` | Öffentlich | — | Stockfotos in einem Ordner auflisten |
| GET | `/:folder` | JWT | Content.Edit | Galeriebilder in einem Ordner auflisten |
| POST | `/requestUpload` | JWT | Content.Edit | Eine vorsignierte S3-Upload-URL für ein Galeriebild abrufen |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Ein Galeriebild löschen |

## Bibeln

Basispfad: `/content/bibles`

Alle Bibel-Endpunkte sind öffentlich (keine Authentifizierung erforderlich). Die Daten werden aus externen Quellen abgerufen und lokal zwischengespeichert.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | Öffentlich | — | Alle Bibelübersetzungen auflisten (lädt aus der Quelle, wenn der Cache leer ist) |
| GET | `/stats?startDate=&endDate=` | Öffentlich | — | Statistiken zu Bibelabfragen für einen Datumsbereich abrufen |
| GET | `/availableTranslations/:source` | Öffentlich | — | Verfügbare Übersetzungen einer Quelle auflisten (z. B. api.bible) |
| GET | `/updateTranslations` | Öffentlich | — | Alle Übersetzungen aller Quellen synchronisieren |
| GET | `/updateTranslations/:source` | Öffentlich | — | Übersetzungen einer bestimmten Quelle synchronisieren |
| GET | `/updateCopyrights` | Öffentlich | — | Urheberrechtsangaben für Übersetzungen ohne solche Angaben aktualisieren |
| GET | `/:translationKey/updateCopyright` | Öffentlich | — | Urheberrecht einer bestimmten Übersetzung aktualisieren |
| GET | `/:translationKey/search?query=&limit=` | Öffentlich | — | Verse in einer Übersetzung durchsuchen |
| GET | `/:translationKey/books` | Öffentlich | — | Bücher einer Übersetzung abrufen (wird lokal zwischengespeichert) |
| GET | `/:translationKey/:bookKey/chapters` | Öffentlich | — | Kapitel eines Buches abrufen (wird lokal zwischengespeichert) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Öffentlich | — | Verse eines Kapitels abrufen (wird lokal zwischengespeichert) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Öffentlich | — | Verstext für einen Bereich abrufen. Protokolliert Abfragen. Einige Übersetzungen umgehen den Cache aus lizenzrechtlichen Gründen |

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

## Lieder

Basispfad: `/content/songs`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/search?q=` | JWT | — | Lieder nach Suchbegriff durchsuchen |
| GET | `/:id` | JWT | — | Ein Lied anhand der ID abrufen |
| GET | `/` | JWT | Content.Edit | Alle Lieder auflisten |
| POST | `/` | JWT | Content.Edit | Lieder erstellen oder aktualisieren (Stapel) |
| POST | `/import` | JWT | — | Lieder aus FreeShow importieren (Stapel) |
| DELETE | `/:id` | JWT | Content.Edit | Ein Lied löschen |

## Liededetails

Basispfad: `/content/songDetails`

Liededetails sind global (nicht an eine Kirche gebunden). Sie stellen kanonische Liedmetadaten dar, die Kirchen gemeinsam nutzen.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Liededetails anhand der ID abrufen (global) |
| GET | `/` | JWT | — | Liededetails der Kirche auflisten |
| POST | `/create` | JWT | — | Liededetails aus einer PraiseCharts-ID anlegen (gibt bestehende zurück, falls bereits vorhanden). Ruft Metadaten automatisch bei PraiseCharts und MusicBrainz ab |
| POST | `/` | JWT | — | Liededetails erstellen oder aktualisieren (Stapel) |

## Verknüpfungen von Liededetails

Basispfad: `/content/songDetailLinks`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Eine Verknüpfung von Liededetails anhand der ID abrufen |
| GET | `/songDetail/:songDetailId` | JWT | — | Alle Verknüpfungen eines Liededetails abrufen |
| POST | `/` | JWT | — | Verknüpfungen von Liededetails erstellen oder aktualisieren (Stapel). Ruft MusicBrainz-Daten automatisch ab, sofern verknüpft |
| DELETE | `/:id` | JWT | — | Eine Verknüpfung von Liededetails löschen |

## Arrangements

Basispfad: `/content/arrangements`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ein Arrangement anhand der ID abrufen |
| GET | `/song/:songId` | JWT | Content.Edit | Arrangements eines Liedes abrufen |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Arrangements eines Liededetails abrufen |
| GET | `/` | JWT | Content.Edit | Alle Arrangements auflisten |
| POST | `/` | JWT | Content.Edit | Arrangements erstellen oder aktualisieren (Stapel) |
| POST | `/freeShow/missing` | JWT | — | FreeShow-IDs finden, die in der Kirche nicht existieren. Body: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Ein Arrangement löschen (löscht auch die Tonarten; löscht das Lied, wenn keine Arrangements mehr vorhanden sind) |

## Tonarten von Arrangements

Basispfad: `/content/arrangementKeys`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:id` | Öffentlich | — | Tonart eines Arrangements mit vollständigen Liedaten für die Präsentationsansicht abrufen |
| GET | `/:id` | JWT | — | Eine Tonart eines Arrangements anhand der ID abrufen |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Tonarten eines Arrangements abrufen |
| GET | `/` | JWT | Content.Edit | Alle Tonarten von Arrangements auflisten |
| POST | `/` | JWT | Content.Edit | Tonarten von Arrangements erstellen oder aktualisieren (Stapel) |
| DELETE | `/:id` | JWT | Content.Edit | Eine Tonart eines Arrangements löschen |

## Einstellungen

Basispfad: `/content/settings`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Eigene Einstellungen des aktuellen Benutzers abrufen |
| GET | `/` | JWT | Settings.Edit | Alle Einstellungen der Kirche abrufen |
| GET | `/public/:churchId` | Öffentlich | — | Öffentliche Einstellungen einer Kirche abrufen (als Schlüssel-Wert-Paare) |
| POST | `/my` | JWT | — | Benutzereinstellungen speichern (unterstützt Base64-Bildupload) |
| POST | `/` | JWT | Settings.Edit | Kircheneinstellungen speichern (unterstützt Base64-Bildupload) |
| DELETE | `/my/:id` | JWT | — | Eine Benutzereinstellung löschen |

## Vorschau

Basispfad: `/content/preview`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/data/:key` | Öffentlich | — | Vorschaudaten des Streamings für eine Kirche anhand des Subdomain-Schlüssels laden (Reiter, Links, Gottesdienste, Predigten) |

## Galerie (Stockfotos)

Basispfad: `/content/stock`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/search` | Öffentlich | — | Stockfotos bei Pexels durchsuchen. Body: `{ term: "church" }` |

## PraiseCharts

Basispfad: `/content/praiseCharts`

Integration mit PraiseCharts zum Entdecken von Anbetungsliedern und zum Herunterladen von Notenblättern.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/raw/:id` | JWT | — | Rohdaten von PraiseCharts zu einem Lied abrufen |
| GET | `/hasAccount` | JWT | — | Prüfen, ob der Benutzer ein verknüpftes PraiseCharts-Konto hat |
| GET | `/search?q=` | JWT | — | Den PraiseCharts-Katalog durchsuchen |
| GET | `/products/:id?keys=` | JWT | — | Produkte zu einem Lied abrufen (aus der Bibliothek, wenn angemeldet, sonst aus dem Katalog) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Rohdaten eines Arrangements aus der Bibliothek abrufen |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Eine Datei von PraiseCharts herunterladen (PDF oder ZIP). Gibt `{ redirectUrl }` zurück |
| GET | `/authUrl?returnUrl=` | Öffentlich | — | OAuth-Autorisierungs-URL für PraiseCharts abrufen |
| GET | `/access?verifier=&token=&secret=` | JWT | — | OAuth-Verifier gegen ein Zugriffstoken tauschen und in den Benutzereinstellungen speichern |
| GET | `/library` | JWT | — | Die PraiseCharts-Bibliothek des Benutzers durchsuchen |

## Support

Basispfad: `/content/support`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/createAudio` | Öffentlich | — | SSML mit AWS Polly in MP3-Audio umwandeln. Body: `{ ssml: "<speak>...</speak>" }` |

## Verwandte Seiten

- [Architektur des Website-Baukastens](../../architecture/website-builder) – wie Seiten, Abschnitte, Elemente, Beiträge und Weiterleitungen über die Apps hinweg zusammenwirken
- [Membership-Endpunkte](./membership) – Personen, Kirchen, Gruppen, Rollen und Berechtigungen
- [Anwesenheit-Endpunkte](./attendance) – Erfassung von Gottesdiensten und Besuchen
- [Authentifizierung & Berechtigungen](./authentication) – Anmeldeablauf, JWT, Berechtigungsmodell
- [Modulstruktur](../module-structure) – Organisation des Codes
