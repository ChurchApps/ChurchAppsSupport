---
title: "Özel Alanlar"
---

# Özel Alanlar

<div class="article-intro">

**Özel Alanlar** sayesinde her kişi kaydında kendi bilgilerinizi takip edebilirsiniz. Arka plan kontrolünün son geçerlilik tarihi, tişört bedeni veya vaftiz dersi durumu gibi B1'de hazır bir alanı bulunmayan bilgiler bunlara örnektir. Bir alanı Ayarlar'da bir kez tanımlarsınız, ardından her kişinin profiline bir değer girer ve bu alana göre arama yapabilir ya da liste oluşturabilirsiniz. Bu yöntem, tek bir özel veriyi saklamak için Kişi formu oluşturmanın eski geçici çözümünün yerini alır.

</div>

## Eğitim Videosu

<YouTube id="yUfDEbp2HQ4" title="B1'de Özel Alanlar, Toplu Düzenleme ve Dışa Aktarma" next="B1'de Grup Oluşturma ve Üye Ekleme" nextUrl="/docs/b1-admin/groups/creating-groups" />

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Alan tanımlamak ve değer girmek için **Kişiler** düzenleme iznine ve **Ayarlar** alanına erişime ihtiyacınız vardır. Kişiler görüntüleme iznine sahip herkes değerleri görebilir. Bkz. [Roller ve İzinler](./roles-permissions.md).
- Başlamadan önce neyi takip etmek istediğinize karar verin ve en uygun türü seçin (metin, sayı, tarih, evet/hayır yanıtı veya seçim listesi).

</div>

## Özel Alanlar'ı Açma

B1 Admin'de [Atlama menüsünü](../introduction.md#getting-around-with-the-jump-menu) (sol üstteki arama çubuğu) açın, **Ayarlar > Ayarlar** seçeneğini belirleyin ve sol taraftaki listeden **Özel Alanlar**'a tıklayarak **Özel Alanlar** bölümüne gidin. Doğrudan **/settings/custom-fields** adresinden de ulaşabilirsiniz. Tanımladığınız tüm alanların listesini, **Ad** ve **Alan Türü** sütunlarıyla birlikte göreceksiniz. Henüz alan oluşturmadıysanız panelde *"Henüz özel alan eklenmedi."* yazısı görünür.

## Alan Ekleme

1. **Alan Ekle** düğmesine tıklayın.
2. Sağda açılan düzenleyicide bir **Ad** girin. Bu ad, personelin kişi profillerinde ve aramada göreceği etikettir (örneğin *Arka plan kontrolü sona eriyor*).
3. Bir **Alan Türü** seçin:
   - **Metin kutusu**: Serbest biçimli kısa metin.
   - **Tam Sayı**: Ondalık içermeyen sayılar (örneğin bir sayım).
   - **Ondalık**: Ondalık bölümü olabilen sayılar.
   - **Tarih**: Takvim tarihi.
   - **Evet/Hayır**: Basit bir evet veya hayır yanıtı.
   - **Çoktan Seçmeli**: Seçim listesi. Bu türü seçtiğinizde, kişilerin seçebileceği her seçeneği ekleyebileceğiniz bir **seçenek düzenleyici** açılır.
4. **Kaydet** düğmesine tıklayın.

Alan artık her kişinin profilinde kullanılabilir.

:::info
Alan türleri, [form sorularında](../forms/creating-forms.md) kullanılan türlerle aynıdır. Bu sayede değerler B1 genelinde tutarlı şekilde davranır.
:::

## Alanı Düzenleme

Listedeki herhangi bir alan satırına tıklayarak alanı düzenleyicide yeniden açın. Adı, türünü veya seçenekleri değiştirip **Kaydet** düğmesine tıklayın.

:::warning
Zaten değer içeren bir alanın **Alan Türü** değiştirilirse (örneğin Metin kutusundan Tarih'e), önceden girilmiş değerler yeni türle uyuşmayan bir biçimde kalabilir. Personel alanı doldurmaya başladıktan sonra türleri dikkatle değiştirin.
:::

## Alanı Silme

Bir alanı düzenlemek için açın ve **Sil** düğmesine tıklayın. Onay istenecektir: *"Bu özel alanı silmek istediğinizden emin misiniz? Kayıtlı değerleri de kaldırılacaktır."* Bir alanı silmek, alanı ve **bu alan için tüm kişilerde saklanan tüm değerleri** kalıcı olarak kaldırır. Bu işlem geri alınamaz.

## Bir Kişi İçin Değer Girme

En az bir özel alan oluşturulduğunda, değerleri her kişinin kaydındaki yerleşik bilgilerin hemen yanında yer alır. Değerleri, profilin solundaki iletişim bilgilerinin yanında görüntüler ve kişinin diğer bilgilerini düzenlediğiniz formda düzenlersiniz. İlk alanınızı tanımlayana kadar ek bir şey görünmez.

1. **Kişiler** bölümünde bir kişinin kaydını açın.
2. Profilin solunda, kişinin iletişim bilgilerinin altındaki **Düzenle** düğmesine tıklayın.
3. Düzenleme formunun altındaki **Özel Alanlar** bölümüne gidin ve her alan için bir değer girin. Her alan, türüne uygun girişi gösterir: Tarih alanları için tarih seçici, Evet/Hayır alanları için açılır liste, Çoktan Seçmeli alanlar için seçim listesi gibi.
4. **Kaydet** düğmesine tıklayın. Özel alan değerleri, kişinin diğer bilgileriyle birlikte kaydedilir.

Profile döndüğünüzde, değeri olan her alan kişinin iletişim bilgilerinin altında *Alan adı: değer* biçiminde görünür (Evet/Hayır yanıtları *Evet* veya *Hayır* olarak, Çoktan Seçmeli alanlar ise seçeneğin etiketi olarak gösterilir). Boş bırakılan alanlar gizlenir. Bir değeri kaldırmak için kişiyi düzenleyin, alanı temizleyip kaydedin. Boş değer, kayıtta boş olarak saklanmak yerine silinir.

:::tip
Klasik kullanım örneği gönüllü güvenliğidir: *Arka plan kontrolü sona eriyor* adında bir **Tarih** alanı oluşturun, her gönüllünün tarihini kaydedin ve ardından tarihi geçmiş kişileri işaretleyen bir [Kayıtlı Liste](../people/lists.md) oluşturun.
:::

## Özel Alanlara Göre Arama ve Liste Oluşturma

Özel alanlarda tam arama yapılabilir:

1. **Kişiler** sayfasında [Gelişmiş Arama](../people/searching-people.md) bölümünü açın.
2. **Özel Alanlar** kategorisini genişletin.
3. Filtrelemek istediğiniz alanı işaretleyin, bir işleç seçin ve bir değer girin. Sunulan işleçler alanın türüne göre değişir:
   - **Metin kutusu**: içerir, eşittir, şununla başlar, şununla biter.
   - **Tam Sayı / Ondalık**: eşittir, büyüktür, büyük veya eşittir, küçüktür, küçük veya eşittir.
   - **Tarih**: eşittir, sonra (büyüktür), önce (küçüktür).
   - **Evet/Hayır**: Evet veya Hayır'a eşittir.
   - **Çoktan Seçmeli**: seçeneklerden birine eşittir veya seçeneklerden birini içerir.

Özel alan aramalarını [Liste](../people/lists.md) olarak kaydedebilirsiniz. Listeler canlı sorgulardır, bu nedenle *Arka plan kontrolü sona eriyor, bugünden önce* koşuluyla oluşturulan bir liste, her açtığınızda tüm kişileri yeniden kontrol eder. Bu işlem için elle bir güncelleme yapmanız gerekmez.

## Özel Alanı Sütun Olarak Gösterme

Bir alanın değerlerini herkes için aynı anda görmek istiyorsanız, bu alanı **Kişiler** sayfasında bir sütun olarak ekleyin. **Görüntüleme** seçeneğini **Tablo** olarak değiştirin, sayfa başlığındaki **Sütunları seç** simgesine tıklayın, **Özel** sekmesine geçin ve alanı işaretleyin. Her kişinin değeri, yerleşik sütunların yanında kendi sütununda görünür. Bkz. [Özel Alanları Sütun Olarak Gösterme](../people/searching-people.md#showing-custom-fields-as-columns).

## Birleştirme Sırasında Ne Olur

[İki kişi kaydını birleştirdiğinizde](../people/adding-people.md) özel alan değerleri otomatik olarak aktarılır. Tutulan kişi kendi değerlerini korur. Yalnızca kaldırılan kişide değeri bulunan alanlarda ise bu değer kopyalanır, böylece hiçbir veri kaybolmaz.

## İlgili Makaleler

- [Kişileri Arama](../people/searching-people.md): Özel Alanlar kategorisi dahil gelişmiş arama ve özel alanları sütun olarak gösterme
- [Kayıtlı Listeler](../people/lists.md): Özel alan aramasını kaydetme ve canlı olarak yeniden çalıştırma
- [Roller ve İzinler](./roles-permissions.md): Alan tanımlayabilen ve değer düzenleyebilen kişiler
- [Form Oluşturma](../forms/creating-forms.md): Tek alanlar yerine tam bir formun daha uygun olduğu, birden fazla soruyla veri toplama için
