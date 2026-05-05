#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
German translation script for ChurchApps documentation
Translates English markdown files to German (de locale)
"""

import os

def write_file(path, content):
    """Write file with proper UTF-8 encoding and create directories if needed"""
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'OK: {path}')

# Base paths
base_de = 'd:/Code/ChurchApps/ChurchAppsSupport/i18n/de/docusaurus-plugin-content-docs/current'

# Track successful translations
count = 0

# File 1: b1-admin/people/importing-data.md
write_file(f'{base_de}/b1-admin/people/importing-data.md', '''---
title: "Daten importieren"
---

# Daten importieren

<div class="article-intro">

Das B1 Transfer-Tool macht es einfach, Ihre vorhandenen Daten in B1 zu übertragen, egal ob Sie neu mit einer Tabellenkalkulation beginnen, von einer anderen Kirchenverwaltungsplattform migrieren oder Spendendatensätze importieren. Es kann auch verwendet werden, um Ihre Daten jederzeit zu exportieren oder zu sichern.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen ein aktives B1 Admin-Konto mit Zugriff auf **Settings**.
- Exportieren und bereiten Sie Ihre Daten aus Ihrem vorherigen System vor, bevor Sie beginnen.
- Dieses Tool ist für die anfängliche Datenmigration gedacht. Wenn Sie B1 bereits eine Weile verwenden, kann ein erneuter Import doppelte Datensätze erstellen.

</div>

## Zugriff auf das Transfer-Tool

1. Melden Sie sich bei **B1 Admin** an.
2. Gehen Sie zu **Settings** in der linken Seitenleiste.
3. Klicken Sie auf die Schaltfläche **Import/Export** oben rechts im Seitenkopf.
4. Dies öffnet das **B1 Transfer**-Tool in einem neuen Tab unter [transfer.b1.church](https://transfer.b1.church).

Das Transfer-Tool führt Sie durch vier Schritte: Source, Preview, Destination und Run.

---

## Schritt 1 - Wählen Sie Ihre Quelle

Wählen Sie aus, woher Ihre Daten kommen. Es gibt sieben Optionen:

- **B1 Database** — Zieht Daten direkt aus Ihrer bestehenden B1-Kirche. Nützlich zum Erstellen einer Sicherung oder zum Konvertieren Ihrer Daten in ein anderes Format. Sie müssen angemeldet sein, um diese Option zu verwenden.
- **B1 Import Zip** — Eine Zip-Datei im eigenen Format von B1. Dies wird hauptsächlich verwendet, um einen vorherigen B1-Export wiederherzustellen.
- **Breeze Import Zip** — Eine Zip-Datei mit exportierten Dateien aus Breeze ChMS.
- **Planning Center Zip** — Eine Zip- oder CSV-Datei, die aus Planning Center exportiert wurde.
- **Custom CSV / Excel** — Jede CSV- oder Excel-Datei mit Personendaten. Nach dem Hochladen ordnen Sie Ihre Spalten den B1-Feldern zu, bevor der Import fortfährt.
- **Tithe.ly CSV** — Eine Personen- oder Spenden-Exportdatei von Tithe.ly (CSV- oder Excel-Format akzeptiert).
- **CCB / Pushpay CSV** — Eine Personen- oder Spenden-Export-CSV von Church Community Builder oder Pushpay.

Sie können Ihre Datei per Drag & Drop in den Upload-Bereich ziehen oder klicken, um danach zu suchen.

---

## Schritt 1b - Ordnen Sie Ihre Felder zu (nur Custom CSV / Excel)

Wenn Sie **Custom CSV / Excel** ausgewählt haben, zeigt das Tool nach dem Hochladen Ihrer Datei einen Feldzuordnungsbildschirm an, bevor es zur Vorschau übergeht.

Jede Spalte Ihrer Datei wird zusammen mit einem Beispielwert aufgelistet. Verwenden Sie für jede Spalte das Dropdown-Menü, um das passende B1-Feld auszuwählen. Das Tool erkennt automatisch gängige Spaltennamen wie "First Name", "Email" oder "Zip Code", aber Sie sollten jede Zeile überprüfen und alles korrigieren, was übersehen wurde.

Verfügbare B1-Felder umfassen:

- First Name, Last Name, Middle Name, Nickname, Display Name, Title/Prefix, Suffix
- Email, Home Phone, Mobile Phone, Work Phone
- Address Line 1, Address Line 2, City, State, Zip Code
- Birth Date, Gender, Marital Status, Membership Status
- Household/Family Name
- Group Name — ordnet die Person einer Gruppe nach Namen zu
- **Form Answer (custom field)** — speichert den Wert dieser Spalte als benutzerdefiniertes Feld, das an den Personendatensatz angehängt ist. Wenn Sie diese Option verwenden, werden Sie aufgefordert, dem Formular einen Namen zu geben.

Spalten, die Sie nicht importieren möchten, können auf **(Skip)** gesetzt werden. Mindestens ein Namensfeld (First Name oder Last Name) muss zugeordnet werden, bevor Sie fortfahren können.

Klicken Sie auf **Confirm Mapping & Import**, um zur Vorschau zu gelangen.

---

## Schritt 2 - Vorschau Ihrer Daten

Nach dem Hochladen zeigt das Tool eine Vorschau von allem, was importiert wird. Verwenden Sie die Tabs, um jeden Datentyp zu überprüfen:

- **People** — Nach Haushalt aufgelistet, mit Fotos, falls enthalten.
- **Groups** — Organisiert nach Campus, Service, Zeit und Kategorie.
- **Attendance** — Sitzungsdaten, Gruppen und Besuchszahlen.
- **Donations** — Chargen, Fonds, Spender und Beträge.
- **Forms** — Formularnamen und Inhaltstypen.

Überprüfen Sie dies sorgfältig, bevor Sie fortfahren. Wenn etwas falsch aussieht, klicken Sie auf **Start Over** und korrigieren Sie Ihre Quelldatei.

---

## Schritt 3 - Wählen Sie Ihr Ziel

Wählen Sie aus, wohin die Daten gehen sollen:

- **B1 Database** — Importiert direkt in die B1-Datenbank Ihrer Kirche. Nach der Auswahl zeigt das Tool eine endgültige Anzahl der hinzuzufügenden Datensätze an. Klicken Sie auf **Start Transfer**, um zu bestätigen.
- **B1 Export Zip** — Lädt Ihre Daten als Zip-Datei im B1-Format herunter. Gut für Backups.
- **Breeze Export Zip** — Konvertiert Ihre Daten in das Breeze-Format.
- **Planning Center Zip** — Konvertiert Ihre Daten in das Planning Center-Format.

:::warning
Quelle und Ziel können nicht im gleichen Format sein. Wenn sie übereinstimmen, warnt Sie das Tool, um versehentliche Duplizierung zu verhindern.
:::

---

## Schritt 4 - Ausführen

Das Tool verarbeitet die Übertragung und zeigt den Fortschritt für jeden Schritt an:

- Campuses, Services, and Times
- People
- Photos
- Groups and Group Members
- Donations
- Attendance
- Forms, Questions, Answers, and Form Submissions
- Compressing (nur für Zip-Dateiziele)

:::warning
Schließen Sie Ihren Browser nicht, während die Übertragung läuft. Warten Sie, bis alle Schritte als abgeschlossen angezeigt werden.
:::

---

## Vorbereitung einer Breeze Import Zip

1. Gehen Sie in Breeze zu **Settings** und klicken Sie auf **Export** in der linken Seitenleiste.
2. Exportieren Sie drei separate Dateien: **People**, **Tags** und **Contributions**.
3. Wählen Sie alle drei Dateien aus, klicken Sie mit der rechten Maustaste und komprimieren Sie sie in eine einzelne Zip-Datei.
   - Auf einem Mac: Wählen Sie die Dateien aus, klicken Sie mit der rechten Maustaste und wählen Sie **Compress**.
   - Auf einem PC: Wählen Sie die Dateien aus, klicken Sie mit der rechten Maustaste, wählen Sie **Send to** und dann **Compressed (zipped) folder**.
4. Laden Sie die Zip-Datei mit der Option **Breeze Import Zip** in Schritt 1 hoch.

Der Breeze-Import überträgt automatisch Personen, Gruppen (Tags) und Spendendatensätze.

---

## Vorbereitung eines Planning Center-Exports

1. Exportieren Sie in Planning Center Ihre Personendaten als CSV- oder Zip-Datei.
2. Laden Sie sie mit der Option **Planning Center Zip** in Schritt 1 hoch.

---

## Vorbereitung eines Tithe.ly-Exports

1. Exportieren Sie in Tithe.ly Ihre **People**-Daten als CSV- oder Excel-Datei. Sie können auch eine separate **Giving**-Datei exportieren, wenn Sie Spendendatensätze übernehmen möchten.
2. Das Tool erkennt automatisch anhand der Spaltennamen, ob die Datei Personen- oder Spendendaten enthält.
3. Laden Sie die Datei mit der Option **Tithe.ly CSV** in Schritt 1 hoch.

:::info
Tithe.ly-Exporte können jeweils eine Datei gleichzeitig importiert werden. Führen Sie den Prozess zweimal aus, wenn Sie sowohl Personen- als auch Spendendatensätze separat importieren müssen.
:::

---

## Vorbereitung eines CCB- oder Pushpay-Exports

1. Exportieren Sie in Church Community Builder oder Pushpay Ihre **People**-Daten als CSV-Datei. Sie können auch eine separate Spenden-/Beitrags-Datei exportieren.
2. Das Tool erkennt automatisch anhand der Spaltennamen, ob die Datei Personen- oder Spendendaten enthält.
3. Laden Sie die Datei mit der Option **CCB / Pushpay CSV** in Schritt 1 hoch.

---

## Nach dem Import

Sobald die Übertragung abgeschlossen ist, nehmen Sie sich ein paar Minuten Zeit, um Ihre Daten zu überprüfen:

1. Durchsuchen Sie die Seite [People](../people/adding-people.md) und überprüfen Sie stichprobenartig einige Profile.
2. Bestätigen Sie, dass Namen, E-Mails, Telefonnummern und Adressen korrekt übernommen wurden.
3. Überprüfen Sie, dass Haushaltsverbindungen intakt sind.
4. Überprüfen Sie alle importierten Gruppen und Spendendatensätze.

Wenn Sie Probleme bemerken, können Sie einzelne Profile von der Personenseite aus bearbeiten. Sie können das Transfer-Tool auch erneut ausführen, um [Ihre Daten zu exportieren](exporting-data.md) als Backup.
''')
count += 1

print(f'\n=== Translation Complete ===')
print(f'Successfully translated {count} file(s)')
print(f'Note: This is batch 1. More files to process.')
