---
title: "Променљиве окружења"
description: "Подешавање .env датотеке за ChurchApps пројекте: избор дељеног демо API-ја или локалног API-ја и попуњавање променљивих за B1 Admin, B1.church и друге."
---

# Променљиве окружења

<div class="article-intro">

Сваки ChurchApps пројекат користи `.env` датотеку за локалну конфигурацију. Сваки пројекат укључује пример датотеке коју копирате и прилагођавате. Ова страница описује променљиве окружења за API-је, веб апликације и мобилне апликације, укључујући то како изабрати између демо и локалних API циљева.

</div>

<div class="prereqs">
<h4>Пре почетка</h4>

- Инсталирајте [предуслове](./prerequisites.md) за свој пројекат
- Клонирајте репозиторијум пројекта на коме желите да радите
- Погледајте [преглед пројекта](./project-overview.md) да бисте разумели којим API модулима је ваш пројекат потребан

</div>

## Општи образац

1. Потражите `dotenv.sample.txt` или `.env.sample` у корену пројекта.
2. Копирајте је у `.env`.
3. Уредите вредности по потреби.

```bash
# Пример за пројекат са .env.sample
cp .env.sample .env

# Пример за пројекат са dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Никада не остављајте `.env` датотеке у систему за контролу верзија.** Оне садрже тајне податке као што су акредитиви за базу података, API кључеви и JWT тајне. Сви ChurchApps пројекти укључују `.env` у `.gitignore`, али увек проверите пре слања.
:::

## Избор API циља

Најважнија одлука је то на шта ваш фронтенд упућује API позиве. Постоје две опције:

### Опција 1: Демо API-ји (препоручено за развој фронтенда)

Користите заједничко демо окружење. Није потребно подешавање локалног API-ја или базе података. Покреће најновији код из `main` гране, а његови пример подаци се поново попуњавају сваке ноћи.

```bash
# Основни образац URL-а
https://api.demo.churchapps.org/{module}

# Примери URL-ова модула
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/content
https://api.demo.churchapps.org/giving
https://api.demo.churchapps.org/messaging
https://api.demo.churchapps.org/doing
```

:::warning
Тестно окружење (`api.staging.churchapps.org`, `api.staging.lessons.church` и повезани хостови) је укинуто. Неке пример `.env` датотеке и даље могу садржати тестне адресе; замените их демо или локалним вредностима приказаним на овој страници. Не постоји заједнички непродукциони Lessons API -- када вам је потребан, покрените [LessonsApi](https://github.com/ChurchApps/LessonsApi) локално (слуша на порту `8090`).
:::

### Опција 2: Локални API

Покрените Api пројекат на свом рачунару. Потребан је MySQL 8.0+ са базама података креираним за сваки модул. Погледајте водич [подешавање локалног API-ја](../api/local-setup.md).

```bash
# Основни образац URL-а
http://localhost:8084/{module}

# Примери URL-ова модула
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## Променљиве окружења API-ја

Основни **Api** пројекат (`.env.sample`) има највише конфигурације. Ево кључних променљивих:

### Заједничка подешавања

| Променљива | Опис | Пример |
|----------|-------------|---------|
| `ENVIRONMENT` | Окружење извршавања | `dev` |
| `SERVER_PORT` | HTTP порт за локални развојни сервер | `8084` |
| `ENCRYPTION_KEY` | 192-битни кључ за шифровање осетљивих података | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | Тајна за потписивање JSON Web Token-а | `jwt-secret-dev` |
| `FILE_STORE` | Где се чувају отпремљене датотеке (`disk` или `s3`) | `disk` |
| `CORS_ORIGIN` | Дозвољени CORS извори (`*` за локални развој) | `*` |

### Веза са базом података

Један основни URL усмерава API ка MySQL-у. API из ове основе изводи по једну базу података за сваки модул (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`).

| Променљива | Пример |
|----------|---------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
Ажурирајте `root:password` својим стварним MySQL акредитивима. Свака база података за модул мора постојати пре покретања API-ја. Користите `npm run initdb` да креирате шему за све модуле или `npm run initdb:membership` за један модул.
:::

### WebSocket подешавања

| Променљива | Опис | Пример |
|----------|-------------|---------|
| `SOCKET_PORT` | Порт за WebSocket сервер | `8087` |
| `SOCKET_URL` | WebSocket URL за повезивање клијената | `ws://localhost:8087` |

---

## Променљиве окружења веб апликација

### B1Admin (React + Vite)

Пример датотеке: `.env.sample`

| Променљива | Опис | Пример (демо) |
|----------|-------------|----------------|
| `REACT_APP_STAGE` | Назив окружења | `demo` |
| `PORT` | Порт развојног сервера | `3101` |
| `REACT_APP_API_BASE` | Јединствени основни URL за све ChurchApps API-је (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` се додају аутоматски) | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | URL за испоруку садржаја | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | Google Analytics ID (необавезно) | `UA-123456789-1` |

За развој са локалним API-јем, усмерите основни URL на свој локални стек:

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App (Next.js)

Пример датотеке: `.env.sample`

| Променљива | Опис | Пример (демо) |
|----------|-------------|----------------|
| `NEXT_PUBLIC_API_BASE` | Јединствени основни URL за све ChurchApps API-је (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` се додају аутоматски) | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL за испоруку садржаја | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | Google Analytics ID (необавезно) | `UA-123456789-1` |

:::info
Next.js захтева префикс `NEXT_PUBLIC_` за сваку променљиву окружења која треба да буде доступна у прегледачу. Променљиве намењене само серверу не захтевају овај префикс.
:::

### LessonsApp (Next.js)

Пример датотеке: `dotenv.sample.txt`

| Променљива | Опис | Пример (локални LessonsApi) |
|----------|-------------|----------------------------|
| `STAGE` | Фаза окружења (оставите непостављено или `dev` за локални развој) | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | URL Lessons API-ја | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL за испоруку садржаја | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | ChurchApps API основа која се користи за пријаву (поштује се само када је `STAGE` непостављен или `dev`) | `https://api.demo.churchapps.org` |

---

## Променљиве окружења мобилних апликација

### B1Mobile (React Native / Expo)

Пример датотеке: `dotenv.sample.txt`

| Променљива | Опис | Пример (демо) |
|----------|-------------|----------------|
| `STAGE` | Назив окружења | `dev` |
| `MEMBERSHIP_API`, `ATTENDANCE_API`, `GIVING_API`, `DOING_API`, `MESSAGING_API`, `CONTENT_API` | Један URL за сваки ChurchApps API модул (свака подразумевано користи продукцију када није постављен) | `https://api.demo.churchapps.org/membership` |
| `LESSONS_API` | Lessons API (посебан хост; не постоји заједнички непродукциони) | `https://api.lessons.church` |
| `CONTENT_ROOT` | URL за испоруку садржаја | `https://democontent.churchapps.org` |
| `LESSONS_ROOT` | URL Lessons сајта | `https://lessons.church` |

:::info
Мобилне апликације не користе префикс `REACT_APP_` или `NEXT_PUBLIC_`. Приступ променљивама окружења обрађује Expo конфигурација.
:::

---

## Брзи преглед: локације пример датотека

| Пројекат | Пример датотеке |
|---------|-------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Mobile | `dotenv.sample.txt` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
