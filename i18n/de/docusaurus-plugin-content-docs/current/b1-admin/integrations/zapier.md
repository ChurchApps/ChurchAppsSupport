---
title: "Zapier"
description: "Verbinden Sie B1 Admin mit Zapier, um Automatisierungen bei neuen Personen, Spenden und Gruppenmitgliedern zu starten und Datensätze ohne Programmierung zurück nach B1 zu schreiben."
---

# Zapier

<div class="article-intro">

Die offizielle B1.church-App in Zapier lässt einen Zap auf Ereignisse in Ihrer Gemeinde reagieren (neue Person, neue Spende, neues Gruppenmitglied, …) und Datensätze zurück nach B1 schreiben. Keine Programmierung, keine eigene Infrastruktur: Sie richten es im Drag-and-drop-Editor von Zapier ein, fügen einen API-Schlüssel ein und schalten den Zap ein.

</div>

:::caution Wartet auf die Freigabe durch Zapier
Die B1.church-App ist fertiggestellt und funktioniert, wartet aber noch auf die Prüfung durch Zapier, bevor sie öffentlich im App-Verzeichnis des Zap-Editors erscheint. Bis sie freigegeben ist, können nur eingeladene Konten sie nutzen. Alles Folgende beschreibt, wie sie nach der Freigabe funktionieren wird.
:::

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ein [Zapier](https://zapier.com)-Konto (der kostenlose Tarif reicht für einige wenige Zaps)
- Eine Gemeindeadministration mit der Berechtigung **Einstellungen bearbeiten** in B1Admin (dort erstellen Sie einen API-Schlüssel)
- Eine Vorstellung davon, was Sie erreichen möchten – z. B. „Wenn in B1 eine Person angelegt wird, füge sie meiner Mailchimp-Liste hinzu“

</div>

## Auslöser und Aktionen {#triggers-and-actions}

| Typ | Was | B1-Ereignis / Endpunkt |
|---|---|---|
| **Auslöser** | Neue Person | `person.created` |
| **Auslöser** | Aktualisierte Person | `person.updated` |
| **Auslöser** | Neue Spende | `donation.created` |
| **Auslöser** | Neues Gruppenmitglied | `group.member.added` |
| **Auslöser** | Neue Formular-Einsendung | `form.submission.created` |
| **Aktion** | Person erstellen | fügt eine neue Person hinzu |
| **Aktion** | Spende hinzufügen | erfasst eine Spende |
| **Aktion** | Gruppenmitglied hinzufügen | fügt eine Person einer Gruppe hinzu |
| **Aktion** | Person suchen | sucht eine Person anhand von ID, E-Mail-Adresse oder Name; schlägt die Aufgabe fehl, wenn niemand passt |

Sie können diese frei mit jeder der über 7.000 unterstützten Apps von Zapier kombinieren.

## Einrichtung {#setup}

### 1. Einen B1-API-Schlüssel erstellen {#1-create-a-b1-api-key}

1. Gehen Sie in B1Admin zu **Einstellungen → Entwickler → API-Schlüssel**.
2. Klicken Sie auf **Neuer API-Schlüssel**, geben Sie ihm einen Namen wie „Zapier“ und wählen Sie die Berechtigungen, die der Zap benötigt.
3. **Wichtig:** Nehmen Sie immer die Berechtigung **`settings:write`** auf. Zapier prüft den Schlüssel beim Verbinden gegen die Webhook-Liste von B1, und B1-Auslöser registrieren beim Einschalten des Zaps in Ihrem Namen einen Webhook – beides benötigt `settings:write`. Ein Schlüssel ohne diese Berechtigung besteht den Verbindungstest nicht, selbst wenn Ihre Zaps nur B1-Aktionen verwenden.
4. Vergeben Sie außerdem die Berechtigungen, die die Aktionen benötigen – zum Beispiel braucht die Aktion „Spende hinzufügen“ `donations:write`, „Person erstellen“ braucht `people:write`.
5. Speichern Sie. Der vollständige Schlüssel `cak_…` wird **einmal** angezeigt – kopieren Sie ihn.

### 2. Zapier mit B1 verbinden {#2-connect-zapier-to-b1}

1. Erstellen Sie in Zapier einen neuen Zap.
2. Wenn Sie zum ersten Mal einen B1-Auslöser oder eine B1-Aktion wählen, fordert Zapier Sie auf, sich bei **B1.church anzumelden**.
3. Fügen Sie den API-Schlüssel aus Schritt 1 in **API Key** ein (lassen Sie **API URL** leer) und klicken Sie auf **Ja, weiter**. Zapier prüft den Schlüssel gegen Ihre Gemeinde.

Die Verbindung wird in Zapier gespeichert und von jedem Zap in Ihrem Konto wiederverwendet.

### 3. Den Zap erstellen {#3-build-the-zap}

Wählen Sie einen Auslöser und fügen Sie dann einen oder mehrere Aktionsschritte hinzu. Beispiele folgen unten.

## Häufige Rezepte {#common-recipes}

### Neue B1-Personen zu Mailchimp hinzufügen {#add-new-b1-people-to-mailchimp}

- **Auslöser** – B1: Neue Person
- **Aktion** – Mailchimp: Abonnent hinzufügen/aktualisieren. Ordnen Sie `name__first`, `name__last` und `contactInfo__email` aus B1 den Feldern Vorname / Nachname / E-Mail in Mailchimp zu.

### Spenden mit einer umfangreicheren Karte in einen Slack-Kanal senden, als der eingebaute Connector es kann {#post-donations-to-a-slack-channel-with-a-richer-card-than-the-built-in-connector}

- **Auslöser** – B1: Neue Spende
- **Aktion** – Slack: Kanalnachricht senden. Gestalten Sie ein beliebiges Layout – Schaltflächen, Anhänge usw. –, das der eingebaute [Slack-Connector](./slack-discord.md) nicht bietet.

### Neue Gruppenmitglieder zu einer Google-Gruppe hinzufügen {#add-new-group-members-to-a-google-group}

- **Auslöser** – B1: Neues Gruppenmitglied
- **Aktion** – Filter von Zapier: nur fortfahren, wenn die `groupId` des Auslösers die gewünschte B1-Gruppe ist
- **Aktion** – B1: Person suchen (verwenden Sie die `personId` des Auslösers, um die E-Mail-Adresse abzurufen)
- **Aktion** – Google-Gruppen: Mitglied hinzufügen

### Formular-Einsendungen an einen Projekt-Tracker weiterleiten {#forward-form-submissions-to-a-project-tracker}

- **Auslöser** – B1: Neue Formular-Einsendung
- **Aktion** – Notion / Linear / Asana / Trello: Seite / Ticket / Aufgabe erstellen

## So funktionieren Auslöser im Hintergrund {#how-triggers-work-under-the-hood}

Auslöser sind **REST-Hooks**, kein Abfragen – Zapier fragt B1 nicht alle 15 Minuten ab. Wenn Sie den Zap einschalten, bittet Zapier B1, einen Webhook auf eine private Zapier-URL zu registrieren. Tritt das Ereignis ein, sendet B1 den Umschlag an Zapier, und Ihr Zap startet **innerhalb von Sekunden**. Schalten Sie den Zap aus, bittet Zapier B1, den Webhook zu löschen – es bleiben keine verwaisten Abonnements zurück.

Das bedeutet: Der Auslöser startet nur bei Ereignissen, die **nach** dem Einschalten des Zaps eintreten. Es gibt keine nachträgliche Verarbeitung – das Einschalten eines Zaps spielt die Spenden von gestern nicht noch einmal ab.

## Einschränkungen und Hinweise {#limits--notes}

- **Mehrere Zaps mit demselben Auslöser** registrieren jeweils einen eigenen Webhook in B1. Es gibt keinen Konflikt, aber es lohnt sich zu wissen, dass unter **Einstellungen → Entwickler → Webhooks** drei identische Zeilen `Zapier — donation.created` erscheinen können.
- **Testdaten bei der Einrichtung des Zaps** – beim Erstellen eines Zaps fragt Zapier nach Beispieldaten für die Zuordnung der Felder. Es holt das jüngste passende Ereignis aus B1, falls vorhanden; andernfalls wird ein synthetisches Beispiel aus der App-Definition verwendet.
- **Fehler bei Aktionen erscheinen als Zap-Fehler** im Aufgabenverlauf von Zapier. Häufige Ursache: ein API-Schlüssel ohne die passende Berechtigung (z. B. benötigt die Aktion „Spende hinzufügen“ `donations:write`). Erstellen Sie den Schlüssel mit den richtigen Berechtigungen neu und verbinden Sie ihn in Zapier erneut.
- **Kontingente für ausgehende API-Aufrufe** – jeder API-Aufruf von B1 aus einer Aktion zählt auf Ihr Aufgabenkontingent bei Zapier, nicht auf der Seite von B1.

## Fehlerbehebung {#troubleshooting}

- **„Authentication failed“ beim Verbinden** – der API-Schlüssel ist falsch, gelöscht oder hat keine Berechtigung `settings:write`. Erstellen Sie in B1Admin einen neuen Schlüssel mit `settings:write` und den Ressourcen-Berechtigungen, die der Zap berührt (Berechtigungen lassen sich an einem vorhandenen Schlüssel nicht ändern), und aktualisieren Sie dann die Verbindung.
- **Der Auslöser startet nie** – prüfen Sie, ob der Webhook tatsächlich registriert wurde: In B1Admin sollte unter **Einstellungen → Entwickler → Webhooks** nun eine Zeile „Zapier — &lt;Ereignis&gt;“ erscheinen. Fehlt sie, hatte dem API-Schlüssel beim Einschalten des Zaps wahrscheinlich `settings:write` gefehlt. Korrigieren Sie den Schlüssel, schalten Sie den Zap aus und wieder ein.
- **Der Auslöser startet zweimal** – Zapier sendet gelegentlich erneut, wenn seine Bestätigung verloren ging. Verwenden Sie bei Bedarf für eine strikte Deduplizierung einen Schritt „Filter von Zapier“ auf eine eindeutige ID (z. B. die `id` der Person).

## Siehe auch {#see-also}

- [Make](./make.md) – dasselbe Muster auf einer anderen Plattform
- [Slack & Discord](./slack-discord.md) – einfachere Chat-Benachrichtigungen ohne Zapier
- [Webhooks (Entwickler-Referenz)](/docs/developer/api/webhooks)
