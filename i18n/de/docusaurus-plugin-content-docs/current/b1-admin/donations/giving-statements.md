---
title: "Spendenbescheinigungen"
---

# Spendenbescheinigungen

<div class="article-intro">

Am Ende jedes Jahres benötigen Ihre Geber eine Übersicht ihrer steuerlich absetzbaren Spenden für ihre Unterlagen. B1 Admin macht es einfach, diese Bescheinigungen für alle Geber auf einmal zu erstellen, und spart Ihnen viele Stunden manueller Arbeit.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Prüfen Sie, ob Ihre [Fonds](funds.md) korrekt als **Steuerlich absetzbar** markiert sind – nur Spenden an steuerlich absetzbare Fonds erscheinen auf den Bescheinigungen
- Stellen Sie sicher, dass alle Spenden [erfasst](recording-donations.md) und alle Online-Transaktionen [aus Stripe importiert](stripe-import.md) wurden

</div>

## Spendenbescheinigungen aufrufen

1. Öffnen Sie in **B1 Admin** das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (das Suchfeld oben links) und klappen Sie **Spenden** auf.
2. Klicken Sie auf **Spendenbescheinigungen**. Die Seite **Stapelweise Spendenbescheinigungen** öffnet sich.

## Bescheinigungen erstellen

1. Wählen Sie im Bereich **Jahr auswählen** im Auswahlmenü das **Jahr** aus. Sie können das laufende Jahr oder eines der fünf vorangegangenen Jahre wählen.
2. Die Seite lädt nur die Spenden mit einem Datum in diesem Jahr (1. Januar bis 31. Dezember). Dadurch öffnet sie sich schnell, selbst wenn Ihre Gemeinde eine lange Spendenhistorie hat. Wenn Sie ein anderes Jahr wählen, aktualisiert sich die Übersicht mit den Spenden dieses Jahres. Der Bereich **Übersicht** unterhalb des Jahres zeigt Kennzahlen für dieses Jahr, darunter:
   - **Geber insgesamt** – die Anzahl der Personen, die gegeben haben
   - **Spenden insgesamt** – die Anzahl der einzelnen Spendendatensätze
   - **Gesamtbetrag** – der gesamte Betrag aller Gaben in Euro

## Bescheinigungen herunterladen

Der Bereich **Downloadoptionen** bietet zwei Möglichkeiten, Bescheinigungen an Ihre Geber zu bringen:

### Als CSV-Dateien herunterladen

Klicken Sie unter **Einzelne CSV-Dateien** auf **ZIP herunterladen**, um eine ZIP-Datei mit einer eigenen CSV-Datei für jeden Geber zu laden. Das ist nützlich, wenn Sie Bescheinigungen einzeln per E-Mail versenden oder in ein anderes System importieren möchten.

### Alle Bescheinigungen drucken

Klicken Sie unter **Druckbare Bescheinigungen** auf **Alle drucken** (die Schaltfläche zeigt die Anzahl der Bescheinigungen an). So öffnen Sie in Ihrem Browser eine druckbare Ansicht der Bescheinigung jedes Gebers für das gewählte Jahr. Verwenden Sie dann die Druckfunktion Ihres Browsers, um sie an einen Drucker zu senden. Jede Bescheinigung beginnt auf einer neuen Seite, sodass sie zum Falten und Versenden bereit ist. Die Bescheinigungen sind nach Nachname und anschließend Vorname des Gebers sortiert.

Wenn Sie unter [Website > Erscheinungsbild](../website/appearance.md) ein **Logo für helle Hintergründe** hochgeladen haben, wird es zentriert oben auf jeder Bescheinigung gedruckt, über dem Titel der Bescheinigung. Das gilt sowohl für **Alle drucken** als auch für die Bescheinigung eines einzelnen Gebers, die aus dessen Datensatz gedruckt wird.

:::tip
Erstellen Sie Ihre Bescheinigungen früh im Januar, solange die Unterlagen noch frisch sind. Prüfen Sie vor dem Erstellen unbedingt, ob Ihre Fonds korrekt als steuerlich absetzbar markiert sind – nur Spenden an steuerlich absetzbare Fonds werden berücksichtigt.
:::

:::info
Spendenbescheinigungen enthalten nur Spenden, die Fonds mit aktivierter Einstellung **Steuerlich absetzbar** zugeordnet sind. Ist ein Fonds nicht als steuerlich absetzbar markiert, erscheinen seine Spenden nicht auf der Bescheinigung. Diese Einstellung verwalten Sie auf der Seite [Fonds](funds.md).
:::

## Quittungsformate für Kanada, Australien und Neuseeland

Gemeinden außerhalb der Vereinigten Staaten können die Bescheinigung auf das offizielle Quittungsformat ihres Landes umstellen. Klicken Sie oben auf der Seite Spendenbescheinigungen auf **Bescheinigungsformat** (oder öffnen Sie **Einstellungen** und den Bereich **Spenden**). Setzen Sie **Bescheinigungsformat** auf **Kanada**, **Australien** oder **Neuseeland** und füllen Sie anschließend die eingeblendeten Felder aus: Ihre Registrierungsnummer (CRA-Registrierungsnummer, ABN oder NZ-Registrierungsnummer für Wohltätigkeitsorganisationen), die Anschrift Ihrer Organisation, den Namen der Person, die berechtigt ist, Quittungen zu unterzeichnen, und für Kanada den Ort, an dem Quittungen ausgestellt werden.

Die Bescheinigungen enthalten dann den Wortlaut, den Ihre Steuerbehörde erwartet (für Kanada „Official Receipt for Income Tax Purposes“ mit der CRA-Referenz), eine Quittungsnummer im Format `YEAR-DONORID`, den berücksichtigungsfähigen Betrag, der nur aus steuerlich absetzbaren Fonds stammt, und eine eigene Zeile für Gaben an nicht absetzbare Fonds. Geber sehen denselben Quittungsblock, wenn sie ihre eigene Bescheinigung über B1.church drucken.

## Nächste Schritte

Wenn Sie Spendendetails prüfen möchten, bevor Sie Bescheinigungen erstellen, besuchen Sie die Seite [Spendenberichte](donation-reports.md) oder sehen Sie die einzelnen [Stapel](batches.md) durch.
