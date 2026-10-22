---
title: "Integrasjoner"
---

# Integrasjoner {#integrations}

<div class="article-intro">

B1 kobler seg til verktøyene teamet ditt allerede bruker. Koble til Slack eller Discord for varsler til staben, automatiser arbeidsflyter i Zapier eller Make, eller eksporter data på forespørsel til Google Sheets -- uten å betale for en egen integrasjonsplattform, og uten at ChurchApps må hoste noe ekstra. Hver integrasjon kjører på tredjepartens egen infrastruktur og kommuniserer med kirken din gjennom B1s webhooks eller REST API.

</div>

## Hva som finnes {#whats-available}

| Integrasjon | Hva den gjør | Retning | Innsats for oppsett |
|---|---|---|---|
| **[Slack](./slack-discord)** | Sender lesbare varsler (nye personer, gaver, påmeldinger, …) til en Slack-kanal | B1 → Slack | 2 minutter |
| **[Discord](./slack-discord)** | Samme, i en Discord-kanal | B1 → Discord | 2 minutter |
| **[Zapier](./zapier)** | Bruk B1-hendelser som utløsere og B1-handlinger i en hvilken som helst av Zapiers 7 000+ apper | Begge veier | 5–10 min per Zap |
| **[Make](./make)** | Samme idé som Zapier, i Makes visuelle scenariobygger | Begge veier | 5–10 min per scenario |
| **[Google Sheets](./google-sheets)** | Eksporter personer / gaver / grupper / oppmøte til et regneark på forespørsel | B1 → Ark | 5 minutter |
| **[Claude](./claude)** | Still Anthropics Claude spørsmål om kirkens data, begrenset til dine tillatelser | Begge veier | 5 minutter |
| **[ChatGPT](./chatgpt)** | Samme idé med OpenAIs ChatGPT, via en egendefinert GPT eller MCP-kompatible OpenAI-verktøy | Begge veier | 10 minutter |
| **[Tilkoblede tjenester](./services/)** | Ferdige oppskrifter for Mailchimp, Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr | Varierer | 5–10 min hver |

## Hvordan velge {#how-to-pick}

- **Vil du bare ha et varsel i chatten?** Bruk **Slack** eller **Discord** -- ingen tredjepartskonto, ingen Zap å vedlikeholde. Konfigureres helt i B1Admin.
- **Vil du automatisere noe på tvers av apper** (f.eks. «når noen gir, legg dem til på Mailchimp-listen min og i Slack #gaver»)? Bruk **Zapier** eller **Make**. Zapier er vennligst; Make er billigere i stor skala og har mer fleksibel logikk.
- **Trenger du et engangsuttrekk av data eller en planlagt rapport?** Bruk **Google Sheets** -- lim inn en API-nøkkel i tilleggets sidefelt og klikk Eksporter.
- **Vil du stille spørsmål på vanlig språk** («hvor mange førstegangsbesøkende kom sist søndag?», «oppsummer giving denne måneden»)? Bruk **[Claude](./claude)** eller **[ChatGPT](./chatgpt)**. Begge kobler til B1 med én enkelt API-nøkkel, og Claude kan også kobles til fra claude.ai ved å logge inn i B1.
- **Bygger du din egen integrasjon?** Ingen av de ovennevnte -- snakk direkte med [REST API-et](/docs/developer/api) med en [API-nøkkel](/docs/developer/api/api-keys), eller abonner en server du kontrollerer, på [webhooks](/docs/developer/api/webhooks).

## Felles for alle {#what-they-have-in-common}

Hver integrasjon autentiserer med en **B1 API-nøkkel**, opprettet i B1Admin under **Innstillinger → Utvikler → API-nøkler**. Nøkkelen:

- Er knyttet til en bestemt person i kirken din og arver den personens tillatelser
- Kan begrenses med **omfang** -- for eksempel trenger en Google Sheets-eksport bare `people:read`, ikke `settings:write`
- Kan tilbakekalles når som helst, og stopper umiddelbart integrasjonens tilgang uten å påvirke noe annet

Noen få koblinger (Zapier, Make) registrerer også en [webhook](/docs/developer/api/webhooks) på dine vegne når Zapen eller scenariet slås på, og fjerner den når du slår av Zapen -- du håndterer selv aldri webhook-URLen.

:::tip
For at Zapier og Make skal registrere webhooks automatisk, trenger API-nøkkelen omfanget **`settings:write`** (pluss ressursomfangene for det integrasjonen berører). En nøkkel som bare kan lese, fungerer for handlinger og eksport, men ikke for utløsere.
:::

## Kostnad {#cost}

ChurchApps er gratis og åpen kildekode. Slack/Discord, [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk), og de offisielle Zapier-, Make- og Google Sheets-konnektorene er også gratis fra vår side. Tredjepartene kan ta betalt for sine egne plattformer (Zapier og Make har begge generøse gratisnivåer; Slack, Discord og Google Sheets er gratis til dette formålet).

## Bygg din egen {#building-your-own}

Hvis ingen av de ovennevnte passer, er alle B1-flater åpne:

- **[REST API](/docs/developer/api)** — kall B1 fra et hvilket som helst språk med en `Authorization: Bearer cak_…`-header
- **[Webhooks](/docs/developer/api/webhooks)** — abonner et offentlig HTTPS-endepunkt på en eller flere hendelsestyper og motta signerte JSON-nyttelaster
- **[OAuth + tilkoblede apper](/docs/developer/api/connected-apps)** — hvis du bygger et SaaS-produkt som brukes av mange kirker

## Neste steg {#next-steps}

- [Slack og Discord](./slack-discord) — send chatvarsler
- [Zapier](./zapier) — koble til 7 000+ apper
- [Make](./make) — visuell arbeidsflyt-automatisering
- [Google Sheets](./google-sheets) — eksporter til regneark
- [Claude](./claude) — still Anthropics Claude spørsmål om kirkens data
- [ChatGPT](./chatgpt) — still OpenAIs ChatGPT spørsmål om kirkens data
- [Tilkoblede tjenester](./services/) — oppskrifter per tjeneste (Mailchimp, Donorbox, Clearstream, …)
