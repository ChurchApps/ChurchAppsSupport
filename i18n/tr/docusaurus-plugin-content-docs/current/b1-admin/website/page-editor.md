---
title: "Sayfa Düzenleyicisini Kullanma"
description: "B1 Admin'de bölümler ve öğeler ekleyerek, bunları biçimlendirerek, mobilde önizleyerek ve taslakları yayımlayarak bir sayfa düzenleyicisi kurun. Geri alma ve sürüm geçmişini de kapsar."
---

# Sayfa Düzenleyicisini Kullanma

<div class="article-intro">

B1 sayfa düzenleyicisi, kod yazmadan kilise web sitenizin sayfalarını tasarlamanıza olanak tanıyan, sürükle-bırak özellikli görsel bir oluşturucudur. Bölümler ve içerik blokları ekleyebilir, stilleri özelleştirebilir, çalışmanızı önizleyebilir ve değişiklikleri geri alabilirsiniz -- tüm bunları tarayıcınızın içinden yapabilirsiniz.

</div>

## Eğitim Videosu

<YouTube id="m2B_JxmfFm4" title="B1'de Sayfaları ve Gezinmeyi Düzenleme" next="B1'de Özel Alan Adı Bağlama" nextUrl="/docs/b1-admin/settings/custom-domain" />

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Web sitenizi yapılandırmak için [İlk Kurulum](./initial-setup.md) adımlarını tamamlayın
- [Sayfaları Yönetme](./managing-pages.md) bölümünde en az bir sayfa oluşturun
- Düzenleyiciye erişmek için **content.edit** iznine ihtiyacınız vardır

</div>

## Düzenleyiciyi Açma

1. B1 Admin'de, [Atlama menüsünü](../introduction.md#getting-around-with-the-jump-menu) (sol üstteki arama çubuğu) açın, **Website** seçeneğini genişletin ve **Pages** seçeneğine tıklayın.
2. Sayfalar tablosunda düzenlemek istediğiniz sayfayı bulun ve **Edit Content** düğmesine tıklayın.

Düzenleyici tam ekran modunda açılır. Sol panelde sayfanızın yapısı ve kullanılabilir içerik öğeleri gösterilir; orta alanda sayfanızın canlı önizlemesi yer alır.

:::info
Düzenleyici, B1 Admin tema ayarınızdan bağımsız olarak her zaman açık modda görüntülenir ve [Görünüm](./appearance.md) bölümünde seçtiğiniz başlık ve metin yazı tiplerini kullanır. Bu sayede önizleme, sayfanızın web sitesi ziyaretçilerine nasıl görüneceğiyle birebir eşleşir.
:::

## Sayfa Yapısı: Bölümler ve Öğeler

Her sayfa iki düzeyden oluşur:

- **Bölümler** -- Sayfanızı yatay alanlara ayıran en üst düzey kapsayıcılardır (örneğin bir kahraman bölümü, bir içerik bloğu veya bir alt bilgi şeridi). İçerik ekleyebilmeniz için her sayfada en az bir bölüm bulunmalıdır.
- **Öğeler** -- Bir bölümün içine yerleştirilen, metin, resim, düğme, kart, form ve takvim gibi tek tek içerik parçalarıdır.

### Bölüm Ekleme

1. **Add Section** düğmesine (veya sol panelin üstündeki **+** düğmesine) tıklayın.
2. Nasıl başlamak istediğinizi seçin:
   - **Şablondan** -- Kategoriye göre düzenlenmiş bölüm şablonu galerisine göz atın (Kahraman, Hakkımızda, Hizmetler, Bağış vb.) ve birine tıklayarak tam biçimlendirilmiş, önceden doldurulmuş bir bölüm ekleyin. Eklendikten sonra her şeyi özelleştirebilirsiniz.
   - **Boş bölüm** -- Bir sütun düzeni seçin (tek, iki sütun, üç sütun vb.) ve sıfırdan oluşturun.
3. Yeni bölüm önizlemede görünür. Seçmek için tıklayın ve arka plan rengini, iç boşluğu ve diğer stil seçeneklerini yapılandırın.

### Bölüm Düzenini Değiştirme

Bir bölümü oluşturdunuz ama farklı bir yapı mı istiyorsunuz? Mevcut içeriğinizi ve öğelerinizi koruyarak sütun düzenini galeriden başka bir düzenle değiştirmek için o bölümdeki düzen değiştiriciyi kullanın.

### Bir Bölüme Öğe Ekleme

1. Seçmek için önizlemede bir bölümün içine tıklayın.
2. **Add Content** düğmesine tıklayın ve listeden bir öğe türü seçin:
   - **Text** -- Başlıklar, paragraflar ve zengin metin
   - **Image** -- Bir fotoğraf yükleyin veya bağlantısını verin
   - **Button** -- Tıklanabilir bir eylem çağrısı bağlantısı
   - **Card** -- Bir başlık ve açıklamalı resim
   - **Form** -- Bir [formu](../forms/creating-forms.md) doğrudan sayfaya yerleştirin. Formun bir [başlık fotoğrafı](../forms/creating-forms.md#adding-a-header-photo) varsa, soruların üstünde görünür
   - **Calendar** -- Bir etkinlik takvimi gösterin
   - **FAQ** -- Akordeon tarzı soru ve cevap blokları
   - **Video** -- URL ile bir video gömün
   - **Groups Browser** -- İsteğe bağlı arama, kategori filtresi ve etiket filtresiyle tüm kilise gruplarının filtrelenebilir bir dizini. **Layout** (Düzen) seçeneği **Grid** (varsayılan) veya **Scrolling (automatic)** (Otomatik kaydırma) olabilir -- bkz. [Kaydırmalı düzenler](#scrolling-layouts)
   - **Group List** -- Genel gruplarınız için kutucuklar; isteğe bağlı olarak yalnızca belirli bir etikete sahip gruplar. **Layout** seçeneği **Grid** (varsayılan; satır başına en fazla üç kutucuk) veya **Scrolling (automatic)** olabilir -- bkz. [Kaydırmalı düzenler](#scrolling-layouts)
   - **Icon Feature** -- Özellik veya hizmet vurgusu için bir simge, başlık ve kısa açıklama
   - **Gallery** -- Çok fotoğraflı bir ızgara veya duvar örgüsü (masonry) düzeni
   - **Testimonial** -- Yazar adı, görevi ve fotoğrafıyla bir veya daha fazla alıntı
   - **Social Icons** -- Kilisenizin sosyal medya profilleri için bağlantılı simgeler: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo ve Podcast. Göstermek istediğiniz her biri için bir bağlantı girin; **WhatsApp** için numaranızı içeren bir `https://wa.me/` bağlantısı veya bir grup davet bağlantısı kullanın
   - **Countdown** -- Bir tarihe veya haftalık bir ibadet saatine kadar geri sayan zamanlayıcı
   - **Stats** -- Etiketli büyük sayılardan oluşan bir sıra (üyeler, yıllar, kampüsler)
   - **Campaign Progress** -- Bir bağış kampanyası için canlı ilerleme çubuğu; bir fon hedefine doğru toplanan toplam tutarı gösterir
   - **Staff Grid** -- Bir grubun üyeleri için fotoğraflı kartlar; grubun **public roster** (herkese açık liste) seçeneğinin açık olması gerekir
   - **Service Times** -- Kampüslerinizin ibadet programı; katılım kurulumundan otomatik olarak alınır
   - **Sermons** -- Vaaz kitaplığınız; tam bir tarayıcı olarak, ya da ızgara, liste veya öne çıkan en son vaaz düzeninde
   - **Map** -- Kilisenizin adresine ortalanmış gömülü bir harita
   - **Table** -- Tablo biçimindeki içerik için basit bir satır ve sütun ızgarası
   - **Text with Photo** -- Yan yana metin ve bir resim
   - **Logo** -- [Görünüm](./appearance.md) bölümünden alınan kilise logonuz
   - **Live Stream** -- Canlı yayın oynatıcınız, doğrudan sayfaya gömülü
   - **Podcast** -- Sağladığınız harici bir podcast RSS besleme URL'sinden alınan bölüm listesi; kaç bölüm gösterileceği ve tarihlerin ve açıklamaların görüntülenip görüntülenmeyeceği ayarlarıyla. Canlı sitedeki her bölümde bir ses oynatıcı ve bölümün ses dosyasını bölüm başlığı altında kaydeden bir **Download** bağlantısı bulunur. Bu öğe, sitenizde herhangi bir podcast beslemesini öne çıkarmak içindir; kendi vaazlerinizi podcast olarak yayımlamak için bunun yerine [Vaazları Yönetme](../sermons/managing-sermons.md#your-podcast-feed) bölümüne bakın
   - **Donation** -- Bir bağış düğmesi veya gömülü bağış formu
   - **HTML** -- Üçüncü taraf bir widget'ı gömmek gibi gelişmiş kullanım durumları için kendi ham HTML'iniz (bkz. [HTML öğesini kullanma](#using-the-html-element))
   - **iFrame** -- URL ile harici içerik gömün
3. Görünen ayarlar panelini kullanarak öğeyi yapılandırın.

### HTML öğesini kullanma

**HTML** öğesinin iki kutusu vardır:

- **HTML Content** (HTML İçeriği) -- Sayfada gösterilecek işaretleme. Buraya eklediğiniz tüm `<script>` etiketleri canlı sitenizde çalışır.
- **JavaScript (exclude script tag)** (JavaScript, script etiketi hariç) -- Sayfa yüklendiğinde çalışan betik kodu. Buraya bir sağlayıcının gömme kodunu, `<script>` etiketleriyle birlikte de yapıştırabilirsiniz; canlı sitede çalışır.

JavaScript kutusuna yalnızca bir web adresi (örneğin bir resim bağlantısı) yapıştırırsanız, kutu kırmızıya döner ve *"This is a web address, not JavaScript."* (Bu bir web adresi, JavaScript değil.) uyarısı görünür. Bu kutuya yazılan çıplak bir adres hiçbir şey yapmaz. Bir resim göstermek için **Image** öğesini kullanın veya **HTML Content** kutusuna `<img src="...">` yazın.

### Calendar öğesini kullanma {#using-the-calendar-element}

**Calendar** öğesi, takvimlerinizden birinin etkinliklerini gösterir:

1. **Select** (Seç) altında **Group Calendar** (Grup Takvimi -- bir grubun etkinlikleri; listede üyesi olduğunuz gruplar yer alır) veya **Curated Calendar** (**Calendars** altında oluşturduğunuz bir takvim; bkz. [Seçilmiş Takvim](../calendars/curated-calendar.md)) seçeneğini belirleyin.
2. **Select Calendar** (Takvim Seç) altında grubu veya takvimi seçin.
3. **Display** (Görüntüleme) altında nasıl gösterileceğini seçin:
   - **Month calendar** (Aylık takvim) -- Ziyaretçilerin sayfalayabileceği bir ay ızgarası. Her etkinlik ait olduğu grubun rengiyle renklendirilir; bu sayede bir grubun etkinlikleri her takvimde aynı renkte görünür. Renkleri B1 otomatik olarak seçer; ayarlanacak bir şey yoktur.
   - **Upcoming events** (Yaklaşan etkinlikler) -- Bir sonraki 12 etkinlik için kutucuklardan oluşan bir ızgara; tekrarlanan bir etkinlik bir kez, bir sonraki tarihinde gösterilir. Her kutucukta etkinliğin fotoğrafı (ya da fotoğrafı yoksa temanızın koyu renginde başlığı), bir tarih rozeti, gün ve saat ile açıklamanın ilk satırı yer alır. Kutucukların üstündeki **Subscribe** (Abone ol) düğmesi, ziyaretçilerin takvimin ICS bağlantısını kopyalamasına veya indirmesine olanak tanır. Bu görünüm için bir **Layout** (Düzen) ayarı görünür: **Grid** (varsayılan) veya **Scrolling (automatic)** (Otomatik kaydırma); bu, kutucukları kendiliğinden kayan tek bir satıra yerleştirir (bkz. [Kaydırmalı düzenler](#scrolling-layouts)). **Curated Calendar** için, her etkinliğin grup adını kutucuğunun sağ üst köşesinde, o grubun takvim renginde göstermek üzere **Group badge** (Grup rozeti) ayarını açın. Arşivlenmiş veya gizli gruplardaki etkinliklerde rozet gösterilmez.
4. Yalnızca bazı etkinlikleri göstermek için **Only events tagged** (Yalnızca şu etiketli etkinlikler) alanına bir etiket yazın -- örneğin `youth`. Yalnızca **Tags** (Etiketler) alanında bu kelimeyi içeren etkinlikler görünür. Tüm etkinlikleri göstermek için boş bırakın. Etiketler her etkinlikte ayarlanır; bkz. [Etkinlik Ekleme ve Düzenleme](../calendars/creating-calendars.md#adding-and-editing-events).

Her iki görünümde de bir etkinliğe tıklamak, web sitenizde kendi sayfasını açar. Etkinlik sayfasında etkinlik fotoğrafı, başlık, tarih ve saat ile açıklama; ayrıca **When** (Ne zaman -- tekrarlayan bir etkinlik için tekrar düzenini de içerir) ve **Where** (Nerede -- etkinlik için ayrılmış odalar) bilgilerini içeren bir kutu bulunur. Kayıt açıksa **Register for this Event** (Bu Etkinlik için Kaydol) düğmesi, ayrıca etkinliği bir takvim dosyası olarak indiren bir **Add to my calendar** (Takvimime ekle) bağlantısı da yer alır. Sayfa, arama motorlarının etkinliğin tarihini ve ayrıntılarını sonuçlarında gösterebilmesi için düzenlenmiştir. Sayfalarınızda gösterilen seçilmiş takvimlerdeki etkinlik sayfaları (önümüzdeki altı ay içindeki etkinlikler için) sitenizin site haritasında da listelenir; böylece arama motorları bunları bulabilir.

### Kaydırmalı düzenler {#scrolling-layouts}

**Groups Browser**, **Group List** ve Calendar öğesinin **Upcoming events** görünümündeki **Scrolling (automatic)** (Otomatik kaydırma) düzeni, kutucukları ızgara yerine tek bir satıra yerleştirir. Telefonda her kutucuk satırı doldurur; bilgisayarda ise yan yana iki kutucuk sığar. Sığabileceğinden fazla kutucuk olduğunda satır:

- Yaklaşık dört saniyede bir bir kutucuk ileri gider ve sonuncudan sonra yeniden ilk kutucuğa döner.
- Ziyaretçi üzerine geldiğinde, dokunduğunda veya sekmeyle ona geçtiğinde duraklar ve birkaç saniye sonra kaldığı yerden devam eder.
- Altında, her kutucuk için bir nokta olacak şekilde bir nokta dizisi gösterir; geçerli kutucuğun noktası dolu olur. Ziyaretçiler bir noktaya tıklayarak o kutucuğa geçebilir.

Hareketi azaltma ayarı etkin olan cihazlarda satır hareketsiz kalır ve ziyaretçiler satırı kendileri kaydırır veya parmaklarıyla kaydırırlar. Tüm kutucuklar sığarsa satır hareket etmez ve nokta görünmez.

### İçeriği Yeniden Sıralama

Öğeleri yeniden sıralamak için bölümleri veya öğeleri, her öğenin sol tarafındaki tutma simgesini (altı nokta) kullanarak sürükleyin. Öğeleri bir bölüm içinde sürükleyebilir veya bölümler arasında taşıyabilirsiniz.

## Sayfanızı Biçimlendirme

### Bölüm Stilleri

Stil panelini açmak için herhangi bir bölüme tıklayın. Şunları ayarlayabilirsiniz:

- **Background** (Arka plan) -- Düz renk, degrade veya resim. Resim arka planı kullanırken, bölüm ölçeklendiğinde resmin hangi kısmının ortada kalacağını belirlemek için tıklayarak ayarlayabileceğiniz bir **Focal Point** (Odak noktası) seçici bulunur; ayrıca metnin okunabilirliğini artırmak için resmin üzerine yarı saydam bir ton eklemenizi sağlayan bir **Overlay** (Kaplama) rengi seçeneği vardır.
- **Padding** (İç boşluk) -- Bölümün içindeki üst ve alt boşluk
- **Width** (Genişlik) -- Tam genişlik veya ortalanmış/sınırlı genişlik
- **Dividers** (Ayırıcılar) -- Bölümün üst veya alt kenarında dekoratif şekil ayırıcılar (dalga, eğik, kavis, üçgen ve daha fazlası); renk, yükseklik ve çevirme seçenekleriyle

### Öğe Stilleri

Stil panelini açmak için herhangi bir öğeye tıklayın. Yaygın seçenekler arasında yazı tipi boyutu, renk, hizalama, kenar boşluğu (margin) ve iç boşluk (padding) bulunur. Resimler için alternatif metin ve bağlantı hedefleri ayarlayabilirsiniz.

### Özel CSS

Gelişmiş biçimlendirme için her bölümün ve öğenin kendi CSS kurallarınızı yazabileceğiniz bir **Custom CSS** (Özel CSS) alanı vardır. Bunlar o öğeye özgüdür; bu nedenle sayfanın geri kalanını istemeden etkilemezler.

:::tip
Özel bir yazı tipi veya genel bir renk gibi tüm site genelinde stiller uygulamanız gerekiyorsa, tek tek sayfalardaki özel CSS yerine [Görünüm](./appearance.md) ayarlarını kullanın.
:::

## Sayfanızı Önizleme

Sayfanızın farklı ekran boyutlarında nasıl göründüğünü kontrol etmek için araç çubuğundaki önizleme denetimlerini kullanın:

- **Desktop** (Masaüstü) -- Tam genişlikte tarayıcı görünümü
- **Mobile** (Mobil) -- Dar, telefon boyutunda görünüm

Telefonlarda, bir satırdaki sütunlar satırın ayarlarında bir **Mobile Width** (Mobil Genişlik) belirlemediğiniz sürece tam genişlikte üst üste yığılır. Vaaz ve podcast listeleri de telefonlarda her bölümün metnini küçük resminin altına yerleştirir.

Ziyaretçilerin göreceği canlı sayfayı birebir görmek için Sayfalar listesine dönün ve sayfanın yolu bağlantısına tıklayın. Yeni bir tarayıcı sekmesinde açılır.

## Erişilebilirliği Denetleme

Yaygın sorunlar için hızlı bir kontrol çalıştırmak üzere araç çubuğundaki **Accessibility** (Erişilebilirlik) simgesine tıklayın -- alternatif metni eksik resimler, düşük renk kontrastı veya sırası bozuk başlıklar. Her sorun, düzeltilmesi gereken öğeye doğrudan bağlanır; böylece sorunu yerinde düzeltebilirsiniz.

## Değişiklikleri Geri Alma

Düzenleyici, düzenleme geçmişinizi otomatik olarak izler. Gezinmek için araç çubuğu düğmelerini veya klavye kısayollarını kullanın:

- **Undo** (Geri al) (Ctrl+Z / Cmd+Z) -- Son işleminizi geri alın
- **Redo** (Yinele) (Ctrl+Shift+Z veya Ctrl+Y / Cmd+Shift+Z) -- Geri alınan bir işlemi yeniden uygulayın

Sayfayı önceki bir anlık görüntüye de geri yükleyebilirsiniz. Açıklamalarıyla kaydedilmiş anlık görüntülerin listesini görmek için araç çubuğundaki **View history** (Geçmişi görüntüle) düğmesine tıklayın ve geri dönmek istediğiniz noktaya ait girişe tıklayın.

:::warning
Bir anlık görüntüyü geri yüklemek, mevcut sayfa içeriğinizi anlık görüntü sürümüyle değiştirir. Bu işlem standart geri al düğmesiyle geri alınamaz. Eski bir anlık görüntüyü geri yüklemeden önce, dönme seçeneğini korumak istiyorsanız mevcut durumunuzun bir anlık görüntüsünü kaydedin.
:::

## Kaydetme ve Yayımlama

Değişiklikler siz çalışırken otomatik olarak kaydedilir. Araç çubuğundaki bir durum göstergesi, değişikliklerinizin kaydedilip kaydedilmediğini gösterir.

### Taslak ve yayımlanmış durum

Sayfalar, ziyaretçilerin değişikliklerinizi ne zaman göreceğini kontrol eden bir **published** (yayımlanmış) durumuna sahip olabilir. Araç çubuğu, geçerli durumu gösteren bir durum etiketi görüntüler:

- **Live on save** (Kaydedince yayında) -- Sayfa bir yayımlama iş akışı kullanmaz. Kaydedilen her değişiklik hemen yayına girer. Yeni sayfalar için varsayılan budur.
- **Unpublished changes** (Yayımlanmamış değişiklikler) -- Sayfa daha önce yayımlanmıştır, ancak son yayımlamadan bu yana değişiklik yaptınız. Ziyaretçiler hâlâ önceki yayımlanmış sürümü görür.
- **Published** (Yayımlandı) -- Sayfa yayındadır ve kaydedilmiş içeriğiniz ziyaretçilerin gördüğüyle aynıdır.

Değişikliklerinizi yayımlamak için araç çubuğundaki **Publish** (Yayımla) düğmesine tıklayın. Sayfa hemen yayına girer.

Ziyaretçilerin gördüklerini etkilemeden son yayımlanmış sürüme dönmek için taşma menüsünü (⋮) açın ve **Discard unpublished changes** (Yayımlanmamış değişiklikleri at) seçeneğine tıklayın.

Yayımlama iş akışını kullanmayı bırakmak için taşma menüsünü açın ve **Turn off publishing** (Yayımlamayı kapat) seçeneğine tıklayın. Bundan sonra düzenlemeler yeniden hemen yayına girer.

:::tip
Bir sayfayı -- örneğin yaklaşan bir etkinlik için -- hazırlamak ve yalnızca doğru anda yayına almak istediğinizde taslak/yayımlama iş akışını kullanın. Sayfayı oluşturun ve önizleyin, ardından hazır olduğunuzda **Publish** düğmesine tıklayın.
:::

## İlgili Makaleler

- [Sayfaları Yönetme](./managing-pages.md) -- Sayfa oluşturun, URL'leri ayarlayın ve site gezinmesini yönetin
- [Görünüm](./appearance.md) -- Site genelinde renkleri, yazı tiplerini ve markayı ayarlayın
- [Dosyalar](./files.md) -- Düzenleyicide kullanmak üzere resim ve belge yükleyin
- [Form Oluşturma](../forms/creating-forms.md) -- Sayfalara gömebileceğiniz formlar oluşturun
