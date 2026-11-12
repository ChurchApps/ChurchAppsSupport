---
title: "Anleitung: Jahresendberichte für Spenden erstellen"
description: "Schließen Sie in B1 Admin die Spendenaufzeichnungen des Jahres ab, prüfen Sie die steuerlichen Einstellungen der Fonds und erstellen Sie steuerlich absetzbare Spendenbescheinigungen für jeden Spender."
---

# Jahresendberichte für Spenden erstellen

<div class="article-intro">

Gehen Sie den Jahresabschluss Schritt für Schritt durch: Spendenaufzeichnungen finalisieren, Fondseinstellungen prüfen und steuerlich absetzbare Spendenbescheinigungen für jeden Spender erstellen. Dies geschieht in der Regel Anfang Januar für das vorangegangene Kalenderjahr.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- B1-Admin-Konto mit Finanzzugang
- Im Laufe des Jahres erfasste Spenden (online über Stripe und/oder manuell eingetragen)
- Zugang zu Ihrem Stripe-Konto, falls Sie Online-Spenden annehmen

</div>

## Schritt 1: Finale Stripe-Transaktionen importieren {#step-1-import-final-stripe-transactions}

Stellen Sie sicher, dass alle Online-Spenden vom Jahresende in Ihrem System vorhanden sind.

Folgen Sie der Anleitung [Stripe-Import](../donations/stripe-import.md), um:

1. im [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) **Spenden > Stripe-Import** zu wählen (der Menüpunkt erscheint nur, wenn Ihr Spendenanbieter Stripe ist)
2. das **Startdatum** und das **Enddatum** so festzulegen, dass das Jahresende abgedeckt ist (z. B. 1. Dezember bis 31. Dezember)
3. zuerst auf **Vorschau** zu klicken, um zu prüfen, und dann auf **Fehlende importieren**, um abzuschließen

:::warning
Führen Sie diesen Import aus, bevor Sie Bescheinigungen erstellen. Transaktionen, die Sie nicht importiert haben, erscheinen nicht auf den Spenderbescheinigungen.
:::

## Schritt 2: Spendenberichte prüfen {#step-2-review-donation-reports}

Überprüfen Sie, ob Ihre Aufzeichnungen korrekt sind, bevor Sie Bescheinigungen erstellen.

Folgen Sie der Anleitung [Spendenberichte](../donations/donation-reports.md), um:

1. im Sprungmenü **Spenden > Übersicht** zu wählen, im Bereich **Bericht filtern** das **Startdatum** und das **Enddatum** auf das gesamte Jahr einzustellen und auf **Bericht ausführen** zu klicken
2. die Summen nach Fonds zu prüfen und mit Ihren Kontoauszügen abzugleichen, um Abweichungen zu finden. Klicken Sie auf **Download-Optionen** und wählen Sie **Übersicht** für eine CSV-Datei
3. bei Bedarf einzelne Chargen unter **Spenden > Chargen** öffnen, um die Details der einzelnen Spender zu prüfen

## Schritt 3: Steuerlichen Status der Fonds prüfen {#step-3-verify-fund-tax-status}

Stellen Sie sicher, dass die Einstellung zur Steuerabsetzbarkeit jedes Fonds korrekt ist, damit die Bescheinigungen stimmen.

Folgen Sie der Anleitung [Fonds](../donations/funds.md), um:

1. im Sprungmenü **Spenden > Fonds** zu wählen und den **Steuerstatus** jedes Fonds zu prüfen
2. bei einem Fonds auf **Bearbeiten** zu klicken, um die Einstellung **Steuerlich absetzbar** zu ändern

:::info
Nur Spenden an Fonds, die als steuerlich absetzbar markiert sind, erscheinen auf den Spendenbescheinigungen. Wenn ein Fonds steuerlich absetzbar sein sollte, aber nicht so markiert ist, aktualisieren Sie ihn, bevor Sie die Bescheinigungen erstellen.
:::

## Schritt 4: Spendenbescheinigungen erstellen {#step-4-generate-giving-statements}

Erstellen Sie die offiziellen Spendenbescheinigungen für Ihre Spender.

Folgen Sie der Anleitung [Spendenbescheinigungen](../donations/giving-statements.md), um:

1. im Sprungmenü **Spenden > Spendenbescheinigungen** zu wählen
2. das **Jahr** auszuwählen und die Übersichtszahlen zu prüfen. Gemeinden in Kanada, Australien oder Neuseeland können auf **Bescheinigungsformat** klicken, um zum offiziellen Quittungsformat ihres Landes zu wechseln
3. Ihre Download-Methode wählen:
   - **ZIP herunterladen** – einzelne CSV-Dateien, eine pro Spender
   - **Alle drucken** – druckbare Ansicht, bei der jede Bescheinigung auf einer neuen Seite steht und oben Ihr Gemeindelogo erscheint (sofern Sie eines hochgeladen haben)

:::tip
Erstellen Sie die Bescheinigungen Anfang Januar, solange die Aufzeichnungen noch aktuell sind. So haben Sie Zeit, Probleme zu beheben, bevor Sie sie versenden.
:::

## Schritt 5: An Spender verteilen {#step-5-distribute-to-donors}

Bringen Sie die Bescheinigungen zu Ihren Spendern.

1. Drucken Sie die Bescheinigungen aus und verschicken Sie sie per Post oder senden Sie einzelne CSV-Dateien per E-Mail an Spender
2. Mitglieder können ihre eigene Spendenhistorie außerdem auf [B1.church oder in der B1-App](../../b1-church/giving/donation-history.md) einsehen und Bescheinigungen ausdrucken

## Geschafft! {#youre-done}

Ihre Jahresendberichte zu Spenden sind fertig. Die Spender haben ihre steuerlich absetzbaren Bescheinigungen, und Ihre Finanzaufzeichnungen für das Jahr sind abgeschlossen.

## Verwandte Artikel {#related-articles}

- [Stripe-Import](../donations/stripe-import.md) — Online-Transaktionen importieren
- [Spendenberichte](../donations/donation-reports.md) — Spendentrends und Summen ansehen
- [Fonds](../donations/funds.md) — Fonds und Einstellungen zur Steuerabsetzbarkeit verwalten
- [Spendenbescheinigungen](../donations/giving-statements.md) — Bescheinigungen zum Jahresende erstellen
- [Spenden erfassen](../donations/recording-donations.md) — Bar- und Scheckspenden manuell eintragen
- [Spendenhistorie (Web)](../../b1-church/giving/donation-history.md) — Ansicht für Mitglieder im Selbstservice
- [Anleitung: Online-Spenden einrichten](./online-giving.md) — erste Einrichtung von Stripe und Spenden
