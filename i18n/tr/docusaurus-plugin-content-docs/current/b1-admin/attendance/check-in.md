---
title: "Check-In"
---

# Check-In

<div class="article-intro">

B1 Admin, **B1 Checkin** uygulaması aracılığıyla ibadetlerde kendi kendine giriş yapmayı destekler. Üyeler geldiklerinde kendilerini ve ailelerini kiosklarda veya özel cihazlarda giriş yaptırabilir; bu süreç hızlanır ve gönüllülerinizin iş yükü azalır. Her giriş otomatik olarak yoklama kaydı olarak işlenir.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Kampüsleriniz, ibadet saatleriniz ve gruplarınız [Yoklama Kurulumu](setup.md) bölümünde yapılandırılmış olmalıdır.
- Ailelerin birlikte giriş yapabilmesi için [hanehalkları](../people/adding-people.md#managing-households) ayarlanmış [veritabanınızda kişiler](../people/adding-people.md) bulunmalıdır.
- Bir tablete ve isteğe bağlı olarak bir Brother etiket yazıcısına ihtiyacınız olacak (aşağıdaki [donanım önerileri](#recommended-hardware) bölümüne bakın).

</div>

## Nasıl Çalışır

B1 Checkin uygulaması B1 Admin yoklama kurulumunuza bağlanır. Bir üye giriş yaptığında, yoklaması otomatik olarak doğru kampüs, ibadet saati ve grup altına kaydedilir. Giriş sistemini kullanan herkes için yoklamayı elle girmeniz gerekmez.

## Check-In Kurulumu

1. **Önce yoklama yapınızı yapılandırın.** B1 Admin'de **People > Attendance** bölümüne gidin ve kampüslerinizin, ibadet saatlerinizin ve gruplarınızın hazır olduğundan emin olmak için **Setup** düğmesine tıklayın. Check-in uygulaması bu yapılandırmaya dayanır. İsteğe bağlı olarak her ibadet saatine bir [giriş programı](setup.md#setting-a-check-in-schedule) verebilirsiniz; böylece giriş her hafta otomatik olarak açılıp kapanır. Programlar, ibadetin kampüsünün saat dilimini kullanır; kampüste saat dilimi ayarlı değilse kilisenizin saat dilimi kullanılır. Kiosk, giriş penceresi kapalı olan ibadet saatlerini **Closed** olarak listeler ve ailelere girişin ne zaman açılacağını bildirir. Ayrıntılar için [Yoklama Kurulumu](setup.md) sayfasına bakın.
2. **B1 Checkin uygulamasını** kullanmayı planladığınız cihazlara **yükleyin**. Uygulama şu platformlarda mevcuttur:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/Samsung Tabletler:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire Tabletler:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **B1 Checkin uygulamasına giriş yapın.** **Checkin** yoklama iznine (veya **Edit Attendance** iznine) sahip bir hesap kullanın. Bkz. [Check-In Kiosk Hesapları](../settings/roles-permissions.md#check-in-kiosk-accounts).
4. Mevcut toplantı için **kampüsü ve ibadet saatini seçin**.
5. Üyeler artık cihazda adlarını arayıp giriş yapabilir.

:::tip
Check-in cihazlarını lobi girişleri veya karşılama masaları gibi görünür ve kolay ulaşılabilir yerlere yerleştirin. İbadetler sırasında kısa bir duyuru, üyelerin bu seçeneğin olduğunu bilmesine yardımcı olur.
:::

:::tip
Kilisenizde birden fazla kampüs varsa, kurulumu her kampüs için [Yoklama Kurulumu](setup.md) içinde tekrarlamanız gerekir. Her check-in cihazı farklı bir kampüs için yapılandırılabilir.
:::

## Önerilen Donanım

**Tabletler** — bu uygulamayla iyi çalışan herhangi biri:

- **Kompakt:** Samsung Galaxy Tab A7 Lite 8.7"
- **Büyük Ekran:** Samsung Galaxy Tab A8 10.5"
- **Ekonomik:** Amazon Fire HD 10

**Yazıcılar** — isim etiketleri yazdırmak için check-in'ler Brother etiket yazıcılarıyla çalışır:

- **En iyi:** Brother QL-1110NWB (Bluetooth ve WiFi üzerinden birden fazla tableti destekler)
- **İyi:** Brother QL-810W (WiFi üzerinden birden fazla tableti destekler)
- **Ekonomik:** Brother QL-1100 (yalnızca WiFi)

**Etiketler:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Yalnızca Brother etiket yazıcıları B1 Checkin uygulamasıyla uyumludur. Diğer yazıcı markaları isim etiketi yazdırmak için çalışmaz.
:::

:::info
Yazıcınızın kurulum talimatlarını izleyerek onu tabletinizle aynı WiFi ağına bağlayın. Brother yazıcı sürücülerini ve kurulum kılavuzlarını [Brother destek sitesinde](https://support.brother.com) bulabilirsiniz.
:::

## Kiosk Görünümünü Özelleştirme

Kilisenizin markasına uyacak şekilde B1 Checkin uygulamasının görünümünü ve hissini özelleştirebilirsiniz. B1 Admin'de **Mobile > B1 CheckIn** bölümüne gidin ve yapılandırmak için **Kiosk Theme** kartını kullanın:

### Renkler

Kilisenizin markasına uyması için sekiz renk ayarını özelleştirin:

- **Primary** ve **Primary Contrast** -- Ana marka rengi ve bunun metin rengi.
- **Secondary** ve **Secondary Contrast** -- Vurgu rengi ve bunun metin rengi.
- **Header Background** ve **Subheader Background** -- Kiosk başlık alanlarının renkleri.
- **Button Background** ve **Button Text** -- Etkileşimli düğmelerin renkleri.

### Arka Plan Görseli

Kiosk karşılama ve arama ekranları için isteğe bağlı bir arka plan görseli yükleyin. Önerilen boyut 1920x1080 pikseldir.

### Boşta Ekran / Ekran Koruyucu

Belirli bir süre hareketsizlikten sonra etkinleşen bir ekran koruyucu yapılandırın:

1. Boşta ekranını **açın** veya **kapatın**.
2. **Zaman aşımını** ayarlayın (ekran koruyucunun başlamasından önce kaç saniye hareketsizlik olacağı; en az 10 saniye).
3. Bir veya daha fazla **slayt** ekleyin -- her slaytın bir görseli ve bir gösterim süresi vardır (en az 3 saniye).

:::tip
Kiosk aktif olarak kullanılmadığında duyurular, yaklaşan etkinlikler veya hoş geldiniz mesajları göstermek için boşta ekranını kullanın.
:::

## QR Kodu ile Misafir Kaydı

Check-in kiosku, ziyaretçilerin kendi telefonlarından kendilerini ve ailelerini kaydetmek için tarayabileceği bir QR kodu gösterebilir. Bu, ilk kez gelen misafirler için giriş sürecini hızlandırır.

Bir misafir QR kodunu taradığında, aile adlarını ve sormayı seçtiğiniz diğer bilgileri girdikleri bir [misafir kayıt sayfasına](../../b1-church/checkin/guest-registration) yönlendirilir. Bir gönüllü daha sonra kiosktan onları arayıp giriş yaptırabilir.

### QR Misafir Kaydını Etkinleştirme

QR kodu görüntülemeyi açmak için:

1. B1 Admin'de [Jump menüsünü](../introduction.md#getting-around-with-the-jump-menu) (sol üstteki arama çubuğu) açın ve **Mobile** bölümünü genişletin.
2. **B1 CheckIn** seçeneğine tıklayın.
3. **QR Guest Registration** anahtarını açın ve **Save** düğmesine tıklayın.

:::note
Bu ayar **Mobile > B1 CheckIn** altındadır (**Kiosk Theme** kartıyla aynı sayfa), Attendance altında değildir. Attendance sayfasındaki **Kiosk** eylemi bu sayfaya bir bağlantıya sahiptir.
:::

Anahtar açıldıktan sonra aşağıdaki diğer seçenekler aynı **QR Guest Registration** kartında görünür. Bunlardan herhangi birini değiştirdikten sonra karttaki **Save** düğmesine tıklayın.

### Kayıt Alanlarını Seçme

**Sign-up fields** listesi kayıt formunun neyi sorduğunu kontrol eder. **First Name** ve **Last Name** formda her zaman bulunur ve her aile üyesi için her zaman zorunludur. Diğer her alan için, forma eklemek üzere **Include** seçeneğini açın; misafirlerin doldurmak zorunda olmasını istiyorsanız **Required** seçeneğini açın. **Required** yalnızca dahil edilmiş bir alan için açılabilir ve **Include** kapatıldığında bu seçenek temizlenir.

| Alan | Sorulan | Varsayılan olarak dahil |
|-------|-----------|---------------------|
| **Email** | Yalnızca birincil iletişim kişisi | Evet (isteğe bağlı) |
| **Phone** | Yalnızca birincil iletişim kişisi | Evet (isteğe bağlı) |
| **Home address** | Aile için bir kez -- cadde, adres satırı 2, şehir, eyalet ve posta kodu. Zorunlu olduğunda, adres satırı 2 hariç her şeyin doldurulması gerekir. Adres her aile üyesine kaydedilir. | Hayır |
| **Birth date** | Her aile üyesi | Hayır |
| **Gender** | Her aile üyesi | Hayır |
| **Marital status** | Yalnızca birincil iletişim kişisi | Hayır |
| **Grade** | Her aile üyesi (PreK'dan 12. sınıfa kadar veya Graduated) | Hayır |
| **Comments** | Aile üyelerinin altındaki bir kutuda bir kez (en fazla 1.000 karakter) | Hayır |

Kapattığınız alanlar, başka bir yolla kayda gönderilse bile asla kaydedilmez. Yorumlar, birincil iletişim kişisinin kaydına "Guest sign-up" olarak bir not şeklinde eklenir; böylece bunları profillerinin **Notes** bölümünde okuyabilirsiniz.

### Misafirleri Bir Gruba Ekleme

Kayıt olan herkesi otomatik olarak gruplarınızdan birine koymak için **Add new guests to group** seçeneğini kullanın -- örneğin "Newcomers" grubu veya bu hafta sonu etkinliği için bir grup. Bunu atlamak için varsayılan olan **None** seçeneğini seçin. Misafirler grubu asla görmez veya seçmez; yalnızca burada ayarlanır. Etkinlik misafirlerini birlikte takip edebilmeniz için her etkinlikten önce değiştirin.

### Yoklama Kaydetme

Bir grup seçildiğinde **Also record attendance** anahtarı görünür. Misafirleri kaydoldukları anda mevcut olarak işaretlemek için açın; böylece onları ayrıca giriş yaptırmanız gerekmez.

Yoklama yalnızca kayıt, seçilen grubun **planlanmış** ibadet saatlerinden birinde gerçekleşirse kaydedilir:

- Grup bir veya daha fazla ibadet saatine bağlı olmalıdır ve bu ibadet saatlerinin bir [giriş programı](setup.md#setting-a-check-in-schedule) (bir **Day** ve bir **Start Time**) olmalıdır.
- "Sırasında", o ibadet saatinin giriş penceresi içinde olmak demektir -- başlangıçtan **Open check-in** dakika önce ile bitişten **Close check-in** dakika sonrasına kadar (bitiş saati yoksa başlangıçtan sonra; ne bitiş saati ne de kapanış dakikası yoksa, o günün sonuna kadar), giriş programının kullandığı aynı saat diliminde.
- Her aile üyesi, o anda açık olan her ibadet saati için, bugünün tarihinde grupta mevcut olarak işaretlenir.
- Başka bir zamanda yapılan kayıtlar veya ibadet saatlerinin programı olmayan bir grup için yapılan kayıtlar gruba eklenir, ancak katılım olarak sayılmaz.

### Başlık Fotoğrafı

**Header photo** altında, varsayılan simge yerine kayıt sayfasının en üstünde göstermek üzere bir görsel seçmek veya yüklemek için **Change photo** düğmesine tıklayın (16:9 oranında kırpılır). Simgeye geri dönmek için **Remove** düğmesine tıklayın.

### Kayıt Bağlantısını Paylaşma

QR Guest Registration etkinleştirildiğinde, kartın alt kısmında bir **Share registration QR code** bölümü görünür. Bu, misafirleri kiosk QR kodunun ötesinde kayıt formuna ulaştırmak için iki yol sunar:

- **Copy link** — kayıt URL'sini kopyalar; böylece kilise web sitenize, e-postalarınıza veya çevrimiçi herhangi bir yere yapıştırabilirsiniz.
- **Download PNG** — QR kodunu, afişlere, bültenlere veya tabelalara basabileceğiniz bir görsel olarak indirir.

:::tip
Misafirlerin gelmeden önce kayıt olabilmesi için kayıt bağlantısını kilise web sitenizin "Ziyaretinizi Planlayın" veya "Ben Yeniyim" sayfasına ekleyin.
:::

### Bir Misafir Kayıt Olduktan Sonra Ne Olur

B1 önce **People** içinde zaten bulunan kişileri arar. Bir aile üyesi, tam olarak bir kişi aynı ilk ada ve aynı e-posta veya telefon numarasına sahip olduğunda mevcut bir kişiyle eşleştirilir. E-posta veya telefonu olmadan girilen bir çocuk, eşleştirilen hanehalkı içinde ilk adına göre eşleştirilir. Eşleşen kişiler olduğu gibi yeniden kullanılır -- kayıt asla bilgilerini veya üyelik durumlarını değiştirmez -- ve yeni olan herkes eşleşen hanehalkına katılır.

Hiçbir eşleşme olmadığında, kayıt birincil iletişim kişisinin soyadına göre adlandırılmış yeni bir hanehalkı oluşturur ve her aile üyesi için bir kişi kaydı oluşturur. Yeni olan herkes **People** listesine **Visitor** üyelik durumuyla eklenir; birincil iletişim kişisi ise hanehalkı reisi olur.

Eşleşen ve yeni kişilerin her ikisi de (zaten yoksa) seçtiğiniz gruba eklenir ve bu açık olduğunda yoklamaları kaydedilir. Yorumlar birincil iletişim kişisine not olarak kaydedilir.

Otomatik takip için, [iş akışı tetikleyicisi](../serving/workflows.md#triggers) ekleyin; örneğin koşul *Membership Status is Visitor* ile **Person · Created**, ya da yukarıda seçtiğiniz grup için **Group · Member Joined**.

## Neler Kaydedilir

Her check-in, B1 Admin'de bir yoklama kaydı oluşturur. Bu kayıtları [Attendance](tracking-attendance.md) sayfasında ve her [grubun](../groups/group-members.md) oturumlarında, elle girilen yoklama gibi görüntüleyebilirsiniz. Veriler nasıl görüntülendiği açısından bir fark yoktur — her iki yöntem de aynı raporlara veri sağlar.
