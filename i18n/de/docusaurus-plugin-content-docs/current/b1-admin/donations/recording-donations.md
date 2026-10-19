---
title: "Spenden erfassen"
---

# Spenden erfassen

<div class="article-intro">

Spenden werden in B1 Admin über das System der Stapel (Batches) erfasst. Sie legen einen Stapel für eine Kollekte an (etwa die Sonntagskollekte) und fügen dann einzelne Spenden zu diesem Stapel hinzu. So bleiben Ihre Spendenunterlagen übersichtlich und lassen sich leicht abgleichen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie Ihre [Fonds](funds.md) ein, damit Sie Spenden den richtigen Kategorien zuordnen können
- Legen Sie einen [Stapel](batches.md) an, der die Spenden aufnimmt, die Sie als Nächstes erfassen
- Stellen Sie sicher, dass die Spender im [Personenverzeichnis](../people/adding-people.md) stehen, damit Sie sie beim Erfassen der Gaben suchen können
- Sie benötigen **Spenden bearbeiten** oder **Spenden erfassen** zusammen mit **Spenden anzeigen**, um Gaben in einen Stapel einzutragen (siehe [Wer einen Stapel ändern darf](batches.md#who-can-change-a-batch))

</div>

## Einen Stapel anlegen und Spenden hinzufügen

1. Öffnen Sie in **B1 Admin** das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Spenden** auf und klicken Sie auf **Stapel**.
2. Klicken Sie oben auf der Seite auf **Stapel hinzufügen**.
3. Geben Sie einen Namen für den Stapel ein (z. B. „Sonntagskollekte – 5. Jan.“) und wählen Sie das Datum. Klicken Sie auf **Speichern**.
4. Ihr neuer Stapel erscheint in der Liste mit null Spenden und $0.00.
5. Klicken Sie auf den **Stapelnamen**, um ihn zu öffnen.

## Einzelne Spenden erfassen

1. Auf der Detailseite des Stapels erscheint das Eingabefeld für Spenden neben der Liste der Spenden. Geben Sie unter **Person oder anonym auswählen** den Namen des Spenders in das Suchfeld ein, um ihn zu finden, oder klicken Sie auf **Anonym**. (Ein Klick auf **Spende hinzufügen** oben auf der Seite springt zu diesem Feld.)
2. Nachdem Sie eine Person ausgewählt haben, zeigt das Formular die Felder **Datum**, **Methode** (Scheck, Bargeld, Karte oder Sachspende), **Fonds**, **Notizen**, **Betrag** und **Scheck-Nr.** (bzw. **Letzte 4 Ziffern** bei Kartenzahlungen oder **Gegenstand** zur Beschreibung einer Sachspende). Klicken Sie neben dem Namen des Spenders auf **Ändern**, um eine andere Person auszuwählen.
3. Füllen Sie die Angaben aus und klicken Sie auf **Spende hinzufügen** (oder drücken Sie die Eingabetaste).
4. Die Spende wird der Liste hinzugefügt, und das Formular wird zurückgesetzt, damit Sie die nächste erfassen können.

:::info
Ist der Stapel [geschlossen](batches.md#closing-and-reopening-a-batch), sind das Eingabefeld und die Links **Bearbeiten** für alle ausgeblendet, die nicht **Spenden bearbeiten** besitzen; oben im Stapel weist ein Hinweis darauf hin, dass er geschlossen ist. Bitten Sie jemanden mit **Spenden bearbeiten**, den Stapel wieder zu öffnen.
:::

:::tip
Sie können ohne die Stapelseite zu verlassen schnell mehrere Spenden hintereinander erfassen. Das Formular wird nach jedem Eintrag zurückgesetzt, sodass Sie einen Stapel Schecks oder Umschläge zügig durchgehen können.
:::

## Eine Gabe aus dem Datensatz einer Person erfassen

Um eine einzelne Gabe ohne Öffnen eines Stapels zu erfassen, öffnen Sie den Datensatz des Spenders unter **Personen** und klicken Sie auf **Gabe erfassen** (in der Spendenübersicht oder in der Spendenansicht der Person).

1. Legen Sie das **Datum** und den **Betrag** fest.
2. Wählen Sie den **Fonds** und die **Methode** (Scheck, Bargeld, Karte oder Sachspende) und geben Sie bei Bedarf die **Scheck-Nr.**, die **Letzten 4 Ziffern** oder den **Gegenstand** (bei Sachspenden) ein.
3. Fügen Sie optional **Notizen** hinzu und klicken Sie dann auf **Speichern**.

Die Gabe wird dem Stapel für dieses Datum zugeordnet. Existiert für dieses Datum noch kein Stapel, wird automatisch einer angelegt und nach dem Datum benannt.

## Eine Spende auf mehrere Fonds aufteilen

Manchmal gibt ein Spender in einer Transaktion für mehrere Fonds. So gehen Sie vor:

1. Klicken Sie unterhalb des Eingabefelds auf den Link **vollständiger Spendeneditor** (oder auf **Bearbeiten** in der Zeile einer bestehenden Spende).
2. Im vollständigen Editor tragen Sie Beträge für verschiedene Fonds ein. Die Summe wird automatisch aus den einzelnen Fondsbeträgen berechnet.
3. Klicken Sie auf **Speichern**, um die Spende zu aktualisieren.

:::info
Eine Aufteilung auf mehrere Fonds ist üblich, wenn ein Spender einen einzigen Scheck für mehrere Zwecke ausstellt, etwa für den Allgemeinen Fonds und für Missionen.
:::

## Spenden bearbeiten oder entfernen

Um eine Spende zu bearbeiten, klicken Sie in der Zeile im Stapel auf die Schaltfläche **Bearbeiten**. Sie können Datum, Betrag, Fonds, Zahlungsmethode (Scheck, Bargeld, Karte oder Sachspende) oder andere Angaben ändern. Bei einer Sachspende beschriftet der Editor das Feld **Gegenstand**, damit Sie beschreiben können, was gegeben wurde. Klicken Sie anschließend auf **Speichern**.

:::tip
Die Zeile unter dem Stapelnamen oben auf der Seite aktualisiert sich automatisch und zeigt das Stapeldatum, die Anzahl der Gaben und den Gesamtbetrag, während Sie Einträge hinzufügen oder bearbeiten. Nutzen Sie sie, um mit Ihrem Einzahlungsbeleg abzugleichen.
:::

## Eine Spende erstatten

Wurde einem Spender irrtümlich ein Betrag abgebucht oder verlangt er sein Geld zurück, können Sie eine abgeschlossene Spende direkt über ihre Bearbeitungsansicht erstatten — Sie müssen dafür nicht das Dashboard Ihres Zahlungsanbieters öffnen.

1. Öffnen Sie die Spende und klicken Sie auf **Bearbeiten**.
2. Klicken Sie unten im Formular neben **Löschen** auf die Schaltfläche **Erstatten**.
3. Bestätigen Sie den Dialog: „Diese Spende vollständig über den Zahlungsanbieter erstatten? Dies kann nicht rückgängig gemacht werden.“

Die Spende wird vollständig über den ursprünglichen Zahlungsanbieter erstattet und in Ihren Spendenlisten als **Erstattet** markiert.

:::warning
Erstattungen sind nur vollständige Erstattungen — es gibt keine Möglichkeit, aus B1 Admin einen Teilbetrag zu erstatten. Eine Erstattung kann außerdem nach der Bestätigung nicht mehr rückgängig gemacht werden.
:::

:::info
Die Schaltfläche **Erstatten** erscheint nur bei Spenden, die online bezahlt wurden (sie haben eine Transaktion beim Zahlungsanbieter) und sich noch im Status **Abgeschlossen** befinden. Manuell erfasste Spenden (Bargeld, Scheck) haben keine Transaktion beim Zahlungsanbieter, die erstattet werden könnte — bearbeiten oder löschen Sie diese stattdessen.
:::

## Nächste Schritte

- Prüfen Sie Ihre Einträge mit den [Spendenberichten](donation-reports.md), um die Richtigkeit zu kontrollieren
- Erstellen Sie zum Jahresende [Spendenbescheinigungen](giving-statements.md) für Ihre Spender
