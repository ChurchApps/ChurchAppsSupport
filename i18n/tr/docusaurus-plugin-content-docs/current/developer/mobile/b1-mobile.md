---
title: "B1 Mobil"
description: "B1 Mobile React Native/Expo uygulamasını yerel olarak kurup çalıştırın, API uç noktalarını yapılandırın ve Android veya iOS için derleyin. B1 Mobile'ın kullanımdan kaldırıldığını unutmayın."
---

# B1 Mobil

<div class="article-intro">

B1 Mobil, React Native ve Expo ile geliştirilmiş, ChurchApps'in birincil üye odaklı mobil uygulamasıdır. Kilise üyelerinin dizinleri görüntülemesine, bağış işlemlerine erişmesine, yoklamaya katılmasına, bildirim almasına ve kilise topluluğuyla etkileşim kurmasına olanak tanır.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- **Node.js** ve **Expo CLI** kurun -- bkz. [Ön Koşullar](../setup/prerequisites.md)
- **Android Studio** (Android emülatörü için) veya **Xcode** (iOS simülatörü için) kurun
- API hedefinizi yapılandırın (demo veya yerel) -- bkz. [Ortam Değişkenleri](../setup/environment-variables.md)

</div>

## Kurulum

1. Depoyu klonlayın:

   ```bash
   git clone https://github.com/ChurchApps/B1Mobile.git
   ```

2. Bağımlılıkları yükleyin:

   ```bash
   cd B1Mobile && npm install
   ```

3. Ortam değişkenlerini yapılandırın -- örnek dosyayı kopyalayın ve API uç noktalarını güncelleyin:

   ```bash
   cp dotenv.sample.txt .env
   ```

4. Expo geliştirme sunucusunu başlatın:

   ```bash
   npm start
   ```

:::tip
Android Studio veya Xcode kurmadan hızlı test yapmak için fiziksel bir cihazda **Expo Go** uygulamasını kullanabilirsiniz.
:::

## Ortam Değişkenleri

| Değişken | Açıklama |
|----------|-------------|
| `STAGE` | Ortam aşaması (ör. `dev`, `staging`, `prod`) |
| `CONTENT_ROOT` | İçerik dağıtımı için kök URL |
| `MEMBERSHIP_API` | Üyelik API uç noktası |
| `MESSAGING_API` | Mesajlaşma API uç noktası |
| `ATTENDANCE_API` | Yoklama API uç noktası |
| `GIVING_API` | Bağış API uç noktası |
| `DOING_API` | Doing API uç noktası |
| `CONTENT_API` | İçerik API uç noktası |
| `LESSONS_ROOT` | Ders içeriği için kök URL |

## Temel Komutlar

| Komut | Açıklama |
|---------|-------------|
| `npm start` | Expo geliştirme sunucusunu başlatır |
| `npm run android` | Android emülatöründe çalıştırır |
| `npm run ios` | iOS simülatöründe çalıştırır |
| `npm run test` | Testleri çalıştırır (Jest) |

## Üretim Derlemeleri

Üretim derlemesi oluşturmadan önce, sürüm numaralarını aşağıdaki tüm dosyalarda güncelleyin:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/B1Mobile/Info.plist`

### Android

```bash
npm run build:android
```

Bu komut, Android ikili dosyasını oluşturmak için EAS Build kullanır.

### iOS

```bash
eas build --platform ios --profile production
```

### OTA Güncellemeleri

Uygulama mağazası incelemesinden geçmeden, havadan (OTA) güncelleme göndermek için:

```bash
npm run update:production
```

:::info
OTA güncellemeleri yalnızca JavaScript değişiklikleri için idealdir. Yerel kodu veya bağımlılıkları değiştirirseniz, bunun yerine tam bir mağaza derlemesi göndermeniz gerekir.
:::

## İlgili Makaleler

- **[Mobil Dağıtım](../deployment/mobile.md)** -- Mobil uygulamaları derleme, gönderme ve dağıtma hakkında tam kılavuz
- **[Ortam Değişkenleri](../setup/environment-variables.md)** -- Mobil ortam yapılandırması için eksiksiz başvuru
