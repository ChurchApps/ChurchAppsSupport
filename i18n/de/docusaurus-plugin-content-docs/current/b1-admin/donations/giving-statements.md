---
title: "Spendenbescheinigungen"
---

# Spendenbescheinigungen

<div class="article-intro">

Am Ende jedes Jahres benötigen Ihre Geber eine Zusammenfassung ihrer steuerlich absetzbaren Spenden für ihre Unterlagen. B1 Admin macht es einfach, diese Bescheinigungen für alle Geber auf einmal zu erstellen, und spart Ihnen so viele Stunden manueller Arbeit.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Prüfen Sie, ob Ihre [Fonds](funds.md) korrekt als **Steuerlich absetzbar** markiert sind -- nur Spenden an steuerlich absetzbare Fonds erscheinen auf den Bescheinigungen.
- Stellen Sie sicher, dass alle Spenden [erfasst](recording-donations.md) und alle Online-Transaktionen [aus Stripe importiert](stripe-import.md) wurden.

</div>

## Spendenbescheinigungen aufrufen

1. Öffnen Sie in **B1 Admin** das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links) und klappen Sie **Spenden** auf.
2. Klicken Sie auf **Spendenbescheinigungen**. Die Seite **Stapel-Spendenbescheinigungen** öffnet sich.

## Bescheinigungen erstellen

1. Wählen Sie im Bereich **Jahr auswählen** das **Jahr** im Dropdown-Menü aus. Sie können das laufende Jahr oder eines der fünf vorhergehenden Jahre wählen.
2. Die Seite lädt nur die Spenden, die in diesem Jahr datiert sind (1. Januar bis 31. Dezember), sodass sie schnell öffnet, auch wenn Ihre Kirche viele Jahre an Giving-Historie hat. Wenn Sie ein anderes Jahr wählen, aktualisiert sich die Zusammenfassung mit den Spenden dieses Jahres. Der Bereich **Übersicht** unterhalb des Jahres zeigt Kennzahlen für dieses Jahr, darunter:
   - **Geber gesamt** -- die Anzahl der Personen, die gegeben haben
   - **Spenden gesamt** -- die Anzahl der einzelnen Spendendatensätze
   - **Gesamtbetrag** -- der Gesamtbetrag aller Gaben

## Bescheinigungen herunterladen

Der Bereich **Download-Optionen** bietet zwei Möglichkeiten, Bescheinigungen an Ihre Geber zu bringen:

### Als CSV-Dateien herunterladen

Klicken Sie unter **Einzelne CSV-Dateien** auf **ZIP herunterladen**, um eine ZIP-Datei mit einer CSV-Datei pro Geber herunterzuladen. Das ist nützlich, wenn Sie Bescheinigungen einzeln per E-Mail versenden oder in ein anderes System importieren möchten.

### Alle Bescheinigungen drucken

Klicken Sie unter **Druckbare Bescheinigungen** auf **Alle drucken** (die Schaltfläche zeigt die Anzahl der Bescheinigungen an), um eine druckbare Ansicht aller Bescheinigungen der Geber für das gewählte Jahr in Ihrem Browser zu öffnen. Von dort aus verwenden Sie die Druckfunktion Ihres Browsers, um sie an einen Drucker zu senden. Jede Bescheinigung beginnt auf einer neuen Seite, sodass sie zum Falten und Versenden bereit ist. Die Bescheinigungen sind nach Nachnamen und dann Vornamen der Geber sortiert.

Haben Sie unter [Website > Erscheinungsbild](../website/appearance.md) ein **Logo für helle Hintergründe** hochgeladen, wird es zentriert oben auf jeder Bescheinigung über dem Titel gedruckt. Dies gilt sowohl für **Alle drucken** als auch für die Bescheinigung eines einzelnen Gebers, die über dessen Datensatz gedruckt wird.

:::tip
Erstellen Sie Ihre Bescheinigungen früh im Januar, solange Ihre Unterlagen noch frisch sind. Prüfen Sie vor dem Erstellen unbedingt, ob Ihre Fonds korrekt als steuerlich absetzbar markiert sind -- nur Spenden an steuerlich absetzbare Fonds werden berücksichtigt.
:::

:::info
Spendenbescheinigungen enthalten nur Spenden, die Fonds zugeordnet sind, für die die Einstellung **Steuerlich absetzbar** aktiviert ist. Ist ein Fonds nicht als steuerlich absetzbar markiert, erscheinen seine Spenden nicht auf der Bescheinigung. Diese Einstellung verwalten Sie auf der Seite [Fonds](funds.md).
:::

## Belegformate für Kanada, Australien und Neuseeland

Kirchen außerhalb der Vereinigten Staaten können die Bescheinigung auf das offizielle Belegformat ihres Landes umstellen. Klicken Sie oben auf der Seite Spendenbescheinigungen auf **Bescheinigungsformat** (oder gehen Sie zu **Einstellungen** und öffnen Sie den Bereich **Giving**), und setzen Sie **Bescheinigungsformat** auf **Kanada**, **Australien** oder **Neuseeland**. Füllen Sie dann die angezeigten Felder aus: Ihre Registrierungsnummer (CRA-Registrierungsnummer, ABN oder NZ-Registrierungsnummer für gemeinnützige Organisationen), die Adresse Ihrer Organisation, den Namen der Person, die Belege unterzeichnen darf, und für Kanada die Stadt, in der Belege ausgestellt werden.

Die Bescheinigungen enthalten dann den Wortlaut, den Ihre Steuerbehörde erwartet (für Kanada "Offizieller Beleg für Zwecke der Einkommensteuer" mit der CRA-Referenz), eine Belegnummer im Format `JAHR-SPENDERID`, den anrechenbaren Betrag, der nur aus steuerlich absetzbaren Fonds berechnet wird, und eine separate Zeile für Gaben an nicht absetzbare Fonds. Geber sehen denselben Belegblock, wenn sie ihre eigene Bescheinigung über B1.church ausdrucken.

## Was Mitglieder auf B1.church sehen

Der gleiche Bereich **Giving** in den Einstellungen steuert, was Mitglieder auf ihrer eigenen Giving-Seite in B1.church sehen:

- **Giving-Historie für Mitglieder** legt fest, welche Jahre Mitglieder sehen können. **Alle Jahre** ist die Standardeinstellung. **Bis 2025** (oder ein anderes Jahr) endet bei diesem Jahr, sodass Mitglieder ein späteres Jahr erst sehen oder drucken können, wenn Sie es freigeben. Nutzen Sie dies, um das laufende Jahr zurückzuhalten, während Sie Korrekturen und Erstattungen abschließen. **Ausgeblendet** entfernt die Giving-Historie, die Jahressummen und das Drucken von Bescheinigungen vollständig. Mitglieder können weiterhin geben.
- **Giving-Hinweis** ist eine kurze Nachricht, die auf der Giving-Seite des Mitglieds und in der Giving-Historie angezeigt und unten auf jeder Spendenbescheinigung gedruckt wird, auch auf den Bescheinigungen, die Sie hier drucken. Nutzen Sie ihn für Dinge wie Ihre Erstattungsrichtlinie.

Diese Einstellungen ändern nur, was Mitglieder sehen. Sie können auf dieser Seite weiterhin jedes Jahr drucken.

## Nächste Schritte

Wenn Sie Spendendetails prüfen möchten, bevor Sie Bescheinigungen erstellen, besuchen Sie die Seite [Spendenberichte](donation-reports.md) oder prüfen Sie einzelne [Stapel](batches.md).
