---
title: "Google Sheets"
---

# Google Sheets

<div class="article-intro">

**B1 Export**, B1.church için resmi Google Sheets eklentisidir. Herhangi bir e-tablonun kenar çubuğuna eklenir ve kilisenizin People, Donations, Groups veya Attendance verilerini adlandırılmış sekmelere, istediğiniz zaman tek tıklamayla aktarır. Eklenti tamamen kullanıcının Google hesabı içinde çalışır; her dışa aktarmanın yaptığı salt okunur API çağrıları dışında ChurchApps'in sunucularıyla hiçbir ilgisi yoktur.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Verileri aktarmak istediğiniz e-tabloya düzenleme erişimi olan bir Google hesabı
- Bir B1 API anahtarı oluşturabilen bir kilise yöneticisi (veya dışa aktarmak istediğiniz verilere okuma erişimi olan biri)
- Google Workspace Marketplace'ten yüklenmiş B1 Export eklentisi

</div>

## Neleri Dışa Aktarır

| Menü öğesi | Sayfa sekmesi | Veriler |
|---|---|---|
| Export People | `B1 People` | ID, Display Name, First, Last, Email, Membership Status |
| Export Donations | `B1 Donations` | ID, Person ID, Date, Amount, Method, Batch ID |
| Export Groups | `B1 Groups` | ID, Name, Category, Member Count |
| Export Attendance | `B1 Attendance` | ID, Person ID, Visit Date, Service ID, Group ID |

Her dışa aktarma, adlandırılmış sekmesinin içeriğini **değiştirir**. Dışa aktarmayı yeniden çalıştırmak, satırları eklemek yerine size yeni bir anlık görüntü verir. E-tablodaki diğer sekmelere dokunulmaz.

## Kurulum

### 1. Doğru yetkilerle bir B1 API anahtarı oluşturun

1. B1Admin'de **Ayarlar → Geliştirici → API Anahtarları** bölümüne gidin.
2. **Yeni API Anahtarı**'na tıklayın, adını "Sheets Export" olarak verin ve dışa aktarmayı planladığınız veriler için **okuma** yetkilerini tanımlayın:
   - People dışa aktarımı için `people:read`
   - Donations için `donations:read`
   - Groups için `groups:read`
   - Attendance için `attendance:read`
3. Yalnızca dışa aktarma yapacak bir anahtarın `settings:write` yetkisine **ihtiyacı yoktur**. Bu yetki yalnızca webhook kaydeden bağlayıcılar (Zapier / Make) içindir. Bu anahtarı dar kapsamlı tutun.
4. Kaydedin ve `cak_…` anahtarını kopyalayın.

### 2. Eklentiyi yükleyin

1. Dışa aktarmak istediğiniz e-tabloyu açın.
2. **Uzantılar → Eklentiler → Eklenti al**.
3. **B1 Export** araması yapıp yükleyin. Google, sayfalarınıza ve harici HTTP isteklerine erişim izni ister. Bu izin, eklentinin B1 API'sini çağırabilmesi için gereklidir.

Yüklemeden sonra, bu Google hesabıyla açtığınız her e-tablonun **Uzantılar** menüsünde bir **B1 Export** girişi görünür.

### 3. Anahtarı bağlayın

1. **Uzantılar → B1 Export → Connect…** seçeneğine gidin (ilk açılıştan sonra menü çubuğundaki **B1 Export → Connect…** de kullanılabilir).
2. API anahtarını kenar çubuğuna yapıştırın, Base URL alanını `https://api.churchapps.org` olarak bırakın (hazırlık ortamında test etmiyorsanız) ve **Save**'e tıklayın.
3. **Test Connection**'a tıklayın. Yeşil renkte "Connection OK" mesajı anahtarın çalıştığını doğrular.

Anahtar **kullanıcıya özel özellikler** (`PropertiesService.getUserProperties()`) içinde saklanır. Google hesabınıza bağlıdır, e-tabloya asla yazılmaz ve e-tablonun diğer düzenleyicilerine asla görünmez.

## Dışa Aktarma Çalıştırma

Şunlardan birini yapın:

- **Menüden**: **Uzantılar → B1 Export → Export People** (veya Donations / Groups / Attendance)
- **Kenar çubuğundan**: Kenar çubuğunu açın (Connect…) ve ilgili veri kümesi düğmesine tıklayın

İşlem tamamlandığında bir bildirim çıkar: "_N_ satır 'B1 People' sayfasına yazıldı."

## Bunların Üzerine Rapor Oluşturma

Dışa aktarılan sekmeler düz Google Sheets verileridir. Kendi analizlerinizi bu sekmelere referans vererek oluşturabilirsiniz:

- Kart bağışlarını toplamak için `=SUMIF('B1 Donations'!E:E, "card", 'B1 Donations'!D:D)` formülü içeren bir **özet sekmesi**
- Yalnızca üyeleri gösteren bir **filtrelenmiş görünüm**: `=FILTER('B1 People'!A:F, 'B1 People'!F:F = "Member")`
- `B1 Attendance` sekmesinden verileri alan bir devamsızlık eğilimi **grafiği**

Dışa aktarmayı yeniden çalıştırmak altta yatan sekmeyi yeniler. Formülleriniz otomatik olarak güncellenir.

## Yinelenen Dışa Aktarmaları Zamanlama

Eklenti varsayılan olarak isteğe bağlıdır. Haftalık veya aylık dışa aktarmalar için Apps Script'in yerleşik zamana bağlı tetikleyicilerini kullanın:

1. E-tabloda **Uzantılar → Apps Script** seçeneğine gidin (bu, eklentinin bağlı betiğini açar).
2. Sol kenar çubuğundaki **⏰ Triggers** simgesine tıklayın.
3. `exportPeople` (veya herhangi bir dışa aktarma işlevi) için **Add Trigger** seçeneğini kullanın. *Time-driven* (zamana bağlı) seçin ve *Week timer* (haftalık zamanlayıcı) olarak ayarlayın, örneğin *Every Monday 6am* (Her Pazartesi 06:00).

Dışa aktarma, Google hesabınız altında arka planda çalışır. API anahtarı yenilenir veya iptal edilirse, tetikleyici bir sonraki başarısızlıkta size e-posta gönderir.

## Gizlilik ve İzinler

- Eklenti yalnızca `spreadsheets.currentonly` (yalnızca açık olduğu e-tabloya erişebilir) ve `script.external_request` (`UrlFetchApp` ile B1 API'sini çağırabilsin diye) izinlerini ister. Drive, Gmail veya diğer Google verilerinizi **görmez**.
- B1 API anahtarı kullanıcıya özeldir. Aynı e-tablonun diğer düzenleyicileri bunu göremez.
- Tüm B1 API çağrıları HTTPS üzerinden, `Authorization: Bearer cak_…` başlığıyla yapılır.

## Sorun Giderme

- **"No API key set"**: **Uzantılar → B1 Export → Connect…** seçeneğini açın ve anahtarı yapıştırın.
- **"B1 rejected the API key (401)"**: Anahtar iptal edilmiş veya hatalıdır. Yeni bir anahtar oluşturup yeniden yapıştırın.
- **"This API key lacks permission for /giving/donations (403)"**: Anahtarda `donations:read` yetkisi yoktur. B1Admin'de anahtarın yetkilerini güncelleyin.
- **Çalıştırmadan sonra sayfa yenilenmiyor**: Doğru sekme adına (`B1 People` vb.) baktığınızdan emin olun. Sekme yoksa dışa aktarma sekmeyi oluşturur.
- **"Quota exceeded"**: Apps Script, `UrlFetchApp` için kullanıcı başına günlük kotalar uygular (genellikle günde binlerce çağrı). Çok sayıda kaydı olan büyük bir kilise, dışa aktarmaları birden fazla güne bölmek veya yüksek hacimli senkronizasyon için [Make](./make) ya da özel bir entegrasyon kullanmak zorunda kalabilir.

## Eklentiyi Özelleştirme

Eklenti açık kaynaklıdır. Apps Script projesi `B1Integrations/GoogleSheetsAddon/` deposunda bulunur. Dışa aktarmadığımız bir sütuna, ek bir veri kümesine veya farklı bir çıktı biçimine ihtiyacınız varsa orada bir sorun (issue) veya çekme isteği (PR) açabilirsiniz.

## Ayrıca Bakınız

- [Zapier](./zapier): İsteğe bağlı dışa aktarma yerine gerçek zamanlı senkronizasyon için
- [Make](./make): Daha karmaşık dönüşümlerle senkronizasyon için
- [API Anahtarları (geliştirici başvurusu)](/docs/developer/api/api-keys)
