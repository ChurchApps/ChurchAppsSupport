---
title: "Переменные окружения"
---

# Переменные окружения

<div class="article-intro">

Каждый проект ChurchApps использует файл `.env` для локальной конфигурации. Каждый проект включает пример файла, который вы копируете и настраиваете. На этой странице описаны переменные окружения для API, веб-приложений и мобильных приложений, включая выбор между демо-API и локальным API.

</div>

<div class="prereqs">
<h4>Перед началом</h4>

- Установите [предварительные требования](./prerequisites) для вашего проекта
- Клонируйте репозиторий проекта, над которым хотите работать
- Ознакомьтесь с [Обзором проектов](./project-overview), чтобы понять, какие модули API нужны вашему проекту

</div>

## Общая схема

1. Найдите `dotenv.sample.txt` или `.env.sample` в корне проекта.
2. Скопируйте его в `.env`.
3. Измените значения по необходимости.

```bash
# Example for a project with .env.sample
cp .env.sample .env

# Example for a project with dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Никогда не коммитьте файлы `.env` в систему контроля версий.** Они содержат секреты, такие как учётные данные базы данных, ключи API и секреты JWT. Все проекты ChurchApps включают `.env` в `.gitignore`, но всегда перепроверяйте перед коммитом.
:::

## Выбор цели API

Самое важное решение — куда ваш фронтенд отправляет запросы к API. Есть два варианта:

### Вариант 1: демо-API (рекомендуется для разработки фронтенда)

Используйте общую демо-среду. Не нужны ни локальный API, ни настройка базы данных. Она работает на последней версии кода из `main`, а её демонстрационные данные обновляются каждую ночь.

```bash
# Base URL pattern
https://api.demo.churchapps.org/{module}

# Example module URLs
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/content
https://api.demo.churchapps.org/giving
https://api.demo.churchapps.org/messaging
https://api.demo.churchapps.org/doing
```

:::warning
Тестовая среда (`api.staging.churchapps.org`, `api.staging.lessons.church` и связанные хосты) выведена из эксплуатации. Некоторые примеры файлов `.env` могут всё ещё содержать URL тестовой среды; замените их демо- или локальными значениями, указанными на этой странице. Общего непроизводственного API Lessons нет -- запустите [LessonsApi](https://github.com/ChurchApps/LessonsApi) локально (он слушает порт `8090`), если он вам нужен.
:::

### Вариант 2: локальный API

Запустите проект Api на своей машине. Требуется MySQL 8.0+ с базами данных, созданными для каждого модуля. См. руководство [Локальная настройка API](../api/local-setup).

```bash
# Base URL pattern
http://localhost:8084/{module}

# Example module URLs
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## Переменные окружения API

Основной проект **Api** (`.env.sample`) имеет самую обширную конфигурацию. Вот ключевые переменные:

### Общие настройки

| Переменная | Описание | Пример |
|----------|-------------|---------|
| `ENVIRONMENT` | Среда выполнения | `dev` |
| `SERVER_PORT` | HTTP-порт локального сервера разработки | `8084` |
| `ENCRYPTION_KEY` | 192-битный ключ шифрования для конфиденциальных данных | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | Секрет для подписи JSON Web Tokens | `jwt-secret-dev` |
| `FILE_STORE` | Где хранить загруженные файлы (`disk` или `s3`) | `disk` |
| `CORS_ORIGIN` | Разрешённые источники CORS (`*` для локальной разработки) | `*` |

### Подключение к базе данных

Один базовый URL указывает API на MySQL. API создаёт отдельную базу данных для каждого модуля (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`) на основе этого базового URL.

| Переменная | Пример |
|----------|---------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
Замените `root:password` на ваши реальные учётные данные MySQL. Каждая база данных модуля должна существовать до запуска API. Используйте `npm run initdb`, чтобы создать схему для всех модулей, или `npm run initdb:membership` для одного модуля.
:::

### Настройки WebSocket

| Переменная | Описание | Пример |
|----------|-------------|---------|
| `SOCKET_PORT` | Порт сервера WebSocket | `8087` |
| `SOCKET_URL` | URL WebSocket для подключения клиентов | `ws://localhost:8087` |

---

## Переменные окружения веб-приложений

### B1Admin (React + Vite)

Файл-образец: `.env.sample`

| Переменная | Описание | Пример (демо) |
|----------|-------------|----------------|
| `REACT_APP_STAGE` | Название среды | `demo` |
| `PORT` | Порт сервера разработки | `3101` |
| `REACT_APP_API_BASE` | Единый базовый URL для всех API ChurchApps (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` добавляются автоматически) | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | URL доставки контента | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | ID Google Analytics (необязательно) | `UA-123456789-1` |

Для разработки с локальным API укажите базовый URL на ваш локальный стек:

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App (Next.js)

Файл-образец: `.env.sample`

| Переменная | Описание | Пример (демо) |
|----------|-------------|----------------|
| `NEXT_PUBLIC_API_BASE` | Единый базовый URL для всех API ChurchApps (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` добавляются автоматически) | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL доставки контента | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | ID Google Analytics (необязательно) | `UA-123456789-1` |

:::info
Next.js требует префикс `NEXT_PUBLIC_` для любой переменной окружения, которая должна быть доступна в браузере. Переменные, используемые только на сервере, этот префикс не требуют.
:::

### LessonsApp (Next.js)

Файл-образец: `dotenv.sample.txt`

| Переменная | Описание | Пример (локальный LessonsApi) |
|----------|-------------|----------------------------|
| `STAGE` | Стадия среды (оставьте неустановленной или `dev` для локальной разработки) | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | URL API Lessons | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL доставки контента | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | Базовый URL API ChurchApps для входа (учитывается только если `STAGE` не задан или равен `dev`) | `https://api.demo.churchapps.org` |

---

## Переменные окружения мобильных приложений

### B1Mobile (React Native / Expo)

Файл-образец: `dotenv.sample.txt`

| Переменная | Описание | Пример (демо) |
|----------|-------------|----------------|
| `STAGE` | Название среды | `dev` |
| `MEMBERSHIP_API`, `ATTENDANCE_API`, `GIVING_API`, `DOING_API`, `MESSAGING_API`, `CONTENT_API` | Один URL на каждый модуль API ChurchApps (каждый по умолчанию указывает на производственную среду, если не задан) | `https://api.demo.churchapps.org/membership` |
| `LESSONS_API` | API Lessons (отдельный хост; общего непроизводственного нет) | `https://api.lessons.church` |
| `CONTENT_ROOT` | URL доставки контента | `https://democontent.churchapps.org` |
| `LESSONS_ROOT` | URL сайта Lessons | `https://lessons.church` |

:::info
Мобильные приложения не используют префиксы `REACT_APP_` или `NEXT_PUBLIC_`. Доступ к переменным окружения обеспечивается конфигурацией Expo.
:::

---

## Краткий справочник: расположение файлов-образцов

| Проект | Файл-образец |
|---------|-------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Mobile | `dotenv.sample.txt` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
