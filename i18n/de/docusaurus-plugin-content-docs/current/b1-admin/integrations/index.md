---
title: "Integrationen"
---

# Integrationen

<div class="article-intro">

B1 verbindet sich mit den Tools, die Ihr Team bereits verwendet. Verbinden Sie Slack oder Discord für Personalbenachrichtigungen, automatisieren Sie Workflows in Zapier oder Make, oder exportieren Sie Daten auf Abruf nach Google Sheets – ohne für eine separate Integrationsplattform zu zahlen und ohne dass ChurchApps etwas Zusätzliches hosten muss. Jede Integration läuft auf der Infrastruktur des Drittanbieters und spricht mit Ihrer Gemeinde über B1s Webhooks oder REST API.

</div>

## Was verfügbar ist

| Integration | Was es tut | Richtung | Aufwand zum Einrichten |
|---|---|---|---|
| **[Slack](./slack-discord)** | Posten Sie lesbare Benachrichtigungen (neue Personen, Spenden, Anmeldungen, …) in einen Slack-Kanal | B1 → Slack | 2 Minuten |
| **[Discord](./slack-discord)** | Dasselbe, in einem Discord-Kanal | B1 → Discord | 2 Minuten |
| **[Zapier](./zapier)** | Verwenden Sie B1-Ereignisse als Auslöser und B1-Aktionen in Zapiers 7.000+ Apps | Beide | 5–10 Min pro Zap |
| **[Make](./make)** | Gleiche Idee wie Zapier, im visuellen Szenario-Builder von Make | Beide | 5–10 Min pro Szenario |
| **[Google Sheets](./google-sheets)** | Exportieren Sie Personen / Spenden / Gruppen / Anwesenheit auf Abruf nach einer Tabelle | B1 → Sheet | 5 Minuten |
| **[Claude](./claude)** | Fragen Sie Anthropics Claude Fragen zu Ihren Gemeindedaten, gescoped auf Ihre Berechtigungen | Beide | 5 Minuten |
| **[ChatGPT](./chatgpt)** | Gleiche Idee mit OpenAIs ChatGPT, über ein benutzerdefiniertes GPT oder MCP-bewusstes OpenAI-Tooling | Beide | 10 Minuten |
| **[Verbundene Services](./services/)** | Kuratierte Rezepte für Mailchimp, Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr | Variiert | 5–10 Min je |

## Wie Sie wählen

- **Möchten Sie nur eine Benachrichtigung in Chat?** Verwenden Sie **Slack** oder **Discord** – kein Drittanbieter-Konto, kein Zap zum Warten. Vollständig konfiguriert innerhalb von B1Admin.
- **Möchten Sie etwas über Apps automatisieren** (z.B. „Wenn jemand gibt, fügen Sie ihn zu meiner Mailchimp-Liste und Slack #donations hinzu")? Verwenden Sie **Zapier** oder **Make**. Zapier ist benutzerfreundlicher; Make ist billiger im großen Maßstab und hat flexiblere Logik.
- **Benötigen Sie einen einmaligen Datenabruf oder einen geplanten Bericht?** Verwenden Sie **Google Sheets** – fügen Sie einen API-Schlüssel in die Seitenleiste des Add-ons ein und klicken Sie auf Export.
- **Möchten Sie Fragen in einfachem Englisch stellen** („Wie viele Erstbesucher am letzten Sonntag?", „Fassen Sie die Spenden diesen Monat zusammen")? Verwenden Sie **[Claude](./claude)** oder **[ChatGPT](./chatgpt)** – beide verbinden sich mit B1 mit einem einzigen API-Schlüssel.
- **Erstellen Sie Ihre eigene benutzerdefinierte Integration?** Nichts von oben – sprechen Sie direkt mit der [REST API](/docs/developer/api) mit einem [API-Schlüssel](/docs/developer/api/api-keys) oder abonnieren Sie einen Server, den Sie mit [Webhooks](/docs/developer/api/webhooks) steuern.

## Was sie gemeinsam haben

Jede Integration authentifiziert sich mit einem **B1 API-Schlüssel**, der unter **Einstellungen → Entwickler → API-Schlüssel** in B1Admin erstellt wird. Der Schlüssel:

- Ist an eine bestimmte Person in Ihrer Gemeinde gebunden und erbt die Berechtigungen dieser Person
- Kann mit **Geltungsbereichen** eingegrenzt werden – zum Beispiel benötigt ein Google Sheets-Export nur `people:read`, nicht `settings:write`
- Kann jederzeit widerrufen werden, was den Zugriff der Integration sofort ohne Auswirkung auf etwas anderes unterbricht

Einige wenige Connectors (Zapier, Make) registrieren auch einen [Webhook](/docs/developer/api/webhooks) in Ihrem Namen, wenn der Zap oder das Szenario eingeschaltet wird, und entfernen ihn, wenn Sie ihn ausschalten – Sie verwalten die Webhook-URL selbst nicht.

:::tip
Damit Zapier und Make Webhooks automatisch registrieren, benötigt der API-Schlüssel den Geltungsbereich **`settings:write`** (plus die Ressourcen-Geltungsbereiche für alles, das die Integration berührt). Ein schreibgeschützter Schlüssel funktioniert für Aktionen und Exporte, aber nicht für Auslöser.
:::

## Kosten

ChurchApps ist kostenlos und Open-Source. Slack/Discord, das [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) und die offiziellen Zapier- / Make- / Google Sheets-Connectors sind auch von unserer Seite kostenlos. Die Drittanbieter können für ihre eigenen Plattformen bezahlen (Zapier und Make haben großzügige kostenlose Tiers; Slack, Discord und Google Sheets sind für diesen Zweck kostenlos).

## Erstellen Sie Ihre Eigene

Wenn keiner der obigen passt, ist jede B1-Oberfläche offen:

- **[REST API](/docs/developer/api)** – Rufen Sie B1 aus jeder Sprache mit einem `Authorization: Bearer cak_…`-Header auf
- **[Webhooks](/docs/developer/api/webhooks)** – Abonnieren Sie einen öffentlichen HTTPS-Endpoint für ein oder mehrere Ereignistypen und erhalten Sie signierte JSON-Payloads
- **[OAuth + Verbundene Apps](/docs/developer/api/connected-apps)** – wenn Sie ein SaaS-Produkt erstellen, das von vielen Gemeinden verwendet wird

## Nächste Schritte

- [Slack & Discord](./slack-discord) – Post-Chat-Benachrichtigungen
- [Zapier](./zapier) – Verbindung zu 7.000+ Apps
- [Make](./make) – visuelle Workflow-Automatisierung
- [Google Sheets](./google-sheets) – in Tabellen exportieren
- [Claude](./claude) – Fragen Sie Anthropics Claude über Ihre Gemeindedaten
- [ChatGPT](./chatgpt) – Fragen Sie OpenAIs ChatGPT über Ihre Gemeindedaten
- [Verbundene Services](./services/) – pro-Service-Rezepte (Mailchimp, Donorbox, Clearstream, …)
