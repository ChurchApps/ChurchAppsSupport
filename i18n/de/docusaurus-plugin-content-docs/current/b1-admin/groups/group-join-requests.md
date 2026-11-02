---
title: "Beitrittsanfragen für Gruppen"
---

# Beitrittsanfragen für Gruppen

<div class="article-intro">

Ist eine Gruppe mit einer genehmigungspflichtigen Beitrittsregel konfiguriert, können Personen eine Anfrage zum Beitritt stellen. Gruppenleitende und Administratoren prüfen diese Anfragen und genehmigen oder lehnen sie ab. So behält Ihre Kirche die Kontrolle über die Mitgliedschaft in Gruppen, und Interessierte können ihr Interesse am Beitritt ganz einfach bekunden.

</div>

## Schulungsvideo

<YouTube id="1vj-suCiIsE" title="Beitrittsanfragen für Gruppen und Gruppenkalender in B1" next="Gottesdienste und Anwesenheit in B1 einrichten" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Berechtigung, Gruppen zu verwalten, oder Sie müssen Leitung der betreffenden Gruppe sein. Details finden Sie unter [Rollen & Berechtigungen](../people/roles-permissions.md).
- Die Beitrittsregel der Gruppe muss auf **Anfrage** (Genehmigung erforderlich) gesetzt sein. Wie Sie Beitrittsregeln konfigurieren, erfahren Sie unter [Gruppen erstellen](./creating-groups.md).

</div>

## Beitrittsregeln verstehen

Gruppen können drei verschiedene Beitrittsregeln haben:

- **Offen** – Jeder kann sofort ohne Genehmigung beitreten
- **Anfrage** – Personen stellen eine Beitrittsanfrage, die genehmigt werden muss
- **Geschlossen** – Niemand kann einen Beitritt anfragen (Mitglieder müssen manuell hinzugefügt werden)

Verwendet eine Gruppe die Regel **Anfrage**, laufen alle Beitrittsversuche über den auf dieser Seite beschriebenen Genehmigungsablauf.

## Offene Anfragen anzeigen

### Für Gruppenleitende

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) und wählen Sie **Personen > Gruppen**.
2. Klicken Sie auf den Gruppennamen.
3. Der Abschnitt **Mitglieder** zeigt, wie viele Anfragen offen sind. Klicken Sie auf **Alle Mitglieder** – offene Anfragen für diese Gruppe erscheinen oben in der Mitgliederliste.

### Für Administratoren

Administratoren mit Berechtigungen zur Gruppenverwaltung können offene Anfragen aller Gruppen einsehen:

1. Wählen Sie im Sprungmenü **Personen > Gruppen**.
2. Klicken Sie im Seitenkopf auf die Schaltfläche **offene Anfragen** (zum Beispiel „3 offene Anfragen“). Sie erscheint nur, wenn Anfragen auf eine Entscheidung warten.
3. Prüfen Sie alle offenen Anfragen in der gesamten Kirche.

## Eine Beitrittsanfrage prüfen

Jede Beitrittsanfrage zeigt:

- **Name und Foto der Person** – die Person, die beitreten möchte
- **Optionale Nachricht** – eine persönliche Nachricht, warum die Person beitreten möchte (falls angegeben)
- **Datum der Anfrage** – wann die Anfrage gestellt wurde

So prüfen Sie eine Anfrage:

1. Lesen Sie die Nachricht der Person, falls sie eine hinterlassen hat.
2. Klicken Sie bei Bedarf auf den Namen der Person, um ihr Profil anzusehen.
3. Entscheiden Sie, ob Sie genehmigen oder ablehnen.

## Eine Anfrage genehmigen

1. Klicken Sie bei der Beitrittsanfrage auf **Genehmigen**.
2. Die Person wird sofort als Mitglied zur Gruppe hinzugefügt.
3. Die anfragende Person erhält eine Benachrichtigung, dass ihre Anfrage genehmigt wurde.
4. Die Anfrage wird im System als genehmigt markiert.

:::tip
Wenn Sie eine Anfrage genehmigen, wird die Person ein regulär es Gruppenmitglied. Sie können sie später auf der Seite [Gruppenmitglieder](./group-members.md) bei Bedarf zur Gruppenleitung befördern.
:::

## Eine Anfrage ablehnen

1. Klicken Sie bei der Beitrittsanfrage auf **Ablehnen**.
2. Geben Sie optional einen Grund für die Ablehnung an (bis zu 500 Zeichen).
3. Klicken Sie auf **Bestätigen**.
4. Die anfragende Person erhält eine Benachrichtigung mit Ihrem Ablehnungsgrund (falls angegeben).
5. Die Anfrage wird als abgelehnt markiert.

:::info
Ein Ablehnungsgrund hilft der Person zu verstehen, warum ihre Anfrage nicht genehmigt wurde, und ermutigt sie vielleicht, es später erneut zu versuchen oder andere Gruppen zu erkunden.
:::

## Genehmigen über die Aufgabenseite {#approving-from-the-tasks-page}

Jede Beitrittsanfrage erstellt außerdem eine Aufgabe unter **Dienst &rarr; Meine Arbeit** mit dem Titel „*Person* hat um Beitritt zu *Gruppe* gebeten.“ Sie wird den Leitenden der Gruppe zugewiesen. Hat die Gruppe noch keine Leitung, geht sie an Mitarbeitende mit der Berechtigung **Gruppenmitglieder &gt; Bearbeiten**, und wenn niemand diese Berechtigung hat, an die Domänenadministratoren Ihrer Kirche. Mitarbeitende und Administratoren, die die Aufgabe so erhalten, bekommen außerdem eine Benachrichtigung, die direkt dorthin führt.

Öffnen Sie die Aufgabe, sehen Sie den Namen der anfragenden Person, die Gruppe und deren optionale Nachricht, mit den Schaltflächen **Genehmigen** und **Ablehnen** direkt auf der Aufgabenkarte (Ablehnen öffnet dasselbe optionale Feld für den Grund wie oben beschrieben). So können Leitende eine Anfrage auf einem zweiten, benachrichtigungsgesteuerten Weg bearbeiten, ohne die Mitgliederliste der Gruppe zu öffnen.

Wird eine Anfrage an einer der beiden Stellen entschieden – in der Mitgliederliste der Gruppe oder auf der Aufgabenkarte –, wird sie überall geschlossen, sodass Leitende nie eine veraltete Aufgabe für eine bereits bearbeitete Anfrage sehen.

## Benachrichtigungen

Das System für Beitrittsanfragen sendet automatisch Benachrichtigungen:

- **Wenn eine Anfrage gestellt wird** – Alle Gruppenleitenden erhalten eine Benachrichtigung. Hat die Gruppe keine Leitung, werden stattdessen die Mitarbeitenden oder Administratoren benachrichtigt, denen die Aufgabe zugewiesen ist (siehe oben).
- **Wenn eine Anfrage genehmigt wird** – Die anfragende Person erhält eine Bestätigung
- **Wenn eine Anfrage abgelehnt wird** – Die anfragende Person erhält eine Benachrichtigung mit dem eventuellen Ablehnungsgrund

Benachrichtigungen erscheinen im Benachrichtigungszentrum der Person auf B1.church und in der mobilen App. Klicken Sie in der Benachrichtigungsglocke von B1 Admin auf eine Beitrittsanfrage (oder auf **Details anzeigen**), öffnet sich die Gruppe auf der B1.church-Seite Ihrer Kirche in einem neuen Tab.

## Anfragen aus Sicht der Mitglieder verwalten

Personen können ihre eigenen Beitrittsanfragen auf B1.church verwalten:

- Den Status ihrer offenen Anfragen auf der Detailseite der Gruppe einsehen
- Eine offene Anfrage zurückziehen, wenn sie es sich anders überlegen
- Sehen, ob ihre Anfrage genehmigt oder abgelehnt wurde

## Bewährte Vorgehensweisen

- **Zügig reagieren** – Versuchen Sie, Anfragen innerhalb von 24 bis 48 Stunden zu prüfen, damit niemand lange warten muss
- **Ablehnungsgründe klar formulieren** – Helfen Sie Menschen, die nächsten Schritte oder Alternativen zu verstehen
- **Profile prüfen** – Sehen Sie sich das Profil der Person an, um zu beurteilen, ob sie gut zur Gruppe passt
- **Erwartungen kommunizieren** – Stellen Sie sicher, dass Ihre Gruppenbeschreibung klar angibt, für wen die Gruppe gedacht ist

## Verwandte Artikel

- [Gruppen erstellen](./creating-groups.md) – Wie Sie Gruppen anlegen und Beitrittsregeln festlegen
- [Gruppenmitglieder](./group-members.md) – Bestehende Gruppenmitglieder verwalten
- [Gruppenkalender](./group-calendar.md) – Gruppentreffen und Veranstaltungen planen
