---
title: "Spendenbescheinigungen"
---

# Spendenbescheinigungen

<div class="article-intro">

Am Ende jedes Jahres benötigen Ihre Spender eine Übersicht über ihre steuerlich absetzbaren Spenden für ihre Unterlagen. B1 Admin erleichtert es, diese Bescheinigungen für alle Spender auf einmal zu erstellen, und spart Ihnen so viele Stunden manueller Arbeit.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Prüfen Sie, ob Ihre [Fonds](funds.md) korrekt als **Steuerlich absetzbar** markiert sind – nur Spenden an steuerlich absetzbare Fonds erscheinen auf den Bescheinigungen.
- Stellen Sie sicher, dass alle Spenden [erfasst](recording-donations.md) sind und alle Online-Transaktionen [aus Stripe importiert](stripe-import.md) wurden.

</div>

## Spendenbescheinigungen aufrufen

1. Öffnen Sie in **B1 Admin** das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (das Suchfeld oben links) und klappen Sie **Spenden** auf.
2. Klicken Sie auf **Spendenbescheinigungen**. Die Seite **Spendenbescheinigungen im Stapel** öffnet sich.

## Bescheinigungen erstellen

1. Wählen Sie im Bereich **Jahr auswählen** über das Auswahlmenü das **Jahr** aus. Sie können das aktuelle Jahr oder eines der fünf vorangegangenen Jahre wählen.
2. Die Seite lädt nur die Spenden, die in diesem Jahr datiert sind (vom 1. Januar bis zum 31. Dezember). Dadurch öffnet sie sich schnell, auch wenn Ihre Kirche eine lange Spendenhistorie hat. Wenn Sie ein anderes Jahr wählen, wird die Zusammenfassung mit den Spenden dieses Jahres aktualisiert. Der Bereich **Zusammenfassung** unter dem Jahr zeigt Kennzahlen für dieses Jahr, darunter:
   - **Spender gesamt** – die Anzahl der Personen, die gespendet haben
   - **Spenden gesamt** – die Anzahl der einzelnen Spendenbuchungen
   - **Betrag gesamt** – die Summe aller Spenden

## Bescheinigungen herunterladen

Der Bereich **Downloadoptionen** bietet zwei Möglichkeiten, Bescheinigungen an Ihre Spender weiterzugeben:

### Als CSV-Dateien herunterladen

Klicken Sie unter **Einzelne CSV-Dateien** auf **ZIP herunterladen**, um eine ZIP-Datei mit einer eigenen CSV-Datei für jeden Spender zu erhalten. Das ist hilfreich, wenn Sie Bescheinigungen einzeln per E-Mail versenden oder in ein anderes System importieren möchten.

### Alle Bescheinigungen drucken

Klicken Sie unter **Druckbare Bescheinigungen** auf **Alle drucken** (die Schaltfläche zeigt die Anzahl der Bescheinigungen an), um in Ihrem Browser eine druckbare Ansicht aller Bescheinigungen für das gewählte Jahr zu öffnen. Von dort aus verwenden Sie die Druckfunktion Ihres Browsers, um sie an einen Drucker zu senden. Jede Bescheinigung beginnt auf einer neuen Seite, sodass sie zum Falten und Versenden bereit ist. Die Bescheinigungen sind nach Nachnamen und dann Vornamen des Spenders sortiert.

Wenn Sie unter [Website > Erscheinungsbild](../website/appearance.md) ein **Logo für helle Hintergründe** hochgeladen haben, wird es mittig oben auf jeder Bescheinigung über dem Titel gedruckt. Das gilt sowohl für **Alle drucken** als auch für die Bescheinigung eines einzelnen Spenders, die aus seinem Datensatz gedruckt wird.

:::tip
Erstellen Sie Ihre Bescheinigungen früh im Januar, solange die Datensätze noch aktuell sind. Prüfen Sie vor dem Erstellen unbedingt noch einmal, ob Ihre Fonds korrekt als steuerlich absetzbar markiert sind – nur Spenden an steuerlich absetzbare Fonds werden berücksichtigt.
:::

:::info
Spendenbescheinigungen enthalten nur Spenden, die Fonds zugeordnet sind, bei denen die Einstellung **Steuerlich absetzbar** aktiviert ist. Ist ein Fonds nicht als steuerlich absetzbar markiert, erscheinen seine Spenden nicht auf der Bescheinigung. Sie können diese Einstellung auf der Seite [Fonds](funds.md) verwalten.
:::

## Belegformate für Kanada, Australien und Neuseeland

Kirchen außerhalb der Vereinigten Staaten können die Bescheinigung auf das offizielle Belegformat ihres Landes umstellen. Klicken Sie oben auf der Seite Spendenbescheinigungen auf **Bescheinigungsformat** (oder öffnen Sie unter **Einstellungen** den Bereich **Spenden**) und stellen Sie **Bescheinigungsformat** auf **Kanada**, **Australien** oder **Neuseeland** ein. Füllen Sie anschließend die erscheinenden Felder aus: Ihre Registrierungsnummer (CRA-Registrierungsnummer, ABN oder neuseeländische Wohltätigkeitsregistrierungsnummer), die Anschrift Ihrer Organisation, den Namen der Person, die zur Unterzeichnung von Belegen berechtigt ist, und für Kanada die Stadt, in der Belege ausgestellt werden.

Die Bescheinigungen enthalten dann den Wortlaut, den Ihre Steuerbehörde erwartet (für Kanada „Official Receipt for Income Tax Purposes“ mit der CRA-Referenz), eine Belegnummer in der Form `YEAR-DONORID`, den anrechnungsfähigen Betrag, der nur aus steuerlich absetzbaren Fonds stammt, sowie eine eigene Zeile für Zuwendungen an nicht absetzbare Fonds. Spender sehen denselben Belegblock, wenn sie ihre eigene Bescheinigung über B1.church drucken.

## Was Mitglieder in B1.church sehen {#what-members-see-in-b1church}

Der gleiche Bereich **Spenden** in den Einstellungen steuert, was Mitglieder auf ihrer eigenen Spendenseite in B1.church sehen:

- **Spendenhistorie der Mitglieder** legt fest, welche Jahre Mitglieder sehen können. **Alle Jahre** ist die Standardeinstellung. **Bis 2025** (oder ein anderes Jahr) endet an diesem Jahr, sodass Mitglieder ein späteres Jahr erst dann einsehen oder drucken können, wenn Sie es freigeben. Nutzen Sie dies, um das laufende Jahr zurückzuhalten, während Sie Korrekturen und Rückerstattungen abschließen. **Ausgeblendet** entfernt die Spendenhistorie, die Jahressummen und den Druck von Bescheinigungen vollständig. Mitglieder können weiterhin spenden.
- **Hinweis zu Spenden** ist eine kurze Mitteilung, die auf der Spendenseite des Mitglieds und in der Spendenhistorie angezeigt und unten auf jeder Spendenbescheinigung gedruckt wird – einschließlich der Bescheinigungen, die Sie hier drucken. Verwenden Sie sie etwa für Informationen zu Ihrer Rückerstattungsrichtlinie.

Diese Einstellungen ändern nur, was Mitglieder sehen. Sie können auf dieser Seite weiterhin jedes Jahr drucken.

## Nächste Schritte

Wenn Sie Spendendetails prüfen möchten, bevor Sie Bescheinigungen erstellen, besuchen Sie die Seite [Spendenberichte](donation-reports.md) oder sehen Sie sich einzelne [Stapel](batches.md) an.
