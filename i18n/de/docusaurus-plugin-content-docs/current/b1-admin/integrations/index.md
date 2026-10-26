---
title: "Integrationen"
---

# Integrationen

<div class="article-intro">

B1 lässt sich mit den Werkzeugen verbinden, die Ihr Team bereits verwendet. Verbinden Sie Slack oder Discord für Benachrichtigungen an Mitarbeitende, automatisieren Sie Abläufe mit Zapier oder Make, oder exportieren Sie Daten bei Bedarf nach Google Sheets -- ohne eine separate Integrationsplattform zu bezahlen und ohne dass ChurchApps zusätzliche Dienste hostet. Jede Integration läuft auf der Infrastruktur des Drittanbieters und kommuniziert mit Ihrer Kirche über die Webhooks oder die REST-API von B1.

</div>

## Was verfügbar ist

| Integration | Was sie tut | Richtung | Aufwand für die Einrichtung |
|---|---|---|---|
| **[Slack](./slack-discord)** | Lesbare Benachrichtigungen (neue Personen, Spenden, Anmeldungen, …) in einen Slack-Kanal senden | B1 → Slack | 2 Minuten |
| **[Discord](./slack-discord)** | Dasselbe, in einen Discord-Kanal | B1 → Discord | 2 Minuten |
| **[Zapier](./zapier)** | B1-Ereignisse als Auslöser und B1-Aktionen in einer beliebigen der über 7.000 Apps von Zapier nutzen | Beide Richtungen | 5–10 Min. pro Zap |
| **[Make](./make)** | Gleiche Idee wie Zapier, im visuellen Szenario-Editor von Make | Beide Richtungen | 5–10 Min. pro Szenario |
| **[Google Sheets](./google-sheets)** | Personen, Spenden, Gruppen und Anwesenheit bei Bedarf in eine Tabelle exportieren | B1 → Tabelle | 5 Minuten |
| **[Claude](./claude)** | Fragen zu Ihren Kirchendaten an Claude von Anthropic stellen, beschränkt auf Ihre Berechtigungen -- kostenlos zum Testen, empfohlen | Beide Richtungen | Unter 3 Minuten |
| **[ChatGPT](./chatgpt)** | Dasselbe mit ChatGPT von OpenAI (erfordert einen kostenpflichtigen ChatGPT-Tarif) | Beide Richtungen | 10 Minuten |
| **[Verbundene Dienste](./services/)** | Kuratierte Anleitungen für Mailchimp, Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr | Unterschiedlich | je 5–10 Min. |

## So wählen Sie aus

- **Sie wollen nur eine Benachrichtigung im Chat?** Verwenden Sie **Slack** oder **Discord** -- kein Konto bei einem Drittanbieter, kein Zap, der gepflegt werden muss. Die Einrichtung erfolgt vollständig in B1Admin.
- **Sie möchten etwas über mehrere Apps hinweg automatisieren** (z. B. "Wenn jemand spendet, füge die Person zu meiner Mailchimp-Liste hinzu und poste in Slack #spenden")? Verwenden Sie **Zapier** oder **Make**. Zapier ist einsteigerfreundlicher; Make ist bei großem Umfang günstiger und bietet flexiblere Logik.
- **Sie brauchen einen einmaligen Datenexport oder einen geplanten Bericht?** Verwenden Sie **Google Sheets** -- fügen Sie einen API-Schlüssel in die Seitenleiste des Add-ons ein und klicken Sie auf Exportieren.
- **Sie möchten in einfacher Sprache Fragen stellen** ("Wie viele Erstbesucher gab es letzten Sonntag?", "Fasse die Spenden dieses Monats zusammen")? Beginnen Sie mit **[Claude](./claude)** -- es ist kostenlos zum Testen und ist in weniger als 3 Minuten eingerichtet. **[ChatGPT](./chatgpt)** funktioniert ebenfalls mit einem kostenpflichtigen Tarif. Claude verbindet sich, indem Sie sich mit Ihrem B1-Konto anmelden; ChatGPT verwendet einen B1-API-Schlüssel.
- **Sie bauen eine eigene individuelle Integration?** Keine der oben genannten -- sprechen Sie die [REST-API](/docs/developer/api) direkt mit einem [API-Schlüssel](/docs/developer/api/api-keys) an oder abonnieren Sie einen Server, den Sie kontrollieren, für [Webhooks](/docs/developer/api/webhooks).

## Was sie gemeinsam haben

Jede Integration authentifiziert sich mit einem **B1-API-Schlüssel**, der in B1Admin unter **Einstellungen → Entwickler → API-Schlüssel** erstellt wird. Der Schlüssel:

- Ist an eine bestimmte Person in Ihrer Kirche gebunden und übernimmt deren Berechtigungen
- Kann mit **Bereichen** eingeschränkt werden -- ein Google-Sheets-Export benötigt zum Beispiel nur `people:read`, nicht `settings:write`
- Kann jederzeit widerrufen werden, was den Zugriff der Integration sofort beendet, ohne dass andere Funktionen betroffen sind

Einige Connectoren (Zapier, Make) registrieren außerdem im Auftrag Ihrer Kirche einen [Webhook](/docs/developer/api/webhooks), wenn der Zap oder das Szenario eingeschaltet wird, und entfernen ihn wieder, wenn Sie den Zap ausschalten -- die Webhook-URL müssen Sie selbst nicht verwalten.

:::tip
Damit Zapier und Make Webhooks automatisch registrieren können, benötigt der API-Schlüssel den Bereich **`settings:write`** (sowie die Ressourcenbereiche für alles, worauf die Integration zugreift). Ein Schlüssel mit reinem Lesezugriff funktioniert für Aktionen und Exporte, aber nicht für Auslöser.
:::

## Kosten

ChurchApps ist kostenlos und Open Source. Slack/Discord, das [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) sowie die offiziellen Connectoren für Zapier, Make und Google Sheets sind von unserer Seite ebenfalls kostenlos. Die Drittanbieter können für ihre eigenen Plattformen Gebühren verlangen (Zapier und Make bieten beide großzügige kostenlose Tarife; Slack, Discord und Google Sheets sind für diesen Zweck kostenlos).

## Eigene Integrationen entwickeln

Wenn nichts davon passt, ist jede B1-Schnittstelle offen:

- **[REST-API](/docs/developer/api)** -- B1 aus jeder Sprache mit einem `Authorization: Bearer cak_…`-Header aufrufen
- **[Webhooks](/docs/developer/api/webhooks)** -- einen öffentlichen HTTPS-Endpunkt für einen oder mehrere Ereignistypen abonnieren und signierte JSON-Nutzdaten empfangen
- **[OAuth + Verbundene Apps](/docs/developer/api/connected-apps)** -- wenn Sie ein SaaS-Produkt entwickeln, das von vielen Kirchen genutzt wird

## Nächste Schritte

- [Slack & Discord](./slack-discord) -- Chat-Benachrichtigungen senden
- [Zapier](./zapier) -- Verbindung zu über 7.000 Apps
- [Make](./make) -- visuelle Workflow-Automatisierung
- [Google Sheets](./google-sheets) -- Export in Tabellen
- [Claude](./claude) -- Claude von Anthropic nach Ihren Kirchendaten fragen
- [ChatGPT](./chatgpt) -- ChatGPT von OpenAI nach Ihren Kirchendaten fragen
- [Verbundene Dienste](./services/) -- Anleitungen für einzelne Dienste (Mailchimp, Donorbox, Clearstream, …)
