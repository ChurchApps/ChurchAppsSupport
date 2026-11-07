---
title: "Paylaşılan Kütüphaneler"
---

# Paylaşılan Kütüphaneler

<div class="article-intro">

ChurchApps'in paylaşılan kodu `@churchapps/*` kapsamı altında npm'e yayımlanır. Paylaşılan paketlerin tamamı tek bir depoda bulunur — [Packages](https://github.com/ChurchApps/Packages) — ve bu depo bir Yarn (Berry) çalışma alanı olarak yönetilir, sürümleri ise [changesets](https://github.com/changesets/changesets) ile takip edilir.

</div>

## Paketler

| Paket | Açıklama | Kullanan |
|---------|-------------|---------|
| [`@churchapps/helpers`](./helpers) | Temel katman: çerçeveden bağımsız yardımcı işlevler ve uygulamalar arası veri sözleşmesini oluşturan ortak TypeScript arayüzleri | Tüm projeler |
| [`@churchapps/apihelper`](./api-helper) | Sunucu tarafı Express yardımcıları: kimlik doğrulama, temel denetleyiciler, veritabanı erişimi, AWS ve e-posta entegrasyonları | Tüm API'ler |
| [`@churchapps/apphelper`](./app-helper) | Paylaşılan React bileşenleri ve özellik modülleri (giriş, bağışlar, formlar, markdown, web sitesi) | Tüm web uygulamaları |
| `@churchapps/content-providers` | Üçüncü taraf içerik sağlayıcılarına (Lessons.church, Planning Center, Dropbox ve diğerleri) yönelik soyutlama katmanı | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | B1.church entegrasyonları oluşturmaya yönelik araç seti: webhook doğrulama, tipli REST istemcisi, OAuth yardımcıları | Harici entegrasyon geliştiricileri |
| `@churchapps/texting` | SMS sağlayıcı soyutlaması (Text In Church, Clearstream, Mutual Ministry, MinistryStuff, Nalo Solutions, Twilio) | Api |

Bağımlılık yönü kesinlikle aşağıya doğrudur: uygulamalar `apihelper` ve `apphelper` paketlerine bağlıdır. Bu iki paket de `@churchapps/helpers` paketini **eş bağımlılık (peer dependency)** olarak tanımlar; böylece her uygulama bu paketin tam olarak bir kopyasını kullanır.

## Çalışma Alanı Kurulumu

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

Depo, tek bir kilit dosyası olan Yarn Berry kullanır (kök dizindeki `packageManager` alanı yetkilidir). `yarn build` tüm paketleri bağımlılık sırasına göre derler; `yarn test` ise tüm paket testlerini çalıştırır.

## Changesets ile Sürüm Yayımlama

Bir paketteki her değişiklik bir changeset ile birlikte yayımlanır:

1. Çalışma alanının kök dizininde `yarn changeset` komutunu çalıştırın. Değiştirdiğiniz paketi (veya paketleri), sürüm artış türünü (patch = düzeltme, minor = yeni dışa aktarım veya özellik, major = geriye dönük uyumsuz değişiklik) seçin ve tek satırlık bir özet yazın. Bu özet CHANGELOG girişi olur.
2. Oluşturulan `.changeset/*.md` dosyasını kodunuz değişikliğiyle birlikte commit edin. Bir paketin kaynak kodunu, hazırlanmış (staged) bir changeset olmadan değiştiren commit'leri bir pre-commit hook'u engeller.
3. Yayımlamaya hazır olduğunuzda kök dizinde `yarn publish-all` komutunu çalıştırın. Bu komut bekleyen changeset'leri işler (sürümleri artırır, CHANGELOG'ları yazar, dahili bağımlılık aralıklarını eşitler), her şeyi bağımlılık sırasına göre derler ve sürümü artırılan paketleri npm'e yayımlar. Ardından sürüm artışlarını commit edip gönderin.

:::warning
Tek bir paketin içinde doğrudan `npm publish` çalıştırmayın. Bu, derleme sırasını ve sürüm yayımlama betiğinin yönettiği sürüm kayıtlarını atlar. Yayımlama için `@churchapps` kapsamında yayımlama yetkisi olan bir npm hesabı gerekir.
:::

## Bir Kullanan Uygulamayla Yerel Geliştirme

Çalışma alanının içinde paketler, bağlantı kurmaya gerek kalmadan kardeş paketlere doğrudan karşı derlenir. Yayımlanmamış bir paket derlemesini bir kullanan uygulamada (B1Admin, B1App vb.) test etmek için kullanan projeye geçici bir Yarn portalı ekleyin:

```bash
# in the consuming project
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

Önce paketi derleyin (çalışma alanının kök dizininde `yarn build`). Kullanan proje kaynak kodu değil, derlenmiş `dist/` çıktısını okur.

:::warning
`yarn link`, kullanan projenin `package.json` dosyasına bir portal çözümlemesi yazar. Bu değişikliği asla commit etmeyin; işiniz bittiğinde her zaman `yarn unlink` çalıştırın ve bağımlılıkları yeniden yükleyin.
:::
