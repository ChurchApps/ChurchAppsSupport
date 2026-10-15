---
title: "Daten importieren"
---

# Daten importieren

<div class="article-intro">

Mit dem Werkzeug B1 Transfer können Sie Ihre bestehenden Daten ganz einfach in B1 übernehmen, egal ob Sie mit einer Tabelle neu beginnen, von einer anderen Gemeindeverwaltungsplattform umziehen oder Spendendaten importieren. Außerdem können Sie Ihre Daten jederzeit exportieren oder sichern.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen ein aktives B1-Admin-Konto mit Zugriff auf **Einstellungen**.
- Exportieren Sie Ihre Daten aus Ihrem bisherigen System und halten Sie sie bereit, bevor Sie beginnen.
- Dieses Werkzeug ist für die erstmalige Datenübernahme gedacht. Wenn Sie B1 bereits seit einiger Zeit nutzen, können erneute Importe doppelte Datensätze erzeugen.

</div>

## Das Transfer-Werkzeug öffnen

1. Melden Sie sich bei **B1 Admin** an.
2. Öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Einstellungen** auf und klicken Sie auf **Einstellungen**.
3. Klicken Sie im linken Einstellungsmenü oben unter dem Namen Ihrer Gemeinde auf den Link **Import/Export**.
4. Dadurch wird das Werkzeug **B1 Transfer** in einem neuen Tab auf [transfer.b1.church](https://transfer.b1.church) geöffnet.

Das Transfer-Werkzeug führt Sie durch vier Schritte: Quelle, Vorschau, Ziel und Ausführung.

---

## Schritt 1 - Quelle auswählen

Wählen Sie, woher Ihre Daten stammen. Es stehen sieben Optionen zur Auswahl:

- **B1-Datenbank** — Lädt Daten direkt aus Ihrer bestehenden B1-Gemeinde. Nützlich für eine Sicherung oder um Ihre Daten in ein anderes Format umzuwandeln. Für diese Option müssen Sie angemeldet sein.
- **B1-Import-ZIP** — Eine ZIP-Datei im eigenen Format von B1. Sie dient vor allem dazu, einen früheren B1-Export wiederherzustellen. Wenn Sie ein B1-Export-ZIP wieder in die **B1-Datenbank** laden, werden alle Inhalte des Exports wiederhergestellt (siehe [Daten exportieren](./exporting-data.md#full-data-export-from-settings)). Kann die Datei nicht gelesen werden, zeigt das Werkzeug den Fehler an, anstatt von vorn zu beginnen.
- **Breeze-Import-ZIP** — Eine ZIP-Datei mit exportierten Dateien aus Breeze ChMS.
- **Planning-Center-ZIP** — Eine ZIP- oder CSV-Datei aus Planning Center.
- **Eigene CSV / Excel** — Jede CSV- oder Excel-Datei mit Personendaten. Nach dem Hochladen ordnen Sie Ihre Spalten den B1-Feldern zu, bevor der Import fortgesetzt wird.
- **Tithe.ly-CSV** — Eine Personen- oder Spendenexportdatei aus Tithe.ly (CSV- oder Excel-Format werden akzeptiert).
- **CCB / Pushpay-CSV** — Eine Personen- oder Spenden-CSV aus Church Community Builder oder Pushpay.

Sie können Ihre Datei per Drag & Drop in den Upload-Bereich ziehen oder zum Auswählen darauf klicken.

---

## Schritt 1b - Felder zuordnen (nur Eigene CSV / Excel)

Wenn Sie **Eigene CSV / Excel** gewählt haben, zeigt das Werkzeug nach dem Hochladen der Datei einen Bildschirm zur Feldzuordnung, bevor es zur Vorschau weitergeht.

Jede Spalte Ihrer Datei wird zusammen mit einem Beispielwert aufgelistet. Wählen Sie für jede Spalte im Dropdown-Menü das passende B1-Feld. Das Werkzeug erkennt gängige Spaltennamen wie „Vorname“, „E-Mail“ oder „PLZ“ automatisch. Sie sollten dennoch jede Zeile prüfen und alles korrigieren, was übersehen wurde.

Zu den verfügbaren B1-Feldern gehören:

- Vorname, Nachname, zweiter Vorname, Spitzname, Anzeigename, Anrede/Titel, Namenszusatz
- E-Mail, Telefon privat, Mobiltelefon, Telefon geschäftlich
- Adresszeile 1, Adresszeile 2, Ort, Bundesland, PLZ
- Geburtsdatum, Hochzeitstag, Geschlecht, Familienstand, Mitgliedschaftsstatus
- Haushalts-/Familienname
- Gruppenname — ordnet die Person anhand des Namens einer Gruppe zu
- **Eigenes Feld (Zuordnung nach Name)** — speichert die Spalte in einem der [eigenen Personenfelder](../settings/custom-fields.md) Ihrer Gemeinde. Es erscheint ein Feld **Name des B1-Feldes**, das mit der Spaltenüberschrift vorausgefüllt ist. Ändern Sie es in den Namen des Feldes, so wie er in B1 erscheint (Groß- und Kleinschreibung spielt keine Rolle).
- **Formularantwort (eigenes Feld)** — speichert den Wert dieser Spalte als eigenes Feld im Datensatz der Person. Wenn Sie diese Option verwenden, werden Sie aufgefordert, dem Formular einen Namen zu geben.

Datumsangaben können in gängigen Formaten wie `17.09.1994` vorliegen und werden automatisch umgewandelt. Bei eigenen Feldern akzeptieren Ja/Nein-Felder Werte wie Ja, Nein, J, N, True, False, 1 und 0. Auswahlfelder akzeptieren entweder den Text der Auswahl oder ihren Wert.

:::info
Legen Sie Ihre eigenen Personenfelder in B1 Admin an, bevor Sie importieren. Nach Abschluss des Imports listet der Schritt **Eigene Felder** alle Spaltennamen auf, die keinem B1-Feld entsprechen, und zählt Werte, die nicht zum Typ des Feldes passen. Diese Werte werden übersprungen, der restliche Import wird trotzdem abgeschlossen.
:::

Spalten, die Sie nicht importieren möchten, können Sie auf **(Überspringen)** setzen. Bevor Sie fortfahren können, muss mindestens ein Namensfeld (Vorname oder Nachname) zugeordnet sein.

Klicken Sie auf **Zuordnung bestätigen & importieren**, um zur Vorschau zu gelangen.

---

## Schritt 2 - Daten in der Vorschau prüfen

Nach dem Hochladen zeigt das Werkzeug eine Vorschau aller Daten, die importiert werden. Nutzen Sie die Registerkarten, um jede Datenart zu prüfen:

- **Personen** — Nach Haushalt aufgelistet, mit Fotos, falls enthalten.
- **Gruppen** — Gegliedert nach Standort, Gottesdienst, Zeit und Kategorie.
- **Anwesenheit** — Sitzungsdaten, Gruppen und Besuchszahlen.
- **Spenden** — Bündel, Fonds, Spender und Beträge.
- **Formulare** — Formularnamen und Inhaltstypen.

Prüfen Sie dies sorgfältig, bevor Sie fortfahren. Wenn etwas nicht stimmt, klicken Sie auf **Neu beginnen** und korrigieren Sie Ihre Quelldatei.

---

## Schritt 3 - Ziel auswählen

Wählen Sie, wohin die Daten sollen:

- **B1-Datenbank** — Importiert direkt in die B1-Datenbank Ihrer Gemeinde. Danach zeigt das Werkzeug eine abschließende Anzahl der hinzuzufügenden Datensätze. Klicken Sie auf **Übertragung starten**, um zu bestätigen.
- **B1-Export-ZIP** — Lädt Ihre Daten als ZIP-Datei im B1-Format herunter, die sich später mit **B1-Import-ZIP** wiederherstellen lässt. Gut für Sicherungen.
- **Breeze-Export-ZIP** — Wandelt Ihre Daten in das Breeze-Format um.
- **Planning-Center-ZIP** — Wandelt Ihre Daten in das Planning-Center-Format um.

:::warning
Quelle und Ziel dürfen nicht dasselbe Format haben. Wenn sie übereinstimmen, warnt Sie das Werkzeug, um versehentliche Doppelungen zu verhindern.
:::

---

## Schritt 4 - Ausführen

Das Werkzeug verarbeitet die Übertragung und zeigt den Fortschritt für jeden Schritt an:

- Standorte, Gottesdienste und Zeiten
- Personen
- Fotos
- Gruppen und Gruppenmitglieder
- Spenden
- Anwesenheit
- Formulare, Fragen, Antworten und Formulareinsendungen
- Eigene Felder (wenn Sie Spalten für eigene Felder zugeordnet haben)
- Komprimieren (nur bei ZIP-Dateien als Ziel)

Wenn das Ziel **B1-Datenbank** ist, trägt die Fortschrittskarte den Titel **Import-Fortschritt** und endet mit **Import abgeschlossen!** (oder **Import mit Fehlern abgeschlossen**). Bei ZIP-Dateien als Ziel lauten die Meldungen stattdessen **Export**.

:::warning
Schließen Sie Ihren Browser nicht, während die Übertragung läuft. Warten Sie, bis alle Schritte als abgeschlossen angezeigt werden.
:::

---

## Einen Breeze-Import-ZIP vorbereiten

1. Gehen Sie in Breeze zu **Einstellungen** und klicken Sie in der linken Seitenleiste auf **Export**.
2. Exportieren Sie drei getrennte Dateien: **People**, **Tags** und **Contributions**.
3. Wählen Sie alle drei Dateien aus, klicken Sie mit der rechten Maustaste und packen Sie sie in eine einzige ZIP-Datei.
   - Auf einem Mac: Wählen Sie die Dateien aus, klicken Sie mit der rechten Maustaste und wählen Sie **Komprimieren**.
   - Auf einem PC: Wählen Sie die Dateien aus, klicken Sie mit der rechten Maustaste, wählen Sie **Senden an** und dann **ZIP-komprimierter Ordner**.
4. Laden Sie die ZIP-Datei über die Option **Breeze-Import-ZIP** in Schritt 1 hoch.

Der Breeze-Import überträgt Personen, Gruppen (Tags) und Spendendatensätze automatisch.

---

## Einen Planning-Center-Export vorbereiten

1. Melden Sie sich bei Planning Center an und öffnen Sie das Produkt **People**.
2. Klicken Sie in der linken Seitenleiste auf **Listen** und erstellen Sie eine Liste mit allen Personen, die Sie übernehmen möchten. (Wenn Sie bereits eine Liste Ihrer gesamten Gemeinde haben, verwenden Sie diese.)
3. Öffnen Sie die Liste und laden Sie Ihre Personen über die Option **Exportieren** als **CSV**-Datei herunter. Nehmen Sie die Felder auf, die Sie behalten möchten. Name, E-Mail, Telefon, Anschrift, Geburtsdatum, Geschlecht und Mitgliedschaftsstatus werden alle nach B1 übernommen.
4. Wenn Planning Center mehr als eine Datei bereitstellt, wählen Sie alle aus, klicken Sie mit der rechten Maustaste und packen Sie sie in eine einzige ZIP-Datei.
   - Auf einem Mac: Wählen Sie die Dateien aus, klicken Sie mit der rechten Maustaste und wählen Sie **Komprimieren**.
   - Auf einem PC: Wählen Sie die Dateien aus, klicken Sie mit der rechten Maustaste, wählen Sie **Senden an** und dann **ZIP-komprimierter Ordner**.
5. Laden Sie die CSV- oder ZIP-Datei über die Option **Planning-Center-ZIP** in Schritt 1 hoch.

Fahren Sie nach dem Hochladen mit der Vorschau fort und prüfen Sie, ob Ihre Personen und Haushalte korrekt aussehen, bevor Sie den Import ausführen.

---

## Einen Tithe.ly-Export vorbereiten

1. Exportieren Sie in Tithe.ly Ihre **Personen**-Daten als CSV- oder Excel-Datei. Wenn Sie Spendendatensätze übernehmen möchten, können Sie außerdem eine separate Datei **Spenden** exportieren.
2. Das Werkzeug erkennt anhand der Spaltennamen automatisch, ob die Datei Personen- oder Spendendaten enthält.
3. Laden Sie die Datei über die Option **Tithe.ly-CSV** in Schritt 1 hoch.

:::info
Tithe.ly-Exporte können jeweils nur einzeln importiert werden. Führen Sie den Vorgang zweimal aus, wenn Sie Personen- und Spendendaten getrennt importieren müssen.
:::

---

## Einen CCB- oder Pushpay-Export vorbereiten

1. Exportieren Sie in Church Community Builder oder Pushpay Ihre **Personen**-Daten als CSV-Datei. Sie können außerdem eine separate Datei mit Spenden bzw. Beiträgen exportieren.
2. Das Werkzeug erkennt anhand der Spaltennamen automatisch, ob die Datei Personen- oder Spendendaten enthält.
3. Laden Sie die Datei über die Option **CCB / Pushpay-CSV** in Schritt 1 hoch.

---

## Nach dem Import

Nach Abschluss der Übertragung sollten Sie sich einige Minuten Zeit nehmen, um Ihre Daten zu überprüfen:

1. Öffnen Sie die Seite [Personen](../people/adding-people.md) und sehen Sie sich einige Profile stichprobenartig an.
2. Prüfen Sie, ob Namen, E-Mail-Adressen, Telefonnummern und Anschriften korrekt übernommen wurden.
3. Prüfen Sie, ob die Haushaltsverknüpfungen erhalten geblieben sind. Die Haushaltsrolle jeder Person (Haupt, Partner, Kind oder Sonstige) wird übernommen, wenn die Quelle eine enthält: die Spalte **householdRole** in einem B1-Import-ZIP, **Family Role** in Breeze oder Tithe.ly und **Family Position** in CCB / Pushpay. Rollen wie „Head of Household“, „Primary“, „Wife“ oder „Son“ werden in die passende B1-Rolle umgewandelt. Planning-Center- und Eigene-CSV-/Excel-Importe haben keine Rollenspalte, daher werden diese Personen auf **Sonstige** gesetzt. Sie können die Rolle über den Haushalt der Person auf der Seite [Personen](../people/adding-people.md#managing-households) ändern.
4. Prüfen Sie importierte Gruppen und Spendendatensätze.

Wenn Ihnen Probleme auffallen, können Sie einzelne Profile über die Seite Personen bearbeiten. Sie können das Transfer-Werkzeug außerdem erneut ausführen, um Ihre Daten als Sicherung [zu exportieren](exporting-data.md).
