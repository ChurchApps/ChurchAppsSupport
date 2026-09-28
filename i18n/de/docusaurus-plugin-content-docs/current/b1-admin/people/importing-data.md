---
title: "Daten importieren"
---

# Daten importieren

<div class="article-intro">

Das B1 Transfer-Tool macht es einfach, Ihre vorhandenen Daten in B1 zu bringen, unabhängig davon, ob Sie neu von einer Tabellenkalkulation starten, von einer anderen Kirchenverwaltungsplattform migrieren oder Spendendatensätze importieren. Es kann auch verwendet werden, um Ihre Daten jederzeit zu exportieren oder zu sichern.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen ein aktives B1 Admin-Konto mit Zugriff auf **Einstellungen**.
- Exportieren Sie Ihre Daten vor dem Start aus Ihrem vorherigen System und halten Sie diese bereit.
- Dieses Tool ist für die anfängliche Datenmigration vorgesehen. Wenn Sie B1 bereits eine Weile verwenden, kann ein erneuter Import doppelte Datensätze erstellen.

</div>

## Zugriff auf das Transfer-Tool

1. Melden Sie sich bei **B1 Admin** an.
2. Öffnen Sie das **Bereichsmenü** in der oberen linken Ecke (der Bereichsname mit dem kleinen Pfeil) und wählen Sie **Einstellungen**.
3. Klicken Sie auf die Schaltfläche **Import/Export** oben rechts im Seitenkopf.
4. Dies öffnet das **B1 Transfer**-Tool in einem neuen Tab unter [transfer.b1.church](https://transfer.b1.church).

Das Transfer-Tool führt Sie durch vier Schritte: Quelle, Vorschau, Ziel und Ausführen.

---

## Schritt 1 - Wählen Sie Ihre Quelle

Wählen Sie, woher Ihre Daten stammen. Es gibt sieben Optionen:

- **B1-Datenbank** — Ruft Daten direkt aus Ihrer bestehenden B1-Kirche ab. Nützlich für das Erstellen einer Sicherung oder das Konvertieren Ihrer Daten in ein anderes Format. Sie müssen angemeldet sein, um diese Option zu nutzen.
- **B1 Import Zip** — Eine ZIP-Datei im eigenen Format von B1. Diese wird hauptsächlich verwendet, um einen vorherigen B1-Export wiederherzustellen.
- **Breeze Import Zip** — Eine ZIP-Datei mit exportierten Dateien aus Breeze ChMS.
- **Planning Center Zip** — Eine ZIP- oder CSV-Datei, die aus Planning Center exportiert wurde.
- **Custom CSV / Excel** — Eine beliebige CSV- oder Excel-Datei mit Personendaten. Nach dem Hochladen ordnen Sie Ihre Spalten den B1-Feldern zu, bevor der Import fortgesetzt wird.
- **Tithe.ly CSV** — Eine Personen- oder Spendendatei aus Tithe.ly (CSV- oder Excel-Format akzeptiert).
- **CCB / Pushpay CSV** — Eine Personen- oder Spenden-CSV aus Church Community Builder oder Pushpay.

Sie können Ihre Datei in den Upload-Bereich ziehen und ablegen oder darauf klicken, um sie zu durchsuchen.

---

## Schritt 1b - Ordnen Sie Ihre Felder zu (nur Custom CSV / Excel)

Wenn Sie **Custom CSV / Excel** ausgewählt haben, zeigt das Tool nach dem Hochladen einer Datei einen Feldzuordnungsbildschirm an, bevor es zur Vorschau wechselt.

Jede Spalte aus Ihrer Datei wird neben einem Beispielwert angezeigt. Verwenden Sie für jede Spalte die Dropdown-Liste, um das entsprechende B1-Feld auszuwählen. Das Tool erkennt automatisch häufige Spaltennamen wie "First Name", "Email" oder "Zip Code", aber Sie sollten jede Zeile überprüfen und alles korrigieren, was es verpasst hat.

Verfügbare B1-Felder sind:

- Vorname, Nachname, Zweiter Vorname, Spitzname, Anzeigename, Titel/Präfix, Suffix
- E-Mail, Telefon zu Hause, Mobiltelefon, Geschäftstelefon
- Adresszeile 1, Adresszeile 2, Stadt, Bundesland, Postleitzahl
- Geburtsdatum, Jahrestag, Geschlecht, Familienstand, Mitgliedschaftsstatus
- Haushalt/Familienname
- Gruppenname — weist die Person einer Gruppe nach Name zu
- **Benutzerdefiniertes Feld (nach Name abgleichen)** — speichert die Spalte in eines Ihrer Kirchen-[benutzerdefinierten Personenfelder](../settings/custom-fields.md). Ein Feld **B1 Feldname** wird angezeigt, das mit dem Spaltenkopf gefüllt ist. Ändern Sie es in den Namen des Feldes, so wie er in B1 angezeigt wird (Groß-/Kleinschreibung spielt keine Rolle).
- **Formantwort (benutzerdefiniertes Feld)** — speichert den Wert dieser Spalte als benutzerdefiniertes Feld, das an den Personendatensatz angehängt ist. Wenn Sie diese Option verwenden, werden Sie aufgefordert, dem Formular einen Namen zu geben.

Daten können in häufigen Formaten wie `9/17/1994` vorliegen und werden automatisch konvertiert. Für benutzerdefinierte Felder akzeptieren Ja/Nein-Felder Werte wie Ja, Nein, Y, N, Wahr, Falsch, 1 und 0, und Multiple-Choice-Felder akzeptieren entweder den Auswahltext oder seinen Wert.

:::info
Erstellen Sie Ihre benutzerdefinierten Personenfelder in B1 Admin, bevor Sie importieren. Nach Abschluss des Imports listet der Schritt **Benutzerdefinierte Felder** alle Spaltennamen auf, die nicht mit einem B1-Feld übereinstimmen, und zählt alle Werte, die nicht dem Feldtyp entsprechen. Diese Werte werden übersprungen und der Rest des Imports wird trotzdem abgeschlossen.
:::

Spalten, die Sie nicht importieren möchten, können auf **(Überspringen)** gesetzt werden. Mindestens ein Namenfeld (Vorname oder Nachname) muss zugeordnet werden, bevor Sie fortfahren können.

Klicken Sie auf **Zuordnung bestätigen & Importieren**, um zur Vorschau zu wechseln.

---

## Schritt 2 - Vorschau Ihrer Daten

Nach dem Hochladen zeigt das Tool eine Vorschau aller Daten an, die importiert werden. Verwenden Sie die Tabs, um jeden Datentyp zu überprüfen:

- **Personen** — Nach Haushalt aufgelistet, mit Fotos wenn enthalten.
- **Gruppen** — Organisiert nach Campus, Service, Zeit und Kategorie.
- **Anwesenheit** — Sitzungsdaten, Gruppen und Besuchszahlen.
- **Spenden** — Chargen, Fonds, Spender und Beträge.
- **Formulare** — Formularnamen und Inhaltstypen.

Überprüfen Sie dies sorgfältig, bevor Sie fortfahren. Wenn etwas nicht stimmt, klicken Sie auf **Von vorne beginnen** und korrigieren Sie Ihre Quelldatei.

---

## Schritt 3 - Wählen Sie Ihr Ziel

Wählen Sie, wohin Sie die Daten exportieren möchten:

- **B1-Datenbank** — Importiert direkt in die B1-Datenbank Ihrer Kirche. Nach der Auswahl zeigt das Tool eine endgültige Anzahl der hinzuzufügenden Datensätze an. Klicken Sie auf **Transfer starten**, um zu bestätigen.
- **B1 Export Zip** — Lädt Ihre Daten als B1-Format ZIP-Datei herunter. Gut für Sicherungen.
- **Breeze Export Zip** — Konvertiert Ihre Daten in das Breeze-Format.
- **Planning Center Zip** — Konvertiert Ihre Daten in das Planning Center-Format.

:::warning
Die Quelle und das Ziel können nicht das gleiche Format haben. Wenn sie übereinstimmen, warnt Sie das Tool, um versehentliche Duplikationen zu verhindern.
:::

---

## Schritt 4 - Ausführung

Das Tool verarbeitet den Transfer und zeigt den Fortschritt für jeden Schritt an:

- Standorte, Services und Zeiten
- Personen
- Fotos
- Gruppen und Gruppenmitglieder
- Spenden
- Anwesenheit
- Formulare, Fragen, Antworten und Formularübermittlungen
- Benutzerdefinierte Felder (wenn Sie benutzerdefinierte Feldkolumnen zugeordnet haben)
- Komprimieren (nur für ZIP-Dateiziele)

:::warning
Schließen Sie Ihren Browser nicht, während der Transfer läuft. Warten Sie, bis alle Schritte als abgeschlossen angezeigt werden.
:::

---

## Vorbereitung einer Breeze-Import-Zip

1. Gehen Sie in Breeze zu **Einstellungen** und klicken Sie auf **Export** in der linken Seitenleiste.
2. Exportieren Sie drei separate Dateien: **Personen**, **Tags** und **Beiträge**.
3. Wählen Sie alle drei Dateien, klicken Sie mit der rechten Maustaste und komprimieren Sie sie in eine einzelne ZIP-Datei.
   - Auf einem Mac: Wählen Sie die Dateien, klicken Sie mit der rechten Maustaste und wählen Sie **Komprimieren**.
   - Auf einem PC: Wählen Sie die Dateien, klicken Sie mit der rechten Maustaste, wählen Sie **Senden an**, dann **Komprimierter (gezippter) Ordner**.
4. Laden Sie die ZIP-Datei mit der Option **Breeze Import Zip** in Schritt 1 hoch.

Der Breeze-Import übernimmt automatisch Personen-, Gruppen- (Tags) und Spendendatensätze.

---

## Vorbereitung eines Planning Center-Exports

1. Melden Sie sich bei Planning Center an und öffnen Sie das Produkt **Personen**.
2. Klicken Sie in der linken Seitenleiste auf **Listen** und erstellen Sie eine Liste, die alle Personen enthält, die Sie mitnehmen möchten. (Wenn Sie bereits eine Liste Ihrer gesamten Gemeinde haben, verwenden Sie diese.)
3. Öffnen Sie die Liste und verwenden Sie die **Export**-Option, um Ihre Personen als **CSV**-Datei herunterzuladen. Beziehen Sie die Felder ein, die Sie behalten möchten — Name, E-Mail, Telefon, Adresse, Geburtsdatum, Geschlecht und Mitgliedschaftsstatus werden alle auf B1 übertragen.
4. Wenn Planning Center Ihnen mehr als eine Datei gibt, wählen Sie alle aus, klicken Sie mit der rechten Maustaste und komprimieren Sie sie in eine einzelne ZIP-Datei.
   - Auf einem Mac: Wählen Sie die Dateien, klicken Sie mit der rechten Maustaste und wählen Sie **Komprimieren**.
   - Auf einem PC: Wählen Sie die Dateien, klicken Sie mit der rechten Maustaste, wählen Sie **Senden an**, dann **Komprimierter (gezippter) Ordner**.
5. Laden Sie die CSV oder ZIP mit der Option **Planning Center Zip** in Schritt 1 hoch.

Fahren Sie nach dem Hochladen mit der Vorschau fort und bestätigen Sie, dass Ihre Personen und Haushalte korrekt aussehen, bevor Sie den Import ausführen.

---

## Vorbereitung eines Tithe.ly-Exports

1. Exportieren Sie in Tithe.ly Ihre **Personen**-Daten als CSV- oder Excel-Datei. Sie können auch eine separate **Spenden**-Datei exportieren, wenn Sie Spendendatensätze importieren möchten.
2. Das Tool erkennt automatisch, ob die Datei Personen- oder Spendendaten basierend auf den Spaltennamen enthält.
3. Laden Sie die Datei mit der Option **Tithe.ly CSV** in Schritt 1 hoch.

:::info
Tithe.ly-Exporte können einzeln importiert werden. Führen Sie den Prozess zweimal durch, wenn Sie Personen- und Spendendatensätze separat importieren müssen.
:::

---

## Vorbereitung eines CCB- oder Pushpay-Exports

1. Exportieren Sie in Church Community Builder oder Pushpay Ihre **Personen**-Daten als CSV-Datei. Sie können auch eine separate Spenden-/Beitragsdatei exportieren.
2. Das Tool erkennt automatisch, ob die Datei Personen- oder Spendendaten basierend auf den Spaltennamen enthält.
3. Laden Sie die Datei mit der Option **CCB / Pushpay CSV** in Schritt 1 hoch.

---

## Nach dem Import

Nach Abschluss der Übertragung nehmen Sie sich ein paar Minuten Zeit, um Ihre Daten zu überprüfen:

1. Durchsuchen Sie die Seite [Personen](../people/adding-people.md) und überprüfen Sie ein paar Profile.
2. Bestätigen Sie, dass Namen, E-Mails, Telefonnummern und Adressen korrekt übernommen wurden.
3. Überprüfen Sie, ob Haushaltsverbindungen intakt sind.
4. Überprüfen Sie alle importierten Gruppen und Spendendatensätze.

Wenn Sie Probleme bemerken, können Sie einzelne Profile von der Seite "Personen" aus bearbeiten. Sie können das Transfer-Tool auch erneut ausführen, um [Ihre Daten zu exportieren](exporting-data.md) als Sicherung.
