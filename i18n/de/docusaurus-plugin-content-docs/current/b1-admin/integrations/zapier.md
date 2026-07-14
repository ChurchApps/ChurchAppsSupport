---
title: "Zapier"
---

# Zapier

<div class="article-intro">

Die offizielle B1.church-App auf Zapier lässt einen Zap auf Ereignisse in Ihrer Kirche reagieren (neue Person, neue Spende, neues Gruppenmitglied, …) und Datensätze zurück in B1 schreiben. Keine Programmierung, keine Infrastruktur -- Sie verbinden alles im Drag-and-Drop-Editor von Zapier, fügen einen API-Schlüssel ein und aktivieren den Zap.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ein [Zapier](https://zapier.com)-Konto (die kostenlose Stufe reicht für eine Handvoll Zaps)
- Ein Kirchenadministrator mit der Berechtigung **Einstellungen bearbeiten** in B1Admin (Sie erstellen einen API-Schlüssel)
- Eine Vorstellung davon, was Sie tun möchten -- z. B. „wenn eine Person in B1 hinzugefügt wird, sie zu meiner Mailchimp-Liste hinzufügen"

</div>

## Trigger und Aktionen

| Typ | Was | B1-Ereignis/Endpunkt |
|---|---|---|
| **Trigger** | Neue Person | `person.created` |
| **Trigger** | Aktualisierte Person | `person.updated` |
| **Trigger** | Neue Spende | `donation.created` |
| **Trigger** | Neues Gruppenmitglied | `group.member.added` |
| **Trigger** | Neue Formulareinreichung | `form.submission.created` |
| **Aktion** | Person erstellen | fügt eine neue Person hinzu |
| **Aktion** | Spende hinzufügen | erfasst eine Spende |
| **Aktion** | Gruppenmitglied hinzufügen | fügt einer Gruppe eine Person hinzu |
| **Suche** | Person suchen | sucht eine Person nach ID, E-Mail oder Name |

Kombinieren Sie diese frei mit jeder der über 7.000 unterstützten Apps von Zapier.

## Einrichtung

### 1. Einen B1-API-Schlüssel erstellen

1. Gehen Sie in B1Admin zu **Einstellungen → Entwickler → API-Schlüssel**.
2. Klicken Sie auf **Neuer API-Schlüssel**, geben Sie ihm einen Namen wie „Zapier" und wählen Sie die Bereiche, die der Zap benötigt.
3. **Wichtig:** Zapier-Trigger registrieren beim Aktivieren des Zaps in Ihrem Namen einen Webhook, was den Bereich **`settings:write`** erfordert. Fügen Sie immer `settings:write` hinzu, wenn einer Ihrer Zaps einen B1-Trigger verwendet.
4. Gewähren Sie auch die Bereiche, die die Aktionen benötigen -- zum Beispiel benötigt eine Aktion „Spende hinzufügen" `donations:write`, „Person erstellen" benötigt `people:write`.
5. Speichern. Der vollständige `cak_…`-Schlüssel wird **einmal** angezeigt -- kopieren Sie ihn.

### 2. Zapier mit B1 verbinden

1. Erstellen Sie in Zapier einen neuen Zap.
2. Wenn Sie zum ersten Mal einen B1-Trigger oder eine B1-Aktion auswählen, fordert Zapier Sie auf, sich **bei B1.church anzumelden**.
3. Fügen Sie den API-Schlüssel aus Schritt 1 ein und klicken Sie auf **Ja, weiter**. Zapier überprüft ihn gegen Ihre Kirche.

Die Verbindung wird in Zapier gespeichert und von jedem Zap in Ihrem Konto wiederverwendet.

### 3. Den Zap erstellen

Wählen Sie einen Trigger und fügen Sie dann einen oder mehrere Aktionsschritte hinzu. Beispiele unten.

## Gängige Rezepte

### Neue B1-Personen zu Mailchimp hinzufügen

- **Trigger** -- B1: Neue Person
- **Aktion** -- Mailchimp: Abonnent hinzufügen/aktualisieren. Ordnen Sie B1s `name__first`, `name__last`, `contactInfo__email` den Feldern Vorname/Nachname/E-Mail von Mailchimp zu.

### Spenden mit einer reichhaltigeren Karte als der integrierte Connector in einen Slack-Kanal posten

- **Trigger** -- B1: Neue Spende
- **Aktion** -- Slack: Kanalnachricht senden. Erstellen Sie ein beliebiges Layout -- Schaltflächen, Anhänge usw. --, das der integrierte [Slack-Connector](./slack-discord) nicht kann.

### Neue Gruppenmitglieder zu einer Google-Gruppe hinzufügen

- **Trigger** -- B1: Neues Gruppenmitglied (gefiltert auf eine bestimmte `groupId`)
- **Aktion** -- Nach Zapier filtern: nur fortfahren, wenn die B1-Gruppe die ist, die Sie interessiert
- **Aktion** -- B1: Person suchen (mit der `personId` des Triggers, um die E-Mail zu erhalten)
- **Aktion** -- Google Groups: Mitglied hinzufügen

### Formulareinreichungen an einen Projekt-Tracker weiterleiten

- **Trigger** -- B1: Neue Formulareinreichung
- **Aktion** -- Notion / Linear / Asana / Trello: Seite / Vorgang / Aufgabe erstellen

## Wie Trigger unter der Haube funktionieren

Trigger sind **REST-Hooks**, kein Polling -- Zapier fragt B1 nicht alle 15 Minuten an. Wenn Sie den Zap aktivieren, bittet Zapier B1, einen Webhook zu registrieren, der auf eine private Zapier-URL zeigt; wenn das Ereignis eintritt, sendet B1 den Umschlag per POST an Zapier, und Ihr Zap startet **innerhalb von Sekunden**. Schalten Sie den Zap aus, bittet Zapier B1, den Webhook zu löschen -- keine verwaisten Abonnements.

Das bedeutet, dass der Trigger nur für Ereignisse ausgelöst wird, die eintreten, **nachdem** der Zap aktiviert wurde. Es gibt kein Backfill -- das Aktivieren eines Zaps spielt nicht die Spenden von gestern erneut ab.

## Einschränkungen & Hinweise

- **Mehrere Zaps mit demselben Trigger** registrieren jeweils ihren eigenen B1-Webhook -- es gibt keinen Konflikt, aber es ist gut zu wissen, wenn Sie **Einstellungen → Entwickler → Webhooks** untersuchen und sich fragen, warum dort drei identische Zeilen `Zapier — donation.created` stehen.
- **Testdaten beim Einrichten des Zaps** -- beim Erstellen eines Zaps fragt Zapier nach Beispieldaten für die Feldzuordnung. Es holt das aktuellste passende Ereignis von B1, falls vorhanden; andernfalls verwendet es ein synthetisches Beispiel aus der App-Definition.
- **Aktionsfehler erscheinen als Zap-Fehler** im Aufgabenverlauf von Zapier. Häufige Ursache: ein API-Schlüssel ohne den richtigen Bereich (z. B. benötigt eine Aktion „Spende hinzufügen" `donations:write`). Erstellen Sie den Schlüssel mit den richtigen Bereichen neu und verbinden Sie ihn in Zapier erneut.
- **Kontingente für ausgehende API-Aufrufe** -- jeder B1-API-Aufruf aus einer Aktion zählt zu Ihrem Zapier-Aufgabenkontingent, nicht zu irgendetwas auf der B1-Seite.

## Fehlerbehebung

- **„Authentifizierung fehlgeschlagen"** beim Verbinden -- der API-Schlüssel ist falsch, widerrufen oder es fehlen die Bereiche, die der Zap benötigt. Erstellen Sie ihn in B1Admin mit mindestens `settings:write` plus allen benötigten Ressourcenbereichen neu und aktualisieren Sie die Verbindung.
- **Trigger löst nie aus** -- bestätigen Sie, dass der Webhook tatsächlich registriert wurde: in B1Admin sollte unter **Einstellungen → Entwickler → Webhooks** nun eine Zeile namens „Zapier — &lt;Ereignis&gt;" erscheinen. Falls nicht, fehlte dem API-Schlüssel wahrscheinlich `settings:write`, als Sie den Zap aktivierten. Korrigieren Sie den Schlüssel und schalten Sie den Zap aus und wieder ein.
- **Trigger löst zweimal aus** -- Zapier liefert gelegentlich erneut zu, wenn seine Bestätigung verloren ging. Verwenden Sie bei Bedarf strikter Deduplizierung einen Schritt „Nach Zapier filtern" auf einer eindeutigen ID (z. B. der `id` der Person).

## Siehe auch

- [Make](./make) -- dasselbe Muster, andere Plattform
- [Slack & Discord](./slack-discord) -- einfachere Chat-Benachrichtigungen ohne Zapier
- [Webhooks (Entwicklerreferenz)](/docs/developer/api/webhooks)
