---
title: "Bağlı Hizmetler"
description: "B1 Admin'i Zapier veya Make tarifleriyle Mailchimp, Donorbox, Subsplash, VOMO, Clearstream ve diğer araçlara bağlayın; her biri için kurulum rehberleri."
---

# Bağlı Hizmetler

<div class="article-intro">

B1'i başka bir kilise teknolojisi aracına bağlamanın en hızlı yolu genellikle bir Zapier veya Make tarifidir. Bunun için yeni bir B1 altyapısına ihtiyacınız yoktur ve iş akışını üçüncü taraf hizmet barındırır. Bu sayfa, bugün bağlanabileceğini doğruladığımız hizmetlerin derlenmiş bir listesidir. Her biri için kısa, kopyala-yapıştır kurulum kılavuzu içerir.

</div>

## Bir Bakışta

| Hizmet | Kategori | Köprü | Neleri bağlayabilirsiniz |
|---|---|---|---|
| [Mailchimp](./mailchimp.md) | E-posta | Zapier veya Make | Yeni B1 kişilerini veya bağışçılarını bir Mailchimp kitlesine senkronize edin |
| [Donorbox](./donorbox.md) | Bağışlar | Zapier | Donorbox bağışlarını ve bağışçılarını B1'e geri gönderin |
| [Subsplash](./subsplash.md) | Uygulama / Bağışlar | Zapier | Subsplash bağışlarını ve kişilerini B1'e aktarın |
| [VOMO](./vomo.md) | Gönüllülük | Zapier | B1 grupları ile VOMO projeleri arasında gönüllü kayıtlarını senkronize edin |
| [Clearstream](./clearstream.md) | SMS | Zapier | B1 olaylarından bir Clearstream metni tetikleyin; yanıtları B1 kayıtları olarak alın |
| [Text In Church](./text-in-church.md) | SMS / İş akışları | Zapier | B1'den Text In Church iş akışlarını tetikleyin; Connect Card verilerini alın |
| [Mobile Message](./mobile-message.md) | SMS (AU) | Zapier veya Make ile webhook'lar | Herhangi bir B1 olayından SMS gönderin |
| [Checkr](./checkr.md) | Arka plan kontrolleri | Make | Biri bir hizmet ekibine katıldığında arka plan kontrolü başlatın |

## Bunların Ortak Yönleri

1. **Bağlantının B1 tarafı aynıdır.** **B1Admin → Settings → Developer → API Keys** bölümünden doğru kapsamlara sahip bir API anahtarı oluşturun. Ardından, köprünün tetikleyici için bir webhook kaydetmesine izin verin (Zapier ve Make bunu otomatik yapar ve `settings:write` yetkisi gerektirir) veya bir sonraki adımdan B1'in REST uç noktalarını çağırın.
2. **Köprünün ücretini siz ödersiniz, biz ödemeyiz.** ChurchApps ücretsizdir. Zapier ve Make'in ise birkaç tarifi kapsayan ücretsiz katmanları vardır.
3. **Canlıya geçmeden bağlantıyı test edebilirsiniz.** Her iki köprüde de "Test adımı" düğmesi bulunur. Bu düğme tetikleyiciyi B1'e karşı bir kez çalıştırır ve tarifi açmadan önce veri yapısını gösterir.

## Köprü Seçimi

- **Zapier** daha kullanıcı dostudur ve daha geniş bir uygulama kataloğuna sahiptir. Maliyet bir sorun değilse varsayılan seçeneğiniz olarak kullanın.
- **Make** büyük ölçekte daha ucuzdur ve daha esnek yönlendirme ve filtreleme mantığı sunar. Tek bir iş akışında dallanma, koşullar veya birçok adım varsa bunu kullanın.
- **Webhooks by Zapier** (Mobile Message belgesinde kullanılır), hedef Zapier'ın birinci sınıf uygulaması olmadığında bir Zap'ten herhangi bir HTTP uç noktasına POST isteği göndermenizi sağlayan genel bir adaptördür.

Bu listede olmayan bir şeye ihtiyacınız varsa, B1'in [REST API](/docs/developer/api) ve [webhook'ları](/docs/developer/api/webhooks) herkese açıktır. [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) ile birkaç saat içinde tek seferlik bir köprü oluşturabilirsiniz.

## Burada Olmayanlar (ve Nedeni)

Tithe.ly, Pushpay, Vanco, PastorsLine, Gloo, Notebird, KidCheck ve MinistrySafe gibi birçok popüler kilise teknolojisi aracının bugün yayımlanmış bir Zapier uygulaması veya Make modülü yoktur. Kendi API'leri vardır, ancak bunları B1'e bağlamak bir tarif değil, özel kod gerektiren bir iştir. Bu nedenle bu listeye uymazlar. Bir satıcı Zapier uygulaması veya Make modülü eklerse, belgeyi ekleyeceğiz.

Ayrıca Planning Center Services'a özgü araçları (müzik, sunum), rakip ChMS ürünlerini, geçiş danışmanlarını ve yalnızca PCO'ya özgü verileri temizleyen araçları bilerek dışarıda bıraktık. Bunların hiçbirinin B1'e anlamlı bir bağlantı yolu yoktur.

## Ayrıca Bakınız

- [Zapier (genel bakış)](../zapier.md): Her Zapier tarifinin B1 tarafı aynıdır. Bu belge bunu bir kez kapsar.
- [Make (genel bakış)](../make.md): Make senaryoları için de aynı geçerlidir.
- [Slack & Discord](../slack-discord.md): Herhangi bir köprü olmadan sohbet bildirimleri.
- [Google Sheets](../google-sheets.md): İsteğe bağlı dışa aktarımlar.
- [Webhook'lar (geliştirici başvurusu)](/docs/developer/api/webhooks): Her tarifin dayandığı olay kataloğu.
