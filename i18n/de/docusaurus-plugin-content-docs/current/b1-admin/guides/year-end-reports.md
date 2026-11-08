---
title: "Anleitung: Jahresspendenberichte erstellen"
description: "Schließen Sie in B1 Admin die Spendenaufzeichnungen des Jahres ab, überprüfen Sie die steuerlichen Einstellungen der Fonds und erstellen Sie steuerlich absetzbare Spendenbescheinigungen für alle Spender."
---

# Jahresspendenberichte erstellen

<div class="article-intro">

Dieser Leitfaden führt Sie durch den Jahresabschluss: die Fertigstellung Ihrer Spendenaufzeichnungen, die Überprüfung der Fondseinstellungen und die Erstellung steuerlich absetzbarer Spendenbescheinigungen für jeden Spender. Dieser Vorgang wird in der Regel Anfang Januar für das vorangegangene Kalenderjahr durchgeführt.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- B1 Admin-Konto mit Zugriff auf die Finanzen
- Während des Jahres erfasste Spenden (online über Stripe und/oder manuell eingetragen)
- Zugang zu Ihrem Stripe-Konto, falls Sie Online-Spenden annehmen

</div>

## Schritt 1: Abschließende Stripe-Transaktionen importieren

Stellen Sie sicher, dass alle Online-Spenden vom Jahresende in Ihrem System vorhanden sind.

Folgen Sie der Anleitung [Stripe-Import](../donations/stripe-import.md), um:

1. zu Spenden > Stripe-Import zu navigieren
2. einen Datumsbereich zu wählen, der das Jahresende abdeckt (z. B. 1. bis 31. Dezember)
3. zunächst auf **Vorschau** zu klicken, um die Daten zu prüfen, und dann auf **Fehlende importieren**, um den Import abzuschließen

:::warning
Führen Sie diesen Import vor der Erstellung der Bescheinigungen durch. Transaktionen, die Sie nicht importiert haben, erscheinen nicht auf den Spenderbescheinigungen.
:::

## Schritt 2: Spendenberichte prüfen

Überprüfen Sie Ihre Aufzeichnungen auf Richtigkeit, bevor Sie die Bescheinigungen erstellen.

Folgen Sie der Anleitung [Spendenberichte](../donations/donation-reports.md), um:

1. die Spendenübersichtsseite für das gesamte Jahr zu prüfen
2. die Summen je Fonds zu kontrollieren und mit Ihren Kontoauszügen abzugleichen, um etwaige Abweichungen aufzudecken
3. bei Bedarf einzelne Chargen anzuklicken, um die Angaben zu den einzelnen Spendern zu überprüfen

## Schritt 3: Steuerstatus der Fonds überprüfen

Stellen Sie sicher, dass die Einstellung zur Steuerabsetzbarkeit jedes Fonds korrekt ist, damit die Bescheinigungen stimmen.

Folgen Sie der Anleitung [Fonds](../donations/funds.md), um:

1. jeden Fonds zu öffnen und zu bestätigen, dass die Einstellung zur Steuerabsetzbarkeit korrekt ist

:::info
Auf Spendenbescheinigungen erscheinen nur Spenden an Fonds, die als steuerlich absetzbar markiert sind. Sollte ein Fonds steuerlich absetzbar sein, ist aber nicht entsprechend markiert, aktualisieren Sie ihn, bevor Sie die Bescheinigungen erstellen.
:::

## Schritt 4: Spendenbescheinigungen erstellen

Erstellen Sie die offiziellen Spendenbescheinigungen für Ihre Spender.

Folgen Sie der Anleitung [Spendenbescheinigungen](../donations/giving-statements.md), um:

1. zu **Spenden > Spendenbescheinigungen** zu navigieren
2. das Jahr im Dropdown-Menü auszuwählen und die Übersichtsstatistiken zu prüfen
3. Ihre Download-Methode zu wählen:
   - **ZIP herunterladen** — einzelne CSV-Dateien, eine pro Spender
   - **Alle drucken** — druckbare Ansicht mit jeder Bescheinigung auf einer neuen Seite, oben mit Ihrem Kirchenlogo (sofern Sie eines hochgeladen haben)

:::tip
Erstellen Sie die Bescheinigungen Anfang Januar, solange die Aufzeichnungen noch frisch sind. So bleibt Ihnen Zeit, etwaige Probleme zu beheben, bevor die Bescheinigungen versandt werden.
:::

## Schritt 5: An Spender verteilen

Bringen Sie die Bescheinigungen zu Ihren Spendern.

1. Bescheinigungen drucken und per Post versenden oder einzelne CSV-Dateien per E-Mail an die Spender senden
2. Mitglieder können ihre eigene Spendenhistorie außerdem einsehen und Bescheinigungen auf [B1.church oder in der B1 App](../../b1-church/giving/donation-history.md) ausdrucken

## Fertig!

Ihre Jahresspendenberichte sind abgeschlossen. Die Spender haben ihre steuerlich absetzbaren Bescheinigungen erhalten, und Ihre Finanzunterlagen für das Jahr sind abgeschlossen.

## Verwandte Artikel

- [Stripe-Import](../donations/stripe-import.md) — Online-Transaktionen importieren
- [Spendenberichte](../donations/donation-reports.md) — Spendentrends und Summen einsehen
- [Fonds](../donations/funds.md) — Fonds und Einstellungen zur Steuerabsetzbarkeit verwalten
- [Spendenbescheinigungen](../donations/giving-statements.md) — Jahresbescheinigungen erstellen
- [Spenden erfassen](../donations/recording-donations.md) — Bar- und Scheckspenden manuell eintragen
- [Spendenhistorie (Web)](../../b1-church/giving/donation-history.md) — Selbstbedienungsansicht für Mitglieder
- [Anleitung zur Einrichtung von Online-Spenden](./online-giving.md) — ursprüngliche Stripe- und Spendeneinrichtung
