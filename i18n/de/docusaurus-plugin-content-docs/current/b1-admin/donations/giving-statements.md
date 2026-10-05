---
title: "Spendennachweise"
---

# Spendennachweise

<div class="article-intro">

Am Ende jedes Jahres benötigen Ihre Spender eine Zusammenfassung ihrer steuerabzugsfähigen Spenden für ihre Aufzeichnungen. B1 Admin macht es einfach, diese Aussagen auf einmal für alle Spender zu generieren, was Ihnen Stunden manuelle Arbeit spart.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Überprüfen Sie, dass Ihre [Fonds](funds.md) korrekt als **Steuerabzugsfähig** markiert sind -- nur Spenden zu steuerabzugsfähigen Fonds erscheinen auf Aussagen
- Stellen Sie sicher, dass alle Spenden [eingetragen](recording-donations.md) wurden und alle Online-Transaktionen [aus Stripe importiert](stripe-import.md) wurden

</div>

## Zugriff auf Spendennachweise

1. In **B1 Admin** öffnen Sie das [Jump-Menü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links) und erweitern Sie **Spenden**.
2. Klicken Sie auf **Spendennachweise**.

## Aussagen generieren

1. Wählen Sie das **Jahr** aus der Dropdown-Liste oben auf der Seite aus. Sie können das aktuelle Jahr oder eines der fünf vorherigen Jahre wählen.
2. Die Seite zeigt Zusammenfassungsstatistiken für dieses Jahr an, einschließlich:
   - **Gesamtspender** -- die Anzahl der Personen, die gegeben haben
   - **Gesamtspenden** -- die Anzahl der einzelnen Spendendatensätze
   - **Gesamtbetrag** -- der kombinierte Dollarbetrag aller Spenden

## Aussagen herunterladen

Sie haben zwei Optionen, um Aussagen an Ihre Spender zu bekommen:

### Als CSV-Dateien herunterladen

Klicken Sie auf **ZIP herunterladen**, um eine ZIP-Datei mit einer einzelnen CSV-Datei für jeden Spender herunterzuladen. Dies ist nützlich, wenn Sie Aussagen einzeln per E-Mail versenden oder in ein anderes System importieren möchten.

### Alle Aussagen drucken

Klicken Sie auf **Alle drucken**, um eine druckbare Ansicht jeder Spender-Aussage in Ihrem Browser zu öffnen. Von dort aus verwenden Sie die Druckfunktion Ihres Browsers, um sie an einen Drucker zu senden. Jede Aussage wird auf einer neuen Seite begonnen, damit sie bereit zum Falten und Verschicken sind.

:::tip
Führen Sie Ihre Aussagen Anfang Januar aus, während Ihre Aufzeichnungen frisch sind. Überprüfen Sie doppelt, dass Ihre Fonds korrekt als steuerabzugsfähig markiert sind, bevor Sie Aussagen generieren -- nur Spenden zu steuerabzugsfähigen Fonds sind enthalten.
:::

:::info
Spendennachweise enthalten nur Spenden, die Fonds zugewiesen werden, bei denen die Einstellung **Steuerabzugsfähig** aktiviert ist. Wenn ein Fonds nicht als steuerabzugsfähig markiert ist, werden seine Spenden nicht auf der Aussage angezeigt. Sie können diese Einstellung auf der Seite [Fonds](funds.md) verwalten.
:::

## Empfangsformate für Kanada, Australien und Neuseeland

Kirchen außerhalb der Vereinigten Staaten können die Aussage zu ihrer offiziellen Länder-Empfangsvorlage wechseln. Gehen Sie zu **Einstellungen**, öffnen Sie den Bereich **Spenden** und legen Sie **Aussage-Format** auf **Kanada**, **Australien** oder **Neuseeland** fest, füllen Sie dann die Felder aus, die erscheinen: Ihre Registrierungsnummer (CRA-Registrierungsnummer, ABN oder NZ-Wohltätigkeitsregistrierungsnummer), Ihre Organisations-Adresse, der Name der Person, die authorisiert ist, Empfänge zu signieren, und für Kanada die Stadt, in der Empfänge ausgegeben werden.

Aussagen tragen dann die Formulierung, die Ihre Steuerbehörde erwartet (für Kanada, „Offizieller Empfang für Einkommensteuerzwecke" mit der CRA-Referenz), eine Empfängsnummer in der Form `JAHR-SPENDERID`, den berechtigten Betrag, der nur aus steuerabzugsfähigen Fonds zählt, und eine separate Zeile für alle Geschenke zu nicht abzugsfähigen Fonds. Spender sehen den gleichen Empfangs-Block, wenn sie ihre eigene Aussage von B1.church drucken.

## Nächste Schritte

Wenn Sie Spendendetails vor der Generierung von Aussagen überprüfen müssen, besuchen Sie die Seite [Spendenbericht](donation-reports.md) oder überprüfen Sie einzelne [Bündel](batches.md).
