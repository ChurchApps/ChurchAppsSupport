---
title: "Nasadenie API"
description: "Nasadenie API ChurchApps do AWS Lambda pomocou Serverless vrátane zostavení, pracovných postupov demo a produkcie, migrácií databázy a konfigurácie SSM."
---

# Nasadenie API

<div class="article-intro">

API ChurchApps sa nasadzujú ako funkcie AWS Lambda pomocou Serverless Frameworku. Táto stránka popisuje postup zostavenia, nasadenia a konfigurácie pre demo a produkčné prostredie.

</div>

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Nastavte API lokálne -- pozri [Lokálne nastavenie API](../api/local-setup.md)
- Na svojom počítači nakonfigurujte prihlasovacie údaje AWS
- Uistite sa, že máte prístup k cieľovému účtu AWS

</div>

## Zostavenie

API sa zostavujú pre produkciu pomocou samostatnej konfigurácie TypeScriptu:

```bash
npm run build:prod
```

Týmto príkazom sa pomocou `tsconfig.prod.json` skompiluje projekt pre runtime Lambda.

## Nasadenie

Nasadenie do demo prostredia:

```bash
npm run deploy-demo
```

Nasadenie do produkcie:

```bash
npm run deploy-prod
```

V praxi API nasadzujú GitHub Actions: workflow **Deploy Demo** sa spúšťa pri každom odoslaní zmien do vetvy `main` a **Deploy Prod** sa spúšťa manuálne (workflow dispatch). Staging prostredie už neexistuje.

## Migrácie databázy

**Deploy Prod** počas nasadenia aplikuje čakajúce migrácie databázy. Produkčné databázy prijímajú pripojenia iba zvnútra VPC, preto workflow hneď po `serverless deploy` zavolá Lambda funkciu `migrate` (`api-Prod-migrate`), ktorá spustí čakajúce migrácie každého modulu a vráti `{ ok, environment, modules }`. Ak niektorý modul zlyhá alebo je odmietnutý (napríklad databáza bez histórie migrácií), úloha zlyhá, aby schéma nikdy nezaostala za kódom. **Rollback Prod** vracia iba kód Lambda funkcií; migrácie zostávajú aplikované, preto ich píšte ako aditívne. Informácie o kontrole stavu alebo o ručnom spúšťaní migrácií nájdete v časti [Správa servera -- Migrácie databázy](../server-admin.md#database-migrations).

## Čo sa vytvára

Každé nasadenie API vytvorí alebo aktualizuje tieto funkcie AWS Lambda:

| Funkcia | Účel |
|----------|---------|
| `web` | Spracovanie HTTP požiadaviek cez API Gateway |
| `socket` | Spracovanie WebSocket pripojení |
| `timer15Min` | Naplánovaná úloha, ktorá sa spúšťa každých 30 minút (názov je historický) |
| `timerMidnight` | Naplánovaná úloha, ktorá sa spúšťa denne o polnoci |
| `migrate` | Aplikuje čakajúce migrácie databázy; volaná workflowom Deploy Prod |

## Konfigurácia prostredia

V nasadených prostrediach sa konfigurácia načítava z **AWS SSM Parameter Store** namiesto súborov `.env`. Tým sa tajné údaje nedostanú do balíka nasadenia a konfiguráciu je možné meniť bez opätovného nasadenia.

:::warning
Produkčné prihlasovacie údaje nikdy necommitujte do repozitára. Všetky citlivé konfiguračné údaje by mali byť uložené v AWS SSM Parameter Store a načítavané za behu.
:::

:::tip
Každé zlúčenie do vetvy `main` najskôr nasadí zmeny do demo prostredia. Pred spustením Deploy Prod si zmenu overte práve tam (napríklad na [demo.b1.church](https://demo.b1.church)).
:::

## Súvisiace články

- **[Lokálne nastavenie API](../api/local-setup.md)** -- Nastavenie API na vývoj
- **[Štruktúra modulov](../api/module-structure.md)** -- Pochopenie architektúry funkcií Lambda
- **[Nasadenie webových aplikácií](./web-apps.md)** -- Nasadenie frontendových aplikácií
