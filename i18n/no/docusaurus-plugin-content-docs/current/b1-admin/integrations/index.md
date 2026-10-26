---
title: "Integrasjoner"
---

# Integrasjoner

<div class="article-intro">

B1 kobler seg til verktøyene teamet ditt allerede bruker. Koble til Slack eller Discord for varsler til ansatte, automatiser arbeidsflyter i Zapier eller Make, eller eksporter data etter behov til Google Sheets — uten å betale for en egen integrasjonsplattform, og uten at ChurchApps må drifte noe ekstra. Hver integrasjon kjører på tredjepartens egen infrastruktur og snakker med menigheten din gjennom B1s webhooks eller REST-API.

</div>

## Hva som finnes

| Integrasjon | Hva den gjør | Retning | Innsats for oppsett |
|---|---|---|---|
| **[Slack](./slack-discord)** | Sender lesbare varsler (nye personer, gaver, påmeldinger, …) til en Slack-kanal | B1 → Slack | 2 minutter |
| **[Discord](./slack-discord)** | Samme, i en Discord-kanal | B1 → Discord | 2 minutter |
| **[Zapier](./zapier)** | Bruk B1-hendelser som utløsere og B1-handlinger i en av Zapiers over 7 000 apper | Begge veier | 5–10 min per Zap |
| **[Make](./make)** | Samme idé som Zapier, i Makes visuelle scenariobygger | Begge veier | 5–10 min per scenario |
| **[Google Sheets](./google-sheets)** | Eksporter personer / gaver / grupper / oppmøte til et regneark etter behov | B1 → regneark | 5 minutter |
| **[Claude](./claude)** | Still Anthropics Claude spørsmål om menighetsdataene dine, avgrenset til tillatelsene dine — gratis å prøve, anbefalt | Begge veier | Under 3 minutter |
| **[ChatGPT](./chatgpt)** | Samme idé med OpenAIs ChatGPT (krever et betalt ChatGPT-abonnement) | Begge veier | 10 minutter |
| **[Tilkoblede tjenester](./services/)** | Utvalgte oppskrifter for Mailchimp, Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr | Varierer | 5–10 min hver |

## Hvordan velge

- **Vil du bare ha et varsel i chatten?** Bruk **Slack** eller **Discord** — ingen konto hos tredjepart, ingen Zap å vedlikeholde. Konfigureres helt i B1Admin.
- **Vil du automatisere noe på tvers av apper** (f.eks. «når noen gir, legg dem til i Mailchimp-listen min og i Slack #donations»)? Bruk **Zapier** eller **Make**. Zapier er vennligere; Make er billigere i stor skala og har mer fleksibel logikk.
- **Trenger du et engangsuttrekk av data eller en planlagt rapport?** Bruk **Google Sheets** — lim inn en API-nøkkel i sidepanelet til tillegget og klikk på Eksporter.
- **Vil du stille spørsmål i vanlig språk** («hvor mange førstegangsbesøkende kom sist søndag?», «oppsummer gavene denne måneden»)? Start med **[Claude](./claude)** — det er gratis å prøve og settes opp på under 3 minutter. **[ChatGPT](./chatgpt)** fungerer også med et betalt abonnement. Claude kobles til ved å logge inn med B1-kontoen din; ChatGPT bruker en B1 API-nøkkel.
- **Bygger du en egen integrasjon?** Ingen av de over — snakk med [REST-API-et](/docs/developer/api) direkte med en [API-nøkkel](/docs/developer/api/api-keys), eller abonner en server du kontrollerer på [webhooks](/docs/developer/api/webhooks).

## Det de har felles

Hver integrasjon autentiserer seg med en **B1 API-nøkkel**, laget i B1Admin under **Settings → Developer → API Keys**. Nøkkelen:

- Er knyttet til en bestemt person i menigheten din og arver den personens tillatelser
- Kan innsnevres med **scopes** — for eksempel trenger en Google Sheets-eksport bare `people:read`, ikke `settings:write`
- Kan trekkes tilbake når som helst, og stenger integrasjonens tilgang øyeblikkelig uten å påvirke noe annet

Noen få koblinger (Zapier, Make) registrerer også en [webhook](/docs/developer/api/webhooks) på dine vegne når Zap-en eller scenarioet slås på, og fjerner den når du slår av Zap-en — du må ikke administrere webhook-URL-en selv.

:::tip
For at Zapier og Make skal registrere webhooks automatisk, må API-nøkkelen ha **`settings:write`**-scopet (pluss ressursscopene for det integrasjonen berører). En skrivebeskyttet nøkkel fungerer for handlinger og eksporter, men ikke for utløsere.
:::

## Kostnad

ChurchApps er gratis og åpen kildekode. Slack/Discord, [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk), og de offisielle Zapier-, Make- og Google Sheets-koblingene er også gratis fra vår side. Tredjepartene kan ta betalt for sine egne plattformer (Zapier og Make har begge sjenerøse gratisnivåer; Slack, Discord og Google Sheets er gratis til dette formålet).

## Bygg din egen

Hvis ingenting av det over passer, er hver B1-flate åpen:

- **[REST-API](/docs/developer/api)** — kall B1 fra et hvilket som helst språk med en `Authorization: Bearer cak_…`-header
- **[Webhooks](/docs/developer/api/webhooks)** — abonner et offentlig HTTPS-endepunkt på en eller flere hendelsestyper og motta signerte JSON-nyttelaster
- **[OAuth + Connected Apps](/docs/developer/api/connected-apps)** — hvis du bygger et SaaS-produkt som brukes av mange menigheter

## Neste steg

- [Slack og Discord](./slack-discord) — send chatvarsler
- [Zapier](./zapier) — koble til over 7 000 apper
- [Make](./make) — visuell arbeidsflytautomatisering
- [Google Sheets](./google-sheets) — eksporter til regneark
- [Claude](./claude) — still Claude spørsmål om menighetsdataene dine
- [ChatGPT](./chatgpt) — still ChatGPT spørsmål om menighetsdataene dine
- [Tilkoblede tjenester](./services/) — oppskrifter per tjeneste (Mailchimp, Donorbox, Clearstream, …)
