---
title: "Slack & Discord"
---

# Slack & Discord

<div class="article-intro">

Posten Sie lesbare Benachrichtigungen von B1 direkt in einen Slack- oder Discord-Kanal – neue Personen, Spenden, Gruppenmeldungen, Formular-Einsendungen, Ereignisse im Kalender und mehr. Kein Drittanbieter-Konto, kein Zap zum Warten: B1 gestaltet Ereignisse in Chat-Nachrichten um und POSTs sie an die Webhook-URL des Kanals selbst.

</div>

<div class="prereqs">
<h4>Bevor Sie Beginnen</h4>

- Sie benötigen die Berechtigung **Einstellungen bearbeiten** in B1Admin
- Ein Admin in Ihrem Slack-Workspace oder Discord-Server zum Erstellen des Eingehenden Webhooks des Kanals
- Entscheiden Sie, in welchen Kanal Sie Benachrichtigungen haben möchten (Sie können denselben Kanal für mehrere Ereignistypen verwenden oder sie über Kanäle aufteilen)

</div>

## Wie es funktioniert

B1 hat einen integrierten **Connector Type** für Chat-Plattformen. Wenn Sie einen Webhook mit Typ **Slack** oder **Discord** erstellen, führt das Webhook-Engine immer noch seine übliche Lieferungs- + Wiederholungs- + signierter Header-Tanz durch, aber der Body, den er sendet, wird von B1s normaler `{event,churchId,data}` Hülle in die kleine `{text}` (Slack) oder `{content}` (Discord) Nachricht umgeformt, die diese Services erwarten.

Keine B1-Server wenden sich an Slack auf einer Pro-Gemeinde-Basis außer dem bestehenden ausgehenden Webhook-Flow – es gibt nichts Neues zum Hosten, nichts Zusätzliches zum Bezahlen.

## Slack — Schritt für Schritt

### 1. Erhalten Sie eine Slack Incoming Webhook URL

1. Öffnen Sie [api.slack.com/apps](https://api.slack.com/apps) im Slack-Workspace, in den Sie Benachrichtigungen haben möchten.
2. Klicken Sie auf **Create New App → From scratch**, geben Sie ihm einen Namen wie „B1 Notifications" und wählen Sie den Workspace.
3. Wählen Sie in der linken Navigation **Incoming Webhooks** und schalten Sie **Activate Incoming Webhooks** auf *On*.
4. Klicken Sie auf **Add New Webhook to Workspace**, wählen Sie den Kanal (z.B. `#donations`), dann **Allow**.
5. Slack bringt Sie auf die Seite mit einer neuen **Webhook URL** zurück, die wie `https://hooks.slack.com/services/T0XXXXXXX/B0YYYYYYY/zzz…` aussieht. Kopieren Sie es – das ist das einzige Stück Informationen, das B1 benötigt.

:::caution
Behandeln Sie die Slack Webhook URL als Geheimnis. Jeder mit ihr kann beliebige Nachrichten in den Kanal posten. Wenn Sie sie versehentlich offenlegen, generieren Sie sie aus der Slack App-Seite neu (erneutes Generieren rotiert nur die URL; aktualisieren Sie B1, um abzustimmen).
:::

### 2. Verbinden Sie sie in B1Admin

1. Gehen Sie in B1Admin zu **Einstellungen → Entwickler → Webhooks**.
2. Klicken Sie auf **Neuer Webhook**.
3. Füllen Sie aus:
   - **Name** – etwas Lesbares wie „Donations → #donations". Nur Ihr Team sieht es.
   - **Connector Type** – wählen Sie **Slack**.
   - **Payload URL** – fügen Sie die Slack URL aus Schritt 1 ein.
   - **Events** – Häkchen für die Ereignisse, die Sie als Nachrichten möchten. Für einen Spenden-Kanal, nur `donation.created`. Für einen #people-Kanal, versuchen Sie `person.created` und `group.member.added`.
4. Klicken Sie auf **Speichern**. Ein „Signing Secret"-Dialog erscheint – Sie können ihn für Slack (Slack überprüft keine B1-Signaturen) ignorieren und schließen.

### 3. Testen Sie es

Öffnen Sie den Webhook aus der Liste erneut und klicken Sie auf **Test Event senden**. Innerhalb von ein oder zwei Sekunden erscheint eine Nachricht wie

> 💝 Neue Spende: $50,00

erscheint in Ihrem Slack-Kanal und eine neue Reihe erscheint in der **Recent Deliveries** Tabelle auf dem gleichen Bildschirm mit Status `succeeded`. Sie sind fertig.

## Discord — Schritt für Schritt

### 1. Erhalten Sie eine Discord Webhook URL

1. Hovern Sie in Ihrem Discord-Server über den Kanal, in den Sie Benachrichtigungen haben möchten und klicken Sie auf das **⚙ Zahnrad** (Edit Channel).
2. Öffnen Sie **Integrations → Webhooks → New Webhook**.
3. Geben Sie ihm einen Namen und (optional) einen Avatar, klicken Sie dann auf **Copy Webhook URL** – sieht aus wie `https://discord.com/api/webhooks/123…/abc…`.

### 2. Verbinden Sie sie in B1Admin

Identisch zum Slack-Flow oben, außer setzen Sie **Connector Type** auf **Discord**. Fügen Sie die Discord URL in **Payload URL** ein und speichern Sie.

:::tip
Sie müssen **nicht** `/slack` ans Ende der Discord URL hinzufügen – B1 sendet Discord-native `{content}` Payloads, nicht Slack-kompatible. Fügen Sie einfach die URL ein, die Discord Ihnen gegeben hat.
:::

### 3. Testen Sie es

Gleiche **Test Event senden** Schaltfläche – Discord zeigt die Nachricht im gewählten Kanal und das Lieferungsprotokoll wird zu `succeeded`.

## Wie die Nachrichten aussehen

| Ereignis | Beispiel-Nachricht |
|---|---|
| `person.created` | 👤 Neue Person hinzugefügt: Jordan Rivera |
| `person.updated` | 👤 Person aktualisiert: Jordan Rivera |
| `group.created` | 👥 Neue Gruppe erstellt: Tuesday Bible Study |
| `group.member.added` | ➕ Jemand wurde zu einer Gruppe hinzugefügt |
| `donation.created` | 💝 Neue Spende: $50,00 |
| `donation.updated` | 💝 Spende aktualisiert: $75,00 |
| `attendance.recorded` | ✅ Anwesenheit zeichnet |
| `form.submission.created` | 📝 Neue Formular-Einsendung erhalten |
| `event.created` | 📅 Neues Ereignis: Easter Service |

Die vollständige Liste lebt im [Webhook-Ereigniskatalog](/docs/developer/api/webhooks#event-catalog) – jedes Ereignis dort kann zu Slack/Discord geroutet werden.

## Ein Kanal pro Thema

Sie müssen nicht jedes Ereignis an einem Ort einordnen. Die meisten Gemeinden richten ein paar Webhooks ein:

- Ein **#donations** Kanal, der nur auf `donation.created` hört
- Ein **#new-people** Kanal für `person.created` und `group.member.added`
- Ein **#admin-alerts** Kanal für Low-Volume-Dinge wie `form.submission.created`

Es gibt keine Grenze für die Anzahl der Webhooks pro Gemeinde. Jeder ist unabhängig – das Löschen oder Deaktivieren eines beeinflusst die anderen nicht.

## Inspektionsvorgänge

Die **Recent Deliveries** Tabelle des Webhook-Editors zeigt die letzten 50 Versuche. Klicken Sie auf eine Reihe, um die genaue Payload, die gesendet wurde, und die Antwort, die zurückkam, zu sehen. Für einen Slack-Connector ist die Payload `{"text":"💝 Neue Spende: $50,00"}` – nicht die rohe `{event,churchId,...}` Hülle – weil B1 sie vor der Lieferung umgestaltet.

Wenn etwas fehlgeschlagen ist (roter `failed` oder `exhausted` Badge), zeigt der Dialog den HTTP-Status und den Response-Body, damit Sie genau sehen, was Slack oder Discord nicht mochte – normalerweise ein Copy-Paste-Fehler in der URL.

## Fehlerbehebung

- **Keine Nachricht erscheint + Lieferungsstatus `400`** – normalerweise ist der Connector Type auf **Standard** gesetzt, aber die URL ist eine Slack/Discord. Slack/Discord lehnen die rohe Hülle ab. Schalten Sie die Dropdown auf **Slack** oder **Discord** und senden Sie den Test erneut.
- **Webhook auto-deaktiviert** – nach 3 aufeinanderfolgenden fehlgeschlagenen Lieferungen schaltet B1 den Webhook aus. Reparieren Sie die URL (oder rotieren Sie sie in Slack/Discord) und schalten Sie **Aktiv** zurück.
- **Nachricht kam an, ist aber fehlende Details** – jede Chat-Plattform begrenzt die Nachrichtengröße. B1s Nachrichten sind standardmäßig einzeilig; für reichhaltigere Benachrichtigungen verwenden Sie [Zapier](./zapier) oder [Make](./make), um eine vollere Slack-Nachricht über ihre Slack-Aktionen zu verfassen.

## Wechseln Sie Connector Types Später

Sie können den Connector Type auf einem bestehenden Webhook ändern – er wird bei der nächsten Lieferung wirksam. Wenn Sie von Slack zu Standard wechseln, zeigen Sie die URL zu Ihrem eigenen HTTPS-Endpoint und das gleiche Signing Secret (es wurde bei der Webhook-Erstellung ausgestellt) wird bei der rohen Hülle überprüfbar.

## Siehe auch

- [Zapier](./zapier) – für Multi-Schritt-Workflows, ausgelöst von B1-Ereignissen
- [Make](./make) – visueller Szenario-Builder
- [Webhooks (Entwickler-Referenz)](/docs/developer/api/webhooks) – das vollständige Payload + Signaturformat, wenn Sie jemals einen Webhook auf Ihren eigenen Server zeigen
