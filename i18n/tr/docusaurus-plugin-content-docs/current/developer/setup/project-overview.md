---
title: "Proje Genel Bakışı"
description: "Geliştirici kurulum belgelerinde her ChurchApps deposunu kategorilere göre, çerçeveleri, geliştirme portlarını, veritabanlarını ve paylaşılan @churchapps paketlerinin bunları nasıl birbirine bağladığını gösteren harita."
---

# Proje Genel Bakışı

<div class="article-intro">

ChurchApps, her biri [ChurchApps GitHub organizasyonu](https://github.com/ChurchApps) altında yayımlanan yaklaşık 20 bağımsız depodan oluşur. Bu sayfa, tüm projelerin kategorilere göre düzenlenmiş eksiksiz bir envanterini, çerçeveleri, portlarını ve aralarındaki ilişkileri sunar.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Üzerinde çalışmak istediğiniz proje kategorisi için [ön koşulları](./prerequisites.md) kurun

</div>

## Arka Uç API'leri

Tüm API'ler Node.js, Express ve TypeScript ile geliştirilir ve Serverless Framework aracılığıyla AWS Lambda'ya dağıtılır.

| Proje | Amaç | Geliştirme Portu | Veritabanı |
|---------|---------|----------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | Üyelik, yoklama, içerik, bağış, mesajlaşma ve görevleri kapsayan çekirdek modüler monolit | 8084 | Modül başına ayrı MySQL veritabanı (toplam 6) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Lessons.church arka ucu | -- | Tek `lessons` MySQL veritabanı |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | OpenAI destekli yapay zeka sorgu aracı | -- | -- |

:::info
Çekirdek **Api** projesi modüler bir monolittir. Her modülün (üyelik, yoklama, içerik, bağış, mesajlaşma, görevler) kendi veritabanı vardır ve `/membership` veya `/giving` gibi bir alt yol üzerinden erişilir. Üretim ortamında bunlar API Gateway arkasında ayrı Lambda fonksiyonları olarak sunulur.
:::

## Web Uygulamaları

| Proje | Çerçeve | Geliştirme Portu | Amaç |
|---------|-----------|----------|---------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | Kilise yönetim paneli |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Kilise üyelerine yönelik genel uygulama |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Lessons.church ön yüzü |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Veri içe/dışa aktarma aracı |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Statik | -- | Statik kilise broşür siteleri |

## Mobil Uygulamalar

Tüm mobil uygulamalar Expo ile React Native kullanır.

| Proje | Amaç | Önemli Sürümler |
|---------|---------|--------------|
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Yoklama kiosk uygulaması | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Android TV ders ekranı | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | İçerik oynatma (TV işletim sistemleri dahil) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | FreeShow için mobil uzaktan kumanda | Expo |

## Masaüstü

| Proje | Yığın | Amaç |
|---------|-------|---------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Sunum ve ibadet yazılımı |

## Paylaşılan Kütüphaneler

Paylaşılan kod, `@churchapps` kapsamı altında npm'e yayımlanır ve yukarıdaki projeler tarafından normal npm bağımlılıkları olarak kullanılır. Tüm paylaşılan paketler tek bir depoda bulunur -- [Packages](https://github.com/ChurchApps/Packages) -- bir Yarn çalışma alanı olarak yönetilir ve changesets ile yayımlanır.

| Paket | Amaç | Kullanan Projeler |
|---------|---------|---------|
| `@churchapps/helpers` | Temel yardımcı araçlar ve paylaşılan TypeScript arayüzleri (DateHelper, ApiHelper, CurrencyHelper vb.) | Tüm projeler |
| `@churchapps/apihelper` | Express sunucu yardımcı araçları (kimlik doğrulama, temel denetleyiciler, veritabanı erişimi, AWS entegrasyonları) | Tüm API'ler |
| `@churchapps/apphelper` | Giriş, bağışlar, formlar, markdown ve web sitesi oluşturma için alt yol modülleri içeren React bileşen kitaplığı | Tüm web uygulamaları |
| `@churchapps/content-providers` | Üçüncü taraf içerik sağlayıcı soyutlaması (Lessons.church, Planning Center, Dropbox ve diğerleri) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | B1.church entegrasyon araç seti: webhook'lar, REST istemcisi, OAuth | Harici entegrasyon geliştiricileri |
| `@churchapps/texting` | SMS sağlayıcı soyutlaması | Api |

Çalışma alanı kurulumu ve sürüm yayınlama iş akışı için bkz. [Paylaşılan Kütüphaneler](../shared-libraries/index.md).

## Proje İlişkileri

```
Ön Uç Uygulamaları         Paylaşılan Kütüphaneler    Arka Uç API'leri
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
FreeShow     ──────┘                                   AskApi
                           @churchapps/apihelper ◄────┘
```

Tüm ön uç uygulamaları `@churchapps/helpers` paketine bağlıdır. Web uygulamaları ayrıca `@churchapps/apphelper` paketlerine bağlıdır. Tüm arka uç API'leri hem `@churchapps/helpers` hem de `@churchapps/apihelper` paketlerine bağlıdır.

## Sonraki Adımlar

- **[Ortam Değişkenleri](./environment-variables.md)** -- API'lere bağlanmak için `.env` dosyalarınızı yapılandırın
- **[API Yerel Kurulumu](../api/local-setup.md)** -- Arka uç API'sini yerel olarak kurun
