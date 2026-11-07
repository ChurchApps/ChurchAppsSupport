---
title: "ApiHelper"
---

# ApiHelper

<div class="article-intro">

Пакет `@churchapps/apihelper` надає серверні утиліти для всіх Express.js API ChurchApps. Він містить базовий клас контролера, автентифікацію JWT, утиліти для бази даних та інтеграції з AWS, від яких залежить кожен проєкт API.

</div>

<div class="prereqs">
<h4>Перш ніж почати</h4>

- Встановіть **Node.js** та **Git** -- див. [Передумови](../setup/prerequisites)
- Ознайомтеся з налаштуванням [робочого простору Packages](./index.md) та процесом випуску
- Цей пакет залежить від [`@churchapps/helpers`](./helpers) (як peer-залежність) і повторно його експортує

</div>

## Що входить до складу

- **CustomBaseController** -- базовий клас для контролерів API, побудований на `inversify-express-utils`
- **Auth** -- автентифікація JWT через `CustomAuthProvider`, `AuthenticatedUser` та `Principal`
- **Утиліти бази даних** -- `DB.query` / `DB.queryOne` та клас `Pool` для керування з'єднаннями MySQL, а також `MySqlHelper` і `DBCreator` для налаштування схеми
- **Інтеграції з AWS** -- `AwsHelper` для зберігання файлів у S3 та читання з SSM Parameter Store
- **Електронна пошта** -- `EmailHelper`, що підтримує транспорти SES та SMTP
- **Завантаження конфігурації** -- `EnvironmentBase` читає рядки підключення та секрети зі змінних середовища або Parameter Store
- **Різне** -- `EncryptionHelper`, `FileStorageHelper`, `LoggingHelper`, `BasePermissions`, `SlugHelper`

## Налаштування для локальної розробки

Цей пакет міститься в [робочому просторі Packages](https://github.com/ChurchApps/Packages) разом з іншими спільними бібліотеками:

1. Клонуйте робочий простір:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Встановіть залежності в корені робочого простору:

   ```bash
   cd Packages && yarn install
   ```

3. Зберіть пакет (компілює TypeScript у `dist/`):

   ```bash
   yarn workspace @churchapps/apihelper build
   ```

   Або виконайте `yarn build` у корені, щоб зібрати всі пакети в порядку залежностей.

Щоб тестувати зміни всередині API, що його використовує, скористайтеся тимчасовим portal Yarn -- див. [Локальна розробка з додатком, що використовує пакет](./index.md#local-development-against-a-consuming-app).

## Публікація

Випуски проходять через changesets: виконуйте `yarn changeset` у корені робочого простору з кожною зміною, а потім `yarn publish-all`, коли будете готові до випуску. Повний процес див. у [Огляді спільних бібліотек](./index.md#releasing-with-changesets).

:::info
Цей пакет є залежністю кожного API ChurchApps -- основного Api, AskApi та LessonsApi. Вносячи зміни, тестуйте їх на локально запущеному API перед публікацією.
:::

## Пов'язані статті

- **[Helpers](./helpers)** -- базовий пакет утиліт, від якого залежить цей пакет
- **[Структура модулів](../api/module-structure)** -- як контролери та middleware автентифікації використовуються в модулях API
- **[Локальне налаштування API](../api/local-setup)** -- налаштування API для локальної розробки
