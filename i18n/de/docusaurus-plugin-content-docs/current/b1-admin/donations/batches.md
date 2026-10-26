---
title: "Spendenstapel"
---

# Spendenstapel

<div class="article-intro">

Stapel fassen Ihre Spenden für einfachere Nachverfolgung und Abstimmung zusammen. Ein typischer Stapel steht für eine einzelne Kollekte, etwa das Sonntagsopfer oder eine besondere Veranstaltung. Mit Stapeln bleiben Sie organisiert, und Sie können einfach prüfen, ob Ihre Unterlagen mit den tatsächlichen Einzahlungen übereinstimmen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Stellen Sie sicher, dass Sie Ihre [Fonds eingerichtet](funds.md) haben, damit sie beim Erfassen von Spenden verfügbar sind.
- Sie benötigen die Berechtigung **Spendenübersichten anzeigen**, **Spenden bearbeiten** oder **Spenden erfassen**, um die Seite Stapel zu sehen (siehe [Wer einen Stapel ändern kann](#who-can-change-a-batch)).

</div>

## Die Seite Stapel

Wenn Sie zu **Spenden > Stapel** navigieren, sehen Sie eine Liste Ihrer Stapel. Jede Zeile zeigt:

- **Name** -- die Bezeichnung, die Sie dem Stapel gegeben haben
- **Datum** -- das Datum der Kollekte
- **Spenden** -- die Anzahl der einzelnen Spenden im Stapel
- **Summe** -- der Gesamtbetrag in Euro bzw. Ihrer Währung
- **Status** -- **Offen** oder **Geschlossen** (siehe [Stapel schließen und wieder öffnen](#closing-and-reopening-a-batch))

Oberhalb der Liste zeigen Jahresschaltflächen nur die Stapel eines bestimmten Jahres oder **Alle** Stapel an. Eine einzeilige Zusammenfassung zeigt die Anzahl der Stapel, die Anzahl der Gaben und die Gesamtsumme für die angezeigten Stapel.

## Einen neuen Stapel anlegen

1. Klicken Sie oben auf der Seite auf **Stapel hinzufügen**.
2. Geben Sie einen aussagekräftigen Namen ein (z. B. "Sonntagsopfer - 9. Feb.").
3. Wählen Sie das Datum der Kollekte aus.
4. Klicken Sie auf **Speichern**.

Ihr neuer Stapel erscheint in der Liste und ist bereit, Spenden aufzunehmen.

## Mit Stapeln arbeiten

- **Spenden ansehen** -- Klicken Sie auf den Namen eines Stapels, um ihn zu öffnen und alle darin enthaltenen einzelnen Spenden zu sehen. Von dort aus können Sie Spenden hinzufügen, bearbeiten oder entfernen oder auf **CSV importieren** klicken, um viele Spenden auf einmal aus einer Tabelle hinzuzufügen (siehe [CSV-Datei mit Spenden importieren](recording-donations.md#importing-donations-from-a-csv-file)).
- **Stapeldetails bearbeiten** -- Klicken Sie in der Zeile eines Stapels auf die Schaltfläche **Bearbeiten**, um Namen oder Datum zu ändern. Nur Personen mit der Berechtigung **Spenden bearbeiten** können einen Stapel löschen.
- **Sortieren** -- Verwenden Sie die Spaltenüberschriften, um Stapel nach Name oder Datum zu sortieren.
- **Exportieren** -- Klicken Sie oben auf der Seite auf **Exportieren**, um die angezeigten Stapel als Tabelle (CSV) herunterzuladen.
- **Fehlgeschlagene Vorgänge** -- Hat Ihr Zahlungsdienstleister Probleme gemeldet, erscheint oben auf der Seite die Schaltfläche **Fehlgeschlagene Vorgänge** (mit der Anzahl offener Vorgänge). Klicken Sie darauf, um die Liste der Vorgänge unterhalb der Stapel ein- oder auszublenden.
- **Aus Stripe importieren** -- Klicken Sie oben auf der Seite auf **Fehlende Stripe-Transaktionen importieren**, um das Werkzeug [Stripe-Import](stripe-import.md) zu öffnen.

## Stapel schließen und wieder öffnen

Sobald ein Stapel gezählt und eingezahlt wurde, schließen Sie ihn, damit seine Spenden genau so bleiben, wie sie beim Schließen waren.

1. Öffnen Sie den Stapel.
2. Klicken Sie oben auf der Seite auf **Stapel schließen**.

Der Statusbadge neben dem Stapelnamen wechselt von **Offen** zu **Geschlossen**, der Stapel zeigt in der Spalte **Status** auf der Seite Stapel **Geschlossen**, und ein Hinweis oben im Stapel erklärt, dass er geschlossen ist. Solange ein Stapel geschlossen ist, können Personen mit der Berechtigung **Spenden erfassen** ihn weiterhin ansehen, aber sie können keine Spenden hinzufügen, bearbeiten oder löschen und auch nicht den Namen oder das Datum des Stapels ändern.

Um wieder Änderungen vorzunehmen, öffnen Sie den Stapel und klicken Sie auf **Stapel wieder öffnen**. Neue Stapel sind immer zunächst offen.

:::info
Nur Personen mit der Berechtigung **Spenden bearbeiten** sehen die Schaltflächen **Stapel schließen** und **Stapel wieder öffnen**. Sie können Spenden in einem geschlossenen Stapel auch dann noch ändern, wenn eine Korrektur nötig ist, ohne den Stapel wieder zu öffnen.
:::

## Wer einen Stapel ändern kann

Zwei [Rollenberechtigungen](../settings/roles-permissions.md) erlauben es, mit Stapeln zu arbeiten:

- **Spenden bearbeiten** -- Voller Zugriff: Stapel anlegen und löschen, sie schließen und wieder öffnen sowie jede Spende hinzufügen, bearbeiten oder löschen, unabhängig davon, ob der Stapel offen oder geschlossen ist.
- **Spenden erfassen** -- Für Zählteams und Ehrenamtliche, die Kollekten erfassen. Sie können Stapel anlegen und Spenden hinzufügen, bearbeiten oder löschen, aber nur, solange der Stapel offen ist. Sie können keine Stapel löschen, sie nicht schließen oder wieder öffnen und keine Gaben ändern, die über Online-Giving eingegangen sind.

Wer die Berechtigung **Spenden erfassen**, aber nicht **Spendenübersichten anzeigen** hat, sieht in der Menüleiste von B1 Admin den Eintrag **Spenden**, der direkt zur Seite Stapel führt. **Übersicht**, **Fonds**, **Kampagnen** und **Spendenbescheinigungen** bleiben für diese Rolle ausgeblendet. Um einen Stapel zu öffnen und die Spenden darin zu sehen, benötigt die Rolle außerdem die Berechtigung **Spenden anzeigen**.

:::tip
Eine übliche Konfiguration ist eine Rolle "Zählteam" mit **Spenden erfassen** und **Spenden anzeigen** sowie ein Schatzmeister mit **Spenden bearbeiten**, der jeden Stapel nach der abgestimmten Einzahlung schließt.
:::

## Einen Stapel drucken

Öffnen Sie einen Stapel und klicken Sie oberhalb der Spendenliste auf **Drucken**, um eine Papierkopie für Ihr Zählteam oder Ihre Einzahlungsunterlagen zu drucken. Der Ausdruck enthält:

- Den Namen Ihrer Kirche, den Stapelnamen und das Stapeldatum
- Jede Spende im Stapel mit dem Namen des Gebers, der Art, Notizen, Datum und Betrag (zurückerstattete Gaben sind durchgestrichen und als erstattet gekennzeichnet)
- **Fondszwischensummen** -- die Summe, die jedem Fonds im Stapel zugeflossen ist
- **Stapelsumme** -- der Gesamtbetrag des ganzen Stapels

Die Schaltfläche **Drucken** erscheint erst, wenn der Stapel mindestens eine Spende enthält.

### Mehrere Stapel auf einmal drucken

Um alle Stapel eines Zeitraums auf einmal zu drucken -- zum Beispiel alle Einzahlungen des letzten Monats -- klicken Sie oben auf der Seite **Stapel** neben **Exportieren** auf **Drucken**. Die Seite **Stapel drucken** öffnet sich mit einem **Startdatum** und einem **Enddatum**, die standardmäßig die letzten 30 Tage umfassen. Ändern Sie eines der Daten, um einen anderen Zeitraum zu wählen.

Jeder Stapel, dessen Datum im Zeitraum liegt (einschließlich Start- und Enddatum), wird in chronologischer Reihenfolge gedruckt, ein Stapel pro Seite, im selben Layout wie beim Ausdruck eines einzelnen Stapels. Stapel ohne Spenden werden weggelassen. Enthält kein Stapel im Zeitraum Spenden, sehen Sie die Meldung "Keine Stapel mit Spenden in diesem Datumsbereich." Klicken Sie auf **Drucken**, um den Druckdialog Ihres Browsers zu öffnen, oder auf **Schließen**, um zur Stapelliste zurückzukehren.

## Einen Stapel nach QuickBooks Online exportieren

Öffnen Sie einen Stapel und klicken Sie auf **Für QuickBooks exportieren**, um den Stapel als Journalbuchung herunterzuladen, die QuickBooks Online importieren kann (**Einstellungen > Daten importieren > Journalbuchungen**). Die Datei enthält eine Soll-Buchung auf **Nicht eingezahlte Gelder** in Höhe der Stapelsumme und eine Haben-Buchung pro Fonds, wobei der Name jedes Fonds als Kontobezeichnung verwendet wird. QuickBooks bittet Sie beim Import, diese Namen den Konten in Ihrem Kontenplan zuzuordnen. Benennen Sie Ihre Fonds deshalb so, wie Ihre Buchhaltung die Ertragskonten benennt, oder ordnen Sie sie beim Import einmalig zu.

:::tip
Benennen Sie Ihre Stapel einheitlich, damit Sie sie später leicht wiederfinden. Wenn Sie Datum und Kollektenart einfügen (z. B. "Sonntag vormittags - 2025-02-09"), bleibt Ihre Liste auch bei wachsender Anzahl übersichtlich.
:::

## Nächste Schritte

Sobald Sie einen Stapel haben, lesen Sie [Spenden erfassen](recording-donations.md), um zu erfahren, wie Sie einzelne Spenden hinzufügen. Sie können auch [Stripe-Transaktionen importieren](stripe-import.md), um Stapel aus Online-Giving automatisch anzulegen.
