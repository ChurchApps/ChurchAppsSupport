---
title: "Zapier"
---

# Zapier

<div class="article-intro">

Zapier üzerindeki resmî B1.church uygulaması, bir Zap'in kilisenizdeki olaylara (yeni kişi, yeni bağış, yeni grup üyesi, …) tepki vermesini ve B1'e kayıt yazmasını sağlar. Kod yazmanız veya altyapı kurmanız gerekmez. Zapier'ın sürükle-bırak düzenleyicisinde bağlantıyı kurar, bir API anahtarı yapıştırır ve Zap'i açarsınız.

</div>

:::caution Zapier onayı bekleniyor
B1.church uygulaması hazır ve çalışır durumda, ancak Zap düzenleyicisinin uygulama dizininde herkese açık olarak görünmeden önce Zapier'ın incelemesini bekliyor. Onaylanana kadar yalnızca davet edilen hesaplar bu uygulamayı kullanabilir. Aşağıdaki her şey onaylandıktan sonra nasıl çalışacağını anlatır.
:::

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Bir [Zapier](https://zapier.com) hesabı (ücretsiz plan, birkaç Zap için yeterlidir)
- B1Admin'de **Ayarları Düzenle** iznine sahip bir kilise yöneticisi (API anahtarı oluşturacaksınız)
- Ne yapmak istediğinize dair bir fikir, ör. "B1'de bir kişi eklendiğinde onu Mailchimp listeme ekle"

</div>

## Tetikleyiciler ve Eylemler

| Tür | Ne | B1 olayı / uç nokta |
|---|---|---|
| **Tetikleyici** | Yeni Kişi | `person.created` |
| **Tetikleyici** | Güncellenen Kişi | `person.updated` |
| **Tetikleyici** | Yeni Bağış | `donation.created` |
| **Tetikleyici** | Yeni Grup Üyesi | `group.member.added` |
| **Tetikleyici** | Yeni Form Gönderimi | `form.submission.created` |
| **Eylem** | Kişi Oluştur | yeni bir kişi ekler |
| **Eylem** | Bağış Ekle | bir bağışı kaydeder |
| **Eylem** | Grup Üyesi Ekle | bir kişiyi bir gruba ekler |
| **Eylem** | Kişi Bul | kişiyi kimlik, e-posta veya ada göre arar; eşleşen kimse yoksa görevi başarısız sayar |

Bunları Zapier'ın 7.000'den fazla desteklenen uygulamasıyla serbestçe birleştirebilirsiniz.

## Kurulum

### 1. B1 API anahtarı oluşturun

1. B1Admin'de **Ayarlar → Geliştirici → API Anahtarları** bölümüne gidin.
2. **Yeni API Anahtarı** düğmesine tıklayın, "Zapier" gibi bir ad verin ve Zap'in ihtiyaç duyduğu kapsamları (scope) seçin.
3. **Önemli:** Zapier tetikleyicileri, Zap açıldığında sizin adınıza bir webhook kaydeder. Bu işlem **`settings:write`** kapsamını gerektirir. Zap'lerinizden herhangi biri bir B1 tetikleyicisi kullanıyorsa `settings:write` kapsamını mutlaka ekleyin.
4. Eylemlerin ihtiyaç duyduğu kapsamları da verin. Örneğin "Bağış Ekle" eylemi `donations:write`, "Kişi Oluştur" eylemi ise `people:write` gerektirir.
5. Kaydedin. Tam `cak_…` anahtarı **yalnızca bir kez** gösterilir. Kopyalayın.

### 2. Zapier'ı B1'e bağlayın

1. Zapier'da yeni bir Zap oluşturun.
2. İlk kez bir B1 tetikleyicisi veya eylemi seçtiğinizde Zapier sizden **B1.church'e giriş yapmanızı** ister.
3. 1. adımdaki API anahtarını yapıştırın ve **Evet, Devam Et** düğmesine tıklayın. Zapier anahtarı kilisenizle doğrular.

Bağlantı Zapier'da kaydedilir ve hesabınızdaki her Zap tarafından yeniden kullanılır.

### 3. Zap'i oluşturun

Bir tetikleyici seçin, ardından bir veya daha fazla eylem adımı ekleyin. Aşağıda örnekler var.

## Yaygın Tarifler

### Yeni B1 kişilerini Mailchimp'e ekleyin

- **Tetikleyici** — B1: Yeni Kişi
- **Eylem** — Mailchimp: Abone Ekle/Güncelle. B1'in `name__first`, `name__last`, `contactInfo__email` alanlarını Mailchimp'in Ad / Soyad / E-posta alanlarına eşleyin.

### Bağışları, yerleşik bağlayıcının yapamadığı daha zengin bir kartla Slack kanalına gönderin

- **Tetikleyici** — B1: Yeni Bağış
- **Eylem** — Slack: Kanala Mesaj Gönder. Düğmeler, ekler vb. istediğiniz düzeni oluşturun. Bunları [Slack bağlayıcısı](./slack-discord) yapamaz.

### Yeni grup üyelerini bir Google Grubu'na ekleyin

- **Tetikleyici** — B1: Yeni Grup Üyesi (belirli bir `groupId` ile filtrelenmiş)
- **Eylem** — Zapier ile filtrele: yalnızca ilgilendiğiniz B1 grubuysa devam et
- **Eylem** — B1: Kişi Bul (e-postayı almak için tetikleyicinin `personId` değerini kullanın)
- **Eylem** — Google Groups: Üye Ekle

### Form gönderimlerini bir proje takip aracına iletin

- **Tetikleyici** — B1: Yeni Form Gönderimi
- **Eylem** — Notion / Linear / Asana / Trello: Sayfa / sorun / görev oluştur

## Tetikleyiciler Perde Arkasında Nasıl Çalışır

Tetikleyiciler **REST hook**'tur, yoklama (polling) yöntemi değildir. Zapier, B1'i her 15 dakikada bir sorgulamaz. Zap'i açtığınızda Zapier, B1'den özel bir Zapier URL'sine işaret eden bir webhook kaydetmesini ister. Olay gerçekleştiğinde B1, veriyi Zapier'a POST eder ve Zap'iniz **birkaç saniye içinde** başlar. Zap'i kapattığınızda Zapier, B1'den webhook'u silmesini ister. Böylece yetim abonelik kalmaz.

Bu, tetikleyicinin yalnızca Zap açıldıktan **sonra** gerçekleşen olaylarda çalıştığı anlamına gelir. Geriye dönük veri aktarımı yoktur. Zap'i açmak dünkü bağışları yeniden işlemez.

## Sınırlar ve Notlar

- **Aynı tetikleyiciyi kullanan birden fazla Zap**, her biri kendi B1 webhook'unu kaydeder. Bu bir çakışma yaratmaz, ancak **Ayarlar → Geliştirici → Webhook'lar** bölümünü incelerken üç adet aynı "Zapier — donation.created" satırı görmeniz durumunda bilmeniz faydalı olur.
- **Zap kurulumunda test verisi.** Bir Zap oluştururken Zapier alanları eşlemek için örnek veri ister. Eşleşen en son olay B1'de varsa onu çeker. Yoksa uygulama tanımındaki yapay bir örneği kullanır.
- **Eylem hataları Zap hataları olarak görünür.** Zapier'ın görev geçmişinde bunlar görünür. Yaygın neden, doğru kapsamı olmayan bir API anahtarıdır. Örneğin "Bağış Ekle" eylemi `donations:write` gerektirir. Anahtarı doğru kapsamlarla yeniden oluşturun ve Zapier'da yeniden bağlanın.
- **Giden API çağrısı kotaları.** Bir eylemden yapılan her B1 API çağrısı, B1 tarafında herhangi bir şeye değil, Zapier görev kotanıza sayılır.

## Sorun Giderme

- **Bağlanırken "Kimlik doğrulama başarısız"** — API anahtarı yanlış, iptal edilmiş veya Zap'in ihtiyaç duyduğu kapsamlardan yoksun. B1Admin'de en az `settings:write` ve Zap'in dokunduğu kaynak kapsamlarıyla anahtarı yeniden oluşturun, ardından bağlantıyı güncelleyin.
- **Tetikleyici hiç çalışmıyor** — webhook'un gerçekten kaydedildiğini doğrulayın. B1Admin'de **Ayarlar → Geliştirici → Webhook'lar** bölümünde "Zapier — &lt;olay&gt;" adlı bir satır görünmelidir. Yoksa Zap'i açtığınızda API anahtarında muhtemelen `settings:write` kapsamı yoktu. Anahtarı düzeltin, Zap'i kapatıp yeniden açın.
- **Tetikleyici iki kez çalışıyor** — Zapier, onay yanıtı kaybolursa bazen olayı yeniden iletir. Kesin tekilleştirme gerekiyorsa benzersiz bir kimlik (ör. kişinin `id` değeri) üzerinde bir "Zapier ile filtrele" adımı kullanın.

## Ayrıca Bakınız

- [Make](./make) — aynı desen, farklı platform
- [Slack & Discord](./slack-discord) — Zapier olmadan daha basit sohbet bildirimleri
- [Webhook'lar (geliştirici başvuru kılavuzu)](/docs/developer/api/webhooks)
