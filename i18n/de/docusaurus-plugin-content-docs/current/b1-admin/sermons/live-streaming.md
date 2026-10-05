---
title: "Live-Streaming"
---

# Live-Streaming

<div class="article-intro">

Auf der Seite „Live-Stream-Zeiten" können Sie den Streaming-Zeitplan Ihrer Kirche konfigurieren, Servicezeiten verwalten und das Zuschauererlebnis anpassen. Richten Sie wöchentlich wiederkehrende Gottesdienste oder einmalige Veranstaltungen ein, konfigurieren Sie Chat- und Videoeinstellungen und kontrollieren Sie, wann Ihr Stream live geht.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Berechtigung **contentApi.streamingServices.edit**. Weitere Informationen finden Sie unter [Rollen & Berechtigungen](../settings/roles-permissions.md), falls Sie keinen Zugriff haben.
- Halten Sie Ihre YouTube-Kanal-ID bereit, falls Sie automatisiertes Live-Streaming verwenden möchten
- Fügen Sie mindestens eine [Predigt](managing-sermons) oder permanente Live-URL hinzu, um als Stream-Quelle zu verwenden

</div>

Die Seite hat zwei Hauptregisterkarten: **Services** zum Verwalten Ihres Live-Stream-Zeitplans und **Einstellungen** zum Konfigurieren Ihrer Streaming-Seite.

## Dienste verwalten

### Einen Service hinzufügen

1. In B1 Admin öffnen Sie das [Jump-Menü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), erweitern **Predigten** und klicken auf **Live-Stream-Zeiten**.
2. Klicken Sie auf die Schaltfläche **Service hinzufügen**, um einen neuen geplanten Service zu erstellen.
3. Geben Sie einen **Service-Namen** ein (z. B. „Sonntags Morgen").
4. Legen Sie die **Service-Zeit** fest -- wählen Sie den Tag und die Uhrzeit, zu der Ihr Service beginnt.
5. Stellen Sie **Wöchentlich wiederkehren** auf **Ja** für regelmäßige wöchentliche Services oder **Nein** für eine einmalige Veranstaltung.

### Chat- und Videoeinstellungen konfigurieren

6. Unter **Chat-Einstellungen** stellen Sie ein, wie viele Minuten vor und nach dem Service der Chat aktiviert sein soll. Dies ermöglicht es Besuchern, vor dem Gottesdienst mit dem Chatten zu beginnen und danach weiterzumachen.
7. Unter **Videoeinstellungen** stellen Sie ein, wie früh der Video-Stream für einen Countdown oder Pre-Service-Inhalte starten soll.
8. Wählen Sie aus dem Dropdown-Menü aus, welche Predigt abgespielt werden soll:
   - **Neueste Predigt** -- Spielt automatisch Ihr zuletzt hinzugefügtes Video ab.
   - **Aktueller Live-Service** -- Spielt Ihren aktuellen Live-Stream von YouTube mit Ihrer Kanal-ID ab.
   - Sie können auch jede spezifische Predigt auswählen, die Sie bereits gespeichert haben.
9. Klicken Sie auf **Speichern**, um Ihren Service zu planen.

:::info
Ihr Service wird automatisch aktualisiert, wenn er auf wiederkehrend eingestellt ist. Sie können so viele Services hinzufügen wie benötigt. Besucher sehen die nächste geplante Service-Zeit, wenn sie Ihre Streaming-Seite besuchen.
:::

## Streaming-Seite Einstellungen

Klicken Sie auf die Registerkarte **Einstellungen**, um die Registerkarten und Links, die neben Ihrem Live-Stream angezeigt werden, anzupassen.

### Registerkarten hinzufügen

1. Klicken Sie auf die Schaltfläche **Hinzufügen**, um eine neue Registerkarte zu Ihrer Live-Stream-Seite hinzuzufügen.
2. Wählen Sie die vordefinierte Registerkarte **Chat** oder fügen Sie eine benutzerdefinierte Registerkarte mit einer externen URL hinzu.
3. Für die Chat-Registerkarte geben Sie einfach einen Namen in das Feld **Registerkartentext** ein und die Konfiguration ist abgeschlossen.
4. Geben Sie für eine verlinkte Registerkarte den Namen der Registerkarte ein, wählen Sie ein Symbol aus, indem Sie auf die Symbol-Schaltfläche klicken, und geben Sie die URL ein.
5. Ihre konfigurierten Registerkarten werden auf der Live-Streaming-Seite für Zuschauer angezeigt, um auf zusätzliche Ressourcen und interaktive Funktionen zuzugreifen.

### Vorschau Ihres Streams

Klicken Sie auf die Schaltfläche **Stream anzeigen**, um genau zu sehen, wie Ihre Live-Streaming-Seite für Besucher aussieht, einschließlich Ihres Logos, Service-Zeiten und konfigurierten Registerkarten.

## YouTube Live-Stream einrichten

Um Ihren YouTube-Kanal für automatisiertes Live-Streaming zu verbinden:

1. Gehen Sie zu **Predigten** und klicken Sie auf **Predigt hinzufügen**, wählen Sie dann **Permanente Live-URL hinzufügen**.
2. Der Video-Provider wird standardmäßig auf **Aktueller YouTube-Live-Stream** gesetzt. Geben Sie Ihre **YouTube-Kanal-ID** ein.
3. Fügen Sie einen Titel und eine Beschreibung hinzu, klicken Sie dann auf **Speichern**.
4. Erstellen Sie in **Live-Stream-Zeiten** einen Service und wählen Sie Ihre permanente Live-URL aus dem Predigt-Dropdown aus.

:::tip
Um Ihre YouTube-Kanal-ID zu finden, gehen Sie zu den erweiterten Einstellungen Ihres YouTube-Kanals und kopieren Sie den Wert der Kanal-ID.
:::

## Farben und Logo anpassen

Ihre Live-Stream-Seite verwendet die [Appearance](../website/appearance)-Einstellungen Ihrer Website:

- Die **leichte Akzentfarbe** mit dunklem Text wird für die Kopfzeile verwendet.
- Die **dunkle Akzentfarbe** mit hellem Text wird für die Seitenleiste verwendet.
- Ihr **Helles Hintergrund-Logo** wird auf der Streaming-Seite angezeigt. Verwenden Sie ein Bild mit transparentem Hintergrund und einem 4:1-Seitenverhältnis.

Um diese zu ändern, gehen Sie zu **Website** dann **Appearance** und aktualisieren Sie Ihre [Color Palette](../website/appearance#color-palette)- und [Logo](../website/appearance#logo-and-branding)-Einstellungen.

## Streaming-Hosts hinzufügen

Um Teammitgliedern Zugriff auf den nur-Host-Chat neben dem öffentlichen Chat zu geben:

1. Wählen Sie im Jump-Menü **Einstellungen > Rollen** aus.
2. Klicken Sie auf die Plus-Schaltfläche und wählen Sie **Benutzerdefinierte Rolle hinzufügen**.
3. Benennen Sie die Rolle „Streaming-Host" und klicken Sie auf **Speichern**.
4. Klicken Sie auf die neue Rolle, klicken Sie dann auf **Hinzufügen** im Bereich „Mitglieder", um Personen hinzuzufügen.
5. Scrollen Sie nach unten zu **Berechtigungen bearbeiten**, erweitern Sie den Bereich **Content** und aktivieren Sie **Host Chat**.

Wenn Hosts sich auf der Live-Stream-Seite anmelden, wird eine private Registerkarte **Host Chat** neben dem öffentlichen Chat für nur-Personal-Konversationen während der Übertragung angezeigt.

:::info
Weitere Informationen zum Erstellen von Rollen und Verwalten von Berechtigungen finden Sie unter [Rollen & Berechtigungen](../settings/roles-permissions.md).
:::

## Fehlerbehebung

Wenn Ihr automatisierter YouTube-Live-Stream bei Verwendung der Option „Aktueller YouTube-Live-Stream" mit Ihrer Kanal-ID nicht richtig angezeigt wird, versuchen Sie Folgendes:

**Symptome:**
- Der Live-Stream zeigt „Video nicht verfügbar"
- Die Seite wird geladen, aber es wird kein Video angezeigt
- Direkte YouTube-Einbindungen funktionieren, aber der automatisierte Kanal-Live-Stream nicht

**Lösung:**
Überprüfen Sie Ihren YouTube-Kanal auf alte oder bevorstehende geplante Live-Streams und löschen Sie diese:

1. Gehen Sie zu YouTube Studio.
2. Navigieren Sie zu **Content** dann **Live**.
3. Suchen Sie nach alten geplanten Streams oder bevorstehenden geplanten Streams.
4. Löschen Sie diese alten oder geplanten Live-Stream-Einträge.
5. Testen Sie Ihre Live-Stream-Seite erneut.

:::warning
Die automatisierte Einbindung von YouTube-Kanal-Live-Streams kann blockiert werden, wenn es mehrere geplante oder frühere Live-Stream-Einträge in Ihrem Kanal gibt. Das Entfernen dieser ermöglicht YouTube, Ihren aktuellen Live-Stream ordnungsgemäß zu identifizieren und bereitzustellen.
:::

**Zusätzliche Anforderungen:**
- Ihr Live-Stream muss auf **Öffentlich** eingestellt sein (nicht Nicht in der Liste oder Privat).
- Die Einbindung muss in Ihren YouTube-Stream-Einstellungen zulässig sein.
- Stellen Sie sicher, dass Sie den Provider **Aktueller YouTube-Live-Stream** (mit Kanal-ID) verwenden, nicht den Provider **YouTube** (mit Video-ID).

## Nächste Schritte

- [Predigten verwalten](managing-sermons) -- Fügen Sie Predigten zu Ihrer Bibliothek hinzu
- [Playlists](playlists) -- Organisieren Sie Predigten in Serien
