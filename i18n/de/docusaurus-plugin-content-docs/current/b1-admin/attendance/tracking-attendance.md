---
title: "Anwesenheit verfolgen"
description: "Werten Sie Anwesenheitsverläufe aus, filtern Sie Berichte nach Standort, Gottesdienst oder Gruppe und exportieren Sie die Gruppenanwesenheit von der Seite Anwesenheit in B1 Admin."
---

# Anwesenheit verfolgen

<div class="article-intro">

Sobald Ihre Standorte, Gottesdienstzeiten und Gruppen konfiguriert sind, macht es B1 Admin einfach, Anwesenheitsdaten auszuwerten und Trends zu erkennen. Die Seite Anwesenheit öffnet sich mit einer Übersicht über die Anwesenheit dieser Woche, und ihre Berichte unter **Alle Jahre** bieten zwei Hauptansichten: den Reiter **Verlauf der Anwesenheit** für kirchenweite Trends und den Reiter **Anwesenheit in Gruppen** für Details auf Gruppenebene. Dazu kommt der Reiter **Verlauf der Personenzahl** für [Summen der Personenzahlen](headcount-entry.md). Mit diesen Werkzeugen erkennen Sie Wachstumsmuster und nachlassendes Engagement und können datenbasierte Entscheidungen für Ihre Kirche treffen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ihre Anwesenheitsstruktur muss mit mindestens einem Standort und einer Gottesdienstzeit eingerichtet sein. Siehe [Anwesenheitseinrichtung](setup.md), falls Sie das noch nicht getan haben.
- Anwesenheitsdaten müssen erfasst sein, bevor Berichte Ergebnisse anzeigen. Die Daten können über die [manuelle Erfassung](recording-attendance.md) oder den [Selbst-Check-in](check-in.md) entstehen.

</div>

## Anwesenheitsverläufe ansehen {#viewing-attendance-trends}

1. Öffnen Sie **B1 Admin**, öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Personen** auf und klicken Sie auf **Anwesenheit**.
2. Klicken Sie in der linken Spalte auf **Alle Jahre**. Der Reiter **Verlauf der Anwesenheit** ist standardmäßig ausgewählt.
3. Der Bericht wird automatisch ausgeführt, sobald der Reiter geöffnet wird, und zeigt die Gesamtanwesenheit für jede Woche.

:::tip
Für einen schnellen Blick auf die laufende Woche zeigt die Hauptseite Anwesenheit, wie viele Personen diese Woche im Raum sind, eine Aufschlüsselung nach Raum (Gruppe), eventuelle Gäste und ein 13-Wochen-Balkendiagramm der Check-ins – ganz ohne Bericht.
:::

## Ihre Daten filtern {#filtering-your-data}

Verwenden Sie die Filter im Feld **Bericht filtern**, um die Ergebnisse einzugrenzen, und klicken Sie dann auf **Bericht ausführen**:

- **Standort** – wählen Sie einen Standort, um nur die Anwesenheit an diesem Ort zu sehen.
- **Gottesdienst** – beschränkt den Bericht auf einen Gottesdienst.
- **Gottesdienstzeit** – wählen Sie eine Gottesdienstzeit, um eine bestimmte Zusammenkunft genauer zu betrachten.
- **Gruppe** – zeigt die Anwesenheit für eine einzelne Gruppe.
- **Startdatum** und **Enddatum** – der einzubeziehende Zeitraum. Standardmäßig umfasst der Bericht das vergangene Jahr, vom Datum vor einem Jahr bis heute, und das Enddatum ist vollständig enthalten.

Der Bericht zeigt ein Balkendiagramm und eine Tabelle mit den Gesamtbesuchen pro Woche. Mit dem Drucksymbol drucken Sie ihn aus, über **Download-Optionen** speichern Sie die Daten. Jede Woche ist mit dem Datum des Sonntags dieser Woche beschriftet. Die Tabelle enthält außerdem eine Spalte **Sitzungsdaten** mit den tatsächlichen Daten innerhalb dieser Woche, an denen Anwesenheit erfasst wurde (zum Beispiel „9/27, 9/30“). So sehen Sie, wann ein Zusammenkommen unter der Woche in derselben Woche wie der Sonntag gezählt wird.

:::info
Berichte werden jedes Mal automatisch ausgeführt, wenn Sie den Reiter Verlauf der Anwesenheit öffnen. Sie sehen daher immer aktuelle Zahlen, ohne auf eine Schaltfläche zum Aktualisieren klicken zu müssen.
:::

## Anwesenheit in Gruppen {#group-attendance}

Der Reiter **Anwesenheit in Gruppen** zeigt, wer an welcher Gruppensitzung teilgenommen hat. Das ist nützlich, wenn Sie eine bestimmte Klasse, ein Dienstteam oder einen Hauskreis im Blick behalten möchten, statt die Gesamtzahlen der Gottesdienste zu betrachten.

1. Wählen Sie bei den Berichten unter **Alle Jahre** den Reiter **Anwesenheit in Gruppen**.
2. Wählen Sie optional einen **Standort** und einen **Gottesdienst**.
3. Legen Sie das **Startdatum** und das **Enddatum** fest. Standardmäßig umfasst der Bericht den letzten Sonntag bis heute.
4. Klicken Sie auf **Bericht ausführen**.

Die Ergebnisse sind nach Sitzungsdatum gruppiert, dann nach Gottesdienstzeit und Gruppe, wobei unter jeder Gruppe die teilnehmenden Personen aufgeführt sind. Gottesdienstzeiten, Gruppen und Namen sind alphabetisch sortiert, damit jede Überschrift nur einmal erscheint. Die Zeile jeder Person zeigt außerdem eine Spalte **Eingecheckt** mit der Uhrzeit, zu der ihre Anwesenheit erfasst wurde (leer, wenn keine Uhrzeit vorliegt), und eine Spalte **Mitgliedsstatus** (zum Beispiel Mitglied oder Besucher), damit Sie Gäste auf einen Blick erkennen.

Um die Daten herunterzuladen, klicken Sie auf **Download-Optionen** und wählen Sie **Zusammenfassung**. Die CSV-Datei enthält eine Zeile pro Gruppenmitglied, sortiert nach Gruppe und dann nach Name, sowie eine Spalte für jede datierte Sitzung im Zeitraum (zum Beispiel „Sonntag - 9:00 Uhr (2026-09-27)“), markiert als **anwesend** oder **abwesend**.

:::tip
Die Gruppenanwesenheit ist besonders wertvoll für Leiter von [Hauskreisen](../groups/creating-groups.md), die das Engagement in ihrer Gruppe über die Zeit verfolgen möchten.
:::

## Tipps zur Nutzung der Anwesenheitsdaten {#tips-for-using-attendance-data}

- Werten Sie die Verläufe monatlich aus, um saisonale Muster früh zu erkennen.
- Vergleichen Sie die Daten auf Standortebene, um zu verstehen, welche Orte wachsen.
- Nutzen Sie die Berichte auf Gruppenebene, um [Gruppen](../groups/group-members.md) nachzufassen, deren Anwesenheit zurückgeht.
- Kombinieren Sie die Erkenntnisse zur Anwesenheit mit dem Werkzeug [KI-Suche](../people/ai-search.md), um Personen zu finden, die in letzter Zeit nicht mehr gekommen sind.

## Verwandte Seiten {#related-pages}

- [Anwesenheit erfassen](recording-attendance.md) – Anwesenheit für eine Gruppensitzung manuell eingeben
- [Personenzahl erfassen & Verlauf](headcount-entry.md) – eine einfachere Alternative mit Gesamtzahlen und eigenem wöchentlichem Verlaufsdiagramm
- [Check-In](check-in.md) – Selbst-Check-in einrichten, damit die Anwesenheit automatisch erfasst wird
