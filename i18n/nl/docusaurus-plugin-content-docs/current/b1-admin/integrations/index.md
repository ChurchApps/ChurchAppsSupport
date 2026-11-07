---
title: "Integraties"
description: "Koppel B1 Admin aan Slack, Discord, Zapier, Make, Google Sheets en AI-assistenten zoals Claude, met installatiestappen en de vereiste API-sleutelbereiken."
---

# Integraties

<div class="article-intro">

B1 sluit aan op de tools die uw team al gebruikt. Verbind Slack of Discord voor meldingen aan medewerkers, automatiseer werkstromen in Zapier of Make, of exporteer gegevens op verzoek naar Google Sheets. U hebt daarvoor geen apart integratieplatform nodig en ChurchApps hoeft niets extra's te hosten. Elke integratie draait op de eigen infrastructuur van de derde partij en communiceert met uw kerk via de webhooks of de REST API van B1.

</div>

## Wat er beschikbaar is

| Integratie | Wat het doet | Richting | Inspanning om in te stellen |
|---|---|---|---|
| **[Slack](./slack-discord.md)** | Leesbare meldingen (nieuwe personen, giften, aanmeldingen, …) naar een Slack-kanaal sturen | B1 → Slack | 2 minuten |
| **[Discord](./slack-discord.md)** | Hetzelfde, naar een Discord-kanaal | B1 → Discord | 2 minuten |
| **[Zapier](./zapier.md)** | B1-gebeurtenissen gebruiken als triggers en B1-acties in elk van Zapiers meer dan 7.000 apps | Beide | 5–10 min per Zap |
| **[Make](./make.md)** | Hetzelfde idee als Zapier, in de visuele scenariobouwer van Make | Beide | 5–10 min per scenario |
| **[Google Sheets](./google-sheets.md)** | Personen / Giften / Groepen / Aanwezigheid op verzoek exporteren naar een spreadsheet | B1 → Sheet | 5 minuten |
| **[Claude](./claude.md)** | Vragen stellen aan Anthropics Claude over uw kerkgegevens, beperkt tot uw rechten. Gratis uit te proberen en aanbevolen | Beide | Minder dan 3 minuten |
| **[ChatGPT](./chatgpt.md)** | Hetzelfde idee met OpenAI's ChatGPT (vereist een betaald ChatGPT-abonnement) | Beide | 10 minuten |
| **[Gekoppelde diensten](./services/index.md)** | Samengestelde recepten voor Mailchimp, Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr | Varieert | 5–10 min per dienst |

## Hoe u kiest

- **Wilt u alleen een melding in de chat?** Gebruik **Slack** of **Discord**. Er is geen account van een derde partij nodig en geen Zap om te onderhouden. Alles wordt ingesteld binnen B1Admin.
- **Wilt u iets over meerdere apps automatiseren** (bijvoorbeeld „wanneer iemand geeft, voeg hem of haar toe aan mijn Mailchimp-lijst en stuur een bericht naar Slack #giften“)? Gebruik **Zapier** of **Make**. Zapier is gebruiksvriendelijker; Make is op grote schaal goedkoper en heeft flexibelere logica.
- **Hebt u een eenmalige gegevensexport of een periodiek rapport nodig?** Gebruik **Google Sheets**. Plak een API-sleutel in het zijpaneel van de add-on en klik op Exporteren.
- **Wilt u in gewone taal vragen stellen** („hoeveel eerste bezoekers waren er afgelopen zondag?“, „vat de giften van deze maand samen“)? Begin met **[Claude](./claude.md)**. Het is gratis uit te proberen en is in minder dan 3 minuten ingesteld. **[ChatGPT](./chatgpt.md)** werkt ook, met een betaald abonnement. Claude maakt verbinding door in te loggen met uw B1-account; ChatGPT gebruikt een B1-API-sleutel.
- **Bouwt u een eigen aangepaste integratie?** Geen van bovenstaande. Praat rechtstreeks met de [REST API](/docs/developer/api) met een [API-sleutel](/docs/developer/api/api-keys), of abonneer een server die u beheert op [webhooks](/docs/developer/api/webhooks).

## Wat ze gemeen hebben

Elke integratie authenticeert met een **B1-API-sleutel**, die in B1Admin wordt aangemaakt onder **Instellingen → Ontwikkelaar → API-sleutels**. De sleutel:

- Is gekoppeld aan een specifiek persoon in uw kerk en erft de rechten van die persoon
- Kan worden beperkt met **scopes**. Een export naar Google Sheets heeft bijvoorbeeld alleen `people:read` nodig, niet `settings:write`
- Kan op elk moment worden ingetrokken, waardoor de toegang van de integratie direct wordt beëindigd zonder dat iets anders wordt beïnvloed

Enkele koppelingen (Zapier, Make) registreren ook namens u een [webhook](/docs/developer/api/webhooks) wanneer de Zap of het scenario wordt ingeschakeld, en verwijderen die wanneer u de Zap uitschakelt. U hoeft de webhook-URL zelf dus niet te beheren.

:::tip
Opdat Zapier en Make webhooks automatisch kunnen registreren, heeft de API-sleutel de scope **`settings:write`** nodig (plus de resourcescopes voor wat de integratie aanraakt). Een alleen-lezen sleutel werkt voor acties en exports, maar niet voor triggers.
:::

## Kosten

ChurchApps is gratis en open source. Slack/Discord, de [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) en de officiële Zapier-, Make- en Google Sheets-connectors zijn ook gratis van onze kant. De derde partijen kunnen kosten rekenen voor hun eigen platforms (Zapier en Make hebben beide ruime gratis niveaus; Slack, Discord en Google Sheets zijn hiervoor gratis).

## Zelf bouwen

Als niets van bovenstaande past, staat elk B1-onderdeel voor u open:

- **[REST API](/docs/developer/api)**: roep B1 aan vanuit elke taal met een `Authorization: Bearer cak_…`-header
- **[Webhooks](/docs/developer/api/webhooks)**: abonneer een openbaar HTTPS-eindpunt op een of meer gebeurtenistypen en ontvang ondertekende JSON-payloads
- **[OAuth + Connected Apps](/docs/developer/api/connected-apps)**: als u een SaaS-product bouwt dat door veel kerken wordt gebruikt

## Volgende stappen

- [Slack & Discord](./slack-discord.md): chatmeldingen versturen
- [Zapier](./zapier.md): verbinden met meer dan 7.000 apps
- [Make](./make.md): visuele workflowautomatisering
- [Google Sheets](./google-sheets.md): exporteren naar spreadsheets
- [Claude](./claude.md): Anthropics Claude vragen stellen over uw kerkgegevens
- [ChatGPT](./chatgpt.md): OpenAI's ChatGPT vragen stellen over uw kerkgegevens
- [Gekoppelde diensten](./services/index.md): recepten per dienst (Mailchimp, Donorbox, Clearstream, …)
