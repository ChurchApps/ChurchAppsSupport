---
title: "Beitrittsanfragen zu Gruppen"
description: "Prüfen, genehmigen oder ablehnen Sie Beitrittsanfragen zu Gruppen in B1 Admin, finden Sie als Leitung oder Administrator ausstehende Anfragen und geben Sie beim Ablehnen einen Grund an."
---

# Beitrittsanfragen zu Gruppen

<div class="article-intro">

Ist eine Gruppe mit einer genehmigungspflichtigen Beitrittsregel eingerichtet, können Personen eine Anfrage zum Beitritt stellen. Gruppenleitende und Administratoren prüfen diese Anfragen und genehmigen oder lehnen sie ab. So behält Ihre Kirche die Kontrolle über die Mitgliedschaft, und Interessierte können ihr Interesse am Beitritt leicht zeigen.

</div>

## Schulungsvideo {#training-video}

<YouTube id="1vj-suCiIsE" title="Beitrittsanfragen und Gruppenkalender in B1" next="Gottesdienste und Anwesenheit in B1 einrichten" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Berechtigung, Gruppen zu verwalten, oder Sie müssen Leitung der jeweiligen Gruppe sein. Details finden Sie unter [Rollen & Berechtigungen](../people/roles-permissions.md).
- Die Gruppe muss als Beitrittsregel **Anfrage** (Genehmigung erforderlich) eingestellt haben. Wie Sie Beitrittsregeln konfigurieren, erfahren Sie unter [Gruppen erstellen](./creating-groups.md).

</div>

## Beitrittsregeln verstehen {#understanding-join-policies}

Gruppen können drei verschiedene Beitrittsregeln haben:

- **Offen** – Jede Person kann sofort ohne Genehmigung beitreten
- **Anfrage** – Personen stellen eine Beitrittsanfrage, die genehmigt werden muss
- **Geschlossen** – Niemand kann eine Beitrittsanfrage stellen (Mitglieder müssen manuell hinzugefügt werden)

Verwendet eine Gruppe die Regel **Anfrage**, laufen alle Beitrittsversuche über den auf dieser Seite beschriebenen Genehmigungsablauf.

## Ausstehende Anfragen ansehen {#viewing-pending-requests}

### Für Gruppenleitende {#for-group-leaders}

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) und wählen Sie **Personen > Gruppen**.
2. Klicken Sie auf den Namen der Gruppe.
3. Der Bereich **Mitglieder** zeigt, wie viele Anfragen ausstehen (zum Beispiel „1 ausstehend“). Klicken Sie auf **Alle Mitglieder** – ausstehende Anfragen für diese Gruppe erscheinen oben in der Mitgliederliste unter **Ausstehende Anfragen**.

### Für Administratoren {#for-administrators}

Administratoren mit Berechtigungen zur Gruppenverwaltung können ausstehende Anfragen über alle Gruppen hinweg ansehen:

1. Wählen Sie im Sprungmenü **Personen > Gruppen**.
2. Klicken Sie im Seitenkopf auf die Schaltfläche **ausstehende Anfragen** (zum Beispiel „3 ausstehende Anfragen“). Sie erscheint nur, wenn Anfragen warten.
3. Die Seite **Ausstehende Beitrittsanfragen** listet jede offene Anfrage der ganzen Kirche auf, mit der Gruppe, der die Person beitreten möchte, neben ihrem Namen. Klicken Sie oben auf der Seite auf **Gruppen**, um zurückzukehren. Wenn nichts wartet, zeigt die Seite **Keine ausstehenden Anfragen.**

## Eine Beitrittsanfrage prüfen {#reviewing-a-join-request}

Jede Beitrittsanfrage zeigt:

- **Name und Foto der Person** – die Person, die beitreten möchte (und auf der kirchenweiten Seite die Gruppe)
- **Optionale Nachricht** – eine persönliche Nachricht, warum die Person beitreten möchte (falls angegeben)
- **Anfragedatum** – wann die Anfrage gestellt wurde

So prüfen Sie eine Anfrage:

1. Lesen Sie die Nachricht der Person, falls sie eine hinterlassen hat
2. Klicken Sie bei Bedarf auf den Namen der Person, um ihr Profil zu öffnen
3. Entscheiden Sie, ob Sie genehmigen oder ablehnen

## Eine Anfrage genehmigen {#approving-a-request}

1. Klicken Sie bei der Beitrittsanfrage auf **Genehmigen**.
2. Die Person wird sofort als Mitglied zur Gruppe hinzugefügt, und die Anfrage verschwindet aus der Liste.
3. Die anfragende Person erhält eine Benachrichtigung, dass ihre Anfrage genehmigt wurde.
4. Die Anfrage wird im System als genehmigt markiert.

:::tip
Mit der Genehmigung wird die Person ein reguläres Gruppenmitglied. Bei Bedarf können Sie sie später auf der Seite [Gruppenmitglieder](./group-members.md) zur Gruppenleitung befördern.
:::

## Eine Anfrage ablehnen {#declining-a-request}

1. Klicken Sie bei der Beitrittsanfrage auf **Ablehnen**.
2. Geben Sie im Dialog **Anfrage ablehnen** optional einen **Grund (optional)** ein (bis zu 500 Zeichen).
3. Klicken Sie auf **Ablehnen**.
4. Die anfragende Person erhält eine Benachrichtigung mit Ihrem Ablehnungsgrund (falls angegeben).
5. Die Anfrage wird als abgelehnt markiert.

:::info
Ein Ablehnungsgrund hilft der Person zu verstehen, warum ihre Anfrage nicht genehmigt wurde. Das kann sie ermutigen, es später erneut zu versuchen oder andere Gruppen zu entdecken.
:::

## Genehmigen über die Aufgabenseite {#approving-from-the-tasks-page}

Jede Beitrittsanfrage erstellt außerdem eine Aufgabe unter **Dienste &rarr; Meine Arbeit** mit dem Titel „*Person* möchte *Gruppe* beitreten.“. Sie wird den Leitenden der Gruppe zugewiesen. Hat die Gruppe noch keine Leitung, geht sie an hauptamtliche Mitarbeitende mit der Berechtigung **Gruppenmitglieder &gt; Bearbeiten**, oder an die Domain-Administratoren Ihrer Kirche, falls niemand diese Berechtigung hat. Mitarbeitende und Administratoren, die die Aufgabe so erhalten, bekommen außerdem eine Benachrichtigung, die direkt dorthin führt.

Beim Öffnen der Aufgabe sehen Sie den Namen der anfragenden Person, die Gruppe und ihre optionale Nachricht, mit den Schaltflächen **Genehmigen** und **Ablehnen** direkt auf der Aufgabenkarte (beim Ablehnen öffnet sich dasselbe optionale Grundfeld wie oben beschrieben). So können Leitende eine Anfrage auch über eine Benachrichtigung bearbeiten, ohne die Mitgliederliste der Gruppe öffnen zu müssen.

Wird eine Anfrage an einer dieser beiden Stellen – in der Mitgliederliste der Gruppe oder auf der Aufgabenkarte – entschieden, wird sie überall geschlossen. Leitende sehen daher nie eine veraltete Aufgabe für eine Anfrage, die bereits bearbeitet wurde.

## Benachrichtigungen {#notifications}

Das System für Beitrittsanfragen versendet automatisch Benachrichtigungen:

- **Wenn eine Anfrage gestellt wird** – Alle Leitenden der Gruppe erhalten eine Benachrichtigung. Hat die Gruppe keine Leitung, werden stattdessen die Mitarbeitenden oder Administratoren benachrichtigt, denen die Aufgabe zugewiesen ist (siehe oben).
- **Wenn eine Anfrage genehmigt wird** – Die anfragende Person erhält eine Bestätigung
- **Wenn eine Anfrage abgelehnt wird** – Die anfragende Person erhält eine Benachrichtigung mit dem Ablehnungsgrund, falls vorhanden

Benachrichtigungen erscheinen im Benachrichtigungszentrum des Benutzers auf B1.church und in der mobilen App. In der Glocke von B1 Admin öffnet ein Klick auf eine Benachrichtigung zu einer Beitrittsanfrage (oder auf **Details anzeigen**) die Gruppe auf der B1.church-Seite Ihrer Kirche in einem neuen Tab.

## Anfragen von der Mitgliederseite aus verwalten {#managing-requests-from-the-member-side}

Personen können ihre eigenen Beitrittsanfragen auf B1.church verwalten:

- Den Status ihrer ausstehenden Anfragen auf der Detailseite der Gruppe sehen
- Eine ausstehende Anfrage zurückziehen, falls sie es sich anders überlegen
- Sehen, ob ihre Anfrage genehmigt oder abgelehnt wurde

## Bewährte Vorgehensweisen {#best-practices}

- **Zeitnah antworten** – Prüfen Sie Anfragen möglichst innerhalb von 24 bis 48 Stunden, damit Personen nicht lange warten müssen
- **Ablehnungsgründe klar formulieren** – Helfen Sie den Personen, die nächsten Schritte oder Alternativen zu verstehen
- **Profile prüfen** – Sehen Sie sich das Profil der Person an, um zu beurteilen, ob sie zur Gruppe passt
- **Erwartungen kommunizieren** – Stellen Sie sicher, dass Ihre Gruppenbeschreibung klar sagt, für wen die Gruppe gedacht ist

## Verwandte Artikel {#related-articles}

- [Gruppen erstellen](./creating-groups.md) – Gruppen einrichten und Beitrittsregeln konfigurieren
- [Gruppenmitglieder](./group-members.md) – Bestehende Gruppenmitglieder verwalten
- [Gruppenkalender](./group-calendar.md) – Gruppentreffen und Termine planen
