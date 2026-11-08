---
title: "Преглед пројекта"
description: "Мапирајте сваки ChurchApps репозиторијум по категорији, са оквирима, портовима за развој, базама података и начином на који дељени @churchapps пакети повезују их, у документацији за подешавање развоја."
---

# Преглед пројекта

<div class="article-intro">

ChurchApps се састоји од приближно 20 независних репозиторијума, од којих је сваки објављен у оквиру [ChurchApps GitHub организације](https://github.com/ChurchApps). Ова страница пружа потпун попис свих пројеката организованих по категоријама, заједно са њиховим оквирима, портовима и међусобним везама.

</div>

<div class="prereqs">
<h4>Пре него што почнете</h4>

- Инсталирајте [предуслове](./prerequisites.md) за категорију пројеката на којој желите да радите

</div>

## Бекенд API-ји

Сви API-ји су изграђени помоћу Node.js-а, Express-а и TypeScript-а и постављају се на AWS Lambda путем Serverless Framework-а.

| Пројекат | Сврха | Порт за развој | База података |
|---------|---------|----------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | Основни модуларни монолит који обухвата чланство, похађање, садржај, давања, поруке и doing | 8084 | Засебна MySQL база података по модулу (укупно 6) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Бекенд за Lessons.church | -- | Једна `lessons` MySQL база података |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | Алатка за AI упите заснована на OpenAI-ју | -- | -- |

:::info
Основни пројекат **Api** је модуларни монолит. Сваки модул (membership, attendance, content, giving, messaging, doing) има своју базу података и доступан је на подпутањи, као што је `/membership` или `/giving`. У продукцији су они изложени као засебне Lambda функције иза API Gateway-а.
:::

## Веб апликације

| Пројекат | Оквир | Порт за развој | Сврха |
|---------|-----------|----------|---------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | Контролна табла за администрацију цркве |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Апликација за чланове цркве намењена јавности |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Фронтенд за Lessons.church |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Алатка за увоз и извоз података |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Статички | -- | Статички сајтови са брошурама цркава |

## Мобилне апликације

Све мобилне апликације користе React Native са Expo-ом.

| Пројекат | Сврха | Кључне верзије |
|---------|--------------|--------------|
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Апликација за пријаву на киоску | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Приказ лекција на Android TV-ју | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Репродукција садржаја (укључујући TV OS) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Мобилни даљински управљач за FreeShow | Expo |

## Десктоп

| Пројекат | Стек | Сврха |
|---------|-------|---------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Софтвер за презентације и богослужење |

## Дељене библиотеке

Дељени код се објављује на npm-у под `@churchapps` опсегом и користе га горенаведени пројекти као обичне npm зависности. Сви дељени пакети налазе се у једном репозиторијуму, [Packages](https://github.com/ChurchApps/Packages), којим се управља као Yarn workspace-ом и који се објављује помоћу changesets-а.

| Пакет | Сврха | Користе |
|---------|---------|---------|
| `@churchapps/helpers` | Основне помоћне функције и заједнички TypeScript интерфејси (DateHelper, ApiHelper, CurrencyHelper, итд.) | Сви пројекти |
| `@churchapps/apihelper` | Помоћне функције за Express сервер (аутентикација, базни контролери, приступ бази података, AWS интеграције) | Сви API-ји |
| `@churchapps/apphelper` | React библиотека компоненти са подмодулима за пријаву, донације, обрасце, markdown и изградњу веб-сајтова | Све веб апликације |
| `@churchapps/content-providers` | Апстракција за спољне провајдере садржаја (Lessons.church, Planning Center, Dropbox и други) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Алатка за интеграцију са B1.church: webhook-ови, REST клијент, OAuth | Програмери спољних интеграција |
| `@churchapps/texting` | Апстракција за SMS провајдере | Api |

Погледајте [Дељене библиотеке](../shared-libraries/index.md) за подешавање workspace-а и ток објављивања.

## Међусобне везе пројеката

```
Frontend Apps              Shared Libraries           Backend APIs
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
FreeShow     ──────┘                                   AskApi
                           @churchapps/apihelper ◄────┘
```

Сви фронтенд пројекти зависе од `@churchapps/helpers`. Веб апликације додатно зависе од `@churchapps/apphelper` пакета. Сви бекенд API-ји зависе и од `@churchapps/helpers` и од `@churchapps/apihelper`.

## Следећи кораци

- **[Променљиве окружења](./environment-variables.md)** -- Подесите своје `.env` фајлове за повезивање са API-јима
- **[Локално подешавање API-ја](../api/local-setup.md)** -- Подесите бекенд API локално
