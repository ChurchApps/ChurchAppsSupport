---
title: "Spendendbestätigungen"
---

# Spendendbestätigungen

<div class="article-intro">

Am Ende jedes Jahres brauchen deine Spender eine Zusammenfassung ihrer steuerabzugsfähigen Spenden für ihre Aufzeichnungen. B1 Admin macht es dir leicht, diese Bestätigungen für alle Spender auf einmal zu generieren und spart dir Stunden manueller Arbeit.

</div>

<div class="prereqs">
<h4>Bevor du beginnst</h4>

- Überprüfe, dass deine [Fonds](funds.md) korrekt als **Steuerabzugsfähig** markiert sind -- nur Spenden zu steuerabzugsfähigen Fonds erscheinen auf Bestätigungen
- Stelle sicher, dass alle Spenden [aufgezeichnet](recording-donations.md) wurden und alle Online-Transaktionen [aus Stripe importiert](stripe-import.md) wurden

</div>

## Zugriff auf Spendendbestätigungen

1. In **B1 Admin** öffne das **Menü „Bereich"** in der oberen linken Ecke und wähle **Spenden**.
2. Klicke auf **Bestätigungen**.

## Generierung von Bestätigungen

1. Wähle das **Jahr** aus der Dropdown-Liste oben auf der Seite. Du kannst das aktuelle Jahr oder eines der fünf vorherigen Jahre wählen.
2. Die Seite zeigt Zusammenfassungsstatistiken für dieses Jahr, einschließlich:
   - **Gesamtspender** -- die Anzahl der Personen, die spendeten
   - **Gesamtspenden** -- die Anzahl der einzelnen Spendendatensätze
   - **Gesamtbetrag** -- der kombinierte Dollarbetrag aller Spenden

## Bestätigungen herunterladen

Du hast zwei Optionen, um Bestätigungen zu deinen Spendern zu bringen:

### Download als CSV-Dateien

Klicke auf **ZIP herunterladen**, um eine ZIP-Datei mit einer einzelnen CSV-Datei für jeden Spender herunterzuladen. Dies ist nützlich, wenn du Bestätigungen einzeln per E-Mail versenden oder in ein anderes System importieren möchtest.

### Alle Bestätigungen drucken

Klicke auf **Alle drucken**, um eine druckbare Ansicht der Bestätigung jedes Spenders in deinem Browser zu öffnen. Verwende dann die Druckfunktion deines Browsers, um sie an einen Drucker zu senden. Jede Bestätigung beginnt auf einer neuen Seite, so dass sie bereit zum Falten und Verschicken sind.

:::tip
Führe deine Bestätigungen früh im Januar aus, während deine Aufzeichnungen noch frisch sind. Überprüfe nochmals, dass deine Fonds korrekt als steuerabzugsfähig markiert sind, bevor du Bestätigungen generierst -- nur Spenden zu steuerabzugsfähigen Fonds sind enthalten.
:::

:::info
Spendendbestätigungen enthalten nur Spenden, die Fonds zugeordnet sind, für die die Einstellung **Steuerabzugsfähig** aktiviert ist. Wenn ein Fonds nicht als steuerabzugsfähig markiert ist, werden seine Spenden nicht auf der Bestätigung angezeigt. Du kannst diese Einstellung auf der Seite [Fonds](funds.md) verwalten.
:::

## Belegformate für Kanada, Australien und Neuseeland

Kirchen außerhalb der Vereinigten Staaten können die Bestätigung in das offizielle Beleglayout ihres Landes wechseln. Gehe zu **Einstellungen**, öffne den Abschnitt **Spenden** und stelle **Bestätigungsformat** auf **Kanada**, **Australien** oder **Neuseeland** ein, dann fülle die angezeigten Felder aus: deine Registrierungsnummer (CRA-Registrierungsnummer, ABN oder neuseeländische Wohltätigkeitsregistrierungsnummer), die Adresse deiner Organisation, den Namen der Person, die zum Signieren von Belegen berechtigt ist, und für Kanada die Stadt, in der Belege ausgestellt werden.

Bestätigungen tragen dann den Wortlaut, den deine Steuerbehörde erwartet (für Kanada „Official Receipt for Income Tax Purposes" mit CRA-Verweis), eine Belegunummer in Form `YEAR-DONORID`, den zulässigen Betrag, der nur von steuerabzugsfähigen Fonds gezählt wird, und eine separate Zeile für alle Geschenke an nicht steuerabzugsfähige Fonds. Spender sehen denselben Belegblock, wenn sie ihre eigene Bestätigung aus B1.church drucken.

## Nächste Schritte

Wenn du Spendenddetails überprüfen musst, bevor du Bestätigungen generierst, besuche die Seite [Spendendberichte](donation-reports.md) oder überprüfe einzelne [Chargen](batches.md).
