---
title: "Spenden erfassen"
---

# Spenden erfassen

<div class="article-intro">

Spenden erfassen Sie in B1 Admin über das System der Stapel. Sie legen einen Stapel für eine Kollekte an (etwa das Sonntagsopfer) und fügen dann einzelne Spenden zu diesem Stapel hinzu. So bleiben Ihre Spendenunterlagen übersichtlich und lassen sich leicht abgleichen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie Ihre [Fonds](funds.md) ein, damit Sie Spenden den richtigen Kategorien zuordnen können
- Erstellen Sie einen [Stapel](batches.md), der die Spenden aufnimmt, die Sie als Nächstes erfassen
- Stellen Sie sicher, dass die Spendenden im [Personenverzeichnis](../people/adding-people.md) erfasst sind, damit Sie sie beim Erfassen der Gaben suchen können
- Sie benötigen **Spenden bearbeiten** oder **Spenden erfassen** zusammen mit **Spenden anzeigen**, um Gaben in einen Stapel einzutragen (siehe [Wer einen Stapel ändern darf](batches.md#who-can-change-a-batch))

</div>

## Einen Stapel erstellen und Spenden hinzufügen

1. Öffnen Sie in **B1 Admin** das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Spenden** auf und klicken Sie auf **Stapel**.
2. Klicken Sie oben auf der Seite auf **Stapel hinzufügen**.
3. Geben Sie einen Namen für den Stapel ein (z. B. "Sonntagsopfer - 5. Jan.") und wählen Sie das Datum aus. Klicken Sie auf **Speichern**.
4. Ihr neuer Stapel erscheint in der Liste mit null Spenden und 0,00 $.
5. Klicken Sie auf den **Stapelnamen**, um ihn zu öffnen.

## Einzelne Spenden erfassen

1. Auf der Detailseite des Stapels erscheint der Eingabebereich für Spenden neben der Spendenliste. Geben Sie unter **Person auswählen oder anonym** den Namen der spendenden Person im Suchfeld ein oder klicken Sie auf **Anonym**. (Ein Klick auf **Spende hinzufügen** oben auf der Seite springt zu diesem Bereich.)
2. Nachdem Sie eine Person ausgewählt haben, zeigt das Eingabeformular Felder für **Datum**, **Zahlungsart** (Scheck, Bargeld, Karte oder Sachspende), **Fonds**, **Notizen**, **Betrag** und **Scheck-Nr.** (bzw. **Letzte 4 Ziffern** bei Kartenspenden oder **Gegenstand** zur Beschreibung einer Sachspende). Klicken Sie neben dem Namen der spendenden Person auf **Ändern**, um eine andere Person auszuwählen.
3. Füllen Sie die Angaben aus und klicken Sie auf **Spende hinzufügen** (oder drücken Sie die Eingabetaste).
4. Die Spende wird der Spendenliste hinzugefügt, und das Formular wird zurückgesetzt, damit Sie die nächste Spende erfassen können.

:::info
Wenn der Stapel [geschlossen](batches.md#closing-and-reopening-a-batch) wurde, sind der Eingabebereich und die Links **Bearbeiten** für alle ausgeblendet, die nicht **Spenden bearbeiten** haben, und oben im Stapel erscheint ein Hinweis, dass er geschlossen ist. Bitten Sie jemanden mit **Spenden bearbeiten**, ihn wieder zu öffnen.
:::

:::tip
Sie können mehrere Spenden hintereinander erfassen, ohne die Stapelseite zu verlassen. Das Formular wird nach jeder Eingabe zurückgesetzt, sodass Sie einen Stapel Schecks oder Umschläge zügig durchgehen können.
:::

## Spenden aus einer CSV-Datei importieren {#importing-donations-from-a-csv-file}

Wenn Ihre Spenden bereits in einer Tabelle vorliegen -- etwa als Export aus einem anderen Spendensystem oder als Zählliste eines Zählteams -- können Sie sie in einen Stapel importieren, statt jede einzeln einzugeben.

1. Öffnen Sie den Stapel und klicken Sie oben auf der Seite auf **CSV importieren**. (Die Schaltfläche erscheint, wenn Sie den Stapel ändern dürfen und Ihre Kirche mindestens einen [Fonds](funds.md) hat.)
2. Klicken Sie auf **CSV-Datei auswählen** und wählen Sie Ihre Datei aus. Die Datei benötigt eine Kopfzeile, und die Spalten können in beliebiger Reihenfolge stehen:
   - **Betrag** (erforderlich; `Total` funktioniert ebenfalls) -- Währungssymbole und Kommas werden ignoriert, daher ist `$1,250.00` in Ordnung. Der Betrag muss größer als null sein.
   - **Datum** -- Verwenden Sie ein Format wie `2026-10-25` oder `10/25/2026`. Ist das Feld leer, wird das Datum des Stapels verwendet.
   - **Fonds** -- Der Name des Fonds, unabhängig von Groß- und Kleinschreibung zugeordnet. Ist das Feld leer, wird Ihr erster Fonds verwendet.
   - **Zahlungsart** (Method) -- **Scheck**, **Bargeld**, **Karte** oder **Sachspende**. Ist das Feld leer, wird **Scheck** verwendet.
   - **Scheck-Nummer** -- Die Scheck-Nummer (oder eine andere Zahlungsangabe).
   - **Notizen**
   - **E-Mail**, **Name** oder **Vorname** und **Nachname** -- Dienen dazu, die spendende Person in Ihrer Datenbank zuzuordnen. Ein Name in der Form "Müller, Hans" wird als "Hans Müller" gelesen.
3. Prüfen Sie die Vorschau. Jede Zeile zeigt ihre Zeilennummer, die spendende Person aus der Datei, die **Zuordnung**, den Fonds und den Betrag:
   - Ein Personenname bedeutet, dass die spendende Person zugeordnet wurde. B1 ordnet zuerst nach E-Mail zu, dann nach exaktem Namen, und nur wenn genau eine Person passt.
   - **Nicht gefunden -- anonym** bedeutet, dass keine eindeutige Zuordnung gefunden wurde. Die Gabe wird als anonym importiert, und "Importiert als:" mit dem Namen der spendenden Person wird den Notizen hinzugefügt, damit Sie sie später zuordnen können.
   - Eine rote Meldung wie **Ungültiger Betrag**, **Unbekannter Fonds**, **Unbekannte Zahlungsart** oder **Ungültiges Datum** bedeutet, dass diese Zeile übersprungen wird. Korrigieren Sie die Datei und wählen Sie sie erneut aus, um die Zeile einzuschließen.
4. Klicken Sie auf **Importieren** (die Schaltfläche zeigt an, wie viele Zeilen importiert werden). Die Spenden werden dem Stapel hinzugefügt.

:::tip
Verwenden Sie nach dem Import **Bearbeiten** bei einer anonymen Spende, um die richtige Person auszuwählen. Die Notiz "Importiert als:" zeigt, von wem die Datei sagt, dass die Spende stammt.
:::

## Eine Gabe aus dem Datensatz einer Person erfassen

Um eine einzelne Gabe zu erfassen, ohne einen Stapel zu öffnen, öffnen Sie den Datensatz der spendenden Person unter **Personen** und klicken Sie auf **Gabe erfassen** (in der Spendenübersicht oder in der Spendenansicht der Person).

1. Legen Sie das **Datum** und den **Betrag** fest.
2. Wählen Sie den **Fonds** und die **Zahlungsart** (Scheck, Bargeld, Karte oder Sachspende) und geben Sie bei Bedarf die **Scheck-Nr.**, die **Letzten 4 Ziffern** oder den **Gegenstand** (bei Sachspenden) ein.
3. Fügen Sie optional **Notizen** hinzu und klicken Sie dann auf **Speichern**.

Die Gabe wird dem Stapel für dieses Datum zugeordnet. Existiert für dieses Datum noch kein Stapel, wird automatisch einer angelegt, der nach dem Datum benannt wird.

## Eine Spende auf mehrere Fonds aufteilen

Manchmal gibt eine spendende Person in einer einzigen Transaktion Geld für mehr als einen Fonds. So gehen Sie dabei vor:

1. Klicken Sie unterhalb des Eingabebereichs auf den Link **vollständiger Spendeneditor** (oder klicken Sie bei einer bestehenden Spende in der Zeile auf **Bearbeiten**).
2. Tragen Sie im vollständigen Editor Beträge für verschiedene Fonds ein. Die Gesamtsumme wird automatisch aus den einzelnen Fondsbeträgen berechnet.
3. Klicken Sie auf **Speichern**, um die Spende zu aktualisieren.

:::info
Das Aufteilen von Spenden auf mehrere Fonds ist üblich, wenn eine spendende Person einen einzigen Scheck für mehrere Zwecke ausstellt, etwa für den Allgemeinen Fonds und für Missionsarbeit.
:::

## Spenden bearbeiten oder entfernen

Um eine Spende zu bearbeiten, klicken Sie in ihrer Zeile im Stapel auf die Schaltfläche **Bearbeiten**. Sie können das Datum, den Betrag, den Fonds, die Zahlungsart (Scheck, Bargeld, Karte oder Sachspende) oder andere Details ändern. Bei einer Sachspende beschriftet der Editor das Detailfeld mit **Gegenstand**, damit Sie beschreiben können, was gegeben wurde. Klicken Sie auf **Speichern**, wenn Sie fertig sind.

:::tip
Die Zeile unter dem Stapelnamen oben auf der Seite aktualisiert sich automatisch und zeigt das Stapeldatum, die Anzahl der Gaben und die Gesamtsumme, während Sie Einträge hinzufügen oder bearbeiten. Nutzen Sie sie zum Abgleich mit Ihrem Einzahlungsbeleg.
:::

## Eine Spende erstatten

Wenn eine spendende Person irrtümlich belastet wurde oder ihr Geld zurückverlangt, können Sie eine abgeschlossene Spende direkt über ihren Bearbeitungsbildschirm erstatten -- ein Blick ins Dashboard Ihres Zahlungsgateways ist nicht nötig.

1. Öffnen Sie die Spende und klicken Sie auf **Bearbeiten**.
2. Klicken Sie unten im Formular neben **Löschen** auf die Schaltfläche **Erstatten**.
3. Bestätigen Sie den Dialog: "Diese Spende vollständig über das Zahlungsgateway erstatten? Dies kann nicht rückgängig gemacht werden."

Die Spende wird vollständig über das ursprüngliche Zahlungsgateway erstattet und in Ihren Spendenlisten als **Erstattet** markiert.

:::warning
Es sind nur vollständige Erstattungen möglich -- eine Teilerstattung ist in B1 Admin nicht vorgesehen. Eine bestätigte Erstattung kann zudem nicht rückgängig gemacht werden.
:::

:::info
Die Schaltfläche **Erstatten** erscheint nur bei Spenden, die online bezahlt wurden (sie haben eine Transaktion beim Gateway) und sich noch im Status **Abgeschlossen** befinden. Manuell erfasste Spenden (Bargeld, Scheck) haben keine Gateway-Transaktion, die erstattet werden könnte -- bearbeiten oder löschen Sie diese stattdessen.
:::

## Eine Quittung für eine einzelne Gabe drucken

Wenn jemand einen Scheck übergibt, für eine Veranstaltung oder ein T-Shirt bezahlt oder eine Gastorganisation eine Spende bringt, können Sie eine Quittung nur für diese Gabe drucken, statt für einen ganzen Stapel oder eine Jahresbescheinigung.

1. Öffnen Sie den Stapel, der die Spende enthält.
2. Klicken Sie in der Zeile der Spende neben **Bearbeiten** auf **Quittung**. Sie können auch unten im Formular "Spende bearbeiten" auf **Quittung** klicken.
3. Klicken Sie auf **Drucken** oder auf **Schließen**, um zurückzugehen.

Die Quittung verwendet dasselbe Layout wie die Spendenbescheinigung: Ihre Kirche und die spendende Person (bzw. "Anonym"), das Datum und die Zahlungsart der Gabe, jeden Fonds und Betrag, die Notiz, Ihren Spendenhinweis und den amtlichen Quittungsblock, falls Sie ein **Format der Bescheinigung** festgelegt haben (siehe [Spendenbescheinigungen](giving-statements.md)). Die Quittungsnummer in diesem Block ist die ID der Spende.

:::info
Der Hinweis "ohne Gegenleistung" wird nur gedruckt, wenn alle Fonds der Gabe als steuerlich absetzbar markiert sind. Falls ein Teil der Gabe an einen nicht steuerlich absetzbaren Fonds ging, etwa für eine Veranstaltungsgebühr oder einen Kauf, lässt die Quittung diesen Hinweis weg, damit sie als Zahlung und nicht als Spende gelesen wird.
:::

:::tip
Online-Spenden erhalten bereits automatisch eine Dankes-E-Mail, daher ist die Quittung vor allem für manuell erfasste Gaben nützlich.
:::

## Nächste Schritte

- Prüfen Sie Ihre Einträge mit den [Spendenberichten](donation-reports.md), um die Richtigkeit zu kontrollieren
- Erstellen Sie zum Jahresende [Spendenbescheinigungen](giving-statements.md) für Ihre spendenden Personen
