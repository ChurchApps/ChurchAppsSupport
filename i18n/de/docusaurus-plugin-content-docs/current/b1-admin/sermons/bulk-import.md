---
title: "Massenimport"
description: "Importieren Sie Predigtvideos gesammelt aus einem YouTube-Kanal oder einem Vimeo-Konto oder Podcast-Episoden aus einem RSS-Feed in B1 Admin und sortieren Sie sie anschließend in eine Wiedergabeliste."
---

# Massenimport

<div class="article-intro">

Auf der Seite Massenimport füllen Sie Ihre Predigtbibliothek schnell, indem Sie Videos von YouTube oder Vimeo oder Episoden aus einem Podcast-RSS-Feed importieren. Das ist der schnellste Weg, bestehende Predigtinhalte zu übernehmen, statt jede Predigt einzeln hinzuzufügen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Berechtigung **Gottesdienste bearbeiten** im Abschnitt **Inhalt** Ihrer Rolle. Falls Sie keinen Zugriff haben, lesen Sie [Rollen und Berechtigungen](../settings/roles-permissions.md).
- Legen Sie mindestens eine [Wiedergabeliste](./playlists.md) an, in die Sie Ihre Predigten importieren
- Halten Sie Ihre YouTube-Kanal-ID, Ihre Vimeo-Kontodaten oder die Feed-Adresse Ihres Podcasts bereit

</div>

## Die Quelle auswählen {#choosing-your-source}

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Predigten** auf und klicken Sie auf **Predigten**. Klicken Sie auf **Predigt hinzufügen** und wählen Sie im Menü **Massenimport**.
2. Unter **Importquelle wählen** stehen Ihnen drei Optionen zur Verfügung:
   - **YouTube** -- Videos aus einem YouTube-Kanal importieren
   - **Vimeo** -- Videos aus einem Vimeo-Konto importieren
   - **Podcast-RSS-Feed** -- Episoden aus einem Podcast-Feed als Audio-Predigten importieren
3. Klicken Sie auf die Option der Plattform, auf der Ihre Predigten gehostet werden (oder klicken Sie unter deren Beschreibung auf **Von YouTube importieren**, **Von Vimeo importieren** bzw. **Von Podcast-Feed importieren**). Mit **Zurück** oben auf der Seite kehren Sie zur Auswahl der Quelle zurück.

:::tip
Wenn Ihre Videos auf beiden Plattformen liegen, können Sie jederzeit zurückgehen und die Quelle wechseln.
:::

## Vor dem Import {#before-you-import}

Bevor Sie Videos importieren, brauchen Sie mindestens eine Wiedergabeliste, in die Sie sie einordnen. Falls Sie noch keine Wiedergabeliste angelegt haben:

1. Gehen Sie zurück zur Seite **Predigten** und suchen Sie das Feld **Wiedergabelisten**.
2. Klicken Sie auf **Erste Wiedergabeliste erstellen** und tragen Sie Name, Beschreibung, Veröffentlichungsdatum und Vorschaubild ein.
3. Klicken Sie auf **Speichern** und kehren Sie dann zum Massenimport zurück, indem Sie auf **Predigt hinzufügen** klicken und **Massenimport** wählen.

Ausführliche Anleitungen zum Anlegen und Verwalten von Wiedergabelisten finden Sie unter [Wiedergabelisten](./playlists.md).

## Videos importieren {#importing-videos}

1. Nachdem Sie YouTube oder Vimeo gewählt haben, geben Sie Ihre **YouTube-Kanal-ID** bzw. Ihre **Vimeo-Kanal-ID** in das vorgesehene Feld ein.
2. Klicken Sie auf die Schaltfläche **Abrufen**, um die Videos aus Ihrem Kanal zu laden. Können die Videos nicht geladen werden oder enthält der Kanal keine, erscheint eine entsprechende Meldung. Prüfen Sie dann die ID und versuchen Sie es erneut.
3. Nach dem Abrufen sehen Sie eine Liste Ihrer Videos, jeweils mit einem Kontrollkästchen unter **Importieren**.
4. Aktivieren Sie das Kontrollkästchen neben jedem Video, das Sie importieren möchten.
5. Klicken Sie auf das Auswahlfeld **In Wiedergabeliste importieren**, um festzulegen, in welche Wiedergabeliste diese Videos aufgenommen werden sollen.
6. Klicken Sie auf die Schaltfläche **Importieren**, um den Massenimport abzuschließen. Wenn der Vorgang beendet ist, kehren Sie zur Auswahl der Quelle zurück.

Wenn Sie auf **Importieren** klicken, ohne eine Wiedergabeliste zu wählen oder Videos anzuhaken, fordert B1 Sie zuerst dazu auf. Mit **Abbrechen** verlassen Sie die Seite, ohne zu importieren.

Ihre Videos werden mit allen Angaben übernommen, einschließlich Titel, Beschreibungen, Daten und Vorschaubilder. Sonderzeichen in YouTube-Titeln und -Beschreibungen, etwa `&`, Apostrophe und Anführungszeichen, werden so übernommen, wie sie geschrieben sind, und nicht als Codes wie `&amp;` dargestellt.

:::info
Der Massenimport eignet sich ideal für den Einstieg, wenn Sie von einer anderen Plattform umziehen. Für das Hinzufügen einzelner Predigten im weiteren Verlauf nutzen Sie stattdessen die Seite [Predigten verwalten](./managing-sermons.md).
:::

## Podcast-Episoden importieren {#importing-podcast-episodes}

Wenn Ihre Predigten als Podcast veröffentlicht werden (Spotify for Podcasters / Anchor, Buzzsprout, Podbean und so weiter), können Sie die Episoden als Audio-Predigten übernehmen.

1. Wählen Sie **Podcast-RSS-Feed** und fügen Sie die Adresse Ihres Feeds in das Feld **Podcast-Feed-URL** ein. So finden Sie die Adresse:
   - **Spotify for Podcasters (Anchor)** -- **Einstellungen** > **Verfügbarkeit** > **RSS-Verteilung**. Die Adresse sieht etwa so aus: `https://anchor.fm/s/…/podcast/rss`.
   - **Buzzsprout** -- der Link **RSS Feed** auf dem Dashboard Ihres Podcasts.
   - Die meisten anderen Anbieter zeigen die RSS-Feed-Adresse in den Einstellungen des Podcasts oder auf der Seite für die Verteilung an.
2. Klicken Sie auf **Abrufen**. Der Name des Podcasts erscheint über einer Liste seiner Episoden mit deren Veröffentlichungsdaten. Kann der Feed nicht geladen werden oder enthält er keine Audio-Episoden, erscheint eine Meldung. Prüfen Sie dann die Adresse und versuchen Sie es erneut.
3. Neue Episoden sind für Sie bereits angehakt. Episoden, die bereits in Ihrer Predigtbibliothek stehen, sind mit **Bereits importiert** markiert und lassen sich nicht anhaken, sodass nichts doppelt hinzugefügt wird.
4. Entfernen Sie den Haken bei Episoden, die Sie nicht möchten, wählen Sie unter **In Wiedergabeliste importieren** eine Wiedergabeliste aus und klicken Sie auf **Importieren**.

Jede Episode wird als Audio-Predigt mit Titel, Beschreibung, Datum, Cover und Länge angelegt. Mitglieder sehen bei diesen Predigten in der B1-App **Anhören** und **Audio herunterladen**.

Der Import ist eine einmalige Kopie und keine Live-Verbindung zum Feed. Wenn Sie neue Episoden veröffentlichen, starten Sie den Import einfach erneut mit derselben Feed-Adresse; nur die neuen Episoden werden geprüft.

:::note
Es wird nur Audio importiert. Video-Podcast-Episoden werden nicht übernommen; fügen Sie diese über YouTube, Vimeo oder [Predigten verwalten](./managing-sermons.md) hinzu.
:::

:::tip
Möchten Sie eine Liste auf Ihrer Website oder in Ihrer App, die Ihren Podcast ohne erneuten Import immer widerspiegelt? Fügen Sie auf einer Seite im Website-Builder das Element **Podcast** hinzu und binden Sie diese Seite anschließend als Reiter **Seite** in Ihrer mobilen App ein.
:::

## Nächste Schritte {#next-steps}

- [Predigten verwalten](./managing-sermons.md) -- Details importierter Predigten bearbeiten
- [Wiedergabelisten](./playlists.md) -- Predigtreihen anlegen und verwalten
- [Livestreaming](./live-streaming.md) -- Livestreaming für Ihre Gottesdienste einrichten
