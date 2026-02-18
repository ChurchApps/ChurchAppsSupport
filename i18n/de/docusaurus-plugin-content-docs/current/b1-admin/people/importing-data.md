---
title: "Daten importieren"
---

# Daten importieren

<div class="article-intro">

B1 Admin macht es einfach, Ihre bestehenden Mitgliederdaten in das System zu übernehmen. Ob Sie von einer anderen Gemeindeverwaltungs-Plattform migrieren oder Datensätze aus einer Tabelle laden -- die Import-Werkzeuge ersparen Ihnen die manuelle Eingabe jeder einzelnen Person. Sie können aus einer CSV-Datei importieren oder direkt von Breeze ChMS migrieren.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen ein aktives B1 Admin-Konto mit Zugang zu **Einstellungen**. Siehe [Rollen & Berechtigungen](roles-permissions.md), wenn Sie sich über Ihre Zugangsstufe unsicher sind.
- Halten Sie Ihre Mitgliederdaten in einer Tabelle oder als Export aus Ihrem vorherigen System bereit.
- Wenn Sie von Breeze migrieren, stellen Sie sicher, dass Sie Ihre Personen-, Tags- und Spenden-Dateien zuerst aus Breeze exportiert haben.

</div>

## Import aus CSV

Wenn Sie Mitgliederdaten in einer Tabelle oder einem anderen System haben, können Sie sie mit einer CSV-Datei (kommagetrennte Werte) importieren.

1. Gehen Sie in der linken Seitenleiste zu **Einstellungen**.
2. Klicken Sie in der oberen Navigation auf **Import/Export**.
3. Wählen Sie **B1 Import Zip** aus dem Dropdown-Menü **Datenquelle**.
4. Klicken Sie auf den Link zum **Herunterladen der Beispieldateien**, damit Sie das erwartete Format sehen.
5. Öffnen Sie die Beispieldatei `people.csv` und ersetzen Sie die Beispieldaten durch Ihre eigenen. Behalten Sie die Kopfzeile bei.
6. Wenn Sie Mitgliederfotos haben, fügen Sie sie dem Ordner als 400x300px-Bilder hinzu und benennen Sie sie passend zu den `importKey`-Nummern in Ihrer CSV.
7. Komprimieren Sie Ihre bearbeiteten Dateien in eine ZIP-Datei.
8. Klicken Sie in B1 Admin auf **Hochladen** und wählen Sie Ihre ZIP-Datei.
9. Überprüfen Sie die Datenvorschau und klicken Sie auf **Weiter zum Ziel**.
10. Überprüfen Sie, ob **B1 Database** ausgewählt ist, prüfen Sie die Importzusammenfassung und klicken Sie auf **Transfer starten**.
11. Warten Sie, bis der Import abgeschlossen ist, und klicken Sie auf **Zu B1 gehen**, um zu Ihrem Dashboard zurückzukehren.

:::tip
Laden Sie immer zuerst die Beispieldateien herunter und überprüfen Sie sie. Die Übereinstimmung mit dem erwarteten Spaltenformat verhindert Importfehler.
:::

:::warning
Das Importieren von Daten fügt neue Einträge zu Ihrer Datenbank hinzu. Wenn Sie dieselbe Datei zweimal importieren, können doppelte Einträge entstehen. Überprüfen Sie Ihre Datei, bevor Sie den Transfer starten.
:::

## Import aus Breeze ChMS

Wenn Sie von Breeze migrieren, bietet B1 eine spezielle Importoption, die die Konvertierung automatisch übernimmt.

1. Gehen Sie in Breeze zu **Einstellungen** und klicken Sie in der linken Seitenleiste auf **Exportieren**.
2. Exportieren Sie drei Dateien: **People**, **Tags** und **Contributions**.
3. Wählen Sie alle drei exportierten Dateien aus, klicken Sie mit der rechten Maustaste und komprimieren Sie sie in eine einzelne ZIP-Datei.
4. Gehen Sie in B1 Admin zu **Einstellungen** und dann **Import/Export**.
5. Wählen Sie **Breeze Import Zip** aus dem Dropdown-Menü **Datenquelle**.
6. Laden Sie Ihre ZIP-Datei hoch und folgen Sie den Bildschirmanweisungen zum Überprüfen und Abschließen des Imports.

:::info
Der Breeze-Import überträgt Personen, Fotos, Gruppen, Spenden, Anwesenheit, Formulare und mehr -- eine vollständige Migration in einem Schritt.
:::

## Nach dem Import

Nachdem Ihr Import abgeschlossen ist, nehmen Sie sich ein paar Minuten Zeit, um Ihre Daten zu überprüfen:

1. Durchstöbern Sie die Seite [Personen](../people/adding-people.md) und prüfen Sie stichprobenartig einige Profile.
2. Bestätigen Sie, dass Namen, E-Mails, Telefonnummern und Adressen korrekt übertragen wurden.
3. Prüfen Sie, ob Haushaltsverknüpfungen intakt sind.
4. Überprüfen Sie alle importierten [Gruppen](../groups/creating-groups.md) oder Tags.

Wenn Sie Probleme bemerken, können Sie einzelne Profile direkt auf der Personenseite bearbeiten. Sie können auch jederzeit [Ihre Daten exportieren](exporting-data.md), um eine Sicherungskopie zu erstellen.
