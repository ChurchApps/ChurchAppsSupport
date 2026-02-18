---
title: "Live-Streaming"
---

# Live-Streaming

<div class="article-intro">

Die Seite Live-Stream-Zeiten ermöglicht es Ihnen, den Streaming-Zeitplan Ihrer Gemeinde zu konfigurieren, Gottesdienstzeiten zu verwalten und das Zuschauererlebnis anzupassen. Richten Sie wiederkehrende wöchentliche Gottesdienste oder einmalige Veranstaltungen ein, konfigurieren Sie Chat- und Videoeinstellungen und steuern Sie, wann Ihr Stream live geht.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Berechtigung **contentApi.streamingServices.edit**. Siehe [Rollen & Berechtigungen](../settings/roles-permissions.md), falls Sie keinen Zugang haben.
- Halten Sie Ihre YouTube-Kanal-ID bereit, wenn Sie automatisiertes Live-Streaming nutzen möchten
- Fügen Sie mindestens eine [Predigt](managing-sermons) oder permanente Live-URL als Stream-Quelle hinzu

</div>

Die Seite hat zwei Hauptregisterkarten: **Gottesdienste** für die Verwaltung Ihres Live-Stream-Zeitplans und **Einstellungen** für die Konfiguration Ihrer Streaming-Seite.

## Gottesdienste verwalten

### Einen Gottesdienst hinzufügen

1. Klicken Sie in B1 Admin in der linken Seitenleiste auf **Predigten** und dann auf die Registerkarte **Live-Stream-Zeiten**.
2. Klicken Sie auf **Gottesdienst hinzufügen**, um einen neuen geplanten Gottesdienst zu erstellen.
3. Geben Sie einen **Gottesdienstnamen** ein (zum Beispiel „Sonntagmorgen").
4. Legen Sie die **Gottesdienstzeit** fest -- wählen Sie Tag und Uhrzeit des Gottesdienstbeginns.
5. Setzen Sie **Wöchentlich wiederholen** auf **Ja** für regelmäßige wöchentliche Gottesdienste oder **Nein** für eine einmalige Veranstaltung.

### Chat- und Videoeinstellungen konfigurieren

6. Legen Sie unter **Chat-Einstellungen** fest, wie viele Minuten vor und nach dem Gottesdienst der Chat aktiviert sein soll. So können Besucher vor Beginn des Gottesdienstes chatten und danach fortfahren.
7. Legen Sie unter **Videoeinstellungen** fest, wie früh der Video-Stream für Countdown- oder Vor-Gottesdienst-Inhalte starten soll.
8. Wählen Sie aus dem Dropdown-Menü, welche Predigt abgespielt werden soll:
   - **Neueste Predigt** -- Spielt automatisch Ihr zuletzt hinzugefügtes Video ab.
   - **Aktueller Live-Gottesdienst** -- Spielt Ihren aktuellen Live-Stream von YouTube über Ihre Kanal-ID.
   - Sie können auch eine bestimmte, bereits gespeicherte Predigt auswählen.
9. Klicken Sie auf **Speichern**, um Ihren Gottesdienst zu planen.

:::info
Ihr Gottesdienst wird sich automatisch jede Woche aktualisieren, wenn er auf wiederkehrend eingestellt ist. Sie können so viele Gottesdienste hinzufügen, wie Sie benötigen. Besucher sehen die nächste geplante Gottesdienstzeit, wenn sie Ihre Streaming-Seite besuchen.
:::

## Streaming-Seiten-Einstellungen

Klicken Sie auf die Registerkarte **Einstellungen**, um die Tabs und Links anzupassen, die neben Ihrem Live-Stream angezeigt werden.

### Tabs hinzufügen

1. Klicken Sie auf **Hinzufügen**, um einen neuen Tab zu Ihrer Live-Stream-Seite hinzuzufügen.
2. Wählen Sie aus vorgestalteten Tabs (**Chat** oder **Gebet**) oder fügen Sie einen benutzerdefinierten Tab mit einer externen URL hinzu.
3. Für vorgestaltete Tabs geben Sie einfach einen Namen im Feld **Tab-Text** ein und die Einrichtung ist abgeschlossen.
4. Für einen verlinkten Tab geben Sie den Tab-Namen ein, wählen Sie ein Symbol durch Klicken auf die Symbol-Schaltfläche und geben Sie die URL ein.
5. Ihre konfigurierten Tabs erscheinen auf der Live-Streaming-Seite, damit Zuschauer auf zusätzliche Ressourcen und interaktive Funktionen zugreifen können.

### Ihren Stream in der Vorschau ansehen

Klicken Sie auf **Ihren Stream anzeigen**, um genau zu sehen, wie Ihre Live-Streaming-Seite für Besucher aussehen wird, einschließlich Ihres Logos, der Gottesdienstzeiten und der konfigurierten Tabs.

## Ihren YouTube-Live-Stream einrichten

Um Ihren YouTube-Kanal für automatisches Live-Streaming zu verbinden:

1. Gehen Sie zu **Predigten** und klicken Sie auf **Predigt hinzufügen**, dann wählen Sie **Permanente Live-URL hinzufügen**.
2. Der Videoanbieter ist standardmäßig auf **Aktueller YouTube Live Stream** eingestellt. Geben Sie Ihre **YouTube-Kanal-ID** ein.
3. Fügen Sie einen Titel und eine Beschreibung hinzu und klicken Sie auf **Speichern**.
4. Erstellen Sie in **Live-Stream-Zeiten** einen Gottesdienst und wählen Sie Ihre permanente Live-URL aus dem Predigt-Dropdown.

:::tip
Um Ihre YouTube-Kanal-ID zu finden, gehen Sie zu den erweiterten Einstellungen Ihres YouTube-Kanals und kopieren Sie den Kanal-ID-Wert.
:::

## Farben und Logo anpassen

Ihre Live-Stream-Seite verwendet die [Erscheinungsbild](../website/appearance)-Einstellungen Ihrer Website:

- Die **helle Akzentfarbe** mit dunklem Text wird für die Kopfzeile verwendet.
- Die **dunkle Akzentfarbe** mit hellem Text wird für die Seitenleiste verwendet.
- Ihr **Logo auf hellem Hintergrund** erscheint auf der Streaming-Seite. Verwenden Sie ein Bild mit transparentem Hintergrund und einem Seitenverhältnis von 4:1.

Um diese zu ändern, gehen Sie zu **Website** und dann **Erscheinungsbild** und aktualisieren Sie Ihre [Farbpalette](../website/appearance#color-palette)- und [Logo](../website/appearance#logo-and-branding)-Einstellungen.

## Streaming-Hosts hinzufügen

Um Teammitgliedern Host-Fähigkeiten zu geben (Chat-Moderation, Gebetsanliegen-Antworten):

1. Gehen Sie in der linken Seitenleiste zu **Einstellungen** und klicken Sie auf **Rollen**.
2. Klicken Sie auf die Plus-Schaltfläche und wählen Sie **Benutzerdefinierte Rolle hinzufügen**.
3. Benennen Sie die Rolle „Streaming-Host" und klicken Sie auf **Speichern**.
4. Klicken Sie auf die neue Rolle und dann auf **Hinzufügen** im Mitgliederbereich, um Personen hinzuzufügen.
5. Scrollen Sie nach unten zu **Berechtigungen bearbeiten**, klappen Sie den Bereich **Inhalt** auf und aktivieren Sie **Host Chat**.

Wenn sich Hosts auf der Live-Stream-Seite anmelden, haben sie besondere Fähigkeiten einschließlich Chat-Moderation und Gebetsanliegen-Verwaltung.

:::info
Weitere Details zum Erstellen von Rollen und Verwalten von Berechtigungen finden Sie unter [Rollen & Berechtigungen](../settings/roles-permissions.md).
:::

## Fehlerbehebung

Wenn Ihr automatisierter YouTube-Live-Stream bei Verwendung der Option „Aktueller YouTube Live Stream" mit Ihrer Kanal-ID nicht korrekt angezeigt wird, versuchen Sie Folgendes:

**Symptome:**
- Die Live-Stream-Einbettung zeigt „Video nicht verfügbar"
- Die Seite lädt, aber kein Video erscheint
- Direkte YouTube-Einbettungen funktionieren, aber der automatische Kanal-Live-Stream nicht

**Lösung:**
Prüfen Sie Ihren YouTube-Kanal auf alte oder bevorstehende geplante Live-Streams und löschen Sie diese:

1. Gehen Sie zu Ihrem YouTube Studio.
2. Navigieren Sie zu **Inhalte** und dann **Live**.
3. Suchen Sie nach alten geplanten Lives oder bevorstehenden geplanten Streams.
4. Löschen Sie diese alten oder geplanten Live-Stream-Einträge.
5. Testen Sie Ihre Live-Stream-Seite erneut.

:::warning
Die automatische Kanal-Live-Stream-Einbettung von YouTube kann blockiert werden, wenn mehrere geplante oder vergangene Live-Stream-Einträge in Ihrem Kanal vorhanden sind. Durch deren Entfernung kann YouTube Ihren aktuellen Live-Stream korrekt identifizieren und bereitstellen.
:::

**Zusätzliche Anforderungen:**
- Ihr Live-Stream muss auf **Öffentlich** eingestellt sein (nicht Nicht gelistet oder Privat).
- Die Einbettung muss in Ihren YouTube-Stream-Einstellungen erlaubt sein.
- Stellen Sie sicher, dass Sie den Anbieter **Aktueller YouTube Live Stream** (mit Kanal-ID) verwenden, nicht den Anbieter **YouTube** (mit Video-ID).

## Nächste Schritte

- [Predigten verwalten](managing-sermons) -- Predigten zu Ihrer Bibliothek hinzufügen
- [Playlists](playlists) -- Predigten in Serien organisieren
