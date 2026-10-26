---
title: "Anwesenheitsberichte"
---

# Anwesenheitsberichte

<div class="article-intro">

B1 Admin bietet drei Anwesenheitsberichte, die Ihnen helfen zu verstehen, wie sich Menschen in Ihren Gottesdiensten und Gruppen beteiligen. Jeder Bericht bietet eine andere Sicht auf Ihre Anwesenheitsdaten, von allgemeinen Trends bis zu täglichen Aufschlüsselungen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Stellen Sie sicher, dass die Anwesenheit für Ihre Gottesdienste und Gruppen [konsequent erfasst wird](../attendance/tracking-attendance.md)
- Stellen Sie sicher, dass Ihre [Gruppen](../groups/creating-groups.md) und Gottesdienste in B1 Admin eingerichtet sind
- Sie benötigen die passenden [Berechtigungen](../settings/roles-permissions.md), um auf Berichte zuzugreifen

</div>

## Anwesenheitstrend

Der Bericht **Anwesenheitstrend** zeigt, wie sich die Anwesenheit bei Ihren Gottesdiensten im Laufe der Zeit verändert.

1. Rufen Sie direkt **admin.b1.church/reports/attendanceTrend** in Ihrem Browser auf (Berichte haben keinen Eintrag im Navigationsmenü -- am einfachsten finden Sie sie wieder, wenn Sie die Adresse als Lesezeichen speichern). Derselbe Bericht ist auch auf der Seite Anwesenheit verfügbar: Klicken Sie auf **Alle Jahre** und wählen Sie dann den Reiter **Anwesenheitstrend**.
2. Wählen Sie optional einen **Standort**, einen **Gottesdienst**, eine **Gottesdienstzeit** oder eine **Gruppe**, um die Ergebnisse zu filtern.
3. Legen Sie das **Startdatum** und das **Enddatum** fest. Standardmäßig deckt der Bericht das vergangene Jahr ab, vom Datum vor einem Jahr bis heute, und das Enddatum ist vollständig enthalten. Klicken Sie auf **Bericht ausführen**.
4. Der Bericht zeigt ein Balkendiagramm und eine Tabelle mit den Gesamtbesuchen pro Woche. Jede Woche ist mit dem Datum des Sonntags dieser Woche beschriftet, und die Spalte **Sitzungsdaten** der Tabelle listet die tatsächlichen Tage dieser Woche auf, an denen Anwesenheit erfasst wurde (zum Beispiel "9/27, 9/30").

Dieser Bericht ist nützlich, um Muster wie saisonale Rückgänge, Wachstumstrends oder die Wirkung besonderer Veranstaltungen zu erkennen.

## Gruppenanwesenheit

Der Bericht **Gruppenanwesenheit** zeigt, wer an jeder Gruppensitzung in einem Zeitraum teilgenommen hat.

1. Rufen Sie direkt **admin.b1.church/reports/groupAttendance** in Ihrem Browser auf oder klicken Sie auf der Seite Anwesenheit auf **Alle Jahre** und wählen Sie den Reiter **Gruppenanwesenheit**.
2. Wählen Sie optional einen **Standort** und einen **Gottesdienst**.
3. Legen Sie das **Startdatum** und das **Enddatum** fest. Standardmäßig deckt der Bericht den Zeitraum vom letzten Sonntag bis heute ab, und das Enddatum ist vollständig enthalten.
4. Klicken Sie auf **Bericht ausführen**.

Die Ergebnisse sind nach Sitzungsdatum, dann nach Gottesdienstzeit und dann nach Gruppe gruppiert, wobei unter jeder Gruppe die Personen aufgeführt sind, die teilgenommen haben. Gottesdienstzeiten, Gruppen und Namen sind alphabetisch sortiert. Neben dem Namen jeder Person zeigt die Spalte **Eingecheckt** die Uhrzeit, zu der die Anwesenheit erfasst wurde (leer, wenn keine Uhrzeit vorliegt), und die Spalte **Mitgliedsstatus** zeigt ihren Status, etwa Mitglied oder Besucher.

Um eine Tabelle herunterzuladen, klicken Sie auf **Download-Optionen** und wählen Sie **Zusammenfassung**. Die CSV-Datei enthält:

- Eine Zeile pro Mitglied jeder Gruppe, die sich im Zeitraum getroffen hat, sortiert nach Gruppe und dann nach Name.
- Den Namen der Person und den Gruppennamen in den ersten Spalten.
- Eine Spalte pro datierter Sitzung, benannt nach Gottesdienst, Gottesdienstzeit und Datum (zum Beispiel "Sonntag - 9:00 AM (2026-09-27)"), wobei jede Person als **anwesend** oder **abwesend** markiert ist.

Nutzen Sie diesen Bericht, um die Anwesenheit verschiedener Gruppen zu vergleichen und festzustellen, welche Gruppen wachsen oder Aufmerksamkeit brauchen.

## Tägliche Gruppenanwesenheit

Der Bericht **Tägliche Gruppenanwesenheit** (mit dem Titel **Gruppenanwesenheit nach Tag**) zeigt tagesgenau, wie viele Personen an einer Gruppe teilgenommen haben.

1. Rufen Sie direkt **admin.b1.church/reports/dailyGroupAttendance** in Ihrem Browser auf.
2. Verwenden Sie die Auswahlfelder **Standort**, **Gottesdienst** und **Gottesdienstzeit**, um die Liste einzugrenzen, und wählen Sie dann die **Gruppe** aus, die Sie prüfen möchten.
3. Führen Sie den Bericht aus. Er listet jeden Tag auf, an dem sich die Gruppe getroffen hat, beginnend mit dem ältesten, mit dem **Datum** und der Anzahl der **Teilnehmenden**, die an diesem Tag erfasst wurden.

Dieser Bericht bietet detaillierte Einblicke, die hilfreich sind, um Schwankungen von Woche zu Woche zu verstehen oder bestimmte Tage mit ungewöhnlich hoher oder niedriger Anwesenheit zu erkennen.

:::tip
Nutzen Sie den Bericht Anwesenheitstrend für einen Überblick auf hoher Ebene und den Bericht Tägliche Gruppenanwesenheit, wenn Sie bestimmte Termine genauer untersuchen möchten.
:::

## Praktische Anwendungen

- **Planung** -- Nutzen Sie Anwesenheitstrends, um Sitzplätze, Personal und Ressourcen für kommende Gottesdienste zu planen.
- **Öffentlichkeitsarbeit** -- Erkennen Sie frühzeitig sinkende Anwesenheit, damit Sie Mitglieder gezielt ansprechen können.
- **Berichte für den Vorstand** -- Nehmen Sie Anwesenheitsdaten in Ihre regelmäßigen Berichte an die Leitung auf, um die Gesundheit des Dienstes zu zeigen.
- **Auswertung von Veranstaltungen** -- Vergleichen Sie die Anwesenheit vor und nach besonderen Veranstaltungen, um deren Wirkung zu messen.

:::warning
Anwesenheitsdaten werden über Ihre Check-in-Prozesse für Gruppen und Gottesdienste erfasst. Wenn die Anwesenheit nicht konsequent erfasst wird, spiegeln Ihre Berichte die tatsächliche Teilnahme nicht genau wider. Anleitungen zur Einrichtung finden Sie unter [Anwesenheit erfassen](../attendance/tracking-attendance.md).
:::
