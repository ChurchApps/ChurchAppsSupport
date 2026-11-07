---
title: "Преглед пројеката"
description: "Мапа ChurchApps репозиторијума по категоријама: оквири, развојни портови, базе и веза преко дељених @churchapps пакета у документацији за подешавање."
---

# Преглед пројеката

<div class="article-intro">

ChurchApps се састоји од приближно 20 независних репозиторијума, од којих је сваки објављен под [ChurchApps GitHub организацијом](https://github.com/ChurchApps). Ова страница пружа потпун попис свих пројеката, организованих по категоријама, заједно са њиховим оквирима, портовима и међусобним везама.

</div>

<div class="prereqs">
<h4>Пре него што почнете</h4>

- Инсталирајте [предуслове](./prerequisites.md) за категорију пројеката на којој желите да радите

</div>

## Позадински API-ји

Сви API-ји су изграђени помоћу Node.js-а, Express-а и TypeScript-а, а постављају се на AWS Lambda помоћу Serverless Framework-а.

| Пројекат | Намена | Порт за развој | База података |
|---------|---------|----------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | Основни модуларни монолит који покрива чланство, присуство, садржај, давање, поруке и doing | 8084 | Посебна MySQL база података за сваки модул (укупно 6) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Позадински део за Lessons.church | -- | Једна `lessons` MySQL база података |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | Алатка за AI упите засновна на OpenAI-ју | -- | -- |

:::info
Основни пројекат **Api** је модуларни монолит. Сваки модул (чланство, присуство, садржај, давање, поруке, doing) има сопствену базу података и доступан је на подпутањи попут `/membership` или `/giving`. У продукцији се ови модули излажу као засебне Lambda функције иза API Gateway-а.
:::

## Веб апликације

| Пројекат | Оквир | Порт за развој | Намена |
|---------|-----------|----------|---------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | Табла за администрацију цркве |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Апликација за чланове цркве намењена јавности |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Фронтенд за Lessons.church |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Алатка за увоз и извоз података |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Статички | -- | Статички брошура-сајтови цркава |

## Мобилне апликације

Све мобилне апликације користе React Native са Expo-м.

| Пројекат | Намена | Кључне верзије |
|---------|--------------|--------------|
| **[B1Mobile](https://github.com/ChurchApps/B1Mobile)** | Апликација за чланове цркве за iOS и Android | Expo 54, React Native 0.81 |
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Апликација за пријаву на киоску | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Приказ лекција на Android TV-ју | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Репродукција садржаја (укључујући TV OS) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Мобилни даљински управљач за FreeShow | Expo |

## Десктоп

| Пројекат | Стек | Намена |
|---------|-------|---------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Софтвер за презентације и богослужење |

## Дељене библиотеке

Дељени код се објављује на npm-у под опсегом `@churchapps` и горенаведени пројекти га користе као обичне npm зависности. Сви дељени пакети налазе се у једном репозиторијуму, [Packages](https://github.com/ChurchApps/Packages), којим се управља као Yarn workspace-ом и који се објављује помоћу changesets-а.

| Пакет | Намена | Користе |
|---------|---------|---------|
| `@churchapps/helpers` | Основне помоћне функције и заједничка TypeScript сучеља (DateHelper, ApiHelper, CurrencyHelper, итд.) | Сви пројекти |
| `@churchapps/apihelper` | Помоћне функције за Express сервер (аутентификација, основни контролери, приступ бази података, AWS интеграције) | Сви API-ји |
| `@churchapps/apphelper` | Библиотека React компоненти са подмодулима за пријаву, донације, обрасце, markdown и изградњу веб-сајтова | Све веб апликације |
| `@churchapps/content-providers` | Апстракција за добављаче садржаја трећих страна (Lessons.church, Planning Center, Dropbox и други) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Алатка за интеграције B1.church: webhook-ови, REST клијент, OAuth | Програмери спољних интеграција |
| `@churchapps/texting` | Апстракција за SMS провајдере | Api |

Погледајте [Дељене библиотеке](../shared-libraries/index.md) за подешавање workspace-а и ток објављивања.

## Везе између пројеката

```
Frontend Apps              Shared Libraries           Backend APIs
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
B1Mobile     ──────┤                                   AskApi
FreeShow     ──────┘       @churchapps/apihelper ◄────┘
```

Све фронтенд апликације зависе од `@churchapps/helpers`. Веб апликације додатно зависе од пакета `@churchapps/apphelper`. Сви позадински API-ји зависе и од `@churchapps/helpers` и од `@churchapps/apihelper`.

## Следећи кораци

- **[Променљиве окружења](./environment-variables.md)** -- Подесите своје `.env` фајлове за повезивање са API-јима
- **[Локално подешавање API-ја](../api/local-setup.md)** -- Подесите позадински API локално
