---
title: "Общие библиотеки"
---

# Общие библиотеки

<div class="article-intro">

Общегиповый код ChurchApps опубликован на npm под scope `@churchapps/*`. Все общегиповые пакеты находятся в одном repository -- [Packages](https://github.com/ChurchApps/Packages) -- управляется как Yarn (Berry) workspace и версионирован с [changesets](https://github.com/changesets/changesets).

</div>

## Пакеты

| Package | Description | Used By |
|---------|-------------|---------|
| [`@churchapps/helpers`](./helpers) | Слой основания: функции вспомогательные без фреймворка и общегиповые интерфейсы TypeScript, которые формируют контракт данных cross-app | All projects |
| [`@churchapps/apihelper`](./api-helper) | Утилиты Express на стороне сервера: auth, base controllers, database access, AWS и email integrations | All APIs |
| [`@churchapps/apphelper`](./app-helper) | Общегиповые React components и feature modules (login, donations, forms, markdown, website) | All web apps |
| `@churchapps/content-providers` | Абстракция над поставщиками контента третьих сторон (Lessons.church, Planning Center, Dropbox и другие) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Toolkit для создания B1.church integrations: webhook verification, typed REST client, OAuth helpers | External integration developers |
| `@churchapps/texting` | Абстракция SMS provider (Text In Church, Clearstream, Mutual Ministry, MinistryStuff, Nalo Solutions) | Api |

Направление зависимости строго вниз: приложения зависят от `apihelper` и `apphelper`, которые объявляют `@churchapps/helpers` как **peer dependency**, поэтому каждое приложение разрешает ровно одну копию.

## Настройка Workspace

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

Repo использует Yarn Berry (корневое поле `packageManager` авторитетно) с одним lockfile. `yarn build` строит каждый пакет в порядке зависимости; `yarn test` запускает все тесты пакета.

## Выпуск с Changesets

Каждое изменение в пакет поставляется с changeset:

1. Запустите `yarn changeset` в корне workspace. Выберите пакет(ы), которые вы касались, тип bump (patch = fix, minor = new export или feature, major = breaking) и напишите однострочную сводку -- она становится записью CHANGELOG.
2. Закоммитьте сгенерированный файл `.changeset/*.md` вместе с вашим изменением кода. Pre-commit hook блокирует коммиты, которые изменяют исходный код пакета без staged changeset.
3. Когда готово к публикации, запустите `yarn publish-all` в корне. Это потребляет pending changesets (bumping версии, написание CHANGELOGs, синхронизация внутренних диапазонов зависимостей), строит все в порядке зависимости и публикует bumped пакеты на npm. Затем закоммитьте и отправьте version bumps.

:::warning
Никогда не запускайте raw `npm publish` внутри одного пакета -- это пропускает build ordering и bookkeeping версии, который обрабатывает release скрипт. Публикация требует npm аккаунт с правами публикации на scope `@churchapps`.
:::

## Локальная разработка против потребляющего приложения

Внутри workspace пакеты строят напрямую против своих соседей -- linking не требуется. Для тестирования непубликуемого build пакета внутри потребляющего приложения (B1Admin, B1App, и т.д.), добавьте временный Yarn portal в потребителя:

```bash
# in the consuming project
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

Сначала выстройте пакет (`yarn build` в корне workspace) -- потребитель читает скомпилированный `dist/` output, не исходный.

:::warning
`yarn link` записывает разрешение portal в `package.json` потребителя. Никогда не коммитьте это -- всегда `yarn unlink` и переустановите, когда закончено.
:::
