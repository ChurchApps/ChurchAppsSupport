---
title: "Огляд проєкту"
description: "Перелік усіх репозиторіїв ChurchApps за категоріями з фреймворками, портами для розробки, базами даних і тим, як спільні пакети @churchapps пов'язують їх між собою, у документації з налаштування середовища розробника."
---

# Огляд проєкту

<div class="article-intro">

ChurchApps складається приблизно з 20 незалежних репозиторіїв, кожен з яких опубліковано в [організації ChurchApps на GitHub](https://github.com/ChurchApps). Ця сторінка містить повний перелік усіх проєктів, упорядкованих за категоріями, а також їхні фреймворки, порти та взаємозв'язки.

</div>

<div class="prereqs">
<h4>Перш ніж почати</h4>

- Встановіть [передумови](./prerequisites.md) для категорії проєктів, з якою хочете працювати

</div>

## Бекенд API

Усі API побудовано на Node.js, Express і TypeScript, і їх розгортають в AWS Lambda через Serverless Framework.

| Проєкт | Призначення | Порт для розробки | База даних |
|---------|---------|----------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | Основний модульний моноліт, що охоплює членство, відвідуваність, контент, пожертви, обмін повідомленнями та служіння | 8084 | Окрема база даних MySQL для кожного модуля (всього 6) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Бекенд Lessons.church | -- | Одна база даних MySQL `lessons` |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | Інструмент AI-запитів на основі OpenAI | -- | -- |

:::info
Основний проєкт **Api** є модульним монолітом. Кожен модуль (членство, відвідуваність, контент, пожертви, обмін повідомленнями, служіння) має власну базу даних і доступний за підшляхом, наприклад `/membership` або `/giving`. У продакшені вони відкриваються як окремі функції Lambda за API Gateway.
:::

## Веб-застосунки

| Проєкт | Фреймворк | Порт для розробки | Призначення |
|---------|-----------|----------|----------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | Панель адміністрування церкви |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Публічний застосунок для членів церкви |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Фронтенд Lessons.church |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Утиліта імпорту й експорту даних |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Статичний | -- | Статичні сайти-брошури для церков |

## Мобільні застосунки

Усі мобільні застосунки використовують React Native з Expo.

| Проєкт | Призначення | Ключові версії |
|---------|--------------|---------------|
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Застосунок для реєстрації відвідувачів на кіоску | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Відображення уроків на Android TV | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Відтворення контенту (зокрема на ОС для телевізорів) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Мобільний пульт дистанційного керування для FreeShow | Expo |

## Десктопні застосунки

| Проєкт | Стек | Призначення |
|---------|-------|---------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Програмне забезпечення для презентацій і богослужінь |

## Спільні бібліотеки

Спільний код публікується в npm під областю `@churchapps` і використовується проєктами вище як звичайні залежності npm. Усі спільні пакети розміщено в одному репозиторії — [Packages](https://github.com/ChurchApps/Packages), який керується як робочий простір Yarn і випускається через changesets.

| Пакет | Призначення | Використовують |
|---------|---------|---------|
| `@churchapps/helpers` | Базові утиліти та спільні інтерфейси TypeScript (DateHelper, ApiHelper, CurrencyHelper тощо) | Усі проєкти |
| `@churchapps/apihelper` | Утиліти сервера Express (автентифікація, базові контролери, доступ до бази даних, інтеграції з AWS) | Усі API |
| `@churchapps/apphelper` | Бібліотека компонентів React з підмодулями для входу, пожертв, форм, markdown і створення веб-сайтів | Усі веб-застосунки |
| `@churchapps/content-providers` | Абстракція для сторонніх постачальників контенту (Lessons.church, Planning Center, Dropbox та інші) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Набір інструментів інтеграції B1.church: webhooks, REST-клієнт, OAuth | Зовнішні розробники інтеграцій |
| `@churchapps/texting` | Абстракція для провайдерів SMS | Api |

Про налаштування робочого простору та процес випуску дивіться [Спільні бібліотеки](../shared-libraries/index.md).

## Взаємозв'язки проєктів

```
Фронтенд-застосунки        Спільні бібліотеки         Бекенд API
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
FreeShow     ──────┘                                   AskApi
                           @churchapps/apihelper ◄────┘
```

Усі фронтенд-застосунки залежать від `@churchapps/helpers`. Веб-застосунки додатково залежать від пакетів `@churchapps/apphelper`. Усі бекенд API залежать і від `@churchapps/helpers`, і від `@churchapps/apihelper`.

## Наступні кроки

- **[Змінні середовища](./environment-variables.md)** -- Налаштуйте файли `.env` для підключення до API
- **[Локальне налаштування API](../api/local-setup.md)** -- Налаштуйте бекенд API локально
