---
title: "Beitrittsanfragen für Gruppen"
---

# Beitrittsanfragen für Gruppen

<div class="article-intro">

Ist eine Gruppe mit einer genehmigungspflichtigen Beitrittsregel konfiguriert, können Personen Beitrittsanfragen stellen. Gruppenleiter und Administratoren prüfen diese Anfragen und genehmigen oder lehnen sie ab. So behält Ihre Kirche die Kontrolle über die Gruppenmitgliedschaft, während es Personen leicht gemacht wird, ihr Interesse an einer Teilnahme zu zeigen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Berechtigung, Gruppen zu verwalten, oder Sie müssen Leiter der jeweiligen Gruppe sein. Details finden Sie unter [Rollen & Berechtigungen](../people/roles-permissions.md).
- Die Gruppe muss ihre Beitrittsregel auf **Anfrage** (Genehmigung erforderlich) gesetzt haben. Wie Sie Beitrittsregeln konfigurieren, erfahren Sie unter [Gruppen erstellen](./creating-groups.md).

</div>

## Beitrittsregeln verstehen

Gruppen können drei verschiedene Beitrittsregeln haben:

- **Offen** -- Jeder kann sofort ohne Genehmigung beitreten
- **Anfrage** -- Personen stellen eine Beitrittsanfrage, die genehmigt werden muss
- **Geschlossen** -- Niemand kann eine Teilnahme anfragen (Mitglieder müssen manuell hinzugefügt werden)

Verwendet eine Gruppe die Regel **Anfrage**, laufen alle Beitrittsversuche über den auf dieser Seite beschriebenen Genehmigungsablauf.

## Ausstehende Anfragen anzeigen

### Für Gruppenleiter

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) und wählen Sie **Personen > Gruppen**
2. Klicken Sie auf den Namen der Gruppe
3. Der Abschnitt **Mitglieder** zeigt, wie viele Anfragen ausstehen. Klicken Sie auf **Alle Mitglieder** -- ausstehende Anfragen für diese Gruppe erscheinen oben in der Mitgliederliste

### Für Administratoren

Administratoren mit Berechtigung zur Gruppenverwaltung können ausstehende Anfragen über alle Gruppen hinweg einsehen:

1. Wählen Sie im Sprungmenü **Personen > Gruppen**
2. Klicken Sie im Seitenkopf auf die Schaltfläche **ausstehende Anfragen** (zum Beispiel „3 ausstehende Anfragen“). Sie erscheint nur, wenn Anfragen warten.
3. Prüfen Sie alle ausstehenden Anfragen kirchenweit

## Eine Beitrittsanfrage prüfen

Jede Beitrittsanfrage zeigt:

- **Name und Foto der Person** -- Die Person, die beitreten möchte
- **Optionale Nachricht** -- Eine persönliche Nachricht, warum die Person beitreten möchte (falls angegeben)
- **Datum der Anfrage** -- Wann die Anfrage gestellt wurde

So prüfen Sie eine Anfrage:

1. Lesen Sie die Nachricht der Person, falls sie eine angegeben hat
2. Klicken Sie bei Bedarf auf den Namen der Person, um ihr Profil anzuzeigen
3. Entscheiden Sie, ob Sie genehmigen oder ablehnen

## Eine Anfrage genehmigen

1. Klicken Sie bei der Beitrittsanfrage auf **Genehmigen**
2. Die Person wird sofort als Mitglied zur Gruppe hinzugefügt
3. Die anfragende Person erhält eine Benachrichtigung, dass ihre Anfrage genehmigt wurde
4. Die Anfrage wird im System als genehmigt markiert

:::tip
Wenn Sie eine Anfrage genehmigen, wird die Person ein regulär Mitglied der Gruppe. Sie können sie bei Bedarf später über die Seite [Gruppenmitglieder](./group-members.md) zum Gruppenleiter befördern.
:::

## Eine Anfrage ablehnen

1. Klicken Sie bei der Beitrittsanfrage auf **Ablehnen**
2. Geben Sie optional einen Grund für die Ablehnung an (bis zu 500 Zeichen)
3. Klicken Sie auf **Bestätigen**
4. Die anfragende Person erhält eine Benachrichtigung mit Ihrem Ablehnungsgrund (falls angegeben)
5. Die Anfrage wird als abgelehnt markiert

:::info
Ein Ablehnungsgrund hilft der Person zu verstehen, warum ihre Anfrage nicht genehmigt wurde, und kann sie ermutigen, es später erneut zu versuchen oder andere Gruppen zu entdecken.
:::

## Über die Aufgabenseite genehmigen {#approving-from-the-tasks-page}

Jede Beitrittsanfrage erzeugt außerdem eine Aufgabe unter **Dienst &rarr; Meine Arbeit** mit dem Titel „*Person* möchte *Gruppe* beitreten.“ Sie wird den Leitern der Gruppe zugewiesen. Hat die Gruppe noch keinen Leiter, geht sie an Mitarbeiter mit der Berechtigung **Gruppenmitglieder > Bearbeiten** oder, falls niemand diese Berechtigung hat, an die Domain-Administratoren Ihrer Kirche. Mitarbeiter und Administratoren, die die Aufgabe so erhalten, bekommen zusätzlich eine Benachrichtigung, die direkt dorthin führt.

Wenn Sie die Aufgabe öffnen, sehen Sie den Namen der anfragenden Person, die Gruppe und ihre optionale Nachricht, mit den Schaltflächen **Genehmigen** und **Ablehnen** direkt auf der Aufgabenkarte (Ablehnen öffnet dasselbe optionale Begründungsfeld wie oben). So können Leiter eine Anfrage auch über eine benachrichtigungsgesteuerte Route bearbeiten, ohne die Mitgliederliste der Gruppe öffnen zu müssen.

Wenn eine Anfrage entweder über die Mitgliederliste der Gruppe oder die Aufgabenkarte entschieden wird, wird sie überall geschlossen. Leiter sehen so nie eine veraltete Aufgabe zu einer Anfrage, die bereits bearbeitet wurde.

## Benachrichtigungen

Das System für Beitrittsanfragen sendet automatisch Benachrichtigungen:

- **Wenn eine Anfrage gestellt wird** -- Alle Gruppenleiter erhalten eine Benachrichtigung. Hat die Gruppe keinen Leiter, werden stattdessen die Mitarbeiter oder Administratoren benachrichtigt, denen die Aufgabe zugewiesen ist (siehe oben).
- **Wenn eine Anfrage genehmigt wird** -- Die anfragende Person erhält eine Bestätigung
- **Wenn eine Anfrage abgelehnt wird** -- Die anfragende Person erhält eine Benachrichtigung mit dem gegebenenfalls angegebenen Ablehnungsgrund

Benachrichtigungen erscheinen im Benachrichtigungszentrum des Benutzers auf B1.church und in der mobilen App. Wenn Sie in B1 Admin in der Benachrichtigungsglocke auf eine Benachrichtigung zu einer Beitrittsanfrage (oder auf **Details anzeigen**) klicken, öffnet sich die Gruppe auf der B1.church-Website Ihrer Kirche in einem neuen Tab.

## Anfragen aus Sicht der Mitglieder verwalten

Personen können ihre eigenen Beitrittsanfragen auf B1.church verwalten:

- Den Status ihrer ausstehenden Anfragen auf der Detailseite der Gruppe einsehen
- Eine ausstehende Anfrage zurückziehen, wenn sie es sich anders überlegen
- Sehen, ob ihre Anfrage genehmigt oder abgelehnt wurde

## Bewährte Vorgehensweisen

- **Zügig reagieren** -- Versuchen Sie, Anfragen innerhalb von 24 bis 48 Stunden zu prüfen, damit Personen nicht unnötig warten
- **Klar begründen** -- Helfen Sie Personen, die nächsten Schritte oder Alternativen zu verstehen
- **Profile prüfen** -- Sehen Sie sich das Profil der Person an, um festzustellen, ob sie zur Gruppe passt
- **Erwartungen kommunizieren** -- Stellen Sie sicher, dass Ihre Gruppenbeschreibung klar angibt, für wen die Gruppe gedacht ist

## Verwandte Artikel

- [Gruppen erstellen](./creating-groups.md) -- Erfahren Sie, wie Sie Gruppen einrichten und Beitrittsregeln konfigurieren
- [Gruppenmitglieder](./group-members.md) -- Bestehende Gruppenmitglieder verwalten
- [Gruppenkalender](./group-calendar.md) -- Gruppentreffen und Veranstaltungen planen
