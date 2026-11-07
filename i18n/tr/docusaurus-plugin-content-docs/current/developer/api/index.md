---
title: "API"
---

# API

<div class="article-intro">

ChurchApps API, her biri kendi veritabanına sahip altı veri modülüne hizmet veren tek bir kod tabanından oluşan **modüler tek parça** (modular monolith) bir mimaridir. Bu mimari, mikro hizmetlerin organizasyonel avantajlarını (net sınırlar, bağımsız veri depoları) tek bir dağıtımın işletimsel sadeliğiyle birleştirir.

</div>

## Modüller

| Modül | Amaç |
|--------|---------|
| **Membership** | Kişiler, gruplar, haneler, izinler |
| **Attendance** | Hizmetler, oturumlar, check-in kayıtları |
| **Content** | Sayfalar, bölümler, öğeler, yayın |
| **Giving** | Bağışlar, fonlar, ödeme işleme |
| **Messaging** | Konuşmalar, bildirimler, e-posta |
| **Doing** | Görevler, planlar, atamalar |

## Teknoloji Yığını

- **Çalışma zamanı:** TypeScript (ES modülleri) ile Node.js 24.x
- **Çerçeve:** Express
- **Bağımlılık Enjeksiyonu:** Inversify (dekoratör tabanlı yönlendirme)
- **Veritabanı:** MySQL -- modül başına bir veritabanı, her biri kendi bağlantı havuzuna sahip
- **Kimlik doğrulama:** `CustomAuthProvider` aracılığıyla JWT tabanlı kimlik doğrulama
- **Dağıtım:** Serverless Framework v3 ile AWS Lambda

## Portlar

| Protokol | Port | Açıklama |
|----------|------|-------------|
| HTTP | `8084` | Ana REST API |
| WebSocket | `8087` | Gerçek zamanlı soket bağlantıları |

## Lambda Fonksiyonları

AWS'ye dağıtıldığında API, altı Lambda fonksiyonu olarak çalışır:

- **`web`** -- Tüm HTTP isteklerini işler
- **`socket`** -- WebSocket bağlantılarını yönetir
- **`timer15Min`** -- E-posta bildirimleri için her 30 dakikada bir çalışır (ad tarihseldir)
- **`timerMidnight`** -- Özet e-postaları ve bakım görevleri için her gün çalışır
- **`timerScheduledTasks`** -- Zamanı gelmiş otomasyonlar ve gecikmiş iş akışı işlemleri için her gün çalışır
- **`timerWebhooks`** -- Kuyruğa alınmış giden webhook'ları iletmek için her dakika çalışır

## Paylaşılan Kütüphaneler

API, iki paylaşılan ChurchApps paketine bağlıdır:

- **[`@churchapps/helpers`](../shared-libraries/helpers)** -- Temel yardımcı araçlar (DateHelper, ApiHelper vb.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** -- Kimlik doğrulama, veritabanı yardımcıları ve AWS entegrasyonları dahil Express sunucu yardımcı araçları

:::info
API, ES modüllerini kullanır (`package.json` içinde `"type": "module"`). İçe aktarmalarınızın ES modül sözdizimini kullandığından emin olun.
:::

## Bu Bölümde

- **[Yerel Kurulum](./local-setup)** -- API'yi yerel olarak klonlayın, yapılandırın ve çalıştırın
- **[Veritabanı](./database)** -- Modül başına veritabanı mimarisi, şema betikleri ve veri erişim kalıpları
- **[Modül Yapısı](./module-structure)** -- Denetleyiciler, depolar, modeller ve kimlik doğrulama
- **[API Anahtarları](./api-keys)** -- Betikler ve bağlayıcılar için kişisel erişim belirteçleri
- **[Bağlı Uygulamalar (OAuth)](./connected-apps)** -- Üçüncü taraf uygulamalar için çok kiracılı OAuth akışı
- **[Webhook'lar](./webhooks)** -- Olay bildirimlerini dış sistemlere iletin
- **[MCP Sunucusu](./mcp)** -- API'yi yapay zeka asistanlarına açan Model Context Protocol uç noktası
- **[Uç Nokta Başvurusu](./endpoints/)** -- Tüm modüller için eksiksiz REST API belgeleri
