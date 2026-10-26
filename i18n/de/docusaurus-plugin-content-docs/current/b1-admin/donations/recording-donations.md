---
title: "Spenden erfassen"
---

# Spenden erfassen

<div class="article-intro">

Das Erfassen von Spenden in B1 Admin erfolgt über das Stapel-System (Batches). Sie erstellen einen Stapel für eine Kollekte (etwa das Sonntagsopfer) und fügen dann einzelne Spenden zu diesem Stapel hinzu. So bleiben Ihre Spendenunterlagen übersichtlich und lassen sich leicht abgleichen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie Ihre [Fonds](funds.md) ein, damit Sie Spenden den richtigen Kategorien zuordnen können
- Erstellen Sie einen [Stapel](batches.md), der die Spenden aufnimmt, die Sie als Nächstes eingeben
- Stellen Sie sicher, dass die Spender in Ihrem [Personenverzeichnis](../people/adding-people.md) enthalten sind, damit Sie sie bei der Erfassung von Gaben suchen können
- Sie benötigen **Spenden bearbeiten** oder **Spenden erfassen** zusammen mit **Spenden anzeigen**, um Gaben in einen Stapel einzutragen (siehe [Wer kann einen Stapel ändern](batches.md#who-can-change-a-batch))

</div>

## Einen Stapel erstellen und Spenden hinzufügen

1. Öffnen Sie in **B1 Admin** das [Jump-Menü](../introduction.md#getting-around-with-the-jump-menu) (das Suchfeld oben links), klappen Sie **Donations** auf und klicken Sie auf **Batches**.
2. Klicken Sie oben auf der Seite auf **Add Batch**.
3. Geben Sie einen Namen für den Stapel ein (z. B. „Sunday Offering - Jan 5“) und wählen Sie das Datum aus. Klicken Sie auf **Save**.
4. Ihr neuer Stapel erscheint in der Liste mit null Spenden und 0,00 $.
5. Klicken Sie auf den **Namen des Stapels**, um ihn zu öffnen.

## Einzelne Spenden erfassen

1. Auf der Detailseite des Stapels erscheint das Erfassungsfeld für Spenden neben der Spendenliste. Geben Sie unter **Select Person or Anonymous** den Namen des Spenders in das Suchfeld ein, um ihn zu finden, oder klicken Sie auf **Anonymous**. (Ein Klick auf **Add Donation** oben auf der Seite springt direkt zu diesem Feld.)
2. Nachdem Sie eine Person ausgewählt haben, zeigt das Formular die Felder **Date**, **Method** (Check, Cash, Card oder In-Kind), **Fund**, **Notes**, **Amount** und **Check #** (bzw. **Last 4 digits** bei Kartenspenden oder **Item** zur Beschreibung einer Sachspende). Klicken Sie neben dem Namen des Spenders auf **Change**, um eine andere Person auszuwählen.
3. Füllen Sie die Angaben aus und klicken Sie auf **Add Donation** (oder drücken Sie die Eingabetaste).
4. Die Spende wird der Spendenliste hinzugefügt, und das Formular wird zurückgesetzt, damit Sie die nächste Spende erfassen können.

:::info
Wenn der Stapel [geschlossen](batches.md#closing-and-reopening-a-batch) wurde, sind das Erfassungsfeld und die Links **Edit** für Personen ohne **Spenden bearbeiten** ausgeblendet, und oben im Stapel erscheint ein Hinweis, dass er geschlossen ist. Bitten Sie jemanden mit **Spenden bearbeiten**, den Stapel wieder zu öffnen.
:::

:::tip
Sie können mehrere Spenden hintereinander erfassen, ohne die Stapelseite zu verlassen. Das Formular wird nach jeder Eingabe zurückgesetzt, sodass Sie einen Stapel Schecks oder Umschläge zügig durcharbeiten können.
:::

## Spenden aus einer CSV-Datei importieren {#importing-donations-from-a-csv-file}

Wenn Ihre Spenden bereits in einer Tabelle vorliegen – zum Beispiel als Export aus einem anderen Spendensystem oder als Zählliste eines Zählteams –, können Sie sie in einen Stapel importieren, statt jede einzeln einzutippen.

1. Öffnen Sie den Stapel und klicken Sie oben auf der Seite auf **Import CSV**. (Die Schaltfläche erscheint, wenn Sie den Stapel ändern dürfen und Ihre Gemeinde mindestens einen [Fonds](funds.md) hat.)
2. Klicken Sie auf **Choose CSV File** und wählen Sie Ihre Datei aus. Die Datei benötigt eine Kopfzeile, und die Spalten können in beliebiger Reihenfolge stehen:
   - **Amount** (erforderlich; `Total` funktioniert ebenfalls) -- Währungssymbole und Kommas werden ignoriert, `1.250,00 €` ist also in Ordnung. Der Betrag muss größer als null sein.
   - **Date** -- Verwenden Sie ein Format wie `2026-10-25` oder `10/25/2026`. Ist das Feld leer, wird das Datum des Stapels verwendet.
   - **Fund** -- Der Name des Fonds, ohne Berücksichtigung von Groß- und Kleinschreibung abgeglichen. Ist das Feld leer, wird Ihr erster Fonds verwendet.
   - **Method** -- **Check**, **Cash**, **Card** oder **In-Kind**. Ist das Feld leer, wird **Check** verwendet.
   - **Check Number** -- Die Scheck-Nummer (oder eine andere Zahlungsangabe).
   - **Notes**
   - **Email**, **Name** oder **First Name** und **Last Name** -- Werden verwendet, um den Spender einer Person in Ihrer Datenbank zuzuordnen. Ein Name in der Form „Smith, John“ wird als „John Smith“ gelesen.
3. Prüfen Sie die Vorschau. Jede Zeile zeigt ihre Zeilennummer, den Spender aus der Datei, die **Match**-Angabe, den Fonds und den Betrag:
   - Ein Personenname bedeutet, dass der Spender zugeordnet wurde. B1 sucht zuerst nach der E-Mail-Adresse, dann nach dem exakten Namen, und nur wenn genau eine Person passt.
   - **Not found — anonymous** bedeutet, dass keine eindeutige Zuordnung gefunden wurde. Die Gabe wird anonym importiert, und in den Notizen wird „Imported as:“ mit dem Namen des Spenders ergänzt, damit Sie sie später zuordnen können.
   - Eine rote Meldung wie **Invalid amount**, **Unknown fund**, **Unknown method** oder **Invalid date** bedeutet, dass diese Zeile übersprungen wird. Korrigieren Sie die Datei und wählen Sie sie erneut aus, um die Zeile einzuschließen.
4. Klicken Sie auf **Import** (die Schaltfläche zeigt an, wie viele Zeilen importiert werden). Die Spenden werden dem Stapel hinzugefügt.

:::tip
Verwenden Sie nach dem Import **Edit** bei einer anonymen Spende, um die richtige Person auszuwählen. Die Notiz „Imported as:“ zeigt Ihnen, von wem die Datei angibt, dass die Spende stammt.
:::

## Eine Gabe aus dem Datensatz einer Person erfassen

Um eine einzelne Gabe ohne Öffnen eines Stapels zu erfassen, öffnen Sie den Datensatz des Spenders unter **People** und klicken Sie auf **Log a gift** (in der Giving-Übersicht oder in der Spendenansicht der Person).

1. Legen Sie das **Date** und den **Amount** fest.
2. Wählen Sie den **Fund** und die **Method** (Check, Cash, Card oder In-Kind) und geben Sie bei Bedarf die **Check #**, die **Last 4 digits** oder das **Item** (bei Sachspenden) ein.
3. Fügen Sie optional **Notes** hinzu und klicken Sie dann auf **Save**.

Die Gabe wird dem Stapel für dieses Datum zugeordnet. Existiert für das Datum noch kein Stapel, wird automatisch einer angelegt, der nach dem Datum benannt ist.

## Eine Spende auf mehrere Fonds aufteilen

Manchmal gibt ein Spender in einer Transaktion an mehr als einen Fonds. So gehen Sie dabei vor:

1. Klicken Sie unterhalb des Erfassungsfelds auf den Link **full donation editor** (oder klicken Sie bei einer vorhandenen Spende in der Zeile auf **Edit**).
2. Tragen Sie im vollständigen Editor Beträge für verschiedene Fonds ein. Die Gesamtsumme wird automatisch aus den einzelnen Fondsbeträgen berechnet.
3. Klicken Sie auf **Save**, um die Spende zu aktualisieren.

:::info
Das Aufteilen von Spenden auf mehrere Fonds kommt häufig vor, wenn ein Spender einen einzigen Scheck für mehrere Zwecke ausstellt, etwa für den Allgemeinen Fonds und für Missionsarbeit.
:::

## Spenden bearbeiten oder entfernen

Um eine Spende zu bearbeiten, klicken Sie in der Zeile der Spende im Stapel auf die Schaltfläche **Edit**. Sie können das Datum, den Betrag, den Fonds, die Zahlungsart (Check, Cash, Card oder In-Kind) oder andere Angaben ändern. Bei einer Sachspende beschriftet der Editor das Detailfeld mit **Item**, damit Sie beschreiben können, was gegeben wurde. Klicken Sie auf **Save**, wenn Sie fertig sind.

:::tip
Die Zeile unter dem Stapelnamen oben auf der Seite wird automatisch aktualisiert und zeigt das Stapeldatum, die Anzahl der Gaben und die Gesamtsumme in Dollar an, während Sie Einträge hinzufügen oder ändern. Nutzen Sie dies, um mit Ihrem Einzahlungsbeleg abzugleichen.
:::

## Eine Spende zurückerstatten

Wenn ein Spender versehentlich belastet wurde oder sein Geld zurückverlangt, können Sie eine abgeschlossene Spende direkt aus ihrem Bearbeitungsbildschirm erstatten – Sie müssen dafür nicht in das Dashboard Ihres Zahlungsdienstleisters wechseln.

1. Öffnen Sie die Spende und klicken Sie auf **Edit**.
2. Klicken Sie unten im Formular neben **Delete** auf die Schaltfläche **Refund**.
3. Bestätigen Sie den Dialog: „Refund this donation in full through the payment gateway? This cannot be undone.“

Die Spende wird über den ursprünglichen Zahlungsdienstleister vollständig erstattet und in Ihren Spendenlisten als **Refunded** markiert.

:::warning
Erstattungen sind nur vollständige Erstattungen – aus B1 Admin ist keine Teilerstattung möglich. Eine Erstattung kann außerdem nach der Bestätigung nicht rückgängig gemacht werden.
:::

:::info
Die Schaltfläche **Refund** erscheint nur bei Spenden, die online bezahlt wurden (also eine Transaktion beim Zahlungsdienstleister haben) und sich noch im Status **Complete** befinden. Manuell erfasste Spenden (Bargeld, Scheck) haben keine Transaktion beim Zahlungsdienstleister, die erstattet werden könnte – bearbeiten oder löschen Sie diese stattdessen.
:::

## Nächste Schritte

- Prüfen Sie Ihre Einträge mit den [Spendenberichten](donation-reports.md), um ihre Richtigkeit zu bestätigen
- Erstellen Sie zum Jahresende [Spendenbescheinigungen](giving-statements.md) für Ihre Spender
