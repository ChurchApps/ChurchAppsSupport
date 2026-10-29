---
title: "Anwesenheitsberichte"
---

# Anwesenheitsberichte

<div class="article-intro">

B1 Admin bietet drei Anwesenheitsberichte, die Ihnen helfen zu verstehen, wie sich Menschen bei Ihren Gottesdiensten und Gruppen beteiligen. Jeder Bericht bietet eine andere Sicht auf Ihre Anwesenheitsdaten -- von übergeordneten Trends bis zu täglichen Aufschlüsselungen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Stellen Sie sicher, dass die Anwesenheit für Ihre Gottesdienste und Gruppen [konsequent erfasst wird](../attendance/tracking-attendance.md)
- Stellen Sie sicher, dass Ihre [Gruppen](../groups/creating-groups.md) und Gottesdienste in B1 Admin eingerichtet sind
- Sie benötigen die passenden [Berechtigungen](../settings/roles-permissions.md), um auf Berichte zuzugreifen

</div>

## Anwesenheitstrend

Der Bericht Anwesenheitstrend zeigt, wie sich die Anwesenheit bei Ihren Gottesdiensten im Zeitverlauf verändert.

1. Rufen Sie in Ihrem Browser direkt **admin.b1.church/reports/attendanceTrend** auf (Berichte haben keinen Eintrag im Navigationsmenü -- am einfachsten gelangen Sie über ein Lesezeichen dorthin). Derselbe Bericht befindet sich auch auf der Seite Anwesenheit: Klicken Sie auf **Alle Jahre** und wählen Sie dann den Reiter **Anwesenheitstrend**.
2. Wählen Sie optional einen **Standort**, einen **Gottesdienst**, eine **Gottesdienstzeit** oder eine **Gruppe**, um die Ergebnisse zu filtern.
3. Legen Sie das **Startdatum** und das **Enddatum** fest. Standardmäßig umfasst der Bericht das vergangene Jahr, vom Datum vor einem Jahr bis heute, und das Enddatum ist vollständig enthalten. Klicken Sie auf **Bericht ausführen**.
4. Der Bericht zeigt ein Balkendiagramm und eine Tabelle mit den Gesamtbesuchen pro Woche. Jede Woche ist mit dem Datum des Sonntags dieser Woche bezeichnet, und die Spalte **Sitzungsdaten** der Tabelle listet die tatsächlichen Tage dieser Woche auf, an denen Anwesenheit erfasst wurde (zum Beispiel "27.9., 30.9.").

Dieser Bericht ist nützlich, um Muster zu erkennen, etwa saisonale Einbrüche, Wachstumstrends oder die Wirkung besonderer Veranstaltungen.

## Gruppenanwesenheit

Der Bericht Gruppenanwesenheit zeigt, wer an den einzelnen Gruppensitzungen in einem Datumsbereich teilgenommen hat.

1. Rufen Sie in Ihrem Browser direkt **admin.b1.church/reports/groupAttendance** auf oder klicken Sie auf der Seite Anwesenheit auf **Alle Jahre** und wählen Sie den Reiter **Gruppenanwesenheit**.
2. Wählen Sie optional einen **Standort** und einen **Gottesdienst**.
3. Legen Sie das **Startdatum** und das **Enddatum** fest. Standardmäßig umfasst der Bericht den letzten Sonntag bis heute, und das Enddatum ist vollständig enthalten.
4. Klicken Sie auf **Bericht ausführen**.

Die Ergebnisse sind nach Sitzungsdatum, dann nach Gottesdienstzeit, dann nach Gruppe gegliedert; unter jeder Gruppe sind die anwesenden Personen aufgelistet. Gottesdienstzeiten, Gruppen und Namen sind alphabetisch sortiert. Neben dem Namen jeder Person zeigt die Spalte **Eingecheckt** die Uhrzeit, zu der die Anwesenheit erfasst wurde (leer, wenn keine Uhrzeit hinterlegt ist), und die Spalte **Mitgliedsstatus** zeigt ihren Status, etwa Mitglied oder Besucher. Sitzungen von Gruppen, die nicht zu einer Gottesdienstzeit zusammenkommen, sind ebenfalls enthalten; sie erscheinen ohne Gottesdienstzeit.

Um eine Tabelle herunterzuladen, klicken Sie auf **Download-Optionen** und wählen Sie **Zusammenfassung**. Die CSV-Datei enthält:

- Eine Zeile pro Mitglied jeder Gruppe, die sich im Datumsbereich getroffen hat, sortiert nach Gruppe und dann nach Name.
- Name der Person und Name der Gruppe in den ersten Spalten.
- Eine Spalte pro datierter Sitzung, benannt nach Gottesdienst, Gottesdienstzeit und Datum (zum Beispiel "Sonntag - 9:00 Uhr (2026-09-27)"), wobei jede Person als **anwesend** oder **abwesend** markiert ist. Eine Sitzung ohne Gottesdienstzeit wird nur nach ihrem Datum benannt.

Nutzen Sie diesen Bericht, um die Anwesenheit verschiedener Gruppen zu vergleichen und festzustellen, welche Gruppen wachsen oder Aufmerksamkeit benötigen.

## Tägliche Gruppenanwesenheit

Der Bericht Tägliche Gruppenanwesenheit (Titel **Gruppenanwesenheit nach Tag**) zeigt tagesgenau, wie viele Personen an einer Gruppe teilgenommen haben.

1. Rufen Sie in Ihrem Browser direkt **admin.b1.church/reports/dailyGroupAttendance** auf.
2. Verwenden Sie die Auswahlfelder **Standort**, **Gottesdienst** und **Gottesdienstzeit**, um die Liste einzugrenzen, und wählen Sie dann die **Gruppe** aus, die Sie prüfen möchten.
3. Führen Sie den Bericht aus. Er listet jeden Tag auf, an dem sich die Gruppe getroffen hat, den ältesten zuerst, mit dem **Datum** und der Anzahl der an diesem Tag erfassten **Teilnehmenden**.

Dieser Bericht liefert feinkörnige Details, die hilfreich sind, um Schwankungen von Woche zu Woche zu verstehen oder bestimmte Tage mit ungewöhnlich hoher oder niedriger Anwesenheit zu erkennen.

:::tip
Nutzen Sie den Anwesenheitstrend für einen Überblick auf hoher Ebene und den Bericht Tägliche Gruppenanwesenheit, wenn Sie einzelne Termine genauer untersuchen möchten.
:::

## Praktische Anwendungen

- **Planung** -- Nutzen Sie Anwesenheitstrends, um Sitzplätze, Personaleinsatz und Ressourcen für kommende Gottesdienste zu planen.
- **Öffentlichkeitsarbeit** -- Erkennen Sie früh sinkende Anwesenheit, damit Sie Mitglieder nachfassen können.
- **Berichte an den Vorstand** -- Nehmen Sie Anwesenheitsdaten in Ihre regelmäßigen Berichte an die Leitung auf, um die Gesundheit der Dienste zu zeigen.
- **Veranstaltungsauswertung** -- Vergleichen Sie die Anwesenheit vor und nach besonderen Veranstaltungen, um deren Wirkung zu messen.

:::warning
Anwesenheitsdaten werden über Ihre Gruppen- und Gottesdienst-Check-in-Prozesse erfasst. Wird die Anwesenheit nicht konsequent erfasst, spiegeln Ihre Berichte die tatsächliche Teilnahme nicht genau wider. Anleitungen zur Einrichtung finden Sie unter [Anwesenheit nachverfolgen](../attendance/tracking-attendance.md).
:::
