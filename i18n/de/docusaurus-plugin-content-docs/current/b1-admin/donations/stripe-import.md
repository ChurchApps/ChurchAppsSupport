---
title: "Stripe-Import"
---

# Stripe-Import

<div class="article-intro">

Wenn Sie Online-Spenden über Stripe akzeptieren, können Sie mit dem Stripe-Import-Werkzeug diese Transaktionen in B1 Admin übernehmen, damit alle Ihre Spendendaten an einem Ort sind. Dies ist besonders nützlich, um Transaktionen zu erfassen, die nicht automatisch synchronisiert wurden.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Schließen Sie die [Online-Spenden-Einrichtung](online-giving-setup.md) ab, um Ihr Stripe-Konto mit B1 Admin zu verbinden
- Überprüfen Sie, ob Sie Spenden in Ihrem Stripe-Dashboard für den Zeitraum haben, den Sie importieren möchten

</div>

## So funktioniert es

Der Importvorgang verwendet einen zweistufigen Arbeitsablauf: Zuerst sehen Sie eine Vorschau dessen, was importiert würde, dann bestätigen Sie den Import. Dieser Probelauf-Ansatz ermöglicht es Ihnen, alles zu überprüfen, bevor Daten erstellt werden.

## Transaktionen importieren

1. Navigieren Sie in **B1 Admin** zu **Spenden > Stapel**.
2. Klicken Sie auf den Link **Stripe-Import** am unteren Rand der Stapelseite.
3. Wählen Sie einen **Zeitraum** für die Transaktionen, die Sie importieren möchten.
4. Klicken Sie auf **Vorschau**, um einen Probelauf durchzuführen.

## Die Vorschau überprüfen

Die Vorschau zeigt jede Transaktion aus Stripe zusammen mit einem Statusindikator:

- **Neu** -- diese Transaktion wurde noch nicht importiert und wird bei Fortfahren einbezogen.
- **Bereits importiert** -- diese Transaktion existiert bereits in B1 Admin und wird übersprungen.
- **Übersprungen** -- diese Transaktion wurde aus einem anderen Grund ausgeschlossen (z. B. eine Erstattung oder fehlgeschlagene Abbuchung).

Ein Zusammenfassungsbereich oben zeigt die Gesamtzahl der Transaktionen in jeder Kategorie und die betroffenen Beträge.

:::info
Der Vorschauschritt erstellt keine Einträge. Es ist eine reine Leseprüfung, damit Sie überprüfen können, was passieren wird, bevor Sie bestätigen.
:::

## Den Import abschließen

1. Überprüfen Sie die Vorschauergebnisse und die Zusammenfassungssummen.
2. Klicken Sie auf **Fehlende importieren**, um alle als **Neu** markierten Transaktionen zu importieren.
3. Nach Abschluss des Imports werden die Statusanzeigen neben jeder Transaktion aktualisiert, um das Ergebnis anzuzeigen.

## Tipps zur Nutzung des Stripe-Imports

- Führen Sie den Import regelmäßig (wöchentlich oder monatlich) durch, um Ihre Aufzeichnungen aktuell zu halten.
- Wenn eine Transaktion als **Bereits importiert** angezeigt wird, bedeutet dies, dass B1 Admin bereits einen passenden Eintrag hat -- es ist keine Aktion erforderlich.
- Verwenden Sie den Zeitraumfilter, um sich auf einen bestimmten Zeitraum zu konzentrieren, wenn Sie nach bestimmten Transaktionen suchen.

:::tip
Besuchen Sie nach dem Import die Seite [Stapel](batches.md), um zu überprüfen, ob die importierten Spenden korrekt angezeigt werden und die Summen mit Ihrem Stripe-Dashboard übereinstimmen.
:::

## Nächste Schritte

- Überprüfen Sie die [Spendenberichte](donation-reports.md), um die importierten Transaktionen neben Ihren anderen Spendendaten zu sehen
- Stellen Sie sicher, dass importierte Spenden den richtigen [Fonds](funds.md) zugewiesen sind, für genaue [Spendenbescheinigungen](giving-statements.md)
