---
title: "Teilnahme verfolgen"
---

# Teilnahme verfolgen

<div class="article-intro">

Sobald Ihre Standorte, Gottesdienstzeiten und Gruppen konfiguriert sind, macht es B1 Admin einfach, Teilnahmendaten zu überprüfen und Trends zu erkennen. Die Seite "Teilnahme" bietet zwei Berichtansichten – die Registerkarte **Teilnahme-Trend** für kirchenweite Trends und die Registerkarte **Gruppenteilnahme** für Gruppenebenen-Details. Verwenden Sie diese Tools, um Wachstumsmuster zu verstehen, rückläufiges Engagement zu erkennen und datengesteuerte Entscheidungen für Ihre Kirche zu treffen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ihre Anwesenheitsstruktur muss mit mindestens einem Standort und einer Gottesdienstzeit eingerichtet werden. Siehe [Anwesenheitseinrichtung](setup.md), falls Sie dies noch nicht getan haben.
- Teilnahmendaten müssen aufgezeichnet werden, bevor Berichte Ergebnisse zeigen. Daten können aus [manuellen Einträgen](recording-attendance.md) oder [Selbstanmeldung](check-in.md) stammen.

</div>

## Teilnahe-Trends anzeigen

1. Öffnen Sie **B1 Admin**, öffnen Sie das [Jump-Menü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), erweitern Sie **Personen**, und klicken Sie auf **Teilnahme**.
2. Klicken Sie auf die Registerkarte **Teilnahme-Trend**.
3. Der Bericht wird automatisch ausgeführt, wenn die Registerkarte geöffnet wird, und zeigt die Gesamtteilnahme für jede Woche.

## Ihre Daten filtern

Verwenden Sie die Filter im Feld **Bericht filtern**, um die Ergebnisse einzugrenzen, und klicken Sie auf **Bericht ausführen**:

- **Standort** – wählen Sie einen Standort aus, um Teilnahmen nur für diesen Ort anzuzeigen.
- **Service** – beschränken Sie den Bericht auf einen Service.
- **Gottesdienstzeit** – wählen Sie eine Gottesdienstzeit, um einen bestimmten Service genauer zu untersuchen.
- **Gruppe** – zeigen Sie Teilnahme für eine Einzelgruppe an.
- **Startdatum** und **Enddatum** – der einzubeziehende Datumsbereich. Der Bericht deckt standardmäßig das vergangene Jahr ab, von vor einem Jahr bis heute, und das Enddatum ist vollständig enthalten.

Der Bericht zeigt ein Balkendiagramm und eine Tabelle der Gesamtbesuche pro Woche. Jede Woche wird mit dem Datum des Sonntags dieser Woche gekennzeichnet. Die Tabelle hat auch eine Spalte **Sitzungsdaten**, die die tatsächlichen Daten in dieser Woche auflistet, an denen Teilnahmen aufgezeichnet wurden (z.B. "27.09., 30.09."), sodass Sie sehen können, wenn eine Mittwochveranstaltung in der gleichen Woche wie Sonntag gezählt wird.

:::info
Berichte werden automatisch ausgeführt, wenn Sie die Registerkarte Teilnahme-Trend öffnen, sodass Sie immer aktuelle Zahlen sehen, ohne einen Aktualisierungsschaltfläche klicken zu müssen.
:::

## Gruppenteilnahme

Die Registerkarte **Gruppenteilnahme** zeigt, wer jede Gruppensiezzung besucht hat. Dies ist nützlich, wenn Sie eine bestimmte Klasse, ein Ministerium-Team oder eine kleine Gruppe überwachen möchten, anstatt auf die allgemeinen Service-Zahlen zu schauen.

1. Wählen Sie die Registerkarte **Gruppenteilnahme**.
2. Wählen Sie optional einen **Standort** und einen **Service**.
3. Legen Sie das **Startdatum** und **Enddatum** fest. Der Bericht deckt standardmäßig den letzten Sonntag bis heute ab.
4. Klicken Sie auf **Bericht ausführen**.

Ergebnisse werden nach Sitzungsdatum, dann nach Gottesdienstzeit und Gruppe gruppiert, mit den Personen, die jede Gruppe besucht hat, aufgelistet darunter. Gottesdienstzeiten, Gruppen und Namen werden alphabetisch sortiert, damit jede Überschrift einmal angezeigt wird. Jede Personenzeile zeigt auch eine Spalte **Angemeldet** mit der Zeit, zu der ihre Teilnahme aufgezeichnet wurde (leer, wenn keine Zeit vorhanden ist) und eine Spalte **Mitgliedschaftsstatus** (z.B. Mitglied oder Besucher), sodass Sie Gäste auf einen Blick erkennen können.

Um die Daten herunterzuladen, klicken Sie auf **Download-Optionen** und wählen Sie **Zusammenfassung**. Die CSV hat eine Zeile pro Gruppenmitglied, sortiert nach Gruppe und dann nach Name, und eine Spalte für jede datierte Sitzung in dem Bereich (z.B. "Sonntag - 9:00 Uhr (27.09.2026)") markiert **anwesend** oder **abwesend**.

:::tip
Gruppenteilnahme ist besonders wertvoll für [kleine Gruppen](../groups/creating-groups.md)-Leiter, die Engagement innerhalb ihrer Gruppe im Laufe der Zeit verfolgen möchten.
:::

## Tipps zur Verwendung von Teilnahmendaten

- Überprüfen Sie Trends monatlich, um saisonale Muster frühzeitig zu erkennen.
- Vergleichen Sie Daten auf Standortebene, um zu verstehen, welche Orte wachsen.
- Verwenden Sie Berichte auf Gruppenebene, um [Gruppen](../groups/group-members.md) zu befolgen, die rückläufige Teilnahmen zeigen.
- Kombinieren Sie Teilnahme-Erkenntnisse mit dem [KI-Suche](../people/ai-search.md)-Tool, um Personen zu finden, die kürzlich nicht anwesend waren.

## Verwandte Seiten

- [Teilnahme aufzeichnen](recording-attendance.md) – Teilnahme für eine Gruppensiezzung manuell eingeben
- [Kopfzahl Erfassung & Trend](headcount-entry.md) – eine einfachere nur-Total-Alternative mit eigenem wöchentlichen Trendbericht
- [Anmeldung](check-in.md) – richten Sie Selbstanmeldung ein, damit Teilnahme automatisch aufgezeichnet wird
