---
title: "Spendenberichte"
---

# Spendenberichte

<div class="article-intro">

B1 Admin bietet Ihnen verschiedene Möglichkeiten, die Spendendaten Ihrer Gemeinde anzuzeigen und zu analysieren. Die Spendenübersichtsseite bietet einen visuellen Überblick mit Diagrammen und Filtern, während der Berichtsbereich einen detaillierteren Spendenzusammenfassungsbericht enthält. Nutzen Sie diese Werkzeuge, um Spendentrends zu verfolgen, sich auf Vorstandssitzungen vorzubereiten oder Ihre Aufzeichnungen abzugleichen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Stellen Sie sicher, dass Spenden in [Stapeln erfasst](recording-donations.md) oder [aus Stripe importiert](stripe-import.md) wurden
- Überprüfen Sie, ob Ihre [Fonds](funds.md) korrekt eingerichtet sind, damit Spenden richtig kategorisiert werden

</div>

## Spenden-Dashboard

Das **Spenden-Dashboard** ist das Erste, was Sie sehen, wenn Sie in der Seitenleiste auf **Spenden** klicken. Es bietet einen Überblick über Ihre Spendenaktivität mit wichtigen Leistungskennzahlen.

1. Navigieren Sie zu **Spenden** in der Seitenleiste, um das Dashboard zu öffnen.
2. Oben zeigen vier **KPI-Karten** Ihre Spendenkennzahlen auf einen Blick:
   - **Gesamtspenden** -- Der Gesamtbetrag der Spenden im ausgewählten Zeitraum.
   - **Durchschnittliche Spende** -- Der durchschnittliche Spendenbetrag.
   - **Einzelne Spender** -- Die Anzahl der verschiedenen Personen, die gespendet haben.
   - **Anzahl Spenden** -- Die Gesamtzahl der einzelnen Spenden.
3. Verwenden Sie den **Zeitraumschalter**, um zwischen **Wöchentlich**, **Monatlich** und **Quartalsweise** zu wechseln.
4. Unter den KPIs zeigt ein Diagramm die Spendentrends für den ausgewählten Zeitraum.
5. Klicken Sie auf **Herunterladen**, um eine CSV-Datei mit den Spendengesamtwerten zu exportieren.

## Spendenübersichtsseite

Die **Übersichtsseite** bietet detailliertere aggregierte Spendendaten.

1. Navigieren Sie zu **Spenden** in der Seitenleiste, um die Übersichtsseite zu öffnen.
2. Verwenden Sie den **Datumsbereichsfilter**, um den gewünschten Zeitraum auszuwählen. Setzen Sie das frühere Datum oben und das spätere Datum unten.
3. Die Seite zeigt ein wöchentliches Spendendiagramm, sodass Sie Trends auf einen Blick erkennen können.
4. Klicken Sie auf **Herunterladen**, um eine CSV-Datei mit dem Gesamtbetrag, der Woche der Spende und dem zugehörigen Fonds zu exportieren.

:::info
Die Übersichtsseite zeigt aggregierte Spendendaten. Sie enthält keine individuellen Spendernamen. Für spenderbezogene Details verwenden Sie die Seite [Stapel](batches.md).
:::

## Spenderdetails anzeigen

Für eine Aufschlüsselung, wer gespendet hat, wie viel und an welchen Fonds:

1. Navigieren Sie zu **Spenden > Stapel**.
2. Klicken Sie auf einen **Stapelnamen**, um ihn zu öffnen.
3. Die Stapel-Detailseite listet jede Spende mit dem Namen des Spenders, Betrag, Fonds, Datum und Zahlungsmethode auf.
4. Klicken Sie auf den **Namen eines Spenders**, um eine Aufschlüsselung zu sehen, wie oft und wie viel er gespendet hat.
5. Klicken Sie auf eine **Spenden-ID**, um ein Seitenpanel mit den vollständigen Details dieser einzelnen Spende zu öffnen.
6. Klicken Sie auf **Herunterladen**, um eine CSV-Datei mit allen Spender- und Spendeninformationen für diesen Stapel zu exportieren.

## Spendenzusammenfassungsbericht

B1 Admin enthält auch einen **Spendenzusammenfassungsbericht** im Berichtsbereich:

1. Klicken Sie auf **Berichte** in der Seitenleiste.
2. Wählen Sie den Bericht **Spendenzusammenfassung**.
3. Wählen Sie Ihre Filter (Datumsbereich, Fonds, Standort usw.) und führen Sie den Bericht aus.

## Daten exportieren

Sie können Spendendaten von verschiedenen Stellen exportieren:

- **Übersichtsseite** -- CSV der wöchentlichen Spendengesamtwerte nach Fonds herunterladen
- **Stapel-Detailseite** -- CSV einzelner Spenden mit Spenderdetails herunterladen
- **Fonds-Detailseite** -- Spendenverlauf für einen bestimmten Fonds herunterladen

:::tip
Für den Jahresabschlussbericht kombinieren Sie den Export der Übersichtsseite mit dem Tool [Spendenbescheinigungen](giving-statements.md), um sowohl aggregierte Trends als auch individuelle Spenderbescheinigungen zu erhalten.
:::

## Nächste Schritte

- [Spendenbescheinigungen](giving-statements.md) für Ihre Spender zum Jahresende erstellen
- Einzelne [Stapel](batches.md) überprüfen, um Spendendetails zu verifizieren
- [Fonds](funds.md)-Detailseiten für Spendenaufschlüsselungen nach Kategorie prüfen
