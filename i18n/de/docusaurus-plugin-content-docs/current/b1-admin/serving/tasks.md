---
title: "Aufgaben"
---

# Aufgaben

<div class="article-intro">

Mit Aufgaben weisen Sie Personen oder Gruppen in Ihrer Kirche Handlungspunkte zu. Ob einmalige To-do oder wiederkehrende Verantwortung -- Aufgaben helfen Ihnen, den Überblick darüber zu behalten, was zu tun ist und wer dafür verantwortlich ist, damit nichts übersehen wird.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Stellen Sie sicher, dass die Personen oder [Gruppen](../groups/creating-groups.md), denen Sie Aufgaben zuweisen möchten, in B1 Admin vorhanden sind
- Wählen Sie im [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) **Dienst > Meine Arbeit**, um Aufgaben anzuzeigen

</div>

## Aufgaben ansehen

Wählen Sie im Sprungmenü **Dienst > Meine Arbeit** (oder suchen Sie nach "Meine Arbeit"). Die Liste **Aufgaben** zeigt für jede Aufgabe den Titel, die zugehörige Person oder Gruppe, die zugewiesene Person, das Datum der Eröffnung und den Status. Ihre [Workflow](./workflows.md)-Karten erscheinen daneben unter **Meine Karten**.

Mit den Reitern oberhalb der Liste wechseln Sie zwischen den Aufgaben **Mir zugewiesen**, **Meinen Gruppen zugewiesen** und **Von mir angefragt**. Jeder Reiter zeigt an, wie viele Aufgaben er enthält.

:::tip
Standardmäßig werden nur offene Aufgaben angezeigt. Wählen Sie oberhalb der Liste **Abgeschlossen**, um stattdessen erledigte Aufgaben zu sehen.
:::

## Eine Aufgabe erstellen

1. Klicken Sie auf der Seite **Meine Arbeit** auf **Aufgabe hinzufügen**. Ein Formular **Neue Aufgabe** öffnet sich.
2. Klicken Sie optional auf das Feld **Zugehörig zu** und wählen Sie die Person oder Gruppe, um die es in der Aufgabe geht. Lassen Sie das Feld leer für ein einfaches To-do, das niemanden betrifft, etwa eine Erinnerung für Sie selbst.
3. Klicken Sie auf das Feld **Zuweisen an**. Im Fenster **Person oder Gruppe auswählen** suchen Sie auf dem Reiter **Person** oder wechseln Sie zum Reiter **Gruppe** und suchen dort nach einer Gruppe. Wählen Sie dann das Ergebnis aus.
4. Geben Sie einen **Titel** für die Aufgabe ein.
5. Wählen Sie optional ein **Fälligkeitsdatum**.
6. Fügen Sie unter **Notizen** Details oder Anweisungen für die zugewiesene Person hinzu.
7. Klicken Sie auf **Speichern**.

Die Aufgabe erscheint nun in der Aufgabenliste und ist für die zugewiesene Person auf ihrem Dashboard und in der mobilen App sichtbar.

## Eine Aufgabe verwalten

Klicken Sie auf eine beliebige Aufgabe, um deren Detailseite zu öffnen. Von dort aus können Sie:

- **Aufgabe schließen oder wieder öffnen** -- Klicken Sie auf **Aufgabe schließen**, wenn die Arbeit erledigt ist, oder auf **Aufgabe wieder öffnen**, um sie erneut zu öffnen.
- **Die Aufgabe neu zuweisen** -- Klicken Sie auf **Zuweisen**, um eine andere Person oder Gruppe auszuwählen.
- **Ändern, auf wen sich die Aufgabe bezieht** -- Klicken Sie auf **Zuordnen**, um eine andere Person oder Gruppe auszuwählen, oder wählen Sie **Keine Person oder Gruppe**, um die Zuordnung zu entfernen.
- **Das Fälligkeitsdatum ändern** -- Wählen Sie ein Datum im Feld **Fällig**; es wird gespeichert, sobald Sie den Cursor woanders hinbewegen. (Aufgaben, die für eine [Bestätigung einer Dienstzuweisung](./workflows.md#serving-assignment-confirmations) erstellt wurden, zeigen ihr Fälligkeitsdatum an, können hier aber nicht geändert werden.)
- **Notizen hinzufügen** -- Veröffentlichen Sie Updates oder Details für die zugewiesene Person in den Notizen der Aufgabe.
- **Erinnerungen festlegen** -- Siehe [Aufgaben-Erinnerungen](#task-reminders) unten.

## Aufgaben-Erinnerungen {#task-reminders}

Eine Aufgabe mit Fälligkeitsdatum kann ihre zugewiesene Person vor dem Termin erinnern.

1. Klicken Sie auf der Seite der Aufgabe neben **Erinnerungen** auf **Bearbeiten**.
2. Aktivieren Sie **Erinnerungen für diese Aufgabe senden**.
3. Wählen Sie unter **Wann sollen Erinnerungen versendet werden?** bis zu drei Zeitpunkte: **7 Tage vorher**, **3 Tage vorher**, **1 Tag vorher** oder **Am Tag selbst**.
4. Legen Sie die **Uhrzeit** und optional eine **Nachricht** fest.
5. Wählen Sie unter **Senden per** **Push**, **E-Mail** und -- falls Ihre Kirche einen [Anbieter für Textnachrichten](../settings/church-settings.md#texting) verbunden hat -- **SMS**.
6. Klicken Sie auf **Erinnerungen speichern**.

Hat die Aufgabe kein Fälligkeitsdatum, warnt B1 Sie, dass keine Erinnerungen versendet werden, bis im Feld **Fällig** ein Datum gesetzt ist. SMS-Erinnerungen erreichen nur Personen, die unter ihren [Benachrichtigungseinstellungen](../../b1-church/getting-started/notification-preferences.md) **Textnachrichten** aktiviert haben, und jede SMS kann Ihre Kirche Geld kosten.

## Lebenszyklus einer Aufgabe

1. Eine neue Aufgabe beginnt mit dem Status **Offen**.
2. Die zugewiesene Person erhält eine Benachrichtigung und kann die Aufgabe über ihr Dashboard, unter **Dienst > Meine Arbeit** oder in der mobilen App ansehen.
3. Sobald die Arbeit erledigt ist, klickt die zugewiesene Person (oder ein Administrator) auf **Aufgabe schließen**.
4. Abgeschlossene Aufgaben verschwinden aus der Standardansicht, lassen sich aber weiterhin finden, indem Sie oberhalb der Aufgabenliste **Abgeschlossen** wählen.

:::info
B1 Admin erstellt keine wiederkehrenden Aufgaben mehr nach Zeitplan. Für regelmäßige Nachfassaktionen bei Personen verwenden Sie einen [Workflow](./workflows.md) mit einem [Zeitplan-Auslöser](./workflows.md#schedule-triggers).
:::

:::tip
Wenn viele Personen dieselben Schritte durchlaufen sollen -- etwa die Nachbetreuung neuer Besucher oder ein Mitgliedschaftsprozess -- nutzen Sie [Workflows](./workflows.md). Workflows verwandeln Aufgaben in Karten auf einem Drag-and-Drop-Board mit Schritten, Fälligkeitsdaten und Zuweisungen.
:::

:::info
Einige Aufgaben werden automatisch von anderen Teilen von B1 erstellt und öffnen eine besondere Prüfkarte statt der üblichen Ansicht für Notizen und Neuzuweisung -- das gilt für [Beitrittsanfragen zu Gruppen](../groups/group-join-requests.md#approving-from-the-tasks-page), [Anfragen zur Änderung von Profilen](../profile/approving-profile-changes.md) und [Anfragen zur Löschung von Konten](../profile/account-deletion.md).
:::

## Nächste Schritte

- Bringen Sie Personen mit [Workflows](./workflows.md) durch einen mehrstufigen Prozess
- Nutzen Sie [Workflows](./workflows.md), um Personen automatisch durch wiederholbare Prozesse zu führen
- Nutzen Sie Aufgaben zusammen mit [Dienstplänen](./plans.md), um Vorbereitungspunkte für den Gottesdienst im Blick zu behalten
