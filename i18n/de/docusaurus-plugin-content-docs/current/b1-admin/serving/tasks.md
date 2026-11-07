---
title: "Aufgaben"
description: "Aufgaben in B1 Admin erstellen, zuweisen und abschließen; zu finden unter Serving > My Work, mit Fälligkeitserinnerungen, damit nichts vergessen wird."
---

# Aufgaben

<div class="article-intro">

Mit Aufgaben weisen Sie Personen oder Gruppen in Ihrer Kirche Handlungspunkte zu. Ob es sich um eine einmalige To-do oder eine wiederkehrende Verantwortung handelt – Aufgaben helfen Ihnen nachzuverfolgen, was zu tun ist und wer dafür verantwortlich ist, damit nichts übersehen wird.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Stellen Sie sicher, dass die Personen oder [Gruppen](../groups/creating-groups.md), denen Sie Aufgaben zuweisen möchten, in B1 Admin existieren
- Wählen Sie im [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) **Dienst > Meine Arbeit**, um Aufgaben zu sehen

</div>

## Aufgaben ansehen

Wählen Sie im Sprungmenü **Dienst > Meine Arbeit** (oder suchen Sie nach „Meine Arbeit“). Die Liste **Aufgaben** zeigt jeweils den Titel der Aufgabe, mit wem sie verbunden ist, wem sie zugewiesen ist, wann sie eröffnet wurde und ihren Status. Ihre [Workflow](./workflows.md)-Karten erscheinen daneben unter **Meine Karten**.

Verwenden Sie die Reiter oberhalb der Liste, um zwischen den Aufgaben **Mir zugewiesen**, **Meinen Gruppen zugewiesen** und **Von mir angefragt** zu wechseln. Jeder Reiter zeigt an, wie viele Aufgaben er enthält.

:::tip
Standardmäßig werden nur offene Aufgaben angezeigt. Wählen Sie **Geschlossen** oberhalb der Liste, um stattdessen erledigte Aufgaben zu sehen.
:::

## Eine Aufgabe anlegen

1. Klicken Sie auf der Seite **Meine Arbeit** auf **Aufgabe hinzufügen**. Ein Formular **Neue Aufgabe** öffnet sich.
2. Klicken Sie auf das Feld **Verbunden mit** und wählen Sie die Person, um die es in der Aufgabe geht.
3. Klicken Sie auf das Feld **Zuweisen an**. Suchen Sie im Fenster **Person oder Gruppe auswählen** auf dem Reiter **Person** oder wechseln Sie zum Reiter **Gruppe** und suchen Sie nach einer Gruppe, und wählen Sie dann das Ergebnis aus.
4. Geben Sie einen **Titel** für die Aufgabe ein.
5. Wählen Sie optional ein **Fälligkeitsdatum**.
6. Fügen Sie **Notizen** mit Details oder Anweisungen für die zuständige Person hinzu.
7. Klicken Sie auf **Speichern**.

Die Aufgabe erscheint nun in der Aufgabenliste und ist auf dem Dashboard und in der mobilen App der zuständigen Person sichtbar.

## Eine Aufgabe verwalten

Klicken Sie auf eine beliebige Aufgabe, um deren Detailseite zu öffnen. Von hier aus können Sie:

- **Die Aufgabe schließen oder wieder öffnen** – Klicken Sie auf **Aufgabe schließen**, wenn die Arbeit erledigt ist, oder auf **Aufgabe wieder öffnen**, um sie erneut zu öffnen.
- **Die Aufgabe neu zuweisen** – Klicken Sie auf **Zuweisen**, um eine andere Person oder Gruppe zu wählen.
- **Ändern, um wen es geht** – Klicken Sie auf **Verbinden**, um eine andere Person auszuwählen.
- **Das Fälligkeitsdatum ändern** – Wählen Sie im Feld **Fällig** ein Datum; es wird gespeichert, sobald Sie das Feld verlassen. (Aufgaben, die für eine [Bestätigung einer Dienstaufgabe](./workflows.md#serving-assignment-confirmations) erstellt wurden, zeigen ihr Fälligkeitsdatum, können hier aber nicht geändert werden.)
- **Notizen hinzufügen** – Veröffentlichen Sie Aktualisierungen oder Details für die zuständige Person in den Notizen der Aufgabe.
- **Erinnerungen festlegen** – Siehe [Erinnerungen für Aufgaben](#task-reminders) unten.

## Erinnerungen für Aufgaben {#task-reminders}

Eine Aufgabe mit Fälligkeitsdatum kann die zuständige Person vor dem Fälligkeitstermin erinnern.

1. Klicken Sie auf der Seite der Aufgabe neben **Erinnerungen** auf **Bearbeiten**.
2. Aktivieren Sie **Erinnerungen für diese Aufgabe senden**.
3. Wählen Sie unter **Wann sollen Erinnerungen versendet werden?** bis zu drei Zeitpunkte: **7 Tage vorher**, **3 Tage vorher**, **1 Tag vorher** oder **Am Tag selbst**.
4. Legen Sie die **Uhrzeit** fest und optional eine **Nachricht**.
5. Wählen Sie unter **Versand über** **Push**, **E-Mail** und – falls Ihre Kirche einen [Anbieter für Textnachrichten](../settings/church-settings.md#texting) verbunden hat – **Text**.
6. Klicken Sie auf **Erinnerungen speichern**.

Hat die Aufgabe kein Fälligkeitsdatum, warnt Sie B1, dass keine Erinnerungen versendet werden, bis im Feld **Fällig** ein Datum gesetzt ist. Textnachrichten-Erinnerungen erreichen nur Personen, die unter ihren [Benachrichtigungseinstellungen](../../b1-church/getting-started/notification-preferences.md) **Textnachrichten** aktiviert haben, und jede Nachricht kann Ihre Kirche Geld kosten.

## Lebenszyklus einer Aufgabe

1. Eine neue Aufgabe beginnt mit dem Status **Offen**.
2. Die zuständige Person erhält eine Benachrichtigung und kann die Aufgabe auf ihrem Dashboard, unter **Dienst > Meine Arbeit** oder in der mobilen App ansehen.
3. Ist die Arbeit erledigt, klickt die zuständige Person (oder ein Administrator) auf **Aufgabe schließen**.
4. Geschlossene Aufgaben verschwinden aus der Standardansicht, lassen sich aber weiterhin finden, indem Sie oberhalb der Aufgabenliste **Geschlossen** wählen.

:::info
B1 Admin legt keine wiederkehrenden Aufgaben mehr nach einem Zeitplan an. Für wiederholte Nachfassaktionen bei Personen verwenden Sie einen [Workflow](./workflows.md) mit einem [Zeitplan-Auslöser](./workflows.md#schedule-triggers).
:::

:::tip
Wenn viele Personen dieselben Stationen durchlaufen müssen – etwa die Betreuung neuer Besucher oder ein Mitgliedschaftsverfahren –, verwenden Sie [Workflows](./workflows.md). Workflows machen Aufgaben zu Karten auf einem Drag-and-Drop-Board mit Schritten, Fälligkeitsterminen und Weiterleitung.
:::

:::info
Einige Aufgaben werden automatisch von anderen Bereichen in B1 erstellt und öffnen eine spezielle Prüfkarte statt der üblichen Ansicht für Notizen und Neuzuweisung – [Beitrittsanfragen für Gruppen](../groups/group-join-requests.md#approving-from-the-tasks-page), [Änderungswünsche am Profil](../profile/approving-profile-changes.md) und [Anfragen zur Kontolöschung](../profile/account-deletion.md) funktionieren alle auf diese Weise.
:::

## Nächste Schritte

- Führen Sie Personen mit [Workflows](./workflows.md) durch einen mehrstufigen Prozess
- Nutzen Sie [Workflows](./workflows.md), um Personen automatisch durch wiederholbare Abläufe zu führen
- Verwenden Sie Aufgaben zusammen mit [Dienstplänen](./plans.md), um Vorbereitungsschritte für Gottesdienste nachzuverfolgen
