---
title: "Verileri İçe Aktarma"
description: "Mevcut kişi, grup, katılım ve bağış kayıtlarını B1 Transfer aracıyla B1 Admin'e aktarın ya da verilerinizin yedeğini istediğiniz zaman alın."
---

# Verileri İçe Aktarma

<div class="article-intro">

B1 Transfer aracı, mevcut verilerinizi B1'e kolayca aktarmanızı sağlar. Boş bir sayfadan elektronik tablo ile başlıyor olun, başka bir kilise yönetim platformundan geçiş yapıyor olun ya da bağış kayıtlarını içe aktarıyor olun, bu araç işinizi görür. Ayrıca verilerinizi istediğiniz zaman dışa aktarmak veya yedeklemek için de kullanabilirsiniz.

</div>

## Eğitim Videosu

<YouTube id="G-VnhzACYIU" title="B1'de Kişi Veritabanınızı İçe Aktarma" next="B1'de Kişi Arama ve Liste Oluşturma" nextUrl="/docs/b1-admin/people/searching-people" />

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- **Ayarlar** bölümüne erişimi olan etkin bir B1 Admin hesabına ihtiyacınız var.
- Başlamadan önce verilerinizi önceki sisteminizden dışa aktarmış ve hazır hale getirmiş olun.
- Bu araç ilk veri geçişi için tasarlanmıştır. B1'i zaten bir süredir kullanıyorsanız, yeniden içe aktarma yinelenen kayıtlara yol açabilir.

</div>

## Aktarım Aracına Erişme

1. **B1 Admin**'e giriş yapın.
2. [Atlama menüsünü](../introduction.md#getting-around-with-the-jump-menu) (sol üstteki arama çubuğu) açın, **Ayarlar**'ı genişletin ve **Ayarlar**'a tıklayın.
3. Sol taraftaki ayarlar menüsünün en üstünde, kilisenizin adının altındaki **İçe/Dışa Aktar** bağlantısına tıklayın.
4. Bu işlem **B1 Transfer** aracını yeni bir sekmede [transfer.b1.church](https://transfer.b1.church) adresinde açacaktır.

Aktarım aracı sizi dört adımda yönlendirir: Kaynak, Önizleme, Hedef ve Çalıştır.

---

## 1. Adım - Kaynağınızı Seçin

Verilerinizin nereden geldiğini seçin. Yedi seçenek vardır:

- **B1 Veritabanı** — Verileri doğrudan mevcut B1 kilisenizden çeker. Yedek almak veya verilerinizi başka bir biçime dönüştürmek için kullanışlıdır. Bu seçeneği kullanmak için giriş yapmış olmanız gerekir.
- **B1 İçe Aktarma Zip'i** — B1'in kendi biçimindeki bir zip dosyası. Esas olarak önceki bir B1 dışa aktarımını geri yüklemek için kullanılır. B1 Dışa Aktarma Zip'ini **B1 Veritabanı** seçeneğine yüklemek, dışa aktarımın içerdiği her şeyi geri yükler (bkz. [Verileri Dışa Aktarma](./exporting-data.md#full-data-export-from-settings)). Dosya okunamazsa, araç sıfırdan başlamak yerine hatayı gösterir.
- **Breeze İçe Aktarma Zip'i** — Breeze ChMS'den dışa aktarılan dosyaları içeren bir zip dosyası.
- **Planning Center Zip'i** — Planning Center'dan dışa aktarılmış bir zip veya CSV dosyası.
- **Özel CSV / Excel** — Kişi verilerini içeren herhangi bir CSV veya Excel dosyası. Dosyayı yükledikten sonra, içe aktarma işlemine devam etmeden önce sütunlarınızı B1 alanlarıyla eşleştireceksiniz.
- **Tithe.ly CSV** — Tithe.ly'den alınan bir kişi veya bağış dışa aktarma dosyası (CSV veya Excel biçimi kabul edilir).
- **CCB / Pushpay CSV** — Church Community Builder veya Pushpay'den alınan bir kişi veya bağış dışa aktarma CSV dosyası.

Dosyanızı yükleme alanına sürükleyip bırakabilir veya gözatmak için tıklayabilirsiniz.

---

## 1b. Adım - Alanlarınızı Eşleştirin (Yalnızca Özel CSV / Excel)

**Özel CSV / Excel** seçeneğini seçtiyseniz, dosyanızı yükledikten sonra araç önizlemeye geçmeden önce bir alan eşleştirme ekranı gösterir.

Dosyanızdaki her sütun, örnek bir değerle birlikte listelenir. Her sütun için, eşleşen B1 alanını seçmek üzere açılır listeyi kullanın. Araç "Ad," "E-posta" veya "Posta Kodu" gibi yaygın sütun adlarını otomatik olarak algılar, ancak her satırı gözden geçirip kaçırdığı şeyleri düzeltmelisiniz.

Kullanılabilir B1 alanları şunları içerir:

- Adı, Soyadı, İkinci Adı, Takma Ad, Görünen Ad, Unvan/Önek, Sonek
- E-posta, Ev Telefonu, Cep Telefonu, İş Telefonu
- Adres Satırı 1, Adres Satırı 2, Şehir, Eyalet, Posta Kodu
- Doğum Tarihi, Evlilik Yıldönümü, Cinsiyet, Medeni Durum, Üyelik Durumu
- Hane/Aile Adı
- Grup Adı — kişiyi adına göre bir gruba atar
- **Özel Alan (ada göre eşleştir)** — sütunu kilisenizin [özel kişi alanlarından](../settings/custom-fields.md) birine kaydeder. Sütun başlığıyla doldurulmuş bir **B1 alan adı** kutusu görünür. Bunu, alanın B1'de göründüğü şekilde adıyla değiştirin (büyük/küçük harf fark etmez).
- **Form Yanıtı (özel alan)** — o sütunun değerini kişinin kaydına eklenmiş bir özel alan olarak kaydeder. Bu seçeneği kullanırsanız, forma bir ad vermeniz istenir.

Tarihler `9/17/1994` gibi yaygın biçimlerde olabilir ve otomatik olarak dönüştürülür. Özel alanlar için Evet/Hayır alanları Evet, Hayır, E, H, Doğru, Yanlış, 1 ve 0 gibi değerleri kabul eder; çoktan seçmeli alanlar ise seçenek metnini veya değerini kabul eder.

:::info
Özel kişi alanlarınızı içe aktarmadan önce B1 Admin içinde oluşturun. İçe aktarma tamamlandığında **Özel Alanlar** adımı, bir B1 alanıyla eşleşmeyen sütun adlarını listeler ve alanın türüne uymayan değerleri sayar. Bu değerler atlanır, geri kalan içe aktarma ise tamamlanır.
:::

İçe aktarmak istemediğiniz sütunlar **(Atla)** olarak ayarlanabilir. Devam edebilmeniz için en az bir ad alanının (Adı veya Soyadı) eşleştirilmiş olması gerekir.

Önizlemeye geçmek için **Eşleştirmeyi Onayla ve İçe Aktar** düğmesine tıklayın.

---

## 2. Adım - Verilerinizi Önizleyin

Dosyanızı yükledikten sonra araç, içe aktarılacak her şeyin bir önizlemesini gösterir. Her veri türünü gözden geçirmek için sekmeleri kullanın:

- **Kişiler** — Hanelere göre listelenir, dahil edilmişse fotoğraflarıyla birlikte.
- **Gruplar** — Kampüse, ibadete, saate ve kategoriye göre düzenlenir.
- **Katılım** — Oturum tarihleri, gruplar ve ziyaret sayıları.
- **Bağışlar** — Toplu bağışlar, fonlar, bağışçılar ve tutarlar.
- **Formlar** — Form adları ve içerik türleri.

Devam etmeden önce bunu dikkatle gözden geçirin. Bir şey yanlış görünüyorsa **Baştan Başla** düğmesine tıklayın ve kaynak dosyanızı düzeltin.

---

## 3. Adım - Hedefinizi Seçin

Verilerin nereye gitmesini istediğinizi seçin:

- **B1 Veritabanı** — Doğrudan kilisenizin B1 veritabanına aktarır. Bu seçeneği seçtikten sonra araç, eklenecek kayıtların son sayısını gösterir. Onaylamak için **Aktarımı Başlat** düğmesine tıklayın.
- **B1 Dışa Aktarma Zip'i** — Verilerinizi, daha sonra **B1 İçe Aktarma Zip'i** ile geri yüklenebilecek bir B1 biçimli zip dosyası olarak indirir. Yedekler için idealdir.
- **Breeze Dışa Aktarma Zip'i** — Verilerinizi Breeze biçimine dönüştürür.
- **Planning Center Zip'i** — Verilerinizi Planning Center biçimine dönüştürür.

:::warning
Kaynak ve hedef aynı biçimde olamaz. Eşleşirlerse, araç yanlışlıkla çoğaltmayı önlemek için sizi uyarır.
:::

---

## 4. Adım - Çalıştırın

Araç aktarımı işler ve her adım için ilerlemeyi gösterir:

- Kampüsler, İbadetler ve Saatler
- Kişiler
- Fotoğraflar
- Gruplar ve Grup Üyeleri
- Bağışlar
- Katılım
- Formlar, Sorular, Yanıtlar ve Form Gönderimleri
- Özel Alanlar (özel alan sütunları eşleştirdiyseniz)
- Sıkıştırma (yalnızca zip dosyası hedefleri için)

Hedef **B1 Veritabanı** olduğunda, ilerleme kartının başlığı **İçe Aktarma İlerlemesi** olur ve işlem **İçe Aktarma Tamamlandı!** (veya **İçe Aktarma Hatalarla Tamamlandı**) mesajıyla biter. Zip dosyası hedefleri için aynı mesajlar **Dışa Aktarma** ifadesini kullanır.

:::info
Bir **B1 İçe Aktarma Zip'ini** geri yüklerken, artık dosyada bulunmayan bir şeye işaret eden kayıtlar işlemi durdurmak yerine atlanır: dosyada olmayan kişiler veya gruplar için grup üyelikleri, silinmiş gruplar veya kişiler için katılım ve grupları silinmiş ibadet saatleriyle bağlayan bağlantılar. Hiçbir ibadet saatine bağlanmamış katılım oturumları yine de geri yüklenir. Benzer şekilde, dışa aktarma sırasında indirilemeyen veya okunamayan bir fotoğraf dışarıda bırakılır, böylece **Fotoğraflar** adımı devam eder.
:::

:::warning
Aktarım devam ederken tarayıcınızı kapatmayın. Tüm adımlar tamamlandı olarak gösterilene kadar bekleyin.
:::

---

## Breeze İçe Aktarma Zip'i Hazırlama

1. Breeze'de **Ayarlar**'a gidin ve sol kenar çubuğunda **Dışa Aktar**'a tıklayın.
2. Üç ayrı dosyayı dışa aktarın: **Kişiler**, **Etiketler** ve **Katkılar**.
3. Üç dosyanın tümünü seçin, sağ tıklayın ve tek bir zip dosyasında sıkıştırın.
   - Mac'te: dosyaları seçin, sağ tıklayın ve **Sıkıştır**'ı seçin.
   - PC'de: dosyaları seçin, sağ tıklayın, **Şuraya gönder**'i ve ardından **Sıkıştırılmış (zipli) klasör**'ü seçin.
4. Zip dosyasını 1. Adım'daki **Breeze İçe Aktarma Zip'i** seçeneğini kullanarak yükleyin.

Breeze içe aktarması kişileri, grupları (etiketleri) ve bağış kayıtlarını otomatik olarak aktarır.

---

## Planning Center Dışa Aktarımını Hazırlama

1. Planning Center'a giriş yapın ve **People** ürününü açın.
2. Sol kenar çubuğunda **Lists**'e tıklayın ve aktarmak istediğiniz herkesi içeren bir liste oluşturun. (Tüm cemaatinizin listesi zaten varsa, onu kullanın.)
3. Listeyi açın ve kişilerinizi **CSV** dosyası olarak indirmek için **export** seçeneğini kullanın. Tutmak istediğiniz alanları ekleyin — ad, e-posta, telefon, adres, doğum tarihi, cinsiyet ve üyelik durumu, B1'e aktarılır.
4. Planning Center birden fazla dosya verirse, hepsini seçin, sağ tıklayın ve tek bir zip dosyasında sıkıştırın.
   - Mac'te: dosyaları seçin, sağ tıklayın ve **Sıkıştır**'ı seçin.
   - PC'de: dosyaları seçin, sağ tıklayın, **Şuraya gönder**'i ve ardından **Sıkıştırılmış (zipli) klasör**'ü seçin.
5. CSV dosyasını veya zip dosyasını 1. Adım'daki **Planning Center Zip'i** seçeneğini kullanarak yükleyin.

Yükledikten sonra önizlemeye geçin ve içe aktarmayı çalıştırmadan önce kişilerinizin ve hanelerinizin doğru göründüğünü onaylayın.

---

## Tithe.ly Dışa Aktarımını Hazırlama

1. Tithe.ly'de **People** verilerinizi CSV veya Excel dosyası olarak dışa aktarın. Bağış kayıtlarını içe aktarmak istiyorsanız ayrı bir **Giving** dosyası da dışa aktarabilirsiniz.
2. Araç, sütun adlarına bakarak dosyanın kişi mi yoksa bağış verisi mi içerdiğini otomatik olarak algılar.
3. 1. Adım'daki **Tithe.ly CSV** seçeneğini kullanarak dosyayı yükleyin.

:::info
Tithe.ly dışa aktarımları bir seferde bir dosya olarak içe aktarılabilir. Kişileri ve bağış kayıtlarını ayrı ayrı içe aktarmanız gerekiyorsa işlemi iki kez çalıştırın.
:::

---

## CCB veya Pushpay Dışa Aktarımını Hazırlama

1. Church Community Builder veya Pushpay'de **People** verilerinizi CSV dosyası olarak dışa aktarın. Ayrı bir bağış/katkı dosyası da dışa aktarabilirsiniz.
2. Araç, sütun adlarına bakarak dosyanın kişi mi yoksa bağış verisi mi içerdiğini otomatik olarak algılar.
3. 1. Adım'daki **CCB / Pushpay CSV** seçeneğini kullanarak dosyayı yükleyin.

---

## İçe Aktarmadan Sonra

Aktarım tamamlandığında, verilerinizi doğrulamak için birkaç dakika ayırın:

1. [Kişiler](../people/adding-people.md) sayfasına gidin ve birkaç profili rastgele kontrol edin.
2. Adların, e-postaların, telefon numaralarının ve adreslerin doğru aktarıldığını doğrulayın.
3. Hane bağlantılarının sağlam olduğunu kontrol edin. Kaynakta varsa, her kişinin hane rolü (Baş, Eş, Çocuk veya Diğer) aktarılır: B1 İçe Aktarma Zip'inde **householdRole** sütunu, Breeze veya Tithe.ly'de **Family Role**, CCB / Pushpay'de ise **Family Position**. "Head of Household", "Primary", "Wife" veya "Son" gibi roller eşleşen B1 rolüne dönüştürülür. Planning Center ve Özel CSV / Excel içe aktarmalarında rol sütunu yoktur, bu yüzden bu kişilere **Diğer** atanır; rolü, kişinin hanesinden [Kişiler](../people/adding-people.md#managing-households) sayfasında değiştirebilirsiniz.
4. İçe aktarılan grupları ve bağış kayıtlarını gözden geçirin.

Bir sorun fark ederseniz, bireysel profilleri Kişiler sayfasından düzenleyebilirsiniz. Ayrıca yedek olarak [verilerinizi dışa aktarmak](exporting-data.md) için aktarım aracını yeniden çalıştırabilirsiniz.
