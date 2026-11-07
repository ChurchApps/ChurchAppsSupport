---
title: "ApiHelper"
---

# ApiHelper

<div class="article-intro">

Пакет `@churchapps/apihelper` пружа серверске помоћне алатке за све ChurchApps Express.js API-je. Укључује основну класу контролера, JWT аутентификацију, помоћне алатке за базу података и AWS интеграције које сваки API пројекат користи.

</div>

<div class="prereqs">
<h4>Пре почетка</h4>

- Инсталирајте **Node.js** и **Git** -- погледајте [預requisites](../setup/prerequisites)
- Упознајте се са подешавањем [радног простора за пакете](./index.md) и процесом објаве
- Овај пакет зависи од [`@churchapps/helpers`](./helpers) (као peer зависност) и реекспортује га

</div>

## Шта је укључено

- **CustomBaseController** -- основна класа за API контролере, изграђена на `inversify-express-utils`
- **Auth** -- JWT аутентификација преко `CustomAuthProvider`, `AuthenticatedUser` и `Principal`
- **Помоћне алатке за базу података** -- `DB.query` / `DB.queryOne` и класа `Pool` за управљање MySQL конекцијама, као и `MySqlHelper` и `DBCreator` за подешавање шеме
- **AWS интеграције** -- `AwsHelper` за S3 складиштење фајлова и читање из SSM Parameter Store
- **Е-пошта** -- `EmailHelper` са подршком за SES и SMTP транспорт
- **Учитавање конфигурације** -- `EnvironmentBase` чита стрингове за повезивање и тајне из променљивих окружења или Parameter Store-а
- **Остало** -- `EncryptionHelper`, `FileStorageHelper`, `LoggingHelper`, `BasePermissions`, `SlugHelper`

## Подешавање за локални развој

Овај пакет се налази у [Packages](https://github.com/ChurchApps/Packages) радном простору, заједно са осталим дељеним библиотекама:

1. Клонирајте радни простор:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Инсталирајте зависности у корену радног простора:

   ```bash
   cd Packages && yarn install
   ```

3. Изградите пакет (компајлира TypeScript у `dist/`):

   ```bash
   yarn workspace @churchapps/apihelper build
   ```

   Или покрените `yarn build` у корену да бисте изградили све пакете по редоследу зависности.

Да бисте тестирали измене унутар API-ја који га користи, користите привремени Yarn portal -- погледајте [Локални развој са апликацијом која га користи](./index.md#local-development-against-a-consuming-app).

## Објављивање

Издања иду преко changesets-а: покрените `yarn changeset` у корену радног простора уз сваку измену, а затим `yarn publish-all` када будете спремни за издање. Погледајте [Преглед дељених библиотека](./index.md#releasing-with-changesets) за комплетан процес.

:::info
Овај пакет је зависност сваког ChurchApps API-ја -- основног Api-ја, AskApi-ја и LessonsApi-ја. Приликом измена, тестирајте против API-ја локално пре објаве.
:::

## Повезани чланци

- **[Helpers](./helpers)** -- Основни пакет са помоћним алаткама од којег зависи овај пакет
- **[Структура модула](../api/module-structure)** -- Како се контролери и auth middleware користе у API модулима
- **[Локално подешавање API-ја](../api/local-setup)** -- Подешавање API-ја за локални развој
