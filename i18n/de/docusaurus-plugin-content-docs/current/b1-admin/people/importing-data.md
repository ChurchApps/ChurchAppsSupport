---
title: "Daten importieren"
---

# Daten importieren

<div class="article-intro">

Das B1 Transfer-Tool macht es einfach, Ihre vorhandenen Daten in B1 zu bringen, egal ob Sie neu von einer Tabellenkalkulation anfangen, von einem anderen Kirchenverwaltungssystem migrieren oder Spendendatensätze importieren. Es kann auch zum Exportieren oder Sichern Ihrer Daten jederzeit verwendet werden.

</div>

<div class="prereqs">
<h4>Voraussetzungen</h4>

- Sie benötigen ein aktives B1 Admin-Konto mit Zugriff auf **Einstellungen**.
- Haben Sie Ihre Daten exportiert und bereit von Ihrem vorherigen System, bevor Sie beginnen.
- Dieses Tool ist für die erste Datenmigration bestimmt. Wenn Sie B1 bereits eine Weile verwendet haben, kann das Importieren erneut doppelte Datensätze erstellen.

</div>

## Zugriff auf das Transfer-Tool

1. Melden Sie sich bei **B1 Admin** an.
2. Öffnen Sie das **Bereichsmenü** in der oberen linken Ecke (der Bereichsname mit dem kleinen Pfeil) und wählen Sie **Einstellungen**.
3. Klicken Sie auf die Schaltfläche **Importieren/Exportieren** in der oberen rechten Ecke der Seiten-Kopfzeile.
4. Dies öffnet das **B1 Transfer**-Tool in einem neuen Tab bei [transfer.b1.church](https://transfer.b1.church).

Das Transfer-Tool führt Sie durch vier Schritte: Quelle, Vorschau, Ziel und Ausführung.

---

## Schritt 1 - Wählen Sie Ihre Quelle

Wählen Sie, woher Ihre Daten kommen. Es gibt sieben Optionen:

- **B1 Datenbank** -- Zieht Daten direkt aus Ihrer bestehenden B1 Kirche. Nützlich für das Erstellen einer Sicherung oder das Konvertieren Ihrer Daten in ein anderes Format. Sie müssen angemeldet sein, um diese Option zu verwenden.
- **B1 Import Zip** -- Eine ZIP-Datei im eigenen B1-Format. Dies wird hauptsächlich verwendet, um einen vorherigen B1-Export wiederherzustellen.
- **Breeze Import Zip** -- Eine ZIP-Datei mit exportierten Dateien von Breeze ChMS.
- **Planning Center Zip** -- Eine ZIP- oder CSV-Datei, die aus Planning Center exportiert wurde.
- **Benutzerdefinierte CSV / Excel** -- Jede CSV- oder Excel-Datei mit Personendaten. Nach dem Hochladen werden Sie Ihre Spalten den B1-Feldern zuordnen, bevor der Import fortgesetzt wird.
- **Tithe.ly CSV** -- Eine Personen- oder Spendendatei-Export von Tithe.ly (CSV- oder Excel-Format akzeptiert).
- **CCB / Pushpay CSV** -- Eine Personen- oder Spendendatei-CSV von Church Community Builder oder Pushpay.

Sie können Ihre Datei auf den Upload-Bereich ziehen und ablegen, oder klicken Sie, um zu durchsuchen.

---

## Schritt 1b - Ordnen Sie Ihre Felder zu (nur Custom CSV / Excel)

Wenn Sie **Benutzerdefinierte CSV / Excel** ausgewählt haben, zeigt das Tool nach dem Hochladen Ihrer Datei einen Feldmappings-Bildschirm an, bevor es zur Vorschau geht.

Jede Spalte aus Ihrer Datei wird neben einem Beispielwert aufgelistet. Verwenden Sie für jede Spalte das Dropdown, um das übereinstimmende B1-Feld zu wählen. Das Tool wird versuchen, übliche Spaltennamen wie "Vorname", "E-Mail" oder "Postleitzahl" automatisch zu erkennen, aber Sie sollten jede Zeile überprüfen und alles korrigieren, das es verpasst hat.

Verfügbare B1-Felder umfassen:

- Vorname, Nachname, Mittelname, Spitzname, Anzeigename, Titel/Präfix, Suffix
- E-Mail, Telefon Privat, Telefon Mobil, Telefon Arbeit
- Adresse Zeile 1, Adresse Zeile 2, Stadt, Bundesstaat, Postleitzahl
- Geburtsdatum, Geschlecht, Familienstand, Mitgliedschaftsstatus
- Haushalt/Familienname
- Gruppenname -- weist die Person einer Gruppe nach Name zu
- **Formular-Antwort (benutzerdef. Feld)** -- speichert den Wert dieser Spalte als benutzerdef. Feld, das an dem Personendatensatz angehängt ist. Wenn Sie diese Option verwenden, werden Sie aufgefordert, dem Formular einen Namen zu geben.

Spalten, die Sie nicht importieren möchten, können auf **(Überspringen)** eingestellt werden. Mindestens ein Namenfeld (Vorname oder Nachname) muss zugeordnet werden, bevor Sie fortfahren können.

Klicken Sie auf **Mapping bestätigen & Importieren**, um zur Vorschau zu gehen.

---

## Schritt 2 - Vorschau Ihrer Daten

Nach dem Hochladen zeigt das Tool eine Vorschau von allem, das importiert wird. Verwenden Sie die Registerkarten, um jeden Datentyp zu überprüfen:

- **Personen** -- Aufgelistet nach Haushalt, mit Fotos falls vorhanden.
- **Gruppen** -- Organisiert nach Campus, Service, Zeit und Kategorie.
- **Anwesenheit** -- Sitzungsdaten, Gruppen und Besuchszähler.
- **Spenden** -- Batches, Fonds, Spender und Beträge.
- **Formulare** -- Formularnamen und Inhaltstypen.

Überprüfen Sie dies sorgfältig, bevor Sie fortfahren. Wenn etwas falsch aussieht, klicken Sie auf **Neu starten** und korrigieren Sie Ihre Quelldatei.

---

## Schritt 3 - Wählen Sie Ihr Ziel

Wählen Sie, wohin Sie Ihre Daten gehen soll:

- **B1 Datenbank** -- Importiert direkt in die B1-Datenbank Ihrer Kirche. Nach der Auswahl zeigt das Tool eine endgültige Zählung von Datensätzen, die hinzugefügt werden. Klicken Sie auf **Transfer starten**, um zu bestätigen.
- **B1 Export Zip** -- Lädt Ihre Daten als B1-Format-ZIP-Datei herunter. Gut für Sicherungen.
- **Breeze Export Zip** -- Konvertiert Ihre Daten ins Breeze-Format.
- **Planning Center Zip** -- Konvertiert Ihre Daten ins Planning Center-Format.

:::warning
Die Quelle und das Ziel können nicht das gleiche Format sein. Wenn sie übereinstimmen, warnt Sie das Tool, um eine versehentliche Duplizierung zu verhindern.
:::

---

## Schritt 4 - Ausführen

Das Tool verarbeitet den Transfer und zeigt Fortschritt für jeden Schritt:

- Standorte, Services und Zeiten
- Personen
- Fotos
- Gruppen und Gruppenmitglieder
- Spenden
- Anwesenheit
- Formulare, Fragen, Antworten und Formular-Einreichungen
- Komprimieren (nur für ZIP-Datei-Ziele)

:::warning
Schließen Sie Ihren Browser nicht, während der Transfer läuft. Warten Sie, bis alle Schritte als abgeschlossen angezeigt werden.
:::

---

## Vorbereitung eines Breeze Import Zip

1. Gehen Sie in Breeze zu **Einstellungen** und klicken Sie auf **Exportieren** in der linken Seitenleiste.
2. Exportieren Sie drei separate Dateien: **Personen**, **Tags** und **Beiträge**.
3. Wählen Sie alle drei Dateien, klicken Sie mit der rechten Maustaste, und komprimieren Sie sie in eine ZIP-Datei.
   - Auf einem Mac: Wählen Sie die Dateien, klicken Sie mit der rechten Maustaste und wählen Sie **Komprimieren**.
   - Auf einem PC: Wählen Sie die Dateien, klicken Sie mit der rechten Maustaste, wählen Sie **Senden an**, dann **Komprimierter (gezippter) Ordner**.
4. Laden Sie die ZIP-Datei mit der Option **Breeze Import Zip** in Schritt 1 hoch.

Der Breeze-Import überträgt Personen, Gruppen (Tags) und Spendendatensätze automatisch.

---

## Vorbereitung eines Planning Center Exports

1. Exportieren Sie in Planning Center Ihre Personendaten als CSV- oder ZIP-Datei.
2. Laden Sie sie mit der Option **Planning Center Zip** in Schritt 1 hoch.

---

## Vorbereitung eines Tithe.ly Exports

1. Exportieren Sie in Tithe.ly Ihre **Personendaten** als CSV- oder Excel-Datei. Sie können auch eine separate **Spendendatei** exportieren, wenn Sie Spendendatensätze einfügen möchten.
2. Das Tool wird automatisch erkennen, ob die Datei Personen- oder Spendendaten basierend auf den Spaltennamen enthält.
3. Laden Sie die Datei mit der Option **Tithe.ly CSV** in Schritt 1 hoch.

:::info
Tithe.ly-Exporte können nacheinander importiert werden. Führen Sie den Prozess zweimal aus, wenn Sie sowohl Personen- als auch Spendendatensätze separat importieren müssen.
:::

---

## Vorbereitung eines CCB oder Pushpay Exports

1. Exportieren Sie in Church Community Builder oder Pushpay Ihre **Personendaten** als CSV-Datei. Sie können auch eine separate Spenden-/Beitragsdatei exportieren.
2. Das Tool wird automatisch erkennen, ob die Datei Personen- oder Spendendaten basierend auf den Spaltennamen enthält.
3. Laden Sie die Datei mit der Option **CCB / Pushpay CSV** in Schritt 1 hoch.

---

## Nach dem Importieren

Nachdem der Transfer abgeschlossen ist, nehmen Sie sich ein paar Minuten Zeit, um Ihre Daten zu überprüfen:

1. Durchsuchen Sie die [Personen](../people/adding-people.md)-Seite und überprüfen Sie einige Profile stichprobenweise.
2. Bestätigen Sie, dass Namen, E-Mails, Telefonnummern und Adressen korrekt durchgekommen sind.
3. Überprüfen Sie, dass Haushaltsverbindungen intakt sind.
4. Überprüfen Sie alle importierten Gruppen und Spendendatensätze.

Wenn Sie Probleme feststellen, können Sie individuelle Profile von der Seite "Personen" bearbeiten. Sie können auch das Transfer-Tool erneut ausführen, um [Ihre Daten zu exportieren](exporting-data.md) als Sicherung.
