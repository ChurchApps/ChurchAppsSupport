---
title: "Distribution av API"
---

# Distribution av API

<div class="article-intro">

ChurchApps API:er distribueras som AWS Lambda-funktioner med hjälp av Serverless Framework. Den här sidan beskriver arbetsflödet för bygge, driftsättning och konfiguration för demo- och produktionsmiljöerna.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Konfigurera API:et lokalt -- se [Lokal API-konfiguration](../api/local-setup)
- Konfigurera AWS-autentiseringsuppgifter på din dator
- Kontrollera att du har åtkomst till målkontot i AWS

</div>

## Bygge

API:er byggs för produktion med en dedicerad TypeScript-konfiguration:

```bash
npm run build:prod
```

Detta använder `tsconfig.prod.json` för att kompilera projektet för Lambda-körmiljön.

## Driftsättning

Driftsätt till demomiljön:

```bash
npm run deploy-demo
```

Driftsätt till produktion:

```bash
npm run deploy-prod
```

I praktiken driftsätts API:et av GitHub Actions: **Deploy Demo** körs vid varje push till main, och **Deploy Prod** startas manuellt (workflow dispatch). Det finns inte längre någon testmiljö (staging).

## Databasmigreringar

**Deploy Prod** tillämpar väntande databasmigreringar som en del av driftsättningen. Produktionsdatabaserna accepterar endast anslutningar från insidan av VPC:n, så direkt efter `serverless deploy` anropar arbetsflödet Lambda-funktionen `migrate` (`api-Prod-migrate`), som kör varje moduls väntande migreringar och returnerar `{ ok, environment, modules }`. Om någon modul misslyckas eller nekas (till exempel en databas utan migreringshistorik) misslyckas jobbet, så att schemat aldrig hamnar efter koden. **Rollback Prod** återställer endast Lambda-koden; migreringar förblir tillämpade, så håll dem additiva. Se [Serveradministration -- Databasmigreringar](../server-admin#database-migrations) för att kontrollera status eller köra migreringar manuellt.

## Vad som skapas

Varje API-driftsättning skapar eller uppdaterar följande AWS Lambda-funktioner:

| Funktion | Syfte |
|----------|---------|
| `web` | HTTP-begärandehanterare via API Gateway |
| `socket` | Hanterare för WebSocket-anslutningar |
| `timer15Min` | Schemalagd uppgift som körs var 30:e minut (namnet är av historiska skäl) |
| `timerMidnight` | Schemalagd uppgift som körs dagligen vid midnatt |
| `migrate` | Tillämpar väntande databasmigreringar; anropas av arbetsflödet Deploy Prod |

## Miljökonfiguration

I driftsatta miljöer läss konfigurationen från **AWS SSM Parameter Store** i stället för från `.env`-filer. Detta håller hemligheter utanför driftsättningspaketet och gör det möjligt att ändra konfigurationen utan att driftsätta om.

:::warning
Committa aldrig produktionsuppgifter till förvaret. All känslig konfiguration ska lagras i AWS SSM Parameter Store och läsas vid körning.
:::

:::tip
Varje sammanfogning till `main` driftsätts först till demomiljön. Kontrollera dina ändringar där (till exempel på [demo.b1.church](https://demo.b1.church)) innan du kör Deploy Prod.
:::

## Relaterade artiklar

- **[Lokal API-konfiguration](../api/local-setup)** -- Konfigurera API:et för utveckling
- **[Modulstruktur](../api/module-structure)** -- Förstå arkitekturen för Lambda-funktionerna
- **[Distribution av webbappar](./web-apps)** -- Driftsätta frontend-applikationerna
