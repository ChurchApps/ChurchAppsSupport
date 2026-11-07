---
title: "Clearstream"
description: "Clearstream SMS'i Zapier ile B1 Admin'e bağlayın: yeni bağışlarda ya da form gönderimlerinde mesaj gönderin ve gelen yanıtları kişi olarak geri alın."
---

# Clearstream

<div class="article-intro">

Herhangi bir B1 etkinliğinden — yeni kişi, yeni bağış, form gönderimi, takvim güncellemesi — bir [Clearstream](https://clearstream.io) kısa mesajı tetikleyin ve yanıtları B1 kayıtları olarak geri çekin. Clearstream'in Zapier uygulaması iki yönü de desteklediği için tüm bağlantı özel kod gerektirmez, bir tarif olarak kurulabilir.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- En az bir listesi ve SMS kotası olan bir [Clearstream](https://clearstream.io) hesabı
- Bir [Zapier](https://zapier.com) hesabı
- **Ayarları Düzenle** izni olan bir B1Admin kullanıcısı

</div>

## Neler Bağlanabilir

| Yön | Tetikleyici | Eylem |
|---|---|---|
| B1 → Clearstream | B1 `person.created` | Clearstream: Create/Update Subscriber + Send Text to Number |
| B1 → Clearstream | B1 `donation.created` | Clearstream: Send Text to List (ör. finans ekibine bildirim) |
| B1 → Clearstream | B1 `form.submission.created` | Clearstream: Send Text to a routing list (ör. dua talebi ekibi) |
| Clearstream → B1 | New Incoming Text | B1: Create Person; gönderdikleri anahtar kelimeyle etiketleyin |

Clearstream'in Zapier eylemleri: *Send Text to Number*, *Send Text to List*, *Create/Update Subscriber*, *Add Subscriber to Automated Workflow*, *Add Tag to Subscriber*, *Remove Subscriber From List*.

## Kurulum

### 1. B1 API anahtarı oluşturun

**Ayarlar → Geliştirici → API Anahtarları → Yeni API Anahtarı**:

- `settings:write` — B1'in tetikleyici webhook'unu kaydetmesi için gereklidir
- `people:read` — etkinlikteki kişiyi bulmak için gereklidir (`personId` → ad/telefon/e-posta)
- (İsteğe bağlı) Clearstream yanıtlarından B1 kişileri oluşturulacaksa `people:write`

### 2. "Yeni bağışta metin gönder" Zap'ini oluşturun

1. **Tetikleyici** — B1.church: New Donation
2. **Eylem** — B1.church: Find Person (bağışın `personId` değeri)
3. **Eylem** — Clearstream: Send Text to Number. Alıcı olarak 2. adımdaki kişinin telefonunu kullanın ve mesajı yazın (`"Thanks for your gift, {first}! …"`).

Zap'i açın. B1, etkinleştirildiğinde bağış webhook'unu kaydeder; **Ayarlar → Geliştirici → Webhook'lar** bölümünde `Zapier — donation.created` satırını görürsünüz.

### 3. (İsteğe bağlı) Yanıtları B1 kayıtları olarak geri çekin

1. **Tetikleyici** — Clearstream: New Incoming Text
2. **Eylem** — Anahtar kelimeye göre Zapier filtresi — ör. yalnızca metin `PRAY` ile başlıyorsa devam edin
3. **Eylem** — B1.church: Find Person (telefonla)
4. **Eylem** — Filter / Path — bulunamazsa oluşturun; her durumda metni bir yere kaydedin (Slack, Google E-Tablo veya Zapier ile Webhooks üzerinden bir B1 form gönderimi).

## Yaygın Tarifler

### Gönüllü ekibe çağrı

- **Tetikleyici** — B1.church: New Form Submission (dua talebi formu kimliğine göre filtrelenmiş)
- **Eylem** — Clearstream: Send Text to List; liste olarak nöbetçi pastoral ekibinizi seçin. Mesaj gövdesini `New prayer request: {data.questions.0.answer}` şeklinde yazın.

### İlk kez gelen ziyaretçi takip dizisi

- **Tetikleyici** — B1.church: New Person, B1 kişi etiketi "First-time visitor" olacak şekilde filtrelenmiş
- **Eylem** — Clearstream: Add Subscriber to Automated Workflow. İş akışı kimliğini önceden hazırlanmış 7 günlük bir metin dizisine eşleyin.

### Anahtar kelimeyle gruba katılım

- **Tetikleyici** — Clearstream: New Incoming Text (anahtar kelime `MENS` olacak şekilde filtrelenmiş)
- **Eylem** — B1.church: Find Person (telefonla); bulunamadığında → Create Person koluna ayırın
- **Eylem** — B1.church: Add Group Member ile Erkekler Hizmet Grubu'na ekleyin

## Sınırlar ve Notlar

- **Clearstream SMS'leri mesaj sayısına göre ölçer.** Her Send Text eylemi, uzunluğa ve alıcı sayısına bağlı olarak bir veya daha fazla kredi harcar — planınızın kotasını kontrol edin.
- ***Send Text to Number*** için telefon **E.164 biçiminde** olmalıdır (ör. `+15555550199`). B1 kişi kaydı girilen değeri olduğu gibi saklar; biçimi garanti edemiyorsanız *Formatter by Zapier — Numbers → Format Phone Number* adımını kullanın.
- **B1 tarafından bir başlık gerekmez** — Clearstream'in kimlik doğrulaması tamamen Zapier bağlantısının içinde yürütülür.

## Sorun Giderme

- **Tetikleyici hiç çalışmıyor** — Zap açıldıktan sonra **Ayarlar → Geliştirici → Webhook'lar** bölümünde bir `Zapier — <event>` satırı görünmelidir. Görünmüyorsa B1 API anahtarında `settings:write` eksiktir. Anahtarı yeniden oluşturun ve bağlantıyı yenileyin.
- **Clearstream "Invalid phone number" hatası veriyor** — Alıcı alanı E.164 biçiminde değil. Bir Format Phone Number adımı ekleyin.
- **Send Text to List `403` ile başarısız oluyor** — Clearstream API kullanıcısının o listeye erişim izni yok ya da liste kimliği yanlış. Liste kimlikleri Clearstream liste ayrıntı sayfasında görünür.

## Ayrıca Bakınız

- [Text In Church](./text-in-church.md) — benzer bağlantı yapısına sahip alternatif SMS platformu
- [Mobile Message](./mobile-message.md) — ABD dışındaki kiliseler için
- [Zapier (genel bakış)](../zapier.md) — her Zapier tarifinin B1 tarafı
- [Clearstream API dokümantasyonu](https://api-docs.clearstream.io/) — Zapier uygulamasının ötesindeki özel entegrasyonlar için
