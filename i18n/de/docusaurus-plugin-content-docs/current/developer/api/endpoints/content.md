---
title: "Content-Endpunkte"
---

# Content-Endpunkte

<div class="article-intro">

Das Content-Modul verwaltet Website-Seiten, Abschnitte, Elemente, Bloecke, Blogbeitraege, Weiterleitungen, Predigten, Playlists, Streaming-Dienste, Veranstaltungen, kuratierte Kalender, Dateien, Galerien, Bibeluebersetzungen und Versnachschlagen, Lieder, Arrangements, globale Stile, Stock-Fotos und Einstellungen. Es ist das groesste Modul in der API und treibt das CMS, Medien-/Streaming-, Lobpreisplanungs- und Bibel-Funktionen ueber alle ChurchApps-Anwendungen hinweg an.

</div>

**Basispfad:** `/content`

## Seiten

Basispfad: `/content/pages`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Oeffentlich | -- | Vollstaendigen Seitenbaum (Abschnitte, Elemente, Bloecke) nach URL oder ID laden. Entfernt interne IDs bei Abruf per URL. URL-basierte Abrufe erzwingen `pages.visibility` -- eine gesperrte Seite gibt `{ restricted: true, visibility }` zurueck, ausser das (optionale) JWT erfuellt die Sperre |
| GET | `/public/:churchId` | Oeffentlich | -- | Oeffentliche Seiten auflisten (`url`, `title`, `metaDescription`); nur `visibility = everyone` |
| GET | `/:id` | JWT | -- | Eine Seite nach ID abrufen |
| GET | `/` | JWT | -- | Alle Seiten der Kirche auflisten |
| POST | `/duplicate/:id` | JWT | Content.Edit | Eine Seite mit allen Abschnitten und Elementen duplizieren |
| POST | `/temp/ai` | JWT | Content.Edit | Eine KI-generierte Seite speichern (Seite, Abschnitte und Elemente in einem Aufruf) |
| POST | `/` | JWT | Content.Edit | Seiten erstellen oder aktualisieren (Stapel) |
| DELETE | `/:id` | JWT | Content.Edit | Eine Seite loeschen |

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
| GET | `/:id` | JWT | -- | Einen Abschnitt nach ID abrufen |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Einen Abschnitt duplizieren oder in einen wiederverwendbaren Block umwandeln |
| POST | `/` | JWT | Content.Edit | Abschnitte erstellen oder aktualisieren (Stapel). Aktualisiert die Sortierreihenfolge automatisch |
| DELETE | `/:id` | JWT | Content.Edit | Einen Abschnitt loeschen (aktualisiert die Sortierreihenfolge automatisch) |

## Elemente

Basispfad: `/content/elements`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | -- | Ein Element nach ID abrufen |
| POST | `/duplicate/:id` | JWT | Content.Edit | Ein Element mit allen untergeordneten Elementen duplizieren |
| POST | `/` | JWT | Content.Edit | Elemente erstellen oder aktualisieren (Stapel). Verwaltet automatisch Zeilenspalten und Karussell-Folien |
| DELETE | `/:id` | JWT | Content.Edit | Ein Element loeschen |

## Bloecke

Basispfad: `/content/blocks`

Erweitert Standard-CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` aus der Basisklasse mit Content.Edit-Berechtigung fuer Schreibvorgaenge).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | -- | Einen Block nach ID abrufen |
| GET | `/` | JWT | -- | Alle Bloecke auflisten |
| GET | `/:churchId/tree/:id` | Oeffentlich | -- | Vollstaendigen Blockbaum mit Abschnitten und Elementen laden |
| GET | `/blockType/:blockType` | JWT | -- | Bloecke nach Typ laden (z. B. footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Oeffentlich | -- | Fusszeilen-Blockbaum fuer eine Kirche laden |
| POST | `/` | JWT | Content.Edit | Bloecke erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Content.Edit | Einen Block loeschen |

## Links

Basispfad: `/content/links`

Erweitert Standard-CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` aus der Basisklasse mit Content.Edit-Berechtigung fuer Schreibvorgaenge).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | -- | Einen Link nach ID abrufen |
| GET | `/` | JWT | -- | Alle Links auflisten. Optionaler `?category=`-Filter. Sortiert nach dem Speichern automatisch |
| GET | `/church/:churchId/filtered?category=` | JWT | -- | Links gefiltert nach Sichtbarkeit laden (alle, Besucher, Mitglieder, Personal, Gruppen) |
| GET | `/church/:churchId?category=` | Oeffentlich | -- | Links fuer eine Kirche nach Kategorie laden (oeffentlich) |
| POST | `/` | JWT | Content.Edit | Links erstellen oder aktualisieren (Stapel). Sortiert automatisch nach Kategorie |
| DELETE | `/:id` | JWT | Content.Edit | Einen Link loeschen |

## Globale Stile

Basispfad: `/content/globalStyles`

Erweitert Standard-CRUD (POST `/`, DELETE `/:id` aus der Basisklasse mit Content.Edit-Berechtigung fuer Schreibvorgaenge).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/church/:churchId` | Oeffentlich | -- | Globale Stile fuer eine Kirche laden (gibt Standardwerte zurueck, falls keine gesetzt sind) |
| GET | `/` | JWT | -- | Globale Stile fuer die authentifizierte Kirche laden |
| POST | `/` | JWT | Content.Edit | Globale Stile erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Content.Edit | Globale Stile loeschen |

## Seitenverlauf

Basispfad: `/content/pageHistory`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | Verlaufseintraege fuer eine Seite auflisten |
| GET | `/block/:blockId` | JWT | Content.Edit | Verlaufseintraege fuer einen Block auflisten |
| GET | `/:id` | JWT | Content.Edit | Einen Verlaufseintrag nach ID abrufen |
| POST | `/` | JWT | Content.Edit | Eine Seiten-/Blockmomentaufnahme speichern. Bereinigt periodisch Eintraege, die aelter als 30 Tage sind |
| POST | `/restore/:id` | JWT | Content.Edit | Eine Seite/einen Block aus einer Verlaufsmomentaufnahme wiederherstellen (loescht aktuellen Inhalt und erstellt aus der Momentaufnahme neu) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Aus einem Inline-Momentaufnahme-Objekt wiederherstellen. Body: `{ pageId, blockId, snapshot }` |

## Beitraege (Blog)

Basispfad: `/content/posts`

Blogbeitraege sind Metadaten ueber regulaeren Seiten: die `pageId` jedes Beitrags verweist auf die Seite, die den Inhalt enthaelt, und die Beitragszeile fuegt `title`, `slug` (eindeutig pro Kirche), `excerpt`, `authorId`, `photoUrl`, `publishDate`, `category` und `tags` hinzu. Ein Beitrag ist veroeffentlicht, sobald `publishDate` gesetzt ist und in der Vergangenheit liegt. Siehe Website-Builder-Architektur.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Oeffentlich | -- | Veroeffentlichte Beitraege auflisten, paginiert (max. 50 pro Seite) |
| GET | `/public/:churchId/slug/:slug` | Oeffentlich | -- | Metadaten eines veroeffentlichten Beitrags nach Slug abrufen |
| GET | `/rss/:churchId?siteUrl=` | Oeffentlich | -- | RSS-2.0-Feed veroeffentlichter Beitraege (Links als `{siteUrl}/blog/{slug}` erstellt) |
| GET | `/:id` | JWT | -- | Einen Beitrag nach ID abrufen |
| GET | `/` | JWT | -- | Alle Beitraege der Kirche auflisten |
| POST | `/` | JWT | Content.Edit | Beitraege erstellen oder aktualisieren (Stapel) |
| DELETE | `/:id` | JWT | Content.Edit | Einen Beitrag loeschen |

## Weiterleitungen

Basispfad: `/content/redirects`

Pro-Kirche-URL-Weiterleitungen (`fromPath` → `toPath`), begrenzt auf 200 pro Kirche. Pfade werden normalisiert (Kleinbuchstaben, fuehrender Schraegstrich, kein abschliessender Schraegstrich), und `fromPath` ist pro Kirche eindeutig. B1App loest diese bei potenziellen 404-Fehlern auf und gibt einen HTTP 308 aus.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?path=` | Oeffentlich | -- | Einen Pfad aufloesen (oder alle Weiterleitungen auflisten, wenn `path` weggelassen wird) |
| GET | `/:id` | JWT | -- | Eine Weiterleitung nach ID abrufen |
| GET | `/` | JWT | -- | Alle Weiterleitungen der Kirche auflisten |
| POST | `/` | JWT | Content.Edit | Weiterleitungen erstellen oder aktualisieren. Lehnt `fromPath = toPath` ab und erzwingt das 200-Zeilen-Limit |
| DELETE | `/:id` | JWT | Content.Edit | Eine Weiterleitung loeschen |

## Predigten

Basispfad: `/content/sermons`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | -- | Eine Beispiel-FreeShow-Playlist-Struktur abrufen |
| GET | `/public/tvWrapper/:churchId` | JWT | -- | TV-App-Wrapper mit Predigt-, Lektions- und FreeShow-Quellen abrufen |
| GET | `/public/tvFeed/:churchId/:sermonId` | Oeffentlich | -- | Eine einzelne Predigt als TV-Feed-Playlist abrufen |
| GET | `/public/tvFeed/:churchId` | Oeffentlich | -- | Alle oeffentlichen Playlists/Predigten als TV-Feed abrufen |
| GET | `/public/:churchId` | Oeffentlich | -- | Alle oeffentlichen Predigten einer Kirche auflisten |
| GET | `/timeline?sermonIds=` | JWT | -- | Timeline-Daten fuer Predigten laden |
| GET | `/lookup?videoType=&videoData=` | Oeffentlich | -- | Predigt-Metadaten von YouTube oder Vimeo nachschlagen |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | -- | KI-Social-Media-Beitragsvorschlaege aus Predigt-Untertiteln generieren |
| GET | `/outline?url=&title=&author=` | JWT | -- | KI-Lektionsgliederung aus einer URL generieren |
| GET | `/youtubeImport/:channelId` | JWT | -- | Videos aus einem YouTube-Kanal importieren |
| GET | `/vimeoImport/:channelId` | JWT | -- | Videos aus einem Vimeo-Kanal importieren |
| GET | `/:id` | JWT | -- | Eine Predigt nach ID abrufen |
| GET | `/` | JWT | -- | Alle Predigten auflisten |
| POST | `/` | JWT | StreamingServices.Edit | Predigten erstellen oder aktualisieren (Stapel, unterstuetzt Base64-Miniaturbild-Upload) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Eine Predigt loeschen |

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

Erweitert Standard-CRUD (GET `/:id`, GET `/`, DELETE `/:id` aus der Basisklasse mit StreamingServices.Edit-Berechtigung fuer Schreibvorgaenge).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | -- | Eine Playlist nach ID abrufen |
| GET | `/` | JWT | -- | Alle Playlists auflisten |
| GET | `/public/:churchId` | Oeffentlich | -- | Alle oeffentlichen Playlists einer Kirche auflisten |
| POST | `/` | JWT | StreamingServices.Edit | Playlists erstellen oder aktualisieren (Stapel, unterstuetzt Base64-Miniaturbild-Upload) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Eine Playlist loeschen |

## Streaming-Dienste

Basispfad: `/content/streamingServices`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Verschluesselte Host-Chatraum-ID fuer einen Dienst abrufen |
| GET | `/` | JWT | -- | Alle Streaming-Dienste auflisten. Bereinigt automatisch abgelaufene nicht wiederkehrende Dienste und stellt wiederkehrende weiter |
| POST | `/` | JWT | StreamingServices.Edit | Streaming-Dienste erstellen oder aktualisieren (Stapel) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Einen Streaming-Dienst loeschen (bereinigt auch blockierte IPs) |

## Veranstaltungen

Basispfad: `/content/events`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | -- | Timeline-Ereignisse fuer eine Gruppe laden |
| GET | `/timeline?eventIds=` | JWT | -- | Timeline-Ereignisse fuer die Gruppen des aktuellen Benutzers laden |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Oeffentlich | -- | Ereignisse als ICS-Kalenderfeed abonnieren |
| GET | `/group/:groupId` | JWT | -- | Ereignisse fuer eine Gruppe abrufen (enthaelt Ausnahmedaten) |
| GET | `/public/group/:churchId/:groupId` | Oeffentlich | -- | Oeffentliche Ereignisse fuer eine Gruppe abrufen |
| GET | `/:id` | JWT | -- | Ein Ereignis nach ID abrufen |
| POST | `/` | JWT | -- | Ereignisse erstellen oder aktualisieren (Stapel) |
| DELETE | `/:id` | JWT | Content.Edit | Ein Ereignis loeschen |

## Ereignis-Ausnahmen

Basispfad: `/content/eventExceptions`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | -- | Eine Ereignis-Ausnahme nach ID abrufen |
| POST | `/` | JWT | Content.Edit | Ereignis-Ausnahmen erstellen oder aktualisieren (Stapel) |
| DELETE | `/:id` | JWT | Content.Edit | Eine Ereignis-Ausnahme loeschen |

## Kuratierte Kalender

Basispfad: `/content/curatedCalendars`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | -- | Einen kuratierten Kalender nach ID abrufen |
| GET | `/` | JWT | -- | Alle kuratierten Kalender auflisten |
| POST | `/` | JWT | Content.Edit | Kuratierte Kalender erstellen oder aktualisieren (Stapel) |
| DELETE | `/:id` | JWT | Content.Edit | Einen kuratierten Kalender loeschen |

## Kuratierte Ereignisse

Basispfad: `/content/curatedEvents`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | -- | Kuratierte Ereignisse fuer einen Kalender abrufen (enthaelt Ereignisdetails und Ausnahmedaten, ausser `?withoutEvents` ist gesetzt) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Oeffentlich | -- | Oeffentliche kuratierte Ereignisse fuer einen Kalender abrufen |
| GET | `/:id` | JWT | -- | Ein kuratiertes Ereignis nach ID abrufen |
| GET | `/` | JWT | -- | Alle kuratierten Ereignisse auflisten |
| POST | `/` | JWT | Content.Edit | Kuratierte Ereignisse erstellen oder aktualisieren. Unterstuetzt ein `eventIds`-Array, um bestimmte Gruppenereignisse hinzuzufuegen |
| DELETE | `/:id` | JWT | Content.Edit | Ein kuratiertes Ereignis loeschen |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Ein bestimmtes Ereignis aus einem kuratierten Kalender entfernen |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Alle Ereignisse einer Gruppe aus einem kuratierten Kalender entfernen |

## Dateien

Basispfad: `/content/files`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:contentType/:contentId` | JWT | -- | Dateien nach Content-Typ und Content-ID abrufen |
| GET | `/` | JWT | -- | Alle Dateien der Kirchen-Website auflisten |
| GET | `/:id` | JWT | -- | Eine Datei nach ID abrufen |
| POST | `/` | JWT | Content.Edit* | Dateien hochladen (Base64). *Auch erlaubt, wenn der Benutzer Mitglied der zu `contentId` passenden Gruppe ist |
| POST | `/postUrl` | JWT | Content.Edit* | Eine vorsignierte S3-Upload-URL abrufen. *Auch fuer Gruppenmitglieder erlaubt. Max. 100 MB pro Content-Element |
| DELETE | `/:id` | JWT | Content.Edit* | Eine Datei loeschen und aus dem Speicher entfernen. *Auch fuer Gruppenmitglieder erlaubt |

## Galerie

Basispfad: `/content/gallery`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/stock/:folder` | Oeffentlich | -- | Stock-Fotos in einem Ordner auflisten |
| GET | `/:folder` | JWT | Content.Edit | Galeriebilder in einem Ordner auflisten |
| POST | `/requestUpload` | JWT | Content.Edit | Eine vorsignierte S3-Upload-URL fuer ein Galeriebild abrufen |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Ein Galeriebild loeschen |

## Bibeln

Basispfad: `/content/bibles`

Alle Bibel-Endpunkte sind oeffentlich (keine Authentifizierung erforderlich). Daten werden aus externen Quellen abgerufen und lokal zwischengespeichert.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | Oeffentlich | -- | Alle Bibeluebersetzungen auflisten (ruft von der Quelle ab, wenn der Cache leer ist) |
| GET | `/stats?startDate=&endDate=` | Oeffentlich | -- | Bibel-Nachschlagestatistiken fuer einen Datumsbereich abrufen |
| GET | `/availableTranslations/:source` | Oeffentlich | -- | Verfuegbare Uebersetzungen einer Quelle auflisten (z. B. api.bible) |
| GET | `/updateTranslations` | Oeffentlich | -- | Alle Uebersetzungen aus allen Quellen synchronisieren |
| GET | `/updateTranslations/:source` | Oeffentlich | -- | Uebersetzungen einer bestimmten Quelle synchronisieren |
| GET | `/updateCopyrights` | Oeffentlich | -- | Urheberrechtsinformationen fuer Uebersetzungen ohne diese aktualisieren |
| GET | `/:translationKey/updateCopyright` | Oeffentlich | -- | Urheberrecht fuer eine bestimmte Uebersetzung aktualisieren |
| GET | `/:translationKey/search?query=&limit=` | Oeffentlich | -- | Verse in einer Uebersetzung suchen |
| GET | `/:translationKey/books` | Oeffentlich | -- | Buecher fuer eine Uebersetzung abrufen (lokal zwischengespeichert) |
| GET | `/:translationKey/:bookKey/chapters` | Oeffentlich | -- | Kapitel fuer ein Buch abrufen (lokal zwischengespeichert) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Oeffentlich | -- | Verse fuer ein Kapitel abrufen (lokal zwischengespeichert) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Oeffentlich | -- | Verstext fuer einen Bereich abrufen. Protokolliert Nachschlagevorgaenge. Manche Uebersetzungen umgehen das Zwischenspeichern aus Lizenzgruenden |

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
| GET | `/search?q=` | JWT | -- | Lieder per Abfrage suchen |
| GET | `/:id` | JWT | -- | Ein Lied nach ID abrufen |
| GET | `/` | JWT | Content.Edit | Alle Lieder auflisten |
| POST | `/` | JWT | Content.Edit | Lieder erstellen oder aktualisieren (Stapel) |
| POST | `/import` | JWT | -- | Lieder aus FreeShow importieren (Stapel) |
| DELETE | `/:id` | JWT | Content.Edit | Ein Lied loeschen |

## Liederdetails

Basispfad: `/content/songDetails`

Liederdetails sind global (nicht kirchenspezifisch). Diese repraesentieren kanonische Liedmetadaten, die kirchenuebergreifend geteilt werden.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | -- | Ein Liederdetail nach ID abrufen (global) |
| GET | `/` | JWT | -- | Liederdetails fuer die Kirche auflisten |
| POST | `/create` | JWT | -- | Ein Liederdetail aus einer PraiseCharts-ID erstellen (gibt vorhandenes zurueck, falls bereits erstellt). Ruft Metadaten automatisch von PraiseCharts und MusicBrainz ab |
| POST | `/` | JWT | -- | Liederdetails erstellen oder aktualisieren (Stapel) |

## Liederdetail-Links

Basispfad: `/content/songDetailLinks`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | -- | Einen Liederdetail-Link nach ID abrufen |
| GET | `/songDetail/:songDetailId` | JWT | -- | Alle Links fuer ein Liederdetail abrufen |
| POST | `/` | JWT | -- | Liederdetail-Links erstellen oder aktualisieren (Stapel). Ruft MusicBrainz-Daten automatisch ab, falls verlinkt |
| DELETE | `/:id` | JWT | -- | Einen Liederdetail-Link loeschen |

## Arrangements

Basispfad: `/content/arrangements`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | -- | Ein Arrangement nach ID abrufen |
| GET | `/song/:songId` | JWT | Content.Edit | Arrangements fuer ein Lied abrufen |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Arrangements fuer ein Liederdetail abrufen |
| GET | `/` | JWT | Content.Edit | Alle Arrangements auflisten |
| POST | `/` | JWT | Content.Edit | Arrangements erstellen oder aktualisieren (Stapel) |
| POST | `/freeShow/missing` | JWT | -- | FreeShow-IDs finden, die nicht in der Kirche existieren. Body: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Ein Arrangement loeschen (loescht auch Tonarten; loescht das Lied, wenn keine Arrangements mehr vorhanden sind) |

## Arrangement-Tonarten

Basispfad: `/content/arrangementKeys`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:id` | Oeffentlich | -- | Arrangement-Tonart mit vollstaendigen Liederdaten fuer die Presenter-Ansicht abrufen |
| GET | `/:id` | JWT | -- | Eine Arrangement-Tonart nach ID abrufen |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Tonarten fuer ein Arrangement abrufen |
| GET | `/` | JWT | Content.Edit | Alle Arrangement-Tonarten auflisten |
| POST | `/` | JWT | Content.Edit | Arrangement-Tonarten erstellen oder aktualisieren (Stapel) |
| DELETE | `/:id` | JWT | Content.Edit | Eine Arrangement-Tonart loeschen |

## Einstellungen

Basispfad: `/content/settings`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | -- | Einstellungen des aktuellen Benutzers abrufen |
| GET | `/` | JWT | Settings.Edit | Alle Einstellungen der Kirche abrufen |
| GET | `/public/:churchId` | Oeffentlich | -- | Oeffentliche Einstellungen einer Kirche abrufen (als Schluessel-Wert-Paare zurueckgegeben) |
| POST | `/my` | JWT | -- | Benutzerbezogene Einstellungen speichern (unterstuetzt Base64-Bild-Upload) |
| POST | `/` | JWT | Settings.Edit | Kirchenbezogene Einstellungen speichern (unterstuetzt Base64-Bild-Upload) |
| DELETE | `/my/:id` | JWT | -- | Eine Benutzereinstellung loeschen |

## Vorschau

Basispfad: `/content/preview`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/data/:key` | Oeffentlich | -- | Streaming-Vorschaudaten fuer eine Kirche nach Subdomain-Schluessel laden (Registerkarten, Links, Dienste, Predigten) |

## Galerie (Stock-Fotos)

Basispfad: `/content/stock`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/search` | Oeffentlich | -- | Pexels-Stock-Fotos durchsuchen. Body: `{ term: "church" }` |

## PraiseCharts

Basispfad: `/content/praiseCharts`

Integration mit PraiseCharts zur Entdeckung von Lobpreisliedern und zum Herunterladen von Noten.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/raw/:id` | JWT | -- | Rohdaten von PraiseCharts fuer ein Lied abrufen |
| GET | `/hasAccount` | JWT | -- | Pruefen, ob der Benutzer ein verknuepftes PraiseCharts-Konto hat |
| GET | `/search?q=` | JWT | -- | Den PraiseCharts-Katalog durchsuchen |
| GET | `/products/:id?keys=` | JWT | -- | Produkte fuer ein Lied abrufen (aus der Bibliothek, falls authentifiziert, sonst aus dem Katalog) |
| GET | `/arrangement/raw/:id?keys=` | JWT | -- | Rohe Arrangement-Daten aus der Bibliothek abrufen |
| GET | `/download?skus=&keys=&file_name=` | JWT | -- | Eine Datei von PraiseCharts herunterladen (PDF oder ZIP). Gibt `{ redirectUrl }` zurueck |
| GET | `/authUrl?returnUrl=` | Oeffentlich | -- | OAuth-Autorisierungs-URL fuer PraiseCharts abrufen |
| GET | `/access?verifier=&token=&secret=` | JWT | -- | OAuth-Verifier gegen ein Zugriffstoken tauschen und in den Benutzereinstellungen speichern |
| GET | `/library` | JWT | -- | Die PraiseCharts-Bibliothek des Benutzers durchsuchen |

## Support

Basispfad: `/content/support`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/createAudio` | Oeffentlich | -- | SSML mit AWS Polly in MP3-Audio umwandeln. Body: `{ ssml: "<speak>...</speak>" }` |

## Verwandte Seiten

- Website-Builder-Architektur -- Wie Seiten, Abschnitte, Elemente, Beitraege und Weiterleitungen ueber die Apps hinweg zusammenpassen
- Mitgliedschafts-Endpunkte -- Personen, Kirchen, Gruppen, Rollen, Berechtigungen
- Anwesenheits-Endpunkte -- Dienst- und Besuchsverfolgung
- Authentifizierung & Berechtigungen -- Anmeldeablauf, JWT, Berechtigungsmodell
- Modulstruktur -- Code-Organisationsmuster
