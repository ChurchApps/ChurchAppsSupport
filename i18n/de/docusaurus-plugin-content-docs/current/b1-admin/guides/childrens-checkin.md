---
title: "Anleitung: Kinder-Check-in einrichten"
---

# Kinder-Check-in einrichten

<div class="article-intro">

Diese Anleitung führt Sie durch alles, was nötig ist, damit ein Kinder-Check-in-System in Ihrer Kirche läuft -- von der Erfassung der Familien in der Datenbank über die Einrichtung altersgerechter Gruppen bis zum Drucken der Namensschilder am Sonntagmorgen. Am Ende können Eltern ihre Kinder an einem Kiosk-Tablet einchecken und erhalten eine passende Sicherheitsmarke.

</div>

## Schulungsvideo

<YouTube id="Ep9CBUcJwPI" title="Kinder-Check-in in B1 einrichten" next="Anwesenheit in B1 erfassen und nachverfolgen" nextUrl="/docs/b1-admin/attendance/recording-attendance" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Erstellen Sie Ihr Kirchenkonto unter [admin.b1.church](https://admin.b1.church)
- Stellen Sie sicher, dass Sie Administratorzugriff haben -- siehe bei Bedarf [Rollen & Berechtigungen](../people/roles-permissions.md)
- Optional: Bereiten Sie eine CSV-Datei mit den Familien vor, falls Sie von einem anderen System umziehen

</div>

## Schritt 1: Familien in Ihre Datenbank aufnehmen

Bevor der Check-in funktionieren kann, muss das System Ihre Familien kennen. Jedes Kind muss über die Haushaltsfunktion mit einem Elternteil verknüpft sein.

Folgen Sie der Anleitung [Personen hinzufügen](../people/adding-people.md), um mindestens eine Familie anzulegen. Achten Sie darauf:

- Zuerst den bzw. die Elternteile anzulegen
- Jedes Kind anzulegen
- Sie im gleichen Haushalt zu verknüpfen, über den [Haushalts-Editor](../people/adding-people.md#managing-households)

:::tip
Wenn Sie mehr als eine Handvoll Familien anlegen müssen, verwenden Sie das Werkzeug [CSV-Import](../people/importing-data.md) statt sie einzeln einzugeben. Ihr gesamtes Verzeichnis können Sie so in wenigen Minuten importieren.
:::

## Schritt 2: Kindergruppen anlegen

Gruppen legen die Kurse fest, in die sich Kinder einchecken. Üblicherweise richten Sie eine Gruppe pro Altersspanne ein.

Folgen Sie der Anleitung [Gruppen anlegen](../groups/creating-groups.md), um Gruppen wie diese zu erstellen:

- **Krabbelstube** (0 bis 2 Jahre)
- **Vorschule** (3 bis 5 Jahre)
- **Grundschule** (6 bis 10 Jahre)

Sie können die Namen und Altersspannen an Ihre Struktur der Kinderarbeit anpassen.

## Schritt 3: Standorte und Gottesdienste konfigurieren

Der Check-in ist an bestimmte Gottesdienstzeiten gebunden. Sie benötigen mindestens einen Standort und einen Gottesdienst.

Folgen Sie der Anleitung [Anwesenheits-Einrichtung](../attendance/setup.md), um:

1. Ihren Standort anzulegen (z. B. "Hauptstandort")
2. einen Gottesdienst anzulegen (z. B. "Sonntagvormittag")
3. die Gottesdienstzeit festzulegen (z. B. "9:00 Uhr") und optional einen [Check-in-Zeitplan](../attendance/setup.md#setting-a-check-in-schedule), damit sich der Check-in automatisch vor jedem Gottesdienst öffnet und danach schließt
4. die Kindergruppen dem Gottesdienst zuzuweisen

## Schritt 4: Die Check-in-App einrichten

Verbinden Sie nun alles, indem Sie die Check-in-App auf einem Tablet installieren.

1. Installieren Sie die **App B1 Checkin** -- Download-Links finden Sie im Artikel [Check-in](../attendance/check-in.md)
2. Melden Sie sich mit Ihren Zugangsdaten für B1 Admin an
3. Wählen Sie Ihren Standort und Ihre Gottesdienstzeit aus

Die vollständigen Einrichtungsschritte finden Sie im Artikel [Check-in](../attendance/check-in.md).

## Schritt 5: Hardware beschaffen

Sie benötigen ein Tablet für den Kiosk und optional einen Brother-Etikettendrucker für die Namensschilder.

Mindestens:
- **Ein Android- oder Amazon-Fire-Tablet** -- siehe [empfohlene Tablets](../attendance/check-in.md#recommended-hardware)
- **Einen Brother-Etikettendrucker** -- der QL-1110NWB wird wegen seiner Bluetooth- und WLAN-Unterstützung empfohlen
- **Brother-DK-1201-Etiketten** (1-1/7" x 3-1/2")

:::warning
Nur Brother-Etikettendrucker sind mit der App B1 Checkin kompatibel. Drucker anderer Marken funktionieren nicht.
:::

## Schritt 6: Einen Test-Check-in durchführen

Machen Sie vor dem Sonntagmorgen einen Testlauf:

1. Öffnen Sie die App B1 Checkin auf Ihrem Tablet
2. Wählen Sie Ihren Standort und die richtige Gottesdienstzeit aus
3. Suchen Sie eine der Familien, die Sie angelegt haben
4. Checken Sie ein Kind ein und prüfen Sie:
   - Die Anwesenheit erscheint in B1 Admin unter **Anwesenheit**
   - Wenn Sie einen Drucker verwenden, wird ein Namensschild korrekt gedruckt

:::tip
Schulen Sie Ihre Ehrenamtlichen am Empfang im Check-in-Ablauf, bevor Sie starten. Meist genügt eine kurze Einweisung von fünf Minuten.
:::

## Fertig!

Ihr Kinder-Check-in ist einsatzbereit. Eltern können ihre Familie suchen, ihre Kinder auswählen und am Kiosk einchecken. Die Anwesenheit wird automatisch in B1 Admin erfasst.

## Verwandte Artikel

- [Personen hinzufügen](../people/adding-people.md) -- weitere Familien anlegen, sobald sie zu Besuch kommen
- [Gruppen anlegen](../groups/creating-groups.md) -- Ihre Kindergruppen verwalten
- [Anwesenheits-Einrichtung](../attendance/setup.md) -- Standorte und Gottesdienste konfigurieren
- [Check-in](../attendance/check-in.md) -- detaillierte Einrichtung der Check-in-App und Hardware
- [Anwesenheit nachverfolgen](../attendance/tracking-attendance.md) -- Check-in-Berichte anzeigen
