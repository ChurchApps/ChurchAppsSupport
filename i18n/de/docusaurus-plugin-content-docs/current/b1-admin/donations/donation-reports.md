---
title: "Spendenberichte"
---

# Spendenberichte

<div class="article-intro">

B1 Admin bietet Ihnen mehrere Möglichkeiten, die Giving-Daten Ihrer Kirche anzusehen und auszuwerten. Das Giving-Dashboard auf der Seite **Übersicht** des Bereichs Spenden bietet einen visuellen Überblick mit Diagrammen und Filtern, während der Berichtsbereich einen detaillierteren Bericht zur Spendenübersicht bereitstellt. Nutzen Sie diese Werkzeuge, um Giving-Trends zu verfolgen, Sitzungen des Vorstands vorzubereiten oder Ihre Unterlagen abzugleichen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Stellen Sie sicher, dass Spenden [in Stapeln erfasst](recording-donations.md) oder [aus Stripe importiert](stripe-import.md) wurden.
- Prüfen Sie, ob Ihre [Fonds](funds.md) korrekt eingerichtet sind, damit Spenden richtig zugeordnet werden.

</div>

## Giving-Dashboard

Das Giving-Dashboard ist die Ansicht **Dashboard** der Seite **Übersicht**, die erste Seite, die Sie beim Öffnen des Bereichs **Spenden** sehen.

1. Öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links in B1 Admin), klappen Sie **Spenden** auf und klicken Sie auf **Übersicht**. Die Seite **Übersicht** öffnet sich in der Ansicht **Dashboard**. Der Schalter **Ansicht** oben rechts wechselt zwischen **Dashboard** und **Verlorene Geber**.
2. Nutzen Sie den Schalter **Wöchentlich**, **Monatlich** und **Vierteljährlich** oberhalb des Berichts, um festzulegen, wie die Giving-Daten gruppiert werden.
3. Legen Sie im Bereich **Bericht filtern** das **Startdatum** und das **Enddatum** fest (standardmäßig das vergangene Jahr bis gestern) und wählen Sie optional einen **Fonds** aus. Klicken Sie dann auf **Bericht ausführen**. Der Bericht wird beim Öffnen der Seite mit den Standardwerten automatisch ausgeführt.
4. Vier **Kennzahlen-Karten** zeigen Ihre Giving-Kennzahlen für den gewählten Zeitraum:
   - **Gesamte Gaben** -- Der Gesamtbetrag aller Spenden.
   - **Durchschnittliche Gabe** -- Der durchschnittliche Spendenbetrag.
   - **Eindeutige Geber** -- Die Anzahl verschiedener Personen, die gegeben haben.
   - **Gesamtzahl der Spenden** -- Die Gesamtzahl der einzelnen Spenden.
5. Unterhalb der Kennzahlen zeigt ein Balkendiagramm die Gaben pro Woche, Monat oder Quartal, aufgeschlüsselt nach Fonds.
6. Klicken Sie auf **Download-Optionen** und wählen Sie **Übersicht**, um eine CSV-Datei mit den Summen nach Zeitraum und Fonds zu exportieren, oder klicken Sie auf das Druck-Symbol, um den Bericht zu drucken. Das Logo Ihrer Kirche (das **Logo für helle Hintergründe** aus [Website > Erscheinungsbild](../website/appearance.md), falls Sie eines hochgeladen haben) und der Name erscheinen zentriert oben im gedruckten Bericht. Der Ausdruck verwendet dunklen Text und ein helles Diagramm, auch wenn Sie B1 Admin im Dunkelmodus nutzen.

Wenn Spenden im Zeitraum in mehr als einer Währung gegeben wurden, werden die Kennzahlen in die Kirchenwährung umgerechnet, und unterhalb der Karten erscheint der Hinweis **Umgerechnet zu aktuellen Wechselkursen**. Details finden Sie unter [Unterstützung mehrerer Währungen](./multi-currency.md#converted-totals).

:::info
Das Dashboard zeigt aggregierte Giving-Daten. Es enthält keine einzelnen Namen von Gebern. Für Details auf Geberebene verwenden Sie die Seite [Stapel](batches.md).
:::

## Verlorene Geber

Wählen Sie in der Umschaltung **Ansicht** den Eintrag **Verlorene Geber**, um Personen aufzulisten, die in einem Zeitraum gegeben haben, seitdem aber nicht mehr. Standardmäßig werden das letzte Kalenderjahr und das laufende Jahr bis heute verglichen. Sie können beide Datumsbereiche ändern, um die Suche zu erweitern oder einzugrenzen. Jede Zeile zeigt die Person, das Datum ihrer letzten Gabe und ihre Summe für den früheren Zeitraum. Über **Download-Optionen > Übersicht** laden Sie die Liste als CSV-Datei herunter, etwa für eine Nachfass-Postaktion oder eine Telefonliste.

## Spender-Details ansehen

Für eine Aufschlüsselung, wer wie viel und für welchen Fonds gegeben hat:

1. Navigieren Sie zu **Spenden > Stapel**.
2. Klicken Sie auf einen **Stapelnamen**, um ihn zu öffnen.
3. Die Detailseite des Stapels listet jede Spende mit ihrer Art (und Scheck-Nummer oder letzten Kartenziffern), dem Namen des Gebers, dem Datum, den Notizen und dem Betrag auf, mit einer Summe am Ende.
4. Klicken Sie in der Zeile einer Spende auf **Bearbeiten**, um die vollständigen Details dieser einzelnen Spende anzuzeigen, einschließlich ihres Fonds.
5. Klicken Sie oberhalb der Liste auf **Exportieren**, um eine CSV-Datei mit allen Geber- und Spendendaten dieses Stapels herunterzuladen.

## Bericht zur Spendenübersicht

Die Berichterstattung zu Spenden ist direkt im Bereich Spenden integriert -- die Seite Übersicht dient als Ihr Bericht zur Spendenübersicht:

1. Wählen Sie im Sprungmenü **Spenden > Übersicht**.
2. Legen Sie auf der Ansicht **Dashboard** im Bereich **Bericht filtern** das **Startdatum** und das **Enddatum** fest und klicken Sie auf **Bericht ausführen**.
3. Klicken Sie auf **Download-Optionen** und wählen Sie **Übersicht**, um den Bericht als CSV-Datei zu exportieren.

## Daten exportieren

Sie können Spendendaten an mehreren Stellen exportieren:

- **Seite Übersicht** -- eine CSV-Datei mit den Giving-Summen nach Woche, Monat oder Quartal und Fonds herunterladen
- **Detailseite des Stapels** -- eine CSV-Datei mit einzelnen Spenden und Geberdaten herunterladen
- **Detailseite des Fonds** -- Spendenverlauf für einen bestimmten Fonds herunterladen

:::tip
Für die Jahresabschlussberichterstattung kombinieren Sie den Export der Seite Übersicht mit dem Werkzeug [Spendenbescheinigungen](giving-statements.md), um sowohl die Gesamttrends als auch individuelle Bescheinigungen für Geber zu erhalten.
:::

## Nächste Schritte

- Erstellen Sie zum Jahresende [Spendenbescheinigungen](giving-statements.md) für Ihre Geber
- Prüfen Sie einzelne [Stapel](batches.md), um die Spendendetails zu verifizieren
- Prüfen Sie die Detailseiten der [Fonds](funds.md), um die Giving-Aufschlüsselung nach Kategorie zu sehen
