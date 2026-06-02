---
title: "Zapier"
---

# Zapier

<div class="article-intro">

Die offizielle B1.church-App auf Zapier ermöglicht es einem Zap, auf Ereignisse in Ihrer Kirche zu reagieren (neue Person, neue Spende, neues Gruppenmitglied, …) und Datensätze zurück an B1 zu schreiben. Kein Programmieren, keine Infrastruktur – Sie verdrahten alles im Drag-and-Drop-Editor von Zapier, fügen einen API-Schlüssel ein und schalten den Zap ein.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ein [Zapier](https://zapier.com)-Konto (die kostenlose Stufe reicht für eine Handvoll Zaps)
- Ein Kirchen-Administrator mit der Berechtigung **Edit Settings** in B1Admin (Sie erstellen einen API-Schlüssel)
- Eine Vorstellung davon, was Sie tun möchten – z. B. „wenn eine Person in B1 hinzugefügt wird, fügen Sie sie in meine Mailchimp-Liste ein"

</div>

## Trigger und Aktionen

| Typ | Was | B1-Ereignis / Endpoint |
|---|---|---|
| **Trigger** | Neue Person | `person.created` |
| **Trigger** | Aktualisierte Person | `person.updated` |
| **Trigger** | Neue Spende | `donation.created` |
| **Trigger** | Neues Gruppenmitglied | `group.member.added` |
| **Trigger** | Neue Formulareinsendung | `form.submission.created` |
| **Aktion** | Person erstellen | fügt eine neue Person hinzu |
| **Aktion** | Spende hinzufügen | erfasst eine Spende |
| **Aktion** | Gruppenmitglied hinzufügen | fügt eine Person zu einer Gruppe hinzu |
| **Suche** | Person suchen | sucht eine Person nach Name oder E-Mail |

Kombinieren Sie diese frei mit einer der 7.000+ unterstützten Apps von Zapier.

## Setup

### 1. Erstellen Sie einen B1-API-Schlüssel

1. Gehen Sie in B1Admin zu **Settings → Developer → API Keys**.
2. Klicken Sie auf **New API Key**, geben Sie einen Namen wie „Zapier" ein und wählen Sie die erforderlichen Bereiche.
3. **Wichtig:** Zapier-Trigger registrieren bei der Aktivierung einen Webhook in Ihrem Namen, was den Bereich **`settings:write`** erfordert. Beziehen Sie immer `settings:write` ein, wenn einer Ihrer Zaps einen B1-Trigger verwendet.
4. Gewähren Sie auch die Bereiche, die die Aktionen benötigen – zum Beispiel benötigt eine Aktion „Add Donation" `donations:write`, „Create Person" benötigt `people:write`.
5. Speichern Sie. Der vollständige `cak_…`-Schlüssel wird **einmal** angezeigt – kopieren Sie ihn.

### 2. Verbinden Sie Zapier mit B1

1. Erstellen Sie in Zapier einen neuen Zap.
2. Wenn Sie zum ersten Mal einen B1-Trigger oder eine Aktion wählen, fordert Zapier Sie auf, sich **bei B1.church anzumelden**.
3. Fügen Sie den API-Schlüssel aus Schritt 1 ein und klicken Sie auf **Yes, Continue**. Zapier validiert ihn gegen Ihre Kirche.

Die Verbindung wird in Zapier gespeichert und von jedem Zap in Ihrem Konto wiederverwendet.

### 3. Erstellen Sie den Zap

Wählen Sie einen Trigger aus, dann fügen Sie einen oder mehrere Aktionsschritte hinzu. Siehe Beispiele unten.

## Häufige Rezepte

### Neue B1-Personen zu Mailchimp hinzufügen

- **Trigger** — B1: New Person
- **Aktion** — Mailchimp: Add/Update Subscriber. Ordnen Sie B1's `name__first`, `name__last`, `contactInfo__email` den Feldern First Name / Last Name / Email von Mailchimp zu.

### Spenden in einem Slack-Kanal mit einer reichhaltigeren Karte als der integrierten Connector posten

- **Trigger** — B1: New Donation
- **Aktion** — Slack: Send Channel Message. Verfassen Sie ein beliebiges Layout – Schaltflächen, Anhänge usw. – das der integrierte [Slack-Connector](./slack-discord) nicht kann.

### Neue Gruppenmitglieder zu einer Google-Gruppe hinzufügen

- **Trigger** — B1: New Group Member (gefiltert auf eine bestimmte `groupId`)
- **Aktion** — Filter by Zapier: nur fortfahren, wenn die B1-Gruppe diejenige ist, die Sie interessiert
- **Aktion** — B1: Find Person (verwenden Sie die `personId` des Triggers, um die E-Mail zu abrufen)
- **Aktion** — Google Groups: Add Member

### Formulareinsendungen an einen Projekt-Tracker weiterleiten

- **Trigger** — B1: New Form Submission
- **Aktion** — Notion / Linear / Asana / Trello: Create page / issue / task

## Wie Trigger unter der Haube funktionieren

Trigger sind **REST Hooks**, kein Polling – Zapier pingt B1 nicht alle 15 Minuten an. Wenn Sie den Zap einschalten, fordert Zapier B1 auf, einen Webhook zu registrieren, der auf eine private Zapier-URL verweist. Wenn das Ereignis eintritt, sendet B1 die Nachricht an Zapier und Ihr Zap startet **innerhalb von Sekunden**. Schalten Sie den Zap aus und Zapier fordert B1 auf, den Webhook zu löschen – keine verwaisten Abonnements.

Das bedeutet, dass der Trigger nur für Ereignisse ausgelöst wird, die **nach** dem Einschalten des Zaps stattfinden. Es gibt keine Rückfüllung – das Einschalten eines Zaps spielt nicht gestern's Spenden erneut ab.

## Limits & Hinweise

- **Mehrere Zaps mit demselben Trigger** registrieren jeweils ihren eigenen B1-Webhook – es gibt keinen Konflikt, aber es lohnt sich zu wissen, wenn Sie **Settings → Developer → Webhooks** inspizieren und sich fragen, warum drei identische `Zapier — donation.created`-Zeilen dort sind.
- **Testdaten bei Zap-Setup** – Wenn Sie einen Zap erstellen, fordert Zapier Sie auf, Beispieldaten zum Zuordnen von Feldern bereitzustellen. Sie zieht das aktuellste passende Ereignis aus B1, falls vorhanden; andernfalls verwendet sie ein synthetisches Beispiel aus der App-Definition.
- **Aktionsfehler werden als Zap-Fehler** im Task-Verlauf von Zapier angezeigt. Häufige Ursache: ein API-Schlüssel ohne den richtigen Bereich (z. B. benötigt eine Aktion „Add Donation" `donations:write`). Prägen Sie den Schlüssel mit den korrekten Bereichen neu und verbinden Sie ihn erneut in Zapier.
- **Ausgehende API-Aufgegenkontingente** – Jeder B1-API-Aufruf von einer Aktion wird auf Ihr Zapier-Task-Kontingent angerechnet, nicht auf etwas auf B1-Seite.

## Fehlerbehebung

- **„Authentication failed"** beim Verbinden – Der API-Schlüssel ist falsch, widerrufen oder fehlen die Bereiche, die der Zap benötigt. Prägen Sie ihn in B1Admin mit mindestens `settings:write` plus allen Ressourcenbereichen, die der Zap berührt, erneut und aktualisieren Sie die Verbindung.
- **Trigger wird nie ausgelöst** – Bestätigen Sie, dass der Webhook tatsächlich registriert wurde: In B1Admin sollte **Settings → Developer → Webhooks** jetzt eine Zeile mit dem Namen „Zapier — &lt;event&gt;" anzeigen. Wenn sie nicht vorhanden ist, fehlte dem API-Schlüssel wahrscheinlich `settings:write`, als Sie den Zap einschalteten. Beheben Sie den Schlüssel und schalten Sie den Zap aus und wieder ein.
- **Trigger wird zweimal ausgelöst** – Zapier liefert gelegentlich erneut, wenn die Bestätigung verloren ging. Verwenden Sie einen Schritt „Filter by Zapier" auf einer eindeutigen ID (z. B. der `id` der Person), wenn Sie strikte Deduplizierung benötigen.

## Siehe auch

- [Make](./make) – gleiches Muster, andere Plattform
- [Slack & Discord](./slack-discord) – einfachere Chat-Benachrichtigungen ohne Zapier
- [Webhooks (Entwicklerreferenz)](/docs/developer/api/webhooks)
