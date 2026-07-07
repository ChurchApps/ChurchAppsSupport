---
title: "ApiHelper"
---

# ApiHelper

<div class="article-intro">

Пакет `@churchapps/apihelper` предоставляет серверные утилиты для всех Express.js API ChurchApps. Он включает базовый класс контроллера, JWT-аутентификацию, утилиты базы данных и интеграции AWS, от которых зависит каждый API-проект.

</div>

<div class="prereqs">
<h4>Перед началом работы</h4>

- Установите **Node.js** и **Git** — см. [Предварительные требования](../setup/prerequisites)
- Ознакомьтесь с установкой [рабочего пространства Packages](./index.md) и потоком выпуска
- Этот пакет зависит от [`@churchapps/helpers`](./helpers) (как зависимость peer) и переэкспортирует его

</div>

## Что входит

- **CustomBaseController** — базовый класс для API-контроллеров, построенный на `inversify-express-utils`
- **Аутентификация** — JWT-аутентификация через `CustomAuthProvider`, `AuthenticatedUser` и `Principal`
- **Утилиты базы данных** — `DB.query` / `DB.queryOne` и класс `Pool` для управления подключениями MySQL, плюс `MySqlHelper` и `DBCreator` для настройки схемы
- **Интеграции AWS** — `AwsHelper` для хранения файлов S3 и чтения SSM Parameter Store
- **Электронная почта** — `EmailHelper` с поддержкой транспортов SES и SMTP
- **Загрузка конфигурации** — `EnvironmentBase` читает строки подключения и секреты из переменных окружения или Parameter Store
- **Прочее** — `EncryptionHelper`, `FileStorageHelper`, `LoggingHelper`, `BasePermissions`, `SlugHelper`

## Настройка для локальной разработки

Этот пакет находится в рабочем пространстве [Packages](https://github.com/ChurchApps/Packages) рядом с другими общими библиотеками:

1. Клонируйте рабочее пространство:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Установите зависимости в корне рабочего пространства:

   ```bash
   cd Packages && yarn install
   ```

3. Соберите (компилирует TypeScript в `dist/`):

   ```bash
   yarn workspace @churchapps/apihelper build
   ```

   Или запустите `yarn build` в корне для сборки каждого пакета в порядке зависимостей.

Для тестирования изменений в потребляющем API используйте временный Yarn portal — см. [Локальная разработка в потребляющем приложении](./index.md#local-development-against-a-consuming-app).

## Публикация

Выпуски выполняются через changesets: запустите `yarn changeset` в корне рабочего пространства с каждым изменением, затем `yarn publish-all` когда будете готовы к выпуску. Полный поток см. в [Обзоре общих библиотек](./index.md#releasing-with-changesets).

:::info
Этот пакет является зависимостью каждого ChurchApps API — основного Api, AskApi и LessonsApi. При внесении изменений тестируйте с API локально перед публикацией.
:::

## Связанные статьи

- **[Helpers](./helpers)** — базовый пакет утилит, от которого зависит этот пакет
- **[Структура модулей](../api/module-structure)** — как контроллеры и middleware аутентификации используются в модулях API
- **[Локальная установка API](../api/local-setup)** — настройка API для локальной разработки
