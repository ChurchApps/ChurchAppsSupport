---
title: "Anleitung: Check-in für die Kinderarbeit einrichten"
description: "Richten Sie in B1 Admin den Kinder-Check-in ein: Familien verknüpfen, altersbezogene Gruppen anlegen, Gottesdienste konfigurieren und Namensschilder für den B1-Checkin-Kiosk drucken."
---

# Check-in für die Kinderarbeit einrichten

<div class="article-intro">

Diese Anleitung führt Sie durch alles, was nötig ist, damit in Ihrer Kirche ein Check-in-System für Kinder läuft – vom Erfassen der Familien in der Datenbank über die Einrichtung altersgerechter Gruppen bis zum Drucken der Namensschilder am Sonntagmorgen. Am Ende können Eltern ihre Kinder an einem Kiosk-Tablet einchecken und erhalten eine passende Sicherheitsmarke.

</div>

## Schulungsvideo

<YouTube id="Ep9CBUcJwPI" title="Kinder-Check-in in B1 einrichten" next="Anwesenheit in B1 erfassen und auswerten" nextUrl="/docs/b1-admin/attendance/recording-attendance" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Legen Sie Ihr Kirchenkonto unter [admin.b1.church](https://admin.b1.church) an
- Stellen Sie sicher, dass Sie Administratorzugriff haben – siehe [Rollen & Berechtigungen](../people/roles-permissions.md), falls nötig
- Optional: Bereiten Sie eine CSV-Datei mit den Familien vor, wenn Sie von einem anderen System umziehen

</div>

## Schritt 1: Familien in Ihre Datenbank aufnehmen

Bevor der Check-in funktionieren kann, muss das System Ihre Familien kennen. Jedes Kind muss über die Haushaltsfunktion mit einem Elternteil verknüpft sein.

Folgen Sie der Anleitung [Personen hinzufügen](../people/adding-people.md), um mindestens eine Familie anzulegen. Achten Sie darauf:

- Zuerst die Eltern anzulegen
- Jedes Kind anzulegen
- Sie im selben Haushalt mit dem [Haushalt-Editor](../people/adding-people.md#managing-households) zu verknüpfen

:::tip
Wenn Sie mehr als eine Handvoll Familien anlegen müssen, verwenden Sie das Werkzeug [CSV-Import](../people/importing-data.md) statt jede Familie einzeln einzugeben. Sie können Ihr gesamtes Verzeichnis in wenigen Minuten importieren.
:::

## Schritt 2: Gruppen für Kinder anlegen

Gruppen legen die Klassen fest, in die sich Kinder einchecken. Üblicherweise richten Sie eine Gruppe pro Altersspanne ein.

Folgen Sie der Anleitung [Gruppen erstellen](../groups/creating-groups.md), um Gruppen wie diese anzulegen:

- **Krabbelstube** (0–2 Jahre)
- **Vorschule** (3–5 Jahre)
- **Grundschule** (6–10 Jahre)

Sie können die Namen und Altersspannen an Ihre Struktur der Kinderarbeit anpassen.

## Schritt 3: Standorte und Gottesdienste konfigurieren

Der Check-in ist an bestimmte Gottesdienstzeiten gebunden. Sie benötigen mindestens einen Standort und einen Gottesdienst.

Folgen Sie der Anleitung [Anwesenheits-Einrichtung](../attendance/setup.md), um:

1. Ihren Standort anzulegen (z. B. „Hauptstandort“)
2. Einen Gottesdienst anzulegen (z. B. „Sonntagvormittag“)
3. Die Gottesdienstzeit festzulegen (z. B. „9:00 Uhr“) und optional einen [Check-in-Zeitplan](../attendance/setup.md#setting-a-check-in-schedule), damit der Check-in vor jedem Gottesdienst automatisch öffnet und danach schließt
4. Die Kindergruppen dem Gottesdienst zuzuweisen

## Schritt 4: Die Check-in-App einrichten

Verbinden Sie nun alles, indem Sie die Check-in-App auf einem Tablet installieren.

1. Installieren Sie die **App B1 Checkin** – Download-Links finden Sie im Artikel [Check-in](../attendance/check-in.md)
2. Melden Sie sich mit Ihren Zugangsdaten für B1 Admin an
3. Wählen Sie Ihren Standort und Ihre Gottesdienstzeit

Die vollständigen Schritte zur Einrichtung finden Sie im Artikel [Check-in](../attendance/check-in.md).

## Schritt 5: Die Hardware besorgen

Sie benötigen ein Tablet für den Kiosk und optional einen Brother-Etikettendrucker für die Namensschilder.

Mindestens:
- **Ein Android- oder Amazon-Fire-Tablet** – siehe [empfohlene Tablets](../attendance/check-in.md#recommended-hardware)
- **Einen Brother-Etikettendrucker** – der QL-1110NWB wird wegen seiner Bluetooth- und WLAN-Unterstützung empfohlen
- **Brother-DK-1201-Etiketten** (1-1/7" x 3-1/2")

:::warning
Nur Brother-Etikettendrucker sind mit der App B1 Checkin kompatibel. Drucker anderer Marken funktionieren nicht.
:::

## Schritt 6: Einen Testdurchlauf des Check-ins machen

Führen Sie vor dem Sonntagmorgen einen Testlauf durch:

1. Öffnen Sie die App B1 Checkin auf Ihrem Tablet
2. Wählen Sie Ihren Standort und die richtige Gottesdienstzeit
3. Suchen Sie nach einer der Familien, die Sie angelegt haben
4. Checken Sie ein Kind ein und prüfen Sie:
   - Die Anwesenheit erscheint in B1 Admin unter **Anwesenheit**
   - Falls Sie einen Drucker verwenden, wird ein Namensschild korrekt gedruckt

:::tip
Schulen Sie Ihre Ehrenamtlichen im Empfangsteam im Check-in-Ablauf, bevor Sie starten. Meist genügt eine kurze fünfminütige Einweisung.
:::

## Sie sind fertig!

Ihr Check-in für die Kinderarbeit ist bereit. Eltern können ihre Familie suchen, ihre Kinder auswählen und am Kiosk einchecken. Die Anwesenheit wird automatisch in B1 Admin erfasst.

## Verwandte Artikel

- [Personen hinzufügen](../people/adding-people.md) – weitere Familien hinzufügen, sobald sie zu Besuch kommen
- [Gruppen erstellen](../groups/creating-groups.md) – Ihre Kindergruppen verwalten
- [Anwesenheits-Einrichtung](../attendance/setup.md) – Standorte und Gottesdienste konfigurieren
- [Check-in](../attendance/check-in.md) – ausführliche Einrichtung der Check-in-App und Hardware
- [Anwesenheit auswerten](../attendance/tracking-attendance.md) – Check-in-Berichte ansehen
