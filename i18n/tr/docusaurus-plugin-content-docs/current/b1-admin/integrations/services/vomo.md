---
title: "VOMO"
description: "VOMO gönüllü kayıtlarını ve kiosk check-in'lerini Zapier ile B1 Admin kişilerine ve gruplarına bağlayın; API anahtarı kapsamları ve kurulum adımlarıyla."
---

# VOMO

<div class="article-intro">

VOMO, bir gönüllü katılım platformudur. İnsanlar projelere kaydolur, kiosk'ta giriş yapar ve saat biriktirir. Gönüllü planlaması için VOMO'yu, kişi kayıtları için B1'i kullanıyorsanız, Zapier üyeliği ve giriş kayıtlarını bu iki sistem arasında eşitleyebilir. Böylece iki taraf birbirinden kopmaz.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Zapier erişimi sunan bir plana sahip bir [VOMO](https://vomo.org) hesabı (emin değilseniz VOMO desteğine danışın)
- Bir [Zapier](https://zapier.com) hesabı
- **Edit Settings** iznine sahip bir B1Admin kullanıcısı

</div>

## Neler Bağlanabilir

VOMO'nun Zapier uygulaması dört anlık tetikleyici ve dört eylem sunar. Çoğu kilisenin istediği tarifler şunlardır:

| Yön | Tetikleyici | Eylem |
|---|---|---|
| VOMO → B1 | VOMO Membership (oluşturuldu) | B1: Find Person → Create Person (yeni ise) |
| VOMO → B1 | VOMO Kiosk girişi | B1: Add Group Member ile "Şu An Hizmette" grubuna ekleme veya yoklama olarak kaydetme |
| B1 → VOMO | B1 `person.created` | VOMO: Find Organizer (e-posta ile); bulunamazsa özel adım |
| Her ikisi | VOMO Participation (kayıtlar) | B1: Add Group Member ile projeye özel gruba ekleme |

VOMO eylemleri bugün yalnızca **proje taslağı oluşturma** ve mevcut organizatörleri veya projeleri **bulma** ile sınırlıdır. Bir kişiyi VOMO projesine ekleyen bir eylem yoktur. İlginç bağlantıların çoğu VOMO → B1 yönündedir.

## Kurulum

### 1. Bir B1 API anahtarı oluşturun

**Settings → Developer → API Keys → New API Key** yolunu izleyin. Kapsamlar (scopes):

- `people:read`, `people:write`: gönüllüleri aramak ve B1 kişileri olarak oluşturmak için
- `groups:write`: onları hizmet ekibi gruplarına eklemek için
- (İsteğe bağlı) Kiosk girişlerini yoklama olarak değerlendiriyorsanız `attendance:write`

### 2. Üyelik eşitleme Zap'ini oluşturun

1. **Tetikleyici**: VOMO: Membership (olay = `created`).
2. **Eylem**: B1.church: Find Person, e-posta adresine göre eşleştirilmiş.
3. **Filtre / Yol**: Bulunan ve bulunmayan kayıtlar için ayrım yapın:
   - Bulunamadıysa: B1.church: Create Person, ardından uygun gönüllü grubu için Add Group Member.
   - Bulunduysa: Doğrudan B1.church: Add Group Member.
4. Zap'i açın. Yeni VOMO gönüllüleri artık B1'de doğru grup üyeliğiyle görünür.

### 3. (İsteğe bağlı) Kiosk giriş Zap'ini oluşturun

1. **Tetikleyici**: VOMO: Kiosk
2. **Eylem**: B1.church: Find Person (e-posta ile)
3. **Eylem**: Tercihinize göre seçin:
   - *Yoklama olarak değerlendiriyorsanız*: Zapier ile Webhooks, B1'in `/attendance/visits` uç noktasına POST isteği gönderir. (B1'in Zapier uygulamasında henüz birinci sınıf bir *Record Attendance* eylemi bulunmuyor.) B1 [API anahtarı](/docs/developer/api/api-keys), `Authorization: Bearer cak_…` başlığında kullanılır.
   - *Grup üyeliği olarak değerlendiriyorsanız*: "Şu An Hizmette (Bugün)" grubu için B1.church: Add Group Member kullanın. Gün içinde sonra çalışan ikinci bir Zap ise zamanlanmış bir temizlik adımıyla onları gruptan çıkarır.

## Yaygın Tarifler

### Proje bazında grup eşitleme

- **Tetikleyici**: VOMO: Participation (oluşturuldu)
- **Eylem**: Proje kimliğine göre Zapier Filter, ardından
- **Eylem**: B1.church: Add Group Member, VOMO projesinin adını yansıtan bir B1 grubuna

VOMO projesi sona erdiğinde B1 grubunu elle temizleyin. Ya da bunu, kişileri gruptan çıkaran bir *Participation deleted* tetikleyicisiyle eşleştirin.

### SMS ile "kaydolduğunuz için teşekkürler" mesajı gönderme

Aynı Zap içinde VOMO Participation'ı Clearstream Send Text veya Text In Church Send Message eylemine bağlayın. Her ikisinin de birinci sınıf Zapier eylemleri vardır. Bkz. [Clearstream](./clearstream.md) ve [Text In Church](./text-in-church.md).

### Kopmaları tespit etme

Bu ay hizmet ekibine katılan B1 kişilerinin listesi için VOMO'da Find Organizer çağıran günlük bir Zapier *Schedule* tetikleyicisi çalıştırın. VOMO "bulunamadı" yanıtı verirse, o kişi VOMO'yu etkinleştirmemiştir ve hatırlatılması gerekir.

## Sınırlamalar ve Notlar

- **E-posta birleştirme anahtarıdır.** VOMO'nun verileri bir kullanıcı e-postası sunar, ancak B1 kişi kimliği sunmaz. Her iki sistemde farklı e-posta kullanan bağışçılar yinelenen kayıtlar oluşturur.
- **VOMO'nun Zapier uygulamasında bugün "Projeye Ekle" eylemi yoktur.** B1'den VOMO projesine kayıt yapmanız gerekirse, *Webhooks by Zapier* adımından VOMO'nun REST API'sine POST isteği göndermeniz gerekir. Bu özel bir entegrasyondur.
- **VOMO'nun ücretsiz veya alt seviye planlarında Zapier bulunmayabilir.** Bir bağlantı tarihi vaat etmeden önce VOMO desteğiyle doğrulayın.

## Sorun Giderme

- **Tetikleyici hiç çalışmıyor**: VOMO'nun anlık tetikleyicileri, API belirtecinin geçerli kalmasını gerektirir. Zap'i yeniden test edin. Belirteç yenilendiyse VOMO bağlantısını yeniden kurun.
- **B1 *Add Group Member* 422 hatası veriyor**: Eylemdeki grup kimliği mevcut değil. **B1Admin → Groups** bölümünü açın, grubu tıklayın ve URL'deki kimlik kısmını Zap adımına kopyalayın.
- **Tek bir VOMO gönüllüsünden yinelenen B1 kişileri oluşuyor**: Muhtemelen B1'de zaten kayıtlı olan e-postadan farklı bir e-postayla kaydolmuşlardır. E-postaları standartlaştırın veya oluşturmadan önce telefona göre de arayan bir Zapier *Path* ekleyin.

## Ayrıca Bakınız

- [Zapier (genel bakış)](../zapier.md): Her Zapier tarifinin B1 tarafı
- [Clearstream](./clearstream.md), [Text In Church](./text-in-church.md): Gönüllü kayıtlarını SMS onaylarıyla eşleştirir
- [Webhook'lar (geliştirici başvurusu)](/docs/developer/api/webhooks): VOMO'nun tetiklenebileceği olaylar
