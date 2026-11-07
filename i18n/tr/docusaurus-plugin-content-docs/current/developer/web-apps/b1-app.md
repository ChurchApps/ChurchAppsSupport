---
title: "B1App"
description: "B1App üye web uygulamasını Next.js 22+ ile yerel olarak kurun, API uç noktalarını .env dosyasında yapılandırın ve geliştirme sunucusunu 3301 portunda çalıştırın."
---

# B1App

<div class="article-intro">

B1App, Next.js ile oluşturulmuş, kiliseye üye olan kişilerin kullandığı herkese açık bir uygulamadır. Profiller, grup dizinleri, canlı yayın ve bağış sayfaları dahil olmak üzere üye deneyimini sağlar.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- **Node.js 22+** ve **Git** yükleyin -- bkz. [Ön Koşullar](../setup/prerequisites.md)
- API hedefinizi yapılandırın (demo veya yerel) -- bkz. [Ortam Değişkenleri](../setup/environment-variables.md)

</div>

:::warning
B1App, Node.js 22 veya sonraki bir sürüm gerektirir. Daha eski sürümler desteklenmez.
:::

## Kurulum

### 1. Depoyu klonlayın

```bash
git clone https://github.com/ChurchApps/B1App.git
```

### 2. Bağımlılıkları yükleyin

```bash
cd B1App
npm install
```

### 3. Ortam değişkenlerini yapılandırın

```bash
cp dotenv.sample.txt .env
```

`.env` dosyasını açın ve `NEXT_PUBLIC_*_API` uç nokta URL'lerini yapılandırın. Bu adresler, paylaşılan demo API'sini (`https://api.demo.churchapps.org`) veya yerel API örneğinizi gösterebilir. Örnek dosyada hâlâ kullanımdan kaldırılmış hazırlık URL'leri bulunabilir; bunları değiştirin.

### 4. Geliştirme sunucusunu başlatın

```bash
npm run dev
```

Next.js geliştirme sunucusu [http://localhost:3301](http://localhost:3301) adresinde başlar.

## Temel Komutlar

| Komut | Açıklama |
|---------|-------------|
| `npm run dev` | 3301 numaralı bağlantı noktasında Next.js geliştirme sunucusunu başlatır |
| `npm run build` | Next.js ile üretim derlemesi oluşturur |
| `npm run test` | Playwright ile uçtan uca testleri çalıştırır |
| `npm run lint` | Next.js lint kontrolünü çalıştırır |

## Temel Ortam Değişkenleri

| Değişken | Açıklama |
|----------|-------------|
| `NEXT_PUBLIC_*_API` | Her modül için API uç nokta URL'leri |

:::info
`postinstall` betiği, `@churchapps/apphelper` paketinden yerel ayar ve CSS dosyalarını kopyalar. Kurulumdan sonra bileşenler stilsiz görünüyorsa `npm run postinstall` komutunu elle çalıştırın.
:::

## Teknoloji Yığını

- TypeScript ile **Next.js 16**
- Kullanıcı arayüzü bileşenleri için **React 19**
- Tasarım sistemi için **Material-UI 7**
- Sunucu durumu için **React Query 5**
- Ortak bileşenler için **`@churchapps/apphelper*`** paketleri

## Dağıtım

Üretim derlemeleri **S3 + CloudFront** üzerine dağıtılır:

1. `npm run build` en uygun Next.js derlemesini oluşturur
2. Derleme çıktısı bir S3 kovasıyla eşitlenir
3. Yeni sürümün sunulması için CloudFront önbellek geçersiz kılma işlemi tetiklenir

:::tip
Ayrıntılı dağıtım talimatları için [Web Uygulaması Dağıtımı](../deployment/web-apps.md) kılavuzuna bakın.
:::
