---
title: "Blog"
---

# Blog

<div class="article-intro">

Blog sayfası, kilisenizin web sitesinde haber, güncelleme ve devosyonal yazılar yayımlamanızı sağlar. Yazılar `/blog` adresinde bir kart listesi olarak, kendi URL'lerinde ve Zapier gibi diğer araçların yeni yazıları izleyebildiği bir RSS beslemesinde görünür.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Web siteniz için [İlk Kurulum](initial-setup) adımlarını tamamlayın
- Ziyaretçilerin blogunuzu menüden bulmasını istiyorsanız, [Sayfaları Yönetme](managing-pages) bölümünden `/blog` adresine bir gezinme bağlantısı ekleyin

</div>

## Bloga Erişim

1. B1 Admin'de, sol üstteki arama çubuğu olan [Jump menüsünü](../introduction.md#getting-around-with-the-jump-menu) açın ve **Website** (Web Sitesi) bölümünü genişletin.
2. **Blog**'a tıklayın.
3. Blog sayfası, her yazıyı durumu ve yayın tarihiyle birlikte listeler.

## Yazı Ekleme

1. Sağ üst köşedeki **Yazı Ekle** düğmesine tıklayın.
2. Bir **Başlık** girin. Yazıyı yazdıkça sizin için URL'ye uygun bir **Web adresi** (slug) otomatik olarak oluşturulur. Farklı bir adres istiyorsanız bunu doğrudan düzenleyebilirsiniz.
3. Bir **Özet** ekleyin. Bu, yazı listesinde, meta açıklamalarda ve RSS beslemesinde gösterilen kısa bir özettir. Boş bırakırsanız, yazı içeriğinin başından otomatik olarak bir özet oluşturulur.
4. Yazı gövdesini Markdown kullanarak **İçerik** düzenleyicisine yazın. Biçimlendirilmiş yazının nasıl görüneceğini görmek için **Önizleme**'ye tıklayın.
5. Bir **Kategori** seçin (mevcut bir kategoriyi seçin veya yeni bir tane yazın) ve isteğe bağlı olarak virgülle ayrılmış **Etiketler** ekleyin.
6. [Dosyalar](files) galerinizden bir fotoğraf seçmek veya yeni bir fotoğraf yüklemek için **Görsel Seç**'e tıklayın. Yüklenen fotoğraflar, 16:9 oranına kilitlenmiş yerleşik bir kırpma aracında açılır. Böylece her fotoğrafı yazı başlığına ve liste kartlarına uygun şekilde çerçeveleyebilirsiniz.
7. **Yazar**'ı belirleyin. Varsayılan olarak sizsiniz, ancak veritabanınızdaki herhangi bir kişiyi arayıp seçebilirsiniz.
8. Yazıyı herkese açmaya hazır olduğunuzda **Yayında** seçeneğini açın ve bir **Yayın Tarihi** belirleyin. Yazıyı taslak olarak kaydetmek için bu seçeneği kapalı bırakın.

:::tip
Yazıyı zamanlamak için gelecekteki bir **Yayın Tarihi** belirleyin. Yazı, bu tarih gelene kadar ziyaretçilerden gizli kalır ve Blog listesinde bu süre boyunca **Zamanlanmış** etiketiyle görünür.
:::

## Yazı Durumları

Listedeki her yazı üç durumdan birini gösterir:

- **Taslak** -- Yayımlanmamış. Yalnızca yönetici panelinde görünür.
- **Zamanlanmış** -- **Yayında** seçeneği açık, ancak yayın tarihi gelecekte.
- **Yayında** -- Web sitenizde canlı ve RSS beslemesine dahil.

## Yazıları Düzenleme, Önizleme ve Silme

- Değişiklik yapmak için bir yazının yanındaki **Düzenle**'ye tıklayın.
- Canlı yazıyı web sitenizde yeni bir sekmede açmak için (yayımlanmış yazılarda görünen) **Sitede Görüntüle**'ye tıklayın.
- Bir yazıyı kalıcı olarak kaldırmak için **Sil**'e tıklayın.

## Ziyaretçiler Blogunuzu Nasıl Görür

Yayımlanmış yazılar `{yoursite}/blog` adresinde, sayfa başına 10 yazı olacak şekilde görünür. Arşivde gezinmek için **Daha Eski** ve **Daha Yeni** bağlantıları, bir kategori filtresi ve her yazının yazar bilgisi ile fotoğrafı da yer alır. Etiketler de tıklanabilir çipler olarak gösterilir. Böylece ziyaretçiler listeyi etikete göre aynı şekilde filtreleyebilir. Her yazının kendi sayfası `{yoursite}/blog/{slug}` adresinde bulunur ve aynı kategorideki ilgili yazıları içerir. Blog sayfası ayrıca bir RSS beslemesi yayımlar. Bu besleme, okuyucu uygulamaları ve Zapier gibi otomasyon araçları tarafından otomatik olarak keşfedilebilir.

:::info
Blog yazıları, normal web sitesi sayfalarından ayrı bir içerik türüdür. Bunlar [sayfa düzenleyicisinde](page-editor) oluşturulmaz ve Sayfalar listesinde görünmez. Bu sayede blog yazımı hızlı kalır ve yazmaya odaklanır.
:::

## Yazıların Altına Yorum Ekleme

B1, blog yorumlarını kendisi barındırmaz. Ancak bir yorum hizmeti ekleyebilirsiniz. Ayrıca her yazının altına bülten kayıt formu veya bağış düğmesi gibi başka bir şey de koyabilirsiniz.

1. [Hyvor Talk](https://talk.hyvor.com), [FastComments](https://fastcomments.com) veya [Disqus](https://disqus.com) gibi bir yorum hizmetine kaydolun ve gömme kodunu kopyalayın.
2. Blog sayfasında **Her Yazının Altında** bölümüne gidin.
3. Gömme kodunu yapıştırın ve **Kaydet**'e tıklayın.

Kod, yayımlanmış her yazının içeriğinin altında görünür. Yorum hizmetiniz moderasyonu ve spam filtrelemesini yönetir, bu yüzden panelini düzenli olarak kontrol edin.

:::tip
Kutuyu boşaltıp **Kaydet**'e tıklayarak kodu tüm yazılardan kaldırabilirsiniz. Bu kutuyu yalnızca kilise ayarlarını düzenleyebilen kişiler görür.
:::

## Sonraki Adımlar

- [Sayfaları Yönetme](managing-pages) -- Bloginize bir gezinme bağlantısı ekleyin
- [Dosyalar](files) -- Yazılarınızda kullanmak üzere fotoğraf yükleyin
- [Zapier Entegrasyonu](../integrations/zapier.md) -- Yeni yazılar yayımlandığında otomasyonları tetikleyin
