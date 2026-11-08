---
title: "Mobil Dağıtım"
description: "Expo tabanlı uygulamaların (ör. B1 Checkin) Android ve iOS sürümlerinin nasıl oluşturulacağını, uygulama mağazalarına nasıl gönderileceğini ve EAS ile OTA güncellemelerinin nasıl yayımlanacağını adım adım anlatır."
---

# Mobil Dağıtım

<div class="article-intro">

ChurchApps'in Expo mobil uygulamaları, örneğin B1 Checkin, **Expo EAS Build** ile veya yerel bir Gradle derlemesiyle oluşturulur ve uygulama mağazaları aracılığıyla dağıtılır. Bu sayfa, B1 Checkin'i örnek alarak hem Android hem de iOS için derleme, gönderme ve over-the-air (OTA) güncellemesi yayımlama işlemlerini kapsar.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Uygulamayı yerel olarak kurun -- bkz. [Mobil Uygulamalar](../mobile/index.md#local-setup)
- [EAS CLI](https://docs.expo.dev/eas/) aracını kurup yapılandırın
- Google Play Console (Android) ve/veya Apple App Store Connect (iOS) erişiminiz olsun

</div>

## Derleme

### Android

Android sürüm derlemeleri yerel olarak çalışır ve EAS'ten alınan sürüm anahtar deposu (keystore) ile imzalanır. Bunu bir kez `npx eas-cli credentials -p android` komutuyla indirin (**credentials.json: Download credentials from EAS** seçeneğini seçin), ardından çalıştırın:

```bash
yarn build:android
```

Google Play paketi `android/app/build/outputs/bundle/release/app-release.aab` konumuna yazılır. Bunun yerine EAS üzerinde derlemek için `yarn build:android:eas` komutunu çalıştırın.

### iOS

iOS derlemeleri her zaman EAS üzerinde çalışır:

```bash
yarn build:ios
```

## Mağazalara Gönderme

### Android -- Google Play Store

AAB dosyasını Play Console üzerinden yükleyin ya da EAS ile gönderin:

```bash
npx eas-cli submit -p android --path android/app/build/outputs/bundle/release/app-release.aab
```

### iOS -- Apple App Store

iOS derlemesini doğrudan EAS üzerinden gönderin:

```bash
eas submit --platform ios
```

## OTA Güncellemeleri

Mağaza incelemesi gerektirmeyen yalnızca JavaScript değişiklikleri için over-the-air (OTA) güncellemelerini kullanın:

```bash
yarn update
```

Bu, tam bir mağaza gönderimi yapmadan EAS Update ile değişiklikleri doğrudan kullanıcılara iletir.

:::tip
OTA güncellemeleri mağaza derlemelerinden belirgin biçimde hızlıdır -- değişiklikler günler yerine dakikalar içinde kullanıcılara ulaşabilir. Yerel kod değişikliği içermeyen hata düzeltmeleri, metin değişiklikleri ve küçük arayüz güncellemeleri için bunları kullanın.
:::

## Sürüm Numaraları

Mağaza derlemesi oluşturmadan önce, sürüm numaraları birden fazla dosyada güncellenmelidir:

- `package.json`
- `app.json`
- `android/app/build.gradle` (`versionName` ve `versionCode`)

iOS derleme numarası EAS tarafından otomatik olarak artırılır.

:::warning
Sürüm numaralarını tüm dosyalarda güncellemeyi unutmak derleme hatalarına veya uygulama mağazası tarafından reddedilmeye yol açar. Üretim derlemesi başlatmadan önce yukarıda listelenen her dosyayı iki kez kontrol edin.
:::

## İlgili Makaleler

- **[Mobil Uygulamalar](../mobile/index.md)** -- Yerel kurulum ve geliştirme kılavuzu
- **[API Dağıtımı](./apis.md)** -- Arka uç API'lerinin dağıtımı
- **[Web Uygulaması Dağıtımı](./web-apps.md)** -- Ön yüz web uygulamalarının dağıtımı
