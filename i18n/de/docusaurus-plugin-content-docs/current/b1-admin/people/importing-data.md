---
title: "Daten importieren"
---

# Daten importieren

<div class="article-intro">

Das B1 Transfer-Tool erleichtert es, Ihre vorhandenen Daten in B1 zu importieren, unabhängig davon, ob Sie von Grund auf aus einer Tabellenkalkulation starten, von einer anderen Kirchenverwaltungsplattform migrieren oder Spendenunterlagen importieren. Es kann auch jederzeit verwendet werden, um Ihre Daten zu exportieren oder zu sichern.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen ein aktives B1 Admin-Konto mit Zugriff auf **Einstellungen**.
- Haben Sie Ihre Daten aus Ihrem vorherigen System exportiert und bereit, bevor Sie beginnen.
- Dieses Tool ist für die anfängliche Datenmigration vorgesehen. Wenn Sie B1 bereits eine Weile verwendet haben, kann das erneute Importieren doppelte Einträge erstellen.

</div>

## Zugriff auf das Transfer-Tool

1. Melden Sie sich bei **B1 Admin** an.
2. Öffnen Sie das [Jump-Menü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), erweitern Sie **Einstellungen** und klicken Sie auf **Einstellungen**.
3. Klicken Sie auf die Schaltfläche **Import/Export** oben rechts in der Kopfzeile der Seite.
4. Dies öffnet das **B1 Transfer-Tool** in einem neuen Tab unter [transfer.b1.church](https://transfer.b1.church).

Das Transfer-Tool führt Sie durch vier Schritte: Quelle, Vorschau, Ziel und Ausführung.

---

## Schritt 1 – Ihre Quelle wählen

Wählen Sie, woher Ihre Daten stammen. Es gibt sieben Optionen:

- **B1-Datenbank** – Ruft Daten direkt von Ihrer bestehenden B1-Kirche ab. Nützlich zum Erstellen einer Sicherung oder Konvertieren Ihrer Daten in ein anderes Format. Sie müssen angemeldet sein, um diese Option zu verwenden.
- **B1 Import Zip** – Eine Zip-Datei in B1s eigenem Format. Dies wird hauptsächlich verwendet, um einen vorherigen B1-Export wiederherzustellen.
- **Breeze Import Zip** – Eine Zip-Datei mit exportierten Dateien von Breeze ChMS.
- **Planning Center Zip** – Eine Zip- oder CSV-Datei, die aus Planning Center exportiert wurde.
- **Benutzerdefinierte CSV / Excel** – Beliebige CSV- oder Excel-Datei mit Personendaten. Nach dem Upload müssen Sie Ihre Spalten B1-Feldern zuordnen, bevor der Import fortgesetzt wird.
- **Tithe.ly CSV** – Eine Personen- oder Spenden-Exportdatei von Tithe.ly (CSV- oder Excel-Format akzeptiert).
- **CCB / Pushpay CSV** – Eine Personen- oder Spenden-Export-CSV von Church Community Builder oder Pushpay.

Sie können Ihre Datei auf den Upload-Bereich ziehen und ablegen oder klicken, um sie zu durchsuchen.

---

## Schritt 1b – Ihre Felder zuordnen (nur benutzerdefinierte CSV / Excel)

Wenn Sie **Benutzerdefinierte CSV / Excel** ausgewählt haben, zeigt das Tool nach dem Upload eine Feldabbildungsbildschirm an, bevor es zur Vorschau wechselt.

Jede Spalte aus Ihrer Datei ist zusammen mit einem Beispielwert aufgelistet. Verwenden Sie für jede Spalte das Dropdown-Menü, um das passende B1-Feld zu wählen. Das Tool erkennt automatisch allgemeine Spaltennamen wie „Vorname", „E-Mail" oder „Postleitzahl", aber Sie sollten jede Zeile überprüfen und alles korrigieren, das es verpasst hat.

Verfügbare B1-Felder umfassen:

- Vorname, Nachname, Mittelnamen, Spitzname, Anzeigename, Titel/Präfix, Suffix
- E-Mail, Privates Telefon, Handy, Arbeitstelephone
- Adresszeile 1, Adresszeile 2, Stadt, Bundesland, Postleitzahl
- Geburtsdatum, Hochzeitstag, Geschlecht, Familienstand, Mitgliedschaftsstatus
- Haushalts-/Familienname
- Gruppennamen – weist die Person einer Gruppe nach Name zu
- **Benutzerdefiniertes Feld (nach Name abgleichen)** – speichert die Spalte in einem der [benutzerdefinierten Personenfelder](../settings/custom-fields.md) Ihrer Kirche. Ein Feld **B1-Feldname** wird angezeigt und mit der Spaltenüberschrift ausgefüllt. Ändern Sie es zum genauen Namen des Feldes, wie es in B1 angezeigt wird (Großschreibung spielt keine Rolle).
- **Formularantwort (benutzerdefiniertes Feld)** – speichert den Wert dieser Spalte als benutzerdefiniertes Feld, das dem Personeneintrag beigefügt ist. Wenn Sie diese Option verwenden, wird Ihnen aufgefordert, dem Formular einen Namen zu geben.

Daten können in gängigen Formaten wie `17.09.1994` vorliegen und werden automatisch konvertiert. Für benutzerdefinierte Felder akzeptieren Ja/Nein-Felder Werte wie Ja, Nein, J, N, Wahr, Falsch, 1 und 0, und Multiple-Choice-Felder akzeptieren entweder den Wahltext oder seinen Wert.

:::info
Erstellen Sie Ihre benutzerdefinierten Personenfelder in B1 Admin, bevor Sie importieren. Nach Abschluss des Imports listet der Schritt **Benutzerdefinierte Felder** alle Spaltennamen auf, die nicht mit einem B1-Feld übereinstimmen, und zählt alle Werte, die nicht zum Feldtyp passen. Diese Werte werden übersprungen und der Rest des Imports wird trotzdem abgeschlossen.
:::

Spalten, die Sie nicht importieren möchten, können auf **(Überspringen)** gesetzt werden. Es muss mindestens ein Namensfeld (Vorname oder Nachname) zugeordnet sein, um fortfahren zu können.

Klicken Sie auf **Zuordnung bestätigen & Importieren**, um zur Vorschau zu gehen.

---

## Schritt 2 – Ihre Daten anzeigen

Nach dem Upload zeigt das Tool eine Vorschau von allem an, was importiert wird. Verwenden Sie die Registerkarten, um jeden Datentyp zu überprüfen:

- **Personen** – Aufgelistet nach Haushalt, mit Fotos falls enthalten.
- **Gruppen** – Organisiert nach Standort, Gottesdienst, Zeit und Kategorie.
- **Besucherzahlen** – Sitzungsdaten, Gruppen und Besuchszählungen.
- **Spenden** – Chargen, Fonds, Spender und Beträge.
- **Formulare** – Formularnamen und Inhaltstypen.

Überprüfen Sie dies sorgfältig, bevor Sie fortfahren. Wenn etwas nicht stimmt, klicken Sie auf **Neu beginnen** und korrigieren Sie Ihre Quelldatei.

---

## Schritt 3 – Ihr Ziel wählen

Wählen Sie, wohin die Daten gehen sollen:

- **B1-Datenbank** – Importiert direkt in die B1-Datenbank Ihrer Kirche. Nach der Auswahl zeigt das Tool eine endgültige Zählung der hinzuzufügenden Einträge. Klicken Sie auf **Transfer starten**, um zu bestätigen.
- **B1 Export Zip** – Lädt Ihre Daten als B1-format Zip-Datei herunter. Gut für Sicherungen.
- **Breeze Export Zip** – Konvertiert Ihre Daten in das Breeze-Format.
- **Planning Center Zip** – Konvertiert Ihre Daten in das Planning Center-Format.

:::warning
Die Quelle und das Ziel können nicht das gleiche Format haben. Wenn sie übereinstimmen, warnt Sie das Tool, um versehentliche Duplizierung zu verhindern.
:::

---

## Schritt 4 – Ausführung

Das Tool verarbeitet die Übertragung und zeigt den Fortschritt für jeden Schritt an:

- Standorte, Gottesdienste und Zeiten
- Personen
- Fotos
- Gruppen und Gruppenmitglieder
- Spenden
- Besucherzahlen
- Formulare, Fragen, Antworten und Formulareinreichungen
- Benutzerdefinierte Felder (wenn Sie benutzerdefinierte Felderspalten zugeordnet haben)
- Komprimierung (nur für Zip-Dateiziele)

Wenn das Ziel **B1-Datenbank** ist, wird die Fortschrittskarte mit **Import-Fortschritt** betitelt und endet mit **Import abgeschlossen!** (oder **Import mit Fehlern abgeschlossen**). Für Zip-Dateiziele sagen die gleichen Meldungen **Export**.

:::warning
Schließen Sie Ihren Browser nicht, während die Übertragung läuft. Warten Sie, bis alle Schritte abgeschlossen sind.
:::

---

## Vorbereitung eines Breeze Import Zip

1. In Breeze gehen Sie zu **Einstellungen** und klicken Sie auf **Exportieren** in der linken Seitenleiste.
2. Exportieren Sie drei separate Dateien: **Personen**, **Tags** und **Beiträge**.
3. Wählen Sie alle drei Dateien aus, klicken Sie mit der rechten Maustaste und komprimieren Sie sie in einer einzelnen Zip-Datei.
   - Auf einem Mac: Wählen Sie die Dateien aus, klicken Sie mit der rechten Maustaste und wählen Sie **Komprimieren**.
   - Auf einem PC: Wählen Sie die Dateien aus, klicken Sie mit der rechten Maustaste, wählen Sie **Senden an** und dann **Komprimierter (Zip-)Ordner**.
4. Laden Sie die Zip-Datei mit der Option **Breeze Import Zip** in Schritt 1 hoch.

Der Breeze-Import überträgt automatisch Personen, Gruppen (Tags) und Spendenunterlagen.

---

## Vorbereitung eines Planning Center-Exports

1. Melden Sie sich bei Planning Center an und öffnen Sie das Produkt **Personen**.
2. Klicken Sie in der linken Seitenleiste auf **Listen** und erstellen Sie eine Liste, die alle Personen enthält, die Sie mitbringen möchten. (Wenn Sie bereits eine Liste Ihrer ganzen Gemeinde haben, verwenden Sie diese.)
3. Öffnen Sie die Liste und verwenden Sie ihre Exportoption, um Ihre Personen als **CSV**-Datei herunterzuladen. Beziehen Sie die Felder ein, die Sie behalten möchten – Name, E-Mail, Telefon, Adresse, Geburtsdatum, Geschlecht und Mitgliedschaftsstatus werden alle zu B1 übertragen.
4. Wenn Planning Center Ihnen mehr als eine Datei gibt, wählen Sie sie alle aus, klicken Sie mit der rechten Maustaste und komprimieren Sie sie in ein einzelnes Zip.
   - Auf einem Mac: Wählen Sie die Dateien aus, klicken Sie mit der rechten Maustaste und wählen Sie **Komprimieren**.
   - Auf einem PC: Wählen Sie die Dateien aus, klicken Sie mit der rechten Maustaste, wählen Sie **Senden an** und dann **Komprimierter (Zip-)Ordner**.
5. Laden Sie die CSV- oder Zip-Datei mit der Option **Planning Center Zip** in Schritt 1 hoch.

Nach dem Upload fahren Sie mit der Vorschau fort und bestätigen Sie, dass Ihre Personen und Haushalte richtig aussehen, bevor Sie den Import ausführen.

---

## Vorbereitung eines Tithe.ly-Exports

1. In Tithe.ly exportieren Sie Ihre **Personen**-Daten als CSV- oder Excel-Datei. Sie können auch eine separate Datei **Geben** exportieren, wenn Sie Spendenunterlagen importieren möchten.
2. Das Tool erkennt automatisch, ob die Datei Personen- oder Spendendaten enthält, basierend auf den Spaltennamen.
3. Laden Sie die Datei mit der Option **Tithe.ly CSV** in Schritt 1 hoch.

:::info
Tithe.ly-Exporte können eine Datei nach der anderen importiert werden. Führen Sie den Vorgang zweimal durch, wenn Sie Personen- und Spendenunterlagen separat importieren müssen.
:::

---

## Vorbereitung eines CCB- oder Pushpay-Exports

1. In Church Community Builder oder Pushpay exportieren Sie Ihre **Personen**-Daten als CSV-Datei. Sie können auch eine separate Datei für Spenden/Beiträge exportieren.
2. Das Tool erkennt automatisch, ob die Datei Personen- oder Spendendaten enthält, basierend auf den Spaltennamen.
3. Laden Sie die Datei mit der Option **CCB / Pushpay CSV** in Schritt 1 hoch.

---

## Nach dem Import

Nach Abschluss der Übertragung überprüfen Sie Ihre Daten kurz:

1. Durchsuchen Sie die Seite [Personen](../people/adding-people.md) und überprüfen Sie ein paar Profile an bestimmten Stellen.
2. Bestätigen Sie, dass Namen, E-Mails, Telefonnummern und Adressen korrekt übernommen wurden.
3. Überprüfen Sie, dass Haushaltsverbindungen erhalten bleiben.
4. Überprüfen Sie alle importierten Gruppen und Spendenunterlagen.

Wenn Sie Probleme bemerken, können Sie einzelne Profile von der Seite Personen bearbeiten. Sie können das Transfer-Tool auch erneut ausführen, um Ihre Daten zu [exportieren](exporting-data.md) und als Sicherung zu speichern.
