---
title: "Daten importieren"
---

# Daten importieren

<div class="article-intro">

Das B1 Transfer-Tool macht es einfach, Ihre vorhandenen Daten in B1 zu bringen, ob Sie mit einer Tabellenkalkulation von Grund auf beginnen, von einer anderen Kirchenmanagementsoftware migrieren oder Spendendaten importieren. Es kann auch verwendet werden, um Ihre Daten jederzeit zu exportieren oder zu sichern.

</div>

<div class="prereqs">
<h4>Voraussetzungen</h4>

- Sie benötigen ein aktives B1 Admin-Konto mit Zugriff auf **Einstellungen**.
- Halten Sie Ihre Daten exportiert und bereit von Ihrem vorherigen System, bevor Sie beginnen.
- Dieses Tool ist für die anfängliche Datenmigration gedacht. Wenn Sie B1 bereits einige Zeit verwenden, kann ein erneuter Import zu Duplikatdatensätzen führen.

</div>

## Zugriff auf das Transfer-Tool

1. Melden Sie sich bei **B1 Admin** an.
2. Öffnen Sie das **Abschnittsmenü** in der oberen linken Ecke (der Abschnittsname mit dem kleinen Pfeil) und wählen Sie **Einstellungen**.
3. Klicken Sie auf die Schaltfläche **Importieren/Exportieren** oben rechts in der Seitenkopfzeile.
4. Dies öffnet das **B1 Transfer**-Tool in einem neuen Tab unter [transfer.b1.church](https://transfer.b1.church).

Das Transfer-Tool führt Sie durch vier Schritte: Quelle, Vorschau, Ziel und Ausführen.

---

## Schritt 1 - Wählen Sie Ihre Quelle

Wählen Sie, woher Ihre Daten stammen. Es gibt sieben Optionen:

- **B1-Datenbank** -- Zieht Daten direkt aus Ihrer bestehenden B1-Kirche. Nützlich zum Erstellen einer Sicherung oder zum Konvertieren Ihrer Daten in ein anderes Format. Sie müssen angemeldet sein, um diese Option zu verwenden.
- **B1 Import Zip** -- Eine Zip-Datei in B1s eigenem Format. Dies wird hauptsächlich zum Wiederherstellen eines vorherigen B1-Exports verwendet.
- **Breeze Import Zip** -- Eine Zip-Datei mit exportierten Dateien von Breeze ChMS.
- **Planning Center Zip** -- Eine Zip- oder CSV-Datei, die aus Planning Center exportiert wurde.
- **Custom CSV / Excel** -- Jede CSV- oder Excel-Datei mit Personendaten. Nach dem Upload ordnen Sie Ihre Spalten B1-Feldern zu, bevor der Import fortgesetzt wird.
- **Tithe.ly CSV** -- Eine Personen- oder Spenden-Exportdatei von Tithe.ly (CSV- oder Excel-Format akzeptiert).
- **CCB / Pushpay CSV** -- Eine Personen- oder Spenden-Export-CSV von Church Community Builder oder Pushpay.

Sie können Ihre Datei auf den Upload-Bereich ziehen und ablegen oder darauf klicken, um sie zu durchsuchen.

---

## Schritt 1b - Ordnen Sie Ihre Felder zu (Nur Custom CSV / Excel)

Wenn Sie **Custom CSV / Excel** ausgewählt haben, zeigt das Tool nach dem Hochladen Ihrer Datei einen Feldmappingbildschirm an, bevor Sie zur Vorschau wechseln.

Jede Spalte Ihrer Datei wird mit einem Beispielwert aufgelistet. Wählen Sie für jede Spalte aus der Dropdown-Liste das entsprechende B1-Feld. Das Tool erkennt automatisch häufige Spaltennamen wie "First Name", "Email" oder "Zip Code", Sie sollten jedoch jede Zeile überprüfen und alles korrigieren, was es übersehen hat.

Verfügbare B1-Felder sind:

- Vorname, Nachname, Mittelname, Spitzname, Anzeigename, Titel/Präfix, Suffix
- E-Mail, Geschäftstelefon, Mobiltelefon, Geschäftstelefon
- Adresszeile 1, Adresszeile 2, Stadt, Bundesland, Postleitzahl
- Geburtsdatum, Jahrestag, Geschlecht, Familienstand, Mitgliedschaftsstatus
- Haushalt/Famililenname
- Gruppenname -- weist die Person einer Gruppe nach Name zu
- **Benutzerdefiniertes Feld (nach Name abgleichen)** -- speichert die Spalte in einem der benutzerdefinierten Personenfelder Ihrer Kirche. Eine Box **B1-Feldname** wird mit der Spaltenkopfzeile gefüllt angezeigt. Ändern Sie es auf den genauen Namen des Feldes, wie er in B1 angezeigt wird (Groß-/Kleinschreibung ist egal).
- **Formularantwort (benutzerdefiniertes Feld)** -- speichert den Wert dieser Spalte als benutzerdefiniertes Feld, das an den Datensatz der Person angehängt ist. Wenn Sie diese Option verwenden, werden Sie aufgefordert, dem Formular einen Namen zu geben.

Daten können in gemeinsamen Formaten wie `9/17/1994` vorliegen und werden automatisch konvertiert. Für benutzerdefinierte Felder akzeptieren Ja/Nein-Felder Werte wie Ja, Nein, J, N, Wahr, Falsch, 1 und 0, und Mehrfachauswahlfelder akzeptieren entweder den Auswahltext oder seinen Wert.

:::info
Erstellen Sie Ihre benutzerdefinierten Personenfelder in B1 Admin, bevor Sie importieren. Wenn der Import abgeschlossen ist, werden in der Schritt **Benutzerdefinierte Felder** alle Spaltennamen aufgelistet, die nicht mit einem B1-Feld übereinstimmen, und alle Werte gezählt, die nicht zum Feldtyp passen. Diese Werte werden übersprungen, und der Rest des Imports wird trotzdem abgeschlossen.
:::

Spalten, die Sie nicht importieren möchten, können auf **(Überspringen)** eingestellt werden. Mindestens ein Namensfeld (Vorname oder Nachname) muss zugeordnet werden, bevor Sie fortfahren können.

Klicken Sie auf **Mapping bestätigen & Importieren**, um zur Vorschau zu wechseln.

---

## Schritt 2 - Vorschau Ihrer Daten

Nach dem Upload zeigt das Tool eine Vorschau aller Daten, die importiert werden. Verwenden Sie die Registerkarten, um jeden Datentyp zu überprüfen:

- **Personen** -- Nach Haushalt aufgelistet, mit Fotos, falls enthalten.
- **Gruppen** -- Nach Gemeindezweig, Gottesdienst, Zeit und Kategorie organisiert.
- **Anwesenheit** -- Sitzungsdaten, Gruppen und Besuchszahlen.
- **Spenden** -- Losungen, Fonds, Spender und Beträge.
- **Formulare** -- Formularnamen und Inhaltstypen.

Überprüfen Sie dies sorgfältig, bevor Sie fortfahren. Wenn etwas falsch aussieht, klicken Sie auf **Erneut starten** und korrigieren Sie Ihre Ausgangsdatei.

---

## Schritt 3 - Wählen Sie Ihr Ziel

Wählen Sie, wohin die Daten gehen sollen:

- **B1-Datenbank** -- Importiert direkt in die B1-Datenbank Ihrer Kirche. Nach der Auswahl zeigt das Tool eine endgültige Anzahl der hinzuzufügenden Datensätze an. Klicken Sie auf **Transfer starten**, um zu bestätigen.
- **B1 Export Zip** -- Lädt Ihre Daten als B1-Format-Zip-Datei herunter. Gut für Sicherungen.
- **Breeze Export Zip** -- Konvertiert Ihre Daten in das Breeze-Format.
- **Planning Center Zip** -- Konvertiert Ihre Daten in das Planning Center-Format.

:::warning
Die Quelle und das Ziel können nicht das gleiche Format haben. Wenn sie übereinstimmen, warnt Sie das Tool, um eine versehentliche Duplikation zu verhindern.
:::

---

## Schritt 4 - Ausführen

Das Tool verarbeitet den Transfer und zeigt Fortschritt für jeden Schritt:

- Gemeindezweige, Gottesdienste und Zeiten
- Personen
- Fotos
- Gruppen und Gruppenmitglieder
- Spenden
- Anwesenheit
- Formulare, Fragen, Antworten und Formulareinreichungen
- Benutzerdefinierte Felder (wenn Sie benutzerdefinierte Feldspalten zugeordnet haben)
- Komprimierung (nur für Zip-Datei-Ziele)
