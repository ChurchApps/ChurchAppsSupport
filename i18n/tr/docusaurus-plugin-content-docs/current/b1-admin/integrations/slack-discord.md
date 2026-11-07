---
title: "Slack ve Discord"
description: "B1 Admin etkinliklerini (yeni kişiler, bağışlar, form gönderimleri) gelen webhook ile Slack veya Discord kanalına gönderin; Zapier gerekmez."
---

# Slack ve Discord

<div class="article-intro">

B1'den yeni kayıtlar, bağışlar, grup kayıtları, form gönderimleri, takvim etkinlikleri ve daha fazlası için okunabilir bildirimleri doğrudan bir Slack veya Discord kanalına gönderin. Üçüncü taraf hesabına ihtiyaç yok, bakımını yapmanız gereken bir Zap de yok. B1 olayları sohbet mesajlarına dönüştürür ve bunları kanalın webhook URL'sine kendisi gönderir.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- B1Admin'de **Ayarları Düzenle** iznine ihtiyacınız var
- Kanalın Gelen Webhook'unu oluşturmak için Slack çalışma alanınızda veya Discord sunucunuzda bir yöneticinin yardımı gerekir
- Hangi kanala bildirim almak istediğinize karar verin (aynı kanalı birden fazla olay türü için kullanabilir veya olayları farklı kanallara ayırabilirsiniz)

</div>

## Nasıl Çalışır

B1'de sohbet platformları için yerleşik bir **Bağlayıcı Türü** bulunur. **Slack** veya **Discord** türünde bir webhook oluşturduğunuzda, webhook motoru yine her zamanki teslimat, yeniden deneme ve imzalı başlık işlemlerini yapar. Ancak gönderilen gövde, B1'in normal `{event,churchId,data}` zarfından, bu hizmetlerin beklediği küçük `{text}` (Slack) veya `{content}` (Discord) mesajına dönüştürülür.

Mevcut giden webhook akışı dışında B1 sunucuları kilise bazında Slack'e bağlanmaz. Yeni bir şey barındırmanız veya ek bir ücret ödemeniz gerekmez.

## Slack: Adım Adım

### 1. Slack Gelen Webhook URL'si Alın

1. Bildirim almak istediğiniz Slack çalışma alanında [api.slack.com/apps](https://api.slack.com/apps) adresini açın.
2. **Create New App → From scratch** seçeneğine tıklayın, uygulamaya "B1 Bildirimleri" gibi bir ad verin ve çalışma alanını seçin.
3. Sol menüden **Incoming Webhooks** seçeneğini seçin ve **Activate Incoming Webhooks** anahtarını *On* konumuna getirin.
4. **Add New Webhook to Workspace** seçeneğine tıklayın, kanalı seçin (örneğin `#donations`), ardından **Allow** düğmesine basın.
5. Slack sizi, `https://hooks.slack.com/services/T0XXXXXXX/B0YYYYYYY/zzz…` gibi görünen yeni bir **Webhook URL** ile sayfaya geri döndürür. Bunu kopyalayın. B1'in ihtiyaç duyduğu tek bilgi budur.

:::caution
Slack webhook URL'sini gizli bir bilgi gibi koruyun. Bu URL'ye sahip herkes kanala istediği mesajı gönderebilir. Yanlışlıkla ifşa ederseniz, Slack uygulama sayfasından yeniden oluşturun. Yeniden oluşturma yalnızca URL'yi değiştirir, bu yüzden B1'deki URL'yi de güncellemeniz gerekir.
:::

### 2. B1Admin'de Bağlayın

1. B1Admin'de **Ayarlar → Geliştirici → Webhook'lar** bölümüne gidin.
2. **Yeni Webhook** düğmesine tıklayın.
3. Şu alanları doldurun:
   - **Ad**: "Bağışlar → #donations" gibi okunabilir bir ad. Yalnızca ekibiniz bu adı görür.
   - **Bağlayıcı Türü**: **Slack** seçin.
   - **Payload URL**: 1. adımdaki Slack URL'sini yapıştırın.
   - **Olaylar**: Mesaj olarak almak istediğiniz olayları işaretleyin. Bağışlar kanalı için yalnızca `donation.created` seçin. #people kanalı için `person.created` ve `group.member.added` seçmeyi deneyin.
4. **Kaydet** düğmesine tıklayın. "Signing Secret" penceresi açılır. Slack, B1 imzalarını doğrulamadığı için bu pencereyi yok sayabilir ve kapatabilirsiniz.

### 3. Test Edin

Webhook'u listeden yeniden açın ve **Send Test Event** düğmesine tıklayın. Bir veya iki saniye içinde şuna benzer bir mesaj

> 💝 Yeni bağış: 50,00 $

Slack kanalınızda görünür. Aynı ekranda **Recent Deliveries** tablosunda da `succeeded` durumuyla yeni bir satır belirir. İşlem tamam.

## Discord: Adım Adım

### 1. Discord Webhook URL'si Alın

1. Discord sunucunuzda bildirim almak istediğiniz kanalın üzerine gelin ve **⚙ dişli** simgesine (Kanalı Düzenle) tıklayın.
2. **Integrations → Webhooks → New Webhook** yolunu izleyin.
3. Bir ad ve isteğe bağlı olarak bir avatar verin, ardından **Copy Webhook URL** düğmesine tıklayın. URL şuna benzer: `https://discord.com/api/webhooks/123…/abc…`.

### 2. B1Admin'de Bağlayın

**Bağlayıcı Türü** olarak **Discord** seçmeniz dışında, yukarıdaki Slack akışıyla aynıdır. Discord URL'sini **Payload URL** alanına yapıştırıp kaydedin.

:::tip
Discord URL'sinin sonuna `/slack` eklemeniz **gerekmez**. B1, Slack ile uyumlu yükler yerine Discord'a özgü `{content}` yükleri gönderir. Discord'un verdiği URL'yi olduğu gibi yapıştırmanız yeterlidir.
:::

### 3. Test Edin

Aynı **Send Test Event** düğmesini kullanın. Discord mesajı seçtiğiniz kanalda gösterir ve teslimat günlüğü `succeeded` durumuna geçer.

## Mesajlar Nasıl Görünür

| Olay | Örnek mesaj |
|---|---|
| `person.created` | 👤 Yeni kişi eklendi: Jordan Rivera |
| `person.updated` | 👤 Kişi güncellendi: Jordan Rivera |
| `group.created` | 👥 Yeni grup oluşturuldu: Salı Günü İncil Çalışması |
| `group.member.added` | ➕ Bir kişi gruba eklendi |
| `donation.created` | 💝 Yeni bağış: 50,00 $ |
| `donation.updated` | 💝 Bağış güncellendi: 75,00 $ |
| `attendance.recorded` | ✅ Katılım kaydedildi |
| `form.submission.created` | 📝 Yeni form gönderimi alındı |
| `event.created` | 📅 Yeni etkinlik: Paskalya Ayini |

Tam liste [webhook olay kataloğunda](/docs/developer/api/webhooks#event-catalog) bulunur. Bu kataloğdaki her olay Slack veya Discord'a yönlendirilebilir.

## Konu Başına Bir Kanal

Tüm olayları tek bir yerde toplamak zorunda değilsiniz. Çoğu kilise birkaç webhook kurar:

- Yalnızca `donation.created` olayını dinleyen bir **#donations** kanalı
- `person.created` ve `group.member.added` için bir **#new-people** kanalı
- `form.submission.created` gibi düşük hacimli olaylar için bir **#admin-alerts** kanalı

Kilise başına webhook sayısında bir sınır yoktur. Her webhook bağımsızdır. Birini silmek veya devre dışı bırakmak diğerlerini etkilemez.

## Teslimatları İnceleme

Webhook düzenleyicisindeki **Recent Deliveries** tablosu son 50 denemeyi gösterir. Bir satıra tıklayarak gönderilen tam yükü ve dönen yanıtı görebilirsiniz. Slack bağlayıcısı için yük, ham `{event,churchId,...}` zarfı yerine `{"text":"💝 Yeni bağış: 50,00 $"}` şeklindedir. Çünkü B1 teslimattan önce bu zarfı yeniden biçimlendirir.

Bir teslimat başarısız olursa (kırmızı `failed` veya `exhausted` rozeti), pencere HTTP durum kodunu ve yanıt gövdesini gösterir. Böylece Slack veya Discord'un neyi kabul etmediğini tam olarak görebilirsiniz. Genellikle sorun URL'nin yanlış kopyalanmasıdır.

## Sorun Giderme

- **Mesaj görünmüyor ve teslimat durumu `400`** — genellikle Bağlayıcı Türü **Standard** olarak ayarlanmıştır, ancak URL bir Slack veya Discord URL'sidir. Slack ve Discord ham zarfı reddeder. Açılır menüden **Slack** veya **Discord** seçeneğini seçin ve test isteğini yeniden gönderin.
- **Webhook otomatik olarak devre dışı kaldı**: 3 ardışık başarısız teslimattan sonra B1 webhook'u kapatır. URL'yi düzeltin (veya Slack/Discord'da yeniden oluşturun) ve **Active** seçeneğini yeniden açın.
- **Mesaj geldi ama ayrıntılar eksik**: Her sohbet platformunun mesaj boyutu sınırı vardır. B1 mesajları tasarım gereği tek satırlıktır. Daha zengin bildirimler için, Slack eylemlerini kullanarak daha kapsamlı bir Slack mesajı oluşturmak üzere [Zapier](./zapier.md) veya [Make](./make.md) kullanın.

## Daha Sonra Bağlayıcı Türünü Değiştirme

Mevcut bir webhook'un Bağlayıcı Türünü değiştirebilirsiniz. Değişiklik bir sonraki teslimattan itibaren geçerli olur. Slack'ten Standard'a geçerseniz, URL'yi kendi HTTPS uç noktanıza yönlendirin. Webhook oluşturulduğunda verilen aynı imzalama sırrı, ham zarf olarak doğrulanabilir hale gelir.

## Ayrıca Bakın

- [Zapier](./zapier.md): B1 olaylarıyla tetiklenen çok adımlı iş akışları için
- [Make](./make.md): görsel senaryo oluşturucu
- [Webhook'lar (geliştirici başvurusu)](/docs/developer/api/webhooks): bir webhook'u kendi sunucunuza yönlendirirseniz tam yük ve imza biçimi için
