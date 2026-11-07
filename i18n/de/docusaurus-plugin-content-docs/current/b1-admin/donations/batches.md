---
title: "Spendenstapel"
description: "Fassen Sie Opfer in B1 Admin zu Spendenstapeln zusammen und schließen, drucken oder exportieren Sie jeden Stapel, damit die Summen mit Ihren Bankeinzahlungen übereinstimmen."
---

# Spendenstapel

<div class="article-intro">

Stapel fassen Ihre Spenden zur einfacheren Nachverfolgung und zum Abgleich zusammen. Ein typischer Stapel steht für eine einzelne Kollekte, etwa das Sonntagsopfer oder eine besondere Veranstaltung. Mit Stapeln bleiben Sie organisiert, und Sie können ganz einfach prüfen, ob Ihre Aufzeichnungen mit den tatsächlichen Einzahlungen übereinstimmen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Stellen Sie sicher, dass Sie Ihre [Fonds eingerichtet](funds.md) haben, damit sie beim Erfassen von Spenden verfügbar sind
- Sie benötigen die Berechtigung **Spendenübersichten anzeigen**, **Spenden bearbeiten** oder **Spenden erfassen**, um die Seite Stapel zu sehen (siehe [Wer einen Stapel ändern kann](#who-can-change-a-batch))

</div>

## Die Seite Stapel

Wenn Sie zu **Spenden > Stapel** wechseln, sehen Sie eine Liste Ihrer Stapel. Jede Zeile zeigt:

- **Name** – die Bezeichnung, die Sie dem Stapel gegeben haben
- **Datum** – das Datum der Kollekte
- **Spenden** – die Anzahl der einzelnen Spenden im Stapel
- **Summe** – der zusammengerechnete Geldbetrag
- **Status** – **Offen** oder **Geschlossen** (siehe [Einen Stapel schließen und wieder öffnen](#closing-and-reopening-a-batch))

Über der Liste zeigen Jahresschaltflächen nur die Stapel eines Jahres oder alle Stapel (**Alle**) an. Eine einzeilige Zusammenfassung zeigt die Anzahl der Stapel, der Gaben und den Gesamtbetrag der angezeigten Stapel.

## Einen neuen Stapel anlegen

1. Klicken Sie oben auf der Seite auf **Stapel hinzufügen**.
2. Geben Sie eine aussagekräftige Bezeichnung ein (z. B. „Sonntagsopfer – 9. Feb.“).
3. Wählen Sie das Datum der Kollekte.
4. Klicken Sie auf **Speichern**.

Ihr neuer Stapel erscheint in der Liste und ist bereit, Spenden aufzunehmen.

## Mit Stapeln arbeiten

- **Spenden ansehen** – Klicken Sie auf den Namen eines Stapels, um ihn zu öffnen und alle darin enthaltenen einzelnen Spenden zu sehen. Von dort aus können Sie Spenden hinzufügen, bearbeiten oder entfernen oder auf **CSV importieren** klicken, um viele Spenden auf einmal aus einer Tabelle hinzuzufügen (siehe [CSV-Datei mit Spenden importieren](recording-donations.md#importing-donations-from-a-csv-file)).
- **Stapeldetails bearbeiten** – Klicken Sie in der Zeile eines Stapels auf die Schaltfläche **Bearbeiten**, um Name oder Datum zu ändern. Nur Personen mit **Spenden bearbeiten** können einen Stapel löschen.
- **Sortieren** – Verwenden Sie die Spaltenüberschriften, um die Stapel nach Name oder Datum zu sortieren.
- **Exportieren** – Klicken Sie oben auf der Seite auf **Exportieren**, um die angezeigten Stapel als Tabelle (CSV) herunterzuladen.
- **Fehlgeschlagene Ereignisse** – Hat Ihr Zahlungsdienst Probleme gemeldet, erscheint oben auf der Seite eine Schaltfläche **Fehlgeschlagene Ereignisse** (mit der Anzahl ungelöster Ereignisse). Klicken Sie darauf, um die Liste der Ereignisse unterhalb der Stapel ein- oder auszublenden.
- **Aus Stripe importieren** – Klicken Sie oben auf der Seite auf **Fehlende Stripe-Transaktionen importieren**, um das Werkzeug [Stripe-Import](stripe-import.md) zu öffnen. Die Schaltfläche erscheint nur, wenn der Zahlungsdienst Ihrer Kirche Stripe ist.

## Wer jede Gabe erfasst hat

Jede Gabe, die in einen Stapel eingetragen wird, zeigt **Erfasst von** und den Namen der Person unter dem Namen des Spenders. So erkennen Sie, wer sie erfasst hat, ganz ohne Unterschriftenliste. B1 erfasst dies automatisch anhand der angemeldeten Person, und ein späteres Bearbeiten der Gabe ändert es nicht. Gaben, die mit **CSV importieren** eingebracht wurden, zeigen die Person, die den Import ausgeführt hat.

Online-Gaben, Gaben, die mit dem Werkzeug [Stripe-Import](stripe-import.md) hinzugefügt wurden, und Gaben, die vor der Ergänzung im November 2026 erfasst wurden, zeigen keinen Namen.

## Einen Stapel schließen und wieder öffnen {#closing-and-reopening-a-batch}

Sobald ein Stapel gezählt und eingezahlt wurde, schließen Sie ihn, damit seine Spenden genau so bleiben, wie sie beim Schließen waren.

1. Öffnen Sie den Stapel.
2. Klicken Sie oben auf der Seite auf **Stapel schließen**.

Der Statuschip neben dem Namen des Stapels wechselt von **Offen** zu **Geschlossen**, der Stapel zeigt **Geschlossen** in der Spalte **Status** auf der Seite Stapel, und ein Hinweis oben im Stapel erklärt, dass er geschlossen ist. Bei geschlossenem Stapel können Personen mit **Spenden erfassen** ihn weiterhin ansehen, aber sie können seine Spenden nicht hinzufügen, bearbeiten oder löschen und auch nicht Name oder Datum des Stapels ändern.

Um wieder Änderungen vorzunehmen, öffnen Sie den Stapel und klicken Sie auf **Stapel wieder öffnen**. Neue Stapel beginnen immer offen.

:::info
Nur Personen mit **Spenden bearbeiten** sehen die Schaltflächen **Stapel schließen** und **Stapel wieder öffnen**. Sie können Spenden in einem geschlossenen Stapel auch dann noch ändern, wenn eine Korrektur nötig ist, ohne den Stapel wieder zu öffnen.
:::

## Wer einen Stapel ändern kann {#who-can-change-a-batch}

Zwei [Rollenberechtigungen](../settings/roles-permissions.md) erlauben es, mit Stapeln zu arbeiten:

- **Spenden bearbeiten** – Vollzugriff: Stapel hinzufügen und löschen, sie schließen und wieder öffnen sowie jede Spende hinzufügen, bearbeiten oder löschen, unabhängig davon, ob der Stapel offen oder geschlossen ist.
- **Spenden erfassen** – für Zählteams und Ehrenamtliche, die Kollekten eintragen. Sie können Stapel hinzufügen sowie Spenden hinzufügen, bearbeiten oder löschen, aber nur, solange der Stapel offen ist. Sie können keine Stapel löschen, sie nicht schließen oder wieder öffnen und keine Gaben ändern, die über Online-Spenden eingegangen sind.

Wer **Spenden erfassen**, aber nicht **Spendenübersichten anzeigen** hat, sieht in der B1-Admin-Navigation **Spenden**, was direkt zur Seite Stapel führt. **Übersicht**, **Fonds**, **Kampagnen** und **Spendenbescheinigungen** bleiben für diese Person ausgeblendet. Um einen Stapel zu öffnen und die darin enthaltenen Spenden zu sehen, braucht die Rolle außerdem **Spenden anzeigen**.

:::tip
Ein üblicher Aufbau ist eine Rolle „Zählteam“ mit **Spenden erfassen** und **Spenden anzeigen** sowie eine Schatzmeisterin oder ein Schatzmeister mit **Spenden bearbeiten**, der jeden Stapel nach dem abgeglichenen Einzahlungsvorgang schließt.
:::

## Einen Stapel drucken

Öffnen Sie einen Stapel und klicken Sie oberhalb der Spendenliste auf **Drucken**, um eine Papierkopie für Ihr Zählteam oder Ihre Einzahlungsunterlagen zu drucken. Der Ausdruck enthält:

- Den Briefkopf Ihrer Kirche – Ihr Logo (das **Logo für helle Hintergründe** aus [Website > Erscheinungsbild](../website/appearance.md), falls Sie eines hochgeladen haben) mit dem Namen Ihrer Kirche darunter – danach den Namen des Stapels und das Datum des Stapels
- Jede Spende im Stapel mit dem Namen des Spenders, der erfassenden Person, der Methode, den Notizen, dem Datum und dem Betrag (erstattete Gaben sind durchgestrichen und als erstattet markiert)
- **Zwischensummen der Fonds** – die Gesamtsumme, die jedem Fonds im Stapel zugeflossen ist
- **Stapelsumme** – der Gesamtbetrag des ganzen Stapels

Die Schaltfläche **Drucken** erscheint erst, wenn der Stapel mindestens eine Spende enthält.

### Mehrere Stapel auf einmal drucken

Um jeden Stapel eines Zeitraums auf einmal zu drucken – zum Beispiel alle Einzahlungen des letzten Monats –, klicken Sie oben auf der Seite **Stapel** neben **Exportieren** auf **Drucken**. Die Seite **Stapel drucken** öffnet sich mit einem **Startdatum** und einem **Enddatum**, die den Stapeln auf dem Bildschirm entsprechen: vom 1. Januar bis zum 31. Dezember des gewählten Jahres oder, wenn **Alle** ausgewählt ist, vom frühesten bis zum spätesten Stapeldatum. Ändern Sie eines der beiden Daten, um einen anderen Zeitraum zu wählen.

Jeder Stapel mit einem Datum im Zeitraum (einschließlich des Start- und Enddatums) wird in Datumsreihenfolge gedruckt, ein Stapel pro Seite, im selben Layout wie der Ausdruck eines einzelnen Stapels. Stapel ohne Spenden werden ausgelassen. Enthält keiner der Stapel im Zeitraum Spenden, sehen Sie die Meldung „Keine Stapel mit Spenden in diesem Zeitraum.“ Klicken Sie auf **Drucken**, um den Druckdialog Ihres Browsers zu öffnen, oder auf **Schließen**, um zur Stapelliste zurückzukehren.

## Einen Stapel nach QuickBooks Online exportieren

Öffnen Sie einen Stapel und klicken Sie auf **Für QuickBooks exportieren**, um den Stapel als Journalbuchung herunterzuladen, die QuickBooks Online importieren kann (**Einstellungen > Daten importieren > Journalbuchungen**). Die Datei enthält eine Soll-Buchung auf **Nicht eingezahlte Gelder** für die Stapelsumme und eine Haben-Buchung pro Fonds, wobei der Name jedes Fonds als Kontoname verwendet wird. QuickBooks bittet Sie beim Import, diese Namen Ihrem Kontenplan zuzuordnen. Benennen Sie Ihre Fonds deshalb so, wie Ihre Buchhaltung die Ertragskonten benennt, oder ordnen Sie sie beim Import einmalig zu.

:::tip
Benennen Sie Ihre Stapel einheitlich, damit sie später leicht zu finden sind. Wenn Sie das Datum und die Art der Kollekte angeben (z. B. „Sonntag vormittags – 2025-02-09“), bleibt Ihre Liste übersichtlich, auch wenn sie wächst.
:::

## Nächste Schritte

Sobald Sie einen Stapel haben, lesen Sie [Spenden erfassen](recording-donations.md), um zu erfahren, wie Sie einzelne Spenden hinzufügen. Sie können außerdem [Stripe-Transaktionen importieren](stripe-import.md), um Stapel automatisch aus Online-Spenden zu erstellen.
