---
title: "Mobil Dağıtım"
---

# Mobil Dağıtım

<div class="article-intro">

ChurchApps mobil uygulamaları **Expo EAS Build** ile derlenir ve uygulama mağazaları aracılığıyla dağıtılır. Bu sayfa, hem Android hem de iOS için derleme, gönderme ve over-the-air (OTA) güncellemelerini yayınlama adımlarını kapsar.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Mobil uygulamayı yerel olarak kurun -- bkz. [B1 Mobile](../mobile/b1-mobile)
- [EAS CLI](https://docs.expo.dev/eas/) aracını kurun ve yapılandırın
- Google Play Console (Android) ve/veya Apple App Store Connect (iOS) erişiminiz olsun

</div>

## Derleme

### Android

```bash
npm run build:android
```

### iOS

```bash
eas build --platform ios --profile production
```

## Uygulama Mağazalarına Gönderme

### Android -- Google Play Store

EAS derlemesi başarıyla tamamlandıktan sonra Android ikili dosyası (AAB), Play Console üzerinden Google Play Store'a gönderilir.

### iOS -- Apple App Store

iOS derlemesini doğrudan EAS üzerinden gönderin:

```bash
eas submit --platform ios
```

## OTA Güncellemeleri

Mağaza incelemesi gerektirmeyen yalnızca JavaScript değişiklikleri için over-the-air (OTA) güncellemelerini kullanın:

```bash
npm run update:production
```

Bu, tam bir mağaza gönderimi yapmadan değişiklikleri doğrudan kullanıcılara iletmek için EAS Update'i kullanır.

:::tip
OTA güncellemeleri mağaza derlemelerinden önemli ölçüde daha hızlıdır -- değişiklikler günler yerine dakikalar içinde kullanıcılara ulaşabilir. Yerel kod değişikliği içermeyen hata düzeltmeleri, metin değişiklikleri ve küçük arayüz güncellemeleri için bunları kullanın.
:::

## Sürüm Numaraları

Mağaza derlemesi oluşturmadan önce, sürüm numaraları birden fazla dosyada güncellenmelidir:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/*/Info.plist`
- `ios/*/project.pbxproj`

:::warning
Sürüm numaralarını tüm dosyalarda güncellemeyi unutmak derleme hatalarına veya uygulama mağazası reddine yol açar. Üretim derlemesine başlamadan önce yukarıda listelenen her dosyayı iki kez kontrol edin.
:::

## İlgili Makaleler

- **[B1 Mobile](../mobile/b1-mobile)** -- Yerel kurulum ve geliştirme kılavuzu
- **[API Dağıtımı](./apis)** -- Arka uç API'lerinin dağıtımı
- **[Web Uygulaması Dağıtımı](./web-apps)** -- Ön yüz web uygulamalarının dağıtımı
