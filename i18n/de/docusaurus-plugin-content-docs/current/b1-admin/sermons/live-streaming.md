---
title: "Livestream-Zeiten und Einrichtung in B1 Admin"
sidebar_label: "Livestreaming"
description: "Planen Sie wöchentliche oder einmalige Livestream-Gottesdienste, legen Sie Chat- und Video-Startzeiten fest, verbinden Sie einen YouTube-Kanal und beheben Sie Probleme mit Einbettungen in B1 Admin."
---

# Livestreaming

<div class="article-intro">

Auf der Seite Livestream-Zeiten konfigurieren Sie den Streaming-Zeitplan Ihrer Gemeinde, verwalten die Gottesdienstzeiten und passen das Erlebnis für Zuschauer an. Richten Sie wiederkehrende wöchentliche Gottesdienste oder einmalige Veranstaltungen ein, konfigurieren Sie Chat- und Videoeinstellungen und bestimmen Sie, wann Ihr Stream startet.

</div>

## Schulungsvideo {#training-video}

<YouTube id="tpEY-sEYW6A" title="Einrichten von Livestreaming in B1" next="Anpassen der Mitglieder-App in B1" nextUrl="/docs/b1-admin/settings/mobile-app" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Berechtigung **Gottesdienste bearbeiten** im Abschnitt **Inhalt** Ihrer Rolle. Falls Sie keinen Zugriff haben, lesen Sie [Rollen und Berechtigungen](../settings/roles-permissions.md).
- Halten Sie Ihre YouTube-Kanal-ID bereit, wenn Sie automatisches Livestreaming nutzen möchten
- Fügen Sie mindestens eine [Predigt](./managing-sermons.md) oder eine dauerhafte Live-URL hinzu, die als Streamquelle dient

</div>

Das Livestreaming wird über zwei Seiten im Bereich **Predigten** des Sprungmenüs verwaltet: **Livestream-Zeiten** für den Livestream-Zeitplan und **Einstellungen** für die Reiter auf Ihrer Streaming-Seite.

## Gottesdienste verwalten {#managing-services}

### Einen Gottesdienst hinzufügen {#adding-a-service}

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Predigten** auf und klicken Sie auf **Livestream-Zeiten**.
2. Klicken Sie oben auf der Seite auf die Schaltfläche **Gottesdienst hinzufügen**, um einen neuen geplanten Gottesdienst anzulegen. Vorhandene Gottesdienste werden in einer Tabelle aufgelistet, die für jeden Gottesdienst Name (bei wiederkehrenden Gottesdiensten mit der Kennzeichnung **Wöchentlich**), Zeit, Anbieter und Dauer zeigt. Fahren Sie mit der Maus über eine Zeile und klicken Sie auf das Bearbeiten-Symbol, um sie zu ändern.
3. Geben Sie einen **Gottesdienstnamen** ein (zum Beispiel „Sonntagmorgen“). Neue Gottesdienste heißen zunächst „Sonntagmorgen“.
4. Legen Sie die **Gottesdienstzeit** fest – wählen Sie Datum und Uhrzeit, zu denen Ihr Gottesdienst beginnt. Neue Gottesdienste beginnen standardmäßig um 9:00 Uhr am nächsten Sonntag.
5. Stellen Sie **Wiederholt sich wöchentlich** auf **Ja** (**Wöchentlich**) für regelmäßige wöchentliche Gottesdienste oder auf **Nein** (**Einmalig**) für eine einmalige Veranstaltung.

### Chat- und Videoeinstellungen konfigurieren {#configuring-chat-and-video-settings}

6. Stellen Sie unter **Chat-Einstellungen** **Chat aktivieren – Minuten vorher** und **Chat aktivieren – Minuten nachher** ein – wie viele Minuten vor und nach dem Gottesdienst der Chat aktiviert sein soll (bei einem neuen Gottesdienst jeweils 10). So können Besucher schon vor Beginn chatten und danach weiter schreiben. Die Uhrzeit neben jedem Feld zeigt, wann der Chat öffnet und schließt.
7. Stellen Sie unter **Videoeinstellungen** **Video früher starten** ein – wie viele Minuten früher der Videostream für einen Countdown oder Inhalte vor dem Gottesdienst beginnt. Der Chat öffnet diese Minuten *vor* dem frühen Videostart, daher zählt die Uhrzeit neben der Einstellung „Minuten vorher“ des Chats beide Werte mit. Beispiel: Bei einem Gottesdienst um 10:00 Uhr mit 15 Minuten Chat vorher und einem um 5 Minuten früheren Videostart öffnet der Chat um 9:40 Uhr.
8. Wählen Sie im Auswahlfeld **Predigt** aus, was abgespielt werden soll:
   - **Neueste Predigt** (**Automatisch**) -- Spielt automatisch das zuletzt hinzugefügte Video ab.
   - Ihre [dauerhaften Live-URLs](#setting-up-your-youtube-live-stream), die als Nächstes aufgelistet werden -- jede spielt den aktuellen Livestream Ihres Kanals von YouTube anhand Ihrer Kanal-ID ab. Eine neue heißt **Aktueller Live-Gottesdienst**, sofern Sie sie nicht umbenennen.
   - Darunter alle bestimmten Predigten, die Sie bereits gespeichert haben.
9. Klicken Sie auf **Speichern**, um Ihren Gottesdienst zu planen, oder auf **Abbrechen**, um das Formular zu schließen.

Um einen Gottesdienst zu entfernen, bearbeiten Sie ihn, klicken Sie auf **Löschen** und bestätigen Sie.

:::info
Ein wiederkehrender Gottesdienst wird jede Woche automatisch aktualisiert. Er bleibt zur gleichen Ortszeit, wenn die Sommerzeit beginnt oder endet. Sie können so viele Gottesdienste hinzufügen, wie Sie benötigen. Besucher sehen beim Aufrufen Ihrer Streaming-Seite den nächsten geplanten Gottesdienst.
:::

## Einstellungen der Streaming-Seite {#streaming-page-settings}

Um die Reiter und Links anzupassen, die neben Ihrem Livestream erscheinen, öffnen Sie das Sprungmenü, klappen **Predigten** auf und klicken Sie auf **Einstellungen**. Die Seite **Stream-Einstellungen** zeigt Ihre Liste der **Inhaltsreiter** in der Reihenfolge, in der Zuschauer sie sehen. Externe Link-Reiter öffnen ihren Link beim Anklicken in einem neuen Browser-Tab.

### Reiter hinzufügen {#adding-tabs}

1. Klicken Sie auf die Schaltfläche **Hinzufügen**, um Ihrer Livestream-Seite einen neuen Reiter hinzuzufügen. Das Dialogfeld **Neuen Reiter erstellen** öffnet sich.
2. Geben Sie den Namen des Reiters im Feld **Reitertext** ein und wählen Sie ein **Symbol**, indem Sie auf die Symbolschaltfläche klicken.
3. Wählen Sie einen **Linktyp**: **Externe URL** für einen eigenen Link (Standard) oder einen der integrierten Reiter **Chat** oder **Gebet**.
4. Bei einem Reiter mit externer URL geben Sie die Adresse im Feld **Externe URL** ein. Reiter für Chat und Gebet benötigen nichts weiter.
5. Klicken Sie auf **Reiter speichern**. Neue Reiter werden am Ende der Liste hinzugefügt.

Ihre konfigurierten Reiter erscheinen auf der Livestream-Seite, damit Zuschauer auf zusätzliche Ressourcen und interaktive Funktionen zugreifen können.

### Reiter bearbeiten, neu anordnen und löschen {#editing-reordering-and-deleting-tabs}

Fahren Sie mit der Maus über einen Reiter und nutzen Sie dessen Schaltflächen:

- Pfeile **Nach oben verschieben** und **Nach unten verschieben** -- Ändern die Reihenfolge der Reiter.
- **Bearbeiten** (Stift) -- Ändern Sie Text, Symbol, Typ oder URL des Reiters und klicken Sie dann auf **Reiter speichern**. Um den Reiter zu entfernen, klicken Sie auf **Löschen** und bestätigen Sie im Dialogfeld **Reiter löschen**.

### Vorschau Ihres Streams {#previewing-your-stream}

Klicken Sie auf der Seite **Livestream-Zeiten** oben auf **Ihren Stream ansehen**, um genau zu sehen, wie Ihre Livestream-Seite für Besucher aussieht – einschließlich Logo, Gottesdienstzeiten und konfigurierter Reiter.

## Ihren YouTube-Livestream einrichten {#setting-up-your-youtube-live-stream}

Um Ihren YouTube-Kanal für automatisches Livestreaming zu verbinden:

1. Gehen Sie zu **Predigten** und klicken Sie auf **Predigt hinzufügen**, dann wählen Sie **Dauerhafte Live-URL hinzufügen**. Das Formular **Dauerhafte Live-URL bearbeiten** öffnet sich.
2. Der **Videoanbieter** ist standardmäßig auf **Aktueller YouTube-Livestream** eingestellt. Geben Sie Ihre **YouTube-Kanal-ID** ein (nicht die URL Ihres Kanals; für Hilfe klicken Sie auf **Kanal-ID abrufen**).
3. Der Titel lautet zunächst **Aktueller Live-Gottesdienst**. Ändern Sie ihn bei Bedarf, fügen Sie eine Beschreibung hinzu und klicken Sie dann auf **Speichern**. Dauerhafte Live-URLs haben keine Wiedergabeliste und kein Veröffentlichungsdatum.
4. Erstellen Sie unter **Livestream-Zeiten** einen Gottesdienst und wählen Sie im Auswahlfeld **Predigt** Ihre dauerhafte Live-URL aus.

:::tip
Ihre YouTube-Kanal-ID finden Sie in den erweiterten Einstellungen Ihres YouTube-Kanals – kopieren Sie dort den Wert der Kanal-ID.
:::

## Farben und Logo anpassen {#customizing-colors-and-logo}

Ihre Livestream-Seite verwendet die Einstellungen [Erscheinungsbild](../website/appearance.md) Ihrer Website:

- Die **helle Akzentfarbe** mit dunklem Text wird für die Kopfzeile verwendet.
- Die **dunkle Akzentfarbe** mit hellem Text wird für die Seitenleiste verwendet.
- Ihr **Logo für helle Hintergründe** erscheint auf der Streaming-Seite. Verwenden Sie ein Bild mit transparentem Hintergrund und einem Seitenverhältnis von 4:1.

Um dies zu ändern, gehen Sie zu **Website** und dann zu **Erscheinungsbild** und aktualisieren Sie Ihre [Farbpalette](../website/appearance.md#color-palette) und die Einstellungen für das [Logo](../website/appearance.md#logo-and-branding).

## Streaming-Hosts hinzufügen {#adding-streaming-hosts}

Um Teammitgliedern neben dem öffentlichen Chat Zugriff auf den Chat nur für Hosts zu geben:

1. Wählen Sie im Sprungmenü **Einstellungen > Rollen**.
2. Klicken Sie auf **Rolle hinzufügen** und wählen Sie **Eigene Rolle hinzufügen**.
3. Nennen Sie die Rolle „Streaming-Host“ und klicken Sie auf **Speichern**.
4. Klicken Sie auf die neue Rolle, suchen Sie dann in deren Mitgliederliste nach Personen und fügen Sie sie hinzu (siehe [Benutzer einer Rolle hinzufügen](../settings/roles-permissions.md#adding-users-to-a-role)).
5. Scrollen Sie zu **Berechtigungen bearbeiten**, klappen Sie den Abschnitt **Inhalt** auf und aktivieren Sie **Host-Chat**.

Wenn sich Hosts auf der Livestream-Seite anmelden, erscheint neben dem öffentlichen Chat ein privater Reiter **Host-Chat** für Gespräche, die nur Mitarbeitende betreffen, während der Übertragung.

:::info
Weitere Details zum Erstellen von Rollen und zur Verwaltung von Berechtigungen finden Sie unter [Rollen und Berechtigungen](../settings/roles-permissions.md).
:::

## Fehlerbehebung {#troubleshooting}

Wenn Ihr automatischer YouTube-Livestream bei Verwendung der Option „Aktueller YouTube-Livestream“ mit Ihrer Kanal-ID nicht richtig angezeigt wird, probieren Sie Folgendes:

**Symptome:**
- Die Livestream-Einbettung zeigt „Video nicht verfügbar“
- Die Seite lädt, aber es erscheint kein Video
- Direkte YouTube-Einbettungen funktionieren, der automatische Kanal-Livestream aber nicht

**Lösung:**
Prüfen Sie Ihren YouTube-Kanal auf alte oder geplante Livestreams und löschen Sie sie:

1. Gehen Sie zu Ihrem YouTube Studio.
2. Wechseln Sie zu **Inhalte** und dann zu **Live**.
3. Suchen Sie nach alten geplanten Livestreams oder anstehenden geplanten Streams.
4. Löschen Sie diese alten oder geplanten Livestream-Einträge.
5. Testen Sie Ihre Livestream-Seite erneut.

:::warning
Die automatische Einbettung des Kanal-Livestreams von YouTube kann blockiert werden, wenn in Ihrem Kanal mehrere geplante oder vergangene Livestream-Einträge vorhanden sind. Wenn Sie diese entfernen, kann YouTube Ihren aktuellen Livestream richtig erkennen und ausliefern.
:::

**Weitere Voraussetzungen:**
- Ihr Livestream muss auf **Öffentlich** eingestellt sein (nicht „Nicht gelistet“ oder „Privat“).
- Das Einbetten muss in Ihren YouTube-Streameinstellungen erlaubt sein.
- Achten Sie darauf, den Anbieter **Aktueller YouTube-Livestream** (mit Kanal-ID) zu verwenden, nicht den Anbieter **YouTube** (mit Video-ID).

## Nächste Schritte {#next-steps}

- [Predigten verwalten](./managing-sermons.md) -- Predigten zu Ihrer Bibliothek hinzufügen
- [Wiedergabelisten](./playlists.md) -- Predigten zu Reihen ordnen
