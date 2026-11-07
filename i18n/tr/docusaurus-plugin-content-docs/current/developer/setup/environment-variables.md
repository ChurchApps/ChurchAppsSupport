---
title: "Ortam Değişkenleri"
description: ".env dosyasını ChurchApps projeleri için ayarlayın; paylaşılan demo API ile yerel API arasında seçim yapın ve B1 Admin, B1.church, B1 Mobile, Lessons.church ve diğerleri için değişkenleri doldurun."
---

# Ortam Değişkenleri

<div class="article-intro">

Her ChurchApps projesi, yerel yapılandırma için bir `.env` dosyası kullanır. Her projede kopyalayıp özelleştirebileceğiniz bir örnek dosya bulunur. Bu sayfada API'ler, web uygulamaları ve mobil uygulamalar için ortam değişkenleri anlatılmaktadır. Demo ve yerel API hedefleri arasında nasıl seçim yapacağınız da burada açıklanmaktadır.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Çalışmak istediğiniz proje için [ön koşulları](./prerequisites.md) yükleyin
- Üzerinde çalışmak istediğiniz proje deposunu klonlayın
- Projenizin hangi API modüllerine ihtiyaç duyduğunu anlamak için [Proje Genel Bakışı](./project-overview.md) sayfasını inceleyin

</div>

## Genel Yapı

1. Proje kök dizininde `dotenv.sample.txt` veya `.env.sample` dosyasını bulun.
2. Bu dosyayı `.env` olarak kopyalayın.
3. Değerleri gerektiği gibi düzenleyin.

```bash
# .env.sample dosyası olan bir proje için örnek
cp .env.sample .env

# dotenv.sample.txt dosyası olan bir proje için örnek
cp dotenv.sample.txt .env
```

:::warning
**`.env` dosyalarını asla sürüm kontrolüne eklemeyin.** Bu dosyalar veritabanı kimlik bilgileri, API anahtarları ve JWT gizli anahtarları gibi gizli bilgiler içerir. Tüm ChurchApps projelerinde `.env` dosyası `.gitignore` içinde yer alır, ancak yine de commit yapmadan önce mutlaka kontrol edin.
:::

## API Hedefi Seçme

En önemli karar, ön yüzünüzün API çağrılarını nereye yönlendireceğidir. İki seçenek vardır:

### Seçenek 1: Demo API'ler (Ön Yüz Geliştirme İçin Önerilir)

Ortak demo ortamını kullanın. Yerel API veya veritabanı kurulumu gerekmez. `main` dalındaki en son kodu çalıştırır ve örnek verileri her gece yeniden yüklenir.

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
Staging ortamı (`api.staging.churchapps.org`, `api.staging.lessons.church` ve ilgili diğer sunucular) kullanımdan kaldırılmıştır. Bazı örnek `.env` dosyaları hâlâ staging URL'leri içerebilir; bunları bu sayfada gösterilen demo veya yerel değerlerle değiştirin. Artık paylaşılan bir üretim dışı Lessons API'si yoktur. Buna ihtiyaç duyduğunuzda [LessonsApi](https://github.com/ChurchApps/LessonsApi) projesini yerel olarak çalıştırın (8090 numaralı bağlantı noktasını dinler).
:::

### Seçenek 2: Yerel API

Api projesini kendi bilgisayarınızda çalıştırın. Her modül için oluşturulmuş veritabanlarıyla birlikte MySQL 8.0+ gerektirir. Ayrıntılar için [API yerel kurulum](../api/local-setup.md) kılavuzuna bakın.

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

### Ortak Ayarlar

| Değişken | Açıklama | Örnek |
|----------|----------|-------|
| `ENVIRONMENT` | Çalışma zamanı ortamı | `dev` |
| `SERVER_PORT` | Yerel geliştirme sunucusunun HTTP bağlantı noktası | `8084` |
| `ENCRYPTION_KEY` | Hassas veriler için 192 bitlik şifreleme anahtarı | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | JSON Web Token'larını imzalamak için gizli anahtar | `jwt-secret-dev` |
| `FILE_STORE` | Yüklenen dosyaların nerede saklanacağı (`disk` veya `s3`) | `disk` |
| `CORS_ORIGIN` | İzin verilen CORS kaynakları (yerel geliştirme için `*`) | `*` |

### Veritabanı Bağlantısı

Tek bir temel URL, API'yi MySQL'e bağlar. API, bu temel URL'den modül başına bir veritabanı türetir (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`).

| Değişken | Örnek |
|----------|-------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
`root:password` kısmını kendi MySQL kimlik bilgilerinizle güncelleyin. API'yi çalıştırmadan önce her modül veritabanının var olması gerekir. Tüm modüllerin şemasını oluşturmak için `npm run initdb`, yalnızca tek bir modül için `npm run initdb:membership` komutunu kullanın.
:::

### WebSocket Ayarları

| Değişken | Açıklama | Örnek |
|----------|----------|-------|
| `SOCKET_PORT` | WebSocket sunucusunun bağlantı noktası | `8087` |
| `SOCKET_URL` | İstemcilerin bağlanacağı WebSocket URL'si | `ws://localhost:8087` |

---

## Web Uygulaması Ortam Değişkenleri

### B1Admin (React + Vite)

Örnek dosya: `.env.sample`

| Değişken | Açıklama | Örnek (Demo) |
|----------|----------|--------------|
| `REACT_APP_STAGE` | Ortam adı | `demo` |
| `PORT` | Geliştirme sunucusunun bağlantı noktası | `3101` |
| `REACT_APP_API_BASE` | Tüm ChurchApps API'leri için tek temel URL (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` otomatik eklenir) | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | İçerik sunum URL'si | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | Google Analytics kimliği (isteğe bağlı) | `UA-123456789-1` |

Yerel API geliştirmesi için temel URL'yi yerel altyapınıza yönlendirin:

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App (Next.js)

Örnek dosya: `.env.sample`

| Değişken | Açıklama | Örnek (Demo) |
|----------|----------|--------------|
| `NEXT_PUBLIC_API_BASE` | Tüm ChurchApps API'leri için tek temel URL (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` otomatik eklenir) | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | İçerik sunum URL'si | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | Google Analytics kimliği (isteğe bağlı) | `UA-123456789-1` |

:::info
Next.js, tarayıcıda kullanılması gereken her ortam değişkeni için `NEXT_PUBLIC_` önekini gerektirir. Yalnızca sunucuda kullanılan değişkenlerin bu öneke ihtiyacı yoktur.
:::

### LessonsApp (Next.js)

Örnek dosya: `dotenv.sample.txt`

| Değişken | Açıklama | Örnek (Yerel LessonsApi) |
|----------|----------|--------------------------|
| `STAGE` | Ortam aşaması (yerel geliştirme için boş bırakın veya `dev` yazın) | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | Lessons API URL'si | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | İçerik sunum URL'si | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | Oturum açma için kullanılan ChurchApps API temel URL'si (yalnızca `STAGE` boş bırakıldığında veya `dev` olduğunda geçerlidir) | `https://api.demo.churchapps.org` |

---

## Mobil Uygulama Ortam Değişkenleri

### B1Mobile (React Native / Expo)

Örnek dosya: `dotenv.sample.txt`

| Değişken | Açıklama | Örnek (Demo) |
|----------|----------|--------------|
| `STAGE` | Ortam adı | `dev` |
| `MEMBERSHIP_API`, `ATTENDANCE_API`, `GIVING_API`, `DOING_API`, `MESSAGING_API`, `CONTENT_API` | Her ChurchApps API modülü için bir URL (ayarlanmazsa her biri üretim ortamına varsayılan olarak bağlanır) | `https://api.demo.churchapps.org/membership` |
| `LESSONS_API` | Lessons API'si (ayrı bir sunucudur; paylaşılan bir üretim dışı sunucu yoktur) | `https://api.lessons.church` |
| `CONTENT_ROOT` | İçerik sunum URL'si | `https://democontent.churchapps.org` |
| `LESSONS_ROOT` | Lessons sitesi URL'si | `https://lessons.church` |

:::info
Mobil uygulamalar `REACT_APP_` veya `NEXT_PUBLIC_` önekini kullanmaz. Ortam değişkenlerine erişim Expo yapılandırması tarafından yönetilir.
:::

---

## Hızlı Başvuru: Örnek Dosya Konumları

| Proje | Örnek Dosya |
|-------|-------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Mobile | `dotenv.sample.txt` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
