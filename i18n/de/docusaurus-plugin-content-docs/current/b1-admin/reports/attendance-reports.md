---
title: "Anwesenheitsberichte"
---

# Anwesenheitsberichte

<div class="article-intro">

B1 Admin bietet drei Anwesenheitsberichte, die Ihnen helfen, zu verstehen, wie Menschen an Ihren Gottesdiensten und Gruppen teilnehmen. Jeder Bericht bietet eine andere Perspektive auf Ihre Anwesenheitsdaten, von hohen Trends bis zu täglichen Aufschlüsselungen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Stellen Sie sicher, dass die Anwesenheit [konsistent nachverfolgt wird](../attendance/tracking-attendance.md) für Ihre Gottesdienste und Gruppen
- Stellen Sie sicher, dass Ihre [Gruppen](../groups/creating-groups.md) und Gottesdienste in B1 Admin konfiguriert sind
- Sie benötigen die entsprechenden [Berechtigungen](../settings/roles-permissions.md) zum Zugriff auf Berichte

</div>

## Anwesenheitstrend

Der Bericht „Anwesenheitstrend" zeigt, wie sich die Anwesenheit im Laufe der Zeit für Ihre Gottesdienste ändert.

1. Navigieren Sie direkt zu **admin.b1.church/reports/attendanceTrend** in Ihrem Browser (Berichte haben keinen Eintrag im Navigationsmenü -- das Lesezeichen der Adresse ist der einfachste Weg, um zurück zu navigieren). Der gleiche Bericht befindet sich auch auf der Registerkarte **Anwesenheitstrend** der Seite „Anwesenheit".
2. Wählen Sie optional einen **Campus**, einen **Gottesdienst**, eine **Gottesdienstzeit** oder eine **Gruppe** aus, um die Ergebnisse zu filtern.
3. Legen Sie **Startdatum** und **Enddatum** fest. Standardmäßig deckt der Bericht das vergangene Jahr ab, vom vor einem Jahr bis heute, und das Enddatum wird vollständig enthalten. Klicken Sie auf **Bericht ausführen**.
4. Der Bericht zeigt ein Balkendiagramm und eine Tabelle mit den Gesamtbesuchen pro Woche an. Jede Woche ist mit dem Datum des Sonntags dieser Woche gekennzeichnet, und die Spalte **Sitzungsdaten** der Tabelle listet die tatsächlichen Daten in dieser Woche auf, an denen Anwesenheit registriert wurde (z. B. „9/27, 9/30").

Dieser Bericht ist nützlich, um Muster wie saisonale Rückgänge, Wachstumstrends oder die Auswirkung spezieller Veranstaltungen zu erkennen.

## Gruppenanwesenheit

Der Bericht „Gruppenanwesenheit" zeigt, wer in einem Datumsbereich an jeder Gruppensitzung teilgenommen hat.

1. Navigieren Sie direkt zu **admin.b1.church/reports/groupAttendance** in Ihrem Browser oder öffnen Sie die Registerkarte **Gruppenanwesenheit** der Seite „Anwesenheit".
2. Wählen Sie optional einen **Campus** und einen **Gottesdienst** aus.
3. Legen Sie **Startdatum** und **Enddatum** fest. Standardmäßig deckt der Bericht letzten Sonntag bis heute ab, und das Enddatum wird vollständig enthalten.
4. Klicken Sie auf **Bericht ausführen**.

Die Ergebnisse sind nach Sitzungsdatum, dann Gottesdienstzeit, dann Gruppe gruppiert, mit den Personen, die an jeder Gruppe teilgenommen haben, aufgelistet darunter. Gottesdienstzeiten, Gruppen und Namen sind alphabetisch sortiert. Neben dem Namen jeder Person zeigt die Spalte **Eingecheckt** die Zeit an, zu der ihre Anwesenheit aufgezeichnet wurde (leer, wenn keine Zeit auf Datei ist) und die Spalte **Mitgliedschaftsstatus** zeigt ihren Status wie Mitglied oder Besucher.

Um eine Tabellenkalkulation herunterzuladen, klicken Sie auf **Downloadoptionen** und wählen Sie **Zusammenfassung**. Die CSV hat:

- Eine Zeile pro Mitglied jeder Gruppe, die im Datumsbereich zusammenkam, sortiert nach Gruppe und dann Name.
- Der Name der Person und der Gruppenname in den ersten Spalten.
- Eine Spalte pro Datum der Sitzung, benannt mit dem Gottesdienst, der Gottesdienstzeit und dem Datum (z. B. „Sonntag - 9:00 AM (2026-09-27)"), mit jeder Person markiert **anwesend** oder **abwesend**.

Verwenden Sie diesen Bericht, um die Anwesenheit zwischen Gruppen zu vergleichen und festzustellen, welche Gruppen wachsen oder Aufmerksamkeit benötigen.

## Tägliche Gruppenanwesenheit

Der Bericht „Tägliche Gruppenanwesenheit" bietet eine tägliche Aufschlüsselung der Anwesenheitsdaten für Ihre Gruppen.

1. Navigieren Sie direkt zu **admin.b1.church/reports/dailyGroupAttendance** in Ihrem Browser.
2. Legen Sie den **Datumsbereich** für den Bericht fest.
3. Wählen Sie die **Gruppe(n)** aus, die Sie überprüfen möchten.
4. Der Bericht zeigt die Anwesenheitszahlen für jeden einzelnen Tag im Bereich.

Dieser Bericht bietet detaillierte Informationen, die zum Verständnis der Variation von Woche zu Woche oder zum Erkennen bestimmter Tage mit ungewöhnlich hoher oder niedriger Anwesenheit hilfreich sind.

:::tip
Verwenden Sie den Bericht „Anwesenheitstrend" für einen hohen Überblick und den Bericht „Tägliche Gruppenanwesenheit", wenn Sie bestimmte Daten durchsuchen müssen.
:::

## Praktische Anwendungen

- **Planung** -- Verwenden Sie Anwesenheitstrends, um Sitzplätze, Personal und Ressourcen für bevorstehende Gottesdienste zu planen.
- **Gemeindeaufbau** -- Erkennen Sie frühzeitig abnehmende Anwesenheitsmuster, damit Sie Mitglieder nachverfolgen können.
- **Leitungsberichte** -- Beziehen Sie Anwesenheitsdaten in Ihre regelmäßigen Leitungsberichte ein, um die Ministeriumsgesundheit zu zeigen.
- **Veranstaltungsevaluation** -- Vergleichen Sie die Anwesenheit vor und nach speziellen Veranstaltungen, um deren Auswirkung zu messen.

:::warning
Anwesenheitsdaten werden über Ihre Gruppen- und Gottesdienstcheck-in-Prozesse aufgezeichnet. Wenn die Anwesenheit nicht konsistent nachverfolgt wird, spiegeln Ihre Berichte nicht genau die tatsächliche Teilnahme wider. Weitere Informationen finden Sie unter [Nachverfolgen von Anwesenheit](../attendance/tracking-attendance.md) für Anweisungen zum Setup.
:::
