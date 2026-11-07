---
title: "B1 Mobile"
description: "Запуск B1 Mobile (React Native/Expo) локально, налаштування кінцевих точок API та збірка для Android чи iOS. Примітка: B1 Mobile застарів."
---

# B1 Mobile

<div class="article-intro">

B1 Mobile — це основний мобільний застосунок ChurchApps для членів церкви, створений на React Native та Expo. Він дає змогу переглядати каталоги, користуватися пожертвами, відмічати відвідуваність, отримувати сповіщення та взаємодіяти зі своєю церковною спільнотою.

</div>

<div class="prereqs">
<h4>Перш ніж почати</h4>

- Встановіть **Node.js** та **Expo CLI** -- див. [Передумови](../setup/prerequisites.md)
- Встановіть **Android Studio** (для емулятора Android) або **Xcode** (для симулятора iOS)
- Налаштуйте цільовий API (demo або local) -- див. [Змінні середовища](../setup/environment-variables.md)

</div>

## Налаштування

1. Клонуйте репозиторій:

   ```bash
   git clone https://github.com/ChurchApps/B1Mobile.git
   ```

2. Встановіть залежності:

   ```bash
   cd B1Mobile && npm install
   ```

3. Налаштуйте змінні середовища -- скопіюйте зразковий файл і оновіть кінцеві точки API:

   ```bash
   cp dotenv.sample.txt .env
   ```

4. Запустіть сервер розробки Expo:

   ```bash
   npm start
   ```

:::tip
Ви можете використовувати застосунок **Expo Go** на фізичному пристрої для швидкого тестування без налаштування Android Studio чи Xcode.
:::

## Змінні середовища

| Змінна | Опис |
|----------|-------------|
| `STAGE` | Етап середовища (наприклад, `dev`, `staging`, `prod`) |
| `CONTENT_ROOT` | Кореневий URL для доставки контенту |
| `MEMBERSHIP_API` | Кінцева точка API членства |
| `MESSAGING_API` | Кінцева точка API повідомлень |
| `ATTENDANCE_API` | Кінцева точка API відвідуваності |
| `GIVING_API` | Кінцева точка API пожертв |
| `DOING_API` | Кінцева точка API Doing |
| `CONTENT_API` | Кінцева точка API контенту |
| `LESSONS_ROOT` | Кореневий URL для контенту уроків |

## Основні команди

| Команда | Опис |
|---------|-------------|
| `npm start` | Запустити сервер розробки Expo |
| `npm run android` | Запустити на емуляторі Android |
| `npm run ios` | Запустити на симуляторі iOS |
| `npm run test` | Запустити тести (Jest) |

## Продакшн-збірки

Перед створенням продакшн-збірки оновіть номери версій у всіх таких файлах:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/B1Mobile/Info.plist`

### Android

```bash
npm run build:android
```

Це використовує EAS Build для створення бінарного файлу Android.

### iOS

```bash
eas build --platform ios --profile production
```

### Оновлення OTA

Щоб опублікувати оновлення по повітрю (OTA) без проходження перевірки в магазині застосунків:

```bash
npm run update:production
```

:::info
Оновлення OTA ідеально підходять для змін лише в JavaScript. Якщо ви змінюєте нативний код або залежності, потрібно натомість подати повну збірку для магазину.
:::

## Пов'язані статті

- **[Розгортання мобільних застосунків](../deployment/mobile.md)** -- Повний посібник зі збирання, подання та розгортання мобільних застосунків
- **[Змінні середовища](../setup/environment-variables.md)** -- Повний довідник з налаштування мобільного середовища
