---
title: "Görünüm"
---

# Görünüm

<div class="article-intro">

Görünüm sayfası, kilise web sitenizin genel görünümünü ve hissini özelleştirmenize olanak tanır. Renklerden yazı tiplerine, boşluklardan özel CSS'e kadar sitenizin her görsel öğesini tek bir yerden kontrol edebilirsiniz.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Web siteniz için [İlk Kurulum](initial-setup) adımlarını tamamlayın
- Kilise logonuzu, şeffaf arka planlı ve 4:1 en-boy oranına sahip PNG biçiminde hazır bulundurun
- Mevcut bir stil rehberiniz varsa kilisenizin marka renklerinin onaltılık (hex) değerlerini bilin

</div>

## Görünüm Ayarlarına Erişim

1. B1 Admin'de, [Atlama menüsü](../introduction.md#getting-around-with-the-jump-menu) (sol üstteki arama çubuğu) öğesini açın ve **Website** bölümünü genişletin.
2. **Appearance** seçeneğine tıklayın.
3. **Site Styles** sayfası yüklenir. **Theme, fonts & footer** kartında solda **Style Settings** listesi, sağda ise örnek bir sitenin önizlemesi görünür. Bunun altında **Announcement & widgets** ve **Redirects & analytics** kartları yer alır.

## Renk Paleti {#color-palette}

1. Style Settings panelinde **Color Palette** seçeneğine tıklayın.
2. **Base Colors** (açık, vurgu ve koyu tonlar) ile **Semantic Colors** (Primary, Secondary, Success, Warning ve Error) bölümlerini göreceksiniz.
3. Herhangi bir renk örneğine tıklayarak renk seçiciyi açın. Rengi seçmek için seçiciyi sürükleyin veya bir onaltılık değer girin.
4. **Color Combinations Preview**, seçtiğiniz renklerin birlikte nasıl göründüğünü gösterir.
5. Önceden tasarlanmış bir renk düzenini hızlıca uygulamak için **Suggested Palettes** seçeneklerini kullanın.
6. Memnun kaldığınızda **Save Palette** seçeneğine tıklayın.

## Tipografi

1. Style Settings panelinde **Fonts** seçeneğine tıklayın.
2. Yazı tipi tarayıcısını açmak için **Heading Font** veya **Body Font** düğmesine tıklayın. Ada göre arama yapabilir veya Serif, Sans Serif, Display, Handwriting ve Monospace gibi kategorilere göz atabilirsiniz. **Popular Font Combinations** seçeneklerinden birini de seçebilirsiniz.
3. Yazı tipi seçimlerinizi uygulamak için **Save Fonts** seçeneğine tıklayın.
4. Heading 1 ile Heading 4 arasındaki boyut hiyerarşisini ayarlamak için Style Settings panelinde **Typography Scale** seçeneğine tıklayın. İnce ayar yapmak için **Type Scale** çarpanını, **Base Size** ve **Line Height** alanlarını kullanın, ardından **Save Typography** seçeneğine tıklayın.

## Boşluk

1. Style Settings panelinde **Spacing Scale** seçeneğine tıklayın.
2. Extra Small ile Extra Large arasındaki boşluk değerlerini ayarlayın. Uygulamalı örnekler, her değerin yerleşimi nasıl etkilediğini gösterir.
3. Değerleri sitenizin tamamına uygulamak için **Save Spacing** seçeneğine tıklayın.

## Logo ve Marka {#logo-and-branding}

1. Style Settings panelinde **Logo** seçeneğine tıklayın.
2. **Light Background Logo** ve **Dark Background Logo** dosyalarınızı yükleyin. En iyi sonuç için şeffaf arka planlı ve 4:1 en-boy oranına sahip görseller kullanın.
3. Bağlantı önizlemeleri için bir **Social Media Image** ve tarayıcı sekmesindeki simge için bir **Favicon** yükleyin.
4. **Save Changes** seçeneğine tıklayın. Yüklenen görseller siz kaydedene kadar saklanmaz; bu nedenle kaydetmeden tarayıcı sekmesini kapatmaya veya yenilemeye çalışırsanız tarayıcınız kaydedilmemiş değişiklikler olduğu konusunda uyarır.

:::tip
En iyi sonuç için PNG biçiminde, şeffaf arka planlı bir logo kullanın. Bu, logonun web sitenizde ve [mobil uygulamada](../settings/mobile-app.md) hem açık hem koyu arka planlarda iyi görünmesini sağlar.
:::

## Gezinme Stilleri

Gezinme çubuğunuzun renklerini hem dolu hem de şeffaf modlar için özelleştirin:

1. Style Settings panelinde **Navigation** seçeneğine tıklayın
2. **Header (solid)** ve **Header over hero (transparent)** için renkleri yapılandırın
3. Gezinme renklerinizi uygulamak için **Save Navigation** seçeneğine tıklayın

Ayrıntılı talimatlar için [Gezinme Stilleri](./navigation-styles.md) sayfasına bakın.

## Duyuru ve Bileşenler

Site bileşenleri, sayfa içeriğinin üzerinde yüzen şekilde sitenizin her sayfasında görünür:

- **Announcement Banner** -- Yaklaşan bir etkinlik veya ibadet değişikliği gibi zamana duyarlı mesajlar için sitenizin üst kısmında yer alan, kapatılabilir bir şerit.
- **Launcher** -- Hızlı erişim menüsünü açan yüzen bir düğme. Örneğin bağış, check-in veya haftalık bülten bağlantılarını içerebilir.

1. Style Settings'in altındaki **Announcement & widgets** kartını bulun.
2. İstediğiniz bileşenleri açın ve metinlerini, bağlantılarını ve renklerini yapılandırın.
3. **Save** seçeneğine tıklayın.

## Yönlendirmeler ve Analitik

**Redirects & analytics** kartı (Style Settings'in altında) birbiriyle ilgisiz ama sık ihtiyaç duyulan iki ayar içerir:

- **Analytics** -- Web sitenizin ziyaretçi trafiğini izlemek için **GA4 Measurement ID** değerinizi (biçim `G-XXXXXXXXXX`) ekleyin. Aynı kimlik, kilisenizin B1 uygulamasındaki sayfa görüntülemelerini de izler (`/mobile` adresindeki üye portalı, yüklü uygulama dahil). Bu görüntülemeler `installed` veya `browser` değerine sahip bir `display_mode` ile etiketlenir. Böylece Google Analytics'te yüklü uygulama ziyaretlerini tarayıcı ziyaretlerinden ayırt edebilirsiniz.
- **Redirects** -- Eski bir URL yolunu yeni bir yola yönlendirir. Böylece taşıdığınız veya yeniden adlandırdığınız bir sayfaya verilen bağlantılar 404 hatası vermek yerine çalışmaya devam eder. Eski **From** yolunu ve yeni **To** yolunu girin, ardından **Save** seçeneğine tıklayın. Yönlendirme, B1'in yerleşik sayfalarına (`/sermons`, `/stream`, `/donate`, `/bible` ve `/votd`) göre önceliklidir. Bu sayede bu adresleri başka bir yere gönderebilirsiniz (örneğin kendi vaaz sayfanıza veya bir YouTube kanalına). Yönlendirme, aynı adreste kendiniz oluşturduğunuz bir sayfanın yerine geçmez. Yönlendirmenin uygulanmasını istiyorsanız önce o sayfayı silin.

## Özel CSS ve JavaScript

1. Style Settings panelinde **CSS & Javascript** seçeneğine tıklayın.
2. Varsayılan stilleri geçersiz kılmak için **Custom CSS** alanına ileri düzey özelleştirmeler ekleyin.
3. İzleme kodları veya diğer betikler için **Custom HTML** alanını kullanın.
4. Google Analytics entegrasyonu gibi kod parçacıkları için **Common JavaScript Examples** bölümünden yararlanın.

:::warning
Özel CSS güçlüdür, ancak yanlış kullanılırsa sitenizin yerleşimini bozabilir. Çoğu kilise, yerleşik renk, yazı tipi ve boşluk denetimleriyle istediği görünümü elde edebilir. Özel CSS'i yalnızca web geliştirme konusunda rahat hissediyorsanız kullanın.
:::

:::info
Siteniz, satır içi betiklerin başka kaynaklardan gelmesini engelleyen bir İçerik Güvenlik Politikası (Content Security Policy) uygular. Buradaki **Custom HTML** alanı ile bireysel sayfalardaki [HTML öğesi](page-editor#using-the-html-element) bu kuralın istisnalarıdır. Bu alanlara kaydettiğiniz kod olduğu gibi çalışır. Bu nedenle yalnızca güvendiğiniz kaynaklardan betik yapıştırın (analitik etiketleri, sohbet bileşenleri ve benzeri gömülü içerikler).
:::

## Stil Temaları

Hızlı bir başlangıç noktası istiyorsanız, Color Palette bölümündeki **Suggested Palettes** seçenekleri, tek tıklamayla uyumlu renkler ayarlayan hazır temalar sunar. Bir temayı uyguladıktan sonra bireysel ayarlarda istediğiniz zaman ince ayar yapabilirsiniz.

## Sonraki Adımlar

- [Sayfaları Yönetme](managing-pages) -- Web sitenizin sayfalarını oluşturun ve düzenleyin
- [Dosyalar](files) -- Sitenizin medya dosyalarını yükleyin
