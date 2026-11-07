---
title: "Mobile Message"
description: "Avustralyalı SMS API'si Mobile Message'ı B1 Admin etkinliklerine Zapier veya Make webhook'larıyla bağlayarak karşılama, bağış ve hatırlatma SMS'leri gönderin."
---

# Mobile Message

<div class="article-intro">

[Mobile Message](https://mobilemessage.com.au), Avustralya merkezli bir SMS API hizmetidir. Clearstream ve Text In Church'ün ABD merkezli olmasına karşılık, yerel numaralar ve rekabetçi Avustralya fiyatlandırması sunduğu için Avustralyalı kiliseler arasında popülerdir. Mobile Message'ın bugün birinci sınıf bir Zapier uygulaması yoktur, ancak herkese açık bir REST API yayımlar. Bu sayede **Webhooks by Zapier** (veya Make'in HTTP modülü) üzerinden B1 olaylarını birkaç dakika içinde Mobile Message metin mesajlarına bağlayabilirsiniz.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Kayıtlı bir Gönderici Kimliği ve API kimlik bilgilerine (*Hesap → API Ayarları* altında API kullanıcı adı ve şifresi) sahip bir [Mobile Message](https://mobilemessage.com.au) hesabı
- Bir [Zapier](https://zapier.com) hesabı (veya [Make](https://www.make.com))
- **Ayarları Düzenle** yetkisine sahip bir B1Admin kullanıcısı

</div>

## Neler Bağlayabilirsiniz

Mobile Message'ın API'si "SMS gönder" yapısındadır. Tetikleyici yoktur, yalnızca giden mesajlar vardır. Bu nedenle tüm tarifler B1 → SMS yönündedir:

| Yön | B1 tetikleyicisi | Sonuç |
|---|---|---|
| B1 → Mobile Message | `person.created` | Yeni kişiye hoş geldiniz mesajı |
| B1 → Mobile Message | `donation.created` | Bağışçıya teşekkür mesajı |
| B1 → Mobile Message | `form.submission.created` | Nöbetteki ekibe çağrı |
| B1 → Mobile Message | `event.created` | Bir listeye toplu hatırlatma |

## Kurulum

### 1. B1 API anahtarı oluşturun

**Ayarlar → Geliştirici → API Anahtarları → Yeni API Anahtarı**:

- `settings:write`: Tetikleyici webhook'un kaydolması için
- `people:read`: Alıcının telefon numarasını `personId` ile aramak için

### 2. Webhooks by Zapier ile Zap'i oluşturun

1. **Tetikleyici**: B1.church, istediğiniz olayı seçin (ör. Yeni Bağış).
2. **Eylem**: B1.church, Kişi Bul (`data.personId` kullanarak) ile telefon numarasını ve adı alın.
3. **Eylem**: Webhooks by Zapier, **POST**. Aşağıdaki gibi yapılandırın.

POST adımının ayarları:

- **URL**: `https://api.mobilemessage.com.au/v1/messages`
- **Payload Type**: JSON
- **Data**:
  ```json
  {
    "messages": [
      {
        "to": "{{step2_phone}}",
        "message": "Bağışınız için teşekkürler, {{step2_first_name}}!",
        "sender": "YourChurch"
      }
    ]
  }
  ```
- **Headers**: `Content-Type: application/json` (Webhooks by Zapier bunu otomatik ekler)
- **Basic Auth**: *Basic Auth* alanına `<api_username>|<api_password>` değerini girin (Zapier bunu doğru `Authorization: Basic …` başlığına dönüştürür)

Zap'i açın. Bir mesajın ulaştığını doğrulamak için B1Admin'de test bağışı gönderin.

## Yaygın Tarifler

### Sabah etkinlik hatırlatmaları

- **Tetikleyici**: Schedule by Zapier (her gün, sabah 7)
- **Eylem**: B1.church, bugünkü etkinlikleri bul (veya sabit bir tarih filtresiyle Bul adımı kullanın ya da bugünkü etkinlik listesini bir Google E-Tablolar dosyasında saklayın)
- **Eylem**: Webhooks by Zapier, etkinlik listesiyle birlikte kayıtlı bir abone grubuna Mobile Message'a POST gönderin

### Liste yayını için toplu uç noktayı kullanın

Mobile Message'ın `/v1/messages` uç noktası, çağrı başına en fazla 10.000 mesaj kabul eder. Bir B1 grubuna yayın yapmak için:

- **Tetikleyici**: B1.church, Yeni Form Gönderimi (belirli bir formla filtreleyin)
- **Eylem**: B1.church, hedef grup için Grup Üyelerini Listele (*Webhooks by Zapier: GET* adımı üzerinden, `/membership/groupmembers?groupId=…`)
- **Eylem**: Formatter by Zapier → Utilities, yanıtı bir `messages` dizisine satır satır dönüştürün
- **Eylem**: Webhooks by Zapier, tüm diziyi `/v1/messages` adresine POST edin

### Make alternatifi

Make'i tercih ederseniz, B1 Watch Events tetikleyicisinin ardına **HTTP — Make a request** modülünü ekleyin ve aynı şekilde yapılandırın (POST, Basic Auth, JSON gövde). B1 tarafı için [Make genel bakışına](../make.md) bakın.

## Sınırlamalar ve Notlar

- **Basic Auth tek kimlik doğrulama yöntemidir**: Mobile Message, kontrol panelinden bir kullanıcı adı ve şifre verir. İkisini de gizli bilgi olarak değerlendirin.
- **`sender`, Mobile Message hesabınızda kayıtlı bir Gönderici Kimliği olmalıdır**, aksi halde gönderim `400 Invalid sender` ile sonuçlanır. Avustralya düzenlemeleri gönderici kaydını zorunlu kılar.
- **Avustralya telefon numaraları** `0412345678` (yerel) veya `+61412345678` (uluslararası) biçiminde olabilir. API ikisini de kabul eder, ancak yurt dışına da gönderim yapıyorsanız `+61…` biçimine normalleştirin.
- **İstek başına en fazla 10.000 mesaj**: Yayınlar için kullanışlıdır, ancak tek bir B1 webhook teslimatı nadiren bu kadar büyük bir liste üretir. Toplu uç noktayı zamanlanmış toplu Zap'ler için saklayın.

## Sorun Giderme

- **POST `401 Unauthorized` döndürüyor**: Basic Auth kimlik bilgileri yanlış. Mobile Message kontrol panelindeki *Hesap → API Ayarları* bölümünden yeniden kopyalayın. Kullanıcı adının varsayılan olarak ayrı bir API anahtarı değil, hesap e-posta adresiniz olduğunu unutmayın.
- **POST `400 Invalid sender` döndürüyor**: `sender` değeri hesabınızda kayıtlı bir Gönderici Kimliği değil. Önce Mobile Message kontrol panelinde kaydedin.
- **Mesaj ulaşıyor ama kesik görünüyor**: Mobile Message, yaklaşık 160 karakteri aşan mesajları birden fazla parçaya böler ve her parça için ücret alınır. Parça sayısını yanıt gövdesinden kontrol edin.

## Ayrıca Bakınız

- [Clearstream](./clearstream.md), [Text In Church](./text-in-church.md): Yerel Zapier uygulamaları olan alternatif SMS sağlayıcıları (Webhooks by Zapier adımı gerekmez)
- [Zapier (genel bakış)](../zapier.md): Her Zapier tarifinin B1 tarafı
- [Mobile Message API belgeleri](https://mobilemessage.com.au/api-documentation)
