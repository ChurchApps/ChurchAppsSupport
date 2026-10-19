---
title: "Distribusjon av API"
---

# Distribusjon av API

<div class="article-intro">

ChurchApps-API-ene distribueres som AWS Lambda-funksjoner ved hjelp av Serverless Framework. Denne siden dekker arbeidsflyten for bygging, distribusjon og konfigurasjon for demo- og produksjonsmiljøene.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp API-et lokalt. Se [Lokalt oppsett av API](../api/local-setup)
- Konfigurer AWS-legitimasjon på maskinen din
- Sørg for at du har tilgang til målet AWS-kontoen

</div>

## Bygg

API-ene bygges for produksjon med en egen TypeScript-konfigurasjon:

```bash
npm run build:prod
```

Dette bruker `tsconfig.prod.json` til å kompilere prosjektet for Lambda-kjøretidsmiljøet.

## Distribuer

Distribuer til demomiljøet:

```bash
npm run deploy-demo
```

Distribuer til produksjon:

```bash
npm run deploy-prod
```

I praksis distribueres API-et av GitHub Actions: **Deploy Demo** kjøres ved hver push til `main`, og **Deploy Prod** startes manuelt (workflow dispatch). Det finnes ikke lenger et staging-miljø.

## Databasemigreringer

**Deploy Prod** kjører ventende databasemigreringer som en del av distribusjonen. Produksjonsdatabasene aksepterer bare tilkoblinger fra innsiden av VPC-et. Rett etter `serverless deploy` kaller arbeidsflyten derfor `migrate`-Lambda-funksjonen (`api-Prod-migrate`), som kjører alle modulenes ventende migreringer og returnerer `{ ok, environment, modules }`. Hvis en modul feiler eller blir avvist (for eksempel en database uten migreringshistorikk), mislykkes jobben, slik at skjemaet aldri ligger etter koden. **Rollback Prod** tilbakefører bare Lambda-koden. Migreringene forblir kjørt, så hold dem additive. Se [Serveradministrasjon: databasemigreringer](../server-admin#database-migrations) for å sjekke status eller kjøre migreringer manuelt.

## Hva som opprettes

Hver API-distribusjon oppretter eller oppdaterer følgende AWS Lambda-funksjoner:

| Funksjon | Formål |
|----------|---------|
| `web` | HTTP-forespørselsbehandler via API Gateway |
| `socket` | Behandler for WebSocket-tilkoblinger |
| `timer15Min` | Planlagt oppgave som kjører hvert 30. minutt (navnet er historisk) |
| `timerMidnight` | Planlagt oppgave som kjører daglig ved midnatt |
| `migrate` | Kjører ventende databasemigreringer. Kalles av arbeidsflyten Deploy Prod |

## Miljøkonfigurasjon

I distribuerte miljøer leses konfigurasjonen fra **AWS SSM Parameter Store** i stedet for `.env`-filer. Dette holder hemmeligheter ute av distribusjonspakken og gjør det mulig å endre konfigurasjon uten å distribuere på nytt.

:::warning
Commit aldri produksjonslegitimasjon til repositoryet. All sensitiv konfigurasjon skal lagres i AWS SSM Parameter Store og hentes ved kjøring.
:::

:::tip
Hver sammenslåing til `main` distribueres først til demomiljøet. Kontroller endringen der (for eksempel på [demo.b1.church](https://demo.b1.church)) før du kjører Deploy Prod.
:::

## Relaterte artikler

- **[Lokalt oppsett av API](../api/local-setup)**: Sette opp API-et for utvikling
- **[Modulstruktur](../api/module-structure)**: Forstå arkitekturen for Lambda-funksjonene
- **[Distribusjon av webapper](./web-apps)**: Distribuere frontend-applikasjonene
