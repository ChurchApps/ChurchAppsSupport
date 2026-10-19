---
title: "Einen Bildschirm koppeln"
---

# Einen Bildschirm koppeln

<div class="article-intro">

Um einen Fernseher mit einem Kalender zu verbinden, koppeln Sie ihn mit **FreePlay Admin**. Der Fernseher zeigt einen vierstelligen Code an. Sie geben diesen Code unter [admin.freeplay.church](https://admin.freeplay.church) ein und wählen die Bildschirmgruppe aus, deren Kalender der Fernseher übernehmen soll. Dies machen Sie nur einmal pro Fernseher.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Installieren und starten Sie FreePlay auf dem Fernseher. Siehe [Erste Schritte](../getting-started/)
- Halten Sie einen ChurchApps-Zugang für Ihre Kirche bereit, damit Sie sich bei FreePlay Admin anmelden können
- Optional: [Erstellen Sie eine Wiedergabeliste](./building-playlists) und [planen Sie sie](./scheduling-the-calendar), damit der Fernseher sofort etwas abspielen kann

</div>

## Den Code auf dem Fernseher anzeigen

1. Öffnen Sie auf dem Fernseher unten in der Seitenleiste **Einstellungen**.
2. Wählen Sie **Mit einem Kalender koppeln**. Die Zeile zeigt **Nicht gekoppelt**, solange der Fernseher noch nicht gekoppelt ist.
3. Der Bildschirm **Diesen Bildschirm koppeln** zeigt einen QR-Code und einen vierstelligen Kopplungscode mit der Meldung **Mit dem Telefon scannen oder auf freeplay.church/pair gehen und diesen Code eingeben**.
4. Unterhalb des Codes pulsiert **Warten auf Bestätigung**, solange FreePlay darauf wartet, dass Sie die Kopplung abschließen.

Der Code ist 15 Minuten gültig; ein Countdown darunter zeigt, wie viel Zeit noch bleibt. Wenn die Zeit abläuft, zeigt FreePlay automatisch einen neuen Code an. Sie können auch **Neuen Code erzeugen** wählen, um sofort einen neuen Code zu erhalten, oder **Abbrechen**, um zu den Einstellungen zurückzukehren.

## Kopplung in FreePlay Admin

1. Scannen Sie den QR-Code mit Ihrem Telefon oder rufen Sie **freeplay.church/pair** auf einem beliebigen Computer oder Telefon auf. Melden Sie sich an, falls Sie dazu aufgefordert werden. FreePlay Admin öffnet das Formular **Bildschirm koppeln** mit bereits ausgefülltem Code.
   - Sie können das Formular auch selbst öffnen. Gehen Sie in FreePlay Admin zu **Bildschirme** und klicken Sie auf **Bildschirm koppeln**.
2. Prüfen Sie den **Kopplungscode**. Es sind die vier Buchstaben auf dem Fernseher.
3. Geben Sie ein **Bezeichnung** ein, damit Sie diesen Fernseher von den anderen unterscheiden können, zum Beispiel „Lobby left“. Dies ist optional.
4. Wählen Sie unter **Gruppe** die Bildschirmgruppe aus, deren Kalender dieser Fernseher übernehmen soll. Um eine neue Gruppe anzulegen, wählen Sie **＋ Neue Gruppe…** und geben Sie einen **Name der neuen Gruppe** ein.
5. Lassen Sie unter **Modus** die Option **Geplant** ausgewählt. Der Fernseher spielt dann selbstständig nach dem Kalender der Gruppe ab.
6. Klicken Sie auf **Koppeln**.

Der Fernseher zeigt **Verbunden!** und danach **Ihr Zeitplan wird geladen...**. Er lädt die geplanten Inhalte herunter und beginnt mit der Wiedergabe. Siehe [Geplante Wiedergabe auf dem Fernseher](./scheduled-playback).

:::info
Wenn FreePlay Admin **Dieser Code passt zu keinem Fernseher** meldet, prüfen Sie den Code auf dem Bildschirm. Ist er abgelaufen, verwenden Sie den neuen Code, den der Fernseher gerade anzeigt.
:::

### Geplant oder manuell

Die Einstellung **Modus** bietet zwei Optionen:

- **Geplant** — Spielt nach dem Kalender der Gruppe selbstständig ab. Niemand muss Start drücken.
- **Manuell** — Jemand wählt die Inhalte mit der Fernbedienung aus. Ein manueller Bildschirm erscheint trotzdem in Ihrer Liste **Bildschirme**, folgt aber keinem Kalender, daher ist das Feld **Gruppe** deaktiviert.

Sie können den Modus eines Bildschirms später über **Bearbeiten** auf der [Seite Screens](./managing-screens) ändern.

## Stattdessen mit einem Gottesdienstplan koppeln

Der Code auf dem Bildschirm **Diesen Bildschirm koppeln** funktioniert auch in B1 Admin. Wenn Sie ihn dort eingeben und unter **Pläne anzeigen für** einen Plantyp auswählen, folgt der Fernseher diesem Plantyp im [Planmodus](../plan-mode/) statt einem Kalender. Siehe [Gerät koppeln](../plan-mode/device-pairing).

## Am Fernseher ändern oder die Kopplung aufheben {#changing-or-unpairing-from-the-tv}

Sobald der Fernseher gekoppelt ist, zeigt die Zeile **Mit einem Kalender koppeln** in **Einstellungen** den Namen der Bildschirmgruppe, der er folgt. Wählen Sie die Zeile aus, um den Dialog **Gekoppelt mit** zu öffnen, der drei Optionen bietet:

- **Behalten** — Schließt den Dialog. Nichts ändert sich.
- **Kopplung aufheben** — Beendet das Folgen eines Zeitplans. FreePlay öffnet den Bildschirm **Inhaltsanbieter**.
- **Mit einem anderen Kalender koppeln** — Hebt die Kopplung auf und zeigt dann einen neuen Kopplungscode, damit Sie den Fernseher erneut koppeln können.

:::warning
Wenn Sie die Kopplung aufheben, werden die Dateien entfernt, die FreePlay für diesen Kalender heruntergeladen hat.
:::

## Kopplung in FreePlay Admin aufheben

1. Gehen Sie zu **Bildschirme** und klicken Sie auf die Bezeichnung des Bildschirms.
2. Klicken Sie auf **Mehr** und dann auf **Kopplung aufheben**.
3. Bestätigen Sie mit einem erneuten Klick auf **Kopplung aufheben**.

Der Fernseher zeigt danach wieder einen Kopplungscode an. Koppeln Sie ihn erneut, wann immer Sie ihn wieder verwenden möchten.

## Verwandte Artikel

- **[Bildschirme und Gruppen verwalten](./managing-screens)** — Einen Bildschirm umbenennen, in eine andere Gruppe verschieben oder seine Downloads prüfen
- **[Den Kalender planen](./scheduling-the-calendar)** — Festlegen, was die Bildschirme der Gruppe abspielen
- **[Einen Kopplungsmodus wählen](../getting-started/pairing-modes)** — Geplanten Modus mit dem Planmodus vergleichen und Inhaltsanbieter selbst durchsuchen
