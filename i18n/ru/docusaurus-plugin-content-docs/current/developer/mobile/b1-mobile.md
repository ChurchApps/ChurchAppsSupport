---
title: "B1 Mobile"
---

# B1 Mobile

<div class="article-intro">

B1 Mobile -- основное мобильное приложение для членов церкви ChurchApps, построенное на React Native и Expo. Оно позволяет членам церкви просматривать справочники, получать доступ к пожертвованиям, проверять посещаемость, получать уведомления и взаимодействовать с церковным сообществом.

</div>

<div class="prereqs">
<h4>Перед началом работы</h4>

- Установите **Node.js** и **Expo CLI** -- см. [Предварительные требования](../setup/prerequisites)
- Установите **Android Studio** (для эмулятора Android) или **Xcode** (для симулятора iOS)
- Настройте цель API (staging или локальный) -- см. [Переменные окружения](../setup/environment-variables)

</div>

## Настройка

1. Клонируйте репозиторий:

   ```bash
   git clone https://github.com/ChurchApps/B1Mobile.git
   ```

2. Установите зависимости:

   ```bash
   cd B1Mobile && npm install
   ```

3. Настройте переменные окружения -- скопируйте образец файла и обновите API-эндпоинты:

   ```bash
   cp dotenv.sample.txt .env
   ```

4. Запустите сервер разработки Expo:

   ```bash
   npm start
   ```

:::tip
Вы можете использовать приложение **Expo Go** на физическом устройстве для быстрого тестирования без настройки Android Studio или Xcode.
:::

## Переменные окружения

| Переменная | Описание |
|----------|-------------|
| `STAGE` | Стадия окружения (напр., `dev`, `staging`, `prod`) |
| `CONTENT_ROOT` | Корневой URL для доставки контента |
| `MEMBERSHIP_API` | Эндпоинт API Membership |
| `MESSAGING_API` | Эндпоинт API Messaging |
| `ATTENDANCE_API` | Эндпоинт API Attendance |
| `GIVING_API` | Эндпоинт API Giving |
| `DOING_API` | Эндпоинт API Doing |
| `CONTENT_API` | Эндпоинт API Content |
| `LESSONS_ROOT` | Корневой URL для контента уроков |

## Основные команды

| Команда | Описание |
|---------|-------------|
| `npm start` | Запуск сервера разработки Expo |
| `npm run android` | Запуск на эмуляторе Android |
| `npm run ios` | Запуск на симуляторе iOS |
| `npm run test` | Запуск тестов (Jest) |

## Продакшен-сборки

Перед созданием продакшен-сборки обновите номера версий во всех следующих файлах:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/B1Mobile/Info.plist`

### Android

```bash
npm run build:android
```

Это использует EAS Build для создания бинарного файла Android.

### iOS

```bash
eas build --platform ios --profile production
```

### OTA-обновления

Чтобы отправить обновление по воздуху (без прохождения проверки магазина приложений):

```bash
npm run update:production
```

:::info
OTA-обновления подходят для изменений, затрагивающих только JavaScript. Если вы изменяете нативный код или зависимости, необходимо отправить полную сборку в магазин.
:::

## Связанные статьи

- **[Развёртывание мобильных приложений](../deployment/mobile)** -- Полное руководство по сборке, отправке и развёртыванию мобильных приложений
- **[Переменные окружения](../setup/environment-variables)** -- Полный справочник по настройке окружения мобильного приложения
