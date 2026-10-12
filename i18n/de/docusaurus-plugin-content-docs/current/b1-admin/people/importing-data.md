---
title: "Daten importieren"
---

# Daten importieren

<div class="article-intro">

Das Transfer-Werkzeug von B1 macht es einfach, bestehende Daten in B1 zu übernehmen – ob Sie mit einer Tabelle neu anfangen, von einer anderen Gemeindeverwaltungssoftware migrieren oder Spendenbelege importieren. Außerdem können Sie Ihre Daten jederzeit exportieren oder sichern.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen ein aktives B1-Admin-Konto mit Zugriff auf **Einstellungen**.
- Exportieren Sie Ihre Daten aus dem bisherigen System und halten Sie sie bereit, bevor Sie beginnen.
- Dieses Werkzeug ist für die erstmalige Datenmigration gedacht. Wenn Sie B1 bereits länger verwenden, können erneute Importe doppelte Datensätze erzeugen.

</div>

## Auf das Transfer-Werkzeug zugreifen

1. Melden Sie sich bei **B1 Admin** an.
2. Öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (das Suchfeld oben links), klappen Sie **Einstellungen** auf und klicken Sie auf **Einstellungen**.
3. Klicken Sie im linken Einstellungsmenü unter dem Namen Ihrer Gemeinde auf den Link **Import/Export**.
4. Dadurch wird das Werkzeug **B1 Transfer** in einem neuen Tab auf [transfer.b1.church](https://transfer.b1.church) geöffnet.

Das Transfer-Werkzeug führt Sie durch vier Schritte: Quelle, Vorschau, Ziel und Ausführen.

---

## Schritt 1 – Quelle auswählen

Wählen Sie aus, woher Ihre Daten stammen. Es stehen sieben Optionen zur Verfügung:

- **B1-Datenbank** — Übernimmt Daten direkt aus Ihrer bestehenden B1-Gemeinde. Nützlich für eine Sicherung oder um Ihre Daten in ein anderes Format umzuwandeln. Für diese Option müssen Sie angemeldet sein.
- **B1-Import-ZIP** — Eine ZIP-Datei im eigenen Format von B1. Dient vor allem dem Wiederherstellen eines früheren B1-Exports.
- **Breeze-Import-ZIP** — Eine ZIP-Datei mit exportierten Dateien aus Breeze ChMS.
- **Planning-Center-ZIP** — Eine ZIP- oder CSV-Datei, die aus Planning Center exportiert wurde.
- **Benutzerdefiniertes CSV / Excel** — Jede CSV- oder Excel-Datei mit Personendaten. Nach dem Hochladen ordnen Sie Ihre Spalten den B1-Feldern zu, bevor der Import fortgesetzt wird.
- **Tithe.ly-CSV** — Eine Personen- oder Spendenexportdatei aus Tithe.ly (CSV- oder Excel-Format werden akzeptiert).
- **CCB / Pushpay-CSV** — Eine Personen- oder Spenden-CSV-Datei aus Church Community Builder oder Pushpay.

Sie können Ihre Datei per Drag & Drop in den Upload-Bereich ziehen oder zum Auswählen darauf klicken.

---

## Schritt 1b – Felder zuordnen (nur benutzerdefiniertes CSV / Excel)

Wenn Sie **Benutzerdefiniertes CSV / Excel** gewählt haben, zeigt das Werkzeug nach dem Hochladen Ihrer Datei einen Bildschirm zur Feldzuordnung, bevor es zur Vorschau weitergeht.

Jede Spalte Ihrer Datei wird zusammen mit einem Beispielwert aufgelistet. Wählen Sie für jede Spalte im Dropdown-Menü das passende B1-Feld aus. Das Werkzeug erkennt gängige Spaltennamen wie „Vorname“, „E-Mail“ oder „PLZ“ automatisch. Sie sollten dennoch jede Zeile prüfen und alles korrigieren, was nicht erkannt wurde.

Verfügbare B1-Felder sind unter anderem:

- Vorname, Nachname, Zweiter Vorname, Spitzname, Anzeigename, Titel/Anrede, Namenszusatz
- E-Mail, Telefon privat, Mobiltelefon, Telefon geschäftlich
- Adresszeile 1, Adresszeile 2, Ort, Bundesland, PLZ
- Geburtsdatum, Hochzeitstag, Geschlecht, Familienstand, Mitgliedsstatus
- Haushalts-/Familienname
- Gruppenname — ordnet die Person anhand des Namens einer Gruppe zu
- **Benutzerdefiniertes Feld (Zuordnung über Namen)** — speichert die Spalte in einem der [benutzerdefinierten Personenfelder](../settings/custom-fields.md) Ihrer Gemeinde. Ein Feld **Name des B1-Felds** erscheint, das mit der Spaltenüberschrift vorausgefüllt ist. Ändern Sie es in den Namen des Feldes, genau so wie er in B1 angezeigt wird (Groß- und Kleinschreibung spielt keine Rolle).
- **Formularantwort (benutzerdefiniertes Feld)** — speichert den Wert dieser Spalte als benutzerdefiniertes Feld im Datensatz der Person. Wenn Sie diese Option verwenden, werden Sie aufgefordert, dem Formular einen Namen zu geben.

Datumsangaben können in gängigen Formaten wie `17.09.1994` oder `9/17/1994` vorliegen und werden automatisch umgewandelt. Bei benutzerdefinierten Feldern akzeptieren Ja/Nein-Felder Werte wie Ja, Nein, J, N, Wahr, Falsch, 1 und 0. Auswahlfelder (Multiple Choice) akzeptieren entweder den Text der Auswahl oder deren Wert.

:::info
Legen Sie die benutzerdefinierten Personenfelder in B1 Admin an, bevor Sie importieren. Nach Abschluss des Imports listet der Schritt **Benutzerdefinierte Felder** alle Spaltennamen auf, die keinem B1-Feld entsprechen, und zählt Werte, die nicht zum Feldtyp passen. Diese Werte werden übersprungen, der restliche Import wird trotzdem abgeschlossen.
:::

Spalten, die Sie nicht importieren möchten, können Sie auf **(Überspringen)** setzen. Mindestens ein Namensfeld (Vorname oder Nachname) muss zugeordnet sein, bevor Sie fortfahren können.

Klicken Sie auf **Zuordnung bestätigen und importieren**, um zur Vorschau zu gelangen.

---

## Schritt 2 – Daten in der Vorschau prüfen

Nach dem Hochladen zeigt das Werkzeug eine Vorschau aller Daten, die importiert werden. Nutzen Sie die Tabs, um jede Datenart zu prüfen:

- **Personen** — Nach Haushalt aufgelistet, mit Fotos, falls enthalten.
- **Gruppen** — Gegliedert nach Standort, Gottesdienst, Uhrzeit und Kategorie.
- **Anwesenheit** — Sitzungsdaten, Gruppen und Besuchszahlen.
- **Spenden** — Stapel, Fonds, Spender und Beträge.
- **Formulare** — Formularnamen und Inhaltstypen.

Prüfen Sie dies sorgfältig, bevor Sie fortfahren. Wenn etwas nicht stimmt, klicken Sie auf **Neu beginnen** und korrigieren Sie Ihre Quelldatei.

---

## Schritt 3 – Ziel auswählen

Wählen Sie, wohin die Daten übertragen werden sollen:

- **B1-Datenbank** — Importiert direkt in die B1-Datenbank Ihrer Gemeinde. Danach zeigt das Werkzeug die endgültige Anzahl der hinzuzufügenden Datensätze. Klicken Sie auf **Übertragung starten**, um zu bestätigen.
- **B1-Export-ZIP** — Lädt Ihre Daten als ZIP-Datei im B1-Format herunter. Gut für Sicherungen.
- **Breeze-Export-ZIP** — Konvertiert Ihre Daten in das Breeze-Format.
- **Planning-Center-ZIP** — Konvertiert Ihre Daten in das Planning-Center-Format.

:::warning
Quelle und Ziel dürfen nicht dasselbe Format haben. Wenn sie übereinstimmen, warnt Sie das Werkzeug, um versehentliche Doppelungen zu vermeiden.
:::

---

## Schritt 4 – Ausführen

Das Werkzeug verarbeitet die Übertragung und zeigt den Fortschritt für jeden Schritt an:

- Standorte, Gottesdienste und Uhrzeiten
- Personen
- Fotos
- Gruppen und Gruppenmitglieder
- Spenden
- Anwesenheit
- Formulare, Fragen, Antworten und Formulareinsendungen
- Benutzerdefinierte Felder (wenn Sie Spalten für benutzerdefinierte Felder zugeordnet haben)
- Komprimieren (nur bei ZIP-Dateien als Ziel)

Wenn das Ziel **B1-Datenbank** ist, trägt die Fortschrittskarte den Titel **Import-Fortschritt** und endet mit **Import abgeschlossen!** (oder **Import mit Fehlern abgeschlossen**). Bei ZIP-Dateien als Ziel lauten die Meldungen stattdessen **Export**.

:::warning
Schließen Sie Ihren Browser nicht, während die Übertragung läuft. Warten Sie, bis alle Schritte als abgeschlossen angezeigt werden.
:::

---

## Breeze-Import-ZIP vorbereiten

1. Gehen Sie in Breeze zu **Einstellungen** und klicken Sie in der linken Seitenleiste auf **Export**.
2. Exportieren Sie drei getrennte Dateien: **People**, **Tags** und **Contributions**.
3. Wählen Sie alle drei Dateien aus, klicken Sie mit der rechten Maustaste und komprimieren Sie sie zu einer einzigen ZIP-Datei.
   - Auf einem Mac: Dateien auswählen, mit der rechten Maustaste klicken und **Komprimieren** wählen.
   - Auf einem PC: Dateien auswählen, mit der rechten Maustaste klicken, **Senden an** und dann **ZIP-komprimierter Ordner** wählen.
4. Laden Sie die ZIP-Datei in Schritt 1 über die Option **Breeze-Import-ZIP** hoch.

Der Breeze-Import überträgt Personen, Gruppen (Tags) und Spendendatensätze automatisch.

---

## Planning-Center-Export vorbereiten

1. Melden Sie sich bei Planning Center an und öffnen Sie das Produkt **People**.
2. Klicken Sie in der linken Seitenleiste auf **Listen** und erstellen Sie eine Liste mit allen Personen, die Sie übernehmen möchten. (Wenn Sie bereits eine Liste Ihrer gesamten Gemeinde haben, verwenden Sie diese.)
3. Öffnen Sie die Liste und nutzen Sie die Option **Export**, um Ihre Personen als **CSV**-Datei herunterzuladen. Nehmen Sie die Felder auf, die Sie behalten möchten – Name, E-Mail, Telefon, Adresse, Geburtsdatum, Geschlecht und Mitgliedsstatus werden alle nach B1 übernommen.
4. Wenn Planning Center mehr als eine Datei bereitstellt, wählen Sie alle aus, klicken Sie mit der rechten Maustaste und komprimieren Sie sie zu einer einzigen ZIP-Datei.
   - Auf einem Mac: Dateien auswählen, mit der rechten Maustaste klicken und **Komprimieren** wählen.
   - Auf einem PC: Dateien auswählen, mit der rechten Maustaste klicken, **Senden an** und dann **ZIP-komprimierter Ordner** wählen.
5. Laden Sie die CSV- oder ZIP-Datei in Schritt 1 über die Option **Planning-Center-ZIP** hoch.

Setzen Sie nach dem Hochladen mit der Vorschau fort und prüfen Sie, ob Ihre Personen und Haushalte korrekt aussehen, bevor Sie den Import ausführen.

---

## Tithe.ly-Export vorbereiten

1. Exportieren Sie in Tithe.ly Ihre **Personen**-Daten als CSV- oder Excel-Datei. Wenn Sie Spendendatensätze übernehmen möchten, können Sie zusätzlich eine separate Datei **Spenden** exportieren.
2. Das Werkzeug erkennt anhand der Spaltennamen automatisch, ob die Datei Personen- oder Spendendaten enthält.
3. Laden Sie die Datei in Schritt 1 über die Option **Tithe.ly-CSV** hoch.

:::info
Tithe.ly-Exporte können jeweils einzeln importiert werden. Führen Sie den Vorgang zweimal aus, wenn Sie Personen- und Spendendaten getrennt importieren möchten.
:::

---

## CCB- oder Pushpay-Export vorbereiten

1. Exportieren Sie in Church Community Builder oder Pushpay Ihre **Personen**-Daten als CSV-Datei. Sie können zusätzlich eine separate Datei mit Spenden bzw. Beiträgen exportieren.
2. Das Werkzeug erkennt anhand der Spaltennamen automatisch, ob die Datei Personen- oder Spendendaten enthält.
3. Laden Sie die Datei in Schritt 1 über die Option **CCB / Pushpay-CSV** hoch.

---

## Nach dem Import

Sobald die Übertragung abgeschlossen ist, nehmen Sie sich ein paar Minuten Zeit, um Ihre Daten zu überprüfen:

1. Öffnen Sie die Seite [Personen](../people/adding-people.md) und sehen Sie sich einige Profile stichprobenartig an.
2. Prüfen Sie, ob Namen, E-Mail-Adressen, Telefonnummern und Adressen korrekt übernommen wurden.
3. Kontrollieren Sie, ob die Haushaltszuordnungen erhalten geblieben sind. Die Haushaltsrolle jeder Person (Haupt, Ehepartner, Kind oder Andere) wird übernommen, sofern die Quelle eine enthält: die Spalte **householdRole** in einem B1-Import-ZIP, **Familienrolle** bei Breeze oder Tithe.ly und **Familienposition** bei CCB / Pushpay. Rollen wie „Haushaltsvorstand“, „Primär“, „Ehefrau“ oder „Sohn“ werden in die passende B1-Rolle umgewandelt. Planning-Center- und benutzerdefinierte CSV-/Excel-Importe haben keine Rollenspalte, daher werden diese Personen auf **Andere** gesetzt. Sie können die Rolle über den Haushalt der Person auf der Seite [Personen](../people/adding-people.md#managing-households) ändern.
4. Prüfen Sie importierte Gruppen und Spendendatensätze.

Wenn Sie Probleme bemerken, können Sie einzelne Profile über die Seite Personen bearbeiten. Sie können das Transfer-Werkzeug auch erneut ausführen, um Ihre Daten als Sicherung [zu exportieren](exporting-data.md).
