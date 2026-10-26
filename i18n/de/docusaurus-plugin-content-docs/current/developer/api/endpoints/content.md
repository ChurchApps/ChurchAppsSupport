---
title: "Inhalts-Endpunkte"
---

# Inhalts-Endpunkte

<div class="article-intro">

Das Inhaltsmodul verwaltet Website-Seiten, Abschnitte, Elemente, Blöcke, Blogbeiträge, Weiterleitungen, Predigten, Wiedergabelisten, Streaming-Dienste, Veranstaltungen, kuratierte Kalender, Dateien, Galerien, Bibelübersetzungen und Bibelvers-Suchen, Lieder, Arrangements, globale Stile, Stockfotos und Einstellungen. Es ist das größte Modul der API und treibt das CMS, Medien- und Streaming-Funktionen, die Gottesdienstplanung und die Bibelfunktionen in allen ChurchApps-Anwendungen an.

</div>

**Basispfad:** `/content`

## Seiten

Basispfad: `/content/pages`

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Öffentlich | — | Vollständigen Seitenbaum (Abschnitte, Elemente, Blöcke) anhand von URL oder ID laden. Entfernt interne IDs, wenn über die URL abgerufen wird. URL-basierte Abrufe erzwingen `pages.visibility` — eine eingeschränkte Seite gibt `{ restricted: true, visibility }` zurück, sofern das (optionale) JWT die Sperre nicht erfüllt |
| GET | `/public/:churchId` | Öffentlich | — | Öffentliche Seiten auflisten (`url`, `title`, `metaDescription`); nur `visibility = everyone` |
| GET | `/:id` | JWT | — | Eine Seite anhand der ID abrufen |
| GET | `/` | JWT | — | Alle Seiten der Kirche auflisten |
| POST | `/duplicate/:id` | JWT | Content.Edit | Eine Seite mit allen Abschnitten und Elementen duplizieren |
| POST | `/temp/ai` | JWT | Content.Edit | Eine KI-generierte Seite speichern (Seite, Abschnitte und Elemente in einem Aufruf) |
| POST | `/importTree` | JWT | Content.Edit | Eine Seite aus einem verschachtelten Baum erstellen (`title`, `url`, `sections[].elements[]…`). Wird immer unter der Kirche des Aufrufers eingefügt; IDs im Body werden ignoriert. Zeilen müssen ihre `column`-Untereinträge enthalten. Maximal 30 Abschnitte / 500 Elemente |
| POST | `/` | JWT | Content.Edit | Seiten erstellen oder aktualisieren (Stapelverarbeitung) |
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

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Einen Abschnitt anhand der ID abrufen |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Einen Abschnitt duplizieren oder in einen wiederverwendbaren Block umwandeln |
| POST | `/` | JWT | Content.Edit | Abschnitte erstellen oder aktualisieren (Stapelverarbeitung). Aktualisiert die Sortierreihenfolge automatisch |
| DELETE | `/:id` | JWT | Content.Edit | Einen Abschnitt löschen (aktualisiert die Sortierreihenfolge automatisch) |

## Elemente

Basispfad: `/content/elements`

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ein Element anhand der ID abrufen |
| POST | `/duplicate/:id` | JWT | Content.Edit | Ein Element mit allen untergeordneten Elementen duplizieren |
| POST | `/` | JWT | Content.Edit | Elemente erstellen oder aktualisieren (Stapelverarbeitung). Verwaltet Zeilenspalten und Karussell-Folien automatisch |
| DELETE | `/:id` | JWT | Content.Edit | Ein Element löschen |

## Blöcke

Basispfad: `/content/blocks`

Erweitert die Standard-CRUD-Funktionen (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` aus der Basisklasse mit der Berechtigung Content.Edit für Schreibzugriffe).

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Einen Block anhand der ID abrufen |
| GET | `/` | JWT | — | Alle Blöcke auflisten |
| GET | `/:churchId/tree/:id` | Öffentlich | — | Vollständigen Blockbaum mit Abschnitten und Elementen laden |
| GET | `/blockType/:blockType` | JWT | — | Blöcke nach Typ laden (z. B. footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Öffentlich | — | Fußzeilen-Blockbaum einer Kirche laden |
| POST | `/` | JWT | Content.Edit | Blöcke erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Content.Edit | Einen Block löschen |

## Links

Basispfad: `/content/links`

Erweitert die Standard-CRUD-Funktionen (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` aus der Basisklasse mit der Berechtigung Content.Edit für Schreibzugriffe).

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Einen Link anhand der ID abrufen |
| GET | `/` | JWT | — | Alle Links auflisten. Optionaler Filter `?category=`. Wird nach dem Speichern automatisch sortiert |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Links nach Sichtbarkeit gefiltert laden (everyone, visitors, members, staff, groups) |
| GET | `/church/:churchId?category=` | Öffentlich | — | Links einer Kirche nach Kategorie laden (öffentlich) |
| POST | `/` | JWT | Content.Edit | Links erstellen oder aktualisieren (Stapelverarbeitung). Sortiert automatisch nach Kategorie |
| DELETE | `/:id` | JWT | Content.Edit | Einen Link löschen |

## Globale Stile

Basispfad: `/content/globalStyles`

Erweitert die Standard-CRUD-Funktionen (POST `/`, DELETE `/:id` aus der Basisklasse mit der Berechtigung Content.Edit für Schreibzugriffe).

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/church/:churchId` | Öffentlich | — | Globale Stile einer Kirche laden (gibt Standardwerte zurück, wenn keine gesetzt sind) |
| GET | `/` | JWT | — | Globale Stile der authentifizierten Kirche laden |
| POST | `/` | JWT | Content.Edit | Globale Stile erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Content.Edit | Globale Stile löschen |

## Seitenverlauf

Basispfad: `/content/pageHistory`

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | Verlaufseinträge einer Seite auflisten |
| GET | `/block/:blockId` | JWT | Content.Edit | Verlaufseinträge eines Blocks auflisten |
| GET | `/:id` | JWT | Content.Edit | Einen Verlaufseintrag anhand der ID abrufen |
| POST | `/` | JWT | Content.Edit | Einen Snapshot einer Seite bzw. eines Blocks speichern. Entfernt regelmäßig Einträge, die älter als 30 Tage sind |
| POST | `/restore/:id` | JWT | Content.Edit | Eine Seite bzw. einen Block aus einem Verlaufs-Snapshot wiederherstellen (löscht den aktuellen Inhalt und erstellt ihn aus dem Snapshot neu) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Aus einem eingebetteten Snapshot-Objekt wiederherstellen. Body: `{ pageId, blockId, snapshot }` |

## Beiträge (Blog)

Basispfad: `/content/posts`

Blogbeiträge sind eigenständige Datensätze: `title`, `slug` (pro Kirche eindeutig), `excerpt`, `content` (Markdown-Text), `authorId`, `photoUrl`, `publishDate`, `category` und `tags`. Ein Beitrag ist veröffentlicht, sobald `publishDate` gesetzt und in der Vergangenheit ist. Lese-Endpunkte ergänzen jeden Beitrag um `authorName`, das aus `authorId` ermittelt wird. Siehe [Architektur des Website-Builders](../../architecture/website-builder#blog).

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Öffentlich | — | Veröffentlichte Beiträge seitenweise auflisten (maximal 50 pro Seite) |
| GET | `/public/:churchId/categories` | Öffentlich | — | Verschiedene Kategorien veröffentlichter Beiträge |
| GET | `/public/:churchId/slug/:slug` | Öffentlich | — | Einen veröffentlichten Beitrag anhand des Slugs abrufen |
| GET | `/rss/:churchId?siteUrl=` | Öffentlich | — | RSS-2.0-Feed veröffentlichter Beiträge (Links werden als `{siteUrl}/blog/{slug}` erstellt) |
| GET | `/:id` | JWT | — | Einen Beitrag anhand der ID abrufen |
| GET | `/` | JWT | — | Alle Beiträge der Kirche auflisten |
| POST | `/` | JWT | Content.Edit | Beiträge erstellen oder aktualisieren (Stapelverarbeitung) |
| DELETE | `/:id` | JWT | Content.Edit | Einen Beitrag löschen |

## Weiterleitungen

Basispfad: `/content/redirects`

URL-Weiterleitungen pro Kirche (`fromPath` → `toPath`), maximal 200 pro Kirche. Pfade werden normalisiert (Kleinschreibung, führender Schrägstrich, kein abschließender Schrägstrich), und `fromPath` ist pro Kirche eindeutig. B1App löst diese bei Anfragen auf, die sonst einen 404-Fehler erzeugen würden, und sendet eine HTTP-308-Antwort.

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?path=` | Öffentlich | — | Einen Pfad auflösen (oder alle Weiterleitungen auflisten, wenn `path` weggelassen wird) |
| GET | `/:id` | JWT | — | Eine Weiterleitung anhand der ID abrufen |
| GET | `/` | JWT | — | Alle Weiterleitungen der Kirche auflisten |
| POST | `/` | JWT | Content.Edit | Weiterleitungen erstellen oder aktualisieren. Lehnt `fromPath = toPath` ab und erzwingt die Obergrenze von 200 Zeilen |
| DELETE | `/:id` | JWT | Content.Edit | Eine Weiterleitung löschen |

## Predigten

Basispfad: `/content/sermons`

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | Eine Beispielstruktur einer FreeShow-Wiedergabeliste abrufen |
| GET | `/public/tvWrapper/:churchId` | JWT | — | TV-App-Wrapper mit Quellen für Predigt, Lektion und FreeShow abrufen |
| GET | `/public/tvFeed/:churchId/:sermonId` | Öffentlich | — | Eine einzelne Predigt als TV-Feed-Wiedergabeliste abrufen |
| GET | `/public/tvFeed/:churchId` | Öffentlich | — | Alle öffentlichen Wiedergabelisten/Predigten als TV-Feed abrufen |
| GET | `/public/:churchId` | Öffentlich | — | Alle öffentlichen Predigten einer Kirche auflisten |
| GET | `/timeline?sermonIds=` | JWT | — | Zeitleistendaten für Predigten laden |
| GET | `/lookup?videoType=&videoData=` | Öffentlich | — | Predigt-Metadaten von YouTube oder Vimeo nachschlagen |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | KI-generierte Vorschläge für Social-Media-Beiträge aus den Untertiteln einer Predigt erstellen |
| GET | `/outline?url=&title=&author=` | JWT | — | KI-generierte Lektionsgliederung aus einer URL erstellen |
| GET | `/youtubeImport/:channelId` | JWT | — | Videos aus einem YouTube-Kanal importieren. HTML-Entitäten, die die YouTube-Suche-API in Titel und Beschreibungen einfügt (etwa `&amp;` und `&#39;`), werden dekodiert |
| GET | `/vimeoImport/:channelId` | JWT | — | Videos aus einem Vimeo-Kanal importieren |
| GET | `/:id` | JWT | — | Eine Predigt anhand der ID abrufen |
| GET | `/` | JWT | — | Alle Predigten auflisten |
| POST | `/` | JWT | StreamingServices.Edit | Predigten erstellen oder aktualisieren. Akzeptiert ein Array oder ein einzelnes Predigtobjekt (gibt immer ein Array zurück); ein leerer Body ergibt 400. Unterstützt den Upload von Miniaturbildern als Base64 |
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

## Wiedergabelisten

Basispfad: `/content/playlists`

Erweitert die Standard-CRUD-Funktionen (GET `/:id`, GET `/`, DELETE `/:id` aus der Basisklasse mit der Berechtigung StreamingServices.Edit für Schreibzugriffe).

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Eine Wiedergabeliste anhand der ID abrufen |
| GET | `/` | JWT | — | Alle Wiedergabelisten auflisten |
| GET | `/public/:churchId` | Öffentlich | — | Alle öffentlichen Wiedergabelisten einer Kirche auflisten |
| POST | `/` | JWT | StreamingServices.Edit | Wiedergabelisten erstellen oder aktualisieren (Stapelverarbeitung, unterstützt den Upload von Miniaturbildern als Base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Eine Wiedergabeliste löschen |

## Streaming-Dienste

Basispfad: `/content/streamingServices`

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Verschlüsselte ID des Host-Chatraums für einen Dienst abrufen |
| GET | `/` | JWT | — | Alle Streaming-Dienste auflisten. Entfernt abgelaufene, nicht wiederkehrende Dienste automatisch und setzt wiederkehrende Dienste weiter |
| POST | `/` | JWT | StreamingServices.Edit | Streaming-Dienste erstellen oder aktualisieren (Stapelverarbeitung) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Einen Streaming-Dienst löschen (entfernt außerdem gesperrte IP-Adressen) |

## Veranstaltungen

Basispfad: `/content/events`

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Zeitleistenereignisse für eine Gruppe laden (enthält Ausnahmetermine, damit gelöschte Vorkommen übersprungen werden können) |
| GET | `/timeline?eventIds=` | JWT | — | Zeitleistenereignisse für die Gruppen des aktuellen Benutzers laden (enthält Ausnahmetermine) |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Öffentlich | — | Veranstaltungen als ICS-Kalender-Feed abonnieren |
| GET | `/group/:groupId` | JWT | — | Veranstaltungen einer Gruppe abrufen (enthält Ausnahmetermine) |
| GET | `/public/group/:churchId/:groupId` | Öffentlich | — | Öffentliche Veranstaltungen einer Gruppe abrufen |
| GET | `/public/:churchId/:id` | Öffentlich | — | Eine Veranstaltung für ihre öffentliche Seite abrufen, mit `roomNames` (Räume aus Buchungen, die nicht abgelehnt wurden). Gibt `null` für ausstehende oder abgelehnte Veranstaltungen sowie für private Veranstaltungen zurück, die keine Anmeldungen annehmen |
| GET | `/public/:churchId/:id/ical` | Öffentlich | — | Diese einzelne Veranstaltung als `.ics`-Datei herunterladen (`text/calendar`, Ausnahmetermine werden angewendet). `404`, wenn die Veranstaltung nach denselben Regeln ausgeblendet ist |
| GET | `/:id` | JWT | — | Eine Veranstaltung anhand der ID abrufen |
| POST | `/` | JWT | — | Veranstaltungen erstellen oder aktualisieren (Stapelverarbeitung) |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin oder Gruppenleiter | Eine Veranstaltung und ihre Buchungen löschen. Leiter der Gruppe der Veranstaltung dürfen sie löschen, und ein Antragsteller kann seine eigene ausstehende Anfrage zurückziehen |

Veranstaltungsdatensätze enthalten `photoUrl` (das Veranstaltungsfoto im Format 16:9, das auf der öffentlichen Veranstaltungsseite und in den Kacheln für kommende Veranstaltungen angezeigt wird), `tags` (durch Kommas getrennt; wird vom Kalender-Element der Website für den Tag-Filter genutzt) sowie `notesViewRole` / `notesPostRole` (`staff`, wenn `null`, `leaders` oder `members`), die den Zugriff auf die Unterhaltung `eventNote` der Veranstaltung steuern — siehe [Zugriffssteuerung für Gruppen- und Veranstaltungsnotizen](./messaging.md#group-and-event-notes-access-control). Antworten für öffentliche kuratierte Veranstaltungen enthalten ebenfalls `photoUrl` und `tags` jeder Veranstaltung.

## Veranstaltungsausnahmen

Basispfad: `/content/eventExceptions`

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Eine Veranstaltungsausnahme anhand der ID abrufen |
| POST | `/` | JWT | Content.Edit, Calendars.Admin oder Gruppenleiter | Veranstaltungsausnahmen erstellen oder aktualisieren (Stapelverarbeitung). Leiter dürfen nur Ausnahmen für Veranstaltungen in Gruppen hinzufügen, die sie leiten |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin oder Gruppenleiter | Eine Veranstaltungsausnahme löschen |

## Kuratierte Kalender

Basispfad: `/content/curatedCalendars`

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Einen kuratierten Kalender anhand der ID abrufen |
| GET | `/` | JWT | — | Alle kuratierten Kalender auflisten |
| POST | `/` | JWT | Content.Edit | Kuratierte Kalender erstellen oder aktualisieren (Stapelverarbeitung) |
| DELETE | `/:id` | JWT | Content.Edit | Einen kuratierten Kalender löschen |

## Kuratierte Veranstaltungen

Basispfad: `/content/curatedEvents`

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Kuratierte Veranstaltungen eines Kalenders abrufen (enthält Veranstaltungsdetails und Ausnahmetermine, sofern nicht `?withoutEvents` gesetzt ist) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Öffentlich | — | Öffentliche kuratierte Veranstaltungen eines Kalenders abrufen |
| GET | `/:id` | JWT | — | Eine kuratierte Veranstaltung anhand der ID abrufen |
| GET | `/` | JWT | — | Alle kuratierten Veranstaltungen auflisten |
| POST | `/` | JWT | Content.Edit | Kuratierte Veranstaltungen erstellen oder aktualisieren. Unterstützt das Array `eventIds`, um bestimmte Gruppenveranstaltungen hinzuzufügen |
| DELETE | `/:id` | JWT | Content.Edit | Eine kuratierte Veranstaltung löschen |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Eine bestimmte Veranstaltung aus einem kuratierten Kalender entfernen |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Alle Veranstaltungen einer Gruppe aus einem kuratierten Kalender entfernen |

## Dateien

Basispfad: `/content/files`

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | Dateien nach Inhaltstyp und Inhalts-ID abrufen |
| GET | `/` | JWT | — | Alle Dateien der Kirchen-Website auflisten |
| GET | `/:id` | JWT | — | Eine Datei anhand der ID abrufen |
| POST | `/` | JWT | Content.Edit* | Dateien hochladen (Base64). *Auch erlaubt, wenn der Benutzer Mitglied der Gruppe ist, die zur `contentId` gehört |
| POST | `/postUrl` | JWT | Content.Edit* | Eine vorsignierte S3-Upload-URL abrufen. *Auch für Gruppenmitglieder erlaubt. Maximal 100 MB pro Inhaltselement |
| DELETE | `/:id` | JWT | Content.Edit* | Eine Datei löschen und aus dem Speicher entfernen. *Auch für Gruppenmitglieder erlaubt |

## Galerie

Basispfad: `/content/gallery`

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/stock/:folder` | Öffentlich | — | Stockfotos in einem Ordner auflisten |
| GET | `/:folder` | JWT | Content.Edit | Galeriebilder in einem Ordner auflisten |
| POST | `/requestUpload` | JWT | Content.Edit | Eine vorsignierte S3-Upload-URL für ein Galeriebild abrufen |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Ein Galeriebild löschen |

## Bibeln

Basispfad: `/content/bibles`

Alle Bibel-Endpunkte sind öffentlich (keine Authentifizierung erforderlich). Die Daten werden aus externen Quellen abgerufen und lokal zwischengespeichert. Anfragen an api.bible laufen nach 15 Sekunden ab; eine Zeitüberschreitung gibt **504** zurück.

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | Öffentlich | — | Alle Bibelübersetzungen auflisten (wird aus der Quelle abgerufen, wenn der Cache leer ist) |
| GET | `/stats?startDate=&endDate=` | Öffentlich | — | Bibel-Nachschlagestatistiken für einen Datumsbereich abrufen |
| GET | `/availableTranslations/:source` | Öffentlich | — | Verfügbare Übersetzungen einer Quelle auflisten (z. B. api.bible) |
| GET | `/updateTranslations` | Öffentlich | — | Alle Übersetzungen aus allen Quellen synchronisieren |
| GET | `/updateTranslations/:source` | Öffentlich | — | Übersetzungen einer bestimmten Quelle synchronisieren |
| GET | `/updateCopyrights` | Öffentlich | — | Urheberrechtsinformationen für Übersetzungen aktualisieren, bei denen sie fehlen |
| GET | `/:translationKey/updateCopyright` | Öffentlich | — | Urheberrecht einer bestimmten Übersetzung aktualisieren |
| GET | `/:translationKey/search?query=&limit=` | Öffentlich | — | Verse in einer Übersetzung durchsuchen |
| GET | `/:translationKey/books` | Öffentlich | — | Bücher einer Übersetzung abrufen (wird lokal zwischengespeichert) |
| GET | `/:translationKey/:bookKey/chapters` | Öffentlich | — | Kapitel eines Buches abrufen (wird lokal zwischengespeichert) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Öffentlich | — | Verse eines Kapitels abrufen (wird lokal zwischengespeichert) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Öffentlich | — | Verstext für einen Bereich abrufen. Protokolliert Abfragen. Einige Übersetzungen umgehen den Cache aus lizenzrechtlichen Gründen |

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
| GET | `/search?q=` | JWT | — | Lieder nach Suchbegriff durchsuchen |
| GET | `/:id` | JWT | — | Ein Lied anhand der ID abrufen |
| GET | `/` | JWT | Content.Edit | Alle Lieder auflisten |
| POST | `/` | JWT | Content.Edit | Lieder erstellen oder aktualisieren (Stapelverarbeitung) |
| POST | `/import` | JWT | — | Lieder aus FreeShow importieren (Stapelverarbeitung) |
| DELETE | `/:id` | JWT | Content.Edit | Ein Lied löschen |

## Liedinformationen

Basispfad: `/content/songDetails`

Liedinformationen sind global (nicht an eine Kirche gebunden). Sie stellen kanonische Liedmetadaten dar, die von Kirchen gemeinsam genutzt werden.

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Liedinformationen anhand der ID abrufen (global) |
| GET | `/` | JWT | — | Liedinformationen der Kirche auflisten |
| POST | `/create` | JWT | — | Liedinformationen anhand einer PraiseCharts-ID anlegen (gibt das vorhandene Element zurück, wenn es bereits angelegt wurde). Ruft Metadaten automatisch von PraiseCharts und MusicBrainz ab |
| POST | `/` | JWT | — | Liedinformationen erstellen oder aktualisieren (Stapelverarbeitung) |

## Verknüpfungen von Liedinformationen

Basispfad: `/content/songDetailLinks`

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Eine Verknüpfung von Liedinformationen anhand der ID abrufen |
| GET | `/songDetail/:songDetailId` | JWT | — | Alle Verknüpfungen einer Liedinformation abrufen |
| POST | `/` | JWT | — | Verknüpfungen von Liedinformationen erstellen oder aktualisieren (Stapelverarbeitung). Ruft MusicBrainz-Daten automatisch ab, wenn eine Verknüpfung besteht |
| DELETE | `/:id` | JWT | — | Eine Verknüpfung von Liedinformationen löschen |

## Arrangements

Basispfad: `/content/arrangements`

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ein Arrangement anhand der ID abrufen |
| GET | `/song/:songId` | JWT | Content.Edit | Arrangements eines Liedes abrufen |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Arrangements einer Liedinformation abrufen |
| GET | `/` | JWT | Content.Edit | Alle Arrangements auflisten |
| POST | `/` | JWT | Content.Edit | Arrangements erstellen oder aktualisieren (Stapelverarbeitung) |
| POST | `/freeShow/missing` | JWT | — | FreeShow-IDs ermitteln, die in der Kirche nicht vorhanden sind. Body: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Ein Arrangement löschen (löscht außerdem die Tonarten; löscht das Lied, wenn keine Arrangements mehr übrig sind) |

## Arrangement-Tonarten

Basispfad: `/content/arrangementKeys`

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:id` | Öffentlich | — | Arrangement-Tonart mit vollständigen Liededaten für die Präsentationsansicht abrufen |
| GET | `/:id` | JWT | — | Eine Arrangement-Tonart anhand der ID abrufen |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Tonarten eines Arrangements abrufen |
| GET | `/` | JWT | Content.Edit | Alle Arrangement-Tonarten auflisten |
| POST | `/` | JWT | Content.Edit | Arrangement-Tonarten erstellen oder aktualisieren (Stapelverarbeitung) |
| DELETE | `/:id` | JWT | Content.Edit | Eine Arrangement-Tonart löschen |

## Einstellungen

Basispfad: `/content/settings`

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Einstellungen des aktuellen Benutzers abrufen |
| GET | `/` | JWT | Settings.Edit | Alle Einstellungen der Kirche abrufen |
| GET | `/public/:churchId` | Öffentlich | — | Öffentliche Einstellungen einer Kirche abrufen (als Schlüssel-Wert-Paare zurückgegeben) |
| POST | `/my` | JWT | — | Benutzereinstellungen speichern (unterstützt den Upload von Bildern als Base64) |
| POST | `/` | JWT | Settings.Edit | Kircheneinstellungen speichern (unterstützt den Upload von Bildern als Base64) |
| DELETE | `/my/:id` | JWT | — | Eine Benutzereinstellung löschen |

## Vorschau

Basispfad: `/content/preview`

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/data/:key` | Öffentlich | — | Daten der Streaming-Vorschau einer Kirche anhand des Subdomain-Schlüssels laden (Tabs, Links, Dienste, Predigten) |

## Galerie (Stockfotos)

Basispfad: `/content/stock`

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/search` | Öffentlich | — | Pexels-Stockfotos durchsuchen. Body: `{ term: "church" }` |

## PraiseCharts

Basispfad: `/content/praiseCharts`

Integration mit PraiseCharts zum Entdecken von Lobpreisliedern und zum Herunterladen von Notenblättern.

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/raw/:id` | JWT | — | Rohdaten von PraiseCharts zu einem Lied abrufen |
| GET | `/hasAccount` | JWT | — | Prüfen, ob der Benutzer ein verknüpftes PraiseCharts-Konto hat |
| GET | `/search?q=` | JWT | — | Den PraiseCharts-Katalog durchsuchen |
| GET | `/products/:id?keys=` | JWT | — | Produkte zu einem Lied abrufen (aus der Bibliothek, wenn angemeldet, sonst aus dem Katalog) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Rohdaten eines Arrangements aus der Bibliothek abrufen |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Eine Datei von PraiseCharts herunterladen (PDF oder ZIP). Gibt `{ redirectUrl }` zurück |
| GET | `/authUrl?returnUrl=` | Öffentlich | — | OAuth-Autorisierungs-URL für PraiseCharts abrufen |
| GET | `/access?verifier=&token=&secret=` | JWT | — | OAuth-Verifizierer gegen ein Zugriffstoken tauschen und in den Benutzereinstellungen speichern |
| GET | `/library` | JWT | — | Die PraiseCharts-Bibliothek des Benutzers durchsuchen |

## Support

Basispfad: `/content/support`

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/createAudio` | Öffentlich | — | SSML mit AWS Polly in eine MP3-Audiodatei umwandeln. Body: `{ ssml: "<speak>...</speak>" }` |

## Verwandte Seiten

- [Architektur des Website-Builders](../../architecture/website-builder) -- Wie Seiten, Abschnitte, Elemente, Beiträge und Weiterleitungen in den Apps zusammenspielen
- [Mitgliedschafts-Endpunkte](./membership) -- Personen, Kirchen, Gruppen, Rollen, Berechtigungen
- [Anwesenheit-Endpunkte](./attendance) -- Erfassung von Gottesdiensten und Besuchen
- [Authentifizierung und Berechtigungen](./authentication) -- Anmeldeablauf, JWT, Berechtigungsmodell
- [Modulstruktur](../module-structure) -- Muster der Code-Organisation
