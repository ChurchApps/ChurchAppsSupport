---
title: "B1 Mobile"
---

# B1 Mobile

<div class="article-intro">

B1 Mobile este aplicația mobilă principală pentru membri a ChurchApps, construită cu React Native și Expo. Aceasta le permite membrilor bisericii să vizualizeze directoarele, să acceseze donațiile, să verifice prezența, să primească notificări și să interacționeze cu comunitatea bisericii.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Instalați **Node.js** și **Expo CLI** -- vezi [Cerințe prealabile](../setup/prerequisites)
- Instalați **Android Studio** (pentru emulatorul Android) sau **Xcode** (pentru simulatorul iOS)
- Configurați ținta API (demo sau locală) -- vezi [Variabile de mediu](../setup/environment-variables)

</div>

## Configurare

1. Clonați depozitul:

   ```bash
   git clone https://github.com/ChurchApps/B1Mobile.git
   ```

2. Instalați dependențele:

   ```bash
   cd B1Mobile && npm install
   ```

3. Configurați variabilele de mediu -- copiați fișierul exemplu și actualizați punctele de acces API:

   ```bash
   cp dotenv.sample.txt .env
   ```

4. Porniți serverul de dezvoltare Expo:

   ```bash
   npm start
   ```

:::tip
Puteți utiliza aplicația **Expo Go** pe un dispozitiv fizic pentru testare rapidă, fără a configura Android Studio sau Xcode.
:::

## Variabile de mediu

| Variabilă | Descriere |
|----------|-------------|
| `STAGE` | Etapa de mediu (de ex., `dev`, `staging`, `prod`) |
| `CONTENT_ROOT` | URL-ul rădăcină pentru livrarea conținutului |
| `MEMBERSHIP_API` | Punctul de acces API pentru membri |
| `MESSAGING_API` | Punctul de acces API pentru mesagerie |
| `ATTENDANCE_API` | Punctul de acces API pentru prezență |
| `GIVING_API` | Punctul de acces API pentru donații |
| `DOING_API` | Punctul de acces API pentru activități |
| `CONTENT_API` | Punctul de acces API pentru conținut |
| `LESSONS_ROOT` | URL-ul rădăcină pentru conținutul lecțiilor |

## Comenzi principale

| Comandă | Descriere |
|---------|-------------|
| `npm start` | Pornește serverul de dezvoltare Expo |
| `npm run android` | Rulează pe emulatorul Android |
| `npm run ios` | Rulează pe simulatorul iOS |
| `npm run test` | Rulează testele (Jest) |

## Versiuni de producție

Înainte de a crea o versiune de producție, actualizați numerele de versiune în toate următoarele fișiere:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/B1Mobile/Info.plist`

### Android

```bash
npm run build:android
```

Aceasta utilizează EAS Build pentru a crea fișierul binar Android.

### iOS

```bash
eas build --platform ios --profile production
```

### Actualizări OTA

Pentru a trimite o actualizare over-the-air (fără a trece prin revizuirea din magazinul de aplicații):

```bash
npm run update:production
```

:::info
Actualizările OTA sunt ideale pentru modificările doar în JavaScript. Dacă modificați codul nativ sau dependențele, trebuie să trimiteți în schimb o versiune completă pentru magazin.
:::

## Articole conexe

- **[Implementarea aplicațiilor mobile](../deployment/mobile)** -- Ghid complet pentru compilarea, trimiterea și implementarea aplicațiilor mobile
- **[Variabile de mediu](../setup/environment-variables)** -- Referință completă pentru configurarea mediului mobil
