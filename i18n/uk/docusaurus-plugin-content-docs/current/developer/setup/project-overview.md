---
title: "Огляд проєктів"
description: "Карта репозиторіїв ChurchApps за категоріями: фреймворки, порти, бази даних і те, як спільні пакети @churchapps пов'язують їх між собою."
---

# Огляд проєктів

<div class="article-intro">

ChurchApps складається з близько 20 незалежних репозиторіїв, кожен з яких опубліковано в [організації ChurchApps на GitHub](https://github.com/ChurchApps). На цій сторінці наведено повний перелік усіх проєктів, упорядкованих за категоріями, разом із їхніми фреймворками, портами та взаємозв'язками.

</div>

<div class="prereqs">
<h4>Перш ніж почати</h4>

- Встановіть [передумови](./prerequisites.md) для категорії проєктів, з якою хочете працювати

</div>

## Бекенд-API

Усі API створено на Node.js, Express і TypeScript, і їх розгорнуто в AWS Lambda через Serverless Framework.

| Проєкт | Призначення | Порт для розробки | База даних |
|---------|---------|----------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | Основний модульний моноліт, що охоплює членство, відвідуваність, контент, пожертви, обмін повідомленнями та планування служінь | 8084 | Окрема база даних MySQL для кожного модуля (всього 6) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Бекенд Lessons.church | -- | Одна база даних MySQL `lessons` |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | Інструмент для ШІ-запитів на основі OpenAI | -- | -- |

:::info
Основний проєкт **Api** є модульним монолітом. Кожен модуль (членство, відвідуваність, контент, пожертви, обмін повідомленнями, планування служінь) має власну базу даних і доступний за підшляхом, наприклад `/membership` або `/giving`. У продуктивному середовищі вони відкриваються як окремі функції Lambda за API Gateway.
:::

## Веб-застосунки

| Проєкт | Фреймворк | Порт для розробки | Призначення |
|---------|-----------|----------|---------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | Панель адміністрування церкви |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Публічний застосунок для членів церкви |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Фронтенд Lessons.church |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Утиліта для імпорту та експорту даних |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Статичний | -- | Статичні сайти-брошури церков |

## Мобільні застосунки

Усі мобільні застосунки використовують React Native з Expo.

| Проєкт | Призначення | Ключові версії |
|---------|--------------|---------------|
| **[B1Mobile](https://github.com/ChurchApps/B1Mobile)** | Застосунок для членів церкви на iOS і Android | Expo 54, React Native 0.81 |
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Застосунок-кіоск для реєстрації відвідувачів | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Відображення уроків на Android TV | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Відтворення контенту (зокрема на TV OS) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Мобільний пульт дистанційного керування для FreeShow | Expo |

## Настільні застосунки

| Проєкт | Стек | Призначення |
|---------|-------|---------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Програмне забезпечення для презентацій і богослужінь |

## Спільні бібліотеки

Спільний код публікується в npm в області `@churchapps` і використовується наведеними вище проєктами як звичайні залежності npm. Усі спільні пакети розміщено в одному репозиторії — [Packages](https://github.com/ChurchApps/Packages) — яким керують як робочим простором Yarn і випускають через changesets.

| Пакет | Призначення | Використовують |
|---------|---------|---------|
| `@churchapps/helpers` | Базові утиліти та спільні інтерфейси TypeScript (DateHelper, ApiHelper, CurrencyHelper тощо) | Усі проєкти |
| `@churchapps/apihelper` | Утиліти сервера Express (автентифікація, базові контролери, доступ до бази даних, інтеграції з AWS) | Усі API |
| `@churchapps/apphelper` | Бібліотека компонентів React з модулями за підшляхами для входу, пожертв, форм, markdown і створення вебсайтів | Усі веб-застосунки |
| `@churchapps/content-providers` | Абстракція для сторонніх постачальників контенту (Lessons.church, Planning Center, Dropbox та інших) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Набір інструментів інтеграції B1.church: вебхуки, REST-клієнт, OAuth | Зовнішні розробники інтеграцій |
| `@churchapps/texting` | Абстракція для постачальників SMS | Api |

Про налаштування робочого простору та процес випуску див. [Спільні бібліотеки](../shared-libraries/index.md).

## Взаємозв'язки проєктів

```
Frontend Apps              Shared Libraries           Backend APIs
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
B1Mobile     ──────┤                                   AskApi
FreeShow     ──────┘       @churchapps/apihelper ◄────┘
```

Усі фронтенд-застосунки залежать від `@churchapps/helpers`. Веб-застосунки додатково залежать від пакетів `@churchapps/apphelper`. Усі бекенд-API залежать від `@churchapps/helpers` і `@churchapps/apihelper`.

## Наступні кроки

- **[Змінні середовища](./environment-variables.md)** — Налаштуйте файли `.env` для підключення до API
- **[Локальне налаштування API](../api/local-setup.md)** — Налаштуйте бекенд-API локально
