---
title: "Обзор проектов"
---

# Обзор проектов

<div class="article-intro">

ChurchApps состоит из примерно 20 независимых репозиториев, опубликованных в [организации ChurchApps на GitHub](https://github.com/ChurchApps). Эта страница содержит полный перечень всех проектов, организованных по категориям, с указанием их фреймворков, портов и взаимосвязей.

</div>

<div class="prereqs">
<h4>Прежде чем начать</h4>

- Установите [предварительные требования](./prerequisites) для категории проекта, над которой хотите работать

</div>

## Бэкенд-API

Все API построены на Node.js, Express и TypeScript и развёрнуты в AWS Lambda через Serverless Framework.

| Проект | Назначение | Dev-порт | База данных |
|---------|---------|----------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | Основной модульный монолит, охватывающий membership, attendance, content, giving, messaging и doing | 8084 | Отдельная MySQL БД на модуль (6 всего) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Бэкенд Lessons.church | -- | Единая MySQL БД `lessons` |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | AI-инструмент запросов на базе OpenAI | -- | -- |

:::info
Основной проект **Api** — это модульный монолит. Каждый модуль (membership, attendance, content, giving, messaging, doing) имеет собственную базу данных и доступен по подпути, например `/membership` или `/giving`. В продакшне они представлены как отдельные Lambda-функции за API Gateway.
:::

## Веб-приложения

| Проект | Фреймворк | Dev-порт | Назначение |
|---------|-----------|----------|---------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 5173 | Панель управления церковью |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Публичное приложение для членов церкви |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Фронтенд Lessons.church |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Утилита импорта/экспорта данных |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Static | -- | Статические рекламные сайты церквей |

## Мобильные приложения

Все мобильные приложения используют React Native с Expo.

| Проект | Назначение | Ключевые версии |
|---------|---------|--------------|
| **[B1Mobile](https://github.com/ChurchApps/B1Mobile)** | Приложение для членов церкви для iOS и Android | Expo 54, React Native 0.81 |
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Приложение-киоск для регистрации | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Отображение уроков на Android TV | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Воспроизведение контента (включая TV OS) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Мобильный пульт управления для FreeShow | Expo |

## Десктоп

| Проект | Стек | Назначение |
|---------|-------|---------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | ПО для презентаций и богослужений |

## Общие библиотеки

Общий код публикуется в npm под областью `@churchapps`. Они используются как обычные npm-зависимости вышеуказанными проектами.

| Пакет | Имя в npm | Назначение | Используется |
|---------|----------|---------|---------|
| **[Helpers](https://github.com/ChurchApps/Helpers)** | `@churchapps/helpers` | Базовые утилиты (DateHelper, ApiHelper, CurrencyHelper и т.д.) | Все проекты |
| **[ApiHelper](https://github.com/ChurchApps/ApiHelper)** | `@churchapps/apihelper` | Серверные утилиты Express (auth middleware, DB helpers, интеграция с AWS) | Все API |
| **[AppHelper](https://github.com/ChurchApps/AppHelper)** | Workspace с 6 пакетами | Библиотека React-компонентов | Все веб-приложения |
| **[ContentProviderHelper](https://github.com/ChurchApps/ContentProviderHelper)** | `@churchapps/content-provider-helper` | Провайдеры контента YouTube, Vimeo и локальные | FreeShow, FreePlay, Api |

### Подпакеты AppHelper

Проект AppHelper — это монорепозиторий, публикующий шесть пакетов:

| Пакет | Имя в npm |
|---------|----------|
| Core | `@churchapps/apphelper` |
| Login | `@churchapps/apphelper-login` |
| Donations | `@churchapps/apphelper-donations` |
| Forms | `@churchapps/apphelper-forms` |
| Markdown | `@churchapps/apphelper-markdown` |
| Website | `@churchapps/apphelper-website` |

## Взаимосвязи проектов

```
Frontend Apps              Shared Libraries           Backend APIs
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
B1Mobile     ──────┤                                   AskApi
FreeShow     ──────┘       @churchapps/apihelper ◄────┘
```

Все фронтенд-приложения зависят от `@churchapps/helpers`. Веб-приложения дополнительно зависят от пакетов `@churchapps/apphelper`. Все бэкенд-API зависят как от `@churchapps/helpers`, так и от `@churchapps/apihelper`.

## Следующие шаги

- **[Переменные окружения](./environment-variables)** -- Настройте файлы `.env` для подключения к API
- **[Локальная настройка API](../api/local-setup)** -- Настройте бэкенд-API локально
