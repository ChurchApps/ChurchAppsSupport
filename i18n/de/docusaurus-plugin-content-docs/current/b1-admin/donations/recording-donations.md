---
title: "Spenden erfassen"
description: "Erfassen Sie Kirchenspenden in B1 Admin, indem Sie einen Stapel anlegen, Gaben einzeln eingeben, eine CSV-Datei importieren oder eine einzelne Gabe aus dem Profil einer spendenden Person erfassen."
---

# Spenden erfassen {#recording-donations}

<div class="article-intro">

Spenden erfassen Sie in B1 Admin über das System der Stapel. Sie legen einen Stapel für eine Kollekte an (etwa eine Sonntagskollekte) und fügen dann einzelne Spenden zu diesem Stapel hinzu. So bleiben Ihre Spendenunterlagen übersichtlich und lassen sich leicht abgleichen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie Ihre [Fonds](funds.md) ein, damit Sie Spenden den richtigen Kategorien zuordnen können
- Legen Sie einen [Stapel](batches.md) an, der die Spenden aufnimmt, die Sie eingeben möchten
- Stellen Sie sicher, dass die spendenden Personen in Ihrem [Personenverzeichnis](../people/adding-people.md) erfasst sind, damit Sie sie beim Eingeben der Gaben finden können
- Sie benötigen **Spenden bearbeiten** oder **Spenden erfassen** zusammen mit **Spenden anzeigen**, um Gaben in einen Stapel einzugeben (siehe [Wer einen Stapel ändern kann](batches.md#who-can-change-a-batch))

</div>

## Einen Stapel anlegen und Spenden hinzufügen {#creating-a-batch-and-adding-donations}

1. Öffnen Sie in **B1 Admin** das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Spenden** auf und klicken Sie auf **Stapel**.
2. Klicken Sie oben auf der Seite auf **Stapel hinzufügen**.
3. Geben Sie einen Namen für den Stapel ein (z. B. „Sonntagskollekte - 5. Jan“) und wählen Sie das Datum aus. Klicken Sie auf **Speichern**.
4. Ihr neuer Stapel erscheint in der Liste mit null Spenden und einem Betrag von $0.00.
5. Klicken Sie auf den **Namen des Stapels**, um ihn zu öffnen.

## Einzelne Spenden erfassen {#entering-individual-donations}

1. Auf der Detailseite des Stapels erscheint das Eingabefeld für Spenden neben der Liste der Spenden. Geben Sie unter **Person oder anonym auswählen** den Namen der spendenden Person in das Suchfeld ein, um sie zu finden, oder klicken Sie auf **Anonym**. (Ein Klick auf **Spende hinzufügen** oben auf der Seite springt zu diesem Bereich.)
2. Nachdem Sie eine Person ausgewählt haben, zeigt das Eingabeformular die Felder **Datum** (beginnt mit dem Datum des Stapels), **Art** (Scheck, Bargeld, Karte oder Sachspende), **Fonds** (erscheint, wenn Ihre Kirche mehr als einen Fonds hat), **Verwendungszweck (wird auf der Bescheinigung gedruckt)**, **Notizen (intern)** und **Betrag** sowie **Scheck-Nr.** (oder **Letzte 4 Ziffern** bei Kartenspenden oder **Gegenstand** zur Beschreibung einer Sachspende; Barspenden haben kein Detailfeld). Klicken Sie auf **Ändern** neben dem Namen der spendenden Person, um jemand anderen auszuwählen.
3. Füllen Sie die Angaben aus und klicken Sie auf **Spende hinzufügen** (oder drücken Sie die Eingabetaste). Ist der Betrag leer oder null, fordert das Formular Sie auf, einen Betrag größer als null einzugeben, statt zu speichern.
4. Die Spende wird der Liste hinzugefügt und das Formular wird zurückgesetzt, sodass Sie die nächste eingeben können. Datum, Art, Fonds, Verwendungszweck und Notizen bleiben so, wie Sie sie eingestellt haben. Ein Stapel ähnlicher Schecks braucht daher nur die spendende Person, den Betrag und die Scheck-Nummer.

Das **Datum** beginnt beim Öffnen eines Stapels immer mit dem Datum des Stapels. Wenn Sie es ändern, wird das neue Datum auf die nächste Spende übertragen, die Sie in diesem Stapel erfassen – im Eingabebereich und im vollständigen Spendeneditor –, bis Sie es erneut ändern oder den Stapel verlassen.

:::tip Verwendungszweck oder Notizen?
Der **Verwendungszweck** wird auf der Spendenbescheinigung und der Quittung der spendenden Person neben der Gabe gedruckt. Verwenden Sie ihn für das, was die spendende Person sehen soll, etwa den Zweck einer zweckgebundenen Gabe („Jugendfreizeit“). **Notizen** sind nur für Ihre Mitarbeitenden bestimmt und werden nie gedruckt. Wenn jemand online spendet, wird alles, was er im Feld Verwendungszweck des Spendenformulars eingibt, als Verwendungszweck der Gabe gespeichert.
:::

:::info
Ist der Stapel [geschlossen](batches.md#closing-and-reopening-a-batch), sind das Eingabefeld und die Links **Bearbeiten** für alle ohne **Spenden bearbeiten** ausgeblendet, und ein Hinweis oben im Stapel zeigt an, dass er geschlossen ist. Bitten Sie jemanden mit **Spenden bearbeiten**, ihn wieder zu öffnen.
:::

:::tip
Sie können auf der Seite des Stapels schnell mehrere Spenden hintereinander erfassen, ohne die Seite zu verlassen. Das Formular wird nach jeder Eingabe zurückgesetzt, sodass Sie einen Stapel Schecks oder Umschläge effizient durcharbeiten können.
:::

## Spenden aus einer CSV-Datei importieren {#importing-donations-from-a-csv-file}

Wenn Ihre Spenden bereits in einer Tabelle vorliegen, etwa als Export aus einem anderen Spendensystem oder als Zählliste eines Zählteams, können Sie sie in einen Stapel importieren, statt jede einzeln einzugeben.

1. Öffnen Sie den Stapel und klicken Sie oben auf der Seite auf **CSV importieren**. (Die Schaltfläche erscheint, wenn Sie den Stapel ändern dürfen und Ihre Kirche mindestens einen [Fonds](funds.md) hat.)
2. Klicken Sie auf **CSV-Datei auswählen** und wählen Sie Ihre Datei aus. Die Datei braucht eine Kopfzeile, und die Spalten können in beliebiger Reihenfolge stehen:
   - **Betrag** (erforderlich; `Total` funktioniert ebenfalls) – Währungssymbole und Kommas werden ignoriert, `$1,250.00` ist also in Ordnung. Der Betrag muss größer als null sein.
   - **Datum** – Verwenden Sie ein Format wie `2026-10-25` oder `10/25/2026`. Ist das Feld leer, wird das Datum des Stapels verwendet.
   - **Fonds** – Der Name des Fonds; Groß- und Kleinschreibung werden nicht beachtet. Ist das Feld leer, wird Ihr erster Fonds verwendet.
   - **Art** – **Scheck**, **Bargeld**, **Karte** oder **Sachspende**. Ist das Feld leer, wird **Scheck** verwendet.
   - **Scheck-Nr.** – Die Scheck-Nummer (oder eine andere Zahlungsangabe).
   - **Notizen**
   - **E-Mail**, **Name** oder **Vorname** und **Nachname** – Dienen dazu, die spendende Person einer Person in Ihrer Datenbank zuzuordnen. Ein Name in der Form „Smith, John“ wird als „John Smith“ gelesen.
3. Prüfen Sie die Vorschau. Jede Zeile zeigt ihre Zeilennummer, die spendende Person aus der Datei, die **Zuordnung**, den Fonds und den Betrag:
   - Ein Personenname bedeutet, dass die spendende Person zugeordnet wurde. B1 ordnet zuerst nach E-Mail-Adresse zu, dann nach exaktem Namen, und nur wenn genau eine Person passt.
   - **Nicht gefunden – anonym** bedeutet, dass keine eindeutige Zuordnung gefunden wurde. Die Gabe wird als anonym importiert, und „Importiert als:“ mit dem Namen der spendenden Person wird ihren Notizen hinzugefügt, damit Sie sie später zuordnen können.
   - Eine rote Meldung wie **Ungültiger Betrag**, **Unbekannter Fonds**, **Unbekannte Art** oder **Ungültiges Datum** bedeutet, dass diese Zeile übersprungen wird. Korrigieren Sie die Datei und wählen Sie sie erneut aus, um die Zeile einzuschließen.
4. Klicken Sie auf **Importieren** (die Schaltfläche zeigt, wie viele Zeilen importiert werden). Die Spenden werden dem Stapel hinzugefügt.

:::tip
Verwenden Sie nach dem Import **Bearbeiten** bei einer anonymen Spende, um die richtige Person auszuwählen. Die Notiz „Importiert als:“ zeigt, von wem die Datei sagt, dass die Spende stammt.
:::

## Eine Gabe aus dem Datensatz einer Person erfassen {#logging-a-gift-from-a-persons-record}

Um eine einzelne Gabe zu erfassen, ohne einen Stapel zu öffnen, öffnen Sie den Datensatz der spendenden Person unter **Personen** und klicken Sie auf **Gabe erfassen** (in der Übersicht der Gaben oder in der Gabenansicht der Person).

1. Legen Sie das **Datum** und den **Betrag** fest.
2. Wählen Sie den **Fonds** und die **Art** (Scheck, Bargeld, Karte oder Sachspende) und geben Sie bei Bedarf die **Scheck-Nr.**, die **Letzten 4 Ziffern** oder den **Gegenstand** (für Sachspenden) ein.
3. Fügen Sie optional **Notizen** hinzu und klicken Sie auf **Speichern**.

Die Gabe wird dem Stapel für dieses Datum zugeordnet. Existiert für dieses Datum noch kein Stapel, wird automatisch einer angelegt und nach dem Datum benannt.

## Eine Spende auf mehrere Fonds aufteilen {#splitting-a-donation-across-multiple-funds}

Manchmal gibt eine spendende Person mit einer Transaktion an mehrere Fonds. Gehen Sie dafür so vor:

1. Klicken Sie unter dem Eingabebereich auf den Link **vollständigen Spendeneditor** (oder klicken Sie bei einer vorhandenen Spende auf **Bearbeiten**). Eine neue Gabe beginnt mit dem Datum des Stapels.
2. Geben Sie im vollständigen Editor einen Betrag und einen Fonds ein und klicken Sie auf **Weitere hinzufügen**, um einen weiteren Fonds und Betrag hinzuzufügen. Die Summe wird aus den einzelnen Fondsbeträgen berechnet.
3. Klicken Sie auf **Speichern**. Eine Gabe ohne Betrag bei einem Fonds wird nicht gespeichert. Der Editor fordert einen Betrag größer als null.

:::info
Das Aufteilen von Spenden auf mehrere Fonds ist üblich, wenn eine spendende Person einen einzelnen Scheck für mehrere Zwecke ausstellt, etwa für den Allgemeinen Fonds und die Missionsarbeit.
:::

## Spenden bearbeiten oder entfernen {#editing-or-removing-donations}

Um eine Spende zu bearbeiten, klicken Sie in ihrer Zeile im Stapel auf die Schaltfläche **Bearbeiten**. Sie können das Datum, den Betrag, den Fonds, die Zahlungsmethode (Scheck, Bargeld, Karte oder Sachspende) und alle weiteren Angaben ändern, einschließlich **Verwendungszweck** und **Notizen**. Bei einer Sachspende beschriftet der Editor das Detailfeld als **Gegenstand**, damit Sie beschreiben können, was gegeben wurde. Klicken Sie abschließend auf **Speichern**.

### Eine Gabe in einen anderen Stapel verschieben {#moving-a-gift-to-another-batch}

Wurde eine Gabe im falschen Stapel erfasst, können Sie sie verschieben, statt sie zu löschen und erneut einzugeben:

1. Klicken Sie in der Zeile der Spende auf **Bearbeiten**.
2. Wählen Sie im Auswahlfeld **Stapel** den Stapel, zu dem sie gehört. Die Liste zeigt das Datum und den Namen jedes Stapels, neueste zuerst. Geschlossene Stapel werden nicht aufgeführt, außer dem aktuellen Stapel der Gabe.
3. Klicken Sie auf **Speichern**.

Die Gabe verlässt den aktuellen Stapel und erscheint in dem von Ihnen gewählten. Die Summen beider Stapel werden aktualisiert. Das Verschieben einer Gabe ist eine Bearbeitung und startet deshalb keinen [Workflow](../serving/workflows.md#triggers) **Spende · Erstellt**, wie es beim erneuten Erfassen der Fall wäre.

:::tip
Die Zeile unter dem Stapelnamen oben auf der Seite wird automatisch aktualisiert. Sie zeigt das Stapeldatum, die Anzahl der Gaben und den zusammengerechneten Betrag, während Sie Einträge hinzufügen oder bearbeiten. Nutzen Sie sie, um mit Ihrem Einzahlungsbeleg abzugleichen.
:::

## Eine Spende erstatten {#refunding-a-donation}

Wurde einer spendenden Person zu Unrecht Geld abgebucht oder fordert sie es zurück, können Sie eine abgeschlossene Spende direkt aus ihrem Bearbeitungsbildschirm erstatten, ohne das Dashboard Ihres Zahlungsanbieters aufzurufen.

1. Öffnen Sie die Spende und klicken Sie auf **Bearbeiten**.
2. Klicken Sie unten im Formular neben **Löschen** auf die Schaltfläche **Erstatten**.
3. Bestätigen Sie den Dialog: „Diese Spende vollständig über das Zahlungsgateway erstatten? Dies kann nicht rückgängig gemacht werden.“

Die Spende wird vollständig über den ursprünglichen Zahlungsanbieter erstattet und in Ihren Spendenlisten als **Erstattet** markiert.

:::warning
Erstattungen sind nur vollständige Erstattungen. Eine Teilerstattung ist aus B1 Admin nicht möglich. Eine bestätigte Erstattung kann außerdem nicht rückgängig gemacht werden.
:::

:::info
Die Schaltfläche **Erstatten** erscheint nur bei Spenden, die online bezahlt wurden (also eine Transaktion beim Zahlungsanbieter haben) und sich noch im Status **Abgeschlossen** befinden. Manuell erfasste Spenden (Bargeld, Scheck) haben keine Zahlungstransaktion, die erstattet werden könnte. Bearbeiten oder löschen Sie diese stattdessen.
:::

## Eine Quittung für eine einzelne Gabe drucken {#printing-a-receipt-for-one-gift}

Wenn jemand einen Scheck übergibt, eine Veranstaltung oder ein T-Shirt bezahlt oder eine auswärtige Organisation eine Spende bringt, können Sie eine Quittung nur für diese Gabe drucken, statt für einen ganzen Stapel oder eine Jahresbescheinigung.

1. Öffnen Sie den Stapel, der die Spende enthält.
2. Klicken Sie in der Zeile der Spende neben **Bearbeiten** auf **Quittung**. Sie können auch unten im Formular „Spende bearbeiten“ auf **Quittung** klicken.
3. Klicken Sie auf **Drucken** oder auf **Schließen**, um zurückzukehren.

Die Quittung verwendet dasselbe Layout wie die Spendenbescheinigung: Ihre Kirche und die spendende Person (oder „Anonym“), Datum und Art der Gabe, jeden Fonds mit Betrag, das Verwendungszweck der Gabe (falls vorhanden), Ihren Gebehinweis und den offiziellen Quittungsblock, wenn Sie ein **Bescheinigungsformat** festgelegt haben (siehe [Spendenbescheinigungen](giving-statements.md)). Die Quittungsnummer in diesem Block ist die ID der Spende.

:::info
Der Hinweis „keine Waren oder Dienstleistungen“ wird nur gedruckt, wenn jeder Fonds der Gabe als steuerlich absetzbar markiert ist. Fließt ein Teil der Gabe in einen nicht absetzbaren Fonds, etwa eine Veranstaltungsgebühr oder einen Kauf, lässt die Quittung diesen Hinweis weg. So wird sie als Zahlung und nicht als Spende gelesen.
:::

:::tip
Online-Gaben erhalten bereits eine automatische Dankes-E-Mail. Die Quittung ist vor allem für Gaben nützlich, die Sie von Hand erfassen.
:::

## Nächste Schritte {#next-steps}

- Prüfen Sie Ihre Einträge mit den [Spendenberichten](donation-reports.md), um ihre Richtigkeit zu kontrollieren
- Erstellen Sie zum Jahresende die [Spendenbescheinigungen](giving-statements.md) für Ihre Spender
