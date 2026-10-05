---
title: "Predigten verwalten"
---

# Predigten verwalten

<div class="article-intro">

Die Seite Predigten zeigt Ihre gesamte Predigtensammlung an. Von hier aus können Sie neue Predigten hinzufügen, vorhandene Einträge bearbeiten und Ihre Inhalte nach Playlist organisieren. Jede Predigt kann mit Video- oder Audiodateien verlinkt werden, die auf YouTube, Vimeo, Facebook oder einer benutzerdefinierten URL gehostet werden.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Berechtigung **contentApi.streamingServices.edit**. Siehe [Rollen & Berechtigungen](../settings/roles-permissions.md), wenn Sie keinen Zugriff haben.
- Erstellen Sie mindestens eine [Playlist](playlists), um Ihre Predigten zu organisieren
- Halten Sie Ihre Video-IDs oder URLs von YouTube, Vimeo oder Facebook bereit

</div>

## Ihre Predigtensammlung anzeigen

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), erweitern Sie **Predigten** und klicken Sie auf **Predigten**.
2. Die Seite Predigten zeigt alle Ihre Predigteneinträge, organisiert nach Playlisten. Jede Predigt zeigt ihr Vorschaubild, Titel und Datum an.
3. Klicken Sie auf eine beliebige Predigt, um ihre Details anzusehen oder zu bearbeiten.

## Eine Predigt hinzufügen

1. Klicken Sie auf die Schaltfläche **Predigt hinzufügen** in der oberen rechten Ecke und wählen Sie **Predigt hinzufügen** aus dem Dropdown-Menü.
2. Wählen Sie eine **Playlist** aus, der Sie die Predigt zuweisen möchten.
3. Wählen Sie Ihren **Videoanbieter** -- YouTube, Vimeo, Facebook oder benutzerdefinierte URL. Wir empfehlen YouTube, da es am besten mit dem B1-System funktioniert.
4. Geben Sie die Video-ID oder URL ein und klicken Sie auf **Abrufen**. Bei YouTube ist die Video-ID die Zeichenfolge nach `v=` in der YouTube-URL.
5. Wenn Sie auf **Abrufen** klicken, werden die Predigtendetails automatisch importiert, einschließlich Veröffentlichungsdatum, Dauer, Titel, Beschreibung und Vorschaubild.
6. Nehmen Sie die gewünschten Änderungen vor und klicken Sie auf **Speichern**.

:::tip
Sie können auch eine permanente Live-Stream-URL hinzufügen, indem Sie im Dropdown-Menü **Predigt hinzufügen** die Option **Permanente Live-Stream-URL hinzufügen** auswählen. Dies erstellt eine dauerhafte Verbindung zum Live-Stream Ihres YouTube-Kanals unter Verwendung Ihrer Kanal-ID. Weitere Details finden Sie unter [Live Streaming](live-streaming).
:::

## Eine Predigt bearbeiten

1. Klicken Sie auf eine beliebige Predigt in Ihrer Sammlung, um ihre Details zu öffnen.
2. Aktualisieren Sie den Titel, den Sprecher, das Datum, die Beschreibung, das Vorschaubild oder die Medienlinks nach Bedarf.
3. Klicken Sie auf **Speichern**, um Ihre Änderungen zu übernehmen.

## Predigtendetails

Jeder Predigteintrag kann enthalten:

- **Titel** -- Der Name der Predigt, der den Besuchern angezeigt wird
- **Sprecher** -- Wer die Predigt gehalten hat
- **Datum** -- Das Veröffentlichungs- oder Lieferdatum
- **Beschreibung** -- Eine Zusammenfassung des Predigteninhalts
- **Vorschaubild** -- Ein Vorschaubild, das in Ihrer Predigtensammlung angezeigt wird
- **Video-/Audio-Links** -- URLs zu den Predigtenmedien auf YouTube, Vimeo, Facebook oder einem benutzerdefinierten Host
- **Audio-Datei-URL (für Podcast)** -- Ein direkter Link zu einer MP3/M4A-Datei für diese Predigt. Fügen Sie entweder eine URL ein oder klicken Sie auf **Audio hochladen**, um eine Datei hochzuladen und sie automatisch auszufüllen. Nur Predigten mit diesem Feld (oder einem direkten Video-Dateilink) sind in Ihrem Podcast-Feed enthalten.

## Ihr Podcast-Feed

Sobald mindestens eine Predigt eine Audio- oder Videodatei angehängt hat, generiert B1 Admin automatisch einen Podcast-RSS-Feed für Ihre Kirche -- es ist nichts zu aktivieren. Finden Sie ihn im Panel **Podcast-Feed** unterhalb der Predigtenlist: Klicken Sie auf das Kopiersymbol, um die Feed-URL zu kopieren, und senden Sie diese URL dann an Apple Podcasts, Spotify oder ein anderes Podcast-Verzeichnis.

:::info
Predigten, die nur zu einem eingebetteten Player verlinken (wie eine YouTube- oder Vimeo-Video-ID), werden nicht im Podcast-Feed angezeigt -- Podcast-Apps benötigen eine direkte, herunterladbare Mediendatei. Fügen Sie eine **Audio-Datei-URL** hinzu, um eine Predigt einzubeziehen.
:::

## Eine Predigt für Live-Stream planen

Nach dem Hinzufügen einer Predigt können Sie diese für die Ausstrahlung auf Ihrer Live-Stream-Seite planen:

1. Wählen Sie im Sprungmenü **Predigten > Live-Stream-Zeiten**.
2. Bearbeiten Sie einen Service und wählen Sie unter **Videoeinstellungen** Ihre Predigt aus dem Dropdown-Menü aus.
3. Die Predigt wird zur geplanten Servicezeit abgespielt.

:::info
Um mehrere Predigten gleichzeitig zu importieren, anstatt sie einzeln hinzuzufügen, verwenden Sie das Tool [Massenimport](bulk-import), um Videos direkt von Ihrem YouTube- oder Vimeo-Konto zu ziehen.
:::

## Nächste Schritte

- [Playlisten](playlists) -- Predigten in Serien organisieren
- [Live Streaming](live-streaming) -- Konfigurieren Sie Ihren Streaming-Zeitplan
- [Massenimport](bulk-import) -- Importieren Sie mehrere Predigten auf einmal
