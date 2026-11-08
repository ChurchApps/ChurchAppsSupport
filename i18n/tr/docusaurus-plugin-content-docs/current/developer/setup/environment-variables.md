---
title: "Ortam Değişkenleri"
description: "ChurchApps projeleri için .env dosyalarını ayarlayın, paylaşılan demo API'si ile yerel API arasında seçim yapın ve B1 Admin, B1.church, B1 Checkin ve diğerleri için değişkenleri doldurun."
---

# Ortam Değişkenleri

<div class="article-intro">

Her ChurchApps projesi yerel yapılandırma için bir `.env` dosyası kullanır. Her projede kopyalayıp özelleştireceğiniz bir örnek dosya bulunur. Bu sayfa API'ler, web uygulamaları ve mobil uygulamalar için ortam değişkenlerini kapsar ve demo ile yerel API hedefleri arasında nasıl seçim yapacağınızı açıklar.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Çalışmak istediğiniz proje için [ön koşulları](./prerequisites.md) kurun
- Çalışmak istediğiniz proje deposunu klonlayın
- Projenizin hangi API modüllerine ihtiyaç duyduğunu anlamak için [Proje Genel Bakışı](./project-overview.md) sayfasını inceleyin

</div>

## Genel Yapı

1. Proje kök dizininde `dotenv.sample.txt` veya `.env.sample` dosyasını arayın.
2. Dosyayı `.env` olarak kopyalayın.
3. Değerleri gerektiği gibi düzenleyin.

```bash
# .env.sample dosyası olan bir proje için örnek
cp .env.sample .env

# dotenv.sample.txt dosyası olan bir proje için örnek
cp dotenv.sample.txt .env
```

:::warning
**`.env` dosyalarını asla sürüm kontrolüne eklemeyin.** Veritabanı kimlik bilgileri, API anahtarları ve JWT gizli anahtarları gibi gizli bilgiler içerirler. Tüm ChurchApps projeleri `.env` dosyasını `.gitignore` içinde tutar, yine de commit yapmadan önce mutlaka kontrol edin.
:::

## API Hedefi Seçimi

En önemli karar, ön yüzünüzün API çağrıları için nereye yönleneceğidir. İki seçenek vardır:

### Seçenek 1: Demo API'leri (Ön Yüz Geliştirme İçin Önerilen)

Paylaşılan demo ortamını kullanın. Yerel API veya veritabanı kurulumu gerekmez. `main` dalındaki en son kodu çalıştırır ve örnek verileri her gece yeniden yüklenir.

```bash
# Temel URL yapısı
https://api.demo.churchapps.org/{module}

# Örnek modül URL'leri
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/content
https://api.demo.churchapps.org/giving
https://api.demo.churchapps.org/messaging
https://api.demo.churchapps.org/doing
```

:::warning
Hazırlık ortamı (`api.staging.churchapps.org`, `api.staging.lessons.church` ve ilgili diğer sunucular) kullanımdan kaldırılmıştır. Bazı örnek `.env` dosyaları hâlâ hazırlık adreslerini içerebilir; bunları bu sayfada gösterilen demo veya yerel değerlerle değiştirin. Paylaşılan bir üretim dışı Lessons API'si bulunmamaktadır -- ihtiyacınız olduğunda [LessonsApi](https://github.com/ChurchApps/LessonsApi) projesini yerel olarak çalıştırın (`8090` numaralı bağlantı noktasını dinler).
:::

### Seçenek 2: Yerel API

Api projesini kendi makinenizde çalıştırın. Her modül için oluşturulmuş veritabanlarıyla birlikte MySQL 8.0+ gerektirir. Ayrıntılar için [API yerel kurulum](../api/local-setup.md) kılavuzuna bakın.

```bash
# Temel URL yapısı
http://localhost:8084/{module}

# Örnek modül URL'leri
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## API Ortam Değişkenleri

Ana **Api** projesi (`.env.sample`) en fazla yapılandırmaya sahiptir. Başlıca değişkenler şunlardır:

### Paylaşılan Ayarlar

| Değişken | Açıklama | Örnek |
|----------|----------|-------|
| `ENVIRONMENT` | Çalışma zamanı ortamı | `dev` |
| `SERVER_PORT` | Yerel geliştirme sunucusu için HTTP bağlantı noktası | `8084` |
| `ENCRYPTION_KEY` | Hassas veriler için 192 bitlik şifreleme anahtarı | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | JSON Web Token'larını imzalamak için gizli anahtar | `jwt-secret-dev` |
| `FILE_STORE` | Yüklenen dosyaların depolanacağı yer (`disk` veya `s3`) | `disk` |
| `CORS_ORIGIN` | İzin verilen CORS kaynakları (yerel geliştirme için `*`) | `*` |

### Veritabanı Bağlantısı

Tek bir temel URL, API'yi MySQL'e bağlar. API, bu temel adresten modül başına bir veritabanı türetir (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`).

| Değişken | Örnek |
|----------|-------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
`root:password` kısmını kendi MySQL kimlik bilgilerinizle güncelleyin. API'yi çalıştırmadan önce her modül veritabanının mevcut olması gerekir. Tüm modüller için şemayı oluşturmak üzere `npm run initdb`, yalnızca tek bir modül için `npm run initdb:membership` komutunu kullanın.
:::

### WebSocket Ayarları

| Değişken | Açıklama | Örnek |
|----------|----------|-------|
| `SOCKET_PORT` | WebSocket sunucusu için bağlantı noktası | `8087` |
| `SOCKET_URL` | İstemcilerin bağlanacağı WebSocket URL'si | `ws://localhost:8087` |

---

## Web Uygulaması Ortam Değişkenleri

### B1Admin (React + Vite)

Örnek dosya: `.env.sample`

| Değişken | Açıklama | Örnek (Demo) |
|----------|----------|--------------|
| `REACT_APP_STAGE` | Ortam adı | `demo` |
| `PORT` | Geliştirme sunucusu bağlantı noktası | `3101` |
| `REACT_APP_API_BASE` | Tüm ChurchApps API'leri için tek temel URL (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` otomatik olarak eklenir) | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | İçerik sunum URL'si | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | Google Analytics kimliği (isteğe bağlı) | `UA-123456789-1` |

Yerel API geliştirmesi için temel URL'yi yerel yığınınıza yönlendirin:

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App (Next.js)

Örnek dosya: `.env.sample`

| Değişken | Açıklama | Örnek (Demo) |
|----------|----------|--------------|
| `NEXT_PUBLIC_API_BASE` | Tüm ChurchApps API'leri için tek temel URL (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` otomatik olarak eklenir) | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | İçerik sunum URL'si | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | Google Analytics kimliği (isteğe bağlı) | `UA-123456789-1` |

:::info
Next.js, tarayıcıda kullanılabilir olması gereken her ortam değişkeni için `NEXT_PUBLIC_` önekini gerektirir. Yalnızca sunucuda kullanılan değişkenlerin bu öneke ihtiyacı yoktur.
:::

### LessonsApp (Next.js)

Örnek dosya: `dotenv.sample.txt`

| Değişken | Açıklama | Örnek (Yerel LessonsApi) |
|----------|----------|--------------------------|
| `STAGE` | Ortam aşaması (yerel geliştirme için boş bırakın veya `dev` kullanın) | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | Lessons API URL'si | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | İçerik sunum URL'si | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | Oturum açma için kullanılan ChurchApps API temel adresi (yalnızca `STAGE` boşsa veya `dev` ise dikkate alınır) | `https://api.demo.churchapps.org` |

---

## Mobil Uygulama Ortam Değişkenleri

### B1Checkin (React Native / Expo)

Örnek dosya: `dotenv.sample.txt`

| Değişken | Açıklama | Örnek |
|----------|----------|-------|
| `EXPO_PUBLIC_STAGE` | Uygulamanın bağlanacağı API setini seçer: `dev` (`http://127.0.0.1:8084` adresindeki yerel API), `staging` veya `prod` (ayarlanmadığında varsayılan) | `dev` |

B1Checkin yalnızca Membership ve Attendance API modüllerini ve içerik sunum URL'sini kullanır; her aşama için bu adresler `src/helpers/EnvironmentHelper.ts` dosyasında tanımlanmıştır.

:::info
Expo, yalnızca `EXPO_PUBLIC_` önekli değişkenleri uygulama paketine dahil eder. `.env` dosyasını değiştirdikten sonra geliştirme sunucusunu `yarn start --reset-cache` komutuyla yeniden başlatın.
:::

---

## Hızlı Başvuru: Örnek Dosya Konumları

| Proje | Örnek Dosya |
|-------|-------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
