---
title: "Stripe-Import"
description: "Importieren Sie Stripe-Spenden in B1 Admin mit einer vorschaubasierten Übernahme, die jede Zahlung als neu, bereits importiert oder übersprungen markiert, bevor Sie sie bestätigen."
---

# Stripe-Import

<div class="article-intro">

Wenn Sie Online-Spenden über Stripe annehmen, können Sie mit dem Werkzeug Stripe-Import diese Transaktionen in B1 Admin übernehmen, sodass alle Ihre Spendendaten an einem Ort liegen. Das ist besonders nützlich, um Transaktionen aufzuspüren, die nicht automatisch synchronisiert wurden.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie zuerst die [Einrichtung der Online-Spenden](online-giving-setup.md) ab, um Ihr Stripe-Konto mit B1 Admin zu verbinden. Der Menüpunkt **Stripe-Import** und die Schaltfläche auf der Seite Stapel erscheinen nur, wenn der Zahlungsdienst Ihrer Kirche Stripe ist, und nur für Personen, die Spenden bearbeiten dürfen
- Prüfen Sie, ob in Ihrem Stripe-Dashboard Spenden für den Zeitraum vorhanden sind, den Sie importieren möchten

</div>

## So funktioniert es

Der Import läuft in zwei Schritten: Zuerst sehen Sie eine Vorschau, was importiert würde, danach bestätigen Sie den Import. Dieses Vorgehen mit einem Testlauf erlaubt es Ihnen, alles zu prüfen, bevor Daten angelegt werden.

## Transaktionen importieren

1. Gehen Sie in **B1 Admin** zu **Spenden > Stripe-Import**. (Alternativ klicken Sie oben auf der Seite **Stapel** auf **Fehlende Stripe-Transaktionen importieren**.)
2. Die Seite **Stripe-Import** öffnet sich.
3. Wählen Sie einen **Datumsbereich** für die Transaktionen, die Sie importieren möchten.
4. Klicken Sie auf **Vorschau**, um einen Testlauf auszuführen.

## Die Vorschau prüfen

Die Vorschau zeigt jede Transaktion aus Stripe mit einem Statusanzeiger:

- **Neu** – Diese Transaktion wurde noch nicht importiert und wird übernommen, wenn Sie fortfahren.
- **Bereits importiert** – Diese Transaktion existiert bereits in B1 Admin und wird übersprungen.
- **Übersprungen** – Diese Transaktion wurde aus einem anderen Grund ausgeschlossen (z. B. eine Erstattung oder eine fehlgeschlagene Abbuchung).

Ein Zusammenfassungsbereich oben zeigt die Gesamtzahl der Transaktionen in jeder Kategorie und die beteiligten Geldbeträge.

:::info
Der Vorschau-Schritt erstellt keine Datensätze. Er ist eine reine Leseprüfung, damit Sie sehen können, was passieren wird, bevor Sie sich festlegen.
:::

## Den Import abschließen

1. Prüfen Sie die Ergebnisse der Vorschau und die Summen der Zusammenfassung.
2. Klicken Sie auf **Fehlende importieren**, um alle als **Neu** markierten Transaktionen zu importieren.
3. Nach Abschluss des Imports aktualisieren sich die Statusabzeichen neben jeder Transaktion und zeigen das Ergebnis.

## Tipps zum Stripe-Import

- Führen Sie den Import regelmäßig aus (wöchentlich oder monatlich), damit Ihre Aufzeichnungen aktuell bleiben.
- Wenn eine Transaktion als **Bereits importiert** angezeigt wird, hat B1 Admin bereits einen passenden Datensatz – Sie müssen nichts tun.
- Nutzen Sie den Datumsfilter, um sich auf einen bestimmten Zeitraum zu konzentrieren, wenn Sie nach bestimmten Transaktionen suchen.

:::tip
Besuchen Sie nach dem Import die Seite [Stapel](batches.md), um zu prüfen, ob die importierten Spenden korrekt erscheinen und die Summen mit Ihrem Stripe-Dashboard übereinstimmen.
:::

## Nächste Schritte

- Prüfen Sie die [Spendenberichte](donation-reports.md), um die importierten Transaktionen zusammen mit Ihren übrigen Spendendaten zu sehen
- Stellen Sie sicher, dass importierte Spenden den richtigen [Fonds](funds.md) zugeordnet sind, damit die [Spendenbescheinigungen](giving-statements.md) stimmen
