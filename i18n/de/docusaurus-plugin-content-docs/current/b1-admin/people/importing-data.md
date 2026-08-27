---
title: "Daten importieren"
---

# Daten importieren

<div class="article-intro">

Das B1 Transfer-Tool macht es einfach, Ihre bestehenden Daten in B1 zu übernehmen, egal ob Sie von Grund auf neu mit einer Tabelle beginnen, von einer anderen Kirchenverwaltungsplattform migrieren oder Spendendaten importieren. Sie können es auch jederzeit zum Exportieren oder Sichern Ihrer Daten verwenden.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen ein aktives B1 Admin-Konto mit Zugriff auf **Einstellungen**.
- Haben Sie Ihre Daten aus Ihrem vorherigen System exportiert und bereit, bevor Sie beginnen.
- Dieses Tool ist für die anfängliche Datenmigration gedacht. Wenn Sie B1 bereits eine Weile verwenden, kann das erneute Importieren doppelte Datensätze erstellen.

</div>

## Zugriff auf das Transfer-Tool

1. Melden Sie sich bei **B1 Admin** an.
2. Öffnen Sie das **Abschnittsmenü** in der oberen linken Ecke (der Abschnittsname mit dem kleinen Pfeil) und wählen Sie **Einstellungen**.
3. Klicken Sie auf die Schaltfläche **Import/Export** oben rechts in der Seitenkopfzeile.
4. Dies öffnet das **B1 Transfer**-Tool in einem neuen Tab unter [transfer.b1.church](https://transfer.b1.church).

Das Transfer-Tool führt Sie durch vier Schritte: Quelle, Vorschau, Ziel und Ausführung.

---

## Schritt 1 - Wählen Sie Ihre Quelle

Wählen Sie, woher Ihre Daten stammen. Es gibt sieben Optionen:

- **B1-Datenbank** – Zieht Daten direkt aus Ihrer bestehenden B1-Kirche. Nützlich zum Erstellen einer Sicherung oder zum Konvertieren Ihrer Daten in ein anderes Format. Sie müssen angemeldet sein, um diese Option zu verwenden.
- **B1 Import-ZIP** – Eine ZIP-Datei im B1-Format. Dies wird hauptsächlich zum Wiederherstellen eines vorherigen B1-Exports verwendet.
- **Breeze Import-ZIP** – Eine ZIP-Datei mit exportierten Dateien aus Breeze ChMS.
- **Planning Center ZIP** – Eine ZIP- oder CSV-Datei, die aus Planning Center exportiert wurde.
- **Benutzerdefinierte CSV/Excel** – Beliebige CSV- oder Excel-Datei mit Personendaten. Nach dem Hochladen müssen Sie Ihre Spalten B1-Feldern zuordnen, bevor der Import fortgesetzt wird.
- **Tithe.ly CSV** – Eine Personen- oder Spendenexportdatei von Tithe.ly (CSV- oder Excel-Format wird akzeptiert).
- **CCB/Pushpay CSV** – Ein Personen- oder Spendenexport-CSV aus Church Community Builder oder Pushpay.

Sie können Ihre Datei in den Upload-Bereich ziehen und ablegen oder klicken, um danach zu suchen.

---

## Schritt 1b - Zuordnen Ihrer Felder (Nur benutzerdefinierte CSV/Excel)

Wenn Sie **Benutzerdefinierte CSV/Excel** ausgewählt haben, zeigt das Tool nach dem Upload der Datei einen Feldmapping-Bildschirm an, bevor Sie zur Vorschau wechseln.

Jede Spalte aus Ihrer Datei wird zusammen mit einem Beispielwert aufgelistet. Wählen Sie für jede Spalte über die Dropdown-Liste das entsprechende B1-Feld aus. Das Tool erkennt automatisch allgemeine Spaltennamen wie "Vorname", "E-Mail" oder "Postleitzahl", aber Sie sollten jede Zeile überprüfen und alles korrigieren, das es übersehen hat.

Verfügbare B1-Felder umfassen:

- Vorname, Nachname, Zweiter Vorname, Spitzname, Anzeigename, Titel/Präfix, Suffix
- E-Mail, Heim-Telefon, Mobil-Telefon, Arbeits-Telefon
- Adresszeile 1, Adresszeile 2, Stadt, Bundesland, Postleitzahl
- Geburtsdatum, Geschlecht, Familienstand, Mitgliedschaftsstatus
- Haushalt/Familienname
- Gruppenname – weist die Person einer Gruppe nach Namen zu
- **Formularmitgliedschaftsstatus – speichert den Wert dieser Spalte als benutzerdefiniertes Feld, das an den Personendatensatz angehängt ist. Wenn Sie diese Option verwenden, werden Sie aufgefordert, dem Formular einen Namen zu geben.

Spalten, die Sie nicht importieren möchten, können auf **(Überspringen)** gesetzt werden. Mindestens ein Namenfeld (Vorname oder Nachname) muss zugeordnet sein, bevor Sie fortfahren können.

Klicken Sie auf **Mapping bestätigen & Importieren**, um zur Vorschau zu wechseln.

---

## Schritt 2 - Vorschau Ihrer Daten

Nach dem Upload zeigt das Tool eine Vorschau von allem, das importiert wird. Verwenden Sie die Tabs, um jeden Datentyp zu überprüfen:

- **Personen** – Nach Haushalt aufgelistet, mit Fotos, falls enthalten.
- **Gruppen** – Nach Campus, Dienst, Zeit und Kategorie organisiert.
- **Anwesenheit** – Sitzungsdaten, Gruppen und Besuchszählungen.
- **Spenden** – Batches, Fonds, Spender und Beträge.
- **Formulare** – Formularnamen und Inhaltstypen.

Überprüfen Sie dies sorgfältig vor dem Fortfahren. Wenn etwas nicht stimmt, klicken Sie auf **Neu starten** und korrigieren Sie Ihre Quell-Datei.

---

## Schritt 3 - Wählen Sie Ihr Ziel

Wählen Sie, wohin die Daten gehen sollen:

- **B1-Datenbank** – Importiert direkt in die B1-Datenbank Ihrer Kirche. Nach Auswahl dieser Option zeigt das Tool eine endgültige Anzahl der hinzuzufügenden Datensätze an. Klicken Sie auf **Transfer starten**, um zu bestätigen.
- **B1 Export-ZIP** – Lädt Ihre Daten als B1-Format-ZIP-Datei herunter. Gut für Sicherungen.
- **Breeze Export-ZIP** – Konvertiert Ihre Daten in das Breeze-Format.
- **Planning Center ZIP** – Konvertiert Ihre Daten in das Planning Center-Format.

:::warning
Die Quelle und das Ziel können nicht das gleiche Format haben. Wenn sie übereinstimmen, warnt Sie das Tool, um eine versehentliche Duplizierung zu verhindern.
:::

---

## Schritt 4 - Ausführung

Das Tool verarbeitet den Transfer und zeigt Fortschritt für jeden Schritt:

- Campusse, Dienste und Zeiten
- Personen
- Fotos
- Gruppen und Gruppenmitglieder
- Spenden
- Anwesenheit
- Formulare, Fragen, Antworten und Formulareinreichungen
- Komprimierung (nur für ZIP-Datei-Ziele)

:::warning
Schließen Sie Ihren Browser nicht, während der Transfer läuft. Warten Sie, bis alle Schritte als abgeschlossen angezeigt werden.
:::

---

## Vorbereitung einer Breeze Import-ZIP

1. Gehen Sie in Breeze zu **Einstellungen** und klicken Sie auf **Exportieren** in der linken Seitenleiste.
2. Exportieren Sie drei separate Dateien: **Personen**, **Tags** und **Beiträge**.
3. Wählen Sie alle drei Dateien aus, klicken Sie mit der rechten Maustaste und komprimieren Sie sie in einer einzelnen ZIP-Datei.
   - Auf einem Mac: Wählen Sie die Dateien aus, klicken Sie mit der rechten Maustaste und wählen Sie **Komprimieren**.
   - Auf einem PC: Wählen Sie die Dateien aus, klicken Sie mit der rechten Maustaste, wählen Sie **Senden an** und dann **Komprimierter (gezippter) Ordner**.
4. Laden Sie die ZIP-Datei über die Option **Breeze Import-ZIP** in Schritt 1 hoch.

Der Breeze-Import übertrug Personen, Gruppen (Tags) und Spendendatensätze automatisch.

---

## Vorbereitung eines Planning Center-Exports

1. Melden Sie sich bei Planning Center an und öffnen Sie das Produkt **Personen**.
2. Klicken Sie in der linken Seitenleiste auf **Listen** und erstellen Sie eine Liste, die alle Personen enthält, die Sie übernehmen möchten. (Wenn Sie bereits eine Liste Ihrer gesamten Gemeinde haben, verwenden Sie diese.)
3. Öffnen Sie die Liste und verwenden Sie ihre **Export**-Option, um Ihre Personen als **CSV**-Datei herunterzuladen. Binden Sie die Felder ein, die Sie behalten möchten – Name, E-Mail, Telefon, Adresse, Geburtsdatum, Geschlecht und Mitgliedschaftsstatus werden alle auf B1 abgebildet.
4. Wenn Planning Center Ihnen mehr als eine Datei gibt, wählen Sie sie alle aus, klicken Sie mit der rechten Maustaste und komprimieren Sie sie in einer einzelnen ZIP-Datei.
   - Auf einem Mac: Wählen Sie die Dateien aus, klicken Sie mit der rechten Maustaste und wählen Sie **Komprimieren**.
   - Auf einem PC: Wählen Sie die Dateien aus, klicken Sie mit der rechten Maustaste, wählen Sie **Senden an** und dann **Komprimierter (gezippter) Ordner**.
5. Laden Sie die CSV- oder ZIP-Datei über die Option **Planning Center ZIP** in Schritt 1 hoch.

Nach dem Upload fahren Sie zur Vorschau fort und bestätigen, dass Ihre Personen und Haushalte richtig aussehen, bevor Sie den Import ausführen.

---

## Vorbereitung eines Tithe.ly-Exports

1. Exportieren Sie in Tithe.ly Ihre **Personen**-Daten als CSV- oder Excel-Datei. Sie können auch eine separate **Spenden**-Datei exportieren, wenn Sie Spendendatensätze übernehmen möchten.
2. Das Tool erkennt automatisch, ob die Datei Personen- oder Spendendaten basierend auf den Spaltennamen enthält.
3. Laden Sie die Datei über die Option **Tithe.ly CSV** in Schritt 1 hoch.

:::info
Tithe.ly-Exporte können jeweils eine Datei importiert werden. Führen Sie den Prozess zweimal aus, wenn Sie Personen- und Spendendatensätze separat importieren müssen.
:::

---

## Vorbereitung eines CCB- oder Pushpay-Exports

1. Exportieren Sie in Church Community Builder oder Pushpay Ihre **Personen**-Daten als CSV-Datei. Sie können auch eine separate Spenden-/Beitragsdatei exportieren.
2. Das Tool erkennt automatisch, ob die Datei Personen- oder Spendendaten basierend auf den Spaltennamen enthält.
3. Laden Sie die Datei über die Option **CCB/Pushpay CSV** in Schritt 1 hoch.

---

## Nach dem Import

Nachdem die Übertragung abgeschlossen ist, nehmen Sie sich ein paar Minuten Zeit, um Ihre Daten zu überprüfen:

1. Durchsuchen Sie die Seite [Personen](../people/adding-people.md) und überprüfen Sie beispielsweise ein paar Profile.
2. Bestätigen Sie, dass Namen, E-Mails, Telefonnummern und Adressen korrekt eingegeben wurden.
3. Überprüfen Sie, ob Haushaltsverbindungen intakt sind.
4. Überprüfen Sie alle importierten Gruppen und Spendendatensätze.

Wenn Sie Probleme feststellen, können Sie einzelne Profile von der Seite Personen aus bearbeiten. Sie können das Transfer-Tool auch erneut ausführen, um [Ihre Daten zu exportieren](exporting-data.md) als Sicherung.
