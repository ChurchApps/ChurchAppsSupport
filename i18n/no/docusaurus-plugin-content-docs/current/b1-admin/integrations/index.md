---
title: "Integrasjoner"
---

# Integrasjoner

<div class="article-intro">

B1 plugger seg inn i verktøyene laget ditt allerede bruker. Koble Slack eller Discord for stab-meldinger, automatisere arbeidsflyter i Zapier eller Make, eller eksporter data på etterspørsel til Google Sheets — uten å betale for en egen integrasjonsplattform og uten at ChurchApps hoster noe ekstra. Hver integrasjon kjører på tredjepartens egne infrastruktur og snakker til kirka di gjennom B1s webhooks eller REST API.

</div>

## Hva som er tilgjengelig

| Integrasjon | Hva den gjør | Retning | Innsats for oppsett |
|---|---|---|---|
| **[Slack](./slack-discord)** | Post lesbare meldinger (nye mennesker, donasjoner, påmeldinger, …) til en Slack-kanal | B1 → Slack | 2 minutter |
| **[Discord](./slack-discord)** | Samme, i en Discord-kanal | B1 → Discord | 2 minutter |
| **[Zapier](./zapier)** | Bruk B1-hendelser som utløsere og B1-handlinger i noen av Zapiers 7000+ apper | Begge | 5–10 min per Zap |
| **[Make](./make)** | Samme idé som Zapier, i Makes visuelle scenario-bygger | Begge | 5–10 min per scenario |
| **[Google Sheets](./google-sheets)** | Eksporter mennesker / donasjoner / grupper / frammøte til et regneark på etterspørsel | B1 → Sheet | 5 minutter |
| **[Claude](./claude)** | Spør Anthropic's Claude spørsmål om kirka di-data, begrenset til dine tillatelser | Begge | 5 minutter |
| **[ChatGPT](./chatgpt)** | Samme idé med OpenAI's ChatGPT, via en tilpasset GPT eller MCP-klar OpenAI-verktøy | Begge | 10 minutter |
| **[Koblet tjenester](./services/)** | Kuratert oppskrifter for Mailchimp, Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr | Varierer | 5–10 min hver |

## Hvordan velge

- **Bare vil ha en melding i chat?** Bruk **Slack** eller **Discord** — ingen tredjepartskonto, ingen Zap å vedlikeholde. Konfigurert helt innenfor B1Admin.
- **Vil automatisere noe på tvers av apper** (f.eks. "når noen gir, legg dem til i min Mailchimp-liste og Slack #donations")? Bruk **Zapier** eller **Make**. Zapier er vennligere; Make er billigere i stor skala og har mer fleksibel logikk.
- **Trenger en engangs datapull eller en planlagt rapport?** Bruk **Google Sheets** — lim inn en API-nøkkel i tilleggssidefeltet og klikk Eksporter.
- **Vil spørre spørsmål på vanlig engelsk** ("hvor mange førstegangsbesøkende forrige søndag?", "oppsummer gaver denne måneden")? Bruk **[Claude](./claude)** eller **[ChatGPT](./chatgpt)** — begge kobler til B1 med en enkelt API-nøkkel.
- **Bygger du din egne tilpasset integrasjon?** Ingen av de ovenfor — snakk direkte til [REST API](/docs/developer/api) med en [API-nøkkel](/docs/developer/api/api-keys), eller abonner på en server du kontrollerer for [webhooks](/docs/developer/api/webhooks).

## Hva de har til felles

Hver integrasjon godkjenner seg selv med en **B1 API-nøkkel**, opprettet i B1Admin under **Innstillinger → Utviklernavn → API-nøkler**. Nøkkelen:

- Er bundet til en spesifikk person i kirka di og arver den personens tillatelser
- Kan begrenses med **scoper** — for eksempel en Google Sheets-eksport trenger bare `people:read`, ikke `settings:write`
- Kan tilbakekalles når som helst, og kutter integrasjonens tilgang umiddelbart uten å påvirke noe annet

Et par koblinger (Zapier, Make) registrerer også en [webhook](/docs/developer/api/webhooks) på vegne av deg når Zap eller scenario er slått på, og fjerner den når du slår det av — du administrerer selv ikke webhook-URL-en.

:::tip
For at Zapier og Make skal registrere webhooks automatisk, trenger API-nøkkelen **`settings:write`**-scopet (pluss ressurs-scopene for det integrasjonen berører). En skrivebeskyttet nøkkel fungerer for handlinger og eksporter men ikke for utløsere.
:::

## Kostnad

ChurchApps er gratis og åpen kildekode. Slack/Discord, [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk), og de offisielle Zapier / Make / Google Sheets-koblingene er også gratis fra vår side. Tredjepartene kan belaste for sine egne plattformer (Zapier og Make har begge sjenerøse gratis nivåer; Slack, Discord, og Google Sheets er gratis for dette formålet).

## Bygge din egen

Hvis ingen av de ovenfor passer, er hver B1-overflate åpen:

- **[REST API](/docs/developer/api)** — ring B1 fra enhver språk med en `Authorization: Bearer cak_…`-overskrift
- **[Webhooks](/docs/developer/api/webhooks)** — abonner på en offentlig HTTPS-endepunkt på en eller flere hendelsestyper og motta signerte JSON-nyttelaster
- **[OAuth + koblet apper](/docs/developer/api/connected-apps)** — hvis du bygger et SaaS-produkt brukt av mange kirker

## Neste trinn

- [Slack & Discord](./slack-discord) — post chat-meldinger
- [Zapier](./zapier) — koble til 7000+ apper
- [Make](./make) — visuell arbeidsflytautomatisering
- [Google Sheets](./google-sheets) — eksporter til regneark
- [Claude](./claude) — spør Anthropic's Claude om kirka di-data
- [ChatGPT](./chatgpt) — spør OpenAI's ChatGPT om kirka di-data
- [Koblet tjenester](./services/) — per-tjeneste oppskrifter (Mailchimp, Donorbox, Clearstream, …)
