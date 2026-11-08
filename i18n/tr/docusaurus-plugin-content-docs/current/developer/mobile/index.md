---
title: "Mobil Uygulamalar"
description: "ChurchApps'in Expo ve React Native mobil uygulamalarına, B1 Checkin ve LessonsScreen'e genel bakış ile ortak Expo araç zinciri için yerel kurulum adımları."
---

# Mobil Uygulamalar

<div class="article-intro">

ChurchApps mobil uygulamaları **React Native** ve **Expo** ile geliştirilir ve Android, iOS ve Android TV'de yerel deneyimler sunar. Tüm mobil uygulamalar aynı Expo tabanlı araç zincirini paylaşır; bu yüzden birini derleyebiliyorsanız hepsini derleyebilirsiniz.

</div>

## Uygulamalar

| Uygulama | Amaç | Platform |
|-----|---------|----------|
| B1 Checkin | Yoklama istasyonları için kiosk uygulaması | Android, iOS |
| LessonsScreen | Sınıflarda dersleri göstermek için Android TV uygulaması | Android TV |

:::info
Üyelere yönelik uygulama B1 App'tir -- B1App'in, üyelerin Progressive Web App olarak yükleyebildiği `/mobile` bölümüdür. Bu bir web uygulamasıdır, Expo projesi değildir; yerel olarak çalıştırmak için [Web Uygulamaları](../web-apps/index.md) bölümüne bakın.
:::

### B1 Checkin

Kiliselerdeki yoklama istasyonları için özel olarak tasarlanmış bir kiosk uygulamasıdır. Üyelerin çocukları yoklamaya almasını ve ibadet ile etkinliklerdeki katılımı kaydetmesini sağlayan basit, dokunmatik ekran dostu bir arayüz sunar.

### LessonsScreen

Sınıflarda ders içeriğini gösteren bir Android TV uygulamasıdır. Öğretmenler ders slaytlarını, videolarını ve etkinliklerini bir TV ekranına gönderebilir; böylece derslerde müfredat materyallerini sunmak kolaylaşır.

## Yerel Kurulum

Tüm mobil uygulamalar aynı Expo tabanlı araç zincirini paylaşır ve benzer kurulum adımlarını izler. Örnek olarak B1 Checkin'i ele alalım:

1. **Node.js**, Android Emulator için Android Studio ve iOS simülatörü için Xcode'u (yalnızca macOS) kurun -- bkz. [Ön Koşullar](../setup/prerequisites.md).
2. Depoyu klonlayın ve bağımlılıkları yükleyin (B1 Checkin, Yarn kullanır):

   ```bash
   git clone https://github.com/ChurchApps/B1Checkin.git
   cd B1Checkin && yarn install
   ```

3. `dotenv.sample.txt` dosyasını `.env` olarak kopyalayın ve uygulamanın bağlanacağı ortamı ayarlayın (yerel bir API için `dev`) -- bkz. [Ortam Değişkenleri](../setup/environment-variables.md#b1checkin-react-native--expo).
4. `yarn start` ile Expo geliştirme sunucusunu başlatın, ardından uygulamayı bir emülatörde veya cihazda çalıştırmak için `yarn android` ya da `yarn ios` komutunu çalıştırın.

Sürüm derlemeleri ve over-the-air güncellemeler için [Mobil Dağıtım](../deployment/mobile.md) bölümüne bakın.
