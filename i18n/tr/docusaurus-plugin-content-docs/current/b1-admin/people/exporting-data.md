---
title: "Verileri Dışa Aktarma"
---

# Verileri Dışa Aktarma

<div class="article-intro">

B1 Admin, kilise verilerinizi dışa aktarmanıza olanak tanır. Böylece verileri elektronik tablolarda kullanabilir, ekibinizle paylaşabilir veya yedek olarak saklayabilirsiniz. Yalnızca ad ve e-posta listesine mi yoksa tüm veritabanının dökümüne mi ihtiyacınız olsun, ihtiyacınıza uygun seçenekler mevcuttur.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Dışa aktarmak istediğiniz verileri görüntüleme iznine sahip etkin bir B1 Admin hesabına ihtiyacınız vardır. Erişim düzeyinizden emin değilseniz [Roller ve İzinler](roles-permissions.md) sayfasına bakın.
- Tam veritabanı dökümü için **Ayarlar** alanına erişiminiz olmalıdır.

</div>

## Kişiler Sayfasından Dışa Aktarma

Dizininizi dışa aktarmanın en hızlı yolu doğrudan **Kişiler** sayfasıdır:

1. [Atlama menüsünü](../introduction.md#getting-around-with-the-jump-menu) (B1 Admin'in sol üstündeki arama çubuğu) açın, **Kişiler** bölümünü genişletin ve **Kişiler**'e tıklayın.
2. Dışa aktarmak istediğiniz sonuçları daraltmak için arama çubuğunu veya filtreleri kullanın (ya da herkesi dışa aktarmak için filtre uygulamadan bırakın). Filtreleme ipuçları için [Kişi Arama](searching-people.md) sayfasına bakın.
3. Kişiler sayfası başlığındaki **Dışa Aktar** düğmesine tıklayın.
4. Mevcut sonuçlarınızdaki kişilerin adı, iletişim bilgileri, adresi ve diğer standart alanlarıyla birlikte bir CSV dosyası bilgisayarınıza indirilecektir.

:::tip
Dışa aktarma, mevcut sonuçlarınızdaki herkesi içerir. Yalnızca ihtiyacınız olan kişileri dışa aktarmak için önce bir arama yapın, bir [Kayıtlı Liste](./lists.md) yükleyin veya **Gelişmiş** aramayı kullanın.
:::

## Ayarlar'dan Tam Veri Dışa Aktarma

B1 verilerinizin tamamını (yalnızca kişileri değil) dışa aktarmak için Ayarlar'daki dışa aktarma aracını kullanın:

1. Atlama menüsünde **Ayarlar > Ayarlar** seçeneğini seçin.
2. Sol taraftaki ayarlar menüsünün üst kısmında kilisenizin adının altındaki **İçe/Dışa Aktar** bağlantısına tıklayın.
3. **Veri Kaynağı** açılır menüsünden **B1 Database** seçeneğini seçin.
4. Veri önizlemesini inceleyin ve **Hedefe Devam Et** düğmesine tıklayın.
5. Dışa aktarma hedefi olarak **B1 Export Zip** seçeneğini seçin.
6. Tüm öğeler yeşil onay işareti gösterene kadar dışa aktarma ilerlemesini izleyin.
7. Dışa aktarma dosyası otomatik olarak indirilecektir. İndirilenler klasörünüzde `B1Export` dosyasını arayın.
8. Dosyayı açarak Excel, Google Sheets veya Numbers'ta açabileceğiniz `people.csv` gibi ayrı CSV dosyalarına ulaşın.

:::info
B1 Export Zip, kilise verilerinizin tam yedeğidir. Şunları içerir:

- fotoğraflarıyla birlikte kişiler ve haneler, hane alma kişileri dahil
- kampüsler, ibadetler ve ibadet saatleri
- gruplar ve grup üyeleri
- fonlar ve bağışlar, birden fazla fona bölünmüş bağışlar dahil
- katılım
- formlar, sorular, gönderimler ve yanıtlar
- özel alanlar ve değerleri
- kayıtlı kişi listeleri

Dışa aktarma sırasında bir kişinin fotoğrafı indirilemez veya okunamazsa, o fotoğraf atlanır ve dışa aktarma fotoğrafsız olarak devam eder.

Geri yüklemek için kaynak olarak **B1 Import Zip**, hedef olarak **B1 Database** seçeneğini belirleyin (bkz. [Verileri İçe Aktarma](./importing-data.md)). Haneler, alma kişileri ve kayıtlı listeler, kişilerle birlikte yeniden oluşturulur. Kayıtlı liste filtreleri, geri yüklenen gruplara, fonlara, kampüslere ve özel alanlara yönlendirilir.
:::

## Grup Verilerini Dışa Aktarma

Ayrı ayrı gruplar için üye listelerini de dışa aktarabilirsiniz. **Gruplar** sayfasından bir grup açın ve bu grubun üye listesini dışa aktarmak için **indirme simgesine** tıklayın. Daha fazla bilgi için [Grup Üyeleri](../groups/group-members.md) sayfasına bakın.

:::info
Dışa aktarılan CSV dosyaları Microsoft Excel, Google Sheets ve Apple Numbers dahil tüm büyük elektronik tablo uygulamalarıyla çalışır.
:::
