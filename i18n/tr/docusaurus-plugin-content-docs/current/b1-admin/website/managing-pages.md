---
title: "Sayfaları Yönetme"
description: "B1 Admin'in Web Sitesi Sayfaları görünümünde sayfaları ve gezinmeyi oluşturun, düzenleyin ve düzenli hâle getirin; sayfa ayarları, yönlendirmeler ve site şablonları dahil."
---

# Sayfaları Yönetme

<div class="article-intro">

Web Sitesi Sayfaları görünümü, kilise web sitenizdeki tüm sayfaları oluşturmak, düzenlemek ve düzenlemek için kullanacağınız merkezi alandır. Hem sayfa içeriğinizi hem de sitenizin gezinme yapısını bu tek ekrandan yönetebilirsiniz.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Alan adınızı ve temel site ayarlarınızı yapılandırmak için [İlk Kurulum](./initial-setup.md) adımlarını tamamlayın
- İçeriğinizi ve görsellerinizi hazır bulundurun. Önce medya dosyalarınızı yüklemek için [Dosyalar](./files.md) yöneticisini kullanın.

</div>

:::info
Kilisenizin birden fazla web sitesi varsa (örneğin kampüs başına ayrı siteler), Web Sitesi Sayfaları görünümünün üst kısmındaki site değiştiriciyi kullanarak siteler arasında geçiş yapabilirsiniz. Her sitenin kendi sayfaları, gezinme yapısı ve [görünüm](./appearance.md) ayarları vardır.
:::

## Sayfa Türlerini Anlama

**Sayfalar** tablosu, sitenizdeki her sayfayı **Yol** ve **Başlık** bilgileriyle listeler. İki tür sayfa vardır:

- **Oluşturulmuş** -- Kilisenizin verilerine göre sistem tarafından otomatik olarak oluşturulan sayfalar (örneğin bir Gruplar sayfası, bir Vaazlar sayfası veya kütüphanenizdeki her vaaz için ayrı bir sayfa). Bu sayfalarda **Oluşturulmuş** rozeti bulunur ve veriniz değiştikçe kendilerini güncellerler.
- **Özel** -- Kendi içeriğinizi ve düzeninizi kullanarak oluşturduğunuz sayfalar.

İçeriği ve tasarımı tamamen kontrol etmek istiyorsanız, otomatik oluşturulmuş herhangi bir sayfayı özel sayfaya dönüştürebilirsiniz. Oluşturulmuş sayfanın yanındaki **Dönüştür**'e tıklayın ve onaylayın.

## Sayfa Ekleme ve Düzenleme

1. Web Sitesi Sayfaları görünümünün sağ üst köşesindeki **Sayfa Ekle** düğmesine tıklayın.
2. Bir sayfa türü (boş veya bir şablon) seçin ve sayfaya bir ad verin.
3. Herhangi bir sayfanın yanındaki **İçeriği Düzenle**'ye tıklayarak [sayfa düzenleyiciyi](./page-editor.md) açın; burada bölümler, metin, görseller ve diğer öğeler ekleyebilirsiniz.
4. Sayfa başlığını, URL yolunu ve diğer meta verileri güncellemek için bir sayfanın yanındaki **Sayfa Ayarları**'na tıklayın.
5. Ziyaretçilerin sayfayı tam olarak nasıl göreceğini görmek için **Yol** sütunundaki sayfa yoluna tıklayarak canlı sayfayı yeni bir sekmede açın.

:::tip
Ana sayfanız için URL yolunu yalnızca `/` olarak ayarlayın. Diğer tüm sayfalar için `/hakkimizda` veya `/iletisim` gibi açıklayıcı bir yol kullanın.
:::

### Sayfa Ayarları

Yapılandırmak istediğiniz herhangi bir sayfada **Sayfa Ayarları**'nı açın:

- **Başlık ve URL Yolu** -- Sayfa adı ve sitenizdeki adresi.
- **Görünürlük** -- Sayfayı kimlerin görebileceğini seçin: herkes, yalnızca üyeler, yalnızca personel veya yalnızca belirli grupların üyeleri. Bu, ayrı bir parola olmadan özel bir sayfayı (personel kaynak sayfası gibi) korumanın hızlı bir yoludur.
- **Meta Açıklama** -- Arama motoru sonuçlarında ve sosyal medya bağlantı önizlemelerinde gösterilen kısa özet.
- **Yönlendirmeler** -- Eski bir URL yolunu bu sayfaya yönlendirin; böylece emekli olmuş bir sayfaya ait bağlantılar ve yer imleri çalışmaya devam eder.

## Gezinmeyi Yönetme

Web Sitesi Sayfaları görünümünün sağ tarafındaki **Ana Gezinme** paneli, gezinme bağlantılarınızı gösterir. Bu bağlantılar, ziyaretçilerin web sitenizde gördüğü menüyü kontrol eder.

1. Yeni bir gezinme bağlantısı oluşturmak için **Ekle**'ye tıklayın. Bağlantıyı sitenizdeki herhangi bir sayfaya veya harici bir URL'ye yönlendirebilirsiniz.
2. Bağlantıları yeniden sıralamak için istediğiniz sıraya sürükleyip bırakın. Açılır menüler oluşturmak için bağlantıları üst öğenin altına da yerleştirebilirsiniz.
3. Metnini, URL'sini veya üst sayfasını değiştirmek için herhangi bir bağlantıya tıklayarak **Bağlantı Ayarları**'nı açın.
4. Bir bağlantıyı gezinmeden kaldırmak için **Bağlantı Ayarları**'nı açın ve **Sil**'e tıklayın.

:::info
Bir gezinme bağlantısını kaldırmak sayfanın kendisini silmez. Sayfa hâlâ mevcuttur ve doğrudan URL'si üzerinden erişilebilir; yalnızca menüde görünmez.
:::

## Site Genelindeki Anahtarlar

**Ana Gezinme** panelindeki bağlantıların altında, tüm kilise web sitenizi etkileyen iki anahtar bulunur:

- **Girişi Göster** -- Web sitenizin gezinme çubuğunda bir **Giriş** düğmesi gösterir.
- **Herkese Açık Web Sitesini Devre Dışı Bırak** -- Herkese açık web sitenizi kapatır. Kilisenizin B1'i yalnızca üye portalı, bağış ve kayıtlar için kullandığı ve ana web sitesini başka bir yerde tuttuğu durumlarda kullanın.

### Herkese Açık Web Sitesini Devre Dışı Bırakmanın Etkileri

**Herkese Açık Web Sitesini Devre Dışı Bırak** açık olduğunda:

- Ana sayfa ve özel sayfalarınız dahil her herkese açık sayfa, oturum açmamış ziyaretçileri giriş ekranına yönlendirir. Oturum açtıktan sonra, istedikleri sayfaya geri dönerler.
- Oturum açmış üyeler, gezinmeniz ve yerleşik **Oluşturulmuş** sayfalar (Gruplar ve Vaazlar gibi) dahil olmak üzere web sitesinin tamamını her zamanki gibi görür. Oluşturulmuş sayfalar artık Sayfalar tablosunda görünmez.
- Arama motorlarına sitenin dizinlenmemesi bildirilir. Site haritası boş olur ve `robots.txt` tüm taramayı engeller.

Şu bağlantılar çalışmaya devam eder, böylece üyeler ve misafirler yine de bunlara ulaşabilir:

- Giriş ve çıkış
- Üye portalı (`/mobile` altındaki her şey)
- [Etkinlik kaydı](../guides/event-registration.md) bağlantıları ve misafir kaydı

Herkese açık web sitesi kapalıyken anahtarın altında bir uyarı görünür. Sayfalarınızı geri getirmek için anahtarı yeniden kapatın. Site devre dışıyken hiçbir şey silinmez.

:::info
Bu ayar tüm kilisenizi kapsar. Birden fazla siteniz varsa, yalnızca site değiştiricide seçili olanı değil, hepsini kapatır.
:::

## Sitenizi Düzenlemek İçin İpuçları

- Ziyaretçilerin bir şeyleri hızlıca bulabilmesi için üst düzey gezinme öğelerinizi beş veya altı ile sınırlayın.
- İlgili alt sayfalar için iç içe bağlantılar kullanın (örneğin "Biz Kimiz", "İnançlarımız" ve "Tarihçe" içeren bir "Hakkımızda" açılır menüsü gibi).
- Gezinmenizin daha küçük ekranlarda iyi çalıştığından emin olmak için telefonunuzda gözden geçirin.
- Ziyaretçilerin ne bulacaklarını anlamalarına yardımcı olan açık ve açıklayıcı sayfa adları verin.

:::tip
Ziyaretçilerden kayıt, dua talebi veya başka bilgiler toplamak için sayfalarınıza [formlar](../forms/creating-forms.md) ekleyebilirsiniz.
:::

## Bir Site Şablonuyla Başlamak

Sitenizi sıfırdan oluşturuyorsanız, sayfaları tek tek oluşturmak yerine bir **Site Şablonu** kullanarak başlayabilirsiniz. Site şablonu, yer tutucu içerik ve gezinme bağlantıları önceden bağlanmış, hazır bir sayfa grubu oluşturur: ana sayfa, hakkımızda, bağlan, bağış ve diğerleri.

1. Sayfalar ekranında **Bir Şablonla Başla** düğmesine tıklayın (**Sayfa Ekle** düğmesinin yanında).
2. Kullanılabilir şablonlara göz atın ve sayfa yapısını önizlemek için birine tıklayın.
3. Beğendiğiniz bir şablonu bulduğunuzda **Şablonu Uygula**'ya tıklayın.
4. Henüz var olmayan sayfalar oluşturulur ve gezinmenize eklenir. Var olan sayfalar olduğu gibi bırakılır.

Bir şablonu uyguladıktan sonra, yer tutucu metni ve görselleri kilisenizin gerçek içeriğiyle değiştirmek için her sayfayı [sayfa düzenleyicide](./page-editor.md) açın.

:::info
Site şablonları sayfa yapısını ve gezinmeyi oluşturur. Sitenizin renk düzenini veya yazı tiplerini geçersiz kılmazlar; bunlar [Görünüm](./appearance.md) tarafından kontrol edilir.
:::

## Görsel Büyütme

Ziyaretçiler web sitenizdeki bir görsele tıkladığında, görsel tam ekran bir büyütme katmanında açılır. Bu sayede insanlar sayfadan ayrılmadan fotoğrafları daha büyük boyutta görebilir. Herhangi bir yapılandırma gerekmez; büyütme, sayfa içeriğinizdeki görseller için otomatik olarak etkinleştirilir.

## Sonraki Adımlar

- [İlk Kurulum](./initial-setup.md) -- İlk kez kurulum talimatları
- [Sayfa Düzenleyiciyi Kullanma](./page-editor.md) -- Sayfa içeriği oluşturmayı ve biçimlendirmeyi öğrenin
- [Görünüm](./appearance.md) -- Sitenizin görsel temasını özelleştirin
- [Dosyalar](./files.md) -- Sayfalarınız için medya dosyalarını yükleyin ve yönetin
