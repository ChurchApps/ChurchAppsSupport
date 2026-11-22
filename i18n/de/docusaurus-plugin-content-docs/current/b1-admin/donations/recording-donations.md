---
title: "Spenden erfassen"
description: "Erfassen Sie Kirchenspenden in B1 Admin, indem Sie einen Stapel anlegen, Gaben einzeln eingeben, eine CSV-Datei importieren oder eine Gabe aus dem Profil einer spendenden Person erfassen."
---

# Spenden erfassen

<div class="article-intro">

Spenden erfassen Sie in B1 Admin über das System der Stapel. Sie legen einen Stapel für eine Kollekte an (etwa eine Sonntagskollekte) und fügen dann einzelne Spenden zu diesem Stapel hinzu. So bleiben Ihre Gebeunterlagen übersichtlich und lassen sich leicht abgleichen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie Ihre [Fonds](funds.md) ein, damit Sie Spenden den richtigen Kategorien zuordnen können
- Legen Sie einen [Stapel](batches.md) an, der die Spenden aufnimmt, die Sie gleich eingeben
- Stellen Sie sicher, dass die Spendenden im [Personenverzeichnis](../people/adding-people.md) stehen, damit Sie sie beim Erfassen der Gaben finden können
- Sie benötigen **Spenden bearbeiten** oder **Spenden erfassen** zusammen mit **Spenden anzeigen**, um Gaben in einen Stapel einzutragen (siehe [Wer einen Stapel ändern kann](batches.md#who-can-change-a-batch))

</div>

## Einen Stapel anlegen und Spenden hinzufügen {#creating-a-batch-and-adding-donations}

1. Öffnen Sie in **B1 Admin** das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Spenden** auf und klicken Sie auf **Stapel**.
2. Klicken Sie oben auf der Seite auf **Stapel hinzufügen**.
3. Geben Sie einen Namen für den Stapel ein (z. B. „Sonntagskollekte – 5. Jan.“) und wählen Sie das Datum. Klicken Sie auf **Speichern**.
4. Ihr neuer Stapel erscheint in der Liste mit null Spenden und $0.00.
5. Klicken Sie auf den **Stapelnamen**, um ihn zu öffnen.

## Einzelne Spenden eingeben {#entering-individual-donations}

1. Auf der Detailseite des Stapels erscheint das Eingabefeld für Spenden neben der Liste der Spenden. Geben Sie unter **Person oder anonym auswählen** den Namen des Spendenden in das Suchfeld ein, um ihn zu finden, oder klicken Sie auf **Anonym**. (Ein Klick auf **Spende hinzufügen** oben auf der Seite springt zu diesem Feld.)
2. Nachdem Sie eine Person gewählt haben, zeigt das Formular die Felder **Datum** (beginnt mit dem Datum des Stapels), **Art** (Scheck, Bargeld, Karte oder Sachspende), **Fonds** (wird angezeigt, wenn Ihre Kirche mehr als einen Fonds hat), **Memo (wird auf der Bescheinigung gedruckt)**, **Notizen (intern)**, **Betrag** sowie **Scheck-Nr.** (bzw. **Letzte 4 Ziffern** bei Kartengaben oder **Gegenstand** zur Beschreibung einer Sachspende; Bargeldgaben haben kein Detailfeld). Klicken Sie neben dem Namen des Spendenden auf **Ändern**, um eine andere Person zu wählen.
3. Füllen Sie die Angaben aus und klicken Sie auf **Spende hinzufügen** (oder drücken Sie die Eingabetaste). Ist der Betrag leer oder null, fordert das Formular einen Betrag größer als null, statt zu speichern.
4. Die Spende wird der Liste hinzugefügt, und das Formular wird zurückgesetzt, damit Sie die nächste eingeben können. Datum, Art, Fonds, Memo und Notizen bleiben so, wie Sie sie eingestellt haben. Bei einem Stapel ähnlicher Schecks müssen Sie nur noch Spendenden, Betrag und Schecknummer eingeben.

:::tip Memo oder Notizen?
Das **Memo** wird auf der Spendenbescheinigung und der Quittung neben der Gabe gedruckt. Verwenden Sie es für das, was der Spendende sehen soll, etwa den Zweck einer zweckgebundenen Gabe („Jugendreise“). **Notizen** sind nur für Ihre Mitarbeitenden bestimmt und werden nie gedruckt. Wenn jemand online gibt, wird alles, was er im Memo-Feld des Gabenformulars eingibt, als Memo der Gabe gespeichert.
:::

:::info
Ist der Stapel [geschlossen](batches.md#closing-and-reopening-a-batch), sind das Eingabefeld und die Links **Bearbeiten** für alle ausgeblendet, die nicht **Spenden bearbeiten** haben, und ein Hinweis oben im Stapel zeigt, dass er geschlossen ist. Bitten Sie jemanden mit **Spenden bearbeiten**, ihn wieder zu öffnen.
:::

:::tip
Sie können mehrere Spenden hintereinander erfassen, ohne die Stapelseite zu verlassen. Das Formular wird nach jeder Eingabe zurückgesetzt, sodass Sie einen Stapel Schecks oder Umschläge zügig durchgehen können.
:::

## Spenden aus einer CSV-Datei importieren {#importing-donations-from-a-csv-file}

Wenn Ihre Spenden bereits in einer Tabelle vorliegen – zum Beispiel als Export aus einem anderen System für Gaben oder als Zählliste eines Zählteams –, können Sie sie in einen Stapel importieren, statt jede einzeln einzutippen.

1. Öffnen Sie den Stapel und klicken Sie oben auf der Seite auf **CSV importieren**. (Die Schaltfläche erscheint, wenn Sie den Stapel ändern dürfen und Ihre Kirche mindestens einen [Fonds](funds.md) hat.)
2. Klicken Sie auf **CSV-Datei auswählen** und wählen Sie Ihre Datei. Die Datei braucht eine Kopfzeile, und die Spalten können in beliebiger Reihenfolge stehen:
   - **Betrag** (erforderlich; `Total` funktioniert ebenfalls) – Währungssymbole und Kommas werden ignoriert, daher ist `$1,250.00` in Ordnung. Der Betrag muss größer als null sein.
   - **Datum** – Verwenden Sie ein Format wie `2026-10-25` oder `10/25/2026`. Ist das Feld leer, wird das Datum des Stapels verwendet.
   - **Fonds** – Der Name des Fonds, ohne Berücksichtigung der Groß- und Kleinschreibung. Ist das Feld leer, wird Ihr erster Fonds verwendet.
   - **Art** – **Scheck**, **Bargeld**, **Karte** oder **Sachspende**. Ist das Feld leer, wird **Scheck** verwendet.
   - **Scheck-Nr.** – Die Schecknummer (oder ein anderes Zahlungsdetail).
   - **Notizen**
   - **E-Mail**, **Name** oder **Vorname** und **Nachname** – dienen dazu, den Spendenden einer Person in Ihrer Datenbank zuzuordnen. Ein Name in der Form „Smith, John“ wird als „John Smith“ gelesen.
3. Prüfen Sie die Vorschau. Jede Zeile zeigt ihre Zeilennummer, den Spendenden aus der Datei, die **Zuordnung**, den Fonds und den Betrag:
   - Der Name einer Person bedeutet, dass der Spendende zugeordnet wurde. B1 ordnet zuerst nach E-Mail-Adresse und dann nach dem genauen Namen zu, und nur wenn genau eine Person passt.
   - **Nicht gefunden – anonym** bedeutet, dass keine eindeutige Zuordnung gefunden wurde. Die Gabe wird als anonym importiert, und „Importiert als:“ mit dem Namen des Spendenden wird ihren Notizen hinzugefügt, damit Sie sie später zuordnen können.
   - Eine rote Meldung wie **Ungültiger Betrag**, **Unbekannter Fonds**, **Unbekannte Art** oder **Ungültiges Datum** bedeutet, dass diese Zeile übersprungen wird. Korrigieren Sie die Datei und wählen Sie sie erneut aus, um die Zeile einzuschließen.
4. Klicken Sie auf **Importieren** (die Schaltfläche zeigt, wie viele Zeilen importiert werden). Die Spenden werden dem Stapel hinzugefügt.

:::tip
Verwenden Sie nach dem Import **Bearbeiten** bei einer anonymen Spende, um die richtige Person zu wählen. Die Notiz „Importiert als:“ zeigt Ihnen, von wem die Datei sie angegeben hat.
:::

## Eine Gabe aus dem Datensatz einer Person erfassen {#logging-a-gift-from-a-persons-record}

Um eine einzelne Gabe zu erfassen, ohne einen Stapel zu öffnen, öffnen Sie den Datensatz des Spendenden unter **Personen** und klicken Sie auf **Gabe erfassen** (in der Übersicht der Gaben oder in der Gabenansicht der Person).

1. Legen Sie **Datum** und **Betrag** fest.
2. Wählen Sie **Fonds** und **Art** (Scheck, Bargeld, Karte oder Sachspende) und geben Sie bei Bedarf die **Scheck-Nr.**, die **Letzten 4 Ziffern** oder den **Gegenstand** (bei Sachspenden) ein.
3. Fügen Sie optional **Notizen** hinzu und klicken Sie dann auf **Speichern**.

Die Gabe wird für dieses Datum im Stapel gespeichert. Gibt es für dieses Datum noch keinen Stapel, wird automatisch einer angelegt, der nach dem Datum benannt ist.

## Eine Spende auf mehrere Fonds aufteilen {#splitting-a-donation-across-multiple-funds}

Manchmal gibt ein Spendender in einer Transaktion an mehr als einen Fonds. So gehen Sie dabei vor:

1. Klicken Sie unterhalb des Eingabefelds auf den Link zum **vollständigen Spendeneditor** (oder auf **Bearbeiten** in einer bestehenden Spendenzeile). Eine neue Gabe beginnt mit dem Datum des Stapels.
2. Geben Sie im vollständigen Editor einen Betrag und einen Fonds ein und klicken Sie dann auf **Weitere hinzufügen**, um einen weiteren Fonds und Betrag hinzuzufügen. Die Summe wird aus den einzelnen Fondsbeträgen berechnet.
3. Klicken Sie auf **Speichern**. Eine Gabe ohne Betrag in einem Fonds wird nicht gespeichert; der Editor fordert dann einen Betrag größer als null.

:::info
Das Aufteilen von Spenden auf mehrere Fonds ist üblich, wenn ein Spendender einen einzigen Scheck für mehrere Zwecke ausstellt, etwa Allgemeiner Fonds und Mission.
:::

## Spenden bearbeiten oder entfernen {#editing-or-removing-donations}

Um eine Spende zu bearbeiten, klicken Sie in ihrer Zeile im Stapel auf die Schaltfläche **Bearbeiten**. Sie können Datum, Betrag, Fonds, Zahlungsart (Scheck, Bargeld, Karte oder Sachspende) oder andere Angaben ändern, einschließlich des **Memos** und der **Notizen**. Bei einer Sachspende beschriftet der Editor das Detailfeld als **Gegenstand**, damit Sie beschreiben können, was gegeben wurde. Klicken Sie auf **Speichern**, wenn Sie fertig sind.

:::tip
Die Zeile unter dem Stapelnamen oben auf der Seite aktualisiert sich automatisch und zeigt das Datum des Stapels, die Anzahl der Gaben und den kombinierten Geldbetrag, während Sie Einträge hinzufügen oder ändern. Nutzen Sie sie, um mit Ihrem Einzahlungsbeleg abzugleichen.
:::

## Eine Spende erstatten {#refunding-a-donation}

Wurde ein Spendender irrtümlich belastet oder bittet er um sein Geld zurück, können Sie eine abgeschlossene Spende direkt aus ihrem Bearbeitungsbildschirm erstatten – ohne zum Dashboard Ihres Zahlungsgateways zu wechseln.

1. Öffnen Sie die Spende und klicken Sie auf **Bearbeiten**.
2. Klicken Sie unten im Formular neben **Löschen** auf die Schaltfläche **Erstatten**.
3. Bestätigen Sie den Dialog: „Diese Spende vollständig über das Zahlungsgateway erstatten? Dies kann nicht rückgängig gemacht werden.“

Die Spende wird vollständig über das ursprüngliche Zahlungsgateway erstattet und in Ihren Spendenlisten als **Erstattet** markiert.

:::warning
Es gibt nur vollständige Erstattungen – eine Teilerstattung ist in B1 Admin nicht möglich. Eine Erstattung kann nach der Bestätigung auch nicht rückgängig gemacht werden.
:::

:::info
Die Schaltfläche **Erstatten** erscheint nur bei Spenden, die online bezahlt wurden (sie haben eine Transaktion im Gateway) und sich noch im Status **Abgeschlossen** befinden. Manuell erfasste Spenden (Bargeld, Scheck) haben keine Gateway-Transaktion, die erstattet werden könnte – bearbeiten oder löschen Sie diese stattdessen.
:::

## Eine Quittung für eine einzelne Gabe drucken {#printing-a-receipt-for-one-gift}

Wenn jemand einen Scheck abgibt, für eine Veranstaltung oder ein T-Shirt bezahlt oder eine Gastorganisation eine Spende mitbringt, können Sie eine Quittung nur für diese Gabe drucken – statt für einen ganzen Stapel oder eine Jahresbescheinigung.

1. Öffnen Sie den Stapel, der die Spende enthält.
2. Klicken Sie in der Zeile der Spende neben **Bearbeiten** auf **Quittung**. Sie können auch unten im Formular „Spende bearbeiten“ auf **Quittung** klicken.
3. Klicken Sie auf **Drucken** oder auf **Schließen**, um zurückzukehren.

Die Quittung verwendet dasselbe Layout wie die Spendenbescheinigung: Ihre Kirche und den Spendenden (oder „Anonym“), Datum und Art der Gabe, jeden Fonds und Betrag, das Memo der Gabe (falls vorhanden), Ihren Gebehinweis und den offiziellen Belegblock, sofern Sie ein **Bescheinigungsformat** festgelegt haben (siehe [Spendenbescheinigungen](giving-statements.md)). Die Belegnummer in diesem Block ist die ID der Spende.

:::info
Der Hinweis „keine Waren oder Dienstleistungen“ wird nur gedruckt, wenn alle Fonds der Gabe als steuerlich absetzbar markiert sind. Ist ein Teil der Gabe an einen nicht absetzbaren Fonds gegangen, etwa für eine Veranstaltungsgebühr oder einen Kauf, lässt die Quittung diesen Hinweis weg, damit sie als Zahlung und nicht als Spende gelesen wird.
:::

:::tip
Online-Gaben erhalten bereits automatisch eine Dankes-E-Mail; die Quittung ist vor allem für manuell eingetragene Gaben nützlich.
:::

## Wie es weitergeht {#next-steps}

- Prüfen Sie Ihre Einträge mit den [Spendenberichten](donation-reports.md), um die Richtigkeit zu kontrollieren
- Erstellen Sie zum Jahresende [Spendenbescheinigungen](giving-statements.md) für Ihre Spendenden
