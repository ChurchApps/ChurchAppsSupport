---
title: "Proje Genel Bakışı"
description: "Her ChurchApps deposunu kategorisine göre listeleyin: çerçeveler, geliştirme portları, veritabanları ve paylaşılan @churchapps paketlerinin bunları nasıl birbirine bağladığı; geliştirici kurulum dokümanlarında."
---

# Proje Genel Bakışı

<div class="article-intro">

ChurchApps, [ChurchApps GitHub organizasyonu](https://github.com/ChurchApps) altında yayımlanan yaklaşık 20 bağımsız depodan oluşmaktadır. Bu sayfa, tüm projelerin kategorilere göre düzenlenmiş eksiksiz bir envanterini; çerçeveleri, portları ve aralarındaki ilişkileri içermektedir.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Üzerinde çalışmak istediğiniz proje kategorisi için [ön koşulları](./prerequisites.md) yükleyin

</div>

## Arka Uç API'leri

Tüm API'ler Node.js, Express ve TypeScript ile geliştirilmiştir ve Serverless Framework aracılığıyla AWS Lambda'ya dağıtılmaktadır.

| Proje | Amaç | Geliştirme Portu | Veritabanı |
|-------|------|------------------|------------|
| **[Api](https://github.com/ChurchApps/Api)** | Üyelik, yoklama, içerik, bağış, mesajlaşma ve görevleri kapsayan çekirdek modüler monolit | 8084 | Modül başına ayrı MySQL veritabanı (toplam 6) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Lessons.church arka ucu | -- | Tek `lessons` MySQL veritabanı |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | OpenAI destekli yapay zeka sorgu aracı | -- | -- |

:::info
Çekirdek **Api** projesi modüler bir monolittir. Her modül (üyelik, yoklama, içerik, bağış, mesajlaşma, görevler) kendi veritabanına sahiptir ve `/membership` veya `/giving` gibi bir alt yol üzerinden erişilebilir. Üretim ortamında bunlar, API Gateway arkasında ayrı Lambda fonksiyonları olarak sunulmaktadır.
:::

## Web Uygulamaları

| Proje | Çerçeve | Geliştirme Portu | Amaç |
|-------|---------|------------------|------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | Kilise yönetim paneli |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Halka açık kilise üye uygulaması |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Lessons.church ön yüzü |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Veri içe/dışa aktarma aracı |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Statik | -- | Statik kilise broşür web siteleri |

## Mobil Uygulamalar

Tüm mobil uygulamalar Expo ile React Native kullanmaktadır.

| Proje | Amaç | Önemli Sürümler |
|-------|------|-----------------|
| **[B1Mobile](https://github.com/ChurchApps/B1Mobile)** | iOS ve Android için kilise üye uygulaması | Expo 54, React Native 0.81 |
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Yoklama kiosk uygulaması | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Android TV ders ekranı | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | İçerik oynatma (TV işletim sistemleri dahil) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | FreeShow için mobil uzaktan kumanda | Expo |

## Masaüstü

| Proje | Yığın | Amaç |
|-------|-------|------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Sunum ve ibadet yazılımı |

## Paylaşılan Kütüphaneler

Paylaşılan kod, `@churchapps` kapsamı altında npm'de yayımlanır ve yukarıdaki projeler tarafından normal npm bağımlılığı olarak kullanılır. Tüm paylaşılan paketler tek bir depoda bulunur -- [Packages](https://github.com/ChurchApps/Packages) -- Yarn çalışma alanı olarak yönetilir ve changesets ile yayımlanır.

| Paket | Amaç | Kullanan Projeler |
|-------|------|-------------------|
| `@churchapps/helpers` | Temel yardımcı araçlar ve paylaşılan TypeScript arayüzleri (DateHelper, ApiHelper, CurrencyHelper vb.) | Tüm projeler |
| `@churchapps/apihelper` | Express sunucu yardımcı araçları (kimlik doğrulama, temel denetleyiciler, veritabanı erişimi, AWS entegrasyonları) | Tüm API'ler |
| `@churchapps/apphelper` | Oturum açma, bağışlar, formlar, markdown ve web sitesi oluşturma için alt yol modülleri içeren React bileşen kütüphanesi | Tüm web uygulamaları |
| `@churchapps/content-providers` | Üçüncü taraf içerik sağlayıcı soyutlaması (Lessons.church, Planning Center, Dropbox ve diğerleri) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | B1.church entegrasyon araç seti: webhook'lar, REST istemcisi, OAuth | Harici entegrasyon geliştiricileri |
| `@churchapps/texting` | SMS sağlayıcı soyutlaması | Api |

Çalışma alanı kurulumu ve yayım iş akışı için [Paylaşılan Kütüphaneler](../shared-libraries/index.md) bölümüne bakın.

## Proje İlişkileri

```
Ön Yüz Uygulamaları        Paylaşılan Kütüphaneler    Arka Uç API'leri
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
B1Mobile     ──────┤                                   AskApi
FreeShow     ──────┘       @churchapps/apihelper ◄────┘
```

Tüm ön yüz uygulamaları `@churchapps/helpers` paketine bağlıdır. Web uygulamaları ayrıca `@churchapps/apphelper` paketlerine bağlıdır. Tüm arka uç API'leri hem `@churchapps/helpers` hem de `@churchapps/apihelper` paketlerine bağlıdır.

## Sonraki Adımlar

- **[Ortam Değişkenleri](./environment-variables.md)** -- API'lere bağlanmak için `.env` dosyalarınızı yapılandırın
- **[API Yerel Kurulumu](../api/local-setup.md)** -- Arka uç API'sini yerel olarak kurun
