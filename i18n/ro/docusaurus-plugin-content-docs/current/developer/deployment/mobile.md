---
title: "Implementarea aplicației mobile"
description: "Ghid pas cu pas pentru construirea versiunilor Android și iOS ale aplicațiilor Expo, precum B1 Checkin, trimiterea lor în magazinele de aplicații și publicarea actualizărilor OTA cu EAS."
---

# Implementarea aplicației mobile

<div class="article-intro">

Aplicațiile mobile Expo ale ChurchApps, precum B1 Checkin, sunt construite cu **Expo EAS Build** sau printr-o compilare Gradle locală și distribuite prin magazinele de aplicații. Această pagină explică modul de construire, trimitere și publicare a actualizărilor over-the-air (OTA) atât pentru Android, cât și pentru iOS, folosind B1 Checkin ca exemplu.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Configurați aplicația local -- consultați [Aplicații mobile](../mobile/index.md#local-setup)
- Instalați și configurați [EAS CLI](https://docs.expo.dev/eas/)
- Aveți acces la Google Play Console (Android) și/sau Apple App Store Connect (iOS)

</div>

## Construirea

### Android

Versiunile Android de lansare se construiesc local și sunt semnate cu keystore-ul de lansare din EAS. Descărcați-l o singură dată cu `npx eas-cli credentials -p android` (alegeți **credentials.json: Download credentials from EAS**), apoi rulați:

```bash
yarn build:android
```

Pachetul Google Play este scris în `android/app/build/outputs/bundle/release/app-release.aab`. Pentru a construi în schimb pe EAS, rulați `yarn build:android:eas`.

### iOS

Versiunile iOS se construiesc întotdeauna pe EAS:

```bash
yarn build:ios
```

## Trimiterea în magazinele de aplicații

### Android -- Google Play Store

Încărcați fișierul AAB prin Play Console sau trimiteți-l cu EAS:

```bash
npx eas-cli submit -p android --path android/app/build/outputs/bundle/release/app-release.aab
```

### iOS -- Apple App Store

Trimiteți versiunea iOS direct prin EAS:

```bash
eas submit --platform ios
```

## Actualizări OTA

Pentru modificările exclusiv JavaScript, care nu necesită evaluarea de către magazinul de aplicații, folosiți actualizările over-the-air (OTA):

```bash
yarn update
```

Aceasta folosește EAS Update pentru a trimite modificările direct utilizatorilor, fără o trimitere completă în magazin.

:::tip
Actualizările OTA sunt mult mai rapide decât versiunile din magazin -- modificările pot ajunge la utilizatori în câteva minute, nu în zile. Folosiți-le pentru corecturi de erori, modificări de text și ajustări minore ale interfței, care nu implică modificări de cod nativ.
:::

## Numerele de versiune

Înainte de a crea o versiune pentru magazin, numerele de versiune trebuie actualizate în mai multe fișiere:

- `package.json`
- `app.json`
- `android/app/build.gradle` (`versionName` și `versionCode`)

Numărul de build pentru iOS este incrementat automat de EAS.

:::warning
Dacă uitați să actualizați numerele de versiune în toate fișierele, vor apărea erori de compilare sau respingerea aplicației de către magazin. Verificați din nou fiecare fișier enumerat mai sus înainte de a începe o versiune de producție.
:::

## Articole conexe

- **[Aplicații mobile](../mobile/index.md)** -- Ghid de configurare locală și de dezvoltare
- **[Implementarea API-urilor](./apis.md)** -- Implementarea API-urilor din backend
- **[Implementarea aplicațiilor web](./web-apps.md)** -- Implementarea aplicațiilor web din frontend
