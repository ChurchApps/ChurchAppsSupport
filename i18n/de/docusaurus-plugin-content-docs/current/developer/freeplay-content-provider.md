---
title: "FreePlay Content Provider"
---

# FreePlay Content Provider

<div class="article-intro">

FreePlay ist der Mediaplayer von ChurchApps zum Streamen von Lektionen und anderen Videoinhalten auf Telefonen, Tablets und Fernsehern. Wenn Sie eine Bibliothek mit Lektionsinhalten haben und diese in FreePlay verfügbar machen möchten, deckt diese Anleitung alles ab, was Sie bereitstellen müssen.

</div>

## Branding

Bevor die Integration beginnen kann, benötigen wir:

- **Logo** -- Ein Logo-Bild im **16:9**-Seitenverhältnis (wird für Anbieter-Karten in der FreePlay-UI verwendet)
- **Markenname** -- Der bevorzugte Name zur Anzeige Ihrer Organisation in FreePlay

## API-Endpunkte

FreePlay kommuniziert mit Ihrem Service über einen kleinen Satz von REST-Endpunkten. Wir schreiben einen benutzerdefinierten Adapter für jeden Anbieter, sodass die genaue URL-Struktur flexibel ist -- aber die folgenden Informationen benötigen wir.

### Authentifizierung

Wählen Sie das Modell, das zu Ihrem Inhalt passt:

| Modell | Wann verwenden | Was wir benötigen |
|--------|----------------|-------------------|
| **None** | Öffentlicher Inhalt, keine Anmeldung erforderlich | Nichts -- wir rufen Ihre Katalog-Endpunkte direkt auf |
| **OAuth (PKCE)** | Web-/Mobile-Anmeldung | Autorisierungs-URL, Token-Austausch-Endpunkt, Client-ID, Scopes |
| **Device Flow** | Bevorzugt für TV-Apps (Benutzer gibt einen kurzen Code auf seinem Telefon ein) | Geräteautorisierungs-Endpunkt, Token-Polling-Endpunkt, Client-ID |

:::tip
Wenn Ihr Inhalt Authentifizierung erfordert, gibt der Auth-Endpunkt einen **User Token** zurück, den FreePlay an die Browse- und Lesson-Endpunkte weitergibt, um den Zugriff zu autorisieren.
:::

### Browse / Catalog

Ein Endpunkt (oder eine Reihe von Endpunkten), der einen **Ordnerbaum** aller verfügbaren Lektionen zurückgibt.

- Dies kann ein **einzelner Aufruf** sein, der den gesamten Baum zurückgibt, oder **mehrere Aufrufe**, bei denen jeder eine Ebene zurückgibt, während der Benutzer tiefer navigiert.
- Jedes Element im Baum sollte enthalten:

| Feld | Erforderlich | Beschreibung |
|------|--------------|--------------|
| `id` | Ja | Eine eindeutige Kennung für den Ordner |
| `name` | Ja | Anzeigename für den Ordner |
| `thumbnail` | Empfohlen | Eine **16:9**-Miniaturansichts-URL |

### Lesson Playlist

Ein Endpunkt, der die **Wiedergabeliste der Mediendateien** für eine einzelne Lektion zurückgibt.

Jedes Element in der Wiedergabeliste sollte enthalten:

| Feld | Erforderlich | Beschreibung |
|------|--------------|--------------|
| `title` | Ja | Anzeigetitel des Medienelements |
| `mediaType` | Ja | `video` oder `image` |
| `url` | Ja | Direkter Download-Link zur Datei (siehe [Media Formats](#media-formats) unten) |
| `thumbnail` | Empfohlen | Ein Miniaturbild für das Element |
| `duration` | Empfohlen | Dauer in Sekunden (für Videos) |

## Medienformate

FreePlay lädt Dateien direkt herunter, sodass jedes Medienelement einen **direkten Link** haben muss (keine eingebetteten Player oder Seitenweiterleitungen).

| Typ | Akzeptierte Formate |
|-----|---------------------|
| Video | **MP4** (erforderlich für plattformübergreifende Wiedergabe auf Apple- und Android-Geräten) |
| Bild | JPG, PNG oder GIF |

## Hinweise

- Eine **REST-API, die JSON zurückgibt**, ist das typische Integrationsmuster, aber da wir für jeden Anbieter einen benutzerdefinierten Adapter schreiben, können wir mit praktisch jedem API-Format arbeiten.
- Wenn Sie daran interessiert sind, ein FreePlay-Content-Provider zu werden, wenden Sie sich über [Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) oder öffnen Sie ein Issue auf [GitHub](https://github.com/ChurchApps/ChurchAppsSupport/issues).
