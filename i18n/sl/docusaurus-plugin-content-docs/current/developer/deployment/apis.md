---
title: "Razmestitev API-ja"
---

# Razmestitev API-ja

<div class="article-intro">

API-ji ChurchApps so razmeščeni kot funkcije AWS Lambda z uporabo ogrodja Serverless Framework. Ta stran opisuje postopek gradnje, razmeščanja in konfiguracije za demo in produkcijsko okolje.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Nastavite API lokalno -- glejte [Lokalna nastavitev API-ja](../api/local-setup)
- Na svojem računalniku konfigurirajte poverilnice AWS
- Preverite, ali imate dostop do ciljnega računa AWS

</div>

## Gradnja

API-ji se za produkcijo zgradijo z uporabo namenske konfiguracije TypeScript:

```bash
npm run build:prod
```

To uporabi `tsconfig.prod.json` za prevajanje projekta za izvajalno okolje Lambda.

## Razmestitev

Razmestitev v demo okolje:

```bash
npm run deploy-demo
```

Razmestitev v produkcijo:

```bash
npm run deploy-prod
```

V praksi API razmešča GitHub Actions: **Deploy Demo** se zažene ob vsakem potisku na `main`, **Deploy Prod** pa se zažene ročno (workflow dispatch). Okolje za pripravo (staging) ni več na voljo.

## Migracije podatkovne baze

**Deploy Prod** med razmestitvijo uporabi čakajoče migracije podatkovne baze. Produkcijske podatkovne baze sprejemajo povezave samo znotraj VPC, zato delovni tok takoj po `serverless deploy` zažene funkcijo Lambda `migrate` (`api-Prod-migrate`), ki izvede čakajoče migracije vseh modulov in vrne `{ ok, environment, modules }`. Če katerikoli modul ne uspe ali je zavrnjen (na primer podatkovna baza brez zgodovine migracij), opravilo ne uspe, tako da shema nikoli ne zaostane za kodo. **Rollback Prod** povrne samo kodo funkcije Lambda; migracije ostanejo uporabljene, zato jih pišite aditivno. Za preverjanje stanja ali ročno izvajanje migracij glejte [Skrbnik strežnika -- Migracije podatkovne baze](../server-admin#database-migrations).

## Kaj se ustvari

Vsaka razmestitev API-ja ustvari ali posodobi naslednje funkcije AWS Lambda:

| Funkcija | Namen |
|----------|-------|
| `web` | Obravnava HTTP zahtevkov prek API Gateway |
| `socket` | Obravnava WebSocket povezav |
| `timer15Min` | Načrtovano opravilo, ki se izvaja vsakih 30 minut (ime je zgodovinsko) |
| `timerMidnight` | Načrtovano opravilo, ki se izvaja vsak dan ob polnoči |
| `migrate` | Uporabi čakajoče migracije podatkovne baze; zažene ga delovni tok Deploy Prod |

## Konfiguracija okolja

V razmeščenih okoljih se konfiguracija bere iz **AWS SSM Parameter Store** namesto datotek `.env`. To skriva skrivnosti pred paketom za razmestitev in omogoča spreminjanje konfiguracije brez ponovne razmestitve.

:::warning
Produkcijskih poverilnic nikoli ne shranjujte v repozitorij. Vso občutljivo konfiguracijo shranite v AWS SSM Parameter Store in do nje dostopajte med izvajanjem.
:::

:::tip
Vsaka združitev v `main` najprej razmesti demo okolje. Pred zagonom Deploy Prod preverite spremembo tam (na primer na [demo.b1.church](https://demo.b1.church)).
:::

## Sorodni članki

- **[Lokalna nastavitev API-ja](../api/local-setup)** -- Nastavitev API-ja za razvoj
- **[Struktura modulov](../api/module-structure)** -- Razumevanje arhitekture funkcij Lambda
- **[Razmestitev spletnih aplikacij](./web-apps)** -- Razmestitev aplikacij za uporabniški vmesnik
