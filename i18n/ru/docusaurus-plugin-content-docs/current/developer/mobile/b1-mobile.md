---
title: "B1 Mobile"
---

# B1 Mobile

<div class="article-intro">

B1 Mobile — основное мобильное приложение ChurchApps для участников, созданное на React Native и Expo. Оно позволяет членам церкви просматривать каталог, пользоваться пожертвованиями, отмечать посещаемость, получать уведомления и участвовать в жизни церковного сообщества.

</div>

<div class="prereqs">
<h4>Перед началом</h4>

- Установите **Node.js** и **Expo CLI** — см. [Предварительные требования](../setup/prerequisites)
- Установите **Android Studio** (для эмулятора Android) или **Xcode** (для симулятора iOS)
- Настройте цель API (демо или локальный) — см. [Переменные окружения](../setup/environment-variables)

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

3. Настройте переменные окружения — скопируйте пример файла и обновите адреса API:

   ```bash
   cp dotenv.sample.txt .env
   ```

4. Запустите сервер разработки Expo:

   ```bash
   npm start
   ```

:::tip
Для быстрого тестирования на физическом устройстве можно использовать приложение **Expo Go**, без настройки Android Studio или Xcode.
:::

## Переменные окружения

| Переменная | Описание |
|----------|-------------|
| `STAGE` | Стадия окружения (например, `dev`, `staging`, `prod`) |
| `CONTENT_ROOT` | Корневой URL для доставки контента |
| `MEMBERSHIP_API` | Адрес API Membership |
| `MESSAGING_API` | Адрес API Messaging |
| `ATTENDANCE_API` | Адрес API Attendance |
| `GIVING_API` | Адрес API Giving |
| `DOING_API` | Адрес API Doing |
| `CONTENT_API` | Адрес API Content |
| `LESSONS_ROOT` | Корневой URL для контента уроков |

## Основные команды

| Команда | Описание |
|---------|-------------|
| `npm start` | Запустить сервер разработки Expo |
| `npm run android` | Запустить на эмуляторе Android |
| `npm run ios` | Запустить на симуляторе iOS |
| `npm run test` | Запустить тесты (Jest) |

## Production-сборки

Перед созданием production-сборки обновите номера версий во всех следующих файлах:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/B1Mobile/Info.plist`

### Android

```bash
npm run build:android
```

Эта команда использует EAS Build для создания бинарника Android.

### iOS

```bash
eas build --platform ios --profile production
```

### OTA-обновления

Чтобы отправить обновление по воздуху (без прохождения проверки в магазине приложений):

```bash
npm run update:production
```

:::info
OTA-обновления идеально подходят для изменений только в JavaScript. Если вы меняете нативный код или зависимости, нужно отправить полную сборку в магазин.
:::

## Связанные статьи

- **[Развертывание мобильных приложений](../deployment/mobile)** — полное руководство по сборке, отправке и публикации мобильных приложений
- **[Переменные окружения](../setup/environment-variables)** — полный справочник по настройке мобильного окружения
