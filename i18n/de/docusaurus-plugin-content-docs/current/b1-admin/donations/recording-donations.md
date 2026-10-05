---
title: "Spenden aufzeichnen"
---

# Spenden aufzeichnen

<div class="article-intro">

Das Aufzeichnen von Spenden in B1 Admin erfolgt über das Batches-System. Sie erstellen einen Batch, um eine Sammlung (z. B. ein Sonntagsopfer) darzustellen, und fügen dann einzelne Spenden zu diesem Batch hinzu. Dies hält Ihre Spendendatensätze organisiert und leicht zu reconcilieren.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie Ihre [Fonds](funds.md) ein, damit Sie Spenden den richtigen Kategorien zuordnen können
- Erstellen Sie einen [Batch](batches.md), um die Spenden zu halten, die Sie gerade eingeben
- Stellen Sie sicher, dass die Spender in Ihrem [Personenverzeichnis](../people/adding-people.md) sind, damit Sie sie beim Eingeben von Gaben nachschlagen können

</div>

## Erstellen eines Batch und Hinzufügen von Spenden

1. Öffnen Sie in **B1 Admin** das [Jump-Menü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), erweitern Sie **Donations** (Spenden) und klicken Sie auf **Batches**.
2. Klicken Sie auf **Add Batch** (Batch hinzufügen).
3. Geben Sie einen Namen für den Batch ein (z. B. "Sonntagsopfer - 5. Jan") und wählen Sie das Datum. Klicken Sie auf **Save** (Speichern).
4. Ihr neuer Batch wird in der Liste mit null Spenden und 0,00 USD angezeigt.
5. Klicken Sie auf den **Batch-Namen**, um ihn zu öffnen.

## Eingeben einzelner Spenden

1. Geben Sie auf der Batch-Detailseite den Namen des Spenders in das **Suchfeld** ein, um ihn zu finden.
2. Nachdem Sie eine Person ausgewählt haben, wird das Spendeneingabeformular mit Feldern für **Date** (Datum), **Payment Method** (Zahlungsmethode), **Fund** (Fonds), **Amount** (Betrag) und **Check Number** (Schecknummer) angezeigt.
3. Füllen Sie die Details aus und klicken Sie auf **Add Donation** (Spende hinzufügen).
4. Die Spende wird der Tabelle unten hinzugefügt, und das Formular wird zurückgesetzt, sodass Sie die nächste eingeben können.

:::tip
Sie können schnell mehrere Spenden hintereinander eingeben, ohne die Batch-Seite zu verlassen. Das Formular wird nach jeder Eingabe zurückgesetzt, sodass Sie effizient durch einen Stapel von Schecks oder Umschlägen gehen können.
:::

## Aufteilen einer Spende auf mehrere Fonds

Manchmal gibt ein einzelner Spender in einer Transaktion an mehr als einen Fonds. Gehen Sie so vor:

1. Klicken Sie auf die Schaltfläche **Edit** (Bearbeiten) in der Spendenzeile.
2. Fügen Sie im Bearbeitungsformular Beträge zu verschiedenen Fonds hinzu. Die Gesamtsumme wird automatisch aus den einzelnen Fonds-Beträgen berechnet.
3. Klicken Sie auf **Save** (Speichern), um die Spende zu aktualisieren.

:::info
Das Aufteilen von Spenden über Fonds ist üblich, wenn ein Spender einen einzelnen Scheck ausstellt, der für mehrere Zwecke bestimmt ist, z. B. Allgemeiner Fonds und Missionen.
:::

## Bearbeiten oder Entfernen von Spenden

Um eine Spende zu bearbeiten, klicken Sie auf die Schaltfläche **Edit** (Bearbeiten) in ihrer Zeile im Batch. Sie können das Datum, den Betrag, den Fonds, die Zahlungsmethode oder ein anderes Detail ändern. Klicken Sie auf **Save** (Speichern), wenn Sie fertig sind.

:::tip
Die Kopfzeile der Batch-Seite wird automatisch aktualisiert, um die Gesamtzahl der Spenden und den kombinierten Dollarbetrag anzuzeigen, während Sie Einträge hinzufügen oder bearbeiten. Verwenden Sie dies, um gegen Ihren Einzahlungsschein zu reconcilieren.
:::

## Rückerstattung einer Spende

Wenn ein Spender versehentlich belastet wurde oder sein Geld zurück verlangt, können Sie eine abgeschlossene Spende direkt vom Bearbeitungsbildschirm aus erstatten – es ist nicht erforderlich, zum Dashboard Ihres Zahlungs-Gateways zu gehen.

1. Öffnen Sie die Spende und klicken Sie auf **Edit** (Bearbeiten).
2. Klicken Sie auf die Schaltfläche **Refund** (Rückerstattung) neben Löschen am unteren Rand des Formulars.
3. Bestätigen Sie den Dialog: "Diese Spende vollständig über das Zahlungs-Gateway erstatten? Dies kann nicht rückgängig gemacht werden."

Die Spende wird vollständig über das ursprüngliche Zahlungs-Gateway erstattet und in Ihren Spendenlisten als **Refunded** (Erstattet) markiert.

:::warning
Rückerstattungen sind nur vollständige Rückerstattungen – es gibt keine Möglichkeit, einen teilweisen Betrag von B1 Admin aus zu erstatten. Die Rückerstattung kann auch nicht rückgängig gemacht werden, sobald sie bestätigt wurde.
:::

:::info
Die Schaltfläche **Refund** (Rückerstattung) wird nur für Spenden angezeigt, die online bezahlt wurden (sie haben eine Gateway-Transaktion) und noch den Status **Complete** (Abgeschlossen) haben. Manuell eingegebene Spenden (Bargeld, Scheck) haben keine Gateway-Transaktion zu erstatten – bearbeiten oder löschen Sie diese stattdessen.
:::

## Nächste Schritte

- Überprüfen Sie Ihre Einträge mit [Donation Reports](donation-reports.md) (Spendenberichte), um die Genauigkeit zu überprüfen
- Generieren Sie am Jahresende [Giving Statements](giving-statements.md) für Ihre Spender
