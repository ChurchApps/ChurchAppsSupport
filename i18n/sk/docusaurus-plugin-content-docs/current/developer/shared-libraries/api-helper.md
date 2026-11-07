---
title: "ApiHelper"
description: "Referencia k balíku @churchapps/apihelper používanému Express API v workspace Packages: lokálne zostavenie, testovanie cez Yarn portal a publikovanie cez changesets."
---

# ApiHelper

<div class="article-intro">

Balík `@churchapps/apihelper` poskytuje serverové pomocné nástroje pre všetky Express.js API ChurchApps. Obsahuje základnú triedu kontrolérov, autentifikáciu pomocou JWT, databázové pomocné nástroje a integrácie s AWS, na ktorých závisí každý projekt API.

</div>

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Nainštalujte **Node.js** a **Git** -- pozri [Požiadavky](../setup/prerequisites.md)
- Oboznámte sa s nastavením a postupom vydávania v [pracovnom priestore Packages](./index.md)
- Tento balík závisí od [`@churchapps/helpers`](./helpers.md) (ako peer závislosť) a znovu ho exportuje

</div>

## Čo je zahrnuté

- **CustomBaseController** -- základná trieda pre kontroléry API, postavená na `inversify-express-utils`
- **Auth** -- autentifikácia JWT pomocou `CustomAuthProvider`, `AuthenticatedUser` a `Principal`
- **Databázové pomocné nástroje** -- `DB.query` / `DB.queryOne` a trieda `Pool` na správu pripojení k MySQL, plus `MySqlHelper` a `DBCreator` na nastavenie schémy
- **Integrácie s AWS** -- `AwsHelper` pre úložisko súborov S3 a čítanie z SSM Parameter Store
- **E-mail** -- `EmailHelper` podporujúci prenosy SES a SMTP
- **Načítanie konfigurácie** -- `EnvironmentBase` číta reťazce pripojenia a tajomstvá z premenných prostredia alebo z Parameter Store
- **Rôzne** -- `EncryptionHelper`, `FileStorageHelper`, `LoggingHelper`, `BasePermissions`, `SlugHelper`

## Nastavenie pre lokálny vývoj

Tento balík sa nachádza v pracovnom priestore [Packages](https://github.com/ChurchApps/Packages) spolu s ostatnými zdieľanými knižnicami:

1. Naklonujte pracovný priestor:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Nainštalujte závislosti v koreňovom adresári pracovného priestoru:

   ```bash
   cd Packages && yarn install
   ```

3. Zostavte (skompiluje TypeScript do `dist/`):

   ```bash
   yarn workspace @churchapps/apihelper build
   ```

   Alebo spustite `yarn build` v koreňovom adresári, čím zostavíte všetky balíky v poradí podľa závislostí.

Ak chcete testovať zmeny vo vnútri API, ktoré balík používa, použite dočasný Yarn portal -- pozri [Lokálny vývoj s aplikáciou, ktorá balík používa](./index.md#local-development-against-a-consuming-app).

## Vydávanie

Vydania prebiehajú cez changesets: pri každej zmene spustite `yarn changeset` v koreňovom adresári pracovného priestoru a keď budete pripravení na vydanie, spustite `yarn publish-all`. Úplný postup nájdete v [Prehľade zdieľaných knižníc](./index.md#releasing-with-changesets).

:::info
Tento balík je závislosťou každého API ChurchApps -- hlavného Api, AskApi a LessonsApi. Pri zmenách ich otestujte lokálne na API pred publikovaním.
:::

## Súvisiace články

- **[Helpers](./helpers.md)** -- Základný balík pomocných nástrojov, na ktorom tento balík závisí
- **[Štruktúra modulov](../api/module-structure.md)** -- Ako sa kontroléry a autentifikačný middleware používajú v moduloch API
- **[Lokálne nastavenie API](../api/local-setup.md)** -- Nastavenie API pre lokálny vývoj
