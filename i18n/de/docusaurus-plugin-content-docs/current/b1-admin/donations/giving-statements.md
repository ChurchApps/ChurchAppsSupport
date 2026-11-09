---
title: "Spendenbescheinigungen"
description: "Jährliche Spendenbescheinigungen für alle Spendenden in B1 Admin erstellen und anschließend als CSV-Dateien herunterladen oder mit steuerlich absetzbaren Summen zum Versand drucken."
---

# Spendenbescheinigungen

<div class="article-intro">

Am Ende jedes Jahres benötigen Ihre Spendenden eine Zusammenfassung ihrer steuerlich absetzbaren Spenden für ihre Unterlagen. B1 Admin macht es einfach, diese Bescheinigungen für alle Spendenden auf einmal zu erstellen. Das spart Stunden manueller Arbeit.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Prüfen Sie, ob Ihre [Fonds](funds.md) korrekt als **Steuerlich absetzbar** markiert sind. Nur Spenden an steuerlich absetzbare Fonds erscheinen auf den Bescheinigungen.
- Stellen Sie sicher, dass alle Spenden [erfasst](recording-donations.md) sind und alle Online-Transaktionen [aus Stripe importiert](stripe-import.md) wurden.

</div>

## Spendenbescheinigungen öffnen

1. Öffnen Sie in **B1 Admin** das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links) und klappen Sie **Spenden** auf.
2. Klicken Sie auf **Spendenbescheinigungen**. Die Seite **Spendenbescheinigungen im Stapel** öffnet sich.

## Bescheinigungen erstellen

1. Wählen Sie im Bereich **Jahr auswählen** im Dropdown-Menü das **Jahr** aus. Sie können das aktuelle Jahr oder eines der fünf vorangegangenen Jahre wählen.
2. Die Seite lädt nur die Spenden, die in diesem Jahr (vom 1. Januar bis zum 31. Dezember) datiert sind. Dadurch öffnet sie sich schnell, auch wenn Ihre Gemeinde eine lange Spendenhistorie hat. Wenn Sie ein anderes Jahr wählen, wird die Übersicht mit den Spenden dieses Jahres aktualisiert. Der Bereich **Übersicht** unterhalb des Jahres zeigt Kennzahlen für dieses Jahr, darunter:
   - **Spendende insgesamt** -- die Anzahl der Personen, die gespendet haben
   - **Spenden insgesamt** -- die Anzahl der einzelnen Spendenbuchungen
   - **Gesamtbetrag** -- die Summe aller Spenden in Euro bzw. der Währung Ihrer Gemeinde

## Bescheinigungen herunterladen

Der Bereich **Download-Optionen** bietet zwei Möglichkeiten, Bescheinigungen an Ihre Spendenden zu bringen:

### Als CSV-Dateien herunterladen

Klicken Sie unter **Einzelne CSV-Dateien** auf **ZIP herunterladen**. Sie erhalten eine ZIP-Datei mit einer eigenen CSV-Datei für jede spendende Person. Das ist nützlich, wenn Sie Bescheinigungen einzeln per E-Mail versenden oder in ein anderes System importieren möchten.

### Alle Bescheinigungen drucken

Klicken Sie unter **Druckbare Bescheinigungen** auf **Alle drucken** (die Schaltfläche zeigt die Anzahl der Bescheinigungen). Im Browser öffnet sich eine druckbare Ansicht aller Bescheinigungen für das gewählte Jahr. Von dort aus drucken Sie über die Druckfunktion Ihres Browsers. Jede Bescheinigung beginnt auf einer neuen Seite, sodass sie zum Falten und Versenden bereit ist. Die Bescheinigungen sind nach Nachname und dann Vorname der spendenden Person sortiert.

Wenn Sie unter [Website > Erscheinungsbild](../website/appearance.md) ein **Logo für helle Hintergründe** hochgeladen haben, wird es zentriert oben auf jeder Bescheinigung über dem Titel gedruckt. Dies gilt für **Alle drucken**, für die Bescheinigung einer einzelnen spendenden Person, die aus ihrem Datensatz gedruckt wird, und für die Bescheinigungen, die Mitglieder selbst über die Seite **Spenden** auf B1.church drucken.

:::tip
Erstellen Sie Ihre Bescheinigungen früh im Januar, solange die Unterlagen noch frisch sind. Prüfen Sie vor dem Erstellen unbedingt noch einmal, ob Ihre Fonds korrekt als steuerlich absetzbar markiert sind. Nur Spenden an steuerlich absetzbare Fonds werden berücksichtigt.
:::

:::info
Spendenbescheinigungen enthalten nur Spenden, die Fonds mit aktivierter Einstellung **Steuerlich absetzbar** zugeordnet sind. Ist ein Fonds nicht als steuerlich absetzbar markiert, erscheinen seine Spenden nicht auf der Bescheinigung. Diese Einstellung verwalten Sie auf der Seite [Fonds](funds.md).
:::

## Belegformate für Kanada, Australien und Neuseeland

Gemeinden außerhalb der Vereinigten Staaten können die Bescheinigung auf das offizielle Belegformat ihres Landes umstellen. Klicken Sie oben auf der Seite Spendenbescheinigungen auf **Bescheinigungsformat** (oder öffnen Sie unter **Einstellungen** den Bereich **Spenden**). Stellen Sie **Bescheinigungsformat** auf **Kanada**, **Australien** oder **Neuseeland** ein und füllen Sie anschließend die erscheinenden Felder aus: Ihre Registrierungsnummer (CRA-Registrierungsnummer, ABN oder Registrierungsnummer der neuseeländischen Wohltätigkeitsorganisation), die Adresse Ihrer Organisation, den Namen der Person, die Belege unterschreiben darf, und für Kanada die Stadt, in der die Belege ausgestellt werden.

Die Bescheinigungen enthalten dann den Wortlaut, den Ihre Steuerbehörde erwartet (für Kanada „Official Receipt for Income Tax Purposes“ mit dem CRA-Verweis). Außerdem enthalten sie eine Belegnummer im Format `JAHR-SPENDERID`, den förderfähigen Betrag, der nur aus steuerlich absetzbaren Fonds berechnet wird, und eine eigene Zeile für Gaben an nicht absetzbare Fonds. Spendende sehen denselben Belegblock, wenn sie ihre eigene Bescheinigung über B1.church drucken.

## Was Mitglieder in B1.church sehen {#what-members-see-in-b1church}

Derselbe Bereich **Spenden** in den Einstellungen bestimmt, was Mitglieder auf ihrer eigenen Spendenseite in B1.church sehen:

- **Spendenverlauf der Mitglieder** legt fest, welche Jahre Mitglieder sehen können. Standardmäßig sind **Alle Jahre** eingestellt. Bei **Bis 2025** (oder einem anderen Jahr) endet die Anzeige bei diesem Jahr, sodass Mitglieder ein späteres Jahr erst dann einsehen oder drucken können, wenn Sie es freigeben. Damit können Sie das laufende Jahr zurückhalten, während Sie Korrekturen und Rückerstattungen abschließen. **Ausgeblendet** entfernt den Spendenverlauf, die Jahressummen und den Druck von Bescheinigungen vollständig. Mitglieder können weiterhin spenden.
- **Hinweis zu Spenden** ist eine kurze Nachricht, die auf der Spendenseite und im Spendenverlauf des Mitglieds angezeigt und unten auf jeder Spendenbescheinigung gedruckt wird, auch auf den Bescheinigungen, die Sie hier drucken. Verwenden Sie sie zum Beispiel für Ihre Rückerstattungsrichtlinie.

Diese Einstellungen ändern nur, was Mitglieder sehen. Sie können auf dieser Seite weiterhin jedes Jahr drucken.

## Nächste Schritte

Wenn Sie Spendendetails vor dem Erstellen der Bescheinigungen prüfen möchten, besuchen Sie die Seite [Spendenberichte](donation-reports.md) oder sehen Sie sich einzelne [Stapel](batches.md) an.
