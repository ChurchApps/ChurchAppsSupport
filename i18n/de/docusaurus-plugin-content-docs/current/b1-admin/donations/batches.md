---
title: "Spendenstapel"
description: "Fassen Sie Gaben in Spendenstapeln in B1 Admin zusammen und schließen, drucken oder exportieren Sie jeden Stapel, damit die Summen mit Ihren Bankeinzahlungen übereinstimmen."
---

# Spendenstapel {#donation-batches}

<div class="article-intro">

Stapel fassen Ihre Spenden zur leichteren Nachverfolgung und Abstimmung zusammen. Ein typischer Stapel steht für eine einzelne Kollekte, etwa eine Sonntagskollekte oder eine besondere Veranstaltung. Mit Stapeln behalten Sie den Überblick und können leicht prüfen, ob Ihre Unterlagen mit den tatsächlichen Einzahlungen übereinstimmen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie zuerst Ihre [Fonds](funds.md) ein, damit sie beim Erfassen von Spenden zur Verfügung stehen
- Sie benötigen die Berechtigung **Spendenübersichten anzeigen**, **Spenden bearbeiten** oder **Spenden erfassen**, um die Seite Stapel zu sehen (siehe [Wer einen Stapel ändern kann](#who-can-change-a-batch))

</div>

## Die Seite Stapel {#the-batches-page}

Wenn Sie zu **Spenden > Stapel** navigieren, sehen Sie eine Liste Ihrer Stapel. Jede Zeile zeigt:

- **Name** – die Bezeichnung, die Sie dem Stapel gegeben haben
- **Datum** – das Datum der Kollekte
- **Spenden** – die Anzahl der einzelnen Spenden im Stapel
- **Summe** – der kombinierte Geldbetrag
- **Status** – **Offen** oder **Geschlossen** (siehe [Einen Stapel schließen und wieder öffnen](#closing-and-reopening-a-batch))

Oberhalb der Liste zeigen Jahresschaltflächen nur die Stapel eines Jahres an, oder **Alle** zeigt alle Stapel. Daneben grenzen die Statusschaltflächen **Alle**, **Offen** und **Geschlossen** die Liste auf Stapel ein, an denen noch gearbeitet wird, oder auf abgeschlossene. Beide Filter wirken zusammen: Wählen Sie etwa **2026** und **Offen**, um die offenen Stapel dieses Jahres zu sehen. Eine einzeilige Zusammenfassung zeigt die Anzahl der Stapel, die Anzahl der Gaben und den Gesamtbetrag der angezeigten Stapel.

## Einen neuen Stapel anlegen {#creating-a-new-batch}

1. Klicken Sie oben auf der Seite auf **Stapel hinzufügen**.
2. Geben Sie einen aussagekräftigen Namen ein (z. B. „Sonntagskollekte - 9. Feb“). Der Name ist optional, aber ein klarer Name macht den Stapel später leichter auffindbar.
3. Wählen Sie das Datum der Kollekte aus. Es beginnt mit dem heutigen Datum.
4. Klicken Sie auf **Speichern**.

Ihr neuer Stapel erscheint in der Liste und ist bereit, Spenden aufzunehmen.

## Mit Stapeln arbeiten {#working-with-batches}

- **Spenden anzeigen** – Klicken Sie auf einen Stapelnamen, um ihn zu öffnen und alle darin enthaltenen einzelnen Spenden zu sehen. Von dort aus können Sie Spenden hinzufügen, bearbeiten oder entfernen oder auf **CSV importieren** klicken, um viele Spenden auf einmal aus einer Tabelle hinzuzufügen (siehe [Spenden aus einer CSV-Datei importieren](recording-donations.md#importing-donations-from-a-csv-file)).
- **Stapeldetails bearbeiten** – Klicken Sie in der Zeile eines Stapels auf die Schaltfläche **Bearbeiten** (oder oben in einem geöffneten Stapel auf **Stapel bearbeiten**), um Namen oder Datum zu ändern. Nur Personen mit der Berechtigung **Spenden bearbeiten** sehen dort **Löschen**. Das Löschen eines Stapels entfernt die darin enthaltenen Spenden. Wenn Sie von der Seite des Stapels aus löschen, gelangen Sie zurück zur Liste der Stapel.
- **Sortieren** – Verwenden Sie die Spaltenüberschriften, um Stapel nach Name oder Datum zu sortieren.
- **Exportieren** – Klicken Sie oben auf der Seite auf **Exportieren**, um die angezeigten Stapel als Tabelle (CSV) herunterzuladen.
- **Fehlgeschlagene Ereignisse** – Wenn Ihr Zahlungsanbieter Probleme gemeldet hat, erscheint oben auf der Seite die Schaltfläche **Fehlgeschlagene Ereignisse** (mit der Anzahl ungelöster Ereignisse). Klicken Sie darauf, um die Liste der Ereignisse unter den Stapeln ein- oder auszublenden.
- **Aus Stripe importieren** – Klicken Sie oben auf der Seite auf **Fehlende Stripe-Transaktionen importieren**, um das Werkzeug [Stripe-Import](stripe-import.md) zu öffnen. Die Schaltfläche erscheint nur, wenn das Online-Spendensystem Ihrer Kirche Stripe ist.

## Wer jede Gabe erfasst hat {#who-entered-each-gift}

Jede Gabe, die in einen Stapel eingetragen wird, zeigt unter dem Namen der spendenden Person **Erfasst von** und den Namen der erfassenden Person an. So erkennen Sie, wer sie eingetragen hat, ganz ohne Unterschriftenliste. B1 erfasst dies automatisch anhand der angemeldeten Person. Wenn Sie die Gabe später bearbeiten, ändert sich dies nicht. Gaben, die mit **CSV importieren** eingebracht wurden, zeigen die Person, die den Import durchgeführt hat.

Online-Gaben, Gaben, die mit dem Werkzeug [Stripe-Import](stripe-import.md) hinzugefügt wurden, und Gaben, die vor der Ergänzung dieser Funktion im November 2026 erfasst wurden, zeigen keinen Namen.

## Einen Stapel schließen und wieder öffnen {#closing-and-reopening-a-batch}

Sobald ein Stapel gezählt und eingezahlt wurde, schließen Sie ihn, damit seine Spenden genau so bleiben, wie sie beim Schließen waren.

1. Öffnen Sie den Stapel.
2. Klicken Sie oben auf der Seite auf **Stapel schließen**.

Das Statuskennzeichen neben dem Stapelnamen wechselt von **Offen** zu **Geschlossen**. Der Stapel zeigt in der Spalte **Status** auf der Seite Stapel **Geschlossen** an, und ein Hinweis oben im Stapel erklärt, dass er geschlossen ist. Solange ein Stapel geschlossen ist, können Personen mit **Spenden erfassen** ihn weiterhin ansehen. Sie können jedoch keine Spenden hinzufügen, bearbeiten oder löschen und auch nicht den Namen oder das Datum des Stapels ändern.

Um wieder Änderungen vorzunehmen, öffnen Sie den Stapel und klicken Sie auf **Stapel wieder öffnen**. Neue Stapel beginnen immer als offen.

:::info
Nur Personen mit **Spenden bearbeiten** sehen die Schaltflächen **Stapel schließen** und **Stapel wieder öffnen**. Sie können auch Spenden in einem geschlossenen Stapel ändern, wenn eine Korrektur nötig ist, ohne den Stapel wieder zu öffnen.
:::

## Wer einen Stapel ändern kann {#who-can-change-a-batch}

Zwei [Rollenberechtigungen](../settings/roles-permissions.md) erlauben es, mit Stapeln zu arbeiten:

- **Spenden bearbeiten** – voller Zugriff: Stapel hinzufügen und löschen, sie schließen und wieder öffnen sowie jede Spende hinzufügen, bearbeiten oder löschen, unabhängig davon, ob der Stapel offen oder geschlossen ist.
- **Spenden erfassen** – für Zählteams und Ehrenamtliche, die Gaben erfassen. Sie können Stapel hinzufügen und Spenden hinzufügen, bearbeiten oder löschen, aber nur, solange der Stapel offen ist. Sie können keine Stapel löschen, sie nicht schließen oder wieder öffnen und keine Gaben ändern, die über Online-Spenden eingegangen sind.

Wer **Spenden erfassen**, aber nicht **Spendenübersichten anzeigen** hat, sieht im Menü von B1 Admin **Spenden**, was direkt zur Seite Stapel führt. **Übersicht**, **Fonds**, **Kampagnen** und **Spendenbescheinigungen** bleiben für diese Person ausgeblendet. Um einen Stapel zu öffnen und die darin enthaltenen Spenden zu sehen, benötigt die Rolle außerdem die Berechtigung **Spenden anzeigen**.

:::tip
Ein üblicher Aufbau ist eine Rolle „Zählteam“ mit **Spenden erfassen** und **Spenden anzeigen** sowie eine Schatzmeisterin oder ein Schatzmeister mit **Spenden bearbeiten**, der jeden Stapel nach dem Abgleich der Einzahlung schließt.
:::

## Einen Stapel drucken {#printing-a-batch}

Öffnen Sie einen Stapel und klicken Sie oberhalb der Spendenliste auf **Drucken**, um eine Papierkopie für Ihr Zählteam oder Ihre Einzahlungsbelege zu drucken. Der Ausdruck enthält:

- Den Briefkopf Ihrer Kirche: Ihr Logo (das **Logo für helle Hintergründe** aus [Website > Erscheinungsbild](../website/appearance.md), falls Sie eines hochgeladen haben) mit dem Namen Ihrer Kirche darunter, danach den Stapelnamen und das Stapeldatum
- Jede Spende im Stapel mit dem Namen der spendenden Person, wer sie erfasst hat, Methode, Notizen, Datum und Betrag (zurückerstattete Gaben sind durchgestrichen und als zurückerstattet markiert)
- **Zwischensummen der Fonds** – die Summe, die jedem Fonds im Stapel zugeflossen ist
- **Stapelsumme** – der zusammengerechnete Betrag des gesamten Stapels

Die Schaltfläche **Drucken** erscheint erst, wenn der Stapel mindestens eine Spende enthält.

### Mehrere Stapel auf einmal drucken {#printing-several-batches-at-once}

Um alle Stapel eines Zeitraums auf einmal zu drucken, zum Beispiel alle Einzahlungen des letzten Monats, klicken Sie oben auf der Seite **Stapel** neben **Exportieren** auf **Drucken**. Die Seite **Stapel drucken** öffnet sich mit einem **Startdatum** und einem **Enddatum**, die zu den angezeigten Stapeln passen: 1. Januar bis 31. Dezember des gewählten Jahres oder vom frühesten bis zum spätesten Stapeldatum, wenn **Alle** ausgewählt ist. Ändern Sie eines der Daten, um einen anderen Zeitraum zu wählen.

Jeder Stapel, dessen Datum im Zeitraum liegt (einschließlich Start- und Enddatum), wird in Datumsreihenfolge gedruckt, ein Stapel pro Seite, im selben Layout wie ein einzelner Stapelausdruck. Stapel ohne Spenden werden ausgelassen. Wenn keiner der Stapel im Zeitraum Spenden enthält, erscheint die Meldung „Keine Stapel mit Spenden in diesem Datumsbereich.“. Klicken Sie auf **Drucken**, um den Druckdialog Ihres Browsers zu öffnen, oder auf **Schließen**, um zur Stapelliste zurückzukehren.

## Einen Stapel nach QuickBooks Online exportieren {#exporting-a-batch-to-quickbooks-online}

Öffnen Sie einen Stapel und klicken Sie auf **Für QuickBooks exportieren**, um den Stapel als Journalbuchung herunterzuladen, die QuickBooks Online importieren kann (**Einstellungen > Daten importieren > Journalbuchungen**). Die Datei enthält eine Soll-Buchung auf **Nicht eingezahlte Mittel** für den Gesamtbetrag des Stapels und je eine Haben-Buchung pro Fonds. Dabei wird der Name des Fonds als Kontoname verwendet. QuickBooks bittet Sie beim Import, diese Namen Ihrem Kontenplan zuzuordnen. Benennen Sie Ihre Fonds daher so, wie Ihre Buchhaltung die Ertragskonten benennt, oder ordnen Sie sie beim Import einmalig zu.

:::tip
Benennen Sie Ihre Stapel einheitlich, damit Sie sie später leicht finden. Datum und Kollektenart im Namen (z. B. „Sonntag Vormittag - 2025-02-09“) halten Ihre Liste übersichtlich, wenn sie wächst.
:::

## Nächste Schritte {#next-steps}

Haben Sie einen Stapel angelegt, lesen Sie [Spenden erfassen](recording-donations.md), um zu erfahren, wie Sie einzelne Spenden hinzufügen. Sie können außerdem [Stripe-Transaktionen importieren](stripe-import.md), um Stapel automatisch aus Online-Spenden zu erstellen.
