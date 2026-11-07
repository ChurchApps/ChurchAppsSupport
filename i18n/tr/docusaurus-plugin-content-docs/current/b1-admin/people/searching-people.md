---
title: "Kişileri Arama"
---

# Kişileri Arama

<div class="article-intro">

**Kişiler** sayfası, kilise dizininizi aranabilir hane listesi veya sıralanabilir kişi tablosu olarak görüntüler. Cemaatinizdeki herkesi hızlıca bulabilir, hangi bilgilerin gösterileceğini özelleştirebilir ve sonuçlarınızı dışa aktarabilirsiniz. Verimli arama, ziyaretçilerle iletişime geçmek, iletişim listeleri hazırlamak ve üye kayıtlarını yönetmek gibi günlük kilise yönetimi görevleri için temel önem taşır.

</div>

## Eğitim Videosu

<YouTube id="7Y-tN9RmnDQ" title="B1'de Kişileri Arama ve Liste Oluşturma" next="B1'de Özel Alanlar, Toplu Düzenleme ve Dışa Aktarma" nextUrl="/docs/b1-admin/settings/custom-fields" />

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Kişileri görüntüleme iznine sahip etkin bir B1 Admin hesabına ihtiyacınız var. Erişim düzeyinizden emin değilseniz [Roller ve İzinler](roles-permissions.md) sayfasına bakın.
- Kilise dizininizde kişiler bulunmalıdır. Henüz kimse eklemediyseniz [Kişi Ekleme](adding-people.md) veya [Veri İçe Aktarma](importing-data.md) sayfalarına bakın.

</div>

## Haneler ve Tablo Görünümleri

Kişiler sayfası dizininizi **hane** bazında, alfabetik olarak gruplandırılmış şekilde listeler. Her satırda hanenin fotoğrafları, adı (örneğin "Smith Ailesi") ve içindeki herkesin adları gösterilir. Hanenin profilini açmak için bir haneye, belirli bir üyeyi açmak için de o kişinin adına tıklayabilirsiniz. Listenin üstündeki sayaç, kaç hane ve kaç kişinin görüntülendiğini gösterir.

Listenin üstündeki **Görünüm** anahtarını kullanarak **Haneler** ve **Tablo** arasında geçiş yapabilirsiniz. **Tablo** görünümü her satırda bir kişi listeler ve sütunları sıralayıp seçebileceğiniz yerdir (aşağıya bakın). B1, seçiminizi o cihazda hatırlar.

**Tablo** görünümünde her kişinin üyelik durumu adının altında görünür. Yedi durumun her birinin kendine ait bir rengi vardır; bu renk kişinin profilinde kullanılandır. Hane rolü **Çocuk** olarak ayarlanmış herkesin durumunun yanında ayrıca bir **Çocuk** etiketi bulunur. Birini çocuk olarak işaretlemek için, kişinin profilindeki [hane paneli](./adding-people.md#managing-households) üzerinden rolünü ayarlayın.

Varsayılan olarak sayfa dizininizin ilk bölümünü yükler. Daha fazla kişiniz varsa, herkesi yüklemek için listenin altındaki **Tüm Üyeleri Göster** düğmesine tıklayın.

## Hızlı Arama

Kişiler sayfasının üst kısmındaki **Hane veya kişi bulun** kutusu, üyeleri anlık olarak bulmanızı sağlar:

1. Kişiler sayfasının üstündeki **arama kutusuna** tıklayın.
2. Bir ad yazmaya başlayın.
3. Yazdıkça sonuçlar otomatik olarak filtrelenir (arama her tuş vuruşunda çalışmasın diye yaklaşık yarım saniyelik kısa bir gecikme vardır).
4. Aşağıdaki liste yalnızca eşleşen sonuçları gösterecek şekilde güncellenir.

Aramayı sıfırlamak ve tüm dizininizi yeniden görmek için arama kutusunun altındaki **Temizle** düğmesine tıklayın.

:::tip
Enter tuşuna basmanıza gerek yoktur. Yazmayı bıraktıktan sonra arama otomatik olarak çalışır.
:::

## Sonuçları Sıralama

**Tablo** görünümünde kişiler soyadına, sonra adına göre listelenir. Herhangi bir sütun başlığına tıklayarak dizini farklı bir şekilde sıralayabilirsiniz:

1. Bu sütuna göre sıralamak için bir **sütun başlığına** (örneğin **Ad** veya **E-posta**) tıklayın.
2. Sıralama düzenini tersine çevirmek için aynı başlığa tekrar tıklayın.

Bu, kişileri alfabetik olarak, yaşa göre veya görünen herhangi bir sütuna göre kolayca bulmanızı sağlar.

## Sütunları Özelleştirme

Her bilginin aynı anda görünmesi gerekmez. Tabloda hangi sütunların görüneceğini seçebilirsiniz:

1. Kişiler sayfası başlığındaki **Sütunları seç** simgesine tıklayın. (Sütunlar **Tablo** görünümü için geçerlidir.)
2. Sütunları göstermek veya gizlemek için işaretleyin ya da işaretini kaldırın. Kullanılabilir sütunlar şunlardır:
   - **Fotoğraf**
   - **Ad**
   - **E-posta**
   - **Telefon**
   - **Adres**
   - **Doğum Tarihi**
   - **Yaş**
   - **Cinsiyet**
   - **Üyelik Durumu**
   - **Kampüs**
   - **Eklenme Tarihi** -- kişinin kaydının oluşturulduğu tarih
3. Tablo seçimlerinizi hemen yansıtacak şekilde güncellenir. **Sütunları Seç** iletişim kutusunu kapatmak için **Bitti** düğmesine tıklayın.

### Özel Alanları Sütun Olarak Gösterme

Sütun seçicinin iki sekmesi vardır: **Standart** yukarıda listelenen yerleşik sütunları içerir, **Özel** ise kilisenizin [Özel Alanlarını](../settings/custom-fields.md) ve Kişi formlarındaki soruları içerir. Bir özel alanı sütun olarak eklemek için **Özel** sekmesinde işaretleyin; her kişinin o alan için girdiği değer tabloda görünür. Değerler, kişinin profilinde olduğu gibi gösterilir -- Evet/Hayır alanları *Evet* veya *Hayır* olarak okunur, Çoktan Seçmeli alanlar seçeneğin etiketini gösterir ve tarihler kısa tarih biçiminde gösterilir. Alan için değeri olmayan kişilerde hücre boş görünür.

## Arama Sonuçlarını Dışa Aktarma

Mevcut arama sonuçlarınızı istediğiniz zaman CSV dosyası olarak indirebilirsiniz:

1. İstediğiniz aramayı veya filtreleri uygulayın.
2. Kişiler sayfası başlığındaki **Dışa Aktar** düğmesine tıklayın.
3. Bilgisayarınıza bir CSV dosyası indirilir; bu dosyayı Excel, Google E-Tablolar veya herhangi bir e-tablo uygulamasında açabilirsiniz.

Dışa aktarma hakkında daha fazla ayrıntı için [Verileri Dışa Aktarma](./exporting-data.md) sayfasına bakın.

:::tip
Daha gelişmiş sorgular için -- örneğin son üç aydır katılmayan herkesi bulmak gibi -- düz dille sorular sorabileceğiniz [AI Arama](./ai-search.md) özelliğini deneyin.
:::

## Gelişmiş Arama

Gelişmiş Arama, koşulları birleştirerek hassas filtreler oluşturmanızı sağlar. Kişiler sayfasında arama kutusunun altındaki **Gelişmiş** düğmesine tıklayarak açın, ardından bir kategoriyi genişletip filtrelemek istediğiniz alanları işaretleyin (alanın adına veya onay kutusuna tıklayabilirsiniz). Her alan için bir işleç ve değer seçin. Kategoriler şunlardır: **Adlar**, **Demografik**, **İletişim**, **Üyelik**, **Etkinlik** (bağışlar ve katılım) ve **Özel Alanlar**.

Yeni kişileri bulmak için **Üyelik** kategorisini açın ve **Eklenme Tarihi** seçeneğini işaretleyin. Varsayılan olarak **son N gün içinde** seçeneğiyle başlar ve 30 değeri dolu gelir; böylece son bir ay içinde eklenen herkesi tek tıklamayla bulabilirsiniz. Gün sayısını değiştirebilir ya da bir tarih seçmek için *eşittir / sonra / önce* seçeneğine geçebilirsiniz. **Doğum Tarihi** ve **Evlilik Yıldönümü** alanları da **son N gün içinde** seçeneğini sunar. Eklenme Tarihi yalnızca Ekim 2026'nın sonundan itibaren oluşturulan kişiler için kaydedilir; daha önce eklenen kişilerin bu tarihi yoktur, bu nedenle bu filtre onları bulamaz.

**Özel Alanlar** kategorisi, kilisenizin [Özel Alanlarını](../settings/custom-fields.md) listeler -- yani kendi bilgilerinizi (örneğin bir arka plan kontrolünün son geçerlilik tarihi gibi) takip etmek için Ayarlar'da tanımladığınız alanlar. Sunulan işleçler her alanın türüne uygundur: metin alanları *içerir / eşittir / ile başlar / ile biter* seçeneklerini, sayı alanları karşılaştırma işleçlerini, tarih alanları *eşittir / sonra / önce* seçeneklerini destekler; Evet/Hayır ve Çoktan Seçmeli alanlarda ise bir değer seçebilirsiniz. Burada filtreleyebildiğiniz her alan, canlı bir [Liste](./lists.md) olarak kaydedilebilir.

## Aramaları Liste Olarak Kaydetme

Bir arama çalıştırdıktan sonra Kişiler sayfası başlığında **Liste Olarak Kaydet** düğmesi görünür. Bu düğmeye tıklayarak mevcut sorgunuzu bir ad ve isteğe bağlı bir kategoriyle kaydedebilirsiniz; böylece gelecekteki oturumlarda anında yeniden yükleyebilirsiniz. Ayrıntılar için [Kayıtlı Listeler](./lists.md) sayfasına bakın.
