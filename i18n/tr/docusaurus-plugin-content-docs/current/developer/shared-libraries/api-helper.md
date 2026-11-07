---
title: "ApiHelper"
---

# ApiHelper

<div class="article-intro">

`@churchapps/apihelper` paketi, tüm ChurchApps Express.js API'leri için sunucu tarafı yardımcı araçlar sağlar. Temel denetleyici sınıfını, JWT kimlik doğrulamasını, veritabanı yardımcılarını ve her API projesinin bağımlı olduğu AWS entegrasyonlarını içerir.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- **Node.js** ve **Git** kurun -- bkz. [Ön Koşullar](../setup/prerequisites)
- [Packages çalışma alanı](./index.md) kurulumunu ve sürüm yayınlama akışını inceleyin
- Bu paket, [`@churchapps/helpers`](./helpers) paketine eş bağımlılık (peer dependency) olarak bağlıdır ve onu yeniden dışa aktarır

</div>

## Neler Dahil?

- **CustomBaseController** -- `inversify-express-utils` üzerine kurulu API denetleyicileri için temel sınıf
- **Auth** -- `CustomAuthProvider`, `AuthenticatedUser` ve `Principal` ile JWT kimlik doğrulaması
- **Veritabanı yardımcıları** -- MySQL bağlantı yönetimi için `DB.query` / `DB.queryOne` ve `Pool` sınıfı, ayrıca şema kurulumu için `MySqlHelper` ve `DBCreator`
- **AWS entegrasyonları** -- S3 dosya depolaması ve SSM Parameter Store okumaları için `AwsHelper`
- **E-posta** -- SES ve SMTP taşıyıcılarını destekleyen `EmailHelper`
- **Yapılandırma yükleme** -- Bağlantı dizelerini ve gizli anahtarları ortam değişkenlerinden veya Parameter Store'dan okuyan `EnvironmentBase`
- **Diğer** -- `EncryptionHelper`, `FileStorageHelper`, `LoggingHelper`, `BasePermissions`, `SlugHelper`

## Yerel Geliştirme Kurulumu

Bu paket, diğer ortak kütüphanelerle birlikte [Packages](https://github.com/ChurchApps/Packages) çalışma alanında yer alır:

1. Çalışma alanını klonlayın:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Bağımlılıkları çalışma alanının kök dizininde kurun:

   ```bash
   cd Packages && yarn install
   ```

3. Derleyin (TypeScript kodunu `dist/` dizinine derler):

   ```bash
   yarn workspace @churchapps/apihelper build
   ```

   Ya da bağımlılık sırasına göre tüm paketleri derlemek için kök dizinde `yarn build` çalıştırın.

Değişiklikleri tüketen bir API içinde test etmek için geçici bir Yarn portalı kullanın -- bkz. [Tüketen Uygulamaya Karşı Yerel Geliştirme](./index.md#local-development-against-a-consuming-app).

## Yayınlama

Sürümler changeset'ler aracılığıyla yürütülür: her değişiklikle birlikte çalışma alanının kök dizininde `yarn changeset` çalıştırın, hazır olduğunuzda da `yarn publish-all` ile yayınlayın. Tam akış için bkz. [Ortak Kütüphanelere Genel Bakış](./index.md#releasing-with-changesets).

:::info
Bu paket, her ChurchApps API'sinin -- temel Api, AskApi ve LessonsApi -- bağımlılığıdır. Değişiklik yaparken, yayınlamadan önce bir API'yi yerel olarak test edin.
:::

## İlgili Makaleler

- **[Helpers](./helpers)** -- Bu paketin bağımlı olduğu temel yardımcı paket
- **[Modül Yapısı](../api/module-structure)** -- Denetleyicilerin ve kimlik doğrulama ara katmanlarının API modüllerinde nasıl kullanıldığı
- **[Yerel API Kurulumu](../api/local-setup)** -- API'yi yerel geliştirme için kurma
