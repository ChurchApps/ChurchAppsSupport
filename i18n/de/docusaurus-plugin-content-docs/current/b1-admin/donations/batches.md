---
title: "Spendenstapel"
---

# Spendenstapel

<div class="article-intro">

Stapel fassen Ihre Spenden zur einfacheren Nachverfolgung und Abstimmung zusammen. Ein typischer Stapel steht für eine einzelne Sammlung, etwa ein Sonntagsopfer oder eine Sammlung bei einer besonderen Veranstaltung. Mit Stapeln behalten Sie den Überblick und können leicht prüfen, ob Ihre Aufzeichnungen mit den tatsächlichen Einzahlungen übereinstimmen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Stellen Sie sicher, dass Sie [Ihre Fonds eingerichtet haben](funds.md), damit sie beim Erfassen von Spenden zur Verfügung stehen
- Sie benötigen die Berechtigung **Spendenübersichten anzeigen**, **Spenden bearbeiten** oder **Spenden erfassen**, um die Seite Stapel zu sehen (siehe [Wer einen Stapel ändern kann](#who-can-change-a-batch))

</div>

## Die Seite Stapel

Wenn Sie zu **Spenden > Stapel** navigieren, sehen Sie eine Liste Ihrer Stapel. Jede Zeile zeigt:

- **Name** – die Bezeichnung, die Sie dem Stapel gegeben haben
- **Datum** – das Datum der Sammlung
- **Spenden** – die Anzahl der einzelnen Spenden im Stapel
- **Summe** – der gesamte Betrag in Euro
- **Status** – **Offen** oder **Geschlossen** (siehe [Stapel schließen und wieder öffnen](#closing-and-reopening-a-batch))

Oberhalb der Liste können Sie über Jahresschaltflächen nur die Stapel eines bestimmten Jahres oder **Alle** Stapel anzeigen. Eine einzeilige Zusammenfassung zeigt die Anzahl der Stapel, die Anzahl der Gaben und den Gesamtbetrag der angezeigten Stapel.

## Einen neuen Stapel erstellen

1. Klicken Sie oben auf der Seite auf **Stapel hinzufügen**.
2. Geben Sie einen aussagekräftigen Namen ein (z. B. „Sonntagsopfer – 9. Feb.“).
3. Wählen Sie das Datum der Sammlung aus.
4. Klicken Sie auf **Speichern**.

Ihr neuer Stapel erscheint in der Liste und ist bereit, dass Sie Spenden hinzufügen.

## Mit Stapeln arbeiten

- **Spenden anzeigen** – klicken Sie auf den Namen eines Stapels, um ihn zu öffnen und alle einzelnen Spenden darin zu sehen. Von dort aus können Sie Spenden hinzufügen, bearbeiten oder entfernen.
- **Stapeldetails bearbeiten** – klicken Sie auf die Schaltfläche **Bearbeiten** in der Zeile eines Stapels, um seinen Namen oder sein Datum zu ändern. Nur Personen mit der Berechtigung **Spenden bearbeiten** können einen Stapel löschen.
- **Sortieren** – verwenden Sie die Spaltenköpfe, um Stapel nach Name oder Datum zu sortieren.
- **Exportieren** – klicken Sie oben auf der Seite auf **Exportieren**, um die angezeigten Stapel als Tabelle (CSV) herunterzuladen.
- **Fehlgeschlagene Ereignisse** – wenn Ihr Zahlungsdienstleister Probleme gemeldet hat, erscheint oben auf der Seite eine Schaltfläche **Fehlgeschlagene Ereignisse** (mit der Anzahl ungelöster Ereignisse). Klicken Sie darauf, um die Liste der Ereignisse unterhalb der Stapel ein- oder auszublenden.
- **Aus Stripe importieren** – klicken Sie oben auf der Seite auf **Fehlende Stripe-Transaktionen importieren**, um das Werkzeug [Stripe-Import](stripe-import.md) zu öffnen.

## Einen Stapel schließen und wieder öffnen {#closing-and-reopening-a-batch}

Sobald ein Stapel gezählt und eingezahlt wurde, schließen Sie ihn, damit seine Spenden genau so bleiben, wie sie beim Schließen waren.

1. Öffnen Sie den Stapel.
2. Klicken Sie oben auf der Seite auf **Stapel schließen**.

Das Statusetikett neben dem Stapelnamen wechselt von **Offen** zu **Geschlossen**. Auf der Seite Stapel zeigt die Spalte **Status** für den Stapel **Geschlossen** an, und oben im Stapel erklärt ein Hinweis, dass er geschlossen ist. Solange ein Stapel geschlossen ist, können Personen mit der Berechtigung **Spenden erfassen** ihn weiterhin einsehen, aber sie können keine Spenden darin hinzufügen, bearbeiten oder löschen und auch nicht den Namen oder das Datum des Stapels ändern.

Um wieder Änderungen vorzunehmen, öffnen Sie den Stapel und klicken Sie auf **Stapel wieder öffnen**. Neue Stapel beginnen immer als offen.

:::info
Nur Personen mit der Berechtigung **Spenden bearbeiten** sehen die Schaltflächen **Stapel schließen** und **Stapel wieder öffnen**. Sie können auch Spenden in einem geschlossenen Stapel ändern, wenn eine Korrektur nötig ist, ohne ihn wieder zu öffnen.
:::

## Wer einen Stapel ändern kann {#who-can-change-a-batch}

Zwei [Rollenberechtigungen](../settings/roles-permissions.md) erlauben es, mit Stapeln zu arbeiten:

- **Spenden bearbeiten** – voller Zugriff: Stapel hinzufügen und löschen, sie schließen und wieder öffnen sowie jede Spende hinzufügen, bearbeiten oder löschen, unabhängig davon, ob der Stapel offen oder geschlossen ist.
- **Spenden erfassen** – für Zählteams und Ehrenamtliche, die Opfergaben erfassen. Sie können Stapel hinzufügen und Spenden hinzufügen, bearbeiten oder löschen, aber nur solange der Stapel offen ist. Sie können keine Stapel löschen, sie nicht schließen oder wieder öffnen und auch keine Gaben ändern, die über Online-Spenden eingegangen sind.

Wer **Spenden erfassen**, aber nicht **Spendenübersichten anzeigen** hat, sieht im B1-Admin-Menü den Eintrag **Spenden**, der direkt zur Seite Stapel führt. **Übersicht**, **Fonds**, **Kampagnen** und **Spendenbescheinigungen** bleiben für diese Person ausgeblendet. Um einen Stapel zu öffnen und die darin enthaltenen Spenden zu sehen, benötigt die Rolle außerdem die Berechtigung **Spenden anzeigen**.

:::tip
Eine übliche Konfiguration ist die Rolle „Zählteam“ mit **Spenden erfassen** und **Spenden anzeigen** sowie ein Schatzmeister mit **Spenden bearbeiten**, der jeden Stapel nach der abgestimmten Einzahlung schließt.
:::

## Einen Stapel drucken

Öffnen Sie einen Stapel und klicken Sie oberhalb der Spendenliste auf **Drucken**, um ein Papierexemplar für Ihr Zählteam oder Ihre Einzahlungsbelege auszudrucken. Der Ausdruck enthält:

- den Namen Ihrer Gemeinde, den Stapelnamen und das Stapeldatum
- jede Spende im Stapel mit Name des Gebers, Zahlungsart, Notizen, Datum und Betrag (erstattete Gaben sind durchgestrichen und als erstattet markiert)
- **Zwischensummen je Fonds** – die Summe, die jedem Fonds im Stapel zugeflossen ist
- **Stapelsumme** – der Gesamtbetrag des gesamten Stapels

Die Schaltfläche **Drucken** erscheint erst, wenn der Stapel mindestens eine Spende enthält.

### Mehrere Stapel auf einmal drucken

Um alle Stapel eines Zeitraums auf einmal zu drucken – zum Beispiel alle Einzahlungen des letzten Monats –, klicken Sie oben auf der Seite **Stapel** neben **Exportieren** auf **Drucken**. Die Seite **Stapel drucken** öffnet sich mit einem **Startdatum** und einem **Enddatum**, die standardmäßig die letzten 30 Tage umfassen. Ändern Sie eines der Daten, um einen anderen Zeitraum auszuwählen.

Jeder Stapel, dessen Datum im Zeitraum liegt (einschließlich Start- und Enddatum), wird in chronologischer Reihenfolge gedruckt, ein Stapel pro Seite, im selben Layout wie ein Einzelausdruck. Stapel ohne Spenden werden ausgelassen. Wenn im Zeitraum kein Stapel Spenden enthält, sehen Sie die Meldung „Keine Stapel mit Spenden in diesem Datumsbereich.“ Klicken Sie auf **Drucken**, um den Druckdialog Ihres Browsers zu öffnen, oder auf **Schließen**, um zur Stapelliste zurückzukehren.

## Einen Stapel nach QuickBooks Online exportieren

Öffnen Sie einen Stapel und klicken Sie auf **Für QuickBooks exportieren**, um den Stapel als Buchungssatz herunterzuladen, den QuickBooks Online importieren kann (**Einstellungen > Daten importieren > Journalbuchungen**). Die Datei enthält eine Soll-Buchung auf **Nicht eingezahlte Gelder** in Höhe der Stapelsumme und eine Haben-Buchung je Fonds, wobei der Name jedes Fonds als Kontobezeichnung verwendet wird. QuickBooks bittet Sie beim Import, diese Namen den Konten Ihres Kontenplans zuzuordnen. Benennen Sie Ihre Fonds daher so, wie Ihre Buchhalterin oder Ihr Buchhalter die Ertragskonten benennt, oder ordnen Sie sie beim Import einmalig zu.

:::tip
Benennen Sie Ihre Stapel einheitlich, damit Sie sie später leicht wiederfinden. Wenn Sie das Datum und die Art der Sammlung angeben (z. B. „Sonntag Vormittag – 2025-02-09“), bleibt Ihre Liste auch bei wachsender Anzahl übersichtlich.
:::

## Nächste Schritte

Sobald Sie einen Stapel haben, lesen Sie [Spenden erfassen](recording-donations.md), um zu erfahren, wie Sie einzelne Spenden hinzufügen. Sie können auch [Stripe-Transaktionen importieren](stripe-import.md), um Stapel aus Online-Spenden automatisch zu erstellen.
