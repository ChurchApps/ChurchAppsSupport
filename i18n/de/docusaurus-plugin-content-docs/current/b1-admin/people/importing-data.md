---
title: "Daten importieren"
---

# Daten importieren

<div class="article-intro">

Mit dem Werkzeug B1 Transfer bringen Sie Ihre vorhandenen Daten ganz einfach nach B1 – egal, ob Sie mit einer Tabellenkalkulation neu beginnen, von einer anderen Gemeindeverwaltungssoftware umziehen oder Spendendaten importieren möchten. Sie können damit auch jederzeit Ihre Daten exportieren oder sichern.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen ein aktives B1-Admin-Konto mit Zugriff auf **Einstellungen**.
- Halten Sie Ihre Daten aus dem bisherigen System exportiert und bereit, bevor Sie beginnen.
- Dieses Werkzeug ist für die erstmalige Datenübernahme gedacht. Wenn Sie B1 bereits seit einiger Zeit verwenden, können durch einen erneuten Import doppelte Datensätze entstehen.

</div>

## Das Transfer-Werkzeug öffnen

1. Melden Sie sich bei **B1 Admin** an.
2. Öffnen Sie das [Jump-Menü](../introduction.md#getting-around-with-the-jump-menu) (das Suchfeld oben links), klappen Sie **Einstellungen** auf und klicken Sie auf **Einstellungen**.
3. Klicken Sie im linken Einstellungsmenü unter dem Namen Ihrer Kirche auf den Link **Import/Export**.
4. Das Werkzeug **B1 Transfer** öffnet sich in einem neuen Tab unter [transfer.b1.church](https://transfer.b1.church).

Das Transfer-Werkzeug führt Sie durch vier Schritte: Quelle, Vorschau, Ziel und Ausführung.

---

## Schritt 1 – Quelle auswählen

Wählen Sie aus, woher Ihre Daten stammen. Es gibt sieben Optionen:

- **B1-Datenbank** — Holt die Daten direkt aus Ihrer bestehenden B1-Kirche. Nützlich für eine Sicherung oder um Ihre Daten in ein anderes Format umzuwandeln. Für diese Option müssen Sie angemeldet sein.
- **B1-Import-ZIP** — Eine ZIP-Datei im eigenen Format von B1. Dies dient vor allem dazu, einen früheren B1-Export wiederherzustellen. Wenn Sie eine B1-Export-ZIP-Datei in die **B1-Datenbank** laden, werden alle Inhalte des Exports wiederhergestellt (siehe [Daten exportieren](./exporting-data.md#full-data-export-from-settings)). Kann die Datei nicht gelesen werden, zeigt das Werkzeug die Fehlermeldung an, statt neu zu beginnen.
- **Breeze-Import-ZIP** — Eine ZIP-Datei mit exportierten Dateien aus Breeze ChMS.
- **Planning Center ZIP** — Eine ZIP- oder CSV-Datei aus Planning Center.
- **Eigene CSV / Excel** — Jede CSV- oder Excel-Datei mit Personendaten. Nach dem Hochladen ordnen Sie Ihre Spalten den Feldern in B1 zu, bevor der Import fortgesetzt wird.
- **Tithe.ly-CSV** — Eine Export-Datei mit Personen- oder Spendendaten aus Tithe.ly (CSV- oder Excel-Format werden akzeptiert).
- **CCB / Pushpay-CSV** — Eine CSV-Export-Datei mit Personen- oder Spendendaten aus Church Community Builder oder Pushpay.

Sie können Ihre Datei per Drag & Drop in den Upload-Bereich ziehen oder zum Auswählen darauf klicken.

---

## Schritt 1b – Felder zuordnen (nur bei Eigene CSV / Excel)

Wenn Sie **Eigene CSV / Excel** gewählt haben, zeigt das Werkzeug nach dem Hochladen Ihrer Datei eine Feldzuordnung an, bevor es zur Vorschau übergeht.

Jede Spalte Ihrer Datei wird zusammen mit einem Beispielwert aufgelistet. Wählen Sie für jede Spalte im Auswahlmenü das passende B1-Feld. Das Werkzeug erkennt gängige Spaltennamen wie „Vorname“, „E-Mail“ oder „PLZ“ automatisch, doch Sie sollten jede Zeile prüfen und alles korrigieren, was nicht erkannt wurde.

Verfügbare B1-Felder sind unter anderem:

- Vorname, Nachname, zweiter Vorname, Spitzname, Anzeigename, Anrede/Titel, Namenszusatz
- E-Mail, Telefon privat, Mobiltelefon, Telefon geschäftlich
- Adresszeile 1, Adresszeile 2, Ort, Bundesland, PLZ
- Geburtsdatum, Hochzeitstag, Geschlecht, Familienstand, Mitgliedsstatus
- Haushalts-/Familienname
- Gruppenname — ordnet die Person anhand des Namens einer Gruppe zu
- **Benutzerdefiniertes Feld (Zuordnung über Name)** — speichert die Spalte in einem der [benutzerdefinierten Personenfelder](../settings/custom-fields.md) Ihrer Kirche. Es erscheint ein Feld **Name des B1-Felds**, das mit der Spaltenüberschrift vorausgefüllt ist. Ändern Sie es in den Namen des Feldes, genau so wie er in B1 angezeigt wird (Groß- und Kleinschreibung spielt keine Rolle).
- **Formularantwort (benutzerdefiniertes Feld)** — speichert den Wert dieser Spalte als benutzerdefiniertes Feld im Datensatz der Person. Wenn Sie diese Option verwenden, werden Sie gebeten, dem Formular einen Namen zu geben.

Datumsangaben in gängigen Formaten wie `17.9.1994` werden automatisch umgewandelt. Bei benutzerdefinierten Feldern akzeptieren Ja/Nein-Felder Werte wie Ja, Nein, J, N, Wahr, Falsch, 1 und 0, und Auswahlfelder akzeptieren entweder den Text der Auswahl oder ihren Wert.

:::info
Legen Sie Ihre benutzerdefinierten Personenfelder in B1 Admin an, bevor Sie importieren. Wenn der Import abgeschlossen ist, listet der Schritt **Benutzerdefinierte Felder** alle Spaltennamen auf, die keinem B1-Feld entsprechen, und zählt Werte, die nicht zum Typ des Feldes passen. Diese Werte werden übersprungen, der Rest des Imports wird trotzdem vollständig abgeschlossen.
:::

Spalten, die Sie nicht importieren möchten, können Sie auf **(Überspringen)** setzen. Mindestens ein Namensfeld (Vorname oder Nachname) muss zugeordnet sein, bevor Sie fortfahren können.

Klicken Sie auf **Zuordnung bestätigen und importieren**, um zur Vorschau zu gelangen.

---

## Schritt 2 – Daten in der Vorschau prüfen

Nach dem Hochladen zeigt das Werkzeug eine Vorschau aller Daten, die importiert werden. Mit den Registerkarten prüfen Sie jede Datenart:

- **Personen** — Nach Haushalt sortiert, mit Fotos, sofern enthalten.
- **Gruppen** — Gegliedert nach Standort, Gottesdienst, Uhrzeit und Kategorie.
- **Anwesenheit** — Veranstaltungsdaten, Gruppen und Besuchszahlen.
- **Spenden** — Stapel, Fonds, Spender und Beträge.
- **Formulare** — Formularnamen und Inhaltstypen.

Prüfen Sie dies sorgfältig, bevor Sie fortfahren. Wenn etwas nicht stimmt, klicken Sie auf **Von vorn beginnen** und korrigieren Sie Ihre Quelldatei.

---

## Schritt 3 – Ziel auswählen

Wählen Sie, wohin die Daten gehen sollen:

- **B1-Datenbank** — Importiert direkt in die Datenbank Ihrer Kirche in B1. Nach der Auswahl zeigt das Werkzeug eine abschließende Anzahl der hinzuzufügenden Datensätze an. Klicken Sie auf **Übertragung starten**, um zu bestätigen.
- **B1-Export-ZIP** — Lädt Ihre Daten als ZIP-Datei im B1-Format herunter, die später mit **B1-Import-ZIP** wiederhergestellt werden kann. Gut für Sicherungen.
- **Breeze-Export-ZIP** — Konvertiert Ihre Daten in das Breeze-Format.
- **Planning Center ZIP** — Konvertiert Ihre Daten in das Planning-Center-Format.

:::warning
Quelle und Ziel dürfen nicht dasselbe Format haben. Wenn sie übereinstimmen, warnt das Werkzeug Sie, um versehentliche Doppelungen zu verhindern.
:::

---

## Schritt 4 – Ausführung

Das Werkzeug führt die Übertragung durch und zeigt den Fortschritt jedes Schritts an:

- Standorte, Gottesdienste und Uhrzeiten
- Personen
- Fotos
- Gruppen und Gruppenmitglieder
- Spenden
- Anwesenheit
- Formulare, Fragen, Antworten und Formulareinreichungen
- Benutzerdefinierte Felder (wenn Sie Spalten für benutzerdefinierte Felder zugeordnet haben)
- Komprimieren (nur bei ZIP-Dateien als Ziel)

Ist das Ziel **B1-Datenbank**, trägt die Fortschrittskarte den Titel **Import-Fortschritt** und endet mit **Import abgeschlossen!** (oder **Import mit Fehlern abgeschlossen**). Bei ZIP-Dateien als Ziel lauten die Meldungen entsprechend **Export**.

:::info
Beim Wiederherstellen einer **B1-Import-ZIP**-Datei werden Datensätze, die auf etwas verweisen, das nicht mehr in der Datei enthalten ist, übersprungen, anstatt den Import zu stoppen. Dazu gehören Gruppenmitgliedschaften von Personen oder Gruppen, die nicht in der ZIP-Datei enthalten sind, Anwesenheiten für gelöschte Gruppen oder Personen sowie Verknüpfungen zwischen Gruppen und gelöschten Gottesdienstzeiten. Anwesenheitssitzungen, die nie einer Gottesdienstzeit zugeordnet waren, werden trotzdem wiederhergestellt. Ebenso wird beim Exportieren ein Foto, das nicht heruntergeladen oder gelesen werden kann, ausgelassen, damit der Schritt **Fotos** weiterlaufen kann.
:::

:::warning
Schließen Sie Ihren Browser nicht, während die Übertragung läuft. Warten Sie, bis alle Schritte als abgeschlossen angezeigt werden.
:::

---

## Eine Breeze-Import-ZIP-Datei vorbereiten

1. Gehen Sie in Breeze zu **Einstellungen** und klicken Sie in der linken Seitenleiste auf **Export**.
2. Exportieren Sie drei getrennte Dateien: **People**, **Tags** und **Contributions**.
3. Wählen Sie alle drei Dateien aus, klicken Sie mit der rechten Maustaste und packen Sie sie in eine einzige ZIP-Datei.
   - Auf einem Mac: Wählen Sie die Dateien aus, klicken Sie mit der rechten Maustaste und wählen Sie **Komprimieren**.
   - Auf einem PC: Wählen Sie die Dateien aus, klicken Sie mit der rechten Maustaste, wählen Sie **Senden an** und dann **Komprimierter (gezippter) Ordner**.
4. Laden Sie die ZIP-Datei über die Option **Breeze-Import-ZIP** in Schritt 1 hoch.

Der Breeze-Import überträgt Personen, Gruppen (Tags) und Spendendaten automatisch.

---

## Einen Planning-Center-Export vorbereiten

1. Melden Sie sich bei Planning Center an und öffnen Sie das Produkt **People**.
2. Klicken Sie in der linken Seitenleiste auf **Lists** und legen Sie eine Liste an, die alle Personen enthält, die Sie übernehmen möchten. (Wenn Sie bereits eine Liste mit Ihrer gesamten Gemeinde haben, verwenden Sie diese.)
3. Öffnen Sie die Liste und nutzen Sie die Option **export**, um Ihre Personen als **CSV**-Datei herunterzuladen. Nehmen Sie die Felder auf, die Sie behalten möchten – Name, E-Mail, Telefon, Adresse, Geburtsdatum, Geschlecht und Mitgliedsstatus werden alle nach B1 übernommen.
4. Wenn Planning Center mehr als eine Datei ausgibt, wählen Sie alle aus, klicken Sie mit der rechten Maustaste und packen Sie sie in eine einzige ZIP-Datei.
   - Auf einem Mac: Wählen Sie die Dateien aus, klicken Sie mit der rechten Maustaste und wählen Sie **Komprimieren**.
   - Auf einem PC: Wählen Sie die Dateien aus, klicken Sie mit der rechten Maustaste, wählen Sie **Senden an** und dann **Komprimierter (gezippter) Ordner**.
5. Laden Sie die CSV- oder ZIP-Datei über die Option **Planning Center ZIP** in Schritt 1 hoch.

Prüfen Sie nach dem Hochladen in der Vorschau, ob Ihre Personen und Haushalte korrekt sind, bevor Sie den Import ausführen.

---

## Einen Tithe.ly-Export vorbereiten

1. Exportieren Sie in Tithe.ly Ihre Daten unter **People** als CSV- oder Excel-Datei. Wenn Sie Spendendaten übernehmen möchten, können Sie zusätzlich eine eigene Datei **Giving** exportieren.
2. Das Werkzeug erkennt anhand der Spaltennamen automatisch, ob die Datei Personen- oder Spendendaten enthält.
3. Laden Sie die Datei über die Option **Tithe.ly-CSV** in Schritt 1 hoch.

:::info
Tithe.ly-Exporte können jeweils nur einzeln importiert werden. Führen Sie den Vorgang zweimal aus, wenn Sie Personen- und Spendendaten getrennt importieren möchten.
:::

---

## Einen CCB- oder Pushpay-Export vorbereiten

1. Exportieren Sie in Church Community Builder oder Pushpay Ihre Daten unter **People** als CSV-Datei. Sie können zusätzlich eine separate Datei mit Spenden bzw. Beiträgen exportieren.
2. Das Werkzeug erkennt anhand der Spaltennamen automatisch, ob die Datei Personen- oder Spendendaten enthält.
3. Laden Sie die Datei über die Option **CCB / Pushpay-CSV** in Schritt 1 hoch.

---

## Nach dem Import

Sobald die Übertragung abgeschlossen ist, nehmen Sie sich ein paar Minuten Zeit, um Ihre Daten zu überprüfen:

1. Öffnen Sie die Seite [Personen](../people/adding-people.md) und sehen Sie sich einige Profile stichprobenartig an.
2. Prüfen Sie, ob Namen, E-Mail-Adressen, Telefonnummern und Adressen korrekt übernommen wurden.
3. Prüfen Sie, ob die Haushaltszuordnungen erhalten geblieben sind. Die Haushaltsrolle jeder Person (Haupt, Ehepartner, Kind oder Andere) wird übernommen, sofern die Quelle eine enthält: die Spalte **householdRole** in einer B1-Import-ZIP-Datei, **Family Role** bei Breeze oder Tithe.ly und **Family Position** bei CCB / Pushpay. Rollen wie „Head of Household“, „Primary“, „Wife“ oder „Son“ werden in die passende B1-Rolle umgewandelt. Planning-Center- und Importe aus eigenen CSV/Excel-Dateien haben keine Rollenspalte, daher werden diese Personen auf **Andere** gesetzt; Sie können eine Rolle über den Haushalt der Person auf der Seite [Personen](../people/adding-people.md#managing-households) ändern.
4. Prüfen Sie importierte Gruppen und Spendendaten.

Wenn Sie Probleme feststellen, können Sie einzelne Profile auf der Seite Personen bearbeiten. Sie können das Transfer-Werkzeug auch erneut ausführen, um Ihre Daten als Sicherung zu [exportieren](exporting-data.md).
