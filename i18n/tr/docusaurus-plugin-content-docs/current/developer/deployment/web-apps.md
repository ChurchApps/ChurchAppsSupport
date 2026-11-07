---
title: "Web App Dağıtımı"
description: "B1 Admin gibi ChurchApps web uygulamalarını Amazon S3 ve CloudFront'a dağıtma adımları; birleştirmede GitHub Actions ile otomatik dağıtım veya manuel komutlar."
---

# Web App Dağıtımı

<div class="article-intro">

ChurchApps web uygulamaları, CDN olarak **CloudFront** kullanılarak **Amazon S3** üzerinde statik siteler olarak dağıtılır. Dağıtımlar GitHub Actions aracılığıyla otomatik olarak yapılır, ancak gerektiğinde manuel olarak da çalıştırılabilir.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Web uygulamasını yerel olarak kurun ve derlendiğini doğrulayın -- bkz. [Web Uygulamaları](../web-apps/index.md)
- S3 ve CloudFront erişimine sahip AWS kimlik bilgilerini yapılandırın
- Hedef S3 bucket adını ve CloudFront dağıtım kimliğini bilin

</div>

## Dağıtım Adımları

1. **Uygulamayı derleyin** -- statik çıktıyı oluşturun:

   ```bash
   npm run build
   ```

2. **S3 ile eşitleyin** -- derleme çıktısını S3 bucket'ına yükleyin:

   ```bash
   aws s3 sync build/ s3://bucket-name
   ```

3. **CloudFront önbelleğini geçersiz kılın** -- kullanıcıların en son sürümü alabilmesi için CDN önbelleğini temizleyin:

   ```bash
   aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
   ```

## Otomatik Dağıtımlar

GitHub Actions iş akışları, `main` dalına push yapıldığında dağıtımı otomatik olarak gerçekleştirir. İş akışı, yukarıdaki üç adımın tamamını -- derleme, S3 eşitleme ve CloudFront önbellek geçersiz kılma -- manuel müdahale olmadan gerçekleştirir.

:::info
Bu komutları genellikle manuel olarak çalıştırmanız gerekmez. Bir pull request'in `main` dalına birleştirilmesi, otomatik dağıtım hattını tetikler.
:::

:::tip
Dağıtımdan önce bir derlemeyi yerel olarak doğrulamanız gerekiyorsa, `npm run build` komutunu çalıştırın ve çıktıyı `build/` dizininde inceleyin. Her şeyin çalıştığını doğrulamak için herhangi bir statik dosya sunucusuyla yerel olarak sunabilirsiniz.
:::

## İlgili Makaleler

- **[Web Uygulamaları](../web-apps/index.md)** -- B1Admin, B1App ve LessonsApp için kurulum kılavuzları
- **[API Dağıtımı](./apis.md)** -- Arka uç API'lerinin dağıtımı
- **[Mobil Dağıtım](./mobile.md)** -- Mobil uygulamaların uygulama mağazalarına dağıtımı
