---
title: "Predigten verwalten"
---

# Predigten verwalten

<div class="article-intro">

Die Seite "Predigten" zeigt Ihre gesamte Predigtbibliothek an. Von hier aus können Sie neue Predigten hinzufügen, bestehende Einträge bearbeiten und Ihren Inhalt nach Wiedergabeliste organisieren. Jede Predigt kann zu Video oder Audio verlinken, die auf YouTube, Vimeo, Facebook oder einer benutzerdefinierten URL gehostet werden.

</div>

<div class="prereqs">
<h4>Voraussetzungen</h4>

- Sie benötigen die Berechtigung **contentApi.streamingServices.edit**. Siehe [Rollen & Berechtigungen](../settings/roles-permissions.md), wenn Sie keinen Zugriff haben.
- Erstellen Sie mindestens eine [Wiedergabeliste](playlists), um Ihre Predigten zu organisieren
- Halten Sie Ihre Video-IDs oder URLs bereit von YouTube, Vimeo oder Facebook

</div>

## Anzeige Ihrer Predigtbibliothek

1. Öffnen Sie in B1 Admin das **Bereichsmenü** in der oberen linken Ecke (der Bereichsname mit dem kleinen Pfeil) und wählen Sie **Predigten**.
2. Die Seite "Predigten" zeigt alle Ihre Predigteneinträge, organisiert nach Wiedergabeliste. Jede Predigt zeigt das Miniaturbild, den Titel und das Datum an.
3. Klicken Sie auf eine Predigt, um ihre Details anzuzeigen oder zu bearbeiten.

## Hinzufügen einer Predigt

1. Klicken Sie auf die Schaltfläche **Predigt hinzufügen** in der oberen rechten Ecke und wählen Sie **Predigt hinzufügen** aus dem Dropdown.
2. Wählen Sie eine **Wiedergabeliste** aus, um die Predigt zuzuweisen.
3. Wählen Sie Ihren **Videoanbieter** -- YouTube, Vimeo, Facebook oder benutzerdefinierte URL. Wir empfehlen YouTube, da es am besten mit dem B1-System funktioniert.
4. Geben Sie die Video-ID oder URL ein und klicken Sie auf **Abrufen**. Für YouTube ist die Video-ID die Zeichenfolge nach `v=` in der YouTube-URL.
5. Wenn Sie auf **Abrufen** klicken, werden die Predigtendetails automatisch importiert, einschließlich Veröffentlichungsdatum, Dauer, Titel, Beschreibung und Miniaturbild.
6. Nehmen Sie alle Änderungen vor und klicken Sie auf **Speichern**.

:::tip
Sie können auch eine permanente Livestream-URL hinzufügen, indem Sie **Permanente Live-URL hinzufügen** aus dem Dropdown **Predigt hinzufügen** auswählen. Dies erstellt eine persistente Verbindung zu Ihrem YouTube-Kanal-Livestream mit Ihrer Kanal-ID. Siehe [Live-Übertragung](live-streaming) für weitere Details.
:::

## Bearbeiten einer Predigt

1. Klicken Sie auf eine Predigt in Ihrer Bibliothek, um ihre Details zu öffnen.
2. Aktualisieren Sie den Titel, den Sprecher, das Datum, die Beschreibung, das Miniaturbild oder die Medien-Links bei Bedarf.
3. Klicken Sie auf **Speichern**, um Ihre Änderungen anzuwenden.

## Predigtendetails

Jeder Predigteneneintrag kann Folgendes enthalten:

- **Titel** -- Der Predigtname, der für Besucher angezeigt wird
- **Sprecher** -- Wer die Predigt hielt
- **Datum** -- Das Veröffentlichungs- oder Lieferdatum
- **Beschreibung** -- Eine Zusammenfassung des Predigtinhalts
- **Miniaturbild** -- Ein Vorschaubild in Ihrer Predigtbibliothek
- **Video/Audio-Links** -- URLs zur Predigtenmedien auf YouTube, Vimeo, Facebook oder benutzerdefinierten Host

## Planung einer Predigt für Livestream

Nachdem Sie eine Predigt hinzugefügt haben, können Sie sie für die Übertragung auf Ihrer Liveübertragungsseite planen:

1. Gehen Sie zur **Live-Übertragungszeiten**-Registerkarte.
2. Bearbeiten Sie eine Dienstleistung und wählen Sie unter **Videoeinstellungen** Ihre Predigt aus dem Dropdown.
3. Die Predigt wird zur geplanten Dienstleistungszeit abgespielt.

:::info
Zum Importieren mehrerer Predigten gleichzeitig anstatt sie einzeln hinzuzufügen, verwenden Sie das [Massenimport](bulk-import)-Tool, um Videos direkt von Ihrem YouTube- oder Vimeo-Konto abzurufen.
:::

## Nächste Schritte

- [Wiedergabelisten](playlists) -- Organisieren Sie Predigten in Reihen
- [Live-Übertragung](live-streaming) -- Konfigurieren Sie Ihren Übertragungsplan
- [Massenimport](bulk-import) -- Importieren Sie mehrere Predigten gleichzeitig
