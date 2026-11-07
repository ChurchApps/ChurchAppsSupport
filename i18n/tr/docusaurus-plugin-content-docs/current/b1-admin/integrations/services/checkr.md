---
title: "Checkr"
description: "Gönüllü kayıtlarını Make.com ile Checkr arka plan kontrollerine bağlayın; güvenli hizmet koordinatörünüz için isteğe bağlı rapor durumu uyarıları."
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com), çocuk ve gençlik programı yürüten her kilisenin neredeyse evrensel olarak ihtiyaç duyduğu, personel ve gönüllüler için arka plan taraması hizmeti sunar. B1'de **yerleşik bir arka plan kontrolü özelliği yoktur**. Kontrol sipariş etme, sonuçları takip etme ve tarama uyumluluğu tamamen Checkr'da yürütülür. Aşağıdaki tarif yalnızca B1 olaylarını Checkr'a bağlar. Checkr'ın bir Zapier uygulaması yoktur, ancak [Make.com'un Checkr entegrasyonu](https://www.make.com/en/integrations/checkr) doğrulanmıştır ve bir B1 olayından kontrol başlatmak için ihtiyacınız olan eylemleri sunar.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- API erişimi olan ve en az bir tarama paketi yapılandırılmış bir [Checkr](https://checkr.com) hesabı
- Bir [Make](https://www.make.com) hesabı
- **Ayarları Düzenle** iznine sahip bir B1Admin kullanıcısı

</div>

## Neler Bağlanabilir

Make'in Checkr uygulaması 1 tetikleyici ve 6 eylem sunar:

| Yön | B1 / Make tetikleyicisi | Eylem |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (bir gönüllü grubuyla filtrelenmiş) | Checkr: Create Candidate → Create Background Check Invitation |
| Checkr → B1 | Checkr webhook'u (davet / rapor olayı) | B1: Kişinin kaydını güncelleyin (ör. “Checkr temiz” etiketi ekleyin) |

Make'in Checkr eylemleri: Create Candidate, Create Background Check Invitation, Get Candidate, Get Report, Get Report's ETA, Get an Invitation. Ayrıca 4 arama modülü bulunur.

## Kurulum

### 1. Bir B1 API anahtarı oluşturun

**Ayarlar → Geliştirici → API Anahtarları → Yeni API Anahtarı**:

- `settings:write`: tetikleyici webhook'u için
- `people:read`: tarama başlatırken kişinin adını ve e-postasını aramak için
- (İsteğe bağlı) Rapor durumunu özel alan veya etiket olarak geri yazmak isterseniz `people:write`

### 2. Make'te "Gönüllü kaydında kontrol başlat" senaryosunu oluşturun

1. **Tetikleyici**: B1.church: Watch Events (`group.member.added`).
2. **Filtre**: Yalnızca `data.groupId` değeri "Çocuk Gönüllüleri" (veya eşdeğer) grubunuzla eşleşiyorsa devam edin.
3. **Eylem**: E-posta ile ad ve soyadı almak için B1.church: Find Person (`data.personId` ile) eylemini kullanın.
4. **Eylem**: Checkr: Create Candidate. Ad, soyad ve e-postayı 3. adımdan eşleyin.
5. **Eylem**: Checkr: Create Background Check Invitation. 4. adımda oluşturulan aday kimliğini *candidate_id* alanına eşleyin. Tarama paketini seçin (ör. `tasker_standard` veya hesabınızın sunduğu başka bir paket).
6. (İsteğe bağlı) **Eylem**: Slack: Güvenli hizmet koordinatörünüze bir kontrolün başlatıldığını bildirin.

Senaryoyu açın. Hedeflenen gruptaki yeni gönüllüler e-posta yoluyla otomatik bir Checkr daveti alır. Bunu telefonlarında veya dizüstü bilgisayarlarında tamamlarlar ve Checkr taramayı çalıştırır.

### 3. (İsteğe bağlı) Raporu geri alın

1. **Tetikleyici**: Checkr: Watch Events (webhook). Make, etkinleştirildiğinde bir Checkr webhook'u kaydeder.
2. **Filtre**: Yalnızca `event_type = report.completed` ise devam edin.
3. **Eylem**: Checkr: Get Report (webhook'taki rapor kimliğini kullanarak).
4. **Eylem**: B1.church: Find Person (aday e-postasıyla).
5. **Eylem**: Koşullu Slack / E-posta: Koordinatöre `clear` / `consider` / `suspended` durumuyla bildirim gönderin.

Not: B1'de bugün yerleşik bir "arka plan kontrolü durumu" alanı yok. Pratik seçenekler şunlardır: (a) sonucu inceleme için özel bir Slack kanalına göndermek, (b) denetim için bir Google E-Tablolar dosyasına yazmak veya (c) `clear` durumunda kişiyi bir “Onaylı gönüllüler” B1 grubuna eklemek.

## Yaygın Tarifler

### Gönüllüleri her 2 yılda bir yeniden tarayın

Yukarıdakileri bir Make zamanlama tetikleyicisiyle eşleştirin:

- **Tetikleyici**: Make: Schedule (aylık)
- **Eylem**: "Onaylı gönüllüler" için B1.church: List Group Members
- **Eylem**: Make ile filtre: onaylanma tarihi 22 aydan eski olanlar
- **Eylem**: Checkr: Create Background Check Invitation (ilk akışla aynı)

### Kontrol tamamlanana kadar 1. aşama erişimini engelleyin

Kiliseniz erişimi kontrol etmek için B1 grup üyeliğini kullanıyorsa (ör. hizmet çizelgelerinde yalnızca “Onaylı” grup üyeleri görünüyorsa), Checkr `report.completed` olayı onları değiştirene kadar yeni gönüllüleri bir bekleme grubunda tutun.

## Sınırlamalar ve Notlar

- **Checkr, çoğu tarama paketi için yalnızca ABD'de kullanılabilir.** Avustralya, Birleşik Krallık ve Kanada'daki kiliselerin alternatif bir çözüme ihtiyacı olacaktır.
- **Fiyatlandırma** kontrol başınadır. Make'teki her davet oluşturma işlemi gerçek bir kontrol harcar. Önce Checkr'ın sandbox/test hesabında deneyin. Make'in Checkr uygulaması bağlantıda girdiğiniz kimlik bilgilerini kullanır, dolayısıyla kimlik bilgilerini değiştirmek sandbox ile canlı ortam arasında geçiş yapar.
- **Checkr API erişimi plana bağlıdır.** Daha küçük Checkr hesapları yalnızca arayüz kademesinde olabilir. API'yi etkinleştirmek için Checkr ile iletişime geçin.

## Sorun Giderme

- **Create Candidate `403` hatasıyla başarısız oluyor**: Checkr API belirteci salt okunur olabilir veya uygun hesap izinlerinden yoksun olabilir. Checkr panelinden yazma kapsamıyla yeniden oluşturun.
- **Davet hiç ulaşmıyor**: 3. adımdaki adayın e-postasını kontrol edin. B1, bu kişi için boş bir e-posta alanına sahip olabilir. Checkr adımından önce e-posta zorunluluğu filtresi ekleyin.
- **Webhook tetikleyicisi çalışmıyor**: Make hesabınız giden webhook'ları destekleyen ücretli bir planda değilse Checkr'ın webhook kaydı bazen sessizce başarısız olabilir. Checkr panelindeki *Webhooks* sayfasında Make'in URL'sinin listelendiğini doğrulayın.

## Ayrıca Bakınız

- [Make (genel bakış)](../make.md): Her Make senaryosunun B1 tarafı
- [Mobile Message](./mobile-message.md): Zapier uygulaması olmayan SMS sağlayıcıları için; Checkr Make bağlantısıyla aynı Webhook/HTTP yapısını kullanır
- [Checkr API belgeleri](https://docs.checkr.com/)
