---
title: "Den Kalender planen"
---

# Den Kalender planen

<div class="article-intro">

Die Seite **Kalender** in FreePlay Admin legt fest, was jede Bildschirmgruppe wann abspielt. Fügen Sie einen Zeitplan für eine Wiedergabeliste, einen Gottesdienstplan oder einen Anbieterordner hinzu und stellen Sie ihn so ein, dass er wöchentlich wiederholt wird oder einmalig läuft. Ist nichts eingeplant, spielt die Standardschleife der Gruppe.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Legen Sie mindestens eine Bildschirmgruppe an. Siehe [Bildschirme und Gruppen verwalten](./managing-screens#screen-groups)
- [Erstellen Sie eine Wiedergabeliste](./building-playlists) oder richten Sie in B1 Admin einen Plantyp ein

</div>

## Den Kalender lesen

1. Öffnen Sie **Kalender**.
2. Wählen Sie oben über die Reiter eine Bildschirmgruppe aus. Jeder Reiter zeigt, wie viele Zeitpläne die Gruppe hat.
3. Die Wochenansicht läuft von Montag bis Sonntag, von 6 bis 22 Uhr. Eine rote Linie markiert die aktuelle Uhrzeit.
4. Mit den Pfeilen wechseln Sie zur vorherigen oder nächsten Woche, mit **Heute** kehren Sie zu dieser Woche zurück.

Der Untertitel der Seite zeigt die Zeitzone des Kalenders. Zeitpläne richten sich nach der Zeitzone Ihrer Kirche, die Sie in B1 Admin unter [Kircheninformationen](../../b1-admin/settings/church-settings.md#time-zone) festlegen. Hat Ihre Kirche keine Zeitzone, verwendet FreePlay die Zeitzone Ihres Standorts. Kalender und Fernseher verwenden dieselbe Zeitzone: Ein Block, der auf dem Kalender um 9:00 Uhr steht, läuft also auch um 9:00 Uhr auf dem Bildschirm, selbst wenn Ihr Computer auf eine andere Zeitzone eingestellt ist.

Zeitpläne sind nach Art farblich gekennzeichnet. Eine Legende erklärt die Farben:

- **Standardschleife** – Schraffierter Hintergrund, der hinter allem angezeigt wird, wenn die Gruppe eine Standardschleife hat
- **Wiedergabeliste**
- **Gottesdienstplan**
- **Anbieterordner**

Jeder Block zeigt seinen Namen. Höhere Blöcke zeigen zusätzlich die Uhrzeiten, ob er sich wiederholt (**wöchentlich** oder **einmalig**) und was geschieht, wenn er früher endet.

## Die Standardschleife festlegen

Die Standardschleife läuft auf den Bildschirmen der Gruppe, sobald nichts eingeplant ist.

1. Klicken Sie auf der Seite **Kalender** im Kopfbereich auf **Standardschleife…**. Ist bereits eine Standardschleife festgelegt, zeigt die Schaltfläche **Standardschleife:** gefolgt vom Namen der Wiedergabeliste.
2. Wählen Sie eine **Wiedergabeliste** oder wählen Sie **Keine – Bildschirm bleibt dunkel**.
3. Klicken Sie auf **Speichern**.

## Einen Zeitplan hinzufügen

Auf drei Wegen legen Sie einen neuen Zeitplan an:

- Klicken Sie auf eine freie Stelle im Kalender. Das Formular öffnet sich mit dem Tag und der halben Stunde bereits ausgefüllt.
- Klicken Sie im Kopfbereich auf **Zeitplan hinzufügen**.
- Wählen Sie in der Befehlspalette (**Strg+K** bzw. **⌘K**) **Zeitplan hinzufügen**.

Füllen Sie dann das Formular aus:

1. **Abspielen** – Wählen Sie, was läuft:
   - **Wiedergabelisten** – jede Wiedergabeliste, die Sie erstellt haben
   - **Gottesdienstpläne** – ein Plantyp aus B1 Admin, mit **(aktueller Plan)** gekennzeichnet. Der Bildschirm spielt in jeder Woche den Plan ab, der für diesen Plantyp aktuell ist, einschließlich Lektionen von Go Curriculum (auch angepasster), die die Go-Anmeldung des Dienstbereichs des Plantyps verwenden
   - **Anbieterordner…** – Öffnet **Anbieterordner auswählen**. Navigieren Sie zu einem Ordner und klicken Sie auf **Diesen Ordner verwenden**. Um später einen anderen Ordner zu wählen, klicken Sie auf **Ändern**
2. **Wiederholt sich** – Wählen Sie die Wochentage, an denen dieser Zeitplan läuft. Für ein einzelnes Datum aktivieren Sie stattdessen **Einmalig** und wählen das **Datum**.
3. **Beginn** und **Ende** – Die Uhrzeiten, zu denen der Zeitplan beginnt und endet.
4. **Wenn er früher endet** – Was geschieht, wenn der Inhalt vor der Endzeit zu Ende ist:
   - **Bis zur Endzeit wiederholen** – Beginnt von vorn. Gut für Beschilderungsschleifen, Ankündigungen und Countdowns
   - **Im Takt des Lehrers** – Folien warten auf die Fernbedienung der Lehrkraft. Die Lektion bleibt über die Endzeit hinaus stehen, bis zur letzten Folie
   - **Einmal abspielen, dann zur Standardschleife zurückkehren**
5. Bei wiederholten Zeitplänen setzen Sie **Beginnt am** auf das erste Datum. Unter **Endet** wählen Sie **Nie** oder **Am Datum** und geben ein **Enddatum** ein.
6. Klicken Sie auf **Speichern**.

:::info
**Im Takt des Lehrers** ersetzt die frühere Option „letzte Folie halten“. Zeitpläne, die mit dieser Option gespeichert wurden, laufen nun im Takt des Lehrers.
:::

## Einen Zeitplan bearbeiten oder löschen

1. Klicken Sie im Kalender auf den Block des Zeitplans.
2. Ändern Sie ein beliebiges Feld und klicken Sie auf **Speichern**, oder klicken Sie auf **Löschen**, um den Zeitplan zu entfernen.

## Überlappende Zeitpläne

Überschneiden sich zwei Zeitpläne, zeigt das Formular eine Warnung: **Überschneidet sich mit einem anderen Zeitplan. Der später beginnende gewinnt.** Solange der spätere Zeitplan läuft, spielen die Bildschirme ihn ab. Endet er, kehren sie zum früheren Zeitplan zurück, sofern dieser noch läuft.

## Wie Bildschirme Änderungen übernehmen

Gekoppelte Bildschirme laden alles herunter, was für die nächsten 7 Tage eingeplant ist, und suchen selbstständig nach Änderungen. Nach einer Bearbeitung des Kalenders müssen Sie den Fernseher nicht anfassen. Um zu prüfen, ob ein Bildschirm alles hat, was er braucht, sehen Sie auf der [Seite Bildschirme](./managing-screens) unter **Bereit bis** nach.

## Verwandte Artikel

- **[Wiedergabelisten erstellen](./building-playlists)** – Erstellen Sie die Wiedergabelisten, die Sie einplanen
- **[Geplante Wiedergabe auf dem Fernseher](./scheduled-playback)** – Wie Lektionen im Takt des Lehrers und die Fernbedienung auf dem Fernseher funktionieren
- **[Bildschirme und Gruppen verwalten](./managing-screens)** – Gruppen hinzufügen und die Downloads jedes Bildschirms prüfen
