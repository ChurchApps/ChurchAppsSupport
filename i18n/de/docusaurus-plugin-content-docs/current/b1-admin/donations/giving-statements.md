---
title: "Spendenbescheinigungen"
description: "Erstellen Sie in B1 Admin am Jahresende Spendenbescheinigungen für jeden Spendenden und laden Sie sie dann als CSV-Dateien herunter oder drucken Sie sie zum Versand mit den steuerlich absetzbaren Summen aus."
---

# Spendenbescheinigungen

<div class="article-intro">

Am Ende jedes Jahres benötigen Ihre Spendenden eine Übersicht über ihre steuerlich absetzbaren Gaben für ihre Unterlagen. B1 Admin macht es einfach, diese Bescheinigungen für alle Spendenden auf einmal zu erstellen, und spart Ihnen so Stunden manueller Arbeit.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Prüfen Sie, ob Ihre [Fonds](funds.md) korrekt als **Steuerlich absetzbar** markiert sind – nur Spenden an steuerlich absetzbare Fonds erscheinen in den Bescheinigungen
- Stellen Sie sicher, dass alle Spenden [erfasst](recording-donations.md) sind und Online-Transaktionen [aus Stripe importiert](stripe-import.md) wurden

</div>

## Auf die Spendenbescheinigungen zugreifen {#accessing-giving-statements}

1. Öffnen Sie in **B1 Admin** das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links) und klappen Sie **Spenden** auf.
2. Klicken Sie auf **Spendenbescheinigungen**. Die Seite **Spendenbescheinigungen nach Stapel** öffnet sich.

## Bescheinigungen erstellen {#generating-statements}

1. Wählen Sie im Bereich **Jahr auswählen** im Dropdown-Menü das **Jahr**. Sie können das laufende Jahr oder eines der fünf vorangegangenen Jahre wählen.
2. Die Seite lädt nur die Spenden, die in diesem Jahr datiert sind (1. Januar bis 31. Dezember). Sie öffnet sich daher schnell, auch wenn Ihre Kirche viele Jahre an Gebedaten hat. Wenn Sie ein anderes Jahr wählen, wird die Übersicht mit den Spenden dieses Jahres aktualisiert. Der Bereich **Übersicht** unter dem Jahr zeigt Kennzahlen für dieses Jahr und zählt dieselben Gaben, die auch in den Bescheinigungen enthalten sind (Gaben, die nur an nicht absetzbare Fonds gingen, bleiben außen vor):
   - **Spendende insgesamt** – die Anzahl der Personen, die gegeben haben
   - **Spenden insgesamt** – die Anzahl der einzelnen Spendendatensätze
   - **Gesamtbetrag** – der kombinierte Betrag ihrer Gaben

## Bescheinigungen herunterladen {#downloading-statements}

Der Bereich **Download-Optionen** bietet zwei Möglichkeiten, Bescheinigungen an Ihre Spendenden zu übergeben:

### Als CSV-Dateien herunterladen {#download-as-csv-files}

Klicken Sie unter **Einzelne CSV-Dateien** auf **ZIP herunterladen** (die Schaltfläche zeigt die Anzahl der Dateien), um eine ZIP-Datei mit einer eigenen CSV-Datei für jeden Spendenden herunterzuladen. Das ist hilfreich, wenn Sie Bescheinigungen einzeln per E-Mail versenden oder in ein anderes System importieren möchten.

### Alle Bescheinigungen drucken {#print-all-statements}

Klicken Sie unter **Druckbare Bescheinigungen** auf **Alle drucken** (die Schaltfläche zeigt die Anzahl der Bescheinigungen), um in Ihrem Browser eine druckbare Ansicht der Bescheinigung jedes Spendenden für das gewählte Jahr zu öffnen. Von dort aus verwenden Sie die Druckfunktion Ihres Browsers, um sie an einen Drucker zu senden. Jede Bescheinigung beginnt auf einer neuen Seite, sodass sie zum Falten und Versenden bereit ist. Die Bescheinigungen sind nach Nachname und dann Vorname der Spendenden sortiert.

Wenn Sie unter [Website > Erscheinungsbild](../website/appearance.md) ein **Logo für helle Hintergründe** hochgeladen haben, wird es zentriert oben auf jeder Bescheinigung über dem Titel der Bescheinigung gedruckt. Das gilt für **Alle drucken**, für die Bescheinigung einer einzelnen Person, die aus ihrem Datensatz gedruckt wird, und für die Bescheinigungen, die Mitglieder selbst über die Seite **Spenden** von B1.church drucken.

:::tip
Erstellen Sie Ihre Bescheinigungen früh im Januar, solange Ihre Unterlagen noch aktuell sind. Prüfen Sie vor dem Erstellen genau, ob Ihre Fonds korrekt als steuerlich absetzbar markiert sind – nur Spenden an steuerlich absetzbare Fonds sind enthalten.
:::

:::info
Spendenbescheinigungen enthalten nur Spenden, die Fonds zugeordnet sind, bei denen die Einstellung **Steuerlich absetzbar** aktiviert ist. Ist ein Fonds nicht als steuerlich absetzbar markiert, erscheinen seine Spenden nicht in der Bescheinigung. Diese Einstellung verwalten Sie auf der Seite [Fonds](funds.md).
:::

## Memos zu Gaben auf den Bescheinigungen {#gift-memos-on-statements}

Jede Bescheinigung listet jede Gabe mit Datum, Art, Fonds und Betrag auf. Hat mindestens eine Gabe einer Bescheinigung ein **Memo**, wird nach dem Fonds eine Spalte **Memo** hinzugefügt, damit Spendende sehen, wofür jede Gabe bestimmt war. Bescheinigungen ohne Memos behalten das Layout mit vier Spalten. Die **Notizen** einer Gabe sind intern und erscheinen nie auf einer Bescheinigung. Die CSV-Dateien im ZIP enthalten das Memo als letzte Spalte.

Um einen Verwendungszweck auf die Bescheinigung zu bringen, geben Sie ihn beim [Erfassen der Spende](recording-donations.md) als **Memo** der Gabe ein, oder geben Sie ihm einen eigenen [Fonds](funds.md), wenn er separat summiert werden soll.

## Belegformate für Kanada, Australien und Neuseeland {#receipt-formats-for-canada-australia-and-new-zealand}

Kirchen außerhalb der Vereinigten Staaten können die Bescheinigung auf das offizielle Belegformat ihres Landes umstellen. Klicken Sie oben auf der Seite Spendenbescheinigungen auf **Bescheinigungsformat** (oder öffnen Sie unter **Einstellungen** den Bereich **Spenden**) und setzen Sie **Bescheinigungsformat** (das mit **Standard** beginnt) auf **Kanada – CRA-offizieller Beleg**, **Australien** oder **Neuseeland**. Füllen Sie dann die erscheinenden Felder aus: Ihre Registrierungsnummer (**CRA-Registrierungsnummer**, **ABN** oder **NZ-Registrierungsnummer für Wohltätigkeitsorganisationen**), **Adresse der Organisation**, **Name des Unterzeichnungsberechtigten** und für Kanada den **Ausstellungsort**. Klicken Sie auf **Speichern**.

Die Bescheinigungen enthalten dann den Wortlaut, den Ihre Steuerbehörde erwartet (für Kanada „Offizieller Beleg für Einkommensteuerzwecke“ mit dem CRA-Verweis), eine Belegnummer im Format `YEAR-DONORID`, den förderfähigen Betrag, der nur aus steuerlich absetzbaren Fonds berechnet wird, und eine eigene Zeile für Gaben an nicht absetzbare Fonds. Spendende sehen denselben Belegblock, wenn sie ihre eigene Bescheinigung über B1.church drucken.

## Was Mitglieder in B1.church sehen {#what-members-see-in-b1church}

Der gleiche Bereich **Spenden** in den Einstellungen steuert, was Mitglieder auf ihrer eigenen Gebeseite in B1.church sehen:

- **Spendenverlauf für Mitglieder** legt fest, welche Jahre Mitglieder sehen können. Standardmäßig ist **Alle Jahre** eingestellt. **Bis 2025** (oder ein anderes Jahr) beschränkt die Anzeige auf dieses Jahr, sodass Mitglieder ein späteres Jahr erst sehen oder drucken können, wenn Sie es freigeben. Damit können Sie das laufende Jahr zurückhalten, während Sie Korrekturen und Erstattungen abschließen. **Verborgen** entfernt den Spendenverlauf, die Jahressummen und das Drucken von Bescheinigungen vollständig. Mitglieder können trotzdem geben.
- **Gebehinweis** ist eine kurze Nachricht, die auf der Gebeseite und im Spendenverlauf des Mitglieds angezeigt und unten auf jeder Spendenbescheinigung gedruckt wird, einschließlich der Bescheinigungen, die Sie hier drucken. Verwenden Sie ihn für Dinge wie Ihre Erstattungsrichtlinie.

Diese Einstellungen ändern nur, was Mitglieder sehen. Sie können auf dieser Seite weiterhin jedes Jahr drucken.

## Nächste Schritte {#next-steps}

Wenn Sie Spendendetails prüfen möchten, bevor Sie Bescheinigungen erstellen, besuchen Sie die Seite [Spendenberichte](donation-reports.md) oder sehen Sie einzelne [Stapel](batches.md) an.
