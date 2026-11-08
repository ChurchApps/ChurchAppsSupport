---
title: "Переменные окружения"
description: "Настройте файлы .env для проектов ChurchApps, выберите общий demo API или локальный API и заполните переменные для B1 Admin, B1.church, B1 Checkin и других."
---

# Переменные окружения

<div class="article-intro">

Каждый проект ChurchApps использует файл `.env` для локальной настройки. В каждом проекте есть пример файла, который вы копируете и изменяете. На этой странице описаны переменные окружения для API, веб-приложений и мобильных приложений, а также то, как выбрать между demo и локальным API.

</div>

<div class="prereqs">
<h4>Перед началом работы</h4>

- Установите [предварительные требования](./prerequisites.md) для вашего проекта
- Клонируйте репозиторий проекта, с которым хотите работать
- Ознакомьтесь с [обзором проекта](./project-overview.md), чтобы понять, какие модули API нужны вашему проекту

</div>

## Общий порядок действий

1. Найдите `dotenv.sample.txt` или `.env.sample` в корне проекта.
2. Скопируйте его в `.env`.
3. При необходимости измените значения.

```bash
# Пример для проекта с .env.sample
cp .env.sample .env

# Пример для проекта с dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Никогда не добавляйте файлы `.env` в систему контроля версий.** Они содержат секреты, такие как учетные данные базы данных, API-ключи и JWT-секреты. Все проекты ChurchApps включают `.env` в `.gitignore`, но всегда проверяйте перед коммитом.
:::

## Выбор цели API

Самое важное решение — куда будет обращаться фронтенд для вызовов API. Есть два варианта:

### Вариант 1: demo API (рекомендуется для разработки фронтенда)

Используйте общее demo-окружение. Локальный API и настройка базы данных не требуются. Оно работает на последнем коде из `main`, а его тестовые данные обновляются каждую ночь.

```bash
# Шаблон базового URL
https://api.demo.churchapps.org/{module}

# Примеры URL модулей
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/content
https://api.demo.churchapps.org/giving
https://api.demo.churchapps.org/messaging
https://api.demo.churchapps.org/doing
```

:::warning
Тестовое окружение (`api.staging.churchapps.org`, `api.staging.lessons.church` и связанные хосты) выведено из эксплуатации. Некоторые примеры файлов `.env` могут всё ещё содержать URL тестового окружения; замените их значениями demo или локального API, показанными на этой странице. Общего непроизводственного API Lessons больше нет — если он вам нужен, запустите [LessonsApi](https://github.com/ChurchApps/LessonsApi) локально (он слушает порт `8090`).
:::

### Вариант 2: локальный API

Запустите проект Api на своем компьютере. Требуется MySQL 8.0+ с базами данных, созданными для каждого модуля. См. руководство [локальной настройке API](../api/local-setup.md).

```bash
# Шаблон базового URL
http://localhost:8084/{module}

# Примеры URL модулей
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## Переменные окружения API

В основном проекте **Api** (`.env.sample`) больше всего настроек. Вот ключевые переменные:

### Общие настройки

| Переменная | Описание | Пример |
|----------|-------------|---------|
| `ENVIRONMENT` | Среда выполнения | `dev` |
| `SERVER_PORT` | HTTP-порт локального сервера разработки | `8084` |
| `ENCRYPTION_KEY` | 192-битный ключ шифрования для конфиденциальных данных | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | Секрет для подписи JSON Web Tokens | `jwt-secret-dev` |
| `FILE_STORE` | Где хранить загруженные файлы (`disk` или `s3`) | `disk` |
| `CORS_ORIGIN` | Разрешенные источники CORS (`*` для локальной разработки) | `*` |

### Подключение к базе данных

Один базовый URL указывает API на MySQL. API создает отдельную базу данных для каждого модуля (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`) на основе этого базового URL.

| Переменная | Пример |
|----------|---------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
Замените `root:password` на ваши реальные учетные данные MySQL. Каждая база данных модуля должна существовать до запуска API. Используйте `npm run initdb`, чтобы создать схему для всех модулей, или `npm run initdb:membership` для одного модуля.
:::

### Настройки WebSocket

| Переменная | Описание | Пример |
|----------|-------------|---------|
| `SOCKET_PORT` | Порт сервера WebSocket | `8087` |
| `SOCKET_URL` | URL WebSocket, к которому подключаются клиенты | `ws://localhost:8087` |

---

## Переменные окружения веб-приложений

### B1Admin (React + Vite)

Файл-пример: `.env.sample`

| Переменная | Описание | Пример (Demo) |
|----------|-------------|----------------|
| `REACT_APP_STAGE` | Название окружения | `demo` |
| `PORT` | Порт сервера разработки | `3101` |
| `REACT_APP_API_BASE` | Единый базовый URL для всех API ChurchApps (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` добавляются автоматически) | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | URL доставки контента | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | Идентификатор Google Analytics (необязательно) | `UA-123456789-1` |

Для разработки с локальным API укажите базовый URL на ваш локальный стек:

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App (Next.js)

Файл-пример: `.env.sample`

| Переменная | Описание | Пример (Demo) |
|----------|-------------|----------------|
| `NEXT_PUBLIC_API_BASE` | Единый базовый URL для всех API ChurchApps (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` добавляются автоматически) | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL доставки контента | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | Идентификатор Google Analytics (необязательно) | `UA-123456789-1` |

:::info
Next.js требует префикс `NEXT_PUBLIC_` для любой переменной окружения, которая должна быть доступна в браузере. Переменные, используемые только на сервере, этот префикс не требуют.
:::

### LessonsApp (Next.js)

Файл-пример: `dotenv.sample.txt`

| Переменная | Описание | Пример (локальный LessonsApi) |
|----------|-------------|----------------------------|
| `STAGE` | Стадия окружения (оставьте неустановленной или `dev` для локальной разработки) | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | URL API Lessons | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL доставки контента | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | Базовый URL API ChurchApps, используемый для входа (учитывается только если `STAGE` не задан или равен `dev`) | `https://api.demo.churchapps.org` |

---

## Переменные окружения мобильных приложений

### B1Checkin (React Native / Expo)

Файл-пример: `dotenv.sample.txt`

| Переменная | Описание | Пример |
|----------|-------------|---------|
| `EXPO_PUBLIC_STAGE` | Выбирает набор API, к которому подключается приложение: `dev` (локальный API по адресу `http://127.0.0.1:8084`), `staging` или `prod` (по умолчанию, если не задано) | `dev` |

B1Checkin использует только модули API Membership и Attendance, а также URL доставки контента; их адреса для каждой стадии задаются в `src/helpers/EnvironmentHelper.ts`.

:::info
Expo встраивает в бандл приложения только переменные с префиксом `EXPO_PUBLIC_`. После изменения `.env` перезапустите сервер разработки командой `yarn start --reset-cache`.
:::

---

## Краткая справка: расположение файлов-примеров

| Проект | Файл-пример |
|---------|-------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
