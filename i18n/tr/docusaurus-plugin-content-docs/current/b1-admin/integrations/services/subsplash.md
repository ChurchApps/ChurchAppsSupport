---
title: "Subsplash"
description: "Subsplash bağışlarını, yeni kişileri ve form yanıtlarını Zapier ile B1'e bağlayın; bağışlar ve profiller otomatik olarak B1 Admin'e düşsün."
---

# Subsplash

<div class="article-intro">

Uygulamanız, bağışlarınız veya formlarınız için Subsplash kullanıyor ama kişi ve bağış kayıtlarını tutan sistem olarak B1'i tercih ediyorsanız, Subsplash'in Zapier uygulaması bağışları, yeni profilleri ve form yanıtlarını gerçek zamanlı olarak B1'e aktarabilir. Subsplash'in Zapier uygulamasının şu anda yalnızca **tetikleyici** desteklediğini unutmayın. Bağlantı tek yönlüdür (Subsplash → B1).

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- **API + Zapier** erişimini içeren bir pakete sahip bir Subsplash hesabı (bu erişim paket düzeyine bağlıdır, Subsplash Client Success Manager'ınızla kontrol edin)
- Bir [Zapier](https://zapier.com) hesabı
- **Edit Settings** iznine sahip bir B1Admin kullanıcısı

</div>

## Neleri Bağlayabilirsiniz

Aşağıdaki tüm tetikleyiciler Subsplash'e aittir. Eylemler ise B1'e aittir.

| Subsplash tetikleyicisi | B1 eylemi |
|---|---|
| Yeni Bağış | Kişiyi Bul → Bağış Ekle (Kişi yoksa Kişi Oluştur) |
| Yeni Taahhüt | Bağış Ekle (`notes` = "Taahhüt: …" ile) |
| Yeni Kişi Oluşturuldu | Kişi Oluştur |
| Kişi Profilini Güncelledi | (Doğrudan bir B1 eylemi yok, manuel inceleme için bir Google Sheet'e kaydedin) |
| Yeni Form Yanıtı | Kişi Oluştur + (isteğe bağlı olarak) formdan Gruba Üye Ekle |

Subsplash → B1, Subsplash uygulamasının şu anda desteklediği tek yöndür.

## Kurulum

### 1. Bir B1 API anahtarı oluşturun

B1Admin'de: **Settings → Developer → API Keys → New API Key**. Kapsamlar:

- `people:read`: bağışçıyı e-posta adresiyle aramak için
- `people:write`: bağışçı yoksa oluşturmak için
- `donations:write`: bağışı kaydetmek için
- (`settings:write` gerekmez. Bu senaryoda tetikleyiciye sahip olan B1 değil, Subsplash'tir.)

### 2. Subsplash'i Zapier'a bağlayın

[Subsplash'in Zapier entegrasyon kılavuzunu](https://support.subsplash.com/en/articles/9825926-zapier-integration) izleyin. Subsplash, Zapier'ın tetikleyici tarafını doğrulamak için kullandığı bir API belirteci üretmek üzere Subsplash Dashboard'un içinden size bir belirteç verir.

### 3. "Bağış kaydet" Zap'ini oluşturun

1. **Tetikleyici**: Subsplash: Yeni Bağış
2. **Eylem**: B1.church: Kişiyi Bul (e-postaya göre)
3. **Filtre / Yol**: "kişi bulundu" durumuna göre dallandırın:
   - **Bulundu:** B1.church: Bağış Ekle. Tutarı, tarihi, fonu ve yöntemi ("Online") eşleyin. Notes alanına Subsplash işlem kimliğini yazın.
   - **Bulunamadı:** B1.church: Kişi Oluştur → B1.church: Bağış Ekle (yeni oluşturulan kişinin kimliğini kullanarak).

Zap'i etkinleştirin. Bundan sonraki Subsplash bağışları birkaç saniye içinde **B1Admin → Donations** sayfasına akacaktır.

## Yaygın Tarifler

### İlk kez bağış yapan birine teşekkür e-postası gönderin

- **Tetikleyici**: Subsplash: Yeni Bağış
- **Eylem**: Zapier ile filtre. Yalnızca bağışçının ilk bağışıysa devam edin (Bağışçı E-postası üzerinde, geçmiş bağışçıların listelendiği bir Google Sheet'e karşı bir *Lookup Table* kullanın veya bağışçının oluşturulma tarihine dayalı bir Zapier *Paths* adımı kullanın)
- **Eylem**: Mailchimp / SMTP / SendGrid: ilk bağış teşekkür mesajını gönderin
- **Eylem**: B1.church: Bağış Ekle (normal şekilde)

### Taahhütleri düzenli bağış akışından ayırın

- **Tetikleyici**: Subsplash: Yeni Taahhüt
- **Eylem**: B1.church: `notes = "Taahhüt — Subsplash"` ve `Taahhütler` adlı bir fonla Bağış Ekle (işletme fonunuzdan ayrı olarak). Böylece taahhütleri **B1Admin → Donations → Summary** üzerinden ayrı olarak raporlayabilirsiniz.

### Yeni uygulama kullanıcılarını B1 kişisi olarak eşitleyin

- **Tetikleyici**: Subsplash: Yeni Kişi Oluşturuldu
- **Eylem**: B1.church: Kişi Oluştur. Ad, e-posta ve telefon alanlarını doldurun. Yeni kişiyi "Subsplash App Users" gibi bir gruba ekleyerek B1'de etiketleyin.

## Sınırlamalar ve Notlar

- **Subsplash'in Zapier uygulaması yalnızca tetikleyici destekler.** B1 tarafındaki değişikliklerin (örneğin B1'de yeni bir kişinin Subsplash'te de oluşması) gerekmesi durumunda, bu köprüyü B1'in Zapier uygulama tetikleyicilerinden, *Webhooks by Zapier — POST* özel eylemi aracılığıyla Subsplash'in REST API'sini çağıracak şekilde kendiniz kurmanız gerekir. Bu bir hazır tarif değil, özel bir entegrasyondur.
- **API erişimi pakete bağlıdır.** Zapier bağlantısı `403 Forbidden` hatasıyla başarısız olursa Subsplash paketiniz muhtemelen API erişimini içermiyordur. Client Success Manager'ınızla iletişime geçin.
- **Fon eşlemesi manuel yapılır.** Subsplash bir kampanya veya kategori adı iletir, ancak B1 sayısal bir fon kimliğine ihtiyaç duyar. Fonu Zap'e sabit olarak yazabilir veya Subsplash kampanyalarını B1 fonlarıyla eşleyen bir Zapier *Lookup Table* tutabilirsiniz.

## Sorun Giderme

- **Bağıştan sonra hiçbir tetikleyici çalışmıyor**: Subsplash'in Zapier panelinde bağlantının hâlâ *Connected* durumunda göründüğünü doğrulayın. API belirteci Subsplash tarafında yenilendiyse Zap sessizce durur. Bağlantıyı yeniden kurun.
- **B1 *Add Donation* adımı 422 hatasıyla başarısız oluyor**: En sık neden eksik veya tanınmayan bir `fundId` değeridir. **B1Admin → Donations → Funds** üzerinden fonlarınızı listeleyin ve tam kimliği Zap adımına kopyalayın.
- **İlk bağış iki kez tetikleniyor**: Zapier onayını kaçırırsa Subsplash bazen tetikleyiciyi yeniden gönderir. Yinelenenleri elemek için bağış kimliğine (Subsplash bunu yükte gönderir) göre bir *Filter by Zapier* ekleyin.

## Ayrıca Bakınız

- [Donorbox](./donorbox.md): aynı tarif yapısını kullanan, farklı bir bağış platformu
- [Zapier (genel bakış)](../zapier.md): her Zapier tarifinin B1 tarafı
- [Subsplash Zapier entegrasyon kılavuzu](https://support.subsplash.com/en/articles/9825926-zapier-integration) (Subsplash dokümantasyonu)
