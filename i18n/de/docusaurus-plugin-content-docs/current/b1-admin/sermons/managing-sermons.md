---
title: "Predigten verwalten"
description: "Verwalten Sie Ihre Predigtbibliothek in B1 Admin: Fügen Sie Predigten von YouTube, Vimeo oder Facebook hinzu, bearbeiten Sie die Details und erhalten Sie einen Podcast-Feed für Ihre Gemeinde."
---

# Predigten verwalten

<div class="article-intro">

Die Seite Predigten zeigt Ihre gesamte Predigtbibliothek. Hier können Sie neue Predigten hinzufügen, bestehende Einträge bearbeiten und Ihre Inhalte nach Wiedergabelisten ordnen. Jede Predigt kann auf Video oder Audio verlinken, das auf YouTube, Vimeo, Facebook oder einer eigenen URL gehostet wird.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Berechtigung **Gottesdienste bearbeiten** im Abschnitt **Inhalt** Ihrer Rolle. Falls Sie keinen Zugriff haben, lesen Sie [Rollen und Berechtigungen](../settings/roles-permissions.md).
- Legen Sie mindestens eine [Wiedergabeliste](./playlists.md) an, um Ihre Predigten zu ordnen
- Halten Sie die Video-IDs oder URLs von YouTube, Vimeo oder Facebook bereit

</div>

## Ihre Predigtbibliothek anzeigen {#viewing-your-sermon-library}

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Predigten** auf und klicken Sie auf **Predigten**.
2. Die Seite Predigten zeigt Ihre Predigteinträge in einer Tabelle mit der **Wiedergabeliste**, dem Titel (**Predigt**) und dem **Veröffentlichungsdatum** jeder Predigt, die neueste zuerst, mit einer Anzahl wie „11 von 11 Predigten“. Geben Sie in das Feld **Predigten nach Titel oder Wiedergabeliste suchen...** ein, um die Liste zu filtern. Ihre Wiedergabelisten werden in einem Feld **Wiedergabelisten** neben der Tabelle angezeigt, darunter das Feld **Podcast-Feed**.
3. Fahren Sie mit der Maus über eine Predigtzeile und klicken Sie auf **Bearbeiten**, um die Details anzuzeigen oder zu ändern.

## Eine Predigt hinzufügen {#adding-a-sermon}

1. Klicken Sie oben rechts auf die Schaltfläche **Predigt hinzufügen** und wählen Sie im Dropdown-Menü **Predigt hinzufügen**. Oberhalb der Liste öffnet sich ein Formular **Predigt bearbeiten**.
2. Wählen Sie eine **Wiedergabeliste**, der Sie die Predigt zuordnen möchten (oder belassen Sie die Auswahl bei **Keine**).
3. Wählen Sie Ihren **Videoanbieter** -- **YouTube**, **Vimeo**, **Facebook** oder **Eigene Einbettungs-URL**. Wir empfehlen YouTube, da es am besten mit dem B1-System funktioniert.
4. Geben Sie die **YouTube-ID**, **Vimeo-ID**, **Predigt-ID** (Facebook) oder **Predigt-Einbettungs-URL** des Videos ein. Sie können den gesamten Videolink einfügen; B1 übernimmt nur die ID. Bei YouTube ist die Video-ID die Zeichenfolge nach `v=` in der YouTube-URL.
5. Klicken Sie bei YouTube und Vimeo auf **Abrufen**, um die Predigtdetails automatisch zu importieren, einschließlich Veröffentlichungsdatum, Dauer, Titel, Beschreibung und Vorschaubild. Können die Details nicht geladen werden, erscheint eine Meldung, und Sie können sie selbst eintragen.
6. Nehmen Sie gewünschte Änderungen vor und klicken Sie auf **Speichern**.

:::tip
Sie können auch eine dauerhafte Live-Stream-URL hinzufügen, indem Sie im Dropdown-Menü **Predigt hinzufügen** die Option **Dauerhafte Live-URL hinzufügen** wählen. Dadurch entsteht eine dauerhafte Verbindung zum Livestream Ihres YouTube-Kanals über Ihre Kanal-ID. Weitere Details finden Sie unter [Livestreaming](./live-streaming.md).
:::

## Eine Predigt bearbeiten {#editing-a-sermon}

1. Klicken Sie in Ihrer Bibliothek bei einer beliebigen Predigtzeile auf **Bearbeiten**, um deren Details zu öffnen.
2. Aktualisieren Sie bei Bedarf Titel, Datum, Beschreibung, Vorschaubild, Dauer oder Medienlinks.
3. Klicken Sie auf **Speichern**, um Ihre Änderungen zu übernehmen, oder auf **Abbrechen**, um das Formular zu schließen.

Um eine Predigt zu entfernen, öffnen Sie sie, klicken Sie auf **Löschen** und bestätigen Sie.

### Eine Predigt einer weiteren Wiedergabeliste hinzufügen {#adding-a-sermon-to-another-playlist}

Um dieselbe Predigt in einer zweiten Wiedergabeliste aufzuführen (zum Beispiel eine Predigt, die sowohl zu einer Reihe als auch zu einer Sammlung „Die besten“ gehört), öffnen Sie die Predigt, klicken Sie auf **Zu einer weiteren Wiedergabeliste hinzufügen**, wählen Sie die Wiedergabeliste und klicken Sie auf **Hinzufügen**. Dadurch wird eine Kopie der Predigt in dieser Wiedergabeliste gespeichert.

## Predigtdetails {#sermon-details}

Jeder Predigteintrag kann Folgendes enthalten:

- **Wiedergabeliste** -- Die Reihe, zu der die Predigt gehört
- **Videoanbieter** und Video-ID -- Wo das Predigtvideo gehostet wird: YouTube, Vimeo, Facebook oder eine eigene Einbettungs-URL
- **Veröffentlichungsdatum** -- Das Datum, an dem die Predigt veröffentlicht wird; Predigten ohne Datum zeigen in der Liste **Nicht geplant**
- **Gesamtdauer der Predigt** -- Die Länge der Predigt in Minuten und Sekunden
- **Vorschaubild** -- Ein Vorschaubild, das in Ihrer Predigtbibliothek angezeigt wird. Klicken Sie auf das Bild, um es zuzuschneiden oder zu ersetzen (16:9).
- **Titel** -- Der Predigtname, der Besuchern angezeigt wird
- **Beschreibung** -- Eine Zusammenfassung des Predigtinhalts
- **Audiodatei-URL (für Podcast)** -- Ein direkter Link zu **einer** MP3- oder M4A-Datei für diese Predigt. Hier gehört keine Feed-Adresse eines Podcasts hin; ein dort eingefügter Feed wird nicht abgespielt. Um einen ganzen Podcast zu übernehmen, verwenden Sie den [Massenimport](./bulk-import.md#importing-podcast-episodes). Fügen Sie entweder eine URL ein oder klicken Sie, sobald die Predigt gespeichert ist, auf **Audio hochladen**, um eine Datei hochzuladen und das Feld automatisch auszufüllen. In Ihren Podcast-Feed werden nur Predigten aufgenommen, bei denen dieses Feld (oder ein direkter Link zu einer Videodatei) gesetzt ist.

## Ihr Podcast-Feed {#your-podcast-feed}

Sobald mindestens eine Predigt eine Audio- oder Videodatei angehängt hat, erstellt B1 Admin automatisch einen RSS-Podcast-Feed für Ihre Gemeinde – Sie müssen nichts aktivieren. Sie finden ihn im Feld **Podcast-Feed** neben der Predigtliste (unterhalb des Felds **Wiedergabelisten**): Klicken Sie auf das Kopiersymbol, um die Feed-URL zu kopieren, und reichen Sie diese URL dann bei Apple Podcasts, Spotify oder einem anderen Podcast-Verzeichnis ein.

:::info
Predigten, die nur auf einen eingebetteten Player verlinken (etwa über eine YouTube- oder Vimeo-Video-ID), erscheinen nicht im Podcast-Feed – Podcast-Apps benötigen eine direkte, herunterladbare Mediendatei. Fügen Sie eine **Audiodatei-URL** hinzu, um eine Predigt aufzunehmen.
:::

## Eine Predigt für den Livestream planen {#scheduling-a-sermon-for-live-stream}

Nachdem Sie eine Predigt hinzugefügt haben, können Sie sie für die Übertragung auf Ihrer Livestream-Seite planen:

1. Wählen Sie im Sprungmenü **Predigten > Livestream-Zeiten**.
2. Bearbeiten Sie einen Gottesdienst und wählen Sie unter **Videoeinstellungen** im Dropdown-Menü **Predigt** Ihre Predigt aus.
3. Die Predigt wird zur geplanten Gottesdienstzeit abgespielt.

:::info
Um mehrere Predigten auf einmal statt einzeln hinzuzufügen, verwenden Sie das Werkzeug [Massenimport](./bulk-import.md), um Videos direkt aus Ihrem YouTube- oder Vimeo-Konto zu übernehmen.
:::

## Nächste Schritte {#next-steps}

- [Wiedergabelisten](./playlists.md) -- Predigten zu Reihen ordnen
- [Livestreaming](./live-streaming.md) -- Ihren Streaming-Zeitplan konfigurieren
- [Massenimport](./bulk-import.md) -- Mehrere Predigten auf einmal importieren
