---
title: "Dashboard"
description: "Sehen Sie, was das Dashboard von B1 Admin anzeigt: die Gottesdienstreihenfolge der Woche, wer dient und eingecheckt ist, Punkte, die Ihre Aufmerksamkeit brauchen, sowie Ihre Aufgaben und Gruppen."
---

# Dashboard

<div class="article-intro">

Das Dashboard ist die Startseite von B1 Admin. Es öffnet sich, wenn Sie sich anmelden, und ist um den wöchentlichen Gottesdienst Ihrer Kirche herum aufgebaut: die Gottesdienstreihenfolge des kommenden Plans, wer dient, wer am Sonntag im Raum ist, alles, was auf Sie wartet, sowie Ihre eigenen Aufgaben und Gruppen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Melden Sie sich bei [B1 Admin](https://admin.b1.church) an. Jeder angemeldete Benutzer hat ein Dashboard, aber was es anzeigt, hängt von Ihrer [Rolle und Ihren Berechtigungen](./settings/roles-permissions.md) ab.
- Die Bereiche zum Gottesdienst füllen sich, sobald Sie [Pläne](./serving/plans.md) und [Anwesenheit](./attendance/index.md) oder [Check-In](./attendance/check-in.md) nutzen.

</div>

## Das Dashboard öffnen {#opening-the-dashboard}

- Anmelden – B1 Admin startet auf dem Dashboard.
- Klicken Sie auf das kleine Kirchenlogo oben links auf einer beliebigen Seite.
- Öffnen Sie das [Sprungmenü](./introduction.md#getting-around-with-the-jump-menu) (klicken Sie auf die Suchleiste oder drücken Sie **Strg+K** / **Cmd+K**) und wählen Sie **Dashboard**.

## Der Gottesdienst dieser Woche {#this-weeks-service}

Die große Karte oben zeigt einen Gottesdienstplan: den nächsten anstehenden Plan zwischen dem letzten Sonntag und dem kommenden Sonntag oder, falls nichts ansteht, den Plan des letzten Sonntags. Fallen mehrere Pläne auf denselben Tag, kommt ein Plan mit einer Gottesdienstreihenfolge zuerst, danach der mit der frühesten Gottesdienstzeit.

- **Datumszeile** – der Tag, das Datum und die erste Gottesdienstzeit des Plans (zum Beispiel *Sonntag · 15. November · 9:00 Uhr*).
- **Titel** – der Name des Plans. Wenn Sie den Plan öffnen können (Sie dürfen Pläne bearbeiten, gehören zum Dienstbereich des Plans oder dienen darin), verlinkt der Titel auf den [Plan](./serving/plans.md).
- **Gottesdienstreihenfolge** – jeder Punkt aus der [Gottesdienstreihenfolge](./serving/service-order.md) des Plans mit der Uhrzeit, zu der er beginnt. Sie wird aus der ersten Gottesdienstzeit und der Länge jedes Punktes berechnet. Während der Gottesdienst läuft, ist der aktuelle Punkt hervorgehoben.

Gibt es diese Woche keinen Plan, lautet die Karte **Für diese Woche ist kein Gottesdienst geplant.**; hat der Plan keine Gottesdienstreihenfolge, lautet sie **Für diesen Plan gibt es keine Gottesdienstreihenfolge.** Personen, die Pläne bearbeiten dürfen, sehen neben beiden Meldungen einen Link **Pläne**.

### Wer dient und wer ist im Raum {#who-is-serving-and-who-is-in-the-room}

Neben der Gottesdienstreihenfolge zeigt das Dashboard, was rund um den Gottesdienst geschieht, sobald dafür Daten vorliegen:

| Bereich | Was er zeigt |
|---|---|
| **Im Raum** | Wie viele Personen eingecheckt sind oder als anwesend markiert wurden. Am Sonntag ist es die heutige Anzahl, mit einer Markierung **Live**; unter der Woche zeigt es die Anzahl vom **letzten Sonntag**. Wenn niemand namentlich erfasst wurde, werden die [Personenzahlen](./attendance/headcount-entry.md) dieses Tages verwendet. |
| **Dienst am Sonntag** / **Dienst in dieser Stunde** | Alle, die für den Plan eingeteilt sind, mit ihrer Position, verknüpft mit ihrem Personendatensatz. Abgelehnte Einteilungen werden weggelassen. |
| **Erstbesuch** / **Erstbesuch letzten Sonntag** | Erstbesucher (Personen mit dem Mitgliedsstatus *Besucher* oder *Gast* oder Personen, die als Gast eingecheckt wurden), nach Haushalt gruppiert. |
| **Räume** | Check-ins pro Klasse oder Raum für diese Woche, mit einem Auslastungsbalken, wenn für die Gruppe eine **Kapazität** festgelegt ist. |

Bevor etwas davon vorhanden ist, zeigt die Karte einen kurzen Hinweis mit Links zu **Personen**, **Anwesenheit** und **Pläne** (nur zu denen, die Sie öffnen dürfen).

:::info
Die Zahlen und Namen stammen aus Ihren Anwesenheits- und Dienstdaten und erscheinen daher nur für Personen, die diese einsehen dürfen. Namen von Gästen und die Dienstliste benötigen zum Beispiel die Berechtigung, Personen anzuzeigen, und die Raumzahlen die Berechtigung, Anwesenheit anzuzeigen.
:::

## Benötigt Aufmerksamkeit {#needs-attention}

Wenn etwas auf Sie wartet, listet eine Karte **Benötigt Aufmerksamkeit** es mit einem Link auf:

- **ausstehende Kalendergenehmigungen** – Ereignisse sowie Raum- oder Ressourcenbuchungen, die eine Genehmigung brauchen. Öffnet [Genehmigungen](./calendars/approvals.md). Wird Personen angezeigt, die Inhalte bearbeiten dürfen.
- **ausstehende Gruppenbeitrittsanfragen** – Personen, die einer Gruppe beitreten möchten. Öffnet die Liste der [ausstehenden Anfragen](./groups/group-join-requests.md). Wird Personen angezeigt, die Gruppenmitglieder bearbeiten dürfen.

Die Karte ist ausgeblendet, wenn nichts zu tun ist.

## Meine Aufgaben und Meine Gruppen {#my-tasks-and-my-groups}

Am unteren Ende der Seite:

- **Meine Aufgaben** listet bis zu vier offene [Aufgaben](./serving/tasks.md), die Ihnen zugewiesen sind; klicken Sie auf eine, um sie zu öffnen. Klicken Sie auf **Aufgabe hinzufügen**, um hier direkt eine Aufgabe anzulegen (wählen Sie, auf wen sie sich bezieht und wem sie zugewiesen ist, und geben Sie dann Titel, Fälligkeitsdatum und Notizen ein), oder auf **Alle Aufgaben**, um **Dienste > Meine Arbeit** zu öffnen.
- **Meine Gruppen** listet die Gruppen auf, denen Sie angehören; klicken Sie auf eine, um sie zu öffnen. Wenn Sie Gruppen verwalten oder Personen anzeigen dürfen, öffnet **Alle Gruppen** die vollständige Liste der [Gruppen](./groups/index.md).

## Schnellaktionen {#quick-actions}

Die Einrichtungsverknüpfungen, die früher auf dem Dashboard standen (etwa **Kirchenlogo hinzufügen**, **Online-Spenden einrichten** und **Erste Gruppe erstellen**), befinden sich nun im Sprungmenü unter **Schnellaktionen**. Siehe [Schnellaktionen](./introduction.md#quick-actions).

## Verwandte Artikel {#related-articles}

- [Einführung](./introduction.md) – Anmelden und sich mit dem Sprungmenü zurechtfinden
- [Benachrichtigungen & Nachrichten](./notifications.md) – die Hinweise und privaten Nachrichten in Ihrem Benutzermenü
- [Pläne](./serving/plans.md) und [Gottesdienstreihenfolge](./serving/service-order.md) – was die Gottesdienstkarte speist
- [Check-In](./attendance/check-in.md) – wie Personen im Raum gezählt werden
