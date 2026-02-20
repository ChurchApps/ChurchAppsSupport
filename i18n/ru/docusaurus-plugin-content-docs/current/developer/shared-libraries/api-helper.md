---
title: "ApiHelper"
---

# ApiHelper

<div class="article-intro">

Пакет `@churchapps/apihelper` предоставляет серверные утилиты для всех Express.js API ChurchApps. Он включает базовый класс контроллера, middleware JWT-аутентификации, утилиты базы данных и интеграции с AWS, от которых зависит каждый API-проект.

</div>

<div class="prereqs">
<h4>Перед началом работы</h4>

- Установите **Node.js** и **Git** -- см. [Предварительные требования](../setup/prerequisites)
- Ознакомьтесь с [процессом работы npm link](./index.md) для локальной разработки
- Этот пакет зависит от [`@churchapps/helpers`](./helpers)

</div>

## Что входит в пакет

- **CustomBaseController** -- базовый класс для API-контроллеров
- **Middleware аутентификации** -- JWT-аутентификация через `CustomAuthProvider`
- **Утилиты базы данных** -- `DB.query`, `EnhancedPoolHelper` для управления MySQL-соединениями
- **Интеграции с AWS** -- хелперы для S3, SSM Parameter Store и других сервисов AWS
- **Настройка Inversify DI** -- конфигурация контейнера внедрения зависимостей

## Настройка для локальной разработки

1. Клонируйте репозиторий:

   ```bash
   git clone https://github.com/ChurchApps/ApiHelper.git
   ```

2. Установите зависимости:

   ```bash
   cd ApiHelper && npm install
   ```

3. Соберите пакет (компилирует TypeScript в `dist/`):

   ```bash
   npm run build
   ```

4. Сделайте его доступным для локального связывания:

   ```bash
   npm link
   ```

## Основные команды

| Команда | Описание |
|---------|-------------|
| `npm run build` | Компиляция TypeScript в `dist/` |
| `npm run lint` | Запуск ESLint |
| `npm run lint:fix` | Запуск ESLint с автоисправлением |
| `npm run format` | Форматирование кода с Prettier |

:::info
Этот пакет является зависимостью каждого API ChurchApps. При внесении изменений используйте `npm link` для тестирования с API локально перед публикацией.
:::

## Связанные статьи

- **[Helpers](./helpers)** -- Базовый пакет утилит, от которого зависит этот пакет
- **[Структура модулей](../api/module-structure)** -- Как контроллеры и middleware аутентификации используются в модулях API
- **[Локальная настройка API](../api/local-setup)** -- Настройка API для локальной разработки
