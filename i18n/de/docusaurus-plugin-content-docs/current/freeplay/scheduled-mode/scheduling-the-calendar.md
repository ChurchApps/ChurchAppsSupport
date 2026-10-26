---
title: "Den Kalender planen"
---

# Den Kalender planen

<div class="article-intro">

Die Seite **Kalender** in FreePlay Admin legt fest, was jede Bildschirmgruppe wann abspielt. Fügen Sie einen Termin für eine Playlist, einen Gottesdienstplan oder einen Anbieterordner hinzu und legen Sie fest, ob er wöchentlich wiederholt oder einmalig abgespielt wird. Wenn nichts geplant ist, spielt die Standard-Schleife der Gruppe.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Legen Sie mindestens eine Bildschirmgruppe an. Siehe [Bildschirme und Gruppen verwalten](./managing-screens#screen-groups)
- [Erstellen Sie eine Playlist](./building-playlists) oder richten Sie einen Plantyp in B1 Admin ein

</div>

## Den Kalender lesen

1. Öffnen Sie **Kalender**.
2. Wählen Sie oben über die Reiter eine Bildschirmgruppe aus. Jeder Reiter zeigt, wie viele Termine die Gruppe hat.
3. Die Wochenansicht läuft von Montag bis Sonntag, von 6 Uhr bis 22 Uhr. Eine rote Linie markiert die aktuelle Uhrzeit.
4. Verwenden Sie die Pfeile, um zur vorherigen oder nächsten Woche zu wechseln, oder klicken Sie auf **Today**, um zu dieser Woche zurückzukehren.

Der Untertitel der Seite zeigt die Zeitzone, die für den Kalender verwendet wird. Termine richten sich nach der Zeitzone Ihrer Gemeinde, die Sie in B1 Admin unter [Gemeindeinformationen](../../b1-admin/settings/church-settings.md#time-zone) festlegen. Hat Ihre Gemeinde keine Zeitzone eingestellt, verwendet FreePlay die Zeitzone Ihres Standorts. Der Kalender und Ihre TVs verwenden dieselbe Zeitzone, sodass ein um 9:00 Uhr im Kalender platzierter Block auch um 9:00 Uhr auf dem Bildschirm abgespielt wird – selbst dann, wenn Ihr Computer auf eine andere Zeitzone eingestellt ist.

Termine sind nach Art farblich gekennzeichnet. Eine Legende erklärt die Farben:

- **Default loop** – Schraffierter Hintergrund, der hinter allem angezeigt wird, wenn die Gruppe eine Standard-Schleife hat
- **Playlist**
- **Service plan**
- **Provider folder**

Jeder Block zeigt seinen Namen. Höhere Blöcke zeigen außerdem die Uhrzeiten, ob sich der Termin wiederholt (**weekly** oder **once**) und was passiert, wenn er früher endet.

## Die Standard-Schleife festlegen

Die Standard-Schleife läuft auf den Bildschirmen der Gruppe, wann immer nichts geplant ist.

1. Klicken Sie auf der Seite **Kalender** im Kopfbereich auf **Default loop…**. Ist bereits eine Standard-Schleife festgelegt, zeigt die Schaltfläche **Default loop:** gefolgt vom Namen der Playlist.
2. Wählen Sie eine **Playlist** aus oder wählen Sie **None — screen goes dark**.
3. Klicken Sie auf **Save**.

## Einen Termin hinzufügen

Es gibt drei Möglichkeiten, einen neuen Termin anzulegen:

- Klicken Sie auf eine freie Stelle im Kalender. Das Formular öffnet sich mit diesem Tag und der halben Stunde bereits ausgefüllt.
- Klicken Sie im Kopfbereich auf **Add schedule**.
- Wählen Sie **Add schedule** aus der Befehlspalette (**Strg+K** oder **⌘K**).

Füllen Sie dann das Formular aus:

1. **Play** – Wählen Sie aus, was abgespielt wird:
   - **Playlists** – Jede Playlist, die Sie erstellt haben
   - **Service plans** – Ein Plantyp aus B1 Admin, gekennzeichnet mit **(current plan)**. Der Bildschirm spielt jede Woche den aktuellen Plan dieses Plantyps ab, einschließlich Go-Curriculum-Lektionen (auch angepasster), die den Go-Login des Dienstbereichs des Plantyps verwenden
   - **Provider folder…** – Öffnet **Choose a provider folder**. Navigieren Sie zu einem Ordner und klicken Sie auf **Use this folder**. Um später einen anderen Ordner zu wählen, klicken Sie auf **Change**
2. **Repeats** – Wählen Sie die Wochentage aus, an denen dieser Termin läuft. Für ein einzelnes Datum schalten Sie stattdessen **One time** ein und wählen das **Date**.
3. **Start** und **End** – Die Uhrzeiten, zu denen der Termin beginnt und endet.
4. **If it finishes early** – Was geschieht, wenn der Inhalt vor der Endzeit ausgeht:
   - **Loop until the end time** – Beginnt von vorn. Gut für Beschilderungs-Schleifen, Ansagen und Countdowns
   - **Teacher paced** – Folien warten auf die Fernbedienung der Lehrkraft. Die Lektion bleibt über die Endzeit hinaus stehen, bis zur letzten Folie
   - **Play once, then go back to the default loop**
5. Bei sich wiederholenden Terminen setzen Sie **Starts** auf das erste Datum. Wählen Sie unter **Ends** entweder **Never** oder **On date** und geben Sie ein **End date** ein.
6. Klicken Sie auf **Save**.

:::info
**Teacher paced** ersetzt die ältere Option „hold the last slide“. Termine, die mit dieser Option gespeichert wurden, laufen nun als Teacher paced.
:::

## Einen Termin bearbeiten oder löschen

1. Klicken Sie im Kalender auf den Block des Termins.
2. Ändern Sie ein beliebiges Feld und klicken Sie auf **Save**, oder klicken Sie auf **Delete**, um den Termin zu entfernen.

## Überlappende Termine

Wenn sich zwei Termine überschneiden, zeigt das Formular eine Warnung: **Overlaps another schedule. The one that starts later wins.** Während der später beginnende Termin läuft, spielen die Bildschirme ihn ab. Wenn er endet, kehren sie zum früheren Termin zurück, sofern dieser noch läuft.

## Wie Bildschirme Änderungen übernehmen

Gekoppelte Bildschirme laden alles herunter, was für die nächsten 7 Tage geplant ist, und prüfen selbstständig auf Änderungen. Nach einer Änderung am Kalender müssen Sie den TV nicht anfassen. Um zu sehen, wann ein Bildschirm alles Nötige hat, prüfen Sie **Ready through** auf der [Seite Bildschirme](./managing-screens).

## Verwandte Artikel

- **[Playlists erstellen](./building-playlists)** – Erstellen Sie die Playlists, die Sie planen
- **[Geplante Wiedergabe auf dem TV](./scheduled-playback)** – Wie Lektionen im Modus „Teacher paced“ und die Fernbedienung auf dem TV funktionieren
- **[Bildschirme und Gruppen verwalten](./managing-screens)** – Gruppen hinzufügen und die Downloads jedes Bildschirms prüfen
