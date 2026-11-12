---
title: "Integrasjoner"
description: "Koble B1 Admin til Slack, Discord, Zapier, Make, Google Sheets og KI-assistenter som Claude, med oppsettstegene og API-nøkkelomfangene hver av dem trenger."
---

# Integrasjoner

<div class="article-intro">

B1 kobles til verktøyene teamet ditt allerede bruker. Koble til Slack eller Discord for varsler til staben, automatiser arbeidsflyter i Zapier eller Make, eller eksporter data på forespørsel til Google Sheets, uten å betale for en egen integrasjonsplattform og uten at ChurchApps må drifte noe ekstra. Hver integrasjon kjører på tredjepartens egen infrastruktur og snakker med kirken din gjennom B1s webhooks eller REST API.

</div>

## Hva som finnes {#whats-available}

| Integrasjon | Hva den gjør | Retning | Innsats for oppsett |
|---|---|---|---|
| **[Slack](./slack-discord.md)** | Publiserer lesbare varsler (nye personer, gaver, påmeldinger, …) til en Slack-kanal | B1 → Slack | 2 minutter |
| **[Discord](./slack-discord.md)** | Samme, i en Discord-kanal | B1 → Discord | 2 minutter |
| **[Zapier](./zapier.md)** | Bruk B1-hendelser som utløsere og B1-handlinger i hvilken som helst av Zapiers over 7 000 apper (venter på godkjenning fra Zapier) | Begge veier | 5–10 min per Zap |
| **[Make](./make.md)** | Samme idé som Zapier, i Makes visuelle scenariobygger (ikke lansert ennå) | Begge veier | 5–10 min per scenario |
| **[Google Sheets](./google-sheets.md)** | Eksporter personer / gaver / grupper / oppmøte til et regneark på forespørsel (ikke lansert ennå) | B1 → regneark | 5 minutter |
| **[Claude](./claude.md)** | Still Anthropics Claude spørsmål om kirkens data, begrenset av tillatelsene dine. Gratis å prøve, anbefalt | Begge veier | Under 3 minutter |
| **[ChatGPT](./chatgpt.md)** | Samme idé med OpenAIs ChatGPT (krever et betalt ChatGPT-abonnement) | Begge veier | 10 minutter |
| **[Mailchimp](./services/mailchimp.md)** | Hold en Mailchimp-målgruppe synkronisert med personene, gruppene og lagrede lister dine. Innebygd i B1 | B1 → Mailchimp | 5 minutter |
| **[Tilkoblede tjenester](./services/index.md)** | Ferdige oppskrifter for Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr | Varierer | 5–10 min hver |

## Hvordan velge {#how-to-pick}

- **Vil du bare ha et varsel i chatten?** Bruk **Slack** eller **Discord**. Ingen konto hos tredjepart, ingen Zap å vedlikeholde. Settes opp helt inne i B1 Admin.
- **Vil du automatisere noe på tvers av apper** (f.eks. «når noen gir, legg dem til i Mailchimp-listen min og i Slack #gaver»)? Bruk **Zapier** eller **Make**. Zapier er enklest å bruke. Make er billigere i stor skala og har mer fleksibel logikk.
- **Trenger du et engangsuttrekk av data eller en planlagt rapport?** Bruk **Google Sheets**. Lim inn en API-nøkkel i sidepanelet til tillegget og klikk på Eksporter.
- **Vil du stille spørsmål på vanlig språk** («hvor mange førstegangsbesøkende var det sist søndag?», «oppsummer gavene denne måneden»)? Start med **[Claude](./claude.md)**. Det er gratis å prøve og settes opp på under 3 minutter. **[ChatGPT](./chatgpt.md)** fungerer også, med et betalt abonnement. Claude kobles til ved at du logger inn med B1-kontoen din. ChatGPT bruker en B1 API-nøkkel.
- **Bygger du en egen integrasjon?** Ingen av de over. Snakk direkte med [REST API-et](/docs/developer/api) med en [API-nøkkel](/docs/developer/api/api-keys), eller abonner en server du kontrollerer på [webhooks](/docs/developer/api/webhooks).

## Det de har felles {#what-they-have-in-common}

Alt settes opp i B1 Admin under **Innstillinger → Utvikler**, som har tre faner: **API-nøkler**, **Webhooks** og **Tilkoblede apper**.

- **Slack, Discord og Mailchimp** er webhooks du oppretter selv på fanen **Webhooks** (velg riktig **Connector-type**). De trenger ikke en API-nøkkel.
- **Claude** (innlogging med B1-kontoen din) vises på fanen **Tilkoblede apper**, der du kan trekke det tilbake.
- **Zapier, Make, Google Sheets, ChatGPT og Claude med en nøkkel** autentiserer med en **B1 API-nøkkel**, laget på fanen **API-nøkler**. Nøkkelen:

  - Er knyttet til personen som laget den og arver tillatelsene til den personen
  - Kan begrenses med **omfang**. For eksempel trenger en Google Sheets-eksport bare `people:read`, ikke `settings:write`
  - Kan slettes når som helst, og stopper øyeblikkelig integrasjonens tilgang uten å påvirke noe annet

Noen connectorer (Zapier, Make) registrerer også en [webhook](/docs/developer/api/webhooks) på dine vegne når Zapen eller scenariet slås på, og fjerner den når du slår Zapen av. Du administrerer ikke webhook-URL-en selv.

:::tip
For at Zapier og Make skal registrere webhooks automatisk, trenger API-nøkkelen omfanget **`settings:write`** (pluss ressursomfangene for det integrasjonen berører). En skrivebeskyttet nøkkel fungerer for handlinger og eksporter, men ikke for utløsere.
:::

## Kostnad {#cost}

ChurchApps er gratis og åpen kildekode. Slack/Discord, [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) og de offisielle Zapier-, Make- og Google Sheets-connectorene er også gratis fra vår side. Tredjepartene kan ta betalt for sine egne plattformer. Zapier og Make har begge generøse gratisnivåer. Slack, Discord og Google Sheets er gratis til dette formålet.

## Bygg din egen {#building-your-own}

Hvis ingen av de over passer, er alle B1-flater åpne:

- **[REST API](/docs/developer/api)**: kall B1 fra et hvilket som helst språk med en `Authorization: Bearer cak_…`-header
- **[Webhooks](/docs/developer/api/webhooks)**: abonner et offentlig HTTPS-endepunkt på én eller flere hendelsestyper, og motta signerte JSON-data
- **[OAuth + tilkoblede apper](/docs/developer/api/connected-apps)**: hvis du bygger et SaaS-produkt som brukes av mange kirker

## Neste steg {#next-steps}

- [Slack og Discord](./slack-discord.md): publiser chatvarsler
- [Zapier](./zapier.md): koble til over 7 000 apper
- [Make](./make.md): visuell arbeidsflytautomatisering
- [Google Sheets](./google-sheets.md): eksporter til regneark
- [Claude](./claude.md): still Anthropics Claude spørsmål om kirkens data
- [ChatGPT](./chatgpt.md): still OpenAIs ChatGPT spørsmål om kirkens data
- [Tilkoblede tjenester](./services/index.md): oppskrifter per tjeneste (Mailchimp, Donorbox, Clearstream, …)
