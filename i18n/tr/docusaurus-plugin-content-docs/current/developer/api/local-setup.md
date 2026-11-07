---
title: "Yerel API Kurulumu"
---

# Yerel API Kurulumu

<div class="article-intro">

Bu kılavuz, ChurchApps API'sini yerel geliştirme için kurma sürecinde size rehberlik eder. Depoyu klonlayacak, veritabanı bağlantılarınızı yapılandıracak, şemayı başlatacak ve sıcak yeniden yükleme (hot reload) özelliğine sahip geliştirme sunucusunu çalıştıracaksınız.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- **Node.js 24+**, **Git** ve **MySQL 8.0+** yazılımlarını kurun -- bkz. [Ön Koşullar](../setup/prerequisites)
- Veritabanı oluşturma yetkisine sahip bir MySQL kullanıcısı oluşturun
- API yapılandırması için [Ortam Değişkenleri](../setup/environment-variables) başvuru sayfasını inceleyin

</div>

## Adım Adım Kurulum

### 1. Depoyu klonlayın

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. Bağımlılıkları yükleyin

Proje Yarn kullanır (bir koruma mekanizması `npm install` komutunu engeller):

```bash
cd Api
yarn install
```

### 3. Ortam değişkenlerini yapılandırın

```bash
cp .env.sample .env
```

`.env` dosyasını açın ve MySQL bağlantı dizelerinizi yapılandırın. Her modülün kendi veritabanı bağlantısına ihtiyacı vardır ve bunlar aşağıdaki biçimde olmalıdır:

```
mysql://root:password@localhost:3306/dbname
```

Altı modül veritabanının tümü (membership, attendance, content, giving, messaging, doing) için bağlantı dizelerine ihtiyacınız olacak.

### 4. Veritabanlarını başlatın

```bash
npm run initdb
```

Bu komut altı veritabanının tamamını ve tablolarını otomatik olarak oluşturur.

:::tip
Tek bir modülün veritabanını `npm run initdb -- --module=membership` komutuyla başlatabilirsiniz (veya `attendance`, `content`, `giving`, `messaging`, `doing` değerlerinden birini kullanabilirsiniz).
:::

### 5. Geliştirme sunucusunu başlatın

```bash
npm run dev
```

API, sıcak yeniden yükleme özelliğiyle [http://localhost:8084](http://localhost:8084) adresinde başlar.

## Temel Komutlar

| Komut | Açıklama |
|---------|-------------|
| `npm run dev` | Sıcak yeniden yükleme ile geliştirme sunucusunu başlatır (tsx watch) |
| `npm run build` | Temizler, TypeScript kodunu derler ve varlıkları kopyalar |
| `npm run test` | Jest ile testleri çalıştırır (kapsam raporu dahil) |
| `npm run test:watch` | Testleri izleme modunda çalıştırır |
| `npm run lint` | ESLint'i otomatik düzeltme ile çalıştırır (ESLint tek biçimlendirici aracıdır) |

## Dağıtım

Staging ortamı kaldırılmıştır. API, `main` dalına yapılan her push işleminde demo ortamına dağıtılır. Üretim ortamına dağıtım ise, bekleyen veritabanı geçişlerini de uygulayan manuel **Deploy Prod** iş akışıyla yapılır. Ayrıntılar için [API Dağıtımı](../deployment/apis) sayfasına bakın.

## Yerel Kitaplık Geliştirme

Bir paylaşılan kitaplığı (`@churchapps/helpers` veya `@churchapps/apihelper`) API ile birlikte geliştirmeniz gerekiyorsa, kitaplığı [Packages](https://github.com/ChurchApps/Packages) çalışma alanında derleyin ve API içine geçici bir Yarn portalı ekleyin:

```bash
# Packages çalışma alanında
yarn build

# API dizininde
yarn link ../Packages/helpers
# ... test edin ...
yarn unlink ../Packages/helpers && yarn install
```

Bu yöntem, kitaplık değişikliklerini npm'e yayımlamadan API üzerinde test etmenizi sağlar. Ayrıntılar için [Paylaşılan Kitaplıklar](../shared-libraries/#local-development-against-a-consuming-app) sayfasına bakın. Ayrıca, link komutunun `package.json` dosyasına yazdığı portal çözümlemesini asla commit etmeyin.

## İlgili Makaleler

- **[Veritabanı](./database)** -- Modül başına veritabanı mimarisini anlama
- **[Modül Yapısı](./module-structure)** -- Controller, repository ve model yapılarının nasıl düzenlendiği
- **[Paylaşılan Kitaplıklar](../shared-libraries/)** -- `@churchapps/helpers` ve `@churchapps/apihelper` ile çalışma
