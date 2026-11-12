---
title: "Spendenstapel"
description: "Fassen Sie Kollekten in Spendenstapel in B1 Admin zusammen und schließen, drucken oder exportieren Sie jeden Stapel, damit die Summen mit Ihren Bankeinzahlungen übereinstimmen."
---

# Spendenstapel

<div class="article-intro">

Stapel fassen Ihre Spenden zur einfacheren Nachverfolgung und Abstimmung zusammen. Ein typischer Stapel entspricht einer einzelnen Kollekte, etwa einer Sonntagskollekte oder einer Sonderveranstaltung. Mit Stapeln behalten Sie den Überblick und können leicht prüfen, ob Ihre Aufzeichnungen mit den tatsächlichen Einzahlungen übereinstimmen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Stellen Sie sicher, dass Sie [Ihre Fonds eingerichtet haben](funds.md), damit sie beim Erfassen von Spenden verfügbar sind
- Sie benötigen die Berechtigung **Spendenübersichten anzeigen**, **Spenden bearbeiten** oder **Spenden erfassen**, um die Seite Stapel zu sehen (siehe [Wer einen Stapel ändern kann](#who-can-change-a-batch))

</div>

## Die Seite Stapel {#the-batches-page}

Wenn Sie zu **Spenden > Stapel** navigieren, sehen Sie eine Liste Ihrer Stapel. Jede Zeile zeigt:

- **Name** – die Bezeichnung, die Sie dem Stapel gegeben haben
- **Datum** – das Datum der Kollekte
- **Spenden** – die Anzahl der einzelnen Spenden im Stapel
- **Summe** – der kombinierte Geldbetrag
- **Status** – **Offen** oder **Geschlossen** (siehe [Einen Stapel schließen und wieder öffnen](#closing-and-reopening-a-batch))

Oberhalb der Liste können Sie mit Jahresschaltflächen nur die Stapel eines Jahres oder **Alle** Stapel anzeigen. Eine einzeilige Zusammenfassung zeigt die Anzahl der Stapel, die Anzahl der Gaben und die Gesamtsumme für die angezeigten Stapel.

## Einen neuen Stapel anlegen {#creating-a-new-batch}

1. Klicken Sie oben auf der Seite auf **Stapel hinzufügen**.
2. Geben Sie einen aussagekräftigen Namen ein (z. B. „Sonntagskollekte – 9. Feb.“). Der Name ist optional, aber ein klarer Name erleichtert das spätere Auffinden.
3. Wählen Sie das Datum der Kollekte. Es beginnt mit dem heutigen Datum.
4. Klicken Sie auf **Speichern**.

Ihr neuer Stapel erscheint in der Liste und ist bereit, Spenden aufzunehmen.

## Mit Stapeln arbeiten {#working-with-batches}

- **Spenden ansehen** – Klicken Sie auf einen Stapelnamen, um ihn zu öffnen und alle darin enthaltenen einzelnen Spenden zu sehen. Von dort aus können Sie Spenden hinzufügen, bearbeiten oder entfernen oder auf **CSV importieren** klicken, um viele Spenden auf einmal aus einer Tabelle hinzuzufügen (siehe [Spenden aus einer CSV-Datei importieren](recording-donations.md#importing-donations-from-a-csv-file)).
- **Stapeldetails bearbeiten** – Klicken Sie in der Zeile eines Stapels auf die Schaltfläche **Bearbeiten** (oder oben auf einem geöffneten Stapel auf **Stapel bearbeiten**), um Namen oder Datum zu ändern. Nur Personen mit **Spenden bearbeiten** sehen dort **Löschen**; das Löschen eines Stapels entfernt die darin enthaltenen Spenden. Wenn Sie ihn von der Seite des Stapels selbst aus löschen, kehren Sie zur Liste der Stapel zurück.
- **Sortieren** – Nutzen Sie die Spaltenüberschriften, um Stapel nach Name oder Datum zu sortieren.
- **Exportieren** – Klicken Sie oben auf der Seite auf **Exportieren**, um die angezeigten Stapel als Tabelle (CSV) herunterzuladen.
- **Fehlgeschlagene Ereignisse** – Hat Ihr Zahlungsgateway Probleme gemeldet, erscheint oben auf der Seite eine Schaltfläche **Fehlgeschlagene Ereignisse** (mit der Anzahl ungelöster Ereignisse). Klicken Sie darauf, um die Liste der Ereignisse unter den Stapeln ein- oder auszublenden.
- **Aus Stripe importieren** – Klicken Sie oben auf der Seite auf **Fehlende Stripe-Transaktionen importieren**, um das Werkzeug [Stripe-Import](stripe-import.md) zu öffnen. Die Schaltfläche erscheint nur, wenn das Zahlungsgateway Ihrer Kirche Stripe ist.

## Wer jede Gabe erfasst hat {#who-entered-each-gift}

Jede in einen Stapel eingetragene Gabe zeigt unter dem Namen des Gebers **Erfasst von** und den Namen der Person an. So sehen Sie, wer sie eingetragen hat, ohne ein Unterschriftenblatt. B1 erfasst dies automatisch anhand der angemeldeten Person, und ein späteres Bearbeiten der Gabe ändert es nicht. Gaben, die über **CSV importieren** hinzugefügt wurden, zeigen die Person, die den Import durchgeführt hat.

Online-Gaben, Gaben, die über das Werkzeug [Stripe-Import](stripe-import.md) hinzugefügt wurden, und Gaben, die vor der Ergänzung im November 2026 erfasst wurden, zeigen keinen Namen.

## Einen Stapel schließen und wieder öffnen {#closing-and-reopening-a-batch}

Sobald ein Stapel gezählt und eingezahlt ist, schließen Sie ihn, damit seine Spenden genau so bleiben, wie sie beim Schließen waren.

1. Öffnen Sie den Stapel.
2. Klicken Sie oben auf der Seite auf **Stapel schließen**.

Die Statusmarkierung neben dem Stapelnamen wechselt von **Offen** zu **Geschlossen**, der Stapel zeigt in der Spalte **Status** auf der Seite Stapel **Geschlossen**, und ein Hinweis oben im Stapel erklärt, dass er geschlossen ist. Solange ein Stapel geschlossen ist, können Personen mit **Spenden erfassen** ihn weiterhin ansehen, aber sie können keine Spenden darin hinzufügen, bearbeiten oder löschen und auch Name oder Datum des Stapels nicht ändern.

Um wieder Änderungen vorzunehmen, öffnen Sie den Stapel und klicken Sie auf **Stapel wieder öffnen**. Neue Stapel beginnen immer als offen.

:::info
Nur Personen mit **Spenden bearbeiten** sehen die Schaltflächen **Stapel schließen** und **Stapel wieder öffnen**. Sie können Spenden in einem geschlossenen Stapel auch dann noch ändern, wenn eine Korrektur nötig ist, ohne ihn wieder zu öffnen.
:::

## Wer einen Stapel ändern kann {#who-can-change-a-batch}

Zwei [Rollenberechtigungen](../settings/roles-permissions.md) erlauben es, mit Stapeln zu arbeiten:

- **Spenden bearbeiten** – voller Zugriff: Stapel hinzufügen und löschen, schließen und wieder öffnen sowie jede Spende hinzufügen, bearbeiten oder löschen, unabhängig davon, ob der Stapel offen oder geschlossen ist.
- **Spenden erfassen** – für Zählteams und Ehrenamtliche, die Kollekten eintragen. Sie können Stapel hinzufügen sowie Spenden hinzufügen, bearbeiten oder löschen, aber nur, solange der Stapel offen ist. Sie können Stapel nicht löschen, nicht schließen oder wieder öffnen und keine Gaben ändern, die über Online-Spenden eingegangen sind.

Wer **Spenden erfassen**, aber nicht **Spendenübersichten anzeigen** hat, sieht im Menü von B1 Admin **Spenden**, was direkt zur Seite Stapel führt. **Übersicht**, **Fonds**, **Kampagnen** und **Spendenbescheinigungen** bleiben für diese Personen ausgeblendet. Um einen Stapel zu öffnen und die darin enthaltenen Spenden zu sehen, braucht die Rolle außerdem **Spenden anzeigen**.

:::tip
Ein üblicher Aufbau ist eine Rolle „Zählteam“ mit **Spenden erfassen** und **Spenden anzeigen** sowie ein Schatzmeister mit **Spenden bearbeiten**, der jeden Stapel schließt, nachdem die Einzahlung abgeglichen wurde.
:::

## Einen Stapel drucken {#printing-a-batch}

Öffnen Sie einen Stapel und klicken Sie oberhalb der Spendenliste auf **Drucken**, um eine Papierkopie für Ihr Zählteam oder Ihre Einzahlungsbelege auszudrucken. Der Ausdruck enthält:

- Den Briefkopf Ihrer Kirche – Ihr Logo (das **Logo für helle Hintergründe** aus [Website > Erscheinungsbild](../website/appearance.md), falls Sie eines hochgeladen haben) mit dem Namen Ihrer Kirche darunter – dann den Namen des Stapels und das Datum des Stapels
- Jede Spende im Stapel mit dem Namen des Gebers, der Person, die sie erfasst hat, der Art, den Notizen, dem Datum und dem Betrag (erstattete Gaben sind durchgestrichen und als erstattet gekennzeichnet)
- **Zwischensummen der Fonds** – die Summe, die jedem Fonds im Stapel zugeflossen ist
- **Stapelsumme** – der Gesamtbetrag des ganzen Stapels

Die Schaltfläche **Drucken** erscheint erst, wenn der Stapel mindestens eine Spende enthält.

### Mehrere Stapel auf einmal drucken {#printing-several-batches-at-once}

Um alle Stapel eines Zeitraums auf einmal zu drucken – zum Beispiel alle Einzahlungen des letzten Monats –, klicken Sie oben auf der Seite **Stapel** neben **Exportieren** auf **Drucken**. Die Seite **Stapel drucken** öffnet sich mit einem **Startdatum** und einem **Enddatum**, die zu den angezeigten Stapeln passen: 1. Januar bis 31. Dezember des gewählten Jahres oder vom frühesten bis zum spätesten Stapeldatum, wenn **Alle** ausgewählt ist. Ändern Sie eines der Daten, um einen anderen Zeitraum zu wählen.

Jeder Stapel mit einem Datum im Zeitraum (einschließlich Start- und Enddatum) wird in Datumsreihenfolge gedruckt, ein Stapel pro Seite, im selben Layout wie ein einzelner Stapeldruck. Stapel ohne Spenden werden weggelassen; wenn keiner der Stapel im Zeitraum Spenden enthält, sehen Sie die Meldung „Keine Stapel mit Spenden in diesem Datumsbereich.“. Klicken Sie auf **Drucken**, um den Druckdialog Ihres Browsers zu öffnen, oder auf **Schließen**, um zur Liste der Stapel zurückzukehren.

## Einen Stapel nach QuickBooks Online exportieren {#exporting-a-batch-to-quickbooks-online}

Öffnen Sie einen Stapel und klicken Sie auf **Für QuickBooks exportieren**, um den Stapel als Journalbuchung herunterzuladen, die QuickBooks Online importieren kann (**Einstellungen > Daten importieren > Journalbuchungen**). Die Datei enthält eine Soll-Buchung auf **Nicht eingezahlte Mittel** für die Stapelsumme und eine Haben-Buchung pro Fonds, wobei der Name jedes Fonds als Kontenname verwendet wird. QuickBooks bittet Sie beim Import, diese Namen Ihrem Kontenplan zuzuordnen. Benennen Sie Ihre Fonds daher so, wie Ihr Buchhalter die Ertragskonten benennt, oder ordnen Sie sie beim Import einmalig zu.

:::tip
Benennen Sie Ihre Stapel einheitlich, damit Sie sie später leicht finden. Wenn Sie Datum und Kollektenart angeben (z. B. „Sonntag vormittags – 2025-02-09“), bleibt Ihre Liste auch bei wachsender Anzahl übersichtlich.
:::

## Nächste Schritte {#next-steps}

Sobald Sie einen Stapel haben, lesen Sie [Spenden erfassen](recording-donations.md), um zu erfahren, wie Sie einzelne Spenden hinzufügen. Sie können außerdem [Stripe-Transaktionen importieren](stripe-import.md), um Stapel automatisch aus Online-Spenden zu erstellen.
