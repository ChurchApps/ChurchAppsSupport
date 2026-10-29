---
title: "Einen Bildschirm koppeln"
---

# Einen Bildschirm koppeln

<div class="article-intro">

Um einen Fernseher an einen Kalender anzubinden, koppeln Sie ihn mit **FreePlay Admin**. Der Fernseher zeigt einen vierstelligen Code. Sie geben diesen Code auf [admin.freeplay.church](https://admin.freeplay.church) ein und wählen die Bildschirmgruppe, deren Kalender er folgen soll. Dies tun Sie nur einmal pro Fernseher.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Installieren und starten Sie FreePlay auf dem Fernseher. Siehe [Erste Schritte](../getting-started/)
- Halten Sie ein ChurchApps-Konto für Ihre Kirche bereit, damit Sie sich bei FreePlay Admin anmelden können
- Erstellen Sie optional zuerst eine [Wiedergabeliste](./building-playlists) und [planen Sie sie ein](./scheduling-the-calendar), damit der Fernseher sofort etwas abspielen kann

</div>

## Den Code auf dem Fernseher anzeigen

1. Öffnen Sie auf dem Fernseher unten in der Seitenleiste **Einstellungen**.
2. Wählen Sie **Mit einem Kalender koppeln**. Die Zeile zeigt **Nicht gekoppelt**, solange der Fernseher noch nicht gekoppelt ist.
3. Der Bildschirm **Diesen Bildschirm koppeln** zeigt einen QR-Code und einen vierstelligen Kopplungscode mit der Meldung **Mit Ihrem Telefon scannen oder auf freeplay.church/pair gehen und diesen Code eingeben**.
4. Unterhalb des Codes pulsiert **Warte auf Bestätigung**, während FreePlay darauf wartet, dass Sie die Kopplung abschließen.

Der Code ist 15 Minuten gültig; ein Countdown darunter zeigt die verbleibende Zeit. Läuft die Zeit ab, zeigt FreePlay von selbst einen neuen Code an. Sie können auch **Neuen Code erzeugen** wählen, um einen frischen Code zu erhalten, oder **Abbrechen**, um zu den Einstellungen zurückzukehren.

## Kopplung in FreePlay Admin

1. Scannen Sie den QR-Code mit Ihrem Telefon oder öffnen Sie **freeplay.church/pair** auf einem beliebigen Computer oder Telefon. Melden Sie sich an, falls Sie dazu aufgefordert werden. FreePlay Admin öffnet das Formular **Bildschirm koppeln** mit dem bereits eingetragenen Code.
   - Sie können das Formular auch selbst öffnen. Gehen Sie in FreePlay Admin zu **Bildschirme** und klicken Sie auf **Bildschirm koppeln**.
2. Prüfen Sie den **Kopplungscode**. Es sind die vier Buchstaben auf dem Fernseher.
3. Geben Sie eine **Bezeichnung** ein, damit Sie diesen Fernseher von den anderen unterscheiden können, etwa "Foyer links". Das ist optional.
4. Wählen Sie unter **Gruppe** die Bildschirmgruppe, deren Kalender dieser Fernseher folgen soll. Um eine neue anzulegen, wählen Sie **＋ Neue Gruppe…** und geben Sie einen **Namen der neuen Gruppe** ein.
5. Lassen Sie unter **Modus** **Geplant** ausgewählt. Der Fernseher spielt dann selbstständig nach dem Kalender der Gruppe ab.
6. Klicken Sie auf **Koppeln**.

Der Fernseher zeigt **Verbunden!** und danach **Lade deinen Zeitplan...** an. Er lädt die geplanten Inhalte herunter und beginnt mit der Wiedergabe. Siehe [Geplante Wiedergabe auf dem Fernseher](./scheduled-playback).

:::info
Meldet FreePlay Admin **Dieser Code passt zu keinem Fernseher**, prüfen Sie den Code auf dem Bildschirm. Ist er abgelaufen, verwenden Sie den neuen Code, den der Fernseher jetzt anzeigt.
:::

### Geplant oder manuell

Die Einstellung **Modus** hat zwei Optionen:

- **Geplant** -- Spielt nach dem Kalender der Gruppe selbstständig ab. Niemand muss Start drücken.
- **Manuell** -- Jemand wählt die Inhalte mit der Fernbedienung. Ein manueller Bildschirm erscheint trotzdem in Ihrer Liste **Bildschirme**, folgt aber keinem Kalender, daher ist das Feld **Gruppe** deaktiviert.

Sie können den Modus eines Bildschirms später über **Bearbeiten** auf der [Seite Bildschirme](./managing-screens) ändern.

## Stattdessen an einen Dienstplan koppeln

Der Code auf dem Bildschirm **Diesen Bildschirm koppeln** funktioniert auch in B1 Admin. Geben Sie ihn dort ein und wählen Sie unter **Pläne anzeigen für** einen Plantyp, folgt der Fernseher diesem Plantyp im [Planmodus](../plan-mode/) statt einem Kalender. Siehe [Ihr Gerät koppeln](../plan-mode/device-pairing).

## Auf dem Fernseher ändern oder die Kopplung aufheben

Ist der Fernseher gekoppelt, zeigt die Zeile **Mit einem Kalender koppeln** unter **Einstellungen** den Namen der Bildschirmgruppe, der er folgt. Wählen Sie die Zeile, um den Dialog **Gekoppelt mit** zu öffnen, der drei Optionen bietet:

- **Zurück zum Zeitplan** -- Schließt den Dialog und führt zurück zum geplanten Player. An der Kopplung ändert sich nichts.
- **Kopplung aufheben** -- Beendet das Folgen eines Zeitplans. FreePlay öffnet den Bildschirm **Inhaltsanbieter**.
- **Mit einem anderen Kalender koppeln** -- Hebt die Kopplung auf und zeigt dann einen neuen Kopplungscode, damit Sie den Fernseher erneut koppeln können.

:::warning
Das Aufheben der Kopplung entfernt die Dateien, die FreePlay für diesen Kalender heruntergeladen hat.
:::

## Die Kopplung in FreePlay Admin aufheben

1. Gehen Sie zu **Bildschirme** und klicken Sie auf die Bezeichnung des Bildschirms.
2. Klicken Sie auf **Mehr** und dann auf **Kopplung aufheben**.
3. Klicken Sie zur Bestätigung noch einmal auf **Kopplung aufheben**.

Der Fernseher zeigt danach wieder einen Kopplungscode an. Koppeln Sie ihn erneut, wann immer Sie ihn wieder nutzen möchten.

## Verwandte Artikel

- **[Bildschirme und Gruppen verwalten](./managing-screens)** -- Einen Bildschirm umbenennen, in eine andere Gruppe verschieben oder seine Downloads prüfen
- **[Kalender planen](./scheduling-the-calendar)** -- Festlegen, was die Bildschirme der Gruppe abspielen
- **[Kopplungsmodus wählen](../getting-started/pairing-modes)** -- Geplanten Modus mit dem Planmodus und dem eigenständigen Durchsuchen von Anbietern vergleichen
