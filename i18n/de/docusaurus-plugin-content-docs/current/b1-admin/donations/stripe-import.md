---
title: "Stripe-Import"
description: "Übernehmen Sie Stripe-Spenden mit einem vorschaubasierten Import in B1 Admin, der jede Belastung als neu, bereits importiert oder übersprungen markiert, bevor Sie sie bestätigen."
---

# Stripe-Import

<div class="article-intro">

Wenn Sie Online-Spenden über Stripe annehmen, können Sie mit dem Werkzeug Stripe-Import diese Transaktionen in B1 Admin übernehmen, sodass alle Ihre Gebedaten an einem Ort liegen. Das ist besonders nützlich, um Transaktionen aufzuspüren, die nicht automatisch synchronisiert wurden.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Schließen Sie die [Einrichtung der Online-Spenden](online-giving-setup.md) ab, um Ihr Stripe-Konto mit B1 Admin zu verbinden. Der Menüpunkt **Stripe-Import** und die Schaltfläche auf der Seite Stapel erscheinen nur, wenn das Zahlungsgateway Ihrer Kirche Stripe ist, und nur für Personen, die Spenden bearbeiten dürfen
- Prüfen Sie, ob Ihr Stripe-Dashboard Spenden für den Zeitraum enthält, den Sie importieren möchten

</div>

## So funktioniert es {#how-it-works}

Der Import läuft in zwei Schritten ab: Zuerst sehen Sie eine Vorschau, was importiert würde, dann bestätigen Sie den Import. Dieses Vorgehen als Probelauf ermöglicht es Ihnen, alles zu prüfen, bevor Daten angelegt werden.

## Transaktionen importieren {#importing-transactions}

1. Navigieren Sie in **B1 Admin** zu **Spenden > Stripe-Import**. (Alternativ klicken Sie oben auf der Seite **Stapel** auf **Fehlende Stripe-Transaktionen importieren**.)
2. Die Seite **Stripe-Transaktionen importieren** öffnet sich.
3. Legen Sie unter **Zeitraum auswählen** das **Startdatum** und das **Enddatum** für die Transaktionen fest, die Sie importieren möchten. Der Zeitraum beginnt am 1. Januar dieses Jahres und endet heute.
4. Klicken Sie auf **Vorschau**, um eine Probeprüfung auszuführen. **Fehlende importieren** bleibt deaktiviert, bis eine Vorschau neue Transaktionen findet. Wenn Sie eines der Daten ändern, wird die Vorschau gelöscht, sodass Sie zuerst den neuen Zeitraum in der Vorschau prüfen.

## Die Vorschau prüfen {#reviewing-the-preview}

Die Vorschau listet jedes Stripe-Ereignis mit seiner **Ereignis-ID**, dem **Typ**, dem **Betrag**, dem **Datum** und einem **Status** auf:

- **Neu** – diese Transaktion wurde noch nicht importiert und wird eingeschlossen, wenn Sie fortfahren.
- **Bereits importiert** – diese Transaktion existiert bereits in B1 Admin und wird übersprungen.
- **Übersprungen** – diese Transaktion wurde aus einem anderen Grund ausgeschlossen (z. B. eine Erstattung oder eine fehlgeschlagene Belastung).

Eine Zusammenfassung oben zeigt die **Gesamtzahl** der Ereignisse und wie viele davon **Neu**, **Bereits importiert** und **Übersprungen** sind. Konnte ein Ereignis nicht gelesen werden, erscheint eine Anzahl **Fehler**, und die Zeile des Ereignisses zeigt die Meldung in der Spalte **Notizen**.

:::info
Der Vorschau-Schritt legt keine Datensätze an. Er ist eine reine Leseprüfung, damit Sie vor der Übernahme sehen, was passieren wird.
:::

## Den Import abschließen {#completing-the-import}

1. Prüfen Sie die Ergebnisse der Vorschau und die Summen in der Zusammenfassung.
2. Klicken Sie auf **Fehlende importieren**, um alle als **Neu** markierten Transaktionen zu importieren.
3. Nach Abschluss des Imports wird die Liste zu **Importergebnisse**: Jede hinzugefügte Transaktion zeigt **Importiert**, und die Zusammenfassung ergänzt eine Anzahl **Importiert**.

## Tipps zum Stripe-Import {#tips-for-using-stripe-import}

- Führen Sie den Import regelmäßig aus (wöchentlich oder monatlich), damit Ihre Unterlagen aktuell bleiben.
- Wird eine Transaktion als **Bereits importiert** angezeigt, hat B1 Admin bereits einen passenden Datensatz – es ist keine Aktion nötig.
- Nutzen Sie den Datumsfilter, um sich auf einen bestimmten Zeitraum zu konzentrieren, wenn Sie nach bestimmten Transaktionen suchen.

:::tip
Besuchen Sie nach dem Import die Seite [Stapel](batches.md), um zu prüfen, ob die importierten Spenden korrekt erscheinen und die Summen mit dem übereinstimmen, was Sie in Ihrem Stripe-Dashboard sehen.
:::

## Wie es weitergeht {#next-steps}

- Prüfen Sie die [Spendenberichte](donation-reports.md), um die importierten Transaktionen zusammen mit Ihren übrigen Gebedaten zu sehen
- Stellen Sie sicher, dass importierte Spenden den richtigen [Fonds](funds.md) zugeordnet sind, damit die [Spendenbescheinigungen](giving-statements.md) stimmen
