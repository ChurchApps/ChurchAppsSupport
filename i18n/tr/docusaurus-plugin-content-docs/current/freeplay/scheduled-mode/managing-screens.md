---
title: "Ekranları ve Grupları Yönetme"
description: "Hangi FreePlay TV'lerin çevrimiçi ve pazar için hazır olduğunu kontrol edin; ardından ekran ayarlarını düzenleyin ve FreePlay Admin'de tek takvimi paylaşan gruplar oluşturun."
---

# Ekranları ve Grupları Yönetme

<div class="article-intro">

FreePlay Admin'deki **Ekranlar** sayfası, kilisenize eşleştirilmiş her TV'yi, şu anda ne oynattığını ve Pazar için hazır olup olmadığını listeler. Ayrıca burada **ekran gruplarını** yönetirsiniz. Aynı gruptaki ekranlar tek bir takvimi ve tek bir varsayılan döngüyü paylaşır.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- [admin.freeplay.church](https://admin.freeplay.church) adresinden FreePlay Admin'e oturum açın
- [En az bir ekran eşleştirin](./pairing-a-screen.md)

</div>

## Ekranlar Sayfası

Sayfanın üst kısmındaki üç sayı size hızlı bir durum özeti verir:

- **Şu anda çevrimiçi** - Son 15 dakika içinde bağlantı kurmuş ekranlar
- **Pazar için hazır** - Bu gelecek Pazar gününe kadar her şeyi indirmiş planlı ekran sayısı
- **Dikkat gerektiriyor** - Çevrimdışı olan veya dosyaları eksik olan ekranlar

Bunun altında, bir ekranı etiketine, grubuna veya o anda oynattığı içeriğe göre bulmak için **Ekranlarda ara** alanını kullanın. Filtre çipleriyle listeyi **Tümü**, **Planlı**, **Manuel**, **Dikkat gerektiriyor** veya tek bir gruba göre daraltabilirsiniz. Sağdaki geçiş düğmesiyle **Tablo** ve **Izgara** görünümleri arasında geçiş yapabilirsiniz.

Her ekranda şunlar gösterilir:

- **Etiket** ve cihaz modeli
- **Grup**
- **Mod** - **Planlı** veya **Manuel**
- **Şu an oynatılan** - Ekranda şu anda ne olduğu. Manuel ekranlarda **Sınıf · öğretmen Başlat'a basar** yazısı görünür
- **Şu tarihe kadar hazır** - Ekranın hangi tarihe kadar içerik indirdiği. Dosyalar inmemişse bunun yerine **N dosya eksik** yazısı görünür. Yeni bir ekranda **İlk senkronizasyon bekleniyor** yazısı yer alır
- **Son görülme** - Ekranın en son ne zaman bağlantı kurduğu. Bir süredir bağlantı kurmamış ekranda **Çevrimdışı**, hiç bağlanmamış ekranda ise **Hiç görülmedi** yazısı görünür

Takvimini tarayıcınızda oynatmak için **Sun**'a, ayarlarını değiştirmek için **Düzenle**'ye tıklayın.

## Bir Ekranı Görüntüleme

Ekran sayfasını açmak için ekranın etiketine tıklayın. Sol tarafta şunlar bulunur:

- **Tarayıcıda sun** - Bu ekranın takvimini tarayıcınızda tam ekran oynatır; TV'de göründüğü şekliyle. Bkz. [Tarayıcıdan Sunum](./scheduled-playback.md#presenting-from-a-browser)
- **Düzenle** - Etiketi, grubu veya modu değiştirin
- **Diğer** > **Eşleştirmeyi kaldır** - TV'nin bağlantısını kesin. TV yeniden bir eşleştirme kodu göstermeye başlar

Sayfanın geri kalanında şu bölümler yer alır:

- **Şimdi ve sonra** - Şu anda ne oynatıldığı ve ne zamana kadar oynatılacağı, ardından önümüzdeki 7 gün için planlanan her şey. Bu grubun takvimine gitmek için **Takvimi aç**'a tıklayın
- **İndirmeler** - Her şeyin indirildiği **Şu tarihe kadar hazır** tarihi veya eksik dosyaların listesi
- **Cihaz** - Cihaz kimliği, platform, model, FreePlay uygulama sürümü, IP adresi, kullanılan ve boş depolama alanı, son görülme zamanı ve mod
- **Son etkinlikler** - Ekranın bildirdiği en son etkinlikler

:::tip
Bir ekranda eksik dosyalar görünüyorsa, ekranın çevrimiçi olduğundan ve boş depolama alanı bulunduğundan emin olun. TV, bir sonraki bağlantısında eksik dosyaları kendiliğinden indirir.
:::

## Bir Ekranı Düzenleme

1. Ekranın yanındaki veya ekran sayfasındaki **Düzenle**'ye tıklayın.
2. **Etiket**, **Grup** veya **Mod** (**Planlı** veya **Manuel**) alanını değiştirin.
3. **Kaydet**'e tıklayın.

Bir ekranı başka bir gruba taşıdığınızda, ekran o grubun takvimine geçer.

## Ekran Grupları

Ekran grubu, aynı anda aynı şeyi oynatan ekranlardan oluşan bir kümedir; örneğin "Lobi" veya "Çocuk Bölümü" gibi. Her grubun kendi takvimi vardır ve planlı bir içerik olmadığında oynatılan bir **varsayılan döngüsü** olabilir.

Grupları yönetmek için **Ekranlar** sayfasının üst kısmındaki **Gruplar**'a tıklayın. **Ekran grupları** listesinde her grubun adı, kaç ekran içerdiği ve varsayılan döngüsü gösterilir. Geri dönmek için **Ekranlar**'a tıklayın.

### Grup Ekleme

1. **Ekran grupları** görünümünde **Grup ekle**'ye tıklayın.
2. Bir **Ad** girin; örneğin "Lobi".
3. Bir **Varsayılan döngü** oynatma listesi seçin veya **Hiçbiri — ekran kararır** seçeneğinde bırakın.
4. **Kaydet**'e tıklayın.

Bir ekranı eşleştirirken **Grup** alanından **＋ Yeni grup…** seçeneğini seçerek de grup oluşturabilirsiniz.

### Grubu Düzenleme veya Silme

1. Grubun yanındaki **Düzenle**'ye tıklayın.
2. Adı veya varsayılan döngüyü değiştirin, ardından **Kaydet**'e tıklayın.
3. Grubu kaldırmak için **Sil**'e tıklayıp onaylayın.

:::warning
Bir grubu sildiğinizde o grubun planı da silinir. Bu gruptaki ekranlar, siz onları başka bir gruba taşıyana kadar kararır.
:::

## İlgili Makaleler

- **[Bir Ekran Eşleştirme](./pairing-a-screen.md)** - Yeni bir TV ekleyin
- **[Takvimi Planlama](./scheduling-the-calendar.md)** - Her grubun ne oynattığını ve varsayılan döngüsünü belirleyin
- **[TV'de Planlı Oynatma](./scheduled-playback.md)** - "Şu tarihe kadar hazır" tarihinin TV'nin kendisinde ne anlama geldiğini öğrenin
