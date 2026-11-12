---
title: "Integrationen"
description: "Verbinden Sie B1 Admin mit Slack, Discord, Zapier, Make, Google Tabellen und KI-Assistenten wie Claude, mit Einrichtungsschritten und den API-Schlüssel-Berechtigungen, die jede Integration benötigt."
---

# Integrationen

<div class="article-intro">

B1 lässt sich mit den Werkzeugen verbinden, die Ihr Team bereits nutzt. Verbinden Sie Slack oder Discord für Benachrichtigungen an Mitarbeitende, automatisieren Sie Abläufe in Zapier oder Make oder exportieren Sie Daten bei Bedarf nach Google Tabellen – ohne eine eigene Integrationsplattform zu bezahlen und ohne dass ChurchApps zusätzliche Dienste hostet. Jede Integration läuft auf der Infrastruktur des jeweiligen Drittanbieters und spricht über die Webhooks oder die REST-API von B1 mit Ihrer Gemeinde.

</div>

## Was verfügbar ist {#whats-available}

| Integration | Was sie tut | Richtung | Aufwand für die Einrichtung |
|---|---|---|---|
| **[Slack](./slack-discord.md)** | Sendet lesbare Benachrichtigungen (neue Personen, Spenden, Anmeldungen, …) an einen Slack-Kanal | B1 → Slack | 2 Minuten |
| **[Discord](./slack-discord.md)** | Dasselbe, in einen Discord-Kanal | B1 → Discord | 2 Minuten |
| **[Zapier](./zapier.md)** | Nutzt B1-Ereignisse als Auslöser und B1-Aktionen in jeder der über 7.000 Apps von Zapier (wartet auf die Freigabe durch Zapier) | Beides | 5–10 Min. pro Zap |
| **[Make](./make.md)** | Dieselbe Idee wie bei Zapier, im visuellen Szenario-Editor von Make (noch nicht veröffentlicht) | Beides | 5–10 Min. pro Szenario |
| **[Google Tabellen](./google-sheets.md)** | Exportiert Personen / Spenden / Gruppen / Anwesenheit bei Bedarf in eine Tabelle (noch nicht veröffentlicht) | B1 → Tabelle | 5 Minuten |
| **[Claude](./claude.md)** | Stellen Sie Anthropics Claude Fragen zu den Daten Ihrer Gemeinde, beschränkt auf Ihre Berechtigungen – zum Ausprobieren kostenlos, empfohlen | Beides | Unter 3 Minuten |
| **[ChatGPT](./chatgpt.md)** | Dieselbe Idee mit ChatGPT von OpenAI (benötigt ein kostenpflichtiges ChatGPT-Abo) | Beides | 10 Minuten |
| **[Mailchimp](./services/mailchimp.md)** | Hält eine Mailchimp-Zielgruppe mit Ihren Personen, Gruppen und gespeicherten Listen synchron – in B1 integriert | B1 → Mailchimp | 5 Minuten |
| **[Verbundene Dienste](./services/index.md)** | Ausgewählte Anleitungen für Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr | Unterschiedlich | je 5–10 Min. |

## So wählen Sie aus {#how-to-pick}

- **Sie möchten nur eine Benachrichtigung im Chat?** Verwenden Sie **Slack** oder **Discord** – kein Konto eines Drittanbieters, kein Zap, der gepflegt werden muss. Die Einrichtung erfolgt vollständig in B1Admin.
- **Sie möchten etwas über mehrere Apps hinweg automatisieren** (z. B. „Wenn jemand spendet, ihn zu meiner Mailchimp-Liste hinzufügen und in Slack #spenden posten“)? Verwenden Sie **Zapier** oder **Make**. Zapier ist einsteigerfreundlicher; Make ist im großen Maßstab günstiger und bietet flexiblere Logik.
- **Sie benötigen einen einmaligen Datenexport oder einen geplanten Bericht?** Verwenden Sie **Google Tabellen** – fügen Sie einen API-Schlüssel in die Seitenleiste des Add-ons ein und klicken Sie auf Exportieren.
- **Sie möchten in einfacher Sprache Fragen stellen** („Wie viele Erstbesucher gab es letzten Sonntag?“, „Fasse die Spenden dieses Monats zusammen“)? Beginnen Sie mit **[Claude](./claude.md)** – es ist zum Ausprobieren kostenlos und in weniger als 3 Minuten eingerichtet. **[ChatGPT](./chatgpt.md)** funktioniert mit einem kostenpflichtigen Abo ebenfalls. Claude verbindet sich, indem Sie sich mit Ihrem B1-Konto anmelden; ChatGPT verwendet einen B1-API-Schlüssel.
- **Sie bauen eine eigene Integration?** Nichts davon passt – sprechen Sie die [REST-API](/docs/developer/api) direkt mit einem [API-Schlüssel](/docs/developer/api/api-keys) an oder abonnieren Sie einen Server, den Sie kontrollieren, für [Webhooks](/docs/developer/api/webhooks).

## Was sie gemeinsam haben {#what-they-have-in-common}

Alles wird in B1Admin unter **Einstellungen → Entwickler** eingerichtet. Dort gibt es drei Reiter: **API-Schlüssel**, **Webhooks** und **Verbundene Apps**.

- **Slack, Discord und Mailchimp** sind Webhooks, die Sie selbst auf dem Reiter **Webhooks** anlegen (wählen Sie den passenden **Connector-Typ**). Sie benötigen keinen API-Schlüssel.
- **Claude** (Anmeldung mit Ihrem B1-Konto) erscheint auf dem Reiter **Verbundene Apps**, wo Sie es widerrufen können.
- **Zapier, Make, Google Tabellen, ChatGPT und Claude mit Schlüssel** authentifizieren sich mit einem **B1-API-Schlüssel**, der auf dem Reiter **API-Schlüssel** erstellt wird. Der Schlüssel:

  - Ist an die Person gebunden, die ihn erstellt hat, und übernimmt deren Berechtigungen
  - Kann mit **Berechtigungen** (Scopes) eingeschränkt werden – ein Google-Tabellen-Export benötigt zum Beispiel nur `people:read`, nicht `settings:write`
  - Kann jederzeit gelöscht werden; der Zugriff der Integration endet sofort, ohne dass andere Funktionen beeinträchtigt werden

Einige Connectoren (Zapier, Make) registrieren außerdem im Namen Ihrer Gemeinde einen [Webhook](/docs/developer/api/webhooks), sobald der Zap bzw. das Szenario eingeschaltet wird, und entfernen ihn, wenn Sie den Zap ausschalten – Sie verwalten die Webhook-URL nicht selbst.

:::tip
Damit Zapier und Make Webhooks automatisch registrieren können, benötigt der API-Schlüssel die Berechtigung **`settings:write`** (zusammen mit den Ressourcen-Berechtigungen für alles, was die Integration berührt). Ein Schlüssel nur mit Leserechten funktioniert für Aktionen und Exporte, aber nicht für Auslöser.
:::

## Kosten {#cost}

ChurchApps ist kostenlos und Open Source. Slack/Discord, das [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) sowie die offiziellen Connectoren für Zapier / Make / Google Tabellen sind von unserer Seite ebenfalls kostenlos. Die Drittanbieter können für ihre eigenen Plattformen Gebühren erheben (Zapier und Make bieten beide großzügige kostenlose Tarife; Slack, Discord und Google Tabellen sind für diesen Zweck kostenlos).

## Eigene Lösungen entwickeln {#building-your-own}

Passt keine der oben genannten Optionen, ist jede Schnittstelle von B1 offen:

- **[REST-API](/docs/developer/api)** – rufen Sie B1 aus jeder Sprache mit einem Header `Authorization: Bearer cak_…` auf
- **[Webhooks](/docs/developer/api/webhooks)** – abonnieren Sie einen öffentlichen HTTPS-Endpunkt für einen oder mehrere Ereignistypen und erhalten Sie signierte JSON-Nutzdaten
- **[OAuth + Verbundene Apps](/docs/developer/api/connected-apps)** – wenn Sie ein SaaS-Produkt entwickeln, das von vielen Gemeinden genutzt wird

## Nächste Schritte {#next-steps}

- [Slack & Discord](./slack-discord.md) – Chat-Benachrichtigungen senden
- [Zapier](./zapier.md) – Verbindung zu über 7.000 Apps
- [Make](./make.md) – visuelle Workflow-Automatisierung
- [Google Tabellen](./google-sheets.md) – Export in Tabellen
- [Claude](./claude.md) – Anthropics Claude nach den Daten Ihrer Gemeinde fragen
- [ChatGPT](./chatgpt.md) – OpenAIs ChatGPT nach den Daten Ihrer Gemeinde fragen
- [Verbundene Dienste](./services/index.md) – Anleitungen je Dienst (Mailchimp, Donorbox, Clearstream, …)
