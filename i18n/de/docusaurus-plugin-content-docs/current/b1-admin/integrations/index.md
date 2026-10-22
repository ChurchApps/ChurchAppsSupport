---
title: "Integrationen"
---

# Integrationen

<div class="article-intro">

B1 arbeitet mit den Werkzeugen zusammen, die Ihr Team bereits nutzt. Verbinden Sie Slack oder Discord für Benachrichtigungen an das Personal, automatisieren Sie Abläufe mit Zapier oder Make oder exportieren Sie Daten bei Bedarf nach Google Tabellen – ohne eine separate Integrationsplattform bezahlen zu müssen und ohne dass ChurchApps zusätzliche Dienste hostet. Jede Integration läuft auf der Infrastruktur des jeweiligen Drittanbieters und kommuniziert mit Ihrer Kirche über die Webhooks oder die REST-API von B1.

</div>

## Was verfügbar ist

| Integration | Was sie tut | Richtung | Aufwand für die Einrichtung |
|---|---|---|---|
| **[Slack](./slack-discord)** | Lesbare Benachrichtigungen (neue Personen, Spenden, Anmeldungen …) in einen Slack-Kanal senden | B1 → Slack | 2 Minuten |
| **[Discord](./slack-discord)** | Dasselbe, in einen Discord-Kanal | B1 → Discord | 2 Minuten |
| **[Zapier](./zapier)** | B1-Ereignisse als Auslöser und B1-Aktionen in jeder der über 7.000 Apps von Zapier nutzen | Beides | 5–10 Min. pro Zap |
| **[Make](./make)** | Dieselbe Idee wie bei Zapier, im visuellen Szenario-Editor von Make | Beides | 5–10 Min. pro Szenario |
| **[Google Tabellen](./google-sheets)** | Personen, Spenden, Gruppen und Anwesenheit bei Bedarf in eine Tabelle exportieren | B1 → Tabelle | 5 Minuten |
| **[Claude](./claude)** | Fragen zu den Daten Ihrer Kirche an Claude von Anthropic stellen, beschränkt auf Ihre Berechtigungen | Beides | 5 Minuten |
| **[ChatGPT](./chatgpt)** | Dasselbe Prinzip mit ChatGPT von OpenAI, über einen Custom GPT oder MCP-fähige Tools von OpenAI | Beides | 10 Minuten |
| **[Verbundene Dienste](./services/)** | Fertige Anleitungen für Mailchimp, Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr | Unterschiedlich | je 5–10 Min. |

## Die Auswahl treffen

- **Sie möchten nur eine Benachrichtigung im Chat?** Verwenden Sie **Slack** oder **Discord** – kein Konto bei einem Drittanbieter und kein Zap, den Sie pflegen müssen. Alles wird vollständig in B1 Admin konfiguriert.
- **Sie möchten etwas über mehrere Apps automatisieren?** (z. B. „Wenn jemand spendet, füge ihn meiner Mailchimp-Liste hinzu und schreibe in den Slack-Kanal #spenden“) Verwenden Sie **Zapier** oder **Make**. Zapier ist einsteigerfreundlicher; Make ist bei großem Umfang günstiger und bietet flexiblere Logik.
- **Sie benötigen einen einmaligen Datenabruf oder einen regelmäßigen Bericht?** Verwenden Sie **Google Tabellen** – fügen Sie einen API-Schlüssel in die Seitenleiste des Add-ons ein und klicken Sie auf Exportieren.
- **Sie möchten in Alltagssprache Fragen stellen** („Wie viele Erstbesucher gab es letzten Sonntag?“, „Fasse die Spenden dieses Monats zusammen“)? Verwenden Sie **[Claude](./claude)** oder **[ChatGPT](./chatgpt)**. Beide verbinden sich mit einem einzigen API-Schlüssel mit B1, und Claude kann sich außerdem über claude.ai durch Anmeldung bei B1 verbinden.
- **Sie bauen eine eigene Integration?** Keine der obigen Optionen passt – sprechen Sie die [REST-API](/docs/developer/api) direkt mit einem [API-Schlüssel](/docs/developer/api/api-keys) an oder abonnieren Sie einen Server, den Sie kontrollieren, für [Webhooks](/docs/developer/api/webhooks).

## Was sie gemeinsam haben

Jede Integration authentifiziert sich mit einem **API-Schlüssel von B1**, der in B1 Admin unter **Einstellungen → Entwickler → API-Schlüssel** erstellt wird. Der Schlüssel:

- ist an eine bestimmte Person in Ihrer Kirche gebunden und übernimmt deren Berechtigungen,
- kann durch **Scopes** eingeschränkt werden – ein Export nach Google Tabellen braucht zum Beispiel nur `people:read`, nicht `settings:write`,
- kann jederzeit widerrufen werden. Dadurch endet der Zugriff der Integration sofort, ohne dass andere Bereiche davon betroffen sind.

Einige Connectoren (Zapier, Make) registrieren außerdem einen [Webhook](/docs/developer/api/webhooks) in Ihrem Namen, sobald der Zap oder das Szenario eingeschaltet wird, und entfernen ihn wieder, wenn Sie den Zap ausschalten. Die Webhook-URL müssen Sie also nicht selbst verwalten.

:::tip
Damit Zapier und Make Webhooks automatisch registrieren können, benötigt der API-Schlüssel den Scope **`settings:write`** (zusätzlich die Ressourcen-Scopes für alles, worauf die Integration zugreift). Ein Schlüssel nur mit Leserechten funktioniert für Aktionen und Exporte, aber nicht für Auslöser.
:::

## Kosten

ChurchApps ist kostenlos und Open Source. Slack/Discord, das [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) sowie die offiziellen Connectoren für Zapier, Make und Google Tabellen sind von unserer Seite ebenfalls kostenlos. Die Drittanbieter können für ihre eigenen Plattformen Gebühren verlangen (Zapier und Make haben beide großzügige kostenlose Tarife; Slack, Discord und Google Tabellen sind für diesen Zweck kostenlos).

## Eigene Integrationen bauen

Falls keine der obigen Optionen passt, ist jede Schnittstelle von B1 offen:

- **[REST-API](/docs/developer/api)** – rufen Sie B1 aus jeder Sprache mit einem Header `Authorization: Bearer cak_…` auf
- **[Webhooks](/docs/developer/api/webhooks)** – abonnieren Sie einen öffentlichen HTTPS-Endpunkt für einen oder mehrere Ereignistypen und erhalten Sie signierte JSON-Nutzdaten
- **[OAuth + Verbundene Apps](/docs/developer/api/connected-apps)** – wenn Sie ein SaaS-Produkt entwickeln, das von vielen Kirchen genutzt wird

## Nächste Schritte

- [Slack & Discord](./slack-discord) – Chat-Benachrichtigungen versenden
- [Zapier](./zapier) – Verbindung zu über 7.000 Apps
- [Make](./make) – visuelle Workflow-Automatisierung
- [Google Tabellen](./google-sheets) – Export in Tabellen
- [Claude](./claude) – Fragen zu den Daten Ihrer Kirche an Anthropics Claude stellen
- [ChatGPT](./chatgpt) – Fragen zu den Daten Ihrer Kirche an OpenAIs ChatGPT stellen
- [Verbundene Dienste](./services/) – Anleitungen für einzelne Dienste (Mailchimp, Donorbox, Clearstream …)
