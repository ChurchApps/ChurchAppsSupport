---
title: "Einen Bildschirm koppeln"
---

# Einen Bildschirm koppeln

<div class="article-intro">

Um einen Fernseher auf einen Kalender zu setzen, koppeln Sie ihn mit **FreePlay Admin**. Der Fernseher zeigt einen vierstelligen Code an. Sie geben diesen Code auf [admin.freeplay.church](https://admin.freeplay.church) ein und wählen die Bildschirmgruppe aus, deren Kalender er folgen soll. Dies müssen Sie nur einmal pro Fernseher tun.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Installieren und starten Sie FreePlay auf dem Fernseher. Siehe [Erste Schritte](../getting-started/)
- Halten Sie einen ChurchApps-Zugang für Ihre Kirche bereit, um sich bei FreePlay Admin anzumelden
- Optional können Sie zuerst [eine Playlist erstellen](./building-playlists) und [diese planen](./scheduling-the-calendar), damit der Fernseher sofort etwas abspielen kann

</div>

## Den Code auf dem Fernseher anzeigen

1. Öffnen Sie auf dem Fernseher **Einstellungen** unten in der Seitenleiste.
2. Wählen Sie **Mit einem Kalender koppeln**. Die Zeile zeigt **Nicht gekoppelt**, solange der Fernseher noch nicht gekoppelt ist.
3. Der Bildschirm **Diesen Bildschirm koppeln** zeigt einen QR-Code und einen vierstelligen Kopplungscode mit dem Hinweis **Mit Ihrem Telefon scannen oder freeplay.church/pair aufrufen und diesen Code eingeben**.
4. Unter dem Code blinkt **Warte auf Bestätigung**, solange FreePlay darauf wartet, dass Sie die Kopplung abschließen.

Der Code ist 15 Minuten gültig, und ein Countdown darunter zeigt die verbleibende Zeit an. Wenn die Zeit abläuft, zeigt FreePlay automatisch einen neuen Code an. Sie können auch **Neuen Code generieren** wählen, um einen frischen Code zu erhalten, oder **Abbrechen**, um zu den Einstellungen zurückzukehren.

## Kopplung in FreePlay Admin

1. Scannen Sie den QR-Code mit Ihrem Telefon oder rufen Sie **freeplay.church/pair** auf einem beliebigen Computer oder Telefon auf. Melden Sie sich an, falls Sie dazu aufgefordert werden. FreePlay Admin öffnet das Formular **Bildschirm koppeln** mit dem bereits eingetragenen Code.
   - Sie können das Formular auch selbst öffnen. Gehen Sie in FreePlay Admin zu **Bildschirme** und klicken Sie auf **Bildschirm koppeln**.
2. Prüfen Sie den **Kopplungscode**. Es sind die vier Buchstaben auf dem Fernseher.
3. Geben Sie eine **Bezeichnung** ein, damit Sie diesen Fernseher von den anderen unterscheiden können, zum Beispiel „Foyer links“. Dies ist optional.
4. Wählen Sie unter **Gruppe** die Bildschirmgruppe aus, deren Kalender dieser Fernseher folgen soll. Um eine neue anzulegen, wählen Sie **＋ Neue Gruppe…** und geben Sie einen **Namen der neuen Gruppe** ein.
5. Lassen Sie unter **Modus** die Option **Geplant** ausgewählt. Der Fernseher spielt dann selbstständig nach dem Kalender der Gruppe ab.
6. Klicken Sie auf **Koppeln**.

Der Fernseher zeigt **Verbunden!** und danach **Ihr Zeitplan wird geladen...** an. Er lädt die geplanten Inhalte herunter und beginnt mit der Wiedergabe. Siehe [Geplante Wiedergabe auf dem Fernseher](./scheduled-playback).

:::info
Wenn FreePlay Admin **Dieser Code stimmt mit keinem Fernseher überein** meldet, prüfen Sie den Code auf dem Bildschirm. Ist er abgelaufen, verwenden Sie den neuen Code, den der Fernseher jetzt anzeigt.
:::

### Geplant oder manuell

Die Einstellung **Modus** bietet zwei Optionen:

- **Geplant** — Spielt nach dem Kalender der Gruppe selbstständig ab. Niemand muss auf Start drücken.
- **Manuell** — Jemand wählt Inhalte mit der Fernbedienung aus. Ein manueller Bildschirm erscheint trotzdem in Ihrer Liste **Bildschirme**, folgt aber keinem Kalender, daher ist das Feld **Gruppe** deaktiviert.

Sie können den Modus eines Bildschirms später über **Bearbeiten** auf der [Seite Bildschirme](./managing-screens) ändern.

## Stattdessen mit einem Dienstplan koppeln

Der Code auf dem Bildschirm **Diesen Bildschirm koppeln** funktioniert auch in B1 Admin. Wenn Sie ihn dort eingeben und unter **Pläne anzeigen für** einen Planungstyp auswählen, folgt der Fernseher diesem Planungstyp im [Plan-Modus](../plan-mode/) statt einem Kalender. Siehe [Ihr Gerät koppeln](../plan-mode/device-pairing).

## Am Fernseher ändern oder die Kopplung aufheben {#changing-or-unpairing-from-the-tv}

Sobald der Fernseher gekoppelt ist, zeigt die Zeile **Mit einem Kalender koppeln** in den **Einstellungen** den Namen der Bildschirmgruppe, der er folgt. Wählen Sie die Zeile aus, um den Dialog **Gekoppelt mit** zu öffnen, der drei Optionen bietet:

- **Zurück zum Zeitplan** — Den Dialog schließen und zum geplanten Player zurückkehren. An der Kopplung ändert sich nichts.
- **Kopplung aufheben** — Dem Zeitplan nicht mehr folgen. FreePlay öffnet den Bildschirm **Inhaltsanbieter**.
- **Mit einem anderen Kalender koppeln** — Die Kopplung aufheben und dann einen neuen Kopplungscode anzeigen, damit Sie den Fernseher erneut koppeln können.

:::warning
Wenn Sie die Kopplung aufheben, werden die Dateien gelöscht, die FreePlay für diesen Kalender heruntergeladen hat.
:::

## Kopplung in FreePlay Admin aufheben

1. Gehen Sie zu **Bildschirme** und klicken Sie auf die Bezeichnung des Bildschirms.
2. Klicken Sie auf **Mehr** und dann auf **Kopplung aufheben**.
3. Klicken Sie zur Bestätigung noch einmal auf **Kopplung aufheben**.

Der Fernseher zeigt wieder einen Kopplungscode an. Koppeln Sie ihn erneut, wenn Sie ihn wieder nutzen möchten.

## Verwandte Artikel

- **[Bildschirme und Gruppen verwalten](./managing-screens)** — Einen Bildschirm umbenennen, in eine andere Gruppe verschieben oder seine Downloads prüfen
- **[Kalender planen](./scheduling-the-calendar)** — Festlegen, was die Bildschirme der Gruppe abspielen
- **[Einen Kopplungsmodus auswählen](../getting-started/pairing-modes)** — Den geplanten Modus mit dem Plan-Modus und dem eigenständigen Durchsuchen von Anbietern vergleichen
