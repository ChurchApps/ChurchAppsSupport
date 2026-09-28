---
title: "Spendendberichte"
---

# Spendendberichte

<div class="article-intro">

B1 Admin bietet dir mehrere Möglichkeiten, die Spendendaten deiner Kirche zu betrachten und zu analysieren. Die Seite Spendendenbersicht bietet einen visuellen Überblick mit Diagrammen und Filtern, während der Berichtbereich einen detaillierteren Spendendenbericht bietet. Verwende diese Tools, um Spendendtrends zu verfolgen, dich auf Vorstandssitzungen vorzubereiten oder deine Aufzeichnungen abzugleichen.

</div>

<div class="prereqs">
<h4>Bevor du beginnst</h4>

- Stelle sicher, dass Spenden [in Chargen aufgezeichnet](recording-donations.md) oder [aus Stripe importiert](stripe-import.md) wurden
- Überprüfe, dass deine [Fonds](funds.md) korrekt eingerichtet sind, damit Spenden ordnungsgemäß kategorisiert werden

</div>

## Spendenddashboard

Das **Spendenddashboard** ist das erste, das du sieht, wenn du den Bereich **Spenden** öffnest. Es bietet einen allgemeinen Überblick über deine Spendendaktivitäten mit wichtigen Leistungsindikatoren.

1. Öffne das **Menü „Bereich"** in der oberen linken Ecke und wähle **Spenden**, um das Dashboard zu öffnen.
2. Oben zeigen vier **KPI-Karten** deine Spendendmetriken auf einen Blick:
   - **Gesamtspenden** -- Der Gesamtbetrag, der im ausgewählten Zeitraum gespendet wurde.
   - **Durchschnittliche Spende** -- Der durchschnittliche Spendendbetrag.
   - **Eindeutige Spender** -- Die Anzahl der verschiedenen Personen, die gespendet haben.
   - **Gesamtspenden** -- Die Gesamtzahl der einzelnen Spenden.
3. Verwende die **Periodenschaltfläche**, um zwischen **Wöchentlich**, **Monatlich** und **Vierteljährlich** zu wechseln.
4. Unterhalb der KPIs zeigt ein Diagramm Spendendtrends für den ausgewählten Zeitraum.
5. Klicke auf **Herunterladen**, um eine CSV-Datei mit Spendendsummen zu exportieren.

Wenn Spenden im Zeitraum in mehr als einer Währung gegeben wurden, werden die KPI-Summen in deine Kirchenwährung umgerechnet und ein Vermerk **Umgerechnet zu aktuellen Wechselkursen** wird unterhalb der Karten angezeigt. Siehe [Multi-Währungs-Unterstützung](./multi-currency.md#converted-totals) für Details.

## Abgelöste Spender

Die Registerkarte **Abgelöste Spender** neben dem Dashboard listet Personen auf, die während eines Zeitraums spendeten, seitdem aber nicht mehr. Standardmäßig werden das letzte Kalenderjahr und dieses Jahr bis heute verglichen; ändere einen der Datumsbereiche, um die Suche zu erweitern oder einzugrenzen. Jede Zeile zeigt die Person, das Datum ihrer letzten Spende und ihre Summe für den früheren Zeitraum, und **Exportieren** lädt die Liste als CSV für einen Nachverfolgungsversand oder eine Anrufliste herunter.

## Seite Spendendenbersicht

Die Seite **Übersicht** bietet detailliertere Gesamtspendendaten.

1. Öffne das **Menü „Bereich"** in der oberen linken Ecke und wähle **Spenden**, um die Übersichtsseite zu öffnen.
2. Verwende den **Datumsbereichsfilter**, um den Zeitraum auszuwählen, den du überprüfen möchtest. Stelle das frühere Datum oben und das neuere Datum unten ein.
3. Die Seite zeigt ein wöchentliches Spendendiagramm, damit du Trends auf einen Blick sehen kannst.
4. Klicke auf **Herunterladen**, um eine CSV-Datei mit dem Gesamtbetrag, der Woche, in der es gespendet wurde, und dem Fonds, zu dem es gespendet wurde, zu exportieren.

:::info
Die Übersichtsseite zeigt Gesamtspendendaten. Sie enthält keine Namen einzelner Spender. Für Details auf Spenderebene verwende die Seite [Chargen](batches.md).
:::

## Anzeige von Details auf Spenderebene

Für eine Aufschlüsselung wer spendete, wie viel und zu welchem Fonds:

1. Navigiere zu **Spenden > Chargen**.
2. Klicke auf einen **Chargennamen**, um ihn zu öffnen.
3. Die Chargenseite listet jede Spende mit dem Namen des Spenders, dem Betrag, dem Fonds, dem Datum und der Zahlungsmethode auf.
4. Klicke auf den **Namen eines Spenders**, um eine Aufschlüsselung zu sehen, wie oft er spendete und wie viel jedes Mal.
5. Klicke auf eine **Spenden-ID**, um ein Seitenpanel mit vollständigen Details für diese einzelne Spende zu öffnen.
6. Klicke auf **Herunterladen**, um eine CSV mit allen Spender- und Spendendinformationen für diese Charge zu exportieren.

## Spendendenbericht

Spendendberichterstattung ist direkt in den Bereich Spenden integriert -- die Übersichtsseite dient als dein Spendendenbericht:

1. Öffne das **Menü „Bereich"** in der oberen linken Ecke und wähle **Spenden**, um die Übersichtsseite zu öffnen.
2. Verwende den **Datumsbereichsfilter**, um den Zeitraum auszuwählen, über den du Bericht erstatten möchtest.
3. Klicke auf **Herunterladen**, um den Bericht als CSV-Datei zu exportieren.

## Daten exportieren

Du kannst Spendendaten von mehreren Stellen exportieren:

- **Übersichtsseite** -- lade eine CSV mit wöchentlichen Spendendsummen nach Fonds herunter
- **Chargenseite** -- lade eine CSV mit einzelnen Spenden und Spenderdetails herunter
- **Fondsseite** -- lade Spendendhistorie für einen bestimmten Fonds herunter

:::tip
Für die Jahresendberichterstattung kombiniere den Export der Übersichtsseite mit dem Tool [Spendendbestätigungen](giving-statements.md), um sowohl Gesamttrends als auch einzelne Spenderbestätigungen zu erhalten.
:::

## Nächste Schritte

- Generiere [Spendendbestätigungen](giving-statements.md) für deine Spender am Jahresende
- Überprüfe einzelne [Chargen](batches.md), um Spendenddetails zu überprüfen
- Überprüfe [Fonds](funds.md)-Seiten für Spendendaufschlüsselungen nach Kategorie
