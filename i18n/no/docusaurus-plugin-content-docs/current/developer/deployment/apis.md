---
title: "API-distribusjon"
---

# API-distribusjon

<div class="article-intro">

ChurchApps API-er distribueres som AWS Lambda-funksjoner ved hjelp av Serverless Framework. Denne siden dekker bygge-, distribusjons- og konfigurasjonsarbeidsflyten for staging- og produksjonsmiljøer.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp API-et lokalt -- se [Lokalt API-oppsett](../api/local-setup)
- Konfigurer AWS-legitimasjon på maskinen din
- Sørg for at du har tilgang til mål-AWS-kontoen

</div>

## Bygging

API-er bygges for produksjon med en dedikert TypeScript-konfigurasjon:

```bash
npm run build:prod
```

Dette bruker `tsconfig.prod.json` for å kompilere prosjektet for Lambda-kjøretiden.

## Distribusjon

Distribuer til staging:

```bash
npm run deploy-staging
```

Distribuer til produksjon:

```bash
npm run deploy-prod
```

## Hva som opprettes

Hver API-distribusjon oppretter eller oppdaterer følgende AWS Lambda-funksjoner:

| Funksjon | Formål |
|----------|--------|
| `web` | HTTP-forespørselshåndterer via API Gateway |
| `socket` | WebSocket-tilkoblingshåndterer |
| `timer15Min` | Planlagt oppgave som kjøres hvert 15. minutt |
| `timerMidnight` | Planlagt oppgave som kjøres daglig ved midnatt |

## Miljøkonfigurasjon

I distribuerte miljøer leses konfigurasjon fra **AWS SSM Parameter Store** i stedet for `.env`-filer. Dette holder hemmeligheter ute av distribusjonspakken og muliggjør konfigurasjonsendringer uten å distribuere på nytt.

:::warning
Aldri commit produksjonslegitimasjon til repositoriet. All sensitiv konfigurasjon bør lagres i AWS SSM Parameter Store og nås under kjøring.
:::

:::tip
For å teste en distribusjon uten å påvirke produksjon, distribuer alltid til staging først med `npm run deploy-staging` og verifiser endringene før du promoterer til produksjon.
:::

## Relaterte artikler

- **[Lokalt API-oppsett](../api/local-setup)** -- Sette opp API-et for utvikling
- **[Modulstruktur](../api/module-structure)** -- Forstå Lambda-funksjonsarkitekturen
- **[Webappdistribusjon](./web-apps)** -- Distribuere frontend-applikasjonene
