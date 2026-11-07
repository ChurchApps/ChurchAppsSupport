---
title: "Integrationer"
description: "Forbind B1 Admin til Slack, Discord, Zapier, Make, Google Sheets og AI-assistenter som Claude, med opsætningstrin og de API-nøgleomfang hver især kræver."
---

# Integrationer

<div class="article-intro">

B1 hænger sammen med de værktøjer, dit team allerede bruger. Forbind Slack eller Discord til interne notifikationer, automatiser arbejdsgange i Zapier eller Make, eller eksportér data efter behov til Google Sheets — uden at betale for en separat integrationsplatform og uden at ChurchApps skal hoste noget ekstra. Hver integration kører på tredjepartens egen infrastruktur og kommunikerer med din menighed via B1's webhooks eller REST API.

</div>

## Hvad er tilgængeligt

| Integration | Hvad den gør | Retning | Indsats for opsætning |
|---|---|---|---|
| **[Slack](./slack-discord.md)** | Poster letlæselige notifikationer (nye personer, donationer, tilmeldinger, …) til en Slack-kanal | B1 → Slack | 2 minutter |
| **[Discord](./slack-discord.md)** | Samme, i en Discord-kanal | B1 → Discord | 2 minutter |
| **[Zapier](./zapier.md)** | Brug B1-hændelser som triggere og B1-handlinger i en af Zapiers 7.000+ apps | Begge | 5–10 min. pr. Zap |
| **[Make](./make.md)** | Samme idé som Zapier, i Makes visuelle scenarie-builder | Begge | 5–10 min. pr. scenarie |
| **[Google Sheets](./google-sheets.md)** | Eksportér personer / donationer / grupper / fremmøde til et regneark efter behov | B1 → Ark | 5 minutter |
| **[Claude](./claude.md)** | Stil spørgsmål til Anthropics Claude om dine kirkedata, begrænset til dine rettigheder — gratis at prøve, anbefales | Begge | Under 3 minutter |
| **[ChatGPT](./chatgpt.md)** | Samme idé med OpenAIs ChatGPT (kræver en betalt ChatGPT-plan) | Begge | 10 minutter |
| **[Tilsluttede tjenester](./services/index.md)** | Udvalgte opskrifter til Mailchimp, Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr | Varierer | 5–10 min. hver |

## Hvordan du vælger

- **Vil du bare have en notifikation i chatten?** Brug **Slack** eller **Discord** — ingen tredjepartskonto, ingen Zap at vedligeholde. Konfigureres helt inde i B1Admin.
- **Vil du automatisere noget på tværs af apps** (fx "når nogen giver, tilføj dem til min Mailchimp-liste og til Slack #donations")? Brug **Zapier** eller **Make**. Zapier er mere brugervenlig; Make er billigere i stor skala og har mere fleksibel logik.
- **Har du brug for et engangsudtræk af data eller en planlagt rapport?** Brug **Google Sheets** — indsæt en API-nøgle i tilføjelsens sidepanel og klik på Eksportér.
- **Vil du stille spørgsmål på almindeligt sprog** ("hvor mange førstegangsgæster havde vi sidste søndag?", "opsummér donationerne denne måned")? Start med **[Claude](./claude.md)** — det er gratis at prøve og opsættes på under 3 minutter. **[ChatGPT](./chatgpt.md)** virker også med en betalt plan. Claude forbindes ved at logge ind med din B1-konto; ChatGPT bruger en B1 API-nøgle.
- **Bygger du din egen integration?** Ingen af ovenstående — tal direkte med [REST API'et](/docs/developer/api) med en [API-nøgle](/docs/developer/api/api-keys), eller abonnér en server, du selv kontrollerer, på [webhooks](/docs/developer/api/webhooks).

## Hvad de har til fælles

Hver integration autentificerer sig med en **B1 API-nøgle**, som oprettes i B1Admin under **Settings → Developer → API Keys**. Nøglen:

- Er knyttet til en bestemt person i din menighed og arver den persons rettigheder
- Kan begrænses med **scopes** — fx skal et Google Sheets-udtræk kun bruge `people:read`, ikke `settings:write`
- Kan tilbagekaldes når som helst, hvilket øjeblikkeligt lukker integrationens adgang uden at påvirke noget andet

Nogle få connectors (Zapier, Make) registrerer også en [webhook](/docs/developer/api/webhooks) på dine vegne, når Zap'en eller scenariet tændes, og fjerner den igen, når du slukker Zap'en — du skal ikke selv administrere webhook-URL'en.

:::tip
For at Zapier og Make kan registrere webhooks automatisk, skal API-nøglen have **`settings:write`**-scopet (plus ressource-scopes for det, integrationen rører ved). En nøgle med kun læserettigheder virker til handlinger og eksport, men ikke til triggere.
:::

## Omkostninger

ChurchApps er gratis og open source. Slack/Discord, [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) og de officielle Zapier-, Make- og Google Sheets-connectors er også gratis fra vores side. Tredjeparterne kan opkræve betaling for deres egne platforme (Zapier og Make har begge generøse gratis niveauer; Slack, Discord og Google Sheets er gratis til dette formål).

## Byg din egen

Hvis ingen af ovenstående passer, er hver eneste B1-flade åben:

- **[REST API](/docs/developer/api)** — kald B1 fra ethvert sprog med en `Authorization: Bearer cak_…`-header
- **[Webhooks](/docs/developer/api/webhooks)** — abonnér et offentligt HTTPS-endpoint på en eller flere hændelsestyper og modtag signerede JSON-payloads
- **[OAuth + Connected Apps](/docs/developer/api/connected-apps)** — hvis du bygger et SaaS-produkt, der bruges af mange menigheder

## Næste skridt

- [Slack & Discord](./slack-discord.md) — send chatnotifikationer
- [Zapier](./zapier.md) — forbind til 7.000+ apps
- [Make](./make.md) — visuel workflow-automatisering
- [Google Sheets](./google-sheets.md) — eksportér til regneark
- [Claude](./claude.md) — spørg Anthropics Claude om dine kirkedata
- [ChatGPT](./chatgpt.md) — spørg OpenAIs ChatGPT om dine kirkedata
- [Tilsluttede tjenester](./services/index.md) — opskrifter pr. tjeneste (Mailchimp, Donorbox, Clearstream, …)
