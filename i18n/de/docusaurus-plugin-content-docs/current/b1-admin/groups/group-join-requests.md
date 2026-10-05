---
title: "Gruppenbeitrittanfragen"
---

# Gruppenbeitrittanfragen

<div class="article-intro">

Wenn eine Gruppe mit einer genehmigungsbasierten Beitrittrichtlinie konfiguriert ist, können Personen Anträge zum Beitreten einreichen. Gruppenleiter und Administratoren überprüfen diese Anfragen und genehmigen oder lehnen sie ab. Dies gibt Ihrer Kirche die Kontrolle über die Gruppenmitgliedschaft, während es für Personen einfach ist, ihr Interesse am Beitreten auszudrücken.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen Berechtigung zum Verwalten von Gruppen oder Sie müssen Leiter der spezifischen Gruppe sein. Siehe [Roles & Permissions](../people/roles-permissions.md) für Details.
- Die Gruppe muss ihre Beitrittrichtlinie auf **Request** (Genehmigung erforderlich) gesetzt haben. Siehe [Creating Groups](./creating-groups.md) zum Konfigurieren von Beitrittrichtlinien.

</div>

## Beitrittrichtlinien verstehen

Gruppen können drei verschiedene Beitrittrichtlinien haben:

- **Open** (Offen) -- Jeder kann sofort beitreten, ohne genehmigt zu werden
- **Request** (Anfrage) -- Personen reichen eine Beitrittanfrage ein, die genehmigt werden muss
- **Closed** (Geschlossen) -- Niemand kann zum Beitreten anfragen (Mitglieder müssen manuell hinzugefügt werden)

Wenn eine Gruppe die Richtlinie **Request** (Anfrage) verwendet, gehen alle Beitrittversuche durch den auf dieser Seite beschriebenen Genehmigungsworkflow.

## Anzeigen ausstehender Anfragen

### Für Gruppenleiter

1. Öffnen Sie in B1 Admin das [Jump-Menü](../introduction.md#getting-around-with-the-jump-menu) und wählen Sie **People > Groups** (Personen > Gruppen)
2. Klicken Sie auf den Gruppennamen
3. Ausstehende Anfragen für diese Gruppe werden oben auf der Registerkarte **Members** (Mitglieder) angezeigt

### Für Administratoren

Administratoren mit Gruppenverwaltungsberechtigungen können ausstehende Anfragen über alle Gruppen hinweg anzeigen:

1. Wählen Sie im Jump-Menü **People > Groups** (Personen > Gruppen)
2. Klicken Sie auf die Schaltfläche **pending requests** (ausstehende Anfragen) in der Seitenkopfzeile (z. B. "3 pending requests" (3 ausstehende Anfragen)). Sie wird nur angezeigt, wenn Anfragen ausstehend sind.
3. Überprüfen Sie alle ausstehenden Anfragen kirchenweit

## Überprüfen einer Beitrittanfrage

Jede Beitrittanfrage zeigt:

- **Name und Foto der Person** – Die Person, die dem Beitritt anfordert
- **Optionale Nachricht** – Eine persönliche Nachricht, die erklärt, warum sie beitreten möchte (falls vorhanden)
- **Anfragedatum** – Wann die Anfrage eingereicht wurde

So überprüfen Sie eine Anfrage:

1. Lesen Sie die Nachricht der Person, falls vorhanden
2. Klicken Sie auf den Namen der Person, um ihr Profil zu überprüfen, falls erforderlich
3. Entscheiden Sie, ob Sie genehmigen oder ablehnen

## Genehmigung einer Anfrage

1. Klicken Sie auf **Approve** (Genehmigen) in der Beitrittanfrage
2. Die Person wird sofort als Mitglied zur Gruppe hinzugefügt
3. Der Anfragensteller erhält eine Benachrichtigung, dass seine Anfrage genehmigt wurde
4. Die Anfrage wird im System als genehmigt markiert

:::tip
Wenn Sie eine Anfrage genehmigen, wird die Person ein reguläres Gruppenmitglied. Sie können sie später von der Seite [Group Members](./group-members.md) aus zum Gruppenleiter befördern, falls erforderlich.
:::

## Ablehnen einer Anfrage

1. Klicken Sie auf **Decline** (Ablehnen) in der Beitrittanfrage
2. Geben Sie optional einen Grund für die Ablehnung ein (bis zu 500 Zeichen)
3. Klicken Sie auf **Confirm** (Bestätigen)
4. Der Anfragensteller erhält eine Benachrichtigung mit Ihrem Ablehnungsgrund (falls vorhanden)
5. Die Anfrage wird als abgelehnt markiert

:::info
Die Angabe eines Ablehnungsgrundes hilft der Person zu verstehen, warum ihre Anfrage nicht genehmigt wurde, und kann sie dazu ermutigen, es später erneut zu versuchen oder andere Gruppen zu erkunden.
:::

## Genehmigung von der Seite "Aufgaben"

Jede Beitrittanfrage erstellt auch eine Aufgabe unter **Serving → My Work** (Dienen → Meine Arbeit) mit dem Titel "*Person* requested to join *Group*" (*Person* fordert zum Beitreten zu *Gruppe* an). Sie wird den Leitern der Gruppe zugewiesen. Wenn die Gruppe noch keinen Leiter hat, geht sie an jeden Mitarbeiter mit der Berechtigung **Group Members > Edit** (Gruppenmitglieder > Bearbeiten) oder an die Domain-Administratoren Ihrer Kirche, wenn niemand diese Berechtigung hat. Mitarbeiter und Administratoren, die die Aufgabe auf diese Weise erhalten, erhalten auch eine Benachrichtigung, die direkt darauf verweist.

Wenn Sie die Aufgabe öffnen, werden der Name des Anfragenstellers, die Gruppe und seine optionale Nachricht mit den Schaltflächen **Approve** (Genehmigen) und **Decline** (Ablehnen) direkt auf der Aufgabenkarte angezeigt (Ablehnen öffnet das gleiche optionale Grundfeld wie oben beschrieben). Dies gibt Leitern eine zweite, benachrichtigungsgesteuerte Möglichkeit, auf eine Anfrage zu reagieren, ohne zur Registerkarte "Beitrittanfragen" der Gruppe zu navigieren.

Wenn Sie eine Anfrage von beiden Stellen entscheiden – der Registerkarte "Beitrittanfragen" der Gruppe oder ihrer Aufgabenkarte – wird sie überall geschlossen, sodass Anführer nie eine veraltete Aufgabe für eine Anfrage sehen, die jemand anderes bereits behandelt hat.

## Benachrichtigungen

Das System der Beitrittanfrage sendet automatisch Benachrichtigungen:

- **Wenn eine Anfrage eingereicht wird** – Alle Gruppenleiter erhalten eine Benachrichtigung. Wenn die Gruppe keinen Leiter hat, werden stattdessen der Mitarbeiter oder die Administratoren benachrichtigt, die der Aufgabe zugewiesen sind (siehe oben).
- **Wenn eine Anfrage genehmigt wird** – Der Anfragensteller erhält eine Bestätigung
- **Wenn eine Anfrage abgelehnt wird** – Der Anfragensteller erhält eine Benachrichtigung mit einem beliebigen Ablehnungsgrund

Benachrichtigungen werden im Benachrichtigungszentrum des Benutzers auf B1.church und in der mobilen App angezeigt.

## Verwalten von Anfragen von der Mitgliedsseite

Personen können ihre eigenen Beitrittanfragen von B1.church aus verwalten:

- Zeigen Sie den Status ihrer ausstehenden Anfragen auf der Gruppenseite an
- Brechen Sie eine ausstehende Anfrage ab, wenn Sie sich anders entscheiden
- Sehen Sie, ob Ihre Anfrage genehmigt oder abgelehnt wurde

## Best Practices

- **Antwort pünktlich** – Versuchen Sie, Anfragen innerhalb von 24-48 Stunden zu überprüfen, damit Personen nicht warten müssen
- **Seien Sie klar bei Ablehnungsgründen** – Helfen Sie Personen zu verstehen, welche nächsten Schritte oder Alternativen es gibt
- **Überprüfen Sie Profile** – Überprüfen Sie das Profil der Person, um zu sehen, ob sie eine gute Wahl für die Gruppe ist
- **Kommunizieren Sie Erwartungen** – Stellen Sie sicher, dass die Beschreibung Ihrer Gruppe klar angibt, für wen die Gruppe bestimmt ist

## Verwandte Artikel

- [Creating Groups](./creating-groups.md) (Gruppen erstellen) – Erfahren Sie, wie Sie Gruppen einrichten und Beitrittrichtlinien konfigurieren
- [Group Members](./group-members.md) (Gruppenmitglieder) – Verwalten Sie vorhandene Gruppenmitglieder
- [Group Calendar](./group-calendar.md) (Gruppenkalender) – Planen Sie Gruppentreffen und Veranstaltungen
