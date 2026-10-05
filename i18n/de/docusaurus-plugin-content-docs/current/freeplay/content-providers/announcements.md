---
title: "Ankündigungen"
---

# Ankündigungen

<div class="article-intro">

FreePlay kann einen Ordner mit Ankündigungsfolien auf Ihrem Fernseher schleifen -- zum Beispiel in einer Lobby oder bevor die Klasse beginnt. Sie wählen einen Ordner aus einem Ihrer verbundenen Content-Provider aus, FreePlay lädt seine Folien auf das Gerät herunter, und ein **Announcements**-Element wird in der Seitenleiste angezeigt, damit Sie die Schleife jederzeit starten können.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- [Stellen Sie eine Verbindung zu einem Content-Provider](./connecting-providers) her, der Ihre Ankündigungsfolien enthält, z. B. Google Drive oder Dropbox
- Legen Sie die Bilder oder Videos, die Sie schleifen möchten, zusammen in einen Ordner in diesem Provider

</div>

## Ankündigungsordner wählen

1. Öffnen Sie **Settings** am unteren Rand der Seitenleiste und wählen Sie dann **Providers**
2. Wählen Sie den verbundenen Provider aus, der Ihre Folien enthält (es zeigt ein **Connected**-Badge), um dessen **Provider Settings** zu öffnen
3. Wählen Sie **Use for Announcements**
4. Der **Choose the Announcements Folder**-Browser öffnet sich. Navigieren Sie durch die Ordner, bis Sie den Ordner mit Ihren Folien erreichen, und wählen Sie dann diesen Ordner (oder eine beliebige Datei darin) aus
5. FreePlay lädt die Folien herunter und kehrt zu **Provider Settings** zurück, wo die Zeile jetzt **Looping "*Ordnername*" -- *Folienanzahl* slides downloaded** lautet

Jeweils nur ein Ordner wird für Ankündigungen verwendet. Die Auswahl eines Ordners von einem anderen Provider ersetzt den vorherigen.

## Ankündigungen abspielen

Sobald Folien heruntergeladen wurden, wird ein **Announcements**-Element oben in der Seitenleiste angezeigt (unter **Today's Plan**, falls Ihr Fernseher dies anzeigt). Wählen Sie es aus, um die Schleife zu starten.

- Bilder bleiben 15 Sekunden lang auf dem Bildschirm, wenn der Provider der Datei nicht ihre eigene Dauer gibt
- Videos werden bis zum Ende abgespielt, bevor zur nächsten Folie übergegangen wird
- Nach der letzten Folie startet die Schleife von der ersten erneut
- Wenn der Ordner ein einzelnes Video hat, wiederholt es sich an Ort und Stelle

Die Schleife wird aus den auf dem Gerät gespeicherten Dateien abgespielt, daher wird sie ohne Internetverbindung ausgeführt. Sie können die gleichen Fernbedienungssteuerelemente wie alle anderen Inhalte verwenden -- siehe [Playing Lessons](../classroom-mode/playing-lessons).

## Aktualisieren der Folien

FreePlay überprüft den Ankündigungsordner jedes Mal, wenn die App startet, lädt alle neuen Folien herunter und entfernt Folien, die aus dem Ordner gelöscht wurden.

Um sofort zu überprüfen, öffnen Sie die **Provider Settings** des Providers und wählen Sie **Check for Announcement Updates**. Die Zeile zeigt **Up to date** mit der Folienanzahl an, wenn sie fertig ist.

:::info
Wenn FreePlay den Provider nicht erreichen kann oder der Ordner leer zurückkommt, spielt es die Folien ab, die es bereits hat. Um Ankündigungen vollständig zu deaktivieren, schalten Sie sie wie unten beschrieben aus.
:::

:::warning
Eine Folie, die mit einer neuen Version unter dem gleichen Dateinamen ersetzt wird, wird nicht erneut heruntergeladen. Um eine Folie zu ändern, fügen Sie sie als neue Datei hinzu und löschen Sie die alte.
:::

## Ankündigungen ausschalten

Öffnen Sie die **Provider Settings** des Providers und wählen Sie **Use for Announcements** erneut aus. FreePlay hört auf, den Ordner zu verwenden, löscht die heruntergeladenen Folien vom Gerät und entfernt **Announcements** aus der Seitenleiste.

Das Trennen des Providers schaltet auch Ankündigungen aus, die von ihm kamen.

## Related Articles

- **[Connecting to Providers](./connecting-providers)** - Verbinden Sie den Provider, der Ihre Folien enthält
- **[Browsing and Downloading Content](./browsing-content)** - Durchsuchen Sie die Ordner eines Providers und spielen Sie Inhalte bei Bedarf ab
- **[Playing Lessons](../classroom-mode/playing-lessons)** - Player-Steuerelemente für Ihre TV-Fernbedienung
