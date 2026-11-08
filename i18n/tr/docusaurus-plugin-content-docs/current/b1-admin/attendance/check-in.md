---
title: "B1 Checkin ve B1 Admin ile Self Check-In Kurulumu"
sidebar_label: "Check-In"
description: "B1 Admin içindeki B1 Checkin uygulamasıyla ibadetler için self check-in kurun; cihazlar, kiosk hesapları, takvimler, marka görünümü ve QR misafir kaydını kapsar."
---

# Check-In

<div class="article-intro">

B1 Admin, ibadetlerde self check-in özelliğini tamamlayıcı **B1 Checkin** uygulaması aracılığıyla destekler. Üyeler geldiklerinde kendilerini ve ailelerini kiosk'larda ya da özel cihazlarda check-in yapabilir. Bu süreç hızlıdır ve gönüllülerin iş yükünü azaltır. Her check-in otomatik olarak katılım olarak kaydedilir.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Kampüslerinizin, ibadet saatlerinizin ve gruplarınızın [Katılım Kurulumu](setup.md) bölümünde yapılandırılmış olması gerekir.
- Ailelerin birlikte check-in yapabilmesi için [hane](../people/adding-people.md#managing-households) bilgileriyle birlikte [veritabanınızda kişilere](../people/adding-people.md) ihtiyacınız vardır.
- Bir tablete ve isteğe bağlı olarak bir Brother etiket yazıcısına ihtiyacınız olacak (aşağıdaki [donanım önerilerine](#recommended-hardware) bakın).

</div>

## Nasıl Çalışır

B1 Checkin uygulaması, B1 Admin katılım kurulumunuza bağlanır. Bir üye check-in yaptığında, katılımı otomatik olarak doğru kampüse, ibadet saatine ve gruba kaydedilir. Check-in sistemini kullanan herkes için katılımı manuel olarak girmeniz gerekmez.

## Check-In Kurulumu

1. **Önce katılım yapınızı yapılandırın.** B1 Admin'de **Kişiler > Katılım** bölümüne gidin ve kampüslerinizin, ibadet saatlerinizin ve gruplarınızın hazır olduğundan emin olmak için **Kurulum** düğmesine tıklayın. Check-in uygulaması bu yapılandırmaya dayanır. İsteğe bağlı olarak check-in'in her hafta otomatik olarak açılıp kapanması için her ibadet saatine bir [check-in takvimi](setup.md#setting-a-check-in-schedule) verebilirsiniz. Takvimler, ibadetin kampüsünün saat dilimini kullanır; kampüste saat dilimi ayarlanmamışsa kilisenizin saat dilimi kullanılır. Kiosk, zaman aralığı kapalı olan ibadet saatlerini **Kapalı** olarak listeler ve check-in'in ne zaman açılacağını ailelere bildirir. Ayrıntılar için [Katılım Kurulumu](setup.md) sayfasına bakın.
2. **B1 Checkin uygulamasını**, kullanmayı planladığınız cihazlara **yükleyin**. Uygulama aşağıdaki platformlarda mevcuttur:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/Samsung Tabletler:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire Tabletler:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **B1 Checkin uygulamasına giriş yapın.** Bunun için **Checkin** katılım iznine (veya **Katılımı Düzenle** iznine) sahip bir hesap kullanın. Bkz. [Check-In Kiosk Hesapları](../settings/roles-permissions.md#check-in-kiosk-accounts).
4. Mevcut toplantı için **kampüsü ve ibadet saatini seçin**.
5. Üyeler artık cihazda adlarını arayabilir ve check-in yapabilir.

:::tip
Check-in cihazlarını, fuaye girişleri veya karşılama masaları gibi görünür ve kolay ulaşılabilir yerlere yerleştirin. İbadetler sırasında kısa bir duyuru, üyelerin bu seçeneğin olduğunu bilmesine yardımcı olur.
:::

:::tip
Kilisenizin birden fazla kampüsü varsa, kurulumu [Katılım Kurulumu](setup.md) bölümünde her kampüs için tekrarlamanız gerekir. Her check-in cihazı farklı bir kampüs için yapılandırılabilir.
:::

## Önerilen Donanım

**Tabletler** — bu uygulamayla iyi çalışan herhangi biri:

- **Kompakt:** Samsung Galaxy Tab A7 Lite 8.7"
- **Geniş Ekran:** Samsung Galaxy Tab A8 10.5"
- **Ekonomik:** Amazon Fire HD 10

**Yazıcılar** — isim etiketleri yazdırmak için check-in, Brother etiket yazıcılarıyla çalışır:

- **En iyisi:** Brother QL-1110NWB (Bluetooth ve WiFi üzerinden birden fazla tableti destekler)
- **İyi:** Brother QL-810W (WiFi üzerinden birden fazla tableti destekler)
- **Ekonomik:** Brother QL-1100 (yalnızca WiFi)

**Etiketler:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Yalnızca Brother etiket yazıcıları B1 Checkin uygulamasıyla uyumludur. Diğer yazıcı markaları isim etiketi yazdıramaz.
:::

:::info
Yazıcınızı tabletinizle aynı WiFi ağına bağlamak için yazıcınızın kurulum talimatlarını izleyin. Brother yazıcı sürücülerini ve kurulum kılavuzlarını [Brother destek sitesinde](https://support.brother.com) bulabilirsiniz.
:::

## Kiosk Görünümünü Özelleştirme

B1 Checkin uygulamasının görünümünü ve hissini kilisenizin markasına uyacak şekilde özelleştirebilirsiniz. B1 Admin'de **Mobil > B1 CheckIn** bölümüne gidin ve şunları yapılandırmak için **Kiosk Teması** kartını kullanın:

### Renkler

Kilisenizin markasına uyması için sekiz renk ayarını özelleştirin:

- **Birincil** ve **Birincil Kontrast** -- Ana marka rengi ve bu rengin metin rengi.
- **İkincil** ve **İkincil Kontrast** -- Vurgu rengi ve bu rengin metin rengi.
- **Üst Bilgi Arka Planı** ve **Alt Üst Bilgi Arka Planı** -- Kiosk üst bilgi alanlarının renkleri.
- **Düğme Arka Planı** ve **Düğme Metni** -- Etkileşimli düğmelerin renkleri.

### Arka Plan Görseli

Kiosk karşılama ve arama ekranları için isteğe bağlı bir arka plan görseli yükleyin. Önerilen boyut 1920x1080 pikseldir.

### Boşta Ekranı / Ekran Koruyucu

Belirli bir süre hareketsiz kalındığında etkinleşen bir ekran koruyucu yapılandırın:

1. Boşta ekranını **açın** veya **kapatın**.
2. **Zaman aşımını** ayarlayın (ekran koruyucunun başlamadan önce kaç saniye hareketsiz kalınacağı; en az 10 saniye).
3. Bir veya daha fazla **slayt** ekleyin -- her slaytta bir görsel ve görüntülenme süresi bulunur (en az 3 saniye).

:::tip
Kiosk aktif olarak kullanılmadığında duyuruları, yaklaşan etkinlikleri veya karşılama mesajlarını göstermek için boşta ekranını kullanın.
:::

## QR Kod ile Misafir Kaydı

Check-in kiosk'u, ziyaretçilerin kendilerini ve ailelerini kendi telefonlarından kaydetmek için tarayabileceği bir QR kod gösterebilir. Bu, ilk kez gelen misafirler için check-in sürecini hızlandırır.

Bir misafir QR kodu taradığında, aile adlarını ve sormayı seçtiğiniz diğer bilgileri girebileceği bir [misafir kayıt sayfasına](../../b1-church/checkin/guest-registration.md) yönlendirilir. Bir gönüllü daha sonra kiosk'ta onları arayabilir ve check-in yapabilir.

### QR Misafir Kaydını Etkinleştirme

QR kod görüntülemesini açmak için:

1. B1 Admin'de [Atlama menüsünü](../introduction.md#getting-around-with-the-jump-menu) (sol üstteki arama çubuğu) açın ve **Mobil** bölümünü genişletin.
2. **B1 CheckIn** seçeneğine tıklayın.
3. **QR Misafir Kaydı** seçeneğini **açın** ve **Kaydet** düğmesine tıklayın.

:::note
Bu ayar **Katılım** altında değil, **Mobil > B1 CheckIn** altındadır (**Kiosk Teması** kartıyla aynı sayfa). Katılım sayfasındaki **Kiosk** eylemi bu sayfaya bağlantı içerir.
:::

Anahtar açık olduğunda, aşağıdaki diğer seçenekler aynı **QR Misafir Kaydı** kartında görünür. Bunlardan herhangi birini değiştirdikten sonra kart üzerinde **Kaydet** düğmesine tıklayın.

### Kayıt Alanlarını Seçme

**Kayıt alanları** listesi, kayıt formunun neleri isteyeceğini kontrol eder. **Ad** ve **Soyad** formda her zaman bulunur ve her aile üyesi için her zaman zorunludur. Diğer her alan için, forma eklemek üzere **Dahil et** seçeneğini açın; misafirlerin bu alanı doldurmasını zorunlu kılmak istiyorsanız **Zorunlu** seçeneğini açın. **Zorunlu** yalnızca dahil edilmiş bir alan için açılabilir ve **Dahil et** seçeneğini kapatmak bu alanı temizler.

| Alan | Sorulan | Varsayılan olarak dahil |
|-------|-----------|---------------------|
| **Unvan** | Her aile üyesi için, adın önünde açılır liste olarak (Mr, Mrs, Miss, Ms, Dr, Prof, Rev, Pastor) | Hayır |
| **E-posta** | Yalnızca birincil iletişim kişisi | Evet (isteğe bağlı) |
| **Telefon** | Her aile üyesi. Zorunlu olduğunda yalnızca birincil iletişim kişisinin doldurması gerekir. | Evet (isteğe bağlı) |
| **Hane rolü** | Birincil iletişim kişisinden sonraki her aile üyesi için -- Eş, Çocuk veya Diğer. Birincil iletişim kişisi yeni hanenin başıdır. Rolü olmayan herkes Diğer olarak kaydedilir. | Evet (isteğe bağlı) |
| **Ev adresi** | Aile için bir kez -- sokak, adres satırı 2, şehir, eyalet ve posta kodu. Zorunlu olduğunda, adres satırı 2 hariç her şeyin doldurulması gerekir. Adres her aile üyesine kaydedilir. | Hayır |
| **Doğum tarihi** | Her aile üyesi | Hayır |
| **Cinsiyet** | Her aile üyesi | Hayır |
| **Medeni durum** | Yalnızca birincil iletişim kişisi | Hayır |
| **Sınıf** | Her aile üyesi (Okul öncesi ile 12. sınıf arası veya Mezun) | Hayır |
| **Yorumlar** | Bir kez, aile üyelerinin altındaki bir kutuda (en fazla 1.000 karakter) | Hayır |

Kapattığınız alanlar, başka bir yolla kayda gönderilse bile asla kaydedilmez. Yorumlar, birincil iletişim kişisinin kaydına bir not olarak kaydedilir (\"Misafir kaydı\" olarak eklenir), böylece bunları profillerinin **Notlar** bölümünde okuyabilirsiniz.

### Misafirleri Bir Gruba Ekleme

Kayıt olan herkesi otomatik olarak gruplarınızdan birine eklemek için **Yeni misafirleri gruba ekle** seçeneğini kullanın -- örneğin \"Yeni Gelenler\" grubu veya bu hafta sonundaki etkinlik için bir grup. Bunu atlamak için varsayılan olan **Yok** seçeneğini seçin. Misafirler grubu asla görmez veya seçemez; yalnızca burada ayarlanır. Bu etkinlikteki misafirleri birlikte takip edebilmek için her etkinlikten önce bunu değiştirin.

### Katılımın Kaydedilmesi

Bir grup seçildiğinde **Katılımı da kaydet** anahtarı görünür. Bunu açtığınızda, misafirler kayıt oldukları anda mevcut olarak işaretlenir ve ayrıca check-in yapmanız gerekmez.

Katılım yalnızca kayıt, seçilen grubun **planlanmış** ibadet saatlerinden birinde gerçekleşirse kaydedilir:

- Grup bir veya daha fazla ibadet saatine bağlı olmalıdır ve bu ibadet saatlerinin bir [check-in takvimi](setup.md#setting-a-check-in-schedule) (bir **Gün** ve bir **Başlangıç Saati**) olmalıdır.
- \"Sırasında\" ifadesi, o ibadet saatinin check-in penceresinin içinde olduğu anlamına gelir -- başlangıçtan **Check-in açma** dakikası önceden, bitişten **Check-in kapatma** dakikası sonrasına kadar (bitiş saati ayarlanmamışsa başlangıçtan sonra; hem bitiş saati hem de kapatma dakikası yoksa o günün sonuna kadar). Bu, check-in takviminin kullandığı saat dilimiyle aynıdır.
- Her aile üyesi, o anda açık olan her ibadet saati için bugünün tarihinde grupta mevcut olarak işaretlenir.
- Başka bir zamanda yapılan kayıtlar veya ibadet saatlerinin takvimi olmayan bir grup için yapılan kayıtlar gruba eklenir, ancak katılıma sayılmaz.

### Üst Bölüm Fotoğrafı

**Üst bölüm fotoğrafı** altında, kayıt sayfasının üstünde varsayılan simge yerine gösterilecek bir görsel (16:9 oranında kırpılmış) seçmek veya yüklemek için **Fotoğrafı değiştir** seçeneğine tıklayın. Simgeye geri dönmek için **Kaldır** seçeneğine tıklayın.

### Kayıt Bağlantısını Paylaşma

QR Misafir Kaydı etkinleştirildikten sonra kartın altında **Kayıt QR kodunu paylaş** bölümü görünür. Bu, misafirleri kiosk QR kodunun ötesinde kayıt formuna ulaştırmanın iki yolunu sunar:

- **Bağlantıyı kopyala** -- Kayıt URL'sini kopyalar, böylece bunu kilisenizin web sitesinde, e-postalarda veya çevrimiçi herhangi bir yerde paylaşabilirsiniz.
- **PNG indir** -- QR kodunu, broşürlerde, bültenlerde veya tabelalarda yazdırabileceğiniz bir görsel olarak indirir.

:::tip
Misafirlerin gelmeden önce kayıt olabilmesi için kayıt bağlantısını kilisenizin web sitesindeki \"Ziyaretinizi Planlayın\" veya \"Ben Yeniyim\" sayfasına ekleyin.
:::

### Bir Misafir Kayıt Olduktan Sonra Neler Olur

B1 önce **Kişiler** bölümünde zaten bulunan kişileri arar. Bir aile üyesi, aynı ada ve aynı e-posta veya telefon numarasına sahip tam olarak bir kişiyle eşleştiğinde, o mevcut kişiyle eşleştirilir. E-posta veya telefon olmadan girilen bir çocuk, eşleşen hane içinde ad ile eşleştirilir. Eşleşen kişiler olduğu gibi kullanılır -- kayıt, bilgilerini veya üyelik durumlarını asla değiştirmez -- ve yeni olan herkes eşleşen haneye katılır.

Eşleşme bulunamazsa, kayıt birincil iletişim kişisinin soyadından adlandırılan yeni bir hane oluşturur ve her aile üyesi için bir kişi kaydı ekler. Yeni olan herkes, üyelik durumu **Ziyaretçi** olarak **Kişiler** bölümüne eklenir ve birincil iletişim kişisi hanenin başı olur.

Eşleşen ve yeni kişilerin tümü, (henüz üye değillerse) seçtiğiniz gruba eklenir ve bu özellik açıksa katılımları kaydedilir. Yorumlar, birincil iletişim kişisine bir not olarak kaydedilir.

Otomatik takip için, **Kişi · Oluşturuldu** gibi bir [iş akışı tetikleyicisi](../serving/workflows.md#triggers) ekleyin ve koşul olarak *Üyelik Durumu Ziyaretçi* ayarlayın; ya da yukarıda seçtiğiniz grup için **Grup · Üye Katıldı** tetikleyicisini kullanın.

## Neler Kaydedilir

Her check-in, B1 Admin'de bir katılım kaydı oluşturur. Bu kayıtları [Katılım](tracking-attendance.md) sayfasında ve her [grubun](../groups/group-members.md) oturumlarında, manuel olarak girilmiş katılımla aynı şekilde görüntüleyebilirsiniz. Verilerin görünümünde bir fark yoktur -- her iki yöntem de aynı raporlara veri aktarır.
