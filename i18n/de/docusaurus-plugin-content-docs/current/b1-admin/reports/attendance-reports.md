---
title: "Anwesenheitsberichte"
---

# Anwesenheitsberichte

<div class="article-intro">

B1 Admin bietet drei Anwesenheitsberichte, um Ihnen zu verstehen, wie sich Menschen mit Ihren Gottesdiensten und Gruppen auseinandersetzen. Jeder Bericht bietet eine andere Perspektive auf Ihre Anwesenheitsdaten, von Höhetrends bis zu täglichen Aufschlüsselungen.

</div>

<div class="prereqs">
<h4>Voraussetzungen</h4>

- Stellen Sie sicher, dass Anwesenheit für Ihre Gottesdienste und Gruppen [konsistent verfolgt wird](../attendance/tracking-attendance.md)
- Stellen Sie sicher, dass Ihre [Gruppen](../groups/creating-groups.md) und Gottesdienste in B1 Admin konfiguriert sind
- Sie benötigen die entsprechenden [Berechtigungen](../settings/roles-permissions.md), um auf Berichte zuzugreifen

</div>

## Anwesenheitstrend

Der Bericht Anwesenheitstrend zeigt, wie sich die Anwesenheit im Laufe der Zeit für Ihre Gottesdienste ändert.

1. Gehen Sie direkt zu **admin.b1.church/reports/attendanceTrend** in Ihrem Browser (Berichte haben keinen Eintrag im Navigationsmenü -- das Lesezeichen der Adresse ist der einfachste Weg, um dorthin zurückzukehren). Der gleiche Bericht wird auch auf der Registerkarte **Anwesenheitstrend** der Anwesenheitsseite angezeigt.
2. Wählen Sie optional einen **Gemeindezweig**, **Gottesdienst**, **Gottesdienstzeit** oder **Gruppe**, um die Ergebnisse zu filtern, dann klicken Sie auf **Bericht ausführen**.
3. Der Bericht zeigt ein Balkendiagramm und eine Tabelle der Gesamtbesuche pro Woche. Jede Woche ist mit dem Datum des Sonntags dieser Woche gekennzeichnet.

Dieser Bericht ist nützlich, um Muster wie saisonale Rückgänge, Wachstumstrends oder die Auswirkungen von Sonderveranstaltungen zu erkennen.

## Gruppenanwesenheit

Der Bericht Gruppenanwesenheit zeigt, wer an jeder Gruppensitzung in einem Datumsbereich teilgenommen hat.

1. Gehen Sie direkt zu **admin.b1.church/reports/groupAttendance** in Ihrem Browser, oder öffnen Sie die Registerkarte **Gruppenanwesenheit** der Anwesenheitsseite.
2. Wählen Sie optional einen **Gemeindezweig** und **Gottesdienst**.
3. Stellen Sie das **Startdatum** und das **Enddatum** ein. Standardmäßig deckt der Bericht letzten Sonntag bis heute ab, und das Enddatum ist vollständig enthalten.
4. Klicken Sie auf **Bericht ausführen**.

Die Ergebnisse werden nach Sitzungsdatum gruppiert, dann nach Gottesdienstzeit, dann nach Gruppe, wobei die Personen, die teilgenommen haben, unter jeder Gruppe aufgelistet werden. Gottesdienstezeiten, Gruppen und Namen sind alphabetisch sortiert.

Um eine Tabellenkalkulation herunterzuladen, klicken Sie auf **Download-Optionen** und wählen Sie **Zusammenfassung**. Die CSV hat:

- Eine Zeile pro Mitglied jeder Gruppe, die im Datumsbereich traf, sortiert nach Gruppe und dann Name.
- Den Namen der Person und den Gruppennamen in den ersten Spalten.
- Eine Spalte pro datierter Sitzung, benannt mit dem Gottesdienst, der Gottesdienstzeit und dem Datum (zum Beispiel "Sonntag - 9:00 Uhr (2026-09-27)"), wobei jede Person als **anwesend** oder **abwesend** gekennzeichnet ist.

Verwenden Sie diesen Bericht, um die Anwesenheit über Gruppen hinweg zu vergleichen und zu identifizieren, welche Gruppen wachsen oder Aufmerksamkeit benötigen.

## Tägliche Gruppenanwesenheit

Der Bericht Tägliche Gruppenanwesenheit bietet eine Aufschlüsselung Tag für Tag der Anwesenheitsdaten Ihrer Gruppen.

1. Gehen Sie direkt zu **admin.b1.church/reports/dailyGroupAttendance** in Ihrem Browser.
2. Stellen Sie den **Datumsbereich** für den Bericht ein.
3. Wählen Sie die **Gruppe(n)**, die Sie überprüfen möchten.
4. Der Bericht zeigt Anwesenheitszahlen für jeden einzelnen Tag im Bereich.

Dieser Bericht gibt Ihnen körniges Detail, was nützlich ist, um Woche-zu-Woche-Variation zu verstehen oder spezifische Tage mit ungewöhnlich hoher oder niedriger Anwesenheit zu identifizieren.

:::tip
Verwenden Sie den Bericht Anwesenheitstrend für einen Überblick auf hoher Ebene und den Bericht Tägliche Gruppenanwesenheit, wenn Sie in spezifische Daten einsteigen müssen.
:::

## Praktische Anwendungen

- **Planung** -- Verwenden Sie Anwesenheitstrends, um Plätze, Personal und Ressourcen für bevorstehende Gottesdienste zu planen.
- **Outreach** -- Identifizieren Sie sinkende Anwesenheitsmuster früh, damit Sie Mitgliedern nachfassen können.
- **Vorstandsberichte** -- Beziehen Sie Anwesenheitsdaten in Ihre regelmäßigen Führungsberichte ein, um die Gesundheit des Ministeriums zu zeigen.
- **Event-Evaluierung** -- Vergleichen Sie die Anwesenheit vor und nach Sonderveranstaltungen, um deren Auswirkungen zu messen.

:::warning
Anwesenheitsdaten werden durch Ihre Gruppen- und Gottesdienst-Check-in-Prozesse erfasst. Wenn Anwesenheit nicht konsistent verfolgt wird, spiegeln Ihre Berichte nicht genau die tatsächliche Teilnahme wider. Siehe [Anwesenheit verfolgen](../attendance/tracking-attendance.md) für Setup-Anweisungen.
:::
