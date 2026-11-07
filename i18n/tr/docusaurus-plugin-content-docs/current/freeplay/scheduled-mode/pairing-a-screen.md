---
title: "Ekran Eşleştirme"
description: "FreePlay Admin'de bir FreePlay TV'yi, TV'deki dört harfli kodu kullanarak ekran grubu takvimine eşleştirin; böylece zamanlanmış içeriği kendiliğinden oynatır."
---

# Ekran Eşleştirme

<div class="article-intro">

Bir televizyonu takvime eklemek için onu **FreePlay Admin** ile eşleştirin. Televizyon dört harfli bir kod gösterir. Bu kodu [admin.freeplay.church](https://admin.freeplay.church) adresine girin ve televizyonun takibi gereken ekran grubunu seçin. Bunu her televizyon için yalnızca bir kez yapmanız gerekir.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- FreePlay'i televizyona yükleyin ve başlatın. Bkz. [Başlarken](../getting-started/index.md)
- FreePlay Admin'e giriş yapabilmek için kilisenizin ChurchApps hesabına sahip olun
- İsteğe bağlı olarak, televizyonun hemen oynatacak bir şeyi olması için önce [bir oynatma listesi oluşturun](./building-playlists.md) ve [bunu zamanlayın](./scheduling-the-calendar.md)

</div>

## Kodu Televizyonda Gösterme

1. Televizyonda, kenar çubuğunun altındaki **Ayarlar**'ı açın.
2. **Bir takvime eşleştir**'i seçin. Televizyon henüz eşleştirilmemişse satırda **Eşleştirilmedi** yazar.
3. **Bu ekranı eşleştir** ekranında bir QR kodu ve dört harfli bir eşleştirme kodu görünür. Ayrıca **Telefonunuzla tarayın veya freeplay.church/pair adresine gidip bu kodu girin** mesajı yer alır.
4. Kodun altında, FreePlay eşleştirmeyi tamamlamanızı beklerken **Onay bekleniyor** yazısı yanıp söner.

Kodun geçerlilik süresi 15 dakikadır ve kodun altındaki geri sayım kalan süreyi gösterir. Süre dolduğunda FreePlay kendiliğinden yeni bir kod gösterir. Yeni bir kod almak için **Yeni Kod Oluştur**'a, Ayarlar'a dönmek için ise **İptal**'e dokunabilirsiniz.

## FreePlay Admin'de Eşleştirme

1. QR kodunu telefonunuzla tarayın veya herhangi bir bilgisayarda ya da telefonda **freeplay.church/pair** adresine gidin. İstenirse giriş yapın. FreePlay Admin, eşleştirme kodu zaten doldurulmuş olarak **Ekranı eşleştir** formunu açar.
   - Formu kendiniz de açabilirsiniz. FreePlay Admin'de **Ekranlar**'a gidin ve **Ekranı eşleştir**'e tıklayın.
2. **Eşleştirme kodunu** kontrol edin. Televizyondaki dört harftir.
3. Bu televizyonu diğerlerinden ayırt edebilmeniz için bir **Etiket** girin, örneğin "Sol lobi". Bu alan isteğe bağlıdır.
4. **Grup** altında, bu televizyonun takip etmesi gereken ekran grubunu seçin. Yeni bir grup oluşturmak için **＋ Yeni grup…** seçeneğini seçin ve bir **Yeni grup adı** girin.
5. **Mod** altında **Zamanlanmış** seçili kalsın. Televizyon, grubun takvimine göre kendiliğinden oynatma yapacaktır.
6. **Eşleştir**'e tıklayın.

Televizyonda önce **Bağlandı!**, ardından **Takviminiz yükleniyor...** yazısı görünür. Zamanlanmış içerikler indirilir ve oynatma başlar. Bkz. [TV'de Zamanlanmış Oynatma](./scheduled-playback.md).

:::info
FreePlay Admin **Bu kod bir televizyonla eşleşmedi** uyarısı verirse ekrandaki kodu kontrol edin. Kodun süresi dolmuşsa televizyonda şu anda görünen yeni kodu kullanın.
:::

### Zamanlanmış ve Manuel

**Mod** ayarında iki seçenek vardır:

- **Zamanlanmış** - Kendiliğinden, grubun takvimine göre oynatma yapar. Kimsenin Başlat'a basması gerekmez.
- **Manuel** - Birisi uzaktan kumandayla içerik seçer. Manuel bir ekran yine **Ekranlar** listenizde görünür, ancak bir takvimi takip etmez, bu nedenle **Grup** alanı kapalı olur.

Ekranın modunu daha sonra [Ekranlar sayfasındaki](./managing-screens.md) **Düzenle** seçeneğinden değiştirebilirsiniz.

## Bunun Yerine Bir Ayin Planına Eşleştirme

**Ekranı eşleştir** ekranındaki kod B1 Admin'de de çalışır. Kodu orada girip **Planları Göster** altından bir plan türü seçerseniz televizyon, bir takvim yerine o plan türünü [Plan Modu](../plan-mode/index.md) üzerinden takip eder. Bkz. [Cihazınızı Eşleştirme](../plan-mode/device-pairing.md).

## Televizyondan Değiştirme veya Eşleştirmeyi Kaldırma

Televizyon eşleştirildikten sonra, Ayarlar'daki **Bir takvime eşleştir** satırı, takip ettiği ekran grubunun adını gösterir. Satıra dokunarak üç seçeneği olan **Eşleştirildi** iletişim kutusunu açın:

- **Zamanlamaya dön** - İletişim kutusunu kapatıp zamanlanmış oynatıcıya dönün. Eşleştirmenin hiçbir özelliği değişmez.
- **Eşleştirmeyi kaldır** - Bir takvimi takip etmeyi bırakın. FreePlay **İçerik Sağlayıcıları** ekranını açar.
- **Farklı bir takvime eşleştir** - Eşleştirmeyi kaldırın, ardından televizyonu yeniden eşleştirebilmeniz için yeni bir eşleştirme kodu gösterin.

:::warning
Eşleştirmeyi kaldırmak, FreePlay'in o takvim için indirdiği dosyaları siler.
:::

## FreePlay Admin'den Eşleştirmeyi Kaldırma

1. **Ekranlar**'a gidin ve ekranın etiketine tıklayın.
2. **Diğer**'e, ardından **Eşleştirmeyi kaldır**'a tıklayın.
3. Onaylamak için yeniden **Eşleştirmeyi kaldır**'a tıklayın.

Televizyon tekrar bir eşleştirme kodu gösterir. Televizyonu yeniden kullanmak istediğinizde tekrar eşleştirin.

## İlgili Makaleler

- **[Ekranları ve Grupları Yönetme](./managing-screens.md)** - Bir ekranın adını değiştirin, onu başka bir gruba taşıyın veya indirmelerini kontrol edin
- **[Takvimi Planlama](./scheduling-the-calendar.md)** - Grubun ekranlarının ne oynatacağına karar verin
- **[Eşleştirme Modunu Seçme](../getting-started/pairing-modes.md)** - Zamanlanmış Modu Plan Modu ve sağlayıcılara kendiniz göz atma ile karşılaştırın
