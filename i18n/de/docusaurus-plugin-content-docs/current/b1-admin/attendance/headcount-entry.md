---
title: "Personenzahl erfassen & Verlauf"
description: "Erfassen Sie in B1 Admin eine Gesamtzahl der Anwesenden für einen Gottesdienst oder eine Gruppe, ohne eine namentliche Liste zu führen, und verfolgen Sie diese Summen Woche für Woche im Bericht Verlauf der Personenzahl."
---

# Personenzahl erfassen & Verlauf

<div class="article-intro">

Mit Personenzahlen können Sie eine einfache Gesamtzahl der Anwesenheit erfassen – für einen Gottesdienst, eine Gottesdienstzeit oder eine Gruppe –, ohne eine namentliche Liste einzuchecken. Nutzen Sie dies, wenn Sie nur wissen möchten, „wie viele Personen da waren“, und kombinieren Sie es mit dem Bericht Verlauf der Personenzahl, um diese Zahl über die Zeit zu verfolgen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ihre Standorte, Gottesdienste und Gottesdienstzeiten müssen konfiguriert sein. Siehe [Anwesenheitseinrichtung](setup.md).
- Zum Erfassen einer Personenzahl benötigen Sie die Berechtigung **Anwesenheit &gt; Bearbeiten**; zum Anzeigen des Verlaufsberichts benötigen Sie **Anwesenheit &gt; Anzeigen**. Siehe [Rollen & Berechtigungen](../settings/roles-permissions.md).

</div>

:::info
Personenzahlen sind eine reine Gesamtzahl als Alternative zur [Anwesenheit erfassen](recording-attendance.md). Wenn Sie wissen müssen, **wer** anwesend war – zum Beispiel, um Personen nachzufassen, die nicht mehr gekommen sind –, verwenden Sie weiterhin die namentliche Anwesenheit in den Sitzungen einer Gruppe. Personenzahlen speichern nur eine Zahl.
:::

## Eine Personenzahl erfassen {#recording-a-headcount}

1. Öffnen Sie **B1 Admin**, öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Personen** auf und klicken Sie auf **Anwesenheit**.
2. Klicken Sie in der linken Spalte auf **Personenzahl erfassen**.
3. Füllen Sie das Formular aus:
   - **Gottesdienst** *(erforderlich)*
   - **Gottesdienstzeit** – belassen Sie es bei **Alle Gottesdienstzeiten**, um eine Gesamtzahl über alle Zeiten des Gottesdienstes zu erfassen
   - **Gruppe** – optional; es werden nur Gruppen aufgelistet, für die Anwesenheit erfassen aktiviert ist. Leer lassen für „Keine Gruppe (gesamter Gottesdienst)“.
   - **Datum**
   - **Personenzahl** – die Gesamtzahl der anwesenden Personen (eine ganze Zahl, 0 oder mehr)
4. Klicken Sie auf **Speichern**.

Die Tabelle **Letzte Personenzahlen** neben dem Formular listet Ihre letzten Einträge mit Datum, Gottesdienst, Gottesdienstzeit, Gruppe und Anzahl auf. Klicken Sie auf eine Zeile, um sie zur Korrektur oder zum Löschen wieder in das Formular zu laden.

## Bericht Verlauf der Personenzahl {#headcount-trend-report}

1. Klicken Sie auf derselben Seite **Anwesenheit** in der linken Spalte auf **Alle Jahre** und wählen Sie dann den Reiter **Verlauf der Personenzahl**.
2. Der Bericht wird beim Öffnen des Reiters ausgeführt. Um ihn einzugrenzen, wählen Sie einen **Standort**, **Gottesdienst**, **Gottesdienstzeit** oder eine **Gruppe** und klicken Sie auf **Bericht ausführen**. Es gibt keinen Datumsfilter – der Bericht umfasst jede Woche, für die eine Personenzahl vorliegt.

Der Bericht zeigt Ihre erfassten Personenzahlen wochenweise summiert, sowohl als Liniendiagramm als auch als Tabelle – im gleichen Berichtsstil wie die Reiter [Verlauf der Anwesenheit und Anwesenheit in Gruppen](tracking-attendance.md). Personenzahlen, die für die laufende Woche erfasst wurden, erscheinen außerdem unter **Personenzahlen diese Woche** auf der Hauptseite Anwesenheit.

## Verwandte Seiten {#related-pages}

- [Anwesenheit erfassen](recording-attendance.md) – namentliche Anwesenheit pro Person und Sitzung
- [Anwesenheit verfolgen](tracking-attendance.md) – Berichte zum Verlauf von Anwesenheit und Gruppen
- [Anwesenheitseinrichtung](setup.md) – Standorte, Gottesdienste und Gottesdienstzeiten konfigurieren
