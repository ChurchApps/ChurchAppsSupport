---
title: "Spendenbericht"
---

# Spendenbericht

<div class="article-intro">

B1 Admin bietet Ihnen mehrere Möglichkeiten, die Spendendaten Ihrer Kirche anzuzeigen und zu analysieren. Das Spenden-Dashboard auf der Seite **Zusammenfassung** bietet einen visuellen Überblick mit Diagrammen und Filtern, während der Berichts-Bereich einen detaillierteren Spendenübersichts-Bericht bietet. Verwenden Sie diese Werkzeuge, um Spenden-Trends zu verfolgen, sich auf Board-Meetings vorzubereiten oder Ihre Aufzeichnungen abzustimmen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Stellen Sie sicher, dass Spenden [in Bündel eingetragen](recording-donations.md) oder [aus Stripe importiert](stripe-import.md) wurden
- Überprüfen Sie, dass Ihre [Fonds](funds.md) korrekt eingerichtet sind, damit Spenden richtig kategorisiert werden

</div>

## Spenden-Dashboard

Das Spenden-Dashboard ist die Registerkarte **Dashboard** der Seite **Zusammenfassung**, die erste Seite, wenn Sie den Bereich **Spenden** öffnen.

1. Öffnen Sie das [Jump-Menü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links in B1 Admin), erweitern Sie **Spenden** und klicken Sie auf **Zusammenfassung**. Die Seite **Zusammenfassung** öffnet sich auf der Registerkarte **Dashboard**.
2. Verwenden Sie die Umschalter **Wöchentlich**, **Monatlich** und **Vierteljährlich** über dem Bericht, um zu wählen, wie Spenden gruppiert werden.
3. In dem Panel **Bericht filtern** legen Sie das **Startdatum** und **Enddatum** fest (standardmäßig das letzte Jahr bis gestern) und wählen Sie optional einen **Fonds** aus, dann klicken Sie auf **Bericht ausführen**. Der Bericht läuft automatisch mit den Standardeinstellungen, wenn die Seite öffnet.
4. Vier **KPI-Karten** zeigen Ihre Spenden-Metriken für den ausgewählten Bereich an:
   - **Gesamtspenden** -- Der Gesamtbetrag gespendet.
   - **Durchschnittliches Geschenk** -- Der Durchschnittlich-Spendenbetrag.
   - **Eindeutige Spender** -- Die Anzahl der unterschiedlichen Personen, die gegeben haben.
   - **Gesamtspenden** -- Die Gesamtzahl der einzelnen Spenden.
5. Unter den KPIs zeigt ein Balkendiagramm Spenden pro Woche, Monat oder Quartal, aufgeschlüsselt nach Fonds.
6. Klicken Sie auf **Download-Optionen** und wählen Sie **Zusammenfassung**, um ein CSV der Gesamt-Zahlen nach Zeitraum und Fonds zu exportieren, oder klicken Sie auf das Druck-Symbol, um den Bericht zu drucken. Der Name Ihrer Kirche wird oben auf dem gedruckten Bericht angezeigt.

Wenn Spenden im Zeitraum in mehr als einer Währung gegeben wurden, werden die KPI-Gesamtzahl in Ihre Kirchenwährung konvertiert und eine Notiz **Konvertiert zu aktuellen Wechselkursen** wird unter den Karten angezeigt. Siehe [Multi-Währungs-Unterstützung](./multi-currency.md#converted-totals) für Details.

:::info
Das Dashboard zeigt aggregierte Spendendaten. Es enthält keine einzelnen Spender-Namen. Für Spender-Level-Details verwenden Sie die Seite [Bündel](batches.md).
:::

## Lapsed Givers

Die Registerkarte **Lapsed Givers** neben der Registerkarte **Dashboard** listet Personen auf, die in einem Zeitraum gegeben haben, aber nicht seitdem. Standardmäßig vergleicht es das letzte Kalenderjahr mit diesem Jahr bis heute; ändern Sie einen oder beide Datumsbereiche, um die Suche zu erweitern oder einzuschränken. Jede Reihe zeigt die Person, das Datum ihres letzten Geschenks und ihre Gesamtsumme für den früheren Zeitraum, und **Download-Optionen > Zusammenfassung** lädt die Liste als CSV für einen Follow-up-Mailing oder Anrufliste herunter.

## Spender-Level-Details anzeigen

Für eine Aufschlüsselung darüber, wer gegeben hat, wie viel und zu welchem Fonds:

1. Navigieren Sie zu **Spenden > Bündel**.
2. Klicken Sie auf einen **Bündelnamen**, um ihn zu öffnen.
3. Die Bündel-Detailseite listet jede Spende mit dem Namen des Spenders, dem Betrag, Fonds, Datum und Zahlungsmethode auf.
4. Klicken Sie auf einen **Namen des Spenders**, um einen Zusammenbruch zu sehen, wie viele Male sie gegeben haben und wie viel jedes Mal.
5. Klicken Sie auf eine **Spenden-ID**, um ein Seitenpanel mit den vollständigen Details für diese einzelne Spende zu öffnen.
6. Klicken Sie auf **Herunterladen**, um ein CSV mit allen Spender- und Spendendaten für dieses Bündel zu exportieren.

## Spendenbericht Zusammenfassung

Die Spenden-Berichterstattung ist direkt in den Spenden-Bereich eingebaut -- die Zusammenfassungsseite dient als Ihre Spendenbericht-Zusammenfassung:

1. Im Jump-Menü wählen Sie **Spenden > Zusammenfassung**.
2. In der Registerkarte **Dashboard** legen Sie das **Startdatum** und **Enddatum** im Panel **Bericht filtern** fest und klicken Sie auf **Bericht ausführen**.
3. Klicken Sie auf **Download-Optionen** und wählen Sie **Zusammenfassung**, um den Bericht als CSV-Datei zu exportieren.

## Daten exportieren

Sie können Spendendaten von mehreren Stellen exportieren:

- **Zusammenfassungsseite** -- ein CSV der Spenden-Gesamtzahl nach Woche, Monat oder Quartal und Fonds herunterladen
- **Bündel-Detailseite** -- ein CSV der einzelnen Spenden mit Spender-Details herunterladen
- **Fonds-Detailseite** -- Spendenverlauf für einen bestimmten Fonds herunterladen

:::tip
Für Jahresabschluss-Berichterstattung kombinieren Sie den Zusammenfassungsseiten-Export mit dem [Spendennachweise](giving-statements.md)-Werkzeug, um sowohl aggregierte Trends als auch einzelne Spender-Aussagen zu erhalten.
:::

## Nächste Schritte

- Generieren Sie [Spendennachweise](giving-statements.md) für Ihre Spender am Jahresende
- Überprüfen Sie einzelne [Bündel](batches.md), um Spendendetails zu überprüfen
- Überprüfen Sie [Fonds](funds.md) Detailseiten für Spenden-Aufschlüsselungen nach Kategorie
