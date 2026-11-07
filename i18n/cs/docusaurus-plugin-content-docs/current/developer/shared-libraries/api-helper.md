---
title: "ApiHelper"
description: "Reference balíčku @churchapps/apihelper používaného API ChurchApps: lokální build, testování přes Yarn portal a publikování pomocí changesets."
---

# ApiHelper

<div class="article-intro">

Balíček `@churchapps/apihelper` poskytuje pomocné nástroje na straně serveru pro všechna API ChurchApps založená na Express.js. Obsahuje základní třídu kontroléru, autentizaci pomocí JWT, databázové nástroje a integrace s AWS, na kterých závisí každý projekt API.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Nainstalujte **Node.js** a **Git** -- viz [Požadavky](../setup/prerequisites.md)
- Seznamte se s nastavením [pracovního prostoru balíčků](./index.md) a postupem vydávání
- Tento balíček závisí na [`@churchapps/helpers`](./helpers.md) (jako peer dependency) a znovu jej exportuje

</div>

## Co je obsaženo

- **CustomBaseController** -- základní třída pro kontroléry API postavená na `inversify-express-utils`
- **Auth** -- autentizace JWT pomocí `CustomAuthProvider`, `AuthenticatedUser` a `Principal`
- **Databázové nástroje** -- `DB.query` / `DB.queryOne` a třída `Pool` pro správu připojení k MySQL, plus `MySqlHelper` a `DBCreator` pro nastavení schématu
- **Integrace s AWS** -- `AwsHelper` pro ukládání souborů do S3 a čtení z SSM Parameter Store
- **E-mail** -- `EmailHelper` podporující přenosy SES a SMTP
- **Načítání konfigurace** -- `EnvironmentBase` načítá připojovací řetězce a tajné údaje z proměnných prostředí nebo Parameter Store
- **Různé** -- `EncryptionHelper`, `FileStorageHelper`, `LoggingHelper`, `BasePermissions`, `SlugHelper`

## Nastavení pro místní vývoj

Tento balíček je součástí [pracovního prostoru Packages](https://github.com/ChurchApps/Packages) spolu s dalšími sdílenými knihovnami:

1. Naklonujte pracovní prostor:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Nainstalujte závislosti v kořenovém adresáři pracovního prostoru:

   ```bash
   cd Packages && yarn install
   ```

3. Sestavte balíček (zkompiluje TypeScript do `dist/`):

   ```bash
   yarn workspace @churchapps/apihelper build
   ```

   Nebo spusťte `yarn build` v kořenovém adresáři a sestavte všechny balíčky v pořadí podle závislostí.

Chcete-li otestovat změny uvnitř navazujícího API, použijte dočasný Yarn portal -- viz [Místní vývoj s navazující aplikací](./index.md#local-development-against-a-consuming-app).

## Vydávání

Vydání probíhají přes changesets: u každé změny spusťte v kořenovém adresáři pracovního prostoru `yarn changeset` a až budete připraveni vydat, spusťte `yarn publish-all`. Úplný postup najdete v [přehledu sdílených knihoven](./index.md#releasing-with-changesets).

:::info
Tento balíček je závislostí každého API ChurchApps -- základního Api, AskApi a LessonsApi. Při změnách jej otestujte na lokálně spuštěném API, než jej vydáte.
:::

## Související články

- **[Helpers](./helpers.md)** -- základní balíček nástrojů, na kterém tento balíček závisí
- **[Struktura modulů](../api/module-structure.md)** -- jak se kontroléry a autentizační middleware používají v modulech API
- **[Místní nastavení API](../api/local-setup.md)** -- nastavení API pro místní vývoj
