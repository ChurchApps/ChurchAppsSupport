---
title: "Implementarea aplicației mobile"
description: "Parcurge construirea versiunilor Android și iOS ale aplicației B1 Mobile cu Expo EAS, trimiterea lor în magazinele de aplicații și publicarea actualizărilor OTA."
---

# Implementarea aplicației mobile

<div class="article-intro">

Aplicațiile mobile ChurchApps sunt construite și implementate folosind **Expo EAS Build** și distribuite prin magazinele de aplicații. Această pagină acoperă construirea, trimiterea și publicarea actualizărilor over-the-air (OTA) atât pentru Android, cât și pentru iOS.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Configurați aplicația mobilă local -- consultați [B1 Mobile](../mobile/b1-mobile.md)
- Instalați și configurați [EAS CLI](https://docs.expo.dev/eas/)
- Aveți acces la Google Play Console (Android) și/sau Apple App Store Connect (iOS)

</div>

## Construirea

### Android

```bash
npm run build:android
```

### iOS

```bash
eas build --platform ios --profile production
```

## Trimiterea în magazinele de aplicații

### Android -- Google Play Store

După o construire EAS reușită, fișierul binar Android (AAB) este trimis în Google Play Store prin Play Console.

### iOS -- Apple App Store

Trimiteți direct versiunea iOS prin EAS:

```bash
eas submit --platform ios
```

## Actualizări OTA

Pentru modificările care afectează doar JavaScript și nu necesită evaluare din partea magazinului de aplicații, utilizați actualizările over-the-air (OTA):

```bash
npm run update:production
```

Aceasta folosește EAS Update pentru a transmite modificările direct utilizatorilor, fără o trimitere completă în magazin.

:::tip
Actualizările OTA sunt semnificativ mai rapide decât construirile pentru magazin -- modificările pot ajunge la utilizatori în câteva minute, nu în câteva zile. Folosiți-le pentru corecturi de erori, modificări de text și ajustări minore ale interfeței care nu presupun modificări de cod nativ.
:::

## Numerele versiunilor

Înainte de a crea o construire pentru magazin, numerele versiunilor trebuie actualizate în mai multe fișiere:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/*/Info.plist`
- `ios/*/project.pbxproj`

:::warning
Dacă uitați să actualizați numerele versiunilor în toate fișierele, construirea va eșua sau aplicația va fi respinsă de magazinul de aplicații. Verificați cu atenție fiecare fișier din lista de mai sus înainte de a începe o construire de producție.
:::

## Articole înrudite

- **[B1 Mobile](../mobile/b1-mobile.md)** -- Ghid de configurare locală și de dezvoltare
- **[Implementarea API-urilor](./apis.md)** -- Implementarea serviciilor backend
- **[Implementarea aplicațiilor web](./web-apps.md)** -- Implementarea aplicațiilor web frontend
