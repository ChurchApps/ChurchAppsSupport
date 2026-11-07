---
title: "Entegrasyonlar"
description: "B1 Admin'i Slack, Discord, Zapier, Make, Google Sheets ve Claude gibi AI asistanlarına bağlayın; kurulum adımları ve gereken API anahtarı kapsamlarıyla."
---

# Entegrasyonlar

<div class="article-intro">

B1, ekibinizin zaten kullandığı araçlarla bağlanır. Personel bildirimleri için Slack veya Discord'a bağlanabilir, Zapier veya Make ile iş akışlarını otomatikleştirebilir ya da verileri istediğiniz zaman Google Sheets'e aktarabilirsiniz — ayrı bir entegrasyon platformuna ödeme yapmadan ve ChurchApps'in ek bir şey barındırmasına gerek kalmadan. Her entegrasyon üçüncü tarafın kendi altyapısında çalışır ve kilisenizle B1'in webhook'ları veya REST API'si üzerinden iletişim kurar.

</div>

## Mevcut Entegrasyonlar

| Entegrasyon | Ne yapar | Yön | Kurulum çabası |
|---|---|---|---|
| **[Slack](./slack-discord.md)** | Yeni kişiler, bağışlar, kayıtlar gibi okunabilir bildirimleri bir Slack kanalına gönderir | B1 → Slack | 2 dakika |
| **[Discord](./slack-discord.md)** | Aynısını bir Discord kanalında yapar | B1 → Discord | 2 dakika |
| **[Zapier](./zapier.md)** | B1 olaylarını tetikleyici olarak, B1 eylemlerini Zapier'in 7.000'den fazla uygulamasından herhangi birinde kullanır | Her iki yön | Zap başına 5–10 dk |
| **[Make](./make.md)** | Zapier ile aynı mantık, Make'in görsel senaryo oluşturucusunda | Her iki yön | Senaryo başına 5–10 dk |
| **[Google Sheets](./google-sheets.md)** | Kişiler / Bağışlar / Gruplar / Katılım verilerini istediğiniz zaman bir elektronik tabloya aktarır | B1 → Tablo | 5 dakika |
| **[Claude](./claude.md)** | Anthropic'in Claude'una kilise verileriniz hakkında soru sorun; yetkilerinize göre sınırlandırılır — denemesi ücretsiz, önerilir | Her iki yön | 3 dakikadan az |
| **[ChatGPT](./chatgpt.md)** | OpenAI'nin ChatGPT'si ile aynı mantık (ücretli bir ChatGPT planı gerekir) | Her iki yön | 10 dakika |
| **[Bağlı hizmetler](./services/index.md)** | Mailchimp, Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr için hazır tarifler | Değişken | Her biri 5–10 dk |

## Nasıl Seçilir

- **Sohbette yalnızca bir bildirim mi istiyorsunuz?** **Slack** veya **Discord** kullanın — üçüncü taraf hesabı yok, bakımını yapmanız gereken bir Zap yok. Tamamen B1Admin içinden yapılandırılır.
- **Uygulamalar arasında bir şeyi otomatikleştirmek mi istiyorsunuz** (ör. "biri bağış yaptığında, onu Mailchimp listeme ve Slack #bağışlar kanalına ekle")? **Zapier** veya **Make** kullanın. Zapier daha kolay kullanımlıdır; Make ölçek büyüdükçe daha ucuzdur ve daha esnek mantık sunar.
- **Tek seferlik bir veri çekme veya planlanmış bir rapor mu gerekiyor?** **Google Sheets** kullanın — eklentinin kenar çubuğuna bir API anahtarı yapıştırın ve Dışa Aktar'a tıklayın.
- **Düz bir dille soru sormak mı istiyorsunuz** ("geçen Pazar kaç ilk kez gelen ziyaretçi vardı?", "bu ayki bağışları özetle")? **[Claude](./claude.md)** ile başlayın — denemesi ücretsizdir ve 3 dakikadan kısa sürede kurulur. **[ChatGPT](./chatgpt.md)** de ücretli bir planla çalışır. Claude, B1 hesabınızla oturum açarak bağlanır; ChatGPT ise bir B1 API anahtarı kullanır.
- **Kendi özel entegrasyonunuzu mu geliştiriyorsunuz?** Yukarıdakilerin hiçbiri değil — [API anahtarı](/docs/developer/api/api-keys) ile doğrudan [REST API](/docs/developer/api) üzerinden çalışın veya kontrol ettiğiniz bir sunucuyu [webhook'lara](/docs/developer/api/webhooks) abone edin.

## Ortak Özellikler

Her entegrasyon, B1Admin içinde **Ayarlar → Geliştirici → API Anahtarları** altında oluşturulan bir **B1 API anahtarı** ile kimlik doğrular. Anahtar:

- Kilisenizdeki belirli bir kişiye bağlıdır ve o kişinin yetkilerini devralır
- **Kapsamlar** ile daraltılabilir — örneğin bir Google Sheets dışa aktarımı yalnızca `people:read` gerektirir, `settings:write` gerekmez
- İstediğiniz zaman iptal edilebilir; başka hiçbir şeyi etkilemeden entegrasyonun erişimini anında keser

Birkaç bağlayıcı (Zapier, Make), Zap veya senaryo açıldığında sizin adınıza bir [webhook](/docs/developer/api/webhooks) kaydeder ve Zap kapatıldığında bunu kaldırır — webhook URL'sini kendiniz yönetmezsiniz.

:::tip
Zapier ve Make'in webhook'ları otomatik olarak kaydedebilmesi için API anahtarının **`settings:write`** kapsamına (ve entegrasyonun dokunduğu kaynaklar için kaynak kapsamlarına) sahip olması gerekir. Salt okunur bir anahtar eylemler ve dışa aktarımlar için çalışır, ancak tetikleyiciler için çalışmaz.
:::

## Maliyet

ChurchApps ücretsiz ve açık kaynaklıdır. Slack/Discord, [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) ve resmi Zapier / Make / Google Sheets bağlayıcıları da bizim tarafımızdan ücretsizdir. Üçüncü taraflar kendi platformları için ücret alabilir (Zapier ve Make'in ikisinde de cömert ücretsiz katmanlar vardır; Slack, Discord ve Google Sheets bu amaç için ücretsizdir).

## Kendi Entegrasyonunuzu Oluşturmak

Yukarıdakilerin hiçbiri uymuyorsa, her B1 yüzeyi açıktır:

- **[REST API](/docs/developer/api)** — `Authorization: Bearer cak_…` başlığıyla herhangi bir dilden B1'i çağırın
- **[Webhook'lar](/docs/developer/api/webhooks)** — herkese açık bir HTTPS uç noktasını bir veya daha fazla olay türüne abone edin ve imzalı JSON yükleri alın
- **[OAuth + Bağlı Uygulamalar](/docs/developer/api/connected-apps)** — birçok kilise tarafından kullanılan bir SaaS ürünü geliştiriyorsanız

## Sonraki Adımlar

- [Slack & Discord](./slack-discord.md) — sohbet bildirimleri gönderin
- [Zapier](./zapier.md) — 7.000'den fazla uygulamaya bağlanın
- [Make](./make.md) — görsel iş akışı otomasyonu
- [Google Sheets](./google-sheets.md) — elektronik tablolara aktarın
- [Claude](./claude.md) — Anthropic'in Claude'una kilise verileriniz hakkında sorun
- [ChatGPT](./chatgpt.md) — OpenAI'nin ChatGPT'sine kilise verileriniz hakkında sorun
- [Bağlı hizmetler](./services/index.md) — hizmet başına hazır tarifler (Mailchimp, Donorbox, Clearstream, …)
