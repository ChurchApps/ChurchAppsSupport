---
title: "Aufgaben"
---

# Aufgaben

<div class="article-intro">

Mit Aufgaben weisen Sie Personen oder Gruppen in Ihrer Kirche Handlungsaufträge zu. Ob einmalige Erledigung oder wiederkehrende Verantwortung -- Aufgaben helfen Ihnen nachzuverfolgen, was zu tun ist und wer dafür verantwortlich ist, damit nichts übersehen wird.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Stellen Sie sicher, dass die Personen oder [Gruppen](../groups/creating-groups.md), denen Sie Aufgaben zuweisen möchten, in B1 Admin vorhanden sind
- Wählen Sie im [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) **Dienst > Meine Arbeit**, um Aufgaben anzuzeigen

</div>

## Aufgaben ansehen

Wählen Sie im Sprungmenü **Dienst > Meine Arbeit** (oder suchen Sie nach "Meine Arbeit"). Die Liste **Aufgaben** zeigt Titel jeder Aufgabe, mit wem sie verknüpft ist, wem sie zugewiesen ist, wann sie eröffnet wurde und ihren Status. Ihre [Workflow](./workflows.md)-Karten erscheinen daneben unter **Meine Karten**.

Verwenden Sie die Reiter oberhalb der Liste, um zwischen **Mir zugewiesen**, **Meinen Gruppen zugewiesen** und **Von mir angefragt** zu wechseln. Jeder Reiter zeigt, wie viele Aufgaben er enthält.

:::tip
Standardmäßig werden nur offene Aufgaben angezeigt. Wählen Sie **Geschlossen** oberhalb der Liste, um stattdessen abgeschlossene Aufgaben zu sehen.
:::

## Eine Aufgabe anlegen

1. Klicken Sie auf der Seite **Meine Arbeit** auf **Aufgabe hinzufügen**. Ein Formular **Neue Aufgabe** öffnet sich.
2. Klicken Sie auf das Feld **Verknüpfen mit** und wählen Sie die Person, um die es in der Aufgabe geht.
3. Klicken Sie auf das Feld **Zuweisen an**. Suchen Sie im Fenster **Person oder Gruppe auswählen** auf dem Reiter **Person** oder wechseln Sie zum Reiter **Gruppe** und suchen Sie dort nach einer Gruppe. Wählen Sie dann das Ergebnis aus.
4. Geben Sie einen **Titel** für die Aufgabe ein.
5. Wählen Sie optional ein **Fälligkeitsdatum**.
6. Fügen Sie unter **Notizen** Details oder Anweisungen für die verantwortliche Person hinzu.
7. Klicken Sie auf **Speichern**.

Die Aufgabe erscheint nun in der Aufgabenliste und ist für die verantwortliche Person auf ihrem Dashboard und in der mobilen App sichtbar.

## Eine Aufgabe verwalten

Klicken Sie auf eine beliebige Aufgabe, um ihre Detailseite zu öffnen. Von hier aus können Sie:

- **Aufgabe schließen oder wieder öffnen** -- Klicken Sie auf **Aufgabe schließen**, wenn die Arbeit erledigt ist, oder auf **Aufgabe wieder öffnen**, um sie erneut zu öffnen.
- **Aufgabe neu zuweisen** -- Klicken Sie auf **Zuweisen**, um eine andere Person oder Gruppe auszuwählen.
- **Betreffende Person ändern** -- Klicken Sie auf **Verknüpfen**, um eine andere Person auszuwählen.
- **Fälligkeitsdatum ändern** -- Wählen Sie im Feld **Fällig** ein Datum; es wird gespeichert, sobald Sie das Feld verlassen. (Aufgaben, die für eine [Bestätigung einer Dienstzuweisung](./workflows.md#serving-assignment-confirmations) erstellt wurden, zeigen ihr Fälligkeitsdatum, können hier aber nicht geändert werden.)
- **Notizen hinzufügen** -- Veröffentlichen Sie Aktualisierungen oder Details für die verantwortliche Person in den Notizen der Aufgabe.
- **Erinnerungen festlegen** -- Siehe [Erinnerungen zu Aufgaben](#task-reminders) unten.

## Erinnerungen zu Aufgaben

Eine Aufgabe mit Fälligkeitsdatum kann die verantwortliche Person vor dem Fälligkeitstermin erinnern.

1. Klicken Sie auf der Seite der Aufgabe neben **Erinnerungen** auf **Bearbeiten**.
2. Aktivieren Sie **Erinnerungen für diese Aufgabe senden**.
3. Wählen Sie unter **Wann sollen Erinnerungen versendet werden?** bis zu drei Zeitpunkte: **7 Tage vorher**, **3 Tage vorher**, **1 Tag vorher** oder **Am Tag selbst**.
4. Legen Sie die **Uhrzeit** fest und fügen Sie optional eine **Nachricht** hinzu.
5. Wählen Sie unter **Senden über** **Push**, **E-Mail** und, falls Ihre Kirche einen [SMS-Anbieter](../settings/church-settings.md#texting) verbunden hat, **SMS**.
6. Klicken Sie auf **Erinnerungen speichern**.

Hat die Aufgabe kein Fälligkeitsdatum, warnt B1 Sie, dass keine Erinnerungen versendet werden, bis im Feld **Fällig** ein Datum gesetzt ist. SMS-Erinnerungen erreichen nur Personen, die unter ihren [Benachrichtigungseinstellungen](../../b1-church/getting-started/notification-preferences.md) **SMS-Nachrichten** aktiviert haben, und jede SMS kann Ihre Kirche Geld kosten.

## Lebenszyklus einer Aufgabe

1. Eine neue Aufgabe beginnt mit dem Status **Offen**.
2. Die verantwortliche Person erhält eine Benachrichtigung und kann die Aufgabe über ihr Dashboard, **Dienst > Meine Arbeit** oder die mobile App ansehen.
3. Ist die Arbeit erledigt, klickt die verantwortliche Person (oder ein Administrator) auf **Aufgabe schließen**.
4. Geschlossene Aufgaben werden aus der Standardansicht entfernt, lassen sich aber weiterhin finden, indem Sie oberhalb der Aufgabenliste **Geschlossen** wählen.

:::info
B1 Admin legt keine wiederkehrenden Aufgaben mehr nach einem Zeitplan an. Für wiederholte Nachfassaktionen bei Personen verwenden Sie einen [Workflow](./workflows.md) mit einem [Zeitplan-Auslöser](./workflows.md#schedule-triggers).
:::

:::tip
Wenn viele Personen dieselben Stufen durchlaufen sollen -- etwa die Nachbetreuung neuer Besucher oder ein Mitgliedschaftsverfahren -- nutzen Sie [Workflows](./workflows.md). Workflows machen Aufgaben zu Karten auf einer Drag-and-Drop-Tafel mit Schritten, Fälligkeitsdaten und Weiterleitung.
:::

:::info
Einige Aufgaben werden automatisch von anderen Bereichen von B1 erstellt und öffnen eine spezielle Prüfkarte statt der üblichen Notiz- und Neuzuweisungsansicht. [Gruppenbeitrittsanfragen](../groups/group-join-requests.md#approving-from-the-tasks-page), [Anfragen zur Profiländerung](../profile/approving-profile-changes.md) und [Anfragen zur Kontolöschung](../profile/account-deletion.md) funktionieren alle auf diese Weise.
:::

## Wie geht es weiter?

- Bringen Sie Personen mit [Workflows](./workflows.md) durch einen mehrstufigen Prozess
- Nutzen Sie [Workflows](./workflows.md), um Personen automatisch durch wiederholbare Prozesse zu führen
- Nutzen Sie Aufgaben zusammen mit [Dienstplänen](./plans.md), um Vorbereitungsaufgaben für den Gottesdienst nachzuverfolgen
