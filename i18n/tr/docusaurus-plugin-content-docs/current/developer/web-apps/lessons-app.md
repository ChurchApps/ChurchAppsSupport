---
title: "LessonsApp"
description: "LessonsApp Next.js ders düzenleyicisini Node.js 22+ üzerinde yerel olarak kurun, yerel bir LessonsApi'ye yönlendirin ve derleme ile S3/CloudFront dağıtımını anlayın."
---

# LessonsApp

<div class="article-intro">

LessonsApp, [Lessons.church](https://lessons.church) için geliştirilmiş ders içeriği yönetim uygulamasıdır. Kilise ders müfredatlarını oluşturmak, düzenlemek ve yayımlamak için bir arayüz sunar ve Next.js ile React kullanılarak geliştirilmiştir.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- **Node.js 22+** ve **Git** yükleyin -- bkz. [Ön Koşullar](../setup/prerequisites.md)
- API hedefinizi yapılandırın (yerel LessonsApi) -- bkz. [Ortam Değişkenleri](../setup/environment-variables.md)

</div>

:::warning
LessonsApp, Node.js 22 veya daha yeni bir sürüm gerektirir. Önceki sürümler desteklenmez.
:::

## Kurulum

### 1. Depoyu klonlayın

```bash
git clone https://github.com/ChurchApps/LessonsApp.git
```

### 2. Bağımlılıkları yükleyin

```bash
cd LessonsApp
npm install
```

### 3. Ortam değişkenlerini yapılandırın

Ortam örnek dosyasını `.env` olarak kopyalayın ve API uç noktalarını yapılandırın:

```bash
cp dotenv.sample.txt .env
```

API uç noktası URL'lerini yerel LessonsApi örneğinizi (`http://localhost:8090`) gösterecek şekilde güncelleyin. Staging Lessons API'si artık kullanımda değildir; bu nedenle örnek dosyada kalan `api.staging.lessons.church` URL'lerini değiştirin.

### 4. Geliştirme sunucusunu başlatın

```bash
npm run dev
```

Next.js geliştirme sunucusu [http://localhost:3501](http://localhost:3501) adresinde başlatılır.

## Temel Komutlar

| Komut | Açıklama |
|-------|----------|
| `npm run dev` | 3501 numaralı bağlantı noktasında Next.js geliştirme sunucusunu başlatır |
| `npm run build` | Next.js ile üretim derlemesi oluşturur |

## Teknoloji Yığını

- TypeScript ile **Next.js 16**
- Kullanıcı arayüz bileşenleri için **React 19**
- Ortak bileşenler için **`@churchapps/apphelper*`** paketleri

:::info
LessonsApp, ana ChurchApps Api'den ayrı bir API olan **LessonsApi** arka ucuyla iletişim kurar. Ortamınızın doğru Lessons API uç noktasıyla yapılandırıldığından emin olun.
:::

## Dağıtım

Üretim derlemeleri **S3 + CloudFront** üzerine dağıtılır:

1. `npm run build` komutu optimize edilmiş Next.js derlemesini oluşturur
2. Derleme çıktısı bir S3 kovasına eşitlenir
3. Yeni sürümü sunmak için CloudFront önbellek geçersizleştirmesi tetiklenir

:::tip
Ayrıntılı dağıtım talimatları için [Web Uygulaması Dağıtımı](../deployment/web-apps.md) kılavuzuna bakın.
:::
