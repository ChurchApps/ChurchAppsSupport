---
title: "Spendenbündel"
---

# Spendenbündel

<div class="article-intro">

Bündel fassen Ihre Spenden zusammen, um die Verfolgung und Abstimmung zu erleichtern. Ein typisches Bündel stellt eine einzelne Sammlung dar, z.B. ein Sonntagsopfer oder ein Spezialereignis. Die Verwendung von Bündeln hilft Ihnen, organisiert zu bleiben und macht es einfach zu überprüfen, dass Ihre Aufzeichnungen mit den tatsächlichen Einzahlungen übereinstimmen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Stellen Sie sicher, dass Sie Ihre [Fonds](funds.md) eingerichtet haben, damit sie bei der Spendeneintragung verfügbar sind
- Sie benötigen Zugriff auf den Bereich **Spenden** in B1 Admin

</div>

## Die Seite Bündel

Wenn Sie zu **Spenden > Bündel** navigieren, sehen Sie eine Liste Ihrer Bündel. Jede Reihe zeigt:

- **Name** -- das Label, das Sie dem Bündel gegeben haben
- **Datum** -- das Datum der Sammlung
- **Spenden** -- die Anzahl der einzelnen Spenden im Bündel
- **Gesamt** -- der kombinierte Dollarbetrag

Oberhalb der Liste können Sie über Jahresschaltflächen nur die Bündel eines Jahres oder **Alle** Bündel anzeigen. Eine einzeilige Zusammenfassung zeigt die Anzahl der Bündel, die Anzahl der Spenden und den Gesamtbetrag der angezeigten Bündel.

## Neues Bündel erstellen

1. Klicken Sie oben auf der Seite auf **Bündel hinzufügen**.
2. Geben Sie einen beschreibenden Namen ein (z.B. „Sonntagsopfer - 9. Feb.").
3. Wählen Sie das Datum der Sammlung.
4. Klicken Sie auf **Speichern**.

Ihr neues Bündel wird in der Liste angezeigt und ist bereit, dass Sie Spenden hinzufügen.

## Mit Bündeln arbeiten

- **Spenden anzeigen** -- klicken Sie auf einen Bündelnamen, um ihn zu öffnen und alle darin enthaltenen einzelnen Spenden zu sehen. Von dort aus können Sie Spenden hinzufügen, bearbeiten oder entfernen.
- **Bündeldetails bearbeiten** -- klicken Sie auf die Schaltfläche **Bearbeiten** auf einer Bündelreihe, um seinen Namen oder Datum zu ändern.
- **Sortieren** -- verwenden Sie die Spaltenköpfe, um Bündel nach Name oder Datum zu sortieren.
- **Exportieren** -- klicken Sie oben auf der Seite auf **Exportieren**, um die angezeigten Bündel als Tabelle (CSV) herunterzuladen.
- **Fehlgeschlagene Ereignisse** -- wenn Ihr Zahlungsanbieter Probleme gemeldet hat, erscheint oben auf der Seite eine Schaltfläche **Fehlgeschlagene Ereignisse** (mit der Anzahl ungelöster Ereignisse). Klicken Sie darauf, um die Liste der Ereignisse unter den Bündeln ein- oder auszublenden.
- **Aus Stripe importieren** -- klicken Sie oben auf der Seite auf **Fehlende Stripe-Transaktionen importieren**, um das Werkzeug [Stripe-Import](stripe-import.md) zu öffnen.

## Bündel drucken

Öffnen Sie ein Bündel und klicken Sie oberhalb der Spendenliste auf **Drucken**, um eine Papierkopie für Ihr Zählteam oder Einzahlungsunterlagen zu drucken. Der Ausdruck enthält:

- Den Namen Ihrer Kirche, den Bündelnamen und das Bündeldatum
- Jede Spende im Bündel mit dem Namen des Spenders, Methode, Notizen, Datum und Betrag (rückgängig gemachte Geschenke sind durchgestrichen und als rückgängig gemacht gekennzeichnet)
- **Fonds-Zwischensummen** -- der Gesamtbetrag, der jedem Fonds im Bündel gegeben wurde
- **Bündel-Gesamt** -- der kombinierte Betrag für das ganze Bündel

Die Schaltfläche **Drucken** wird erst angezeigt, nachdem das Bündel mindestens eine Spende hat.

### Mehrere Bündel auf einmal drucken

Um alle Bündel eines Zeitraums in einem Durchgang zu drucken – zum Beispiel alle Einzahlungen des letzten Monats – klicken Sie oben auf der Seite **Bündel** neben **Exportieren** auf **Drucken**. Die Seite **Bündel drucken** öffnet sich mit einem **Startdatum** und einem **Enddatum**, die standardmäßig auf die letzten 30 Tage eingestellt sind. Ändern Sie eines der beiden Daten, um einen anderen Zeitraum auszuwählen.

Jedes Bündel, dessen Datum im Zeitraum liegt (einschließlich Start- und Enddatum), wird in Datumsreihenfolge gedruckt, ein Bündel pro Seite, im gleichen Layout wie der Ausdruck eines einzelnen Bündels. Bündel ohne Spenden werden ausgelassen, und wenn keines der Bündel im Zeitraum Spenden enthält, sehen Sie „Keine Bündel mit Spenden in diesem Zeitraum.“ Klicken Sie auf **Drucken**, um den Druckdialog Ihres Browsers zu öffnen, oder auf **Schließen**, um zur Bündelliste zurückzukehren.

## Bündel nach QuickBooks Online exportieren

Öffnen Sie ein Bündel und klicken Sie auf **Für QuickBooks exportieren**, um das Bündel als Journaleintrag herunterzuladen, den QuickBooks Online importieren kann (**Einstellungen > Daten importieren > Journaleinträge**). Die Datei enthält eine Belastung auf **Nicht eingezahlte Mittel** für das Bündel-Gesamt und einen Kredit pro Fonds, wobei jeder Fondsname als Kontoname verwendet wird. QuickBooks bittet Sie, diese Namen während des Imports mit Ihrem Kontenplan abzugleichen, also benennen Sie Ihre Fonds so, wie Ihr Buchhalter die Einnahmekonten benennt, oder ordnen Sie sie einmal beim Import zu.

:::tip
Nennen Sie Ihre Bündel konsistent, damit sie später leicht zu finden sind. Das Einbeziehen des Datums und des Sammlungstyps (z.B. „Sonntag AM - 2025-02-09") hält Ihre Liste organisiert, während sie wächst.
:::

## Nächste Schritte

Sobald Sie ein Bündel haben, siehe [Spenden eintragen](recording-donations.md), um zu erfahren, wie Sie einzelne Spenden hinzufügen. Sie können auch [Stripe-Transaktionen importieren](stripe-import.md), um automatisch Bündel aus Online-Geben zu erstellen.
