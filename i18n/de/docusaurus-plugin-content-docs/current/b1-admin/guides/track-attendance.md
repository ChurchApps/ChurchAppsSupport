---
title: "Anleitung: Gottesdienstbesuch erfassen"
description: "Erfassen Sie den Gottesdienstbesuch in B1 Admin, indem Sie Standorte und Gottesdienstzeiten einrichten, die Anwesenheit manuell oder per Selbst-Check-in erfassen und die Berichte auswerten."
---

# Gottesdienstbesuch erfassen

<div class="article-intro">

Richten Sie die Anwesenheitserfassung für Ihre Gottesdienste und Gruppen ein – von der Konfiguration der Standorte und Gottesdienstzeiten über die manuelle Erfassung oder das Selbst-Check-in in der App bis zur Auswertung von Trends in den Berichten. Am Ende haben Sie ein vollständiges Bild davon, wer wann anwesend ist.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- B1-Admin-Konto mit Administratorzugang
- [Personen im Verzeichnis erfasst](../people/adding-people.md)
- [Gruppen angelegt](../groups/creating-groups.md) für die Dienste, die Sie erfassen möchten

</div>

## Schritt 1: Standorte und Gottesdienste einrichten {#step-1-configure-campuses--services}

Legen Sie fest, wo und wann Ihre Gemeinde zusammenkommt.

Folgen Sie der Anleitung [Anwesenheit einrichten](../attendance/setup.md), um:

1. im [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) **Personen > Anwesenheit** zu wählen und auf **Einrichtung** zu klicken
2. Ihren Standort (z. B. „Hauptstandort“) und dessen Gottesdienste hinzuzufügen
3. Gottesdienstzeiten hinzuzufügen (z. B. „Sonntag 9:00 Uhr“, „Sonntag 11:00 Uhr“, „Mittwoch 19:00 Uhr“)

## Schritt 2: Anwesenheitserfassung für Gruppen aktivieren {#step-2-enable-group-attendance-tracking}

Aktivieren Sie die Anwesenheitserfassung für die Gruppen, die Sie begleiten möchten.

Folgen Sie der Anleitung [Gruppen erstellen](../groups/creating-groups.md), um:

1. jede Gruppe zu öffnen, die Sie erfassen möchten, auf **Bearbeiten** zu klicken und **Anwesenheit erfassen** auf **Ja** zu setzen
2. Wenn sich die Gruppe während eines Gottesdienstes trifft, wählen Sie die Zeit unter **Gottesdienstzeit hinzufügen** aus und klicken Sie auf das Plus-Symbol, damit die Anwesenheit dem richtigen Gottesdienst zugeordnet wird. Klicken Sie anschließend auf **Speichern**

:::info
Nicht jede Gruppe benötigt eine Anwesenheitserfassung. Aktivieren Sie sie für Gruppen, deren Teilnahme Sie im Blick behalten möchten – etwa Kinderstunden, Kleingruppen, Sonntagsschule usw.
:::

## Schritt 3: Anwesenheit manuell erfassen {#step-3-record-attendance-manually}

Haken Sie ab, wer an jedem Gottesdienst und jeder Gruppe teilgenommen hat.

Folgen Sie der Anleitung [Anwesenheit erfassen](../attendance/recording-attendance.md), um:

1. eine Gruppe zu öffnen, im Abschnitt **Sitzungen** auf **Alle Sitzungen** zu klicken, auf **Neu** zu klicken und die **Gottesdienstzeit** und das **Sitzungsdatum** zu wählen. Aktivieren Sie **Auch für die anderen _N_ Gruppen zur _Gottesdienstzeit_ hinzufügen**, um für alle Kurse zu dieser Gottesdienstzeit auf einmal Sitzungen anzulegen
2. Haken Sie ab, wer teilgenommen hat, und klicken Sie auf **Anwesenheit speichern**

Wenn Sie nur eine Gesamtzahl statt Namen benötigen (zum Beispiel beim Hauptgottesdienst), klicken Sie stattdessen auf der Seite **Anwesenheit** auf **Besucherzahl eingeben** – siehe [Eingabe der Besucherzahl](../attendance/headcount-entry.md).

:::tip
Die manuelle Erfassung eignet sich hervorragend für Gottesdienste mit Erwachsenen, Kleingruppen und überall dort, wo ein Check-in-Terminal nicht praktikabel ist.
:::

## Schritt 4: Selbst-Check-in einrichten (optional) {#step-4-set-up-self-check-in-optional}

Lassen Sie Mitglieder sich mit einem Tablet-Terminal selbst einchecken.

Folgen Sie der Anleitung [Check-in](../attendance/check-in.md), um:

1. die B1-Checkin-App auf einem Tablet für das Selbst-Check-in zu installieren
2. Mitglieder suchen ihren Namen und checken sich selbst und ihre Familie ein
3. Check-in-Anwesenheitsdaten erscheinen zusammen mit manuell erfassten Daten – es gibt keinen Unterschied in den Daten

:::info
Für eine vollständige Einrichtung der Kinderarbeit einschließlich Hardware und Druckerkonfiguration siehe die [Anleitung zum Kinder-Check-in](./childrens-checkin.md).
:::

## Schritt 5: Anwesenheitsberichte ansehen {#step-5-view-attendance-reports}

Behalten Sie die Gesamtentwicklung der Teilnahme in Ihrer Gemeinde im Blick.

Folgen Sie der Anleitung [Anwesenheitsberichte](../reports/attendance-reports.md). Klicken Sie auf der Seite **Anwesenheit** auf **Alle Jahre**, um diese Berichte als Reiter zu finden:

1. **Anwesenheitsverlauf** – Anwesenheit im Zeitverlauf betrachten, um Wachstum oder Rückgang zu erkennen
2. **Besucherzahlverlauf** – die von Hand eingegebenen Besucherzahlen als Diagramm darstellen
3. **Gruppenanwesenheit** – sehen, wer an jeder Gruppensitzung in einem Zeitraum teilgenommen hat, mit CSV-Download

Für eine tägliche Zählung einer Gruppe öffnen Sie den Bericht **Tägliche Gruppenanwesenheit** unter **admin.b1.church/reports/dailyGroupAttendance**.

:::info
Die Anwesenheitsberichte kombinieren manuell erfasste Anwesenheit und Selbst-Check-in. Die Daten werden auf keine unterschiedliche Weise dargestellt – beide Methoden fließen in dieselben Berichte ein.
:::

## Geschafft! {#youre-done}

Ihre Anwesenheitserfassung ist eingerichtet. Ob Sie die Anwesenheit manuell erfassen, die Check-in-App nutzen oder beides – alle Daten fließen in dieselben Berichte, sodass Sie einen klaren Überblick über die Teilnahme in Ihrer Gemeinde haben.

## Verwandte Artikel {#related-articles}

- [Anwesenheit einrichten](../attendance/setup.md) — Standorte und Gottesdienste konfigurieren
- [Eingabe der Besucherzahl](../attendance/headcount-entry.md) — Gesamtzahlen ohne Namen erfassen
- [Anwesenheit erfassen](../attendance/recording-attendance.md) — Anwesenheit manuell erfassen
- [Anwesenheit verfolgen](../attendance/tracking-attendance.md) — Anwesenheitstrends prüfen
- [Check-in](../attendance/check-in.md) — App für das Selbst-Check-in
- [Gruppen erstellen](../groups/creating-groups.md) — Gruppen mit Anwesenheitserfassung einrichten
- [Anwesenheitsberichte](../reports/attendance-reports.md) — Anwesenheitstrends ansehen
- [Anleitung zum Kinder-Check-in](./childrens-checkin.md) — vollständige Check-in-Einrichtung für die Kinderarbeit
