---
title: "Den Kalender planen"
description: "Richte im Kalender der FreePlay-Verwaltung einen wöchentlichen oder einmaligen Zeitplan ein, um Playlists, Dienstpläne oder Anbieter-Ordner auf deinen Bildschirmgruppen abzuspielen, mit Standardschleifen als Ausweichlösung."
---

# Den Kalender planen

<div class="article-intro">

Die Seite **Kalender** in der FreePlay-Verwaltung steuert, was jede Bildschirmgruppe wann abspielt. Füge einen Zeitplan für eine Playlist, einen Dienstplan oder einen Anbieter-Ordner hinzu und lege fest, ob er wöchentlich wiederholt oder einmal abgespielt wird. Ist nichts geplant, läuft die Standardschleife der Gruppe.

</div>

<div class="prereqs">
<h4>Bevor du beginnst</h4>

- Lege mindestens eine Bildschirmgruppe an. Siehe [Bildschirme und Gruppen verwalten](./managing-screens.md#screen-groups)
- [Erstelle eine Playlist](./building-playlists.md) oder richte im B1 Admin einen Plantyp ein

</div>

## Den Kalender lesen {#reading-the-calendar}

1. Öffne **Kalender**.
2. Wähle oben über die Reiter eine Bildschirmgruppe aus. Jeder Reiter zeigt, wie viele Zeitpläne die Gruppe hat.
3. Die Wochenansicht läuft von Montag bis Sonntag, 6 bis 22 Uhr. Eine rote Linie markiert die aktuelle Uhrzeit.
4. Mit den Pfeilen wechselst du zur vorherigen oder nächsten Woche, oder du klickst auf **Heute**, um zu dieser Woche zurückzukehren.

Der Untertitel der Seite zeigt die Zeitzone des Kalenders. Zeitpläne richten sich nach der Zeitzone deiner Gemeinde, die du im B1 Admin unter [Gemeindeinformationen](../../b1-admin/settings/church-settings.md#time-zone) festlegst. Hat deine Gemeinde keine Zeitzone eingestellt, verwendet FreePlay die Zeitzone deines Standorts. Kalender und deine Fernseher verwenden dieselbe Zeitzone, sodass ein Block, den du im Kalender auf 9:00 Uhr legst, auch auf dem Bildschirm um 9:00 Uhr abgespielt wird, selbst wenn dein Computer auf eine andere Zeitzone eingestellt ist.

Zeitpläne sind nach Typ farblich markiert. Eine Legende erklärt die Farben:

- **Standardschleife** - Schraffierter Hintergrund, liegt hinter allem, wenn die Gruppe eine Standardschleife hat
- **Playlist**
- **Dienstplan**
- **Anbieter-Ordner**

Jeder Block zeigt seinen Namen; höhere Blöcke zeigen außerdem die Uhrzeiten, ob er sich wiederholt (**wöchentlich** oder **einmalig**) und was passiert, wenn er vorzeitig endet.

## Die Standardschleife festlegen {#setting-the-default-loop}

Die Standardschleife läuft auf den Bildschirmen der Gruppe, sobald nichts geplant ist.

1. Klicke auf der Seite **Kalender** im Kopfbereich auf **Standardschleife…**. Ist bereits eine Standardschleife festgelegt, zeigt die Schaltfläche **Standardschleife:** gefolgt vom Namen der Playlist.
2. Wähle eine **Playlist** oder wähle **Keine -- Bildschirm bleibt dunkel**.
3. Klicke auf **Speichern**.

## Einen Zeitplan hinzufügen {#adding-a-schedule}

Es gibt drei Wege, einen neuen Zeitplan zu beginnen:

- Klicke auf eine freie Stelle im Kalender. Das Formular öffnet sich mit diesem Tag und der halben Stunde bereits ausgefüllt.
- Klicke im Kopfbereich auf **Zeitplan hinzufügen**.
- Wähle **Zeitplan hinzufügen** in der Befehlspalette (**Strg+K** oder **⌘K**).

Fülle danach das Formular aus:

1. **Abspielen** - Wähle, was abgespielt wird:
   - **Playlists** - Jede Playlist, die du erstellt hast
   - **Dienstpläne** - Ein Plantyp aus dem B1 Admin, mit der Markierung **(aktueller Plan)**. Der Bildschirm spielt jede Woche den jeweils aktuellen Plan dieses Plantyps ab, einschließlich Go-Curriculum-Lektionen (auch angepasste), die die Go-Anmeldung der Abteilung des Plantyps verwenden
   - **Anbieter-Ordner…** - Öffnet **Anbieter-Ordner auswählen**. Navigiere zu einem Ordner und klicke auf **Diesen Ordner verwenden**. Um später einen anderen Ordner zu wählen, klicke auf **Ändern**
2. **Wiederholung** - Wähle die Wochentage, an denen dieser Zeitplan läuft. Für ein einzelnes Datum stattdessen **Einmalig** aktivieren und das **Datum** wählen.
3. **Beginn** und **Ende** - Die Uhrzeiten, zu denen der Zeitplan beginnt und endet.
4. **Wenn er vorzeitig endet** - Was geschehen soll, wenn der Inhalt vor der Endzeit ausgeht:
   - **Bis zur Endzeit schleifen** - Beginnt von vorn. Gut für Hinweisschleifen, Ankündigungen und Countdowns
   - **Vom Lehrer getaktet** - Folien warten auf die Fernbedienung des Lehrers. Die Lektion bleibt über die Endzeit hinaus stehen, bis zur letzten Folie
   - **Einmal abspielen, dann zur Standardschleife zurückkehren**
5. Setze bei sich wiederholenden Zeitplänen **Beginnt am** auf das erste Datum. Wähle unter **Endet** entweder **Nie** oder **Am Datum** und trage ein **Enddatum** ein.
6. Klicke auf **Speichern**.

:::info
**Vom Lehrer getaktet** hat die ältere Option "letzte Folie halten" ersetzt. Zeitpläne, die mit dieser Option gespeichert wurden, werden nun als vom Lehrer getaktet abgespielt.
:::

## Einen Zeitplan bearbeiten oder löschen {#editing-or-deleting-a-schedule}

1. Klicke im Kalender auf den Block des Zeitplans.
2. Ändere ein beliebiges Feld und klicke auf **Speichern**, oder klicke auf **Löschen**, um den Zeitplan zu entfernen.

## Überlappende Zeitpläne {#overlapping-schedules}

Überlappen sich zwei Zeitpläne, zeigt das Formular eine Warnung: **Überschneidet sich mit einem anderen Zeitplan. Der später beginnende gewinnt.** Während der spätere Zeitplan läuft, spielen die Bildschirme ihn ab. Endet er, kehren sie zum früheren Zeitplan zurück, sofern dieser noch läuft.

## Wie Bildschirme Änderungen übernehmen {#how-screens-pick-up-changes}

Gekoppelte Bildschirme laden alles herunter, was für die nächsten 7 Tage geplant ist, und prüfen selbstständig auf Änderungen. Du musst den Fernseher nach einer Änderung am Kalender nicht anfassen. Um zu sehen, ob ein Bildschirm alles hat, was er braucht, prüfe **Bereit bis** auf der [Seite Bildschirme](./managing-screens.md).

## Verwandte Artikel {#related-articles}

- **[Playlists erstellen](./building-playlists.md)** - Erstelle die Playlists, die du planst
- **[Geplante Wiedergabe auf dem Fernseher](./scheduled-playback.md)** - Wie vom Lehrer getaktete Lektionen und die Fernbedienung auf dem Fernseher funktionieren
- **[Bildschirme und Gruppen verwalten](./managing-screens.md)** - Gruppen hinzufügen und die Downloads jedes Bildschirms prüfen
- **[Nur einen Teil jeder Lektion behalten](/docs/b1-admin/serving/scheduling-lessons#keeping-only-part-of-every-lesson)** - Kürze jede geplante Lektion eines Plantyps auf die Teile, die dein Raum abspielt
