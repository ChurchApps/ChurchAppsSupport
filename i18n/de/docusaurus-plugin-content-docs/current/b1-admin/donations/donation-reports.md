---
title: "Spendenberichte"
description: "Sehen Sie Gebersummen, verlorene Spendende und Details auf Stapelebene in B1 Admin mit dem Spenden-Dashboard, der Ansicht Inaktive Spendende und CSV-Exporten ein."
---

# Spendenberichte

<div class="article-intro">

B1 Admin bietet mehrere Wege, die Gebedaten Ihrer Kirche anzusehen und auszuwerten. Das Spenden-Dashboard auf der Seite **Übersicht** der Spenden bietet einen visuellen Überblick mit Diagrammen und Filtern, während der Bereich Berichte eine detailliertere Spendenübersicht bietet. Nutzen Sie diese Werkzeuge, um Trends bei den Gaben zu verfolgen, Sitzungen des Vorstands vorzubereiten oder Ihre Aufzeichnungen abzugleichen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Stellen Sie sicher, dass Spenden [in Stapeln erfasst](recording-donations.md) oder [aus Stripe importiert](stripe-import.md) wurden
- Prüfen Sie, ob Ihre [Fonds](funds.md) richtig eingerichtet sind, damit Spenden richtig zugeordnet werden

</div>

## Spenden-Dashboard {#giving-dashboard}

Das Spenden-Dashboard ist die Ansicht **Dashboard** der Seite **Übersicht**, der ersten Seite, die Sie beim Öffnen des Bereichs **Spenden** sehen.

1. Öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links in B1 Admin), klappen Sie **Spenden** auf und klicken Sie auf **Übersicht**. Die Seite **Übersicht** öffnet sich in der Ansicht **Dashboard**. Der Schalter **Ansicht** oben rechts wechselt zwischen **Dashboard** und **Inaktive Spendende**.
2. Verwenden Sie den Schalter **Wöchentlich**, **Monatlich** und **Vierteljährlich** über dem Bericht, um festzulegen, wie die Gaben gruppiert werden.
3. Legen Sie im Bereich **Bericht filtern** das **Startdatum** und das **Enddatum** fest (standardmäßig das vergangene Jahr bis gestern) und wählen Sie optional einen **Fonds**. Klicken Sie dann auf **Bericht ausführen**. Der Bericht wird beim Öffnen der Seite automatisch mit den Standardwerten ausgeführt.
4. Vier **Kennzahlen-Karten** zeigen Ihre Gebekennzahlen für den gewählten Zeitraum:
   - **Gesamtgaben** – der insgesamt gespendete Betrag.
   - **Durchschnittliche Gabe** – der durchschnittliche Spendenbetrag.
   - **Eindeutige Spendende** – die Anzahl der verschiedenen Personen, die gegeben haben.
   - **Spenden insgesamt** – die Gesamtzahl der einzelnen Spenden.
5. Unterhalb der Kennzahlen zeigt ein Balkendiagramm die Gaben pro Woche, Monat oder Quartal, aufgeschlüsselt nach Fonds.
6. Klicken Sie auf **Download-Optionen** und wählen Sie **Zusammenfassung**, um eine CSV-Datei der Summen nach Zeitraum und Fonds zu exportieren, oder klicken Sie auf das Drucksymbol, um den Bericht zu drucken. Ihr Kirchenlogo (das **Logo für helle Hintergründe** aus [Website > Erscheinungsbild](../website/appearance.md), falls Sie eines hochgeladen haben) und Ihr Name erscheinen zentriert oben im gedruckten Bericht. Der Ausdruck verwendet dunklen Text und ein helles Diagramm, auch wenn Sie B1 Admin im Dunkelmodus verwenden.

Wenn Spenden im Zeitraum in mehr als einer Währung gegeben wurden, werden die Kennzahlen in die Währung Ihrer Kirche umgerechnet, und unter den Karten erscheint der Hinweis **Umgerechnet zu den aktuellen Wechselkursen**. Details finden Sie unter [Mehrwährungsunterstützung](./multi-currency.md#converted-totals).

:::info
Das Dashboard zeigt aggregierte Gebedaten. Es enthält keine Namen einzelner Spendender. Für Details auf Ebene einzelner Spendender verwenden Sie die Seite [Stapel](batches.md).
:::

## Inaktive Spendende {#lapsed-givers}

Wählen Sie unter dem Schalter **Ansicht** **Inaktive Spendende**, um Personen aufzulisten, die in einem Zeitraum gegeben haben, seitdem aber nicht mehr. Standardmäßig wird das letzte Kalenderjahr mit dem laufenden Jahr bis heute verglichen. Ändern Sie **Vorheriger Zeitraum Start**, **Vorheriger Zeitraum Ende**, **Aktueller Zeitraum Start** oder **Aktueller Zeitraum Ende** im Bereich **Bericht filtern** und klicken Sie auf **Bericht ausführen**, um die Suche zu erweitern oder einzugrenzen. Diese Ansicht benötigt die Berechtigung **Spenden anzeigen**. Jede Zeile zeigt die Person, das Datum ihrer letzten Gabe und ihre Summe für den früheren Zeitraum. Mit **Download-Optionen > Zusammenfassung** laden Sie die Liste als CSV für eine Nachfass-Mailaktion oder eine Anrufliste herunter.

## Spenden auf Ebene einzelner Spendender ansehen {#viewing-donor-level-details}

Um aufzuschlüsseln, wer wie viel und in welchen Fonds gegeben hat:

1. Navigieren Sie zu **Spenden > Stapel**.
2. Klicken Sie auf einen **Stapelnamen**, um ihn zu öffnen.
3. Die Detailseite des Stapels listet jede Spende mit ihrer Art (und der Schecknummer oder den Kartenziffern), dem Namen des Spendenden, dem Datum, den Notizen und dem Betrag auf, unten mit einer Summe.
4. Klicken Sie in einer Spendenzeile auf **Bearbeiten**, um die vollständigen Angaben dieser einzelnen Spende zu öffnen, einschließlich ihres Fonds.
5. Klicken Sie oberhalb der Liste auf **Exportieren**, um eine CSV-Datei mit allen Angaben zu Spendenden und Spenden für diesen Stapel herunterzuladen.

## Spendenübersicht als Bericht {#donation-summary-report}

Die Spendenberichterstattung ist direkt in den Bereich Spenden eingebaut – die Seite Übersicht dient als Ihr Spendenübersichtsbericht:

1. Wählen Sie im Sprungmenü **Spenden > Übersicht**.
2. Legen Sie in der Ansicht **Dashboard** im Bereich **Bericht filtern** das **Startdatum** und das **Enddatum** fest und klicken Sie auf **Bericht ausführen**.
3. Klicken Sie auf **Download-Optionen** und wählen Sie **Zusammenfassung**, um den Bericht als CSV-Datei zu exportieren.

## Daten exportieren {#exporting-data}

Sie können Spendendaten an mehreren Stellen exportieren:

- **Seite Übersicht** – laden Sie eine CSV-Datei mit den Gebesummen nach Woche, Monat oder Quartal und Fonds herunter
- **Detailseite des Stapels** – laden Sie eine CSV-Datei mit einzelnen Spenden samt Angaben zu den Spendenden herunter
- **Detailseite des Fonds** – laden Sie den Spendenverlauf für einen bestimmten Fonds herunter

:::tip
Für die Jahresabschlussberichte kombinieren Sie den Export der Seite Übersicht mit dem Werkzeug [Spendenbescheinigungen](giving-statements.md), um sowohl aggregierte Trends als auch individuelle Bescheinigungen für Spendende zu erhalten.
:::

## Nächste Schritte {#next-steps}

- Erstellen Sie zum Jahresende [Spendenbescheinigungen](giving-statements.md) für Ihre Spendenden
- Prüfen Sie einzelne [Stapel](batches.md), um die Spendendetails zu verifizieren
- Sehen Sie sich die Detailseiten der [Fonds](funds.md) an, um die Gaben nach Kategorie aufgeschlüsselt zu sehen
