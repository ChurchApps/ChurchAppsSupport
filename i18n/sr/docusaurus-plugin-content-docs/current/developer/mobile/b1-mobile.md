---
title: "B1 Mobile"
---

# B1 Mobile

<div class="article-intro">

B1 Mobile је основна мобилна апликација за чланове ChurchApps, направљена помоћу React Native и Expo. Омогућава црквеним члановима да прегледају именик, приступе донацијама, евидентирају присуство, примају обавештења и комуницирају са својом црквеном заједницом.

</div>

<div class="prereqs">
<h4>Пре него што почнете</h4>

- Инсталирајте **Node.js** и **Expo CLI** -- погледајте [Предуслови](../setup/prerequisites)
- Инсталирајте **Android Studio** (за Android емулатор) или **Xcode** (за iOS симулатор)
- Подесите свој API циљ (демо или локални) -- погледајте [Променљиве окружења](../setup/environment-variables)

</div>

## Подешавање

1. Клонирајте репозиторијум:

   ```bash
   git clone https://github.com/ChurchApps/B1Mobile.git
   ```

2. Инсталирајте зависности:

   ```bash
   cd B1Mobile && npm install
   ```

3. Подесите променљиве окружења -- копирајте пример датотеке и ажурирајте API крајње тачке:

   ```bash
   cp dotenv.sample.txt .env
   ```

4. Покрените Expo dev server:

   ```bash
   npm start
   ```

:::tip
Можете користити апликацију **Expo Go** на физичком уређају за брзо тестирање без подешавања Android Studio или Xcode.
:::

## Променљиве окружења

| Променљива | Опис |
|----------|-------------|
| `STAGE` | Фаза окружења (нпр. `dev`, `staging`, `prod`) |
| `CONTENT_ROOT` | Основни URL за испоруку садржаја |
| `MEMBERSHIP_API` | Крајња тачка API-ја за чланство |
| `MESSAGING_API` | Крајња тачка API-ја за поруке |
| `ATTENDANCE_API` | Крајња тачка API-ја за присуство |
| `GIVING_API` | Крајња тачка API-ја за донације |
| `DOING_API` | Крајња тачка API-ја за задатке |
| `CONTENT_API` | Крајња тачка API-ја за садржај |
| `LESSONS_ROOT` | Основни URL за садржај лекција |

## Кључне команде

| Команда | Опис |
|---------|-------------|
| `npm start` | Покреће Expo dev server |
| `npm run android` | Покреће на Android емулатору |
| `npm run ios` | Покреће на iOS симулатору |
| `npm run test` | Покреће тестове (Jest) |

## Продукцијске верзије

Пре него што направите продукцијску верзију, ажурирајте бројеве верзија у свим следећим датотекама:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/B1Mobile/Info.plist`

### Android

```bash
npm run build:android
```

Ово користи EAS Build за креирање Android бинарне датотеке.

### iOS

```bash
eas build --platform ios --profile production
```

### OTA ажурирања

Да бисте објавили ажурирање путем интернета (без проласка кроз преглед у продавници апликација):

```bash
npm run update:production
```

:::info
OTA ажурирања су идеална за измене само у JavaScript-у. Ако мењате нативни код или зависности, морате уместо тога послати пуну верзију у продавницу.
:::

## Сродни чланци

- **[Mobile Deployment](../deployment/mobile)** -- Потпуни водич за израду, слање и објављивање мобилних апликација
- **[Environment Variables](../setup/environment-variables)** -- Комплетан референтни водич за конфигурацију мобилног окружења
