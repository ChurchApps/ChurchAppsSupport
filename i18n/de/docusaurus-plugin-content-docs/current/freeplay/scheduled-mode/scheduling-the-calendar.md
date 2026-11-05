---
title: "Den Kalender planen"
---

# Den Kalender planen

<div class="article-intro">

Die Seite **Kalender** in FreePlay Admin legt fest, was jede Bildschirmgruppe wann abspielt. Fügen Sie einen Zeitplan für eine Wiedergabeliste, einen Dienstplan oder einen Anbieterordner hinzu und stellen Sie ein, ob er wöchentlich wiederholt oder einmalig abgespielt wird. Ist nichts geplant, läuft die Standardschleife der Gruppe.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Erstellen Sie mindestens eine Bildschirmgruppe. Siehe [Bildschirme und Gruppen verwalten](./managing-screens#screen-groups)
- [Erstellen Sie eine Wiedergabeliste](./building-playlists) oder richten Sie in B1 Admin einen Plantyp ein

</div>

## Den Kalender lesen

1. Öffnen Sie **Kalender**.
2. Wählen Sie oben eine Bildschirmgruppe aus den Reitern. Jeder Reiter zeigt, wie viele Zeitpläne die Gruppe hat.
3. Die Wochenansicht läuft von Montag bis Sonntag, von 6 bis 22 Uhr. Eine rote Linie markiert die aktuelle Uhrzeit.
4. Mit den Pfeilen wechseln Sie zur vorherigen oder nächsten Woche, oder Sie klicken auf **Heute**, um zu dieser Woche zurückzukehren.

Der Untertitel der Seite zeigt die Zeitzone des Kalenders. Zeitpläne richten sich nach der Zeitzone Ihrer Kirche, die Sie in B1 Admin unter [Kircheninformationen](../../b1-admin/settings/church-settings.md#time-zone) festlegen. Ist für Ihre Kirche keine Zeitzone festgelegt, verwendet FreePlay die Zeitzone Ihres Standorts. Kalender und Fernseher verwenden dieselbe Zeitzone: Ein Block, der im Kalender um 9:00 Uhr liegt, wird auch auf dem Bildschirm um 9:00 Uhr abgespielt, selbst wenn Ihr Computer auf eine andere Zeitzone eingestellt ist.

Zeitpläne sind nach Art farblich gekennzeichnet. Eine Legende erklärt die Farben:

- **Standardschleife** -- Schraffierter Hintergrund, der hinter allem angezeigt wird, wenn die Gruppe eine Standardschleife hat
- **Wiedergabeliste**
- **Dienstplan**
- **Anbieterordner**

Jeder Block zeigt seinen Namen. Höhere Blöcke zeigen außerdem die Uhrzeiten, ob sie sich wiederholen (**wöchentlich** oder **einmalig**) und was geschieht, wenn der Inhalt vorzeitig endet.

## Die Standardschleife festlegen

Die Standardschleife läuft auf den Bildschirmen der Gruppe, sobald nichts geplant ist.

1. Klicken Sie auf der Seite **Kalender** in der Kopfzeile auf **Standardschleife…**. Ist bereits eine Standardschleife festgelegt, zeigt die Schaltfläche **Standardschleife:** gefolgt vom Namen der Wiedergabeliste.
2. Wählen Sie eine **Wiedergabeliste** oder wählen Sie **Keine -- Bildschirm bleibt dunkel**.
3. Klicken Sie auf **Speichern**.

## Einen Zeitplan hinzufügen

Es gibt drei Wege, einen neuen Zeitplan anzulegen:

- Klicken Sie auf eine freie Stelle im Kalender. Das Formular öffnet sich mit diesem Tag und dieser halben Stunde bereits ausgefüllt.
- Klicken Sie in der Kopfzeile auf **Zeitplan hinzufügen**.
- Wählen Sie **Zeitplan hinzufügen** in der Befehlspalette (**Strg+K** oder **⌘K**).

Füllen Sie dann das Formular aus:

1. **Abspielen** -- Wählen Sie, was abgespielt wird:
   - **Wiedergabelisten** -- Jede Wiedergabeliste, die Sie erstellt haben
   - **Dienstpläne** -- Ein Plantyp aus B1 Admin, mit der Kennzeichnung **(aktueller Plan)**. Der Bildschirm spielt jede Woche den jeweils aktuellen Plan dieses Plantyps ab, einschließlich Go-Curriculum-Lektionen (auch angepasster), die das Go-Login des Dienstbereichs verwenden, der dem Plantyp zugeordnet ist
   - **Anbieterordner…** -- Öffnet **Anbieterordner auswählen**. Navigieren Sie zu einem Ordner und klicken Sie auf **Diesen Ordner verwenden**. Um später einen anderen Ordner zu wählen, klicken Sie auf **Ändern**
2. **Wiederholen** -- Wählen Sie die Wochentage, an denen dieser Zeitplan läuft. Für ein einzelnes Datum aktivieren Sie stattdessen **Einmalig** und wählen das **Datum** aus.
3. **Beginn** und **Ende** -- Die Uhrzeiten, zu denen der Zeitplan startet und endet.
4. **Wenn er vorzeitig endet** -- Was geschehen soll, wenn der Inhalt vor der Endzeit zu Ende ist:
   - **Bis zur Endzeit schleifen** -- Beginnt wieder von vorn. Gut für Hinweisschleifen, Ankündigungen und Countdowns
   - **Lehrkraft bestimmt Tempo** -- Folien warten auf die Fernbedienung der Lehrkraft. Die Lektion bleibt über die Endzeit hinaus stehen, bis die letzte Folie erreicht ist
   - **Einmal abspielen, dann zur Standardschleife zurückkehren**
5. Legen Sie bei wiederholten Zeitplänen unter **Beginnt am** das erste Datum fest. Wählen Sie unter **Endet** entweder **Nie** oder **Am Datum** und geben Sie ein **Enddatum** ein.
6. Klicken Sie auf **Speichern**.

:::info
**Lehrkraft bestimmt Tempo** hat die ältere Option "letzte Folie halten" ersetzt. Zeitpläne, die mit dieser Option gespeichert wurden, werden nun als Lehrkraft bestimmt Tempo abgespielt.
:::

## Einen Zeitplan bearbeiten oder löschen

1. Klicken Sie im Kalender auf den Block des Zeitplans.
2. Ändern Sie ein beliebiges Feld und klicken Sie auf **Speichern**, oder klicken Sie auf **Löschen**, um den Zeitplan zu entfernen.

## Überlappende Zeitpläne

Überlappen sich zwei Zeitpläne, zeigt das Formular eine Warnung: **Überschneidet sich mit einem anderen Zeitplan. Der später beginnende gewinnt.** Solange der spätere Zeitplan läuft, spielen die Bildschirme ihn ab. Wenn er endet, kehren sie zum früheren Zeitplan zurück, sofern dieser noch läuft.

## Wie Bildschirme Änderungen übernehmen

Gekoppelte Bildschirme laden alles herunter, was für die nächsten 7 Tage geplant ist, und prüfen selbstständig auf Änderungen. Nach einer Änderung am Kalender müssen Sie den Fernseher nicht berühren. Um zu sehen, ob ein Bildschirm alles Nötige hat, prüfen Sie **Bereit bis** auf der [Seite Bildschirme](./managing-screens).

## Verwandte Artikel

- **[Wiedergabelisten erstellen](./building-playlists)** -- Erstellen Sie die Wiedergabelisten, die Sie planen
- **[Geplante Wiedergabe auf dem Fernseher](./scheduled-playback)** -- Wie Lehrkraft-Tempo-Lektionen und die Fernbedienung auf dem Fernseher funktionieren
- **[Bildschirme und Gruppen verwalten](./managing-screens)** -- Gruppen hinzufügen und die Downloads jedes Bildschirms prüfen
- **[Nur einen Teil jeder Lektion behalten](/docs/b1-admin/serving/scheduling-lessons#keeping-only-part-of-every-lesson)** -- Jede geplante Lektion eines Plantyps auf die Teile kürzen, die Ihr Raum abspielt
