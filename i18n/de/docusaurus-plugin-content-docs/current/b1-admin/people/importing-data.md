---
title: "Daten importieren"
---

# Daten importieren

<div class="article-intro">

Das Werkzeug B1 Transfer macht es einfach, Ihre vorhandenen Daten in B1 zu übernehmen -- ob Sie mit einer Tabelle neu beginnen, von einer anderen Software für Gemeindeverwaltung wechseln oder Spendendaten importieren. Sie können es außerdem jederzeit nutzen, um Ihre Daten zu exportieren oder zu sichern.

</div>

## Einführungsvideo

<YouTube id="G-VnhzACYIU" title="Ihre Personendatenbank in B1 importieren" next="Personen suchen und Listen in B1 erstellen" nextUrl="/docs/b1-admin/people/searching-people" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen ein aktives B1-Admin-Konto mit Zugriff auf **Einstellungen**.
- Exportieren Sie Ihre Daten aus dem bisherigen System und halten Sie sie bereit, bevor Sie beginnen.
- Dieses Werkzeug ist für die erste Datenübernahme gedacht. Wenn Sie B1 bereits seit einiger Zeit nutzen, kann ein erneuter Import doppelte Datensätze erzeugen.

</div>

## Auf das Transfer-Werkzeug zugreifen

1. Melden Sie sich bei **B1 Admin** an.
2. Öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Einstellungen** auf und klicken Sie auf **Einstellungen**.
3. Klicken Sie im linken Einstellungsmenü unter dem Namen Ihrer Kirche auf den Link **Import/Export**.
4. Dies öffnet das Werkzeug **B1 Transfer** in einem neuen Tab unter [transfer.b1.church](https://transfer.b1.church).

Das Transfer-Werkzeug führt Sie durch vier Schritte: Quelle, Vorschau, Ziel und Ausführung.

---

## Schritt 1 -- Ihre Quelle wählen

Wählen Sie, woher Ihre Daten stammen. Es gibt sieben Optionen:

- **B1-Datenbank** -- Holt Daten direkt aus Ihrer bestehenden B1-Kirche. Nützlich für eine Sicherung oder um Ihre Daten in ein anderes Format umzuwandeln. Für diese Option müssen Sie angemeldet sein.
- **B1-Import-ZIP** -- Eine ZIP-Datei im eigenen Format von B1. Sie dient vor allem dazu, einen früheren B1-Export wiederherzustellen. Wenn Sie eine B1-Export-ZIP-Datei in die **B1-Datenbank** laden, werden alle Inhalte des Exports wiederhergestellt (siehe [Daten exportieren](./exporting-data.md#full-data-export-from-settings)). Kann die Datei nicht gelesen werden, zeigt das Werkzeug den Fehler an, statt neu zu beginnen.
- **Breeze-Import-ZIP** -- Eine ZIP-Datei mit exportierten Dateien aus Breeze ChMS.
- **Planning-Center-ZIP** -- Eine ZIP- oder CSV-Datei aus Planning Center.
- **Eigene CSV / Excel** -- Jede CSV- oder Excel-Datei mit Personendaten. Nach dem Hochladen ordnen Sie Ihre Spalten den B1-Feldern zu, bevor der Import fortgesetzt wird.
- **Tithe.ly-CSV** -- Eine Export-Datei mit Personen- oder Spendendaten aus Tithe.ly (CSV- oder Excel-Format werden akzeptiert).
- **CCB / Pushpay-CSV** -- Eine CSV-Exportdatei mit Personen- oder Spendendaten aus Church Community Builder oder Pushpay.

Sie können Ihre Datei per Drag & Drop in den Upload-Bereich ziehen oder darauf klicken, um sie auszuwählen.

---

## Schritt 1b -- Felder zuordnen (nur bei eigener CSV / Excel)

Wenn Sie **Eigene CSV / Excel** gewählt haben, zeigt das Werkzeug nach dem Hochladen Ihrer Datei einen Bildschirm zur Feldzuordnung, bevor es zur Vorschau geht.

Jede Spalte Ihrer Datei ist zusammen mit einem Beispielwert aufgelistet. Wählen Sie für jede Spalte im Auswahlfeld das passende B1-Feld. Das Werkzeug erkennt gängige Spaltennamen wie "Vorname", "E-Mail" oder "Postleitzahl" automatisch, Sie sollten aber jede Zeile prüfen und alles korrigieren, was übersehen wurde.

Verfügbare B1-Felder sind unter anderem:

- Vorname, Nachname, zweiter Vorname, Rufname, Anzeigename, Anrede/Titel, Suffix
- E-Mail, Telefon (privat), Telefon (mobil), Telefon (geschäftlich)
- Adresszeile 1, Adresszeile 2, Ort, Bundesland, Postleitzahl
- Geburtsdatum, Hochzeitstag, Geschlecht, Familienstand, Mitgliedsstatus
- Haushalts-/Familienname
- Gruppenname -- ordnet die Person anhand des Namens einer Gruppe zu
- **Benutzerdefiniertes Feld (Zuordnung nach Name)** -- speichert die Spalte in einem Ihrer [benutzerdefinierten Personenfelder](../settings/custom-fields.md) der Kirche. Ein Feld **Name des B1-Felds** erscheint, das mit der Spaltenüberschrift vorausgefüllt ist. Ändern Sie es auf den Namen des Feldes, genau so, wie er in B1 erscheint (Groß- und Kleinschreibung spielt keine Rolle).
- **Formularantwort (benutzerdefiniertes Feld)** -- speichert den Wert dieser Spalte als benutzerdefiniertes Feld am Datensatz der Person. Wenn Sie diese Option verwenden, werden Sie aufgefordert, dem Formular einen Namen zu geben.

Datumsangaben können in gängigen Formaten wie `17.9.1994` vorliegen und werden automatisch umgewandelt. Bei benutzerdefinierten Feldern akzeptieren Ja/Nein-Felder Werte wie Ja, Nein, J, N, Wahr, Falsch, 1 und 0, und Auswahlfelder mit mehreren Optionen akzeptieren entweder den Text der Auswahl oder deren Wert.

:::info
Legen Sie Ihre benutzerdefinierten Personenfelder in B1 Admin an, bevor Sie importieren. Wenn der Import abgeschlossen ist, listet der Schritt **Benutzerdefinierte Felder** alle Spaltennamen auf, die zu keinem B1-Feld passen, und zählt Werte, die nicht zum Typ des Feldes passen. Diese Werte werden übersprungen, der übrige Import wird trotzdem vollständig abgeschlossen.
:::

Spalten, die Sie nicht importieren möchten, können Sie auf **(Überspringen)** setzen. Mindestens ein Namensfeld (Vorname oder Nachname) muss zugeordnet sein, bevor Sie fortfahren können.

Klicken Sie auf **Zuordnung bestätigen & importieren**, um zur Vorschau zu gelangen.

---

## Schritt 2 -- Ihre Daten prüfen

Nach dem Hochladen zeigt das Werkzeug eine Vorschau aller Daten, die importiert werden. Nutzen Sie die Reiter, um jede Datenart zu prüfen:

- **Personen** -- nach Haushalt aufgelistet, mit Fotos, falls enthalten.
- **Gruppen** -- nach Standort, Gottesdienst, Zeit und Kategorie geordnet.
- **Anwesenheit** -- Sitzungsdaten, Gruppen und Besuchszahlen.
- **Spenden** -- Stapel, Fonds, Spender und Beträge.
- **Formulare** -- Formularnamen und Inhaltstypen.

Prüfen Sie dies sorgfältig, bevor Sie fortfahren. Wenn etwas nicht stimmt, klicken Sie auf **Neu beginnen** und korrigieren Sie Ihre Quelldatei.

---

## Schritt 3 -- Ihr Ziel wählen

Wählen Sie, wohin die Daten sollen:

- **B1-Datenbank** -- Importiert direkt in die B1-Datenbank Ihrer Kirche. Nach dieser Auswahl zeigt das Werkzeug eine abschließende Anzahl der Datensätze, die hinzugefügt werden. Klicken Sie auf **Übertragung starten**, um zu bestätigen.
- **B1-Export-ZIP** -- Lädt Ihre Daten als ZIP-Datei im B1-Format herunter, die sich später mit **B1-Import-ZIP** wiederherstellen lässt. Gut für Sicherungen.
- **Breeze-Export-ZIP** -- Wandelt Ihre Daten in das Breeze-Format um.
- **Planning-Center-ZIP** -- Wandelt Ihre Daten in das Planning-Center-Format um.

:::warning
Quelle und Ziel dürfen nicht dasselbe Format haben. Wenn sie übereinstimmen, warnt das Werkzeug Sie, um eine versehentliche Doppelung zu verhindern.
:::

---

## Schritt 4 -- Ausführen

Das Werkzeug verarbeitet die Übertragung und zeigt den Fortschritt für jeden Schritt an:

- Standorte, Gottesdienste und Zeiten
- Personen
- Fotos
- Gruppen und Gruppenmitglieder
- Spenden
- Anwesenheit
- Formulare, Fragen, Antworten und Formulareinreichungen
- Benutzerdefinierte Felder (wenn Sie Spalten für benutzerdefinierte Felder zugeordnet haben)
- Komprimieren (nur bei ZIP-Dateien als Ziel)

Wenn das Ziel die **B1-Datenbank** ist, trägt die Fortschrittskarte den Titel **Import-Fortschritt** und endet mit **Import abgeschlossen!** (oder **Import mit Fehlern abgeschlossen**). Bei ZIP-Dateien als Ziel lauten die Meldungen stattdessen **Export**.

:::info
Beim Wiederherstellen eines **B1-Import-ZIP** werden Datensätze, die auf etwas verweisen, das nicht mehr in der Datei enthalten ist, übersprungen, statt den Import zu stoppen: Gruppenmitgliedschaften von Personen oder Gruppen, die nicht in der ZIP-Datei enthalten sind, Anwesenheit bei gelöschten Gruppen oder Personen sowie Verknüpfungen zwischen Gruppen und gelöschten Gottesdienstzeiten. Anwesenheitssitzungen, die nie einer Gottesdienstzeit zugeordnet waren, werden trotzdem wiederhergestellt. Ebenso wird beim Exportieren ein Foto, das nicht heruntergeladen oder gelesen werden kann, ausgelassen, damit der Schritt **Fotos** weiterläuft.
:::

:::warning
Schließen Sie Ihren Browser nicht, während die Übertragung läuft. Warten Sie, bis alle Schritte als abgeschlossen angezeigt werden.
:::

---

## Eine Breeze-Import-ZIP vorbereiten

1. Gehen Sie in Breeze zu **Einstellungen** und klicken Sie in der linken Seitenleiste auf **Export**.
2. Exportieren Sie drei getrennte Dateien: **People**, **Tags** und **Contributions**.
3. Markieren Sie alle drei Dateien, klicken Sie mit der rechten Maustaste und komprimieren Sie sie zu einer einzigen ZIP-Datei.
   - Auf einem Mac: Dateien markieren, Rechtsklick und **Komprimieren** wählen.
   - Auf einem PC: Dateien markieren, Rechtsklick, **Senden an** wählen und dann **ZIP-komprimierter Ordner**.
4. Laden Sie die ZIP-Datei über die Option **Breeze-Import-ZIP** in Schritt 1 hoch.

Der Breeze-Import überträgt Personen, Gruppen (Tags) und Spendendaten automatisch.

---

## Einen Planning-Center-Export vorbereiten

1. Melden Sie sich bei Planning Center an und öffnen Sie das Produkt **People**.
2. Klicken Sie in der linken Seitenleiste auf **Listen** und erstellen Sie eine Liste mit allen Personen, die Sie übernehmen möchten. (Falls Sie bereits eine Liste Ihrer gesamten Gemeinde haben, verwenden Sie diese.)
3. Öffnen Sie die Liste und nutzen Sie die Option **Export**, um Ihre Personen als **CSV**-Datei herunterzuladen. Nehmen Sie die Felder auf, die Sie behalten möchten -- Name, E-Mail, Telefon, Adresse, Geburtsdatum, Geschlecht und Mitgliedsstatus werden alle nach B1 übernommen.
4. Wenn Planning Center mehr als eine Datei liefert, markieren Sie alle, klicken Sie mit der rechten Maustaste und komprimieren Sie sie zu einer einzigen ZIP-Datei.
   - Auf einem Mac: Dateien markieren, Rechtsklick und **Komprimieren** wählen.
   - Auf einem PC: Dateien markieren, Rechtsklick, **Senden an** wählen und dann **ZIP-komprimierter Ordner**.
5. Laden Sie die CSV- oder ZIP-Datei über die Option **Planning-Center-ZIP** in Schritt 1 hoch.

Fahren Sie nach dem Hochladen mit der Vorschau fort und prüfen Sie, ob Ihre Personen und Haushalte stimmen, bevor Sie den Import ausführen.

---

## Einen Tithe.ly-Export vorbereiten

1. Exportieren Sie in Tithe.ly Ihre Daten zu **People** als CSV- oder Excel-Datei. Wenn Sie Spendendatensätze übernehmen möchten, können Sie zusätzlich eine eigene Datei **Giving** exportieren.
2. Das Werkzeug erkennt anhand der Spaltennamen automatisch, ob die Datei Personen- oder Spendendaten enthält.
3. Laden Sie die Datei über die Option **Tithe.ly-CSV** in Schritt 1 hoch.

:::info
Tithe.ly-Exporte können jeweils nur eine Datei auf einmal importiert werden. Führen Sie den Vorgang zweimal aus, wenn Sie Personen- und Spendendaten getrennt importieren müssen.
:::

---

## Einen CCB- oder Pushpay-Export vorbereiten

1. Exportieren Sie in Church Community Builder oder Pushpay Ihre Daten zu **People** als CSV-Datei. Zusätzlich können Sie eine eigene Datei mit Gaben bzw. Beiträgen exportieren.
2. Das Werkzeug erkennt anhand der Spaltennamen automatisch, ob die Datei Personen- oder Spendendaten enthält.
3. Laden Sie die Datei über die Option **CCB / Pushpay-CSV** in Schritt 1 hoch.

---

## Nach dem Import

Nach Abschluss der Übertragung sollten Sie sich einige Minuten Zeit nehmen, Ihre Daten zu prüfen:

1. Sehen Sie sich die Seite [Personen](../people/adding-people.md) an und kontrollieren Sie einige Profile stichprobenartig.
2. Vergewissern Sie sich, dass Namen, E-Mail-Adressen, Telefonnummern und Adressen korrekt übernommen wurden.
3. Prüfen Sie, ob die Haushaltsverbindungen erhalten geblieben sind. Die Haushaltsrolle jeder Person (Haupt, Partner/in, Kind oder Sonstige) wird übernommen, wenn die Quelle eine solche enthält: die Spalte **householdRole** in einer B1-Import-ZIP, **Family Role** bei Breeze oder Tithe.ly sowie **Family Position** bei CCB / Pushpay. Rollen wie "Haushaltsvorstand", "Primary", "Ehefrau" oder "Sohn" werden in die passende B1-Rolle umgewandelt. Planning-Center-Importe und Importe aus eigener CSV / Excel haben keine Rollenspalte, daher werden diese Personen auf **Sonstige** gesetzt. Sie können eine Rolle im Haushalt der Person auf der Seite [Personen](../people/adding-people.md#managing-households) ändern.
4. Prüfen Sie importierte Gruppen und Spendendatensätze.

Falls Ihnen Probleme auffallen, können Sie einzelne Profile auf der Seite Personen bearbeiten. Sie können das Transfer-Werkzeug auch erneut ausführen, um Ihre Daten [als Sicherung zu exportieren](exporting-data.md).
