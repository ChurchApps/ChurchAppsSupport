---
title: "Yardımcılar"
description: "@churchapps/helpers paketinin geliştiriciler için kapsamı: neler sunduğu, hangi uygulamaların kullandığı, Packages çalışma alanında yerel derleme kurulumu ve changesets tabanlı yayımlama akışı."
---

# Yardımcılar

<div class="article-intro">

`@churchapps/helpers` paketi, hem ön yüz hem arka uç olmak üzere tüm ChurchApps projelerinin kullandığı temel yardımcı işlevleri sağlar. Belirli bir çerçeveye bağlı değildir ve `DateHelper`, `ApiHelper`, `CurrencyHelper` gibi yaygın yardımcıları ile uygulamalar ve API'ler arasındaki veri sözleşmesini oluşturan ortak TypeScript arayüzlerini içerir.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- **Node.js** ve **Git** yükleyin -- bkz. [Ön Koşullar](../setup/prerequisites.md)
- [Paketler çalışma alanı](./index.md) kurulumunu ve sürüm akışını inceleyin

</div>

## Bunu Kimler Kullanır

Her ChurchApps API'si (çekirdek Api, AskApi ve LessonsApi) ile her web ön yüzü (B1Admin, B1App, B1Transfer, LessonsApp) bu paketi doğrudan kullanır. Ön yüzler ayrıca birçok dışa aktarımını (`ApiHelper`, `DateHelper`, `UserHelper` ve diğer arayüzler) [`@churchapps/apphelper`](./app-helper.md) üzerinden yeniden dışa aktarılmış olarak alır. Diğer ortak paketler bu paketi eş bağımlılık (peer dependency) olarak tanımlar, böylece her uygulama tam olarak tek bir kopya kullanır.

## Yerel Geliştirme Kurulumu

Bu paket, diğer ortak kütüphanelerle birlikte [Packages](https://github.com/ChurchApps/Packages) çalışma alanında bulunur:

1. Çalışma alanını klonlayın:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Bağımlılıkları çalışma alanının kökünde kurun:

   ```bash
   cd Packages && yarn install
   ```

3. Derleyin (TypeScript kodunu `dist/` klasörüne derler):

   ```bash
   yarn workspace @churchapps/helpers build
   ```

   Ya da bağımlılık sırasına göre tüm paketleri derlemek için kökte `yarn build` komutunu çalıştırın.

Değişiklikleri kullanan bir projede test etmek için geçici bir Yarn portalı kullanın -- bkz. [Kullanan Bir Uygulamaya Karşı Yerel Geliştirme](./index.md#local-development-against-a-consuming-app).

## Yayımlama

Sürümler elle sürüm artırma yerine changesets üzerinden yapılır:

1. Çalışma alanının kökünde `yarn changeset` komutunu çalıştırın, `@churchapps/helpers` paketini ve uygun artış türünü seçin; oluşan changeset dosyasını değişikliğinizle birlikte commit edin.
2. Yayımlamaya hazır olduğunuzda kökte `yarn publish-all` komutunu çalıştırın -- bu komut sürümleri artırır, CHANGELOG dosyalarını yazar, bağımlılık sırasına göre derler ve npm'e yayımlar.

Yeni ortak arayüzler `helpers/src/interfaces/` klasörüne eklenir ve paket barrel dosyası üzerinden yeniden dışa aktarılır. Web sitesi oluşturucunun öğe türü kataloğu (`ElementTypes.ts` -- yanıt şemalarıyla birlikte 35 tür) da burada bulunur; apphelper oluşturucuları, B1Admin düzenleyici formları ve yapay zekâ üretim istemleri tarafından paylaşılan sözleşmedir (bkz. [Web Sitesi Oluşturucu Mimarisi](../architecture/website-builder.md)).

:::warning
Bu paket her ChurchApps projesi tarafından kullanıldığından, buradaki değişikliklerin etkisi geniştir. `helpers` sürümü yayımlandığında, `apihelper` ve `apphelper` paketleri de bağımlılık aralıklarının güncel kalması için otomatik olarak artırılır. Yayımlamadan önce, en az bir kullanan API'de ve bir kullanan web uygulamasında Yarn portalı ile test edin.
:::

## İlgili Makaleler

- **[ApiHelper](./api-helper.md)** -- Bu pakete bağlı sunucu tarafı yardımcı araçları
- **[AppHelper](./app-helper.md)** -- Bu pakete bağlı React bileşenleri
- **[Ortak Kütüphanelere Genel Bakış](./index.md)** -- Çalışma alanı kurulumu, sürüm akışı ve yerel bağlantı iş akışı
