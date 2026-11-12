---
title: "Text In Church"
description: "Verbinden Sie B1 Admin und Text In Church über Zapier: API-Schlüssel erstellen, einen Zap von Connect Card zu B1 einrichten und Gruppenmitgliedschaften spiegeln."
---

# Text In Church

<div class="article-intro">

[Text In Church](https://textinchurch.com) bündelt SMS mit Drip-Workflows und Automatisierungen für Connect Cards. Die Zapier-App bietet beide Richtungen: Sie können B1-Ereignisse in einen Workflow von Text In Church einspeisen und umgekehrt Connect-Card- oder Neukontakt-Auslöser in B1 übernehmen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ein [Text In Church](https://textinchurch.com)-Konto mit einem Tarif, der die Zapier-Integration enthält
- Ein [Zapier](https://zapier.com)-Konto
- Ein B1Admin-Benutzer mit der Berechtigung **Einstellungen bearbeiten**

</div>

## Was Sie verbinden können {#what-you-can-wire-up}

| Richtung | Auslöser | Aktion |
|---|---|---|
| B1 → Text In Church | B1 `person.created` | Person erstellen/aktualisieren + zu Gruppe hinzufügen |
| B1 → Text In Church | B1 `form.submission.created` | Textnachricht über das zuständige Team senden |
| B1 → Text In Church | B1 `group.member.added` | Zu Gruppe hinzufügen (Gruppenmitgliedschaft spiegeln) |
| Text In Church → B1 | Connect Card eingereicht | B1: Person erstellen + Gruppenmitglied hinzufügen |
| Text In Church → B1 | Person erstellt | B1: Person erstellen |
| Text In Church → B1 | Person ist einer Gruppe beigetreten | B1: Gruppenmitglied hinzufügen |

Zu den Aktionen von Text In Church gehören außerdem *Textnachricht senden*, *Sprachrundspruch senden*, *Aufgabe erstellen*, *Person/Gruppe suchen* sowie das Hinzufügen und Entfernen von Gruppenmitgliedern.

## Einrichtung {#setup}

### 1. Einen B1-API-Schlüssel erstellen {#1-mint-a-b1-api-key}

**Einstellungen → Entwickler → API-Schlüssel → Neuer API-Schlüssel**:

- `settings:write` – erforderlich, um den Schlüssel mit Zapier zu verbinden und für Zaps, die von B1 ausgelöst werden
- `people:read`, `people:write` – um die Person zu finden oder anzulegen
- `groups:write` – für die Synchronisation von Gruppen
- (Optional) `donations:write`, wenn Sie Spendenbestätigungen an TIC anbinden

### 2. Text In Church mit Zapier verbinden {#2-connect-text-in-church-to-zapier}

Folgen Sie dem [Leitfaden zur Zapier-Integration von Text In Church](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration). Dort erzeugen Sie ein API-Token im Dashboard von TIC.

### 3. Den Zap von Connect Card zu B1 erstellen {#3-build-the-connect-card-to-b1-zap}

Dies ist die häufigste Richtung. Connect Cards, die in TIC eingehen, werden automatisch zu neuen Personen in B1.

1. **Auslöser** – Text In Church: Connect Card eingereicht.
2. **Aktion** – B1.church: Person suchen (anhand der E-Mail-Adresse).
3. **Aktion** – B1.church: Gruppenmitglied zur Gruppe „Neuer Kontakt“ hinzufügen, mit der Personen-ID aus Schritt 2.

Die Funktion *Person suchen* von B1 bricht den Zap mit dem Fehler „No person found“ ab, wenn niemand passt; daher kann ein Pfad nicht darauf verzweigen. Richten Sie für neue Kontakte die Fehlerbehandlung von Zapier für den Schritt Person suchen ein und führen Sie im Fehlerpfad B1.church: Person erstellen und danach Gruppenmitglied hinzufügen aus.

Schalten Sie den Zap ein. Die nächste über TIC eingereichte Connect Card landet automatisch unter **B1Admin → Personen**.

## Häufige Rezepte {#common-recipes}

### Einen Workflow im Stil einer Connect Card aus einem B1-Formular auslösen {#trigger-a-connect-card-style-workflow-from-a-b1-form}

- **Auslöser** – B1.church: Neue Formular-Einsendung (Filter auf die ID des Formulars „Ich bin neu hier“)
- **Aktion** – Text In Church: Person erstellen/aktualisieren und dabei die Antworten des Formulars zu E-Mail, Telefon und Name zuordnen
- **Aktion** – Text In Church: Zu Gruppe hinzufügen, wobei der Gruppe ein vorgefertigter Willkommens-Workflow zugeordnet ist

### Gruppenmitgliedschaft spiegeln {#mirror-group-membership}

- **Auslöser** – B1.church: Neues Gruppenmitglied, gefiltert auf eine bestimmte `groupId`
- **Aktion** – Text In Church: Zu Gruppe hinzufügen (dieselbe Person, spiegelnde Gruppe). Kombinieren Sie dies mit einem Zap für `group.member.removed`, wenn Sie eine vollständige Synchronisation wünschen.

### Eine Leitung benachrichtigen, wenn jemand beitritt {#page-a-leader-when-someone-joins}

- **Auslöser** – B1.church: Neues Gruppenmitglied
- **Aktion** – Text In Church: Textnachricht senden, Empfänger = Telefonnummer der Gruppenleitung, Text = `"{first} {last} just joined {group}"`.

## Einschränkungen und Hinweise {#limits--notes}

- **Die Zapier-App von TIC hängt vom Tarif ab.** Ist die Zapier-Integration im Dashboard von TIC ausgegraut, wenden Sie sich an den Support von TIC, um sie für Ihren Tarif freizuschalten.
- **Gruppen-IDs stammen von TIC, nicht von B1.** Beim Spiegeln müssen Sie irgendwo eine Zuordnungstabelle pflegen (eine Zapier-*Nachschlagetabelle* oder fest in jedem Zap hinterlegt).
- **Das Senden von Textnachrichten kostet Credits.** Jeder Zap, der *Textnachricht senden* auslöst, verbraucht Ihr SMS-Kontingent bei TIC.

## Fehlerbehebung {#troubleshooting}

- **Der Auslöser für Connect Cards feuert nicht** – TIC benötigt die aktivierte Zapier-Integration. Prüfen Sie außerdem, ob das Formular, mit dem Sie getestet haben, als „Connect Card“ und nicht als allgemeine Umfrage eingerichtet ist.
- **Person erstellen in B1 schlägt mit 401 fehl** – der API-Schlüssel ist falsch, widerrufen oder hat keine Berechtigung `people:write`. Erstellen Sie ihn neu.
- **Doppelte Personen in B1** – TIC sendet für dasselbe Ereignis sowohl *Person erstellt* als auch *Connect Card eingereicht*. Wählen Sie eines als maßgebliche Quelle und fügen Sie beim anderen einen Zapier-Filter hinzu.

## Siehe auch {#see-also}

- [Clearstream](./clearstream.md) – alternative SMS-Plattform mit ähnlichem Zapier-Aufbau
- [Zapier (Überblick)](../zapier.md) – die B1-Seite jedes Zapier-Rezepts
- [Zapier-Leitfaden von Text In Church](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration) (Dokumentation von TIC)
