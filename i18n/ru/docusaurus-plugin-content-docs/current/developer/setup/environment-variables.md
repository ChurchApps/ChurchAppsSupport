---
title: "Переменные окружения"
---

# Переменные окружения

<div class="article-intro">

Каждый проект ChurchApps использует файл `.env` для локальной конфигурации. Каждый проект содержит образец файла, который вы копируете и настраиваете. На этой странице рассматриваются переменные окружения для API, веб-приложений и мобильных приложений, включая выбор между staging и локальным API.

</div>

<div class="prereqs">
<h4>Перед началом работы</h4>

- Установите [предварительные требования](./prerequisites) для вашего проекта
- Клонируйте репозиторий проекта, с которым хотите работать
- Ознакомьтесь с [обзором проектов](./project-overview), чтобы понять, какие модули API нужны вашему проекту

</div>

## Общий паттерн

1. Найдите `dotenv.sample.txt` или `.env.sample` в корне проекта.
2. Скопируйте его в `.env`.
3. Отредактируйте значения по необходимости.

```bash
# Пример для проекта с .env.sample
cp .env.sample .env

# Пример для проекта с dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Никогда не коммитьте файлы `.env` в систему контроля версий.** Они содержат секреты, такие как учётные данные базы данных, API-ключи и JWT-секреты. Все проекты ChurchApps включают `.env` в `.gitignore`, но всегда перепроверяйте перед коммитом.
:::

## Выбор цели API

Самое важное решение -- куда ваш фронтенд направляет API-вызовы. Есть два варианта:

### Вариант 1: Staging API (рекомендуется для фронтенд-разработки)

Используйте общую staging-среду. Локальная настройка API или базы данных не требуется.

```bash
# Шаблон базового URL
https://api.staging.churchapps.org/{module}

# Примеры URL модулей
https://api.staging.churchapps.org/membership
https://api.staging.churchapps.org/attendance
https://api.staging.churchapps.org/content
https://api.staging.churchapps.org/giving
https://api.staging.churchapps.org/messaging
https://api.staging.churchapps.org/doing
```

### Вариант 2: Локальный API

Запустите проект Api на своей машине. Требуется MySQL 8.0+ с базами данных, созданными для каждого модуля. См. руководство по [локальной настройке API](../api/local-setup).

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

Основной проект **Api** (`.env.sample`) имеет наибольшее количество настроек. Вот ключевые переменные:

### Общие настройки

| Переменная | Описание | Пример |
|----------|-------------|---------|
| `ENVIRONMENT` | Среда выполнения | `dev` |
| `SERVER_PORT` | HTTP-порт для локального сервера разработки | `8084` |
| `ENCRYPTION_KEY` | 192-битный ключ шифрования для конфиденциальных данных | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | Секрет для подписи JSON Web Tokens | `jwt-secret-dev` |
| `FILE_STORE` | Где хранить загруженные файлы (`disk` или `s3`) | `disk` |
| `CORS_ORIGIN` | Разрешённые CORS-источники (`*` для локальной разработки) | `*` |

### Подключения к базам данных

Каждый модуль API имеет собственную базу данных MySQL и строку подключения:

| Переменная | База данных |
|----------|----------|
| `MEMBERSHIP_CONNECTION_STRING` | `mysql://root:password@localhost:3306/membership` |
| `ATTENDANCE_CONNECTION_STRING` | `mysql://root:password@localhost:3306/attendance` |
| `CONTENT_CONNECTION_STRING` | `mysql://root:password@localhost:3306/content` |
| `GIVING_CONNECTION_STRING` | `mysql://root:password@localhost:3306/giving` |
| `MESSAGING_CONNECTION_STRING` | `mysql://root:password@localhost:3306/messaging` |
| `DOING_CONNECTION_STRING` | `mysql://root:password@localhost:3306/doing` |

:::tip
Замените `root:password` на ваши реальные учётные данные MySQL. Каждая база данных должна быть создана перед запуском API. Используйте `npm run initdb` для создания схемы всех модулей или `npm run initdb:membership` для отдельного модуля.
:::

### Настройки WebSocket

| Переменная | Описание | Пример |
|----------|-------------|---------|
| `SOCKET_PORT` | Порт для WebSocket-сервера | `8087` |
| `SOCKET_URL` | URL WebSocket для подключения клиентов | `ws://localhost:8087` |

---

## Переменные окружения веб-приложений

### B1Admin (React + Vite)

Файл-образец: `.env.sample`

| Переменная | Описание | Пример (Staging) |
|----------|-------------|-------------------|
| `REACT_APP_STAGE` | Название окружения | `demo` |
| `PORT` | Порт сервера разработки | `3101` |
| `REACT_APP_MEMBERSHIP_API` | URL API Membership | `https://api.staging.churchapps.org/membership` |
| `REACT_APP_ATTENDANCE_API` | URL API Attendance | `https://api.staging.churchapps.org/attendance` |
| `REACT_APP_GIVING_API` | URL API Giving | `https://api.staging.churchapps.org/giving` |
| `REACT_APP_CONTENT_ROOT` | URL доставки контента | `https://content.staging.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | ID Google Analytics (необязательно) | `UA-123456789-1` |

Для локальной разработки API раскомментируйте и используйте варианты с `localhost`:

```bash
REACT_APP_MEMBERSHIP_API=http://localhost:8084/membership
REACT_APP_ATTENDANCE_API=http://localhost:8084/attendance
REACT_APP_GIVING_API=http://localhost:8084/giving
REACT_APP_CONTENT_API=http://localhost:8084/content
REACT_APP_DOING_API=http://localhost:8084/doing
REACT_APP_MESSAGING_API=http://localhost:8084/messaging
```

### B1App (Next.js)

Файл-образец: `.env.sample`

| Переменная | Описание | Пример (Staging) |
|----------|-------------|-------------------|
| `NEXT_PUBLIC_MEMBERSHIP_API` | URL API Membership | `https://api.staging.churchapps.org/membership` |
| `NEXT_PUBLIC_ATTENDANCE_API` | URL API Attendance | `https://api.staging.churchapps.org/attendance` |
| `NEXT_PUBLIC_GIVING_API` | URL API Giving | `https://api.staging.churchapps.org/giving` |
| `NEXT_PUBLIC_MESSAGING_API` | URL API Messaging | `https://api.staging.churchapps.org/messaging` |
| `NEXT_PUBLIC_CONTENT_API` | URL API Content | `https://api.staging.churchapps.org/content` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL доставки контента | `https://staging.churchapps.org/content` |
| `NEXT_PUBLIC_CHURCH_APPS_URL` | Базовый URL ChurchApps | `https://staging.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | ID Google Analytics (необязательно) | `UA-123456789-1` |

:::info
Next.js требует префикс `NEXT_PUBLIC_` для любой переменной окружения, которая должна быть доступна в браузере. Серверные переменные не нуждаются в этом префиксе.
:::

### LessonsApp (Next.js)

Файл-образец: `dotenv.sample.txt`

| Переменная | Описание | Пример (Staging) |
|----------|-------------|-------------------|
| `STAGE` | Стадия окружения | `staging` |
| `NEXT_PUBLIC_LESSONS_API` | URL API уроков | `https://api.staging.lessons.church` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL доставки контента | `https://api.staging.lessons.church/content` |
| `NEXT_PUBLIC_CHURCH_APPS_URL` | Базовый URL ChurchApps | `https://staging.churchapps.org` |

---

## Переменные окружения мобильных приложений

### B1Mobile (React Native / Expo)

Файл-образец: `dotenv.sample.txt`

| Переменная | Описание | Пример (Staging) |
|----------|-------------|-------------------|
| `STAGE` | Название окружения | `dev` |
| `MEMBERSHIP_API` | URL API Membership | `https://api.staging.churchapps.org/membership` |
| `MESSAGING_API` | URL API Messaging | `https://api.staging.churchapps.org/messaging` |
| `ATTENDANCE_API` | URL API Attendance | `https://api.staging.churchapps.org/attendance` |
| `GIVING_API` | URL API Giving | `https://api.staging.churchapps.org/giving` |
| `DOING_API` | URL API Doing | `https://api.staging.churchapps.org/doing` |
| `CONTENT_API` | URL API Content | `https://api.churchapps.org/content` |
| `CONTENT_ROOT` | URL доставки контента | `https://content.staging.churchapps.org` |
| `LESSONS_ROOT` | URL сайта уроков | `https://staging.lessons.church` |

:::info
Мобильные приложения не используют префикс `REACT_APP_` или `NEXT_PUBLIC_`. Доступ к переменным окружения обрабатывается конфигурацией Expo.
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
