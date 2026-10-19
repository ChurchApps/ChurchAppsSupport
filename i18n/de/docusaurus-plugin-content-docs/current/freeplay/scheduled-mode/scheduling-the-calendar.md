---
title: "Den Kalender planen"
---

# Den Kalender planen

<div class="article-intro">

Die Seite **Kalender** in FreePlay Admin legt fest, was jede Bildschirmgruppe wann abspielt. Fügen Sie einen Zeitplan für eine Playlist, einen Gottesdienstplan oder einen Anbieterordner hinzu und stellen Sie ein, ob er wöchentlich wiederholt oder einmalig abgespielt wird. Ist nichts geplant, läuft die Standardschleife der Gruppe.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Erstellen Sie mindestens eine Bildschirmgruppe. Siehe [Bildschirme und Gruppen verwalten](./managing-screens#screen-groups)
- [Erstellen Sie eine Playlist](./building-playlists) oder richten Sie in B1 Admin einen Planungstyp ein

</div>

## Den Kalender lesen

1. Gehen Sie zu **Kalender**.
2. Wählen Sie oben über die Reiter eine Bildschirmgruppe aus. Jeder Reiter zeigt, wie viele Zeitpläne die Gruppe hat.
3. Die Wochenansicht reicht von Montag bis Sonntag, von 6 bis 22 Uhr. Eine rote Linie markiert die aktuelle Uhrzeit.
4. Verwenden Sie die Pfeile, um zur vorherigen oder nächsten Woche zu wechseln, oder klicken Sie auf **Heute**, um zur aktuellen Woche zurückzukehren.

Der Untertitel der Seite zeigt die Zeitzone des Kalenders. Zeitpläne richten sich nach der Zeitzone Ihrer Kirche. Ist für Ihre Kirche keine Zeitzone festgelegt, verwendet FreePlay die Zeitzone Ihres Standorts.

Zeitpläne sind nach Typ farblich gekennzeichnet. Eine Legende erklärt die Farben:

- **Standardschleife** - Schraffierter Hintergrund, wird hinter allem angezeigt, wenn die Gruppe eine Standardschleife hat
- **Playlist**
- **Gottesdienstplan**
- **Anbieterordner**

Jeder Block zeigt seinen Namen; höhere Blöcke zeigen außerdem die Zeiten, ob er sich wiederholt (**wöchentlich** oder **einmalig**) und was passiert, wenn er vorzeitig endet.

## Die Standardschleife festlegen

Die Standardschleife läuft auf den Bildschirmen der Gruppe, wann immer nichts geplant ist.

1. Klicken Sie auf der Seite **Kalender** in der Kopfzeile auf **Standardschleife…**. Ist bereits eine Standardschleife festgelegt, zeigt die Schaltfläche **Standardschleife:** gefolgt vom Namen der Playlist.
2. Wählen Sie eine **Playlist** oder wählen Sie **Keine – Bildschirm bleibt dunkel**.
3. Klicken Sie auf **Speichern**.

## Einen Zeitplan hinzufügen

Es gibt drei Möglichkeiten, einen neuen Zeitplan zu beginnen:

- Klicken Sie auf eine freie Stelle im Kalender. Das Formular öffnet sich mit diesem Tag und der halben Stunde bereits ausgefüllt.
- Klicken Sie in der Kopfzeile auf **Zeitplan hinzufügen**.
- Wählen Sie **Zeitplan hinzufügen** in der Befehlspalette (**Strg+K** oder **⌘K**).

Füllen Sie danach das Formular aus:

1. **Abspielen** - Wählen Sie, was abgespielt wird:
   - **Playlists** - Jede Playlist, die Sie erstellt haben
   - **Gottesdienstpläne** - Ein Planungstyp aus B1 Admin, mit **(aktueller Plan)** gekennzeichnet. Der Bildschirm spielt jede Woche den jeweils aktuellen Plan für diesen Planungstyp ab
   - **Anbieterordner…** - Öffnet **Anbieterordner auswählen**. Navigieren Sie zu einem Ordner und klicken Sie auf **Diesen Ordner verwenden**. Um später einen anderen Ordner auszuwählen, klicken Sie auf **Ändern**
2. **Wiederholung** - Wählen Sie die Wochentage aus, an denen dieser Zeitplan läuft. Für ein einzelnes Datum aktivieren Sie stattdessen **Einmalig** und wählen das **Datum** aus.
3. **Beginn** und **Ende** - Die Zeiten, zu denen der Zeitplan beginnt und endet.
4. **Wenn er vorzeitig endet** - Was geschehen soll, wenn der Inhalt vor der Endzeit ausgeht:
   - **Bis zur Endzeit wiederholen** - Beginnt wieder von vorn. Gut für Hinweisschleifen, Ankündigungen und Countdowns
   - **Im Takt des Lehrers** - Folien warten auf die Fernbedienung des Lehrers. Die Lektion bleibt nach der Endzeit stehen, bis zur letzten Folie
   - **Einmal abspielen, dann zur Standardschleife zurückkehren**
5. Stellen Sie bei sich wiederholenden Zeitplänen unter **Beginnt am** das erste Datum ein. Wählen Sie unter **Endet** entweder **Nie** oder **Am Datum** und geben Sie ein **Enddatum** ein.
6. Klicken Sie auf **Speichern**.

:::info
**Im Takt des Lehrers** ersetzt die ältere Option „letzte Folie halten“. Zeitpläne, die mit dieser Option gespeichert wurden, laufen jetzt als „Im Takt des Lehrers“.
:::

## Einen Zeitplan bearbeiten oder löschen

1. Klicken Sie im Kalender auf den Block des Zeitplans.
2. Ändern Sie ein beliebiges Feld und klicken Sie auf **Speichern**, oder klicken Sie auf **Löschen**, um den Zeitplan zu entfernen.

## Überlappende Zeitpläne

Überlappen sich zwei Zeitpläne, zeigt das Formular eine Warnung: **Überschneidet sich mit einem anderen Zeitplan. Der später beginnende gewinnt.** Während der spätere Zeitplan läuft, spielen die Bildschirme ihn ab. Wenn er endet, kehren sie zum früheren Zeitplan zurück, sofern dieser noch läuft.

## Wie Bildschirme Änderungen übernehmen

Gekoppelte Bildschirme laden alles herunter, was in den nächsten 7 Tagen geplant ist, und suchen selbstständig nach Änderungen. Sie müssen den Fernseher nach einer Bearbeitung des Kalenders nicht anfassen. Um zu sehen, wann ein Bildschirm alles Nötige hat, prüfen Sie **Bereit bis** auf der [Seite Bildschirme](./managing-screens).

## Verwandte Artikel

- **[Playlists erstellen](./building-playlists)** - Erstellen Sie die Playlists, die Sie planen
- **[Geplante Wiedergabe auf dem Fernseher](./scheduled-playback)** - Wie Lektionen im Takt des Lehrers und die Fernbedienung auf dem Fernseher funktionieren
- **[Bildschirme und Gruppen verwalten](./managing-screens)** - Gruppen hinzufügen und die Downloads jedes Bildschirms prüfen
