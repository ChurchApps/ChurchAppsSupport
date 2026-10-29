---
title: "Gruppenbeitrittsanfragen"
---

# Gruppenbeitrittsanfragen

<div class="article-intro">

Ist eine Gruppe mit einer genehmigungspflichtigen Beitrittsregel konfiguriert, können Personen Beitrittsanfragen stellen. Gruppenleitungen und Administratoren prüfen diese Anfragen und genehmigen oder lehnen sie ab. So behält Ihre Kirche die Kontrolle über die Mitgliedschaft, und Menschen können ihr Interesse leicht bekunden.

</div>

## Schulungsvideo

<YouTube id="1vj-suCiIsE" title="Gruppenbeitrittsanfragen und Gruppenkalender in B1" next="Gottesdienste und Anwesenheit in B1 einrichten" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Berechtigung, Gruppen zu verwalten, oder Sie müssen Leitung der betreffenden Gruppe sein. Details finden Sie unter [Rollen & Berechtigungen](../people/roles-permissions.md).
- Die Beitrittsregel der Gruppe muss auf **Anfrage** (Genehmigung erforderlich) eingestellt sein. Wie Sie die Beitrittsregeln konfigurieren, lesen Sie unter [Gruppen anlegen](./creating-groups.md).

</div>

## Beitrittsregeln verstehen

Gruppen können drei verschiedene Beitrittsregeln haben:

- **Offen** -- Jeder kann sofort ohne Genehmigung beitreten
- **Anfrage** -- Personen stellen eine Beitrittsanfrage, die genehmigt werden muss
- **Geschlossen** -- Niemand kann eine Beitrittsanfrage stellen (Mitglieder müssen manuell hinzugefügt werden)

Verwendet eine Gruppe die Regel **Anfrage**, laufen alle Beitrittsversuche über den auf dieser Seite beschriebenen Genehmigungsprozess.

## Offene Anfragen einsehen

### Für Gruppenleitungen

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) und wählen Sie **Personen > Gruppen**.
2. Klicken Sie auf den Gruppennamen.
3. Der Bereich **Mitglieder** zeigt an, wie viele Anfragen offen sind. Klicken Sie auf **Alle Mitglieder** -- offene Anfragen für diese Gruppe erscheinen oben in der Mitgliederliste.

### Für Administratoren

Administratoren mit Berechtigungen zur Gruppenverwaltung können offene Anfragen über alle Gruppen hinweg einsehen:

1. Wählen Sie im Sprungmenü **Personen > Gruppen**.
2. Klicken Sie im Seitenkopf auf die Schaltfläche **Offene Anfragen** (zum Beispiel "3 offene Anfragen"). Sie erscheint nur, wenn Anfragen auf Bearbeitung warten.
3. Prüfen Sie alle offenen Anfragen in der gesamten Kirche.

## Eine Beitrittsanfrage prüfen

Jede Beitrittsanfrage zeigt:

- **Name und Foto der Person** -- die Person, die beitreten möchte
- **Optionale Nachricht** -- eine persönliche Nachricht, warum die Person beitreten möchte (falls angegeben)
- **Anfragedatum** -- wann die Anfrage gestellt wurde

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
Wenn Sie eine Anfrage genehmigen, wird die Person ein regulärer Gruppenangehöriger. Sie können sie später auf der Seite [Gruppenmitglieder](./group-members.md) bei Bedarf zur Gruppenleitung befördern.
:::

## Eine Anfrage ablehnen

1. Klicken Sie bei der Beitrittsanfrage auf **Ablehnen**.
2. Geben Sie optional einen Grund für die Ablehnung an (bis zu 500 Zeichen).
3. Klicken Sie auf **Bestätigen**.
4. Die anfragende Person erhält eine Benachrichtigung mit Ihrem Ablehnungsgrund (falls angegeben).
5. Die Anfrage wird als abgelehnt markiert.

:::info
Ein Ablehnungsgrund hilft der Person zu verstehen, warum ihre Anfrage nicht genehmigt wurde, und ermutigt sie vielleicht, es später erneut zu versuchen oder andere Gruppen zu entdecken.
:::

## Anfragen über die Seite Aufgaben genehmigen

Jede Beitrittsanfrage erstellt außerdem eine Aufgabe unter **Dienst &rarr; Meine Arbeit** mit dem Titel "*Person* möchte *Gruppe* beitreten". Sie wird den Leitungen der Gruppe zugewiesen. Hat die Gruppe noch keine Leitung, geht sie an Mitarbeiter mit der Berechtigung **Gruppenmitglieder &gt; Bearbeiten** oder, falls niemand diese Berechtigung hat, an die Domänenadministratoren Ihrer Kirche. Mitarbeiter und Administratoren, die die Aufgabe so erhalten, bekommen außerdem eine Benachrichtigung, die direkt zur Aufgabe führt.

Öffnen Sie die Aufgabe, sehen Sie den Namen der anfragenden Person, die Gruppe und ihre optionale Nachricht, mit den Schaltflächen **Genehmigen** und **Ablehnen** direkt auf der Aufgabenkarte. (Ablehnen öffnet dasselbe optionale Begründungsfeld, das oben beschrieben ist.) So können Leitungen Anfragen auch über eine benachrichtigungsgesteuerte Aufgabe bearbeiten, ohne die Mitgliederliste der Gruppe zu öffnen.

Entscheiden Sie über eine Anfrage an einer der beiden Stellen -- in der Mitgliederliste der Gruppe oder auf der Aufgabenkarte -- wird sie überall geschlossen, damit Leitungen nie eine veraltete Aufgabe zu einer bereits bearbeiteten Anfrage sehen.

## Benachrichtigungen

Das Anfragesystem verschickt automatisch Benachrichtigungen:

- **Wenn eine Anfrage gestellt wird** -- Alle Gruppenleitungen erhalten eine Benachrichtigung. Hat die Gruppe keine Leitung, werden stattdessen die Mitarbeiter oder Administratoren benachrichtigt, denen die Aufgabe zugewiesen ist (siehe oben).
- **Wenn eine Anfrage genehmigt wird** -- Die anfragende Person erhält eine Bestätigung.
- **Wenn eine Anfrage abgelehnt wird** -- Die anfragende Person erhält eine Benachrichtigung mit dem etwaigen Ablehnungsgrund.

Benachrichtigungen erscheinen im Benachrichtigungszentrum des Benutzers auf B1.church und in der mobilen App. Klicken Sie in der Benachrichtigungsglocke von B1 Admin auf eine Benachrichtigung zu einer Beitrittsanfrage (oder auf **Details anzeigen**), öffnet sich die Gruppe auf der B1.church-Website Ihrer Kirche in einem neuen Tab.

## Anfragen von Mitgliedern verwalten

Personen können ihre Beitrittsanfragen auf B1.church selbst verwalten:

- Sie sehen den Status ihrer offenen Anfragen auf der Detailseite der Gruppe.
- Sie können eine offene Anfrage zurückziehen, wenn sie es sich anders überlegen.
- Sie sehen, ob ihre Anfrage genehmigt oder abgelehnt wurde.

## Bewährte Vorgehensweisen

- **Zeitnah reagieren** -- Versuchen Sie, Anfragen innerhalb von 24 bis 48 Stunden zu prüfen, damit Menschen nicht lange warten müssen.
- **Ablehnungsgründe klar formulieren** -- Helfen Sie den Personen zu verstehen, welche Schritte sie als Nächstes gehen können oder welche Alternativen es gibt.
- **Profile prüfen** -- Sehen Sie sich das Profil der Person an, um einzuschätzen, ob sie gut zur Gruppe passt.
- **Erwartungen kommunizieren** -- Stellen Sie sicher, dass Ihre Gruppenbeschreibung klar festlegt, für wen die Gruppe gedacht ist.

## Verwandte Artikel

- [Gruppen anlegen](./creating-groups.md) -- Erfahren Sie, wie Sie Gruppen einrichten und Beitrittsregeln konfigurieren
- [Gruppenmitglieder](./group-members.md) -- Bestehende Gruppenmitglieder verwalten
- [Gruppenkalender](./group-calendar.md) -- Gruppentreffen und Veranstaltungen planen
