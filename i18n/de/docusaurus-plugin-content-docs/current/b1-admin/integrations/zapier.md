---
title: "Zapier"
---

# Zapier

<div class="article-intro">

Die offizielle B1.church-App auf Zapier ermöglicht es einem Zap, auf Events in deiner Kirche zu reagieren (neue Person, neue Spende, neues Gruppenmitglied, …) und Records zu B1 zurückzuschreiben. Keine Kodierung, keine Infrastruktur – du verbindest es im Drag-and-Drop-Editor von Zapier, fügst einen API-Schlüssel ein und schaltests den Zap ein.

</div>

<div class="prereqs">
<h4>Bevor du beginnst</h4>

- Ein [Zapier](https://zapier.com)-Konto (die kostenlose Version reicht für ein Dutzend Zaps)
- Ein Kirchenadmin mit der Berechtigung **Bearbeite Einstellungen** in B1Admin (du wirst einen API-Schlüssel erstellen)
- Eine Idee, was du tun möchtest – z. B. "wenn eine Person in B1 hinzugefügt wird, füge sie meiner Mailchimp-Liste hinzu"

</div>

## Trigger und Aktionen

| Typ | Was | B1-Event / Endpunkt |
|---|---|---|
| **Trigger** | Neue Person | `person.created` |
| **Trigger** | Aktualisierte Person | `person.updated` |
| **Trigger** | Neue Spende | `donation.created` |
| **Trigger** | Neues Gruppenmitglied | `group.member.added` |
| **Trigger** | Neue Formulareinreichung | `form.submission.created` |
| **Aktion** | Person erstellen | fügt eine neue Person hinzu |
| **Aktion** | Spende hinzufügen | zeichnet eine Spende auf |
| **Aktion** | Gruppenmitglied hinzufügen | fügt eine Person zu einer Gruppe hinzu |
| **Aktion** | Person finden | sucht eine Person nach ID, E-Mail oder Name; schlägt die Aufgabe fehl, wenn niemand übereinstimmt |

Kombiniere diese frei mit jedem der 7.000+ unterstützten Apps von Zapier.

## Einrichtung

### 1. Erstelle einen B1 API-Schlüssel

1. Gehe in B1Admin zu **Einstellungen → Entwickler → API-Schlüssel**.
2. Klicke auf **Neuer API-Schlüssel**, gib ihm einen Namen wie "Zapier" und wähle die Scopes, die der Zap benötigt.
3. **Wichtig:** Zapier registriert bei deinem Namen einen Webhook, wenn sich der Zap anschaltet, was den Scope **`settings:write`** erfordert. Beziehe immer `settings:write` ein, wenn einer deiner Zaps einen B1-Trigger verwendet.
4. Gewähre auch die Scopes, die Aktionen benötigen – beispielsweise benötigt eine "Spende hinzufügen"-Aktion `donations:write`, "Person erstellen" benötigt `people:write`.
5. Speichern. Der volle `cak_…`-Schlüssel wird **nur einmal** angezeigt – kopiere ihn.

### 2. Verbinde Zapier mit B1

1. Erstelle in Zapier einen neuen Zap.
2. Wenn du zum ersten Mal einen B1-Trigger oder eine Aktion auswählst, fragt dich Zapier, dich **bei B1.church anzumelden**.
3. Füge den API-Schlüssel aus Schritt 1 ein und klicke auf **Ja, weiterfahren**. Zapier validiert es gegen deine Kirche.

Die Verbindung wird in Zapier gespeichert und von jedem Zap auf deinem Konto wiederverwendet.

### 3. Baue den Zap

Wähle einen Trigger und füge dann einen oder mehrere Aktionsschritte hinzu. Beispiele unten.

## Häufige Rezepte

### Füge neue B1-Personen zu Mailchimp hinzu

- **Trigger** – B1: Neue Person
- **Aktion** – Mailchimp: Abonnent hinzufügen/aktualisieren. Ordne B1's `name__first`, `name__last`, `contactInfo__email` in Mailchimps Felder "Vorname / Nachname / E-Mail" zu.

### Sende Spenden auf einen Slack-Kanal mit einer reichhaltigeren Karte als der integrierte Connector

- **Trigger** – B1: Neue Spende
- **Aktion** – Slack: Sende Kanalnachricht. Komponiere ein beliebiges Layout – Buttons, Anhänge usw. – das der integrierte [Slack-Connector](./slack-discord) nicht kann.

### Füge neue Gruppenmitglieder zu einer Google-Gruppe hinzu

- **Trigger** – B1: Neues Gruppenmitglied (gefiltert zu einer bestimmten `groupId`)
- **Aktion** – Filtere nach Zapier: fahre nur fort, wenn die B1-Gruppe diejenige ist, die dich interessiert
- **Aktion** – B1: Finde Person (verwende die Trigger-`personId` um die E-Mail zu abrufen)
- **Aktion** – Google-Gruppen: Mitglied hinzufügen

### Leite Formulareinreichungen an einen Project-Tracker weiter

- **Trigger** – B1: Neue Formulareinreichung
- **Aktion** – Notion / Linear / Asana / Trello: Seite / Problem / Aufgabe erstellen

## Wie Trigger unter der Haube funktionieren

Trigger sind **REST-Hooks**, kein Polling – Zapier pingt B1 nicht alle 15 Minuten an. Wenn du den Zap anschaltests, fragt Zapier B1, einen Webhook zu registrieren, der auf eine private Zapier-URL verweist; wenn das Event feuert, POSTet B1 die Envelope zu Zapier und dein Zap beginnt **innerhalb von Sekunden**. Schalte den Zap aus und Zapier fragt B1, den Webhook zu löschen – keine verwaisten Abos.

Dies bedeutet, dass der Trigger nur für Events auslöst, die **nach** dem Anschalten des Zaps auftreten. Es gibt keine Rückfüllung – das Anschalten eines Zaps spielt nicht die Spenden von gestern ab.

## Limits & Anmerkungen

- **Mehrere Zaps mit dem gleichen Trigger** registrieren jeweils ihren eigenen B1-Webhook – es gibt keinen Konflikt, aber es ist erwähnenswert, wenn du **Einstellungen → Entwickler → Webhooks** überprüfst und dich wunderst, warum dort drei identische Zeilen "Zapier — donation.created" sind.
- **Testdaten im Zap-Setup** – Wenn du einen Zap erstellst, fragt dich Zapier nach Musterdaten, um Felder zuordnen zu können. Es zieht das neueste übereinstimmende Event von B1, falls vorhanden; andernfalls verwendet es ein synthetisches Sample aus der App-Definition.
- **Aktionsfehler erscheinen als Zap-Fehler** in der Task-Verlauf von Zapier. Häufige Ursache: Ein API-Schlüssel ohne den richtigen Scope (z. B. benötigt eine "Spende hinzufügen"-Aktion `donations:write`). Präge den Schlüssel erneut mit den korrekten Scopes und verbinde ihn erneut in Zapier.
- **Quoten für ausgehende API-Aufrufe** – jeder B1 API-Aufruf von einer Aktion zählt zu deiner Zapier-Task-Quote, nicht zu irgendwas auf B1-Seite.

## Fehlerbehebung

- **"Authentifizierung fehlgeschlagen"** beim Verbinden – Der API-Schlüssel ist falsch, widerrufen oder es fehlen die Scopes, die der Zap benötigt. Präge ihn erneut in B1Admin mit mindestens `settings:write` plus den Ressourcen-Scopes, die der Zap berührt, neu, dann aktualisiere die Verbindung.
- **Trigger feuert nie** – Bestätige, dass der Webhook tatsächlich registriert wurde: In B1Admin sollte **Einstellungen → Entwickler → Webhooks** nun eine Zeile mit dem Namen "Zapier – &lt;event&gt;" anzeigen. Wenn es nicht dort ist, fehlte dem API-Schlüssel wahrscheinlich `settings:write`, als du den Zap anschaltests. Behebe den Schlüssel, schalte den Zap aus und wieder an.
- **Trigger feuert zweimal** – Zapier liefert gelegentlich neu aus, wenn die Bestätigung verloren ging. Verwende einen "Zapier-Filter"-Schritt auf einer eindeutigen ID (z. B. der Personen-`id`), wenn du strikte Deduplizierung benötigst.

## Siehe auch

- [Make](./make) – gleiches Muster, andere Plattform
- [Slack & Discord](./slack-discord) – einfachere Chat-Benachrichtigungen ohne Zapier
- [Webhooks (Developer-Referenz)](/docs/developer/api/webhooks)
