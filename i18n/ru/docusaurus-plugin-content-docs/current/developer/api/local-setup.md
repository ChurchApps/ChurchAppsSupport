---
title: "Локальная настройка API"
---

# Локальная настройка API

<div class="article-intro">

Это руководство проведёт вас через настройку API ChurchApps для локальной разработки. Вы клонируете репозиторий, настроите подключения к базам данных, инициализируете схему и запустите сервер разработки с горячей перезагрузкой.

</div>

<div class="prereqs">
<h4>Перед началом</h4>

- Установите **Node.js 22+**, **Git** и **MySQL 8.0+** -- см. [Требования](../setup/prerequisites)
- Создайте пользователя MySQL с правами на создание баз данных
- Ознакомьтесь со справочником [Переменные окружения](../setup/environment-variables) для настройки API

</div>

## Пошаговая настройка

### 1. Клонируйте репозиторий

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. Установите зависимости

Проект использует Yarn (защита блокирует `npm install`):

```bash
cd Api
yarn install
```

### 3. Настройте переменные окружения

```bash
cp .env.sample .env
```

Откройте `.env` и настройте строки подключения к MySQL. Каждому модулю нужно собственное подключение к базе данных в следующем формате:

```
mysql://root:password@localhost:3306/dbname
```

Вам понадобятся строки подключения для всех шести баз данных модулей (membership, attendance, content, giving, messaging, doing).

### 4. Инициализируйте базы данных

```bash
npm run initdb
```

Эта команда автоматически создаёт все шесть баз данных и их таблицы.

:::tip
Можно инициализировать базу данных одного модуля командой `npm run initdb -- --module=membership` (или `attendance`, `content`, `giving`, `messaging`, `doing`).
:::

### 5. Запустите сервер разработки

```bash
npm run dev
```

API запускается с горячей перезагрузкой по адресу [http://localhost:8084](http://localhost:8084).

## Основные команды

| Команда | Описание |
|---------|-------------|
| `npm run dev` | Запуск сервера разработки с горячей перезагрузкой (tsx watch) |
| `npm run build` | Очистка, компиляция TypeScript и копирование ресурсов |
| `npm run test` | Запуск тестов Jest (с покрытием кода) |
| `npm run test:watch` | Запуск тестов в режиме наблюдения |
| `npm run lint` | Запуск ESLint с автоисправлением (ESLint — единственный форматировщик) |

## Развёртывание

Тестовая среда (staging) выведена из эксплуатации. API развёртывается в демо-среде при каждом push в `main`, а в продакшен — через ручной workflow **Deploy Prod**, который также применяет ожидающие миграции базы данных. См. [Развёртывание API](../deployment/apis) для подробностей.

## Разработка общих библиотек локально

Если вам нужно разрабатывать общую библиотеку (`@churchapps/helpers` или `@churchapps/apihelper`) вместе с API, соберите её в рабочем пространстве [Packages](https://github.com/ChurchApps/Packages) и добавьте временный Yarn-портал в API:

```bash
# In the Packages workspace
yarn build

# In the API directory
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

Так можно проверить изменения библиотеки с API, не публикуя их в npm. См. [Общие библиотеки](../shared-libraries/#local-development-against-a-consuming-app) — и никогда не коммитьте портальное разрешение, которое link записывает в `package.json`.

## Связанные статьи

- **[База данных](./database)** -- Архитектура базы данных по одной на модуль
- **[Структура модулей](./module-structure)** -- Как организованы контроллеры, репозитории и модели
- **[Общие библиотеки](../shared-libraries/)** -- Работа с `@churchapps/helpers` и `@churchapps/apihelper`
