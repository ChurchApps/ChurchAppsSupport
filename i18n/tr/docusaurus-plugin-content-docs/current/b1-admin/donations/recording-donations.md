---
title: "Bağışların Kaydedilmesi"
---

# Bağışların Kaydedilmesi

<div class="article-intro">

B1 Admin'de bağışların kaydı Toplu İşlemler (Batches) sistemi üzerinden yapılır. Bir toplamayı (örneğin bir Pazar sunusunu) temsil etmek için bir toplu işlem oluşturursunuz, ardından bu topluluğa tek tek bağışları eklersiniz. Bu, bağış kayıtlarınızı düzenli tutar ve mutabakatını kolaylaştırır.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Bağışları doğru kategorilere atayabilmeniz için [fonlarınızı](funds.md) ayarlayın
- Girmek üzere olduğunuz bağışları tutmak için bir [toplu işlem](batches.md) oluşturun
- Hediye girerken bağışçıları arayabilmeniz için bağışçıların [kişi dizininde](../people/adding-people.md) yer aldığından emin olun
- Bir toplu işleme bağış girmek için **Bağışları Düzenle** iznine ya da birlikte **Bağışları Görüntüle** iznine sahip **Bağış Girme** iznine ihtiyacınız vardır (bkz. [Bir Toplu İşlemi Kimler Değiştirebilir](batches.md#who-can-change-a-batch))

</div>

## Toplu İşlem Oluşturma ve Bağış Ekleme

1. **B1 Admin**'de, sayfanın sol üstündeki arama çubuğu olan [Hızlı Geçiş menüsünü](../introduction.md#getting-around-with-the-jump-menu) açın, **Bağışlar**'ı genişletin ve **Toplu İşlemler**'e tıklayın.
2. Sayfanın üstündeki **Toplu İşlem Ekle**'ye tıklayın.
3. Toplu işlem için bir ad girin (ör. "Pazar Sunusu - 5 Ocak") ve tarihi seçin. **Kaydet**'e tıklayın.
4. Yeni toplu işleminiz, sıfır bağış ve $0.00 göstererek listede görünür.
5. Açmak için **toplu işlem adına** tıklayın.

## Tek Tek Bağış Girme

1. Toplu işlem ayrıntı sayfasında, bağış girişi paneli bağış listesinin yanında görünür. **Kişi veya Anonim Seç** altında, bağışçıyı bulmak için arama alanına adını yazın ya da **Anonim**'e tıklayın. (Sayfanın üstündeki **Bağış Ekle**'ye tıklamak sizi bu panele götürür.)
2. Bir kişi seçildikten sonra giriş formu **Tarih**, **Yöntem** (Çek, Nakit, Kart veya Ayni), **Fon**, **Notlar**, **Tutar** ve **Çek No** alanlarını gösterir (kart bağışları için **Son 4 hane**, ayni bağış için ise bunu açıklayan **Ürün**). Başka bir kişi seçmek için bağışçının adının yanındaki **Değiştir**'e tıklayın.
3. Ayrıntıları doldurun ve **Bağış Ekle**'ye tıklayın (ya da Enter tuşuna basın).
4. Bağış listeye eklenir ve form sıfırlanır, böylece bir sonrakini girebilirsiniz.

:::info
Toplu işlem [kapatılmışsa](batches.md#closing-and-reopening-a-batch), **Bağışları Düzenle** izni olmayanlar için giriş paneli ve **Düzenle** bağlantıları gizlenir ve toplu işlemin üstünde kapalı olduğunu belirten bir bildirim görünür. Yeniden açması için **Bağışları Düzenle** iznine sahip birinden isteyin.
:::

:::tip
Toplu işlem sayfasından ayrılmadan arka arkaya birden fazla bağış hızlıca girebilirsiniz. Form her girişten sonra sıfırlanır, böylece bir yığın çek ya da zarf üzerinde verimli şekilde ilerleyebilirsiniz.
:::

## Bağışları CSV Dosyasından İçe Aktarma {#importing-donations-from-a-csv-file}

Bağışlarınız zaten bir elektronik tabloda duruyorsa — örneğin başka bir bağış sisteminden alınmış bir dışa aktarım ya da bir sayım ekibinin sayım çizelgesi — her birini tek tek yazmak yerine bunları bir toplu işleme aktarabilirsiniz.

1. Toplu işlemi açın ve sayfanın üstündeki **CSV İçe Aktar**'a tıklayın. (Düğme, toplu işlemi değiştirebildiğinizde ve kilisenizin en az bir [fonu](funds.md) olduğunda görünür.)
2. **CSV Dosyası Seç**'e tıklayın ve dosyanızı seçin. Dosyada bir başlık satırı olmalıdır ve sütunlar herhangi bir sırada olabilir:
   - **Tutar** (zorunlu; `Total` de kabul edilir) -- Para birimi sembolleri ve virgüller yok sayılır, bu yüzden `$1,250.00` kabul edilir. Tutar sıfırdan büyük olmalıdır.
   - **Tarih** -- `2026-10-25` ya da `10/25/2026` gibi bir biçim kullanın. Boşsa toplu işlemin tarihi kullanılır.
   - **Fon** -- Fonun adı; büyük/küçük harf farkı gözetilmeden eşleştirilir. Boşsa ilk fonunuz kullanılır.
   - **Yöntem** -- **Çek**, **Nakit**, **Kart** veya **Ayni**. Boşsa **Çek** kullanılır.
   - **Çek Numarası** -- Çek numarası (ya da diğer ödeme ayrıntısı).
   - **Notlar**
   - **E-posta**, **Ad Soyad** veya **Ad** ve **Soyad** -- Bağışçıyı veritabanınızdaki bir kişiyle eşleştirmek için kullanılır. "Smith, John" biçiminde yazılmış bir ad "John Smith" olarak okunur.
3. Önizlemeyi inceleyin. Her satır, satır numarasını, dosyadaki bağışçıyı, **Eşleşme** durumunu, fonu ve tutarı gösterir:
   - Bir kişinin adı, bağışçının eşleştiği anlamına gelir. B1 önce e-postaya, sonra tam ada göre eşleştirir ve yalnızca tek bir kişi uyduğunda eşleştirme yapar.
   - **Bulunamadı — anonim**, tek bir eşleşme bulunamadığı anlamına gelir. Bağış anonim olarak içe aktarılır ve daha sonra atayabilmeniz için notlarına "İçe aktarılan:" ve bağışçının adı eklenir.
   - **Geçersiz tutar**, **Bilinmeyen fon**, **Bilinmeyen yöntem** veya **Geçersiz tarih** gibi kırmızı bir mesaj, o satırın atlanacağı anlamına gelir. Dosyayı düzeltip yeniden seçin.
4. **İçe Aktar**'a tıklayın (düğme kaç satırın aktarılacağını gösterir). Bağışlar toplu işleme eklenir.

:::tip
İçe aktardıktan sonra, doğru kişiyi seçmek için anonim bir bağışta **Düzenle**'ye tıklayın. "İçe aktarılan:" notu, dosyanın kimden geldiğini söyler.
:::

## Bir Kişinin Kaydından Bağış Kaydetme

Bir toplu işlemi açmadan tek bir bağış kaydetmek için, bağışçının kaydını **Kişiler** bölümünde açın ve (bağış özetinde ya da kişinin bağış görünümünde) **Bağış kaydet**'e tıklayın.

1. **Tarih** ve **Tutar**'ı ayarlayın.
2. **Fon** ve **Yöntem** (Çek, Nakit, Kart veya Ayni) seçin; gerekiyorsa **Çek No**, **Son 4 hane** ya da **Ürün** (ayni bağışlar için) bilgisini girin.
3. İsteğe bağlı olarak **Notlar** ekleyin, ardından **Kaydet**'e tıklayın.

Bağış, o tarihin toplu işlemine kaydedilir. O tarih için henüz bir toplu işlem yoksa, tarihle adlandırılmış bir tane sizin için oluşturulur.

## Bir Bağışı Birden Fazla Fona Bölme

Bazen bir bağışçı tek bir işlemde birden fazla fona bağış yapar. Bunu yönetmek için:

1. Giriş panelinin altındaki **tam bağış düzenleyicisi** bağlantısına tıklayın (ya da mevcut bir bağış satırında **Düzenle**'ye tıklayın).
2. Tam düzenleyicide, farklı fonlara tutarlar ekleyin. Toplam, fon tutarlarından otomatik olarak hesaplanır.
3. Bağışı güncellemek için **Kaydet**'e tıklayın.

:::info
Bağışları birden fazla fona bölmek, bağışçının tek bir çek üzerinde Genel Fon ve Misyon gibi birden fazla amaç için yazdığı durumlarda yaygındır.
:::

## Bağışları Düzenleme ve Silme

Bir bağışı düzenlemek için toplu işlemdeki satırında **Düzenle** düğmesine tıklayın. Tarihi, tutarı, fonu, ödeme yöntemini (Çek, Nakit, Kart veya Ayni) ya da diğer ayrıntıları değiştirebilirsiniz. Ayni bir bağış için düzenleyici, verilen şeyi açıklayabilmeniz için ayrıntı alanını **Ürün** olarak etiketler. Bitirdiğinizde **Kaydet**'e tıklayın.

:::tip
Sayfanın üstündeki toplu işlem adının altındaki satır, girişleri eklediğinizde ya da düzenlediğinizde toplu işlem tarihini, bağış sayısını ve toplam tutarı otomatik olarak gösterir. Bunu yatırma fişinizle mutabakat yapmak için kullanın.
:::

## Bağışı İade Etme

Bir bağışçıdan yanlışlıkla tahsilat yapılmışsa ya da parasını geri isterse, tamamlanmış bir bağışı doğrudan düzenleme ekranından iade edebilirsiniz; ödeme ağ geçidinizin paneline gitmenize gerek yoktur.

1. Bağışı açın ve **Düzenle**'ye tıklayın.
2. Formun altında Sil'in yanındaki **İade Et** düğmesine tıklayın.
3. İletişim kutusunu onaylayın: "Bu bağış ödeme ağ geçidi üzerinden tamamen iade edilsin mi? Bu işlem geri alınamaz."

Bağış, özgün ödeme ağ geçidi üzerinden tamamen iade edilir ve bağış listelerinizde **İade Edildi** olarak işaretlenir.

:::warning
İadeler yalnızca tam iadedir; B1 Admin'den kısmi bir tutar iade etmenin bir yolu yoktur. Onaylandıktan sonra iade de geri alınamaz.
:::

:::info
**İade Et** düğmesi yalnızca çevrimiçi ödenmiş (bir ağ geçidi işlemi olan) ve hâlâ **Tamamlandı** durumunda olan bağışlarda görünür. Elle girilen bağışların (nakit, çek) iade edilecek bir ağ geçidi işlemi yoktur; bunları bunun yerine düzenleyin ya da silin.
:::

## Tek Bir Bağış İçin Makbuz Yazdırma

Biri bir çek bıraktığında, bir etkinlik ya da tişört için ödeme yaptığında ya da ziyaret eden bir kuruluş bağış getirdiğinde, tüm toplu işlem ya da yıl sonu dökümü yerine yalnızca o bağış için bir makbuz yazdırabilirsiniz.

1. Bağışı içeren toplu işlemi açın.
2. Bağışın satırında **Düzenle**'nin yanındaki **Makbuz**'a tıklayın. Bağış Düzenle formunun altındaki **Makbuz**'a da tıklayabilirsiniz.
3. **Yazdır**'a tıklayın ya da geri dönmek için **Kapat**'a tıklayın.

Makbuz, bağış dökümüyle aynı düzeni kullanır: kilisenizin ve bağışçının adı (ya da "Anonim"), bağışın tarihi ve yöntemi, her fon ve tutarı, not, Bağış Notunuz ve bir **Döküm biçimi** ayarladıysanız resmi makbuz bloğu (bkz. [Bağış Dökümleri](giving-statements.md)). Bu bloktaki makbuz numarası bağışın kimliğidir.

:::info
"Mal veya hizmet karşılığı değildir" ifadesi yalnızca bağıştaki her fon vergi indirimine tabi olarak işaretlenmişse yazdırılır. Bağışın herhangi bir kısmı, bir etkinlik ücreti ya da satın alma gibi vergi indirimine tabi olmayan bir fona gittiyse, makbuz bu ifadeyi çıkarır; böylece hayırsever bir bağıştan çok bir ödeme gibi okunur.
:::

:::tip
Çevrimiçi bağışlar zaten otomatik bir teşekkür e-postası alır; makbuz çoğunlukla elle girdiğiniz bağışlar için yararlıdır.
:::

## Sonraki Adımlar

- Doğruluğunu doğrulamak için girişlerinizi [Bağış Raporları](donation-reports.md) ile gözden geçirin
- Yıl sonunda bağışçılarınız için [Bağış Dökümleri](giving-statements.md) oluşturun
