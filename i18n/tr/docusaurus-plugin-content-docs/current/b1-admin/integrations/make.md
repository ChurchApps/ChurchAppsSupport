---
title: "Make"
description: "B1 Admin'i Make'e bağlayarak iş akışlarını otomatikleştirin: API anahtarı oluşturun, B1.church tetikleyicisini ve eylemlerini kurun, yaygın hataları giderin."
---

# Make

<div class="article-intro">

[Make](https://www.make.com) (eski adıyla Integromat), görsel bir iş akışı otomasyon platformudur. Ruhen Zapier'a benzer, ancak daha esnek mantık sunar ve büyük ölçekte daha uygun maliyetlidir. Resmi B1.church Make uygulaması, B1 olaylarına anında tepki veren ve B1'e kayıt yazan "senaryolar" oluşturmanıza olanak tanır.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Bir [Make](https://www.make.com) hesabı (ücretsiz katman küçük iş akışlarını karşılar)
- B1Admin'de **Ayarları Düzenle** iznine sahip bir kilise yöneticisi
- Oluşturmak istediğiniz senaryo hakkında kabaca bir fikir

</div>

## Modüller

| Tür | Açıklama | B1 olayı / uç nokta |
|---|---|---|
| **Anlık Tetikleyici** | Olayları İzle | abone olunan herhangi bir B1 olayı (`person.created`, `donation.created`, …) |
| **Eylem** | Kişi Oluştur | yeni bir kişi ekler |
| **Eylem** | Bağış Ekle | bir bağışı kaydeder |
| **Eylem** | Gruba Üye Ekle | bir kişiyi bir gruba ekler |
| **Arama** | Kişi Ara | ada veya e-postaya göre kişi bulur |

Anlık tetikleyici, dinlenecek olayı seçmenize olanak tanır. Senaryo başına bir tetikleyici modülü kullanılır ve her olay için ayrı ayrı yapılandırılır.

## Kurulum

### 1. B1 API anahtarı oluşturun

1. B1Admin'de **Ayarlar → Geliştirici → API Anahtarları** bölümüne gidin.
2. **Yeni API Anahtarı**'na tıklayın, anahtara "Make" adını verin ve ihtiyacınız olan kapsamları (scope) seçin.
3. Senaryolarınızdan herhangi biri anlık tetikleyiciyi kullanıyorsa **`settings:write` kapsamını ekleyin**. Senaryo açıldığında Make, sizin adınıza bir webhook kaydeder.
4. Ayrıca eylem modüllerinin ihtiyaç duyduğu kapsamları da verin (ör. Bağış Ekle modülü için `donations:write`).
5. Kaydedin ve `cak_…` ile başlayan anahtarı kopyalayın.

### 2. Bağlantıyı kurun

1. Make'te yeni bir senaryo oluşturun ve **B1.church** tetikleyici modülünü tuvale sürükleyin.
2. İstendiğinde **Bağlantı oluştur**'a tıklayın. API anahtarını *API Key* alanına yapıştırın. *API Base URL* alanını, hazırlık ortamında test yapmıyorsanız, `https://api.churchapps.org` olarak bırakın.
3. **Kaydet**'e tıklayın. Make, kilise profilinizi okuyarak anahtarı test eder.

Bağlantı Make hesabınızda saklanır ve senaryolar arasında yeniden kullanılır.

### 3. Tetikleyiciyi yapılandırın

1. **Olayları İzle** modülünün ayarlarını açın.
2. İstediğiniz olayı seçin, ör. `donation.created`.
3. Kaydedin. Make, benzersiz bir webhook URL'si oluşturur ve bunu dahili olarak saklar.

### 4. Sonraki modülleri ekleyin

Tuvale Make'in yüzlerce uygulama modülünden herhangi birini ekleyebilirsiniz: Mailchimp, Google Sheets, Slack, HubSpot ya da kendi HTTP uç noktanız gibi. Tetikleyicinin çıktısını (`event`, `churchId`, `data.id`, `data.amount`, …) girdi alanlarına eşleyin. Make'in düzleştirme, yineleyici, yönlendirici ve toplayıcı modülleri, Zapier'da zor olacak dallanmalı ve paralel akışlar oluşturmanıza olanak tanır.

### 5. Senaryoyu açın

Senaryo başlığındaki **Active** düğmesini açın. Make, URL'yi kaydetmek için B1'in `POST /membership/webhooks` uç noktasını çağırır. Bu andan itibaren eşleşen her B1 olayı senaryodan gerçek zamanlı olarak geçer.

Senaryoyu kapattığınızda `DELETE /membership/webhooks/{id}` çağrısı yapılır, böylece yetim kalan abonelik bırakılmaz.

## Yaygın Senaryolar

### Finans incelemesi için bağışları bir Google E-Tabloya aktarın

- **Tetikleyici** — B1: Olayları İzle (`donation.created`)
- **Eylem** — Google Sheets: Satır Ekle. `data.donationDate`, `data.amount`, `data.personId`, `data.method` ve `data.batchId` alanlarını e-tablonun sütunlarına eşleyin.

### Bağış tutarına göre koşullu Slack bildirimi

- **Tetikleyici** — B1: Olayları İzle (`donation.created`)
- **Yönlendirici**:
  - A Dalı — Filtre: `data.amount >= 1000` → Slack: `#major-gifts` kanalına gönder
  - B Dalı — geri kalan her durum → Slack: `#donations` kanalına gönder

### Yeni kişi → CRM + hoş geldin e-postası + Slack

- **Tetikleyici** — B1: Olayları İzle (`person.created`)
- **Eylem** — HubSpot: Kişi Oluştur
- **Eylem** — Mailgun: Hoş Geldin E-postası Gönder
- **Eylem** — Slack: `#new-people` kanalını bilgilendir (paralel çalışması için Make'in yönlendiricisini kullanın)

## Anlık Tetikleyici Nasıl Çalışır

Anlık tetikleyici sorgulama (polling) yerine webhook ile çalışır. Etkinleştirildiğinde Make, kendi oluşturduğu URL'yi ve seçtiğiniz olayı içeren bir `POST /membership/webhooks` isteği gönderir. Olay B1'de gerçekleştiğinde B1, zarfı Make'in URL'sine POST eder ve senaryonuz birkaç saniye içinde çalışır. Senaryoyu devre dışı bırakmak webhook'u kaldırır.

Tetikleyici yalnızca senaryo **etkinken** gerçekleşen olaylarda çalışır. Geçmiş olaylar için geriye dönük çalıştırma yapılmaz.

## Sınırlar ve Notlar

- **Olayları İzle modülü başına bir olay.** Tek bir senaryoda birden fazla olayı dinlemek için tetikleyici modüllerini ayrı senaryolara koyun veya aşağıda açıklanan birleşik olay listesiyle tek bir modül kullanın.
- **İmza doğrulaması sunulmaz.** Make, `X-B1-Signature` başlığını senaryoya iletmez. Güven sınırı, Make'in tahmin edilemez senaryo başına webhook URL'sidir. Bu, Make'in olağan uygulamasıdır. Açık imza kontrolleri gerekiyorsa bunun yerine [SDK](/docs/developer/api/webhooks#sdk-support) ile özel bir entegrasyon oluşturun.
- **İşlem sayısı.** Eylem modüllerinden yapılan her API çağrısı, B1 tarafında değil, Make işlem kotanızdan düşer.

## Sorun Giderme

- **Bağlantı testi başarısız oluyor.** En sık neden API anahtarındaki bir yazım hatasıdır. Anahtarı B1Admin'den yeniden kopyalayın. Tam anahtar yalnızca bir kez gösterilir. Kaybettiyseniz yeni bir anahtar oluşturun.
- **Tetikleyici modülü etkinleşmiyor.** B1Admin'de **Ayarlar → Geliştirici → Webhook'lar** bölümünü kontrol edin. Senaryoyu etkinleştirdikten sonra "Make — &lt;event&gt;" satırını görmüyorsanız anahtarda `settings:write` kapsamı eksiktir. Anahtarı güncelleyin ve senaryoyu yeniden etkinleştirin.
- **Eylem `403 Forbidden` döndürüyor.** API anahtarında bu uç nokta için gerekli kapsam yok. Örneğin Bağış Ekle modülü `donations:write` gerektirir. B1Admin'de anahtarı güncelleyin ve yeniden test edin.

## Uygulamayı Özelleştirme

B1.church Make uygulaması açık kaynaklıdır. JSON tanımları `B1Integrations/Make/` deposunda bulunur. İhtiyacınız olan bir modül yoksa (ör. henüz kapsamadığımız bir uç nokta için yeni bir eylem), bu depoda bir issue veya PR açabilirsiniz.

## Ayrıca Bakınız

- [Zapier](./zapier.md): Aynı model, daha basit bir arayüz ve daha geniş bir uygulama kataloğu
- [Slack & Discord](./slack-discord.md): Make kullanmadan yerleşik sohbet bildirimleri
- [Webhook'lar (geliştirici başvurusu)](/docs/developer/api/webhooks)
