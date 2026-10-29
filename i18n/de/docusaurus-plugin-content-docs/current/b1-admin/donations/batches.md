---
title: "Spendenstapel"
---

# Spendenstapel

<div class="article-intro">

Stapel fassen Ihre Spenden zur einfacheren Nachverfolgung und Abstimmung zusammen. Ein typischer Stapel steht für eine einzelne Kollekte, etwa das Sonntagsopfer oder eine Sonderveranstaltung. Mit Stapeln bleiben Sie organisiert und können leicht prüfen, ob Ihre Aufzeichnungen mit den tatsächlichen Einzahlungen übereinstimmen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Stellen Sie sicher, dass Sie Ihre [Fonds eingerichtet haben](funds.md), damit sie beim Erfassen von Spenden zur Verfügung stehen.
- Sie benötigen die Berechtigung **Spendenübersichten anzeigen**, **Spenden bearbeiten** oder **Spenden erfassen**, um die Seite Stapel zu sehen (siehe [Wer einen Stapel ändern kann](#who-can-change-a-batch)).

</div>

## Die Seite Stapel

Wenn Sie zu **Spenden > Stapel** wechseln, sehen Sie eine Liste Ihrer Stapel. Jede Zeile zeigt:

- **Name** -- die Bezeichnung, die Sie dem Stapel gegeben haben
- **Datum** -- das Datum der Kollekte
- **Spenden** -- die Anzahl der einzelnen Spenden im Stapel
- **Summe** -- der gesamte Geldbetrag
- **Status** -- **Offen** oder **Geschlossen** (siehe [Einen Stapel schließen und wieder öffnen](#closing-and-reopening-a-batch))

Über der Liste zeigen Jahresschaltflächen nur die Stapel eines bestimmten Jahres oder **Alle** Stapel an. Eine einzeilige Zusammenfassung nennt die Anzahl der Stapel, die Anzahl der Gaben und den Gesamtbetrag der angezeigten Stapel.

## Einen neuen Stapel anlegen

1. Klicken Sie oben auf der Seite auf **Stapel hinzufügen**.
2. Geben Sie einen aussagekräftigen Namen ein (z. B. "Sonntagsopfer - 9. Feb.").
3. Wählen Sie das Datum der Kollekte.
4. Klicken Sie auf **Speichern**.

Ihr neuer Stapel erscheint in der Liste und ist bereit, Spenden aufzunehmen.

## Mit Stapeln arbeiten

- **Spenden anzeigen** -- klicken Sie auf den Namen eines Stapels, um ihn zu öffnen und alle darin enthaltenen einzelnen Spenden zu sehen. Von dort aus können Sie Spenden hinzufügen, bearbeiten oder entfernen oder auf **CSV importieren** klicken, um viele Spenden auf einmal aus einer Tabelle hinzuzufügen (siehe [Spenden aus einer CSV-Datei importieren](recording-donations.md#importing-donations-from-a-csv-file)).
- **Stapeldetails bearbeiten** -- klicken Sie in der Zeile eines Stapels auf die Schaltfläche **Bearbeiten**, um Namen oder Datum zu ändern. Nur Personen mit der Berechtigung **Spenden bearbeiten** können einen Stapel löschen.
- **Sortieren** -- verwenden Sie die Spaltenüberschriften, um die Stapel nach Name oder Datum zu sortieren.
- **Exportieren** -- klicken Sie oben auf der Seite auf **Exportieren**, um die angezeigten Stapel als Tabelle (CSV) herunterzuladen.
- **Fehlgeschlagene Ereignisse** -- hat Ihr Zahlungsanbieter Probleme gemeldet, erscheint oben auf der Seite eine Schaltfläche **Fehlgeschlagene Ereignisse** mit der Anzahl ungelöster Ereignisse. Klicken Sie darauf, um die Liste der Ereignisse unter den Stapeln ein- oder auszublenden.
- **Aus Stripe importieren** -- klicken Sie oben auf der Seite auf **Fehlende Stripe-Transaktionen importieren**, um das Werkzeug [Stripe-Import](stripe-import.md) zu öffnen.

## Einen Stapel schließen und wieder öffnen

Sobald ein Stapel gezählt und eingezahlt wurde, schließen Sie ihn, damit seine Spenden genau so bleiben, wie sie beim Schließen waren.

1. Öffnen Sie den Stapel.
2. Klicken Sie oben auf der Seite auf **Stapel schließen**.

Der Statuschip neben dem Stapelnamen wechselt von **Offen** zu **Geschlossen**, der Stapel zeigt in der Spalte **Status** auf der Seite Stapel **Geschlossen** an, und ein Hinweis oben im Stapel erklärt, dass er geschlossen ist. Solange ein Stapel geschlossen ist, können Personen mit **Spenden erfassen** ihn weiterhin ansehen, aber sie können keine Spenden hinzufügen, bearbeiten oder löschen und auch Name oder Datum des Stapels nicht ändern.

Um wieder Änderungen vorzunehmen, öffnen Sie den Stapel und klicken Sie auf **Stapel wieder öffnen**. Neue Stapel beginnen immer als offen.

:::info
Nur Personen mit der Berechtigung **Spenden bearbeiten** sehen die Schaltflächen **Stapel schließen** und **Stapel wieder öffnen**. Sie können Spenden in einem geschlossenen Stapel auch dann noch ändern, wenn eine Korrektur nötig ist, ohne den Stapel wieder zu öffnen.
:::

## Wer einen Stapel ändern kann

Zwei [Rollenberechtigungen](../settings/roles-permissions.md) ermöglichen es, mit Stapeln zu arbeiten:

- **Spenden bearbeiten** -- voller Zugriff: Stapel anlegen und löschen, sie schließen und wieder öffnen sowie jede Spende hinzufügen, bearbeiten oder löschen, unabhängig davon, ob der Stapel offen oder geschlossen ist.
- **Spenden erfassen** -- für Zählteams und Ehrenamtliche, die Kollekten erfassen. Sie können Stapel anlegen und Spenden hinzufügen, bearbeiten oder löschen, aber nur solange der Stapel offen ist. Sie können keine Stapel löschen, sie nicht schließen oder wieder öffnen, und keine Gaben ändern, die über Online-Giving eingegangen sind.

Wer **Spenden erfassen**, aber nicht **Spendenübersichten anzeigen** hat, sieht **Spenden** im Menü von B1 Admin, das direkt zur Seite Stapel führt. **Übersicht**, **Fonds**, **Kampagnen** und **Spendenbescheinigungen** bleiben für diese Person ausgeblendet. Um einen Stapel zu öffnen und die darin enthaltenen Spenden zu sehen, benötigt die Rolle außerdem die Berechtigung **Spenden anzeigen**.

:::tip
Ein gängiges Modell ist eine Rolle "Zählteam" mit **Spenden erfassen** und **Spenden anzeigen** sowie ein Schatzmeister mit **Spenden bearbeiten**, der jeden Stapel nach Abstimmung der Einzahlung schließt.
:::

## Einen Stapel drucken

Öffnen Sie einen Stapel und klicken Sie oberhalb der Spendenliste auf **Drucken**, um eine Papierkopie für Ihr Zählteam oder Ihre Einzahlungsbelege zu drucken. Der Ausdruck enthält:

- Den Briefkopf Ihrer Kirche -- Ihr Logo (das **Logo für helle Hintergründe** aus [Website > Erscheinungsbild](../website/appearance.md), falls Sie eines hochgeladen haben) mit dem Namen Ihrer Kirche darunter -- danach den Stapelnamen und das Stapeldatum
- Jede Spende im Stapel mit Name des Spenders, Zahlungsart, Notizen, Datum und Betrag (erstattete Gaben sind durchgestrichen und als erstattet gekennzeichnet)
- **Zwischensummen der Fonds** -- der Gesamtbetrag, der je Fonds im Stapel gegeben wurde
- **Stapelsumme** -- der Gesamtbetrag des ganzen Stapels

Die Schaltfläche **Drucken** erscheint erst, wenn der Stapel mindestens eine Spende enthält.

### Mehrere Stapel auf einmal drucken

Um alle Stapel eines Zeitraums auf einmal zu drucken -- zum Beispiel alle Einzahlungen des letzten Monats -- klicken Sie oben auf der Seite **Stapel** neben **Exportieren** auf **Drucken**. Die Seite **Stapel drucken** öffnet sich mit einem **Startdatum** und einem **Enddatum**, die den angezeigten Stapeln entsprechen: vom 1. Januar bis 31. Dezember des gewählten Jahres oder, wenn **Alle** ausgewählt ist, vom frühesten bis zum spätesten Stapeldatum. Ändern Sie eines der beiden Daten, um einen anderen Zeitraum zu wählen.

Jeder Stapel mit einem Datum innerhalb des Zeitraums (einschließlich Start- und Enddatum) wird in chronologischer Reihenfolge gedruckt, ein Stapel pro Seite, im selben Layout wie ein einzelner Stapeldruck. Stapel ohne Spenden werden ausgelassen. Enthält keiner der Stapel im Zeitraum Spenden, erscheint die Meldung "Keine Stapel mit Spenden in diesem Datumsbereich." Klicken Sie auf **Drucken**, um den Druckdialog Ihres Browsers zu öffnen, oder auf **Schließen**, um zur Stapelliste zurückzukehren.

## Einen Stapel nach QuickBooks Online exportieren

Öffnen Sie einen Stapel und klicken Sie auf **Für QuickBooks exportieren**, um den Stapel als Journalbuchung herunterzuladen, die QuickBooks Online importieren kann (**Einstellungen > Daten importieren > Journalbuchungen**). Die Datei enthält eine Soll-Buchung auf **Nicht eingezahlte Gelder** in Höhe der Stapelsumme und je Fonds eine Haben-Buchung, wobei der Name des Fonds als Kontenbezeichnung verwendet wird. QuickBooks bittet Sie beim Import, diese Namen Ihrem Kontenrahmen zuzuordnen. Benennen Sie Ihre Fonds daher so, wie Ihr Buchhalter die Ertragskonten benennt, oder ordnen Sie sie beim Import einmalig zu.

:::tip
Benennen Sie Ihre Stapel einheitlich, damit Sie sie später leicht wiederfinden. Mit Datum und Kollektenart (z. B. "Sonntag Vormittag - 2025-02-09") bleibt Ihre Liste auch bei wachsendem Umfang übersichtlich.
:::

## Nächste Schritte

Sobald Sie einen Stapel haben, lesen Sie [Spenden erfassen](recording-donations.md), um zu erfahren, wie Sie einzelne Spenden hinzufügen. Sie können auch [Stripe-Transaktionen importieren](stripe-import.md), um Stapel aus Online-Giving automatisch anzulegen.
