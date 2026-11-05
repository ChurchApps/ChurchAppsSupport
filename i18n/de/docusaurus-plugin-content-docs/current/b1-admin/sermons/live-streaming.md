---
title: "Livestreaming"
---

# Livestreaming

<div class="article-intro">

Die Seite Livestream-Zeiten lässt Sie den Streaming-Zeitplan Ihrer Kirche festlegen, Gottesdienstzeiten verwalten und das Erlebnis für Zuschauer gestalten. Richten Sie wiederkehrende wöchentliche Gottesdienste oder einmalige Veranstaltungen ein, konfigurieren Sie Chat- und Videoeinstellungen und bestimmen Sie, wann Ihr Stream live geht.

</div>

## Einführungsvideo

<YouTube id="tpEY-sEYW6A" title="Einrichtung von Livestreaming in B1" next="Die Mitglieder-App Ihrer Kirche in B1 anpassen" nextUrl="/docs/b1-admin/settings/mobile-app" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Berechtigung **contentApi.streamingServices.edit**. Falls Sie keinen Zugriff haben, lesen Sie [Rollen und Berechtigungen](../settings/roles-permissions.md).
- Halten Sie Ihre YouTube-Kanal-ID bereit, wenn Sie automatisches Livestreaming nutzen möchten
- Fügen Sie mindestens eine [Predigt](managing-sermons) oder eine dauerhafte Live-URL als Stream-Quelle hinzu

</div>

Livestreaming wird über zwei Seiten im Bereich **Predigten** des Sprungmenüs verwaltet: **Livestream-Zeiten** für den Zeitplan Ihres Live-Streams und **Einstellungen** für die Reiter Ihrer Streaming-Seite.

## Gottesdienste verwalten

### Einen Gottesdienst hinzufügen

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Predigten** auf und klicken Sie auf **Livestream-Zeiten**.
2. Klicken Sie oben auf der Seite auf die Schaltfläche **Gottesdienst hinzufügen**, um einen neuen geplanten Gottesdienst anzulegen. Vorhandene Gottesdienste sind in einer Tabelle aufgelistet, die Name, Zeit, Anbieter und Dauer jedes Gottesdienstes zeigt. Klicken Sie auf das Bearbeitungssymbol einer Zeile, um sie zu ändern.
3. Geben Sie einen **Gottesdienstnamen** ein (zum Beispiel "Sonntagsgottesdienst").
4. Legen Sie die **Gottesdienstzeit** fest -- wählen Sie den Tag und die Uhrzeit, zu der Ihr Gottesdienst beginnt.
5. Setzen Sie **Wöchentlich wiederholen** auf **Ja** für regelmäßige wöchentliche Gottesdienste oder auf **Nein** für eine einmalige Veranstaltung.

### Chat- und Videoeinstellungen konfigurieren

6. Legen Sie unter **Chat-Einstellungen** fest, wie viele Minuten vor und nach dem Gottesdienst der Chat aktiviert sein soll. So können Besucher schon vor Beginn chatten und danach weitermachen.
7. Legen Sie unter **Video-Einstellungen** fest, wie früh der Videostream für einen Countdown oder Inhalte vor dem Gottesdienst starten soll. Der Chat öffnet sich so viele Minuten *vor* dem frühen Videostart, daher zählt die Anzeige neben der Einstellung "Minuten vor dem Gottesdienst" beide Werte zusammen. Beispiel: Bei einem Gottesdienst um 10:00 Uhr mit 15 Minuten Chat vorher und einem Videostart 5 Minuten früher öffnet sich der Chat um 9:40 Uhr.
8. Wählen Sie im Dropdown-Menü aus, welche Predigt abgespielt werden soll:
   - **Neueste Predigt** -- Spielt automatisch Ihr zuletzt hinzugefügtes Video ab.
   - **Aktueller Live-Gottesdienst** -- Spielt Ihren aktuellen Live-Stream von YouTube über Ihre Kanal-ID ab.
   - Sie können auch eine bestimmte Predigt wählen, die Sie bereits gespeichert haben.
9. Klicken Sie auf **Speichern**, um Ihren Gottesdienst zu planen.

:::info
Ihr Gottesdienst wird bei Wiederholung jede Woche automatisch aktualisiert. Er bleibt bei Beginn und Ende der Sommerzeit zur gleichen Ortszeit. Sie können beliebig viele Gottesdienste hinzufügen. Besucher sehen auf Ihrer Streaming-Seite den nächsten geplanten Gottesdienst.
:::

## Einstellungen der Streaming-Seite

Um die Reiter und Links neben Ihrem Live-Stream anzupassen, öffnen Sie das Sprungmenü, klappen **Predigten** auf und klicken auf **Einstellungen**. Die Seite **Stream-Einstellungen** zeigt Ihre Liste **Inhaltsreiter**.

### Reiter hinzufügen

1. Klicken Sie auf die Schaltfläche **Hinzufügen**, um einen neuen Reiter auf Ihrer Livestream-Seite anzulegen.
2. Wählen Sie einen **Linktyp**: **Externe URL** für einen eigenen Link oder einen der vorgefertigten Reiter **Chat** oder **Gebet**.
3. Beim Chat-Reiter genügt es, im Feld **Reitertext** einen Namen einzugeben -- die Einrichtung ist damit abgeschlossen.
4. Bei einem Link-Reiter geben Sie den Namen des Reiters ein, wählen ein Symbol, indem Sie auf die Symbolschaltfläche klicken, und tragen die URL ein.
5. Ihre konfigurierten Reiter erscheinen auf der Livestream-Seite, damit Zuschauer zusätzliche Inhalte und interaktive Funktionen nutzen können.

### Ihren Stream in der Vorschau ansehen

Klicken Sie auf der Seite **Livestream-Zeiten** oben auf **Ihren Stream anzeigen**, um genau zu sehen, wie Ihre Livestream-Seite für Besucher aussieht -- einschließlich Logo, Gottesdienstzeiten und konfigurierter Reiter.

## YouTube-Livestream einrichten

Um Ihren YouTube-Kanal für automatisches Livestreaming zu verbinden:

1. Gehen Sie zu **Predigten** und klicken Sie auf **Predigt hinzufügen**, dann wählen Sie **Dauerhafte Live-URL hinzufügen**.
2. Der Videoanbieter ist standardmäßig **Aktueller YouTube-Livestream**. Geben Sie Ihre **YouTube-Kanal-ID** ein.
3. Fügen Sie einen Titel und eine Beschreibung hinzu und klicken Sie dann auf **Speichern**.
4. Erstellen Sie unter **Livestream-Zeiten** einen Gottesdienst und wählen Sie im Dropdown-Menü der Predigt Ihre dauerhafte Live-URL aus.

:::tip
Ihre YouTube-Kanal-ID finden Sie in den erweiterten Einstellungen Ihres YouTube-Kanals. Dort kopieren Sie den Wert der Kanal-ID.
:::

## Farben und Logo anpassen

Ihre Livestream-Seite verwendet die Einstellungen [Erscheinungsbild](../website/appearance) Ihrer Website:

- Die **helle Akzentfarbe** mit dunkler Schrift wird für die Kopfzeile verwendet.
- Die **dunkle Akzentfarbe** mit heller Schrift wird für die Seitenleiste verwendet.
- Ihr **Logo für helle Hintergründe** erscheint auf der Streaming-Seite. Verwenden Sie ein Bild mit transparentem Hintergrund und einem Seitenverhältnis von 4:1.

Um diese Einstellungen zu ändern, öffnen Sie **Website** und dann **Erscheinungsbild** und passen Sie Ihre [Farbpalette](../website/appearance#color-palette) und die [Logo](../website/appearance#logo-and-branding)-Einstellungen an.

## Streaming-Hosts hinzufügen

Damit Teammitglieder neben dem öffentlichen Chat auch den Chat nur für Hosts nutzen können:

1. Wählen Sie im Sprungmenü **Einstellungen > Rollen**.
2. Klicken Sie auf die Plus-Schaltfläche und wählen Sie **Benutzerdefinierte Rolle hinzufügen**.
3. Nennen Sie die Rolle "Streaming-Host" und klicken Sie auf **Speichern**.
4. Klicken Sie auf die neue Rolle und dann im Abschnitt Mitglieder auf **Hinzufügen**, um Personen aufzunehmen.
5. Scrollen Sie zu **Berechtigungen bearbeiten**, klappen Sie den Abschnitt **Inhalt** auf und aktivieren Sie **Host-Chat**.

Wenn sich Hosts auf der Livestream-Seite anmelden, erscheint ein privater Reiter **Host-Chat** neben dem öffentlichen Chat, für vertrauliche Gespräche unter Mitarbeitenden während der Übertragung.

:::info
Weitere Details zum Anlegen von Rollen und zur Verwaltung von Berechtigungen finden Sie unter [Rollen und Berechtigungen](../settings/roles-permissions.md).
:::

## Fehlerbehebung

Wenn Ihr automatischer YouTube-Livestream bei Verwendung der Option "Aktueller YouTube-Livestream" mit Ihrer Kanal-ID nicht richtig angezeigt wird, versuchen Sie Folgendes:

**Symptome:**
- Das Livestream-Video zeigt "Video nicht verfügbar"
- Die Seite lädt, aber es erscheint kein Video
- Direkte YouTube-Einbettungen funktionieren, der automatische Kanal-Livestream aber nicht

**Lösung:**
Prüfen Sie Ihren YouTube-Kanal auf alte oder geplante Livestreams und löschen Sie sie:

1. Öffnen Sie Ihr YouTube Studio.
2. Wechseln Sie zu **Inhalte** und dann zu **Live**.
3. Suchen Sie nach alten geplanten Live-Sendungen oder anstehenden geplanten Streams.
4. Löschen Sie diese alten oder geplanten Livestream-Einträge.
5. Testen Sie Ihre Livestream-Seite erneut.

:::warning
Die automatische Einbettung des Kanal-Livestreams von YouTube kann blockiert werden, wenn es mehrere geplante oder vergangene Livestream-Einträge in Ihrem Kanal gibt. Wenn Sie diese entfernen, kann YouTube Ihren aktuellen Livestream richtig erkennen und ausliefern.
:::

**Weitere Voraussetzungen:**
- Ihr Livestream muss auf **Öffentlich** eingestellt sein (nicht auf Nicht gelistet oder Privat).
- Das Einbetten muss in Ihren YouTube-Streaming-Einstellungen erlaubt sein.
- Verwenden Sie den Anbieter **Aktueller YouTube-Livestream** (mit Kanal-ID), nicht den Anbieter **YouTube** (mit Video-ID).

## Nächste Schritte

- [Predigten verwalten](managing-sermons) -- Predigten zu Ihrer Bibliothek hinzufügen
- [Listen](playlists) -- Predigten in Reihen ordnen
