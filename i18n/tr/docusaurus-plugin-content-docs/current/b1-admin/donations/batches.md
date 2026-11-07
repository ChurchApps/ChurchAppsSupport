---
title: "Bağış Grupları"
---

# Bağış Grupları

<div class="article-intro">

Gruplar, bağışlarınızı daha kolay takip edip uzlaştırabilmeniz için bir araya getirir. Tipik bir grup tek bir toplamayı temsil eder, örneğin bir Pazar sunusunu veya özel bir etkinliği. Grupları kullanmak düzeninizi korumanıza yardımcı olur ve kayıtlarınızın gerçek banka yatırmalarıyla eşleştiğini kolayca doğrulamanızı sağlar.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Bağışları kaydederken kullanabilmek için [fonlarınızı ayarladığınızdan](funds.md) emin olun
- Gruplar sayfasını görebilmek için **Bağış Özetlerini Görüntüle**, **Bağışları Düzenle** veya **Bağış Girme** iznine ihtiyacınız olacak (bkz. [Bir Grubu Kimler Değiştirebilir](#who-can-change-a-batch))

</div>

## Gruplar Sayfası

**Bağışlar > Gruplar** bölümüne gittiğinizde gruplarınızın bir listesini göreceksiniz. Her satırda şunlar görüntülenir:

- **Ad** -- grup için verdiğiniz etiket
- **Tarih** -- toplamanın tarihi
- **Bağışlar** -- gruptaki bireysel bağışların sayısı
- **Toplam** -- birleşik dolar tutarı
- **Durum** -- **Açık** veya **Kapalı** (bkz. [Bir Grubu Kapatma ve Yeniden Açma](#closing-and-reopening-a-batch))

Listenin üstündeki yıl düğmeleri yalnızca tek bir yılın gruplarını veya **Tümü** seçeneğiyle tüm grupları göstermenizi sağlar. Tek satırlık bir özet, gösterilen grupların sayısını, bağış sayısını ve toplam tutarını gösterir.

## Yeni Grup Oluşturma

1. Sayfanın üstündeki **Grup Ekle** düğmesine tıklayın.
2. Açıklayıcı bir ad girin (ör. "Pazar Sunusu - 9 Şub").
3. Toplamanın tarihini seçin.
4. **Kaydet** düğmesine tıklayın.

Yeni grubunuz listede görünür ve bağış eklemeye hazır olur.

## Gruplarla Çalışma

- **Bağışları görüntüleme** -- bir grubun adına tıklayarak açın ve içerdiği tüm bireysel bağışları görün. Buradan bağış ekleyebilir, düzenleyebilir veya kaldırabilirsiniz. Ayrıca bir e-tablodan tek seferde birçok bağış eklemek için **CSV İçe Aktar** düğmesine tıklayabilirsiniz (bkz. [CSV Dosyasından Bağış İçe Aktarma](recording-donations.md#importing-donations-from-a-csv-file)).
- **Grup ayrıntılarını düzenleme** -- adını veya tarihini değiştirmek için bir grup satırındaki **Düzenle** düğmesine tıklayın. Bir grubu yalnızca **Bağışları Düzenle** iznine sahip kişiler silebilir.
- **Sıralama** -- grupları ada veya tarihe göre sıralamak için sütun başlıklarını kullanın.
- **Dışa aktarma** -- gösterilen grupları e-tablo (CSV) olarak indirmek için sayfanın üstündeki **Dışa Aktar** düğmesine tıklayın.
- **Başarısız olaylar** -- ödeme sağlayıcınız sorun bildirdiyse, sayfanın üstünde çözülmemiş olay sayısını gösteren bir **Başarısız olaylar** düğmesi belirir. Bu düğmeye tıklayarak grupların altındaki olay listesini gösterebilir veya gizleyebilirsiniz.
- **Stripe'tan içe aktarma** -- sayfanın üstündeki **Eksik Stripe işlemlerini içe aktar** düğmesine tıklayarak [Stripe İçe Aktarma](stripe-import.md) aracını açın. Bu düğme yalnızca kilisenizin bağış ağ geçidi Stripe ise görünür.

## Her Bağışı Kimin Girdiği

Bir gruba girilen her bağışta, bağışçının adının altında **Giren** ve kişinin adı gösterilir. Böylece imza listesine ihtiyaç duymadan bağışı kimin girdiğini anlayabilirsiniz. B1 bunu oturum açmış kullanıcıdan otomatik olarak kaydeder ve bağışı daha sonra düzenlemek bu bilgiyi değiştirmez. **CSV İçe Aktar** ile eklenen bağışlarda ise içe aktarmayı yapan kişi gösterilir.

Çevrimiçi bağışlar, [Stripe İçe Aktarma](stripe-import.md) aracıyla eklenen bağışlar ve Kasım 2026'da bu özellik eklenmeden önce girilen bağışlar bir ad göstermez.

## Bir Grubu Kapatma ve Yeniden Açma

Bir grup sayıldıktan ve yatırıldıktan sonra, bağışlarının kapatıldığı andaki gibi kalması için grubu kapatın.

1. Grubu açın.
2. Sayfanın üstündeki **Grubu Kapat** düğmesine tıklayın.

Grup adının yanındaki durum etiketi **Açık**tan **Kapalı**ya döner, Gruplar sayfasındaki **Durum** sütununda grup **Kapalı** olarak görünür ve grubun üstünde kapatıldığını bildiren bir uyarı belirir. Bir grup kapalıyken **Bağış Girme** iznine sahip kişiler grubu görüntüleyebilir, ancak bağış ekleyemez, düzenleyemez veya silemez ve grubun adını ya da tarihini değiştiremez.

Değişiklik yapmak için grubu açın ve **Grubu Yeniden Aç** düğmesine tıklayın. Yeni gruplar her zaman açık olarak başlar.

:::info
**Grubu Kapat** ve **Grubu Yeniden Aç** düğmelerini yalnızca **Bağışları Düzenle** iznine sahip kişiler görür. Bu kişiler, bir düzeltme gerektiğinde grubu yeniden açmadan kapalı bir gruptaki bağışları da değiştirebilir.
:::

## Bir Grubu Kimler Değiştirebilir

Bir kişinin grupla çalışmasına izin veren iki [rol izni](../settings/roles-permissions.md) vardır:

- **Bağışları Düzenle** -- tam erişim: grupları ekleme ve silme, kapatma ve yeniden açma, grup açık veya kapalı olsun herhangi bir bağışı ekleme, düzenleme veya silme.
- **Bağış Girme** -- bağışları sayan ve kaydeden sayım ekipleri ile gönüllüler için. Gruplar ekleyebilir ve bağış ekleyebilir, düzenleyebilir veya silebilir, ancak bu yalnızca grup açıkken yapılabilir. Grupları silemez, kapatıp yeniden açamaz ve çevrimiçi bağışlarla gelen bağışları değiştiremezler.

**Bağış Girme** iznine sahip ama **Bağış Özetlerini Görüntüle** iznine sahip olmayan bir kişi, B1 Admin menüsünde doğrudan Gruplar sayfasına giden **Bağışlar** seçeneğini görür. **Özet**, **Fonlar**, **Kampanyalar** ve **Bağış Ekstreleri** bu kişilerden gizli kalır. Bir grubu açıp içindeki bağışları görebilmek için rolün ayrıca **Bağışları Görüntüle** iznine de ihtiyacı vardır.

:::tip
Yaygın bir kurulum, **Bağış Girme** ve **Bağışları Görüntüle** izinlerine sahip bir "Sayım Ekibi" rolü ile, yatırma işlemi uzlaştırıldıktan sonra her grubu kapatan ve **Bağışları Düzenle** iznine sahip bir sayman kullanmaktır.
:::

## Bir Grubu Yazdırma

Bir grubu açın ve sayım ekibiniz veya yatırma kayıtlarınız için kağıt bir kopya yazdırmak amacıyla bağış listesinin üstündeki **Yazdır** düğmesine tıklayın. Çıktı şunları içerir:

- Kilisenizin antetini -- logonuz ([Web Sitesi > Görünüm](../website/appearance.md) bölümünden yüklediyseniz **Açık Arka Plan Logosu**) ve altında kilisenizin adı; ardından grubun adı ve grup tarihi
- Gruptaki her bağış; bağışçının adı, kimin girdiği, yöntem, notlar, tarih ve tutar ile birlikte (iadesi yapılan bağışlar üstü çizilir ve iade edildi olarak işaretlenir)
- **Fon Ara Toplamları** -- gruptaki her fona verilen toplam tutar
- **Grup Toplamı** -- tüm grubun birleşik tutarı

**Yazdır** düğmesi yalnızca grupta en az bir bağış olduğunda görünür.

### Birden Fazla Grubu Aynı Anda Yazdırma

Bir dönemdeki tüm grupları tek seferde yazdırmak için -- örneğin geçen ayın tüm yatırmaları -- **Gruplar** sayfasının üstünde, **Dışa Aktar** düğmesinin yanındaki **Yazdır** düğmesine tıklayın. **Grupları Yazdır** sayfası açılır ve ekrandaki gruplarla eşleşen bir **Başlangıç Tarihi** ile **Bitiş Tarihi** gösterir: seçtiğiniz yılın 1 Ocak'ından 31 Aralık'ına kadar veya **Tümü** seçiliyken en erken grup tarihinden en geç grup tarihine kadar. Farklı bir aralık seçmek için bu tarihlerden birini değiştirebilirsiniz.

Belirtilen aralıktaki (başlangıç ve bitiş tarihleri dahil) her grup, tek bir grubun çıktısıyla aynı düzende, her sayfada bir grup olacak şekilde tarih sırasına göre yazdırılır. Hiç bağışı olmayan gruplar dahil edilmez. Aralıktaki hiçbir grubun bağışı yoksa "Bu tarih aralığında bağışı olan grup yok." uyarısını görürsünüz. Tarayıcınızın yazdırma iletişim kutusunu açmak için **Yazdır**, grup listesine dönmek için **Kapat** düğmesine tıklayın.

## Bir Grubu QuickBooks Online'a Dışa Aktarma

Bir grubu açın ve **QuickBooks için dışa aktar** düğmesine tıklayarak grubu, QuickBooks Online'ın içe aktarabileceği bir yevmiye kaydı olarak indirin (**Ayarlar > Verileri İçe Aktar > Yevmiye Kayıtları**). Dosya, grup toplamı için **Yatırılmamış Fonlar** hesabına bir borç kaydı ve her fon için, fonun adını hesap adı olarak kullanan bir alacak kaydı içerir. QuickBooks içe aktarma sırasında bu adları hesap planınızla eşleştirmenizi ister. Bu nedenle fonlarınızı muhasebecinizin gelir hesaplarını adlandırdığı şekilde adlandırın veya içe aktarma sırasında bir kez eşleştirin.

:::tip
Grupları daha sonra kolayca bulabilmeniz için tutarlı bir biçimde adlandırın. Tarihi ve toplama türünü eklemek (ör. "Pazar Sabahı - 2025-02-09") liste büyüdükçe düzenli kalmasını sağlar.
:::

## Sonraki Adımlar

Bir grubunuz olduğunda, ona tek tek bağış eklemeyi öğrenmek için [Bağış Kaydetme](recording-donations.md) sayfasına bakın. Ayrıca çevrimiçi bağışlardan otomatik olarak grup oluşturmak için [Stripe işlemlerini içe aktarabilirsiniz](stripe-import.md).
