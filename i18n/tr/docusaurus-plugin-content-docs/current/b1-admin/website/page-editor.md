---
title: "Sayfa Düzenleyicisini Kullanma"
description: "B1 Admin'de sayfa düzenleyicisini kurun: bölüm ve öğe ekleyin, biçimlendirin, mobilde önizleyin ve taslakları yayımlayın. Geri alma ve sürüm geçmişini de kapsar."
---

# Sayfa Düzenleyicisini Kullanma

<div class="article-intro">

B1 sayfa düzenleyicisi, kod yazmadan kilise web sitenizin sayfalarını tasarlamanızı sağlayan, sürükle-bırak yöntemiyle çalışan görsel bir oluşturucudur. Bölümler ve içerik blokları ekleyebilir, stilleri özelleştirebilir, çalışmanızı önizleyebilir ve değişiklikleri geri alabilirsiniz. Tüm bunları doğrudan tarayıcınızdan yaparsınız.

</div>

## Eğitim Videosu

<YouTube id="m2B_JxmfFm4" title="B1'de Sayfaları ve Gezinmeyi Düzenleme" next="B1'de Özel Alan Adı Bağlama" nextUrl="/docs/b1-admin/settings/custom-domain" />

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Web sitenizi yapılandırmak için [İlk Kurulum](./initial-setup.md) adımlarını tamamlayın
- [Sayfaları Yönetme](./managing-pages.md) bölümünde en az bir sayfa oluşturun
- Düzenleyiciye erişmek için **content.edit** iznine sahip olmanız gerekir

</div>

## Düzenleyiciyi Açma

1. B1 Admin'de, sol üstteki arama çubuğu olan [Atlama menüsünü](../introduction.md#getting-around-with-the-jump-menu) açın, **Web Sitesi**'ni genişletin ve **Sayfalar**'a tıklayın.
2. Sayfalar tablosunda düzenlemek istediğiniz sayfayı bulun ve **İçeriği Düzenle**'ye tıklayın.

Düzenleyici tam ekran modda açılır. Sol panel sayfanızın yapısını ve kullanılabilir içerik öğelerini gösterir; orta alan ise sayfanızın canlı önizlemesini gösterir.

:::info
Düzenleyici, B1 Admin tema ayarınızdan bağımsız olarak her zaman açık modda görüntülenir ve [Görünüm](./appearance.md) bölümünde seçtiğiniz başlık ve metin yazı tiplerini kullanır. Bu sayede önizleme, sayfanızın web sitesi ziyaretçilerine nasıl görüneceğini doğru şekilde yansıtır.
:::

## Sayfa Yapısı: Bölümler ve Öğeler

Her sayfa iki düzeyden oluşur:

- **Bölümler** -- Sayfanızı yatay alanlara ayıran üst düzey kapsayıcılardır (örneğin bir tanıtım alanı, bir içerik bloğu veya bir alt bilgi şeridi). Sayfaya içerik ekleyebilmeniz için her sayfada en az bir bölüm bulunmalıdır.
- **Öğeler** -- Bir bölümün içine yerleştirilen tek tek içerik parçalarıdır; metin, resim, düğme, kart, form ve takvim gibi.

### Bölüm Ekleme

1. **Bölüm Ekle**'ye (veya sol panelin üst kısmındaki **+** düğmesine) tıklayın.
2. Nasıl başlamak istediğinizi seçin:
   - **Şablondan** -- Kategoriye göre düzenlenmiş bölüm şablonu galerisine göz atın (Tanıtım, Hakkımızda, Hizmetler, Bağış vb.) ve birine tıklayarak tam biçimlendirilmiş, önceden doldurulmuş bir bölüm ekleyin. Eklendikten sonra her şeyi özelleştirebilirsiniz.
   - **Boş bölüm** -- Bir sütun düzeni seçin (tek, iki sütun, üç sütun vb.) ve sıfırdan oluşturun.
3. Yeni bölüm önizlemede görünür. Seçmek için tıklayın ve arka plan rengini, iç boşluğunu ve diğer stil seçeneklerini ayarlayın.

### Bir Bölümün Düzenini Değiştirme

Bir bölümü oluşturdunuz ama farklı bir yapı mı istiyorsunuz? Mevcut içeriğinizi ve öğelerinizi koruyarak sütun düzenini galeriden başka bir düzenle değiştirmek için o bölümdeki düzen değiştiriciyi kullanın.

### Bir Bölüme Öğe Ekleme

1. Önizlemede bir bölümün içine tıklayarak onu seçin.
2. **İçerik Ekle**'ye tıklayın ve listeden bir öğe türü seçin:
   - **Metin** -- Başlıklar, paragraflar ve zengin metin
   - **Resim** -- Bir fotoğraf yükleyin veya bağlantısını verin
   - **Düğme** -- Tıklanabilir bir eylem bağlantısı
   - **Kart** -- Başlık ve açıklamalı bir resim
   - **Form** -- Sayfaya doğrudan bir [form](../forms/creating-forms.md) yerleştirin. Formun bir [başlık fotoğrafı](../forms/creating-forms.md#adding-a-header-photo) varsa, soruların üstünde görünür
   - **Takvim** -- Bir etkinlik takvimi gösterin
   - **SSS** -- Akordeon tarzında soru ve cevap blokları
   - **Video** -- URL ile bir video yerleştirin
   - **Grup Listesi** -- İsteğe bağlı arama, kategori filtresi ve etiket filtresi ile tüm kilise gruplarının filtrelenebilir dizini
   - **Simge Özelliği** -- Özellik veya hizmet vurgusu için başlık ve kısa açıklamalı bir simge
   - **Galeri** -- Çoklu fotoğraf ızgarası veya masonry düzeni
   - **Referans** -- Ad, unvan ve fotoğrafla bir veya daha fazla alıntı
   - **Sosyal Simgeler** -- Kilisenizin sosyal medya profilleri için bağlantılı simgeler: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo ve Podcast. Göstermek istediğiniz her biri için bir bağlantı girin; **WhatsApp** için numaranızın bulunduğu bir `https://wa.me/` bağlantısı veya bir grup davet bağlantısı kullanın
   - **Geri Sayım** -- Bir tarihe veya haftalık ibadet saatine kadar süren zamanlayıcı
   - **İstatistikler** -- Etiketli büyük sayılardan oluşan bir sıra (üyeler, yıllar, şubeler)
   - **Kampanya İlerlemesi** -- Bir bağış kampanyası için canlı ilerleme çubuğu; bir fon hedefine doğru toplanan toplam tutarı gösterir
   - **Personel Izgarası** -- Bir grubun üyeleri için fotoğraflı kartlar; grubun **herkese açık kadro** seçeneğinin açık olması gerekir
   - **İbadet Saatleri** -- Şubelerinizin ibadet programı, katılım kurulumundan otomatik olarak alınır
   - **Vaazlar** -- Vaaz kitaplığınız; tam bir tarayıcı olarak veya ızgara, liste ya da öne çıkan en son düzeninde
   - **Harita** -- Kilisenizin adresine ortalanmış gömülü bir harita
   - **Tablo** -- Tablo şeklindeki içerik için basit satır ve sütun ızgarası
   - **Metin ve Resim** -- Yan yana metin ve resim
   - **Logo** -- [Görünüm](./appearance.md) bölümünden alınan kilise logonuz
   - **Canlı Yayın** -- Canlı yayın oynatıcınız, doğrudan sayfaya gömülü
   - **Podcast** -- Sağladığınız harici bir podcast RSS akış URL'sinden alınan bölüm listesi; kaç bölüm gösterileceği ve tarih ile açıklamaların görüntülenip görüntülenmeyeceği ayarlarıyla birlikte. Canlı sitedeki her bölümün bir ses oynatıcısı ve bölüm sesini bölüm başlığı altında kaydeden bir **İndir** bağlantısı vardır. Bu öğe, sitenizde herhangi bir podcast akışını öne çıkarmak içindir; kendi vaazlarınızı podcast olarak yayımlamak için bunun yerine [Vaazları Yönetme](../sermons/managing-sermons.md#your-podcast-feed) bölümüne bakın
   - **Bağış** -- Bir bağış düğmesi veya gömülü bağış formu
   - **HTML** -- Kendi ham HTML kodunuz; üçüncü taraf bir pencere öğesini gömmek gibi gelişmiş kullanımlar için (bkz. [HTML öğesini kullanma](#using-the-html-element))
   - **iFrame** -- URL ile harici içerik gömün
3. Görünen ayarlar panelini kullanarak öğeyi yapılandırın.

### HTML Öğesini Kullanma

**HTML** öğesinin iki kutusu vardır:

- **HTML İçeriği** -- Sayfada gösterilecek işaretleme. Buraya eklediğiniz tüm `<script>` etiketleri canlı sitenizde çalışır.
- **JavaScript (script etiketi hariç)** -- Sayfa yüklendiğinde çalışan betik kodu. Bu kutuya bir sağlayıcının `<script>` etiketleriyle birlikte gömme kodunu da yapıştırabilirsiniz; canlı sitede çalışır.

JavaScript kutusuna yalnızca bir web adresi (örneğin bir resim bağlantısı) yapıştırırsanız, kutu kırmızıya döner ve *"Bu bir web adresi, JavaScript değil."* uyarısını gösterir. Bu kutuya yazılan çıplak bir adres hiçbir şey yapmaz. Bir resim göstermek için **Resim** öğesini kullanın veya **HTML İçeriği** kutusuna `<img src="...">` yazın.

### Takvim Öğesini Kullanma {#using-the-calendar-element}

**Takvim** öğesi takvimlerinizden birinin etkinliklerini gösterir:

1. **Seç** altında **Grup Takvimi** (tek bir grubun etkinlikleri -- listede üyesi olduğunuz gruplar gösterilir) veya **Özel Takvim** (**Takvimler** altında oluşturduğunuz takvim; bkz. [Özel Takvim](../calendars/curated-calendar.md)) seçeneğini belirleyin.
2. **Takvim Seç** altında grubu veya takvimi seçin.
3. **Görüntüleme** altında nasıl gösterileceğini seçin:
   - **Aylık takvim** -- Ziyaretçilerin ileri geri gezebileceği bir ay ızgarası.
   - **Yaklaşan etkinlikler** -- Sonraki 12 yaklaşan etkinlik için bir karo ızgarası; tekrarlayan bir etkinlik bir kez, bir sonraki tarihinde gösterilir. Her karo etkinliğin fotoğrafını (veya fotoğrafı yoksa temanızın koyu renginde başlığını), bir tarih rozetini, günü ve saati ve açıklamasının ilk satırını gösterir. Karoların üstündeki **Abone Ol** düğmesi ziyaretçilerin takvimin ICS bağlantısını kopyalamasına veya indirmesine olanak tanır. Bu görüntüleme için bir **Düzen** ayarı görünür: varsayılan olan **Izgara** veya karoları tek bir sırada yatay olarak otomatik kaydıran **Kaydırmalı (otomatik)**.
4. Yalnızca bazı etkinlikleri göstermek için **Yalnızca şu etiketli etkinlikler** alanına bir etiket yazın -- örneğin `gençlik`. Yalnızca **Etiketler**'inde bu kelime bulunan etkinlikler görünür. Tüm etkinlikleri göstermek için boş bırakın. Etiketler her etkinlikte ayrı ayarlanır; bkz. [Etkinlik Ekleme ve Düzenleme](../calendars/creating-calendars.md#adding-and-editing-events).

Her iki görüntülemede de bir etkinliğe tıklamak, o etkinliğin web sitenizdeki kendi sayfasını açar. Etkinlik sayfasında etkinlik fotoğrafı, başlığı, tarihi ve saati ile açıklaması; ayrıca **Ne zaman** (yinelenen bir etkinlik için tekrar düzeni dahil) ve **Nerede** (etkinlik için ayrılmış odalar) bilgilerini içeren bir kutu bulunur. Kayıt açıksa **Bu Etkinlik İçin Kaydol** düğmesi, etkinliği bir takvim dosyası olarak indiren bir **Takvimime ekle** bağlantısı da vardır. Sayfa, arama motorlarının etkinliğin tarih ve ayrıntılarını sonuçlarında gösterebilmesi için hazırlanmıştır. Sayfalarınızda gösterilen özel takvimlerden (önümüzdeki altı ay içindeki etkinlikler için) gelen etkinlik sayfaları da sitenizin site haritasında listelenir; böylece arama motorları bunları bulabilir.

### İçeriği Yeniden Sıralama

Bölümleri veya öğeleri yeniden sıralamak için her öğenin sol tarafındaki tutma simgesini (altı nokta) kullanarak sürükleyin. Öğeleri bir bölüm içinde sürükleyebilir veya bölümler arasında taşıyabilirsiniz.

## Sayfanızı Biçimlendirme

### Bölüm Stilleri

Stil panelini açmak için herhangi bir bölüme tıklayın. Şunları ayarlayabilirsiniz:

- **Arka plan** -- Düz renk, geçiş (gradient) veya resim. Resim arka planı kullanırken, bir **Odak Noktası** seçici, bölüm ölçeklendiğinde resmin hangi bölümünün ortada kalacağını belirlemenize olanak tanır; bir **Kaplama** renk seçeneği ise metnin okunabilirliğini artırmak için resmin üzerine yarı saydam bir ton eklemenizi sağlar.
- **İç boşluk** -- Bölümün içindeki üst ve alt boşluk
- **Genişlik** -- Tam genişlik veya ortalanmış/sınırlandırılmış
- **Ayırıcılar** -- Bölümün üst veya alt kenarında dekoratif şekil ayırıcılar (dalga, eğik, kavis, üçgen ve daha fazlası); renk, yükseklik ve çevirme seçenekleriyle

### Öğe Stilleri

Stil panelini açmak için herhangi bir öğeye tıklayın. Yaygın seçenekler arasında yazı boyutu, renk, hizalama, kenar boşluğu ve iç boşluk bulunur. Resimler için alternatif metin ve bağlantı hedefleri ayarlayabilirsiniz.

### Özel CSS

Gelişmiş biçimlendirme için her bölümün ve öğenin, kendi CSS kurallarınızı yazabileceğiniz bir **Özel CSS** alanı vardır. Bu kurallar yalnızca o öğeyle sınırlıdır; bu nedenle sayfanın geri kalanını istemeden etkilemezler.

:::tip
Tüm sitenizde geçerli olacak stiller uygulamak istiyorsanız -- örneğin özel bir yazı tipi veya genel bir renk -- bireysel sayfalardaki özel CSS yerine [Görünüm](./appearance.md) ayarlarını kullanın.
:::

## Sayfanızı Önizleme

Sayfanızın farklı ekran boyutlarında nasıl göründüğünü kontrol etmek için araç çubuğundaki önizleme denetimlerini kullanın:

- **Masaüstü** -- Tam genişlikte tarayıcı görünümü
- **Mobil** -- Dar, telefon boyutunda görünüm

Telefonlarda, satırın ayarlarında bir **Mobil Genişlik** belirlemediğiniz sürece bir satırdaki sütunlar tam genişlikte, birbirinin üstüne yığılır. Vaaz ve podcast listeleri de telefonlarda her bölümün metnini küçük resminin altına yerleştirir.

Canlı sayfayı ziyaretçilerin göreceği gibi görmek için Sayfalar listesine dönün ve sayfanın yoluna tıklayın. Sayfa yeni bir tarayıcı sekmesinde açılır.

## Erişilebilirliği Kontrol Etme

Araç çubuğundaki **Erişilebilirlik** simgesine tıklayarak yaygın sorunlar için hızlı bir kontrol çalıştırın -- alternatif metni eksik resimler, düşük renk kontrastı veya sırası bozuk başlıklar. Her sorun, düzeltilmesi gereken öğeye doğrudan bağlanır; böylece sorunu yerinde düzeltebilirsiniz.

## Değişiklikleri Geri Alma

Düzenleyici düzenleme geçmişinizi otomatik olarak tutar. Gezinmek için araç çubuğu düğmelerini veya klavye kısayollarını kullanın:

- **Geri Al** (Ctrl+Z / Cmd+Z) -- Son işleminizi geri alır
- **Yinele** (Ctrl+Shift+Z veya Ctrl+Y / Cmd+Shift+Z) -- Geri alınan bir işlemi yeniden uygular

Sayfayı önceki bir anlık görüntüye de geri döndürebilirsiniz. Açıklamalarıyla kaydedilmiş anlık görüntülerin listesini görmek için araç çubuğundaki **Geçmişi görüntüle**'ye tıklayın ve dönmek istediğiniz noktayı seçmek için herhangi bir girişe tıklayın.

:::warning
Bir anlık görüntüyü geri yüklemek, mevcut sayfa içeriğinizi anlık görüntü sürümüyle değiştirir. Bu işlem standart geri al düğmesiyle geri alınamaz. Eski bir anlık görüntüyü geri yüklemeden önce mevcut durumunuzun bir anlık görüntüsünü kaydedin; böylece geri dönme seçeneğiniz korunmuş olur.
:::

## Kaydetme ve Yayımlama

Değişiklikleriniz çalışırken otomatik olarak kaydedilir. Araç çubuğundaki bir durum göstergesi, değişikliklerinizin kaydedilip kaydedilmediğini gösterir.

### Taslak ve yayımlanmış durum

Sayfalar, ziyaretçilerin değişikliklerinizi ne zaman göreceğini kontrol eden bir **yayımlanmış** duruma sahip olabilir. Araç çubuğu geçerli durumu gösteren bir durum etiketi görüntüler:

- **Kaydedildiğinde yayında** -- Sayfa bir yayımlama iş akışı kullanmaz. Kaydedilen her değişiklik hemen yayına girer. Yeni sayfalar için varsayılan budur.
- **Yayımlanmamış değişiklikler** -- Sayfa daha önce yayımlanmış, ancak son yayımlamadan bu yana değişiklik yaptınız. Ziyaretçiler hâlâ önceki yayımlanmış sürümü görür.
- **Yayımlandı** -- Sayfa yayında ve kaydedilmiş içeriğiniz ziyaretçilerin gördüğüyle aynı.

Değişikliklerinizi yayımlamak için araç çubuğundaki **Yayımla** düğmesine tıklayın. Sayfa hemen yayına girer.

Ziyaretçilerin gördüklerini etkilemeden son yayımlanmış sürüme dönmek için taşma menüsünü (⋮) açın ve **Yayımlanmamış değişiklikleri at** seçeneğine tıklayın.

Yayımlama iş akışını kullanmayı bırakmak için taşma menüsünü açın ve **Yayımlamayı kapat** seçeneğine tıklayın. Bundan sonra düzenlemeleriniz yeniden hemen yayına girer.

:::tip
Bir sayfayı hazırlamak istediğinizde -- örneğin yaklaşan bir etkinlik için -- ve yalnızca doğru anda yayına almak istediğinizde taslak/yayımlama iş akışını kullanın. Sayfayı oluşturun ve önizleyin, hazır olduğunuzda Yayımla'ya tıklayın.
:::

## İlgili Makaleler

- [Sayfaları Yönetme](./managing-pages.md) -- Sayfa oluşturun, URL'leri ayarlayın ve site gezinmesini yönetin
- [Görünüm](./appearance.md) -- Site genelindeki renkleri, yazı tiplerini ve markayı ayarlayın
- [Dosyalar](./files.md) -- Düzenleyicide kullanmak üzere resim ve belgeler yükleyin
- [Form Oluşturma](../forms/creating-forms.md) -- Sayfalara gömebileceğiniz formlar oluşturun
