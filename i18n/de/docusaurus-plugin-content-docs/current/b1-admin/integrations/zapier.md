---
title: "Zapier"
---

# Zapier

<div class="article-intro">

Die offizielle B1.church-App in Zapier lässt einen Zap auf Ereignisse in Ihrer Gemeinde reagieren (neue Person, neue Spende, neues Gruppenmitglied, …) und Datensätze zurück nach B1 schreiben. Ohne Programmierung, ohne eigene Infrastruktur — Sie verbinden alles im Drag-and-drop-Editor von Zapier, fügen einen API-Schlüssel ein und schalten den Zap ein.

</div>

:::caution Warten auf die Genehmigung durch Zapier
Die B1.church-App ist fertig gebaut und funktioniert, wartet aber noch auf die Prüfung durch Zapier, bevor sie öffentlich im App-Verzeichnis des Zap-Editors erscheint. Bis sie genehmigt ist, können nur eingeladene Konten sie verwenden. Alles Folgende beschreibt, wie es nach der Genehmigung funktionieren wird.
:::

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ein [Zapier](https://zapier.com)-Konto (der kostenlose Tarif reicht für ein paar Zaps)
- Ein Gemeinde-Admin mit der Berechtigung **Einstellungen bearbeiten** in B1Admin (dort erstellen Sie einen API-Schlüssel)
- Eine Vorstellung davon, was Sie erreichen möchten — z. B. „Wenn eine Person in B1 hinzugefügt wird, füge sie meiner Mailchimp-Liste hinzu“

</div>

## Trigger und Aktionen

| Typ | Was | B1-Ereignis / Endpunkt |
|---|---|---|
| **Trigger** | Neue Person | `person.created` |
| **Trigger** | Aktualisierte Person | `person.updated` |
| **Trigger** | Neue Spende | `donation.created` |
| **Trigger** | Neues Gruppenmitglied | `group.member.added` |
| **Trigger** | Neue Formularübermittlung | `form.submission.created` |
| **Aktion** | Person erstellen | fügt eine neue Person hinzu |
| **Aktion** | Spende hinzufügen | erfasst eine Spende |
| **Aktion** | Gruppenmitglied hinzufügen | fügt eine Person einer Gruppe hinzu |
| **Aktion** | Person suchen | sucht eine Person anhand von ID, E-Mail oder Name; schlägt der Schritt fehl, wenn keine Person passt |

Kombinieren Sie diese frei mit jeder der über 7.000 unterstützten Apps von Zapier.

## Einrichtung

### 1. B1-API-Schlüssel erstellen

1. Gehen Sie in B1Admin zu **Einstellungen → Entwickler → API-Schlüssel**.
2. Klicken Sie auf **Neuer API-Schlüssel**, geben Sie ihm einen Namen wie „Zapier“ und wählen Sie die Bereiche (Scopes), die der Zap benötigt.
3. **Wichtig:** Zapier-Trigger registrieren beim Einschalten eines Zaps in Ihrem Namen einen Webhook, wofür der Bereich **`settings:write`** erforderlich ist. Nehmen Sie `settings:write` immer auf, wenn einer Ihrer Zaps einen B1-Trigger verwendet.
4. Gewähren Sie außerdem die Bereiche, die die Aktionen benötigen — zum Beispiel braucht die Aktion „Spende hinzufügen“ `donations:write`, „Person erstellen“ braucht `people:write`.
5. Speichern. Der vollständige Schlüssel `cak_…` wird **nur einmal** angezeigt — kopieren Sie ihn.

### 2. Zapier mit B1 verbinden

1. Erstellen Sie in Zapier einen neuen Zap.
2. Wenn Sie zum ersten Mal einen B1-Trigger oder eine B1-Aktion auswählen, fordert Zapier Sie auf, sich bei **B1.church anzumelden**.
3. Fügen Sie den API-Schlüssel aus Schritt 1 ein und klicken Sie auf **Ja, weiter**. Zapier prüft ihn gegen Ihre Gemeinde.

Die Verbindung wird in Zapier gespeichert und von jedem Zap in Ihrem Konto wiederverwendet.

### 3. Den Zap erstellen

Wählen Sie einen Trigger und fügen Sie dann einen oder mehrere Aktionsschritte hinzu. Beispiele folgen unten.

## Häufige Anwendungsbeispiele

### Neue B1-Personen zu Mailchimp hinzufügen

- **Trigger** — B1: Neue Person
- **Aktion** — Mailchimp: Abonnent hinzufügen/aktualisieren. Ordnen Sie B1s `name__first`, `name__last` und `contactInfo__email` den Feldern Vorname / Nachname / E-Mail in Mailchimp zu.

### Spenden mit einer umfangreicheren Karte in einen Slack-Kanal posten als mit dem eingebauten Connector

- **Trigger** — B1: Neue Spende
- **Aktion** — Slack: Kanalnachricht senden. Gestalten Sie ein beliebiges Layout — Schaltflächen, Anhänge usw. — das der eingebaute [Slack-Connector](./slack-discord) nicht kann.

### Neue Gruppenmitglieder zu einer Google-Gruppe hinzufügen

- **Trigger** — B1: Neues Gruppenmitglied (gefiltert auf eine bestimmte `groupId`)
- **Aktion** — Filter von Zapier: nur fortfahren, wenn es die B1-Gruppe ist, die Sie interessiert
- **Aktion** — B1: Person suchen (verwenden Sie die `personId` aus dem Trigger, um die E-Mail-Adresse abzurufen)
- **Aktion** — Google Groups: Mitglied hinzufügen

### Formularübermittlungen an einen Projekt-Tracker weiterleiten

- **Trigger** — B1: Neue Formularübermittlung
- **Aktion** — Notion / Linear / Asana / Trello: Seite / Issue / Aufgabe erstellen

## Wie Trigger intern funktionieren

Trigger sind **REST-Hooks**, kein Polling — Zapier fragt B1 nicht alle 15 Minuten ab. Wenn Sie den Zap einschalten, bittet Zapier B1, einen Webhook zu registrieren, der auf eine private Zapier-URL zeigt; tritt das Ereignis ein, sendet B1 den Datensatz per POST an Zapier und Ihr Zap startet **innerhalb von Sekunden**. Schalten Sie den Zap aus, bittet Zapier B1, den Webhook wieder zu löschen — es bleiben keine verwaisten Abonnements zurück.

Das bedeutet, dass der Trigger nur für Ereignisse auslöst, die **nach** dem Einschalten des Zaps stattfinden. Es gibt keine Nachholung — das Einschalten eines Zaps spielt die Spenden von gestern nicht erneut ab.

## Grenzen und Hinweise

- **Mehrere Zaps mit demselben Trigger** registrieren jeweils ihren eigenen B1-Webhook — es gibt keinen Konflikt, aber es ist gut zu wissen, wenn Sie unter **Einstellungen → Entwickler → Webhooks** nachsehen und sich fragen, warum dort drei identische Zeilen „Zapier — donation.created“ stehen.
- **Testdaten im Zap-Setup** — wenn Sie einen Zap erstellen, fragt Zapier nach Beispieldaten, um Felder zuzuordnen. Es ruft das neueste passende Ereignis aus B1 ab, sofern vorhanden; andernfalls verwendet es ein synthetisches Beispiel aus der App-Definition.
- **Aktionsfehler erscheinen als Zap-Fehler** im Aufgabenverlauf von Zapier. Häufige Ursache: Ein API-Schlüssel ohne den passenden Bereich (z. B. braucht die Aktion „Spende hinzufügen“ `donations:write`). Erstellen Sie den Schlüssel mit den richtigen Bereichen neu und verbinden Sie ihn in Zapier erneut.
- **Kontingente für ausgehende API-Aufrufe** — jeder B1-API-Aufruf aus einer Aktion zählt auf Ihr Zapier-Aufgabenkontingent, nicht auf etwas auf Seiten von B1.

## Fehlerbehebung

- **„Authentication failed“** beim Verbinden — der API-Schlüssel ist falsch, widerrufen oder hat nicht die Bereiche, die der Zap benötigt. Erstellen Sie ihn in B1Admin mit mindestens `settings:write` plus den Ressourcenbereichen, die der Zap verwendet, neu und aktualisieren Sie dann die Verbindung.
- **Trigger wird nie ausgelöst** — prüfen Sie, ob der Webhook tatsächlich registriert wurde: In B1Admin sollte unter **Einstellungen → Entwickler → Webhooks** nun eine Zeile mit dem Namen „Zapier — &lt;event&gt;“ stehen. Fehlt sie, hatte der API-Schlüssel beim Einschalten des Zaps vermutlich nicht `settings:write`. Korrigieren Sie den Schlüssel und schalten Sie den Zap aus und wieder ein.
- **Trigger wird doppelt ausgelöst** — Zapier liefert gelegentlich erneut aus, wenn seine Bestätigung verloren ging. Verwenden Sie einen Schritt „Filter by Zapier“ auf einer eindeutigen ID (z. B. die `id` der Person), wenn Sie eine strikte Deduplizierung benötigen.

## Siehe auch

- [Make](./make) — dasselbe Muster, andere Plattform
- [Slack & Discord](./slack-discord) — einfachere Chat-Benachrichtigungen ohne Zapier
- [Webhooks (Entwicklerreferenz)](/docs/developer/api/webhooks)
