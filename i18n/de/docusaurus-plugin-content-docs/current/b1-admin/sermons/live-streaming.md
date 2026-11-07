---
title: "Live-Stream-Zeiten und Einrichtung in B1 Admin"
sidebar_label: "Livestreaming"
description: "Wöchentliche oder einmalige Live-Streams planen, Chat- und Videovorlauf festlegen, YouTube-Kanal verbinden und Einbettungen in B1 Admin prüfen."
---

# Livestreaming

<div class="article-intro">

Die Seite Livestream-Zeiten ermöglicht es Ihnen, den Streaming-Plan Ihrer Kirche festzulegen, Gottesdienstzeiten zu verwalten und das Seherlebnis anzupassen. Richten Sie wöchentlich wiederkehrende Gottesdienste oder einmalige Veranstaltungen ein, konfigurieren Sie Chat- und Videoeinstellungen und bestimmen Sie, wann Ihr Stream live geht.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Berechtigung **contentApi.streamingServices.edit**. Siehe [Rollen & Berechtigungen](../settings/roles-permissions.md), falls Sie keinen Zugriff haben.
- Halten Sie Ihre YouTube-Kanal-ID bereit, wenn Sie automatisches Livestreaming nutzen möchten
- Fügen Sie mindestens eine [Predigt](./managing-sermons.md) oder eine dauerhafte Live-URL als Streamquelle hinzu

</div>

Livestreaming wird über zwei Seiten im Bereich **Predigten** des Sprungmenüs verwaltet: **Livestream-Zeiten** für den Zeitplan Ihrer Livestreams und **Einstellungen** für die Registerkarten auf Ihrer Streaming-Seite.

## Gottesdienste verwalten

### Einen Gottesdienst hinzufügen

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (das Suchfeld oben links), klappen Sie **Predigten** auf und klicken Sie auf **Livestream-Zeiten**.
2. Klicken Sie oben auf der Seite auf die Schaltfläche **Gottesdienst hinzufügen**, um einen neuen geplanten Gottesdienst anzulegen. Vorhandene Gottesdienste sind in einer Tabelle aufgeführt, die jeweils Name, Zeit, Anbieter und Dauer zeigt; klicken Sie in einer Zeile auf das Bearbeitungssymbol, um sie zu ändern.
3. Geben Sie einen **Gottesdienstnamen** ein (zum Beispiel „Sonntagvormittag“).
4. Legen Sie die **Gottesdienstzeit** fest – wählen Sie den Tag und die Uhrzeit, zu der Ihr Gottesdienst beginnt.
5. Setzen Sie **Wiederholt sich wöchentlich** auf **Ja** für regelmäßige wöchentliche Gottesdienste oder auf **Nein** für eine einmalige Veranstaltung.

### Chat- und Videoeinstellungen konfigurieren

6. Legen Sie unter **Chat-Einstellungen** fest, wie viele Minuten vor und nach dem Gottesdienst der Chat aktiviert sein soll. So können Besucher schon vor Beginn chatten und danach weitermachen.
7. Legen Sie unter **Video-Einstellungen** fest, wie früh der Videostream für Countdown oder Inhalte vor dem Gottesdienst beginnen soll. Der Chat öffnet sich so viele Minuten *bevor* der frühe Videostart beginnt, daher zählt die Zeit neben der Einstellung „Minuten vor“ des Chats beide Werte mit. Ein Beispiel: Bei einem Gottesdienst um 10:00 Uhr mit 15 Minuten Chat vorher und einem frühen Start von 5 Minuten öffnet der Chat um 9:40 Uhr.
8. Wählen Sie im Dropdown-Menü aus, welche Predigt abgespielt werden soll:
   - **Neueste Predigt** – Spielt automatisch Ihr zuletzt hinzugefügtes Video ab.
   - **Aktueller Livestream** – Spielt Ihren aktuellen Livestream von YouTube über Ihre Kanal-ID ab.
   - Sie können auch eine bestimmte, bereits gespeicherte Predigt wählen.
9. Klicken Sie auf **Speichern**, um Ihren Gottesdienst einzuplanen.

:::info
Ihr Gottesdienst wird bei wöchentlicher Wiederholung automatisch jede Woche aktualisiert. Er bleibt zur gleichen Ortszeit, wenn die Sommerzeit beginnt oder endet. Sie können beliebig viele Gottesdienste anlegen. Besucher sehen beim Aufruf Ihrer Streaming-Seite den nächsten geplanten Gottesdienst.
:::

## Einstellungen der Streaming-Seite

Um die Registerkarten und Links anzupassen, die neben Ihrem Livestream erscheinen, öffnen Sie das Sprungmenü, klappen Sie **Predigten** auf und klicken Sie auf **Einstellungen**. Die Seite **Stream-Einstellungen** zeigt Ihre Liste **Inhalts-Registerkarten**.

### Registerkarten hinzufügen

1. Klicken Sie auf die Schaltfläche **Hinzufügen**, um Ihrer Livestream-Seite eine neue Registerkarte hinzuzufügen.
2. Wählen Sie einen **Linktyp**: **Externe URL** für einen eigenen Link oder eine der vorgefertigten Registerkarten **Chat** oder **Gebet**.
3. Bei der Registerkarte Chat geben Sie ihr nur einen Namen im Feld **Registerkartentext** – damit ist die Einrichtung abgeschlossen.
4. Bei einer verlinkten Registerkarte geben Sie den Namen der Registerkarte ein, wählen ein Symbol, indem Sie auf die Symbolschaltfläche klicken, und geben die URL ein.
5. Ihre konfigurierten Registerkarten erscheinen auf der Livestream-Seite, damit Zuschauende zusätzliche Materialien und interaktive Funktionen nutzen können.

### Ihren Stream vorab ansehen

Klicken Sie auf der Seite **Livestream-Zeiten** oben auf **Ihren Stream ansehen**, um genau zu sehen, wie Ihre Livestream-Seite für Besucher aussieht – einschließlich Ihres Logos, der Gottesdienstzeiten und der konfigurierten Registerkarten.

## Ihren YouTube-Livestream einrichten

So verbinden Sie Ihren YouTube-Kanal für automatisches Livestreaming:

1. Gehen Sie zu **Predigten** und klicken Sie auf **Predigt hinzufügen**, dann wählen Sie **Dauerhafte Live-URL hinzufügen**.
2. Der Videoanbieter ist standardmäßig **Aktueller YouTube-Livestream**. Geben Sie Ihre **YouTube-Kanal-ID** ein.
3. Fügen Sie einen Titel und eine Beschreibung hinzu und klicken Sie auf **Speichern**.
4. Erstellen Sie unter **Livestream-Zeiten** einen Gottesdienst und wählen Sie im Predigt-Dropdown Ihre dauerhafte Live-URL aus.

:::tip
Ihre YouTube-Kanal-ID finden Sie in den erweiterten Einstellungen Ihres YouTube-Kanals – kopieren Sie dort den Wert der Kanal-ID.
:::

## Farben und Logo anpassen

Ihre Livestream-Seite verwendet die [Erscheinungsbild](../website/appearance.md)-Einstellungen Ihrer Website:

- Die **helle Akzentfarbe** mit dunklem Text wird für die Kopfzeile verwendet.
- Die **dunkle Akzentfarbe** mit hellem Text wird für die Seitenleiste verwendet.
- Ihr **Logo für helle Hintergründe** erscheint auf der Streaming-Seite. Verwenden Sie ein Bild mit transparentem Hintergrund und einem Seitenverhältnis von 4:1.

Um diese zu ändern, gehen Sie zu **Website** und dann zu **Erscheinungsbild** und aktualisieren Sie Ihre Einstellungen für [Farbpalette](../website/appearance.md#color-palette) und [Logo](../website/appearance.md#logo-and-branding).

## Streaming-Hosts hinzufügen

So erhalten Teammitglieder Zugang zum Host-only-Chat neben dem öffentlichen Chat:

1. Wählen Sie im Sprungmenü **Einstellungen > Rollen**.
2. Klicken Sie auf die Plus-Schaltfläche und wählen Sie **Benutzerdefinierte Rolle hinzufügen**.
3. Nennen Sie die Rolle „Streaming-Host“ und klicken Sie auf **Speichern**.
4. Klicken Sie auf die neue Rolle und dann im Abschnitt Mitglieder auf **Hinzufügen**, um Personen hinzuzufügen.
5. Scrollen Sie zu **Berechtigungen bearbeiten**, klappen Sie den Abschnitt **Inhalt** auf und aktivieren Sie **Host-Chat**.

Wenn Hosts sich auf der Livestream-Seite anmelden, erscheint neben dem öffentlichen Chat eine private Registerkarte **Host-Chat** für Unterhaltungen nur unter Mitarbeitenden während der Übertragung.

:::info
Weitere Details zum Erstellen von Rollen und zur Verwaltung von Berechtigungen finden Sie unter [Rollen & Berechtigungen](../settings/roles-permissions.md).
:::

## Fehlerbehebung

Wird Ihr automatischer YouTube-Livestream nicht richtig angezeigt, wenn Sie die Option „Aktueller YouTube-Livestream“ mit Ihrer Kanal-ID verwenden, probieren Sie Folgendes:

**Symptome:**
- Das eingebettete Livestream-Video zeigt „Video nicht verfügbar“
- Die Seite lädt, aber es erscheint kein Video
- Direkte YouTube-Einbettungen funktionieren, der automatische Kanal-Livestream aber nicht

**Lösung:**
Prüfen Sie Ihren YouTube-Kanal auf alte oder geplante Livestreams und löschen Sie diese:

1. Öffnen Sie Ihr YouTube Studio.
2. Gehen Sie zu **Inhalte** und dann zu **Live**.
3. Suchen Sie nach alten geplanten Livestreams oder anstehenden geplanten Streams.
4. Löschen Sie diese alten oder geplanten Livestream-Einträge.
5. Testen Sie Ihre Livestream-Seite erneut.

:::warning
Die automatische Kanal-Einbettung von YouTube kann blockiert sein, wenn in Ihrem Kanal mehrere geplante oder vergangene Livestream-Einträge vorhanden sind. Wenn Sie diese entfernen, kann YouTube Ihren aktuellen Livestream korrekt erkennen und ausliefern.
:::

**Zusätzliche Voraussetzungen:**
- Ihr Livestream muss auf **Öffentlich** gestellt sein (nicht „Nicht gelistet“ oder „Privat“).
- Das Einbetten muss in Ihren YouTube-Streameinstellungen erlaubt sein.
- Stellen Sie sicher, dass Sie den Anbieter **Aktueller YouTube-Livestream** (mit Kanal-ID) verwenden, nicht den Anbieter **YouTube** (mit Video-ID).

## Nächste Schritte

- [Predigten verwalten](./managing-sermons.md) – Predigten zu Ihrer Bibliothek hinzufügen
- [Playlists](./playlists.md) – Predigten zu Reihen ordnen
