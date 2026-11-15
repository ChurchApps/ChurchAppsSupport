---
title: "Anleitung: Check-In für die Kinderarbeit einrichten"
description: "Richten Sie in B1 Admin den Check-in für Kinder ein: Familien verknüpfen, altersgerechte Gruppen anlegen, Gottesdienste konfigurieren und Namensschilder für den Kiosk von B1 Checkin drucken."
---

# Check-In für die Kinderarbeit einrichten

<div class="article-intro">

Diese Anleitung führt Sie durch alles, was nötig ist, damit ein Check-in-System für die Kinderarbeit in Ihrer Kirche läuft – von der Erfassung der Familien in der Datenbank über die Einrichtung altersgerechter Gruppen bis zum Drucken der Namensschilder am Sonntagmorgen. Am Ende können Eltern ihre Kinder an einem Kiosk-Tablet einchecken und erhalten eine passende Sicherheitsmarke.

</div>

## Schulungsvideo {#training-video}

<YouTube id="Ep9CBUcJwPI" title="Check-In für Kinder in B1 einrichten" next="Anwesenheit in B1 erfassen und nachverfolgen" nextUrl="/docs/b1-admin/attendance/recording-attendance" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Legen Sie Ihr Kirchenkonto unter [admin.b1.church](https://admin.b1.church) an
- Stellen Sie sicher, dass Sie Administratorzugriff haben – siehe bei Bedarf [Rollen & Berechtigungen](../people/roles-permissions.md)
- Optional: Bereiten Sie eine CSV-Datei mit Familien vor, wenn Sie von einem anderen System umziehen

</div>

## Schritt 1: Familien in Ihre Datenbank aufnehmen {#step-1-add-families-to-your-database}

Bevor der Check-in funktionieren kann, muss das System Ihre Familien kennen. Jedes Kind muss über die Funktion Haushalte mit einem Elternteil verknüpft sein.

Folgen Sie der Anleitung [Personen hinzufügen](../people/adding-people.md), um mindestens eine Familie anzulegen. Achten Sie dabei darauf:

- Zuerst den oder die Elternteile anzulegen
- Jedes Kind anzulegen
- Sie im selben Haushalt mit dem [Haushalt-Editor](../people/adding-people.md#managing-households) zu verknüpfen

:::tip
Wenn Sie mehr als eine Handvoll Familien erfassen müssen, verwenden Sie das Werkzeug [CSV-Import](../people/importing-data.md) statt jede einzeln anzulegen. Ihr gesamtes Verzeichnis lässt sich in wenigen Minuten importieren.
:::

## Schritt 2: Gruppen für die Kinderarbeit anlegen {#step-2-create-childrens-groups}

Gruppen legen die Klassen fest, in die sich Kinder einchecken. In der Regel richten Sie eine Gruppe pro Altersspanne ein.

Folgen Sie der Anleitung [Gruppen erstellen](../groups/creating-groups.md), um Gruppen wie diese anzulegen:

- **Krippe** (Alter 0–2)
- **Vorschule** (Alter 3–5)
- **Grundschule** (Alter 6–10)

Sie können die Namen und Altersspannen an Ihre Struktur der Kinderarbeit anpassen. Öffnen Sie danach die Einstellungen jeder Gruppe (klicken Sie auf der Gruppenseite auf **Bearbeiten**) und:

- Setzen Sie **Anwesenheit erfassen** auf **Ja**, damit die Gruppe für den Check-in ausgewählt werden kann
- Aktivieren Sie **Namensschild drucken** (und **Abholung durch Eltern**, wenn Sie Abholmarken drucken)
- Legen Sie optional die Grenzen für **Alter & Klassenstufe** fest, damit der Kiosk den richtigen Raum vorschlägt – siehe [Check-In-Sicherheit](../attendance/checkin-safety.md)

## Schritt 3: Standorte und Gottesdienste konfigurieren {#step-3-configure-campuses-and-services}

Der Check-in ist an bestimmte Gottesdienstzeiten gebunden. Sie benötigen mindestens einen Standort und einen Gottesdienst.

Folgen Sie der Anleitung [Anwesenheitseinrichtung](../attendance/setup.md), um:

1. zu **Personen > Anwesenheit** zu gehen und auf **Einrichtung** zu klicken
2. Ihren Standort anzulegen (z. B. „Hauptstandort“)
3. einen Gottesdienst anzulegen (z. B. „Sonntagvormittag“)
4. die Gottesdienstzeit anzulegen (z. B. „9:00 Uhr“) und optional einen [Check-in-Zeitplan](../attendance/setup.md#setting-a-check-in-schedule), damit der Check-in vor jedem Gottesdienst automatisch öffnet und danach schließt
5. jede Kindergruppe mit der Gottesdienstzeit zu verknüpfen: Öffnen Sie die Gruppe, klicken Sie auf **Bearbeiten**, wählen Sie die Zeit unter **Gottesdienstzeit hinzufügen** und klicken Sie auf das Pluszeichen

## Schritt 4: Die Check-in-App einrichten {#step-4-set-up-the-check-in-app}

Verbinden Sie nun alles, indem Sie die Check-in-App auf einem Tablet installieren.

1. Installieren Sie die **App B1 Checkin** – die Download-Links finden Sie im Artikel [Check-In](../attendance/check-in.md)
2. Melden Sie sich mit einem Konto an, das die Anwesenheitsberechtigung **Checkin** (oder **Anwesenheit bearbeiten**) hat – siehe [Check-In-Kiosk-Konten](../settings/roles-permissions.md#check-in-kiosk-accounts)
3. Wählen Sie Ihren Standort und Ihre Gottesdienstzeit

Ausführliche Einrichtungsschritte finden Sie im vollständigen Artikel [Check-In](../attendance/check-in.md).

## Schritt 5: Ihre Hardware beschaffen {#step-5-get-your-hardware}

Sie benötigen ein Tablet für den Kiosk und optional einen Brother-Etikettendrucker für die Namensschilder.

Mindestens:
- **Ein iPad, Android- oder Amazon-Fire-Tablet** – siehe [empfohlene Tablets](../attendance/check-in.md#recommended-hardware)
- **Ein Brother-Etikettendrucker** – der QL-1110NWB wird wegen seiner Bluetooth- und WLAN-Unterstützung empfohlen
- **Brother DK-1201-Etiketten** (1-1/7" x 3-1/2")

:::warning
Nur Brother-Etikettendrucker sind mit der App B1 Checkin kompatibel. Drucker anderer Marken funktionieren nicht.
:::

## Schritt 6: Einen Testdurchlauf des Check-ins machen {#step-6-run-a-test-check-in}

Führen Sie vor dem Sonntagmorgen einen Testdurchlauf durch:

1. Öffnen Sie die App B1 Checkin auf Ihrem Tablet
2. Wählen Sie Ihren Standort und die richtige Gottesdienstzeit
3. Suchen Sie nach einer der Familien, die Sie angelegt haben
4. Checken Sie ein Kind ein und prüfen Sie:
   - Die Anwesenheit erscheint in B1 Admin unter **Personen > Anwesenheit**
   - Falls Sie einen Drucker verwenden, wird ein Namensschild korrekt gedruckt

:::tip
Schulen Sie Ihre ehrenamtlichen Teams am Empfang im Check-in-Ablauf, bevor Sie starten. Meist genügt eine kurze Einweisung von fünf Minuten.
:::

## Fertig! {#youre-done}

Ihr Check-in für die Kinderarbeit ist bereit. Eltern können ihre Familie suchen, ihre Kinder auswählen und am Kiosk einchecken. Die Anwesenheit wird automatisch in B1 Admin erfasst.

## Verwandte Artikel {#related-articles}

- [Personen hinzufügen](../people/adding-people.md) – weitere Familien aufnehmen, sobald sie zu Besuch kommen
- [Gruppen erstellen](../groups/creating-groups.md) – Ihre Kindergruppen verwalten
- [Anwesenheitseinrichtung](../attendance/setup.md) – Standorte und Gottesdienste konfigurieren
- [Check-In](../attendance/check-in.md) – ausführliche Einrichtung der Check-in-App und Hardware
- [Anwesenheit verfolgen](../attendance/tracking-attendance.md) – Check-in-Berichte ansehen
