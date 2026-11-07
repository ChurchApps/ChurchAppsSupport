---
title: "Integrationer"
description: "Koppla B1 Admin till Slack, Discord, Zapier, Make, Google Sheets och AI-assistenter som Claude, med installationssteg och de API-nyckelbehörigheter var och en behöver."
---

# Integrationer

<div class="article-intro">

B1 kopplar ihop sig med de verktyg som ditt team redan använder. Anslut Slack eller Discord för personalnotiser, automatisera arbetsflöden i Zapier eller Make, eller exportera data på begäran till Google Sheets. Du behöver inte betala för en separat integrationsplattform, och ChurchApps behöver inte hosta något extra. Varje integration körs på tredjepartens egen infrastruktur och kommunicerar med din församling via B1:s webhooks eller REST API.

</div>

## Vad som finns

| Integration | Vad den gör | Riktning | Insats för installation |
|---|---|---|---|
| **[Slack](./slack-discord.md)** | Publicerar läsbara notiser (nya personer, gåvor, anmälningar, …) i en Slack-kanal | B1 → Slack | 2 minuter |
| **[Discord](./slack-discord.md)** | Samma sak, i en Discord-kanal | B1 → Discord | 2 minuter |
| **[Zapier](./zapier.md)** | Använd B1-händelser som utlösare och B1-åtgärder i någon av Zapiers 7 000+ appar | Båda | 5–10 min per Zap |
| **[Make](./make.md)** | Samma idé som Zapier, i Makes visuella scenariobyggare | Båda | 5–10 min per scenario |
| **[Google Sheets](./google-sheets.md)** | Exportera Personer / Gåvor / Grupper / Närvaro till ett kalkylblad på begäran | B1 → Kalkylblad | 5 minuter |
| **[Claude](./claude.md)** | Ställ frågor till Anthropics Claude om dina församlingsdata, begränsat till dina behörigheter. Gratis att prova och rekommenderas | Båda | Under 3 minuter |
| **[ChatGPT](./chatgpt.md)** | Samma idé med OpenAI:s ChatGPT (kräver en betald ChatGPT-plan) | Båda | 10 minuter |
| **[Anslutna tjänster](./services/index.md)** | Utvalda recept för Mailchimp, Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr | Varierar | 5–10 min vardera |

## Så väljer du

- **Vill du bara ha en notis i chatten?** Använd **Slack** eller **Discord**. Du behöver inget konto hos tredjepart och ingen Zap att underhålla. Allt konfigureras i B1Admin.
- **Vill du automatisera något mellan olika appar** (t.ex. ”när någon ger, lägg till personen i min Mailchimp-lista och i Slack #gåvor”)? Använd **Zapier** eller **Make**. Zapier är enklare att komma igång med. Make är billigare i stor skala och har mer flexibel logik.
- **Behöver du ett engångsuttag av data eller en schemalagd rapport?** Använd **Google Sheets**. Klistra in en API-nyckel i tilläggets sidofält och klicka på Exportera.
- **Vill du ställa frågor på vanlig svenska** (”hur många förstagångsbesökare hade vi förra söndagen?”, ”sammanfatta gåvorna den här månaden”)? Börja med **[Claude](./claude.md)**. Det är gratis att prova och tar mindre än 3 minuter att ställa in. **[ChatGPT](./chatgpt.md)** fungerar också med en betald plan. Claude ansluter genom att du loggar in med ditt B1-konto, medan ChatGPT använder en B1-API-nyckel.
- **Bygger du en egen integration?** Ingen av de ovanstående. Prata direkt med [REST API:et](/docs/developer/api) med en [API-nyckel](/docs/developer/api/api-keys), eller prenumerera en server du kontrollerar på [webhooks](/docs/developer/api/webhooks).

## Vad de har gemensamt

Varje integration autentiserar sig med en **B1 API-nyckel**, som skapas i B1Admin under **Settings → Developer → API Keys**. Nyckeln:

- Är kopplad till en specifik person i din församling och ärver den personens behörigheter
- Kan begränsas med **scopes**. En export till Google Sheets behöver till exempel bara `people:read`, inte `settings:write`
- Kan återkallas när som helst, vilket omedelbart stänger integrationens åtkomst utan att påverka något annat

Några kopplingar (Zapier, Make) registrerar också en [webhook](/docs/developer/api/webhooks) åt dig när Zapen eller scenariot aktiveras, och tar bort den när du stänger av Zapen. Du behöver inte hantera webhook-URL:en själv.

:::tip
För att Zapier och Make ska kunna registrera webhooks automatiskt behöver API-nyckeln scopet **`settings:write`** (plus resursscopen för det integrationen använder). En nyckel med enbart läsbehörighet fungerar för åtgärder och exporter, men inte för utlösare.
:::

## Kostnad

ChurchApps är gratis och öppen källkod. Slack/Discord, [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) och de officiella kopplingarna för Zapier, Make och Google Sheets är också gratis från vår sida. Tredjepartstjänsterna kan ta betalt för sina egna plattformar. Zapier och Make har båda generösa gratisnivåer, medan Slack, Discord och Google Sheets är gratis för det här ändamålet.

## Bygg din egen

Om inget av ovanstående passar är alla delar av B1 öppna för dig:

- **[REST API](/docs/developer/api)**: Anropa B1 från valfritt språk med en `Authorization: Bearer cak_…`-header
- **[Webhooks](/docs/developer/api/webhooks)**: Prenumerera en publik HTTPS-slutpunkt på en eller flera händelsetyper och ta emot signerade JSON-payloads
- **[OAuth + Connected Apps](/docs/developer/api/connected-apps)**: Om du bygger en SaaS-produkt som används av många församlingar

## Nästa steg

- [Slack & Discord](./slack-discord.md): skicka chattnotiser
- [Zapier](./zapier.md): anslut till 7 000+ appar
- [Make](./make.md): visuell arbetsflödesautomation
- [Google Sheets](./google-sheets.md): exportera till kalkylblad
- [Claude](./claude.md): ställ frågor till Anthropics Claude om dina församlingsdata
- [ChatGPT](./chatgpt.md): ställ frågor till OpenAI:s ChatGPT om dina församlingsdata
- [Anslutna tjänster](./services/index.md): recept per tjänst (Mailchimp, Donorbox, Clearstream, …)
