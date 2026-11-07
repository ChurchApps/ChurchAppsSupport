---
title: "Text In Church"
description: "B1 Admin ile Text In Church'ü Zapier ile birbirine bağlayın: API anahtarı oluşturun, bağlantı kartından B1'e bir Zap kurun ve grup üyeliğini yansıtın."
---

# Text In Church

<div class="article-intro">

[Text In Church](https://textinchurch.com), SMS ile birlikte sürükle-bırak iş akışlarını ve bağlantı kartı otomasyonlarını bir araya getirir. Zapier uygulaması iki yönlü çalışır: B1 olaylarını bir Text In Church iş akışına aktarabilir, bağlantı kartı veya yeni kişi tetikleyicilerini ise B1'e geri gönderebilirsiniz.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Zapier entegrasyonunu içeren bir plana sahip bir [Text In Church](https://textinchurch.com) hesabı
- Bir [Zapier](https://zapier.com) hesabı
- **Edit Settings** iznine sahip bir B1Admin kullanıcısı

</div>

## Neler Bağlayabilirsiniz

| Yön | Tetikleyici | Eylem |
|---|---|---|
| B1 → Text In Church | B1 `person.created` | Kişi Oluştur/Güncelle + Gruba Ekle |
| B1 → Text In Church | B1 `form.submission.created` | İlgili ekip üzerinden metin mesajı gönder |
| B1 → Text In Church | B1 `group.member.added` | Gruba Ekle (grup üyeliğini yansıt) |
| Text In Church → B1 | Connect Card Submitted | B1: Kişi Oluştur + Grup Üyesi Ekle |
| Text In Church → B1 | Person Created | B1: Kişi Oluştur |
| Text In Church → B1 | Person Joined Group | B1: Grup Üyesi Ekle |

Text In Church eylemleri arasında *Send Text Message*, *Send Voice Broadcast*, *Create Task*, *Find Person/Group* ve grup üyeliği ekleme/çıkarma da bulunur.

## Kurulum

### 1. Bir B1 API anahtarı oluşturun

**Settings → Developer → API Keys → New API Key** yolunu izleyin:

- `settings:write`: B1 tetikleyicili Zap'ler için gereklidir
- `people:read`, `people:write`: kişiyi bulmak veya oluşturmak için
- `groups:write`: grup senkronizasyonu için
- (İsteğe bağlı) Bağış onaylarını TIC'e bağlarsanız `donations:write`

### 2. Text In Church'ü Zapier'a bağlayın

[Text In Church'ün Zapier entegrasyon kılavuzunu](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration) izleyin. Bu adımda TIC panelinden bir API jetonu oluşturulur.

### 3. Bağlantı kartından B1'e Zap'ini oluşturun

En yaygın yön budur. TIC üzerinden gönderilen bağlantı kartları otomatik olarak yeni B1 kişileri haline gelir.

1. **Tetikleyici**: Text In Church: Connect Card Submitted.
2. **Eylem**: B1.church: Find Person (e-posta ile).
3. **Yol**: bulunan / bulunamayan durumuna göre dallandırın:
   - Bulunamadı → B1.church: Create Person.
   - Bulundu → devam edin.
4. **Eylem**: B1.church: "New Contact" grubuna Add Group Member.

Zap'i açın. TIC üzerinden gönderilen bir sonraki bağlantı kartı otomatik olarak **B1Admin → People** bölümüne düşer.

## Yaygın Tarifler

### B1 formundan bağlantı kartı tarzı bir iş akışını tetikleyin

- **Tetikleyici**: B1.church: New Form Submission ("I'm new here" formunun kimliğine göre filtreleyin)
- **Eylem**: Text In Church: Create/Update Person; formun e-posta, telefon ve ad yanıtlarını eşleştirin
- **Eylem**: Text In Church: Add to Group; grubun önceden hazırlanmış bir karşılama iş akışı olmalıdır

### Grup üyeliğini yansıtın

- **Tetikleyici**: B1.church: New Group Member, belirli bir `groupId` değerine göre filtrelenmiş
- **Eylem**: Text In Church: Add to Group (aynı kişi, yansıtılmış grup). Tam senkronizasyon istiyorsanız bunu bir `group.member.removed` Zap'iyle eşleştirin.

### Biri katıldığında bir lideri bilgilendirin

- **Tetikleyici**: B1.church: New Group Member
- **Eylem**: Text In Church: Send Text Message; alıcı grup liderinin telefonu, içerik ise `"{first} {last} just joined {group}"` olsun.

## Sınırlamalar ve Notlar

- **TIC'in Zapier uygulaması plan seviyesine bağlıdır.** Zapier entegrasyonu TIC panelinde soluk görünüyorsa, planınızda etkinleştirilmesi için TIC desteğiyle iletişime geçin.
- **Grup kimlikleri TIC'e aittir, B1'e değil.** Yansıtma yaparken bir eşleme tablosu tutmanız gerekir (Zapier *Lookup Table* veya Zap başına sabit kodlama).
- **Send Text Message kredi harcar.** *Send Text* eylemini tetikleyen her Zap, TIC SMS kotanızdan düşer.

## Sorun Giderme

- **Connect-Card tetikleyicisi çalışmıyor**: TIC'te Zapier entegrasyon anahtarının açık olması gerekir. Ayrıca test ettiğiniz formun genel bir anket değil, "Connect Card" olarak yapılandırıldığını doğrulayın.
- **B1'de Create Person 401 hatası veriyor**: API anahtarı yanlış, iptal edilmiş veya `people:write` izni eksik. Yeni bir anahtar oluşturun.
- **B1'de yinelenen kişiler**: TIC, aynı olay için hem *Person Created* hem de *Connect Card Submitted* gönderir. Birini gerçek kaynak olarak seçin ve diğerine bir Zapier Filter ekleyin.

## Ayrıca Bakınız

- [Clearstream](./clearstream.md): benzer Zapier yapısına sahip alternatif bir SMS platformu
- [Zapier (genel bakış)](../zapier.md): her Zapier tarifinin B1 tarafı
- [Text In Church Zapier kılavuzu](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration) (TIC belgeleri)
