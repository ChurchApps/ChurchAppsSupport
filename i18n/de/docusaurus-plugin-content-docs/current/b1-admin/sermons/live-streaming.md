---
title: "Live-Übertragung"
---

# Live-Übertragung

<div class="article-intro">

Die Seite "Live Stream Times" ermöglicht es Ihnen, den Übertragungsplan Ihrer Kirche zu konfigurieren, Dienstleistungszeiten zu verwalten und die Zuschauererfahrung anzupassen. Richten Sie wöchentliche Dienstleistungen oder einmalige Veranstaltungen ein, konfigurieren Sie Chat- und Videoeinstellungen und steuern Sie, wann Ihr Stream live geht.

</div>

<div class="prereqs">
<h4>Voraussetzungen</h4>

- Sie benötigen die Berechtigung **contentApi.streamingServices.edit**. Siehe [Rollen & Berechtigungen](../settings/roles-permissions.md), wenn Sie keinen Zugriff haben.
- Halten Sie Ihre YouTube-Kanal-ID bereit, wenn Sie automatisierte Liveübertragung verwenden möchten
- Fügen Sie mindestens eine [Predigt](managing-sermons) oder permanente Live-URL hinzu, um sie als Stream-Quelle zu verwenden

</div>

Die Seite hat zwei Hauptregisterkarten: **Dienstleistungen** zum Verwalten Ihres Liveübertragungsplans und **Einstellungen** zum Konfigurieren Ihrer Übertragungsseite.

## Verwaltung von Dienstleistungen

### Hinzufügen einer Dienstleistung

1. Öffnen Sie in B1 Admin das **Bereichsmenü** in der oberen linken Ecke (der Bereichsname mit dem kleinen Pfeil) und wählen Sie **Predigten**, dann klicken Sie auf die **Live-Übertragungszeiten**-Registerkarte.
2. Klicken Sie auf die Schaltfläche **Dienstleistung hinzufügen**, um eine neue geplante Dienstleistung zu erstellen.
3. Geben Sie einen **Dienstleistungsnamen** ein (z.B. "Sonntag Morgen").
4. Stellen Sie die **Dienstleistungszeit** ein -- wählen Sie den Tag und die Zeit aus, zu der Ihre Dienstleistung beginnt.
5. Stellen Sie **Wöchentlich wiederholen** auf **Ja** für regelmäßige wöchentliche Dienstleistungen oder **Nein** für ein einmaliges Ereignis ein.

### Konfigurieren von Chat- und Videoeinstellungen

6. Stellen Sie unter **Chat-Einstellungen** ein, wie viele Minuten vor und nach der Dienstleistung der Chat aktiviert sein sollte. Dies ermöglicht es Besuchern, vor Dienstleistungsbeginn zu chatten und danach fortzufahren.
7. Stellen Sie unter **Videoeinstellungen** ein, wie früh der Videostream für Countdown- oder Vordienstinhalte starten sollte.
8. Wählen Sie, welche Predigt aus dem Dropdown abgespielt werden soll:
   - **Neueste Predigt** -- Spielt automatisch Ihr zuletzt hinzugefügtes Video.
   - **Aktuelle Live-Dienstleistung** -- Spielt Ihren aktuellen Livestream von YouTube mit Ihrer Kanal-ID.
   - Sie können auch eine beliebige Predigt wählen, die Sie bereits gespeichert haben.
9. Klicken Sie auf **Speichern**, um Ihre Dienstleistung zu planen.

:::info
Ihre Dienstleistung wird sich jede Woche automatisch aktualisieren, wenn sie auf wiederkehrend eingestellt ist. Sie können so viele Dienstleistungen hinzufügen, wie Sie benötigen. Besucher sehen die nächste geplante Dienstleistungszeit, wenn sie Ihre Übertragungsseite besuchen.
:::

## Einstellungen der Übertragungsseite

Klicken Sie auf die **Einstellungen**-Registerkarte, um die Registerkarten und Links anzupassen, die neben Ihrer Live-Übertragung angezeigt werden.

### Registerkarten hinzufügen

1. Klicken Sie auf die Schaltfläche **Hinzufügen**, um eine neue Registerkarte zu Ihrer Live-Übertragungsseite hinzuzufügen.
2. Wählen Sie die vordefinierte **Chat**-Registerkarte oder fügen Sie eine benutzerdefinierte Registerkarte mit einer externen URL hinzu.
3. Geben Sie für die Chat-Registerkarte einfach einen Namen im Feld **Registerkarte Text** ein, und das Setup ist komplett.
4. Geben Sie für eine verlinkte Registerkarte den Registerkartennamen ein, wählen Sie ein Symbol, indem Sie auf die Symbol-Schaltfläche klicken, und geben Sie die URL ein.
5. Ihre konfigurierten Registerkarten werden auf der Liveübertragungsseite für Zuschauer angezeigt, um auf zusätzliche Ressourcen und interaktive Funktionen zuzugreifen.

### Vorschau Ihres Streams

Klicken Sie auf die Schaltfläche **Ihren Stream anzeigen**, um genau zu sehen, wie Ihre Liveübertragungsseite für Besucher aussieht, einschließlich Ihres Logos, Dienstleistungszeiten und konfigurierter Registerkarten.

## Einrichten Ihres YouTube-Livestreams

Zum Verbinden Ihres YouTube-Kanals für automatisierte Liveübertragung:

1. Gehen Sie zu **Predigten** und klicken Sie auf **Predigt hinzufügen**, dann wählen Sie **Permanente Live-URL hinzufügen**.
2. Der Videoanbieter wird standardmäßig auf **Aktueller YouTube-Livestream** eingestellt. Geben Sie Ihre **YouTube-Kanal-ID** ein.
3. Fügen Sie einen Titel und eine Beschreibung hinzu und klicken Sie auf **Speichern**.
4. Erstellen Sie in **Live-Übertragungszeiten** eine Dienstleistung und wählen Sie Ihre permanente Live-URL aus dem Predigtdropdown.

:::tip
Um Ihre YouTube-Kanal-ID zu finden, gehen Sie zu den erweiterten Einstellungen Ihres YouTube-Kanals und kopieren Sie den Kanal-ID-Wert.
:::

## Anpassung von Farben und Logo

Ihre Liveübertragungsseite verwendet die [Erscheinung](../website/appearance)-Einstellungen Ihrer Website:

- Die **Helle Akzentfarbe** mit dunklem Text wird für die Kopfzeile verwendet.
- Die **Dunkle Akzentfarbe** mit hellem Text wird für die Seitenleiste verwendet.
- Ihr **Helles Hintergrund-Logo** wird auf der Übertragungsseite angezeigt. Verwenden Sie ein Bild mit transparentem Hintergrund und einem Seitenverhältnis von 4:1.

Um diese zu ändern, gehen Sie zu **Website** dann **Erscheinung** und aktualisieren Sie Ihre [Farbpaletten](../website/appearance#color-palette) und [Logo](../website/appearance#logo-and-branding)-Einstellungen.

## Hinzufügen von Übertragungshosts

Gewähren Sie Teammitgliedern Zugriff auf den Host-Chat neben dem öffentlichen Chat:

1. Öffnen Sie das **Bereichsmenü** in der oberen linken Ecke (der Bereichsname mit dem kleinen Pfeil), wählen Sie **Einstellungen** und klicken Sie auf **Rollen**.
2. Klicken Sie auf die Plus-Schaltfläche und wählen Sie **Benutzerdefinierte Rolle hinzufügen**.
3. Benennen Sie die Rolle "Übertragungshost" und klicken Sie auf **Speichern**.
4. Klicken Sie auf die neue Rolle und klicken Sie auf **Hinzufügen** im Mitglieder-Bereich, um Personen hinzuzufügen.
5. Scrollen Sie zu **Berechtigungen bearbeiten**, erweitern Sie den **Inhalts**-Bereich und aktivieren Sie **Host-Chat**.

Wenn Hosts sich auf der Liveübertragungsseite anmelden, wird eine private **Host-Chat**-Registerkarte neben dem öffentlichen Chat für Mitarbeitergespräche während der Übertragung angezeigt.

:::info
Für weitere Details zum Erstellen von Rollen und Verwalten von Berechtigungen siehe [Rollen & Berechtigungen](../settings/roles-permissions.md).
:::

## Fehlerbehebung

Wenn Ihr automatisierter YouTube-Livestream nicht korrekt angezeigt wird, wenn Sie die Option "Aktueller YouTube-Livestream" mit Ihrer Kanal-ID verwenden, versuchen Sie Folgendes:

**Symptome:**
- Die Liveübertragung zeigt "Video nicht verfügbar"
- Die Seite lädt, aber es wird kein Video angezeigt
- Direkte YouTube-Einbindungen funktionieren, aber der automatisierte Kanal-Livestream nicht

**Lösung**
Überprüfen Sie Ihren YouTube-Kanal auf alte oder anstehende geplante Livestreams und löschen Sie sie:

1. Gehen Sie zu Ihrem YouTube Studio.
2. Navigieren Sie zu **Inhalte** dann **Live**.
3. Suchen Sie nach alten geplanten Streams oder anstehenden geplanten Streams.
4. Löschen Sie diese alten oder geplanten Liveübertragungen.
5. Testen Sie Ihre Liveübertragungsseite erneut.

:::warning
Der automatisierte Kanal-Livestream von YouTube kann blockiert werden, wenn es mehrere geplante oder frühere Liveübertragungseinträge in Ihrem Kanal gibt. Das Entfernen dieser ermöglicht YouTube, Ihren aktuellen Livestream richtig zu identifizieren und zu dienen.
:::

**Zusätzliche Anforderungen:**
- Ihr Livestream muss auf **Öffentlich** eingestellt sein (nicht Nicht aufgelistet oder Privat).
- Die Einbindung muss in den YouTube-Stream-Einstellungen zulässig sein.
- Stellen Sie sicher, dass Sie den **Aktuellen YouTube-Livestream**-Anbieter (mit Kanal-ID) verwenden, nicht den **YouTube**-Anbieter (mit Video-ID).

## Nächste Schritte

- [Predigten verwalten](managing-sermons) -- Fügen Sie Predigten zu Ihrer Bibliothek hinzu
- [Wiedergabelisten](playlists) -- Organisieren Sie Predigten in Reihen
