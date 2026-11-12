---
title: "Slack & Discord"
description: "Senden Sie Ereignisse aus B1 Admin wie neue Personen, Spenden und Formular-Einsendungen mit einem eingehenden Webhook in einen Slack- oder Discord-Kanal – ohne Zapier."
---

# Slack & Discord

<div class="article-intro">

Senden Sie lesbare Benachrichtigungen aus B1 direkt in einen Slack- oder Discord-Kanal – neue Personen, Spenden, Anmeldungen zu Gruppen, Formular-Einsendungen, Kalenderereignisse und mehr. Kein Konto eines Drittanbieters, kein Zap, der gepflegt werden muss: B1 formatiert die Ereignisse in Chat-Nachrichten um und sendet sie selbst an die Webhook-URL des Kanals.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Berechtigung **Einstellungen bearbeiten** in B1Admin
- Eine Administration in Ihrem Slack-Arbeitsbereich oder Discord-Server, die den eingehenden Webhook für den Kanal erstellen kann
- Entscheiden Sie, in welchem Kanal Sie Benachrichtigungen möchten (Sie können für mehrere Ereignistypen denselben Kanal verwenden oder sie auf verschiedene Kanäle verteilen)

</div>

## So funktioniert es {#how-it-works}

B1 hat einen eingebauten **Connector-Typ** für Chat-Plattformen. Wenn Sie einen Webhook mit dem Typ **Slack** oder **Discord** anlegen, führt die Webhook-Engine weiterhin ihre übliche Zustellung, Wiederholung und signierte Header durch. Der gesendete Inhalt wird jedoch von B1s üblichem `{event,churchId,data}`-Umschlag in die kleine Nachricht `{text}` (Slack) bzw. `{content}` (Discord) umgeformt, die diese Dienste erwarten.

Außer dem bestehenden ausgehenden Webhook-Ablauf nimmt kein B1-Server pro Gemeinde Kontakt zu Slack auf. Es gibt nichts Neues zu hosten und nichts Zusätzliches zu bezahlen.

## Slack – Schritt für Schritt {#slack--step-by-step}

### 1. Eine eingehende Webhook-URL für Slack holen {#1-get-a-slack-incoming-webhook-url}

1. Öffnen Sie [api.slack.com/apps](https://api.slack.com/apps) im Slack-Arbeitsbereich, in dem Sie Benachrichtigungen möchten.
2. Klicken Sie auf **Create New App → From scratch**, benennen Sie die App etwa „B1 Notifications“ und wählen Sie den Arbeitsbereich.
3. Wählen Sie in der linken Navigation **Incoming Webhooks** und setzen Sie **Activate Incoming Webhooks** auf *On*.
4. Klicken Sie auf **Add New Webhook to Workspace**, wählen Sie den Kanal (z. B. `#donations`) und dann **Allow**.
5. Slack bringt Sie zurück zur Seite mit einer neuen **Webhook URL**, die etwa so aussieht: `https://hooks.slack.com/services/T0XXXXXXX/B0YYYYYYY/zzz…`. Kopieren Sie sie – das ist die einzige Information, die B1 benötigt.

:::caution
Behandeln Sie die Slack-Webhook-URL wie ein Geheimnis. Wer sie besitzt, kann beliebige Nachrichten in den Kanal senden. Falls sie versehentlich offengelegt wurde, erzeugen Sie sie auf der Slack-App-Seite neu (dabei wird nur die URL rotiert; aktualisieren Sie B1 entsprechend).
:::

### 2. In B1Admin verbinden {#2-connect-it-in-b1admin}

1. Gehen Sie in B1Admin zu **Einstellungen → Entwickler → Webhooks**.
2. Klicken Sie auf **Neuer Webhook**.
3. Füllen Sie aus:
   - **Name** – etwas Lesbares wie „Spenden → #donations“. Nur Ihr Team sieht ihn.
   - **Connector-Typ** – wählen Sie **Slack**.
   - **Payload-URL** – fügen Sie die Slack-URL aus Schritt 1 ein.
   - **Ereignisse** – markieren Sie die Ereignisse, die als Nachrichten erscheinen sollen. Für einen Spenden-Kanal genügt `donation.created`. Für einen #people-Kanal probieren Sie `person.created` und `group.member.added`.
4. Klicken Sie auf **Speichern**. Es erscheint ein Dialog „Signing Secret“ – für Slack können Sie ihn ignorieren (Slack prüft keine B1-Signaturen) und schließen.

### 3. Testen {#3-test-it}

Öffnen Sie den Webhook in der Liste erneut und klicken Sie auf **Testereignis senden**. B1 sendet ein Beispiel für das erste markierte Ereignis. Innerhalb von ein bis zwei Sekunden erscheint eine Nachricht wie

> 💝 New donation: $50.00

in Ihrem Slack-Kanal, und im Bereich **Letzte Zustellungen** auf derselben Seite erscheint eine neue Zeile mit dem Status `succeeded`. Fertig.

## Discord – Schritt für Schritt {#discord--step-by-step}

### 1. Eine Discord-Webhook-URL holen {#1-get-a-discord-webhook-url}

1. Bewegen Sie in Ihrem Discord-Server den Mauszeiger über den Kanal, in dem Sie Benachrichtigungen möchten, und klicken Sie auf das **⚙-Zahnrad** (Kanal bearbeiten).
2. Öffnen Sie **Integrationen → Webhooks → Neuer Webhook**.
3. Geben Sie ihm einen Namen und (optional) ein Profilbild und klicken Sie dann auf **Webhook-URL kopieren** – sie sieht etwa so aus: `https://discord.com/api/webhooks/123…/abc…`.

### 2. In B1Admin verbinden {#2-connect-it-in-b1admin-1}

Genau wie beim Slack-Ablauf oben, nur setzen Sie den **Connector-Typ** auf **Discord**. Fügen Sie die Discord-URL in **Payload-URL** ein und speichern Sie.

:::tip
Sie müssen **nicht** `/slack` an das Ende der Discord-URL anhängen – B1 sendet Discord-eigene `{content}`-Nutzdaten, keine mit Slack kompatiblen. Fügen Sie einfach die URL ein, die Discord Ihnen gegeben hat.
:::

### 3. Testen {#3-test-it-1}

Dieselbe Schaltfläche **Testereignis senden** – Discord zeigt die Nachricht im gewählten Kanal an, und das Zustellprotokoll wechselt auf `succeeded`.

## So sehen die Nachrichten aus {#what-the-messages-look-like}

| Ereignis | Beispielnachricht |
|---|---|
| `person.created` | 👤 New person added: Jordan Rivera |
| `person.updated` | 👤 Person updated: Jordan Rivera |
| `group.created` | 👥 New group created: Tuesday Bible Study |
| `group.member.added` | ➕ Someone was added to a group |
| `donation.created` | 💝 New donation: $50.00 |
| `donation.updated` | 💝 Donation updated: $75.00 |
| `attendance.recorded` | ✅ Attendance recorded |
| `form.submission.created` | 📝 New form submission received |
| `event.created` | 📅 New event: Easter Service |

Die vollständige Liste finden Sie im [Katalog der Webhook-Ereignisse](/docs/developer/api/webhooks#event-catalog) – jedes dort aufgeführte Ereignis kann an Slack/Discord gesendet werden.

## Ein Kanal pro Thema {#one-channel-per-topic}

Sie müssen nicht alle Ereignisse an einem einzigen Ort sammeln. Die meisten Gemeinden richten einige wenige Webhooks ein:

- Ein Kanal **#donations**, der nur auf `donation.created` hört
- Ein Kanal **#new-people** für `person.created` und `group.member.added`
- Ein Kanal **#admin-alerts** für Ereignisse mit geringem Aufkommen wie `form.submission.created`

Die Anzahl der Webhooks pro Gemeinde ist unbegrenzt. Jeder ist unabhängig – das Löschen oder Deaktivieren eines Webhooks wirkt sich nicht auf die anderen aus.

## Zustellungen prüfen {#inspecting-deliveries}

Die Tabelle **Letzte Zustellungen** im Webhook-Editor zeigt die letzten 50 Versuche. Klicken Sie auf eine Zeile, um die genau gesendete Nutzlast und die zurückgekommene Antwort zu sehen. Bei einem Slack-Connector lautet die Nutzlast `{"text":"💝 New donation: $50.00"}` – nicht der rohe Umschlag `{event,churchId,...}`, weil B1 sie vor der Zustellung umformt.

Ist etwas fehlgeschlagen (ein gelbes Abzeichen `failed`, während B1 noch wiederholt, oder ein rotes Abzeichen `exhausted`, sobald B1 aufgegeben hat), zeigt die Spalte **Antwort** den HTTP-Status, und der Dialog der Zeile zeigt den Antworttext. So sehen Sie genau, was Slack oder Discord nicht akzeptiert hat – meist ein Kopierfehler in der URL. Klicken Sie auf **Erneut zustellen**, um diese Zustellung noch einmal zu senden.

## Fehlerbehebung {#troubleshooting}

- **Keine Nachricht erscheint, und der Zustellstatus ist `400`** – meist ist der Connector-Typ auf **Standard** gesetzt, die URL ist aber eine Slack- oder Discord-URL. Slack und Discord weisen den rohen Umschlag ab. Stellen Sie das Dropdown auf **Slack** oder **Discord** um und senden Sie den Test erneut.
- **Webhook automatisch deaktiviert** – B1 wiederholt jede fehlgeschlagene Zustellung etwa fünf Tage lang. Sind drei Zustellungen hintereinander ohne weitere Wiederholungen ausgeschöpft, schaltet B1 den Webhook ab (sein Status lautet dann **Deaktiviert**). Korrigieren Sie die URL (oder rotieren Sie sie in Slack/Discord), aktivieren Sie **Aktiv** wieder und speichern Sie.
- **Nachricht kam an, enthält aber nicht alle Details** – jede Chat-Plattform begrenzt die Nachrichtengröße. Die Nachrichten von B1 sind absichtlich einzeilig; für reichhaltigere Benachrichtigungen verwenden Sie [Zapier](./zapier.md) oder [Make](./make.md), um über deren Slack-Aktionen eine umfangreichere Slack-Nachricht zu verfassen.

## Connector-Typ später ändern {#switching-connector-types-later}

Sie können den Connector-Typ eines bestehenden Webhooks ändern – die Änderung gilt ab der nächsten Zustellung. Wenn Sie von Slack auf Standard umstellen, richten Sie die URL auf Ihren eigenen HTTPS-Endpunkt; dasselbe Signing Secret (es wurde beim Erstellen des Webhooks ausgestellt) kann dann für den rohen Umschlag verifiziert werden.

## Siehe auch {#see-also}

- [Zapier](./zapier.md) – für mehrstufige Abläufe, die von B1-Ereignissen ausgelöst werden
- [Make](./make.md) – visueller Szenario-Editor
- [Webhooks (Entwickler-Referenz)](/docs/developer/api/webhooks) – das vollständige Format von Nutzlast und Signatur, falls Sie einen Webhook einmal auf Ihren eigenen Server richten
