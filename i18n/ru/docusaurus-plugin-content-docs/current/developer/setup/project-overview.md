---
title: "Обзор проекта"
description: "Карта всех репозиториев ChurchApps по категориям: фреймворки, порты для разработки, базы данных и связи между общими пакетами @churchapps в документации по настройке среды разработки."
---

# Обзор проекта

<div class="article-intro">

ChurchApps состоит примерно из 20 независимых репозиториев, каждый из которых опубликован в [организации ChurchApps на GitHub](https://github.com/ChurchApps). На этой странице приведён полный перечень всех проектов по категориям, а также их фреймворки, порты и взаимосвязи.

</div>

<div class="prereqs">
<h4>Перед началом работы</h4>

- Установите [необходимые компоненты](./prerequisites.md) для категории проектов, с которой хотите работать

</div>

## Бэкенд API

Все API построены на Node.js, Express и TypeScript и развёртываются в AWS Lambda с помощью Serverless Framework.

| Проект | Назначение | Порт для разработки | База данных |
|---------|---------|----------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | Основной модульный монолит, охватывающий членство, посещаемость, контент, пожертвования, сообщения и служение | 8084 | Отдельная база MySQL для каждого модуля (всего 6) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Бэкенд Lessons.church | -- | Единая база MySQL `lessons` |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | Инструмент для AI-запросов на основе OpenAI | -- | -- |

:::info
Основной проект **Api** представляет собой модульный монолит. Каждый модуль (membership, attendance, content, giving, messaging, doing) имеет собственную базу данных и доступен по подпути, например `/membership` или `/giving`. В продакшене они открыты как отдельные функции Lambda за API Gateway.
:::

## Веб-приложения

| Проект | Фреймворк | Порт для разработки | Назначение |
|---------|-----------|----------|---------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | Панель администрирования церкви |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Публичное приложение для прихожан |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Фронтенд Lessons.church |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Утилита импорта и экспорта данных |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Статические сайты | -- | Статические брошюрные сайты церквей |

## Мобильные приложения

Все мобильные приложения построены на React Native с использованием Expo.

| Проект | Назначение | Ключевые версии |
|---------|--------------|---------------|
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Приложение киоска для регистрации прихода | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Отображение уроков на Android TV | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Воспроизведение контента (включая TV OS) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Мобильный пульт дистанционного управления для FreeShow | Expo |

## Десктопное приложение

| Проект | Стек | Назначение |
|---------|-------|---------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Программное обеспечение для презентаций и богослужений |

## Общие библиотеки

Общий код публикуется в npm в области `@churchapps` и используется перечисленными выше проектами как обычные npm-зависимости. Все общие пакеты находятся в одном репозитории — [Packages](https://github.com/ChurchApps/Packages), который управляется как рабочее пространство Yarn и выпускается с помощью changesets.

| Пакет | Назначение | Используется в |
|---------|---------|---------|
| `@churchapps/helpers` | Базовые утилиты и общие интерфейсы TypeScript (DateHelper, ApiHelper, CurrencyHelper и др.) | Все проекты |
| `@churchapps/apihelper` | Утилиты сервера Express (аутентификация, базовые контроллеры, доступ к базе данных, интеграции с AWS) | Все API |
| `@churchapps/apphelper` | Библиотека React-компонентов с подмодулями для входа, пожертвований, форм, Markdown и создания сайтов | Все веб-приложения |
| `@churchapps/content-providers` | Абстракция для сторонних поставщиков контента (Lessons.church, Planning Center, Dropbox и другие) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Набор инструментов интеграции B1.church: вебхуки, REST-клиент, OAuth | Внешние разработчики интеграций |
| `@churchapps/texting` | Абстракция для провайдеров SMS | Api |

Настройку рабочего пространства и процесс выпуска см. в разделе [Общие библиотеки](../shared-libraries/index.md).

## Связи между проектами

```
Фронтенд-приложения        Общие библиотеки           Бэкенд API
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
FreeShow     ──────┘                                   AskApi
                           @churchapps/apihelper ◄────┘
```

Все фронтенд-приложения зависят от `@churchapps/helpers`. Веб-приложения дополнительно зависят от пакетов `@churchapps/apphelper`. Все бэкенд API зависят как от `@churchapps/helpers`, так и от `@churchapps/apihelper`.

## Следующие шаги

- **[Переменные окружения](./environment-variables.md)** -- Настройте файлы `.env` для подключения к API
- **[Локальная настройка API](../api/local-setup.md)** -- Запустите бэкенд API локально
