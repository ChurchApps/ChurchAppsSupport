---
title: "Променљиве окружења"
description: "Подесите .env датотеке за ChurchApps пројекте, изаберите заједнички демо API или локални, и попуните променљиве за B1 Admin, B1.church, B1 Checkin и друге."
---

# Променљиве окружења

<div class="article-intro">

Сваки ChurchApps пројекат користи `.env` датотеку за локалну конфигурацију. Сваки пројекат укључује пример датотеке коју копирате и прилагодите. Ова страница описује променљиве окружења за API-је, веб апликације и мобилне апликације, укључујући избор између демо и локалних API циљева.

</div>

<div class="prereqs">
<h4>Пре почетка</h4>

- Инсталирајте [предуслове](./prerequisites.md) за свој пројекат
- Клонирајте репозиторијум пројекта на коме желите да радите
- Погледајте [Преглед пројекта](./project-overview.md) да бисте разумели које API модуле ваш пројекат захтева

</div>

## Општи образац

1. Потражите `dotenv.sample.txt` или `.env.sample` у корену пројекта.
2. Копирајте га у `.env`.
3. Уредите вредности по потреби.

```bash
# Example for a project with .env.sample
cp .env.sample .env

# Example for a project with dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Никада не додајте `.env` датотеке у систем контроле верзија.** Оне садрже тајне податке као што су акредитиви базе података, API кључеви и JWT тајне. Сви ChurchApps пројекти укључују `.env` у `.gitignore`, али увек проверите пре комитовања.
:::

## Избор API циља

Најважнија одлука је где ваш фронтенд упућује API позиве. Постоје две опције:

### Опција 1: Демо API-ји (препоручено за развој фронтенда)

Користите заједничко демо окружење. Није потребно подешавање локалног API-ја или базе података. Покреће најновији код са `main` грани, а његови примерни подаци се обнављају сваке ноћи.

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
Стејџинг (staging) окружење (`api.staging.churchapps.org`, `api.staging.lessons.church` и сродни хостови) је укинуто. Неке примерне `.env` датотеке могу и даље садржати staging URL-ове; замените их демо или локалним вредностима приказаним на овој страници. Не постоји заједнички непродукциони Lessons API -- покрените [LessonsApi](https://github.com/ChurchApps/LessonsApi) локално (слуша на порту `8090`) када вам затреба.
:::

### Опција 2: Локални API

Покрените Api пројекат на свом рачунару. Захтева MySQL 8.0+ са креираним базама за сваки модул. Погледајте водич [Локално подешавање API-ја](../api/local-setup.md).

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

## Променљиве окружења API-ја

Основни пројекат **Api** (`.env.sample`) има највише конфигурације. Ево кључних променљивих:

### Заједничка подешавања

| Променљива | Опис | Пример |
|----------|-------------|---------|
| `ENVIRONMENT` | Окружење извршавања | `dev` |
| `SERVER_PORT` | HTTP порт за локални dev сервер | `8084` |
| `ENCRYPTION_KEY` | 192-битни кључ за шифровање осетљивих података | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | Тајна за потписивање JSON Web токена | `jwt-secret-dev` |
| `FILE_STORE` | Где чувати отпремљене датотеке (`disk` или `s3`) | `disk` |
| `CORS_ORIGIN` | Дозвољени CORS извори (`*` за локални развој) | `*` |

### Веза са базом података

Један базни URL усмерава API ка MySQL-у. API из тог базног URL-а изводи по једну базу за сваки модул (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`).

| Променљива | Пример |
|----------|---------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
Замените `root:password` вашим стварним MySQL акредитивима. Свака база по модулу мора постојати пре покретања API-ја. Користите `npm run initdb` за креирање шеме за све модуле или `npm run initdb:membership` за један модул.
:::

### Подешавања WebSocket-а

| Променљива | Опис | Пример |
|----------|-------------|---------|
| `SOCKET_PORT` | Порт за WebSocket сервер | `8087` |
| `SOCKET_URL` | WebSocket URL на који се клијенти повезују | `ws://localhost:8087` |

---

## Променљиве окружења веб апликација

### B1Admin (React + Vite)

Пример датотеке: `.env.sample`

| Променљива | Опис | Пример (демо) |
|----------|-------------|----------------|
| `REACT_APP_STAGE` | Назив окружења | `demo` |
| `PORT` | Порт dev сервера | `3101` |
| `REACT_APP_API_BASE` | Јединствени базни URL за све ChurchApps API-је (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` се додају аутоматски) | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | URL за испоруку садржаја | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | Google Analytics ID (опционо) | `UA-123456789-1` |

За локални развој API-ја, усмерите базни URL на свој локални стек:

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App (Next.js)

Пример датотеке: `.env.sample`

| Променљива | Опис | Пример (демо) |
|----------|-------------|----------------|
| `NEXT_PUBLIC_API_BASE` | Јединствени базни URL за све ChurchApps API-је (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` се додају аутоматски) | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL за испоруку садржаја | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | Google Analytics ID (опционо) | `UA-123456789-1` |

:::info
Next.js захтева префикс `NEXT_PUBLIC_` за сваку променљиву окружења која треба да буде доступна у прегледачу. Променљиве само за сервер не захтевају овај префикс.
:::

### LessonsApp (Next.js)

Пример датотеке: `dotenv.sample.txt`

| Променљива | Опис | Пример (локални LessonsApi) |
|----------|-------------|----------------------------|
| `STAGE` | Фаза окружења (оставите непостављено или `dev` за локални развој) | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | URL Lessons API-ја | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL за испоруку садржаја | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | Базни URL ChurchApps API-ја који се користи за пријаву (примењује се само када је `STAGE` непостављен или `dev`) | `https://api.demo.churchapps.org` |

---

## Променљиве окружења мобилних апликација

### B1Checkin (React Native / Expo)

Пример датотеке: `dotenv.sample.txt`

| Променљива | Опис | Пример |
|----------|-------------|---------|
| `EXPO_PUBLIC_STAGE` | Бира скуп API-ја на који се апликација повезује: `dev` (локални API на `http://127.0.0.1:8084`), `staging` или `prod` (подразумевано када није постављено) | `dev` |

B1Checkin користи само модуле Membership и Attendance API-ја плус URL за испоруку садржаја; њихове адресе за сваку фазу постављене су у `src/helpers/EnvironmentHelper.ts`.

:::info
Expo у пакет апликације уграђује само променљиве са префиксом `EXPO_PUBLIC_`. Поново покрените dev сервер командом `yarn start --reset-cache` након измене `.env`.
:::

---

## Брзи преглед: локације примерних датотека

| Пројекат | Пример датотеке |
|---------|-----------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
