---
title: "Spendenbescheinigungen"
description: "Erstellen Sie in B1 Admin Jahresbescheinigungen für jede spendende Person und laden Sie sie als CSV-Dateien herunter oder drucken Sie sie mit den steuerlich absetzbaren Summen zum Versand aus."
---

# Spendenbescheinigungen {#giving-statements}

<div class="article-intro">

Am Ende jedes Jahres benötigen Ihre Spender eine Übersicht über ihre steuerlich absetzbaren Spenden für ihre Unterlagen. B1 Admin macht es einfach, diese Bescheinigungen für alle Spender auf einmal zu erstellen, und spart Ihnen so viele Stunden manueller Arbeit.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Prüfen Sie, ob Ihre [Fonds](funds.md) korrekt als **Steuerlich absetzbar** gekennzeichnet sind. Nur Spenden an steuerlich absetzbare Fonds erscheinen auf den Bescheinigungen.
- Stellen Sie sicher, dass alle Spenden [erfasst](recording-donations.md) und alle Online-Transaktionen [aus Stripe importiert](stripe-import.md) wurden

</div>

## Spendenbescheinigungen aufrufen {#accessing-giving-statements}

1. Öffnen Sie in **B1 Admin** das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links) und klappen Sie **Spenden** auf.
2. Klicken Sie auf **Spendenbescheinigungen**. Die Seite **Spendenbescheinigungen nach Stapel** öffnet sich.

## Bescheinigungen erstellen {#generating-statements}

1. Wählen Sie im Bereich **Jahr auswählen** unter **Jahr** das Jahr aus der Auswahlliste. Sie können das laufende Jahr oder eines der fünf vorherigen Jahre wählen.
2. Die Seite lädt nur die Spenden, die in diesem Jahr datiert sind (1. Januar bis 31. Dezember). So öffnet sie schnell, auch wenn Ihre Kirche eine lange Spendenhistorie hat. Wenn Sie ein anderes Jahr wählen, wird die Zusammenfassung mit den Spenden dieses Jahres aktualisiert. Der Bereich **Übersicht** unter dem Jahr zeigt Kennzahlen für dieses Jahr. Sie berücksichtigt dieselben Gaben, die auch in den Bescheinigungen enthalten sind. Gaben, die nur an nicht absetzbare Fonds gingen, bleiben außen vor.
   - **Spendende insgesamt** – die Anzahl der Personen, die gegeben haben
   - **Spenden insgesamt** – die Anzahl der einzelnen Spendenbuchungen
   - **Gesamtbetrag** – der zusammengerechnete Betrag ihrer Gaben

## Bescheinigungen herunterladen {#downloading-statements}

Der Bereich **Download-Optionen** bietet zwei Möglichkeiten, Bescheinigungen an Ihre Spender zu bringen:

### Als CSV-Dateien herunterladen {#download-as-csv-files}

Klicken Sie unter **Einzelne CSV-Dateien** auf **ZIP herunterladen** (die Schaltfläche zeigt die Anzahl der Dateien), um eine ZIP-Datei mit einer CSV-Datei für jeden Spender herunterzuladen. Das ist nützlich, wenn Sie Bescheinigungen einzeln per E-Mail versenden oder in ein anderes System importieren möchten.

### Alle Bescheinigungen drucken {#print-all-statements}

Klicken Sie unter **Druckbare Bescheinigungen** auf **Alle drucken** (die Schaltfläche zeigt die Anzahl der Bescheinigungen), um eine druckbare Ansicht aller Bescheinigungen des gewählten Jahres in Ihrem Browser zu öffnen. Verwenden Sie von dort aus die Druckfunktion Ihres Browsers, um sie an einen Drucker zu senden. Jede Bescheinigung beginnt auf einer neuen Seite, sodass sie zum Falten und Versenden bereitliegt. Die Bescheinigungen sind nach dem Nachnamen und dann dem Vornamen des Spenders sortiert.

Wenn Sie unter [Website > Erscheinungsbild](../website/appearance.md) ein **Logo für helle Hintergründe** hochgeladen haben, wird es zentriert oben auf jeder Bescheinigung über dem Titel gedruckt. Das gilt für **Alle drucken**, für die Bescheinigung einer einzelnen spendenden Person, die aus ihrem Datensatz gedruckt wird, sowie für die Bescheinigungen, die Mitglieder selbst über die Seite **Spenden** von B1.church drucken.

:::tip
Erstellen Sie Ihre Bescheinigungen früh im Januar, solange Ihre Unterlagen noch frisch sind. Prüfen Sie vor dem Erstellen unbedingt noch einmal, ob Ihre Fonds korrekt als steuerlich absetzbar markiert sind. Nur Spenden an steuerlich absetzbare Fonds werden berücksichtigt.
:::

:::info
Spendenbescheinigungen enthalten nur Spenden, die Fonds zugeordnet sind, bei denen die Einstellung **Steuerlich absetzbar** aktiviert ist. Ist ein Fonds nicht als steuerlich absetzbar markiert, erscheinen seine Spenden nicht auf der Bescheinigung. Diese Einstellung verwalten Sie auf der Seite [Fonds](funds.md).
:::

## Verwendungszwecke auf Bescheinigungen {#gift-memos-on-statements}

Jede Bescheinigung listet jede Gabe mit Datum, Methode, Fonds und Betrag auf. Hat mindestens eine Gabe auf einer Bescheinigung einen **Verwendungszweck**, wird nach dem Fonds eine Spalte **Verwendungszweck** eingefügt, damit die spendende Person sieht, wofür jede Gabe bestimmt war. Bescheinigungen ohne Verwendungszwecke behalten das vierspaltige Layout. Die **Notizen** einer Gabe sind intern und erscheinen nie auf einer Bescheinigung. Die CSV-Dateien im ZIP enthalten den Verwendungszweck als letzte Spalte.

Um einen Zweck auf der Bescheinigung anzugeben, tragen Sie ihn beim [Erfassen der Spende](recording-donations.md) als **Verwendungszweck** der Gabe ein. Alternativ geben Sie ihr einen eigenen [Fonds](funds.md), wenn Sie ihn separat summieren möchten.

## Belegformate für Kanada, Australien und Neuseeland {#receipt-formats-for-canada-australia-and-new-zealand}

Kirchen außerhalb der USA können die Bescheinigung auf das offizielle Belegformat ihres Landes umstellen. Klicken Sie oben auf der Seite Spendenbescheinigungen auf **Bescheinigungsformat** (oder gehen Sie zu **Einstellungen** und öffnen Sie den Abschnitt **Spenden**). Stellen Sie **Bescheinigungsformat** (Standard ist **Standard**) auf **Kanada – CRA-offizieller Beleg**, **Australien** oder **Neuseeland** und füllen Sie dann die erscheinenden Felder aus: Ihre Registrierungsnummer (**CRA-Registrierungsnummer**, **ABN** oder **NZ-Registrierungsnummer für Wohltätigkeitsorganisationen**), **Adresse der Organisation**, **Name des Unterzeichnungsberechtigten** und für Kanada den **Ausstellungsort**. Klicken Sie auf **Speichern**.

Die Bescheinigungen enthalten dann den Wortlaut, den Ihre Steuerbehörde erwartet (für Kanada „Offizieller Beleg für Einkommensteuerzwecke“ mit der CRA-Referenz), eine Belegnummer im Format `YEAR-DONORID`, den förderfähigen Betrag, der nur aus steuerlich absetzbaren Fonds berechnet wird, und eine separate Zeile für Gaben an nicht absetzbare Fonds. Spender sehen denselben Belegblock, wenn sie ihre eigene Bescheinigung über B1.church drucken.

## Was Mitglieder in B1.church sehen {#what-members-see-in-b1church}

Derselbe Einstellungsabschnitt **Spenden** steuert, was Mitglieder auf ihrer eigenen Gebeseite in B1.church sehen:

- **Spendenverlauf für Mitglieder** legt fest, welche Jahre Mitglieder sehen können. **Alle Jahre** ist die Voreinstellung. **Bis 2025** (oder ein anderes Jahr) endet bei diesem Jahr, sodass Mitglieder ein späteres Jahr erst dann ansehen oder drucken können, wenn Sie es freigeben. Damit können Sie das laufende Jahr zurückhalten, während Sie Korrekturen und Rückerstattungen abschließen. **Verborgen** entfernt Spendenverlauf, Jahressummen und den Bescheinigungsdruck vollständig. Mitglieder können weiterhin spenden.
- **Gebehinweis** ist eine kurze Nachricht, die auf der Gebeseite und im Spendenverlauf des Mitglieds angezeigt wird. Sie wird außerdem unten auf jeder Spendenbescheinigung gedruckt, auch auf den Bescheinigungen, die Sie hier drucken. Verwenden Sie sie für Dinge wie Ihre Rückerstattungsrichtlinie.

Diese Einstellungen ändern nur, was Mitglieder sehen. Sie können auf dieser Seite weiterhin jedes Jahr drucken.

## Nächste Schritte {#next-steps}

Wenn Sie Spendendetails prüfen möchten, bevor Sie Bescheinigungen erstellen, besuchen Sie die Seite [Spendenberichte](donation-reports.md) oder sehen Sie sich einzelne [Stapel](batches.md) an.
