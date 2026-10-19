---
title: "LessonsApp"
---

# LessonsApp

<div class="article-intro">

LessonsApp — это приложение для управления содержанием уроков на [Lessons.church](https://lessons.church). Оно предоставляет интерфейс для создания, организации и публикации учебных программ для церквей, построено на Next.js и React.

</div>

<div class="prereqs">
<h4>Перед началом</h4>

- Установите **Node.js 22+** и **Git** -- см. [Требования](../setup/prerequisites)
- Настройте цель API (локальный LessonsApi) -- см. [Переменные окружения](../setup/environment-variables)

</div>

:::warning
LessonsApp требует Node.js 22 или новее. Более ранние версии не поддерживаются.
:::

## Настройка

### 1. Клонируйте репозиторий

```bash
git clone https://github.com/ChurchApps/LessonsApp.git
```

### 2. Установите зависимости

```bash
cd LessonsApp
npm install
```

### 3. Настройте переменные окружения

Скопируйте пример файла окружения в `.env` и настройте конечные точки API:

```bash
cp dotenv.sample.txt .env
```

Укажите в URL конечных точек API адрес вашего локального экземпляра LessonsApi (`http://localhost:8090`). Тестовый Lessons API выведен из эксплуатации, поэтому замените все URL `api.staging.lessons.church`, оставшиеся в примере файла.

### 4. Запустите сервер разработки

```bash
npm run dev
```

Сервер разработки Next.js запускается по адресу [http://localhost:3501](http://localhost:3501).

## Основные команды

| Команда | Описание |
|---------|-------------|
| `npm run dev` | Запуск сервера разработки Next.js на порту 3501 |
| `npm run build` | Продакшен-сборка через Next.js |

## Технологический стек

- **Next.js 16** с TypeScript
- **React 19** для UI-компонентов
- **`@churchapps/apphelper*`** -- пакеты для общих компонентов

:::info
LessonsApp взаимодействует с бэкендом **LessonsApi**, который является отдельным API, не связанным с основным API ChurchApps. Убедитесь, что ваше окружение настроено на правильную конечную точку Lessons API.
:::

## Развёртывание

Продакшен-сборки развёртываются в **S3 + CloudFront**:

1. `npm run build` создаёт оптимизированную сборку Next.js
2. Результат сборки синхронизируется с S3-бакетом
3. Запускается инвалидация CloudFront, чтобы отдавать новую версию

:::tip
Подробные инструкции по развёртыванию см. в руководстве [Развёртывание веб-приложений](../deployment/web-apps).
:::
