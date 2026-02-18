---
title: "Anleitung: Check-in für den Kinderdienst einrichten"
---

# Check-in für den Kinderdienst einrichten

<div class="article-intro">

Diese Anleitung führt Sie durch alles, was Sie brauchen, um ein Check-in-System für den Kinderdienst in Ihrer Gemeinde einzurichten -- vom Eingeben von Familien in die Datenbank über die Konfiguration altersgerechter Gruppen bis hin zum Drucken von Namensschildern am Sonntagmorgen. Am Ende können Eltern ihre Kinder an einem Kiosk-Tablet einchecken und ein passendes Sicherheitsetikett erhalten.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Erstellen Sie Ihr Gemeindekonto unter [admin.b1.church](https://admin.b1.church)
- Stellen Sie sicher, dass Sie Admin-Zugang haben -- siehe [Rollen & Berechtigungen](../people/roles-permissions.md) bei Bedarf
- Optional: Bereiten Sie eine CSV-Datei mit Familien vor, wenn Sie von einem anderen System migrieren

</div>

## Schritt 1: Familien zur Datenbank hinzufügen

Bevor das Check-in funktioniert, muss das System Ihre Familien kennen. Jedes Kind muss über die Haushaltsfunktion mit einem Elternteil verknüpft sein.

Folgen Sie der Anleitung [Personen hinzufügen](../people/adding-people.md), um mindestens eine Familie hinzuzufügen. Achten Sie darauf:

- Zuerst die Eltern hinzufügen
- Jedes Kind hinzufügen
- Sie im selben Haushalt über den [Haushaltseditor](../people/adding-people.md#managing-households) verknüpfen

:::tip
Wenn Sie mehr als eine Handvoll Familien hinzufügen müssen, verwenden Sie das [CSV-Import](../people/importing-data.md)-Werkzeug, anstatt sie einzeln hinzuzufügen. Sie können Ihr gesamtes Verzeichnis in wenigen Minuten importieren.
:::

## Schritt 2: Kindergruppen erstellen

Gruppen definieren die Klassen, in die sich Kinder einchecken. Typischerweise möchten Sie eine Gruppe pro Altersgruppe.

Folgen Sie der Anleitung [Gruppen erstellen](../groups/creating-groups.md), um Gruppen wie diese zu erstellen:

- **Krippe** (Alter 0--2)
- **Vorschule** (Alter 3--5)
- **Grundschule** (Alter 6--10)

Sie können die Namen und Altersgruppen an die Struktur Ihres Dienstes anpassen.

## Schritt 3: Standorte und Gottesdienste konfigurieren

Das Check-in ist an bestimmte Gottesdienstzeiten gebunden. Sie benötigen mindestens einen Standort und einen konfigurierten Gottesdienst.

Folgen Sie der Anleitung [Anwesenheit einrichten](../attendance/setup.md), um:

1. Ihren Standort hinzuzufügen (z. B. „Hauptstandort")
2. Einen Gottesdienst hinzuzufügen (z. B. „Sonntagmorgen")
3. Die Gottesdienstzeit festzulegen (z. B. „9:00 Uhr")
4. Ihre Kindergruppen dem Gottesdienst zuzuweisen

## Schritt 4: Die Check-in-App einrichten

Verbinden Sie nun alles, indem Sie die Check-in-App auf einem Tablet installieren.

1. Installieren Sie die **B1 Checkin-App** -- siehe den Artikel [Check-in](../attendance/check-in.md) für Download-Links
2. Melden Sie sich mit Ihren B1 Admin-Zugangsdaten an
3. Wählen Sie Ihren Standort und Ihre Gottesdienstzeit

Den vollständigen Artikel [Check-in](../attendance/check-in.md) finden Sie für detaillierte Einrichtungsschritte.

## Schritt 5: Hardware besorgen

Sie benötigen ein Tablet für den Kiosk und optional einen Brother-Etikettendrucker für Namensschilder.

Mindestens:
- **Ein Android- oder Amazon Fire-Tablet** -- siehe [empfohlene Tablets](../attendance/check-in.md#recommended-hardware)
- **Ein Brother-Etikettendrucker** -- der QL-1110NWB wird empfohlen wegen seiner Bluetooth- und WiFi-Unterstützung
- **Brother DK-1201 Etiketten** (1-1/7" x 3-1/2")

:::warning
Nur Brother-Etikettendrucker sind mit der B1 Checkin-App kompatibel. Andere Druckermarken funktionieren nicht.
:::

## Schritt 6: Test-Check-in durchführen

Vor dem Sonntagmorgen machen Sie einen Probelauf:

1. Öffnen Sie die B1 Checkin-App auf Ihrem Tablet
2. Wählen Sie Ihren Standort und die richtige Gottesdienstzeit
3. Suchen Sie nach einer der hinzugefügten Familien
4. Checken Sie ein Kind ein und überprüfen Sie:
   - Die Anwesenheit wird in B1 Admin unter **Anwesenheit** angezeigt
   - Falls ein Drucker verwendet wird, wird ein Namensschild korrekt gedruckt

:::tip
Schulen Sie Ihre Ehrenamtlichen im Empfangsteam vor dem Start im Check-in-Prozess. Eine kurze 5-minütige Einführung reicht normalerweise aus.
:::

## Fertig!

Ihr Check-in für den Kinderdienst ist bereit. Eltern können nach ihrer Familie suchen, ihre Kinder auswählen und sich am Kiosk einchecken. Die Anwesenheit wird automatisch in B1 Admin erfasst.

## Verwandte Artikel

- [Personen hinzufügen](../people/adding-people.md) — weitere Familien hinzufügen, wenn sie zu Besuch kommen
- [Gruppen erstellen](../groups/creating-groups.md) — Ihre Kindergruppen verwalten
- [Anwesenheit einrichten](../attendance/setup.md) — Standorte und Gottesdienste konfigurieren
- [Check-in](../attendance/check-in.md) — Detaillierte Check-in-App-Einrichtung und Hardware
- [Anwesenheit verfolgen](../attendance/tracking-attendance.md) — Check-in-Berichte einsehen
