---
title: "LessonsApp"
description: "Локальний запуск редактора уроків LessonsApp (Next.js, Node.js 22+) з локальним LessonsApi та розгортання в S3/CloudFront."
---

# LessonsApp

<div class="article-intro">

LessonsApp — це програма для керування уроками на [Lessons.church](https://lessons.church). Вона надає інтерфейс для створення, впорядкування та публікації навчальних програм церковних уроків, побудований на Next.js і React.

</div>

<div class="prereqs">
<h4>Перш ніж почати</h4>

- Встановіть **Node.js 22+** та **Git** -- див. [Передумови](../setup/prerequisites.md)
- Налаштуйте цільовий API (локальний LessonsApi) -- див. [Змінні середовища](../setup/environment-variables.md)

</div>

:::warning
LessonsApp потребує Node.js 22 або новішої версії. Старіші версії не підтримуються.
:::

## Налаштування

### 1. Клонування репозиторію

```bash
git clone https://github.com/ChurchApps/LessonsApp.git
```

### 2. Встановлення залежностей

```bash
cd LessonsApp
npm install
```

### 3. Налаштування змінних середовища

Скопіюйте файл зразка змінних середовища до `.env` і налаштуйте кінцеві точки API:

```bash
cp dotenv.sample.txt .env
```

Оновіть URL-адреси кінцевих точок API, щоб вони вказували на ваш локальний екземпляр LessonsApi (`http://localhost:8090`). Тестовий API Lessons більше не працює, тож замініть усі URL-адреси `api.staging.lessons.church`, які залишилися у файлі зразка.

### 4. Запуск сервера розробки

```bash
npm run dev
```

Сервер розробки Next.js запускається за адресою [http://localhost:3501](http://localhost:3501).

## Основні команди

| Команда | Опис |
|---------|------|
| `npm run dev` | Запуск сервера розробки Next.js на порту 3501 |
| `npm run build` | Створення продакшн-збірки через Next.js |

## Технологічний стек

- **Next.js 16** з TypeScript
- **React 19** для компонентів інтерфейсу
- **`@churchapps/apphelper*`** -- пакети для спільних компонентів

:::info
LessonsApp взаємодіє з бекендом **LessonsApi**, який є окремим API від основного ChurchApps Api. Переконайтеся, що ваше середовище налаштоване на правильну кінцеву точку Lessons API.
:::

## Розгортання

Продакшн-збірки розгортаються на **S3 + CloudFront**:

1. `npm run build` створює оптимізовану збірку Next.js
2. Вихідні файли збірки синхронізуються з бакетом S3
3. Запускається інвалідація CloudFront, щоб відобразити нову версію

:::tip
Докладні інструкції щодо розгортання дивіться в посібнику [Розгортання веб-застосунків](../deployment/web-apps.md).
:::
