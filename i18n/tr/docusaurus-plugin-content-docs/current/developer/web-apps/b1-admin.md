---
title: "B1 Admin"
description: "B1 Admin'i yerel olarak kurun: React/Vite panosunu klonlayın, .env dosyasında API uç noktalarını yapılandırın ve kilise yönetimi çalışması için geliştirme sunucusunu başlatın."
---

# B1 Admin

<div class="article-intro">

B1Admin, Vite ve Material-UI ile oluşturulmuş bir React tek sayfalık uygulamadır ve kilise yönetim paneli olarak çalışır. Kilise personeli bu panel aracılığıyla kişileri, grupları, yoklamayı, bağışları, içerikleri ve daha fazlasını yönetir.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- **Node.js 22+** ve **Git** kurun -- bkz. [Ön Koşullar](../setup/prerequisites.md)
- API hedefinizi yapılandırın (demo veya yerel) -- bkz. [Ortam Değişkenleri](../setup/environment-variables.md)

</div>

## Kurulum

### 1. Depoyu klonlayın

```bash
git clone https://github.com/ChurchApps/B1Admin.git
```

### 2. Bağımlılıkları yükleyin

```bash
cd B1Admin
npm install
```

### 3. Ortam değişkenlerini yapılandırın

```bash
cp dotenv.sample.txt .env
```

`.env` dosyasını açın ve API uç noktalarını yapılandırın. Bunları paylaşılan demo API'sine (`https://api.demo.churchapps.org`) veya kendi yerel API örneğinize yönlendirebilirsiniz. Örnek dosya hâlâ kullanımdan kaldırılmış hazırlık (staging) URL'lerini listeleyebilir; bunları değiştirin.

### 4. Geliştirme sunucusunu başlatın

```bash
npm start
```

Bu komut Vite geliştirme sunucusunu başlatır. Uygulama, sıcak modül değiştirme (hot module replacement) etkin olarak tarayıcınızda kullanılabilir olacaktır.

## Temel Ortam Değişkenleri

| Değişken | Açıklama |
|----------|-------------|
| `REACT_APP_STAGE` | Ortam adı (ör. örnek dosyadaki gibi `demo`, `prod` veya `selfhost`) |
| `PORT` | Geliştirme sunucusu bağlantı noktası (varsayılan: `3101`) |
| `REACT_APP_*_API` | Her modül için API uç nokta URL'leri |

:::info
`postinstall` betiği, `@churchapps/apphelper` paketinden yerel ayar ve CSS dosyalarını kopyalar. Bileşenler stilsiz görünüyorsa `npm run postinstall` komutunu elle çalıştırın.
:::

## Temel Komutlar

| Komut | Açıklama |
|---------|-------------|
| `npm start` | Vite geliştirme sunucusunu başlatır |
| `npm run build` | Vite ile üretim derlemesi yapar |
| `npm run test` | Playwright ile uçtan uca testleri çalıştırır |
| `npm run lint` | ESLint'i otomatik düzeltme ile çalıştırır |

## Teknoloji Yığını

- TypeScript ile **React 19**
- Derleme aracı ve geliştirme sunucusu için **Vite**
- Kullanıcı arayüzü bileşenleri için **Material-UI 7**
- Sunucu durumu için **React Query 5**
- Ortak bileşenler için **`@churchapps/apphelper*`** paketleri

## Dağıtım

Üretim derlemeleri **S3 + CloudFront** üzerine dağıtılır:

1. `npm run build` statik varlıkları üretir
2. Varlıklar bir S3 kovasına eşitlenir
3. Yeni sürümü sunmak için CloudFront önbellek geçersiz kılma işlemi tetiklenir

:::tip
Ayrıntılı dağıtım talimatları için [Web Uygulaması Dağıtımı](../deployment/web-apps.md) kılavuzuna bakın.
:::
