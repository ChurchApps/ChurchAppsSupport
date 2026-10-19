---
title: "Bildschirme und Gruppen verwalten"
---

# Bildschirme und Gruppen verwalten

<div class="article-intro">

Auf der Seite **Bildschirme** in FreePlay Admin sehen Sie jeden Fernseher, der mit Ihrer Kirche verbunden ist, mit dem, was gerade abgespielt wird, und ob er für den Sonntag bereit ist. Hier verwalten Sie auch **Bildschirmgruppen**. Bildschirme in derselben Gruppe teilen sich einen Kalender und eine Standard-Schleife.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Melden Sie sich bei FreePlay Admin unter [admin.freeplay.church](https://admin.freeplay.church) an
- [Koppeln Sie mindestens einen Bildschirm](./pairing-a-screen)

</div>

## Die Seite Bildschirme

Oben zeigen drei Zahlen einen schnellen Überblick über den Zustand:

- **Jetzt online** - Bildschirme, die sich in den letzten 15 Minuten gemeldet haben
- **Bereit für Sonntag** - Wie viele geplante Bildschirme haben alles bis einschließlich diesem Sonntag heruntergeladen
- **Benötigt Aufmerksamkeit** - Bildschirme, die offline sind oder fehlende Dateien haben

Darunter finden Sie mit **Bildschirme suchen** einen Bildschirm anhand von Bezeichnung, Gruppe oder dem, was gerade läuft. Die Filter-Chips schränken die Liste auf **Alle**, **Geplant**, **Manuell**, **Benötigt Aufmerksamkeit** oder eine einzelne Gruppe ein. Mit dem Schalter rechts wechseln Sie zwischen den Ansichten **Tabelle** und **Raster**.

Jeder Bildschirm zeigt:

- **Bezeichnung** und Gerätemodell
- **Gruppe**
- **Modus** - **Geplant** oder **Manuell**
- **Wird gerade abgespielt** - Was gerade auf dem Bildschirm zu sehen ist. Manuelle Bildschirme zeigen **Klassenzimmer · Lehrkraft drückt Start**
- **Bereit bis** - Das Datum, bis zu dem der Bildschirm heruntergeladen hat. Wenn Dateien nicht heruntergeladen wurden, zeigt er stattdessen **N Dateien fehlen**. Ein neuer Bildschirm zeigt **Warte auf erste Synchronisierung**
- **Zuletzt gesehen** - Wann sich der Bildschirm zuletzt gemeldet hat. Ein Bildschirm, der sich länger nicht gemeldet hat, zeigt **Offline**, und einer, der nie verbunden war, zeigt **Nie gesehen**

Mit **Präsentieren** spielen Sie den Kalender des Bildschirms in Ihrem Browser ab, mit **Bearbeiten** ändern Sie seine Einstellungen.

## Einen Bildschirm ansehen

Klicken Sie auf die Bezeichnung eines Bildschirms, um seine Seite zu öffnen. Links finden Sie:

- **Im Browser präsentieren** - Spielt den Kalender dieses Bildschirms im Browser auf Vollbild ab, so wie er auf dem Fernseher aussehen würde. Siehe [Im Browser präsentieren](./scheduled-playback#presenting-from-a-browser)
- **Bearbeiten** - Bezeichnung, Gruppe oder Modus ändern
- **Mehr** > **Kopplung aufheben** - Trennt den Fernseher. Er zeigt wieder einen Kopplungscode an

Der übrige Teil der Seite enthält diese Abschnitte:

- **Jetzt und als Nächstes** - Was gerade läuft und bis wann, gefolgt von allem, was für die nächsten 7 Tage geplant ist. Klicken Sie auf **Kalender öffnen**, um zum Kalender dieser Gruppe zu springen
- **Downloads** - **Bereit bis** ein Datum, wenn alles heruntergeladen ist, oder eine Liste der fehlenden Dateien
- **Gerät** - Geräte-ID, Plattform, Modell, FreePlay-App-Version, IP-Adresse, belegter und freier Speicher, zuletzt gesehen und Modus
- **Zuletzt** - Die neuesten Aktivitäten, die der Bildschirm gemeldet hat

:::tip
Zeigt ein Bildschirm fehlende Dateien an, stellen Sie sicher, dass er online ist und genügend freien Speicher hat. Der Fernseher lädt fehlende Dateien beim nächsten Melden selbstständig herunter.
:::

## Einen Bildschirm bearbeiten

1. Klicken Sie neben dem Bildschirm oder auf seiner Seite auf **Bearbeiten**.
2. Ändern Sie die **Bezeichnung**, die **Gruppe** oder den **Modus** (**Geplant** oder **Manuell**).
3. Klicken Sie auf **Speichern**.

Verschieben Sie einen Bildschirm in eine andere Gruppe, wechselt er auf den Kalender dieser Gruppe.

## Bildschirmgruppen {#screen-groups}

Eine Bildschirmgruppe ist eine Gruppe von Bildschirmen, die zur gleichen Zeit dasselbe abspielen, zum Beispiel „Foyer“ oder „Kinderbereich“. Jede Gruppe hat einen eigenen Kalender und kann eine **Standard-Schleife** haben, die immer dann läuft, wenn nichts geplant ist.

Um Gruppen zu verwalten, klicken Sie oben auf der Seite **Bildschirme** auf **Gruppen**. Die Liste **Bildschirmgruppen** zeigt den Namen jeder Gruppe, die Anzahl ihrer Bildschirme und ihre Standard-Schleife. Klicken Sie auf **Bildschirme**, um zurückzukehren.

### Eine Gruppe hinzufügen

1. Klicken Sie in der Ansicht **Bildschirmgruppen** auf **Gruppe hinzufügen**.
2. Geben Sie einen **Namen** ein, zum Beispiel „Foyer“.
3. Wählen Sie eine **Standard-Schleife**-Playlist oder belassen Sie **Keine — Bildschirm bleibt dunkel**.
4. Klicken Sie auf **Speichern**.

Eine Gruppe können Sie auch beim Koppeln eines Bildschirms anlegen, indem Sie im Feld **Gruppe** die Option **＋ Neue Gruppe…** wählen.

### Eine Gruppe bearbeiten oder löschen

1. Klicken Sie neben der Gruppe auf **Bearbeiten**.
2. Ändern Sie den Namen oder die Standard-Schleife und klicken Sie dann auf **Speichern**.
3. Um die Gruppe zu entfernen, klicken Sie auf **Löschen** und bestätigen Sie.

:::warning
Das Löschen einer Gruppe löscht auch ihren Zeitplan. Bildschirme in dieser Gruppe bleiben dunkel, bis Sie sie in eine andere Gruppe verschieben.
:::

## Verwandte Artikel

- **[Einen Bildschirm koppeln](./pairing-a-screen)** - Einen neuen Fernseher hinzufügen
- **[Den Kalender planen](./scheduling-the-calendar)** - Festlegen, was jede Gruppe abspielt, und ihre Standard-Schleife
- **[Geplante Wiedergabe auf dem Fernseher](./scheduled-playback)** - Was das Datum „Bereit bis“ auf dem Fernseher selbst bedeutet
