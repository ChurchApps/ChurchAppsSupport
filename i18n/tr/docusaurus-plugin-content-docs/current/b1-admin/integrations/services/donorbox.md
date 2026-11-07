---
title: "Donorbox"
description: "Donorbox'ı Zapier ile B1 Admin'e bağlayın; çevrimiçi bağışlar otomatik olarak bağış kayıtları ve bağışçı profilleri oluştursun, manuel dışa aktarım gerekmesin."
---

# Donorbox

<div class="article-intro">

Bağışları Donorbox üzerinden alıp kişi ve dekont kayıtlarını B1'de tutuyorsanız, Donorbox'ın anlık Zapier tetikleyicilerini B1 içinde eşleşen bağış kayıtları oluşturacak şekilde ayarlayabilirsiniz. Bağışçı henüz kayıtlı değilse, B1'de bir kişi olarak da oluşturulur. Manuel mutabakat veya aylık dışa aktarma gerekmez.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- En az bir kampanyası olan bir [Donorbox](https://donorbox.org) hesabı
- Bir [Zapier](https://zapier.com) hesabı
- **Edit Settings** iznine sahip bir B1Admin kullanıcısı

</div>

## Neler Bağlayabilirsiniz

| Yön | Donorbox tetikleyicisi | B1 eylemi |
|---|---|---|
| Donorbox → B1 | New or Updated Donation (anlık) | Find Person → Add Donation |
| Donorbox → B1 | New or Updated Donor | Create Person |
| Donorbox → B1 | New or Updated Plan (yinelenen) | Find Person → Add Donation (not olarak Plan id kullanılır) |

Donorbox tetikleyicilerini **anlık** olarak yayımlar. Gerçek bir bağış yapıldığında saniyeler içinde tetiklenirler. Herhangi bir bekleme gecikmesi yoktur.

## Kurulum

### 1. B1 API anahtarı oluşturun

B1Admin'de: **Settings → Developer → API Keys → New API Key** yolunu izleyin. Kapsamlar:

- `people:read` — bağışçıyı e-postasıyla aramak için
- `people:write` — yeni bağışçıyı oluşturmak için
- `donations:write` — bağışı kaydetmek için

Bu yöndeki tetikleyiciler B1'e değil Donorbox'a aittir, bu nedenle burada `settings:write` iznine ihtiyacınız yoktur.

### 2. "Bağış kaydet" Zap'ini oluşturun

1. **Trigger** — Donorbox: New Donation. Donorbox API anahtarınızla bağlanın (Donorbox'ta: *Account → Profile → API Settings*).
2. **Action** — B1.church: Find Person. Tetikleyiciden gelen bağışçının e-postasını *Email* arama alanına eşleyin.
3. **Action** — Zapier ile filtre (isteğe bağlı): Bağışçı bulunamadıysa devam edin, aksi halde durdurun.
4. **Action** — B1.church: Create Person. Ad, soyad ve e-postayı eşleyin, böylece bağışçı yalnızca bir bağış kaydı olarak değil, bir üye olarak eklenir.
5. **Action** — B1.church: Add Donation. Şu alanları eşleyin:
   - Amount → `data.amount`
   - Donation Date → tetikleyicideki bağış tarihi
   - Fund → Donorbox kampanyasını yansıtan B1 fonunu seçin (Zapier, bir filtre veya biçimlendirici adımına göre fon değiştirmenize izin verir)
   - Method → "Online"
   - Notes → Donorbox işlem kimliği (mutabakat için kullanışlıdır)

Zap'i açın. Donorbox üzerinden yapılan bir sonraki canlı bağış, otomatik olarak **B1Admin → Donations** bölümüne düşer.

## Yaygın Tarifler

### Fon başına bir Zap

Ayrı B1 fonlarına eşlenen birden fazla Donorbox kampanyanız varsa, en temiz düzen kampanya başına bir Zap oluşturmak ve en üste bir Donorbox *campaign* filtresi eklemektir. Bu şekilde fon eşlemesi sabit kodlanır ve arama adımını atlarsınız.

### Güncellenen bağışları düzeltme olarak ele alın

Donorbox'ın *New or Updated Donation* tetikleyicisi, düzenlemelerde de tetiklenir. `event_type` alanına göre dallanmak için bir Zapier *Path* adımı kullanın: "new" → Add Donation, "updated" → Find Donation + Update. (Not: B1'in Zapier uygulamasında şu anda bir Update Donation eylemi yoktur. Şimdilik "updated" olaylarını manuel inceleme için bir Slack kanalına kaydedin.)

### Yinelenen plan değişikliklerini bir Slack kanalına gönderin

- **Trigger** — Donorbox: New or Updated Plan
- **Action** — Slack: `#donations` kanalına Send Message (örneğin "Plan değişti — Sarah'nın aylık bağışı artık 200 $")

## Sınırlamalar ve Notlar

- **Bağışçıları e-postaya göre eşleştirin.** Donorbox, B1'deki kişi kimliğini paylaşmaz. Kalıcı tek birleştirme anahtarı e-postadır. Farklı bir e-postayla bağış yapan bağışçılar yeni bir B1 kişisi oluşturur. Aylık mutabakatınızda bu kayıtları kontrol edin.
- **İadeler ayrı olarak sunulmaz.** Donorbox, aynı bağış için bir durum güncellemesi gönderir. B1'in Zapier uygulamasında şu anda bir *Update Donation* eylemi yoktur. Bugün için güvenli yöntem, iade olaylarını uygulama dışında kaydetmek ve bağışı manuel olarak düzeltmektir.
- **Önce Donorbox'ın sandbox ortamında test edin.** Canlı B1'de sahte bağışlar oluşturmaktan kaçınmak için bunu yapın. Donorbox, canlı kimlik bilgilerinden ayrı test modu kimlik bilgileri sağlar.

## Sorun Giderme

- **Her çalıştırmada "Person not found" uyarısı** — Adımları, *Create Person* adımının bulunamadı dalında çalışacak şekilde sıraladıysanız bu normaldir. Create Person adımı hiç çalışmıyorsa, API anahtarının `people:write` iznine sahip olduğunu kontrol edin.
- **Bağış tutarı 100 kat çok büyük veya küçük görünüyor** — Donorbox, bazı veri yüklerinde kuruş, bazılarında dolar gönderir. Gerekirse değeri 100'e bölmek için bir *Formatter by Zapier — Numbers* adımı kullanın.
- **Tek bir bağıştan yinelenen bağışlar** — Donorbox hem *New Donation* hem de *Updated Donation* olaylarını tetikler. Ya `event_type = "donation.succeeded"` olacak şekilde filtreleyin ya da çakışmayan filtrelere sahip iki Zap oluşturun.

## Ayrıca Bakınız

- [Zapier (genel bakış)](../zapier.md) — her Zapier tarifinin B1 tarafı
- [Subsplash](./subsplash.md) — Zapier uygulaması olan başka bir bağış platformu
- [Mailchimp](./mailchimp.md) — "yeni bağış" olayını bir e-posta etiketine bağlayın
